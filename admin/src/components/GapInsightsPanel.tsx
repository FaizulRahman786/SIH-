type GapInsightsPanelProps = { comparison: string; onFlag: () => void }

export default function GapInsightsPanel({ comparison, onFlag }: GapInsightsPanelProps) {
  return <section className="gap-insights-panel">
    <div className="gap-insight-copy"><div className="analytics-section-kicker">AI-GENERATED INSIGHTS</div><div className="gap-insight-list">
      <article><span>01</span><div><strong>Machine Learning is the highest-risk gap.</strong><p>Competency is 3 levels below requirement in 42% of employees.</p></div></article>
      <article><span>02</span><div><strong>Technical and digital gaps are converging.</strong><p>Combine applied technical methods with digital governance in the next programme cycle.</p></div></article>
      <article><span>03</span><div><strong>Field Ops needs targeted intervention.</strong><p>Prioritise role-based learning before the next quarterly assessment.</p></div></article>
    </div></div>
    <div className="gap-recommendation"><span>RECOMMENDATION</span><strong>Launch a focused capability sprint</strong><p>Prioritise Machine Learning, GIS, and Digital Governance for the next 90 days.</p><button className="primary-button" onClick={onFlag}>Flag critical gaps</button><small>{comparison}</small></div>
  </section>
}
