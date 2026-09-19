import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CareerDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const career = location.state && location.state.career

  if (!career) {
    return (
      <section className="detail-page">
        <div className="detail-empty-state">
          <p className="muted">Career details are not available. Please return to the Careers page and select a role.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/careers')}>Back to careers</button>
        </div>
      </section>
    )
  }

  const essentialSkills = Array.isArray(career.essentialSkills) ? career.essentialSkills : []
  const optionalSkills = Array.isArray(career.optionalSkills) ? career.optionalSkills : []

  return (
    <section className="detail-page">
      <article className="detail-shell">
        <header className="detail-header">
          <div>
            <p className="section-kicker">Career profile</p>
            <h1>{career.title || career.preferredLabel || 'Career'}</h1>
          </div>
        </header>

        <div className="detail-intro">
          <p>{career.description || 'No description available for this career yet.'}</p>
        </div>

        <div className="skills-layout">
          <section className="detail-section skill-section">
            <h2>Essential Skills</h2>
            {essentialSkills.length === 0 ? (
              <p className="muted">No essential skills listed for this role.</p>
            ) : (
              <div className="skill-list">
                {essentialSkills.map((skill, index) => (
                  <span key={`${skill.uri || skill.title}-${index}`} className="skill-tag skill-tag--primary">
                    {skill.title || 'Skill'}
                  </span>
                ))}
              </div>
            )}
          </section>

          <section className="detail-section skill-section">
            <h2>Optional Skills</h2>
            {optionalSkills.length === 0 ? (
              <p className="muted">No optional skills listed for this role.</p>
            ) : (
              <div className="skill-list">
                {optionalSkills.map((skill, index) => (
                  <span key={`${skill.uri || skill.title}-${index}`} className="skill-tag skill-tag--secondary">
                    {skill.title || 'Skill'}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="detail-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/jobs', { state: { initialQuery: career.title || career.preferredLabel || '' } })}
          >
            Explore Related Jobs
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/careers')}>
            Back to careers
          </button>
        </div>
      </article>
    </section>
  )
}
