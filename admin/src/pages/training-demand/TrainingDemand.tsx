import { useEffect, useState } from 'react'
import { ChartSection } from '../../components/ChartSection'
import DataTable from '../../components/DataTable'
import DemandCard from '../../components/DemandCard'

type DemandRecord = {
  course: string
  provider: string
  department: string
  role: string
  domain: string
  enrollments: number
  completion: number
  growth: number
}

type DepartmentDemand = {
  name: string
  learners: number
  courses: number
  change: number
}

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist', 'Operations Manager']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial', 'Digital']

const demandRecords: DemandRecord[] = [
  { course: 'Machine Learning Foundations', provider: 'NISG Academy', department: 'IT', role: 'Technology Specialist', domain: 'Technical', enrollments: 248, completion: 78, growth: 42 },
  { course: 'Digital Governance Essentials', provider: 'iGOT Karmayogi', department: 'Governance', role: 'Policy Officer', domain: 'Digital Governance', enrollments: 214, completion: 84, growth: 31 },
  { course: 'Applied Statistical Methods', provider: 'SkillSaarthi', department: 'Finance', role: 'Data Analyst', domain: 'Statistical', enrollments: 184, completion: 82, growth: 24 },
  { course: 'GIS for Public Programmes', provider: 'NISG Academy', department: 'Field Ops', role: 'Field Coordinator', domain: 'Technical', enrollments: 156, completion: 71, growth: 19 },
  { course: 'Leadership for Public Service', provider: 'SkillSaarthi', department: 'HR', role: 'Programme Lead', domain: 'Managerial', enrollments: 142, completion: 91, growth: 12 },
  { course: 'Technical Delivery Basics', provider: 'SkillSaarthi', department: 'Field Ops', role: 'Operations Manager', domain: 'Technical', enrollments: 126, completion: 74, growth: 28 },
  { course: 'Digital Tools for Analysts', provider: 'NISG Academy', department: 'Finance', role: 'Data Analyst', domain: 'Digital', enrollments: 108, completion: 79, growth: 18 },
  { course: 'People Management Skills', provider: 'SkillSaarthi', department: 'IT', role: 'Technology Specialist', domain: 'Managerial', enrollments: 84, completion: 88, growth: 10 },
]

function getFilteredRecords(department: string, role: string, domain: string) {
  return demandRecords.filter(record => {
    const departmentMatches = department === 'All departments' || record.department === department
    const roleMatches = role === 'All roles' || record.role === role
    const domainMatches = domain === 'All skill domains' || record.domain === domain

    return departmentMatches && roleMatches && domainMatches
  })
}

function getDepartmentDemand(records: DemandRecord[]) {
  const values: DepartmentDemand[] = []

  departments.slice(1).forEach(department => {
    const departmentRecords = records.filter(record => record.department === department)

    if (departmentRecords.length > 0) {
      values.push({
        name: department,
        learners: departmentRecords.reduce((total, record) => total + record.enrollments, 0),
        courses: departmentRecords.length,
        change: Math.round(departmentRecords.reduce((total, record) => total + record.growth, 0) / departmentRecords.length),
      })
    }
  })

  return values
}

function DemandLineChart({ totalEnrollments }: { totalEnrollments: number }) {
  const start = Math.max(40, 190 - Math.min(totalEnrollments, 1000) / 8)
  const end = Math.max(30, start - 80)
  const path = `M0,${start} C70,${start - 10} 120,${start + 4} 180,${start - 18} S300,${start - 42} 380,${start - 54} S520,${end + 22} 700,${end}`

  return (
    <div className="demand-line-chart">
      <div className="line-chart-y">
        <span>1,200</span>
        <span>900</span>
        <span>600</span>
        <span>300</span>
        <span>0</span>
      </div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Filtered training demand trend">
        <defs>
          <linearGradient id="training-demand-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4ea9ff" stopOpacity=".28" />
            <stop offset="1" stopColor="#4ea9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="training-demand-area" d={`${path} L700,220 L0,220Z`} />
        <path className="training-demand-line" d={path} />
        <circle cx="700" cy={end} r="5" />
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

function DepartmentBarChart({ values }: { values: DepartmentDemand[] }) {
  const largest = Math.max(...values.map(item => item.learners), 1)

  return (
    <div className="demand-bar-chart">
      <div className="analytics-y-axis">
        <span>{largest}</span>
        <span>{Math.round(largest * .75)}</span>
        <span>{Math.round(largest * .5)}</span>
        <span>{Math.round(largest * .25)}</span>
        <span>0</span>
      </div>
      <div className="analytics-bars">
        {values.map((item, index) => (
          <div className="analytics-bar-column" key={item.name}>
            <strong>{item.learners}</strong>
            <i style={{ height: `${item.learners / largest * 100}%` }} className={index % 2 === 1 ? 'alt' : ''} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DemandPieChart({ records, totalEnrollments }: { records: DemandRecord[]; totalEnrollments: number }) {
  const domainTotals = domains.slice(1).map(domain => ({
    name: domain,
    enrollments: records.filter(record => record.domain === domain).reduce((total, record) => total + record.enrollments, 0),
  })).filter(item => item.enrollments > 0)
  const first = totalEnrollments > 0 ? domainTotals[0]?.enrollments / totalEnrollments * 100 || 0 : 0
  const second = totalEnrollments > 0 ? first + (domainTotals[1]?.enrollments || 0) / totalEnrollments * 100 : 0
  const third = totalEnrollments > 0 ? second + (domainTotals[2]?.enrollments || 0) / totalEnrollments * 100 : 0

  return (
    <div className="demand-pie-layout">
      <div className="demand-pie" style={{ background: `conic-gradient(#4ea9ff 0 ${first}%, #4cc9a4 ${first}% ${second}%, #8c9fff ${second}% ${third}%, #ffc98d ${third}% 100%)` }}>
        <div>
          <strong>{totalEnrollments}</strong>
          <span>enrollments</span>
        </div>
      </div>
      <div className="analytics-legend">
        {domainTotals.map((item, index) => (
          <span key={item.name}><i className={`legend-${['blue', 'teal', 'violet', 'orange'][index % 4]}`} />{item.name} <b>{Math.round(item.enrollments / totalEnrollments * 100)}%</b></span>
        ))}
      </div>
    </div>
  )
}

function CourseUtilizationChart({ records }: { records: DemandRecord[] }) {
  const visibleRecords = records.slice(0, 5)

  return (
    <div className="utilization-chart">
      <div className="utilization-legend">
        <span><i className="utilization-enrolled" />Enrolled</span>
        <span><i className="utilization-completed" />Completed</span>
      </div>
      <div className="utilization-bars">
        {visibleRecords.map(record => (
          <div className="utilization-column" key={record.course}>
            <div className="utilization-stack">
              <i className="utilization-enrolled" style={{ height: `${record.enrollments / Math.max(...visibleRecords.map(item => item.enrollments), 1) * 100}%` }} />
              <i className="utilization-completed" style={{ height: `${record.completion}%` }} />
            </div>
            <span>{record.course.split(' ')[0]}</span>
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
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (notice === '') {
      return
    }

    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  function showNotice(message: string) {
    setNotice(message)
  }

  function resetFilters() {
    setDepartment('All departments')
    setRole('All roles')
    setDomain('All skill domains')
  }

  const filteredRecords = getFilteredRecords(department, role, domain)
  const departmentValues = getDepartmentDemand(filteredRecords)
  const totalRequests = filteredRecords.reduce((total, record) => total + record.enrollments, 0)
  const averageCompletion = filteredRecords.length > 0 ? filteredRecords.reduce((total, record) => total + record.completion, 0) / filteredRecords.length : 0
  const averageGrowth = filteredRecords.length > 0 ? filteredRecords.reduce((total, record) => total + record.growth, 0) / filteredRecords.length : 0
  const topDomain = domains.slice(1).map(item => ({ name: item, total: filteredRecords.filter(record => record.domain === item).reduce((total, record) => total + record.enrollments, 0) })).reduce((top, item) => item.total > top.total ? item : top, { name: 'None', total: 0 })

  return (
    <div className="dashboard-page training-demand-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKFORCE LEARNING / TRAINING DEMAND <span className="live-dot" />LIVE DATA</div>
          <h1>Training demand</h1>
          <p>All cards and charts update with the selected filters.</p>
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
        <DemandCard label="Total Training Requests" value={`${totalRequests}`} detail={`${filteredRecords.length} matching programmes`} accent="blue" />
        <DemandCard label="Active Enrollments" value={`${totalRequests}`} detail={`${averageCompletion.toFixed(0)}% average completion`} accent="teal" />
        <DemandCard label="Growth in Demand" value={`+${averageGrowth.toFixed(1)}%`} detail="Average filtered growth" accent="orange" />
        <DemandCard label="Top Skill Domain" value={topDomain.name} detail={topDomain.total > 0 ? `${topDomain.total} enrollments` : 'No matching demand'} accent="violet" />
      </section>

      <div className="analytics-chart-grid demand-chart-grid">
        <ChartSection title="Training demand trend" subtitle="Filtered monthly learner demand">
          <DemandLineChart totalEnrollments={totalRequests} />
        </ChartSection>
        <ChartSection title="Department demand" subtitle="Filtered active learners by department">
          <DepartmentBarChart values={departmentValues} />
        </ChartSection>
        <ChartSection title="Demand by skill domain" subtitle="Filtered share of current enrollments">
          <DemandPieChart records={filteredRecords} totalEnrollments={totalRequests} />
        </ChartSection>
        <ChartSection title="Course utilization" subtitle="Filtered enrollment versus completion rates">
          <CourseUtilizationChart records={filteredRecords} />
        </ChartSection>
      </div>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">COURSE DEMAND / {filteredRecords.length} PROGRAMMES</div>
            <h2>Training demand table</h2>
          </div>
          <button className="secondary-button" onClick={() => showNotice('High-demand courses marked for review')}>Flag high demand <span>-&gt;</span></button>
        </div>
        <DataTable columns={['Course / Programme', 'Provider', 'Department', 'Role', 'Enrollments', 'Completion Rate', 'Demand Growth']} rows={filteredRecords.map(record => ({ 'Course / Programme': record.course, Provider: record.provider, Department: record.department, Role: record.role, Enrollments: `${record.enrollments}`, 'Completion Rate': `${record.completion}%`, 'Demand Growth': `+${record.growth}%` }))} />
      </section>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DEPARTMENT VIEW</div>
            <h2>Department demand table</h2>
          </div>
        </div>
        <DataTable columns={['Department', 'Active Learners', 'Requested Courses', 'Demand Change']} rows={departmentValues.map(item => ({ Department: item.name, 'Active Learners': `${item.learners}`, 'Requested Courses': `${item.courses}`, 'Demand Change': `+${item.change}%` }))} />
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default TrainingDemand
