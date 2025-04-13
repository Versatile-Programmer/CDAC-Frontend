// src/services/authService.js
import axios from 'axios'; // Use global axios as requested
import {API_BASE_URL} from '../config/env.config.js';
import { data } from 'react-router-dom';
// Get API Base URL from environment variable


/**
 * Attempts to log in a user via the backend API.
 * Handles the API call and initial response validation.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{token: string, user: object, message: string}>} - Resolves with token, user object, and message on success.
 * @throws {Error} - Throws an error with a descriptive message on failure (API error, network error, or invalid response).
 */
export const loginUser = async (email, password) => {
    // Create FormData

    // Construct the full URL
    // const loginUrl = `${API_BASE_URL}/api/auth/login`; 
    // http://100.88.57.62:5000
    const loginUrl = `${API_BASE_URL}/api/auth/login`;

    try {
        console.log(`Attempting login to: ${loginUrl} with email: ${email}`); // Debug log

        // Make the API call
        const response = await axios.post(loginUrl,{
           email,password
        });

        console.log("Login API Response Data:", response.data); // Debug log

        // Process Response (based on your backend structure)
        const { success, token, user, message } = response.data;

        // --- Validate Backend Response ---
        // Check for success flag and essential data
        if (!success || !token || !user || !user.id || !user.role) {
            console.error("Login failed or invalid response structure:", response.data);
            // Throw an error using the backend's message if available, otherwise a generic one
            throw new Error(message || "Login failed: Invalid response from server.");
        }

        // --- Return success data ---
        // The component calling this function will handle storing the token/user
        // and updating Recoil state.
        return { token, user, message };

    } catch (error) {
        console.error("Error during login API call:", error);

        // --- Handle different error types ---
        let errorMsg = "Login failed. An unexpected error occurred."; // Default

        if (axios.isAxiosError(error)) {
            // Error from Axios (network issue or API error response)
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // Use backend message if available (even if status was 200 but success=false)
                errorMsg = error.response.data?.message || `Server responded with status: ${error.response.status}`;
            } else if (error.request) {
                // The request was made but no response was received
                errorMsg = "Login failed: No response received from server. Check network connection.";
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMsg = `Login failed: Error setting up request: ${error.message}`;
            }
        } else if (error instanceof Error) {
            // Error explicitly thrown from the try block (e.g., invalid response structure)
            errorMsg = error.message;
        }

        // Throw a new error with the processed message.
        // The component's catch block will handle this.
        throw new Error(errorMsg);
    }
};

// You could add other auth-related functions here later (e.g., logout, register, refreshToken)