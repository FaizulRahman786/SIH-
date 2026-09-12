import { useEffect, useState } from 'react'
import { ChartSection } from '../../components/ChartSection'
import DataTable from '../../components/DataTable'

type Report = {
  title: string
  department: string
  date: string
  status: string
}

const reports: Report[] = [
  {
    title: 'Q3 Workforce Competency Report',
    department: 'All departments',
    date: '10 Sep 2026',
    status: 'Ready',
  },
  {
    title: 'Training Demand Summary',
    department: 'Field Ops',
    date: '08 Sep 2026',
    status: 'Ready',
  },
  {
    title: 'Digital Governance Gap Report',
    department: 'Governance',
    date: '04 Sep 2026',
    status: 'Review',
  },
  {
    title: 'Assessment Performance Report',
    department: 'IT',
    date: '29 Aug 2026',
    status: 'Ready',
  },
  {
    title: 'Employee Learning Progress',
    department: 'HR',
    date: '24 Aug 2026',
    status: 'Draft',
  },
  {
    title: 'Finance Skills Overview',
    department: 'Finance',
    date: '18 Aug 2026',
    status: 'Ready',
  },
]

const departments = [
  'All departments',
  'Finance',
  'Governance',
  'Field Ops',
  'HR',
  'IT',
]

const statuses = [
  'All statuses',
  'Ready',
  'Review',
  'Draft',
]

function ReportBarChart() {
  const labels = ['Competency', 'Training', 'Gaps', 'Assessments', 'Learning']
  const values = [12, 9, 8, 7, 5]

  // show report count bar chart here
  return (
    <div className="report-bar-chart">
      <div className="analytics-y-axis">
        <span>15</span>
        <span>10</span>
        <span>5</span>
        <span>0</span>
      </div>
      <div className="analytics-bars">
        {labels.map((label, index) => (
          <div className="analytics-bar-column" key={label}>
            <strong>{values[index]}</strong>
            <i
              className={index % 2 === 1 ? 'alt' : ''}
              style={{ height: `${values[index] / 15 * 100}%` }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReportLineChart() {
  // show report trend line chart here
  return (
    <div className="report-line-chart">
      <div className="line-chart-y">
        <span>15</span>
        <span>10</span>
        <span>5</span>
        <span>0</span>
      </div>
      <svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Report trend over time">
        <defs>
          <linearGradient id="report-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4ea9ff" stopOpacity=".28" />
            <stop offset="1" stopColor="#4ea9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="report-area" d="M0,180 C75,165 100,172 145,150 S230,145 275,132 S360,115 410,124 S500,92 545,78 S625,67 700,40 L700,220 L0,220Z" />
        <path className="report-line" d="M0,180 C75,165 100,172 145,150 S230,145 275,132 S360,115 410,124 S500,92 545,78 S625,67 700,40" />
        <circle cx="545" cy="78" r="5" />
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

function Reports() {
  const [department, setDepartment] = useState('All departments')
  const [status, setStatus] = useState('All statuses')
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
    setStatus('All statuses')
  }

  const filteredReports = reports.filter(report => {
    const matchesDepartment = department === 'All departments'
      || report.department === department
      || report.department === 'All departments'
    const matchesStatus = status === 'All statuses' || report.status === status

    return matchesDepartment && matchesStatus
  })

  return (
    <div className="dashboard-page reports-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKSPACE / REPORT CENTRE <span className="live-dot" />LIVE DATA</div>
          <h1>Reports</h1>
          <p>Create, review, and export SkillSaarthi workforce reports.</p>
        </div>
        <div className="reports-heading-actions">
          <button className="secondary-button" onClick={() => showNotice('CSV report export prepared')}>↓ Export CSV</button>
          <button className="primary-button" onClick={() => showNotice('PDF report export prepared')}>↓ Export PDF</button>
        </div>
      </div>

      <section className="reports-summary">
        <div>
          <span>Total reports</span>
          <strong>{reports.length}</strong>
          <small>Across the workspace</small>
        </div>
        <div>
          <span>Ready to export</span>
          <strong>4</strong>
          <small>Available now</small>
        </div>
        <div>
          <span>This month</span>
          <strong>12</strong>
          <small>Reports generated</small>
        </div>
      </section>

      <div className="analytics-filter-bar reports-filter-bar">
        <label>
          <span>Department</span>
          <select value={department} onChange={event => setDepartment(event.target.value)}>
            {departments.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={event => setStatus(event.target.value)}>
            {statuses.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button className="clear-filter" onClick={resetFilters}>Reset filters</button>
      </div>

      <div className="analytics-chart-grid reports-chart-grid">
        <ChartSection title="Report counts" subtitle="Reports created by category">
          <ReportBarChart />
        </ChartSection>
        <ChartSection title="Report trend" subtitle="Reports generated over time">
          <ReportLineChart />
        </ChartSection>
      </div>

      <section className="data-section reports-table-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">REPORT LIBRARY / {filteredReports.length} MATCHES</div>
            <h2>All reports</h2>
          </div>
          <button className="secondary-button" onClick={() => showNotice('Selected report marked for review')}>Mark for review <span>-&gt;</span></button>
        </div>

        {/* reports table here */}
        <DataTable
          columns={['Report Title', 'Department', 'Date', 'Status']}
          rows={filteredReports.map(report => ({
            'Report Title': report.title,
            Department: report.department,
            Date: report.date,
            Status: report.status,
          }))}
        />
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default Reports
