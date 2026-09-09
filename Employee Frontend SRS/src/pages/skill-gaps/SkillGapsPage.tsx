import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  TrendingUp,
  Target,
  Filter,
} from "lucide-react";
import { skillGapApi } from "../../services/skillGapApi";
import {
  COMPETENCY_LABELS,
  DOMAIN_LABELS,
  type SkillGap,
  type GapPriority,
  type SkillDomain,
} from "../../types";
import { Badge } from "../../components/common/Badge";
import { Skeleton } from "../../components/common/Skeleton";
import { ErrorState } from "../../components/common/ErrorState";

export default function SkillGapsPage() {
  const navigate = useNavigate();
  const [gaps, setGaps] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<"all" | GapPriority>("all");
  const [domainFilter, setDomainFilter] = useState<"all" | SkillDomain>("all");

  useEffect(() => {
    skillGapApi
      .getSkillGaps()
      .then(setGaps)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const criticalCount = gaps.filter((g) => g.priority === "critical").length;
  const highCount = gaps.filter((g) => g.priority === "high").length;
  const avgGap = gaps.length
    ? (gaps.reduce((acc, g) => acc + g.gap, 0) / gaps.length).toFixed(1)
    : "0";

  const filteredGaps = gaps.filter((g) => {
    const matchesPriority = priorityFilter === "all" || g.priority === priorityFilter;
    const matchesDomain = domainFilter === "all" || g.domain === domainFilter;
    return matchesPriority && matchesDomain;
  });

  return (
    <div className="p-5 lg:p-7 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1
            className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <AlertTriangle className="text-amber-500" size={22} />
            Skill Gaps Analysis
          </h1>
          <p className="text-sm text-[var(--color-muted-fg)] mt-0.5">
            Identify and prioritize the competency gaps standing between your current skills and your target role.
          </p>
        </div>

        <button
          onClick={() => navigate("/learning-path")}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-blue-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-blue-light)] transition-colors shadow-sm"
        >
          <Sparkles size={16} />
          <span>View Custom Learning Path</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-muted-fg)] font-mono uppercase tracking-wider">
              Total Gaps
            </span>
            <Target size={16} className="text-[var(--color-muted-fg)]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text)] mt-1">
            {loading ? <Skeleton className="h-8 w-12" /> : gaps.length}
          </div>
          <div className="text-xs text-[var(--color-muted-fg)] mt-1">Competencies to bridge</div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-critical-fg)]/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-critical-fg)] font-mono uppercase tracking-wider">
              Critical
            </span>
            <AlertTriangle size={16} className="text-[var(--color-critical-fg)]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-critical-fg)] mt-1">
            {loading ? <Skeleton className="h-8 w-12" /> : criticalCount}
          </div>
          <div className="text-xs text-[var(--color-muted-fg)] mt-1">Immediate role blockers</div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-warning-fg)]/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-warning-fg)] font-mono uppercase tracking-wider">
              High Priority
            </span>
            <TrendingUp size={16} className="text-[var(--color-warning-fg)]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-warning-fg)] mt-1">
            {loading ? <Skeleton className="h-8 w-12" /> : highCount}
          </div>
          <div className="text-xs text-[var(--color-muted-fg)] mt-1">Scheduled for next quarter</div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-muted-fg)] font-mono uppercase tracking-wider">
              Average Gap
            </span>
            <Sparkles size={16} className="text-[var(--color-blue-primary)]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text)] mt-1">
            {loading ? <Skeleton className="h-8 w-12" /> : `${avgGap} Levels`}
          </div>
          <div className="text-xs text-[var(--color-muted-fg)] mt-1">Across all assessed skills</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-3.5">
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-[var(--color-muted-fg)]" />
          <span className="text-xs font-semibold text-[var(--color-text)] uppercase font-mono tracking-wider">
            Filters:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority pills */}
          <div className="flex items-center gap-1 bg-[var(--color-muted)] p-1 rounded-lg">
            {(["all", "critical", "high", "medium", "low"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize transition-colors ${
                  priorityFilter === p
                    ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-xs font-semibold"
                    : "text-[var(--color-muted-fg)] hover:text-[var(--color-text)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Domain selector */}
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value as "all" | SkillDomain)}
            className="text-xs bg-[var(--color-muted)] border border-[var(--color-border)] text-[var(--color-text)] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--color-blue-primary)]"
          >
            <option value="all">All Domains</option>
            <option value="technical">Technical</option>
            <option value="statistical">Statistical</option>
            <option value="digital_governance">Digital Governance</option>
            <option value="behavioural">Behavioural</option>
          </select>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <ErrorState onRetry={() => window.location.reload()} />
      ) : filteredGaps.length === 0 ? (
        <div className="text-center py-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
          <Target size={40} className="mx-auto text-[var(--color-muted-fg)]/40 mb-3" />
          <h3 className="text-base font-semibold text-[var(--color-text)]">No skill gaps found</h3>
          <p className="text-xs text-[var(--color-muted-fg)] mt-1 max-w-sm mx-auto">
            All your skills currently match or exceed the selected filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGaps.map((gap, index) => {
            const pips = [1, 2, 3, 4, 5];
            return (
              <div
                key={gap.id}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] rounded-xl p-5 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Skill title & metadata */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2
                        className="text-base font-bold text-[var(--color-text)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {gap.skillName}
                      </h2>
                      <Badge label={gap.priority} variant={gap.priority} />
                      <span className="text-xs text-[var(--color-muted-fg)] bg-[var(--color-muted)] px-2 py-0.5 rounded font-mono">
                        {DOMAIN_LABELS[gap.domain]}
                      </span>
                    </div>

                    <div className="text-xs text-[var(--color-muted-fg)] flex items-center gap-4">
                      <span>
                        Current: <strong className="text-[var(--color-text)]">{COMPETENCY_LABELS[gap.currentLevel]}</strong> ({gap.currentLevel}/5)
                      </span>
                      <span>•</span>
                      <span>
                        Target: <strong className="text-[var(--color-text)]">{COMPETENCY_LABELS[gap.requiredLevel]}</strong> ({gap.requiredLevel}/5)
                      </span>
                      <span>•</span>
                      <span className="text-[var(--color-critical-fg)] font-semibold font-mono">
                        Deficit: +{gap.gap} {gap.gap === 1 ? "level" : "levels"}
                      </span>
                    </div>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="flex flex-col items-start lg:items-end gap-1.5 flex-shrink-0">
                    <div className="text-[10px] uppercase tracking-wider font-mono text-[var(--color-muted-fg)]">
                      Proficiency Level
                    </div>
                    <div className="flex items-center gap-1.5">
                      {pips.map((lvl) => {
                        const isFilled = lvl <= gap.currentLevel;
                        const isTarget = lvl <= gap.requiredLevel && lvl > gap.currentLevel;
                        return (
                          <div
                            key={lvl}
                            className="h-2.5 w-7 rounded-full transition-all"
                            style={{
                              backgroundColor: isFilled
                                ? "var(--color-blue-primary)"
                                : isTarget
                                ? "var(--color-warning-fg)"
                                : "var(--color-muted)",
                              opacity: isTarget ? 0.35 : 1,
                            }}
                            title={`Level ${lvl}: ${COMPETENCY_LABELS[lvl as keyof typeof COMPETENCY_LABELS]}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* AI Reasoning and Impact */}
                <div className="mt-4 pt-4 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[var(--color-muted)]/60 rounded-lg p-3">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted-fg)] mb-1 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[var(--color-blue-primary)]" />
                      Why it matters
                    </div>
                    <p className="text-xs text-[var(--color-text)] leading-relaxed">
                      {gap.whyItMatters}
                    </p>
                  </div>

                  <div className="bg-[var(--color-muted)]/60 rounded-lg p-3">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted-fg)] mb-1 flex items-center gap-1.5">
                      <Target size={12} className="text-emerald-500" />
                      Impact on Career & Role
                    </div>
                    <p className="text-xs text-[var(--color-text)] leading-relaxed">
                      {gap.impact}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-[var(--color-muted-fg)]">
                    {gap.recommendedCourseIds.length > 0 && (
                      <span className="flex items-center gap-1.5 font-medium">
                        <BookOpen size={14} className="text-[var(--color-blue-primary)]" />
                        {gap.recommendedCourseIds.length} recommended learning modules available
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate("/courses")}
                      className="px-3 py-1.5 text-xs font-medium border border-[var(--color-border)] hover:bg-[var(--color-muted)] text-[var(--color-text)] rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <BookOpen size={13} />
                      Browse Courses
                    </button>
                    <button
                      onClick={() => navigate("/learning-path")}
                      className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-blue-primary)] text-white hover:bg-[var(--color-blue-light)] rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      Start Bridge Plan
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
