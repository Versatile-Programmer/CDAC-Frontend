
// import React, { useEffect, useState } from "react";
// import TextInput from "../forms/TextInput";
// import { MdOutlineLock } from "react-icons/md";
// import axios from "axios";
// import { API_BASE_URL } from "../../config/env.config.js";
// import { useRecoilValue } from "recoil";
// import { authTokenState, isAuthenticatedState } from "../../recoil/atoms/authState.js";

// function ArmAssignmentSection({ user }) {
//   // Use user.employeeCentre and user.employeeGroup as defaults.
//   const [armDetails, setArmDetails] = useState({
//     fname: "",
//     lname: "",
//     centre: user.employeeCentre,
//     group: user.employeeGroup,
//   });
//   const [armEmpNo, setArmEmpNo] = useState(-1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [armFound, setArmFound] = useState(false);
//   const isAuthenticated = useRecoilValue(authTokenState);

//   useEffect(() => {
//     if (!armEmpNo || armEmpNo === -1) {
//       setArmDetails((prev) => ({
//         ...prev,
//         fname: "",
//         lname: "",
//       }));
//       setArmFound(false);
//       setError("");
//       console.log("NO ARM EMP NO YET");
//       return;
//     }

//     const handler = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/users/details/ARM/${armEmpNo}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${isAuthenticated}`,
//             },
//           }
//         );

//         // If response does not include arm_fname, consider it not found.
//         if (!response.data.arm_fname) {
//           setArmFound(false);
//           setLoading(false);
//           return;
//         }

//         setArmFound(true);
//         console.log("RESPONSE", response.data);
//         // Merge the fetched ARM first/last names with existing centre and group.
//         setArmDetails((prevDetails) => ({
//           ...prevDetails,
//           fname: response.data.arm_fname,
//           lname: response.data.arm_lname,
//           centre: user.employeeCenter,
//           group: user.employeeGroup,
//         }));
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setArmDetails((prevDetails) => ({
//           ...prevDetails,
//           fname: "",
//           lname: "",
//         }));
//         setArmFound(false);
//         setError("Error fetching ARM details");
//         setLoading(false);
//       }
//     }, 5000);

//     return () => clearTimeout(handler);
//   }, [armEmpNo, user.role, isAuthenticated, user.employeeCentre, user.employeeGroup]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       {/* --- Key Input: Employee Number --- */}
//       <div className="md:col-span-2">
//         <TextInput
//           label="ARM Employee Number"
//           id="assignArmEmpNo"
//           name="armEmpNo" // This value will be submitted
//           isRequired={true}
//           placeholder="Enter ARM's Employee No. to fetch details"
//           type="number" // Or "text" with pattern validation later
//           onChange={(e) => setArmEmpNo(e.target.value)}
//         />
//         {/* Display fetch status */}
//         {loading && <p className="text-xs text-gray-500 mt-1">Fetching details...</p>}
//         {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//         {!loading && armEmpNo && !armFound && (
//           <p className="text-xs text-red-500 mt-1">ARM not found or invalid.</p>
//         )}
//       </div>

//       {/* --- Auto-filled/Locked Fields --- */}
//       <TextInput
//         label="ARM First Name"
//         id="dispArmFname"
//         name="dispArmFname"
//         value={armDetails.fname || ""}
//         readOnly={true}
//         placeholder="(Auto-filled)"
//       />
//       <TextInput
//         label="ARM Last Name"
//         id="dispArmLname"
//         name="dispArmLname"
//         value={armDetails.lname || ""}
//         readOnly={true}
//         placeholder="(Auto-filled)"
//       />

//       <div className="relative">
//         <TextInput
//           label="Centre"
//           id="assignArmCentre"
//           name="armCentreDisplay"
//           isRequired={true}
//           value={armDetails.centre}
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
//           value={armDetails.group}
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

import React, { useEffect, useState, useCallback } from "react";
import TextInput from "../forms/TextInput"; // Assuming TextInput accepts className
import { MdOutlineLock, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import { API_BASE_URL } from "../../config/env.config.js";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authState.js"; // Correct atom import

// Debounce function (can be moved to a utils file if used elsewhere)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


function ArmAssignmentSection({ user }) {
  // State for ARM details, pre-filled Centre/Group
  const [armDetails, setArmDetails] = useState({
    fname: "",
    lname: "",
    // Ensure user object and its properties exist, provide fallbacks
    centre: user?.employeeCenter ?? "Unknown Centre",
    group: user?.employeeGroup ?? "Unknown Group",
  });

  // State for the entered employee number
  const [armEmpNo, setArmEmpNo] = useState(''); // Use empty string initially

  // State to track the status of fetching ARM details
  const [fetchStatus, setFetchStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error', 'not_found'
  const [errorMessage, setErrorMessage] = useState(''); // Store specific error message

  const isAuthenticated = useRecoilValue(authTokenState);

  // --- Debounced API Fetch Logic ---
  const fetchArmData = useCallback(async (empNo) => {
    if (!empNo) {
        setFetchStatus('idle'); // Reset if input is cleared
        setArmDetails(prev => ({ ...prev, fname: "", lname: "" }));
        return;
    }

    console.log(`Fetching ARM details for Emp No: ${empNo}`);
    setFetchStatus('loading');
    setErrorMessage(''); // Clear previous errors
    setArmDetails(prev => ({ ...prev, fname: "", lname: "" })); // Clear previous names

    try {
      const response = await axios.get(
        // Assuming API endpoint structure: fetches ARM details based on EmpNo
        `${API_BASE_URL}/api/users/details/ARM/${empNo}`, // Changed role to ARM
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuthenticated}`,
          },
        }
      );

      // Check if data and expected field (e.g., arm_fname) exist
      if (response.data && response.data.arm_fname) { // Check for arm_fname
        console.log("ARM Found:", response.data);
        setArmDetails(prev => ({
          ...prev,
          fname: response.data.arm_fname, // Use arm_fname
          lname: response.data.arm_lname, // Use arm_lname
          // Re-affirm centre/group from user prop
           centre: user?.employeeCentre ?? "Unknown Centre",
           group: user?.employeeGroup ?? "Unknown Group",
        }));
        setFetchStatus('success');
      } else {
        // API returned success but no valid ARM data
        console.log("ARM Not Found (API success, no data)");
        setFetchStatus('not_found');
      }
    } catch (err) {
      console.error("Error fetching ARM:", err);
      let msg = "An error occurred while fetching ARM details.";
      if (err.response) {
          if (err.response.status === 404) {
              msg = "ARM with this Employee Number not found.";
              setFetchStatus('not_found');
          } else if (err.response.status === 401 || err.response.status === 403) {
              msg = "Authentication error.";
              setFetchStatus('error');
          } else {
               msg = `Error: ${err.response.data?.message || err.response.statusText || 'Server error'}`;
               setFetchStatus('error');
          }
      } else if (err.request) {
          msg = "Network error. Please check your connection.";
          setFetchStatus('error');
      }
      setErrorMessage(msg);
      // Clear names on error
       setArmDetails(prev => ({ ...prev, fname: "", lname: "" }));
    }
  }, [isAuthenticated, user?.employeeCentre, user?.employeeGroup]); // Dependencies for the fetch logic


  // --- useEffect for Debouncing ---
  useEffect(() => {
    const debouncedFetch = debounce(fetchArmData, 750); // 750ms delay
    debouncedFetch(armEmpNo); // Call with current armEmpNo
  }, [armEmpNo, fetchArmData]); // Re-run effect when armEmpNo or fetchArmData changes


  // --- Helper to render status icon (Identical to DRM version) ---
  const renderStatusIcon = () => {
    switch (fetchStatus) {
      case 'loading':
        return <AiOutlineLoading className="animate-spin h-5 w-5 text-gray-400" title="Loading..." />;
      case 'success':
        return <MdCheckCircle className="h-5 w-5 text-green-500" title="ARM Found" />; // Changed title
      case 'error':
      case 'not_found':
          if (armEmpNo) {
              return <MdErrorOutline className="h-5 w-5 text-red-500" title={fetchStatus === 'error' ? 'Error' : 'Not Found'} />;
          }
          return null;
      default:
        return null;
    }
  };

  // --- Helper to render status text (Identical logic to DRM version) ---
    const renderStatusText = () => {
    switch (fetchStatus) {
      case 'loading':
        return <p className="text-xs text-gray-500 mt-1">Fetching details...</p>;
      case 'success':
         return <p className="text-xs text-green-600 mt-1">ARM details loaded.</p>; // Changed text
      case 'not_found':
          if (armEmpNo) {
            return <p className="text-xs text-red-500 mt-1">ARM not found for this Employee No.</p>; // Changed text
          }
          return null;
      case 'error':
         if (armEmpNo) {
            return <p className="text-xs text-red-500 mt-1">{errorMessage || "An error occurred."}</p>;
          }
          return null;
      default:
        return null;
    }
  };

   // --- Define common input styles (Identical to DRM version) ---
   const baseInputStyle = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out";
   const readOnlyInputStyle = `${baseInputStyle} bg-gray-100 cursor-not-allowed`;
   const normalInputStyle = `${baseInputStyle} bg-white`;

  return (
    // Added subtle background and padding to the section content
    <div className="bg-gray-50 p-4 rounded-md space-y-4 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* --- Key Input: Employee Number --- */}
            <div className="md:col-span-2">
                <div className="relative">
                    <TextInput
                        label="ARM Employee Number"
                        id="assignArmEmpNo"
                        name="armEmpNo" // Crucial for form submission
                        isRequired={true}
                        placeholder="Enter Employee No. to find ARM" // Changed placeholder
                        type="number"
                        value={armEmpNo} // Control the input
                        onChange={(e) => setArmEmpNo(e.target.value)} // Update state
                        className={normalInputStyle} // Apply normal style
                    />
                    {/* Status Icon Area */}
                    <div className="absolute right-3 top-[calc(1.75rem+0.5rem)] transform -translate-y-1/2 flex items-center pointer-events-none">
                         {renderStatusIcon()}
                    </div>
                </div>
                 {/* Status Text Area */}
                 <div className="min-h-[1.25rem] mt-1">
                     {renderStatusText()}
                 </div>
            </div>

            {/* --- Auto-filled/Locked Fields --- */}
            <TextInput
                label="ARM First Name"
                id="dispArmFname"
                // name="dispArmFname"
                value={armDetails.fname} // Display fetched value
                readOnly={true}
                placeholder="(Auto-filled)"
                className={`${readOnlyInputStyle} ${!armDetails.fname ? "italic" : ""}`} // Apply read-only style
            />
            <TextInput
                label="ARM Last Name"
                id="dispArmLname"
                // name="dispArmLname"
                value={armDetails.lname}
                readOnly={true}
                placeholder="(Auto-filled)"
                className={`${readOnlyInputStyle} ${!armDetails.lname ? "italic" : ""}`} // Apply read-only style
            />

            <div className="relative">
                <TextInput
                    label="Centre"
                    id="assignArmCentre"
                    // name="armCentreDisplay"
                    value={armDetails.centre} // Display pre-filled value
                    readOnly={true}
                    className={readOnlyInputStyle} // Apply read-only style
                />
                <MdOutlineLock
                    className="absolute right-3 top-9 text-gray-400 h-5 w-5 cursor-help"
                    title="Centre is locked based on your profile"
                />
            </div>
            <div className="relative">
                <TextInput
                    label="Group"
                    id="assignArmGroup"
                    // name="armGroupDisplay"
                    value={armDetails.group} // Display pre-filled value
                    readOnly={true}
                    className={readOnlyInputStyle} // Apply read-only style
                />
                <MdOutlineLock
                    className="absolute right-3 top-9 text-gray-400 h-5 w-5 cursor-help"
                    title="Group is locked based on your profile"
                />
            </div>
        </div>
    </div>
  );
}

export default ArmAssignmentSection;

