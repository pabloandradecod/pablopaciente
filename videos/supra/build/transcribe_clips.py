# Transcreve cada fala separadamente e monta build/transcript.json com os offsets do áudio concatenado.
import json, shutil, os, subprocess
os.chdir(os.path.dirname(os.path.abspath(__file__)))
v = json.load(open("voice.json"))
offs = []; t = 0
for m in v: offs.append(t); t += m["dur"] + 1
json.dump(offs, open("concat_offsets.json", "w"))
env = dict(os.environ, HYPERFRAMES_TRANSCRIBE_TIMEOUT_MS="600000")
out = []; n = 0
for i, m in enumerate(v):
    d = f"pc/c{i}"; os.makedirs(d, exist_ok=True)
    if not os.path.exists(f"{d}/transcript.json"):
        shutil.copy("../" + m["file"], f"{d}/a.wav")
        subprocess.run(["npx", "hyperframes", "transcribe", "a.wav", "--model", "small", "--language", "pt", "--json"], cwd=d, env=env, capture_output=True)
        os.remove(f"{d}/a.wav")
    try: tr = json.load(open(f"{d}/transcript.json"))
    except Exception: tr = []
    for w in tr:
        out.append({"text": w["text"], "start": round(w["start"] + offs[i], 3), "end": round(min(w["end"], m["dur"]) + offs[i], 3), "id": f"w{n}"}); n += 1
    print(i, m["who"], len(tr), flush=True)
json.dump(out, open("transcript.json", "w"), ensure_ascii=False, indent=1)
print("DONE")
