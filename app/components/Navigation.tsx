'use client'

import { useState } from 'react'

export default function Navigation() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white font-bold">D</span>
        </div>
        <div className="text-white">
          <div className="font-semibold">David</div>
          <div className="text-sm">Haz</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center gap-8 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
        <a href="#projects" className="text-white hover:text-white/80 transition-colors">
          Projects
        </a>
        <a href="#about" className="text-white hover:text-white/80 transition-colors">
          About
        </a>
        <a href="#blog" className="text-white hover:text-white/80 transition-colors">
          Blog
        </a>
        <a href="#contact" className="text-white hover:text-white/80 transition-colors">
          Contact
        </a>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}
