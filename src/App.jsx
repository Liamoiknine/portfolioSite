import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio.jsx'
import ThriveVideo from './components/ThriveVideo.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/thrive-video" element={<ThriveVideo />} />
    </Routes>
  )
}

export default App

