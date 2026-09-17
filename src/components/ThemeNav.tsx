// src/components/ThemeNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

// ─── CORES POR TEMA ───
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

// ─── FILTRA APENAS OS 9 TEMAS DO DOCTORATE ───
const TEMAS_FILTRADOS = parts.filter((p) =>
  ['fundamentos', 'matematica', 'algoritmos', 'ml', 'federado', 'database', 'redes', 'arquitetura', 'engenharia'].includes(p.id)
)

export default function ThemeNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-sm overflow-x-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center gap-1 py-2 min-w-max">
          {TEMAS_FILTRADOS.map((part) => {
            const rota = ID_PARA_ROTA[part.id]
            const cor = CORES_POR_TEMA[part.id] || '#64748b'
            const isActive = pathname?.startsWith(`/${rota}`)

            return (
              <Link
                key={part.id}
                href={`/${rota}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? { borderBottom: `2px solid ${cor}` } : {}}
              >
                <span>{part.icon}</span>
                <span className="hidden sm:inline">{part.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}