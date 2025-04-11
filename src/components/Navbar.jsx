// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling

// Import icons for the navbar items
import {
  MdOutlineDashboard,
  MdOutlineAddCircleOutline,
  MdOutlineAutorenew,
  MdOutlineSwapHoriz, // Or MdOutlineCompareArrows for Transfer/Delete
  MdOutlineVisibility,
  MdOutlineAssessment,
} from "react-icons/md";

const navItems = [
  { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
  { name: "Add Domain", href: "/domains/add", icon: MdOutlineAddCircleOutline },
  { name: "Renew Domain", href: "/domains/renew", icon: MdOutlineAutorenew },
  {
    name: "Transfer/Delete Domain",
    href: "/domains/transfer-delete",
    icon: MdOutlineSwapHoriz,
  },
  { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
  { name: "Reports", href: "/reports", icon: MdOutlineAssessment },
];

function Navbar() {
  // Define base and active styles using Tailwind
  const baseStyle =
    "flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  const activeStyle = "bg-blue-50 text-blue-700 border-l-4 border-blue-500"; // Example active style

  return (
    // Use id for skip link target
    <nav id="main-nav" className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-1 sm:space-x-4 overflow-x-auto py-1">
          {" "}
          {/* Centered links */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              // NavLink provides 'isActive' in the function passed to className/style
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : ""}`
              }
            >
              <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
              <span className="whitespace-nowrap">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
