// F16 — Precisa de ressonância? Máquina "calma", duas colunas e "nem toda hérnia dói"
export default {
  tail: 1.0,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      res: w(0, "ressonância"), ind: w(0, "indicada"), band: w(0, "bandeira"), fra: w(0, "fraqueza"),
      sem: w(0, "semanas"), proc: w(0, "procedimento"), com: w(0, "começo"), sin: w(0, "sinais"), muda: w(0, "muda"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const item = (id, text, ok) => `<div id="${id}" class="f17-item label" style="opacity:0">
        <svg width="46" height="46" viewBox="-23 -23 46 46" style="flex:none"><circle r="19" fill="${ok ? C.good : "#fff"}" stroke="${C.ink}" stroke-width="5"/>${ok ? `<path d="M-9 0 L-2 8 L10 -8" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M-8 -1 L8 -1" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`}</svg>
        <span>${text}</span></div>`;
    return {
      k,
      css: `
        #root .f17-col { position:absolute; top:130px; width:520px; padding:22px 26px 26px; }
        #root .f17-col h3 { font-family:"Montserrat"; font-weight:900; font-size:38px; margin-bottom:16px; }
        #root .f17-item { display:flex; align-items:center; gap:14px; font-size:32px; line-height:1.12; margin:14px 0; }
        #f17-yes { left:740px; }
        #f17-no { left:1300px; background:#F1F1EE; }
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
      <g id="f17-q" opacity="0"><text x="370" y="270" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="64" fill="${C.ink}">Ressonância?</text></g>
    </svg>
    <div id="f17-no" class="f17-col card" style="opacity:0"><h3>LOGO DE CARA? NÃO</h3>
      ${item("f17-n0", "No começo da dor", false)}
      ${item("f17-n1", "Sem sinais de alerta", false)}
      ${item("f17-n2", "Geralmente não muda o tratamento", false)}</div>
    <div id="f17-yes" class="f17-col card" style="opacity:0;border-color:${C.ink}"><h3 style="color:#1E9C72">PEDIR QUANDO</h3>
      ${item("f17-y0", "Tem bandeira vermelha", true)}
      ${item("f17-y1", "Fraqueza piorando", true)}
      ${item("f17-y2", "Sem melhora em 6 a 8 semanas", true)}
      ${item("f17-y3", "Se pensa em procedimento", true)}</div>
    <div id="f17-stamp" class="abs title" style="left:1330px;top:640px;opacity:0;font-size:44px;color:${C.ink};background:${C.sun};border:7px solid ${C.ink};border-radius:20px;padding:8px 22px;rotate:-5deg">calma: tratar primeiro!</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f17-mri", { y: 600 }, { y: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.05);
        R.pop(tl, "#f17-q", K.res - 0.2, 0.4);
        // luzinhas piscando (finito)
        tl.to("#f17-l1", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 0.8);
        tl.to("#f17-l2", { opacity: 0.25, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, 1.1);
        // coluna "pedir quando"
        R.slideIn(tl, "#f17-yes", K.ind - 0.3, 0.5, 200);
        R.pop(tl, "#f17-y0", K.band - 0.1, 0.4, 0.6);
        R.pop(tl, "#f17-y1", K.fra - 0.1, 0.4, 0.6);
        R.pop(tl, "#f17-y2", K.sem - 0.6, 0.4, 0.6);
        R.pop(tl, "#f17-y3", K.proc - 0.3, 0.4, 0.6);
        // coluna "logo de cara? não"
        R.slideIn(tl, "#f17-no", K.com - 0.3, 0.5, 200);
        R.rise(tl, "#f17-n0", K.com, 0.35, 20);
        R.rise(tl, "#f17-n1", K.sin - 0.1, 0.35, 20);
        R.rise(tl, "#f17-n2", K.muda - 0.4, 0.35, 20);
        R.pop(tl, "#f17-stamp", K.muda + 0.5, 0.4);
        tl.to("#f17-eyes", { y: -4, duration: 0.2, yoyo: true, repeat: 1 }, K.muda + 0.5);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "ping", t: k.res - 0.2, vol: 0.35 },
        { name: "pop", t: k.band - 0.1, vol: 0.35 },
        { name: "pop", t: k.fra - 0.1, vol: 0.35 },
        { name: "pop", t: k.sem - 0.6, vol: 0.35 },
        { name: "whoosh-short", t: k.com - 0.3, vol: 0.4 },
        { name: "pop", t: k.muda + 0.5, vol: 0.4 },
      ],
    };
  },
};
