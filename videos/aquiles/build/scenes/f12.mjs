// F12 — O exame: a Vértebra apalpa o tendão (ponto dolorido e mais grosso), teste da ponta do pé numa perna só (12 × 25) e saltinho
// Acessórios de detetive para a Vértebra (chapéu enorme e lupa na mão da frente)
const hatSvg = (id, C, op = 1) => `<g id="${id}-hat" opacity="${op}"><g transform="translate(-6,-72) scale(1.3)">
  <path d="M-64 -98 Q-60 -160 6 -162 Q72 -160 74 -98 Z" fill="#A0703C" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-30 -152 L-34 -100 M6 -162 L6 -98 M42 -154 L46 -100 M-58 -128 L70 -128" stroke="#6E4A24" stroke-width="5" opacity="0.7"/>
  <path d="M60 -104 Q100 -102 102 -86 Q82 -88 58 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-56 -104 Q-92 -100 -96 -86 Q-74 -88 -52 -92 Z" fill="#8A5E32" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="6" cy="-164" r="9" fill="#6E4A24" stroke="${C.ink}" stroke-width="5"/>
</g></g>`;
const lupaSvg = (id, C, op = 1) => `<g id="${id}-lupa" opacity="${op}"><g transform="translate(0,52)">
  <line x1="0" y1="0" x2="0" y2="40" stroke="${C.ink}" stroke-width="20" stroke-linecap="round"/>
  <line x1="0" y1="0" x2="0" y2="40" stroke="#7A4E2A" stroke-width="10" stroke-linecap="round"/>
  <circle cx="0" cy="72" r="32" fill="#D6F4FA" stroke="${C.ink}" stroke-width="9"/>
  <path d="M-14 58 Q-4 48 8 52" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
</g></g>`;
/** Vértebra detetive: chapéu dentro do corpo, lupa no braço da frente. */
function vDet(vertebra, id, C, { hat = 1, lupa = 1 } = {}) {
  let s = vertebra(id);
  s = s.replace(`<g id="${id}-armF">`, `<g id="${id}-armF">${lupaSvg(id, C, lupa)}`);
  const last = s.lastIndexOf("</g>");
  const bodyEnd = s.lastIndexOf("</g>", last - 1);
  return s.slice(0, bodyEnd) + hatSvg(id, C, hat) + s.slice(bodyEnd);
}

export default {
  speakers: { vertebra: "f12v" },
  tail: 1.2,
  build(ctx) {
    const { C, human, vertebra, w, lines } = ctx;
    const L1 = lines[1];
    const k = {
      apal: w(0, "apalpar"), dol: w(0, "dolorido"), gros: w(0, "grosso"), dep: w(0, "Depois"), ponta: w(0, "ponta"), comp: w(0, "comparando"),
      salt: w(0, "saltinho"), carga: w(0, "carga"), v0: L1.start, v1: L1.end, vin: w(1, "vinte"), anot: w(1, "anotado"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const N = 12;
    return {
      k,
      css: `
        #f12-title { left:110px; top:70px; font-size:66px; }
        #f12-title span { color:${C.pain}; }
        #f12-close { left:1060px; top:150px; width:760px; height:600px; padding:14px 18px; }
        #f12-close .h { font-size:34px; text-align:center; }
        #f12-ai { left:1130px; top:640px; padding:12px 28px; font-size:56px; color:${C.pain}; transform: rotate(-5deg); }
        #f12-cnt { left:1180px; top:170px; width:560px; padding:20px 24px; text-align:center; }
        #f12-cnt .h { font-size:34px; }
        #f12-cnt .big { position:relative; height:200px; }
        #f12-cnt .n { position:absolute; left:0; right:0; top:0; font-size:190px; line-height:200px; color:${C.ink}; opacity:0; }
        #f12-cmp { left:1180px; top:560px; width:560px; padding:18px 24px; }
        #f12-cmp .r { display:flex; align-items:center; gap:14px; font-size:30px; margin:8px 0; }
        #f12-cmp .r .l { width:170px; } #f12-cmp .bar { flex:1; height:30px; border:5px solid ${C.ink}; border-radius:16px; overflow:hidden; background:#fff; }
        #f12-cmp .fill { height:100%; width:100%; transform-origin:0 50%; }
        #f12-cmp .v { width:60px; text-align:right; }
        #f12-hop { left:1180px; top:170px; width:560px; padding:20px 24px; text-align:center; font-size:40px; }
        #f12-hop b { color:${C.pain}; }
        #f12-ok { left:1240px; top:420px; padding:12px 30px; font-size:52px; color:#fff; background:${C.good}; border:7px solid ${C.ink}; border-radius:20px; transform:rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f12-p-wrap"><g transform="translate(760,640) scale(1.25)">${human("f12p", "pablo")}
        <g id="f12-ppain" opacity="0"><circle cx="-6" cy="166" r="22" fill="${C.pain}" opacity="0.4"/><circle cx="-6" cy="166" r="10" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g>
      </g></g>
      <g id="f12-v-wrap"><g transform="translate(330,880) scale(1.15)">${vDet(vertebra, "f12v", C)}</g></g>
    </svg>
    <div id="f12-title" class="abs title" style="opacity:0">O EXAME <span>da detetive</span></div>
    <div id="f12-close" class="abs card" style="opacity:0">
      <div class="h title">Apalpar o tendão</div>
      <svg width="720" height="520" viewBox="0 0 720 520">
        <rect x="290" y="10" width="110" height="320" fill="${C.skinA}" stroke="${C.ink}" stroke-width="6"/>
        <path d="M290 320 Q240 340 244 420 L254 470 L660 470 Q680 430 640 410 L420 360 L400 320 Z" fill="${C.skinA}" ${st}/>
        <path d="M300 100 Q290 260 276 420" fill="none" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/>
        <path d="M300 100 Q290 260 276 420" fill="none" stroke="#F2E8D8" stroke-width="28" stroke-linecap="round"/>
        <path d="M296 130 L292 400 M306 130 L298 400" stroke="#D8CBB4" stroke-width="3"/>
        <g id="f12-bulge" opacity="0"><ellipse cx="290" cy="290" rx="30" ry="56" fill="#FFB3A0" stroke="${C.ink}" stroke-width="5"/></g>
        <g id="f12-pain" opacity="0"><circle cx="286" cy="290" r="44" fill="${C.pain}" opacity="0.35"/><circle cx="286" cy="290" r="16" fill="${C.pain}" stroke="#fff" stroke-width="5"/></g>
        <text x="80" y="160" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">tendão de</text><text x="80" y="194" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">Aquiles</text>
        <path d="M200 180 L268 200" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
        <text x="440" y="510" font-family="Nunito" font-weight="900" font-size="26" fill="${C.ink}">calcanhar ↙</text>
        <g id="f12-hand"><g id="f12-hand-in"><path d="M-10 0 L-200 30" ${st} stroke-width="30"/><path d="M-10 0 L-200 30" stroke="#fff" stroke-width="20" stroke-linecap="round"/><circle cx="0" cy="0" r="22" fill="#fff" ${st}/></g></g>
      </svg>
    </div>
    <div id="f12-ai" class="abs card title" style="opacity:0">É AÍ! E mais grosso!</div>
    <div id="f12-cnt" class="abs card" style="opacity:0">
      <div class="h title" style="font-size:30px">Ponta do pé numa perna só</div>
      <div class="big title">${Array.from({ length: N }, (_, i) => `<div id="f12-n${i + 1}" class="n">${i + 1}</div>`).join("")}</div>
    </div>
    <div id="f12-cmp" class="abs card" style="opacity:0">
      <div class="r label"><span class="l" style="color:${C.pain}">lado dolorido</span><div class="bar"><div id="f12-b0" class="fill" style="background:${C.pain}"></div></div><span class="v title">12</span></div>
      <div class="r label"><span class="l">outro lado</span><div class="bar"><div id="f12-b1" class="fill" style="background:${C.good}"></div></div><span class="v title">25</span></div>
    </div>
    <div id="f12-hop" class="abs card label" style="opacity:0">Saltinho numa perna:<br>quanto <b>mais carga</b>, mais o tendão reclama</div>
    <div id="f12-ok" class="abs title" style="opacity:0">ANOTADO ✓</div>`,
      js: function (tl, K, R) {
        const p = "f12p", v = "f12v";
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "flat" });
        R.blinks(tl, p, 0.3, K.dur);
        R.setPose(tl, v, 0, { armF: -60, armB: 20 });
        R.face(tl, v, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, v, 0.5, K.dur);
        R.rise(tl, "#f12-title", 0.1, 0.5);
        // palpação no close
        R.pop(tl, "#f12-close", Math.max(0.2, K.apal - 0.5), 0.45);
        R.pose(tl, v, K.apal - 0.3, 0.4, { armF: -120 }, "back.out(1.6)");
        tl.set("#f12-hand", { x: 286, y: 290 }, 0);
        tl.fromTo("#f12-hand-in", { x: -320 }, { x: 0, duration: 0.45, ease: "power2.out" }, K.apal);
        tl.to("#f12-hand-in", { x: 10, duration: 0.12, yoyo: true, repeat: 3 }, K.dol - 0.15);
        tl.set("#f12-pain", { opacity: 1 }, K.dol);
        tl.fromTo("#f12-pain circle", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 5 }, K.dol);
        tl.set("#f12-ppain", { opacity: 1 }, K.dol);
        R.face(tl, p, K.dol, { eyes: "pain", mouth: "scream" });
        tl.to("#f12-p-wrap", { y: -40, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, K.dol);
        tl.fromTo("#f12-bulge", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, K.gros - 0.1);
        R.pop(tl, "#f12-ai", K.gros, 0.35);
        R.face(tl, p, K.gros + 0.4, { eyes: "normal", mouth: "frown" });
        // teste da ponta do pé numa perna só
        R.fadeOut(tl, "#f12-close, #f12-ai", K.dep - 0.2, 0.25);
        R.pose(tl, v, K.dep, 0.4, { armF: -60 });
        R.pop(tl, "#f12-cnt", K.ponta - 0.3, 0.4);
        R.pose(tl, p, K.ponta - 0.3, 0.35, { hipB: 15, knB: 85, shF: -60, elF: -30, shB: 20, elB: -20 });
        const r0 = K.ponta + 0.1, per = Math.max(0.3, (K.salt - 0.5 - r0) / 12);
        for (let i = 0; i < 12; i++) {
          const t = r0 + i * per;
          R.pose(tl, p, t, per * 0.45, { anF: 28 }, "sine.inOut");
          tl.to("#f12-p-wrap", { y: -26, duration: per * 0.45, ease: "sine.inOut" }, t);
          R.pose(tl, p, t + per * 0.5, per * 0.45, { anF: 0 }, "sine.inOut");
          tl.to("#f12-p-wrap", { y: 0, duration: per * 0.45, ease: "sine.inOut" }, t + per * 0.5);
          tl.set(`#f12-n${i + 1}`, { opacity: 1 }, t + per * 0.4);
          if (i) tl.set(`#f12-n${i}`, { opacity: 0 }, t + per * 0.4);
        }
        R.face(tl, p, r0 + per * 8, { eyes: "pain", mouth: "frown" });
        tl.to("#f12-n12", { color: "#FF5A4E", duration: 0.2 }, r0 + per * 11.5);
        // compara com o outro lado
        R.pop(tl, "#f12-cmp", K.comp - 0.2, 0.4);
        tl.fromTo("#f12-b1", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, K.comp + 0.1);
        tl.fromTo("#f12-b0", { scaleX: 0 }, { scaleX: 0.48, duration: 0.6, ease: "power2.out" }, Math.min(K.comp + 0.8, r0 + per * 12));
        // saltinho
        R.fadeOut(tl, "#f12-cnt", K.salt - 0.3, 0.25);
        R.pop(tl, "#f12-hop", K.salt - 0.1, 0.4);
        for (let i = 0; i < 3; i++) {
          const t = K.salt + 0.2 + i * 0.55;
          tl.to("#f12-p-wrap", { y: -70, duration: 0.24, ease: "power2.out" }, t);
          tl.to("#f12-p-wrap", { y: 0, duration: 0.24, ease: "power2.in" }, t + 0.25);
        }
        tl.fromTo("#f12-ppain circle", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.4, duration: 0.2, yoyo: true, repeat: 5 }, K.salt + 0.7);
        R.face(tl, p, K.carga, { eyes: "pain", mouth: "scream" });
        R.pose(tl, p, K.v0 - 0.4, 0.4, { hipB: 0, knB: 0, shF: 10, elF: -20, shB: 10, elB: -10 });
        R.face(tl, p, K.v0, { eyes: "normal", mouth: "flat" });
        // Vértebra: "Doze de um lado, vinte e cinco do outro... anotado!"
        R.fadeOut(tl, "#f12-hop", K.v0 - 0.3, 0.25);
        tl.to("#f12-cmp", { y: -330, duration: 0.4, ease: "power2.inOut" }, K.v0 - 0.3);
        R.pose(tl, v, K.v0, 0.3, { armF: -140, armB: 30 }, "back.out(2)");
        R.face(tl, v, K.vin, { eyes: "wide" });
        tl.fromTo("#f12-ok", { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" }, K.anot);
        R.face(tl, v, K.anot + 0.2, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "click", t: k.dol - 0.15, vol: 0.5 },
        { name: "pop", t: k.gros, vol: 0.4 },
        { name: "pop", t: k.ponta - 0.3, vol: 0.35 },
        { name: "click-soft", t: k.comp - 0.2, vol: 0.4 },
        { name: "pop", t: k.salt - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.anot, vol: 0.4 },
      ],
    };
  },
};
