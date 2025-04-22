// src/components/domain-form/IpInfoSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import RadioGroup from "../forms/RadioGroup"; // Reusing RadioGroup

function IpInfoSection({ domainRequest, updateDomainRequest }) {


  const { ipDetails } = domainRequest

  const onChangeHandlerIp = (e) => {
    const { name, value } = e.target;


    if (name == 'serverHardeningStatus')
      updateDomainRequest('ipDetails', {
        ...ipDetails,
        [name]: value === "true",
      });
    else
      updateDomainRequest('ipDetails', {
        ...ipDetails,
        [name]: value,
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <TextInput
        label="IP Address"
        id="ipAddress"
        name="publicIpAddress"
        isRequired={true}
        placeholder="e.g., 10.7.86.5"
        type="text"
        // value={...} // Add state later
        onChange={onChangeHandlerIp} // Add state later
      />
      <TextInput
        label="Issuer of IP Address"
        id="ipIssuer"
        name="ipIssuer"
        isRequired={true}
        placeholder="e.g., NIC, NKN, etc."
        // value={...} // Add state later
        onChange={onChangeHandlerIp} // Add state later
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
            { value: true, label: "Yes" },
            { value: false, label: "No" },
            // { value: "NA", label: "N/a"}
          ]}
          selectedValue={ipDetails.serverHardeningStatus} // Add state later
          onChange={onChangeHandlerIp} // Add state later
        />
      </div>
    </div>
  );
}

export default IpInfoSection;
