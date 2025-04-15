// // src/components/domain-form/RegistrationInfoRenewalSection.jsx
// import React from "react";
// import RadioGroup from "../forms/RadioGroup";
// import TextInput from "../forms/TextInput";

// function RegistrationInfoRenewalSection({ domainRequest, updateDomainRequest }) {
//   const { domainDetails } = domainRequest;

//   // Generic change handler to update registration-related fields in domainDetails.
//   const onChangeHandlerDomain = (e) => {
//     const { name, value } = e.target;
//     updateDomainRequest("domainDetails", {
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
//           selectedValue={domainDetails.registrationType || "NEW_REGISTRATION"}
//           onChange={onChangeHandlerDomain}
//         />
//       </div>
//       <TextInput
//         label="Period (in years)"
//         id="registrationPeriod"
//         name="periodInYears"
//         type="number"
//         isRequired={true}
//         placeholder="e.g., 1"
//         value={domainDetails.periodInYears || ""}
//         onChange={onChangeHandlerDomain}
//       />
//       {/* Add more fields here if needed based on your requirements */}
//     </div>
//   );
// }

// export default RegistrationInfoRenewalSection;
// src/components/domain-form/RegistrationInfoRenewalSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";
import TextInput from "../forms/TextInput";

function RegistrationInfoRenewalSection({ domainDetails, updateDomainRenewalRequest }) {
  // Handle updates to domainDetails object
  const onChangeHandlerDomain = (e) => {
    const { name, value } = e.target;
    updateDomainRenewalRequest("domainDetails", {
      ...domainDetails,
      [name]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <div className="md:col-span-2">
        <RadioGroup
          label="Registration Type"
          name="registrationType"
          isRequired={true}
          options={[
            { value: "NEW_REGISTRATION", label: "New" },
            { value: "RENEWAL", label: "Renewal" },
          ]}
          selectedValue={"RENEWAL"}
          
          // onChange={onChangeHandlerDomain}
          
        />
      </div>
      <TextInput
        label="Period (in years)"
        id="registrationPeriod"
        name="periodInYears"
        type="number"
        isRequired={true}
        placeholder="e.g., 1"
        value={domainDetails.periodInYears || ""}
        onChange={onChangeHandlerDomain}
      />
      {/* Add more fields here if needed based on your requirements */}
    </div>
  );
}

export default RegistrationInfoRenewalSection;

