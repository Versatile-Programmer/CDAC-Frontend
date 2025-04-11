// src/pages/LoginPage.jsx
import React from "react";
import AuthLayout from "../layouts/AuthLayout";


// Import icons from react-icons
// Choose an icon set (e.g., 'md' for Material Design, 'fa' for FontAwesome, 'bs' for Bootstrap)
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md"; // Example using Material Design icons

function LoginPage() {
  const handleDummySubmit = (e) => {
    e.preventDefault();
    alert("Login form submission logic will be added later!");
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center py-12">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            Sign in with your email
          </h1>

          <form onSubmit={handleDummySubmit} className="space-y-6">
            {/* Input with Email Icon */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {/* Use the imported icon component */}
                <MdOutlineMailOutline className="w-5 h-5" />
              </span>
              <input
                type="email"
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
