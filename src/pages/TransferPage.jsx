
// export default TransferRequestSection;
// import React, { useState } from "react";
// import TextInput from "../components/forms/TextInput";
// import FileUpload from "../components/forms/FileUpload";
// import { debounce } from "lodash";
// import { useParams } from "react-router-dom";
// import { getThemeForDays } from "../utils/themes";
// import MainLayout from "../layouts/MainLayout";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";
// import axios from "axios";

// function TransferRequestSection() {
//     const currentTheme = getThemeForDays("default");
//     const authToken = useRecoilValue(authTokenState);

//     const domainId = useParams().domainId;
//     const [formData, setFormData] = useState({
//         dm_id: domainId,
//         trns_frm: "",
//         trns_to: "",
//         rsn_for_trns: "",
//         prf_upload: null,
//     });

//     const [drmFromInfo, setDrmFromInfo] = useState(null);
//     const [drmToInfo, setDrmToInfo] = useState(null);

//     const fetchDrmInfo = async (empNo, isFrom) => {
//         if (!empNo) return;
//         try {
//             const response = await axios.get(`${API_BASE_URL}/api/users/details/DRM/${empNo}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}`
//                 }
//             });
//             const data = response.data;
//             if (isFrom) {
//                 setDrmFromInfo(data);
//             } else {
//                 setDrmToInfo(data);
//             }
//         } catch (error) {
//             console.error("Failed to fetch DRM info:", error);
//             if (isFrom) {
//                 setDrmFromInfo(null);
//             } else {
//                 setDrmToInfo(null);
//             }
//         }
//     };

//     const debouncedFetchFrom = debounce((empNo) => fetchDrmInfo(empNo, true), 500);
//     const debouncedFetchTo = debounce((empNo) => fetchDrmInfo(empNo, false), 500);

//     const handleChange = (field, value) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));

//         if (field === "trns_frm") debouncedFetchFrom(value);
//         if (field === "trns_to") debouncedFetchTo(value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Submitting formData:", formData);
//         // You can replace this with an actual POST request
//     };

//     const renderDrmCard = (info, label) => (
//         <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow p-4">
//             <h3 className="text-lg font-semibold mb-2 text-gray-700">{label}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
//                 <p><strong>Name:</strong> {info.drm_fname} {info.drm_lname}</p>
//                 <p><strong>Email:</strong> {info.email_id}</p>
//                 <p><strong>Mobile:</strong> {info.mob_no}</p>
//                 {info.division && <p><strong>Division:</strong> {info.division}</p>}
//             </div>
//         </div>
//     );

//     return (
//         <MainLayout>
//             <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                     <TextInput
//                         label="Transfer From (DRM Emp No)"
//                         id="trns_frm"
//                         name="trns_frm"
//                         placeholder="e.g., 220003"
//                         value={formData.trns_frm}
//                         isRequired={true}
//                         onChange={(e) => handleChange("trns_frm", e.target.value)}
//                     />
//                     {drmFromInfo && renderDrmCard(drmFromInfo, "From DRM Information")}

//                     <TextInput
//                         label="Transfer To (DRM Emp No)"
//                         id="trns_to"
//                         name="trns_to"
//                         placeholder="e.g., 220004"
//                         value={formData.trns_to}
//                         isRequired={true}
//                         onChange={(e) => handleChange("trns_to", e.target.value)}
//                     />
//                     {drmToInfo && renderDrmCard(drmToInfo, "To DRM Information")}

//                     <div className="md:col-span-2">
//                         <TextInput
//                             label="Reason for Transfer"
//                             id="rsn_for_trns"
//                             name="rsn_for_trns"
//                             placeholder="e.g., Current DRM is retiring."
//                             value={formData.rsn_for_trns}
//                             isRequired={true}
//                             onChange={(e) => handleChange("rsn_for_trns", e.target.value)}
//                         />
//                     </div>

//                     <div className="md:col-span-2">
//                         <FileUpload
//                             label="Upload Proof Document"
//                             id="prf_upload"
//                             name="prf_upload"
//                             onUpload={(fileData) => handleChange("prf_upload", fileData)}
//                         />
//                     </div>

//                     <div className="md:col-span-2 text-right">
//                         <button
//                             type="submit"
//                             className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//                         >
//                             Submit Transfer Request
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </MainLayout>
//     );
// }

// export default TransferRequestSection;
// import React, { useState } from "react";
// import TextInput from "../components/forms/TextInput";
// import FileUpload from "../components/forms/FileUpload";
// import { debounce } from "lodash";
// import { useParams } from "react-router-dom";
// import { getThemeForDays } from "../utils/themes";
// import MainLayout from "../layouts/MainLayout";
// import { API_BASE_URL } from "../config/env.config";
// import { useRecoilValue } from "recoil";
// import { authTokenState } from "../recoil/atoms/authState";
// import axios from "axios";

// function TransferRequestSection() {
//     const currentTheme = getThemeForDays("default");
//     const authToken = useRecoilValue(authTokenState);

//     const domainId = useParams().domainId;
//     const [formData, setFormData] = useState({
//         dm_id: domainId,
//         trns_frm: "",
//         trns_to: "",
//         rsn_for_trns: "",
//         prf_upload: null,
//     });

//     const [drmFromInfo, setDrmFromInfo] = useState(null);
//     const [drmToInfo, setDrmToInfo] = useState(null);
//     const [error, setError] = useState(null);

//     const fetchDrmInfo = async (empNo, isFrom) => {
//         if (!empNo) return;
//         try {
//             const response = await axios.get(`${API_BASE_URL}/api/users/details/DRM/${empNo}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}`
//                 }
//             });
//             const data = response.data;
//             if (isFrom) {
//                 setDrmFromInfo(data);
//                 setError(null); // clear error if data is fetched successfully
//             } else {
//                 setDrmToInfo(data);
//                 setError(null);
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 setError("Employee does not exist.");
//             } else {
//                 setError("Failed to fetch DRM information.");
//             }
//             if (isFrom) {
//                 setDrmFromInfo(null);
//             } else {
//                 setDrmToInfo(null);
//             }
//         }
//     };

//     const debouncedFetchFrom = debounce((empNo) => fetchDrmInfo(empNo, true), 500);
//     const debouncedFetchTo = debounce((empNo) => fetchDrmInfo(empNo, false), 500);

//     const handleChange = (field, value) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));

//         if (field === "trns_frm") debouncedFetchFrom(value);
//         if (field === "trns_to") debouncedFetchTo(value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Submitting formData:", formData);
//         // Replace this with an actual POST request
//     };

//     const renderDrmCard = (info, label) => (
//         <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow p-4">
//             <h3 className="text-lg font-semibold mb-2 text-gray-700">{label}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
//                 <p><strong>Name:</strong> {info.drm_fname} {info.drm_lname}</p>
//                 <p><strong>Email:</strong> {info.email_id}</p>
//                 <p><strong>Mobile:</strong> {info.mob_no}</p>
//                 {info.division && <p><strong>Division:</strong> {info.division}</p>}
//             </div>
//         </div>
//     );

//     return (
//         <MainLayout>
//             <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                     <TextInput
//                         label="Transfer From (DRM Emp No)"
//                         id="trns_frm"
//                         name="trns_frm"
//                         placeholder="e.g., 220003"
//                         value={formData.trns_frm}
//                         isRequired={true}
//                         onChange={(e) => handleChange("trns_frm", e.target.value)}
//                     />
//                     {drmFromInfo && renderDrmCard(drmFromInfo, "From DRM Information")}
//                     {error && formData.trns_frm && <p className="text-red-500 text-sm mt-2">{error}</p>}

//                     <TextInput
//                         label="Transfer To (DRM Emp No)"
//                         id="trns_to"
//                         name="trns_to"
//                         placeholder="e.g., 220004"
//                         value={formData.trns_to}
//                         isRequired={true}
//                         onChange={(e) => handleChange("trns_to", e.target.value)}
//                     />
//                     {drmToInfo && renderDrmCard(drmToInfo, "To DRM Information")}
//                     {error && formData.trns_to && <p className="text-red-500 text-sm mt-2">{error}</p>}

//                     <div className="md:col-span-2">
//                         <TextInput
//                             label="Reason for Transfer"
//                             id="rsn_for_trns"
//                             name="rsn_for_trns"
//                             placeholder="e.g., Current DRM is retiring."
//                             value={formData.rsn_for_trns}
//                             isRequired={true}
//                             onChange={(e) => handleChange("rsn_for_trns", e.target.value)}
//                         />
//                     </div>

//                     <div className="md:col-span-2">
//                         <FileUpload
//                             label="Upload Proof Document"
//                             id="prf_upload"
//                             name="prf_upload"
//                             onUpload={(fileData) => handleChange("prf_upload", fileData)}
//                         />
//                     </div>

//                     <div className="md:col-span-2 text-left">
//                         <button
//                             type="submit"
//                             className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//                         >
//                             Submit Transfer Request
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </MainLayout>
//     );
// }

// export default TransferRequestSection;
import React, { useState } from "react";
import TextInput from "../components/forms/TextInput";
import FileUpload from "../components/forms/FileUpload";
import { debounce } from "lodash";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { API_BASE_URL } from "../config/env.config";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/atoms/authState";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function TransferRequestSection() {
  const domainId = useParams().domainId;
  const authToken = useRecoilValue(authTokenState);

  // Styling using your theme can be applied as needed.
  // For now we assume Tailwind is handling the theme.
  const [formData, setFormData] = useState({
    dm_id: domainId,
    trns_frm: "",
    trns_to: "",
    rsn_for_trns: "",
    prf_upload: null,
  });

  const [drmFromInfo, setDrmFromInfo] = useState(null);
  const [drmToInfo, setDrmToInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchDrmInfo = async (empNo, isFrom) => {
    if (!empNo) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/details/DRM/${empNo}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
      const data = response.data;
      // Clear error if fetch is successful
      setError(null);
      if (isFrom) {
        setDrmFromInfo(data);
      } else {
        setDrmToInfo(data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Employee does not exist.");
      } else {
        setError("Failed to fetch DRM information.");
      }
      if (isFrom) {
        setDrmFromInfo(null);
      } else {
        setDrmToInfo(null);
      }
    }
  };

  // Debounced fetch functions for both transfer from and transfer to
  const debouncedFetchFrom = debounce((empNo) => fetchDrmInfo(empNo, true), 500);
  const debouncedFetchTo = debounce((empNo) => fetchDrmInfo(empNo, false), 500);

  const handleChange = (field, value) => {

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "trns_frm") debouncedFetchFrom(value);
    if (field === "trns_to") debouncedFetchTo(value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // If error exists, prevent submission and show toast notification.
    if (error) {
      toast.error(error);
      return;
    }
    // Additional validations can be added here (e.g., required fields)
    console.log("Submitting formData:", formData);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/transfers/create`,formData,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${authToken}`
            }
        })
    } catch (error) {
        console.log(error)
        throw error
        
    }



    toast.success("Transfer request submitted successfully!");
    // Place actual POST API submission logic here.
  };

  const renderDrmCard = (info, label) => (
    <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">{label}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
        <p>
          <strong>Name:</strong> {info.drm_fname} {info.drm_lname}
        </p>
        <p>
          <strong>Email:</strong> {info.email_id}
        </p>
        <p>
          <strong>Mobile:</strong> {info.mob_no}
        </p>
        {info.division && (
          <p>
            <strong>Division:</strong> {info.division}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <TextInput
            label="Transfer From (DRM Emp No)"
            id="trns_frm"
            name="trns_frm"
            placeholder="e.g., 220003"
            value={formData.trns_frm}
            isRequired={true}
            onChange={(e) => handleChange("trns_frm", e.target.value)}
          />
          {drmFromInfo && renderDrmCard(drmFromInfo, "From DRM Information")}
          {error && formData.trns_frm && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <TextInput
            label="Transfer To (DRM Emp No)"
            id="trns_to"
            name="trns_to"
            placeholder="e.g., 220004"
            value={formData.trns_to}
            isRequired={true}
            onChange={(e) => handleChange("trns_to", e.target.value)}
          />
          {drmToInfo && renderDrmCard(drmToInfo, "To DRM Information")}
          {error && formData.trns_to && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <div className="md:col-span-2">
            <TextInput
              label="Reason for Transfer"
              id="rsn_for_trns"
              name="rsn_for_trns"
              placeholder="e.g., Current DRM is retiring."
              value={formData.rsn_for_trns}
              isRequired={true}
              onChange={(e) => handleChange("rsn_for_trns", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <FileUpload
              label="Upload Proof Document"
              id="prf_upload"
              name="prf_upload"
              onUpload={(fileData) => handleChange("prf_upload", fileData)}
            />
          </div>

          <div className="md:col-span-2 text-left">
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Transfer Request
            </button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}

export default TransferRequestSection;


