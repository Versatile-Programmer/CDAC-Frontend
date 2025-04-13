// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import routing components
import { ToastContainer } from "./utils/toastUtils";
import ProtectedRoute from "./components/ProtectedRoute";
// Styles
import "./App.css"; // Your global styles if any

// --- Page Components ---
import AssignDrmPage from "./pages/AssignDrmPage";
import AddDomainPage from "./pages/AddDomainPage";
import DrmDashboardPage from "./pages/DrmDashboardPage"; // Renamed import for clarity if needed
import ExpiringDomainsPage from "./pages/ExpiringDomainPage"; // Ensure filename matches import
import HodDashboardPage from "./pages/HodDashboardPage";
import Login from "./pages/Login"; // Assuming Login is the LoginPage component
import ViewDomainsPage from "./pages/ViewDomainsPage";
import DomainDetailPage from "./pages/DomainDetailPage";

// A simple component for 404 - can be customized later
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
    <p className="text-xl text-gray-700 mb-6">Oops! Page Not Found.</p>
    <a href="/login" className="text-blue-600 hover:underline">
      Go back to Login
    </a>
  </div>
);

function App() {
  return (
    // Wrap the entire application in the Router
    <Router>
      <ToastContainer />
      {/* Routes define the possible paths and corresponding components */}
      <Routes>
        {/* --- Define Routes for Each Page --- */}

        {/* Login Page */}
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        {/* Using '/dashboard' for the DRM view as per earlier convention */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DrmDashboardPage />
            </ProtectedRoute>
          }
        />
        {/* Using '/hod-dashboard' for the HOD view as per earlier convention */}
        <Route
          path="/hod-dashboard"
          element={
            <ProtectedRoute>
              <HodDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Domain Management */}
        <Route path="/domains/add" element={<AddDomainPage />} />
        {/* Route for viewing domains expiring within X days */}
        <Route
          path="/domains/expiring/:days"
          element={<ExpiringDomainsPage />}
        />
        {/* Route for the generic "View Domains" list */}
        <Route path="/domains/view" element={<ViewDomainsPage />} />
        {/* Route for viewing the details of a specific domain */}
        <Route
          path="/domains/details/:domain_id"
          element={<DomainDetailPage />}
        />

        {/* HOD Actions */}
        <Route path="/projects/assign" element={<AssignDrmPage />} />

        {/* --- Omitted routes for pages not listed in your imports --- */}
        {/* e.g., Renew, Transfer/Delete List, Reports, Assigned Projects, Verify Requests */}

        {/* Catch-all 404 Route - Renders if no other route matches */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
