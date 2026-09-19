import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import JobCard from '../components/JobCard'

const suggestions = ['Software Developer', 'Frontend Developer', 'Data Analyst', 'Cybersecurity Engineer']

export default function Jobs() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (location.state && location.state.initialQuery) {
      setQuery(location.state.initialQuery)
    }
  }, [location.state])

  async function fetchJobs(search) {
    setLoading(true)
    setError('')
    setJobs([])
    setCount(0)

    try {
      const res = await fetch(`/api/jobs?query=${encodeURIComponent(search)}`)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      if (data && data.success) {
        setJobs(data.jobs || [])
        setCount(typeof data.count === 'number' ? data.count : (data.jobs || []).length)
      } else {
        setError('Unable to load jobs. Please try again.')
      }
    } catch (err) {
      console.error('Jobs fetch error', err)
      setError('Unable to load jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setHasSearched(true)
    fetchJobs(trimmed)
  }

  function handleSuggestionClick(text) {
    setQuery(text)
  }

  return (
    <section className="search-page jobs-page">
      <div className="search-header-card">
        <div>
          <p className="section-kicker">Find jobs</p>
          <h1>Search job opportunities</h1>
        </div>
        <p className="muted search-description">
          Explore openings that match your career interests and see which roles align with the skills you want to build.
        </p>
      </div>

      <form className="search-form" onSubmit={handleSubmit} aria-label="Jobs search form">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a job, role, or skill..."
          aria-label="Search jobs"
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      <div className="search-suggestions" aria-label="Suggested job searches">
        {suggestions.map((item) => (
          <button key={item} type="button" className="suggestion" onClick={() => handleSuggestionClick(item)}>
            {item}
          </button>
        ))}
      </div>

      {loading && <p className="muted status-copy">Loading jobs...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && hasSearched && !error && (
        <div className="results-block">
          <div className="results-summary">
            <h2>Job results</h2>
            <p className="muted">{count} jobs found</p>
          </div>

          {jobs.length === 0 ? (
            <p className="muted empty-state">No jobs found for this search.</p>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
