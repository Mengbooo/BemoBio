'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollTextMotionProps {
  text?: string
  sideText?: string
  className?: string
}

export default function ScrollTextMotion({ 
  text = "Creative Developer",
  sideText = "Design • Code • Create",
  className = '' 
}: ScrollTextMotionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainTextRef = useRef<HTMLDivElement>(null)
  const sideTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !mainTextRef.current || !sideTextRef.current) return

    const mainLetters = mainTextRef.current.querySelectorAll('.main-letter')
    const sideLetters = sideTextRef.current.querySelectorAll('.side-letter')

    // Main text animation
    mainLetters.forEach((letter, index) => {
      gsap.fromTo(
        letter,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
          delay: index * 0.03,
        }
      )
    })

    // Side text animation (vertical scroll)
    gsap.fromTo(
      sideTextRef.current,
      {
        y: -100,
        opacity: 0.3,
      },
      {
        y: 100,
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      }
    )

    // Side letters stagger
    sideLetters.forEach((letter, index) => {
      gsap.fromTo(
        letter,
        {
          opacity: 0.2,
          x: -20,
        },
        {
          opacity: 0.6,
          x: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
          delay: index * 0.02,
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [text, sideText])

  const splitText = (text: string, className: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`${className} inline-block`}
        style={{
          display: 'inline-block',
          transformOrigin: '50% 100%',
          perspective: '1000px',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Side decorative text */}
      <div
        ref={sideTextRef}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-700 text-sm md:text-base font-medium"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '0.2em',
          fontFamily: '"Google Sans", "Inter", system-ui, sans-serif',
        }}
      >
        {splitText(sideText, 'side-letter')}
      </div>

      {/* Main text */}
      <div
        ref={mainTextRef}
        className="text-5xl md:text-7xl lg:text-9xl font-bold text-white text-center px-8 md:px-16"
        style={{
          fontFamily: '"Google Sans", "Inter", system-ui, sans-serif',
          lineHeight: '1.1',
        }}
      >
        {splitText(text, 'main-letter')}
      </div>

      {/* Right side decorative text */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-700 text-sm md:text-base font-medium"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '0.2em',
          fontFamily: '"Google Sans", "Inter", system-ui, sans-serif',
        }}
      >
        {splitText(sideText, 'side-letter')}
      </div>
    </div>
  )
}
