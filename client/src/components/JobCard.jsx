import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function JobCard({ job }) {
  const navigate = useNavigate()
  const {
    id,
    title,
    company,
    location,
    salaryMin,
    salaryMax,
    contractType,
    contractTime,
    description,
  } = job

  return (
    <article className="job-card">
      <div className="job-card-top">
        <h3 className="job-title">{title}</h3>
        <div className="job-company-line">
          <span className="company">{company}</span>
          <span className="divider">•</span>
          <span className="location">{location}</span>
        </div>
      </div>

      {(salaryMin || salaryMax) && (
        <div className="salary">{salaryMin ? `£${salaryMin}` : ''}{salaryMin && salaryMax ? ' - ' : ''}{salaryMax ? `£${salaryMax}` : ''}</div>
      )}

      <div className="contract">
        {contractType && <span>{contractType}</span>}
        {contractTime && <span className="sep">•</span>}
        {contractTime && <span>{contractTime}</span>}
      </div>

      <p className="job-desc">{description ? description.slice(0, 220) + (description.length > 220 ? '…' : '') : ''}</p>

      <div className="job-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(`/jobs/${id}`, { state: { job } })}
        >
          View Details
        </button>
      </div>
    </article>
  )
}
