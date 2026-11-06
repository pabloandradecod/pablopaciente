// F18 — Passo 1: ajustar a carga — teto pela metade com placa PAUSA, rolo de cabo comprido, pausas a cada 20 min, dormir abraçado no travesseiro; Dona Cida termina o teto
export default {
  speakers: { cida: "f18c" },
  extra: 0.6,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      prim: w(0, "Primeiro"), ajust: w(0, "ajustar"), dimin: w(0, "Diminuir"), cab: w(0, "cabeça"), cabo: w(0, "cabo"), pausas: w(0, "pausas"),
      dormir: w(0, "dormir"), abr: w(0, "abraçar"), trav: w(0, "travesseiro"), desc: w(0, "descansar"),
      c0: lines[1].start, c1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    // rolo de cabo comprido: o cabo sai da mão (pose shF -150 → mão em (71,-254)) seguindo a direção do braço
    const roller = (id, hx, hy, dx, dy, len) => `<g id="${id}" opacity="0"><line x1="${hx}" y1="${hy}" x2="${hx + dx * len}" y2="${hy + dy * len}" stroke="#8B5A2B" stroke-width="12" stroke-linecap="round"/><line x1="${hx}" y1="${hy}" x2="${hx + dx * len}" y2="${hy + dy * len}" stroke="${C.ink}" stroke-width="3" opacity="0.4"/><rect x="${hx + dx * len - 60}" y="${hy + dy * len - 22}" width="120" height="36" rx="14" fill="#8FD3C6" stroke="${C.ink}" stroke-width="5"/></g>`;
    return {
      k,
      css: `
        #f18-head { left:110px; top:240px; font-size:66px; }
        #f18-head span { color:#1E9C72; }
        #f18-tips { left:110px; top:350px; width:470px; padding:18px 24px; }
        #f18-tips .row { font-size:30px; margin:8px 0; display:flex; align-items:center; gap:14px; opacity:0; }
        #f18-tips .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f18-clock { left:1480px; top:560px; width:330px; padding:16px; text-align:center; }
        #f18-clock .t { font-size:28px; margin-top:6px; }
        #f18-pausa { left:820px; top:60px; padding:8px 22px; font-size:46px; color:#fff; background:${C.pain}; border:6px solid ${C.ink}; border-radius:14px; transform:rotate(-3deg); }
        #f18-sleep { left:1240px; top:250px; width:560px; padding:16px 20px; font-size:32px; text-align:center; }
        #f18-bal { left:520px; top:290px; width:520px; padding:16px 22px; font-size:38px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g id="f18-room">
        <rect width="1920" height="1080" fill="${C.wall}"/>
        <rect width="1920" height="200" fill="#D9D2C4"/>
        <rect id="f18-paint" width="960" height="200" fill="#8FD3C6"/>
        <line x1="0" y1="200" x2="1920" y2="200" stroke="${C.ink}" stroke-width="7"/>
        <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
        <g transform="translate(1700,880)"><rect x="-40" y="-60" width="80" height="60" rx="8" fill="#7FB3D5" ${st}/><rect x="-46" y="-70" width="92" height="14" rx="6" fill="#5C8FB5" ${st}/></g>
      </g>
      <g id="f18-z-wrap"><g transform="translate(900,700) scale(1.2)">${human("f18z", "ze")}${roller("f18-roll", 71, -254, 0.5, -0.866, 200)}</g></g>
      <g id="f18-c-wrap" opacity="0"><g transform="translate(1250,700) scale(1.2)">${human("f18c", "cida")}${roller("f18-croll", 50, -264, 0.342, -0.94, 170)}</g></g>
      <!-- noite: Seu Zé abraçado no travesseiro -->
      <g id="f18-night" opacity="0">
        <rect width="1920" height="1080" fill="#2E3E66"/>
        <circle cx="1600" cy="160" r="70" fill="#FFF3B8" stroke="${C.ink}" stroke-width="6"/><circle cx="1630" cy="140" r="60" fill="#2E3E66"/>
        <rect x="320" y="640" width="1000" height="80" rx="20" fill="#fff" ${st}/><rect x="320" y="712" width="1000" height="44" rx="12" fill="#8B5A2B" ${st}/>
        <rect x="340" y="560" width="160" height="90" rx="34" fill="#BFE6EE" ${st}/>
        <g><circle cx="440" cy="570" r="50" fill="${C.skinB}" ${st}/><path d="M414 568 Q426 576 438 568" stroke="${C.ink}" stroke-width="4" fill="none"/><path d="M422 592 Q440 600 458 592" stroke="#C9C9C9" stroke-width="10" stroke-linecap="round"/></g>
        <path d="M480 600 Q900 540 1320 620 L1320 660 L480 660 Z" fill="#7FB3D5" ${st}/>
        <g id="f18-hug"><rect x="520" y="520" width="170" height="90" rx="36" fill="#FFE7A3" ${st}/>
          <path d="M500 560 Q560 530 640 560 Q660 572 640 586" fill="none" stroke="${C.ink}" stroke-width="${30 + 14}" stroke-linecap="round"/>
          <path d="M500 560 Q560 530 640 560 Q660 572 640 586" fill="none" stroke="#5C8FB5" stroke-width="30" stroke-linecap="round"/>
          <circle cx="640" cy="588" r="18" fill="${C.skinB}" stroke="${C.ink}" stroke-width="5"/></g>
        <text id="f18-zzz" x="520" y="430" font-family="Montserrat" font-weight="900" font-size="60" fill="#fff" opacity="0">z z z</text>
        <rect y="880" width="1920" height="200" fill="#3D4F7A"/>
      </g>
    </svg>
    <div id="f18-pausa" class="abs title" style="opacity:0">PAUSA</div>
    <div id="f18-head" class="abs title" style="opacity:0">Passo 1: <span>ajustar a carga</span></div>
    <div id="f18-tips" class="abs card" style="opacity:0">
      <div class="row label" id="f18-t0"><span class="dot"></span>menos braço acima da cabeça</div>
      <div class="row label" id="f18-t1"><span class="dot"></span>rolo de cabo comprido</div>
      <div class="row label" id="f18-t2"><span class="dot"></span>pausas no trabalho</div>
    </div>
    <div id="f18-clock" class="abs card" style="opacity:0">
      <svg width="140" height="140" viewBox="-70 -70 140 140"><circle r="60" fill="#fff" stroke="${C.ink}" stroke-width="7"/><path d="M0 0 L0 -60 A60 60 0 0 1 52 -30 Z" fill="${C.good}" opacity="0.6"/><line id="f18-hand" x1="0" y1="0" x2="0" y2="-44" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><circle r="7" fill="${C.ink}"/></svg>
      <div class="t label">pausas a cada <b style="color:#1E9C72">20 min</b></div>
    </div>
    <div id="f18-sleep" class="abs card label" style="opacity:0">abraçar um travesseiro: o ombro <b style="color:#1E9C72">descansa</b></div>
    <div id="f18-bal" class="abs card label" style="opacity:0">Deixa que o resto do teto <b style="color:${C.purple}">eu termino!</b></div>`,
      js: function (tl, K, R) {
        const z = "f18z", c = "f18c";
        R.setPose(tl, z, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0.4, K.dormir);
        R.rise(tl, "#f18-head", K.prim - 0.2, 0.45, 30);
        R.pop(tl, "#f18-pausa", K.ajust, 0.4);
        R.pop(tl, "#f18-tips", K.dimin - 0.3, 0.4, 0.7);
        R.rise(tl, "#f18-t0", K.dimin, 0.3, 14);
        // rolo de cabo comprido: braço bem mais baixo
        R.rise(tl, "#f18-t1", K.cabo - 0.2, 0.3, 14);
        R.pose(tl, z, K.cabo - 0.1, 0.4, { shF: -150, elF: 0 }, "power2.out");
        tl.to("#f18-roll", { opacity: 1, duration: 0.2 }, K.cabo + 0.2);
        for (let i = 0; i < 3; i++) tl.to("#f18-z-wrap", { x: i % 2 ? 0 : 160, duration: 0.5, ease: "sine.inOut" }, K.cabo + 0.4 + i * 0.5);
        // pausas
        R.rise(tl, "#f18-t2", K.pausas - 0.2, 0.3, 14);
        R.pop(tl, "#f18-clock", K.pausas - 0.1, 0.4);
        tl.fromTo("#f18-hand", { rotation: 0, svgOrigin: "0 0" }, { rotation: 120, svgOrigin: "0 0", duration: 1, ease: "power2.inOut" }, K.pausas + 0.2);
        tl.to("#f18-roll", { opacity: 0, duration: 0.2 }, K.pausas + 0.8);
        R.pose(tl, z, K.pausas + 0.8, 0.4, { shF: 10, elF: -10 });
        R.face(tl, z, K.pausas + 1, { eyes: "happy", mouth: "smile" });
        // noite: abraçado no travesseiro
        tl.to("#f18-room, #f18-z-wrap, #f18-head, #f18-tips, #f18-clock, #f18-pausa", { opacity: 0, duration: 0.3 }, K.dormir - 0.3);
        tl.to("#f18-night", { opacity: 1, duration: 0.3 }, K.dormir - 0.3);
        tl.fromTo("#f18-hug", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, K.abr);
        R.pop(tl, "#f18-sleep", K.trav - 0.1, 0.4);
        tl.to("#f18-zzz", { opacity: 1, duration: 0.3 }, K.desc - 0.2);
        tl.to("#f18-zzz", { y: -30, duration: 1.4, ease: "sine.inOut" }, K.desc - 0.2);
        // Dona Cida termina o teto
        tl.to("#f18-night, #f18-sleep", { opacity: 0, duration: 0.3 }, K.c0 - 0.5);
        tl.to("#f18-room, #f18-pausa", { opacity: 1, duration: 0.3 }, K.c0 - 0.5);
        tl.set("#f18-z-wrap", { x: -500 }, K.c0 - 0.5);
        tl.to("#f18-z-wrap", { opacity: 1, duration: 0.3 }, K.c0 - 0.5);
        R.fadeOut(tl, "#f18-pausa", K.c0 + 0.2);
        R.setPose(tl, c, 0, { shF: -160, elF: 0, shB: 10, elB: -20 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "grin" });
        tl.set("#f18-croll", { opacity: 1 }, 0);
        tl.set("#f18-c-wrap", { opacity: 1 }, K.c0 - 0.5);
        tl.fromTo("#f18-c-wrap", { x: 500 }, { x: 0, duration: 0.5, ease: "back.out(1.3)" }, K.c0 - 0.5);
        R.pop(tl, "#f18-bal", K.c0, 0.4);
        tl.to("#f18-paint", { attr: { width: 1920 }, duration: Math.max(1.2, K.c1 - K.c0 + 0.6), ease: "none" }, K.c0);
        const n = Math.max(2, Math.floor((K.c1 - K.c0 + 0.6) / 0.5));
        for (let i = 0; i < n; i++) tl.to("#f18-c-wrap", { x: i % 2 ? 0 : 220, duration: 0.48, ease: "sine.inOut" }, K.c0 + i * 0.5);
        R.face(tl, z, K.c0, { eyes: "wide", mouth: "smile" });
      },
      sfx: [
        { name: "whoosh", t: Math.max(0, k.prim - 0.2), vol: 0.35 },
        { name: "pop", t: k.ajust, vol: 0.4 },
        { name: "pop", t: k.cabo - 0.2, vol: 0.3 },
        { name: "click-soft", t: k.pausas - 0.1, vol: 0.35 },
        { name: "whoosh", t: k.dormir - 0.3, vol: 0.35 },
        { name: "pop", t: k.trav - 0.1, vol: 0.3 },
        { name: "whoosh-short", t: k.c0 - 0.5, vol: 0.4 },
      ],
    };
  },
};
