// src/components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, BookOpen, FolderOpen, LogIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { parts } from '@/content/doctorate'

// ─── PALETAS POR TEMA ───
const PALETAS: Record<string, { principal: string; fundo: string; fundoClaro: string; texto: string; secundaria: string; borda: string }> = {
  fundamentos: { 
    principal: '#8b7355', 
    secundaria: '#a08b7a',
    fundo: '#1a140f', 
    fundoClaro: '#f5f0e8',
    texto: '#e8d5b7',
    borda: 'rgba(139, 115, 85, 0.2)'
  },
  matematica: { 
    principal: '#2557d0', 
    secundaria: '#5792ff',
    fundo: '#0a1a3a', 
    fundoClaro: '#f0f4ff',
    texto: '#1a3a8a',
    borda: 'rgba(37, 87, 208, 0.2)'
  },
  algoritmos: { 
    principal: '#00ff41', 
    secundaria: '#4ade80',
    fundo: '#0a1a0a', 
    fundoClaro: '#f0fff0',
    texto: '#4ade80',
    borda: 'rgba(0, 255, 65, 0.2)'
  },
  ml: { 
    principal: '#a78bfa', 
    secundaria: '#c4b5fd',
    fundo: '#1a0a2a', 
    fundoClaro: '#f5f0ff',
    texto: '#c4b5fd',
    borda: 'rgba(167, 139, 250, 0.2)'
  },
  'ml-inter': { 
    principal: '#6d28d9',    
    secundaria: '#8b5cf6',  
    fundo: '#0a0515',         
    fundoClaro: '#f0ebff',   
    texto: '#c4b5fd',   
    borda: 'rgba(109, 40, 217, 0.2)'
  },
  'ml-adv': { 
    principal: '#4c1d95',      
    secundaria: '#6d28d9', 
    fundo: '#050510',          
    fundoClaro: '#e8e0f5', 
    texto: '#8b5cf6',   
    borda: 'rgba(76, 29, 149, 0.2)'  
  },
  federado: { 
    principal: '#dc2626', 
    secundaria: '#f87171',
    fundo: '#2a0a0a', 
    fundoClaro: '#fff0f0',
    texto: '#fca5a5',
    borda: 'rgba(220, 38, 38, 0.2)'
  },
  database: { 
    principal: '#22c55e', 
    secundaria: '#4ade80',
    fundo: '#0a1a0a', 
    fundoClaro: '#f0fff0',
    texto: '#86efac',
    borda: 'rgba(34, 197, 94, 0.2)'
  },
  redes: { 
    principal: '#06b6d4', 
    secundaria: '#22d3ee',
    fundo: '#0a1a1a', 
    fundoClaro: '#f0faff',
    texto: '#67e8f9',
    borda: 'rgba(6, 182, 212, 0.2)'
  },
  rede: { 
    principal: '#0d9488', 
    secundaria: '#14b8a6',
    fundo: '#0a1a1a', 
    fundoClaro: '#f0faff',
    texto: '#5eead4',
    borda: 'rgba(13, 148, 136, 0.2)'
  },
  arquitetura: { 
    principal: '#ea580c', 
    secundaria: '#f97316',
    fundo: '#1a0a05', 
    fundoClaro: '#fff5f0',
    texto: '#fdba74',
    borda: 'rgba(234, 88, 12, 0.2)'
  },
  engenharia: { 
    principal: '#ec4899', 
    secundaria: '#f472b6',
    fundo: '#1a0a15', 
    fundoClaro: '#fff0f5',
    texto: '#f9a8d4',
    borda: 'rgba(236, 72, 153, 0.2)'
  },
  'engenharia-dados': { 
    principal: '#00d4ff', 
    secundaria: '#33ddff',
    fundo: '#0a0e27', 
    fundoClaro: '#f0faff',
    texto: '#67e8f9',
    borda: 'rgba(0, 212, 255, 0.2)'
  },
}

// ─── TEMA PADRÃO ───
const TEMA_PADRAO = {
  principal: '#64748b',
  secundaria: '#94a3b8',
  fundo: '#0a0f1e',
  fundoClaro: '#f1f5f9',
  texto: '#e2e8f0',
  borda: 'rgba(255,255,255,0.05)'
}

// ─── MAPEAMENTO IDs PARA ROTAS ───
const ID_PARA_ROTA: Record<string, string> = {
  fundamentos: 'fundamentos',
  matematica: 'matematica',
  algoritmos: 'algoritmos',
  ml: 'machine-learning',
  'ml-inter': 'machine-learning-intermediario',
  'ml-adv': 'machine-learning-avancado',
  federado: 'federado',
  database: 'database',
  redes: 'redes',
  rede: 'rede',
  arquitetura: 'arquitetura',
  engenharia: 'engenharia',
  'engenharia-dados': 'engenharia-dados',
}

// ─── TEMAS FILTRADOS ───
const TEMAS_FILTRADOS = parts.filter((p) =>
  ['fundamentos', 'matematica', 'algoritmos', 'ml', "ml-inter", "ml-adv", 'federado', 'database', 'redes', 'rede', 'arquitetura', 'engenharia', 'engenharia-dados'].includes(p.id)
)

interface HeaderProps {
  progress?: number
  temaId?: string
  references?: any[]
}

// ─── FUNÇÃO PARA FORMATAR REFERÊNCIA (APENAS AUTOR + TÍTULO) ───
const formatReferenceShort = (ref: any) => {
  if (!ref) return 'Referência inválida'
  
  // CASO 1: Objeto estruturado com author e title
  if (ref.author && ref.title) {
    return `${ref.author}. ${ref.title}`
  }
  
  // CASO 2: Objeto com _raw (extraído do corpo do texto)
  if (ref._raw) {
    return ref._raw.length > 80 ? ref._raw.slice(0, 80) + '...' : ref._raw
  }
  
  // CASO 3: É uma string simples
  if (typeof ref === 'string') {
    return ref
  }
  
  // Fallback
  return JSON.stringify(ref)
}

// ─── FUNÇÃO PARA FORMATAR REFERÊNCIA COMPLETA (HOVER) ───
const formatReferenceFull = (ref: any) => {
  if (!ref) return 'Referência inválida'
  
  if (ref.author && ref.title) {
    let result = `${ref.author}. (${ref.year || 's.d.'}). ${ref.title}`
    if (ref.journal) result += `. ${ref.journal}`
    if (ref.publisher) result += `. ${ref.publisher}`
    if (ref.edition) result += `. ${ref.edition} ed.`
    if (ref.doi) result += ` DOI: ${ref.doi}`
    if (ref.url) result += ` 🔗 ${ref.url}`
    return result
  }
  
  if (ref._raw) return ref._raw
  if (typeof ref === 'string') return ref
  
  return JSON.stringify(ref)
}

export default function Header({ progress = 0, temaId, references = [] }: HeaderProps) {
  const pathname = usePathname()
  const [referenciaAberto, setReferenciaAberto] = useState(false)
  const [hoverPausa, setHoverPausa] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // ─── DETECTA O TEMA CORRETAMENTE ───
  let temaAtual = temaId || ''
  
  if (!temaAtual) {
    if (pathname?.startsWith('/aula/')) {
      const parts = pathname.split('/')
      temaAtual = parts[2] || ''
    } else {
      temaAtual = pathname?.split('/')[1] || ''
    }
  }

  const paleta = PALETAS[temaAtual] || TEMA_PADRAO
  const corPrincipal = paleta.principal
  const corFundo = paleta.fundo
  const corBorda = paleta.borda

  // ─── DUPLICA OS TEMAS PARA LOOP INFINITO ───
  const temasDuplicados = [...TEMAS_FILTRADOS, ...TEMAS_FILTRADOS, ...TEMAS_FILTRADOS]

  // ─── ANIMAÇÃO AUTOMÁTICA ───
  useEffect(() => {
    const animate = () => {
      if (!hoverPausa) {
        setScrollPosition((prev) => {
          const newPos = prev + 0.5
          if (carouselRef.current) {
            const maxScroll = carouselRef.current.scrollWidth / 3
            if (newPos >= maxScroll) {
              return 0
            }
          }
          return newPos
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [hoverPausa])

  // ─── SINCORNIZA SCROLL ───
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition
    }
  }, [scrollPosition])

  // ─── NAVEGAÇÃO MANUAL ───
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8
      const newScroll = direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount
      carouselRef.current.scrollTo({ left: newScroll, behavior: 'smooth' })
    }
  }

  return (
    <header 
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{ 
        background: corFundo,
        borderBottom: `1px solid ${corBorda}`
      }}
    >
      
      {/* ─── LINHA 1 ─── */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-12 md:h-14 gap-4">
          
          {/* ─── LOGO ─── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
              style={{ background: corPrincipal }}
            >
              <span className="text-sm font-black text-white">T</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-white text-xs tracking-tight">
                TeoScript <span className="text-[#fbbf24]">Labs</span>
              </span>
            </div>
          </Link>

          {/* ─── REFERÊNCIA ─── */}
          <div className="relative">
            <button
              onClick={() => setReferenciaAberto(!referenciaAberto)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <BookOpen size={14} />
              <span className="hidden md:inline">Documentação</span>
              <ChevronDown size={12} className={`transition-transform ${referenciaAberto ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {referenciaAberto && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 w-80 md:w-96 rounded-xl border border-white/10 bg-[#111827] shadow-xl py-2 z-50 max-h-96 overflow-y-auto"
                >
                  <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/60">📚 Referências Bibliográficas</span>
                    <span className="text-xs text-white/30">({references.length})</span>
                  </div>
                  
                  {references && references.length > 0 ? (
                    <div className="p-3 space-y-2">
                      {references.map((ref: any, idx: number) => {
                        const short = formatReferenceShort(ref)
                        const full = formatReferenceFull(ref)
                        
                        return (
                          <div 
                            key={idx} 
                            className="group p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default relative"
                          >
                            {/* ─── TEXTO CURTO (SEMPRE VISÍVEL) ─── */}
                            <p className="text-xs text-white/80 leading-relaxed">
                              {short}
                            </p>
                            
                            {/* ─── TEXTO COMPLETO (APARECE NO HOVER) ─── */}
                            <div className="absolute left-0 top-full mt-2 w-full max-w-sm p-3 rounded-lg bg-[#1a1a2e] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                              <p className="text-[11px] text-white/90 leading-relaxed">
                                {full}
                              </p>
                              <div className="absolute -top-1 left-4 w-2 h-2 rotate-45 bg-[#1a1a2e] border-l border-t border-white/10" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-white/40">
                      <p>Nenhuma referência disponível para esta aula.</p>
                    </div>
                  )}
                  
                  <div className="px-4 py-2 border-t border-white/5">
                    <button
                      onClick={() => setReferenciaAberto(false)}
                      className="text-xs text-white/30 hover:text-white/60 transition-colors w-full text-center"
                    >
                      Fechar ✕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── PROJETOS ─── */}
          <Link
            href="/projetos"
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FolderOpen size={14} />
            <span className="hidden md:inline">Projetos</span>
          </Link>

          {/* ─── BARRA DE PROGRESSO ─── */}
          <div className="flex-1 max-w-xs hidden md:flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, ${corPrincipal}, #fbbf24)`,
                }}
              />
            </div>
            <span className="text-[10px] text-white/40 font-mono">{progress}%</span>
          </div>

          {/* ─── ENTRAR ─── */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-white transition-all hover:scale-105 shrink-0"
            style={{ background: corPrincipal }}
          >
            <LogIn size={14} />
            <span className="hidden sm:inline">Entrar</span>
          </Link>
        </div>
      </div>

      {/* ─── LINHA 2: CARROSSEL ─── */}
      <div 
        className="border-t transition-colors duration-300 relative"
        style={{ 
          borderColor: corBorda,
          background: corFundo,
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          
          {/* ─── SETA ESQUERDA ─── */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-[#0a0f1e]/80 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
            style={{ borderColor: corBorda }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* ─── CARROSSEL ─── */}
          <div
            ref={carouselRef}
            className="overflow-x-hidden scroll-smooth py-2 px-6"
            onMouseEnter={() => setHoverPausa(true)}
            onMouseLeave={() => setHoverPausa(false)}
          >
            <div className="flex gap-1 min-w-max" style={{ width: 'fit-content' }}>
              {temasDuplicados.map((part, index) => {
                const rota = ID_PARA_ROTA[part.id]
                const cor = PALETAS[part.id]?.principal || '#64748b'
                const isActive = pathname?.startsWith(`/${rota}`) || pathname?.includes(`/${rota}/`)

                return (
                  <Link
                    key={`${part.id}-${index}`}
                    href={`/${rota}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                    style={isActive ? { borderBottom: `2px solid ${cor}` } : {}}
                  >
                    <span className="text-sm">{part.icon}</span>
                    <span className="hidden sm:inline">{part.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* ─── SETA DIREITA ─── */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-[#0a0f1e]/80 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
            style={{ borderColor: corBorda }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}