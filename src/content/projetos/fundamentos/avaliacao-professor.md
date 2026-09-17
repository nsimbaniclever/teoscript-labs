---
id: avaliacao-professor
title: Avaliação de Professor
description: Sistema de análise estatística de notas de turma com decisão automática sobre manutenção, plano de melhoria ou demissão do professor.
status: concluido
tags:
  - Estatística
  - Análise de Dados
  - Flask
  - Plotly
tech:
  - Python
  - Flask
  - Pandas
  - NumPy
  - SciPy
  - Plotly
  - HTML/CSS/JS
linguagem: Python
progress: 100
link: https://teacher-evaluation-peach.vercel.app/analise.html
repo: https://github.com/nsimbancilever/teoscript-labs
---

## Sobre

Sistema completo de avaliação estatística de professores a partir das notas de uma turma. O professor carrega um ficheiro Excel com as notas dos alunos e recebe uma análise detalhada com mais de 10 medidas estatísticas, gráficos interativos e uma decisão automática fundamentada.

**Funcionalidades principais:**

- **Análise de tendência central:** média, mediana, moda (unimodal, bimodal ou multimodal)
- **Análise de dispersão:** amplitude, IQR, desvio padrão, coeficiente de variação
- **Análise de forma:** assimetria de Pearson e de Bowley, curtose
- **Deteção de outliers:** regra de Tukey (Q1 − 1,5×IQR e Q3 + 1,5×IQR)
- **Taxa de aprovação:** comparação com a meta definida
- **Índice de Desempenho (ID):** sistema de pontuação ponderada que gera uma decisão automática
- **Visualizações:** histograma e boxplot interativos (Plotly)
- **Configuração personalizável:** escala de notas (0-5, 0-10, 0-20, 0-100), metas da escola, tolerâncias à dispersão e à forma, limites de decisão
- **Interface moderna:** animações de fundo, símbolos flutuantes, modal de ajuda contextual e design responsivo

**Arquitetura:**

- **Backend (Flask):** processa o Excel com Pandas, calcula as medidas com NumPy/SciPy, aplica o sistema de pesos e devolve JSON
- **Frontend:** HTML/CSS/JS puro com `fetch` para o backend, localStorage para persistir configurações, Plotly para gráficos

## Código

```python
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
from scipy import stats
import json
import os

app = Flask(__name__)
CORS(app)

CONFIG_PADRAO = {
    "escala": 10,
    "mediaMin": 8.0,
    "medianaMin": 7.5,
    "taxaAprovacao": 80,
    "amplitudeMax": 6,
    "iqrMax": 4,
    "desvioMax": 2,
    "cvMax": 30,
    "assimetriaMax": 0.5,
    "curtoseMax": 1.0,
    "outliersMax": 2,
    "idManter": 0.5,
    "idPlano": 0.0,
    "idDemitir": -0.5,
}


@app.route("/avaliar", methods=["POST"])
def avaliar():
    if "ficheiro" not in request.files:
        return jsonify({"erro": "Nenhum ficheiro enviado"}), 400

    ficheiro = request.files["ficheiro"]
    config = json.loads(request.form.get("config", "{}"))
    escala = config.get("escala", 10)

    try:
        df = pd.read_excel(ficheiro)
    except Exception as e:
        return jsonify({"erro": f"Erro ao ler o Excel: {str(e)}"}), 400

    if "Nota" not in df.columns:
        return jsonify({"erro": "O Excel deve ter uma coluna 'Nota'"}), 400

    notas = df["Nota"].dropna().values
    n = len(notas)

    if n == 0:
        return jsonify({"erro": "Nenhuma nota válida encontrada"}), 400

    # Medidas de tendência central
    media = float(np.mean(notas))
    mediana = float(np.median(notas))

    # Medidas de dispersão
    q1 = float(np.percentile(notas, 25))
    q2 = float(np.percentile(notas, 50))
    q3 = float(np.percentile(notas, 75))
    iqr = q3 - q1
    desvio = float(np.std(notas, ddof=1))
    cv = (desvio / media) * 100 if media != 0 else 0

    # Assimetria e curtose
    assimetria = float(stats.skew(notas, bias=False))
    curtose = float(stats.kurtosis(notas, bias=False))

    # Assimetria de Bowley
    bowley = ((q3 - q2) - (q2 - q1)) / (q3 - q1) if (q3 - q1) != 0 else 0.0

    # Outliers (Tukey)
    limite_inf = q1 - 1.5 * iqr
    limite_sup = q3 + 1.5 * iqr
    outliers = notas[(notas < limite_inf) | (notas > limite_sup)].tolist()

    # Taxa de aprovação
    aprovados = int(np.sum(notas >= escala / 2))
    taxa_aprovacao = (aprovados / n) * 100

    # ... cálculo do ID, decisão, histograma, boxplot (ver app.py completo)

    return jsonify({
        "n": n,
        "escala": escala,
        "media": round(media, 2),
        "mediana": round(mediana, 2),
        "iqr": round(iqr, 2),
        "desvio": round(desvio, 2),
        "cv": round(cv, 2),
        "assimetria_pearson": round(assimetria, 2),
        "assimetria_bowley": round(bowley, 2),
        "curtose": round(curtose, 2),
        "outliers": outliers,
        "taxa_aprovacao": round(taxa_aprovacao, 2),
        "aprovados": aprovados,
    })
```