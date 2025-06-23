// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { debounce } from "lodash";
// import { useRecoilValue } from "recoil";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// import MainLayout from "../layouts/MainLayout";
// import TextInput from "../components/forms/TextInput";
// import FileUpload from "../components/forms/FileUpload";
// import { API_BASE_URL } from "../config/env.config";
// import { authTokenState, userState } from "../recoil/atoms/authState";
// import { FiLoader, FiUserCheck, FiUserPlus, FiInfo, FiSend } from "react-icons/fi"; 
// import ConfirmationModal from "../components/modals/ConfirmationModal";

// function TransferRequestSection() {
//   const { domainId } = useParams();
//   const navigate = useNavigate();
//   const authToken = useRecoilValue(authTokenState);
//   const loggedInUser = useRecoilValue(userState);

//   const [formData, setFormData] = useState({
//     dm_id: domainId,
//     trns_frm: loggedInUser?.id || "",
//     trns_to: "",
//     rsn_for_trns: "",
//     prf_upload: null,
//   });

//   const [drmFromInfo, setDrmFromInfo] = useState(null);
//   const [drmToInfo, setDrmToInfo] = useState(null);
//   const [drmToError, setDrmToError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // --- NEW: State to track loading of the "From" user's info ---
//   const [isFromInfoLoading, setIsFromInfoLoading] = useState(true);

//   const fetchDrmInfo = useCallback(async (empNo, isFromUser) => {
//     if (!empNo) return;
    
//     if (isFromUser) {
//         setIsFromInfoLoading(true);
//     } else {
//         setDrmToInfo(null);
//         setDrmToError(null);
//     }

//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users/details/DRM/${empNo}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${authToken}`,
//         },
//       });
//       const data = response.data;
//       if (isFromUser) {
//         setDrmFromInfo(data);
//       } else {
//         setDrmToInfo(data);
//       }
//     } catch (err) {
//       const errorMessage = err.response?.status === 404 
//         ? "DRM with this Employee Number does not exist." 
//         : "Failed to fetch DRM information.";
      
//       if (isFromUser) {
//         toast.error("Could not verify your information. Please log in again.");
//         setDrmFromInfo(null);
//       } else {
//         setDrmToError(errorMessage);
//         setDrmToInfo(null);
//       }
//     } finally {
//         // --- NEW: Stop loading indicator for the "From" user ---
//         if (isFromUser) {
//             setIsFromInfoLoading(false);
//         }
//     }
//   }, [authToken]);

//   // --- REVISED useEffect to be more robust ---
//   useEffect(() => {
//     const userId = loggedInUser?.id;
//     // For debugging: You can see if/when the user ID becomes available
//     // console.log("User ID from Recoil:", userId); 

//     if (userId) {
//       // Set the empId in the form state once we have it
//       setFormData(prev => ({ ...prev, trns_frm: userId }));
//       fetchDrmInfo(userId, true);
//     } else {
//       // If there's no user ID after a brief moment, stop loading
//       // and let the user know something is wrong.
//       const timer = setTimeout(() => {
//           if (!loggedInUser?.id) {
//               setIsFromInfoLoading(false);
//               toast.error("Could not identify the current user. Please log in again.");
//           }
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [loggedInUser?.id, fetchDrmInfo]); // Dependency on the ID itself is more precise

//   const debouncedFetchTo = useCallback(debounce((empNo) => fetchDrmInfo(empNo, false), 500), [fetchDrmInfo]);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (field === "trns_to") debouncedFetchTo(value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     if (!formData.trns_frm || !drmFromInfo) {
//       toast.error("Cannot verify your identity. Please try logging in again.");
//       return;
//     }
//     if (drmToError) {
//       toast.error(drmToError);
//       return;
//     }
//     if (!formData.trns_to || !formData.rsn_for_trns || !formData.prf_upload) {
//         toast.error("Please fill all required fields and upload the proof document.");
//         return;
//     }
//     if (!drmToInfo) {
//         toast.error("Please enter and verify the 'Transfer To' DRM before submitting.");
//         return;
//     }

//     setIsModalOpen(true);
//   };

//   const handleConfirmSubmit = async () => {
//     // ... (This function remains the same)
//     setIsModalOpen(false);
//     setIsSubmitting(true);
    
//     const apiFormData = new FormData();
//     apiFormData.append('dm_id', formData.dm_id);
//     apiFormData.append('trns_frm', formData.trns_frm);
//     apiFormData.append('trns_to', formData.trns_to);
//     apiFormData.append('rsn_for_trns', formData.rsn_for_trns);
//     apiFormData.append('prf_upload', formData.prf_upload);

//     const toastId = toast.loading("Submitting transfer request...");

//     try {
//       await axios.post(`${API_BASE_URL}/api/transfers/create`, apiFormData, {
//         headers: { 'Authorization': `Bearer ${authToken}` }
//       });
      
//       toast.success("Transfer request submitted successfully!", { id: toastId });
//       setTimeout(() => navigate('/domains/manage'), 2000);
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
//       console.error("Submission Error:", error);
//       toast.error(errorMessage, { id: toastId });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- REVISED renderDrmCard to handle a loading state ---
//   const renderDrmCard = (info, label, icon, isLoading = false, isError = false, errorMessage = '') => (
//     <div className={`bg-white border rounded-xl shadow-md p-4 transition-all min-h-[140px] ${isError ? 'border-red-400' : 'border-gray-200'}`}>
//       <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-800">
//         {icon}
//         <span className="ml-2">{label}</span>
//       </h3>
//       {isLoading ? (
//         <div className="flex items-center justify-center h-full">
//             <FiLoader className="animate-spin text-2xl text-blue-500" />
//         </div>
//       ) : info ? (
//         <div className="space-y-2 text-sm text-gray-600">
//           <p><strong>Name:</strong> {info.drm_fname} {info.drm_lname}</p>
//           <p><strong>Email:</strong> {info.email_id}</p>
//           <p><strong>Mobile:</strong> {info.mob_no}</p>
//           {info.division && <p><strong>Division:</strong> {info.division}</p>}
//         </div>
//       ) : (
//         <div className="flex items-center text-gray-500 text-sm">
//             <FiInfo className="mr-2"/>
//             {isError ? <span className="text-red-600">{errorMessage}</span> : "Enter an Employee No to see details."}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <MainLayout>
//       <Toaster position="top-right" containerClassName="text-sm"/>
//       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">Initiate Domain Transfer</h1>
//             <p className="mt-1 text-md text-gray-600">Transfer domain ownership from one DRM to another.</p>
//         </div>
        
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <form onSubmit={handleSubmit} className="p-6 md:p-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="space-y-6">
//                  {/* ... (rest of the form remains the same) ... */}
//                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
//                     <h3 className="font-semibold text-blue-800">Current Domain</h3>
//                     <p className="text-sm text-blue-700">You are initiating a transfer for Domain ID: <span className="font-bold">{domainId}</span></p>
//                 </div>

//                 <TextInput
//                   label="Transfer To (DRM Emp No)"
//                   id="trns_to"
//                   name="trns_to"
//                   placeholder="e.g., 220004"
//                   value={formData.trns_to}
//                   isRequired={true}
//                   onChange={(e) => handleChange("trns_to", e.target.value)}
//                   error={drmToError}
//                 />
                
//                 <TextInput
//                   label="Reason for Transfer"
//                   id="rsn_for_trns"
//                   name="rsn_for_trns"
//                   placeholder="e.g., Project handover, DRM retiring."
//                   value={formData.rsn_for_trns}
//                   isRequired={true}
//                   onChange={(e) => handleChange("rsn_for_trns", e.target.value)}
//                   isTextArea={true}
//                 />

//                 <FileUpload
//                   label="Upload Proof Document (e.g., Transfer Order)"
//                   id="prf_upload"
//                   name="prf_upload"
//                   onUpload={(file) => handleChange("prf_upload", file)}
//                   isRequired={true}
//                 />
//               </div>

//               <div className="space-y-6">
//                 {/* --- Pass the new isLoading prop --- */}
//                 {renderDrmCard(drmFromInfo, "Transfer From (Current DRM)", <FiUserCheck className="text-green-600"/>, isFromInfoLoading)}
//                 {renderDrmCard(drmToInfo, "Transfer To (New DRM)", <FiUserPlus className="text-blue-600"/>, false, !!drmToError, drmToError)}
//               </div>
//             </div>

//             <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
//                 {/* Button logic remains the same */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting || isFromInfoLoading}
//                 className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? ( <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5" /> ) : ( <FiSend className="-ml-1 mr-3 h-5 w-5" /> )}
//                 {isSubmitting ? "Submitting..." : "Submit Transfer Request"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//         {/* Modal logic remains the same */}
//         <ConfirmationModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onConfirm={handleConfirmSubmit}
//           title="Confirm Transfer Request"
//           message={`Are you sure you want to transfer this domain to ${drmToInfo?.drm_fname || 'the selected DRM'}? This action will start the verification process.`}
//           confirmText="Yes, Submit"
//           cancelText="Cancel"
//         />
//     </MainLayout>
//   );
// }

// export default TransferRequestSection;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useRecoilValue } from "recoil";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import TextInput from "../components/forms/TextInput";
import FileUpload from "../components/forms/FileUpload";
import { API_BASE_URL } from "../config/env.config";
import { authTokenState, userState } from "../recoil/atoms/authState";
import { FiLoader, FiUserCheck, FiUserPlus, FiInfo, FiSend } from "react-icons/fi";
import ConfirmationModal from "../components/modals/ConfirmationModal";

function TransferRequestSection() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const authToken = useRecoilValue(authTokenState);
  const loggedInUser = useRecoilValue(userState);

  const [formData, setFormData] = useState({
    dm_id: domainId,
    trns_frm: loggedInUser?.id|| "",
    trns_to: "",
    rsn_for_trns: "",
    prf_upload: "", // Will hold the base64 string
  });

  const [drmFromInfo, setDrmFromInfo] = useState(null);
  const [drmToInfo, setDrmToInfo] = useState(null);
  const [drmToError, setDrmToError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFromInfoLoading, setIsFromInfoLoading] = useState(true);

  const fetchDrmInfo = useCallback(async (empNo, isFromUser) => {
    if (!empNo) return;
    
    if (isFromUser) {
        setIsFromInfoLoading(true);
    } else {
        setDrmToInfo(null);
        setDrmToError(null);
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/details/DRM/${empNo}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
      const data = response.data;
      if (isFromUser) {
        setDrmFromInfo(data);
      } else {
        setDrmToInfo(data);
      }
    } catch (err) {
      const errorMessage = err.response?.status === 404 
        ? "DRM with this Employee Number does not exist." 
        : "Failed to fetch DRM information.";
      
      if (isFromUser) {
        toast.error("Could not verify your information. Please log in again.");
        setDrmFromInfo(null);
      } else {
        setDrmToError(errorMessage);
        setDrmToInfo(null);
      }
    } finally {
        if (isFromUser) {
            setIsFromInfoLoading(false);
        }
    }
  }, [authToken]);

  useEffect(() => {
    const userId = loggedInUser?.id;
    if (userId) {
      setFormData(prev => ({ ...prev, trns_frm: userId }));
      fetchDrmInfo(userId, true);
    } else {
      const timer = setTimeout(() => {
          if (!loggedInUser?.id) {
              setIsFromInfoLoading(false);
              toast.error("Could not identify the current user. Please log in again.");
          }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loggedInUser?.id, fetchDrmInfo]);

  const debouncedFetchTo = useCallback(debounce((empNo) => fetchDrmInfo(empNo, false), 500), [fetchDrmInfo]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "trns_to") debouncedFetchTo(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.trns_frm || !drmFromInfo) {
      toast.error("Cannot verify your identity. Please try logging in again.");
      return;
    }
    if (drmToError) {
      toast.error(drmToError);
      return;
    }
    if (!formData.trns_to || !formData.rsn_for_trns || !formData.prf_upload) {
        toast.error("Please fill all required fields and upload the proof document.");
        return;
    }
    if (!drmToInfo) {
        toast.error("Please enter and verify the 'Transfer To' DRM before submitting.");
        return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsModalOpen(false);
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting transfer request...");

    // Create a plain JSON object for the request body
    const payload = {
      dm_id: formData.dm_id,
      trns_frm: formData.trns_frm.toString(),
      trns_to: formData.trns_to,
      rsn_for_trns: formData.rsn_for_trns,
      prf_upload: formData.prf_upload, // This is now the base64 string from the FileUpload component
    };

    try {
      // Send the request with 'Content-Type': 'application/json'
      await axios.post(`${API_BASE_URL}/api/transfers/create`, payload, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        }
      });
      
      toast.success("Transfer request submitted successfully!", { id: toastId });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      console.error("Submission Error:", error);
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDrmCard = (info, label, icon, isLoading = false, isError = false, errorMessage = '') => (
    <div className={`bg-white border rounded-xl shadow-md p-4 transition-all min-h-[140px] ${isError ? 'border-red-400' : 'border-gray-200'}`}>
      <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-800">
        {icon}
        <span className="ml-2">{label}</span>
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
            <FiLoader className="animate-spin text-2xl text-blue-500" />
        </div>
      ) : info ? (
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Name:</strong> {info.drm_fname} {info.drm_lname}</p>
          <p><strong>Email:</strong> {info.email_id}</p>
          <p><strong>Mobile:</strong> {info.mob_no}</p>
          {info.division && <p><strong>Division:</strong> {info.division}</p>}
        </div>
      ) : (
        <div className="flex items-center text-gray-500 text-sm">
            <FiInfo className="mr-2"/>
            {isError ? <span className="text-red-600">{errorMessage}</span> : "Enter an Employee No to see details."}
        </div>
      )}
    </div>
  );

  return (
    <MainLayout>
      <Toaster position="top-right" containerClassName="text-sm"/>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Initiate Domain Transfer</h1>
            <p className="mt-1 text-md text-gray-600">Transfer domain ownership from one DRM to another.</p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h3 className="font-semibold text-blue-800">Current Domain</h3>
                    <p className="text-sm text-blue-700">You are initiating a transfer for Domain ID: <span className="font-bold">{domainId}</span></p>
                </div>

                <TextInput
                  label="Transfer To (DRM Emp No)"
                  id="trns_to"
                  name="trns_to"
                  placeholder="e.g., 220004"
                  value={formData.trns_to}
                  isRequired={true}
                  onChange={(e) => handleChange("trns_to", e.target.value)}
                  error={drmToError}
                />
                
                <TextInput
                  label="Reason for Transfer"
                  id="rsn_for_trns"
                  name="rsn_for_trns"
                  placeholder="e.g., Project handover, DRM retiring."
                  value={formData.rsn_for_trns}
                  isRequired={true}
                  onChange={(e) => handleChange("rsn_for_trns", e.target.value)}
                  isTextArea={true}
                />

                <FileUpload
                  label="Upload Proof Document (e.g., Transfer Order)"
                  id="prf_upload"
                  name="prf_upload"
                  onUpload={(base64String) => handleChange("prf_upload", base64String)}
                  isRequired={true}
                />
              </div>

              <div className="space-y-6">
                {renderDrmCard(drmFromInfo, "Transfer From (Current DRM)", <FiUserCheck className="text-green-600"/>, isFromInfoLoading)}
                {renderDrmCard(drmToInfo, "Transfer To (New DRM)", <FiUserPlus className="text-blue-600"/>, false, !!drmToError, drmToError)}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || isFromInfoLoading}
                className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? ( <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5" /> ) : ( <FiSend className="-ml-1 mr-3 h-5 w-5" /> )}
                {isSubmitting ? "Submitting..." : "Submit Transfer Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmSubmit}
          title="Confirm Transfer Request"
          message={`Are you sure you want to transfer this domain to ${drmToInfo?.drm_fname || 'the selected DRM'}? This action will start the verification process.`}
          confirmText="Yes, Submit"
          cancelText="Cancel"
        />
    </MainLayout>
  );
}

export default TransferRequestSection;

