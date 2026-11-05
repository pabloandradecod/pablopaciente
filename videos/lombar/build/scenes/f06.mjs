// F6 — Aguda, subaguda, crônica: linha do tempo com calendário virando
export default {
  build(ctx) {
    const { C, w } = ctx;
    const k = {
      tempo: w(0, "tempo"), ag: w(0, "aguda"), sub: w(0, "subaguda"), cr: w(0, "crônica"), tres: w(0, "três"), mes: w(0, "meses"),
    };
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const X0 = 200, X1 = 760, X2 = 1320, X3 = 1720, Y = 560;
    const seg = (id, x0, x1, col) => `<g id="${id}"><rect x="${x0}" y="${Y - 40}" width="${x1 - x0}" height="80" fill="${col}" ${st}/></g>`;
    return {
      k,
      css: `
        #f06-ttl { left:0; right:0; top:90px; text-align:center; font-size:72px; }
        #f06-ttl span { color:${C.pain}; }
        .f06-lab { top:640px; width:520px; text-align:center; }
        .f06-lab .n { font-size:56px; }
        .f06-lab .d { font-size:34px; }
        #f06-l0 { left:220px; } #f06-l1 { left:780px; } #f06-l2 { left:1260px; }
        #f06-3m { left:1440px; top:250px; padding:14px 26px; font-size:44px; background:${C.pain}; color:#fff; transform: rotate(5deg); }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect x="0" y="880" width="1920" height="200" fill="${C.floor}"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <rect x="${X0}" y="${Y - 40}" width="${X3 - X0}" height="80" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="7" opacity="0.6"/>
      ${seg("f06-s0", X0, X1, C.good)}${seg("f06-s1", X1, X2, C.sun)}${seg("f06-s2", X2, X3, C.pain)}
      <path d="M${X3} ${Y - 60} L${X3 + 60} ${Y} L${X3} ${Y + 60} Z" fill="${C.pain}" ${st}/>
      ${[[X0, "0"], [X1, "6"], [X2, "12"]].map(([x, t]) => `<g><line x1="${x}" y1="${Y - 70}" x2="${x}" y2="${Y + 50}" stroke="${C.ink}" stroke-width="6"/><text x="${x}" y="${Y - 84}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">${t} sem</text></g>`).join("")}
      <!-- marcador andando -->
      <g id="f06-pin"><g transform="translate(${X0},${Y - 120})"><path d="M0 40 L-22 0 Q-30 -40 0 -44 Q30 -40 22 0 Z" fill="${C.ink}"/><circle cx="0" cy="-14" r="12" fill="#fff"/></g></g>
      <!-- calendário -->
      <g transform="translate(260,300)"><rect x="-90" y="-80" width="180" height="170" rx="16" fill="#fff" ${st}/><rect x="-90" y="-80" width="180" height="46" rx="16" fill="${C.pain}" ${st}/>
        <circle cx="-50" cy="-86" r="9" fill="${C.ink}"/><circle cx="50" cy="-86" r="9" fill="${C.ink}"/>
        <g id="f06-page">${["?", "1", "6", "12", "3 M"].map((s, i) => `<text id="f06-cal${i}" x="0" y="50" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="64" fill="${C.ink}" opacity="${i ? 0 : 1}">${s}</text>`).join("")}</g></g>
    </svg>
    <div id="f06-ttl" class="abs title">Quanto <span>tempo</span> dura?</div>
    <div id="f06-l0" class="abs f06-lab label" style="opacity:0"><div class="n title" style="color:#1E9E73">AGUDA</div><div class="d">até 6 semanas</div></div>
    <div id="f06-l1" class="abs f06-lab label" style="opacity:0"><div class="n title" style="color:#C98A00">SUBAGUDA</div><div class="d">de 6 a 12 semanas</div></div>
    <div id="f06-l2" class="abs f06-lab label" style="opacity:0"><div class="n title" style="color:${C.pain}">CRÔNICA</div><div class="d">mais de 12 semanas</div></div>
    <div id="f06-3m" class="abs card title" style="opacity:0">= uns 3 MESES</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f06-ttl", 0.1, 0.5);
        const grow = (sel, t, x0) => tl.fromTo(sel, { scaleX: 0, svgOrigin: `${x0} 560` }, { scaleX: 1, svgOrigin: `${x0} 560`, duration: 0.6, ease: "power2.out" }, t);
        grow("#f06-s0 rect", K.ag - 0.1, 200);
        R.rise(tl, "#f06-l0", K.ag, 0.4, 30);
        tl.to("#f06-pin", { x: 560, duration: 0.6, ease: "power2.out" }, K.ag - 0.1);
        grow("#f06-s1 rect", K.sub - 0.1, 760);
        R.rise(tl, "#f06-l1", K.sub, 0.4, 30);
        tl.to("#f06-pin", { x: 1120, duration: 0.6, ease: "power2.out" }, K.sub - 0.1);
        grow("#f06-s2 rect", K.cr - 0.1, 1320);
        R.rise(tl, "#f06-l2", K.cr, 0.4, 30);
        tl.to("#f06-pin", { x: 1520, duration: 0.8, ease: "power2.out" }, K.cr - 0.1);
        // calendário vira páginas
        [K.ag, K.sub, K.cr, K.tres].forEach((t, i) => {
          tl.to("#f06-page", { scaleY: 0, svgOrigin: "0 20", duration: 0.12, ease: "power2.in" }, t - 0.12);
          tl.set(`#f06-cal${i}`, { opacity: 0 }, t);
          tl.set(`#f06-cal${i + 1}`, { opacity: 1 }, t);
          tl.to("#f06-page", { scaleY: 1, svgOrigin: "0 20", duration: 0.15, ease: "power2.out" }, t);
        });
        R.pop(tl, "#f06-3m", K.tres - 0.1, 0.45);
      },
      sfx: [
        { name: "pop", t: k.ag, vol: 0.35 },
        { name: "pop", t: k.sub, vol: 0.35 },
        { name: "pop", t: k.cr, vol: 0.4 },
        { name: "sparkle", t: k.tres, vol: 0.35 },
      ],
    };
  },
};
