// src/components/notifications/NotificationBell.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdNotificationsNone, MdNotifications } from "react-icons/md";
import NotificationItem from "./NotificationItem"; // Import the item component
// import { notifyError, notifySuccess } from "../../services/toastService"; // Corrected import path

// --- Sample Dummy Data ---
const sampleNotifications = [
  {
    id: "n1",
    title: "Domain Action Required",
    message: 'Please verify VAPT for "example.com".',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "n2",
    title: "Renewal Reminder",
    message: 'Domain "my-site.org" expires in 28 days. Consider renewal.',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: "n3",
    message: 'Project "Omega" details updated by HOD.',
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
  {
    id: "n4",
    title: "Transfer Request",
    message: 'DRM "Jane Doe" initiated transfer for "another-domain.net".',
    timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
  },
  {
    id: "n5",
    title: "Welcome!",
    message: "Your account setup is complete.",
    timestamp: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
  },
];

// --- Dummy API Functions (Keep placeholders for future integration) ---
// const fetchUnreadCount = async () => { /* ... */ };
// const fetchUnreadNotifications = async () => { /* ... */ };
// const markNotificationAsRead = async (id) => { /* ... */ };
// const markAllNotificationsAsRead = async () => { /* ... */ };
// --- End Dummy API Functions ---

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize state directly with dummy data
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [unreadCount, setUnreadCount] = useState(sampleNotifications.length);
  const [isLoading, setIsLoading] = useState(false); // Keep for potential future use
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // --- Calculate Dropdown Position (using useCallback) ---
  const calculatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 384; // Approx width for sm:w-96 (adjust if needed)
      let leftPos = rect.right + window.scrollX - dropdownWidth;

      // Prevent going off left edge
      leftPos = Math.max(10, leftPos); // Ensure at least 10px from left edge

      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: leftPos,
      });
    }
  }, []); // Empty dependency array

  // --- Toggle Dropdown ---
  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen) {
      calculatePosition(); // Calculate position when opening
      // No API call needed here for dummy data
    }
  };

  // --- Update position on Resize/Scroll ---
  useEffect(() => {
    if (!isOpen) return;
    const handleResizeOrScroll = () => calculatePosition();
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [isOpen, calculatePosition]);

  // --- Simulate Marking Single Notification As Read ---
  const handleMarkRead = async (id) => {
    console.log("Simulating Mark as read:", id);
    // Optimistically update UI state
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => Math.max(0, prev - 1));
    notifySuccess("Notification marked as read.");
    // Placeholder: await markNotificationAsRead(id); // Call real API later
  };

  // --- Simulate Marking All As Read ---
  const handleMarkAllRead = async () => {
    if (notifications.length === 0) return;
    console.log("Simulating Mark all as read...");
    // Optimistically update UI state
    const currentCount = notifications.length;
    setNotifications([]);
    setUnreadCount(0);
    notifySuccess(`${currentCount} notification(s) marked as read.`);
    // Placeholder: await markAllNotificationsAsRead(); // Call real API later
  };

  // --- Click Outside Handler ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Bell Button with Ref */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="relative inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-expanded={isOpen}
        aria-label="Toggle Notifications"
      >
        {isOpen ? (
          <MdNotifications className="w-6 h-6" />
        ) : (
          <MdNotificationsNone className="w-6 h-6" />
        )}
        {unreadCount > 0 /* Badge */ && (
          <span className="absolute top-0 right-0 h-5 w-5 transform -translate-y-1/2 translate-x-1/2 rounded-md ring-2 ring-white bg-red-500 text-white text-xs font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel - Use position: fixed */}
      {isOpen && (
        <div
          className="fixed rounded-md shadow-lg bg-white border border-gray-200 z-[9999] flex flex-col w-80 sm:w-96" // High z-index
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          {/* Dropdown Header */}
          <div className="flex-shrink-0 flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-md">
            <h4 className="text-sm font-semibold text-gray-700">
              Notifications
            </h4>
            <button
              onClick={handleMarkAllRead}
              disabled={isLoading || notifications.length === 0}
              className="text-xs text-indigo-600 hover:underline disabled:text-gray-400 disabled:no-underline"
            >
              Mark all as read
            </button>
          </div>

          {/* Scrollable List Area */}
          <div className="overflow-y-auto max-h-80">
            {/* Removed isLoading check as we are using dummy data directly */}
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No unread notifications.
              </div>
            ) : (
              // --- Mapping the state (which holds dummy data) ---
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onMarkRead={handleMarkRead} // Pass simulation handler
                />
              ))
              // --- End of Mapping ---
            )}
          </div>

          {/* Dropdown Footer */}
          <div className="flex-shrink-0 flex justify-center items-center px-4 py-2 border-t border-gray-200 bg-gray-50 rounded-b-md">
            <button className="text-sm text-indigo-600 hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;


// Add this line to the Navbar component after Navlink and it bracket lies

//  <div className="ml-4 flex-shrink-0">
//             {" "}
//             {/* Added margin-left and prevent shrinking */}
//             <NotificationBell />
//           </div>