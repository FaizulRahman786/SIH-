import { DEMO_COMPETENCIES, DEMO_DASHBOARD_STATS, DEMO_AI_INSIGHTS } from "../data/mockData";
import type { Competency, DashboardStats, AIInsight, CompetencyLevel } from "../types";

const STORAGE_KEY = "skillsaarthi_competencies";

function loadCompetencies(): Competency[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback to demo
  }
  return [...DEMO_COMPETENCIES];
}

function persistCompetencies(comps: Competency[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comps));
  } catch {
    // ignore
  }
}

export const competencyApi = {
  async getCompetencies(): Promise<Competency[]> {
    await new Promise((r) => setTimeout(r, 400));
    return loadCompetencies();
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((r) => setTimeout(r, 300));
    const comps = loadCompetencies();
    const criticalGaps = comps.filter((c) => c.gap >= 2).length;
    const avgScore = Math.round(
      (comps.reduce((acc, c) => acc + c.currentLevel, 0) / (comps.length * 5)) * 100
    );
    return {
      ...DEMO_DASHBOARD_STATS,
      criticalGaps,
      overallCompetency: avgScore,
    };
  },

  async getAIInsights(): Promise<AIInsight[]> {
    await new Promise((r) => setTimeout(r, 300));
    return [...DEMO_AI_INSIGHTS];
  },

  applyCompetencyIncrement(skillId: string, delta: number): Competency[] {
    const comps = loadCompetencies();
    const updated: Competency[] = comps.map((c) => {
      if (c.skillId.toLowerCase() === skillId.toLowerCase()) {
        const newCurrent = Math.min(5, c.currentLevel + delta) as CompetencyLevel;
        const newGap = Math.max(0, c.requiredLevel - newCurrent);
        return {
          ...c,
          currentLevel: newCurrent,
          gap: newGap,
          trend: "up" as const,
          lastAssessed: new Date().toISOString().split("T")[0],
          evidence: Array.from(new Set([...c.evidence, "Assessment passed (verified +1 level)"])),
        };
      }
      return c;
    });
    persistCompetencies(updated);
    return updated;
  },

  resetCompetencies(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};

