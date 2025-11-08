import React, { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Project from './components/project'
import Intro from './components/Intro'
import './App.css'

function App() {
  const [expandedProject, setExpandedProject] = useState(null)

  const handleProjectClick = (projectId) => {
    setExpandedProject(projectId)
  }

  const handleCollapse = () => {
    setExpandedProject(null)
  }

  return (
    <div className="app-container">
      <div className={`main-card ${expandedProject ? 'expanded' : ''}`}>
        <Project 
          onClick={() => handleProjectClick(1)} 
          isExpanded={expandedProject === 1}
          onCollapse={handleCollapse}
        />
        <Project 
          onClick={() => handleProjectClick(2)} 
          isExpanded={expandedProject === 2}
          onCollapse={handleCollapse}
        />
        <Intro 
          onClick={() => handleProjectClick(2)} 
          isExpanded={expandedProject === 2}
          onCollapse={handleCollapse}
        />
        <Project 
          onClick={() => handleProjectClick(2)} 
          isExpanded={expandedProject === 2}
          onCollapse={handleCollapse}
        />
      </div>
      <div className="bottom-bar">
        <Nav />
        <Footer />
      </div>
    </div>
  )
}

export default App

