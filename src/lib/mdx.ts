// src/lib/mdx.ts
'use server'

import fs from 'fs/promises'
import path from 'path'
import katex from 'katex'

export interface MdxContent {
  content: string
  frontmatter: Record<string, any>
  references: Array<{
    author: string
    title: string
    year: number
    journal?: string
    publisher?: string
    edition?: string
    doi?: string
    url?: string
  }>
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function findMdxFile(slug: string): Promise<string | null> {
  const cleanSlug = slug
    .replace(/\.mdx?$/i, '')
    .replace(/^\/+|\/+$/g, '')

  const possiblePaths = [
    path.join(process.cwd(), 'src/content/parts', `${cleanSlug}.mdx`),
    path.join(process.cwd(), 'src/content/parts', `${cleanSlug}.md`),
    path.join(process.cwd(), 'src/content/aulas', `${cleanSlug}.mdx`),
    path.join(process.cwd(), 'src/content/aulas', `${cleanSlug}.md`),
  ]

  console.log(`🔍 [MDX] Procurando arquivo para slug: "${cleanSlug}"`)

  for (const filePath of possiblePaths) {
    if (await fileExists(filePath)) {
      return filePath
    }
  }

  return null
}

function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  const frontmatter: Record<string, any> = {}
  let body = content

  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)

  if (match) {
    const frontmatterText = match[1]
    body = match[2]

    const lines = frontmatterText.split('\n')
    let i = 0

    while (i < lines.length) {
      const line = lines[i]
      const trimmed = line.trim()

      if (!trimmed) {
        i++
        continue
      }

      const colonIndex = line.indexOf(':')
      if (colonIndex > 0 && !line.startsWith('  ')) {
        const key = line.slice(0, colonIndex).trim()
        let value = line.slice(colonIndex + 1).trim()

        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }

        if (key === 'references' && value === '') {
          const refs: any[] = []
          i++

          while (i < lines.length) {
            const nextLine = lines[i]
            const nextTrimmed = nextLine.trim()

            if (!nextLine.startsWith('  ') && !nextLine.startsWith('\t') && nextTrimmed && !nextTrimmed.startsWith('-')) {
              break
            }

            if (nextTrimmed.startsWith('-')) {
              const obj: Record<string, any> = {}

              const firstField = nextTrimmed.slice(1).trim()
              if (firstField.includes(':')) {
                const idx = firstField.indexOf(':')
                const k = firstField.slice(0, idx).trim()
                const v = firstField.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
                if (k && v) {
                  if (k === 'year') {
                    obj[k] = parseInt(v) || v
                  } else {
                    obj[k] = v
                  }
                }
              }

              let j = i + 1
              while (j < lines.length && (lines[j].startsWith('  ') || lines[j].startsWith('\t'))) {
                const subLine = lines[j].trim()
                if (subLine.includes(':')) {
                  const idx = subLine.indexOf(':')
                  const k = subLine.slice(0, idx).trim()
                  const v = subLine.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
                  if (k && v) {
                    if (k === 'year') {
                      obj[k] = parseInt(v) || v
                    } else {
                      obj[k] = v
                    }
                  }
                }
                j++
              }

              if (Object.keys(obj).length > 0) {
                refs.push(obj)
              }
              i = j
            } else {
              i++
            }
          }

          frontmatter[key] = refs
          continue
        }

        if (value === '' && (key === 'tags' || key === 'keywords' || key === 'authors')) {
          const arr: string[] = []
          i++
          while (i < lines.length) {
            const nextLine = lines[i]
            const nextTrimmed = nextLine.trim()
            if (!nextLine.startsWith('  ') && !nextLine.startsWith('\t') && nextTrimmed) {
              break
            }
            if (nextTrimmed.startsWith('-')) {
              const item = nextTrimmed.slice(1).trim().replace(/^["']|["']$/g, '')
              if (item) arr.push(item)
            }
            i++
          }
          frontmatter[key] = arr
          continue
        }

        frontmatter[key] = value
        i++
      } else {
        i++
      }
    }
  }

  return { frontmatter, body }
}

function extractReferencesFromBody(body: string): { references: any[]; cleanedBody: string } {
  const references: any[] = []
  let cleanedBody = body

  const refsRegex = /^##\s*Referências?\s*Bibliográficas?\s*\n([\s\S]*?)(?=\n##\s|$)/im
  const match = body.match(refsRegex)

  if (match) {
    const refsText = match[1]
    cleanedBody = body.replace(match[0], '')

    const lines = refsText.split('\n')
    let currentRef: any = {}
    let inRef = false

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      if (trimmed.startsWith('-') || trimmed.match(/^\d+\./)) {
        if (Object.keys(currentRef).length > 0) {
          references.push(currentRef)
        }
        currentRef = {}
        inRef = true

        const cleanLine = trimmed.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '')

        const authorMatch = cleanLine.match(/^([^,(]+(?:\s*,\s*[^,]+)*)\s*\((\d{4})\)\.?\s*(.+)/)
        if (authorMatch) {
          currentRef.author = authorMatch[1].trim()
          currentRef.year = parseInt(authorMatch[2])
          currentRef.title = authorMatch[3].trim()
        } else {
          currentRef._raw = cleanLine
        }
      } else if (inRef && trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':')
        const keyClean = key.trim().toLowerCase()
        const valueClean = valueParts.join(':').trim()

        if (keyClean === 'publisher' || keyClean === 'editora') {
          currentRef.publisher = valueClean
        } else if (keyClean === 'journal' || keyClean === 'periódico' || keyClean === 'periodico') {
          currentRef.journal = valueClean
        } else if (keyClean === 'doi') {
          currentRef.doi = valueClean
        } else if (keyClean === 'url' || keyClean === 'link') {
          currentRef.url = valueClean
        } else if (keyClean === 'edition' || keyClean === 'edição' || keyClean === 'edicao') {
          currentRef.edition = valueClean
        }
      } else if (inRef && trimmed) {
        if (currentRef.title) {
          currentRef.title += ' ' + trimmed
        } else if (currentRef._raw) {
          currentRef._raw += ' ' + trimmed
        }
      }
    }

    if (Object.keys(currentRef).length > 0) {
      references.push(currentRef)
    }
  }

  return { references, cleanedBody }
}

function processLatex(text: string): string {
  let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (_: string, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false,
        trust: true,
      })
    } catch {
      return `[Erro na fórmula: ${formula}]`
    }
  })

  result = result.replace(/\$(.*?)\$/g, (_: string, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
        trust: true,
      })
    } catch {
      return `[Erro na fórmula: ${formula}]`
    }
  })

  return result
}

// ═══════════════════════════════════════════════════════════════
// MARKDOWN → HTML (CORRIGIDO)
// ═══════════════════════════════════════════════════════════════
function markdownToHtml(text: string): string {
  let html = text

  // ─── 1. CODE BLOCKS PRIMEIRO (protege contra LaTeX e outros) ───
  html = html.replace(/```(\w*)[ \t]*\r?\n([\s\S]*?)```/g, (_: string, lang: string, code: string) => {
    const preservedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    if (lang === 'mermaid') {
      return `<div class="mermaid-block" data-mermaid="${encodeURIComponent(code.trim())}"><pre class="mermaid-source"><code>${preservedCode}</code></pre></div>`
    }

    if (lang === 'text') {
      return `<pre class="code-block text-block"><code>${preservedCode}</code></pre>`
    }

    const langClass = lang ? `language-${lang}` : ''
    return `<pre class="code-block ${langClass}"><code>${preservedCode}</code></pre>`
  })

  // ─── 2. LATEX (depois de proteger code blocks) ───
  html = processLatex(html)

  // ─── 3. BLOCKQUOTES ───
  html = html.replace(/^>>>\s+(.*$)/gim, (_: string, content: string) => {
    return `<blockquote><blockquote><blockquote><p>${content}</p></blockquote></blockquote></blockquote>`
  })
  html = html.replace(/^>>\s+(.*$)/gim, (_: string, content: string) => {
    return `<blockquote><blockquote><p>${content}</p></blockquote></blockquote>`
  })
  html = html.replace(/^>\s+(.*$)/gim, (_: string, content: string) => {
    return `<blockquote><p>${content}</p></blockquote>`
  })

  // ─── 4. HEADERS ───
  html = html.replace(/^#### (.*$)/gim, (_: string, content: string) => `<h4>${content}</h4>`)
  html = html.replace(/^### (.*$)/gim, (_: string, content: string) => `<h3>${content}</h3>`)
  html = html.replace(/^## (.*$)/gim, (_: string, content: string) => `<h2>${content}</h2>`)
  html = html.replace(/^# (.*$)/gim, (_: string, content: string) => `<h1>${content}</h1>`)

  // ─── 5. NEGRITO + ITÁLICO (***texto***) — PRIMEIRO ───
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, (_: string, content: string) => `<strong class="mdx-bold"><em class="mdx-italic">${content}</em></strong>`)
  html = html.replace(/___(.*?)___/g, (_: string, content: string) => `<strong class="mdx-bold"><em class="mdx-italic">${content}</em></strong>`)

  // ─── 6. NEGRITO (**texto**) ───
  html = html.replace(/\*\*(.*?)\*\*/g, (_: string, content: string) => `<strong class="mdx-bold">${content}</strong>`)
  html = html.replace(/__(.*?)__/g, (_: string, content: string) => `<strong class="mdx-bold">${content}</strong>`)

  // ─── 7. ITÁLICO (*texto* ou _texto_) ───
  html = html.replace(/(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g, (_: string, content: string) => `<em class="mdx-italic">${content}</em>`)
  html = html.replace(/(?<![\w_])_([^_\n]+?)_(?![\w_])/g, (_: string, content: string) => `<em class="mdx-italic">${content}</em>`)

  // ─── 8. INLINE CODE ───
  html = html.replace(/`([^`\n]+)`/g, (_: string, content: string) => `<code class="mdx-inline-code">${content}</code>`)

  // ─── 9. LISTAS ───
  html = html.replace(/^[\s]*[-+*]\s+(.*$)/gim, (_: string, content: string) => `<li data-list="ul">${content}</li>`)
  html = html.replace(/^[\s]*\d+\.\s+(.*$)/gim, (_: string, content: string) => `<li data-list="ol">${content}</li>`)

  // ─── 10. HORIZONTAL RULES ───
  html = html.replace(/^---$/gim, '<hr>')
  html = html.replace(/^\*\*\*$/gim, '<hr>')
  html = html.replace(/^___$/gim, '<hr>')

  // ─── 11. LINKS ───
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, url: string) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
  })

  // ─── 12. IMAGENS ───
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_: string, alt: string, src: string) => {
    return `<img src="${src}" alt="${alt}">`
  })

  // ─── 13. TABELAS ───
  const tableRegex = /\|(.+)\|\s*\n\|([\-|]+)\|\s*\n((?:\|.+?\|\s*\n)+)/g
  html = html.replace(tableRegex, (match: string, header: string, separator: string, rows: string) => {
    const headers = header.split('|').map((h: string) => h.trim()).filter((h: string) => h !== '')
    const cells = rows.split('\n')
      .filter((row: string) => row.trim() !== '')
      .map((row: string) => row.split('|').map((c: string) => c.trim()).filter((c: string) => c !== ''))

    let tableHtml = '<table><thead><tr>'
    for (const h of headers) {
      tableHtml += `<th>${h}</th>`
    }
    tableHtml += '</tr></thead><tbody>'
    for (const row of cells) {
      tableHtml += '<tr>'
      for (const cell of row) {
        tableHtml += `<td>${cell}</td>`
      }
      tableHtml += '</tr>'
    }
    tableHtml += '</tbody></table>'
    return tableHtml
  })

  // ─── 14. PARÁGRAFOS (loop final) ───
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false
  let listType = ''
  let inBlockquote = false
  let blockquoteContent: string[] = []
  let paragraphBuffer: string[] = []
  let inCodeBlock = false
  let inMermaidBlock = false

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(' ')
      if (text.trim()) {
        result.push(`<p>${text.trim()}</p>`)
      }
      paragraphBuffer = []
    }
  }

  const flushBlockquote = () => {
    if (blockquoteContent.length > 0) {
      const content = blockquoteContent.join(' ')
      const cleanContent = content.replace(/<\/?p>/g, '').trim()
      if (cleanContent) {
        result.push(`<blockquote><p>${cleanContent}</p></blockquote>`)
      }
      blockquoteContent = []
      inBlockquote = false
    }
  }

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('<div class="mermaid-block"')) {
      inMermaidBlock = true
      flushParagraph()
      flushBlockquote()
      if (inList) { result.push(`</${listType}>`); inList = false }
      result.push(trimmedLine)
      if (trimmedLine.includes('</div>')) inMermaidBlock = false
      continue
    }

    if (inMermaidBlock) {
      result.push(line)
      if (trimmedLine.includes('</div>')) inMermaidBlock = false
      continue
    }

    if (trimmedLine.startsWith('<pre')) {
      inCodeBlock = true
      flushParagraph()
      flushBlockquote()
      if (inList) { result.push(`</${listType}>`); inList = false }
      result.push(trimmedLine)
      if (trimmedLine.includes('</pre>')) inCodeBlock = false
      continue
    }

    if (inCodeBlock) {
      result.push(line)
      if (trimmedLine.includes('</pre>')) inCodeBlock = false
      continue
    }

    if (!trimmedLine) {
      flushParagraph()
      flushBlockquote()
      if (inList) { result.push(`</${listType}>`); inList = false }
      continue
    }

    if (trimmedLine.startsWith('<blockquote')) {
      if (inBlockquote) {
        blockquoteContent.push(trimmedLine.replace(/<\/?blockquote[^>]*>/g, '').trim())
      } else {
        flushParagraph()
        if (inList) { result.push(`</${listType}>`); inList = false }
        inBlockquote = true
        const content = trimmedLine.replace(/<\/?blockquote[^>]*>/g, '').trim()
        if (content) blockquoteContent.push(content)
      }
      continue
    }

    if (trimmedLine.startsWith('<li')) {
      flushParagraph()
      const isOrdered = trimmedLine.includes('data-list="ol"')
      const novoTipo = isOrdered ? 'ol' : 'ul'

      if (inList && listType !== novoTipo) {
        result.push(`</${listType}>`)
        inList = false
      }

      if (!inList) {
        listType = novoTipo
        result.push(`<${listType}>`)
        inList = true
      }

      const cleanLi = trimmedLine.replace(/\s*data-list="(ul|ol)"/, '')
      result.push(cleanLi)
      continue
    }

    if (trimmedLine.match(/^<h[1-6]>/)) {
      flushParagraph()
      flushBlockquote()
      if (inList) { result.push(`</${listType}>`); inList = false }
      result.push(trimmedLine)
      continue
    }

    if (trimmedLine.startsWith('<table')) {
      flushParagraph()
      flushBlockquote()
      if (inList) { result.push(`</${listType}>`); inList = false }
      result.push(trimmedLine)
      continue
    }

    if (trimmedLine === '<hr>') {
      flushParagraph()
      flushBlockquote()
      if (inList) { result.push(`</${listType}>`); inList = false }
      result.push(trimmedLine)
      continue
    }

    if (inBlockquote) {
      blockquoteContent.push(trimmedLine)
      continue
    }

    if (inList) {
      if (!trimmedLine.startsWith('<li')) {
        result.push(`</${listType}>`)
        inList = false
      } else {
        continue
      }
    }

    paragraphBuffer.push(trimmedLine)
  }

  flushParagraph()
  flushBlockquote()
  if (inList) result.push(`</${listType}>`)

  return result.join('\n')
}

export async function getMdxContent(slug: string): Promise<MdxContent | null> {
  try {
    console.log(`🔍 [MDX] getMdxContent chamado com slug: "${slug}"`)

    const filePath = await findMdxFile(slug)

    if (!filePath) {
      console.error(`❌ [MDX] Arquivo não encontrado para slug: "${slug}"`)
      return null
    }

    console.log(`✅ [MDX] Arquivo encontrado: ${filePath}`)

    const source = await fs.readFile(filePath, 'utf-8')
    console.log(`📄 [MDX] Tamanho do arquivo: ${source.length} bytes`)

    const { frontmatter, body } = parseFrontmatter(source)
    console.log(`📋 [MDX] Frontmatter keys:`, Object.keys(frontmatter))

    const { references: bodyReferences, cleanedBody } = extractReferencesFromBody(body)
    const allReferences = frontmatter.references || bodyReferences || []

    console.log(`📚 [MDX] Referências encontradas: ${allReferences.length}`)

    const htmlContent = markdownToHtml(cleanedBody)
    console.log(`🎨 [MDX] HTML gerado: ${htmlContent.length} chars`)

    return {
      content: htmlContent,
      frontmatter: frontmatter,
      references: allReferences,
    }
  } catch (error) {
    console.error(`❌ [MDX] Erro ao carregar MDX para slug: "${slug}"`, error)
    return null
  }
}