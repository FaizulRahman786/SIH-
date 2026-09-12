import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp, AlertTriangle, Clock, BookOpen, ChevronRight,
  Bot, Zap, ArrowRight, CheckCircle, Target, Star,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
} from "recharts";
import { competencyApi } from "../../services/competencyApi";
import { DEMO_USER, DEMO_PROFILE, DEMO_LEARNING_PATH, DEMO_ASSESSMENTS } from "../../data/mockData";
import { ProgressRing } from "../../components/common/ProgressRing";
import { Skeleton, SkeletonCard } from "../../components/common/Skeleton";
import { Badge } from "../../components/common/Badge";
import type { DashboardStats, AIInsight } from "../../types";

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "blue",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  delay?: number;
}) {
  const colorMap: Record<string, { bg: string; icon: string }> = {
    blue: { bg: "bg-[var(--color-blue-muted)]", icon: "text-[var(--color-blue-primary)]" },
    orange: { bg: "bg-[var(--color-warning-bg)]", icon: "text-[var(--color-warning-fg)]" },
    green: { bg: "bg-[var(--color-success-bg)]", icon: "text-[var(--color-success-fg)]" },
    sky: { bg: "bg-[var(--color-info-bg)]", icon: "text-[var(--color-info-fg)]" },
  };
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div
      className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon size={18} className={c.icon} />
        </div>
      </div>
      <div className="text-2xl font-bold text-[var(--color-text)] font-mono">{value}</div>
      <div className="text-sm text-[var(--color-text-secondary)] mt-0.5">{label}</div>
      {sub && <div className="text-xs text-[var(--color-muted-fg)] mt-1">{sub}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [s, i] = await Promise.all([
        competencyApi.getDashboardStats(),
        competencyApi.getAIInsights(),
      ]);
      setStats(s);
      setInsights(i);
      setLoading(false);
    };
    load();
  }, []);

  const radarData = [
    { subject: "Statistical", current: 80, target: 80 },
    { subject: "Python/ML", current: 22, target: 80 },
    { subject: "SQL", current: 60, target: 80 },
    { subject: "Cloud", current: 20, target: 60 },
    { subject: "Governance", current: 40, target: 60 },
    { subject: "Behavioural", current: 70, target: 80 },
  ];

  const currentStep = DEMO_LEARNING_PATH.steps.find((s) => s.status === "in_progress");
  const latestAssessment = DEMO_ASSESSMENTS.find((a) => a.status === "completed");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-5 lg:p-7 max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <div
        className="rounded-2xl p-6 lg:p-8 relative overflow-hidden animate-fade-in"
        style={{ background: "var(--color-navy-900)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, #1b4fd8 0%, transparent 50%), radial-gradient(circle at 10% 80%, #0ea5e9 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="text-white/50 text-xs font-mono uppercase tracking-widest mb-1">
              {DEMO_PROFILE.department}
            </div>
            <h1
              className="text-2xl lg:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {greeting}, {DEMO_USER.name.split(" ")[0]}
            </h1>
            <p className="text-white/70 text-sm max-w-md leading-relaxed">
              Your path to{" "}
              <span className="text-white font-medium">{DEMO_PROFILE.targetRole}</span> is active.
              You have{" "}
              <span className="text-amber-300 font-semibold">2 critical skill gaps</span> to address.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={() => navigate("/learning-path")}
                className="flex items-center gap-1.5 bg-[var(--color-blue-primary)] hover:bg-[var(--color-blue-light)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Continue Learning <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate("/skill-gaps")}
                className="flex items-center gap-1.5 bg-[var(--color-surface)]/10 hover:bg-[var(--color-surface)]/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                View Skill Gaps
              </button>
            </div>
          </div>

          {loading ? (
            <div className="w-32 h-32 skeleton rounded-full flex-shrink-0" />
          ) : (
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <ProgressRing
                value={stats?.overallCompetency ?? 0}
                size={130}
                strokeWidth={10}
                color="#3b6ef5"
                label={`${stats?.overallCompetency}%`}
                sublabel="Competency"
              />
              <div className="text-white/50 text-[11px] font-mono text-center">Overall score</div>
            </div>
          )}
        </div>
      </div>

      {/* KPI strip */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} lines={2} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={AlertTriangle} label="Critical Gaps" value={stats?.criticalGaps ?? 0} sub="Needs immediate action" color="orange" delay={0} />
          <MetricCard icon={Clock} label="Learning Hours" value={stats?.learningHours ?? 0} sub="Past 30 days" color="sky" delay={60} />
          <MetricCard icon={BookOpen} label="Completed Courses" value={stats?.completedCourses ?? 0} sub="This quarter" color="green" delay={120} />
          <MetricCard icon={TrendingUp} label="Assessments Taken" value={stats?.assessmentsTaken ?? 0} sub="Competency validated" color="blue" delay={180} />
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competency radar */}
        <div className="lg:col-span-2 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
                Competency Overview
              </h2>
              <p className="text-xs text-[var(--color-muted-fg)] mt-0.5">Current vs. target for Senior Data Analyst</p>
            </div>
            <button onClick={() => navigate("/competencies")} className="text-xs text-[var(--color-blue-primary)] font-medium flex items-center gap-1 hover:underline">
              Details <ChevronRight size={12} />
            </button>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height={224}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--color-muted-fg)" }} />
                <Radar name="Target" dataKey="target" stroke="var(--color-border)" fill="var(--color-border)" fillOpacity={0.4} strokeDasharray="4 2" />
                <Radar name="Current" dataKey="current" stroke="var(--color-blue-primary)" fill="var(--color-blue-primary)" fillOpacity={0.15} />
                <Tooltip
                  contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12, color: "var(--color-text)" }}
                  formatter={(val, name) => [`${val}%`, String(name)]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-5 mt-2 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted-fg)]">
              <div className="w-3 h-0.5 bg-[var(--color-blue-primary)]" /> Current
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted-fg)]">
              <div className="w-3 h-0.5 border-t border-dashed border-[var(--color-border-strong)]" /> Target
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="space-y-4">
          <div className="bg-[var(--color-navy-900)] rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-[var(--color-sky)]" />
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider">AI Insight</span>
            </div>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-3 w-full bg-[var(--color-surface)]/10" />
                <Skeleton className="h-3 w-4/5 bg-[var(--color-surface)]/10" />
                <Skeleton className="h-3 w-3/4 bg-[var(--color-surface)]/10" />
              </div>
            ) : (
              <>
                <p className="text-sm text-white/80 leading-relaxed">
                  {insights[0]?.body ?? "Loading insight…"}
                </p>
                {insights[0]?.action && (
                  <button
                    onClick={() => navigate(insights[0].actionRoute ?? "/learning-path")}
                    className="mt-3 flex items-center gap-1.5 text-xs text-[var(--color-sky)] font-medium hover:text-white transition-colors"
                  >
                    {insights[0].action} <ArrowRight size={12} />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Target role */}
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-[var(--color-blue-primary)]" />
                <span className="text-xs font-mono text-[var(--color-muted-fg)] uppercase tracking-wider">Target Role</span>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--color-blue-primary)] bg-[var(--color-blue-muted)] px-2 py-0.5 rounded">
                68% Readiness
              </span>
            </div>
            <div className="text-base font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              {DEMO_PROFILE.targetRole}
            </div>
            <div className="text-xs text-[var(--color-muted-fg)] mt-0.5">{DEMO_PROFILE.department}</div>

            {/* Role Readiness Breakdown */}
            <div className="mt-3 pt-3 border-t border-[var(--color-border)] space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted-fg)]">
                Role Capability Breakdown
              </div>
              {[
                { name: "Statistics", score: 86 },
                { name: "SQL", score: 74 },
                { name: "Python", score: 52 },
                { name: "ML", score: 31 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-secondary)]">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 bg-[var(--color-muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-blue-primary)] rounded-full" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-text)] w-7 text-right">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
              <div className="flex justify-between text-xs text-[var(--color-muted-fg)] mb-1.5">
                <span>Path progress</span>
                <span className="font-mono text-[var(--color-text-secondary)]">
                  {DEMO_LEARNING_PATH.completedSteps}/{DEMO_LEARNING_PATH.totalSteps} steps
                </span>
              </div>
              <div className="h-1.5 bg-[var(--color-muted)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-blue-primary)] rounded-full transition-all"
                  style={{ width: `${(DEMO_LEARNING_PATH.completedSteps / DEMO_LEARNING_PATH.totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical gaps + Next best action */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical gaps */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              Critical Skill Gaps
            </h2>
            <button onClick={() => navigate("/skill-gaps")} className="text-xs text-[var(--color-blue-primary)] font-medium flex items-center gap-1 hover:underline">
              All gaps <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Machine Learning", current: 1, required: 4, priority: "critical" as const },
              { name: "Python", current: 2, required: 4, priority: "critical" as const },
              { name: "Cloud Computing", current: 1, required: 3, priority: "high" as const },
            ].map((gap) => (
              <div key={gap.name} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-medium text-[var(--color-text)] truncate">{gap.name}</span>
                    <Badge
                      label={gap.priority.toUpperCase()}
                      variant={gap.priority}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((l) => (
                      <div
                        key={l}
                        className="flex-1 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            l <= gap.current ? "var(--color-blue-primary)" :
                            l <= gap.required ? "var(--color-border-strong)" : "var(--color-muted)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-mono font-semibold text-[var(--color-text)]">{gap.current}/5</div>
                  <div className="text-[10px] text-[var(--color-muted-fg)]">need {gap.required}/5</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Best Action */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star size={14} className="text-amber-500" />
            <h2 className="text-base font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              Next Best Action
            </h2>
          </div>

          {currentStep && (
            <div className="bg-[var(--color-blue-muted)] rounded-xl p-4 mb-3">
              <div className="text-[10px] font-mono text-[var(--color-blue-primary)] uppercase tracking-wider mb-1">
                In Progress
              </div>
              <div className="text-sm font-semibold text-[var(--color-text)] mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
                {currentStep.title}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">{currentStep.provider} · {currentStep.durationHours}h</div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-[var(--color-muted-fg)] mb-1">
                  <span>Progress</span><span className="font-mono">35%</span>
                </div>
                <div className="h-1.5 bg-[var(--color-surface)]/70 rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-[var(--color-blue-primary)] rounded-full" />
                </div>
              </div>
              <button
                onClick={() => navigate("/courses/course-003")}
                className="mt-3 w-full flex items-center justify-center gap-1.5 bg-[var(--color-blue-primary)] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[var(--color-blue-light)] transition-colors"
              >
                Continue <ArrowRight size={12} />
              </button>
            </div>
          )}

          {latestAssessment && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-success-bg)] flex items-center justify-center flex-shrink-0">
                <CheckCircle size={16} className="text-[var(--color-success-fg)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[var(--color-text)] truncate">
                  {latestAssessment.title}
                </div>
                <div className="text-[10px] text-[var(--color-muted-fg)]">
                  Score: <span className="font-mono font-semibold text-[var(--color-success-fg)]">{latestAssessment.score}%</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/assessments")}
                className="text-[10px] text-[var(--color-blue-primary)] font-medium hover:underline flex-shrink-0"
              >
                View
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Learning path preview */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
            Learning Path · {DEMO_PROFILE.targetRole}
          </h2>
          <button onClick={() => navigate("/learning-path")} className="text-xs text-[var(--color-blue-primary)] font-medium flex items-center gap-1 hover:underline">
            Full roadmap <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {DEMO_LEARNING_PATH.steps.slice(0, 5).map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
              <div className={`
                flex flex-col items-center gap-1 px-3 py-3 rounded-xl min-w-[120px] border text-center
                ${step.status === "completed" ? "bg-[var(--color-success-bg)] border-[var(--color-success-fg)]/30" :
                  step.status === "in_progress" ? "bg-[var(--color-blue-muted)] border-[var(--color-blue-primary)]/30" :
                  step.status === "available" ? "bg-[var(--color-surface)] border-[var(--color-border)]" :
                  "bg-[var(--color-muted)] border-[var(--color-border)] opacity-60"}
              `}>
                <div className={`text-[10px] font-mono font-semibold uppercase tracking-wider
                  ${step.status === "completed" ? "text-[var(--color-success-fg)]" :
                    step.status === "in_progress" ? "text-[var(--color-blue-primary)]" :
                    "text-[var(--color-muted-fg)]"}
                `}>
                  {step.status === "completed" ? "✓ Done" :
                   step.status === "in_progress" ? "Active" :
                   step.status === "available" ? "Ready" : "Locked"}
                </div>
                <div className="text-xs font-medium text-[var(--color-text)] leading-snug">{step.title}</div>
                <div className="text-[10px] text-[var(--color-muted-fg)]">{step.durationHours}h</div>
              </div>
              {i < 4 && <div className="text-[var(--color-border-strong)]">→</div>}
            </div>
          ))}
          <div className="flex-shrink-0 text-[var(--color-muted-fg)] text-xs px-2">+2 more</div>
        </div>
      </div>

      {/* AI Coach entry */}
      <button
        onClick={() => navigate("/assistant")}
        className="w-full flex items-center gap-4 bg-gradient-to-r from-[var(--color-navy-900)] to-[var(--color-navy-800)] rounded-xl p-5 text-left hover:from-[var(--color-navy-800)] hover:to-[var(--color-navy-700)] transition-all group"
      >
        <div className="w-11 h-11 rounded-xl bg-[var(--color-blue-primary)] flex items-center justify-center flex-shrink-0">
          <Bot size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>
            Chat with your AI Learning Coach
          </div>
          <div className="text-white/50 text-xs mt-0.5">
            Ask about your gaps, get a study plan, or explain any concept
          </div>
        </div>
        <ArrowRight size={18} className="text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all flex-shrink-0" />
      </button>
    </div>
  );
}
