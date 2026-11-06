// F22 — Degrau 4: carga pesada e lenta — o halter volta (1 → 2 → 3 kg), lata cheia com peso, 8 a 12 repetições devagar, gráfico de carga subindo semana a semana
export default {
  extra: 0.8,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      deg: w(0, "Degrau"), aum: w(0, "aumentar"), poucos: w(0, "poucos"), adora: w(0, "adora"), pes: w(0, "pesada"), lenta: w(0, "lenta"),
      oito: w(0, "oito"), doze: w(0, "doze"), rep: w(0, "repetições"), dev: w(0, "devagar"), peso: w(0, "peso"), sem1: w(0, "semana", 0), sem2: w(0, "semana", 1),
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const db = `<g transform="rotate(90)"><g id="f22-db"><rect x="-24" y="-5" width="48" height="10" rx="4" fill="#555" stroke="${C.ink}" stroke-width="3"/><rect x="-32" y="-14" width="12" height="28" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/><rect x="20" y="-14" width="12" height="28" rx="4" fill="#3A3A3A" stroke="${C.ink}" stroke-width="3"/></g></g>`;
    let cida = human("f22c", "cida");
    cida = cida.replace('<g id="f22c-handF">', `<g id="f22c-handF">${db}`);
    const bars = [0, 1, 2, 3].map((i) => `<g id="f22-b${i}"><rect x="${70 + i * 110}" y="${300 - (60 + i * 55)}" width="80" height="${60 + i * 55}" rx="8" fill="${C.good}" stroke="${C.ink}" stroke-width="5"/><text x="${110 + i * 110}" y="330" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="22" fill="${C.ink}">sem ${i + 1}</text></g>`).join("");
    return {
      k,
      css: `
        #f22-head { left:110px; top:60px; font-size:64px; }
        #f22-head span { color:#1E9C72; }
        #f22-kg { left:110px; top:180px; width:300px; padding:12px 18px; text-align:center; }
        #f22-kg .a { font-size:26px; } #f22-kg .b { font-size:80px; line-height:1; color:${C.pain}; }
        #f22-sign { left:1000px; top:170px; padding:14px 26px; font-size:38px; white-space:nowrap; background:${C.sun}; }
        #f22-sign b { color:#1E9C72; }
        #f22-reps { left:1000px; top:290px; padding:12px 24px; font-size:40px; }
        #f22-reps b { color:#1E9C72; }
        #f22-graph { left:1000px; top:410px; width:560px; padding:14px 18px; }
        #f22-graph .t { font-size:26px; text-align:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="860" fill="#E9E4F5"/>
      <rect y="860" width="1920" height="220" fill="#B8B0CC"/><line x1="0" y1="860" x2="1920" y2="860" stroke="${C.ink}" stroke-width="7"/>
      <g transform="translate(300,860)"><rect x="-160" y="-80" width="320" height="14" rx="6" fill="#777" ${st}/>${[-130, -60, 10, 80].map((x, i) => `<rect x="${x}" y="${-130 + i * 6}" width="${36 + i * 6}" height="${50 - i * 6}" rx="8" fill="#3A3A3A" stroke="${C.ink}" stroke-width="4"/>`).join("")}<rect x="-150" y="-70" width="14" height="70" fill="#777" ${st}/><rect x="136" y="-70" width="14" height="70" fill="#777" ${st}/></g>
      <g id="f22-c-wrap"><g transform="translate(640,628) scale(1.3)">${cida}</g></g>
    </svg>
    <div id="f22-head" class="abs title">Degrau 4: <span>CARGA PESADA E LENTA</span></div>
    <div id="f22-kg" class="abs card" style="opacity:0"><div class="a label">o halter volta</div><div class="b title"><span id="f22-n">1</span> kg</div></div>
    <div id="f22-sign" class="abs card title" style="opacity:0">tendão adora carga <b>pesada e lenta</b></div>
    <div id="f22-reps" class="abs card title" style="opacity:0"><b>8 a 12</b> repetições · devagar</div>
    <div id="f22-graph" class="abs card" style="opacity:0">
      <div class="t label">carga, semana a semana</div>
      <svg width="520" height="350" viewBox="0 0 520 350"><line x1="40" y1="300" x2="510" y2="300" stroke="${C.ink}" stroke-width="5"/><line x1="40" y1="300" x2="40" y2="20" stroke="${C.ink}" stroke-width="5"/>${bars}</svg>
    </div>`,
      js: function (tl, K, R) {
        const c = "f22c";
        R.setPose(tl, c, 0, { shF: 10, elF: -6, shB: 10, elB: -6 });
        R.face(tl, c, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, c, 0.4, K.dur);
        tl.set("#f22-db", { scale: 0.7, svgOrigin: "0 0" }, 0);
        // o halter volta e cresce
        R.pop(tl, "#f22-kg", K.aum - 0.2, 0.4);
        tl.set("#f22-n", { textContent: "2" }, K.poucos);
        tl.to("#f22-db", { scale: 1.0, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, K.poucos);
        tl.set("#f22-n", { textContent: "3" }, K.adora);
        tl.to("#f22-db", { scale: 1.3, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, K.adora);
        R.pop(tl, "#f22-sign", K.adora - 0.1, 0.45, 0.6);
        R.pop(tl, "#f22-reps", K.oito - 0.1, 0.4);
        // lata cheia com peso, devagar
        const t0 = K.aum, sp = 2.6, reps = Math.max(2, Math.floor((K.dur - 0.6 - t0) / sp));
        for (let i = 0; i < reps; i++) {
          const t = t0 + i * sp;
          R.pose(tl, c, t, 1.2, { shF: -85, elF: 0 }, "sine.inOut");
          R.pose(tl, c, t + 1.3, 1.2, { shF: 10, elF: -6 }, "sine.inOut");
        }
        R.face(tl, c, K.pes, { eyes: "normal", mouth: "flat" });
        R.face(tl, c, K.peso, { eyes: "happy", mouth: "smile" });
        // gráfico de carga
        R.pop(tl, "#f22-graph", K.peso - 0.3, 0.45, 0.6);
        for (let i = 0; i < 4; i++) tl.fromTo(`#f22-b${i}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, K.sem1 + i * 0.35);
      },
      sfx: [
        { name: "pop", t: k.aum - 0.2, vol: 0.35 },
        { name: "click", t: k.poucos, vol: 0.35 },
        { name: "click", t: k.adora, vol: 0.35 },
        { name: "pop", t: k.oito - 0.1, vol: 0.3 },
        { name: "pop", t: k.peso - 0.3, vol: 0.3 },
        { name: "riser", t: k.sem1, vol: 0.25, dur: 1.6 },
      ],
    };
  },
};
