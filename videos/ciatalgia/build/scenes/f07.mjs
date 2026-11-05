// F7 — Causas: pódio "QUEM APERTA O NERVO?" — hérnia (sonho de padaria), estenose, espondilolistese, piriforme, raros
export default {
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      aperta: w(0, "aperta"), prim: w(0, "primeiro"), hern: w(0, "hérnia"), l45: w(0, "L4-L5"), l5s1: w(0, "L5-S1"),
      sonho: w(0, "sonho"), apertou: w(0, "apertou"), recheio: w(0, "recheio"), raiz: w(0, "raiz"),
      canal: w(0, "canal"), esten: w(0, "estenose"), escorr: w(0, "escorrega"), espond: w(0, "espondilolistese"),
      pirif: w(0, "piriforme"), abr: w(0, "abraçando"), tumor: w(0, "Tumor"), raros: w(0, "raros"),
    };
    const st = (sw = 7) => `stroke="${C.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
    const card = (i, x, title) => `<div id="f07-c${i}" class="abs card" style="left:${x}px;top:250px;width:300px;height:400px;opacity:0">
        <div class="label" style="position:absolute;left:0;right:0;bottom:16px;text-align:center;font-size:30px;line-height:1.1">${title}</div></div>`;
    return {
      k,
      css: `
        #f07-title { left:800px; top:60px; font-size:80px; white-space:nowrap; }
        #f07-title b { color:${C.pain}; }
        #f07-badge { left:300px; top:690px; font-size:34px; padding:6px 18px; }
        #root .f07-lv { display:inline-block; background:${C.ink}; color:#fff; border-radius:12px; padding:2px 12px; margin:0 4px; }
        #f07-raros { left:1500px; top:690px; width:330px; padding:14px 18px; font-size:30px; text-align:center; border-style:dashed; color:#5d6b70; background:#f4f4f4; box-shadow:none; }
        #f07-lbl1 { left:120px; top:800px; width:600px; text-align:center; font-size:40px; }
      `,
      html: `
    ${card(0, 830, "Estenose:<br/>canal estreito")}
    ${card(1, 1160, "Espondilolistese:<br/>vértebra escorrega")}
    ${card(2, 1490, "Piriforme:<br/>abraço apertado")}
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <!-- pódio -->
      <g id="f07-podium" opacity="0">
        <rect x="140" y="640" width="580" height="210" rx="14" fill="${C.sun}" ${st(8)}/>
        <text x="430" y="790" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="120" fill="${C.ink}">1º</text>
      </g>
      <!-- hérnia: duas vértebras + o disco "sonho" + a raiz -->
      <g id="f07-hern" opacity="0">
        <g id="f07-top"><rect x="250" y="190" width="300" height="130" rx="34" fill="${C.bone}" ${st(8)}/></g>
        <g id="f07-disc">
          <ellipse cx="400" cy="400" rx="160" ry="62" fill="#E8B26A" ${st(8)}/>
          <path d="M260 384 Q400 330 540 384" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.7"/>
          ${[[330, 372], [380, 360], [440, 364], [490, 378], [356, 392], [462, 392]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="5" rx="2" fill="#fff"/>`).join("")}
        </g>
        <path id="f07-cream" d="M530 400 Q600 380 640 420 Q630 460 560 440 Z" fill="#FFF3C4" ${st(6)} opacity="0"/>
        <g id="f07-bot"><rect x="250" y="480" width="300" height="130" rx="34" fill="${C.bone}" ${st(8)}/></g>
        <g id="f07-root"><path d="M640 170 Q660 300 650 420 Q644 520 660 630" fill="none" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/><path id="f07-rootin" d="M640 170 Q660 300 650 420 Q644 520 660 630" fill="none" stroke="${C.nerve}" stroke-width="18" stroke-linecap="round"/></g>
        <g id="f07-zap" opacity="0">${[[700, 380], [712, 440], [690, 330]].map(([x, y]) => `<path d="M${x} ${y} l20 -14 l-6 18 l22 -10" fill="none" stroke="${C.pain}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}</g>
        <!-- mãos que apertam -->
        <g id="f07-handT" opacity="0"><path d="M400 110 L400 170" stroke="${C.pain}" stroke-width="26" stroke-linecap="round"/><path d="M362 150 L400 190 L438 150" fill="none" stroke="${C.pain}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g id="f07-handB" opacity="0"><path d="M400 690 L400 630" stroke="${C.pain}" stroke-width="26" stroke-linecap="round"/><path d="M362 650 L400 610 L438 650" fill="none" stroke="${C.pain}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/></g>
      </g>
      <!-- card 0: estenose -->
      <g transform="translate(980,420)"><g id="f07-g0" opacity="0">
        <circle id="f07-ring" r="96" fill="${C.bone}" ${st(8)}/>
        <circle id="f07-hole" r="70" fill="#FFE4DC" ${st(6)}/>
        <circle id="f07-dot" r="28" fill="${C.nerve}" ${st(6)}/>
      </g></g>
      <!-- card 1: espondilolistese -->
      <g transform="translate(1310,420)"><g id="f07-g1" opacity="0">
        <rect x="-95" y="20" width="190" height="80" rx="24" fill="${C.bone}" ${st(7)}/>
        <rect x="-80" y="5" width="160" height="14" rx="7" fill="#9CD3E6" ${st(4)}/>
        <g id="f07-slide"><rect x="-95" y="-82" width="190" height="80" rx="24" fill="${C.bone}" ${st(7)}/><circle cx="0" cy="-42" r="12" fill="${C.ink}" opacity="0.25"/></g>
        <g id="f07-zip" opacity="0"><path d="M-130 -60 L-160 -60 M-130 -40 L-175 -40 M-130 -20 L-155 -20" ${st(6)}/></g>
      </g></g>
      <!-- card 2: piriforme -->
      <g transform="translate(1640,420)"><g id="f07-g2" opacity="0">
        <path id="f07-pn" d="M0 -140 Q10 -40 0 40 Q-8 100 0 130" fill="none" stroke="${C.ink}" stroke-width="30" stroke-linecap="round"/>
        <path id="f07-pni" d="M0 -140 Q10 -40 0 40 Q-8 100 0 130" fill="none" stroke="${C.nerve}" stroke-width="18" stroke-linecap="round"/>
        <g id="f07-musc">
          <path d="M-120 -60 Q0 -110 120 -20 Q120 30 100 40 Q0 -40 -120 -10 Z" fill="#E86A6A" ${st(7)}/>
          <path d="M-90 -50 Q0 -80 90 -20 M-90 -30 Q0 -60 90 0" fill="none" stroke="#fff" stroke-width="4" opacity="0.5"/>
          <circle cx="-56" cy="-52" r="6" fill="${C.ink}"/><circle cx="-30" cy="-58" r="6" fill="${C.ink}"/>
          <path d="M-52 -36 Q-40 -30 -28 -40" fill="none" ${st(4)}/>
        </g>
        <g id="f07-arms" opacity="0"><path d="M-60 -20 Q-50 40 -6 30" fill="none" stroke="#E86A6A" stroke-width="18" stroke-linecap="round"/><path d="M-60 -20 Q-50 40 -6 30" fill="none" ${st(4)} stroke-width="4" opacity="0.6"/><path d="M60 0 Q50 50 8 34" fill="none" stroke="#E86A6A" stroke-width="18" stroke-linecap="round"/></g>
      </g></g>
    </svg>
    <div id="f07-title" class="abs title" style="opacity:0">QUEM <b>APERTA</b> O NERVO?</div>
    <div id="f07-badge" class="abs card label" style="opacity:0;left:230px;top:716px;font-size:32px;padding:6px 16px;">mais em <span class="f07-lv" id="f07-lv1">L4-L5</span><span class="f07-lv" id="f07-lv2">L5-S1</span></div>
    <div id="f07-lbl1" class="abs label" style="opacity:0">Hérnia de disco</div>
    <div id="f07-raros" class="abs card label" style="opacity:0">Raros: tumor e infecção</div>`,
      js: function (tl, K, R) {
        R.drop(tl, "#f07-title", 0.1, 0.7, -260);
        tl.to("#f07-title", { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, transformOrigin: "50% 60%" }, K.aperta);
        // pódio + hérnia
        tl.set("#f07-podium", { opacity: 1 }, K.prim - 0.1);
        tl.fromTo("#f07-podium", { y: 300 }, { y: 0, duration: 0.5, ease: "back.out(1.6)" }, K.prim - 0.1);
        R.pop(tl, "#f07-hern", K.hern - 0.1, 0.5, 0.4);
        tl.to("#f07-podium", { opacity: 0, duration: 0.3 }, K.hern + 0.3);
        R.rise(tl, "#f07-lbl1", K.hern + 0.2, 0.4);
        R.pop(tl, "#f07-badge", K.l45 - 0.2, 0.4);
        tl.fromTo("#f07-lv1", { scale: 1 }, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1 }, K.l45);
        tl.fromTo("#f07-lv2", { scale: 1 }, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1 }, K.l5s1);
        // sonho de padaria apertado
        tl.to("#f07-disc", { rotation: 4, svgOrigin: "400 400", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.sonho);
        tl.set("#f07-handT, #f07-handB", { opacity: 1 }, K.apertou - 0.3);
        tl.fromTo("#f07-handT", { y: -70 }, { y: 0, duration: 0.3, ease: "power2.in" }, K.apertou - 0.3);
        tl.fromTo("#f07-handB", { y: 60 }, { y: 0, duration: 0.3, ease: "power2.in" }, K.apertou - 0.3);
        tl.to("#f07-top, #f07-handT", { y: 30, duration: 0.25, ease: "power3.in" }, K.apertou);
        tl.to("#f07-bot, #f07-handB", { y: -30, duration: 0.25, ease: "power3.in" }, K.apertou);
        tl.to("#f07-disc", { scaleY: 0.62, scaleX: 1.12, svgOrigin: "400 400", duration: 0.25, ease: "power3.in" }, K.apertou);
        tl.set("#f07-cream", { opacity: 1 }, K.recheio - 0.1);
        tl.fromTo("#f07-cream", { scale: 0, svgOrigin: "530 410" }, { scale: 1, svgOrigin: "530 410", duration: 0.35, ease: "back.out(2.5)" }, K.recheio - 0.1);
        tl.to("#f07-rootin", { stroke: "#FF5A4E", duration: 0.15 }, K.raiz - 0.1);
        tl.set("#f07-zap", { opacity: 1 }, K.raiz);
        R.shake(tl, "#f07-root", K.raiz, 0.7, 5);
        tl.to("#f07-zap", { opacity: 0, duration: 0.1, yoyo: true, repeat: 5 }, K.raiz + 0.1);
        // cards menores
        R.pop(tl, "#f07-c0", K.canal - 0.3, 0.4);
        R.pop(tl, "#f07-g0", K.canal - 0.2, 0.4);
        tl.to("#f07-hole", { attr: { r: 36 }, duration: 0.8, ease: "power2.inOut" }, K.canal + 0.1);
        tl.to("#f07-dot", { attr: { r: 22 }, fill: "#FF5A4E", duration: 0.5 }, K.esten);
        R.shake(tl, "#f07-dot", K.esten + 0.4, 0.4, 3);
        R.pop(tl, "#f07-c1", K.escorr - 0.4, 0.4);
        R.pop(tl, "#f07-g1", K.escorr - 0.3, 0.4);
        tl.to("#f07-slide", { x: 60, duration: 0.45, ease: "back.out(2)" }, K.escorr);
        tl.set("#f07-zip", { opacity: 1 }, K.escorr);
        tl.to("#f07-zip", { opacity: 0, duration: 0.3 }, K.escorr + 0.5);
        tl.to("#f07-slide", { x: 30, duration: 0.3, ease: "power2.inOut" }, K.espond + 0.6);
        R.pop(tl, "#f07-c2", K.pirif - 0.4, 0.4);
        R.pop(tl, "#f07-g2", K.pirif - 0.3, 0.4);
        tl.set("#f07-arms", { opacity: 1 }, K.abr);
        tl.fromTo("#f07-arms", { scale: 1.4, svgOrigin: "0 10" }, { scale: 1, svgOrigin: "0 10", duration: 0.35, ease: "back.out(2)" }, K.abr);
        tl.to("#f07-musc", { scaleY: 1.12, svgOrigin: "0 -30", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.abr + 0.3);
        tl.to("#f07-pni", { stroke: "#FF5A4E", duration: 0.3 }, K.abr + 0.4);
        // raros
        R.pop(tl, "#f07-raros", K.tumor - 0.1, 0.4);
        tl.to("#f07-raros", { scale: 0.9, duration: 0.3, ease: "power2.inOut" }, K.raros + 0.2);
      },
      sfx: [
        { name: "whoosh", t: 0.1, vol: 0.35 },
        { name: "impact-bass-1", t: k.prim + 0.1, vol: 0.45 },
        { name: "pop", t: k.hern - 0.05, vol: 0.35 },
        { name: "impact-bass-2", t: k.apertou + 0.22, vol: 0.4 },
        { name: "pop", t: k.recheio, vol: 0.45 },
        { name: "glitch-1", t: k.raiz, vol: 0.3 },
        { name: "pop", t: k.canal - 0.25, vol: 0.35 },
        { name: "whoosh-short", t: k.escorr, vol: 0.45 },
        { name: "pop", t: k.pirif - 0.35, vol: 0.35 },
        { name: "pop", t: k.tumor - 0.05, vol: 0.3 },
      ],
    };
  },
};
