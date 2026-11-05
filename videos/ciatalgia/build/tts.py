import json, subprocess, os, sys, wave
sys.path.insert(0, os.path.dirname(__file__))
from lines import LINES, VOICES
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
    with wave.open(path) as w: dur = w.getnframes() / w.getframerate()
    meta.append({"frame": fr, "who": who, "text": text, "file": f"assets/voice/{name}", "dur": round(dur, 3)})
    print(name, round(dur, 2), flush=True)
json.dump(meta, open(os.path.join(root, "build", "voice.json"), "w"), ensure_ascii=False, indent=1)
print("total", round(sum(m["dur"] for m in meta), 1))
