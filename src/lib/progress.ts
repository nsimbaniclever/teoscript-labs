// src/lib/progress.ts
"use client";

import { useEffect, useState } from "react";

const KEY = "doctorate-lab-progress";

export function useProgress() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      /* primeiro acesso */
    }
  }, []);

  const toggle = (id: string) => {
    setDone((d) => {
      const next = d.includes(id) ? d.filter((x) => x !== id) : [...d, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* modo privado */
      }
      return next;
    });
  };

  return { done, toggle };
}