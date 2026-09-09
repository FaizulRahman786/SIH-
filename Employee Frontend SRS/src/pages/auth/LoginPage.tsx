import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { Zap, Eye, EyeOff, Loader2 } from "lucide-react"
import { authApi } from "../../services/authApi"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("arjun.sharma@mospi.gov.in")
  const [password, setPassword] = useState("demo1234")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }
    setLoading(true)
    try {
      await authApi.login({ email, password })
      navigate("/dashboard")
    } catch {
      setError("Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10 relative overflow-hidden"
        style={{ background: "var(--color-navy-900)" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, #1b4fd8 0%, transparent 50%), radial-gradient(circle at 80% 80%, #0ea5e9 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-blue-primary)] flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <div
                className="text-white font-bold text-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                SkillSaarthi AI
              </div>
              <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
                Demo Mode
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          <div>
            <div className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2">
              Platform Mission
            </div>
            <blockquote
              className="text-white text-xl font-semibold leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              "Understand your skills. Close your gaps. Grow your career."
            </blockquote>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Skills Tracked", value: "200+" },
              { label: "Competency Levels", value: "6" },
              { label: "iGOT Courses", value: "500+" },
              { label: "AI-Powered", value: "100%" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[var(--color-surface)]/8 rounded-xl p-3 border border-[var(--color-border)]/10"
              >
                <div className="text-white font-bold text-xl font-mono">
                  {value}
                </div>
                <div className="text-white/50 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-white/30 text-xs">
            Ministry of Statistics & Programme Implementation
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[var(--color-canvas)]">
        <div className="w-full max-w-sm animate-fade-in-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-primary)] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span
              className="font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SkillSaarthi AI
            </span>
          </div>

          <div className="mb-8">
            <h1
              className="text-2xl font-bold text-[var(--color-text)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sign in
            </h1>
            <p className="text-sm text-[var(--color-muted-fg)]">
              Enter your government credentials to access your competency
              profile.
            </p>
          </div>

          <div className="bg-[var(--color-caution-bg)] border border-[var(--color-caution-fg)]/30 rounded-lg px-4 py-3 mb-6">
            <div className="text-xs font-mono font-medium text-[var(--color-caution-fg)] uppercase tracking-wider mb-1">
              Demo credentials pre-filled
            </div>
            <div className="text-xs text-[var(--color-caution-fg)]">
              Click "Sign in" to explore the platform with synthetic data.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors"
                placeholder="you@mospi.gov.in"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-fg)] hover:text-[var(--color-text)] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-sm text-[var(--color-critical-fg)] bg-[var(--color-critical-bg)] border border-[var(--color-critical-fg)]/30 rounded-lg px-3 py-2"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--color-blue-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-blue-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-muted-fg)]">
            New to SkillSaarthi?{" "}
            <Link
              to="/register"
              className="text-[var(--color-blue-primary)] font-medium hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
