// src/components/domain-form/IpInfoSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import RadioGroup from "../forms/RadioGroup"; // Reusing RadioGroup

function IpInfoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <TextInput
        label="IP Address"
        id="ipAddress"
        name="ipAddress"
        isRequired={true}
        placeholder="e.g., 10.7.86.5"
        // value={...} // Add state later
        // onChange={...} // Add state later
      />
      <TextInput
        label="Issuer of IP Address"
        id="ipIssuer"
        name="ipIssuer"
        isRequired={true}
        placeholder="e.g., NIC, NKN, etc."
        // value={...} // Add state later
        // onChange={...} // Add state later
      />
      {/* Server Hardening Status spans both columns */}
      <div className="md:col-span-2 mt-2">
        {" "}
        {/* Added margin top */}
        <RadioGroup
          label="Server Hardening Status"
          name="serverHardeningStatus"
          isRequired={true} // Assuming this is required
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          // selectedValue={...} // Add state later
          // onChange={...} // Add state later
        />
      </div>
    </div>
  );
}

export default IpInfoSection;
