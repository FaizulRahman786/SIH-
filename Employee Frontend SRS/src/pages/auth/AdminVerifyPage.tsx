/**
 * AdminVerifyPage — Stage 2 of the two-stage admin authentication flow.
 *
 * This screen appears ONLY after a user successfully passes stage 1
 * (email + password on /login) and the backend determines the account
 * requires administrator verification.
 *
 * Fields:
 *   - Email (pre-filled from stage 1, read-only)
 *   - Password (re-enter)
 *   - Admin Secret Code (never validated in frontend — passed to mock/backend)
 *
 * ⚠️  SECURITY NOTE: The adminSecretCode field value is intentionally NOT
 *     validated in this frontend file. All secret validation must occur
 *     server-side. This file only collects and forwards the value.
 *
 * DEMO: The mock service (authApi.verifyAdmin) accepts any non-empty code.
 *       Replace authApi.verifyAdmin() with POST /auth/admin/verify when backend
 *       is integrated.
 */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  KeyRound,
  Lock,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../services/authApi";

export default function AdminVerifyPage() {
  const navigate = useNavigate();
  const { verifyAdmin, status } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill email from stage 1 and guard against direct navigation
  useEffect(() => {
    // If already fully authenticated, go to admin portal
    if (status === "authenticated") {
      navigate("/admin", { replace: true });
      return;
    }
    // If not in pending state at all, send back to login
    if (status === "unauthenticated") {
      navigate("/login", { replace: true });
      return;
    }

    const pendingEmail = authApi.getPendingAdminEmail();
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, [status, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !secretCode) {
      setError("All fields are required for administrator verification.");
      return;
    }

    setLoading(true);
    try {
      // DEMO: verifyAdmin forwards credentials to mock service
      // Replace with: POST /auth/admin/verify  when backend is ready
      await verifyAdmin({ email, password, adminSecretCode: secretCode });
      navigate("/admin", { replace: true });
    } catch (err: unknown) {
      // Intentionally vague error — don't reveal which field failed
      if (err instanceof Error) {
        setError(err.message || "Verification failed. Check your credentials and try again.");
      } else {
        setError("Verification failed. Check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    await authApi.logout(); // clear pending stage
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-full flex bg-[var(--color-canvas)]">
      {/* Left security panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10 relative overflow-hidden"
        style={{ background: "var(--color-navy-900)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1b4fd8 0%, transparent 45%)",
          }}
          aria-hidden="true"
        />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-blue-primary)] flex items-center justify-center">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <div
              className="text-white font-bold text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SkillSaarthi AI
            </div>
            <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
              Admin Portal
            </div>
          </div>
        </div>

        {/* Security callouts */}
        <div className="relative z-10 space-y-5">
          <div>
            <div className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">
              Security Layers
            </div>
            {[
              {
                icon: Lock,
                title: "Two-Stage Authentication",
                desc: "Your identity is verified in two separate steps before access is granted.",
              },
              {
                icon: ShieldCheck,
                title: "Administrator Secret",
                desc: "A unique administrator secret code is required in addition to your credentials.",
              },
              {
                icon: KeyRound,
                title: "Session Isolation",
                desc: "Admin sessions are isolated from standard employee sessions.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={13} className="text-[var(--color-blue-light)]" />
                </div>
                <div>
                  <div
                    className="text-white/80 text-sm font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {title}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5 leading-relaxed">
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-white/25 text-xs">
            Ministry of Statistics & Programme Implementation
          </div>
        </div>
      </div>

      {/* Right verification form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[var(--color-canvas)]">
        <div className="w-full max-w-sm animate-fade-in-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-primary)] flex items-center justify-center">
              <ShieldCheck size={16} className="text-white" />
            </div>
            <span
              className="font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SkillSaarthi AI
            </span>
          </div>

          {/* Security indicator badge */}
          <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-[var(--color-info-bg)] border border-[var(--color-info-fg)]/25">
            <ShieldCheck size={14} className="text-[var(--color-info-fg)] flex-shrink-0" />
            <div className="text-xs text-[var(--color-info-fg)]">
              <span className="font-semibold">Secure verification required</span>
              {" — "}Stage 2 of 2
            </div>
          </div>

          <div className="mb-6">
            <h1
              className="text-2xl font-bold text-[var(--color-text)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Administrator Verification
            </h1>
            <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
              Additional verification is required to access the SkillSaarthi
              administration portal. Enter your credentials and administrator
              secret code.
            </p>
          </div>

          {/* DEMO notice */}
          <div className="bg-[var(--color-caution-bg)] border border-[var(--color-caution-fg)]/30 rounded-lg px-4 py-3 mb-6">
            <div className="text-xs font-mono font-medium text-[var(--color-caution-fg)] uppercase tracking-wider mb-1">
              Demo Mode
            </div>
            <div className="text-xs text-[var(--color-caution-fg)]">
              Use any non-empty value as the secret code. Real verification
              is backend-controlled.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email — read-only (pre-filled from stage 1) */}
            <div>
              <label
                htmlFor="verify-email"
                className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
              >
                Email address
              </label>
              <input
                id="verify-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)] placeholder:text-[var(--color-muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors"
                placeholder="admin@mospi.gov.in"
                required
                aria-describedby={error ? "verify-error" : undefined}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="verify-password"
                className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="verify-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-fg)] hover:text-[var(--color-text)] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Admin Secret Code */}
            <div>
              <label
                htmlFor="verify-secret"
                className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
              >
                Admin Secret Code
              </label>
              <div className="relative">
                <input
                  id="verify-secret"
                  type={showSecret ? "text" : "password"}
                  autoComplete="one-time-code"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors font-mono"
                  placeholder="Enter administrator secret code"
                  required
                  aria-describedby={error ? "verify-error" : "secret-hint"}
                />
                <button
                  type="button"
                  onClick={() => setShowSecret((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-fg)] hover:text-[var(--color-text)] transition-colors"
                  aria-label={showSecret ? "Hide secret code" : "Show secret code"}
                >
                  {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p
                id="secret-hint"
                className="mt-1 text-[11px] text-[var(--color-muted-fg)]"
              >
                Contact your system administrator if you do not have this code.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                id="verify-error"
                className="text-sm text-[var(--color-critical-fg)] bg-[var(--color-critical-bg)] border border-[var(--color-critical-fg)]/30 rounded-lg px-3 py-2"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--color-blue-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-blue-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Verify & Continue
                </>
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-fg)] hover:text-[var(--color-text)] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to sign in
            </button>
          </div>

          {/* Security note */}
          <p className="mt-8 text-center text-[11px] text-[var(--color-muted-fg)] leading-relaxed">
            This page is a secure administrative access point.
            Your session will be verified at each administrative request.
          </p>
        </div>
      </div>
    </div>
  );
}
