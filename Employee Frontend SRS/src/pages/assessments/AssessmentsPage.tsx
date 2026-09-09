import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ClipboardList, CheckCircle, Clock, AlertCircle, ArrowRight, Plus } from "lucide-react";
import { assessmentApi } from "../../services/assessmentApi";
import type { Assessment } from "../../types";
import { Badge } from "../../components/common/Badge";
import { Skeleton } from "../../components/common/Skeleton";
import { EmptyState } from "../../components/common/EmptyState";

const STATUS_META: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  completed: { icon: CheckCircle, color: "text-green-500", label: "Completed" },
  in_progress: { icon: Clock, color: "text-blue-500", label: "In Progress" },
  pending: { icon: AlertCircle, color: "text-amber-500", label: "Pending" },
  failed: { icon: AlertCircle, color: "text-red-500", label: "Failed" },
};

function AssessmentCard({ assessment, index }: { assessment: Assessment; index: number }) {
  const navigate = useNavigate();
  const meta = STATUS_META[assessment.status];
  const Icon = meta.icon;

  return (
    <button
      onClick={() => navigate(`/assessments/${assessment.id}`)}
      className="w-full bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 text-left hover:border-[var(--color-blue-primary)] hover:shadow-[var(--shadow)] transition-all group animate-fade-in-up flex items-start gap-4"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
        assessment.status === "completed" ? "bg-[var(--color-success-bg)]" :
        assessment.status === "in_progress" ? "bg-[var(--color-blue-muted)]" :
        "bg-[var(--color-caution-bg)]"
      }`}>
        <Icon size={18} className={meta.color} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-[var(--color-text)] leading-snug" style={{ fontFamily: "var(--font-display)" }}>
            {assessment.title}
          </h3>
          {assessment.score !== undefined && (
            <div className={`flex-shrink-0 text-lg font-bold font-mono ${assessment.score >= 80 ? "text-green-600" : assessment.score >= 60 ? "text-amber-600" : "text-red-500"}`}>
              {assessment.score}%
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[var(--color-muted-fg)]">
          <span>{assessment.questionCount} questions</span>
          <span>·</span>
          <span>{assessment.durationMinutes} min</span>
          <span>·</span>
          <span>{assessment.createdAt}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {assessment.skills.map((s) => (
            <span key={s} className="text-[10px] bg-[var(--color-muted)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full">{s}</span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Badge
            label={meta.label}
            variant={assessment.status === "completed" ? "success" : assessment.status === "in_progress" ? "info" : "warning"}
          />
          {assessment.documentId && <Badge label="AI Generated" variant="info" />}
        </div>
      </div>

      <ArrowRight size={14} className="text-[var(--color-muted-fg)] group-hover:text-[var(--color-blue-primary)] flex-shrink-0 mt-1" />
    </button>
  );
}

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    assessmentApi.getAssessments().then(setAssessments).finally(() => setLoading(false));
  }, []);

  const completedCount = assessments.filter((a) => a.status === "completed").length;
  const avgScore = completedCount > 0
    ? Math.round(assessments.filter((a) => a.score !== undefined).reduce((s, a) => s + (a.score ?? 0), 0) / completedCount)
    : 0;

  return (
    <div className="p-5 lg:p-7 max-w-3xl mx-auto space-y-5">
      <div className="flex items-start justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
            Assessments
          </h1>
          <p className="text-sm text-[var(--color-muted-fg)] mt-0.5">
            Validate your competencies with AI-powered quizzes.
          </p>
        </div>
        <button
          onClick={() => navigate("/documents")}
          className="flex items-center gap-2 px-3.5 py-2 bg-[var(--color-blue-primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-blue-light)] transition-colors flex-shrink-0"
        >
          <Plus size={15} /> Generate
        </button>
      </div>

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total", value: assessments.length },
            { label: "Completed", value: completedCount },
            { label: "Avg Score", value: completedCount > 0 ? `${avgScore}%` : "–" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 text-center">
              <div className="text-xl font-bold font-mono text-[var(--color-text)]">{value}</div>
              <div className="text-xs text-[var(--color-muted-fg)] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      ) : assessments.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No assessments yet"
          description="Upload a learning document to generate an AI-powered assessment."
          action={{ label: "Upload Document", onClick: () => navigate("/documents") }}
        />
      ) : (
        <div className="space-y-3">
          {assessments.map((a, i) => <AssessmentCard key={a.id} assessment={a} index={i} />)}
        </div>
      )}
    </div>
  );
}
