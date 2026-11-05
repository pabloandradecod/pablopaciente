// F24 — E a infiltração? Gráfico: infiltração alivia rápido e passa; educação + exercício melhor em 2 meses e em 1 ano
export default {
  speakers: { pablo: "f24p" },
  extra: 0.8,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      inf: w(0, "infiltração"), ali: w(0, "aliviar"), rap: w(0, "rápido"), efe: w(0, "efeito"), pas: w(0, "passar"),
      est: w(0, "estudos"), edu: w(0, "educação"), exe: w(0, "exercício"), dois: w(0, "dois"), ano: w(0, "ano"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.inf, vol: 0.35 },
      { name: "pop", t: k.edu, vol: 0.35 },
      { name: "ping", t: k.dois + 0.1, vol: 0.4 },
      { name: "ping", t: k.ano + 0.1, vol: 0.4 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const RED = "M220 720 C245 470 280 430 320 440 S470 590 1120 650";
    const GREEN = "M220 720 C330 560 520 440 1120 330";
    return {
      k,
      sfx,
      css: `
        #f24-head { left:110px; top:60px; font-size:76px; }
        #f24-head span { color:${C.pain}; }
        #f24-l1 { left:240px; top:200px; padding:10px 18px; font-size:28px; }
        #f24-l2 { left:640px; top:200px; padding:10px 18px; font-size:28px; }
        #f24-n1 { left:350px; top:330px; padding:10px 16px; font-size:24px; }
        #f24-n2 { left:690px; top:620px; padding:10px 16px; font-size:24px; }
        #f24-ref { left:240px; top:850px; font-size:22px; opacity:0.7; }
        #root .f24-x { position:absolute; font-family:"Nunito"; font-weight:900; font-size:26px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="900" fill="${C.cream}"/>
      <rect y="900" width="1920" height="180" fill="${C.floor}"/>
      <line x1="0" y1="900" x2="1920" y2="900" stroke="${C.ink}" stroke-width="7"/>
      <rect x="170" y="270" width="1010" height="520" rx="22" fill="#fff" ${st}/>
      <line x1="220" y1="300" x2="220" y2="740" stroke="${C.ink}" stroke-width="6"/>
      <line x1="220" y1="740" x2="1150" y2="740" stroke="${C.ink}" stroke-width="6"/>
      <text x="200" y="320" text-anchor="end" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}" transform="rotate(-90 200 320)">melhora</text>
      <g id="f24-m1" opacity="0"><line x1="540" y1="300" x2="540" y2="740" stroke="${C.ink}" stroke-width="4" stroke-dasharray="12 10"/><circle cx="540" cy="470" r="18" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M531 470 L538 478 L551 461" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>
      <g id="f24-m2" opacity="0"><line x1="1100" y1="300" x2="1100" y2="740" stroke="${C.ink}" stroke-width="4" stroke-dasharray="12 10"/><circle cx="1100" cy="338" r="18" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><path d="M1091 338 L1098 346 L1111 329" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>
      <path id="f24-red" opacity="0" d="${RED}" fill="none" stroke="${C.pain}" stroke-width="12" stroke-linecap="round"/>
      <path id="f24-green" opacity="0" d="${GREEN}" fill="none" stroke="#1E9C72" stroke-width="12" stroke-linecap="round"/>
      <g id="f24-pw"><g transform="translate(1520,690) scale(-1.15,1.15)">${human("f24p", "pablo")}</g></g>
    </svg>
    <div class="f24-x" style="left:200px;top:752px">início</div>
    <div class="f24-x" style="left:490px;top:752px">2 meses</div>
    <div class="f24-x" style="left:1060px;top:752px">1 ano</div>
    <div id="f24-head" class="abs title">E a <span>INFILTRAÇÃO</span>?</div>
    <div id="f24-l1" class="abs card label" style="opacity:0"><span style="color:${C.pain}">━</span> Infiltração de corticoide</div>
    <div id="f24-l2" class="abs card label" style="opacity:0"><span style="color:#1E9C72">━</span> Educação + exercício</div>
    <div id="f24-n1" class="abs card label" style="opacity:0">alivia rápido...</div>
    <div id="f24-n2" class="abs card label" style="opacity:0">...mas o efeito tende a passar</div>
    <div id="f24-ref" class="abs label" style="opacity:0">Estudo LEAP · BMJ, 2018</div>`,
      js: function (tl, K, R) {
        const p = "f24p";
        R.setPose(tl, p, 0, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.face(tl, p, 0, { eyes: "normal" });
        R.blinks(tl, p, 0, K.dur);
        R.idle(tl, p, 0, K.dur, 1.2);
        R.slideIn(tl, "#f24-head", 0.05, 0.5, -300);
        tl.fromTo("#f24-pw", { x: 500 }, { x: 0, duration: 0.6, ease: "power3.out" }, 0.1);
        // infiltração: sobe rápido e cai
        R.pop(tl, "#f24-l1", K.inf - 0.1, 0.35);
        tl.set("#f24-red", { opacity: 1 }, K.ali);
        R.draw(tl, "#f24-red", K.ali, Math.max(1.0, K.pas - K.ali + 0.6), "power1.inOut");
        R.pop(tl, "#f24-n1", K.rap, 0.35);
        R.pop(tl, "#f24-n2", K.efe, 0.35);
        R.gesture(tl, p, K.inf, K.pas, 4);
        // educação + exercício: sobe e fica acima
        R.fadeOut(tl, "#f24-n1, #f24-n2", K.est - 0.2);
        R.pop(tl, "#f24-l2", K.edu - 0.1, 0.35);
        tl.set("#f24-green", { opacity: 1 }, K.edu);
        R.draw(tl, "#f24-green", K.edu, Math.max(1.2, K.ano - K.edu), "power1.inOut");
        R.fadeIn(tl, "#f24-ref", K.est, 0.4);
        R.pop(tl, "#f24-m1", K.dois, 0.4);
        R.pop(tl, "#f24-m2", K.ano, 0.4);
        R.pose(tl, p, K.dois - 0.2, 0.35, { shF: -110, elF: -20 }, "back.out(1.8)");
        R.face(tl, p, K.ano, { eyes: "happy" });
      },
    };
  },
};
