// F23 — Ajudantes: rolinho/massagem, gelo na crise, tênis em bom estado, infiltração (casos persistentes, médico); selo "o principal é carga + passada + força"
export default {
  extra: 0.8,
  build(ctx) {
    const { C, gordurinha, w } = ctx;
    const k = {
      aj: w(0, "ajudam"), rol: w(0, "rolinho"), gelo: w(0, "gelo"), ten: w(0, "tênis"), inf: w(0, "Infiltração"), med: w(0, "médico"),
      princ: w(0, "principal"), carga: w(0, "carga"), pass: w(0, "passada"), forca: w(0, "força"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      // rolinho de espuma
      `<rect x="-42" y="-18" width="84" height="36" rx="18" fill="#8E6CD8" ${st}/><path d="M-26 -18 L-26 18 M-8 -18 L-8 18 M10 -18 L10 18 M28 -18 L28 18" stroke="#B79CF2" stroke-width="5"/>`,
      // gelo
      `<rect x="-30" y="-30" width="60" height="60" rx="10" fill="#CFEFF7" ${st} transform="rotate(12)"/><path d="M-12 -14 L6 -20" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`,
      // tênis
      `<path d="M-46 14 L-40 -14 Q-20 -10 -10 -24 L20 -6 Q44 0 46 14 Z" fill="${C.pain}" ${st}/><path d="M-46 14 L46 14 L44 24 L-46 24 Z" fill="#fff" ${st}/><path d="M-14 -12 L-4 -4 M-4 -18 L6 -10" stroke="#fff" stroke-width="4"/>`,
      // infiltração (seringa)
      `<g transform="rotate(-35)"><rect x="-34" y="-12" width="56" height="24" rx="4" fill="#fff" ${st}/><rect x="-28" y="-6" width="30" height="12" fill="${C.sky}"/><path d="M22 0 L46 0" ${st} stroke-width="4"/><path d="M-34 0 L-48 0 M-48 -12 L-48 12" ${st}/></g>`,
    ];
    const labs = [["Rolinho ou massagem", "alívio"], ["Gelo depois do treino", "na fase de crise"], ["Tênis em bom estado", ""], ["Infiltração", "casos persistentes, com o médico"]];
    const pos = [[110, 220], [570, 220], [110, 470], [570, 470]];
    const card = (i) => `<div id="f23-c${i}" class="abs card f23-card" style="left:${pos[i][0]}px;top:${pos[i][1]}px;opacity:0">
        <svg width="120" height="120" viewBox="-60 -60 120 120"><circle r="54" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/>${icons[i]}</svg>
        <div class="label f23-t">${labs[i][0]}<br><span>${labs[i][1]}</span></div></div>`;
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.rol, vol: 0.35 },
      { name: "pop", t: k.gelo, vol: 0.35 },
      { name: "pop", t: k.ten, vol: 0.35 },
      { name: "pop", t: k.inf, vol: 0.35 },
      { name: "impact-bass-1", t: k.princ + 0.1, vol: 0.4 },
    ];
    return {
      k,
      sfx,
      css: `
        #f23-head { left:110px; top:70px; font-size:72px; }
        #f23-head span { color:${C.good}; }
        #root .f23-card { width:420px; height:200px; padding:18px; display:flex; align-items:center; gap:16px; }
        #root .f23-t { font-size:30px; line-height:1.15; }
        #root .f23-t span { font-size:24px; color:${C.grey}; }
        #f23-seal { left:120px; top:720px; width:880px; padding:16px 26px; font-size:38px; text-align:center; background:${C.good}; color:${C.ink}; transform: rotate(-2deg); }
        #f23-seal b { display:inline-block; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1450" cy="600" r="300" fill="${C.wall}"/>
      <g id="f23-gw"><g transform="translate(1450,860) scale(1.6)">${gordurinha("f23g")}</g></g>
      <!-- rolinho passando -->
      <g id="f23-roll" opacity="0"><g transform="translate(1450,560)"><rect x="-110" y="-26" width="220" height="52" rx="26" fill="#8E6CD8" stroke="${C.ink}" stroke-width="6"/><path d="M-70 -26 L-70 26 M-30 -26 L-30 26 M10 -26 L10 26 M50 -26 L50 26" stroke="#B79CF2" stroke-width="6"/></g></g>
      <!-- bolsa de gelo -->
      <g id="f23-ice" opacity="0"><g transform="translate(1600,620) rotate(14)"><rect x="-50" y="-34" width="100" height="68" rx="16" fill="#CFEFF7" stroke="${C.ink}" stroke-width="6"/><path d="M-30 -14 L-6 -22" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g></g>
      <g id="f23-sw" opacity="0"><g transform="translate(1290,640)"><path d="M0 0 Q-10 -20 0 -40" stroke="#7FC4E0" stroke-width="5" fill="none"/></g></g>
    </svg>
    <div id="f23-head" class="abs title">Os <span>AJUDANTES</span></div>
    ${[0, 1, 2, 3].map(card).join("")}
    <div id="f23-seal" class="abs card title" style="opacity:0">O PRINCIPAL: <b id="f23-s0">CARGA</b> + <b id="f23-s1">PASSADA</b> + <b id="f23-s2">FORÇA</b></div>`,
      js: function (tl, K, R) {
        const g = "f23g";
        R.setPose(tl, g, 0, { armF: 20, armB: -20 });
        R.face(tl, g, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, g, 0, K.dur);
        R.slideIn(tl, "#f23-head", 0.05, 0.5, -300);
        tl.fromTo("#f23-gw", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        // rolinho/massagem: o rolo passa por cima e ela relaxa
        R.pop(tl, "#f23-c0", K.rol - 0.1, 0.4);
        tl.set("#f23-roll", { opacity: 1 }, K.rol);
        tl.fromTo("#f23-roll", { x: -260 }, { x: 260, duration: 1.2, ease: "sine.inOut" }, K.rol);
        tl.to("#f23-roll", { opacity: 0, duration: 0.2 }, K.rol + 1.2);
        R.face(tl, g, K.rol + 0.3, { eyes: "closed", mouth: "smile" });
        // gelo
        R.pop(tl, "#f23-c1", K.gelo - 0.1, 0.4);
        R.pop(tl, "#f23-ice", K.gelo + 0.1, 0.35);
        R.face(tl, g, K.gelo + 0.2, { eyes: "wide", mouth: "grin" });
        R.shake(tl, "#f23-gw", K.gelo + 0.2, 0.4, 3);
        tl.to("#f23-ice", { opacity: 0, duration: 0.3 }, K.ten - 0.2);
        // tênis
        R.pop(tl, "#f23-c2", K.ten - 0.1, 0.4);
        R.face(tl, g, K.ten + 0.2, { eyes: "happy", mouth: "smile" });
        // infiltração: só com o médico
        R.pop(tl, "#f23-c3", K.inf - 0.1, 0.4);
        R.face(tl, g, K.inf, { eyes: "wide", mouth: "flat" });
        R.pose(tl, g, K.med, 0.3, { armF: -120, armB: 20 }, "back.out(2)");
        // o principal
        R.face(tl, g, K.princ, { eyes: "normal", mouth: "smile" });
        tl.to(".f23-card", { opacity: 0.45, scale: 0.94, duration: 0.3 }, K.princ);
        tl.fromTo("#f23-seal", { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in" }, K.princ + 0.05);
        tl.set("#f23-s0, #f23-s1, #f23-s2", { opacity: 0.35 }, K.princ + 0.05);
        [K.carga, K.pass, K.forca].forEach((t, i) => tl.fromTo(`#f23-s${i}`, { opacity: 0.35 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, t));
        R.pose(tl, g, K.forca, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, g, K.forca, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
