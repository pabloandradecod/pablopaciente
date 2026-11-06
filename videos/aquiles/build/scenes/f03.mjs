// F3 — Título TENDINOPATIA DE AQUILES + "o calcanhar de Aquiles"; Dr. Pablo sentado com o pé pra cima; Vértebra de jaleco
export default {
  speakers: { pablo: "f03p", vertebra: "f03v" },
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const k = {
      aqu: w(0, "Aquiles"), que: w(0, "que"), inv: w(0, "investiga"), exe: w(0, "exercícios"), tempo: w(0, "tempo"),
      med: w(0, "médico"), pac: w(0, "paciente"),
      v0: lines[1].start, v1: lines[1].end, senta: w(1, "Senta"),
    };
    const t1 = "TENDINOPATIA", t2 = "DE AQUILES";
    const letters = (s, off) => s.split("").map((c, i) => c === " " ? `<span class="c">&nbsp;</span>` : `<span class="c" id="f03-c${off + i}">${c}</span>`).join("");
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const icon = (i, label, svg, color) => `<div id="f03-ic${i}" class="abs" style="left:${100 + i * 215}px;top:580px;width:190px;text-align:center;opacity:0">
        <svg width="140" height="140" viewBox="-70 -70 140 140"><circle r="62" fill="${color}" ${st}/>${svg}</svg>
        <div class="label" style="font-size:28px;margin-top:4px">${label}</div></div>`;
    const coat = `<g id="f03-coat" opacity="0">
        <path d="M-84 -150 L-50 -150 L-44 -36 L-84 -36 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M84 -150 L50 -150 L44 -36 L84 -36 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
        <rect x="54" y="-132" width="24" height="16" rx="3" fill="none" stroke="${C.ink}" stroke-width="3"/>
        <path d="M-60 -150 Q-74 -80 -40 -50 M-40 -50 L-28 -50" fill="none" stroke="#3B3B3B" stroke-width="6" stroke-linecap="round"/>
        <circle cx="-22" cy="-50" r="11" fill="#9AA7AD" stroke="${C.ink}" stroke-width="4"/>
        <text x="66" y="-60" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="15" fill="${C.pain}">DRA.</text>
      </g>`;
    return {
      k,
      css: `
        #f03-title { left:90px; top:100px; font-size:120px; line-height:1.0; color:${C.ink}; white-space:nowrap; }
        #f03-title .c { display:inline-block; }
        #f03-title .l2 { color:${C.pain}; }
        #f03-sub { left:100px; top:370px; padding:12px 26px; font-size:46px; color:#fff; background:${C.ink}; border-radius:18px; transform: rotate(-2deg); }
        #f03-sub b { color:${C.sun}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <circle cx="1500" cy="560" r="340" fill="${C.wall}"/>
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f03-p-wrap">
        <rect x="1170" y="730" width="150" height="34" rx="10" fill="#B07A4A" ${st}/><path d="M1190 764 L1180 880 M1300 764 L1310 880" ${st}/>
        <rect x="1470" y="770" width="150" height="110" rx="34" fill="${C.pain}" ${st}/>
        <g transform="translate(1250,720) scale(1.2)">${human("f03p", "pablo")}
          <g id="f03-pain" opacity="0"><circle cx="196" cy="-10" r="22" fill="${C.pain}" opacity="0.4"/><circle cx="196" cy="-10" r="10" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
        </g>
      </g>
      <g id="f03-v-wrap"><g transform="translate(1760,880) scale(1.05)">${vertebra("f03v")}${coat}</g></g>
    </svg>
    <div id="f03-title" class="abs title"><div>${letters(t1, 0)}</div><div class="l2">${letters(t2, t1.length)}</div></div>
    <div id="f03-sub" class="abs title" style="opacity:0">o <b>calcanhar de Aquiles</b></div>
    ${icon(0, "O que é", `<rect x="-28" y="-36" width="56" height="72" rx="8" fill="#fff" ${st}/><path d="M-14 -16 L14 -16 M-14 0 L14 0 M-14 16 L6 16" ${st}/>`, C.sun)}
    ${icon(1, "Investigar", `<circle cx="-8" cy="-8" r="24" fill="#fff" ${st}/><path d="M10 10 L32 32" ${st} stroke-width="12"/>`, C.sky)}
    ${icon(2, "Exercícios", `<path d="M-38 0 L38 0" ${st} stroke-width="10"/><rect x="-44" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/><rect x="30" y="-24" width="14" height="48" rx="5" fill="${C.pain}" ${st}/>`, C.good)}
    ${icon(3, "Quanto tempo", `<circle r="34" fill="#fff" ${st}/><path d="M0 0 L0 -22 M0 0 L16 8" ${st}/>`, "#FFD3C9")}`,
      js: function (tl, K, R) {
        tl.fromTo("#f03-title .c", { y: -420 }, { y: 0, duration: 0.6, ease: "bounce.out", stagger: 0.035 }, 0);
        const p = "f03p";
        // sentado no banquinho, perna da frente esticada no pufe
        R.setPose(tl, p, 0, { torso: -4, hipF: -86, knF: 0, anF: 10, hipB: -80, knB: 84, shF: 10, elF: -30, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.5, K.dur);
        tl.fromTo("#f03-p-wrap", { x: 700 }, { x: 0, duration: 0.8, ease: "power2.out" }, 0.1);
        R.pop(tl, "#f03-sub", K.aqu - 0.1, 0.45);
        [K.que, K.inv, K.exe, K.tempo].forEach((t, i) => R.pop(tl, `#f03-ic${i}`, t - 0.1, 0.45));
        // médico vira paciente: ponto de dor no calcanhar e joinha
        tl.set("#f03-pain", { opacity: 1 }, K.med);
        tl.fromTo("#f03-pain circle", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 5 }, K.med);
        R.face(tl, p, K.med, { eyes: "pain", mouth: "flat" });
        R.pose(tl, p, K.pac, 0.35, { shF: -70, elF: -110 }, "back.out(2)");
        R.face(tl, p, K.pac + 0.2, { eyes: "happy", mouth: "grin" });
        // Vértebra de jaleco
        const v = "f03v";
        tl.fromTo("#f03-v-wrap", { y: 420 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.v0 - 0.7);
        R.face(tl, v, K.v0 - 0.7, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f03-coat", { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, K.v0 - 0.3);
        R.pose(tl, v, K.v0, 0.25, { armF: -150 }, "back.out(2)");
        R.face(tl, v, K.v0 + 0.2, { eyes: "happy", mouth: "grin" });
        R.pose(tl, v, K.senta - 0.1, 0.3, { armF: -60, armB: 60 });
        tl.to("#f03-v-wrap", { y: -40, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, K.senta);
        tl.to("#f03-title, #f03-sub, #f03-ic0, #f03-ic1, #f03-ic2, #f03-ic3", { opacity: 0, duration: 0.3, ease: "power2.in" }, K.dur - 0.35);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.4 },
        { name: "pop", t: k.aqu - 0.1, vol: 0.35 },
        ...[k.que, k.inv, k.exe, k.tempo].map((t) => ({ name: "pop", t: t - 0.05, vol: 0.3 })),
        { name: "glitch-1", t: k.med, vol: 0.25 },
        { name: "sparkle", t: k.pac, vol: 0.3 },
        { name: "whoosh-short", t: k.v0 - 0.7, vol: 0.4 },
        { name: "pop", t: k.v0 - 0.3, vol: 0.4 },
      ],
    };
  },
};
