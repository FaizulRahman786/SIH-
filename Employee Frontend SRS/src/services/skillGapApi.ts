import { DEMO_SKILL_GAPS } from "../data/mockData";
import type { SkillGap } from "../types";

export const skillGapApi = {
  async getSkillGaps(): Promise<SkillGap[]> {
    await new Promise((r) => setTimeout(r, 600));
    return [...DEMO_SKILL_GAPS];
  },
};
