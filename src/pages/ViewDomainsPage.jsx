
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // To navigate to detail page
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import { getThemeForDays } from "../utils/themes"; // Can use default theme
// import fetchUser from "../utils/fetchUser"; // Your fetchUser function
// import axios from "axios";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";

// function ViewDomainsPage() {


//   const authToken = useRecoilValue(authTokenState)

//   const user = fetchUser();

//   const navigate = useNavigate();

//   // Theme for the list
//   const currentTheme = getThemeForDays("default");

//   // State for domains, loading, and error
//   const [domains, setDomains] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function loadDomains() {
//       try {
//         // Get current user (id and role)
   
//         // const { id: empId, role } = user;

//         // Fetch domains by employee ID and role
//         const res = await axios.get(`${API_BASE_URL}/domain/view-domains/${user.role}/${user.id}`,{
//           headers:{
//             'Content-Type':'application/json',
//             'Authorization':`Bearer ${authToken}`
//           }
//         });
//         // if (!res.ok) {
//         //   throw new Error(`Failed to fetch domains: ${res.status} ${res.statusText}`);
//         // }
//         console.log("DASDAS",res.data)
//         setDomains(res.data);
//       } catch (err) {
//         console.error("Error loading domains:", err);
//         setError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadDomains();
//   }, []);

//   // Navigate to detail view
//   const handleViewDetails = (domainId) => {
//     navigate(`/domains/details/${domainId}`);
//   };

//   // Define table columns
//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Domain Name", accessor: "domainName" },
//     { header: "DRM Name", accessor: "drmName" },
//     { header: "Group", accessor: "drmGroupName" },
//     { header: "Centre", accessor: "drmCentreName" },
//     { header: "Expiry Date", accessor: "domainExpiryDate" },
//     { header: "Status", accessor: "status" },
//     { header: "Actions", accessor: "actions" },
//   ];

//   // Map domains to rows with action buttons
//   const dataWithActions = domains.map((item, index) => ({
//     ...item,
//     serialNo: index + 1,
//     actions: (
//       <button
//         onClick={() => handleViewDetails(item.domainId)}
//         className={`px-3 py-1 text-sm rounded ${currentTheme.link} underline`} // Use theme link color
//       >
//         View
//       </button>
//     ),
//   }));

//   return (
//     <MainLayout>
//       <div className="space-y-6">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           My Domains
//         </h2>

//         {/* Loading and error states */}
//         {loading && <p>Loading domains...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}

//         {/* Domain table */}
//         {!loading && !error && (
//           <Table
//             columns={columns}
//             data={dataWithActions}
//             theme={currentTheme}
//             emptyMessage="No domains found."
//           />
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default ViewDomainsPage;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes";
import fetchUser from "../utils/fetchUser";
import axios from "axios";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";

function ViewDomainsPage() {
  const authToken = useRecoilValue(authTokenState);
  const user = fetchUser();
  const navigate = useNavigate();
  const currentTheme = getThemeForDays("default");

  // State for domains, loading, and error
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. ADD STATE FOR PAGINATION ---
  const [page, setPage] = useState(0); // Current page (0-indexed)
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Or your preferred page size

  // --- 2. MODIFY useEffect TO HANDLE PAGINATION ---
  useEffect(() => {
    // Define the async function inside the effect to prevent infinite loops
    async function loadDomains() {
      if (!user?.role || !user?.id || !authToken) {
        setError("User information is missing.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Fetch domains with page and size parameters
        const res = await axios.get(`${API_BASE_URL}/domain/view-domains/${user.role}/${user.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          params: {
            page: page,
            size: pageSize
          }
        });

        // The response is now a page object, not an array.
        // Get the list of domains from the 'content' property.
        setDomains(res.data.content);
        // Set the total number of pages for the pagination controls
        setTotalPages(res.data.totalPages);

      } catch (err) {
        console.error("Error loading domains:", err);
        setError(err.message || "Unknown error");
        setDomains([]); // Clear data on error
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    }

    loadDomains();
    // The effect re-runs when the page number or user details change
  }, [user?.id, user?.role, authToken, page, pageSize]);

  const handleViewDetails = (domainId) => {
    navigate(`/domains/details/${domainId}`);
  };

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "DRM Name", accessor: "drmName" },
    { header: "Group", accessor: "drmGroupName" },
    { header: "Centre", accessor: "drmCentreName" },
    { header: "Expiry Date", accessor: "domainExpiryDate" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
  ];

  // --- 3. FIX SERIAL NUMBER CALCULATION ---
  const dataWithActions = domains.map((item, index) => ({
    ...item,
    // Calculate serial number based on page and index
    serialNo: page * pageSize + index + 1,
    actions: (
      <button
        onClick={() => handleViewDetails(item.domainId)}
        className={`px-3 py-1 text-sm rounded ${currentTheme.link} underline`}
      >
        View
      </button>
    ),
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Domains
        </h2>

        {loading && <p>Loading domains...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            <Table
              columns={columns}
              data={dataWithActions}
              theme={currentTheme}
              emptyMessage="No domains found."
            />

            {/* --- 4. ADD PAGINATION CONTROLS DIRECTLY --- */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page + 1 >= totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default ViewDomainsPage;
