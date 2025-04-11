// src/pages/HodDashboardPage.jsx
import React from "react";
import MainLayout from "../layouts/MainLayout"; // Reuse the main layout
import ExpiringDomainCard from "../components/ExpiringDomainCard"; // Reuse expiring card
import ActivityCard from "../components/ActivityCard"; // Reuse activity card
import { getThemeForDays } from "../utils/themes"; // Import themes

// Import icons for HOD Activity Cards
import {
  MdOutlinePlaylistAdd, // For Assign DRM/Projects
  MdWorkHistory, // For Assigned Projects
  MdOutlineFactCheck, // For Verify Domain Name Requests
} from "react-icons/md";

// Get the predefined themes (assuming themes.js exists as created before)
const themes = {
  90: getThemeForDays("90"),
  60: getThemeForDays("60"),
  30: getThemeForDays("30"),
  15: getThemeForDays("15"),
};

function HodDashboardPage() {
  // Placeholder data - will come from API later
  const expiringCounts = {
    days90: 32, // Example counts
    days60: 18,
    days30: 11,
    days15: 4,
  };

  // Define HOD specific activities
  const hodActivities = [
    {
      title: "Assign DRM/Projects",
      IconComponent: MdOutlinePlaylistAdd,
      linkTo: "/projects/assign",
    }, // Define appropriate route
    {
      title: "Assigned Projects",
      IconComponent: MdWorkHistory,
      linkTo: "/projects/assigned",
    }, // Define appropriate route
    {
      title: "Verify Domain Name Requests",
      IconComponent: MdOutlineFactCheck,
      linkTo: "/domains/verify-requests",
    }, // Define appropriate route
  ];

  return (
    <MainLayout>
      {" "}
      {/* Use the standard layout */}
      <div className="space-y-8">
        {/* Expiring Domains Section (Identical to DRM Dashboard structure) */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Expiring Domains
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <ExpiringDomainCard
              days={90}
              count={expiringCounts.days90}
              colorTheme={themes["90"]} // Use theme object
              linkTo="/domains/expiring/90"
            />
            <ExpiringDomainCard
              days={60}
              count={expiringCounts.days60}
              colorTheme={themes["60"]}
              linkTo="/domains/expiring/60"
            />
            <ExpiringDomainCard
              days={30}
              count={expiringCounts.days30}
              colorTheme={themes["30"]}
              linkTo="/domains/expiring/30"
            />
            <ExpiringDomainCard
              days={15}
              count={expiringCounts.days15}
              colorTheme={themes["15"]}
              linkTo="/domains/expiring/15"
            />
          </div>
        </section>

        {/* My Activities Section (HOD Specific) */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            My Activities
          </h2>
          {/* Use a grid, adjust columns as needed (3 items fit well) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {hodActivities.map((activity) => (
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

export default HodDashboardPage;
