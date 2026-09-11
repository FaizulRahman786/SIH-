import { useEffect, useState } from 'react'
import AnalyticsCard from '../../components/AnalyticsCard'
import AnalyticsChartPanel from '../../components/AnalyticsChartPanel'
import DataTable from '../../components/DataTable'
import InsightsPanel from '../../components/InsightsPanel'

type Employee = {
  name: string
  role: string
  department: string
  score: string
  gaps: string
}

type Gap = {
  skill: string
  current: string
  required: string
  gap: string
  priority: string
}

const employees: Employee[] = [
  { name: 'Ananya Sharma', role: 'Data Analyst', department: 'Finance', score: '4.6 / 5', gaps: 'Statistical' },
  { name: 'Vikram Patel', role: 'Policy Officer', department: 'Governance', score: '3.8 / 5', gaps: 'Digital Governance' },
  { name: 'Zeenat Zahra', role: 'Programme Lead', department: 'HR', score: '4.2 / 5', gaps: 'Managerial' },
  { name: 'Rohan Das', role: 'Field Coordinator', department: 'Field Ops', score: '2.9 / 5', gaps: 'Technical, Digital' },
  { name: 'Ishita Menon', role: 'Technology Specialist', department: 'IT', score: '4.4 / 5', gaps: 'Managerial' },
]

const gaps: Gap[] = [
  { skill: 'Machine Learning', current: '1.8', required: '4.8', gap: '3.0', priority: '92' },
  { skill: 'Digital Governance', current: '2.7', required: '4.5', gap: '1.8', priority: '86' },
  { skill: 'Statistical Methods', current: '3.1', required: '4.6', gap: '1.5', priority: '78' },
  { skill: 'Technical Delivery', current: '3.4', required: '4.7', gap: '1.3', priority: '74' },
]

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial']
const departmentScores = [
  ['IT', '4.4'],
  ['Finance', '4.2'],
  ['HR', '3.9'],
  ['Policy', '3.6'],
  ['Field Ops', '3.2'],
  ['Admin', '3.0'],
]

function BarChart() {
  return (
    <div className="analytics-bar-chart">
      <div className="analytics-y-axis">
        <span>5.0</span>
        <span>4.0</span>
        <span>3.0</span>
        <span>2.0</span>
        <span>0</span>
      </div>
      <div className="analytics-bars">
        {departmentScores.map((item, index) => (
          <div className="analytics-bar-column" key={item[0]}>
            <strong style={{ height: `${Number(item[1]) * 17}%` }}>{item[1]}</strong>
            <span>{item[0]}</span>
            <i className={index % 2 === 1 ? 'alt' : ''} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PieChart() {
  return (
    <div className="analytics-pie-layout">
      <div className="analytics-pie">
        <div>
          <strong>186</strong>
          <span>open gaps</span>
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

function RadarChart() {
  return (
    <div className="analytics-radar">
      <svg viewBox="0 0 300 250" role="img" aria-label="Competency mapping radar chart">
        <polygon className="radar-ring" points="150,22 248,93 211,210 89,210 52,93" />
        <polygon className="radar-ring inner-ring" points="150,70 207,111 185,179 115,179 93,111" />
        <polygon className="radar-data" points="150,45 225,101 177,190 101,163 73,101" />
        <line x1="150" y1="22" x2="150" y2="210" />
        <line x1="52" y1="93" x2="248" y2="93" />
        <line x1="89" y1="210" x2="211" y2="210" />
      </svg>
      <div className="radar-label radar-top">Statistical</div>
      <div className="radar-label radar-right">Technical</div>
      <div className="radar-label radar-bottom">Managerial</div>
      <div className="radar-label radar-left">Digital Governance</div>
    </div>
  )
}

function LineChart() {
  return (
    <div className="analytics-line-chart">
      <div className="line-chart-y">
        <span>5.0</span>
        <span>4.0</span>
        <span>3.0</span>
        <span>2.0</span>
      </div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Competency improvement trend over time">
        <defs>
          <linearGradient id="analytics-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4ea9ff" stopOpacity=".28" />
            <stop offset="1" stopColor="#4ea9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="analytics-area" d="M0,178 C78,170 88,155 142,160 S220,145 258,132 S340,132 372,106 S460,103 486,85 S582,72 700,42 L700,220 L0,220Z" />
        <path className="analytics-line" d="M0,178 C78,170 88,155 142,160 S220,145 258,132 S340,132 372,106 S460,103 486,85 S582,72 700,42" />
        <circle cx="486" cy="85" r="5" />
      </svg>
      <div className="analytics-line-labels">
        <span>Q1 2025</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
        <span>Q1 2026</span>
        <span>Q2</span>
        <span>Q3</span>
      </div>
    </div>
  )
}

function CompetencyAnalytics() {
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

  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = department === 'All departments' || employee.department === department
    const matchesRole = role === 'All roles' || employee.role === role
    const matchesDomain = domain === 'All skill domains' || employee.gaps.includes(domain)

    return matchesDepartment && matchesRole && matchesDomain
  })

  let comparison = `${compareA} leads ${compareB} by 0.8 points`

  if (compareA === compareB) {
    comparison = 'Choose two different teams to compare'
  }

  return (
    <div className="dashboard-page competency-analytics-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">INSIGHTS / WORKFORCE CAPABILITY <span className="live-dot" />LIVE DATA</div>
          <h1>Competency analytics</h1>
          <p>Measure capability, identify risk, and plan the next learning investment.</p>
        </div>
        <div className="analytics-heading-actions">
          <button className="secondary-button" onClick={() => showNotice('CSV export prepared')}>↓ Export CSV</button>
          <button className="primary-button" onClick={() => showNotice('PDF export prepared')}>↓ Export PDF</button>
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

      <section className="analytics-card-grid">
        <AnalyticsCard label="Average Competency Score" value="3.8 / 5" detail="+0.3 this quarter" accent="blue" />
        <AnalyticsCard label="Critical Skill Gaps" value="186" detail="14 need attention" accent="orange" />
        <AnalyticsCard label="Largest Gap" value="Machine Learning" detail="3.0 levels below" accent="violet" />
        <AnalyticsCard label="Emerging Skills" value="Digital Ethics" detail="+22% demand growth" accent="teal" />
      </section>

      <div className="analytics-chart-grid">
        <AnalyticsChartPanel title="Department competency" subtitle="Average scores by operating group">
          <BarChart />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Skill gap distribution" subtitle="Open gaps by competency domain">
          <PieChart />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Competency mapping" subtitle="Strengths versus required capability">
          <RadarChart />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Improvement trend" subtitle="Average competency score over review cycles">
          <LineChart />
        </AnalyticsChartPanel>
      </div>

      <InsightsPanel comparison={comparison} />

      <section className="analytics-compare">
        <div className="analytics-panel-header">
          <div>
            <div className="analytics-section-kicker">SIDE-BY-SIDE COMPARISON</div>
            <h2>Compare workforce capability</h2>
            <p>Set two teams or roles to compare their average readiness.</p>
          </div>
        </div>
        <div className="compare-controls">
          <label>
            <span>Group A</span>
            <select value={compareA} onChange={event => setCompareA(event.target.value)}>
              {departments.slice(1).map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <div className="compare-score"><strong>3.2</strong><span>average score</span></div>
          <div className="compare-vs">VS</div>
          <div className="compare-score"><strong>4.4</strong><span>average score</span></div>
          <label>
            <span>Group B</span>
            <select value={compareB} onChange={event => setCompareB(event.target.value)}>
              {departments.slice(1).map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">WORKFORCE DETAIL / {filteredEmployees.length} MATCHES</div>
            <h2>Employee competency</h2>
          </div>
        </div>
        <DataTable
          columns={['Name', 'Role', 'Department', 'Competency Score', 'Gaps']}
          rows={filteredEmployees.map(employee => ({
            Name: employee.name,
            Role: employee.role,
            Department: employee.department,
            'Competency Score': employee.score,
            Gaps: employee.gaps,
          }))}
        />
      </section>

      <section className="data-section analytics-data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PRIORITY REGISTER</div>
            <h2>Skill gap table</h2>
          </div>
        </div>
        <DataTable
          columns={['Skill Name', 'Current Average', 'Required Level', 'Gap Size', 'Priority Score']}
          rows={gaps.map(gap => ({
            'Skill Name': gap.skill,
            'Current Average': gap.current,
            'Required Level': gap.required,
            'Gap Size': gap.gap,
            'Priority Score': gap.priority,
          }))}
        />
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default CompetencyAnalytics
