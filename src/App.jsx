// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom"; // Import routing components
import { notifySuccess, ToastContainer } from "./utils/toastUtils";
import ProtectedRoute from "./components/ProtectedRoute";
// Styles
import "./App.css"; // Your global styles if any

// --- Page Components ---
import AssignDrmPage from "./pages/AssignDrmPage";
import AddDomainPage from "./pages/AddDomainPage";
// Renamed import for clarity if needed
import ExpiringDomainsPage from "./pages/ExpiringDomainPage"; // Ensure filename matches import
import DrmProjectsPage from "./pages/ViewProjectsPage";
import Login from "./pages/Login"; // Assuming Login is the LoginPage component
import ViewDomainsPage from "./pages/ViewDomainsPage";
import DomainDetailPage from "./pages/DomainDetailPage";
import DashboardPage from "./pages/Dashboard";
import RenewDomainsPage from "./pages/RenewDomainsPage";
import DomainRenewalPage from "./pages/DomainRenewalPage";
import TransferDeleteDomainsPage from "./pages/ViewTransferDelete";
import ApplyTransferPage from "./pages/TransferPage";
import HodAssignedProjectsPage from "./pages/HodAssignedDomains";
import VerifyDomainRequestsPage from "./pages/GenericDomainVerificationPage";
import GenericDomainVerificationPage from "./pages/GenericDomainVerificationPage";
import GenericDomainDetailPage from "./pages/GenericDomainDetailPage";
import ViewVaptRenewalsPage from "./pages/ViewVaptRenewalsPage";
import VerifyVaptRenewalPage from "./pages/VerifyVaptRenewalPage";
import VerifyTransferPage from "./pages/VerifyTransferPage";
import DomainDetailViewPage from "./pages/DomainDetailViewPage";
import PurchaseDetailsForm from "./pages/PurchaseDetailsForm";
import { useResetRecoilState } from "recoil";
import { authTokenState, isAuthenticatedState, userState } from "./recoil/atoms/authState";



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

const LogoutPage = () => {

  const resetStateAuthToken = useResetRecoilState(authTokenState)
  const resetStateAuth = useResetRecoilState(isAuthenticatedState)
  const resetUserState = useResetRecoilState(userState)
  const navigate = useNavigate()




  localStorage.clear()

  resetStateAuth()
  resetStateAuthToken()
  resetUserState()
  
  notifySuccess('Successfully logged out')
  setTimeout(() => {
    navigate('/login')
    
  }, 1000);
}

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
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Domain Management */}
        <Route path="/domains/add" element={
          <ProtectedRoute>
            <AddDomainPage />
          </ProtectedRoute>
        } />
        {/* Route for viewing domains expiring within X days */}
        <Route
          path="/domains/expiring/:days"
          element={
            <ProtectedRoute>
              <ExpiringDomainsPage />
            </ProtectedRoute>
          }
        />
        {/* Route for the generic "View Domains" list */}
        <Route path="/domains/view" element={
          <ProtectedRoute>
            <ViewDomainsPage />
          </ProtectedRoute>
        } />
        {/* Route for viewing the details of a specific domain */}
        <Route
          path="/domains/details/:domainId"
          element={
            <ProtectedRoute>
              <DomainDetailViewPage />
            </ProtectedRoute>
          }
        />
        <Route path="/domains/transfer-delete"
          element={
            <ProtectedRoute>
              <TransferDeleteDomainsPage />
            </ProtectedRoute>

          } />

        <Route path="/domains/transfer/:domainId"
          element={
            <ProtectedRoute>
              <ApplyTransferPage />
            </ProtectedRoute>

          } />


        <Route path="/list/projects" element={
          <ProtectedRoute>
            <DrmProjectsPage />
          </ProtectedRoute>

        } />
        <Route path="/domains/renew" element={
          <ProtectedRoute>
            <RenewDomainsPage />
          </ProtectedRoute>

        } />
        <Route path="/domains/renew/:dmId" element={
          <ProtectedRoute>
            <DomainRenewalPage />
          </ProtectedRoute>

        } />

        {/* ARM Actions */}

        <Route path="/domains/arm/verify-requests" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/ARM/domain-verify-requests'}
              verifyPathPrefix={'/detailed-domain/arm'} title="ARM-Domain Request Consent"
              useFor={"domain"} />
          </ProtectedRoute>

        } />

        <Route path="/detailed-domain/arm/:domainId" element={
          <ProtectedRoute>
            <GenericDomainDetailPage verifier={"arm"} />
          </ProtectedRoute>

        } />

        <Route path="/domains/arm/verify-renewal" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/domain-renewal/view/ARM'}
              verifyPathPrefix={'/detailed-domain/arm'}
              title="ARM-Domain Renewal Verification"
              useFor={"domain"} />
          </ProtectedRoute>
        } />

        {/* ARM END */}

        {/* HOD Actions */}

        <Route path="/projects/assign" element={
          <ProtectedRoute>
            <AssignDrmPage />
          </ProtectedRoute>

        } />
        <Route path="/projects/assigned" element={
          <ProtectedRoute>
            <HodAssignedProjectsPage />
          </ProtectedRoute>

        } />

        <Route path="/domains/hod/verify-requests" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/HOD/domain-verify-requests'}
              verifyPathPrefix={'/detailed-domain/hod'} title="HOD-Domain Verification"
              useFor={"domain"} />
          </ProtectedRoute>

        } />

        <Route path="/detailed-domain/hod/:domainId" element={
          <ProtectedRoute>
            <GenericDomainDetailPage verifier={"hod"} />
          </ProtectedRoute>

        } />

        <Route path="/domains/hod/verify-renewal" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/domain-renewal/view/HOD'}
              verifyPathPrefix={'/detailed-domain/hod'}
              title="HOD-Domain Renewal Verification"
              useFor={"domain"} />
          </ProtectedRoute>

        } />


        <Route path="/view/vapt-renewals" element={
          <ProtectedRoute>
            <ViewVaptRenewalsPage />
          </ProtectedRoute>

        } />

        <Route path="/view/detail/vapt-renewal/:vaptRenewalId" element={
          <ProtectedRoute>
            <VerifyVaptRenewalPage />
          </ProtectedRoute>

        } />

        <Route path="/domains/view/verify-transfer-requests" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/view/transfer/hod'}
              verifyPathPrefix={'/detailed-transfer-request'}
              title="Verify Transfer Requests"
              useFor={"transfer"} />
          </ProtectedRoute>
        } />

        <Route path="/detailed-transfer-request/:transferId" element={
          <ProtectedRoute>
            <VerifyTransferPage />
          </ProtectedRoute>
        } />
        {/* HOD END */}



        {/* ED START */}
        <Route path="/domains/ed/verify-requests" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/ED/domain-verify-requests'}
              verifyPathPrefix={'/detailed-domain/ed'} title="ED-Domain Verification"
              useFor={"domain"} />
          </ProtectedRoute>

        } />

        <Route path="/detailed-domain/ed/:domainId" element={
          <ProtectedRoute>
            <GenericDomainDetailPage verifier={"ed"} />
          </ProtectedRoute>
        } />

        <Route path="/domains/ed/verify-renewal" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/domain-renewal/view/ED'}
              verifyPathPrefix={'/detailed-domain/ed'}
              title="ED-Domain Renewal Verification"
              useFor={"domain"} />
          </ProtectedRoute>
        } />

        {/* ED END */}

        {/* NETOPS START */}


        <Route path="/domains/netops/verify-requests" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/NETOPS/domain-verify-requests'}
              verifyPathPrefix={'/detailed-domain/netops'} title="NETOPS-Domain Verification"
              useFor={"domain"} />
          </ProtectedRoute>

        } />

        <Route path="/detailed-domain/netops/:domainId" element={
          <ProtectedRoute>
            <GenericDomainDetailPage verifier={"netops"} />
          </ProtectedRoute>
        } />

        <Route path="/domains/netops/verify-renewal" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/domain-renewal/view/NETOPS'}
              verifyPathPrefix={'/detailed-domain/netops'}
              title="NETOPS-Domain Renewal Verification"
              useFor={"domain"} />
          </ProtectedRoute>
        } />

        {/* NETOPS END */}

        {/* WEBMASTER START */}

        <Route path="/domains/webmaster/verify-requests" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/WEBMASTER/domain-verify-requests'}
              verifyPathPrefix={'/detailed-domain/webmaster'} title="WEBMASTER-Domain Verification"
              useFor={"domain"} />
          </ProtectedRoute>

        } />

        <Route path="/detailed-domain/webmaster/:domainId" element={
          <ProtectedRoute>
            <GenericDomainDetailPage verifier={"webmaster"} />
          </ProtectedRoute>
        } />

        <Route path="/domains/webmaster/verify-renewal" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/domain-renewal/view/WEBMASTER'}
              verifyPathPrefix={'/detailed-domain/webmaster'}
              title="WEBMASTER-Domain Renewal Verification"
              useFor={"domain"} />
          </ProtectedRoute>
        } />

        {/* NEED TO CREATE A API FOR DOMAIN PURCHASE DETAILS AND DOMAIN PURCHASE VIEW DETAILS IN BACKEND */}

        <Route path="/domains/webmaster/purchase-details" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/domain-purchase-view/WEBMASTER'}
              verifyPathPrefix={'/detailed-domain/purchase/webmaster'}
              title="WEBMASTER-Domain Purchase Details"
              useFor={"domain"} />
          </ProtectedRoute>
        } />

        <Route path="detailed-domain/purchase/webmaster/:domainId" element={
          <ProtectedRoute>
            <PurchaseDetailsForm />
          </ProtectedRoute>
        } />




        {/* WEBMASTER END */}

        {/* HODHPC START */}


        <Route path="/domains/hodhpc/verify-requests" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/HODHPC/domain-verify-requests'}
              verifyPathPrefix={'/detailed-domain/hodhpc'} title="HODHPC-Domain Verification"
              useFor={"domain"} />
          </ProtectedRoute>

        } />

        <Route path="/detailed-domain/hodhpc/:domainId" element={
          <ProtectedRoute>
            <GenericDomainDetailPage verifier={"hodhpc"} />
          </ProtectedRoute>
        } />

        <Route path="/domains/hodhpc/verify-renewal" element={
          <ProtectedRoute>
            <GenericDomainVerificationPage apiPath={'/domain/domain-renewal/view/HODHPC'}
              verifyPathPrefix={'/detailed-domain/hodhpc'}
              title="HODHPC-Domain Renewal Verification"
              useFor={"domain"} />
          </ProtectedRoute>
        } />



        {/* HODHPC END */}









        {/* --- Omitted routes for pages not listed in your imports --- */}
        {/* e.g., Renew, Transfer/Delete List, Reports, Assigned Projects, Verify Requests */}

        {/* Catch-all 404 Route - Renders if no other route matches */}

        <Route path="/logout" element={<LogoutPage/>} />

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
