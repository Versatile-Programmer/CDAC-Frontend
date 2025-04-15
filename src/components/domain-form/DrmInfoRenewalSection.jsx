// // src/components/domain-form/DrmInfoRenewalSection.jsx
// import React from "react";
// import TextInput from "../forms/TextInput";
// import RadioGroup from "../forms/RadioGroup";

// function DrmInfoRenewalSection({ user, domainRequest, updateDomainRequest }) {
//   // Destructure DRM info and domain details from the request.
//   const { drmInfo, domainDetails } = domainRequest;

//   // Generic change handler for domain details (service type, domain name, description).
//   const onChangeHandlerDomain = (e) => {
//     const { name, value } = e.target;
//     updateDomainRequest("domainDetails", {
//       ...domainDetails,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       {/* DRM Information */}
//       <TextInput
//         label="DRM First Name"
//         id="drmFname"
//         name="drmFname"
//         isRequired={true}
//         readOnly={true}
//         placeholder={drmInfo.fname || ""}
//       />
//       <TextInput
//         label="DRM Last Name"
//         id="drmLname"
//         name="drmLname"
//         isRequired={true}
//         readOnly={true}
//         placeholder={drmInfo.lname || ""}
//       />
//       <div>
//         <label
//           htmlFor="drmAssignDate"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Date *
//         </label>
//         {/* Date input remains uncontrolled or could be connected to state if needed */}
//         <input
//           type="date"
//           id="drmAssignDate"
//           name="drmAssignDate"
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//       </div>
//       <TextInput
//         label="Employee Number"
//         id="drmEmpNo"
//         name="drmEmpNo"
//         isRequired={true}
//         readOnly={true}
//         placeholder={drmInfo.empNo || ""}
//       />
//       <TextInput
//         label="Group"
//         id="drmGroup"
//         name="drmGroup"
//         isRequired={true}
//         readOnly={true}
//         placeholder={drmInfo.groupId ? drmInfo.groupId.toString() : ""}
//       />
//       <TextInput
//         label="Designation"
//         id="drmDesignation"
//         name="designation"
//         isRequired={true}
//         value={drmInfo.designation || ""}
//         onChange={(e) =>
//           updateDomainRequest("drmInfo", { ...drmInfo, designation: e.target.value })
//         }
//       />
//       <TextInput
//         label="Centre"
//         id="drmCentre"
//         name="drmCentre"
//         isRequired={true}
//         readOnly={true}
//         placeholder={user.employeeCenter || ""}
//       />
//       <TextInput
//         label="Email Id"
//         id="drmEmail"
//         name="drmEmail"
//         type="email"
//         isRequired={true}
//         readOnly={true}
//         placeholder={drmInfo.email || ""}
//       />
//       <TextInput
//         label="Mobile Number"
//         id="drmMobile"
//         name="mobileNumber"
//         type="tel"
//         isRequired={true}
//         value={drmInfo.mobileNumber || ""}
//         onChange={(e) =>
//           updateDomainRequest("drmInfo", { ...drmInfo, mobileNumber: e.target.value })
//         }
//       />
//       <TextInput
//         label="Tele No./Ext. No"
//         id="drmTele"
//         name="teleNumber"
//         type="tel"
//         isRequired={true}
//         value={drmInfo.teleNumber || ""}
//         onChange={(e) =>
//           updateDomainRequest("drmInfo", { ...drmInfo, teleNumber: e.target.value })
//         }
//       />

//       {/* Domain Details (placed within the DRM section as needed) */}
//       <div className="md:col-span-2">
//         <RadioGroup
//           label="Service Type"
//           name="serviceType"
//           isRequired={true}
//           options={[
//             { value: "INTERNAL", label: "Internal" },
//             { value: "EXTERNAL", label: "External" },
//           ]}
//           selectedValue={domainDetails.serviceType || ""}
//           onChange={onChangeHandlerDomain}
//         />
//       </div>
//       <div className="md:col-span-2">
//         <TextInput
//           label="Domain Name"
//           id="domainName"
//           name="domainName"
//           isRequired={true}
//           value={domainDetails.domainName || ""}
//           onChange={onChangeHandlerDomain}
//         />
//       </div>
//       <div className="md:col-span-2">
//         <label
//           htmlFor="domainDescription"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Description
//         </label>
//         <textarea
//           id="domainDescription"
//           name="description"
//           rows="4"
//           placeholder="Detailed description of the domain name's purpose..."
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           value={domainDetails.description || ""}
//           onChange={onChangeHandlerDomain}
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// export default DrmInfoRenewalSection;
// src/components/domain-form/DrmInfoRenewalSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import RadioGroup from "../forms/RadioGroup";

function DrmInfoRenewalSection({ drmInfo, updateDomainRenewalRequest }) {

  // Generic change handler for drmInfo
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    updateDomainRenewalRequest("drmInfo", {
      ...drmInfo,
      [name]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {/* DRM Information */}
      <TextInput
        label="DRM First Name"
        id="drmFname"
        name="firstName"
        isRequired={true}
        readOnly={true}
        placeholder={drmInfo.firstName || ""}
      />
      <TextInput
        label="DRM Last Name"
        id="drmLname"
        name="lastName"
        isRequired={true}
        readOnly={true}
        placeholder={drmInfo.lastName || ""}
      />
      <div>
        <label
          htmlFor="drmAssignDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date *
        </label>
        <input
          type="date"
          id="drmAssignDate"
          name="drmAssignDate"
          value={new Date().toISOString().split("T")[0]}
          required
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <TextInput
        label="Employee Number"
        id="drmEmpNo"
        name="empNo"
        isRequired={true}
        readOnly={true}
        placeholder={drmInfo.empNo || ""}
      />
      <TextInput
        label="Group"
        id="drmGroup"
        name="groupId"
        isRequired={true}
        readOnly={true}
        placeholder={drmInfo.groupName ? drmInfo.groupName.toString() : ""}
      />
      <TextInput
        label="Designation"
        id="drmDesignation"
        name="designation"
        isRequired={true}
        value={drmInfo.designation || ""}
        onChange={onChangeHandler}
      />
      <TextInput
        label="Centre"
        id="drmCentre"
        name="centreId"
        isRequired={true}
        readOnly={true}
        placeholder={drmInfo.centreName || ""}
      />
      <TextInput
        label="Email Id"
        id="drmEmail"
        name="email"
        type="email"
        isRequired={true}
        readOnly={true}
        placeholder={drmInfo.email || ""}
      />
      <TextInput
        label="Mobile Number"
        id="drmMobile"
        name="mobileNumber"
        type="tel"
        isRequired={true}
        value={drmInfo.mobileNumber || ""}
        onChange={onChangeHandler}
      />
      <TextInput
        label="Tele No./Ext. No"
        id="drmTele"
        name="teleNumber"
        type="tel"
        isRequired={true}
        value={drmInfo.teleNumber || ""}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default DrmInfoRenewalSection;
