// src/pages/ExpiringDomainsPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes"; // Import theme utility

function ExpiringDomainsPage() {
  // Get the 'days' parameter from the URL
  const { days } = useParams(); // This will be a string '90', '60', etc.

  // Get the corresponding theme based on the days parameter
  const currentTheme = getThemeForDays(days);

  // Define table columns
  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "Expiry Date", accessor: "expiryDate" },
    { header: "Expiring in (days)", accessor: "expiringIn" },
  ];

  // Placeholder data - Replace with actual data fetched from API later
  const placeholderData = [
    {
      serialNo: 1,
      domainName: "example.com",
      drmName: "John Doe",
      group: "John's Group",
      centre: "John's Centre",
      expiryDate: "19/03/2025",
      expiringIn: 6,
    },
    {
      serialNo: 2,
      domainName: "another-domain.net",
      drmName: "Jane Smith",
      group: "Jane's Group",
      centre: "Jane's Centre",
      expiryDate: "25/03/2025",
      expiringIn: 12,
    },
    {
      serialNo: 3,
      domainName: "test-site.org",
      drmName: "Peter Jones",
      group: "Peter's Group",
      centre: "Peter's Centre",
      expiryDate: "01/04/2025",
      expiringIn: 18,
    },
    // Add more dummy rows if needed for styling checks
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },
    {
      serialNo: 4,
      domainName: "widget-corp.co",
      drmName: "Alice Williams",
      group: "Alice's Group",
      centre: "Alice's Centre",
      expiryDate: "10/04/2025",
      expiringIn: 27,
    },

  ];

  // Filter placeholder data just for visual demo - REMOVE THIS LATER
  const filteredData = placeholderData
    .filter((item) => {
      // Dummy filtering logic based on days param - replace with API call
      if (days === "90") return item.expiringIn <= 90;
      if (days === "60") return item.expiringIn <= 60;
      if (days === "30") return item.expiringIn <= 30;
      if (days === "15") return item.expiringIn <= 15;
      return true; // Should not happen with defined routes
    })
    .map((item, index) => ({ ...item, serialNo: index + 1 })); // Recalculate serial no after filter

  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Domains Expiring In {days} Days
        </h2>

        {/* Render the themed table */}
        <Table
          columns={columns}
          data={filteredData} // Use filtered data for demo
          theme={currentTheme} // Pass the selected theme!
          emptyMessage={`No domains found expiring in the next ${days} days.`}
        />
      </div>
    </MainLayout>
  );
}

export default ExpiringDomainsPage;
