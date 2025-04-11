// src/pages/AssignDrmPage.jsx
import React from "react";
import MainLayout from "../layouts/MainLayout";
import FormSection from "../components/forms/FormSection";
import ProjectDomainInfoSection from "../components/assign-drm-form/ProjectDomainInfoSection";
import DrmAssignmentSection from "../components/assign-drm-form/DrmAssignmentSection";
import ArmAssignmentSection from "../components/assign-drm-form/ArmAssignmentSection";

function AssignDrmPage() {
  const handleAssignSubmit = (e) => {
    e.preventDefault();
    alert("Assign DRM/ARM form submission logic will be added later!");
    // Construct FormData here later
  };

  return (
    <MainLayout>
      {/* Using similar container as Add Domain Form */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
          Assign DRM/ARM Form
        </h2>

        <form onSubmit={handleAssignSubmit}>
          {/* Use FormSection for collapsibility */}
          <FormSection title="Project Information" initiallyOpen={true}>
            <ProjectDomainInfoSection />
          </FormSection>

          <FormSection title="DRM Information" initiallyOpen={true}>
            <DrmAssignmentSection />
          </FormSection>

          <FormSection title="ARM Information" initiallyOpen={true}>
            <ArmAssignmentSection />
          </FormSection>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              // Changed button color to match wireframe
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default AssignDrmPage;
