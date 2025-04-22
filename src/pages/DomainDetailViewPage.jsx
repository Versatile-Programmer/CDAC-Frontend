import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { API_BASE_URL } from "../config/env.config";
import {
  MdOutlineInfo,
  MdTimeline,
  MdVerified,
  MdFileDownload,
} from "react-icons/md";
import fetchUser from "../utils/fetchUser";
import DomainStatusMap from "../components/domain-detail/DomainStatusMap";

/**
 * A read-only page for stakeholders to view complete domain details.
 */
export default function DomainDetailViewPage() {
  const { domainId } = useParams();
  const authToken = useRecoilValue(authTokenState);
  const [domainData, setDomainData] = useState(null);

  const user = fetchUser();

  const canRenew =
    domainData?.status === "Active" || domainData?.status === "Renewal Requested";
  const canTransfer = domainData?.status === "Active";
  const canDelete =
    domainData?.status === "Active" ||
    domainData?.status === "Pending Verification";

    const actions = [];
    if (user?.role === "drm" || user?.role === "arm") {
        if (canRenew) {
          actions.push({
            title: "Renew Domain",
            IconComponent: MdAutorenew,
            linkTo: `/domains/renew?domainId=${domainId}`,
          });
        }
        if (canTransfer) {
          actions.push({
            title: "Transfer Domain",
            IconComponent: MdSwapHoriz,
            linkTo: `/domains/transfer?domainId=${domainId}`,
          });
        }
        if (canDelete) {
          actions.push({
            title: "Delete Domain",
            IconComponent: MdDeleteOutline,
            linkTo: `/domains/delete?domainId=${domainId}`,
          });
        }
      }
    
      





  useEffect(() => {
    if (!authToken) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/domain/domain-detail/${domainId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setDomainData(response.data);
      } catch (err) {
        console.error("Error fetching domain details", err);
      }
    };
    fetchData();
  }, [authToken, domainId]);

  if (!domainData) {
    return (
      <MainLayout>
        <div className="p-6 text-center text-gray-600">Loading domain details...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Domain Details: 
            <span className="font-bold text-blue-600">
              {domainData.domainDetails?.domainName}
            </span>
          </h2>
          <Link
            to="/domains/view"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to List
          </Link>
        </div>

        {/* Domain Details Section */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MdOutlineInfo className="mr-2 text-blue-500" /> Domain Details
          </h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>Name:</strong> {domainData.domainDetails?.domainName}</p>
            <p><strong>Description:</strong> {domainData.domainDetails?.description}</p>
            <p><strong>Service Type:</strong> {domainData.domainDetails?.serviceType}</p>
            <p><strong>Period (Years):</strong> {domainData.domainDetails?.periodInYears}</p>
          </div>
        </section>

        {/* DRM Information Section */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">DRM Information</h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>Name:</strong> {domainData.drmInfo?.firstName} {domainData.drmInfo?.lastName}</p>
            <p><strong>Email:</strong> {domainData.drmInfo?.email}</p>
            <p><strong>Telephone:</strong> {domainData.drmInfo?.teleNumber}</p>
            <p><strong>Mobile:</strong> {domainData.drmInfo?.mobileNumber}</p>
            <p><strong>Group:</strong> {domainData.drmInfo?.groupName} (ID: {domainData.drmInfo?.groupId})</p>
            <p><strong>Centre:</strong> {domainData.drmInfo?.centreName} (ID: {domainData.drmInfo?.centreId})</p>
            <p><strong>Designation:</strong> {domainData.drmInfo?.designation}</p>
            <p><strong>Employee No.:</strong> {domainData.drmInfo?.empNo}</p>
          </div>
        </section>

        {/* ARM Information Section */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">ARM Information</h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>Name:</strong> {domainData.armInfo?.firstName} {domainData.armInfo?.lastName}</p>
            <p><strong>Email:</strong> {domainData.armInfo?.email}</p>
            <p><strong>Telephone:</strong> {domainData.armInfo?.teleNumber}</p>
            <p><strong>Mobile:</strong> {domainData.armInfo?.mobileNumber}</p>
            <p><strong>Group:</strong> {domainData.armInfo?.groupName} (ID: {domainData.armInfo?.groupId})</p>
            <p><strong>Centre:</strong> {domainData.armInfo?.centreName} (ID: {domainData.armInfo?.centreId})</p>
            <p><strong>Designation:</strong> {domainData.armInfo?.designation}</p>
            <p><strong>Employee No.:</strong> {domainData.armInfo?.empNo}</p>
          </div>
        </section>

        {/* IP Details Section */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">IP Details</h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>Public IP Address:</strong> {domainData.ipDetails?.publicIpAddress}</p>
            <p><strong>IP Issuer:</strong> {domainData.ipDetails?.ipIssuer}</p>
            <p><strong>Server Hardening:</strong> {domainData.ipDetails?.serverHardeningStatus ? "Yes" : "No"}</p>
          </div>
        </section>

        {/* VAPT Compliance Section */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">VAPT Compliance</h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>Compliant:</strong> {domainData.vaptCompliance?.vaptCompliant ? "Yes" : "No"}</p>
            <p><strong>Certifying Authority:</strong> {domainData.vaptCompliance?.vaptCertifyingAuthority}</p>
            <p><strong>Expiry Date:</strong> {domainData.vaptCompliance?.vaptCertificateExpiryDate}</p>
            <p><strong>Remarks:</strong> {domainData.vaptCompliance?.vaptRemarks}</p>
          </div>
        </section>

        {/* Compliance Status Section */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Compliance Status</h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>GIGW:</strong> {domainData.complianceStatus?.gigwCompliance}</p>
            <p><strong>MOU:</strong> {domainData.complianceStatus?.mouStatus}</p>
          </div>
        </section>


        {/* Section: Status Map */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MdTimeline className="mr-2 text-green-500" /> Status Workflow
          </h3>
          <DomainStatusMap domainStatus={domainData.status} />


          {/* Section 3: Actions (Using ActivityCard style) */}
        {actions.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Actions
            </h3>
            {/* Use a grid that adapts, similar to dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {actions.map((action) => (
                <ActivityCard
                  key={action.title}
                  title={action.title}
                  IconComponent={action.IconComponent}
                  linkTo={action.linkTo} // This link might later trigger a modal onClick
                />
              ))}
            </div>
          </section>
        )}
        </section>
      </div>
    </MainLayout>
  );
}
