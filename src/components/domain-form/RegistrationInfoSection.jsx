// src/components/domain-form/RegistrationInfoSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";
import TextInput from "../forms/TextInput";

function RegistrationInfoSection({domainRequest,updateDomainRequest}) {

  const {domainDetails} = domainRequest

  const onChangeHandlerDomain = (e)=>{
    const { name, value } = e.target;
    updateDomainRequest('domainDetails', {
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
          selectedValue={"NEW"} // Add state later
          // onChange={...} // Add state later
        />
      </div>
      <TextInput
        label="Period (in years)"
        id="registrationPeriod"
        name="periodInYears"
        type="number"
        isRequired={true}
        placeholder="e.g., 1"
        // value={...} // Add state later
        onChange={onChangeHandlerDomain} // Add state later
      />
      {/* Potentially add more fields here if needed based on New/Renewal selection later */}
    </div>
  );
}
export default RegistrationInfoSection;
