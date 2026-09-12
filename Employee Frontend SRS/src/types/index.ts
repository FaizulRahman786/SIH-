// ─── Role types ───────────────────────────────────────────────────────────────
export type UserRole = "employee" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

// ─── Auth API contract (future backend shapes) ────────────────────────────────
// POST /auth/login  →  LoginResponse
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  role: UserRole;
  /** When true, route to /admin-verify for second-stage verification */
  requiresAdminVerification: boolean;
}

// POST /auth/admin/verify  →  AdminVerifyResponse
// DEMO: frontend mock only — real verification must be backend-controlled
export interface AdminVerifyRequest {
  email: string;
  password: string;
  /** Never validated in frontend JS — passed to backend only */
  adminSecretCode: string;
}

export interface AdminVerifyResponse {
  authenticated: boolean;
  user: User;
  role: UserRole;
}

export interface EmployeeProfile {
  userId: string;
  designation: string;
  department: string;
  jobRole: string;
  currentAssignment: string;
  education: Education[];
  experience: number;
  previousTrainings: Training[];
  careerGoal: string;
  targetRole: string;
  skills: SkillSelfRating[];
  overallCompetency: number;
  onboardingComplete: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
  field: string;
}

export interface Training {
  name: string;
  provider: string;
  year: number;
  duration: string;
}

export interface SkillSelfRating {
  skillId: string;
  skillName: string;
  selfRating: number;
}

export type CompetencyLevel = 0 | 1 | 2 | 3 | 4 | 5;

export const COMPETENCY_LABELS: Record<CompetencyLevel, string> = {
  0: "No Knowledge",
  1: "Awareness",
  2: "Beginner",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export type SkillDomain =
  | "statistical"
  | "technical"
  | "digital_governance"
  | "behavioural";

export const DOMAIN_LABELS: Record<SkillDomain, string> = {
  statistical: "Statistical Skills",
  technical: "Technical Skills",
  digital_governance: "Digital Governance",
  behavioural: "Behavioural & Managerial",
};

export interface Skill {
  id: string;
  name: string;
  domain: SkillDomain;
  description: string;
}

export interface Competency {
  skillId: string;
  skillName: string;
  domain: SkillDomain;
  currentLevel: CompetencyLevel;
  requiredLevel: CompetencyLevel;
  gap: number;
  evidence: string[];
  trend: "up" | "down" | "stable";
  lastAssessed: string;
}

export type GapPriority = "critical" | "high" | "medium" | "low";

export interface SkillGap {
  id: string;
  skillId: string;
  skillName: string;
  domain: SkillDomain;
  currentLevel: CompetencyLevel;
  requiredLevel: CompetencyLevel;
  gap: number;
  priority: GapPriority;
  whyItMatters: string;
  recommendedCourseIds: string[];
  impact: string;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseProvider = "iGOT" | "NSSTA" | "TPAC" | "Coursera" | "NPTEL";
export type CourseStatus = "not_started" | "in_progress" | "completed" | "recommended" | "locked" | "available";

export interface Course {
  id: string;
  title: string;
  provider: CourseProvider;
  level: CourseLevel;
  domain: SkillDomain;
  durationHours: number;
  description: string;
  skills: string[];
  matchPercentage: number;
  status: CourseStatus;
  progress?: number;
  enrolledCount?: number;
  rating?: number;
  aiReason?: string;
  skillImpact?: Record<string, number>;
}

export type StepStatus = "locked" | "available" | "in_progress" | "completed";

export interface LearningPathStep {
  id: string;
  order: number;
  courseId: string;
  title: string;
  provider: CourseProvider;
  durationHours: number;
  level: CourseLevel;
  skillImpact: string[];
  matchPercentage: number;
  status: StepStatus;
  prerequisites: string[];
  description: string;
}

export interface LearningPath {
  id: string;
  targetRole: string;
  totalSteps: number;
  completedSteps: number;
  estimatedHours: number;
  steps: LearningPathStep[];
}

export type AssessmentStatus = "pending" | "in_progress" | "completed" | "failed";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  difficulty: QuestionDifficulty;
  relatedSkill: string;
  explanation: string;
  flagged?: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  documentId?: string;
  skills: string[];
  questionCount: number;
  durationMinutes: number;
  status: AssessmentStatus;
  score?: number;
  completedAt?: string;
  createdAt: string;
  questions?: Question[];
}

export interface AssessmentResult {
  assessmentId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  skillBreakdown: Record<string, number>;
  competencyUpdates: Record<string, number>;
  feedback: string;
}

export type DocumentStatus =
  | "uploading"
  | "extracting"
  | "understanding"
  | "generating"
  | "ready"
  | "failed";

export interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "pptx" | "txt";
  size: number;
  status: DocumentStatus;
  uploadedAt: string;
  assessmentId?: string;
  pageCount?: number;
  topics?: string[];
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: AISource[];
  recommendations?: string[];
  nextActions?: string[];
}

export interface AISource {
  title: string;
  type: "course" | "document" | "assessment" | "profile";
  id: string;
}

export interface AIInsight {
  id: string;
  type: "gap" | "achievement" | "recommendation" | "trend";
  title: string;
  body: string;
  action?: string;
  actionRoute?: string;
  priority: "high" | "medium" | "low";
  generatedAt: string;
}

export interface DashboardStats {
  overallCompetency: number;
  criticalGaps: number;
  learningHours: number;
  completedCourses: number;
  assessmentsTaken: number;
  lastActivityDate: string;
}
