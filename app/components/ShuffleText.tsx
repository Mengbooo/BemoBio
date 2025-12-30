'use client'

import { useEffect, useRef, useState } from 'react'

interface ShuffleTextProps {
  text: string
  duration?: number
  className?: string
}

export default function ShuffleText({
  text,
  duration = 2000,
  className = ''
}: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

  useEffect(() => {
    let iteration = 0
    const maxIterations = text.length
    
    const shuffle = () => {
      setDisplayText(prevText => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            // Reveal character progressively
            if (index < iteration) {
              return text[index]
            }
            
            // Show random character
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      })
      
      iteration += 1 / 3
      
      if (iteration >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setDisplayText(text)
      }
    }
    
    // Start shuffle animation
    intervalRef.current = setInterval(shuffle, duration / (maxIterations * 3))
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, duration])

  // Rainbow color gradient for each character
  const getRainbowColor = (index: number, total: number) => {
    const hue = (index / total) * 360
    return `hsl(${hue}, 80%, 65%)`
  }

  return (
    <div className={className}>
      <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
        {displayText.split('').map((char, index) => (
          <span
            key={index}
            style={{
              color: getRainbowColor(index, displayText.length),
              display: 'inline-block',
              textShadow: `0 0 8px ${getRainbowColor(index, displayText.length)}`
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  )
}
