

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import PaginationControls from "../components/PaginationControls";
import fetchUser from "../utils/fetchUser";
import axios from "axios";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { FaEye } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

function ViewDomainsPage() {
  const authToken = useRecoilValue(authTokenState);
  const user = fetchUser();
  const navigate = useNavigate();

  // A bright, custom theme for this page's table
  const customTheme = {
    headerBg: "bg-indigo-50",
    headerText: "text-indigo-700 font-bold",
  };

  // State for domains, loading, and error
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(2);

  // Helper function with brighter, more distinct status colors
  const getStatusInfo = (status) => {
    if (!status) return { text: "Unknown", className: "bg-gray-200 text-gray-800" };
    
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return { text: "Active", className: "bg-emerald-100 text-emerald-800" };
      case "EXPIRED":
        return { text: "Expired", className: "bg-rose-100 text-rose-800" };
      case "PENDING_RENEWAL":
        return { text: "Pending Renewal", className: "bg-amber-100 text-amber-800" };
      case "PENDING_APPROVAL":
        return { text: "Pending Approval", className: "bg-sky-100 text-sky-800" };
      default:
        return { text: status, className: "bg-gray-200 text-gray-800" };
    }
  };

  const fetchDomains = useCallback(async () => {
    if (!user?.role || !user?.id || !authToken) {
      setError("User information is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/domain/view-domains/${user.role}/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        params: { page, size: pageSize }
      });

      const { content, totalPages, totalElements } = res.data;
      setDomains(content);
      setTotalPages(totalPages);
      setTotalElements(totalElements);

    } catch (err) {
      console.error("Error loading domains:", err);
      setError(err.response?.data?.message || "An error occurred while fetching domains.");
      setDomains([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.role, authToken, page, pageSize]);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const handleViewDetails = (domainId) => {
    navigate(`/domains/details/${domainId}`);
  };

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "DRM Name", accessor: "drmName" },
    { header: "Expiry Date", accessor: "domainExpiryDate" },
    { header: "Status", accessor: "statusPill" },
    { header: "Actions", accessor: "actions" },
  ];

  const dataWithActions = domains.map((item, index) => {
    const statusInfo = getStatusInfo(item.status);
    return {
      ...item,
      serialNo: page * pageSize + index + 1,
      domainName: <span className="font-semibold text-gray-800">{item.domainName}</span>,
      domainExpiryDate: item.domainExpiryDate ? new Date(item.domainExpiryDate).toLocaleDateString("en-GB") : "N/A",
      statusPill: (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.className}`}>
          {statusInfo.text}
        </span>
      ),
      actions: (
        <button
          onClick={() => handleViewDetails(item.domainId)}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition flex items-center shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          <FaEye className="mr-2" />
          View
        </button>
      ),
    };
  });

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
          My Domains
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-4xl text-indigo-600 mb-4" />
            <p className="text-lg text-gray-600">Loading your domains...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-100 border-l-4 border-rose-500 text-rose-800 p-4 rounded-lg" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Table
              columns={columns}
              data={dataWithActions}
              theme={customTheme}
              emptyMessage="No domains found."
            />
            {totalElements > 0 && (
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                totalElements={totalElements}
                itemsPerPage={pageSize}
                itemsOnPage={domains.length}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ViewDomainsPage;