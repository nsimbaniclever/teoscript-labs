// src/components/MatrixRain.tsx
'use client'

import { useEffect, useRef } from 'react'

interface MatrixRainProps {
  density?: number
  speed?: number
  color?: string
  fontSize?: number
}

export default function MatrixRain({
  density = 150,
  speed = 50,
  color = '#00ff41',
  fontSize = 14
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ─── DEFINE O TAMANHO CORRETO ───
    const updateSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    const chars = '01'
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    let animationId: number

    const draw = () => {
      // Fundo semi-transparente para efeito de rasto
      ctx.fillStyle = 'rgba(10, 15, 30, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = color
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const brightness = Math.random() > 0.8 ? 1 : 0.4
        ctx.globalAlpha = brightness
        ctx.fillText(char, x, y)

        if (drops[i] * fontSize > canvas.height + 50) {
          drops[i] = -10
        }
        drops[i] += speed / 60
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateSize)
    }
  }, [density, speed, color, fontSize])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,           // ← MUDOU: 0 em vez de -10
        pointerEvents: 'none',
        opacity: 0.5,
        display: 'block',
      }}
    />
  )
}