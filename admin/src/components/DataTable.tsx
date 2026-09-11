type Row = Record<string, string>
export default function DataTable({ columns, rows }: { columns: string[]; rows: Row[] }) {
  return <div className="table-wrap">
    <table>
      <thead>
        <tr>{columns.map(column => <th key={column}>{column}</th>)}
        </tr>
        </thead>
        <tbody>{rows.map((row, index) => 
          
          <tr key={index}>{columns.map(column => 
          <td key={column}>{column === 'Status' ? <span className={`status ${row[column].toLowerCase()}`}>{row[column]}</span> : column === 'Grade' ? <b className="grade">{row[column]}</b> : row[column]}</td>)}</tr>)}</tbody></table></div>
}