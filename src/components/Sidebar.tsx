// src/components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── MAPEAMENTO DE IDs PARA ROTAS ───
const ID_PARA_ROTA: Record<string, string> = {
  fundamentos: 'fundamentos',
  matematica: 'matematica',
  algoritmos: 'algoritmos',
  ml: 'machine-learning',
  federado: 'federado',
  database: 'database',
  redes: 'redes',
  arquitetura: 'arquitetura',
  engenharia: 'engenharia',
}

interface SidebarProps {
  temaId: string
  currentSlug?: string
}

export default function Sidebar({ temaId, currentSlug }: SidebarProps) {
  const pathname = usePathname()
  const part = parts.find(p => p.id === temaId)

  if (!part) return null

  // ─── COR DO TEMA PARA DESTAQUES ───
  const CORES_POR_TEMA: Record<string, string> = {
    fundamentos: '#8b7355',
    matematica: '#2557d0',
    algoritmos: '#00ff41',
    ml: '#a78bfa',
    federado: '#dc2626',
    database: '#22c55e',
    redes: '#06b6d4',
    arquitetura: '#ea580c',
    engenharia: '#ec4899',
  }

  const corDestaque = CORES_POR_TEMA[temaId] || '#fbbf24'

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0">
      <div className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        {/* ─── TÍTULO COM ÍCONE E COR ─── */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{part.icon}</span>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            {part.title}
          </h3>
        </div>

        {/* ─── LISTA DE SEÇÕES E TÓPICOS ─── */}
        <div className="space-y-3">
          {part.sections.map((section) => (
            <div key={section.id} className="space-y-1">
              {/* Nome da seção */}
              <div className="text-xs font-medium text-white/30 px-2 py-1 border-l-2 border-white/5">
                {section.title}
              </div>

              {/* Tópicos da seção */}
              {section.topics.map((topic) => {
                // ─── O SLUG PODE SER O PRÓPRIO ID OU UM SLUG PERSONALIZADO ───
                const slugParaLink = topic.slug || topic.id
                const isActive = slugParaLink === currentSlug || pathname?.includes(slugParaLink)

                return (
                  <Link
                    key={topic.id}
                    href={`/aula/${slugParaLink}`}
                    className={`block px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight
                        size={12}
                        className={isActive ? 'text-[#fbbf24]' : 'text-white/20'}
                        style={isActive ? { color: corDestaque } : {}}
                      />
                      <span>{topic.title}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* ─── BOTÃO DE VOLTAR ─── */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </aside>
  )
}