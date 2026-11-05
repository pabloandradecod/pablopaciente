// F6 — Tendinite? Não: tendinopatia. Placa riscada, fibras alinhadas × novelo bagunçado, Molão "tô bagunçado!"
export default {
  speakers: { molao: "f06m" },
  build(ctx) {
    const { C, molao, w, lines } = ctx;
    const k = {
      ant: w(0, "Antigamente"), tite: w(0, "tendinite"), infl: w(0, "inflamação"), hoje: w(0, "Hoje"), estr: w(0, "estrutura"),
      fib: w(0, "fibras"), des: w(0, "desorganizadas"), nov: w(0, "novelo"), nome: w(0, "nome"), pat: w(0, "tendinopatia"),
      m0: lines[1].start, m1: lines[1].end, infla: w(1, "inflamado"), bag: w(1, "bagunçado"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    // fibras alinhadas
    const ok = Array.from({ length: 9 }, (_, i) => `<path d="M-120 ${-80 + i * 20} Q0 ${-84 + i * 20} 120 ${-80 + i * 20}" stroke="#D8B98A" stroke-width="9" fill="none" stroke-linecap="round"/>`).join("");
    // novelo bagunçado (determinístico)
    let s = 7; const r = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
    let d = "M-90 -40";
    for (let i = 0; i < 30; i++) d += ` Q${(r() - 0.5) * 300} ${(r() - 0.5) * 270} ${(r() - 0.5) * 260} ${(r() - 0.5) * 240}`;
    const mess = `<path id="f06-mess" d="${d}" stroke="#D8B98A" stroke-width="8" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${C.pain}" stroke-width="2.5" fill="none" opacity="0.5"/>`;
    let hd = "M-60 -335";
    for (let i = 0; i < 14; i++) hd += ` Q${(r() - 0.5) * 170} ${-345 - r() * 80} ${(r() - 0.5) * 150} ${-335 - r() * 50}`;
    return {
      k,
      css: `
        #f06-old { left:120px; top:110px; width:640px; padding:22px 30px; text-align:center; }
        #f06-old .w { font-size:84px; color:${C.ink}; }
        #f06-old .s { font-size:30px; color:${C.pain}; margin-top:4px; }
        #f06-x { left:110px; top:180px; width:660px; height:20px; background:${C.pain}; border-radius:10px; transform: rotate(-6deg); transform-origin:0 50%; }
        #f06-new { left:110px; top:560px; padding:20px 34px; font-size:70px; color:#fff; background:${C.good}; border:8px solid ${C.ink}; border-radius:24px; box-shadow:10px 10px 0 ${C.ink}; transform: rotate(-3deg); }
        #f06-new small { display:block; font-size:28px; color:${C.ink}; }
        #f06-sel { left:150px; top:420px; padding:10px 22px; font-size:30px; }
        .f06-cap { font-family:"Nunito"; font-weight:900; font-size:30px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f06-fire" opacity="0"><path d="M720 300 Q700 250 726 216 Q734 250 756 236 Q770 282 744 312 Q726 320 720 300Z" fill="${C.pain}" ${st}/></g>
      <g id="f06-z1" opacity="0"><g transform="translate(1030,330)">
        <circle r="170" fill="#fff" ${st}/><clipPath id="f06-c1"><circle r="160"/></clipPath><g clip-path="url(#f06-c1)">${ok}</g>
        <text class="f06-cap" x="0" y="215" text-anchor="middle" fill="${C.good}">SAUDÁVEL: alinhado</text></g></g>
      <g id="f06-z2" opacity="0"><g transform="translate(1480,330)">
        <circle r="170" fill="#fff" ${st}/><clipPath id="f06-c2"><circle r="160"/></clipPath><g clip-path="url(#f06-c2)" id="f06-messg">${mess}</g>
        <text class="f06-cap" x="0" y="215" text-anchor="middle" fill="${C.pain}">TENDINOPATIA: novelo</text></g></g>
      <g id="f06-m-wrap" opacity="0"><g transform="translate(1760,860) scale(0.75)">${molao("f06m")}
        <g id="f06-hair" opacity="0"><path d="${hd}" stroke="#8B6B3A" stroke-width="10" fill="none" stroke-linecap="round"/></g></g></g>
    </svg>
    <div id="f06-old" class="abs card" style="opacity:0"><div class="w title">TENDINITE</div><div class="s label">"-ite" = inflamação</div></div>
    <div id="f06-x" class="abs" style="opacity:0"></div>
    <div id="f06-sel" class="abs card label" style="opacity:0">mudança na <b>estrutura</b> do tendão</div>
    <div id="f06-new" class="abs title" style="opacity:0"><small>o nome certo é</small>TENDINOPATIA</div>`,
      js: function (tl, K, R) {
        R.pop(tl, "#f06-old", K.ant - 0.1, 0.45);
        R.pop(tl, "#f06-fire", K.infl - 0.1, 0.35);
        tl.to("#f06-fire", { y: -10, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, K.infl + 0.3);
        // Hoje: risca
        tl.set("#f06-x", { opacity: 1 }, K.hoje);
        tl.fromTo("#f06-x", { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out" }, K.hoje);
        tl.to("#f06-old, #f06-fire", { opacity: 0.4, duration: 0.3 }, K.hoje + 0.3);
        R.pop(tl, "#f06-sel", K.estr - 0.1, 0.4);
        // fibras: saudável × bagunçado
        R.pop(tl, "#f06-z1", K.fib - 0.1, 0.45);
        R.pop(tl, "#f06-z2", K.des - 0.1, 0.45);
        R.draw(tl, "#f06-mess", K.des, 1.6, "power1.inOut");
        tl.to("#f06-messg", { rotation: 8, transformOrigin: "50% 50%", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.nov);
        // nome certo
        tl.fromTo("#f06-new", { scale: 2, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.3, ease: "power4.in" }, K.pat - 0.25);
        R.shake(tl, "#f06-new", K.pat + 0.1, 0.25, 5);
        R.fadeOut(tl, "#f06-sel", K.pat - 0.3);
        // Molão bagunçado
        tl.set("#f06-m-wrap", { opacity: 1 }, K.m0 - 0.7);
        tl.fromTo("#f06-m-wrap", { y: 500 }, { y: 0, duration: 0.45, ease: "back.out(1.5)" }, K.m0 - 0.7);
        R.face(tl, "f06m", 0, { eyes: "wide", mouth: "flat" });
        R.pose(tl, "f06m", K.m0, 0.3, { armF: -140, armB: 140 }, "back.out(2)");
        R.face(tl, "f06m", K.infla, { eyes: "normal" });
        tl.set("#f06-hair", { opacity: 1 }, K.bag - 0.1);
        tl.fromTo("#f06-hair", { scale: 0.3, svgOrigin: "1760 580" }, { scale: 1, svgOrigin: "1760 580", duration: 0.3, ease: "back.out(3)" }, K.bag - 0.1);
        R.face(tl, "f06m", K.bag, { eyes: "pain", mouth: "grin" });
        tl.to("#f06-m-wrap", { rotation: 4, svgOrigin: "1760 860", duration: 0.12, yoyo: true, repeat: 5 }, K.bag);
      },
      sfx: [
        { name: "pop", t: k.ant - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.hoje, vol: 0.4 },
        { name: "pop", t: k.fib - 0.1, vol: 0.3 },
        { name: "pop", t: k.des - 0.1, vol: 0.3 },
        { name: "impact-bass-1", t: k.pat, vol: 0.4 },
        { name: "whoosh-short", t: k.m0 - 0.7, vol: 0.35 },
        { name: "pop", t: k.bag - 0.1, vol: 0.4 },
      ],
    };
  },
};
