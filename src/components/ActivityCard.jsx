// src/components/ActivityCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// Props: title, IconComponent, linkTo
function ActivityCard({ title, IconComponent, linkTo }) {
  return (
    <Link
      to={linkTo}
      className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center text-gray-700 hover:text-blue-600 space-y-3"
    >
      {/* Render the passed icon component */}
      <IconComponent className="w-10 h-10 mb-2 text-gray-500" />
      <span className="text-base font-medium">{title}</span>
    </Link>
  );
}

export default ActivityCard;
