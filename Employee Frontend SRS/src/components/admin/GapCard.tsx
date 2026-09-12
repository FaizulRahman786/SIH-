type GapCardProps = {
  label: string
  value: string
  detail: string
  accent: 'blue' | 'orange' | 'violet' | 'teal'
}

export default function GapCard({ label, value, detail, accent }: GapCardProps) {
  return <article className={`gap-card gap-card-${accent}`}>
    <div className="gap-card-label">{label}</div>
    <strong>{value}</strong>
    <span>{detail}</span>
  </article>
}

