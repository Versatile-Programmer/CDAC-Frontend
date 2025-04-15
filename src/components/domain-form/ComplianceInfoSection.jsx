// src/components/domain-form/ComplianceInfoSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";

function ComplianceInfoSection({domainRequest,updateDomainRequest}) {

  const {complianceStatus} = domainRequest;

  const onChangeHandlerGicw = (e)=>{
    const { name, value } = e.target;
    updateDomainRequest('complianceStatus', {
      ...complianceStatus,
      [name]: value,
    });
  };


  return (
    <div>
      <RadioGroup
        label="GIGW/ICT Compliant"
        name="gigwCompliance"
        isRequired={true} // Assuming required
        options={[
          { value: "YES", label: "Yes" },
          { value: "NO", label: "No" },
          { value: "NA", label: "N/a" }, // Not Applicable
        ]}
        selectedValue={complianceStatus.gigwCompliance} // Add state later
        onChange={onChangeHandlerGicw} // Add state later
      />
      {/* Add conditional fields/notes here later if needed based on selection */}
    </div>
  );
}

export default ComplianceInfoSection;
