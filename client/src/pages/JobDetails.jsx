import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function JobDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const job = location.state && location.state.job

  if (!job) {
    return (
      <section className="jobs-section">
        <div className="detail-empty-state">
          <p className="muted">Job details are not available. Please return to the Jobs page and select a job.</p>
          <button className="btn btn-primary" onClick={() => navigate('/jobs')}>Back to Jobs</button>
        </div>
      </section>
    )
  }

  const {
    title,
    company,
    location: loc,
    salaryMin,
    salaryMax,
    contractType,
    contractTime,
    description,
    url,
  } = job

  function getParagraphs(text) {
    if (!text) return []

    if (text.includes('<')) {
      try {
        const parser = typeof DOMParser !== 'undefined' ? new DOMParser() : null
        if (parser) {
          const doc = parser.parseFromString(text, 'text/html')
          const body = doc.body
          const paras = []

          body.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const value = node.textContent.trim()
              if (value) {
                value.split(/\n\s*\n/).forEach((part) => {
                  const cleanPart = part.trim()
                  if (cleanPart) paras.push(cleanPart)
                })
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const tag = node.tagName.toLowerCase()
              if (tag === 'p' || tag === 'div' || tag.match(/^h[1-6]$/) || tag === 'blockquote' || tag === 'pre') {
                const value = node.textContent.trim()
                if (value) paras.push(value)
              } else if (tag === 'ul' || tag === 'ol') {
                const items = Array.from(node.querySelectorAll('li')).map((li) => li.textContent.trim()).filter(Boolean)
                if (items.length) paras.push(items.join('\n'))
              } else {
                const value = node.textContent.trim()
                if (value) paras.push(value)
              }
            }
          })

          if (paras.length) return paras
        }
      } catch (e) {
        // fall back below
      }
    }

    const normalized = text.replace(/\r\n/g, '\n')
    return normalized.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
  }

  const paragraphs = getParagraphs(description || '')

  return (
    <section className="detail-page">
      <article className="detail-shell">
        <header className="detail-header">
          <div>
            <p className="section-kicker">Job profile</p>
            <h1>{title}</h1>
          </div>
        </header>

        <div className="detail-overview-grid">
          <div className="detail-stat">
            <span className="detail-label">Company</span>
            <strong>{company}</strong>
          </div>
          <div className="detail-stat">
            <span className="detail-label">Location</span>
            <strong>{loc}</strong>
          </div>
          {(salaryMin || salaryMax) && (
            <div className="detail-stat">
              <span className="detail-label">Salary</span>
              <strong>{salaryMin ? `£${salaryMin}` : ''}{salaryMin && salaryMax ? ' - ' : ''}{salaryMax ? `£${salaryMax}` : ''}</strong>
            </div>
          )}
          {contractType && (
            <div className="detail-stat">
              <span className="detail-label">Contract</span>
              <strong>{contractType}</strong>
            </div>
          )}
          {contractTime && (
            <div className="detail-stat">
              <span className="detail-label">Schedule</span>
              <strong>{contractTime}</strong>
            </div>
          )}
        </div>

        <div className="detail-content">
          <section className="detail-section">
            <h2>Job description</h2>
            {paragraphs.length === 0 ? (
              <p className="muted">No description available.</p>
            ) : (
              paragraphs.map((para, index) => <p key={index} className="detail-paragraph">{para}</p>)
            )}
          </section>
        </div>

        <div className="detail-actions">
          <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">View Original Job</a>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/jobs')}>Back to jobs</button>
        </div>
      </article>
    </section>
  )
}
