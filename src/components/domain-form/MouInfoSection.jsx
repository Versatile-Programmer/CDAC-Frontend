// src/components/domain-form/MouInfoSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";

function MouInfoSection({domainRequest,updateDomainRequest}) {

  const {complianceStatus} = domainRequest;

  const onChangeHandlerMou = (e)=>{
    const { name, value } = e.target;
    updateDomainRequest('complianceStatus', {
      ...complianceStatus,
      [name]: value,
    });
  };
  return (
    <div>
      <RadioGroup
        label="MOU Status"
        name="mouStatus"
        isRequired={true} // Assuming required
        options={[
          { value: "YES", label: "Yes" },
          { value: "NO", label: "No" },
          { value: "NA", label: "N/a" }, // Not Applicable
        ]}
        selectedValue={complianceStatus.mouStatus} // Add state later
        onChange={onChangeHandlerMou} // Add state later
      />
      {/* Add conditional fields (e.g., MOU upload) here later if needed based on selection */}
    </div>
  );
}

export default MouInfoSection;
