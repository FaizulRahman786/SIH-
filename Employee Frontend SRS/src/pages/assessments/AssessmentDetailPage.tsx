import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Flag, ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react";
import { assessmentApi } from "../../services/assessmentApi";
import type { Assessment, Question, AssessmentResult } from "../../types";
import { Badge } from "../../components/common/Badge";
import { Skeleton } from "../../components/common/Skeleton";

function QuizView({
  assessment,
  questions,
  onComplete,
}: {
  assessment: Assessment;
  questions: Question[];
  onComplete: (result: AssessmentResult) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const q = questions[current];
  const answered = answers[q.id] !== undefined;
  const totalAnswered = Object.keys(answers).length;

  const handleAnswer = (index: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: index }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const result = await assessmentApi.submitAssessment(assessment.id, answers);
    onComplete(result);
  };

  const diffVariant = { easy: "success" as const, medium: "warning" as const, hard: "critical" as const };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-5 lg:p-7 gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-[var(--color-muted-fg)] font-mono">Question {current + 1} of {questions.length}</div>
          <div className="h-1.5 mt-1.5 w-48 bg-[var(--color-muted)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--color-blue-primary)] rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge label={q.difficulty} variant={diffVariant[q.difficulty]} />
          <button
            onClick={toggleFlag}
            className={`p-1.5 rounded-lg transition-colors ${flagged.has(q.id) ? "bg-[var(--color-caution-bg)] text-[var(--color-caution-fg)]" : "text-[var(--color-muted-fg)] hover:bg-[var(--color-muted)]"}`}
            aria-label="Flag question"
          >
            <Flag size={14} />
          </button>
        </div>
      </div>

      {/* Question */}
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 shadow-[var(--shadow)]">
        <div className="text-[10px] font-mono text-[var(--color-blue-primary)] uppercase tracking-wider mb-3">{q.relatedSkill}</div>
        <h2 className="text-base font-semibold text-[var(--color-text)] leading-relaxed mb-5" style={{ fontFamily: "var(--font-display)" }}>
          {q.text}
        </h2>

        <div className="space-y-2.5">
          {q.options.map((option, i) => {
            const selected = answers[q.id] === i;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  selected
                    ? "border-[var(--color-blue-primary)] bg-[var(--color-blue-muted)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-blue-primary)] hover:bg-[var(--color-muted)]"
                }`}
              >
                <div className={`
                  w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5 transition-colors
                  ${selected ? "bg-[var(--color-blue-primary)] text-white" : "border border-[var(--color-border)] text-[var(--color-muted-fg)]"}
                `}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className={`text-sm ${selected ? "text-[var(--color-blue-primary)] font-medium" : "text-[var(--color-text)]"}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question navigator */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q_, i) => (
          <button
            key={q_.id}
            onClick={() => setCurrent(i)}
            className={`w-7 h-7 rounded-lg text-[10px] font-mono font-bold transition-colors ${
              i === current ? "bg-[var(--color-blue-primary)] text-white" :
              answers[q_.id] !== undefined ? "bg-green-100 text-green-700" :
              flagged.has(q_.id) ? "bg-amber-100 text-amber-700" :
              "bg-[var(--color-muted)] text-[var(--color-muted-fg)]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-2 border border-[var(--color-border)] rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-[var(--color-muted)] transition-colors"
        >
          <ChevronLeft size={15} /> Previous
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-blue-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-blue-light)] transition-colors"
          >
            Next <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Submit ({totalAnswered}/{questions.length})
          </button>
        )}
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 max-w-sm w-full shadow-[var(--shadow-xl)]">
            <h3 className="text-base font-bold text-[var(--color-text)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Submit assessment?
            </h3>
            <p className="text-sm text-[var(--color-muted-fg)] mb-4">
              You have answered {totalAnswered} of {questions.length} questions.
              {totalAnswered < questions.length && " Some questions are unanswered."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 border border-[var(--color-border)] rounded-xl text-sm font-medium hover:bg-[var(--color-muted)] transition-colors"
              >
                Review
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60"
              >
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultView({ result, onBack }: { result: AssessmentResult; onBack: () => void }) {
  const navigate = useNavigate();
  const passing = result.score >= 70;

  return (
    <div className="p-5 lg:p-7 max-w-2xl mx-auto space-y-5 animate-fade-in-up">
      <div className={`rounded-2xl p-6 text-center ${passing ? "bg-green-600" : "bg-amber-500"}`}>
        <div className="text-5xl font-bold text-white font-mono animate-count-up">{result.score}%</div>
        <div className="text-white/80 text-sm mt-1">{passing ? "Well done!" : "Good attempt"}</div>
        <div className="text-white text-sm mt-2 leading-relaxed">{result.feedback}</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Correct", value: result.correctAnswers },
          { label: "Total", value: result.totalQuestions },
          { label: "Time", value: `${result.timeTaken}m` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 text-center">
            <div className="text-xl font-bold font-mono text-[var(--color-text)]">{value}</div>
            <div className="text-xs text-[var(--color-muted-fg)] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
        <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Competency Updates
        </h3>
        {Object.entries(result.competencyUpdates).map(([skill, delta]) => (
          <div key={skill} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
            <span className="text-sm text-[var(--color-text-secondary)] capitalize">{skill}</span>
            {delta > 0
              ? <span className="text-sm font-mono font-semibold text-green-600">+{delta} level</span>
              : <span className="text-xs text-[var(--color-muted-fg)]">No change</span>}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 py-2.5 border border-[var(--color-border)] rounded-xl text-sm font-medium hover:bg-[var(--color-muted)] transition-colors">
          Back to Assessments
        </button>
        <button onClick={() => navigate("/learning-path")} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--color-blue-primary)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--color-blue-light)] transition-colors">
          View Learning Path
        </button>
      </div>
    </div>
  );
}

export default function AssessmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<(Assessment & { questions: Question[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    if (!id) return;
    assessmentApi.getAssessmentById(id).then(setAssessment).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-7 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!assessment) return null;

  if (result) {
    return <ResultView result={result} onBack={() => navigate("/assessments")} />;
  }

  if (assessment.status === "completed") {
    return (
      <div className="p-5 lg:p-7 max-w-2xl mx-auto space-y-5">
        <button onClick={() => navigate("/assessments")} className="flex items-center gap-1.5 text-sm text-[var(--color-muted-fg)] hover:text-[var(--color-text)]">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="bg-[var(--color-success-bg)] border border-[var(--color-success-fg)]/30 rounded-2xl p-6 text-center">
          <CheckCircle size={32} className="text-[var(--color-success-fg)] mx-auto mb-3" />
          <div className="text-3xl font-bold font-mono text-[var(--color-success-fg)]">{assessment.score}%</div>
          <div className="text-sm text-[var(--color-success-fg)] mt-1">{assessment.title}</div>
          <div className="text-xs text-[var(--color-success-fg)] mt-1">Completed {assessment.completedAt}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 px-5 lg:px-7 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <button onClick={() => navigate("/assessments")} className="flex items-center gap-1.5 text-sm text-[var(--color-muted-fg)] hover:text-[var(--color-text)]">
          <ArrowLeft size={14} /> Assessments
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--color-text)] truncate">{assessment.title}</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <QuizView
          assessment={assessment}
          questions={assessment.questions}
          onComplete={setResult}
        />
      </div>
    </div>
  );
}
