/**
 * adminApi.ts — Service abstraction for the SkillSaarthi AI Admin Portal.
 *
 * Provides typed methods for workforce capability analytics, employee directory,
 * skill gap distributions, and training demand forecasting.
 *
 * NOTE: Currently returns mock government administrative datasets (MoSPI / Public Admin).
 * Replace mock returns with fetch / axios calls to /api/v1/admin/* once backend is integrated.
 */

export interface AdminWorkforceKPIs {
  totalEmployees: number;
  averageCompetencyScore: number;
  activeLearners: number;
  criticalSkillGaps: number;
  trainingDemandIndex: number;
  assessmentPassRate: number;
}

export interface AdminEmployee {
  id: number;
  name: string;
  designation: string;
  department: string;
  role: string;
  score: number;
  gaps: string[];
  learning: "Active" | "Review" | "Not started";
  lastAssessment: string;
  email: string;
}

export interface AdminSkillGap {
  id: string;
  skill: string;
  domain: string;
  department: string;
  role: string;
  current: number;
  required: number;
  priority: number;
  affectedEmployees: number;
  recommendedCourse: string;
}

export interface AdminDepartmentScore {
  name: string;
  score: number;
  employeeCount: number;
  topGap: string;
}

export interface AdminTrainingDemandItem {
  id: string;
  courseTitle: string;
  domain: string;
  demandCount: number;
  priority: "High" | "Medium" | "Urgent";
  targetDepartment: string;
  provider: "iGOT" | "NSSTA" | "In-house";
}

const MOCK_WORKFORCE_KPIS: AdminWorkforceKPIs = {
  totalEmployees: 48,
  averageCompetencyScore: 3.7,
  activeLearners: 34,
  criticalSkillGaps: 12,
  trainingDemandIndex: 78,
  assessmentPassRate: 86,
};

const MOCK_ADMIN_EMPLOYEES: AdminEmployee[] = [
  { id: 1, name: "Ananya Sharma", designation: "Senior Data Analyst", department: "Finance", role: "Analyst", score: 4.6, gaps: ["Technical"], learning: "Active", lastAssessment: "02 Sep 2026", email: "ananya.sharma@mospi.gov.in" },
  { id: 2, name: "Vikram Patel", designation: "Policy Officer", department: "Governance", role: "Officer", score: 3.8, gaps: ["Digital Governance"], learning: "Review", lastAssessment: "28 Aug 2026", email: "vikram.patel@mospi.gov.in" },
  { id: 3, name: "Zeenat Zahra", designation: "Programme Lead", department: "HR", role: "Manager", score: 4.2, gaps: ["Managerial"], learning: "Active", lastAssessment: "25 Aug 2026", email: "zeenat.zahra@mospi.gov.in" },
  { id: 4, name: "Rohan Das", designation: "Field Coordinator", department: "Field Ops", role: "Coordinator", score: 2.9, gaps: ["Technical", "Digital"], learning: "Review", lastAssessment: "19 Aug 2026", email: "rohan.das@mospi.gov.in" },
  { id: 5, name: "Ishita Menon", designation: "Technology Specialist", department: "IT", role: "Specialist", score: 4.4, gaps: ["Managerial"], learning: "Active", lastAssessment: "16 Aug 2026", email: "ishita.menon@mospi.gov.in" },
  { id: 6, name: "Arjun Singh", designation: "Operations Manager", department: "Field Ops", role: "Manager", score: 3.4, gaps: ["Statistical", "Technical"], learning: "Not started", lastAssessment: "11 Aug 2026", email: "arjun.singh@mospi.gov.in" },
  { id: 7, name: "Kavita Rao", designation: "Data Analyst", department: "Finance", role: "Analyst", score: 3.9, gaps: ["Statistical"], learning: "Active", lastAssessment: "08 Aug 2026", email: "kavita.rao@mospi.gov.in" },
  { id: 8, name: "Nikhil Verma", designation: "Policy Officer", department: "Governance", role: "Officer", score: 3.5, gaps: ["Digital Governance", "Technical"], learning: "Review", lastAssessment: "04 Aug 2026", email: "nikhil.verma@mospi.gov.in" },
];

const MOCK_SKILL_GAPS: AdminSkillGap[] = [
  { id: "gap-1", skill: "Machine Learning", domain: "Technical", department: "IT", role: "Technology Specialist", current: 1.8, required: 4.8, priority: 92, affectedEmployees: 14, recommendedCourse: "Applied ML for Data Science" },
  { id: "gap-2", skill: "Python for Data Analysis", domain: "Technical", department: "Finance", role: "Data Analyst", current: 2.2, required: 4.7, priority: 89, affectedEmployees: 22, recommendedCourse: "Python for Data Analysis (iGOT)" },
  { id: "gap-3", skill: "GIS & Spatial Analytics", domain: "Technical", department: "Field Ops", role: "Field Coordinator", current: 2.4, required: 4.6, priority: 84, affectedEmployees: 11, recommendedCourse: "Spatial Analysis & Mapping" },
  { id: "gap-4", skill: "Digital Governance & Privacy", domain: "Digital Governance", department: "Governance", role: "Policy Officer", current: 2.7, required: 4.5, priority: 86, affectedEmployees: 18, recommendedCourse: "Public Sector Data Policy" },
  { id: "gap-5", skill: "Official Statistics Methodology", domain: "Statistical", department: "Finance", role: "Data Analyst", current: 3.1, required: 4.6, priority: 78, affectedEmployees: 9, recommendedCourse: "NSSTA Statistical Sampling" },
];

export const adminApi = {
  async getWorkforceKPIs(): Promise<AdminWorkforceKPIs> {
    await new Promise((r) => setTimeout(r, 300));
    return { ...MOCK_WORKFORCE_KPIS };
  },

  async getEmployees(): Promise<AdminEmployee[]> {
    await new Promise((r) => setTimeout(r, 400));
    return [...MOCK_ADMIN_EMPLOYEES];
  },

  async getSkillGaps(): Promise<AdminSkillGap[]> {
    await new Promise((r) => setTimeout(r, 350));
    return [...MOCK_SKILL_GAPS];
  },

  async assignTraining(employeeIds: number[], courseTitle: string): Promise<{ success: boolean; message: string }> {
    await new Promise((r) => setTimeout(r, 500));
    return {
      success: true,
      message: `Successfully assigned "${courseTitle}" to ${employeeIds.length} employee(s). Notifications dispatched via iGOT.`,
    };
  },

  async flagPriorityGap(gapId: string, note: string): Promise<{ success: boolean; message: string }> {
    await new Promise((r) => setTimeout(r, 400));
    return {
      success: true,
      message: `Gap ${gapId} marked for executive review with note: "${note}".`,
    };
  },
};
