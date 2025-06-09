// src/hooks/useUnreadNotifications.js
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { API_BASE_URL } from '../config/env.config';
import { authTokenState, userState } from '../recoil/atoms/authState';
import {
    unreadNotificationsState,
    unreadNotificationsLoadingState,
    unreadNotificationsErrorState,
} from '../recoil/atoms/notificationState';
import { WebhookEventType } from '../types/eventEnum'; // Ensure path is correct
import { notifyError } from '../utils/toastUtils'; // For error notifications

// Helper to transform backend message array (similar to NotificationBell's)
const transformBackendMessage = (msgArray) => {
    if (!Array.isArray(msgArray) || msgArray.length < 4) {
        console.warn("useUnreadNotifications: Invalid message array format:", msgArray);
        return null; // Or a default error notification object
    }
    const [id, rawFullMessage, eventKey, timestamp] = msgArray;

    let title = "Notification";
    let messageBody = rawFullMessage;
    const bodyMatch = rawFullMessage.match(/^Event: [A-Z_]+\.\s*(.*)$/);
    if (bodyMatch && bodyMatch[1]) {
        messageBody = bodyMatch[1].trim();
    }

    if (typeof WebhookEventType !== 'undefined' && eventKey && WebhookEventType.hasOwnProperty(eventKey)) {
        title = WebhookEventType[eventKey];
    } else if (eventKey) {
        title = eventKey.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
    console.log("The event key in the transformBackendMessage function:", eventKey);

    return {
        id: String(id),
        rawMessage: rawFullMessage, // Keep raw message if needed
        title, // This is derived for the bell, dashboard might use event_type directly
        message: messageBody,
        event_type: eventKey, // Crucial for dashboard filtering
        timestamp,
        is_read: false, // All fetched from /unread are initially unread
    };
};


export const useUnreadNotifications = (autoFetch = true) => {
    const currentUser = useRecoilValue(userState);
    const authToken = useRecoilValue(authTokenState);
    const [notifications, setNotifications] = useRecoilState(unreadNotificationsState);
    const setIsLoading = useSetRecoilState(unreadNotificationsLoadingState);
    const setError = useSetRecoilState(unreadNotificationsErrorState);

    const fetchNotifications = async (showErrorToast = true) => {
        if (!currentUser || !authToken) {
            setNotifications([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/notifications/unread`,
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            // Expected: { messages: [ [id, msg, key, ts] ], unreadCount: X }
            const backendData = response.data;

            console.log("The backend data through useUnreadNotifications: ", JSON.stringify(backendData, null, 2));
            if (backendData && Array.isArray(backendData.messages)) {
                const transformed = backendData.messages
                    .map(transformBackendMessage)
                    .filter(Boolean); // Filter out nulls from bad transformations
                setNotifications(transformed);
                console.log("TRANSFORMED NOTIFICATIONS in hook:", JSON.stringify(transformed, null, 2))
            } else {
                console.warn("useUnreadNotifications: Malformed notification data from backend.", backendData);
                setNotifications([]);
                if (showErrorToast) notifyError("Received malformed notification data.");
                setError("Malformed data");
            }
        } catch (err) {
            console.error("useUnreadNotifications: Failed to fetch notifications:", err);
            // Don't clear existing notifications on a failed refresh, unless it's the very first fetch
            if (notifications.length === 0 && showErrorToast) {
                notifyError(axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : "Could not load notifications.");
            }
            setError(axios.isAxiosError(err) && err.response?.data?.message
                ? err.response.data.message
                : "Fetch error");
            if (notifications.length === 0) setNotifications([]); // Clear only if no data was ever loaded
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchNotifications(notifications.length === 0); // Only show toast on initial load error
        }
    }, [currentUser, authToken, autoFetch]); // Re-fetch if user or token changes

    // Return the state and the fetch function so components can trigger re-fetch
    return {
        notifications, // The actual array of unread notifications
        isLoading: useRecoilValue(unreadNotificationsLoadingState),
        error: useRecoilValue(unreadNotificationsErrorState),
        fetchNotifications, // Function to manually trigger a refresh
        setNotifications, // Allow components to directly modify (e.g., optimistic updates)
    };
};