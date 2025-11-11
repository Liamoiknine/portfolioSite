import React, { useState, useEffect, useRef } from 'react'
import Typewriter from 'typewriter-effect'

function Intro({ hasAnimatedRef }) {
  const [showP1, setShowP1] = useState(false)
  const [showP2, setShowP2] = useState(false)
  const [showP3, setShowP3] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const animationStartedRef = useRef(false)

  useEffect(() => {
    if (hasAnimatedRef.current) {
      // Animation already played, show final state immediately - no transitions
      setShowP1(true)
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

  return (
    <div 
      className={`intro ${(allDone || hasAnimatedRef.current) ? 'slide-up' : ''} ${hasAnimatedRef.current ? 'locked' : ''}`}
    >
      <h1 className={hasAnimatedRef.current ? 'hidden' : ''}>
        {hasAnimatedRef.current ? (
          "What's up, I'm Liam"
        ) : (
          <Typewriter
            onInit={(typewriter) => {
              animationStartedRef.current = true
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
      {showP1 && (
        <p>
          {hasAnimatedRef.current ? (
            <>I'm a third-year undergrad at WashU, studying <span className="bold-text">Computer Science</span> and <span className="bold-text">Physics</span> and playing on the <span className="bold-text">Men's Soccer Team</span>.</>
          ) : (
            <Typewriter
              onInit={(typewriter) => {
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
          )}
        </p>
      )}
      {showP2 && (
        <p>
          {hasAnimatedRef.current ? (
            "Currently interested in technology and opportunity across any domain. Mostly just want to work hard, solve real problems, and learn."
          ) : (
            <Typewriter
              onInit={(typewriter) => {
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
          <p>I'm currently building software and product at <a href="https://www.statushealth.co/" target="_blank"><u>Status Health</u></a>, a healthtech startup in St. Louis</p>
          <p>I'm also heavily involved in the <a href="https://endocrinology.wustl.edu/items/urano-lab/" target="_blank"><u>Urano Research Lab</u></a> here at WashU, where I've focused on genetics research and more recently intervention software.</p>
        </div>
      )}
    </div>
  )
}

export default Intro

