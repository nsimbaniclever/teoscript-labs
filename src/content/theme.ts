// src/content/theme.ts

export const theme: Record<
  string,
  { color: string; ink: string; dark: string; paper: string; hw: string; highlight: string; highlightClara: string }
> = {
  // ════════════════════════════════════════════
  // 1. FUNDAMENTOS DE COMPUTAÇÃO - CINZA
  // ════════════════════════════════════════════
  'fundamentos': {
    color: "#8b7355",
    ink: "#4a3b2a",
    dark: "dark-fundamentos-1",
    paper: "paper-fundamentos-1",
    hw: "hw-kalam",
    highlight: "#fbbf24",
    highlightClara: "#fde68a",
  },

  // ════════════════════════════════════════════
  // 2. MATEMÁTICA - AZUL
  // ════════════════════════════════════════════
  matematica: {
    color: "#2557d0",
    ink: "#1e3a8a",
    dark: "dark-matematica",
    paper: "paper-matematica",
    hw: "hw-caveat",
    highlight: "#d97706",
    highlightClara: "#f59e0b",
  },

  // ════════════════════════════════════════════
  // 3. ALGORITMOS - VERDE MATRIX
  // ════════════════════════════════════════════
  algoritmos: {
    color: "#00ff41",
    ink: "#14532d",
    dark: "dark-algoritmos",
    paper: "paper-algoritmos",
    hw: "hw-patrick",
    highlight: "#fbbf24",
    highlightClara: "#fde68a",
  },

  // ════════════════════════════════════════════
  // 4. MACHINE LEARNING - ROXO
  // ════════════════════════════════════════════
  ml: {
    color: "#a78bfa",
    ink: "#5b21b6",
    dark: "dark-ml",
    paper: "paper-ml",
    hw: "hw-patrick",
    highlight: "#fbbf24",
    highlightClara: "#fde68a",
  },
  'ml-inter': {
    color: "#8b5cf6",
    ink: "#5b21b6",
    dark: "dark-ml-inter",
    paper: "paper-ml-inter",
    hw: "hw-patrick",
    highlight: "#fbbf24",
    highlightClara: "#fde68a",
  },
  'ml-adv': {
  color: "#4c1d95",      // ← Roxo muito escuro
  ink: "#2e1065",        // ← Roxo quase preto
  dark: "dark-ml-adv",
  paper: "paper-ml-adv",
  hw: "hw-patrick",
  highlight: "#fbbf24",
  highlightClara: "#fde68a",
},

  // ════════════════════════════════════════════
  // 5. FEDERADO + PRIVACIDADE - VERMELHO
  // ════════════════════════════════════════════
  federado: {
    color: "#dc2626",
    ink: "#7f1d1d",
    dark: "dark-federado",
    paper: "paper-federado",
    hw: "hw-kalam",
    highlight: "#fbbf24",
    highlightClara: "#fde68a",
  },

  // ════════════════════════════════════════════
  // 6. BANCO DE DADOS E SQL - VERDE
  // ════════════════════════════════════════════
  database: {
    color: "#22c55e",
    ink: "#14532d",
    dark: "dark-database",
    paper: "paper-database",
    hw: "hw-caveat",
    highlight: "#ffffff",
    highlightClara: "#f1f5f9",
  },

  // ════════════════════════════════════════════
  // 7. REDES E SISTEMAS DISTRIBUÍDOS - CIANO
  // ════════════════════════════════════════════
  redes: {
    color: "#06b6d4",
    ink: "#164e63",
    dark: "dark-redes",
    paper: "paper-redes",
    hw: "hw-kalam",
    highlight: "#ffffff",
    highlightClara: "#f1f5f9",
  },

  // ════════════════════════════════════════════
  // 7. REDES E SISTEMAS DISTRIBUÍDOS - CIANO
  // ════════════════════════════════════════════
 rede: { 
    color: '#0d9488', 
    ink: '#14b8a6',
    dark: "dark-redes",
    paper: "paper-redes",
    hw: "hw-kalam", 
    highlight: '#f0faff',
    highlightClara: "#f1f5f9",
},

  // ════════════════════════════════════════════
  // 8. ARQUITETURA DE COMPUTADORES - LARANJA
  // ════════════════════════════════════════════
  arquitetura: {
    color: "#ea580c",
    ink: "#7c2d12",
    dark: "dark-arquitetura",
    paper: "paper-arquitetura",
    hw: "hw-patrick",
    highlight: "#fbbf24",
    highlightClara: "#fde68a",
  },

  // ════════════════════════════════════════════
  // 9. ENGENHARIA DE SOFTWARE - ROSA
  // ════════════════════════════════════════════
  engenharia: {
    color: "#ec4899",
    ink: "#831843",
    dark: "dark-engenharia",
    paper: "paper-engenharia",
    hw: "hw-caveat",
    highlight: "#ffffff",
    highlightClara: "#f1f5f9",
  },

  // ════════════════════════════════════════════
  // 10. ENGENHARIA DE DADOS E DATA SCIENCE - CIANO
  // ════════════════════════════════════════════
  'engenharia-dados': {
    color: "#00d4ff",
    ink: "#0a2a3a",
    dark: "dark-engenharia-dados",
    paper: "paper-engenharia-dados",
    hw: "hw-patrick",
    highlight: "#ffffff",
    highlightClara: "#f1f5f9",
  },
};