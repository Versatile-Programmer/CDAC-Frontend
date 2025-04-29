// // src/components/domain-form/ProjectInfoSection.jsx
// import React from "react";
// import TextInput from "../forms/TextInput";
// import { useState,useEffect } from "react";
// // Import other needed form components (e.g., TextArea)

// function ProjectInfoSection({projectDetails}) {

//   if (!projectDetails.hod) {
//     return <p>Loading project info…</p>;
//   }


//   console.log("PROJECT DETAILS IN PROJECT INFO SECTION",projectDetails)
//   // No state or logic yet
//   return (
//     // Use grid for layout as shown in wireframe
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       <TextInput
//         label="Assigned By"
//         id="assignedBy"
//         name="assignedBy"
//         readOnly={true}
//         placeholder={projectDetails.hod.hod_fname +" "+ projectDetails.hod.hod_lname}
//       />
//       <TextInput
//         label="Project Name"
//         id="projectName"
//         name="projectName"
//         readOnly={true}
//         placeholder={projectDetails.project_name}
//       />
//       <div className="md:col-span-2">
//         {" "}
//         {/* Remarks spans both columns */}
//         {/* Use a TextArea component here later */}
//         <label
//           htmlFor="projectRemarks"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Remarks
//         </label>
//         <textarea
//           id="projectRemarks"
//           name="projectRemarks"
//           rows="3"
//           placeholder={projectDetails.project_remarks}
//           readOnly={true}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  bg-gray-100 cursor-not-allowed"
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// export default ProjectInfoSection;




// src/components/domain-form/ProjectInfoSection.jsx
import React from "react";
// Removed unused imports: TextInput (using direct inputs), useState, useEffect

function ProjectInfoSection({ projectDetails }) {

  // Improved loading state check - check for projectDetails and projectDetails.hod
  if (!projectDetails || !projectDetails.hod) {
    // Or return null, or a dedicated loading component
    return <p className="text-center text-slate-500 py-4 italic">Loading project info...</p>;
  }

  // --- Styling constants for consistency ---
  const inputBaseClass = "block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const readOnlyInputClass = `${inputBaseClass} bg-slate-100 cursor-not-allowed text-slate-600`; // Consistent read-only style
  const labelClass = "block text-sm font-medium text-slate-700 mb-1"; // Consistent label style

  // Construct full HOD name safely
  const assignedByName = `${projectDetails.hod.hod_fname || ''} ${projectDetails.hod.hod_lname || ''}`.trim();

  return (
    // Use consistent grid layout and spacing
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

      {/* Assigned By (Read-only) */}
      <div>
        <label htmlFor="assignedBy" className={labelClass}>
          Assigned By (HOD)
        </label>
        <input
          type="text"
          id="assignedBy"
          name="assignedBy"
          readOnly={true}
          value={assignedByName || 'N/A'} // Use value prop, provide fallback
          className={readOnlyInputClass}
        />
      </div>

      {/* Project Name (Read-only) */}
      <div>
        <label htmlFor="projectName" className={labelClass}>
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          readOnly={true}
          value={projectDetails.project_name || 'N/A'} // Use value prop, provide fallback
          className={readOnlyInputClass}
        />
      </div>

      {/* Remarks (Read-only Textarea spanning both columns) */}
      <div className="md:col-span-2">
        <label htmlFor="projectRemarks" className={labelClass}>
          Project Remarks
        </label>
        <textarea
          id="projectRemarks"
          name="projectRemarks"
          rows="3" // Consistent row count
          readOnly={true}
          value={projectDetails.project_remarks || 'No remarks provided.'} // Use value prop, provide fallback text
          className={readOnlyInputClass} // Apply consistent read-only style to textarea
        ></textarea>
      </div>
    </div>
  );
}

export default ProjectInfoSection;
