// F28 — Resumo: 3 ideias; Seu Zé carrega a caixa do jeito certo; Vértebra, Disquinho e Geleia se abraçam
export default {
  extra: 0.8,
  build(ctx) {
    const { C, human, vertebra, disquinho, geleia, w } = ctx;
    const k = {
      res: w(0, "Resumindo"), comum: w(0, "comum"), sempre: w(0, "sempre"), maioria: w(0, "maioria"),
      aval: w(0, "Avaliação"), mov: w(0, "movimento"), certo: w(0, "certo"), pac: w(0, "paciência"), corpo: w(0, "corpo"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.35 },
      { name: "pop", t: k.comum, vol: 0.35 }, { name: "pop", t: k.aval, vol: 0.35 }, { name: "pop", t: k.mov, vol: 0.35 },
      { name: "sparkle", t: k.pac, vol: 0.4 },
    ];
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const card = (i, icon, txt) => `<div id="f28-c${i}" class="abs card f28-card" style="top:${150 + i * 150}px;opacity:0"><svg width="80" height="80" viewBox="-40 -40 80 80"><circle r="36" fill="${C.cream}" ${st}/>${icon}</svg><div class="label">${txt}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f28-h { left:110px; top:60px; font-size:56px; color:${C.pain}; }
        #root .f28-card { left:1180px; width:640px; padding:14px 22px; display:flex; gap:18px; align-items:center; font-size:32px; line-height:1.15; }
        #root .f28-card b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <circle cx="560" cy="560" r="320" fill="${C.wall}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f28-zw"><g transform="translate(360,640) scale(1.3)">${human("f28z", "ze")}</g>
        <g transform="translate(456,520)"><rect x="-64" y="-46" width="128" height="92" rx="10" fill="#C99A62" stroke="${C.ink}" stroke-width="7"/><path d="M-64 -14 L64 -14" stroke="${C.ink}" stroke-width="5"/><text x="0" y="26" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="${C.ink}">LIVROS</text></g></g>
      <g id="f28-gang" opacity="0">
        <g id="f28-dw"><g transform="translate(900,880) scale(1.1)">${disquinho("f28d")}</g></g>
        <g id="f28-vw"><g transform="translate(640,880) scale(1.1)">${vertebra("f28v")}</g></g>
        <g id="f28-gw"><g transform="translate(1120,880) scale(0.6)">${geleia("f28g")}</g></g>
        <g id="f28-heart" opacity="0"><path d="M880 470 C860 440 820 450 820 482 C820 510 880 540 880 560 C880 540 940 510 940 482 C940 450 900 440 880 470Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="6"/></g>
      </g>
    </svg>
    <div id="f28-h" class="abs title">RESUMINDO</div>
    ${card(0, `<rect x="-22" y="-8" width="44" height="18" rx="6" fill="${C.bone}" ${st}/><ellipse cx="0" cy="-8" rx="22" ry="7" fill="#FBF5E6" ${st}/><ellipse cx="16" cy="2" rx="8" ry="6" fill="${C.sky}" ${st}/>`, "Hérnia é <b>comum</b>, nem sempre dói, e a maioria <b>melhora sem cirurgia</b>")}
    ${card(1, `<circle cx="-6" cy="-6" r="16" fill="#fff" ${st}/><path d="M6 6 L22 22" ${st} stroke-width="9"/>`, "<b>Avaliação</b> bem feita")}
    ${card(2, `<path d="M-24 10 L-6 -12 L10 4 L24 -14" fill="none" ${st} stroke-width="7"/><path d="M-26 18 L26 18" ${st}/>`, "Movimento do <b>jeito certo</b> + paciência")}`,
      js: function (tl, K, R) {
        const z = "f28z";
        R.setPose(tl, z, 0, { shF: -60, elF: -80, shB: -56, elB: -80 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f28-h", 0.05, 0.5, -300);
        // carregando a caixa, passinhos
        tl.fromTo("#f28-zw", { x: -360 }, { x: 0, duration: 2.4, ease: "power1.out" }, 0.1);
        for (let i = 0; i < 6; i++) {
          const t = 0.1 + i * 0.4;
          R.pose(tl, z, t, 0.2, { hipF: i % 2 ? 22 : -22, hipB: i % 2 ? -22 : 22, knF: i % 2 ? 0 : 18, knB: i % 2 ? 18 : 0 }, "sine.inOut");
        }
        R.pose(tl, z, 2.5, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0 });
        R.pop(tl, "#f28-c0", K.comum - 0.15, 0.4);
        R.face(tl, z, K.maioria, { eyes: "happy", mouth: "grin" });
        R.pop(tl, "#f28-c1", K.aval - 0.1, 0.4);
        R.pop(tl, "#f28-c2", K.mov - 0.1, 0.4);
        // turma se abraça
        tl.to("#f28-zw", { x: -260, opacity: 0.0, duration: 0.5, ease: "power2.in" }, K.pac - 0.6);
        tl.set("#f28-gang", { opacity: 1 }, K.pac - 0.3);
        tl.fromTo("#f28-vw", { x: -300 }, { x: 0, duration: 0.5, ease: "back.out(1.5)" }, K.pac - 0.3);
        tl.fromTo("#f28-gw", { x: 300 }, { x: 0, duration: 0.5, ease: "back.out(1.5)" }, K.pac - 0.2);
        tl.fromTo("#f28-dw", { y: 300 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, K.pac - 0.3);
        ["f28v", "f28d", "f28g"].forEach((id) => { R.face(tl, id, K.pac, { eyes: "happy", mouth: "grin" }); });
        R.pose(tl, "f28v", K.pac + 0.2, 0.3, { armF: -100, armB: 100 }, "back.out(2)");
        R.pose(tl, "f28d", K.pac + 0.2, 0.3, { armF: -100, armB: 100 }, "back.out(2)");
        R.pose(tl, "f28g", K.pac + 0.2, 0.3, { armF: -120, armB: 120 }, "back.out(2)");
        R.pop(tl, "#f28-heart", K.corpo - 0.2, 0.45);
        R.squash(tl, "#f28d-body", K.corpo);
      },
    };
  },
};
