
// // src/pages/AssignDrmPage.jsx
// import React, { useState } from "react"; // Import useState
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import FormSection from "../components/forms/FormSection"; // Assuming this handles collapse/expand
// import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
// import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
// import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";
// import { API_BASE_URL } from "../config/env.config.js";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState.js"; // Corrected import name
// import { notifySuccess, notifyError } from "../utils/toastUtils";
// import { MdSend } from "react-icons/md"; // Import an icon for the button

// function AssignDrmPage() {
//   const navigate = useNavigate();
//   const authToken = useRecoilValue(authTokenState); // Use correct state atom
//   const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator

//   // Helper to fetch the user object from localStorage.
//   const fetchUser = () => {
//     const userLS = localStorage.getItem("user");
//     // Provide more robust default/fallback structure
//     const defaultUser = {
//         role: "DRM", // Default role if none found
//         employeeCentre: "Unknown Centre",
//         employeeGroup: "Unknown Group",
//         // Add other fields expected by child components if necessary
//       };

//     if (!userLS) {
//         console.warn("No user found in localStorage, using default.");
//         return defaultUser;
//     }
//     try {
//       const userDetails = JSON.parse(userLS);
//       // Return parsed details merged with defaults to ensure all keys exist
//       return { ...defaultUser, ...userDetails };
//     } catch (error) {
//       console.error("Error parsing user from localStorage", error);
//       return defaultUser; // Return default on error
//     }
//   };

//   const user = fetchUser();
//   console.log("User details used in AssignDrmPage:", user);

//   const handleAssignSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start loading indicator

//     const details = new FormData(e.target);
//     const projectName = details.get("projectName");
//     const projectRemarks = details.get("projectRemarks");
//     const drmEmpNo = details.get("drmEmpNo");
//     const armEmpNo = details.get("armEmpNo");

//     // Basic validation (optional but recommended)
//     if (!projectName || !drmEmpNo || !armEmpNo) {
//         notifyError("Project Name, DRM Employee No, and ARM Employee No are required.");
//         setIsSubmitting(false);
//         return;
//     }

//     try {
//       const payload = {
//         project_name: projectName,
//         project_remarks: projectRemarks,
//         drm_emp_no: drmEmpNo,
//         arm_emp_no: armEmpNo,
//       };

//       console.log("Submitting payload:", payload);
//       console.log("Using auth token:", authToken ? 'Token Present' : 'Token MISSING!'); // Debug token presence

//       const response = await axios.post(
//         `${API_BASE_URL}/api/projects/assignment`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${authToken}`, // Use the token from Recoil
//           },
//         }
//       );

//       console.log("ASSIGNMENT RESPONSE", response.data);
//       notifySuccess("DRM/ARM assigned successfully!");

//       setTimeout(() => {
//         navigate("/dashboard", { replace: true });
//       }, 2000);

//     } catch (error) {
//       console.error("ERROR IN ASSIGNMENT", error);
//       let errorMsg = "There was an error submitting the form. Please try again.";
//       if (error.response) {
//           // Handle specific backend errors if available
//           console.error("Backend error:", error.response.data);
//           if (error.response.status === 401 || error.response.status === 403) {
//               errorMsg = "Authentication failed. Please log in again.";
//           } else if (error.response.data && error.response.data.message) {
//               errorMsg = error.response.data.message; // Use backend message if informative
//           }
//       }
//       notifyError(errorMsg);
//     } finally {
//          setIsSubmitting(false); // Stop loading indicator regardless of outcome
//     }
//   };

//   return (
//     <MainLayout>
//       {/* Enhanced Container Styling */}
//       <div className="max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-br from-gray-50 to-blue-100 rounded-lg shadow-xl border border-gray-200">
//         {/* Enhanced Title */}
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           Assign DRM & ARM to Project
//         </h2>

//         <form onSubmit={handleAssignSubmit} className="space-y-8"> {/* Added spacing between sections */}

//           {/* Project Information Section - Wrapped for potential styling */}
//            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                 <FormSection title="Project Information" initiallyOpen={true}>
//                     <ProjectDomainInfoSection />
//                 </FormSection>
//            </div>

//           {/* DRM Information Section - Wrapped */}
//            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                 <FormSection title="Assign Direct Responsible Member (DRM)" initiallyOpen={true}>
//                     <DrmAssignmentSection user={user} />
//                 </FormSection>
//            </div>

//           {/* ARM Information Section - Wrapped */}
//            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                 <FormSection title="Assign Alternate Responsible Member (ARM)" initiallyOpen={true}>
//                     <ArmAssignmentSection user={user} />
//                 </FormSection>
//            </div>


//           {/* Submit Button Area - Added top border */}
//           <div className="mt-10 pt-6 border-t border-gray-300 flex justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting} // Disable button when submitting
//               className={`flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 ${
//                 isSubmitting ? 'opacity-50 cursor-not-allowed' : '' // Style for disabled state
//               }`}
//             >
//               <MdSend className={`mr-2 h-5 w-5 ${isSubmitting ? 'animate-spin' : ''}`} /> {/* Add icon, animate on load */}
//               {isSubmitting ? 'Submitting...' : 'Assign & Submit'} {/* Change text during submission */}
//             </button>
//           </div>
//         </form>
//       </div>
//     </MainLayout>
//   );
// }

// export default AssignDrmPage;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FormSection from "../components/forms/FormSection";
import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";
import ConfirmationModal from "../components/modals/ConfirmationModal"; // <-- 1. IMPORT MODAL
import { API_BASE_URL } from "../config/env.config.js";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState.js";
import { notifySuccess, notifyError } from "../utils/toastUtils";
import { MdSend } from "react-icons/md";

function AssignDrmPage() {
  const navigate = useNavigate();
  const authToken = useRecoilValue(authTokenState);
  
  // --- 2. ADD STATE FOR MODAL AND FORM DATA ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const fetchUser = () => {
    const userLS = localStorage.getItem("user");
    const defaultUser = { role: "DRM", employeeCentre: "Unknown Centre", employeeGroup: "Unknown Group" };
    if (!userLS) return defaultUser;
    try {
      return { ...defaultUser, ...JSON.parse(userLS) };
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return defaultUser;
    }
  };

  const user = fetchUser();

  // --- 3. LOGIC FOR THE FINAL SUBMISSION (AFTER CONFIRMATION) ---
  const handleConfirmSubmit = async () => {
    if (!formData) {
      notifyError("Form data is missing. Please try again.");
      return;
    }

    setIsModalOpen(false); // Close the modal
    setIsSubmitting(true); // Start loading indicator

    const projectName = formData.get("projectName");
    const projectRemarks = formData.get("projectRemarks");
    const drmEmpNo = formData.get("drmEmpNo");
    const armEmpNo = formData.get("armEmpNo");
    
    try {
      const payload = {
        project_name: projectName,
        project_remarks: projectRemarks,
        drm_emp_no: drmEmpNo,
        arm_emp_no: armEmpNo,
      };

      await axios.post(
        `${API_BASE_URL}/api/projects/assignment`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      notifySuccess("DRM/ARM assigned successfully!");
      setTimeout(() => navigate("/dashboard", { replace: true }), 2000);

    } catch (error) {
      console.error("ERROR IN ASSIGNMENT", error);
      let errorMsg = "There was an error submitting the form. Please try again.";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      notifyError(errorMsg);
    } finally {
      setIsSubmitting(false); // Stop loading indicator
      setFormData(null); // Clear stored form data
    }
  };

  // --- 4. MODIFIED ONSUBMIT HANDLER TO OPEN THE MODAL ---
  const handleAssignSubmit = (e) => {
    e.preventDefault();
    const details = new FormData(e.target);

    // Perform validation before showing the confirmation modal
    if (!details.get("projectName") || !details.get("drmEmpNo") || !details.get("armEmpNo")) {
      notifyError("Project Name, DRM, and ARM are required fields.");
      return;
    }
    
    setFormData(details); // Store the form data
    setIsModalOpen(true); // Open the modal for confirmation
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(null); // Clear data if user cancels
  };

  return (
    <MainLayout>
      {/* --- 5. RENDER THE CONFIRMATION MODAL --- */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSubmit}
        title="Confirm Assignment"
        message="Are you sure you want to assign this DRM and ARM to the project? This action cannot be undone."
        confirmText="Yes, Assign"
        cancelText="Cancel"
      />

      <div className="max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-br from-gray-50 to-blue-100 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Assign DRM & ARM to Project
        </h2>

        {/* The onSubmit now triggers the modal flow */}
        <form onSubmit={handleAssignSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <FormSection title="Project Information" initiallyOpen={true}>
              <ProjectDomainInfoSection />
            </FormSection>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <FormSection title="Assign Direct Responsible Member (DRM)" initiallyOpen={true}>
              <DrmAssignmentSection user={user} />
            </FormSection>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <FormSection title="Assign Alternate Responsible Member (ARM)" initiallyOpen={true}>
              <ArmAssignmentSection user={user} />
            </FormSection>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-300 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <MdSend className={`mr-2 h-5 w-5 ${isSubmitting ? 'animate-spin' : ''}`} />
              {isSubmitting ? 'Submitting...' : 'Assign & Submit'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AssignDrmPage;

