import React, { useState, useEffect, useMemo } from "react";
import { useRecoilValue } from 'recoil'; // Keep for userState, authTokenState if needed elsewhere
import ExpiringDomainCard from "../components/ExpiringDomainCard";
import ActivityCard from "../components/ActivityCard";
import { useUnreadNotifications } from "../hooks/useUnreadNotifications"; // Import the new hook
import { authTokenState, userState } from "../recoil/atoms/authState"; // For direct use if needed
import axios from "axios";
import { API_BASE_URL } from "../config/env.config";
import { } from "../types/eventEnum";
import MainLayout from "../layouts/MainLayout";
import { getThemeForDays } from "../utils/themes";
import {
  MdOutlineAddCircleOutline,
  MdOutlineAutorenew,
  MdOutlineSwapHoriz,
  MdOutlineVisibility,
  MdOutlineAssessment,
  MdOutlinePlaylistAdd,
  MdWorkHistory,
  MdOutlineFactCheck,
} from "react-icons/md";

import { getUserRole } from "../utils/helper";

const expiringCounts = {
  days90: 32,
  days60: 18,
  days30: 11,
  days15: 4,
};
const daysList = [90, 60, 30, 15];
const getActivityEventTypes = (activityTitle, userRole) => {
  // Added userRole for context if needed
  switch (userRole) {
    case "DRM":
      switch (activityTitle) {
        case "Add Domain Name Request":
          // If DRM gets notified about rejections of their submissions:
          return ["PROJECT_ASSIGNED"];
        case "Renew Domain":
          // If DRM gets notified about rejections of their renewal requests:
          return ["DOMAIN_RENEWAL_REQUESTED"]; // Assuming generic rejection event
        case "Transfer/Delete Domain":
          // If DRM gets notified about issues/rejections with their transfer requests:
          return ["DOMAIN_TRANSFER_STARTED"]; // Assuming generic rejection event
        case "View Domains": // Typically no direct unread count
          return [];
        case "Reports": // Typically no direct unread count
          return [];
        default:
          return [];
      }

    case "HOD":
      switch (activityTitle) {
        case "Assign DRM/Projects": // This is an action HOD initiates, usually no "unread" count
          return [];
        case "Assigned Projects":
          // If HOD gets a notification when a project they oversee has a major update
          // or if they are assigned as HOD to a new project.
          // This is less common for a direct "unread" count on this card.
          return [];
        case "Verify Domain Name Requests":
          // HOD needs to act when ARM (or another preceding role) forwards/verifies.
          return ["DOMAIN_ARM_VERIFICATION_FORWARDED"]; // Common
        // Or if it comes directly after NETOPS or WEBMASTER for a final HOD check on complex ones:
        // return [DOMAIN_WEBMASTER_VERIFIED, DOMAIN_NETOPS_VERIFIED];
        case "Verify Transfer Requests":
          // HOD needs to act when a transfer is initiated and needs their approval.
          return ["DOMAIN_TRANSFER_STARTED"]; // If HOD is the first/key approver for transfers.
        case "Verify Domain Renewal Requests":
          // HOD needs to act on renewal requests, possibly after ARM.
          // If ARM forwards renewals to HOD:
          // return [DOMAIN_RENEWAL_ARM_FORWARDED]; // << YOU WOULD NEED THIS EVENT TYPE
          // If HOD is the primary verifier for renewals submitted by DRM:
          return ["DOMAIN_RENEWAL_REQUESTED"]; // Assuming these go to HOD queue
        default:
          return [];
      }

    case "ARM":
      switch (activityTitle) {
        case "Verify Domain Requests":
          // ARM acts when a new domain application is submitted by DRM.
          return ["DOMAIN_APPLICATION_SUBMITTED"];
        case "Verify Domain Renewal Requests":
          // ARM acts when a domain renewal is requested by DRM.
          return ["DOMAIN_RENEWAL_REQUESTED"];
        case "View Domains":
          return [];
        default:
          return [];
      }

    case "ED":
      switch (activityTitle) {
        case "Verify Domain Requests":
          // ED acts after HOD has verified.
          return ["DOMAIN_HOD_VERIFIED"];
        case "Verify Domain Renewal Requests":
          // ED acts on renewals after HOD (or another role) has verified.
          // This assumes a flow: DRM -> ARM -> HOD -> ED for renewals.
          // If renewals are approved by HOD and then go to ED:
          return ["DOMAIN_RENEWAL_APPROVED"]; // Assuming HOD's verification results in "RENEWAL_APPROVED_BY_HOD" which notifies ED.
        // Or if HOD verifies and it's a specific "forward to ED" event
        case "View Domains":
          return [];
        default:
          return [];
      }

    case "NETOPS":
      switch (activityTitle) {
        case "Verify Domain Requests":
          // NETOPS acts after ED has approved.
          return ["DOMAIN_ED_APPROVED"];
        case "Verify Domain Renewal Requests":
          // NETOPS acts on renewals after ED's approval.
          // This assumes a flow for renewals: ... -> ED -> NETOPS
          // If ED approves renewal and it goes to NETOPS:
          return ["DOMAIN_RENEWAL_APPROVED"]; // Assuming this event means "approved by previous stage, now NETOPS action"
        // and the notification is for NETOPS
        case "View Domains":
          return [];
        default:
          return [];
      }

    case "WEBMASTER":
      switch (activityTitle) {
        case "Enter Domain Purchase Details":

          return [
            "DOMAIN_NETOPS_VERIFIED", // If NETOPS is before Webmaster purchase
            "DOMAIN_HPC_HOD_RECOMMENDED", // If HPC HOD is the final step before purchase for some domains
          ]; // Webmaster might get EITHER of these depending on domain type.
        case "Verify Domain Requests": // If Webmaster also has a verification step
          // This would be an event like DOMAIN_SOME_PREVIOUS_ROLE_VERIFIED
          return []; // Needs specific event if Webmaster verifies
        case "Verify Domain Renewal Requests": // If Webmaster also has a verification step for renewals
          return []; // Needs specific event
        case "View Domains":
          return [];
        default:
          return [];
      }

    case "HODHPC":
      switch (activityTitle) {
        case "Verify Domain Requests":
          return ["DOMAIN_ED_APPROVED"]; // Or DOMAIN_NETOPS_VERIFIED if that's the trigger
        case "Verify Domain Renewal Requests":
          return ["DOMAIN_RENEWAL_APPROVED"]; // Similar logic to new requests
        case "View Domains":
          return [];
        default:
          return [];
      }

    default: // Unknown role
      return [];
  }
};
const presentableRoleName = (role) => {
  switch (role) {
    case "DRM":
      return "DRM";
    case "ARM":
      return "ARM";
    case "HOD":
      return "HOD";
    case "ED":
      return "ED";
    case "NETOPS":
      return "NetOps";
    case "WEBMASTER":
      return "WebMaster";
    case "HODHPC":
      return "HodHpcI&E";
    default:
      break;
  }
};

function DashboardPage() {
  const currentUser = useRecoilValue(userState);
  const authToken = useRecoilValue(authTokenState);
  const role = currentUser?.role || "DRM";
  const {
    notifications: allUnreadNotifications,
    isLoading: isLoadingNotifications,
    error: notificationsError,
    fetchNotifications: refreshUnreadNotifications,
    setNotifications: setAllUnreadNotificationsInRecoil, // For optimistic updates
  } = useUnreadNotifications();
  // const [expiringCounts, setExpiringCounts] = useState(expiringCountsStatic); // For expiring domains
  const [activityNotificationCounts, setActivityNotificationCounts] = useState(
    {}
  );

  // Define activities per role
  // const activitiesMap = {
  //   DRM: [
  //     { title: "Add Domain Name Request", IconComponent: MdOutlineAddCircleOutline, linkTo: "/list/projects" },
  //     { title: "Renew Domain", IconComponent: MdOutlineAutorenew, linkTo: "/domains/renew" },
  //     { title: "Transfer/Delete Domain", IconComponent: MdOutlineSwapHoriz, linkTo: "/domains/transfer-delete" },
  //     { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
  //     { title: "Reports", IconComponent: MdOutlineAssessment, linkTo: "/reports" },
  //   ],
  //   HOD: [
  //     { title: "Assign DRM/Projects", IconComponent: MdOutlinePlaylistAdd, linkTo: "/projects/assign" },
  //     { title: "Assigned Projects", IconComponent: MdWorkHistory, linkTo: "/projects/assigned" },
  //     { title: "Verify Domain Name Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hod/verify-requests" },
  //     // { title: "Verify VAPT Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/view/vapt-renewals" },
  //     { title: "Verify Transfer Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/view/verify-transfer-requests" },
  //     { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hod/verify-renewal" },
  //   ],
  //   ARM: [
  //     { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-requests" },
  //     { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-renewal" },
  //     // { title: "Verify VAPT Renewals", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-vapt-renewals" },
  //     // { title: "Verify Transfer Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-transfer-requests" },
  //     { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
  //   ],
  //   ED: [
  //     { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/ed/verify-requests" },
  //     { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/ed/verify-renewal" },
  //     { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
  //   ],
  //   NETOPS: [
  //     { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/netops/verify-requests" },
  //     { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/netops/verify-renewal" },
  //     { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
  //   ],
  //   WEBMASTER: [
  //     { title: "Enter Domain Purchase Details", IconComponent: MdOutlineFactCheck, linkTo: "/domains/webmaster/purchase-details" },
  //     { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/webmaster/verify-requests" },
  //     { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/webmaster/verify-renewal" },
  //     { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
  //   ],
  //   HODHPC: [
  //     { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hodhpc/verify-requests" },
  //     { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hodhpc/verify-renewal" },
  //     { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
  //   ],
  // };
  const activitiesMap = {
    DRM: [
      {
        id: "drm_add_domain",
        title: "Add Domain Name Request",
        IconComponent: MdOutlineAddCircleOutline,
        linkTo: "/list/projects",
      },
      {
        id: "drm_renew_domain",
        title: "Renew Domain",
        IconComponent: MdOutlineAutorenew,
        linkTo: "/domains/renew",
      },
      {
        id: "drm_transfer_delete",
        title: "Transfer/Delete Domain",
        IconComponent: MdOutlineSwapHoriz,
        linkTo: "/domains/transfer-delete",
      },
      {
        id: "drm_view_domains",
        title: "View Domains",
        IconComponent: MdOutlineVisibility,
        linkTo: "/domains/view",
      },
      {
        id: "drm_reports",
        title: "Reports",
        IconComponent: MdOutlineAssessment,
        linkTo: "/reports",
      },
    ],
    HOD: [
      {
        id: "hod_assign_drm",
        title: "Assign DRM/Projects",
        IconComponent: MdOutlinePlaylistAdd,
        linkTo: "/projects/assign",
      },
      {
        id: "hod_assigned_projects",
        title: "Assigned Projects",
        IconComponent: MdWorkHistory,
        linkTo: "/projects/assigned",
      },
      {
        id: "hod_verify_domain_requests",
        title: "Verify Domain Name Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/hod/verify-requests",
      },
      {
        id: "hod_verify_transfer_requests",
        title: "Verify Transfer Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/view/verify-transfer-requests",
      },
      {
        id: "hod_verify_renewal_requests",
        title: "Verify Domain Renewal Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/hod/verify-renewal",
      },
    ],
    ARM: [
      {
        id: "arm_verify_domain_requests",
        title: "Verify Domain Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/arm/verify-requests",
      },
      {
        id: "arm_verify_renewal_requests",
        title: "Verify Domain Renewal Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/arm/verify-renewal",
      },
      {
        id: "arm_view_domains",
        title: "View Domains",
        IconComponent: MdOutlineVisibility,
        linkTo: "/domains/view",
      },
    ],
    ED: [
      {
        id: "ed_verify_domain_requests",
        title: "Verify Domain Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/ed/verify-requests",
      },
      {
        id: "ed_verify_renewal_requests",
        title: "Verify Domain Renewal Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/ed/verify-renewal",
      },
      {
        id: "ed_view_domains",
        title: "View Domains",
        IconComponent: MdOutlineVisibility,
        linkTo: "/domains/view",
      },
    ],
    NETOPS: [
      {
        id: "netops_verify_domain_requests",
        title: "Verify Domain Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/netops/verify-requests",
      },
      {
        id: "netops_verify_renewal_requests",
        title: "Verify Domain Renewal Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/netops/verify-renewal",
      },
      {
        id: "netops_view_domains",
        title: "View Domains",
        IconComponent: MdOutlineVisibility,
        linkTo: "/domains/view",
      },
    ],
    WEBMASTER: [
      {
        id: "webmaster_purchase_details",
        title: "Enter Domain Purchase Details",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/webmaster/purchase-details",
      },
      {
        id: "webmaster_verify_domain_requests",
        title: "Verify Domain Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/webmaster/verify-requests",
      },
      {
        id: "webmaster_verify_renewal_requests",
        title: "Verify Domain Renewal Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/webmaster/verify-renewal",
      },
      {
        id: "webmaster_view_domains",
        title: "View Domains",
        IconComponent: MdOutlineVisibility,
        linkTo: "/domains/view",
      },
    ],
    HODHPC: [
      {
        id: "hodhpc_verify_domain_requests",
        title: "Verify Domain Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/hodhpc/verify-requests",
      },
      {
        id: "hodhpc_verify_renewal_requests",
        title: "Verify Domain Renewal Requests",
        IconComponent: MdOutlineFactCheck,
        linkTo: "/domains/hodhpc/verify-renewal",
      },
      {
        id: "hodhpc_view_domains",
        title: "View Domains",
        IconComponent: MdOutlineVisibility,
        linkTo: "/domains/view",
      },
    ],
  };

  const activitiesToRender = useMemo(() => {
    return activitiesMap[role] || activitiesMap.DRM; // Fallback
  }, [role]);
  useEffect(() => {
    if (
      !currentUser ||
      allUnreadNotifications.length === 0 ||
      activitiesToRender.length === 0
    ) {
      setActivityNotificationCounts({});
      return;
    }
    const counts = {};
    activitiesToRender.forEach((activity) => {
      const relevantEventTypes = getActivityEventTypes(activity.title, role); // Pass role
      // Ensure notification.event_type is available and is a string from your transform function
      counts[activity.id || activity.title] = allUnreadNotifications.filter(
        (notification) =>
          notification.event_type &&
          relevantEventTypes.includes(notification.event_type)
      ).length;
    });
    setActivityNotificationCounts(counts);
    console.log("Calculated Activity Counts:", counts);
  }, [allUnreadNotifications, activitiesToRender, role, currentUser]); // Add role & currentUser to dependencies

  // --- Handle click on Activity Card ---
  const handleActivityCardClick = async (activity) => {
    if (!authToken || !currentUser) return; // Ensure user is authenticated

    const relevantEventTypes = getActivityEventTypes(activity.title, role); // Pass role
    if (relevantEventTypes.length === 0) {
      console.log(
        `No relevant event types to mark read for: ${activity.title}`
      );
      return; // No specific notifications to mark for this activity
    }

    const notificationIdsToMark = allUnreadNotifications
      .filter((n) => n.event_type && relevantEventTypes.includes(n.event_type)) // Check n.event_type exists
      .map((n) => n.id);

    if (notificationIdsToMark.length === 0) {
      console.log(`No unread notifications to mark for: ${activity.title}`);
      return; // No relevant unread notifications to mark
    }

    // Optimistic UI Update (remove from shared Recoil state)
    setAllUnreadNotificationsInRecoil((prevNotifications) =>
      prevNotifications.filter((n) => !notificationIdsToMark.includes(n.id))
    );

    try {
      console.log("Marking notifications as read. IDs:", notificationIdsToMark);
      await axios.post(
        `${API_BASE_URL}/api/v1/notifications/mark-bulk-read`, // This API is not implemented yet
        { notification_ids: notificationIdsToMark },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      notifySuccess(`Notifications for ${activity.title} marked as read.`);
    } catch (error) {
      console.error(
        `Failed to mark notifications for ${activity.title} as read:`,
        error
      );
      notifyError(`Could not update notifications for ${activity.title}.`);
      // Rollback: Re-fetch all notifications to get the true state from server
      // This will also update the Recoil state via the hook.
      if (refreshUnreadNotifications) {
        // Check if function exists
        refreshUnreadNotifications();
      }
    }
  };
  if (!currentUser) {
    // If user data isn't loaded yet (e.g., initial load)
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-600">Loading user data...</p>
        </div>
      </MainLayout>
    );
  }

  if (isLoadingNotifications && allUnreadNotifications.length === 0) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-600">Loading notifications...</p>
        </div>
      </MainLayout>
    );
  }

  // You might want to show an error message if notificationsError is set
  if (notificationsError && allUnreadNotifications.length === 0) {
    return (
      <MainLayout>
        <div className="p-4 text-center text-red-500">
          Could not load activity notifications:{" "}
          {typeof notificationsError === "string"
            ? notificationsError
            : notificationsError.message}
        </div>
      </MainLayout>
    );
  }
  //   return (
  //     <MainLayout>
  //       <div className="space-y-8">
  //         {/* Expiring Domains Section */}
  //         <section>
  //           <h2 className="text-xl font-semibold text-gray-800 mb-4">
  //             Expiring Domains
  //           </h2>
  //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  //             {daysList.map((days) => {
  //               console.log("days", days);
  //               return (
  //                 <ExpiringDomainCard
  //                   key={days}
  //                   days={days}
  //                   count={expiringCounts[`days${days}`]}
  //                   colorTheme={getThemeForDays(String(days))}
  //                   linkTo={`/domains/expiring/${days}`}
  //                 />
  //               );
  //             })}
  //           </div>
  //         </section>

  //         {/* Role-based Activities Section */}
  //         <section>
  //           <h2 className="text-xl font-semibold text-gray-800 mb-4">
  //             {presentableRoleName(role)} Activities
  //           </h2>
  //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
  //             {activitiesToRender.map((activity) => (
  //               <ActivityCard
  //                 key={activity.title}
  //                 title={activity.title}
  //                 IconComponent={activity.IconComponent}
  //                 linkTo={activity.linkTo}
  //               />
  //             ))}
  //           </div>
  //         </section>
  //       </div>
  //     </MainLayout>
  //   );
  // }
  return (
    <MainLayout>
      <div className="space-y-8 p-4 md:p-6">
        {" "}
        {/* Added padding to main content area */}
        {/* Expiring Domains Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Expiring Domains
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {daysList.map((days) => (
              <ExpiringDomainCard
                key={days}
                days={days}
                count={expiringCounts[`days${days}`]} // Using static counts for now
                colorTheme={getThemeForDays(String(days))}
                linkTo={`/domains/expiring/${days}`}
              />
            ))}
          </div>
        </section>
        {/* Role-based Activities Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {presentableRoleName(role)} Activities
          </h2>
          {isLoadingNotifications && (
            <p className="text-center text-gray-500 my-4">Updating counts...</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {activitiesToRender.map((activity) => (
              <ActivityCard
                key={activity.id || activity.title} // Use ID if available
                title={activity.title}
                IconComponent={activity.IconComponent}
                linkTo={activity.linkTo}
                count={
                  activityNotificationCounts[activity.id || activity.title] || 0
                }
                onClick={() => handleActivityCardClick(activity)} // Pass the handler
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
export default DashboardPage;
