import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import { competencyApi } from "../../services/competencyApi";
import { COMPETENCY_LABELS, DOMAIN_LABELS, type Competency, type SkillDomain } from "../../types";
import { Badge } from "../../components/common/Badge";
import { Skeleton } from "../../components/common/Skeleton";
import { ErrorState } from "../../components/common/ErrorState";

const DOMAIN_ORDER: SkillDomain[] = ["technical", "statistical", "digital_governance", "behavioural"];

function TrendIcon({ trend }: { trend: Competency["trend"] }) {
  if (trend === "up") return <TrendingUp size={12} className="text-green-500" />;
  if (trend === "down") return <TrendingDown size={12} className="text-red-500" />;
  return <Minus size={12} className="text-[var(--color-muted-fg)]" />;
}

function SkillRow({ comp, index }: { comp: Competency; index: number }) {
  const [open, setOpen] = useState(false);
  const pips = [1, 2, 3, 4, 5];
  const gapVariant = comp.gap === 0 ? "success" : comp.gap >= 3 ? "critical" : comp.gap >= 2 ? "high" : "medium";

  return (
    <div
      className="border border-[var(--color-border)] rounded-xl overflow-hidden animate-fade-in-up bg-[var(--color-surface)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <button
        className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[var(--color-muted)] transition-colors text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-[var(--color-text)]">{comp.skillName}</span>
            <TrendIcon trend={comp.trend} />
            {comp.gap > 0 && <Badge label={`Gap: ${comp.gap}`} variant={gapVariant} />}
            {comp.gap === 0 && <Badge label="On target" variant="success" />}
          </div>
          <div className="flex items-center gap-1 mt-2">
            {pips.map((l) => (
              <div
                key={l}
                className="h-1.5 w-8 rounded-full transition-all duration-500"
                style={{
                  backgroundColor:
                    l <= comp.currentLevel ? "var(--color-blue-primary)" :
                    l <= comp.requiredLevel ? "var(--color-border-strong)" : "var(--color-muted)",
                  border: l > comp.currentLevel && l <= comp.requiredLevel ? "1px dashed var(--color-muted-fg)" : "none",
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-[var(--color-muted-fg)]">Current</div>
            <div className="text-sm font-mono font-semibold text-[var(--color-text)]">
              {comp.currentLevel}/5
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs text-[var(--color-muted-fg)]">Required</div>
            <div className="text-sm font-mono font-semibold text-[var(--color-text)]">
              {comp.requiredLevel}/5
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`text-[var(--color-muted-fg)] transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-[var(--color-border)] bg-[var(--color-muted)] animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
            <div>
              <div className="text-[10px] text-[var(--color-muted-fg)] font-mono uppercase tracking-wider">Current Level</div>
              <div className="text-sm font-semibold text-[var(--color-text)] mt-0.5">{COMPETENCY_LABELS[comp.currentLevel]}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-muted-fg)] font-mono uppercase tracking-wider">Required Level</div>
              <div className="text-sm font-semibold text-[var(--color-text)] mt-0.5">{COMPETENCY_LABELS[comp.requiredLevel]}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-muted-fg)] font-mono uppercase tracking-wider">Trend</div>
              <div className="flex items-center gap-1 mt-0.5"><TrendIcon trend={comp.trend} /><span className="text-sm font-medium text-[var(--color-text)] capitalize">{comp.trend}</span></div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-muted-fg)] font-mono uppercase tracking-wider">Last Assessed</div>
              <div className="text-sm font-medium text-[var(--color-text)] mt-0.5">{comp.lastAssessed}</div>
            </div>
          </div>
          {comp.evidence.length > 0 && (
            <div>
              <div className="text-[10px] text-[var(--color-muted-fg)] font-mono uppercase tracking-wider mb-1.5">Evidence</div>
              <div className="flex flex-wrap gap-1.5">
                {comp.evidence.map((e) => (
                  <span key={e} className="text-xs bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CompetenciesPage() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | SkillDomain>("all");

  useEffect(() => {
    competencyApi.getCompetencies()
      .then(setCompetencies)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === "all" ? competencies : competencies.filter((c) => c.domain === activeTab);

  const radarData = DOMAIN_ORDER.map((d) => {
    const skills = competencies.filter((c) => c.domain === d);
    const avgCurrent = skills.length ? Math.round(skills.reduce((a, c) => a + (c.currentLevel / 5) * 100, 0) / skills.length) : 0;
    const avgRequired = skills.length ? Math.round(skills.reduce((a, c) => a + (c.requiredLevel / 5) * 100, 0) / skills.length) : 0;
    return { subject: DOMAIN_LABELS[d].split(" ")[0], current: avgCurrent, target: avgRequired };
  });

  const barData = competencies
    .filter((c) => c.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 6)
    .map((c) => ({ name: c.skillName.length > 12 ? c.skillName.slice(0, 12) + "…" : c.skillName, gap: c.gap, current: c.currentLevel, required: c.requiredLevel }));

  const tabs: { key: "all" | SkillDomain; label: string }[] = [
    { key: "all", label: "All Skills" },
    { key: "technical", label: "Technical" },
    { key: "statistical", label: "Statistical" },
    { key: "digital_governance", label: "Digital Gov." },
    { key: "behavioural", label: "Behavioural" },
  ];

  return (
    <div className="p-5 lg:p-7 max-w-7xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
          Competency Profile
        </h1>
        <p className="text-sm text-[var(--color-muted-fg)] mt-0.5">
          Your current skills mapped against Senior Data Analyst requirements.
        </p>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Domain Overview
          </h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height={208}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--color-muted-fg)" }} />
                <Radar name="Target" dataKey="target" stroke="var(--color-border)" fill="var(--color-border)" fillOpacity={0.4} strokeDasharray="4 2" />
                <Radar name="Current" dataKey="current" stroke="var(--color-blue-primary)" fill="var(--color-blue-primary)" fillOpacity={0.15} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid var(--color-border)" }} formatter={(v) => `${v}%`} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Top Skill Gaps
          </h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height={208}>
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10, fill: "var(--color-muted-fg)" }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} width={80} />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid var(--color-border)" }}
                  formatter={(v, name) => [v, name === "current" ? "Current" : "Required"]}
                />
                <Bar dataKey="current" fill="var(--color-blue-primary)" radius={[0, 3, 3, 0]} name="current">
                  {barData.map((_, i) => <Cell key={i} fill="var(--color-blue-primary)" />)}
                </Bar>
                <Bar dataKey="required" fill="var(--color-border-strong)" radius={[0, 3, 3, 0]} name="required">
                  {barData.map((_, i) => <Cell key={i} fill="var(--color-border-strong)" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[var(--color-border)]">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
              activeTab === key
                ? "text-[var(--color-blue-primary)] border-b-2 border-[var(--color-blue-primary)] -mb-px"
                : "text-[var(--color-muted-fg)] hover:text-[var(--color-text)]"
            }`}
          >
            {label}
            {key !== "all" && (
              <span className="ml-1.5 text-[10px] font-mono text-[var(--color-muted-fg)]">
                ({competencies.filter((c) => c.domain === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Skills list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-16" />)}
        </div>
      ) : error ? (
        <ErrorState onRetry={() => window.location.reload()} />
      ) : (
        <div className="space-y-2">
          {filtered.map((comp, i) => (
            <SkillRow key={comp.skillId} comp={comp} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
