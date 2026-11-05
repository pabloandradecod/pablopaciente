// F7 — As três caixas: gigante (inespecífica ~90%), média (dor no nervo), minúscula (grave <1%); Seu Zé cai na gigante
export default {
  build(ctx) {
    const { C, human, geleia, w } = ctx;
    const k = {
      tres: w(0, "três"), gig: w(0, "gigante"), nov: w(0, "noventa"), ines: w(0, "inespecífica"), les: w(0, "lesão"),
      menor: w(0, "menor"), perna: w(0, "perna"), hern: w(0, "hérnia"), min: w(0, "minúscula"), um: w(0, "um", 2), grav: w(0, "graves"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const box = (id, x, y, wd, h, col, back) => `
      <g id="${id}-back"><rect x="${x + 10}" y="${y - 30}" width="${wd - 20}" height="40" fill="${back}" ${st}/></g>`;
    const front = (id, x, y, wd, h, col) => `<g id="${id}"><rect x="${x}" y="${y}" width="${wd}" height="${h}" rx="10" fill="${col}" ${st}/>
        <path d="M${x} ${y} L${x - wd * 0.12} ${y - h * 0.18} L${x + wd * 0.38} ${y - h * 0.18} L${x + wd * 0.5} ${y} Z" fill="${col}" ${st}/>
        <path d="M${x + wd} ${y} L${x + wd * 1.12} ${y - h * 0.18} L${x + wd * 0.62} ${y - h * 0.18} L${x + wd * 0.5} ${y} Z" fill="${col}" ${st}/>
        <path d="M${x + wd * 0.5} ${y + 10} L${x + wd * 0.5} ${y + h - 10}" stroke="#A97A44" stroke-width="10" stroke-dasharray="20 14"/></g>`;
    return {
      k,
      css: `
        #f07-ttl { left:0; right:0; top:60px; text-align:center; font-size:68px; }
        #f07-ttl span { color:${C.pain}; }
        .f07-lab { text-align:center; }
        #f07-l0 { left:150px; top:600px; width:640px; } #f07-l0 .p { font-size:110px; color:${C.ink}; } #f07-l0 .t { font-size:40px; }
        #f07-l1 { left:900px; top:640px; width:400px; } #f07-l1 .t { font-size:34px; }
        #f07-l2 { left:1360px; top:620px; width:300px; } #f07-l2 .p { font-size:40px; color:${C.pain}; } #f07-l2 .t { font-size:22px; }
        #f07-les { left:220px; top:230px; padding:12px 22px; font-size:30px; transform: rotate(-3deg); }
        #f07-ep { left:930px; top:380px; padding:10px 18px; font-size:26px; }
        #f07-grv { left:1430px; top:420px; padding:10px 16px; font-size:22px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g id="f07-b0w" style="opacity:0">${box("f07-b0", 150, 420, 640, 460, "#D9AE77", "#B8874F")}
        <g id="f07-z-wrap" style="opacity:0"><g transform="translate(470,470) scale(0.8)">${human("f07z", "ze")}</g></g>
        ${front("f07-b0", 150, 420, 640, 460, "#D9AE77")}</g>
      <g id="f07-b1w" style="opacity:0">${box("f07-b1", 920, 640, 360, 240, "#E8C08A", "#C69A60")}
        <g id="f07-g-wrap"><g transform="translate(1100,650) scale(0.55)">${geleia("f07g")}</g></g>
        ${front("f07-b1", 920, 640, 360, 240, "#E8C08A")}
        <path d="M1040 700 L1060 740 L1040 760 L1066 800" fill="none" stroke="${C.pain}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
      <g id="f07-b2w" style="opacity:0">${front("f07-b2", 1460, 800, 120, 80, "#F0D3A8")}
        <g transform="translate(1520,775)"><line x1="0" y1="0" x2="0" y2="-50" stroke="${C.ink}" stroke-width="5"/><path d="M0 -50 L30 -40 L0 -30 Z" fill="${C.pain}" stroke="${C.ink}" stroke-width="4"/></g></g>
    </svg>
    <div id="f07-ttl" class="abs title">As <span>3 caixas</span> da dor lombar</div>
    <div id="f07-l0" class="abs f07-lab label" style="opacity:0"><div class="p title">~90%</div><div class="t">INESPECÍFICA</div></div>
    <div id="f07-l1" class="abs f07-lab label" style="opacity:0"><div class="t">DOR QUE DESCE<br/>PELA PERNA</div></div>
    <div id="f07-l2" class="abs f07-lab label" style="opacity:0"><div class="p title">&lt;1%</div><div class="t">GRAVE</div></div>
    <div id="f07-les" class="abs card label" style="opacity:0">sem uma lesão única que explique tudo</div>
    <div id="f07-ep" class="abs card label" style="opacity:0">ex.: hérnia (episódio passado!)</div>
    <div id="f07-grv" class="abs card label" style="opacity:0">fratura, infecção,<br/>tumor, cauda equina</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-ttl", 0.1, 0.5);
        // caixas aparecem
        R.drop(tl, "#f07-b0w", K.tres - 0.2, 0.7, -700);
        tl.set("#f07-b0w", { opacity: 1 }, K.tres - 0.2);
        R.drop(tl, "#f07-b1w", K.tres + 0.1, 0.7, -700);
        tl.set("#f07-b1w", { opacity: 1 }, K.tres + 0.1);
        R.drop(tl, "#f07-b2w", K.tres + 0.4, 0.7, -700);
        tl.set("#f07-b2w", { opacity: 1 }, K.tres + 0.4);
        // gigante: 90%
        tl.to("#f07-b0w", { scale: 1.04, svgOrigin: "470 880", duration: 0.2, yoyo: true, repeat: 1 }, K.gig);
        R.pop(tl, "#f07-l0", K.nov - 0.1, 0.45);
        // Seu Zé cai dentro da caixa gigante
        const z = "f07z";
        R.setPose(tl, z, 0, { shF: -160, elF: -20, shB: -160, elB: -20, hipF: -20, knF: 30, hipB: 10, knB: 20 });
        R.face(tl, z, 0, { eyes: "wide", mouth: "scream" });
        tl.set("#f07-z-wrap", { opacity: 1 }, K.ines - 0.4);
        tl.fromTo("#f07-z-wrap", { y: -800 }, { y: 0, duration: 0.55, ease: "power2.in" }, K.ines - 0.4);
        R.shake(tl, "#f07-b0w", K.ines + 0.15, 0.3, 5);
        R.pose(tl, z, K.ines + 0.3, 0.4, { shF: -60, elF: -60, shB: -50, elB: -60, hipF: 0, knF: 0, hipB: 0, knB: 0 });
        R.face(tl, z, K.ines + 0.4, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, K.ines + 0.5, K.dur);
        R.pop(tl, "#f07-les", K.les - 0.2, 0.4);
        // média: dor que desce pela perna
        R.pop(tl, "#f07-l1", K.menor - 0.1, 0.4);
        R.face(tl, "f07g", 0, { eyes: "happy" });
        tl.fromTo("#f07-g-wrap", { y: 60 }, { y: -40, duration: 0.4, ease: "back.out(2)" }, K.hern - 0.2);
        R.pop(tl, "#f07-ep", K.hern, 0.4);
        R.fadeOut(tl, "#f07-les", K.min - 0.3);
        // minúscula: grave <1%
        tl.to("#f07-b2w", { scale: 1.3, svgOrigin: "1520 880", duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }, K.min);
        R.pop(tl, "#f07-l2", K.um - 0.1, 0.4);
        R.pop(tl, "#f07-grv", K.grav - 0.1, 0.4);
        R.face(tl, z, K.grav, { eyes: "happy", mouth: "grin" });
      },
      sfx: [
        { name: "impact-bass-1", t: k.tres + 0.4, vol: 0.35 },
        { name: "pop", t: k.nov - 0.1, vol: 0.4 },
        { name: "whoosh-short", t: k.ines - 0.4, vol: 0.4 },
        { name: "impact-bass-2", t: k.ines + 0.15, vol: 0.35 },
        { name: "pop", t: k.menor - 0.1, vol: 0.35 },
        { name: "pop", t: k.hern, vol: 0.35 },
        { name: "pop", t: k.um - 0.1, vol: 0.35 },
      ],
    };
  },
};
