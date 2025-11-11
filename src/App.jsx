import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Intro from './components/Intro.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('activeSection')
    return saved || 'intro'
  })
  // Animation state - always starts fresh on reload
  const hasAnimatedRef = useRef(false)

  // Vanta background and reveal effect state
  const mainCardRef = useRef(null)
  const vantaRef = useRef(null)
  const overlayRef = useRef(null)
  const vantaEffect = useRef(null)
  const colorIntervalRef = useRef(null)
  const checkVantaIntervalRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothedPosition, setSmoothedPosition] = useState({ x: 0, y: 0 })
  const [blobShape, setBlobShape] = useState({ width: 400, height: 400, rotation: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animationFrameRef = useRef(null)
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const [cardBounds, setCardBounds] = useState({ top: 0, left: 0, width: 0, height: 0 })

  // Save to localStorage whenever activeSection changes
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection)
  }, [activeSection])

  // Calculate main-card position for fixed background
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

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      updateCardBounds()
      // Also update after a short delay to catch any layout changes
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

  // Resize Vanta when card bounds change
  useEffect(() => {
    if (vantaEffect.current && cardBounds.width > 0 && cardBounds.height > 0) {
      // Trigger Vanta resize
      if (vantaEffect.current.resize) {
        vantaEffect.current.resize()
      } else {
        // Fallback: trigger window resize event
        window.dispatchEvent(new Event('resize'))
      }
    }
  }, [cardBounds])

  // Initialize Vanta background
  useEffect(() => {
    // Make THREE available globally for Vanta
    if (typeof window !== 'undefined') {
      window.THREE = THREE
    }

    // Array of colors
    const colors = [
      0x00FFFF, // Vibrant Cyan
      0xFF33CC, // Bright Magenta
      0x00FF66, // Vibrant Green
      0x3366FF, // Bright Blue
      0xFFFF33, // Vibrant Yellow
      0x0033CC, // Vivid Deep Blue
      0x001A66  // Intense Navy Blue
    ]

    let currentColorIndex = 0

    // Initialize Vanta - wait for it to be available on window
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
            color: colors[0], // Start with first color
            backgroundColor: 0x0e0e25
          })

          // Cycle through all colors dynamically
          colorIntervalRef.current = setInterval(() => {
            if (vantaEffect.current && vantaEffect.current.setOptions) {
              currentColorIndex = (currentColorIndex + 1) % colors.length
              vantaEffect.current.setOptions({ color: colors[currentColorIndex] })
            }
          }, 5000) // Switch every 5 seconds
        } catch (error) {
          console.error('Error initializing Vanta:', error)
        }
      } else if (vantaRef.current && !window.VANTA) {
        // If VANTA isn't loaded yet, wait a bit and try again
        setTimeout(initVanta, 100)
      }
    }

    // Try to initialize immediately, or wait for VANTA to load
    if (window.VANTA && window.VANTA.TOPOLOGY) {
      initVanta()
    } else {
      // Wait for VANTA to be available
      checkVantaIntervalRef.current = setInterval(() => {
        if (window.VANTA && window.VANTA.TOPOLOGY) {
          if (checkVantaIntervalRef.current) {
            clearInterval(checkVantaIntervalRef.current)
            checkVantaIntervalRef.current = null
          }
          initVanta()
        }
      }, 50)

      // Cleanup check interval after 5 seconds if VANTA never loads
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

    // Cleanup function
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
          // Only destroy if the element still exists
          if (vantaRef.current && vantaRef.current.parentNode) {
            vantaEffect.current.destroy()
          }
        } catch (error) {
          // Ignore cleanup errors
        }
        vantaEffect.current = null
      }
    }
  }, [])

  // Handle mouse movement for reveal effect with lag
  useEffect(() => {
    const container = mainCardRef.current
    
    const handleMouseMove = (e) => {
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Calculate velocity for morphing effect
      const dx = x - prevMouseRef.current.x
      const dy = y - prevMouseRef.current.y
      
      // Smooth velocity with damping
      velocityRef.current.x = velocityRef.current.x * 0.7 + dx * 0.3
      velocityRef.current.y = velocityRef.current.y * 0.7 + dy * 0.3
      
      // Update target position (cursor position)
      targetPositionRef.current = { x, y }
      prevMouseRef.current = { x, y }
      setMousePosition({ x, y })
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Smooth animation loop for lag effect with morphing blob
  useEffect(() => {
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      // Smooth interpolation factor (lower = more lag, 0.12 = smooth trailing)
      const smoothingFactor = 0.12
      
      setSmoothedPosition(prev => {
        const newX = lerp(prev.x, targetPositionRef.current.x, smoothingFactor)
        const newY = lerp(prev.y, targetPositionRef.current.y, smoothingFactor)
        
        // Calculate blob shape based on velocity
        const velX = velocityRef.current.x
        const velY = velocityRef.current.y
        const speed = Math.sqrt(velX * velX + velY * velY)
        
        // Base size
        const baseSize = 400
        // Stretch factor based on speed (more speed = more stretch)
        const stretchFactor = Math.min(1 + speed * 0.02, 1.8)
        const shrinkFactor = Math.max(1 - speed * 0.01, 0.6)
        
        // Calculate rotation based on velocity direction
        const angle = Math.atan2(velY, velX) * (180 / Math.PI)
        
        // Morph the blob shape
        setBlobShape(prev => ({
          width: lerp(prev.width, baseSize * stretchFactor, 0.15),
          height: lerp(prev.height, baseSize * shrinkFactor, 0.15),
          rotation: lerp(prev.rotation, angle, 0.1)
        }))
        
        return { x: newX, y: newY }
      })
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Calculate mask gradient based on smoothed position with morphing blob shape
  const maskGradient = isHovering
    ? `radial-gradient(ellipse ${blobShape.width}px ${blobShape.height}px at ${smoothedPosition.x}px ${smoothedPosition.y}px, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.95) 85%, black 100%)`
    : 'radial-gradient(circle, black 0%, black 100%)'

  return (
    <div className="app-container">
      <div className="main-card" ref={mainCardRef}>
        {/* Vanta background layer - fixed in place on scroll */}
        <div 
          ref={vantaRef}
          style={{
            position: 'fixed',
            top: cardBounds.width > 0 ? `${cardBounds.top}px` : '0px',
            left: cardBounds.width > 0 ? `${cardBounds.left}px` : '0px',
            width: cardBounds.width > 0 ? `${cardBounds.width}px` : '100%',
            height: cardBounds.height > 0 ? `${cardBounds.height}px` : '100%',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
        {/* Overlay with reveal effect - fixed in place on scroll */}
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            top: cardBounds.width > 0 ? `${cardBounds.top}px` : '0px',
            left: cardBounds.width > 0 ? `${cardBounds.left}px` : '0px',
            width: cardBounds.width > 0 ? `${cardBounds.width}px` : '100%',
            height: cardBounds.height > 0 ? `${cardBounds.height}px` : '100%',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
            maskSize: '100%',
            WebkitMaskSize: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        {/* Content layer */}
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
    </div>
  )
}

export default App

