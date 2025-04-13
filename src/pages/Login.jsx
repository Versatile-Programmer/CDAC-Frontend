// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState, userState, isAuthenticatedState } from "../recoil/atoms/authState";
import { notifyError, notifySuccess } from "../utils/toastUtils";

// Import icons
import { MdOutlineMailOutline, MdOutlineLock, MdAutorenew } from "react-icons/md";

function LoginPage() {
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // --- Recoil ---
  const setAuthToken = useSetRecoilState(authTokenState);
  const setUser = useSetRecoilState(userState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  // --- Navigation ---
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  // --- When login is successful, trigger spinner and delay navigation ---
  useEffect(() => {
    if (isAuthenticated) {
      // Show spinner if user is authenticated (coming from a fresh login or persisted auth)
      setShowSpinner(true);
      const timeout = setTimeout(() => {
        // After delay, navigate to dashboard
        navigate('/dashboard', { replace: true });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, navigate]);

  // --- Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setFormError("");
    setIsLoading(true);

    const data = e.target;
    const details = new FormData(data);
    const email = details.get("email");
    const password = details.get("password");
    console.log("Email and Password: ", email, password);

    try {
      // Call login service
      const { token, user, message } = await loginUser(email, password);

      // 1. Persist data
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 2. Update Recoil state
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);

      // 3. Notify success
      notifySuccess(message || "Login successful!");

      // Start showing spinner (navigation will be handled by useEffect)
      setShowSpinner(true);
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unknown login error occurred.";

      setFormError(errorMsg);
      notifyError(errorMsg);

      // Clear auth state on error
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuthToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render ---
  if (isAuthenticated && showSpinner) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <MdAutorenew className="animate-spin text-4xl text-blue-600 mr-2" />
          <span className="text-lg text-gray-700">
            Redirecting to your dashboard...
          </span>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex items-center justify-center py-12">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            Sign in with your email
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MdOutlineMailOutline className="w-5 h-5" />
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MdOutlineLock className="w-5 h-5" />
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Sign In
            </button>
          </form>
          {formError && (
            <p className="mt-4 text-red-500 text-sm">{formError}</p>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
