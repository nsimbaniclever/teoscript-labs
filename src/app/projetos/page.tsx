// src/app/[modulo]/projetos/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Network,
  Lock,
  BarChart3,
  FileCode,
  BookOpen,
  ChevronRight,
  Terminal,
  Copy,
  Check,
  AlertCircle,
  Globe
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { parts } from '@/content/doctorate'
import type { Projeto } from '@/lib/projetos'

// ─── ÍCONE GITHUB ───
function GithubIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

// ─── ÍCONES POR PROJETO (opcional, escolhido por hash do id) ───
const ICONES_PROJETO = [Code2, Network, Lock, BarChart3, FileCode, BookOpen, Globe, Terminal]

function getIconeProjeto(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  const Icon = ICONES_PROJETO[Math.abs(hash) % ICONES_PROJETO.length]
  return <Icon size={24} />
}

// ─── CORES POR MÓDULO ───
const CORES_MODULO: Record<string, { primary: string; secondary: string; bg: string; border: string; text: string }> = {
  fundamentos: { primary: '#8b7355', secondary: '#a08b7a', bg: 'rgba(139, 115, 85, 0.1)', border: 'rgba(139, 115, 85, 0.2)', text: '#e8d5b7' },
  matematica: { primary: '#2557d0', secondary: '#5792ff', bg: 'rgba(37, 87, 208, 0.1)', border: 'rgba(37, 87, 208, 0.2)', text: '#1a3a8a' },
  algoritmos: { primary: '#00ff41', secondary: '#4ade80', bg: 'rgba(0, 255, 65, 0.1)', border: 'rgba(0, 255, 65, 0.2)', text: '#4ade80' },
  'engenharia-dados': { primary: '#00d4ff', secondary: '#33ddff', bg: 'rgba(0, 212, 255, 0.1)', border: 'rgba(0, 212, 255, 0.2)', text: '#67e8f9' },
  ml: { primary: '#a78bfa', secondary: '#c4b5fd', bg: 'rgba(167, 139, 250, 0.1)', border: 'rgba(167, 139, 250, 0.2)', text: '#c4b5fd' },
  'ml-inter': { primary: '#6d28d9', secondary: '#8b5cf6', bg: 'rgba(109, 40, 217, 0.1)', border: 'rgba(109, 40, 217, 0.2)', text: '#c4b5fd' },
  'ml-adv': { primary: '#4c1d95', secondary: '#6d28d9', bg: 'rgba(76, 29, 149, 0.1)', border: 'rgba(76, 29, 149, 0.2)', text: '#8b5cf6' },
  federado: { primary: '#dc2626', secondary: '#f87171', bg: 'rgba(220, 38, 38, 0.1)', border: 'rgba(220, 38, 38, 0.2)', text: '#fca5a5' },
  database: { primary: '#22c55e', secondary: '#4ade80', bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)', text: '#86efac' },
  redes: { primary: '#06b6d4', secondary: '#22d3ee', bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.2)', text: '#67e8f9' },
  rede: { primary: '#0d9488', secondary: '#14b8a6', bg: 'rgba(13, 148, 136, 0.1)', border: 'rgba(13, 148, 136, 0.2)', text: '#5eead4' },
  arquitetura: { primary: '#ea580c', secondary: '#f97316', bg: 'rgba(234, 88, 12, 0.1)', border: 'rgba(234, 88, 12, 0.2)', text: '#fdba74' },
  engenharia: { primary: '#ec4899', secondary: '#f472b6', bg: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.2)', text: '#f9a8d4' }
}

// ─── STATUS BADGE ───
function StatusBadge({ status }: { status: Projeto['status'] }) {
  const config = {
    'em-desenvolvimento': { label: '🚧 Em desenvolvimento', color: '#f59e0b' },
    'concluido': { label: '✅ Concluído', color: '#22c55e' },
    'planejado': { label: '📋 Planejado', color: '#64748b' }
  }
  const { label, color } = config[status] || config['planejado']
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>
      {label}
    </span>
  )
}

// ─── CARD DE CÓDIGO ───
function CodigoCard({ codigo, linguagem = 'Python' }: { codigo?: string; linguagem?: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (!codigo) return null

  const lines = codigo.split('\n')
  const displayLines = expanded ? lines : lines.slice(0, 20)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = codigo
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-[#0a0f1e] rounded-lg border border-white/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-white/40" />
          <span className="text-xs text-white/40">{linguagem}</span>
        </div>
        <div className="flex items-center gap-2">
          {lines.length > 20 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {expanded ? 'Ver menos' : 'Ver mais'}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-xs font-mono text-white/70 leading-relaxed">
          {displayLines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-white/20 w-6 text-right mr-3 select-none">{i + 1}</span>
              <span>{line || ' '}</span>
            </div>
          ))}
          {!expanded && lines.length > 20 && (
            <div className="text-white/20 text-center mt-2">... {lines.length - 20} linhas ocultas</div>
          )}
        </pre>
      </div>
    </div>
  )
}

// ─── PÁGINA PRINCIPAL ───
export default function ProjetosModuloPage() {
  const params = useParams()
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [moduloInfo, setModuloInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Projeto | null>(null)
  const [activeCard, setActiveCard] = useState<'sobre' | 'codigo' | 'link'>('sobre')

  const moduloId = (params?.modulo as string) || 'fundamentos'

  useEffect(() => {
    const part = parts.find(p => p.id === moduloId)
    if (part) setModuloInfo(part)

    let mounted = true
    setLoading(true)

    import('@/lib/projetos').then(async ({ getProjetosDoModulo }) => {
      const lista = await getProjetosDoModulo(moduloId)
      if (mounted) {
        setProjetos(lista)
        setLoading(false)
      }
    }).catch(err => {
      console.error('Erro ao carregar projetos:', err)
      if (mounted) setLoading(false)
    })

    return () => { mounted = false }
  }, [moduloId])

  const colors = CORES_MODULO[moduloId] || CORES_MODULO.fundamentos

  // ─── MÓDULO NÃO ENCONTRADO ───
  if (!moduloInfo) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white/80 mb-2">Módulo não encontrado</h1>
          <Link href="/" className="text-white/40 hover:text-white transition-colors">Voltar ao início</Link>
        </div>
      </div>
    )
  }

  // ─── LOADING ───
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e]">
        <Header progress={0} temaId={moduloId} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: colors.primary }} />
              <span className="text-sm text-white/40">Carregando projetos...</span>
            </div>
          </div>
        </div>
        <Footer temaId={moduloId} />
      </div>
    )
  }

  // ─── SEM PROJETOS ───
  if (projetos.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0f1e]">
        <Header progress={0} temaId={moduloId} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <Link href={`/${moduloId}`} className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white/60 mb-2">Nenhum projeto disponível</h2>
            <p className="text-white/40">Este módulo ainda não possui projetos cadastrados.</p>
          </div>
        </div>
        <Footer temaId={moduloId} />
      </div>
    )
  }

  // ─── RENDER DO PROJETO SELECIONADO ───
  const renderProjetoDetalhes = () => {
    if (!selectedProject) {
      return (
        <div className="flex items-center justify-center h-96 text-white/30">
          <div className="text-center">
            <div className="text-4xl mb-4">👆</div>
            <p>Selecione um projeto para ver os detalhes</p>
          </div>
        </div>
      )
    }

    const cardsDisponiveis: Array<{ id: 'sobre' | 'codigo' | 'link'; label: string; icon: string }> = [
      { id: 'sobre', label: '📖 Sobre', icon: '📖' },
    ]
    if (selectedProject.codigo) {
      cardsDisponiveis.push({ id: 'codigo', label: '💻 Código', icon: '💻' })
    }
    if (selectedProject.link) {
      cardsDisponiveis.push({ id: 'link', label: '🔗 Link', icon: '🔗' })
    }

    const gridCols = cardsDisponiveis.length === 3 ? 'grid-cols-3' : cardsDisponiveis.length === 2 ? 'grid-cols-2' : 'grid-cols-1'

    return (
      <div className="space-y-6">
        {/* ─── CARDS DE NAVEGAÇÃO ─── */}
        <div className={`grid ${gridCols} gap-2`}>
          {cardsDisponiveis.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={`p-3 rounded-lg text-center transition-all ${
                activeCard === card.id
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/5 border border-white/5 hover:bg-white/10'
              }`}
              style={activeCard === card.id ? { borderColor: colors.primary } : {}}
            >
              <div className="text-lg">{card.icon}</div>
              <div className="text-[10px] text-white/50 mt-1">{card.label}</div>
            </button>
          ))}
        </div>

        {/* ─── CONTEÚDO DO CARD ATIVO ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white/5 rounded-xl border border-white/10 p-6 min-h-75"
          >
            {activeCard === 'sobre' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📖</span> Sobre o Projeto
                </h3>
                <div className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedProject.sobre || selectedProject.description}
                </div>
                {selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeCard === 'codigo' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>💻</span> Código do Projeto
                </h3>
                <CodigoCard codigo={selectedProject.codigo} linguagem={selectedProject.linguagem} />
                {selectedProject.repo && (
                  <div className="flex gap-2">
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors text-xs"
                    >
                      <GithubIcon size={14} /> Ver no GitHub
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeCard === 'link' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔗</span> Link do Projeto
                </h3>
                <p className="text-white/60 text-sm">
                  Clique no botão abaixo para abrir o projeto em uma nova aba.
                </p>
                <div
                  className="flex items-center gap-4 p-4 rounded-lg border"
                  style={{ background: `${colors.primary}10`, borderColor: `${colors.primary}30` }}
                >
                  <div className="text-3xl"><Globe size={28} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80">Projeto ao vivo</p>
                    <p className="text-xs text-white/40 truncate">{selectedProject.link}</p>
                  </div>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:scale-105 text-sm font-medium shrink-0"
                    style={{ background: colors.primary }}
                  >
                    <ExternalLink size={16} /> Abrir
                  </a>
                </div>
                <div className="bg-blue-500/10 rounded-lg border border-blue-500/20 p-4">
                  <p className="text-xs text-white/40 flex items-start gap-2">
                    <AlertCircle size={14} className="shrink-0 mt-0.5 text-blue-400" />
                    <span>O link será aberto em uma nova aba do seu navegador.</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ─── STATUS E PROGRESSO ─── */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <StatusBadge status={selectedProject.status} />
            {selectedProject.tech.length > 0 && (
              <span className="text-[10px] text-white/30">{selectedProject.tech.join(' • ')}</span>
            )}
          </div>
          {selectedProject.progress !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30">Progresso</span>
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${selectedProject.progress}%`, background: colors.primary }}
                />
              </div>
              <span className="text-[10px] text-white/40">{selectedProject.progress}%</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Header progress={0} temaId={moduloId} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* ─── CABEÇALHO ─── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href={`/${moduloId}`} className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} /> Voltar para {moduloInfo.title}
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
              <span className="text-3xl">{moduloInfo.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Projetos</h1>
              <p className="text-white/40 text-sm">{moduloInfo.title} • {projetos.length} projetos</p>
            </div>
          </div>
        </motion.div>

        {/* ─── LISTA + DETALHES ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2">
            {projetos.map((projeto) => (
              <motion.button
                key={projeto.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
                onClick={() => {
                  setSelectedProject(projeto)
                  setActiveCard('sobre')
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedProject?.id === projeto.id
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
                style={selectedProject?.id === projeto.id ? { borderColor: colors.primary } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getIconeProjeto(projeto.id)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{projeto.title}</span>
                      <StatusBadge status={projeto.status} />
                    </div>
                    <p className="text-xs text-white/40 truncate">{projeto.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-white/20" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {renderProjetoDetalhes()}
          </div>
        </div>
      </div>

      <Footer temaId={moduloId} />
    </div>
  )
}