// F27 — Resumo: 3 cartões (telhado, elástico, tartaruga); Seu Zé sem dor termina o teto com o rolo de cabo comprido ao lado da Dona Cida; Seu Acrômio e Supra se cumprimentam
export default {
  speakers: { ze: "f27z" },
  extra: 0.8,
  build(ctx) {
    const { C, human, supra, acromio, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), sobre: w(0, "sobrecarregado"), aj: w(0, "Ajusta"), fort: w(0, "fortalece"), esc: w(0, "escápula"),
      pac: w(0, "paciência"), braco: w(0, "braço"), volta: w(0, "volta"),
      z0: lines[1].start, z1: lines[1].end, teto: w(1, "Teto"), ombro: w(1, "ombro"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.sobre - 0.1, vol: 0.4 },
      { name: "pop", t: k.fort - 0.1, vol: 0.4 },
      { name: "click-soft", t: k.esc, vol: 0.35 },
      { name: "pop", t: k.pac - 0.1, vol: 0.4 },
      { name: "sparkle", t: k.braco, vol: 0.35 },
      { name: "impact-bass-1", t: k.z0, vol: 0.3 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const card = (i, y, svg, html) => `<div id="f27-k${i}" class="abs card f27-k" style="left:1300px;top:${y}px;opacity:0"><svg width="90" height="90" viewBox="-45 -45 90 90">${svg}</svg><div class="label">${html}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f27-head { left:1300px; top:130px; font-size:60px; color:#D23B30; }
        #root .f27-k { width:500px; padding:12px 18px; display:flex; align-items:center; gap:14px; font-size:29px; line-height:1.15; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.wall}"/>
      <rect width="1920" height="100" fill="#D9D2C4"/>
      <rect id="f27-paint" width="1920" height="100" fill="#8FD3C6"/>
      <line x1="0" y1="100" x2="1920" y2="100" stroke="${C.ink}" stroke-width="7"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(1000,880)"><rect x="-40" y="-60" width="80" height="60" rx="8" fill="#7FB3D5" ${st}/><rect x="-46" y="-70" width="92" height="14" rx="6" fill="#5C8FB5" ${st}/></g>
      <!-- Dona Cida -->
      <g id="f27-cw"><g transform="translate(260,667) scale(1.1)">${human("f27c", "cida")}</g></g>
      <!-- Seu Zé com o rolo de cabo comprido -->
      <g id="f27-zw"><g transform="translate(560,667) scale(1.1)"><g id="f27-roller"><rect x="33" y="-560" width="12" height="300" rx="5" fill="#8B5A2B" stroke="${C.ink}" stroke-width="4"/><rect x="-21" y="-590" width="120" height="36" rx="14" fill="#8FD3C6" stroke="${C.ink}" stroke-width="5"/></g>${human("f27z", "ze")}
      </g></g>
      <!-- Supra e Seu Acrômio -->
      <g id="f27-sw" opacity="0"><g transform="translate(1500,880) scale(0.62)">${supra("f27s")}</g></g>
      <g id="f27-aw" opacity="0"><g transform="translate(1660,836) scale(0.6)">${acromio("f27a")}</g></g>
      <g id="f27-spark" opacity="0">${[[700, 260], [460, 300], [820, 420]].map(([x, y]) => `<path d="M${x} ${y - 22} L${x + 6} ${y - 6} L${x + 22} ${y} L${x + 6} ${y + 6} L${x} ${y + 22} L${x - 6} ${y + 6} L${x - 22} ${y} L${x - 6} ${y - 6} Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f27-head" class="abs title">RESUMINDO</div>
    ${card(0, 220, `<path d="M-40 6 Q-36 -30 0 -32 Q36 -30 40 6 Q30 14 20 8 Q0 18 -20 8 Q-30 14 -40 6Z" fill="${C.bone}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M-36 -40 L36 34" stroke="#D23B30" stroke-width="7" stroke-linecap="round"/>`, `Não é só o <b style="color:#D23B30">osso raspando</b>`)}
    ${card(1, 360, `<path d="M-36 20 Q-36 -30 0 -30 Q36 -30 36 20" fill="none" stroke="${C.good}" stroke-width="10" stroke-linecap="round"/><rect x="-46" y="16" width="20" height="16" rx="4" fill="${C.ink}"/><rect x="26" y="16" width="20" height="16" rx="4" fill="${C.ink}"/>`, `<b>Fortalecer</b> o manguito e a escápula`)}
    ${card(2, 500, `<ellipse cx="-4" cy="6" rx="30" ry="20" fill="#4FA36B" stroke="${C.ink}" stroke-width="5"/><circle cx="32" cy="0" r="12" fill="#7CC48E" stroke="${C.ink}" stroke-width="4"/><rect x="22" y="-14" width="22" height="6" rx="3" fill="${C.pain}"/>`, `<b style="color:#2E7D4A">Paciência</b> e constância`)}`,
      js: function (tl, K, R) {
        const z = "f27z", c = "f27c", s = "f27s", a = "f27a";
        // Zé com o braço lá em cima, sem dor
        R.setPose(tl, z, 0, { shB: -165, elB: 0, shF: 20, elF: -40 });
        R.face(tl, z, 0, { eyes: "happy", mouth: "smile" });
        R.setPose(tl, c, 0, { shF: -40, elF: -100, shB: 20, elB: -20 });
        R.face(tl, c, 0, { eyes: "happy", mouth: "smile" });
        R.blinks(tl, c, 0, K.dur, "happy");
        R.slideIn(tl, "#f27-head", 0.05, 0.5, 300);
        // pintando: o Zé vai e volta e o teto fica pronto
        const p0 = 0.3, p1 = K.braco;
        tl.fromTo("#f27-paint", { attr: { width: 700 } }, { attr: { width: 1920 }, duration: p1 - p0, ease: "none" }, p0);
        const n = Math.max(3, Math.floor((p1 - p0) / 0.8));
        for (let i = 0; i < n; i++) tl.to("#f27-zw", { x: i % 2 ? 0 : 160, duration: 0.75, ease: "sine.inOut" }, p0 + i * 0.8);
        // cartões
        R.pop(tl, "#f27-k0", K.sobre - 0.1, 0.4);
        R.pop(tl, "#f27-k1", K.fort - 0.1, 0.4);
        R.pop(tl, "#f27-k2", K.pac - 0.1, 0.4);
        // Supra e Seu Acrômio aparecem e se cumprimentam
        R.setPose(tl, s, 0, { armF: -10, armB: 10 });
        R.setPose(tl, a, 0, { armF: 10, armB: -10 });
        R.face(tl, a, 0, { eyes: "normal", mouth: "flat" });
        R.face(tl, s, 0, { eyes: "normal", mouth: "smile" });
        tl.fromTo("#f27-sw, #f27-aw", { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", stagger: 0.1 }, K.aj - 0.3);
        R.pose(tl, s, K.fort, 0.35, { armF: -75 }, "back.out(1.6)");
        R.pose(tl, a, K.fort, 0.35, { armB: 75 }, "back.out(1.6)");
        for (let i = 0; i < 3; i++) {
          R.pose(tl, s, K.fort + 0.4 + i * 0.3, 0.15, { armF: -65 });
          R.pose(tl, s, K.fort + 0.55 + i * 0.3, 0.15, { armF: -80 });
          R.pose(tl, a, K.fort + 0.4 + i * 0.3, 0.15, { armB: 65 });
          R.pose(tl, a, K.fort + 0.55 + i * 0.3, 0.15, { armB: 80 });
        }
        R.face(tl, a, K.fort + 0.4, { eyes: "happy", mouth: "smile" });
        R.face(tl, s, K.fort + 0.4, { eyes: "happy", mouth: "grin" });
        R.pose(tl, s, K.pac, 0.3, { armF: -10 });
        R.pose(tl, a, K.pac, 0.3, { armB: -10 });
        // braço volta lá pra cima: teto pronto
        tl.to("#f27-zw", { x: 80, duration: 0.3 }, K.braco);
        tl.fromTo("#f27-spark", { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.braco);
        tl.fromTo("#f27-spark path", { scale: 0.4, transformOrigin: "50% 50%" }, { scale: 1.1, duration: 0.3, stagger: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.braco);
        R.pose(tl, c, K.volta, 0.3, { shF: -150, elF: -10 }, "back.out(2)");
        R.face(tl, c, K.volta, { eyes: "happy", mouth: "grin" });
        // fala do Zé: larga o rolo e comemora com os dois braços
        tl.to("#f27-roller", { opacity: 0, duration: 0.2 }, K.z0 - 0.3);
        R.pose(tl, z, K.z0 - 0.3, 0.35, { shF: -160, elF: -10, shB: 160, elB: 10, torso: 0, neck: 0 }, "back.out(2)");
        R.face(tl, z, K.z0, { eyes: "happy", mouth: "grin" });
        tl.to("#f27-zw", { y: -40, duration: 0.2, ease: "power2.out" }, K.ombro);
        tl.to("#f27-zw", { y: 0, duration: 0.25, ease: "power2.in" }, K.ombro + 0.2);
      },
    };
  },
};
