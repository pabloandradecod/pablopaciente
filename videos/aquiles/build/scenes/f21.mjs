// F21 — Cuidado com o degrau: MEIO DO TENDÃO pode descer o calcanhar abaixo do degrau (✓); INSERÇÃO fica no chão, sem descer abaixo do nível (descer aperta o tendão contra o osso ✗); salto pequeno no calçado alivia no começo
export default {
  extra: 0.6,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      tipos: w(0, "tipos"), meio: w(0, "meio"), deg: w(0, "degrau"), desc: w(0, "descendo"), ins: w(0, "inserção"), chao: w(0, "chão"),
      niv: w(0, "nível"), aper: w(0, "aperta"), osso: w(0, "osso"), peq: w(0, "pequeno"), calc: w(0, "calçado"), ali: w(0, "aliviar"),
    };
    // perna em close (vista de lado, virada pra direita). Pivô = ponta do pé (tx, ty).
    const leg = (id, tx, ty, tendonGlowX, tendonGlowY) => `
      <g id="${id}-shin"><g transform="translate(${tx},${ty})">
        <path d="M-118 -50 L-112 -300 Q-150 -380 -120 -460 L-50 -460 Q-36 -380 -60 -300 L-64 -50 Z" fill="#E9B48C" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M-112 -300 Q-150 -380 -120 -460" fill="none" stroke="#C98A5E" stroke-width="5"/>
        <path id="${id}-tendon" d="M-116 -60 L-114 -280" stroke="#F2E8D8" stroke-width="16" stroke-linecap="round"/>
        <path d="M-116 -60 L-114 -280" stroke="${C.ink}" stroke-width="3" stroke-dasharray="10 8" opacity="0.4"/>
      </g></g>
      <g id="${id}-foot"><g transform="translate(${tx},${ty})">
        <path d="M-138 0 Q-146 -46 -104 -56 L-50 -56 Q20 -46 34 -4 Q36 0 30 0 Z" fill="#2B2B2B" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-128 -20 L20 -20" stroke="#fff" stroke-width="4" opacity="0.5"/>
      </g></g>
      <g id="${id}-glow" opacity="0"><circle cx="${tendonGlowX}" cy="${tendonGlowY}" r="34" fill="currentColor" opacity="0.35"/><circle cx="${tendonGlowX}" cy="${tendonGlowY}" r="15" fill="currentColor" stroke="#fff" stroke-width="5"/></g>`;
    const check = (id, x, y) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="46" fill="${C.good}" stroke="${C.ink}" stroke-width="7"/><path d="M${x - 20} ${y} L${x - 5} ${y + 16} L${x + 22} ${y - 16}" fill="none" stroke="${C.ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    const cross = (id, x, y) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="46" fill="#FF8A7A" stroke="${C.ink}" stroke-width="7"/><path d="M${x - 18} ${y - 18} L${x + 18} ${y + 18} M${x + 18} ${y - 18} L${x - 18} ${y + 18}" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/></g>`;
    // painel 1: degrau com borda em x=560; ponta do pé apoiada em (560-10, 760)
    // painel 2: degrau inicial com borda em x=1480; depois o degrau some e vira chão em y=860
    return {
      k,
      css: `
        #f21-head { left:0; right:0; top:40px; text-align:center; font-size:62px; }
        #f21-head span { color:${C.pain}; }
        #f21-l1 { left:150px; top:150px; width:640px; padding:12px; text-align:center; font-size:38px; }
        #f21-l2 { left:1090px; top:150px; width:640px; padding:12px; text-align:center; font-size:38px; }
        #f21-n1 { left:150px; top:875px; width:640px; text-align:center; font-size:30px; }
        #f21-n2 { left:1090px; top:875px; width:640px; text-align:center; font-size:30px; }
        #f21-press { left:1260px; top:300px; padding:10px 18px; font-size:28px; color:#D64534; }
        #f21-shoe { left:210px; top:400px; width:520px; padding:18px 22px; text-align:center; }
        #f21-shoe .t { font-size:30px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <rect x="120" y="130" width="700" height="880" rx="30" fill="#E3F6EF" stroke="${C.ink}" stroke-width="7"/>
      <rect x="1060" y="130" width="700" height="880" rx="30" fill="#FFE9E4" stroke="${C.ink}" stroke-width="7"/>
      <!-- painel 1 -->
      <rect x="130" y="860" width="680" height="140" fill="${C.floor}"/>
      <rect x="560" y="760" width="250" height="100" fill="#C99A62" stroke="${C.ink}" stroke-width="7"/>
      <g style="color:#1E9C72">${leg("f21a", 600, 760, 485, 590)}</g>
      ${check("f21-ok1", 260, 330)}
      <!-- painel 2 -->
      <rect x="1070" y="860" width="680" height="140" fill="${C.floor}"/>
      <g id="f21-step2"><rect x="1500" y="760" width="250" height="100" fill="#C99A62" stroke="${C.ink}" stroke-width="7"/></g>
      <g id="f21-leg2"><g style="color:${C.pain}">${leg("f21b", 1540, 760, 1424, 705)}</g></g>
      ${cross("f21-no2", 1200, 330)}
      ${check("f21-ok2", 1200, 330)}
    </svg>
    <div id="f21-head" class="abs title">Cuidado com o <span>degrau</span>!</div>
    <div id="f21-l1" class="abs card title" style="opacity:0">MEIO DO TENDÃO</div>
    <div id="f21-l2" class="abs card title" style="opacity:0">INSERÇÃO</div>
    <div id="f21-n1" class="abs label" style="opacity:0">pode descer o calcanhar <b style="color:#1E9C72">abaixo do degrau</b></div>
    <div id="f21-n2" class="abs label" style="opacity:0">no <b style="color:#1E9C72">chão</b>, sem descer abaixo do nível</div>
    <div id="f21-press" class="abs card label" style="opacity:0">aperta o tendão contra o osso!</div>
    <div id="f21-shoe" class="abs card" style="opacity:0">
      <svg width="300" height="120" viewBox="0 0 300 120"><path d="M20 90 Q14 40 60 34 L180 34 Q260 40 280 86 L280 96 L20 96 Z" fill="#3E7FD8" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><path id="f21-wedge" d="M30 92 L130 92 L30 70 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></svg>
      <div class="t label">um <b style="color:#1E9C72">saltinho</b> no calçado pode aliviar no começo</div>
    </div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f21-head", 0.05, 0.4, -30);
        // painel 1: meio do tendão — desce abaixo do degrau
        R.pop(tl, "#f21-l1", K.meio - 0.2, 0.4);
        R.fadeIn(tl, "#f21-n1", K.deg, 0.3);
        tl.set("#f21a-glow", { opacity: 1 }, K.meio);
        const dropA = (t) => {
          tl.to("#f21a-foot", { rotation: -18, svgOrigin: "600 760", duration: 0.7, ease: "sine.inOut", overwrite: "auto" }, t);
          tl.to("#f21a-shin", { y: 30, duration: 0.7, ease: "sine.inOut", overwrite: "auto" }, t);
          tl.to("#f21a-foot", { rotation: 14, svgOrigin: "600 760", duration: 0.8, ease: "sine.inOut", overwrite: "auto" }, t + 0.8);
          tl.to("#f21a-shin", { y: -26, duration: 0.8, ease: "sine.inOut", overwrite: "auto" }, t + 0.8);
        };
        dropA(K.desc - 0.3);
        dropA(K.desc + 1.4);
        tl.to("#f21a-foot", { rotation: 0, svgOrigin: "600 760", duration: 0.5, overwrite: "auto" }, K.desc + 3.1);
        tl.to("#f21a-shin", { y: 0, duration: 0.5, overwrite: "auto" }, K.desc + 3.1);
        R.pop(tl, "#f21-ok1", K.desc + 0.4, 0.4);
        // painel 2: inserção — no degrau, descer aperta
        R.pop(tl, "#f21-l2", K.ins - 0.2, 0.4);
        tl.to("#f21b-foot", { rotation: -18, svgOrigin: "1540 760", duration: 0.6, ease: "sine.inOut", overwrite: "auto" }, K.ins);
        tl.to("#f21b-shin", { y: 30, duration: 0.6, ease: "sine.inOut", overwrite: "auto" }, K.ins);
        tl.set("#f21b-glow", { opacity: 1, y: 30 }, K.ins + 0.5);
        tl.fromTo("#f21b-glow circle", { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.22, yoyo: true, repeat: 5 }, K.ins + 0.5);
        R.pop(tl, "#f21-no2", K.ins + 0.5, 0.4);
        R.pop(tl, "#f21-press", K.aper - 0.1, 0.35);
        // o degrau some: no chão
        tl.to("#f21b-foot", { rotation: 0, svgOrigin: "1540 760", duration: 0.4, overwrite: "auto" }, K.chao - 0.3);
        tl.to("#f21b-shin", { y: 0, duration: 0.4, overwrite: "auto" }, K.chao - 0.3);
        tl.to("#f21b-glow", { opacity: 0, duration: 0.2 }, K.chao - 0.3);
        tl.to("#f21-step2", { y: 160, opacity: 0, duration: 0.4, ease: "power2.in" }, K.chao - 0.1);
        tl.to("#f21-leg2", { y: 100, duration: 0.4, ease: "power2.in" }, K.chao - 0.1);
        R.fadeIn(tl, "#f21-n2", K.chao + 0.1, 0.3);
        // sobe e desce até o nível do chão
        for (let i = 0; i < 2; i++) {
          const t = K.chao + 0.5 + i * 1.5;
          tl.to("#f21b-foot", { rotation: 16, svgOrigin: "1540 760", duration: 0.65, ease: "sine.inOut", overwrite: "auto" }, t);
          tl.to("#f21b-shin", { y: -30, duration: 0.65, ease: "sine.inOut", overwrite: "auto" }, t);
          tl.to("#f21b-foot", { rotation: 0, svgOrigin: "1540 760", duration: 0.65, ease: "sine.inOut", overwrite: "auto" }, t + 0.75);
          tl.to("#f21b-shin", { y: 0, duration: 0.65, ease: "sine.inOut", overwrite: "auto" }, t + 0.75);
        }
        R.fadeOut(tl, "#f21-press", K.osso + 0.5, 0.2);
        tl.to("#f21-no2", { opacity: 0, duration: 0.2 }, K.osso + 0.6);
        R.pop(tl, "#f21-ok2", K.osso + 0.6, 0.4);
        // salto pequeno no calçado
        tl.to("#f21a-shin, #f21a-foot, #f21a-glow, #f21-ok1, #f21-n1", { opacity: 0.2, duration: 0.3 }, K.peq - 0.4);
        R.pop(tl, "#f21-shoe", K.peq - 0.3, 0.45, 0.6);
        tl.fromTo("#f21-wedge", { scale: 0, transformOrigin: "0% 100%" }, { scale: 1, duration: 0.35, ease: "back.out(2)" }, K.calc - 0.2);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "pop", t: k.meio - 0.2, vol: 0.35 },
        { name: "chime", t: k.desc + 0.4, vol: 0.3 },
        { name: "pop", t: k.ins - 0.2, vol: 0.35 },
        { name: "error", t: k.ins + 0.5, vol: 0.3 },
        { name: "whoosh-short", t: k.chao - 0.1, vol: 0.35 },
        { name: "chime", t: k.osso + 0.6, vol: 0.3 },
        { name: "pop", t: k.peq - 0.3, vol: 0.35 },
      ],
    };
  },
};
