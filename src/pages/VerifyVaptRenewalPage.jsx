import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { API_BASE_URL } from "../config/env.config";

// Icons
import { MdOutlineInfo, MdFileDownload, MdVerified, MdClose } from "react-icons/md";

const VerifyVaptRenewalPage = () => {
    const { vaptRenewalId } = useParams();
    const [searchParams] = useSearchParams();
    const dmId = searchParams.get("domainId");
    const authToken = useRecoilValue(authTokenState);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [hodRemarks, setHodRemarks] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        if (!authToken) return;
        const fetchDetails = async () => {
            try {
                // const url = new URL(`${API_BASE_URL}/vapt-renewal/${vaptRenewalId}`);
                // if (dmId) url.searchParams.set("domainId", dmId);
                const resp = await axios.get(`${API_BASE_URL}/vapt/vapt-view/detail/${vaptRenewalId}`, {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
                });
                setData(resp.data);
            } catch (err) {
                console.error("Failed to load VAPT renewal:", err);
            }
        };
        fetchDetails();
    }, [authToken, vaptRenewalId, dmId]);

    const downloadBase64 = (base64, filename) => {
        if (!base64) return;
        const bin = atob(base64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        const blob = new Blob([arr], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleVerify = async () => {
        setActionLoading(true);
        try {
            await axios.patch(
                `${API_BASE_URL}/api/vapt/${vaptRenewalId}/approve`,
                { is_aprvd: true, hod_remarks: hodRemarks, dm_id: dmId },
                {
                    headers:
                        { Authorization: `Bearer ${authToken}` }
                }
            );
            // optionally update data.status or refetch
            setData({ ...data, status: "APPROVED" });
        } catch (err) {
            console.error("Approval failed:", err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        setActionLoading(true);
        try {
            await axios.post(
                `${API_BASE_URL}/api/${vaptRenewalId}/reject`,
                { is_aprvd: false, hod_remarks: hodRemarks, dm_id: dmId },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            setData({ ...data, status: "REJECTED" });
        } catch (err) {
            console.error("Rejection failed:", err);
        } finally {
            setActionLoading(false);
        }
    };

    if (!data) {
        return (
            <MainLayout>
                <div className="p-6 text-center">Loading VAPT Renewal details...</div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-2xl font-semibold">
                        VAPT Renewal 
                        {/* <span className="text-blue-600">{data.vaptRenewalId}</span> */}
                    </h2>
                    <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline">
                        ← Back
                    </button>
                </div>

                {/* Renewal Details */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h3 className="flex items-center text-lg font-semibold mb-4">
                        <MdOutlineInfo className="mr-2 text-blue-500" /> Renewal Details
                    </h3>
                    <div className="space-y-2">
                        <p><strong>Renewal Application Date:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                        <p><strong>Domain Name:</strong> {data.domainName}</p>
                        <p><strong>VAPT Expiry Date:</strong> {data.newVaptExpiryDate ? new Date(data.newVaptExpiryDate).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Status:</strong> {data.status}</p>
                    </div>
                </section>

                {/* DRM Info */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">DRM Information</h3>
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {data.drmName}</p>
                        <p><strong>Email:</strong> {data.drmEmail}</p>
                        <p><strong>Mobile:</strong> {data.drmMobileNo}</p>
                        <p><strong>Centre:</strong> {data.drmCentre}</p>
                    </div>
                </section>

                {/* ARM Info */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">ARM Information</h3>
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {data.armName}</p>
                        <p><strong>Email:</strong> {data.armEmail}</p>
                        <p><strong>Mobile:</strong> {data.armMobileNo}</p>
                        <p><strong>Centre:</strong> {data.armCentre}</p>
                    </div>
                </section>

                {/* VAPT Reports */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h3 className="flex items-center text-lg font-semibold mb-4">
                        <MdFileDownload className="mr-2 text-green-500" /> VAPT Reports
                    </h3>
                    <div className="flex gap-4">
                        {data.oldVaptReport ? (
                            <button onClick={() => downloadBase64(data.oldVaptReport, `old-report-${data.vaptRenewalId}.pdf`)} className="px-4 py-2 bg-gray-600 text-white rounded">
                                Download Old Report
                            </button>
                        ) : (<span>No old report</span>)}
                        <button onClick={() => downloadBase64(data.newVaptReport, `new-report-${data.vaptRenewalId}.pdf`)} className="px-4 py-2 bg-blue-600 text-white rounded">
                            Download New Report
                        </button>
                    </div>
                </section>

                {/* HOD Remarks & Actions */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">HOD Remarks</h3>
                    <textarea
                        rows={4}
                        value={hodRemarks}
                        onChange={(e) => setHodRemarks(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter remarks..."
                    />
                    <div className="mt-4 flex gap-4">
                        <button onClick={handleVerify} disabled={actionLoading} className="flex items-center px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                            <MdVerified className="mr-2" /> Verify
                        </button>
                        <button onClick={handleReject} disabled={actionLoading} className="flex items-center px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
                            <MdClose className="mr-2" /> Reject
                        </button>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default VerifyVaptRenewalPage;
