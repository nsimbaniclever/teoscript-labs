// src/lib/projetos.ts
'use server'

import fs from 'fs/promises'
import path from 'path'

export interface Projeto {
  id: string
  title: string
  description: string
  status: 'concluido' | 'em-desenvolvimento' | 'planejado'
  tags: string[]
  tech: string[]
  linguagem: string
  progress?: number
  link?: string
  repo?: string
  sobre: string
  codigo?: string
  resultado?: string
  slug: string
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  const frontmatter: Record<string, any> = {}
  let body = content

  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { frontmatter, body }

  const frontmatterText = match[1]
  body = match[2]

  const lines = frontmatterText.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    if (!trimmed) { i++; continue }

    const colonIndex = line.indexOf(':')
    if (colonIndex > 0 && !line.startsWith('  ') && !line.startsWith('\t')) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      if (value === '' && (key === 'tags' || key === 'tech' || key === 'keywords')) {
        const arr: string[] = []
        i++
        while (i < lines.length) {
          const nextLine = lines[i]
          const nextTrimmed = nextLine.trim()
          if (!nextLine.startsWith('  ') && !nextLine.startsWith('\t') && nextTrimmed) break
          if (nextTrimmed.startsWith('-')) {
            const item = nextTrimmed.slice(1).trim().replace(/^["']|["']$/g, '')
            if (item) arr.push(item)
          }
          i++
        }
        frontmatter[key] = arr
        continue
      }

      if (key === 'progress' && value !== '') {
        frontmatter[key] = parseInt(value) || 0
        i++
        continue
      }

      frontmatter[key] = value
      i++
    } else {
      i++
    }
  }

  return { frontmatter, body }
}

function extrairSecoes(body: string): {
  sobre: string
  codigo?: string
  resultado?: string
} {
  const sobreMatch = body.match(/##\s*Sobre[^\n]*\n([\s\S]*?)(?=\n##\s|$)/i)
  const sobre = sobreMatch ? sobreMatch[1].trim() : ''

  const codigoMatch = body.match(/```(\w+)?\s*\n([\s\S]*?)```/)
  const codigo = codigoMatch ? codigoMatch[2].trim() : undefined

  const resultadoMatch = body.match(/##\s*Resultado[^\n]*\n([\s\S]*?)(?=\n##\s|$)/i)
  const resultado = resultadoMatch ? resultadoMatch[1].trim() : undefined

  return { sobre, codigo, resultado }
}

export async function getProjetosDoModulo(moduloId: string): Promise<Projeto[]> {
  const projetosDir = path.join(process.cwd(), 'src/content/projetos', moduloId)

  if (!(await fileExists(projetosDir))) {
    return []
  }

  const files = await fs.readdir(projetosDir)
  const projetos: Projeto[] = []

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue

    const filePath = path.join(projetosDir, file)
    const source = await fs.readFile(filePath, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(source)
    const { sobre, codigo, resultado } = extrairSecoes(body)

    const slug = `${moduloId}/${file.replace(/\.mdx?$/, '')}`

    projetos.push({
      id: frontmatter.id || file.replace(/\.mdx?$/, ''),
      title: frontmatter.title || 'Sem título',
      description: frontmatter.description || '',
      status: frontmatter.status || 'planejado',
      tags: frontmatter.tags || [],
      tech: frontmatter.tech || [],
      linguagem: frontmatter.linguagem || 'Python',
      progress: frontmatter.progress,
      link: frontmatter.link,
      repo: frontmatter.repo,
      sobre,
      codigo,
      resultado,
      slug,
    })
  }

  const ordem = { 'concluido': 0, 'em-desenvolvimento': 1, 'planejado': 2 }
  projetos.sort((a, b) => ordem[a.status] - ordem[b.status])

  return projetos
}