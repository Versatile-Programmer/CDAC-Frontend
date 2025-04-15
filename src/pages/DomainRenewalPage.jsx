// // src/pages/DomainRenewalPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import MainLayout from "../layouts/MainLayout";
// import FormSection from "../components/forms/FormSection";

// // Import section components
// import DrmInfoSection from "../components/domain-form/DrmInfoSection";
// import RegistrationInfoSection from "../components/domain-form/RegistrationInfoSection";
// import IpInfoSection from "../components/domain-form/IpInfoSection";
// import VaptInfoSection from "../components/domain-form/VaptInfoSection";
// import ComplianceInfoSection from "../components/domain-form/ComplianceInfoSection";
// import MouInfoSection from "../components/domain-form/MouInfoSection";
// import ArmInfoSection from "../components/domain-form/ArmInfoSection";
// import TermsAndConditionsSection from "../components/domain-form/TermsAndConditionsSection";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilValue } from "recoil";
// import { isAuthenticatedState } from "../recoil/atoms/authState";
// import fetchUser from "../utils/fetchUser";

// function DomainRenewalPage() {
//     const { dmId } = useParams();

//     const user = fetchUser();
//     const isAuthenticated = useRecoilValue(isAuthenticatedState);

//     // Full state representing the domain renewal request
//     const [domainRenewalRequest, setDomainRenewalRequest] = useState({
//         domainId: dmId ? parseInt(dmId) : null,
//         reason: "",
//         domainRenewalApprovalProofByHod: null,
//         drmInfo: {
//             firstName: "",
//             lastName: "",
//             groupId: null,
//             centreId: null,
//             designation: "", // e.g., "ENGINEER"
//             email: user.employeeEmail,
//             teleNumber: "",
//             mobileNumber: "",
//             empNo: user.id,
//         },
//         armInfo: {
//             firstName: "",
//             lastName: "",
//             groupId: null,
//             centreId: null,
//             designation: "", // e.g., "ENGINEER"
//             email: "",
//             teleNumber: "",
//             mobileNumber: "",
//             empNo: "",
//         },
//         domainDetails: {
//             domainName: "",
//             description: "",
//             serviceType: "", // e.g., "WEB"
//             periodInYears: null,
//         },
//         approverInfo: {
//             hodEmpNo: null,
//             edEmpNo: null,
//             netopsEmpNo: null,
//             webmasterEmpNo: null,
//             hodHpcEmpNo: null,
//         },
//         ipDetails: {
//             publicIpAddress: "",
//             ipIssuer: "",
//             serverHardeningStatus: false,
//             ipExpiryDate: "", // ISO string e.g. "2025-12-31T00:00:00"
//         },
//         vaptCompliance: {
//             vaptCompliance: false,
//             certifyingAuthority: "",
//             certificateExpiryDate: "", // ISO string
//             approvalProof: null,
//             remarks: "",
//         },
//         complianceStatus: {
//             gigwCompliance: "", // e.g., "COMPLIANT"
//             mouStatus: "", // e.g., "NOT_COMPLIANT"
//         },
//     });

//     // Generic updater for the domainRenewalRequest state
//     const updateDomainRenewalRequest = (section, updatedData) => {
//         setDomainRenewalRequest((prev) => ({
//             ...prev,
//             [section]: updatedData,
//         }));
//     };

//     // useEffect to fetch domain renewal data and prepopulate the form
//     useEffect(() => {
//         const fetchRenewalData = async () => {
//             try {
//                 const response = await axios.get(
//                     "http://100.75.10.81:8085/domain/get/renew/1",
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${isAuthenticated}`,
//                         },
//                     }
//                 );
//                 const data = response.data;

//                 // Map the API response to the domainRenewalRequest state.
//                 setDomainRenewalRequest((prev) => ({
//                     ...prev,
//                     domainId: data.domainId,
//                     reason: data.reason || "",
//                     domainRenewalApprovalProofByHod: data.domainRenewalApprovalProofByHod,
//                     drmInfo: {
//                         fname: data.drmInfo.firstName,
//                         lname: data.drmInfo.lastName,
//                         groupId: data.drmInfo.groupId,
//                         centreId: data.drmInfo.centreId,
//                         designation: data.drmInfo.designation,
//                         email: data.drmInfo.email,
//                         teleNumber: data.drmInfo.teleNumber,
//                         mobileNumber: data.drmInfo.mobileNumber,
//                         empNo: data.drmInfo.empNo,
//                     },
//                     armInfo: {
//                         fname: data.armInfo.firstName,
//                         lname: data.armInfo.lastName,
//                         groupId: data.armInfo.groupId,
//                         centreId: data.armInfo.centreId,
//                         designation: data.armInfo.designation,
//                         email: data.armInfo.email,
//                         teleNumber: data.armInfo.teleNumber,
//                         mobileNumber: data.armInfo.mobileNumber,
//                         empNo: data.armInfo.empNo,
//                     },
//                     domainDetails: {
//                         domainName: data.domainDetails.domainName,
//                         description: data.domainDetails.description || "",
//                         serviceType: data.domainDetails.serviceType,
//                         periodInYears: data.domainDetails.periodInYears,
//                     },
//                     approverInfo: data.approverInfo,
//                     ipDetails: {
//                         publicIpAddress: data.ipDetails.publicIpAddress || "",
//                         ipIssuer: data.ipDetails.ipIssuer || "",
//                         serverHardeningStatus: data.ipDetails.serverHardeningStatus,
//                         ipExpiryDate: data.ipDetails.ipExpiryDate || "",
//                     },
//                     vaptCompliance: {
//                         compliant: data.vaptCompliance.vaptCompliant,
//                         certifyingAuthority: data.vaptCompliance.vaptCertifyingAuthority || "",
//                         certificateExpiryDate: data.vaptCompliance.vaptCertificateExpiryDate || "",
//                         approvalProof: data.vaptCompliance.approvalProofVaptCompliant,
//                         remarks: data.vaptCompliance.vaptRemarks || "",
//                     },
//                     complianceStatus: data.complianceStatus,
//                 }));
//             } catch (error) {
//                 console.error("Error fetching renewal data:", error);
//             }
//         };

//         fetchRenewalData();
//     }, [isAuthenticated]);

//     // Dummy form submit handler
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         console.log("PAYLOAD FOR DOMAIN RENEWAL", domainRenewalRequest);
//         // Typically, you would send the domainRenewalRequest via an API call here.
//     };

//     return (
//         <MainLayout>
//             <div className="max-w-4xl mx-auto">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
//                     Domain Renewal Form
//                 </h2>
//                 <form onSubmit={handleFormSubmit}>
//                     {/* Renewal Information Section */}
//                     <FormSection title="Renewal Information" initiallyOpen={true}>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//                             <TextInput
//                                 label="Domain ID"
//                                 id="domainId"
//                                 name="domainId"
//                                 isRequired={true}
//                                 readOnly
//                                 placeholder={domainRenewalRequest.domainId || "Auto-assigned"}
//                             />
//                             <div className="md:col-span-2">
//                                 <label
//                                     htmlFor="reason"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                     Reason for Renewal <span className="text-red-500">*</span>
//                                 </label>
//                                 <textarea
//                                     id="reason"
//                                     name="reason"
//                                     rows="4"
//                                     placeholder="Enter reason for renewal..."
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                     value={domainRenewalRequest.reason}
//                                     onChange={(e) =>
//                                         updateDomainRenewalRequest("reason", e.target.value)
//                                     }
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div className="md:col-span-2">
//                                 <label
//                                     htmlFor="domainRenewalApprovalProofByHod"
//                                     className="block text-sm font-medium text-gray-700 mb-1"
//                                 >
//                                     Renewal Approval Proof (HOD) <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="file"
//                                     id="domainRenewalApprovalProofByHod"
//                                     name="domainRenewalApprovalProofByHod"
//                                     required
//                                     onChange={(e) => {
//                                         const file = e.target.files[0] || null;
//                                         updateDomainRenewalRequest("domainRenewalApprovalProofByHod", file);
//                                     }}
//                                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                                 />
//                             </div>
//                         </div>
//                     </FormSection>

//                     {/* DRM Information Section */}
//                     <FormSection title="DRM Information" initiallyOpen={true}>
//                         <DrmInfoSection
//                             user={user}
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     {/* Registration Information Section */}
//                     <FormSection title="Registration Information" initiallyOpen={true}>
//                         <RegistrationInfoSection
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     {/* IP Information Section */}
//                     <FormSection title="IP Information" initiallyOpen={true}>
//                         <IpInfoSection
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     {/* VAPT Information Section */}
//                     <FormSection title="VAPT Information" initiallyOpen={true}>
//                         <VaptInfoSection
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     {/* Compliance Information Section */}
//                     <FormSection title="Compliance (GIGW/ICT Accessibility)" initiallyOpen={true}>
//                         <ComplianceInfoSection
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     {/* MOU Information Section */}
//                     <FormSection title="Memorandum of Understanding" initiallyOpen={true}>
//                         <MouInfoSection
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     {/* ARM Information Section */}
//                     <FormSection title="ARM Information" initiallyOpen={true}>
//                         <ArmInfoSection
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     {/* Terms and Conditions Section */}
//                     <FormSection title="Terms and Conditions" initiallyOpen={true}>
//                         <TermsAndConditionsSection
//                             domainRequest={domainRenewalRequest}
//                             updateDomainRequest={updateDomainRenewalRequest}
//                         />
//                     </FormSection>

//                     <div className="mt-8 flex justify-end">
//                         <button
//                             type="submit"
//                             className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
//                         >
//                             Submit Renewal Form
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </MainLayout>
//     );
// }

// export default DomainRenewalPage;
// src/pages/DomainRenewalPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import FormSection from "../components/forms/FormSection";

// Import section components
import DrmInfoRenewalSection from "../components/domain-form/DrmInfoRenewalSection";
import ArmInfoRenewalSection from "../components/domain-form/ArmInfoRenewalSection";
import ComplianceInfoRenewalSection from "../components/domain-form/ComplianceInfoRenewalSection";
import IpInfoRenewalSection from "../components/domain-form/IpInfoRenewalSection";
import VaptInfoRenewalSection from "../components/domain-form/VaptInfoRenewalSection";
import RegistrationInfoRenewalSection from "../components/domain-form/RegistrationInfoRenewalSection";
import MouInfoRenewalSection from "./MouInfoRenewalSection";
import TermsAndConditionsSection from "../components/domain-form/TermsAndConditionsSection";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../recoil/atoms/authState";
import fetchUser from "../utils/fetchUser";


function DomainRenewalPage() {
    const { dmId } = useParams();

    const user = fetchUser();
    const isAuthenticated = useRecoilValue(isAuthenticatedState);

    // Full state representing the domain renewal request
    const [domainRenewalRequest, setDomainRenewalRequest] = useState({
        domainId: dmId ? parseInt(dmId) : null,
        reason: "",
        domainRenewalApprovalProofByHod: null, // This is where the file will be stored
        drmInfo: {
            firstName: "",
            lastName: "",
            groupId: null,
            centreId: null,
            designation: "",
            email: user.employeeEmail,
            teleNumber: "",
            mobileNumber: "",
            empNo: user.id,
            groupName:"",
            centreName:"",
        },
        armInfo: {
            firstName: "",
            lastName: "",
            groupId: null,
            centreId: null,
            designation: "",
            email: "",
            teleNumber: "",
            mobileNumber: "",
            empNo: "",
            groupName:"",
            centreName:"",
        },
        domainDetails: {
            domainName: "",
            description: "",
            serviceType: "",
            periodInYears: null,
        },
        approverInfo: {
            hodEmpNo: null,
            edEmpNo: null,
            netopsEmpNo: null,
            webmasterEmpNo: null,
            hodHpcEmpNo: null,
        },
        ipDetails: {
            publicIpAddress: "",
            ipIssuer: "",
            serverHardeningStatus: false,
            ipExpiryDate: "",
        },
        vaptCompliance: {
            vaptCompliance: false,
            certifyingAuthority: "",
            certificateExpiryDate: "",
            approvalProof: null,
            remarks: "",
        },
        complianceStatus: {
            gigwCompliance: "",
            mouStatus: "",
        },
    });

    // Generic updater for the domainRenewalRequest state
    const updateDomainRenewalRequest = (section, updatedData) => {
        setDomainRenewalRequest((prev) => ({
            ...prev,
            [section]: updatedData,
        }));
    };

    // File upload handler for the approval proof
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setDomainRenewalRequest((prev) => ({
                ...prev,
                domainRenewalApprovalProofByHod: file,
            }));
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    // useEffect to fetch domain renewal data and prepopulate the form
    useEffect(() => {
        const fetchRenewalData = async () => {
            try {
                // ${API_BASE_URL}/domain/get/renew/${dmId}`
                const response = await axios.get(
                    `${API_BASE_URL}/domain/get/renew/${dmId}`
                    ,
                    {
                        headers: {
                            'Content-Type': "application/json",
                            'Authorization': `Bearer ${isAuthenticated}`,
                        },
                    }
                );
                const data = response.data;

                console.log("RENEWAL DATA", data);
                // Map API response to state
                setDomainRenewalRequest((prev) => ({
                    ...prev,
                    domainId: data.domainId,
                    reason: "",
                    domainRenewalApprovalProofByHod: data.domainRenewalApprovalProofByHod,
                    drmInfo: {
                        firstName: data.drmInfo.firstName,
                        lastName: data.drmInfo.lastName,
                        groupId: data.drmInfo.groupId,
                        centreId: data.drmInfo.centreId,
                        designation: data.drmInfo.designation,
                        email: data.drmInfo.email,
                        teleNumber: data.drmInfo.teleNumber,
                        mobileNumber: data.drmInfo.mobileNumber,
                        empNo: data.drmInfo.empNo,
                        groupName:data.drmInfo.groupName,
                        centreName:data.drmInfo.centreName
                    },
                    armInfo: {
                        firstName: data.armInfo.firstName,
                        lastName: data.armInfo.lastName,
                        groupId: data.armInfo.groupId,
                        centreId: data.armInfo.centreId,
                        designation: data.armInfo.designation,
                        email: data.armInfo.email,
                        teleNumber: data.armInfo.teleNumber,
                        mobileNumber: data.armInfo.mobileNumber,
                        empNo: data.armInfo.empNo,
                        groupName:data.drmInfo.groupName,
                        centreName:data.drmInfo.centreName
                    },
                    domainDetails: {
                        domainName: data.domainDetails.domainName,
                        description: data.domainDetails.description || "",
                        serviceType: data.domainDetails.serviceType,
                        periodInYears: data.domainDetails.periodInYears,
                    },
                    approverInfo: data.approverInfo,
                    ipDetails: {
                        publicIpAddress: data.ipDetails.publicIpAddress || "",
                        ipIssuer: data.ipDetails.ipIssuer || "",
                        serverHardeningStatus: data.ipDetails.serverHardeningStatus,
                        ipExpiryDate: data.ipDetails.ipExpiryDate || "",
                    },
                    vaptCompliance: {
                        vaptCompliance: data.vaptCompliance.vaptCompliant,
                        certifyingAuthority: data.vaptCompliance.vaptCertifyingAuthority || "",
                        certificateExpiryDate: data.vaptCompliance.vaptCertificateExpiryDate || "",
                        approvalProof: data.vaptCompliance.approvalProofVaptCompliant,
                        remarks: data.vaptCompliance.vaptRemarks || "",
                    },
                    complianceStatus: data.complianceStatus,
                }));
            } catch (error) {
                console.error("Error fetching renewal data:", error);
            }
        };

        if (dmId) {
            fetchRenewalData();
        }
    }, [dmId, isAuthenticated]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log("PAYLOAD FOR DOMAIN RENEWAL", domainRenewalRequest);

        try {
            const response = await axios.post(`${API_BASE_URL}/domainRenewal/renew`,domainRenewalRequest,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${isAuthenticated}`
                }
            })
            console.log("response",response.data)

            
        } catch (error) {
            console.log(error)
            throw error
            
        }
        // API submission logic goes here
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
                    Domain Renewal Form
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <FormSection title="Renewal Reason" initiallyOpen={true}>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Reason for Renewal</label>
                            <textarea
                                value={domainRenewalRequest.reason}
                                onChange={(e) =>
                                    setDomainRenewalRequest((prev) => ({
                                        ...prev,
                                        reason: e.target.value,
                                    }))
                                }
                                className="w-full border p-2 rounded"
                                rows={3}
                            />
                        </div>
                    </FormSection>

                    {/* Add file upload for approval proof */}
                    <FormSection title="Approval Proof (HOD)" initiallyOpen={false}>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Upload Approval Proof</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="w-full border p-2 rounded"
                            />
                            {domainRenewalRequest.domainRenewalApprovalProofByHod && (
                                <p className="mt-2 text-sm text-green-500">
                                    {domainRenewalRequest.domainRenewalApprovalProofByHod.name} uploaded.
                                </p>
                            )}
                        </div>
                    </FormSection>


                    <FormSection title="DRM Information" initiallyOpen={false}>
                        <DrmInfoRenewalSection
                            drmInfo={domainRenewalRequest.drmInfo}
                            updateDomainRenewalRequest={updateDomainRenewalRequest}
                        />
                    </FormSection>

                    <FormSection title="ARM Information" initiallyOpen={false}>
                    <ArmInfoRenewalSection
                        armInfo={domainRenewalRequest.armInfo}
                        updateDomainRenewalRequest={updateDomainRenewalRequest}
                    />
                    </FormSection>

                    <FormSection title="Registration Information" initiallyOpen={false}>
                    <RegistrationInfoRenewalSection
                        domainDetails={domainRenewalRequest.domainDetails}
                        updateDomainRenewalRequest={updateDomainRenewalRequest}
                    />
                     </FormSection>


                     <FormSection title="IP Information" initiallyOpen={false}>
                    <IpInfoRenewalSection
                        ipDetails={domainRenewalRequest.ipDetails}
                        updateDomainRenewalRequest={updateDomainRenewalRequest}
                    />
                    </FormSection>

                    <FormSection title="VAPT Information" initiallyOpen={false}>

                    <VaptInfoRenewalSection
                        vaptCompliance={domainRenewalRequest.vaptCompliance}
                        updateDomainRenewalRequest={updateDomainRenewalRequest}
                    />
                     </FormSection>

                     <FormSection title="GIGCW Compliance Information" initiallyOpen={false}>
                    <ComplianceInfoRenewalSection
                        complianceStatus={domainRenewalRequest.complianceStatus}
                        updateDomainRenewalRequest={updateDomainRenewalRequest}
                    />
                    </FormSection>

                    <FormSection title="MOU Information" initiallyOpen={false}>

                    <MouInfoRenewalSection
                        domainRequest={domainRenewalRequest}
                        updateDomainRenewalRequest={updateDomainRenewalRequest}
                    />
                    </FormSection>


                    <FormSection title="Terms And Conditions" initiallyOpen={false}>

                    <TermsAndConditionsSection />
                    </FormSection>

                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
                        >
                            Submit Renewal Request
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default DomainRenewalPage;



