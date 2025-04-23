// // src/components/Navbar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom"; // Use NavLink for active styling

// // Import icons for the navbar items
// import {
//   MdOutlineDashboard,
//   MdOutlineAddCircleOutline,
//   MdOutlineAutorenew,
//   MdOutlineSwapHoriz, // Or MdOutlineCompareArrows for Transfer/Delete
//   MdOutlineVisibility,
//   MdOutlineAssessment,
// } from "react-icons/md";

// const navItems = [
//   { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
//   { name: "Add Domain", href: "/domains/add", icon: MdOutlineAddCircleOutline },
//   { name: "Renew Domain", href: "/domains/renew", icon: MdOutlineAutorenew },
//   {
//     name: "Transfer/Delete Domain",
//     href: "/domains/transfer-delete",
//     icon: MdOutlineSwapHoriz,
//   },
//   { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
//   { name: "Reports", href: "/reports", icon: MdOutlineAssessment },
// ];

// function Navbar() {
//   // Define base and active styles using Tailwind
//   const baseStyle =
//     "flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900";
//   const activeStyle = "bg-blue-50 text-blue-700 border-l-4 border-blue-500"; // Example active style

//   return (
//     // Use id for skip link target
//     <nav id="main-nav" className="bg-white shadow-sm border-b border-gray-200">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-center space-x-1 sm:space-x-4 overflow-x-auto py-1">
//           {" "}
//           {/* Centered links */}
//           {navItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.href}
//               // NavLink provides 'isActive' in the function passed to className/style
//               className={({ isActive }) =>
//                 `${baseStyle} ${isActive ? activeStyle : ""}`
//               }
//             >
//               <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
//               <span className="whitespace-nowrap">{item.name}</span>
//             </NavLink>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling
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
} from "react-icons/md";
import fetchUser from "../utils/fetchUser";

// Simulate getting user role from context/auth (replace with real logic)
const getUserRole = fetchUser()

// Define nav items for each role (match Dashboard activities)
const navMap = {
  'DRM': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Add Domain", href: "/domains/add", icon: MdOutlineAddCircleOutline },
    { name: "Renew Domain", href: "/domains/renew", icon: MdOutlineAutorenew },
    { name: "Transfer/Delete Domain", href: "/domains/transfer-delete", icon: MdOutlineSwapHoriz },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    { name: "Reports", href: "/reports", icon: MdOutlineAssessment },
    { name: "Logout", href: "/logout", icon: MdOutlineAssessment },
  ],
  'HOD': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Assign DRM/Projects", href: "/projects/assign", icon: MdOutlinePlaylistAdd },
    { name: "Assigned Projects", href: "/projects/assigned", icon: MdWorkHistory },
    { name: "Verify Domain Requests", href: "/domains/hod/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify VAPT Renewal", href: "/view/vapt-renewals", icon: MdOutlineFactCheck },
    { name: "Verify Transfer Requests", href: "/domains/view/verify-transfer-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/hod/verify-renewal", icon: MdOutlineFactCheck },
    { name: "Logout", href: "/logout", icon: MdOutlineAssessment },
  ],
  'ARM': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/arm/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/ed/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    { name: "Logout", href: "/logout", icon: MdOutlineAssessment },
  ],
  'ED': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/ed/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/ed/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    { name: "Logout", href: "/logout", icon: MdOutlineAssessment },
  ],
  'NETOPS': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/netops/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/netops/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    { name: "Logout", href: "/logout", icon: MdOutlineAssessment },
  ],
  'WEBMASTER': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Enter Purchase Details", href: "/domains/webmaster/purchase-details", icon: MdOutlineFactCheck },
    { name: "Verify Domain Requests", href: "/domains/webmaster/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/webmaster/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    { name: "Logout", href: "/logout", icon: MdOutlineAssessment },
  ],
  'HODHPC': [
    { name: "My Dashboard", href: "/dashboard", icon: MdOutlineDashboard },
    { name: "Verify Domain Requests", href: "/domains/hodhpc/verify-requests", icon: MdOutlineFactCheck },
    { name: "Verify Renewal Requests", href: "/domains/hodhpc/verify-renewal", icon: MdOutlineFactCheck },
    { name: "View Domains", href: "/domains/view", icon: MdOutlineVisibility },
    { name: "Logout", href: "/logout", icon: MdOutlineAssessment },
  ],
};

function Navbar() {
  const role = getUserRole.role;
  console.log("ROLE",role)
  const navItems = navMap[role] || navMap.DRM;

  const baseStyle =
    "flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  const activeStyle = "bg-blue-50 text-blue-700 border-l-4 border-blue-500";

  return (
    <nav id="main-nav" className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-1 sm:space-x-4 overflow-x-auto py-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
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
