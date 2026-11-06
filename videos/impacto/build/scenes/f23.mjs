// F23 — E a infiltração? E a cirurgia? Seringa (alívio de curto prazo, ajuda a fazer exercício, com o médico) × bisturi (descompressão na maioria NÃO é melhor que exercício); pódio com o EXERCÍCIO em 1º
export default {
  extra: 0.8,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      inf: w(0, "infiltração"), ali: w(0, "aliviar"), sem: w(0, "semanas"), aju: w(0, "ajudar"), ind: w(0, "indicação"),
      cir: w(0, "cirurgia"), desc: w(0, "descompressão"), mai: w(0, "maioria"), traz: w(0, "traz"), mel: w(0, "melhor"), prog: w(0, "programa"), exe: w(0, "exercícios", 1),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    return {
      k,
      css: `
        #f23-q { left:0; right:0; top:50px; text-align:center; font-size:66px; }
        #f23-q span { color:${C.pain}; }
        #root .f23-card { top:200px; width:640px; padding:22px 26px; }
        #root .f23-card .h { font-size:40px; }
        #root .f23-card .t { font-size:28px; margin-top:10px; line-height:1.25; }
        #f23-c0 { left:150px; }
        #f23-c1 { left:1130px; }
        #f23-no { color:${C.pain}; }
        #f23-pod { left:0; right:0; top:610px; text-align:center; }
        #f23-win { left:770px; top:420px; width:380px; text-align:center; font-size:46px; color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="${C.wall}"/>
      <rect y="860" width="1920" height="220" fill="${C.floor}"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f23-podium" opacity="0">
        <rect x="560" y="700" width="260" height="160" fill="#C0C7CC" ${st}/><text x="690" y="800" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="64" fill="${C.ink}">2</text>
        <rect x="830" y="600" width="260" height="260" fill="${C.sun}" ${st}/><text x="960" y="740" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="80" fill="${C.ink}">1</text>
        <rect x="1100" y="750" width="260" height="110" fill="#E0A574" ${st}/><text x="1230" y="830" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="56" fill="${C.ink}">3</text>
        <g transform="translate(690,650)"><rect x="-14" y="-60" width="28" height="70" rx="8" fill="#fff" ${st}/><rect x="-4" y="-80" width="8" height="24" fill="#999" stroke="${C.ink}" stroke-width="3"/></g>
        <g transform="translate(1230,700) rotate(-30)"><rect x="-8" y="-60" width="16" height="70" rx="6" fill="#ddd" ${st}/><path d="M-8 -60 L0 -90 L8 -60 Z" fill="#eee" ${st}/></g>
        <g transform="translate(960,540)"><g id="f23-band"><rect x="-70" y="-26" width="140" height="52" rx="18" fill="${C.pain}" ${st}/><g transform="translate(-46,0)"><rect x="-8" y="-20" width="16" height="40" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/></g><g transform="translate(46,0)"><rect x="-8" y="-20" width="16" height="40" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/></g><rect x="-38" y="-6" width="76" height="12" rx="4" fill="#555"/></g></g>
      </g>
      <g id="f23-p-wrap" opacity="0"><g transform="translate(1600,640) scale(1.2)">${human("f23p", "pablo")}</g></g>
    </svg>
    <div id="f23-q" class="abs title">E a <span>infiltração</span>? E a <span>cirurgia</span>?</div>
    <div id="f23-c0" class="abs card f23-card" style="opacity:0">
      <svg width="580" height="110" viewBox="0 0 580 110"><g transform="translate(40,55)">
        <rect x="40" y="-22" width="300" height="44" rx="10" fill="#E8F6FB" ${st}/><rect id="f23-liq" x="44" y="-18" width="220" height="36" rx="8" fill="#9FD8F0"/>
        <rect x="340" y="-6" width="160" height="12" fill="#ccc" stroke="${C.ink}" stroke-width="4"/>
        <rect x="0" y="-32" width="40" height="64" rx="8" fill="#fff" ${st}/><rect x="-20" y="-8" width="60" height="16" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
      </g></svg>
      <div class="h title">INFILTRAÇÃO</div>
      <div class="t label" id="f23-t0" style="opacity:0">alívio de <b>curto prazo</b> (algumas semanas)</div>
      <div class="t label" id="f23-t1" style="opacity:0">pode ajudar a fazer os exercícios, <b>com o médico</b></div>
    </div>
    <div id="f23-c1" class="abs card f23-card" style="opacity:0">
      <svg width="580" height="110" viewBox="0 0 580 110"><g transform="translate(60,55)">
        <rect x="0" y="-14" width="260" height="28" rx="10" fill="#7FB3D5" ${st}/>
        <path d="M260 -14 L420 -14 Q470 -4 480 14 L260 14 Z" fill="#E6E6E6" ${st}/>
      </g></svg>
      <div class="h title">CIRURGIA DE DESCOMPRESSÃO</div>
      <div class="t label" id="f23-t2" style="opacity:0">na maioria dos casos, <b id="f23-no">NÃO é melhor</b> que um bom programa de exercícios</div>
    </div>
    <div id="f23-win" class="abs title" style="opacity:0">EXERCÍCIO</div>`,
      js: function (tl, K, R) {
        const p = "f23p";
        R.rise(tl, "#f23-q", 0.05, 0.45, -30);
        R.pop(tl, "#f23-c0", K.inf - 0.2, 0.45, 0.6);
        tl.to("#f23-liq", { attr: { width: 40 }, duration: 1.2, ease: "power2.inOut" }, K.ali);
        R.rise(tl, "#f23-t0", K.ali, 0.35, 14);
        R.rise(tl, "#f23-t1", K.aju - 0.1, 0.35, 14);
        R.pop(tl, "#f23-c1", K.cir - 0.2, 0.45, 0.6);
        R.rise(tl, "#f23-t2", K.mai - 0.1, 0.35, 14);
        tl.to("#f23-c1", { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1 }, K.mel);
        // pódio: o exercício em 1º lugar
        tl.to("#f23-c0, #f23-c1, #f23-q", { opacity: 0, y: -40, duration: 0.35, ease: "power2.in" }, K.prog - 0.6);
        tl.set("#f23-podium", { opacity: 1 }, K.prog - 0.3);
        tl.fromTo("#f23-podium", { y: 400 }, { y: 0, duration: 0.55, ease: "back.out(1.4)" }, K.prog - 0.3);
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "smile" });
        tl.set("#f23-p-wrap", { opacity: 1 }, K.prog - 0.3);
        tl.fromTo("#f23-p-wrap", { x: 500 }, { x: 0, duration: 0.5, ease: "back.out(1.3)" }, K.prog - 0.3);
        tl.fromTo("#f23-band", { y: -500 }, { y: 0, duration: 0.6, ease: "bounce.out" }, K.exe - 0.3);
        R.pop(tl, "#f23-win", K.exe + 0.2, 0.45);
        R.pose(tl, p, K.exe + 0.2, 0.35, { shF: -160, elF: -10 }, "back.out(2)");
        R.face(tl, p, K.exe + 0.2, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "whoosh", t: 0.05, vol: 0.3 },
        { name: "pop", t: k.inf - 0.2, vol: 0.35 },
        { name: "pop", t: k.cir - 0.2, vol: 0.35 },
        { name: "impact-bass-1", t: k.mel, vol: 0.3 },
        { name: "whoosh", t: k.prog - 0.3, vol: 0.35 },
        { name: "chime", t: k.exe + 0.2, vol: 0.4 },
      ],
    };
  },
};
