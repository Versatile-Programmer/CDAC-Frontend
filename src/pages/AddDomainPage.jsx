
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
import { API_BASE_URL } from "../config/env.config";
import { authTokenState, isAuthenticatedState } from "../recoil/atoms/authState";
import fetchUser from "../utils/fetchUser";
import { useRecoilValue } from "recoil";
import { notifyError, notifySuccess } from "../utils/toastUtils";

function AddDomainPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const projectId = queryParams.get("projectId");
  const user = fetchUser();
  const navigate = useNavigate()

  const isAuthenticated = useRecoilValue(authTokenState);






  // State to store project details fetched from the API.
  const [projectDetails, setProjectDetails] = useState({
  });

  const [domainRequest, setDomainRequest] = useState({
    drmInfo: {
      fname: "",
      lname: "",
      groupId: null,
      centreId: null,
      designation: "",
      email: "",
      teleNumber: "",
      mobileNumber: "",
      empNo: user.id,
    },
    armInfo: {
      fname: "",
      lname: "",
      groupId: null,
      centreId: null,
      designation: "",
      email: "",
      teleNumber: "",
      mobileNumber: "",
      empNo: null,
    },
    domainDetails: {
      domainName: "",
      description: "",
      serviceType: "", // enum, e.g., "WEB"
      periodInYears: null,
      registrationType: "NEW"
    },
    approverInfo: {
      hodEmpNo: null,
      edEmpNo: null,
      netopsEmpNo: null,
      webmasterEmpNo: null,
      hodHpcEmpNo: null
    },
    ipDetails: {
      publicIpAddress: "",
      ipIssuer: "",
      serverHardeningStatus: false,
      ipExpiryDate: "" // ISO string e.g. "2025-12-31T00:00:00"
    },
    vaptCompliance: {
      compliant: false,
      certifyingAuthority: "",
      certificateExpiryDate: "", // ISO string
      approvalProof: null, // file or base64 string, depending on usage
      remarks: ""
    },
    complianceStatus: {
      gigwCompliance: "", // enum e.g. "COMPLIANT"
      mouStatus: "" // enum e.g. "NOT_COMPLIANT"
    }
  });

  const updateDomainRequest = (section, updatedData) => {
    setDomainRequest((prev) => ({
      ...prev,
      [section]: updatedData
    }));
  }




  // useEffect to fetch project details if a projectId is provided.
  useEffect(() => {
    if (!projectId) return;
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/project/${projectId}`, {
          headers: {
            "Content-Type": "application/json",
            // Optionally add any authorization header if required:
            'Authorization': `Bearer ${isAuthenticated}`
          },
        });
        console.log("PROJECTY DETAILS", response.data)
        // Assuming the response data has keys: hodName, projectName, projectRemarks
        // const { 
        //   hod:{hod_fname,hod_lname},
        //   project_name:projectName, 
        //   project_remarks:projectRemarks, 
        //   arm_emp_no:armEmpNo
        //  } = response.data;

        //  const hodName = `${hod_fname} ${hod_lname}`

        updateDomainRequest("armInfo", {
          fname: response.data.arm.arm_fname,
          lname: response.data.arm.arm_lname,
          groupId: response.data.arm.grp_id,
          centreId: response.data.arm.centre_id,
          designation: response.data.arm.desig,
          email: response.data.arm.email_id,
          teleNumber: response.data.arm.tele_no,
          mobileNumber: response.data.arm.mob_no,
          empNo: response.data.arm.emp_no,
        });
        // responsibleOfficials

        updateDomainRequest("approverInfo", {
          hodEmpNo: response.data.responsibleOfficials.hod_emp_no,
          edEmpNo: response.data.responsibleOfficials.ed_emp_no,
          netopsEmpNo: response.data.responsibleOfficials.netops_emp_no,
          webmasterEmpNo: response.data.responsibleOfficials.webmaster_emp_no,
          hodHpcEmpNo: response.data.responsibleOfficials.hod_hpc_iande_emp_no
        });


        // And the fetched `drm` object into your state
        updateDomainRequest("drmInfo", {
          fname: response.data.drm.drm_fname,
          lname: response.data.drm.drm_lname,
          groupId: response.data.drm.grp_id,
          centreId: response.data.drm.centre_id,
          designation: response.data.drm.desig,
          email: response.data.drm.email_id,
          teleNumber: response.data.drm.tele_no,
          mobileNumber: response.data.drm.mob_no,
          empNo: response.data.drm.emp_no,
        });



        setProjectDetails(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);




  // Dummy handler for final form submit.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here.

    console.log("PAYLOAD FOR DOMAIN REGISTRATION", domainRequest)

    //CONVERTING LOCALDATE TO LOCALDATE TIME
    if (domainRequest.vaptCompliance.compliant) {
      const date = new Date(domainRequest.vaptCompliance.certificateExpiryDate); // or your selected date
      const isoDateTime = date.toISOString().slice(0, 19); // "2025-04-29T00:00:00"

      domainRequest.vaptCompliance.certificateExpiryDate = isoDateTime
    }

    try {

      // const response = await axios.post(`${API_BASE_URL}/domainRegistration/domainRegister`,domainRequest,{
      //   headers:{
      //     'Content-Type':'application/json',
      //     'Authorization':`Bearer ${isAuthenticated}`
      //   }
      // })

      notifySuccess('Form submitted successfully')
      // setTimeout(() => {
      //   navigate('/dashboard')

      // }, 2000);


    } catch (error) {
      console.log("EROROR", error)
      notifyError('Error occured while submitting')
      throw new Error(error)

    }


  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
          Domain Name Registration Form
        </h2>
        <form onSubmit={handleFormSubmit}>
          {/* Pass any project details to the ProjectInfoSection if needed */}
          <FormSection title="Project Information" initiallyOpen={true}>
            <ProjectInfoSection projectDetails={projectDetails} />
          </FormSection>

          <FormSection title="DRM Information" initiallyOpen={true}>
            <DrmInfoSection user={user}
              domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest}
              projectDetails={projectDetails} />
          </FormSection>

          <FormSection title="Registration Information" initiallyOpen={true}>
            <RegistrationInfoSection domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest} />
          </FormSection>

          <FormSection title="IP Information" initiallyOpen={true}>
            <IpInfoSection domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest}
            />
          </FormSection>

          <FormSection title="VAPT Information" initiallyOpen={true}>
            <VaptInfoSection domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest}
            />
          </FormSection>

          <FormSection
            title="Compliance (GIGW/ICT Accessibility)"
            initiallyOpen={true}
          >
            <ComplianceInfoSection domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest} />
          </FormSection>

          <FormSection title="Memorandum of Understanding" initiallyOpen={true}>
            <MouInfoSection domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest}
            />
          </FormSection>

          <FormSection title="ARM Information" initiallyOpen={true}>
            <ArmInfoSection domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest} projectDetails={projectDetails} />
          </FormSection>

          <FormSection title="Terms and Conditions" initiallyOpen={true}>
            <TermsAndConditionsSection domainRequest={domainRequest}
              updateDomainRequest={updateDomainRequest} />
          </FormSection>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
            >
              Submit Form to Hod
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AddDomainPage;






