import { createBrowserRouter, Navigate } from "react-router";
import { AppShell } from "../layouts/AppShell";
import { ProtectedRoute } from "../layouts/ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
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

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: AppShell,
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", Component: DashboardPage },
          { path: "/profile", Component: ProfilePage },
          { path: "/competencies", Component: CompetenciesPage },
          { path: "/skill-gaps", Component: SkillGapsPage },
          { path: "/learning-path", Component: LearningPathPage },
          { path: "/courses", Component: CoursesPage },
          { path: "/courses/:id", Component: CourseDetailPage },
          { path: "/assessments", Component: AssessmentsPage },
          { path: "/assessments/:id", Component: AssessmentDetailPage },
          { path: "/documents", Component: DocumentsPage },
          { path: "/assistant", Component: AssistantPage },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
