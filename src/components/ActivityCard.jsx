// // src/components/ActivityCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// // Props: title, IconComponent, linkTo
// function ActivityCard({ title, IconComponent, linkTo }) {
//   return (
//     <Link
//       to={linkTo}
//       className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center text-gray-700 hover:text-blue-600 space-y-3"
//     >
//       {/* Render the passed icon component */}
//       <IconComponent className="w-10 h-10 mb-2 text-gray-500" />
//       <span className="text-base font-medium">{title}</span>
//     </Link>
//   );
// }

// export default ActivityCard;

// src/components/ActivityCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// Props: title, IconComponent, linkTo
function ActivityCard({ title, IconComponent, linkTo }) {
  return (
    <Link
      to={linkTo}
      // Add 'group' class for group-hover effects
      // Increase base shadow, add transition for all properties
      // Add slight vertical lift on hover
      className="group flex flex-col items-center justify-start p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 ease-in-out text-center"
    >
      {/* Icon container with background */}
      <div className="mb-4 inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-300">
        {/* Icon with primary color, changes slightly on group hover */}
        <IconComponent className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
        {/* Adjusted size (w-8 h-8) and margin-bottom (mb-4) */}
      </div>

      {/* Title text */}
      <span className="text-base font-semibold text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
        {/* Made font slightly bolder (font-semibold) */}
        {title}
      </span>
    </Link>
  );
}

export default ActivityCard;