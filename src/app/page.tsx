// src/app/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { parts, totalTopics, type Part } from "@/content/doctorate";
import { theme } from "@/content/theme";
import { useProgress } from "@/lib/progress";
import PartCard from "@/components/PartCard";
import FocusPanel from "@/components/FocusPanel";
import Particles from "@/components/Particles";

function Thumb({ part, onClick }: { part: Part; onClick: () => void }) {
  const t = theme[part.id];
  return (
    <motion.button
      layoutId={part.id}
      onClick={onClick}
      className={`glass flex items-center gap-2 rounded-xl border px-3 py-2 opacity-40 blur-[1px] transition hover:opacity-90 hover:blur-0 ${t.dark}`}
      style={{ borderColor: `${t.color}44` }}
    >
      <span className="text-xl">{part.icon}</span>
      <span className="hidden text-xs font-semibold text-slate-200 md:block">{part.title}</span>
    </motion.button>
  );
}

export default function Home() {
  const { done, toggle } = useProgress();
  const [focus, setFocus] = useState<Part | null>(null);

  const total = totalTopics || 1;
  const pct = Math.round((done.length / total) * 100);

  const filteredParts = parts.filter((p) =>
    ["fundamentos", "matematica", "algoritmos", 'engenharia-dados', "ml", "ml-inter", "ml-adv", "federado", "database", "redes","rede", "arquitetura", "engenharia"].includes(
      p.id
    )
  );

  return (
    <main className="relative min-h-screen overflow-x-clip">
      {/* ─── BLOBS DE FUNDO ─── */}
      <div className="blob left-[-10%] top-[-10%] h-[45vh] w-[45vh] bg-violet-600/25" />
      <div className="blob right-[-10%] top-[30%] h-[40vh] w-[40vh] bg-cyan-500/20" style={{ animationDelay: "-8s" }} />
      <Particles />

      {/* ─── RADIAL GRADIENT DINÂMICO ─── */}
      <motion.div
        key={focus?.id ?? "home"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed inset-0 -z-10"
        style={{
          background: focus
            ? `radial-gradient(1200px 700px at 50% 50%, ${theme[focus.id]?.color || "#64748b"}26, transparent), #050510`
            : "#050510",
        }}
      />

      {/* ─── LOGO CENTRALIZADO (SEM HEADER) ─── */}
      <div className="flex justify-center pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)"
            }}
          >
            <span className="text-xl font-black text-white">T</span>
          </div>
          <span className="text-2xl font-bold text-white/90 tracking-tight">
            TeoScript <span className="text-[#fbbf24]">Labs</span>
          </span>
        </motion.div>
      </div>

      {/* ─── CONTEÚDO PRINCIPAL ─── */}
      <section
        className={
          focus
            ? "mx-auto flex min-h-screen max-w-6xl items-center justify-center px-3 pb-32 pt-4"
            : "mx-auto max-w-6xl px-3 pb-44 pt-10 md:px-4 md:pt-16"
        }
      >
        <LayoutGroup>
          <AnimatePresence>
            {!focus ? (
              <motion.div
                key="grid"
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="grid w-full gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
              >
                {filteredParts.map((p, i) => (
                  <PartCard key={p.id} part={p} index={i} done={done} onSelect={() => setFocus(p)} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="focus"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <FocusPanel part={focus} done={done} toggle={toggle} onClose={() => setFocus(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </section>

      {/* ─── MENU FLUTUANTE (THUMBS) ─── */}
      <AnimatePresence>
        {focus && (
          <motion.nav
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="glass fixed inset-x-2 bottom-3 z-40 mx-auto flex w-fit max-w-[96vw] flex-wrap items-center justify-center gap-2 rounded-2xl px-3 py-2 md:inset-x-0 md:bottom-4 md:px-4 md:py-3"
          >
            {filteredParts
              .filter((p) => p.id !== focus.id)
              .map((p) => (
                <Thumb key={p.id} part={p} onClick={() => setFocus(p)} />
              ))}
            <button
              onClick={() => setFocus(null)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
            >
              ✕ fechar
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </main>
  );
}