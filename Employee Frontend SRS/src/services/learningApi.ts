import { DEMO_LEARNING_PATH } from "../data/mockData";
import type { LearningPath } from "../types";

export const learningApi = {
  async getLearningPath(): Promise<LearningPath> {
    await new Promise((r) => setTimeout(r, 700));
    return { ...DEMO_LEARNING_PATH, steps: [...DEMO_LEARNING_PATH.steps] };
  },
};
