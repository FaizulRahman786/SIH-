import { useEffect, useState } from 'react'

type Employee = {
  id: number
  name: string
  designation: string
  department: string
  role: string
  score: number
  gaps: string[]
  learning: 'Active' | 'Review' | 'Not started'
  lastAssessment: string
}

type EmployeesProps = {
  onNavigate?: (page: string) => void
}

const employees: Employee[] = [
  { id: 1, name: 'Ananya Sharma', designation: 'Senior Data Analyst', department: 'Finance', role: 'Analyst', score: 4.6, gaps: ['Technical'], learning: 'Active', lastAssessment: '02 Sep 2026' },
  { id: 2, name: 'Vikram Patel', designation: 'Policy Officer', department: 'Governance', role: 'Officer', score: 3.8, gaps: ['Digital Governance'], learning: 'Review', lastAssessment: '28 Aug 2026' },
  { id: 3, name: 'Zeenat Zahra', designation: 'Programme Lead', department: 'HR', role: 'Manager', score: 4.2, gaps: ['Managerial'], learning: 'Active', lastAssessment: '25 Aug 2026' },
  { id: 4, name: 'Rohan Das', designation: 'Field Coordinator', department: 'Field Ops', role: 'Coordinator', score: 2.9, gaps: ['Technical', 'Digital'], learning: 'Review', lastAssessment: '19 Aug 2026' },
  { id: 5, name: 'Ishita Menon', designation: 'Technology Specialist', department: 'IT', role: 'Specialist', score: 4.4, gaps: ['Managerial'], learning: 'Active', lastAssessment: '16 Aug 2026' },
  { id: 6, name: 'Arjun Singh', designation: 'Operations Manager', department: 'Field Ops', role: 'Manager', score: 3.4, gaps: ['Statistical', 'Technical'], learning: 'Not started', lastAssessment: '11 Aug 2026' },
  { id: 7, name: 'Kavita Rao', designation: 'Data Analyst', department: 'Finance', role: 'Analyst', score: 3.9, gaps: ['Statistical'], learning: 'Active', lastAssessment: '08 Aug 2026' },
  { id: 8, name: 'Nikhil Verma', designation: 'Policy Officer', department: 'Governance', role: 'Officer', score: 3.5, gaps: ['Digital Governance', 'Technical'], learning: 'Review', lastAssessment: '04 Aug 2026' },
]

const departments = ['All departments', 'Finance', 'Governance', 'HR', 'Field Ops', 'IT']
const roles = ['All roles', 'Analyst', 'Officer', 'Manager', 'Coordinator', 'Specialist']
const competencyLevels = ['All levels', 'High', 'Steady', 'Needs focus']

function getCompetencyLevel(score: number) {
  if (score >= 4) {
    return 'High'
  }

  if (score >= 3) {
    return 'Steady'
  }

  return 'Needs focus'
}

function Employees({ onNavigate }: EmployeesProps) {
  const [department, setDepartment] = useState('All departments')
  const [role, setRole] = useState('All roles')
  const [competency, setCompetency] = useState('All levels')
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const newEmployees = employees.filter(employee => {
      const departmentMatches = department === 'All departments' || employee.department === department
      const roleMatches = role === 'All roles' || employee.role === role
      const competencyMatches = competency === 'All levels' || getCompetencyLevel(employee.score) === competency

      return departmentMatches && roleMatches && competencyMatches
    })

    setFilteredEmployees(newEmployees)
  }, [department, role, competency])

  const totalEmployees = filteredEmployees.length
  const totalScore = filteredEmployees.reduce((total, employee) => total + employee.score, 0)
  const averageScore = totalEmployees > 0 ? totalScore / totalEmployees : 0
  const missingSkills = filteredEmployees.reduce((total, employee) => total + employee.gaps.length, 0)
  const activeLearners = filteredEmployees.filter(employee => employee.learning === 'Active').length

  const showNotice = (message: string) => {
    setNotice(message)
  }

  const navigateFromEmployee = (employee: Employee, page: string) => {
    showNotice(`${page} opened for ${employee.name}`)
    onNavigate?.(page)
  }

  const exportData = () => {
    showNotice(`Employee data exported for ${filteredEmployees.length} employees`)
  }

  const clearFilters = () => {
    setDepartment('All departments')
    setRole('All roles')
    setCompetency('All levels')
  }

  return (
    <div className="dashboard-page employees-page simple-employees-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            PEOPLE / EMPLOYEE UPDATES
            <span className="live-dot" />
            LIVE DATA
          </div>
          <h1>Employee Updates</h1>
          <p>Check skill levels, find missing skills, and help employees learn.</p>
        </div>
        <div className="employee-heading-actions">
          <button className="secondary-button" onClick={() => showNotice('Training assignment opened for the selected employees')}>
            Assign Training
          </button>
          <button className="primary-button" onClick={exportData}>
            Export Employee Data
          </button>
        </div>
      </div>

      <section className="employee-filter-bar simple-employee-filters" aria-label="Employee filters">
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
          Competency Level
          <select value={competency} onChange={event => setCompetency(event.target.value)}>
            {competencyLevels.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button className="clear-filter" onClick={clearFilters}>Clear Filters</button>
      </section>

      <section className="employee-summary">
        <div>
          <span>Total Employees</span>
          <strong>{totalEmployees}</strong>
          <small>Employees in this view</small>
        </div>
        <div>
          <span>Average Skill Score</span>
          <strong>{averageScore.toFixed(1)} <em>/ 5</em></strong>
          <small>Organization target: 4.0</small>
        </div>
        <div>
          <span>Missing Skills</span>
          <strong>{missingSkills}</strong>
          <small>Skills that need attention</small>
        </div>
        <div>
          <span>Active Learners</span>
          <strong>{activeLearners}</strong>
          <small>Employees learning now</small>
        </div>
      </section>

      <section className="data-section employee-directory-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DIRECTORY / {filteredEmployees.length} MATCHES</div>
            <h2>All Employees</h2>
          </div>
          <span className="table-count">Use the links in each row</span>
        </div>

        <div className="table-wrap employee-table-wrap simple-employee-table-wrap">
          <table className="employee-table simple-employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Skill Score</th>
                <th>Missing Skills</th>
                <th>Learning</th>
                <th>Employee Pages</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-name">
                      <span className="employee-avatar">{employee.name.split(' ').map(name => name[0]).join('')}</span>
                      <div>
                        <strong>{employee.name}</strong>
                        <small>{employee.designation}</small>
                      </div>
                    </div>
                  </td>
                  <td>{employee.role}</td>
                  <td><span className="department-label">{employee.department}</span></td>
                  <td><strong className={`score score-${employee.score < 3 ? 'low' : employee.score < 4 ? 'mid' : 'high'}`}>{employee.score.toFixed(1)}</strong> / 5</td>
                  <td><span className="gap-cell"><strong>{employee.gaps.length}</strong><span>{employee.gaps.join(', ')}</span></span></td>
                  <td><span className={`status ${employee.learning === 'Active' ? 'active' : employee.learning === 'Review' ? 'review' : 'pending'}`}>{employee.learning}</span></td>
                  <td>
                    <div className="employee-page-links">
                      <button onClick={() => navigateFromEmployee(employee, 'Skill Gap Distribution')}>Gaps</button>
                      <button onClick={() => navigateFromEmployee(employee, 'Training Demand')}>Demand</button>
                      <button onClick={() => navigateFromEmployee(employee, 'Course Utilization')}>Courses</button>
                      <button onClick={() => navigateFromEmployee(employee, 'Assessments')}>Assessments</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && <div className="empty-state">No employees match these filters.</div>}
        </div>

        <p className="plain-insight employee-insight">
          {filteredEmployees.length === 0
            ? 'Try clearing the filters to see all employees.'
            : `${filteredEmployees[0].department} employees have the highest score in this filtered view. ${filteredEmployees.reduce((highest, employee) => employee.gaps.length > highest.gaps.length ? employee : highest, filteredEmployees[0]).department} has the most missing skills.`}
        </p>
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default Employees
