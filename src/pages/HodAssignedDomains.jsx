import React, { useEffect, useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { authTokenState } from "../recoil/atoms/authState";
import { getThemeForDays } from "../utils/themes";
import { FiLoader } from "react-icons/fi";
// 1. Import PaginationControls
import PaginationControls from "../components/PaginationControls";

function HodAssignedProjectsPage() {
  const isAuthenticated = useRecoilValue(authTokenState);
  const user = fetchUser();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Add state for pagination, using a single state object for clarity
  const [pagination, setPagination] = useState({
    currentPage: 0, // Start at page 0 (for 0-indexed component logic)
    pageSize: 2,    // A default page size
    totalPages: 0,
    totalItems: 0,
  });

  const empId = user?.id;
  const currentTheme = getThemeForDays("default");

  // 3. Modify the fetch function to handle pagination
  const fetchAssignedProjects = useCallback(async (page, size) => {
    if (!empId) {
        setError("User information is missing.");
        setLoading(false);
        return;
    }
    setLoading(true);
    setError(null);
    try {
      // The API likely expects a 1-based page number, so we send `page + 1`
      const response = await axios.get(
        `${API_BASE_URL}/api/users/list/projects/${empId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuthenticated}`,
          },
          // Send page and pageSize as query parameters
          params: {
            page: page + 1, // API expects 1-based, our state is 0-based
            pageSize: size,
          },
        }
      );
      
      // 4. Correctly parse the paginated response
      const { data, pagination: paginationData } = response.data;

      setProjects(data); // The list of projects is in the 'data' array
      
      // Update our pagination state from the API response
      setPagination({
        currentPage: paginationData.currentPage - 1, // Convert 1-based API response to 0-based for state
        pageSize: paginationData.pageSize,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems,
      });

    } catch (err) {
      console.error("Failed to fetch HOD assigned projects", err);
      setError("Error fetching assigned projects. Please try again later.");
      setProjects([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [empId, isAuthenticated]);

  // Initial fetch on component mount
  useEffect(() => {
    if(empId) {
        // Fetch the first page (page 0) with the default page size
        fetchAssignedProjects(pagination.currentPage, pagination.pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId]); // We only want this to run once when empId is available

  // 5. Create a handler for page changes from PaginationControls
  const handlePageChange = (newPage) => {
    fetchAssignedProjects(newPage, pagination.pageSize);
  };

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Project Name", accessor: "project_name" },
    { header: "DRM Name", accessor: "drm_name" },
    { header: "DRM Email", accessor: "drm_email" },
    { header: "ARM Name", accessor: "arm_name" },
    { header: "ARM Email", accessor: "arm_email" },
  ];

  // 7. Fix Serial No. calculation to be aware of the current page
  const dataWithSerial = projects.map((item, index) => ({
    serialNo: pagination.currentPage * pagination.pageSize + index + 1,
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
            {/* 6. Render the PaginationControls component */}
            {pagination.totalItems > 0 && (
                <PaginationControls
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    totalElements={pagination.totalItems}
                    itemsPerPage={pagination.pageSize}
                    itemsOnPage={projects.length}
                />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default HodAssignedProjectsPage;