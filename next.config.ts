import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  outputFileTracingIncludes: {
    '/[modulo]/projetos': ['./src/content/projetos/**/*.md', './src/content/projetos/**/*.mdx'],
    '/aula/[...slug]': ['./src/content/parts/**/*.mdx', './src/content/aulas/**/*.mdx'],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: ['rehype-katex'],
  },
});

export default withMDX(nextConfig);