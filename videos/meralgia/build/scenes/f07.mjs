// F7 — Onde ele se aperta: curva fechada na ponta do quadril, túnel sob o ligamento; pressão de fora (Cintão) e de dentro (barriga)
export default {
  speakers: { nervinho: "f07nv" },
  build(ctx) {
    const { C, nervinho, cintao, smooth, w, lines, LILAC } = ctx;
    const k = {
      prob: w(0, "problema"), curva: w(0, "curva"), ponta: w(0, "ponta"), tunel: w(0, "túnel"), lig: w(0, "ligamento"),
      press: w(0, "pressão"), fora: w(0, "fora"), dentro: w(0, "dentro"), aperta: w(0, "aperta"),
      n0: lines[1].start, n1: lines[1].end,
    };
    // face na coxa (embaixo), sobe até a pelve
    const pts = [[1000, 800], [992, 690], [978, 580], [960, 500], [900, 430], [800, 380], [680, 350]];
    const sq = [[1000, 800], [994, 690], [985, 580], [968, 505], [905, 440], [800, 382], [680, 350]];
    k.sq = smooth(sq); k.rel = smooth(pts);
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    return {
      k,
      css: `
        #f07-t { left:110px; top:60px; font-size:56px; }
        #f07-t span { color:${C.pain}; }
        .f07-lab { position:absolute; padding:8px 16px; font-size:30px; background:#fff; border:5px solid ${C.ink}; border-radius:16px; font-family:"Nunito"; font-weight:900; white-space:nowrap; }
        #f07-crit { left:1180px; top:420px; background:${C.pain}; color:#fff; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <!-- zoom: osso do quadril (asa ilíaca) com a ponta (EIAS), coxa embaixo -->
      <path d="M1180 600 Q1260 760 1180 880 L780 880 Q800 760 760 640 Z" fill="#F7D9C2" ${st}/>
      <path d="M380 300 Q620 140 960 260 Q1060 300 1040 410 Q1030 450 990 452 Q930 420 880 470 Q700 520 520 470 Q420 420 380 300 Z" fill="${C.bone}" ${st}/>
      <g id="f07-asis"><circle cx="1012" cy="430" r="26" fill="none" stroke="${C.pain}" stroke-width="7" opacity="0"/></g>
      <!-- ligamento inguinal: faixa da ponta do quadril para baixo/dentro -->
      <path d="M1000 452 Q880 560 640 660" fill="none" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/>
      <path id="f07-lig" d="M1000 452 Q880 560 640 660" fill="none" stroke="#E0A85A" stroke-width="28" stroke-linecap="round"/>
      <g id="f07-tun" opacity="0"><path d="M930 520 Q975 470 1015 530" fill="none" stroke="${C.pain}" stroke-width="10" stroke-dasharray="14 10"/></g>
      <g id="f07-glow" opacity="0"><circle cx="975" cy="520" r="70" fill="${C.pain}" opacity="0.3"/></g>
      <g id="f07-nv-wrap">${nervinho("f07nv", pts, 20, 1.8)}</g>
      <!-- o ligamento passa por cima do nervo -->
      <path d="M1000 452 Q960 490 930 516" fill="none" stroke="${C.ink}" stroke-width="40" stroke-linecap="round"/>
      <path d="M1000 452 Q960 490 930 516" fill="none" stroke="#E0A85A" stroke-width="28" stroke-linecap="round"/>
      <g id="f07-curve" opacity="0"><path d="M880 400 Q990 410 1000 560" fill="none" stroke="${C.ink}" stroke-width="6" stroke-dasharray="12 10"/><path d="M986 540 L1000 566 L1018 544" fill="none" ${st}/></g>
      <!-- pressão de dentro: barriga -->
      <g id="f07-belly" opacity="0"><ellipse cx="560" cy="380" rx="150" ry="110" fill="#FFD3C9" ${st}/><text x="560" y="392" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="34" fill="${C.ink}">barriga</text><path d="M720 400 L860 450" ${st} stroke="${C.pain}" stroke-width="12"/><path d="M836 424 L866 452 L828 468" fill="none" ${st} stroke="${C.pain}" stroke-width="12"/></g>
      <!-- pressão de fora: Cintão -->
      <g id="f07-c-wrap" opacity="0"><g transform="translate(1180,300) scale(0.6)">${cintao("f07c", 220)}</g></g>
      <g id="f07-push" opacity="0"><path d="M1100 380 L1030 450" ${st} stroke="${C.pain}" stroke-width="12"/><path d="M1032 418 L1026 456 L1062 452" fill="none" ${st} stroke="${C.pain}" stroke-width="12"/></g>
    </svg>
    <div id="f07-t" class="abs title">Onde o Nervinho <span>se aperta</span></div>
    <div id="f07-l1" class="f07-lab" style="left:1080px;top:470px;opacity:0;color:${C.pain}">ponta do osso do quadril</div>
    <div id="f07-l2" class="f07-lab" style="left:560px;top:690px;opacity:0">ligamento da virilha</div>
    <div id="f07-l3" class="f07-lab" style="left:1060px;top:560px;opacity:0">túnel estreito</div>
    <div id="f07-l4" class="f07-lab" style="left:470px;top:180px;opacity:0">de dentro</div>
    <div id="f07-l5" class="f07-lab" style="left:1300px;top:170px;opacity:0">de fora</div>
    <div id="f07-crit" class="f07-lab" style="opacity:0;left:1220px;top:640px">PONTO CRÍTICO</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-t", 0, 0.4, -30);
        R.face(tl, "f07nv", 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, "f07nv", 0.3, K.n0);
        // curva fechada
        R.fadeIn(tl, "#f07-curve", K.curva - 0.1, 0.3);
        R.draw(tl, "#f07-curve path", K.curva - 0.1, 0.6);
        tl.to("#f07-asis circle", { opacity: 1, duration: 0.2 }, K.ponta);
        tl.fromTo("#f07-asis circle", { scale: 0.5, svgOrigin: "1012 430" }, { scale: 1, svgOrigin: "1012 430", duration: 0.35, ease: "back.out(3)" }, K.ponta);
        R.pop(tl, "#f07-l1", K.ponta + 0.1, 0.35);
        // túnel sob o ligamento
        R.fadeIn(tl, "#f07-tun", K.tunel, 0.3);
        R.pop(tl, "#f07-l3", K.tunel + 0.1, 0.35);
        R.pop(tl, "#f07-l2", K.lig, 0.35);
        tl.fromTo("#f07-lig", { attr: { "stroke-width": 28 } }, { attr: { "stroke-width": 36 }, duration: 0.2, yoyo: true, repeat: 1 }, K.lig + 0.2);
        R.face(tl, "f07nv", K.tunel + 0.3, { eyes: "wide", mouth: "flat" });
        R.pop(tl, "#f07-crit", K.press - 0.1, 0.4);
        R.fadeOut(tl, "#f07-curve", K.press, 0.3);
        // de fora: Cintão
        tl.set("#f07-c-wrap", { opacity: 1 }, K.fora - 0.3);
        tl.fromTo("#f07-c-wrap", { x: 500 }, { x: 0, duration: 0.4, ease: "back.out(1.4)" }, K.fora - 0.3);
        R.face(tl, "f07c", K.fora - 0.3, { eyes: "normal", mouth: "grin" });
        R.pop(tl, "#f07-push", K.fora + 0.1, 0.3);
        R.pop(tl, "#f07-l5", K.fora, 0.35);
        // de dentro: barriga
        R.pop(tl, "#f07-belly", K.dentro - 0.1, 0.4);
        R.pop(tl, "#f07-l4", K.dentro, 0.35);
        tl.to("#f07-belly ellipse", { scale: 1.1, svgOrigin: "560 380", duration: 0.25, yoyo: true, repeat: 1 }, K.dentro + 0.4);
        // aperta
        R.nerveTo(tl, "f07nv", K.aperta, 0.25, K.sq);
        tl.to("#f07-glow", { opacity: 1, duration: 0.15, yoyo: true, repeat: 5 }, K.aperta);
        R.face(tl, "f07nv", K.aperta, { eyes: "pain", mouth: "frown" });
        R.shake(tl, "#f07-c-wrap", K.aperta, 0.3, 4);
        R.shake(tl, "#f07nv-face", K.n0, K.n1 - K.n0, 4);
        R.face(tl, "f07c", K.n0, { eyes: "happy" });
      },
      sfx: [
        { name: "whoosh-short", t: k.curva - 0.1, vol: 0.35 },
        { name: "pop", t: k.ponta, vol: 0.35 },
        { name: "pop", t: k.tunel, vol: 0.3 },
        { name: "pop", t: k.press - 0.05, vol: 0.4 },
        { name: "whoosh", t: k.fora - 0.3, vol: 0.4 },
        { name: "pop", t: k.dentro, vol: 0.35 },
        { name: "impact-bass-1", t: k.aperta, vol: 0.4 },
      ],
    };
  },
};
