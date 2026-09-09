import { Navigate, Outlet } from "react-router";
import { authApi } from "../services/authApi";

export function ProtectedRoute() {
  if (!authApi.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
