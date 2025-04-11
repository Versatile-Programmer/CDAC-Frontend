// src/components/assign-drm-form/ProjectDomainInfoSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";

function ProjectDomainInfoSection() {
  return (
    <div>
      {" "}
      {/* No grid needed if fields stack vertically */}
      <TextInput
        label="Project Name"
        id="assignProjectName"
        name="projectName" // Match backend expectation
        isRequired={true}
        // value={...} // Control later
        // onChange={...} // Handle later
      />
      <div>
        <label
          htmlFor="assignProjectRemarks"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Remarks
        </label>
        <textarea
          id="assignProjectRemarks"
          name="projectRemarks" // Match backend expectation
          rows="4"
          placeholder="Project remarks and description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          // value={...} // Control later
          // onChange={...} // Handle later
        ></textarea>
      </div>
    </div>
  );
}

export default ProjectDomainInfoSection;
