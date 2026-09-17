// src/components/ProgrammingBackground.tsx
'use client'

import { useEffect, useRef } from 'react'

interface ProgrammingBackgroundProps {
  color?: string
}

export default function ProgrammingBackground({ color = '#64748b' }: ProgrammingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // ─── SISTEMA BINÁRIO ───
    type BinaryColumn = {
      x: number
      y: number
      value: string
      speed: number
      length: number
    }
    const binaryColumns: BinaryColumn[] = []
    for (let i = 0; i < 80; i++) {
      let val = ''
      for (let j = 0; j < 8 + Math.floor(Math.random() * 8); j++) {
        val += Math.random() > 0.5 ? '1' : '0'
      }
      binaryColumns.push({
        x: Math.random() * width,
        y: Math.random() * height,
        value: val,
        speed: 0.8 + Math.random() * 1.5,
        length: 8 + Math.floor(Math.random() * 8),
      })
    }

    // ─── FLUXOGRAMAS (2 LADOS) ───
    type FlowNode = {
      x: number
      y: number
      w: number
      h: number
      label: string
      type: 'start' | 'process' | 'decision' | 'end'
      phase: number
      lado: 'esquerda' | 'direita'
    }
    
    const flowNodesEsquerda: FlowNode[] = [
      { x: 0, y: 0, w: 60, h: 30, label: 'INÍCIO', type: 'start', phase: 0, lado: 'esquerda' },
      { x: 0, y: 0, w: 70, h: 35, label: 'var = 0', type: 'process', phase: 0.8, lado: 'esquerda' },
      { x: 0, y: 0, w: 70, h: 35, label: 'var < 10?', type: 'decision', phase: 1.6, lado: 'esquerda' },
      { x: 0, y: 0, w: 70, h: 35, label: 'var++', type: 'process', phase: 2.4, lado: 'esquerda' },
      { x: 0, y: 0, w: 60, h: 30, label: 'FIM', type: 'end', phase: 3.2, lado: 'esquerda' },
    ]

    const flowNodesDireita: FlowNode[] = [
      { x: 0, y: 0, w: 60, h: 30, label: 'INÍCIO', type: 'start', phase: 0.5, lado: 'direita' },
      { x: 0, y: 0, w: 70, h: 35, label: 'x = 5', type: 'process', phase: 1.3, lado: 'direita' },
      { x: 0, y: 0, w: 70, h: 35, label: 'x > 0?', type: 'decision', phase: 2.1, lado: 'direita' },
      { x: 0, y: 0, w: 70, h: 35, label: 'x--', type: 'process', phase: 2.9, lado: 'direita' },
      { x: 0, y: 0, w: 60, h: 30, label: 'FIM', type: 'end', phase: 3.7, lado: 'direita' },
    ]

    const spacing = 70
    for (let i = 0; i < flowNodesEsquerda.length; i++) {
      flowNodesEsquerda[i].x = -100 - Math.random() * 200
      flowNodesEsquerda[i].y = 80 + i * spacing + Math.random() * 40
    }
    for (let i = 0; i < flowNodesDireita.length; i++) {
      flowNodesDireita[i].x = width + 100 + Math.random() * 200
      flowNodesDireita[i].y = 80 + i * spacing + Math.random() * 40
    }

    // ─── BITS FLUTUANTES ───
    type Bit = { x: number; y: number; value: number; size: number; speed: number }
    const bits: Bit[] = []
    for (let i = 0; i < 80; i++) {
      bits.push({
        x: Math.random() * width,
        y: Math.random() * height,
        value: Math.random() > 0.5 ? 1 : 0,
        size: 8 + Math.random() * 14,
        speed: 0.8 + Math.random() * 1.2,
      })
    }

    // ─── HEXADECIMAL ───
    type Hex = { x: number; y: number; value: string; speed: number }
    const hexValues: Hex[] = []
    const hexChars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    for (let i = 0; i < 40; i++) {
      let val = ''
      for (let j = 0; j < 4; j++) {
        val += hexChars[Math.floor(Math.random() * 16)]
      }
      hexValues.push({
        x: Math.random() * width,
        y: Math.random() * height,
        value: val,
        speed: 0.6 + Math.random() * 1.0,
      })
    }

    let animationId: number

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height)

      // ─── FUNDO ───
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      )
      grad.addColorStop(0, 'rgba(10, 15, 30, 0.95)')
      grad.addColorStop(1, 'rgba(5, 8, 18, 1)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // ─── LINHAS DE CÓDIGO ───
      for (let y = 0; y < height; y += 25) {
        ctx.strokeStyle = `rgba(100, 116, 139, 0.04)`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // ─── BITS ───
      for (const bit of bits) {
        bit.y -= bit.speed * 0.8
        bit.x += Math.sin(timestamp / 2000 + bit.value) * 0.3
        
        if (bit.y < -50) {
          bit.y = height + 50
          bit.x = Math.random() * width
          bit.value = Math.random() > 0.5 ? 1 : 0
        }

        const alpha = 0.25 + 0.15 * Math.sin(timestamp / 800 + bit.x)
        ctx.font = `${bit.size}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = `rgba(100, 116, 139, ${alpha * 0.3})`
        ctx.shadowBlur = 10
        ctx.fillStyle = `rgba(100, 116, 139, ${alpha})`
        ctx.fillText(bit.value.toString(), bit.x, bit.y)
        ctx.shadowBlur = 0
      }

      // ─── HEXADECIMAL ───
      for (const hex of hexValues) {
        hex.y -= hex.speed * 0.8
        hex.x += Math.cos(timestamp / 2500 + hex.value.length) * 0.2
        
        if (hex.y < -50) {
          hex.y = height + 50
          hex.x = Math.random() * width
        }

        ctx.font = '11px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(100, 116, 139, 0.15)'
        ctx.shadowBlur = 8
        ctx.fillStyle = `rgba(100, 116, 139, 0.25)`
        ctx.fillText(`0x${hex.value}`, hex.x, hex.y)
        ctx.shadowBlur = 0
      }

      // ─── MOVIMENTO DOS FLUXOGRAMAS ───
      for (const node of flowNodesEsquerda) {
        node.x += 0.5 + Math.sin(timestamp / 1500 + node.phase) * 0.2
        if (node.x > width + 100) {
          node.x = -150 - Math.random() * 100
          node.y = 80 + Math.random() * (height - 200)
        }
      }
      for (const node of flowNodesDireita) {
        node.x -= 0.5 + Math.sin(timestamp / 1500 + node.phase) * 0.2
        if (node.x + node.w < -100) {
          node.x = width + 100 + Math.random() * 100
          node.y = 80 + Math.random() * (height - 200)
        }
      }

      // ─── DESENHA FLUXOGRAMAS ───
      const todosFluxos = [...flowNodesEsquerda, ...flowNodesDireita]
      for (const node of todosFluxos) {
        const pulse = 0.9 + 0.1 * Math.sin(timestamp / 500 + node.phase)

        ctx.save()
        ctx.translate(node.x + node.w / 2, node.y + node.h / 2)
        ctx.scale(pulse, pulse)
        ctx.translate(-node.w / 2, -node.h / 2)

        let alpha = 0.30
        if (node.type === 'start') alpha = 0.45
        else if (node.type === 'end') alpha = 0.45
        else if (node.type === 'decision') alpha = 0.35

        ctx.shadowColor = `rgba(100, 116, 139, ${alpha * 0.2})`
        ctx.shadowBlur = 15
        ctx.fillStyle = `rgba(100, 116, 139, ${alpha})`
        ctx.strokeStyle = `rgba(100, 116, 139, ${0.3 * pulse})`
        ctx.lineWidth = 1.5

        if (node.type === 'start' || node.type === 'end') {
          ctx.beginPath()
          ctx.ellipse(node.w / 2, node.h / 2, node.w / 2, node.h / 2, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        } else if (node.type === 'decision') {
          ctx.beginPath()
          ctx.moveTo(node.w / 2, 0)
          ctx.lineTo(node.w, node.h / 2)
          ctx.lineTo(node.w / 2, node.h)
          ctx.lineTo(0, node.h / 2)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        } else {
          ctx.fillRect(0, 0, node.w, node.h)
          ctx.strokeRect(0, 0, node.w, node.h)
        }

        ctx.shadowBlur = 0
        ctx.restore()

        ctx.font = '8px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = `rgba(100, 116, 139, ${0.8 * pulse})`
        ctx.fillText(node.label, node.x + node.w / 2, node.y + node.h / 2)
      }

      // ─── SETAS ───
      for (const nodes of [flowNodesEsquerda, flowNodesDireita]) {
        for (let i = 0; i < nodes.length - 1; i++) {
          const from = nodes[i]
          const to = nodes[i + 1]
          const fx = from.x + from.w / 2
          const fy = from.y + from.h
          const tx = to.x + to.w / 2
          const ty = to.y

          const pulse = 0.5 + 0.5 * Math.sin(timestamp / 400 + i)
          ctx.beginPath()
          ctx.moveTo(fx, fy)
          ctx.lineTo(tx, ty)
          ctx.shadowColor = 'rgba(100, 116, 139, 0.1)'
          ctx.shadowBlur = 8
          ctx.strokeStyle = `rgba(100, 116, 139, ${0.25 * pulse})`
          ctx.lineWidth = 1 + pulse
          ctx.stroke()
          ctx.shadowBlur = 0

          ctx.beginPath()
          ctx.moveTo(tx, ty)
          ctx.lineTo(tx - 5, ty + 7)
          ctx.lineTo(tx + 5, ty + 7)
          ctx.closePath()
          ctx.fillStyle = `rgba(100, 116, 139, ${0.25 * pulse})`
          ctx.fill()
        }
      }

      // ─── BINÁRIO ───
      for (const col of binaryColumns) {
        col.y -= col.speed * 0.6
        col.x += Math.sin(timestamp / 3000 + col.length) * 0.2
        
        if (col.y < -50) {
          col.y = height + 50
          col.x = Math.random() * width
          let val = ''
          for (let j = 0; j < col.length; j++) {
            val += Math.random() > 0.5 ? '1' : '0'
          }
          col.value = val
        }

        ctx.font = '7px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.shadowColor = 'rgba(100, 116, 139, 0.05)'
        ctx.shadowBlur = 5
        ctx.fillStyle = `rgba(100, 116, 139, 0.20)`
        ctx.fillText(col.value, col.x, col.y)
        ctx.shadowBlur = 0
      }

      // ─── INFO ───
      ctx.font = '10px monospace'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'bottom'
      ctx.shadowColor = 'rgba(100, 116, 139, 0.05)'
      ctx.shadowBlur = 5
      ctx.fillStyle = `rgba(100, 116, 139, 0.25)`
      ctx.fillText(`💾 Binary: ${binaryColumns.length} | Bits: ${bits.length} | Hex: ${hexValues.length}`, 20, height - 10)
      ctx.shadowBlur = 0

      animationId = requestAnimationFrame(draw)
    }

    draw(0)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        opacity: 0.9,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -10,
      }}
    />
  )
}