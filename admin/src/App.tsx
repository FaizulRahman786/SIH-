

import { useState } from 'react'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import CompetencyAnalytics from './pages/competency-analytics/CompetencyAnalytics'
import Employees from './pages/employees/Employees'
import SkillGapDistribution from './pages/skill-gap-distribution/SkillGapDistribution'
import TrainingDemand from './pages/training-demand/TrainingDemand'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  return <AdminLayout activePage={activePage} onNavigate={setActivePage}>
    {activePage === 'Employees' ? <Employees /> : activePage === 'Competency Analytics' ? <CompetencyAnalytics /> : activePage === 'Skill Gap Distribution' ? <SkillGapDistribution /> : activePage === 'Training Demand' ? <TrainingDemand /> : <Dashboard />}
  </AdminLayout>
}

export default App