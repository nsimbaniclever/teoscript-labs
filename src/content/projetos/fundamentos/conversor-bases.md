---
id: conversor-bases
title: Conversor de Bases Numéricas
description: Ferramenta interativa para converter números entre binário, octal, decimal e hexadecimal.
status: concluido
tags:
  - Python
  - CLI
  - Conversão
tech:
  - Python
linguagem: Python
progress: 100
link: https://conversor-bases.vercel.app
repo: https://github.com/teoscript/conversor-bases
---

## Sobre

O conversor de bases numéricas permite transformar números entre diferentes sistemas de numeração, essencial para entender como os computadores processam dados.

É uma ferramenta CLI simples mas poderosa, que serve como introdução à representação binária que os computadores usam internamente.

## Código

```python
def binario_para_decimal(binario):
    return int(binario, 2)

def decimal_para_binario(decimal):
    return bin(decimal)[2:]

# Exemplo de uso
print(binario_para_decimal('1010'))  # 10
print(decimal_para_binario(10))      # 1010
```

## Resultado

Números convertidos com sucesso entre binário, octal, decimal e hexadecimal.