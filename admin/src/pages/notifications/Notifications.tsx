import { useEffect, useState } from 'react'

type NotificationType = 'info' | 'warning' | 'success'

type NotificationItem = {
  id: number
  message: string
  type: NotificationType
  date: string
  status: 'Unread' | 'Read'
}

const sampleNotifications: NotificationItem[] = [
  {
    id: 1,
    message: 'Machine Learning demand has increased by 42% this quarter.',
    type: 'info',
    date: 'Today, 10:30 AM',
    status: 'Unread',
  },
  {
    id: 2,
    message: 'Rohan Das has failed the Python coding assessment.',
    type: 'warning',
    date: 'Today, 09:15 AM',
    status: 'Unread',
  },
  {
    id: 3,
    message: 'Q3 Workforce Competency Report is ready to export.',
    type: 'success',
    date: 'Yesterday, 04:45 PM',
    status: 'Read',
  },
  {
    id: 4,
    message: 'New Digital Governance learning programme was added.',
    type: 'info',
    date: 'Yesterday, 12:20 PM',
    status: 'Read',
  },
  {
    id: 5,
    message: '14 critical skill gaps need administrator attention.',
    type: 'warning',
    date: '10 Sep 2026, 03:10 PM',
    status: 'Unread',
  },
  {
    id: 6,
    message: 'Assessment cycle for Finance department is complete.',
    type: 'success',
    date: '09 Sep 2026, 05:00 PM',
    status: 'Read',
  },
]

const notificationTypes = ['All types', 'info', 'warning', 'success']
const notificationStatuses = ['All statuses', 'Unread', 'Read']

function NotificationIcon({ type }: { type: NotificationType }) {
  if (type === 'warning') {
    return <span className="notification-icon notification-warning" aria-label="Warning">!</span>
  }

  if (type === 'success') {
    return <span className="notification-icon notification-success" aria-label="Success">✓</span>
  }

  return <span className="notification-icon notification-info" aria-label="Information">i</span>
}

function Notifications() {
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [type, setType] = useState('All types')
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

  useEffect(() => {
    const unreadCount = notifications.filter(item => item.status === 'Unread').length
    localStorage.setItem('skillsaarthi-unread-notifications', `${unreadCount}`)
    window.dispatchEvent(new CustomEvent('skillsaarthi-notifications-updated', { detail: unreadCount }))
  }, [notifications])

  function showNotice(message: string) {
    setNotice(message)
  }

  function toggleRead(id: number) {
    setNotifications(currentNotifications => currentNotifications.map(item => {
      if (item.id !== id) {
        return item
      }

      const nextStatus = item.status === 'Read' ? 'Unread' : 'Read'
      return { ...item, status: nextStatus }
    }))
  }

  function markAllAsRead() {
    setNotifications(currentNotifications => currentNotifications.map(item => ({ ...item, status: 'Read' })))
    showNotice('All notifications marked as read')
  }

  function resetFilters() {
    setType('All types')
    setStatus('All statuses')
  }

  const filteredNotifications = notifications.filter(item => {
    const matchesType = type === 'All types' || item.type === type
    const matchesStatus = status === 'All statuses' || item.status === status

    return matchesType && matchesStatus
  })

  const unreadCount = notifications.filter(item => item.status === 'Unread').length

  return (
    <div className="dashboard-page notifications-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKSPACE / ALERT CENTRE <span className="live-dot" />LIVE DATA</div>
          <h1>Notifications</h1>
          <p>Stay up to date with important workforce and programme activity.</p>
        </div>
        <button className="primary-button" onClick={markAllAsRead}>Mark all as read</button>
      </div>

      <section className="notifications-summary">
        <div>
          <span>Unread notifications</span>
          <strong>{unreadCount}</strong>
          <small>Need your attention</small>
        </div>
        <div>
          <span>Total notifications</span>
          <strong>{notifications.length}</strong>
          <small>Latest workspace activity</small>
        </div>
        <div>
          <span>Critical alerts</span>
          <strong>2</strong>
          <small>Skill gaps and assessments</small>
        </div>
      </section>

      <section className="notifications-panel">
        <div className="notifications-panel-heading">
          <div>
            <div className="eyebrow">ALERT CENTRE / {filteredNotifications.length} MATCHES</div>
            <h2>All notifications</h2>
          </div>
          <button className="secondary-button" onClick={resetFilters}>Reset filters</button>
        </div>

        <div className="notifications-filters">
          <label>
            <span>Notification type</span>
            <select value={type} onChange={event => setType(event.target.value)}>
              {notificationTypes.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Status</span>
            <select value={status} onChange={event => setStatus(event.target.value)}>
              {notificationStatuses.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <div className="notification-list">
          {filteredNotifications.map(item => (
            <article className={`notification-item ${item.status === 'Unread' ? 'notification-unread' : ''}`} key={item.id}>
              <NotificationIcon type={item.type} />
              <div className="notification-content">
                <strong>{item.message}</strong>
                <span>{item.date}</span>
              </div>
              <span className={`notification-status notification-status-${item.status.toLowerCase()}`}>
                {item.status}
              </span>
              <button className="notification-read-button" onClick={() => toggleRead(item.id)}>
                {item.status === 'Read' ? 'Mark unread' : 'Mark as read'}
              </button>
            </article>
          ))}
        </div>
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default Notifications
