// F29 — Resumo em 3 ideias + Seu Zé desce do carro sem dor e faz joinha
import { carSVG, streetSVG } from "./f25.mjs";

export default {
  extra: 2.2,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      res: w(0, "Resumindo"), pir: w(0, "piriforme"), desc: w(0, "descarta"), alon: w(0, "alongamento"),
      sent: w(0, "sentado"), nad: w(0, "nádega"), agr: w(0, "agradece"), end: lines[0].end,
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "pop", t: k.pir, vol: 0.4 }, { name: "pop", t: k.desc, vol: 0.4 }, { name: "pop", t: k.alon, vol: 0.4 },
      { name: "whoosh", t: k.sent + 0.3, vol: 0.4 },
      { name: "sparkle", t: k.agr, vol: 0.45 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const row = (i, label, svg, color) => `<div id="f29-r${i}" class="abs card f29-row" style="top:${150 + i * 200}px;opacity:0">
      <svg width="130" height="130" viewBox="-65 -65 130 130" style="flex:none"><circle r="58" fill="${color}" stroke="${C.ink}" stroke-width="7"/>${svg}</svg>
      <div class="label" style="font-size:34px;line-height:1.15">${label}</div></div>`;
    return {
      k,
      sfx,
      css: `
        #f29-h { left:110px; top:50px; font-size:56px; color:${C.pain}; }
        #root .f29-row { left:1180px; width:640px; padding:14px 22px; display:flex; align-items:center; gap:22px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${streetSVG(C, "f29")}
      <g transform="translate(-380,0)">
        <g id="f29-zw"><g transform="translate(900,640) scale(1.3)">${human("f29z", "ze")}</g></g>
        ${carSVG("f29-car", C, `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`)}
      </g>
      <g id="f29-badge" opacity="0" transform="translate(860,330)"><g id="f29-badge-in">
        <circle r="74" fill="${C.good}" stroke="${C.ink}" stroke-width="8"/>
        <path d="M-34 -2 L-14 -2 L-14 44 L-34 44 Z" fill="#fff" ${st}/>
        <path d="M-14 0 L4 -38 Q10 -54 22 -44 Q28 -36 22 -14 L42 -14 Q54 -12 50 2 L44 34 Q40 44 28 44 L-14 44 Z" fill="#fff" ${st}/>
      </g></g>
      <g id="f29-sp" opacity="0">${[[700, 300], [1010, 280], [1000, 460]].map(([x, y]) => `<path transform="translate(${x},${y})" d="M0 -22 L6 -6 L22 0 L6 6 L0 22 L-6 6 L-22 0 L-6 -6 Z" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
    </svg>
    <div id="f29-h" class="abs title">RESUMINDO</div>
    ${row(0, "O <b>piriforme</b> pode<br>apertar o ciático", `<path d="M0 -42 Q12 -42 14 -24 Q16 -12 30 4 Q40 22 30 34 Q20 44 0 44 Q-20 44 -30 34 Q-40 22 -30 4 Q-16 -12 -14 -24 Q-12 -42 0 -42 Z" fill="#F2766B" ${st}/><path d="M-2 -42 Q-6 -56 6 -58" fill="none" stroke="${C.good}" stroke-width="7" stroke-linecap="round"/>`, C.cream)}
    ${row(1, "Mas antes,<br><b>descarta a coluna</b>", `<circle cx="-8" cy="-8" r="26" fill="#fff" ${st}/><path d="M12 12 L36 36" ${st} stroke-width="12"/>`, C.sky)}
    ${row(2, "Alongar, fortalecer<br>e <b>sentar menos</b>", `<circle cx="22" cy="18" r="17" fill="#D7F05A" ${st}/><path d="M-44 14 Q-44 -8 -28 -14 L-10 -26 Q0 -30 4 -20 L10 -8 Q18 -6 20 0 L-44 14 Z" fill="#fff" ${st}/>`, C.good)}`,
      js: function (tl, K, R) {
        const z = "f29z";
        const sit = { hipB: -88, hipF: -92, knB: 88, knF: 92, torso: -4, shF: -70, elF: -50, shB: -60, elB: -50 };
        R.setPose(tl, z, 0, sit);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f29-h", 0.05, 0.45, -200);
        tl.fromTo("#f29-car", { x: -1400 }, { x: 0, duration: 0.7, ease: "back.out(1.1)" }, 0);
        tl.fromTo("#f29-zw", { x: -1400 }, { x: 0, duration: 0.7, ease: "back.out(1.1)" }, 0);
        R.slideIn(tl, "#f29-r0", K.pir - 0.1, 0.45, 300);
        R.slideIn(tl, "#f29-r1", K.desc - 0.1, 0.45, 300);
        R.slideIn(tl, "#f29-r2", K.alon - 0.1, 0.45, 300);
        // desce do carro sem dor
        R.pose(tl, z, K.sent, 0.4, { hipB: 0, hipF: 0, knB: 0, knF: 0, torso: 0, shF: -10, elF: -20, shB: 10, elB: -10 });
        tl.to("#f29-car", { x: 1700, duration: 0.8, ease: "power2.in" }, K.sent + 0.3);
        R.face(tl, z, K.nad, { eyes: "wide", mouth: "smile" });
        // joinha
        R.pose(tl, z, K.agr - 0.2, 0.5, { torso: -6, neck: 6, shF: -105, elF: -45 }, "back.out(1.6)");
        R.face(tl, z, K.agr, { eyes: "happy", mouth: "grin" });
        R.squash(tl, "#f29z-root", K.agr + 0.1);
        R.pop(tl, "#f29-badge-in", K.end + 0.1, 0.5);
        tl.set("#f29-badge", { opacity: 1 }, K.end + 0.1);
        tl.fromTo("#f29-sp", { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, K.end + 0.3);
      },
    };
  },
};
