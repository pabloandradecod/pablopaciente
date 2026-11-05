// F17 — E os exames? Suspeita clínica + exames que ajudam (ENMG, ressonância, bloqueio por ultrassom)
export default {
  tail: 1.0,
  build(ctx) {
    const { C, w, turao } = ctx;
    const k = {
      ex: w(0, "exames"), cli: w(0, "clínica"), aj: w(0, "ajudam"), enmg: w(0, "eletroneuromiografia"), res: w(0, "ressonância"),
      bl: w(0, "bloqueio"), conf: w(0, "confirmar"), some: w(0, "some"), ach: w(0, "achamos"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const item = (id, text, ok) => `<div id="${id}" class="f17-item label" style="opacity:0">
        <svg width="46" height="46" viewBox="-23 -23 46 46" style="flex:none"><circle r="19" fill="${ok ? C.good : "#fff"}" stroke="${C.ink}" stroke-width="5"/>${ok ? `<path d="M-9 0 L-2 8 L10 -8" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-8 -1 L8 -1" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`}</svg>
        <span>${text}</span></div>`;
    return {
      k,
      css: `
        #root .f17-col { position:absolute; top:150px; width:520px; padding:22px 26px 26px; }
        #root .f17-col h3 { font-family:"Montserrat"; font-weight:900; font-size:38px; margin-bottom:16px; }
        #root .f17-item { display:flex; align-items:center; gap:14px; font-size:30px; line-height:1.12; margin:14px 0; }
        #f17-yes { left:1300px; width:560px; background:#F1F1EE; }
        #f17-no { left:740px; }
        #f17-stamp { left:1010px; top:690px; font-size:40px; color:#fff; background:#2E9E78; border:6px solid ${C.ink}; border-radius:16px; padding:8px 22px; }
        #f17-scan { left:740px; top:150px; width:1080px; height:610px; display:flex; align-items:center; gap:40px; padding:30px 40px; opacity:0; }
        #f17-scan .t { font-size:66px; line-height:1.1; }
        #f17-scan .t b { color:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <g id="f17-mri">
        <rect x="120" y="330" width="500" height="500" rx="90" fill="#fff" ${st}/>
        <circle cx="370" cy="560" r="150" fill="${C.wall}" ${st}/>
        <circle cx="370" cy="560" r="112" fill="#2F6F7E" ${st}/>
        <rect x="40" y="640" width="660" height="44" rx="18" fill="${C.sky}" ${st}/>
        <rect x="180" y="684" width="30" height="146" fill="${C.grey}" ${st}/><rect x="530" y="684" width="30" height="146" fill="${C.grey}" ${st}/>
        <!-- rostinho calmo -->
        <g id="f17-eyes"><path d="M285 410 Q300 396 315 410 M425 410 Q440 396 455 410" fill="none" ${st}/></g>
        <path d="M335 446 Q370 466 405 446" fill="none" ${st}/>
        <circle id="f17-l1" cx="560" cy="380" r="13" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>
        <circle id="f17-l2" cx="520" cy="380" r="13" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/>
      </g>
      <g id="f17-t-wrap" opacity="0">${turao("f17t", [[780, 760], [830, 760], [880, 770], [930, 760], [980, 770]], 26, 1.1)}</g>
      <g id="f17-q" opacity="0"><text x="370" y="270" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="64" fill="${C.ink}">E os exames?</text></g>
    </svg>
    <div id="f17-no" class="f17-col card" style="opacity:0;background:#E7FBF3"><h3 style="color:#1E9C72">A SUSPEITA<br>É CLÍNICA</h3>
      ${item("f17-n0", "Conversa + exame físico", true)}
      ${item("f17-n1", "Sensibilidade, força e reflexo", true)}</div>
    <div id="f17-yes" class="f17-col card" style="opacity:0"><h3>EXAMES<br>QUE AJUDAM</h3>
      ${item("f17-y0", "Eletroneuromiografia: os adutores recebem o sinal?", false)}
      ${item("f17-y1", "Ressonância: pelve e quadril", false)}
      ${item("f17-y2", "Bloqueio anestésico guiado por ultrassom", false)}</div>
    <div id="f17-stamp" class="abs title" style="opacity:0">A dor sumiu? ACHAMOS O TURÃO!</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f17-mri", { y: 600 }, { y: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.05);
        R.pop(tl, "#f17-q", K.ex - 0.2, 0.4);
        // luzinhas piscando (finito)
        tl.to("#f17-l1", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 0.8);
        tl.to("#f17-l2", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 1.1);
        // suspeita clínica
        R.slideIn(tl, "#f17-no", K.cli - 0.3, 0.5, 200);
        R.pop(tl, "#f17-n0", K.cli + 0.3, 0.4, 0.6);
        R.pop(tl, "#f17-n1", K.cli + 0.8, 0.4, 0.6);
        // exames que ajudam
        R.slideIn(tl, "#f17-yes", K.aj - 0.3, 0.5, 200);
        R.pop(tl, "#f17-y0", K.enmg - 0.1, 0.4, 0.6);
        tl.to("#f17-eyes", { y: -4, duration: 0.2, yoyo: true, repeat: 1 }, K.enmg);
        R.pop(tl, "#f17-y1", K.res - 0.1, 0.4, 0.6);
        R.pop(tl, "#f17-y2", K.bl - 0.1, 0.4, 0.6);
        // o culpado aparece
        tl.fromTo("#f17-t-wrap", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(2)" }, K.conf - 0.2);
        R.face(tl, "f17t", K.conf - 0.2, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f17-stamp", K.some - 0.1, 0.4, 1.6);
        R.face(tl, "f17t", K.ach, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "ping", t: k.ex - 0.2, vol: 0.35 },
        { name: "pop", t: k.cli + 0.3, vol: 0.35 },
        { name: "whoosh-short", t: k.aj - 0.3, vol: 0.35 },
        { name: "pop", t: k.enmg - 0.1, vol: 0.35 },
        { name: "pop", t: k.res - 0.1, vol: 0.35 },
        { name: "pop", t: k.bl - 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.some - 0.1, vol: 0.4 },
      ],
    };
  },
};
