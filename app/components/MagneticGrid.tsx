'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface MagneticGridProps {
  className?: string
}

export default function MagneticGrid({ className = '' }: MagneticGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const figuresRef = useRef<(HTMLElement | null)[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const hoveredIndex = useRef<number | null>(null)

  // 9张图片配置
  const images = [
    { id: 1, rotate: -5, translate: { x: 0, y: -5 } },
    { id: 2, rotate: 5, translate: { x: 0, y: 0 } },
    { id: 3, rotate: 10, translate: { x: 0, y: 10 } },
    { id: 4, rotate: -8, translate: { x: 0, y: 5 } },
    { id: 5, rotate: 0, translate: { x: 0, y: 0 } },
    { id: 6, rotate: 8, translate: { x: 0, y: -5 } },
    { id: 7, rotate: 12, translate: { x: 0, y: 8 } },
    { id: 8, rotate: -6, translate: { x: 0, y: 0 } },
    { id: 9, rotate: 6, translate: { x: 0, y: -8 } },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const figures = figuresRef.current

    // 鼠标移动处理
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 100,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 100,
      }

      // 使用 GSAP 更新磁性效果
      updateMagneticEffect()
    }

    // 更新磁性效果
    const updateMagneticEffect = () => {
      const magneticStrength = 0.1
      const magneticX = mousePos.current.x * magneticStrength
      const magneticY = mousePos.current.y * magneticStrength

      figures.forEach((figure, index) => {
        if (!figure) return

        const imgConfig = images[index]
        let scale = 0.9
        let translateX = imgConfig.translate.x
        let translateY = imgConfig.translate.y

        if (hoveredIndex.current !== null) {
          if (hoveredIndex.current === index) {
            scale = 1
          } else {
            scale = 0.8
            // 计算推开效果
            const row = Math.floor(index / 3)
            const col = index % 3
            const hoveredRow = Math.floor(hoveredIndex.current / 3)
            const hoveredCol = hoveredIndex.current % 3

            if (row === hoveredRow) {
              if (col < hoveredCol) translateX = -5
              if (col > hoveredCol) translateX = 5
            }
            if (col === hoveredCol) {
              if (row < hoveredRow) translateY = 5
              if (row > hoveredRow) translateY = -10
            }
          }
        }

        // 使用 GSAP 动画
        gsap.to(figure, {
          x: `calc(${magneticX}% + ${translateX}%)`,
          y: `calc(${magneticY}% + ${translateY}%)`,
          rotateX: -magneticY * 0.5,
          rotateY: magneticX * 0.5,
          rotateZ: imgConfig.rotate,
          scale: scale,
          duration: hoveredIndex.current === index ? 0.6 : 0.3,
          ease: 'power2.out',
        })
      })
    }

    // 监听鼠标移动
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 初始化位置
    figures.forEach((figure, index) => {
      if (!figure) return
      const imgConfig = images[index]
      gsap.set(figure, {
        x: `${imgConfig.translate.x}%`,
        y: `${imgConfig.translate.y}%`,
        rotateZ: imgConfig.rotate,
        scale: 0.9,
      })
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // 处理悬停
  const handleMouseEnter = (index: number) => {
    hoveredIndex.current = index
    if (figuresRef.current[index]) {
      gsap.to(figuresRef.current[index], {
        zIndex: 20,
        duration: 0,
      })
    }
  }

  const handleMouseLeave = () => {
    const prevIndex = hoveredIndex.current
    hoveredIndex.current = null
    
    if (prevIndex !== null && figuresRef.current[prevIndex]) {
      gsap.to(figuresRef.current[prevIndex], {
        zIndex: prevIndex === 4 ? 10 : 1,
        duration: 0,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex items-center justify-center p-8 md:p-16 ${className}`}
      style={{ perspective: '80rem', backgroundColor: '#000000' }}
    >
      <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl">
        {images.map((img, index) => (
          <figure
            key={img.id}
            ref={(el) => {
              figuresRef.current[index] = el
            }}
            className="relative aspect-square cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              zIndex: index === 4 ? 10 : 1,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={`https://picsum.photos/seed/${img.id}/800/800`}
              alt={`Gallery image ${img.id}`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              unoptimized
            />
          </figure>
        ))}
      </div>
      
      <div className="absolute bottom-8 text-zinc-500 text-xs uppercase text-center opacity-60 pointer-events-none">
        (Hover to interact)
      </div>
    </div>
  )
}
