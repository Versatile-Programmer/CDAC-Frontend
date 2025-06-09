
// // src/components/ActivityCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// // Props: title, IconComponent, linkTo
// function ActivityCard({ title, IconComponent, linkTo,count,onClick }) {
//   return (
//     <Link
//       to={linkTo}
//       // Add 'group' class for group-hover effects
//       // Increase base shadow, add transition for all properties
//       // Add slight vertical lift on hover
//       className="group flex flex-col items-center justify-start p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 ease-in-out text-center"
//     >
//       {/* Icon container with background */}
//       <div className="mb-4 inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-300">
//         {/* Icon with primary color, changes slightly on group hover */}
//         <IconComponent className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
//         {/* Adjusted size (w-8 h-8) and margin-bottom (mb-4) */}
//       </div>

//       {/* Title text */}
//       <span className="text-base font-semibold text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
//         {/* Made font slightly bolder (font-semibold) */}
//         {title}
//       </span>
//     </Link>
//   );
// }

// export default ActivityCard;

// src/components/ActivityCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// Props: title, IconComponent, linkTo, count, onClick
function ActivityCard({ title, IconComponent, linkTo, count, onClick }) {
  const handleClick = (e) => {
    // If an onClick handler is provided from the parent (DashboardPage), call it.
    // This allows the parent to perform actions (like marking notifications as read)
    // before or concurrently with the navigation.
    if (onClick) {
      onClick();
    }
    // The Link component will handle the navigation to 'linkTo' automatically.
  };

  return (
    <Link
      to={linkTo}
      onClick={handleClick} // Attach the handleClick wrapper here
      // Add 'group' class for group-hover effects
      // Increase base shadow, add transition for all properties
      // Add slight vertical lift on hover
      className="relative group flex flex-col items-center justify-start p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 ease-in-out text-center"
      // Added 'relative' for positioning the count badge
    >
      {/* Count Badge - Positioned at the top-right corner */}
      {typeof count === 'number' && count > 0 && (
        <span
          className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full ring-2 ring-white"
          // Adjust 'top-2 right-2' as needed for precise positioning
        >
          {count > 9 ? '9+' : count} {/* Display 9+ if count is too large */}
        </span>
      )}

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