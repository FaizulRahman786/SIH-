import { useEffect, useState } from 'react'
import AnalyticsChartPanel from '../../components/AnalyticsChartPanel'
import DataTable from '../../components/DataTable'
import GapCard from '../../components/GapCard'
import GapInsightsPanel from '../../components/GapInsightsPanel'

type SkillGap = {
  skill: string
  current: string
  required: string
  gap: string
  priority: string
}

type EmployeeGap = {
  name: string
  role: string
  department: string
  gaps: string
  critical: string
}

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial']

const skillGaps: SkillGap[] = [
  { skill: 'Machine Learning', current: '1.8', required: '4.8', gap: '3.0', priority: '92' },
  { skill: 'Python', current: '2.2', required: '4.7', gap: '2.5', priority: '89' },
  { skill: 'GIS', current: '2.4', required: '4.6', gap: '2.2', priority: '84' },
  { skill: 'Digital Governance', current: '2.7', required: '4.5', gap: '1.8', priority: '86' },
  { skill: 'Statistical Methods', current: '3.1', required: '4.6', gap: '1.5', priority: '78' },
  { skill: 'Leadership', current: '3.2', required: '4.5', gap: '1.3', priority: '72' },
  { skill: 'Technical Delivery', current: '3.4', required: '4.7', gap: '1.3', priority: '74' },
  { skill: 'Data Ethics', current: '3.5', required: '4.6', gap: '1.1', priority: '69' },
  { skill: 'Policy Design', current: '3.6', required: '4.5', gap: '0.9', priority: '62' },
  { skill: 'Stakeholder Management', current: '3.8', required: '4.6', gap: '0.8', priority: '58' },
]

const employeeGaps: EmployeeGap[] = [
  { name: 'Rohan Das', role: 'Field Coordinator', department: 'Field Ops', gaps: '4', critical: 'Critical' },
  { name: 'Vikram Patel', role: 'Policy Officer', department: 'Governance', gaps: '3', critical: 'Review' },
  { name: 'Arjun Singh', role: 'Operations Manager', department: 'Field Ops', gaps: '3', critical: 'Critical' },
  { name: 'Zeenat Zahra', role: 'Programme Lead', department: 'HR', gaps: '2', critical: 'Review' },
  { name: 'Ananya Sharma', role: 'Data Analyst', department: 'Finance', gaps: '1', critical: 'No' },
]

function GapPieChart() {
  return (
    <div className="gap-pie-layout">
      <div className="gap-pie">
        <div>
          <strong>186</strong>
          <span>total gaps</span>
        </div>
      </div>
      <div className="analytics-legend">
        <span><i className="legend-blue" />Statistical <b>28%</b></span>
        <span><i className="legend-teal" />Technical <b>34%</b></span>
        <span><i className="legend-violet" />Digital Gov. <b>21%</b></span>
        <span><i className="legend-orange" />Managerial <b>17%</b></span>
      </div>
    </div>
  )
}

function GapBarChart() {
  return (
    <div className="gap-bar-chart">
      <div className="analytics-y-axis">
        <span>3.0</span>
        <span>2.0</span>
        <span>1.0</span>
        <span>0</span>
      </div>
      <div className="gap-bars">
        {skillGaps.map((item, index) => (
          <div className="gap-bar-column" key={item.skill}>
            <strong>{item.gap}</strong>
            <i
              className={index % 2 === 1 ? 'alt' : ''}
              style={{ height: `${Number(item.gap) / 3 * 100}%` }}
            />
            <span>{item.skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GapRadarChart() {
  return (
    <div className="gap-radar">
      <svg viewBox="0 0 300 250" role="img" aria-label="Gap severity across domains">
        <polygon className="radar-ring" points="150,22 248,93 211,210 89,210 52,93" />
        <polygon className="radar-ring inner-ring" points="150,70 207,111 185,179 115,179 93,111" />
        <polygon className="gap-required" points="150,32 230,99 202,196 98,196 70,99" />
        <polygon className="gap-current" points="150,80 193,116 175,167 120,166 91,115" />
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
        <span><i className="current-key" />Current</span>
      </div>
    </div>
  )
}

function GapLineChart() {
  return (
    <div className="gap-line-chart">
      <div className="line-chart-y">
        <span>220</span>
        <span>180</span>
        <span>140</span>
        <span>100</span>
      </div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Skill gap reduction trend">
        <defs>
          <linearGradient id="gap-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4cc9a4" stopOpacity=".3" />
            <stop offset="1" stopColor="#4cc9a4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="gap-area" d="M0,38 C80,52 98,67 148,70 S240,89 280,105 S372,111 420,133 S520,144 570,165 S650,178 700,190 L700,220 L0,220Z" />
        <path className="gap-line" d="M0,38 C80,52 98,67 148,70 S240,89 280,105 S372,111 420,133 S520,144 570,165 S650,178 700,190" />
        <circle cx="570" cy="165" r="5" />
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
  const [compareA, setCompareA] = useState('Field Ops')
  const [compareB, setCompareB] = useState('Finance')
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

  const filteredEmployees = employeeGaps.filter(employee => {
    const matchesDepartment = department === 'All departments' || employee.department === department
    const matchesRole = role === 'All roles' || employee.role === role
    const matchesDomain = domain === 'All skill domains' || employee.critical === 'Critical'

    return matchesDepartment && matchesRole && matchesDomain
  })

  let comparison = `${compareA} has 2.1x more critical gaps than ${compareB}`

  if (compareA === compareB) {
    comparison = 'Select different departments to compare gap load'
  }

  return (
    <div className="dashboard-page skill-gap-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKFORCE RISK / CAPABILITY GAPS <span className="live-dot" />LIVE DATA</div>
          <h1>Skill gap distribution</h1>
          <p>Prioritise the capabilities that matter most to workforce performance.</p>
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
        <GapCard label="Total Skill Gaps" value="186" detail="Across the workforce" accent="blue" />
        <GapCard label="Critical Gaps" value="42" detail="Priority score above 80" accent="orange" />
        <GapCard label="Top 3 Domains" value="Technical" detail="Statistical · Digital Gov." accent="violet" />
        <GapCard label="Average Gap Size" value="1.6 levels" detail="Required versus current" accent="teal" />
      </section>

      <div className="analytics-chart-grid gap-chart-grid">
        <AnalyticsChartPanel title="Gap distribution by domain" subtitle="Share of identified workforce gaps">
          <GapPieChart />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Top 10 skills by gap" subtitle="Largest current versus required differences">
          <GapBarChart />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Gap severity by domain" subtitle="Current capability compared with requirement">
          <GapRadarChart />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Gap reduction trend" subtitle="Total open gaps across review cycles">
          <GapLineChart />
        </AnalyticsChartPanel>
      </div>

      <GapInsightsPanel
        comparison={comparison}
        onFlag={() => showNotice('42 critical gaps flagged for immediate intervention')}
      />

      <section className="analytics-compare">
        <div className="analytics-panel-header">
          <div>
            <div className="analytics-section-kicker">DEPARTMENT COMPARISON</div>
            <h2>Compare gap distribution</h2>
            <p>Review critical gap load across two departments.</p>
          </div>
        </div>
        <div className="compare-controls">
          <label>
            <span>Department A</span>
            <select value={compareA} onChange={event => setCompareA(event.target.value)}>
              {departments.slice(1).map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="compare-score gap-compare-score"><strong>38</strong><span>open gaps</span></div>
          <div className="compare-vs">VS</div>
          <div className="compare-score gap-compare-score"><strong>18</strong><span>open gaps</span></div>
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
            <div className="eyebrow">PRIORITY REGISTER / {skillGaps.length} SKILLS</div>
            <h2>Skill gap table</h2>
          </div>
          <button className="secondary-button" onClick={() => showNotice('Critical skills marked for review')}>
            Flag critical gaps
            <span>-&gt;</span>
          </button>
        </div>
        <DataTable
          columns={['Skill Name', 'Current Average', 'Required Level', 'Gap Size', 'Priority Score']}
          rows={skillGaps.map(gap => ({
            'Skill Name': gap.skill,
            'Current Average': gap.current,
            'Required Level': gap.required,
            'Gap Size': gap.gap,
            'Priority Score': gap.priority,
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
            'Number of Gaps': employee.gaps,
            'Critical Gap': employee.critical,
          }))}
        />
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default SkillGapDistribution
