// src/pages/DomainDetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// Removed FormSection import for actions
import ActivityCard from "../components/ActivityCard"; // Reuse ActivityCard for action buttons
import {
  MdOutlineInfo,
  MdTimeline,
  MdAutorenew,
  MdDeleteOutline,
  MdSwapHoriz,
} from "react-icons/md";

// Placeholder components (Keep these imports)
import DomainInfoDisplay from "../components/domain-detail/DomainInfoDisplay";
import DomainStatusMap from "../components/domain-detail/DomainStatusMap";
// We might not need separate sections anymore if actions trigger modals or navigate
// import RenewDomainSection from '../components/domain-detail/RenewDomainSection';
// import TransferDomainSection from '../components/domain-detail/TransferDomainSection';
// import DeleteDomainSection from '../components/domain-detail/DeleteDomainSection';

function DomainDetailPage() {
  const { domain_id } = useParams();

  // Placeholder domain data - Fetch from API using domain_id later
  const domainData = {
    domainId: domain_id,
    domainName: "example.com",
    status: "Active",
    expiryDate: "19/03/2025",
    // ... other fields
  };

  // Placeholder: Determine allowed actions
  const canRenew =
    domainData.status === "Active" || domainData.status === "Renewal Requested";
  const canTransfer = domainData.status === "Active";
  const canDelete =
    domainData.status === "Active" ||
    domainData.status === "Pending Verification";

  // --- Define Actions ---
  // Later, these linkTo paths might open modals instead of navigating to full pages
  const actions = [];
  if (canRenew) {
    actions.push({
      title: "Renew Domain",
      IconComponent: MdAutorenew,
      linkTo: `/domains/renew?domainId=${domain_id}`,
    }); // Example link, could open modal
  }
  if (canTransfer) {
    actions.push({
      title: "Transfer Domain",
      IconComponent: MdSwapHoriz,
      linkTo: `/domains/transfer?domainId=${domain_id}`,
    }); // Example link, could open modal
  }
  if (canDelete) {
    actions.push({
      title: "Delete Domain",
      IconComponent: MdDeleteOutline,
      linkTo: `/domains/delete?domainId=${domain_id}`,
    }); // Example link, could open modal
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Domain Details:{" "}
            <span className="font-bold text-blue-600">
              {domainData.domainName}
            </span>
          </h2>
          <Link
            to="/domains/view"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to List
          </Link>
        </div>

        {/* Section 1: Domain Information Display */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MdOutlineInfo className="mr-2 text-blue-500" /> Information
          </h3>
          <DomainInfoDisplay domainData={domainData} />
        </section>

        {/* Section 2: Status Map */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MdTimeline className="mr-2 text-green-500" /> Status Workflow
          </h3>
          <DomainStatusMap domainStatus={domainData.status} />
        </section>

        {/* Section 3: Actions (Using ActivityCard style) */}
        {actions.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Actions
            </h3>
            {/* Use a grid that adapts, similar to dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {actions.map((action) => (
                <ActivityCard
                  key={action.title}
                  title={action.title}
                  IconComponent={action.IconComponent}
                  linkTo={action.linkTo} // This link might later trigger a modal onClick
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}

export default DomainDetailPage;
