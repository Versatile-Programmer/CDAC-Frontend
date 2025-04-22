// src/components/Button.jsx
import React from "react";

// Props:
// - children: Button text/content
// - onClick: Function to call on click
// - type: 'button', 'submit', 'reset' (defaults to 'button')
// - variant: 'primary', 'secondary', 'danger', 'warning' etc. (for styling)
// - size: 'sm', 'md', 'lg'
// - IconComponent: Optional React icon component
// - iconPosition: 'left' or 'right' (defaults to 'left')
// - disabled: boolean
// - className: Additional Tailwind classes
function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  IconComponent,
  iconPosition = "left",
  disabled = false,
  className = "",
  ...props // Spread other props like aria-label
}) {
  // --- Base Styles ---
  const base =
    "inline-flex items-center justify-center border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  // --- Size Styles ---
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // --- Variant Styles ---
  const variantStyles = {
    primary:
      "border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500", // Example Primary
    secondary:
      "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500", // Example Secondary
    danger:
      "border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500", // Example Danger
    warning:
      "border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500", // Example Warning (like search button)
    outline:
      "border-gray-400 bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-indigo-500", // Example Outline (like download)
    // Add more variants as needed
  };

  // --- Icon Styles ---
  const iconSize = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };
  const iconMargin = size === "sm" ? "mr-1.5" : "mr-2"; // Adjust margin based on size

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Icon on the Left */}
      {IconComponent && iconPosition === "left" && (
        <IconComponent
          className={`-ml-1 ${iconMargin} ${iconSize[size]}`}
          aria-hidden="true"
        />
      )}
      {/* Button Text/Content */}
      {children}
      {/* Icon on the Right */}
      {IconComponent && iconPosition === "right" && (
        <IconComponent
          className={`-mr-1 ml-2 ${iconSize[size]}`}
          aria-hidden="true"
        /> // Adjusted margin for right
      )}
    </button>
  );
}

export default Button;
