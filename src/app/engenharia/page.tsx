// src/app/engenharia/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink, GitBranch, Layers, Shield, Zap, Code, Settings, Workflow, Database, Server, Cpu } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── CORES DO TEMA (ROSA/ROXO) ───
const CORES = {
  primary: '#ec4899',
  secondary: '#a855f7',
  accent: '#f472b6',
  textPrimary: '#f9a8d4',
  textSecondary: '#d946ef',
  bg: '#0a0515',
  border: 'rgba(236, 72, 153, 0.2)',
  glow: 'rgba(236, 72, 153, 0.15)',
}

// ─── COMPONENTE DE FUNDO "CODE STREAM" ───
function CodeStreamBackground() {
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

    // ─── PARTÍCULAS DE CÓDIGO ───
    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      text: string
      size: number
      life: number
      maxLife: number
      opacity: number
    }[] = []

    const codeSnippets = [
      'class', 'interface', 'extends', 'implements', 'public', 'private',
      'protected', 'static', 'abstract', 'final', 'void', 'return',
      'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
      'try', 'catch', 'finally', 'throw', 'new', 'this', 'super',
      'import', 'export', 'default', 'from', 'function', 'const',
      'let', 'var', 'async', 'await', 'promise', 'callback',
      'type', 'enum', 'decorator', 'component', 'module',
    ]

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.8,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        size: 8 + Math.random() * 12,
        life: 100 + Math.random() * 150,
        maxLife: 250,
        opacity: 0.05 + Math.random() * 0.1,
      })
    }

    // ─── ÍCONES DE ENGENHARIA ───
    const icons = ['⚙️', '🔧', '🛠️', '📐', '📊', '🔨', '🏗️', '📋', '📝', '💻', '🧪', '🔬']
    const floatingIcons: {
      x: number
      y: number
      icon: string
      size: number
      phase: number
      speed: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      floatingIcons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        icon: icons[Math.floor(Math.random() * icons.length)],
        size: 24 + Math.random() * 20,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
      })
    }

    let animationId: number
    let time = 0

    const draw = () => {
      time++
      ctx.clearRect(0, 0, width, height)

      // ─── FUNDO GRADIENTE ───
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      )
      gradient.addColorStop(0, 'rgba(236, 72, 153, 0.03)')
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // ─── LINHAS DE CÓDIGO SUTIS ───
      ctx.globalAlpha = 0.03
      ctx.font = '10px monospace'
      ctx.fillStyle = CORES.primary
      for (let i = 0; i < 25; i++) {
        const y = (i / 25) * height
        const x = (time * (0.15 + i * 0.012) + i * 50) % width
        const code = ['// TODO', '// FIXME', '// DEBUG', '---'][i % 4]
        ctx.fillText(code, x, y)
      }
      ctx.globalAlpha = 1

      // ─── ÍCONES FLUTUANTES ───
      for (const icon of floatingIcons) {
        icon.phase += icon.speed
        icon.x += Math.sin(icon.phase) * 0.3
        icon.y += Math.cos(icon.phase * 0.7) * 0.3

        if (icon.x < -50) icon.x = width + 50
        if (icon.x > width + 50) icon.x = -50
        if (icon.y < -50) icon.y = height + 50
        if (icon.y > height + 50) icon.y = -50

        ctx.globalAlpha = 0.04 + 0.02 * Math.sin(icon.phase)
        ctx.font = `${icon.size}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = CORES.primary
        ctx.shadowColor = CORES.primary
        ctx.shadowBlur = 20
        ctx.fillText(icon.icon, icon.x, icon.y)
        ctx.shadowBlur = 0
      }

      // ─── PARTÍCULAS DE CÓDIGO ───
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.003
        p.life--

        const lifeRatio = p.life / p.maxLife
        const alpha = p.opacity * lifeRatio

        ctx.globalAlpha = alpha
        ctx.shadowColor = CORES.primary
        ctx.shadowBlur = 8
        ctx.font = `${p.size}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = CORES.primary
        ctx.fillText(p.text, p.x, p.y)
        ctx.shadowBlur = 0

        if (p.life <= 0) {
          particles.splice(i, 1)
        }
      }

      // ─── CRIA NOVAS PARTÍCULAS ───
      if (time % 3 === 0 && particles.length < 80) {
        const numNew = 1 + Math.floor(Math.random() * 3)
        for (let i = 0; i < numNew; i++) {
          const side = Math.floor(Math.random() * 4)
          let x: number, y: number
          switch(side) {
            case 0: x = Math.random() * width; y = -20; break
            case 1: x = width + 20; y = Math.random() * height; break
            case 2: x = Math.random() * width; y = height + 20; break
            case 3: x = -20; y = Math.random() * height; break
            default: x = Math.random() * width; y = Math.random() * height
          }
          particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
            size: 8 + Math.random() * 12,
            life: 150 + Math.random() * 150,
            maxLife: 300,
            opacity: 0.05 + Math.random() * 0.1,
          })
        }
      }

      // ─── TEXTO "⚡ ENGENHARIA" ───
      ctx.globalAlpha = 0.02 + 0.01 * Math.sin(time * 0.005)
      ctx.font = 'bold 50px monospace'
      ctx.fillStyle = CORES.primary
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const yPos = height * 0.3 + Math.sin(time * 0.004) * 30
      ctx.shadowColor = CORES.primary
      ctx.shadowBlur = 40
      ctx.fillText('⚡ ENGENHARIA ⚡', width * 0.5, yPos)
      ctx.shadowBlur = 0

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

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
        opacity: 0.8,
      }}
    />
  )
}

// ─── SÍMBOLOS FLUTUANTES ───
const FLOATING_SYMBOLS = [
  { icon: '⚙️', x: 5, y: 10, size: 32 },
  { icon: '🔧', x: 92, y: 15, size: 28 },
  { icon: '📐', x: 18, y: 85, size: 26 },
  { icon: '🛠️', x: 88, y: 80, size: 30 },
  { icon: '📊', x: 50, y: 5, size: 28 },
  { icon: '🏗️', x: 45, y: 92, size: 24 },
  { icon: '💻', x: 95, y: 45, size: 22 },
  { icon: '🧪', x: 3, y: 55, size: 24 },
  { icon: '🔬', x: 75, y: 25, size: 20 },
  { icon: '📋', x: 25, y: 50, size: 22 },
]

export default function EngenhariaPage() {
  const part = parts.find(p => p.id === 'engenharia')!
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

  // ─── EXTRAIR AULAS DIRETAMENTE DO DOCTORATE ───
  const getAulas = (topicId: string) => {
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

  const totalSubsubtemas = part.sections.reduce((acc, st) => acc + st.topics.length, 0)
  const totalTopicos = part.sections.reduce((acc, st) => acc + st.topics.reduce((s, t) => s + t.subs.length, 0), 0)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: CORES.bg }}>
      <CodeStreamBackground />

      {/* ─── SÍMBOLOS FLUTUANTES ESTÁTICOS ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {FLOATING_SYMBOLS.map((item, index) => (
          <motion.span
            key={index}
            className="absolute font-bold select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: item.size,
              color: CORES.primary,
              textShadow: `0 0 40px ${CORES.glow}`,
              opacity: 0.06,
            }}
            animate={{
              y: [0, -20, 0, 20, 0],
              x: [0, 15, -10, 20, 0],
              rotate: [0, 10, -5, 15, 0],
              scale: [1, 1.1, 0.9, 1.05, 1],
              opacity: [0.06, 0.12, 0.06, 0.10, 0.06],
            }}
            transition={{
              duration: 10 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
          >
            {item.icon}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* ─── TOPO: Voltar ─── */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white shadow-lg transition-all"
              style={{ background: `linear-gradient(135deg, ${CORES.primary}, ${CORES.secondary})` }}
            >
              <ArrowLeft size={16} /> Voltar
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${CORES.primary}, ${CORES.secondary})` }}
              animate={{
                boxShadow: [
                  `0 0 20px ${CORES.glow}`,
                  `0 0 50px ${CORES.glow}`,
                  `0 0 20px ${CORES.glow}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-base font-black text-white">T</span>
            </motion.div>
            <div>
              <span className="font-bold text-[#f9a8d4] text-sm tracking-tight">
                TeoScript <span className="text-[#f9a8d4]">Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-white/40 tracking-[0.25em] uppercase">
                Doctorate · Engenharia
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── CABEÇALHO ─── */}
        <motion.div
          className="relative bg-[#0a0515]/80 backdrop-blur-sm rounded-2xl border border-[#ec4899]/20 shadow-xl shadow-[#ec4899]/5 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.div
            className="h-1 w-full"
            style={{ background: 'linear-gradient(to right, #ec4899, #a855f7, #f472b6, #ec4899)' }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2 }}
          />

          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08), transparent)' }} />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent)' }} />

          <div className="px-6 md:px-12 py-8 md:py-12 text-center relative">
            <motion.div
              className="flex items-center justify-center gap-3 mb-2"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
            >
              <motion.span
                className="text-5xl md:text-6xl"
                animate={{
                  rotate: [0, 8, -8, 5, 0],
                  scale: [1, 1.15, 1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ⚙️
              </motion.span>
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-white"
                animate={{
                  textShadow: [
                    `0 0 20px ${CORES.glow}`,
                    `0 0 50px ${CORES.glow}`,
                    `0 0 20px ${CORES.glow}`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Engenharia de Software
              </motion.h1>
            </motion.div>

            <motion.div
              className="w-32 h-1 mx-auto rounded-full mb-4"
              style={{ background: `linear-gradient(to right, ${CORES.primary}, ${CORES.secondary})` }}
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <motion.p
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              🏗️ Construindo software com qualidade, metodologia e boas práticas
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-6 text-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {[
                { label: `${part.sections.length} temas`, icon: '📚' },
                { label: `${totalSubsubtemas} tópicos`, icon: '📖' },
                { label: `${totalTopicos} conceitos`, icon: '🎯' },
              ].map((item, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-1.5 bg-[#ec4899]/10 rounded-full border border-[#ec4899]/30 text-[#f9a8d4] flex items-center gap-1.5"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 30px ${CORES.glow}`,
                    borderColor: '#f9a8d4',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.icon}</span> {item.label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ─── SUBTEMAS ─── */}
        <div className="space-y-4">
          {part.sections.map((subtema, temaIndex) => {
            const isOpen = subtemasAbertos.includes(subtema.id)

            return (
              <motion.div
                key={subtema.id}
                className="bg-[#0a0515]/90 rounded-xl border border-[#ec4899]/10 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#ec4899]/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: temaIndex * 0.08 }}
              >
                <motion.button
                  onClick={() => toggleSubtema(subtema.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#ec4899]/5 transition-colors"
                  style={{
                    borderLeft: isOpen ? `4px solid ${CORES.primary}` : '4px solid transparent',
                    background: isOpen ? 'rgba(236,72,153,0.05)' : 'transparent',
                  }}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <motion.span
                      className="text-2xl"
                      animate={{
                        scale: isOpen ? [1, 1.4, 1] : 1,
                        rotate: isOpen ? [0, 25, -25, 0] : 0,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      🔧
                    </motion.span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white/90">
                        {subtema.title}
                      </h3>
                      <span className="text-sm text-white/30">
                        {subtema.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-white/30 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-white/30"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-6 border-t border-[#ec4899]/10 space-y-3 bg-[#0a0515]/50">
                        {subtema.topics.map((topico, subIndex) => {
                          const isSubOpen = subsubtemasAbertos.includes(topico.id)
                          const aulasData = getAulas(topico.id)

                          return (
                            <motion.div
                              key={topico.id}
                              className="border border-[#ec4899]/10 rounded-lg overflow-hidden hover:border-[#ec4899]/40 transition-all bg-[#0a0515]/90"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: subIndex * 0.06 }}
                            >
                              <motion.button
                                onClick={() => toggleSubsubtema(topico.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#ec4899]/5 transition-colors"
                                whileHover={{ x: 4 }}
                              >
                                <div className="flex items-center gap-3">
                                  <motion.span
                                    className="text-xl"
                                    animate={{
                                      rotate: isSubOpen ? 180 : 0,
                                      scale: isSubOpen ? 1.3 : 1,
                                    }}
                                    transition={{ duration: 0.4 }}
                                  >
                                    ⚡
                                  </motion.span>
                                  <span className="font-medium text-white/70">
                                    {topico.title}
                                  </span>
                                  <span className="text-xs text-white/30">
                                    {aulasData.length} aulas
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-white/30"
                                >
                                  <ChevronDown size={18} />
                                </motion.div>
                              </motion.button>

                              <AnimatePresence>
                                {isSubOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-4 border-t border-[#ec4899]/10 overflow-x-auto bg-[#0a0515]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: 'rgba(236,72,153,0.12)' }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#f9a8d4] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#f9a8d4] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#f9a8d4] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#f9a8d4] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulasData.map((aula, idx) => (
                                            <motion.tr
                                              key={idx}
                                              className={`border-b border-[#ec4899]/5 hover:bg-[#ec4899]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#ec4899]/5' : 'bg-transparent'
                                              }`}
                                              initial={{ opacity: 0, y: 10 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            >
                                              <td className="px-4 py-2 font-medium text-white/70 align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                  >
                                                    <Link
                                                      href={`/aula/${aula.slug}`}
                                                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-[#0a0515] whitespace-nowrap"
                                                      style={{ background: `linear-gradient(135deg, ${CORES.primary}, ${CORES.secondary})` }}
                                                    >
                                                      Ir <ExternalLink size={10} />
                                                    </Link>
                                                  </motion.div>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-white/40 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-white/40 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-white/40 align-top text-xs">
                                                {aula.projeto}
                                              </td>
                                            </motion.tr>
                                          ))}
                                        </tbody>
                                      </table>
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
          transition={{ delay: 1.2 }}
        >
          <motion.p
            className="text-xs text-white/20"
            animate={{
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💡 Clique em um tópico para ver as aulas
          </motion.p>
          <motion.div
            className="mt-2 text-[10px] text-white/10 flex justify-center gap-6"
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span>⚙️ Engenharia</span>
            <span>🔧 ↔</span>
            <span>🏗️ Metodologia</span>
            <span>📐 ↔</span>
            <span>📊 Qualidade</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}