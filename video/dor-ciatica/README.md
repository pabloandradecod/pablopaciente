# Vídeo: Dor Ciática com o Professor Pablo (cartoon, ~15 min)

Tudo gerado por código, sem custo de licença:
- **Narração**: Edge TTS, voz neural gratuita `pt-BR-AntonioNeural` (`narrar.py`).
- **Trilha e efeitos**: sintetizados em Python (`montar.py`), sem direitos autorais.
- **Animação**: cenas em SVG desenhadas em `render/` e capturadas quadro a quadro com Playwright.

## Como gerar

```bash
pip install edge-tts scipy numpy
python3 narrar.py        # narração + tempos de cada palavra
python3 montar.py        # linha do tempo + áudio mixado (build/audio.wav)
node render/render.cjs 0 21230 out/video_sem_audio.mp4   # ou em partes paralelas
ffmpeg -i out/video_sem_audio.mp4 -i build/audio.wav -c:v copy -c:a aac -b:a 192k -shortest out/dor-ciatica.mp4
```

- Texto e ordem das cenas: `roteiro.py`.
- Para revisar um instante: `node render/snap.cjs <pasta> <cena>:<fala>:<segundos>`.
