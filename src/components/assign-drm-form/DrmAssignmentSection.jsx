
// import React, { useEffect, useState } from "react";
// import TextInput from "../forms/TextInput";
// import { MdOutlineLock } from "react-icons/md";
// import axios from "axios";
// import { API_BASE_URL } from "../../config/env.config.js";
// import { useRecoilValue } from "recoil";
// import { authTokenState, isAuthenticatedState } from "../../recoil/atoms/authState.js";

// function DrmAssignmentSection({ user }) {
//   // Initial state for DRM details, using user's centre and group values as defaults.
//   const [drmDetails, setDrmDetails] = useState({
//     fname: "",
//     lname: "",
//     centre: user.employeeCentre, // preset from the user prop
//     group: user.employeeGroup,   // preset from the user prop
//   });
  
//   const [drmEmpNo, setDrmEmpNo] = useState(-1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [drmFound, setDrmFound] = useState(false);
  
//   const isAuthenticated = useRecoilValue(authTokenState);

//   useEffect(() => {
//     // If no DRM Employee Number is provided, clear the names and exit.
//     if (!drmEmpNo || drmEmpNo === -1) {
//       setDrmDetails((prev) => ({
//         ...prev,
//         fname: "",
//         lname: "",
//       }));
//       setDrmFound(false);
//       setError("");
//       console.log("NO DRM EMP NO YET");
//       return;
//     }

//     const handler = setTimeout(async () => {
//       setLoading(true);

//       try {
//         // Assume the API uses GET to fetch details by role and employee number.
//         const response = await axios.get(
//           `${API_BASE_URL}/api/users/details/DRM/${drmEmpNo}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${isAuthenticated}`,
//             },
//           }
//         );

//         // If the API response does not include a DRM first name, mark as not found.
//         if (!response.data.drm_fname) {
//           setDrmFound(false);
//           setLoading(false);
//           return;
//         }

//         setDrmFound(true);
//         console.log("RESPONSE", response.data);
//         // Update only fname and lname, while preserving centre and group
//         setDrmDetails((prevDetails) => ({
//           ...prevDetails,
//           fname: response.data.drm_fname,
//           lname: response.data.drm_lname,
//           // Centre and group remain as initially set from the user
//           centre: user.employeeCenter,
//           group: user.employeeGroup,
//         }));
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         // On error, clear the first and last names and mark DRM as not found.
//         setDrmDetails((prevDetails) => ({
//           ...prevDetails,
//           fname: "",
//           lname: "",
//         }));
//         setDrmFound(false);
//         setError("Error fetching DRM details");
//         setLoading(false);
//       }
//     }, 5000);

//     // Cleanup the debounce timer if drmEmpNo changes before 500ms.
//     return () => clearTimeout(handler);
//   }, [drmEmpNo, user.role, isAuthenticated, user.employeeCentre, user.employeeGroup]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       {/* --- Key Input: Employee Number --- */}
//       <div className="md:col-span-2">
//         <TextInput
//           label="DRM Employee Number"
//           id="assignDrmEmpNo"
//           name="drmEmpNo" // This value will be submitted
//           isRequired={true}
//           placeholder="Enter DRM's Employee No. to fetch details"
//           type="number" // Or "text" with pattern validation later
//           // Make sure to update the state on change
//           onChange={(e) => setDrmEmpNo(e.target.value)}
//         />
//         {/* Validation or fetch status */}
//         {loading && <p className="text-xs text-gray-500 mt-1">Fetching details...</p>}
//         {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//         {!loading && drmEmpNo && !drmFound && (
//           <p className="text-xs text-red-500 mt-1">DRM not found or invalid.</p>
//         )}
//       </div>

//       {/* --- Auto-filled/Locked Fields --- */}
//       <TextInput
//         label="DRM First Name"
//         id="dispDrmFname"
//         name="dispDrmFname"
//         value={drmDetails.fname || ""}
//         readOnly={true}
//         placeholder="(Auto-filled)"
//       />
//       <TextInput
//         label="DRM Last Name"
//         id="dispDrmLname"
//         name="dispDrmLname"
//         value={drmDetails.lname || ""}
//         readOnly={true}
//         placeholder="(Auto-filled)"
//       />

//       <div className="relative">
//         <TextInput
//           label="Centre"
//           id="assignDrmCentre"
//           name="drmCentreDisplay"
//           isRequired={true}
//           value={drmDetails.centre}
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
//           id="assignDrmGroup"
//           name="drmGroupDisplay"
//           isRequired={true}
//           value={drmDetails.group}
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

// export default DrmAssignmentSection;




/// src/components/assign-drm-form/DrmAssignmentSection.jsx

import React, { useEffect, useState, useCallback } from "react";
import TextInput from "../forms/TextInput"; // Assuming TextInput accepts className
import { MdOutlineLock, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import { API_BASE_URL } from "../../config/env.config.js";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../../recoil/atoms/authState.js";

// Debounce function (simple implementation)
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


function DrmAssignmentSection({ user }) {
  // State for DRM details, pre-filled Centre/Group
  const [drmDetails, setDrmDetails] = useState({
    fname: "",
    lname: "",
    centre: user?.employeeCenter ?? "Unknown Centre",
    group: user?.employeeGroup ?? "Unknown Group",
  });

  // State for the entered employee number
  const [drmEmpNo, setDrmEmpNo] = useState('');

  // State to track the status of fetching DRM details
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isAuthenticated = useRecoilValue(authTokenState);

  // --- Debounced API Fetch Logic ---
  const fetchDrmData = useCallback(async (empNo) => {
    if (!empNo) {
        setFetchStatus('idle');
        setDrmDetails(prev => ({ ...prev, fname: "", lname: "" }));
        return;
    }

    console.log(`Fetching DRM details for Emp No: ${empNo}`);
    setFetchStatus('loading');
    setErrorMessage('');
    setDrmDetails(prev => ({ ...prev, fname: "", lname: "" }));

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users/details/DRM/${empNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuthenticated}`,
          },
        }
      );

      if (response.data && response.data.drm_fname) {
        console.log("DRM Found:", response.data);
        setDrmDetails(prev => ({
          ...prev,
          fname: response.data.drm_fname,
          lname: response.data.drm_lname,
           centre: user?.employeeCentre ?? "Unknown Centre",
           group: user?.employeeGroup ?? "Unknown Group",
        }));
        setFetchStatus('success');
      } else {
        console.log("DRM Not Found (API success, no data)");
        setFetchStatus('not_found');
      }
    } catch (err) {
      console.error("Error fetching DRM:", err);
      let msg = "An error occurred while fetching DRM details.";
      if (err.response) {
          if (err.response.status === 404) {
              msg = "DRM with this Employee Number not found.";
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
       setDrmDetails(prev => ({ ...prev, fname: "", lname: "" }));
    }
  }, [isAuthenticated, user?.employeeCentre, user?.employeeGroup]);


  // --- useEffect for Debouncing ---
  useEffect(() => {
    const debouncedFetch = debounce(fetchDrmData, 750);
    debouncedFetch(drmEmpNo);
  }, [drmEmpNo, fetchDrmData]);


  // --- Helper to render status icon ---
  const renderStatusIcon = () => {
    switch (fetchStatus) {
      case 'loading':
        return <AiOutlineLoading className="animate-spin h-5 w-5 text-gray-400" title="Loading..." />;
      case 'success':
        return <MdCheckCircle className="h-5 w-5 text-green-500" title="DRM Found" />;
      case 'error':
      case 'not_found':
          if (drmEmpNo) {
              return <MdErrorOutline className="h-5 w-5 text-red-500" title={fetchStatus === 'error' ? 'Error' : 'Not Found'} />;
          }
          return null;
      default:
        return null;
    }
  };

  // --- Helper to render status text ---
    const renderStatusText = () => {
    switch (fetchStatus) {
      case 'loading':
        return <p className="text-xs text-gray-500 mt-1">Fetching details...</p>;
      case 'success':
         return <p className="text-xs text-green-600 mt-1">DRM details loaded.</p>;
      case 'not_found':
          if (drmEmpNo) {
            return <p className="text-xs text-red-500 mt-1">DRM not found for this Employee No.</p>;
          }
          return null;
      case 'error':
         if (drmEmpNo) {
            return <p className="text-xs text-red-500 mt-1">{errorMessage || "An error occurred."}</p>;
          }
          return null;
      default:
        return null;
    }
  };

  // --- Define common input styles ---
  const baseInputStyle = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out";
  const readOnlyInputStyle = `${baseInputStyle} bg-gray-100 cursor-not-allowed`; // Add cursor style
  const normalInputStyle = `${baseInputStyle} bg-white`; // Normal writable input

  return (
    <div className="bg-gray-50 p-4 rounded-md space-y-4 border border-gray-200 shadow-sm"> {/* Added border/shadow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* --- Key Input: Employee Number --- */}
            <div className="md:col-span-2">
                <div className="relative">
                    <TextInput
                        label="DRM Employee Number"
                        id="assignDrmEmpNo"
                        name="drmEmpNo"
                        isRequired={true}
                        placeholder="Enter Employee No. to find DRM"
                        type="number"
                        value={drmEmpNo}
                        onChange={(e) => setDrmEmpNo(e.target.value)}
                        // Pass defined styles
                        className={normalInputStyle}
                    />
                    <div className="absolute right-3 top-[calc(1.75rem+0.5rem)] transform -translate-y-1/2 flex items-center pointer-events-none"> {/* Adjusted positioning slightly */}
                         {renderStatusIcon()}
                    </div>
                </div>
                 <div className="min-h-[1.25rem] mt-1">
                     {renderStatusText()}
                 </div>
            </div>

            {/* --- Auto-filled/Locked Fields --- */}
            <TextInput
                label="DRM First Name"
                id="dispDrmFname"
                value={drmDetails.fname}
                readOnly={true}
                placeholder="(Auto-filled)"
                // Pass defined styles
                className={`${readOnlyInputStyle} ${!drmDetails.fname ? "italic" : ""}`}
            />
            <TextInput
                label="DRM Last Name"
                id="dispDrmLname"
                value={drmDetails.lname}
                readOnly={true}
                placeholder="(Auto-filled)"
                 // Pass defined styles
                className={`${readOnlyInputStyle} ${!drmDetails.lname ? "italic" : ""}`}
            />

            <div className="relative">
                <TextInput
                    label="Centre"
                    id="assignDrmCentre"
                    value={drmDetails.centre}
                    readOnly={true}
                     // Pass defined styles
                    className={readOnlyInputStyle}
                />
                <MdOutlineLock
                    className="absolute right-3 top-9 text-gray-400 h-5 w-5 cursor-help"
                    title="Centre is locked based on your profile"
                />
            </div>
            <div className="relative">
                <TextInput
                    label="Group"
                    id="assignDrmGroup"
                    value={drmDetails.group}
                    readOnly={true}
                    // Pass defined styles
                    className={readOnlyInputStyle}
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

export default DrmAssignmentSection;