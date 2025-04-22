// GenericDomainVerificationPage.jsx

import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MainLayout from "../layouts/MainLayout";
import Table from "../components/Table";
import axios from "axios";
import fetchUser from "../utils/fetchUser";
import { API_BASE_URL } from "../config/env.config";
import { authTokenState } from "../recoil/atoms/authState";
import { getThemeForDays } from "../utils/themes";
import { Button } from "../components/common/Button";

function GenericDomainVerificationPage({
  apiPath,
  verifyPathPrefix,
  title = "Verify Domain Requests",
  useFor
}) {
  const isAuthenticated = useRecoilValue(authTokenState);
  const user = fetchUser();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const empId = user?.id;


  useEffect(() => {
    const fetchDomainRequests = async () => {
      setLoading(true);
      setError(null);
      try {

        // domainId;
        // domainName;
        // drmName;
        // armName;
        // dateOfApplication;

        const response = await axios.get(
          `${API_BASE_URL}${apiPath}/${empId}`,
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${isAuthenticated}`,
            },
          }
        );
        console.log("DOMAIN REQUESTS:", response.data);
        setRequests(response.data);
      } catch (err) {
        console.error("Failed to fetch domain requests", err);
        setError("Error fetching domain requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (empId) {
      fetchDomainRequests();
    }
  }, [empId, isAuthenticated, apiPath]);

  const columns = [
    { header: "Serial No.", accessor: "serialNo" },
    { header: "Domain Name", accessor: "domainName" },
    { header: "DRM Name", accessor: "drmName" },
    ...(
      user.role === "WEBMASTER" ? [
        { header: "DRM Group", accessor: "drmGroupName" },
        { header: "DRM Centre", accessor: "drmCentreName" },
        { header: "ARM Name", accessor: "armName" },
        { header: "ARM Group", accessor: "armGroupName" },
        { header: "ARM Centre", accessor: "armCentreName" },
      ] :
        [
          { header: "ARM Name", accessor: "armName" },
        ]
    ),

    { header: "Date of Application", accessor: "dateOfApplication" },
    {
      header: "Action",
      accessor: "action",
      render: row => {
        // pick the right ID field
        console.log("USER FOR ",useFor)
        const id = useFor === "transfer" ? row.transferId : row.domainId;
        const label = useFor === "transfer" ? "Verify Transfer" : "Verify Domain";
        return (
          <Button
            variant="outline"
            onClick={() => navigate(`${verifyPathPrefix}/${id}`)}
          >
            {label}
          </Button>
        );
      }
    }
  ];

  const dataWithSerial = requests.map((item, index) => {
    const base = {
      serialNo: index + 1,
      drmName: `${item.drmName || ""}`,
      armName: `${item.armName || ""}`,
      dateOfApplication: new Date(item.dateOfApplication).toLocaleDateString(),
      domainId: item.domainId,
      transferId: item.transferId,
      domainName: item.domainName, 
      }

    if (user.role === "WEBMASTER") {
      return {
      ...base,
      drmGroupName: item.drmGroupName || "",
      drmCentreName: item.drmCentreName || "",
      armGroupName: item.armGroupName || "",
      armCentreName: item.armCentreName || "",
    }
  }
  return base
  });

const theme = getThemeForDays("default");

return (
  <MainLayout>
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      {loading && <p className="text-gray-500">Loading requests...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && requests.length === 0 && (
        <p className="text-gray-500">No {useFor} to verify.</p>
      )}
      {!loading && !error && requests.length > 0 && (
        <Table
          columns={columns}
          data={dataWithSerial}
          theme={theme}
          emptyMessage={"No " + useFor + "to verify."}
        />
      )}
    </div>
  </MainLayout>
);
}

export default GenericDomainVerificationPage;
