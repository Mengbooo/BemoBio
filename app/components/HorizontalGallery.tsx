'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion'

export default function ScrollVelocityText() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  // 使用整个页面的滚动
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  // 基础滚动位置（使用 MotionValue）
  const baseX = useMotionValue(0)
  const baseXReverse = useMotionValue(0)
  
  // 文字列表
  const texts = [
    'Creative',
    'Design',
    'Developer',
    'Innovation',
    'Passion',
    'Excellence',
    'Quality',
    'Vision',
  ]

  // 固定的颜色数组（避免 SSR 水合错误）
  const fixedColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FF85A1', '#A8DADC', '#FFD93D', '#6BCF7F', '#F39C6B',
    '#00D9FF', '#FF006E', '#8338EC', '#FFBE0B', '#06FFA5',
  ]

  // 为每个字符生成固定颜色（每次渲染都相同）
  const coloredTexts = texts.map((text, textIndex) => 
    text.split('').map((char, charIndex) => ({
      char,
      // 使用固定的颜色索引
      color: fixedColors[(textIndex * 10 + charIndex) % fixedColors.length]
    }))
  )

  // 平滑速度
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  // 速度因子（页面滚动时加速）
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false,
  })

  // 标记组件已挂载
  useEffect(() => {
    setMounted(true)
  }, [])

  // 自动滚动动画
  useAnimationFrame((t, delta) => {
    if (!mounted) return
    
    // 基础自动滚动速度（像素/帧）
    const baseSpeed = -1
    
    // 获取当前速度加成
    const scrollSpeed = velocityFactor.get()
    
    // 第一行：向左滚动
    const moveBy = (baseSpeed + scrollSpeed * -3) * (delta / 16)
    let newX = baseX.get() + moveBy
    
    // 无限循环：使用 modulo 实现真正的无限循环
    // 每组文字的宽度约为视口的 50%
    const loopWidth = window.innerWidth * 0.5 * texts.length
    newX = newX % -loopWidth
    baseX.set(newX)
    
    // 第二行：向右滚动
    const moveByReverse = (-baseSpeed + scrollSpeed * 3) * (delta / 16)
    let newXReverse = baseXReverse.get() + moveByReverse
    
    // 反向无限循环
    newXReverse = newXReverse % loopWidth
    baseXReverse.set(newXReverse)
  })

  // 服务端渲染时不显示动画
  if (!mounted) {
    return <div className="relative bg-black py-16 h-[200px]" />
  }

  return (
    <div ref={targetRef} className="relative bg-black py-16 overflow-hidden">
      {/* 第一行 - 向左自动滚动 */}
      <motion.div
        className="flex whitespace-nowrap mb-4"
        style={{
          x: baseX,
        }}
      >
        {/* 重复多次确保无缝循环 */}
        {[...Array(20)].map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex">
            {coloredTexts.map((chars, textIndex) => (
              <h2
                key={`${repeatIndex}-${textIndex}`}
                className="text-[6vw] font-bold leading-none mx-6"
                style={{
                  fontFamily: '"Google Sans", "Inter", system-ui, -apple-system, sans-serif',
                }}
              >
                {chars.map((item, charIndex) => (
                  <span
                    key={charIndex}
                    style={{ color: item.color }}
                    className="inline-block"
                  >
                    {item.char}
                  </span>
                ))}
              </h2>
            ))}
          </div>
        ))}
      </motion.div>

      {/* 第二行 - 向右自动滚动 */}
      <motion.div
        className="flex whitespace-nowrap"
        style={{
          x: baseXReverse,
        }}
      >
        {/* 重复多次确保无缝循环 */}
        {[...Array(20)].map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex">
            {coloredTexts.slice().reverse().map((chars, textIndex) => (
              <h2
                key={`${repeatIndex}-${textIndex}`}
                className="text-[6vw] font-bold leading-none mx-6"
                style={{
                  fontFamily: '"Google Sans", "Inter", system-ui, -apple-system, sans-serif',
                }}
              >
                {chars.map((item, charIndex) => (
                  <span
                    key={charIndex}
                    style={{ color: item.color }}
                    className="inline-block"
                  >
                    {item.char}
                  </span>
                ))}
              </h2>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
