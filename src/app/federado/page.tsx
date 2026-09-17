'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── ESTILO FEDERADO ───
const PAPEL: React.CSSProperties = {
  backgroundColor: '#0a0000',
  minHeight: '100vh',
  position: 'relative',
}

// ─── SÍMBOLOS FLUTUANTES (VERSÃO LEVE - SEM ANIMAÇÃO COMPLEXA) ───
const SYMBOLS = [
  '⚠️', '💀', '🎯', '☠️', '⚡', '🔥', '🛡️', '🔒'
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

export default function FederadoPage() {
  const part = parts.find(p => p.id === 'federado')!

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

  const totalSubsubtemas = part.sections.reduce((acc, st) => acc + st.topics.length, 0)
  const totalTopicos = part.sections.reduce((acc, st) => acc + st.topics.reduce((s, t) => s + t.subs.length, 0), 0)

  const cor = '#dc2626'

  return (
    <div className="min-h-screen" style={PAPEL}>
      
      {/* ─── FUNDO ESTÁTICO COM GRADIENTES ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(220,38,38,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(220,38,38,0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(220,38,38,0.03) 0%, transparent 60%)
          `
        }} />
        
        {/* ─── SÍMBOLOS ESTÁTICOS ─── */}
        <div className="absolute inset-0 overflow-hidden">
          {SYMBOLS.map((symbol, i) => {
            const positions = [
              { top: '5%', left: '5%' },
              { top: '15%', left: '92%' },
              { top: '40%', left: '2%' },
              { top: '70%', left: '95%' },
              { top: '85%', left: '8%' },
              { top: '50%', left: '88%' },
              { top: '25%', left: '45%' },
              { top: '75%', left: '50%' },
              { top: '10%', left: '30%' },
              { top: '60%', left: '15%' },
              { top: '90%', left: '75%' },
              { top: '30%', left: '78%' },
              { top: '55%', left: '55%' },
              { top: '20%', left: '70%' },
              { top: '80%', left: '35%' },
              { top: '45%', left: '25%' },
            ]
            const pos = positions[i % positions.length]
            
            return (
              <span
                key={i}
                className="absolute text-5xl select-none"
                style={{
                  ...pos,
                  opacity: 0.04,
                  color: cor,
                  transform: `rotate(${i * 25}deg)`,
                  textShadow: `0 0 30px ${cor}30`,
                }}
              >
                {symbol}
              </span>
            )
          })}
        </div>
        
        {/* ─── TEXTO DE FUNDO ─── */}
        <div className="absolute inset-0 flex items-center justify-center select-none">
          <span 
            className="text-8xl md:text-9xl font-black opacity-[0.02] tracking-widest"
            style={{ color: cor }}
          >
            ⚠️ DANGER ⚠️
          </span>
        </div>
      </div>

      {/* ─── CONTEÚDO ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* ─── TOPO: Voltar ─── */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-[#dc2626]/30"
            style={{ background: `linear-gradient(135deg, ${cor}, #b91c1c)` }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          {/* ─── LOGO ─── */}
          <div className="hidden md:flex items-center gap-2 pb-1 border-b-2 border-[#dc2626]/20">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${cor}, #b91c1c)` }}>
              <span className="text-base font-black text-white">T</span>
            </div>
            <div>
              <span className="font-bold text-[#fca5a5] text-sm tracking-tight flex items-center gap-1">
                TeoScript <span className="text-[#fbbf24]">Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-[#fca5a5]/60 tracking-[0.25em] uppercase leading-none">
                Doctorate · Federado
              </span>
            </div>
          </div>
        </div>

        {/* ─── CABEÇALHO ─── */}
        <div className="bg-[#0a0000]/90 backdrop-blur-sm rounded-2xl border border-[#dc2626]/20 shadow-lg shadow-[#dc2626]/10 overflow-hidden mb-8">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #dc2626, #ef4444, #b91c1c, #dc2626)' }} />
          
          <div className="px-6 md:px-12 py-8 md:py-12 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl md:text-6xl">⚠️</span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: cor }}>
                Federado e Privacidade
              </h1>
            </div>
            <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: cor }} />
            <p className="text-sm md:text-base text-[#fca5a5]/60 max-w-2xl mx-auto">
              ⚡ Aprendizado Federado • Privacidade Diferencial • Segurança ⚡
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs">
              <span className="px-4 py-1.5 bg-[#dc2626]/10 rounded-full border border-[#dc2626]/30 text-[#fca5a5]">
                {part.sections.length} temas
              </span>
              <span className="px-4 py-1.5 bg-[#dc2626]/10 rounded-full border border-[#dc2626]/30 text-[#fca5a5]">
                {totalSubsubtemas} tópicos
              </span>
              <span className="px-4 py-1.5 bg-[#dc2626]/10 rounded-full border border-[#dc2626]/30 text-[#fca5a5]">
                {totalTopicos} aulas
              </span>
            </div>
          </div>
        </div>

        {/* ─── SEÇÕES ─── */}
        <div className="space-y-4">
          {part.sections.map((section, sectionIndex) => {
            const isOpen = subtemasAbertos.includes(section.id)

            return (
              <div 
                key={section.id} 
                className="bg-[#0a0000]/90 rounded-xl border border-[#dc2626]/10 overflow-hidden hover:border-[#dc2626]/30 transition-all"
              >
                <button
                  onClick={() => toggleSubtema(section.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#dc2626]/5 transition-colors"
                  style={{ borderLeft: isOpen ? `4px solid ${cor}` : '4px solid transparent' }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl">🛡️</span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold" style={{ color: cor }}>
                        {sectionIndex + 1}. {section.title}
                      </h3>
                      <span className="text-xs text-[#fca5a5]/40">{section.topics.length} tópicos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-medium text-[#fca5a5]/40 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-[#fca5a5]/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
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
                      <div className="p-4 md:p-6 border-t border-[#dc2626]/10 space-y-3 bg-[#0a0000]/90">
                        {section.topics.map((topic) => {
                          const isSubOpen = subsubtemasAbertos.includes(topic.id)
                          const aulasData = getAulasFromDoctorate(topic.id)

                          return (
                            <div 
                              key={topic.id} 
                              className="border border-[#dc2626]/10 rounded-lg overflow-hidden hover:border-[#dc2626]/30 transition-all bg-[#0a0000]/90"
                            >
                              <button
                                onClick={() => toggleSubsubtema(topic.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#dc2626]/5 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">⚡</span>
                                  <span className="font-medium text-[#fca5a5] text-sm group-hover:text-[#dc2626] transition-colors">
                                    {topic.title}
                                  </span>
                                  <span className="text-xs text-[#fca5a5]/40">{aulasData.length} aulas</span>
                                </div>
                                <ChevronDown 
                                  size={16} 
                                  className={`text-[#fca5a5]/40 transition-transform duration-300 ${isSubOpen ? 'rotate-180' : ''}`}
                                />
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
                                    <div className="p-4 border-t border-[#dc2626]/10 overflow-x-auto bg-[#0a0000]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: `${cor}15` }}>
                                            <th className="px-3 py-2 text-left font-semibold text-[#fca5a5] w-[20%] text-xs">Aula</th>
                                            <th className="px-3 py-2 text-left font-semibold text-[#fca5a5] w-[28%] text-xs">O que estudar</th>
                                            <th className="px-3 py-2 text-left font-semibold text-[#fca5a5] w-[28%] text-xs">Aplicação na Tese</th>
                                            <th className="px-3 py-2 text-left font-semibold text-[#fca5a5] w-[24%] text-xs">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulasData.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#dc2626]/5 hover:bg-[#dc2626]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#dc2626]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-3 py-2 font-medium text-[#fca5a5] align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span className="text-xs">{aula.nome}</span>
                                                  <Link
                                                    href={`/aula/${aula.slug}`}
                                                    className="inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full text-[#0a0000] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                    style={{ background: cor }}
                                                  >
                                                    Ir <ExternalLink size={8} />
                                                  </Link>
                                                </div>
                                              </td>
                                              <td className="px-3 py-2 text-[#fca5a5]/60 align-top text-xs">{aula.estudo}</td>
                                              <td className="px-3 py-2 text-[#fca5a5]/60 align-top text-xs">{aula.tese}</td>
                                              <td className="px-3 py-2 text-[#fca5a5]/60 align-top text-xs">{aula.projeto}</td>
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