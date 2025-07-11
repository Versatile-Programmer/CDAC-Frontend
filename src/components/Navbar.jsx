// src/components/Navbar.jsx
import React, { use } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling
import NotificationBell from "./notifications/NotificationBell"
import {
  MdOutlineDashboard,
  MdOutlineAddCircleOutline,
  MdOutlineAutorenew,
  MdOutlineSwapHoriz,
  MdOutlineVisibility,
  MdOutlineAssessment,
  MdOutlinePlaylistAdd,
  MdWorkHistory,
  MdOutlineFactCheck,
  MdLogout, // Keep dedicated logout icon import
} from "react-icons/md";
import fetchUser from "../utils/fetchUser";
import { useResetRecoilState, useSetRecoilState,useRecoilValue} from "recoil";
import {
  authTokenState,
  isAuthenticatedState,
  userState,
} from "../recoil/atoms/authState";
import { useNavigate } from "react-router-dom";
import { notifySuccess, ToastContainer } from "../utils/toastUtils";
import { set } from "lodash";
import { useEffect } from "react";

// Simulate getting user role from context/auth (replace with real logic)
// let userDetails = fetchUser(); // Fetch user details once


// Define nav items for each role (match Dashboard activities)
// Using MdOutlineAssessment for Logout temporarily as per original code
// Consider using MdLogout for the 'Logout' item icon if the logic is updated later
const navMap = {
  'DRM': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Add Domain", href: "/list/projects", icon: MdOutlineAddCircleOutline },
    { name: "Renew Domain", href: "/domains/renew", icon: MdOutlineAutorenew },
    { name: "Transfer/Delete Domain", href: "/domains/transfer-delete", icon: MdOutlineSwapHoriz },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    { name: "Reports", href: "/reports", icon: MdOutlineAssessment },
    // Icon: MdOutlineAssessment as per current code
  ],
  'HOD': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Assign DRM/Projects", href: "/projects/assign", icon: MdOutlinePlaylistAdd },
    { name: "Assigned Projects", href: "/projects/assigned", icon: MdWorkHistory },
    { name: "Verify Domain Requests", href: "/domains/hod/verify-requests", icon: MdOutlineFactCheck },
    // { name: "Verify VAPT Renewal", href: "/view/vapt-renewals", icon: MdOutlineFactCheck },
    // { name: "Verify Transfer Requests", href: "/domains/view/verify-transfer-requests", icon: MdOutlineFactCheck },
    // { name: "Verify Renewal Requests", href: "/domains/hod/verify-renewal", icon: MdOutlineFactCheck },
     // Icon: MdOutlineAssessment as per current code
  ],
  'ARM': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/arm/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/arm/verify-renewal", icon: MdOutlineFactCheck }, // Corrected path
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
   // Icon: MdOutlineAssessment as per current code
  ],
  'ED': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/ed/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/ed/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    // Icon: MdOutlineAssessment as per current code
  ],
  'NETOPS': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/netops/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/netops/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
     // Icon: MdOutlineAssessment as per current code
  ],
  'WEBMASTER': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Enter Purchase Details", href: "/domains/webmaster/purchase-details", icon: MdOutlineFactCheck },
    { name: "Verify Domain Requests", href: "/domains/webmaster/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/webmaster/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
     // Icon: MdOutlineAssessment as per current code
  ],
  'HODHPC': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/hodhpc/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/hodhpc/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
     // Icon: MdOutlineAssessment as per current code
  ],
};


function Navbar() {
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  // Existing logic to get role and nav items
  const userDetails = useRecoilValue(userState);
  const role = userDetails?.role || "DRM";
  const navItems = navMap[role] || navMap.DRM;

  // --- Style Definitions ---

  // Base styling for all NavLink items: Added slight rounding
  const baseStyle =
    "flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-transparent rounded-t-md text-gray-600 transition-all duration-200 ease-in-out"; // Adjusted padding, added rounding

  // Styling for NavLink items on hover (when inactive): Added subtle background
  const hoverStyle = "hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300"; // Added background on hover

  // Styling for the active NavLink item: Added background and bolder font
  const activeStyle = "border-indigo-600 text-indigo-700 bg-indigo-50 font-semibold"; // Stronger border/text, added background, bolder font

  // Base styling for icons
  const iconBaseStyle = "mr-2 h-5 w-5 flex-shrink-0"; // Increased margin slightly, added flex-shrink-0

  // Icon style when link is inactive: Slightly darker gray
  const iconInactiveStyle = "text-gray-500";

  // Icon style when link is active: Adjusted to match active text
  const iconActiveStyle = "text-indigo-600";

  const handleLogout = () => {
    // Clear auth token and user state from Recoil
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    // Clear from localStorage (if you stored it there)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // Or whatever key you use for user details
    notifySuccess("You have been logged out.");
    navigate("/login", { replace: true }); // Redirect to login page
  };

  // useEffect(() => {
  //       const handleBeforeUnload = (event) => {
  //           handleLogout(); // Call the logout function
  //       };

  //       window.addEventListener('beforeunload', handleBeforeUnload);

  //       return () => {
  //           window.removeEventListener('beforeunload', handleBeforeUnload);
  //       };
  //   }, []);

  return (
    // Use white background, slightly increased shadow, sticky positioning
    <nav id="main-nav" className="bg-white shadow sticky top-0 z-40">
      {" "}
      {/* Changed shadow-sm to shadow */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered flex container with responsive spacing & horizontal scroll */}
        <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 overflow-x-auto py-1">
          {" "}
          {/* Adjusted spacing, added py-1 */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              // Combine styles based on isActive state
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : hoverStyle} ${
                  // Optional: Add distinct styling for Logout link if desired
                  item.name === "Logout"
                    ? "hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                    : ""
                }`
              }
            >
              {/* Use function child to dynamically style icon based on isActive */}
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`${iconBaseStyle} ${
                      isActive ? iconActiveStyle : iconInactiveStyle
                    } group-hover:text-gray-700 transition-colors duration-200 ease-in-out ${
                      // Added transition to icon
                      item.name === "Logout" && !isActive
                        ? "group-hover:text-red-500"
                        : "" // Group hover for logout icon (if needed)
                    }`}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
          <NotificationBell />
          <button
            onClick={handleLogout}
            className={`${baseStyle} ${hoverStyle} hover:text-red-600 hover:border-red-300 hover:bg-red-50`} // Apply similar styling, specific hover for logout
          >
            <MdLogout
              className={`${iconBaseStyle} ${iconInactiveStyle} group-hover:text-red-500 transition-colors duration-200 ease-in-out`}
              aria-hidden="true"
            />
            <span className="whitespace-nowrap">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;