import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — Redirects unauthenticated users to /login.
 *
 * Also intercepts the "pending_admin" state:
 * if admin completed stage 1 but not stage 2, redirect to /admin-verify.
 *
 * Note: This is a UX guard, not a security barrier.
 * Real authorization must be enforced by the backend.
 */
export function ProtectedRoute() {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <div className="min-h-full flex items-center justify-center bg-[var(--color-canvas)]">
        <div className="w-6 h-6 border-2 border-[var(--color-blue-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "pending_admin") {
    return <Navigate to="/admin-verify" replace />;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
