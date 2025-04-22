// // src/pages/DrmProjectsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Table from "../components/Table";
// import { getThemeForDays } from "../utils/themes"; // Using a default theme (you can change as needed)
// import axios from "axios";
// import fetchUser from "../utils/fetchUser";
// import { API_BASE_URL } from "../config/env.config"
// import { isAuthenticatedState } from "../recoil/atoms/authState.js";

// function DrmProjectsPage() {

//      const isAuthenticated = useRecoilValue(isAuthenticatedState);
//     const user = fetchUser()
//   const navigate = useNavigate();
//   const [listProjects,setListProjects] = useState([])

//   // Define table columns. You may want to add more columns for additional project details.
//   const columns = [
//     { header: "Serial No.", accessor: "serialNo" },
//     { header: "Project Name", accessor: "projectName" },
//     { header: "Project Description", accessor: "projectDescription" },
//     { header: "Status", accessor: "status" },
//     { header: "Actions", accessor: "actions" },
//   ];

//   // Placeholder data. Replace this later with an API call that retrieves projects 
//   // in which the current DRM is involved.

//   useEffect(async () => {

//     try{
//         const response = await axios.get(`${API_BASE_URL}/api/users/list/projects/${empId}`,{
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':`Bearer ${isAuthenticated}`
//             }
//         })
//         console.log("LIST PROJECTS CONSOLE DATA",response.data);

//         setListProjects(response.data)

//     }catch(error){
//         console.log("ERROR WHILE FETCHING DRM PROJECTS")
//         throw error
//     }


//   },[])
//   const placeholderProjects = [
//     {
//       projectId: "201",
//       projectName: "Project Alpha",
//       projectDescription: "Website redesign and UI improvement",
//       status: "Active",
//     },
//     {
//       projectId: "202",
//       projectName: "Project Beta",
//       projectDescription: "CMS migration and content upgrade",
//       status: "In Progress",
//     },
//     {
//       projectId: "203",
//       projectName: "Project Gamma",
//       projectDescription: "SEO optimization and analytics",
//       status: "Closed",
//     },
//   ].map((item, index) => ({
//     ...item,
//     serialNo: index + 1, // Recalculate serial number
//   }));

//   // Function to handle the Apply for Domain Name button click.
//   const handleApplyForDomain = (projectId) => {
//     // Option 1: Pass projectId as a query parameter 
//     navigate(`/domains/add?projectId=${projectId}`);

//     // Option 2: Alternatively, use state to pass data:
//     // navigate("/domains/add", { state: { projectId } });
//   };

//   // Add an "Apply for Domain Name" button into the Actions column.
//   const dataWithActions = placeholderProjects.map((item) => ({
//     ...item,
//     actions: (
//       <button
//         onClick={() => handleApplyForDomain(item.projectId)}
//         className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
//       >
//         Apply for Domain Name
//       </button>
//     ),
//   }));

//   // Get a default theme for the Table component (can be customized)
//   const currentTheme = getThemeForDays("default");

//   return (
//     <MainLayout>
//       <div className="space-y-6 p-4">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           My Projects
//         </h2>

//         {/* Table for listing projects */}
//         <Table
//           columns={columns}
//           data={dataWithActions}
//           theme={currentTheme}
//           emptyMessage="No projects found."
//         />
//       </div>
//     </MainLayout>
//   );
// }

// export default DrmProjectsPage;
// src/pages/DrmProjectsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { authTokenState, isAuthenticatedState } from "../recoil/atoms/authState.js";

function DrmProjectsPage() {
  const isAuthenticated = useRecoilValue(authTokenState);
  const user = fetchUser();
  const navigate = useNavigate();

  const [listProjects, setListProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Assuming the user object has an 'id' property to be used as empId.
  const empId = user.id;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/users/list/projects/${empId}`,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${isAuthenticated}`,
            },
          }
        );
        console.log("LIST PROJECTS CONSOLE DATA", response.data);
        setListProjects(response.data);
      } catch (error) {
        console.error("ERROR WHILE FETCHING DRM PROJECTS", error);
        setError("Error fetching projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (empId) {
      fetchProjects();
    }
  }, [empId, isAuthenticated]);

  // Define table columns (Removed the Status column)
  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Project Name", accessor: "project_name" },
    { header: "Project Description", accessor: "project_remarks" },
    { header: "Actions", accessor: "actions" },
  ];

  // Function to handle the "Apply for Domain Name" button click.
  const handleApplyForDomain = (projectId) => {
    // Navigates to /domains/add with the projectId passed as a query parameter.
    navigate(`/domains/add?projectId=${projectId}`);
  };

  // Map over the fetched projects to add a serial number and an action button.
  const dataWithActions = listProjects.map((item, index) => ({
    ...item,
    serialNo: index + 1,
    actions: (
      <button
        onClick={() => handleApplyForDomain(item.project_id)}
        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
      >
        Apply for Domain Name
      </button>
    ),
  }));

  // Get a default theme for the Table component (you can customize this as needed)
  const currentTheme = getThemeForDays("default");

  return (
    <MainLayout>
      <div className="space-y-6 p-4">
        <h2 className="text-2xl font-semibold text-gray-800">My Projects</h2>
        {loading && <p className="text-gray-500">Loading projects...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && listProjects.length === 0 && (
          <p className="text-gray-500">No projects found.</p>
        )}
        {!loading && !error && listProjects.length > 0 && (
          <Table
            columns={columns}
            data={dataWithActions}
            theme={currentTheme}
            emptyMessage="No projects found."
          />
        )}
      </div>
    </MainLayout>
  );
}

export default DrmProjectsPage;

