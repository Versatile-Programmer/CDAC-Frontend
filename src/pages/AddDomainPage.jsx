// // src/pages/AddDomainPage.jsx
// import React, { useEffect } from "react";
// import MainLayout from "../layouts/MainLayout";
// import FormSection from "../components/forms/FormSection";

// // Import section components (we'll create these next)
// import ProjectInfoSection from "../components/domain-form/ProjectInfoSection";
// import DrmInfoSection from "../components/domain-form/DrmInfoSection";
// import RegistrationInfoSection from "../components/domain-form/RegistrationInfoSection";
// import IpInfoSection from "../components/domain-form/IpInfoSection";
// import VaptInfoSection from "../components/domain-form/VaptInfoSection";
// import ComplianceInfoSection from "../components/domain-form/ComplianceInfoSection";
// import MouInfoSection from "../components/domain-form/MouInfoSection";
// import ArmInfoSection from "../components/domain-form/ArmInfoSection";
// import TermsAndConditionsSection from "../components/domain-form/TermsAndConditionsSection";
// import { useLocation } from "react-router-dom";
// function AddDomainPage() {

//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const projectId = queryParams.get("projectId");

//   const [projectDetails,setProjectDetails] = useState({
//       hodName:"",
//       projectName:"",
//       projectRemarks:""
//     })

//     useEffect







//   // Dummy handler for the final form submit
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
   
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto">
//         {" "}
//         {/* Constrain width for better readability */}
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
//           Domain Name Registration Form
//         </h2>
//         {/* We will use a single <form> element wrapping all sections */}
//         <form onSubmit={handleFormSubmit}>
//           {/* Use FormSection for each part */}
//           <FormSection title="Project Information" initiallyOpen={true}>
//             <ProjectInfoSection /> {/* Content goes here */}
//           </FormSection>

//           <FormSection title="DRM Information" initiallyOpen={true}>
//             <DrmInfoSection />
//           </FormSection>

//           <FormSection title="Registration Information" initiallyOpen={true}>
//             <RegistrationInfoSection />
//           </FormSection>

//           <FormSection title="IP Information" initiallyOpen={true}>
//             <IpInfoSection />
//           </FormSection>

//           <FormSection title="VAPT Information" initiallyOpen={true}>
//             <VaptInfoSection />
//           </FormSection>

//           <FormSection
//             title="Compliance (GIGW/ICT Accessibility)"
//             initiallyOpen={true}
//           >
//             <ComplianceInfoSection />
//           </FormSection>

//           <FormSection title="Memorandum of Understanding" initiallyOpen={true}>
//             <MouInfoSection />
//           </FormSection>

//           <FormSection title="ARM Information" initiallyOpen={true}>
//             <ArmInfoSection />
//           </FormSection>

//           <FormSection title="Terms and Conditions" initiallyOpen={true}>
//             <TermsAndConditionsSection />
//           </FormSection>

//           {/* Final Submit Button - Placed outside the last section */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
//             >
//               Submit Form
//             </button>
//           </div>
//         </form>
//       </div>
//     </MainLayout>
//   );
// }

// export default AddDomainPage;
// src/pages/AddDomainPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { isAuthenticatedState } from "../recoil/atoms/authState";
import fetchUser from "../utils/fetchUser";

function AddDomainPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const projectId = queryParams.get("projectId");
  const user = fetchUser();

  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const [domainRequest, setDomainRequest] = useState({
    drmInfo: {
      fname: "",
      lname: "",
      groupId: null,
      centreId: null,
      designation: "", // enum, e.g., "ENGINEER"
      email: user.employeeEmail,
      teleNumber: "",
      mobileNumber: "",
      empNo: user.id
    },
    armInfo: {
      fname: "",
      lname: "",
      groupId: null,
      centreId: null,
      designation: "", // enum
      email: "",
      teleNumber: "",
      mobileNumber: "",
      empNo: null
    },
    domainDetails: {
      domainName: "",
      description: "",
      serviceType: "", // enum, e.g., "WEB"
      periodInYears: null,
      // registrationType: "NEW" ---
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

  const updateDomainRequest = (section,updatedData)=>{
    setDomainRequest((prev)=>({
      ...prev,
      [section]:updatedData
    }));
  }


  


  // State to store project details fetched from the API.
  const [projectDetails, setProjectDetails] = useState({
    hodName: "",
    projectName: "",
    projectRemarks: "",
    armEmpNo:null
  });

  // useEffect to fetch project details if a projectId is provided.
  useEffect(() => {
    if (!projectId) return;
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/projects/${projectId}`, {
          headers: {
            "Content-Type": "application/json",
            // Optionally add any authorization header if required:
            'Authorization': `Bearer ${isAuthenticated}`
          },
        });
        // Assuming the response data has keys: hodName, projectName, projectRemarks
        const { hodName, projectName, projectRemarks, armEmpNo } = response.data;
        setProjectDetails({ hodName, projectName, projectRemarks,armEmpNo});
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  


  // Dummy handler for final form submit.
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here.

    console.log("PAYLOAD FOR DOMAIN REGISTRATION",domainRequest)

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
            <DrmInfoSection user={user} domainRequest={domainRequest} 
            updateDomainRequest={updateDomainRequest} />
          </FormSection>

          <FormSection title="Registration Information" initiallyOpen={true}>
            <RegistrationInfoSection domainRequest={domainRequest} 
              updateDomainRequest={updateDomainRequest}/>
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
            updateDomainRequest={updateDomainRequest} armEmpNo={projectDetails.armEmpNo}/>
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
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AddDomainPage;

