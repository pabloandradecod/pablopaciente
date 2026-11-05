// F7 — Por que dói? Aperto + inflamação (a Geleia solta faíscas), dor desce pela perna, L4-L5 e L5-S1 piscando
export default {
  speakers: { nervo: "f07n" },
  build(ctx) {
    const { C, nerve, geleia, w, lines, JELLY } = ctx;
    const k = {
      doi: w(0, "dói"), dois: w(0, "Dois"), aperto: w(0, "aperto"), raiz: w(0, "raiz"), infl: w(0, "inflamação"), irrit: w(0, "irritante"),
      perna: w(0, "perna"), cia: w(0, "ciatalgia"), end: w(0, "endereços"), l45: w(0, "L4"), l5s1: w(0, "L5"),
      n0: lines[1].start, n1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const cx = 470, cy = 400;
    const nPts = [[230, 820], [285, 785], [335, 752], [385, 726], [430, 708], [470, 700]];
    // coluna de lado (direita): L3, L4, L5 e sacro
    const sx = 1390, bw = 190, bh = 92, dh = 34;
    let y = 190, spine = "";
    const names = ["L3", "L4", "L5"];
    names.forEach((n, i) => {
      spine += `<rect x="${sx}" y="${y}" width="${bw}" height="${bh}" rx="18" fill="${C.bone}" ${st}/><text x="${sx + bw / 2}" y="${y + bh / 2 + 12}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="34" fill="${C.ink}">${n}</text>`;
      y += bh;
      spine += `<rect id="f07-sd${i}" x="${sx + 8}" y="${y + 3}" width="${bw - 16}" height="${dh - 6}" rx="10" fill="${JELLY}" ${st}/>`;
      y += dh;
    });
    spine += `<path d="M${sx - 10} ${y} L${sx + bw + 20} ${y} L${sx + bw - 30} ${y + 130} L${sx + 40} ${y + 120} Z" fill="${C.bone}" ${st}/><text x="${sx + bw / 2}" y="${y + 70}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">S1</text>`;
    const d1y = 190 + 2 * (bh + dh) - dh + 3, d2y = 190 + 3 * (bh + dh) - dh + 3;
    const sparks = [[300, 610], [400, 600], [330, 690], [420, 640], [270, 660]].map(([x, y2], i) => `<path class="f07-spark" d="M${x} ${y2} l10 -16 l6 12 l12 -18" fill="none" stroke="${i % 2 ? C.pain : C.sun}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
    return {
      k,
      css: `
        #f07-t { left:110px; top:40px; font-size:56px; }
        #f07-t span { color:${C.pain}; }
        .f07-c { position:absolute; padding:12px 22px; font-size:34px; }
        #f07-addr { left:1300px; top:110px; font-size:34px; color:${C.pain}; }
        .f07-tag { position:absolute; padding:6px 14px; font-size:30px; color:#fff; background:${C.pain}; border:5px solid ${C.ink}; border-radius:14px; }
      `,
      html: `
    <div id="f07-t" class="abs title">Por que <span>dói?</span></div>
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- disco visto de cima (frente = em cima, costas = embaixo) -->
      <g id="f07-disc">
        <ellipse cx="${cx}" cy="${cy}" rx="250" ry="190" fill="#F3EAD3" stroke="${C.ink}" stroke-width="8"/>
        ${[200, 155, 110].map((r) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.76}" fill="none" stroke="#C9B48E" stroke-width="6"/>`).join("")}
        <ellipse cx="${cx}" cy="${cy}" rx="70" ry="52" fill="${JELLY}" ${st}/>
        <path d="M${cx - 30} ${cy + 40} Q${cx - 80} ${cy + 120} ${cx - 120} ${cy + 200}" fill="none" stroke="${JELLY}" stroke-width="22" stroke-linecap="round"/>
        <text x="${cx}" y="${cy - 210}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}" opacity="0.6">frente (barriga)</text>
        <ellipse cx="${cx}" cy="${cy + 300}" rx="96" ry="56" fill="#FCE7B0" stroke="${C.ink}" stroke-width="6"/>
        <text x="${cx}" y="${cy + 308}" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" opacity="0.7">canal</text>
      </g>
      <g id="f07-n-wrap">${nerve("f07n", nPts, 28, 0.85)}</g>
      <g id="f07-g-wrap"><g transform="translate(355,668) scale(0.62)">${geleia("f07g")}</g></g>
      <g id="f07-sparks" opacity="0">${sparks}</g>
      <g id="f07-press" opacity="0"><path d="M170 560 L250 640" stroke="${C.pain}" stroke-width="16" stroke-linecap="round"/><path d="M220 650 L262 652 L258 610" fill="none" stroke="${C.pain}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>
      <!-- coluna de lado -->
      <g id="f07-spine" opacity="0">${spine}</g>
      <g id="f07-leg" opacity="0"><g transform="translate(1000,560)">
        <rect x="-170" y="-40" width="340" height="300" rx="26" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
        <path d="M-40 -10 Q-60 80 -40 150 Q-34 200 -40 230 L30 230 Q20 200 26 150 Q40 80 30 -10 Z" fill="${C.skinB}" ${st}/>
        <path id="f07-bolt" d="M-6 0 L14 50 L-8 70 L16 130 L-6 150 L12 215" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="0" y="-56" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">lembra do ep. 1?</text>
      </g></g>
    </svg>
    <div id="f07-c1" class="f07-c card title" style="left:780px;top:170px;opacity:0">1. APERTO na raiz</div>
    <div id="f07-c2" class="f07-c card title" style="left:780px;top:290px;opacity:0;color:${C.pain}">2. INFLAMAÇÃO</div>
    <div id="f07-addr" class="abs title" style="opacity:0">ENDEREÇOS MAIS COMUNS</div>
    <div id="f07-tag1" class="f07-tag title" style="left:1600px;top:${d1y - 12}px;opacity:0">L4-L5</div>
    <div id="f07-tag2" class="f07-tag title" style="left:1600px;top:${d2y - 12}px;opacity:0">L5-S1</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-t", 0.1, 0.4);
        tl.fromTo("#f07-disc", { scale: 0.7, opacity: 0, svgOrigin: "470 400" }, { scale: 1, opacity: 1, svgOrigin: "470 400", duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        tl.fromTo("#f07-n-wrap", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0.4);
        tl.fromTo("#f07-g-wrap", { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(2)" }, 0.6);
        R.face(tl, "f07g", 0.6, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f07n", 0.4, { eyes: "normal", mouth: "flat" });
        // 1. aperto
        R.pop(tl, "#f07-c1", K.aperto - 0.1, 0.4);
        tl.set("#f07-press", { opacity: 1 }, K.aperto);
        tl.fromTo("#f07-press", { x: -40, y: -40 }, { x: 0, y: 0, duration: 0.3, ease: "power3.in", yoyo: true, repeat: 3 }, K.aperto);
        R.face(tl, "f07n", K.raiz, { eyes: "wide" });
        // 2. inflamação: faíscas
        R.pop(tl, "#f07-c2", K.infl - 0.1, 0.4);
        tl.to("#f07-press", { opacity: 0, duration: 0.2 }, K.infl);
        tl.set("#f07-sparks", { opacity: 1 }, K.infl);
        tl.fromTo(".f07-spark", { opacity: 0, scale: 0.4, svgOrigin: "355 640" }, { opacity: 1, scale: 1, svgOrigin: "355 640", duration: 0.18, stagger: 0.07, yoyo: true, repeat: 9, ease: "power1.inOut" }, K.infl);
        tl.to("#f07n-fill", { attr: { stroke: "#FF9B8C" }, duration: 0.4 }, K.irrit);
        R.face(tl, "f07n", K.irrit, { eyes: "pain", mouth: "frown" });
        R.pose(tl, "f07g", K.irrit, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        // dor desce pela perna (lembra o ep. 1)
        tl.set("#f07-leg", { opacity: 1 }, K.perna - 0.2);
        tl.fromTo("#f07-leg", { y: 60 }, { y: 0, duration: 0.4, ease: "back.out(2)" }, K.perna - 0.2);
        R.draw(tl, "#f07-bolt", K.perna, 0.5, "power1.in");
        R.shake(tl, "#f07-leg", K.cia, 0.3, 3);
        // endereços mais comuns
        R.fadeOut(tl, "#f07-c1, #f07-c2", K.end - 0.5);
        tl.to("#f07-leg", { opacity: 0, duration: 0.3 }, K.end - 0.5);
        tl.set("#f07-spine", { opacity: 1 }, K.end - 0.3);
        tl.fromTo("#f07-spine", { x: 300 }, { x: 0, duration: 0.5, ease: "power3.out" }, K.end - 0.3);
        R.rise(tl, "#f07-addr", K.end, 0.4);
        R.pop(tl, "#f07-tag1", K.l45 - 0.05, 0.35);
        tl.to("#f07-sd1", { attr: { fill: "#FF5A4E" }, duration: 0.2, yoyo: true, repeat: 7 }, K.l45);
        R.pop(tl, "#f07-tag2", K.l5s1 - 0.05, 0.35);
        tl.to("#f07-sd2", { attr: { fill: "#FF5A4E" }, duration: 0.2, yoyo: true, repeat: 7 }, K.l5s1);
        // nervo reclama
        R.shake(tl, "#f07n-face", K.n0, K.n1 - K.n0, 4);
        R.face(tl, "f07g", K.n0, { eyes: "closed", mouth: "grin" });
      },
      sfx: [
        { name: "pop", t: 0.6, vol: 0.35 },
        { name: "pop", t: k.aperto - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.aperto + 0.3, vol: 0.3 },
        { name: "pop", t: k.infl - 0.1, vol: 0.35 },
        { name: "glitch-1", t: k.infl, vol: 0.3 },
        { name: "whoosh-short", t: k.perna, vol: 0.35 },
        { name: "whoosh", t: k.end - 0.3, vol: 0.35 },
        { name: "ping", t: k.l45, vol: 0.35 },
        { name: "ping", t: k.l5s1, vol: 0.35 },
      ],
    };
  },
};
