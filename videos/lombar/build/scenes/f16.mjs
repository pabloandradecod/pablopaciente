// F16 — Precisa de exame de imagem? Máquina "calma" com placa "PRECISA MESMO?", duas colunas e dois avisos.
export default {
  tail: 1.0,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      exa: w(0, "exame"), inesp: w(0, "inespecífica"), nec: w(0, "necessário"), muita: w(0, "Muita"), desg: w(0, "desgaste"),
      cedo: w(0, "cedo"), trat: w(0, "tratamentos"), ind: w(0, "indicado"), band: w(0, "bandeira"), nervo: w(0, "nervo"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const item = (id, text, ok) => `<div id="${id}" class="f16-item label" style="opacity:0">
        <svg width="46" height="46" viewBox="-23 -23 46 46" style="flex:none"><circle r="19" fill="${ok ? C.good : "#fff"}" stroke="${C.ink}" stroke-width="5"/>${ok ? `<path d="M-9 0 L-2 8 L10 -8" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-8 -1 L8 -1" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`}</svg>
        <span>${text}</span></div>`;
    return {
      k,
      css: `
        #root .f16-col { position:absolute; top:110px; width:520px; padding:20px 26px 22px; }
        #root .f16-col h3 { font-family:"Montserrat"; font-weight:900; font-size:36px; margin-bottom:10px; line-height:1.05; }
        #root .f16-item { display:flex; align-items:center; gap:14px; font-size:31px; line-height:1.12; margin:12px 0; }
        #f16-no { left:740px; background:#F1F1EE; }
        #f16-yes { left:1300px; }
        #root .f16-fact { position:absolute; top:560px; width:520px; padding:18px 22px; display:flex; gap:16px; align-items:center; }
        #root .f16-fact .t { font-size:30px; line-height:1.15; }
        #root .f16-fact .t b { color:#C9372A; }
        #f16-f1 { left:740px; } #f16-f2 { left:1300px; }
        #f16-sign { left:170px; top:170px; padding:10px 24px; font-size:48px; background:${C.sun}; border:7px solid ${C.ink}; border-radius:18px; transform:rotate(-4deg); }
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
        <g id="f16-eyes"><path d="M285 410 Q300 396 315 410 M425 410 Q440 396 455 410" fill="none" ${st}/></g>
        <path id="f16-mouth" d="M335 446 Q370 466 405 446" fill="none" ${st}/>
        <circle id="f16-l1" cx="560" cy="380" r="13" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>
        <circle id="f16-l2" cx="520" cy="380" r="13" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/>
      </g>
    </svg>
    <div id="f16-sign" class="abs title" style="opacity:0">PRECISA MESMO?</div>
    <div id="f16-no" class="f16-col card" style="opacity:0"><h3>NA MAIORIA: NÃO PRECISA</h3>
      ${item("f16-n0", "Dor lombar inespecífica", false)}
      ${item("f16-n1", "Sem bandeira vermelha", false)}</div>
    <div id="f16-yes" class="f16-col card" style="opacity:0"><h3 style="color:#1E9C72">PEDIR QUANDO</h3>
      ${item("f16-y0", "Tem bandeira vermelha", true)}
      ${item("f16-y1", "Dor no nervo que não melhora", true)}</div>
    <div id="f16-f1" class="f16-fact card" style="opacity:0">
      <svg width="120" height="110" viewBox="0 0 120 110" style="flex:none">
        ${[0, 1, 2].map((i) => `<g transform="translate(${20 + i * 40},0)"><circle cx="0" cy="28" r="16" fill="${C.skinB}" stroke="${C.ink}" stroke-width="4"/><path d="M-7 32 Q0 38 7 32" fill="none" stroke="${C.ink}" stroke-width="3"/><rect x="-16" y="46" width="32" height="44" rx="10" fill="${["#4A90C2", "#3DD9A4", "#FFC94A"][i]}" stroke="${C.ink}" stroke-width="4"/></g>`).join("")}
      </svg>
      <div class="t label"><b>Desgaste na imagem</b> é comum em quem não tem dor nenhuma</div></div>
    <div id="f16-f2" class="f16-fact card" style="opacity:0">
      <svg width="120" height="110" viewBox="0 0 120 110" style="flex:none">
        ${[0, 1, 2, 3].map((i) => `<g id="f16-dom${i}"><rect x="${14 + i * 26}" y="20" width="16" height="70" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="4"/></g>`).join("")}
      </svg>
      <div class="t label">Exame <b>cedo demais</b> pode levar a tratamentos que não ajudam</div></div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f16-mri", { y: 600 }, { y: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.05);
        R.pop(tl, "#f16-sign", K.exa, 0.4);
        tl.to("#f16-l1", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 11, ease: "steps(1)" }, 0.8);
        tl.to("#f16-l2", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 11, ease: "steps(1)" }, 1.1);
        // na maioria: não precisa
        R.slideIn(tl, "#f16-no", K.inesp - 0.3, 0.5, 200);
        R.rise(tl, "#f16-n0", K.inesp, 0.35, 20);
        R.rise(tl, "#f16-n1", K.nec - 0.6, 0.35, 20);
        tl.to("#f16-eyes", { y: -4, duration: 0.15, yoyo: true, repeat: 1 }, K.nec);
        // os dois avisos
        R.pop(tl, "#f16-f1", K.muita - 0.1, 0.45, 0.6);
        R.pop(tl, "#f16-f2", K.cedo - 0.1, 0.45, 0.6);
        [0, 1, 2, 3].forEach((i) => tl.to(`#f16-dom${i}`, { rotation: 32, svgOrigin: `${30 + i * 26} 90`, duration: 0.25, ease: "power2.in" }, K.trat + i * 0.14));
        // pedir quando
        R.slideIn(tl, "#f16-yes", K.ind - 0.3, 0.5, 200);
        R.pop(tl, "#f16-y0", K.band - 0.1, 0.4, 0.6);
        R.pop(tl, "#f16-y1", K.nervo - 0.2, 0.4, 0.6);
        tl.to("#f16-sign", { rotation: 4, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.ind);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "ping", t: k.exa, vol: 0.35 },
        { name: "whoosh-short", t: k.inesp - 0.3, vol: 0.35 },
        { name: "pop", t: k.muita - 0.1, vol: 0.35 },
        { name: "pop", t: k.cedo - 0.1, vol: 0.35 },
        { name: "click-soft", t: k.trat, vol: 0.4 },
        { name: "whoosh-short", t: k.ind - 0.3, vol: 0.35 },
        { name: "pop", t: k.band - 0.1, vol: 0.35 },
      ],
    };
  },
};
