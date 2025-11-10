import React, { useState, useRef, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Experience from './components/Experience'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('activeSection')
    return saved || 'intro'
  })
  // Animation state - always starts fresh on reload
  const hasAnimatedRef = useRef(false)

  // Save to localStorage whenever activeSection changes
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection)
  }, [activeSection])

  return (
    <div className="app-container">
      <div className="main-card">
        {activeSection === 'intro' && <Intro hasAnimatedRef={hasAnimatedRef} />}
        {activeSection === 'projects' && <Projects />}
        {activeSection === 'experience' && <Experience />}
      </div>
      <div className="bottom-bar">
        <Nav setActiveSection={setActiveSection} activeSection={activeSection} />
        <Footer />
      </div>
    </div>
  )
}

export default App

