type AnalyticsCardProps = {
  label: string
  value: string
  detail: string
  accent: 'blue' | 'teal' | 'orange' | 'violet'
}

export default function AnalyticsCard({ label, value, detail, accent }: AnalyticsCardProps) {
  return <article className={`analytics-card analytics-card-${accent}`}>
    <div className="analytics-card-label">{label}</div>
    <strong>{value}</strong>
    <span>{detail}</span>
  </article>
}

