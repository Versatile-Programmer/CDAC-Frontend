// // src/pages/DomainDetailPage.jsx
// import React from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// // Icons (you can add additional icons as needed)
// import { MdOutlineInfo, MdTimeline, MdVerified } from "react-icons/md";

// // Placeholder components (existing or to be created)
// import DomainInfoDisplay from "../components/domain-detail/DomainInfoDisplay";
// import DomainStatusMap from "../components/domain-detail/DomainStatusMap";

// // For now, we simulate the verification form data response from the API using the DTO provided
// const mockVerificationData = (domain_id) => ({
//   domainId: domain_id,
//   // Domain Details from DomainDetails DTO
//   domainDetails: {
//     domainName: "example.com",
//     description: "This is a sample domain description",
//     serviceType: "SomeService",
//     periodInYears: 1,
//   },
//   // DRM information (from PersonInfo in the DTO)
//   drmInfo: {
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@example.com",
//     teleNumber: "555-0100",
//     mobileNumber: "555-0101",
//     groupId: 101,
//     centreId: 201,
//     designation: "Manager",
//     empNo: 1001,
//     groupName: "Group A",
//     centreName: "Centre X",
//   },
//   // ARM information (from PersonInfo in the DTO)
//   armInfo: {
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane.smith@example.com",
//     teleNumber: "555-0200",
//     mobileNumber: "555-0201",
//     groupId: 102,
//     centreId: 202,
//     designation: "Supervisor",
//     empNo: 1002,
//     groupName: "Group B",
//     centreName: "Centre Y",
//   },
//   // For the status track bar, we re-use DomainStatusMap (adjust according to your backend status)
//   status: "Pending Verification", // This status can be updated based on your backend workflow
// });

// function GenericDomainDetailPage() {
//   const { domainId } = useParams();
//   // Get the verification form data (replace with your API call later)


//   const verificationData = mockVerificationData(domainId);

//   // For generic verification navigation, use a placeholder verifier.
//   // Replace "verifier123" with an appropriate value from your user or domain context.
//   const verifier = "verifier123";
//   const navigate = useNavigate();

//   const handleVerify = () => {
//     // Here you can perform any preliminary actions if necessary.
//     // For now, we redirect to the generic workflow URL.
//     navigate(`/workflow/${verifier}`);
//   };

//   return (
//     <MainLayout>
//       <div className="space-y-8">
//         {/* Page Header */}
//         <div className="flex justify-between items-center border-b pb-2">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Domain Verification:{" "}
//             <span className="font-bold text-blue-600">
//               {verificationData.domainDetails.domainName}
//             </span>
//           </h2>
//           <Link
//             to="/domains/view"
//             className="text-sm text-blue-600 hover:underline"
//           >
//             ← Back to List
//           </Link>
//         </div>

//         {/* Section 1: Basic Domain Information */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <MdOutlineInfo className="mr-2 text-blue-500" /> Domain Information
//           </h3>
//           {/* Passing domainDetails to the existing display component */}
//           <DomainInfoDisplay domainData={verificationData.domainDetails} />
//         </section>

//         {/* Section 2: DRM Information */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             DRM Information
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Name:</strong> {verificationData.drmInfo.firstName}{" "}
//               {verificationData.drmInfo.lastName}
//             </p>
//             <p>
//               <strong>Email:</strong> {verificationData.drmInfo.email}
//             </p>
//             <p>
//               <strong>Telephone:</strong> {verificationData.drmInfo.teleNumber}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {verificationData.drmInfo.mobileNumber}
//             </p>
//             <p>
//               <strong>Group:</strong> {verificationData.drmInfo.groupName} (ID:{" "}
//               {verificationData.drmInfo.groupId})
//             </p>
//             <p>
//               <strong>Centre:</strong> {verificationData.drmInfo.centreName} (ID:{" "}
//               {verificationData.drmInfo.centreId})
//             </p>
//           </div>
//         </section>

//         {/* Section 3: ARM Information */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             ARM Information
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Name:</strong> {verificationData.armInfo.firstName}{" "}
//               {verificationData.armInfo.lastName}
//             </p>
//             <p>
//               <strong>Email:</strong> {verificationData.armInfo.email}
//             </p>
//             <p>
//               <strong>Telephone:</strong> {verificationData.armInfo.teleNumber}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {verificationData.armInfo.mobileNumber}
//             </p>
//             <p>
//               <strong>Group:</strong> {verificationData.armInfo.groupName} (ID:{" "}
//               {verificationData.armInfo.groupId})
//             </p>
//             <p>
//               <strong>Centre:</strong> {verificationData.armInfo.centreName} (ID:{" "}
//               {verificationData.armInfo.centreId})
//             </p>
//           </div>
//         </section>

//         {/* Section 4: Domain Status Track Bar */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <MdTimeline className="mr-2 text-green-500" /> Status Workflow
//           </h3>
//           <DomainStatusMap domainStatus={verificationData.status} />
//         </section>

//         {/* Section 5: Verification Action */}
//         <section className="flex justify-center">
//           <button
//             onClick={handleVerify}
//             className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             <MdVerified className="mr-2" size={20} /> Verify Domain
//           </button>
//         </section>
//       </div>
//     </MainLayout>
//   );
// }

// export default GenericDomainDetailPage;
// src/pages/GenericDomainDetailPage.jsx






// -----------------------
// import React, { useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// // Icons (you can add additional icons as needed)
// import { MdOutlineInfo, MdTimeline, MdVerified, MdFileDownload } from "react-icons/md";

// // Placeholder component for the domain status track bar
// import DomainStatusMap from "../components/domain-detail/DomainStatusMap";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";
// import { API_BASE_URL } from "../config/env.config";

// // Simulated API response conforming to your DTO (without the approverInfo section)
// const mockVerificationData = (domainId) => ({
//   domainId: domainId,
//   reason: "Sample reason for renewal",
//   // Simulated approval proof content (it could be a byte array, a base64 string, or a URL)
//   domainRenewalApprovalProofByHod: "Sample approval proof content", // Replace with actual data as needed
//   domainDetails: {
//     domainName: "example.com",
//     description: "This is a sample domain description",
//     serviceType: "SomeService",
//     periodInYears: 1,
//   },
//   drmInfo: {
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@example.com",
//     teleNumber: "555-0100",
//     mobileNumber: "555-0101",
//     groupId: 101,
//     centreId: 201,
//     designation: "Manager",
//     empNo: 1001,
//     groupName: "Group A",
//     centreName: "Centre X",
//   },
//   armInfo: {
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane.smith@example.com",
//     teleNumber: "555-0200",
//     mobileNumber: "555-0201",
//     groupId: 102,
//     centreId: 202,
//     designation: "Supervisor",
//     empNo: 1002,
//     groupName: "Group B",
//     centreName: "Centre Y",
//   },
//   ipDetails: {
//     publicIpAddress: "192.168.0.1",
//     ipIssuer: "ISP Inc.",
//     serverHardeningStatus: true,
//   },
//   vaptCompliance: {
//     vaptCompliant: true,
//     certifyingAuthority: "Authority ABC",
//     certificateExpiryDate: new Date().toISOString().split("T")[0],
//     // Although approvalProof field exists in DTO, we're using domainRenewalApprovalProofByHod for the download here
//     approvalProof: null,
//     remarks: "All good.",
//   },
//   complianceStatus: {
//     gigwCompliance: "Compliant", // Replace with your Status value
//     mouStatus: "Pending",
//   },
//   // Domain status for the track bar (if applicable)
//   status: "Pending Verification",
// });

// function GenericDomainDetailPage({verifier}) {
//     const authToken = useRecoilValue(authTokenState)
//   const { domainId } = useParams();
// //   const verificationData = mockVerificationData(domainId);
//   const [verificationData,setVerificationData] = useState({});
//   const [verificationStatus,setVerificationStatus] = useState("ARM Forwarded")
//   const [payload,setPayload] = useState({
//     domainNameId:domainId,
//     remarks:""
//   }) 



// //   const verifier = "verifier123"; // Replace with the actual verifier value as needed
//   const navigate = useNavigate();


//   useEffect(async ()=>{

//     try {
//     const response = await axios.get(`${API_BASE_URL}/domain/domain-detail/${domainId}`)

//     console.log("DOMAIN DETAIL--",response.data)
//     setVerificationData(response.data)

//     } catch (error) {
//         console.log("EIRIRIRIR",error)
//         throw error

//     }



//   },[authToken])

//   const handleVerify = async() => {

//     setVerificationStatus("HOD Verified")


//     try {
//         const response = await axios.post(`${API_BASE_URL}/${verifier}`,payload,{
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':`Bearer ${authToken}`
//             }
//         })

//         console.log("DOMAIN DETAIL--",response.data)
//         setVerificationData(response.data)

//         } catch (error) {
//             console.log("EIRIRIRIR",error)
//             throw error

//         }



//     navigate(`/workflow/${verifier}`);
//   };

//   // Function to simulate download of the approval proof.
//   // In a real world scenario, adjust the MIME type and content as needed.
//   const handleDownloadApprovalProof = () => {
//     if (verificationData.vaptCompliance.approvalProof) {
//       const blob = new Blob([verificationData.vaptCompliance.approvalProof], {
//         type: "application/pdf", // Adjust MIME type if necessary
//       });
//       const fileUrl = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = fileUrl;
//       link.download = `approval-proof-${verificationData.domainId}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(fileUrl);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="space-y-8">
//         {/* Page Header */}
//         <div className="flex justify-between items-center border-b pb-2">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Domain Verification:{" "}
//             <span className="font-bold text-blue-600">
//               {verificationData.domainDetails.domainName}
//             </span>
//           </h2>
//           <Link
//             to="/domains/view"
//             className="text-sm text-blue-600 hover:underline"
//           >
//             ← Back to List
//           </Link>
//         </div>

//         {/* Section 1: Domain Details */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <MdOutlineInfo className="mr-2 text-blue-500" /> Domain Details
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Name:</strong> {verificationData.domainDetails.domainName}
//             </p>
//             <p>
//               <strong>Description:</strong>{" "}
//               {verificationData.domainDetails.description}
//             </p>
//             <p>
//               <strong>Service Type:</strong>{" "}
//               {verificationData.domainDetails.serviceType}
//             </p>
//             <p>
//               <strong>Period (Years):</strong>{" "}
//               {verificationData.domainDetails.periodInYears}
//             </p>
//             <p>
//               <strong>Reason:</strong> {verificationData.reason}
//             </p>
//           </div>
//         </section>

//         {/* Section 2: DRM Information */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             DRM Information
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Name:</strong> {verificationData.drmInfo.firstName}{" "}
//               {verificationData.drmInfo.lastName}
//             </p>
//             <p>
//               <strong>Email:</strong> {verificationData.drmInfo.email}
//             </p>
//             <p>
//               <strong>Telephone:</strong> {verificationData.drmInfo.teleNumber}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {verificationData.drmInfo.mobileNumber}
//             </p>
//             <p>
//               <strong>Group:</strong> {verificationData.drmInfo.groupName} (ID:{" "}
//               {verificationData.drmInfo.groupId})
//             </p>
//             <p>
//               <strong>Centre:</strong> {verificationData.drmInfo.centreName} (ID:{" "}
//               {verificationData.drmInfo.centreId})
//             </p>
//             <p>
//               <strong>Designation:</strong> {verificationData.drmInfo.designation}
//             </p>
//             <p>
//               <strong>Employee No.:</strong> {verificationData.drmInfo.empNo}
//             </p>
//           </div>
//         </section>

//         {/* Section 3: ARM Information */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             ARM Information
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Name:</strong> {verificationData.armInfo.firstName}{" "}
//               {verificationData.armInfo.lastName}
//             </p>
//             <p>
//               <strong>Email:</strong> {verificationData.armInfo.email}
//             </p>
//             <p>
//               <strong>Telephone:</strong> {verificationData.armInfo.teleNumber}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {verificationData.armInfo.mobileNumber}
//             </p>
//             <p>
//               <strong>Group:</strong> {verificationData.armInfo.groupName} (ID:{" "}
//               {verificationData.armInfo.groupId})
//             </p>
//             <p>
//               <strong>Centre:</strong> {verificationData.armInfo.centreName} (ID:{" "}
//               {verificationData.armInfo.centreId})
//             </p>
//             <p>
//               <strong>Designation:</strong> {verificationData.armInfo.designation}
//             </p>
//             <p>
//               <strong>Employee No.:</strong> {verificationData.armInfo.empNo}
//             </p>
//           </div>
//         </section>

//         {/* Section 4: IP Details */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             IP Details
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Public IP Address:</strong>{" "}
//               {verificationData.ipDetails.publicIpAddress}
//             </p>
//             <p>
//               <strong>IP Issuer:</strong> {verificationData.ipDetails.ipIssuer}
//             </p>
//             <p>
//               <strong>Server Hardening Status:</strong>{" "}
//               {verificationData.ipDetails.serverHardeningStatus ? "Yes" : "No"}
//             </p>
//           </div>
//         </section>

//         {/* Section 5: VAPT Compliance */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             VAPT Compliance
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>VAPT Compliant:</strong>{" "}
//               {verificationData.vaptCompliance.vaptCompliant ? "Yes" : "No"}
//             </p>
//             <p>
//               <strong>Certifying Authority:</strong>{" "}
//               {verificationData.vaptCompliance.certifyingAuthority}
//             </p>
//             <p>
//               <strong>Certificate Expiry Date:</strong>{" "}
//               {verificationData.vaptCompliance.certificateExpiryDate}
//             </p>
//             <p>
//               <strong>Remarks:</strong> {verificationData.vaptCompliance.remarks}
//             </p>
//             {/* Approval Proof integrated into VAPT section */}
//             {verificationData.domainRenewalApprovalProofByHod ? (
//               <button
//                 onClick={handleDownloadApprovalProof}
//                 className="flex items-center mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//               >
//                 <MdFileDownload className="mr-2" size={20} /> Download Approval Proof
//               </button>
//             ) : (
//               <p className="text-gray-500 mt-2">No approval proof available.</p>
//             )}
//           </div>
//         </section>

//         {/* Section 6: Compliance Status */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             Compliance Status
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>GIGW Compliance:</strong>{" "}
//               {verificationData.complianceStatus.gigwCompliance}
//             </p>
//             <p>
//               <strong>MOU Status:</strong>{" "}
//               {verificationData.complianceStatus.mouStatus}
//             </p>
//           </div>
//         </section>

//         {/* Section 7: Domain Status Track Bar */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <MdTimeline className="mr-2 text-green-500" /> Status Workflow
//           </h3>
//           <DomainStatusMap domainStatus={verificationStatus} />
//         </section>

//         {/* Section 8: Verification Action */}
//         <section className="flex justify-center">
//           <button
//             onClick={handleVerify}
//             className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             <MdVerified className="mr-2" size={20} /> Verify Domain
//           </button>
//         </section>
//       </div>
//     </MainLayout>
//   );
// }

// export default GenericDomainDetailPage;
// src/pages/GenericDomainDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
// Icons (you can add additional icons as needed)
import {
  MdOutlineInfo,
  MdTimeline,
  MdVerified,
  MdFileDownload,
} from "react-icons/md";

// Placeholder component for the domain status track bar
import DomainStatusMap from "../components/domain-detail/DomainStatusMap";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { API_BASE_URL } from "../config/env.config";
import { notifyError, notifySuccess } from "../utils/toastUtils";
import { getUserRole } from "../utils/helper";
// Simulated API response conforming to your DTO (without the approverInfo section)
const mockVerificationData = (domainId) => ({
  domainId: domainId,
  reason: "Sample reason for renewal",
  // Simulated approval proof content (it could be a byte array, base64 string, or a URL)
  domainRenewalApprovalProofByHod: "Sample approval proof content", // Replace with actual data as needed
  domainDetails: {
    domainName: "example.com",
    description: "This is a sample domain description",
    serviceType: "SomeService",
    periodInYears: 1,
  },
  drmInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    teleNumber: "555-0100",
    mobileNumber: "555-0101",
    groupId: 101,
    centreId: 201,
    designation: "Manager",
    empNo: 1001,
    groupName: "Group A",
    centreName: "Centre X",
  },
  armInfo: {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    teleNumber: "555-0200",
    mobileNumber: "555-0201",
    groupId: 102,
    centreId: 202,
    designation: "Supervisor",
    empNo: 1002,
    groupName: "Group B",
    centreName: "Centre Y",
  },
  ipDetails: {
    publicIpAddress: "192.168.0.1",
    ipIssuer: "ISP Inc.",
    serverHardeningStatus: true,
  },
  vaptCompliance: {
    vaptCompliant: true,
    certifyingAuthority: "Authority ABC",
    certificateExpiryDate: new Date().toISOString().split("T")[0],
    // Although approvalProof field exists in DTO, we're using domainRenewalApprovalProofByHod for the download here
    approvalProof: null,
    remarks: "All good.",
  },
  complianceStatus: {
    gigwCompliance: "Compliant", // Replace with your Status value
    mouStatus: "Pending",
  },
  // Domain status for the track bar (if applicable)
  status: "Pending Verification",
});

// map your verifier key to the next workflow status
const nextStatus = {
  arm:       "ARM Forwarded",
  hod:       "HOD Verified",
  ed:        "ED Approved",
  netops:    "NetOps Verified",
  webmaster: "Webmaster Verified",
  hpc:       "HPC Recommended",
  purchaser: "Purchased",
  active:    "Active",
  // …etc
};

const roleBasedVerificationButton = (role)=>{
   switch (role) {
     case "DRM":
       return "Verify and Forward to ARM";
     case "ARM":
       return "Verify and consent to be ARM";
     case "HOD":
       return "Verify and Forward to ED";
     case "ED":
       return "Verify and Forward to NetOps";
     case "NETOPS":
       return "Verify and Forward to Webmaster";
     case "WEBMASTER":
       return "Verify and Forward to HodHpcI&E";
     case "HODHPC":
       return "Recommend for purchase";
     default:
       break;
   }
}

function GenericDomainDetailPage({ verifier, reason }) {
  const authToken = useRecoilValue(authTokenState);
    const { domainId } = useParams();
  // const domainId = 1;

  // Store the fetched verification data. For now, you may simulate it until the API is ready.
  const [verificationData, setVerificationData] = useState({ mockVerificationData });
  // Local state for the domain verification status for the status map.
  const [verificationStatus, setVerificationStatus] = useState("ARM Forwarded");
  // State for the payload including remarks. This payload will be sent with the API calls.
  const [payload, setPayload] = useState({
    domainNameId: domainId,
    remarks: "",
  });
  const role = getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the domain detail from the backend API.
    const fetchDomainDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/domain/domain-detail/${domainId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("DOMAIN DETAIL--", response.data);
        setVerificationData(response.data);
        setVerificationStatus(response.data.status)
      } catch (error) {
        console.log("Error fetching domain details", error);
      }
    };

    // Use the API data. If you are still testing, you can uncomment the next line
    // setVerificationData(mockVerificationData(domainId));
    if (authToken) {
      fetchDomainDetails();
    }
  }, [authToken, domainId]);

  // Updates the verification status locally, then calls API to mark as verified.
  const handleVerify = async () => {
    // Update the status locally (you could also update with response data)
    const newStatus = nextStatus[verifier] || verificationStatus;
+  setVerificationStatus(newStatus);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/workflow/${verifier}/verifies`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Verification API Response:", response.data);
      setVerificationData(response.data);

      notifySuccess("Successfully Verified")
      setTimeout(()=>{
        navigate('/dashboard')
      },3000)
    } catch (error) {
      notifyError('Error occured while verifiying')
      console.log("Error verifying domain", error);
    }
    // navigate(`/workflow/${verifier}`);
  };

  // Function to simulate download of the approval proof.
  const handleDownloadApprovalProof = () => {
    if (verificationData.vaptCompliance?.approvalProofVaptCompliant) {
      const blob = new Blob(
        [verificationData.vaptCompliance.approvalProofVaptCompliant],
        {
          type: "application/pdf", // Adjust MIME type if necessary
        }
      );
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `approval-proof-${verificationData.domainId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileUrl);
    }
  };

  const handleDownloadRenewalHodApprovalProof = () => {
    if (verificationData?.domainRenewalApprovalProofByHod) {
      const blob = new Blob(
        [verificationData.domainRenewalApprovalProofByHod],
        {
          type: "application/pdf", // Adjust MIME type if necessary
        }
      );
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `approval-proof-${verificationData.domainId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileUrl);
    }
  };

  // New function: Sends the HOD remarks back to DRM.
  const handleSendBackToDrm = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${verifier}/rejects`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Send back to DRM API Response:", response.data);
      setVerificationData(response.data);
      // Optionally navigate or notify the user upon success.
    } catch (error) {
      console.log("Error sending remarks back to DRM", error);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Domain Verification:{" "}
            <span className="font-bold text-blue-600">
              {verificationData.domainDetails?.domainName}
            </span>
          </h2>
          <Link
            to="/domains/view"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to List
          </Link>
        </div>
        {/* Section 7: Domain Status Track Bar */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MdTimeline className="mr-2 text-green-500" /> Status Workflow
          </h3>
          <DomainStatusMap domainStatus={verificationStatus} />
        </section>

        {/* Section 1: Domain Details */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MdOutlineInfo className="mr-2 text-blue-500" /> Domain Details
          </h3>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Name:</strong>{" "}
              {verificationData.domainDetails?.domainName}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {verificationData.domainDetails?.description}
            </p>
            <p>
              <strong>Service Type:</strong>{" "}
              {verificationData.domainDetails?.serviceType}
            </p>
            <p>
              <strong>Period (Years):</strong>{" "}
              {verificationData.domainDetails?.periodInYears}
            </p>

            {reason === "renewal" && (
              <p>
                <strong>Reason for Renewal:</strong> {verificationData.reason}
              </p>
            )}

            {reason === "renewal" &&
            verificationData.domainRenewalApprovalProofByHod ? (
              <button
                onClick={handleDownloadRenewalHodApprovalProof}
                className="flex items-center mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <MdFileDownload className="mr-2" size={20} /> Download Hod
                Approval Proof
              </button>
            ) : (
              <p className="text-gray-500 mt-2">No approval proof available.</p>
            )}

            {/* <p>
              <strong>Reason:</strong> {verificationData.reason}
            </p> */}
          </div>
        </section>

        {/* Section 2: DRM Information */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            DRM Information
          </h3>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Name:</strong> {verificationData.drmInfo?.firstName}{" "}
              {verificationData.drmInfo?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {verificationData.drmInfo?.email}
            </p>
            <p>
              <strong>Telephone:</strong> {verificationData.drmInfo?.teleNumber}
            </p>
            <p>
              <strong>Mobile:</strong> {verificationData.drmInfo?.mobileNumber}
            </p>
            <p>
              <strong>Group:</strong> {verificationData.drmInfo?.groupName} (ID:{" "}
              {verificationData.drmInfo?.groupId})
            </p>
            <p>
              <strong>Centre:</strong> {verificationData.drmInfo?.centreName}{" "}
              (ID: {verificationData.drmInfo?.centreId})
            </p>
            <p>
              <strong>Designation:</strong>{" "}
              {verificationData.drmInfo?.designation}
            </p>
            <p>
              <strong>Employee No.:</strong> {verificationData.drmInfo?.empNo}
            </p>
          </div>
        </section>

        {/* Section 3: ARM Information */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            ARM Information
          </h3>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Name:</strong> {verificationData.armInfo?.firstName}{" "}
              {verificationData.armInfo?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {verificationData.armInfo?.email}
            </p>
            <p>
              <strong>Telephone:</strong> {verificationData.armInfo?.teleNumber}
            </p>
            <p>
              <strong>Mobile:</strong> {verificationData.armInfo?.mobileNumber}
            </p>
            <p>
              <strong>Group:</strong> {verificationData.armInfo?.groupName} (ID:{" "}
              {verificationData.armInfo?.groupId})
            </p>
            <p>
              <strong>Centre:</strong> {verificationData.armInfo?.centreName}{" "}
              (ID: {verificationData.armInfo?.centreId})
            </p>
            <p>
              <strong>Designation:</strong>{" "}
              {verificationData.armInfo?.designation}
            </p>
            <p>
              <strong>Employee No.:</strong> {verificationData.armInfo?.empNo}
            </p>
          </div>
        </section>

        {/* Section 4: IP Details */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            IP Details
          </h3>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>Public IP Address:</strong>{" "}
              {verificationData.ipDetails?.publicIpAddress}
            </p>
            <p>
              <strong>IP Issuer:</strong> {verificationData.ipDetails?.ipIssuer}
            </p>
            <p>
              <strong>Server Hardening Status:</strong>{" "}
              {verificationData.ipDetails?.serverHardeningStatus ? "Yes" : "No"}
            </p>
          </div>
        </section>

        {/* Section 5: VAPT Compliance */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            VAPT Compliance
          </h3>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>VAPT Compliant:</strong>{" "}
              {verificationData.vaptCompliance?.vaptCompliant ? "Yes" : "No"}
            </p>
            <p>
              <strong>Certifying Authority:</strong>{" "}
              {verificationData.vaptCompliance?.certifyingAuthority}
            </p>
            <p>
              <strong>Certificate Expiry Date:</strong>{" "}
              {verificationData.vaptCompliance?.certificateExpiryDate}
            </p>
            <p>
              <strong>Remarks:</strong>{" "}
              {verificationData.vaptCompliance?.remarks}
            </p>
            {/* Approval Proof integrated into VAPT section */}
            {verificationData.vaptCompliance?.approvalProofVaptCompliant ? (
              <button
                onClick={handleDownloadApprovalProof}
                className="flex items-center mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <MdFileDownload className="mr-2" size={20} /> Download Approval
                Proof
              </button>
            ) : (
              <p className="text-gray-500 mt-2">No approval proof available.</p>
            )}
          </div>
        </section>

        {/* Section 6: Compliance Status */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Compliance Status
          </h3>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong>GIGW Compliance:</strong>{" "}
              {verificationData.complianceStatus?.gigwCompliance}
            </p>
            <p>
              <strong>MOU Status:</strong>{" "}
              {verificationData.complianceStatus?.mouStatus}
            </p>
          </div>
        </section>

        {/* Section 8: HOD Remarks & Send Back to DRM */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {`${verifier.toUpperCase()}  Remarks`}
          </h3>
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter remarks for DRM..."
            value={payload.remarks}
            onChange={(e) =>
              setPayload({ ...payload, remarks: e.target.value })
            }
            rows={4}
          ></textarea>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleVerify}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <MdVerified className="mr-2" size={20} />{" "}
              {roleBasedVerificationButton(role)}
            </button>
            <button
              onClick={handleSendBackToDrm}
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Send Back To DRM
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default GenericDomainDetailPage;



