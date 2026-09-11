import { useEffect, useState } from 'react'
import { ChartSection } from '../../components/ChartSection'
import DataTable from '../../components/DataTable'
import DemandCard from '../../components/DemandCard'
import TrainingInsightsPanel from '../../components/TrainingInsightsPanel'

type Course = {
  name: string
  provider: string
  enrollments: string
  completion: string
  growth: string
}

type Department = {
  name: string
  learners: string
  courses: string
  change: string
}

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial']

const courses: Course[] = [
  { name: 'Machine Learning Foundations', provider: 'NISG Academy', enrollments: '248', completion: '78%', growth: '+42%' },
  { name: 'Digital Governance Essentials', provider: 'iGOT Karmayogi', enrollments: '214', completion: '84%', growth: '+31%' },
  { name: 'Applied Statistical Methods', provider: 'SkillSaarthi', enrollments: '184', completion: '82%', growth: '+24%' },
  { name: 'GIS for Public Programmes', provider: 'NISG Academy', enrollments: '156', completion: '71%', growth: '+19%' },
  { name: 'Leadership for Public Service', provider: 'SkillSaarthi', enrollments: '142', completion: '91%', growth: '+12%' },
]

const departmentDemand: Department[] = [
  { name: 'Field Ops', learners: '312', courses: '18', change: '+38%' },
  { name: 'IT', learners: '248', courses: '14', change: '+31%' },
  { name: 'Finance', learners: '184', courses: '11', change: '+24%' },
  { name: 'Governance', learners: '156', courses: '9', change: '+18%' },
  { name: 'HR', learners: '98', courses: '7', change: '+12%' },
]

function DemandLineChart() {
  return (
    <div className="demand-line-chart">
      <div className="line-chart-y">
        <span>1,200</span>
        <span>900</span>
        <span>600</span>
        <span>300</span>
        <span>0</span>
      </div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Training demand trend">
        <defs>
          <linearGradient id="training-demand-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4ea9ff" stopOpacity=".28" />
            <stop offset="1" stopColor="#4ea9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="training-demand-area" d="M0,180 C70,168 92,172 140,157 S220,145 260,132 S340,122 380,104 S470,98 510,76 S610,55 700,30 L700,220 L0,220Z" />
        <path className="training-demand-line" d="M0,180 C70,168 92,172 140,157 S220,145 260,132 S340,122 380,104 S470,98 510,76 S610,55 700,30" />
        <circle cx="510" cy="76" r="5" />
      </svg>
      <div className="analytics-line-labels">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </div>
  )
}

function DepartmentBarChart() {
  const values = [86, 72, 61, 49, 35]
  const labels = ['Field Ops', 'IT', 'Finance', 'Gov.', 'HR']

  return (
    <div className="demand-bar-chart">
      <div className="analytics-y-axis">
        <span>400</span>
        <span>300</span>
        <span>200</span>
        <span>100</span>
        <span>0</span>
      </div>
      <div className="analytics-bars">
        {values.map((value, index) => (
          <div className="analytics-bar-column" key={labels[index]}>
            <strong>{departmentDemand[index].learners}</strong>
            <i style={{ height: `${value}%` }} className={index % 2 === 1 ? 'alt' : ''} />
            <span>{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DemandPieChart() {
  return (
    <div className="demand-pie-layout">
      <div className="demand-pie">
        <div>
          <strong>1,042</strong>
          <span>enrollments</span>
        </div>
      </div>
      <div className="analytics-legend">
        <span><i className="legend-blue" />Technical <b>34%</b></span>
        <span><i className="legend-teal" />Statistical <b>28%</b></span>
        <span><i className="legend-violet" />Digital Gov. <b>21%</b></span>
        <span><i className="legend-orange" />Managerial <b>17%</b></span>
      </div>
    </div>
  )
}

function CourseUtilizationChart() {
  const labels = ['ML', 'Gov.', 'Stats', 'GIS', 'Lead']
  const completed = [78, 84, 82, 71, 91]
  const enrolled = [96, 92, 88, 79, 95]

  return (
    <div className="utilization-chart">
      <div className="utilization-legend">
        <span><i className="utilization-enrolled" />Enrolled</span>
        <span><i className="utilization-completed" />Completed</span>
      </div>
      <div className="utilization-bars">
        {labels.map((label, index) => (
          <div className="utilization-column" key={label}>
            <div className="utilization-stack">
              <i className="utilization-enrolled" style={{ height: `${enrolled[index]}%` }} />
              <i className="utilization-completed" style={{ height: `${completed[index]}%` }} />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrainingDemand() {
  const [department, setDepartment] = useState('All departments')
  const [role, setRole] = useState('All roles')
  const [domain, setDomain] = useState('All skill domains')
  const [compareA, setCompareA] = useState('Field Ops')
  const [compareB, setCompareB] = useState('IT')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (notice === '') {
      return
    }

    const timer = window.setTimeout(() => {
      setNotice('')
    }, 2600)

    return () => {
      window.clearTimeout(timer)
    }
  }, [notice])

  function showNotice(message: string) {
    setNotice(message)
  }

  function resetFilters() {
    setDepartment('All departments')
    setRole('All roles')
    setDomain('All skill domains')
  }

  const comparison = `${compareA} has stronger demand growth than ${compareB}`

  return (
    <div className="dashboard-page training-demand-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKFORCE LEARNING / TRAINING DEMAND <span className="live-dot" />LIVE DATA</div>
          <h1>Training demand</h1>
          <p>Understand learner demand and scale the right programmes at the right time.</p>
        </div>
        <div className="analytics-heading-actions">
          <button className="secondary-button" onClick={() => showNotice('CSV training analytics prepared')}>↓ Export CSV</button>
          <button className="primary-button" onClick={() => showNotice('PDF training analytics prepared')}>↓ Export PDF</button>
        </div>
      </div>

      <div className="analytics-filter-bar">
        <label>
          <span>Department</span>
          <select value={department} onChange={event => setDepartment(event.target.value)}>
            {departments.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Role</span>
          <select value={role} onChange={event => setRole(event.target.value)}>
            {roles.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Skill domain</span>
          <select value={domain} onChange={event => setDomain(event.target.value)}>
            {domains.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button className="clear-filter" onClick={resetFilters}>Reset filters</button>
      </div>

      <section className="demand-card-grid">
        <DemandCard label="Total Training Requests" value="1,284" detail="Organization-wide demand" accent="blue" />
        <DemandCard label="Active Enrollments" value="1,042" detail="Current learners" accent="teal" />
        <DemandCard label="Growth in Demand" value="+28.4%" detail="Versus last quarter" accent="orange" />
        <DemandCard label="Top 3 Domains" value="Technical" detail="Statistical · Digital Gov." accent="violet" />
      </section>

      <div className="analytics-chart-grid demand-chart-grid">
        <ChartSection title="Training demand trend" subtitle="Monthly learner enrollments">
          <DemandLineChart />
        </ChartSection>
        <ChartSection title="Department demand" subtitle="Active learners by department">
          <DepartmentBarChart />
        </ChartSection>
        <ChartSection title="Demand by skill domain" subtitle="Share of current enrolments">
          <DemandPieChart />
        </ChartSection>
        <ChartSection title="Course utilization" subtitle="Enrollment versus completion rates">
          <CourseUtilizationChart />
        </ChartSection>
      </div>

      <TrainingInsightsPanel comparison={comparison} onFlag={() => showNotice('High-demand courses flagged for prioritization')} />

      <section className="analytics-compare">
        <div className="analytics-panel-header">
          <div>
            <div className="analytics-section-kicker">DEMAND COMPARISON</div>
            <h2>Compare department demand</h2>
            <p>Review demand trends across two departments.</p>
          </div>
        </div>
        <div className="compare-controls">
          <label>
            <span>Department A</span>
            <select value={compareA} onChange={event => setCompareA(event.target.value)}>
              {departments.slice(1).map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="compare-score">
            <strong>312</strong>
            <span>active learners</span>
          </div>
          <div className="compare-vs">VS</div>
          <div className="compare-score">
            <strong>248</strong>
            <span>active learners</span>
          </div>
          <label>
            <span>Department B</span>
            <select value={compareB} onChange={event => setCompareB(event.target.value)}>
              {departments.slice(1).map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">COURSE DEMAND / {courses.length} PROGRAMMES</div>
            <h2>Training demand table</h2>
          </div>
          <button className="secondary-button" onClick={() => showNotice('High-demand courses marked for review')}>Flag high demand <span>-&gt;</span></button>
        </div>
        <DataTable columns={['Course / Programme', 'Provider', 'Enrollments', 'Completion Rate', 'Demand Growth']} rows={courses.map(course => ({ 'Course / Programme': course.name, Provider: course.provider, Enrollments: course.enrollments, 'Completion Rate': course.completion, 'Demand Growth': course.growth }))} />
      </section>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DEPARTMENT VIEW</div>
            <h2>Department demand table</h2>
          </div>
        </div>
        <DataTable columns={['Department', 'Active Learners', 'Requested Courses', 'Demand Change']} rows={departmentDemand.map(item => ({ Department: item.name, 'Active Learners': item.learners, 'Requested Courses': item.courses, 'Demand Change': item.change }))} />
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default TrainingDemand
