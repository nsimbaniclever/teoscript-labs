import os
import re
from pathlib import Path

# ─── ESTRUTURA BASE ───
BASE_DIR = Path("src/content/aulas")

# ─── MAPEAMENTO COMPLETO DOS SLUGS PARA ESTRUTURA DE PASTAS ───
# Extraído do arquivo fornecido

TEMAS = {
    "fundamentos": {
        "secoes": {
            "fundamento-computacao": "Fundamentos da Computação",
            "circuito-combinacionais": "Circuitos Combinacionais",
            "ram": "Tipos de RAM",
            "arquiteturas": "Arquiteturas Avançadas — Pipeline",
        },
        "topicos": {
            # ─── 1. FUNDAMENTOS DA COMPUTAÇÃO ───
            "fundamentos-1": {
                "titulo": "Introdução à Computação",
                "secao": "fundamento-computacao",
                "subpasta": "introducao",
                "aulas": [
                    ("Máquina de Turing — Definição formal", "fundamentos/fundamento-computacao/introducao/turing"),
                    ("Componentes físicos visíveis", "fundamentos/fundamento-computacao/introducao/componentes-visiveis"),
                    ("Componentes internos", "fundamentos/fundamento-computacao/introducao/componentes-internos"),
                ]
            },
            "representacao-1": {
                "titulo": "Sistemas de Numeração",
                "secao": "fundamento-computacao",
                "subpasta": "representacao",
                "aulas": [
                    ("Sistema Binário — Base 2", "fundamentos/fundamento-computacao/representacao/binario"),
                    ("Sistema Octal — Base 8", "fundamentos/fundamento-computacao/representacao/octal"),
                    ("Sistema Decimal — Base 10", "fundamentos/fundamento-computacao/representacao/decimal"),
                    ("Sistema Hexadecimal — Base 16", "fundamentos/fundamento-computacao/representacao/hexadecimal"),
                ]
            },
            "caracteres-1": {
                "titulo": "Linguagem das Máquinas e Padronização",
                "secao": "fundamento-computacao",
                "subpasta": "caracteres",
                "aulas": [
                    ("Tabela ASCII", "fundamentos/fundamento-computacao/caracteres/ascii"),
                    ("Tabela Unicode", "fundamentos/fundamento-computacao/caracteres/unicode"),
                    ("UTF-8, UTF-16, UTF-32", "fundamentos/fundamento-computacao/caracteres/utf"),
                ]
            },
            "inteiros-1": {
                "titulo": "Representação de Inteiros",
                "secao": "fundamento-computacao",
                "subpasta": "inteiros",
                "aulas": [
                    ("Sinal-magnitude", "fundamentos/fundamento-computacao/inteiros/sinal-magnitude"),
                    ("Complemento de 1", "fundamentos/fundamento-computacao/inteiros/complemento-1"),
                    ("Complemento de 2 — Padrão atual", "fundamentos/fundamento-computacao/inteiros/complemento-2"),
                ]
            },
            "logica-1": {
                "titulo": "Operadores e Álgebra Booleana",
                "secao": "fundamento-computacao",
                "subpasta": "logica",
                "aulas": [
                    ("Operadores lógicos — AND, OR, NOT, XOR, NAND, NOR", "fundamentos/fundamento-computacao/logica/operadores"),
                    ("Tabelas verdade", "fundamentos/fundamento-computacao/logica/tabelas"),
                    ("Álgebra booleana — Leis de De Morgan", "fundamentos/fundamento-computacao/logica/de-morgan"),
                ]
            },
            # ─── 2. CIRCUITOS COMBINACIONAIS ───
            "circuitos-combinacionais-1": {
                "titulo": "Operadores, MUX, DEMUX",
                "secao": "circuito-combinacionais",
                "subpasta": "operadores",
                "aulas": [
                    ("Somador — Meio-somador e Somador completo", "fundamentos/circuito-combinacionais/operadores/somador"),
                    ("Subtrator", "fundamentos/circuito-combinacionais/operadores/subtrator"),
                    ("Multiplexador — MUX", "fundamentos/circuito-combinacionais/operadores/mux"),
                    ("Demultiplexador — DEMUX", "fundamentos/circuito-combinacionais/operadores/demux"),
                    ("Decodificador", "fundamentos/circuito-combinacionais/operadores/decodificador"),
                    ("Codificador", "fundamentos/circuito-combinacionais/operadores/codificador"),
                ]
            },
            "circuitos-sequenciais-1": {
                "titulo": "Flip-flops, Registradores, Contadores",
                "secao": "circuito-combinacionais",
                "subpasta": "sequenciais",
                "aulas": [
                    ("Flip-flop — SR, JK, D, T", "fundamentos/circuito-combinacionais/sequenciais/flipflop"),
                    ("Registradores", "fundamentos/circuito-combinacionais/sequenciais/registradores"),
                    ("Contadores", "fundamentos/circuito-combinacionais/sequenciais/contadores"),
                    ("SRAM vs DRAM — Memória estática e dinâmica", "fundamentos/circuito-combinacionais/sequenciais/sram-dram"),
                ]
            },
            "barramentos-1": {
                "titulo": "Barramentos de Dados, Endereços e Controle",
                "secao": "circuito-combinacionais",
                "subpasta": "barramento",
                "aulas": [
                    ("Barramento de dados", "fundamentos/circuito-combinacionais/barramento/b-dados"),
                    ("Barramento de endereços", "fundamentos/circuito-combinacionais/barramento/b-enderecos"),
                    ("Barramento de controle", "fundamentos/circuito-combinacionais/barramento/b-controle"),
                ]
            },
            "cpu-1": {
                "titulo": "ULA, UC, Registradores",
                "secao": "circuito-combinacionais",
                "subpasta": "cpu-1",
                "aulas": [
                    ("ULA — Unidade Lógica e Aritmética", "fundamentos/circuito-combinacionais/cpu-1/ula"),
                    ("UC — Unidade de Controle", "fundamentos/circuito-combinacionais/cpu-1/uc"),
                    ("Registrador de Instrução — IR", "fundamentos/circuito-combinacionais/cpu-1/ir"),
                    ("Contador de Programa — PC", "fundamentos/circuito-combinacionais/cpu-1/pc"),
                    ("Registrador de Endereço de Memória — MAR", "fundamentos/circuito-combinacionais/cpu-1/mar"),
                    ("Registrador de Buffer de Memória — MBR", "fundamentos/circuito-combinacionais/cpu-1/mbr"),
                    ("Registradores de uso geral", "fundamentos/circuito-combinacionais/cpu-1/registradores"),
                ]
            },
            "ciclo-instrucao-1": {
                "titulo": "Fetch, Decode, Execute, Write-back",
                "secao": "circuito-combinacionais",
                "subpasta": "ciclo-instrucao",
                "aulas": [
                    ("Busca — Fetch", "fundamentos/circuito-combinacionais/ciclo-instrucao/fetch"),
                    ("Decodificação — Decode", "fundamentos/circuito-combinacionais/ciclo-instrucao/decode"),
                    ("Execução — Execute", "fundamentos/circuito-combinacionais/ciclo-instrucao/execute"),
                    ("Escrita — Write-back", "fundamentos/circuito-combinacionais/ciclo-instrucao/writeback"),
                ]
            },
            "hierarquia-memoria-1": {
                "titulo": "Registradores, Cache, RAM, SSD/HD",
                "secao": "circuito-combinacionais",
                "subpasta": "hierarquia-memoria",
                "aulas": [
                    ("Registradores — Mais rápidos, menores", "fundamentos/circuito-combinacionais/hierarquia-memoria/registradores-hierarquia"),
                    ("Cache L1, L2, L3", "fundamentos/circuito-combinacionais/hierarquia-memoria/cache"),
                    ("Memória RAM — Principal", "fundamentos/circuito-combinacionais/hierarquia-memoria/ram"),
                    ("Armazenamento Secundário — SSD/HD", "fundamentos/circuito-combinacionais/hierarquia-memoria/ssd-hd"),
                    ("Armazenamento Terciário — Fitas, Nuvem", "fundamentos/circuito-combinacionais/hierarquia-memoria/terciario"),
                ]
            },
            # ─── 3. TIPOS DE RAM ───
            "tipos-ram-1": {
                "titulo": "SRAM, DRAM, DDR",
                "secao": "ram",
                "subpasta": "tipo-ram",
                "aulas": [
                    ("SRAM — Estática (cache)", "fundamentos/ram/tipo-ram/sram"),
                    ("DRAM — Dinâmica (principal)", "fundamentos/ram/tipo-ram/dram"),
                    ("SDRAM, DDR — DDR3, DDR4, DDR5", "fundamentos/ram/tipo-ram/ddr"),
                    ("Memória Virtual — Conceito introdutório", "fundamentos/ram/tipo-ram/memoria-virtual"),
                ]
            },
            "assembly-1": {
                "titulo": "Instruções Aritméticas, Lógicas e de Desvio",
                "secao": "ram",
                "subpasta": "assembly",
                "aulas": [
                    ("Instruções aritméticas — add, sub, mul, div", "fundamentos/ram/assembly/aritmeticas"),
                    ("Instruções lógicas — and, or, xor, shift", "fundamentos/ram/assembly/logicas"),
                    ("Instruções de transferência — load, store", "fundamentos/ram/assembly/load-store"),
                    ("Instruções de desvio — jump, branch", "fundamentos/ram/assembly/branch"),
                ]
            },
            "modos-enderecamento-1": {
                "titulo": "Modos de Endereçamento em Assembly",
                "secao": "ram",
                "subpasta": "modos-enderecamento",
                "aulas": [
                    ("Endereçamento Imediato", "fundamentos/ram/modos-enderecamento/imediato"),
                    ("Endereçamento Direto", "fundamentos/ram/modos-enderecamento/direto"),
                    ("Endereçamento Indireto", "fundamentos/ram/modos-enderecamento/indireto"),
                    ("Endereçamento por Registro", "fundamentos/ram/modos-enderecamento/registro"),
                    ("Endereçamento Base + Deslocamento", "fundamentos/ram/modos-enderecamento/base-deslocamento"),
                    ("Endereçamento PC-relativo", "fundamentos/ram/modos-enderecamento/pc-relativo"),
                ]
            },
            # ─── 4. ARQUITETURAS AVANÇADAS ───
            "pipeline-1": {
                "titulo": "Pipeline de 5 Estágios e Conflitos",
                "secao": "arquiteturas",
                "subpasta": "pipelines",
                "aulas": [
                    ("Pipeline de 5 estágios", "fundamentos/arquiteturas/pipelines/pipeline"),
                    ("Conflitos de dados — Data Hazards", "fundamentos/arquiteturas/pipelines/data-hazards"),
                    ("Conflitos estruturais", "fundamentos/arquiteturas/pipelines/estruturais"),
                    ("Conflitos de controle — Control Hazards", "fundamentos/arquiteturas/pipelines/control-hazards"),
                    ("Técnicas de mitigação — Forwarding, Stalls, Branch Prediction", "fundamentos/arquiteturas/pipelines/mitigacao"),
                ]
            },
            "superescalar-1": {
                "titulo": "Out-of-Order e Especulação",
                "secao": "arquiteturas",
                "subpasta": "superescalar",
                "aulas": [
                    ("Execução fora de ordem — Out-of-Order", "fundamentos/arquiteturas/superescalar/out-of-order"),
                    ("Especulação", "fundamentos/arquiteturas/superescalar/especulacao"),
                ]
            },
            "paralelismo-1": {
                "titulo": "SIMD, MIMD, SMP, NUMA",
                "secao": "arquiteturas",
                "subpasta": "paralelismo",
                "aulas": [
                    ("SIMD — Single Instruction, Multiple Data", "fundamentos/arquiteturas/paralelismo/simd"),
                    ("MIMD — Multiple Instruction, Multiple Data", "fundamentos/arquiteturas/paralelismo/mimd"),
                    ("Multiprocessamento — SMP, NUMA", "fundamentos/arquiteturas/paralelismo/smp-numa"),
                ]
            },
            "unidades-tipos-1": {
                "titulo": "Unidades e Tipos de Dados",
                "secao": "arquiteturas",
                "subpasta": "tipo-unidades",
                "aulas": [
                    ("Unidades de Medida", "fundamentos/arquiteturas/tipo-unidades/unidade"),
                    ("Tipos de Dados", "fundamentos/arquiteturas/tipo-unidades/tipos"),
                ]
            },
            "files-1": {
                "titulo": "Formatos de Arquivo",
                "secao": "arquiteturas",
                "subpasta": "files",
                "aulas": [
                    ("Leitura e Escrita de Arquivos", "fundamentos/arquiteturas/files/leitura-escrita"),
                    ("Formato CSV", "fundamentos/arquiteturas/files/csv"),
                    ("Formato JSON", "fundamentos/arquiteturas/files/json"),
                    ("Formato XML", "fundamentos/arquiteturas/files/xml"),
                    ("Serialização de Objetos — Pickle", "fundamentos/arquiteturas/files/serializacao"),
                ]
            },
        }
    }
}


def slug_to_path(slug: str) -> Path:
    """Converte um slug em um caminho de arquivo."""
    parts = slug.split('/')
    return BASE_DIR / Path(*parts)


def criar_estrutura_pastas_e_arquivos(tema: str):
    """Cria toda a estrutura de pastas e arquivos MDX para um tema."""
    
    if tema not in TEMAS:
        print(f"❌ Tema '{tema}' não encontrado!")
        return
    
    dados_tema = TEMAS[tema]
    total_aulas = 0
    total_arquivos = 0
    
    print(f"\n📁 Criando estrutura para: {tema.upper()}")
    print("=" * 60)
    
    for topico_id, dados in dados_tema["topicos"].items():
        secao = dados["secao"]
        subpasta = dados["subpasta"]
        titulo_topico = dados["titulo"]
        
        print(f"\n📂 Tópico: {titulo_topico} ({topico_id})")
        print(f"   Seção: {secao} → Subpasta: {subpasta}")
        
        for nome_aula, slug in dados["aulas"]:
            # Caminho completo do arquivo
            file_path = slug_to_path(slug)
            file_path = file_path.with_suffix('.mdx')
            
            # Cria o diretório
            file_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Conteúdo do arquivo MDX
            conteudo = f"""---
title: "{nome_aula}"
slug: "{slug}"
tema: "{tema}"
secao: "{secao}"
topico: "{topico_id}"
---

# {nome_aula}

## 📖 O que estudar

[Aqui vai o conteúdo da aula]

## 🎯 Aplicação na Tese

[Aplicação específica para a tese de doutorado]

## 🛠️ Projeto Sugerido

[Projeto prático sugerido]

## 📚 Referências

- Referência 1
- Referência 2

---
*Esta aula faz parte do módulo {dados_tema['secoes'][secao]} do tema {tema.capitalize()}.*
"""
            
            # Escreve o arquivo
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(conteudo)
                print(f"   ✅ Criado: {file_path}")
                total_arquivos += 1
            except Exception as e:
                print(f"   ❌ Erro ao criar {file_path}: {e}")
            
            total_aulas += 1
    
    print("\n" + "=" * 60)
    print(f"✅ Estrutura criada com sucesso!")
    print(f"   📚 Total de aulas: {total_aulas}")
    print(f"   📄 Total de arquivos MDX: {total_arquivos}")
    print(f"   📁 Diretório base: {BASE_DIR}")


def listar_estrutura(tema: str):
    """Lista a estrutura de pastas e arquivos criados."""
    
    if tema not in TEMAS:
        print(f"❌ Tema '{tema}' não encontrado!")
        return
    
    dados_tema = TEMAS[tema]
    
    print(f"\n📂 Estrutura de {tema.upper()}")
    print("=" * 60)
    
    for topico_id, dados in dados_tema["topicos"].items():
        secao = dados["secao"]
        subpasta = dados["subpasta"]
        titulo_topico = dados["titulo"]
        
        print(f"\n📂 {titulo_topico} ({topico_id})")
        print(f"   └── {secao}/{subpasta}/")
        
        for nome_aula, slug in dados["aulas"]:
            file_path = slug_to_path(slug).with_suffix('.mdx')
            print(f"       └── 📄 {file_path.name}")


def verificar_arquivos_existentes(tema: str):
    """Verifica quais arquivos já existem e quais faltam."""
    
    if tema not in TEMAS:
        print(f"❌ Tema '{tema}' não encontrado!")
        return
    
    dados_tema = TEMAS[tema]
    
    print(f"\n🔍 Verificando arquivos de {tema.upper()}")
    print("=" * 60)
    
    existentes = 0
    faltantes = 0
    
    for topico_id, dados in dados_tema["topicos"].items():
        for nome_aula, slug in dados["aulas"]:
            file_path = slug_to_path(slug).with_suffix('.mdx')
            
            if file_path.exists():
                print(f"   ✅ {file_path}")
                existentes += 1
            else:
                print(f"   ❌ {file_path} (faltando)")
                faltantes += 1
    
    print("\n" + "=" * 60)
    print(f"✅ Existentes: {existentes}")
    print(f"❌ Faltantes: {faltantes}")


# ─── EXECUÇÃO ───
if __name__ == "__main__":
    print("🚀 SCRIPT DE CRIAÇÃO DE ESTRUTURA DE AULAS - FUNDAMENTOS")
    print("=" * 60)
    
    # Escolha o tema
    TEMA_ESCOLHIDO = "fundamentos"
    
    # Cria a estrutura
    criar_estrutura_pastas_e_arquivos(TEMA_ESCOLHIDO)
    
    # Lista a estrutura criada (opcional)
    listar_estrutura(TEMA_ESCOLHIDO)
    
    # Verifica arquivos existentes (opcional)
    # verificar_arquivos_existentes(TEMA_ESCOLHIDO)