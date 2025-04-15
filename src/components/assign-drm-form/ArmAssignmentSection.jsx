// // src/components/assign-drm-form/ArmAssignmentSection.jsx
// import React from "react";
// import TextInput from "../forms/TextInput";
// import { MdOutlineLock } from "react-icons/md";

// function ArmAssignmentSection() {
//   // HOD's Centre/Group - Fetched later
//   const hodCentre = "HOD's Centre Name";
//   const hodGroup = "HOD's Group Name";

//   // Placeholder for fetched ARM details - Populated later by API call
//   const fetchedArmDetails = {
//     fname: "", // e.g., "Jane"
//     lname: "", // e.g., "Smith"
//   };
//   const armFound = false; // Flag

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       {/* --- Key Input: Employee Number --- */}
//       <div className="md:col-span-2">
//         {" "}
//         {/* Span full width initially */}
//         <TextInput
//           label="ARM Employee Number"
//           id="assignArmEmpNo"
//           name="armEmpNo" // This value will be submitted
//           isRequired={true}
//           placeholder="Enter ARM's Employee No. to fetch details"
//           type="number" // Or "text" with pattern validation later
//           // value={...} // Control with state later
//           // onChange={...} // Handle change with debouncing later
//         />
//         {/* Placeholder for validation/fetch status */}
//         {/* {!armFound && <p className="text-xs text-red-500 mt-1">ARM not found or invalid.</p>} */}
//       </div>

//       {/* --- Auto-filled/Locked Fields --- */}
//       {/* These would ideally only show *after* a valid EmpNo is entered and details are fetched */}

//       <TextInput
//         label="ARM First Name"
//         id="dispArmFname"
//         name="dispArmFname"
//         value={fetchedArmDetails.fname || ""}
//         readOnly={true}
//         placeholder="(Auto-filled)"
//       />
//       <TextInput
//         label="ARM Last Name"
//         id="dispArmLname"
//         name="dispArmLname"
//         value={fetchedArmDetails.lname || ""}
//         readOnly={true}
//         placeholder="(Auto-filled)"
//       />

//       <div className="relative">
//         <TextInput
//           label="Centre"
//           id="assignArmCentre"
//           name="armCentreDisplay"
//           isRequired={true}
//           value={hodCentre}
//           readOnly={true}
//         />
//         <MdOutlineLock
//           className="absolute right-3 top-9 text-gray-400 h-5 w-5"
//           title="Locked to HOD's centre"
//         />
//       </div>
//       <div className="relative">
//         <TextInput
//           label="Group"
//           id="assignArmGroup"
//           name="armGroupDisplay"
//           isRequired={true}
//           value={hodGroup}
//           readOnly={true}
//         />
//         <MdOutlineLock
//           className="absolute right-3 top-9 text-gray-400 h-5 w-5"
//           title="Locked to HOD's group"
//         />
//       </div>
//     </div>
//   );
// }

// export default ArmAssignmentSection;
// src/components/assign-drm-form/ArmAssignmentSection.jsx
import React, { useEffect, useState } from "react";
import TextInput from "../forms/TextInput";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";
import { API_BASE_URL } from "../../config/env.config.js";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../recoil/atoms/authState.js";

function ArmAssignmentSection({ user }) {
  // Use user.employeeCentre and user.employeeGroup as defaults.
  const [armDetails, setArmDetails] = useState({
    fname: "",
    lname: "",
    centre: user.employeeCentre,
    group: user.employeeGroup,
  });
  const [armEmpNo, setArmEmpNo] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [armFound, setArmFound] = useState(false);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  useEffect(() => {
    if (!armEmpNo || armEmpNo === -1) {
      setArmDetails((prev) => ({
        ...prev,
        fname: "",
        lname: "",
      }));
      setArmFound(false);
      setError("");
      console.log("NO ARM EMP NO YET");
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/users/details/ARM/${armEmpNo}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isAuthenticated}`,
            },
          }
        );

        // If response does not include arm_fname, consider it not found.
        if (!response.data.arm_fname) {
          setArmFound(false);
          setLoading(false);
          return;
        }

        setArmFound(true);
        console.log("RESPONSE", response.data);
        // Merge the fetched ARM first/last names with existing centre and group.
        setArmDetails((prevDetails) => ({
          ...prevDetails,
          fname: response.data.arm_fname,
          lname: response.data.arm_lname,
          centre: user.employeeCentre,
          group: user.employeeGroup,
        }));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setArmDetails((prevDetails) => ({
          ...prevDetails,
          fname: "",
          lname: "",
        }));
        setArmFound(false);
        setError("Error fetching ARM details");
        setLoading(false);
      }
    }, 5000);

    return () => clearTimeout(handler);
  }, [armEmpNo, user.role, isAuthenticated, user.employeeCentre, user.employeeGroup]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {/* --- Key Input: Employee Number --- */}
      <div className="md:col-span-2">
        <TextInput
          label="ARM Employee Number"
          id="assignArmEmpNo"
          name="armEmpNo" // This value will be submitted
          isRequired={true}
          placeholder="Enter ARM's Employee No. to fetch details"
          type="number" // Or "text" with pattern validation later
          onChange={(e) => setArmEmpNo(e.target.value)}
        />
        {/* Display fetch status */}
        {loading && <p className="text-xs text-gray-500 mt-1">Fetching details...</p>}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {!loading && armEmpNo && !armFound && (
          <p className="text-xs text-red-500 mt-1">ARM not found or invalid.</p>
        )}
      </div>

      {/* --- Auto-filled/Locked Fields --- */}
      <TextInput
        label="ARM First Name"
        id="dispArmFname"
        name="dispArmFname"
        value={armDetails.fname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />
      <TextInput
        label="ARM Last Name"
        id="dispArmLname"
        name="dispArmLname"
        value={armDetails.lname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />

      <div className="relative">
        <TextInput
          label="Centre"
          id="assignArmCentre"
          name="armCentreDisplay"
          isRequired={true}
          value={armDetails.centre}
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
          value={armDetails.group}
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

