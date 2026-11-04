# -*- coding: utf-8 -*-
"""Gera a narração de cada fala com Edge TTS (voz neural gratuita pt-BR)
e salva os tempos de cada palavra para legendas e sincronia labial."""
import asyncio, json, os, subprocess, sys, hashlib
import certifi

# o proxy do ambiente re-termina TLS; usa o bundle dele se existir
if os.path.exists("/root/.ccr/ca-bundle.crt"):
    certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts

from roteiro import SCENES

VOICE = os.environ.get("VOICE", "pt-BR-AntonioNeural")
RATE = os.environ.get("RATE", "+12%")
PITCH = os.environ.get("PITCH", "+2Hz")
OUT = os.path.join(os.path.dirname(__file__), "build", "voz")
os.makedirs(OUT, exist_ok=True)


async def tts(text, path):
    words = []
    c = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH,
                             boundary="WordBoundary",
                             proxy=os.environ.get("HTTPS_PROXY"))
    with open(path + ".mp3", "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"w": ch["text"], "t0": ch["offset"] / 1e7,
                              "t1": (ch["offset"] + ch["duration"]) / 1e7})
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", path + ".mp3",
                    "-ar", "44100", "-ac", "1", path + ".wav"], check=True)
    os.remove(path + ".mp3")
    with open(path + ".json", "w") as f:
        json.dump(words, f, ensure_ascii=False)


async def main():
    sem = asyncio.Semaphore(6)
    jobs = []
    for si, s in enumerate(SCENES):
        for bi, b in enumerate(s["beats"]):
            key = hashlib.md5(f"{VOICE}|{RATE}|{PITCH}|{b['text']}".encode()).hexdigest()[:10]
            path = os.path.join(OUT, f"{si:02d}_{bi:02d}_{key}")
            b["audio"] = path
            if os.path.exists(path + ".wav") and os.path.exists(path + ".json"):
                continue

            async def run(t=b["text"], p=path):
                async with sem:
                    for attempt in range(5):
                        try:
                            await tts(t, p)
                            print("ok", os.path.basename(p), flush=True)
                            return
                        except Exception as e:  # rede instável: tenta de novo
                            print("retry", attempt, e, file=sys.stderr)
                            await asyncio.sleep(2 ** attempt)
                    raise RuntimeError("TTS falhou: " + t)
            jobs.append(run())
    await asyncio.gather(*jobs)
    with open(os.path.join(os.path.dirname(__file__), "build", "falas.json"), "w") as f:
        json.dump(SCENES, f, ensure_ascii=False, indent=1)
    print("narração pronta:", sum(len(s["beats"]) for s in SCENES), "falas")

asyncio.run(main())
