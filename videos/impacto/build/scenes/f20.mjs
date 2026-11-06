// F20 — Degrau 2: rotação externa com elástico — toalhinha embaixo do braço, cotovelo colado, gira o antebraço pra fora devagar; 3 x 10 a 15; Supra com mini halteres
export default {
  speakers: { supra: "f20s" },
  extra: 0.6,
  build(ctx) {
    const { C, human, supra, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), rot: w(0, "rotação"), ext: w(0, "externa"), ela: w(0, "elástico"), toa: w(0, "Toalhinha"), cot: w(0, "cotovelo"), col: w(0, "colado"),
      gira: w(0, "gira"), fora: w(0, "fora"), dev: w(0, "devagar"), forta: w(0, "fortalece"), mang: w(0, "manguito"),
      s0: lines[1].start, s1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const bell = (x, y) => `<g transform="translate(${x},${y})"><rect x="-22" y="-5" width="44" height="10" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-30" y="-14" width="12" height="28" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/><rect x="18" y="-14" width="12" height="28" rx="4" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g>`;
    return {
      k,
      css: `
        #f20-head { left:110px; top:60px; font-size:68px; }
        #f20-head span { color:#1E9C72; }
        #f20-top { left:1240px; top:170px; width:560px; padding:16px 20px; text-align:center; }
        #f20-top .t { font-size:26px; margin-top:4px; }
        #f20-dose { left:1290px; top:640px; padding:12px 26px; font-size:44px; }
        #f20-dose span { color:#1E9C72; }
        #f20-mang { left:110px; top:180px; padding:10px 22px; font-size:34px; }
        #f20-mang b { color:#1E9C72; }
        #f20-bal { left:880px; top:640px; padding:12px 20px; font-size:34px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <rect x="1120" y="300" width="40" height="560" fill="#B07A4A" stroke="${C.ink}" stroke-width="6"/><circle cx="1140" cy="520" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>
      <g id="f20-z-wrap"><g transform="translate(560,600) scale(1.3)">${human("f20z", "ze")}
        <rect id="f20-towel" x="-10" y="-112" width="28" height="44" rx="10" fill="#FF8A7A" stroke="${C.ink}" stroke-width="4" opacity="0"/>
        <path id="f20-band" d="M70 -70 Q260 -60 446 -62" fill="none" stroke="${C.good}" stroke-width="8" stroke-linecap="round" opacity="0"/>
      </g></g>
      <g id="f20-s-wrap" opacity="0"><g id="f20-s-bob"><g transform="translate(330,860) scale(0.6)">${supra("f20s")}${bell(-75, -240)}${bell(75, -240)}</g></g></g>
    </svg>
    <div id="f20-head" class="abs title">Degrau 2: <span>ROTAÇÃO EXTERNA</span></div>
    <div id="f20-top" class="abs card" style="opacity:0">
      <svg width="520" height="330" viewBox="-200 -230 520 330">
        <ellipse cx="0" cy="20" rx="100" ry="44" fill="${C.blue}" ${st}/>
        <circle cx="0" cy="14" r="38" fill="${C.skinB}" ${st}/>
        <path d="M-12 -18 L0 -36 L12 -18 Z" fill="${C.skinB}" ${st}/>
        <rect x="100" y="0" width="22" height="40" rx="8" fill="#FF8A7A" stroke="${C.ink}" stroke-width="4"/>
        <circle cx="96" cy="20" r="16" fill="${C.blue}" ${st}/>
        <circle cx="-140" cy="-140" r="12" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>
        <line id="f20-tband" x1="-140" y1="-140" x2="96" y2="-128" stroke="${C.good}" stroke-width="7" stroke-linecap="round"/>
        <g id="f20-fa"><line x1="96" y1="20" x2="96" y2="-110" stroke="${C.ink}" stroke-width="34" stroke-linecap="round"/><line x1="96" y1="20" x2="96" y2="-110" stroke="${C.skinB}" stroke-width="22" stroke-linecap="round"/><circle cx="96" cy="-118" r="18" fill="${C.skinB}" ${st}/></g>
        <path d="M150 -110 Q220 -60 230 10" fill="none" stroke="${C.pain}" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 10"/>
        <text x="-190" y="-200" font-family="Montserrat" font-weight="900" font-size="20" fill="${C.ink}">frente ↑</text>
      </svg>
      <div class="t label">visto de cima: gira o antebraço <b style="color:${C.pain}">pra fora</b>, devagar</div>
    </div>
    <div id="f20-dose" class="abs card title" style="opacity:0">3 x <span>10 a 15</span> · devagar</div>
    <div id="f20-mang" class="abs card label" style="opacity:0">fortalece o <b>manguito rotador</b></div>
    <div id="f20-bal" class="abs card title" style="opacity:0">Tô ficando forte!</div>`,
      js: function (tl, K, R) {
        const z = "f20z";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dur);
        R.pose(tl, z, K.rot - 0.2, 0.4, { shF: 0, elF: -90 }, "power2.out");
        tl.to("#f20-band", { opacity: 1, duration: 0.3 }, K.ela);
        R.pop(tl, "#f20-top", K.ela - 0.1, 0.45, 0.6);
        tl.to("#f20-towel", { opacity: 1, duration: 0.2 }, K.toa);
        tl.to("#f20-towel", { scale: 1.25, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, K.toa + 0.1);
        // gira pra fora devagar (visto de cima) — várias repetições
        const t0 = K.gira, reps = Math.max(2, Math.floor((K.s0 - t0 - 0.4) / 2.2));
        for (let i = 0; i < reps; i++) {
          const t = t0 + i * 2.2;
          tl.to("#f20-fa", { rotation: 70, svgOrigin: "96 20", duration: 1, ease: "sine.inOut" }, t);
          tl.to("#f20-tband", { attr: { x2: 96 + 128 * Math.sin(1.22), y2: 20 - 128 * Math.cos(1.22) }, duration: 1, ease: "sine.inOut" }, t);
          tl.to("#f20-fa", { rotation: 0, svgOrigin: "96 20", duration: 1, ease: "sine.inOut" }, t + 1.1);
          tl.to("#f20-tband", { attr: { x2: 96, y2: -128 }, duration: 1, ease: "sine.inOut" }, t + 1.1);
          tl.to("#f20-band", { attr: { d: "M70 -70 Q260 -40 446 -62" }, duration: 1, ease: "sine.inOut" }, t);
          tl.to("#f20-band", { attr: { d: "M70 -70 Q260 -60 446 -62" }, duration: 1, ease: "sine.inOut" }, t + 1.1);
        }
        R.face(tl, z, K.gira, { eyes: "normal", mouth: "flat" });
        R.pop(tl, "#f20-dose", K.dev - 0.2, 0.4);
        R.pop(tl, "#f20-mang", K.forta - 0.1, 0.4);
        R.face(tl, z, K.mang, { eyes: "happy", mouth: "smile" });
        // Supra com mini halteres
        R.setPose(tl, "f20s", 0, { armF: -150, armB: 150 });
        R.face(tl, "f20s", 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f20-s-wrap", { opacity: 1 }, K.s0 - 0.5);
        tl.fromTo("#f20-s-wrap", { y: 400 }, { y: 0, duration: 0.45, ease: "back.out(1.6)" }, K.s0 - 0.5);
        tl.to("#f20-s-bob", { y: -18, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.s0);
        R.pop(tl, "#f20-bal", K.s0 + 0.1, 0.35);
      },
      sfx: [
        { name: "pop", t: k.ela - 0.1, vol: 0.35 },
        { name: "pop", t: k.toa, vol: 0.3 },
        { name: "whoosh-short", t: k.gira, vol: 0.3 },
        { name: "pop", t: k.dev - 0.2, vol: 0.3 },
        { name: "chime", t: k.forta, vol: 0.3 },
        { name: "whoosh-short", t: k.s0 - 0.5, vol: 0.35 },
      ],
    };
  },
};
