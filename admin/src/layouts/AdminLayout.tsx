import { useState } from 'react'
import type { ReactNode } from 'react'
import '../App.css'

const navItems = [
  ['01', 'Dashboard'], ['02', 'Employees'], ['03', 'Competency Analytics'],
  ['04', 'Skill Gap Distribution'], ['05', 'Training Demand'], ['06', 'Course Utilization'],
  ['07', 'Assessments'], ['08', 'Documents'], ['09', 'Reports'],
  ['10', 'Notifications'], ['11', 'System Settings'],
]

type AdminLayoutProps = { children: ReactNode; activePage: string; onNavigate: (page: string) => void }

export default function AdminLayout({ children, activePage, onNavigate }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lightTheme, setLightTheme] = useState(() => localStorage.getItem('skillsaarthi-theme') === 'light')

  const toggleTheme = () => {
    setLightTheme(current => {
      const nextTheme = !current
      localStorage.setItem('skillsaarthi-theme', nextTheme ? 'light' : 'dark')
      return nextTheme
    })
  }

  return (
    <div className={`app-shell ${lightTheme ? 'light-theme' : ''}`}>
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-mark">S</span><span>SKILLSAARTHI <b>ADMIN</b></span></div>
        <div className="role-label">ADMINISTRATOR <span>v2.4</span></div>
        <nav>
          {navItems.map(([number, label]) => (
            <button className={`nav-item ${activePage === label ? 'active' : ''}`} key={label} onClick={() => { onNavigate(label); setMobileOpen(false) }}>
              <span className="nav-number">{number}</span><span>{label}</span>{label === 'Notifications' && <i className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer"><div className="status-pulse" />System operational<span>v2.4.1</span></div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">=</button>
          <div className="breadcrumbs"><span>Workspace</span><b>/</b> {activePage}</div>
          <div className="top-actions">
            <label className="search"><span>⌕</span><input placeholder="Search anything..." aria-label="Global search" /><kbd>⌘ K</kbd></label>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${lightTheme ? 'dark' : 'light'} theme`} title={`Switch to ${lightTheme ? 'dark' : 'light'} theme`}>
              {lightTheme ? '☾' : '☀'}
            </button>
            <button className="icon-button" aria-label="Notifications"><span>○</span><i /></button>
            <div className="profile"><div className="avatar">DS</div><div><strong>Danish Singh</strong><small>Super Admin</small></div><span className="chevron">v</span></div>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}