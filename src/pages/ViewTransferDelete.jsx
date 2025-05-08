// // src/pages/TransferDeleteDomainsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import { getThemeForDays } from "../utils/themes";
// import axios from "axios";
// import fetchUser from "../utils/fetchUser";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilValue } from "recoil";
// import { authTokenState, isAuthenticatedState } from "../recoil/atoms/authState";

// function TransferDeleteDomainsPage() {
//   const navigate = useNavigate();
//   const user = fetchUser();
//   const drmId = user.id;
//   const authenticated = useRecoilValue(isAuthenticatedState);
//   const currentTheme = getThemeForDays("default");
//   const authToken = useRecoilValue(authTokenState)

//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Domain Name", accessor: "domainName" },
//     { header: "ARM Name", accessor: "armName" },
//     { header: "ARM Mobile", accessor: "armMobile" },
//     { header: "ARM Email", accessor: "armEmail" },
//     { header: "Expiry Date", accessor: "expiringDate" },
//     { header: "Status", accessor: "status" },
//     { header: "Actions", accessor: "actions" },
//   ];

//   const [domains, setDomains] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchDomains() {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/domain/get-domains/${user.role}/${drmId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${authToken}`,
//           },
//         });
//         const data = response.data;

//         const updatedData = data.map((item, index) => ({
//           serialNo: index + 1,
//           domainId: item.domainId,
//           domainName: item.domainName,
//           armName: item.armName || "N/A",
//           armMobile: item.armMobile || "N/A",
//           armEmail: item.armEmail || "N/A",
//           expiringDate: item.expiringDate,
//           status: getStatus(item.expiringDate),
//         }));

//         setDomains(updatedData);
//       } catch (err) {
//         console.error("Error fetching domains:", err);
//         setDomains([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDomains();
//   }, [drmId]);

//   const getStatus = (expiringDate) => {
//     const today = new Date();
//     const expiry = new Date(expiringDate);
//     if (expiry < today) return "Expired";
//     if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) return "Expiring Soon";
//     return "Active";
//   };

//   const handleTransfer = (domainId) => {
//     navigate(`/domains/transfer/${domainId}`);
//   };

//   const handleDelete = (domainId) => {
//     if (window.confirm("Are you sure you want to delete this domain?")) {
//       axios
//         .delete(`${API_BASE_URL}/domain/delete/${domainId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "",
//           },
//         })
//         .then(() => {
//           setDomains(domains.filter((d) => d.domainId !== domainId));
//         })
//         .catch((err) => {
//           console.error("Error deleting domain:", err);
//         });
//     }
//   };

//   const dataWithActions = domains.map((item) => ({
//     ...item,
//     actions: (
//       <div className="space-x-2">
//         <button
//           onClick={() => handleTransfer(item.domainId)}
//           className={`px-3 py-1 text-sm rounded ${currentTheme.link} underline`}
//         >
//           Transfer
//         </button>
//         <button
//           onClick={() => handleDelete(item.domainId)}
//           className="px-3 py-1 text-sm rounded text-red-600 underline hover:text-red-800"
//         >
//           Delete
//         </button>
//       </div>
//     ),
//   }));

//   return (
//     <MainLayout>
//       <div className="space-y-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Transfer / Delete Domains</h2>
//         {loading ? (
//           <p>Loading domains...</p>
//         ) : (
//           <Table
//             columns={columns}
//             data={dataWithActions}
//             theme={currentTheme}
//             emptyMessage="No domains available for transfer or deletion."
//           />
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default TransferDeleteDomainsPage;



// src/pages/TransferDeleteDomainsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { authTokenState, isAuthenticatedState } from "../recoil/atoms/authState";
import { FaTrashAlt, FaExchangeAlt } from "react-icons/fa"; // Using react-icons for better visuals
import { FiLoader } from "react-icons/fi"; // For a simple loader

function TransferDeleteDomainsPage() {
  const navigate = useNavigate();
  const user = fetchUser();
  const drmId = user.id;
  // const authenticated = useRecoilValue(isAuthenticatedState); // Not directly used, but good to have for auth checks
  const currentTheme = getThemeForDays("default"); // Assuming theme provides some base styling
  const authToken = useRecoilValue(authTokenState);

  // Define base button classes - adapt to your theme or use Tailwind directly
  const themeButtonBase = currentTheme.button || "font-medium rounded-lg text-sm focus:outline-none focus:ring-4";
  const themeButtonPrimary = currentTheme.buttonPrimary || "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white";
  const themeButtonDanger = currentTheme.buttonDanger || "bg-red-600 hover:bg-red-700 focus:ring-red-300 text-white";
  const themeLink = currentTheme.link || "text-blue-600 hover:text-blue-800 underline"; // Fallback for link style

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "ARM Name", accessor: "armName" },
    { header: "ARM Mobile", accessor: "armMobile" },
    { header: "ARM Email", accessor: "armEmail" },
    { header: "Expiry Date", accessor: "expiringDate" },
    { header: "Status", accessor: "statusPill" }, // Changed to statusPill for styled output
    { header: "Actions", accessor: "actions" },
  ];

  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusInfo = (expiringDate) => {
    const today = new Date();
    const expiry = new Date(expiringDate);
    expiry.setHours(0, 0, 0, 0); // Normalize expiry date to start of day
    today.setHours(0, 0, 0, 0);   // Normalize today to start of day

    let text = "Active";
    let className = "bg-green-100 text-green-700";

    if (expiry < today) {
      text = "Expired";
      className = "bg-red-100 text-red-700";
    } else if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) {
      text = "Expiring Soon";
      className = "bg-yellow-100 text-yellow-700";
    }
    return { text, className };
  };

  useEffect(() => {
    async function fetchDomains() {
      if (!authToken || !user.id) {
        setLoading(false);
        // Optionally navigate to login or show an error if auth token or user ID is missing
        // console.error("Authentication token or user ID is missing.");
        // navigate("/login"); 
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/domain/get-domains/${user.role}/${drmId}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
        });
        const rawData = response.data;

        const updatedData = rawData.map((item, index) => {
          const statusInfo = getStatusInfo(item.expiringDate);
          return {
            serialNo: index + 1,
            domainId: item.domainId,
            domainName: <span className="font-medium text-gray-800">{item.domainName}</span>,
            armName: item.armName || <span className="text-gray-500 italic">N/A</span>,
            armMobile: item.armMobile || <span className="text-gray-500 italic">N/A</span>,
            armEmail: item.armEmail || <span className="text-gray-500 italic">N/A</span>,
            expiringDate: new Date(item.expiringDate).toLocaleDateString(),
            status: statusInfo.text, // Keep raw status text if needed elsewhere
            statusPill: (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
                {statusInfo.text}
              </span>
            ),
          };
        });

        setDomains(updatedData);
      } catch (err) {
        console.error("Error fetching domains:", err);
        // Consider setting an error state here to display to the user
        setDomains([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDomains();
  }, [drmId, authToken, user.id, user.role]); // Added authToken, user.id, user.role to dependency array

  const handleTransfer = (domainId) => {
    navigate(`/domains/transfer/${domainId}`);
  };

  const handleDelete = (domainId) => {
    if (window.confirm("Are you sure you want to delete this domain? This action cannot be undone.")) {
      axios
        .delete(`${API_BASE_URL}/domain/delete/${domainId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Corrected: Added authToken
          },
        })
        .then(() => {
          setDomains(domains.filter((d) => d.domainId !== domainId));
          // Optionally, show a success notification here
        })
        .catch((err) => {
          console.error("Error deleting domain:", err);
          // Optionally, show an error notification here
          alert("Failed to delete domain. Please try again.");
        });
    }
  };

  const dataWithActions = domains.map((item) => ({
    ...item,
    actions: (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleTransfer(item.domainId)}
          title="Transfer Domain"
          className={`${themeButtonBase} ${themeLink} px-3 py-1.5 flex items-center hover:no-underline`}
        >
          <FaExchangeAlt className="mr-2" />
          Transfer
        </button>
        <button
          onClick={() => handleDelete(item.domainId)}
          title="Delete Domain"
          className={`${themeButtonBase} ${themeButtonDanger} px-3 py-1.5 flex items-center text-white`}
        >
          <FaTrashAlt className="mr-2" />
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <MainLayout>
      <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen"> {/* Added padding and bg */}
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4"> {/* Enhanced Heading */}
          Manage Domains: Transfer or Delete
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading domains, please wait...</p>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden"> {/* Card-like container for table */}
            <Table
              columns={columns}
              data={dataWithActions}
              theme={currentTheme} // Pass theme for internal table styling
              emptyMessage={
                domains.length === 0 && !loading 
                ? "No domains found. You can add new domains or check back later." 
                : "No domains available for transfer or deletion."
              }
              // Optional: if your Table component supports these for more styling
              // headerClassName="bg-gray-100 text-gray-700 font-semibold" 
              // rowClassName="hover:bg-gray-50"
            />
          </div>
        )}
        {domains.length === 0 && !loading && (
           <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No domains</h3>
            <p className="mt-1 text-sm text-gray-500">No domains are currently available for transfer or deletion.</p>
            {/* Optional: Add a button to navigate to an "Add Domain" page */}
            {/* <div className="mt-6">
              <button
                type="button"
                onClick={() => navigate('/domains/add')} // Example route
                className={`${themeButtonBase} ${themeButtonPrimary} px-4 py-2`}
              >
                Add Domain
              </button>
            </div> */}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default TransferDeleteDomainsPage;
