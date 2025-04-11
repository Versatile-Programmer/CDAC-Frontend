// src/components/domain-form/TermsAndConditionsSection.jsx
import React from "react";
// Import Checkbox component later

function TermsAndConditionsSection() {
  const terms = [
    "DRM/ARM must initiate the approval process for renewal of domain name least one month prior to the expiry date.",
    "DRM/ARM must re-authorize the domain name registration form in case of change in DRM/ARM details.",
    "The DRM/ARM should ensure that the website meets the GIGW & Access guidelines.",
    "The DRM/ARM should ensure that the web server meets security (VAPT) compliance.",
    "DRM/ARM shall be responsible for payment for registration/renewal of domain name & DNS services.",
    "In case the website is hosted outside C-DAC infrastructure, an approval note from the competent authority should be attached.",
    "The DRM/ARM shall be responsible for the website contents and also for...", // Truncated
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-800 mb-2">Agreement</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          {terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </div>

      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-medium text-gray-800 mb-2">Notes</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          <li>
            **DRM (Designated Responsible Member): DRM must be "Scientist E" or
            above.
          </li>
          <li>
            **ARM (Alternate Responsible Member): ARM must be "Scientist D" or
            equivalent.
          </li>
        </ul>
      </div>

      {/* Placeholder for Checkboxes */}
      <div className="space-y-2 mt-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="drmConsent"
            name="drmConsent"
            required
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
          />
          <label
            htmlFor="drmConsent"
            className="ml-2 block text-sm text-gray-700"
          >
            I, the DRM consent to submit the form to my Hod for further
            scrutinization and approval with prior consent from nominated ARM.
          </label>
        </div>
        <div className="flex items-start">
          <input
            type="checkbox"
            id="abideConditions"
            name="abideConditions"
            required
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
          />
          <label
            htmlFor="abideConditions"
            className="ml-2 block text-sm text-gray-700"
          >
            We, the DRM And ARM agree to abide by the above Terms and
            Conditions.
          </label>
        </div>
      </div>
    </div>
  );
}
export default TermsAndConditionsSection;
