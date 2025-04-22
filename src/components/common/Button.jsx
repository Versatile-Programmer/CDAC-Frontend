// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, variant = "primary", ...props }) => {
  // Define classes based on variant
  const baseClasses = "px-4 py-2 rounded focus:outline-none transition-colors";
  const variantClasses =
    variant === "outline"
      ? "border border-blue-500 text-blue-500 hover:bg-blue-50"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};
