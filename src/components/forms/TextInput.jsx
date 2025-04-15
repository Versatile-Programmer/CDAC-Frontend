// src/components/forms/TextInput.jsx
import React from "react";

// Props: label, id, name, type, placeholder, isRequired, value (optional), onChange (optional), readOnly (optional), etc.
function TextInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  isRequired = false,
  readOnly = false,
  ...props
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        // type="tel"
        id={id}
        name={name || id} // Default name to id if not provided
        placeholder={placeholder || `Enter ${label}`}
        required={isRequired}
        readOnly={readOnly}
        className={`w-full px-3 py-2 border ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        {...props} // Pass down other props like value, onChange
      />
      {/* Placeholder for potential validation messages later */}
    </div>
  );
}

export default TextInput;
