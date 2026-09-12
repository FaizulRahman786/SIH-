type DemandCardProps = {
  label: string
  value: string
  detail: string
  accent: 'blue' | 'teal' | 'orange' | 'violet'
}

function DemandCard({ label, value, detail, accent }: DemandCardProps) {
  return (
    <article className={`demand-card demand-card-${accent}`}>
      <div className="demand-card-label">{label}</div>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  )
}

export default DemandCard
