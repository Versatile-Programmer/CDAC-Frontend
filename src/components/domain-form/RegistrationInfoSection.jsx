// // src/components/domain-form/RegistrationInfoSection.jsx
// import React from "react";
// import RadioGroup from "../forms/RadioGroup";
// import TextInput from "../forms/TextInput";

// function RegistrationInfoSection({domainRequest,updateDomainRequest}) {

//   const {domainDetails} = domainRequest

//   const onChangeHandlerDomain = (e)=>{
//     const { name, value } = e.target;
//     updateDomainRequest('domainDetails', {
//       ...domainDetails,
//       [name]: value,
//     });
//   };
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       <div className="md:col-span-2">
//         <RadioGroup
//           label="Registration Type"
//           name="registrationType"
//           isRequired={true}
//           options={[
//             { value: "NEW_REGISTRATION", label: "New" },
//             { value: "RENEWAL", label: "Renewal" },
//           ]}
//           readOnly ={true}
//           selectedValue={"NEW_REGISTRATION"} // Add state later
//           // onChange={onChangeHandlerDomain} // Add state later
//         />
//       </div>
//       <TextInput
//         label="Period (in years)"
//         id="registrationPeriod"
//         name="periodInYears"
//         type="number"
//         isRequired={true}
//         placeholder="e.g., 1"
//         // value={...} // Add state later
//         onChange={onChangeHandlerDomain} // Add state later
//       />
//       {/* Potentially add more fields here if needed based on New/Renewal selection later */}
//     </div>
//   );
// }
// export default RegistrationInfoSection;



// src/components/domain-form/RegistrationInfoSection.jsx
import React from "react";
// Removed unused imports: RadioGroup, TextInput (using direct inputs/display)

function RegistrationInfoSection({ domainRequest, updateDomainRequest }) {

  const { domainDetails } = domainRequest;

  const onChangeHandlerDomain = (e) => {
    const { name, value } = e.target;
    // Ensure period is not negative and handle potential empty string
    let processedValue = value;
    if (name === "periodInYears") {
        const numValue = parseInt(value, 10);
        processedValue = isNaN(numValue) || numValue < 1 ? '' : numValue; // Reset if invalid or less than 1
    }

    // No logic change: Original update logic retained
    updateDomainRequest('domainDetails', {
      ...domainRequest.domainDetails, // Use domainRequest directly
      [name]: processedValue, // Use potentially processed value
    });
  };

  // --- Styling constants for consistency ---
  const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const readOnlyInputClass = `${inputBaseClass} bg-slate-100 cursor-not-allowed text-slate-600`;
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";

  // Helper for adding required asterisk
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    // Use consistent grid layout and spacing
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

      {/* Registration Type (Displayed as Read-only) */}
      {/* Spans both columns as per original layout */}
      <div className="md:col-span-2">
        <label htmlFor="registrationTypeDisplay" className={labelClass}>
          Registration Type {/* Removed asterisk as it's fixed */}
        </label>
        <input
            type="text"
            id="registrationTypeDisplay"
            name="registrationTypeDisplay" // Use a different name if not submitting
            readOnly={true}
            // Displaying the fixed value clearly
            value={"New Registration"}
            className={readOnlyInputClass}
         />
         {/* Hidden input to potentially hold the actual value if needed for submission */}
         <input type="hidden" name="registrationType" value={domainDetails.registrationType || "NEW_REGISTRATION"} />
      </div>

      {/* Period (in years) - Positive numbers only */}
      <div>
        <label htmlFor="registrationPeriod" className={labelClass}>
          Period (in years) <RequiredAsterisk />
        </label>
        <input
          type="number"
          id="registrationPeriod"
          name="periodInYears" // Matches state key
          required
          min="1" // Ensures value is 1 or greater
          step="1" // Suggests whole number increments
          placeholder="e.g., 1"
          className={inputBaseClass}
          value={domainDetails.periodInYears || ""} // Controlled input
          onChange={onChangeHandlerDomain}
          // Basic pattern to disallow decimals, 'e', '+', '-' - browser support varies
          pattern="\d*"
          onKeyDown={(e) => { // Prevent typing '.', 'e', '+', '-'
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </div>

      {/* Placeholder for the second column if needed, or adjust grid */}
      <div>
        {/* Empty div to maintain grid alignment if only one field */}
      </div>

    </div>
  );
}
export default RegistrationInfoSection;
