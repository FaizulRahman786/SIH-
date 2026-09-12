import { useMemo, useState } from 'react'

type Employee = {
  name: string
  role: string
  department: string
  domain: string
  score: number
  gap: string
}

const employees: Employee[] = [
  { name: 'Ananya Sharma', role: 'Data Analyst', department: 'Finance', domain: 'Statistical', score: 4.6, gap: 'Statistical' },
  { name: 'Vikram Patel', role: 'Policy Officer', department: 'Governance', domain: 'Digital Governance', score: 3.8, gap: 'Digital Governance' },
  { name: 'Zeenat Zahra', role: 'Programme Lead', department: 'HR', domain: 'Managerial', score: 4.2, gap: 'Managerial' },
  { name: 'Rohan Das', role: 'Field Coordinator', department: 'Field Ops', domain: 'Technical', score: 2.9, gap: 'Technical, Digital' },
  { name: 'Meera Nair', role: 'Training Manager', department: 'HR', domain: 'Managerial', score: 3.4, gap: 'Coaching' },
  { name: 'Arjun Singh', role: 'Systems Officer', department: 'IT', domain: 'Technical', score: 3.1, gap: 'Cloud Operations' },
]

const departments = ['All departments', 'Finance', 'Governance', 'HR', 'Field Ops', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Training Manager', 'Systems Officer']
const domains = ['All skill domains', 'Technical', 'Digital Governance', 'Statistical', 'Managerial']

function Dashboard() {
  const [department, setDepartment] = useState('All departments')
  const [role, setRole] = useState('All roles')
  const [domain, setDomain] = useState('All skill domains')
  const [actionMessage, setActionMessage] = useState('')

  const filteredEmployees = useMemo(() => employees.filter(employee => {
    const matchesDepartment = department === 'All departments' || employee.department === department
    const matchesRole = role === 'All roles' || employee.role === role
    const matchesDomain = domain === 'All skill domains' || employee.domain === domain

    return matchesDepartment && matchesRole && matchesDomain
  }), [department, role, domain])

  const showActionMessage = (message: string) => {
    setActionMessage(message)
  }

  return (
    <div className="dashboard-page admin-dashboard">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            THURSDAY, 10 SEPTEMBER 2026
            <span className="live-dot" />
            LIVE ADMIN OVERVIEW
          </div>
          <h1>Good morning, Danish.</h1>
          <p>Monitor capability, find priority gaps, and move people into training.</p>
        </div>
        <div className="dashboard-actions">
          <button className="secondary-button dashboard-action" onClick={() => showActionMessage('Training assignment started for the selected view.')}>
            Assign Training
          </button>
          <button className="secondary-button dashboard-action" onClick={() => showActionMessage('Priority gap flagged for admin review.')}>
            Flag Gap
          </button>
          <button className="primary-button" onClick={() => showActionMessage('Report export is ready to download.')}>
            Export Report
          </button>
        </div>
      </div>

      <section className="dashboard-filter-bar" aria-label="Dashboard filters">
        <label>
          Department
          <select value={department} onChange={event => setDepartment(event.target.value)}>
            {departments.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Role
          <select value={role} onChange={event => setRole(event.target.value)}>
            {roles.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Skill domain
          <select value={domain} onChange={event => setDomain(event.target.value)}>
            {domains.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button className="clear-filter" onClick={() => { setDepartment('All departments'); setRole('All roles'); setDomain('All skill domains') }}>
          Clear filters
        </button>
      </section>

      {actionMessage && <div className="dashboard-notice" role="status">{actionMessage}</div>}

      <section className="metrics-grid">
        <div className="dashboard-card teal"><span>Total employees</span><strong>1,284</strong><small>+8.4% vs last month</small></div>
        <div className="dashboard-card violet"><span>Average competency</span><strong>3.8 / 5</strong><small>Org benchmark: 4.0 / 5</small></div>
        <div className="dashboard-card orange"><span>Critical skill gaps</span><strong>186</strong><small>12.6% fewer than last month</small></div>
        <div className="dashboard-card blue"><span>Active learners</span><strong>742</strong><small>57.8% of all employees</small></div>
        <div className="dashboard-card pink"><span>Training demand</span><strong>+18.7%</strong><small>6.2% above target</small></div>
      </section>

      <section className="data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PEOPLE</div>
            <h2>Employee competency</h2>
          </div>
          <span className="table-count">Showing {filteredEmployees.length} employees</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Role</th><th>Department</th><th>Domain</th><th>Score</th><th>Priority gap</th></tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.name}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>{employee.domain}</td>
                  <td className={employee.score < 3.5 ? 'score-low' : 'score-high'}>{employee.score.toFixed(1)} / 5</td>
                  <td>{employee.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEmployees.length === 0 && <p className="plain-insight">No employees match these filters.</p>}
      </section>
    </div>
  )
}

export default Dashboard
