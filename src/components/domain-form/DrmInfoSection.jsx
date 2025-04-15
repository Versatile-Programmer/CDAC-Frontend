// src/components/domain-form/DrmInfoSection.jsx
import React from "react";
import TextInput from "../forms/TextInput";
import RadioGroup from "../forms/RadioGroup";
// Import DatePicker component later

function DrmInfoSection({user,domainRequest,updateDomainRequest}) {

  const {drmInfo} = domainRequest
  const {domainDetails} = domainRequest

  const drmEmpNo = user.id


  useEffect(() => {
      if (!drmEmpNo) return; // Don't fetch if armEmpNo is not provided
  
      const fetchDrmDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await axios.get(`${API_BASE_URL}/api/users/details/DRM/${drmEmpNo}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isAuthenticated}`,
            },
          });
  
          console.log("DRM RESPONSE", res.data);
          // Update the armInfo section with the response data.
          updateDomainRequest("drmInfo", {
            ...drmInfo,
            empNo: res.data.emp_no,
            fname: res.data.arm_fname,
            lname: res.data.arm_lname,
            email: res.data.email_id,
            designation: res.data.desig,
            teleNumber: res.data.tele_no,
            mobileNumber: res.data.mob_no,
            centreId: res.data.centre_id,
            groupId: res.data.grp_id,
          });
        } catch (error) {
          console.error("ERROR OCCURRED FETCHING DRM DETAILS", error);
          setError("Failed to load DRM details. Please verify the employee number and try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchDrmDetails();
    }, [drmEmpNo, isAuthenticated, updateDomainRequest, drmInfo]);

  
    const onChangeHandlerDomain = (e)=>{
      const { name, value } = e.target;
      handler('domainDetails', {
        ...domainDetails,
        [name]: value,
      });
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
        placeholder={drmInfo.fname}
      />
      <TextInput
        label="DRM Last Name"
        id="drmLname"
        name="drmLname"
        isRequired={true}
        readOnly={true}
        placeholder={drmInfo.lname}
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
        onChange = {drmInfo.mobileNumber}
      />
      <TextInput
        label="Tele No./Ext. No"
        id="drmTele"
        name="teleNumber"
        type="tel"
        isRequired={true}
        onChange = {drmInfo.teleNumber}
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
          onChange = {onChangeHandlerDomain}
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
