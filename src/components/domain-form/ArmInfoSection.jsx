// src/components/domain-form/ArmInfoSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";

function ArmInfoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {/* Note: Employee number might be searchable/selected later */}
      <TextInput
        label="Employee Number of ARM"
        id="armEmpNo"
        name="armEmpNo"
        isRequired={true}
        placeholder="Enter ARM's Employee No."
      />
      {/* Other ARM fields might be auto-filled based on Emp No later */}
      <div /> {/* Empty div for grid alignment */}
      <TextInput
        label="First Name Of Nominated ARM"
        id="armFname"
        name="armFname"
        isRequired={true}
      />
      <TextInput
        label="Last Name Of Nominated ARM"
        id="armLname"
        name="armLname"
        isRequired={true}
      />
      <TextInput
        label="Email ID Of ARM"
        id="armEmail"
        name="armEmail"
        type="email"
        isRequired={true}
      />
      <div /> {/* Empty div for grid alignment */}
      <TextInput
        label="Mob No."
        id="armMobile"
        name="armMobile"
        type="tel"
        isRequired={true}
      />
      <TextInput
        label="ARM's Tel No./Ext No."
        id="armTele"
        name="armTele"
        type="tel"
        isRequired={true}
      />
    </div>
  );
}

export default ArmInfoSection;
