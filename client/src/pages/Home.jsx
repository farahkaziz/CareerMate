import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-left">
          <div className="eyebrow">CAREERMATE</div>
          <h1 className="hero-title">Build Your Career with the Right Skills.</h1>
          <p className="hero-sub muted">Discover career paths, understand the skills you need, and explore real job opportunities.</p>

          <div className="hero-ctas">
            <Link to="/careers" className="btn btn-primary">Explore Careers</Link>
            <Link to="/jobs" className="btn btn-secondary">Find Jobs</Link>
          </div>

          <div className="hero-sublabel muted">Try search examples: Software Developer · Frontend Developer · Data Analyst</div>
        </div>

        <div className="hero-right" aria-hidden>
          <svg width="320" height="210" viewBox="0 0 320 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="34" width="126" height="90" rx="12" fill="#f3f4f6" />
            <rect x="170" y="52" width="132" height="68" rx="12" fill="#eef2ff" />
            <rect x="54" y="138" width="214" height="46" rx="10" fill="#ffffff" stroke="#dfe3ea" />
            <circle cx="225" cy="112" r="8" fill="#2563eb" />
            <circle cx="92" cy="78" r="10" fill="#c7d2fe" />
            <rect x="110" y="72" width="52" height="8" rx="4" fill="#d1d5db" />
            <rect x="110" y="88" width="62" height="8" rx="4" fill="#d1d5db" />
            <rect x="188" y="80" width="82" height="8" rx="4" fill="#bfdbfe" />
          </svg>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading-wrap">
          <p className="section-kicker">What you can do</p>
          <h2 className="section-heading">Career discovery, skill clarity, and opportunity matching.</h2>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">01</div>
            <h3>Discover Careers</h3>
            <p className="muted">Explore different career paths and understand what each role requires.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">02</div>
            <h3>Understand Skills</h3>
            <p className="muted">Discover the skills associated with your target career and identify what you should develop.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">03</div>
            <h3>Find Opportunities</h3>
            <p className="muted">Explore real job opportunities related to your career interests.</p>
          </article>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="section-heading-wrap">
          <p className="section-kicker">How it works</p>
          <h2 className="section-heading">How CareerMate Works</h2>
        </div>

        <div className="steps-grid">
          <div className="step-item">
            <div className="step-num">01</div>
            <h3>Choose a career</h3>
          </div>
          <div className="step-item">
            <div className="step-num">02</div>
            <h3>Discover required skills</h3>
          </div>
          <div className="step-item">
            <div className="step-num">03</div>
            <h3>Explore related opportunities</h3>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-card">
          <div>
            <p className="section-kicker">Next step</p>
            <h3>Ready to explore your career path?</h3>
            <p className="muted">Take the next step and discover careers that match your interests.</p>
          </div>
          <div>
            <Link to="/careers" className="btn btn-primary">Explore Careers</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
