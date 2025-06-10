// // src/pages/ExpiringDomainsPage.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import { getThemeForDays } from "../utils/themes"; // Import theme utility

// function ExpiringDomainsPage() {
//   // Get the 'days' parameter from the URL
//   const { days } = useParams(); // This will be a string '90', '60', etc.

//   // Get the corresponding theme based on the days parameter
//   const currentTheme = getThemeForDays(days);

//   // Define table columns
//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Domain Name", accessor: "domainName" },
//     { header: "Expiry Date", accessor: "expiryDate" },
//     { header: "Expiring in (days)", accessor: "expiringIn" },
//   ];

//   // Placeholder data - Replace with actual data fetched from API later
//   const placeholderData = [
//     {
//       serialNo: 1,
//       domainName: "example.com",
//       drmName: "John Doe",
//       group: "John's Group",
//       centre: "John's Centre",
//       expiryDate: "19/03/2025",
//       expiringIn: 6,
//     },
//     {
//       serialNo: 2,
//       domainName: "another-domain.net",
//       drmName: "Jane Smith",
//       group: "Jane's Group",
//       centre: "Jane's Centre",
//       expiryDate: "25/03/2025",
//       expiringIn: 12,
//     },
//     {
//       serialNo: 3,
//       domainName: "test-site.org",
//       drmName: "Peter Jones",
//       group: "Peter's Group",
//       centre: "Peter's Centre",
//       expiryDate: "01/04/2025",
//       expiringIn: 18,
//     },
//     // Add more dummy rows if needed for styling checks
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },
//     {
//       serialNo: 4,
//       domainName: "widget-corp.co",
//       drmName: "Alice Williams",
//       group: "Alice's Group",
//       centre: "Alice's Centre",
//       expiryDate: "10/04/2025",
//       expiringIn: 27,
//     },

//   ];

//   // Filter placeholder data just for visual demo - REMOVE THIS LATER
//   const filteredData = placeholderData
//     .filter((item) => {
//       // Dummy filtering logic based on days param - replace with API call
//       if (days === "90") return item.expiringIn <= 90;
//       if (days === "60") return item.expiringIn <= 60;
//       if (days === "30") return item.expiringIn <= 30;
//       if (days === "15") return item.expiringIn <= 15;
//       return true; // Should not happen with defined routes
//     })
//     .map((item, index) => ({ ...item, serialNo: index + 1 })); // Recalculate serial no after filter

//   return (
//     <MainLayout>
//       <div className="space-y-6">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Domains Expiring In {days} Days
//         </h2>

//         {/* Render the themed table */}
//         <Table
//           columns={columns}
//           data={filteredData} // Use filtered data for demo
//           theme={currentTheme} // Pass the selected theme!
//           emptyMessage={`No domains found expiring in the next ${days} days.`}
//         />
//       </div>
//     </MainLayout>
//   );
// }

// export default ExpiringDomainsPage;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // 1. Import axios
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes";
import { authTokenState, userState } from "../recoil/atoms/authState";
import { useRecoilValue } from "recoil"; // 2. Use useRecoilValue for reading state

// Define the base URL for the API.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function ExpiringDomainsPage() {
  const { days } = useParams();

  // Use useRecoilValue to get the actual state value directly
  const authToken = useRecoilValue(authTokenState);
  const userInfo = useRecoilValue(userState);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentTheme = getThemeForDays(days);

  useEffect(() => {
    const fetchExpiringDomains = async () => {
      setLoading(true);
      setError(null);
      setData([]); // Clear previous data

      // Check for authentication details from Recoil state
      const drmId = userInfo?.id; // Use optional chaining for safety

      if (!authToken || !drmId) {
        setError("Authentication details are missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        // 3. Refactor to use axios.get
        const response = await axios.get(
          `${API_BASE_URL}/domain/expiring-domains/${days}/${drmId}`,
          {
            headers: {
              // Pass headers in the config object
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // axios automatically parses JSON, data is in response.data
        const responseData = response.data;

        const transformedData = responseData.content.map((item, index) => {
          const expiryDate = new Date(item.expiringDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const timeDiff = expiryDate.getTime() - today.getTime();
          const expiringIn = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

          return {
            serialNo: index + 1,
            domainName: item.domainName,
            expiryDate: expiryDate.toLocaleDateString("en-GB"), // DD/MM/YYYY
            expiringIn: expiringIn >= 0 ? expiringIn : 0,
          };
        });

        setData(transformedData);
      } catch (err) {
        // axios throws an error for non-2xx responses, which is caught here
        console.error("API Error:", err);
        const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringDomains();
  }, [days, authToken, userInfo]); // 4. Add authToken and userInfo to dependency array

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "Expiry Date", accessor: "expiryDate" },
    { header: "Expiring in (days)", accessor: "expiringIn" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Domains Expiring In {days} Days
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading domains...</p>
        ) : error ? (
          <p className="text-center text-red-500 font-medium">Error: {error}</p>
        ) : (
          <Table
            columns={columns}
            data={data}
            theme={currentTheme}
            emptyMessage={`No domains found expiring in the next ${days} days.`}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default ExpiringDomainsPage;
