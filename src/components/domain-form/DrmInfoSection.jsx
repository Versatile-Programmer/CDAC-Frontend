// src/components/domain-form/DrmInfoSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import RadioGroup from "../forms/RadioGroup";
// Import DatePicker component later

function DrmInfoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <TextInput
        label="DRM First Name"
        id="drmFname"
        name="drmFname"
        isRequired={true}
      />
      <TextInput
        label="DRM Last Name"
        id="drmLname"
        name="drmLname"
        isRequired={true}
      />
      <div>
        <label
          htmlFor="drmAssignDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date *
        </label>
        {/* Placeholder for Date Picker */}
        <input
          type="date"
          id="drmAssignDate"
          name="drmAssignDate"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <TextInput
        label="Employee Number"
        id="drmEmpNo"
        name="drmEmpNo"
        isRequired={true}
        readOnly={true}
        placeholder="123456"
      />
      <TextInput
        label="Group"
        id="drmGroup"
        name="drmGroup"
        isRequired={true}
      />
      <TextInput
        label="Designation"
        id="drmDesignation"
        name="drmDesignation"
        isRequired={true}
      />
      <TextInput
        label="Centre"
        id="drmCentre"
        name="drmCentre"
        isRequired={true}
      />
      <TextInput
        label="Email Id"
        id="drmEmail"
        name="drmEmail"
        type="email"
        isRequired={true}
      />
      <TextInput
        label="Mobile Number"
        id="drmMobile"
        name="drmMobile"
        type="tel"
        isRequired={true}
      />
      <TextInput
        label="Tele No./Ext. No"
        id="drmTele"
        name="drmTele"
        type="tel"
        isRequired={true}
      />

      {/* Service Type spanning full width */}
      <div className="md:col-span-2">
        <RadioGroup
          label="Service Type"
          name="serviceType"
          isRequired={true}
          options={[
            { value: "Internal", label: "Internal" },
            { value: "External", label: "External" },
          ]}
          // selectedValue={...} // Add state later
          // onChange={...} // Add state later
        />
      </div>
      {/* Domain Name spanning full width */}
      <div className="md:col-span-2">
        <TextInput
          label="Domain Name"
          id="domainName"
          name="domainName"
          isRequired={true}
        />
      </div>
      {/* Description spanning full width */}
      <div className="md:col-span-2">
        <label
          htmlFor="domainDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="domainDescription"
          name="domainDescription"
          rows="4"
          placeholder="Detailed description of the domain name's purpose..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
    </div>
  );
}

export default DrmInfoSection;
