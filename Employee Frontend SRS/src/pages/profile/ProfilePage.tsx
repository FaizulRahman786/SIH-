import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Briefcase, GraduationCap, Target, ChevronRight,
  Award, Clock, BarChart3,
} from "lucide-react";
import { profileApi } from "../../services/profileApi";
import type { EmployeeProfile } from "../../types";
import { COMPETENCY_LABELS } from "../../types";
import { ProgressRing } from "../../components/common/ProgressRing";
import { Skeleton } from "../../components/common/Skeleton";
import { DEMO_USER } from "../../data/mockData";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileApi.getProfile().then(setProfile).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-5 lg:p-7 max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const initials = DEMO_USER.name.split(" ").map((n) => n[0]).join("");
  const topSkills = [...profile.skills].sort((a, b) => b.selfRating - a.selfRating).slice(0, 3);

  return (
    <div className="p-5 lg:p-7 max-w-3xl mx-auto space-y-5">
      {/* Hero card */}
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden animate-fade-in shadow-[var(--shadow)]">
        <div className="h-24 bg-gradient-to-r from-[var(--color-navy-900)] to-[var(--color-navy-700)]" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-blue-primary)] flex items-center justify-center text-white text-xl font-bold border-4 border-[var(--color-border)]">
              {initials}
            </div>
            <button
              onClick={() => navigate("/assessments")}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] transition-colors"
            >
              <BarChart3 size={12} /> Update Assessment
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              {DEMO_USER.name}
            </h1>
            <div className="text-sm text-[var(--color-muted-fg)] mt-0.5">{profile.designation} · {profile.department}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock size={12} className="text-[var(--color-muted-fg)]" />
              <span className="text-xs text-[var(--color-muted-fg)]">{profile.experience} years experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 flex flex-col items-center text-center">
          <ProgressRing value={profile.overallCompetency} size={72} strokeWidth={7} label={`${profile.overallCompetency}%`} />
          <div className="text-xs text-[var(--color-muted-fg)] mt-2">Competency</div>
        </div>
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 text-center">
          <div className="text-2xl font-bold font-mono text-[var(--color-text)]">{profile.previousTrainings.length}</div>
          <div className="text-xs text-[var(--color-muted-fg)] mt-1">Trainings</div>
        </div>
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 text-center">
          <div className="text-2xl font-bold font-mono text-[var(--color-text)]">{profile.education.length}</div>
          <div className="text-xs text-[var(--color-muted-fg)] mt-1">Qualifications</div>
        </div>
      </div>

      {/* Professional info */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={15} className="text-[var(--color-blue-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>Professional Information</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Designation", value: profile.designation },
            { label: "Job Role", value: profile.jobRole },
            { label: "Department", value: profile.department },
            { label: "Assignment", value: profile.currentAssignment },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-[10px] font-mono text-[var(--color-muted-fg)] uppercase tracking-wider mb-0.5">{label}</div>
              <div className="text-sm text-[var(--color-text)]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Career goal */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-3">
          <Target size={15} className="text-[var(--color-blue-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>Career Goal</h2>
        </div>
        <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-2">{profile.careerGoal}</div>
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-muted-fg)]">Target role:</span>
          <span className="text-xs font-semibold text-[var(--color-blue-primary)] bg-[var(--color-blue-muted)] px-2 py-0.5 rounded">
            {profile.targetRole}
          </span>
        </div>
      </div>

      {/* Target Role Readiness */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={15} className="text-[var(--color-blue-primary)]" />
            <h2 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              Target Role Readiness · {profile.targetRole}
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[var(--color-muted-fg)]">Overall Readiness:</span>
            <span className="text-sm font-mono font-bold text-[var(--color-blue-primary)] bg-[var(--color-blue-muted)] px-2 py-0.5 rounded">
              68%
            </span>
          </div>
        </div>

        <p className="text-xs text-[var(--color-muted-fg)] mb-4">
          Deterministic capability matching score against MoSPI Senior Data Analyst role competency requirements.
        </p>

        <div className="space-y-2.5">
          {[
            { skill: "Statistics & Sampling", score: 86, color: "var(--color-blue-primary)" },
            { skill: "SQL & Relational Databases", score: 74, color: "var(--color-blue-primary)" },
            { skill: "Python & Scientific Computing", score: 52, color: "var(--color-warning-fg)" },
            { skill: "Cloud Platforms (MeghRaj)", score: 42, color: "var(--color-warning-fg)" },
            { skill: "Machine Learning / Predictive Modeling", score: 31, color: "var(--color-critical-fg)" },
          ].map((item) => (
            <div key={item.skill}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--color-text-secondary)]">{item.skill}</span>
                <span className="font-mono font-semibold text-[var(--color-text)]">{item.score}%</span>
              </div>
              <div className="h-1.5 bg-[var(--color-muted)] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top skills */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <User size={15} className="text-[var(--color-blue-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>Skills Self-Assessment</h2>
        </div>
        <div className="space-y-3">
          {topSkills.map((skill) => (
            <div key={skill.skillId}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[var(--color-text-secondary)]">{skill.skillName}</span>
                <span className="font-mono text-[var(--color-text)]">{COMPETENCY_LABELS[skill.selfRating as 0|1|2|3|4|5]} ({skill.selfRating}/5)</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((l) => (
                  <div key={l} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: l <= skill.selfRating ? "var(--color-blue-primary)" : "var(--color-muted)" }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/competencies")} className="mt-4 flex items-center gap-1.5 text-xs text-[var(--color-blue-primary)] font-medium hover:underline">
          Full competency profile <ChevronRight size={12} />
        </button>
      </div>

      {/* Education */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={15} className="text-[var(--color-blue-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>Education</h2>
        </div>
        <div className="space-y-3">
          {profile.education.map((edu, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-muted)] flex items-center justify-center flex-shrink-0">
                <GraduationCap size={14} className="text-[var(--color-blue-primary)]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text)]">{edu.degree}</div>
                <div className="text-xs text-[var(--color-muted-fg)]">{edu.institution} · {edu.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trainings */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <Award size={15} className="text-[var(--color-blue-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>Previous Training</h2>
        </div>
        <div className="space-y-3">
          {profile.previousTrainings.map((t, i) => (
            <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-[var(--color-border)] last:border-0">
              <div>
                <div className="text-sm font-medium text-[var(--color-text)]">{t.name}</div>
                <div className="text-xs text-[var(--color-muted-fg)]">{t.provider} · {t.duration}</div>
              </div>
              <div className="text-xs font-mono text-[var(--color-muted-fg)] flex-shrink-0">{t.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
