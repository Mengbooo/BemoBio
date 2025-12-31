'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface GradientMaskCardProps {
  title: string
  description: string
  tags: string[]
  gradientColors?: string
  link?: string
  icon?: string
}

const getRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]<>/\\|;:,.?~`'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

export default function GradientMaskCard({
  title,
  description,
  tags,
  gradientColors = 'from-purple-500/20 to-blue-500/20',
  link,
  icon
}: GradientMaskCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const decoRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | undefined>(undefined)
  const renderedStyles = useRef({
    x: { previous: 0, current: 0, amt: 0.1 },
    y: { previous: 0, current: 0, amt: 0.1 }
  })
  const [randomText, setRandomText] = useState('')

  useEffect(() => {
    if (!cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      renderedStyles.current.x.current = x
      renderedStyles.current.y.current = y
      
      // 生成新的随机字符串 - 增加字符数量确保覆盖整个区域
      setRandomText(getRandomString(5000))
    }

    const animate = () => {
      if (!isHovered || !cardRef.current) return

      // 平滑插值
      renderedStyles.current.x.previous = lerp(
        renderedStyles.current.x.previous,
        renderedStyles.current.x.current,
        renderedStyles.current.x.amt
      )
      renderedStyles.current.y.previous = lerp(
        renderedStyles.current.y.previous,
        renderedStyles.current.y.current,
        renderedStyles.current.y.amt
      )

      // 更新 CSS 变量
      cardRef.current.style.setProperty('--mouse-x', `${renderedStyles.current.x.previous}px`)
      cardRef.current.style.setProperty('--mouse-y', `${renderedStyles.current.y.previous}px`)

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove)
      animate()
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    setRandomText(getRandomString(5000))
    
    // 初始化位置
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      renderedStyles.current.x.previous = rect.width / 2
      renderedStyles.current.y.previous = rect.height / 2
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative w-full border-b border-zinc-800 hover:border-zinc-600 transition-all duration-300 py-4 cursor-pointer overflow-visible"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      } as React.CSSProperties}
    >
      {/* 全局动态文字层 - 覆盖整个卡片 */}
      <div
        ref={decoRef}
        className="absolute top-0 left-0 right-0 bottom-0 font-mono text-[0.6rem] leading-tight break-all pointer-events-none transition-opacity duration-500 z-20 overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black 20%, rgba(0,0,0,0.25), transparent)',
          maskImage: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black 20%, rgba(0,0,0,0.25), transparent)',
          minHeight: '100%',
          backgroundImage: 'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080, #7b68ee, #00ced1)',
          backgroundSize: '400% 400%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: 'gradient-shift 8s ease infinite'
        }}
      >
        {randomText}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="flex items-center justify-between gap-8">
        {/* 左侧：标签、SVG图标、描述 */}
        <div className="flex-1 space-y-1">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">{tags[0]}</p>
          
          {/* SVG 图标代替标题 */}
          {icon && (
            <div className="w-32 h-16 my-2">
              <Image
                src={icon}
                alt={title}
                width={128}
                height={64}
                className="w-full h-full object-contain object-left"
                style={{
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9
                }}
              />
            </div>
          )}
          
          <p className="text-xs text-zinc-400 uppercase tracking-wide">{description}</p>
        </div>
      </div>
    </div>
  )
}
