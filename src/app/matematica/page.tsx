// src/app/matematica/page.tsx
'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'
import { useState, useEffect, useRef } from 'react'

// ─── ESTILO MATEMÁTICA (CADERNO) ───
const PAPEL: React.CSSProperties = {
  backgroundColor: '#f5f0e8',
  minHeight: '100vh',
  position: 'relative',
  backgroundImage: `
    linear-gradient(rgba(37, 87, 208, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 87, 208, 0.06) 1px, transparent 1px)
  `,
  backgroundSize: '30px 30px',
}

// ─── SÍMBOLOS FLUTUANTES ───
const SYMBOLS = [
  '∑', '∫', '∂', '√', 'π', '∞', '±', '≠',
  'Σ', '∫', '∂', '√', 'π', '∞', '±', '≠'
]

// ─── ÍCONES POR SEÇÃO (MATEMÁTICA) ───
const ICONES_SECAO_MATEMATICA: Record<string, string> = {
  'mat-al': '📊',
  'mat-cd': '📈',
  'mat-ci': '∫',
  'mat-se': 'Σ',
  'mat-ed': '📋',
  'mat-pb': '🎲',
  'mat-inf': '🔬',
}

// ─── ÍCONES POR TÓPICO (DENTRO DE CADA SEÇÃO) ───
const ICONES_TOPICO_MATEMATICA: Record<string, string> = {
  // ÁLGEBRA LINEAR
  'mat-al-1': '📐',
  'mat-al-2': '📊',
  'mat-al-3': '📝',
  'mat-al-4': '🔢',
  'mat-al-5': '🧩',
  
  // CÁLCULO DIFERENCIAL
  'mat-cd-1': '📈',
  'mat-cd-2': '📉',
  'mat-cd-3': '📐',
  'mat-cd-4': '🧮',
  'mat-cd-5': '📊',
  'mat-cd-6': '🎯',
  'mat-cd-7': '📋',
  
  // CÁLCULO INTEGRAL
  'mat-ci-1': '∫',
  'mat-ci-2': '📐',
  'mat-ci-3': '📈',
  'mat-ci-4': '📊',
  'mat-ci-5': '🎯',
  
  // SÉRIES
  'mat-se-1': 'Σ',
  'mat-se-2': '📐',
  'mat-se-3': '📈',
  'mat-se-4': '📋',
  'mat-se-5': '🎯',
  
  // ESTATÍSTICA DESCRITIVA
  'mat-ed-1': '📋',
  'mat-ed-2': '📊',
  'mat-ed-3': '📐',
  'mat-ed-4': '📈',
  'mat-ed-5': '🎯',
  
  // PROBABILIDADE
  'mat-pb-1': '🎲',
  'mat-pb-2': '🎯',
  'mat-pb-3': '📊',
  'mat-pb-4': '📈',
  'mat-pb-5': '📋',
  
  // INFERÊNCIA ESTATÍSTICA
  'mat-inf-1': '🔬',
  'mat-inf-2': '📊',
  'mat-inf-3': '📐',
}

// ─── FUNÇÃO PARA PEGAR ÍCONE DA SEÇÃO ───
const getIconeSecao = (sectionId: string): string => {
  return ICONES_SECAO_MATEMATICA[sectionId] || '📘'
}

// ─── FUNÇÃO PARA PEGAR ÍCONE DO TÓPICO ───
const getIconeTopico = (topicId: string): string => {
  return ICONES_TOPICO_MATEMATICA[topicId] || '📌'
}

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

// ─── COMPONENTE DE FUNDO "FÓRMULAS FLUTUANTES" ───
function FormulaBackground({ color = '#2557d0' }: { color?: string }) {
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

    const formulas = [
      { text: '∫ x dx = x²/2 + C', x: 0, y: 0, vx: 0.3, vy: -0.2, size: 14, alpha: 0.06 },
      { text: 'E = mc²', x: 0, y: 0, vx: -0.4, vy: 0.3, size: 18, alpha: 0.07 },
      { text: '∇f(x) = 0', x: 0, y: 0, vx: 0.5, vy: -0.1, size: 16, alpha: 0.06 },
      { text: 'Σ xᵢ/n', x: 0, y: 0, vx: -0.3, vy: -0.4, size: 15, alpha: 0.07 },
      { text: 'P(A|B) = P(A∩B)/P(B)', x: 0, y: 0, vx: 0.2, vy: 0.5, size: 13, alpha: 0.06 },
      { text: '∫₀^∞ e^(-x²) dx = √π/2', x: 0, y: 0, vx: -0.5, vy: 0.2, size: 14, alpha: 0.07 },
      { text: 'det(A) = ad - bc', x: 0, y: 0, vx: 0.4, vy: -0.3, size: 15, alpha: 0.06 },
      { text: 'A·x = b', x: 0, y: 0, vx: -0.2, vy: -0.5, size: 17, alpha: 0.07 },
      { text: 'λ₁ + λ₂ = tr(A)', x: 0, y: 0, vx: 0.3, vy: 0.4, size: 14, alpha: 0.06 },
      { text: '||v||₂ = √(Σ vᵢ²)', x: 0, y: 0, vx: -0.4, vy: -0.2, size: 15, alpha: 0.07 },
      { text: "f'(x) = lim Δx→0", x: 0, y: 0, vx: 0.5, vy: 0.1, size: 14, alpha: 0.06 },
      { text: 'Σ n² = n(n+1)(2n+1)/6', x: 0, y: 0, vx: -0.3, vy: 0.3, size: 13, alpha: 0.07 },
    ]

    formulas.forEach(f => {
      f.x = Math.random() * width
      f.y = Math.random() * height
    })

    let animationId: number | undefined

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const f of formulas) {
        f.x += f.vx
        f.y += f.vy

        if (f.x < -100 || f.x > width + 100) f.vx *= -1
        if (f.y < -100 || f.y > height + 100) f.vy *= -1

        ctx.globalAlpha = f.alpha
        ctx.font = `${f.size}px 'Courier New', monospace`
        ctx.fillStyle = color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(f.text, f.x, f.y)
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
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

export default function MatematicaPage() {
  const part = parts.find(p => p.id === 'matematica')!

  const [subtemasAbertos, setSubtemasAbertos] = useState<string[]>([])
  const [subsubtemasAbertos, setSubsubtemasAbertos] = useState<string[]>([])
  const [symbolsPositions, setSymbolsPositions] = useState<{ x: number; symbol: string; size: number; delay: number }[]>([])

  useEffect(() => {
    const positions = SYMBOLS.map((symbol) => ({
      symbol,
      x: 2 + Math.random() * 96,
      size: 28 + Math.random() * 45,
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

  const cor = '#2557d0'

  return (
    <div className="min-h-screen relative overflow-hidden" style={PAPEL}>
      {/* ─── FUNDO FÓRMULAS ─── */}
      <FormulaBackground color="#2557d0" />

      {/* ─── SÍMBOLOS FLUTUANTES ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {symbolsPositions.map((item, index) => (
          <motion.span
            key={index}
            className="absolute font-bold select-none"
            style={{
              left: `${item.x}%`,
              fontSize: item.size,
              color: '#2557d0',
              opacity: 0.06,
              textShadow: '0 0 30px rgba(37,87,208,0.1)',
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
                duration: 14 + Math.random() * 10,
                repeat: Infinity,
                ease: 'linear',
                delay: item.delay,
              },
              x: {
                duration: 9 + Math.random() * 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.delay,
              },
              rotate: {
                duration: 7 + Math.random() * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: item.delay,
              },
              scale: {
                duration: 5 + Math.random() * 4,
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
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:-translate-y-0.5 transition-all shadow-md hover:shadow-[#2557d0]/30"
            style={{ background: `linear-gradient(135deg, ${cor}, #1a3f8a)` }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          {/* ─── LOGO ─── */}
          <div className="hidden md:flex items-center gap-2 pb-1 border-b-2 border-[#2557d0]/20">
            <div
              className="relative w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
              style={{
                background: `linear-gradient(135deg, ${cor}, #1a3f8a)`,
              }}
            >
              <span className="text-base font-black text-white tracking-tight">T</span>
            </div>
            <div>
              <span className="font-bold text-[#1a3f8a] text-sm tracking-tight flex items-center gap-1">
                TeoScript <span className="text-[#fbbf24]">Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-[#1a3f8a]/60 tracking-[0.25em] uppercase leading-none">
                Doctorate · Matemática
              </span>
            </div>
          </div>
        </div>

        {/* ─── CABEÇALHO ─── */}
        <motion.div
          className="relative bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-[#2557d0]/20 shadow-lg shadow-[#2557d0]/5 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #2557d0, #5792ff, #1a3f8a, #2557d0)' }} />

          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2557d0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1a3f8a]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
                📐
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: cor }}>
                Matemática
              </h1>
            </motion.div>
            <motion.div
              className="w-24 h-1 mx-auto rounded-full mb-4"
              style={{ background: cor }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <p className="text-lg md:text-xl text-[#1a3f8a]/60 max-w-2xl mx-auto">
              Álgebra Linear · Cálculo · Estatística · Probabilidade
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <motion.span
                className="px-4 py-1.5 bg-[#2557d0]/10 rounded-full border border-[#2557d0]/30 text-[#2557d0]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(37,87,208,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                {part.sections.length} temas
              </motion.span>
              <motion.span
                className="px-4 py-1.5 bg-[#2557d0]/10 rounded-full border border-[#2557d0]/30 text-[#2557d0]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(37,87,208,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                {totalSubsubtemas} tópicos
              </motion.span>
              <motion.span
                className="px-4 py-1.5 bg-[#2557d0]/10 rounded-full border border-[#2557d0]/30 text-[#2557d0]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(37,87,208,0.2)' }}
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
            const iconSecao = getIconeSecao(subtema.id)

            return (
              <motion.div
                key={subtema.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-[#2557d0]/10 overflow-hidden shadow-sm hover:shadow-md hover:border-[#2557d0]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: temaIndex * 0.05 }}
              >
                <button
                  onClick={() => toggleSubtema(subtema.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#2557d0]/5 transition-colors group"
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
                      {iconSecao}
                    </motion.span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold" style={{ color: cor }}>
                        {temaIndex + 1}. {subtema.title.split('.').slice(1).join('.').trim()}
                      </h3>
                      <span className="text-sm text-[#1a3f8a]/40">
                        {subtema.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-[#1a3f8a]/40 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#1a3f8a]/40 group-hover:text-[#2557d0] transition-colors"
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
                      <div className="p-4 md:p-6 border-t border-[#2557d0]/10 space-y-3 bg-white/50">
                        {subtema.topics.map((sub) => {
                          const isSubOpen = subsubtemasAbertos.includes(sub.id)
                          const aulasData = getAulasFromDoctorate(sub.id)
                          const iconTopico = getIconeTopico(sub.id)

                          return (
                            <div key={sub.id} className="border border-[#2557d0]/10 rounded-lg overflow-hidden hover:border-[#2557d0]/30 transition-all bg-white/80">
                              <button
                                onClick={() => toggleSubsubtema(sub.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#2557d0]/5 transition-colors group"
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
                                    {iconTopico}
                                  </motion.span>
                                  <span className="font-medium text-[#1a3f8a] group-hover:text-[#2557d0] transition-colors">
                                    {sub.title}
                                  </span>
                                  <span className="text-xs text-[#1a3f8a]/40">
                                    {aulasData.length} aulas
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[#1a3f8a]/40 group-hover:text-[#2557d0] transition-colors"
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
                                    <div className="p-4 border-t border-[#2557d0]/10 overflow-x-auto bg-white/50">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: 'rgba(37,87,208,0.08)' }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#1a3f8a] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#1a3f8a] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#1a3f8a] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#1a3f8a] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulasData.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#2557d0]/5 hover:bg-[#2557d0]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#2557d0]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-4 py-2 font-medium text-[#2557d0] align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                  >
                                                    <Link
                                                      href={`/aula/${aula.slug}`}
                                                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                      style={{ background: cor }}
                                                    >
                                                      Ir <ExternalLink size={10} />
                                                    </Link>
                                                  </motion.div>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-[#1a3f8a]/60 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-[#1a3f8a]/60 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-[#1a3f8a]/60 align-top text-xs">
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