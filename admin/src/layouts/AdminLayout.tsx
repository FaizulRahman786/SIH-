import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import '../App.css'

const navItems = [
  ['⌂', 'Dashboard'], ['♙', 'Employees'], ['◈', 'Competency Analytics'],
  ['△', 'Skill Gap Distribution'], ['↗', 'Training Demand'], ['▣', 'Course Utilization'],
  ['✓', 'Assessments'], ['▤', 'Documents'], ['▥', 'Reports'],
  ['◌', 'Notifications'], ['⚙', 'System Settings'],
]

type AdminLayoutProps = { children: ReactNode; activePage: string; onNavigate: (page: string) => void; onLogout: () => void }

export default function AdminLayout({ children, activePage, onNavigate, onLogout }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [lightTheme, setLightTheme] = useState(() => localStorage.getItem('skillsaarthi-theme') !== 'dark')
  const [unreadNotifications, setUnreadNotifications] = useState(() => Number(localStorage.getItem('skillsaarthi-unread-notifications') || '3'))

  useEffect(() => {
    function updateUnreadNotifications(event: Event) {
      const notificationEvent = event as CustomEvent<number>
      setUnreadNotifications(notificationEvent.detail)
    }

    window.addEventListener('skillsaarthi-notifications-updated', updateUnreadNotifications)

    return () => {
      window.removeEventListener('skillsaarthi-notifications-updated', updateUnreadNotifications)
    }
  }, [])

  useEffect(() => {
    function updateTheme(event: Event) {
      const themeEvent = event as CustomEvent<boolean>
      setLightTheme(themeEvent.detail)
    }

    window.addEventListener('skillsaarthi-theme-updated', updateTheme)

    return () => {
      window.removeEventListener('skillsaarthi-theme-updated', updateTheme)
    }
  }, [])

  const toggleTheme = () => {
    setLightTheme(current => {
      const nextTheme = !current
      localStorage.setItem('skillsaarthi-theme', nextTheme ? 'light' : 'dark')
      window.dispatchEvent(new CustomEvent('skillsaarthi-theme-updated', { detail: nextTheme }))
      return nextTheme
    })
  }

  return (
    <div className={`app-shell ${lightTheme ? 'light-theme' : ''}`}>
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-mark">S</span><span>SKILLSAARTHI <b>ADMIN</b></span></div>
        <div className="role-label">ADMINISTRATOR <span>v2.4</span></div>
        <nav>
          {navItems.map(([icon, label]) => (
            <button className={`nav-item ${activePage === label ? 'active' : ''}`} key={label} onClick={() => { onNavigate(label); setMobileOpen(false) }}>
              <span className="nav-icon" aria-hidden="true">{icon}</span><span>{label}</span>{label === 'Notifications' && unreadNotifications > 0 && <i className="nav-dot" />}
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
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${lightTheme ? 'dark' : 'light'} theme`} title={`Switch to ${lightTheme ? 'dark' : 'light'} theme`}>
              {lightTheme ? '☾' : '☀'}
            </button>
            <div className="profile-menu">
              <button className="profile" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen} aria-label="Open profile menu">
                <div className="avatar">DS</div>
                <div><strong>Danish Singh</strong><small>Super Admin</small></div>
                <span className="chevron">v</span>
              </button>
              <div className={`profile-dropdown ${profileOpen ? 'profile-dropdown-open' : ''}`}>
                <strong>Danish Singh</strong>
                <span>ID: SS-ADMIN-001</span>
                <span>danish@example.com</span>
                <button onClick={onLogout}>Logout</button>
              </div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}