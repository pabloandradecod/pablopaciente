// F23 — Ajudantes: perder peso, cuidar da artrose, controlar o diabetes, infiltração (alguns casos, médico); selo "o principal é tirar a compressão e fortalecer"
export default {
  extra: 0.8,
  build(ctx) {
    const { C, gansa, w } = ctx;
    const k = {
      aj: w(0, "ajudam"), rol: w(0, "peso"), gelo: w(0, "artrose"), ten: w(0, "diabetes"), inf: w(0, "infiltração"), med: w(0, "médico"),
      princ: w(0, "principal"), carga: w(0, "compressão"), forca: w(0, "fortalecer"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = [
      // balança
      `<rect x="-38" y="-30" width="76" height="60" rx="12" fill="#fff" ${st}/><path d="M-20 -8 Q0 -26 20 -8" fill="none" ${st}/><path d="M0 -10 L10 -18" ${st}/>`,
      // joelho (artrose)
      `<path d="M-14 -46 L-14 -8 Q-14 6 0 8 Q14 6 14 -8 L14 -46 Z" fill="${C.bone}" ${st}/><path d="M-14 46 L-14 14 Q0 8 14 14 L14 46 Z" fill="${C.bone}" ${st}/><circle cx="24" cy="0" r="6" fill="${C.pain}"/>`,
      // glicosímetro
      `<rect x="-26" y="-38" width="52" height="76" rx="12" fill="#fff" ${st}/><rect x="-16" y="-26" width="32" height="24" rx="4" fill="${C.sky}" stroke="${C.ink}" stroke-width="4"/><circle cx="0" cy="20" r="8" fill="${C.good}" stroke="${C.ink}" stroke-width="4"/>`,
      // infiltração (seringa)
      `<g transform="rotate(-35)"><rect x="-34" y="-12" width="56" height="24" rx="4" fill="#fff" ${st}/><rect x="-28" y="-6" width="30" height="12" fill="${C.sky}"/><path d="M22 0 L46 0" ${st} stroke-width="4"/><path d="M-34 0 L-48 0 M-48 -12 L-48 12" ${st}/></g>`,
    ];
    const labs = [["Perder peso", "quando necessário"], ["Cuidar da artrose", "junto"], ["Controlar o diabetes", ""], ["Infiltração", "em alguns casos, com o médico"]];
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
        #f23-seal { left:100px; top:720px; width:980px; padding:16px 26px; font-size:38px; text-align:center; background:${C.good}; color:${C.ink}; transform: rotate(-2deg); }
        #f23-seal b { display:inline-block; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="880" fill="${C.cream}"/>
      <rect y="880" width="1920" height="200" fill="${C.floor}"/><line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <circle cx="1450" cy="600" r="300" fill="${C.wall}"/>
      <g id="f23-gw"><g transform="translate(1450,860) scale(1.15)">${gansa("f23g")}</g></g>
    </svg>
    <div id="f23-head" class="abs title">Os <span>AJUDANTES</span></div>
    ${[0, 1, 2, 3].map(card).join("")}
    <div id="f23-seal" class="abs card title" style="opacity:0">O PRINCIPAL: <b id="f23-s0">TIRAR A COMPRESSÃO</b> + <b id="f23-s2">FORTALECER</b></div>`,
      js: function (tl, K, R) {
        const g = "f23g";
        R.setPose(tl, g, 0, { armF: 20, armB: -20 });
        R.face(tl, g, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, g, 0, K.dur);
        R.slideIn(tl, "#f23-head", 0.05, 0.5, -300);
        tl.fromTo("#f23-gw", { y: 400 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, 0.2);
        // perder peso
        R.pop(tl, "#f23-c0", K.rol - 0.1, 0.4);
        R.squash(tl, "#f23g-body", K.rol + 0.1, "50% 100%");
        // artrose: olha para o joelho
        R.pop(tl, "#f23-c1", K.gelo - 0.1, 0.4);
        R.pose(tl, g, K.gelo, 0.3, { neck: 30 });
        R.face(tl, g, K.gelo + 0.2, { eyes: "wide", mouth: "flat" });
        R.pose(tl, g, K.gelo + 1.0, 0.3, { neck: 0 });
        // diabetes
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
        tl.set("#f23-s0, #f23-s2", { opacity: 0.35 }, K.princ + 0.05);
        tl.fromTo("#f23-s0", { opacity: 0.35 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, K.carga);
        tl.fromTo("#f23-s2", { opacity: 0.35 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, K.forca);
        R.pose(tl, g, K.forca, 0.3, { armF: -150, armB: 150 }, "back.out(2)");
        R.face(tl, g, K.forca, { eyes: "happy", mouth: "grin" });
      },
    };
  },
};
