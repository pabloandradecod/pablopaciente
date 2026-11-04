# -*- coding: utf-8 -*-
"""Monta a linha do tempo do vídeo e mixa o áudio final:
narração + trilha musical original + efeitos sonoros (tudo sintetizado aqui).
Saídas: build/timeline.json e build/audio.wav"""
import json, os, wave
import numpy as np
from scipy.signal import butter, sosfilt

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(HERE, "build")
SR = 44100
FPS = 24
rng = np.random.default_rng(7)


def read_wav(path):
    with wave.open(path) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
    return x.astype(np.float32) / 32768.0


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def env(n, a=0.005, d=None):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4))
    if d:
        e *= np.exp(-t / d)
    return e


def T(sec):
    return np.arange(int(sec * SR)) / SR


# ------------------------------------------------------------------ efeitos
def sfx_whoosh():
    t = T(0.6); n = rng.standard_normal(len(t))
    out = np.zeros_like(t)
    for i, c in enumerate(np.linspace(300, 3000, 12)):
        s = slice(i * len(t) // 12, (i + 1) * len(t) // 12)
        out[s] = bp(n, c * 0.7, c * 1.3)[s]
    return out * np.sin(np.pi * t / t[-1]) ** 2 * 1.6

def sfx_pop():
    t = T(0.12); f = 500 + 1400 * t / t[-1]
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30) * 0.8

def sfx_ding():
    t = T(1.4)
    return sum(a * np.sin(2 * np.pi * f * t) for f, a in [(1318, .6), (2637, .25), (3951, .1)]) * np.exp(-t * 3.2) * env(len(t))

def sfx_zap():
    t = T(0.55)
    saw = 2 * ((t * 95 + 0.3 * np.sin(2 * np.pi * 31 * t)) % 1) - 1
    crack = rng.standard_normal(len(t)) * (rng.random(len(t)) > 0.97)
    x = lp(saw, 2500) * 0.6 + hp(crack, 2000) * 0.9
    return x * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 18 * t))) * np.exp(-t * 3) * env(len(t))

def sfx_boing():
    t = T(0.7); f = 180 + 120 * np.exp(-t * 5) * np.sin(2 * np.pi * 14 * t) + 60 * t
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 4) * 0.8

def sfx_stamp():
    t = T(0.35); f = 110 * np.exp(-t * 8) + 45
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10)
    click = lp(rng.standard_normal(len(t)), 3000) * np.exp(-t * 60)
    return (body * 1.1 + click * 0.8)

def sfx_squish():
    t = T(0.5); n = rng.standard_normal(len(t))
    f = 900 - 700 * t / t[-1] + 150 * np.sin(2 * np.pi * 9 * t)
    car = np.sin(2 * np.pi * np.cumsum(f) / SR)
    return (lp(n, 900) * 0.6 + car * 0.4) * np.sin(np.pi * t / t[-1]) * 0.9

def sfx_crack():
    t = T(0.4); x = np.zeros_like(t)
    for st in [0.0, 0.07, 0.15, 0.22]:
        i = int(st * SR); m = min(len(t) - i, 3000)
        x[i:i + m] += hp(rng.standard_normal(m), 1500) * np.exp(-np.arange(m) / SR * 80)
    return x * 0.8

def sfx_fire():
    t = T(1.0); n = lp(rng.standard_normal(len(t)), 1200) * 0.5
    pops = hp(rng.standard_normal(len(t)) * (rng.random(len(t)) > 0.995), 2500) * 1.5
    return (n + pops) * np.sin(np.pi * t / t[-1])

def sfx_siren():
    t = T(1.6); f = np.where((t * 2.5) % 1 < 0.5, 760, 990)
    f = lp(f.astype(float), 30, 1)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.3 * np.sin(4 * np.pi * np.cumsum(f) / SR)
    return x * 0.35 * np.minimum(1, t * 8) * np.minimum(1, (t[-1] - t) * 5)

def sfx_tada():
    out = np.zeros(int(1.8 * SR))
    for k, (f, st) in enumerate([(523, 0), (659, .09), (784, .18), (1046, .3)]):
        t = T(1.8 - st); saw = 2 * ((t * f) % 1) - 1 + 2 * ((t * f * 1.005) % 1) - 1
        i = int(st * SR)
        out[i:i + len(t)] += lp(saw, 2200) * np.exp(-t * (2.4 if k == 3 else 6)) * 0.22
    return out

def sfx_tick():
    out = np.zeros(int(1.3 * SR))
    for k in range(4):
        i = int(k * 0.3 * SR); t = T(0.05)
        out[i:i + len(t)] += np.sin(2 * np.pi * (2000 if k % 2 else 1500) * t) * np.exp(-t * 120) * 0.7
    return out

def sfx_buzzer():
    t = T(0.45); sq = np.sign(np.sin(2 * np.pi * 140 * t)) + 0.5 * np.sign(np.sin(2 * np.pi * 147 * t))
    return lp(sq, 1800) * 0.35 * np.minimum(1, (t[-1] - t) * 20)

def sfx_chomp():
    out = np.zeros(int(1.2 * SR))
    for k in range(6):
        t = T(0.16); f = 600 - 2400 * t if k % 2 else 250 + 2400 * t
        i = int(k * 0.18 * SR)
        out[i:i + len(t)] += np.sin(2 * np.pi * np.cumsum(np.abs(f)) / SR) * 0.4 * np.sin(np.pi * t / t[-1])
    return out

SFX = {k[4:]: v() for k, v in list(globals().items()) if k.startswith("sfx_")}


# ------------------------------------------------------------------ música
def pluck(freq, dur, bright=0.5):
    n = int(dur * SR); p = int(SR / freq)
    buf = rng.uniform(-1, 1, p); out = np.empty(n)
    for i in range(n):  # Karplus-Strong
        j = i % p
        out[i] = buf[j]
        buf[j] = 0.996 * (bright * buf[j] + (1 - bright) * buf[(j + 1) % p]) if True else 0
    return out * env(n, 0.002)

def note(m):
    return 440 * 2 ** ((m - 69) / 12)

def make_loop(bpm=108, drums=True):
    beat = 60 / bpm; bar = 4 * beat; n = int(4 * bar * SR)
    out = np.zeros(n + SR)
    chords = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]  # C Am F G
    arp = [0, 1, 2, 1, 0, 2, 1, 2]
    for b, ch in enumerate(chords):
        for k in range(8):
            m = ch[arp[k]] + 12 + (12 if k == 5 else 0)
            i = int((b * bar + k * beat / 2) * SR)
            s = pluck(note(m), 0.9, 0.55) * (0.26 if k % 2 == 0 else 0.18)
            out[i:i + len(s)] += s
        # baixo
        for k in [0, 2, 3]:
            t = T(beat * (1.4 if k == 0 else 0.9)); i = int((b * bar + k * beat) * SR)
            f = note(ch[0] - 24)
            s = (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 2.5) * env(len(t), 0.01) * 0.32
            out[i:i + len(s)] += s
        # pad suave
        t = T(bar)
        pad = sum(np.sin(2 * np.pi * note(m) * t) + np.sin(2 * np.pi * note(m) * 1.003 * t) for m in ch)
        i = int(b * bar * SR)
        out[i:i + len(t)] += pad * 0.025 * np.minimum(1, t * 3) * np.minimum(1, (t[-1] - t) * 3)
        if drums:
            for k in range(4):
                i = int((b * bar + k * beat) * SR)
                if k in (0, 2):
                    t = T(0.25); f = 50 + 90 * np.exp(-t * 30)
                    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) * 0.5
                else:
                    t = T(0.18); s = bp(rng.standard_normal(len(t)), 900, 5000) * np.exp(-t * 22) * 0.22
                out[i:i + len(s)] += s
            for k in range(8):  # shaker
                t = T(0.06); i = int((b * bar + k * beat / 2 + 0.01) * SR)
                s = hp(rng.standard_normal(len(t)), 6000) * np.exp(-t * 60) * (0.09 if k % 2 else 0.05)
                out[i:i + len(s)] += s
    # fecha o loop sem estalo: soma a cauda no começo
    out[:SR] += out[n:n + SR]
    return out[:n]


# ------------------------------------------------------------------ timeline
LEAD = {"chapter": 0.7, "title": 1.0, "coldopen": 0.6}
TAIL = {"chapter": 0.7, "title": 1.6, "outro": 5.0, "bigtext": 0.6, "exercise": 1.2}
GAP = 0.6


def main():
    scenes = json.load(open(os.path.join(BUILD, "falas.json")))
    cur = 0.3
    voice_clips, sfx_events, words_all = [], [], []
    for si, s in enumerate(scenes):
        s["start"] = cur
        cur += LEAD.get(s["type"], 0.3)
        for bi, b in enumerate(s["beats"]):
            ws = json.load(open(b["audio"] + ".json"))
            audio = read_wav(b["audio"] + ".wav")
            t0, t1 = ws[0]["t0"], ws[-1]["t1"]
            a0 = max(0, int((t0 - 0.03) * SR)); a1 = min(len(audio), int((t1 + 0.12) * SR))
            clip = audio[a0:a1]
            fade = min(len(clip), int(0.03 * SR)); clip[-fade:] *= np.linspace(1, 0, fade)
            b["start"] = cur
            b["end"] = cur + (t1 - t0)
            voice_clips.append((cur - 0.03, clip))
            for w in ws:
                words_all.append({"w": w["w"], "t0": round(cur + w["t0"] - t0, 3),
                                  "t1": round(cur + w["t1"] - t0, 3), "s": si, "b": bi})
            if b.get("sfx"):
                sfx_events.append((cur - (0.15 if b["sfx"] in ("whoosh",) else 0.02), b["sfx"]))
            gap = GAP
            if b.get("phase") == "ask":
                gap = 1.5
            cur = b["end"] + gap
            del b["audio"]
        cur += TAIL.get(s["type"], 0.35) - GAP
        s["end"] = cur
    total = cur + 0.2
    N = int(total * SR) + SR

    voice = np.zeros(N, np.float32)
    for st, clip in voice_clips:
        i = int(st * SR); voice[i:i + len(clip)] += clip
    voice = hp(voice, 70).astype(np.float32)
    voice /= np.max(np.abs(voice)) + 1e-9
    voice *= 0.82

    # envelope para a boca (por frame)
    nf = int(total * FPS) + 1
    hop = SR // FPS
    mouth = []
    for f in range(nf):
        seg = voice[f * hop: f * hop + hop]
        mouth.append(float(np.sqrt(np.mean(seg ** 2))) if len(seg) else 0.0)
    mouth = np.array(mouth)
    ref = np.percentile(mouth[mouth > 0.01], 92) if np.any(mouth > 0.01) else 1
    mouth = np.clip((mouth / ref - 0.06) / 0.94, 0, 1) ** 0.7

    # música com ducking
    loop = make_loop()
    calm = make_loop(drums=False)
    music = np.zeros(N, np.float32)
    gain = np.full(N, 0.55, np.float32)
    for s in scenes:
        i0, i1 = int(s["start"] * SR), int(s["end"] * SR)
        src = calm if s["type"] in ("alert",) else loop
        g = {"title": 1.0, "chapter": 0.95, "alert": 0.35, "outro": 0.9}.get(s["type"], 0.55)
        gain[i0:i1] = g
    reps = N // len(loop) + 1
    tiled = np.tile(loop, reps)[:N]
    tiled_calm = np.tile(calm, reps)[:N]
    alert_mask = np.zeros(N, np.float32)
    for s in scenes:
        if s["type"] == "alert":
            alert_mask[int(s["start"] * SR):int(s["end"] * SR)] = 1
    alert_mask = lp(alert_mask, 2, 1).astype(np.float32)
    music = tiled * (1 - alert_mask) + tiled_calm * alert_mask
    gain = lp(gain, 1.5, 1).astype(np.float32)
    duck = lp(np.abs(voice) > 0.02, 3, 1).astype(np.float32)
    duck = np.clip(duck * 3, 0, 1)
    music = music / (np.max(np.abs(music)) + 1e-9) * 0.30 * gain * (1 - 0.6 * duck)
    t = np.arange(N) / SR
    music *= np.clip(t / 1.5, 0, 1) * np.clip((total - t) / 3.0, 0, 1)

    fx = np.zeros(N, np.float32)
    for st, name in sfx_events:
        s = SFX[name]; s = s / (np.max(np.abs(s)) + 1e-9) * 0.42
        i = max(0, int(st * SR)); fx[i:i + len(s)] += s[:N - i]

    mix = voice + music + fx
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)
    mix = (mix / (np.max(np.abs(mix)) + 1e-9) * 0.93 * 32767).astype(np.int16)
    with wave.open(os.path.join(BUILD, "audio.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(mix.tobytes())

    # capítulos para a barra de progresso
    chapters = [{"n": s["params"]["n"], "title": s["params"]["title"], "t": s["start"]}
                for s in scenes if s["type"] == "chapter"]
    tl = {"fps": FPS, "duration": total, "scenes": scenes, "words": words_all,
          "mouth": [round(float(m), 3) for m in mouth], "chapters": chapters,
          "sfx": [{"t": round(t, 3), "n": n} for t, n in sfx_events]}
    with open(os.path.join(BUILD, "timeline.json"), "w") as f:
        json.dump(tl, f, ensure_ascii=False)
    with open(os.path.join(BUILD, "timeline.js"), "w") as f:
        f.write("window.TL=" + json.dumps(tl, ensure_ascii=False) + ";")
    print(f"duração: {total:.1f}s ({total/60:.2f} min), {len(scenes)} cenas, {nf} frames")


if __name__ == "__main__":
    main()
