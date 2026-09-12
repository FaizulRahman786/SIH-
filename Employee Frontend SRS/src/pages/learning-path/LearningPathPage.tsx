import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Lock, CheckCircle, PlayCircle, Circle, Clock, ArrowRight, Target } from "lucide-react";
import { learningApi } from "../../services/learningApi";
import { DEMO_PROFILE } from "../../data/mockData";
import type { LearningPath, LearningPathStep, StepStatus } from "../../types";
import { Skeleton } from "../../components/common/Skeleton";

function StatusIcon({ status }: { status: StepStatus }) {
  if (status === "completed") return <CheckCircle size={20} className="text-green-500" />;
  if (status === "in_progress") return <PlayCircle size={20} className="text-[var(--color-blue-primary)]" />;
  if (status === "available") return <Circle size={20} className="text-[var(--color-blue-primary)]" />;
  return <Lock size={20} className="text-[var(--color-muted-fg)]" />;
}

function StepCard({ step, index }: { step: LearningPathStep; index: number }) {
  const navigate = useNavigate();
  const isActive = step.status !== "locked";
  const levelColors = { beginner: "text-[var(--color-success-fg)] bg-[var(--color-success-bg)]", intermediate: "text-[var(--color-blue-primary)] bg-[var(--color-blue-muted)]", advanced: "text-[var(--color-info-fg)] bg-[var(--color-info-bg)]" };

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 relative
          ${step.status === "completed" ? "bg-[var(--color-success-bg)] border-[var(--color-success-fg)]" :
            step.status === "in_progress" ? "bg-[var(--color-blue-muted)] border-[var(--color-blue-primary)]" :
            step.status === "available" ? "bg-[var(--color-surface)] border-[var(--color-blue-primary)]" :
            "bg-[var(--color-muted)] border-[var(--color-border)]"}
        `}>
          <StatusIcon status={step.status} />
        </div>
        {index < 6 && (
          <div className={`w-0.5 flex-1 mt-1 ${step.status === "completed" ? "bg-green-300" : "bg-[var(--color-border)]"}`} style={{ minHeight: 32 }} />
        )}
      </div>

      {/* Card */}
      <div
        className={`
          flex-1 mb-4 rounded-xl border p-4 transition-all duration-200 animate-fade-in-up
          ${step.status === "locked" ? "bg-[var(--color-muted)] border-[var(--color-border)] opacity-70" :
            step.status === "in_progress" ? "bg-[var(--color-blue-muted)] border-blue-200 shadow-[var(--shadow)]" :
            "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-blue-primary)] hover:shadow-[var(--shadow)]"}
        `}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-mono text-[var(--color-muted-fg)] uppercase tracking-wider">Step {step.order}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium capitalize ${levelColors[step.level]}`}>
                {step.level}
              </span>
              {step.matchPercentage >= 90 && (
                <span className="text-[10px] font-mono text-[var(--color-blue-primary)] bg-[var(--color-blue-muted)] px-1.5 py-0.5 rounded font-medium">
                  {step.matchPercentage}% match
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              {step.title}
            </h3>
            <p className="text-xs text-[var(--color-muted-fg)] mt-1">{step.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 text-[var(--color-muted-fg)]">
              <Clock size={11} />
              <span className="text-xs font-mono">{step.durationHours}h</span>
            </div>
            <div className="text-[10px] text-[var(--color-muted-fg)] mt-0.5">{step.provider}</div>
          </div>
        </div>

        {step.skillImpact.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {step.skillImpact.map((s) => (
              <span key={s} className="text-[10px] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        )}

        {step.status === "in_progress" && (
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-[var(--color-muted-fg)] mb-1">
              <span>Progress</span><span className="font-mono">35%</span>
            </div>
            <div className="h-1.5 bg-[var(--color-surface)]/60 rounded-full overflow-hidden">
              <div className="h-full w-[35%] bg-[var(--color-blue-primary)] rounded-full" />
            </div>
          </div>
        )}

        {isActive && (
          <button
            onClick={() => navigate(`/courses/${step.courseId}`)}
            className={`
              mt-3 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors
              ${step.status === "in_progress"
                ? "bg-[var(--color-blue-primary)] text-white hover:bg-[var(--color-blue-light)]"
                : step.status === "completed"
                ? "bg-[var(--color-success-bg)] text-[var(--color-success-fg)] hover:bg-[var(--color-success-bg)]/80"
                : "border border-[var(--color-blue-primary)] text-[var(--color-blue-primary)] hover:bg-[var(--color-blue-muted)]"}
            `}
          >
            {step.status === "completed" ? "Review" : step.status === "in_progress" ? "Continue" : "Start"}
            <ArrowRight size={11} />
          </button>
        )}

        {step.prerequisites.length > 0 && step.status === "locked" && (
          <div className="mt-2 text-[10px] text-[var(--color-muted-fg)]">
            Requires: {step.prerequisites.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearningPathPage() {
  const [path, setPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    learningApi.getLearningPath()
      .then(setPath)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-5 lg:p-7 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <Skeleton className="flex-1 h-28" />
          </div>
        ))}
      </div>
    );
  }

  if (!path) return null;

  return (
    <div className="p-5 lg:p-7 max-w-2xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
          Your Learning Path
        </h1>
        <p className="text-sm text-[var(--color-muted-fg)] mt-0.5">
          A personalised roadmap to {DEMO_PROFILE.targetRole}
        </p>
      </div>

      {/* Path summary */}
      <div className="bg-[var(--color-navy-900)] rounded-xl p-5 text-white flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Target Role</div>
          <div className="text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>{path.targetRole}</div>
          <div className="text-xs text-white/50 mt-1">{path.totalSteps} steps · {path.estimatedHours} hours total</div>
        </div>
        <div className="flex items-center gap-5 flex-shrink-0">
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-[var(--color-sky)]">{path.completedSteps}</div>
            <div className="text-[10px] text-white/40">Complete</div>
          </div>
          <div className="text-white/20">/</div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-white">{path.totalSteps}</div>
            <div className="text-[10px] text-white/40">Total</div>
          </div>
        </div>
      </div>

      {/* Start marker */}
      <div className="flex items-center gap-3 text-xs text-[var(--color-muted-fg)] font-mono uppercase tracking-widest">
        <div className="h-px flex-1 bg-[var(--color-border)]" />
        Current Profile
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      {/* Steps */}
      <div>
        {path.steps.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} />
        ))}
      </div>

      {/* End marker */}
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="w-12 h-12 rounded-full bg-[var(--color-blue-primary)] flex items-center justify-center">
          <Target size={20} className="text-white" />
        </div>
        <div className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
          {path.targetRole}
        </div>
        <div className="text-xs text-[var(--color-muted-fg)]">Your destination</div>
      </div>
    </div>
  );
}
