// src/components/forms/RadioGroup.jsx
import React from "react";

// Props: label, name, options (array of {value, label}), isRequired, selectedValue, onChange
function RadioGroup({
  label,
  name,
  options = [],
  isRequired = false,
  selectedValue,
  onChange,
  readOnly = false
}) {
  return (
    <fieldset className="mb-4">
      <legend className="block text-sm font-medium text-gray-700 mb-1">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </legend>
      <div className="flex items-center space-x-4 mt-1">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value} // Control checked state
              onChange={!readOnly ? onChange : undefined}
              disabled={readOnly}// Handle change
              required={isRequired}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-gray-900"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default RadioGroup;
