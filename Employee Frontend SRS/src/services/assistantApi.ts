import { DEMO_AI_MESSAGES, DEMO_PROFILE } from "../data/mockData";
import type { AIMessage } from "../types";

const CANNED_RESPONSES: Record<string, Omit<AIMessage, "id" | "role" | "timestamp">> = {
  default: {
    content: "That's a great question! Based on your competency profile as a Statistical Officer targeting Senior Data Analyst, I'd recommend focusing on your Machine Learning gap first. Your strong statistics background (4/5) gives you an excellent foundation to build on.\n\nWould you like me to suggest a specific study plan?",
    recommendations: ["Machine Learning Fundamentals on iGOT", "Python for Data Analysis (continue)", "Applied ML for Data Science"],
  },
  gap: {
    content: `Your biggest skill gap is **Machine Learning** — you're currently at Level 1 (Awareness) but need Level 4 (Advanced) for your target role of **${DEMO_PROFILE.targetRole}**.\n\nThe gap is 3 levels, but don't be discouraged. Here's why you have an advantage:\n\n• Your **Statistics score (4/5)** is the foundation of ML\n• Your **R skills (4/5)** mean you already understand data manipulation\n• Python (in progress) will complete your toolkit\n\n**Recommended path:** Python → ML Fundamentals → Applied ML → Senior Data Analyst`,
    recommendations: ["Python for Data Analysis", "Machine Learning Fundamentals", "Applied ML for Data Science"],
    nextActions: ["Resume Python course", "View Learning Path", "Schedule ML assessment"],
  },
  python: {
    content: "You're currently at **Python Level 2 (Beginner)** and need to reach **Level 4 (Advanced)**. You're 35% through the Python for Data Analysis course on iGOT.\n\n**Why Python matters for you:**\n• It's the primary language for Machine Learning\n• Pandas and NumPy will complement your R skills\n• Modern statistical workflows increasingly use Python pipelines\n\n**Next step:** Complete Module 2 covering Pandas GroupBy operations and data cleaning.",
    recommendations: ["Complete Python for Data Analysis", "Advanced Python: NumPy & Pandas"],
    nextActions: ["Resume Python course Module 2"],
  },
  plan: {
    content: "Here's your personalised **7-day learning sprint**:\n\n**Day 1-2:** Python for Data Analysis — Complete Modules 2 & 3 (Pandas & data cleaning)\n\n**Day 3:** Python for Data Analysis — Module 4 (EDA & visualisation)\n\n**Day 4-5:** Advanced SQL — Complete Module 1 (window functions & optimisation)\n\n**Day 6:** Review & practice with a sample dataset\n\n**Day 7:** Take the Python Assessment to validate progress\n\nEstimated: ~14 hours. At this pace, you'll unlock the ML pathway within 2 weeks.",
    nextActions: ["Start Day 1: Python Module 2", "Set daily learning reminder"],
  },
};

function getResponseKey(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("gap") || lower.includes("biggest") || lower.includes("improve")) return "gap";
  if (lower.includes("python")) return "python";
  if (lower.includes("plan") || lower.includes("7-day") || lower.includes("week")) return "plan";
  return "default";
}

export const assistantApi = {
  async getInitialMessages(): Promise<AIMessage[]> {
    await new Promise((r) => setTimeout(r, 400));
    return [...DEMO_AI_MESSAGES];
  },

  async sendMessage(userMessage: string): Promise<AIMessage> {
    await new Promise((r) => setTimeout(r, 1400));
    const key = getResponseKey(userMessage);
    const template = CANNED_RESPONSES[key] ?? CANNED_RESPONSES.default;
    return {
      id: `msg-${Date.now()}`,
      role: "assistant",
      timestamp: new Date().toISOString(),
      ...template,
    };
  },
};
