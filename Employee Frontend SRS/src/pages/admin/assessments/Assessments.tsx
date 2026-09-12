import '../../../styles/admin-legacy.css'
import { useEffect, useState } from 'react'
import { ChartSection } from '../../../components/admin/ChartSection'
import DataTable from '../../../components/admin/DataTable'

type Assessment = {
  employee: string
  role: string
  department: string
  test: string
  skill: string
  score: number
  result: string
  type: string
}

type SkillScore = {
  skill: string
  score: number
  benchmark: number
}

const departments = ['All departments', 'Finance', 'Governance', 'Field Ops', 'HR', 'IT']
const roles = ['All roles', 'Data Analyst', 'Policy Officer', 'Programme Lead', 'Field Coordinator', 'Technology Specialist']
const domains = ['All skill domains', 'Statistical', 'Technical', 'Digital Governance', 'Managerial']

const assessments: Assessment[] = [
  { employee: 'Ananya Sharma', role: 'Data Analyst', department: 'Finance', test: 'Statistical Methods Test', skill: 'Statistical', score: 4.6, result: 'Pass', type: 'MCQ' },
  { employee: 'Vikram Patel', role: 'Policy Officer', department: 'Governance', test: 'Digital Governance Assessment', skill: 'Digital Governance', score: 3.1, result: 'Fail', type: 'Case Study' },
  { employee: 'Zeenat Zahra', role: 'Programme Lead', department: 'HR', test: 'Leadership Case Study', skill: 'Managerial', score: 4.2, result: 'Pass', type: 'Case Study' },
  { employee: 'Rohan Das', role: 'Field Coordinator', department: 'Field Ops', test: 'Python Coding Test', skill: 'Technical', score: 2.4, result: 'Fail', type: 'Coding' },
  { employee: 'Ishita Menon', role: 'Technology Specialist', department: 'IT', test: 'Practical Delivery Review', skill: 'Technical', score: 4.4, result: 'Pass', type: 'Practical' },
  { employee: 'Kavita Rao', role: 'Data Analyst', department: 'Finance', test: 'Statistics Review', skill: 'Statistical', score: 3.9, result: 'Pass', type: 'MCQ' },
  { employee: 'Nikhil Verma', role: 'Policy Officer', department: 'Governance', test: 'Policy Design Test', skill: 'Digital Governance', score: 3.5, result: 'Pass', type: 'MCQ' },
]

function getAverage(items: Assessment[]) {
  if (items.length === 0) return 0
  return items.reduce((total, item) => total + item.score, 0) / items.length
}

function getSkillScores(items: Assessment[]) {
  const values: SkillScore[] = []

  domains.slice(1).forEach(domain => {
    const domainItems = items.filter(item => item.skill === domain || item.skill === 'Statistical' && domain === 'Statistical')

    if (domainItems.length > 0) {
      values.push({ skill: domain, score: getAverage(domainItems), benchmark: 4.5 })
    }
  })

  return values
}

function AssessmentCard({ label, value, detail, accent }: { label: string; value: string; detail: string; accent: string }) {
  return <article className={`assessment-card assessment-card-${accent}`}><div>{label}</div><strong>{value}</strong><span>{detail}</span></article>
}

function AssessmentBarChart({ items }: { items: Assessment[] }) {
  const values = departments.slice(1).map(department => ({ name: department, score: getAverage(items.filter(item => item.department === department)) })).filter(item => item.score > 0)

  return <div className="assessment-bar-chart"><div className="analytics-y-axis"><span>5.0</span><span>4.0</span><span>3.0</span><span>2.0</span><span>0</span></div><div className="analytics-bars">{values.map((item, index) => <div className="analytics-bar-column" key={item.name}><strong>{item.score.toFixed(1)}</strong><i style={{ height: `${item.score * 17}%` }} className={index % 2 === 1 ? 'alt' : ''} /><span>{item.name}</span></div>)}</div></div>
}

function AssessmentPieChart({ items }: { items: Assessment[] }) {
  const types = ['MCQ', 'Coding', 'Case Study', 'Practical'].map(type => ({ name: type, count: items.filter(item => item.type === type).length })).filter(item => item.count > 0)
  const total = items.length
  const first = total > 0 ? types[0]?.count / total * 100 || 0 : 0
  const second = total > 0 ? first + (types[1]?.count || 0) / total * 100 : 0
  const third = total > 0 ? second + (types[2]?.count || 0) / total * 100 : 0

  return <div className="assessment-pie-layout"><div className="assessment-pie" style={{ background: `conic-gradient(#4ea9ff 0 ${first}%, #4cc9a4 ${first}% ${second}%, #8c9fff ${second}% ${third}%, #ffc98d ${third}% 100%)` }}><div><strong>{total}</strong><span>tests</span></div></div><div className="analytics-legend">{types.map((item, index) => <span key={item.name}><i className={`legend-${['blue', 'teal', 'violet', 'orange'][index % 4]}`} />{item.name} <b>{total > 0 ? Math.round(item.count / total * 100) : 0}%</b></span>)}</div></div>
}

function AssessmentLineChart({ average }: { average: number }) {
  const start = Math.max(40, 180 - average * 10)
  const end = Math.max(35, start - 70)
  const path = `M0,${start} C80,${start - 5} 150,${start + 8} 230,${start - 20} S390,${start - 35} 480,${end + 20} S620,${end + 10} 700,${end}`

  return <div className="assessment-line-chart"><div className="line-chart-y"><span>5.0</span><span>4.0</span><span>3.0</span><span>2.0</span></div><svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Filtered assessment performance trend"><defs><linearGradient id="assessment-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#4ea9ff" stopOpacity=".28" /><stop offset="1" stopColor="#4ea9ff" stopOpacity="0" /></linearGradient></defs><path className="assessment-area" d={`${path} L700,220 L0,220Z`} /><path className="assessment-line" d={path} /><circle cx="700" cy={end} r="5" /></svg><div className="analytics-line-labels"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span></div></div>
}

function AssessmentRadarChart({ scores }: { scores: SkillScore[] }) {
  const values = domains.slice(1).map(domain => scores.find(item => item.skill === domain)?.score || 0)
  const points = values.map((value, index) => { const angle = -Math.PI / 2 + index * Math.PI * 2 / 5; const radius = Math.max(value / 5 * 90, 8); return `${150 + Math.cos(angle) * radius},${125 + Math.sin(angle) * radius}` }).join(' ')

  return <div className="assessment-radar"><svg viewBox="0 0 300 250" role="img" aria-label="Filtered assessment skill strengths and weaknesses"><polygon className="radar-ring" points="150,22 248,93 211,210 89,210 52,93" /><polygon className="radar-ring inner-ring" points="150,70 207,111 185,179 115,179 93,111" /><polygon className="assessment-radar-data" points={points} /><line x1="150" y1="22" x2="150" y2="210" /><line x1="52" y1="93" x2="248" y2="93" /><line x1="89" y1="210" x2="211" y2="210" /></svg><span className="assessment-radar-label assessment-radar-top">Statistical</span><span className="assessment-radar-label assessment-radar-right">Technical</span><span className="assessment-radar-label assessment-radar-bottom">Managerial</span><span className="assessment-radar-label assessment-radar-left">Digital Governance</span></div>
}

function Assessments() {
  const [department, setDepartment] = useState('All departments')
  const [role, setRole] = useState('All roles')
  const [domain, setDomain] = useState('All skill domains')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (notice === '') return
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  function showNotice(message: string) { setNotice(message) }

  function resetFilters() {
    setDepartment('All departments')
    setRole('All roles')
    setDomain('All skill domains')
  }

  const filteredAssessments = assessments.filter(item => {
    const departmentMatches = department === 'All departments' || item.department === department
    const roleMatches = role === 'All roles' || item.role === role
    const domainMatches = domain === 'All skill domains' || item.skill === domain
    return departmentMatches && roleMatches && domainMatches
  })
  const averageScore = getAverage(filteredAssessments)
  const failures = filteredAssessments.filter(item => item.result === 'Fail').length
  const skillScores = getSkillScores(filteredAssessments)
  const topSkill = skillScores.reduce((top, item) => item.score > top.score ? item : top, { skill: 'None', score: 0, benchmark: 0 })

  return <div className="dashboard-page assessments-page">
    <div className="page-heading"><div><div className="eyebrow">PEOPLE / ASSESSMENT CENTRE <span className="live-dot" />LIVE DATA</div><h1>Assessments</h1><p>All cards, charts, and graphs update with the selected filters.</p></div><div className="analytics-heading-actions"><button className="secondary-button" onClick={() => showNotice('CSV assessment results prepared')}>↓ Export CSV</button><button className="primary-button" onClick={() => showNotice('PDF assessment results prepared')}>↓ Export PDF</button></div></div>

    <div className="analytics-filter-bar"><label><span>Department</span><select value={department} onChange={event => setDepartment(event.target.value)}>{departments.map(item => <option key={item}>{item}</option>)}</select></label><label><span>Role</span><select value={role} onChange={event => setRole(event.target.value)}>{roles.map(item => <option key={item}>{item}</option>)}</select></label><label><span>Skill domain</span><select value={domain} onChange={event => setDomain(event.target.value)}>{domains.map(item => <option key={item}>{item}</option>)}</select></label><button className="clear-filter" onClick={resetFilters}>Reset filters</button></div>

    <section className="assessment-card-grid"><AssessmentCard label="Total Assessments" value={`${filteredAssessments.length}`} detail="Tests in this view" accent="blue" /><AssessmentCard label="Average Score" value={`${averageScore.toFixed(1)} / 5`} detail="Filtered employee average" accent="teal" /><AssessmentCard label="Critical Failures" value={`${failures}`} detail="Below passing score" accent="orange" /><AssessmentCard label="Top Skill Tested" value={topSkill.skill} detail={topSkill.score > 0 ? `${topSkill.score.toFixed(1)} average score` : 'No matching tests'} accent="violet" /></section>

    <div className="analytics-chart-grid assessment-chart-grid"><ChartSection title="Department average scores" subtitle="Filtered assessment performance by department"><AssessmentBarChart items={filteredAssessments} /></ChartSection><ChartSection title="Assessment type distribution" subtitle="Filtered tests completed"><AssessmentPieChart items={filteredAssessments} /></ChartSection><ChartSection title="Performance trend" subtitle="Filtered average scores over time"><AssessmentLineChart average={averageScore} /></ChartSection><ChartSection title="Skill strengths and weaknesses" subtitle="Filtered average scores by domain"><AssessmentRadarChart scores={skillScores} /></ChartSection></div>

    <section className="data-section analytics-data-section"><div className="section-heading"><div><div className="eyebrow">RESULTS / {filteredAssessments.length} MATCHES</div><h2>Assessment results table</h2></div><button className="secondary-button" onClick={() => showNotice('Selected employees flagged for re-assessment')}>Flag employees <span>-&gt;</span></button></div><DataTable columns={['Employee Name', 'Role', 'Department', 'Test Name', 'Score', 'Pass / Fail']} rows={filteredAssessments.map(item => ({ 'Employee Name': item.employee, Role: item.role, Department: item.department, 'Test Name': item.test, Score: `${item.score.toFixed(1)} / 5`, 'Pass / Fail': item.result }))} /></section>

    <section className="data-section analytics-data-section"><div className="section-heading"><div><div className="eyebrow">SKILL BENCHMARKS</div><h2>Skill assessment table</h2></div></div><DataTable columns={['Skill Name', 'Average Score', 'Required Benchmark', 'Gap Size']} rows={skillScores.map(item => ({ 'Skill Name': item.skill, 'Average Score': item.score.toFixed(1), 'Required Benchmark': item.benchmark.toFixed(1), 'Gap Size': (item.benchmark - item.score).toFixed(1) }))} /></section>

    {notice && <div className="toast" role="status">{notice}</div>}
  </div>
}

export default Assessments



