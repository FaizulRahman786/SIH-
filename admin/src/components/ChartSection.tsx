type ChartProps = { title: string; subtitle: string; children: React.ReactNode; className?: string }

export function ChartSection({ title, subtitle, children, className = '' }: ChartProps) {
  return <section className={`chart-panel ${className}`}><div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="more-button" aria-label={`More ${title}`}>...</button></div>{children}</section>
}

export function DepartmentChart() {
  const bars = [82, 74, 68, 61, 56, 49]
  return <div className="bar-chart"><div className="y-axis"><span>5.0</span><span>4.0</span><span>3.0</span><span>2.0</span><span>0</span></div><div className="bars">{bars.map((height, i) => <div className="bar-column" key={i}><div className="bar" style={{ height: `${height}%` }}><span>{(height / 20).toFixed(1)}</span></div><small>{['IT', 'Finance', 'HR', 'Policy', 'Field', 'Admin'][i]}</small></div>)}</div></div>
}

export function DemandChart() {
  return <div className="activity-chart"><div className="line-y"><span>1,200</span><span>900</span><span>600</span><span>300</span><span>0</span></div><svg viewBox="0 0 700 210" preserveAspectRatio="none" role="img" aria-label="Training demand trend over time"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#00c2a9" stopOpacity=".3" /><stop offset="1" stopColor="#00c2a9" stopOpacity="0" /></linearGradient></defs><path className="area-fill" d="M0,179 C55,171 75,157 120,160 S180,130 220,137 S280,108 330,118 S390,92 430,101 S490,67 540,78 S610,43 700,28 L700,210 L0,210Z" /><path className="line-stroke" d="M0,179 C55,171 75,157 120,160 S180,130 220,137 S280,108 330,118 S390,92 430,101 S490,67 540,78 S610,43 700,28" /><circle cx="610" cy="43" r="5" /></svg><div className="x-axis"><span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span><span>Dec</span></div></div>
}

export function GapChart() {
  return <div className="grade-layout"><div className="donut"><div><strong>186</strong><small>Open gaps</small></div></div><div className="legend"><span><i className="a" />Statistical <b>28%</b></span><span><i className="b" />Technical <b>34%</b></span><span><i className="c" />Digital Gov. <b>21%</b></span><span><i className="d" />Managerial <b>17%</b></span></div></div>
}

export function RadarChart() {
  return <div className="radar-layout"><svg viewBox="0 0 260 220" role="img" aria-label="Competency mapping radar chart"><polygon className="radar-grid" points="130,15 224,82 188,192 72,192 36,82" /><polygon className="radar-grid inner" points="130,50 190,93 166,162 94,162 70,93" /><polygon className="radar-data" points="130,37 202,94 165,172 80,151 57,91" /><line x1="130" y1="15" x2="130" y2="190" /><line x1="36" y1="82" x2="224" y2="82" /><line x1="72" y1="192" x2="188" y2="192" /></svg><div className="radar-labels"><span>Statistical</span><span>Technical</span><span>Managerial</span><span>Digital Governance</span></div></div>
}