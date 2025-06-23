// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import PaginationControls from "../components/PaginationControls";
// import { getThemeForDays } from "../utils/themes";
// import axios from "axios";
// import fetchUser from "../utils/fetchUser";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState.js";
// import { FaFileSignature } from "react-icons/fa";
// import { FiLoader } from "react-icons/fi";

// function DrmProjectsPage() {
//   const authToken = useRecoilValue(authTokenState);
//   const user = fetchUser();
//   const navigate = useNavigate();
//   const empId = user?.id;
//   const currentTheme = getThemeForDays("default");

//   // State for data, loading, and errors
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for pagination
//   const [page, setPage] = useState(1); // Stays 0-indexed for the request
//   const [pageSize, setPageSize] = useState(2);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);

//   // Define table columns
//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Project Name", accessor: "project_name" },
//     { header: "Project Description", accessor: "project_remarks" },
//     { header: "Actions", accessor: "actions" },
//   ];

//   // Function to handle the "Apply for Domain Name" button click.
//   const handleApplyForDomain = (projectId) => {
//     navigate(`/domains/add?projectId=${projectId}`);
//   };

//   // Data fetching logic updated to match the new API response structure
//   const fetchProjects = useCallback(async () => {
//     if (!empId || !authToken) {
//       setError("User information or authentication token is missing.");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/api/users/list/projects/${empId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//           params: {
//             page: page, // Sending 0-based page number to API
//             pageSize: pageSize,
//           },
//         }
//       );

//       // ==================================================================
//       // CORE FIX: Destructure the actual response from your API
//       // ==================================================================
//       const { data, pagination } = response.data;

//       setProjects(data); // The list of projects is in the 'data' array
//       setTotalPages(pagination.totalPages); // Total pages from the 'pagination' object
//       setTotalElements(pagination.totalItems); // Total items from the 'pagination' object
//       // ==================================================================

//     } catch (err) {
//       console.error("ERROR WHILE FETCHING DRM PROJECTS", err);
//       setError("Error fetching projects. Please try again later.");
//       setProjects([]); // Clear data on error
//     } finally {
//       setLoading(false);
//     }
//   }, [empId, authToken, page, pageSize]);

//   useEffect(() => {
//     fetchProjects();
//   }, [fetchProjects]);

//   // This part remains correct as your project objects have the right keys
//   const dataWithActions = projects.map((item, index) => ({
//     ...item,
//     serialNo: page * pageSize + index + 1,
//     project_name: <span className="font-medium text-gray-800">{item.project_name}</span>,
//     actions: (
//       <button
//         onClick={() => handleApplyForDomain(item.project_id)}
//         className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//       >
//         <FaFileSignature className="mr-2" />
//         Apply for Domain
//       </button>
//     ),
//   }));

//   return (
//     <MainLayout>
//       <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
//         <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
//           My Projects
//         </h1>

//         {loading && (
//           <div className="flex flex-col items-center justify-center h-64">
//             <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
//             <p className="text-lg text-gray-600">Loading your projects...</p>
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
//               data={dataWithActions}
//               theme={currentTheme}
//               emptyMessage="No projects have been assigned to you."
//             />
//             {totalElements > 0 && (
//               <PaginationControls
//                 currentPage={page}
//                 totalPages={totalPages}
//                 totalElements={totalElements}
//                 itemsPerPage={pageSize}
//                 itemsOnPage={projects.length}
//                 onPageChange={(newPage) => setPage(newPage)}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default DrmProjectsPage;

// // -------------------------------------------------------------------------

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import PaginationControls from "../components/PaginationControls";
import { getThemeForDays } from "../utils/themes";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState.js";
import { FaFileSignature } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

function DrmProjectsPage() {
  const authToken = useRecoilValue(authTokenState);
  const user = fetchUser();
  const navigate = useNavigate();
  const empId = user?.id;
  const currentTheme = getThemeForDays("default");

  // State for data, loading, and errors
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for pagination - Stays 1-indexed for both component state and API request
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Define table columns
  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Project Name", accessor: "project_name" },
    { header: "Project Description", accessor: "project_remarks" },
    { header: "Actions", accessor: "actions" },
  ];

  // Function to handle the "Apply for Domain Name" button click.
  const handleApplyForDomain = (projectId) => {
    navigate(`/domains/add?projectId=${projectId}`);
  };

  // Data fetching logic updated for a 1-based page index API
  const fetchProjects = useCallback(async () => {
    if (!empId || !authToken) {
      setError("User information or authentication token is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/list/projects/${empId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          params: {
            // MODIFICATION: Sending the 1-based page number directly to the API.
            page: page,
            pageSize: pageSize,
          },
        }
      );

      const { data, pagination } = response.data;

      setProjects(data);
      setTotalPages(pagination.totalPages);
      setTotalElements(pagination.totalItems);
    } catch (err) {
      console.error("ERROR WHILE FETCHING DRM PROJECTS", err);
      setError("Error fetching projects. Please try again later.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [empId, authToken, page, pageSize]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // MODIFICATION: Corrected serial number calculation for 1-based pagination.
  // Formula: (currentPage - 1) * itemsPerPage + itemIndex + 1
  const dataWithActions = projects.map((item, index) => ({
    ...item,
    serialNo: (page - 1) * pageSize + index + 1,
    project_name: (
      <span className="font-medium text-gray-800">{item.project_name}</span>
    ),
    actions: (
      <button
        onClick={() => handleApplyForDomain(item.project_id)}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        <FaFileSignature className="mr-2" />
        Apply for Domain
      </button>
    ),
  }));

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
          My Projects
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading your projects...</p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
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
              emptyMessage="No projects have been assigned to you."
            />
            {totalElements > 0 && (
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                totalElements={totalElements}
                itemsPerPage={pageSize}
                itemsOnPage={projects.length}
                onPageChange={(newPage) => setPage(newPage)}
                startIndex={1}
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default DrmProjectsPage;