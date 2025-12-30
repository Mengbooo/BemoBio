'use client'

import { useEffect, useRef } from 'react'

export default function ASCIICube() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布大小
    const size = 300
    canvas.width = size
    canvas.height = size

    // ASCII字符集（从暗到亮）
    const chars = ' .:-=+*#%@'
    
    // 3D点投影函数
    const project = (x: number, y: number, z: number, distance: number) => {
      const scale = distance / (distance + z)
      return {
        x: x * scale + size / 2,
        y: y * scale + size / 2,
        scale
      }
    }

    // 旋转矩阵
    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return { x, y: y * cos - z * sin, z: y * sin + z * cos }
    }

    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return { x: x * cos + z * sin, y, z: -x * sin + z * cos }
    }

    const rotateZ = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return { x: x * cos - y * sin, y: x * sin + y * cos, z }
    }

    // 创建魔方顶点
    const createCube = (size: number) => {
      const vertices = []
      const s = size / 2
      
      // 生成魔方表面的点
      const density = 8
      for (let i = 0; i < density; i++) {
        for (let j = 0; j < density; j++) {
          const u = (i / (density - 1)) * 2 - 1
          const v = (j / (density - 1)) * 2 - 1
          
          // 6个面
          vertices.push({ x: s, y: u * s, z: v * s }) // 右
          vertices.push({ x: -s, y: u * s, z: v * s }) // 左
          vertices.push({ x: u * s, y: s, z: v * s }) // 上
          vertices.push({ x: u * s, y: -s, z: v * s }) // 下
          vertices.push({ x: u * s, y: v * s, z: s }) // 前
          vertices.push({ x: u * s, y: v * s, z: -s }) // 后
        }
      }
      
      return vertices
    }

    const vertices = createCube(100)
    let angleX = 0
    let angleY = 0
    let angleZ = 0

    // 动画循环
    const animate = () => {
      // 清空画布
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, size, size)

      // 更新旋转角度
      angleX += 0.01
      angleY += 0.015
      angleZ += 0.008

      // 投影点数组
      const projectedPoints: Array<{
        x: number
        y: number
        z: number
        depth: number
      }> = []

      vertices.forEach(v => {
        // 应用旋转
        let point = rotateX(v.x, v.y, v.z, angleX)
        point = rotateY(point.x, point.y, point.z, angleY)
        point = rotateZ(point.x, point.y, point.z, angleZ)

        // 投影到2D
        const projected = project(point.x, point.y, point.z, 300)
        
        projectedPoints.push({
          x: projected.x,
          y: projected.y,
          z: point.z,
          depth: projected.scale
        })
      })

      // 按深度排序（远的先画）
      projectedPoints.sort((a, b) => a.z - b.z)

      // 绘制点
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      projectedPoints.forEach(point => {
        // 根据深度选择字符和颜色
        const depthNormalized = (point.depth - 0.5) * 2 // 0-1范围
        const charIndex = Math.floor(depthNormalized * (chars.length - 1))
        const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))]

        // 彩色渐变（基于位置和时间）
        const hue = (point.z / 100 + angleY * 50) % 360
        const saturation = 70 + depthNormalized * 30
        const lightness = 40 + depthNormalized * 40

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        ctx.fillText(char, point.x, point.y)
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-full">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </div>
  )
}