import React from 'react'

function CollapseButton({ onClick }) {
  return (
    <button className="collapse-button" onClick={onClick} aria-label="Collapse">
    </button>
  )
}

export default CollapseButton

