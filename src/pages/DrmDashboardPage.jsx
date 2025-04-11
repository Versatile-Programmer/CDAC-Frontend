// src/pages/DashboardPage.jsx
import React from "react";
import ExpiringDomainCard from "../components/ExpiringDomainCard";
import ActivityCard from "../components/ActivityCard";

// Import icons for Activity Cards
import {
  MdOutlineAddCircleOutline,
  MdOutlineAutorenew,
  MdOutlineSwapHoriz,
  MdOutlineVisibility,
  MdOutlineAssessment,
} from "react-icons/md";
import MainLayout from "../layouts/MainLayout";

// Define soothing color themes for expiring cards
    const themes = {
    days90: {
        bg: "bg-sky-50",
        text: "text-sky-800",
        footerBg: "bg-sky-100",
        countText: "text-sky-600",
    },
    days60: {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        footerBg: "bg-emerald-100",
        countText: "text-emerald-600",
    },
    days30: {
        bg: "bg-amber-50",
        text: "text-amber-800",
        footerBg: "bg-amber-100",
        countText: "text-amber-600",
    },
    days15: {
        bg: "bg-rose-50",
        text: "text-rose-800",
        footerBg: "bg-rose-100",
        countText: "text-rose-600",
    },
    };


function DrmDashboardPage() {
  // Placeholder data - will come from API later
  const expiringCounts = {
    days90: 32,
    days60: 33,
    days30: 40,
    days15: 5,
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {" "}
        {/* Add vertical space between sections */}
        {/* Expiring Domains Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Expiring Domains
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <ExpiringDomainCard
              days={90}
              count={expiringCounts.days90}
              colorTheme={themes.days90}
              linkTo="/domains/expiring/90" // Link to the specific expiring page
            />
            <ExpiringDomainCard
              days={60}
              count={expiringCounts.days60}
              colorTheme={themes.days60}
              linkTo="/domains/expiring/60"
            />
            <ExpiringDomainCard
              days={30}
              count={expiringCounts.days30}
              colorTheme={themes.days30}
              linkTo="/domains/expiring/30"
            />
            <ExpiringDomainCard
              days={15}
              count={expiringCounts.days15}
              colorTheme={themes.days15}
              linkTo="/domains/expiring/15"
            />
          </div>
        </section>
        {/* My Activities Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            My Activities
          </h2>
          {/* Adjust grid columns for desired layout - 5 items might fit better in 3 or wrap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <ActivityCard
              title="Add Domain Name Request"
              IconComponent={MdOutlineAddCircleOutline}
              linkTo="/domains/add"
            />
            <ActivityCard
              title="Renew Domain"
              IconComponent={MdOutlineAutorenew}
              linkTo="/domains/renew"
            />
            <ActivityCard
              title="Transfer/Delete Domain"
              IconComponent={MdOutlineSwapHoriz}
              linkTo="/domains/transfer-delete"
            />
            <ActivityCard
              title="View Domains"
              IconComponent={MdOutlineVisibility}
              linkTo="/domains/view"
            />
            <ActivityCard
              title="Reports"
              IconComponent={MdOutlineAssessment}
              linkTo="/reports"
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default DrmDashboardPage;
