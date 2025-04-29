// // src/components/domain-form/ComplianceInfoSection.jsx
// import React from "react";
// import RadioGroup from "../forms/RadioGroup";

// function ComplianceInfoSection({domainRequest,updateDomainRequest}) {

//   const {complianceStatus} = domainRequest;

//   const onChangeHandlerGicw = (e)=>{
//     const { name, value } = e.target;
//     updateDomainRequest('complianceStatus', {
//       ...complianceStatus,
//       [name]: value,
//     });
//   };


//   return (
//     <div>
//       <RadioGroup
//         label="GIGW/ICT Compliant"
//         name="gigwCompliance"
//         isRequired={true} // Assuming required
//         options={[
//           { value: "YES", label: "Yes" },
//           { value: "NO", label: "No" },
//           { value: "NA", label: "N/a" }, // Not Applicable
//         ]}
//         selectedValue={complianceStatus.gigwCompliance} // Add state later
//         onChange={onChangeHandlerGicw} // Add state later
//       />
//       {/* Add conditional fields/notes here later if needed based on selection */}
//     </div>
//   );
// }

// export default ComplianceInfoSection;

// src/components/domain-form/ComplianceInfoSection.jsx
import React from "react";
// Removed RadioGroup import as we'll use standard HTML radios

function ComplianceInfoSection({ domainRequest, updateDomainRequest }) {
  const { complianceStatus } = domainRequest;

  const onChangeHandlerGigw = (e) => { // Renamed for clarity (gigw instead of gicw)
    const { name, value } = e.target;
    updateDomainRequest("complianceStatus", {
      ...complianceStatus,
      [name]: value,
    });
  };

  // --- Styling constants (adopted from VaptInfoSection) ---
  const labelClass = "block text-sm font-medium text-slate-700 mb-1"; // Use slate for consistency
  const radioLabelClass = "ml-2 block text-sm text-slate-800";
  const radioInputClass = "h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500";

  // Helper for required asterisk
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    // Main container with spacing similar to VaptInfoSection
    <div className="space-y-6">

      {/* GIGW/ICT Compliant Radio Group using Fieldset */}
      <fieldset>
        {/* Use legend for accessibility and consistent label styling */}
        <legend className={`${labelClass} mb-2`}>
          GIGW/ICT Compliant <RequiredAsterisk />
        </legend>
        {/* Flex container for radio options */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
          {/* Option: Yes */}
          <div className="flex items-center">
            <input
              id="gigw-yes"
              name="gigwCompliance" // Matches the state key
              type="radio"
              value="YES"
              required // Keep isRequired prop logic
              className={radioInputClass}
              checked={complianceStatus.gigwCompliance === "YES"}
              onChange={onChangeHandlerGigw}
            />
            <label htmlFor="gigw-yes" className={radioLabelClass}>
              Yes
            </label>
          </div>

          {/* Option: No */}
          <div className="flex items-center">
            <input
              id="gigw-no"
              name="gigwCompliance"
              type="radio"
              value="NO"
              required
              className={radioInputClass}
              checked={complianceStatus.gigwCompliance === "NO"}
              onChange={onChangeHandlerGigw}
            />
            <label htmlFor="gigw-no" className={radioLabelClass}>
              No
            </label>
          </div>

          {/* Option: N/a */}
          <div className="flex items-center">
            <input
              id="gigw-na"
              name="gigwCompliance"
              type="radio"
              value="NA"
              required
              className={radioInputClass}
              checked={complianceStatus.gigwCompliance === "NA"}
              onChange={onChangeHandlerGigw}
            />
            <label htmlFor="gigw-na" className={radioLabelClass}>
              N/a (Not Applicable)
            </label>
          </div>
        </div>
      </fieldset>

      {/* --- Placeholder for Conditional Fields --- */}
      {/*
        Future enhancement: Similar to VaptInfoSection, you could add conditional sections here.
        Example: If 'NO' is selected, show a reason textarea or file upload.

        const isGigwNotCompliant = complianceStatus.gigwCompliance === 'NO';

        {isGigwNotCompliant && (
          <div className="border border-orange-300 bg-orange-50/50 rounded-md p-4 mt-4 space-y-4">
             <p className="text-sm text-orange-800 flex items-center">
               <FaExclamationTriangle className="h-4 w-4 mr-2 flex-shrink-0 text-orange-600" aria-hidden="true" />
               Provide reason or upload exemption proof for non-compliance.
             </p>
             // Add input fields (textarea, file upload) here
          </div>
        )}
      */}
    </div>
  );
}

export default ComplianceInfoSection;
