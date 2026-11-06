// F23 — Degrau 5: de volta pra cima — varal alto, pote na prateleira de cima, elevação lateral na academia com peso moderado; selos ✓; Dona Cida: "Pote guardado, roupa estendida!"
export default {
  speakers: { cida: "f23b" },
  extra: 0.8,
  build(ctx) {
    const { C, human, w, lines } = ctx;
    const k = {
      deg: w(0, "degrau"), cinco: w(0, "cinco"), volt: w(0, "voltar"), varal: w(0, "varal"), prat: w(0, "prateleira"),
      trein: w(0, "treino"), acad: w(0, "academia"), sempre: w(0, "sempre"), prog: w(0, "progredindo"),
      c0: lines[1].start, c1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const shirt = `<g id="f23-shirt"><path d="M-30 -10 L30 -10 L44 10 L30 18 L28 60 L-28 60 L-30 18 L-44 10 Z" fill="#FF8A3D" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/></g>`;
    const pot = `<g id="f23-pot"><rect x="-20" y="-44" width="40" height="44" rx="8" fill="#FFC94A" stroke="${C.ink}" stroke-width="4"/><rect x="-24" y="-52" width="48" height="12" rx="5" fill="#E05A4E" stroke="${C.ink}" stroke-width="4"/></g>`;
    const db = (id) => `<g transform="rotate(90)"><g id="${id}"><rect x="-24" y="-5" width="48" height="10" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-32" y="-14" width="12" height="28" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/><rect x="20" y="-14" width="12" height="28" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/></g></g>`;
    const ca = human("f23a", "cida").replace('<g id="f23a-handF">', `<g id="f23a-handF">${shirt}`);
    const cb = human("f23b", "cida").replace('<g id="f23b-handF">', `<g id="f23b-handF">${pot}`);
    const cc = human("f23c", "cida").replace('<g id="f23c-handF">', `<g id="f23c-handF">${db("f23-dbF")}`).replace('<g id="f23c-handB">', `<g id="f23c-handB">${db("f23-dbB")}`);
    const panel = (x, fill, floor) => `<rect x="${x}" y="200" width="600" height="700" rx="26" fill="${fill}" stroke="${C.ink}" stroke-width="7"/><rect x="${x + 4}" y="770" width="592" height="126" rx="0" fill="${floor}"/><line x1="${x}" y1="770" x2="${x + 600}" y2="770" stroke="${C.ink}" stroke-width="6"/>`;
    const check = (id, x) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="260" r="38" fill="${C.good}" stroke="${C.ink}" stroke-width="6"/><path d="M${x - 18} 260 L${x - 4} 276 L${x + 20} 244" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    return {
      k,
      css: `
        #f23-head { left:110px; top:60px; font-size:64px; }
        #f23-head span { color:#1E9C72; }
        #root .f23-lb { position:absolute; top:920px; width:600px; text-align:center; font-size:34px; }
        #f23-prog { left:1200px; width:620px; top:70px; padding:10px 20px; font-size:34px; text-align:center; }
        #f23-prog b { color:#1E9C72; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="1080" fill="${C.cream}"/>
      <!-- 1: varal -->
      <g id="f23-p0" opacity="0">${panel(30, C.sky, "#8CC56A")}
        <rect x="80" y="330" width="14" height="440" fill="#8B5A2B" ${st}/><rect x="570" y="330" width="14" height="440" fill="#8B5A2B" ${st}/>
        <path d="M87 350 Q330 370 577 350" fill="none" stroke="${C.ink}" stroke-width="5"/>
        <g transform="translate(160,360)"><rect x="-26" y="0" width="52" height="64" rx="5" fill="#7FC8F8" stroke="${C.ink}" stroke-width="4"/></g>
        <g transform="translate(270,602) scale(0.9)">${ca}</g>
        ${check("f23-k0", 560)}
      </g>
      <!-- 2: prateleira -->
      <g id="f23-p1" opacity="0">${panel(660, "#FCE9C8", "#D9B98C")}
        <rect x="900" y="340" width="330" height="18" rx="5" fill="#B07A4A" ${st}/>
        ${[0, 1, 2].map((i) => `<rect x="${920 + i * 60}" y="298" width="40" height="42" rx="6" fill="${["#7FC8F8", "#3DD9A4", "#B07ED8"][i]}" stroke="${C.ink}" stroke-width="4"/>`).join("")}
        <rect id="f23-slot" x="1124" y="292" width="44" height="48" rx="6" fill="none" stroke="${C.ink}" stroke-width="4" stroke-dasharray="8 8"/>
        <g id="f23-potshelf" opacity="0"><g transform="translate(1146,340)"><rect x="-20" y="-44" width="40" height="44" rx="8" fill="#FFC94A" stroke="${C.ink}" stroke-width="4"/><rect x="-24" y="-52" width="48" height="12" rx="5" fill="#E05A4E" stroke="${C.ink}" stroke-width="4"/></g></g>
        <g transform="translate(900,602) scale(0.9)">${cb}</g>
        ${check("f23-k1", 1190)}
      </g>
      <!-- 3: academia -->
      <g id="f23-p2" opacity="0">${panel(1290, "#E9E4F5", "#B8B0CC")}
        <text x="1590" y="300" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="${C.ink}">ACADEMIA</text>
        <g transform="translate(1530,602) scale(0.9)">${cc}</g>
        ${check("f23-k2", 1820)}
      </g>
    </svg>
    <div id="f23-head" class="abs title">Degrau 5: <span>DE VOLTA PRA CIMA</span></div>
    <div id="f23-lb0" class="abs f23-lb title" style="left:30px;opacity:0">varal</div>
    <div id="f23-lb1" class="abs f23-lb title" style="left:660px;opacity:0">prateleira</div>
    <div id="f23-lb2" class="abs f23-lb title" style="left:1290px;opacity:0">treino de ombro</div>
    <div id="f23-prog" class="abs card label" style="opacity:0">sempre <b>progredindo aos poucos</b></div>`,
      js: function (tl, K, R) {
        ["f23a", "f23b", "f23c"].forEach((id) => {
          R.setPose(tl, id, 0, { shF: 10, elF: -10, shB: 10, elB: -10 });
          R.face(tl, id, 0, { eyes: "happy", mouth: "smile" });
        });
        tl.set("#f23-dbF, #f23-dbB", { scale: 1.1, svgOrigin: "0 0" }, 0);
        // 1: varal
        R.pop(tl, "#f23-p0", Math.min(K.volt, K.varal - 0.4), 0.4, 0.7);
        R.rise(tl, "#f23-lb0", K.varal - 0.2, 0.3, 14);
        R.pose(tl, "f23a", K.varal, 0.5, { shF: -170, elF: -10 }, "power2.out");
        R.pop(tl, "#f23-k0", K.varal + 0.6, 0.35);
        // 2: prateleira
        R.pop(tl, "#f23-p1", K.prat - 0.4, 0.4, 0.7);
        R.rise(tl, "#f23-lb1", K.prat - 0.2, 0.3, 14);
        R.pose(tl, "f23b", K.prat, 0.5, { shF: -158, elF: -8 }, "power2.out");
        tl.set("#f23-pot", { opacity: 0 }, K.prat + 0.55);
        tl.set("#f23-potshelf", { opacity: 1 }, K.prat + 0.55);
        tl.set("#f23-slot", { opacity: 0 }, K.prat + 0.55);
        R.pose(tl, "f23b", K.prat + 0.8, 0.4, { shF: 10, elF: -10 });
        R.pop(tl, "#f23-k1", K.prat + 0.7, 0.35);
        // 3: elevação lateral na academia
        R.pop(tl, "#f23-p2", K.trein - 0.4, 0.4, 0.7);
        R.rise(tl, "#f23-lb2", K.trein - 0.2, 0.3, 14);
        const t0 = K.trein + 0.1, sp = 1.6, reps = Math.max(2, Math.floor((K.dur - 0.4 - t0) / sp));
        for (let i = 0; i < reps; i++) {
          const t = t0 + i * sp;
          R.pose(tl, "f23c", t, 0.7, { shF: -85, shB: -85, elF: 0, elB: 0 }, "sine.inOut");
          R.pose(tl, "f23c", t + 0.8, 0.7, { shF: 10, shB: 10, elF: -10, elB: -10 }, "sine.inOut");
        }
        R.pop(tl, "#f23-k2", K.acad + 0.3, 0.35);
        R.pop(tl, "#f23-prog", K.sempre - 0.1, 0.4);
        // Dona Cida comemora
        R.face(tl, "f23a", K.c0, { eyes: "happy", mouth: "grin" });
        R.pose(tl, "f23a", K.c0, 0.3, { shF: 10, elF: -10 });
        R.pose(tl, "f23b", K.c0 + 0.2, 0.3, { shF: -150, elF: -20 }, "back.out(2)");
      },
      sfx: [
        { name: "pop", t: Math.min(k.volt, k.varal - 0.4), vol: 0.35 },
        { name: "ping", t: k.varal + 0.6, vol: 0.3 },
        { name: "pop", t: k.prat - 0.4, vol: 0.35 },
        { name: "ping", t: k.prat + 0.7, vol: 0.3 },
        { name: "pop", t: k.trein - 0.4, vol: 0.35 },
        { name: "ping", t: k.acad + 0.3, vol: 0.3 },
        { name: "chime", t: k.c0, vol: 0.3 },
      ],
    };
  },
};
