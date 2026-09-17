// src/components/MermaidRenderer.tsx
'use client'

import { useEffect } from 'react'
import mermaid from 'mermaid'

export default function MermaidRenderer({ html }: { html: string }) {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'JetBrains Mono, Fira Code, monospace',
      themeVariables: {
        primaryColor: '#1a1a2e',
        primaryTextColor: '#e2e8f0',
        primaryBorderColor: '#a78bfa',
        lineColor: '#fbbf24',
        secondaryColor: '#2d1b69',
        tertiaryColor: '#1a3a5c',
        background: '#0a0f1e',
        mainBkg: '#1a1a2e',
        nodeBorder: '#a78bfa',
        clusterBkg: '#0a0f1e',
        clusterBorder: '#a78bfa',
        titleColor: '#fbbf24',
        edgeLabelBackground: '#1a1a2e',
      },
    })

    const blocks = document.querySelectorAll('.mermaid-block:not([data-processed])')

    blocks.forEach(async (block) => {
      block.setAttribute('data-processed', 'true')

      const code = decodeURIComponent(block.getAttribute('data-mermaid') || '')
      const id = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`

      try {
        const { svg } = await mermaid.render(id, code)
        block.innerHTML = svg
        block.classList.add('mermaid-rendered')
      } catch (err) {
        console.error('Erro Mermaid:', err)
        block.innerHTML = `<pre class="mermaid-error"><code>${code}</code></pre>`
      }
    })
  }, [html])

  return null
}