import React, { useState } from 'react'

function Experience() {
  const [selectedCategory, setSelectedCategory] = useState('professional')

  const experiences = [
    {
      title: "Status Health",
      role: "Product",
      description: "Leading and solo engineering the user portal for understanding chemical exposure test results. Lots of dataprocessing and pipeline building, organization, planning, ande design.",
      metadata: ["Startup Vibes", "Ideating", "Vibing"],
      date: "Fall 2025-Present",
      category: "professional"
    },
    {
      title: "Urano Research Lab",
      role: "Project Lead",
      description: "Built a system for segmenting Wolfram patients by the severity of their disease, taking a step toward demistifying disease modifiers. Built a visualization platform for analyzing our data and applying severity filters. Now building a mobile app to assess cognitive function of blind patients to gather longitudinal data on nuerodegeneration.",
      metadata: ["Data Analysis", "Software Dev", "Planning & Leading", "Meeting Patients"],
      date: "Summer 2024-Present",
      category: "professional"
    },
    {
      title: "Aiode",
      role: "Software Dev",
      description: "Built CLI pipeline to navigate database and funnel groups of audio clips through LLMs, analyzing muscial features like instrument-type, dynamics, fills, and complexity.",
      metadata: ["Startup Vibes", "Becoming Israeli", "Understanding Music", "Talking About Food"],
      date: "Summer 2025",
      category: "professional"
    },
    {
      title: "Machine Learning Reading Group",
      role: "Organizer",
      description: "Started a machine learning group and recruited some friends to join. We read 1-2 ML papers per week (foundational or frontier) and meet on Sundays to discuss our thoughts and ideas about the content and its implications on thefuture",
      metadata: ["Scheming", "Learning more than in class", "Getting inspired"],
      date: "Fall 2025",
      category: "other"
    },
    {
      title: "College Athlete",
      role: "DIII Men's Soccer @ WashU",
      description: "College athlete STRUGGLING with injuries for the past 3 years. A constant mental battle that has taught me a ton about life.",
      metadata: ["Being a teammate", "Grinding through setbacks"],
      date: "Fall 2023-Present",
      category: "other"
    }
  ]

  const filteredExperiences = experiences.filter(exp => exp.category === selectedCategory)

  return (
    <div className="experience">
      <div className="experience-toggle">
        <div className="toggle-container">
          <button
            className={`toggle-button ${selectedCategory === 'professional' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('professional')}
          >
            Professional
          </button>
          <div className="toggle-separator"></div>
          <button
            className={`toggle-button ${selectedCategory === 'other' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('other')}
          >
            Other Cool
          </button>
        </div>
      </div>
      <div className="experience-list">
        {filteredExperiences.map((experience, index) => (
          <div key={index} className="experience-item">
            <div className="experience-content">
              <div className="experience-title-row">
                <h2 className="experience-entry-title">
                  {experience.title}
                  {experience.role && (
                    <>
                      <span className="title-separator"> | </span>
                      <span className="experience-role">{experience.role}</span>
                    </>
                  )}
                </h2>
                <span className="experience-date">{experience.date}</span>
              </div>
              <p className="experience-entry-description">{experience.description}</p>
              {experience.metadata && experience.metadata.length > 0 && (
                <div className="experience-metadata">
                  {experience.metadata.map((meta, metaIndex) => (
                    <React.Fragment key={metaIndex}>
                      <span className="experience-meta">{meta}</span>
                      {metaIndex < experience.metadata.length - 1 && <span className="meta-separator"> · </span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            {index < filteredExperiences.length - 1 && <div className="experience-separator"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience

