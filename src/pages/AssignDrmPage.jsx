// // // src/pages/AssignDrmPage.jsx
// // import React from "react";
// // import MainLayout from "../layouts/MainLayout";
// // import FormSection from "../components/forms/FormSection";
// // import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
// // import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
// // import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";
// // import { API_BASE_URL } from "../config/env.config.js";
// // import { isAuthenticatedState } from "../../recoil/atoms/authState.js";

// // function AssignDrmPage() {
// //   const fetchUser = () => {
// //     const userLS = localStorage.getItem("user");
// //     if(userLS === null)
// //         return "DRM" 
// //     try {
// //         const userDetails = JSON.parse(userLS);
// //         return userDetails;
// //     }catch(error){
// //         throw error;
// //     }
// // };

// //   const user = fetchUser;
// //   console.log("userr",user);


// //   const handleAssignSubmit = async (e) => {
// //     e.preventDefault();
// //     // alert("Assign DRM/ARM form submission logic will be added later!");

// //     const details = new FormData(e.target);
// //     const projectName = details.get("projectName");
// //     const projectRemarks = details.get("projectRemarks");
// //     const drmEmpNo = details.get("drmEmpNo")
// //     const armEmpNo = details.get("armEmpNo")

// //     try{
// //       const payload = {
// //         project_name:projectName,
// //         project_remarks:projectRemarks,
// //         drm_emp_no:drmEmpNo,
// //         arm_emp_no:armEmpNo
// //       }


// //       const response = await axios.post(`${API_BASE_URL}/api/projects/assignment`,payload,{
// //         headers:{
// //           'Content-Type':'application/json',
// //           'Authorization':`Bearer ${isAuthenticatedState}`
// //         }
// //       }
// //       )

// //       console.log("ASSGINEMTN REPSONE",response.data)

// //     }catch(error){
// //       console.log("ERROR IN ASSGINEMTNs")
// //       throw error 


// //     }

// //   };

// //   return (
// //     <MainLayout>
// //       {/* Using similar container as Add Domain Form */}
// //       <div className="max-w-4xl mx-auto">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
// //           Assign DRM/ARM Form
// //         </h2>

// //         <form onSubmit={handleAssignSubmit}>
// //           {/* Use FormSection for collapsibility */}
// //           <FormSection title="Project Information" initiallyOpen={true}>
// //             <ProjectDomainInfoSection />
// //           </FormSection>

// //           <FormSection title="DRM Information" initiallyOpen={true}>
// //             <DrmAssignmentSection user={user} />
// //           </FormSection>

// //           <FormSection title="ARM Information" initiallyOpen={true}>
// //             <ArmAssignmentSection user={user}/>
// //           </FormSection>

// //           {/* Submit Button */}
// //           <div className="mt-8 flex justify-end">
// //             <button
// //               type="submit"
// //               // Changed button color to match wireframe
// //               className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
// //             >
// //               Submit Form
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </MainLayout>
// //   );
// // }

// // export default AssignDrmPage;
// // src/pages/AssignDrmPage.jsx
// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import FormSection from "../components/forms/FormSection";
// import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
// import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
// import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";
// import { API_BASE_URL } from "../config/env.config.js";
// import { useRecoilValue } from "recoil";
// import { authTokenState, isAuthenticatedState } from "../recoil/atoms/authState.js";
// import { notifySuccess, notifyError } from "../utils/toastUtils"; // adjust the import path if needed

// function AssignDrmPage() {
//   const navigate = useNavigate();
//   const isAuthenticated = useRecoilValue(authTokenState);

//   // Helper to fetch the user object from localStorage.
//   const fetchUser = () => {
//     const userLS = localStorage.getItem("user");
//     if (userLS === null)
//       return {
//         role: "DRM",
//         employeeCentre: "Default Centre",
//         employeeGroup: "Default Group"
//       };
//     try {
//       const userDetails = JSON.parse(userLS);
//       return userDetails;
//     } catch (error) {
//       console.error("Error parsing user from localStorage", error);
//       // Fallback defaults in case of parsing issues.
//       return {
//         role: "DRM",
//         employeeCentre: "Default Centre",
//         employeeGroup: "Default Group"
//       };
//     }
//   };

//   const user = fetchUser();
//   console.log("user", user);

//   const handleAssignSubmit = async (e) => {
//     e.preventDefault();

//     // Optionally, if you want to show an immediate alert or disable the form, do that here.
//     // alert("Form is being submitted, please wait...");

//     const details = new FormData(e.target);
//     const projectName = details.get("projectName");
//     const projectRemarks = details.get("projectRemarks");
//     const drmEmpNo = details.get("drmEmpNo");
//     const armEmpNo = details.get("armEmpNo");

//     try {
//       const payload = {
//         project_name: projectName,
//         project_remarks: projectRemarks,
//         drm_emp_no: drmEmpNo,
//         arm_emp_no: armEmpNo,
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/api/projects/assignment`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${isAuthenticated}`,
//           },
//         }
//       );

//       console.log("ASSIGNMENT RESPONSE", response.data);
//       notifySuccess("Form submitted successfully!");
//       // Redirect to /dashboard after 2 seconds. Adjust the delay as needed.
//       setTimeout(() => {
//         navigate("/dashboard", { replace: true });
//       }, 2000);
//     } catch (error) {
//       console.error("ERROR IN ASSIGNMENT", error);
//       notifyError("There was an error submitting the form. Please try again.");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
//           Assign DRM/ARM Form
//         </h2>

//         <form onSubmit={handleAssignSubmit}>
//           {/* Project Information Section */}
//           <FormSection title="Project Information" initiallyOpen={true}>
//             <ProjectDomainInfoSection />
//           </FormSection>

//           {/* DRM Information Section */}
//           <FormSection title="DRM Information" initiallyOpen={true}>
//             <DrmAssignmentSection user={user} />
//           </FormSection>

//           {/* ARM Information Section */}
//           <FormSection title="ARM Information" initiallyOpen={true}>
//             <ArmAssignmentSection user={user} />
//           </FormSection>

//           {/* Submit Button */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
//             >
//               Submit Form
//             </button>
//           </div>
//         </form>
//       </div>
//     </MainLayout>
//   );
// }

// export default AssignDrmPage;


// src/pages/AssignDrmPage.jsx
import React, { useState } from "react"; // Import useState
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FormSection from "../components/forms/FormSection"; // Assuming this handles collapse/expand
import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";
import { API_BASE_URL } from "../config/env.config.js";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState.js"; // Corrected import name
import { notifySuccess, notifyError } from "../utils/toastUtils";
import { MdSend } from "react-icons/md"; // Import an icon for the button

function AssignDrmPage() {
  const navigate = useNavigate();
  const authToken = useRecoilValue(authTokenState); // Use correct state atom
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading indicator

  // Helper to fetch the user object from localStorage.
  const fetchUser = () => {
    const userLS = localStorage.getItem("user");
    // Provide more robust default/fallback structure
    const defaultUser = {
        role: "DRM", // Default role if none found
        employeeCentre: "Unknown Centre",
        employeeGroup: "Unknown Group",
        // Add other fields expected by child components if necessary
      };

    if (!userLS) {
        console.warn("No user found in localStorage, using default.");
        return defaultUser;
    }
    try {
      const userDetails = JSON.parse(userLS);
      // Return parsed details merged with defaults to ensure all keys exist
      return { ...defaultUser, ...userDetails };
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return defaultUser; // Return default on error
    }
  };

  const user = fetchUser();
  console.log("User details used in AssignDrmPage:", user);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading indicator

    const details = new FormData(e.target);
    const projectName = details.get("projectName");
    const projectRemarks = details.get("projectRemarks");
    const drmEmpNo = details.get("drmEmpNo");
    const armEmpNo = details.get("armEmpNo");

    // Basic validation (optional but recommended)
    if (!projectName || !drmEmpNo || !armEmpNo) {
        notifyError("Project Name, DRM Employee No, and ARM Employee No are required.");
        setIsSubmitting(false);
        return;
    }

    try {
      const payload = {
        project_name: projectName,
        project_remarks: projectRemarks,
        drm_emp_no: drmEmpNo,
        arm_emp_no: armEmpNo,
      };

      console.log("Submitting payload:", payload);
      console.log("Using auth token:", authToken ? 'Token Present' : 'Token MISSING!'); // Debug token presence

      const response = await axios.post(
        `${API_BASE_URL}/api/projects/assignment`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`, // Use the token from Recoil
          },
        }
      );

      console.log("ASSIGNMENT RESPONSE", response.data);
      notifySuccess("DRM/ARM assigned successfully!");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);

    } catch (error) {
      console.error("ERROR IN ASSIGNMENT", error);
      let errorMsg = "There was an error submitting the form. Please try again.";
      if (error.response) {
          // Handle specific backend errors if available
          console.error("Backend error:", error.response.data);
          if (error.response.status === 401 || error.response.status === 403) {
              errorMsg = "Authentication failed. Please log in again.";
          } else if (error.response.data && error.response.data.message) {
              errorMsg = error.response.data.message; // Use backend message if informative
          }
      }
      notifyError(errorMsg);
    } finally {
         setIsSubmitting(false); // Stop loading indicator regardless of outcome
    }
  };

  return (
    <MainLayout>
      {/* Enhanced Container Styling */}
      <div className="max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-br from-gray-50 to-blue-100 rounded-lg shadow-xl border border-gray-200">
        {/* Enhanced Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Assign DRM & ARM to Project
        </h2>

        <form onSubmit={handleAssignSubmit} className="space-y-8"> {/* Added spacing between sections */}

          {/* Project Information Section - Wrapped for potential styling */}
           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FormSection title="Project Information" initiallyOpen={true}>
                    <ProjectDomainInfoSection />
                </FormSection>
           </div>

          {/* DRM Information Section - Wrapped */}
           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FormSection title="Assign Direct Responsible Member (DRM)" initiallyOpen={true}>
                    <DrmAssignmentSection user={user} />
                </FormSection>
           </div>

          {/* ARM Information Section - Wrapped */}
           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FormSection title="Assign Alternate Responsible Member (ARM)" initiallyOpen={true}>
                    <ArmAssignmentSection user={user} />
                </FormSection>
           </div>


          {/* Submit Button Area - Added top border */}
          <div className="mt-10 pt-6 border-t border-gray-300 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting} // Disable button when submitting
              className={`flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : '' // Style for disabled state
              }`}
            >
              <MdSend className={`mr-2 h-5 w-5 ${isSubmitting ? 'animate-spin' : ''}`} /> {/* Add icon, animate on load */}
              {isSubmitting ? 'Submitting...' : 'Assign & Submit'} {/* Change text during submission */}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AssignDrmPage;

