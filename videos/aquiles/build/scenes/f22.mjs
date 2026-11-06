// F22 — Degrau 3: a mola volta — com força boa, saltinhos, pular corda baixinho e só então corrida leve; Aquiles comprime e solta como mola
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, aquiles, w } = ctx;
    const k = {
      deg: w(0, "Degrau"), forca: w(0, "força"), boa: w(0, "boa"), salt: w(0, "saltinhos"), pular: w(0, "pular"), corda: w(0, "corda"), baix: w(0, "baixinho"),
      entao: w(0, "então"), corr: w(0, "corrida"), leve: w(0, "leve"), aum: w(0, "aumentando"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const tree = (x) => `<g transform="translate(${x},0)"><rect x="-14" y="640" width="28" height="120" fill="#8B5A2B" ${st}/><circle cx="0" cy="610" r="70" fill="#5DB560" ${st}/></g>`;
    return {
      k,
      css: `
        #f22-head { left:110px; top:60px; font-size:68px; }
        #f22-head span { color:#1E9C72; }
        #f22-rule { left:110px; top:170px; width:560px; padding:14px 20px; font-size:28px; line-height:1.2; }
        #f22-steps { left:110px; top:330px; width:560px; padding:14px 20px; }
        #root .f22-it { display:flex; align-items:center; gap:14px; font-size:32px; margin:8px 0; }
        #root .f22-it .n { width:44px; height:44px; border-radius:50%; background:${C.sun}; border:5px solid ${C.ink}; display:flex; align-items:center; justify-content:center; font-size:24px; flex:none; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.sky}"/>
      <circle cx="1760" cy="110" r="56" fill="${C.sun}" stroke="${C.ink}" stroke-width="6"/>
      <g id="f22-scroll">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => tree(760 + i * 460)).join("")}</g>
      <rect y="760" width="1920" height="320" fill="#9AA3A8"/><line x1="0" y1="760" x2="1920" y2="760" stroke="${C.ink}" stroke-width="7"/>
      <g id="f22-dash">${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 340}" y="900" width="170" height="14" fill="#fff"/>`).join("")}</g>
      <g id="f22-p-wrap"><g transform="translate(1000,600) scale(1.3)">${human("f22p", "pablo")}</g></g>
      <!-- corda: elipse que "gira" (escala Y vai e volta) -->
      <g id="f22-rope" opacity="0"><ellipse cx="1012" cy="620" rx="130" ry="250" fill="none" stroke="${C.pain}" stroke-width="7"/></g>
      <!-- Aquiles-mola -->
      <g id="f22-bub" opacity="0">
        <circle cx="1540" cy="430" r="200" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
        <clipPath id="f22-clip"><circle cx="1540" cy="430" r="192"/></clipPath>
        <g clip-path="url(#f22-clip)"><rect x="1340" y="230" width="400" height="400" fill="#FFF3D6"/>
          <rect x="1340" y="580" width="400" height="60" fill="${C.bone}"/>
          <g id="f22-a-wrap"><g transform="translate(1540,590) scale(0.72)">${aquiles("f22a")}</g></g>
        </g>
      </g>
    </svg>
    <div id="f22-head" class="abs title">Degrau 3: <span>A MOLA VOLTA</span></div>
    <div id="f22-rule" class="abs card label" style="opacity:0">só quando a <b style="color:#1E9C72">força estiver boa</b><br>começa baixo e devagar</div>
    <div id="f22-steps" class="abs card" style="opacity:0">
      <div class="f22-it label" id="f22-i0" style="opacity:0"><span class="n title">1</span>Saltinhos no lugar</div>
      <div class="f22-it label" id="f22-i1" style="opacity:0"><span class="n title">2</span>Pular corda baixinho</div>
      <div class="f22-it label" id="f22-i2" style="opacity:0"><span class="n title">3</span>Corrida leve</div>
    </div>`,
      js: function (tl, K, R) {
        const p = "f22p", a = "f22a";
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, p, 0.4, K.dur);
        R.pop(tl, "#f22-rule", K.forca - 0.2, 0.4, 0.6);
        R.pop(tl, "#f22-steps", K.salt - 0.4, 0.4, 0.6);
        R.rise(tl, "#f22-i0", K.salt - 0.2, 0.3, 12);
        R.rise(tl, "#f22-i1", K.pular - 0.2, 0.3, 12);
        R.rise(tl, "#f22-i2", K.corr - 0.2, 0.3, 12);
        // saltinhos + corda
        R.pose(tl, p, K.salt - 0.3, 0.3, { shF: 30, elF: -60, shB: 40, elB: -60 });
        const hopEnd = K.corr - 0.3, n = Math.floor((hopEnd - K.salt) / 0.4);
        for (let i = 0; i < n; i++) {
          const t = K.salt + i * 0.4;
          R.move(tl, p, t, 0.18, 0, -22, "power2.out");
          R.pose(tl, p, t, 0.18, { anF: 20, anB: 20 }, "power2.out");
          R.move(tl, p, t + 0.2, 0.18, 0, 0, "power2.in");
          R.pose(tl, p, t + 0.2, 0.18, { anF: 0, anB: 0 }, "power2.in");
        }
        R.face(tl, p, K.salt, { eyes: "happy", mouth: "grin" });
        tl.set("#f22-rope", { opacity: 1 }, K.corda - 0.1);
        tl.fromTo("#f22-rope", { scaleY: 1, svgOrigin: "1012 620" }, { scaleY: -1, svgOrigin: "1012 620", duration: 0.2, yoyo: true, repeat: Math.max(1, Math.floor((hopEnd - K.corda) / 0.2) - 1), ease: "sine.inOut" }, K.corda);
        tl.set("#f22-rope", { opacity: 0 }, hopEnd);
        // Aquiles-mola comprime e solta
        R.pop(tl, "#f22-bub", K.salt - 0.4, 0.4, 0.3);
        R.face(tl, a, 0, { eyes: "happy", mouth: "grin" });
        R.setPose(tl, a, 0, { armF: -140, armB: 140 });
        tl.fromTo("#f22a-body", { scaleY: 1 }, { scaleY: 0.8, svgOrigin: "0 0", duration: 0.2, yoyo: true, repeat: Math.max(3, Math.floor((K.entao - K.salt) / 0.2)), ease: "sine.inOut" }, K.salt);
        tl.to("#f22-bub", { scale: 0, opacity: 0, svgOrigin: "1540 430", duration: 0.3, ease: "back.in(2)" }, K.leve + 0.6);
        // corrida leve
        const t0 = K.corr - 0.2, m = Math.floor((K.dur - t0) / 0.4);
        for (let i = 0; i < m; i++) {
          const b = i % 2;
          R.pose(tl, p, t0 + i * 0.4, 0.38, { hipF: b ? 22 : -35, knF: b ? 55 : 15, hipB: b ? -35 : 22, knB: b ? 15 : 55, shF: b ? -40 : 25, shB: b ? 25 : -40, elF: -80, elB: -80, torso: 6, anF: 0, anB: 0 }, "sine.inOut");
        }
        tl.to("#f22-scroll", { x: -1500, duration: K.dur - t0, ease: "power1.in" }, t0);
        tl.to("#f22-dash", { x: -1020, duration: K.dur - t0, ease: "none" }, t0);
      },
      sfx: [
        { name: "pop", t: k.forca - 0.2, vol: 0.35 },
        { name: "pop", t: k.salt - 0.4, vol: 0.35 },
        { name: "click-soft", t: k.salt + 0.4, vol: 0.3 }, { name: "click-soft", t: k.salt + 1.2, vol: 0.3 },
        { name: "whoosh-short", t: k.corda, vol: 0.3 },
        { name: "whoosh", t: k.corr - 0.2, vol: 0.3 },
      ],
    };
  },
};
