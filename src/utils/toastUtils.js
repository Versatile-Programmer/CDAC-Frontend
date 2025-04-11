// src/services/toastService.js
import { toast, Slide } from 'react-toastify'; // Import necessary functions/components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS here too, for encapsulation

// --- Default Configuration Options ---
// You can customize these defaults
const defaultOptions = {
    position: "top-right",
    autoClose: 4000, // 4 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined, // Let react-toastify handle default progress bar
    theme: "light", // Default theme ('light', 'dark', 'colored')
    transition: Slide, // Default transition animation
    // You can add more default options here
};

// --- Wrapper Functions ---
// These functions provide a cleaner interface and apply default options

/**
 * Displays a success toast notification.
 * @param {string} message - The message to display.
 * @param {object} options - Optional react-toastify options to override defaults.
 */
export const notifySuccess = (message, options = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
};

/**
 * Displays an error toast notification.
 * @param {string} message - The message to display.
 * @param {object} options - Optional react-toastify options to override defaults.
 */
export const notifyError = (message, options = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
};

/**
 * Displays an info toast notification.
 * @param {string} message - The message to display.
 * @param {object} options - Optional react-toastify options to override defaults.
 */
export const notifyInfo = (message, options = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
};

/**
 * Displays a warning toast notification.
 * @param {string} message - The message to display.
 * @param {object} options - Optional react-toastify options to override defaults.
 */
export const notifyWarning = (message, options = {}) => {
    toast.warn(message, { ...defaultOptions, ...options });
};

/**
 * Displays a default toast notification.
 * @param {string} message - The message to display.
 * @param {object} options - Optional react-toastify options to override defaults.
 */
export const notify = (message, options = {}) => {
    // Using the base toast function, applying defaults
    toast(message, { ...defaultOptions, ...options });
};

// You could add other helpers here, e.g., a function to dismiss toasts programmatically
// export const dismissToast = (toastId) => toast.dismiss(toastId);
// export const dismissAllToasts = () => toast.dismiss();

// --- Re-export the Container ---
// Re-exporting ToastContainer allows App.jsx to import it from this central service file
export { ToastContainer } from 'react-toastify';

