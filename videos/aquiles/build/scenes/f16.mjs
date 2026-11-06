// F16 — E os exames? Diagnóstico clínico; ultrassom/ressonância na suspeita de ruptura, dúvida ou sem melhora; tendão alterado sem dor é comum
export default {
  tail: 1.4,
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      exa: w(0, "exames"), maio: w(0, "diagnóstico"), clin: w(0, "clínico"), us: w(0, "Ultrassom"), ress: w(0, "ressonância"),
      rup: w(0, "suspeita"), duv: w(0, "dúvida"), mel: w(0, "melhora"), lem: w(0, "lembra"), alt: w(0, "alterado"), sem: w(0, "sem"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const item = (id, text, ok) => `<div id="${id}" class="f16-item label" style="opacity:0">
        <svg width="46" height="46" viewBox="-23 -23 46 46" style="flex:none"><circle r="19" fill="${ok ? C.good : C.sun}" stroke="${C.ink}" stroke-width="5"/>${ok ? `<path d="M-9 0 L-2 8 L10 -8" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M0 -10 L0 3 M0 9 L0 10" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`}</svg>
        <span>${text}</span></div>`;
    return {
      k,
      css: `
        #root .f16-col { position:absolute; top:130px; width:560px; padding:22px 28px 24px; }
        #root .f16-col h3 { font-family:"Montserrat"; font-weight:900; font-size:36px; margin-bottom:10px; line-height:1.05; }
        #root .f16-item { display:flex; align-items:center; gap:14px; font-size:31px; line-height:1.12; margin:14px 0; }
        #f16-clin { left:700px; }
        #f16-when { left:1300px; background:#FFF9E8; }
        #f16-stamp { left:700px; top:640px; width:1160px; padding:16px 30px; text-align:center; font-size:40px; color:${C.ink}; background:#BFE8F7; border:7px solid ${C.ink}; border-radius:20px; transform:rotate(-2deg); }
        #f16-stamp span { color:${C.pain}; }
        #f16-chip { left:1300px; top:540px; padding:12px 26px; font-size:32px; background:${C.sky}; border:6px solid ${C.ink}; border-radius:40px; }
        #f16-sign { left:150px; top:150px; padding:10px 24px; font-size:50px; background:${C.sun}; border:7px solid ${C.ink}; border-radius:18px; transform:rotate(-4deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="830" width="1920" height="250" fill="${C.floor}"/>
      <line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <g id="f16-us"><g id="f16-us-in">
        <rect x="200" y="640" width="320" height="40" rx="14" fill="${C.grey}" ${st}/>
        <rect x="340" y="500" width="40" height="150" fill="${C.grey}" ${st}/>
        <rect x="220" y="680" width="20" height="120" fill="${C.grey}" ${st}/><rect x="480" y="680" width="20" height="120" fill="${C.grey}" ${st}/>
        <circle cx="230" cy="812" r="18" fill="${C.ink}"/><circle cx="490" cy="812" r="18" fill="${C.ink}"/>
        <rect x="190" y="270" width="340" height="240" rx="30" fill="#fff" ${st}/>
        <rect x="222" y="300" width="276" height="180" rx="16" fill="#1B3440" stroke="${C.ink}" stroke-width="5"/>
        <path d="M250 450 L300 330 L420 330 L470 450 Z" fill="#2E5566" opacity="0.8"/>
        <path id="f16-scan" d="M270 420 Q330 380 360 400 Q400 420 450 390" fill="none" stroke="#BFE6EE" stroke-width="5" opacity="0.9"/>
        <path d="M300 360 Q312 350 324 360 M396 360 Q408 350 420 360" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
        <path d="M330 400 Q360 420 390 400" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
        <path d="M530 400 Q610 420 600 520" fill="none" stroke="${C.ink}" stroke-width="7"/>
        <g id="f16-probe"><rect x="582" y="510" width="40" height="80" rx="14" fill="${C.sky}" ${st}/></g>
      </g></g>
    </svg>
    <div id="f16-sign" class="abs title" style="opacity:0">E OS EXAMES?</div>
    <div id="f16-clin" class="f16-col card" style="opacity:0"><h3 style="color:#1E9C72">NA MAIORIA: DIAGNÓSTICO CLÍNICO</h3>
      ${item("f16-c0", "Conversa + exame físico", true)}
      ${item("f16-c1", "Palpação, ponta do pé e teste de Thompson", true)}</div>
    <div id="f16-when" class="f16-col card" style="opacity:0"><h3>EXAMES QUANDO</h3>
      ${item("f16-w0", "Suspeita de RUPTURA", false)}
      ${item("f16-w1", "Dúvida no diagnóstico", false)}
      ${item("f16-w2", "Não melhora com o tratamento", false)}</div>
    <div id="f16-chip" class="abs label" style="opacity:0">ultrassom ou ressonância</div>
    <div id="f16-stamp" class="abs title" style="opacity:0">Tendão alterado no exame <span>SEM DOR</span> é comum: trate a pessoa!</div>`,
      js: function (tl, K, R) {
        tl.fromTo("#f16-us", { x: -700 }, { x: 0, duration: 0.7, ease: "back.out(1.3)" }, 0.05);
        R.pop(tl, "#f16-sign", Math.max(0.3, K.exa - 0.1), 0.4);
        tl.fromTo("#f16-scan", { y: 0 }, { y: -30, duration: 0.6, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.6);
        tl.to("#f16-probe", { rotation: -12, svgOrigin: "602 550", duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.8);
        R.slideIn(tl, "#f16-clin", K.maio - 0.3, 0.5, 200);
        R.rise(tl, "#f16-c0", K.clin - 0.2, 0.35, 20);
        R.rise(tl, "#f16-c1", K.clin + 0.4, 0.35, 20);
        tl.to("#f16-clin", { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1 }, K.clin);
        R.slideIn(tl, "#f16-when", K.us - 0.3, 0.5, 200);
        R.pop(tl, "#f16-chip", K.ress - 0.1, 0.4);
        R.pop(tl, "#f16-w0", K.rup - 0.15, 0.4, 0.6);
        R.pop(tl, "#f16-w1", K.duv - 0.15, 0.4, 0.6);
        R.pop(tl, "#f16-w2", K.mel - 0.3, 0.4, 0.6);
        tl.to("#f16-sign", { rotation: 4, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.us);
        tl.fromTo("#f16-stamp", { scale: 2.0, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: -2, duration: 0.35, ease: "back.out(2)" }, K.alt - 0.2);
        tl.to("#f16-stamp", { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, K.sem);
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.35 },
        { name: "ping", t: Math.max(0.3, k.exa - 0.1), vol: 0.35 },
        { name: "whoosh-short", t: k.maio - 0.3, vol: 0.35 },
        { name: "whoosh-short", t: k.us - 0.3, vol: 0.35 },
        { name: "pop", t: k.rup - 0.15, vol: 0.35 },
        { name: "pop", t: k.duv - 0.15, vol: 0.35 },
        { name: "pop", t: k.mel - 0.3, vol: 0.35 },
        { name: "impact-bass-1", t: k.alt - 0.1, vol: 0.4 },
      ],
    };
  },
};
