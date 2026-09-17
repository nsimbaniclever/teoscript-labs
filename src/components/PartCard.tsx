// src/components/PartCard.tsx
"use client";

import { motion } from "framer-motion";
import type { Part } from "@/content/doctorate";
import { theme } from "@/content/theme";
import ProgressBar from "./ProgressBar";

// ─── CORES ÚNICAS POR TEMA ───
const CORES_POR_TEMA: Record<string, string> = {
  fundamentos: "#8b7355",
  matematica: "#2557d0",
  algoritmos: "#00ff41",
  ml: "#a78bfa",
  federado: "#dc2626",
  database: "#22c55e",
  redes: "#06b6d4",
  rede: "#0d9488",
  arquitetura: "#ea580c",
  engenharia: "#ec4899",
  "engenharia-dados": "#00d4ff",
};

// ─── FUNDOS TEMÁTICOS PARA OS CARDS ───
const CARD_BACKGROUNDS: Record<string, { bg: string; pattern: string }> = {
  fundamentos: {
    bg: "linear-gradient(145deg, #0a0f1e, #141418)",
    pattern: `
      radial-gradient(circle at 30% 70%, rgba(139,115,85,0.08) 0%, transparent 50%),
      repeating-linear-gradient(0deg, rgba(139,115,85,0.03) 0px, rgba(139,115,85,0.03) 1px, transparent 1px, transparent 12px)
    `,
  },
  matematica: {
    bg: "linear-gradient(145deg, #0a0f1e, #111827)",
    pattern: `
      radial-gradient(circle at 20% 80%, rgba(37,87,208,0.08) 0%, transparent 50%),
      repeating-linear-gradient(0deg, rgba(37,87,208,0.04) 0px, rgba(37,87,208,0.04) 1px, transparent 1px, transparent 24px),
      repeating-linear-gradient(90deg, rgba(37,87,208,0.04) 0px, rgba(37,87,208,0.04) 1px, transparent 1px, transparent 24px)
    `,
  },
  algoritmos: {
    bg: "linear-gradient(145deg, #0a0f1e, #0a1a0a)",
    pattern: `
      radial-gradient(circle at 70% 20%, rgba(0,255,65,0.06) 0%, transparent 50%),
      repeating-linear-gradient(0deg, rgba(0,255,65,0.03) 0px, rgba(0,255,65,0.03) 1px, transparent 1px, transparent 20px)
    `,
  },
  ml: {
    bg: "linear-gradient(145deg, #0a0f1e, #140a1e)",
    pattern: `
      radial-gradient(circle at 50% 50%, rgba(167,139,250,0.06) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(244,114,182,0.04) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(167,139,250,0.03) 0%, transparent 30%)
    `,
  },
  federado: {
    bg: "linear-gradient(145deg, #0a0f1e, #1a0a0a)",
    pattern: `
      radial-gradient(circle at 30% 30%, rgba(220,38,38,0.06) 0%, transparent 50%),
      repeating-linear-gradient(45deg, rgba(220,38,38,0.02) 0px, rgba(220,38,38,0.02) 12px, transparent 12px, transparent 24px)
    `,
  },
  database: {
    bg: "linear-gradient(145deg, #0a0f1e, #0a1220)",
    pattern: `
      radial-gradient(circle at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 50%),
      repeating-linear-gradient(0deg, rgba(34,197,94,0.03) 0px, rgba(34,197,94,0.03) 1px, transparent 1px, transparent 30px),
      repeating-linear-gradient(90deg, rgba(34,197,94,0.03) 0px, rgba(34,197,94,0.03) 1px, transparent 1px, transparent 30px)
    `,
  },
  redes: {
    bg: "linear-gradient(145deg, #0a0f1e, #0a1418)",
    pattern: `
      radial-gradient(circle at 40% 60%, rgba(6,182,212,0.06) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(6,182,212,0.03) 0%, transparent 30%)
    `,
  },
  rede: {
    bg: "linear-gradient(145deg, #0a0f1e, #0a1418)",
    pattern: `
      radial-gradient(circle at 40% 60%, rgba(13,148,136,0.06) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(13,148,136,0.03) 0%, transparent 30%)
    `,
},
  arquitetura: {
    bg: "linear-gradient(145deg, #0a0f1e, #1a0e08)",
    pattern: `
      radial-gradient(circle at 50% 50%, rgba(234,88,12,0.06) 0%, transparent 50%),
      repeating-linear-gradient(0deg, rgba(234,88,12,0.02) 0px, rgba(234,88,12,0.02) 1px, transparent 1px, transparent 16px),
      repeating-linear-gradient(90deg, rgba(234,88,12,0.02) 0px, rgba(234,88,12,0.02) 1px, transparent 1px, transparent 16px)
    `,
  },
  engenharia: {
    bg: "linear-gradient(145deg, #0a0f1e, #1a0a14)",
    pattern: `
      radial-gradient(circle at 60% 40%, rgba(236,72,153,0.06) 0%, transparent 50%),
      repeating-linear-gradient(45deg, rgba(236,72,153,0.02) 0px, rgba(236,72,153,0.02) 2px, transparent 2px, transparent 20px)
    `,
  },
  "engenharia-dados": {
    bg: "linear-gradient(145deg, #0a0e27, #111833)",
    pattern: `
      radial-gradient(circle at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(124,58,237,0.04) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(0,212,255,0.03) 0%, transparent 30%)
    `,
  },
};

// ─── ELEMENTOS DECORATIVOS POR TEMA ───
const ELEMENTOS_TEMA: Record<string, React.ReactNode> = {
  fundamentos: (
    <div className="absolute top-1/3 right-4 font-mono text-[#8b7355]/10 text-xs">0xFF</div>
  ),
  matematica: (
    <div className="absolute top-1/4 right-4 text-3xl text-[#2557d0]/10 animate-pulse">∫</div>
  ),
  algoritmos: (
    <div className="absolute bottom-1/4 right-6 font-mono text-[#00ff41]/10 text-xs animate-pulse">
      010110
    </div>
  ),
  ml: (
    <div className="absolute top-1/3 right-3 w-8 h-8 rounded-full border border-[#a78bfa]/10 animate-pulse" />
  ),
  federado: (
    <div className="absolute top-1/4 right-4 text-2xl text-[#dc2626]/10">🔒</div>
  ),
  database: (
    <div className="absolute top-1/3 right-5 text-[#22c55e]/10 text-sm font-mono">SQL</div>
  ),
  redes: (
    <div className="absolute bottom-1/3 right-4 text-[#06b6d4]/10 text-sm">📡</div>
  ),
  rede: (
    <div className="absolute bottom-1/3 right-4 text-[#0891b2]/10 text-sm">📡</div>
),
  arquitetura: (
    <div className="absolute top-1/4 right-3 text-[#ea580c]/10 text-sm">⚡</div>
  ),
  engenharia: (
    <div className="absolute bottom-1/4 right-5 text-[#ec4899]/10 text-sm">UML</div>
  ),
  "engenharia-dados": (
    <div className="absolute top-1/3 right-4 text-[#00d4ff]/10 text-sm font-mono animate-pulse">0xDATA</div>
  ),
};

export default function PartCard({
  part,
  index,
  done,
  onSelect,
}: {
  part: Part;
  index: number;
  done: string[];
  onSelect: () => void;
}) {
  const cor = CORES_POR_TEMA[part.id] || "#64748b";
  const bg = CARD_BACKGROUNDS[part.id] || CARD_BACKGROUNDS.fundamentos;
  const elementoDecorativo = ELEMENTOS_TEMA[part.id];

  const all = part.sections.flatMap((s) => s.topics);
  const pct = Math.round((all.filter((x) => done.includes(x.id)).length / all.length) * 100);

  return (
    <motion.button
      layoutId={part.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        borderColor: `${cor}30`,
        background: bg.bg,
        backgroundImage: bg.pattern,
        backgroundSize: "28px 28px",
      }}
      onClick={onSelect}
      className="relative overflow-hidden rounded-xl text-left border border-white/5 transition-all duration-300 shadow-md hover:shadow-xl group"
    >
      {/* ─── BRILHO SUTIL NO HOVER ─── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${cor}15, transparent 70%)`,
        }}
      />

      {/* ─── ELEMENTO DECORATIVO ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {elementoDecorativo}
      </div>

      {/* ─── CONTEÚDO ─── */}
      <div className="relative z-10 p-5 md:p-6">
        <div className="mb-3 text-4xl drop-shadow-[0_0_20px_rgba(255,255,255,.15)]">
          {part.icon}
        </div>
        <h2 className="mb-4 text-lg font-bold text-white/90 drop-shadow-sm">
          {part.title}
        </h2>
        <ProgressBar small value={pct} color={cor} />
        <div className="mt-3 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 font-mono text-[11px] font-bold"
            style={{ background: `${cor}20`, color: cor }}
          >
            {all.length} tópicos
          </span>
          <span className="font-mono text-xs font-bold" style={{ color: cor }}>
            {pct}%
          </span>
        </div>
      </div>
    </motion.button>
  );
}