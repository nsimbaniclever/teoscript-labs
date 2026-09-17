// src/app/redes/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── PALETA DE CORES REDES ───
const CORES = {
  principal: '#0d9488',
  secundaria: '#14b8a6',
  fundo: '#0a1a1a',
  fundoClaro: '#f0faff',
  texto: '#5eead4',
  borda: 'rgba(13, 148, 136, 0.2)',
  textoEscuro: '#134e4a',
}

// ─── ESTILO PAPEL ───
const PAPEL: React.CSSProperties = {
  backgroundColor: CORES.fundo,
  minHeight: '100vh',
  position: 'relative',
}

// ─── COMPONENTE DE FUNDO "REDE MUNDIAL" ───
function GlobalNetwork({ color = CORES.principal }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const continents = [
      { cx: width * 0.15, cy: height * 0.2, label: '🇺🇸', radius: 12 },
      { cx: width * 0.85, cy: height * 0.15, label: '🇯🇵', radius: 10 },
      { cx: width * 0.75, cy: height * 0.4, label: '🇨🇳', radius: 14 },
      { cx: width * 0.5, cy: height * 0.3, label: '🇪🇺', radius: 11 },
      { cx: width * 0.3, cy: height * 0.6, label: '🇧🇷', radius: 10 },
      { cx: width * 0.1, cy: height * 0.7, label: '🇿🇦', radius: 8 },
      { cx: width * 0.6, cy: height * 0.7, label: '🇦🇺', radius: 9 },
      { cx: width * 0.45, cy: height * 0.5, label: '🇮🇳', radius: 11 },
      { cx: width * 0.2, cy: height * 0.4, label: '🇲🇽', radius: 8 },
      { cx: width * 0.9, cy: height * 0.65, label: '🇰🇷', radius: 7 },
    ]

    interface Cable {
      start: number
      end: number
      phase: number
      speed: number
      active: boolean
    }

    const cables: Cable[] = []
    for (let i = 0; i < continents.length; i++) {
      for (let j = i + 1; j < continents.length; j++) {
        if (Math.random() > 0.5) {
          cables.push({
            start: i,
            end: j,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.5,
            active: Math.random() > 0.3,
          })
        }
      }
    }

    const dataParticles: { 
      x: number; y: number; 
      vx: number; vy: number; 
      life: number; 
      maxLife: number; 
      size: number;
      trail: { x: number; y: number }[];
    }[] = []

    let animationId: number
    let time = 0

    const draw = () => {
      time++
      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      )
      gradient.addColorStop(0, 'rgba(13,148,136,0.02)')
      gradient.addColorStop(0.5, 'rgba(13,148,136,0.01)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 50; i++) {
        const x = (i * 137.5) % width
        const y = (i * 97.3) % height
        const size = 0.5 + 0.5 * Math.sin(time * 0.01 + i)
        ctx.globalAlpha = 0.2 + 0.2 * Math.sin(time * 0.01 + i)
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
      }

      for (const cable of cables) {
        const start = continents[cable.start]
        const end = continents[cable.end]
        
        const midX = (start.cx + end.cx) / 2
        const midY = (start.cy + end.cy) / 2
        const dx = end.cx - start.cx
        const dy = end.cy - start.cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        const curveAmount = 0.3 + 0.2 * Math.sin(cable.phase + time * 0.005)
        const perpX = -dy / dist
        const perpY = dx / dist
        const curveX = midX + perpX * dist * curveAmount
        const curveY = midY + perpY * dist * curveAmount

        const opacity = 0.06 + 0.04 * Math.sin(time * 0.008 + cable.phase)
        ctx.globalAlpha = opacity
        
        ctx.beginPath()
        ctx.moveTo(start.cx, start.cy)
        ctx.quadraticCurveTo(curveX, curveY, end.cx, end.cy)
        ctx.strokeStyle = color
        ctx.lineWidth = 0.5 + 0.5 * Math.sin(time * 0.01 + cable.phase)
        ctx.stroke()

        if (cable.active) {
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.02 + cable.phase)
          ctx.globalAlpha = 0.02 + 0.02 * pulse
          ctx.shadowColor = color
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.moveTo(start.cx, start.cy)
          ctx.quadraticCurveTo(curveX, curveY, end.cx, end.cy)
          ctx.strokeStyle = color
          ctx.lineWidth = 1 + pulse * 0.5
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        if (cable.active && Math.random() > 0.997) {
          const t = Math.random()
          const px = (1-t) * (1-t) * start.cx + 2 * (1-t) * t * curveX + t * t * end.cx
          const py = (1-t) * (1-t) * start.cy + 2 * (1-t) * t * curveY + t * t * end.cy
          
          ctx.globalAlpha = 0.8
          ctx.shadowColor = color
          ctx.shadowBlur = 20
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
          ctx.shadowBlur = 0
        }

        if (cable.active && Math.random() > 0.998) {
          const t = Math.random()
          const px = (1-t) * (1-t) * start.cx + 2 * (1-t) * t * curveX + t * t * end.cx
          const py = (1-t) * (1-t) * start.cy + 2 * (1-t) * t * curveY + t * t * end.cy
          
          const newParticle = {
            x: px,
            y: py,
            vx: (end.cx - start.cx) * 0.02,
            vy: (end.cy - start.cy) * 0.02,
            life: 30 + Math.random() * 40,
            maxLife: 70,
            size: 1.5 + Math.random() * 2,
            trail: [],
          }
          
          const direction = Math.random() > 0.5 ? 1 : -1
          newParticle.vx *= direction
          newParticle.vy *= direction
          
          dataParticles.push(newParticle)
        }
      }

      for (let i = dataParticles.length - 1; i >= 0; i--) {
        const p = dataParticles[i]
        p.x += p.vx
        p.y += p.vy
        p.life--
        
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 8) p.trail.shift()
        
        for (let j = 0; j < p.trail.length; j++) {
          const alpha = (j / p.trail.length) * 0.5 * (p.life / p.maxLife)
          ctx.globalAlpha = alpha
          ctx.shadowColor = color
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(p.trail[j].x, p.trail[j].y, p.size * (j / p.trail.length) * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        }
        
        ctx.globalAlpha = 0.8 * (p.life / p.maxLife)
        ctx.shadowColor = color
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.shadowBlur = 0

        if (p.life <= 0) {
          dataParticles.splice(i, 1)
        }
      }

      for (const cont of continents) {
        const glow = ctx.createRadialGradient(cont.cx, cont.cy, 0, cont.cx, cont.cy, cont.radius * 4)
        glow.addColorStop(0, color)
        glow.addColorStop(0.3, color)
        glow.addColorStop(1, 'transparent')
        ctx.globalAlpha = 0.08 + 0.04 * Math.sin(time * 0.01 + cont.cx)
        ctx.beginPath()
        ctx.arc(cont.cx, cont.cy, cont.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.globalAlpha = 0.3 + 0.15 * Math.sin(time * 0.015 + cont.cy)
        ctx.shadowColor = color
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(cont.cx, cont.cy, cont.radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.globalAlpha = 0.9
        ctx.beginPath()
        ctx.arc(cont.cx, cont.cy, cont.radius * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()

        ctx.globalAlpha = 0.6 + 0.2 * Math.sin(time * 0.01 + cont.cx)
        ctx.font = `${cont.radius * 1.8}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(cont.label, cont.cx, cont.cy + cont.radius * 0.1)
      }

      for (let ring = 0; ring < 4; ring++) {
        const cx = width * 0.5
        const cy = height * 0.5
        const radius = 100 + ring * 80 + 30 * Math.sin(time * 0.005 + ring * 0.5)
        ctx.globalAlpha = 0.02 + 0.01 * Math.sin(time * 0.008 + ring)
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = color
        ctx.lineWidth = 0.5
        ctx.setLineDash([4, 8])
        ctx.stroke()
        ctx.setLineDash([])
      }

      ctx.globalAlpha = 0.015 + 0.01 * Math.sin(time * 0.005)
      ctx.font = 'bold 50px monospace'
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const yPos = height * 0.15 + Math.sin(time * 0.004) * 30
      ctx.fillText('🌐 INTERNET', width * 0.5, yPos)
      ctx.fillText('🌍 GLOBAL NETWORK', width * 0.5, yPos + 70 + Math.sin(time * 0.006 + 1) * 25)

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}

// ─── SÍMBOLOS FLUTUANTES ───
const SYMBOLS = [
  '🌐', '📡', '🌍', '🔗', '⚡', '🌎', '📶', '🌏',
  '🌐', '📡', '🌍', '🔗', '⚡', '🌎', '📶', '🌏',
  '🌐', '📡', '🌍', '🔗', '⚡', '🌎', '📶', '🌏',
  '🌐', '📡', '🌍', '🔗', '⚡', '🌎', '📶', '🌏',
]

// ─── EXTRAIR AULAS DO DOCTORATE ───
const getAulasFromDoctorate = (topicId: string) => {
  for (const p of parts) {
    for (const section of p.sections) {
      for (const topic of section.topics) {
        if (topic.id === topicId) {
          return topic.aulas
        }
      }
    }
  }
  return []
}

export default function RedesPage() {
  const part = parts.find(p => p.id === 'rede')!

  const [subtemasAbertos, setSubtemasAbertos] = useState<string[]>([])
  const [subsubtemasAbertos, setSubsubtemasAbertos] = useState<string[]>([])
  const [symbolsPositions, setSymbolsPositions] = useState<{ x: number; y: number; symbol: string; size: number; delay: number; speed: number; direction: string }[]>([])

  useEffect(() => {
    const directions = ['up', 'down', 'left', 'right', 'diagonal']
    const positions = SYMBOLS.map(() => ({
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 22 + Math.random() * 40,
      delay: Math.random() * 10,
      speed: 4 + Math.random() * 10,
      direction: directions[Math.floor(Math.random() * directions.length)],
    }))
    setSymbolsPositions(positions)
  }, [])

  const toggleSubtema = (id: string) => {
    setSubtemasAbertos(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const toggleSubsubtema = (id: string) => {
    setSubsubtemasAbertos(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const totalSubsubtemas = part.sections.reduce((acc, st) => acc + st.topics.length, 0)
  const totalTopicos = part.sections.reduce((acc, st) => acc + st.topics.reduce((s, t) => s + t.aulas.length, 0), 0)

  const cor = CORES.principal

  return (
    <div className="min-h-screen relative overflow-hidden" style={PAPEL}>
      <GlobalNetwork color={cor} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {symbolsPositions.map((item, index) => {
          let xMovement: number[] = []
          let yMovement: number[] = []
          
          switch(item.direction) {
            case 'up':
              xMovement = [0, (Math.random() - 0.5) * 80, 0]
              yMovement = [-200, -300, -400]
              break
            case 'down':
              xMovement = [0, (Math.random() - 0.5) * 80, 0]
              yMovement = [200, 300, 400]
              break
            case 'left':
              xMovement = [-200, -300, -400]
              yMovement = [0, (Math.random() - 0.5) * 80, 0]
              break
            case 'right':
              xMovement = [200, 300, 400]
              yMovement = [0, (Math.random() - 0.5) * 80, 0]
              break
            case 'diagonal':
              xMovement = [150, 250, 350]
              yMovement = [-150, -250, -350]
              break
            default:
              xMovement = [0, 80, 0]
              yMovement = [0, 80, 0]
          }

          return (
            <motion.span
              key={index}
              className="absolute font-bold select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: item.size,
                color: cor,
                opacity: 0.04 + Math.random() * 0.03,
                textShadow: `0 0 50px ${cor}15`,
                filter: 'blur(0.3px)',
              }}
              animate={{
                x: xMovement,
                y: yMovement,
                rotate: [0, 360, -180, 540, 0],
                scale: [0.4, 1.6, 0.6, 1.4, 0.4],
              }}
              transition={{
                x: {
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay,
                },
                y: {
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay + 0.5,
                },
                rotate: {
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: item.delay,
                },
                scale: {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay,
                },
              }}
            >
              {item.symbol}
            </motion.span>
          )
        })}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-[#0d9488]/30"
            style={{ background: `linear-gradient(135deg, ${CORES.principal}, ${CORES.secundaria})` }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          <div className="hidden md:flex items-center gap-2 pb-1 border-b-2 transition-all duration-300 hover:border-[#0d9488]/50 group" style={{ borderBottomColor: 'rgba(13,148,136,0.15)' }}>
            <motion.div 
              className="relative w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(13,148,136,0.6)]"
              style={{
                background: `linear-gradient(135deg, ${CORES.principal}, ${CORES.secundaria})`,
              }}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-base font-black text-white tracking-tight">T</span>
              <motion.div 
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: ['inset 0 0 0px rgba(13,148,136,0)', 'inset 0 0 20px rgba(13,148,136,0.3)', 'inset 0 0 0px rgba(13,148,136,0)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <span className="font-bold text-[#5eead4] text-sm tracking-tight flex items-center gap-1">
                TeoScript <span style={{ color: '#ffffff' }}>Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-[#5eead4]/60 tracking-[0.25em] uppercase leading-none">
                Doctorate · Redes
              </span>
            </div>
          </div>
        </div>

        <motion.div 
          className="relative bg-[#0a1a1a]/90 backdrop-blur-sm rounded-2xl border border-[#0d9488]/20 shadow-lg shadow-[#0d9488]/5 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${CORES.principal}, ${CORES.secundaria}, ${CORES.principal})` }} />
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0d9488]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0d9488]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="px-6 md:px-12 py-8 md:py-12 text-center relative">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span 
                className="text-5xl md:text-6xl"
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌐
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: CORES.principal }}>
                Redes de Computadores
              </h1>
            </motion.div>
            <motion.div 
              className="w-24 h-1 mx-auto rounded-full mb-4"
              style={{ background: CORES.principal }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <p className="text-lg md:text-xl text-[#5eead4]/60 max-w-2xl mx-auto">
              🌍 Comunicação global, protocolos, roteamento e arquiteturas distribuídas
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <motion.span 
                className="px-4 py-1.5 bg-[#0d9488]/10 rounded-full border border-[#0d9488]/30 text-[#5eead4]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(13,148,136,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {part.sections.length} temas
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 bg-[#0d9488]/10 rounded-full border border-[#0d9488]/30 text-[#5eead4]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(13,148,136,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {totalSubsubtemas} tópicos
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 bg-[#0d9488]/10 rounded-full border border-[#0d9488]/30 text-[#5eead4]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(13,148,136,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {totalTopicos} aulas
              </motion.span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {part.sections.map((subtema, temaIndex) => {
            const isOpen = subtemasAbertos.includes(subtema.id)

            return (
              <motion.div 
                key={subtema.id} 
                className="bg-[#0a1a1a]/90 rounded-xl border border-[#0d9488]/10 overflow-hidden shadow-sm hover:shadow-md hover:border-[#0d9488]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: temaIndex * 0.05 }}
              >
                <button
                  onClick={() => toggleSubtema(subtema.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#0d9488]/5 transition-colors group"
                  style={{ borderLeft: isOpen ? `4px solid ${CORES.principal}` : '4px solid transparent' }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <motion.span 
                      className="text-2xl"
                      animate={{ 
                        scale: isOpen ? [1, 1.3, 1] : 1,
                        rotate: isOpen ? [0, 20, -20, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      🌍
                    </motion.span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold" style={{ color: CORES.principal }}>
                        {subtema.title}
                      </h3>
                      <span className="text-sm text-[#5eead4]/40">
                        {subtema.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-[#5eead4]/40 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#5eead4]/40 group-hover:text-[#5eead4] transition-colors"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-6 border-t border-[#0d9488]/10 space-y-3 bg-[#0a1a1a]/90">
                        {subtema.topics.map((sub) => {
                          const isSubOpen = subsubtemasAbertos.includes(sub.id)
                          const aulasData = getAulasFromDoctorate(sub.id)

                          return (
                            <div key={sub.id} className="border border-[#0d9488]/10 rounded-lg overflow-hidden hover:border-[#0d9488]/30 transition-all bg-[#0a1a1a]/90">
                              <button
                                onClick={() => toggleSubsubtema(sub.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#0d9488]/5 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <motion.span 
                                    className="text-xl"
                                    animate={{ 
                                      rotate: isSubOpen ? 180 : 0,
                                      scale: isSubOpen ? 1.2 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    📡
                                  </motion.span>
                                  <span className="font-medium text-[#5eead4] group-hover:text-[#0d9488] transition-colors">
                                    {sub.title}
                                  </span>
                                  <span className="text-xs text-[#5eead4]/40">
                                    {aulasData.length} aulas
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[#5eead4]/40 group-hover:text-[#5eead4] transition-colors"
                                >
                                  <ChevronDown size={18} />
                                </motion.div>
                              </button>

                              <AnimatePresence>
                                {isSubOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-4 border-t border-[#0d9488]/10 overflow-x-auto bg-[#0a1a1a]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: `${CORES.principal}15` }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#5eead4] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#5eead4] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#5eead4] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#5eead4] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulasData.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#0d9488]/5 hover:bg-[#0d9488]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#0d9488]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-4 py-2 font-medium text-[#5eead4] align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                  >
                                                    <Link
                                                      href={`/aula/${aula.slug}`}
                                                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                      style={{ background: CORES.principal }}
                                                    >
                                                      Ir <ExternalLink size={10} />
                                                    </Link>
                                                  </motion.div>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-[#5eead4]/60 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-[#5eead4]/60 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-[#5eead4]/60 align-top text-xs">
                                                {aula.projeto}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}