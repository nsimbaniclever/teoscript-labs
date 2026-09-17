// src/app/aula/[...slug]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { ArrowLeft, ChevronRight, ChevronDown, Home, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { parts, type Part, type Section, type Topic, type Aula } from '@/content/doctorate'
import Header from '@/components/Header'
import { ResizeHandle } from '@/components/ResizeHandle'
import Footer from '@/components/Footer'
import MermaidRenderer from '@/components/MermaidRenderer'

// ─── CORES POR MATÉRIA ───
const COLORS: Record<string, { primary: string; secondary: string; dark: string; gradient: string; light: string; bg: string }> = {
  fundamentos: { primary: '#8b7355', secondary: '#6d5a42', dark: '#1a140f', gradient: 'linear-gradient(135deg, #8b7355, #6d5a42)', light: '#8b735520', bg: '#f5f0e8' },
  matematica: { primary: '#2557d0', secondary: '#1a3f8a', dark: '#0a1a3a', gradient: 'linear-gradient(135deg, #2557d0, #1a3f8a)', light: '#2557d020', bg: '#f0f4ff' },
  algoritmos: { primary: '#00ff41', secondary: '#00cc33', dark: '#0a1a0a', gradient: 'linear-gradient(135deg, #00ff41, #00cc33)', light: '#00ff4120', bg: '#f0fff0' },
  'engenharia-dados': { primary: '#00d4ff', secondary: '#00bbdd', dark: '#0a0e27', gradient: 'linear-gradient(135deg, #00d4ff, #7c3aed)', light: '#00d4ff20', bg: '#f0faff' },
  ml: { primary: '#a78bfa', secondary: '#7c3aed', dark: '#1a0a2a', gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)', light: '#a78bfa20', bg: '#f5f0ff' },
  'ml-inter': { primary: '#6d28d9', secondary: '#5b21b6', dark: '#0a0515', gradient: 'linear-gradient(135deg, #6d28d9, #5b21b6)', light: '#6d28d920', bg: '#f0ebff' },
  'ml-adv': { primary: '#4c1d95', secondary: '#3b0f7a', dark: '#050510', gradient: 'linear-gradient(135deg, #4c1d95, #3b0f7a)', light: '#4c1d9520', bg: '#e8e0f5' },
  federado: { primary: '#dc2626', secondary: '#b91c1c', dark: '#2a0a0a', gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)', light: '#dc262620', bg: '#fff0f0' },
  database: { primary: '#22c55e', secondary: '#16a34a', dark: '#0a1a0a', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', light: '#22c55e20', bg: '#f0fff0' },
  redes: { primary: '#06b6d4', secondary: '#0891b2', dark: '#0a0f1a', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', light: '#06b6d420', bg: '#f0faff' },
  rede: { primary: '#0d9488', secondary: '#0f766e', dark: '#0a0f1a', gradient: 'linear-gradient(135deg, #0d9488, #0f766e)', light: '#0d948820', bg: '#f0faff' },
  arquitetura: { primary: '#ea580c', secondary: '#c2410c', dark: '#1a0a05', gradient: 'linear-gradient(135deg, #ea580c, #c2410c)', light: '#ea580c20', bg: '#fff5f0' },
  engenharia: { primary: '#ec4899', secondary: '#db2777', dark: '#1a0a15', gradient: 'linear-gradient(135deg, #ec4899, #db2777)', light: '#ec489920', bg: '#fff0f5' },
}

// ─── ENCONTRA A AULA PELO SLUG ───
function encontrarAula(slug: string) {
  const cleanSlug = slug.replace(/\.mdx?$/i, '').replace(/\/$/, '')

  for (const part of parts) {
    for (const section of part.sections) {
      for (const topic of section.topics) {
        if (topic.aulas) {
          for (const aula of topic.aulas) {
            if (aula.slug === cleanSlug) {
              return { part, section, topic, aula }
            }
          }
        }
      }
    }
  }
  return null
}

// ─── ENCONTRA A PRÓXIMA/ANTERIOR AULA ───
function encontrarVizinhos(partId: string, currentSlug: string) {
  const part = parts.find(p => p.id === partId)
  if (!part) return { prev: null, next: null }

  const allAulas: { slug: string; title: string; topicId: string }[] = []
  for (const section of part.sections) {
    for (const topic of section.topics) {
      if (topic.aulas) {
        for (const aula of topic.aulas) {
          allAulas.push({ slug: aula.slug, title: aula.nome, topicId: topic.id })
        }
      }
    }
  }

  const currentIndex = allAulas.findIndex(a => a.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? allAulas[currentIndex - 1] : null,
    next: currentIndex < allAulas.length - 1 ? allAulas[currentIndex + 1] : null
  }
}

// ─── COMPONENTE DE TÓPICOS (ESQUERDA) ───
function SidebarTopics({ part, currentSlug, colors }: { part: Part; currentSlug: string; colors: any }) {
  const [secoesAbertas, setSecoesAbertas] = useState<Record<string, boolean>>({})

  const toggleSecao = (id: string) => {
    setSecoesAbertas(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
        📚 {part.title}
      </h3>

      {part.sections.map((section: Section) => {
        const isOpen = secoesAbertas[section.id] !== false

        return (
          <div key={section.id} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSecao(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 transition-colors text-left"
            >
              <span className="text-xs font-medium text-white/70 truncate">{section.title}</span>
              <ChevronDown size={14} className={`text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-2 pb-2 space-y-0.5">
                    {section.topics.map((topic: Topic) => {
                      const isActive = topic.aulas?.some((a: Aula) => a.slug === currentSlug) || false
                      return (
                        <div key={topic.id} className="space-y-0.5">
                          <div className={`text-[10px] font-medium px-2 py-1 rounded ${isActive ? 'text-white' : 'text-white/40'}`}>
                            {topic.title}
                          </div>
                          {topic.aulas?.map((aula: Aula) => {
                            const isAulaActive = aula.slug === currentSlug
                            return (
                              <Link
                                key={aula.slug}
                                href={`/aula/${aula.slug}`}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10px] transition-all ${
                                  isAulaActive ? 'text-white font-medium' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                                }`}
                                style={isAulaActive ? { background: `${colors.primary}20`, borderLeft: `2px solid ${colors.primary}` } : {}}
                              >
                                <ChevronRightIcon size={10} className={isAulaActive ? 'text-[#fbbf24]' : 'text-white/20'} />
                                <span className="truncate">{aula.nome}</span>
                              </Link>
                            )
                          })}
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
  )
}

// ─── COMPONENTE DE NOTÍCIAS (DIREITA) ───
function SidebarRight() {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">
        📰 Destaques
      </h3>

      <div className="border border-white/10 rounded-lg p-4 bg-white/5">
        <div className="text-2xl mb-2">🔥</div>
        <h4 className="text-sm font-semibold text-white/80">Novidade!</h4>
        <p className="text-xs text-white/40 mt-1">Novos conteúdos de Aprendizado Federado adicionados.</p>
        <Link href="#" className="text-[10px] mt-2 inline-block hover:underline" style={{ color: '#fbbf24' }}>Saiba mais →</Link>
      </div>

      <div className="border border-white/10 rounded-lg p-4 bg-white/5">
        <div className="text-2xl mb-2">💡</div>
        <h4 className="text-sm font-semibold text-white/80">Dica do dia</h4>
        <p className="text-xs text-white/40 mt-1">Revise os conceitos de álgebra linear antes de avançar.</p>
      </div>

      <div className="border border-white/10 rounded-lg p-4 bg-white/5">
        <div className="text-2xl mb-2">📢</div>
        <h4 className="text-sm font-semibold text-white/80">Em breve</h4>
        <p className="text-xs text-white/40 mt-1">Nova seção de exercícios práticos em breve.</p>
      </div>
    </div>
  )
}

// ─── COMPONENTE PRINCIPAL ───
export default function AulaPage() {
  const params = useParams()
  const router = useRouter()
  const [mdxContent, setMdxContent] = useState<string | null>(null)
  const [frontmatter, setFrontmatter] = useState<Record<string, any>>({})
  const [references, setReferences] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mdxLoaded, setMdxLoaded] = useState(false)

  const [leftWidth, setLeftWidth] = useState(15)
  const [rightWidth, setRightWidth] = useState(15)

  const isMounted = useRef(true)
  const loadingRef = useRef(false)
  const mermaidContainerRef = useRef<HTMLDivElement>(null)

  const slugParam = params?.slug as string | string[] | undefined
  const slug = useMemo(() => {
    const raw = Array.isArray(slugParam) ? slugParam.join('/') : slugParam || ''
    return raw.replace(/\.mdx?$/i, '')
  }, [slugParam])

  const resultado = useMemo(() => {
    return encontrarAula(slug)
  }, [slug])

  const { progress, todasAulas, currentIndex } = useMemo(() => {
    let prog = 0
    let aulas: { slug: string; title: string }[] = []
    let idx = 0

    if (resultado) {
      const { part } = resultado
      for (const s of part.sections) {
        for (const t of s.topics) {
          if (t.aulas) {
            for (const a of t.aulas) {
              aulas.push({ slug: a.slug, title: a.nome })
            }
          }
        }
      }
      idx = aulas.findIndex(a => a.slug === slug)
      prog = aulas.length > 0 ? Math.round((idx + 1) / aulas.length * 100) : 0
    }

    return { progress: prog, todasAulas: aulas, currentIndex: idx }
  }, [resultado, slug])

  // ─── CARREGA O MDX ───
  useEffect(() => {
    isMounted.current = true

    async function loadMdx() {
      if (!resultado || !slug || loadingRef.current || !isMounted.current) return
      loadingRef.current = true
      setIsLoading(true)

      try {
        const { getMdxContent } = await import('@/lib/mdx')
        const content = await getMdxContent(slug)

        if (!isMounted.current) return

        if (content) {
          setMdxContent(content.content)
          setFrontmatter(content.frontmatter || {})
          setReferences(content.references || [])
          setMdxLoaded(true)
        } else {
          setMdxContent(null)
          setFrontmatter({})
          setReferences([])
          setMdxLoaded(false)
        }
      } catch (error) {
        if (isMounted.current) {
          console.error('❌ Erro ao carregar MDX:', error)
          setMdxContent(null)
          setFrontmatter({})
          setReferences([])
          setMdxLoaded(false)
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false)
          loadingRef.current = false
        }
      }
    }

    loadMdx()

    return () => {
      isMounted.current = false
    }
  }, [slug, resultado])

  // ─── FUNÇÕES DE RESIZE ───
  const handleLeftResize = useCallback((delta: number) => {
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    const deltaPercent = (delta / containerWidth) * 100

    setLeftWidth(prev => Math.min(Math.max(prev + deltaPercent, 8), 35))
  }, [])

  const handleRightResize = useCallback((delta: number) => {
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    const deltaPercent = (delta / containerWidth) * 100

    setRightWidth(prev => Math.min(Math.max(prev - deltaPercent, 8), 35))
  }, [])

  // ─── SE NÃO ENCONTROU ───
  if (!resultado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white/80 mb-2">Aula não encontrada</h1>
          <p className="text-white/40 text-sm mb-4">
            Slug: <code className="bg-white/10 px-2 py-1 rounded text-xs break-all">{slug || 'vazio'}</code>
          </p>
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Voltar
          </button>
        </div>
      </div>
    )
  }

  const { part, section, topic, aula } = resultado
  const colors = COLORS[part.id] || COLORS.fundamentos
  const { prev, next } = encontrarVizinhos(part.id, aula.slug)

  const navegarParaAula = useCallback((aulaData: { slug: string; title: string } | null) => {
    if (aulaData) {
      router.push(`/aula/${aulaData.slug}`)
    }
  }, [router])

  // ─── RENDERIZA O CONTEÚDO ───
  function renderMdxContent() {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: colors.primary }}></div>
            <span className="text-sm text-[#4b5872]">Carregando conteúdo...</span>
          </div>
        </div>
      )
    }

    if (mdxLoaded && mdxContent) {
      return (
        <>
          <MermaidRenderer html={mdxContent} />
          <div
            ref={mermaidContainerRef}
            className="mdx-content"
            dangerouslySetInnerHTML={{ __html: mdxContent }}
          />
        </>
      )
    }

    // Fallback
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
            <span>📌</span> Conceitos desta aula
          </h3>
          <div className="space-y-2">
            {topic.subs.map((sub: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border-l-2" style={{ borderLeftColor: colors.primary, background: `${colors.primary}08` }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${colors.primary}20` }}>
                  <span className="text-xs font-bold" style={{ color: colors.primary }}>{idx + 1}</span>
                </div>
                <span className="text-sm text-[#1a1a2e]">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#d9d5c8]" />

        <div className="rounded-lg overflow-hidden border border-[#d9d5c8]">
          <div className="px-4 py-2 text-xs font-medium text-white flex items-center gap-2" style={{ background: colors.primary }}>
            <span>📖</span> O que estudar
          </div>
          <div className="p-4 text-sm text-[#1a1a2e] leading-relaxed bg-white/50">
            <p>{aula.estudo}</p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-[#d9d5c8]">
          <div className="px-4 py-2 text-xs font-medium text-white flex items-center gap-2" style={{ background: colors.primary }}>
            <span>🎯</span> Aplicação na Tese
          </div>
          <div className="p-4 text-sm text-[#1a1a2e] leading-relaxed bg-white/50">
            <p>{aula.tese}</p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-[#d9d5c8]">
          <div className="px-4 py-2 text-xs font-medium text-white flex items-center gap-2" style={{ background: colors.primary }}>
            <span>💻</span> Projeto prático
          </div>
          <div className="p-4 text-sm text-[#1a1a2e] overflow-x-auto bg-white/50">
            <p>{aula.projeto}</p>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
          <p className="font-medium flex items-center gap-2">
            <span>ℹ️</span> Conteúdo completo não encontrado
          </p>
          <p className="mt-1 text-xs text-yellow-700">
            O arquivo MDX para esta aula não foi encontrado. Mostrando dados do arquivo de configuração.
          </p>
        </div>
      </div>
    )
  }

  const centerWidth = 100 - leftWidth - rightWidth

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Header progress={progress} temaId={part.id} references={references} />

      <div className="max-w-full px-4 md:px-6 py-6">
        <div className="flex gap-0 relative">

          <aside
            className="hidden lg:block overflow-y-auto max-h-[calc(100vh-120px)] sticky top-24 transition-all duration-75 rounded-l-xl"
            style={{ width: `${leftWidth}%`, minWidth: '120px', background: `linear-gradient(180deg, ${colors.primary}15, ${colors.primary}60)`, borderRight: `1px solid ${colors.primary}20`, padding: '1rem 0.5rem' }}
          >
            <SidebarTopics part={part} currentSlug={aula.slug} colors={colors} />
          </aside>

          <div className="hidden lg:block w-1 shrink-0 relative">
            <ResizeHandle onResize={handleLeftResize} direction="horizontal" className="w-full h-full" />
          </div>

          <main className="flex-1 min-w-0 transition-all duration-75" style={{ width: `${centerWidth}%` }}>
            <div
              className="rounded-xl p-6 md:p-8 shadow-lg min-h-125"
              style={{
                background: '#f5f0e8',
                border: `1px solid ${colors.primary}20`,
                ['--theme-primary']: colors.primary,
                ['--theme-secondary']: colors.secondary,
                ['--theme-light']: colors.light,
                ['--theme-dark']: colors.dark,
                ['--theme-text']: '#1a1a2e',
              } as React.CSSProperties}
            >
              {renderMdxContent()}

              <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#d9d5c8] mt-8">
                <button
                  onClick={() => navegarParaAula(prev)}
                  className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${prev ? 'hover:bg-white/20' : 'opacity-50 cursor-not-allowed'}`}
                  style={{ color: prev ? colors.primary : '#999' }}
                  disabled={!prev}
                >
                  <ArrowLeft size={16} /> Anterior
                </button>

                <span className="text-xs text-[#4b5872]">{currentIndex + 1} / {todasAulas.length}</span>

                <button
                  onClick={() => navegarParaAula(next)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-105 ${next ? '' : 'opacity-50 cursor-not-allowed'}`}
                  style={{ background: next ? colors.primary : '#999' }}
                  disabled={!next}
                >
                  Próximo <ChevronRight size={16} className="inline" />
                </button>
              </div>
            </div>
          </main>

          <div className="hidden lg:block w-1 shrink-0 relative">
            <ResizeHandle onResize={handleRightResize} direction="horizontal" className="w-full h-full" />
          </div>

          <aside
            className="hidden lg:block overflow-y-auto max-h-[calc(100vh-120px)] sticky top-24 transition-all duration-75 rounded-r-xl"
            style={{ width: `${rightWidth}%`, minWidth: '120px', background: `linear-gradient(180deg, ${colors.primary}60, ${colors.primary}15)`, borderLeft: `1px solid ${colors.primary}20`, padding: '1rem 0.5rem' }}
          >
            <SidebarRight />
          </aside>

        </div>
      </div>

      <Footer temaId={part.id} />
    </div>
  )
}