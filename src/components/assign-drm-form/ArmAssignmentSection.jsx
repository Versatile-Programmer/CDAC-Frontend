// src/components/assign-drm-form/ArmAssignmentSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import { MdOutlineLock } from "react-icons/md";

function ArmAssignmentSection() {
  // HOD's Centre/Group - Fetched later
  const hodCentre = "HOD's Centre Name";
  const hodGroup = "HOD's Group Name";

  // Placeholder for fetched ARM details - Populated later by API call
  const fetchedArmDetails = {
    fname: "", // e.g., "Jane"
    lname: "", // e.g., "Smith"
  };
  const armFound = false; // Flag

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {/* --- Key Input: Employee Number --- */}
      <div className="md:col-span-2">
        {" "}
        {/* Span full width initially */}
        <TextInput
          label="ARM Employee Number"
          id="assignArmEmpNo"
          name="armEmpNo" // This value will be submitted
          isRequired={true}
          placeholder="Enter ARM's Employee No. to fetch details"
          type="number" // Or "text" with pattern validation later
          // value={...} // Control with state later
          // onChange={...} // Handle change with debouncing later
        />
        {/* Placeholder for validation/fetch status */}
        {/* {!armFound && <p className="text-xs text-red-500 mt-1">ARM not found or invalid.</p>} */}
      </div>

      {/* --- Auto-filled/Locked Fields --- */}
      {/* These would ideally only show *after* a valid EmpNo is entered and details are fetched */}

      <TextInput
        label="ARM First Name"
        id="dispArmFname"
        name="dispArmFname"
        value={fetchedArmDetails.fname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />
      <TextInput
        label="ARM Last Name"
        id="dispArmLname"
        name="dispArmLname"
        value={fetchedArmDetails.lname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />

      <div className="relative">
        <TextInput
          label="Centre"
          id="assignArmCentre"
          name="armCentreDisplay"
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
          id="assignArmGroup"
          name="armGroupDisplay"
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

export default ArmAssignmentSection;
