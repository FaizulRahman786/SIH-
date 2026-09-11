type InsightsPanelProps = { comparison: string }

export default function InsightsPanel({ comparison }: InsightsPanelProps) {
  return <section className="analytics-insights">
    <div className="analytics-section-kicker">AI-GENERATED INSIGHTS</div>
    <div className="insight-list">
      <article><span className="insight-marker">01</span><div><strong>Machine Learning is the largest capability risk.</strong><p>It is 3 levels below requirement in 42% of the filtered workforce.</p></div></article>
      <article><span className="insight-marker">02</span><div><strong>Technical capability is improving steadily.</strong><p>Average competency is up 0.6 points across the last four review cycles.</p></div></article>
      <article><span className="insight-marker">03</span><div><strong>Training demand is concentrated in Field Ops.</strong><p>Prioritise applied digital governance and technical methods for the next cohort.</p></div></article>
    </div>
    <div className="recommendation-strip"><span>WORKFORCE PLANNING</span><strong>{comparison}</strong><p>Compare teams side-by-side before assigning the next learning budget.</p></div>
  </section>
}
