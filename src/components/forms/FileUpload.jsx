// import React from "react";

// const FileUpload = ({ label, id, name, onUpload, isRequired = false }) => {
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     onUpload(file); // Pass the file back to the parent component
//   };

//   return (
//     <div className="flex flex-col gap-1">
//       <label htmlFor={id} className="font-medium text-sm text-gray-700">
//         {label} {isRequired && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type="file"
//         id={id}
//         name={name}
//         onChange={handleFileChange}
//         required={isRequired}
//         className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//       />
//     </div>
//   );
// };

// export default FileUpload;
// src/components/forms/FileUpload.jsx
import { BsCloudDownload } from "react-icons/bs";             // 1) import whatever icon you want

const FileUpload = ({ label, id, name, onUpload, isRequired = false }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
        alert("Please upload a valid PDF or image file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        onUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium text-sm text-gray-700">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        onChange={handleChange}
        required={isRequired}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
};

// 2) Attach an `Icon` property to your component
FileUpload.Icon = function Icon(props) {
  return <BsCloudDownload {...props} />;
};

export default FileUpload;
