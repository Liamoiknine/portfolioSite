import React, { useState, useEffect, useRef } from 'react'
import Typewriter from 'typewriter-effect'

function Intro({ hasAnimatedRef }) {
  const [showP1, setShowP1] = useState(false)
  const [startP1Typewriter, setStartP1Typewriter] = useState(false)
  const [showP2, setShowP2] = useState(false)
  const [showP3, setShowP3] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const [showSkipButton, setShowSkipButton] = useState(false)
  const animationStartedRef = useRef(false)
  const typewriterRefs = useRef([])

  const skipAnimation = () => {
    // Stop all typewriter animations
    typewriterRefs.current.forEach(ref => {
      if (ref && ref.stop) {
        ref.stop()
      }
    })
    
    // Set all states to final values
    setShowP1(true)
    setStartP1Typewriter(true)
    setShowP2(true)
    setShowP3(true)
    setAllDone(true)
    hasAnimatedRef.current = true
  }

  useEffect(() => {
    if (hasAnimatedRef.current) {
      // Animation already played, show final state immediately - no transitions
      setShowP1(true)
      setStartP1Typewriter(true)
      setShowP2(true)
      setShowP3(true)
      setAllDone(true)
      animationStartedRef.current = false // Reset since animation is complete
    }
    
    // Cleanup: if component unmounts while animation is in progress, fast-forward
    return () => {
      if (animationStartedRef.current && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true
      }
    }
  }, [hasAnimatedRef])

  useEffect(() => {
    if (showP1 && !hasAnimatedRef.current && !allDone) {
      // Show skip button right after h1 finishes
      setShowSkipButton(true)
      // Delay the first paragraph typewriter to let skip finish typing
      const timer = setTimeout(() => {
        setStartP1Typewriter(true)
      }, 500)
      
      return () => clearTimeout(timer)
    } else {
      setShowSkipButton(false)
      if (hasAnimatedRef.current) {
        setStartP1Typewriter(true)
      }
    }
  }, [showP1, hasAnimatedRef, allDone])

  return (
    <div 
      className={`intro ${(allDone || hasAnimatedRef.current) ? 'slide-up' : ''} ${hasAnimatedRef.current ? 'locked' : ''}`}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <h1 className={hasAnimatedRef.current ? 'hidden' : ''}>
          {hasAnimatedRef.current ? (
            "What's up, I'm Liam"
          ) : (
            <Typewriter
              onInit={(typewriter) => {
                animationStartedRef.current = true
                typewriterRefs.current[0] = typewriter
                typewriter
                  .typeString("What's up, I'm Liam")
                  .callFunction(() => {
                    setShowP1(true)
                  })
                  .start()
              }}
              options={{
                delay: 30,
                cursor: '',
              }}
            />
          )}
        </h1>
        {showSkipButton && (
          <button 
            className="skip-button"
            onClick={skipAnimation}
          >
            {hasAnimatedRef.current ? (
              "skip >"
            ) : (
              <Typewriter
                onInit={(typewriter) => {
                  typewriterRefs.current[4] = typewriter
                  typewriter
                    .typeString("skip >")
                    .start()
                }}
                options={{
                  delay: 20,
                  cursor: '',
                }}
              />
            )}
          </button>
        )}
      </div>
      {showP1 && (
        <p>
          {hasAnimatedRef.current ? (
            <>I'm a third-year undergrad at WashU, studying <span className="bold-text">Computer Science</span> and <span className="bold-text">Physics</span> and playing on the <span className="bold-text">Men's Soccer Team</span>.</>
          ) : startP1Typewriter ? (
            <Typewriter
              onInit={(typewriter) => {
                typewriterRefs.current[1] = typewriter
                typewriter
                  .typeString("I'm a third-year undergrad at WashU, studying <span class='bold-text'>Computer Science</span> and <span class='bold-text'>Physics</span> and playing on the <span class='bold-text'>Men's Soccer Team</span>.")
                  .callFunction(() => {
                    setShowP2(true)
                  })
                  .start()
              }}
              options={{
                delay: 20,
                cursor: '',
              }}
            />
          ) : null}
        </p>
      )}
      {showP2 && (
        <p>
          {hasAnimatedRef.current ? (
            "Currently interested in technology and opportunity across any domain. Mostly just want to work hard, solve real problems, and learn."
          ) : (
            <Typewriter
              onInit={(typewriter) => {
                typewriterRefs.current[2] = typewriter
                typewriter
                  .typeString("Currently interested in technology and opportunity across any domain. Mostly just want to work hard, solve real problems, and learn.")
                  .callFunction(() => {
                    setShowP3(true)
                  })
                  .start()
              }}
              options={{
                delay: 20,
                cursor: '',
              }}
            />
          )}
        </p>
      )}
      {showP3 && (
        <p>
          {hasAnimatedRef.current ? (
            "I'm also good at cooking, awful at sleeping, and consistently confused about the meaning of life."
          ) : (
            <Typewriter
              onInit={(typewriter) => {
                typewriterRefs.current[3] = typewriter
                typewriter
                  .typeString("I'm also good at cooking, awful at sleeping, and consistently confused about the meaning of life.")
                  .callFunction(() => {
                    setAllDone(true)
                    // Delay setting the ref to allow animations to complete
                    setTimeout(() => {
                      hasAnimatedRef.current = true
                    }, 2500) // 1.5s slide-up + 0.8s h1 fade + buffer
                  })
                  .start()
              }}
              options={{
                delay: 20,
                cursor: '',
              }}
            />
          )}
        </p>
      )}
      {(allDone || hasAnimatedRef.current) && <div className="content-separator"></div>}
      {(allDone || hasAnimatedRef.current) && (
        <div className={`additional-content ${hasAnimatedRef.current ? 'visible' : ''}`}>
          <p>Right now I'm building software and product at <a href="https://www.statushealth.co/" target="_blank"><u>Status Health</u></a>, a healthtech startup in St. Louis</p>
          <p>I'm also heavily involved in the <a href="https://wolframsyndrome.wustl.edu/wolfram-research/" target="_blank"><u>Urano Research Lab</u></a> here at WashU, where I've focused on genetics research and more recently intervention software.</p>
        </div>
      )}
    </div>
  )
}

export default Intro

