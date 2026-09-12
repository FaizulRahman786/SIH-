import { DEMO_ASSESSMENTS, DEMO_ASSESSMENT_QUESTIONS } from "../data/mockData";
import type { Assessment, Question, AssessmentResult } from "../types";
import { competencyApi } from "./competencyApi";

export const assessmentApi = {
  async getAssessments(): Promise<Assessment[]> {
    await new Promise((r) => setTimeout(r, 400));
    return [...DEMO_ASSESSMENTS];
  },

  async getAssessmentById(id: string): Promise<Assessment & { questions: Question[] }> {
    await new Promise((r) => setTimeout(r, 400));
    const assessment = DEMO_ASSESSMENTS.find((a) => a.id === id);
    if (!assessment) throw new Error("Assessment not found");
    return { ...assessment, questions: DEMO_ASSESSMENT_QUESTIONS };
  },

  async submitAssessment(id: string, answers: Record<string, number>): Promise<AssessmentResult> {
    await new Promise((r) => setTimeout(r, 800));
    const total = Math.max(1, Object.keys(answers).length);
    const correctCount = Object.entries(answers).filter(([qId, ans]) => {
      const q = DEMO_ASSESSMENT_QUESTIONS.find((q) => q.id === qId);
      return q?.correctIndex === ans;
    }).length;
    const score = Math.round((correctCount / total) * 100);
    const passed = score >= 60;
    const delta = passed ? 1 : 0;

    if (delta > 0) {
      competencyApi.applyCompetencyIncrement("python", delta);
    }

    return {
      assessmentId: id,
      score,
      totalQuestions: total,
      correctAnswers: correctCount,
      timeTaken: 12,
      skillBreakdown: { Python: score, Pandas: Math.max(40, score - 5) },
      competencyUpdates: { python: delta },
      feedback: passed
        ? "Assessment Passed! Verified Python & Pandas competency advancement (+1 Level recorded in your Competency Digital Twin)."
        : "Good attempt. Score threshold of 60% not reached for competency advancement. Review DataFrame indexing and retry.",
    };
  },
};
