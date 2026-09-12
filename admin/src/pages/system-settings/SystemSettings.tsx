import { useEffect, useState } from 'react'

function SystemSettings() {
  const [lightTheme, setLightTheme] = useState(() => localStorage.getItem('skillsaarthi-theme') !== 'dark')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [weeklySummary, setWeeklySummary] = useState(false)
  const [exportFormat, setExportFormat] = useState('CSV')
  const [exportRange, setExportRange] = useState('Last 30 days')
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeTables, setIncludeTables] = useState(true)
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

  function showNotice(message: string) {
    setNotice(message)
  }

  function updateTheme(value: boolean) {
    setLightTheme(value)
    localStorage.setItem('skillsaarthi-theme', value ? 'light' : 'dark')
    window.dispatchEvent(new CustomEvent('skillsaarthi-theme-updated', { detail: value }))
  }

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    showNotice('System settings saved successfully')
  }

  function resetSettings() {
    updateTheme(true)
    setEmailNotifications(true)
    setCriticalAlerts(true)
    setWeeklySummary(false)
    setExportFormat('CSV')
    setExportRange('Last 30 days')
    setIncludeCharts(true)
    setIncludeTables(true)
    showNotice('Settings restored to defaults')
  }

  return (
    <div className="dashboard-page system-settings-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">ADMINISTRATION / WORKSPACE CONTROL <span className="live-dot" />SYSTEM READY</div>
          <h1>System settings</h1>
          <p>Manage appearance, notifications, and report export preferences.</p>
        </div>
        <button className="secondary-button" onClick={resetSettings}>Reset settings</button>
      </div>

      <form onSubmit={saveSettings}>
        <div className="settings-grid">
          <section className="settings-panel">
            <div className="settings-panel-heading">
              <div>
                <div className="eyebrow">APPEARANCE</div>
                <h2>Workspace theme</h2>
              </div>
            </div>
            <p className="settings-help">Choose the preferred appearance for the admin workspace.</p>
            <label className="settings-switch-row">
              <span>
                <strong>{lightTheme ? 'Use dark theme' : 'Use light theme'}</strong>
                <small>{lightTheme ? 'Use the dark colour palette for dashboard pages.' : 'Use the light colour palette for dashboard pages.'}</small>
              </span>
              <input
                type="checkbox"
                checked={lightTheme}
                onChange={event => updateTheme(event.target.checked)}
              />
            </label>
            <label className="settings-field">
              <span>Default landing page</span>
              <select defaultValue="Dashboard">
                <option>Dashboard</option>
                <option>Employees</option>
                <option>Competency Analytics</option>
                <option>Reports</option>
              </select>
            </label>
          </section>

          <section className="settings-panel">
            <div className="settings-panel-heading">
              <div>
                <div className="eyebrow">NOTIFICATIONS</div>
                <h2>Notification preferences</h2>
              </div>
            </div>
            <p className="settings-help">Choose which updates should appear in your admin alerts.</p>
            <label className="settings-check-row">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={event => setEmailNotifications(event.target.checked)}
              />
              <span>Email notifications</span>
            </label>
            <label className="settings-check-row">
              <input
                type="checkbox"
                checked={criticalAlerts}
                onChange={event => setCriticalAlerts(event.target.checked)}
              />
              <span>Critical skill gap alerts</span>
            </label>
            <label className="settings-check-row">
              <input
                type="checkbox"
                checked={weeklySummary}
                onChange={event => setWeeklySummary(event.target.checked)}
              />
              <span>Weekly workforce summary</span>
            </label>
          </section>

          <section className="settings-panel">
            <div className="settings-panel-heading">
              <div>
                <div className="eyebrow">EXPORT OPTIONS</div>
                <h2>Report defaults</h2>
              </div>
            </div>
            <p className="settings-help">Set the default options used when exporting reports.</p>
            <label className="settings-field">
              <span>Default format</span>
              <select value={exportFormat} onChange={event => setExportFormat(event.target.value)}>
                <option>CSV</option>
                <option>PDF</option>
              </select>
            </label>
            <label className="settings-field">
              <span>Default date range</span>
              <select value={exportRange} onChange={event => setExportRange(event.target.value)}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
                <option>Full year</option>
              </select>
            </label>
            <label className="settings-check-row">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={event => setIncludeCharts(event.target.checked)}
              />
              <span>Include charts in exports</span>
            </label>
            <label className="settings-check-row">
              <input
                type="checkbox"
                checked={includeTables}
                onChange={event => setIncludeTables(event.target.checked)}
              />
              <span>Include tables in exports</span>
            </label>
          </section>
        </div>

        <div className="settings-actions">
          <span>Changes apply to your admin account only.</span>
          <button className="primary-button" type="submit">Save settings</button>
        </div>
      </form>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default SystemSettings
