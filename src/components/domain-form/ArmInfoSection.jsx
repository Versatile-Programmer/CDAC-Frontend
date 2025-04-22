// // src/components/domain-form/ArmInfoSection.jsx
// import React, { useEffect, useState } from "react";
// import TextInput from "../forms/TextInput";
// import axios from "axios";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilValue } from "recoil";
// import { isAuthenticatedState } from "../../recoil/atoms/authState";

// function ArmInfoSection({domainRequest,updateDomainRequest,armEmpNo}) {

//   const [isAuthenticated] = useRecoilValue(isAuthenticatedState)

//   const {armInfo} = domainRequest

//   useEffect(()=>{
//     if(armEmpNo === null) return

//     const fetchArmDetails = async ()=>{

//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/users/details/ARM/${armEmpNo}`,{
//           headers:{
//             'Content-Type':'application/json',
//             'Authorization':`Bearer ${isAuthenticated}`
//           }
//         })
  
//         console.log("ARM RESPONSE",res.data)
//         updateDomainRequest('armInfo',{
//           ...armInfo,
//           [empNo]:res.data.empNo
//         })


        
//       } catch (error) {
//         console.log("ERROR OCCURED ARM DETAILS",error)
//         throw error
        
//       }
  
//     }






//   },[])




//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//       {/* Note: Employee number might be searchable/selected later */}
//       <TextInput
//         label="Employee Number of ARM"
//         id="armEmpNo"
//         name="armEmpNo"
//         isRequired={true}
//         placeholder="Enter ARM's Employee No."
//       />
//       {/* Other ARM fields might be auto-filled based on Emp No later */}
//       <div /> {/* Empty div for grid alignment */}
//       <TextInput
//         label="First Name Of Nominated ARM"
//         id="armFname"
//         name="armFname"
//         isRequired={true}
//       />
//       <TextInput
//         label="Last Name Of Nominated ARM"
//         id="armLname"
//         name="armLname"
//         isRequired={true}
//       />
//       <TextInput
//         label="Email ID Of ARM"
//         id="armEmail"
//         name="armEmail"
//         type="email"
//         isRequired={true}
//       />
//       <div /> {/* Empty div for grid alignment */}
//       <TextInput
//         label="Mob No."
//         id="armMobile"
//         name="armMobile"
//         type="tel"
//         isRequired={true}
//       />
//       <TextInput
//         label="ARM's Tel No./Ext No."
//         id="armTele"
//         name="armTele"
//         type="tel"
//         isRequired={true}
//       />
//     </div>
//   );
// }

// export default ArmInfoSection;
// src/components/domain-form/ArmInfoSection.jsx
import React, { useEffect, useState } from "react";
import TextInput from "../forms/TextInput";
import axios from "axios";
import { API_BASE_URL } from "../../config/env.config";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../../recoil/atoms/authState";

function ArmInfoSection({ domainRequest, updateDomainRequest, projectDetails }) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const { armInfo } = domainRequest;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  if(!projectDetails.arm)
    return <p>Arm Details are loading</p>


  const onChangeHandler = (e)=>{
    const { name, value } = e.target;
    updateDomainRequest('armInfo', {
      ...armInfo,
      [name]: value,
    });
  };


  // useEffect(() => {
  //   if (!armEmpNo) return; // Don't fetch if armEmpNo is not provided

  //   const fetchArmDetails = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const res = await axios.get(`${API_BASE_URL}/api/users/details/ARM/${armEmpNo}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${isAuthenticated}`,
  //         },
  //       });

  //       console.log("ARM RESPONSE", res.data);
  //       // Update the armInfo section with the response data.
  //       updateDomainRequest("armInfo", {
  //         ...armInfo,
  //         empNo: res.data.emp_no,
  //         fname: res.data.arm_fname,
  //         lname: res.data.arm_lname,
  //         email: res.data.email_id,
  //         designation: res.data.desig,
  //         teleNumber: res.data.tele_no,
  //         mobileNumber: res.data.mob_no,
  //         centreId: res.data.centre_id,
  //         groupId: res.data.grp_id,
  //       });
  //     } catch (error) {
  //       console.error("ERROR OCCURRED FETCHING ARM DETAILS", error);
  //       setError("Failed to load ARM details. Please verify the employee number and try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchArmDetails();
  // }, [armEmpNo, isAuthenticated, updateDomainRequest, armInfo]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
      {/* Show error message, if any */}
      {error && (
        <div className="md:col-span-2 text-red-600">
          {error}
        </div>
      )}
      {/* Show loading indicator */}
      {loading && (
        <div className="md:col-span-2 text-gray-500">
          Loading ARM details...
        </div>
      )}
      
      {/* ARM Employee Number – typically this input could trigger the fetch */}
      <TextInput
        label="Employee Number of ARM"
        id="armEmpNo"
        name="armEmpNo"
        isRequired={true}
        placeholder="Enter ARM's Employee No."
        value = {projectDetails.arm_emp_no}
        readOnly={true}
      />
      <div /> {/* Empty div for grid alignment */}
      <TextInput
        label="First Name Of Nominated ARM"
        id="armFname"
        name="armFname"
        isRequired={true}
        readOnly={true}
        value={projectDetails.arm.arm_fname || ""}
        // onChange={() => {}} // Field is auto-filled; change handler not required
      />
      <TextInput
        label="Last Name Of Nominated ARM"
        id="armLname"
        name="armLname"
        isRequired={true}
        readOnly={true}
        value={projectDetails.arm.arm_lname || ""}
        // onChange={() => {}}
      />
      <TextInput
        label="Email ID Of ARM"
        id="armEmail"
        name="armEmail"
        type="email"
        isRequired={true}
        readOnly={true}
        value={projectDetails.arm.email_id || ""}
        // onChange={armInfo}
      />
      <div /> {/* Empty div for grid alignment */}
      <TextInput
        label="Mob No."
        id="armMobile"
        name="mobileNumber"
        type="tel"
        isRequired={true}
        value={armInfo.mobileNumber}
        onChange={onChangeHandler}
      />
      <TextInput
        label="ARM's Tel No./Ext No."
        id="armTele"
        name="teleNumber"
        type="tel"
        isRequired={true}
        value={armInfo.teleNumber}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default ArmInfoSection;

