import type { Employee } from './EmployeeTable'

type EmployeeProfileModalProps = { employee: Employee; onClose: () => void; onFlag: () => void; onAssign: () => void }

const competency = [['Statistical', 4.4, 4.5], ['Technical', 3.7, 4.5], ['Digital Governance', 3.1, 4], ['Managerial', 4.2, 4.5]]

export default function EmployeeProfileModal({ employee, onClose, onFlag, onAssign }: EmployeeProfileModalProps) {
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><section className="employee-profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={event => event.stopPropagation()}>
    <header className="profile-modal-header"><div><div className="eyebrow">EMPLOYEE PROFILE / {employee.id.toString().padStart(3, '0')}</div><div className="profile-identity"><span className="profile-avatar">{employee.initials}</span><div><h2 id="profile-title">{employee.name}</h2><p>{employee.designation} · {employee.department}</p></div></div></div><button className="close-button" onClick={onClose} aria-label="Close profile">×</button></header>
    <div className="profile-actions"><button className="secondary-button" onClick={onFlag}>⚑ Flag critical gap</button><button className="primary-button" onClick={onAssign}>+ Assign programme</button></div>
    <div className="profile-summary"><div><span>Years of experience</span><strong>{employee.experience}</strong></div><div><span>Career goal</span><strong>{employee.goal}</strong></div><div><span>Current mentor</span><strong>{employee.mentor}</strong></div></div>
    <div className="profile-grid"><section className="profile-section"><div className="profile-section-title"><div><div className="eyebrow">COMPETENCY MAP</div><h3>Current vs required</h3></div><span className="profile-score">{employee.score.toFixed(1)} <small>/ 5</small></span></div>{competency.map(([name, current, required]) => <div className="competency-row" key={name as string}><div className="competency-label"><span>{name}</span><b>{current} / {required}</b></div><div className="competency-track"><span style={{ width: `${(current as number) / 5 * 100}%` }} /><i style={{ left: `${(required as number) / 5 * 100}%` }} /></div></div>)}</section>
      <section className="profile-section"><div className="eyebrow">RECOMMENDED LEARNING PATH</div><h3>Next best programmes</h3><div className="learning-list"><div><span className="learning-number">01</span><p><strong>Digital Governance Essentials</strong><small>iGOT Karmayogi · 6 modules</small></p><button onClick={onAssign}>Assign</button></div><div><span className="learning-number">02</span><p><strong>Applied Technical Methods</strong><small>SkillSaarthi · 4 modules</small></p><button onClick={onAssign}>Assign</button></div></div></section></div>
    <section className="profile-section history-section"><div className="eyebrow">ASSESSMENT HISTORY</div><h3>Recent progress</h3><div className="history-list">{employee.history.map(item => <div key={item.date}><span>{item.date}</span><p><strong>{item.title}</strong><small>{item.note}</small></p><b>{item.score}</b></div>)}</div></section>
  </section></div>
}
