import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Analytics } from '@vercel/analytics/react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Intro from './components/Intro.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    const saved = localStorage.getItem('activeSection')
    return saved || 'intro'
  })
  const hasAnimatedRef = useRef(false)

  const mainCardRef = useRef(null)
  const vantaRef = useRef(null)
  const overlayRef = useRef(null)
  const vantaEffect = useRef(null)
  const colorIntervalRef = useRef(null)
  const checkVantaIntervalRef = useRef(null)
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 })
  const [blobShape, setBlobShape] = useState({ width: 400, height: 400, rotation: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animationFrameRef = useRef(null)
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const [cardBounds, setCardBounds] = useState({ top: 0, left: 0, width: 0, height: 0 })

  useEffect(() => {
    localStorage.setItem('activeSection', activeSection)
  }, [activeSection])

  useEffect(() => {
    const updateCardBounds = () => {
      if (mainCardRef.current) {
        const rect = mainCardRef.current.getBoundingClientRect()
        setCardBounds({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        })
      }
    }

    const rafId = requestAnimationFrame(() => {
      updateCardBounds()
      setTimeout(updateCardBounds, 100)
    })
    
    window.addEventListener('resize', updateCardBounds)
    window.addEventListener('scroll', updateCardBounds)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateCardBounds)
      window.removeEventListener('scroll', updateCardBounds)
    }
  }, [])

  useEffect(() => {
    if (vantaEffect.current && cardBounds.width > 0 && cardBounds.height > 0) {
      if (vantaEffect.current.resize) {
        vantaEffect.current.resize()
      } else {
        window.dispatchEvent(new Event('resize'))
      }
    }
  }, [cardBounds])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.THREE = THREE
    }

    const colors = [
      0x00FFFF,
      0xFF33CC,
      0x00FF66,
      0x3366FF,
      0xFFFF33,
      0x0033CC,
      0x001A66
    ]

    let currentColorIndex = 0

    const initVanta = () => {
      if (vantaRef.current && window.VANTA && window.VANTA.TOPOLOGY) {
        try {
          vantaEffect.current = window.VANTA.TOPOLOGY({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            speed: 3.0,
            color: colors[0],
            backgroundColor: 0x0e0e25
          })

          colorIntervalRef.current = setInterval(() => {
            if (vantaEffect.current?.setOptions) {
              currentColorIndex = (currentColorIndex + 1) % colors.length
              vantaEffect.current.setOptions({ color: colors[currentColorIndex] })
            }
          }, 2000)
        } catch (error) {
          console.error('Error initializing Vanta:', error)
        }
      } else if (vantaRef.current && !window.VANTA) {
        setTimeout(initVanta, 100)
      }
    }

    if (window.VANTA?.TOPOLOGY) {
      initVanta()
    } else {
      checkVantaIntervalRef.current = setInterval(() => {
        if (window.VANTA?.TOPOLOGY) {
          if (checkVantaIntervalRef.current) {
            clearInterval(checkVantaIntervalRef.current)
            checkVantaIntervalRef.current = null
          }
          initVanta()
        }
      }, 50)

      setTimeout(() => {
        if (checkVantaIntervalRef.current) {
          clearInterval(checkVantaIntervalRef.current)
          checkVantaIntervalRef.current = null
        }
        if (!window.VANTA) {
          console.error('VANTA failed to load')
        }
      }, 5000)
    }

    return () => {
      if (checkVantaIntervalRef.current) {
        clearInterval(checkVantaIntervalRef.current)
        checkVantaIntervalRef.current = null
      }
      if (colorIntervalRef.current) {
        clearInterval(colorIntervalRef.current)
        colorIntervalRef.current = null
      }
      if (vantaEffect.current) {
        try {
          if (vantaRef.current?.parentNode) {
            vantaEffect.current.destroy()
          }
        } catch (error) {
          // Ignore cleanup errors
        }
        vantaEffect.current = null
      }
    }
  }, [])

  useEffect(() => {
    const container = mainCardRef.current
    if (!container) return
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const dx = x - prevMouseRef.current.x
      const dy = y - prevMouseRef.current.y
      
      velocityRef.current.x = velocityRef.current.x * 0.7 + dx * 0.3
      velocityRef.current.y = velocityRef.current.y * 0.7 + dy * 0.3
      
      targetPositionRef.current = { x, y }
      prevMouseRef.current = { x, y }
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      const smoothingFactor = 0.12
      
      setSmoothedPosition(prev => {
        const newX = lerp(prev.x, targetPositionRef.current.x, smoothingFactor)
        const newY = lerp(prev.y, targetPositionRef.current.y, smoothingFactor)
        
        const velX = velocityRef.current.x
        const velY = velocityRef.current.y
        const speed = Math.sqrt(velX * velX + velY * velY)
        
        const baseSize = 400
        const stretchFactor = Math.min(1 + speed * 0.02, 1.8)
        const shrinkFactor = Math.max(1 - speed * 0.01, 0.6)
        const angle = Math.atan2(velY, velX) * (180 / Math.PI)
        
        setBlobShape(prev => ({
          width: lerp(prev.width, baseSize * stretchFactor, 0.15),
          height: lerp(prev.height, baseSize * shrinkFactor, 0.15),
          rotation: lerp(prev.rotation, angle, 0.1)
        }))
        
        return { x: newX, y: newY }
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const maskGradient = isHovering
    ? `radial-gradient(ellipse ${blobShape.width}px ${blobShape.height}px at ${smoothedPosition.x}px ${smoothedPosition.y}px, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.95) 85%, black 100%)`
    : 'radial-gradient(circle, black 0%, black 100%)'

  const backgroundStyle = cardBounds.width > 0
    ? {
        position: 'fixed',
        top: `${cardBounds.top}px`,
        left: `${cardBounds.left}px`,
        width: `${cardBounds.width}px`,
        height: `${cardBounds.height}px`,
        borderRadius: '16px',
        overflow: 'hidden'
      }
    : {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        overflow: 'hidden'
      }

  return (
    <div className="app-container">
      <div className="main-card" ref={mainCardRef}>
        <div 
          ref={vantaRef}
          style={{
            ...backgroundStyle,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
        <div
          ref={overlayRef}
          style={{
            ...backgroundStyle,
            backgroundColor: 'rgba(0, 0, 0, 1)',
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
            maskSize: '100%',
            WebkitMaskSize: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
          {activeSection === 'intro' && <Intro hasAnimatedRef={hasAnimatedRef} />}
          {activeSection === 'projects' && <Projects />}
          {activeSection === 'experience' && <Experience />}
        </div>
      </div>
      <div className="bottom-bar">
        <Nav setActiveSection={setActiveSection} activeSection={activeSection} />
        <Footer />
      </div>
      <Analytics />
    </div>
  )
}

export default App

