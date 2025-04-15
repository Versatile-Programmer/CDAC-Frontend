// src/pages/RenewDomainsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes";
import axios from "axios"; // Assuming axios is used for API calls
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../recoil/atoms/authState";

function RenewDomainsPage() {
  const navigate = useNavigate();
  const user = fetchUser()
  const drmId = user.id
  const authenticated = useRecoilValue(isAuthenticatedState)
  const currentTheme = getThemeForDays("default");

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
        const response = await axios.get(`${API_BASE_URL}/domain/list/renew/${drmId}`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':''
            }
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
    return "Pending Renewal";
  };

  const handleRenewDomain = (domainId) => {
    navigate(`/domains/renew/${domainId}`);
  };

  const dataWithActions = domains.map((item) => ({
    ...item,
    actions: (
      <button
        onClick={() => handleRenewDomain(item.domainId)}
        className={`px-3 py-1 text-sm rounded ${currentTheme.link} underline`}
      >
        Renew
      </button>
    ),
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Renew Domains</h2>
        {loading ? (
          <p>Loading domains...</p>
        ) : (
          <Table
            columns={columns}
            data={dataWithActions}
            theme={currentTheme}
            emptyMessage="No domains pending renewal."
          />
        )}
      </div>
    </MainLayout>
  );
}

export default RenewDomainsPage;
