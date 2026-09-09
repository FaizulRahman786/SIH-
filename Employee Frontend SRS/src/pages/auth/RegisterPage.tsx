import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Zap, Loader2 } from "lucide-react";
import { authApi } from "../../services/authApi";

const DEPARTMENTS = [
  "Ministry of Statistics & PI", "CSO", "NSSO", "Price Statistics Division",
  "National Accounts Division", "Social Statistics Division", "Economic Statistics Division",
];

const DESIGNATIONS = [
  "Statistical Officer", "Senior Statistical Officer", "Deputy Director", "Assistant Director",
  "Director", "Additional Director General", "Deputy Director General",
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", password: "", designation: "", department: "",
  });

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.designation || !form.department) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await authApi.register(form);
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-[var(--color-canvas)] p-6">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-primary)] flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>SkillSaarthi AI</span>
        </div>

        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-8 shadow-[var(--shadow-lg)]">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Create your account
          </h1>
          <p className="text-sm text-[var(--color-muted-fg)] mb-6">
            Start building your AI-powered competency profile.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Full name</label>
              <input
                id="name" type="text" required autoComplete="name"
                value={form.name} onChange={(e) => set("name", e.target.value)}
                placeholder="Arjun Sharma"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Official email</label>
              <input
                id="reg-email" type="email" required autoComplete="email"
                value={form.email} onChange={(e) => set("email", e.target.value)}
                placeholder="you@mospi.gov.in"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Designation</label>
                <select
                  id="designation" required
                  value={form.designation} onChange={(e) => set("designation", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors text-[var(--color-text)]"
                >
                  <option value="">Select…</option>
                  {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Department</label>
                <select
                  id="department" required
                  value={form.department} onChange={(e) => set("department", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors text-[var(--color-text)]"
                >
                  <option value="">Select…</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Password</label>
              <input
                id="reg-password" type="password" required autoComplete="new-password"
                value={form.password} onChange={(e) => set("password", e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:border-[var(--color-blue-primary)] transition-colors"
              />
            </div>

            {error && (
              <div className="text-sm text-[var(--color-critical-fg)] bg-[var(--color-critical-bg)] border border-[var(--color-critical-fg)]/30 rounded-lg px-3 py-2" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--color-blue-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-blue-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" />Creating account…</> : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-[var(--color-muted-fg)]">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--color-blue-primary)] font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
