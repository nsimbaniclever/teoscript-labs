// src/components/CodeRenderer.tsx
'use client'

import { useEffect } from 'react'

import Prism from 'prismjs'

import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'

export default function CodeRenderer({ html }: { html: string }) {
  useEffect(() => {
    const blocks = document.querySelectorAll('pre.code-block:not([data-highlighted])')

    blocks.forEach((pre) => {
      if (pre.classList.contains('text-block')) return
      if (pre.classList.contains('mermaid-source')) return

      const codeEl = pre.querySelector('code')
      if (!codeEl) return

      const langClass = Array.from(pre.classList).find((c) => c.startsWith('language-'))
      const lang = langClass ? langClass.replace('language-', '') : 'plain'

      const rawCode = codeEl.textContent || ''

      pre.setAttribute('data-highlighted', 'true')

      const grammar = Prism.languages[lang]
      if (grammar) {
        try {
          codeEl.innerHTML = Prism.highlight(rawCode, grammar, lang)
        } catch (err) {
          console.warn(`⚠️ Falha ao destacar ${lang}:`, err)
        }
      } else {
        console.warn(`⚠️ Linguagem não registrada: ${lang}`)
      }
    })
  }, [html])

  return null
}