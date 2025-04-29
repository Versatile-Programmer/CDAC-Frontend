
// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import axios from "axios";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";
// import { API_BASE_URL } from "../config/env.config";
// import fetchUser from "../utils/fetchUser";
// import DomainStatusMap from "../components/domain-detail/DomainStatusMap";

// // --- Icons ---
// import {
//   MdOutlineInfo,
//   MdTimeline,
//   // MdFileDownload, // Keep if needed later for proofs
//   MdPerson,
//   MdComputer,
//   MdOutlineSecurity,
//   MdAssignmentTurnedIn,
//   // MdBusiness, // Implicitly used via MdPerson sections
//   // MdBadge, // Implicitly used via MdPerson sections
//   MdAutorenew, // For Renew Action
//   MdSwapHoriz, // For Transfer Action
//   MdDeleteOutline, // For Delete Action
// } from "react-icons/md";

// // --- Helper: Section Component ---
// const DetailSection = ({ title, icon: Icon, children, className = "" }) => (
//     <section className={`bg-white p-6 rounded-lg shadow-lg border border-gray-200 ${className}`}>
//         <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-200 flex items-center">
//             {Icon && <Icon className="mr-3 text-2xl text-blue-600" />}
//             {title}
//         </h3>
//         <div className="space-y-4 text-sm">
//             {children}
//         </div>
//     </section>
// );

// // --- Helper: Definition List Item ---
// const DefinitionItem = ({ term, definition }) => (
//     // Render only if definition has a meaningful value (incl. false or 0)
//     (definition !== null && definition !== undefined && definition !== '') ? (
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-baseline mb-2">
//             <dt className="font-semibold text-gray-600 sm:col-span-1 truncate">{term}:</dt>
//             <dd className="text-gray-800 sm:col-span-2 break-words">{definition}</dd>
//         </div>
//     ) : null
// );

// // --- Helper: Display Data ---
// const displayData = (data) => data ?? <span className="text-gray-500 italic">N/A</span>;
// const displayBool = (data) => data ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-red-600 font-medium">No</span>;


// /**
//  * A read-only page for stakeholders to view complete domain details.
//  */
// export default function DomainDetailViewPage() {
//   const { domainId } = useParams();
//   const authToken = useRecoilValue(authTokenState);
//   const [domainData, setDomainData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const user = fetchUser();

//   useEffect(() => {
//     // Validate inputs early
//     if (!domainId) {
//         setIsLoading(false);
//         setError("Domain ID is missing from the URL.");
//         return;
//     }
//     if (!authToken) {
//       setIsLoading(false);
//       setError("Authentication token is missing. Please log in.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null); // Reset error before fetch

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/domain/domain-detail/${domainId}`,
//           {
//             headers: { Authorization: `Bearer ${authToken}` },
//           }
//         );
//         if (response.data) {
//              setDomainData(response.data);
//         } else {
//             // Handle cases where API returns success but no data
//             setError("Domain details not found or empty response received.");
//             setDomainData(null);
//         }
//       } catch (err) {
//         console.error("Error fetching domain details", err);
//         if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//              setError("Authentication error. Please log in again.");
//         } else if (err.response && err.response.status === 404) {
//             setError(`Domain with ID ${domainId} not found.`);
//         } else {
//             setError("Failed to load domain details. Please try again later.");
//         }
//         setDomainData(null); // Clear data on error
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [authToken, domainId]); // Dependencies are correct

//   // --- Determine Available Actions ---
//   const actions = [];
//   // Ensure domainData exists and check user role (case-sensitive check recommended)
//   if (domainData && user && (user.role === "DRM" || user.role === "ARM")) {
//     const status = domainData?.status; // Cache status for readability
//     const isActive = status === "Active";
//     const isRenewalRequested = status === "Renewal Requested";
//     const isPendingVerification = status === "Pending Verification";

//     const canRenew = isActive || isRenewalRequested;
//     const canTransfer = isActive;
//     // Adjust delete condition based on precise business rules
//     const canDelete = isActive || isPendingVerification;

//     if (canRenew) {
//       actions.push({
//         title: "Renew Domain",
//         IconComponent: MdAutorenew,
//         linkTo: `/domains/renew/${domainId}`, // Use path param
//       });
//     }
//     if (canTransfer) {
//       actions.push({
//         title: "Transfer Domain",
//         IconComponent: MdSwapHoriz,
//         linkTo: `/domains/transfer/${domainId}`, // Use path param
//       });
//     }
//     if (canDelete) {
//       actions.push({
//         title: "Delete Domain",
//         IconComponent: MdDeleteOutline,
//         linkTo: `/domains/delete/${domainId}`, // Use path param
//       });
//     }
//   }

//   // --- Render Loading State ---
//   if (isLoading) {
//     return (
//       <MainLayout>
//         <div className="flex justify-center items-center h-[calc(100vh-200px)]"> {/* Centered vertically */}
//              <p className="text-xl font-medium text-gray-600 animate-pulse">Loading domain details...</p>
//         </div>
//       </MainLayout>
//     );
//   }

//   // --- Render Error State ---
//     if (error) {
//     return (
//       <MainLayout>
//         <div className="p-10 max-w-lg mx-auto my-10 text-center text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-md">
//             <p className="text-xl font-semibold mb-3">Error Loading Details</p>
//             <p className="mb-4">{error}</p>
//              <Link to="/dashboard" className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
//                 Go to Dashboard
//             </Link>
//         </div>
//       </MainLayout>
//     );
//   }

//   // --- Render No Data State (after fetch attempt) ---
//   if (!domainData) {
//      return (
//       <MainLayout>
//         <div className="p-10 max-w-lg mx-auto my-10 text-center text-gray-600 bg-gray-50 border rounded-lg shadow">
//              <p className="text-xl font-medium mb-3">Domain Not Found</p>
//              <p className="mb-4">The requested domain details could not be retrieved.</p>
//              <Link to="/domains/view" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
//                 Back to Domain List
//             </Link>
//         </div>
//       </MainLayout>
//     );
//   }

//   // --- Render Main Content ---
//   return (
//     <MainLayout>
//       <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-4 mb-8">
//           <div>
//               <h2 className="text-3xl font-bold text-gray-800 mb-1">
//                 Domain Details
//               </h2>
//                <p className="text-lg text-gray-600">
//                   <span className="font-semibold text-blue-700">{displayData(domainData.domainDetails?.domainName)}</span>
//                </p>
//            </div>
//           <Link
//             to="/domains/view" // Link back to the list page
//             className="mt-2 md:mt-0 text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors"
//           >
//             ← Back to Domain List
//           </Link>
//         </div>

//          {/* Status Map Section */}
//          <DetailSection title="Current Status Workflow" icon={MdTimeline} className="mb-8">
//              <DomainStatusMap domainStatus={domainData.status} />
//          </DetailSection>


//         {/* Grid Layout for Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//            {/* Domain Details Section */}
//             <DetailSection title="Domain Information" icon={MdOutlineInfo}>
//                 <dl>
//                     <DefinitionItem term="Name" definition={displayData(domainData.domainDetails?.domainName)} />
//                     <DefinitionItem term="Description" definition={displayData(domainData.domainDetails?.description)} />
//                     <DefinitionItem term="Service Type" definition={displayData(domainData.domainDetails?.serviceType)} />
//                     <DefinitionItem term="Registration Period" definition={domainData.domainDetails?.periodInYears ? `${domainData.domainDetails.periodInYears} Year(s)` : displayData(null)} />
//                     {/* You can add more relevant fields like Registration Date, Expiry Date if available in domainData.domainDetails */}
//                     {/* <DefinitionItem term="Expiry Date" definition={displayData(domainData.domainDetails?.expiryDate)} /> */}
//                 </dl>
//             </DetailSection>

//             {/* IP Details Section */}
//             <DetailSection title="Technical Details" icon={MdComputer}>
//                 <dl>
//                     <DefinitionItem term="Public IP Address" definition={displayData(domainData.ipDetails?.publicIpAddress)} />
//                     <DefinitionItem term="IP Issuer" definition={displayData(domainData.ipDetails?.ipIssuer)} />
//                     <DefinitionItem term="Server Hardening" definition={displayBool(domainData.ipDetails?.serverHardeningStatus)} />
//                 </dl>
//             </DetailSection>

//             {/* DRM Information Section */}
//             <DetailSection title="DRM Information" icon={MdPerson}>
//                 <dl>
//                     <DefinitionItem term="Name" definition={<>{displayData(domainData.drmInfo?.firstName)} {displayData(domainData.drmInfo?.lastName)}</>} />
//                     <DefinitionItem term="Email" definition={displayData(domainData.drmInfo?.email)} />
//                     <DefinitionItem term="Telephone" definition={displayData(domainData.drmInfo?.teleNumber)} />
//                     <DefinitionItem term="Mobile" definition={displayData(domainData.drmInfo?.mobileNumber)} />
//                     <DefinitionItem term="Group" definition={<>{displayData(domainData.drmInfo?.groupName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.drmInfo?.groupId)})</span></>} />
//                     <DefinitionItem term="Centre" definition={<>{displayData(domainData.drmInfo?.centreName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.drmInfo?.centreId)})</span></>} />
//                     <DefinitionItem term="Designation" definition={displayData(domainData.drmInfo?.designation)} />
//                     <DefinitionItem term="Employee No." definition={displayData(domainData.drmInfo?.empNo)} />
//                 </dl>
//             </DetailSection>

//             {/* ARM Information Section */}
//             <DetailSection title="ARM Information" icon={MdPerson}>
//                 <dl>
//                     <DefinitionItem term="Name" definition={<>{displayData(domainData.armInfo?.firstName)} {displayData(domainData.armInfo?.lastName)}</>} />
//                     <DefinitionItem term="Email" definition={displayData(domainData.armInfo?.email)} />
//                     <DefinitionItem term="Telephone" definition={displayData(domainData.armInfo?.teleNumber)} />
//                     <DefinitionItem term="Mobile" definition={displayData(domainData.armInfo?.mobileNumber)} />
//                     <DefinitionItem term="Group" definition={<>{displayData(domainData.armInfo?.groupName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.armInfo?.groupId)})</span></>} />
//                     <DefinitionItem term="Centre" definition={<>{displayData(domainData.armInfo?.centreName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.armInfo?.centreId)})</span></>} />
//                     <DefinitionItem term="Designation" definition={displayData(domainData.armInfo?.designation)} />
//                     <DefinitionItem term="Employee No." definition={displayData(domainData.armInfo?.empNo)} />
//                 </dl>
//             </DetailSection>

//             {/* VAPT Compliance Section */}
//             <DetailSection title="VAPT Compliance" icon={MdOutlineSecurity}>
//                 <dl>
//                     <DefinitionItem term="VAPT Compliant" definition={displayBool(domainData.vaptCompliance?.vaptCompliant)} />
//                     <DefinitionItem term="Certifying Authority" definition={displayData(domainData.vaptCompliance?.vaptCertifyingAuthority)} />
//                     <DefinitionItem term="Certificate Expiry Date" definition={displayData(domainData.vaptCompliance?.vaptCertificateExpiryDate)} />
//                     <DefinitionItem term="Remarks" definition={displayData(domainData.vaptCompliance?.vaptRemarks)} />
//                      {/* Placeholder for VAPT proof download button */}
//                     {domainData.vaptCompliance?.approvalProofVaptCompliant && (
//                          <div className="mt-4 pt-4 border-t border-gray-200">
//                              {/* If needed, add download logic here similar to the other component */}
//                              {/* <button onClick={handleDownloadVaptProof} ...>Download VAPT Proof</button> */}
//                              <p className="text-xs text-gray-600 italic">VAPT approval proof is available (download button not implemented in this view).</p>
//                          </div>
//                     )}
//                 </dl>
//             </DetailSection>

//             {/* Other Compliance Section */}
//             <DetailSection title="Other Compliance" icon={MdAssignmentTurnedIn}>
//                 <dl>
//                     <DefinitionItem term="GIGW Compliance" definition={displayData(domainData.complianceStatus?.gigwCompliance)} />
//                     <DefinitionItem term="MOU Status" definition={displayData(domainData.complianceStatus?.mouStatus)} />
//                 </dl>
//             </DetailSection>

//         </div> {/* End Grid */}


//         {/* Actions Section - Uses styled Link, NO ActivityCard assumption */}
//         {actions.length > 0 && (
//           <section className="mt-10 pt-6 border-t border-gray-300">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//               Available Actions
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {actions.map((action) => (
//                 <Link
//                   key={action.title}
//                   to={action.linkTo}
//                   className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-center"
//                 >
//                   {/* Icon */}
//                   <action.IconComponent className="w-10 h-10 mb-3 text-blue-600 group-hover:text-blue-700 transition-colors" />
//                   {/* Title */}
//                   <span className="text-base font-medium text-gray-700 group-hover:text-blue-800 transition-colors">{action.title}</span>
//                 </Link>
//               ))}
//             </div>
//           </section>
//         )}

//       </div> {/* End Page Container */}
//     </MainLayout>
//   );
// }




import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import { API_BASE_URL } from "../config/env.config";
import fetchUser from "../utils/fetchUser";
import DomainStatusMap from "../components/domain-detail/DomainStatusMap";
import { notifyError, notifySuccess } from "../utils/toastUtils"; // Import toast utils

// --- Icons ---
import {
  MdOutlineInfo,
  MdTimeline,
  MdFileDownload, // Added for download buttons
  MdPerson,
  MdComputer,
  MdOutlineSecurity,
  MdAssignmentTurnedIn,
  MdAutorenew, // For Renew Action
  MdSwapHoriz, // For Transfer Action
  MdDeleteOutline, // For Delete Action
} from "react-icons/md";

// --- Helper: Section Component ---
const DetailSection = ({ title, icon: Icon, children, className = "" }) => (
    <section className={`bg-white p-6 rounded-lg shadow-lg border border-gray-200 ${className}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-3 border-b border-gray-200 flex items-center">
            {Icon && <Icon className="mr-3 text-2xl text-blue-600" />}
            {title}
        </h3>
        <div className="space-y-4 text-sm">
            {children}
        </div>
    </section>
);

// --- Helper: Definition List Item ---
const DefinitionItem = ({ term, definition }) => (
    (definition !== null && definition !== undefined && definition !== '') ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-baseline mb-2">
            <dt className="font-semibold text-gray-600 sm:col-span-1 truncate">{term}:</dt>
            <dd className="text-gray-800 sm:col-span-2 break-words">{definition}</dd>
        </div>
    ) : null
);

// --- Helper: Display Data ---
const displayData = (data) => data ?? <span className="text-gray-500 italic">N/A</span>;
const displayBool = (data) => data ? <span className="text-green-600 font-medium">Yes</span> : <span className="text-red-600 font-medium">No</span>;


/**
 * A read-only page for stakeholders to view complete domain details.
 */
export default function DomainDetailViewPage() {
  const { domainId } = useParams();
  const authToken = useRecoilValue(authTokenState);
  const [domainData, setDomainData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = fetchUser();

  useEffect(() => {
    // Validate inputs early
    if (!domainId) {
        setIsLoading(false);
        setError("Domain ID is missing from the URL.");
        return;
    }
    if (!authToken) {
      setIsLoading(false);
      setError("Authentication token is missing. Please log in.");
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error before fetch

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/domain/domain-detail/${domainId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        if (response.data) {
             setDomainData(response.data);
        } else {
            setError("Domain details not found or empty response received.");
            setDomainData(null);
        }
      } catch (err) {
        console.error("Error fetching domain details", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
             setError("Authentication error. Please log in again.");
        } else if (err.response && err.response.status === 404) {
            setError(`Domain with ID ${domainId} not found.`);
        } else {
            setError("Failed to load domain details. Please try again later.");
        }
        setDomainData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [authToken, domainId]);

  // --- Determine Available Actions ---
  const actions = [];
  if (domainData && user && (user.role === "DRM" || user.role === "ARM")) {
    const status = domainData?.status;
    const isActive = status === "Active";
    const isRenewalRequested = status === "Renewal Requested";
    const isPendingVerification = status === "Pending Verification";

    const canRenew = isActive || isRenewalRequested;
    const canTransfer = isActive;
    const canDelete = isActive || isPendingVerification;

    if (canRenew) {
      actions.push({
        title: "Renew Domain", IconComponent: MdAutorenew, linkTo: `/domains/renew/${domainId}`,
      });
    }
    if (canTransfer) {
      actions.push({
        title: "Transfer Domain", IconComponent: MdSwapHoriz, linkTo: `/domains/transfer/${domainId}`,
      });
    }
    if (canDelete) {
      actions.push({
        title: "Delete Domain", IconComponent: MdDeleteOutline, linkTo: `/domains/delete/${domainId}`,
      });
    }
  }

  // --- Download Handlers (Adapted from GenericDomainDetailPage) ---
  const handleDownloadVaptProof = () => {
    const base64 = domainData?.vaptCompliance?.approvalProofVaptCompliant; // Access proof from domainData
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
        link.download = `vapt-approval-proof-${domainData.domainDetails?.domainName || domainId}.pdf`;
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

  const handleDownloadRenewalProof = () => {
    const proofData = domainData?.domainRenewalApprovalProofByHod; // Access proof from domainData
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
        link.download = `hod-renewal-approval-${domainData.domainDetails?.domainName || domainId}.pdf`;
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
          link.download = `hod-renewal-approval-${domainData.domainDetails?.domainName || domainId}.dat`;
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


  // --- Render Loading State ---
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
             <p className="text-xl font-medium text-gray-600 animate-pulse">Loading domain details...</p>
        </div>
      </MainLayout>
    );
  }

  // --- Render Error State ---
    if (error) {
    return (
      <MainLayout>
        <div className="p-10 max-w-lg mx-auto my-10 text-center text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-md">
            <p className="text-xl font-semibold mb-3">Error Loading Details</p>
            <p className="mb-4">{error}</p>
             <Link to="/dashboard" className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Go to Dashboard
            </Link>
        </div>
      </MainLayout>
    );
  }

  // --- Render No Data State ---
  if (!domainData) {
     return (
      <MainLayout>
        <div className="p-10 max-w-lg mx-auto my-10 text-center text-gray-600 bg-gray-50 border rounded-lg shadow">
             <p className="text-xl font-medium mb-3">Domain Not Found</p>
             <p className="mb-4">The requested domain details could not be retrieved.</p>
             <Link to="/domains/view" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Back to Domain List
            </Link>
        </div>
      </MainLayout>
    );
  }

  // --- Render Main Content ---
  return (
    <MainLayout>
      <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-4 mb-8">
          <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                Domain Details
              </h2>
               <p className="text-lg text-gray-600">
                  <span className="font-semibold text-blue-700">{displayData(domainData.domainDetails?.domainName)}</span>
               </p>
           </div>
          <Link
            to="/domains/view"
            className="mt-2 md:mt-0 text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            ← Back to Domain List
          </Link>
        </div>

         {/* Status Map Section */}
         <DetailSection title="Current Status Workflow" icon={MdTimeline} className="mb-8">
             <DomainStatusMap domainStatus={domainData.status} />
         </DetailSection>


        {/* Grid Layout for Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

           {/* Domain Details Section */}
            <DetailSection title="Domain Information" icon={MdOutlineInfo}>
                <dl>
                    <DefinitionItem term="Name" definition={displayData(domainData.domainDetails?.domainName)} />
                    <DefinitionItem term="Description" definition={displayData(domainData.domainDetails?.description)} />
                    <DefinitionItem term="Service Type" definition={displayData(domainData.domainDetails?.serviceType)} />
                    <DefinitionItem term="Registration Period" definition={domainData.domainDetails?.periodInYears ? `${domainData.domainDetails.periodInYears} Year(s)` : displayData(null)} />
                    {/* Conditionally add Renewal Reason if present */}
                    {domainData.reason && (
                         <DefinitionItem term="Reason for Renewal" definition={displayData(domainData.reason)} />
                    )}
                </dl>
                 {/* Conditionally add HOD Renewal Proof Download Button */}
                {domainData.domainRenewalApprovalProofByHod && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                        onClick={handleDownloadRenewalProof}
                        // disabled={isLoading} // isLoading applies to page fetch, not button state here
                        className="flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
                        >
                        <MdFileDownload className="mr-2" size={18} /> Download HOD Approval Proof
                        </button>
                    </div>
                )}
            </DetailSection>

            {/* IP Details Section */}
            <DetailSection title="Technical Details" icon={MdComputer}>
                <dl>
                    <DefinitionItem term="Public IP Address" definition={displayData(domainData.ipDetails?.publicIpAddress)} />
                    <DefinitionItem term="IP Issuer" definition={displayData(domainData.ipDetails?.ipIssuer)} />
                    <DefinitionItem term="Server Hardening" definition={displayBool(domainData.ipDetails?.serverHardeningStatus)} />
                </dl>
            </DetailSection>

            {/* DRM Information Section */}
            <DetailSection title="DRM Information" icon={MdPerson}>
                <dl>
                    <DefinitionItem term="Name" definition={<>{displayData(domainData.drmInfo?.firstName)} {displayData(domainData.drmInfo?.lastName)}</>} />
                    <DefinitionItem term="Email" definition={displayData(domainData.drmInfo?.email)} />
                    <DefinitionItem term="Telephone" definition={displayData(domainData.drmInfo?.teleNumber)} />
                    <DefinitionItem term="Mobile" definition={displayData(domainData.drmInfo?.mobileNumber)} />
                    <DefinitionItem term="Group" definition={<>{displayData(domainData.drmInfo?.groupName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.drmInfo?.groupId)})</span></>} />
                    <DefinitionItem term="Centre" definition={<>{displayData(domainData.drmInfo?.centreName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.drmInfo?.centreId)})</span></>} />
                    <DefinitionItem term="Designation" definition={displayData(domainData.drmInfo?.designation)} />
                    <DefinitionItem term="Employee No." definition={displayData(domainData.drmInfo?.empNo)} />
                </dl>
            </DetailSection>

            {/* ARM Information Section */}
            <DetailSection title="ARM Information" icon={MdPerson}>
                <dl>
                    <DefinitionItem term="Name" definition={<>{displayData(domainData.armInfo?.firstName)} {displayData(domainData.armInfo?.lastName)}</>} />
                    <DefinitionItem term="Email" definition={displayData(domainData.armInfo?.email)} />
                    <DefinitionItem term="Telephone" definition={displayData(domainData.armInfo?.teleNumber)} />
                    <DefinitionItem term="Mobile" definition={displayData(domainData.armInfo?.mobileNumber)} />
                    <DefinitionItem term="Group" definition={<>{displayData(domainData.armInfo?.groupName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.armInfo?.groupId)})</span></>} />
                    <DefinitionItem term="Centre" definition={<>{displayData(domainData.armInfo?.centreName)} <span className="text-gray-500 text-xs">(ID: {displayData(domainData.armInfo?.centreId)})</span></>} />
                    <DefinitionItem term="Designation" definition={displayData(domainData.armInfo?.designation)} />
                    <DefinitionItem term="Employee No." definition={displayData(domainData.armInfo?.empNo)} />
                </dl>
            </DetailSection>

            {/* VAPT Compliance Section */}
            <DetailSection title="VAPT Compliance" icon={MdOutlineSecurity}>
                <dl>
                    <DefinitionItem term="VAPT Compliant" definition={displayBool(domainData.vaptCompliance?.vaptCompliant)} />
                    <DefinitionItem term="Certifying Authority" definition={displayData(domainData.vaptCompliance?.vaptCertifyingAuthority)} />
                    <DefinitionItem term="Certificate Expiry Date" definition={displayData(domainData.vaptCompliance?.vaptCertificateExpiryDate)} />
                    <DefinitionItem term="Remarks" definition={displayData(domainData.vaptCompliance?.vaptRemarks)} />
                </dl>
                 {/* Conditionally add VAPT Proof Download Button */}
                {domainData.vaptCompliance?.approvalProofVaptCompliant && (
                     <div className="mt-4 pt-4 border-t border-gray-200">
                         <button
                            onClick={handleDownloadVaptProof}
                            // disabled={isLoading} // Not needed here
                            className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                            >
                            <MdFileDownload className="mr-2" size={18} /> Download VAPT Approval Proof
                         </button>
                     </div>
                )}
            </DetailSection>

            {/* Other Compliance Section */}
            <DetailSection title="Other Compliance" icon={MdAssignmentTurnedIn}>
                <dl>
                    <DefinitionItem term="GIGW Compliance" definition={displayData(domainData.complianceStatus?.gigwCompliance)} />
                    <DefinitionItem term="MOU Status" definition={displayData(domainData.complianceStatus?.mouStatus)} />
                </dl>
            </DetailSection>

        </div> {/* End Grid */}


        {/* Actions Section */}
        {actions.length > 0 && (
          <section className="mt-10 pt-6 border-t border-gray-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Available Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {actions.map((action) => (
                <Link
                  key={action.title}
                  to={action.linkTo}
                  className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-center"
                >
                  <action.IconComponent className="w-10 h-10 mb-3 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span className="text-base font-medium text-gray-700 group-hover:text-blue-800 transition-colors">{action.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div> {/* End Page Container */}
    </MainLayout>
  );
}