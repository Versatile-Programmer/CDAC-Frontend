// src/components/ExpiringDomainCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// Props: days, count (placeholder), colorTheme (object), linkTo
function ExpiringDomainCard({ days, count, colorTheme, linkTo }) {
  // Define default theme structure in case props are missing
  const theme = colorTheme || {
    bg: "bg-gray-200",
    text: "text-gray-800",
    footerBg: "bg-gray-300",
    countText: "text-gray-700",
  };

  return (
    <Link
      to={linkTo}
      className={`block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${theme.bg}`}
    >
      {/* Card Header */}
      <div className={`px-4 py-3 ${theme.text} font-medium`}>
        Domains Expiring in {days} days
      </div>

      {/* Card Body */}
      <div className="bg-white px-4 py-8 text-center">
        <span className={`text-4xl font-bold ${theme.countText}`}>{count}</span>
        <span className="text-2xl text-gray-600 ml-2">Domains</span>
      </div>

      {/* Card Footer */}
      <div
        className={`px-4 py-3 ${theme.footerBg} ${theme.text} text-center text-sm`}
      >
        {/* Maybe make this a link too or just text */}
        Widget Footer {/* Placeholder */}
      </div>
    </Link>
  );
}

export default ExpiringDomainCard;
