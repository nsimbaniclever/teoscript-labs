// src/app/[modulo]/projetos/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  Play, 
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
  ChevronDown,
  ChevronUp
} from 'lucide-react'
// REMOVA: Github da importação acima
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { parts } from '@/content/doctorate'

// ─── ÍCONE GITHUB PERSONALIZADO ───
function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

// ─── CORES POR MÓDULO ───
const CORES_MODULO: Record<string, { primary: string; secondary: string; bg: string; border: string; text: string }> = {
  fundamentos: {
    primary: '#8b7355',
    secondary: '#a08b7a',
    bg: 'rgba(139, 115, 85, 0.1)',
    border: 'rgba(139, 115, 85, 0.2)',
    text: '#e8d5b7'
  },
  matematica: {
    primary: '#2557d0',
    secondary: '#5792ff',
    bg: 'rgba(37, 87, 208, 0.1)',
    border: 'rgba(37, 87, 208, 0.2)',
    text: '#1a3a8a'
  },
  algoritmos: {
    primary: '#00ff41',
    secondary: '#4ade80',
    bg: 'rgba(0, 255, 65, 0.1)',
    border: 'rgba(0, 255, 65, 0.2)',
    text: '#4ade80'
  },
  'engenharia-dados': {
    primary: '#00d4ff',
    secondary: '#33ddff',
    bg: 'rgba(0, 212, 255, 0.1)',
    border: 'rgba(0, 212, 255, 0.2)',
    text: '#67e8f9'
  },
  ml: {
    primary: '#a78bfa',
    secondary: '#c4b5fd',
    bg: 'rgba(167, 139, 250, 0.1)',
    border: 'rgba(167, 139, 250, 0.2)',
    text: '#c4b5fd'
  },
  'ml-inter': {
    primary: '#6d28d9',
    secondary: '#8b5cf6',
    bg: 'rgba(109, 40, 217, 0.1)',
    border: 'rgba(109, 40, 217, 0.2)',
    text: '#c4b5fd'
  },
  'ml-adv': {
    primary: '#4c1d95',
    secondary: '#6d28d9',
    bg: 'rgba(76, 29, 149, 0.1)',
    border: 'rgba(76, 29, 149, 0.2)',
    text: '#8b5cf6'
  },
  federado: {
    primary: '#dc2626',
    secondary: '#f87171',
    bg: 'rgba(220, 38, 38, 0.1)',
    border: 'rgba(220, 38, 38, 0.2)',
    text: '#fca5a5'
  },
  database: {
    primary: '#22c55e',
    secondary: '#4ade80',
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.2)',
    text: '#86efac'
  },
  redes: {
    primary: '#06b6d4',
    secondary: '#22d3ee',
    bg: 'rgba(6, 182, 212, 0.1)',
    border: 'rgba(6, 182, 212, 0.2)',
    text: '#67e8f9'
  },
  rede: {
    primary: '#0d9488',
    secondary: '#14b8a6',
    bg: 'rgba(13, 148, 136, 0.1)',
    border: 'rgba(13, 148, 136, 0.2)',
    text: '#5eead4'
  },
  arquitetura: {
    primary: '#ea580c',
    secondary: '#f97316',
    bg: 'rgba(234, 88, 12, 0.1)',
    border: 'rgba(234, 88, 12, 0.2)',
    text: '#fdba74'
  },
  engenharia: {
    primary: '#ec4899',
    secondary: '#f472b6',
    bg: 'rgba(236, 72, 153, 0.1)',
    border: 'rgba(236, 72, 153, 0.2)',
    text: '#f9a8d4'
  }
}

// ─── TIPOS ───
interface ProjetoModulo {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: 'em-desenvolvimento' | 'concluido' | 'planejado'
  tags: string[]
  codigo?: string
  explicacao?: string
  resultado?: string
  colab?: string
  repo?: string
  demo?: string
  tech: string[]
  progress?: number
}

// ─── DADOS DOS PROJETOS POR MÓDULO ───
const projetosPorModulo: Record<string, ProjetoModulo[]> = {
  fundamentos: [
    {
      id: 'conversor-bases',
      title: 'Conversor de Bases Numéricas',
      description: 'Ferramenta interativa para converter números entre binário, octal, decimal e hexadecimal.',
      icon: <Code2 size={24} />,
      status: 'concluido',
      tags: ['Python', 'CLI', 'Conversão'],
      codigo: `def binario_para_decimal(binario):
    return int(binario, 2)

def decimal_para_binario(decimal):
    return bin(decimal)[2:]

# Exemplo de uso
print(binario_para_decimal('1010'))  # 10
print(decimal_para_binario(10))      # 1010`,
      explicacao: 'O conversor de bases numéricas permite transformar números entre diferentes sistemas de numeração, essencial para entender como os computadores processam dados.',
      resultado: '✅ Números convertidos com sucesso entre binário, octal, decimal e hexadecimal.',
      colab: 'https://colab.research.google.com/demo/conversor-bases',
      repo: 'https://github.com/teoscript/conversor-bases',
      tech: ['Python'],
      progress: 100
    },
    {
      id: 'portas-logicas',
      title: 'Simulador de Portas Lógicas',
      description: 'Simulador visual de portas lógicas AND, OR, NOT, XOR com tabelas verdade interativas.',
      icon: <Network size={24} />,
      status: 'em-desenvolvimento',
      tags: ['Python', 'Simulação', 'Lógica'],
      codigo: `class PortaLogica:
    def AND(self, a, b):
        return a and b
    
    def OR(self, a, b):
        return a or b
    
    def NOT(self, a):
        return not a
    
    def XOR(self, a, b):
        return a != b

# Exemplo
porta = PortaLogica()
print(f"AND(1,0) = {porta.AND(1,0)}")  # False`,
      explicacao: 'Simulador educacional que demonstra o funcionamento das portas lógicas fundamentais, base da eletrônica digital.',
      resultado: '🎯 Tabelas verdade geradas para todas as combinações de entrada.',
      colab: 'https://colab.research.google.com/demo/portas-logicas',
      repo: 'https://github.com/teoscript/portas-logicas',
      tech: ['Python', 'HTML/CSS'],
      progress: 60
    }
  ],
  matematica: [
    {
      id: 'algebra-linear',
      title: 'Álgebra Linear com Python',
      description: 'Implementações de operações vetoriais, matrizes e sistemas lineares usando NumPy.',
      icon: <BarChart3 size={24} />,
      status: 'concluido',
      tags: ['Python', 'NumPy', 'Álgebra'],
      codigo: `import numpy as np

# Vetores
v = np.array([1, 2, 3])
w = np.array([4, 5, 6])

# Produto escalar
produto = np.dot(v, w)

# Matrizes
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Multiplicação
C = np.matmul(A, B)`,
      explicacao: 'Biblioteca de funções para operações fundamentais de álgebra linear, essencial para machine learning e ciência de dados.',
      resultado: '📊 Visualizações 2D/3D de vetores e transformações lineares.',
      colab: 'https://colab.research.google.com/demo/algebra-linear',
      repo: 'https://github.com/teoscript/algebra-linear',
      tech: ['Python', 'NumPy', 'Matplotlib'],
      progress: 100
    }
  ],
  federado: [
    {
      id: 'fedavg-simulator',
      title: 'Simulador FedAvg',
      description: 'Simulação completa do algoritmo Federated Averaging com clientes Não-IID e análise de convergência.',
      icon: <Network size={24} />,
      status: 'em-desenvolvimento',
      tags: ['Python', 'PyTorch', 'FL'],
      codigo: `def fedavg(modelos_locais, pesos):
    modelo_global = {}
    
    # Inicializa modelo global
    for key in modelos_locais[0].keys():
        modelo_global[key] = torch.zeros_like(modelos_locais[0][key])
    
    # Soma ponderada
    for modelo, peso in zip(modelos_locais, pesos):
        for key in modelo.keys():
            modelo_global[key] += peso * modelo[key]
    
    return modelo_global`,
      explicacao: 'Implementação do algoritmo FedAvg com suporte a múltiplos clientes, agregação ponderada e visualização de convergência.',
      resultado: '📈 Gráficos de acurácia vs rounds para diferentes configurações.',
      colab: 'https://colab.research.google.com/demo/fedavg',
      repo: 'https://github.com/teoscript/fedavg-simulator',
      tech: ['Python', 'PyTorch', 'Matplotlib'],
      progress: 65
    },
    {
      id: 'dp-fl',
      title: 'Privacidade Diferencial em FL',
      description: 'Implementação de mecanismos de privacidade diferencial para proteger gradientes em Aprendizado Federado.',
      icon: <Lock size={24} />,
      status: 'em-desenvolvimento',
      tags: ['Python', 'DP', 'Privacy'],
      codigo: `def adicionar_ruido_lapace(gradiente, sensibilidade, epsilon):
    escala = sensibilidade / epsilon
    ruido = np.random.laplace(0, escala, gradiente.shape)
    return gradiente + ruido

def adicionar_ruido_gaussiano(gradiente, sensibilidade, epsilon, delta):
    sigma = sensibilidade * np.sqrt(2 * np.log(1.25 / delta)) / epsilon
    ruido = np.random.normal(0, sigma, gradiente.shape)
    return gradiente + ruido`,
      explicacao: 'Adição de ruído Laplace e Gaussiano aos gradientes para garantir privacidade diferencial, com análise do trade-off utilidade vs privacidade.',
      resultado: '🔒 Análise do impacto do ruído na acurácia do modelo global.',
      colab: 'https://colab.research.google.com/demo/dp-fl',
      repo: 'https://github.com/teoscript/dp-fl',
      tech: ['Python', 'PyTorch', 'Opacus'],
      progress: 45
    }
  ]
}

// ─── COMPONENTE DE STATUS ───
function StatusBadge({ status }: { status: ProjetoModulo['status'] }) {
  const config = {
    'em-desenvolvimento': { label: '🚧 Em desenvolvimento', color: '#f59e0b' },
    'concluido': { label: '✅ Concluído', color: '#22c55e' },
    'planejado': { label: '📋 Planejado', color: '#64748b' }
  }
  
  const { label, color } = config[status]
  
  return (
    <span 
      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
      style={{ background: `${color}20`, color }}
    >
      {label}
    </span>
  )
}

// ─── COMPONENTE DE CARD DE CÓDIGO ───
function CodigoCard({ codigo, colors }: { codigo?: string; colors: any }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (!codigo) return null

  const lines = codigo.split('\n')
  const displayLines = expanded ? lines : lines.slice(0, 10)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
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
          <span className="text-xs text-white/40">Python</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {expanded ? 'Ver menos' : 'Ver mais'}
          </button>
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
          {!expanded && lines.length > 10 && (
            <div className="text-white/20 text-center mt-2">... {lines.length - 10} linhas ocultas</div>
          )}
        </pre>
      </div>
    </div>
  )
}

// ─── PÁGINA PRINCIPAL ───
export default function ProjetosModuloPage() {
  const params = useParams()
  const router = useRouter()
  const [projetos, setProjetos] = useState<ProjetoModulo[]>([])
  const [moduloInfo, setModuloInfo] = useState<any>(null)
  const [selectedProject, setSelectedProject] = useState<ProjetoModulo | null>(null)
  const [activeCard, setActiveCard] = useState<'explicacao' | 'codigo' | 'resultado' | 'colab'>('explicacao')

  const moduloId = params?.modulo as string || 'fundamentos'

  useEffect(() => {
    // Encontra o módulo no doctorate.ts
    const part = parts.find(p => p.id === moduloId)
    if (part) {
      setModuloInfo(part)
    }

    // Carrega os projetos do módulo
    const projetosModulo = projetosPorModulo[moduloId] || []
    setProjetos(projetosModulo)
  }, [moduloId])

  const colors = CORES_MODULO[moduloId] || CORES_MODULO.fundamentos

  // ─── SE NÃO ENCONTROU O MÓDULO ───
  if (!moduloInfo) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white/80 mb-2">Módulo não encontrado</h1>
          <Link href="/" className="text-white/40 hover:text-white transition-colors">
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

  if (projetos.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0f1e]">
        <Header progress={0} temaId={moduloId} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <Link 
            href={`/${moduloId}`}
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-4"
          >
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

  // ─── RENDERIZA O PROJETO SELECIONADO ───
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

    return (
      <div className="space-y-6">
        {/* ─── CARDS DE NAVEGAÇÃO ─── */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'explicacao', label: '📖 Sobre', icon: '📖' },
            { id: 'codigo', label: '💻 Código', icon: '💻' },
            { id: 'resultado', label: '📊 Resultado', icon: '📊' },
            { id: 'colab', label: '🚀 Colab', icon: '🚀' }
          ].map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id as any)}
              className={`p-3 rounded-lg text-center transition-all ${
                activeCard === card.id
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/5 border border-white/5 hover:bg-white/10'
              }`}
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
            {activeCard === 'explicacao' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📖</span> Sobre o Projeto
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {selectedProject.explicacao || selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {selectedProject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeCard === 'codigo' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>💻</span> Código Exemplo
                </h3>
                <CodigoCard codigo={selectedProject.codigo} colors={colors} />
                <div className="flex gap-2">
                  {selectedProject.repo && (
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors text-xs"
                    >
                      <GithubIcon size={14} /> Ver no GitHub
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeCard === 'resultado' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📊</span> Resultado Visual
                </h3>
                <div className="bg-[#0a0f1e] rounded-lg border border-white/5 p-6 min-h-50 flex items-center justify-center">
                  {selectedProject.resultado ? (
                    <div className="text-center">
                      <div className="text-4xl mb-2">✅</div>
                      <p className="text-white/60 text-sm">{selectedProject.resultado}</p>
                    </div>
                  ) : (
                    <div className="text-center text-white/30">
                      <div className="text-4xl mb-2">🔄</div>
                      <p className="text-sm">Resultado em desenvolvimento</p>
                    </div>
                  )}
                </div>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors text-xs"
                  >
                    <ExternalLink size={14} /> Ver Demo
                  </a>
                )}
              </div>
            )}

            {activeCard === 'colab' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🚀</span> Executar no Google Colab
                </h3>
                {selectedProject.colab ? (
                  <div className="space-y-4">
                    <p className="text-white/60 text-sm">
                      Clique no botão abaixo para abrir este projeto no Google Colab e executar o código interativamente.
                    </p>
                    <div className="flex items-center gap-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="text-3xl">🐍</div>
                      <div>
                        <p className="text-sm font-medium text-white/80">Google Colab</p>
                        <p className="text-xs text-white/40">Ambiente Python gratuito com GPU</p>
                      </div>
                      <a
                        href={selectedProject.colab}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
                      >
                        <Play size={16} /> Abrir no Colab
                      </a>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg border border-blue-500/20 p-4">
                      <p className="text-xs text-white/40 flex items-start gap-2">
                        <AlertCircle size={14} className="shrink-0 mt-0.5 text-blue-400" />
                        <span>Para executar: <br />
                          1. Clique em "Abrir no Colab" <br />
                          2. Execute as células em ordem (Shift+Enter) <br />
                          3. O notebook já contém todas as dependências instaladas
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/40">
                    <div className="text-4xl mb-2">⏳</div>
                    <p>Link do Colab em breve</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ─── STATUS E PROGRESSO ─── */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <StatusBadge status={selectedProject.status} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30">{selectedProject.tech.join(' • ')}</span>
            </div>
          </div>
          {selectedProject.progress !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30">Progresso</span>
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${selectedProject.progress}%`,
                    background: colors.primary
                  }}
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href={`/${moduloId}`}
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Voltar para {moduloInfo.title}
          </Link>
          
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
            >
              <span className="text-3xl">{moduloInfo.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Projetos</h1>
              <p className="text-white/40 text-sm">
                {moduloInfo.title} • {projetos.length} projetos
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── LAYOUT: LISTA DE PROJETOS + DETALHES ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ─── LISTA DE PROJETOS ─── */}
          <div className="lg:col-span-1 space-y-2">
            {projetos.map((projeto) => (
              <motion.button
                key={projeto.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
                onClick={() => {
                  setSelectedProject(projeto)
                  setActiveCard('explicacao')
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedProject?.id === projeto.id
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
                style={selectedProject?.id === projeto.id ? { borderColor: colors.primary } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{projeto.icon}</div>
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

          {/* ─── DETALHES DO PROJETO ─── */}
          <div className="lg:col-span-2">
            {renderProjetoDetalhes()}
          </div>
        </div>
      </div>

      <Footer temaId={moduloId} />
    </div>
  )
}