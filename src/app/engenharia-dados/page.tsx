'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react'
import { parts } from '@/content/doctorate'

// ─── CORES DO TEMA ───
const CORES = {
  primary: '#00d4ff',
  secondary: '#00ffc8',
  accent: '#00ffc8',
  textPrimary: '#67e8f9',
  textSecondary: '#00ffc8',
  bg: '#0a0e27',
  bgCard: 'rgba(10, 14, 39, 0.85)',
  border: 'rgba(0, 212, 255, 0.2)',
  glow: 'rgba(0, 212, 255, 0.3)',
}

// ─── COMPONENTE SQL RAIN ───
function SqlRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sqlCommands = [
      'SELECT * FROM users',
      'JOIN orders ON u.id = o.user_id',
      'WHERE created_at > NOW()',
      'GROUP BY category',
      'INSERT INTO warehouse',
      'CREATE TABLE IF NOT EXISTS',
      'ALTER TABLE ADD COLUMN',
      'DROP TABLE CASCADE',
      'WITH cte AS (SELECT)',
      'PARTITION BY date',
      'OVER (ORDER BY id)',
      'UNION ALL SELECT',
      'HAVING COUNT(*) > 1',
      'DISTINCT customer_id',
      'LIMIT 1000 OFFSET 0',
      'spark.read.parquet()',
      'df.filter(col("age") > 18)',
      'kafkaConsumer.poll()',
      'airflow.dag.schedule',
      'dbt run --models',
      'pyspark.sql.functions',
      'SELECT * FROM raw',
      'INSERT INTO curated',
      'COPY INTO warehouse',
      'VACUUM table',
      'ANALYZE statistics'
    ]

    const updateSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    const columns = Math.floor(canvas.width / 25)
    const drops: number[] = []
    const texts: string[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
      texts[i] = sqlCommands[Math.floor(Math.random() * sqlCommands.length)]
    }

    let animationId: number

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00d4ff'
      ctx.font = '14px "Courier New", monospace'
      ctx.textAlign = 'center'

      for (let i = 0; i < columns; i++) {
        const x = i * 25
        const y = drops[i] * 14

        const brightness = Math.random() > 0.8 ? 1 : 0.7
        ctx.globalAlpha = brightness
        ctx.fillText(texts[i], x, y)

        if (drops[i] * 14 > canvas.height + 50) {
          drops[i] = -10
          texts[i] = sqlCommands[Math.floor(Math.random() * sqlCommands.length)]
        }
        drops[i] += 0.15
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateSize)
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
        opacity: 0.6,
        display: 'block',
      }}
    />
  )
}

// ─── CÍRCULOS HOLOGRÁFICOS ───
function HolographicCircles() {
  return (
    <>
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          top: '50%',
          left: '50%',
          border: `2px solid rgba(0, 212, 255, 0.2)`,
          boxShadow: '0 0 100px rgba(0, 212, 255, 0.2)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '300px',
          height: '300px',
          top: '50%',
          left: '50%',
          border: `2px solid rgba(0, 255, 200, 0.2)`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </>
  )
}

// ─── GRID DIGITAL ───
function DigitalGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        zIndex: 1,
      }}
    />
  )
}

// ─── GLOW EFFECT ───
function GlowEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(0, 255, 200, 0.2) 0%, transparent 70%)',
        zIndex: 5,
      }}
      animate={{
        x: mousePos.x,
        y: mousePos.y,
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        type: 'spring',
        damping: 30,
        stiffness: 100,
      }}
    />
  )
}

// ─── PIPELINE NODES ───
function PipelineNodes() {
  const nodes = [
    { label: 'SOURCE', top: '20%', left: '15%' },
    { label: 'ETL', top: '35%', left: '35%' },
    { label: 'TRANSFORM', top: '25%', left: '55%' },
    { label: 'WAREHOUSE', top: '40%', left: '75%' },
    { label: 'STREAM', top: '55%', left: '25%' },
    { label: 'MODEL', top: '60%', left: '60%' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-3">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center text-[10px] font-bold font-mono"
          style={{
            top: node.top,
            left: node.left,
            width: '60px',
            height: '60px',
            border: `2px solid rgba(0, 212, 255, 0.6)`,
            borderRadius: '12px',
            background: 'rgba(10, 20, 40, 0.7)',
            color: 'rgba(0, 212, 255, 0.9)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 212, 255, 0.3)',
              '0 0 30px rgba(0, 212, 255, 0.6)',
              '0 0 20px rgba(0, 212, 255, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-[#00d4ff]"
            style={{
              top: '-4px',
              right: '-4px',
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
            }}
          />
          {node.label}
        </motion.div>
      ))}
    </div>
  )
}

// ─── ETL BLOCKS ───
function EtlBlocks() {
  const blocks = [
    { label: 'EXTRACT → LOAD', top: '15%', left: '45%' },
    { label: 'CDC PIPELINE', top: '70%', left: '40%' },
    { label: 'DATA LAKE', top: '45%', right: '15%' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-3">
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          className="absolute px-4 py-2 text-[11px] font-bold font-mono"
          style={{
            top: block.top,
            left: block.left,
            right: block.right,
            background: 'rgba(20, 40, 80, 0.6)',
            border: '1px solid rgba(0, 212, 255, 0.4)',
            borderRadius: '6px',
            color: 'rgba(0, 255, 200, 0.9)',
            letterSpacing: '1px',
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        >
          {block.label}
        </motion.div>
      ))}
    </div>
  )
}

// ─── TOOL TAGS ───
function ToolTags() {
  const tags = [
    { label: 'Apache Spark', top: '10%', left: '50%' },
    { label: 'Kafka', top: '75%', left: '20%' },
    { label: 'dbt', top: '80%', right: '25%' },
    { label: 'Airflow', top: '50%', left: '8%' },
    { label: 'Python', bottom: '20%', left: '50%' },
    { label: 'Snowflake', top: '30%', right: '5%' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-4">
      {tags.map((tag, i) => (
        <motion.div
          key={i}
          className="absolute px-3 py-1 text-[10px] font-bold font-mono rounded-full"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
            background: 'rgba(20, 40, 80, 0.7)',
            border: '1px solid rgba(0, 255, 200, 0.5)',
            color: 'rgba(0, 255, 200, 0.9)',
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        >
          {tag.label}
        </motion.div>
      ))}
    </div>
  )
}

// ─── DB ICONS ───
function DbIcons() {
  const icons = [
    { top: '50%', left: '5%' },
    { top: '20%', right: '8%' },
    { bottom: '25%', right: '15%' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-3">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-12 rounded-[50%_50%_50%_50%/_20%_20%_20%_20%] border-2"
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
            borderColor: 'rgba(0, 212, 255, 0.5)',
            background: 'rgba(10, 20, 40, 0.6)',
          }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 212, 255, 0.3)',
              '0 0 25px rgba(0, 212, 255, 0.7)',
              '0 0 10px rgba(0, 212, 255, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        >
          <div className="absolute top-[30%] left-[10%] right-[10%] h-0.2 bg-[rgba(0,212,255,0.5)]" />
          <div className="absolute top-[60%] left-[10%] right-[10%] h-0.2 bg-[rgba(0,212,255,0.5)]" />
        </motion.div>
      ))}
    </div>
  )
}

// ─── FLOW ARROWS ───
function FlowArrows() {
  const arrows = [
    { symbol: '→', top: '30%', left: '28%' },
    { symbol: '→', top: '28%', left: '48%' },
    { symbol: '→', top: '35%', left: '68%' },
    { symbol: '↓', top: '50%', left: '38%' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-3">
      {arrows.map((arrow, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            top: arrow.top,
            left: arrow.left,
            color: 'rgba(0, 255, 200, 0.6)',
          }}
          animate={{
            x: arrow.symbol === '↓' ? 0 : [0, 10, 0],
            y: arrow.symbol === '↓' ? [0, 10, 0] : 0,
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          {arrow.symbol}
        </motion.div>
      ))}
    </div>
  )
}

// ─── DATA TABLES ───
function DataTables() {
  const tables = [
    { name: 'users', top: '25%', left: '10%' },
    { name: 'orders', top: '55%', left: '70%' },
    { name: 'events', top: '75%', left: '50%' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-2">
      {tables.map((table, i) => (
        <motion.div
          key={i}
          className="absolute px-2 py-1 font-mono text-[9px] rounded"
          style={{
            top: table.top,
            left: table.left,
            background: 'rgba(10, 20, 40, 0.5)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: 'rgba(200, 220, 255, 0.7)',
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="flex gap-2 text-[rgba(0,212,255,0.9)] font-bold border-b border-[rgba(0,212,255,0.1)] pb-0.5 mb-0.5">
            <span>id</span>
            <span>name</span>
            <span>ts</span>
          </div>
          <div className="flex gap-2">
            <span>1</span>
            <span>abc</span>
            <span>2024</span>
          </div>
          <div className="flex gap-2">
            <span>2</span>
            <span>xyz</span>
            <span>2024</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── AMBIENT LIGHT ───
function AmbientLight() {
  return (
    <motion.div
      className="absolute top-[50%] right-[20%] pointer-events-none"
      style={{
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(0, 255, 200, 0.15) 0%, transparent 70%)',
        zIndex: 1,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

// ─── UI ELEMENTS ───
function UiElements() {
  const elements = [
    { top: '10%', left: '10%', w: '200px', h: '150px' },
    { top: '15%', right: '15%', w: '180px', h: '120px' },
    { bottom: '35%', left: '8%', w: '150px', h: '100px' },
    { bottom: '35%', right: '10%', w: '160px', h: '110px' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none z-2">
      {elements.map((el, i) => (
        <div
          key={i}
          className="absolute rounded-xl"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            width: el.w,
            height: el.h,
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
          }}
        />
      ))}
    </div>
  )
}

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

// ─── LAYOUT PRINCIPAL ───
export default function EngenhariaDadosPage() {
  const part = parts.find(p => p.id === 'engenharia-dados')!

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

  const totalSubsubtemas = part?.sections?.reduce((acc, st) => acc + st.topics.length, 0) || 0
  const totalTopicos = part?.sections?.reduce((acc, st) => acc + st.topics.reduce((s, t) => s + t.subs.length, 0), 0) || 0

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0e27' }}>
      {/* ─── FUNDO ─── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f2a1f 100%)',
        }}
      />

      {/* ─── ELEMENTOS VISUAIS ─── */}
      <SqlRain />
      <DigitalGrid />
      <AmbientLight />
      <HolographicCircles />
      <GlowEffect />
      <UiElements />
      <PipelineNodes />
      <EtlBlocks />
      <ToolTags />
      <DbIcons />
      <FlowArrows />
      <DataTables />

      {/* ─── CONTEÚDO ─── */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 md:px-6 py-6 min-h-screen">
        {/* ─── TOPO: Voltar ─── */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-[#0a0e27] hover:-translate-y-0.5 transition-all shadow-md hover:shadow-[#00d4ff]/20"
            style={{ background: '#00d4ff' }}
          >
            <ArrowLeft size={16} /> Voltar
          </Link>

          {/* ─── LOGO ─── */}
          <div className="hidden md:flex items-center gap-2 pb-1 border-b-2 transition-all duration-300 hover:border-[#00d4ff]/50 group" style={{ borderBottomColor: 'rgba(0,212,255,0.15)' }}>
            <div className="relative w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00ffc8)',
              }}
            >
              <span className="text-base font-black text-[#0a0e27] tracking-tight">T</span>
            </div>
            <div>
              <span className="font-bold text-[#00d4ff] text-sm tracking-tight flex items-center gap-1">
                TeoScript <span style={{ color: '#00d4ff' }}>Labs</span>
              </span>
              <span className="block text-[8px] font-medium text-[#00d4ff]/60 tracking-[0.25em] uppercase leading-none">
                Doctorate · Engenharia de Dados
              </span>
            </div>
          </div>
        </div>

        {/* ─── CABEÇALHO ─── */}
        <div className="relative bg-[#0a0e27]/90 backdrop-blur-sm rounded-2xl border border-[#00d4ff]/20 shadow-lg shadow-[#00d4ff]/5 overflow-hidden mb-8">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #00d4ff, #00ffc8, #00d4ff)' }} />
          <div className="px-6 md:px-12 py-8 md:py-12 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl md:text-6xl">🚀</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: '#00d4ff' }}>
                Engenharia de Dados e Data Science
              </h1>
            </div>
            <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: '#00d4ff' }} />
            <p className="text-lg md:text-xl text-[#67e8f9]/60 max-w-2xl mx-auto">
              Algoritmos, análise de dados, big data, engenharia de dados e machine learning
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <span className="px-4 py-1.5 bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/30 text-[#00d4ff]">
                {part?.sections?.length || 0} temas
              </span>
              <span className="px-4 py-1.5 bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/30 text-[#00d4ff]">
                {totalSubsubtemas} tópicos
              </span>
              <span className="px-4 py-1.5 bg-[#00d4ff]/10 rounded-full border border-[#00d4ff]/30 text-[#00d4ff]">
                {totalTopicos} aulas
              </span>
            </div>
          </div>
        </div>

        {/* ─── SUBTEMAS ─── */}
        <div className="space-y-4">
          {part?.sections?.map((subtema) => {
            const isOpen = subtemasAbertos.includes(subtema.id)

            return (
              <div key={subtema.id} className="bg-[#0a0e27]/90 rounded-xl border border-[#00d4ff]/10 overflow-hidden shadow-sm hover:shadow-md hover:border-[#00d4ff]/30 transition-all">
                <button
                  onClick={() => toggleSubtema(subtema.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#00d4ff]/5 transition-colors"
                  style={{ borderLeft: isOpen ? '4px solid #00d4ff' : '4px solid transparent' }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl">📊</span>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-semibold" style={{ color: '#00d4ff' }}>
                        {subtema.title}
                      </h3>
                      <span className="text-sm text-[#00d4ff]/40">
                        {subtema.topics.length} tópicos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-[#00d4ff]/40 hidden sm:inline">
                      {isOpen ? 'Recolher' : 'Expandir'}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#00d4ff]/40"
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
                      <div className="p-4 md:p-6 border-t border-[#00d4ff]/10 space-y-3 bg-[#0a0e27]/90">
                        {subtema.topics.map((sub) => {
                          const isSubOpen = subsubtemasAbertos.includes(sub.id)
                          const aulas = getAulasFromDoctorate(sub.id)

                          return (
                            <div key={sub.id} className="border border-[#00d4ff]/10 rounded-lg overflow-hidden hover:border-[#00d4ff]/30 transition-all bg-[#0a0e27]/90">
                              <button
                                onClick={() => toggleSubsubtema(sub.id)}
                                className="w-full flex items-center justify-between gap-4 p-4 hover:bg-[#00d4ff]/5 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">⚡</span>
                                  <span className="font-medium text-[#67e8f9]">
                                    {sub.title}
                                  </span>
                                  <span className="text-xs text-[#00d4ff]/40">
                                    {sub.subs.length} conceitos
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isSubOpen ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-[#00d4ff]/40"
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
                                    <div className="p-4 border-t border-[#00d4ff]/10 overflow-x-auto bg-[#0a0e27]/90">
                                      <table className="w-full text-sm border-collapse">
                                        <thead>
                                          <tr style={{ background: 'rgba(0, 212, 255, 0.08)' }}>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00d4ff] w-[22%]">Aula</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00d4ff] w-[28%]">O que estudar</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00d4ff] w-[28%]">Aplicação na Tese</th>
                                            <th className="px-4 py-2 text-left font-semibold text-[#00d4ff] w-[22%]">Projeto Sugerido</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {aulas.map((aula, idx) => (
                                            <tr
                                              key={idx}
                                              className={`border-b border-[#00d4ff]/5 hover:bg-[#00d4ff]/5 transition-colors ${
                                                idx % 2 === 0 ? 'bg-[#00d4ff]/5' : 'bg-transparent'
                                              }`}
                                            >
                                              <td className="px-4 py-2 font-medium text-[#67e8f9] align-top">
                                                <div className="flex items-center gap-2 flex-wrap group">
                                                  <span>{aula.nome}</span>
                                                  <Link
                                                    href={`/aula/${aula.slug}`}
                                                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-[#0a0e27] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-y-0.5 whitespace-nowrap"
                                                    style={{ background: '#00d4ff' }}
                                                  >
                                                    Ir <ExternalLink size={10} />
                                                  </Link>
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-[#00d4ff]/60 align-top text-xs">
                                                {aula.estudo}
                                              </td>
                                              <td className="px-4 py-2 text-[#00d4ff]/60 align-top text-xs">
                                                {aula.tese}
                                              </td>
                                              <td className="px-4 py-2 text-[#00d4ff]/60 align-top text-xs">
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}