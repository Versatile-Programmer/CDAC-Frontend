
// import React from "react";
// import RadioGroup from "../forms/RadioGroup";
// import TextInput from "../forms/TextInput";

// function VaptInfoSection({ domainRequest, updateDomainRequest }) {
//   const { vaptCompliance } = domainRequest;

//   const onChangeHandlerVapt = (e) => {
//     const { name, value, type, files } = e.target;

//     if (name === 'compliant') {
//       // const isVaptCompliant = vaptCompliance.compliant === "YES"?true:(vaptCompliance.compliant === "NO"?false:'');

//       updateDomainRequest("vaptCompliance", {
//         ...vaptCompliance,
//         [name]: value === "true",
//       });
//     }
//     else if (type === "file") {
//       const file = files[0]
//       const reader = new FileReader();

//       reader.onload = () => {
//         const base64Enc = reader.result.split(",")[1];
//         console.log("BASE 64=",base64Enc)



//         updateDomainRequest("vaptCompliance", {
//           ...vaptCompliance,
//           [name]: base64Enc,
//         });
//       }
//       reader.readAsDataURL(file);

//     } else {
//       updateDomainRequest("vaptCompliance", {
//         ...vaptCompliance,
//         [name]: value,
//       });
//     }
//   };

//   const isVaptCompliant = vaptCompliance.compliant === true;
//   const isVaptNotCompliant = vaptCompliance.compliant === false;

//   return (
//     <div className="space-y-4">
//       <RadioGroup
//         label="VAPT (Vulnerability Assessment & Penetration Testing) Compliant"
//         name="compliant"
//         isRequired={true}
//         options={[
//           { value: true, label: "Yes" },
//           { value: false, label: "No" },
//           // { value: "NA", label: "N/a" },
//         ]}
//         selectedValue={vaptCompliance.compliant}
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

// export default VaptInfoSection;




// src/components/domain-form/VaptInfoSection.jsx
import React from "react";
// Removed unused imports: RadioGroup, TextInput
import { FaCalendarAlt, FaUpload, FaExclamationTriangle } from "react-icons/fa"; // Import necessary icons

function VaptInfoSection({ domainRequest, updateDomainRequest }) {
  const { vaptCompliance } = domainRequest;

  // --- No changes to onChangeHandlerVapt logic ---
  const onChangeHandlerVapt = (e) => {
    const { name, value, type, files } = e.target;

    if (name === 'compliant') {
      updateDomainRequest("vaptCompliance", {
        ...vaptCompliance,
        [name]: value === "true",
      });
    } else if (type === "file" && files && files.length > 0) { // Added check for files
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Ensure reader.result is a string before splitting
        const resultString = typeof reader.result === 'string' ? reader.result : '';
        const base64Enc = resultString.split(",")[1] || ''; // Get part after comma, fallback to empty
        console.log("BASE 64=", base64Enc);

        updateDomainRequest("vaptCompliance", {
          ...vaptCompliance,
          // Store only the base64 part, or potentially the whole Data URL if needed later
          [name]: base64Enc,
          // Optionally store filename
          // [`${name}Filename`]: file.name
        });
      };
      reader.onerror = (error) => { // Add error handling for FileReader
        console.error("FileReader error: ", error);
        // Optionally update state to show an error message
      };
      reader.readAsDataURL(file);

    } else if (type !== "file") { // Ensure we don't process empty file inputs
      updateDomainRequest("vaptCompliance", {
        ...vaptCompliance,
        [name]: value,
      });
    }
  };
  // --- End of Logic Section ---


  // --- Styling constants ---
  const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const radioLabelClass = "ml-2 block text-sm text-slate-800";
  const radioInputClass = "h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500";
  // Custom file input button style (example)
  const fileInputButtonClass = "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold";
  const fileInputClass = `block w-full text-sm text-slate-500 ${fileInputButtonClass}`;

  // Helper for required asterisk
  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  // Boolean flags derived from state
  const isVaptCompliant = vaptCompliance.compliant === true;
  const isVaptNotCompliant = vaptCompliance.compliant === false;


  return (
    // Main container for the section
    <div className="space-y-6"> {/* Increased spacing */}

      {/* VAPT Compliant Radio Group */}
      <fieldset>
        <legend className={`${labelClass} mb-2`}>
          VAPT Compliant <RequiredAsterisk />
        </legend>
        <div className="flex items-center space-x-6">
          {/* Yes */}
          <div className="flex items-center">
            <input
              id="vapt-yes"
              name="compliant"
              type="radio"
              value="true"
              required
              className={radioInputClass}
              checked={isVaptCompliant}
              onChange={onChangeHandlerVapt}
            />
            <label htmlFor="vapt-yes" className={radioLabelClass}>
              Yes
            </label>
          </div>
          {/* No */}
          <div className="flex items-center">
            <input
              id="vapt-no"
              name="compliant"
              type="radio"
              value="false"
              required
              className={radioInputClass}
              checked={isVaptNotCompliant}
              onChange={onChangeHandlerVapt}
            />
            <label htmlFor="vapt-no" className={radioLabelClass}>
              No
            </label>
          </div>
        </div>
      </fieldset>

      {/* Conditional Section: VAPT Compliant */}
      {isVaptCompliant && (
        // Added padding, border, and slight background for visual grouping
        <div className="border border-slate-200 rounded-md p-6 mt-4 space-y-6 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* Certifying Authority */}
            <div>
              <label htmlFor="vaptAuthority" className={labelClass}>
                VAPT Certifying Authority <RequiredAsterisk />
              </label>
              <input
                type="text"
                id="vaptAuthority"
                name="certifyingAuthority"
                required
                className={inputBaseClass}
                placeholder="Organisation Name"
                value={vaptCompliance.certifyingAuthority || ""}
                onChange={onChangeHandlerVapt}
              />
            </div>

            {/* VAPT Expiry Date */}
            <div>
              <label htmlFor="vaptExpiryDate" className={labelClass}>
                VAPT Expiry Date <RequiredAsterisk />
              </label>
              <div className="relative mt-1">
                <input
                  type="date"
                  id="vaptExpiryDate"
                  name="certificateExpiryDate"
                  required
                  className={`${inputBaseClass} pr-10`} // Padding for icon
                  value={vaptCompliance.certificateExpiryDate || ""}
                  onChange={onChangeHandlerVapt}
                  // Optional: Add min={todayDateString} if expiry must be today or future
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaCalendarAlt className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Upload VAPT Report */}
            <div className="md:col-span-2">
              <label htmlFor="vaptReport" className={labelClass}>
                Upload VAPT Report <RequiredAsterisk />
              </label>
              <div className="mt-1 flex items-center space-x-3">
                 <input
                    type="file"
                    id="vaptReport"
                    name="approvalProof" // Same name used for both files in original code
                    required
                    onChange={onChangeHandlerVapt}
                    className={`${fileInputClass} file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer`}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Specify acceptable file types
                  />
                  {/* Optional: Display filename if needed */}
                  {/* {vaptCompliance.approvalProofFilename && <span className="text-sm text-slate-500 truncate">{vaptCompliance.approvalProofFilename}</span>} */}
                  {/* <FaUpload className="h-5 w-5 text-indigo-600" /> Added icon next to input */}

              </div>
               <p className="mt-1 text-xs text-slate-500">Max file size: 5MB. Allowed types: PDF, DOC(X), JPG, PNG.</p> {/* Example help text */}
            </div>

            {/* Remarks */}
            <div className="md:col-span-2">
              <label htmlFor="vaptRemarks" className={labelClass}>
                Remarks
              </label>
              <textarea
                id="vaptRemarks"
                name="remarks"
                rows="3"
                placeholder="Any remarks regarding VAPT..."
                className={inputBaseClass}
                value={vaptCompliance.remarks || ""}
                onChange={onChangeHandlerVapt}
              ></textarea>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Section: VAPT Not Compliant */}
      {isVaptNotCompliant && (
        // Added padding, border, and slight background for visual grouping
        <div className="border border-orange-300 bg-orange-50/50 rounded-md p-6 mt-4 space-y-4">
          {/* Warning/Instruction Message */}
          <p className="text-sm text-orange-800 flex items-center">
            <FaExclamationTriangle className="h-4 w-4 mr-2 flex-shrink-0 text-orange-600" aria-hidden="true" />
            VAPT is not marked as compliant. Please upload the exemption certificate.
          </p>

          {/* Upload Exemption Certificate */}
          <div>
            <label htmlFor="vaptExemptionCert" className={labelClass}>
              Submit Exemption Certificate <RequiredAsterisk />
            </label>
             <div className="mt-1 flex items-center space-x-3">
                <input
                  type="file"
                  id="vaptExemptionCert"
                  name="approvalProof" // Same name used for both files in original code
                  required
                  onChange={onChangeHandlerVapt}
                  className={`${fileInputClass} file:bg-orange-100 file:text-orange-800 hover:file:bg-orange-200 cursor-pointer`}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Specify acceptable file types
                />
                 {/* Optional: Display filename if needed */}
                 {/* {vaptCompliance.approvalProofFilename && <span className="text-sm text-slate-500 truncate">{vaptCompliance.approvalProofFilename}</span>} */}
                 {/* <FaUpload className="h-5 w-5 text-orange-700" /> */}
            </div>
             <p className="mt-1 text-xs text-slate-500">Max file size: 5MB. Allowed types: PDF, DOC(X), JPG, PNG.</p> {/* Example help text */}
          </div>
        </div>
      )}
    </div>
  );
}

export default VaptInfoSection;

