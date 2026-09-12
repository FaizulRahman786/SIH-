
import { useState } from 'react'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Assessments from './pages/assessments/Assessments'
import Dashboard from './pages/Dashboard'
import CompetencyAnalytics from './pages/competency-analytics/CompetencyAnalytics'
import CourseUtilization from './pages/course-utilization/CourseUtilization'
import Documents from './pages/documents/Documents'
import Employees from './pages/employees/Employees'
import Notifications from './pages/notifications/Notifications'
import Reports from './pages/reports/Reports'
import SkillGapDistribution from './pages/skill-gap-distribution/SkillGapDistribution'
import SystemSettings from './pages/system-settings/SystemSettings'
import TrainingDemand from './pages/training-demand/TrainingDemand'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('skillsaarthi-login') === 'true')

  function handleLogin(rememberMe: boolean) {
    setLoggedIn(true)

    if (rememberMe) {
      localStorage.setItem('skillsaarthi-login', 'true')
    }
  }

  function handleLogout() {
    setLoggedIn(false)
    localStorage.removeItem('skillsaarthi-login')
  }

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return <AdminLayout activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout}>
    {activePage === 'Employees' ? <Employees onNavigate={setActivePage} /> : activePage === 'Competency Analytics' ? <CompetencyAnalytics /> : activePage === 'Skill Gap Distribution' ? <SkillGapDistribution /> : activePage === 'Training Demand' ? <TrainingDemand /> : activePage === 'Course Utilization' ? <CourseUtilization /> : activePage === 'Assessments' ? <Assessments /> : activePage === 'Documents' ? <Documents /> : activePage === 'Reports' ? <Reports /> : activePage === 'Notifications' ? <Notifications /> : activePage === 'System Settings' ? <SystemSettings /> : <Dashboard />}
  </AdminLayout>
}

export default App