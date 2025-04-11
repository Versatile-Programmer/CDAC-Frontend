// src/components/forms/FormSection.jsx
import React, { useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md"; // Icons for collapse/expand

// Props: title, initiallyOpen (optional, defaults to true)
function FormSection({ title, initiallyOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="border border-gray-300 rounded-md mb-6 bg-white shadow-sm">
      {/* Header section with title and toggle button */}
      <div
        className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-300 cursor-pointer rounded-t-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <button
          type="button" // Prevent form submission
          className="text-gray-500 hover:text-gray-700"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <MdOutlineExpandLess className="w-6 h-6" />
          ) : (
            <MdOutlineExpandMore className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Collapsible content area */}
      {isOpen && <div className="p-4 md:p-6">{children}</div>}
    </div>
  );
}

export default FormSection;
