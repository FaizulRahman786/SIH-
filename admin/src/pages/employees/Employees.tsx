import { useEffect, useState } from 'react'
import AnalyticsSection from '../../components/AnalyticsSection'
import EmployeeProfileModal from '../../components/EmployeeProfileModal'
import EmployeeTable, { type Employee } from '../../components/EmployeeTable'
import FilterBar from '../../components/FilterBar'

const employees: Employee[] = [
  {
    id: 1,
    name: 'Ananya Sharma',
    initials: 'AS',
    designation: 'Senior Data Analyst',
    department: 'Finance',
    role: 'Analyst',
    score: 4.6,
    gaps: ['Technical'],
    learning: 'Active',
    lastAssessment: '02 Sep 2026',
    experience: '8 years',
    goal: 'Lead data strategy',
    mentor: 'Dr. Meera Rao',
    history: [
      { date: '02 Sep 2026', title: 'Quarterly competency review', score: '4.6 / 5', note: 'Technical competency updated' },
      { date: '14 Jun 2026', title: 'Statistical methods quiz', score: '92%', note: 'Passed with distinction' },
    ],
  },
  {
    id: 2,
    name: 'Vikram Patel',
    initials: 'VP',
    designation: 'Policy Officer',
    department: 'Governance',
    role: 'Officer',
    score: 3.8,
    gaps: ['Digital Governance'],
    learning: 'Review',
    lastAssessment: '28 Aug 2026',
    experience: '5 years',
    goal: 'Shape digital policy',
    mentor: 'Rakesh Menon',
    history: [
      { date: '28 Aug 2026', title: 'Digital governance assessment', score: '3.8 / 5', note: 'Gap identified in data ethics' },
      { date: '07 May 2026', title: 'Policy foundations quiz', score: '84%', note: 'Competency updated' },
    ],
  },
  {
    id: 3,
    name: 'Zeenat Zahra',
    initials: 'ZZ',
    designation: 'Programme Lead',
    department: 'HR',
    role: 'Manager',
    score: 4.2,
    gaps: ['Managerial'],
    learning: 'Active',
    lastAssessment: '25 Aug 2026',
    experience: '11 years',
    goal: 'Build high-performing teams',
    mentor: 'Priya Nair',
    history: [
      { date: '25 Aug 2026', title: 'Leadership competency review', score: '4.2 / 5', note: 'Managerial competency updated' },
      { date: '09 Apr 2026', title: 'People leadership quiz', score: '89%', note: 'Passed' },
    ],
  },
  {
    id: 4,
    name: 'Rohan Das',
    initials: 'RD',
    designation: 'Field Coordinator',
    department: 'Field Ops',
    role: 'Coordinator',
    score: 2.9,
    gaps: ['Technical', 'Digital'],
    learning: 'Review',
    lastAssessment: '19 Aug 2026',
    experience: '3 years',
    goal: 'Lead field programmes',
    mentor: 'Amit Kulkarni',
    history: [
      { date: '19 Aug 2026', title: 'Field readiness assessment', score: '2.9 / 5', note: 'Critical technical gap flagged' },
      { date: '12 Mar 2026', title: 'Digital tools quiz', score: '68%', note: 'Retake recommended' },
    ],
  },
  {
    id: 5,
    name: 'Ishita Menon',
    initials: 'IM',
    designation: 'Technology Specialist',
    department: 'IT',
    role: 'Specialist',
    score: 4.4,
    gaps: ['Managerial'],
    learning: 'Active',
    lastAssessment: '16 Aug 2026',
    experience: '7 years',
    goal: 'Own platform reliability',
    mentor: 'Sanjay Kapoor',
    history: [
      { date: '16 Aug 2026', title: 'Technical competency review', score: '4.4 / 5', note: 'Strong technical performance' },
    ],
  },
  {
    id: 6,
    name: 'Arjun Singh',
    initials: 'AR',
    designation: 'Operations Manager',
    department: 'Field Ops',
    role: 'Manager',
    score: 3.4,
    gaps: ['Statistical', 'Technical'],
    learning: 'Not started',
    lastAssessment: '11 Aug 2026',
    experience: '9 years',
    goal: 'Modernise operations',
    mentor: 'Unassigned',
    history: [
      { date: '11 Aug 2026', title: 'Operations review', score: '3.4 / 5', note: 'Learning path recommended' },
    ],
  },
]

const departments = ['Finance', 'Governance', 'HR', 'Field Ops', 'IT']
const roles = ['Analyst', 'Officer', 'Manager', 'Coordinator', 'Specialist']
const pageSize = 4

function Employees() {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All departments')
  const [role, setRole] = useState('All roles')
  const [competency, setCompetency] = useState('All levels')
  const [page, setPage] = useState(1)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [compareIds, setCompareIds] = useState<number[]>([])
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

  function resetPage() {
    setPage(1)
  }

  function updateSearch(value: string) {
    setSearch(value)
    resetPage()
  }

  function updateDepartment(value: string) {
    setDepartment(value)
    resetPage()
  }

  function updateRole(value: string) {
    setRole(value)
    resetPage()
  }

  function updateCompetency(value: string) {
    setCompetency(value)
    resetPage()
  }

  function toggleCompare(id: number) {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(item => item !== id))
      return
    }

    if (compareIds.length < 2) {
      setCompareIds([...compareIds, id])
    }
  }

  const filteredEmployees = employees.filter(employee => {
    const employeeText = `${employee.name} ${employee.designation} ${employee.department}`
    const matchesSearch = employeeText.toLowerCase().includes(search.toLowerCase())
    const matchesDepartment = department === 'All departments' || employee.department === department
    const matchesRole = role === 'All roles' || employee.role === role
    const matchesCompetency = competency === 'All levels'
      || competency === 'High' && employee.score >= 4
      || competency === 'Steady' && employee.score >= 3 && employee.score < 4
      || competency === 'Needs focus' && employee.score < 3

    return matchesSearch && matchesDepartment && matchesRole && matchesCompetency
  })

  const pageCount = Math.max(1, Math.ceil(filteredEmployees.length / pageSize))
  const firstEmployee = (page - 1) * pageSize
  const visibleEmployees = filteredEmployees.slice(firstEmployee, firstEmployee + pageSize)
  const lastEmployee = Math.min(page * pageSize, filteredEmployees.length)

  function exportData(format: string) {
    showNotice(`${format} export prepared for ${filteredEmployees.length} employees`)
  }

  return (
    <div className="dashboard-page employees-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            PEOPLE / WORKFORCE DIRECTORY
            <span className="live-dot" />
            LIVE DATA
          </div>
          <h1>Employee directory</h1>
          <p>Track capability, close skill gaps, and guide every learning journey.</p>
        </div>
        <div className="employee-heading-actions">
          <button className="secondary-button" onClick={() => exportData('CSV')}>↓ Export CSV</button>
          <button className="primary-button" onClick={() => exportData('PDF')}>↓ Export PDF</button>
        </div>
      </div>

      <section className="employee-summary">
        <div><span>Total employees</span><strong>1,284</strong><small>+8.4% this month</small></div>
        <div><span>Average competency</span><strong>3.8 <em>/ 5</em></strong><small className="positive">+0.3 this quarter</small></div>
        <div><span>Critical gaps</span><strong>186</strong><small className="warning">14 need attention</small></div>
        <div><span>Active learning</span><strong>742</strong><small className="positive">57.8% of workforce</small></div>
      </section>

      <AnalyticsSection />

      <section className="data-section employee-directory-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DIRECTORY / {filteredEmployees.length} MATCHES</div>
            <h2>All employees</h2>
          </div>
          {compareIds.length > 0 && (
            <button className="secondary-button" onClick={() => showNotice(`Comparing ${compareIds.length} selected employees`)}>
              Compare selected <span>-&gt;</span>
            </button>
          )}
        </div>

        <FilterBar
          search={search}
          department={department}
          role={role}
          competency={competency}
          departments={departments}
          roles={roles}
          onSearch={updateSearch}
          onDepartment={updateDepartment}
          onRole={updateRole}
          onCompetency={updateCompetency}
        />

        <EmployeeTable
          employees={visibleEmployees}
          onSelect={setSelectedEmployee}
          selectedIds={compareIds}
          onToggleCompare={toggleCompare}
        />

        <div className="pagination">
          <span>Showing {filteredEmployees.length === 0 ? 0 : firstEmployee + 1}–{lastEmployee} of {filteredEmployees.length} employees</span>
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous page">←</button>
            <b>{page}</b>
            <span>of {pageCount}</span>
            <button disabled={page === pageCount} onClick={() => setPage(page + 1)} aria-label="Next page">→</button>
          </div>
        </div>
      </section>

      {selectedEmployee && (
        <EmployeeProfileModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onFlag={() => showNotice(`${selectedEmployee.name} flagged for critical review`)}
          onAssign={() => showNotice(`Programme assignment opened for ${selectedEmployee.name}`)}
        />
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default Employees
