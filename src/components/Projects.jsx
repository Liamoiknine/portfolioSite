import React, { useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('active')

  // TODO: Replace these filler projects with your actual project data
  const projects = [
    {
      title: "Status Health",
      description: "Translating mass spec output of chemical exposures into digestable agentized database for paid users",
      tags: ["Active", "Work", "Launching Soon"],
      date: "Fall 2025",
      category: "active",
      link: "https://www.statushealth.co/"
    },
    {
      title: "Disease Severity Visualization",
      description: "Visualize pheontypic data on cardinal Wolfram symptoms; Calculate Severity Scores for arbitraty allele combinations",
      tags: ["Complete", "Research"],
      date: "Spring 2025",
      category: "completed",
      link: "https://github.com/Liamoiknine/Severity_Scoring"
    },
    {
      title: "The North Jersey Project",
      description: "Fine tuning model to behave like Tony Soprano, containerized with Docker and manged with Kubernetes",
      tags: ["In-Progress", "Class"],
      date: "Fall 2025",
      category: "active",
      link: "https://github.com/Liamoiknine/TheNorthJerseyProject"
    },
    {
      title: "Synthetic Data Generation",
      description: "Parallelize API calls to enterprise models for repeatable tasks like synthetic data generation for model fine-tuning or structured research over many data points to avoid quality degredation while maintaining speed. Protect against model collapse / duplication with cosine similarity threshold. Host platform as a service, charging elastically for token usage.",
      tags: ["Coming Soon", "Personal"],
      date: "Fall 2025",
      category: "in-pipeline",
      link: ""
    },
    {
      title: "Wolfram Specific RAG / Tool-enabled LLM",
      description: "Interested in playing around with tooling and/or RAG to enable natural language querying and synthesis of data to answer multi-faceted questions reliably",
      tags: ["Coming Soon", "Research"],
      date: "Fall 2025",
      category: "in-pipeline",
      link: ""
    },
    {
      title: "ML Wine Classifer",
      description: "Constructed ANN, Random Forest, and KNN models to classify wine quality dataset",
      tags: ["Complete", "Class"],
      date: "Spring 2025",
      category: "completed",
      link: "https://github.com/liamoiknine/ML-Wine-Classifier"
    },
    {
      title: "Wolfram Cognitive Assessment App",
      description: "Building iOS app to administer cognitive assessments to Wolfram patients with visual impairment and blindness",
      tags: ["Active", "Research", "Private due to IRB guidelines"],
      date: "Fall 2025",
      category: "active",
      link: ""
    },
    {
      title: "Nag Me",
      description: "Built accountability service to call me during study periods and keep me on track. Used Twilio, Whisper trancription, and GPT for generating responses.",
      tags: ["Complete", "Personal"],
      date: "Fall 2025",
      category: "completed",
      link: "https://github.com/Liamoiknine/nag-me"
    },
    {
      title: "Wolfram Severity Scoring System",
      description: "Analyzed genotype-phenotype data to construct 6-point severity scoring system, segmenting patietns into statiscally significant low, medium, and high severity groups",
      tags: ["Complete", "Research"],
      date: "Summer 2024",
      category: "completed",
      link: "https://figshare.com/articles/journal_contribution/_b_Genotype-Based_Severity_Scoring_System_in_Wolfram_Syndrome_Correlation_with_Onset_of_Cardinal_Symptoms_and_WFS1_gene_Variant_Types_b_/28424315/1?file=52382729"
    },
    {
      title: "Streamlined Provisional Patenting Process",
      description: (
        <>
          Dug into AI tools to transform biotech ideas into fully-fledged provisional patents, filed with the USPTO. Check out <a href="/Lactasense Provisional Patent.pdf" target="_blank" rel="noopener noreferrer"><u>Lactasense</u></a> and <a href="/Impedix Provisional Patent.pdf" target="_blank" rel="noopener noreferrer"><u>Impedix</u></a>.
        </>
      ),
      tags: ["Complete", "Personal"],
      date: "Fall 2025",
      category: "completed",
      link: "https://chatgpt.com/g/g-p-68faf2f3fc08819198fbf6558df79a63-impedix-patent/project"
    }
  ]

  const filteredProjects = projects.filter(project => project.category === selectedCategory)

  return (
    <div className="projects">
      <div className="experience-toggle">
        <div className="toggle-container">
          <button
            className={`toggle-button ${selectedCategory === 'active' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('active')}
          >
            Active
          </button>
          <div className="toggle-separator"></div>
          <button
            className={`toggle-button ${selectedCategory === 'completed' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('completed')}
          >
            Completed
          </button>
          <div className="toggle-separator"></div>
          <button
            className={`toggle-button ${selectedCategory === 'in-pipeline' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('in-pipeline')}
          >
            In the Pipeline
          </button>
        </div>
      </div>
      {filteredProjects.map((project, index) => (
        <div key={index} className="project-item">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <p className="project-title">
                {project.title}
                <HiArrowUpRight className="project-arrow" />
              </p>
            </a>
          ) : (
            <div className="project-link">
              <p className="project-title">
                {project.title}
              </p>
            </div>
          )}
          <p className="project-description">{project.description}</p>
          {project.tags && project.tags.length > 0 && (
            <div className="project-tags">
              {project.tags.map((tag, tagIndex) => (
                <React.Fragment key={tagIndex}>
                  <span className="project-tag">{tag}</span>
                  {tagIndex < project.tags.length - 1 && <span className="meta-separator"> · </span>}
                </React.Fragment>
              ))}
              {project.date && (
                <>
                  <span className="project-separator"> | </span>
                  <span className="project-date">{project.date}</span>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Projects

