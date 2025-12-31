'use client'

import { useEffect, useRef } from 'react'

// ASCII 字符集：按密度从稀疏到稠密排列
const DENSITY = " .`',:;=+*#%@$NÑ"

export default function FluidTriangle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | undefined>(undefined)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // --- 配置参数 ---
    const fontSize = 12
    const fontName = 'monospace'
    
    // 物理参数
    const speed = 0.025      // 波浪速度
    const fillLevel = 0.2    // 水位高度 (0=满, 1=空, 0.6=60%水位)
    const waveScale = 0.03   // 波浪的水平拉伸程度
    const waveHeight = 0.100  // 波浪的垂直振幅 (相对于屏幕高度)

    let cols = 0
    let rows = 0

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      cols = Math.floor(canvas.width / fontSize)
      rows = Math.floor(canvas.height / fontSize)
      ctx.font = `${fontSize}px ${fontName}`
      ctx.textBaseline = 'top'
    }

    // 内部湍流噪声：模拟水体内部的流动
    const turbulence = (x: number, y: number, t: number) => {
      const v1 = Math.sin(x * 0.05 + t)
      const v2 = Math.cos(y * 0.05 - t)
      const v3 = Math.sin((x + y) * 0.02 + t * 1.5)
      return (v1 + v2 + v3) / 3 // -1 to 1
    }

    // 表面波浪计算：只与 x 和 t 有关
    const getSurfaceHeight = (x: number, t: number) => {
      // 叠加三个正弦波以产生不规则的自然波浪
      const w1 = Math.sin(x * waveScale + t)
      const w2 = Math.sin(x * waveScale * 1.7 + t * 0.7) * 0.5
      const w3 = Math.cos(x * waveScale * 3 + t * 1.2) * 0.2
      
      // 归一化后的波浪偏移量 (-1 到 1 之间大致波动)
      const waveOffset = (w1 + w2 + w3) * waveHeight
      
      // 基础水位 + 波浪偏移
      return fillLevel + waveOffset
    }

    const render = () => {
      // 1. 黑色背景 (水缸背景)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      timeRef.current += speed
      const t = timeRef.current

      // 2. 遍历每一列
      for (let x = 0; x < cols; x++) {
        // 计算当前列的液面高度 (0~1, 0是顶端)
        const surfaceYNormalized = getSurfaceHeight(x, t)
        
        // 转换成网格坐标
        const surfaceRow = Math.floor(surfaceYNormalized * rows)

        // 3. 从液面开始向下绘制，液面以上是空气 (跳过)
        for (let y = surfaceRow; y < rows; y++) {
          // 计算当前点相对于液面的"深度" (0 ~ 1)
          // 深度 0 = 表面, 深度 1 = 缸底
          const depth = (y - surfaceRow) / (rows - surfaceRow || 1)
          
          // --- 物理效果模拟 ---
          
          // 1. 密度计算：深度越大，密度越大 (水压)
          // 加上湍流噪声，让水看起来在流动，而不是固体块
          const flow = turbulence(x, y, t)
          let densityValue = depth * 0.7 + (flow + 1) * 0.15
          
          // 液面附近增加泡沫感 (强制低密度)
          if (y === surfaceRow) densityValue = 0.1
          
          // 限制范围并映射字符
          const charIndex = Math.floor(Math.max(0, Math.min(1, densityValue)) * (DENSITY.length - 1))
          const char = DENSITY[charIndex]

          if (char === ' ') continue

          // 2. 颜色计算 (HSL)
          // 色相：保留彩虹流动效果，但波长拉长
          const hue = (x * 2 + y * 4 + t * 120) % 360
          
          // 亮度：随深度衰减，模拟光线无法穿透深水
          // 表面亮 (65%)，底部暗 (20%)
          const lightness = 65 - depth * 45
          
          // 饱和度：深水处饱和度略微降低
          const saturation = 90 - depth * 20

          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
          ctx.fillText(char, x * fontSize, y * fontSize)
        }
      }

      requestRef.current = requestAnimationFrame(render)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: '#000' }}
    />
  )
}
