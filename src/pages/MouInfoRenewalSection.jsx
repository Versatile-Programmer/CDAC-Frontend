// // src/components/domain-form/MouInfoRenewalSection.jsx
// import React from "react";
// import RadioGroup from "../components/forms/RadioGroup";

// function MouInfoRenewalSection({ domainRequest, updateDomainRequest }) {
//   const { complianceStatus } = domainRequest;

//   const onChangeHandlerMou = (e) => {
//     const { name, value } = e.target;
//     updateDomainRequest("complianceStatus", {
//       ...complianceStatus,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <RadioGroup
//         label="MOU Status"
//         name="mouStatus"
//         isRequired={true}
//         options={[
//           { value: "YES", label: "Yes" },
//           { value: "NO", label: "No" },
//           { value: "NA", label: "N/a" },
//         ]}
//         selectedValue={complianceStatus.mouStatus || ""}
//         onChange={onChangeHandlerMou}
//       />
//       {/* 
//         Optional: Show conditional field if MOU status is "YES"
//         {complianceStatus.mouStatus === 'YES' && <MouUploadComponent />}
//       */}
//     </div>
//   );
// }

// export default MouInfoRenewalSection;
// src/components/domain-form/MouInfoRenewalSection.jsx
import React from "react";
import RadioGroup from "../components/forms/RadioGroup";

function MouInfoRenewalSection({ domainRequest, updateDomainRenewalRequest }) {
  const { complianceStatus } = domainRequest;

  const onChangeHandlerMou = (e) => {
    const { name, value } = e.target;
    // Update the 'mouStatus' within 'complianceStatus'
    updateDomainRenewalRequest("complianceStatus", {
      ...complianceStatus,
      [name]: value,
    });
  };

  return (
    <div>
      <RadioGroup
        label="MOU Status"
        name="mouStatus"
        isRequired={true}
        options={[
          { value: "YES", label: "Yes" },
          { value: "NO", label: "No" },
          { value: "NA", label: "N/a" },
        ]}
        selectedValue={complianceStatus.mouStatus || ""}
        onChange={onChangeHandlerMou}
      />
      {/* Optional: Show conditional field if MOU status is "YES" */}

      
      {/* {complianceStatus.mouStatus === "YES" && (
        <div className="mt-4">
         
          <p className="text-sm text-blue-600">Please upload your MOU file here.</p>
        </div>
      )} */}
    </div>
  );
}

export default MouInfoRenewalSection;
