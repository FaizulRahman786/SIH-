import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Clock, Star, Users, Zap, TrendingUp, ArrowRight, BookOpen } from "lucide-react";
import { courseApi } from "../../services/courseApi";
import type { Course } from "../../types";
import { Badge } from "../../components/common/Badge";
import { Skeleton } from "../../components/common/Skeleton";
import { ErrorState } from "../../components/common/ErrorState";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!id) return;
    courseApi.getCourseById(id)
      .then(setCourse)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!course) return;
    setEnrolling(true);
    const updated = await courseApi.enrollCourse(course.id);
    setCourse(updated);
    setEnrolling(false);
  };

  if (loading) {
    return (
      <div className="p-5 lg:p-7 max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-7">
        <ErrorState title="Course not found" description="This course could not be loaded." onRetry={() => navigate("/courses")} />
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-7 max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/courses")}
        className="flex items-center gap-1.5 text-sm text-[var(--color-muted-fg)] hover:text-[var(--color-text)] transition-colors"
      >
        <ArrowLeft size={14} /> Back to Courses
      </button>

      {/* Header */}
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-6 animate-fade-in">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-blue-muted)] flex items-center justify-center flex-shrink-0">
            <BookOpen size={22} className="text-[var(--color-blue-primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-mono text-[var(--color-muted-fg)] uppercase">{course.provider}</span>
              <span className="text-xs font-mono text-[var(--color-muted-fg)] capitalize">{course.level}</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm text-[var(--color-muted-fg)] mb-5">
          <div className="flex items-center gap-1.5"><Clock size={14} />{course.durationHours} hours</div>
          {course.rating && <div className="flex items-center gap-1.5"><Star size={14} className="text-amber-400" />{course.rating}</div>}
          {course.enrolledCount && <div className="flex items-center gap-1.5"><Users size={14} />{course.enrolledCount.toLocaleString()} enrolled</div>}
        </div>

        {course.status === "in_progress" && course.progress !== undefined && (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-[var(--color-muted-fg)] mb-1.5">
              <span>Your progress</span>
              <span className="font-mono font-semibold text-[var(--color-blue-primary)]">{course.progress}%</span>
            </div>
            <div className="h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-blue-primary)] rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {course.status === "not_started" || course.status === "recommended" ? (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-blue-primary)] text-white font-semibold rounded-xl hover:bg-[var(--color-blue-light)] transition-colors disabled:opacity-60"
          >
            {enrolling ? "Enrolling…" : "Enrol in this course"}
            <ArrowRight size={15} />
          </button>
        ) : course.status === "in_progress" ? (
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-blue-primary)] text-white font-semibold rounded-xl hover:bg-[var(--color-blue-light)] transition-colors">
            Continue learning <ArrowRight size={15} />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 bg-[var(--color-success-bg)] text-[var(--color-success-fg)] font-semibold rounded-xl border border-[var(--color-success-fg)]/30">
            Course completed ✓
          </div>
        )}
      </div>

      {/* AI Why */}
      {course.aiReason && (
        <div className="bg-[var(--color-navy-900)] rounded-xl p-5 text-white animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-[var(--color-sky)]" />
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Why AI recommended this</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">{course.aiReason}</p>
          {course.skillImpact && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(course.skillImpact).filter(([, v]) => v > 0).map(([skill, levels]) => (
                <div key={skill} className="flex items-center gap-2 bg-[var(--color-surface)]/8 rounded-lg px-3 py-2">
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-xs text-white/70">{skill}</span>
                  <span className="ml-auto text-xs font-mono text-green-400">+{levels}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
          About this course
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{course.description}</p>

        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <h3 className="text-xs font-semibold text-[var(--color-text)] mb-2">Skills you will develop</h3>
          <div className="flex flex-wrap gap-1.5">
            {course.skills.map((s) => (
              <Badge key={s} label={s} variant="info" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
