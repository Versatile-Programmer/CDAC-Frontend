// src/pages/LoginPage.jsx
import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUser } from "../services/authService";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState, userState, isAuthenticatedState } from "../recoil/atoms/authState";
import { notifyError, notifySuccess } from "../utils/toastUtils";

// Import icons from react-icons
// Choose an icon set (e.g., 'md' for Material Design, 'fa' for FontAwesome, 'bs' for Bootstrap)
import { MdOutlineMailOutline, MdOutlineLock,MdAutorenew } from "react-icons/md"; // Example using Material Design icons

function LoginPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [formError, setFormError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 // --- Recoil ---
 const setAuthToken = useSetRecoilState(authTokenState);
 const setUser = useSetRecoilState(userState);
 const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
 const isAuthenticated = useRecoilValue(isAuthenticatedState);

 // --- Navigation ---
 const navigate = useNavigate();
 const location = useLocation();
 const from = location.state?.from?.pathname || "/dashboard";

 // --- Effect ---
 useEffect(() => {
   if (isAuthenticated) {
     navigate(from, { replace: true });
   }
 }, [isAuthenticated, navigate, from]);

 // --- Handlers ---
 const handleInputChange = (setter) => (event) => {
   setter(event.target.value);
   if (formError) setFormError("");
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (isLoading) return;

   setFormError("");
   setIsLoading(true);

   const data = e.target;
   const details = new FormData(data);
   const email = details.get("email");
   const password = details.get("password");
   console.log("HBKJBHKJ",email, password);
   try {
     // --- Call the login service function ---
     console.log(email, password);
     const { token, user, message } = await loginUser(email, password);

     // --- Handle Success (Logic remains in component) ---
     // 1. Persist
     console.log()
     localStorage.setItem("authToken", token);
     localStorage.setItem("user", JSON.stringify(user));

     // 2. Update Recoil
     setAuthToken(token);
     setUser(user);
     setIsAuthenticated(true);  

     // 3. Notify
     notifySuccess(message || "Login successful!");

     // 4. Navigate
    if (user.role === "DRM") {
      navigate("/dashboard", { replace: true });
    } else if (user.role === "HOD") {
      navigate("/hod-dashboard", { replace: true });
    } else {
      // fallback
      navigate("/", { replace: true });
    }
   } catch (error) {
     // --- Handle Error (Error thrown from service) ---
     console.error("Login failed in component:", error);
     const errorMsg =
       error instanceof Error
         ? error.message
         : "An unknown login error occurred.";

     // Display errors
     setFormError(errorMsg);
     notifyError(errorMsg);

     // Clear auth state (remains in component for consistency)
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
if (isAuthenticated) {
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
            {/* Input with Email Icon */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {/* Use the imported icon component */}
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

            {/* Input with Lock Icon */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {/* Use the imported icon component */}
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
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
