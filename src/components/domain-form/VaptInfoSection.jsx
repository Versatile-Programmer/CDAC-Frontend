// src/components/domain-form/VaptInfoSection.jsx
import React from "react";
import RadioGroup from "../forms/RadioGroup";
import TextInput from "../forms/TextInput";
// Import FileUpload component later

function VaptInfoSection() {
  // Placeholder state for conditional logic - we'll use proper state later
  const isVaptCompliant = true; // Assume 'Yes' initially for static view

  return (
    <div className="space-y-4">
      <RadioGroup
        label="VAPT (Vulnerability Assessment & Penetration Testing) Compliant"
        name="vaptCompliant"
        isRequired={true}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        // selectedValue={isVaptCompliant ? 'Yes' : 'No'} // Control later
        // onChange={...} // Control later
      />

      {/* Fields shown when VAPT is compliant (or just always shown in static view) */}
      {/* We will wrap this in conditional rendering later: {isVaptCompliant && (...)} */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 border-t pt-4 mt-4">
        <TextInput
          label="VAPT Certifying Authority"
          id="vaptAuthority"
          name="vaptAuthority"
          // isRequired={isVaptCompliant} // Conditional required later
          placeholder="Organisation Name"
        />
        <div>
          <label
            htmlFor="vaptExpiryDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            VAPT Expiry Date
            {/* {isVaptCompliant && <span className="text-red-500">*</span>} */}
          </label>
          {/* Placeholder for Date Picker */}
          <input
            type="date"
            id="vaptExpiryDate"
            name="vaptExpiryDate"
            // required={isVaptCompliant} // Conditional required later
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="vaptReport"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload VAPT Report
            {/* {isVaptCompliant && <span className="text-red-500">*</span>} */}
          </label>
          {/* Placeholder for File Upload Component */}
          <input
            type="file"
            id="vaptReport"
            name="vaptReport"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            // onChange={...} // Handle file later
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
      </div>

      {/* Fields shown when VAPT is NOT compliant - Placeholder */}
      {/* We will wrap this in conditional rendering later: {!isVaptCompliant && (...)} */}
      <div className="border-t pt-4 mt-4">
        <p className="text-sm text-red-600 mb-2 italic">
          Since VAPT is not compliant, please upload the exemption certificate.
        </p>
        <label
          htmlFor="vaptExemptionCert"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Submit Exemption Certificate <span className="text-red-500">*</span>{" "}
          {/* Required if not compliant */}
        </label>
        {/* Placeholder for File Upload Component */}
        <input
          type="file"
          id="vaptExemptionCert"
          name="vaptExemptionCert"
          // required={!isVaptCompliant} // Conditional required later
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
          // onChange={...} // Handle file later
        />
      </div>
    </div>
  );
}

export default VaptInfoSection;
