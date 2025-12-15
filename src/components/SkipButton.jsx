import React from 'react'

function SkipButton({ showSkipButton, onSkip, isHidden }) {
  if (!showSkipButton) return null

  return (
    <div className="skip-button-container">
      <button 
        className={`skip-button fade-in ${isHidden ? 'hidden' : ''}`}
        onClick={onSkip}
      >
        | <span className="skip-text">Skip</span>
      </button>
    </div>
  )
}

export default SkipButton

