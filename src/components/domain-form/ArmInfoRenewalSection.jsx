// // src/components/domain-form/ArmInfoRenewalSection.jsx
// import React from "react";
// import TextInput from "../forms/TextInput";

// function ArmInfoRenewalSection({ user, domainRequest, updateDomainRequest }) {
//   const { armInfo } = domainRequest;

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     updateDomainRequest("armInfo", {
//       ...armInfo,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       <TextInput
//         label="ARM First Name"
//         id="armFname"
//         name="fname"
//         isRequired={true}
//         readOnly={true}
//         placeholder={armInfo.fname || ""}
//       />
//       <TextInput
//         label="ARM Last Name"
//         id="armLname"
//         name="lname"
//         isRequired={true}
//         readOnly={true}
//         placeholder={armInfo.lname || ""}
//       />
//       <div>
//         <label
//           htmlFor="armAssignDate"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Date *
//         </label>
//         <input
//           type="date"
//           id="armAssignDate"
//           name="armAssignDate"
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//       </div>
//       <TextInput
//         label="Employee Number"
//         id="armEmpNo"
//         name="empNo"
//         isRequired={true}
//         readOnly={true}
//         placeholder={armInfo.empNo || ""}
//       />
//       <TextInput
//         label="Group"
//         id="armGroup"
//         name="groupId"
//         isRequired={true}
//         readOnly={true}
//         placeholder={armInfo.groupId ? armInfo.groupId.toString() : ""}
//       />
//       <TextInput
//         label="Designation"
//         id="armDesignation"
//         name="designation"
//         isRequired={true}
//         value={armInfo.designation || ""}
//         onChange={onChangeHandler}
//       />
//       <TextInput
//         label="Centre"
//         id="armCentre"
//         name="armCentre"
//         isRequired={true}
//         readOnly={true}
//         placeholder={user.employeeCenter || ""}
//       />
//       <TextInput
//         label="Email Id"
//         id="armEmail"
//         name="email"
//         type="email"
//         isRequired={true}
//         readOnly={true}
//         placeholder={armInfo.email || ""}
//       />
//       <TextInput
//         label="Mobile Number"
//         id="armMobile"
//         name="mobileNumber"
//         type="tel"
//         isRequired={true}
//         value={armInfo.mobileNumber || ""}
//         onChange={onChangeHandler}
//       />
//       <TextInput
//         label="Tele No./Ext. No"
//         id="armTele"
//         name="teleNumber"
//         type="tel"
//         isRequired={true}
//         value={armInfo.teleNumber || ""}
//         onChange={onChangeHandler}
//       />
//     </div>
//   );
// }

// export default ArmInfoRenewalSection;
// src/components/domain-form/ArmInfoRenewalSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";

function ArmInfoRenewalSection({ armInfo, updateDomainRenewalRequest }) {

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    updateDomainRenewalRequest("armInfo", {
      ...armInfo,
      [name]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      <TextInput
        label="ARM First Name"
        id="armFname"
        name="firstName"
        isRequired={true}
        readOnly={true}
        placeholder={armInfo.firstName || ""}
      />
      <TextInput
        label="ARM Last Name"
        id="armLname"
        name="lastName"
        isRequired={true}
        readOnly={true}
        placeholder={armInfo.lastName || ""}
      />
      <div>
        <label
          htmlFor="armAssignDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date *
        </label>
        <input
          type="date"
          id="armAssignDate"
          name="armAssignDate"
          required
          value={new Date().toISOString().split("T")[0]}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <TextInput
        label="Employee Number"
        id="armEmpNo"
        name="empNo"
        isRequired={true}
        readOnly={true}
        placeholder={armInfo.empNo || ""}
      />
      <TextInput
        label="Group"
        id="armGroup"
        name="groupId"
        isRequired={true}
        readOnly={true}
        placeholder={armInfo.groupName ? armInfo.groupName.toString() : ""}
      />
      <TextInput
        label="Designation"
        id="armDesignation"
        name="designation"
        isRequired={true}
        value={armInfo.designation || ""}
        onChange={onChangeHandler}
      />
      <TextInput
        label="Centre"
        id="armCentre"
        name="centreId"
        isRequired={true}
        readOnly={true}
        placeholder={armInfo.centreName || ""}
      />
      <TextInput
        label="Email Id"
        id="armEmail"
        name="email"
        type="email"
        isRequired={true}
        readOnly={true}
        placeholder={armInfo.email || ""}
      />
      <TextInput
        label="Mobile Number"
        id="armMobile"
        name="mobileNumber"
        type="tel"
        isRequired={true}
        value={armInfo.mobileNumber || ""}
        onChange={onChangeHandler}
      />
      <TextInput
        label="Tele No./Ext. No"
        id="armTele"
        name="teleNumber"
        type="tel"
        isRequired={true}
        value={armInfo.teleNumber || ""}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default ArmInfoRenewalSection;
