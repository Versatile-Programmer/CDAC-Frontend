// src/components/domain-form/DrmInfoSection.jsx
import React, { useState } from "react";
import TextInput from "../forms/TextInput";
import RadioGroup from "../forms/RadioGroup";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authState";
// Import DatePicker component later
import axios from "axios";
import { API_BASE_URL } from "../../config/env.config";
import { get } from "lodash";

function DrmInfoSection({
  user,
  domainRequest,
  updateDomainRequest,
  projectDetails,
}) {
  const { drmInfo } = domainRequest;
  const { domainDetails } = domainRequest;
  const isAuthenticated = useRecoilValue(authTokenState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const drmEmpNo = user.id;

  if (!projectDetails.drm) {
    return <p>Loading project info…</p>;
  }

  // useEffect(() => {
  //     if (!drmEmpNo) return; // Don't fetch if armEmpNo is not provided

  //     const fetchDrmDetails = async () => {
  //       setLoading(true);
  //       setError("");
  //       try {
  //         const res = await axios.get(`${API_BASE_URL}/api/users/details/DRM/${drmEmpNo}`, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${isAuthenticated}`,
  //           },
  //         });

  //         console.log("DRM RESPONSE", res.data);
  //         // Update the armInfo section with the response data.
  //         updateDomainRequest("drmInfo", {
  //           ...drmInfo,
  //           empNo: res.data.emp_no,
  //           fname: res.data.arm_fname,
  //           lname: res.data.arm_lname,
  //           email: res.data.email_id,
  //           designation: res.data.desig,
  //           teleNumber: res.data.tele_no,
  //           mobileNumber: res.data.mob_no,
  //           centreId: res.data.centre_id,
  //           groupId: res.data.grp_id,
  //         });
  //       } catch (error) {
  //         console.error("ERROR OCCURRED FETCHING DRM DETAILS", error);
  //         setError("Failed to load DRM details. Please verify the employee number and try again.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchDrmDetails();
  //   }, [drmEmpNo, isAuthenticated]);

  const onChangeHandlerDrm = (e) => {
    const { name, value } = e.target;
    updateDomainRequest("drmInfo", {
      ...drmInfo,
      [name]: value,
    });
  };

  const onChangeHandlerDomain = (e) => {
    const { name, value } = e.target;
    updateDomainRequest("domainDetails", {
      ...domainDetails,
      [name]: value,
    });
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    // getMonth() is 0-indexed (0 = Jan), so add 1
    // padStart ensures month and day are 2 digits (e.g., '05' instead of '5')
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // const [drmFname,drmLname] = user.name.split(" ")
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <TextInput
        label="DRM First Name"
        id="drmFname"
        name="drmFname"
        isRequired={true}
        readOnly={true}
        placeholder={projectDetails.drm.drm_fname}
      />
      <TextInput
        label="DRM Last Name"
        id="drmLname"
        name="drmLname"
        isRequired={true}
        readOnly={true}
        placeholder={projectDetails.drm.drm_lname}
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
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed text-gray-700"
          value={getTodayDateString()}
        />
      </div>
      <TextInput
        label="Employee Number"
        id="drmEmpNo"
        name="drmEmpNo"
        isRequired={true}
        readOnly={true}
        placeholder={user.id}
      />
      <TextInput
        label="Group"
        id="drmGroup"
        name="drmGroup"
        isRequired={true}
        readOnly={true}
        placeholder={user.employeeGroup}
      />
      <TextInput
        label="Designation"
        id="drmDesignation"
        name="designation"
        isRequired={true}
        placeholder={user.designation}
      />
      <TextInput
        label="Centre"
        id="drmCentre"
        name="drmCentre"
        isRequired={true}
        readOnly={true}
        placeholder={user.employeeCenter}
      />
      <TextInput
        label="Email Id"
        id="drmEmail"
        name="drmEmail"
        type="email"
        isRequired={true}
        readOnly={true}
        placeholder={user.employeeEmail}
      />
      <TextInput
        label="Mobile Number"
        id="drmMobile"
        name="mobileNumber"
        type="tel"
        isRequired={true}
        onChange={onChangeHandlerDrm}
      />
      <TextInput
        label="Tele No./Ext. No"
        id="drmTele"
        name="teleNumber"
        type="tel"
        isRequired={true}
        onChange={onChangeHandlerDrm}
      />

      {/* Service Type spanning full width */}
      <div className="md:col-span-2">
        <RadioGroup
          label="Service Type"
          name="serviceType"
          isRequired={true}
          options={[
            { value: "INTERNAL", label: "Internal" },
            { value: "EXTERNAL", label: "External" },
          ]}
          selectedValue={domainDetails.serviceType} // Add state later
          onChange={onChangeHandlerDomain} // Add state later
        />
      </div>
      {/* Domain Name spanning full width */}
      <div className="md:col-span-2">
        <TextInput
          label="Domain Name"
          id="domainName"
          name="domainName"
          isRequired={true}
          onChange={onChangeHandlerDomain}
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
          name="description"
          rows="4"
          placeholder="Detailed description of the domain name's purpose..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChangeHandlerDomain}
        ></textarea>
      </div>
    </div>
  );
}

export default DrmInfoSection;
