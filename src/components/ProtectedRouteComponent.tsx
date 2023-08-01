import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutAction } from "../actions/LogoutAction";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({
  isLoggedIn,
  children,
}) => {
  const dispatch = useDispatch();
  function logoutFromFirebase() {
    dispatch(logoutAction());
  }

  useEffect(() => {
    if (!isLoggedIn) {
      logoutFromFirebase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isLoggedIn) {
    localStorage.setItem("redirectPath", window.location.pathname);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
