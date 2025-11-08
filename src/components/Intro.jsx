import React, { useState } from 'react'
import Typewriter from 'typewriter-effect'

function Intro() {
  const [showH4, setShowH4] = useState(false)
  const [hideH4, setHideH4] = useState(false)
  const [showP1, setShowP1] = useState(false)
  const [showP2, setShowP2] = useState(false)
  const [showP3, setShowP3] = useState(false)
  const [allDone, setAllDone] = useState(false)

  return (
    <div 
      className={`intro ${allDone ? 'slide-up' : ''}`}
    >
      <h1>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("What's up, I'm Liam")
              .callFunction(() => {
                setShowH4(true)
              })
              .start()
          }}
          options={{
            delay: 50,
            cursor: '',
          }}
        />
      </h1>
      {showH4 && !hideH4 && (
        <h4>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Nice typing animation, right?")
                .pauseFor(800)
                .deleteAll()
                .callFunction(() => {
                  setHideH4(true)
                  setShowP1(true)
                })
                .start()
            }}
            options={{
              delay: 10,
              cursor: '',
            }}
          />
        </h4>
      )}
      {showP1 && (
        <p>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("I'm a third-year undergrad at WashU, studying <u>Computer Science</u> and <u>Physics</u> and playing on the <u>Men's Soccer Team</u>.")
                .callFunction(() => {
                  setShowP2(true)
                })
                .start()
            }}
            options={{
              delay: 10,
              cursor: '',
            }}
          />
        </p>
      )}
      {showP2 && (
        <p>
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
              delay: 10,
              cursor: '',
            }}
          />
        </p>
      )}
      {showP3 && (
        <p>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("I'm also good at cooking, awful at sleeping, and consistently confused about the meaning of life.")
                .callFunction(() => {
                  setAllDone(true)
                })
                .start()
            }}
            options={{
              delay: 10,
              cursor: '',
            }}
          />
        </p>
      )}
      {allDone && <div className="content-separator"></div>}
      {allDone && <div className="additional-content">
        <p>I'm currently building software and product at Status Health, a healthtech startup in St. Louis</p>
        <p>I'm also heavily involved in the Urano Research Lab here at WashU, where I've focused on genetics research and more recently intervention software dev.</p>
      </div>}
    </div>
  )
}

export default Intro

