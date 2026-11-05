// F14 — Primos que confundem: Turão (parte de DENTRO, pode dar fraqueza) × Nervinho (parte de FORA, nunca dá fraqueza)
export default {
  speakers: { nervinho: "f14n" },
  tail: 1.0,
  build(ctx) {
    const { C, turao, nervinho, w, lines, MINT, LILAC } = ctx;
    const k = {
      pri: w(0, "primos"), tur: w(0, "Turão"), den: w(0, "dentro"), fra: w(0, "fraca"),
      ner: w(0, "Nervinho"), fora: w(0, "fora"), nun: w(0, "nunca"), n0: lines[1].start, n1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
    const tPts = [[160, 240], [230, 240], [300, 252], [370, 240], [440, 252], [510, 240], [580, 240]];
    const nPts = [[1360, 240], [1430, 240], [1500, 252], [1570, 240], [1640, 252], [1710, 240], [1780, 240]];
    const thighL = "M800 400 L930 400 L915 690 Q865 715 815 690 Z";
    const thighR = "M990 400 L1120 400 L1105 690 Q1055 715 1005 690 Z";
    const row = (id, x, y, icon, html, color) => `<div id="${id}" class="abs card f14-row" style="left:${x}px;top:${y}px;border-color:${color};opacity:0">
        <svg width="64" height="64" viewBox="-32 -32 64 64" style="flex:none">${icon}</svg><div class="label">${html}</div></div>`;
    const icIn = (c) => `<rect x="-26" y="-28" width="22" height="56" rx="10" fill="#F2C59A" ${st} stroke-width="4"/><rect x="4" y="-28" width="22" height="56" rx="10" fill="#F2C59A" ${st} stroke-width="4"/><rect x="-4" y="-20" width="8" height="40" fill="${c}"/>`;
    const icOut = (c) => `<rect x="-26" y="-28" width="22" height="56" rx="10" fill="#F2C59A" ${st} stroke-width="4"/><rect x="4" y="-28" width="22" height="56" rx="10" fill="#F2C59A" ${st} stroke-width="4"/><rect x="-28" y="-20" width="7" height="40" fill="${c}"/><rect x="21" y="-20" width="7" height="40" fill="${c}"/>`;
    const icWeak = `<path d="M-14 -26 L-14 18 L16 18" fill="none" ${st} stroke-width="9"/><path d="M24 -20 L24 16 M14 6 L24 18 L34 6" fill="none" stroke="${C.pain}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    const icStrong = `<circle r="26" fill="${C.good}" ${st} stroke-width="4"/><path d="M-12 0 L-3 10 L13 -10" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    return {
      k,
      css: `
        #f14-title { left:0; right:0; top:40px; text-align:center; font-size:72px; }
        #f14-title b { color:${C.pain}; }
        #root .f14-name { position:absolute; top:300px; width:560px; text-align:center; font-size:34px; }
        #root .f14-name small { display:block; font-size:24px; opacity:0.7; }
        #root .f14-row { width:560px; padding:16px 20px; display:flex; align-items:center; gap:16px; font-size:30px; line-height:1.15; }
        #root .f14-row b { color:${C.pain}; }
        #f14-lab-in, #f14-lab-out { font-size:30px; padding:8px 16px; }
        #f14-tag { left:700px; top:770px; width:520px; text-align:center; font-size:34px; padding:12px 16px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="860" width="1920" height="220" fill="${C.floor}"/>
      <line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g id="f14-t-wrap" opacity="0">${turao("f14t", tPts)}</g>
      <g id="f14-n-wrap" opacity="0">${nervinho("f14n", nPts)}</g>
      <!-- pernas do Seu Zé, vistas de frente -->
      <g id="f14-legs" opacity="0">
        <defs><clipPath id="f14-clipL"><path d="${thighL}"/></clipPath></defs>
        <path d="M818 690 L912 690 L898 820 L832 820 Z" fill="#F2C59A" ${st}/><path d="M1008 690 L1102 690 L1088 820 L1022 820 Z" fill="#F2C59A" ${st}/>
        <path d="M816 815 L900 815 Q912 845 880 850 L812 850 Q800 830 816 815Z" fill="#4A2E1A" ${st}/><path d="M1020 815 L1104 815 Q1120 830 1108 850 L1040 850 Q1008 845 1020 815Z" fill="#4A2E1A" ${st}/>
        <path d="${thighL}" fill="#F2C59A" ${st}/>
        <path d="${thighR}" fill="#F2C59A" ${st}/>
        <g clip-path="url(#f14-clipL)">
          <rect id="f14-mint" x="865" y="400" width="80" height="330" fill="${MINT}" opacity="0"/>
          <rect id="f14-lilac" x="780" y="400" width="85" height="330" fill="${LILAC}" opacity="0"/>
        </g>
        <path d="${thighL}" fill="none" ${st}/>
        <line id="f14-div" x1="865" y1="410" x2="865" y2="690" stroke="${C.ink}" stroke-width="5" stroke-dasharray="14 10" opacity="0"/>
        <path d="M780 340 L1140 340 L1130 440 L975 440 L960 410 L945 440 L790 440 Z" fill="${C.brown}" ${st}/>
        <g id="f14-ball" opacity="0"><circle cx="960" cy="640" r="28" fill="#fff" ${st} stroke-width="5"/><path d="M960 628 L970 636 L966 648 L954 648 L950 636 Z" fill="${C.ink}"/></g>
      </g>
    </svg>
    <div id="f14-title" class="abs title" style="opacity:0">Primos que <b>confundem</b></div>
    <div id="f14-tname" class="f14-name label" style="left:90px;opacity:0">TURÃO<small>nervo obturatório</small></div>
    <div id="f14-nname" class="f14-name label" style="left:1290px;opacity:0">NERVINHO<small>nervo cutâneo femoral lateral (meralgia)</small></div>
    ${row("f14-t1", 90, 410, icIn(MINT), "Parte de <b>DENTRO</b><br>da coxa", "#2E9E78")}
    ${row("f14-t2", 90, 570, icWeak, "Pode deixar <b>FRACA</b><br>pra fechar a perna", "#2E9E78")}
    ${row("f14-n1", 1290, 410, icOut(LILAC), "Parte de <b style='color:#7A5BD0'>FORA</b><br>da coxa", "#8E6CD8")}
    ${row("f14-n2", 1290, 570, icStrong, "<b style='color:#1E9C72'>NUNCA</b> dá<br>fraqueza", "#8E6CD8")}
    <div id="f14-lab-in" class="abs card label" style="left:900px;top:470px;color:#1E9C72;opacity:0">dentro</div>
    <div id="f14-lab-out" class="abs card label" style="left:676px;top:650px;color:#7A5BD0;opacity:0">fora</div>
    <div id="f14-tag" class="abs card label" style="opacity:0">Cada um no seu lado!</div>`,
      js: function (tl, K, R) {
        R.drop(tl, "#f14-title", Math.max(0.05, K.pri - 0.5), 0.7, -240);
        R.fadeIn(tl, "#f14-legs", 0.2, 0.4);
        // Turão entra
        tl.fromTo("#f14-t-wrap", { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, K.tur - 0.3);
        R.rise(tl, "#f14-tname", K.tur, 0.4, 20);
        R.face(tl, "f14t", K.tur, { eyes: "happy", mouth: "grin" });
        R.face(tl, "f14n", 0, { eyes: "normal", mouth: "smile" });
        // parte de dentro
        R.pop(tl, "#f14-t1", K.den - 0.1, 0.4, 0.6);
        tl.fromTo("#f14-mint", { opacity: 0 }, { opacity: 0.9, duration: 0.4 }, K.den);
        R.pop(tl, "#f14-lab-in", K.den + 0.1, 0.35);
        // fraca: a bola escapa dos joelhos
        R.pop(tl, "#f14-t2", K.fra - 0.15, 0.4, 0.6);
        tl.set("#f14-ball", { opacity: 1 }, K.fra - 0.6);
        tl.fromTo("#f14-ball", { y: 0 }, { y: 190, duration: 0.5, ease: "bounce.out" }, K.fra);
        R.face(tl, "f14t", K.fra, { eyes: "wide", mouth: "flat" });
        R.fadeOut(tl, "#f14-ball", K.ner - 0.4);
        // Nervinho entra
        tl.fromTo("#f14-n-wrap", { x: 500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, K.ner - 0.3);
        R.rise(tl, "#f14-nname", K.ner, 0.4, 20);
        R.face(tl, "f14t", K.ner, { eyes: "normal", mouth: "smile" });
        R.pop(tl, "#f14-n1", K.fora - 0.1, 0.4, 0.6);
        tl.fromTo("#f14-lilac", { opacity: 0 }, { opacity: 0.9, duration: 0.4 }, K.fora);
        R.pop(tl, "#f14-lab-out", K.fora + 0.1, 0.35);
        R.pop(tl, "#f14-n2", K.nun - 0.1, 0.4, 0.6);
        // "Cada um no seu lado da coxa!"
        tl.to("#f14-div", { opacity: 1, duration: 0.2 }, K.n0 - 0.2);
        R.draw(tl, "#f14-div", K.n0 - 0.2, 0.5);
        R.pop(tl, "#f14-tag", K.n0, 0.4);
        R.face(tl, "f14t", K.n0, { eyes: "happy" });
        R.face(tl, "f14n", K.n0, { eyes: "happy" });
        tl.to("#f14-n-wrap", { y: -16, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.n0);
        tl.to("#f14-t-wrap", { y: -16, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.n0 + 0.1);
      },
      sfx: [
        { name: "whoosh", t: Math.max(0.05, k.pri - 0.5), vol: 0.35 },
        { name: "whoosh-short", t: k.tur - 0.3, vol: 0.4 },
        { name: "pop", t: k.den - 0.1, vol: 0.4 },
        { name: "pop", t: k.fra - 0.15, vol: 0.35 },
        { name: "whoosh-short", t: k.ner - 0.3, vol: 0.4 },
        { name: "pop", t: k.fora - 0.1, vol: 0.4 },
        { name: "pop", t: k.nun - 0.1, vol: 0.35 },
        { name: "sparkle", t: k.n0, vol: 0.35 },
      ],
    };
  },
};
