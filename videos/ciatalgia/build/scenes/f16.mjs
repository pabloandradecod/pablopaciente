// F16 — Precisa de ressonância? Máquina "calma", duas colunas e "nem toda hérnia dói"
export default {
  tail: 1.0,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      res: w(0, "ressonância"), obr: w(0, "obrigatória"), ind: w(0, "indicada"), band: w(0, "bandeira"), fra: w(0, "fraqueza"),
      sem: w(0, "semanas"), mui: w(0, "Muita"), nada: w(0, "nada"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const item = (id, text, ok) => `<div id="${id}" class="f16-item label" style="opacity:0">
        <svg width="46" height="46" viewBox="-23 -23 46 46" style="flex:none"><circle r="19" fill="${ok ? C.good : "#fff"}" stroke="${C.ink}" stroke-width="5"/>${ok ? `<path d="M-9 0 L-2 8 L10 -8" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-8 -1 L8 -1" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`}</svg>
        <span>${text}</span></div>`;
    return {
      k,
      css: `
        #root .f16-col { position:absolute; top:150px; width:520px; padding:22px 26px 26px; }
        #root .f16-col h3 { font-family:"Montserrat"; font-weight:900; font-size:38px; margin-bottom:16px; }
        #root .f16-item { display:flex; align-items:center; gap:14px; font-size:32px; line-height:1.12; margin:14px 0; }
        #f16-yes { left:1300px; }
        #f16-no { left:740px; background:#F1F1EE; }
        #f16-scan { left:740px; top:150px; width:1080px; height:610px; display:flex; align-items:center; gap:40px; padding:30px 40px; opacity:0; }
        #f16-scan .t { font-size:66px; line-height:1.1; }
        #f16-scan .t b { color:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <g id="f16-mri">
        <rect x="120" y="330" width="500" height="500" rx="90" fill="#fff" ${st}/>
        <circle cx="370" cy="560" r="150" fill="${C.wall}" ${st}/>
        <circle cx="370" cy="560" r="112" fill="#2F6F7E" ${st}/>
        <rect x="40" y="640" width="660" height="44" rx="18" fill="${C.sky}" ${st}/>
        <rect x="180" y="684" width="30" height="146" fill="${C.grey}" ${st}/><rect x="530" y="684" width="30" height="146" fill="${C.grey}" ${st}/>
        <!-- rostinho calmo -->
        <g id="f16-eyes"><path d="M285 410 Q300 396 315 410 M425 410 Q440 396 455 410" fill="none" ${st}/></g>
        <path d="M335 446 Q370 466 405 446" fill="none" ${st}/>
        <circle id="f16-l1" cx="560" cy="380" r="13" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>
        <circle id="f16-l2" cx="520" cy="380" r="13" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/>
      </g>
      <g id="f16-q" opacity="0"><text x="370" y="270" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="64" fill="${C.ink}">Ressonância?</text></g>
    </svg>
    <div id="f16-no" class="f16-col card" style="opacity:0"><h3>AINDA NÃO PRECISA</h3>
      ${item("f16-n0", "Logo no começo da dor", false)}
      ${item("f16-n1", "Sem sinais de alerta", false)}
      ${item("f16-n2", "Melhorando com o tratamento", false)}</div>
    <div id="f16-yes" class="f16-col card" style="opacity:0;border-color:${C.ink}"><h3 style="color:#1E9C72">PEDIR QUANDO</h3>
      ${item("f16-y0", "Tem bandeira vermelha", true)}
      ${item("f16-y1", "Fraqueza piorando", true)}
      ${item("f16-y2", "Não melhora após ~6 semanas", true)}</div>
    <div id="f16-scan" class="abs card">
      <svg width="420" height="520" viewBox="-210 -260 420 520" style="flex:none">
        <rect x="-200" y="-250" width="400" height="500" rx="24" fill="#16323A" stroke="${C.ink}" stroke-width="7"/>
        ${[-170, -40, 90].map((y) => `<rect x="-90" y="${y}" width="180" height="90" rx="22" fill="#D9D3C2"/>`).join("")}
        ${[-80, 50].map((y) => `<rect x="-80" y="${y}" width="160" height="40" rx="18" fill="#8FB7C2"/>`).join("")}
        <path id="f16-hern" d="M70 54 Q112 60 110 70 Q112 82 70 86" fill="${C.pain}" stroke="#fff" stroke-width="4"/>
        <circle cx="96" cy="70" r="52" fill="none" stroke="${C.sun}" stroke-width="7" stroke-dasharray="14 10"/>
      </svg>
      <div class="t title">Hérnia na imagem…<br><b>e nenhuma dor!</b><br><span style="font-size:44px;font-family:Nunito;font-weight:900;color:${C.ink}">Nem toda hérnia dói.</span></div>
    </div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f16-mri", { y: 600 }, { y: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.05);
        R.pop(tl, "#f16-q", K.res - 0.2, 0.4);
        // luzinhas piscando (finito)
        tl.to("#f16-l1", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 0.8);
        tl.to("#f16-l2", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 1.1);
        // coluna "ainda não precisa"
        R.slideIn(tl, "#f16-no", K.obr - 0.2, 0.5, 200);
        ["#f16-n0", "#f16-n1", "#f16-n2"].forEach((s, i) => R.rise(tl, s, K.obr + 0.2 + i * 0.35, 0.35, 20));
        // coluna "pedir quando"
        R.slideIn(tl, "#f16-yes", K.ind - 0.3, 0.5, 200);
        R.pop(tl, "#f16-y0", K.band - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-y1", K.fra - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-y2", K.sem - 0.4, 0.4, 0.6);
        // nem toda hérnia dói
        R.fadeOut(tl, "#f16-no, #f16-yes", K.mui - 0.35, 0.25);
        R.pop(tl, "#f16-scan", K.mui - 0.1, 0.5, 0.7);
        tl.fromTo("#f16-hern", { scale: 0.3, svgOrigin: "70 70" }, { scale: 1, svgOrigin: "70 70", duration: 0.4, ease: "back.out(2)" }, K.mui + 0.4);
        tl.to("#f16-eyes", { y: -4, duration: 0.2, yoyo: true, repeat: 1 }, K.nada);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "ping", t: k.res - 0.2, vol: 0.35 },
        { name: "pop", t: k.band - 0.1, vol: 0.35 },
        { name: "pop", t: k.fra - 0.1, vol: 0.35 },
        { name: "pop", t: k.sem - 0.4, vol: 0.35 },
        { name: "whoosh-short", t: k.mui - 0.1, vol: 0.4 },
      ],
    };
  },
};
