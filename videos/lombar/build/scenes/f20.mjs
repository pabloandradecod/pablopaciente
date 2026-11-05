// F20 — Exercício 3: rotação deitado, joelhos juntos indo de um lado pro outro como limpador de para-brisa
export default {
  extra: 0.8,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      tres: w(0, "Três"), rot: w(0, "rotação"), joelhos: w(0, "Joelhos"), juntos: w(0, "juntos"), devagar: w(0, "devagar"),
      lado: w(0, "lado"), outro: w(0, "outro"), limp: w(0, "limpador"), dez: w(0, "Dez"),
    };
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f20-r${i}"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const leg = (hx, kx, fx) => `<path d="M${hx} 600 L${kx} 400 L${fx} 610" fill="none" stroke="${C.ink}" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${hx} 600 L${kx} 400 L${fx} 610" fill="none" stroke="${C.brown}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="${fx}" cy="624" rx="30" ry="20" fill="#4A2E1A" stroke="${C.ink}" stroke-width="6"/>`;
    return {
      k,
      css: `
        #f20-head { left:110px; top:80px; font-size:76px; }
        #f20-head span { color:${C.good}; }
        #f20-card { left:1320px; top:150px; width:500px; padding:26px 32px; }
        #f20-card .t { font-size:44px; }
        #f20-card .row { font-size:31px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f20-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f20-stop { left:1340px; top:720px; width:480px; padding:14px 18px; font-size:30px; text-align:center; line-height:1.25; }
        #f20-stop .ok { color:#1E9C72; } #f20-stop .no { color:#C9372A; }
        #f20-pl { left:740px; top:668px; width:500px; text-align:center; font-size:26px; }
        #f20-sl { left:150px; top:760px; width:520px; text-align:center; font-size:26px; }
        #f20-cnt { left:760px; top:206px; width:150px; height:150px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:40px; display:flex; align-items:center; justify-content:center; text-align:center; line-height:1; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="1920" height="740" fill="${C.wall}"/>
      <rect x="0" y="740" width="1920" height="340" fill="${C.floor}"/>
      <line x1="0" y1="740" x2="1920" y2="740" stroke="${C.ink}" stroke-width="7"/>
      <!-- vista de lado (referência da posição) -->
      <rect x="110" y="700" width="560" height="32" rx="14" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/>
      <g transform="translate(470,650) scale(1.05)">${human("f20z", "ze")}</g>
      <!-- painel "visto dos pés" -->
      <g id="f20-panel" opacity="0">
        <rect x="740" y="190" width="500" height="470" rx="28" fill="#fff" ${st}/>
        <clipPath id="f20-clip"><rect x="744" y="194" width="492" height="462" rx="24"/></clipPath>
        <g clip-path="url(#f20-clip)">
          <rect x="740" y="630" width="500" height="40" fill="${C.good}"/>
          <rect x="910" y="330" width="140" height="250" rx="40" fill="${C.blue}" ${st}/>
          <circle cx="980" cy="300" r="46" fill="${C.skinB}" ${st}/>
          <rect x="890" y="560" width="180" height="70" rx="26" fill="${C.brown}" ${st}/>
          <g id="f20-legs">${leg(945, 950, 915)}${leg(1015, 1010, 1045)}
            <circle cx="950" cy="400" r="26" fill="${C.brown}" stroke="${C.ink}" stroke-width="6"/><circle cx="1010" cy="400" r="26" fill="${C.brown}" stroke="${C.ink}" stroke-width="6"/>
          </g>
          <path id="f20-arcL" d="M880 420 Q840 470 840 540" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-dasharray="16 10" opacity="0"/>
          <path id="f20-arcR" d="M1080 420 Q1120 470 1120 540" fill="none" stroke="${C.pain}" stroke-width="9" stroke-linecap="round" stroke-dasharray="16 10" opacity="0"/>
        </g>
      </g>
      <!-- limpador de para-brisa -->
      <g id="f20-wiper" opacity="0">
        <path d="M110 520 Q110 300 400 300 Q690 300 690 520 Z" fill="#CFEFF7" ${st}/>
        <path d="M110 520 L690 520" ${st}/>
        <g id="f20-wblade"><path d="M400 520 L400 330" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M400 500 L400 340" stroke="#555" stroke-width="5"/></g>
        <circle cx="400" cy="520" r="14" fill="${C.ink}"/>
      </g>
    </svg>
    <div id="f20-head" class="abs title">3. <span>ROTAÇÃO DEITADO</span></div>
    <div id="f20-pl" class="abs label" style="opacity:0">visto dos pés: os joelhos vão juntos</div>
    <div id="f20-sl" class="abs label">deitado, joelhos dobrados</div>
    <div id="f20-cnt" class="abs title" style="opacity:0">10 pra<br>cada lado</div>
    <div id="f20-card" class="abs card">
      <div class="t title">Rotação deitado</div>
      ${row(0, "Joelhos dobrados e juntos")}
      ${row(1, "Vão devagar pra um lado")}
      ${row(2, "Depois pro outro")}
      ${row(3, "<b>10 pra cada lado</b>", C.sun)}
    </div>
    <div id="f20-stop" class="abs card label">Desconforto leve: <b class="ok">OK</b><br>Dor forte: <b class="no">diminui</b></div>`,
      js: function (tl, K, R) {
        const z = "f20z";
        R.setPose(tl, z, 0, { root: -90, torso: 0, neck: 0, shB: 0, shF: 0, elB: 0, elF: 0, hipB: -45, hipF: -45, knB: 118, knF: 118, anB: 17, anF: 17 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f20-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f20-card", 0.2, 0.55, 400);
        R.pop(tl, "#f20-stop", 0.6, 0.4);
        [K.joelhos, K.lado, K.outro, K.dez].forEach((t, i) => tl.fromTo(`#f20-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // painel dos pés entra na "rotação"
        R.pop(tl, "#f20-panel", K.rot - 0.1, 0.45, 0.6);
        R.fadeIn(tl, "#f20-pl", K.joelhos);
        tl.to("#f20-legs", { scale: 1.04, svgOrigin: "980 600", duration: 0.2, yoyo: true, repeat: 1 }, K.juntos);
        // vai pra um lado... e pro outro
        const L = -48, Rr = 48;
        tl.to("#f20-legs", { rotation: L, svgOrigin: "980 600", duration: 0.9, ease: "sine.inOut" }, K.lado - 0.3);
        R.fadeIn(tl, "#f20-arcL", K.lado - 0.2, 0.3);
        tl.to("#f20-legs", { rotation: Rr, svgOrigin: "980 600", duration: 1.3, ease: "sine.inOut" }, K.outro - 0.2);
        R.fadeIn(tl, "#f20-arcR", K.outro - 0.1, 0.3);
        // limpador de para-brisa em sincronia
        tl.fromTo("#f20-wiper", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, K.limp - 0.3);
        tl.to("#f20-sl", { opacity: 0, duration: 0.2 }, K.limp - 0.3);
        let t = K.limp, side = -1;
        while (t + 1.1 < K.dur - 0.3) {
          tl.to("#f20-legs", { rotation: side * 48, svgOrigin: "980 600", duration: 1.0, ease: "sine.inOut" }, t);
          tl.to("#f20-wblade", { rotation: side * 70, svgOrigin: "400 520", duration: 1.0, ease: "sine.inOut" }, t);
          t += 1.1; side = -side;
        }
        R.pop(tl, "#f20-cnt", K.dez - 0.1, 0.4);
        R.face(tl, z, K.dez, { eyes: "happy", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.4 },
        { name: "pop", t: k.rot - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.lado - 0.3, vol: 0.3 },
        { name: "whoosh-short", t: k.outro - 0.2, vol: 0.3 },
        { name: "pop", t: k.limp - 0.3, vol: 0.35 },
        { name: "pop", t: k.dez - 0.1, vol: 0.35 },
      ],
    };
  },
};
