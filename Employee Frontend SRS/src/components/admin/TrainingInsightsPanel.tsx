type TrainingInsightsPanelProps = {
  comparison: string
  onFlag: () => void
}

function TrainingInsightsPanel({ comparison, onFlag }: TrainingInsightsPanelProps) {
  return (
    <section className="training-insights-panel">
      <div className="training-insight-content">
        <div className="analytics-section-kicker">AI-GENERATED INSIGHTS</div>
        <div className="training-insight-list">
          <article>
            <span>01</span>
            <div>
              <strong>Machine Learning demand has grown 42% this quarter.</strong>
              <p>Interest is highest among technical and field operations teams.</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <strong>Digital Governance is the fastest-growing domain.</strong>
              <p>Scale short programmes before the next quarterly review cycle.</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <strong>Completion is strongest for leadership programmes.</strong>
              <p>Use this format as a model for technical course delivery.</p>
            </div>
          </article>
        </div>
      </div>
      <div className="training-recommendation">
        <span>TRAINING SUPPLY</span>
        <strong>Scale priority programmes</strong>
        <p>Add Machine Learning, GIS, and Digital Governance cohorts to meet demand.</p>
        <button className="primary-button" onClick={onFlag}>Flag high-demand courses</button>
        <small>{comparison}</small>
      </div>
    </section>
  )
}

export default TrainingInsightsPanel

