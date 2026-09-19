import React from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import Home from './pages/Home'
import Careers from './pages/Careers'
import CareerDetails from './pages/CareerDetails'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <header className="site-header">
          <div className="container header-inner">
            <div className="brand-wrap">
              <h1>
                <Link to="/" className="brand-link">CareerMate</Link>
              </h1>
            </div>

            <nav className="site-nav" aria-label="Main navigation">
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/careers" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Careers
              </NavLink>
              <NavLink to="/jobs" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Jobs
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:careerId" element={<CareerDetails />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-left">
              <div className="brand">CareerMate</div>
              <div className="foot-meta">© 2026 CareerMate · Built by Farah Kazziz</div>
              <div className="foot-meta">
                <a href="mailto:farahkaziz@gmail.com">farahkaziz@gmail.com</a>
              </div>
            </div>

            <div className="footer-right">
              <a href="https://www.linkedin.com/in/farahkaziz" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.88 1 4.98 2.12 4.98 3.5ZM0.22 8.98H4.78V24H0.22V8.98ZM8.98 8.98H13.38V11.02H13.46C14.14 9.86 15.86 8.64 18.12 8.64C22.42 8.64 24 11.22 24 15.48V24H19.44V16.56C19.44 14.4 18.96 12.72 16.8 12.72C14.64 12.72 14.04 14.28 14.04 16.44V24H9.48V8.98H8.98Z" fill="currentColor" />
                </svg>
              </a>

              <a href="https://github.com/farahkaziz" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 0.5C5.73 0.5 0.9 5.33 0.9 11.6C0.9 16.54 4.39 20.75 8.84 22.18C9.54 22.29 9.78 21.92 9.78 21.6C9.78 21.31 9.77 20.59 9.77 19.7C6.28 20.31 5.53 18.13 5.53 18.13C5 16.69 4.21 16.31 4.21 16.31C3.12 15.53 4.31 15.55 4.31 15.55C5.54 15.65 6.16 16.84 6.16 16.84C7.26 18.74 9.03 18.19 9.73 17.9C9.84 17.14 10.13 16.63 10.45 16.32C7.78 16.03 5 15.03 5 10.96C5 9.71 5.42 8.71 6.14 7.93C6.02 7.62 5.64 6.4 6.26 4.87C6.26 4.87 7.24 4.54 9.77 6.14C10.7 5.9 11.71 5.78 12.72 5.78C13.73 5.78 14.74 5.9 15.67 6.14C18.2 4.54 19.18 4.87 19.18 4.87C19.8 6.4 19.42 7.62 19.3 7.93C20.02 8.71 20.44 9.71 20.44 10.96C20.44 15.04 17.66 16.02 15 16.31C15.43 16.69 15.82 17.44 15.82 18.57C15.82 20.18 15.81 21.38 15.81 21.6C15.81 21.92 16.05 22.3 16.76 22.17C21.21 20.75 24.7 16.54 24.7 11.6C24.7 5.33 19.87 0.5 13.6 0.5H12Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
