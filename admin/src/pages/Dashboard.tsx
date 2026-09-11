import DashboardCard from '../components/DashboardCard'
import DataTable from '../components/DataTable'
import { ChartSection, DepartmentChart, DemandChart, GapChart, RadarChart } from '../components/ChartSection'

const employees = [
  { Name: 'Ananya Sharma', Role: 'Data Analyst', Department: 'Finance', 'Competency Score': '4.6 / 5', Gaps: 'Statistical' },
  { Name: 'Vikram Patel', Role: 'Policy Officer', Department: 'Governance', 'Competency Score': '3.8 / 5', Gaps: 'Digital Governance' },
  { Name: 'Zeenat Zahra', Role: 'Programme Lead', Department: 'HR', 'Competency Score': '4.2 / 5', Gaps: 'Managerial' },
  { Name: 'Rohan Das', Role: 'Field Coordinator', Department: 'Field Ops', 'Competency Score': '2.9 / 5', Gaps: 'Technical, Digital' },
]
const courses = [
  { 'Course Title': 'Applied Statistical Methods', Provider: 'NISG Academy', Enrollments: '184', 'Completion Rate': '82%' },
  { 'Course Title': 'Digital Governance Essentials', Provider: 'iGOT Karmayogi', Enrollments: '156', 'Completion Rate': '76%' },
  { 'Course Title': 'Leadership for Public Service', Provider: 'SkillSaarthi', Enrollments: '98', 'Completion Rate': '91%' },
]

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            THURSDAY, 10 SEPTEMBER 2026
            <span className="live-dot" />
            LIVE OVERVIEW
          </div>
          <h1>Good morning, Danish.</h1>
          <p>Here is the latest pulse of the SkillSaarthi learning programme.</p>
        </div>
        <button className="primary-button">
          <span>+</span>
          Create report
        </button>
      </div>

      <section className="metrics-grid">
        <DashboardCard
          label="Total Employees"
          value="1,284"
          change="+8.4%"
          detail="vs last month"
          accent="teal"
        />
        <DashboardCard
          label="Average Competency Score"
          value="3.8 / 5"
          change="+0.3"
          detail="vs last quarter"
          accent="violet"
        />
        <DashboardCard
          label="Critical Skill Gaps"
          value="186"
          change="-12.6%"
          detail="high-priority gaps"
          accent="orange"
        />
        <DashboardCard
          label="Active Learners"
          value="742"
          change="+14.2%"
          detail="currently enrolled"
          accent="blue"
        />
        <DashboardCard
          label="Training Demand Trend"
          value="+18.7%"
          change="up 6.2%"
          detail="enrollment growth"
          accent="pink"
        />
      </section>

      <div className="charts-top">
        <ChartSection
          title="Competency by department"
          subtitle="Average competency score on a 0-5 scale"
        >
          <DepartmentChart />
        </ChartSection>
        <ChartSection
          title="Training demand trend"
          subtitle="Enrollment growth over the last 9 months"
          className="activity-panel"
        >
          <div className="chart-legend">
            <span><i />Enrollments</span>
            <span className="muted-legend"><i />Target</span>
          </div>
          <DemandChart />
        </ChartSection>
      </div>

      <div className="charts-bottom">
        <ChartSection
          title="Skill gap distribution"
          subtitle="Open gaps by domain"
        >
          <GapChart />
        </ChartSection>
        <ChartSection
          title="Emerging skill trends"
          subtitle="Priority skills gaining demand"
        >
          <RadarChart />
        </ChartSection>
        <section className="insight-panel">
          <div className="eyebrow">SRS INSIGHT</div>
          <h2>Technical capability is rising.</h2>
          <p>
            Digital governance demand is up <strong>22%</strong> this quarter,
            led by Finance and Field Ops.
          </p>
          <div className="insight-line">
            <span style={{ width: '82%' }} />
          </div>
          <small>82% of priority learning paths mapped</small>
          <button className="text-button">
            View competency report
            <span>-&gt;</span>
          </button>
        </section>
      </div>

      <section className="data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PEOPLE</div>
            <h2>Employee competency</h2>
          </div>
          <button className="secondary-button">
            View all
            <span>-&gt;</span>
          </button>
        </div>
        <DataTable
          columns={['Name', 'Role', 'Department', 'Competency Score', 'Gaps']}
          rows={employees}
        />
      </section>

      <section className="data-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">LEARNING CATALOGUE</div>
            <h2>Course utilization</h2>
          </div>
          <button className="secondary-button">
            Manage courses
            <span>-&gt;</span>
          </button>
        </div>
        <DataTable
          columns={['Course Title', 'Provider', 'Enrollments', 'Completion Rate']}
          rows={courses}
        />
      </section>

      <section className="reports-strip">
        <div>
          <div className="eyebrow">REPORTS & ANALYTICS</div>
          <h2>Export SkillSaarthi data</h2>
          <p>Generate a detailed report using your preferred filters.</p>
        </div>
        <div className="report-controls">
          <select aria-label="Filter by department">
            <option>All departments</option>
            <option>Finance</option>
            <option>Governance</option>
            <option>Field Ops</option>
          </select>
          <select aria-label="Filter by role">
            <option>All roles</option>
            <option>Data Analyst</option>
            <option>Policy Officer</option>
          </select>
          <select aria-label="Filter by skill domain">
            <option>All skill domains</option>
            <option>Statistical</option>
            <option>Technical</option>
            <option>Digital Governance</option>
          </select>
          <button className="export-button">
            CSV <span>↓</span>
          </button>
          <button className="export-button violet-button">
            PDF <span>↓</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
