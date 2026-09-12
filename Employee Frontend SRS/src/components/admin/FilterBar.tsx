type FilterBarProps = {
  search: string
  department: string
  role: string
  competency: string
  departments: string[]
  roles: string[]
  onSearch: (value: string) => void
  onDepartment: (value: string) => void
  onRole: (value: string) => void
  onCompetency: (value: string) => void
}

export default function FilterBar({ search, department, role, competency, departments, roles, onSearch, onDepartment, onRole, onCompetency }: FilterBarProps) {
  return <div className="employee-filter-bar">
    <label className="employee-search"><span>⌕</span><input value={search} onChange={event => onSearch(event.target.value)} placeholder="Search employees..." aria-label="Search employees" /></label>
    <select value={department} onChange={event => onDepartment(event.target.value)} aria-label="Filter by department"><option value="All departments">All departments</option>{departments.map(item => <option key={item}>{item}</option>)}</select>
    <select value={role} onChange={event => onRole(event.target.value)} aria-label="Filter by role"><option value="All roles">All roles</option>{roles.map(item => <option key={item}>{item}</option>)}</select>
    <select value={competency} onChange={event => onCompetency(event.target.value)} aria-label="Filter by competency level"><option value="All levels">All competency levels</option><option value="High">High · 4.0+</option><option value="Steady">Steady · 3.0–3.9</option><option value="Needs focus">Needs focus · under 3.0</option></select>
  </div>
}

