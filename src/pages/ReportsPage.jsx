// src/pages/ReportsPage.jsx
import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import MainLayout from "../layouts/MainLayout";
import RefineResultsSidebar from "../components/reports/RefineResultsSidebar";
import Table from "../components/Table";
import Button from "../components/Button";
import TextInput from "../components/forms/TextInput";
import {
  MdSearch,
  MdOutlineEmail,
  MdOutlineFileDownload,
} from "react-icons/md";
// --- Import the dummy API service ---
// import { fetchReportData } from "../services/reportService"; // Adjust path if needed
import { notifyError } from "../utils/toastUtils"; // For error notifications

// --- Debounce ( for search) ---
// You can place this in a utils file or keep it here for simplicity
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function ReportsPage() {
  // --- State Management ---
  const [searchTerm, setSearchTerm] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("all"); // Default expiry filter
  const [sortOption, setSortOption] = useState("expiryDateAsc"); // Default sort
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- API Call Logic ---
  // Use useCallback to memoize the fetch function
  const loadReportData = useCallback(async (currentFilters) => {
    setIsLoading(true);
    setError(null);
    console.log("Fetching report data with:", currentFilters);
    try {
      // Call the (dummy) service function
      const data = await fetchReportData(currentFilters);
      setReportData(data); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching report data:", err);
      const errorMsg =
        err instanceof Error ? err.message : "Failed to load report data.";
      setError(errorMsg);
      setReportData([]); // Clear data on error
      notifyError(errorMsg); // Show toast notification
    } finally {
      setIsLoading(false);
    }
    // No dependencies here, it's called manually or by debounced function
  }, []); // Removed dependencies as it's manually triggered by useEffect or debounce

  // --- Debounced Search Handler ---
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLoadData = useCallback(
    debounce((filters) => loadReportData(filters), 500), // Wait 500ms after typing stops
    [loadReportData] // Dependency is the memoized loadReportData
  );

  // --- Effect to Fetch Data ---
  useEffect(() => {
    // Prepare filters for the API call
    const currentFilters = {
      expiry: expiryFilter,
      sort: sortOption,
      search: searchTerm.trim(), // Trim search term
    };

    // If search term exists, use debounced fetch, otherwise fetch immediately on filter/sort change
    if (searchTerm.trim()) {
      debouncedLoadData(currentFilters);
    } else {
      loadReportData(currentFilters);
    }
  }, [expiryFilter, sortOption, searchTerm, loadReportData, debouncedLoadData]); // Add dependencies
  
  // --- Event Handlers ---
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Fetching is handled by useEffect via debouncing
  };

  // The "Search" button can be removed if search triggers automatically via useEffect/debounce
  // Or keep it to allow explicit re-triggering of the current search/filters
  const handleModifySearchClick = () => {
    loadReportData({
      expiry: expiryFilter,
      sort: sortOption,
      search: searchTerm.trim(),
    });
  };

  const handleSendEmail = () => alert("Send Email(s) Clicked! (Logic needed)");
  const handleDownload = () => alert("Download Clicked! (Logic needed)");

  // --- Define Table Columns ---
  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "DRM Name", accessor: "drmName" },
    { header: "Group", accessor: "group" },
    { header: "Centre", accessor: "centre" },
    { header: "Expiry Date", accessor: "expiryDate" },
    { header: "Expiring in (days)", accessor: "expiringIn" },
    { header: "Status", accessor: "status" }, // Added Status column
  ];

  // Table theme
  const tableTheme = {
    headerBg: "bg-sky-200",
    headerText: "text-sky-900",
    rowBg: "bg-sky-50",
    border: "border-sky-300",
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <RefineResultsSidebar
            currentExpiryFilter={expiryFilter}
            onExpiryChange={setExpiryFilter} // Pass state setter
            currentSortOption={sortOption}
            onSortChange={setSortOption} // Pass state setter
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search/Actions Bar */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-yellow-100 border border-yellow-200 rounded-lg shadow-sm">
            <label
              htmlFor="reportSearch"
              className="text-sm font-medium text-gray-700 shrink-0"
            >
              Search:
            </label>
            <div className="flex-grow min-w-[200px]">
              <TextInput
                id="reportSearch"
                name="reportSearch"
                placeholder="Domain, DRM, Group, Centre, Status..."
                value={searchTerm} // Controlled input
                onChange={handleSearchChange} // Update search state
              />
            </div>
            {/* Optional explicit search button */}
            <Button
              variant="warning"
              IconComponent={MdSearch}
              onClick={handleModifySearchClick}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
            <Button
              variant="secondary"
              IconComponent={MdOutlineEmail}
              onClick={handleSendEmail}
              disabled={isLoading}
            >
              Send Email(s)
            </Button>
          </div>

          {/* Loading / Error / Table Display */}
          <div className="min-h-[300px]">
            {" "}
            {/* Give table area min height */}
            {isLoading && (
              <div className="text-center py-10 text-gray-500">
                Loading data...
              </div>
            )}
            {error && (
              <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded border border-red-200">
                Error: {error}
              </div>
            )}
            {!isLoading && !error && (
              <Table
                columns={columns}
                data={reportData} // Display data from state
                theme={tableTheme}
                emptyMessage="No domains match the current criteria."
                maxHeight="max-h-[65vh]"
              />
            )}
          </div>

          {/* Download Button */}
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              IconComponent={MdOutlineFileDownload}
              onClick={handleDownload}
              disabled={isLoading}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ReportsPage;
