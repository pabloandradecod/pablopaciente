// F8 — Tendinopatia, não tendinite: fibras alinhadas × bagunçadas + engrossamento; termômetro de carga; Aquiles de capa rasgada; Dr. Pablo: "meu caso"
export default {
  build(ctx) {
    const { C, human, aquiles, w } = ctx;
    const k = {
      pat: w(0, "patelar"), infl: w(0, "inflamação"), sob: w(0, "sobrecarregado"), fib: w(0, "fibras"), des: w(0, "desorganizadas"), gro: w(0, "grosso"),
      carga: w(0, "carga"), rap: w(0, "rápido"), caso: w(0, "caso"), dist: w(0, "distância"), lad: w(0, "ladeira"), tudo: w(0, "tudo"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const straight = Array.from({ length: 7 }, (_, i) => `<path d="M${30 + i * 26} 20 L${30 + i * 26} 250" stroke="#C9B48E" stroke-width="8" stroke-linecap="round"/>`).join("");
    const messy = Array.from({ length: 7 }, (_, i) => { const x = 30 + i * 26, s = i % 2 ? 1 : -1; return `<path d="M${x} 20 Q${x + 26 * s} 80 ${x - 10 * s} 130 Q${x - 30 * s} 180 ${x + 14 * s} 250" stroke="#C9B48E" stroke-width="8" fill="none" stroke-linecap="round"/>`; }).join("");
    const chip = (i, txt) => `<div id="f08-ch${i}" class="abs card title" style="left:960px;top:${640 + i * 92}px;padding:10px 20px;font-size:34px;opacity:0;${i === 2 ? `background:${C.pain};color:#fff;` : ""}">${txt}</div>`;
    return {
      k,
      css: `
        #f08-tite { left:100px; top:60px; padding:12px 26px; font-size:58px; }
        #f08-tpat { left:560px; top:60px; padding:12px 26px; font-size:58px; color:${C.good}; }
        #f08-x { left:84px; top:64px; }
        #root .f08-fl { font-size:30px; text-align:center; }
        #f08-therm-t { left:100px; top:600px; font-size:32px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <!-- painéis de fibras -->
      <g id="f08-p1" opacity="0"><g transform="translate(110,220)">
        <rect width="240" height="270" rx="24" fill="#FFF8EC" ${st}/><rect x="14" y="10" width="212" height="250" rx="40" fill="#F2E8D8" stroke="${C.ink}" stroke-width="4"/>${straight}
        <text x="120" y="320" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.good}">NORMAL</text>
      </g></g>
      <g id="f08-p2" opacity="0"><g transform="translate(460,220)">
        <rect width="300" height="270" rx="24" fill="#FFF8EC" ${st}/>
        <path id="f08-thick" d="M50 10 L190 10 L190 260 L50 260 Z" fill="#F2E8D8" stroke="${C.ink}" stroke-width="4"/>
        <g transform="translate(0,0)">${messy}</g>
        <text x="150" y="320" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="30" fill="${C.pain}">SOBRECARREGADO</text>
      </g></g>
      <!-- termômetro de carga -->
      <g id="f08-therm" opacity="0">
        <rect x="100" y="660" width="260" height="90" fill="#9CD3E6" ${st}/><rect x="360" y="660" width="260" height="90" fill="${C.good}" ${st}/><rect x="620" y="660" width="260" height="90" fill="${C.pain}" ${st}/>
        <text x="230" y="716" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">pouca carga</text>
        <text x="490" y="716" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="${C.ink}">carga certa</text>
        <text x="750" y="716" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="28" fill="#fff">carga demais</text>
        <g id="f08-needle"><path d="M490 758 L466 800 L514 800 Z" fill="${C.ink}"/><rect x="482" y="798" width="16" height="56" rx="6" fill="${C.ink}"/></g>
      </g>
      <g id="f08-a-wrap"><g transform="translate(1420,940) scale(1.05)">${aquiles("f08a")}</g></g>
      <g id="f08-p-wrap" opacity="0"><g transform="translate(1760,690) scale(0.95)">${human("f08p", "pablo")}
        <g id="f08-pain" opacity="0"><circle cx="-6" cy="168" r="22" fill="${C.pain}" opacity="0.4"/><circle cx="-6" cy="168" r="10" fill="${C.pain}" stroke="#fff" stroke-width="4"/></g></g></g>
    </svg>
    <div id="f08-tite" class="abs card title" style="opacity:0">TENDINITE</div>
    <svg id="f08-x" class="abs" width="420" height="110" viewBox="0 0 420 110" style="opacity:0"><path d="M10 100 L400 10" stroke="${C.pain}" stroke-width="16" stroke-linecap="round"/></svg>
    <div id="f08-tpat" class="abs card title" style="opacity:0">TENDINOPATIA</div>
    ${chip(0, "+ distância")}
    ${chip(1, "+ ladeira")}
    ${chip(2, "tudo de uma vez!")}`,
      js: function (tl, K, R) {
        const a = "f08a";
        R.setPose(tl, a, 0, { armF: -20, armB: 20 });
        R.face(tl, a, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, a, 0.3, K.dur);
        tl.fromTo("#f08-a-wrap", { y: 500 }, { y: 0, duration: 0.5, ease: "back.out(1.5)" }, 0.1);
        R.pop(tl, "#f08-tite", K.pat - 0.2, 0.4);
        tl.fromTo("#f08-x", { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: 0.3, ease: "power3.out" }, K.infl);
        R.slideIn(tl, "#f08-tpat", K.sob - 0.2, 0.45, 200);
        // sobrecarga: capa rasga, fibras bagunçam, engrossa
        tl.set("#f08a-tear", { opacity: 1 }, K.sob);
        R.face(tl, a, K.sob, { eyes: "pain", mouth: "frown" });
        R.shake(tl, "#f08-a-wrap", K.sob, 0.4, 5);
        R.fadeIn(tl, "#f08-p1", K.fib - 0.2);
        R.fadeIn(tl, "#f08-p2", K.des - 0.2);
        tl.fromTo("#f08-p2 path", { y: 0 }, { y: 6, duration: 0.15, yoyo: true, repeat: 5 }, K.des);
        tl.to("#f08-thick", { scaleX: 1.4, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2)" }, K.gro);
        tl.set("#f08a-bulge", { opacity: 1 }, K.gro);
        tl.fromTo("#f08a-bulge", { scale: 0.3, svgOrigin: "0 -112" }, { scale: 1, svgOrigin: "0 -112", duration: 0.4, ease: "back.out(2.5)" }, K.gro);
        // termômetro: agulha vai pra "demais"
        R.fadeIn(tl, "#f08-therm", K.carga - 0.3);
        tl.to("#f08-needle", { x: 260, duration: 0.5, ease: "back.out(2)" }, K.rap - 0.1);
        tl.to("#f08-needle", { rotation: 6, svgOrigin: "750 870", duration: 0.1, yoyo: true, repeat: 5 }, K.rap + 0.4);
        // meu caso
        tl.set("#f08-p-wrap", { opacity: 1 }, K.caso - 0.4);
        tl.fromTo("#f08-p-wrap", { x: 400 }, { x: 0, duration: 0.45, ease: "back.out(1.5)" }, K.caso - 0.4);
        const p = "f08p";
        R.setPose(tl, p, 0, { shF: 10, elF: -20, shB: 10, elB: -20 });
        R.face(tl, p, 0, { eyes: "normal", mouth: "flat" });
        R.pose(tl, p, K.caso, 0.3, { shF: -150, elF: -20 }, "back.out(2)");
        tl.set("#f08-pain", { opacity: 1 }, K.caso);
        R.face(tl, p, K.caso + 0.2, { eyes: "pain", mouth: "frown" });
        R.pop(tl, "#f08-ch0", K.dist - 0.1, 0.4);
        R.pop(tl, "#f08-ch1", K.lad - 0.1, 0.4);
        R.pop(tl, "#f08-ch2", K.tudo - 0.1, 0.4);
        R.pose(tl, p, K.tudo, 0.3, { shF: 20, elF: -100, shB: 20, elB: -100 });
      },
      sfx: [
        { name: "whoosh-short", t: 0.1, vol: 0.35 },
        { name: "pop", t: k.pat - 0.2, vol: 0.35 },
        { name: "error", t: k.infl, vol: 0.3 },
        { name: "glitch-1", t: k.sob, vol: 0.3 },
        { name: "pop", t: k.gro, vol: 0.35 },
        { name: "whoosh-short", t: k.rap - 0.1, vol: 0.35 },
        { name: "whoosh-short", t: k.caso - 0.4, vol: 0.35 },
        { name: "pop", t: k.dist - 0.1, vol: 0.3 }, { name: "pop", t: k.lad - 0.1, vol: 0.3 },
        { name: "impact-bass-1", t: k.tudo - 0.1, vol: 0.35 },
      ],
    };
  },
};
