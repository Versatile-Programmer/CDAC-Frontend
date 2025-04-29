// // src/components/domain-form/IpInfoSection.jsx
// import React from "react";
// import TextInput from "../forms/TextInput";
// import RadioGroup from "../forms/RadioGroup"; // Reusing RadioGroup

// function IpInfoSection({ domainRequest, updateDomainRequest }) {


//   const { ipDetails } = domainRequest

//   const onChangeHandlerIp = (e) => {
//     const { name, value } = e.target;


//     if (name == 'serverHardeningStatus')
//       updateDomainRequest('ipDetails', {
//         ...ipDetails,
//         [name]: value === "true",
//       });
//     else
//       updateDomainRequest('ipDetails', {
//         ...ipDetails,
//         [name]: value,
//       });
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       <TextInput
//         label="IP Address"
//         id="ipAddress"
//         name="publicIpAddress"
//         isRequired={true}
//         placeholder="e.g., 10.7.86.5"
//         type="text"
//         // value={...} // Add state later
//         onChange={onChangeHandlerIp} // Add state later
//       />
//       <TextInput
//         label="Issuer of IP Address"
//         id="ipIssuer"
//         name="ipIssuer"
//         isRequired={true}
//         placeholder="e.g., NIC, NKN, etc."
//         // value={...} // Add state later
//         onChange={onChangeHandlerIp} // Add state later
//       />
//       {/* Server Hardening Status spans both columns */}
//       <div className="md:col-span-2 mt-2">
//         {" "}
//         {/* Added margin top */}
//         <RadioGroup
//           label="Server Hardening Status"
//           name="serverHardeningStatus"
//           isRequired={true} // Assuming this is required
//           options={[
//             { value: true, label: "Yes" },
//             { value: false, label: "No" },
//             // { value: "NA", label: "N/a"}
//           ]}
//           selectedValue={ipDetails.serverHardeningStatus} // Add state later
//           onChange={onChangeHandlerIp} // Add state later
//         />
//       </div>
//     </div>
//   );
// }

// export default IpInfoSection;


// src/components/domain-form/IpInfoSection.jsx
import React, { useState } from "react";

function IpInfoSection({ domainRequest, updateDomainRequest }) {

  const { ipDetails } = domainRequest;
  const [ipError, setIpError] = useState(""); // State for IP validation error message

  // Corrected, reliable Regex for validating both IPv4 and IPv6 addresses
  // This version is widely used and tested.
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;


  const validateIpAddress = (ip) => {
    if (!ip) { // Allow empty initially
        setIpError("");
        return true;
    }
    // Use the corrected ipRegex here
    if (!ipRegex.test(ip)) {
        setIpError("Please enter a valid IPv4 or IPv6 address.");
        return false;
    }
    setIpError(""); // Clear error if valid
    return true;
  };

  const onChangeHandlerIp = (e) => {
    let { name, value, type, checked } = e.target;

    // Handle radio button boolean conversion
    if (name === 'serverHardeningStatus') {
      value = value === "true";
    }
    // Handle checkbox boolean conversion
    else if (type === 'checkbox') {
        value = checked;
    }

    // Validate IP address on change
    if (name === 'publicIpAddress') {
        validateIpAddress(value);
    }

    // Update parent state
    updateDomainRequest('ipDetails', {
      ...domainRequest.ipDetails,
      [name]: value,
    });
  };

  // --- Styling constants for consistency ---
  const inputBaseClass = "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  // Add error state styling
  const ipInputClass = `${inputBaseClass} ${ipError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300'}`;
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const radioLabelClass = "ml-2 block text-sm text-slate-800";
  const radioInputClass = "h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500";
  const errorTextClass = "mt-1 text-xs text-red-600"; // Class for error message

  // Helper for adding required asterisk
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

      {/* IP Address with Validation */}
      <div>
        <label htmlFor="ipAddress" className={labelClass}>
          IP Address <RequiredAsterisk />
        </label>
        <input
          type="text"
          id="ipAddress"
          name="publicIpAddress"
          required
          className={ipInputClass} // Apply dynamic class based on error state
          placeholder="e.g., 192.168.1.100 or 2401:4900::1"
          value={ipDetails.publicIpAddress || ""}
          onChange={onChangeHandlerIp}
          pattern={ipRegex.source} // Pass the source of the regex object
          title="Enter a valid IPv4 or IPv6 address"
          aria-invalid={!!ipError} // Indicate invalid state for accessibility
          aria-describedby={ipError ? "ip-error" : undefined} // Link error message for screen readers
        />
        {/* Conditionally render error message */}
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
          className={`${inputBaseClass} border-slate-300`} // Ensure default border if no error state needed here
          placeholder="e.g., NIC, NKN, Data Centre, etc."
          value={ipDetails.ipIssuer || ""}
          onChange={onChangeHandlerIp}
        />
      </div>

      {/* Server Hardening Status - Custom Radio Group */}
      <div className="md:col-span-2">
        <fieldset>
          <legend className={`${labelClass} mb-2`}>
            Server Hardening Status <RequiredAsterisk />
          </legend>
          <div className="flex items-center space-x-6">
            {/* Yes */}
            <div className="flex items-center">
              <input
                id="hardening-yes"
                name="serverHardeningStatus"
                type="radio"
                value="true"
                required
                className={radioInputClass}
                checked={ipDetails.serverHardeningStatus === true}
                onChange={onChangeHandlerIp}
              />
              <label htmlFor="hardening-yes" className={radioLabelClass}>
                Yes
              </label>
            </div>
            {/* No */}
            <div className="flex items-center">
              <input
                id="hardening-no"
                name="serverHardeningStatus"
                type="radio"
                value="false"
                required
                className={radioInputClass}
                checked={ipDetails.serverHardeningStatus === false}
                onChange={onChangeHandlerIp}
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