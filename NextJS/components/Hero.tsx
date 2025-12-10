"use client"

import { useState, useEffect } from "react"

const Hero = () => {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Listening through a new Perspective"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="container text-center">
        <div className="mb-8">
          <img 
            src="/logo.jpg" 
            alt="Messier Mastering Logo" 
            className="mx-auto w-80 h-80 md:w-96 md:h-96 object-cover rounded-full shadow-2xl ring-4 ring-white/20"
            style={{
              imageRendering: 'auto',
              filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
            }}
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-light mb-6">
          Messier <span className="font-bold">Mastering</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto min-h-[4rem] flex items-center justify-center">
          {displayText}
          <span className="animate-pulse ml-1">|</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" className="btn-secondary">
            Our Services
          </a>
          <a href="#contact" className="btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
