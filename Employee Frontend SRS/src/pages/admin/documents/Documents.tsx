import '../../../styles/admin-legacy.css'
import { useEffect, useState } from 'react'
import DataTable from '../../../components/admin/DataTable'

type DocumentItem = {
  name: string
  type: string
  owner: string
  date: string
}

const documents: DocumentItem[] = [
  {
    name: 'Workforce Competency Framework',
    type: 'Policy',
    owner: 'Danish Singh',
    date: '10 Sep 2026',
  },
  {
    name: 'Digital Governance Assessment Guide',
    type: 'Guide',
    owner: 'Priya Nair',
    date: '08 Sep 2026',
  },
  {
    name: 'Q3 Training Demand Report',
    type: 'Report',
    owner: 'Rakesh Menon',
    date: '04 Sep 2026',
  },
  {
    name: 'Employee Learning Path Template',
    type: 'Template',
    owner: 'Meera Rao',
    date: '29 Aug 2026',
  },
  {
    name: 'Assessment Results Archive',
    type: 'Report',
    owner: 'Danish Singh',
    date: '22 Aug 2026',
  },
  {
    name: 'Leadership Programme Handbook',
    type: 'Handbook',
    owner: 'Priya Nair',
    date: '18 Aug 2026',
  },
]

const documentTypes = ['All types', 'Policy', 'Guide', 'Report', 'Template', 'Handbook']
const documentOwners = ['All owners', 'Danish Singh', 'Priya Nair', 'Rakesh Menon', 'Meera Rao']

function Documents() {
  const [type, setType] = useState('All types')
  const [owner, setOwner] = useState('All owners')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (notice === '') {
      return
    }

    const timer = window.setTimeout(() => {
      setNotice('')
    }, 2600)

    return () => {
      window.clearTimeout(timer)
    }
  }, [notice])

  function showNotice(message: string) {
    setNotice(message)
  }

  function resetFilters() {
    setType('All types')
    setOwner('All owners')
  }

  function uploadDocument() {
    showNotice('Upload window opened for a new document')
  }

  const filteredDocuments = documents.filter(document => {
    const matchesType = type === 'All types' || document.type === type
    const matchesOwner = owner === 'All owners' || document.owner === owner

    return matchesType && matchesOwner
  })

  return (
    <div className="dashboard-page documents-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKSPACE / DOCUMENT LIBRARY <span className="live-dot" />LIVE DATA</div>
          <h1>Documents</h1>
          <p>Manage policies, reports, guides, and learning programme documents.</p>
        </div>
        <button className="primary-button" onClick={uploadDocument}>
          <span>+</span>
          Upload document
        </button>
      </div>

      <section className="documents-summary">
        <div>
          <span>Total documents</span>
          <strong>{documents.length}</strong>
          <small>Across the admin workspace</small>
        </div>
        <div>
          <span>Reports</span>
          <strong>2</strong>
          <small>Updated this month</small>
        </div>
        <div>
          <span>Document owners</span>
          <strong>4</strong>
          <small>Active contributors</small>
        </div>
      </section>

      <section className="documents-panel">
        <div className="documents-panel-heading">
          <div>
            <div className="eyebrow">DOCUMENT LIBRARY / {filteredDocuments.length} MATCHES</div>
            <h2>All documents</h2>
          </div>
          <button className="secondary-button" onClick={resetFilters}>Reset filters</button>
        </div>

        <div className="documents-filters">
          <label>
            <span>Document type</span>
            <select value={type} onChange={event => setType(event.target.value)}>
              {documentTypes.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Uploaded by</span>
            <select value={owner} onChange={event => setOwner(event.target.value)}>
              {documentOwners.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>

        {/* documents table here */}
        <DataTable
          columns={['Name', 'Type', 'Uploaded By', 'Date']}
          rows={filteredDocuments.map(document => ({
            Name: document.name,
            Type: document.type,
            'Uploaded By': document.owner,
            Date: document.date,
          }))}
        />
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default Documents



