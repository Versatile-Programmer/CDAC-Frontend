// src/pages/ViewDomainsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // To navigate to detail page
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes"; // Can use default theme

function ViewDomainsPage() {
  const navigate = useNavigate();

  // Get the default theme or any specific theme you want for this list
  const currentTheme = getThemeForDays("default"); // Use default gray theme

  // Define table columns - Add an 'Actions' column
  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "DRM Name", accessor: "drmName" },
    { header: "Group", accessor: "group" },
    { header: "Centre", accessor: "centre" },
    { header: "Expiry Date", accessor: "expiryDate" },
    { header: "Status", accessor: "status" }, // Add a status column
    { header: "Actions", accessor: "actions" }, // Actions column
  ];

  // Placeholder data - Replace with API call later
  // Add a 'domainId' and 'status' field
  const placeholderData = [
    {
      domainId: "101",
      serialNo: 1,
      domainName: "example.com",
      drmName: "John Doe",
      group: "John's Group",
      centre: "John's Centre",
      expiryDate: "19/03/2025",
      status: "Application Submitted",
    },
    {
      domainId: "102",
      serialNo: 2,
      domainName: "another-domain.net",
      drmName: "Jane Smith",
      group: "Jane's Group",
      centre: "Jane's Centre",
      expiryDate: "25/12/2024",
      status: "Webmaster Verified",
    },
    {
      domainId: "103",
      serialNo: 3,
      domainName: "test-site.org",
      drmName: "Peter Jones",
      group: "Peter's Group",
      centre: "Peter's Centre",
      expiryDate: "01/04/2026",
      status: "Purchased",
    },
    {
      domainId: "104",
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "15/02/2025",
      status: "Active",
    },
    // Add more dummy rows
    {
      domainId: "105",
      serialNo: 5,
      domainName: "new-project.dev",
      drmName: "John Doe",
      group: "John's Group",
      centre: "John's Centre",
      expiryDate: "N/A",
      status: "Application Submitted",
    },
  ].map((item, index) => ({ ...item, serialNo: index + 1 })); // Recalc serial

  // Function to handle viewing details
  const handleViewDetails = (domainId) => {
    navigate(`/domains/details/${domainId}`); // Navigate to detail page route
  };

  // Add the "View" button to each data row dynamically
  const dataWithActions = placeholderData.map((item) => ({
    ...item,
    // Render JSX for the actions column
    actions: (
      <button
        onClick={() => handleViewDetails(item.domainId)}
        className={`px-3 py-1 text-sm rounded ${currentTheme.link} underline`} // Use theme link color
      >
        View
      </button>
    ),
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Domains {/* Title might change based on role later */}
        </h2>

        {/* Add filtering/sorting controls here later if needed */}
        {/* <div className="bg-white p-4 rounded-lg shadow"> Filter/Sort UI </div> */}

        <Table
          columns={columns}
          data={dataWithActions} // Use data with action buttons
          theme={currentTheme}
          emptyMessage="No domains found."
          // maxHeight="max-h-[70vh]" // Optional: Adjust max height
        />
      </div>
    </MainLayout>
  );
}

export default ViewDomainsPage;
