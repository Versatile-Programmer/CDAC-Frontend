// src/pages/ViewVaptRenewalsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import { getThemeForDays } from "../utils/themes";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { API_BASE_URL } from "../config/env.config";
import fetchUser from "../utils/fetchUser";

function ViewVaptRenewalsPage() {
  const authToken = useRecoilValue(authTokenState);
  const navigate = useNavigate();
  const [renewals, setRenewals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const empNo = fetchUser().id

  useEffect(() => {
    const fetchRenewals = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("EMP-NO",empNo)
        // Update the endpoint as needed based on your backend API.
        const response = await axios.get(`${API_BASE_URL}/vapt/get-vapt/${empNo}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });
        console.log("VAPT Renewals:", response.data);
        setRenewals(response.data);
      } catch (err) {
        console.error("Error fetching VAPT renewals", err);
        setError("Error fetching VAPT renewals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchRenewals();
    }
  }, [authToken]);

  // Define table columns including the new "Actions" column.
  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "DRM Name", accessor: "drmName" },
    { header: "ARM Name", accessor: "armName" },
    { header: "VAPT Expiry Date", accessor: "vaptExpiryDate" },
    { header: "Actions", accessor: "actions" },
  ];

  // Map the fetched renewals to add a serial number, format the expiry date,
  // and include a "Verify VAPT Renewal" button.
  const dataWithSerial = renewals.map((item, index) => ({
    ...item,
    serialNo: index + 1,
    // Assuming your API returns properties "drmName", "armName", and "vaptExpiryDate".
    drmName: item.drmName,
    armName: item.armName,
    vaptExpiryDate: new Date(item.vaptExpiryDate).toLocaleDateString(),
    // Assuming each renewal has a unique ID (e.g., item.id).
    actions: (
      <button
        onClick={() => navigate(`/view/detail/vapt-renewal/${item.vaptRenewalId}?domainId=${item.domainId}`)}
        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
      >
        Verify VAPT Renewal
      </button>
    ),
  }));

  const currentTheme = getThemeForDays("default");

  return (
    <MainLayout>
      <div className="space-y-6 p-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          View VAPT Renewals
        </h2>
        {loading && <p className="text-gray-500">Loading renewals...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && renewals.length === 0 && (
          <p className="text-gray-500">No renewals found.</p>
        )}
        {!loading && !error && renewals.length > 0 && (
          <Table
            columns={columns}
            data={dataWithSerial}
            theme={currentTheme}
            emptyMessage="No renewals found."
          />
        )}
      </div>
    </MainLayout>
  );
}

export default ViewVaptRenewalsPage;
