// src/components/notifications/NotificationItem.jsx
import React from "react";
import { MdOutlineCheckCircle } from "react-icons/md"; // Check icon for mark as read

// Props: notification (object), onMarkRead (function)
function NotificationItem({ notification, onMarkRead }) {
  // Basic structure - customize based on your notification data format
  const {
    id,
    title = "Notification",
    message = "No details.",
    timestamp = "",
  } = notification;

  const handleMarkReadClick = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing if button is inside
    onMarkRead(id);
  };

  return (
    <div className="p-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0 flex justify-between items-start space-x-2">
      {/* Notification Content */}
      <div className="flex-grow">
        {title && (
          <p className="text-sm font-medium text-gray-800 mb-0.5">{title}</p>
        )}
        <p className="text-sm text-gray-600">{message}</p>
        {timestamp && (
          <p className="text-xs text-gray-400 mt-1">
            {new Date(timestamp).toLocaleString()}
          </p>
        )}
      </div>
      {/* Mark as Read Button */}
      <button
        onClick={handleMarkReadClick}
        title="Mark as Read"
        className="text-green-500 hover:text-green-700 p-1 rounded-full hover:bg-green-100 flex-shrink-0"
      >
        <MdOutlineCheckCircle className="w-5 h-5" />
      </button>
    </div>
  );
}

export default NotificationItem;
