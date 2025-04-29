// // src/components/domain-form/IpInfoRenewalSection.jsx
// import React from "react";
// import TextInput from "../forms/TextInput";
// import RadioGroup from "../forms/RadioGroup";

// function IpInfoRenewalSection({ domainRequest, updateDomainRequest }) {
//   const { ipDetails } = domainRequest;

//   const onChangeHandlerIp = (e) => {
//     const { name, value } = e.target;
//     updateDomainRequest("ipDetails", {
//       ...ipDetails,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       <TextInput
//         label="IP Address"
//         id="ipAddress"
//         name="publicIpAddress"
//         isRequired={true}
//         placeholder="e.g., 10.7.86.5"
//         type="text"
//         value={ipDetails.publicIpAddress || ""}
//         onChange={onChangeHandlerIp}
//       />
//       <TextInput
//         label="Issuer of IP Address"
//         id="ipIssuer"
//         name="ipIssuer"
//         isRequired={true}
//         placeholder="e.g., NIC, NKN, etc."
//         value={ipDetails.ipIssuer || ""}
//         onChange={onChangeHandlerIp}
//       />
//       <div className="md:col-span-2 mt-2">
//         <RadioGroup
//           label="Server Hardening Status"
//           name="serverHardeningStatus"
//           isRequired={true}
//           options={[
//             { value: "YES", label: "Yes" },
//             { value: "NO", label: "No" },
//             { value: "NA", label: "N/a" },
//           ]}
//           selectedValue={ipDetails.serverHardeningStatus || ""}
//           onChange={onChangeHandlerIp}
//         />
//       </div>
//     </div>
//   );
// }

// export default IpInfoRenewalSection;
// src/components/domain-form/IpInfoRenewalSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import RadioGroup from "../forms/RadioGroup";

function IpInfoRenewalSection({ ipDetails, updateDomainRenewalRequest }) {
  // Handle updates to ipDetails object
  const onChangeHandlerIp = (e) => {
    const { name, value } = e.target;
    updateDomainRenewalRequest("ipDetails", {
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
        value={ipDetails.publicIpAddress || ""}
        onChange={onChangeHandlerIp}
      />
      <TextInput
        label="Issuer of IP Address"
        id="ipIssuer"
        name="ipIssuer"
        isRequired={true}
        placeholder="e.g., NIC, NKN, etc."
        value={ipDetails.ipIssuer || ""}
        onChange={onChangeHandlerIp}
      />
      <div className="md:col-span-2 mt-2">
        <RadioGroup
          label="Server Hardening Status"
          name="serverHardeningStatus"
          isRequired={true}
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
            // { value: "NA", label: "N/a" },
          ]}
          selectedValue={ipDetails.serverHardeningStatus}
          onChange={onChangeHandlerIp}
        />
      </div>
    </div>
  );
}

export default IpInfoRenewalSection;

