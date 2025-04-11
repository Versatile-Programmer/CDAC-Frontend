// src/components/domain-form/ComplianceInfoSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";

function ComplianceInfoSection() {
  return (
    <div>
      <RadioGroup
        label="GIGW/ICT Compliant"
        name="gigwIctCompliant"
        isRequired={true} // Assuming required
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
          { value: "NA", label: "NA" }, // Not Applicable
        ]}
        // selectedValue={...} // Add state later
        // onChange={...} // Add state later
      />
      {/* Add conditional fields/notes here later if needed based on selection */}
    </div>
  );
}

export default ComplianceInfoSection;
