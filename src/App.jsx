import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Intro from './components/Intro'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="main-card">
        <Intro />
      </div>
      <div className="bottom-bar">
        <Nav />
        <Footer />
      </div>
    </div>
  )
}

export default App

