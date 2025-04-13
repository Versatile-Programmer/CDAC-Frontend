// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../recoil/atoms/authState";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
