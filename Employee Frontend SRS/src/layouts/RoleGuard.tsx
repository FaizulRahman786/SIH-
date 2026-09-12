import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

interface RoleGuardProps {
  /** The role required to access the child routes. */
  requiredRole: UserRole;
  /**
   * Where to redirect if the user's role doesn't match.
   * Defaults to role-appropriate home.
   */
  redirectTo?: string;
}

/**
 * RoleGuard — Renders child routes only if the authenticated user has the
 * required role. Otherwise redirects.
 *
 * ⚠️  UX GUARD ONLY — Not a security boundary.
 *     Real access control is enforced by the backend API.
 *
 * Usage:
 *   <Route element={<RoleGuard requiredRole="admin" />}>
 *     <Route path="/admin" ... />
 *   </Route>
 */
export function RoleGuard({ requiredRole, redirectTo }: RoleGuardProps) {
  const { status, role } = useAuth();

  if (status === "loading") {
    return (
      <div className="min-h-full flex items-center justify-center bg-[var(--color-canvas)]">
        <div className="w-6 h-6 border-2 border-[var(--color-blue-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status !== "authenticated" || role !== requiredRole) {
    // Redirect employees away from admin, and unauthenticated users to login
    const destination =
      redirectTo ?? (status === "unauthenticated" ? "/login" : "/dashboard");
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
