import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import { AppShell } from "../layouts/AppShell";
import { AdminShell } from "../layouts/AdminShell";
import { ProtectedRoute } from "../layouts/ProtectedRoute";
import { RoleGuard } from "../layouts/RoleGuard";

// ─── Employee pages (eager) ───────────────────────────────────────────────────
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminVerifyPage from "../pages/auth/AdminVerifyPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProfilePage from "../pages/profile/ProfilePage";
import CompetenciesPage from "../pages/competencies/CompetenciesPage";
import SkillGapsPage from "../pages/skill-gaps/SkillGapsPage";
import LearningPathPage from "../pages/learning-path/LearningPathPage";
import CoursesPage from "../pages/courses/CoursesPage";
import CourseDetailPage from "../pages/courses/CourseDetailPage";
import AssessmentsPage from "../pages/assessments/AssessmentsPage";
import AssessmentDetailPage from "../pages/assessments/AssessmentDetailPage";
import DocumentsPage from "../pages/documents/DocumentsPage";
import AssistantPage from "../pages/assistant/AssistantPage";

// ─── Admin pages (lazy — only loaded when user is an admin) ───────────────────
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminEmployees = lazy(() => import("../pages/admin/employees/Employees"));
const AdminCompetencyAnalytics = lazy(() => import("../pages/admin/competency-analytics/CompetencyAnalytics"));
const AdminSkillGapDistribution = lazy(() => import("../pages/admin/skill-gap-distribution/SkillGapDistribution"));
const AdminTrainingDemand = lazy(() => import("../pages/admin/training-demand/TrainingDemand"));
const AdminCourseUtilization = lazy(() => import("../pages/admin/course-utilization/CourseUtilization"));
const AdminAssessments = lazy(() => import("../pages/admin/assessments/Assessments"));
const AdminDocuments = lazy(() => import("../pages/admin/documents/Documents"));
const AdminReports = lazy(() => import("../pages/admin/reports/Reports"));
const AdminNotifications = lazy(() => import("../pages/admin/notifications/Notifications"));
const AdminSettings = lazy(() => import("../pages/admin/settings/SystemSettings"));

// ─── Shared fallback for lazy-loaded admin routes ─────────────────────────────
function AdminFallback() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="w-6 h-6 border-2 border-[var(--color-blue-primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function SuspenseAdmin({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<AdminFallback />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  // ─── Public auth routes ────────────────────────────────────────────────────
  { path: "/login",        Component: LoginPage },
  { path: "/register",     Component: RegisterPage },
  { path: "/admin-verify", Component: AdminVerifyPage },

  // ─── Protected: requires valid session ────────────────────────────────────
  {
    Component: ProtectedRoute,
    children: [
      // ── Employee routes (role: "employee") ──────────────────────────────
      {
        Component: AppShell,
        children: [
          { path: "/",                   element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard",          Component: DashboardPage },
          { path: "/profile",            Component: ProfilePage },
          { path: "/competencies",       Component: CompetenciesPage },
          { path: "/skill-gaps",         Component: SkillGapsPage },
          { path: "/learning-path",      Component: LearningPathPage },
          { path: "/courses",            Component: CoursesPage },
          { path: "/courses/:id",        Component: CourseDetailPage },
          { path: "/assessments",        Component: AssessmentsPage },
          { path: "/assessments/:id",    Component: AssessmentDetailPage },
          { path: "/documents",          Component: DocumentsPage },
          { path: "/assistant",          Component: AssistantPage },
        ],
      },

      // ── Admin routes (role: "admin" only) ──────────────────────────────
      {
        element: <RoleGuard requiredRole="admin" redirectTo="/dashboard" />,
        children: [
          {
            Component: AdminShell,
            children: [
              {
                path: "/admin",
                element: <SuspenseAdmin><AdminDashboard /></SuspenseAdmin>,
              },
              {
                path: "/admin/employees",
                element: <SuspenseAdmin><AdminEmployees /></SuspenseAdmin>,
              },
              {
                path: "/admin/competency-analytics",
                element: <SuspenseAdmin><AdminCompetencyAnalytics /></SuspenseAdmin>,
              },
              {
                path: "/admin/skill-gap-distribution",
                element: <SuspenseAdmin><AdminSkillGapDistribution /></SuspenseAdmin>,
              },
              {
                path: "/admin/training-demand",
                element: <SuspenseAdmin><AdminTrainingDemand /></SuspenseAdmin>,
              },
              {
                path: "/admin/course-utilization",
                element: <SuspenseAdmin><AdminCourseUtilization /></SuspenseAdmin>,
              },
              {
                path: "/admin/assessments",
                element: <SuspenseAdmin><AdminAssessments /></SuspenseAdmin>,
              },
              {
                path: "/admin/documents",
                element: <SuspenseAdmin><AdminDocuments /></SuspenseAdmin>,
              },
              {
                path: "/admin/reports",
                element: <SuspenseAdmin><AdminReports /></SuspenseAdmin>,
              },
              {
                path: "/admin/notifications",
                element: <SuspenseAdmin><AdminNotifications /></SuspenseAdmin>,
              },
              {
                path: "/admin/settings",
                element: <SuspenseAdmin><AdminSettings /></SuspenseAdmin>,
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── Catch-all ────────────────────────────────────────────────────────────
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
