import React from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'

function Nav({ setActiveSection, activeSection }) {
  const handleClick = (e, section) => {
    e.preventDefault()
    setActiveSection(section)
  }

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li><a href="#about" onClick={(e) => handleClick(e, 'intro')} className={activeSection === 'intro' ? 'active' : ''}>About</a></li>
        <li><a href="#projects" onClick={(e) => handleClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
        <li><a href="#experience" onClick={(e) => handleClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
      </ul>
    </nav>
  )
}

export default Nav

