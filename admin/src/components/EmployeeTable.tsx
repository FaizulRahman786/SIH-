export type Employee = {
  id: number
  name: string
  initials: string
  designation: string
  department: string
  role: string
  score: number
  gaps: string[]
  learning: 'Active' | 'Review' | 'Not started'
  lastAssessment: string
  experience: string
  goal: string
  mentor: string
  history: { date: string; title: string; score: string; note: string }[]
}

type EmployeeTableProps = { employees: Employee[]; onSelect: (employee: Employee) => void; selectedIds: number[]; onToggleCompare: (id: number) => void }

export default function EmployeeTable({ employees, onSelect, selectedIds, onToggleCompare }: EmployeeTableProps) {
  return <div className="table-wrap employee-table-wrap"><table className="employee-table"><thead><tr><th><span className="sr-only">Compare</span></th><th>Name</th><th>Designation</th><th>Department</th><th>Role</th><th>Competency score</th><th>Skill gaps</th><th>Learning status</th><th>Last assessment</th></tr></thead><tbody>{employees.map(employee => <tr key={employee.id} onClick={() => onSelect(employee)}>
    <td onClick={event => event.stopPropagation()}><input type="checkbox" checked={selectedIds.includes(employee.id)} onChange={() => onToggleCompare(employee.id)} aria-label={`Compare ${employee.name}`} /></td>
    <td><div className="employee-name"><span className="employee-avatar">{employee.initials}</span><strong>{employee.name}</strong></div></td><td>{employee.designation}</td><td><span className="department-label">{employee.department}</span></td><td>{employee.role}</td><td><strong className={`score score-${employee.score < 3 ? 'low' : employee.score < 4 ? 'mid' : 'high'}`}>{employee.score.toFixed(1)}</strong><span className="score-max"> / 5</span></td>
    <td><div className="gap-cell"><strong>{employee.gaps.length}</strong><span>{employee.gaps.join(' · ')}</span></div></td><td><span className={`status ${employee.learning === 'Active' ? 'active' : employee.learning === 'Review' ? 'review' : 'pending'}`}>{employee.learning}</span></td><td>{employee.lastAssessment}</td>
  </tr>)}</tbody></table>{employees.length === 0 && <div className="empty-state">No employees match these filters.</div>}</div>
}
