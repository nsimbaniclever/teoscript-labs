// src/app/machine-learning/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── ESTILO ML ───
const PAPEL: React.CSSProperties = {
  backgroundColor: '#0a0515',
  minHeight: '100vh',
  position: 'relative',
}

// ─── COMPONENTE NEURAL BACKGROUND ───
function NeuralBackground({ color = '#a78bfa' }: { color?: string }) {
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

    // ─── NÓS ───
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; phase: number }[] = []
    const numNodes = 120

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 1.5 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number
    let time = 0

    const draw = () => {
      time++
      ctx.clearRect(0, 0, width, height)

      // ─── MOVIMENTO ───
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        node.phase += 0.05

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }

      // ─── CONEXÕES ───
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 250) {
            const opacity = 0.25 * (1 - dist / 250)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = color
            ctx.globalAlpha = opacity
            ctx.lineWidth = 0.5 + 0.8 * (1 - dist / 250)
            ctx.stroke()
          }
        }
      }

      // ─── NÓS ───
      for (const node of nodes) {
        const pulse = 1 + 0.5 * Math.sin(node.phase)
        const r = node.radius * pulse

        // ─── GLOW ───
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, r * 5
        )
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.3, color)
        gradient.addColorStop(1, 'transparent')
        ctx.globalAlpha = 0.2
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // ─── NÓ ───
        ctx.globalAlpha = 0.8
        ctx.shadowColor = color
        ctx.shadowBlur = 25
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        // ─── NÚCLEO ───
        ctx.shadowBlur = 0
        ctx.globalAlpha = 0.9
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
      }

      // ─── PARTÍCULAS ESPORÁDICAS ───
      if (time % 3 === 0 && Math.random() > 0.6) {
        const cx = Math.random() * width
        const cy = Math.random() * height
        const numP = 20 + Math.random() * 35

        for (let i = 0; i < numP; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 2 + Math.random() * 6
          const life = 20 + Math.random() * 30

          const px = cx + Math.cos(angle) * speed * 3
          const py = cy + Math.sin(angle) * speed * 3

          ctx.globalAlpha = 0.7 * (life / 50)
          ctx.shadowBlur = 8
          ctx.shadowColor = color
          ctx.beginPath()
          ctx.arc(px, py, 1.5 + Math.random() * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        }
      }

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

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
const SYMBOLS = ['🧠', '●', '◆', '▲', '★', '■', '⬡', '✦', '●', '◆', '▲', '★', '■', '⬡', '✦', '🧠', '●', '◆', '▲', '★', '■', '⬡', '✦']

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

export default function MLPage() {
  const part = parts.find(p => p.id === 'ml')!

  const [subtemasAbertos, setSubtemasAbertos] = useState<string[]>([])
  const [subsubtemasAbertos, setSubsubtemasAbertos] = useState<string[]>([])
  const [symbolsPositions, setSymbolsPositions] = useState<{ x: number; symbol: string; size: number; delay: number }[]>([])

  useEffect(() => {
    const positions = SYMBOLS.map((symbol) => ({
      symbol,
      x: 2 + Math.random() * 96,
      size: 20 + Math.random() * 45,
      delay: Math.random() * 8,
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
  const totalTopicos = part.sections.reduce((acc, st) => acc + st.topics.reduce((s, t) => s + t.subs.length, 0), 0)

  const cor = '#a78bfa'

  return (
    <div className="min-h-screen relative overflow-hidden" style={PAPEL}>
      {/* ─── FUNDO NEURAL ─── */}
      <NeuralBackground color="#a78bfa" />

      {/* ─── SÍMBOLOS FLUTUANTES ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {symbolsPositions.map((item, index) => (
          <motion.span
            key={index}
            className="absolute font-bold select-none"
            style={{
              left: `${item.x}%`,
              fontSize: item.size,
              color: '#a78bfa',
              opacity: 0.05,
              textShadow: '0 0 40px rgba(167,139,250,0.15)',
            }}
            animate={{
              y: ['110vh', '-10vh'],
              x: [
                0,
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 120,
                0
              ],
              rotate: [0, 360, 720, 0],
              scale: [0.5, 1.4, 0.7, 1.2, 0.5],
            }}
            transition={{
              y: {
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                ease: 'linear',
                delay: item.delay,
              },
              x: {
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.delay,
              },
              rotate: {
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: 'linear',
                delay: item.delay,
              },
              scale: {
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.delay,
              },
            }}
          >
            {item.symbol}
          </motion.span>
        ))}
      </div>

      {/* ─── CONTEÚDO ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* ─── TOPO: Voltar ─── */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-[#a78bfa]/30"
            style={{ background: `linear-gradient(135deg, ${cor}, ${cor}dd)` }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          {/* ─── LOGO ─── */}
          <div className="hidden md:flex items-center gap-2 pb-1 border-b-2 transition-all duration-300 hover:border-[#a78bfa]/50 group" style={{ borderBottomColor: 'rgba(167,139,250,0.15)' }}>
            <motion.div 
              className="relative w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(167,139,250,0.6)]"
              style={{
                background: `linear-gradient(135deg, ${cor}, ${cor}cc)`,
              }}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-base font-black text-white tracking-tight">T</span>
              <motion.div 
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: ['inset 0 0 0px rgba(167,139,250,0)', 'inset 0 0 20px rgba(167,139,250,0.3)', 'inset 0 0 0px rgba(167,139,250,0)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <span className="font-bold text-[#a78bfa] text-sm tracking-tight flex items-center gap-1">
                TeoScript <span style={{ color: '#fbbf24' }}>Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-[#a78bfa]/60 tracking-[0.25em] uppercase leading-none">
                Doctorate · Aula
              </span>
            </div>
          </div>
        </div>

        {/* ─── CABEÇALHO ─── */}
        <motion.div 
          className="relative bg-[#0a0515]/90 backdrop-blur-sm rounded-2xl border border-[#a78bfa]/20 shadow-lg shadow-[#a78bfa]/5 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #a78bfa, #c4b5fd, #8b5cf6, #a78bfa)' }} />
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#a78bfa]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
                🤖
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: cor }}>
                Machine Learning
              </h1>
            </motion.div>
            <motion.div 
              className="w-24 h-1 mx-auto rounded-full mb-4"
              style={{ background: cor }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <p className="text-lg md:text-xl text-[#a78bfa]/60 max-w-2xl mx-auto">
              Algoritmos, modelos, deep learning, federado e pesquisa
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <motion.span 
                className="px-4 py-1.5 bg-[#a78bfa]/10 rounded-full border border-[#a78bfa]/30 text-[#a78bfa]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(167,139,250,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {part.sections.length} temas
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 bg-[#a78bfa]/10 rounded-full border border-[#a78bfa]/30 text-[#a78bfa]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(167,139,250,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {totalSubsubtemas} tópicos
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 bg-[#a78bfa]/10 rounded-full border border-[#a78bfa]/30 text-[#a78bfa]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(167,139,250,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {totalTopicos} aulas
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* ─── SUBTEMAS ─── */}
        <div className="space-y-4">
          {part.sections.map((subtema, temaIndex) => {
            const isOpen = subtemasAbertos.includes(subtema.id)

            return (
              <motion.div 
                key={subtema.id} 
                className="bg-[#0a0515]/90 rounded-xl border border-[#a78bfa]/10 overflow-hidden shadow-sm hover:shadow-md hover:border-[#a78bfa]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: temaIndex * 0.05 }}
              >
                <button
                  onClick={() => toggleSubtema(subtema.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#a78bfa]/5 transition-colors group"
                  style={{ borderLeft: isOpen ? `4px solid ${cor}` : '4px solid transparent' }}
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
                      🧠
                    </motion.span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold" style={{ color: cor }}>
                        {temaIndex + 1}. {subtema.title.split('.').slice(1).join('.').trim()}
                      </h3>
                      <span className="text-sm text-[#a78bfa]/40">
                        {subtema.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-[#a78bfa]/40 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#a78bfa]/40 group-hover:text-[#a78bfa] transition-colors"
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
                      <div className="p-4 md:p-6 border-t border-[#a78bfa]/10 space-y-3 bg-[#0a0515]/90">
                        {subtema.topics.map((sub) => {
                          const isSubOpen = subsubtemasAbertos.includes(sub.id)
                          const aulasData = getAulasFromDoctorate(sub.id)

                          return (
                            <div key={sub.id} className="border border-[#a78bfa]/10 rounded-lg overflow-hidden hover:border-[#a78bfa]/30 transition-all bg-[#0a0515]/90">
                              <button
                                onClick={() => toggleSubsubtema(sub.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#a78bfa]/5 transition-colors group"
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
                                    ⚡
                                  </motion.span>
                                  <span className="font-medium text-[#c4b5fd] group-hover:text-[#a78bfa] transition-colors">
                                    {sub.title}
                                  </span>
                                  <span className="text-xs text-[#a78bfa]/40">
                                    {aulasData.length} aulas
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[#a78bfa]/40 group-hover:text-[#a78bfa] transition-colors"
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
                                    <div className="p-4 border-t border-[#a78bfa]/10 overflow-x-auto bg-[#0a0515]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: `${cor}15` }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#c4b5fd] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#c4b5fd] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#c4b5fd] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#c4b5fd] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulasData.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#a78bfa]/5 hover:bg-[#a78bfa]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#a78bfa]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-4 py-2 font-medium text-[#c4b5fd] align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                  >
                                                    <Link
                                                      href={`/aula/${aula.slug}`}
                                                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-[#0a0515] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                      style={{ background: cor }}
                                                    >
                                                      Ir <ExternalLink size={10} />
                                                    </Link>
                                                  </motion.div>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-[#a78bfa]/60 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-[#a78bfa]/60 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-[#a78bfa]/60 align-top text-xs">
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