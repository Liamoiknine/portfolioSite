import React from 'react'
import CollapseButton from './CollapseButton'

function Project({ onClick, isExpanded, onCollapse }) {
  return (
    <div 
      className={`project ${isExpanded ? 'expanded' : ''}`}
      onClick={!isExpanded ? onClick : undefined}
      style={{ cursor: !isExpanded ? 'pointer' : 'default' }}
    >
      {/* Project content goes here */}
      {isExpanded && (
        <CollapseButton onClick={onCollapse} />
      )}
    </div>
  )
}

export default Project

