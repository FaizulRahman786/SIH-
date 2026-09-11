import type { ReactNode } from 'react'

type AnalyticsChartPanelProps = { title: string; subtitle: string; children: ReactNode; className?: string }

export default function AnalyticsChartPanel({ title, subtitle, children, className = '' }: AnalyticsChartPanelProps) {
  return <section className={`analytics-chart-panel ${className}`}>
    <div className="analytics-panel-header"><div><div className="analytics-section-kicker">ANALYTICS</div><h2>{title}</h2><p>{subtitle}</p></div><button className="more-button" aria-label={`More ${title}`}>...</button></div>
    {children}
  </section>
}
