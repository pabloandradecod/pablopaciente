// F16 — Precisa de ressonância? Máquina "calma", duas colunas e "nem toda hérnia dói"
export default {
  tail: 1.0,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      ex: w(0, "exame"), cli: w(0, "clínico"), conv: w(0, "conversa"), fis: w(0, "físico"), res: w(0, "ressonância"),
      desc: w(0, "descartar"), her: w(0, "hérnia"), neu: w(0, "neurológicos"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const item = (id, text, ok) => `<div id="${id}" class="f18-item label" style="opacity:0">
        <svg width="46" height="46" viewBox="-23 -23 46 46" style="flex:none"><circle r="19" fill="${ok ? C.good : "#fff"}" stroke="${C.ink}" stroke-width="5"/>${ok ? `<path d="M-9 0 L-2 8 L10 -8" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-8 -1 L8 -1" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`}</svg>
        <span>${text}</span></div>`;
    return {
      k,
      css: `
        #root .f18-col { position:absolute; top:150px; width:520px; padding:22px 26px 26px; }
        #root .f18-col h3 { font-family:"Montserrat"; font-weight:900; font-size:38px; margin-bottom:16px; }
        #root .f18-item { display:flex; align-items:center; gap:14px; font-size:32px; line-height:1.12; margin:14px 0; }
        #f18-yes { left:1300px; background:#F1F1EE; }
        #f18-no { left:740px; }
        #f18-scan { left:740px; top:150px; width:1080px; height:610px; display:flex; align-items:center; gap:40px; padding:30px 40px; opacity:0; }
        #f18-scan .t { font-size:66px; line-height:1.1; }
        #f18-scan .t b { color:${C.good}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <g id="f18-mri">
        <rect x="120" y="330" width="500" height="500" rx="90" fill="#fff" ${st}/>
        <circle cx="370" cy="560" r="150" fill="${C.wall}" ${st}/>
        <circle cx="370" cy="560" r="112" fill="#2F6F7E" ${st}/>
        <rect x="40" y="640" width="660" height="44" rx="18" fill="${C.sky}" ${st}/>
        <rect x="180" y="684" width="30" height="146" fill="${C.grey}" ${st}/><rect x="530" y="684" width="30" height="146" fill="${C.grey}" ${st}/>
        <!-- rostinho calmo -->
        <g id="f18-eyes"><path d="M285 410 Q300 396 315 410 M425 410 Q440 396 455 410" fill="none" ${st}/></g>
        <path d="M335 446 Q370 466 405 446" fill="none" ${st}/>
        <circle id="f18-l1" cx="560" cy="380" r="13" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/>
        <circle id="f18-l2" cx="520" cy="380" r="13" fill="${C.sun}" stroke="${C.ink}" stroke-width="5"/>
      </g>
      <g id="f18-q" opacity="0"><text x="370" y="270" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="64" fill="${C.ink}">E os exames?</text></g>
    </svg>
    <div id="f18-no" class="f18-col card" style="opacity:0;background:#E7FBF3"><h3 style="color:#1E9C72">O DIAGNÓSTICO<br>É CLÍNICO</h3>
      ${item("f18-n0", "Conversa (as pistas)", true)}
      ${item("f18-n1", "Exame físico (os testes)", true)}</div>
    <div id="f18-yes" class="f18-col card" style="opacity:0"><h3>EXAMES SERVEM<br>PARA DESCARTAR</h3>
      ${item("f18-y0", "Ressonância da coluna", false)}
      ${item("f18-y1", "Se há suspeita de hérnia", false)}
      ${item("f18-y2", "Ou sinais neurológicos", false)}</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f18-mri", { y: 600 }, { y: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.05);
        R.pop(tl, "#f18-q", K.ex - 0.2, 0.4);
        // luzinhas piscando (finito)
        tl.to("#f18-l1", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 0.8);
        tl.to("#f18-l2", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 1.1);
        // diagnóstico clínico
        R.slideIn(tl, "#f18-no", K.cli - 0.3, 0.5, 200);
        R.pop(tl, "#f18-n0", K.conv - 0.1, 0.4, 0.6);
        R.pop(tl, "#f18-n1", K.fis - 0.3, 0.4, 0.6);
        // exames: descartar a coluna
        R.slideIn(tl, "#f18-yes", K.res - 0.3, 0.5, 200);
        R.pop(tl, "#f18-y0", K.res + 0.2, 0.4, 0.6);
        tl.to("#f18-eyes", { y: -4, duration: 0.2, yoyo: true, repeat: 1 }, K.res);
        R.pop(tl, "#f18-y1", K.her - 0.3, 0.4, 0.6);
        R.pop(tl, "#f18-y2", K.neu - 0.3, 0.4, 0.6);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "ping", t: k.ex - 0.2, vol: 0.35 },
        { name: "pop", t: k.conv - 0.1, vol: 0.35 },
        { name: "pop", t: k.fis - 0.3, vol: 0.35 },
        { name: "whoosh-short", t: k.res - 0.3, vol: 0.35 },
        { name: "pop", t: k.her - 0.3, vol: 0.35 },
        { name: "pop", t: k.neu - 0.3, vol: 0.35 },
      ],
    };
  },
};
