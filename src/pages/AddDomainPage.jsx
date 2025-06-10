

// src/pages/AddDomainPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import FormSection from "../components/forms/FormSection";

// Import section components
import ProjectInfoSection from "../components/domain-form/ProjectInfoSection";
import DrmInfoSection from "../components/domain-form/DrmInfoSection";
import RegistrationInfoSection from "../components/domain-form/RegistrationInfoSection";
import IpInfoSection from "../components/domain-form/IpInfoSection";
import VaptInfoSection from "../components/domain-form/VaptInfoSection";
import ComplianceInfoSection from "../components/domain-form/ComplianceInfoSection";
import MouInfoSection from "../components/domain-form/MouInfoSection";
import ArmInfoSection from "../components/domain-form/ArmInfoSection";
import TermsAndConditionsSection from "../components/domain-form/TermsAndConditionsSection";

// Import the new modal component
import ConfirmationModal from "../components/modals/ConfirmationModal";

import { API_BASE_URL } from "../config/env.config";
import { authTokenState } from "../recoil/atoms/authState";
import fetchUser from "../utils/fetchUser";
import { useRecoilValue } from "recoil";
import { notifyError, notifySuccess } from "../utils/toastUtils";

function AddDomainPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const projectId = queryParams.get("projectId");
  const user = fetchUser();
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(authTokenState);

  // === STATE MANAGEMENT ===
  const [projectDetails, setProjectDetails] = useState({});
  const [isCheckingIp, setIsCheckingIp] = useState(false);
  const [ipError, setIpError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIpValid, setIsIpValid] = useState(false);

  const [domainRequest, setDomainRequest] = useState({
    drmInfo: { empNo: user.id },
    armInfo: {},
    domainDetails: { registrationType: "NEW" },
    approverInfo: {},
    ipDetails: {},
    vaptCompliance: {},
    complianceStatus: {},
  });

  // === DATA HANDLERS ===
  const updateDomainRequest = (section, updatedData) => {
    if (section === "ipDetails" && 'publicIpAddress' in updatedData) {
      setIpError(null);
      setIsIpValid(false); // <--- CRUCIAL: Reset valid status on change
    }
    setDomainRequest((prev) => ({
      ...prev,
      [section]: updatedData,
    }));
  };

  useEffect(() => {
    if (!projectId) return;
    const fetchProjectDetails = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/project/${projectId}`, {
          headers: { Authorization: `Bearer ${isAuthenticated}` },
        });
        setProjectDetails(data);
        updateDomainRequest("armInfo", {
          fname: data.arm.arm_fname,
          lname: data.arm.arm_lname,
          groupId: data.arm.grp_id,
          centreId: data.arm.centre_id,
          designation: data.arm.desig,
          email: data.arm.email_id,
          teleNumber: data.arm.tele_no,
          mobileNumber: data.arm.mob_no,
          empNo: data.arm.emp_no,
        });
        updateDomainRequest("approverInfo", data.responsibleOfficials);
        updateDomainRequest("drmInfo", {
          fname: data.drm.drm_fname,
          lname: data.drm.drm_lname,
          groupId: data.drm.grp_id,
          centreId: data.drm.centre_id,
          designation: data.drm.desig,
          email: data.drm.email_id,
          teleNumber: data.drm.tele_no,
          mobileNumber: data.drm.mob_no,
          empNo: data.drm.emp_no,
        });
      } catch (error) {
        console.error("Error fetching project details:", error);
        notifyError("Failed to fetch project details.");
      }
    };
    fetchProjectDetails();
  }, [projectId, isAuthenticated]);

  // === VALIDATION & SUBMISSION LOGIC ===
  const handleIpUniquenessCheck = async (ipAddress) => {
    setIsIpValid(false);
    if (!ipAddress) {
      setIpError(null);
      return;
    }
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ipAddress)) {
      setIpError("Please enter a valid IPv4 address format.");
      return;
    }
    setIsCheckingIp(true);
    setIpError(null);
    try {
      await axios.get(`${API_BASE_URL}/ip-management/validation/check-unique?ipAddr=${ipAddress}`, {
        headers: { Authorization: `Bearer ${isAuthenticated}` },
      });
      setIsIpValid(true);
    } catch (error) {
      if (error.response?.status === 409) {
        setIpError(error.response.data.message || "This IP address is already in use.");
      } else {
        setIpError("Could not verify IP address. Please check connection.");
      }
    } finally {
      setIsCheckingIp(false);
    }
  };
  
  const handleOpenConfirmation = (e) => {
    e.preventDefault();
    if (isCheckingIp) {
      notifyError("Please wait for IP validation to complete.");
      return;
    }
    if (ipError) {
      notifyError("Please resolve the IP address error before submitting.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    const payload = { ...domainRequest };

    if (payload.vaptCompliance.compliant && payload.vaptCompliance.certificateExpiryDate) {
      const date = new Date(payload.vaptCompliance.certificateExpiryDate);
      payload.vaptCompliance.certificateExpiryDate = date.toISOString().slice(0, 19);
    }

    try {
      await axios.post(`${API_BASE_URL}/domainRegistration/domainRegister`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated}`,
        },
      });
      notifySuccess("Form submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Submission Error:", error);
      notifyError(error.response?.data?.message || "An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
          Domain Name Registration Form
        </h2>
        <form onSubmit={handleOpenConfirmation}>
          <FormSection title="Project Information" initiallyOpen={true}>
            <ProjectInfoSection projectDetails={projectDetails} />
          </FormSection>
          <FormSection title="DRM Information" initiallyOpen={true}>
            <DrmInfoSection user={user} domainRequest={domainRequest} updateDomainRequest={updateDomainRequest} projectDetails={projectDetails} />
          </FormSection>
          <FormSection title="Registration Information" initiallyOpen={true}>
            <RegistrationInfoSection domainRequest={domainRequest} updateDomainRequest={updateDomainRequest} />
          </FormSection>
          <FormSection title="IP Information" initiallyOpen={true}>
            <IpInfoSection
              domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest}
              onIpBlur={handleIpUniquenessCheck}
              isCheckingIp={isCheckingIp}
              ipError={ipError}
              isIpValid={isIpValid}
            />
          </FormSection>
          <FormSection title="VAPT Information" initiallyOpen={true}>
            <VaptInfoSection domainRequest={domainRequest} updateDomainRequest={updateDomainRequest} />
          </FormSection>
          <FormSection title="Compliance (GIGW/ICT Accessibility)" initiallyOpen={true}>
            <ComplianceInfoSection domainRequest={domainRequest} updateDomainRequest={updateDomainRequest} />
          </FormSection>
          <FormSection title="Memorandum of Understanding" initiallyOpen={true}>
            <MouInfoSection domainRequest={domainRequest} updateDomainRequest={updateDomainRequest} />
          </FormSection>
          <FormSection title="ARM Information" initiallyOpen={true}>
            <ArmInfoSection domainRequest={domainRequest} updateDomainRequest={updateDomainRequest} projectDetails={projectDetails} />
          </FormSection>
          <FormSection title="Terms and Conditions" initiallyOpen={true}>
            <TermsAndConditionsSection domainRequest={domainRequest} updateDomainRequest={updateDomainRequest} />
          </FormSection>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isCheckingIp || !!ipError}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isCheckingIp ? "Validating IP..." : "Submit Form to Hod"}
            </button>
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        isSubmitting={isSubmitting}
        title="Confirm Form Submission"
        message="Are you sure you want to submit this form? Please ensure all details are correct."
        confirmText="Yes, Submit"
        cancelText="No, Go Back"
      />
    </MainLayout>
  );
}

export default AddDomainPage;





