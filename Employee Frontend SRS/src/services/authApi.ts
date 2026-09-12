/**
 * SkillSaarthi AI — Authentication API Service
 *
 * DEVELOPMENT MOCK — All responses are simulated locally.
 *
 * When backend is ready, replace each method with the corresponding
 * real HTTP call. The method signatures and return shapes are designed
 * to match the future API contract exactly.
 *
 * API Contract:
 *   POST /auth/login          → LoginResponse
 *   POST /auth/admin/verify   → AdminVerifyResponse
 *   POST /auth/logout         → void
 */

import { DEMO_USER } from "../data/mockData";
import type {
  User,
  LoginCredentials,
  LoginResponse,
  AdminVerifyRequest,
  AdminVerifyResponse,
} from "../types";

// ─── Storage keys ──────────────────────────────────────────────────────────────
const AUTH_KEY = "skillsaarthi_auth";
const AUTH_STAGE_KEY = "skillsaarthi_auth_stage";

// ─── Demo employee credentials ─────────────────────────────────────────────────
// DEMO ONLY — remove when real backend is integrated
const DEMO_EMPLOYEE_USER: User = { ...DEMO_USER, role: "employee" };

// ─── Demo admin credentials ────────────────────────────────────────────────────
// DEMO ONLY — real admin verification is backend-controlled
// These are development credentials visible only in this mock service
const DEMO_ADMIN_USER: User = {
  id: "adm-001",
  name: "Admin User",
  email: "admin@mospi.gov.in",
  role: "admin",
};

const MOCK_ADMIN_CREDENTIALS = {
  email: "admin@mospi.gov.in",
  password: "admin2024",
};

// ─── Auth stages ────────────────────────────────────────────────────────────────
// Tracks whether first-stage (email+password) is complete but
// second-stage (admin code) is still pending
export type AuthStage = "none" | "first_stage_complete";

// ─── Auth API ──────────────────────────────────────────────────────────────────
export const authApi = {
  /**
   * STAGE 1 — Common login (email + password)
   *
   * DEMO: accepts any non-empty credentials for employees,
   * and the MOCK_ADMIN_CREDENTIALS for admins.
   *
   * Real API: POST /auth/login
   * Returns: { user, role, requiresAdminVerification }
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    await new Promise((r) => setTimeout(r, 800)); // simulate network

    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error("Please enter your email and password.");
    }

    // DEMO: Check if these are admin credentials
    if (
      email.toLowerCase().trim() === MOCK_ADMIN_CREDENTIALS.email &&
      password === MOCK_ADMIN_CREDENTIALS.password
    ) {
      // Admin first-stage accepted — store pending state, NOT a full session
      sessionStorage.setItem(AUTH_STAGE_KEY, "first_stage_complete");
      sessionStorage.setItem("skillsaarthi_pending_email", email);

      return {
        user: DEMO_ADMIN_USER,
        role: "admin",
        requiresAdminVerification: true,
      };
    }

    // DEMO: Any other non-empty credentials → employee login
    const user = { ...DEMO_EMPLOYEE_USER };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));

    return {
      user,
      role: "employee",
      requiresAdminVerification: false,
    };
  },

  /**
   * STAGE 2 — Admin verification (email + password + secret code)
   *
   * ⚠️  CRITICAL SECURITY NOTE ⚠️
   * The adminSecretCode is NOT validated in this frontend mock.
   * In production, the entire AdminVerifyRequest must be sent to
   * the backend: POST /auth/admin/verify
   * The backend validates the secret against a server-side store.
   * NEVER put a real admin secret in frontend code.
   *
   * DEMO: Accepts any non-empty code and verifies the pending session.
   *
   * Real API: POST /auth/admin/verify
   * Returns: { authenticated, user, role }
   */
  async verifyAdmin(request: AdminVerifyRequest): Promise<AdminVerifyResponse> {
    // DEMO ONLY — replace this entire function body with:
    // return await fetch('/auth/admin/verify', { method: 'POST', body: JSON.stringify(request) }).then(r => r.json())

    await new Promise((r) => setTimeout(r, 1000)); // simulate network

    const stage = sessionStorage.getItem(AUTH_STAGE_KEY);
    if (stage !== "first_stage_complete") {
      throw new Error("Invalid verification state. Please sign in again.");
    }

    const { email, password, adminSecretCode } = request;

    if (!email || !password || !adminSecretCode) {
      throw new Error("All fields are required for administrator verification.");
    }

    // DEMO: re-check first-stage credentials
    if (
      email.toLowerCase().trim() !== MOCK_ADMIN_CREDENTIALS.email ||
      password !== MOCK_ADMIN_CREDENTIALS.password
    ) {
      throw new Error(
        "Verification failed. Check your credentials and try again."
      );
    }

    // DEMO: adminSecretCode is accepted as non-empty — backend validates in production
    // Clear pending stage, establish full admin session
    sessionStorage.removeItem(AUTH_STAGE_KEY);
    sessionStorage.removeItem("skillsaarthi_pending_email");
    localStorage.setItem(AUTH_KEY, JSON.stringify(DEMO_ADMIN_USER));

    return {
      authenticated: true,
      user: DEMO_ADMIN_USER,
      role: "admin",
    };
  },

  /**
   * Register a new employee account.
   * Real API: POST /auth/register
   */
  async register(data: {
    name: string;
    email: string;
    password: string;
    designation: string;
    department: string;
  }): Promise<User> {
    await new Promise((r) => setTimeout(r, 1000));
    const user: User = {
      id: `emp-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: "employee",
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  /**
   * Logout — clears all session state.
   * Real API: POST /auth/logout
   */
  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_STAGE_KEY);
    sessionStorage.removeItem("skillsaarthi_pending_email");
  },

  /** Returns the currently authenticated user, or null. */
  getCurrentUser(): User | null {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  /** Returns true if a full session exists (both stages complete for admin). */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  },

  /** Returns true if admin first-stage is complete but second-stage is pending. */
  isPendingAdminVerification(): boolean {
    return sessionStorage.getItem(AUTH_STAGE_KEY) === "first_stage_complete";
  },

  /** Returns the email stored during first-stage admin login (for pre-filling verify form). */
  getPendingAdminEmail(): string {
    return sessionStorage.getItem("skillsaarthi_pending_email") ?? "";
  },
};
