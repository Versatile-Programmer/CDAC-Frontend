// // src/components/ExpiringDomainCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// // Props: days, count (placeholder), colorTheme (object), linkTo
// function ExpiringDomainCard({ days, count, colorTheme, linkTo }) {
//   // Define default theme structure in case props are missing
//   const theme = colorTheme || {
//     bg: "bg-gray-200",
//     text: "text-gray-800",
//     footerBg: "bg-gray-300",
//     countText: "text-gray-700",
//   };

//   return (
//     <Link
//       to={linkTo}
//       className={`block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${theme.bg}`}
//     >
//       {/* Card Header */}
//       <div className={`px-4 py-3 ${theme.text} font-medium`}>
//         Domains Expiring in {days} days
//       </div>

//       {/* Card Body */}
//       <div className="bg-white px-4 py-8 text-center">
//         <span className={`text-4xl font-bold ${theme.countText}`}>{count}</span>
//         <span className="text-2xl text-gray-600 ml-2">Domains</span>
//       </div>

//       {/* Card Footer */}
//       <div
//         className={`px-4 py-3 ${theme.footerBg} ${theme.text} text-center text-sm`}
//       >
//         {/* Maybe make this a link too or just text */}
//         Widget Footer {/* Placeholder */}
//       </div>
//     </Link>
//   );
// }

// export default ExpiringDomainCard;
// src/components/ExpiringDomainCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// Props: days, count, colorTheme (object with headerBg, headerText, rowBg, rowText, border, link), linkTo
function ExpiringDomainCard({ days, count, colorTheme, linkTo }) {
  // Destructure the theme object passed from props.
  // Provide defaults inline in case colorTheme is somehow missing, although getThemeForDays should prevent this.
  const {
    headerBg = "bg-gray-100",
    headerText = "text-gray-900",
    rowBg = "bg-white", // Use white for the main body background by default
    rowText = "text-gray-700", // Use the theme's rowText for the count
    border = "border-gray-200",
    // 'link' theme property isn't directly used here as the whole card is a link,
    // but could be used for specific text inside if needed.
  } = colorTheme || {}; // Add fallback just in case

  return (
    <Link
      to={linkTo}
      // Apply the border class to the main link container
      className={`block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border ${border}`}
    >
      {/* Card Header: Use headerBg and headerText */}
      <div className={`px-4 py-3 ${headerBg} ${headerText} font-medium`}>
        Domains Expiring in {days} days
      </div>

      {/* Card Body: Use rowBg for background and rowText for the count */}
      {/* Note: Your original themes.js had rowText as gray-700 for all. You might want to make the count use headerText or a specific color if desired */}
      <div className={`px-4 py-8 text-center ${rowBg}`}>
        <span className={`text-4xl font-bold ${rowText}`}>{count}</span>
        {/* Keep secondary text less prominent */}
        <span className="text-2xl text-gray-600 ml-2">Domains</span>
      </div>

      {/* Card Footer: Use rowBg (consistent with body), headerText (often matches header), and add a top border */}
      <div
        className={`px-4 py-3 ${rowBg} ${headerText} text-center text-sm border-t ${border}`}
      >
        {/* Make footer text more descriptive/actionable */}
        View Details →
      </div>
    </Link>
  );
}

export default ExpiringDomainCard;
