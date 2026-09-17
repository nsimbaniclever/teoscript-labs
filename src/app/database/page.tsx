// src/app/database/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── ESTILO DATABASE ───
const PAPEL: React.CSSProperties = {
  backgroundColor: '#050a0a',
  minHeight: '100vh',
  position: 'relative',
}

// ─── COMPONENTE DE FUNDO "DATA STREAM" ───
function DataStreamBackground({ color = '#22c55e' }: { color?: string }) {
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

    // ─── QUERIES VOANDO ───
    const queries: { 
      x: number; y: number; 
      vx: number; vy: number; 
      text: string; 
      size: number; 
      life: number; 
      maxLife: number;
      phase: number;
      type: string;
    }[] = []

    const sqlWords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'INSERT', 'UPDATE', 
      'DELETE', 'CREATE', 'ALTER', 'DROP', 'INDEX', 'TABLE',
      'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'GROUP BY',
      'ORDER BY', 'HAVING', 'UNION', 'DISTINCT', 'COUNT',
      'SUM', 'AVG', 'MAX', 'MIN', 'INNER JOIN', 'LEFT JOIN'
    ]

    // ─── TABELAS FLUTUANTES ───
    const tables: { x: number; y: number; vx: number; vy: number; size: number; phase: number; columns: string[] }[] = []
    const tableNames = ['Clientes', 'Pedidos', 'Produtos', 'Fornecedores', 'Vendas', 'Estoque', 'Funcionarios', 'Departamentos']

    for (let i = 0; i < 12; i++) {
      const numCols = 3 + Math.floor(Math.random() * 4)
      const cols: string[] = []
      for (let j = 0; j < numCols; j++) {
        const colNames = ['id', 'nome', 'data', 'valor', 'status', 'quantidade', 'preco', 'categoria', 'email', 'telefone']
        cols.push(colNames[Math.floor(Math.random() * colNames.length)])
      }
      tables.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 40 + Math.random() * 30,
        phase: Math.random() * Math.PI * 2,
        columns: cols,
      })
    }

    // ─── QUERIES INICIAIS ───
    for (let i = 0; i < 25; i++) {
      queries.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        text: sqlWords[Math.floor(Math.random() * sqlWords.length)],
        size: 10 + Math.random() * 14,
        life: 80 + Math.random() * 100,
        maxLife: 180,
        phase: Math.random() * Math.PI * 2,
        type: ['keyword', 'keyword', 'operator', 'table'][Math.floor(Math.random() * 4)],
      })
    }

    let animationId: number
    let time = 0
    let querySpawnCounter = 0

    // ─── PARTÍCULAS DE DADOS ───
    const dataParticles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = []

    const draw = () => {
      time++
      ctx.clearRect(0, 0, width, height)

      // ─── FUNDO COM EFEITO DE DADOS ───
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.6
      )
      gradient.addColorStop(0, 'rgba(34,197,94,0.02)')
      gradient.addColorStop(0.5, 'rgba(34,197,94,0.01)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // ─── LINHAS DE DADOS (ESTILO BINÁRIO) ───
      for (let i = 0; i < 30; i++) {
        const y = (i / 30) * height
        const x = (time * (0.3 + i * 0.015)) % width
        ctx.globalAlpha = 0.02 + 0.01 * Math.sin(time * 0.01 + i * 0.5)
        ctx.font = '10px monospace'
        ctx.fillStyle = color
        const bits = Math.random() > 0.5 ? '0101' : '1010'
        ctx.fillText(bits, x, y)
      }

      // ─── TABELAS FLUTUANTES ───
      for (const table of tables) {
        table.x += table.vx
        table.y += table.vy
        table.phase += 0.01

        if (table.x < 0 || table.x > width) table.vx *= -1
        if (table.y < 0 || table.y > height) table.vy *= -1

        const pulse = 1 + 0.1 * Math.sin(table.phase)
        const w = table.size * pulse
        const h = table.size * 0.6 * pulse

        // ─── GLOW DA TABELA ───
        const glow = ctx.createRadialGradient(table.x, table.y, 0, table.x, table.y, w)
        glow.addColorStop(0, color)
        glow.addColorStop(1, 'transparent')
        ctx.globalAlpha = 0.04 + 0.02 * Math.sin(table.phase)
        ctx.beginPath()
        ctx.arc(table.x, table.y, w, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // ─── RETÂNGULO DA TABELA ───
        ctx.globalAlpha = 0.1 + 0.05 * Math.sin(table.phase + 0.5)
        ctx.shadowColor = color
        ctx.shadowBlur = 15
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(table.x - w/2, table.y - h/2, w, h, 4)
        ctx.stroke()

        // ─── NOME DA TABELA ───
        ctx.shadowBlur = 0
        ctx.globalAlpha = 0.15 + 0.1 * Math.sin(table.phase + 1)
        ctx.font = `bold ${Math.min(w * 0.2, 14)}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = color
        const name = tableNames[Math.floor(Math.random() * tableNames.length)]
        ctx.fillText(name, table.x, table.y - h * 0.15)

        // ─── COLUNAS ───
        ctx.font = `${Math.min(w * 0.1, 10)}px monospace`
        ctx.globalAlpha = 0.08 + 0.05 * Math.sin(table.phase + 2)
        for (let i = 0; i < Math.min(table.columns.length, 3); i++) {
          const colY = table.y + h * 0.15 + i * h * 0.2
          ctx.fillText(`├ ${table.columns[i]}`, table.x, colY)
        }

        ctx.shadowBlur = 0
      }

      // ─── QUERIES VOANDO ───
      for (let i = queries.length - 1; i >= 0; i--) {
        const q = queries[i]
        q.x += q.vx
        q.y += q.vy
        q.vy += 0.01
        q.life--
        q.phase += 0.05

        // ─── RASTRO DA QUERY ───
        ctx.globalAlpha = (q.life / q.maxLife) * 0.3
        ctx.shadowColor = color
        ctx.shadowBlur = 10
        
        // ─── COR DIFERENTE POR TIPO ───
        let textColor = color
        if (q.type === 'keyword') textColor = '#86efac'
        else if (q.type === 'operator') textColor = '#fbbf24'
        else if (q.type === 'table') textColor = '#60a5fa'

        ctx.fillStyle = textColor
        ctx.font = `bold ${q.size}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(q.text, q.x, q.y)
        ctx.shadowBlur = 0

        if (q.life <= 0) {
          queries.splice(i, 1)
        }
      }

      // ─── SPAM DE QUERIES ───
      querySpawnCounter++
      if (querySpawnCounter % 3 === 0 && Math.random() > 0.85) {
        const numNew = 1 + Math.floor(Math.random() * 3)
        for (let i = 0; i < numNew; i++) {
          const side = Math.floor(Math.random() * 4)
          let x: number = Math.random() * width
          let y: number = Math.random() * height
          
          switch(side) {
            case 0: 
              x = Math.random() * width
              y = -20
              break
            case 1: 
              x = width + 20
              y = Math.random() * height
              break
            case 2: 
              x = Math.random() * width
              y = height + 20
              break
            case 3: 
              x = -20
              y = Math.random() * height
              break
          }
          
          queries.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 2 - 0.5,
            text: sqlWords[Math.floor(Math.random() * sqlWords.length)],
            size: 10 + Math.random() * 16,
            life: 100 + Math.random() * 120,
            maxLife: 220,
            phase: Math.random() * Math.PI * 2,
            type: ['keyword', 'keyword', 'operator', 'table'][Math.floor(Math.random() * 4)],
          })
        }
      }

      // ─── CHAVES (PRIMARY KEY) FLUTUANDO ───
      if (time % 5 === 0) {
        const keyX = Math.random() * width
        const keyY = Math.random() * height
        ctx.globalAlpha = 0.03 + 0.02 * Math.random()
        ctx.font = '30px sans-serif'
        ctx.fillStyle = color
        ctx.fillText('🔑', keyX, keyY)
      }

      // ─── DADOS FLUINDO (PARTÍCULAS) ───
      if (time % 2 === 0 && Math.random() > 0.9) {
        const numP = 5 + Math.random() * 10
        const cx = Math.random() * width
        const cy = Math.random() * height
        for (let i = 0; i < numP; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = 1 + Math.random() * 3
          dataParticles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 30 + Math.random() * 40,
            maxLife: 70,
            size: 1 + Math.random() * 2,
          })
        }
      }

      // ─── ATUALIZAR PARTÍCULAS DE DADOS ───
      for (let i = dataParticles.length - 1; i >= 0; i--) {
        const p = dataParticles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99
        p.life--

        const alpha = (p.life / p.maxLife) * 0.5
        ctx.globalAlpha = alpha
        ctx.shadowColor = color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.shadowBlur = 0

        if (p.life <= 0) {
          dataParticles.splice(i, 1)
        }
      }

      // ─── TEXTO "SQL ⚡ DATA" FLUTUANTE ───
      ctx.globalAlpha = 0.015 + 0.01 * Math.sin(time * 0.007)
      ctx.font = 'bold 60px monospace'
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const yPos = height * 0.4 + Math.sin(time * 0.005) * 40
      ctx.fillText('⚡ SQL ⚡', width * 0.5, yPos)
      ctx.fillText('📊 DATA 📊', width * 0.5, yPos + 80 + Math.sin(time * 0.007 + 1) * 30)

      // ─── TABLE SCHEMA VISUAL ───
      if (time % 120 < 60) {
        ctx.globalAlpha = 0.02
        ctx.font = '12px monospace'
        ctx.fillStyle = color
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        const schemaX = width * 0.05
        const schemaY = height * 0.05 + Math.sin(time * 0.003) * 20
        ctx.fillText('CREATE TABLE Clientes (', schemaX, schemaY)
        ctx.fillText('    id INT PRIMARY KEY,', schemaX + 20, schemaY + 20)
        ctx.fillText('    nome VARCHAR(100),', schemaX + 20, schemaY + 40)
        ctx.fillText('    email VARCHAR(100),', schemaX + 20, schemaY + 60)
        ctx.fillText('    data_cadastro DATE', schemaX + 20, schemaY + 80)
        ctx.fillText(');', schemaX, schemaY + 100)
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [color])

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
      }}
    />
  )
}

// ─── SÍMBOLOS FLUTUANTES ───
const SYMBOLS = [
  'SQL', '📊', '🔑', '📋', '🗄️', '⚡', '💾', '📁',
  'SQL', '📊', '🔑', '📋', '🗄️', '⚡', '💾', '📁',
  'SQL', '📊', '🔑', '📋', '🗄️', '⚡', '💾', '📁',
  'SQL', '📊', '🔑', '📋', '🗄️', '⚡', '💾', '📁',
]

export default function DatabasePage() {
  const part = parts.find(p => p.id === 'database')!

  const [subtemasAbertos, setSubtemasAbertos] = useState<string[]>([])
  const [subsubtemasAbertos, setSubsubtemasAbertos] = useState<string[]>([])
  const [symbolsPositions, setSymbolsPositions] = useState<{ x: number; y: number; symbol: string; size: number; delay: number; speed: number; direction: string }[]>([])

  useEffect(() => {
    const directions = ['up', 'down', 'left', 'right', 'diagonal']
    const positions = SYMBOLS.map(() => ({
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 18 + Math.random() * 38,
      delay: Math.random() * 10,
      speed: 4 + Math.random() * 10,
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

  const cor = '#22c55e'

  return (
    <div className="min-h-screen relative overflow-hidden" style={PAPEL}>
      {/* ─── FUNDO DATA STREAM ─── */}
      <DataStreamBackground color="#22c55e" />

      {/* ─── SÍMBOLOS FLUTUANTES ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {symbolsPositions.map((item, index) => {
          let xMovement: number[] = []
          let yMovement: number[] = []
          
          switch(item.direction) {
            case 'up':
              xMovement = [0, (Math.random() - 0.5) * 60, 0]
              yMovement = [-200, -300, -400]
              break
            case 'down':
              xMovement = [0, (Math.random() - 0.5) * 60, 0]
              yMovement = [200, 300, 400]
              break
            case 'left':
              xMovement = [-200, -300, -400]
              yMovement = [0, (Math.random() - 0.5) * 60, 0]
              break
            case 'right':
              xMovement = [200, 300, 400]
              yMovement = [0, (Math.random() - 0.5) * 60, 0]
              break
            case 'diagonal':
              xMovement = [150, 250, 350]
              yMovement = [-150, -250, -350]
              break
            default:
              xMovement = [0, 80, 0]
              yMovement = [0, 80, 0]
          }

          return (
            <motion.span
              key={index}
              className="absolute font-mono font-bold select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: item.size,
                color: '#22c55e',
                opacity: 0.04 + Math.random() * 0.03,
                textShadow: '0 0 50px rgba(34,197,94,0.1)',
              }}
              animate={{
                x: xMovement,
                y: yMovement,
                rotate: [0, 360, -180, 540, 0],
                scale: [0.4, 1.6, 0.6, 1.4, 0.4],
              }}
              transition={{
                x: {
                  duration: 2.5 + Math.random() * 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay,
                },
                y: {
                  duration: 2.5 + Math.random() * 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay + 0.5,
                },
                rotate: {
                  duration: 3 + Math.random() * 3,
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
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-[#22c55e]/30"
            style={{ background: `linear-gradient(135deg, ${cor}, #16a34a)` }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          {/* ─── LOGO ─── */}
          <div className="hidden md:flex items-center gap-2 pb-1 border-b-2 transition-all duration-300 hover:border-[#22c55e]/50 group" style={{ borderBottomColor: 'rgba(34,197,94,0.15)' }}>
            <motion.div 
              className="relative w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]"
              style={{
                background: `linear-gradient(135deg, ${cor}, #16a34a)`,
              }}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-base font-black text-white tracking-tight">T</span>
              <motion.div 
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: ['inset 0 0 0px rgba(34,197,94,0)', 'inset 0 0 20px rgba(34,197,94,0.3)', 'inset 0 0 0px rgba(34,197,94,0)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <span className="font-bold text-[#86efac] text-sm tracking-tight flex items-center gap-1">
                TeoScript <span style={{ color: '#ffffff' }}>Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-[#86efac]/60 tracking-[0.25em] uppercase leading-none">
                Doctorate · SQL
              </span>
            </div>
          </div>
        </div>

        {/* ─── CABEÇALHO ─── */}
        <motion.div 
          className="relative bg-[#050a0a]/90 backdrop-blur-sm rounded-2xl border border-[#22c55e]/20 shadow-lg shadow-[#22c55e]/5 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #22c55e, #86efac, #16a34a, #22c55e)' }} />
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#16a34a]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="px-6 md:px-12 py-8 md:py-12 text-center relative">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span 
                className="text-5xl md:text-6xl"
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🗄️
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: cor }}>
                Banco de Dados e SQL
              </h1>
            </motion.div>
            <motion.div 
              className="w-24 h-1 mx-auto rounded-full mb-4"
              style={{ background: cor }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <p className="text-lg md:text-xl text-[#86efac]/60 max-w-2xl mx-auto">
              📊 Modelagem, consultas e gerenciamento de dados com SQL Server
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <motion.span 
                className="px-4 py-1.5 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/30 text-[#86efac]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {part.sections.length} módulos
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/30 text-[#86efac]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {totalSubsubtemas} tópicos
              </motion.span>
              <motion.span 
                className="px-4 py-1.5 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/30 text-[#86efac]"
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {totalTopicos} conceitos
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* ─── MÓDULOS / SEÇÕES ─── */}
        <div className="space-y-4">
          {part.sections.map((modulo, index) => {
            const isOpen = subtemasAbertos.includes(modulo.id)

            return (
              <motion.div 
                key={modulo.id} 
                className="bg-[#050a0a]/90 rounded-xl border border-[#22c55e]/10 overflow-hidden shadow-sm hover:shadow-md hover:border-[#22c55e]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleSubtema(modulo.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#22c55e]/5 transition-colors group"
                  style={{ borderLeft: isOpen ? `4px solid ${cor}` : '4px solid transparent' }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <motion.span 
                      className="text-2xl"
                      animate={{ 
                        scale: isOpen ? [1, 1.3, 1] : 1,
                        rotate: isOpen ? [0, 20, -20, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      📚
                    </motion.span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold" style={{ color: cor }}>
                        {modulo.title}
                      </h3>
                      <span className="text-sm text-[#86efac]/40">
                        {modulo.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-[#86efac]/40 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#86efac]/40 group-hover:text-[#86efac] transition-colors"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
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
                      <div className="p-4 md:p-6 border-t border-[#22c55e]/10 space-y-3 bg-[#050a0a]/90">
                        {modulo.topics.map((topico) => {
                          const isSubOpen = subsubtemasAbertos.includes(topico.id)
                          const aulasData = getAulas(topico.id)

                          return (
                            <div key={topico.id} className="border border-[#22c55e]/10 rounded-lg overflow-hidden hover:border-[#22c55e]/30 transition-all bg-[#050a0a]/90">
                              <button
                                onClick={() => toggleSubsubtema(topico.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#22c55e]/5 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <motion.span 
                                    className="text-xl"
                                    animate={{ 
                                      rotate: isSubOpen ? 180 : 0,
                                      scale: isSubOpen ? 1.2 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    🔑
                                  </motion.span>
                                  <span className="font-medium text-[#86efac] group-hover:text-[#22c55e] transition-colors">
                                    {topico.title}
                                  </span>
                                  <span className="text-xs text-[#86efac]/40">
                                    {aulasData.length} aulas
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[#86efac]/40 group-hover:text-[#86efac] transition-colors"
                                >
                                  <ChevronDown size={18} />
                                </motion.div>
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
                                    <div className="p-4 border-t border-[#22c55e]/10 overflow-x-auto bg-[#050a0a]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: `${cor}15` }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#86efac] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#86efac] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#86efac] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#86efac] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulasData.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#22c55e]/5 hover:bg-[#22c55e]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#22c55e]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-4 py-2 font-medium text-[#86efac] align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                  >
                                                    <Link
                                                      href={`/aula/${aula.slug}`}
                                                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-[#050a0a] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                      style={{ background: cor }}
                                                    >
                                                      Ir <ExternalLink size={10} />
                                                    </Link>
                                                  </motion.div>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-[#86efac]/60 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-[#86efac]/60 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-[#86efac]/60 align-top text-xs">
                                                {aula.projeto}
                                              </td>
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
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}