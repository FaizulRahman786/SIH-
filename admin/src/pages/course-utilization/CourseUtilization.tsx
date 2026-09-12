import { useEffect, useState } from 'react'
import { ChartSection } from '../../components/ChartSection'
import DataTable from '../../components/DataTable'

type Course = {
  name: string
  provider: string
  department: string
  role: string
  domain: string
  enrollments: number
  completions: number
  completionRate: number
  status: string
}

type DepartmentValue = {
  name: string
  courses: number
  learners: number
  completionRate: number
}

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist', 'Operations Manager']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial', 'Digital']

const courses: Course[] = [
  { name: 'Machine Learning Foundations', provider: 'NISG Academy', department: 'IT', role: 'Technology Specialist', domain: 'Technical', enrollments: 248, completions: 193, completionRate: 78, status: 'Popular' },
  { name: 'Digital Governance Essentials', provider: 'iGOT Karmayogi', department: 'Governance', role: 'Policy Officer', domain: 'Digital Governance', enrollments: 214, completions: 180, completionRate: 84, status: 'Popular' },
  { name: 'Applied Statistical Methods', provider: 'SkillSaarthi', department: 'Finance', role: 'Data Analyst', domain: 'Statistical', enrollments: 184, completions: 151, completionRate: 82, status: 'Active' },
  { name: 'GIS for Public Programmes', provider: 'NISG Academy', department: 'Field Ops', role: 'Field Coordinator', domain: 'Technical', enrollments: 156, completions: 111, completionRate: 71, status: 'Active' },
  { name: 'Leadership for Public Service', provider: 'SkillSaarthi', department: 'HR', role: 'Programme Lead', domain: 'Managerial', enrollments: 142, completions: 129, completionRate: 91, status: 'Active' },
  { name: 'Technical Delivery Basics', provider: 'SkillSaarthi', department: 'Field Ops', role: 'Operations Manager', domain: 'Technical', enrollments: 126, completions: 93, completionRate: 74, status: 'Active' },
  { name: 'Digital Tools for Analysts', provider: 'NISG Academy', department: 'Finance', role: 'Data Analyst', domain: 'Digital', enrollments: 108, completions: 85, completionRate: 79, status: 'Active' },
  { name: 'People Management Skills', provider: 'SkillSaarthi', department: 'IT', role: 'Technology Specialist', domain: 'Managerial', enrollments: 84, completions: 74, completionRate: 88, status: 'Active' },
]

function getFilteredCourses(department: string, role: string, domain: string) {
  return courses.filter(course => {
    const departmentMatches = department === 'All departments' || course.department === department
    const roleMatches = role === 'All roles' || course.role === role
    const domainMatches = domain === 'All skill domains' || course.domain === domain

    return departmentMatches && roleMatches && domainMatches
  })
}

function getDepartmentValues(filteredCourses: Course[]) {
  const values: DepartmentValue[] = []

  departments.slice(1).forEach(department => {
    const departmentCourses = filteredCourses.filter(course => course.department === department)

    if (departmentCourses.length > 0) {
      const learners = departmentCourses.reduce((total, course) => total + course.enrollments, 0)
      const completionRate = departmentCourses.reduce((total, course) => total + course.completionRate, 0) / departmentCourses.length
      values.push({ name: department, courses: departmentCourses.length, learners, completionRate })
    }
  })

  return values
}

function EnrollmentBarChart({ values }: { values: Course[] }) {
  const largest = Math.max(...values.map(course => course.enrollments), 1)

  return (
    <div className="course-bar-chart">
      <div className="analytics-y-axis">
        <span>{largest}</span>
        <span>{Math.round(largest * .75)}</span>
        <span>{Math.round(largest * .5)}</span>
        <span>{Math.round(largest * .25)}</span>
        <span>0</span>
      </div>
      <div className="course-bars">
        {values.slice(0, 5).map(course => (
          <div className="course-bar-group" key={course.name}>
            <strong>{course.enrollments}</strong>
            <div className="course-bar-pair">
              <i className="course-enrollment-bar" style={{ height: `${course.enrollments / largest * 100}%` }} />
              <i className="course-completion-bar" style={{ height: `${course.completions / largest * 100}%` }} />
            </div>
            <span>{course.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
      <div className="course-chart-legend">
        <span><i className="course-enrollment-bar" />Enrollments</span>
        <span><i className="course-completion-bar" />Completions</span>
      </div>
    </div>
  )
}

function DomainPieChart({ values }: { values: Course[] }) {
  const totals = domains.slice(1).map(domain => ({ name: domain, total: values.filter(course => course.domain === domain).reduce((sum, course) => sum + course.enrollments, 0) })).filter(item => item.total > 0)
  const total = totals.reduce((sum, item) => sum + item.total, 0)
  const first = total > 0 ? totals[0]?.total / total * 100 || 0 : 0
  const second = total > 0 ? first + (totals[1]?.total || 0) / total * 100 : 0
  const third = total > 0 ? second + (totals[2]?.total || 0) / total * 100 : 0

  return (
    <div className="course-pie-layout">
      <div className="course-pie" style={{ background: `conic-gradient(#4ea9ff 0 ${first}%, #4cc9a4 ${first}% ${second}%, #8c9fff ${second}% ${third}%, #ffc98d ${third}% 100%)` }}>
        <div>
          <strong>{total}</strong>
          <span>enrollments</span>
        </div>
      </div>
      <div className="analytics-legend">
        {totals.map((item, index) => <span key={item.name}><i className={`legend-${['blue', 'teal', 'violet', 'orange'][index % 4]}`} />{item.name} <b>{Math.round(item.total / total * 100)}%</b></span>)}
      </div>
    </div>
  )
}

function UtilizationLineChart({ average }: { average: number }) {
  const start = Math.max(40, 180 - average)
  const end = Math.max(30, start - 70)
  const path = `M0,${start} C90,${start - 10} 140,${start + 6} 220,${start - 20} S380,${start - 35} 470,${end + 22} S610,${end + 10} 700,${end}`

  return (
    <div className="course-line-chart">
      <div className="line-chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0</span></div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Filtered course utilization trend">
        <defs><linearGradient id="course-utilization-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#4cc9a4" stopOpacity=".3" /><stop offset="1" stopColor="#4cc9a4" stopOpacity="0" /></linearGradient></defs>
        <path className="course-utilization-area" d={`${path} L700,220 L0,220Z`} />
        <path className="course-utilization-line" d={path} />
        <circle cx="700" cy={end} r="5" />
      </svg>
      <div className="analytics-line-labels"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span></div>
    </div>
  )
}

function CompletionStackedChart({ values }: { values: Course[] }) {
  return (
    <div className="course-stacked-chart">
      <div className="course-chart-legend"><span><i className="course-enrollment-bar" />Enrolled</span><span><i className="course-completion-bar" />Completed</span><span><i className="course-dropout-bar" />Dropout</span></div>
      <div className="course-stacked-bars">
        {values.slice(0, 5).map(course => (
          <div className="course-stack-column" key={course.name}>
            <div className="course-stack">
              <i className="course-enrollment-bar" style={{ height: '100%' }} />
              <i className="course-completion-bar" style={{ height: `${course.completionRate}%` }} />
              <i className="course-dropout-bar" style={{ height: `${100 - course.completionRate}%` }} />
            </div>
            <span>{course.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CourseUtilization() {
  const [department, setDepartment] = useState('All departments')
  const [role, setRole] = useState('All roles')
  const [domain, setDomain] = useState('All skill domains')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (notice === '') return
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

  const filteredCourses = getFilteredCourses(department, role, domain)
  const departmentValues = getDepartmentValues(filteredCourses)
  const totalEnrollments = filteredCourses.reduce((sum, course) => sum + course.enrollments, 0)
  const totalCompletions = filteredCourses.reduce((sum, course) => sum + course.completions, 0)
  const averageCompletion = filteredCourses.length > 0 ? filteredCourses.reduce((sum, course) => sum + course.completionRate, 0) / filteredCourses.length : 0
  const popularCourse = filteredCourses.reduce((popular, course) => course.enrollments > popular.enrollments ? course : popular, { name: 'None', enrollments: 0 } as Course)
  const underusedCourses = filteredCourses.filter(course => course.enrollments < 130).length

  return (
    <div className="dashboard-page course-utilization-page">
      <div className="page-heading">
        <div><div className="eyebrow">LEARNING CATALOGUE / COURSE PERFORMANCE <span className="live-dot" />LIVE DATA</div><h1>Course utilization</h1><p>All cards, charts, and graphs update with the selected filters.</p></div>
        <div className="analytics-heading-actions"><button className="secondary-button" onClick={() => showNotice('CSV course report prepared')}>↓ Export CSV</button><button className="primary-button" onClick={() => showNotice('PDF course report prepared')}>↓ Export PDF</button></div>
      </div>

      <div className="analytics-filter-bar">
        <label><span>Department</span><select value={department} onChange={event => setDepartment(event.target.value)}>{departments.map(item => <option key={item}>{item}</option>)}</select></label>
        <label><span>Role</span><select value={role} onChange={event => setRole(event.target.value)}>{roles.map(item => <option key={item}>{item}</option>)}</select></label>
        <label><span>Skill domain</span><select value={domain} onChange={event => setDomain(event.target.value)}>{domains.map(item => <option key={item}>{item}</option>)}</select></label>
        <button className="clear-filter" onClick={resetFilters}>Reset filters</button>
      </div>

      <section className="course-card-grid">
        <article className="course-card course-card-blue"><div>Total Courses</div><strong>{filteredCourses.length}</strong><span>Matching courses</span></article>
        <article className="course-card course-card-teal"><div>Active Learners</div><strong>{totalEnrollments}</strong><span>{totalCompletions} completed</span></article>
        <article className="course-card course-card-orange"><div>Average Completion Rate</div><strong>{averageCompletion.toFixed(1)}%</strong><span>Filtered course average</span></article>
        <article className="course-card course-card-violet"><div>Most Popular Course</div><strong>{popularCourse.name}</strong><span>{popularCourse.enrollments} active learners</span></article>
        <article className="course-card course-card-pink"><div>Underutilized Courses</div><strong>{underusedCourses}</strong><span>Need catalogue review</span></article>
      </section>

      <div className="analytics-chart-grid course-chart-grid">
        <ChartSection title="Enrollments versus completions" subtitle="Filtered course participation"><EnrollmentBarChart values={filteredCourses} /></ChartSection>
        <ChartSection title="Domain distribution" subtitle="Filtered share of course enrollments"><DomainPieChart values={filteredCourses} /></ChartSection>
        <ChartSection title="Utilization trend" subtitle="Filtered average utilization"><UtilizationLineChart average={averageCompletion} /></ChartSection>
        <ChartSection title="Completion and dropout" subtitle="Filtered course outcome rates"><CompletionStackedChart values={filteredCourses} /></ChartSection>
      </div>

      <section className="data-section analytics-data-section"><div className="section-heading"><div><div className="eyebrow">COURSE CATALOGUE / {filteredCourses.length} COURSES</div><h2>Course utilization table</h2></div><button className="secondary-button" onClick={() => showNotice('Underutilized courses marked for review')}>Review underutilized <span>-&gt;</span></button></div><DataTable columns={['Course Name', 'Provider', 'Department', 'Role', 'Enrollments', 'Completions', 'Completion Rate', 'Status']} rows={filteredCourses.map(course => ({ 'Course Name': course.name, Provider: course.provider, Department: course.department, Role: course.role, Enrollments: `${course.enrollments}`, Completions: `${course.completions}`, 'Completion Rate': `${course.completionRate}%`, Status: course.status }))} /></section>

      <section className="data-section analytics-data-section"><div className="section-heading"><div><div className="eyebrow">DEPARTMENT VIEW</div><h2>Department course table</h2></div></div><DataTable columns={['Department', 'Requested Courses', 'Active Learners', 'Completion Rate']} rows={departmentValues.map(item => ({ Department: item.name, 'Requested Courses': `${item.courses}`, 'Active Learners': `${item.learners}`, 'Completion Rate': `${item.completionRate.toFixed(0)}%` }))} /></section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default CourseUtilization
