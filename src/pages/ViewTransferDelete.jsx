
// src/pages/TransferDeleteDomainsPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { FaTrashAlt, FaExchangeAlt } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
// Import your PaginationControls component
import PaginationControls from "../components/PaginationControls";

function TransferDeleteDomainsPage() {
  const navigate = useNavigate();
  const user = fetchUser();
  const drmId = user.id;
  const currentTheme = getThemeForDays("default");
  const authToken = useRecoilValue(authTokenState);

  // Component State
  const [domains, setDomains] = useState([]); // Stores the raw data from the API's 'content'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    size: 10, // You can adjust the default page size
    numberOfElements: 0,
  });

  const themeButtonBase = currentTheme.button || "font-medium rounded-lg text-sm focus:outline-none focus:ring-4";
  const themeButtonDanger = currentTheme.buttonDanger || "bg-red-600 hover:bg-red-700 focus:ring-red-300 text-white";
  const themeLink = currentTheme.link || "text-blue-600 hover:text-blue-800 underline";

  // Data Fetching with Pagination
  const fetchDomains = useCallback(async () => {
    if (!authToken || !user.id) {
      setLoading(false);
      setError("Authentication details are missing.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/domain/get-domains/${user.role}/${drmId}?page=${currentPage}&size=${pageInfo.size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const paginatedData = response.data;
      setDomains(paginatedData.content);
      setPageInfo({
        totalPages: paginatedData.totalPages,
        totalElements: paginatedData.totalElements,
        size: paginatedData.size,
        numberOfElements: paginatedData.numberOfElements,
      });
    } catch (err) {
      console.error("Error fetching domains:", err);
      setError("Failed to fetch domains. Please try again later.");
      setDomains([]);
    } finally {
      setLoading(false);
    }
  }, [authToken, user.id, user.role, drmId, currentPage, pageInfo.size]);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pageInfo.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTransfer = (domainId) => {
    navigate(`/domains/transfer/${domainId}`);
  };

  const handleDelete = (domainId) => {
    if (window.confirm("Are you sure you want to delete this domain? This action cannot be undone.")) {
      axios
        .delete(`${API_BASE_URL}/domain/delete/${domainId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
          // If the deleted item was the last one on the current page (and not the first page),
          // go to the previous page. Otherwise, just refetch the current page.
          if (domains.length === 1 && currentPage > 0) {
            setCurrentPage(currentPage - 1);
          } else {
            fetchDomains();
          }
        })
        .catch((err) => {
          console.error("Error deleting domain:", err);
          alert("Failed to delete domain. Please try again.");
        });
    }
  };

  const getStatusInfo = (expiringDate) => {
    const today = new Date();
    const expiry = new Date(expiringDate);
    expiry.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

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

  const dataWithActions = domains.map((item, index) => {
    const statusInfo = getStatusInfo(item.expiringDate);
    return {
      ...item,
      // Correct serial number calculation for pagination
      serialNo: currentPage * pageInfo.size + index + 1,
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
    };
  });

  return (
    <MainLayout>
      <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
          Manage Domains: Transfer or Delete
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading domains, please wait...</p>
          </div>
        )}

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {!loading && !error && pageInfo.totalElements > 0 && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <Table
              columns={columns}
              data={dataWithActions}
              theme={currentTheme}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={pageInfo.totalPages}
              onPageChange={handlePageChange}
              totalElements={pageInfo.totalElements}
              itemsPerPage={pageInfo.size}
              itemsOnPage={pageInfo.numberOfElements}
            />
          </div>
        )}

        {!loading && !error && pageInfo.totalElements === 0 && (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No domains</h3>
            <p className="mt-1 text-sm text-gray-500">No domains are currently available for transfer or deletion.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default TransferDeleteDomainsPage;




