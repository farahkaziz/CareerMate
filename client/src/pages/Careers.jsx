import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const suggestions = ['Software Developer', 'Frontend Developer', 'Data Analyst', 'Cybersecurity Engineer']

export default function Careers() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [careers, setCareers] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  async function fetchCareers(search) {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/careers/search?source=esco&query=${encodeURIComponent(search)}`)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await res.json()

      if (data && data.success) {
        const nextCareers = data.careers || []
        setCareers(nextCareers)
        setCount(typeof data.count === 'number' ? data.count : nextCareers.length)
      } else {
        setError('Unable to load careers right now. Please try again.')
        setCareers([])
        setCount(0)
      }
    } catch (err) {
      console.error('Careers fetch error', err)
      setError('Unable to load careers right now. Please try again.')
      setCareers([])
      setCount(0)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setHasSearched(true)
    fetchCareers(trimmed)
  }

  function handleSuggestionClick(text) {
    setQuery(text)
  }

  return (
    <section className="search-page careers-page">
      <div className="search-header-card">
        <div>
          <p className="section-kicker">Career Explorer</p>
          <h1>Explore Career Paths</h1>
        </div>
        <p className="muted search-description">
          Discover careers and the skills associated with them so you can understand where your strengths and interests can take you.
        </p>
      </div>

      <form className="search-form" onSubmit={handleSubmit} aria-label="Career search form">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search careers..."
          aria-label="Search careers"
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      <div className="search-suggestions" aria-label="Suggested career searches">
        {suggestions.map((item) => (
          <button key={item} type="button" className="suggestion" onClick={() => handleSuggestionClick(item)}>
            {item}
          </button>
        ))}
      </div>

      {loading && <p className="muted status-copy">Loading careers...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && hasSearched && !error && (
        <div className="results-block">
          <div className="results-summary">
            <h2>Career results</h2>
            <p className="muted">{count} careers found</p>
          </div>

          {careers.length === 0 ? (
            <p className="muted empty-state">No careers found. Try another search term.</p>
          ) : (
            <div className="careers-grid">
              {careers.map((career) => (
                <article key={career.uri || career.title} className="career-card">
                  <div className="career-card-header">
                    <h3>{career.title || career.preferredLabel || 'Career'}</h3>
                  </div>

                  <p className="career-description">
                    {career.description ? career.description.slice(0, 180) + (career.description.length > 180 ? '…' : '') : 'No description available.'}
                  </p>

                  <div className="career-metrics">
                    <span>{(career.essentialSkills || []).length} essential skills</span>
                    <span>{(career.optionalSkills || []).length} optional skills</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate(`/careers/${encodeURIComponent(career.title || career.preferredLabel || 'career')}`, { state: { career } })}
                  >
                    View Career
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
