
// src/components/domain-form/IpInfoSection.jsx
// import React, { useState } from "react";

// function IpInfoSection({ domainRequest, updateDomainRequest }) {

//   const { ipDetails } = domainRequest;
//   const [ipError, setIpError] = useState(""); // State for IP validation error message

//   // Corrected, reliable Regex for validating both IPv4 and IPv6 addresses
//   // This version is widely used and tested.
//   const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;


//   const validateIpAddress = (ip) => {
//     if (!ip) { // Allow empty initially
//         setIpError("");
//         return true;
//     }
//     // Use the corrected ipRegex here
//     if (!ipRegex.test(ip)) {
//         setIpError("Please enter a valid IPv4 or IPv6 address.");
//         return false;
//     }
//     setIpError(""); // Clear error if valid
//     return true;
//   };

//   const onChangeHandlerIp = (e) => {
//     let { name, value, type, checked } = e.target;

//     // Handle radio button boolean conversion
//     if (name === 'serverHardeningStatus') {
//       value = value === "true";
//     }
//     // Handle checkbox boolean conversion
//     else if (type === 'checkbox') {
//         value = checked;
//     }

//     // Validate IP address on change
//     if (name === 'publicIpAddress') {
//         validateIpAddress(value);
//     }

//     // Update parent state
//     updateDomainRequest('ipDetails', {
//       ...domainRequest.ipDetails,
//       [name]: value,
//     });
//   };

//   // --- Styling constants for consistency ---
//   const inputBaseClass = "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
//   // Add error state styling
//   const ipInputClass = `${inputBaseClass} ${ipError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300'}`;
//   const labelClass = "block text-sm font-medium text-slate-700 mb-1";
//   const radioLabelClass = "ml-2 block text-sm text-slate-800";
//   const radioInputClass = "h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500";
//   const errorTextClass = "mt-1 text-xs text-red-600"; // Class for error message

//   // Helper for adding required asterisk
//   const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

//       {/* IP Address with Validation */}
//       <div>
//         <label htmlFor="ipAddress" className={labelClass}>
//           IP Address <RequiredAsterisk />
//         </label>
//         <input
//           type="text"
//           id="ipAddress"
//           name="publicIpAddress"
//           required
//           className={ipInputClass} // Apply dynamic class based on error state
//           placeholder="e.g., 192.168.1.100 or 2401:4900::1"
//           value={ipDetails.publicIpAddress || ""}
//           onChange={onChangeHandlerIp}
//           pattern={ipRegex.source} // Pass the source of the regex object
//           title="Enter a valid IPv4 or IPv6 address"
//           aria-invalid={!!ipError} // Indicate invalid state for accessibility
//           aria-describedby={ipError ? "ip-error" : undefined} // Link error message for screen readers
//         />
//         {/* Conditionally render error message */}
//         {ipError && <p id="ip-error" className={errorTextClass}>{ipError}</p>}
//       </div>

//       {/* Issuer of IP Address */}
//       <div>
//         <label htmlFor="ipIssuer" className={labelClass}>
//           Issuer of IP Address <RequiredAsterisk />
//         </label>
//         <input
//           type="text"
//           id="ipIssuer"
//           name="ipIssuer"
//           required
//           className={`${inputBaseClass} border-slate-300`} // Ensure default border if no error state needed here
//           placeholder="e.g., NIC, NKN, Data Centre, etc."
//           value={ipDetails.ipIssuer || ""}
//           onChange={onChangeHandlerIp}
//         />
//       </div>

//       {/* Server Hardening Status - Custom Radio Group */}
//       <div className="md:col-span-2">
//         <fieldset>
//           <legend className={`${labelClass} mb-2`}>
//             Server Hardening Status <RequiredAsterisk />
//           </legend>
//           <div className="flex items-center space-x-6">
//             {/* Yes */}
//             <div className="flex items-center">
//               <input
//                 id="hardening-yes"
//                 name="serverHardeningStatus"
//                 type="radio"
//                 value="true"
//                 required
//                 className={radioInputClass}
//                 checked={ipDetails.serverHardeningStatus === true}
//                 onChange={onChangeHandlerIp}
//               />
//               <label htmlFor="hardening-yes" className={radioLabelClass}>
//                 Yes
//               </label>
//             </div>
//             {/* No */}
//             <div className="flex items-center">
//               <input
//                 id="hardening-no"
//                 name="serverHardeningStatus"
//                 type="radio"
//                 value="false"
//                 required
//                 className={radioInputClass}
//                 checked={ipDetails.serverHardeningStatus === false}
//                 onChange={onChangeHandlerIp}
//               />
//               <label htmlFor="hardening-no" className={radioLabelClass}>
//                 No
//               </label>
//             </div>
//           </div>
//         </fieldset>
//       </div>
//     </div>
//   );
// }

// export default IpInfoSection;


import React from 'react';
// It's recommended to have react-icons installed: npm install react-icons
import { CgSpinner } from 'react-icons/cg';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * IP Information form section with real-time validation feedback.
 * This component is now a "controlled" validation component, relying on its parent
 * for validation logic and state (isCheckingIp, ipError, isIpValid).
 */
function IpInfoSection({
  domainRequest,
  updateDomainRequest,
  onIpBlur,
  isCheckingIp,
  ipError,
  isIpValid, // The new prop that correctly tracks validation success
}) {
  const { ipDetails } = domainRequest;

  // This handler simply updates the parent's state.
  const onChangeHandler = (e) => {
    let { name, value, type, checked } = e.target;

    if (name === 'serverHardeningStatus') {
      value = value === 'true';
    } else if (type === 'checkbox') {
      value = checked;
    }

    updateDomainRequest('ipDetails', {
      ...domainRequest.ipDetails,
      [name]: value,
    });
  };

  // This handler triggers the validation logic in the parent component.
  const handleIpBlur = (e) => {
    onIpBlur(e.target.value);
  };

  // --- Styling constants ---
  const inputBaseClass = "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const ipInputClass = `${inputBaseClass} ${ipError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300'}`;
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const radioLabelClass = "ml-2 block text-sm text-slate-800";
  const radioInputClass = "h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500";
  const errorTextClass = "mt-1 text-xs text-red-600";
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
      {/* IP Address with Validation */}
      <div className="relative">
        <label htmlFor="ipAddress" className={labelClass}>
          IP Address <RequiredAsterisk />
        </label>
        <input
          type="text"
          id="ipAddress"
          name="publicIpAddress"
          required
          className={ipInputClass}
          placeholder="e.g., 192.168.1.100"
          value={ipDetails.publicIpAddress || ''}
          onChange={onChangeHandler}
          onBlur={handleIpBlur}
          aria-invalid={!!ipError}
          aria-describedby={ipError ? 'ip-error' : undefined}
        />
        {/* Real-time feedback icon logic */}
        <div className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center pointer-events-none">
          {isCheckingIp && <CgSpinner className="animate-spin h-5 w-5 text-gray-500" />}
          {!isCheckingIp && ipError && <FaTimesCircle className="h-5 w-5 text-red-500" />}
          
          {/* 
            THIS IS THE CORRECTED LOGIC:
            The green checkmark now ONLY appears if the IP is not being checked, 
            there is no error, AND the parent has confirmed it's valid.
          */}
          {!isCheckingIp && !ipError && isIpValid && <FaCheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        
        {/* The error message is driven by the parent's state */}
        {ipError && <p id="ip-error" className={errorTextClass}>{ipError}</p>}
      </div>

      {/* Issuer of IP Address */}
      <div>
        <label htmlFor="ipIssuer" className={labelClass}>
          Issuer of IP Address <RequiredAsterisk />
        </label>
        <input
          type="text"
          id="ipIssuer"
          name="ipIssuer"
          required
          className={`${inputBaseClass} border-slate-300`}
          placeholder="e.g., NIC, NKN, Data Centre, etc."
          value={ipDetails.ipIssuer || ''}
          onChange={onChangeHandler}
        />
      </div>

      {/* Server Hardening Status */}
      <div className="md:col-span-2">
        <fieldset>
          <legend className={`${labelClass} mb-2`}>
            Server Hardening Status <RequiredAsterisk />
          </legend>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                id="hardening-yes"
                name="serverHardeningStatus"
                type="radio"
                value="true"
                required
                className={radioInputClass}
                checked={ipDetails.serverHardeningStatus === true}
                onChange={onChangeHandler}
              />
              <label htmlFor="hardening-yes" className={radioLabelClass}>
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="hardening-no"
                name="serverHardeningStatus"
                type="radio"
                value="false"
                required
                className={radioInputClass}
                checked={ipDetails.serverHardeningStatus === false}
                onChange={onChangeHandler}
              />
              <label htmlFor="hardening-no" className={radioLabelClass}>
                No
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default IpInfoSection;