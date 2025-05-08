import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TextInput from "../components/forms/TextInput";
import FileUpload from "../components/forms/FileUpload";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { API_BASE_URL } from "../config/env.config";

export default function VerifyTransferPage() {
  const { transferId } = useParams();
  const navigate = useNavigate();
  const authToken = useRecoilValue(authTokenState);

  const [transferData, setTransferData] = useState(null);
  const [drmFromInfo, setDrmFromInfo] = useState(null);
  const [drmToInfo, setDrmToInfo] = useState(null);
  const [remarks, setRemarks] = useState("");

  // Fetch transfer request details
  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/transfers/${transferId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setTransferData(data);
        // Fetch DRM details for both sides
        fetchDrmInfo(data.trns_frm, true);
        fetchDrmInfo(data.trns_to, false);
      } catch (err) {
        console.error("Error fetching transfer:", err);
        toast.error("Failed to load transfer details.");
      }
    };
    if (authToken) fetchTransfer();
  }, [authToken, transferId]);

  const fetchDrmInfo = async (empNo, isFrom) => {
    if (!empNo) return;
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/users/details/DRM/${empNo}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (isFrom) setDrmFromInfo(data);
      else setDrmToInfo(data);
    } catch {
      // silently ignore
    }
  };

  const handleApprove = async () => {
    try {

        //CLEARIFY FROM HANSRAJ ABOUT THE TRANSFER PAYLOAD
      await axios.put(
        `${API_BASE_URL}/api/transfers/${transferId}/approve`,
        { transferId, remarks },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      toast.success("Transfer approved successfully.");
      setTimeout(() => {
        navigate("/dashboard");
        
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve transfer.");
    }
  };

  const handleSendBack = async () => {
    try {

        //CLEARIFY WITH HANSRAJ ??HE DIDNT CREATE??
      await axios.post(
        `${API_BASE_URL}/workflow/hod/rejects`,
        { transferId, remarks },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      toast.success("Transfer sent back to DRM.");
      navigate("/transfers/pending");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send back.");
    }
  };

  const handleDownloadProof = () => {
    if (!transferData?.prf_upload) return;
  
    // 1. Decode Base64 to raw binary string
    const base64 = transferData.prf_upload;
    const binaryString = atob(base64);                                 // :contentReference[oaicite:0]{index=0}
  
    // 2. Create an array of byte values
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    // 3. Build the Blob
    const blob = new Blob([bytes], { type: "application/pdf" });        // :contentReference[oaicite:1]{index=1}
  
    // 4. Generate a download link and click it
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transfer-proof-${transferId}.pdf`;
    document.body.appendChild(link);
    link.click();                                                      // :contentReference[oaicite:2]{index=2}
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  if (!transferData) {
    return (
      <MainLayout>
        <p className="p-6">Loading transfer details...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Toaster position="top-right" />
      <div className="space-y-8 p-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold">Verify Transfer Request</h2>
          <Link to="/transfers/pending" className="text-blue-600 hover:underline">
            ← Back to List
          </Link>
        </div>

        {/* From DRM Info */}
        {drmFromInfo && (
          <section className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">From DRM</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {drmFromInfo.drm_fname} {drmFromInfo.drm_lname}</p>
              <p><strong>Email:</strong> {drmFromInfo.email_id}</p>
              <p><strong>Mobile:</strong> {drmFromInfo.mob_no}</p>
            </div>
          </section>
        )}

        {/* To DRM Info */}
        {drmToInfo && (
          <section className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">To DRM</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {drmToInfo.drm_fname} {drmToInfo.drm_lname}</p>
              <p><strong>Email:</strong> {drmToInfo.email_id}</p>
              <p><strong>Mobile:</strong> {drmToInfo.mob_no}</p>
            </div>
          </section>
        )}

        {/* Reason and Proof */}
        <section className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Transfer Details</h3>
          <p><strong>Reason:</strong> {transferData.rsn_for_trns}</p>
          {transferData.prf_upload && (
            <button
              onClick={handleDownloadProof}
              className="mt-4 flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <FileUpload.Icon className="mr-2" /> Download Proof
            </button>
          )}
        </section>

        {/* Remarks & Actions */}
        <section className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">HOD Remarks</h3>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter your remarks..."
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleApprove}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Approve Transfer
            </button>
            {/* <button
              onClick={handleSendBack}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Send Back to DRM
            </button> */}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
