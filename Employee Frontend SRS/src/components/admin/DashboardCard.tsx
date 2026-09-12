type DashboardCardProps = { label: string; value: string; change: string; detail: string; accent: 'teal' | 'violet' | 'orange' | 'blue' | 'pink' }

export default function DashboardCard({ label, value, change, detail, accent }: DashboardCardProps) {
  return <article className={`dashboard-card ${accent}`}>
    <div className="card-heading"><span>{label}</span><span className="card-icon">{accent === 'teal' ? '+' : accent === 'violet' ? '◇' : accent === 'orange' ? '!' : accent === 'blue' ? '◎' : '%'}</span></div>
    <div className="card-value">{value}</div>
    <div className="card-foot"><span className="change">{change}</span><span>{detail}</span></div>
  </article>
}
