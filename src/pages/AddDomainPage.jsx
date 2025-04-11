// src/pages/AddDomainPage.jsx
import React from "react";
import MainLayout from "../layouts/MainLayout";
import FormSection from "../components/forms/FormSection";

// Import section components (we'll create these next)
import ProjectInfoSection from "../components/domain-form/ProjectInfoSection";
import DrmInfoSection from "../components/domain-form/DrmInfoSection";
import RegistrationInfoSection from "../components/domain-form/RegistrationInfoSection";
import IpInfoSection from "../components/domain-form/IpInfoSection";
import VaptInfoSection from "../components/domain-form/VaptInfoSection";
import ComplianceInfoSection from "../components/domain-form/ComplianceInfoSection";
import MouInfoSection from "../components/domain-form/MouInfoSection";
import ArmInfoSection from "../components/domain-form/ArmInfoSection";
import TermsAndConditionsSection from "../components/domain-form/TermsAndConditionsSection";

function AddDomainPage() {
  // Dummy handler for the final form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(
      "Main form submission logic will be added later! Remember to use FormData."
    );
    // Later: Construct FormData here from all form state
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {" "}
        {/* Constrain width for better readability */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
          Domain Name Registration Form
        </h2>
        {/* We will use a single <form> element wrapping all sections */}
        <form onSubmit={handleFormSubmit}>
          {/* Use FormSection for each part */}
          <FormSection title="Project Information" initiallyOpen={true}>
            <ProjectInfoSection /> {/* Content goes here */}
          </FormSection>

          <FormSection title="DRM Information" initiallyOpen={true}>
            <DrmInfoSection />
          </FormSection>

          <FormSection title="Registration Information" initiallyOpen={true}>
            <RegistrationInfoSection />
          </FormSection>

          <FormSection title="IP Information" initiallyOpen={true}>
            <IpInfoSection />
          </FormSection>

          <FormSection title="VAPT Information" initiallyOpen={true}>
            <VaptInfoSection />
          </FormSection>

          <FormSection
            title="Compliance (GIGW/ICT Accessibility)"
            initiallyOpen={true}
          >
            <ComplianceInfoSection />
          </FormSection>

          <FormSection title="Memorandum of Understanding" initiallyOpen={true}>
            <MouInfoSection />
          </FormSection>

          <FormSection title="ARM Information" initiallyOpen={true}>
            <ArmInfoSection />
          </FormSection>

          <FormSection title="Terms and Conditions" initiallyOpen={true}>
            <TermsAndConditionsSection />
          </FormSection>

          {/* Final Submit Button - Placed outside the last section */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AddDomainPage;
