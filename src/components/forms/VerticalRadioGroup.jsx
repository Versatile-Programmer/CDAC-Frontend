// src/components/forms/VerticalRadioGroup.jsx
import React from "react";

// Props: name, options (array of {value, label}), selectedValue, onChange, title (optional)
function VerticalRadioGroup({
  name,
  options = [],
  selectedValue,
  onChange,
  title,
}) {
  return (
    <fieldset className="mb-4">
      {title && (
        <legend className="block text-sm font-semibold text-gray-800 mb-2">
          {title}
        </legend>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange} // Logic added later
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-3 block text-sm text-gray-700 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default VerticalRadioGroup;
