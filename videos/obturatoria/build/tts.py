import json, subprocess, os, sys, wave
sys.path.insert(0, os.path.dirname(__file__))
from lines import LINES, VOICES
try:
    from lines import PITCH
except ImportError:
    PITCH = {}
try:
    from lines import CHORUS
except ImportError:
    CHORUS = set()
root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
out = os.path.join(root, "assets", "voice"); os.makedirs(out, exist_ok=True)
env = dict(os.environ, HYPERFRAMES_PYTHON="/root/kvenv/bin/python")
meta = []
count = {}
for fr, who, text, say in LINES:
    count[fr] = count.get(fr, 0) + 1
    name = f"f{fr:02d}-{count[fr]}-{who}.wav"
    path = os.path.join(out, name)
    voice, speed = VOICES[who]
    if not os.path.exists(path):
        r = subprocess.run(["npx", "hyperframes", "tts", say or text, "-v", voice, "-l", "pt-br", "-s", str(speed), "-o", path, "--json"],
                           cwd=root, env=env, capture_output=True, text=True)
        if not os.path.exists(path): print(r.stdout[-400:], r.stderr[-400:]); sys.exit(1)
        if who in PITCH:
            f = PITCH[who]; tmp = path + ".tmp.wav"
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", path, "-af", f"asetrate=24000*{f},aresample=24000,atempo={1/f:.4f}", tmp], check=True)
            os.replace(tmp, path)
        if who in CHORUS:
            tmp = path + ".tmp.wav"
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", path, "-af", "chorus=0.6:0.9:45|60|75:0.5|0.4|0.35:0.3|0.4|0.25:2|2.3|1.7", tmp], check=True)
            os.replace(tmp, path)
    with wave.open(path) as w: dur = w.getnframes() / w.getframerate()
    meta.append({"frame": fr, "who": who, "text": text, "file": f"assets/voice/{name}", "dur": round(dur, 3)})
    print(name, round(dur, 2), flush=True)
json.dump(meta, open(os.path.join(root, "build", "voice.json"), "w"), ensure_ascii=False, indent=1)
print("total", round(sum(m["dur"] for m in meta), 1))
