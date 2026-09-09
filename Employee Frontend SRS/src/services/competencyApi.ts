import { DEMO_COMPETENCIES, DEMO_DASHBOARD_STATS, DEMO_AI_INSIGHTS } from "../data/mockData";
import type { Competency, DashboardStats, AIInsight } from "../types";

export const competencyApi = {
  async getCompetencies(): Promise<Competency[]> {
    await new Promise((r) => setTimeout(r, 700));
    return [...DEMO_COMPETENCIES];
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((r) => setTimeout(r, 400));
    return { ...DEMO_DASHBOARD_STATS };
  },

  async getAIInsights(): Promise<AIInsight[]> {
    await new Promise((r) => setTimeout(r, 600));
    return [...DEMO_AI_INSIGHTS];
  },
};
