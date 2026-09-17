// src/components/Footer.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaGithub,
  FaHeart
} from 'react-icons/fa'

// ─── CORES DOS TEMAS ───
const CORES_TEMA_FOOTER: Record<string, { principal: string; secundaria: string; escura: string }> = {
  fundamentos: { principal: '#8b7355', secundaria: '#a08b7a', escura: '#4a3b2a' },
  matematica: { principal: '#2557d0', secundaria: '#5792ff', escura: '#0e036d' },
  algoritmos: { principal: '#00ff41', secundaria: '#4ade80', escura: '#14532d' },
  ml: { principal: '#a78bfa', secundaria: '#c4b5fd', escura: '#4c1d95' },
  federado: { principal: '#dc2626', secundaria: '#f87171', escura: '#7f1d1d' },
  database: { principal: '#22c55e', secundaria: '#4ade80', escura: '#14532d' },
  redes: { principal: '#06b6d4', secundaria: '#22d3ee', escura: '#164e63' },
  arquitetura: { principal: '#ea580c', secundaria: '#f97316', escura: '#7c2d12' },
  engenharia: { principal: '#ec4899', secundaria: '#f472b6', escura: '#831843' },
  'engenharia-dados': { principal: '#00d4ff', secundaria: '#33ddff', escura: '#0a2a3a' },
}

// ─── NOMES DOS TEMAS ───
const NOMES_TEMA: Record<string, string> = {
  fundamentos: 'Fundamentos de Computação',
  matematica: 'Matemática',
  algoritmos: 'Algoritmos',
  ml: 'Machine Learning',
  federado: 'Federado e Privacidade',
  database: 'Banco de Dados',
  redes: 'Redes e Sistemas Distribuídos',
  arquitetura: 'Arquitetura de Computadores',
  engenharia: 'Engenharia de Software',
  'engenharia-dados': 'Engenharia de Dados e Data Science',
}

interface FooterProps {
  temaId?: string
}

export default function Footer({ temaId = 'fundamentos' }: FooterProps) {
  const pathname = usePathname()
  
  const isAulaPage = pathname?.startsWith('/aula/')
  if (!isAulaPage) return null

  let currentTheme = temaId || 'fundamentos'
  
  if (!temaId) {
    if (pathname?.includes('/fundamentos/')) currentTheme = 'fundamentos'
    else if (pathname?.includes('/matematica/')) currentTheme = 'matematica'
    else if (pathname?.includes('/algoritmos/')) currentTheme = 'algoritmos'
    else if (pathname?.includes('/machine-learning/')) currentTheme = 'ml'
    else if (pathname?.includes('/federado/')) currentTheme = 'federado'
    else if (pathname?.includes('/database/')) currentTheme = 'database'
    else if (pathname?.includes('/redes/')) currentTheme = 'redes'
    else if (pathname?.includes('/arquitetura/')) currentTheme = 'arquitetura'
    else if (pathname?.includes('/engenharia/')) currentTheme = 'engenharia'
    else if (pathname?.includes('/engenharia-dados/')) currentTheme = 'engenharia-dados'
  }

  const cores = CORES_TEMA_FOOTER[currentTheme] || CORES_TEMA_FOOTER['fundamentos']
  const nomeTema = NOMES_TEMA[currentTheme] || 'Doctorate'

  return (
    <footer 
      className="border-t border-white/5 mt-auto"
      style={{ 
        background: `linear-gradient(135deg, ${cores.escura}, ${cores.principal})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8 border-b border-white/5">
          
          {/* COLUNA 1: MARCA */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(to right, #f5f5dc, #e8e0c8)`,
                }}
              >
                <span className="text-base font-black text-[#1a1a1a]">T</span>
              </div>
              <div>
                <span className="font-bold text-[#f5f5dc] text-sm tracking-tight">
                  TeoScript <span className="text-[#fbbf24]">Labs</span>
                </span>
                <span className="block text-[10px] font-medium text-[#f5f5dc]/50 tracking-[0.2em] uppercase">
                  Doctorate · {nomeTema}
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#f5f5dc]/60 leading-relaxed max-w-xs">
              Laboratório de estudo para o doutoramento. 
              Explorando {nomeTema} para Aprendizado Federado Robusto.
            </p>
            <div className="flex gap-2 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#f5f5dc]/40 hover:bg-[#fbbf24] hover:text-[#1a1a1a] transition-all hover:-translate-y-0.5">
                <FaFacebook size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#f5f5dc]/40 hover:bg-[#fbbf24] hover:text-[#1a1a1a] transition-all hover:-translate-y-0.5">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#f5f5dc]/40 hover:bg-[#fbbf24] hover:text-[#1a1a1a] transition-all hover:-translate-y-0.5">
                <FaYoutube size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#f5f5dc]/40 hover:bg-[#fbbf24] hover:text-[#1a1a1a] transition-all hover:-translate-y-0.5">
                <FaLinkedin size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#f5f5dc]/40 hover:bg-[#fbbf24] hover:text-[#1a1a1a] transition-all hover:-translate-y-0.5">
                <FaGithub size={15} />
              </a>
            </div>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-semibold text-[#f5f5dc]/50 uppercase tracking-wider mb-4">
              🧭 Navegação
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              <Link href="/" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Início
              </Link>
              <Link href="/fundamentos" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Fundamentos
              </Link>
              <Link href="/matematica" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Matemática
              </Link>
              <Link href="/algoritmos" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Algoritmos
              </Link>
              <Link href="/ml" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Machine Learning
              </Link>
              <Link href="/federado" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Federado
              </Link>
              <Link href="/database" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Banco de Dados
              </Link>
              <Link href="/redes" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Redes
              </Link>
              <Link href="/arquitetura" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Arquitetura
              </Link>
              <Link href="/engenharia" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Engenharia
              </Link>
              <Link href="/engenharia-dados" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Engenharia de Dados
              </Link>
            </div>
          </div>

          {/* COLUNA 3: SUPORTE */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-semibold text-[#f5f5dc]/50 uppercase tracking-wider mb-4">
              🎯 Suporte
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              <a href="#" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                FAQ
              </a>
              <a href="#" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Termos
              </a>
              <a href="#contato" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Fale Conosco
              </a>
              <a href="#sobre" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-sm text-[#f5f5dc]/40 hover:text-[#fbbf24] transition-colors">
                Contato
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-xs text-[#f5f5dc]/30">
          <span>&copy; 2026 TeoScript Labs. Todos os direitos reservados.</span>
          <span className="flex items-center gap-1">
            Feito com <FaHeart size={12} className="text-[#fbbf24] animate-pulse" /> para a educação angolana
          </span>
        </div>
      </div>
    </footer>
  )
}