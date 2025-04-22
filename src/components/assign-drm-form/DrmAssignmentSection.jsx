// // src/components/assign-drm-form/DrmAssignmentSection.jsx
// import React, { useEffect, useState } from "react";
// import TextInput from "../forms/TextInput";
// import { MdOutlineLock } from "react-icons/md";
// import axios from "axios";
// import {API_BASE_URL} from '../config/env.config.js';
// import { isAuthenticatedState } from "../../recoil/atoms/authState.js";

// function DrmAssignmentSection({user}) {
//   // HOD's Centre/Group - Fetched later

//   const [drmDetails,setDrmDetails] = useState({
//     fname:"",
//     lname:"",
//     centre:"",
//     group:""
//   })
//   const [drmEmpNo,setDrmEmpNo] = useState(-1)
//   cosnt [loading,setLoading] = useState(true)
//   const [error,setError] = useState("")
//   const [drmFound,setDrmFound] = useState(false)
//   const isAuthenticated = useRecoilValue(isAuthenticatedState)

//   useEffect(()=>{

//     if(!drmEmpNo) {
//       setDrmDetails({
//         fname:"",
//         lname:""
//       })
//       // setDrmFound(false)
//       setError("")
//       console.log("NO DRM EMP NO YET")
//       return
//     }

//     const handler = setTimeout(async ()=>{
//         setLoading(true);
    
//         try {
//           const response = await axios
//           .get(`${API_BASE_URL}/api/users/details/${user.role}/${drmEmpNo}`,{
//             headers:{
//               'Content-Type':'application/json',
//               'Authorization':`Bearer ${isAuthenticated}`
//             },        
//           })

//           if(!response.data.drm_fname){
//             setDrmFound(false)
//             return

//           }
           
//           setDrmFound(true)

//           console.log("RESPONSE",response.data)
//           setDrmDetails({
//             fname:response.data.drm_fname,
//             lname:response.data.drm_lname,
//             centre:user.employeeCentre,
//             group:user.employeeGroup
//           })
//           setLoading(false)

//         }catch(error){
//           setDrmDetails({
//             fname:"",
//             lname:""
//           })
//           setDrmFound(false)
//           console.log(error)
//           setError(error)
//         }
//     },500)

//     return ()=>clearTimeout(handler)
//   },[drmEmpNo,user.role])







//   // Placeholder for fetched DRM details - Populated later by API call
 

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       {/* --- Key Input: Employee Number --- */}
//       <div className="md:col-span-2">
//         {" "}
//         {/* Span full width initially */}
//         <TextInput
//           label="DRM Employee Number"
//           id="assignDrmEmpNo"
//           name="drmEmpNo" // This value will be submitted
//           isRequired={true}
//           placeholder="Enter DRM's Employee No. to fetch details"
//           type="number" // Or "text" with pattern validation later
//           // value={...} // Control with state later
//           // onChange={...} // Handle change with debouncing later
//         />
//         {/* Placeholder for validation/fetch status */}
//         {!drmFound && <p className="text-xs text-red-500 mt-1">DRM not found or invalid.</p>}
//       </div>

//       {/* --- Auto-filled/Locked Fields --- */}
//       {/* These would ideally only show *after* a valid EmpNo is entered and details are fetched */}
//       {/* For static layout, we show them read-only */}

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
// src/components/assign-drm-form/DrmAssignmentSection.jsx


import React, { useEffect, useState } from "react";
import TextInput from "../forms/TextInput";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";
import { API_BASE_URL } from "../../config/env.config.js";
import { useRecoilValue } from "recoil";
import { authTokenState, isAuthenticatedState } from "../../recoil/atoms/authState.js";

function DrmAssignmentSection({ user }) {
  // Initial state for DRM details, using user's centre and group values as defaults.
  const [drmDetails, setDrmDetails] = useState({
    fname: "",
    lname: "",
    centre: user.employeeCentre, // preset from the user prop
    group: user.employeeGroup,   // preset from the user prop
  });
  
  const [drmEmpNo, setDrmEmpNo] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drmFound, setDrmFound] = useState(false);
  
  const isAuthenticated = useRecoilValue(authTokenState);

  useEffect(() => {
    // If no DRM Employee Number is provided, clear the names and exit.
    if (!drmEmpNo || drmEmpNo === -1) {
      setDrmDetails((prev) => ({
        ...prev,
        fname: "",
        lname: "",
      }));
      setDrmFound(false);
      setError("");
      console.log("NO DRM EMP NO YET");
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);

      try {
        // Assume the API uses GET to fetch details by role and employee number.
        const response = await axios.get(
          `${API_BASE_URL}/api/users/details/DRM/${drmEmpNo}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isAuthenticated}`,
            },
          }
        );

        // If the API response does not include a DRM first name, mark as not found.
        if (!response.data.drm_fname) {
          setDrmFound(false);
          setLoading(false);
          return;
        }

        setDrmFound(true);
        console.log("RESPONSE", response.data);
        // Update only fname and lname, while preserving centre and group
        setDrmDetails((prevDetails) => ({
          ...prevDetails,
          fname: response.data.drm_fname,
          lname: response.data.drm_lname,
          // Centre and group remain as initially set from the user
          centre: user.employeeCenter,
          group: user.employeeGroup,
        }));
        setLoading(false);
      } catch (err) {
        console.error(err);
        // On error, clear the first and last names and mark DRM as not found.
        setDrmDetails((prevDetails) => ({
          ...prevDetails,
          fname: "",
          lname: "",
        }));
        setDrmFound(false);
        setError("Error fetching DRM details");
        setLoading(false);
      }
    }, 5000);

    // Cleanup the debounce timer if drmEmpNo changes before 500ms.
    return () => clearTimeout(handler);
  }, [drmEmpNo, user.role, isAuthenticated, user.employeeCentre, user.employeeGroup]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {/* --- Key Input: Employee Number --- */}
      <div className="md:col-span-2">
        <TextInput
          label="DRM Employee Number"
          id="assignDrmEmpNo"
          name="drmEmpNo" // This value will be submitted
          isRequired={true}
          placeholder="Enter DRM's Employee No. to fetch details"
          type="number" // Or "text" with pattern validation later
          // Make sure to update the state on change
          onChange={(e) => setDrmEmpNo(e.target.value)}
        />
        {/* Validation or fetch status */}
        {loading && <p className="text-xs text-gray-500 mt-1">Fetching details...</p>}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {!loading && drmEmpNo && !drmFound && (
          <p className="text-xs text-red-500 mt-1">DRM not found or invalid.</p>
        )}
      </div>

      {/* --- Auto-filled/Locked Fields --- */}
      <TextInput
        label="DRM First Name"
        id="dispDrmFname"
        name="dispDrmFname"
        value={drmDetails.fname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />
      <TextInput
        label="DRM Last Name"
        id="dispDrmLname"
        name="dispDrmLname"
        value={drmDetails.lname || ""}
        readOnly={true}
        placeholder="(Auto-filled)"
      />

      <div className="relative">
        <TextInput
          label="Centre"
          id="assignDrmCentre"
          name="drmCentreDisplay"
          isRequired={true}
          value={drmDetails.centre}
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
          value={drmDetails.group}
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

