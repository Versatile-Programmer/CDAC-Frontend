// // // src/components/domain-form/ArmInfoSection.jsx
// // import React, { useEffect, useState } from "react";
// // import TextInput from "../forms/TextInput";
// // import axios from "axios";
// // import { API_BASE_URL } from "../config/env.config";
// // import { useRecoilValue } from "recoil";
// // import { isAuthenticatedState } from "../../recoil/atoms/authState";

// // function ArmInfoSection({domainRequest,updateDomainRequest,armEmpNo}) {

// //   const [isAuthenticated] = useRecoilValue(isAuthenticatedState)

// //   const {armInfo} = domainRequest

// //   useEffect(()=>{
// //     if(armEmpNo === null) return

// //     const fetchArmDetails = async ()=>{

// //       try {
// //         const res = await axios.get(`${API_BASE_URL}/api/users/details/ARM/${armEmpNo}`,{
// //           headers:{
// //             'Content-Type':'application/json',
// //             'Authorization':`Bearer ${isAuthenticated}`
// //           }
// //         })
  
// //         console.log("ARM RESPONSE",res.data)
// //         updateDomainRequest('armInfo',{
// //           ...armInfo,
// //           [empNo]:res.data.empNo
// //         })


        
// //       } catch (error) {
// //         console.log("ERROR OCCURED ARM DETAILS",error)
// //         throw error
        
// //       }
  
// //     }






// //   },[])




// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
// //       {/* Note: Employee number might be searchable/selected later */}
// //       <TextInput
// //         label="Employee Number of ARM"
// //         id="armEmpNo"
// //         name="armEmpNo"
// //         isRequired={true}
// //         placeholder="Enter ARM's Employee No."
// //       />
// //       {/* Other ARM fields might be auto-filled based on Emp No later */}
// //       <div /> {/* Empty div for grid alignment */}
// //       <TextInput
// //         label="First Name Of Nominated ARM"
// //         id="armFname"
// //         name="armFname"
// //         isRequired={true}
// //       />
// //       <TextInput
// //         label="Last Name Of Nominated ARM"
// //         id="armLname"
// //         name="armLname"
// //         isRequired={true}
// //       />
// //       <TextInput
// //         label="Email ID Of ARM"
// //         id="armEmail"
// //         name="armEmail"
// //         type="email"
// //         isRequired={true}
// //       />
// //       <div /> {/* Empty div for grid alignment */}
// //       <TextInput
// //         label="Mob No."
// //         id="armMobile"
// //         name="armMobile"
// //         type="tel"
// //         isRequired={true}
// //       />
// //       <TextInput
// //         label="ARM's Tel No./Ext No."
// //         id="armTele"
// //         name="armTele"
// //         type="tel"
// //         isRequired={true}
// //       />
// //     </div>
// //   );
// // }

// // export default ArmInfoSection;
// // src/components/domain-form/ArmInfoSection.jsx
// import React, { useEffect, useState } from "react";
// import TextInput from "../forms/TextInput";
// import axios from "axios";
// import { API_BASE_URL } from "../../config/env.config";
// import { useRecoilValue } from "recoil";
// import { isAuthenticatedState } from "../../recoil/atoms/authState";

// function ArmInfoSection({ domainRequest, updateDomainRequest, projectDetails }) {
//   const isAuthenticated = useRecoilValue(isAuthenticatedState);
//   const { armInfo } = domainRequest;
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);


//   if(!projectDetails.arm)
//     return <p>Arm Details are loading</p>


//   const onChangeHandler = (e)=>{
//     const { name, value } = e.target;
//     updateDomainRequest('armInfo', {
//       ...armInfo,
//       [name]: value,
//     });
//   };


//   // useEffect(() => {
//   //   if (!armEmpNo) return; // Don't fetch if armEmpNo is not provided

//   //   const fetchArmDetails = async () => {
//   //     setLoading(true);
//   //     setError(null);
//   //     try {
//   //       const res = await axios.get(`${API_BASE_URL}/api/users/details/ARM/${armEmpNo}`, {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${isAuthenticated}`,
//   //         },
//   //       });

//   //       console.log("ARM RESPONSE", res.data);
//   //       // Update the armInfo section with the response data.
//   //       updateDomainRequest("armInfo", {
//   //         ...armInfo,
//   //         empNo: res.data.emp_no,
//   //         fname: res.data.arm_fname,
//   //         lname: res.data.arm_lname,
//   //         email: res.data.email_id,
//   //         designation: res.data.desig,
//   //         teleNumber: res.data.tele_no,
//   //         mobileNumber: res.data.mob_no,
//   //         centreId: res.data.centre_id,
//   //         groupId: res.data.grp_id,
//   //       });
//   //     } catch (error) {
//   //       console.error("ERROR OCCURRED FETCHING ARM DETAILS", error);
//   //       setError("Failed to load ARM details. Please verify the employee number and try again.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchArmDetails();
//   // }, [armEmpNo, isAuthenticated, updateDomainRequest, armInfo]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       {/* Show error message, if any */}
//       {error && (
//         <div className="md:col-span-2 text-red-600">
//           {error}
//         </div>
//       )}
//       {/* Show loading indicator */}
//       {loading && (
//         <div className="md:col-span-2 text-gray-500">
//           Loading ARM details...
//         </div>
//       )}
      
//       {/* ARM Employee Number – typically this input could trigger the fetch */}
//       <TextInput
//         label="Employee Number of ARM"
//         id="armEmpNo"
//         name="armEmpNo"
//         isRequired={true}
//         placeholder="Enter ARM's Employee No."
//         value = {projectDetails.arm_emp_no}
//         readOnly={true}
//       />
//       <div /> {/* Empty div for grid alignment */}
//       <TextInput
//         label="First Name Of Nominated ARM"
//         id="armFname"
//         name="armFname"
//         isRequired={true}
//         readOnly={true}
//         value={projectDetails.arm.arm_fname || ""}
//         // onChange={() => {}} // Field is auto-filled; change handler not required
//       />
//       <TextInput
//         label="Last Name Of Nominated ARM"
//         id="armLname"
//         name="armLname"
//         isRequired={true}
//         readOnly={true}
//         value={projectDetails.arm.arm_lname || ""}
//         // onChange={() => {}}
//       />
//       <TextInput
//         label="Email ID Of ARM"
//         id="armEmail"
//         name="armEmail"
//         type="email"
//         isRequired={true}
//         readOnly={true}
//         value={projectDetails.arm.email_id || ""}
//         // onChange={armInfo}
//       />
//       <div /> {/* Empty div for grid alignment */}
//       <TextInput
//         label="Mob No."
//         id="armMobile"
//         name="mobileNumber"
//         type="tel"
//         isRequired={true}
//         value={armInfo.mobileNumber}
//         onChange={onChangeHandler}
//       />
//       <TextInput
//         label="ARM's Tel No./Ext No."
//         id="armTele"
//         name="teleNumber"
//         type="tel"
//         isRequired={true}
//         value={armInfo.teleNumber}
//         onChange={onChangeHandler}
//       />
//     </div>
//   );
// }

// export default ArmInfoSection;



// src/components/domain-form/ArmInfoSection.jsx
// import React, { useState } from "react"; // Removed useEffect as it's commented out/replaced by prop
// import axios from "axios"; // Keep for potential future fetch logic
// import { API_BASE_URL } from "../../config/env.config"; // Keep for potential future fetch logic
// import { useRecoilValue } from "recoil"; // Keep for potential future fetch logic
// import { isAuthenticatedState } from "../../recoil/atoms/authState";
// import { FaUser, FaEnvelope, FaPhone, FaSpinner, FaExclamationTriangle } from "react-icons/fa"; // Import icons

// // Assuming TextInput applies base input styles. If not, define inputBaseClass here.
// // const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

// // Reusable TextInput component structure (if not already defined elsewhere)
// // This is just for context; use your actual TextInput component.
// const TextInput = ({ label, id, isRequired, icon, readOnly, className = '', ...props }) => {
//     const labelClass = "block text-sm font-medium text-slate-700 mb-1";
//     const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed";
//     const IconComponent = icon;

//     return (
//         <div>
//             <label htmlFor={id} className={labelClass}>
//                 {label} {isRequired && <span className="text-red-500 ml-1">*</span>}
//             </label>
//             <div className="relative mt-1 rounded-md shadow-sm">
//                 {IconComponent && (
//                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <IconComponent className="h-5 w-5 text-slate-400" aria-hidden="true" />
//                     </div>
//                 )}
//                 <input
//                     id={id}
//                     readOnly={readOnly}
//                     disabled={readOnly} // Use disabled for better semantics and default styling
//                     className={`${inputBaseClass} ${IconComponent ? 'pl-10' : ''} ${readOnly ? 'bg-slate-100 cursor-not-allowed' : ''} ${className}`}
//                     {...props}
//                 />
//             </div>
//         </div>
//     );
// };


// function ArmInfoSection({ domainRequest, updateDomainRequest, projectDetails }) {
//   const isAuthenticated = useRecoilValue(isAuthenticatedState); // Keep if needed for future actions
//   const { armInfo } = domainRequest;
//   const [error, setError] = useState(null); // Keep local error state if fetch logic is added back
//   const [loading, setLoading] = useState(false); // Keep local loading state

//   // --- Handler for editable fields ---
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     updateDomainRequest("armInfo", {
//       ...armInfo, // Spread existing armInfo from domainRequest
//       // Update specific fields from the form
//       [name]: value,
//       // Ensure other potentially pre-filled data isn't lost if needed
//       empNo: projectDetails?.arm_emp_no,
//       fname: projectDetails?.arm?.arm_fname,
//       lname: projectDetails?.arm?.arm_lname,
//       email: projectDetails?.arm?.email_id,
//       // Add other fields from projectDetails.arm if they should persist
//       designation: projectDetails?.arm?.desig,
//       centreId: projectDetails?.arm?.centre_id,
//       groupId: projectDetails?.arm?.grp_id,
//     });
//   };

//    // --- Simulate loading or show message if ARM details are missing ---
//    // Improved loading/missing state message
//    if (loading) {
//      return (
//         <div className="flex items-center justify-center p-6 text-slate-500 bg-slate-50 rounded-md border border-slate-200">
//              <FaSpinner className="animate-spin mr-3 h-5 w-5" />
//              <span>Loading ARM details...</span>
//          </div>
//      );
//    }

//    if (!projectDetails || !projectDetails.arm) {
//     return (
//         <div className="p-4 text-sm text-center text-slate-600 bg-slate-100 rounded-md border border-slate-200">
//             ARM (Alternate Relationship Manager) details are not available for this project yet.
//         </div>
//     );
//    }

//    // --- ARM details are available, render the form ---
//   return (
//     // Added padding, border, bg for visual grouping, consistent spacing
//     <div className="border border-slate-200 rounded-md p-6 space-y-6 bg-slate-50/50">
//         <h3 className="text-lg font-medium leading-6 text-slate-900 border-b border-slate-200 pb-3 mb-6">
//             ARM (Alternate Relationship Manager) Details
//         </h3>

//         {/* Display fetch error if it occurs */}
//         {error && (
//             <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
//                 <FaExclamationTriangle className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
//                 <span>{error}</span>
//             </div>
//         )}

//         {/* Grid layout for the fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

//             {/* ARM Employee Number */}
//             <TextInput
//                 label="Employee Number"
//                 id="armEmpNo"
//                 name="empNo" // Match state key if needed, but it's readOnly
//                 isRequired={true}
//                 placeholder="ARM Employee No."
//                 value={projectDetails.arm_emp_no || ""}
//                 readOnly={true}
//                 icon={FaUser} // Icon for user/employee number
//             />
//             {/* Placeholder/ARM Designation (Read Only) */}
//              <TextInput
//                 label="Designation"
//                 id="armDesignation"
//                 name="designation"
//                 value={projectDetails.arm.desig || "N/A"} // Display designation
//                 readOnly={true}
//             />


//             {/* First Name */}
//             <TextInput
//                 label="First Name"
//                 id="armFname"
//                 name="fname" // Match state key if needed
//                 isRequired={true}
//                 value={projectDetails.arm.arm_fname || ""}
//                 readOnly={true}
//              />

//             {/* Last Name */}
//             <TextInput
//                 label="Last Name"
//                 id="armLname"
//                 name="lname" // Match state key if needed
//                 isRequired={true}
//                 value={projectDetails.arm.arm_lname || ""}
//                 readOnly={true}
//             />

//             {/* Email ID */}
//             <TextInput
//                 label="Email ID"
//                 id="armEmail"
//                 name="email" // Match state key if needed
//                 type="email"
//                 isRequired={true}
//                 value={projectDetails.arm.email_id || ""}
//                 readOnly={true}
//                 icon={FaEnvelope} // Icon for email
//             />

//              {/* Empty div for alignment */}
//             {/* <div /> */}


//             {/* Mobile Number (Editable) */}
//             <TextInput
//                 label="Mobile No."
//                 id="armMobile"
//                 name="mobileNumber" // Key in armInfo state to update
//                 type="tel"
//                 isRequired={true}
//                 placeholder="Enter 10-digit mobile number"
//                 pattern="[0-9]{10}" // Basic pattern validation
//                 title="Please enter a 10-digit mobile number"
//                 value={armInfo.mobileNumber || ""} // Controlled component value from state
//                 onChange={onChangeHandler} // Use the handler to update state
//                 icon={FaPhone} // Icon for phone
//             />

//             {/* Telephone Number (Editable) */}
//             <TextInput
//                 label="Telephone No. / Ext No."
//                 id="armTele"
//                 name="teleNumber" // Key in armInfo state to update
//                 type="tel"
//                 isRequired={true} // Assuming it's required
//                 placeholder="Include STD code or Extension"
//                 value={armInfo.teleNumber || ""} // Controlled component value from state
//                 onChange={onChangeHandler} // Use the handler to update state
//                 icon={FaPhone} // Icon for phone
//             />


//         </div>
//     </div>
//   );
// }

// export default ArmInfoSection;






// src/components/domain-form/ArmInfoSection.jsx
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../recoil/atoms/authState";
import { FaUser, FaEnvelope, FaPhone, FaSpinner, FaExclamationTriangle, FaIdBadge } from "react-icons/fa"; // Added FaIdBadge for Designation

// Reusable TextInput component structure (Used for other fields)
// This is just for context; use your actual TextInput component.
const TextInput = ({ label, id, isRequired, icon, readOnly, className = '', ...props }) => {
    const labelClass = "block text-sm font-medium text-slate-700 mb-1";
    const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed"; // Added disabled text color
    const IconComponent = icon;

    return (
        <div>
            <label htmlFor={id} className={labelClass}>
                {label} {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                {IconComponent && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <IconComponent className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                )}
                <input
                    id={id}
                    readOnly={readOnly}
                    disabled={readOnly}
                    className={`${inputBaseClass} ${IconComponent ? 'pl-10' : ''} ${readOnly ? 'bg-slate-100 cursor-not-allowed' : ''} ${className}`}
                    {...props}
                />
            </div>
        </div>
    );
};


function ArmInfoSection({ domainRequest, updateDomainRequest, projectDetails }) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const { armInfo } = domainRequest;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Styling & Helpers ---
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed";
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  // --- Handler for editable fields ---
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    // Prevent non-numeric input for mobile/tele numbers if desired
    if ((name === "mobileNumber" || name === "teleNumber") && value && !/^\d*$/.test(value)) {
        return; // Or provide feedback
    }

    updateDomainRequest("armInfo", {
      ...armInfo,
      [name]: value,
      // Persist other pre-filled data from projectDetails if necessary
      empNo: projectDetails?.arm_emp_no,
      fname: projectDetails?.arm?.arm_fname,
      lname: projectDetails?.arm?.arm_lname,
      email: projectDetails?.arm?.email_id,
      designation: projectDetails?.arm?.desig,
      centreId: projectDetails?.arm?.centre_id,
      groupId: projectDetails?.arm?.grp_id,
    });
  };

   // --- Loading/Missing State ---
   if (loading) {
     return (
        <div className="flex items-center justify-center p-6 text-slate-500 bg-slate-50 rounded-md border border-slate-200">
             <FaSpinner className="animate-spin mr-3 h-5 w-5" />
             <span>Loading ARM details...</span>
         </div>
     );
   }
   if (!projectDetails || !projectDetails.arm) {
    return (
        <div className="p-4 text-sm text-center text-slate-600 bg-slate-100 rounded-md border border-slate-200">
            ARM (Alternate Relationship Manager) details are not available for this project yet.
        </div>
    );
   }

   // --- Render Form ---
  return (
    <div className="border border-slate-200 rounded-md p-6 space-y-6 bg-slate-50/50">
        <h3 className="text-lg font-medium leading-6 text-slate-900 border-b border-slate-200 pb-3 mb-6">
            ARM (Alternate Responsible Member) Details
        </h3>

        {error && (
            <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
                <FaExclamationTriangle className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                <span>{error}</span>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

            {/* Read-only fields using TextInput component */}
            <TextInput
                label="Employee Number"
                id="armEmpNo"
                name="empNo"
                isRequired={true} // Assuming required display
                value={projectDetails.arm_emp_no || ""}
                readOnly={true}
                icon={FaUser}
            />
             <TextInput
                label="Designation"
                id="armDesignation"
                name="designation"
                value={projectDetails.arm.desig || "N/A"}
                readOnly={true}
                icon={FaIdBadge} // Icon for designation
            />
            <TextInput
                label="First Name"
                id="armFname"
                name="fname"
                isRequired={true}
                value={projectDetails.arm.arm_fname || ""}
                readOnly={true}
             />
            <TextInput
                label="Last Name"
                id="armLname"
                name="lname"
                isRequired={true}
                value={projectDetails.arm.arm_lname || ""}
                readOnly={true}
            />
            <TextInput
                label="Email ID"
                id="armEmail"
                name="email"
                type="email"
                isRequired={true}
                value={projectDetails.arm.email_id || ""}
                readOnly={true}
                icon={FaEnvelope}
            />

             {/* --- Mobile Number (Editable with +91 Prefix) --- */}
             {/* Manually structured input field for prefix control */}
             <div>
                <label htmlFor="armMobile" className={labelClass}>
                    Mobile No. <RequiredAsterisk />
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    {/* Icon */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaPhone className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    {/* +91 Prefix Span */}
                    <span className="pointer-events-none absolute inset-y-0 left-10 flex items-center pl-1 text-slate-500 sm:text-sm">
                        +91
                    </span>
                    {/* Input element */}
                    <input
                        type="tel" // Use tel for semantic meaning and mobile keyboards
                        id="armMobile"
                        name="mobileNumber" // Key in armInfo state to update
                        required
                        className={`${inputBaseClass} pl-[4.5rem]`} // Adjusted padding for icon + prefix
                        placeholder="9876543210"
                        value={armInfo.mobileNumber || ""} // Controlled component value from state
                        onChange={onChangeHandler} // Use the handler to update state
                        pattern="[6-9][0-9]{9}" // Basic Indian mobile number pattern
                        title="Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
                        maxLength="10" // Enforce 10 digits for the number part
                    />
                </div>
            </div>


            {/* Telephone Number (Editable - using TextInput) */}
            <TextInput
                label="Telephone No. / Ext No."
                id="armTele"
                name="teleNumber" // Key in armInfo state to update
                type="tel"
                isRequired={true} // Assuming it's required
                placeholder="Include STD code or Extension"
                value={armInfo.teleNumber || ""} // Controlled component value from state
                onChange={onChangeHandler} // Use the handler to update state
                icon={FaPhone} // Icon for phone
            />

        </div>
    </div>
  );
}

export default ArmInfoSection;
