import { DEMO_ASSESSMENTS, DEMO_ASSESSMENT_QUESTIONS } from "../data/mockData";
import type { Assessment, Question, AssessmentResult } from "../types";

export const assessmentApi = {
  async getAssessments(): Promise<Assessment[]> {
    await new Promise((r) => setTimeout(r, 600));
    return [...DEMO_ASSESSMENTS];
  },

  async getAssessmentById(id: string): Promise<Assessment & { questions: Question[] }> {
    await new Promise((r) => setTimeout(r, 500));
    const assessment = DEMO_ASSESSMENTS.find((a) => a.id === id);
    if (!assessment) throw new Error("Assessment not found");
    return { ...assessment, questions: DEMO_ASSESSMENT_QUESTIONS };
  },

  async submitAssessment(id: string, answers: Record<string, number>): Promise<AssessmentResult> {
    await new Promise((r) => setTimeout(r, 1200));
    const correctCount = Object.entries(answers).filter(([qId, ans]) => {
      const q = DEMO_ASSESSMENT_QUESTIONS.find((q) => q.id === qId);
      return q?.correctIndex === ans;
    }).length;
    const total = Object.keys(answers).length;
    const score = Math.round((correctCount / total) * 100);
    return {
      assessmentId: id,
      score,
      totalQuestions: total,
      correctAnswers: correctCount,
      timeTaken: 18,
      skillBreakdown: { Python: score, Pandas: score - 5 },
      competencyUpdates: { python: score > 70 ? 1 : 0 },
      feedback: score >= 80
        ? "Excellent performance! Your Python and Pandas skills are progressing well."
        : "Good attempt. Focus on DataFrame operations and GroupBy methods for improvement.",
    };
  },
};
