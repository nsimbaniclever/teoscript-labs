// src/components/FocusPanel.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { X, ChevronDown, ExternalLink, ChevronRight } from 'lucide-react'

export type Topico = { id: string; title: string; subs: string[]; slug?: string }
export type Secao = { id: string; title: string; topics: Topico[] }
export type Parte = { id: string; title: string; sections: Secao[] }

interface FocusPanelProps {
  part: Parte
  done: string[]
  toggle: (key: string) => void
  onClose: () => void
}

// ─── ROTAS POR TEMA ───
const TEMA_ROUTES: Record<string, string> = {
  fundamentos: '/fundamentos',
  matematica: '/matematica',
  algoritmos: '/algoritmos',
  ml: '/machine-learning',
  'ml-inter': '/machine-learning-intermediario',
  'ml-adv': 'machine-learning-avancado',
  federado: '/federado',
  database: '/database',
  redes: '/redes',
  rede: '/rede',
  arquitetura: '/arquitetura',
  engenharia: '/engenharia',
  'engenharia-dados': '/engenharia-dados',
}

// ─── ÍCONES POR TEMA ───
const ICONES: Record<string, string> = {
  fundamentos: '💾',
  matematica: '📐',
  algoritmos: '🧮',
  ml: '🧠',
  'ml-inter': '🧠',
  'ml-adv': '🔥',
  federado: '🔒',
  database: '🗄️',
  redes: '🌐',
  rede: '🌐',
  arquitetura: '🖥️',
  engenharia: '⚙️',
  'engenharia-dados': '🚀',
}

// ─── ÍCONES POR SEÇÃO (tópicos) ───
const ICONES_SECAO: Record<string, Record<string, string>> = {
  fundamentos: {
    'fundamentos': '💻',
    'circuitos-combinacionais': '🔌',
    'tipos-ram': '🧠',
    'pipeline': '⚡',
  },
  matematica: {
    'mat-al': '📊',
    'mat-cd': '📈',
    'mat-ci': '∫',
    'mat-se': 'Σ',
    'mat-ed': '📋',
    'mat-pb': '🎲',
    'mat-inf': '🔬',
  },
  algoritmos: {
    'alg-fundamentos': '📘',
    'alg-controle': '🔀',
    'alg-estruturas': '📚',
    'alg-funcoes': '⚙️',
    'alg-poo': '🏗️',
    'alg-git': '🔗',
    'alg-pip': '📦',
  },
  'engenharia-dados': {
    'eng-algoritmos': '🧮',
    'eng-datascience': '📊',
    'eng-bigdata': '🌍',
    'eng-engenharia': '⚙️',
    'eng-devops': '🚀',
    'eng-dl': '🧠',
  },
  'ml-inter': {
    'ml-inter-trees': '🌳',
    'ml-inter-dimensionality': '📉',
    'ml-inter-clustering': '🎯',
    'ml-inter-svm': '⚡',
    'ml-inter-ensemble': '🧩',
    'ml-inter-timeseries': '📈',
    'ml-inter-xai': '🔍',
  },
  'ml-adv': {
    'ml-adv-dl': '🧠',
    'ml-adv-cnn': '👁️',
    'ml-adv-rnn': '🔄',
    'ml-adv-nlp': '💬',
    'ml-adv-generative': '🎨',
    'ml-adv-rl': '🎮',
    'ml-adv-automl': '🤖',
    'ml-adv-research': '📖',
  },
  federado: {
    'fed-c': '🤝',
    'log-p': '🔒',
  },
  database: {
    'sql-ambiente': '🛠️',
    'sql-ddl': '📐',
    'sql-dml': '✏️',
    'sql-string': '📝',
    'sql-window': '🪟',
    'sql-avancado-unico': '🚀',
  },
  redes: {
    'net-fundamentos': '🌐',
    'net-modelos-enderecamento': '📍',
    'net-equipamentos': '🔧',
    'net-protocolos-transporte': '📡',
    'net-aplicacao': '💻',
    'net-subnetting-ipv6': '🔢',
    'net-roteamento': '🗺️',
    'net-vlans-wireless': '📶',
  },
  rede: {
    'net-nat-firewall-qos': '🛡️',
    'net-sdn-avancados': '⚙️',
    'net-seguranca': '🔒',
    'net-avancado-internet': '🌍',
    'net-cloud': '☁️',
    'net-sockets': '🔌',
    'net-monitoramento-analise-automacao': '📊',
    'net-pesquisa': '🔬',
    'net-certificacoes': '📜',
  },
  arquitetura: {
    'arc-fund': '💻',
    'arc-cpu': '⚡',
    'arc-pipeline': '🔄',
    'arc-memoria': '🧠',
    'arc-so-nucleo': '⚙️',
    'arc-so-arquivos': '📁',
    'arc-boot': '🚀',
    'arc-avancados': '🔬',
  },
  engenharia: {
    'eng-fundamentos': '📐',
    'eng-ciclo-vida': '🔄',
    'eng-processos': '⚙️',
  },
}

// ─── FUNDOS TEMÁTICOS (SEM STICKERS) ───
const FUNDOS_TEMA: Record<string, {
  bg: string
  pattern: string
  isDark: boolean
}> = {
  fundamentos: {
    bg: '#0a0a0f',
    pattern: 'repeating-linear-gradient(0deg, rgba(139,115,85,0.03) 0px, rgba(139,115,85,0.03) 1px, transparent 1px, transparent 20px)',
    isDark: true,
  },
  matematica: {
    bg: '#f5f0e8',
    pattern: 'linear-gradient(rgba(26,58,138,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,138,0.08) 1px, transparent 1px)',
    isDark: false,
  },
  algoritmos: {
    bg: '#0a0a0f',
    pattern: 'repeating-linear-gradient(0deg, rgba(0,255,65,0.04) 0px, rgba(0,255,65,0.04) 1px, transparent 1px, transparent 20px)',
    isDark: true,
  },
  ml: {
    bg: '#0a0a0f',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(109,40,217,0.04) 0%, transparent 50%)',
    isDark: true,
  },
  'ml-inter': {
    bg: '#0a0515',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 50%)',
    isDark: true,
  },
  'ml-adv': {
    bg: '#050510',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(76,29,149,0.10) 0%, transparent 50%)',
    isDark: true,
  },
  federado: {
    bg: '#0a0a0f',
    pattern: 'repeating-linear-gradient(45deg, rgba(185,28,28,0.03) 0px, rgba(185,28,28,0.03) 12px, transparent 12px, transparent 24px)',
    isDark: true,
  },
  database: {
    bg: '#0a0a0f',
    pattern: 'repeating-linear-gradient(0deg, rgba(21,128,61,0.03) 0px, rgba(21,128,61,0.03) 1px, transparent 1px, transparent 30px)',
    isDark: true,
  },
  redes: {
    bg: '#0a0a0f',
    pattern: 'radial-gradient(circle at 40% 60%, rgba(14,116,144,0.04) 0%, transparent 50%)',
    isDark: true,
  },
  rede: {
    bg: '#0a0a0f',
    pattern: 'radial-gradient(circle at 40% 60%, rgba(13,148,136,0.04) 0%, transparent 50%)',
    isDark: true,
  },
  arquitetura: {
    bg: '#0a0a0f',
    pattern: 'repeating-linear-gradient(0deg, rgba(194,65,12,0.03) 0px, rgba(194,65,12,0.03) 1px, transparent 1px, transparent 16px)',
    isDark: true,
  },
  engenharia: {
    bg: '#0a0a0f',
    pattern: 'repeating-linear-gradient(45deg, rgba(190,24,93,0.03) 0px, rgba(190,24,93,0.03) 2px, transparent 2px, transparent 20px)',
    isDark: true,
  },
  'engenharia-dados': {
    bg: '#0a0e27',
    pattern: 'repeating-linear-gradient(0deg, rgba(0,212,255,0.03) 0px, rgba(0,212,255,0.03) 1px, transparent 1px, transparent 20px)',
    isDark: true,
  },
}

// ─── CORES POR TEMA ───
const CORES_POR_TEMA: Record<string, { principal: string; hover: string; fundo: string; texto: string }> = {
  fundamentos: { principal: '#8b7355', hover: '#6d5a42', fundo: '#8b735510', texto: '#e8d5b7' },
  matematica: { principal: '#2557d0', hover: '#1a3f8a', fundo: '#2557d010', texto: '#1a3a8a' },
  algoritmos: { principal: '#00ff41', hover: '#00cc33', fundo: '#00ff4110', texto: '#4ade80' },
  ml: { principal: '#6d28d9', hover: '#5b21b6', fundo: '#6d28d910', texto: '#c4b5fd' },
  'ml-inter': { principal: '#6d28d9', hover: '#5b21b6', fundo: '#6d28d910', texto: '#c4b5fd' },
  'ml-adv': { principal: '#4c1d95', hover: '#3b0f7a', fundo: '#4c1d9510', texto: '#8b5cf6' },
  federado: { principal: '#b91c1c', hover: '#991b1b', fundo: '#b91c1c10', texto: '#fca5a5' },
  database: { principal: '#15803d', hover: '#166534', fundo: '#15803d10', texto: '#86efac' },
  redes: { principal: '#0e7490', hover: '#0a5a70', fundo: '#0e749010', texto: '#67e8f9' },
  rede: { principal: '#0d9488', hover: '#0f766e', fundo: '#0d948810', texto: '#5eead4' },
  arquitetura: { principal: '#c2410c', hover: '#9a340a', fundo: '#c2410c10', texto: '#fdba74' },
  engenharia: { principal: '#be185d', hover: '#9d174d', fundo: '#be185d10', texto: '#f9a8d4' },
  'engenharia-dados': { principal: '#00d4ff', hover: '#00bbdd', fundo: '#00d4ff10', texto: '#67e8f9' },
}

export default function FocusPanel({ part, done, toggle, onClose }: FocusPanelProps) {
  const router = useRouter()
  // ─── TODOS OS TÓPICOS COMEÇAM FECHADOS ───
  const [secaoAberta, setSecaoAberta] = useState<string | null>(null)
  const [topicoHover, setTopicoHover] = useState<string | null>(null)

  const fundo = FUNDOS_TEMA[part.id] || FUNDOS_TEMA.fundamentos
  const coresTema = CORES_POR_TEMA[part.id] || CORES_POR_TEMA.fundamentos
  const rota = TEMA_ROUTES[part.id] || '/'

  const isDark = fundo.isDark ?? true

  const todasChaves = part.sections.flatMap((section) =>
    section.topics.flatMap((top) =>
      top.subs.map((_, i) => `${top.id}-sub-${i}`)
    )
  )
  const feitas = todasChaves.filter((k) => done.includes(k)).length
  const percent = todasChaves.length ? Math.round((feitas / todasChaves.length) * 100) : 0

  const handleAcessarPagina = () => {
    router.push(rota)
  }

  const toggleSecao = (id: string) => {
    setSecaoAberta(secaoAberta === id ? null : id)
  }

  // ─── ÍCONE DA SEÇÃO ───
  const getIconeSecao = (sectionId: string) => {
    const icones = ICONES_SECAO[part.id] || {}
    return icones[sectionId] || '📌'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, duration: 0.4 }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        style={{
          backgroundColor: fundo.bg,
          backgroundImage: fundo.pattern,
          backgroundSize: '28px 28px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── CONTEÚDO ─── */}
        <div className="relative z-10">
          {/* ─── CABEÇALHO ─── */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}>
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-3xl shrink-0">{ICONES[part.id] ?? '📘'}</span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold truncate" style={{ color: coresTema.texto }}>{part.title}</h2>
                <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>
                  {part.sections.length} seções · {part.sections.reduce((acc, s) => acc + s.topics.length, 0)} tópicos · {todasChaves.length} subtópicos
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* ─── BARRA DE PROGRESSO ─── */}
          <div className="px-6 py-3 border-b border-white/5" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: coresTema.principal }}
                  />
                </div>
              </div>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: coresTema.texto }}>
                {percent}%
              </span>
            </div>
          </div>

          {/* ─── CONTEÚDO (SCROLL) ─── */}
          <div className="overflow-y-auto max-h-[50vh] p-4 space-y-2">
            {part.sections.map((section) => {
              const isOpen = secaoAberta === section.id
              const iconSecao = getIconeSecao(section.id)

              return (
                <div key={section.id} className="border border-white/5 rounded-xl overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}>
                  <button
                    onClick={() => toggleSecao(section.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{iconSecao}</span>
                      <span className="text-sm font-medium" style={{ color: coresTema.texto }}>{section.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                        {section.topics.length} tópicos
                      </span>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 py-3 space-y-2" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                          {section.topics.map((topic) => {
                            const isHovered = topicoHover === topic.id

                            return (
                              <div
                                key={topic.id}
                                className="relative rounded-lg transition-all duration-200"
                                onMouseEnter={() => setTopicoHover(topic.id)}
                                onMouseLeave={() => setTopicoHover(null)}
                                style={{
                                  background: isHovered ? `${coresTema.principal}20` : 'transparent',
                                  paddingLeft: isHovered ? '8px' : '0px',
                                  borderLeft: isHovered ? `3px solid ${coresTema.principal}` : '3px solid transparent',
                                }}
                              >
                                <div className="flex items-center justify-between p-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium" style={{ color: coresTema.texto }}>📌 {topic.title}</span>
                                    {topic.slug && (
                                      <a
                                        href={`/aula/${topic.slug}`}
                                        className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-white transition-all hover:-translate-y-0.5"
                                        style={{ background: coresTema.principal }}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Ir <ExternalLink size={10} />
                                      </a>
                                    )}
                                  </div>
                                  <span className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                                    {topic.subs.length} conceitos
                                  </span>
                                </div>

                                <AnimatePresence>
                                  {isHovered && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                                      className="overflow-hidden"
                                    >
                                      <div className="ml-8 pb-2 space-y-0.5">
                                        {topic.subs.map((sub, idx) => (
                                          <div key={idx} className="flex items-start gap-2 text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                                            <span style={{ color: coresTema.principal }}>•</span>
                                            {sub}
                                          </div>
                                        ))}
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

          {/* ─── RODAPÉ COM BOTÃO CENTRALIZADO ─── */}
          <div className="flex items-center justify-center px-6 py-4 border-t border-white/5" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
            <button
              onClick={handleAcessarPagina}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              style={{ background: coresTema.principal }}
              onMouseEnter={(e) => { e.currentTarget.style.background = coresTema.hover }}
              onMouseLeave={(e) => { e.currentTarget.style.background = coresTema.principal }}
            >
              🎯 Acessar Página
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}