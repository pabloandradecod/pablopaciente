// Gera index.html + compositions/*.html a partir de build/scenes/fNN.mjs,
// da narração (build/voice.json) e da transcrição (build/transcript.json, opcional).
// Uso: node build/build.mjs [--only f02,f03]  (--only gera um index só com essas cenas, para testar)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as L from "./lib.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;

const voice = JSON.parse(fs.readFileSync(path.join(ROOT, "build/voice.json"), "utf8"));

// ---------- tempos de cada palavra ----------
const tokens = (s) => s.replace(/—/g, " ").split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
let tw = null;
const trPath = path.join(ROOT, "build/transcript.json");
if (fs.existsSync(trPath)) {
  const tr = JSON.parse(fs.readFileSync(trPath, "utf8"));
  const words = Array.isArray(tr) ? tr : tr.words || [];
  const offs = JSON.parse(fs.readFileSync(path.join(ROOT, "build/concat_offsets.json"), "utf8"));
  tw = voice.map((v, i) => words.filter((w) => w.start >= offs[i] - 0.05 && w.start < offs[i] + v.dur + 0.5)
    .map((w) => ({ start: Math.max(0, w.start - offs[i]), end: Math.min(v.dur, w.end - offs[i]) })));
}
voice.forEach((v, i) => {
  const toks = tokens(v.text);
  const t = tw && tw[i] && tw[i].length >= 2 ? tw[i] : null;
  if (t) {
    // mapeia por posição proporcional (o texto falado pode ter outra contagem de palavras)
    v.words = toks.map((text, k) => {
      const a = t[Math.min(t.length - 1, Math.floor((k * t.length) / toks.length))];
      const b = t[Math.min(t.length - 1, Math.floor(((k + 1) * t.length) / toks.length) - 1)] || a;
      return { text, start: a.start, end: Math.max(a.start + 0.08, b.end) };
    });
  } else {
    const total = toks.reduce((s, w) => s + w.length + 1, 0);
    let acc = 0;
    const speech = v.dur - 0.25;
    v.words = toks.map((text) => {
      const start = 0.1 + (acc / total) * speech;
      acc += text.length + 1;
      return { text, start, end: 0.1 + (acc / total) * speech };
    });
  }
});

// ---------- cenas ----------
const sceneFiles = fs.readdirSync(path.join(ROOT, "build/scenes")).filter((f) => /^f\d\d\.mjs$/.test(f)).sort();
const scenes = [];
for (const f of sceneFiles) {
  const mod = (await import(pathToFileURL(path.join(ROOT, "build/scenes", f)).href + "?t=" + Date.now())).default;
  scenes.push({ ...mod, id: f.replace(".mjs", "") });
}

const GAP = 0.4;
let clock = 0;
const hosts = [], audios = [], capWords = [];
const runtimeSrc = `const R = (${L.runtime.toString()})();`;

for (const s of scenes) {
  const n = parseInt(s.id.slice(1), 10);
  const vl = voice.filter((v) => v.frame === n);
  const lead = s.lead ?? (vl.length ? 0.6 : 0);
  const gaps = s.gaps || [];
  let t = lead;
  const lines = vl.map((v, i) => {
    if (i > 0) t += gaps[i - 1] ?? GAP;
    const line = { who: v.who, text: v.text, file: v.file, start: t, end: t + v.dur, dur: v.dur, words: v.words.map((w) => ({ ...w, start: w.start + t, end: w.end + t })) };
    t += v.dur;
    return line;
  });
  const dur = +(Math.max(s.minDur || 0, t + (s.tail ?? 0.8) + (s.extra || 0))).toFixed(2);
  const norm = (x) => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const ctx = {
    dur, lines, C: L.C, human: L.human, vertebra: L.vertebra, piriforme: L.piriforme, nervinho: L.nervinho, cintao: L.cintao, LILAC: L.LILAC, turao: L.turao, adutores: L.adutores, MINT: L.MINT, disquinho: L.disquinho, geleia: L.geleia, JELLY: L.JELLY, alarmildo: L.alarmildo, guardas: L.guardas, bursinha: L.bursinha, glutinho: L.glutinho, faixa: L.faixa, molao: L.molao, patelito: L.patelito, gordurinha: L.gordurinha, nerve: L.nerve, smooth: L.smooth, logo: L.logo,
    // w(linha, "palavra", ocorrência) → início da palavra (tempo local da cena)
    w(li, word, occ = 0) {
      const ws = lines[li].words;
      const hits = ws.filter((x) => norm(x.text).startsWith(norm(word)));
      if (!hits.length) throw new Error(`${s.id}: palavra "${word}" não achada na linha ${li}`);
      return +hits[Math.min(occ, hits.length - 1)].start.toFixed(3);
    },
    we(li, word, occ = 0) {
      const ws = lines[li].words;
      const hits = ws.filter((x) => norm(x.text).startsWith(norm(word)));
      return +hits[Math.min(occ, hits.length - 1)].end.toFixed(3);
    },
  };
  const out = s.build(ctx);
  const K = { dur, lines: lines.map((l) => ({ who: l.who, start: +l.start.toFixed(3), end: +l.end.toFixed(3) })), ...(out.k || {}) };
  const speakers = s.speakers || {};
  const autoTalk = Object.entries(speakers)
    .map(([who, id]) => `K.lines.filter(l=>l.who==="${who}").forEach(l=>R.talk(tl,"${id}",l.start,l.end${s.talkRest && s.talkRest[who] ? `,"${s.talkRest[who]}"` : ""}));`).join("\n");
  const html = `<template>
  <style>
    #root { position: absolute; inset: 0; overflow: hidden; background: ${out.bg || L.C.cream}; font-family: "Nunito", sans-serif; color: ${L.C.ink}; }
    #root svg { overflow: visible; }
    #root .abs { position: absolute; }
    #root .title { font-family: "Montserrat", sans-serif; font-weight: 900; letter-spacing: -0.01em; }
    #root .label { font-family: "Nunito", sans-serif; font-weight: 900; }
    #root .card { background: #fff; border: 7px solid ${L.C.ink}; border-radius: 28px; box-shadow: 10px 10px 0 ${L.C.ink}; }
    ${out.css || ""}
  </style>
  <div id="root" data-composition-id="${s.id}" data-width="1920" data-height="1080">
${out.html}
  </div>
  <script>
    (function () {
      ${runtimeSrc}
      const K = ${JSON.stringify(K)};
      const tl = gsap.timeline({ paused: true });
      (${out.js.toString()})(tl, K, R);
      ${autoTalk}
      tl.set({}, {}, K.dur);
      window.__timelines["${s.id}"] = tl;
    })();
  </script>
</template>
`;
  fs.writeFileSync(path.join(ROOT, "compositions", `${s.id}.html`), html);
  if (!only || only.includes(s.id)) {
    hosts.push({ id: s.id, start: clock, dur });
    lines.forEach((l, i) => {
      audios.push({ id: `vo-${s.id}-${i + 1}`, src: l.file, start: clock + l.start, dur: l.dur, vol: 1 });
      l.words.forEach((w) => capWords.push({ ...w, start: w.start + clock, end: w.end + clock, who: l.who, line: `${s.id}-${i}` }));
    });
    (out.sfx || []).forEach((x, i) => audios.push({ id: `sfx-${s.id}-${i + 1}`, src: `assets/sfx/${x.name}.mp3`, start: clock + x.t, vol: x.vol ?? 0.5, dur: x.dur }));
    clock += dur;
  }
}
const total = +clock.toFixed(2);

// ---------- legendas ----------
const groups = [];
let cur = null;
for (const w of capWords) {
  const prev = cur && cur.words[cur.words.length - 1];
  const brk = !cur || cur.line !== w.line || cur.words.length >= 4 || /[.!?…:;]$/.test(prev.text) || (/,$/.test(prev.text) && cur.words.length >= 2) || w.start - prev.end > 0.3;
  if (brk) { cur = { line: w.line, who: w.who, words: [] }; groups.push(cur); }
  cur.words.push(w);
}
groups.forEach((g, i) => {
  g.start = Math.max(0, g.words[0].start - 0.08);
  const next = groups[i + 1];
  g.end = Math.min(g.words[g.words.length - 1].end + 0.35, next ? next.words[0].start - 0.08 : total);
  if (g.end - g.start < 0.4) g.end = g.start + 0.4;
});
// nunca dois grupos na tela ao mesmo tempo
groups.forEach((g, i) => { const n = groups[i + 1]; if (n && n.start < g.end) { const m = (g.end + n.start) / 2; g.end = m; n.start = m; } });
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const whoColor = { pablo: "#FFFFFF", vertebra: "#FFE7A3", nervo: "#FFD54A", piriforme: "#FFB3AA", nervinho: "#D9C8FF", cintao: "#FFD27A", turao: "#A6F0D6", adutores: "#FFC2B5", disquinho: "#FFF1CF", geleia: "#B8ECFF", alarmildo: "#FFB3AA", guardas: "#FFD27A", cida: "#E7CCFF", bursinha: "#BFE8F7", glutinho: "#FFC2B5", faixa: "#C9D8EA", juninho: "#FFC79E", molao: "#F2E8D8", patelito: "#FFF1CF", ze: "#BFE0F5", gordurinha: "#FFE08A" };
const capHtml = groups.map((g, i) => `    <div id="cap-${i}" class="cap" data-who="${g.who}"><span class="cap-in" style="color:${whoColor[g.who]}">${g.words.map((w, k) => `<span id="cap-${i}-${k}" class="w">${esc(w.text)}</span>`).join(" ")}</span></div>`).join("\n");
const capJs = function (tl, G) {
  G.forEach((g, i) => {
    const el = `#cap-${i}`;
    tl.set(el, { opacity: 1, visibility: "visible" }, g.start);
    g.w.forEach((w, k) => tl.fromTo(`#cap-${i}-${k}`, { opacity: 0.55, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.12, ease: "back.out(2)" }, w));
    tl.to(el, { opacity: 0, duration: 0.1, ease: "power2.in" }, g.end - 0.1);
    tl.set(el, { opacity: 0, visibility: "hidden" }, g.end);
  });
};
const G = groups.map((g) => ({ start: +g.start.toFixed(3), end: +g.end.toFixed(3), w: g.words.map((w) => +w.start.toFixed(3)) }));
fs.writeFileSync(path.join(ROOT, "compositions", "captions.html"), `<template>
  <style>
    #root { position: absolute; inset: 0; pointer-events: none; }
    #root .cap { position: absolute; left: 0; right: 0; bottom: 70px; text-align: center; opacity: 0; visibility: hidden; overflow: visible; }
    #root .cap-in { display: inline-block; font-family: "Nunito", sans-serif; font-weight: 900; font-size: 58px; line-height: 1.1;
      padding: 10px 30px 14px; border-radius: 22px; background: rgba(1,62,76,0.88); }
    #root .w { display: inline-block; }
  </style>
  <div id="root" data-composition-id="captions" data-width="1920" data-height="1080">
${capHtml}
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      (${capJs.toString()})(tl, ${JSON.stringify(G)});
      tl.set({}, {}, ${total});
      window.__timelines["captions"] = tl;
    })();
  </script>
</template>
`);

// ---------- index ----------
const hostHtml = hosts.map((h, i) => `      <div id="${h.id}" data-composition-id="${h.id}" data-composition-src="compositions/${h.id}.html" data-start="${h.start.toFixed(3)}" data-duration="${h.dur}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:1"></div>`).join("\n");
// duração de cada efeito e faixas sem sobreposição
const sfxDur = {};
for (const f of fs.readdirSync(path.join(ROOT, "assets/sfx"))) {
  const { execSync } = await import("node:child_process");
  sfxDur[`assets/sfx/${f}`] = parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${path.join(ROOT, "assets/sfx", f)}"`).toString());
}
const laneEnd = [];
audios.sort((a, b) => a.start - b.start).forEach((a) => {
  if (a.id.startsWith("vo")) { a.track = 3; return; }
  a.dur = Math.min(a.dur || 99, sfxDur[a.src] || 1, total - a.start);
  let li = laneEnd.findIndex((e) => e <= a.start);
  if (li < 0) { li = laneEnd.length; laneEnd.push(0); }
  laneEnd[li] = a.start + a.dur + 0.01;
  a.track = 4 + li;
});
const audioHtml = audios.map((a, i) => `      <audio id="${a.id}" class="clip" src="${a.src}" data-start="${a.start.toFixed(3)}"${a.dur ? ` data-duration="${a.dur.toFixed(3)}"` : ""} data-track-index="${a.track}" data-volume="${a.vol}"></audio>`).join("\n");
fs.writeFileSync(path.join(ROOT, "index.html"), `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Síndrome do Trato Iliotibial — Dr. Pablo Andrade | Quiropraxia</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: ${L.C.cream}; }
      #bg { position: absolute; inset: 0; background: ${L.C.cream}; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${total}" data-width="1920" data-height="1080">
      <div id="bg"></div>
${hostHtml}
      <div id="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="${total}" data-track-index="2" data-track-kind="captions" data-width="1920" data-height="1080" style="z-index:5"></div>
${audioHtml}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`);
const fmt = (x) => `${Math.floor(x / 60)}:${String(Math.floor(x % 60)).padStart(2, "0")}`;
console.log(hosts.map((h) => `${h.id} ${fmt(h.start)} +${h.dur}s`).join("\n"));
console.log("TOTAL", total, fmt(total), "| legendas:", groups.length, "| transcrição:", tw ? "sim" : "não (estimativa)");
