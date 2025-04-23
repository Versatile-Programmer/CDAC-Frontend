// // src/pages/DashboardPage.jsx
// import React from "react";
// import ExpiringDomainCard from "../components/ExpiringDomainCard";
// import ActivityCard from "../components/ActivityCard";
// import MainLayout from "../layouts/MainLayout";
// import { getThemeForDays } from "../utils/themes"; // Get theme per expiry range

// // Import icons
// import {
//   MdOutlineAddCircleOutline,
//   MdOutlineAutorenew,
//   MdOutlineSwapHoriz,
//   MdOutlineVisibility,
//   MdOutlineAssessment,
//   MdOutlinePlaylistAdd,
//   MdWorkHistory,
//   MdOutlineFactCheck,
// } from "react-icons/md";

// // Simulate getting user role from context/auth (replace with real logic)
// const getUserRole = () => {
//     const userLS = localStorage.getItem("user");
//     if(userLS === null)
//         return "DRM" 
//     try {
//         const userDetails = JSON.parse(userLS);
//         console.log("USER DETAILS",userDetails)
//          return userDetails.role || "DRM";

//     }catch(error){
//         throw error;
//     }
// };

// // Define expiring domain card data
// const expiringCounts = {
//   days90: 32,
//   days60: 18,
//   days30: 11,
//   days15: 4,
// };

// const daysList = [90, 60, 30, 15];

// function DashboardPage() {
//   const role = getUserRole();

//   // Role-based activities
//   const drmActivities = [
//     {
//       title: "Add Domain Name Request",
//       IconComponent: MdOutlineAddCircleOutline,
//       linkTo: "/list/projects",
//     },
//     {
//       title: "Renew Domain",
//       IconComponent: MdOutlineAutorenew,
//       linkTo: "/domains/renew",
//     },
//     {
//       title: "Transfer/Delete Domain",
//       IconComponent: MdOutlineSwapHoriz,
//       linkTo: "/domains/transfer-delete",
//     },
//     {
//       title: "View Domains",
//       IconComponent: MdOutlineVisibility,
//       linkTo: "/domains/view",
//     },
//     {
//       title: "Reports",
//       IconComponent: MdOutlineAssessment,
//       linkTo: "/reports",
//     },
//   ];

//   const hodActivities = [
//     {
//       title: "Assign DRM/Projects",
//       IconComponent: MdOutlinePlaylistAdd,
//       linkTo: "/projects/assign",
//     },
//     {
//       title: "Assigned Projects",
//       IconComponent: MdWorkHistory,
//       linkTo: "/projects/assigned",
//     },
//     {
//       title: "Verify Domain Name Requests",
//       IconComponent: MdOutlineFactCheck,
//       linkTo: "/domains/hod/verify-requests",
//     },
//     {
//       title: "Verify VAPT Renewal Requests",
//       IconComponent: MdOutlineFactCheck,
//       linkTo: "/view/vapt-renewals",
//     },
//     {
//       title: "Verify Transfer Requests",
//       IconComponent: MdOutlineFactCheck,
//       linkTo: "/domains/view/verify-transfer-requests",
//     },
//     {
//       title: "Verify Domain Renewal Requests",
//       IconComponent: MdOutlineFactCheck,
//       linkTo: "/domains/hod/verify-renewal",
//     },
//   ]  

//   const activitiesToRender = role === "HOD" ? hodActivities : drmActivities;

//   return (
//     <MainLayout>
//       <div className="space-y-8">
//         {/* Expiring Domains Section */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Expiring Domains
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {daysList.map((days) => (
//               <ExpiringDomainCard
//                 key={days}
//                 days={days}
//                 count={expiringCounts[`days${days}`]}
//                 colorTheme={getThemeForDays(String(days))}
//                 linkTo={`/domains/expiring/${days}`}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Role-based Activities Section */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             {role === "HOD" ? "HOD Activities" : "My Activities"}
//             {console.log("ROLE",role)}
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

// export default DashboardPage;

import React from "react";
import ExpiringDomainCard from "../components/ExpiringDomainCard";
import ActivityCard from "../components/ActivityCard";
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

// Simulate getting user role from context/auth (replace with real logic)
const getUserRole = () => {
  const userLS = localStorage.getItem("user");
  if (userLS === null) return "DRM";
  try {
    const userDetails = JSON.parse(userLS);
    return userDetails.role || "DRM";
  } catch (error) {
    console.error(error);
    return "DRM";
  }
};

const expiringCounts = {
  days90: 32,
  days60: 18,
  days30: 11,
  days15: 4,
};
const daysList = [90, 60, 30, 15];

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
  const role = getUserRole();

  // Define activities per role
  const activitiesMap = {
    DRM: [
      { title: "Add Domain Name Request", IconComponent: MdOutlineAddCircleOutline, linkTo: "/list/projects" },
      { title: "Renew Domain", IconComponent: MdOutlineAutorenew, linkTo: "/domains/renew" },
      { title: "Transfer/Delete Domain", IconComponent: MdOutlineSwapHoriz, linkTo: "/domains/transfer-delete" },
      { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
      { title: "Reports", IconComponent: MdOutlineAssessment, linkTo: "/reports" },
    ],
    HOD: [
      { title: "Assign DRM/Projects", IconComponent: MdOutlinePlaylistAdd, linkTo: "/projects/assign" },
      { title: "Assigned Projects", IconComponent: MdWorkHistory, linkTo: "/projects/assigned" },
      { title: "Verify Domain Name Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hod/verify-requests" },
      { title: "Verify VAPT Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/view/vapt-renewals" },
      { title: "Verify Transfer Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/view/verify-transfer-requests" },
      { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hod/verify-renewal" },
    ],
    ARM: [
      { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-requests" },
      { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-renewal" },
      // { title: "Verify VAPT Renewals", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-vapt-renewals" },
      // { title: "Verify Transfer Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/arm/verify-transfer-requests" },
      { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
    ],
    ED: [
      { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/ed/verify-requests" },
      { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/ed/verify-renewal" },
      { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
    ],
    NETOPS: [
      { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/netops/verify-requests" },
      { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/netops/verify-renewal" },
      { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
    ],
    WEBMASTER: [
      { title: "Enter Domain Purchase Details", IconComponent: MdOutlineFactCheck, linkTo: "/domains/webmaster/purchase-details" },
      { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/webmaster/verify-requests" },
      { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/webmaster/verify-renewal" },
      { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
    ],
    HODHPC: [
      { title: "Verify Domain Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hodhpc/verify-requests" },
      { title: "Verify Domain Renewal Requests", IconComponent: MdOutlineFactCheck, linkTo: "/domains/hodhpc/verify-renewal" },
      { title: "View Domains", IconComponent: MdOutlineVisibility, linkTo: "/domains/view" },
    ],
  };

  const activitiesToRender = activitiesMap[role] || activitiesMap.DRM;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Expiring Domains Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expiring Domains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {daysList.map((days) => (
              <ExpiringDomainCard
                key={days}
                days={days}
                count={expiringCounts[`days${days}`]}
                colorTheme={getThemeForDays(String(days))}
                linkTo={`/domains/expiring/${days}`}
              />
            ))}
          </div>
        </section>

        {/* Role-based Activities Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{presentableRoleName(role)} Activities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {activitiesToRender.map((activity) => (
              <ActivityCard
                key={activity.title}
                title={activity.title}
                IconComponent={activity.IconComponent}
                linkTo={activity.linkTo}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
