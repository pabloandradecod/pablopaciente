// F25 — Exercício 6: hábitos ao sentar — tira a carteira do bolso, levanta a cada 30–40 min, voltinha no posto
export function carSVG(id, C, st) {
  return `<g id="${id}">
        <path d="M600 440 L650 300 Q665 270 720 270 L1130 270 Q1180 270 1205 310 L1270 440 Z" fill="#CFEFF7" opacity="0.35"/>
        <path d="M470 560 Q470 520 520 520 L1360 520 Q1430 520 1440 580 L1450 760 Q1450 800 1410 800 L500 800 Q470 800 470 770 Z" fill="${C.sun}" ${st}/>
        <path d="M580 520 L640 300 Q660 250 720 250 L1140 250 Q1200 250 1230 300 L1300 520" fill="none" stroke="${C.sun}" stroke-width="26" stroke-linejoin="round"/>
        <path d="M580 520 L640 300 Q660 250 720 250 L1140 250 Q1200 250 1230 300 L1300 520" fill="none" ${st}/>
        <line x1="960" y1="250" x2="960" y2="520" stroke="${C.sun}" stroke-width="22"/><line x1="960" y1="250" x2="960" y2="520" ${st} fill="none"/>
        <rect x="830" y="210" width="200" height="44" rx="12" fill="${C.ink}"/><text x="930" y="241" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="26" fill="#fff">APP</text>
        <rect x="1080" y="560" width="70" height="16" rx="8" fill="${C.ink}"/>
        <circle cx="1415" cy="600" r="22" fill="#fff" ${st}/>
        <g><circle cx="680" cy="810" r="70" fill="#333" ${st}/><circle cx="680" cy="810" r="28" fill="#ccc" stroke="${C.ink}" stroke-width="6"/></g>
        <g><circle cx="1250" cy="810" r="70" fill="#333" ${st}/><circle cx="1250" cy="810" r="28" fill="#ccc" stroke="${C.ink}" stroke-width="6"/></g>
      </g>`;
}

export function streetSVG(C, prefix) {
  return `<rect width="1920" height="880" fill="${C.sky}"/>
      <g fill="#fff" stroke="${C.ink}" stroke-width="6" opacity="0.9"><ellipse cx="300" cy="200" rx="110" ry="40"/><ellipse cx="1600" cy="150" rx="130" ry="44"/></g>
      <g id="${prefix}-city">${[[60, 380], [260, 300], [460, 420], [1420, 330], [1640, 400], [1820, 300]].map(([x, h], i) => `<rect x="${x}" y="${880 - h}" width="170" height="${h}" fill="${i % 2 ? "#9CC9D3" : "#B5D9E0"}" stroke="${C.ink}" stroke-width="6"/>`).join("")}</g>
      <rect y="880" width="1920" height="200" fill="#8E9AA0"/>
      <line x1="0" y1="880" x2="1920" y2="880" stroke="${C.ink}" stroke-width="7"/>
      <g stroke="#fff" stroke-width="12">${[100, 500, 900, 1300, 1700].map((x) => `<line x1="${x}" y1="980" x2="${x + 160}" y2="980"/>`).join("")}</g>`;
}

export default {
  extra: 1.0,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      seis: w(0, "seis"), hab: w(0, "hábito"), tira: w(0, "tira"), cart: w(0, "carteira"), bolso: w(0, "bolso"),
      trinta: w(0, "trinta"), sent: w(0, "sentado"), lev: w(0, "levanta"), anda: w(0, "anda"), ze: w(0, "Seu"),
      abast: w(0, "abastecer"), volt: w(0, "voltinha"),
    };
    const sfx = [
      { name: "whoosh", t: 0.05, vol: 0.4 },
      { name: "whoosh-short", t: k.cart, vol: 0.4 },
      { name: "pop", t: k.cart + 0.55, vol: 0.45 },
      { name: "notification", t: k.trinta, vol: 0.4 },
      { name: "whoosh", t: k.lev + 0.2, vol: 0.45 },
      { name: "pop", t: k.abast, vol: 0.4 },
      { name: "sparkle", t: k.volt, vol: 0.4 },
    ];
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    const row = (i, txt, dot = C.good) => `<div class="row label" id="f25-r${i}" style="opacity:0.25"><div class="dot" style="background:${dot}"></div>${txt}</div>`;
    return {
      k,
      sfx,
      css: `
        #f25-head { left:110px; top:70px; font-size:76px; }
        #f25-head span { color:${C.good}; }
        #f25-card { left:1300px; top:150px; width:520px; padding:28px 34px; }
        #f25-card .t { font-size:42px; }
        #f25-card .row { font-size:32px; margin-top:13px; display:flex; align-items:center; gap:14px; }
        #f25-card .dot { width:22px; height:22px; border-radius:50%; border:5px solid ${C.ink}; flex:none; }
        #f25-phone { left:1380px; top:520px; width:360px; height:250px; border-radius:30px; background:${C.ink}; border:7px solid ${C.ink}; box-shadow:10px 10px 0 rgba(1,62,76,0.35); padding:22px; }
        #f25-phone .scr { background:#fff; border-radius:18px; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
        #f25-phone .a { font-size:34px; color:${C.ink}; }
        #f25-phone .b { font-size:46px; color:${C.pain}; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${streetSVG(C, "f25")}
      <!-- posto de gasolina -->
      <g id="f25-pump" opacity="0"><g id="f25-pump-in">
        <rect x="1050" y="620" width="120" height="260" rx="14" fill="${C.pain}" ${st}/>
        <rect x="1070" y="650" width="80" height="60" rx="8" fill="#fff" ${st}/>
        <rect x="1030" y="860" width="160" height="22" rx="6" fill="${C.grey}" ${st}/>
        <path d="M1170 680 Q1220 690 1210 760 L1200 800" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
        <rect x="1060" y="590" width="100" height="36" rx="10" fill="${C.ink}"/><text x="1110" y="616" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="#fff">POSTO</text>
      </g></g>
      <g transform="translate(-330,0)">
        <g id="f25-zw"><g transform="translate(900,640) scale(1.3)">${human("f25z", "ze")}</g></g>
        ${carSVG("f25-car", C, st)}
        <!-- carteira voando para o painel -->
        <g id="f25-wal" opacity="0"><g id="f25-wal-in"><rect x="-40" y="-28" width="80" height="56" rx="10" fill="#8B5A2B" stroke="${C.ink}" stroke-width="6"/><rect x="-32" y="-16" width="64" height="9" fill="${C.good}"/></g></g>
        <rect id="f25-tray" x="1060" y="500" width="130" height="26" rx="8" fill="${C.ink}" opacity="0.85"/>
      </g>
    </svg>
    <div id="f25-head" class="abs title">6. <span>HÁBITOS</span></div>
    <div id="f25-card" class="abs card">
      <div class="t title">Ao sentar</div>
      ${row(0, "Carteira fora do bolso de trás")}
      ${row(1, "<span>A cada <b>30–40 min</b>, levanta</span>")}
      ${row(2, "Anda um pouquinho")}
    </div>
    <div id="f25-phone" class="abs" style="opacity:0"><div class="scr"><div class="a label">30–40 min sentado?</div><div class="b title">LEVANTA!</div></div></div>`,
      js: function (tl, K, R) {
        const z = "f25z";
        const sit = { hipB: -88, hipF: -92, knB: 88, knF: 92, torso: -4, shF: -70, elF: -50, shB: -60, elB: -50 };
        R.setPose(tl, z, 0, sit);
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f25-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f25-card", 0.2, 0.55, 400);
        tl.fromTo("#f25-car", { x: 900 }, { x: 0, duration: 0.6, ease: "back.out(1.2)" }, 0);
        tl.fromTo("#f25-zw", { x: 900 }, { x: 0, duration: 0.6, ease: "back.out(1.2)" }, 0);
        // tira a carteira do bolso de trás e joga no painel
        R.pose(tl, z, K.tira - 0.1, 0.35, { shB: 30, elB: -40, torso: 6 }, "power2.out");
        R.face(tl, z, K.tira, { eyes: "wide", mouth: "flat" });
        tl.set("#f25-wal", { opacity: 1 }, K.cart - 0.05);
        tl.fromTo("#f25-wal-in", { x: 860, y: 600, rotation: 0 }, { x: 1125, y: 490, rotation: 360, svgOrigin: "0 0", duration: 0.6, ease: "power2.out" }, K.cart);
        R.pose(tl, z, K.cart + 0.1, 0.4, { shB: -60, elB: -50, torso: -4, shF: -120, elF: -30 }, "back.out(1.6)");
        tl.to("#f25-r0", { opacity: 1, duration: 0.25 }, K.cart + 0.5);
        R.face(tl, z, K.bolso, { eyes: "happy", mouth: "grin" });
        R.pose(tl, z, K.bolso + 0.4, 0.4, sit);
        // alarme do celular
        R.pop(tl, "#f25-phone", K.trinta - 0.1, 0.45);
        R.shake(tl, "#f25-phone", K.trinta + 0.4, 0.5, 6);
        tl.to("#f25-r1", { opacity: 1, duration: 0.25 }, K.trinta);
        // levanta: o carro sai, ele fica em pé
        R.fadeOut(tl, "#f25-phone", K.lev - 0.2);
        R.pose(tl, z, K.lev, 0.4, { hipB: 0, hipF: 0, knB: 0, knF: 0, torso: 0, shF: -10, elF: -20, shB: 10, elB: -10 });
        tl.to("#f25-car, #f25-wal, #f25-tray", { x: -1800, duration: 0.8, ease: "power2.in" }, K.lev + 0.2);
        // anda um pouco
        tl.to("#f25-r2", { opacity: 1, duration: 0.25 }, K.anda);
        const walk = (t0, t1, x0, x1) => {
          const n = Math.max(2, Math.round((t1 - t0) / 0.32));
          for (let i = 0; i < n; i++) R.pose(tl, z, t0 + i * ((t1 - t0) / n), (t1 - t0) / n, { hipF: i % 2 ? 22 : -22, hipB: i % 2 ? -22 : 22, knF: i % 2 ? 18 : 0, knB: i % 2 ? 0 : 18, shF: i % 2 ? -25 : 15, shB: i % 2 ? 15 : -25 }, "sine.inOut");
          R.move(tl, z, t0, t1 - t0, x1, 0, "none");
          R.pose(tl, z, t1, 0.25, { hipF: 0, hipB: 0, knF: 0, knB: 0, shF: -10, shB: 10 });
        };
        walk(K.anda, K.ze - 0.1, 0, 230);
        // posto: cada parada pra abastecer vale uma voltinha
        R.pop(tl, "#f25-pump-in", K.abast - 0.3, 0.45);
        tl.set("#f25-pump", { opacity: 1 }, K.abast - 0.3);
        walk(K.abast + 0.2, K.volt + 0.4, 230, 470);
        R.face(tl, z, K.volt, { eyes: "happy", mouth: "grin" });
        R.pose(tl, z, K.volt + 0.6, 0.4, { shF: -150, elF: -20 }, "back.out(2)");
      },
    };
  },
};
