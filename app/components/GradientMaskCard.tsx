'use client'

import { useRef, useState, useEffect } from 'react'

interface GradientMaskCardProps {
  title: string
  description: string
  tags: string[]
  gradientColors?: string
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
  gradientColors = 'from-purple-500/20 to-blue-500/20'
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
      
      // 生成新的随机字符串
      setRandomText(getRandomString(2000))
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
    setRandomText(getRandomString(2000))
    
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

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full border-b border-zinc-800 hover:border-zinc-600 transition-all duration-300 py-4 cursor-pointer"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-8">
        {/* 左侧：标签、标题、描述 */}
        <div className="flex-1 space-y-1">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">{tags[0]}</p>
          <h3 className="text-3xl md:text-5xl font-bold transition-transform duration-300 group-hover:translate-x-2">{title}</h3>
          <p className="text-xs text-zinc-400 uppercase tracking-wide">{description}</p>
        </div>

        {/* 右侧：GradientMask 效果区域 */}
        <div className="relative w-40 h-40 overflow-hidden rounded-2xl flex-shrink-0">
          {/* 背景渐变 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors}`} />
          
          {/* 动态文字层 - 带遮罩 */}
          <div
            ref={decoRef}
            className="absolute inset-0 font-mono text-[0.6rem] leading-tight break-all text-white pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              WebkitMaskImage: 'radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black 20%, rgba(0,0,0,0.25), transparent)',
              maskImage: 'radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black 20%, rgba(0,0,0,0.25), transparent)'
            }}
          >
            {randomText}
          </div>

          {/* 渐变叠加层 */}
          <div 
            className="absolute inset-0 opacity-70"
            style={{
              background: 'radial-gradient(rgb(23, 24, 37) 40%, rgb(102, 51, 238) 50%, rgb(142, 100, 255), rgb(249, 38, 114))',
              mixBlendMode: 'darken'
            }}
          />
        </div>
      </div>
    </div>
  )
}
