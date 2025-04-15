// // src/components/domain-form/ComplianceInfoRenewalSection.jsx
// import React from "react";
// import RadioGroup from "../forms/RadioGroup";

// function ComplianceInfoRenewalSection({ domainRequest, updateDomainRequest }) {
//   const { complianceStatus } = domainRequest;

//   const onChangeHandlerGIGW = (e) => {
//     const { name, value } = e.target;
//     updateDomainRequest("complianceStatus", {
//       ...complianceStatus,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <RadioGroup
//         label="GIGW/ICT Compliant"
//         name="gigwCompliance"
//         isRequired={true}
//         options={[
//           { value: "YES", label: "Yes" },
//           { value: "NO", label: "No" },
//           { value: "NA", label: "N/a" },
//         ]}
//         selectedValue={complianceStatus.gigwCompliance || ""}
//         onChange={onChangeHandlerGIGW}
//       />
//       {/* 
//         Add conditional fields/notes here later if needed based on the selection.
//         For example:
//         {complianceStatus.gigwCompliance === 'NO' && <p>Please update the compliance procedure...</p>}
//       */}
//     </div>
//   );
// }

// export default ComplianceInfoRenewalSection;
// src/components/domain-form/ComplianceInfoRenewalSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";

function ComplianceInfoRenewalSection({ complianceStatus, updateDomainRenewalRequest }) {

  const onChangeHandlerGIGW = (e) => {
    const { name, value } = e.target;
    updateDomainRenewalRequest("complianceStatus", {
      ...complianceStatus,
      [name]: value,
    });
  };

  return (
    <div>
      <RadioGroup
        label="GIGW/ICT Compliant"
        name="gigwCompliance"
        isRequired={true}
        options={[
          { value: "YES", label: "Yes" },
          { value: "NO", label: "No" },
          { value: "NA", label: "N/a" },
        ]}
        selectedValue={complianceStatus.gigwCompliance || ""}
        onChange={onChangeHandlerGIGW}
      />
      {/* Conditional section for non-compliant status */}
      {complianceStatus.gigwCompliance === "NO" && (
        <div className="mt-4 text-sm text-red-600">
          <p>Please update the compliance procedure accordingly.</p>
        </div>
      )}
    </div>
  );
}

export default ComplianceInfoRenewalSection;
