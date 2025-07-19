
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import axios from "axios";
// // Icons (you can add additional icons as needed)
// import {
//   MdOutlineInfo,
//   MdTimeline,
//   MdVerified,
//   MdFileDownload,
// } from "react-icons/md";

// // Placeholder component for the domain status track bar
// import DomainStatusMap from "../components/domain-detail/DomainStatusMap";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";
// import { API_BASE_URL } from "../config/env.config";
// import { notifyError, notifySuccess } from "../utils/toastUtils";
// import { getUserRole } from "../utils/helper";
// // Simulated API response conforming to your DTO (without the approverInfo section)
// const mockVerificationData = (domainId) => ({
//   domainId: domainId,
//   reason: "Sample reason for renewal",
//   // Simulated approval proof content (it could be a byte array, base64 string, or a URL)
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

// // map your verifier key to the next workflow status
// const nextStatus = {
//   arm:       "ARM Forwarded",
//   hod:       "HOD Verified",
//   ed:        "ED Approved",
//   netops:    "NetOps Verified",
//   webmaster: "Webmaster Verified",
//   hpc:       "HPC Recommended",
//   purchaser: "Purchased",
//   active:    "Active",
//   // …etc
// };

// const roleBasedVerificationButton = (role)=>{
//    switch (role) {
//      case "DRM":
//        return "Verify and Forward to ARM";
//      case "ARM":
//        return "Verify";
//      case "HOD":
//        return "Approved";
//      case "ED":
//        return "Verify and Forward to NetOps";
//      case "NETOPS":
//        return "Verify and Forward to Webmaster";
//      case "WEBMASTER":
//        return "Verify and Forward to HodHpcI&E";
//      case "HODHPC":
//        return "Recommend for purchase";
//      default:
//        break;
//    }
// }

// function GenericDomainDetailPage({ verifier, reason }) {
//   const authToken = useRecoilValue(authTokenState);
//     const { domainId } = useParams();
//   // const domainId = 1;

//   // Store the fetched verification data. For now, you may simulate it until the API is ready.
//   const [verificationData, setVerificationData] = useState({ mockVerificationData });
//   // Local state for the domain verification status for the status map.
//   const [verificationStatus, setVerificationStatus] = useState("ARM Forwarded");
//   // State for the payload including remarks. This payload will be sent with the API calls.
//   const [payload, setPayload] = useState({
//     domainNameId: domainId,
//     remarks: "",
//   });
//   const role = getUserRole();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the domain detail from the backend API.
//     const fetchDomainDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/domain/domain-detail/${domainId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );
//         console.log("DOMAIN DETAIL--", response.data);
//         setVerificationData(response.data);
//         setVerificationStatus(response.data.status)
//       } catch (error) {
//         console.log("Error fetching domain details", error);
//       }
//     };

//     // Use the API data. If you are still testing, you can uncomment the next line
//     // setVerificationData(mockVerificationData(domainId));
//     if (authToken) {
//       fetchDomainDetails();
//     }
//   }, [authToken, domainId]);

//   // Updates the verification status locally, then calls API to mark as verified.
//   const handleVerify = async () => {
//     // Update the status locally (you could also update with response data)
//     const newStatus = nextStatus[verifier] || verificationStatus;
// +  setVerificationStatus(newStatus);

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/workflow/${verifier}/verifies`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log("Verification API Response:", response.data);
//       setVerificationData(response.data);

//       notifySuccess("Successfully Verified")
//       setTimeout(()=>{
//         navigate('/dashboard')
//       },3000)
//     } catch (error) {
//       notifyError('Error occured while verifiying')
//       console.log("Error verifying domain", error);
//     }
//     // navigate(`/workflow/${verifier}`);
//   };

//   // Function to simulate download of the approval proof.
//   const handleDownloadApprovalProof = () => {
//     // if (verificationData.vaptCompliance?.approvalProofVaptCompliant) {
//     //   const blob = new Blob(
//     //     [verificationData.vaptCompliance.approvalProofVaptCompliant],
//     //     {
//     //       type: "application/pdf", // Adjust MIME type if necessary
//     //     }
//     //   );
//     //   const fileUrl = URL.createObjectURL(blob);
//     //   const link = document.createElement("a");
//     //   link.href = fileUrl;
//     //   link.download = `approval-proof-${verificationData.domainId}.pdf`;
//     //   document.body.appendChild(link);
//     //   link.click();
//     //   document.body.removeChild(link);
//     //   URL.revokeObjectURL(fileUrl);


//       if (verificationData.vaptCompliance?.approvalProofVaptCompliant) {
  
//     // 1. Decode Base64 to raw binary string
//     const base64 = verificationData.vaptCompliance.approvalProofVaptCompliant;
//     const binaryString = atob(base64);                                 // :contentReference[oaicite:0]{index=0}
  
//     // 2. Create an array of byte values
//     const len = binaryString.length;
//     const bytes = new Uint8Array(len);
//     for (let i = 0; i < len; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }
  
//     // 3. Build the Blob
//     const blob = new Blob([bytes], { type: "application/pdf" });        // :contentReference[oaicite:1]{index=1}
  
//     // 4. Generate a download link and click it
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `approval-proof.pdf`;
//     document.body.appendChild(link);
//     link.click();                                                      // :contentReference[oaicite:2]{index=2}
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   }
//   };

//   const handleDownloadRenewalHodApprovalProof = () => {
//     if (verificationData?.domainRenewalApprovalProofByHod) {
//       const blob = new Blob(
//         [verificationData.domainRenewalApprovalProofByHod],
//         {
//           type: "application/pdf", // Adjust MIME type if necessary
//         }
//       );
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

//   // New function: Sends the HOD remarks back to DRM.
//   const handleSendBackToDrm = async () => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/${verifier}/rejects`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log("Send back to DRM API Response:", response.data);
//       setVerificationData(response.data);
//       // Optionally navigate or notify the user upon success.
//     } catch (error) {
//       console.log("Error sending remarks back to DRM", error);
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
//               {verificationData.domainDetails?.domainName}
//             </span>
//           </h2>
//           <Link
//             to="/domains/view"
//             className="text-sm text-blue-600 hover:underline"
//           >
//             ← Back to List
//           </Link>
//         </div>
//         {/* Section 7: Domain Status Track Bar */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <MdTimeline className="mr-2 text-green-500" /> Status Workflow
//           </h3>
//           <DomainStatusMap domainStatus={verificationStatus} />
//         </section>

//         {/* Section 1: Domain Details */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <MdOutlineInfo className="mr-2 text-blue-500" /> Domain Details
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Name:</strong>{" "}
//               {verificationData.domainDetails?.domainName}
//             </p>
//             <p>
//               <strong>Description:</strong>{" "}
//               {verificationData.domainDetails?.description}
//             </p>
//             <p>
//               <strong>Service Type:</strong>{" "}
//               {verificationData.domainDetails?.serviceType}
//             </p>
//             <p>
//               <strong>Period (Years):</strong>{" "}
//               {verificationData.domainDetails?.periodInYears}
//             </p>

//             {reason === "renewal" && (
//               <p>
//                 <strong>Reason for Renewal:</strong> {verificationData.reason}
//               </p>
//             )}

//             {reason === "renewal" &&
//             verificationData.domainRenewalApprovalProofByHod ? (
//               <button
//                 onClick={handleDownloadRenewalHodApprovalProof}
//                 className="flex items-center mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//               >
//                 <MdFileDownload className="mr-2" size={20} /> Download Hod
//                 Approval Proof
//               </button>
//             ) : (
//               <p className="text-gray-500 mt-2">No approval proof available.</p>
//             )}

//             {/* <p>
//               <strong>Reason:</strong> {verificationData.reason}
//             </p> */}
//           </div>
//         </section>

//         {/* Section 2: DRM Information */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             DRM Information
//           </h3>
//           <div className="space-y-2 text-gray-800">
//             <p>
//               <strong>Name:</strong> {verificationData.drmInfo?.firstName}{" "}
//               {verificationData.drmInfo?.lastName}
//             </p>
//             <p>
//               <strong>Email:</strong> {verificationData.drmInfo?.email}
//             </p>
//             <p>
//               <strong>Telephone:</strong> {verificationData.drmInfo?.teleNumber}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {verificationData.drmInfo?.mobileNumber}
//             </p>
//             <p>
//               <strong>Group:</strong> {verificationData.drmInfo?.groupName} (ID:{" "}
//               {verificationData.drmInfo?.groupId})
//             </p>
//             <p>
//               <strong>Centre:</strong> {verificationData.drmInfo?.centreName}{" "}
//               (ID: {verificationData.drmInfo?.centreId})
//             </p>
//             <p>
//               <strong>Designation:</strong>{" "}
//               {verificationData.drmInfo?.designation}
//             </p>
//             <p>
//               <strong>Employee No.:</strong> {verificationData.drmInfo?.empNo}
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
//               <strong>Name:</strong> {verificationData.armInfo?.firstName}{" "}
//               {verificationData.armInfo?.lastName}
//             </p>
//             <p>
//               <strong>Email:</strong> {verificationData.armInfo?.email}
//             </p>
//             <p>
//               <strong>Telephone:</strong> {verificationData.armInfo?.teleNumber}
//             </p>
//             <p>
//               <strong>Mobile:</strong> {verificationData.armInfo?.mobileNumber}
//             </p>
//             <p>
//               <strong>Group:</strong> {verificationData.armInfo?.groupName} (ID:{" "}
//               {verificationData.armInfo?.groupId})
//             </p>
//             <p>
//               <strong>Centre:</strong> {verificationData.armInfo?.centreName}{" "}
//               (ID: {verificationData.armInfo?.centreId})
//             </p>
//             <p>
//               <strong>Designation:</strong>{" "}
//               {verificationData.armInfo?.designation}
//             </p>
//             <p>
//               <strong>Employee No.:</strong> {verificationData.armInfo?.empNo}
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
//               {verificationData.ipDetails?.publicIpAddress}
//             </p>
//             <p>
//               <strong>IP Issuer:</strong> {verificationData.ipDetails?.ipIssuer}
//             </p>
//             <p>
//               <strong>Server Hardening Status:</strong>{" "}
//               {verificationData.ipDetails?.serverHardeningStatus ? "Yes" : "No"}
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
//               {verificationData.vaptCompliance?.vaptCompliant ? "Yes" : "No"}
//             </p>
//             <p>
//               <strong>Certifying Authority:</strong>{" "}
//               {verificationData.vaptCompliance?.certifyingAuthority}
//             </p>
//             <p>
//               <strong>Certificate Expiry Date:</strong>{" "}
//               {verificationData.vaptCompliance?.certificateExpiryDate}
//             </p>
//             <p>
//               <strong>Remarks:</strong>{" "}
//               {verificationData.vaptCompliance?.remarks}
//             </p>
//             {/* Approval Proof integrated into VAPT section */}
//             {verificationData.vaptCompliance?.approvalProofVaptCompliant ? (
//               <button
//                 onClick={handleDownloadApprovalProof}
//                 className="flex items-center mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//               >
//                 <MdFileDownload className="mr-2" size={20} /> Download Approval
//                 Proof
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
//               {verificationData.complianceStatus?.gigwCompliance}
//             </p>
//             <p>
//               <strong>MOU Status:</strong>{" "}
//               {verificationData.complianceStatus?.mouStatus}
//             </p>
//           </div>
//         </section>

//         {/* Section 8: HOD Remarks & Send Back to DRM */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             {`${verifier.toUpperCase()}  Remarks`}
//           </h3>
//           <textarea
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             placeholder="Enter remarks for DRM..."
//             value={payload.remarks}
//             onChange={(e) =>
//               setPayload({ ...payload, remarks: e.target.value })
//             }
//             rows={4}
//           ></textarea>
//           <div className="mt-4 flex gap-4">
//             <button
//               onClick={handleVerify}
//               className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <MdVerified className="mr-2" size={20} />{" "}
//               {roleBasedVerificationButton(role)}
//             </button>
//             <button
//               onClick={handleSendBackToDrm}
//               className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
//             >
//               Send Back To DRM
//             </button>
//           </div>
//         </section>
//       </div>
//     </MainLayout>
//   );
// }

// export default GenericDomainDetailPage;





// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import axios from "axios";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";
// import { API_BASE_URL } from "../config/env.config";
// import { notifyError, notifySuccess } from "../utils/toastUtils";
// import { getUserRole } from "../utils/helper";

// // Icons
// import {
//   MdOutlineInfo,
//   MdTimeline,
//   MdVerified,
//   MdFileDownload,
//   MdPerson, // For user info sections
//   MdComputer, // For IP/Tech details
//   MdOutlineSecurity, // For VAPT/Compliance
//   MdComment, // For Remarks
//   MdOutlineArrowBack, // For Send Back
//   MdCancel, // For Not Approved
// } from "react-icons/md";

// // Placeholder component for the domain status track bar
// import DomainStatusMap from "../components/domain-detail/DomainStatusMap";

// // Map your verifier key to the next workflow status
// const nextStatus = {
//   arm: "ARM Forwarded",
//   hod: "HOD Verified",
//   ed: "ED Approved",
//   netops: "NetOps Verified",
//   webmaster: "Webmaster Verified",
//   hpc: "HPC Recommended",
//   purchaser: "Purchased",
//   active: "Active",
//   // Add other statuses as needed
// };

// // Generates specific verification button text based on role (except for approval roles)
// const roleBasedVerificationButtonText = (role) => {
//   switch (role?.toUpperCase()) { // Use uppercase for reliable comparison
//     case "DRM":
//       return "Verify and Forward to ARM";
//     case "ARM":
//       return "Verify and Forward to HOD"; // Adjusted based on typical flow
//     // Approval roles (HOD, ED, etc.) handled separately
//     default:
//       return "Verify"; // Fallback text
//   }
// };

// function GenericDomainDetailPage({ verifier, reason }) {
//   const authToken = useRecoilValue(authTokenState);
//   const { domainId } = useParams();
//   const navigate = useNavigate();
//   const role = getUserRole(); // Get the current user's role

//   const [verificationData, setVerificationData] = useState({}); // Initialize as empty object
//   const [verificationStatus, setVerificationStatus] = useState("Loading..."); // Initial status
//   const [isLoading, setIsLoading] = useState(true);
//   const [payload, setPayload] = useState({
//     domainNameId: domainId,
//     remarks: "",
//   });

//   // Roles that use "Approved" / "Not Approved" terminology
//   const approvalRoles = ["HOD", "ED", "NETOPS", "WEBMASTER", "HODHPC"];
//   const isApprovalRole = approvalRoles.includes(role?.toUpperCase());

//   // Determine button texts and tooltips based on role
//   const verifyButtonText = isApprovalRole
//     ? "Approved"
//     : roleBasedVerificationButtonText(role);
//   const rejectButtonText = isApprovalRole ? "Not Approved" : "Send Back To DRM";

//   const verifyButtonTooltip = isApprovalRole
//     ? "Approve the request and proceed"
//     : "Verify the details and forward to the next authority";
//   const rejectButtonTooltip = isApprovalRole
//     ? "Reject the request and send it back to the DRM for correction"
//     : "Send the request back to the DRM for review or correction";


//   useEffect(() => {
//     const fetchDomainDetails = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/domain/domain-detail/${domainId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );
//         console.log("DOMAIN DETAIL--", response.data);
//         setVerificationData(response.data || {}); // Ensure it's an object even if API returns null/undefined
//         setVerificationStatus(response.data?.status || "Unknown"); // Use optional chaining and provide fallback
//         setPayload(prev => ({ ...prev, domainNameId: domainId })); // Ensure domainId is set in payload
//       } catch (error) {
//         console.error("Error fetching domain details:", error);
//         notifyError("Failed to fetch domain details.");
//         setVerificationData({}); // Set to empty object on error
//         setVerificationStatus("Error");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (authToken && domainId) {
//       fetchDomainDetails();
//     } else if (!authToken) {
//        console.log("Auth token not available yet.");
//        // Optionally, you could redirect to login or show a message
//     }

//   }, [authToken, domainId]); // Re-run if authToken or domainId changes


//   // Updates the verification status locally, then calls API to mark as verified.
//   const handleVerify = async () => {
//     // Optional: Optimistically update status (or wait for API response)
//     // const newStatus = nextStatus[verifier] || verificationStatus;
//     // setVerificationStatus(newStatus);

//     setIsLoading(true); // Indicate processing
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/workflow/${verifier}/verifies`, // Use the verifier prop to build URL
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log("Verification API Response:", response.data);
//       // Update state with potentially modified data from backend
//       setVerificationData(response.data || verificationData);
//       setVerificationStatus(response.data?.status || "Verified"); // Update status from response if available
//       notifySuccess(`Successfully ${isApprovalRole ? 'Approved' : 'Verified'}.`);
//       setTimeout(() => {
//         navigate('/dashboard'); // Navigate after showing success
//       }, 2000); // Shorter delay
//     } catch (error) {
//       console.error("Error verifying domain:", error);
//       notifyError(`Error occurred while ${isApprovalRole ? 'approving' : 'verifying'}. Please try again.`);
//       // Optional: Revert optimistic update if needed
//       // setVerificationStatus(verificationData.status || "Error");
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   // Sends rejection/remarks back to DRM.
//   const handleSendBackToDrm = async () => {
//       if (!payload.remarks) {
//           notifyError(`Please provide remarks before clicking '${rejectButtonText}'.`);
//           return; // Prevent API call without remarks
//       }
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         // Use the verifier prop passed to the component to construct the correct endpoint
//         `${API_BASE_URL}/workflow/${verifier}/rejects`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log("Send back/Reject API Response:", response.data);
//       // Update state based on response
//       setVerificationData(response.data || verificationData);
//       setVerificationStatus(response.data?.status || "Rejected"); // Update status if backend provides it
//       notifySuccess(`Successfully sent back to DRM ${isApprovalRole ? 'as Not Approved' : 'for review'}.`);
//       setTimeout(() => {
//         navigate('/dashboard'); // Navigate after showing success
//       }, 2000);
//     } catch (error) {
//       console.error("Error sending back/rejecting:", error);
//       notifyError(`Error occurred while ${isApprovalRole ? 'rejecting' : 'sending back'}. Please try again.`);
//     } finally {
//         setIsLoading(false);
//     }
//   };


//   // Function to handle download of VAPT approval proof (Base64).
//   const handleDownloadApprovalProof = () => {
//     const base64 = verificationData.vaptCompliance?.approvalProofVaptCompliant;
//     if (base64) {
//       try {
//         const binaryString = atob(base64); // Decode Base64
//         const len = binaryString.length;
//         const bytes = new Uint8Array(len);
//         for (let i = 0; i < len; i++) {
//           bytes[i] = binaryString.charCodeAt(i);
//         }
//         const blob = new Blob([bytes], { type: "application/pdf" }); // Assume PDF
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `vapt-approval-proof-${verificationData.domainDetails?.domainName || domainId}.pdf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//          notifySuccess("VAPT proof download started.");
//       } catch (error) {
//         console.error("Error processing Base64 string:", error);
//         notifyError("Failed to decode or download the VAPT proof.");
//       }
//     } else {
//         notifyError("No VAPT approval proof available to download.");
//     }
//   };

//   // Function to handle download of HOD renewal approval proof (potentially different format).
//   const handleDownloadRenewalHodApprovalProof = () => {
//      const proofData = verificationData?.domainRenewalApprovalProofByHod;
//      if (proofData) {
//          try {
//               // Assuming proofData is also Base64 PDF for consistency, adjust if it's different
//               const binaryString = atob(proofData);
//               const len = binaryString.length;
//               const bytes = new Uint8Array(len);
//               for (let i = 0; i < len; i++) {
//                   bytes[i] = binaryString.charCodeAt(i);
//               }
//               const blob = new Blob([bytes], { type: "application/pdf" });
//               const fileUrl = URL.createObjectURL(blob);
//               const link = document.createElement("a");
//               link.href = fileUrl;
//               link.download = `hod-renewal-approval-${verificationData.domainDetails?.domainName || domainId}.pdf`;
//               document.body.appendChild(link);
//               link.click();
//               document.body.removeChild(link);
//               URL.revokeObjectURL(fileUrl);
//               notifySuccess("HOD Renewal proof download started.");
//           } catch (error) {
//                 console.error("Error processing HOD renewal proof data:", error);
//                 // Fallback if it's not base64 - maybe simple text or different blob type?
//                 // This part might need adjustment based on the actual data format
//                 try {
//                      const blob = new Blob([proofData], { type: "application/octet-stream" }); // Generic fallback type
//                      const fileUrl = URL.createObjectURL(blob);
//                      const link = document.createElement("a");
//                      link.href = fileUrl;
//                      link.download = `hod-renewal-approval-${verificationData.domainDetails?.domainName || domainId}.dat`; // Generic extension
//                      document.body.appendChild(link);
//                      link.click();
//                      document.body.removeChild(link);
//                      URL.revokeObjectURL(fileUrl);
//                      notifySuccess("HOD Renewal proof download started (generic format).");
//                 } catch (innerError) {
//                      console.error("Error creating Blob for HOD proof:", innerError);
//                      notifyError("Failed to download the HOD renewal proof. Data format might be unexpected.");
//                 }
//           }
//      } else {
//          notifyError("No HOD renewal approval proof available.");
//      }
//   };

//   // Helper to display data safely
//   const displayData = (data) => data || <span className="text-gray-500 italic">N/A</span>;
//   const displayBool = (data) => data ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-red-600 font-medium">No</span>;


//   if (isLoading && !verificationData.domainDetails) { // Show loading indicator only if data isn't partially loaded
//       return <MainLayout><div className="flex justify-center items-center h-screen"><p>Loading domain details...</p></div></MainLayout>;
//   }

//   return (
//     <MainLayout>
//       <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
//         {/* Page Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-4 mb-6">
//           <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                 Domain Verification Task
//               </h2>
//                <p className="text-lg text-gray-600">
//                   Domain: <span className="font-semibold text-blue-700">{displayData(verificationData.domainDetails?.domainName)}</span>
//                </p>
//            </div>
//           <Link
//             to="/dashboard" // Link back to dashboard or relevant list page
//             className="mt-2 md:mt-0 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//           >
//             ← Back to Dashboard
//           </Link>
//         </div>

//         {/* Section 7: Domain Status Track Bar */}
//         <section className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <MdTimeline className="mr-2 text-xl text-indigo-500" /> Current Status Workflow
//           </h3>
//           <DomainStatusMap domainStatus={verificationStatus} />
//         </section>

//         {/* Grid Layout for Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* Section 1: Domain Details */}
//           <section className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//               <MdOutlineInfo className="mr-2 text-xl text-blue-500" /> Domain Details
//             </h3>
//             <div className="space-y-3 text-sm text-gray-800">
//               <p><strong>Name:</strong> {displayData(verificationData.domainDetails?.domainName)}</p>
//               <p><strong>Description:</strong> {displayData(verificationData.domainDetails?.description)}</p>
//               <p><strong>Service Type:</strong> {displayData(verificationData.domainDetails?.serviceType)}</p>
//               <p><strong>Period (Years):</strong> {displayData(verificationData.domainDetails?.periodInYears)}</p>

//               {reason === "renewal" && (
//                 <p><strong>Reason for Renewal:</strong> {displayData(verificationData.reason)}</p>
//               )}

//               {reason === "renewal" && verificationData.domainRenewalApprovalProofByHod && (
//                 <button
//                   onClick={handleDownloadRenewalHodApprovalProof}
//                   disabled={isLoading}
//                   className="flex items-center mt-3 px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
//                 >
//                   <MdFileDownload className="mr-1" size={16} /> Download HOD Approval Proof
//                 </button>
//               )}
//             </div>
//           </section>

//           {/* Section 2: DRM Information */}
//           <section className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//                 <MdPerson className="mr-2 text-xl text-teal-500" /> DRM Information
//             </h3>
//             <div className="space-y-3 text-sm text-gray-800">
//               <p><strong>Name:</strong> {displayData(verificationData.drmInfo?.firstName)} {displayData(verificationData.drmInfo?.lastName)}</p>
//               <p><strong>Email:</strong> {displayData(verificationData.drmInfo?.email)}</p>
//               <p><strong>Telephone:</strong> {displayData(verificationData.drmInfo?.teleNumber)}</p>
//               <p><strong>Mobile:</strong> {displayData(verificationData.drmInfo?.mobileNumber)}</p>
//               <p><strong>Group:</strong> {displayData(verificationData.drmInfo?.groupName)} (ID: {displayData(verificationData.drmInfo?.groupId)})</p>
//               <p><strong>Centre:</strong> {displayData(verificationData.drmInfo?.centreName)} (ID: {displayData(verificationData.drmInfo?.centreId)})</p>
//               <p><strong>Designation:</strong> {displayData(verificationData.drmInfo?.designation)}</p>
//               <p><strong>Employee No.:</strong> {displayData(verificationData.drmInfo?.empNo)}</p>
//             </div>
//           </section>

//           {/* Section 3: ARM Information */}
//            <section className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
//              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//                  <MdPerson className="mr-2 text-xl text-cyan-500" /> ARM Information
//              </h3>
//              <div className="space-y-3 text-sm text-gray-800">
//                <p><strong>Name:</strong> {displayData(verificationData.armInfo?.firstName)} {displayData(verificationData.armInfo?.lastName)}</p>
//                <p><strong>Email:</strong> {displayData(verificationData.armInfo?.email)}</p>
//                <p><strong>Telephone:</strong> {displayData(verificationData.armInfo?.teleNumber)}</p>
//                <p><strong>Mobile:</strong> {displayData(verificationData.armInfo?.mobileNumber)}</p>
//                <p><strong>Group:</strong> {displayData(verificationData.armInfo?.groupName)} (ID: {displayData(verificationData.armInfo?.groupId)})</p>
//                <p><strong>Centre:</strong> {displayData(verificationData.armInfo?.centreName)} (ID: {displayData(verificationData.armInfo?.centreId)})</p>
//                <p><strong>Designation:</strong> {displayData(verificationData.armInfo?.designation)}</p>
//                <p><strong>Employee No.:</strong> {displayData(verificationData.armInfo?.empNo)}</p>
//              </div>
//            </section>

//           {/* Section 4: IP Details */}
//           <section className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//                 <MdComputer className="mr-2 text-xl text-orange-500" /> IP Details
//             </h3>
//             <div className="space-y-3 text-sm text-gray-800">
//               <p><strong>Public IP Address:</strong> {displayData(verificationData.ipDetails?.publicIpAddress)}</p>
//               <p><strong>IP Issuer:</strong> {displayData(verificationData.ipDetails?.ipIssuer)}</p>
//               <p><strong>Server Hardening Status:</strong> {displayBool(verificationData.ipDetails?.serverHardeningStatus)}</p>
//             </div>
//           </section>

//           {/* Section 5: VAPT Compliance */}
//           <section className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//                 <MdOutlineSecurity className="mr-2 text-xl text-red-500" /> VAPT Compliance
//             </h3>
//             <div className="space-y-3 text-sm text-gray-800">
//               <p><strong>VAPT Compliant:</strong> {displayBool(verificationData.vaptCompliance?.vaptCompliant)}</p>
//               <p><strong>Certifying Authority:</strong> {displayData(verificationData.vaptCompliance?.vaptCertifyingAuthority)}</p>
//               <p><strong>Certificate Expiry Date:</strong> {displayData(verificationData.vaptCompliance?.vaptCertificateExpiryDate)}</p>
//               <p><strong>Remarks:</strong> {displayData(verificationData.vaptCompliance?.vaptRemarks)}</p>
//               {/* Approval Proof Button */}
//               {verificationData.vaptCompliance?.approvalProofVaptCompliant ? (
//                 <button
//                   onClick={handleDownloadApprovalProof}
//                    disabled={isLoading}
//                   className="flex items-center mt-3 px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
//                 >
//                   <MdFileDownload className="mr-1" size={16} /> Download VAPT Approval Proof
//                 </button>
//               ) : (
//                 <p className="text-xs text-gray-500 mt-3 italic">No VAPT approval proof available.</p>
//               )}
//             </div>
//           </section>

//           {/* Section 6: Compliance Status */}
//           <section className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//                <MdOutlineSecurity className="mr-2 text-xl text-purple-500" /> Other Compliance
//             </h3>
//             <div className="space-y-3 text-sm text-gray-800">
//               <p><strong>GIGW Compliance:</strong> {displayData(verificationData.complianceStatus?.gigwCompliance)}</p>
//               <p><strong>MOU Status:</strong> {displayData(verificationData.complianceStatus?.mouStatus)}</p>
//             </div>
//           </section>
//         </div> {/* End Grid */}

//         {/* Section 8: Remarks & Actions */}
//         <section className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg shadow-lg border border-gray-200 mt-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//             <MdComment className="mr-2 text-xl text-gray-600" /> {verifier ? verifier.toUpperCase() : 'Your'} Remarks & Actions
//           </h3>
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
//             placeholder={`Enter remarks here... ${isApprovalRole ? '(Required if rejecting)' : '(Optional)'}`}
//             value={payload.remarks}
//             onChange={(e) =>
//               setPayload({ ...payload, remarks: e.target.value })
//             }
//             rows={4}
//             disabled={isLoading}
//           ></textarea>
//           <div className="mt-5 flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={handleVerify}
//               disabled={isLoading}
//               title={verifyButtonTooltip} // Add tooltip
//               className={`flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-sm disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
//             >
//               <MdVerified className="mr-2" size={18} />
//               {isLoading ? 'Processing...' : verifyButtonText}
//             </button>
//             <button
//               onClick={handleSendBackToDrm}
//               disabled={isLoading || (!payload.remarks && isApprovalRole)} // Disable if loading OR if it's an approval role and remarks are empty
//               title={rejectButtonTooltip} // Add tooltip
//               className={`flex items-center justify-center px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-sm disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
//             >
//               {isApprovalRole ? <MdCancel className="mr-2" size={18} /> : <MdOutlineArrowBack className="mr-2" size={18} />}
//               {isLoading ? 'Processing...' : rejectButtonText}
//             </button>
//           </div>
//            {isApprovalRole && !payload.remarks && (
//                <p className="text-xs text-red-500 mt-2 italic">Remarks are required to 'Not Approve'.</p>
//            )}
//         </section>
//       </div>
//     </MainLayout>
//   );
// }

// export default GenericDomainDetailPage;






// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import axios from "axios";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";
// import { API_BASE_URL } from "../config/env.config";
// import { notifyError, notifySuccess } from "../utils/toastUtils";
// import { getUserRole } from "../utils/helper";

// // --- Icons (Unchanged) ---
// import {
//   MdOutlineInfo,
//   MdTimeline,
//   MdVerified,
//   MdFileDownload,
//   MdPerson,
//   MdComputer,
//   MdOutlineSecurity,
//   MdComment,
//   MdOutlineArrowBack,
//   MdCancel,
//   MdAssignmentTurnedIn // Added for compliance section icon consistency
// } from "react-icons/md";

// // --- Component for status map (Unchanged) ---
// import DomainStatusMap from "../components/domain-detail/DomainStatusMap";

// // --- Map your verifier key to the next workflow status (Unchanged) ---
// const nextStatus = {
//   arm: "ARM Forwarded",
//   hod: "HOD Verified",
//   ed: "ED Approved",
//   netops: "NetOps Verified",
//   webmaster: "Webmaster Verified",
//   hpc: "HPC Recommended",
//   purchaser: "Purchased",
//   active: "Active",
//   // Add other statuses as needed
// };

// // --- Role-based button text generator (Unchanged) ---
// const roleBasedVerificationButtonText = (role) => {
//   switch (role?.toUpperCase()) {
//     case "DRM":
//       return "Verify and Forward to ARM";
//     case "ARM":
//       return "Verify and Forward to HOD";
//     default:
//       return "Verify";
//   }
// };

// // --- Helper: Section Component for visual structure ONLY ---
// const DetailSection = ({ title, icon: Icon, children }) => (
//     <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200 flex items-center">
//             {Icon && <Icon className="mr-3 text-2xl text-blue-600" />}
//             {title}
//         </h3>
//         {/* Apply consistent spacing inside the section content */}
//         <div className="space-y-4 text-sm">
//             {children}
//         </div>
//     </section>
// );

// // --- Helper: Definition List Item for visual structure ONLY ---
// const DefinitionItem = ({ term, definition }) => (
//     definition || definition === false || definition === 0 ? ( // Render if definition exists or is explicitly falsy (like boolean No)
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-baseline mb-1"> {/* Grid layout for term/definition */}
//             <dt className="font-semibold text-gray-600 sm:col-span-1">{term}:</dt>
//             <dd className="text-gray-800 sm:col-span-2">{definition}</dd>
//         </div>
//     ) : null
// );


// function GenericDomainDetailPage({ verifier, reason }) {
//   // --- State Hooks (Unchanged Logic) ---
//   const authToken = useRecoilValue(authTokenState);
//   const { domainId } = useParams();
//   const navigate = useNavigate();
//   const role = getUserRole(); // Get the current user's role

//   const [verificationData, setVerificationData] = useState({});
//   const [verificationStatus, setVerificationStatus] = useState("Loading...");
//   const [isLoading, setIsLoading] = useState(true);
//   const [payload, setPayload] = useState({
//     domainNameId: domainId, // Initialized with domainId from params
//     remarks: "",
//   });

//   // --- Role-based Logic (Unchanged) ---
//   const approvalRoles = ["HOD", "ED", "NETOPS", "WEBMASTER", "HODHPC"];
//   const isApprovalRole = approvalRoles.includes(role?.toUpperCase());

//   const verifyButtonText = isApprovalRole ? "Approved" : roleBasedVerificationButtonText(role);
//   const rejectButtonText = isApprovalRole ? "Not Approved" : "Send Back To DRM";
//   const verifyButtonTooltip = isApprovalRole ? "Approve the request and proceed" : "Verify the details and forward to the next authority";
//   const rejectButtonTooltip = isApprovalRole ? "Reject the request and send it back to the DRM for correction" : "Send the request back to the DRM for review or correction";

//   // --- useEffect for Data Fetching (Unchanged Logic) ---
//   useEffect(() => {
//     const fetchDomainDetails = async () => {
//       setIsLoading(true);
//       try {
//         // *** Axios call with Authorization header - Logic Unchanged ***
//         console.log('Fetching details with token:', authToken ? 'Token Present' : 'Token MISSING'); // Debug log
//         const response = await axios.get(
//           `${API_BASE_URL}/domain/domain-detail/${domainId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${authToken}`, // Auth token usage unchanged
//             },
//           }
//         );
//         console.log("DOMAIN DETAIL--", response.data);
//         setVerificationData(response.data || {});
//         setVerificationStatus(response.data?.status || "Unknown");
//         // Ensure domainId is consistently set in payload state upon fetch
//         setPayload(prev => ({ ...prev, domainNameId: domainId }));
//       } catch (error) {
//         console.error("Error fetching domain details:", error);
//         // Check for specific auth errors if possible
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//              notifyError("Authentication error fetching details. Please log in again.");
//              // Potentially navigate to login: navigate('/login');
//         } else {
//              notifyError("Failed to fetch domain details.");
//         }
//         setVerificationData({});
//         setVerificationStatus("Error");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Condition check unchanged
//     if (authToken && domainId) {
//       fetchDomainDetails();
//     } else if (!authToken) {
//        console.log("Auth token not available yet for fetch.");
//        setIsLoading(false); // Stop loading if no token
//        notifyError("Authentication token is missing. Cannot fetch details.");
//     } else if (!domainId) {
//         console.log("Domain ID is missing.");
//         setIsLoading(false); // Stop loading if no domainId
//         notifyError("Domain ID is missing from the URL.");
//     }

//   }, [authToken, domainId, navigate]); // Added navigate to dependencies as it's used indirectly in error handling

//   // --- handleVerify Action (Unchanged Logic) ---
//   const handleVerify = async () => {
//     setIsLoading(true);
//     try {
//       // *** Axios call with Authorization header - Logic Unchanged ***
//       console.log('Verifying with token:', authToken ? 'Token Present' : 'Token MISSING'); // Debug log
//       const response = await axios.post(
//         `${API_BASE_URL}/workflow/${verifier}/verifies`,
//         payload, // Payload includes domainNameId and remarks
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`, // Auth token usage unchanged
//           },
//         }
//       );
//       console.log("Verification API Response:", response.data);
//       setVerificationData(response.data || verificationData); // Update state
//       setVerificationStatus(response.data?.status || "Verified"); // Update status
//       notifySuccess(`Successfully ${isApprovalRole ? 'Approved' : 'Verified'}.`);
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (error) {
//       console.error("Error verifying domain:", error);
//        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//             notifyError("Authentication error during verification. Please log in again.");
//        } else {
//            notifyError(`Error occurred while ${isApprovalRole ? 'approving' : 'verifying'}. Please try again.`);
//        }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- handleSendBackToDrm Action (Unchanged Logic) ---
//   const handleSendBackToDrm = async () => {
//     // Remarks check unchanged
//     if (!payload.remarks && isApprovalRole) { // Explicit check for approval role added for clarity
//         notifyError(`Please provide remarks before clicking '${rejectButtonText}'.`);
//         return;
//     }
//     setIsLoading(true);
//     try {
//       // *** Axios call with Authorization header - Logic Unchanged ***
//        console.log('Rejecting with token:', authToken ? 'Token Present' : 'Token MISSING'); // Debug log
//       const response = await axios.post(
//         `${API_BASE_URL}/workflow/${verifier}/rejects`,
//         payload, // Payload includes domainNameId and remarks
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`, // Auth token usage unchanged
//           },
//         }
//       );
//       console.log("Send back/Reject API Response:", response.data);
//       setVerificationData(response.data || verificationData); // Update state
//       setVerificationStatus(response.data?.status || "Rejected"); // Update status
//       notifySuccess(`Successfully sent back to DRM ${isApprovalRole ? 'as Not Approved' : 'for review'}.`);
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } catch (error) {
//       console.error("Error sending back/rejecting:", error);
//        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//            notifyError("Authentication error during rejection. Please log in again.");
//        } else {
//            notifyError(`Error occurred while ${isApprovalRole ? 'rejecting' : 'sending back'}. Please try again.`);
//        }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Download Handlers (Unchanged Logic) ---
//   const handleDownloadApprovalProof = () => {
//     const base64 = verificationData.vaptCompliance?.approvalProofVaptCompliant;
//     if (base64) {
//       try {
//         const binaryString = atob(base64);
//         const len = binaryString.length;
//         const bytes = new Uint8Array(len);
//         for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
//         const blob = new Blob([bytes], { type: "application/pdf" });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `vapt-approval-proof-${verificationData.domainDetails?.domainName || domainId}.pdf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//         notifySuccess("VAPT proof download started.");
//       } catch (error) {
//         console.error("Error processing VAPT Base64 string:", error);
//         notifyError("Failed to decode or download the VAPT proof.");
//       }
//     } else {
//       notifyError("No VAPT approval proof available to download.");
//     }
//   };

//   const handleDownloadRenewalHodApprovalProof = () => {
//     const proofData = verificationData?.domainRenewalApprovalProofByHod;
//     if (proofData) {
//       try {
//         // Assuming Base64 PDF - Unchanged logic
//         const binaryString = atob(proofData);
//         const len = binaryString.length;
//         const bytes = new Uint8Array(len);
//         for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
//         const blob = new Blob([bytes], { type: "application/pdf" });
//         const fileUrl = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = fileUrl;
//         link.download = `hod-renewal-approval-${verificationData.domainDetails?.domainName || domainId}.pdf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(fileUrl);
//         notifySuccess("HOD Renewal proof download started.");
//       } catch (error) {
//         console.error("Error processing HOD renewal proof data (Base64 attempt failed):", error);
//         // Fallback attempt - Unchanged logic
//         try {
//           const blob = new Blob([proofData], { type: "application/octet-stream" });
//           const fileUrl = URL.createObjectURL(blob);
//           const link = document.createElement("a");
//           link.href = fileUrl;
//           link.download = `hod-renewal-approval-${verificationData.domainDetails?.domainName || domainId}.dat`;
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           URL.revokeObjectURL(fileUrl);
//           notifySuccess("HOD Renewal proof download started (generic format).");
//         } catch (innerError) {
//           console.error("Error creating Blob for HOD proof:", innerError);
//           notifyError("Failed to download the HOD renewal proof. Data format might be unexpected.");
//         }
//       }
//     } else {
//       notifyError("No HOD renewal approval proof available.");
//     }
//   };

//   // --- Display Helpers (Unchanged Logic) ---
//   const displayData = (data) => data ?? <span className="text-gray-500 italic">N/A</span>; // Use nullish coalescing
//   const displayBool = (data) => data ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-red-600 font-medium">No</span>;

//   // --- Loading State (Unchanged Logic) ---
//   if (isLoading && !verificationData.domainDetails) {
//       return <MainLayout><div className="flex justify-center items-center h-screen"><p className="text-xl">Loading domain details...</p></div></MainLayout>;
//   }

//   // --- Render Logic (Using Section Structure but Unchanged Data/Props) ---
//   return (
//     <MainLayout>
//       <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">

//         {/* Page Header - Structure adjusted, data unchanged */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-4 mb-8">
//           <div>
//               <h2 className="text-3xl font-bold text-gray-800 mb-1">
//                 Domain Verification Task
//               </h2>
//                <p className="text-lg text-gray-600">
//                   Domain: <span className="font-semibold text-blue-700">{displayData(verificationData.domainDetails?.domainName)}</span>
//                </p>
//            </div>
//           <Link
//             to="/dashboard"
//             className="mt-2 md:mt-0 text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//           >
//             ← Back to Dashboard
//           </Link>
//         </div>

//         {/* Status Workflow Section */}
//         <DetailSection title="Current Status Workflow" icon={MdTimeline}>
//              <DomainStatusMap domainStatus={verificationStatus} />
//         </DetailSection>

//         {/* Grid Layout for Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//           {/* Domain Details Section */}
//           <DetailSection title="Domain Details" icon={MdOutlineInfo}>
//             <dl> {/* Using definition list for structure */}
//                 <DefinitionItem term="Name" definition={displayData(verificationData.domainDetails?.domainName)} />
//                 <DefinitionItem term="Description" definition={displayData(verificationData.domainDetails?.description)} />
//                 <DefinitionItem term="Service Type" definition={displayData(verificationData.domainDetails?.serviceType)} />
//                 <DefinitionItem term="Period (Years)" definition={displayData(verificationData.domainDetails?.periodInYears)} />
//                 {reason === "renewal" && (
//                     <DefinitionItem term="Reason for Renewal" definition={displayData(verificationData.reason)} />
//                 )}
//             </dl>
//             {/* Conditional Download Button - Logic Unchanged */}
//             {reason === "renewal" && verificationData.domainRenewalApprovalProofByHod && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                     <button
//                       onClick={handleDownloadRenewalHodApprovalProof} // Handler unchanged
//                       disabled={isLoading} // State unchanged
//                       className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
//                     >
//                       <MdFileDownload className="mr-2" size={18} /> Download HOD Approval Proof
//                     </button>
//                 </div>
//             )}
//           </DetailSection>

//           {/* DRM Information Section */}
//           <DetailSection title="DRM Information" icon={MdPerson}>
//              <dl> {/* Using definition list for structure */}
//                 <DefinitionItem term="Name" definition={<>{displayData(verificationData.drmInfo?.firstName)} {displayData(verificationData.drmInfo?.lastName)}</>} />
//                 <DefinitionItem term="Email" definition={displayData(verificationData.drmInfo?.email)} />
//                 <DefinitionItem term="Telephone" definition={displayData(verificationData.drmInfo?.teleNumber)} />
//                 <DefinitionItem term="Mobile" definition={displayData(verificationData.drmInfo?.mobileNumber)} />
//                 <DefinitionItem term="Group" definition={<>{displayData(verificationData.drmInfo?.groupName)} (ID: {displayData(verificationData.drmInfo?.groupId)})</>} />
//                 <DefinitionItem term="Centre" definition={<>{displayData(verificationData.drmInfo?.centreName)} (ID: {displayData(verificationData.drmInfo?.centreId)})</>} />
//                 <DefinitionItem term="Designation" definition={displayData(verificationData.drmInfo?.designation)} />
//                 <DefinitionItem term="Employee No." definition={displayData(verificationData.drmInfo?.empNo)} />
//              </dl>
//           </DetailSection>

//           {/* ARM Information Section */}
//            <DetailSection title="ARM Information" icon={MdPerson}>
//              <dl> {/* Using definition list for structure */}
//                 <DefinitionItem term="Name" definition={<>{displayData(verificationData.armInfo?.firstName)} {displayData(verificationData.armInfo?.lastName)}</>} />
//                 <DefinitionItem term="Email" definition={displayData(verificationData.armInfo?.email)} />
//                 <DefinitionItem term="Telephone" definition={displayData(verificationData.armInfo?.teleNumber)} />
//                 <DefinitionItem term="Mobile" definition={displayData(verificationData.armInfo?.mobileNumber)} />
//                 <DefinitionItem term="Group" definition={<>{displayData(verificationData.armInfo?.groupName)} (ID: {displayData(verificationData.armInfo?.groupId)})</>} />
//                 <DefinitionItem term="Centre" definition={<>{displayData(verificationData.armInfo?.centreName)} (ID: {displayData(verificationData.armInfo?.centreId)})</>} />
//                 <DefinitionItem term="Designation" definition={displayData(verificationData.armInfo?.designation)} />
//                 <DefinitionItem term="Employee No." definition={displayData(verificationData.armInfo?.empNo)} />
//              </dl>
//            </DetailSection>

//           {/* IP Details Section */}
//           <DetailSection title="IP Details" icon={MdComputer}>
//             <dl> {/* Using definition list for structure */}
//                 <DefinitionItem term="Public IP Address" definition={displayData(verificationData.ipDetails?.publicIpAddress)} />
//                 <DefinitionItem term="IP Issuer" definition={displayData(verificationData.ipDetails?.ipIssuer)} />
//                 <DefinitionItem term="Server Hardening Status" definition={displayBool(verificationData.ipDetails?.serverHardeningStatus)} />
//             </dl>
//           </DetailSection>

//           {/* VAPT Compliance Section */}
//           <DetailSection title="VAPT Compliance" icon={MdOutlineSecurity}>
//             <dl> {/* Using definition list for structure */}
//                 <DefinitionItem term="VAPT Compliant" definition={displayBool(verificationData.vaptCompliance?.vaptCompliant)} />
//                 {/* Corrected field names based on previous working code */}
//                 <DefinitionItem term="Certifying Authority" definition={displayData(verificationData.vaptCompliance?.vaptCertifyingAuthority)} />
//                 <DefinitionItem term="Certificate Expiry Date" definition={displayData(verificationData.vaptCompliance?.vaptCertificateExpiryDate)} />
//                 <DefinitionItem term="Remarks" definition={displayData(verificationData.vaptCompliance?.vaptRemarks)} />
//             </dl>
//              {/* Conditional Download Button - Logic Unchanged */}
//             {verificationData.vaptCompliance?.approvalProofVaptCompliant ? (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                     <button
//                       onClick={handleDownloadApprovalProof} // Handler unchanged
//                       disabled={isLoading} // State unchanged
//                       className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
//                     >
//                       <MdFileDownload className="mr-2" size={18} /> Download VAPT Approval Proof
//                     </button>
//                 </div>
//              ) : (
//                  <p className="text-xs text-gray-500 mt-3 italic">No VAPT approval proof available.</p>
//              )}
//           </DetailSection>

//           {/* Other Compliance Section */}
//           <DetailSection title="Other Compliance" icon={MdAssignmentTurnedIn}>
//             <dl> {/* Using definition list for structure */}
//                 <DefinitionItem term="GIGW Compliance" definition={displayData(verificationData.complianceStatus?.gigwCompliance)} />
//                 <DefinitionItem term="MOU Status" definition={displayData(verificationData.complianceStatus?.mouStatus)} />
//             </dl>
//           </DetailSection>

//         </div> {/* End Grid */}

//         {/* Remarks & Actions Section - Styling adjusted, logic unchanged */}
//         <section className="bg-gradient-to-r from-gray-100 to-blue-100 p-6 rounded-lg shadow-xl border border-gray-300 mt-8">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-300 flex items-center">
//                 <MdComment className="mr-3 text-2xl text-gray-700" /> {verifier ? verifier.toUpperCase() : 'Your'} Remarks & Actions
//             </h3>
//             <textarea
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-inner text-base"
//                 placeholder={`Enter remarks here... ${isApprovalRole ? '(Required if Not Approving)' : '(Optional)'}`}
//                 value={payload.remarks}
//                 // State update logic unchanged
//                 onChange={(e) => setPayload({ ...payload, remarks: e.target.value })}
//                 rows={5}
//                 disabled={isLoading} // State unchanged
//             ></textarea>
//             <div className="mt-6 flex flex-col sm:flex-row gap-4">
//                 {/* Verify Button - Handler and props unchanged */}
//                 <button
//                     onClick={handleVerify}
//                     disabled={isLoading}
//                     title={verifyButtonTooltip}
//                     className={`flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
//                 >
//                     <MdVerified className="mr-2" size={20} />
//                     {isLoading ? 'Processing...' : verifyButtonText}
//                 </button>
//                  {/* Reject Button - Handler and props unchanged */}
//                 <button
//                     onClick={handleSendBackToDrm}
//                     disabled={isLoading || (!payload.remarks && isApprovalRole)} // Logic unchanged
//                     title={rejectButtonTooltip}
//                     className={`flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
//                 >
//                     {isApprovalRole ? <MdCancel className="mr-2" size={20} /> : <MdOutlineArrowBack className="mr-2" size={20} />}
//                     {isLoading ? 'Processing...' : rejectButtonText}
//                 </button>
//             </div>
//             {/* Remarks validation message - Logic unchanged */}
//            {isApprovalRole && !payload.remarks && (
//                <p className="text-sm text-red-600 mt-3 italic font-medium">Remarks are required to 'Not Approve'.</p>
//            )}
//         </section>

//       </div> {/* End Page Container */}
//     </MainLayout>
//   );
// }

// export default GenericDomainDetailPage;





import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { API_BASE_URL } from "../config/env.config";
import { notifyError, notifySuccess } from "../utils/toastUtils";
import { getUserRole } from "../utils/helper";

// --- Icons (Unchanged) ---
import {
  MdOutlineInfo,
  MdTimeline,
  MdVerified,
  MdFileDownload,
  MdPerson,
  MdComputer,
  MdOutlineSecurity,
  MdComment,
  MdOutlineArrowBack,
  MdCancel,
  MdAssignmentTurnedIn
} from "react-icons/md";

// --- Component for status map (Unchanged) ---
import DomainStatusMap from "../components/domain-detail/DomainStatusMap";

// --- Map your verifier key to the next workflow status (Unchanged) ---
const nextStatus = {
  arm: "ARM Forwarded",
  hod: "HOD Verified",
  ed: "ED Approved",
  netops: "NetOps Verified",
  webmaster: "Webmaster Verified",
  hpc: "HPC Recommended",
  purchaser: "Purchased",
  active: "Active",
  // Add other statuses as needed
};

// --- Role-based button text generator (Unchanged) ---
// Generates the *detailed* verification text for non-approval roles
const roleBasedVerificationButtonText = (role) => {
  switch (role?.toUpperCase()) {
    case "DRM":
      return "Verify and Forward to ARM";
    case "ARM":
      return "Consent"; // Adjusted based on typical flow
    // Add other non-approval role cases if needed
    default:
      return "Verify Details"; // Fallback detailed text
  }
};

// --- Helper: Section Component for visual structure ONLY ---
const DetailSection = ({ title, icon: Icon, children }) => (
    <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200 flex items-center">
            {Icon && <Icon className="mr-3 text-2xl text-blue-600" />}
            {title}
        </h3>
        {/* Apply consistent spacing inside the section content */}
        <div className="space-y-4 text-sm">
            {children}
        </div>
    </section>
);

// --- Helper: Definition List Item for visual structure ONLY ---
const DefinitionItem = ({ term, definition }) => (
    definition || definition === false || definition === 0 ? ( // Render if definition exists or is explicitly falsy (like boolean No)
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-baseline mb-1"> {/* Grid layout for term/definition */}
            <dt className="font-semibold text-gray-600 sm:col-span-1">{term}:</dt>
            <dd className="text-gray-800 sm:col-span-2">{definition}</dd>
        </div>
    ) : null
);


function GenericDomainDetailPage({ verifier, reason }) {
  // --- State Hooks (Unchanged Logic) ---
  const authToken = useRecoilValue(authTokenState);
  const { domainId } = useParams();
  const navigate = useNavigate();
  const role = getUserRole();

  const [verificationData, setVerificationData] = useState({});
  const [verificationStatus, setVerificationStatus] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [payload, setPayload] = useState({
    domainNameId: domainId,
    remarks: "",
  });

  // --- Role-based Logic (Unchanged) ---
  const approvalRoles = ["HOD", "ED", "NETOPS", "WEBMASTER", "HODHPC"];
  const isApprovalRole = approvalRoles.includes(role?.toUpperCase());


  // --- Button Text & Tooltip Logic (MODIFIED as per last request) ---

  // 1. Determine the DETAILED action text (will be used for tooltips/hover)
  const detailedVerifyText = isApprovalRole
    ? "Approve the request and proceed" // Descriptive text for approval role hover
    : roleBasedVerificationButtonText(role); // Original detailed text for other roles hover/button

  const detailedRejectText = isApprovalRole
    ? "Reject the request and send it back to the DRM for correction" // Descriptive text for approval role hover
    : "Send the request back to the DRM for review or correction"; // Original detailed text for other roles hover/button

  // 2. Determine the VISIBLE button text
  const visibleVerifyText = isApprovalRole ? "Approved" : detailedVerifyText; // Show "Approved" for approval roles on button
  const visibleRejectText = isApprovalRole ? "Not Approved" : detailedRejectText; // Show "Not Approved" for approval roles on button


  // --- useEffect for Data Fetching (Unchanged Logic) ---
  useEffect(() => {
    const fetchDomainDetails = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching details with token:', authToken ? 'Token Present' : 'Token MISSING');
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
        setVerificationData(response.data || {});
        setVerificationStatus(response.data?.status || "Unknown");
        setPayload(prev => ({ ...prev, domainNameId: domainId }));
      } catch (error) {
        console.error("Error fetching domain details:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
             notifyError("Authentication error fetching details. Please log in again.");
             // navigate('/login'); // Optional: redirect
        } else {
             notifyError("Failed to fetch domain details.");
        }
        setVerificationData({});
        setVerificationStatus("Error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authToken && domainId) {
      fetchDomainDetails();
    } else if (!authToken) {
       console.log("Auth token not available yet for fetch.");
       setIsLoading(false);
       notifyError("Authentication token is missing. Cannot fetch details.");
    } else if (!domainId) {
        console.log("Domain ID is missing.");
        setIsLoading(false);
        notifyError("Domain ID is missing from the URL.");
    }

  }, [authToken, domainId, navigate]); // navigate added for potential redirect in error handling


  // --- handleVerify Action (Unchanged Logic) ---
  const handleVerify = async () => {
    setIsLoading(true);
    try {
      console.log('Verifying with token:', authToken ? 'Token Present' : 'Token MISSING');
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
      setVerificationData(response.data || verificationData);
      setVerificationStatus(response.data?.status || "Verified");
      notifySuccess(`Successfully ${isApprovalRole ? 'Approved' : 'Verified'}.`);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error("Error verifying domain:", error);
       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            notifyError("Authentication error during verification. Please log in again.");
       } else {
           notifyError(`Error occurred while ${isApprovalRole ? 'approving' : 'verifying'}. Please try again.`);
       }
    } finally {
      setIsLoading(false);
    }
  };

  // --- handleSendBackToDrm Action (Unchanged Logic) ---
  const handleSendBackToDrm = async () => {
    if (!payload.remarks && isApprovalRole) {
        notifyError(`Please provide remarks before clicking '${visibleRejectText}'.`); // Use visible text in error
        return;
    }
    setIsLoading(true);
    try {
       console.log('Rejecting with token:', authToken ? 'Token Present' : 'Token MISSING');
      const response = await axios.post(
        `${API_BASE_URL}/workflow/${verifier}/rejects`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Send back/Reject API Response:", response.data);
      setVerificationData(response.data || verificationData);
      setVerificationStatus(response.data?.status || "Rejected");
      notifySuccess(`Successfully sent back to DRM ${isApprovalRole ? 'as Not Approved' : 'for review'}.`);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error("Error sending back/rejecting:", error);
       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
           notifyError("Authentication error during rejection. Please log in again.");
       } else {
           notifyError(`Error occurred while ${isApprovalRole ? 'rejecting' : 'sending back'}. Please try again.`);
       }
    } finally {
      setIsLoading(false);
    }
  };

  // --- Download Handlers (Unchanged Logic) ---
  const handleDownloadApprovalProof = () => {
    const base64 = verificationData.vaptCompliance?.approvalProofVaptCompliant;
    if (base64) {
      try {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `vapt-approval-proof-${verificationData.domainDetails?.domainName || domainId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        notifySuccess("VAPT proof download started.");
      } catch (error) {
        console.error("Error processing VAPT Base64 string:", error);
        notifyError("Failed to decode or download the VAPT proof.");
      }
    } else {
      notifyError("No VAPT approval proof available to download.");
    }
  };

  const handleDownloadRenewalHodApprovalProof = () => {
    const proofData = verificationData?.domainRenewalApprovalProofByHod;
    if (proofData) {
      try {
        // Assuming Base64 PDF
        const binaryString = atob(proofData);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
        const blob = new Blob([bytes], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `hod-renewal-approval-${verificationData.domainDetails?.domainName || domainId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileUrl);
        notifySuccess("HOD Renewal proof download started.");
      } catch (error) {
        console.error("Error processing HOD renewal proof data (Base64 attempt failed):", error);
        // Fallback attempt
        try {
          const blob = new Blob([proofData], { type: "application/octet-stream" });
          const fileUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = `hod-renewal-approval-${verificationData.domainDetails?.domainName || domainId}.dat`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(fileUrl);
          notifySuccess("HOD Renewal proof download started (generic format).");
        } catch (innerError) {
          console.error("Error creating Blob for HOD proof:", innerError);
          notifyError("Failed to download the HOD renewal proof. Data format might be unexpected.");
        }
      }
    } else {
      notifyError("No HOD renewal approval proof available.");
    }
  };

  // --- Display Helpers (Unchanged Logic) ---
  const displayData = (data) => data ?? <span className="text-gray-500 italic">N/A</span>;
  const displayBool = (data) => data ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-red-600 font-medium">No</span>;

  // --- Loading State (Unchanged Logic) ---
  if (isLoading && !verificationData.domainDetails) {
      return <MainLayout><div className="flex justify-center items-center h-screen"><p className="text-xl">Loading domain details...</p></div></MainLayout>;
  }

  // --- Render Logic ---
  return (
    <MainLayout>
      <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-4 mb-8">
          <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                Domain Verification Task
              </h2>
               <p className="text-lg text-gray-600">
                  Domain: <span className="font-semibold text-blue-700">{displayData(verificationData.domainDetails?.domainName)}</span>
               </p>
           </div>
          <Link
            to="/dashboard"
            className="mt-2 md:mt-0 text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Status Workflow Section */}
         <DetailSection title="Current Status Workflow" icon={MdTimeline}>
              <DomainStatusMap domainStatus={verificationStatus} />
         </DetailSection>

        {/* Grid Layout for Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Domain Details Section */}
          <DetailSection title="Domain Details" icon={MdOutlineInfo}>
            <dl>
                <DefinitionItem term="Name" definition={displayData(verificationData.domainDetails?.domainName)} />
                <DefinitionItem term="Description" definition={displayData(verificationData.domainDetails?.description)} />
                <DefinitionItem term="Service Type" definition={displayData(verificationData.domainDetails?.serviceType)} />
                <DefinitionItem term="Period (Years)" definition={displayData(verificationData.domainDetails?.periodInYears)} />
                {reason === "renewal" && (
                    <DefinitionItem term="Reason for Renewal" definition={displayData(verificationData.reason)} />
                )}
            </dl>
            {reason === "renewal" && verificationData.domainRenewalApprovalProofByHod && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleDownloadRenewalHodApprovalProof}
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
                    >
                      <MdFileDownload className="mr-2" size={18} /> Download HOD Approval Proof
                    </button>
                </div>
            )}
          </DetailSection>

          {/* DRM Information Section */}
          <DetailSection title="DRM Information" icon={MdPerson}>
             <dl>
                <DefinitionItem term="Name" definition={<>{displayData(verificationData.drmInfo?.firstName)} {displayData(verificationData.drmInfo?.lastName)}</>} />
                <DefinitionItem term="Email" definition={displayData(verificationData.drmInfo?.email)} />
                <DefinitionItem term="Telephone" definition={displayData(verificationData.drmInfo?.teleNumber)} />
                <DefinitionItem term="Mobile" definition={displayData(verificationData.drmInfo?.mobileNumber)} />
                <DefinitionItem term="Group" definition={<>{displayData(verificationData.drmInfo?.groupName)} (ID: {displayData(verificationData.drmInfo?.groupId)})</>} />
                <DefinitionItem term="Centre" definition={<>{displayData(verificationData.drmInfo?.centreName)} (ID: {displayData(verificationData.drmInfo?.centreId)})</>} />
                <DefinitionItem term="Designation" definition={displayData(verificationData.drmInfo?.designation)} />
                <DefinitionItem term="Employee No." definition={displayData(verificationData.drmInfo?.empNo)} />
             </dl>
          </DetailSection>

          {/* ARM Information Section */}
           <DetailSection title="ARM Information" icon={MdPerson}>
             <dl>
                <DefinitionItem term="Name" definition={<>{displayData(verificationData.armInfo?.firstName)} {displayData(verificationData.armInfo?.lastName)}</>} />
                <DefinitionItem term="Email" definition={displayData(verificationData.armInfo?.email)} />
                <DefinitionItem term="Telephone" definition={displayData(verificationData.armInfo?.teleNumber)} />
                <DefinitionItem term="Mobile" definition={displayData(verificationData.armInfo?.mobileNumber)} />
                <DefinitionItem term="Group" definition={<>{displayData(verificationData.armInfo?.groupName)} (ID: {displayData(verificationData.armInfo?.groupId)})</>} />
                <DefinitionItem term="Centre" definition={<>{displayData(verificationData.armInfo?.centreName)} (ID: {displayData(verificationData.armInfo?.centreId)})</>} />
                <DefinitionItem term="Designation" definition={displayData(verificationData.armInfo?.designation)} />
                <DefinitionItem term="Employee No." definition={displayData(verificationData.armInfo?.empNo)} />
             </dl>
           </DetailSection>

          {/* IP Details Section */}
          <DetailSection title="IP Details" icon={MdComputer}>
            <dl>
                <DefinitionItem term="Public IP Address" definition={displayData(verificationData.ipDetails?.publicIpAddress)} />
                <DefinitionItem term="IP Issuer" definition={displayData(verificationData.ipDetails?.ipIssuer)} />
                <DefinitionItem term="Server Hardening Status" definition={displayBool(verificationData.ipDetails?.serverHardeningStatus)} />
            </dl>
          </DetailSection>

          {/* VAPT Compliance Section */}
          <DetailSection title="VAPT Compliance" icon={MdOutlineSecurity}>
            <dl>
                <DefinitionItem term="VAPT Compliant" definition={displayBool(verificationData.vaptCompliance?.vaptCompliant)} />
                <DefinitionItem term="Certifying Authority" definition={displayData(verificationData.vaptCompliance?.vaptCertifyingAuthority)} />
                <DefinitionItem term="Certificate Expiry Date" definition={displayData(verificationData.vaptCompliance?.vaptCertificateExpiryDate)} />
                <DefinitionItem term="Remarks" definition={displayData(verificationData.vaptCompliance?.vaptRemarks)} />
            </dl>
            {verificationData.vaptCompliance?.approvalProofVaptCompliant ? (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleDownloadApprovalProof}
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
                    >
                      <MdFileDownload className="mr-2" size={18} /> Download VAPT Approval Proof
                    </button>
                </div>
             ) : (
                 <p className="text-xs text-gray-500 mt-3 italic">No VAPT approval proof available.</p>
             )}
          </DetailSection>

          {/* Other Compliance Section */}
          <DetailSection title="Other Compliance" icon={MdAssignmentTurnedIn}>
            <dl>
                <DefinitionItem term="GIGW Compliance" definition={displayData(verificationData.complianceStatus?.gigwCompliance)} />
                <DefinitionItem term="MOU Status" definition={displayData(verificationData.complianceStatus?.mouStatus)} />
            </dl>
          </DetailSection>

        </div> {/* End Grid */}

        {/* Remarks & Actions Section */}
        <section className="bg-gradient-to-r from-gray-100 to-blue-100 p-6 rounded-lg shadow-xl border border-gray-300 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-300 flex items-center">
                <MdComment className="mr-3 text-2xl text-gray-700" /> {verifier ? verifier.toUpperCase() : 'Your'} Remarks & Actions
            </h3>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-inner text-base"
                placeholder={`Enter remarks here... ${isApprovalRole ? '(Required if Not Approving)' : '(Optional)'}`}
                value={payload.remarks}
                onChange={(e) => setPayload({ ...payload, remarks: e.target.value })}
                rows={5}
                disabled={isLoading}
            ></textarea>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {/* Verify / Approve Button */}
                <button
                    onClick={handleVerify}
                    disabled={isLoading}
                    // Set title attribute for hover text (using detailed description)
                    title={detailedVerifyText}
                    className={`flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
                >
                    <MdVerified className="mr-2" size={20} />
                    {/* Display the simplified text for approval roles, or detailed for others */}
                    {isLoading ? 'Processing...' : visibleVerifyText}
                </button>

                 {/* Reject / Not Approve Button */}
                <button
                    onClick={handleSendBackToDrm}
                    disabled={isLoading || (!payload.remarks && isApprovalRole)}
                     // Set title attribute for hover text (using detailed description)
                    title={detailedRejectText}
                    className={`flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg text-base font-medium disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
                >
                    {/* Use correct icon based on role */}
                    {isApprovalRole ? <MdCancel className="mr-2" size={20} /> : <MdOutlineArrowBack className="mr-2" size={20} />}
                     {/* Display the simplified text for approval roles, or detailed for others */}
                    {isLoading ? 'Processing...' : visibleRejectText}
                </button>
            </div>
            {/* Remarks validation message */}
           {isApprovalRole && !payload.remarks && (
               <p className="text-sm text-red-600 mt-3 italic font-medium">Remarks are required to 'Not Approve'.</p>
           )}
        </section>

      </div> {/* End Page Container */}
    </MainLayout>
  );
}

export default GenericDomainDetailPage;






