
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Navbar from '../components/Navbar'; // We'll add this later

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {" "}
      {/* Changed bg slightly */}
      <Header />
      {/* <Navbar /> */}{" "}
      {/* Placeholder: Navbar will go here for internal pages */}
      {/* Use id for skip link target */}
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
        {/* The children prop renders the actual page content */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
