'use client'

import { useEffect, useRef } from 'react'

interface WaveTextProps {
  text?: string
  className?: string
}

export default function WaveText({ text = 'BemoBio', className = '' }: WaveTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const linesRef = useRef<any[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let horizontalPadding = 0
    let verticalPadding = 0

    const drawWaveEffect = (width: number, height: number) => {
      horizontalPadding = window.innerWidth < 768 ? 0 : width * 0.1
      verticalPadding = height * 0.1

      const linesCount = 80
      const lineHeight = (height - verticalPadding * 2) / linesCount
      const cellWidth = 5
      const cols = Math.floor((width - horizontalPadding * 2) / cellWidth)

      // 创建文字Canvas
      const typeCanvasWidth = 180
      const typeCanvasHeight = 80
      const typeCanvas = document.createElement('canvas')
      const typeContext = typeCanvas.getContext('2d')
      if (!typeContext) return

      typeCanvas.width = typeCanvasWidth
      typeCanvas.height = typeCanvasHeight

      const fontSize = typeCanvasWidth * 0.3
      typeContext.fillStyle = 'black'
      typeContext.fillRect(0, 0, typeCanvasWidth, typeCanvasHeight)
      typeContext.fillStyle = 'white'
      typeContext.font = `bold ${fontSize}px sans-serif`
      typeContext.textBaseline = 'middle'
      typeContext.textAlign = 'center'
      typeContext.fillText(text, typeCanvasWidth / 2, typeCanvasHeight / 2)

      const typeData = typeContext.getImageData(
        0,
        0,
        typeCanvasWidth,
        typeCanvasHeight
      ).data

      linesRef.current = []
      for (let i = 0; i < linesCount; i++) {
        const y = verticalPadding + i * lineHeight
        const line = []

        for (let j = 0; j < cols; j++) {
          const x = horizontalPadding + j * cellWidth

          const typeX = Math.floor((j / cols) * typeCanvasWidth)
          const typeY = Math.floor((i / linesCount) * typeCanvasHeight)
          const index = (typeY * typeCanvasWidth + typeX) * 4
          const brightness = typeData[index] || 0

          const heightOffset = (brightness / 255) * 30
          const finalY = y - heightOffset

          line.push({
            x,
            y: finalY,
            baseX: x,
            baseY: finalY,
          })
        }
        linesRef.current.push(line)
      }
    }

    const updateLines = (mouseX: number, mouseY: number, radius = 100, maxSpeed = 10) => {
      linesRef.current.forEach((line) => {
        line.forEach((point: any) => {
          const dx = point.x - mouseX
          const dy = point.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < radius) {
            const angle = Math.atan2(dy, dx)
            const force = (radius - distance) / radius

            point.x += Math.cos(angle) * force * maxSpeed
            point.y += Math.sin(angle) * force * maxSpeed
          }

          const springX = (point.baseX - point.x) * 0.1
          const springY = (point.baseY - point.y) * 0.1

          point.x += springX
          point.y += springY
        })
      })
    }

    const drawLines = (width: number, height: number) => {
      context.clearRect(0, 0, width, height)

      linesRef.current.forEach((line) => {
        context.beginPath()
        context.moveTo(line[0].x, line[0].y)

        for (let i = 1; i < line.length; i++) {
          const prev = line[i - 1]
          const current = line[i]

          const midX = (prev.x + current.x) / 2
          const midY = (prev.y + current.y) / 2

          context.quadraticCurveTo(prev.x, prev.y, midX, midY)
        }

        context.strokeStyle = '#ffffff'
        context.lineWidth = 0.5
        context.stroke()
      })
    }

    const resizeCanvas = () => {
      const scaleFactor = window.devicePixelRatio || 1
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      canvas.width = width * scaleFactor
      canvas.height = height * scaleFactor

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(scaleFactor, scaleFactor)

      drawWaveEffect(width, height)
    }

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      updateLines(mouseRef.current.x, mouseRef.current.y)
      drawLines(width, height)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current.x = touch.clientX - rect.left
      mouseRef.current.y = touch.clientY - rect.top
    }

    // 初始化
    resizeCanvas()
    animate()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('resize', resizeCanvas)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [text])

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '120px' }}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  )
}
