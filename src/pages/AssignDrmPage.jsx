// // src/pages/AssignDrmPage.jsx
// import React from "react";
// import MainLayout from "../layouts/MainLayout";
// import FormSection from "../components/forms/FormSection";
// import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
// import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
// import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";
// import { API_BASE_URL } from "../config/env.config.js";
// import { isAuthenticatedState } from "../../recoil/atoms/authState.js";

// function AssignDrmPage() {
//   const fetchUser = () => {
//     const userLS = localStorage.getItem("user");
//     if(userLS === null)
//         return "DRM" 
//     try {
//         const userDetails = JSON.parse(userLS);
//         return userDetails;
//     }catch(error){
//         throw error;
//     }
// };

//   const user = fetchUser;
//   console.log("userr",user);


//   const handleAssignSubmit = async (e) => {
//     e.preventDefault();
//     // alert("Assign DRM/ARM form submission logic will be added later!");

//     const details = new FormData(e.target);
//     const projectName = details.get("projectName");
//     const projectRemarks = details.get("projectRemarks");
//     const drmEmpNo = details.get("drmEmpNo")
//     const armEmpNo = details.get("armEmpNo")

//     try{
//       const payload = {
//         project_name:projectName,
//         project_remarks:projectRemarks,
//         drm_emp_no:drmEmpNo,
//         arm_emp_no:armEmpNo
//       }


//       const response = await axios.post(`${API_BASE_URL}/api/projects/assignment`,payload,{
//         headers:{
//           'Content-Type':'application/json',
//           'Authorization':`Bearer ${isAuthenticatedState}`
//         }
//       }
//       )

//       console.log("ASSGINEMTN REPSONE",response.data)

//     }catch(error){
//       console.log("ERROR IN ASSGINEMTNs")
//       throw error 


//     }

//   };

//   return (
//     <MainLayout>
//       {/* Using similar container as Add Domain Form */}
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
//           Assign DRM/ARM Form
//         </h2>

//         <form onSubmit={handleAssignSubmit}>
//           {/* Use FormSection for collapsibility */}
//           <FormSection title="Project Information" initiallyOpen={true}>
//             <ProjectDomainInfoSection />
//           </FormSection>

//           <FormSection title="DRM Information" initiallyOpen={true}>
//             <DrmAssignmentSection user={user} />
//           </FormSection>

//           <FormSection title="ARM Information" initiallyOpen={true}>
//             <ArmAssignmentSection user={user}/>
//           </FormSection>

//           {/* Submit Button */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               // Changed button color to match wireframe
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
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FormSection from "../components/forms/FormSection";
import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";
import { API_BASE_URL } from "../config/env.config.js";
import { useRecoilValue } from "recoil";
import { authTokenState, isAuthenticatedState } from "../recoil/atoms/authState.js";
import { notifySuccess, notifyError } from "../utils/toastUtils"; // adjust the import path if needed

function AssignDrmPage() {
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(authTokenState);

  // Helper to fetch the user object from localStorage.
  const fetchUser = () => {
    const userLS = localStorage.getItem("user");
    if (userLS === null)
      return {
        role: "DRM",
        employeeCentre: "Default Centre",
        employeeGroup: "Default Group"
      };
    try {
      const userDetails = JSON.parse(userLS);
      return userDetails;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      // Fallback defaults in case of parsing issues.
      return {
        role: "DRM",
        employeeCentre: "Default Centre",
        employeeGroup: "Default Group"
      };
    }
  };

  const user = fetchUser();
  console.log("user", user);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();

    // Optionally, if you want to show an immediate alert or disable the form, do that here.
    // alert("Form is being submitted, please wait...");

    const details = new FormData(e.target);
    const projectName = details.get("projectName");
    const projectRemarks = details.get("projectRemarks");
    const drmEmpNo = details.get("drmEmpNo");
    const armEmpNo = details.get("armEmpNo");

    try {
      const payload = {
        project_name: projectName,
        project_remarks: projectRemarks,
        drm_emp_no: drmEmpNo,
        arm_emp_no: armEmpNo,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/projects/assignment`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${isAuthenticated}`,
          },
        }
      );

      console.log("ASSIGNMENT RESPONSE", response.data);
      notifySuccess("Form submitted successfully!");
      // Redirect to /dashboard after 2 seconds. Adjust the delay as needed.
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("ERROR IN ASSIGNMENT", error);
      notifyError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
          Assign DRM/ARM Form
        </h2>

        <form onSubmit={handleAssignSubmit}>
          {/* Project Information Section */}
          <FormSection title="Project Information" initiallyOpen={true}>
            <ProjectDomainInfoSection />
          </FormSection>

          {/* DRM Information Section */}
          <FormSection title="DRM Information" initiallyOpen={true}>
            <DrmAssignmentSection user={user} />
          </FormSection>

          {/* ARM Information Section */}
          <FormSection title="ARM Information" initiallyOpen={true}>
            <ArmAssignmentSection user={user} />
          </FormSection>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AssignDrmPage;

