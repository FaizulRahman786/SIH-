/**
 * SkillSaarthi AI — Centralized Authentication Context
 *
 * Provides auth state to the entire application.
 * Replaces direct authApi calls scattered across pages/layouts.
 *
 * Usage:
 *   const { user, role, status, login, verifyAdmin, logout } = useAuth();
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { authApi } from "../services/authApi";
import type {
  User,
  UserRole,
  LoginCredentials,
  LoginResponse,
  AdminVerifyRequest,
  AdminVerifyResponse,
} from "../types";

// ─── Auth state shape ──────────────────────────────────────────────────────────
export type AuthStatus =
  | "loading"           // initial check in progress
  | "unauthenticated"   // no session
  | "pending_admin"     // admin first-stage done, awaiting second-stage
  | "authenticated";    // full session established

export interface AuthState {
  user: User | null;
  role: UserRole | null;
  status: AuthStatus;
  /** True when admin first-stage succeeded and /admin-verify is next */
  requiresAdminVerification: boolean;
}

// ─── Context shape ─────────────────────────────────────────────────────────────
interface AuthContextValue extends AuthState {
  /**
   * Stage 1 login. Returns LoginResponse with role and requiresAdminVerification.
   * Caller should navigate based on the response.
   */
  login(credentials: LoginCredentials): Promise<LoginResponse>;

  /**
   * Stage 2 admin verification. Caller navigates to /admin on success.
   * DEMO: adminSecretCode is not validated in frontend — see authApi for details.
   */
  verifyAdmin(request: AdminVerifyRequest): Promise<AdminVerifyResponse>;

  /** Clears all auth state and session storage. */
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    status: "loading",
    requiresAdminVerification: false,
  });

  // On mount: restore existing session
  useEffect(() => {
    const user = authApi.getCurrentUser();
    const pendingAdmin = authApi.isPendingAdminVerification();

    if (user) {
      setState({
        user,
        role: user.role,
        status: "authenticated",
        requiresAdminVerification: false,
      });
    } else if (pendingAdmin) {
      setState({
        user: null,
        role: "admin",
        status: "pending_admin",
        requiresAdminVerification: true,
      });
    } else {
      setState({
        user: null,
        role: null,
        status: "unauthenticated",
        requiresAdminVerification: false,
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await authApi.login(credentials);

    if (response.requiresAdminVerification) {
      // First stage complete — user must pass /admin-verify before getting a session
      setState({
        user: null,
        role: "admin",
        status: "pending_admin",
        requiresAdminVerification: true,
      });
    } else {
      // Full employee session
      setState({
        user: response.user,
        role: response.role,
        status: "authenticated",
        requiresAdminVerification: false,
      });
    }

    return response;
  }, []);

  const verifyAdmin = useCallback(async (request: AdminVerifyRequest): Promise<AdminVerifyResponse> => {
    const response = await authApi.verifyAdmin(request);

    setState({
      user: response.user,
      role: response.role,
      status: "authenticated",
      requiresAdminVerification: false,
    });

    return response;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setState({
      user: null,
      role: null,
      status: "unauthenticated",
      requiresAdminVerification: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, verifyAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
