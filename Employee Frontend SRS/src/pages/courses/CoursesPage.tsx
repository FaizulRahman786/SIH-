import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Clock, Star, Users, ArrowRight, BookOpen } from "lucide-react";
import { courseApi } from "../../services/courseApi";
import type { Course, CourseLevel, SkillDomain } from "../../types";
import { Badge } from "../../components/common/Badge";
import { Skeleton } from "../../components/common/Skeleton";
import { EmptyState } from "../../components/common/EmptyState";

const STATUS_VARIANT: Record<string, "success" | "info" | "default"> = {
  completed: "success",
  in_progress: "info",
  recommended: "default",
};

const PROVIDERS = ["All", "iGOT", "NSSTA", "TPAC", "Coursera", "NPTEL"];
const LEVELS: Array<CourseLevel | "all"> = ["all", "beginner", "intermediate", "advanced"];

function CourseCard({ course, index }: { course: Course; index: number }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/courses/${course.id}`)}
      className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 text-left hover:border-[var(--color-blue-primary)] hover:shadow-[var(--shadow-lg)] transition-all duration-200 animate-fade-in-up group flex flex-col h-full"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-blue-muted)] flex items-center justify-center flex-shrink-0">
          <BookOpen size={18} className="text-[var(--color-blue-primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono text-[var(--color-muted-fg)] uppercase">{course.provider}</span>
            {course.matchPercentage >= 90 && (
              <span className="text-[10px] font-mono bg-[var(--color-blue-muted)] text-[var(--color-blue-primary)] px-1.5 py-0.5 rounded font-medium">
                {course.matchPercentage}% match
              </span>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-[var(--color-text)] mb-1 leading-snug flex-1" style={{ fontFamily: "var(--font-display)" }}>
        {course.title}
      </h3>

      <div className="flex items-center gap-3 text-[11px] text-[var(--color-muted-fg)] mt-2 mb-3">
        <div className="flex items-center gap-1"><Clock size={11} />{course.durationHours}h</div>
        {course.rating && <div className="flex items-center gap-1"><Star size={11} className="text-amber-400" />{course.rating}</div>}
        {course.enrolledCount && <div className="flex items-center gap-1"><Users size={11} />{course.enrolledCount.toLocaleString()}</div>}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {course.skills.slice(0, 3).map((s) => (
          <span key={s} className="text-[10px] bg-[var(--color-muted)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full">{s}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
        <Badge
          label={course.status === "not_started" ? "Available" : course.status.replace("_", " ")}
          variant={STATUS_VARIANT[course.status] ?? "default"}
        />
        {course.status === "in_progress" && course.progress !== undefined && (
          <div className="flex items-center gap-2">
            <div className="h-1 w-16 bg-[var(--color-muted)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-blue-primary)] rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
            <span className="text-[10px] font-mono text-[var(--color-muted-fg)]">{course.progress}%</span>
          </div>
        )}
        <ArrowRight size={14} className="text-[var(--color-muted-fg)] group-hover:text-[var(--color-blue-primary)] group-hover:translate-x-0.5 transition-all" />
      </div>
    </button>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("All");
  const [level, setLevel] = useState<CourseLevel | "all">("all");

  useEffect(() => {
    courseApi.getCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchProvider = provider === "All" || c.provider === provider;
    const matchLevel = level === "all" || c.level === level;
    return matchSearch && matchProvider && matchLevel;
  });

  return (
    <div className="p-5 lg:p-7 max-w-7xl mx-auto space-y-5">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
          Course Catalogue
        </h1>
        <p className="text-sm text-[var(--color-muted-fg)] mt-0.5">
          AI-recommended courses personalised to your skill gaps.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted-fg)]" />
          <input
            type="search"
            placeholder="Search courses or skills…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter size={14} className="text-[var(--color-muted-fg)]" />
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="px-3 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]"
          >
            {PROVIDERS.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as CourseLevel | "all")}
            className="px-3 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)]"
          >
            {LEVELS.map((l) => <option key={l} value={l}>{l === "all" ? "All Levels" : l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-[var(--color-muted-fg)] font-mono">
        {loading ? "Loading…" : `${filtered.length} courses found`}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-52" />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description="Try adjusting your filters or search term."
          action={{ label: "Clear filters", onClick: () => { setSearch(""); setProvider("All"); setLevel("all"); } }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course, i) => <CourseCard key={course.id} course={course} index={i} />)}
        </div>
      )}
    </div>
  );
}
