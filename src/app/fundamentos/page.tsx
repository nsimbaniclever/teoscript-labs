// src/app/fundamentos/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── COR ───
const COR = '#8b7355'

// ─── SÍMBOLOS FLUTUANTES ───
const SYMBOLS = ['💻', '⌨️', '⚡', '🔧', '📊', '🧩', '0️⃣', '1️⃣', 'CPU', 'RAM', 'SSD', '💾', '🖥️', '🔌', '⚙️']

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

export default function FundamentosPage() {
  const part = parts.find(p => p.id === 'fundamentos')

  if (!part) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white/80">Tema não encontrado</h1>
          <p className="text-white/40 mt-2">O tema "fundamentos" não existe no doctorate.ts</p>
        </div>
      </div>
    )
  }

  const [subtemasAbertos, setSubtemasAbertos] = useState<string[]>([])
  const [subsubtemasAbertos, setSubsubtemasAbertos] = useState<string[]>([])
  const [symbolsPositions, setSymbolsPositions] = useState<{ x: number; y: number; symbol: string; size: number; delay: number; speed: number; direction: string }[]>([])

  useEffect(() => {
    const directions = ['up', 'down', 'left', 'right', 'diagonal']
    const positions = SYMBOLS.map(() => ({
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 20 + Math.random() * 32,
      delay: Math.random() * 8,
      speed: 6 + Math.random() * 15,
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
  const totalTopicos = part.sections.reduce((acc, st) => acc + st.topics.reduce((s, t) => s + t.subs.length, 0), 0)

  const cor = '#8b7355'

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* ─── FUNDO COM GRADIENTES ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(139, 115, 85, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(139, 115, 85, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(139, 115, 85, 0.04) 0%, transparent 60%)
          `
        }} />
        
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 115, 85, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 115, 85, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* ─── SÍMBOLOS FLUTUANTES COM ANIMAÇÃO AGRESSIVA ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {symbolsPositions.map((item, index) => {
          let xMovement: number[] = []
          let yMovement: number[] = []
          
          switch(item.direction) {
            case 'up':
              xMovement = [0, (Math.random() - 0.5) * 150, 0]
              yMovement = [-300, -550, -800]
              break
            case 'down':
              xMovement = [0, (Math.random() - 0.5) * 150, 0]
              yMovement = [300, 550, 800]
              break
            case 'left':
              xMovement = [-300, -550, -800]
              yMovement = [0, (Math.random() - 0.5) * 150, 0]
              break
            case 'right':
              xMovement = [300, 550, 800]
              yMovement = [0, (Math.random() - 0.5) * 150, 0]
              break
            case 'diagonal':
              xMovement = [200, 400, 600]
              yMovement = [-200, -400, -600]
              break
            default:
              xMovement = [0, 100, 0]
              yMovement = [0, 100, 0]
          }

          return (
            <motion.span
              key={index}
              className="absolute font-bold select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: item.size,
                color: '#8b7355',
                opacity: 0.04 + Math.random() * 0.04,
                textShadow: '0 0 40px rgba(139, 115, 85, 0.15)',
              }}
              animate={{
                x: xMovement,
                y: yMovement,
                rotate: [0, 720, -360, 1080, 0],
                scale: [0.3, 2.2, 0.4, 1.8, 0.3],
                opacity: [0.04, 0.20, 0.04, 0.15, 0.04],
              }}
              transition={{
                x: {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay,
                },
                y: {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay + 0.3,
                },
                rotate: {
                  duration: 3 + Math.random() * 2,
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
                opacity: {
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

      {/* ─── CONTEÚDO ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* ─── TOPO: Voltar ─── */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-[#8b7355] text-white hover:bg-[#6d5a42] hover:-translate-y-1 transition-all shadow-md hover:shadow-[#8b7355]/30"
            >
              <ArrowLeft size={16} /> Voltar
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-2 pb-1 border-b-2 border-white/10"
            whileHover={{ scale: 1.08 }}
          >
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: cor }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 115, 85, 0.3)',
                  '0 0 60px rgba(139, 115, 85, 0.8)',
                  '0 0 20px rgba(139, 115, 85, 0.3)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-base font-black text-white">T</span>
            </motion.div>
            <div>
              <span className="font-bold text-white/90 text-sm tracking-tight flex items-center gap-1">
                TeoScript <span style={{ color: '#fbbf24' }}>Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-white/40 tracking-[0.25em] uppercase leading-none">
                Doctorate · Fundamentos
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── CABEÇALHO ─── */}
        <motion.div
          className="bg-[#111827] rounded-2xl border border-white/5 shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="h-1 w-full"
            style={{ background: 'linear-gradient(to right, #8b7355, #a08b7a, #c4b5a5, #8b7355)' }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
          />
          
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#8b7355]/8" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#8b7355]/8" />

          <div className="px-6 md:px-12 py-8 md:py-10 text-center relative">
            <motion.div
              className="flex items-center justify-center gap-3 mb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <motion.span
                className="text-5xl md:text-6xl"
                animate={{
                  rotate: [0, 15, -15, 10, 0],
                  scale: [1, 1.25, 1, 1.15, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                💾
              </motion.span>
              <motion.h1
                className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(139, 115, 85, 0)',
                    '0 0 60px rgba(139, 115, 85, 0.3)',
                    '0 0 20px rgba(139, 115, 85, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Fundamentos de Computação
              </motion.h1>
            </motion.div>

            <motion.div
              className="w-16 h-1 mx-auto rounded-full mb-3"
              style={{ background: cor }}
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />

            <motion.p
              className="text-sm md:text-base text-white/40 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Conceitos fundamentais de computação, programação e estruturas de dados
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-4 text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              {[
                { label: `${part.sections.length} temas`, icon: '📚' },
                { label: `${totalSubsubtemas} tópicos`, icon: '📖' },
                { label: `${totalTopicos} aulas`, icon: '🎯' },
              ].map((item, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 rounded-full border border-white/10 text-white/50 flex items-center gap-1"
                  whileHover={{
                    scale: 1.2,
                    borderColor: '#8b7355',
                    boxShadow: '0 0 40px rgba(139, 115, 85, 0.3)',
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span>{item.icon}</span> {item.label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ─── SEÇÕES ─── */}
        <div className="space-y-3">
          {part.sections.map((section, sectionIndex) => {
            const isOpen = subtemasAbertos.includes(section.id)

            return (
              <motion.div
                key={section.id}
                className="bg-[#111827] rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.06 }}
              >
                <motion.button
                  onClick={() => toggleSubtema(section.id)}
                  className="w-full flex items-center justify-between gap-4 p-4 hover:bg-white/5 transition-colors"
                  style={{ borderLeft: isOpen ? `4px solid ${COR}` : '4px solid transparent' }}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <motion.span
                      className="text-xl"
                      animate={{
                        scale: isOpen ? [1, 1.5, 1] : 1,
                        rotate: isOpen ? [0, 30, -30, 0] : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      📚
                    </motion.span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-white/90">
                        {sectionIndex + 1}. {section.title}
                      </h3>
                      <span className="text-xs text-white/30">{section.topics.length} tópicos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium text-white/30 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-white/30"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-white/5 space-y-3">
                        {section.topics.map((topic, topicIndex) => {
                          const isSubOpen = subsubtemasAbertos.includes(topic.id)
                          const aulasData = getAulasFromDoctorate(topic.id)

                          return (
                            <motion.div
                              key={topic.id}
                              className="border border-white/5 rounded-lg overflow-hidden hover:border-white/10 transition-all"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: topicIndex * 0.07 }}
                            >
                              <motion.button
                                onClick={() => toggleSubsubtema(topic.id)}
                                className="w-full flex items-center justify-between gap-4 p-3 hover:bg-white/5 transition-colors"
                                whileHover={{ x: 5 }}
                              >
                                <div className="flex items-center gap-2">
                                  <motion.span
                                    className="text-lg"
                                    animate={{
                                      rotate: isSubOpen ? 180 : 0,
                                      scale: isSubOpen ? 1.3 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    🧩
                                  </motion.span>
                                  <span className="font-medium text-white/80 text-sm group-hover:text-[#8b7355] transition-colors">
                                    {topic.title}
                                  </span>
                                  <span className="text-xs text-white/30">{aulasData.length} aulas</span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-white/30"
                                >
                                  <ChevronDown size={16} />
                                </motion.div>
                              </motion.button>

                              <AnimatePresence>
                                {isSubOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-3 border-t border-white/5 overflow-x-auto">
                                      {aulasData.length === 0 ? (
                                        <p className="text-white/40 text-sm p-4 text-center">
                                          Nenhuma aula cadastrada para este tópico ainda.
                                        </p>
                                      ) : (
                                        <table className="w-full text-xs border-collapse">
                                          <thead>
                                            <tr className="bg-white/5">
                                              <th className="px-2 py-1.5 text-left font-semibold text-white/50 w-[22%]">Aula</th>
                                              <th className="px-2 py-1.5 text-left font-semibold text-white/50 w-[28%]">O que estudar</th>
                                              <th className="px-2 py-1.5 text-left font-semibold text-white/50 w-[28%]">Aplicação na Tese</th>
                                              <th className="px-2 py-1.5 text-left font-semibold text-white/50 w-[22%]">Projeto</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {aulasData.map((aula, idx) => (
                                              <motion.tr
                                                key={idx}
                                                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-white/5' : ''}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                              >
                                                <td className="px-2 py-1.5 font-medium text-white/70 align-top">
                                                  <div className="flex items-center gap-1.5 flex-wrap group">
                                                    <span>{aula.nome}</span>
                                                    <motion.div
                                                      whileHover={{ scale: 1.1 }}
                                                      whileTap={{ scale: 0.9 }}
                                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                      <Link
                                                        href={`/aula/${aula.slug}`}
                                                        className="inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full text-white whitespace-nowrap"
                                                        style={{ background: cor }}
                                                      >
                                                        Ir <ExternalLink size={8} />
                                                      </Link>
                                                    </motion.div>
                                                  </div>
                                                </td>
                                                <td className="px-2 py-1.5 text-white/40 align-top">{aula.estudo}</td>
                                                <td className="px-2 py-1.5 text-white/40 align-top">{aula.tese}</td>
                                                <td className="px-2 py-1.5 text-white/40 align-top">{aula.projeto}</td>
                                              </motion.tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
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

        {/* ─── FOOTER ─── */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.p
            className="text-xs text-white/20"
            animate={{
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡 Clique em um tópico para ver as aulas
          </motion.p>
          <motion.div
            className="mt-2 text-[10px] text-white/10 flex justify-center gap-4"
            animate={{
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>💾 Hardware</span>
            <span>⚡ ↔</span>
            <span>🧩 Lógica</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}