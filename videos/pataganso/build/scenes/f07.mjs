// F7 — O que irrita: sobrecarga (escada, ladeira, aumento rápido), joelho caindo pra dentro, compressão à noite
export default {
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      irr: w(0, "irrita"), sobre: w(0, "Sobrecarga"), esc: w(0, "escada"), lad: w(0, "ladeira"), aum: w(0, "aumento"),
      joelho: w(0, "joelho"), dentro: w(0, "dentro"), estica: w(0, "estica"), comp: w(0, "compressão"), dorm: w(0, "dormir"), apert: w(0, "apertando"),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const card = (i, title, inner) => `<div id="f07-c${i}" class="abs card" style="left:${90 + i * 590}px;top:220px;width:540px;height:520px;padding:20px;opacity:0">
      <div class="title" style="font-size:34px">${i + 1}. ${title}</div>
      <svg width="500" height="420" viewBox="0 0 500 420">${inner}</svg></div>`;
    const legs = (pre) => `<g id="${pre}-L"><path d="M150 30 L230 30 L220 200 L170 200 Z" fill="#F2C59A" ${st}/><path d="M170 200 L220 200 L215 380 L178 380 Z" fill="#F2C59A" ${st}/></g>
      <g id="${pre}-R"><path d="M270 30 L350 30 L330 200 L280 200 Z" fill="#F2C59A" ${st}/><path d="M280 200 L330 200 L322 380 L285 380 Z" fill="#F2C59A" ${st}/></g>`;
    return {
      k,
      css: `
        #f07-h { left:90px; top:70px; font-size:56px; } #f07-h span { color:${C.pain}; }
        #f07-bar { left:90px; top:790px; width:1720px; padding:14px 22px; }
      `,
      html: `
    ${card(0, "SOBRECARGA", `
      <g id="f07-stairs">${[0, 1, 2, 3].map((i) => `<rect x="${40 + i * 70}" y="${300 - i * 60}" width="${420 - i * 70}" height="60" fill="#C99A62" ${st}/>`).join("")}</g>
      <g id="f07-hill" opacity="0"><path d="M20 380 L480 140 L480 380 Z" fill="#9FD6A0" ${st}/><text x="300" y="350" font-family="Nunito" font-weight="900" font-size="30" fill="${C.ink}">ladeira</text></g>
      <g id="f07-graph" opacity="0"><path d="M40 360 L40 60 M40 360 L470 360" ${st} fill="none"/><path id="f07-gl" d="M50 330 L200 310 L300 300 L360 120 L460 80" fill="none" stroke="${C.pain}" stroke-width="10" stroke-linecap="round"/><text x="250" y="110" font-family="Nunito" font-weight="900" font-size="28" fill="${C.pain}">aumento rápido!</text></g>`)}
    ${card(1, "JOELHO PRA DENTRO", `${legs("f07-k")}
      <path id="f07-ten" d="M190 120 Q175 200 205 240" fill="none" stroke="#8E6CD8" stroke-width="12" stroke-linecap="round"/>
      <g id="f07-arr" opacity="0"><path d="M120 200 L175 200" ${st} fill="none" stroke-width="8"/><path d="M160 186 L178 200 L160 214" ${st} fill="none" stroke-width="8"/><path d="M380 200 L325 200" ${st} fill="none" stroke-width="8"/><path d="M340 186 L322 200 L340 214" ${st} fill="none" stroke-width="8"/></g>
      <text x="250" y="410" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">visto de frente</text>`)}
    ${card(2, "COMPRESSÃO À NOITE", `
      <rect x="20" y="300" width="460" height="60" rx="16" fill="#fff" ${st}/>
      <g id="f07-sleep"><path d="M40 250 L300 236 L300 286 L40 290 Z" fill="${C.blue}" ${st}/><path d="M300 236 L460 230 L460 260 L300 262 Z" fill="${C.brown}" ${st}/><path d="M300 262 L460 258 L460 290 L300 290 Z" fill="${C.brown}" ${st}/></g>
      <g id="f07-zzz">${[0, 1, 2].map((i) => `<text x="${60 + i * 24}" y="${200 - i * 26}" font-family="Montserrat" font-weight="900" font-size="${26 + i * 6}" fill="${C.ink}">z</text>`).join("")}</g>
      <circle id="f07-dot" cx="380" cy="262" r="18" fill="${C.pain}" stroke="#fff" stroke-width="5" opacity="0"/>
      <text x="250" y="400" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">um joelho apertando o outro</text>`)}
    <div id="f07-h" class="abs title">O que <span>irrita</span> a pata de ganso?</div>
    <div id="f07-bar" class="abs card" style="opacity:0">
      <svg width="1676" height="50" viewBox="0 0 1676 50"><rect x="0" y="5" width="1676" height="40" rx="20" fill="#eee" stroke="${C.ink}" stroke-width="5"/>
      <rect id="f07-fill" x="5" y="10" width="0" height="30" rx="15" fill="${C.good}"/><line x1="1200" y1="0" x2="1200" y2="50" stroke="${C.ink}" stroke-width="5" stroke-dasharray="8 6"/>
      <text x="1215" y="35" font-family="Nunito" font-weight="900" font-size="24" fill="${C.ink}">limite do tendão</text></svg>
    </div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f07-h", 0.1, 0.4);
        // 1. sobrecarga
        R.pop(tl, "#f07-c0", K.sobre - 0.1, 0.4);
        R.pop(tl, "#f07-bar", K.sobre, 0.4);
        tl.to("#f07-fill", { attr: { width: 700 }, duration: 0.6 }, K.esc);
        tl.to("#f07-stairs", { opacity: 0, duration: 0.2 }, K.lad - 0.1);
        tl.set("#f07-hill", { opacity: 1 }, K.lad - 0.1);
        tl.fromTo("#f07-hill", { y: 60 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, K.lad - 0.1);
        tl.to("#f07-fill", { attr: { width: 1000 }, duration: 0.4 }, K.lad);
        tl.to("#f07-hill", { opacity: 0, duration: 0.2 }, K.aum - 0.2);
        tl.set("#f07-graph", { opacity: 1 }, K.aum - 0.1);
        R.draw(tl, "#f07-gl", K.aum - 0.1, 0.6);
        tl.to("#f07-fill", { attr: { width: 1666, fill: "#FF5A4E" }, duration: 0.4, ease: "power2.in" }, K.aum + 0.2);
        R.shake(tl, "#f07-bar", K.aum + 0.6, 0.4, 6);
        // 2. joelho pra dentro
        R.pop(tl, "#f07-c1", K.joelho - 0.1, 0.4);
        tl.to("#f07-fill", { attr: { width: 900, fill: "#3DD9A4" }, duration: 0.3 }, K.joelho);
        tl.set("#f07-arr", { opacity: 1 }, K.dentro - 0.1);
        tl.to("#f07-k-L", { x: 18, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.dentro);
        tl.to("#f07-k-R", { x: -18, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, K.dentro);
        tl.to("#f07-ten", { attr: { stroke: "#FF5A4E", "stroke-width": 16 }, duration: 0.2 }, K.estica);
        tl.to("#f07-fill", { attr: { width: 1300, fill: "#FF5A4E" }, duration: 0.4 }, K.estica);
        // 3. compressão
        R.pop(tl, "#f07-c2", K.comp - 0.1, 0.4);
        tl.fromTo("#f07-zzz text", { opacity: 0, y: 10 }, { opacity: 1, y: -10, duration: 0.6, stagger: 0.2, yoyo: true, repeat: 3 }, K.dorm);
        tl.set("#f07-dot", { opacity: 1 }, K.apert);
        tl.fromTo("#f07-dot", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 5 }, K.apert);
        tl.to("#f07-fill", { attr: { width: 1666 }, duration: 0.3 }, K.apert);
        R.shake(tl, "#f07-bar", K.apert + 0.3, 0.4, 5);
      },
      sfx: [
        { name: "pop", t: k.sobre - 0.1, vol: 0.4 },
        { name: "glitch-1", t: k.aum + 0.6, vol: 0.3 },
        { name: "pop", t: k.joelho - 0.1, vol: 0.4 },
        { name: "pop", t: k.comp - 0.1, vol: 0.4 },
        { name: "impact-bass-1", t: k.apert, vol: 0.35 },
      ],
    };
  },
};
