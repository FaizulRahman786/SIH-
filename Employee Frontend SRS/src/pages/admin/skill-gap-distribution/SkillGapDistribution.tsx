import '../../../styles/admin-legacy.css'
import { useEffect, useState } from 'react'
import AnalyticsChartPanel from '../../../components/admin/AnalyticsChartPanel'
import DataTable from '../../../components/admin/DataTable'
import GapCard from '../../../components/admin/GapCard'

type Employee = {
  name: string
  role: string
  department: string
  gaps: string[]
  critical: string
}

type SkillGap = {
  skill: string
  domain: string
  department: string
  role: string
  current: number
  required: number
  priority: number
}

type DomainValue = {
  name: string
  gaps: number
}

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist', 'Operations Manager']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial', 'Digital']

const employees: Employee[] = [
  { name: 'Rohan Das', role: 'Field Coordinator', department: 'Field Ops', gaps: ['Technical', 'Digital'], critical: 'Critical' },
  { name: 'Vikram Patel', role: 'Policy Officer', department: 'Governance', gaps: ['Digital Governance'], critical: 'Review' },
  { name: 'Arjun Singh', role: 'Operations Manager', department: 'Field Ops', gaps: ['Statistical', 'Technical'], critical: 'Critical' },
  { name: 'Zeenat Zahra', role: 'Programme Lead', department: 'HR', gaps: ['Managerial'], critical: 'Review' },
  { name: 'Ananya Sharma', role: 'Data Analyst', department: 'Finance', gaps: ['Statistical'], critical: 'No' },
  { name: 'Ishita Menon', role: 'Technology Specialist', department: 'IT', gaps: ['Managerial'], critical: 'No' },
  { name: 'Kavita Rao', role: 'Data Analyst', department: 'Finance', gaps: ['Statistical'], critical: 'Review' },
  { name: 'Nikhil Verma', role: 'Policy Officer', department: 'Governance', gaps: ['Digital Governance', 'Technical'], critical: 'Critical' },
]

const skillGaps: SkillGap[] = [
  { skill: 'Machine Learning', domain: 'Technical', department: 'IT', role: 'Technology Specialist', current: 1.8, required: 4.8, priority: 92 },
  { skill: 'Python', domain: 'Technical', department: 'Finance', role: 'Data Analyst', current: 2.2, required: 4.7, priority: 89 },
  { skill: 'GIS', domain: 'Technical', department: 'Field Ops', role: 'Field Coordinator', current: 2.4, required: 4.6, priority: 84 },
  { skill: 'Digital Governance', domain: 'Digital Governance', department: 'Governance', role: 'Policy Officer', current: 2.7, required: 4.5, priority: 86 },
  { skill: 'Statistical Methods', domain: 'Statistical', department: 'Finance', role: 'Data Analyst', current: 3.1, required: 4.6, priority: 78 },
  { skill: 'Leadership', domain: 'Managerial', department: 'HR', role: 'Programme Lead', current: 3.2, required: 4.5, priority: 72 },
  { skill: 'Technical Delivery', domain: 'Technical', department: 'Field Ops', role: 'Operations Manager', current: 3.4, required: 4.7, priority: 74 },
  { skill: 'Data Ethics', domain: 'Digital Governance', department: 'Governance', role: 'Policy Officer', current: 3.5, required: 4.6, priority: 69 },
]

function getFilteredEmployees(department: string, role: string, domain: string) {
  return employees.filter(employee => {
    const departmentMatches = department === 'All departments' || employee.department === department
    const roleMatches = role === 'All roles' || employee.role === role
    const domainMatches = domain === 'All skill domains' || employee.gaps.includes(domain)

    return departmentMatches && roleMatches && domainMatches
  })
}

function getFilteredSkillGaps(department: string, role: string, domain: string) {
  return skillGaps.filter(gap => {
    const departmentMatches = department === 'All departments' || gap.department === department
    const roleMatches = role === 'All roles' || gap.role === role
    const domainMatches = domain === 'All skill domains' || gap.domain === domain

    return departmentMatches && roleMatches && domainMatches
  })
}

function getDomainValues(gaps: SkillGap[]) {
  const values: DomainValue[] = []

  domains.slice(1).forEach(domain => {
    const domainGaps = gaps.filter(gap => gap.domain === domain)

    if (domainGaps.length > 0) {
      values.push({ name: domain, gaps: domainGaps.length })
    }
  })

  return values
}

function GapPieChart({ values, total }: { values: DomainValue[]; total: number }) {
  const first = total > 0 ? values[0]?.gaps / total * 100 || 0 : 0
  const second = total > 0 ? first + (values[1]?.gaps || 0) / total * 100 : 0
  const third = total > 0 ? second + (values[2]?.gaps || 0) / total * 100 : 0

  return (
    <div className="gap-pie-layout">
      <div className="gap-pie" style={{ background: `conic-gradient(#4ea9ff 0 ${first}%, #4cc9a4 ${first}% ${second}%, #8c9fff ${second}% ${third}%, #ffc98d ${third}% 100%)` }}>
        <div>
          <strong>{total}</strong>
          <span>total gaps</span>
        </div>
      </div>
      <div className="analytics-legend">
        {values.map((item, index) => (
          <span key={item.name}><i className={`legend-${['blue', 'teal', 'violet', 'orange'][index % 4]}`} />{item.name} <b>{total > 0 ? Math.round(item.gaps / total * 100) : 0}%</b></span>
        ))}
      </div>
    </div>
  )
}

function GapBarChart({ gaps }: { gaps: SkillGap[] }) {
  return (
    <div className="gap-bar-chart">
      <div className="analytics-y-axis">
        <span>3.0</span>
        <span>2.0</span>
        <span>1.0</span>
        <span>0</span>
      </div>
      <div className="gap-bars">
        {gaps.map((item, index) => {
          const gapSize = item.required - item.current

          return (
            <div className="gap-bar-column" key={item.skill}>
              <strong>{gapSize.toFixed(1)}</strong>
              <i className={index % 2 === 1 ? 'alt' : ''} style={{ height: `${gapSize / 3 * 100}%` }} />
              <span>{item.skill}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function GapRadarChart({ gaps }: { gaps: SkillGap[] }) {
  const values = domains.slice(1).map(domain => {
    const domainGaps = gaps.filter(gap => gap.domain === domain)
    const total = domainGaps.reduce((sum, gap) => sum + gap.required - gap.current, 0)
    return Math.min(total, 3)
  })
  const points = values.map((value, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / 5
    const radius = Math.max(value / 3 * 90, 8)
    return `${150 + Math.cos(angle) * radius},${125 + Math.sin(angle) * radius}`
  }).join(' ')

  return (
    <div className="gap-radar">
      <svg viewBox="0 0 300 250" role="img" aria-label="Filtered gap severity across domains">
        <polygon className="radar-ring" points="150,22 248,93 211,210 89,210 52,93" />
        <polygon className="radar-ring inner-ring" points="150,70 207,111 185,179 115,179 93,111" />
        <polygon className="gap-required" points="150,32 230,99 202,196 98,196 70,99" />
        <polygon className="gap-current" points={points} />
        <line x1="150" y1="22" x2="150" y2="210" />
        <line x1="52" y1="93" x2="248" y2="93" />
        <line x1="89" y1="210" x2="211" y2="210" />
      </svg>
      <div className="gap-radar-label gap-radar-top">Statistical</div>
      <div className="gap-radar-label gap-radar-right">Technical</div>
      <div className="gap-radar-label gap-radar-bottom">Managerial</div>
      <div className="gap-radar-label gap-radar-left">Digital Governance</div>
      <div className="gap-radar-key">
        <span><i className="required-key" />Required</span>
        <span><i className="current-key" />Filtered gaps</span>
      </div>
    </div>
  )
}

function GapLineChart({ totalGaps }: { totalGaps: number }) {
  const start = Math.max(30, 200 - totalGaps * 5)
  const end = Math.max(70, start + 55)
  const path = `M0,${start} C80,${start + 14} 148,${start + 20} 220,${start + 35} S380,${start + 42} 470,${end - 18} S590,${end - 8} 700,${end}`

  return (
    <div className="gap-line-chart">
      <div className="line-chart-y">
        <span>40</span>
        <span>30</span>
        <span>20</span>
        <span>10</span>
      </div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Filtered skill gap reduction trend">
        <defs>
          <linearGradient id="gap-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4cc9a4" stopOpacity=".3" />
            <stop offset="1" stopColor="#4cc9a4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="gap-area" d={`${path} L700,220 L0,220Z`} />
        <path className="gap-line" d={path} />
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

function SkillGapDistribution() {
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

  const filteredEmployees = getFilteredEmployees(department, role, domain)
  const filteredGaps = getFilteredSkillGaps(department, role, domain)
  const domainValues = getDomainValues(filteredGaps)
  const totalGaps = filteredEmployees.reduce((total, employee) => total + employee.gaps.length, 0)
  const criticalGaps = filteredEmployees.filter(employee => employee.critical === 'Critical').length
  const averageGap = filteredGaps.length > 0 ? filteredGaps.reduce((total, gap) => total + gap.required - gap.current, 0) / filteredGaps.length : 0
  const topDomain = domainValues.reduce((top, item) => item.gaps > top.gaps ? item : top, { name: 'None', gaps: 0 })

  return (
    <div className="dashboard-page skill-gap-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKFORCE RISK / CAPABILITY GAPS <span className="live-dot" />LIVE DATA</div>
          <h1>Skill gap distribution</h1>
          <p>All cards and charts update with the selected filters.</p>
        </div>
        <div className="analytics-heading-actions">
          <button className="secondary-button" onClick={() => showNotice('CSV gap analytics prepared')}>↓ Export CSV</button>
          <button className="primary-button" onClick={() => showNotice('PDF gap analytics prepared')}>↓ Export PDF</button>
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

      <section className="gap-card-grid">
        <GapCard label="Total Skill Gaps" value={`${totalGaps}`} detail={`${filteredEmployees.length} employees in view`} accent="blue" />
        <GapCard label="Critical Gaps" value={`${criticalGaps}`} detail="People needing quick action" accent="orange" />
        <GapCard label="Top Gap Domain" value={topDomain.name} detail={topDomain.gaps > 0 ? `${topDomain.gaps} open gaps` : 'No matching gaps'} accent="violet" />
        <GapCard label="Average Gap Size" value={`${averageGap.toFixed(1)} levels`} detail="Required versus current" accent="teal" />
      </section>

      <div className="analytics-chart-grid gap-chart-grid">
        <AnalyticsChartPanel title="Gap distribution by domain" subtitle="Filtered share of workforce gaps">
          <GapPieChart values={domainValues} total={filteredGaps.length} />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Top skills by gap" subtitle="Filtered current versus required differences">
          <GapBarChart gaps={filteredGaps} />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Gap severity by domain" subtitle="Filtered gap size across skill domains">
          <GapRadarChart gaps={filteredGaps} />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Gap reduction trend" subtitle="Trend based on the selected employees">
          <GapLineChart totalGaps={totalGaps} />
        </AnalyticsChartPanel>
      </div>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PRIORITY REGISTER / {filteredGaps.length} SKILLS</div>
            <h2>Skill gap table</h2>
          </div>
          <button className="secondary-button" onClick={() => showNotice('Critical skills marked for review')}>
            Flag critical gaps
            <span>-&gt;</span>
          </button>
        </div>
        <DataTable
          columns={['Skill Name', 'Domain', 'Department', 'Role', 'Current Average', 'Required Level', 'Gap Size', 'Priority Score']}
          rows={filteredGaps.map(gap => ({
            'Skill Name': gap.skill,
            Domain: gap.domain,
            Department: gap.department,
            Role: gap.role,
            'Current Average': gap.current.toFixed(1),
            'Required Level': gap.required.toFixed(1),
            'Gap Size': (gap.required - gap.current).toFixed(1),
            'Priority Score': `${gap.priority}`,
          }))}
        />
      </section>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">EMPLOYEE RISK / {filteredEmployees.length} MATCHES</div>
            <h2>Employee gap table</h2>
          </div>
        </div>
        <DataTable
          columns={['Employee Name', 'Role', 'Department', 'Number of Gaps', 'Critical Gap']}
          rows={filteredEmployees.map(employee => ({
            'Employee Name': employee.name,
            Role: employee.role,
            Department: employee.department,
            'Number of Gaps': `${employee.gaps.length}`,
            'Critical Gap': employee.critical,
          }))}
        />
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default SkillGapDistribution



