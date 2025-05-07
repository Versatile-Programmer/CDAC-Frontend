// // src/components/domain-form/VaptInfoRenewalSection.jsx
// import React from "react";
// import RadioGroup from "../forms/RadioGroup";
// import TextInput from "../forms/TextInput";

// function VaptInfoRenewalSection({ domainRequest, updateDomainRenewalRequest }) {
//   const { vaptCompliance } = domainRequest;

//   const onChangeHandlerVapt = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       updateDomainRenewalRequest("vaptCompliance", {
//         ...vaptCompliance,
//         [name]: files[0] || null,
//       });
//     } else {
//       updateDomainRenewalRequest("vaptCompliance", {
//         ...vaptCompliance,
//         [name]: value,
//       });
//     }
//   };

//   // Determine compliance based on the prepopulated value.
//   const isVaptCompliant = vaptCompliance.compliant === "YES";
//   const isVaptNotCompliant = vaptCompliance.compliant === "NO";

//   return (
//     <div className="space-y-4">
//       <RadioGroup
//         label="VAPT (Vulnerability Assessment & Penetration Testing) Compliant"
//         name="compliant"
//         isRequired={true}
//         options={[
//           { value: "YES", label: "Yes" },
//           { value: "NO", label: "No" },
//           { value: "NA", label: "N/a" },
//         ]}
//         selectedValue={vaptCompliance.compliant || ""}
//         onChange={onChangeHandlerVapt}
//       />

//       {isVaptCompliant && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 border-t pt-4 mt-4">
//           <TextInput
//             label="VAPT Certifying Authority"
//             id="vaptAuthority"
//             name="certifyingAuthority"
//             isRequired={true}
//             placeholder="Organisation Name"
//             value={vaptCompliance.certifyingAuthority || ""}
//             onChange={onChangeHandlerVapt}
//           />
//           <div>
//             <label
//               htmlFor="vaptExpiryDate"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               VAPT Expiry Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               id="vaptExpiryDate"
//               name="certificateExpiryDate"
//               required
//               value={vaptCompliance.certificateExpiryDate || ""}
//               onChange={onChangeHandlerVapt}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label
//               htmlFor="vaptReport"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Upload VAPT Report <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="file"
//               id="vaptReport"
//               name="approvalProof"
//               required
//               onChange={onChangeHandlerVapt}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label
//               htmlFor="vaptRemarks"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Remarks
//             </label>
//             <textarea
//               id="vaptRemarks"
//               name="remarks"
//               rows="3"
//               placeholder="Any remarks regarding VAPT..."
//               value={vaptCompliance.remarks || ""}
//               onChange={onChangeHandlerVapt}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             ></textarea>
//           </div>
//         </div>
//       )}

//       {isVaptNotCompliant && (
//         <div className="border-t pt-4 mt-4">
//           <p className="text-sm text-red-600 mb-2 italic">
//             Since VAPT is not compliant, please upload the exemption certificate.
//           </p>
//           <label
//             htmlFor="vaptExemptionCert"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Submit Exemption Certificate <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             id="vaptExemptionCert"
//             name="approvalProof"
//             required
//             onChange={onChangeHandlerVapt}
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default VaptInfoRenewalSection;
// src/components/domain-form/VaptInfoRenewalSection.jsx
// src/components/domain-form/VaptInfoRenewalSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";
import TextInput from "../forms/TextInput";

function VaptInfoRenewalSection({ vaptCompliance, updateDomainRenewalRequest }) {
  const onChangeHandlerVapt = (e) => {
    const { name, value, type, files } = e.target;

    if (name === 'vaptCompliant') {
      // const isVaptCompliant = vaptCompliance.compliant === "YES"?true:(vaptCompliance.compliant === "NO"?false:'');

      updateDomainRenewalRequest("vaptCompliance", {
        ...vaptCompliance,
        [name]: value === "true",
      });
    }
    else if (type === "file") {
      const file = files[0]
      const reader = new FileReader();

      reader.onload = () => {
        const base64Enc = reader.result.split(",")[1];
        console.log("BASE 64=",base64Enc)



        updateDomainRenewalRequest("vaptCompliance", {
          ...vaptCompliance,
          [name]: base64Enc,
        });
      }
      reader.readAsDataURL(file);

    } else {
      updateDomainRenewalRequest("vaptCompliance", {
        ...vaptCompliance,
        [name]: value,
      });
    }
  };

  // Determine compliance status based on the prepopulated value.
  const isVaptCompliant = vaptCompliance.vaptCompliant === true;
  const isVaptNotCompliant = vaptCompliance.vaptCompliant === false;

  return (
    <div className="space-y-4">
      <RadioGroup
        label="VAPT (Vulnerability Assessment & Penetration Testing) Compliant"
        name="vaptCompliant"
        isRequired={true}
        options={[
          { value: true, label: "Yes" },
          { value: false, label: "No" },
          // { value: "NA", label: "N/a" },
        ]}
        selectedValue={vaptCompliance.vaptCompliant}
        onChange={onChangeHandlerVapt}
      />

      {isVaptCompliant && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 border-t pt-4 mt-4">
          <TextInput
            label="VAPT Certifying Authority"
            id="vaptAuthority"
            name="vaptCertifyingAuthority"
            isRequired={true}
            placeholder="Organisation Name"
            value={vaptCompliance.vaptCertifyingAuthority || ""}
            onChange={onChangeHandlerVapt}
          />
          <div>
            <label
              htmlFor="vaptExpiryDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              VAPT Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="vaptExpiryDate"
              name="vaptCertificateExpiryDate"
              required
              value={vaptCompliance.vaptCertificateExpiryDate || ""}
              onChange={onChangeHandlerVapt}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="vaptReport"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload VAPT Report <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="vaptReport"
              name="approvalProofVaptCompliant"
              required
              onChange={onChangeHandlerVapt}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="vaptRemarks"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Remarks
            </label>
            <textarea
              id="vaptRemarks"
              name="vaptRemarks"
              rows="3"
              placeholder="Any remarks regarding VAPT..."
              value={vaptCompliance.vaptRemarks || ""}
              onChange={onChangeHandlerVapt}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        </div>
      )}

      {isVaptNotCompliant && (
        <div className="border-t pt-4 mt-4">
          <p className="text-sm text-red-600 mb-2 italic">
            Since VAPT is not compliant, please upload the exemption certificate.
          </p>
          <label
            htmlFor="vaptExemptionCert"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Submit Exemption Certificate <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="vaptExemptionCert"
            name="approvalProofVaptCompliant"
            required
            onChange={onChangeHandlerVapt}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
          />
        </div>
      )}
    </div>
  );
}

export default VaptInfoRenewalSection;
