

// // src/pages/RenewDomainsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import { getThemeForDays } from "../utils/themes";
// import axios from "axios";
// import fetchUser from "../utils/fetchUser";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState"; // isAuthenticatedState not directly used here
// import { FaRedoAlt } from "react-icons/fa"; // Icon for Renew
// import { FiLoader } from "react-icons/fi"; // Icon for Loading

// // Assuming a Button component like in GenericDomainVerificationPage might exist
// // If not, we'll style the button directly. For this example, we'll style directly.
// // import { Button } from "../components/common/Button";

// function RenewDomainsPage() {
//   const navigate = useNavigate();
//   const user = fetchUser();
//   const drmId = user?.id; // Ensure user and user.id exist
//   const authToken = useRecoilValue(authTokenState); // Renamed from 'authenticated' for clarity
//   const currentTheme = getThemeForDays("default");

//   // Define base button classes - adapt to your theme or use Tailwind directly
//   const themeButtonBase = currentTheme.button || "font-medium rounded-lg text-sm focus:outline-none focus:ring-4";
//   const themeButtonPrimary = currentTheme.buttonPrimary || "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white";


//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Domain Name", accessor: "domainName" },
//     { header: "ARM Name", accessor: "armName" },
//     { header: "ARM Mobile", accessor: "armMobile" },
//     { header: "ARM Email", accessor: "armEmail" },
//     { header: "Expiry Date", accessor: "expiringDate" },
//     { header: "Status", accessor: "statusPill" }, // Using statusPill for styled output
//     { header: "Actions", accessor: "actions" },
//   ];

//   const [domains, setDomains] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getStatusInfo = (expiringDate) => {
//     const today = new Date();
//     const expiry = new Date(expiringDate);
//     expiry.setHours(0, 0, 0, 0); // Normalize expiry date to start of day
//     today.setHours(0, 0, 0, 0);   // Normalize today to start of day

//     let text = "Pending Renewal"; // Default for this page
//     let className = "bg-blue-100 text-blue-700"; // Default for pending

//     if (expiry < today) {
//       text = "Expired";
//       className = "bg-red-100 text-red-700";
//     } else if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) {
//       text = "Expiring Soon";
//       className = "bg-yellow-100 text-yellow-700";
//     }
//     // For domains listed on "RenewDomainsPage", they are primarily "Pending Renewal"
//     // unless they fit the "Expired" or "Expiring Soon" criteria more specifically.
//     // The API should ideally filter for domains eligible for renewal.
//     return { text, className };
//   };

//   useEffect(() => {
//     async function fetchDomains() {
//       if (!drmId || !authToken) {
//         setError("User information or authentication token is missing.");
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`${API_BASE_URL}/domain/list/renew/${drmId}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//           }
//         });
//         const rawData = response.data;

//         const updatedData = rawData.map((item, index) => {
//           const statusInfo = getStatusInfo(item.expiringDate);
//           return {
//             serialNo: index + 1,
//             domainId: item.domainId,
//             domainName: <span className="font-medium text-gray-800">{item.domainName}</span>,
//             armName: item.armName || <span className="text-gray-500 italic">N/A</span>,
//             armMobile: item.armMobile || <span className="text-gray-500 italic">N/A</span>,
//             armEmail: item.armEmail || <span className="text-gray-500 italic">N/A</span>,
//             expiringDate: new Date(item.expiringDate).toLocaleDateString(),
//             status: statusInfo.text, // Raw status text
//             statusPill: (
//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
//                 {statusInfo.text}
//               </span>
//             ),
//           };
//         });

//         setDomains(updatedData);
//       } catch (err) {
//         console.error("Error fetching domains:", err);
//         setError("Failed to fetch domains for renewal. Please try again later.");
//         setDomains([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDomains();
//   }, [drmId, authToken]);

//   const handleRenewDomain = (domainId) => {
//     navigate(`/domains/renew/${domainId}`);
//   };

//   const dataWithActions = domains.map((item) => ({
//     ...item,
//     actions: (
//       <button
//         onClick={() => handleRenewDomain(item.domainId)}
//         title="Renew Domain"
//         className={`${themeButtonBase} ${themeButtonPrimary} px-4 py-2 flex items-center text-white`} // More prominent button
//       >
//         <FaRedoAlt className="mr-2" />
//         Renew
//       </button>
//     ),
//   }));

//   return (
//     <MainLayout>
//       <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen"> {/* Consistent padding and bg */}
//         <h1 className="text-3xl font-bold text-gray-800 border-b pb-4"> {/* Enhanced Heading */}
//           Renew Domains
//         </h1>

//         {loading && (
//           <div className="flex flex-col items-center justify-center h-64">
//             <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
//             <p className="text-lg text-gray-600">Loading domains for renewal...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <strong className="font-bold">Error: </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="bg-white shadow-xl rounded-lg overflow-hidden"> {/* Card-like container for table */}
//             <Table
//               columns={columns}
//               data={dataWithActions}
//               theme={currentTheme}
//               emptyMessage={
//                 domains.length === 0
//                 ? "No domains are currently pending or eligible for renewal."
//                 : "No domains found." // Fallback, though the above is more specific
//               }
//             />
//           </div>
//         )}
        
//         {!loading && !error && domains.length === 0 && (
//            <div className="text-center py-10 mt-6"> {/* Added margin top */}
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//               <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2M9 15h9" />
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No Domains for Renewal</h3>
//             <p className="mt-1 text-sm text-gray-500">There are currently no domains pending or eligible for renewal.</p>
//             {/* Optional: Add a button to navigate elsewhere if needed */}
//             {/* <div className="mt-6">
//               <button
//                 type="button"
//                 onClick={() => navigate('/dashboard')} // Example route
//                 className={`${themeButtonBase} ${themeButtonPrimary} px-4 py-2`}
//               >
//                 Go to Dashboard
//               </button>
//             </div> */}
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default RenewDomainsPage;


import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import PaginationControls from "../components/PaginationControls"; // Import the new component
import { getThemeForDays } from "../utils/themes";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { FaRedoAlt } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

function RenewDomainsPage() {
  const navigate = useNavigate();
  const user = fetchUser();
  const drmId = user?.id;
  const authToken = useRecoilValue(authTokenState);
  const currentTheme = getThemeForDays("default");

  const themeButtonBase = currentTheme.button || "font-medium rounded-lg text-sm focus:outline-none focus:ring-4";
  const themeButtonPrimary = currentTheme.buttonPrimary || "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white";

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "ARM Name", accessor: "armName" },
    { header: "ARM Mobile", accessor: "armMobile" },
    { header: "ARM Email", accessor: "armEmail" },
    { header: "Expiry Date", accessor: "expiringDate" },
    { header: "Status", accessor: "statusPill" },
    { header: "Actions", accessor: "actions" },
  ];

  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW: State for pagination ---
  const [page, setPage] = useState(0); // Current page (0-indexed)
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Or your preferred default page size

  // --- Status calculation remains the same ---
  const getStatusInfo = (expiringDate) => {
    // ... same as your existing function
    const today = new Date();
    const expiry = new Date(expiringDate);
    expiry.setHours(0, 0, 0, 0); 
    today.setHours(0, 0, 0, 0);

    let text = "Pending Renewal";
    let className = "bg-blue-100 text-blue-700";

    if (expiry < today) {
      text = "Expired";
      className = "bg-red-100 text-red-700";
    } else if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) {
      text = "Expiring Soon";
      className = "bg-yellow-100 text-yellow-700";
    }
    return { text, className };
  };

  // --- UPDATED: Data fetching logic ---
  const fetchDomains = useCallback(async () => {
    if (!drmId || !authToken) {
      setError("User information or authentication token is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Add 'page' and 'size' parameters to the URL
      const response = await axios.get(`${API_BASE_URL}/domain/list/renew/${drmId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        params: {
          page: page,
          size: pageSize,
          // You can also add sort params here if your backend supports it
          // sort: 'expiringDate,asc'
        }
      });
      
      const { content, totalPages, totalElements } = response.data;

      const updatedData = content.map((item, index) => {
        const statusInfo = getStatusInfo(item.expiringDate);
        return {
          // --- UPDATED: Correct serial number calculation ---
          serialNo: page * pageSize + index + 1,
          domainId: item.domainId,
          domainName: <span className="font-medium text-gray-800">{item.domainName}</span>,
          armName: item.armName || <span className="text-gray-500 italic">N/A</span>,
          armMobile: item.armMobile || <span className="text-gray-500 italic">N/A</span>,
          armEmail: item.armEmail || <span className="text-gray-500 italic">N/A</span>,
          expiringDate: new Date(item.expiringDate).toLocaleDateString(),
          statusPill: (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
              {statusInfo.text}
            </span>
          ),
        };
      });

      setDomains(updatedData);
      setTotalPages(totalPages);
      setTotalElements(totalElements);

    } catch (err) {
      console.error("Error fetching domains:", err);
      setError("Failed to fetch domains for renewal. Please try again later.");
      setDomains([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [drmId, authToken, page, pageSize]); // Add page and pageSize to dependency array

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const handleRenewDomain = (domainId) => {
    navigate(`/domains/renew/${domainId}`);
  };

  const dataWithActions = domains.map((item) => ({
    ...item,
    actions: (
      <button
        onClick={() => handleRenewDomain(item.domainId)}
        title="Renew Domain"
        className={`${themeButtonBase} ${themeButtonPrimary} px-4 py-2 flex items-center text-white`}
      >
        <FaRedoAlt className="mr-2" />
        Renew
      </button>
    ),
  }));

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
          Renew Domains
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading domains for renewal...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Table
              columns={columns}
              data={dataWithActions}
              theme={currentTheme}
              emptyMessage="No domains are currently pending or eligible for renewal."
            />
            {/* --- NEW: Render Pagination Controls --- */}
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              totalElements={totalElements}
              itemsPerPage={pageSize}
              itemsOnPage={domains.length}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
        
        {!loading && !error && totalElements === 0 && (
          <div className="text-center py-10 mt-6">
            {/* ... your empty state SVG and text here ... */}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default RenewDomainsPage;