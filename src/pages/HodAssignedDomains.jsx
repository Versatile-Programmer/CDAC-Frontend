// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import axios from "axios";
// import fetchUser from "../utils/fetchUser";
// import { API_BASE_URL } from "../config/env.config";
// import { authTokenState } from "../recoil/atoms/authState";
// import { getThemeForDays } from "../utils/themes";

// function HodAssignedProjectsPage() {
//   const isAuthenticated = useRecoilValue(authTokenState);
//   const user = fetchUser();
//   const navigate = useNavigate();

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const empId = user?.id;

//   useEffect(() => {
//     const fetchAssignedProjects = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/users/list/projects/${empId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${isAuthenticated}`,
//             },
//           }
//         );
//         console.log("HOD PROJECTS DATA:", response.data);
//         setProjects(response.data);
//       } catch (err) {
//         console.error("Failed to fetch HOD assigned projects", err);
//         setError("Error fetching assigned projects. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (empId) {
//       fetchAssignedProjects();
//     }
//   }, [empId, isAuthenticated]);

//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Project Name", accessor: "project_name" },
//     // { header: "Domain Name", accessor: "domain_name" },
//     { header: "DRM Name", accessor: "drm_name" },
//     { header: "DRM Email", accessor: "drm_email" },
//     { header: "ARM Name", accessor: "arm_name" },
//     { header: "ARM Email", accessor: "arm_email" },
//   ];

//   const dataWithSerial = projects.map((item, index) => ({
//     serialNo: index + 1,
//     project_name: item.project_name,
//     drm_name: `${item.drm?.drm_fname || ""} ${item.drm?.drm_lname || ""}`,
//     drm_email: item.drm?.email_id || "N/A",
//     arm_name: `${item.arm?.arm_fname || ""} ${item.arm?.arm_lname || ""}`,
//     arm_email: item.arm?.email_id || "N/A",
//   }));

//   const theme = getThemeForDays("default");

//   return (
//     <MainLayout>
//       <div className="space-y-6 p-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Assigned Projects</h2>
//         {loading && <p className="text-gray-500">Loading assigned projects...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && projects.length === 0 && (
//           <p className="text-gray-500">No assigned projects found.</p>
//         )}
//         {!loading && !error && projects.length > 0 && (
//           <Table
//             columns={columns}
//             data={dataWithSerial}
//             theme={theme}
//             emptyMessage="No assigned projects found."
//           />
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default HodAssignedProjectsPage;



// HodAssignedProjectsPage.jsx

import React, { useEffect, useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { authTokenState } from "../recoil/atoms/authState";
import { getThemeForDays } from "../utils/themes";
import { FiLoader } from "react-icons/fi"; // Import loader icon

function HodAssignedProjectsPage() {
  const isAuthenticated = useRecoilValue(authTokenState);
  const user = fetchUser();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState(null);

  const empId = user?.id;
  const currentTheme = getThemeForDays("default");

  const fetchAssignedProjects = useCallback(async () => {
    if (!empId) {
        setError("User information is missing.");
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
            Authorization: `Bearer ${isAuthenticated}`,
          },
        }
      );
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to fetch HOD assigned projects", err);
      setError("Error fetching assigned projects. Please try again later.");
      setProjects([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [empId, isAuthenticated]);

  useEffect(() => {
    fetchAssignedProjects();
  }, [fetchAssignedProjects]);

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Project Name", accessor: "project_name" },
    { header: "DRM Name", accessor: "drm_name" },
    { header: "DRM Email", accessor: "drm_email" },
    { header: "ARM Name", accessor: "arm_name" },
    { header: "ARM Email", accessor: "arm_email" },
  ];

  const dataWithSerial = projects.map((item, index) => ({
    serialNo: index + 1,
    project_name: <span className="font-medium text-gray-800">{item.project_name}</span>,
    drm_name: (
      <div className="text-sm text-gray-600 whitespace-normal break-words">
        {`${item.drm?.drm_fname || ""} ${item.drm?.drm_lname || ""}`.trim() || "N/A"}
      </div>
    ),
    drm_email: (
      <div className="text-sm text-gray-600 whitespace-normal break-words">
        {item.drm?.email_id || "N/A"}
      </div>
    ),
    arm_name: (
      <div className="text-sm text-gray-600 whitespace-normal break-words">
        {`${item.arm?.arm_fname || ""} ${item.arm?.arm_lname || ""}`.trim() || "N/A"}
      </div>
    ),
    arm_email: (
      <div className="text-sm text-gray-600 whitespace-normal break-words">
        {item.arm?.email_id || "N/A"}
      </div>
    ),
  }));

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
          Assigned Projects
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading assigned projects...</p>
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
              emptyMessage="No assigned projects found."
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default HodAssignedProjectsPage;
