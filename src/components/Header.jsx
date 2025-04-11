// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom"; // Keep Link for potential navigation later

// Import your logos - adjust paths as necessary
import AppLogo from "../assets/cdac-logo.svg"; // Example logo
import CDACLogo from "../assets/cdac-text-logo.svg";

function Header() {
  return (
    <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
      {/* Left Side: App Logo and Title */}
      <div className="flex items-center space-x-3">
        <img src={AppLogo} alt="App Logo" className="h-10" />
        <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">
          Domain Name Management System
        </h1>
      </div>

      {/* Right Side: Controls and CDAC Logo */}
      <div className="flex items-center space-x-4">
        {/* Static Placeholder for Language/Font Size Controls */}
        {/* <div className="text-sm text-gray-600 space-x-2 hidden md:block">
          <span>English</span>
          <span className="text-gray-400">|</span>
          <button className="hover:text-blue-600">A+</button>
          <button className="hover:text-blue-600">A</button>
          <button className="hover:text-blue-600">A-</button>
        </div> */}
        <img src={CDACLogo} alt="C-DAC Logo" className="h-10" />
      </div>
    </header>
  );
}

export default Header;
