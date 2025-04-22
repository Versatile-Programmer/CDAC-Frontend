// src/components/domain-form/ProjectInfoSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import { useState,useEffect } from "react";
// Import other needed form components (e.g., TextArea)

function ProjectInfoSection({projectDetails}) {

  if (!projectDetails.hod) {
    return <p>Loading project info…</p>;
  }


  console.log("PROJECT DETAILS IN PROJECT INFO SECTION",projectDetails)
  // No state or logic yet
  return (
    // Use grid for layout as shown in wireframe
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <TextInput
        label="Assigned By"
        id="assignedBy"
        name="assignedBy"
        readOnly={true}
        placeholder={projectDetails.hod.hod_fname +" "+ projectDetails.hod.hod_lname}
      />
      <TextInput
        label="Project Name"
        id="projectName"
        name="projectName"
        readOnly={true}
        placeholder={projectDetails.project_name}
      />
      <div className="md:col-span-2">
        {" "}
        {/* Remarks spans both columns */}
        {/* Use a TextArea component here later */}
        <label
          htmlFor="projectRemarks"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Remarks
        </label>
        <textarea
          id="projectRemarks"
          name="projectRemarks"
          rows="3"
          placeholder={projectDetails.project_remarks}
          readOnly={true}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  bg-gray-100 cursor-not-allowed"
        ></textarea>
      </div>
    </div>
  );
}

export default ProjectInfoSection;
