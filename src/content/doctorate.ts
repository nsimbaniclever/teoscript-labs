// src/content/doctorate.ts

export type Aula = {
  nome: string
  slug: string
  estudo: string
  tese: string
  projeto: string
}

export type Topic = {
  id: string
  title: string
  subs: string[]
  aulas: Aula[]
  slug?: string  
}

export type Section = {
  id: string
  title: string
  topics: Topic[]
}

export type Part = {
  id: string
  title: string
  icon: string
  color: string
  sections: Section[]
}

const T = (
  id: string,
  title: string,
  subs: string[],
  aulas: Aula[]
): Topic => ({
  id,
  title,
  subs,
  aulas,
})

export const parts: Part[] = [
  // ════════════════════════════════════════════════════════════════
  // 1. FUNDAMENTOS - HARDWARE & LÓGICA ok
  // ════════════════════════════════════════════════════════════════
  {
    id: "fundamentos",
    title: "Fundamentos - Hardware & Lógica",
    icon: "💾",
    color: "#8b7355",
    sections: [
      // ─── 1. FUNDAMENTOS DA COMPUTAÇÃO ───
      {
        id: "fundamentos",
        title: "Fundamentos da Computação",
        topics: [
          T(
            "fundamentos-1",
            "Intrudução à computação",
            [
              "Máquina de Turing — Definição formal (fita, cabeçote, estados, tabela de transição)",
              "Componentes físicos visíveis — Gabinete, monitor, teclado, mouse, impressoras, webcams",
              "Componentes internos — CPU, RAM, HD/SSD, placa-mãe, fonte, placa de vídeo",
            ],
            [
              {
                nome: "Máquina de Turing",
                slug: "fundamentos/fundamento-computacao/introducao/turing",
                estudo: "Modelo matemático: fita infinita, cabeçote, estados, tabela de transição.",
                tese: "Base teórica de toda a computação.",
                projeto: "Simular máquina de Turing simples em Python.",
              },
              {
                nome: "Componentes físicos visíveis",
                slug: "fundamentos/fundamento-computacao/introducao/componentes-visiveis",
                estudo: "Gabinete, monitor, teclado, mouse, impressoras, webcams.",
                tese: "Interface entre usuário e máquina.",
                projeto: "Identificar e conectar periféricos num computador real.",
              },
              {
                nome: "Componentes internos",
                slug: "fundamentos/fundamento-computacao/introducao/componentes-internos",
                estudo: "CPU, RAM, HD/SSD, placa-mãe, fonte de alimentação, placa de vídeo.",
                tese: "O hardware que executa instruções e armazena dados.",
                projeto: "Montar um PC virtualmente (PCPartPicker) ou fisicamente.",
              },
            ]
          ),
          T(
            "representacao-1",
            "Sistemas de Numeração",
            [
              "Sistema Binário — Base 2, dígitos 0 e 1, conversões",
              "Sistema Octal — Base 8, dígitos 0-7, conversões",
              "Sistema Decimal — Base 10, dígitos 0-9, conversões",
              "Sistema Hexadecimal — Base 16, dígitos 0-9 e A-F, conversões",
            ],
            [
              {
                nome: "Sistema Binário — Base 2",
                slug: "fundamentos/fundamento-computacao/representacao/binario",
                estudo: "Binário: base 2, dígitos 0 e 1. Conversões entre sistemas.",
                tese: "Computadores usam binário — base para tudo.",
                projeto: "Converter entre bases.",
              },
              {
                nome: "Sistema Octal — Base 8",
                slug: "fundamentos/fundamento-computacao/representacao/octal",
                estudo: "Octal: base 8, dígitos 0-7. Conversões entre sistemas.",
                tese: "Representação compacta de binário.",
                projeto: "Converter entre bases.",
              },
              {
                nome: "Sistema Decimal — Base 10",
                slug: "fundamentos/fundamento-computacao/representacao/decimal",
                estudo: "Decimal: base 10, dígitos 0-9. Conversões entre sistemas.",
                tese: "Sistema numérico do dia-a-dia.",
                projeto: "Converter entre bases.",
              },
              {
                nome: "Sistema Hexadecimal — Base 16",
                slug: "fundamentos/fundamento-computacao/representacao/hexadecimal",
                estudo: "Hexadecimal: base 16, dígitos 0-9 e A-F. Conversões entre sistemas.",
                tese: "Cores, endereços de memória e representação de dados.",
                projeto: "Converter entre bases.",
              },
            ]
          ),
          T(
            "caracteres-1",
            "Linguagem das Máquinas e Padronização",
            [
              "Conceito básico BIT e BYTE - a língua que as máquinas se comunicam com humanos",
              "Tabela de codificação I `ASCII — 7 bits (0-127), letras, dígitos, pontuação, caracteres de controle`",
              "Tabela de codificação II `Unicode — +143.000 caracteres (emoji, chinês, árabe), code points`",
              "Tabela de codificação II `UTF-8, UTF-16, UTF-32 — UTF-8 (1-4 bytes, padrão web), UTF-16 (2-4 bytes), UTF-32 (4 bytes fixos)`",
            ],
            [
              {
                nome: "Conceito básico BIT e BYTE",
                slug: "fundamentos/fundamento-computacao/caracteres/bit-byte",
                estudo: "As línguas que as máquinas se comunicam entre si e com humanos",
                tese: "Padrão internacional para criar computador",
                projeto: "Nenhum",
              },

              {
                nome: "Tabela ASCII",
                slug: "fundamentos/fundamento-computacao/caracteres/ascii",
                estudo: "7 bits (0-127): letras, dígitos, pontuação, caracteres de controle.",
                tese: "Padrão americano, limitado a 128 caracteres.",
                projeto: "Criar programa que imprime a tabela ASCII.",
              },
              {
                nome: "Tabela Unicode",
                slug: "fundamentos/fundamento-computacao/caracteres/unicode",
                estudo: "+143.000 caracteres (emoji, chinês, árabe). Cada um tem code point.",
                tese: "Suporte a todos os idiomas e símbolos.",
                projeto: "Explorar code points em Python (ord(), chr()).",
              },
              {
                nome: "Tabela UTF",
                slug: "fundamentos/fundamento-computacao/caracteres/utf",
                estudo: "UTF-8: 1-4 bytes (padrão web). UTF-16: 2-4 bytes. UTF-32: 4 bytes fixos.",
                tese: "Como caracteres são armazenados e transmitidos.",
                projeto: "Codificar/decodificar strings em UTF-8, UTF-16, UTF-32.",
              },
            ]
          ),
          T(
            "inteiros-1",
            "Representação de Inteiros",
            [
              "Sinal-magnitude — MSB = sinal, bits restantes = magnitude, dois zeros",
              "Complemento de 1 — Negativo = inverter todos os bits, dois zeros",
              "Complemento de 2 — Negativo = inverter bits e somar 1, único zero, padrão atual",
            ],
            [
              {
                nome: "Sinal-magnitude",
                slug: "fundamentos/fundamento-computacao/inteiros/sinal-magnitude",
                estudo: "MSB = sinal (0 positivo, 1 negativo). Bits restantes = magnitude. Dois zeros.",
                tese: "Primeira tentativa de representar negativos, obsoleta.",
                projeto: "Implementar soma e subtração em sinal-magnitude.",
              },
              {
                nome: "Complemento de 1",
                slug: "fundamentos/fundamento-computacao/inteiros/complemento-1",
                estudo: "Negativo = inverter todos os bits do positivo. Ainda tem dois zeros.",
                tese: "Usado em computadores antigos (PDP-1).",
                projeto: "Implementar soma e subtração em complemento de 1.",
              },
              {
                nome: "Complemento de 2 — Padrão atual",
                slug: "fundamentos/fundamento-computacao/inteiros/complemento-2",
                estudo: "Negativo = inverter bits e somar 1. Único zero. Padrão em todos processadores.",
                tese: "Simplifica a lógica de subtração.",
                projeto: "Implementar soma e subtração em complemento de 2.",
              },
            ]
          ),
          T(
            "logica-1",
            "Operadores e Álgebra Booleana",
            [
              "Operadores lógicos — AND, OR, NOT, XOR, NAND, NOR (tabelas verdade)",
              "Tabelas verdade — Todas as combinações de entradas e saída de uma função lógica",
              "Álgebra booleana — Leis de De Morgan: ¬(A∧B) = ¬A ∨ ¬B",
            ],
            [
              {
                nome: "Operadores lógicos — AND, OR, NOT, XOR, NAND, NOR",
                slug: "fundamentos/fundamento-computacao/logica/operadores",
                estudo: "Tabelas verdade de cada operador.",
                tese: "Base de toda a eletrônica digital.",
                projeto: "Simular portas lógicas em Python.",
              },
              {
                nome: "Tabelas verdade",
                slug: "fundamentos/fundamento-computacao/logica/tabelas",
                estudo: "Todas as combinações de entradas e saída de uma função lógica.",
                tese: "Método para definir e analisar funções lógicas.",
                projeto: "Criar tabela verdade para funções complexas.",
              },
              {
                nome: "Álgebra booleana — Leis de De Morgan",
                slug: "fundamentos/fundamento-computacao/logica/de-morgan",
                estudo: "Leis: comutativa, associativa, distributiva. De Morgan: ¬(A∧B) = ¬A ∨ ¬B.",
                tese: "Simplificação de expressões lógicas e circuitos.",
                projeto: "Simplificar expressões booleanas usando as leis.",
              },
            ]
          ),
          
        ],
      },
      // ─── 2. CIRCUITOS COMBINACIONAIS ───
      {
        id: "circuitos-combinacionais",
        title: "Circuitos Combinacionais",
        topics: [
          T(
            "circuitos-combinacionais-1",
            "Operadores, MUX, DEMUX",
            [
              "Somador — Meio-somador (S=A⊕B, Cout=A∧B) e Somador completo (S=A⊕B⊕Cin)",
              "Subtrator — Subtração usando complemento de 2: A - B = A + (~B + 1)",
              "Multiplexador — MUX (seleciona uma das 2ⁿ entradas baseado em n bits de seleção)",
              "Demultiplexador — DEMUX (direciona uma entrada para uma das 2ⁿ saídas)",
              "Decodificador — n entradas, 2ⁿ saídas, usado para endereçamento de memória",
              "Codificador — Inverso do decodificador, 2ⁿ entradas, n saídas",
            ],
            [
              {
                nome: "Somador ",
                slug: "fundamentos/circuito-combinacionais/operadores/somador",
                estudo: "Meio-somador: S=A⊕B, Cout=A∧B. Somador completo: S=A⊕B⊕Cin.",
                tese: "Base da ULA para operações aritméticas.",
                projeto: "Construir somador de 4 bits em Logisim ou Python.",
              },
              {
                nome: "Subtrator",
                slug: "fundamentos/circuito-combinacionais/operadores/subtrator",
                estudo: "Subtração usando complemento de 2: A - B = A + (~B + 1).",
                tese: "Subtração implementada via soma com complemento de 2.",
                projeto: "Construir subtrator de 4 bits.",
              },
              {
                nome: "Multiplexador — MUX",
                slug: "fundamentos/circuito-combinacionais/operadores/mux",
                estudo: "Seleciona uma das 2ⁿ entradas baseado em n bits de seleção.",
                tese: "Roteamento de dados em processadores.",
                projeto: "Implementar MUX 4→1 em Python.",
              },
              {
                nome: "Demultiplexador — DEMUX",
                slug: "fundamentos/circuito-combinacionais/operadores/demux",
                estudo: "Direciona uma entrada para uma das 2ⁿ saídas baseado em n bits.",
                tese: "Distribuição de dados para múltiplos destinos.",
                projeto: "Implementar DEMUX 1→4.",
              },
              {
                nome: "Decodificador",
                slug: "fundamentos/circuito-combinacionais/operadores/decodificador",
                estudo: "n entradas, 2ⁿ saídas. Ativa exatamente uma saída por combinação.",
                tese: "Usado para endereçamento de memória.",
                projeto: "Implementar decodificador 3→8.",
              },
              {
                nome: "Codificador",
                slug: "fundamentos/circuito-combinacionais/operadores/codificador",
                estudo: "Inverso do decodificador. 2ⁿ entradas, n saídas.",
                tese: "Compressão de dados e priorização.",
                projeto: "Implementar codificador de prioridade.",
              },
            ]
          ),
          T(
            "circuitos-sequenciais-1",
            "Flip-flops, Registradores, Contadores",
            [
              "Flip-flop — SR, JK, D, T (memória de 1 bit, base de registradores)",
              "Registradores — Grupo de flip-flops D que armazenam múltiplos bits",
              "Contadores — Circuito que incrementa ou decrementa em cada pulso de clock",
              "SRAM vs DRAM — SRAM (flip-flops, rápida, cara) vs DRAM (capacitores, lenta, barata)",
            ],
            [
              {
                nome: "Flip-flop — SR, JK, D, T",
                slug: "fundamentos/circuito-combinacionais/sequenciais/flipflop",
                estudo: "SR, JK (sem estado inválido), D (armazena 1 bit), T (Toggle).",
                tese: "Memória de 1 bit, base de registradores.",
                projeto: "Simular flip-flops em Python.",
              },
              {
                nome: "Registradores",
                slug: "fundamentos/circuito-combinacionais/sequenciais/registradores",
                estudo: "Grupo de flip-flops D que armazenam múltiplos bits.",
                tese: "Armazenamento rápido de dados durante execução.",
                projeto: "Implementar registrador de 8 bits.",
              },
              {
                nome: "Contadores",
                slug: "fundamentos/circuito-combinacionais/sequenciais/contadores",
                estudo: "Circuito que incrementa ou decrementa em cada pulso de clock.",
                tese: "Medição de tempo, contagem de eventos.",
                projeto: "Construir contador de 4 bits.",
              },
              {
                nome: "SRAM vs DRAM — Memória estática e dinâmica",
                slug: "fundamentos/circuito-combinacionais/sequenciais/sram-dram",
                estudo: "SRAM: flip-flops, rápida, cara. DRAM: capacitores, lenta, barata.",
                tese: "SRAM → cache, DRAM → RAM principal.",
                projeto: "Comparar desempenho e custo teórico.",
              },
            ]
          ),
          T(
          "barramentos-1",
          "Barramentos de Dados, Endereços e Controle",
          [
            "Barramento de dados — Transporta dados entre CPU, memória e dispositivos, largura (8-64 bits)",
            "Barramento de endereços — Transporta endereços de memória, largura determina memória endereçável",
            "Barramento de controle — Sinais de leitura/escrita, interrupções, clock, reset",
          ],
          [
            {
              nome: "Barramento de dados",
              slug: "fundamentos/circuito-combinacionais/barramento/b-dados",
              estudo: "Transporta dados entre CPU, memória e dispositivos. Largura (8-64 bits).",
              tese: "Largura define desempenho do sistema.",
              projeto: "Simular barramento de dados.",
            },
            {
              nome: "Barramento de endereços",
              slug: "fundamentos/circuito-combinacionais/barramento/b-enderecos",
              estudo: "Transporta endereços de memória. Largura determina memória endereçável.",
              tese: "Limite máximo de memória endereçável.",
              projeto: "Calcular limites com diferentes larguras.",
            },
            {
              nome: "Barramento de controle",
              slug: "fundamentos/circuito-combinacionais/barramento/b-controle",
              estudo: "Sinais: leitura/escrita, interrupções, clock, reset.",
              tese: "Coordenação de operações no sistema.",
              projeto: "Mapear sinais de controle de um processador simples.",
            },
          ]
          ),
          T(
            "cpu-1",
            "ULA, UC, Registradores",
            [
              "ULA — Unidade Lógica e Aritmética (operações aritméticas e lógicas)",
              "UC — Unidade de Controle (decodifica instruções e gera sinais de controle)",
              "Registrador de Instrução — IR (armazena a instrução em execução)",
              "Contador de Programa — PC (armazena endereço da próxima instrução)",
              "Registrador de Endereço de Memória — MAR (armazena endereço a ser lido/escrito)",
              "Registrador de Buffer de Memória — MBR (buffer de dados entre CPU e memória)",
              "Registradores de uso geral — R0, R1, R2,... (armazenamento temporário de alta velocidade)",
            ],
            [
              {
                nome: "ULA — Unidade Lógica e Aritmética",
                slug: "fundamentos/circuito-combinacionais/cpu-1/ula",
                estudo: "Operações aritméticas e lógicas. Entradas: operandos + opcode. Saída: resultado + flags.",
                tese: "Coração computacional da CPU.",
                projeto: "Implementar ULA em Python/Verilog.",
              },
              {
                nome: "UC — Unidade de Controle",
                slug: "fundamentos/circuito-combinacionais/cpu-1/uc",
                estudo: "Decodifica instruções e gera sinais de controle.",
                tese: '"Cérebro" da CPU que orquestra tudo.',
                projeto: "Implementar UC simples em simulador.",
              },
              {
                nome: "Registrador de Instrução — IR",
                slug: "fundamentos/circuito-combinacionais/cpu-1/ir",
                estudo: "Armazena a instrução atualmente sendo executada.",
                tese: "Instrução em execução.",
                projeto: "Simular ciclo fetch-decode-execute.",
              },
              {
                nome: "Contador de Programa — PC",
                slug: "fundamentos/circuito-combinacionais/cpu-1/pc",
                estudo: "Armazena endereço da próxima instrução. Incrementa automaticamente.",
                tese: "Controla o fluxo sequencial do programa.",
                projeto: "Simular PC e saltos (jump, branch).",
              },
              {
                nome: "Registrador de Endereço de Memória — MAR",
                slug: "fundamentos/circuito-combinacionais/cpu-1/mar",
                estudo: "Armazena endereço a ser lido/escrito na memória.",
                tese: "Interface CPU ↔ memória para endereços.",
                projeto: "Simular MAR em ciclo de memória.",
              },
              {
                nome: "Registrador de Buffer de Memória — MBR",
                slug: "fundamentos/circuito-combinacionais/cpu-1/mbr",
                estudo: "Armazena dados lidos da memória ou a serem escritos.",
                tese: "Buffer de dados entre CPU e memória.",
                projeto: "Simular MBR.",
              },
              {
                nome: "Registradores de uso geral",
                slug: "fundamentos/circuito-combinacionais/cpu-1/registradores",
                estudo: "R0, R1, R2,... usados para operandos e resultados.",
                tese: "Armazenamento temporário de alta velocidade.",
                projeto: "Programar em Assembly usando registradores.",
              },
            ]
          ),
          T(
            "ciclo-instrucao-1",
            "Fetch, Decode, Execute, Write-back",
            [
              "Busca — Fetch (CPU lê instrução do endereço apontado pelo PC para o IR)",
              "Decodificação — Decode (UC decodifica opcode para determinar operação)",
              "Execução — Execute (ULA executa operação ou CPU calcula endereço de salto)",
              "Escrita — Write-back (Resultado da ULA é escrito no registrador de destino ou memória)",
            ],
            [
              {
                nome: "Busca — Fetch",
                slug: "fundamentos/circuito-combinacionais/ciclo-instrucao/fetch",
                estudo: "CPU lê instrução do endereço apontado pelo PC para o IR.",
                tese: "Primeira etapa de cada instrução.",
                projeto: "Simular fetch em Python.",
              },
              {
                nome: "Decodificação — Decode",
                slug: "fundamentos/circuito-combinacionais/ciclo-instrucao/decode",
                estudo: "UC decodifica o opcode para determinar operação e registradores.",
                tese: "Traduz instrução para sinais de controle.",
                projeto: "Criar decodificador de instruções.",
              },
              {
                nome: "Execução — Execute",
                slug: "fundamentos/circuito-combinacionais/ciclo-instrucao/execute",
                estudo: "ULA executa operação ou CPU calcula endereço de salto.",
                tese: "Operação efetiva é realizada.",
                projeto: "Simular execução de instruções.",
              },
              {
                nome: "Escrita — Write-back",
                slug: "fundamentos/circuito-combinacionais/ciclo-instrucao/writeback",
                estudo: "Resultado da ULA é escrito no registrador de destino ou na memória.",
                tese: "Armazena o resultado do ciclo.",
                projeto: "Simular write-back.",
              },
            ]
          ),
          T(
            "hierarquia-memoria-1",
            "Registradores, Cache, RAM, SSD/HD",
            [
              "Registradores — Dentro da CPU, acesso ~1 ciclo, capacidade de poucos bytes a KB",
              "Cache L1, L2, L3 — L1 (~32KB, 2-4 ciclos), L2 (~256KB, ~10 ciclos), L3 (~8MB, ~30-40 ciclos)",
              "Memória RAM — DDR4/DDR5, capacidade GB, acesso ~50-100ns",
              "Armazenamento Secundário — SSD (acesso ~µs) vs HD (acesso ~ms)",
              "Armazenamento Terciário — Fitas magnéticas (backup), nuvem (S3), acesso lento, alta capacidade",
            ],
            [
              {
                nome: "Registradores ",
                slug: "fundamentos/circuito-combinacionais/hierarquia-memoria/registradores-hierarquia",
                estudo: "Dentro da CPU, acesso ~1 ciclo, capacidade de poucos bytes a KB.",
                tese: "Velocidade máxima para operandos.",
                projeto: "Comparar tempos de acesso.",
              },
              {
                nome: "Cache L1, L2, L3",
                slug: "fundamentos/circuito-combinacionais/hierarquia-memoria/cache",
                estudo: "L1: ~32KB, 2-4 ciclos. L2: ~256KB, ~10 ciclos. L3: ~8MB, ~30-40 ciclos.",
                tese: "Reduzir latência entre CPU e RAM.",
                projeto: "Simular política de cache.",
              },
              {
                nome: "Memória RAM ",
                slug: "fundamentos/circuito-combinacionais/hierarquia-memoria/ram",
                estudo: "DDR4/DDR5, capacidade GB, acesso ~50-100ns.",
                tese: "Armazena programas e dados em execução.",
                projeto: "Monitorar uso de RAM no SO.",
              },
              {
                nome: "SD/HD",
                slug: "fundamentos/circuito-combinacionais/hierarquia-memoria/ssd-hd",
                estudo: "SSD: acesso ~µs. HD: acesso ~ms.",
                tese: "Armazenamento persistente de longo prazo.",
                projeto: "Comparar performance SSD vs HD.",
              },
              {
                nome: "Fitas, Nuvem",
                slug: "fundamentos/circuito-combinacionais/hierarquia-memoria/terciario",
                estudo: "Fitas magnéticas (backup), nuvem (S3). Acesso lento, alta capacidade.",
                tese: "Arquivo morto e backup.",
                projeto: "Pesquisar custos e tempos de acesso.",
              },
            ]
          ),
        ],
      },
      // ─── 3. TIPOS DE RAM ───
      {
        id: "tipos-ram",
        title: "Tipos de RAM",
        topics: [
          T(
            "tipos-ram-1",
            "SRAM, DRAM, DDR",
            [
              "SRAM — Estática (cache), usa flip-flops, não precisa refresh, mais rápida, mais cara",
              "DRAM — Dinâmica (principal), usa capacitores, precisa de refresh, mais lenta, mais barata",
              "SDRAM, DDR — SDRAM sincronizada, DDR transfere nas duas bordas (DDR3, DDR4, DDR5)",
              "Memória Virtual — Usa HD/SSD como extensão da RAM, mapeamento via tabela de páginas",
            ],
            [
              {
                nome: "SRAM — Estática (cache)",
                slug: "fundamentos/ram/tipo-ram/sram",
                estudo: "Usa flip-flops, não precisa refresh, mais rápida, mais cara.",
                tese: "Cache de alta velocidade.",
                projeto: "Comparar SRAM vs DRAM.",
              },
              {
                nome: "DRAM — Dinâmica (principal)",
                slug: "fundamentos/ram/tipo-ram/dram",
                estudo: "Usa capacitores, precisa de refresh, mais lenta, mais barata.",
                tese: "RAM principal.",
                projeto: "Estudar ciclo de refresh.",
              },
              {
                nome: "SDRAM, DDR — DDR3, DDR4, DDR5",
                slug: "fundamentos/ram/tipo-ram/ddr",
                estudo: "SDRAM sincronizada. DDR transfere nas duas bordas. Evolução de banda.",
                tese: "Evolução da RAM principal.",
                projeto: "Comparar especificações DDR3/4/5.",
              },
              {
                nome: "Memória Virtual — Conceito introdutório",
                slug: "fundamentos/ram/tipo-ram/memoria-virtual",
                estudo: "Usa HD/SSD como extensão da RAM. Mapeamento via tabela de páginas.",
                tese: "Permite executar programas maiores que a RAM física.",
                projeto: "Simular mapeamento de página simples.",
              },
            ]
          ),
          T(
            "assembly-1",
            "Instruções Aritméticas, Lógicas e de Desvio",
            [
              "Instruções aritméticas — add, sub, mul, div (ADD R1, R2, R3 → R1 = R2 + R3)",
              "Instruções lógicas — and, or, xor, shift (LSL, LSR)",
              "Instruções de transferência — load, store (LDR R1, [R2], STR R1, [R2])",
              "Instruções de desvio — jump, branch (JMP, BEQ, BNE, BLT, BGT)",
            ],
            [
              {
                nome: "Instruções aritméticas — add, sub, mul, div",
                slug: "fundamentos/ram/assembly/aritmeticas",
                estudo: "ADD R1, R2, R3 → R1 = R2 + R3. Soma, subtração, multiplicação, divisão.",
                tese: "Operações matemáticas em Assembly.",
                projeto: "Programa soma de vetor em Assembly.",
              },
              {
                nome: "Instruções lógicas — and, or, xor, shift",
                slug: "fundamentos/ram/assembly/logicas",
                estudo: "AND, OR, XOR bit a bit. LSL (shift left), LSR (shift right).",
                tese: "Manipulação de bits e flags.",
                projeto: "Implementar operações de bits em Assembly.",
              },
              {
                nome: "Instruções de transferência — load, store",
                slug: "fundamentos/ram/assembly/load-store",
                estudo: "LDR R1, [R2] → carrega da memória. STR R1, [R2] → armazena.",
                tese: "Comunicação CPU ↔ memória.",
                projeto: "Trabalhar com arrays em Assembly.",
              },
              {
                nome: "Instruções de desvio — jump, branch",
                slug: "fundamentos/ram/assembly/branch",
                estudo: "JMP label (incondicional). BEQ, BNE, BLT, BGT (condicionais).",
                tese: "Controle de fluxo e laços.",
                projeto: "Implementar loops e condicionais em Assembly.",
              },
            ]
          ),
          T(
            "modos-enderecamento-1",
            "Modos de Endereçamento em Assembly",
            [
              "Endereçamento Imediato — Operando é valor literal (ADD R1, R1, #5)",
              "Endereçamento Direto — Endereço de memória especificado (LDR R1, [0x1000])",
              "Endereçamento Indireto — Registrador contém endereço (LDR R1, [R2])",
              "Endereçamento por Registro — Operandos são registradores (ADD R1, R2, R3)",
              "Endereçamento Base + Deslocamento — Base (registrador) + deslocamento (LDR R1, [R2, #4])",
              "Endereçamento PC-relativo — PC + deslocamento, código position-independent (PIC)",
            ],
            [
              {
                nome: "Endereçamento Imediato",
                slug: "fundamentos/ram/modos-enderecamento/imediato",
                estudo: "Operando é valor literal na instrução. Ex: ADD R1, R1, #5.",
                tese: "Constantes sem necessidade de memória.",
                projeto: "Usar valores imediatos em Assembly.",
              },
              {
                nome: "Endereçamento Direto",
                slug: "fundamentos/ram/modos-enderecamento/direto",
                estudo: "Endereço de memória especificado diretamente. Ex: LDR R1, [0x1000].",
                tese: "Acesso a posição fixa de memória.",
                projeto: "Acessar endereços diretos.",
              },
              {
                nome: "Endereçamento Indireto",
                slug: "fundamentos/ram/modos-enderecamento/indireto",
                estudo: "Registrador contém endereço. Ex: LDR R1, [R2].",
                tese: "Ponteiros e acesso dinâmico.",
                projeto: "Implementar ponteiros em Assembly.",
              },
              {
                nome: "Endereçamento por Registro",
                slug: "fundamentos/ram/modos-enderecamento/registro",
                estudo: "Operandos são registradores. Ex: ADD R1, R2, R3.",
                tese: "Operações rápidas sem memória.",
                projeto: "Operações apenas com registradores.",
              },
              {
                nome: "Endereçamento Base + Deslocamento",
                slug: "fundamentos/ram/modos-enderecamento/base-deslocamento",
                estudo: "Endereço = base (registrador) + deslocamento. Ex: LDR R1, [R2, #4].",
                tese: "Acesso a arrays e structs.",
                projeto: "Acessar array com base+offset.",
              },
              {
                nome: "Endereçamento PC-relativo",
                slug: "fundamentos/ram/modos-enderecamento/pc-relativo",
                estudo: "Endereço = PC + deslocamento. Usado para saltos e dados próximos.",
                tese: "Código position-independent (PIC).",
                projeto: "Usar PC-relativo para branches.",
              },
            ]
          ),
        ],
      },
      // ─── 4. ARQUITETURA AVANÇADAS PIPELINE ───
      {
        id: "pipeline",
        title: "Arquiteturas Avançadas — Pipeline",
        topics: [
          T(
            "pipeline-1",
            "Pipeline de 5 Estágios e Conflitos",
            [
              "Pipeline de 5 estágios — IF, ID, EX, MEM, WB (aumenta throughput)",
              "Conflitos de dados — Data Hazards (instrução depende de resultado anterior)",
              "Conflitos estruturais — Dois estágios precisam do mesmo recurso ao mesmo tempo",
              "Conflitos de controle — Control Hazards (saltos condicionais, branch prediction)",
              "Técnicas de mitigação — Forwarding, Stalls, Branch Prediction",
            ],
            [
              {
                nome: "Pipeline de 5 estágios",
                slug: "fundamentos/arquiteturas/pipelines/pipeline",
                estudo: "IF, ID, EX, MEM, WB. Cada estágio executa uma instrução diferente.",
                tese: "Aumenta throughput (instruções por ciclo).",
                projeto: "Simular pipeline de 5 estágios.",
              },
              {
                nome: "Conflitos de dados — Data Hazards",
                slug: "fundamentos/arquiteturas/pipelines/data-hazards",
                estudo: "Instrução depende de resultado de anterior ainda não disponível.",
                tese: "Stalls ou forwarding para resolver.",
                projeto: "Identificar e resolver data hazards.",
              },
              {
                nome: "Conflitos estruturais",
                slug: "fundamentos/arquiteturas/pipelines/estruturais",
                estudo: "Dois estágios precisam do mesmo recurso ao mesmo tempo.",
                tese: "Duplicar recursos ou stalls.",
                projeto: "Projetar pipeline sem conflitos estruturais.",
              },
              {
                nome: "Conflitos de controle — Control Hazards",
                slug: "fundamentos/arquiteturas/pipelines/control-hazards",
                estudo: "Saltos condicionais - não se sabe próxima instrução até condição avaliada.",
                tese: "Branch prediction para mitigar.",
                projeto: "Simular branch prediction simples.",
              },
              {
                nome: "Técnicas de mitigação — Forwarding, Stalls, Branch Prediction",
                slug: "fundamentos/arquiteturas/pipelines/mitigacao",
                estudo: "Forwarding (passar dados), stalls (pausar), branch prediction (prever).",
                tese: "Manter pipeline ocupado.",
                projeto: "Implementar forwarding e branch predictor.",
              },
            ]
          ),
          T(
            "superescalar-1",
            "Out-of-Order e Especulação",
            [
              "Execução fora de ordem — Out-of-Order (CPU reordena instruções, usa ROB)",
              "Especulação — Executa antes de saber se salto será tomado, descarta se errou",
            ],
            [
              {
                nome: "Execução fora de ordem — Out-of-Order",
                slug: "fundamentos/arquiteturas/superescalar/out-of-order",
                estudo: "CPU reordena instruções para executar as que estão prontas. Usa ROB.",
                tese: "Maximiza uso das unidades funcionais.",
                projeto: "Simular escalonamento out-of-order.",
              },
              {
                nome: "Especulação",
                slug: "fundamentos/arquiteturas/superescalar/especulacao",
                estudo: "Executa antes de saber se salto será tomado. Se errou, descarta.",
                tese: "Aumenta performance, com custo de descarte.",
                projeto: "Simular speculação com rollback.",
              },
            ]
          ),
           T(
            "paralelismo-1",
            "SIMD, MIMD, SMP, NUMA",
            [
              "SIMD — Single Instruction, Multiple Data (SSE, AVX, NEON)",
              "MIMD — Multiple Instruction, Multiple Data (computação paralela em larga escala)",
              "Multiprocessamento — SMP (memória compartilhada), NUMA (memória local, acesso remoto lento)",
            ],
            [
              {
                nome: "SIMD — Single Instruction, Multiple Data",
                slug: "fundamentos/arquiteturas/paralelismo/simd",
                estudo: "Uma instrução opera em múltiplos dados. Ex: SSE, AVX, NEON.",
                tese: "Acelera processamento de vetores.",
                projeto: "Programar com SIMD em C/Assembly.",
              },
              {
                nome: "MIMD — Multiple Instruction, Multiple Data",
                slug: "fundamentos/arquiteturas/paralelismo/mimd",
                estudo: "Múltiplos processadores executando instruções diferentes.",
                tese: "Computação paralela em larga escala.",
                projeto: "Estudar arquiteturas MIMD.",
              },
              {
                nome: "Multiprocessamento — SMP, NUMA",
                slug: "fundamentos/arquiteturas/paralelismo/smp-numa",
                estudo: "SMP: memória compartilhada. NUMA: memória local, acesso remoto lento.",
                tese: "Escalabilidade em sistemas multicore.",
                projeto: "Estudar topologias de memória.",
              },
            ]
          ),
          T(
            "unidades-tipos-1",
            "Unidades e Tipos de Dados",
            [
              "Unidades de Medida — Bit, Byte, KB, MB, GB, TB, PB",
              "Tipos de Dados — Primitivos (int, float, bool, char) e Compostos (arrays, structs, classes)",
            ],
            [
              {
                nome: "Unidades de Medida",
                slug: "fundamentos/arquiteturas/tipo-unidades/unidade",
                estudo: "Bit (0 ou 1), Byte (8 bits), KB, MB, GB, TB.",
                tese: "Capacidade de armazenamento e transmissão.",
                projeto: "Converter unidades.",
              },
              {
                nome: "Tipos de Dados",
                slug: "fundamentos/arquiteturas/tipo-unidades/tipos",
                estudo: "Primitivos: int, float, bool, char. Compostos: arrays, structs, classes.",
                tese: "Estruturação de dados para programas.",
                projeto: "Implementar estruturas em Python.",
              },
            ]
          ),
          T(
            "files-1",
            "Formatos de Arquivo",
            [
              "Leitura e Escrita de Arquivos — Abrir, ler, escrever, fechar (r, w, a, rb, wb)",
              "Formato CSV — Comma-Separated Values, formato tabular para dados",
              "Formato JSON — JavaScript Object Notation, APIs e comunicação entre sistemas",
              "Formato XML — eXtensible Markup Language, configurações e troca de dados",
              "Serialização de Objetos — Pickle em Python, persistência de objetos complexos",
            ],
            [
              {
                nome: "Leitura e Escrita de Arquivos",
                slug: "fundamentos/arquiteturas/files/leitura-escrita",
                estudo: "Abrir, ler, escrever, fechar. Modos: r, w, a, rb, wb.",
                tese: "Persistência de dados.",
                projeto: "Manipular arquivos.",
              },
              {
                nome: "Formato CSV",
                slug: "fundamentos/arquiteturas/files/csv",
                estudo: "Comma-Separated Values — formato tabular para dados.",
                tese: "Troca de dados entre sistemas.",
                projeto: "Ler e escrever arquivos CSV.",
              },
              {
                nome: "Formato JSON",
                slug: "fundamentos/arquiteturas/files/json",
                estudo: "JavaScript Object Notation — formato leve para troca de dados.",
                tese: "APIs e comunicação entre sistemas.",
                projeto: "Ler e escrever arquivos JSON.",
              },
              {
                nome: "Formato XML",
                slug: "fundamentos/arquiteturas/files/xml",
                estudo: "eXtensible Markup Language — formato estruturado para dados.",
                tese: "Configurações e troca de dados.",
                projeto: "Ler e escrever arquivos XML.",
              },
              {
                nome: "Serialização de Objetos — Pickle",
                slug: "fundamentos/arquiteturas/files/serializacao",
                estudo: "Pickle em Python — serializar objetos para transmitir ou armazenar.",
                tese: "Persistência de objetos complexos.",
                projeto: "Serializar objetos.",
              },
            ]
          ),
        ],
      },

    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 2. MATEMÁTICA ok
  // ════════════════════════════════════════════════════════════════
  {
    id: "matematica",
    title: "Matemática",
    icon: "📐",
    color: "#2557d0",
    sections: [
      // ─── 1. ÁLGEBRA LINEAR ───
      {
        id: "mat-al",
        title: "1. Álgebra Linear",
        topics: [
          T(
            "mat-al-1",
            "Vetores e Espaços Vetoriais",
            [
              "O Que é um Vetor?",
              "Operações com Vetores",
              "Produto Escalar",
              "Normas e Distâncias",
              "Combinação Linear",
              "Dependência e Independência Linear",
              "Base e Dimensão",
              "Subespaços Fundamentais (I)",
              "Subespaços Fundamentais (II) — Rank-Nullity",
              "Soma de Subespaços",
            ],
            [
              {
                nome: "Introdução a Vetores",
                slug: "matematica/algebra/vetores/aula-1-introducao",
                estudo: "Definição formal de vetor como elemento de ℝⁿ.",
                tese: "Todo modelo, dado e gradiente é um vetor em ℝᵈ.",
                projeto: "Teoria pura. Não há o que implementar.",
              },
              {
                nome: "Operações com Vetores",
                slug: "matematica/algebra/vetores/aula-2-operacoes-soma-subtracao",
                estudo: "(u₁,...,uₙ) + (v₁,...,vₙ) = (u₁+v₁,...,uₙ+vₙ).",
                tese: "A agregação (FedAvg) é uma média ponderada de vetores.",
                projeto: "Visualizador de Vetores 2D",
              },
              {
                nome: "Produto Escalar",
                slug: "matematica/algebra/vetores/aula-3-produto-escalar",
                estudo: "u·v = Σ uᵢvᵢ. Propriedades: comutativa, distributiva.",
                tese: "Mede a similaridade entre vetores.",
                projeto: "Similaridade por Cosseno",
              },
              {
                nome: "Normas e Distâncias",
                slug: "matematica/algebra/vetores/aula-4-normas-e-distancias",
                estudo: "||v||₂ = √(Σ vᵢ²). ||v||₁ = Σ |vᵢ|.",
                tese: "Mede a magnitude. Usado para regularização.",
                projeto: "Normalização de Dados",
              },
              {
                nome: "Combinação Linear",
                slug: "matematica/algebra/vetores/aula-5-combinacao-linear",
                estudo: "w = c₁v₁ + c₂v₂ + ... + cₖvₖ.",
                tese: "Base para regressão linear e redes neurais.",
                projeto: "Escrever vetores como combinação linear.",
              },
              {
                nome: "Dependência e Independência Linear",
                slug: "matematica/algebra/vetores/aula-6-dependencia-linear",
                estudo: "L.I.: única combinação linear = 0 é a trivial.",
                tese: "Diversidade de dados, posto da matriz.",
                projeto: "Verificar se conjuntos são LI ou LD.",
              },
              {
                nome: "Base e Dimensão",
                slug: "matematica/algebra/vetores/aula-7-base-e-dimensao",
                estudo: "Base: conjunto LI que gera o espaço.",
                tese: "Define o espaço de parâmetros.",
                projeto: "Encontrar coordenadas em diferentes bases.",
              },
              {
                nome: "Subespaços Fundamentais (I)",
                slug: "matematica/algebra/vetores/aula-8-subespacos-fundamentais",
                estudo: "Espaço Coluna (Col A): span das colunas.",
                tese: "Análise de sistemas lineares.",
                projeto: "Encontrar subespaços de matrizes.",
              },
              {
                nome: "Subespaços Fundamentais (II) - Rank-Nullity",
                slug: "matematica/algebra/vetores/aula-9-rank-nullity",
                estudo: "dim(Col A) + dim(Nul A) = n.",
                tese: "Compressão, deteção de redundância.",
                projeto: "Verificar o teorema para várias matrizes.",
              },
              {
                nome: "Soma de Subespaços",
                slug: "matematica/algebra/vetores/aula-10-soma-subespacos",
                estudo: "U + V = {u+v | u∈U, v∈V}.",
                tese: "Decomposição de espaços, PCA.",
                projeto: "Somar subespaços, verificar soma direta.",
              },
            ]
          ),
          T(
            "mat-al-2",
            "Matrizes",
            [
              "Definição e Tipos de Matrizes",
              "Operações com Matrizes I",
              "Operações com Matrizes II",
              "Transposição",
              "Determinante (I)",
              "Determinante (II)",
              "Inversa de uma Matriz",
              "Matrizes e Sistemas Lineares",
            ],
            [
              {
                nome: "Definição e Tipos de Matrizes",
                slug: "matematica/algebra/matrizes/aula-1-definicao",
                estudo: "Arranjo retangular m×n. Tipos: linha, coluna, quadrada.",
                tese: "Representação de dados, pesos de redes neurais.",
                projeto: "Identificar tipos de matrizes.",
              },
              {
                nome: "Operações com Matrizes",
                slug: "matematica/algebra/matrizes/aula-2-operacoes-soma-subtracao",
                estudo: "Soma e subtração elemento a elemento.",
                tese: "Agregação de gradientes em FL.",
                projeto: "Operações com matrizes 2×2 e 3×3.",
              },
              {
                nome: "Multiplicação de Matrizes",
                slug: "matematica/algebra/matrizes/aula-3-multiplicacao",
                estudo: "(AB)ᵢⱼ = Σₖ aᵢₖ·bₖⱼ.",
                tese: "Camadas de redes neurais (W·x + b).",
                projeto: "Multiplicar matrizes.",
              },
              {
                nome: "Transposição",
                slug: "matematica/algebra/matrizes/aula-4-transposicao",
                estudo: "(Aᵀ)ᵢⱼ = aⱼᵢ. Matrizes simétricas: A = Aᵀ.",
                tese: "Covariância (XᵀX), equações normais.",
                projeto: "Transpor matrizes, verificar simetria.",
              },
              {
                nome: "Determinante (I)",
                slug: "matematica/algebra/matrizes/aula-5-determinante",
                estudo: "Cálculo 2×2: det = ad - bc.",
                tese: "Invertibilidade, autovalores.",
                projeto: "Calcular determinantes 2×2 e 3×3.",
              },
              {
                nome: "Determinante (II) - Propriedades",
                slug: "matematica/algebra/matrizes/aula-6-propriedades-determinante",
                estudo: "det(AB)=det(A)·det(B), det(Aᵀ)=det(A).",
                tese: "Invertibilidade, autovalores.",
                projeto: "Usar propriedades para simplificar cálculos.",
              },
              {
                nome: "Inversa de uma Matriz",
                slug: "matematica/algebra/matrizes/aula-7-inversa",
                estudo: "A·A⁻¹ = A⁻¹·A = I.",
                tese: "Regressão linear (equações normais).",
                projeto: "Calcular inversas.",
              },
              {
                nome: "Matrizes e Sistemas Lineares",
                slug: "matematica/algebra/matrizes/aula-8-sistemas-lineares",
                estudo: "Representação matricial: A·x = b.",
                tese: "Regressão linear, otimização.",
                projeto: "Resolver sistemas usando matrizes.",
              },
            ]
          ),
          T(
            "mat-al-3",
            "Sistemas Lineares",
            [
              "Introdução aos Sistemas Lineares",
              "Eliminação de Gauss",
              "Eliminação de Gauss-Jordan",
              "Pivotação",
              "Método da Inversa",
              "Método de Cramer",
              "Sistemas Lineares e FL",
            ],
            [
              {
                nome: "Introdução aos Sistemas Lineares",
                slug: "matematica/algebra/sistemas-lineares/aula-1-introducao",
                estudo: "Conjunto de equações lineares. Representação: A·x = b.",
                tese: "Base para regressão linear.",
                projeto: "Classificar sistemas.",
              },
              {
                nome: "Eliminação de Gauss",
                slug: "matematica/algebra/sistemas-lineares/aula-2-eliminacao-gauss",
                estudo: "Matriz aumentada, eliminação progressiva.",
                tese: "Regressão linear, otimização.",
                projeto: "Resolver sistemas 2×2 e 3×3.",
              },
              {
                nome: "Eliminação de Gauss-Jordan",
                slug: "matematica/algebra/sistemas-lineares/aula-3-gauss-jordan",
                estudo: "Eliminação progressiva + regressiva.",
                tese: "Cálculo da inversa.",
                projeto: "Resolver sistemas, calcular inversas.",
              },
              {
                nome: "Pivotação",
                slug: "matematica/algebra/sistemas-lineares/aula-4-pivotacao",
                estudo: "Pivotação Parcial e Total.",
                tese: "Estabilidade numérica.",
                projeto: "Identificar quando a pivotação é necessária.",
              },
              {
                nome: "Método da Inversa",
                slug: "matematica/algebra/sistemas-lineares/aula-5-metodo-inversa",
                estudo: "x = A⁻¹b (para A invertível).",
                tese: "Regressão linear múltipla.",
                projeto: "Resolver sistemas usando a inversa.",
              },
              {
                nome: "Método de Cramer",
                slug: "matematica/algebra/sistemas-lineares/aula-6-metodo-cramer",
                estudo: "xᵢ = det(Aᵢ)/det(A).",
                tese: "Sistemas pequenos.",
                projeto: "Resolver sistemas 2×2 e 3×3.",
              },
              {
                nome: "Sistemas Lineares e FL",
                slug: "matematica/algebra/sistemas-lineares/aula-7-fl",
                estudo: "Agregação de modelos como sistema ponderado.",
                tese: "Detetar clientes maliciosos.",
                projeto: "Aplicar conceitos ao FedAvg.",
              },
            ]
          ),
          T(
            "mat-al-4",
            "Autovalores e Autovetores",
            [
              "Introdução aos Autovalores",
              "Cálculo de Autovalores",
              "Cálculo de Autovetores",
              "Propriedades dos Autovalores",
              "Autovalores em Matrizes Simétricas",
              "Diagonalização",
              "Autovalores e Convergência",
              "Autovalores e FL",
            ],
            [
              {
                nome: "Introdução aos Autovalores",
                slug: "matematica/algebra/autovalores/aula-1-introducao",
                estudo: "A·v = λ·v. Direções que não mudam.",
                tese: "PCA, PageRank, estabilidade.",
                projeto: "Identificar autovetores geometricamente.",
              },
              {
                nome: "Cálculo de Autovalores",
                slug: "matematica/algebra/autovalores/aula-2-calculo-autovalores",
                estudo: "det(A - λI) = 0.",
                tese: "Análise de convergência, PCA.",
                projeto: "Calcular autovalores de matrizes 2×2 e 3×3.",
              },
              {
                nome: "Cálculo de Autovetores",
                slug: "matematica/algebra/autovalores/aula-3-calculo-autovetores",
                estudo: "(A - λᵢI)·v = 0.",
                tese: "PCA, análise de estabilidade.",
                projeto: "Calcular autovetores para cada autovalor.",
              },
              {
                nome: "Propriedades dos Autovalores",
                slug: "matematica/algebra/autovalores/aula-4-propriedades",
                estudo: "Soma = traço, produto = determinante.",
                tese: "Análise de matrizes.",
                projeto: "Verificar propriedades.",
              },
              {
                nome: "Autovalores em Matrizes Simétricas",
                slug: "matematica/algebra/autovalores/aula-5-matrizes-simetricas",
                estudo: "Matriz simétrica → autovalores reais.",
                tese: "Matriz de covariância, PCA.",
                projeto: "Decompor matrizes simétricas.",
              },
              {
                nome: "Diagonalização",
                slug: "matematica/algebra/autovalores/aula-6-diagonalizacao",
                estudo: "A = P·D·P⁻¹.",
                tese: "Potências de matrizes.",
                projeto: "Diagonalizar matrizes.",
              },
              {
                nome: "Autovalores e Convergência",
                slug: "matematica/algebra/autovalores/aula-7-convergencia",
                estudo: "Número de condição: κ = λ_max / λ_min.",
                tese: "Taxa de convergência do GD.",
                projeto: "Analisar convergência de funções.",
              },
              {
                nome: "Autovalores e FL",
                slug: "matematica/algebra/autovalores/aula-8-fl",
                estudo: "Análise de convergência do FedAvg.",
                tese: "Redução de dimensionalidade local.",
                projeto: "Aplicar autovalores a cenários FL.",
              },
            ]
          ),
          T(
            "mat-al-5",
            "Decomposições Matriciais",
            [
              "Introdução às Decomposições",
              "Decomposição LU",
              "Decomposição QR",
              "Decomposição de Cholesky",
              "Decomposição Espectral",
              "SVD",
              "Aplicações da SVD",
              "Comparação das Decomposições",
            ],
            [
              {
                nome: "Introdução às Decomposições",
                slug: "matematica/algebra/decomposicoes/aula-1-introducao",
                estudo: "Decompor uma matriz em partes mais simples.",
                tese: "Redução de dimensionalidade.",
                projeto: "Identificar quando cada decomposição é útil.",
              },
              {
                nome: "Decomposição LU",
                slug: "matematica/algebra/decomposicoes/aula-2-lu",
                estudo: "A = L·U (L = triangular inferior, U = superior).",
                tese: "Resolver sistemas, calcular determinante.",
                projeto: "Calcular LU de matrizes 2×2 e 3×3.",
              },
              {
                nome: "Decomposição QR",
                slug: "matematica/algebra/decomposicoes/aula-3-qr",
                estudo: "A = Q·R (Q = ortogonal, R = triangular).",
                tese: "Mínimos quadrados, autovalores.",
                projeto: "Calcular QR, resolver sistemas.",
              },
              {
                nome: "Decomposição de Cholesky",
                slug: "matematica/algebra/decomposicoes/aula-4-cholesky",
                estudo: "A = L·Lᵀ (matrizes definidas positivas).",
                tese: "Regressão linear, simulação.",
                projeto: "Verificar definida positiva, decompor.",
              },
              {
                nome: "Decomposição Espectral",
                slug: "matematica/algebra/decomposicoes/aula-5-espectral",
                estudo: "A = Q·Λ·Q⁻¹.",
                tese: "Matrizes simétricas.",
                projeto: "Decompor matrizes simétricas.",
              },
              {
                nome: "SVD (Singular Value Decomposition)",
                slug: "matematica/algebra/decomposicoes/aula-6-svd",
                estudo: "A = U·Σ·Vᵀ.",
                tese: "PCA, compressão, robustez.",
                projeto: "Calcular SVD de matrizes 2×2.",
              },
              {
                nome: "Aplicações da SVD",
                slug: "matematica/algebra/decomposicoes/aula-7-aplicacoes-svd",
                estudo: "PCA, compressão de imagens.",
                tese: "Detecção de outliers.",
                projeto: "Compressão de imagens.",
              },
              {
                nome: "Comparação das Decomposições",
                slug: "matematica/algebra/decomposicoes/aula-8-comparacao",
                estudo: "Quando usar LU, QR, Cholesky, SVD.",
                tese: "Critérios de escolha.",
                projeto: "Escolher a decomposição adequada.",
              },
            ]
          ),
        ],
      },
      // ─── 2. CÁLCULO DIFERENCIAL ───
      {
        id: "mat-cd",
        title: "2. Cálculo Diferencial",
        topics: [
          T(
            "mat-cd-1",
            "Revisão de Funções",
            ["Revisão de Funções"],
            [
              {
                nome: "Revisão de Funções",
                slug: "matematica/calculo-diferencial/funcoes/aula-1-revisao",
                estudo: "Definição de função: domínio, contradomínio, imagem.",
                tese: "Base para cálculo diferencial.",
                projeto: "Identificar domínio, esboçar gráficos.",
              },
            ]
          ),
          T(
            "mat-cd-2",
            "Introdução à Derivada",
            [
              "Introdução à Derivada",
              "Regras de Derivação (I)",
              "Regras de Derivação (II)",
            ],
            [
              {
                nome: "Introdução à Derivada",
                slug: "matematica/calculo-diferencial/derivadas/aula-1-introducao",
                estudo: "f'(a) = lim_{h→0} [f(a+h)-f(a)]/h.",
                tese: "Taxa de variação instantânea.",
                projeto: "Calcular derivadas pela definição.",
              },
              {
                nome: "Regras de Derivação (I)",
                slug: "matematica/calculo-diferencial/derivadas/aula-2-regras-1",
                estudo: "Derivada de funções elementares.",
                tese: "Base para otimização.",
                projeto: "Calcular derivadas básicas.",
              },
              {
                nome: "Regras de Derivação (II)",
                slug: "matematica/calculo-diferencial/derivadas/aula-3-regras-2",
                estudo: "Regra do Produto e do Quociente.",
                tese: "Derivar funções complexas.",
                projeto: "Aplicar regras do produto e quociente.",
              },
            ]
          ),
          T(
            "mat-cd-3",
            "Regra da Cadeia",
            ["Regra da Cadeia"],
            [
              {
                nome: "Regra da Cadeia",
                slug: "matematica/calculo-diferencial/regra-cadeia/aula-1-regra-cadeia",
                estudo: "(f∘g)'(x) = f'(g(x))·g'(x).",
                tese: "Backpropagation em redes neurais.",
                projeto: "Aplicar a regra da cadeia.",
              },
            ]
          ),
          T(
            "mat-cd-4",
            "Derivadas Parciais",
            ["Derivadas Parciais"],
            [
              {
                nome: "Derivadas Parciais",
                slug: "matematica/calculo-diferencial/derivadas-parciais/aula-1-derivadas-parciais",
                estudo: "Derivar em relação a uma variável.",
                tese: "Gradiente, otimização multivariada.",
                projeto: "Calcular derivadas parciais.",
              },
            ]
          ),
          T(
            "mat-cd-5",
            "Gradiente",
            ["Gradiente"],
            [
              {
                nome: "Gradiente",
                slug: "matematica/calculo-diferencial/gradiente/aula-1-gradiente",
                estudo: "∇f = (∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ).",
                tese: "Gradiente Descendente.",
                projeto: "Calcular gradientes.",
              },
            ]
          ),
          T(
            "mat-cd-6",
            "Otimização",
            ["Otimização e Máximos/Mínimos"],
            [
              {
                nome: "Otimização - Máximos e Mínimos",
                slug: "matematica/calculo-diferencial/otimizacao/aula-1-maximos-minimos",
                estudo: "Ponto crítico: ∇f = 0. Teste da Hessiana.",
                tese: "Otimização em ML.",
                projeto: "Encontrar e classificar pontos críticos.",
              },
            ]
          ),
          T(
            "mat-cd-7",
            "Série de Taylor",
            ["Série de Taylor"],
            [
              {
                nome: "Série de Taylor",
                slug: "matematica/calculo-diferencial/serie-taylor/aula-1-serie-taylor",
                estudo: "f(x) ≈ Σ f⁽ⁿ⁾(a)·(x-a)ⁿ/n!.",
                tese: "Análise de convergência.",
                projeto: "Calcular séries de Taylor.",
              },
            ]
          ),
        ],
      },
      // ─── 3. CÁLCULO INTEGRAL ───
      {
        id: "mat-ci",
        title: "3. Cálculo Integral",
        topics: [
          T(
            "mat-ci-1",
            "Introdução à Integral",
            [
              "Introdução à Integral",
              "Primitivas e Integrais Indefinidas",
              "Propriedades da Integral",
            ],
            [
              {
                nome: "Introdução à Integral",
                slug: "matematica/calculo-integral/integral-indefinida/aula-1-introducao",
                estudo: "Integral como área sob a curva.",
                tese: "Base para cálculo integral.",
                projeto: "Calcular áreas com retângulos.",
              },
              {
                nome: "Primitivas e Integrais Indefinidas",
                slug: "matematica/calculo-integral/integral-indefinida/aula-2-primitivas",
                estudo: "F'(x) = f(x) → ∫f(x)dx = F(x) + C.",
                tese: "Cálculo de integrais.",
                projeto: "Calcular primitivas.",
              },
              {
                nome: "Propriedades da Integral",
                slug: "matematica/calculo-integral/integral-indefinida/aula-3-propriedades",
                estudo: "Linearidade e integração por partes.",
                tese: "Simplificar integrais.",
                projeto: "Aplicar propriedades.",
              },
            ]
          ),
          T(
            "mat-ci-2",
            "Métodos de Integração",
            [
              "Método de Substituição",
              "Integração por Partes",
              "Frações Parciais",
            ],
            [
              {
                nome: "Método de Substituição",
                slug: "matematica/calculo-integral/metodos-integracao/aula-1-substituicao",
                estudo: "u = g(x), du = g'(x)dx.",
                tese: "Simplificar integrais.",
                projeto: "Usar substituição.",
              },
              {
                nome: "Integração por Partes",
                slug: "matematica/calculo-integral/metodos-integracao/aula-2-por-partes",
                estudo: "∫u dv = uv - ∫v du.",
                tese: "Integrar produtos de funções.",
                projeto: "Aplicar integração por partes.",
              },
              {
                nome: "Frações Parciais",
                slug: "matematica/calculo-integral/metodos-integracao/aula-3-fracoes-parciais",
                estudo: "Decomposição de funções racionais.",
                tese: "Integrar funções racionais.",
                projeto: "Decompor e integrar.",
              },
            ]
          ),
          T(
            "mat-ci-3",
            "Teorema Fundamental do Cálculo",
            ["Teorema Fundamental do Cálculo"],
            [
              {
                nome: "Teorema Fundamental do Cálculo",
                slug: "matematica/calculo-integral/integral-definida/aula-1-teorema-fundamental",
                estudo: "∫ₐᵇ f(x)dx = F(b) - F(a).",
                tese: "Cálculo de integrais definidas.",
                projeto: "Calcular integrais definidas.",
              },
            ]
          ),
          T(
            "mat-ci-4",
            "Integrais Impróprias",
            ["Integrais Impróprias"],
            [
              {
                nome: "Integrais Impróprias",
                slug: "matematica/calculo-integral/integrais-improprias/aula-1-integrais-improprias",
                estudo: "Limites no infinito. Singularidades.",
                tese: "Análise de convergência.",
                projeto: "Classificar integrais impróprias.",
              },
            ]
          ),
          T(
            "mat-ci-5",
            "Aplicações de Integrais",
            ["Aplicações de Integrais"],
            [
              {
                nome: "Aplicações - Áreas e Volumes",
                slug: "matematica/calculo-integral/aplicacoes/aula-1-areas-volumes",
                estudo: "Área entre curvas. Volume de sólidos.",
                tese: "Aplicações práticas.",
                projeto: "Calcular áreas e volumes.",
              },
            ]
          ),
        ],
      },
      // ─── 4. SÉRIES ───
      {
        id: "mat-se",
        title: "4. Séries",
        topics: [
          T(
            "mat-se-1",
            "Introdução às Séries",
            ["Introdução às Séries", "Convergência de Séries"],
            [
              {
                nome: "Introdução às Séries",
                slug: "matematica/series/series-numericas/aula-1-introducao",
                estudo: "Σ aₙ. Série geométrica: Σ rⁿ = 1/(1-r).",
                tese: "Base para séries de Taylor.",
                projeto: "Calcular séries geométricas.",
              },
              {
                nome: "Convergência de Séries",
                slug: "matematica/series/series-numericas/aula-2-convergencia",
                estudo: "Convergência: soma tende a valor finito.",
                tese: "Análise de convergência.",
                projeto: "Testar convergência.",
              },
            ]
          ),
          T(
            "mat-se-2",
            "Critérios de Convergência",
            ["Critérios de Convergência"],
            [
              {
                nome: "Critérios de Convergência",
                slug: "matematica/series/criterios-convergencia/aula-1-criterios",
                estudo: "Critério da Razão, da Raiz, de Leibniz.",
                tese: "Determinar convergência.",
                projeto: "Aplicar critérios.",
              },
            ]
          ),
          T(
            "mat-se-3",
            "Séries de Potências",
            ["Séries de Potências"],
            [
              {
                nome: "Séries de Potências",
                slug: "matematica/series/series-potencias/aula-1-series-potencias",
                estudo: "Σ cₙ(x-a)ⁿ. Raio de convergência.",
                tese: "Base para séries de Taylor.",
                projeto: "Encontrar raio de convergência.",
              },
            ]
          ),
          T(
            "mat-se-4",
            "Séries de Taylor e Maclaurin",
            ["Séries de Taylor e Maclaurin"],
            [
              {
                nome: "Séries de Taylor e Maclaurin",
                slug: "matematica/series/taylor-maclaurin/aula-1-taylor-maclaurin",
                estudo: "Taylor: f(x) = Σ f⁽ⁿ⁾(a)(x-a)ⁿ/n!.",
                tese: "Aproximações de funções.",
                projeto: "Calcular séries de Taylor.",
              },
            ]
          ),
          T(
            "mat-se-5",
            "Séries de Fourier",
            ["Séries de Fourier"],
            [
              {
                nome: "Séries de Fourier",
                slug: "matematica/series/fourier/aula-1-fourier",
                estudo: "f(x) = a₀/2 + Σ(aₙcos(nx) + bₙsen(nx)).",
                tese: "Análise de sinais.",
                projeto: "Calcular coeficientes de Fourier.",
              },
            ]
          ),
        ],
      },
      // ─── 5. ESTATÍSTICA DESCRITIVA ───
      {
        id: "mat-ed",
        title: "5. Estatística Descritiva",
        topics: [
          T(
            "mat-ed-1",
            "Introdução sobre estatística",
            [
              "Introdução da estatística",
              "Conceitos Básicos e Escalas",
            ],
            [
              {
                nome: "Introdução à Estatística",
                slug: "matematica/estatistica-descritiva/introducao/aula-1-introducao",
                estudo: "Origem histórica, definição e objetivo.",
                tese: "Base para estatística.",
                projeto: "Nenhum",
              },
              {
                nome: "Conceitos Básicos e Escalas",
                slug: "matematica/estatistica-descritiva/introducao/aula-2-conceito",
                estudo: "População vs Amostra, Parâmetro vs Estatística.",
                tese: "Base para estatística.",
                projeto: "Nenhum",
              },
            ]
          ),
          T(
            "mat-ed-2",
            "Organização e Apresentação de Dados",
            [
              "Dados não agrupados",
              "Dados agrupados por lista",
              "Dados agrupados em intervalos de Classe",
              "As frequências",
            ],
            [
              
              {
                nome: "Dados não agrupados",
                slug: "matematica/estatistica-descritiva/organizacao-dados/aula-2-dados-nao-agrupado",
                estudo: "Variáveis Qualitativas e Quantitativas.",
                tese: "Agrupamento de dados.",
                projeto: "Nenhum",
              },
              {
                nome: "Dados agrupados por lista",
                slug: "matematica/estatistica-descritiva/organizacao-dados/aula-3-dados-agrupado-lista",
                estudo: "Agrupamento de dados por lista.",
                tese: "Agrupamento de dados.",
                projeto: "Nenhum",
              },
              {
                nome: "Dados agrupados em intervalos de Classe",
                slug: "matematica/estatistica-descritiva/organizacao-dados/aula-4-dados-agrupado-intervalo",
                estudo: "Histogramas e gráficos.",
                tese: "Visualização de dados.",
                projeto: "Criar gráficos para um dataset.",
              },
              {
                nome: "As frequências",
                slug: "matematica/estatistica-descritiva/organizacao-dados/aula-5-frequencias",
                estudo: "Frequência absoluta, relativa, acumulada.",
                tese: "Análise da distribuição.",
                projeto: "Nenhum",
              },
            ]
          ),
          T(
            "mat-ed-3",
            "Medidas de Posição",
            [
              "Médias",
              "Mediana",
              "Moda",
              "Separatrizes"
            ],
            [
              {
                nome: "Médias",
                slug: "matematica/estatistica-descritiva/medidas-posicao/aula-1-medias",
                estudo: "Média Aritmética, Geométrica e Harmônica.",
                tese: "Medidas de posição.",
                projeto: "Calcular média para diferentes conjuntos.",
              },
              {
                nome: "Mediana ",
                slug: "matematica/estatistica-descritiva/medidas-posicao/aula-2-mediana",
                estudo: "Mediana para dados agrupados e não agrupados.",
                tese: "Medidas centrais robustas.",
                projeto: "Calcular mediana e moda.",
              },
              {
                nome: "Moda",
                slug: "matematica/estatistica-descritiva/medidas-posicao/aula-3-moda",
                estudo: "Moda para dados agrupados e não agrupados.",
                tese: "Medidas centrais robustas",
                projeto: "Analisar e escolher a melhor medida.",
              },
              {
                nome: "Separatrizes",
                slug: "matematica/estatistica-descritiva/medidas-posicao/aula-4-separatrizes",
                estudo: "Quartis, Percentis e Decis.",
                tese: "Análise da distribuição.",
                projeto: "Calcular quartis.",
              },
              
            ]
          ),
          T(
            "mat-ed-4",
            "Medidas de Dispersão",
            [
              "Amplitude Total",
              "IQR (Intervalo Interquartil)",
              "Desvio Médio",
              "Variância",
              "Desvio Padrão",
              "Coeficiente de Variação (CV)",
              "Assimetria",
              "Curtose",
            ],
            [
              {
                nome: "Amplitude Total",
                slug: "matematica/estatistica-descritiva/medidas-dispersao/aula-1-medida-dispersao-absoluta",
                estudo: "Definição, cálculo e limitações da amplitude (sensível a outliers).",
                tese: "Medida simples e bruta de dispersão.",
                projeto: "Calcular a amplitude total de um conjunto de dados.",
              },
              {
                nome: "Variância",
                slug: "matematica/estatistica-descritiva/medidas-dispersao/aula-2-variancia",
                estudo: "Cálculo e interpretação da variância (populacional e amostral).",
                tese: "Medida fundamental de dispersão ao quadrado.",
                projeto: "Calcular a variância para dados brutos e agrupados.",
              },
              {
                nome: "Desvio Padrão",
                slug: "matematica/estatistica-descritiva/medidas-dispersao/aula-3-desvio-padrao",
                estudo: "Cálculo a partir da variância e interpretação na mesma unidade dos dados.",
                tese: "Dispersão na unidade original dos dados.",
                projeto: "Calcular o desvio padrão a partir de tabelas de frequência.",
              },
              {
                nome: "Coeficiente de Variação (CV)",
                slug: "matematica/estatistica-descritiva/medidas-dispersao/aula-4-coeficiente-variacao",
                estudo: "Comparação de dispersão entre conjuntos com unidades ou médias diferentes.",
                tese: "Dispersão relativa (adimensional).",
                projeto: "Calcular e interpretar o CV entre dois conjuntos.",
              },
              {
                nome: "Assimetria",
                slug: "matematica/estatistica-descritiva/medidas-dispersao/aula-5-assimetria",
                estudo: "Medida de forma: distribuição simétrica, assimétrica à direita ou à esquerda.",
                tese: "Forma da distribuição em relação à média.",
                projeto: "Calcular e interpretar coeficientes de assimetria.",
              },
              {
                nome: "Curtose",
                slug: "matematica/estatistica-descritiva/medidas-dispersao/aula-6-curtose",
                estudo: "Medida de forma: pico e caudas da distribuição (leptocúrtica, mesocúrtica, platicúrtica).",
                tese: "Achatamento e peso das caudas da distribuição.",
                projeto: "Calcular e interpretar coeficientes de curtose.",
              },
            ]
          ),
          T(
            "mat-ed-5",
            "Correlação",
            [
              "Introdução à Correlação",
              "Diagrama de Dispersão (Scatterplot)",
              "Coeficiente de Pearson",
              "Coeficiente de Spearman",
              "Correlação vs Causalidade",
            ],
            [
              {
                nome: "Introdução à Correlação",
                slug: "matematica/estatistica-descritiva/correlacao/aula-1-introducao-correlacao",
                estudo: "Conceito de associação entre duas variáveis quantitativas.",
                tese: "Correlação mede força e direção da relação linear.",
                projeto: "Identificar pares de variáveis correlacionáveis em um dataset.",
              },
              {
                nome: "Diagrama de Dispersão (Scatterplot)",
                slug: "matematica/estatistica-descritiva/correlacao/aula-2-scatterplot",
                estudo: "Construção e leitura visual de um scatterplot.",
                tese: "A visualização antecede o cálculo.",
                projeto: "Plotar scatterplot de duas variáveis e descrever o padrão visual.",
              },
              {
                nome: "Coeficiente de Pearson",
                slug: "matematica/estatistica-descritiva/correlacao/aula-3-pearson",
                estudo: "Cálculo e interpretação do r de Pearson (variáveis lineares).",
                tese: "Mede correlação linear entre variáveis quantitativas.",
                projeto: "Calcular o r de Pearson e classificar a força da correlação.",
              },
              {
                nome: "Coeficiente de Spearman",
                slug: "matematica/estatistica-descritiva/correlacao/aula-4-spearman",
                estudo: "Cálculo e interpretação do rho de Spearman (postos).",
                tese: "Alternativa não-paramétrica para relações monotônicas.",
                projeto: "Calcular Spearman e comparar com Pearson no mesmo dataset.",
              },
              {
                nome: "Correlação vs Causalidade",
                slug: "matematica/estatistica-descritiva/correlacao/aula-5-correlacao-causalidade",
                estudo: "Limites da correlação e interpretação equivocada.",
                tese: "Correlação não implica causalidade.",
                projeto: "Analisar um caso real de correlação espúria.",
              },
            ]
          ),
          T(
            "mat-ed-7",
            "Visualização dos dados",
            [
              "Introdução dos gráficos",
              "Gráficos de comparação",
              "Gráficos de proporção",
              "Gráficos de tendência",
              "Gráficos de distribuição",
            ],
            [
              {
                nome: "Introdução aos Gráficos",
                slug: "matematica/estatistica-descritiva/visualizacao/aula-1-introducao",
                estudo: "Definição, importância e tipos de gráficos.",
                tese: "Visualização de dados.",
                projeto: "Nenhum",
              },
              {
                nome: "Gráficos de comparação",
                slug: "matematica/estatistica-descritiva/visualizacao/aula-2-comparacao",
                estudo: "Barras, Colunas, Pictogramas.",
                tese: "Comparação de dados.",
                projeto: "Nenhum",
              },
              {
                nome: "Gráficos de proporção",
                slug: "matematica/estatistica-descritiva/visualizacao/aula-3-proporcao",
                estudo: "Setores, Pizza, Área 100%.",
                tese: "Proporção de dados.",
                projeto: "Nenhum",
              },
              {
                nome: "Gráficos de tendência",
                slug: "matematica/estatistica-descritiva/visualizacao/aula-4-tendencia",
                estudo: "Histograma e Boxplot.",
                tese: "Distribuição dos dados.",
                projeto: "Nenhum",
              },
              {
                nome: "Gráficos de distribuição",
                slug: "matematica/estatistica-descritiva/visualizacao/aula-5-distribuicao",
                estudo: "Linhas e Dispersão.",
                tese: "Associação entre variáveis.",
                projeto: "Nenhum",
              },
            ]
          ),
        ],
      },
      // ─── 6. PROBABILIDADE ───
      {
        id: "mat-pb",
        title: "6. Probabilidade",
        topics: [
          T(
            "mat-pb-1",
            "Fundamentos da Probabilidade",
            [
              "Introdução da Probabilidade",
              "Definições e Axiomas de Probabilidade",
              "Conceitos Fundamentais da Probabilidade",
              "Interseção de Eventos (∩)",
              "União de Eventos (∪)",
              "Probabilidade Condicional",
              "Independência de Eventos",
              "Técnicas de Contagem",
              "Teorema de Bayes",
            ],
            [
              {
                nome: "Introdução da Probabilidade",
                slug: "matematica/probabilidade/fundamentos/aula-1-introducao",
                estudo: "Definições clássica, frequentista e axiomática.",
                tese: "Base para modelagem probabilística.",
                projeto: "Calcular probabilidades.",
              },
              {
                nome: "Definições e Axiomas da Probabilidade",
                slug: "matematica/probabilidade/fundamentos/aula-2-definicao",
                estudo: "Definições clássica, frequentista e axiomática.",
                tese: "Base para modelagem probabilística.",
                projeto: "Calcular probabilidades.",
              },
              {
                nome: "Conceitos Fundamentais da Probabilidade",
                slug: "matematica/probabilidade/fundamentos/aula-3-conceito",
                estudo: "Espaço amostral, eventos simples e compostos.",
                tese: "Modelagem de incerteza.",
                projeto: "Identificar espaço amostral.",
              },
              {
                nome: "Interseção de Eventos (∩)",
                slug: "matematica/probabilidade/fundamentos/aula-4-intercessao",
                estudo: 'Ocorrência simultânea ("E").',
                tese: "Análise de falhas simultâneas.",
                projeto: "Calcular P(A∩B).",
              },
              {
                nome: "União de Eventos (∪)",
                slug: "matematica/probabilidade/fundamentos/aula-5-uniao",
                estudo: 'Ocorrência de pelo menos um ("OU").',
                tese: "Análise de sistemas com redundância.",
                projeto: "Calcular P(A∪B).",
              },
              {
                nome: "Probabilidade Condicional",
                slug: "matematica/probabilidade/fundamentos/aula-6-condicional",
                estudo: "P(A|B) = P(A∩B)/P(B).",
                tese: "Atualização de crenças.",
                projeto: "Resolver problemas condicionais.",
              },
              {
                nome: "Independência de Eventos",
                slug: "matematica/probabilidade/fundamentos/aula-7-independencia",
                estudo: "P(A∩B) = P(A)·P(B).",
                tese: "Simplificação de modelos.",
                projeto: "Testar independência.",
              },
              {
                nome: "Técnicas de Contagem",
                slug: "matematica/probabilidade/fundamentos/aula-8-contagem",
                estudo: "Permutações, arranjos e combinações.",
                tese: "Cálculo de probabilidades.",
                projeto: "Resolver problemas de contagem.",
              },
              {
                nome: "Teorema de Bayes",
                slug: "matematica/probabilidade/fundamentos/aula-9-bayes",
                estudo: "P(A|B) = P(B|A)·P(A)/P(B).",
                tese: "Atualização de parâmetros.",
                projeto: "Aplicar Teorema de Bayes.",
              },
            ]
          ),
          T(
            "mat-pb-2",
            "Variáveis Aleatórias",
            [
              "Variáveis Aleatórias",
              "Variáveis Aleatórias (Discretas)",
              "Variáveis Aleatórias (Contínuas)",
              "Momentos e Funções Geratrizes",
              "Transformação de Variáveis Aleatórias (Univariada)",
              "Distribuições Conjuntas e Marginais",
              "Distribuições Condicionais e Covariância",
              "Esperança Condicional e Martingales (Introdução)",
              "Convergência de Variáveis Aleatórias",
              "Transformação de Variáveis Aleatórias (Multivariada)",
            ],
            [
              {
                nome: "Variáveis Aleatórias",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-1-introducao",
                estudo: "Definição formal. Função de Distribuição.",
                tese: "Representação de fenômenos aleatórios.",
                projeto: "Identificar e classificar variáveis.",
              },
              {
                nome: "Variáveis Aleatórias Discretas",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-2-variavel-discreta",
                estudo: "Função de Probabilidade. Valor Esperado.",
                tese: "Quantificar experimentos discretos.",
                projeto: "Calcular E[X] e Var(X).",
              },
              {
                nome: "Variáveis Aleatórias Contínuas",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-3-variavel-continua",
                estudo: "Função Densidade de Probabilidade.",
                tese: "Modelar grandezas contínuas.",
                projeto: "Calcular f(x) e F(x).",
              },
              {
                nome: "Momentos e Funções Geratrizes",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-4-momentos",
                estudo: "Momentos, FGM, Desigualdades.",
                tese: "Análise de convergência.",
                projeto: "Usar Desigualdade de Chebyshev.",
              },
              {
                nome: "Transformação de Variáveis (Univariada)",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-5-transformacao-univariada",
                estudo: "Método da FDA e do Jacobiano.",
                tese: "Distribuição de estatísticas.",
                projeto: "Encontrar distribuição de Y = X².",
              },
              {
                nome: "Distribuições Conjuntas e Marginais",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-6-conjuntas",
                estudo: "fdp conjunta. Distribuições marginais.",
                tese: "Modelar sistemas multivariados.",
                projeto: "Calcular distribuições marginais.",
              },
              {
                nome: "Distribuições Condicionais e Covariância",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-7-condicional-covariancia",
                estudo: "Distribuição condicional. Covariância.",
                tese: "Medir dependência linear.",
                projeto: "Analisar correlação.",
              },
              {
                nome: "Esperança Condicional",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-8-esperanca-condicional",
                estudo: "E[X|Y]. Propriedades.",
                tese: "Base para previsão.",
                projeto: "Preditor linear condicional.",
              },
              {
                nome: "Convergência de Variáveis Aleatórias",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-9-convergencia",
                estudo: "Convergência em probabilidade, quase certa.",
                tese: "Justificar Teoremas Limites.",
                projeto: "Simular convergência.",
              },
              {
                nome: "Transformação Multivariada",
                slug: "matematica/probabilidade/variaveis-aleatorias/aula-10-transformacao-multivariada",
                estudo: "Jacobiano para vetores. Convolução.",
                tese: "Distribuição de estatísticas.",
                projeto: "Soma de variáveis independentes.",
              },
            ]
          ),
          T(
            "mat-pb-3",
            "Distribuições Discretas",
            [
              "Introdução às Distribuições Discretas",
              "Distribuição de Bernoulli",
              "Distribuição Binomial",
              "Distribuição de Poisson",
              "Distribuição Geométrica",
              "Distribuição Binomial Negativa",
              "Distribuição Hipergeométrica",
            ],
            [
              {
                nome: "Introdução às Distribuições Discretas",
                slug: "matematica/probabilidade/distribuicoes-discretas/aula-1-introducao",
                estudo: "FP, FD, E[X], Var(X).",
                tese: "Quantificar experimentos discretos.",
                projeto: "Verificar propriedades de FP.",
              },
              {
                nome: "Distribuição de Bernoulli",
                slug: "matematica/probabilidade/distribuicoes-discretas/aula-2-bernoulli",
                estudo: "P(X=x) = p^x(1-p)^{1-x}.",
                tese: "Modelar eventos binários.",
                projeto: "Modelar sensor com p=0,95.",
              },
              {
                nome: "Distribuição Binomial",
                slug: "matematica/probabilidade/distribuicoes-discretas/aula-3-binomial",
                estudo: "P(X=k) = C(n,k) p^k (1-p)^{n-k}.",
                tese: "Modelar número de sucessos.",
                projeto: "Calcular probabilidade de defeitos.",
              },
              {
                nome: "Distribuição de Poisson",
                slug: "matematica/probabilidade/distribuicoes-discretas/aula-4-poisson",
                estudo: "P(X=k) = e^{−λ} λ^k/k!.",
                tese: "Modelar eventos raros.",
                projeto: "Modelar chegadas em filas.",
              },
              {
                nome: "Distribuição Geométrica",
                slug: "matematica/probabilidade/distribuicoes-discretas/aula-5-geometrica",
                estudo: "P(X=k) = (1−p)^{k−1}p.",
                tese: "Tempo até primeiro sucesso.",
                projeto: "Probabilidade de inspeções.",
              },
              {
                nome: "Distribuição Binomial Negativa",
                slug: "matematica/probabilidade/distribuicoes-discretas/aula-6-binomial-negativa",
                estudo: "P(X=k) = C(k−1, r−1) p^r (1−p)^{k−r}.",
                tese: "Número de tentativas até r sucessos.",
                projeto: "Calcular probabilidade.",
              },
              {
                nome: "Distribuição Hipergeométrica",
                slug: "matematica/probabilidade/distribuicoes-discretas/aula-7-hipergeometrica",
                estudo: "Amostragem sem reposição.",
                tese: "Amostragem em populações finitas.",
                projeto: "Calcular probabilidade.",
              },
            ]
          ),
          T(
            "mat-pb-4",
            "Distribuições Contínua",
            [
              "Introdução às Distribuições Contínua",
              "Distribuição Uniforme Contínua",
              "Distribuição Exponencial",
              "Distribuição Normal (Gaussiana)",
              "Distribuição Gama",
              "Distribuição Beta",
              "Distribuição Weibull",
              "Distribuição t-Student",
              "Distribuição Qui-Quadrado (χ²)",
            ],
            [
              {
                nome: "Introdução às Distribuições Contínuas",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-1-introducao",
                estudo: "f(x), F(x), E[X], Var(X).",
                tese: "Modelar grandezas contínuas.",
                projeto: "Verificar propriedades de fdp.",
              },
              {
                nome: "Distribuição Uniforme Contínua",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-2-uniforme",
                estudo: "f(x) = 1/(b-a).",
                tese: "Fenômenos sem informação privilegiada.",
                projeto: "Calcular probabilidade.",
              },
              {
                nome: "Distribuição Exponencial",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-3-exponencial",
                estudo: "f(x) = λe^{−λx}. Falta de memória.",
                tese: "Tempo até próximo evento.",
                projeto: "Calcular P(X>1000).",
              },
              {
                nome: "Distribuição Normal (Gaussiana)",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-4-normal",
                estudo: "f(x) = 1/(σ√(2π)) exp(−(x−μ)²/(2σ²)).",
                tese: "Erros de medição, TCL.",
                projeto: "Calcular probabilidades.",
              },
              {
                nome: "Distribuição Gama",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-5-gama",
                estudo: "Generalização da Exponencial.",
                tese: "Tempo até múltiplos eventos.",
                projeto: "Calcular E[X].",
              },
              {
                nome: "Distribuição Beta",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-6-beta",
                estudo: "Proporções e probabilidades.",
                tese: "Distribuição a priori em Bayes.",
                projeto: "Modelar probabilidade de sucesso.",
              },
              {
                nome: "Distribuição Weibull",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-7-weibull",
                estudo: "Tempos de falha.",
                tese: "Confiabilidade de sistemas.",
                projeto: "Calcular P(falha < 5000h).",
              },
              {
                nome: "Distribuição t-Student",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-8-tstudent",
                estudo: "Inferência com variância desconhecida.",
                tese: "Testes de hipóteses.",
                projeto: "Calcular IC 95%.",
              },
              {
                nome: "Distribuição Qui-Quadrado (χ²)",
                slug: "matematica/probabilidade/distribuicoes-continuas/aula-9-quiquadrado",
                estudo: "Soma de quadrados de Normais.",
                tese: "Testes de aderência.",
                projeto: "Calcular probabilidade.",
              },
            ]
          ),
          T(
            "mat-pb-5",
            "Teorema Limite Central",
            [
              "Covariância e Correlação",
              "Esperança e Variância Condicional",
              "Lei dos Grandes Números (LGN)",
              "Lei dos Grandes Números (LGN)- Parte 2",
              "Teorema Central do Limite (TCL) - Versão Clássica (Lindeberg-Levy)",
              "Teorema Central do Limite (TCL) - Versão Generalizada (Lindeberg-Feller)",
            ],
            [
              {
                nome: "Covariância e Correlação",
                slug: "matematica/probabilidade/conjuntas/aula-1-covariancia",
                estudo: "Cov(X,Y), ρ.",
                tese: "Análise de dependência linear.",
                projeto: "Calcular covariância.",
              },
              {
                nome: "Esperança e Variância Condicional",
                slug: "matematica/probabilidade/conjuntas/aula-2-esperanca-condicional",
                estudo: "Lei da esperança total.",
                tese: "Cálculo de momentos.",
                projeto: "Aplicar lei da esperança total.",
              },
              {
                nome: "Lei dos Grandes Números (LGN)",
                slug: "matematica/probabilidade/conjuntas/aula-3-lgn",
                estudo: "X̄ₙ → μ.",
                tese: "Estabilidade de médias amostrais.",
                projeto: "Simular convergência.",
              },
              {
                nome: "LGN - Parte 2",
                slug: "matematica/probabilidade/conjuntas/aula-4-lgn2",
                estudo: "Lei Fraca vs Lei Forte.",
                tese: "Consistência de estimadores.",
                projeto: "Simular com Chebyshev.",
              },
              {
                nome: "TCL - Versão Clássica",
                slug: "matematica/probabilidade/conjuntas/aula-5-tcl-classico",
                estudo: "Zₙ = (X̄ₙ − μ)/(σ/√n) → N(0,1).",
                tese: "Justificar uso da Normal.",
                projeto: "Simular convergência para Normal.",
              },
              {
                nome: "TCL - Versão Generalizada",
                slug: "matematica/probabilidade/conjuntas/aula-6-tcl-generalizado",
                estudo: "Condições de Lindeberg-Feller.",
                tese: "TCL para variáveis não i.i.d.",
                projeto: "Simular com variâncias diferentes.",
              },
            ]
          ),
        ],
      },
      // ─── 7. INFERÊNCIA ESTATÍSTICA ───
      {
        id: "mat-inf",
        title: "7. Inferência Estatística",
        topics: [
          T(
            "mat-inf-1",
            "Estimação",
            [
              "Estimação Pontual",
              "Métodos de Estimação",
              "Distribuições Amostrais",
              "Intervalos de Confiança I",
              "Intervalos de Confiança II",
              "Determinação do Tamanho Amostral",
            ],
            [
              {
                nome: "Estimação Pontual",
                slug: "matematica/inferencia-estatistica/estimacao/aula-1-pontual",
                estudo: "Estimador, estimativa. Propriedades.",
                tese: "Estimação de parâmetros.",
                projeto: "Calcular estimadores.",
              },
              {
                nome: "Métodos de Estimação",
                slug: "matematica/inferencia-estatistica/estimacao/aula-2-metodos",
                estudo: "Método dos Momentos, Máxima Verossimilhança.",
                tese: "Obtenção de estimadores.",
                projeto: "Estimar parâmetros.",
              },
              {
                nome: "Distribuições Amostrais",
                slug: "matematica/inferencia-estatistica/estimacao/aula-3-distribuicoes-amostrais",
                estudo: "Qui-Quadrado, t-Student, F.",
                tese: "Base para IC e testes.",
                projeto: "Simular distribuições amostrais.",
              },
              {
                nome: "Intervalos de Confiança I",
                slug: "matematica/inferencia-estatistica/estimacao/aula-4-ic-1",
                estudo: "IC para média e proporção.",
                tese: "Quantificar incerteza.",
                projeto: "Construir IC.",
              },
              {
                nome: "Intervalos de Confiança II",
                slug: "matematica/inferencia-estatistica/estimacao/aula-5-ic-2",
                estudo: "IC para variância, diferença de médias.",
                tese: "Comparação de parâmetros.",
                projeto: "Construir IC para diferenças.",
              },
              {
                nome: "Determinação do Tamanho Amostral",
                slug: "matematica/inferencia-estatistica/estimacao/aula-6-tamanho-amostral",
                estudo: "Cálculo do n necessário.",
                tese: "Planejamento de experimentos.",
                projeto: "Calcular tamanho amostral.",
              },
            ]
          ),
          T(
            "mat-inf-2",
            "Testes de Hipóteses",
            [
              "Fundamentos de Testes de Hipóteses",
              "Teste para Médias I",
              "Teste para Médias II",
              "Teste para Variâncias",
              "Testes Não Paramétricos",
              "Poder e Tamanho Amostral",
            ],
            [
              {
                nome: "Fundamentos de Testes de Hipóteses",
                slug: "matematica/inferencia-estatistica/testes-hipoteses/aula-1-fundamentos",
                estudo: "H₀, H₁, α, β, p-valor.",
                tese: "Tomada de decisão.",
                projeto: "Identificar H₀, H₁ e erros.",
              },
              {
                nome: "Teste para Médias I",
                slug: "matematica/inferencia-estatistica/testes-hipoteses/aula-2-medias-1",
                estudo: "Teste z e t para uma amostra.",
                tese: "Comparação de médias.",
                projeto: "Aplicar testes t.",
              },
              {
                nome: "Teste para Médias II",
                slug: "matematica/inferencia-estatistica/testes-hipoteses/aula-3-medias-2",
                estudo: "Teste t pareado, teste para proporções.",
                tese: "Análise antes/depois.",
                projeto: "Aplicar testes para proporções.",
              },
              {
                nome: "Teste para Variâncias",
                slug: "matematica/inferencia-estatistica/testes-hipoteses/aula-4-variancias",
                estudo: "Teste Qui-Quadrado e F.",
                tese: "Homogeneidade de variâncias.",
                projeto: "Testar variâncias.",
              },
              {
                nome: "Testes Não Paramétricos",
                slug: "matematica/inferencia-estatistica/testes-hipoteses/aula-5-nao-parametricos",
                estudo: "Wilcoxon, Mann-Whitney.",
                tese: "Dados sem normalidade.",
                projeto: "Aplicar testes não paramétricos.",
              },
              {
                nome: "Poder e Tamanho Amostral",
                slug: "matematica/inferencia-estatistica/testes-hipoteses/aula-6-poder",
                estudo: "Curvas de poder.",
                tese: "Planejamento de experimentos.",
                projeto: "Calcular n para poder desejado.",
              },
            ]
          ),
          T(
            "mat-inf-3",
            "Modelos Lineares, Correlação e ANOVA",
            [
              "Análise de Correlação",
              "Regressão Linear Simples I",
              "Regressão Linear Simples II",
              "ANOVA I (One-Way)",
              "ANOVA II e Regressão Múltipla",
            ],
            [
              {
                nome: "Análise de Correlação",
                slug: "matematica/inferencia-estatistica/modelos-lineares/aula-1-correlacao",
                estudo: "Correlação de Pearson e Spearman.",
                tese: "Relação linear entre variáveis.",
                projeto: "Calcular e testar correlação.",
              },
              {
                nome: "Regressão Linear Simples I",
                slug: "matematica/inferencia-estatistica/modelos-lineares/aula-2-regressao-1",
                estudo: "Modelo, estimação por MQO.",
                tese: "Modelagem de relação.",
                projeto: "Ajustar modelo de regressão.",
              },
              {
                nome: "Regressão Linear Simples II",
                slug: "matematica/inferencia-estatistica/modelos-lineares/aula-3-regressao-2",
                estudo: "Inferência sobre coeficientes, R².",
                tese: "Validação de modelos.",
                projeto: "Realizar inferência.",
              },
              {
                nome: "ANOVA I (One-Way)",
                slug: "matematica/inferencia-estatistica/modelos-lineares/aula-4-anova-1",
                estudo: "Comparação de 3+ grupos.",
                tese: "Comparação de grupos.",
                projeto: "Aplicar ANOVA.",
              },
              {
                nome: "ANOVA II e Regressão Múltipla",
                slug: "matematica/inferencia-estatistica/modelos-lineares/aula-5-anova-2",
                estudo: "Two-Way ANOVA, regressão múltipla.",
                tese: "Modelos mais complexos.",
                projeto: "Realizar ANOVA e regressão múltipla.",
              },
            ]
          ),
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 3. ALGORITMOS E ESTRUTURAS DE DADOS ok
  // ════════════════════════════════════════════════════════════════
  {
    id: "algoritmos",
    title: "Algoritmos e Estruturas de Dados",
    icon: "🧮",
    color: "#00ff41",
    sections: [
      {
        id: "alg-fundamentos",
        title: "1. Fundamentos da Programação",
        topics: [
          T(
            "alg-fundamentos-1",
            "Introdução à Programação",
            [
              "O que é programação? — Algoritmos e Lógica",
              "O Zen do Python — Filosofia e Princípios",
              "Sintaxe Básica do Python — Case-sensitive, Indentação, Comentários",
              "Execução de Programas — IDLE, IDEs, Terminal, Google Colab",
            ],
            [
              {
                nome: "O que é programação?",
                slug: "algoritmos/fundamentos/programacao",
                estudo: "Algoritmos e lógica de programação.",
                tese: "Base para implementar soluções em FL.",
                projeto: "Criar um algoritmo simples em pseudocódigo.",
              },
              {
                nome: "Zen do Python",
                slug: "algoritmos/fundamentos/zen-python",
                estudo: "Filosofia e princípios do Python (PEP 20).",
                tese: "Escrever código limpo e legível.",
                projeto: "Aplicar os princípios do Zen em um código existente.",
              },
              {
                nome: "Sintaxe Básica do Python",
                slug: "algoritmos/fundamentos/sintaxe",
                estudo: "Case-sensitive, indentação, comentários.",
                tese: "Escrever código Python corretamente.",
                projeto: "Criar um programa com sintaxe correta.",
              },
              {
                nome: "Execução de Programas",
                slug: "algoritmos/fundamentos/execucao",
                estudo: "IDLE, IDEs, Terminal, Google Colab.",
                tese: "Ambientes de desenvolvimento para FL.",
                projeto: "Configurar um ambiente Python e executar um script.",
              },
            ]
          ),
          T(
            "alg-fundamentos-2",
            "Variáveis e Tipos de Dados",
            [
              "O que é uma variável? — Rótulos, ID, Valor, Tipo",
              "Tipos Primitivos — int, float, bool, str, NoneType",
              "Objetos Imutáveis vs Mutáveis — int, str, list, dict",
              "Variáveis Múltiplas — Packing, Unpacking, Swap",
              "Type Casting — Conversão entre tipos (int(), str(), float(), bool())",
            ],
            [
              {
                nome: "Variáveis em Python",
                slug: "algoritmos/fundamentos/variaveis",
                estudo: "Rótulos, ID, Valor, Tipo.",
                tese: "Armazenar dados de clientes e modelos.",
                projeto: "Criar variáveis com diferentes tipos.",
              },
              {
                nome: "Tipos Primitivos",
                slug: "algoritmos/fundamentos/tipos-primitivos",
                estudo: "int, float, bool, str, NoneType.",
                tese: "Representar dados no FL.",
                projeto: "Identificar e usar cada tipo primitivo.",
              },
              {
                nome: "Objetos Imutáveis vs Mutáveis",
                slug: "algoritmos/fundamentos/imutaveis-mutaveis",
                estudo: "int, str, list, dict — diferenças.",
                tese: "Gerenciar dados sensíveis.",
                projeto: "Testar mutabilidade de diferentes tipos.",
              },
              {
                nome: "Variáveis Múltiplas",
                slug: "algoritmos/fundamentos/variaveis-multiplas",
                estudo: "Packing, Unpacking, Swap.",
                tese: "Manipular múltiplos dados.",
                projeto: "Fazer unpacking de uma tupla com dados de cliente.",
              },
              {
                nome: "Type Casting",
                slug: "algoritmos/fundamentos/type-casting",
                estudo: "int(), str(), float(), bool() — conversão entre tipos.",
                tese: "Converter dados para o tipo correto.",
                projeto: "Converter dados recebidos pelo input.",
              },
            ]
          ),
          T(
            "alg-fundamentos-3",
            "Funções Print e Input",
            [
              "Função Print — Sintaxe, sep, end, f-strings, .format(), %",
              "Strings Brutas (Raw Strings) — r'...', caracteres especiais",
              "Função Input — Recebendo dados do usuário, Conversões",
            ],
            [
              {
                nome: "Função Print",
                slug: "algoritmos/fundamentos/print",
                estudo: "sep, end, f-strings, .format(), %.",
                tese: "Exibir resultados e logs do FL.",
                projeto: "Formatar saídas com f-strings.",
              },
              {
                nome: "Strings Brutas (Raw Strings)",
                slug: "algoritmos/fundamentos/raw-strings",
                estudo: "r'...' para caracteres especiais.",
                tese: "Trabalhar com caminhos de arquivos e regex.",
                projeto: "Usar raw strings para caminhos de arquivos.",
              },
              {
                nome: "Função Input",
                slug: "algoritmos/fundamentos/input",
                estudo: "Recebendo dados do usuário, conversões.",
                tese: "Entrada de parâmetros para o modelo.",
                projeto: "Criar um programa interativo com input.",
              },
            ]
          ),
          T(
            "alg-fundamentos-4",
            "Operadores",
            [
              "Precedência de Operadores — Parênteses, Potência, Multiplicação, Soma",
              "Operadores Aritméticos — +, -, *, /, //, %, **",
              "Operadores de Atribuição — =, +=, -=, *=, /=, //=, %=, **=",
              "Operadores de Comparação — ==, !=, >, <, >=, <=",
              "Operadores de Identidade — is, is not",
              "Operadores Lógicos — and, or, not (Tabela Verdade)",
              "Operadores de Pertencimento — in, not in",
            ],
            [
              {
                nome: "Precedência de Operadores",
                slug: "algoritmos/fundamentos/precedencia",
                estudo: "Parênteses, potência, multiplicação, soma.",
                tese: "Calcular expressões corretamente.",
                projeto: "Criar expressões com diferentes operadores.",
              },
              {
                nome: "Operadores Aritméticos",
                slug: "algoritmos/fundamentos/aritmeticos",
                estudo: "+, -, *, /, //, %, **.",
                tese: "Cálculos numéricos para o modelo.",
                projeto: "Calcular médias, porcentagens e potências.",
              },
              {
                nome: "Operadores de Atribuição",
                slug: "algoritmos/fundamentos/atribuicao",
                estudo: "=, +=, -=, *=, /=, //=, %=, **=.",
                tese: "Atualizar variáveis de forma eficiente.",
                projeto: "Usar operadores de atribuição em loops.",
              },
              {
                nome: "Operadores de Comparação",
                slug: "algoritmos/fundamentos/comparacao",
                estudo: "==, !=, >, <, >=, <=.",
                tese: "Comparar resultados e métricas.",
                projeto: "Comparar acurácia de diferentes modelos.",
              },
              {
                nome: "Operadores de Identidade",
                slug: "algoritmos/fundamentos/identidade",
                estudo: "is, is not — verifica se é o mesmo objeto.",
                tese: "Verificar integridade dos dados.",
                projeto: "Comparar objetos com is.",
              },
              {
                nome: "Operadores Lógicos",
                slug: "algoritmos/fundamentos/logicos",
                estudo: "and, or, not — tabela verdade.",
                tese: "Condições lógicas no FL.",
                projeto: "Criar condições com AND, OR, NOT.",
              },
              {
                nome: "Operadores de Pertencimento",
                slug: "algoritmos/fundamentos/pertencimento",
                estudo: "in, not in — verifica presença em coleções.",
                tese: "Verificar se um cliente está na lista.",
                projeto: "Usar in para verificar dados existentes.",
              },
            ]
          ),
        ],
      },
      // ─── 2. ESTRUTURAS DE CONTROLE ───
      {
        id: "alg-controle",
        title: "2. Estruturas de Controle",
        topics: [
          T(
            "alg-controle-1",
            "Estruturas de Decisão — IF",
            [
              "Definição e Sintaxe — if, elif, else",
              "IF com AND, OR, NOT — Combinações lógicas",
              "IF Aninhado — Decisões em cascata",
              "Operador `in` com strings, listas, tuplas, sets, dicionários",
              "IF Ternário — Decisão em uma linha",
              "IF com `any()` e `all()` — Verificações em coleções",
            ],
            [
              {
                nome: "Estruturas de Decisão — IF",
                slug: "algoritmos/controle/if",
                estudo: "if, elif, else, sintaxe e boas práticas.",
                tese: "Decisões no treino do modelo.",
                projeto: "Criar um sistema de aprovação com IF.",
              },
              {
                nome: "IF com AND, OR, NOT",
                slug: "algoritmos/controle/if-logico",
                estudo: "Combinações lógicas para decisões.",
                tese: "Condições complexas no FL.",
                projeto: "Criar IF com múltiplas condições.",
              },
              {
                nome: "IF Aninhado",
                slug: "algoritmos/controle/if-aninhado",
                estudo: "Decisões em cascata.",
                tese: "Hierarquia de decisões.",
                projeto: "Criar um sistema de categorias com IF aninhado.",
              },
              {
                nome: "IF Ternário",
                slug: "algoritmos/controle/if-ternario",
                estudo: "Decisão em uma linha: valor if cond else.",
                tese: "Código compacto para decisões simples.",
                projeto: "Usar IF ternário para validações.",
              },
              {
                nome: "IF com any() e all()",
                slug: "algoritmos/controle/any-all",
                estudo: "Verificações em coleções.",
                tese: "Validar dados do modelo.",
                projeto: "Verificar se todos os clientes têm email.",
              },
            ]
          ),
          T(
            "alg-controle-2",
            "Match-Case (Python 3.10+)",
            [
              "Definição e Sintaxe — match, case, case _",
              "Combinando Valores — case 1 | 2 | 3:",
              "Guards — case valor if condicao:",
              "Quando usar IF vs MATCH",
            ],
            [
              {
                nome: "Match-Case (Python 3.10+)",
                slug: "algoritmos/controle/match-case",
                estudo: "match, case, case _, guards.",
                tese: "Substituir múltiplos IF-ELIF.",
                projeto: "Criar um sistema de status com match-case.",
              },
            ]
          ),
          T(
            "alg-controle-3",
            "Laço While",
            [
              "Definição e Sintaxe — while condicao:",
              "While com Contador — Progressivo, Regressivo, Passo",
              "While com Validação de Entrada — Senha, Menu, Intervalo",
              "While com Flag — Variável booleana de controle",
              "While com Acumulador — Soma, Médias",
              "Break e Continue — Interromper e Pular iterações",
              "While Aninhado — Matrizes, Tabuadas",
              "While com Listas e Arquivos — Percorrer e processar",
              "While True + Break — Loop infinito controlado",
              "While com Sentinela — Valor especial para encerrar",
              "While-Else — Executa se NÃO houve break",
            ],
            [
              {
                nome: "Laço While",
                slug: "algoritmos/controle/while",
                estudo: "while condicao:, contador, validação, flag.",
                tese: "Treinar o modelo até convergir.",
                projeto: 'Criar um loop até o usuário digitar "sair".',
              },
              {
                nome: "Break e Continue",
                slug: "algoritmos/controle/break-continue",
                estudo: "Interromper e pular iterações.",
                tese: "Controle fino de loops.",
                projeto: "Usar break para sair e continue para pular.",
              },
              {
                nome: "While-Else",
                slug: "algoritmos/controle/while-else",
                estudo: "Executa se NÃO houve break.",
                tese: "Detectar se o loop terminou naturalmente.",
                projeto: "Usar while-else para validação.",
              },
            ]
          ),
          T(
            "alg-controle-4",
            "Laço For",
            [
              "Definição e Sintaxe — for item in sequencia:",
              "For com `range()` — range(parada), range(inicio, parada, passo)",
              "For com Strings — Percorrer letras, Contar vogais, Inverter",
              "For com Listas — item, range(len()), enumerate()",
              "For com `enumerate()` — Índice + valor",
              "For com `zip()` — Combinar múltiplas listas",
              "For Aninhado — Tabuadas, Matrizes, Combinações",
              "For com `reversed()` e `sorted()` — Ordem inversa e ordenação",
              "For com Dicionários — keys(), values(), items()",
              "For com Tuplas e Sets",
              "For vs While — Quando usar cada um",
            ],
            [
              {
                nome: "Laço For",
                slug: "algoritmos/controle/for",
                estudo: "for item in sequencia:, range().",
                tese: "Percorrer dados de treino.",
                projeto: "Percorrer lista de clientes.",
              },
              {
                nome: "For com enumerate()",
                slug: "algoritmos/controle/for-enumerate",
                estudo: "Índice + valor simultaneamente.",
                tese: "Acessar posição dos dados.",
                projeto: "Percorrer dados com índice.",
              },
              {
                nome: "For com zip()",
                slug: "algoritmos/controle/for-zip",
                estudo: "Combinar múltiplas listas.",
                tese: "Combinar X e Y para treino.",
                projeto: "Combinar features e labels.",
              },
              {
                nome: "For com reversed() e sorted()",
                slug: "algoritmos/controle/for-reversed-sorted",
                estudo: "Ordem inversa e ordenação.",
                tese: "Ordenar resultados.",
                projeto: "Ordenar lista de acurácias.",
              },
            ]
          ),
        ],
      },
      // ─── 3. ESTRUTURAS DE DADOS ───
      {
        id: "alg-estruturas",
        title: "3. Estruturas de Dados",
        topics: [
          T(
            "alg-estruturas-1",
            "Listas",
            [
              "Definição e Sintaxe — [], list(), listas aninhadas, heterogêneas",
              "Acessando Elementos — Índices, Índices negativos, Slicing, Passo",
              "Modificando Listas — append(), insert(), extend(), concatenação",
              "Removendo Elementos — remove(), pop(), del, clear()",
              "Métodos Principais — append, insert, extend, remove, pop, clear, index, count, sort, reverse, copy, sorted",
              "Percorrendo Listas — for, range, enumerate, zip, while",
              "Ordenação Personalizada — sorted(lista, key=lambda)",
              "Casting de Lista — list → tuple, set, dict, str, join",
            ],
            [
              {
                nome: "Listas em Python",
                slug: "algoritmos/estruturas/listas",
                estudo: "[], list(), listas aninhadas, heterogêneas.",
                tese: "Armazenar dados de clientes e modelos.",
                projeto: "Criar e manipular listas de dados.",
              },
              {
                nome: "Métodos de Listas",
                slug: "algoritmos/estruturas/listas-metodos",
                estudo: "append, insert, extend, remove, pop, clear, index, count, sort, reverse, copy.",
                tese: "Manipular dados dinamicamente.",
                projeto: "Usar métodos para gerenciar uma lista de tarefas.",
              },
              {
                nome: "Slicing e Índices Negativos",
                slug: "algoritmos/estruturas/listas-slicing",
                estudo: "lista[start:end:step], índices negativos.",
                tese: "Acessar subconjuntos de dados.",
                projeto: "Extrair os 5 primeiros e os 5 últimos clientes.",
              },
            ]
          ),
          T(
            "alg-estruturas-2",
            "Tuplas",
            [
              "Definição e Sintaxe — (), (1,), packing, unpacking",
              "Descompactar (Unpacking) — Nome, idade, cidade = pessoa, *resto",
              "Unir Tuplas — Concatenação, Repetição",
              "Métodos — count(), index(), len()",
              "Percorrer Tuplas — for, range, enumerate, zip",
              "Atualizar Tuplas — Converter para lista e voltar",
              "Casting de Tupla — tuple → list, set, dict",
              "Tupla vs Lista — Imutável vs Mutável",
            ],
            [
              {
                nome: "Tuplas",
                slug: "algoritmos/estruturas/tuplas",
                estudo: "(), (1,), packing, unpacking.",
                tese: "Dados imutáveis — usar para configurações.",
                projeto: "Criar uma tupla com as configurações do modelo.",
              },
              {
                nome: "Tuplas vs Listas",
                slug: "algoritmos/estruturas/tuplas-vs-listas",
                estudo: "Imutável vs Mutável, performance.",
                tese: "Quando usar cada uma no FL.",
                projeto: "Comparar performance entre lista e tupla.",
              },
            ]
          ),
          T(
            "alg-estruturas-3",
            "Sets (Conjuntos)",
            [
              "Definição e Sintaxe — {}, set(), set_vazio = set()",
              "Propriedades — Não ordenado, Mutável, Sem duplicatas, Busca rápida",
              "Adicionando Elementos — add(), update()",
              "Removendo Elementos — remove(), discard(), pop(), clear()",
              "Operações de Conjunto — União, Interseção, Diferença, Simétrica",
              "Subconjunto, Superconjunto, Disjunto — issubset, issuperset, isdisjoint",
              "Casting de Set — set → list, tuple, dict",
            ],
            [
              {
                nome: "Sets (Conjuntos)",
                slug: "algoritmos/estruturas/sets",
                estudo: "{}, set(), propriedades: não ordenado, mutável, sem duplicatas.",
                tese: "Eliminar duplicatas de dados.",
                projeto: "Remover clientes duplicados com set.",
              },
              {
                nome: "Operações de Conjunto",
                slug: "algoritmos/estruturas/sets-operacoes",
                estudo: "União, Interseção, Diferença, Simétrica.",
                tese: "Comparar conjuntos de dados.",
                projeto: "Comparar clientes ativos e inativos.",
              },
            ]
          ),
          T(
            "alg-estruturas-4",
            "Dicionários",
            [
              "Definição e Sintaxe — {}, dict(), dict.fromkeys()",
              "Acessando Itens — dict[chave], dict.get(), dict.setdefault()",
              "Métodos — keys(), values(), items(), pop(), popitem(), update()",
              "Percorrendo Dicionários — for, enumerate, zip",
              "Casting de Dicionário — dict → list, tuple, set, json.dumps()",
              "Dicionários Aninhados",
            ],
            [
              {
                nome: "Dicionários",
                slug: "algoritmos/estruturas/dicionarios",
                estudo: "{}, dict(), dict.fromkeys().",
                tese: "Armazenar dados estruturados (JSON-like).",
                projeto: "Criar um dicionário com dados do cliente.",
              },
              {
                nome: "Métodos de Dicionários",
                slug: "algoritmos/estruturas/dicionarios-metodos",
                estudo: "keys(), values(), items(), get(), pop(), popitem(), update().",
                tese: "Manipular dados de clientes.",
                projeto: "Percorrer dicionário com items().",
              },
            ]
          ),
          T(
            "alg-estruturas-5",
            "Conversões entre Estruturas (Casting)",
            [
              "Lista ↔ Tupla — list(tupla), tuple(lista)",
              "Lista ↔ Set — set(lista), list(set)",
              "Tupla ↔ Set — set(tupla), tuple(set)",
              "Lista ↔ Dicionário — dict(lista_de_pares), dict(zip())",
              "Dicionário ↔ Tupla — tuple(dict.keys()), tuple(dict.values()), tuple(dict.items())",
              "Lista ↔ String — str(lista), ', '.join(lista)",
              "Dicionário ↔ String — str(dict), json.dumps(dict)",
              "Remover Duplicatas e Ordenar — sorted(set(lista))",
            ],
            [
              {
                nome: "Conversões entre Estruturas (Casting)",
                slug: "algoritmos/estruturas/conversoes",
                estudo: "list(tupla), tuple(lista), set(lista), dict(lista_de_pares).",
                tese: "Transformar dados entre formatos.",
                projeto: "Converter CSV em lista de dicionários.",
              },
              {
                nome: "Remover Duplicatas e Ordenar",
                slug: "algoritmos/estruturas/remover-duplicatas",
                estudo: "sorted(set(lista)) — elimina duplicatas e ordena.",
                tese: "Limpeza de dados.",
                projeto: "Remover duplicatas de uma lista de nomes.",
              },
            ]
          ),
        ],
      },
      // ─── 4. FUNÇÕES E PARADIGMAS ───
      {
        id: "alg-funcoes",
        title: "4. Funções e Paradigmas",
        topics: [
          T(
            "alg-funcoes-1",
            "Funções em Python",
            [
              "Definição e Sintaxe — def, parâmetros, return",
              "Parâmetros e Argumentos — Posicionais, Nomeados",
              "Parâmetros com Valores Padrão (Default)",
              "Retorno de Valores — return, múltiplos valores (tupla), None",
              "Escopo de Variáveis — LEGB (Local, Enclosing, Global, Built-in)",
              "Palavra-chave `global` — Modificar variável global",
              "Palavra-chave `nonlocal` — Modificar variável enclosing",
              "`*args` — Argumentos Posicionais Variáveis (tupla)",
              "`**kwargs` — Argumentos Nomeados Variáveis (dicionário)",
              "Ordem dos Parâmetros — normais, *args, padrão, **kwargs",
              "Docstrings — Documentação de funções, help(), __doc__",
              "Funções Lambda — lambda parametros: expressao",
              "Funções como Objetos — Atribuir, Passar, Retornar",
              "Funções Aninhadas (Inner Functions) — Closures",
            ],
            [
              {
                nome: "Funções em Python",
                slug: "algoritmos/funcoes/funcoes",
                estudo: "def, parâmetros, return, docstrings.",
                tese: "Reutilizar código no FL.",
                projeto: "Criar funções para calcular médias e acurácias.",
              },
              {
                nome: "Parâmetros e Argumentos",
                slug: "algoritmos/funcoes/parametros",
                estudo: "Posicionais, Nomeados, Default, *args, **kwargs.",
                tese: "Funções flexíveis.",
                projeto: "Criar função com parâmetros padrão e *args.",
              },
              {
                nome: "Escopo de Variáveis (LEGB)",
                slug: "algoritmos/funcoes/escopo",
                estudo: "Local, Enclosing, Global, Built-in.",
                tese: "Gerenciar variáveis no código.",
                projeto: "Criar funções com escopos diferentes.",
              },
              {
                nome: "Funções Lambda",
                slug: "algoritmos/funcoes/lambda",
                estudo: "lambda parametros: expressao.",
                tese: "Funções pequenas e descartáveis.",
                projeto: "Usar lambda com sorted() e map().",
              },
            ]
          ),
          T(
            "alg-funcoes-2",
            "Programação Procedural",
            [
              "Definição — Paradigma baseado em funções e fluxo estruturado",
              "Contexto Histórico — Código espaguete, Dijkstra (1968)",
              "Pilares — Sequência, Decisão, Repetição, Funções",
              "Comparação com Outros Paradigmas — Procedural vs POO vs Funcional",
            ],
            [
              {
                nome: "Programação Procedural",
                slug: "algoritmos/funcoes/procedural",
                estudo: "Sequência, decisão, repetição, funções.",
                tese: "Estruturar código de forma linear.",
                projeto: "Criar um programa procedural para calcular médias.",
              },
            ]
          ),
          T(
            "alg-funcoes-3",
            "Programação Funcional",
            [
              "Definição — Funções matemáticas, imutabilidade",
              "Pilares — Funções Puras, Imutabilidade",
              "`map()` — Transformar elementos",
              "`filter()` — Filtrar elementos",
              "`reduce()` — Reduzir a um valor (functools)",
              "Funções Lambda — Com map, filter, sorted",
              "Vantagens — Código previsível, fácil testar, seguro para concorrência",
            ],
            [
              {
                nome: "Programação Funcional",
                slug: "algoritmos/funcoes/funcional",
                estudo: "map(), filter(), reduce(), lambda, funções puras, imutabilidade.",
                tese: "Transformações de dados eficientes.",
                projeto: "Usar map(), filter() e reduce() num dataset.",
              },
            ]
          ),
        ],
      },
      // ─── 5. PROGRAMAÇÃO ORIENTADA A OBJETOS (POO) ───
      {
        id: "alg-poo",
        title: "5. Programação Orientada a Objetos (POO)",
        topics: [
          T(
            "alg-poo-1",
            "Conceitos Fundamentais de POO",
            [
              "Definição e Conceito — Objetos, Atributos, Métodos",
              "Classe e Objeto — Molde e Instância, class, __init__",
              "Atributos — Públicos, Privados (__atributo), Protegidos (_atributo)",
              "Métodos — Construtor (__init__), Instância, Estático (@staticmethod), Classe (@classmethod)",
              "O `self` — Referência ao objeto, 2 usos (atribuir e ler)",
              "Métodos Especiais (Dunder) — __str__, __len__, __add__, etc.",
            ],
            [
              {
                nome: "Classes e Objetos",
                slug: "algoritmos/poo/classes",
                estudo: "class, __init__, self, atributos, métodos.",
                tese: "Modelar entidades do FL.",
                projeto: "Criar classe Cliente com nome, email e histórico.",
              },
              {
                nome: "Métodos Especiais (Dunder)",
                slug: "algoritmos/poo/dunder",
                estudo: "__str__, __len__, __add__, etc.",
                tese: "Comportamento personalizado.",
                projeto: "Implementar __str__ e __len__ numa classe.",
              },
            ]
          ),
          T(
            "alg-poo-2",
            "Os 4 Pilares da POO",
            [
              "Encapsulamento — Proteger dados internos, Getters/Setters com @property",
              "Herança — Classe filha herda da mãe, super(), Sobrescrita, Herança múltipla",
              "Polimorfismo — Mesmo método, comportamentos diferentes",
              "Abstração — Ocultar implementação, ABC, @abstractmethod",
            ],
            [
              {
                nome: "Encapsulamento",
                slug: "algoritmos/poo/encapsulamento",
                estudo: "Atributos privados (__atributo), getters/setters com @property.",
                tese: "Proteger dados sensíveis.",
                projeto: "Criar uma classe ContaBancaria com @property.",
              },
              {
                nome: "Herança",
                slug: "algoritmos/poo/heranca",
                estudo: "super(), sobrescrita, herança múltipla.",
                tese: "Reutilizar código.",
                projeto: "Criar subclasses de Modelo (MLP, CNN, Transformer).",
              },
              {
                nome: "Polimorfismo",
                slug: "algoritmos/poo/polimorfismo",
                estudo: "Mesmo método, comportamentos diferentes.",
                tese: "Método .treinar() para diferentes modelos.",
                projeto: "Criar classes com método .calcular() diferente.",
              },
              {
                nome: "Abstração",
                slug: "algoritmos/poo/abstracao",
                estudo: "ABC, @abstractmethod, ocultar implementação.",
                tese: "Definir interfaces para modelos.",
                projeto: "Criar classe abstrata Modelo com método .treinar().",
              },
            ]
          ),
          T(
            "alg-poo-3",
            "Modificadores de Acesso",
            [
              "Público (public) — self.atributo, padrão em Python",
              "Protegido (protected) — _atributo, convenção, classe + filhas",
              "Privado (private) — __atributo, name mangling, só a classe",
              "Getters e Setters com @property — Validação de dados",
              "Quando usar cada modificador",
            ],
            [
              {
                nome: "Modificadores de Acesso",
                slug: "algoritmos/poo/modificadores",
                estudo: "public, _protected, __private, @property.",
                tese: "Controlar visibilidade dos dados.",
                projeto: "Criar classe com atributos públicos, protegidos e privados.",
              },
              {
                nome: "Exemplos Práticos de POO",
                slug: "algoritmos/poo/exemplos",
                estudo: "Funcionario, Carro, ContaBancaria, Aluno, Animal, Forma.",
                tese: "Aplicar POO em problemas reais.",
                projeto: "Criar sistema de cadastro com classes.",
              },
            ]
          ),
          T(
            "alg-poo-4",
            "Exemplos Práticos de POO",
            [
              "Classe Funcionario — nome, cargo, apresentar()",
              "Classe Carro — marca, modelo, ligar(), desligar()",
              "Classe ContaBancaria — titular, saldo, depositar(), sacar()",
              "Classe Aluno — nome, matricula, notas, media()",
              "Classe Animal, Cachorro, Gato, Vaca — Polimorfismo",
              "Classe Forma, Circulo, Retangulo — Abstração",
              "Classe Pagamento, CartaoCredito, Boleto, Pix — Polimorfismo",
            ],
            [
              {
                nome: "Exemplos Práticos de POO",
                slug: "algoritmos/poo/exemplos-praticos",
                estudo: "Aplicar POO em problemas reais (Funcionário, Carro, Conta).",
                tese: "Prática de POO.",
                projeto: "Implementar classes e relacionamentos.",
              },
            ]
          ),
        ],
      },
      // ─── 6. GIT E VERSIONAMENTO ───
      {
        id: "alg-git",
        title: "6. Git e Versionamento",
        topics: [
          T(
            "alg-git-1",
            "Fundamentos do Git",
            [
              "O que é Git? — Sistema de controle de versão distribuído",
              "Conceitos — Repositório, Commit, Branch, Merge, Remote, Clone",
              "Estados dos Arquivos — Untracked, Modified, Staged, Committed",
              "Configuração — user.name, user.email, git config",
            ],
            [
              {
                nome: "Fundamentos do Git",
                slug: "algoritmos/git/fundamentos",
                estudo: "Repositório, Commit, Branch, Merge, Remote, Clone.",
                tese: "Versionar código do FL.",
                projeto: "Inicializar um repositório Git local.",
              },
              {
                nome: "Comandos Básicos do Git",
                slug: "algoritmos/git/comandos-basicos",
                estudo: "init, status, add, commit, log, diff, restore.",
                tese: "Fluxo de trabalho básico.",
                projeto: "Fazer commits e verificar histórico.",
              },
              {
                nome: "Trabalhando com Branches",
                slug: "algoritmos/git/branches",
                estudo: "branch, switch, merge, branch -d.",
                tese: "Fluxo de trabalho com branches.",
                projeto: "Criar branch e fazer merge.",
              },
              {
                nome: "Repositórios Remotos (GitHub)",
                slug: "algoritmos/git/remoto",
                estudo: "remote add, push, pull, clone.",
                tese: "Trabalhar em equipe.",
                projeto: "Clonar repositório e enviar alterações.",
              },
            ]
          ),
          T(
            "alg-git-2",
            "Comandos Básicos",
            [
              "git init, git status, git add, git commit -m",
              "git log, git log --oneline, git diff",
              "git restore, git restore --staged",
            ],
            [
              {
                nome: "Comandos Básicos do Git",
                slug: "algoritmos/git/comandos-basicos-2",
                estudo: "init, status, add, commit, log, diff, restore.",
                tese: "Fluxo de trabalho básico.",
                projeto: "Fazer commits e verificar histórico.",
              },
            ]
          ),
          T(
            "alg-git-3",
            "Trabalhando com Branches",
            [
              "git branch, git switch, git switch -c",
              "git merge, git branch -d",
              "Branches e fluxo de trabalho",
            ],
            [
              {
                nome: "Trabalhando com Branches",
                slug: "algoritmos/git/branches-2",
                estudo: "branch, switch, merge, branch -d.",
                tese: "Fluxo de trabalho com branches.",
                projeto: "Criar branch e fazer merge.",
              },
            ]
          ),
          T(
            "alg-git-4",
            "Repositórios Remotos (GitHub)",
            [
              "git remote add origin, git push -u origin main",
              "git push, git pull, git clone",
              "Comandos Avançados — git log --graph, git reset, git stash",
            ],
            [
              {
                nome: "Repositórios Remotos (GitHub)",
                slug: "algoritmos/git/remoto-2",
                estudo: "remote add, push, pull, clone.",
                tese: "Trabalhar em equipe.",
                projeto: "Clonar repositório e enviar alterações.",
              },
            ]
          ),
        ],
      },
      // ─── 7. PIP E GERENCIAMENTO DE PACOTES ───
      {
        id: "alg-pip",
        title: "7. PIP e Gerenciamento de Pacotes",
        topics: [
          T(
            "alg-pip-1",
            "Fundamentos do PIP",
            [
              "O que é PIP? — Gerenciador de pacotes do Python",
              "Verificar Instalação — pip --version, pip3 --version",
              "Comandos Básicos — install, uninstall, list, show, upgrade",
            ],
            [
              {
                nome: "Fundamentos do PIP",
                slug: "algoritmos/pip/fundamentos",
                estudo: "pip --version, install, uninstall, list, show, upgrade.",
                tese: "Instalar bibliotecas do FL.",
                projeto: "Instalar numpy e pandas com pip.",
              },
              {
                nome: "Gerenciamento de Dependências",
                slug: "algoritmos/pip/dependencias",
                estudo: "pip freeze > requirements.txt, pip install -r requirements.txt.",
                tese: "Gerenciar dependências do projeto.",
                projeto: "Criar requirements.txt do projeto.",
              },
            ]
          ),
          T(
            "alg-pip-2",
            "Gerenciamento de Dependências",
            [
              "pip freeze > requirements.txt — Salvar dependências",
              "pip install -r requirements.txt — Instalar dependências",
              "Instalar Versão Específica — pacote==1.5.3",
              "Ambientes Virtuais — python -m venv, activate, deactivate",
            ],
            [
              {
                nome: "Gerenciamento de Dependências",
                slug: "algoritmos/pip/dependencias-2",
                estudo: "pip freeze > requirements.txt, pip install -r requirements.txt.",
                tese: "Gerenciar dependências do projeto.",
                projeto: "Criar requirements.txt do projeto.",
              },
              {
                nome: "Docstrings e Tratamento de Erros",
                slug: "algoritmos/profissional/docstrings-erros",
                estudo: "Docstrings, try/except, raise, erros comuns.",
                tese: "Documentar e tratar erros no FL.",
                projeto: "Adicionar docstrings e tratamento de erros.",
              },
            ]
          ),
        ],
      },
    ],
  },
  
  // ════════════════════════════════════════
  // 4. ENGENHARIA DE DADOS E DATA SCIENCE ok
  // ════════════════════════════════════════
  {
    id: "engenharia-dados",
    title: "Engenharia de Dados e Data Science",
    icon: "🚀",
    color: "#00d4ff",
    sections: [
      // ─── MÓDULO 1: ALGORITMOS E COMPLEXIDADE ───
      {
        id: "eng-algoritmos",
        title: "1. Algoritmos e Complexidade",
        topics: [
          T(
            "eng-classicos-1",
            "Algoritmos de Ordenação",
            [
              "Bubble Sort — Troca elementos adjacentes, O(n²)",
              "Selection Sort — Seleciona menor e coloca no início, O(n²)",
              "Insertion Sort — Insere na posição correta, O(n²)",
              "Merge Sort — Divisão e conquista, O(n log n)",
              "Quick Sort — Particionamento e pivô, O(n log n)",
              "Comparação entre Algoritmos de Ordenação",
            ],
            [
              {
                nome: "Bubble Sort e Selection Sort",
                slug: "engenharia-dados/classicos/bubble-selection",
                estudo: "O(n²), trocas e seleção.",
                tese: "Base para entender algoritmos de ordenação.",
                projeto: "Implementar Bubble Sort e Selection Sort.",
              },
              {
                nome: "Insertion Sort",
                slug: "engenharia-dados/classicos/insertion",
                estudo: "Insere na posição correta, O(n²).",
                tese: "Ordenação simples e eficiente para dados pequenos.",
                projeto: "Implementar Insertion Sort.",
              },
              {
                nome: "Merge Sort",
                slug: "engenharia-dados/classicos/merge",
                estudo: "Divisão e conquista, O(n log n).",
                tese: "Ordenação estável e eficiente.",
                projeto: "Implementar Merge Sort.",
              },
              {
                nome: "Quick Sort",
                slug: "engenharia-dados/classicos/quick",
                estudo: "Particionamento e pivô, O(n log n).",
                tese: "Ordenação rápida e amplamente usada.",
                projeto: "Implementar Quick Sort.",
              },
            ]
          ),
          T(
            "eng-classicos-2",
            "Algoritmos de Busca",
            [
              "Busca Linear — Percorre toda a lista, O(n)",
              "Busca Binária — Divide ao meio, O(log n) (lista ordenada)",
              "Busca em Profundidade (DFS) — Grafos",
              "Busca em Largura (BFS) — Grafos",
            ],
            [
              {
                nome: "Busca Linear e Busca Binária",
                slug: "engenharia-dados/classicos/busca",
                estudo: "Linear O(n), Binária O(log n).",
                tese: "Buscar dados em listas.",
                projeto: "Implementar Busca Linear e Busca Binária.",
              },
              {
                nome: "Busca em Grafos — BFS e DFS",
                slug: "engenharia-dados/classicos/bfs-dfs",
                estudo: "Busca em Largura (BFS) e Profundidade (DFS).",
                tese: "Explorar redes de clientes.",
                projeto: "Implementar BFS e DFS num grafo.",
              },
            ]
          ),
          T(
            "eng-classicos-3",
            "Algoritmos de Grafos",
            [
              "Dijkstra — Menor caminho em grafos com pesos",
              "Kruskal — Árvore geradora mínima",
              "Prim — Árvore geradora mínima",
              "Floyd-Warshall — Todos os caminhos mínimos",
            ],
            [
              {
                nome: "Dijkstra — Menor Caminho",
                slug: "engenharia-dados/classicos/dijkstra",
                estudo: "Menor caminho em grafos com pesos.",
                tese: "Roteamento e otimização.",
                projeto: "Implementar Dijkstra num grafo.",
              },
            ]
          ),
          T(
            "eng-classicos-4",
            "Recursão e Programação Dinâmica",
            [
              "Recursão — Função chama a si mesma, caso base",
              "Memoização — Armazenar resultados para evitar recálculo",
              "Fibonacci — Recursivo vs DP",
              "Problema da Mochila — Knapsack",
              "Maior Subsequência Comum — LCS",
            ],
            [
              {
                nome: "Recursão e Programação Dinâmica",
                slug: "engenharia-dados/classicos/recursao-dp",
                estudo: "Recursão, memoização, Fibonacci, Knapsack, LCS.",
                tese: "Otimizar algoritmos.",
                projeto: "Resolver Fibonacci com recursão e DP.",
              },
            ]
          ),
          T(
            "eng-complexidade-1",
            "Notação Big-O",
            [
              "O(1) — Tempo constante",
              "O(log n) — Tempo logarítmico (Busca Binária)",
              "O(n) — Tempo linear (Busca Linear)",
              "O(n log n) — Merge Sort, Quick Sort",
              "O(n²) — Bubble Sort, Selection Sort",
              "O(2ⁿ) — Recursão exponencial (Fibonacci ingênuo)",
              "O(n!) — Fatorial (Problema do Caixeiro Viajante)",
            ],
            [
              {
                nome: "Notação Big-O",
                slug: "engenharia-dados/complexidade/big-o",
                estudo: "O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!).",
                tese: "Analisar performance dos algoritmos.",
                projeto: "Classificar algoritmos por complexidade.",
              },
              {
                nome: "Análise de Algoritmos",
                slug: "engenharia-dados/complexidade/analise",
                estudo: "Pior Caso, Melhor Caso, Caso Médio, Espaço vs Tempo.",
                tese: "Escolher o melhor algoritmo para o FL.",
                projeto: "Analisar algoritmo de ordenação implementado.",
              },
            ]
          ),
        ],
      },
      // ─── MÓDULO 2: DATA SCIENCE FUNDAMENTOS ───
      {
        id: "eng-datascience",
        title: "2. Data Science Fundamentos",
        topics: [
          T(
            "eng-numpy-1",
            "NumPy - Computação Numérica",
            [
              "Arrays e Operações Básicas — np.array(), shape, dtype, indexing, slicing",
              "Operações Vetorizadas — Broadcasting, ufuncs, operações matemáticas",
              "Álgebra Linear com NumPy — dot(), matmul(), linalg (inv, det, eig)",
              "Random e Estatística — np.random, mean, std, percentile, correlation",
            ],
            [
              {
                nome: "Arrays e Operações Básicas",
                slug: "engenharia-dados/numpy/arrays",
                estudo: "np.array(), shape, dtype, indexing, slicing.",
                tese: "Base para toda computação numérica.",
                projeto: "Criar e manipular arrays multidimensionais.",
              },
              {
                nome: "Operações Vetorizadas",
                slug: "engenharia-dados/numpy/vetorizadas",
                estudo: "Broadcasting, ufuncs, operações matemáticas.",
                tese: "Código rápido sem loops.",
                projeto: "Comparar performance loops vs vetorização.",
              },
              {
                nome: "Álgebra Linear com NumPy",
                slug: "engenharia-dados/numpy/algebra-linear",
                estudo: "dot(), matmul(), linalg (inv, det, eig).",
                tese: "Base para regressão e PCA.",
                projeto: "Resolver sistema linear com NumPy.",
              },
              {
                nome: "Random e Estatística",
                slug: "engenharia-dados/numpy/random",
                estudo: "np.random, mean, std, percentile, correlation.",
                tese: "Simulação e análise estatística.",
                projeto: "Gerar dados sintéticos e calcular estatísticas.",
              },
            ]
          ),
          T(
            "eng-pandas-1",
            "Pandas - Manipulação de Dados",
            [
              "Series e DataFrame — Criação, indexação, seleção, filtros",
              "Limpeza e Pré-processamento — isnull(), dropna(), fillna(), replace, duplicates",
              "Transformações e Agregações — apply(), map(), groupby(), agg(), pivot_table",
              "Combinação de DataFrames — merge(), join(), concat()",
              "Leitura e Escrita de Arquivos — read_csv, read_excel, read_json, to_csv, to_excel",
            ],
            [
              {
                nome: "Series e DataFrame",
                slug: "engenharia-dados/pandas/series-dataframe",
                estudo: "Criação, indexação, seleção, filtros.",
                tese: "Estrutura principal para dados tabulares.",
                projeto: "Criar DataFrame a partir de dicionário/CSV.",
              },
              {
                nome: "Limpeza e Pré-processamento",
                slug: "engenharia-dados/pandas/limpeza",
                estudo: "isnull(), dropna(), fillna(), replace, duplicates.",
                tese: "Dados limpos = análises confiáveis.",
                projeto: "Limpar dataset com dados faltantes.",
              },
              {
                nome: "Transformações e Agregações",
                slug: "engenharia-dados/pandas/agregacoes",
                estudo: "apply(), map(), groupby(), agg(), pivot_table.",
                tese: "Sumarizar e transformar dados.",
                projeto: "Analisar vendas por categoria com groupby.",
              },
              {
                nome: "Combinação de DataFrames",
                slug: "engenharia-dados/pandas/combinacao",
                estudo: "merge(), join(), concat().",
                tese: "Combinar dados de diferentes fontes.",
                projeto: "Unir dados de clientes e pedidos.",
              },
              {
                nome: "Leitura e Escrita de Arquivos",
                slug: "engenharia-dados/pandas/arquivos",
                estudo: "read_csv, read_excel, read_json, to_csv, to_excel.",
                tese: "Importar/exportar dados de diversas fontes.",
                projeto: "Pipeline de ETL com pandas.",
              },
            ]
          ),
          T(
            "eng-visualizacao-1",
            "Visualização de Dados",
            [
              "Matplotlib — plot(), scatter(), hist(), bar(), subplots()",
              "Seaborn — pairplot(), heatmap(), boxplot(), violinplot()",
              "Personalização e Dashboards — Estilos, cores, legendas, anotações",
            ],
            [
              {
                nome: "Matplotlib - Fundamentos",
                slug: "engenharia-dados/visualizacao/matplotlib",
                estudo: "plot(), scatter(), hist(), bar(), subplots().",
                tese: "Visualizar distribuições e tendências.",
                projeto: "Criar gráficos básicos para EDA.",
              },
              {
                nome: "Seaborn - Visualização Estatística",
                slug: "engenharia-dados/visualizacao/seaborn",
                estudo: "pairplot(), heatmap(), boxplot(), violinplot().",
                tese: "Análise exploratória avançada.",
                projeto: "Criar relatório visual completo.",
              },
              {
                nome: "Personalização e Dashboards",
                slug: "engenharia-dados/visualizacao/dashboards",
                estudo: "Estilos, cores, legendas, anotações.",
                tese: "Comunicação efetiva de resultados.",
                projeto: "Criar dashboard de análise.",
              },
            ]
          ),
          T(
            "eng-estatistica-1",
            "Estatística com Python",
            [
              "Estatística Descritiva — Média, mediana, moda, variância, desvio, quartis",
              "Distribuições e Probabilidade — Normal, Binomial, Poisson, uniforme",
              "Testes de Hipótese — t-test, chi-square, ANOVA, correlação",
            ],
            [
              {
                nome: "Estatística Descritiva",
                slug: "engenharia-dados/estatistica/descritiva",
                estudo: "Média, mediana, moda, variância, desvio, quartis.",
                tese: "Entender distribuição dos dados.",
                projeto: "Analisar dataset com estatísticas descritivas.",
              },
              {
                nome: "Distribuições e Probabilidade",
                slug: "engenharia-dados/estatistica/distribuicoes",
                estudo: "Normal, Binomial, Poisson, uniforme.",
                tese: "Modelar incertezas.",
                projeto: "Simular e visualizar distribuições.",
              },
              {
                nome: "Testes de Hipótese",
                slug: "engenharia-dados/estatistica/testes",
                estudo: "t-test, chi-square, ANOVA, correlação.",
                tese: "Tomar decisões baseadas em dados.",
                projeto: "Testar diferenças entre grupos.",
              },
            ]
          ),
          T(
            "eng-projeto-1",
            "Projeto Integrado de Data Science",
            [
              "EDA - Análise Exploratória — Metodologia completa de EDA",
              "Feature Engineering — Criação de features, encoding, scaling",
              "Projeto Final — Integrar tudo (análise, visualização, preparação)",
            ],
            [
              {
                nome: "EDA - Análise Exploratória",
                slug: "engenharia-dados/projeto/eda",
                estudo: "Metodologia completa de EDA.",
                tese: "Entender o dataset antes de modelar.",
                projeto: "EDA completo de um dataset real.",
              },
              {
                nome: "Feature Engineering",
                slug: "engenharia-dados/projeto/feature-engineering",
                estudo: "Criação de features, encoding, scaling.",
                tese: "Preparar dados para modelos.",
                projeto: "Criar pipeline de pré-processamento.",
              },
              {
                nome: "Projeto Final de Data Science",
                slug: "engenharia-dados/projeto/ds-final",
                estudo: "Integrar tudo (análise, visualização, preparação).",
                tese: "Fluxo completo de um projeto DS.",
                projeto: "Projeto completo com entrega de relatório.",
              },
            ]
          ),
        ],
      },
      // ─── MÓDULO 3: BIG DATA E PROCESSAMENTO DISTRIBUÍDO ───
      {
        id: "eng-bigdata",
        title: "3. Big Data e Processamento Distribuído",
        topics: [
          T(
            "eng-bigdata-1",
            "Fundamentos de Big Data",
            [
              "O que é Big Data? — Os 5 Vs, escalabilidade",
              "Arquiteturas de Big Data — Hadoop, Spark, Data Lakes, Data Warehouses",
            ],
            [
              {
                nome: "O que é Big Data?",
                slug: "engenharia-dados/bigdata/fundamentos",
                estudo: "Os 5 Vs, escalabilidade.",
                tese: "Desafios de dados massivos.",
                projeto: "Identificar problemas de escalabilidade.",
              },
              {
                nome: "Arquiteturas de Big Data",
                slug: "engenharia-dados/bigdata/arquiteturas",
                estudo: "Hadoop, Spark, Data Lakes, Data Warehouses.",
                tese: "Escolher a arquitetura certa.",
                projeto: "Desenhar arquitetura para um caso real.",
              },
            ]
          ),
          T(
            "eng-bigdata-2",
            "PySpark - DataFrames",
            [
              "Introdução ao Spark — SparkSession, RDDs, DataFrames",
              "Transformações e Ações — map, filter, groupBy, join, collect, count",
              "SQL com PySpark — spark.sql(), temp views",
              "Otimização e Performance — Partições, cache, shuffles",
            ],
            [
              {
                nome: "Introdução ao Spark",
                slug: "engenharia-dados/bigdata/spark-intro",
                estudo: "SparkSession, RDDs, DataFrames.",
                tese: "Processamento distribuído.",
                projeto: "Criar Spark DataFrame.",
              },
              {
                nome: "Transformações e Ações",
                slug: "engenharia-dados/bigdata/spark-transformacoes",
                estudo: "map, filter, groupBy, join, collect, count.",
                tese: "Pipelines de dados em larga escala.",
                projeto: "ETL com PySpark.",
              },
              {
                nome: "SQL com PySpark",
                slug: "engenharia-dados/bigdata/spark-sql",
                estudo: "spark.sql(), temp views.",
                tese: "SQL em escala.",
                projeto: "Consultar bilhões de registros.",
              },
              {
                nome: "Otimização e Performance",
                slug: "engenharia-dados/bigdata/spark-otimizacao",
                estudo: "Partições, cache, shuffles.",
                tese: "Spark eficiente.",
                projeto: "Otimizar pipeline Spark.",
              },
            ]
          ),
          T(
            "eng-bigdata-3",
            "Dask - Parallel Computing",
            [
              "Introdução ao Dask — Dask DataFrames, Arrays, Delayed",
              "Dask vs Spark — Quando usar cada um",
            ],
            [
              {
                nome: "Introdução ao Dask",
                slug: "engenharia-dados/bigdata/dask-intro",
                estudo: "Dask DataFrames, Arrays, Delayed.",
                tese: "Paralelismo em Python.",
                projeto: "Processar dados com Dask.",
              },
              {
                nome: "Dask vs Spark",
                slug: "engenharia-dados/bigdata/dask-vs-spark",
                estudo: "Quando usar cada um.",
                tese: "Escolher a ferramenta certa.",
                projeto: "Comparar performance Dask vs Spark.",
              },
            ]
          ),
        ],
      },
      // ─── MÓDULO 4: ENGENHARIA DE DADOS ───
      {
        id: "eng-engenharia",
        title: "4. Engenharia de Dados",
        topics: [
          T(
            "eng-etl-1",
            "ETL/ELT Pipelines",
            [
              "O que é ETL? — Extração, Transformação, Carga",
              "Ferramentas de Orquestração — Apache Airflow, Prefect, Dagster",
              "Scheduling e Monitoramento — Cron, logs, alertas",
            ],
            [
              {
                nome: "O que é ETL?",
                slug: "engenharia-dados/engenharia/etl",
                estudo: "Extração, Transformação, Carga.",
                tese: "Fluxo de dados completo.",
                projeto: "Construir pipeline ETL.",
              },
              {
                nome: "Ferramentas de Orquestração",
                slug: "engenharia-dados/engenharia/orquestracao",
                estudo: "Apache Airflow, Prefect, Dagster.",
                tese: "Automatizar pipelines.",
                projeto: "DAG no Airflow.",
              },
              {
                nome: "Scheduling e Monitoramento",
                slug: "engenharia-dados/engenharia/monitoramento",
                estudo: "Cron, logs, alertas.",
                tese: "Pipelines confiáveis.",
                projeto: "Monitorar pipeline em produção.",
              },
            ]
          ),
          T(
            "eng-dw-1",
            "Data Warehousing",
            [
              "Modelagem Dimensional — Star schema, Snowflake schema",
              "Cloud Data Warehouses — BigQuery, Redshift, Snowflake",
              "Estratégias de Ingestão — Batch, streaming, CDC",
            ],
            [
              {
                nome: "Modelagem Dimensional",
                slug: "engenharia-dados/engenharia/modelagem",
                estudo: "Star schema, Snowflake schema.",
                tese: "Organizar dados para análise.",
                projeto: "Modelar Data Warehouse.",
              },
              {
                nome: "Cloud Data Warehouses",
                slug: "engenharia-dados/engenharia/cloud-dw",
                estudo: "BigQuery, Redshift, Snowflake.",
                tese: "Soluções em nuvem.",
                projeto: "Consultar BigQuery.",
              },
              {
                nome: "Estratégias de Ingestão",
                slug: "engenharia-dados/engenharia/ingestao",
                estudo: "Batch, streaming, CDC.",
                tese: "Atualização de dados.",
                projeto: "Pipeline de ingestão.",
              },
            ]
          ),
          T(
            "eng-streaming-1",
            "Streaming e Mensageria",
            [
              "Conceitos de Streaming — Eventos, producers, consumers",
              "Apache Kafka com Python — Topics, partitions, offset",
              "Processamento de Streams — Spark Streaming, Flink",
            ],
            [
              {
                nome: "Conceitos de Streaming",
                slug: "engenharia-dados/engenharia/streaming",
                estudo: "Eventos, producers, consumers.",
                tese: "Dados em tempo real.",
                projeto: "Produtor/consumidor com Kafka.",
              },
              {
                nome: "Apache Kafka com Python",
                slug: "engenharia-dados/engenharia/kafka",
                estudo: "Topics, partitions, offset.",
                tese: "Streaming confiável.",
                projeto: "Pipeline streaming simples.",
              },
              {
                nome: "Processamento de Streams",
                slug: "engenharia-dados/engenharia/stream-processing",
                estudo: "Spark Streaming, Flink.",
                tese: "Processamento em tempo real.",
                projeto: "Análise em tempo real.",
              },
            ]
          ),
        ],
      },
      // ─── MÓDULO 5: DEVOPS E MLOPS ───
      {
        id: "eng-devops",
        title: "5. DevOps e MLOps",
        topics: [
          T(
            "eng-docker-1",
            "Containers e Docker",
            [
              "O que são Containers? — Docker, imagens, containers",
              "Docker Compose — Multi-container, volumes, networks",
              "Registros e Deploy — Docker Hub, push, pull, deploy",
            ],
            [
              {
                nome: "O que são Containers?",
                slug: "engenharia-dados/devops/docker",
                estudo: "Docker, imagens, containers.",
                tese: "Reproducibilidade.",
                projeto: "Dockerizar aplicação Python.",
              },
              {
                nome: "Docker Compose",
                slug: "engenharia-dados/devops/docker-compose",
                estudo: "Multi-container, volumes, networks.",
                tese: "Ambientes completos.",
                projeto: "Jupyter + PostgreSQL com Docker.",
              },
              {
                nome: "Registros e Deploy",
                slug: "engenharia-dados/devops/docker-deploy",
                estudo: "Docker Hub, push, pull, deploy.",
                tese: "Entregar aplicações.",
                projeto: "Publicar imagem Docker.",
              },
            ]
          ),
          T(
            "eng-cicd-1",
            "CI/CD",
            [
              "O que é CI/CD? — Integração e Entrega Contínua",
              "Testes Automatizados — pytest, testes unitários, integração",
              "Deploy Contínuo — Heroku, AWS, GCP",
            ],
            [
              {
                nome: "O que é CI/CD?",
                slug: "engenharia-dados/devops/cicd",
                estudo: "Integração e Entrega Contínua.",
                tese: "Entregar código com qualidade.",
                projeto: "Configurar CI com GitHub Actions.",
              },
              {
                nome: "Testes Automatizados",
                slug: "engenharia-dados/devops/testes",
                estudo: "pytest, testes unitários, integração.",
                tese: "Código confiável.",
                projeto: "Testes para pipeline de dados.",
              },
              {
                nome: "Deploy Contínuo",
                slug: "engenharia-dados/devops/deploy",
                estudo: "Heroku, AWS, GCP.",
                tese: "Produção automatizada.",
                projeto: "Deploy de API de ML.",
              },
            ]
          ),
          T(
            "eng-mlops-1",
            "MLOps",
            [
              "Ciclo de Vida de Modelos — Treino, validação, deploy, monitoramento",
              "Ferramentas de MLOps — MLflow, Kubeflow, Sagemaker",
              "Monitoramento de Modelos — Drift, performance, alertas",
            ],
            [
              {
                nome: "Ciclo de Vida de Modelos",
                slug: "engenharia-dados/mlops/ciclo",
                estudo: "Treino, validação, deploy, monitoramento.",
                tese: "Modelos em produção.",
                projeto: "Diagrama de MLOps.",
              },
              {
                nome: "Ferramentas de MLOps",
                slug: "engenharia-dados/mlops/ferramentas",
                estudo: "MLflow, Kubeflow, Sagemaker.",
                tese: "Gerenciar modelos.",
                projeto: "MLflow para tracking de experimentos.",
              },
              {
                nome: "Monitoramento de Modelos",
                slug: "engenharia-dados/mlops/monitoramento",
                estudo: "Drift, performance, alertas.",
                tese: "Modelos saudáveis.",
                projeto: "Monitorar modelo em produção.",
              },
            ]
          ),
        ],
      },
      // ─── MÓDULO 6: DEEP LEARNING ───
      {
        id: "eng-dl",
        title: "6. Deep Learning",
        topics: [
          T(
            "eng-dl-1",
            "Fundamentos de Redes Neurais",
            [
              "O que é Deep Learning? — Neurônios, ativações, backpropagation",
              "TensorFlow/PyTorch Básico — Tensores, autograd, modelos",
              "Treinamento e Otimização — SGD, Adam, learning rate, batch size",
            ],
            [
              {
                nome: "O que é Deep Learning?",
                slug: "engenharia-dados/dl/fundamentos",
                estudo: "Neurônios, ativações, backpropagation.",
                tese: "Base do DL.",
                projeto: "Implementar perceptron do zero.",
              },
              {
                nome: "TensorFlow/PyTorch Básico",
                slug: "engenharia-dados/dl/frameworks",
                estudo: "Tensores, autograd, modelos.",
                tese: "Frameworks de DL.",
                projeto: "Primeira rede com TensorFlow.",
              },
              {
                nome: "Treinamento e Otimização",
                slug: "engenharia-dados/dl/otimizacao",
                estudo: "SGD, Adam, learning rate, batch size.",
                tese: "Treinar redes efetivamente.",
                projeto: "Otimizar hiperparâmetros.",
              },
            ]
          ),
          T(
            "eng-dl-2",
            "Arquiteturas Clássicas",
            [
              "CNNs - Visão Computacional — Convoluções, pooling, transfer learning",
              "RNNs/LSTMs - Dados Sequenciais — Sequências, memória, vanishing gradients",
              "Transformers e NLP — Attention, BERT, GPT",
            ],
            [
              {
                nome: "CNNs - Visão Computacional",
                slug: "engenharia-dados/dl/cnn",
                estudo: "Convoluções, pooling, transfer learning.",
                tese: "Processar imagens.",
                projeto: "Classificador de imagens com CNN.",
              },
              {
                nome: "RNNs/LSTMs - Dados Sequenciais",
                slug: "engenharia-dados/dl/rnn",
                estudo: "Sequências, memória, vanishing gradients.",
                tese: "Processar séries temporais.",
                projeto: "Previsão de séries temporais.",
              },
              {
                nome: "Transformers e NLP",
                slug: "engenharia-dados/dl/transformers",
                estudo: "Attention, BERT, GPT.",
                tese: "Processar texto.",
                projeto: "Análise de sentimentos com BERT.",
              },
            ]
          ),
          T(
            "eng-dl-3",
            "Projeto Integrado de DL",
            [
              "Projeto de Classificação de Imagens — Pipeline completo de visão computacional",
              "Projeto de NLP — Pipeline completo de processamento de texto",
              "Projeto Final de Deep Learning — Integrar todos os conceitos de DL",
            ],
            [
              {
                nome: "Projeto de Classificação de Imagens",
                slug: "engenharia-dados/dl/projeto-imagens",
                estudo: "Pipeline completo de visão computacional.",
                tese: "Aplicar CNNs em problemas reais.",
                projeto: "Classificador de imagens (CIFAR-10/MNIST).",
              },
              {
                nome: "Projeto de NLP",
                slug: "engenharia-dados/dl/projeto-nlp",
                estudo: "Pipeline completo de processamento de texto.",
                tese: "Aplicar Transformers em problemas reais.",
                projeto: "Análise de sentimentos ou chatbot.",
              },
              {
                nome: "Projeto Final de Deep Learning",
                slug: "engenharia-dados/dl/projeto-final",
                estudo: "Integrar todos os conceitos de DL.",
                tese: "Projeto completo de ponta a ponta.",
                projeto: "Escolher um problema e resolver com DL.",
              },
            ]
          ),
        ],
      },
    ],
  },
  // ════════════════════════════════════════════════════════════════
  // 5. MACHINE LEARNING BÁSICO ok
  // ════════════════════════════════════════════════════════════════

  {
    id: "ml",
    title: "ML Básico",
    icon: "🟢",
    color: "#4ade80",
    sections: [
      // ─── 1. INTRODUÇÃO AO ML ───
      {
        id: "ml-basico-intro",
        title: "1. Introdução ao ML",
        topics: [
          T(
            "ml-basico-intro-1",
            "O que é Machine Learning?",
            [
              "Definição de ML (Arthur Samuel, Tom Mitchell)",
              "Diferença entre IA, ML e Deep Learning",
              "Por que ML agora? (dados, computação, algoritmos)",
              "Aplicações no dia a dia",
            ],
            [
              {
                nome: "O que é Machine Learning?",
                slug: "ml/basico/intro/o-que-e-ml",
                estudo: "Definições de Arthur Samuel e Tom Mitchell. Diferença entre IA, ML e Deep Learning.",
                tese: "Base para todo o estudo de ML.",
                projeto: "Pesquisar 3 aplicações de ML no dia a dia.",
              },
              {
                nome: "Por que ML agora?",
                slug: "ml/basico/intro/por-que-agora",
                estudo: "Dados, computação, algoritmos — os três pilares.",
                tese: "Contexto histórico e atual do ML.",
                projeto: "Criar uma linha do tempo do ML.",
              },
            ]
          ),
          T(
            "ml-basico-intro-2",
            "Tipos de Aprendizado e Ciclo de Vida",
            [
              "Aprendizado Supervisionado — Classificação, Regressão",
              "Aprendizado Não Supervisionado — Clustering, Redução de dimensionalidade",
              "Aprendizado por Reforço — Agente, ambiente, ações, recompensas",
              "Aprendizado Semi-Supervisionado e Auto-Supervisionado",
              "Ciclo de Vida do Projeto — Definição, coleta, pré-processamento, EDA, features, modelo, treino, avaliação, ajuste, implantação, monitoramento",
            ],
            [
              {
                nome: "Tipos de Aprendizado",
                slug: "ml/basico/intro/tipos-aprendizado",
                estudo: "Supervisionado, Não Supervisionado, Reforço, Semi-Supervisionado, Auto-Supervisionado.",
                tese: "Identificar qual tipo usar em cada problema.",
                projeto: "Classificar problemas em cada tipo.",
              },
              {
                nome: "Ciclo de Vida de um Projeto de ML",
                slug: "ml/basico/intro/ciclo-vida",
                estudo: "Definição do problema, coleta, pré-processamento, EDA, features, modelo, treino, avaliação, ajuste, implantação, monitoramento.",
                tese: "Estrutura para projetos de ML.",
                projeto: "Mapear o ciclo de vida para um problema real.",
              },
            ]
          ),
          T(
            "ml-basico-intro-3",
            "Terminologia Básica",
            [
              "Features (características/variáveis)",
              "Labels (rótulos/targets)",
              "Amostras (exemplos/instâncias)",
              "Conjunto de Treino, Validação e Teste",
              "Overfitting e Underfitting",
              "Bias e Variance",
              "Modelo vs Algoritmo",
            ],
            [
              {
                nome: "Terminologia Básica",
                slug: "ml/basico/intro/terminologia",
                estudo: "Features, labels, amostras, treino/validação/teste, overfitting, underfitting, bias, variance.",
                tese: "Vocabulário essencial para ML.",
                projeto: "Identificar cada termo num dataset real.",
              },
              {
                nome: "Terminologia (continuação)",
                slug: "ml/basico/intro/terminologia-2",
                estudo: "Aprofundamento em bias-variance tradeoff, maldição da dimensionalidade, dados desbalanceados.",
                tese: "Aprofundar vocabulário essencial.",
                projeto: "Identificar tradeoffs num dataset real.",
              },
            ]
          ),
        ],
      },
      // ─── 2. PRÉ-PROCESSAMENTO ───
      {
        id: "ml-basico-preprocessing",
        title: "2. Pré-processamento",
        topics: [
          T(
            "ml-basico-preprocessing-1",
            "Análise Exploratória e Limpeza de Dados",
            [
              "Visão Geral dos Dados — shape, info, describe, head, tail",
              "Análise Univariada — Distribuição de cada variável",
              "Análise Bivariada — Relação entre duas variáveis",
              "Análise Multivariada — Correlações, heatmaps, pairplots",
              "Identificação de Padrões e Outliers — Boxplot, z-score, IQR",
              "Valores Ausentes — Remoção, Imputação (média, mediana, moda, KNN)",
              "Valores Duplicados — Remoção",
              "Dados Inconsistentes — Formatação, padronização",
            ],
            [
              {
                nome: "Análise Exploratória de Dados (EDA)",
                slug: "ml/basico/preprocessing/eda",
                estudo: "Visão geral, análise univariada, bivariada, multivariada, identificação de padrões, outliers.",
                tese: "Entender os dados antes de modelar.",
                projeto: "Realizar EDA completa de um dataset.",
              },
              {
                nome: "Limpeza de Dados",
                slug: "ml/basico/preprocessing/limpeza",
                estudo: "Valores ausentes, duplicados, outliers, dados inconsistentes.",
                tese: "Dados limpos são essenciais para ML.",
                projeto: "Limpar um dataset com problemas.",
              },
            ]
          ),
          T(
            "ml-basico-preprocessing-2",
            "Transformação e Engenharia de Features",
            [
              "Escalonamento — StandardScaler, MinMaxScaler, RobustScaler",
              "Transformação de Distribuições — log, sqrt, Box-Cox, Yeo-Johnson",
              "Codificação Categórica — Label Encoding, One-Hot Encoding, Ordinal Encoding, Target Encoding",
              "Criação de Features — Combinações, transformações, interações",
              "Seleção de Features — Filtro, Wrapper, Embutidos",
              "Tratamento de Dados Desbalanceados — SMOTE, ADASYN, Undersampling, Class Weight",
            ],
            [
              {
                nome: "Transformação de Dados",
                slug: "ml/basico/preprocessing/transformacao",
                estudo: "Escalonamento (StandardScaler, MinMaxScaler), transformação de distribuições, codificação categórica.",
                tese: "Preparar dados para modelos.",
                projeto: "Aplicar transformações num dataset.",
              },
              {
                nome: "Engenharia de Features",
                slug: "ml/basico/preprocessing/feature-engineering",
                estudo: "Criação, seleção e extração de features. Tratamento de dados desbalanceados.",
                tese: "Melhorar performance dos modelos.",
                projeto: "Criar features e lidar com desbalanceamento.",
              },
            ]
          ),
        ],
      },
      // ─── 3. REGRESSÃO ───
      {
        id: "ml-basico-regression",
        title: "3. Regressão Linear e Logística",
        topics: [
          T(
            "ml-basico-regression-1",
            "Regressão Linear e Múltipla",
            [
              "Conceitos — Relação linear entre variáveis",
              "Função de Custo — MSE (Mean Squared Error)",
              "Solução Analítica — Equação Normal",
              "Gradiente Descendente — Batch, SGD, Mini-batch",
              "Múltiplas Variáveis Independentes",
              "Interpretação dos Coeficientes",
              "Regularização — Ridge (L2), Lasso (L1), Elastic Net",
              "Métricas — R², RMSE, MAE, MAPE",
            ],
            [
              {
                nome: "Regressão Linear",
                slug: "ml/basico/regression/linear",
                estudo: "Conceitos, MSE, equação normal, gradiente descendente, assunções, métricas (R², RMSE, MAE).",
                tese: "Modelo base para regressão.",
                projeto: "Implementar regressão linear do zero.",
              },
              {
                nome: "Regressão Linear Múltipla",
                slug: "ml/basico/regression/multipla",
                estudo: "Múltiplas variáveis, interpretação de coeficientes, regularização (Ridge, Lasso, Elastic Net).",
                tese: "Modelos mais complexos para regressão.",
                projeto: "Aplicar regressão com regularização.",
              },
            ]
          ),
          T(
            "ml-basico-regression-2",
            "Regressão Logística e Softmax",
            [
              "Conceitos — Probabilidade vs log-odds",
              "Função Sigmóide (Logística)",
              "Função de Custo — Binary Cross-Entropy (Log Loss)",
              "Interpretação — Odds ratio, coeficientes",
              "Limiares de Decisão — Ajuste da curva ROC",
              "Classificação Multiclasse — One-vs-Rest vs Softmax",
              "Função Softmax e Cross-Entropy Loss",
              "Métricas — Accuracy, Precision, Recall, F1, ROC-AUC, Confusion Matrix",
            ],
            [
              {
                nome: "Regressão Logística",
                slug: "ml/basico/regression/logistica",
                estudo: "Sigmóide, Binary Cross-Entropy, interpretação, limiares, métricas (accuracy, precision, recall, f1, roc-auc).",
                tese: "Classificação binária.",
                projeto: "Implementar regressão logística.",
              },
              {
                nome: "Regressão Softmax",
                slug: "ml/basico/regression/softmax",
                estudo: "Classificação multiclasse, One-vs-Rest vs Softmax, Cross-Entropy Loss.",
                tese: "Classificação multiclasse.",
                projeto: "Implementar softmax regressão.",
              },
            ]
          ),
        ],
      },
      // ─── 4. VALIDAÇÃO E MÉTRICAS ───
      {
        id: "ml-basico-validation",
        title: "4. Validação e Métricas",
        topics: [
          T(
            "ml-basico-validation-1",
            "Validação Cruzada",
            [
              "K-Fold Cross-Validation",
              "Stratified K-Fold",
              "Leave-One-Out (LOOCV)",
              "Time Series Split",
              "Holdout — Treino/Validação/Teste (70/15/15 ou 80/10/10)",
              "Escolha do número de folds",
              "Validação Cruzada Aninhada (Nested CV)",
            ],
            [
              {
                nome: "Validação Cruzada",
                slug: "ml/basico/validation/cross-validation",
                estudo: "K-Fold, Stratified K-Fold, LOOCV, Time Series Split, Holdout.",
                tese: "Avaliação robusta de modelos.",
                projeto: "Aplicar cross-validation num modelo.",
              },
              {
                nome: "Validação Cruzada (continuação)",
                slug: "ml/basico/validation/cross-validation-2",
                estudo: "Escolha do número de folds, validação cruzada aninhada, comparação de modelos.",
                tese: "Aprofundar avaliação robusta.",
                projeto: "Comparar modelos com nested CV.",
              },
            ]
          ),
          T(
            "ml-basico-validation-2",
            "Métricas de Classificação e Regressão",
            [
              "Confusion Matrix — TP, TN, FP, FN",
              "Accuracy, Precision, Recall (Sensitivity), F1-Score, Specificity",
              "ROC Curve, AUC (Area Under Curve)",
              "Precision-Recall Curve",
              "Log Loss, MCC (Matthews Correlation Coefficient)",
              "MSE, RMSE, MAE, MAPE",
              "R² (Coefficient of Determination)",
              "Adjusted R²",
            ],
            [
              {
                nome: "Métricas de Classificação",
                slug: "ml/basico/validation/metricas-classificacao",
                estudo: "Confusion Matrix, Accuracy, Precision, Recall, F1, ROC-AUC, Log Loss, MCC.",
                tese: "Avaliação de classificadores.",
                projeto: "Calcular métricas para um classificador.",
              },
              {
                nome: "Métricas de Regressão",
                slug: "ml/basico/validation/metricas-regressao",
                estudo: "MSE, RMSE, MAE, MAPE, R², Adjusted R².",
                tese: "Avaliação de regressores.",
                projeto: "Calcular métricas para um regressor.",
              },
            ]
          ),
          T(
            "ml-basico-validation-3",
            "Métricas de Clustering",
            [
              "Silhouette Score",
              "Davies-Bouldin Index",
              "Calinski-Harabasz Index",
              "Interpretação de métricas",
              "Escolha da métrica adequada para cada problema",
            ],
            [
              {
                nome: "Métricas de Clustering",
                slug: "ml/basico/validation/metricas-clustering",
                estudo: "Silhouette, Davies-Bouldin, Calinski-Harabasz.",
                tese: "Avaliação de agrupamentos.",
                projeto: "Avaliar clusters com métricas.",
              },
              {
                nome: "Métricas de Clustering (continuação)",
                slug: "ml/basico/validation/metricas-clustering-2",
                estudo: "Interpretação de métricas, escolha da métrica adequada para cada problema.",
                tese: "Aprofundar avaliação de agrupamentos.",
                projeto: "Comparar diferentes métricas num mesmo cluster.",
              },
            ]
          ),
        ],
      },
      // ─── 5. KNN ───
      {
        id: "ml-basico-knn",
        title: "5. K-Nearest Neighbors (KNN)",
        topics: [
          T(
            "ml-basico-knn-1",
            "KNN e Variações",
            [
              "Classificação/Regressão baseada em vizinhos",
              "Medidas de Distância — Euclidiana, Manhattan, Minkowski, Chebyshev, Mahalanobis, Hamming, Jaccard",
              "Escolha do K — Trade-off viés-variância",
              "Peso Inverso da Distância",
              "Kernel Weighted KNN",
              "Vantagens — Simples, não paramétrico, intuitivo",
              "Desvantagens — Lento para grandes datasets, sensível a escala, maldição da dimensionalidade",
            ],
            [
              {
                nome: "K-Nearest Neighbors e Regressão",
                slug: "ml/basico/knn/conceitos-regressao",
                estudo: "Classificação/regressão com KNN, distâncias (Euclidiana, Manhattan), escolha do K, média dos k vizinhos.",
                tese: "Modelo simples e intuitivo.",
                projeto: "Implementar KNN do zero para classificação e regressão.",
              },
              {
                nome: "Weighted KNN e Distâncias",
                slug: "ml/basico/knn/weighted-distancias",
                estudo: "Peso inverso da distância, kernel weighted, Mahalanobis, Hamming, Jaccard.",
                tese: "Melhorar predições com KNN.",
                projeto: "Implementar weighted KNN e comparar distâncias.",
              },
            ]
          ),
        ],
      },
      // ─── 6. NAIVE BAYES ───
      {
        id: "ml-basico-naive-bayes",
        title: "6. Naive Bayes",
        topics: [
          T(
            "ml-basico-naive-bayes-1",
            "Teorema de Bayes e Classifier",
            [
              "P(A|B) = P(B|A) * P(A) / P(B)",
              "Evidência, Prior, Likelihood, Posterior",
              "Assunção — Features independentes dado a classe (naive)",
              "Fórmula — P(y|x) ∝ P(y) * ∏ P(x_i|y)",
              "Tipos — GaussianNB, MultinomialNB, BernoulliNB, ComplementNB",
            ],
            [
              {
                nome: "Teorema de Bayes",
                slug: "ml/basico/naive-bayes/bayes",
                estudo: "P(A|B) = P(B|A) * P(A) / P(B). Prior, likelihood, posterior.",
                tese: "Base para classificação probabilística.",
                projeto: "Calcular probabilidades com Bayes.",
              },
              {
                nome: "Naive Bayes Classifier",
                slug: "ml/basico/naive-bayes/classifier",
                estudo: "Assunção de independência, GaussianNB, MultinomialNB, BernoulliNB, ComplementNB.",
                tese: "Classificador rápido e eficaz para texto.",
                projeto: "Aplicar Naive Bayes para classificação de texto.",
              },
            ]
          ),
          T(
            "ml-basico-naive-bayes-2",
            "Laplace Smoothing e Vantagens",
            [
              "Correção — Adicionar 1 para evitar probabilidades zero",
              "Vantagens — Rápido, eficaz para texto, não paramétrico",
              "Desvantagens — Assunção de independência (muitas vezes falsa)",
            ],
            [
              {
                nome: "Laplace Smoothing",
                slug: "ml/basico/naive-bayes/smoothing",
                estudo: "Correção para probabilidades zero.",
                tese: "Evitar overfitting em dados esparsos.",
                projeto: "Implementar Laplace smoothing.",
              },
              {
                nome: "Vantagens e Desvantagens",
                slug: "ml/basico/naive-bayes/vantagens",
                estudo: "Rápido, eficaz para texto, assunção de independência frequentemente falsa.",
                tese: "Quando usar Naive Bayes.",
                projeto: "Analisar prós e contras num problema real.",
              },
            ]
          ),
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 6. MACHINE LEARNING INTERMEDIÁRIO ok
  // ════════════════════════════════════════════════════════════════
  {
    id: "ml-inter",
    title: "ML Intermediário",
    icon: "🧠",
    color: "#8b5cf6",
    sections: [
      // ─── 7. ÁRVORES E ENSEMBLES ───
      {
        id: "ml-inter-trees",
        title: "7. Árvores de Decisão e Ensembles",
        topics: [
          T(
            "ml-inter-trees-1",
            "Árvores de Decisão e Random Forest",
            [
              "Árvores de Decisão — Gini, Entropia, ID3, C4.5, CART, pruning",
              "Vantagens e Desvantagens — Interpretável, overfitting, instabilidade",
              "Random Forest — Bagging, amostragem de features, OOB score",
              "Importância de Features — Gini importance, permutation importance",
            ],
            [
              {
                nome: "Árvores de Decisão",
                slug: "ml/inter/trees/decision-trees",
                estudo: "Gini, Entropia, ID3, C4.5, CART, pruning, vantagens e desvantagens.",
                tese: "Modelo interpretável para ML.",
                projeto: "Implementar árvore de decisão do zero.",
              },
              {
                nome: "Random Forest",
                slug: "ml/inter/trees/random-forest",
                estudo: "Bagging, amostragem de features, importância, OOB score.",
                tese: "Ensemble robusto para ML.",
                projeto: "Treinar Random Forest e analisar importância.",
              },
            ]
          ),
          T(
            "ml-inter-trees-2",
            "Gradient Boosting e Comparação",
            [
              "Gradient Boosting — XGBoost, LightGBM, CatBoost",
              "XGBoost — Regularização, paralelização, pruning",
              "LightGBM — Leaf-wise splitting, mais rápido",
              "CatBoost — Otimizado para variáveis categóricas",
              "Comparação — Interpretabilidade, performance, tuning, velocidade, memória",
            ],
            [
              {
                nome: "Gradient Boosting (XGBoost, LightGBM, CatBoost)",
                slug: "ml/inter/trees/gradient-boosting",
                estudo: "Boosting, XGBoost, LightGBM, CatBoost — diferenças e vantagens.",
                tese: "Modelos de alto desempenho.",
                projeto: "Comparar XGBoost, LightGBM e CatBoost.",
              },
              {
                nome: "Comparação de Modelos de Árvore",
                slug: "ml/inter/trees/comparacao",
                estudo: "Interpretabilidade, performance, tuning, velocidade, memória.",
                tese: "Escolha do modelo adequado.",
                projeto: "Criar tabela comparativa.",
              },
            ]
          ),
        ],
      },

      // ─── 8. REDUÇÃO DE DIMENSIONALIDADE ───
      {
        id: "ml-inter-dimensionality",
        title: "8. Redução de Dimensionalidade",
        topics: [
          T(
            "ml-inter-dimensionality-1",
            "PCA (Principal Component Analysis)",
            [
              "Transformação linear — Encontrar direções de máxima variância",
              "Computação — Autovetores da matriz de covariância",
              "Seleção de Componentes — Variância explicada, scree plot",
              "Aplicações — Redução de ruído, visualização, pré-processamento",
              "Limitações — Linear, sensível a escala",
            ],
            [
              {
                nome: "PCA (Principal Component Analysis)",
                slug: "ml/inter/dimensionality/pca",
                estudo: "Transformação linear, autovetores, variância explicada, scree plot.",
                tese: "Redução de dimensionalidade para ML.",
                projeto: "Aplicar PCA e visualizar componentes.",
              },
              {
                nome: "PCA (continuação)",
                slug: "ml/inter/dimensionality/pca-2",
                estudo: "Seleção de componentes, interpretação, aplicações práticas.",
                tese: "Aprofundar PCA.",
                projeto: "Usar PCA para reduzir dimensionalidade de um dataset.",
              },
            ]
          ),
          T(
            "ml-inter-dimensionality-2",
            "t-SNE, UMAP e Outros Métodos",
            [
              "t-SNE — Redução não-linear, preservação de similaridades, perplexidade",
              "UMAP — Aproximação de variedades, mais rápido que t-SNE",
              "Comparação — PCA vs t-SNE vs UMAP",
              "Outros Métodos — LDA, Isomap, LLE, Autoencoders",
            ],
            [
              {
                nome: "t-SNE",
                slug: "ml/inter/dimensionality/tsne",
                estudo: "Redução não-linear, preservação de similaridades, perplexidade.",
                tese: "Visualização de clusters.",
                projeto: "Visualizar dados com t-SNE.",
              },
              {
                nome: "UMAP e Outros Métodos",
                slug: "ml/inter/dimensionality/umap",
                estudo: "UMAP, LDA, Isomap, LLE, Autoencoders.",
                tese: "Métodos avançados de redução.",
                projeto: "Comparar PCA, t-SNE e UMAP.",
              },
            ]
          ),
        ],
      },

      // ─── 9. CLUSTERING ───
      {
        id: "ml-inter-clustering",
        title: "9. Clustering (Agrupamento)",
        topics: [
          T(
            "ml-inter-clustering-1",
            "K-Means e Clustering Hierárquico",
            [
              "K-Means — Centróides, K-Means++, Elbow, Silhouette, limitações",
              "Clustering Hierárquico — Aglomerativo, divisivo, dendrograma",
              "Medidas de Distância — Single, complete, average, Ward",
            ],
            [
              {
                nome: "K-Means",
                slug: "ml/inter/clustering/kmeans",
                estudo: "Centróides, K-Means++, Elbow, Silhouette, limitações.",
                tese: "Agrupamento de dados.",
                projeto: "Implementar K-Means e escolher K.",
              },
              {
                nome: "Clustering Hierárquico",
                slug: "ml/inter/clustering/hierarquico",
                estudo: "Aglomerativo, divisivo, dendrograma, medidas de distância.",
                tese: "Análise hierárquica de dados.",
                projeto: "Aplicar clustering hierárquico e interpretar dendrograma.",
              },
            ]
          ),
          T(
            "ml-inter-clustering-2",
            "DBSCAN e Gaussian Mixture Models (GMM)",
            [
              "DBSCAN — Densidade, eps, minPts, pontos centrais/borda/ruído",
              "Vantagens — Clusters de forma arbitrária, robusto a outliers",
              "GMM — Mistura de Gaussianas, EM Algorithm",
              "Comparação — K-Means vs GMM",
            ],
            [
              {
                nome: "DBSCAN",
                slug: "ml/inter/clustering/dbscan",
                estudo: "Densidade, eps, minPts, pontos centrais/borda/ruído.",
                tese: "Clusters de forma arbitrária.",
                projeto: "Aplicar DBSCAN e ajustar parâmetros.",
              },
              {
                nome: "Gaussian Mixture Models (GMM)",
                slug: "ml/inter/clustering/gmm",
                estudo: "Mistura de Gaussianas, EM Algorithm, clusters elípticos.",
                tese: "Agrupamento probabilístico.",
                projeto: "Aplicar GMM e comparar com K-Means.",
              },
            ]
          ),
          T(
            "ml-inter-clustering-3",
            "Avaliação de Clustering",
            [
              "Métricas Internas — Silhouette, Davies-Bouldin, Calinski-Harabasz",
              "Métricas Externas — Adjusted Rand Index, Mutual Information",
              "Interpretação e escolha da métrica adequada",
            ],
            [
              {
                nome: "Avaliação de Clustering",
                slug: "ml/inter/clustering/avaliacao",
                estudo: "Métricas internas e externas.",
                tese: "Validar agrupamentos.",
                projeto: "Avaliar clusters com diferentes métricas.",
              },
              {
                nome: "Avaliação de Clustering (continuação)",
                slug: "ml/inter/clustering/avaliacao-2",
                estudo: "Escolha da métrica adequada, interpretação de resultados.",
                tese: "Aprofundar validação de agrupamentos.",
                projeto: "Comparar resultados de diferentes métricas.",
              },
            ]
          ),
        ],
      },

      // ─── 10. SVM ───
      {
        id: "ml-inter-svm",
        title: "10. Máquinas de Vetores de Suporte (SVM)",
        topics: [
          T(
            "ml-inter-svm-1",
            "Conceitos de SVM e Kernel Trick",
            [
              "Classificação com Margem Máxima — Support vectors, hyperplano",
              "Hard Margin vs Soft Margin — Função de custo hinge",
              "Kernel Trick — Linear, Polinomial, RBF, Sigmóide",
              "Parâmetros — C (regularização), γ (kernel), d (grau)",
            ],
            [
              {
                nome: "Conceitos de SVM",
                slug: "ml/inter/svm/conceitos",
                estudo: "Margem máxima, support vectors, hyperplano, hard vs soft margin.",
                tese: "Classificador poderoso para ML.",
                projeto: "Implementar SVM linear do zero.",
              },
              {
                nome: "Kernel Trick",
                slug: "ml/inter/svm/kernel",
                estudo: "Linear, Polinomial, RBF, Sigmóide, escolha do kernel, parâmetros C e γ.",
                tese: "Classificação não-linear.",
                projeto: "Comparar kernels em SVM num dataset.",
              },
            ]
          ),
          T(
            "ml-inter-svm-2",
            "SVR e Vantagens/Desvantagens",
            [
              "SVM para Regressão (SVR) — ε-insensitive, parâmetros ε e C",
              "Vantagens — Eficácia em alta dimensão, adaptável com kernels",
              "Desvantagens — Tuning difícil, lento para grandes datasets",
            ],
            [
              {
                nome: "SVM para Regressão (SVR)",
                slug: "ml/inter/svm/svr",
                estudo: "ε-insensitive, parâmetros ε e C.",
                tese: "Regressão com SVM.",
                projeto: "Aplicar SVR num problema de regressão.",
              },
              {
                nome: "Vantagens e Desvantagens do SVM",
                slug: "ml/inter/svm/vantagens",
                estudo: "Eficácia em alta dimensão, tuning difícil, lento para grandes datasets.",
                tese: "Quando usar SVM.",
                projeto: "Analisar prós e contras num problema real.",
              },
            ]
          ),
        ],
      },

      // ─── 11. ENSEMBLE AVANÇADO ───
      {
        id: "ml-inter-ensemble",
        title: "11. Ensemble Avançado",
        topics: [
          T(
            "ml-inter-ensemble-1",
            "Voting, Stacking e Comparação",
            [
              "Voting — Hard voting (maioria) vs Soft voting (probabilidades)",
              "Stacking — Meta-modelo treinado em previsões de base models",
              "Bagging vs Boosting vs Stacking — Performance, interpretabilidade, tuning",
            ],
            [
              {
                nome: "Voting e Stacking",
                slug: "ml/inter/ensemble/voting-stacking",
                estudo: "Hard voting, soft voting, stacking (meta-modelo).",
                tese: "Combinação de modelos para melhor performance.",
                projeto: "Criar um ensemble com voting e stacking.",
              },
              {
                nome: "Comparação de Ensembles",
                slug: "ml/inter/ensemble/comparacao",
                estudo: "Bagging vs Boosting vs Stacking — performance, interpretabilidade, tuning.",
                tese: "Escolha do ensemble adequado.",
                projeto: "Criar tabela comparativa de ensembles.",
              },
            ]
          ),
        ],
      },

      // ─── 12. SÉRIES TEMPORAIS ───
      {
        id: "ml-inter-timeseries",
        title: "12. Séries Temporais",
        topics: [
          T(
            "ml-inter-timeseries-1",
            "Conceitos e Modelos ARIMA/SARIMA",
            [
              "Componentes — Tendência, sazonalidade, ciclo, ruído",
              "Estacionaridade — Testes ADF e KPSS",
              "ARIMA — AR, I, MA, p,d,q",
              "SARIMA — Com sazonalidade, P,D,Q,S",
            ],
            [
              {
                nome: "Conceitos de Séries Temporais",
                slug: "ml/inter/timeseries/conceitos",
                estudo: "Tendência, sazonalidade, ciclo, ruído, estacionaridade, ADF, KPSS.",
                tese: "Análise de dados temporais.",
                projeto: "Analisar estacionaridade de uma série real.",
              },
              {
                nome: "ARIMA e SARIMA",
                slug: "ml/inter/timeseries/arima",
                estudo: "AR, I, MA, p,d,q, sazonalidade, P,D,Q,S.",
                tese: "Modelos clássicos para séries temporais.",
                projeto: "Ajustar ARIMA e SARIMA a uma série real.",
              },
            ]
          ),
          T(
            "ml-inter-timeseries-2",
            "Prophet, LSTM e Métricas",
            [
              "Prophet (Facebook) — Modelo aditivo com sazonalidade e feriados",
              "LSTM para Séries Temporais — Captura dependências temporais",
              "Métricas — MSE, RMSE, MAE, MAPE, sMAPE, MASE",
            ],
            [
              {
                nome: "Prophet e LSTM para Séries",
                slug: "ml/inter/timeseries/prophet-lstm",
                estudo: "Prophet (Facebook), LSTM para séries temporais.",
                tese: "Modelos modernos para séries temporais.",
                projeto: "Comparar Prophet e LSTM num dataset de séries.",
              },
              {
                nome: "Métricas para Séries Temporais",
                slug: "ml/inter/timeseries/metricas",
                estudo: "MSE, RMSE, MAE, MAPE, sMAPE, MASE.",
                tese: "Avaliação de previsões temporais.",
                projeto: "Calcular métricas para previsões de séries.",
              },
            ]
          ),
        ],
      },

      // ─── 13. XAI ───
      {
        id: "ml-inter-xai",
        title: "13. ML Explicável (XAI)",
        topics: [
          T(
            "ml-inter-xai-1",
            "Motivação e Técnicas Globais",
            [
              "Por que Explicabilidade? — Confiança, transparência, GDPR",
              "Global vs Local — Tipos de explicação",
              "Feature Importance — Gini, permutation",
              "PDP (Partial Dependence Plots) — Efeito marginal de uma feature",
              "ALE (Accumulated Local Effects) e Surrogate Models",
            ],
            [
              {
                nome: "Por que Explicabilidade?",
                slug: "ml/inter/xai/motivacao",
                estudo: "Confiança, transparência, GDPR, tipos (global vs local).",
                tese: "Importância da explicabilidade em ML.",
                projeto: "Identificar casos onde XAI é crítica num setor regulado.",
              },
              {
                nome: "Técnicas de Explicabilidade Global",
                slug: "ml/inter/xai/global",
                estudo: "Feature Importance, PDP, ALE, Surrogate Models.",
                tese: "Explicações globais do modelo.",
                projeto: "Calcular feature importance e PDP de um modelo.",
              },
            ]
          ),
          T(
            "ml-inter-xai-2",
            "Técnicas Locais e Ferramentas",
            [
              "LIME — Model-agnostic, explicações locais",
              "SHAP — Shapley Values, consistente e robusto",
              "Integrated Gradients — Para redes neurais",
              "Grad-CAM — Para CNNs (visualização de atenção)",
              "Ferramentas — SHAP Library, LIME, InterpretML, ELI5, Captum",
            ],
            [
              {
                nome: "Técnicas de Explicabilidade Local",
                slug: "ml/inter/xai/local",
                estudo: "LIME, SHAP, Integrated Gradients, Grad-CAM.",
                tese: "Explicações para decisões individuais.",
                projeto: "Aplicar SHAP e LIME num modelo e comparar resultados.",
              },
              {
                nome: "Ferramentas de XAI",
                slug: "ml/inter/xai/ferramentas",
                estudo: "SHAP Library, LIME, InterpretML, ELI5, Captum, TensorFlow Explainability.",
                tese: "Ferramentas práticas para explicabilidade.",
                projeto: "Usar SHAP e LIME para explicar predições de um modelo.",
              },
            ]
          ),
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 7. MACHINE LEARNING AVANÇADO ok
  // ════════════════════════════════════════════════════════════════
  {
    id: "ml-adv",
    title: "ML Avançado",
    icon: "🔥",
    color: "#4c1d95",
    sections: [
      // ─── 14. DEEP LEARNING - FUNDAMENTOS ───
      {
        id: "ml-adv-dl",
        title: "14. Deep Learning - Fundamentos",
        topics: [
          T(
            "ml-adv-dl-1",
            "Perceptron e Neurônio Artificial",
            [
              "Modelo Matemático — y = f(Σ w_i*x_i + b)",
              "Funções de Ativação — Step, Sigmoid, Tanh, ReLU, Leaky ReLU, ELU, Swish, GELU",
            ],
            [
              {
                nome: "Perceptron e Neurônio Artificial",
                slug: "ml/adv/dl/perceptron",
                estudo: "y = f(Σ w_i*x_i + b), funções de ativação (Sigmoid, Tanh, ReLU, Leaky ReLU, Swish, GELU).",
                tese: "Base das redes neurais.",
                projeto: "Implementar um perceptron do zero.",
              },
              {
                nome: "Funções de Ativação",
                slug: "ml/adv/dl/ativacoes",
                estudo: "Sigmoid, Tanh, ReLU, Leaky ReLU, ELU, Swish, GELU — comparação e usos.",
                tese: "Escolha da ativação para cada problema.",
                projeto: "Comparar funções de ativação num modelo.",
              },
            ]
          ),
          T(
            "ml-adv-dl-2",
            "Redes Neurais Feedforward (MLP)",
            [
              "Arquitetura — Entrada, ocultas, saída",
              "Forward Propagation — Calcular saída",
              "Backpropagation — Calcular gradientes",
              "Funções de Custo — MSE, Cross-Entropy, Hinge, Huber",
              "Otimizadores — SGD, Momentum, Nesterov, Adam, RMSprop, AdamW, Nadam",
            ],
            [
              {
                nome: "Redes Neurais Feedforward (MLP)",
                slug: "ml/adv/dl/mlp",
                estudo: "Forward propagation, backpropagation, funções de custo, otimizadores (SGD, Adam, RMSprop).",
                tese: "Redes neurais básicas.",
                projeto: "Implementar MLP com backpropagation.",
              },
              {
                nome: "Otimizadores em DL",
                slug: "ml/adv/dl/otimizadores",
                estudo: "SGD, Momentum, Nesterov, Adam, RMSprop, AdamW, Nadam — comparação.",
                tese: "Escolha do otimizador para convergência.",
                projeto: "Comparar otimizadores num modelo.",
              },
            ]
          ),
          T(
            "ml-adv-dl-3",
            "Regularização em Redes Neurais",
            [
              "L1/L2 Regularization",
              "Dropout — Desativa neurônios aleatoriamente",
              "Batch Normalization — Normaliza ativações",
              "Early Stopping",
              "Data Augmentation",
              "Weight Decay",
            ],
            [
              {
                nome: "Regularização em Redes Neurais",
                slug: "ml/adv/dl/regularizacao",
                estudo: "L1/L2, Dropout, Batch Normalization, Early Stopping, Data Augmentation, Weight Decay.",
                tese: "Evitar overfitting em redes.",
                projeto: "Aplicar regularização a uma MLP.",
              },
              {
                nome: "Batch Normalization e Dropout",
                slug: "ml/adv/dl/batch-dropout",
                estudo: "Batch Normalization, Dropout — como e quando usar.",
                tese: "Técnicas de regularização modernas.",
                projeto: "Comparar com e sem BatchNorm/Dropout.",
              },
            ]
          ),
          T(
            "ml-adv-dl-4",
            "Inicialização de Pesos e Frameworks",
            [
              "Inicialização — Xavier (Glorot), He, LeCun",
              "TensorFlow / Keras — Mais popular",
              "PyTorch — Dinâmico, pesquisa, Pythonic",
              "JAX — Derivadas automáticas, pesquisa",
            ],
            [
              {
                nome: "Inicialização de Pesos",
                slug: "ml/adv/dl/inicializacao",
                estudo: "Xavier (Glorot), He, LeCun.",
                tese: "Importante para convergência.",
                projeto: "Comparar diferentes inicializações.",
              },
              {
                nome: "Frameworks de Deep Learning",
                slug: "ml/adv/dl/frameworks",
                estudo: "TensorFlow/Keras, PyTorch, JAX.",
                tese: "Ferramentas para implementar DL.",
                projeto: "Treinar uma MLP com Keras e PyTorch.",
              },
            ]
          ),
        ],
      },

      // ─── 15. CNN ───
      {
        id: "ml-adv-cnn",
        title: "15. Redes Neurais Convolucionais (CNN)",
        topics: [
          T(
            "ml-adv-cnn-1",
            "Conceitos de CNN",
            [
              "Conv1D, Conv2D, Conv3D — Operações de convolução",
              "Kernels (Filtros) — Detectam características",
              "Stride — Passo da convolução",
              "Padding — Same vs Valid",
              "Pooling — MaxPooling, AveragePooling, GlobalAvgPooling",
              "Flatten — Transformar para vetor",
            ],
            [
              {
                nome: "Conceitos de CNN",
                slug: "ml/adv/cnn/conceitos",
                estudo: "Conv1D/2D/3D, kernels, stride, padding, pooling, flatten.",
                tese: "Processamento de imagens.",
                projeto: "Implementar uma CNN simples.",
              },
              {
                nome: "Pooling e Padding",
                slug: "ml/adv/cnn/pooling-padding",
                estudo: "MaxPooling, AveragePooling, GlobalAvgPooling, tipos de padding.",
                tese: "Redução de dimensionalidade em CNNs.",
                projeto: "Comparar diferentes tipos de pooling.",
              },
            ]
          ),
          T(
            "ml-adv-cnn-2",
            "Arquiteturas Clássicas",
            [
              "LeNet-5 — Primeira CNN (1998)",
              "AlexNet — Revolucionou ILSVRC 2012",
              "VGG — Muito profunda, simples",
              "ResNet — Conexões de atalho (skip connections)",
              "Inception (GoogLeNet) — Módulos de convolução paralelos",
              "DenseNet — Conexões densas",
              "EfficientNet — Balanceamento de largura, profundidade, resolução",
            ],
            [
              {
                nome: "Arquiteturas Clássicas",
                slug: "ml/adv/cnn/arquiteturas",
                estudo: "LeNet-5, AlexNet, VGG, ResNet, Inception, DenseNet, EfficientNet.",
                tese: "Arquiteturas de referência.",
                projeto: "Comparar arquiteturas num dataset.",
              },
              {
                nome: "ResNet e Skip Connections",
                slug: "ml/adv/cnn/resnet",
                estudo: "Conexões de atalho (skip connections), residual blocks.",
                tese: "Redes muito profundas sem vanishing gradient.",
                projeto: "Implementar um residual block.",
              },
            ]
          ),
          T(
            "ml-adv-cnn-3",
            "Transfer Learning",
            [
              "Conceitos — Usar modelos pré-treinados",
              "Fine-tuning — Ajustar pesos para a tarefa específica",
              "Feature Extraction — Usar features de modelos pré-treinados",
              "Modelos Pré-treinados — ResNet50, VGG16, InceptionV3, EfficientNet, MobileNet, DenseNet",
            ],
            [
              {
                nome: "Transfer Learning",
                slug: "ml/adv/cnn/transfer-learning",
                estudo: "Fine-tuning, feature extraction, modelos pré-treinados (ResNet50, VGG16, EfficientNet).",
                tese: "Reutilizar modelos pré-treinados.",
                projeto: "Aplicar transfer learning com ResNet50.",
              },
              {
                nome: "Feature Extraction vs Fine-tuning",
                slug: "ml/adv/cnn/feature-vs-finetune",
                estudo: "Diferenças entre feature extraction e fine-tuning.",
                tese: "Quando usar cada técnica.",
                projeto: "Comparar feature extraction e fine-tuning.",
              },
            ]
          ),
          T(
            "ml-adv-cnn-4",
            "Aplicações de CNN",
            [
              "Classificação de Imagens",
              "Detecção de Objetos — YOLO, SSD, Faster R-CNN",
              "Segmentação Semântica — U-Net, Mask R-CNN",
              "Geração de Imagens — GANs, Diffusion Models",
            ],
            [
              {
                nome: "Aplicações de CNN",
                slug: "ml/adv/cnn/aplicacoes",
                estudo: "Classificação, detecção (YOLO, SSD), segmentação (U-Net), geração (GANs).",
                tese: "Aplicações práticas.",
                projeto: "Explorar uma aplicação de CNN.",
              },
              {
                nome: "YOLO e Detecção de Objetos",
                slug: "ml/adv/cnn/yolo",
                estudo: "YOLO (You Only Look Once), SSD, Faster R-CNN.",
                tese: "Detecção em tempo real.",
                projeto: "Explorar YOLO num dataset.",
              },
            ]
          ),
        ],
      },

      // ─── 16. RNN ───
      {
        id: "ml-adv-rnn",
        title: "16. Redes Neurais Recorrentes (RNN)",
        topics: [
          T(
            "ml-adv-rnn-1",
            "Conceitos de RNN",
            [
              "Processamento Sequencial — Estados internos (memória)",
              "Elman RNN / Jordan RNN",
              "Desafios — Vanishing gradients, exploding gradients",
            ],
            [
              {
                nome: "Conceitos de RNN",
                slug: "ml/adv/rnn/conceitos",
                estudo: "Processamento sequencial, estados internos, vanishing/exploding gradients.",
                tese: "Dados sequenciais.",
                projeto: "Implementar uma RNN simples.",
              },
              {
                nome: "Vanishing e Exploding Gradients",
                slug: "ml/adv/rnn/gradientes",
                estudo: "Causas e soluções para vanishing/exploding gradients.",
                tese: "Desafios de RNNs.",
                projeto: "Analisar gradientes em uma RNN.",
              },
            ]
          ),
          T(
            "ml-adv-rnn-2",
            "LSTM (Long Short-Term Memory)",
            [
              "Arquitetura — Células de memória, portas (forget, input, output)",
              "Esquecimento — Decide o que esquecer",
              "Entrada — Decide o que adicionar",
              "Saída — Decide o que produzir",
            ],
            [
              {
                nome: "LSTM",
                slug: "ml/adv/rnn/lstm",
                estudo: "Células de memória, portas forget, input, output.",
                tese: "Memória de longo prazo.",
                projeto: "Implementar LSTM para previsão.",
              },
              {
                nome: "Portas LSTM",
                slug: "ml/adv/rnn/lstm-portas",
                estudo: "Forget gate, input gate, output gate — como funcionam.",
                tese: "Mecanismo interno do LSTM.",
                projeto: "Desenhar o diagrama de uma LSTM.",
              },
            ]
          ),
          T(
            "ml-adv-rnn-3",
            "GRU e Técnicas Avançadas",
            [
              "GRU — Versão mais simples que LSTM, menos parâmetros",
              "Bidirectional RNN (BiRNN) — Contexto futuro e passado",
              "Stacked RNN — Múltiplas camadas",
              "Attention — Focalizar partes específicas",
              "Teacher Forcing — Usar saída real durante treino",
            ],
            [
              {
                nome: "GRU",
                slug: "ml/adv/rnn/gru",
                estudo: "GRU (Gated Recurrent Unit), reset e update gates.",
                tese: "Alternativa mais simples ao LSTM.",
                projeto: "Comparar LSTM e GRU.",
              },
              {
                nome: "Bidirectional e Stacked RNN",
                slug: "ml/adv/rnn/bidirectional-stacked",
                estudo: "Bidirectional RNN, Stacked RNN, Attention.",
                tese: "Avanços em RNN.",
                projeto: "Implementar BiRNN e comparar com RNN simples.",
              },
            ]
          ),
        ],
      },

      // ─── 17. NLP ───
      {
        id: "ml-adv-nlp",
        title: "17. Processamento de Linguagem Natural (NLP)",
        topics: [
          T(
            "ml-adv-nlp-1",
            "Pré-processamento de Texto",
            [
              "Tokenização — Palavras (word) ou subpalavras (subword)",
              "Stop Words — Remover palavras comuns",
              "Stemming — Redução a radical (Porter, Snowball)",
              "Lemmatization — Redução a forma canônica (lemma)",
              "Bag-of-Words (BoW) — Representação vetorial",
              "TF-IDF — Term frequency - inverse document frequency",
            ],
            [
              {
                nome: "Pré-processamento de Texto",
                slug: "ml/adv/nlp/preprocessamento",
                estudo: "Tokenização, stop words, stemming, lemmatization, BoW, TF-IDF.",
                tese: "Preparar texto para modelos.",
                projeto: "Pré-processar um corpus de texto.",
              },
              {
                nome: "Tokenização Avançada",
                slug: "ml/adv/nlp/tokenizacao",
                estudo: "WordPiece, BPE (Byte Pair Encoding), SentencePiece.",
                tese: "Tokenização moderna para Transformers.",
                projeto: "Comparar diferentes tokenizadores.",
              },
            ]
          ),
          T(
            "ml-adv-nlp-2",
            "Word Embeddings",
            [
              "Word2Vec (Google) — CBOW, Skip-Gram",
              "GloVe (Stanford) — Baseado em co-ocorrência",
              "FastText (Facebook) — N-gramas de caracteres",
              "Representações Contextuais — ELMo, BERT",
            ],
            [
              {
                nome: "Word Embeddings",
                slug: "ml/adv/nlp/word-embeddings",
                estudo: "Word2Vec (CBOW, Skip-Gram), GloVe, FastText, ELMo, BERT.",
                tese: "Representação de palavras.",
                projeto: "Treinar Word2Vec num corpus.",
              },
              {
                nome: "Word2Vec — CBOW vs Skip-Gram",
                slug: "ml/adv/nlp/word2vec",
                estudo: "Diferenças entre CBOW e Skip-Gram.",
                tese: "Escolha do modelo de embedding.",
                projeto: "Comparar CBOW e Skip-Gram.",
              },
            ]
          ),
          T(
            "ml-adv-nlp-3",
            "Transformers (A Revolução)",
            [
              "Mecanismo de Atenção (Attention) — Focar nas partes relevantes",
              "Self-Attention — Atenção para a mesma sequência",
              "Multi-Head Attention — Várias cabeças de atenção",
              "Positional Encoding — Adicionar informação de posição",
            ],
            [
              {
                nome: "Transformers",
                slug: "ml/adv/nlp/transformers",
                estudo: "Atenção, Self-Attention, Multi-Head Attention, Positional Encoding.",
                tese: "Revolução do NLP.",
                projeto: "Implementar atenção num problema simples.",
              },
              {
                nome: "Self-Attention e Multi-Head",
                slug: "ml/adv/nlp/self-attention",
                estudo: "Self-Attention, Multi-Head Attention — como funcionam.",
                tese: "Coração do Transformer.",
                projeto: "Implementar Multi-Head Attention.",
              },
            ]
          ),
          T(
            "ml-adv-nlp-4",
            "Modelos Pré-treinados (BERT, GPT, LLaMA)",
            [
              "BERT (Google) — Bidirecional, para classificação",
              "GPT (OpenAI) — Autogressivo, para geração",
              "RoBERTa (Facebook) — BERT otimizado",
              "DistilBERT — Versão menor",
              "XLNet — Permutação de linguagem",
              "T5 (Google) — Todos os problemas como texto-para-texto",
              "BART (Facebook) — Denoising autoencoder",
              "LLaMA (Meta) — Modelo open-source",
              "Gemma (Google) — Modelo open-source",
            ],
            [
              {
                nome: "Modelos Pré-treinados (BERT, GPT, LLaMA)",
                slug: "ml/adv/nlp/pretrained",
                estudo: "BERT, GPT, RoBERTa, DistilBERT, XLNet, T5, BART, LLaMA, Gemma.",
                tese: "Modelos de ponta para NLP.",
                projeto: "Fine-tuning com BERT para classificação.",
              },
              {
                nome: "BERT vs GPT",
                slug: "ml/adv/nlp/bert-vs-gpt",
                estudo: "Diferenças arquiteturais e casos de uso.",
                tese: "Escolha do modelo para cada tarefa.",
                projeto: "Comparar BERT e GPT numa tarefa.",
              },
            ]
          ),
          T(
            "ml-adv-nlp-5",
            "Fine-tuning e Prompt Engineering",
            [
              "Transfer Learning — Adaptar modelo pré-treinado",
              "Prompt Engineering — Projetar prompts",
              "Few-shot Learning — Aprender com poucos exemplos",
              "Zero-shot Learning — Sem exemplos",
            ],
            [
              {
                nome: "Fine-tuning e Prompt Engineering",
                slug: "ml/adv/nlp/fine-tuning",
                estudo: "Transfer Learning, Prompt Engineering, Few-shot, Zero-shot.",
                tese: "Adaptar LLMs para tarefas específicas.",
                projeto: "Criar prompts para tarefas com LLM.",
              },
              {
                nome: "Few-shot e Zero-shot Learning",
                slug: "ml/adv/nlp/few-zero-shot",
                estudo: "Few-shot learning, Zero-shot learning, In-context learning.",
                tese: "Aproveitar LLMs sem fine-tuning.",
                projeto: "Criar prompts few-shot para classificação.",
              },
            ]
          ),
        ],
      },

      // ─── 18. MODELOS GENERATIVOS ───
      {
        id: "ml-adv-generative",
        title: "18. Modelos Generativos",
        topics: [
          T(
            "ml-adv-generative-1",
            "GANs (Generative Adversarial Networks)",
            [
              "Conceitos — Gerador (generator) + Discriminador (discriminator)",
              "Treinamento Adversarial — Gerador tenta enganar, discriminador tenta detectar",
              "Função de Custo — Minimax game",
              "Desafios — Instabilidade, mode collapse, vanishing gradients",
            ],
            [
              {
                nome: "GANs",
                slug: "ml/adv/generative/gans",
                estudo: "Gerador + Discriminador, treino adversarial, minimax game, desafios.",
                tese: "Geração de dados.",
                projeto: "Implementar uma GAN simples (DCGAN).",
              },
              {
                nome: "Desafios das GANs",
                slug: "ml/adv/generative/gans-desafios",
                estudo: "Mode collapse, vanishing gradients, instabilidade.",
                tese: "Problemas e soluções para GANs.",
                projeto: "Analisar e mitigar mode collapse.",
              },
            ]
          ),
          T(
            "ml-adv-generative-2",
            "Arquiteturas GANs e Diffusion Models",
            [
              "DCGAN (Deep Convolutional GAN)",
              "StyleGAN — Controle de estilo (NVIDIA)",
              "CycleGAN — Tradução não pareada",
              "Pix2Pix — Tradução pareada",
              "BigGAN — GAN em larga escala",
              "VAEs (Variational Autoencoders)",
              "Diffusion Models — DDPM, Stable Diffusion",
            ],
            [
              {
                nome: "Arquiteturas GANs",
                slug: "ml/adv/generative/arquiteturas",
                estudo: "DCGAN, StyleGAN, CycleGAN, Pix2Pix, BigGAN.",
                tese: "GANs avançadas.",
                projeto: "Explorar StyleGAN ou CycleGAN.",
              },
              {
                nome: "VAEs e Diffusion Models",
                slug: "ml/adv/generative/vae-diffusion",
                estudo: "VAEs, reparameterization trick, ELBO, Diffusion Models (DDPM, Stable Diffusion).",
                tese: "Modelos generativos modernos.",
                projeto: "Implementar VAE ou explorar Stable Diffusion.",
              },
            ]
          ),
          T(
            "ml-adv-generative-3",
            "Avaliação de Modelos Generativos",
            [
              "FID (Fréchet Inception Distance)",
              "Inception Score (IS)",
              "Precision and Recall para distribuições",
              "LLM-based Eval",
            ],
            [
              {
                nome: "Avaliação de Modelos Generativos",
                slug: "ml/adv/generative/avaliacao",
                estudo: "FID, Inception Score (IS), Precision/Recall.",
                tese: "Avaliar qualidade da geração.",
                projeto: "Calcular FID para imagens geradas.",
              },
              {
                nome: "FID vs Inception Score",
                slug: "ml/adv/generative/fid-vs-is",
                estudo: "Diferenças entre FID e Inception Score.",
                tese: "Escolha da métrica para avaliação.",
                projeto: "Comparar FID e IS num dataset.",
              },
            ]
          ),
        ],
      },

      // ─── 19. REINFORCEMENT LEARNING ───
      {
        id: "ml-adv-rl",
        title: "19. Reinforcement Learning (RL)",
        topics: [
          T(
            "ml-adv-rl-1",
            "Conceitos de RL",
            [
              "Agente, Ambiente, Estado, Ação, Recompensa, Política, Episódio",
            ],
            [
              {
                nome: "Conceitos de RL",
                slug: "ml/adv/rl/conceitos",
                estudo: "Agente, ambiente, estado, ação, recompensa, política, episódio.",
                tese: "Aprendizado por interação.",
                projeto: "Definir um problema de RL.",
              },
              {
                nome: "Markov Decision Process (MDP)",
                slug: "ml/adv/rl/mdp",
                estudo: "MDP, função de valor, equação de Bellman.",
                tese: "Modelagem de problemas de RL.",
                projeto: "Formular um problema como MDP.",
              },
            ]
          ),
          T(
            "ml-adv-rl-2",
            "Algoritmos de RL",
            [
              "Q-Learning — Tabela de valores Q(s, a)",
              "SARSA — On-policy version do Q-Learning",
              "Deep Q-Network (DQN) — Q-Learning com redes neurais",
              "Policy Gradient — REINFORCE",
              "Actor-Critic — Actor (política) + Critic (valor)",
              "PPO (Proximal Policy Optimization) — Estável, popular",
              "SAC (Soft Actor-Critic) — Entropia + actor-critic",
            ],
            [
              {
                nome: "Algoritmos de RL",
                slug: "ml/adv/rl/algoritmos",
                estudo: "Q-Learning, SARSA, DQN, Policy Gradient, Actor-Critic, PPO, SAC.",
                tese: "Algoritmos de RL.",
                projeto: "Implementar Q-Learning num ambiente simples.",
              },
              {
                nome: "DQN e Deep RL",
                slug: "ml/adv/rl/dqn",
                estudo: "Deep Q-Network, experience replay, target network.",
                tese: "RL com redes neurais.",
                projeto: "Implementar DQN no CartPole.",
              },
            ]
          ),
          T(
            "ml-adv-rl-3",
            "Aplicações de RL",
            [
              "Jogos — AlphaGo, AlphaStar, Dota 2",
              "Robótica — Controle, navegação",
              "Recomendação — Personalização",
              "Finanças — Trading",
            ],
            [
              {
                nome: "Aplicações de RL",
                slug: "ml/adv/rl/aplicacoes",
                estudo: "Jogos (AlphaGo), robótica, recomendações, finanças.",
                tese: "Aplicações práticas.",
                projeto: "Explorar uma aplicação de RL.",
              },
              {
                nome: "AlphaGo e RL",
                slug: "ml/adv/rl/alphago",
                estudo: "AlphaGo, Monte Carlo Tree Search (MCTS).",
                tese: "RL em jogos complexos.",
                projeto: "Estudar o funcionamento do AlphaGo.",
              },
            ]
          ),
        ],
      },

      // ─── 20. AUTO ML ───
      {
        id: "ml-adv-automl",
        title: "20. Auto ML e Neural Architecture Search",
        topics: [
          T(
            "ml-adv-automl-1",
            "O que é AutoML?",
            [
              "Definição — Automatizar o pipeline de ML",
              "Etapas — Seleção de modelo, ajuste de hiperparâmetros, feature engineering",
            ],
            [
              {
                nome: "O que é AutoML?",
                slug: "ml/adv/automl/o-que-e",
                estudo: "Automatizar pipeline de ML, seleção de modelo, tuning, feature engineering.",
                tese: "Automatização de experimentos.",
                projeto: "Explorar AutoML num problema.",
              },
              {
                nome: "AutoML na Prática",
                slug: "ml/adv/automl/pratica",
                estudo: "Ferramentas e casos de uso de AutoML.",
                tese: "Quando usar AutoML.",
                projeto: "Aplicar AutoML num dataset real.",
              },
            ]
          ),
          T(
            "ml-adv-automl-2",
            "HP Tuning Automatizado",
            [
              "Grid Search — Força bruta",
              "Random Search — Amostragem aleatória",
              "Bayesian Optimization — Otimização baseada em modelo",
              "Hyperband — Bandit-based",
              "Ferramentas — Optuna, Hyperopt, Ray Tune, Keras Tuner",
            ],
            [
              {
                nome: "HP Tuning Automatizado",
                slug: "ml/adv/automl/hp-tuning",
                estudo: "Grid Search, Random Search, Bayesian Optimization, Hyperband, Optuna, Hyperopt, Ray Tune.",
                tese: "Otimização automática de hiperparâmetros.",
                projeto: "Usar Optuna para tuning de hiperparâmetros.",
              },
              {
                nome: "Bayesian Optimization vs Hyperband",
                slug: "ml/adv/automl/bayesian-hyperband",
                estudo: "Comparação entre Bayesian Optimization e Hyperband.",
                tese: "Escolha do método de tuning.",
                projeto: "Comparar Bayesian Optimization e Hyperband.",
              },
            ]
          ),
          T(
            "ml-adv-automl-3",
            "Neural Architecture Search (NAS)",
            [
              "Conceitos — Busca automática de arquitetura",
              "Métodos — Baseado em reforço, evolucionário, gradiente",
              "Ferramentas — AutoKeras, NNI (Microsoft), Auto-PyTorch",
            ],
            [
              {
                nome: "Neural Architecture Search (NAS)",
                slug: "ml/adv/automl/nas",
                estudo: "Busca automática de arquitetura, AutoKeras, NNI, Auto-PyTorch.",
                tese: "Arquiteturas neurais automáticas.",
                projeto: "Explorar AutoKeras.",
              },
              {
                nome: "NAS na Prática",
                slug: "ml/adv/automl/nas-pratica",
                estudo: "Aplicações e limitações do NAS.",
                tese: "Quando usar NAS.",
                projeto: "Explorar NNI ou Auto-PyTorch.",
              },
            ]
          ),
          T(
            "ml-adv-automl-4",
            "Feature Engineering Automatizado",
            [
              "Seleção Automática de Features",
              "Criação de Features — Combinações, transformações",
            ],
            [
              {
                nome: "Feature Engineering Automatizado",
                slug: "ml/adv/automl/feature-engineering",
                estudo: "Seleção automática, criação de features.",
                tese: "Automatizar engenharia de features.",
                projeto: "Usar ferramentas de feature engineering automático.",
              },
              {
                nome: "Ferramentas de Feature Engineering",
                slug: "ml/adv/automl/fe-ferramentas",
                estudo: "FeatureTools, TSFresh, AutoFeat.",
                tese: "Ferramentas para feature engineering.",
                projeto: "Explorar FeatureTools.",
              },
            ]
          ),
          T(
            "ml-adv-automl-5",
            "AutoML Frameworks",
            [
              "Auto-sklearn, H2O AutoML, Google Cloud AutoML, Azure AutoML, AutoGluon (Amazon)",
            ],
            [
              {
                nome: "AutoML Frameworks",
                slug: "ml/adv/automl/frameworks",
                estudo: "Auto-sklearn, H2O AutoML, Google Cloud AutoML, Azure AutoML, AutoGluon.",
                tese: "Ferramentas de AutoML.",
                projeto: "Comparar Auto-sklearn e H2O AutoML.",
              },
              {
                nome: "Comparação de Frameworks AutoML",
                slug: "ml/adv/automl/comparacao",
                estudo: "Comparação de performance e usabilidade entre frameworks.",
                tese: "Escolha do framework AutoML.",
                projeto: "Comparar AutoGluon e H2O AutoML.",
              },
            ]
          ),
        ],
      },

      // ─── 21. TÓPICOS AVANÇADOS DE PESQUISA ───
      {
        id: "ml-adv-research",
        title: "21. Tópicos Avançados de Pesquisa",
        topics: [
          T(
            "ml-adv-research-1",
            "Large Language Models (LLMs)",
            [
              "Arquitetura Transformer — Atenção, camadas, normalização",
              "Pré-treinamento — Autoregressivo, masked, prefix",
              "Fine-tuning — PEFT (LoRA, QLoRA, Adapters)",
              "Prompt Engineering — Few-shot, chain-of-thought, self-consistency",
              "Alignment — RLHF (Reinforcement Learning from Human Feedback)",
              "Geração — Temperatura, top-k, top-p, beam search",
            ],
            [
              {
                nome: "Large Language Models (LLMs)",
                slug: "ml/adv/research/llms",
                estudo: "Transformer, pré-treinamento, fine-tuning (LoRA, QLoRA), prompt engineering, RLHF, geração.",
                tese: "Modelos de linguagem de ponta.",
                projeto: "Fine-tuning de um LLM com LoRA.",
              },
              {
                nome: "LoRA e QLoRA",
                slug: "ml/adv/research/lora",
                estudo: "Low-Rank Adaptation (LoRA) e QLoRA.",
                tese: "Fine-tuning eficiente de LLMs.",
                projeto: "Implementar LoRA num modelo.",
              },
            ]
          ),
          T(
            "ml-adv-research-2",
            "Multi-Modal Learning",
            [
              "Vision-Language — CLIP, Flamingo",
              "Audio-Visual — Video understanding",
              "Text-Image Generation — Stable Diffusion, DALL-E, Midjourney",
            ],
            [
              {
                nome: "Multi-Modal Learning",
                slug: "ml/adv/research/multi-modal",
                estudo: "Vision-Language (CLIP, Flamingo), Audio-Visual, Text-Image Generation.",
                tese: "Modelos multi-modais.",
                projeto: "Explorar CLIP para tarefas multi-modais.",
              },
              {
                nome: "CLIP e Modelos Vision-Language",
                slug: "ml/adv/research/clip",
                estudo: "CLIP, contrastive learning entre texto e imagem.",
                tese: "Representação conjunta de texto e imagem.",
                projeto: "Usar CLIP para busca de imagens por texto.",
              },
            ]
          ),
          T(
            "ml-adv-research-3",
            "Self-Supervised Learning",
            [
              "Contrastive Learning — SimCLR, MoCo, BYOL",
              "Masked Autoencoders — MAE",
              "Pretext Tasks — Rotação, colorização, jigsaw",
            ],
            [
              {
                nome: "Self-Supervised Learning",
                slug: "ml/adv/research/self-supervised",
                estudo: "Contrastive Learning (SimCLR, MoCo, BYOL), Masked Autoencoders (MAE).",
                tese: "Aprendizado sem rótulos.",
                projeto: "Implementar SimCLR num dataset.",
              },
              {
                nome: "SimCLR e Contrastive Learning",
                slug: "ml/adv/research/simclr",
                estudo: "SimCLR, data augmentation, contrastive loss.",
                tese: "Representações sem supervisão.",
                projeto: "Implementar SimCLR.",
              },
            ]
          ),
          T(
            "ml-adv-research-4",
            "Graph Neural Networks (GNNs)",
            [
              "Conceitos — Dados em grafos (nós, arestas)",
              "Arquiteturas — GCN, GraphSAGE, GAT, GIN",
              "Aplicações — Redes sociais, moléculas, recomendações",
            ],
            [
              {
                nome: "Graph Neural Networks (GNNs)",
                slug: "ml/adv/research/gnn",
                estudo: "GCN, GraphSAGE, GAT, GIN, aplicações em redes sociais, moléculas.",
                tese: "Redes neurais para grafos.",
                projeto: "Implementar GCN num dataset de grafos.",
              },
              {
                nome: "GCN vs GraphSAGE vs GAT",
                slug: "ml/adv/research/gnn-compare",
                estudo: "Comparação entre GCN, GraphSAGE e GAT.",
                tese: "Escolha da arquitetura para grafos.",
                projeto: "Comparar GCN, GraphSAGE e GAT.",
              },
            ]
          ),
          T(
            "ml-adv-research-5",
            "Meta-Learning e Causality",
            [
              "Meta-Learning — Aprender a aprender",
              "MAML (Model-Agnostic Meta-Learning)",
              "Few-shot Learning — MAML, Reptile, Prototypical Networks",
              "Inferência Causal — Correlação vs causalidade",
              "DAGs (Directed Acyclic Graphs)",
              "Causal ML — DoWhy, CausalML",
            ],
            [
              {
                nome: "Meta-Learning",
                slug: "ml/adv/research/meta-learning",
                estudo: "Aprender a aprender, MAML, Reptile, Prototypical Networks.",
                tese: "Few-shot learning.",
                projeto: "Implementar MAML para few-shot.",
              },
              {
                nome: "Causality e ML",
                slug: "ml/adv/research/causality",
                estudo: "Inferência causal, DAGs, DoWhy, CausalML.",
                tese: "Causalidade em ML.",
                projeto: "Explorar DoWhy para inferência causal.",
              },
            ]
          ),
          T(
            "ml-adv-research-6",
            "Metodologia de Pesquisa",
            [
              "Leitura Crítica de Artigos — NeurIPS, ICML, ICLR, CVPR, ACL, EMNLP",
              "Design de Experimentos — Baseline, ablation studies, validação",
              "Benchmarks — GLUE, SuperGLUE, ImageNet, COCO, SQuAD",
              "Reprodutibilidade — Código aberto, hyperparameters, seeds",
              "Escrita de Artigos Científicos",
              "Revisão por Pares",
            ],
            [
              {
                nome: "Metodologia de Pesquisa",
                slug: "ml/adv/research/metodologia",
                estudo: "Leitura crítica, design de experimentos, benchmarks (GLUE, ImageNet), reprodutibilidade, escrita de artigos.",
                tese: "Base para pesquisa acadêmica.",
                projeto: "Ler e resumir um artigo científico.",
              },
              {
                nome: "Design de Experimentos em ML",
                slug: "ml/adv/research/design-experimentos",
                estudo: "Baseline, ablation studies, validação cruzada, significância estatística.",
                tese: "Como validar resultados.",
                projeto: "Projetar um experimento para um problema de ML.",
              },
            ]
          ),
        ],
      },
    ],
  },
  // ════════════════════════════════════════════════════════════════
  // 6. FEDERADO + PRIVACIDADE
  // ════════════════════════════════════════════════════════════════
  {
    id: "federado",
    title: "Federado e Privacidade",
    icon: "🔒",
    color: "#dc2626",
    sections: [
      // ─── 1. APRENDIZADO FEDERADO ───
      {
        id: "fed-c",
        title: "1. Aprendizado Federado",
        topics: [
          T(
            "fed-c-1",
            "Conceitos de FL",
            [
              "O Que é Aprendizado Federado?",
              "FL vs ML Centralizado",
              "Cross-silo vs Cross-device",
              "Desafios do FL",
            ],
            [
              {
                nome: "O Que é Aprendizado Federado?",
                slug: "federado/conceitos/o-que-e-fl",
                estudo: "Treinamento distribuído sem centralizar dados. Privacidade por design.",
                tese: "Base da tese de doutorado.",
                projeto: "Descrever um cenário onde FL é aplicável.",
              },
              {
                nome: "FL vs ML Centralizado",
                slug: "federado/conceitos/fl-vs-centralizado",
                estudo: "Diferenças: dados, comunicação, heterogeneidade, privacidade.",
                tese: "Vantagens e desvantagens do FL.",
                projeto: "Comparar FL com ML centralizado num problema.",
              },
              {
                nome: "Cross-silo vs Cross-device",
                slug: "federado/conceitos/cross-silo-device",
                estudo: "Cross-silo (poucos clientes, muitos dados) vs Cross-device (muitos clientes, poucos dados).",
                tese: "Arquiteturas de FL para diferentes cenários.",
                projeto: "Identificar qual arquitetura usar para cada cenário.",
              },
              {
                nome: "Desafios do FL",
                slug: "federado/conceitos/desafios",
                estudo: "Comunicação, heterogeneidade de dados, segurança, escalabilidade.",
                tese: "Problemas a resolver na tese.",
                projeto: "Listar e descrever os principais desafios do FL.",
              },
            ]
          ),
          T(
            "fed-a-1",
            "FedAvg",
            [
              "Federated Averaging",
              "Implementação do FedAvg",
              "Convergência do FedAvg",
            ],
            [
              {
                nome: "Federated Averaging (FedAvg)",
                slug: "federado/algoritmos/fedavg",
                estudo: "Média ponderada dos modelos locais. Algoritmo base do FL.",
                tese: "Algoritmo central da tese.",
                projeto: "Implementar FedAvg com clientes simulados.",
              },
              {
                nome: "Implementação do FedAvg",
                slug: "federado/algoritmos/fedavg-implementacao",
                estudo: "Código, rounds, clientes, agregação, avaliação.",
                tese: "Implementação prática do FedAvg.",
                projeto: "Criar uma implementação completa do FedAvg.",
              },
              {
                nome: "Convergência do FedAvg",
                slug: "federado/algoritmos/fedavg-convergencia",
                estudo: "Taxa de convergência, impacto de dados Não-IID, número de clientes.",
                tese: "Análise teórica de convergência.",
                projeto: "Analisar convergência do FedAvg em diferentes cenários.",
              },
            ]
          ),
          T(
            "fed-a-2",
            "FedProx",
            [
              "Regularização em FL",
              "Dados Não-IID",
              "Termo de Proximal",
            ],
            [
              {
                nome: "FedProx",
                slug: "federado/algoritmos/fedprox",
                estudo: "Regularização com termo proximal para lidar com dados Não-IID.",
                tese: "Melhoria do FedAvg para dados heterogêneos.",
                projeto: "Implementar FedProx e comparar com FedAvg.",
              },
              {
                nome: "Regularização em FL",
                slug: "federado/algoritmos/regularizacao-fl",
                estudo: "Técnicas de regularização para FL: FedProx, FedBN, etc.",
                tese: "Regularização para robustez.",
                projeto: "Comparar diferentes técnicas de regularização.",
              },
              {
                nome: "Dados Não-IID",
                slug: "federado/algoritmos/nao-iid",
                estudo: "Distribuições não identicamente distribuídas entre clientes.",
                tese: "Principal desafio do FL.",
                projeto: "Simular cenários Não-IID e analisar impacto.",
              },
              {
                nome: "Termo de Proximal",
                slug: "federado/algoritmos/termo-proximal",
                estudo: "Adiciona termo de regularização para manter modelo próximo do global.",
                tese: "Como o FedProx funciona.",
                projeto: "Implementar o termo proximal no FedProx.",
              },
            ]
          ),
          T(
            "fed-a-3",
            "Algoritmos Robustos",
            [
              "Krum (Agregação Robusta)",
              "Trimmed Mean",
              "Agregação por Mediana",
              "Comparação de Robustez",
            ],
            [
              {
                nome: "Krum (Agregação Robusta)",
                slug: "federado/robustos/krum",
                estudo: "Seleciona o modelo mais próximo dos seus vizinhos. Robusto a ataques.",
                tese: "Defesa contra envenenamento de modelos.",
                projeto: "Implementar Krum e testar contra ataques.",
              },
              {
                nome: "Trimmed Mean",
                slug: "federado/robustos/trimmed-mean",
                estudo: "Remove os maiores e menores valores antes da média.",
                tese: "Agregação robusta a outliers.",
                projeto: "Implementar Trimmed Mean e comparar com FedAvg.",
              },
              {
                nome: "Agregação por Mediana",
                slug: "federado/robustos/mediana",
                estudo: "Usa a mediana em vez da média. Robusto a outliers.",
                tese: "Agregação robusta simples.",
                projeto: "Implementar agregação por mediana.",
              },
              {
                nome: "Comparação de Robustez",
                slug: "federado/robustos/comparacao",
                estudo: "Comparar Krum, Trimmed Mean, Mediana, FedAvg contra ataques.",
                tese: "Escolha do algoritmo robusto.",
                projeto: "Criar benchmark de robustez contra ataques.",
              },
            ]
          ),
        ],
      },
      // ─── 2. PRIVACIDADE E SEGURANÇA ───
      {
        id: "log-p",
        title: "2. Privacidade e Segurança",
        topics: [
          T(
            "log-p-1",
            "Privacidade Diferencial",
            [
              "O Que é Privacidade Diferencial?",
              "Sensibilidade (Δf)",
              "Orçamento de Privacidade (ε, δ)",
              "Mecanismo de Laplace",
              "Mecanismo Gaussiano",
            ],
            [
              {
                nome: "O Que é Privacidade Diferencial?",
                slug: "federado/privacidade/dp",
                estudo: "Garantia matemática de que a saída não revela informações de um indivíduo.",
                tese: "Privacidade formal para FL.",
                projeto: "Explicar o conceito de DP para não-especialistas.",
              },
              {
                nome: "Sensibilidade (Δf)",
                slug: "federado/privacidade/sensibilidade",
                estudo: "Mudança máxima na saída ao adicionar/remover um registro.",
                tese: "Parâmetro fundamental do DP.",
                projeto: "Calcular sensibilidade para diferentes funções.",
              },
              {
                nome: "Orçamento de Privacidade (ε, δ)",
                slug: "federado/privacidade/orcamento",
                estudo: "ε (epsilon) controla a perda de privacidade, δ (delta) é a falha.",
                tese: "Gerenciar o orçamento de privacidade em FL.",
                projeto: "Calcular o orçamento de privacidade para múltiplas consultas.",
              },
              {
                nome: "Mecanismo de Laplace",
                slug: "federado/privacidade/laplace",
                estudo: "Adiciona ruído Laplace proporcional à sensibilidade/ε.",
                tese: "Mecanismo básico de DP para FL.",
                projeto: "Implementar o mecanismo de Laplace e testar.",
              },
              {
                nome: "Mecanismo Gaussiano",
                slug: "federado/privacidade/gaussiano",
                estudo: "Adiciona ruído Gaussiano. DP (ε, δ) com δ > 0.",
                tese: "Mecanismo mais comum em FL.",
                projeto: "Implementar o mecanismo Gaussiano e comparar com Laplace.",
              },
            ]
          ),
          T(
            "log-a-1",
            "Ataques e Defesas em FL",
            [
              "Envenenamento de Dados",
              "Envenenamento de Modelos",
              "Ataques de Inferência",
              "Ataques de Gradiente",
              "DP em FL — Ruído Gaussiano e Laplace",
              "Trade-off Utilidade vs Privacidade",
            ],
            [
              {
                nome: "Envenenamento de Dados",
                slug: "federado/ataques/data-poisoning",
                estudo: "Injetar dados maliciosos nos clientes para degradar o modelo global.",
                tese: "Ameaça à integridade do FL.",
                projeto: "Simular ataque de envenenamento de dados.",
              },
              {
                nome: "Envenenamento de Modelos",
                slug: "federado/ataques/model-poisoning",
                estudo: "Enviar modelos maliciosos para o servidor. Mais perigoso que data poisoning.",
                tese: "Ameaça crítica ao FL.",
                projeto: "Simular ataque de envenenamento de modelos.",
              },
              {
                nome: "Ataques de Inferência",
                slug: "federado/ataques/inferencia",
                estudo: "Inferir informações sobre os dados de treino a partir do modelo.",
                tese: "Ameaça à privacidade.",
                projeto: "Simular ataque de inferência de membresia.",
              },
              {
                nome: "Ataques de Gradiente",
                slug: "federado/ataques/gradiente",
                estudo: "Reconstruir dados a partir dos gradientes compartilhados (DLG, Inverting Gradients).",
                tese: "Ameaça à privacidade dos gradientes.",
                projeto: "Simular ataque de reconstrução de gradientes.",
              },
              {
                nome: "DP em FL",
                slug: "federado/ataques/dp-fl",
                estudo: "Adicionar ruído aos gradientes ou modelos. Trade-off utilidade vs privacidade.",
                tese: "Defesa principal contra ataques de inferência.",
                projeto: "Implementar DP no FedAvg.",
              },
              {
                nome: "Trade-off Utilidade vs Privacidade",
                slug: "federado/ataques/trade-off",
                estudo: "Mais privacidade → menos utilidade. Escolher ε adequado.",
                tese: "Equilíbrio entre performance e privacidade.",
                projeto: "Analisar o trade-off num modelo de FL.",
              },
            ]
          ),
          T(
            "log-a-3",
            "Criptografia",
            [
              "Criptografia Homomórfica",
              "Secure Multi-Party Computation (SMPC)",
              "Encriptação de Dados",
            ],
            [
              {
                nome: "Criptografia Homomórfica",
                slug: "federado/criptografia/homomorfica",
                estudo: "Operações matemáticas sobre dados cifrados sem descriptografar.",
                tese: "Privacidade total em FL.",
                projeto: "Explorar bibliotecas de criptografia homomórfica.",
              },
              {
                nome: "Secure Multi-Party Computation (SMPC)",
                slug: "federado/criptografia/smpc",
                estudo: "Múltiplas partes computam uma função sem revelar suas entradas.",
                tese: "Agregação segura em FL.",
                projeto: "Explorar SMPC para agregação de gradientes.",
              },
              {
                nome: "Encriptação de Dados",
                slug: "federado/criptografia/encriptacao",
                estudo: "Criptografia de dados em repouso e em trânsito.",
                tese: "Segurança básica em FL.",
                projeto: "Implementar encriptação de dados locais.",
              },
            ]
          ),
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 7. SQL - BÁSICO ok
  // ════════════════════════════════════════════════════════════════
  {
    id: "database",
    title: "SQL - Básico e Avançado",
    icon: "🗄️",
    color: "#22c55e",
    sections: [
      // ─── MÓDULO 1: AMBIENTE E FERRAMENTAS ───
      {
        id: "sql-ambiente",
        title: "1. Ambiente e Ferramentas",
        topics: [
          T(
            "sql-ambiente-1",
            "O Universo SQL Server",
            [
              "O que é SQL Server? — O Motor por Trás dos Dados",
              "SSMS — O Painel de Controle do Piloto de Dados",
            ],
            [
              {
                nome: "O que é SQL Server?",
                slug: "sql/ambiente/o-que-e-sql-server",
                estudo: "SQL Server é um sistema de gerenciamento de banco de dados relacional da Microsoft. Entenda sua arquitetura e aplicações.",
                tese: "Base para todo o aprendizado de SQL.",
                projeto: "Pesquisar as edições do SQL Server e identificar qual se aplica a cada cenário.",
              },
              {
                nome: "SSMS — Interface e Navegação",
                slug: "sql/ambiente/ssms-interface",
                estudo: "SQL Server Management Studio é a ferramenta gráfica para gerenciar bancos SQL Server. Object Explorer, Editor de Consultas, janelas de propriedades.",
                tese: "Domínio da ferramenta principal do dia a dia.",
                projeto: "Conectar ao SQL Server, explorar o Object Explorer e executar uma consulta simples.",
              },
            ]
          ),
          T(
            "sql-ambiente-2",
            "Os Pilares do Sistema",
            [
              "Bancos de Dados de Sistema — O Coração, o Cérebro, o DNA e a Área de Trabalho",
              "GO — O Comando que Separa o Joio do Trigo",
              "Tipos de Dados — A Escolha Certa para Cada Informação",
            ],
            [
              {
                nome: "Bancos de Dados de Sistema",
                slug: "sql/ambiente/bancos-sistema",
                estudo: "master (coração), msdb (cérebro), model (DNA), tempdb (área de trabalho). Funções e importância de cada um.",
                tese: "Entender o que já existe no SQL Server.",
                projeto: "Explorar cada banco de sistema e identificar seus objetos.",
              },
              {
                nome: "O Comando GO",
                slug: "sql/ambiente/comando-go",
                estudo: "GO é um comando de sinalização que separa batches no SSMS. Essencial para scripts de criação e implantação.",
                tese: "Executar scripts corretamente no SSMS.",
                projeto: "Criar um script com múltiplos batches usando GO e observar o comportamento.",
              },
              {
                nome: "Tipos de Dados no SQL Server",
                slug: "sql/ambiente/tipos-dados",
                estudo: "Numéricos (INT, DECIMAL, FLOAT), Caracteres (VARCHAR, CHAR, NVARCHAR), Data/Hora (DATE, DATETIME2), Outros (BIT, UNIQUEIDENTIFIER).",
                tese: "Escolher o tipo certo para cada dado.",
                projeto: "Criar uma tabela com todos os tipos de dados e inserir valores de exemplo.",
              },
            ]
          ),
          T(
            "sql-ambiente-3",
            "Colocando a Mão na Massa",
            [
              "Primeiros Passos — Conectando, Navegando e Executando",
            ],
            [
              {
                nome: "Primeiros Passos no SSMS",
                slug: "sql/ambiente/primeiros-passos",
                estudo: "Conectar ao servidor, criar um banco de dados, criar uma tabela, inserir dados e executar um SELECT.",
                tese: "Dar os primeiros passos com confiança.",
                projeto: "Criar um banco de dados 'Treinamento', criar uma tabela 'Clientes', inserir 5 registros e consultar.",
              },
            ]
          ),
        ],
      },

      // ─── MÓDULO 2: DATA DEFINITION LANGUAGE (DDL) ───
      {
        id: "sql-ddl",
        title: "2. Data Definition Language (DDL) — Comandos Completos",
        topics: [
          T(
            "sql-ddl-1",
            "CREATE — Construindo do Zero",
            [
              "CREATE DATABASE — O Alicerce do Sistema",
              "CREATE SCHEMA — Organizando em Gavetas",
              "CREATE TABLE — A Casa dos Dados",
              "CREATE TABLE — Constraints e Propriedades",
              "CREATE INDEX — Acelerando a Busca",
            ],
            [
              {
                nome: "CREATE DATABASE",
                slug: "sql/ddl/create-database",
                estudo: "Cria um novo banco de dados. Sintaxe: CREATE DATABASE nome [ON PRIMARY (NAME, FILENAME, SIZE, MAXSIZE, FILEGROWTH) LOG ON (...)].",
                tese: "Construir o alicerce do sistema.",
                projeto: "Criar banco de dados 'Vendas' com arquivos .mdf e .ldf em disco separado.",
              },
              {
                nome: "CREATE SCHEMA",
                slug: "sql/ddl/create-schema",
                estudo: "Cria um esquema (container lógico) para organizar objetos. Sintaxe: CREATE SCHEMA nome.",
                tese: "Organizar objetos em grupos lógicos.",
                projeto: "Criar schemas: Vendas, RH, Estoque, Log.",
              },
              {
                nome: "CREATE TABLE — Estrutura",
                slug: "sql/ddl/create-table",
                estudo: "Cria uma tabela. Sintaxe: CREATE TABLE nome (coluna1 tipo [propriedades], coluna2 tipo [propriedades], [constraints]).",
                tese: "Construir a casa dos dados.",
                projeto: "Criar tabelas Clientes, Pedidos, Produtos com relacionamentos.",
              },
              {
                nome: "CREATE TABLE — Constraints e Propriedades",
                slug: "sql/ddl/create-table-constraints",
                estudo: "Constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, DEFAULT. Propriedades: IDENTITY, SPARSE, MASKED.",
                tese: "Proteger e configurar os dados.",
                projeto: "Criar tabela Funcionarios com PK, FK, UNIQUE, CHECK, IDENTITY e SPARSE.",
              },
              {
                nome: "CREATE INDEX",
                slug: "sql/ddl/create-index",
                estudo: "Cria índices para acelerar consultas. Tipos: CLUSTERED, NONCLUSTERED, UNIQUE, COMPOSITE, COVERING (INCLUDE).",
                tese: "Acelerar a busca de dados.",
                projeto: "Criar índices para colunas usadas em WHERE, JOIN e ORDER BY.",
              },
            ]
          ),
          T(
            "sql-ddl-2",
            "ALTER — Modificando o que Existe",
            [
              "ALTER DATABASE — Configurando o Banco",
              "ALTER SCHEMA — Movendo Gavetas",
              "ALTER TABLE — Reformando a Estrutura",
            ],
            [
              {
                nome: "ALTER DATABASE",
                slug: "sql/ddl/alter-database",
                estudo: "Modifica configurações do banco: SET (RECOVERY, READ_ONLY), ADD/REMOVE/MODIFY FILE, MODIFY NAME, COLLATE.",
                tese: "Ajustar o banco sem recriar.",
                projeto: "Alterar recovery model para FULL e adicionar arquivo secundário.",
              },
              {
                nome: "ALTER SCHEMA",
                slug: "sql/ddl/alter-schema",
                estudo: "Move objetos entre schemas. Sintaxe: ALTER SCHEMA destino TRANSFER origem.objeto.",
                tese: "Reorganizar objetos entre schemas.",
                projeto: "Mover tabela 'Pedidos' de dbo para schema Vendas.",
              },
              {
                nome: "ALTER TABLE",
                slug: "sql/ddl/alter-table",
                estudo: "Modifica estrutura da tabela: ALTER COLUMN, ADD, DROP, SWITCH, CHECK/NOCHECK CONSTRAINT, ENABLE/DISABLE TRIGGER.",
                tese: "Reformar a estrutura sem perder dados.",
                projeto: "Adicionar coluna 'DataCadastro', modificar tamanho de coluna, adicionar FK.",
              },
            ]
          ),
          T(
            "sql-ddl-3",
            "DROP, RENAME e COMMENT",
            [
              "DROP — Removendo Permanentemente",
              "RENAME — Renomeando Objetos",
              "COMMENT — Documentando Estruturas",
            ],
            [
              {
                nome: "DROP — Removendo Permanentemente",
                slug: "sql/ddl/drop",
                estudo: "Remove objetos permanentemente: DROP DATABASE, DROP SCHEMA, DROP TABLE, DROP INDEX, DROP PROCEDURE, DROP USER/LOGIN/ROLE.",
                tese: "Eliminar objetos com segurança.",
                projeto: "Remover tabela de teste com verificação de existência (IF EXISTS).",
              },
              {
                nome: "RENAME — Renomeando Objetos",
                slug: "sql/ddl/rename",
                estudo: "Renomeia objetos usando sp_rename: tabelas, colunas, índices, constraints, usuários, logins.",
                tese: "Renomear objetos mantendo dados.",
                projeto: "Renomear tabela 'Clientes_Antigo' para 'Clientes' usando sp_rename.",
              },
              {
                nome: "COMMENT — Documentando Estruturas",
                slug: "sql/ddl/comment",
                estudo: "Documenta objetos usando sp_addextendedproperty (Extended Properties): tabelas, colunas, índices, constraints.",
                tese: "Documentar o banco de dados.",
                projeto: "Adicionar descrição na tabela Clientes e coluna Nome.",
              },
            ]
          ),
          T(
            "sql-ddl-4",
            "TRUNCATE — Esvaziando sem Destruir",
            [
              "TRUNCATE TABLE — Removendo Todos os Dados",
              "TRUNCATE TABLE com FOREIGN KEY — Restrições e Alternativas",
              "TRUNCATE TABLE com Transações — ROLLBACK e Comportamento DDL",
              "TRUNCATE vs DELETE — Quando Usar Cada Um",
            ],
            [
              {
                nome: "TRUNCATE TABLE",
                slug: "sql/ddl/truncate",
                estudo: "Remove todas as linhas da tabela, resetando IDENTITY. Sintaxe: TRUNCATE TABLE nome.",
                tese: "Esvaziar tabela mantendo estrutura.",
                projeto: "Truncar tabela de logs e verificar reset do IDENTITY.",
              },
              {
                nome: "TRUNCATE com FOREIGN KEY",
                slug: "sql/ddl/truncate-fk",
                estudo: "Restrições: tabela referenciada por FK não pode ser truncada. Alternativas: DELETE ou remover temporariamente a FK.",
                tese: "Entender limitações do TRUNCATE.",
                projeto: "Tentar truncar tabela com FK e resolver o erro.",
              },
              {
                nome: "TRUNCATE com Transações",
                slug: "sql/ddl/truncate-transacao",
                estudo: "TRUNCATE pode ser desfeito com ROLLBACK dentro de uma transação explícita (BEGIN TRAN ... ROLLBACK).",
                tese: "Entender comportamento do TRUNCATE em transações.",
                projeto: "Executar TRUNCATE dentro de transação e usar ROLLBACK para desfazer.",
              },
              {
                nome: "TRUNCATE vs DELETE",
                slug: "sql/ddl/truncate-vs-delete",
                estudo: "Diferenças: DDL vs DML, reseta IDENTITY, não dispara triggers, menos log, não tem WHERE.",
                tese: "Escolher entre TRUNCATE e DELETE.",
                projeto: "Comparar performance de TRUNCATE vs DELETE em tabela com 1 milhão de linhas.",
              },
            ]
          ),
          T(
            "sql-ddl-5",
            "Comparação e Boas Práticas DDL",
            [
              "DDL Completo — Resumo e Comparação de Comandos",
              "Boas Práticas em DDL — Segurança, Backups e Planejamento",
            ],
            [
              {
                nome: "DDL Completo — Resumo",
                slug: "sql/ddl/resumo",
                estudo: "Resumo de todos os comandos DDL: CREATE, ALTER, DROP, RENAME, COMMENT, TRUNCATE.",
                tese: "Visão geral de toda a DDL.",
                projeto: "Criar mapa mental dos comandos DDL.",
              },
              {
                nome: "Boas Práticas em DDL",
                slug: "sql/ddl/boas-praticas",
                estudo: "Sempre verificar existência (IF EXISTS), testar em desenvolvimento antes de produção, fazer backup antes de DROP, documentar mudanças.",
                tese: "Executar DDL com segurança.",
                projeto: "Criar script de criação de banco com todas as boas práticas.",
              },
            ]
          ),
        ],
      },

      // ─── MÓDULO 3: DATA MANIPULATION LANGUAGE (DML) ───
      {
        id: "sql-dml",
        title: "3. Data Manipulation Language (DML) — Comandos Completos",
        topics: [
          T(
            "sql-dml-1",
            "INSERT — Inserindo Dados",
            [
              "INSERT — Especificando Colunas, Múltiplas Linhas",
              "INSERT com SELECT — Copiando Dados",
            ],
            [
              {
                nome: "INSERT — Inserindo Dados",
                slug: "sql/dml/insert",
                estudo: "Adiciona linhas à tabela. Formas: com colunas especificadas (recomendado), sem colunas (perigoso), múltiplas linhas de uma vez.",
                tese: "Inserir dados corretamente.",
                projeto: "Inserir 10 clientes usando a forma recomendada com colunas especificadas.",
              },
              {
                nome: "INSERT com SELECT",
                slug: "sql/dml/insert-select",
                estudo: "Insere dados de uma tabela para outra. Sintaxe: INSERT INTO destino SELECT colunas FROM origem WHERE condicao.",
                tese: "Copiar e transformar dados.",
                projeto: "Copiar clientes ativos para tabela ClientesBackup.",
              },
            ]
          ),
          T(
            "sql-dml-2",
            "UPDATE — Modificando Dados",
            [
              "UPDATE — SET, WHERE, TOP",
              "UPDATE — FROM...JOIN",
              "UPDATE — OPTION e OUTPUT (Auditoria)",
            ],
            [
              {
                nome: "UPDATE — SET, WHERE, TOP",
                slug: "sql/dml/update-set-where",
                estudo: "Modifica dados existentes. SET define os novos valores. WHERE filtra quais linhas serão atualizadas. TOP limita número de linhas.",
                tese: "Modificar dados com precisão.",
                projeto: "Atualizar preços de produtos com aumento de 10% para categoria específica.",
              },
              {
                nome: "UPDATE — FROM...JOIN",
                slug: "sql/dml/update-join",
                estudo: "Atualiza uma tabela com base em dados de outra tabela usando JOIN. Sintaxe: UPDATE alias SET coluna = valor FROM tabela1 JOIN tabela2 ON condicao.",
                tese: "Atualizar dados com informações de outras tabelas.",
                projeto: "Atualizar nome do cliente na tabela Pedidos com base na tabela Clientes.",
              },
              {
                nome: "UPDATE — OPTION e OUTPUT",
                slug: "sql/dml/update-option-output",
                estudo: "OPTION: ROWLOCK, TABLOCK, UPDLOCK, MAXDOP. OUTPUT: visualiza e registra alterações, DELETED e INSERTED, OUTPUT INTO para auditoria.",
                tese: "Controlar performance e auditar alterações.",
                projeto: "Auditar atualizações de preços com OUTPUT INTO em tabela de log.",
              },
            ]
          ),
          T(
            "sql-dml-3",
            "DELETE — Removendo Dados",
            [
              "DELETE — WHERE com Operadores e AND/OR",
              "DELETE — IN, BETWEEN, LIKE, IS NULL, NOT",
              "DELETE — TOP e JOIN",
            ],
            [
              {
                nome: "DELETE — WHERE com Operadores",
                slug: "sql/dml/delete-where",
                estudo: "Remove linhas com WHERE. Operadores: =, <>, >, <, >=, <=. Combinações com AND e OR.",
                tese: "Remover dados com precisão.",
                projeto: "Deletar clientes inativos com mais de 60 anos usando AND.",
              },
              {
                nome: "DELETE — IN, BETWEEN, LIKE, IS NULL",
                slug: "sql/dml/delete-operadores",
                estudo: "Filtros avançados: IN (lista de valores), BETWEEN (intervalo), LIKE (padrões), IS NULL (valores nulos), NOT (inversão).",
                tese: "Remover dados com filtros avançados.",
                projeto: "Deletar produtos de categorias específicas usando IN e preço entre valores usando BETWEEN.",
              },
              {
                nome: "DELETE — TOP e JOIN",
                slug: "sql/dml/delete-top-join",
                estudo: "TOP limita número de linhas deletadas. JOIN deleta com base em dados de outras tabelas. TOP + ORDER BY via subconsulta.",
                tese: "Deletar em lotes e com base em outras tabelas.",
                projeto: "Deletar 1000 logs mais antigos e deletar pedidos de clientes inativos com JOIN.",
              },
            ]
          ),
          T(
            "sql-dml-4",
            "SELECT — Consultando Dados",
            [
              "SELECT — Básico (*, Colunas, Aliases, DISTINCT)",
              "SELECT — WHERE (Operadores, IN, BETWEEN, LIKE, IS NULL, NOT)",
              "SELECT — JOIN (INNER, LEFT, RIGHT, FULL, CROSS)",
              "SELECT — Agregações (COUNT, SUM, AVG, MIN, MAX)",
              "SELECT — GROUP BY e HAVING",
              "SELECT — Subconsultas (Escalares, IN, EXISTS, Correlacionadas)",
              "SELECT — CTE, CTE Recursiva, UNION, INTERSECT, EXCEPT",
            ],
            [
              {
                nome: "SELECT Básico",
                slug: "sql/dml/select-basico",
                estudo: "SELECT (*) todas as colunas, SELECT colunas específicas, aliases (AS), DISTINCT (valores únicos).",
                tese: "Consultar dados com confiança.",
                projeto: "Consultar todos os clientes, apenas nome e email, com alias, e listar cidades únicas com DISTINCT.",
              },
              {
                nome: "SELECT com WHERE",
                slug: "sql/dml/select-where",
                estudo: "Filtra linhas com WHERE. Operadores: =, <>, >, <, >=, <=. IN, BETWEEN, LIKE, IS NULL, NOT.",
                tese: "Filtrar dados com precisão.",
                projeto: "Consultar clientes ativos de SP com idade entre 18 e 60 usando AND, BETWEEN e LIKE.",
              },
              {
                nome: "SELECT com JOIN",
                slug: "sql/dml/select-join",
                estudo: "Combina tabelas: INNER JOIN (apenas correspondências), LEFT JOIN (todas da esquerda), RIGHT JOIN, FULL JOIN, CROSS JOIN (produto cartesiano).",
                tese: "Combinar dados de múltiplas tabelas.",
                projeto: "Listar pedidos com nome do cliente usando INNER JOIN.",
              },
              {
                nome: "SELECT com Agregações",
                slug: "sql/dml/select-agregacoes",
                estudo: "Funções de agregação: COUNT (conta), SUM (soma), AVG (média), MIN (mínimo), MAX (máximo). Ignoram NULL.",
                tese: "Sumarizar dados.",
                projeto: "Calcular total de vendas, ticket médio, maior e menor pedido.",
              },
              {
                nome: "SELECT com GROUP BY e HAVING",
                slug: "sql/dml/select-groupby",
                estudo: "GROUP BY agrupa linhas por valores iguais. HAVING filtra grupos (depois da agregação).",
                tese: "Agrupar e filtrar por grupos.",
                projeto: "Calcular vendas por cliente e mostrar apenas quem gastou mais de 5000 usando HAVING.",
              },
              {
                nome: "SELECT com Subconsultas",
                slug: "sql/dml/select-subquery",
                estudo: "Subconsultas: escalares (um valor), IN/NOT IN (lista de valores), EXISTS/NOT EXISTS (verifica existência), correlacionadas (referencia tabela externa).",
                tese: "Consultas complexas com subconsultas.",
                projeto: "Produtos com preço acima da média, clientes que nunca compraram usando NOT EXISTS.",
              },
              {
                nome: "SELECT com CTE, UNION e Recursão",
                slug: "sql/dml/select-cte-union",
                estudo: "CTE (WITH) para legibilidade. CTE Recursiva para hierarquias. UNION (remove duplicatas), UNION ALL, INTERSECT, EXCEPT.",
                tese: "Consultas avançadas e hierárquicas.",
                projeto: "Montar organograma com CTE Recursiva e combinar clientes/fornecedores com UNION.",
              },
            ]
          ),
        ],
      },

      // ─── MÓDULO 4: FUNÇÕES DE STRING E CONVERSÃO ───
      {
        id: "sql-string",
        title: "4. Funções de String e Conversão",
        topics: [
          T(
            "sql-string-1",
            "Funções de String Básicas",
            [
              "UPPER(), LOWER(), TRIM(), LTRIM(), RTRIM()",
            ],
            [
              {
                nome: "UPPER, LOWER, TRIM",
                slug: "sql/string/upper-lower-trim",
                estudo: "UPPER() converte para maiúsculas, LOWER() para minúsculas, TRIM() remove espaços nas bordas, LTRIM() à esquerda, RTRIM() à direita.",
                tese: "Padronizar e limpar textos.",
                projeto: "Padronizar nomes de clientes e limpar espaços extras em endereços.",
              },
            ]
          ),
          T(
            "sql-date-1",
            "Data e Hora Atual e Extração",
            [
              "GETDATE(), SYSDATETIME(), DATEPART(), YEAR(), MONTH(), DAY()",
            ],
            [
              {
                nome: "GETDATE, DATEPART, YEAR, MONTH, DAY",
                slug: "sql/date/getdate-datepart",
                estudo: "GETDATE() retorna data/hora atual. SYSDATETIME() com mais precisão. DATEPART(), YEAR(), MONTH(), DAY() extraem partes da data.",
                tese: "Obter e extrair partes de datas.",
                projeto: "Registrar data de criação de registros e agrupar vendas por mês com MONTH().",
              },
            ]
          ),
          T(
            "sql-case-1",
            "CASE WHEN — Sintaxe e Uso",
            [
              "CASE WHEN — Sintaxe, Categorização e Features para ML",
            ],
            [
              {
                nome: "CASE WHEN",
                slug: "sql/case/when",
                estudo: "Estrutura CASE WHEN condicao THEN resultado ELSE resultado_padrao END. Para categorização, criação de features, lógica condicional.",
                tese: "Criar lógica condicional no SELECT.",
                projeto: "Categorizar clientes por idade (Jovem, Adulto, Sênior).",
              },
            ]
          ),
        ],
      },

      // ─── MÓDULO 5: WINDOW FUNCTIONS ───
      {
        id: "sql-window",
        title: "5. Window Functions — O Tópico Mais Importante",
        topics: [
          T(
            "sql-window-1",
            "Numeração e Ranking",
            [
              "ROW_NUMBER(), RANK(), DENSE_RANK()",
            ],
            [
              {
                nome: "ROW_NUMBER, RANK, DENSE_RANK",
                slug: "sql/window/row-number-rank",
                estudo: "ROW_NUMBER() numeração sequencial. RANK() com gaps em empates. DENSE_RANK() sem gaps.",
                tese: "Numerar e ranquear linhas.",
                projeto: "Numerar pedidos por cliente, ranquear produtos por preço.",
              },
            ]
          ),
          T(
            "sql-cte-1",
            "CTE vs Subconsulta",
            [
              "CTE vs Subconsulta — Quando Usar Cada Uma",
            ],
            [
              {
                nome: "CTE vs Subconsulta",
                slug: "sql/cte/vs-subquery",
                estudo: "CTE (WITH) é mais legível e referenciável múltiplas vezes. Subconsulta é mais simples para casos únicos.",
                tese: "Escolher a ferramenta certa.",
                projeto: "Reescrever consulta com subconsulta para CTE e comparar legibilidade.",
              },
            ]
          ),
          T(
            "sql-otimizacao-1",
            "Plano de Execução",
            [
              "Plano de Execução — Entendendo a Performance",
            ],
            [
              {
                nome: "Plano de Execução",
                slug: "sql/otimizacao/plano-execucao",
                estudo: "Mostra como o SQL Server executa a consulta. Atalho Ctrl+M no SSMS.",
                tese: "Entender performance da consulta.",
                projeto: "Analisar plano de execução de uma consulta lenta.",
              },
            ]
          ),
          T(
            "sql-pivot-1",
            "PIVOT e UNPIVOT",
            [
              "PIVOT Operator e UNPIVOT — Transformando Colunas",
            ],
            [
              {
                nome: "PIVOT e UNPIVOT",
                slug: "sql/pivot/pivot-unpivot",
                estudo: "PIVOT transforma valores de coluna em várias colunas. UNPIVOT transforma colunas em linhas (formato longo).",
                tese: "Transformar dados para análise.",
                projeto: "Criar relatório de vendas por categoria e mês com PIVOT.",
              },
            ]
          ),

        ],
      },
      {
        id: "sql-avancado-unico",
        title: "SQL Avançado — Engenharia de Dados",
        topics: [
          // ════════════════════════════════════════════════════
          // SUBTEMA 1: STORED PROCEDURES E AUTOMAÇÃO
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-1",
            "Stored Procedures e Automação",
            [
              "CREATE PROCEDURE — Parâmetros IN, OUT e EXEC",
              "MERGE (UPSERT) — Inserir ou Atualizar em uma Única Operação",
              "Transações e Locking — BEGIN TRAN, COMMIT, ROLLBACK, Níveis de Isolamento",
            ],
            [
              {
                nome: "CREATE PROCEDURE",
                slug: "sql/avancado/create-procedure",
                estudo: "Cria um bloco de código reutilizável. Sintaxe: CREATE PROCEDURE nome @param1 tipo, @param2 tipo OUTPUT AS BEGIN ... END.",
                tese: "Automatizar tarefas repetitivas.",
                projeto: "Criar procedure para recalcular métricas diárias.",
              },
              {
                nome: "MERGE (UPSERT)",
                slug: "sql/avancado/merge",
                estudo: "MERGE insere ou atualiza dados em uma única operação. Sintaxe: MERGE destino USING origem ON condicao WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT.",
                tese: "Sincronizar dados eficientemente.",
                projeto: "Usar MERGE para atualizar tabela de clientes diariamente.",
              },
              {
                nome: "Transações e Locking",
                slug: "sql/avancado/transacoes",
                estudo: "BEGIN TRAN, COMMIT, ROLLBACK. Níveis de isolamento (READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE).",
                tese: "Garantir integridade e consistência.",
                projeto: "Implementar transação para atualização de estoque com COMMIT/ROLLBACK.",
              },
            ]
          ),
          // ════════════════════════════════════════════════════
          // SUBTEMA 2: DATA WAREHOUSING E MODELAGEM
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-2",
            "Data Warehousing e Modelagem",
            [
              "Star Schema — Modelo Dimensional, Tabela Fato e Tabela Dimensão",
              "Snowflake Schema — Dimensões Normalizadas",
              "Modelagem Dimensional Prática — Criando Star Schema para Vendas",
              "Quando Usar Star vs Snowflake vs Data Vault",
            ],
            [
              {
                nome: "Star Schema",
                slug: "sql/avancado/star-schema",
                estudo: "Modelo dimensional: tabela fato central com chaves para tabelas dimensão. Fato: medidas (quantidade, valor). Dimensão: atributos descritivos (cliente, produto, tempo).",
                tese: "Base para OLAP e análises multidimensionais.",
                projeto: "Modelar star schema para vendas.",
              },
              {
                nome: "Snowflake Schema",
                slug: "sql/avancado/snowflake-schema",
                estudo: "Dimensões normalizadas em múltiplas tabelas (ex: DimCategoria separada de DimProduto).",
                tese: "Otimizar espaço em data warehouses complexos.",
                projeto: "Comparar Star vs Snowflake Schema.",
              },
              {
                nome: "Modelagem Dimensional Prática",
                slug: "sql/avancado/modelagem-pratica",
                estudo: "Criar star schema para vendas: FatoVendas (Id, DataKey, ClienteKey, ProdutoKey, Quantidade, Valor), DimCliente, DimProduto, DimTempo.",
                tese: "Aplicar modelagem na prática.",
                projeto: "Criar star schema completo para vendas.",
              },
              {
                nome: "Estratégias de Modelagem",
                slug: "sql/avancado/estrategias-modelagem",
                estudo: "Star: desempenho. Snowflake: economia de espaço. Data Vault: histórico e evolução.",
                tese: "Escolher a modelagem certa.",
                projeto: "Analisar e escolher a melhor estratégia para diferentes cenários.",
              },
            ]
          ),
          // ════════════════════════════════════════════════════
          // SUBTEMA 3: ANÁLISE DE NEGÓCIO E MÉTRICAS
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-3",
            "Análise de Negócio e Métricas",
            [
              "Cálculo de Churn e LTV — Métricas de Negócio",
              "Taxa de Conversão — Funil de Vendas",
              "Análise de Retenção de Clientes",
              "Coorte — Análise de Coorte e Matriz de Retenção",
            ],
            [
              {
                nome: "Churn e LTV",
                slug: "sql/avancado/churn-ltv",
                estudo: "Churn = clientes que pararam de comprar nos últimos N meses. LTV = Lifetime Value = soma de gasto total por cliente.",
                tese: "Medir saúde e valor do negócio.",
                projeto: "Calcular churn mensal e LTV por cliente.",
              },
              {
                nome: "Taxa de Conversão",
                slug: "sql/avancado/conversao",
                estudo: "Conversão = (clientes que compraram) / (total de clientes) ou (pedidos concluídos) / (pedidos iniciados).",
                tese: "Medir eficácia do funil de vendas.",
                projeto: "Calcular taxa de conversão mês a mês.",
              },
              {
                nome: "Análise de Retenção",
                slug: "sql/avancado/retencao",
                estudo: "Retenção = clientes ativos no período atual / clientes ativos no período anterior.",
                tese: "Medir lealdade e saúde do negócio.",
                projeto: "Calcular retenção de clientes por coorte.",
              },
              {
                nome: "Análise de Coorte",
                slug: "sql/avancado/coorte",
                estudo: "Coorte = grupo de clientes com característica comum (ex: mês de primeiro pedido). Matriz de retenção por coorte.",
                tese: "Entender comportamento de diferentes grupos.",
                projeto: "Criar matriz de coorte com retenção mensal.",
              },
            ]
          ),
          // ════════════════════════════════════════════════════
          // SUBTEMA 4: ESTATÍSTICA E DATA SCIENCE NO SQL
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-4",
            "Estatística e Data Science no SQL",
            [
              "STDEV(), STDEVP(), VAR(), VARP()",
              "PERCENTILE_CONT() e PERCENTILE_DISC()",
              "TABLESAMPLE — Amostragem de Dados",
              "Balanceamento de Classes para Machine Learning",
            ],
            [
              {
                nome: "STDEV e VAR",
                slug: "sql/avancado/stdev-var",
                estudo: "STDEV() = desvio padrão amostral. STDEVP() = populacional. VAR() = variância amostral. VARP() = populacional.",
                tese: "Medir dispersão e variabilidade.",
                projeto: "Calcular desvio padrão de preços por categoria.",
              },
              {
                nome: "PERCENTILE_CONT e PERCENTILE_DISC",
                slug: "sql/avancado/percentil",
                estudo: "PERCENTILE_CONT() = percentil contínuo (interpolação). PERCENTILE_DISC() = percentil discreto (valor real dos dados).",
                tese: "Calcular quartis, mediana, outliers.",
                projeto: "Calcular mediana de gasto por cliente.",
              },
              {
                nome: "TABLESAMPLE",
                slug: "sql/avancado/tablesample",
                estudo: "Extrai amostra aleatória. Sintaxe: SELECT * FROM tabela TABLESAMPLE(10 PERCENT).",
                tese: "Trabalhar com datasets menores para prototyping.",
                projeto: "Extrair amostra de 10% para análise exploratória.",
              },
              {
                nome: "Balanceamento de Classes",
                slug: "sql/avancado/balanceamento",
                estudo: "Garantir representação equilibrada de classes em dados de treino. Evitar viés em modelos de classificação.",
                tese: "Preparar dados equilibrados para ML.",
                projeto: "Criar dataset balanceado de clientes (ativos vs inativos).",
              },
            ]
          ),
          // ════════════════════════════════════════════════════
          // SUBTEMA 5: ETL E PIPELINES DE DADOS
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-5",
            "ETL e Pipelines de Dados",
            [
              "O que é ETL? — Extração, Transformação, Carga",
              "Pipelines de Dados com SQL — Staging, Transformação e Carga",
              "Apache Airflow e SQL — Orquestrando Pipelines",
              "Monitoramento de Pipelines — Logs, Alertas e Recuperação",
            ],
            [
              {
                nome: "ETL",
                slug: "sql/avancado/etl",
                estudo: "Extração (coleta de dados), Transformação (limpeza, enriquecimento), Carga (inserção no data warehouse).",
                tese: "Construir fluxos de dados completos.",
                projeto: "Mapear pipeline ETL para um caso real.",
              },
              {
                nome: "Pipelines com SQL",
                slug: "sql/avancado/pipelines-sql",
                estudo: "Staging (carga bruta), Transformação (CTE, CASE, JOIN), Carga (INSERT INTO destino). Uso de tabelas temporárias e etapas sequenciais.",
                tese: "Construir pipelines com SQL.",
                projeto: "Criar pipeline ETL simples com staging, transformação e carga.",
              },
              {
                nome: "Apache Airflow e SQL",
                slug: "sql/avancado/airflow",
                estudo: "Airflow agenda e orquestra pipelines. DAG (Directed Acyclic Graph). Operadores SQL: PostgresOperator, MSSQLOperator.",
                tese: "Automatizar e orquestrar pipelines.",
                projeto: "Criar DAG no Airflow para pipeline diário de dados.",
              },
              {
                nome: "Monitoramento de Pipelines",
                slug: "sql/avancado/monitoramento",
                estudo: "Logs de execução, alertas de falha, recuperação automática. Tabelas de log com status, tempo de execução, erro.",
                tese: "Pipelines confiáveis e monitorados.",
                projeto: "Implementar logging e monitoramento em pipeline.",
              },
            ]
          ),
          // ════════════════════════════════════════════════════
          // SUBTEMA 6: BANCO DE DADOS EM PRODUÇÃO
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-6",
            "Banco de Dados em Produção",
            [
              "Alta Disponibilidade — Always On, Failover Clustering",
              "Backup e Recuperação — Estratégias e Boas Práticas",
              "Segurança em Banco de Dados — Autenticação, Autorização, Encriptação",
              "Performance em Produção — Monitoramento e Ajuste Fino",
            ],
            [
              {
                nome: "Alta Disponibilidade",
                slug: "sql/avancado/alta-disponibilidade",
                estudo: "Always On (Availability Groups) para failover automático. Failover Clustering para alta disponibilidade.",
                tese: "Manter banco de dados disponível.",
                projeto: "Pesquisar e diagramar arquitetura Always On.",
              },
              {
                nome: "Backup e Recuperação",
                slug: "sql/avancado/backup",
                estudo: "Backup FULL (completo), DIFFERENTIAL (diferencial), LOG (transações). Estratégias de backup e restore.",
                tese: "Proteger dados contra perda.",
                projeto: "Criar política de backup para banco de produção.",
              },
              {
                nome: "Segurança em Banco de Dados",
                slug: "sql/avancado/seguranca",
                estudo: "Autenticação SQL/Windows. Autorização: GRANT, REVOKE, DENY, roles. Encriptação: TDE, Always Encrypted.",
                tese: "Proteger dados sensíveis.",
                projeto: "Implementar roles e permissões para diferentes usuários.",
              },
              {
                nome: "Performance em Produção",
                slug: "sql/avancado/performance-producao",
                estudo: "Monitoramento com DMVs, Query Store, e Extended Events. Ajuste de índices e consultas com base em dados de produção.",
                tese: "Manter performance em produção.",
                projeto: "Identificar e otimizar consultas lentas em produção.",
              },
            ]
          ),
          // ════════════════════════════════════════════════════
          // SUBTEMA 7: BIG DATA E DISTRIBUÍDO
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-7",
            "Big Data e Distribuído",
            [
              "O que é Big Data? — Os 5 Vs e Escalabilidade",
              "PySpark — DataFrames e SQL Distribuído",
              "PySpark — Otimização e Performance",
              "SQL vs PySpark — Quando Usar Cada Um",
            ],
            [
              {
                nome: "Fundamentos Big Data",
                slug: "sql/avancado/bigdata-fundamentos",
                estudo: "Volume, Velocidade, Variedade, Veracidade, Valor. Desafios e arquiteturas para dados massivos.",
                tese: "Entender os desafios de Big Data.",
                projeto: "Analisar cenário de Big Data e propor solução.",
              },
              {
                nome: "PySpark Básico",
                slug: "sql/avancado/pyspark",
                estudo: "SparkSession, DataFrames, transformações (select, filter, groupBy, join), spark.sql() para consultas distribuídas.",
                tese: "Processar dados em escala com Spark.",
                projeto: "Criar DataFrame e executar consultas SQL com PySpark.",
              },
              {
                nome: "PySpark Avançado",
                slug: "sql/avancado/pyspark-otimizacao",
                estudo: "Partições, cache, shuffle, broadcast joins, uso eficiente de recursos.",
                tese: "Otimizar pipelines Spark.",
                projeto: "Otimizar pipeline Spark com particionamento e cache.",
              },
              {
                nome: "SQL vs PySpark",
                slug: "sql/avancado/sql-vs-spark",
                estudo: "SQL para dados estruturados e pequeno/médio volume. PySpark para dados massivos (>100GB), processamento distribuído.",
                tese: "Escolher a ferramenta certa.",
                projeto: "Comparar performance SQL vs Spark em diferentes volumes.",
              },
            ]
          ),
          // ════════════════════════════════════════════════════
          // SUBTEMA 8: CLOUD E MODERN DATA STACK
          // ════════════════════════════════════════════════════
          T(
            "sql-avancado-8",
            "Cloud e Modern Data Stack",
            [
              "Cloud Data Warehouses — BigQuery, Redshift, Snowflake",
              "Data Lakes — S3, ADLS, GCS e Formatos (Parquet, Delta, Iceberg)",
              "Streaming — Kafka, Kinesis e Processamento em Tempo Real",
              "Modern Data Stack — dbt, Airbyte, Fivetran, Looker",
            ],
            [
              {
                nome: "Cloud Data Warehouses",
                slug: "sql/avancado/cloud-dw",
                estudo: "BigQuery (serverless, colunas), Redshift (columnar, baseado em PostgreSQL), Snowflake (multi-cloud, separação computação/armazenamento).",
                tese: "Data Warehouses modernos na nuvem.",
                projeto: "Comparar BigQuery, Redshift e Snowflake.",
              },
              {
                nome: "Data Lakes",
                slug: "sql/avancado/datalake",
                estudo: "Armazenamento de dados brutos em S3, ADLS, GCS. Formatos: Parquet (columnar), Delta Lake (ACID), Iceberg (tabelas).",
                tese: "Armazenar dados em escala.",
                projeto: "Criar pipeline para Data Lake com Parquet.",
              },
              {
                nome: "Streaming",
                slug: "sql/avancado/streaming",
                estudo: "Kafka (mensageria), Kinesis (AWS), processamento em tempo real com Spark Streaming.",
                tese: "Processar dados em tempo real.",
                projeto: "Criar pipeline streaming simples com Kafka.",
              },
              {
                nome: "Modern Data Stack",
                slug: "sql/avancado/modern-stack",
                estudo: "dbt (transformações SQL), Airbyte/Fivetran (ingestão), Looker (visualização), Reverse ETL (Hightouch, Census).",
                tese: "Ferramentas modernas de dados.",
                projeto: "Mapear Modern Data Stack para um caso real.",
              },
            ]
          ),
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 7. REDES DE COMPUTADORES - PARTE I
  // ════════════════════════════════════════════════════════════════

  {
    id: "redes",
    title: "Redes de Computadores",
    icon: "🌍",
    color: "#0891b2",
    sections: [
      // ─── 1. FUNDAMENTOS DE REDES ───
      {
        id: "net-fundamentos",
        title: "1. Fundamentos de Redes (6 aulas)",
        topics: [
          T(
            "net-fundamentos-1",
            "Conceitos Básicos de Redes",
            [
              "Definição de rede — Objetivos e benefícios",
              "Aplicações no dia a dia (Internet, e-mail, streaming, jogos, IoT, redes sociais)",
            ],
            [
              {
                nome: "O que é uma Rede de Computadores?",
                slug: "redes/intro/o-que-e-rede",
                estudo: "Definição, objetivos e benefícios de redes de computadores.",
                tese: "Base para comunicação entre clientes e servidor em FL.",
                projeto: "Identificar redes no dia a dia.",
              },
              {
                nome: "Aplicações de Redes",
                slug: "redes/intro/aplicacoes",
                estudo: "Internet, e-mail, streaming, jogos, IoT, redes sociais.",
                tese: "Aplicações que dependem de redes para FL.",
                projeto: "Listar 5 aplicações que usam redes.",
              },
            ]
          ),
          T(
            "net-fundamentos-2",
            "Classificação e Arquitetura de Redes",
            [
              "PAN — Personal Area Network (Bluetooth, USB)",
              "LAN — Local Area Network (Ethernet, Wi-Fi)",
              "MAN — Metropolitan Area Network (Redes urbanas)",
              "WAN — Wide Area Network (Internet)",
              "GAN — Global Area Network (Satélites)",
              "Topologias: Barramento, Estrela, Anel, Malha, Árvore",
              "Arquitetura Cliente-Servidor — Servidores centrais atendem clientes",
              "Arquitetura P2P (Peer-to-Peer) — Todos são clientes e servidores",
            ],
            [
              {
                nome: "PAN, LAN, MAN, WAN, GAN",
                slug: "redes/intro/classificacao-tamanho",
                estudo: "Classificação por abrangência geográfica.",
                tese: "Escolha da arquitetura de rede para FL.",
                projeto: "Classificar diferentes redes por tamanho.",
              },
              {
                nome: "Topologias de Rede",
                slug: "redes/intro/topologias",
                estudo: "Barramento, Estrela, Anel, Malha, Árvore — vantagens e desvantagens.",
                tese: "Topologia para comunicação entre clientes.",
                projeto: "Desenhar topologias e comparar.",
              },
              {
                nome: "Arquitetura Cliente-Servidor e P2P",
                slug: "redes/intro/arquiteturas",
                estudo: "Cliente-Servidor (servidores centrais) vs P2P (todos são servidores).",
                tese: "Arquitetura do FL: Cliente-Servidor.",
                projeto: "Comparar Cliente-Servidor e P2P.",
              },
            ]
          ),
          T(
            "net-fundamentos-3",
            "Infraestrutura Física de Redes",
            [
              "Meios Guiados (Cabeados) — Par trançado (UTP, STP, FTP), Cabo coaxial, Fibra óptica (monomodo, multimodo)",
              "Meios Não Guiados (Sem Fio) — Ondas de rádio (Wi-Fi, Bluetooth), Micro-ondas, Infravermelho, Satélite",
              "Comutação de Circuitos — Caminho dedicado (telefonia)",
              "Comutação de Pacotes — Dados divididos em pacotes (Internet)",
            ],
            [
              {
                nome: "Meios de Transmissão",
                slug: "redes/intro/meios-transmissao",
                estudo: "Par trançado (UTP, STP), Coaxial, Fibra óptica (monomodo, multimodo), Wi-Fi, Bluetooth, Satélite.",
                tese: "Escolha do meio físico para comunicação.",
                projeto: "Comparar cabos e tecnologias sem fio.",
              },
              {
                nome: "Comutação de Circuitos vs Pacotes",
                slug: "redes/intro/comutacao",
                estudo: "Comutação de Circuitos (telefonia) vs Comutação de Pacotes (Internet).",
                tese: "Comutação de pacotes é a base da Internet.",
                projeto: "Comparar os dois tipos de comutação.",
              },
            ]
          ),
        ],
      },

      // ─── 2. MODELOS DE REFERÊNCIA E ENDEREÇAMENTO ───
      {
        id: "net-modelos-enderecamento",
        title: "2. Modelos de Referência e Endereçamento (8 aulas)",
        topics: [
          T(
            "net-modelos-1",
            "Modelos OSI e TCP/IP",
            [
              "Modelo OSI — 7 Camadas: Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação",
              "Modelo TCP/IP — 4 Camadas: Acesso à Rede, Internet, Transporte, Aplicação",
              "Semelhanças e diferenças entre OSI e TCP/IP",
              "Por que o TCP/IP venceu?",
              "Encapsulamento de Dados (PDU) — Dados → Segmento → Pacote → Quadro → Bits",
            ],
            [
              {
                nome: "Modelo OSI — 7 Camadas",
                slug: "redes/modelos/osi",
                estudo: "Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação.",
                tese: "Entender a comunicação em camadas.",
                projeto: "Descrever a função de cada camada OSI.",
              },
              {
                nome: "Modelo TCP/IP — 4 Camadas",
                slug: "redes/modelos/tcpip",
                estudo: "Acesso à Rede, Internet, Transporte, Aplicação.",
                tese: "Modelo usado na Internet.",
                projeto: "Comparar OSI e TCP/IP.",
              },
              {
                nome: "Comparação OSI vs TCP/IP",
                slug: "redes/modelos/comparacao",
                estudo: "Semelhanças, diferenças, encapsulamento (PDU).",
                tese: "Por que o TCP/IP venceu.",
                projeto: "Mapear as camadas OSI no TCP/IP.",
              },
            ]
          ),
          T(
            "net-enderecamento-1",
            "Endereçamento MAC e IP",
            [
              "Endereço MAC — 48 bits (6 bytes) em hexadecimal, OUI, NIC",
              "Endereço IP — IP vs MAC, Público vs Privado, Estático vs Dinâmico (DHCP)",
              "IPv4 — 32 bits (4 octetos), Classes A, B, C, D, E",
            ],
            [
              {
                nome: "Endereço MAC",
                slug: "redes/enderecamento/mac",
                estudo: "48 bits (6 bytes) em hexadecimal, OUI, NIC.",
                tese: "Identificação única de dispositivos na rede local.",
                projeto: "Descobrir o MAC do seu computador.",
              },
              {
                nome: "Endereço IP — Introdução",
                slug: "redes/enderecamento/ip-intro",
                estudo: "IP vs MAC, Público vs Privado, Estático vs Dinâmico (DHCP).",
                tese: "Endereçamento lógico na Internet.",
                projeto: "Descobrir seu IP público e privado.",
              },
              {
                nome: "IPv4 — Estrutura e Classes",
                slug: "redes/enderecamento/ipv4",
                estudo: "32 bits (4 octetos), Classes A, B, C, D, E.",
                tese: "Endereçamento IPv4.",
                projeto: "Identificar a classe de diferentes IPs.",
              },
            ]
          ),
          T(
            "net-enderecamento-2",
            "Máscaras e Endereços Especiais",
            [
              "Máscara de Sub-rede — Máscara padrão por classe, notação CIDR (/8, /16, /24)",
              "Endereços Especiais — Rede, Broadcast, Loopback (127.0.0.1), APIPA (169.254.0.0/16), Endereços Privados",
            ],
            [
              {
                nome: "Máscara de Sub-rede",
                slug: "redes/enderecamento/mascara",
                estudo: "Máscara padrão por classe, notação CIDR (/8, /16, /24).",
                tese: "Divisão de redes.",
                projeto: "Calcular máscara e rede de um IP.",
              },
              {
                nome: "Endereços Especiais IPv4",
                slug: "redes/enderecamento/especiais",
                estudo: "Rede, Broadcast, Loopback (127.0.0.1), APIPA (169.254.0.0/16), Endereços Privados.",
                tese: "Endereços reservados.",
                projeto: "Identificar endereços especiais.",
              },
            ]
          ),
        ],
      },

      // ─── 3. EQUIPAMENTOS DE REDE ───
      {
        id: "net-equipamentos",
        title: "3. Equipamentos de Rede (7 aulas)",
        topics: [
          T(
            "net-equipamentos-1",
            "Equipamentos de Camada 1 e 2",
            [
              "Hub (Repetidor Multiporta) — Camada 1 (Física), envia dados para todas as portas, colisões",
              "Switch (Comutador) — Camada 2 (Enlace), tabela MAC, self-learning, VLANs",
              "Bridge — Conecta duas redes (camada 2)",
              "Repeater — Regenera sinal (camada 1)",
            ],
            [
              {
                nome: "Hub",
                slug: "redes/equipamentos/hub",
                estudo: "Camada 1 (Física), envia dados para todas as portas, colisões.",
                tese: "Equipamento obsoleto.",
                projeto: "Comparar Hub e Switch.",
              },
              {
                nome: "Switch",
                slug: "redes/equipamentos/switch",
                estudo: "Camada 2 (Enlace), tabela MAC, self-learning, VLANs.",
                tese: "Equipamento principal em LANs.",
                projeto: "Configurar VLANs em um switch.",
              },
              {
                nome: "Outros Equipamentos",
                slug: "redes/equipamentos/outros",
                estudo: "Bridge, Gateway, Repeater, Load Balancer.",
                tese: "Equipamentos auxiliares.",
                projeto: "Pesquisar a função de cada um.",
              },
            ]
          ),
          T(
            "net-equipamentos-2",
            "Equipamentos de Camada 3",
            [
              "Roteador (Router) — Camada 3 (Rede), tabela de roteamento, NAT, Firewall",
              "Gateway — Porta de entrada para outra rede",
            ],
            [
              {
                nome: "Roteador",
                slug: "redes/equipamentos/roteador",
                estudo: "Camada 3 (Rede), tabela de roteamento, NAT, Firewall.",
                tese: "Equipamento para conectar redes diferentes.",
                projeto: "Configurar roteamento estático.",
              },
            ]
          ),
          T(
            "net-equipamentos-3",
            "Segurança e Conectividade",
            [
              "Firewall — Filtragem de pacotes, ACLs, hardware/software",
              "Access Point (AP) — Redes sem fio, modos: bridge, roteador, repetidor",
              "Modem vs Roteador — Modem (modulação/demodulação) vs Roteador (encaminhamento)",
              "Load Balancer — Distribui tráfego",
            ],
            [
              {
                nome: "Firewall",
                slug: "redes/equipamentos/firewall",
                estudo: "Filtragem de pacotes, ACLs, hardware/software.",
                tese: "Segurança de redes.",
                projeto: "Criar regras de firewall.",
              },
              {
                nome: "Access Point (AP)",
                slug: "redes/equipamentos/ap",
                estudo: "Redes sem fio, modos: bridge, roteador, repetidor.",
                tese: "Conectividade Wi-Fi.",
                projeto: "Configurar um Access Point.",
              },
              {
                nome: "Modem vs Roteador",
                slug: "redes/equipamentos/modem-roteador",
                estudo: "Modem (modulação/demodulação) vs Roteador (encaminhamento).",
                tese: "Diferenças e funções.",
                projeto: "Identificar modem e roteador na sua rede.",
              },
            ]
          ),
        ],
      },

      // ─── 4. PROTOCOLOS BÁSICOS E TRANSPORTE ───
      {
        id: "net-protocolos-transporte",
        title: "4. Protocolos Básicos e Transporte (9 aulas)",
        topics: [
          T(
            "net-protocolos-basicos",
            "Protocolos de Rede Básicos",
            [
              "ARP (Address Resolution Protocol) — Resolve IP → MAC, Tabela ARP, ARP Request/Reply",
              "ICMP (Internet Control Message Protocol) — Ping (Echo Request/Reply), Traceroute (TTL expirado)",
              "DHCP (Dynamic Host Configuration Protocol) — DORA: Discover, Offer, Request, Acknowledge",
              "DNS (Domain Name System) — Resolve nome → IP, estrutura hierárquica, registros (A, AAAA, CNAME, MX)",
            ],
            [
              {
                nome: "ARP (Address Resolution Protocol)",
                slug: "redes/protocolos/arp",
                estudo: "Resolve IP → MAC. Tabela ARP, ARP Request/Reply.",
                tese: "Descoberta de endereços na rede local.",
                projeto: "Verificar a tabela ARP (arp -a).",
              },
              {
                nome: "ICMP (Internet Control Message Protocol)",
                slug: "redes/protocolos/icmp",
                estudo: "Ping (Echo Request/Reply), Traceroute (TTL expirado).",
                tese: "Diagnóstico de rede.",
                projeto: "Usar ping e traceroute.",
              },
              {
                nome: "DHCP (Dynamic Host Configuration Protocol)",
                slug: "redes/protocolos/dhcp",
                estudo: "DORA: Discover, Offer, Request, Acknowledge.",
                tese: "Atribuição automática de IPs.",
                projeto: "Configurar um servidor DHCP.",
              },
              {
                nome: "DNS (Domain Name System)",
                slug: "redes/protocolos/dns",
                estudo: "Resolve nome → IP. Estrutura hierárquica, registros (A, AAAA, CNAME, MX).",
                tese: "Resolução de nomes na Internet.",
                projeto: "Usar nslookup e dig.",
              },
            ]
          ),
          T(
            "net-transporte",
            "Protocolos de Transporte",
            [
              "UDP (User Datagram Protocol) — Não orientado à conexão, sem confiabilidade, leve e rápido",
              "TCP (Transmission Control Protocol) — Orientado à conexão, confiável, controle de fluxo e congestionamento",
              "Three-Way Handshake — SYN → SYN-ACK → ACK, estados (LISTEN, SYN_SENT, SYN_RCVD, ESTABLISHED)",
              "Four-Way Handshake — FIN → ACK → FIN → ACK, estados (FIN_WAIT, TIME_WAIT, CLOSE_WAIT)",
            ],
            [
              {
                nome: "UDP (User Datagram Protocol)",
                slug: "redes/transporte/udp",
                estudo: "Não orientado à conexão, sem confiabilidade, leve e rápido.",
                tese: "Protocolo para streaming, VoIP, jogos.",
                projeto: "Comparar UDP com TCP.",
              },
              {
                nome: "TCP (Transmission Control Protocol)",
                slug: "redes/transporte/tcp",
                estudo: "Orientado à conexão, confiável, controle de fluxo e congestionamento.",
                tese: "Protocolo principal da Internet.",
                projeto: "Analisar cabeçalho TCP.",
              },
              {
                nome: "Three-Way Handshake",
                slug: "redes/transporte/handshake",
                estudo: "SYN → SYN-ACK → ACK, estados (LISTEN, SYN_SENT, SYN_RCVD, ESTABLISHED).",
                tese: "Estabelecimento de conexão TCP.",
                projeto: "Capturar handshake com Wireshark.",
              },
              {
                nome: "Four-Way Handshake",
                slug: "redes/transporte/four-way",
                estudo: "FIN → ACK → FIN → ACK, estados (FIN_WAIT, TIME_WAIT, CLOSE_WAIT).",
                tese: "Encerramento de conexão TCP.",
                projeto: "Capturar encerramento com Wireshark.",
              },
            ]
          ),
          T(
            "net-portas",
            "Portas e Serviços",
            [
              "0-1023: Portas bem conhecidas (system ports)",
              "1024-49151: Portas registradas (user ports)",
              "49152-65535: Portas dinâmicas/privadas (ephemeral ports)",
              "Portas comuns: 20/21 (FTP), 22 (SSH), 23 (Telnet), 25 (SMTP), 53 (DNS), 80 (HTTP), 443 (HTTPS), 3306 (MySQL)",
            ],
            [
              {
                nome: "Portas TCP/UDP",
                slug: "redes/transporte/portas",
                estudo: "0-1023 (bem conhecidas), 1024-49151 (registradas), 49152-65535 (dinâmicas).",
                tese: "Identificação de serviços.",
                projeto: "Listar portas comuns (80, 443, 22, 25).",
              },
            ]
          ),
        ],
      },

      // ─── 5. PROTOCOLOS DE APLICAÇÃO ───
      {
        id: "net-aplicacao",
        title: "5. Protocolos de Aplicação (7 aulas)",
        topics: [
          T(
            "net-web",
            "Protocolos Web",
            [
              "HTTP (Hypertext Transfer Protocol) — Métodos (GET, POST, PUT, DELETE), códigos de status (1xx, 2xx, 3xx, 4xx, 5xx)",
              "HTTPS (HTTP Secure) — HTTP + TLS/SSL, certificados, handshake TLS",
            ],
            [
              {
                nome: "HTTP (Hypertext Transfer Protocol)",
                slug: "redes/aplicacao/http",
                estudo: "Métodos (GET, POST, PUT, DELETE), códigos de status (1xx, 2xx, 3xx, 4xx, 5xx).",
                tese: "Protocolo da Web.",
                projeto: "Analisar requisição HTTP com curl.",
              },
              {
                nome: "HTTPS (HTTP Secure)",
                slug: "redes/aplicacao/https",
                estudo: "HTTP + TLS/SSL, certificados, handshake TLS.",
                tese: "Segurança na Web.",
                projeto: "Verificar certificado de um site.",
              },
            ]
          ),
          T(
            "net-transferencia",
            "Transferência de Arquivos",
            [
              "FTP (File Transfer Protocol) — Portas 20 (dados) e 21 (controle), modo ativo/passivo",
              "TFTP (Trivial FTP) — UDP porta 69, sem autenticação, usado para boot de dispositivos",
            ],
            [
              {
                nome: "FTP (File Transfer Protocol)",
                slug: "redes/aplicacao/ftp",
                estudo: "Portas 20 (dados) e 21 (controle), modo ativo/passivo.",
                tese: "Transferência de arquivos.",
                projeto: "Conectar a um servidor FTP.",
              },
              {
                nome: "TFTP (Trivial FTP)",
                slug: "redes/aplicacao/tftp",
                estudo: "UDP porta 69, sem autenticação, usado para boot de dispositivos.",
                tese: "Transferência simples de arquivos.",
                projeto: "Comparar FTP e TFTP.",
              },
            ]
          ),
          T(
            "net-email",
            "Protocolos de E-mail",
            [
              "SMTP (Simple Mail Transfer Protocol) — Portas 25, 587, 465. Comandos: HELO, MAIL FROM, RCPT TO, DATA, QUIT",
              "POP3 (Post Office Protocol) — Portas 110 (padrão), 995 (SSL). Baixa e-mails para o cliente",
              "IMAP (Internet Message Access Protocol) — Portas 143 (padrão), 993 (SSL). Mantém e-mails no servidor, sincronização",
            ],
            [
              {
                nome: "SMTP (Simple Mail Transfer Protocol)",
                slug: "redes/aplicacao/smtp",
                estudo: "Portas 25, 587, 465. Comandos: HELO, MAIL FROM, RCPT TO, DATA, QUIT.",
                tese: "Envio de e-mails.",
                projeto: "Enviar e-mail via SMTP.",
              },
              {
                nome: "POP3 (Post Office Protocol)",
                slug: "redes/aplicacao/pop3",
                estudo: "Portas 110 (padrão), 995 (SSL). Baixa e-mails para o cliente.",
                tese: "Recepção de e-mails.",
                projeto: "Configurar conta POP3.",
              },
              {
                nome: "IMAP (Internet Message Access Protocol)",
                slug: "redes/aplicacao/imap",
                estudo: "Portas 143 (padrão), 993 (SSL). Mantém e-mails no servidor, sincronização.",
                tese: "Recepção de e-mails com sincronização.",
                projeto: "Configurar conta IMAP.",
              },
            ]
          ),
        ],
      },

      // ─── 6. SUBNETTING E IPv6 ───
      {
        id: "net-subnetting-ipv6",
        title: "6. Subnetting e IPv6 (11 aulas)",
        topics: [
          T(
            "net-subnetting-basico",
            "Subnetting Básico",
            [
              "Conceitos Básicos de Subnetting — Dividir uma rede em redes menores, economia de IPs, organização",
              "Máscara de Sub-rede (Aprofundamento) — Notação decimal e CIDR, bits de rede vs host, cálculo de hosts (2^n - 2)",
              "Cálculo de Sub-redes — Fórmulas: 2^n ≥ N, 2^m - 2 ≥ H, novo prefixo, nova máscara",
            ],
            [
              {
                nome: "Conceitos Básicos de Subnetting",
                slug: "redes/subnetting/conceitos",
                estudo: "Dividir uma rede em redes menores, economia de IPs, organização.",
                tese: "Gerenciamento de endereços IP.",
                projeto: "Entender por que subnetting é importante.",
              },
              {
                nome: "Máscara de Sub-rede (Aprofundamento)",
                slug: "redes/subnetting/mascara",
                estudo: "Notação decimal e CIDR, bits de rede vs host, cálculo de hosts (2^n - 2).",
                tese: "Cálculo de máscaras.",
                projeto: "Converter máscaras entre notações.",
              },
              {
                nome: "Cálculo de Sub-redes",
                slug: "redes/subnetting/calculo",
                estudo: "Fórmulas: 2^n ≥ N, 2^m - 2 ≥ H, novo prefixo, nova máscara.",
                tese: "Criar sub-redes.",
                projeto: "Calcular sub-redes para 192.168.1.0/24.",
              },
            ]
          ),
          T(
            "net-subnetting-avancado",
            "Subnetting Avançado",
            [
              "Exemplos Práticos de Subnetting — Endereço de rede, primeiro host, último host, broadcast",
              "VLSM (Variable Length Subnet Mask) — Sub-redes com tamanhos diferentes, economia de endereços",
              "CIDR (Classless Inter-Domain Routing) — Substitui as classes, supernetting (agregação de rotas)",
            ],
            [
              {
                nome: "Exemplos Práticos de Subnetting",
                slug: "redes/subnetting/exemplos",
                estudo: "Endereço de rede, primeiro host, último host, broadcast.",
                tese: "Aplicação prática.",
                projeto: "Calcular todos os parâmetros para uma sub-rede.",
              },
              {
                nome: "VLSM (Variable Length Subnet Mask)",
                slug: "redes/subnetting/vlsm",
                estudo: "Sub-redes com tamanhos diferentes, economia de endereços.",
                tese: "Subnetting avançado.",
                projeto: "Criar sub-redes com VLSM.",
              },
              {
                nome: "CIDR (Classless Inter-Domain Routing)",
                slug: "redes/subnetting/cidr",
                estudo: "Substitui as classes, supernetting (agregação de rotas).",
                tese: "Roteamento moderno.",
                projeto: "Praticar notação CIDR.",
              },
            ]
          ),
          T(
            "net-ipv6-fundamentos",
            "IPv6 — Fundamentos",
            [
              "Por que IPv6? — Esgotamento de IPv4, comparação IPv4 vs IPv6",
              "Estrutura do IPv6 — 128 bits (16 bytes), notação hexadecimal, notação compacta",
              "Tipos de Endereços IPv6 — Unicast (GUA, Link-Local, ULA, Loopback), Multicast, Anycast",
            ],
            [
              {
                nome: "Por que IPv6?",
                slug: "redes/ipv6/por-que",
                estudo: "Esgotamento de IPv4, comparação IPv4 vs IPv6.",
                tese: "Transição necessária.",
                projeto: "Pesquisar o esgotamento de IPv4.",
              },
              {
                nome: "Estrutura do IPv6",
                slug: "redes/ipv6/estrutura",
                estudo: "128 bits (16 bytes), notação hexadecimal, notação compacta.",
                tese: "Endereçamento IPv6.",
                projeto: "Praticar notação IPv6.",
              },
              {
                nome: "Tipos de Endereços IPv6",
                slug: "redes/ipv6/tipos",
                estudo: "Unicast (GUA, Link-Local, ULA, Loopback), Multicast, Anycast.",
                tese: "Classificação de endereços IPv6.",
                projeto: "Identificar tipos de endereços IPv6.",
              },
            ]
          ),
          T(
            "net-ipv6-configuracao",
            "IPv6 — Configuração e Transição",
            [
              "Configuração de Endereços IPv6 — Estático, SLAAC, DHCPv6, EUI-64",
              "Mecanismos de Transição — Dual Stack, Tunneling (6to4, 6in4, Teredo), Translation (NAT64, DNS64)",
            ],
            [
              {
                nome: "Configuração de Endereços IPv6",
                slug: "redes/ipv6/configuracao",
                estudo: "Estático, SLAAC, DHCPv6, EUI-64.",
                tese: "Como os dispositivos obtêm IPv6.",
                projeto: "Configurar IPv6 num dispositivo.",
              },
              {
                nome: "Mecanismos de Transição",
                slug: "redes/ipv6/transicao",
                estudo: "Dual Stack, Tunneling (6to4, 6in4, Teredo), Translation (NAT64, DNS64).",
                tese: "Transição de IPv4 para IPv6.",
                projeto: "Pesquisar mecanismos de transição.",
              },
            ]
          ),
        ],
      },

      // ─── 7. ROTEAMENTO ───
      {
        id: "net-roteamento",
        title: "7. Roteamento (9 aulas)",
        topics: [
          T(
            "net-roteamento-conceitos",
            "Conceitos e Roteamento Estático",
            [
              "Conceitos de Roteamento — Tabela de roteamento, roteamento direto vs indireto",
              "Tabela de Roteamento — Destino, máscara, next hop, interface, métrica",
              "Roteamento Estático — Rotas estáticas, rota padrão (default gateway), ip route / route add",
            ],
            [
              {
                nome: "Conceitos de Roteamento",
                slug: "redes/roteamento/conceitos",
                estudo: "Tabela de roteamento, roteamento direto vs indireto.",
                tese: "Como os pacotes chegam ao destino.",
                projeto: "Analisar tabela de roteamento (route print).",
              },
              {
                nome: "Tabela de Roteamento",
                slug: "redes/roteamento/tabela",
                estudo: "Destino, máscara, next hop, interface, métrica.",
                tese: "Leitura e interpretação.",
                projeto: "Interpretar uma tabela de roteamento.",
              },
              {
                nome: "Roteamento Estático",
                slug: "redes/roteamento/estatico",
                estudo: "Rotas estáticas, rota padrão (default gateway), ip route / route add.",
                tese: "Configuração manual de rotas.",
                projeto: "Adicionar rota estática.",
              },
            ]
          ),
          T(
            "net-roteamento-dinamico",
            "Roteamento Dinâmico",
            [
              "Roteamento Dinâmico — Protocolos de roteamento, métricas (custo, hop count)",
              "Algoritmos de Roteamento — Distance Vector (RIP, IGRP), Link State (OSPF, IS-IS), Path Vector (BGP)",
            ],
            [
              {
                nome: "Roteamento Dinâmico",
                slug: "redes/roteamento/dinamico",
                estudo: "Protocolos de roteamento, métricas (custo, hop count).",
                tese: "Roteamento automático.",
                projeto: "Comparar protocolos de roteamento.",
              },
              {
                nome: "Algoritmos de Roteamento",
                slug: "redes/roteamento/algoritmos",
                estudo: "Distance Vector (RIP, IGRP), Link State (OSPF, IS-IS), Path Vector (BGP).",
                tese: "Como os protocolos funcionam.",
                projeto: "Comparar os três tipos de algoritmos.",
              },
            ]
          ),
          T(
            "net-protocolos-roteamento",
            "Protocolos de Roteamento",
            [
              "RIP (Routing Information Protocol) — Distance Vector, hop count (máximo 15), RIP v1/v2, RIPng, convergência lenta",
              "OSPF (Open Shortest Path First) — Link State, Dijkstra, hierárquico (áreas), convergência rápida",
              "EIGRP (Enhanced IGRP) — Protocolo híbrido (Cisco), métrica composta, convergência rápida",
              "BGP (Border Gateway Protocol) — Path Vector, ASN, eBGP, iBGP, políticas de roteamento (AS_PATH, LOCAL_PREF, MED)",
            ],
            [
              {
                nome: "RIP (Routing Information Protocol)",
                slug: "redes/roteamento/rip",
                estudo: "Distance Vector, hop count (máximo 15), RIP v1/v2, RIPng, convergência lenta.",
                tese: "Protocolo simples de roteamento.",
                projeto: "Configurar RIP num simulador.",
              },
              {
                nome: "OSPF (Open Shortest Path First)",
                slug: "redes/roteamento/ospf",
                estudo: "Link State, Dijkstra, hierárquico (áreas), convergência rápida.",
                tese: "Protocolo de roteamento interno mais usado.",
                projeto: "Configurar OSPF num simulador.",
              },
              {
                nome: "EIGRP (Enhanced IGRP)",
                slug: "redes/roteamento/eigrp",
                estudo: "Protocolo híbrido (Cisco), métrica composta, convergência rápida.",
                tese: "Protocolo proprietário Cisco.",
                projeto: "Configurar EIGRP num simulador.",
              },
              {
                nome: "BGP (Border Gateway Protocol)",
                slug: "redes/roteamento/bgp",
                estudo: "Path Vector, ASN, eBGP, iBGP, políticas de roteamento (AS_PATH, LOCAL_PREF, MED).",
                tese: "Protocolo de roteamento da Internet.",
                projeto: "Pesquisar como funciona o BGP.",
              },
            ]
          ),
        ],
      },

      // ─── 8. VLANs E REDES SEM FIO ───
      {
        id: "net-vlans-wireless",
        title: "8. VLANs e Redes Sem Fio (9 aulas)",
        topics: [
          T(
            "net-vlans",
            "VLANs (Virtual Local Area Networks)",
            [
              "VLAN (Virtual Local Area Network) — Segmentação lógica, isolamento de tráfego, redução de domínios de broadcast",
              "Tipos de VLAN — Port-based, MAC-based, protocol-based",
              "VLAN Trunk (Tronco) — Transporta múltiplas VLANs, tagging (802.1Q, ISL)",
              "VLAN Tagging — 802.1Q adiciona 4 bytes, VID (1-4094)",
              "Configuração de VLANs — Criação de VLANs, atribuição de portas, configuração de trunk, VTP",
            ],
            [
              {
                nome: "VLAN (Virtual Local Area Network)",
                slug: "redes/vlans/vlan",
                estudo: "Segmentação lógica, isolamento de tráfego, redução de domínios de broadcast.",
                tese: "Organização de redes.",
                projeto: "Criar VLANs num switch.",
              },
              {
                nome: "Tipos de VLAN",
                slug: "redes/vlans/tipos",
                estudo: "Port-based, MAC-based, protocol-based.",
                tese: "Diferentes formas de atribuir VLANs.",
                projeto: "Comparar os tipos de VLAN.",
              },
              {
                nome: "VLAN Trunk (Tronco)",
                slug: "redes/vlans/trunk",
                estudo: "Transporta múltiplas VLANs, tagging (802.1Q, ISL).",
                tese: "Comunicação entre switches com múltiplas VLANs.",
                projeto: "Configurar trunk entre switches.",
              },
              {
                nome: "VLAN Tagging",
                slug: "redes/vlans/tagging",
                estudo: "802.1Q adiciona 4 bytes, VID (1-4094).",
                tese: "Identificação de VLANs no tráfego.",
                projeto: "Analisar pacotes com VLAN tag.",
              },
              {
                nome: "Configuração de VLANs",
                slug: "redes/vlans/configuracao",
                estudo: "Criação de VLANs, atribuição de portas, configuração de trunk, VTP.",
                tese: "Configuração prática.",
                projeto: "Configurar VLANs e trunks num switch.",
              },
            ]
          ),
          T(
            "net-wireless",
            "Redes Sem Fio (Wi-Fi)",
            [
              "Padrões IEEE 802.11 (Wi-Fi) — 802.11a/b/g/n/ac/ax (Wi-Fi 4, 5, 6)",
              "Arquitetura Wi-Fi — BSS, ESS, SSID, BSSID",
              "CSMA/CA — Carrier Sense Multiple Access with Collision Avoidance, DIFS, backoff, RTS/CTS",
              "Modos de Funcionamento — Infraestrutura, Ad-Hoc, WDS",
            ],
            [
              {
                nome: "Padrões IEEE 802.11 (Wi-Fi)",
                slug: "redes/wireless/padroes",
                estudo: "802.11a/b/g/n/ac/ax (Wi-Fi 4, 5, 6).",
                tese: "Evolução do Wi-Fi.",
                projeto: "Comparar os padrões Wi-Fi.",
              },
              {
                nome: "Arquitetura Wi-Fi",
                slug: "redes/wireless/arquitetura",
                estudo: "BSS, ESS, SSID, BSSID.",
                tese: "Como as redes Wi-Fi são organizadas.",
                projeto: "Identificar SSID e BSSID da sua rede.",
              },
              {
                nome: "CSMA/CA",
                slug: "redes/wireless/csmaca",
                estudo: "Carrier Sense Multiple Access with Collision Avoidance, DIFS, backoff, RTS/CTS.",
                tese: "Acesso ao meio em redes sem fio.",
                projeto: "Explicar como funciona o CSMA/CA.",
              },
              {
                nome: "Modos de Funcionamento",
                slug: "redes/wireless/modos",
                estudo: "Infraestrutura, Ad-Hoc, WDS.",
                tese: "Modos de operação de APs.",
                projeto: "Identificar o modo da sua rede.",
              },
            ]
          ),
        ],
      }
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 7. REDES DE COMPUTADORES - PARTE II
  // ════════════════════════════════════════════════════════════════

 {
    id: "rede",
    title: "Redes de Computadores II",
    icon: "🌍",
    color: "#0891b2",
    sections: [
      // ─── 9. NAT, FIREWALLS E QoS ───
      {
        id: "net-nat-firewall-qos",
        title: "9. NAT, Firewalls e QoS (9 aulas)",
        topics: [
          T(
            "net-nat",
            "NAT e PAT",
            [
              "NAT (Network Address Translation) — Traduz IP privado para IP público, Static NAT, Dynamic NAT",
              "PAT (Port Address Translation) / NAT Overload — Múltiplos dispositivos usam um único IP público, portas diferenciadas",
              "DMZ (Demilitarized Zone) — Zona de rede isolada para servidores públicos",
            ],
            [
              {
                nome: "NAT (Network Address Translation)",
                slug: "rede/nat/nat",
                estudo: "Traduz IP privado para IP público, Static NAT, Dynamic NAT, PAT (Port Address Translation).",
                tese: "Economia de endereços IPv4.",
                projeto: "Verificar NAT no roteador.",
              },
              {
                nome: "PAT / NAT Overload",
                slug: "rede/nat/pat",
                estudo: "Múltiplos dispositivos usam um único IP público, portas diferenciadas.",
                tese: "NAT mais comum em roteadores domésticos.",
                projeto: "Entender como o PAT funciona.",
              },
              {
                nome: "DMZ (Demilitarized Zone)",
                slug: "rede/nat/dmz",
                estudo: "Zona de rede isolada para servidores públicos.",
                tese: "Expor serviços com segurança.",
                projeto: "Configurar DMZ num roteador.",
              },
            ]
          ),
          T(
            "net-firewalls",
            "Firewalls e ACLs",
            [
              "Firewalls — Filtragem de pacotes (ACLs), Stateful vs Stateless, NGFW",
              "ACLs (Access Control Lists) — Standard ACLs (IP de origem), Extended ACLs (IP, porta, protocolo)",
            ],
            [
              {
                nome: "Firewalls",
                slug: "rede/nat/firewalls",
                estudo: "Filtragem de pacotes (ACLs), Stateful vs Stateless, NGFW.",
                tese: "Segurança de redes.",
                projeto: "Criar regras de firewall.",
              },
              {
                nome: "ACLs (Access Control Lists)",
                slug: "rede/nat/acls",
                estudo: "Standard ACLs (IP de origem), Extended ACLs (IP, porta, protocolo).",
                tese: "Controle de acesso.",
                projeto: "Criar ACLs num roteador.",
              },
            ]
          ),
          T(
            "net-qos",
            "Qualidade de Serviço (QoS)",
            [
              "O que é QoS? — Garantia de qualidade na rede, priorização de tráfego, gerenciamento de banda",
              "Problemas que QoS resolve — Latência, Jitter, Perda de pacotes, Congestionamento",
              "Técnicas de QoS — Classificação, Marcação (DSCP, CoS, ToS), Filas (FIFO, PQ, WFQ), Policing, Shaping, WRED",
              "DSCP (Differentiated Services Code Point) — Marcador de 6 bits, classes (EF, AF, BE)",
            ],
            [
              {
                nome: "O que é QoS?",
                slug: "rede/qos/o-que-e",
                estudo: "Garantia de qualidade na rede, priorização de tráfego, gerenciamento de banda.",
                tese: "Qualidade em redes.",
                projeto: "Identificar aplicações que precisam de QoS.",
              },
              {
                nome: "Problemas que QoS resolve",
                slug: "rede/qos/problemas",
                estudo: "Latência, Jitter, Perda de pacotes, Congestionamento.",
                tese: "Problemas de rede.",
                projeto: "Medir latência e jitter.",
              },
              {
                nome: "Técnicas de QoS",
                slug: "rede/qos/tecnicas",
                estudo: "Classificação, Marcação (DSCP, CoS, ToS), Filas (FIFO, PQ, WFQ), Policing, Shaping, WRED.",
                tese: "Como implementar QoS.",
                projeto: "Configurar QoS num roteador.",
              },
              {
                nome: "DSCP (Differentiated Services Code Point)",
                slug: "rede/qos/dscp",
                estudo: "Marcador de 6 bits, classes (EF, AF, BE).",
                tese: "Priorização de pacotes.",
                projeto: "Analisar pacotes com DSCP.",
              },
            ]
          ),
        ],
      },

      // ─── 10. SDN E PROTOCOLOS AVANÇADOS ───
      {
        id: "net-sdn-avancados",
        title: "10. SDN e Protocolos Avançados (9 aulas)",
        topics: [
          T(
            "net-sdn",
            "SDN (Software Defined Networking)",
            [
              "O que é SDN? — Software Defined Networking, separação do plano de controle e dados",
              "Arquitetura SDN — Plano de Controle, Plano de Dados, API Norte (aplicações), API Sul (OpenFlow)",
              "OpenFlow — Protocolo de comunicação entre controlador e switch, tabela de fluxos",
              "Benefícios do SDN — Flexibilidade, automação, programabilidade, custos reduzidos",
              "Exemplos de SDN — OpenDaylight, ONOS, Cisco ACI, VMware NSX",
            ],
            [
              {
                nome: "O que é SDN?",
                slug: "rede/sdn/o-que-e",
                estudo: "Software Defined Networking, separação do plano de controle e dados.",
                tese: "Redes programáveis.",
                projeto: "Pesquisar SDN.",
              },
              {
                nome: "Arquitetura SDN",
                slug: "rede/sdn/arquitetura",
                estudo: "Plano de Controle, Plano de Dados, API Norte (aplicações), API Sul (OpenFlow).",
                tese: "Como o SDN funciona.",
                projeto: "Desenhar a arquitetura SDN.",
              },
              {
                nome: "OpenFlow",
                slug: "rede/sdn/openflow",
                estudo: "Protocolo de comunicação entre controlador e switch, tabela de fluxos.",
                tese: "Protocolo padrão do SDN.",
                projeto: "Explorar o OpenFlow.",
              },
              {
                nome: "Benefícios do SDN",
                slug: "rede/sdn/beneficios",
                estudo: "Flexibilidade, automação, programabilidade, custos reduzidos.",
                tese: "Vantagens do SDN.",
                projeto: "Listar benefícios do SDN.",
              },
              {
                nome: "Exemplos de SDN",
                slug: "rede/sdn/exemplos",
                estudo: "OpenDaylight, ONOS, Cisco ACI, VMware NSX.",
                tese: "Implementações de SDN.",
                projeto: "Pesquisar uma implementação de SDN.",
              },
            ]
          ),
          T(
            "net-protocolos-avancados",
            "Protocolos Avançados",
            [
              "STP (Spanning Tree Protocol) — Evita loops na rede, eleição do Root Bridge, portas (Root, Designated, Blocked)",
              "EtherChannel / LACP — Agregação de links, LACP (IEEE 802.3ad), load balancing",
              "MPLS (Multiprotocol Label Switching) — Labels, FEC, LER, LSR, VPNs com MPLS",
              "VPNs (Virtual Private Networks) — IPsec, SSL/TLS, PPTP, L2TP, WireGuard, Site-to-Site, Remote Access",
              "Multiplexação — TDM, FDM, WDM",
            ],
            [
              {
                nome: "STP (Spanning Tree Protocol)",
                slug: "rede/avancado/stp",
                estudo: "Evita loops na rede, eleição do Root Bridge, portas (Root, Designated, Blocked).",
                tese: "Prevenção de loops.",
                projeto: "Simular STP num ambiente com switches.",
              },
              {
                nome: "EtherChannel / LACP",
                slug: "rede/avancado/etherchannel",
                estudo: "Agregação de links, LACP (IEEE 802.3ad), load balancing.",
                tese: "Aumento de banda e redundância.",
                projeto: "Configurar EtherChannel.",
              },
              {
                nome: "MPLS (Multiprotocol Label Switching)",
                slug: "rede/avancado/mpls",
                estudo: "Labels, FEC, LER, LSR, VPNs com MPLS.",
                tese: "Roteamento baseado em rótulos.",
                projeto: "Pesquisar MPLS.",
              },
              {
                nome: "VPNs (Virtual Private Networks)",
                slug: "rede/avancado/vpn",
                estudo: "IPsec, SSL/TLS, PPTP, L2TP, WireGuard, Site-to-Site, Remote Access.",
                tese: "Comunicação segura.",
                projeto: "Configurar uma VPN.",
              },
              {
                nome: "Multiplexação",
                slug: "rede/avancado/multiplexacao",
                estudo: "TDM, FDM, WDM.",
                tese: "Compartilhamento de meio.",
                projeto: "Comparar TDM, FDM, WDM.",
              },
            ]
          ),
        ],
      },

      // ─── 11. SEGURANÇA DE REDES ───
      {
        id: "net-seguranca",
        title: "11. Segurança de Redes (8 aulas)",
        topics: [
          T(
            "net-seguranca-fundamentos",
            "Fundamentos de Segurança",
            [
              "Conceitos de Segurança (CIA, AAA) — Confidencialidade, Integridade, Disponibilidade, Autenticação, Autorização, Auditoria",
              "Criptografia — Simétrica (AES, DES), Assimétrica (RSA, ECC), Hashing (MD5, SHA), PKI",
            ],
            [
              {
                nome: "Conceitos de Segurança (CIA, AAA)",
                slug: "rede/seguranca/conceitos",
                estudo: "Confidencialidade, Integridade, Disponibilidade, Autenticação, Autorização, Auditoria.",
                tese: "Segurança de redes.",
                projeto: "Explicar os pilares da segurança.",
              },
              {
                nome: "Criptografia",
                slug: "rede/seguranca/criptografia",
                estudo: "Simétrica (AES, DES), Assimétrica (RSA, ECC), Hashing (MD5, SHA), PKI.",
                tese: "Proteção de dados.",
                projeto: "Comparar criptografia simétrica e assimétrica.",
              },
            ]
          ),
          T(
            "net-seguranca-autenticacao",
            "Autenticação e Ameaças",
            [
              "Autenticação — 802.1X, RADIUS, TACACS+, LDAP",
              "Ataques de Rede — DoS/DDoS, MITM (ARP Spoofing, DNS Spoofing), Sniffing, IP Spoofing, VLAN Hopping",
            ],
            [
              {
                nome: "Autenticação (802.1X, RADIUS, TACACS+, LDAP)",
                slug: "rede/seguranca/autenticacao",
                estudo: "802.1X, RADIUS, TACACS+, LDAP.",
                tese: "Controle de acesso.",
                projeto: "Configurar autenticação 802.1X.",
              },
              {
                nome: "Ataques de Rede",
                slug: "rede/seguranca/ataques",
                estudo: "DoS/DDoS, MITM (ARP Spoofing, DNS Spoofing), Sniffing, IP Spoofing, VLAN Hopping.",
                tese: "Ameaças à segurança.",
                projeto: "Simular um ataque ARP Spoofing.",
              },
            ]
          ),
          T(
            "net-seguranca-defesa",
            "Sistemas de Defesa",
            [
              "IDS/IPS (Intrusion Detection/Prevention System) — IDS (detecta e alerta), IPS (detecta e bloqueia), HIDS, NIDS, Signature-based, Anomaly-based",
              "Firewalls Avançados — NGFW, UTM, Stateful, Application Awareness, IPS integrado",
              "VPNs (Aprofundamento) — IPsec (modo transporte/túnel), IKE, Site-to-Site, Remote Access, WireGuard",
            ],
            [
              {
                nome: "IDS/IPS (Intrusion Detection/Prevention System)",
                slug: "rede/seguranca/ids-ips",
                estudo: "IDS (detecta e alerta), IPS (detecta e bloqueia), HIDS, NIDS, Signature-based, Anomaly-based.",
                tese: "Detecção de intrusões.",
                projeto: "Configurar Snort ou Suricata.",
              },
              {
                nome: "Firewalls Avançados",
                slug: "rede/seguranca/firewalls-avancados",
                estudo: "NGFW, UTM, Stateful, Application Awareness, IPS integrado.",
                tese: "Firewalls modernos.",
                projeto: "Pesquisar NGFW.",
              },
              {
                nome: "VPNs (Aprofundamento)",
                slug: "rede/seguranca/vpn-avancado",
                estudo: "IPsec (modo transporte/túnel), IKE, Site-to-Site, Remote Access, WireGuard.",
                tese: "Comunicação segura avançada.",
                projeto: "Configurar WireGuard.",
              },
            ]
          ),
          T(
            "net-seguranca-zero-trust",
            "Modelos Modernos",
            [
              "Zero Trust — Nunca confie, sempre verifique, microsegmentação, autenticação contínua, SDP",
            ],
            [
              {
                nome: "Zero Trust",
                slug: "rede/seguranca/zero-trust",
                estudo: "Nunca confie, sempre verifique, microsegmentação, autenticação contínua, SDP.",
                tese: "Modelo de segurança moderno.",
                projeto: "Pesquisar Zero Trust.",
              },
            ]
          ),
        ],
      },

      // ─── 12. PROTOCOLOS AVANÇADOS E INTERNET ───
      {
        id: "net-avancado-internet",
        title: "12. Protocolos Avançados e Internet (5 aulas)",
        topics: [
          T(
            "net-avancado-bgp-ospf",
            "Protocolos Avançados",
            [
              "BGP (Border Gateway Protocol) — Aprofundado: ASN, eBGP vs iBGP, atributos (AS_PATH, LOCAL_PREF, MED), route maps, route reflectors",
              "OSPF (Open Shortest Path First) — Aprofundado: ABR, ASBR, áreas (backbone, stub, NSSA), LSA Types, estados de adjacência",
              "MPLS (Aprofundado) — Labels, FEC, LDP, L3VPN, L2VPN, VPLS, Traffic Engineering",
            ],
            [
              {
                nome: "BGP (Border Gateway Protocol) — Aprofundado",
                slug: "rede/avancado-internet/bgp-avancado",
                estudo: "ASN, eBGP vs iBGP, atributos (AS_PATH, LOCAL_PREF, MED), route maps, route reflectors.",
                tese: "Roteamento da Internet.",
                projeto: "Pesquisar atributos BGP.",
              },
              {
                nome: "OSPF — Aprofundado",
                slug: "rede/avancado-internet/ospf-avancado",
                estudo: "ABR, ASBR, áreas (backbone, stub, NSSA), LSA Types, estados de adjacência.",
                tese: "OSPF avançado.",
                projeto: "Configurar OSPF com múltiplas áreas.",
              },
              {
                nome: "MPLS (Aprofundado)",
                slug: "rede/avancado-internet/mpls-avancado",
                estudo: "Labels, FEC, LDP, L3VPN, L2VPN, VPLS, Traffic Engineering.",
                tese: "MPLS avançado.",
                projeto: "Pesquisar MPLS VPN.",
              },
            ]
          ),
          T(
            "net-avancado-emergentes",
            "Tecnologias Emergentes",
            [
              "Segment Routing (SR) — Nova arquitetura MPLS, SDN + MPLS, SID",
              "MP-BGP (Multiprotocol BGP) — Suporte a múltiplos protocolos, MPLS L3VPN, IPv6",
            ],
            [
              {
                nome: "Segment Routing (SR)",
                slug: "rede/avancado-internet/segment-routing",
                estudo: "Nova arquitetura MPLS, SDN + MPLS, SID.",
                tese: "Roteamento moderno.",
                projeto: "Pesquisar Segment Routing.",
              },
              {
                nome: "MP-BGP (Multiprotocol BGP)",
                slug: "rede/avancado-internet/mp-bgp",
                estudo: "Suporte a múltiplos protocolos, MPLS L3VPN, IPv6.",
                tese: "BGP para múltiplos protocolos.",
                projeto: "Pesquisar MP-BGP.",
              },
            ]
          ),
        ],
      },

      // ─── 13. ARQUITETURAS DISTRIBUÍDAS E NUVEM ───
      {
        id: "net-cloud",
        title: "13. Arquiteturas Distribuídas e Nuvem (6 aulas)",
        topics: [
          T(
            "net-cloud-arquiteturas",
            "Arquiteturas de Comunicação",
            [
              "Arquitetura Cliente-Servidor — Servidores dedicados, escalabilidade, balanceamento de carga",
              "Arquitetura Peer-to-Peer (P2P) — Todos são clientes e servidores, BitTorrent, Blockchain, DHT",
            ],
            [
              {
                nome: "Arquitetura Cliente-Servidor",
                slug: "rede/cloud/cliente-servidor",
                estudo: "Servidores dedicados, escalabilidade, balanceamento de carga.",
                tese: "Modelo principal de comunicação.",
                projeto: "Implementar um servidor simples.",
              },
              {
                nome: "Arquitetura Peer-to-Peer (P2P)",
                slug: "rede/cloud/p2p",
                estudo: "Todos são clientes e servidores, BitTorrent, Blockchain, DHT.",
                tese: "Modelo descentralizado.",
                projeto: "Pesquisar P2P.",
              },
            ]
          ),
          T(
            "net-cloud-infra",
            "Computação em Nuvem e Virtualização",
            [
              "Computação em Nuvem (Cloud Computing) — IaaS, PaaS, SaaS, FaaS (Serverless)",
              "Virtualização de Redes — NFV, VNF, Overlay Networks (VXLAN, NVGRE, Geneve)",
            ],
            [
              {
                nome: "Computação em Nuvem (Cloud Computing)",
                slug: "rede/cloud/nuvem",
                estudo: "IaaS, PaaS, SaaS, FaaS (Serverless).",
                tese: "Infraestrutura moderna.",
                projeto: "Comparar IaaS, PaaS, SaaS.",
              },
              {
                nome: "Virtualização de Redes",
                slug: "rede/cloud/virtualizacao",
                estudo: "NFV, VNF, Overlay Networks (VXLAN, NVGRE, Geneve).",
                tese: "Redes virtuais.",
                projeto: "Pesquisar NFV.",
              },
            ]
          ),
          T(
            "net-cloud-entrega",
            "Entrega e Conectividade",
            [
              "CDN (Content Delivery Network) — Distribuição de conteúdo (cache), menor latência, Cloudflare, Akamai",
              "SD-WAN (Software-Defined WAN) — Conectividade WAN com SDN, overlay sobre internet, otimização de tráfego",
            ],
            [
              {
                nome: "CDN (Content Delivery Network)",
                slug: "rede/cloud/cdn",
                estudo: "Distribuição de conteúdo (cache), menor latência, Cloudflare, Akamai.",
                tese: "Entrega de conteúdo.",
                projeto: "Pesquisar CDN.",
              },
              {
                nome: "SD-WAN",
                slug: "rede/cloud/sd-wan",
                estudo: "Conectividade WAN com SDN, overlay sobre internet, otimização de tráfego.",
                tese: "WAN moderna.",
                projeto: "Pesquisar SD-WAN.",
              },
            ]
          ),
        ],
      },

      // ─── 14. PROGRAMAÇÃO DE REDES (SOCKETS) ───
      {
        id: "net-sockets",
        title: "14. Programação de Redes (Sockets) (7 aulas)",
        topics: [
          T(
            "net-sockets-fundamentos",
            "Fundamentos de Sockets",
            [
              "O que são Sockets? — API para comunicação em rede, endpoint de comunicação, Socket = IP + Porta",
              "Tipos de Sockets — Stream Sockets (TCP), Datagram Sockets (UDP), Raw Sockets",
            ],
            [
              {
                nome: "O que são Sockets?",
                slug: "rede/sockets/o-que-sao",
                estudo: "API para comunicação em rede, endpoint de comunicação, Socket = IP + Porta.",
                tese: "Base para programação de redes.",
                projeto: "Criar um socket simples em Python.",
              },
              {
                nome: "Tipos de Sockets",
                slug: "rede/sockets/tipos",
                estudo: "Stream Sockets (TCP), Datagram Sockets (UDP), Raw Sockets.",
                tese: "Tipos de comunicação.",
                projeto: "Comparar TCP e UDP.",
              },
            ]
          ),
          T(
            "net-sockets-python",
            "Sockets em Python",
            [
              "Sockets em Python — TCP — Servidor: socket, bind, listen, accept, recv, send, close. Cliente: socket, connect, send, recv, close",
              "Sockets em Python — UDP — Servidor: socket, bind, recvfrom, sendto. Cliente: socket, sendto, recvfrom",
            ],
            [
              {
                nome: "Sockets em Python — TCP",
                slug: "rede/sockets/python-tcp",
                estudo: "Servidor TCP: socket, bind, listen, accept, recv, send, close. Cliente TCP: socket, connect, send, recv, close.",
                tese: "Implementação de TCP.",
                projeto: "Criar um chat TCP simples.",
              },
              {
                nome: "Sockets em Python — UDP",
                slug: "rede/sockets/python-udp",
                estudo: "Servidor UDP: socket, bind, recvfrom, sendto. Cliente UDP: socket, sendto, recvfrom.",
                tese: "Implementação de UDP.",
                projeto: "Criar um cliente UDP simples.",
              },
            ]
          ),
          T(
            "net-sockets-exemplos",
            "Exemplos e Ferramentas",
            [
              "Exemplos Práticos — Chat simples (TCP), Cliente HTTP, Servidor HTTP, Cliente DNS",
              "Sockets em C — API UNIX: socket, bind, listen, accept, connect, recv, send, close",
              "Ferramentas para Desenvolvimento — Wireshark, tcpdump, netcat (nc), curl",
            ],
            [
              {
                nome: "Exemplos Práticos",
                slug: "rede/sockets/exemplos",
                estudo: "Chat simples (TCP), Cliente HTTP, Servidor HTTP, Cliente DNS.",
                tese: "Aplicações com sockets.",
                projeto: "Implementar um cliente HTTP simples.",
              },
              {
                nome: "Sockets em C",
                slug: "rede/sockets/c",
                estudo: "API UNIX: socket, bind, listen, accept, connect, recv, send, close.",
                tese: "Implementação em C.",
                projeto: "Criar um servidor TCP em C.",
              },
              {
                nome: "Ferramentas para Desenvolvimento",
                slug: "rede/sockets/ferramentas",
                estudo: "Wireshark, tcpdump, netcat (nc), curl.",
                tese: "Debug de redes.",
                projeto: "Usar netcat para testar conexões.",
              },
            ]
          ),
        ],
      },

      // ─── 15. MONITORAMENTO, ANÁLISE E AUTOMAÇÃO ───
      {
        id: "net-monitoramento-analise-automacao",
        title: "15. Monitoramento, Análise e Automação (13 aulas)",
        topics: [
          T(
            "net-monitoramento",
            "Monitoramento de Redes",
            [
              "SNMP (Simple Network Management Protocol) — Manager e Agent, MIB, OID, GET, SET, TRAP, SNMPv1/v2c/v3",
              "Syslog — Logs de dispositivos, níveis de severidade (0-7), facilidades",
              "NetFlow / sFlow / IPFIX — Coleta de fluxos de rede, análise de tráfego",
              "NTP (Network Time Protocol) — Sincronização de tempo, estratos",
              "Ferramentas de Monitoramento — Nagios, Zabbix, PRTG, SolarWinds, Prometheus + Grafana, ELK Stack",
            ],
            [
              {
                nome: "SNMP (Simple Network Management Protocol)",
                slug: "rede/monitoramento/snmp",
                estudo: "Manager e Agent, MIB, OID, GET, SET, TRAP, SNMPv1/v2c/v3.",
                tese: "Monitoramento de dispositivos.",
                projeto: "Configurar SNMP num dispositivo.",
              },
              {
                nome: "Syslog",
                slug: "rede/monitoramento/syslog",
                estudo: "Logs de dispositivos, níveis de severidade (0-7), facilidades.",
                tese: "Centralização de logs.",
                projeto: "Configurar servidor Syslog.",
              },
              {
                nome: "NetFlow / sFlow / IPFIX",
                slug: "rede/monitoramento/netflow",
                estudo: "Coleta de fluxos de rede, análise de tráfego.",
                tese: "Análise de tráfego.",
                projeto: "Pesquisar NetFlow.",
              },
              {
                nome: "NTP (Network Time Protocol)",
                slug: "rede/monitoramento/ntp",
                estudo: "Sincronização de tempo, estratos.",
                tese: "Sincronização de relógios.",
                projeto: "Configurar cliente NTP.",
              },
              {
                nome: "Ferramentas de Monitoramento",
                slug: "rede/monitoramento/ferramentas",
                estudo: "Nagios, Zabbix, PRTG, SolarWinds, Prometheus + Grafana, ELK Stack.",
                tese: "Monitoramento de redes.",
                projeto: "Configurar Nagios ou Zabbix.",
              },
            ]
          ),
          T(
            "net-analise",
            "Análise de Tráfego e Diagnóstico",
            [
              "Ferramentas de Diagnóstico — ping, traceroute/tracert, pathping, telnet, nc/netcat",
              "Comandos de Rede no Windows — ipconfig, ping, tracert, nslookup, netstat, route print, arp -a, netsh",
              "Comandos de Rede no Linux — ifconfig, ip addr, ip route, ping, traceroute, dig, nslookup, netstat, ss, arp, tcpdump",
              "Wireshark — Captura de pacotes, filtros (ip.addr, tcp.port, http), análise de protocolos, Follow TCP Stream",
              "tcpdump — Captura de pacotes no terminal, filtros (host, port, protocolo)",
            ],
            [
              {
                nome: "Ferramentas de Diagnóstico",
                slug: "rede/analise/diagnostico",
                estudo: "ping, traceroute/tracert, pathping, telnet, nc/netcat.",
                tese: "Diagnóstico de rede.",
                projeto: "Usar todas as ferramentas de diagnóstico.",
              },
              {
                nome: "Comandos de Rede no Windows",
                slug: "rede/analise/windows",
                estudo: "ipconfig, ping, tracert, nslookup, netstat, route print, arp -a, netsh.",
                tese: "Diagnóstico no Windows.",
                projeto: "Praticar todos os comandos.",
              },
              {
                nome: "Comandos de Rede no Linux",
                slug: "rede/analise/linux",
                estudo: "ifconfig, ip addr, ip route, ping, traceroute, dig, nslookup, netstat, ss, arp, tcpdump.",
                tese: "Diagnóstico no Linux.",
                projeto: "Praticar todos os comandos.",
              },
              {
                nome: "Wireshark",
                slug: "rede/analise/wireshark",
                estudo: "Captura de pacotes, filtros (ip.addr, tcp.port, http), análise de protocolos, Follow TCP Stream.",
                tese: "Análise de tráfego.",
                projeto: "Capturar e analisar tráfego HTTP com Wireshark.",
              },
              {
                nome: "tcpdump",
                slug: "rede/analise/tcpdump",
                estudo: "Captura de pacotes no terminal, filtros (host, port, protocolo).",
                tese: "Análise no terminal.",
                projeto: "Usar tcpdump para capturar pacotes.",
              },
            ]
          ),
          T(
            "net-automacao",
            "Automação e Orquestração",
            [
              "Automação de Redes — Scripts, Python + Paramiko (SSH), Python + Netmiko, Python + NAPALM, Python + Ansible",
              "Ansible para Redes — Playbooks, módulos (ios_config, nxos_config), inventários, roles",
              "REST APIs e Python — API REST de dispositivos, Requests library",
              "Netconf / YANG — Protocolo de configuração, YANG (modelagem de dados), Netconf (XML), RESTCONF",
              "gRPC / Protocol Buffers — Comunicação eficiente, streaming de telemetria",
            ],
            [
              {
                nome: "Automação de Redes",
                slug: "rede/automacao/automacao",
                estudo: "Scripts, Python + Paramiko (SSH), Python + Netmiko, Python + NAPALM, Python + Ansible.",
                tese: "Automação de configuração.",
                projeto: "Usar Netmiko para configurar um dispositivo.",
              },
              {
                nome: "Ansible para Redes",
                slug: "rede/automacao/ansible",
                estudo: "Playbooks, módulos (ios_config, nxos_config), inventários, roles.",
                tese: "Automação com Ansible.",
                projeto: "Criar um playbook Ansible.",
              },
              {
                nome: "REST APIs e Python",
                slug: "rede/automacao/rest-api",
                estudo: "API REST de dispositivos, Requests library.",
                tese: "Automação com REST API.",
                projeto: "Configurar dispositivo via REST API.",
              },
              {
                nome: "Netconf / YANG",
                slug: "rede/automacao/netconf",
                estudo: "Protocolo de configuração, YANG (modelagem de dados), Netconf (XML), RESTCONF.",
                tese: "Automação com Netconf.",
                projeto: "Pesquisar Netconf e YANG.",
              },
              {
                nome: "gRPC / Protocol Buffers",
                slug: "rede/automacao/grpc",
                estudo: "Comunicação eficiente, streaming de telemetria.",
                tese: "Telemetria de redes.",
                projeto: "Pesquisar gRPC.",
              },
            ]
          ),
        ],
      },

      // ─── 16. TÓPICOS DE PESQUISA AVANÇADA ───
      {
        id: "net-pesquisa",
        title: "16. Tópicos de Pesquisa Avançada (7 aulas)",
        topics: [
          T(
            "net-pesquisa-sdn",
            "SDN Avançado e P4",
            [
              "SDN Avançado e P4 — SDN em data centers, SD-WAN, SDN e NFV, P4 (programação de switches)",
            ],
            [
              {
                nome: "SDN Avançado e P4",
                slug: "rede/pesquisa/sdn-p4",
                estudo: "SDN em data centers, SD-WAN, SDN e NFV, P4 (programação de switches).",
                tese: "Redes programáveis.",
                projeto: "Pesquisar P4.",
              },
            ]
          ),
          T(
            "net-pesquisa-futuro",
            "Redes Quânticas e 5G/6G",
            [
              "Redes Quânticas — Comunicação quântica, teleportação quântica, criptografia quântica, QKD",
              "Redes 5G e 6G — Arquitetura 5G, Network Slicing, MEC, 6G (Terahertz, IA, holográfico)",
            ],
            [
              {
                nome: "Redes Quânticas",
                slug: "rede/pesquisa/quantica",
                estudo: "Comunicação quântica, teleportação quântica, criptografia quântica, QKD.",
                tese: "Futuro das redes.",
                projeto: "Pesquisar redes quânticas.",
              },
              {
                nome: "Redes 5G e 6G",
                slug: "rede/pesquisa/5g-6g",
                estudo: "Arquitetura 5G, Network Slicing, MEC, 6G (Terahertz, IA, holográfico).",
                tese: "Redes móveis do futuro.",
                projeto: "Pesquisar 5G e 6G.",
              },
            ]
          ),
          T(
            "net-pesquisa-iot-ia",
            "IoT e IA em Redes",
            [
              "Redes IoT (Internet of Things) — Protocolos: MQTT, CoAP, LoRaWAN, Zigbee, Z-Wave, NB-IoT. Arquitetura IoT, segurança",
              "IA em Redes — IA para gerenciamento, detecção de anomalias com ML, predição de falhas, roteamento inteligente",
            ],
            [
              {
                nome: "Redes IoT (Internet of Things)",
                slug: "rede/pesquisa/iot",
                estudo: "Protocolos: MQTT, CoAP, LoRaWAN, Zigbee, Z-Wave, NB-IoT. Arquitetura IoT, segurança.",
                tese: "Internet das Coisas.",
                projeto: "Implementar um dispositivo IoT com MQTT.",
              },
              {
                nome: "IA em Redes",
                slug: "rede/pesquisa/ia-redes",
                estudo: "IA para gerenciamento, detecção de anomalias com ML, predição de falhas, roteamento inteligente.",
                tese: "Inteligência Artificial em redes.",
                projeto: "Aplicar ML para detecção de anomalias.",
              },
            ]
          ),
          T(
            "net-pesquisa-blockchain-metodologia",
            "Blockchain e Metodologia de Pesquisa",
            [
              "Blockchain em Redes — Registro descentralizado, aplicações: DNS, PKI, IoT",
              "Metodologia de Pesquisa — Leitura de artigos (SIGCOMM, ICNP, NSDI, INFOCOM), simulação (NS-3, OMNeT++, Mininet), experimentação, avaliação de desempenho, escrita de artigos",
            ],
            [
              {
                nome: "Blockchain em Redes",
                slug: "rede/pesquisa/blockchain",
                estudo: "Registro descentralizado, aplicações: DNS, PKI, IoT.",
                tese: "Blockchain aplicado a redes.",
                projeto: "Pesquisar aplicações de blockchain em redes.",
              },
              {
                nome: "Metodologia de Pesquisa",
                slug: "rede/pesquisa/metodologia",
                estudo: "Leitura de artigos (SIGCOMM, ICNP, NSDI, INFOCOM), simulação (NS-3, OMNeT++, Mininet), experimentação, avaliação de desempenho, escrita de artigos.",
                tese: "Pesquisa em redes.",
                projeto: "Ler e resumir um artigo científico.",
              },
            ]
          ),
        ],
      },

      // ─── 17. CERTIFICAÇÕES ───
      {
        id: "net-certificacoes",
        title: "17. Certificações (Opcional) (5 aulas)",
        topics: [
          T(
            "net-certificacoes-1",
            "CompTIA Network+",
            ["Fundamentos de rede — Iniciante"],
            [
              {
                nome: "CompTIA Network+",
                slug: "rede/certificacoes/network-plus",
                estudo: "Fundamentos de rede — Iniciante.",
                tese: "Certificação básica.",
                projeto: "Pesquisar a certificação Network+.",
              },
            ]
          ),
          T(
            "net-certificacoes-2",
            "CCNA (Cisco Certified Network Associate)",
            ["Roteamento, comutação, segurança — Intermediário"],
            [
              {
                nome: "CCNA (Cisco Certified Network Associate)",
                slug: "rede/certificacoes/ccna",
                estudo: "Roteamento, comutação, segurança — Intermediário.",
                tese: "Certificação Cisco.",
                projeto: "Pesquisar a certificação CCNA.",
              },
            ]
          ),
          T(
            "net-certificacoes-3",
            "CCNP (Cisco Certified Network Professional)",
            ["Avançado — Especializações: Enterprise, Security, Data Center, Service Provider"],
            [
              {
                nome: "CCNP (Cisco Certified Network Professional)",
                slug: "rede/certificacoes/ccnp",
                estudo: "Avançado — Especializações: Enterprise, Security, Data Center, Service Provider.",
                tese: "Certificação Cisco avançada.",
                projeto: "Pesquisar a certificação CCNP.",
              },
            ]
          ),
          T(
            "net-certificacoes-4",
            "JNCIA (Juniper Networks Certified Associate)",
            ["Certificação Juniper — Intermediário"],
            [
              {
                nome: "JNCIA (Juniper Networks Certified Associate)",
                slug: "rede/certificacoes/jncia",
                estudo: "Certificação Juniper — Intermediário.",
                tese: "Certificação Juniper.",
                projeto: "Pesquisar a certificação JNCIA.",
              },
            ]
          ),
          T(
            "net-certificacoes-5",
            "AWS / Azure / Google Cloud Networking",
            ["Certificações de nuvem — Advanced"],
            [
              {
                nome: "AWS / Azure / Google Cloud Networking",
                slug: "rede/certificacoes/cloud-networking",
                estudo: "Certificações de nuvem — Advanced.",
                tese: "Certificações de nuvem.",
                projeto: "Pesquisar certificações de rede na nuvem.",
              },
            ]
          ),
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 8. ARQUITETURA DE COMPUTADORES ok
  // ════════════════════════════════════════════════════════════════
  {
    id: "arquitetura",
    title: "Arquitetura de Computadores e SO",
    icon: "🖥️",
    color: "#22c55e",
    sections: [
      // ─── 1. FUNDAMENTOS DE HARDWARE ───
      {
        id: "arc-fund",
        title: "1. Fundamentos de Hardware",
        topics: [
          T(
            "arc-fund-1",
            "Sistemas Numéricos",
            [
              "Sistemas de Numeração (Binário, Octal, Hexadecimal)",
              "Conversões entre Bases",
              "Aritmética Binária (Soma, Subtração, Multiplicação, Divisão)",
              "Representação de Inteiros (Sinal-Magnitude, Complemento de 1 e 2)",
              "Ponto Flutuante (IEEE 754 - Precisão Simples e Dupla)",
              "Representação de Caracteres (ASCII, Unicode, UTF-8)",
            ],
            [
              {
                nome: "Sistemas de Numeração e Conversões",
                slug: "arquitetura/fundamentos/sistemas-numeracao",
                estudo: "Binário, Octal, Hexadecimal. Conversões entre bases. Aritmética binária.",
                tese: "Base de toda representação digital.",
                projeto: "Praticar conversões entre bases e operações aritméticas binárias.",
              },
              {
                nome: "Representação de Inteiros",
                slug: "arquitetura/fundamentos/representacao-inteiros",
                estudo: "Sinal-Magnitude, Complemento de 1, Complemento de 2. Faixa de valores.",
                tese: "Como a CPU armazena números inteiros negativos e positivos.",
                projeto: "Calcular faixas de valores para 8, 16, 32 e 64 bits.",
              },
              {
                nome: "Ponto Flutuante (IEEE 754)",
                slug: "arquitetura/fundamentos/ieee754",
                estudo: "Precisão Simples (32 bits) e Dupla (64 bits). Sinal, Expoente, Mantissa.",
                tese: "Representação de números reais em hardware.",
                projeto: "Converter números decimais para IEEE 754 e vice-versa.",
              },
              {
                nome: "Representação de Caracteres",
                slug: "arquitetura/fundamentos/representacao-caracteres",
                estudo: "ASCII, Unicode, UTF-8, UTF-16. Como o computador armazena texto.",
                tese: "Internacionalização e manipulação de texto.",
                projeto: "Analisar bytes de um arquivo de texto em UTF-8.",
              },
            ]
          ),
          T(
            "arc-fund-2",
            "Portas Lógicas e Circuitos",
            [
              "Portas Lógicas (AND, OR, NOT, NAND, NOR, XOR, XNOR)",
              "Tabelas Verdade e Símbolos",
              "Álgebra de Boole (Propriedades, Leis de De Morgan)",
              "Simplificação de Expressões (Mapas de Karnaugh)",
              "Circuitos Combinacionais (Somadores, Multiplexadores, Decodificadores)",
              "Circuitos Sequenciais (Flip-Flops, Latches, Registradores, Contadores)",
            ],
            [
              {
                nome: "Portas Lógicas e Álgebra de Boole",
                slug: "arquitetura/fundamentos/portas-logicas",
                estudo: "AND, OR, NOT, NAND, NOR, XOR, XNOR. Leis de De Morgan.",
                tese: "Blocos fundamentais de todo circuito digital.",
                projeto: "Simular portas lógicas e simplificar expressões booleanas.",
              },
              {
                nome: "Mapas de Karnaugh",
                slug: "arquitetura/fundamentos/karnaugh",
                estudo: "Simplificação de expressões com 2, 3 e 4 variáveis. Agrupamentos.",
                tese: "Método visual para minimização de circuitos.",
                projeto: "Simplificar expressões com Karnaugh e implementar portas.",
              },
              {
                nome: "Circuitos Combinacionais",
                slug: "arquitetura/fundamentos/circuitos-combinacionais",
                estudo: "Somadores (Half-Adder, Full-Adder), Multiplexadores, Decodificadores, Comparadores.",
                tese: "Circuitos sem memória (saída depende apenas da entrada).",
                projeto: "Construir um somador de 4 bits com Full-Adders.",
              },
              {
                nome: "Circuitos Sequenciais",
                slug: "arquitetura/fundamentos/circuitos-sequenciais",
                estudo: "Flip-Flops (SR, JK, D, T), Latches, Registradores, Deslocadores, Contadores.",
                tese: "Circuitos com memória (estado). Base da CPU.",
                projeto: "Simular um registrador de 8 bits com flip-flops D.",
              },
            ]
          ),
        ],
      },

      // ─── 2. ARQUITETURA DA CPU ───
      {
        id: "arc-cpu",
        title: "2. Arquitetura da CPU",
        topics: [
          T(
            "arc-cpu-1",
            "Fundamentos da CPU",
            [
              "Arquitetura von Neumann vs Harvard",
              "Estrutura da CPU (UC, ULA, Registradores)",
              "Ciclo de Instrução (Fetch, Decode, Execute, Write)",
              "Conjunto de Instruções (CISC vs RISC)",
              "Modos de Endereçamento (Imediato, Direto, Indireto, Registrador)",
              "Registradores Especiais (PC, SP, IR, PSW)",
            ],
            [
              {
                nome: "Arquitetura von Neumann e Harvard",
                slug: "arquitetura/cpu/von-neumann-harvard",
                estudo: "Modelos com programa e dados na mesma memória (von Neumann) ou separados (Harvard).",
                tese: "Base da maioria dos computadores modernos.",
                projeto: "Desenhar os diagramas de von Neumann e Harvard.",
              },
              {
                nome: "Estrutura da CPU",
                slug: "arquitetura/cpu/estrutura-cpu",
                estudo: "UC (Unidade de Controle), ULA (Unidade Lógico-Aritmética), Registradores.",
                tese: "Componentes internos do processador.",
                projeto: "Mapear os componentes de um processador simples.",
              },
              {
                nome: "Ciclo de Instrução",
                slug: "arquitetura/cpu/ciclo-instrucao",
                estudo: "Busca (Fetch), Decodificação (Decode), Execução (Execute), Escrita (Write).",
                tese: "Como a CPU executa programas.",
                projeto: "Simular ciclo de instrução para um conjunto simples.",
              },
              {
                nome: "CISC vs RISC",
                slug: "arquitetura/cpu/cisc-risc",
                estudo: "Complex Instruction Set vs Reduced Instruction Set. Diferenças e aplicações.",
                tese: "Interface entre software e hardware.",
                projeto: "Comparar instruções de x86 (CISC) e ARM (RISC).",
              },
              {
                nome: "Modos de Endereçamento",
                slug: "arquitetura/cpu/modos-enderecamento",
                estudo: "Imediato, Direto, Indireto, Registrador, Indexado, Relativo.",
                tese: "Como a CPU acessa operandos na memória.",
                projeto: "Identificar modos de endereçamento em código Assembly.",
              },
              {
                nome: "Registradores Especiais",
                slug: "arquitetura/cpu/registradores-especiais",
                estudo: "PC (Program Counter), SP (Stack Pointer), IR (Instruction Register), PSW (Program Status Word).",
                tese: "Controle do fluxo de execução.",
                projeto: "Simular estado dos registradores durante um programa.",
              },
            ]
          ),
          T(
            "arc-cpu-2",
            "CPU vs GPU",
            [
              "Diferenças Arquiteturais (CPU vs GPU)",
              "SIMD vs SIMT",
              "Quando usar CPU ou GPU",
            ],
            [
              {
                nome: "CPU vs GPU",
                slug: "arquitetura/cpu/cpu-vs-gpu",
                estudo: "Diferenças arquiteturais. SIMD vs SIMT. Latência vs Throughput.",
                tese: "Escolha entre CPU e GPU para diferentes cargas de trabalho.",
                projeto: "Comparar performance CPU vs GPU em um problema.",
              },
            ]
          ),
        ],
      },

      // ─── 3. PIPELINE E PARALELISMO ───
      {
        id: "arc-pipeline",
        title: "3. Pipeline e Paralelismo",
        topics: [
          T(
            "arc-pipeline-1",
            "Pipeline Clássico",
            [
              "Pipeline de 5 Estágios (IF, ID, EX, MEM, WB)",
              "Throughput vs Latência",
              "Hazards (Estruturais, de Dados, de Controle)",
              "Resolução de Hazards (Forwarding, Stalling, Branch Prediction)",
            ],
            [
              {
                nome: "Pipeline Clássico",
                slug: "arquitetura/pipeline/classico",
                estudo: "5 estágios: IF, ID, EX, MEM, WB. Throughput vs Latência.",
                tese: "Aumento de throughput da CPU com paralelismo de instruções.",
                projeto: "Desenhar pipeline de 5 estágios com registradores de pipeline.",
              },
              {
                nome: "Hazards em Pipeline",
                slug: "arquitetura/pipeline/hazards",
                estudo: "Estruturais, de Dados (RAW, WAR, WAW) e de Controle (Branch).",
                tese: "Desafios que impedem o pipeline de operar a 100%.",
                projeto: "Identificar hazards em código Assembly MIPS.",
              },
              {
                nome: "Resolução de Hazards",
                slug: "arquitetura/pipeline/resolucao-hazards",
                estudo: "Forwarding (Bypass), Stalling (Bolha), Branch Prediction, Delayed Branch.",
                tese: "Técnicas para manter pipeline ocupado e eficiente.",
                projeto: "Simular forwarding em um pipeline de 5 estágios.",
              },
            ]
          ),
          T(
            "arc-pipeline-2",
            "Paralelismo Moderno",
            [
              "Superescalar (Múltiplas Instruções por Ciclo)",
              "Execução Fora de Ordem (Out-of-Order - Tomasulo, ROB)",
              "Especulação e Branch Prediction Avançado",
              "Multicore e Manycore",
              "Cache Coherence (MESI, MOESI)",
              "Hyper-Threading (SMT)",
              "Arquitetura NUMA",
            ],
            [
              {
                nome: "Superescalar",
                slug: "arquitetura/pipeline/superescalar",
                estudo: "Múltiplas unidades funcionais. Emissão de várias instruções por ciclo.",
                tese: "Paralelismo em nível de instrução (ILP).",
                projeto: "Analisar pipeline de um processador superescalar (ex: Intel Core).",
              },
              {
                nome: "Execução Fora de Ordem (OoO)",
                slug: "arquitetura/pipeline/out-of-order",
                estudo: "Algoritmo de Tomasulo, Reorder Buffer (ROB), Execução Especulativa.",
                tese: "Maximização do uso das unidades funcionais.",
                projeto: "Simular execução OoO com instruções dependentes.",
              },
              {
                nome: "Multicore, NUMA e Hyper-Threading",
                slug: "arquitetura/pipeline/multicore-numa",
                estudo: "Múltiplos núcleos. Cache Coherence (MESI). NUMA. SMT.",
                tese: "Paralelismo em nível de thread (TLP). Escalabilidade.",
                projeto: "Analisar coerência de cache com protocolo MESI.",
              },
            ]
          ),
        ],
      },

      // ─── 4. HIERARQUIA DE MEMÓRIA ───
      {
        id: "arc-memoria",
        title: "4. Hierarquia de Memória",
        topics: [
          T(
            "arc-memoria-1",
            "Fundamentos de Memória",
            [
              "Hierarquia de Memória (Registradores → Cache → RAM → Disco)",
              "SRAM vs DRAM",
              "Memórias ROM, EPROM, EEPROM, Flash",
              "Endereçamento de Memória",
            ],
            [
              {
                nome: "Hierarquia de Memória",
                slug: "arquitetura/memoria/hierarquia",
                estudo: "Registradores → Cache L1/L2/L3 → RAM → Disco (SSD/HD). Custos e velocidades.",
                tese: "Compromisso entre velocidade, capacidade e custo.",
                projeto: "Construir gráfico de latências da hierarquia.",
              },
              {
                nome: "SRAM vs DRAM",
                slug: "arquitetura/memoria/sram-dram",
                estudo: "Diferenças entre SRAM (cache) e DRAM (memória principal). Organização interna.",
                tese: "Memória volátil para dados e programas em execução.",
                projeto: "Calcular capacidade de memória com largura de barramento.",
              },
              {
                nome: "Memórias ROM, EPROM, EEPROM, Flash",
                slug: "arquitetura/memoria/rom-eprom-flash",
                estudo: "ROM, PROM, EPROM, EEPROM, Flash. Memória não volátil para firmware.",
                tese: "Armazenamento persistente do sistema básico.",
                projeto: "Pesquisar BIOS e UEFI.",
              },
            ]
          ),
          T(
            "arc-memoria-2",
            "Memória Cache",
            [
              "Funcionamento da Cache (Blocos, Tags, Hit/Miss)",
              "Mapeamento da Cache (Direto, Associativo, Conjunto Associativo)",
              "Políticas de Substituição (LRU, FIFO, Aleatório, NRU)",
              "Políticas de Escrita (Write-Through, Write-Back, Write-Allocate)",
            ],
            [
              {
                nome: "Funcionamento e Mapeamento da Cache",
                slug: "arquitetura/cache/funcionamento-mapeamento",
                estudo: "Blocos, Tags, Hit/Miss. Mapeamento Direto, Associativo, n-way.",
                tese: "Redução da latência de acesso à memória principal.",
                projeto: "Mapear endereços de memória para diferentes tipos de cache.",
              },
              {
                nome: "Políticas de Substituição e Escrita",
                slug: "arquitetura/cache/politicas",
                estudo: "LRU, FIFO, Aleatório. Write-Through vs Write-Back.",
                tese: "Decisões de desempenho e consistência.",
                projeto: "Simular LRU para uma cache de 4 blocos.",
              },
            ]
          ),
          T(
            "arc-memoria-3",
            "Memória Virtual e I/O",
            [
              "Paginação e Segmentação",
              "TLB (Translation Lookaside Buffer)",
              "Page Faults e Swap",
              "Barramentos (Dados, Endereços, Controle)",
              "Entrada/Saída (Portas, Interrupções, Polling, DMA)",
            ],
            [
              {
                nome: "Memória Virtual",
                slug: "arquitetura/memoria-virtual/paginacao",
                estudo: "Paginação, Segmentação, TLB (Translation Lookaside Buffer), Page Faults.",
                tese: "Ilusão de memória infinita para processos. Isolamento.",
                projeto: "Simular tradução de endereços virtuais para físicos.",
              },
              {
                nome: "Barramentos e Entrada/Saída",
                slug: "arquitetura/io/barramentos",
                estudo: "Barramento de Dados, Endereços e Controle. Portas, Interrupções, Polling, DMA.",
                tese: "Comunicação entre CPU, memória e periféricos.",
                projeto: "Calcular taxa de transferência de um barramento.",
              },
            ]
          ),
        ],
      },

      // ─── 5. SISTEMA OPERACIONAL - NÚCLEO ───
      {
        id: "arc-so-nucleo",
        title: "5. Sistema Operacional - Núcleo",
        topics: [
          T(
            "arc-so-1",
            "Kernel e Modos de CPU",
            [
              "O que é o Kernel? (Monolítico vs Microkernel)",
              "System Calls",
              "Modos de CPU (Ring 0/1/2/3, Kernel/Usuário)",
              "Memória Protegida",
            ],
            [
              {
                nome: "Kernel e System Calls",
                slug: "arquitetura/so/kernel",
                estudo: "Funções do kernel. Monolítico vs Microkernel. System calls.",
                tese: "Núcleo do sistema operacional.",
                projeto: "Mapear chamadas de sistema no Linux.",
              },
              {
                nome: "Modos de CPU e Proteção",
                slug: "arquitetura/so/modos-cpu",
                estudo: "Ring 0/1/2/3, Modo Kernel/Usuário, Memória Protegida.",
                tese: "Como o SO protege o sistema e isola processos.",
                projeto: "Analisar como o SO protege a memória de processos.",
              },
            ]
          ),
          T(
            "arc-so-2",
            "Gerenciamento de Processos",
            [
              "Processos e Threads (PCB, Estados, Context Switch)",
              "Escalonamento (FCFS, SJF, Round Robin, Prioridade, Multinível)",
            ],
            [
              {
                nome: "Processos e Threads",
                slug: "arquitetura/so/processos-threads",
                estudo: "PCB, Estados de processo, Context Switch.",
                tese: "Como o SO gerencia a execução de programas.",
                projeto: "Simular estados de um processo.",
              },
              {
                nome: "Escalonamento (Scheduling)",
                slug: "arquitetura/so/escalonamento",
                estudo: "FCFS, SJF, Round Robin, Prioridade, Multinível.",
                tese: "Como o SO decide qual processo executar.",
                projeto: "Simular diferentes algoritmos de escalonamento.",
              },
            ]
          ),
          T(
            "arc-so-3",
            "Gerenciamento de Memória no SO",
            [
              "Alocação Contígua",
              "Paginação e Segmentação",
              "Swapping",
              "Page Replacement (FIFO, LRU, Second Chance)",
            ],
            [
              {
                nome: "Gerenciamento de Memória no SO",
                slug: "arquitetura/so/gerenciamento-memoria",
                estudo: "Alocação contígua, paginação, segmentação, swapping.",
                tese: "Como o SO gerencia a memória física.",
                projeto: "Simular um gerenciador de memória simples.",
              },
              {
                nome: "Page Replacement",
                slug: "arquitetura/so/page-replacement",
                estudo: "FIFO, LRU, Second Chance, Ótimo.",
                tese: "Otimização da memória virtual.",
                projeto: "Simular diferentes algoritmos de substituição de página.",
              },
            ]
          ),
        ],
      },

      // ─── 6. SISTEMA OPERACIONAL - SISTEMAS DE ARQUIVOS ───
      {
        id: "arc-so-arquivos",
        title: "6. Sistemas de Arquivos",
        topics: [
          T(
            "arc-so-4",
            "Fundamentos de Sistemas de Arquivos",
            [
              "O que é um Sistema de Arquivos? (Inodes, Blocos, Metadados)",
              "Sistemas de Arquivos Modernos (NTFS, ext4, APFS, FAT32, ZFS)",
              "Operações com Arquivos e Diretórios",
              "Permissões (chmod, chown, ACLs)",
              "Mount e Unmount",
            ],
            [
              {
                nome: "Fundamentos de Sistemas de Arquivos",
                slug: "arquitetura/so/sistemas-arquivos",
                estudo: "Estrutura de diretórios, inodes, blocos, metadados.",
                tese: "Organização persistente de dados.",
                projeto: "Analisar estrutura de um sistema de arquivos Linux.",
              },
              {
                nome: "Sistemas de Arquivos Modernos",
                slug: "arquitetura/so/sistemas-arquivos-modernos",
                estudo: "NTFS, ext4, APFS, FAT32, ZFS. Características e diferenças.",
                tese: "Escolha do sistema de arquivos para diferentes casos.",
                projeto: "Comparar sistemas de arquivos (performance, segurança).",
              },
              {
                nome: "Operações e Permissões",
                slug: "arquitetura/so/operacoes-arquivos",
                estudo: "Criação, leitura, escrita, permissões, mount, unmount.",
                tese: "Como o SO manipula arquivos e diretórios.",
                projeto: "Simular operações básicas de um sistema de arquivos.",
              },
            ]
          ),
          T(
            "arc-so-5",
            "Casos Especiais",
            [
              "NTFS ADS (Alternate Data Streams)",
              "Ponto de Montagem no Linux",
              "Performance em Sistemas de Arquivos (Fragmentação, Journaling, TRIM)",
            ],
            [
              {
                nome: "NTFS ADS e Ponto de Montagem",
                slug: "arquitetura/so/ntfs-ads-mount",
                estudo: "Alternate Data Streams (NTFS), Ponto de montagem (Linux).",
                tese: "Funcionalidades avançadas e específicas.",
                projeto: "Criar e explorar ADS no Windows e mount no Linux.",
              },
              {
                nome: "Performance em Sistemas de Arquivos",
                slug: "arquitetura/so/performance-arquivos",
                estudo: "Fragmentação, journaling, caching, TRIM.",
                tese: "Otimização de I/O e performance.",
                projeto: "Analisar performance de diferentes sistemas de arquivos.",
              },
            ]
          ),
        ],
      },

      // ─── 7. INICIALIZAÇÃO E BOOT ───
      {
        id: "arc-boot",
        title: "7. Inicialização e Boot",
        topics: [
          T(
            "arc-boot-1",
            "BIOS, UEFI e Bootloader",
            [
              "POST (Power-On Self-Test)",
              "BIOS vs UEFI",
              "MBR vs GPT",
              "Bootloader (GRUB, Windows Boot Manager)",
              "Processo de Boot Completo",
            ],
            [
              {
                nome: "BIOS, UEFI e Bootloader",
                slug: "arquitetura/boot/bios-uefi",
                estudo: "POST, BIOS, UEFI, GRUB, MBR, GPT. Processo de boot.",
                tese: "Como o computador inicializa o sistema operacional.",
                projeto: "Analisar o processo de boot de um sistema Linux.",
              },
            ]
          ),
          T(
            "arc-boot-2",
            "Virtualização",
            [
              "VT-x e AMD-V",
              "Hypervisors (Tipo 1 - Bare Metal, Tipo 2 - Hospedado)",
              "Containers vs Virtual Machines",
            ],
            [
              {
                nome: "Virtualização",
                slug: "arquitetura/boot/virtualizacao",
                estudo: "VT-x, AMD-V, Hypervisors (Tipo 1 e 2), Containers vs VMs.",
                tese: "Virtualização em nível de hardware e sistema operacional.",
                projeto: "Configurar uma VM com VirtualBox e analisar modos de CPU.",
              },
            ]
          ),
        ],
      },

      // ─── 8. TÓPICOS AVANÇADOS (OPCIONAL) ───
      {
        id: "arc-avancados",
        title: "8. Tópicos Avançados (Opcional)",
        topics: [
          T(
            "arc-avancados-1",
            "Classificação e Aceleradores",
            [
              "Taxonomia de Flynn (SISD, SIMD, MISD, MIMD)",
              "NPU/TPU (Neural Processing Units, Tensor Processing Units)",
              "Systolic Arrays",
            ],
            [
              {
                nome: "Taxonomia de Flynn",
                slug: "arquitetura/avancados/flynn",
                estudo: "SISD, SIMD, MISD, MIMD. Classificação de arquiteturas.",
                tese: "Classificação de sistemas computacionais.",
                projeto: "Classificar diferentes sistemas (PC, GPU, Cluster).",
              },
              {
                nome: "NPU/TPU e Aceleradores de IA",
                slug: "arquitetura/avancados/npu-tpu",
                estudo: "Neural Processing Units, Tensor Processing Units, Systolic Arrays.",
                tese: "Hardware especializado para deep learning.",
                projeto: "Pesquisar arquitetura do TPU da Google.",
              },
            ]
          ),
          T(
            "arc-avancados-2",
            "Arquiteturas Especiais",
            [
              "Arquitetura de Baixo Consumo (ARM, RISC-V, IoT)",
              "Arquiteturas Seguras (TEE, Intel SGX, Arm TrustZone)",
            ],
            [
              {
                nome: "Arquitetura de Baixo Consumo",
                slug: "arquitetura/avancados/baixo-consumo",
                estudo: "ARM, RISC-V, IoT, Mobile. Eficiência energética (performance per watt).",
                tese: "Computação em dispositivos com bateria e restrições térmicas.",
                projeto: "Comparar consumo de energia ARM vs x86.",
              },
              {
                nome: "Arquiteturas Seguras",
                slug: "arquitetura/avancados/seguranca",
                estudo: "TEE (Trusted Execution Environment), Intel SGX, Arm TrustZone, Enclaves.",
                tese: "Segurança em nível de hardware contra ataques.",
                projeto: "Pesquisar vulnerabilidades como Spectre e Meltdown.",
              },
            ]
          ),
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // 9. ENGENHARIA DE SOFTWARE
  // ════════════════════════════════════════════════════════════════
  {
    id: "engenharia",
    title: "Engenharia de Software",
    icon: "⚙️",
    color: "#ec4899",
    sections: [
      // ─── 1. FUNDAMENTOS DA ENGENHARIA DE SOFTWARE ───
      {
        id: "eng-fundamentos",
        title: "1. Fundamentos da Engenharia de Software",
        topics: [
          T(
            "eng-fundamentos-1",
            "O que é Engenharia de Software?",
            [
              "Definição e Conceitos Fundamentais",
              "Diferença entre programação e engenharia de software",
              "Objetivos: qualidade, custo, prazo, produtividade",
              "Produto de software vs software customizado vs software embarcado",
            ],
            [
              {
                nome: "O que é Engenharia de Software?",
                slug: "eng/fundamentos/o-que-e",
                estudo: "Definição, objetivos, diferença entre programação e engenharia.",
                tese: "Base para engenharia de software.",
                projeto: "Identificar produtos de software.",
              },
            ]
          ),
          T(
            "eng-fundamentos-2",
            "História da Engenharia de Software",
            [
              "Crise do software (1960-1970)",
              "Conferência da OTAN (1968) — Nascimento da ES",
              "Evolução das metodologias e práticas",
            ],
            [
              {
                nome: "História da Engenharia de Software",
                slug: "eng/fundamentos/historia",
                estudo: "Crise do software, conferência da OTAN, evolução.",
                tese: "Contexto histórico.",
                projeto: "Criar linha do tempo da ES.",
              },
            ]
          ),
          T(
            "eng-fundamentos-3",
            "Profissão: Engenheiro de Software",
            [
              "Habilidades técnicas e comportamentais",
              "Código de ética (ACM/IEEE)",
              "Responsabilidades",
              "Carreira e áreas de atuação",
            ],
            [
              {
                nome: "Profissão: Engenheiro de Software",
                slug: "eng/fundamentos/profissao",
                estudo: "Habilidades, código de ética, carreira.",
                tese: "Atuação profissional.",
                projeto: "Pesquisar o código de ética ACM/IEEE.",
              },
            ]
          ),
        ],
      },
      // ─── 2. CICLO DE VIDA DO SOFTWARE ───
      {
        id: "eng-ciclo-vida",
        title: "2. Ciclo de Vida do Software",
        topics: [
          T(
            "eng-ciclo-vida-1",
            "O que é o Ciclo de Vida?",
            [
              "Definição",
              "Fases: planejamento, análise, design, implementação, teste, implantação, manutenção",
              "Stakeholders (partes interessadas)",
            ],
            [
              {
                nome: "O que é o Ciclo de Vida?",
                slug: "eng/ciclo-vida/o-que-e",
                estudo: "Definição, fases, stakeholders.",
                tese: "Estruturação de projetos.",
                projeto: "Mapear fases de um projeto.",
              },
            ]
          ),
          T(
            "eng-ciclo-vida-2",
            "Modelos de Ciclo de Vida",
            [
              "Modelo Cascata (Waterfall) — Fases sequenciais, vantagens e desvantagens",
              "Modelo em V (V-Model) — Cascata com validação e verificação",
              "Modelo Espiral (Spiral) — Iterativo e evolucionário, gerenciamento de riscos",
              "Modelo Incremental — Entregas parciais, feedback contínuo",
              "Modelo RAD (Rapid Application Development) — Desenvolvimento rápido, prototipação",
            ],
            [
              {
                nome: "Modelos de Ciclo de Vida",
                slug: "eng/ciclo-vida/modelos",
                estudo: "Cascata, V-Model, Espiral, Incremental, RAD.",
                tese: "Escolha do modelo.",
                projeto: "Comparar modelos de ciclo de vida.",
              },
            ]
          ),
          T(
            "eng-ciclo-vida-3",
            "Metodologias Ágeis vs Tradicionais",
            [
              "Ágil — Adaptativo, iterativo, colaborativo",
              "Tradicional — Preditivo, sequencial, planejado",
              "Comparação e quando usar cada um",
            ],
            [
              {
                nome: "Metodologias Ágeis vs Tradicionais",
                slug: "eng/ciclo-vida/agil-vs-tradicional",
                estudo: "Diferenças, vantagens, desvantagens.",
                tese: "Escolha da metodologia.",
                projeto: "Comparar Ágil e Tradicional.",
              },
            ]
          ),
        ],
      },
      // ─── 3. PROCESSOS DE SOFTWARE ───
      {
        id: "eng-processos",
        title: "3. Processos de Software",
        topics: [
          T(
            "eng-processos-1",
            "O que é um Processo de Software",
            [
              "Definição",
              "Atividades principais",
              "Importância da padronização",
            ],
            [
              {
                nome: "O que é um Processo de Software",
                slug: "eng/processos/o-que-e",
                estudo: "Definição, atividades, padronização.",
                tese: "Organização de projetos.",
                projeto: "Descrever um processo de software.",
              },
            ]
          ),
          T(
            "eng-processos-2",
            "Processos de Software",
            [
              "Processo em Cascata (Waterfall Process)",
              "Processo Unificado (RUP — Rational Unified Process) — Fases (Iniciação, Elaboração, Construção, Transição)",
              "Processo Open Source — Desenvolvimento colaborativo, comunidades (Linux, Apache)",
            ],
            [
              {
                nome: "Processos de Software",
                slug: "eng/processos/tipos",
                estudo: "Cascata, RUP, Open Source.",
                tese: "Tipos de processos.",
                projeto: "Comparar processos de software.",
              },
            ]
          ),
          T(
            "eng-processos-3",
            "Fases de um Processo de Software",
            [
              "Comunicação",
              "Planejamento",
              "Modelagem",
              "Construção",
              "Entrega/Implantação",
              "Manutenção",
            ],
            [
              {
                nome: "Fases de um Processo de Software",
                slug: "eng/processos/fases",
                estudo: "Comunicação, planejamento, modelagem, construção, entrega, manutenção.",
                tese: "Estruturação do processo.",
                projeto: "Mapear fases de um projeto.",
              },
            ]
          ),
        ],
      },
    ],
  },
]

export const totalTopics = parts.reduce(
  (s, p) => s + p.sections.reduce((x, sec) => x + sec.topics.length, 0),
  0
)