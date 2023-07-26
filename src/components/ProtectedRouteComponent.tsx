import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({
  isLoggedIn,
  children,
}) => {
  if (!isLoggedIn) {
    return <Navigate to="/error" replace />;
  }

  return <>{children}</>;
};
