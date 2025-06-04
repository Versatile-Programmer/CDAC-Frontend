// src/components/notifications/NotificationBell.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdNotificationsNone, MdNotifications } from "react-icons/md";
import NotificationItem from "./NotificationItem"; // Import the item component
import { authTokenState, userState } from "../../recoil/atoms/authState";
import { notifyError, notifySuccess } from "../../utils/toastUtils"; // Corrected import path
import { useRecoilValue } from "recoil";
import {API_BASE_URL} from "../../config/env.config"
import axios from "axios";
import { WebhookEventType } from "../../types/eventEnum";
function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  // Initialize state directly with dummy data
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Keep for potential future use
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const loggedInUser = useRecoilValue(userState);
  const authToken = useRecoilValue(authTokenState);
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

  const transformBackendMessageArray = (msgArray) => {
    // msgArray structure: [id, rawFullMessage, eventKey, timestamp]
    if (!Array.isArray(msgArray) || msgArray.length < 4) {
      console.warn(
        "NotificationBell: Invalid message array format from backend:",
        msgArray
      );
      const generatedId = `invalid-format-${Date.now()}-${Math.random()}`;
      return {
        id: generatedId,
        title: "Error",
        message: "Received malformed notification.",
        timestamp: new Date().toISOString(),
        is_read: false,
      };
    }

    const notificationId = msgArray[0]; // e.g., 2 (the actual ID)
    const rawFullMessage = msgArray[1]; // "Event: UNKNOWN_EVENT. Approved by HoD..."
    const eventKey = msgArray[2]; // "UNKNOWN_EVENT"
    const timestamp = msgArray[3]; // "2025-05-10T10:53:36.518Z"

    let title = "Notification"; // Default title
    let messageBody = rawFullMessage; // Default body

    // Try to parse the message body from the rawFullMessage
    const bodyMatch = rawFullMessage.match(/^Event: [A-Z_]+\.\s*(.*)$/);
    if (bodyMatch && bodyMatch[1]) {
      messageBody = bodyMatch[1].trim();
    } else {
      console.warn(
        `NotificationBell: Could not parse body from raw message: "${rawFullMessage}" for ID ${notificationId}`
      );
    }

    if (eventKey && WebhookEventType.hasOwnProperty(eventKey)) {
      title = WebhookEventType[eventKey];
    } else if (eventKey) {
      console.warn(
        `NotificationBell: Unknown event_key "${eventKey}" for ID ${notificationId}.`
      );
      title = eventKey
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()); // Fallback
    } else {
      console.warn(
        `NotificationBell: Missing eventKey in message array for ID ${notificationId}:`,
        msgArray
      );
    }

    return {
      id: notificationId, // Use the ID from the backend! 
      title: title,
      message: messageBody,
      timestamp: timestamp,
      is_read: false, // Assuming all fetched notifications are initially unread
    };
  };


  // --- API Call: Fetch Unread Notifications ---
  // const loadNotifications = useCallback(async () => {
  //   if (!loggedInUser?.id) {
  //     console.warn(
  //       "NotificationBell: No logged-in user emp_no found. Cannot fetch notifications."
  //     );
  //     setError(null);
  //     setNotifications([]); // Clear notifications if no user
  //     setUnreadCount(0);
  //     return;
  //   }
  //   if (isLoading) return;

  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     // GET /api/v1/notifications (backend authMiddleware gets empNo from token)
  //     // The backend will use the authenticated user's emp_no
  //     const response = await axios.get(
  //       `${API_BASE_URL}/api/v1/notifications/unread`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`, // Use the token from Recoil
  //         },
  //       }
  //     );
  //     console.log("The Notifications are :",response.data);
  //     setNotifications(response.data || []);
  //     setUnreadCount(response.data?.filter((n) => !n.is_read).length || 0); // Calculate unread from fetched if backend doesn't provide count separately
  //     console.log("Fetched notifications:", response.data);
  //   } catch (err) {
  //     console.error("Failed to fetch notifications:", err);
  //     const msg =
  //       axios.isAxiosError(err) && err.response?.data?.message
  //         ? err.response.data.message
  //         : err.message || "Could not load notifications.";
  //     setError(msg);
  //     notifyError(msg);
  //     setNotifications([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [loggedInUser, authToken]);

  const loadNotifications = useCallback(async () => {
    if (!loggedInUser?.id) {
      console.warn(
        "NotificationBell: No logged-in user. Cannot fetch notifications."
      );
      setNotifications([]);
      setUnreadCount(0);
      setError(null);
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/notifications/unread`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      console.log("Raw backend response:", response.data);
      const backendData = response.data; // Expected: { messages: [ [id, msg, key, ts] ], unreadCount: X }

      if (backendData && Array.isArray(backendData.messages)) {
        const transformedNotifications = backendData.messages
          .map(transformBackendMessageArray)
          .filter(Boolean); // Filter out any nulls if transformBackendMessageArray returns null for invalid data
        setNotifications(transformedNotifications);
        setUnreadCount(
          backendData.unreadCount !== undefined
            ? backendData.unreadCount
            : transformedNotifications.filter((n) => !n.is_read).length
        );
        console.log("Transformed notifications:", transformedNotifications);
      } else {
        console.warn(
          "NotificationBell: Malformed notification data from backend.",
          backendData
        );
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err.message || "Could not load notifications.";
      setError(msg);
      notifyError(`Fetch error: ${msg}`);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [loggedInUser, authToken]);


  // --- Toggle Dropdown ---
  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen) {
      calculatePosition(); // Calculate position when opening
    }
    if (!willOpen) {
      setError(null); // Clear error message when closing - THIS IS CORRECT
    }
  };
  // useEffect(() => {
  //   if (!isOpen) return;
  //   const interval = setInterval(loadNotifications, 30000); // 30s
  //   return () => clearInterval(interval);
  // }, [isOpen, loadNotifications]);
  useEffect(() => {
    let isMounted = true;
    if (loggedInUser?.id && authToken) {
      loadNotifications().then(() => {
        if (!isMounted) return;
      });
    }
    return () => {
      isMounted = false;
    };
  }, [loggedInUser, authToken, loadNotifications]);
  useEffect(() => {
    let isMounted = true;
    if (isOpen && loggedInUser?.id && authToken) {
      // Only load if opened, user and token exist
      loadNotifications(false).then(() => {
        // Pass false for non-initial load
        if (!isMounted) return;
        // Potentially do something after load on open
      });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen, loggedInUser, authToken, loadNotifications]);
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


  const handleMarkRead = async (notificationId) => {
    if (!loggedInUser?.id || !authToken) return; // Check token
    console.log("Marking as read:", notificationId);
    const originalNotifications = [...notifications];
    try {
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notificationId ? { ...n, is_read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      await axios.patch(
        `${API_BASE_URL}/api/v1/notifications/${notificationId}/read`,
        {}, // Empty body for PATCH if no data needed, or send { empNo: loggedInUser.id } if backend requires it
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // *** ADDED TOKEN HERE ***
          },
        }
      );
      loadNotifications();
     console.log("Notification marked as read.");
    } catch (err) {
      console.error(
        `Failed to mark notification ${notificationId} as read:`,
        err
      );
      setNotifications(originalNotifications); // Revert
      setUnreadCount(originalNotifications.filter((n) => !n.is_read).length);
      notifyError(
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to update notification status."
      );
    }
  };

  // --- Simulate Marking All As Read ---
  // const handleMarkAllRead = async () => {
  //   if (notifications.length === 0) return;
  //   console.log("Simulating Mark all as read...");
  //   // Optimistically update UI state
  //   const currentCount = notifications.length;
  //   setNotifications([]);
  //   setUnreadCount(0);
  //   notifySuccess(`${currentCount} notification(s) marked as read.`);
  //   // Placeholder: await markAllNotificationsAsRead(); // Call real API later
  // };

  // --- API Call: Mark All As Read ---
  const handleMarkAllRead = async () => {
    if (
      !loggedInUser?.id ||
      !authToken ||
      notifications.filter((n) => !n.is_read).length === 0
    )
      return; // Check token
    console.log("Marking all as read...");
    const originalNotifications = [...notifications];
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);

      await axios.post(
        `${API_BASE_URL}/api/v1/notifications/mark-all-read`,
        {}, // Empty body for POST if no data needed, or send { empNo: loggedInUser.id }
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // *** ADDED TOKEN HERE ***
          },
        }
      );
      // The backend response might have a message
      // notifySuccess(response.data?.message || "All notifications marked as read.");
      // notifySuccess("All notifications marked as read.");
      loadNotifications(); // Re-fetch to confirm from server (optional)
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setNotifications(originalNotifications); // Revert
      setUnreadCount(originalNotifications.filter((n) => !n.is_read).length);
      notifyError(
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to update notification statuses."
      );
    }
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




