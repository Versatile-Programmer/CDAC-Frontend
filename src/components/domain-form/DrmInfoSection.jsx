

// // src/components/domain-form/DrmInfoSection.jsx
// import React from "react";
// import TextInput from "../forms/TextInput";
// import RadioGroup from "../forms/RadioGroup";
// import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon

// function DrmInfoSection({
//   user,
//   domainRequest,
//   updateDomainRequest,
//   projectDetails,
// }) {
//   // Destructure for cleaner access
//   const { drmInfo, domainDetails } = domainRequest;

//   // Ensure projectDetails and projectDetails.drm exist before trying to access them
//   if (!projectDetails?.drm) {
//     return <p className="text-center text-gray-500 py-4">Loading DRM info...</p>;
//   }

//   // Handler for fields related to drmInfo
//   const onChangeHandlerDrm = (e) => {
//     const { name, value } = e.target;
//     // No logic change: Original update logic retained
//     updateDomainRequest("drmInfo", {
//       ...domainRequest.drmInfo, // Use domainRequest directly as per original logic
//       [name]: value,
//     });
//   };

//   // Handler for fields related to domainDetails
//   const onChangeHandlerDomain = (e) => {
//     const { name, value } = e.target;
//     // No logic change: Original update logic retained
//     updateDomainRequest("domainDetails", {
//       ...domainRequest.domainDetails, // Use domainRequest directly
//       [name]: value,
//     });
//   };

//   // Function to get today's date in YYYY-MM-DD format
//   const getTodayDateString = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0]; // YYYY-MM-DD
//   };

//   const todayDate = getTodayDateString(); // Get today's date once

//   // Helper for adding required asterisk
//   const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

//   // Base input styling for consistency
//   const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
//   const readOnlyInputClass = `${inputBaseClass} bg-slate-100 cursor-not-allowed text-slate-600`;
//   const labelClass = "block text-sm font-medium text-slate-700 mb-1";

//   return (
//     // Increased vertical gap
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

//       {/* --- Read-only Fields --- */}
//       <div>
//         <label className={labelClass}>DRM First Name</label>
//         <input type="text" value={projectDetails.drm.drm_fname || ""} readOnly className={readOnlyInputClass} />
//       </div>
//       <div>
//         <label className={labelClass}>DRM Last Name</label>
//         <input type="text" value={projectDetails.drm.drm_lname || ""} readOnly className={readOnlyInputClass} />
//       </div>

//       {/* --- Date Field - Editable, Future Only, Appealing --- */}
//       <div>
//         <label htmlFor="drmAssignDate" className={labelClass}>
//           Date Assigned <RequiredAsterisk />
//         </label>
//         <div className="relative mt-1">
//           {/* Input: Defaults to today, min set to today */}
//           <input
//             type="date"
//             id="drmAssignDate"
//             name="drmAssignDate" // Assuming this name is handled by parent if date needs saving
//             required
//             className={`${inputBaseClass} pr-10`} // Add padding for icon
//             defaultValue={todayDate} // Default value, allows user editing
//             min={todayDate} // Prevent selecting past dates
//             // No max attribute needed to allow future dates
//             // No onChange handler here as per "no logic change" request
//           />
//           {/* Icon */}
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//             <FaCalendarAlt className="h-5 w-5 text-slate-400" aria-hidden="true" />
//           </div>
//         </div>
//       </div>

//       <div>
//         <label className={labelClass}>Employee Number</label>
//         <input type="text" value={projectDetails.drm.emp_no || user.id || ""} readOnly className={readOnlyInputClass} />
//       </div>

//       <div>
//         <label className={labelClass}>Group</label>
//         <input type="text" value={projectDetails.drm.grp_description || user.employeeGroup || ""} readOnly className={readOnlyInputClass} />
//       </div>

//       {/* --- Editable Fields (Assuming Designation is editable based on original code) --- */}
//       <div>
//         <label htmlFor="drmDesignation" className={labelClass}>
//             Designation <RequiredAsterisk />
//         </label>
//         <input
//             type="text"
//             id="drmDesignation"
//             name="designation"
//             required
//             className={inputBaseClass}
//             value={drmInfo.designation || ""} // Controlled input if editable
//             onChange={onChangeHandlerDrm} // Retained original handler
//             placeholder="Enter Designation"
//          />
//       </div>

//        <div>
//         <label className={labelClass}>Centre</label>
//         <input type="text" value={projectDetails.drm.centre_description || user.employeeCenter || ""} readOnly className={readOnlyInputClass} />
//       </div>

//        <div>
//         <label className={labelClass}>Email Id</label>
//         <input type="email" value={projectDetails.drm.email_id || user.employeeEmail || ""} readOnly className={readOnlyInputClass} />
//       </div>

//       {/* --- Mobile Number with +91 Prefix --- */}
//       <div>
//         <label htmlFor="drmMobile" className={labelClass}>
//           Mobile Number <RequiredAsterisk />
//         </label>
//         <div className="relative mt-1">
//           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//             <span className="text-slate-500 sm:text-sm">+91</span>
//           </div>
//           <input
//             type="tel"
//             name="mobileNumber"
//             id="drmMobile"
//             required
//             className={`${inputBaseClass} pl-10`} // Padding for prefix
//             placeholder="9876543210"
//             value={drmInfo.mobileNumber || ""}
//             onChange={onChangeHandlerDrm}
//             pattern="[6-9][0-9]{9}"
//             title="Please enter a valid 10-digit Indian mobile number."
//             maxLength="10"
//           />
//         </div>
//       </div>

//       {/* --- Tele No./Ext. No --- */}
//        <div>
//          <label htmlFor="drmTele" className={labelClass}>
//            Tele No./Ext. No <RequiredAsterisk />
//          </label>
//          <input
//             type="tel"
//             id="drmTele"
//             name="teleNumber"
//             required
//             className={inputBaseClass}
//             value={drmInfo.teleNumber || ""}
//             onChange={onChangeHandlerDrm}
//           />
//        </div>


//       {/* --- Service Type (Radio Group) --- */}
//       {/* Using RadioGroup component directly */}
//       <div className="md:col-span-2">
//         <RadioGroup
//           label="Service Type"
//           name="serviceType"
//           isRequired={true} // Propagates to component for label styling
//           options={[
//             { value: "INTERNAL", label: "Internal" },
//             { value: "EXTERNAL", label: "External" },
//           ]}
//           selectedValue={domainDetails.serviceType}
//           onChange={onChangeHandlerDomain}
//         />
//       </div>

//       {/* --- Domain Name --- */}
//       <div className="md:col-span-2">
//          <label htmlFor="domainName" className={labelClass}>
//            Domain Name <RequiredAsterisk />
//          </label>
//          <input
//             type="text"
//             id="domainName"
//             name="domainName"
//             required
//             className={inputBaseClass}
//             value={domainDetails.domainName || ""}
//             onChange={onChangeHandlerDomain}
//             placeholder="e.g., example.gov.in or example.org.in"
//           />
//        </div>

//       {/* --- Description --- */}
//       <div className="md:col-span-2">
//         <label htmlFor="domainDescription" className={labelClass}>
//           Description <RequiredAsterisk />
//         </label>
//         <textarea
//           id="domainDescription"
//           name="description"
//           rows="3"
//           placeholder="Detailed description of the domain name's purpose..."
//           required
//           className={inputBaseClass} // Use base class for textarea too
//           value={domainDetails.description || ""}
//           onChange={onChangeHandlerDomain}
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// export default DrmInfoSection;





// src/components/domain-form/DrmInfoSection.jsx
import React from "react";
// Removed unused imports: useState, useEffect, useRecoilValue, authTokenState, axios, API_BASE_URL, get
import RadioGroup from "../forms/RadioGroup"; // Keep RadioGroup as per target example
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaTag, FaBuilding, FaInfoCircle } from "react-icons/fa"; // Import relevant icons

// Assuming TextInput might be used elsewhere, but this component mainly uses standard inputs + RadioGroup
// If TextInput *is* used for editable fields, ensure it matches styling.

function DrmInfoSection({
  user,
  domainRequest,
  updateDomainRequest,
  projectDetails,
}) {
  // Destructure for cleaner access
  const { drmInfo, domainDetails } = domainRequest;

  // --- Loading State ---
  // Improved loading message styling
  if (!projectDetails?.drm) {
    return (
      <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-md border border-slate-200">
        Loading DRM (Domain Relationship Manager) info...
      </div>
    );
  }

  // --- Handlers ---
  // Handler for fields related to drmInfo (Mobile, Tele, Designation)
  const onChangeHandlerDrm = (e) => {
    const { name, value } = e.target;
    updateDomainRequest("drmInfo", {
      ...domainRequest.drmInfo, // Use spread from original domainRequest object
      [name]: value,
      // Persist other potential drmInfo fields if needed
    });
  };

  // Handler for fields related to domainDetails (Service Type, Domain Name, Description)
  const onChangeHandlerDomain = (e) => {
    const { name, value } = e.target;
    updateDomainRequest("domainDetails", {
      ...domainRequest.domainDetails, // Use spread from original domainRequest object
      [name]: value,
    });
  };

  // --- Helpers & Styling ---
  const getTodayDateString = () => new Date().toISOString().split("T")[0];
  const todayDate = getTodayDateString();
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  // Styling constants consistent with ArmInfoSection
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed";
  const readOnlyInputClass = `${inputBaseClass} bg-slate-100 cursor-not-allowed text-slate-600`; // Slightly darker text for read-only

  // --- Component Render ---
  return (
    // Main container with grouping styles similar to ArmInfoSection
    <div className="border border-slate-200 rounded-md p-6 space-y-6 bg-slate-50/50">
      <h3 className="text-lg font-medium leading-6 text-slate-900 border-b border-slate-200 pb-3 mb-6">
        DRM & Domain Details
      </h3>

      {/* Grid layout for fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

        {/* --- Read-only DRM Info --- */}
        {/* Use standard inputs styled as read-only, consistent with target example */}
        <div>
          <label className={labelClass}>DRM First Name</label>
          <div className="relative mt-1">
            <input type="text" value={projectDetails.drm.drm_fname || ""} readOnly disabled className={readOnlyInputClass}/>
          </div>
        </div>

        <div>
          <label className={labelClass}>DRM Last Name</label>
           <div className="relative mt-1">
             <input type="text" value={projectDetails.drm.drm_lname || ""} readOnly disabled className={readOnlyInputClass}/>
           </div>
        </div>

        {/* Date Assigned Field (Editable, styled, with icon) */}
        <div>
          <label htmlFor="drmAssignDate" className={labelClass}>
            Date Assigned <RequiredAsterisk /> {/* Assuming date is required */}
          </label>
          <div className="relative mt-1">
            <input
              type="date"
              id="drmAssignDate"
              name="drmAssignDate" // Needs to be saved somewhere if editable
              required
              className={`${inputBaseClass} pr-10`} // Padding for icon
              defaultValue={todayDate} // Defaults to today, user can change
              min={todayDate} // Only today or future dates
              // onChange={onChangeHandlerDrm} // Add if this date needs to update drmInfo state
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <FaCalendarAlt className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Employee Number</label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input type="text" value={projectDetails.drm.emp_no || user.id || ""} readOnly disabled className={`${readOnlyInputClass} pl-10`}/>
          </div>
        </div>

         <div>
          <label className={labelClass}>Group</label>
           <div className="relative mt-1 rounded-md shadow-sm">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <FaTag className="h-5 w-5 text-slate-400" aria-hidden="true" /> {/* Example icon */}
             </div>
             <input type="text" value={projectDetails.drm.grp_description || user.employeeGroup || ""} readOnly disabled className={`${readOnlyInputClass} pl-10`}/>
           </div>
        </div>

        {/* --- Editable Designation --- */}
        <div>
          <label htmlFor="drmDesignation" className={labelClass}>
              Designation <RequiredAsterisk />
          </label>
          <div className="relative mt-1">
              {/* Assuming simple text input is sufficient */}
             <input
                type="text"
                id="drmDesignation"
                name="designation" // Maps to drmInfo state
                required
                className={inputBaseClass} // Standard editable style
                value={drmInfo.designation || ""} // Controlled input
                onChange={onChangeHandlerDrm}
                placeholder="Enter DRM's Designation"
             />
           </div>
        </div>

        <div>
          <label className={labelClass}>Centre</label>
          <div className="relative mt-1 rounded-md shadow-sm">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <FaBuilding className="h-5 w-5 text-slate-400" aria-hidden="true" /> {/* Example icon */}
             </div>
             <input type="text" value={projectDetails.drm.centre_description || user.employeeCenter || ""} readOnly disabled className={`${readOnlyInputClass} pl-10`}/>
           </div>
        </div>

        <div>
          <label className={labelClass}>Email ID</label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input type="email" value={projectDetails.drm.email_id || user.employeeEmail || ""} readOnly disabled className={`${readOnlyInputClass} pl-10`}/>
          </div>
        </div>


        {/* --- Editable Mobile Number --- */}
        <div>
          <label htmlFor="drmMobile" className={labelClass}>
            Mobile Number <RequiredAsterisk />
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            {/* Icon inside */}
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaPhone className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
             {/* +91 Prefix */}
            <span className="absolute inset-y-0 left-10 flex items-center pl-1 text-slate-500 sm:text-sm">+91</span>
            <input
              type="tel"
              name="mobileNumber" // Maps to drmInfo state
              id="drmMobile"
              required
              className={`${inputBaseClass} pl-[4.5rem]`} // Adjusted padding for icon + prefix
              placeholder="9876543210"
              value={drmInfo.mobileNumber || ""} // Controlled input
              onChange={onChangeHandlerDrm}
              pattern="[6-9][0-9]{9}"
              title="Please enter a valid 10-digit Indian mobile number."
              maxLength="10"
            />
          </div>
        </div>

        {/* --- Editable Tele No./Ext. No --- */}
        <div>
           <label htmlFor="drmTele" className={labelClass}>
             Tele No./Ext. No <RequiredAsterisk />
           </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                   <FaPhone className="h-5 w-5 text-slate-400" aria-hidden="true" />
                 </div>
                 <input
                    type="tel"
                    id="drmTele"
                    name="teleNumber" // Maps to drmInfo state
                    required
                    className={`${inputBaseClass} pl-10`} // Padding for icon
                    value={drmInfo.teleNumber || ""} // Controlled input
                    onChange={onChangeHandlerDrm}
                    placeholder="Include STD code or Extension"
                  />
            </div>
        </div>


        {/* --- Domain Details Section --- */}
        {/* Separator/Sub-header (Optional) */}
         <div className="md:col-span-2 pt-4 border-t border-slate-200">
             <h4 className="text-md font-medium text-slate-800 mb-4">Domain Specifics</h4>
         </div>

        {/* Service Type (Using RadioGroup Component) */}
        <div className="md:col-span-2">
          {/* Assuming RadioGroup handles its own label styling internally based on isRequired */}
          <RadioGroup
            label="Service Type"
            name="serviceType" // Maps to domainDetails state
            isRequired={true}
            options={[
              { value: "INTERNAL", label: "Internal" },
              { value: "EXTERNAL", label: "External" },
            ]}
            selectedValue={domainDetails.serviceType}
            onChange={onChangeHandlerDomain}
            // Add props for styling if RadioGroup supports it, e.g., layout="horizontal"
          />
        </div>

        {/* Domain Name */}
        <div className="md:col-span-2">
           <label htmlFor="domainName" className={labelClass}>
             Requested Domain Name <RequiredAsterisk />
           </label>
           <div className="relative mt-1">
             <input
                type="text"
                id="domainName"
                name="domainName" // Maps to domainDetails state
                required
                className={inputBaseClass}
                value={domainDetails.domainName || ""} // Controlled input
                onChange={onChangeHandlerDomain}
                placeholder="e.g., projectname.gov.in or projectname.org.in"
              />
           </div>
            <p className="mt-1 text-xs text-slate-500">Enter the full domain name required (e.g., including .gov.in, .org.in).</p>
         </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="domainDescription" className={labelClass}>
            Purpose / Description <RequiredAsterisk />
          </label>
          <div className="relative mt-1">
              <textarea
                id="domainDescription"
                name="description" // Maps to domainDetails state
                rows="4" // Increased rows slightly
                placeholder="Briefly explain the purpose of this domain name, who will access it, and what service it provides..."
                required
                className={inputBaseClass} // Consistent styling
                value={domainDetails.description || ""} // Controlled input
                onChange={onChangeHandlerDomain}
              ></textarea>
          </div>
           <p className="mt-1 text-xs text-slate-500">Provide enough detail for the approving authority to understand the request.</p>
        </div>

      </div> {/* End Grid */}
    </div> // End Main Container
  );
}

export default DrmInfoSection;