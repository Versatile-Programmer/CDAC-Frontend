// src/components/Footer.jsx
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-300 px-4 py-3 text-center text-xs text-gray-600">
      <div className="space-x-3 mb-2">
        {/* Replace # with actual links later if needed */}
        <a href="#" className="hover:underline">
          Help
        </a>
        <span>|</span>
        <a href="#" className="hover:underline">
          Website Policies
        </a>
        <span>|</span>
        <a href="#" className="hover:underline">
          Copyright
        </a>
        <span>|</span>
        <a href="#" className="hover:underline">
          Terms & Conditions
        </a>
        <span>|</span>
        <a href="#" className="hover:underline">
          Contact Us
        </a>
      </div>
      <p className="mb-1">
        Website owned & maintained by: Centre for Development of Advanced
        Computing (C-DAC)
      </p>
      {/* Use flexbox to position Draft-1.0 */}
      <div className="flex justify-center items-center relative">
        <span>© {currentYear} C-DAC. All rights reserved</span>
     
      </div>
    </footer>
  );
}

export default Footer;
