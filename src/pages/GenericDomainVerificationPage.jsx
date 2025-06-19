

// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import axios from "axios";
// import fetchUser from "../utils/fetchUser";
// import { API_BASE_URL } from "../config/env.config";
// import { authTokenState } from "../recoil/atoms/authState";
// import { getThemeForDays } from "../utils/themes";
// import { Button } from "../components/common/Button";
// import { FiLoader } from "react-icons/fi";
// import { FaClipboardCheck } from "react-icons/fa";

// function GenericDomainVerificationPage({
//   apiPath,
//   verifyPathPrefix,
//   title = "Verify Domain Requests",
//   useFor,
// }) {
//   const isAuthenticated = useRecoilValue(authTokenState);
//   const user = fetchUser();
//   const navigate = useNavigate();

//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true); // Set initial loading to true
//   const [error, setError] = useState(null);

//   const empId = user?.id;
//   const currentTheme = getThemeForDays("default");

//   const fetchDomainRequests = useCallback(async () => {
//     if (!empId) {
//         setError("User information is missing.");
//         setLoading(false);
//         return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}${apiPath}/${empId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${isAuthenticated}`,
//           },
//         }
//       );
//       setRequests(response.data);
//     } catch (err) {
//       console.error("Failed to fetch domain requests", err);
//       setError("Error fetching requests. Please try again later.");
//       setRequests([]); // Clear data on error
//     } finally {
//       setLoading(false);
//     }
//   }, [empId, isAuthenticated, apiPath]);

//   useEffect(() => {
//     fetchDomainRequests();
//   }, [fetchDomainRequests]);

//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Domain Name", accessor: "domainName" },
//     { header: "DRM Name", accessor: "drmName" },
//     ...(user.role === "WEBMASTER"
//       ? [
//           { header: "DRM Group", accessor: "drmGroupName" },
//           { header: "DRM Centre", accessor: "drmCentreName" },
//           { header: "ARM Name", accessor: "armName" },
//           { header: "ARM Group", accessor: "armGroupName" },
//           { header: "ARM Centre", accessor: "armCentreName" },
//         ]
//       : [{ header: "ARM Name", accessor: "armName" }]),
//     { header: "Date of Application", accessor: "dateOfApplication" },
//     {
//       header: "Action",
//       accessor: "action",
//       render: (row) => {
//         const id = useFor === "transfer" ? row.transferId : row.domainId;
//         const label = useFor === "transfer" ? "Verify Transfer" : useFor !== "purchase"? "Verify Domain": "Enter Purchase Details";
//         return (
//           <Button
//             onClick={() => navigate(`${verifyPathPrefix}/${id}`)}
//             className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//           >
//             <FaClipboardCheck className="mr-2" />
//             {label}
//           </Button>
//         );
//       },
//     },
//   ];

//   const dataWithSerial = requests.map((item, index) => {
//     const base = {
//       serialNo: index + 1,
//       domainName: <span className="font-medium text-gray-800">{item.domainName}</span>,
//       drmName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.drmName || ""}</div>,
//       armName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.armName || ""}</div>,
//       dateOfApplication: new Date(item.dateOfApplication).toLocaleDateString(),
//       domainId: item.domainId,
//       transferId: item.transferId,
//     };

//     if (user.role === "WEBMASTER") {
//       return {
//         ...base,
//         drmGroupName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.drmGroupName || ""}</div>,
//         drmCentreName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.drmCentreName || ""}</div>,
//         armGroupName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.armGroupName || ""}</div>,
//         armCentreName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.armCentreName || ""}</div>,
//       };
//     }
//     return base;
//   });

//   return (
//     <MainLayout>
//       <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
//         <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
//           {title}
//         </h1>

//         {loading && (
//           <div className="flex flex-col items-center justify-center h-64">
//             <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
//             <p className="text-lg text-gray-600">Loading requests...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
//             <strong className="font-bold">Error: </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//             <Table
//               columns={columns}
//               data={dataWithSerial}
//               theme={currentTheme}
//               emptyMessage={`No ${useFor} requests to verify.`}
//             />
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default GenericDomainVerificationPage;


import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { authTokenState } from "../recoil/atoms/authState";
import { getThemeForDays } from "../utils/themes";
import { Button } from "../components/common/Button";
import { FiLoader } from "react-icons/fi";
import { FaClipboardCheck } from "react-icons/fa";
// Import the pagination controls
import PaginationControls from "../components/PaginationControls";

function GenericDomainVerificationPage({
  apiPath,
  verifyPathPrefix,
  title = "Verify Domain Requests",
  useFor,
}) {
  const isAuthenticated = useRecoilValue(authTokenState);
  const user = fetchUser();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    size: 5, // Default page size
    numberOfElements: 0,
  });

  const empId = user?.id;
  const currentTheme = getThemeForDays("default");

  const fetchDomainRequests = useCallback(async () => {
    if (!empId) {
      setError("User information is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}${apiPath}/${empId}?page=${currentPage}&size=${pageInfo.size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuthenticated}`,
          },
        }
      );
      // Set requests from the 'content' array of the paginated response
      setRequests(response.data.content);
      // Set pagination information
      setPageInfo({
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        size: response.data.size,
        numberOfElements: response.data.numberOfElements,
      });
    } catch (err) {
      console.error("Failed to fetch domain requests", err);
      setError("Error fetching requests. Please try again later.");
      setRequests([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [empId, isAuthenticated, apiPath, currentPage, pageInfo.size]);

  useEffect(() => {
    fetchDomainRequests();
  }, [fetchDomainRequests]);

  // Handler for changing pages
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pageInfo.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "DRM Name", accessor: "drmName" },
    ...(user.role === "WEBMASTER"
      ? [
          { header: "DRM Group", accessor: "drmGroupName" },
          { header: "DRM Centre", accessor: "drmCentreName" },
          { header: "ARM Name", accessor: "armName" },
          { header: "ARM Group", accessor: "armGroupName" },
          { header: "ARM Centre", accessor: "armCentreName" },
        ]
      : [{ header: "ARM Name", accessor: "armName" }]),
    { header: "Date of Application", accessor: "dateOfApplication" },
    {
      header: "Action",
      accessor: "action",
      render: (row) => {
        const id = useFor === "transfer" ? row.transferId : row.domainId;
        const label = useFor === "transfer" ? "Verify Transfer" : useFor !== "purchase"? "Verify Domain": "Enter Purchase Details";
        return (
          <Button
            onClick={() => navigate(`${verifyPathPrefix}/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <FaClipboardCheck className="mr-2" />
            {label}
          </Button>
        );
      },
    },
  ];

  const dataWithSerial = requests.map((item, index) => {
    const base = {
      // Correct serial number calculation for pagination
      serialNo: currentPage * pageInfo.size + index + 1,
      domainName: <span className="font-medium text-gray-800">{item.domainName}</span>,
      drmName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.drmName || ""}</div>,
      armName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.armName || ""}</div>,
      dateOfApplication: new Date(item.dateOfApplication).toLocaleDateString(),
      domainId: item.domainId,
      transferId: item.transferId,
    };

    if (user.role === "WEBMASTER") {
      return {
        ...base,
        drmGroupName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.drmGroupName || ""}</div>,
        drmCentreName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.drmCentreName || ""}</div>,
        armGroupName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.armGroupName || ""}</div>,
        armCentreName: <div className="text-sm text-gray-600 whitespace-normal break-words">{item.armCentreName || ""}</div>,
      };
    }
    return base;
  });

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
          {title}
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading requests...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Table
              columns={columns}
              data={dataWithSerial}
              theme={currentTheme}
              emptyMessage={pageInfo.totalElements === 0 ? `No ${useFor} requests to verify.` : "No results on this page."}
            />
            {/* Render Pagination Controls */}
            {pageInfo.totalElements > 0 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={pageInfo.totalPages}
                onPageChange={handlePageChange}
                totalElements={pageInfo.totalElements}
                itemsPerPage={pageInfo.size}
                itemsOnPage={pageInfo.numberOfElements}
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default GenericDomainVerificationPage;