// src/app/arquitetura/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── CORES DO TEMA (LARANJA) ───
const CORES = {
  primary: '#ea580c',
  secondary: '#f97316',
  accent: '#fbbf24',
  textPrimary: '#fdba74',
  textSecondary: '#f97316',
  bg: '#0a0f1e',
  border: 'rgba(234, 88, 12, 0.2)',
}

// ─── COMPONENTE: HARDWARE RAIN (LEVE) ───
function HardwareRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const updateSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    const particles: {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      opacity: number
      char: string
    }[] = []

    const chars = ['🖥️', '⚡', '🔧', '💾', '💻', '🔌', '⚙️']

    // Menos partículas para ser mais leve
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 16 + Math.random() * 20,
        speedY: 0.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: 0.1 + Math.random() * 0.15,
        char: chars[Math.floor(Math.random() * chars.length)],
      })
    }

    let animationId: number
    let frame = 0

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, width, height)

      // Fundo com gradiente sutil
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.5
      )
      gradient.addColorStop(0, 'rgba(234, 88, 12, 0.02)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Código binário sutil no fundo
      ctx.globalAlpha = 0.03
      ctx.font = '10px monospace'
      ctx.fillStyle = CORES.primary
      for (let i = 0; i < 20; i++) {
        const x = (i * 47 + frame * 0.2) % width
        const y = (i * 53 + frame * 0.15) % height
        const code = ['0101', '1010', '1100', '0011'][i % 4]
        ctx.fillText(code, x, y)
      }
      ctx.globalAlpha = 1

      // Partículas flutuantes
      for (const p of particles) {
        p.y -= p.speedY
        p.x += p.speedX + Math.sin(frame * 0.008 + p.x) * 0.2

        if (p.y < -50) {
          p.y = height + 50
          p.x = Math.random() * width
        }

        // Brilho sutil
        ctx.globalAlpha = p.opacity * 0.3
        ctx.font = `${p.size}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = CORES.primary
        ctx.shadowBlur = 10
        ctx.fillText(p.char, p.x, p.y)
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateSize)
    }
  }, [])

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
        opacity: 0.6,
      }}
    />
  )
}

// ─── ÍCONES FLUTUANTES ───
const FLOATING_ICONS = [
  { icon: '🖥️', size: 24, delay: 0, x: 10, y: 15 },
  { icon: '⚡', size: 20, delay: 0.5, x: 85, y: 20 },
  { icon: '🔧', size: 22, delay: 1, x: 20, y: 75 },
  { icon: '💻', size: 20, delay: 1.5, x: 75, y: 80 },
  { icon: '💾', size: 18, delay: 2, x: 50, y: 10 },
  { icon: '🔌', size: 18, delay: 2.5, x: 45, y: 90 },
  { icon: '⚙️', size: 20, delay: 3, x: 90, y: 55 },
  { icon: '🔄', size: 18, delay: 3.5, x: 5, y: 45 },
]

export default function ArquiteturaPage() {
  const part = parts.find(p => p.id === 'arquitetura')!
  const [subtemasAbertos, setSubtemasAbertos] = useState<string[]>([])
  const [subsubtemasAbertos, setSubsubtemasAbertos] = useState<string[]>([])

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

  // ─── EXTRAIR AULAS DIRETAMENTE DO DOCTORATE ───
  const getAulas = (topicId: string) => {
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

  const totalSubsubtemas = part.sections.reduce((acc, st) => acc + st.topics.length, 0)
  const totalTopicos = part.sections.reduce((acc, st) => acc + st.topics.reduce((s, t) => s + t.subs.length, 0), 0)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: CORES.bg }}>
      <HardwareRain />

      {/* Ícones flutuantes estáticos (sem animação pesada) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-1">
        {FLOATING_ICONS.map((item, i) => (
          <span
            key={i}
            className="absolute font-bold select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: item.size,
              color: CORES.primary,
              textShadow: `0 0 30px ${CORES.primary}30`,
              opacity: 0.08,
            }}
          >
            {item.icon}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* ─── TOPO: Voltar ─── */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white shadow-lg hover:shadow-[#ea580c]/40 transition-all"
            style={{ background: `linear-gradient(135deg, ${CORES.primary}, #c2410c)` }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${CORES.primary}, #c2410c)` }}
            >
              <span className="text-base font-black text-white">T</span>
            </div>
            <div>
              <span className="font-bold text-[#fdba74] text-sm tracking-tight">
                TeoScript <span className="text-[#fdba74]">Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-white/40 tracking-[0.25em] uppercase">
                Doctorate · Arquitetura
              </span>
            </div>
          </div>
        </div>

        {/* ─── CABEÇALHO ─── */}
        <div className="relative bg-[#0a0f1e]/80 backdrop-blur-sm rounded-2xl border border-[#ea580c]/20 shadow-xl shadow-[#ea580c]/5 overflow-hidden mb-8">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #ea580c, #fdba74, #c2410c, #ea580c)' }} />

          <div className="px-6 md:px-12 py-8 md:py-12 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl md:text-6xl">🖥️</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Arquitetura de Computadores e SO
              </h1>
            </div>
            <div className="w-32 h-1 mx-auto rounded-full mb-4" style={{ background: CORES.primary }} />
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              ⚡ Hardware ↔ Software — O Coração do Computador ⚡
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <span className="px-4 py-1.5 bg-[#ea580c]/10 rounded-full border border-[#ea580c]/30 text-[#fdba74]">
                📚 {part.sections.length} temas
              </span>
              <span className="px-4 py-1.5 bg-[#ea580c]/10 rounded-full border border-[#ea580c]/30 text-[#fdba74]">
                📖 {totalSubsubtemas} tópicos
              </span>
              <span className="px-4 py-1.5 bg-[#ea580c]/10 rounded-full border border-[#ea580c]/30 text-[#fdba74]">
                🎯 {totalTopicos} aulas
              </span>
            </div>
          </div>
        </div>

        {/* ─── SUBTEMAS ─── */}
        <div className="space-y-4">
          {part.sections.map((subtema) => {
            const isOpen = subtemasAbertos.includes(subtema.id)

            return (
              <div
                key={subtema.id}
                className="bg-[#0a0f1e]/90 rounded-xl border border-[#ea580c]/10 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#ea580c]/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggleSubtema(subtema.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#ea580c]/5 transition-colors"
                  style={{
                    borderLeft: isOpen ? `4px solid ${CORES.primary}` : '4px solid transparent',
                    background: isOpen ? 'rgba(234,88,12,0.05)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl">🔧</span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white/90">
                        {subtema.title}
                      </h3>
                      <span className="text-sm text-white/30">
                        {subtema.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-white/30 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-white/30"
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
                      <div className="p-4 md:p-6 border-t border-[#ea580c]/10 space-y-3 bg-[#0a0f1e]/50">
                        {subtema.topics.map((topic) => {
                          const isSubOpen = subsubtemasAbertos.includes(topic.id)
                          const aulas = getAulas(topic.id)

                          return (
                            <div
                              key={topic.id}
                              className="border border-[#ea580c]/10 rounded-lg overflow-hidden hover:border-[#ea580c]/40 transition-all bg-[#0a0f1e]/90"
                            >
                              <button
                                onClick={() => toggleSubsubtema(topic.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#ea580c]/5 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">⚡</span>
                                  <span className="font-medium text-white/70">
                                    {topic.title}
                                  </span>
                                  <span className="text-xs text-white/30">
                                    {aulas.length} aulas
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-white/30"
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
                                    <div className="p-4 border-t border-[#ea580c]/10 overflow-x-auto bg-[#0a0f1e]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: 'rgba(234,88,12,0.12)' }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#fdba74] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#fdba74] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#fdba74] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#fdba74] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulas.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#ea580c]/5 hover:bg-[#ea580c]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#ea580c]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-4 py-2 font-medium text-white/70 align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <Link
                                                    href={`/aula/${aula.slug}`}
                                                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-[#0a0f1e] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                    style={{ background: CORES.primary }}
                                                  >
                                                    Ir <ExternalLink size={10} />
                                                  </Link>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-white/40 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-white/40 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-white/40 align-top text-xs">
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
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/20">
            💡 Clique em um tópico para ver as aulas
          </p>
          <div className="mt-2 text-[10px] text-white/10 flex justify-center gap-4">
            <span>🖥️ Hardware</span>
            <span>⚡ ↔</span>
            <span>💻 Software</span>
          </div>
        </div>
      </div>
    </div>
  )
}