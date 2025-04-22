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

function TransferDeleteDomainsPage() {
  const navigate = useNavigate();
  const user = fetchUser();
  const drmId = user.id;
  const authenticated = useRecoilValue(isAuthenticatedState);
  const currentTheme = getThemeForDays("default");
  const authToken = useRecoilValue(authTokenState)

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "ARM Name", accessor: "armName" },
    { header: "ARM Mobile", accessor: "armMobile" },
    { header: "ARM Email", accessor: "armEmail" },
    { header: "Expiry Date", accessor: "expiringDate" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
  ];

  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDomains() {
      try {
        const response = await axios.get(`${API_BASE_URL}/domain/get-domains/${user.role}/${drmId}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
        });
        const data = response.data;

        const updatedData = data.map((item, index) => ({
          serialNo: index + 1,
          domainId: item.domainId,
          domainName: item.domainName,
          armName: item.armName || "N/A",
          armMobile: item.armMobile || "N/A",
          armEmail: item.armEmail || "N/A",
          expiringDate: item.expiringDate,
          status: getStatus(item.expiringDate),
        }));

        setDomains(updatedData);
      } catch (err) {
        console.error("Error fetching domains:", err);
        setDomains([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDomains();
  }, [drmId]);

  const getStatus = (expiringDate) => {
    const today = new Date();
    const expiry = new Date(expiringDate);
    if (expiry < today) return "Expired";
    if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) return "Expiring Soon";
    return "Active";
  };

  const handleTransfer = (domainId) => {
    navigate(`/domains/transfer/${domainId}`);
  };

  const handleDelete = (domainId) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      axios
        .delete(`${API_BASE_URL}/domain/delete/${domainId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "",
          },
        })
        .then(() => {
          setDomains(domains.filter((d) => d.domainId !== domainId));
        })
        .catch((err) => {
          console.error("Error deleting domain:", err);
        });
    }
  };

  const dataWithActions = domains.map((item) => ({
    ...item,
    actions: (
      <div className="space-x-2">
        <button
          onClick={() => handleTransfer(item.domainId)}
          className={`px-3 py-1 text-sm rounded ${currentTheme.link} underline`}
        >
          Transfer
        </button>
        <button
          onClick={() => handleDelete(item.domainId)}
          className="px-3 py-1 text-sm rounded text-red-600 underline hover:text-red-800"
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Transfer / Delete Domains</h2>
        {loading ? (
          <p>Loading domains...</p>
        ) : (
          <Table
            columns={columns}
            data={dataWithActions}
            theme={currentTheme}
            emptyMessage="No domains available for transfer or deletion."
          />
        )}
      </div>
    </MainLayout>
  );
}

export default TransferDeleteDomainsPage;
