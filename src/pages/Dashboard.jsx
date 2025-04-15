// src/pages/DashboardPage.jsx
import React from "react";
import ExpiringDomainCard from "../components/ExpiringDomainCard";
import ActivityCard from "../components/ActivityCard";
import MainLayout from "../layouts/MainLayout";
import { getThemeForDays } from "../utils/themes"; // Get theme per expiry range

// Import icons
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
    if(userLS === null)
        return "DRM" 
    try {
        const userDetails = JSON.parse(userLS);
        console.log("USER DETAILS",userDetails)
         return userDetails.role || "DRM";

    }catch(error){
        throw error;
    }
};

// Define expiring domain card data
const expiringCounts = {
  days90: 32,
  days60: 18,
  days30: 11,
  days15: 4,
};

const daysList = [90, 60, 30, 15];

function DashboardPage() {
  const role = getUserRole();

  // Role-based activities
  const drmActivities = [
    {
      title: "Add Domain Name Request",
      IconComponent: MdOutlineAddCircleOutline,
      linkTo: "/list/projects",
    },
    {
      title: "Renew Domain",
      IconComponent: MdOutlineAutorenew,
      linkTo: "/domains/renew",
    },
    {
      title: "Transfer/Delete Domain",
      IconComponent: MdOutlineSwapHoriz,
      linkTo: "/domains/transfer-delete",
    },
    {
      title: "View Domains",
      IconComponent: MdOutlineVisibility,
      linkTo: "/domains/view",
    },
    {
      title: "Reports",
      IconComponent: MdOutlineAssessment,
      linkTo: "/reports",
    },
  ];

  const hodActivities = [
    {
      title: "Assign DRM/Projects",
      IconComponent: MdOutlinePlaylistAdd,
      linkTo: "/projects/assign",
    },
    {
      title: "Assigned Projects",
      IconComponent: MdWorkHistory,
      linkTo: "/projects/assigned",
    },
    {
      title: "Verify Domain Name Requests",
      IconComponent: MdOutlineFactCheck,
      linkTo: "/domains/verify-requests",
    },
  ];

  const activitiesToRender = role === "HOD" ? hodActivities : drmActivities;

  return (
    <MainLayout>
      <div className="space-y-8">
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
                count={expiringCounts[`days${days}`]}
                colorTheme={getThemeForDays(String(days))}
                linkTo={`/domains/expiring/${days}`}
              />
            ))}
          </div>
        </section>

        {/* Role-based Activities Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {role === "HOD" ? "HOD Activities" : "My Activities"}
            {console.log("ROLE",role)}
          </h2>
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
