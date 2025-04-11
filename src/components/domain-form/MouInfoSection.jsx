// src/components/domain-form/MouInfoSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";

function MouInfoSection() {
  return (
    <div>
      <RadioGroup
        label="MOU Status"
        name="mouStatus"
        isRequired={true} // Assuming required
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
          { value: "NA", label: "NA" }, // Not Applicable
        ]}
        // selectedValue={...} // Add state later
        // onChange={...} // Add state later
      />
      {/* Add conditional fields (e.g., MOU upload) here later if needed based on selection */}
    </div>
  );
}

export default MouInfoSection;
