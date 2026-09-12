import { useEffect, useState } from 'react'
import AnalyticsCard from '../../components/AnalyticsCard'
import AnalyticsChartPanel from '../../components/AnalyticsChartPanel'
import DataTable from '../../components/DataTable'

type Employee = {
  name: string
  role: string
  department: string
  score: number
  gaps: string[]
}

type Gap = {
  skill: string
  current: string
  required: string
  gap: string
  priority: string
}

type DepartmentScore = {
  name: string
  score: number
}

type DomainScore = {
  name: string
  score: number
  gaps: number
}

const employees: Employee[] = [
  { name: 'Ananya Sharma', role: 'Data Analyst', department: 'Finance', score: 4.6, gaps: ['Statistical'] },
  { name: 'Vikram Patel', role: 'Policy Officer', department: 'Governance', score: 3.8, gaps: ['Digital Governance'] },
  { name: 'Zeenat Zahra', role: 'Programme Lead', department: 'HR', score: 4.2, gaps: ['Managerial'] },
  { name: 'Rohan Das', role: 'Field Coordinator', department: 'Field Ops', score: 2.9, gaps: ['Technical', 'Digital'] },
  { name: 'Ishita Menon', role: 'Technology Specialist', department: 'IT', score: 4.4, gaps: ['Managerial'] },
  { name: 'Arjun Singh', role: 'Operations Manager', department: 'Field Ops', score: 3.4, gaps: ['Statistical', 'Technical'] },
  { name: 'Kavita Rao', role: 'Data Analyst', department: 'Finance', score: 3.9, gaps: ['Statistical'] },
  { name: 'Nikhil Verma', role: 'Policy Officer', department: 'Governance', score: 3.5, gaps: ['Digital Governance', 'Technical'] },
]

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist', 'Operations Manager']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial', 'Digital']

const gapDetails: Gap[] = [
  { skill: 'Machine Learning', current: '1.8', required: '4.8', gap: '3.0', priority: '92' },
  { skill: 'Digital Governance', current: '2.7', required: '4.5', gap: '1.8', priority: '86' },
  { skill: 'Statistical Methods', current: '3.1', required: '4.6', gap: '1.5', priority: '78' },
  { skill: 'Technical Delivery', current: '3.4', required: '4.7', gap: '1.3', priority: '74' },
]

function getAverage(list: Employee[]) {
  if (list.length === 0) {
    return 0
  }

  const total = list.reduce((sum, employee) => sum + employee.score, 0)
  return total / list.length
}

function getDepartmentScores(list: Employee[]) {
  const scores: DepartmentScore[] = []

  departments.slice(1).forEach(department => {
    const departmentEmployees = list.filter(employee => employee.department === department)

    if (departmentEmployees.length > 0) {
      scores.push({ name: department, score: getAverage(departmentEmployees) })
    }
  })

  return scores
}

function getDomainScores(list: Employee[]) {
  const scores: DomainScore[] = []

  domains.slice(1).forEach(domain => {
    const domainEmployees = list.filter(employee => employee.gaps.includes(domain))

    if (domainEmployees.length > 0) {
      scores.push({ name: domain, score: getAverage(domainEmployees), gaps: domainEmployees.length })
    }
  })

  return scores
}

function BarChart({ scores }: { scores: DepartmentScore[] }) {
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
        {scores.map((item, index) => (
          <div className="analytics-bar-column" key={item.name}>
            <strong style={{ height: `${item.score * 17}%` }}>{item.score.toFixed(1)}</strong>
            <span>{item.name}</span>
            <i className={index % 2 === 1 ? 'alt' : ''} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PieChart({ scores, totalGaps }: { scores: DomainScore[]; totalGaps: number }) {
  const total = scores.reduce((sum, item) => sum + item.gaps, 0)
  const first = total > 0 ? scores[0].gaps / total * 100 : 0
  const second = total > 0 ? first + (scores[1]?.gaps || 0) / total * 100 : 0
  const third = total > 0 ? second + (scores[2]?.gaps || 0) / total * 100 : 0

  return (
    <div className="analytics-pie-layout">
      <div className="analytics-pie" style={{ background: `conic-gradient(#4ea9ff 0 ${first}%, #4cc9a4 ${first}% ${second}%, #8c9fff ${second}% ${third}%, #ffc98d ${third}% 100%)` }}>
        <div>
          <strong>{totalGaps}</strong>
          <span>open gaps</span>
        </div>
      </div>
      <div className="analytics-legend">
        {scores.map((item, index) => (
          <span key={item.name}><i className={`legend-${['blue', 'teal', 'violet', 'orange'][index % 4]}`} />{item.name} <b>{total > 0 ? Math.round(item.gaps / total * 100) : 0}%</b></span>
        ))}
      </div>
    </div>
  )
}

function RadarChart({ scores }: { scores: DomainScore[] }) {
  const values = domains.slice(1).map(domain => scores.find(item => item.name === domain)?.score || 0)
  const points = values.map((value, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / 5
    const radius = Math.max(value / 5 * 90, 8)
    const x = 150 + Math.cos(angle) * radius
    const y = 125 + Math.sin(angle) * radius
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="analytics-radar">
      <svg viewBox="0 0 300 250" role="img" aria-label="Filtered competency mapping radar chart">
        <polygon className="radar-ring" points="150,22 248,93 211,210 89,210 52,93" />
        <polygon className="radar-ring inner-ring" points="150,70 207,111 185,179 115,179 93,111" />
        <polygon className="radar-data" points={points} />
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

function LineChart({ average }: { average: number }) {
  const change = Math.min(28, Math.max(4, average * 5))
  const startY = 180 - average * 10
  const endY = startY - change
  const path = `M0,${startY} C100,${startY + 5} 180,${startY - 18} 280,${startY - 12} S480,${endY + 20} 700,${endY}`

  return (
    <div className="analytics-line-chart">
      <div className="line-chart-y">
        <span>5.0</span>
        <span>4.0</span>
        <span>3.0</span>
        <span>2.0</span>
      </div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Filtered competency improvement trend">
        <defs>
          <linearGradient id="analytics-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4ea9ff" stopOpacity=".28" />
            <stop offset="1" stopColor="#4ea9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="analytics-area" d={`${path} L700,220 L0,220Z`} />
        <path className="analytics-line" d={path} />
        <circle cx="700" cy={endY} r="5" />
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
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (notice === '') {
      return
    }

    const timer = window.setTimeout(() => {
      setNotice('')
    }, 2600)

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

  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = department === 'All departments' || employee.department === department
    const matchesRole = role === 'All roles' || employee.role === role
    const matchesDomain = domain === 'All skill domains' || employee.gaps.includes(domain)

    return matchesDepartment && matchesRole && matchesDomain
  })

  const departmentScores = getDepartmentScores(filteredEmployees)
  const domainScores = getDomainScores(filteredEmployees)
  const averageScore = getAverage(filteredEmployees)
  const totalGaps = filteredEmployees.reduce((total, employee) => total + employee.gaps.length, 0)
  const largestGap = domainScores.reduce((largest, item) => item.gaps > largest.gaps ? item : largest, { name: 'None', score: 0, gaps: 0 })
  const emergingSkill = domainScores.reduce((largest, item) => item.score > largest.score ? item : largest, { name: 'None', score: 0, gaps: 0 })
  const filteredGaps = gapDetails.filter(gap => {
    if (domain === 'All skill domains') {
      return true
    }

    return gap.skill.toLowerCase().includes(domain.toLowerCase().replace('digital governance', 'digital'))
  })

  return (
    <div className="dashboard-page competency-analytics-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">INSIGHTS / WORKFORCE CAPABILITY <span className="live-dot" />LIVE DATA</div>
          <h1>Competency analytics</h1>
          <p>All cards and charts update when you choose a department, role, or skill domain.</p>
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
        <AnalyticsCard label="Average Competency Score" value={`${averageScore.toFixed(1)} / 5`} detail={`${filteredEmployees.length} employees in view`} accent="blue" />
        <AnalyticsCard label="Open Skill Gaps" value={`${totalGaps}`} detail={`${filteredEmployees.length} filtered employees`} accent="orange" />
        <AnalyticsCard label="Largest Gap" value={largestGap.name} detail={largestGap.gaps > 0 ? `${largestGap.gaps} employees affected` : 'No matching gaps'} accent="violet" />
        <AnalyticsCard label="Most Common Skill" value={emergingSkill.name} detail={emergingSkill.gaps > 0 ? `${emergingSkill.gaps} employees affected` : 'No matching skill'} accent="teal" />
      </section>

      <div className="analytics-chart-grid">
        <AnalyticsChartPanel title="Department competency" subtitle="Average scores for the filtered employees">
          <BarChart scores={departmentScores} />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Skill gap distribution" subtitle="Open gaps for the filtered employees">
          <PieChart scores={domainScores} totalGaps={totalGaps} />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Competency mapping" subtitle="Filtered strengths across skill domains">
          <RadarChart scores={domainScores} />
        </AnalyticsChartPanel>
        <AnalyticsChartPanel title="Improvement trend" subtitle="Trend based on the selected employee group">
          <LineChart average={averageScore} />
        </AnalyticsChartPanel>
      </div>

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
            'Competency Score': `${employee.score.toFixed(1)} / 5`,
            Gaps: employee.gaps.join(', '),
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
          rows={filteredGaps.map(gap => ({
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
