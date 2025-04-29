// // src/components/domain-form/MouInfoSection.jsx
// import React from "react";
// import RadioGroup from "../forms/RadioGroup";

// function MouInfoSection({domainRequest,updateDomainRequest}) {

//   const {complianceStatus} = domainRequest;

//   const onChangeHandlerMou = (e)=>{
//     const { name, value } = e.target;
//     updateDomainRequest('complianceStatus', {
//       ...complianceStatus,
//       [name]: value,
//     });
//   };
//   return (
//     <div>
//       <RadioGroup
//         label="MOU Status"
//         name="mouStatus"
//         isRequired={true} // Assuming required
//         options={[
//           { value: "YES", label: "Yes" },
//           { value: "NO", label: "No" },
//           { value: "NA", label: "N/a" }, // Not Applicable
//         ]}
//         selectedValue={complianceStatus.mouStatus} // Add state later
//         onChange={onChangeHandlerMou} // Add state later
//       />
//       {/* Add conditional fields (e.g., MOU upload) here later if needed based on selection */}
//     </div>
//   );
// }

// export default MouInfoSection;

// src/components/domain-form/MouInfoSection.jsx
import React from "react";
// Removed RadioGroup import as we'll use standard HTML radios

function MouInfoSection({ domainRequest, updateDomainRequest }) {
  const { complianceStatus } = domainRequest;

  const onChangeHandlerMou = (e) => {
    const { name, value } = e.target;
    updateDomainRequest("complianceStatus", {
      ...complianceStatus,
      [name]: value,
    });
  };

  // --- Styling constants (adopted from VaptInfoSection/ComplianceInfoSection) ---
  const labelClass = "block text-sm font-medium text-slate-700 mb-1"; // Use slate for consistency
  const radioLabelClass = "ml-2 block text-sm text-slate-800";
  const radioInputClass = "h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500";

  // Helper for required asterisk
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    // Main container with spacing similar to other sections
    <div className="space-y-6">

      {/* MOU Status Radio Group using Fieldset */}
      <fieldset>
        {/* Use legend for accessibility and consistent label styling */}
        <legend className={`${labelClass} mb-2`}>
          MOU Status <RequiredAsterisk />
        </legend>
        {/* Flex container for radio options with responsiveness */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
          {/* Option: Yes */}
          <div className="flex items-center">
            <input
              id="mou-yes"
              name="mouStatus" // Matches the state key
              type="radio"
              value="YES"
              required // Keep isRequired prop logic
              className={radioInputClass}
              checked={complianceStatus.mouStatus === "YES"}
              onChange={onChangeHandlerMou}
            />
            <label htmlFor="mou-yes" className={radioLabelClass}>
              Yes (MOU Signed)
            </label>
          </div>

          {/* Option: No */}
          <div className="flex items-center">
            <input
              id="mou-no"
              name="mouStatus"
              type="radio"
              value="NO"
              required
              className={radioInputClass}
              checked={complianceStatus.mouStatus === "NO"}
              onChange={onChangeHandlerMou}
            />
            <label htmlFor="mou-no" className={radioLabelClass}>
              No (MOU Not Signed)
            </label>
          </div>

          {/* Option: N/a */}
          <div className="flex items-center">
            <input
              id="mou-na"
              name="mouStatus"
              type="radio"
              value="NA"
              required
              className={radioInputClass}
              checked={complianceStatus.mouStatus === "NA"}
              onChange={onChangeHandlerMou}
            />
            <label htmlFor="mou-na" className={radioLabelClass}>
              N/a (Not Applicable)
            </label>
          </div>
        </div>
      </fieldset>

      {/* --- Placeholder for Conditional Fields --- */}
      {/*
        Future enhancement: Add conditional sections here based on selection.
        Example: If 'YES' is selected, show an MOU document upload field.

        const isMouSigned = complianceStatus.mouStatus === 'YES';
        const isMouNotApplicable = complianceStatus.mouStatus === 'NA'; // Example check

        {isMouSigned && (
          <div className="border border-slate-200 rounded-md p-4 mt-4 space-y-4 bg-slate-50/50">
            <label htmlFor="mouUpload" className={labelClass}>
              Upload Signed MOU Document <RequiredAsterisk />
            </label>
            <div className="mt-1 flex items-center space-x-3">
                 <input
                    type="file"
                    id="mouUpload"
                    name="mouDocumentProof" // Example state key
                    required
                    // onChange={handleFileUpload} // Add a file upload handler
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    accept=".pdf,.doc,.docx" // Specify acceptable file types
                  />
            </div>
             <p className="mt-1 text-xs text-slate-500">Max file size: 5MB. Allowed types: PDF, DOC(X).</p>
          </div>
        )}

         {!isMouSigned && !isMouNotApplicable && ( // Show if 'NO' is selected
           <div className="border border-orange-300 bg-orange-50/50 rounded-md p-4 mt-4">
              <p className="text-sm text-orange-800">
                 Please ensure the MOU is signed before proceeding if applicable.
              </p>
           </div>
         )}
      */}
    </div>
  );
}

export default MouInfoSection;
