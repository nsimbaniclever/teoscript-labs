// src/app/algoritmos/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── ESTILO ───
const PAPEL: React.CSSProperties = {
  backgroundColor: '#0a0f0a',
  minHeight: '100vh',
  position: 'relative',
}

// ─── COMPONENTE MATRIX RAIN ───
function MatrixRain({
  density = 150,
  speed = 50,
  color = '#00ff41',
  fontSize = 14
}: {
  density?: number
  speed?: number
  color?: string
  fontSize?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

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
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
        display: 'block',
      }}
    />
  )
}

export default function AlgoritmosPage() {
  const part = parts.find(p => p.id === 'algoritmos')!

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

  const cor = '#00ff41'

  return (
    <div className="min-h-screen relative overflow-hidden" style={PAPEL}>
      <MatrixRain density={150} speed={50} color="#00ff41" fontSize={14} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* ─── TOPO: Voltar ─── */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-[#0a0f0a] hover:-translate-y-0.5 transition-all shadow-md hover:shadow-[#00ff41]/20"
            style={{ background: cor }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
        </div>

        {/* ─── CABEÇALHO ─── */}
        <div className="relative bg-[#0a0f0a]/90 backdrop-blur-sm rounded-2xl border border-[#00ff41]/20 shadow-lg shadow-[#00ff41]/5 overflow-hidden mb-8">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #00ff41, #4ade80, #00ff41)' }} />
          <div className="px-6 md:px-12 py-8 md:py-12 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl md:text-6xl">🧮</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: cor }}>
                Algoritmos e Estruturas de Dados
              </h1>
            </div>
            <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: cor }} />
            <p className="text-lg md:text-xl text-[#4ade80]/60 max-w-2xl mx-auto">
              Algoritmos, estruturas de dados, programação e paradigmas
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <span className="px-4 py-1.5 bg-[#00ff41]/10 rounded-full border border-[#00ff41]/30 text-[#00ff41]">
                {part.sections.length} temas
              </span>
              <span className="px-4 py-1.5 bg-[#00ff41]/10 rounded-full border border-[#00ff41]/30 text-[#00ff41]">
                {totalSubsubtemas} tópicos
              </span>
              <span className="px-4 py-1.5 bg-[#00ff41]/10 rounded-full border border-[#00ff41]/30 text-[#00ff41]">
                {totalTopicos} conceitos
              </span>
            </div>
          </div>
        </div>

        {/* ─── SUBTEMAS ─── */}
        <div className="space-y-4">
          {part.sections.map((subtema) => {
            const isOpen = subtemasAbertos.includes(subtema.id)

            return (
              <div key={subtema.id} className="bg-[#0a0f0a]/90 rounded-xl border border-[#00ff41]/10 overflow-hidden shadow-sm hover:shadow-md hover:border-[#00ff41]/30 transition-all">
                <button
                  onClick={() => toggleSubtema(subtema.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#00ff41]/5 transition-colors"
                  style={{ borderLeft: isOpen ? `4px solid ${cor}` : '4px solid transparent' }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl">🧩</span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold" style={{ color: cor }}>
                        {subtema.title}
                      </h3>
                      <span className="text-sm text-[#00ff41]/40">
                        {subtema.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-[#00ff41]/40 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#00ff41]/40"
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
                      <div className="p-4 md:p-6 border-t border-[#00ff41]/10 space-y-3 bg-[#0a0f0a]/90">
                        {subtema.topics.map((topic) => {
                          const isSubOpen = subsubtemasAbertos.includes(topic.id)
                          const aulas = getAulas(topic.id)

                          return (
                            <div key={topic.id} className="border border-[#00ff41]/10 rounded-lg overflow-hidden hover:border-[#00ff41]/30 transition-all bg-[#0a0f0a]/90">
                              <button
                                onClick={() => toggleSubsubtema(topic.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#00ff41]/5 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">⚡</span>
                                  <span className="font-medium text-[#4ade80]">
                                    {topic.title}
                                  </span>
                                  <span className="text-xs text-[#00ff41]/40">
                                    {topic.subs.length} conceitos
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[#00ff41]/40"
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
                                    <div className="p-4 border-t border-[#00ff41]/10 overflow-x-auto bg-[#0a0f0a]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: `${cor}15` }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00ff41] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00ff41] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00ff41] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00ff41] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulas.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#00ff41]/5 hover:bg-[#00ff41]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#00ff41]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-4 py-2 font-medium text-[#4ade80] align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <Link
                                                    href={`/aula/${aula.slug}`}
                                                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-[#0a0f0a] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                    style={{ background: cor }}
                                                  >
                                                    Ir <ExternalLink size={10} />
                                                  </Link>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-[#00ff41]/60 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-[#00ff41]/60 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-[#00ff41]/60 align-top text-xs">
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
      </div>
    </div>
  )
}