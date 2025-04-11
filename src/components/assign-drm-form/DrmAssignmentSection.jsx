// src/components/assign-drm-form/DrmAssignmentSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import { MdOutlineLock } from "react-icons/md";

function DrmAssignmentSection() {
  // HOD's Centre/Group - Fetched later
  const hodCentre = "HOD's Centre Name";
  const hodGroup = "HOD's Group Name";

  // Placeholder for fetched DRM details - Populated later by API call
  const fetchedDrmDetails = {
    fname: "", // e.g., "John"
    lname: "", // e.g., "Doe"
    // Add other details if needed
  };
  const drmFound = false; // Flag to indicate if DRM details were successfully fetched

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {/* --- Key Input: Employee Number --- */}
      <div className="md:col-span-2">
        {" "}
        {/* Span full width initially */}
        <TextInput
          label="DRM Employee Number"
          id="assignDrmEmpNo"
          name="drmEmpNo" // This value will be submitted
          isRequired={true}
          placeholder="Enter DRM's Employee No. to fetch details"
          type="number" // Or "text" with pattern validation later
          // value={...} // Control with state later
          // onChange={...} // Handle change with debouncing later
        />
        {/* Placeholder for validation/fetch status */}
        {/* {!drmFound && <p className="text-xs text-red-500 mt-1">DRM not found or invalid.</p>} */}
      </div>

      {/* --- Auto-filled/Locked Fields --- */}
      {/* These would ideally only show *after* a valid EmpNo is entered and details are fetched */}
      {/* For static layout, we show them read-only */}

      <TextInput
        label="DRM First Name"
        id="dispDrmFname"
        name="dispDrmFname"
        value={fetchedDrmDetails.fname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />
      <TextInput
        label="DRM Last Name"
        id="dispDrmLname"
        name="dispDrmLname"
        value={fetchedDrmDetails.lname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />

      <div className="relative">
        <TextInput
          label="Centre"
          id="assignDrmCentre"
          name="drmCentreDisplay"
          isRequired={true}
          value={hodCentre}
          readOnly={true}
        />
        <MdOutlineLock
          className="absolute right-3 top-9 text-gray-400 h-5 w-5"
          title="Locked to HOD's centre"
        />
      </div>
      <div className="relative">
        <TextInput
          label="Group"
          id="assignDrmGroup"
          name="drmGroupDisplay"
          isRequired={true}
          value={hodGroup}
          readOnly={true}
        />
        <MdOutlineLock
          className="absolute right-3 top-9 text-gray-400 h-5 w-5"
          title="Locked to HOD's group"
        />
      </div>
    </div>
  );
}

export default DrmAssignmentSection;
