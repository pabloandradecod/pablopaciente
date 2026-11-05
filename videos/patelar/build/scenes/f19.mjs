// F19 — Degrau 2: força lenta e pesada (leg press, extensora, agachamento; 3 s sobe, 3 s desce; carga sobe aos poucos); Patelito conta
export default {
  speakers: { patelito: "f19p" },
  extra: 0.4,
  build(ctx) {
    const { C, human, patelito, w, lines } = ctx;
    const k = {
      deg: w(0, "Degrau"), forca: w(0, "força"), lenta: w(0, "lenta"), pes: w(0, "pesada"), leg: w(0, "Leg"), cad: w(0, "cadeira"), aga: w(0, "agachamento"),
      tres: w(0, "três"), sub: w(0, "subir"), desc: w(0, "descer"), carga: w(0, "carga"), aum: w(0, "aumentando"), sem: w(0, "semanas"), reo: w(0, "reorganiza"),
      p0: lines[1].start, p1: lines[1].end,
    };
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
    const ex = (id, x, label, svg) => `<div id="${id}" class="abs card f19-ex" style="left:${x}px;opacity:0"><svg width="150" height="110" viewBox="0 0 150 110">${svg}</svg><div class="label">${label}</div></div>`;
    return {
      k,
      css: `
        #f19-head { left:110px; top:60px; font-size:66px; }
        #f19-head span { color:#1E9C72; }
        #root .f19-ex { top:170px; width:190px; padding:10px 12px; text-align:center; font-size:24px; }
        #f19-card { left:1330px; top:150px; width:520px; padding:24px 30px; }
        #f19-card .t { font-size:38px; }
        #f19-card .row { font-size:28px; margin-top:12px; display:flex; align-items:center; gap:14px; line-height:1.15; }
        #f19-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f19-stop { left:1330px; top:700px; width:520px; padding:14px 20px; font-size:23px; white-space:nowrap; background:${C.good}; color:${C.ink}; text-align:center; }
        #f19-stop b { font-size:30px; display:block; }
        #f19-tempo { left:110px; top:180px; width:250px; padding:14px; text-align:center; }
        #f19-tempo .n { font-size:46px; }
        #f19-load { left:900px; top:380px; width:400px; padding:14px 18px; }
        #f19-load .l { font-size:24px; }
        #f19-fib { left:900px; top:630px; width:400px; padding:12px 18px; display:flex; align-items:center; gap:14px; font-size:24px; }
        #f19-count { left:720px; top:470px; width:110px; height:110px; border-radius:50%; background:${C.sun}; border:7px solid ${C.ink}; font-size:64px; display:flex; align-items:center; justify-content:center; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="830" fill="${C.wall}"/>
      <rect y="830" width="1920" height="250" fill="${C.floor}"/><line x1="0" y1="830" x2="1920" y2="830" stroke="${C.ink}" stroke-width="7"/>
      <!-- metrônomo -->
      <g id="f19-metro" opacity="0">
        <path d="M170 820 L300 820 L262 600 L208 600 Z" fill="#8B5A2B" ${st}/>
        <g id="f19-pend"><line x1="235" y1="800" x2="235" y2="610" stroke="${C.ink}" stroke-width="8"/><rect x="221" y="660" width="28" height="22" rx="4" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/></g>
      </g>
      <g id="f19-j-wrap"><g transform="translate(560,640) scale(1.25)">${human("f19j", "juninho")}</g></g>
      <g id="f19-p-wrap" opacity="0"><g transform="translate(790,820) scale(0.75)">${patelito("f19p")}</g></g>
    </svg>
    <div id="f19-head" class="abs title">2. <span>FORÇA LENTA E PESADA</span></div>
    ${ex("f19-e0", 700, "Leg press", `<rect x="10" y="80" width="130" height="16" rx="6" fill="#8E9AA0" ${st}/><path d="M30 80 L60 30 L120 30" fill="none" ${st} stroke="#5E6B73" stroke-width="10"/><rect x="100" y="14" width="40" height="40" rx="6" fill="${C.pain}" ${st}/>`)}
    ${ex("f19-e1", 910, "Extensora", `<rect x="20" y="40" width="70" height="20" rx="6" fill="#8E9AA0" ${st}/><rect x="20" y="10" width="20" height="50" rx="6" fill="#8E9AA0" ${st}/><path d="M90 60 L130 40" ${st} stroke="#5E6B73" stroke-width="10"/><circle cx="130" cy="40" r="12" fill="${C.pain}" ${st}/><line x1="40" y1="60" x2="40" y2="100" ${st}/><line x1="80" y1="60" x2="80" y2="100" ${st}/>`)}
    ${ex("f19-e2", 1120, "Agachamento", `<line x1="20" y1="30" x2="130" y2="30" ${st} stroke-width="8"/><rect x="8" y="14" width="18" height="34" rx="4" fill="${C.pain}" ${st}/><rect x="124" y="14" width="18" height="34" rx="4" fill="${C.pain}" ${st}/><circle cx="75" cy="56" r="14" fill="#C98A5E" ${st}/><path d="M75 70 L75 90 L60 104 M75 90 L92 104" ${st} fill="none"/>`)}
    <div id="f19-tempo" class="abs card" style="opacity:0"><div class="n title"><span style="color:#1E9C72">3s</span> ↑</div><div class="n title"><span style="color:${C.pain}">3s</span> ↓</div></div>
    <div id="f19-count" class="abs title" style="opacity:0">${["3", "2", "1"].map((s, i) => `<span id="f19-c${i}" style="position:absolute;opacity:0">${s}</span>`).join("")}</div>
    <div id="f19-load" class="abs card" style="opacity:0"><div class="l label">CARGA NAS SEMANAS</div>
      <svg width="360" height="150" viewBox="0 0 360 150"><line x1="10" y1="140" x2="350" y2="140" stroke="${C.ink}" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect id="f19-l${i}" x="${20 + i * 55}" y="${136 - (16 + i * 12)}" width="40" height="${16 + i * 12}" rx="6" fill="${C.sun}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</svg></div>
    <div id="f19-fib" class="abs card label" style="opacity:0">
      <svg width="150" height="70" viewBox="0 0 150 70">
        <g id="f19-mess"><path d="M10 35 Q30 5 50 35 T90 35 Q110 60 130 20 M15 50 Q40 20 70 50 T130 45 M20 20 Q50 60 80 20 T140 30" fill="none" stroke="${C.pain}" stroke-width="5"/></g>
        <g id="f19-neat" opacity="0"><path d="M10 18 L140 18 M10 35 L140 35 M10 52 L140 52" stroke="#1E9C72" stroke-width="6" stroke-linecap="round"/></g>
      </svg><span>o tendão se <b style="color:#1E9C72">reorganiza</b></span></div>
    <div id="f19-card" class="abs card" style="opacity:0">
      <div class="t title">Força lenta e pesada</div>
      <div class="row label"><span class="dot"></span>Leg press, extensora ou agachamento</div>
      <div class="row label"><span class="dot"></span>3 s pra subir · 3 s pra descer</div>
      <div class="row label"><span class="dot"></span>3 a 4 séries</div>
      <div class="row label"><span class="dot"></span>Carga sobe aos poucos, semana a semana</div>
    </div>
    <div id="f19-stop" class="abs card label">Dor até 3/10 e normal no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const j = "f19j";
        R.setPose(tl, j, 0, { shF: -80, elF: -100, shB: -80, elB: -100 });
        R.face(tl, j, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, j, 0.4, K.dur);
        R.pop(tl, "#f19-card", K.forca - 0.2, 0.45, 0.6);
        // exercícios entram na fala
        R.pop(tl, "#f19-e0", K.leg - 0.1, 0.35);
        R.pop(tl, "#f19-e1", K.cad - 0.1, 0.35);
        R.pop(tl, "#f19-e2", K.aga - 0.1, 0.35);
        // metrônomo + tempo 3s/3s
        tl.set("#f19-metro", { opacity: 1 }, K.lenta - 0.2);
        tl.fromTo("#f19-metro", { y: 200 }, { y: 0, duration: 0.4, ease: "back.out(1.6)" }, K.lenta - 0.2);
        tl.fromTo("#f19-pend", { rotation: -22 }, { rotation: 22, svgOrigin: "235 800", duration: 0.75, yoyo: true, repeat: Math.max(3, Math.floor((K.dur - K.lenta) / 0.75) - 1), ease: "sine.inOut" }, K.lenta);
        R.pop(tl, "#f19-tempo", K.tres - 0.2, 0.4);
        // agachamento lento: desce 3 s, sobe 3 s (2 reps)
        let t = K.pes;
        for (let i = 0; i < 2; i++) {
          R.pose(tl, j, t, 2.4, { hipF: -80, knF: 90, hipB: -80, knB: 90, torso: 30, neck: -15 }, "sine.inOut");
          tl.to("#f19-j-wrap", { y: 70, duration: 2.4, ease: "sine.inOut" }, t);
          R.pose(tl, j, t + 2.6, 2.4, { hipF: 0, knF: 0, hipB: 0, knB: 0, torso: 0, neck: 0 }, "sine.inOut");
          tl.to("#f19-j-wrap", { y: 0, duration: 2.4, ease: "sine.inOut" }, t + 2.6);
          t += 5.2;
        }
        R.face(tl, j, K.pes + 1, { eyes: "normal", mouth: "flat" });
        // carga semana a semana
        R.pop(tl, "#f19-load", K.carga - 0.2, 0.4);
        for (let i = 0; i < 6; i++) tl.fromTo(`#f19-l${i}`, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, K.aum + i * 0.12);
        // tendão se reorganiza
        R.pop(tl, "#f19-fib", K.reo - 0.6, 0.4);
        tl.to("#f19-mess", { opacity: 0, duration: 0.35 }, K.reo);
        tl.to("#f19-neat", { opacity: 1, duration: 0.35 }, K.reo);
        // Patelito conta 3, 2, 1... sobe! 3, 2, 1... desce!
        tl.set("#f19-p-wrap", { opacity: 1 }, K.p0 - 0.4);
        tl.fromTo("#f19-p-wrap", { y: 300 }, { y: 0, duration: 0.35, ease: "back.out(1.6)" }, K.p0 - 0.4);
        R.face(tl, "f19p", 0, { eyes: "normal", mouth: "smile" });
        R.setPose(tl, "f19p", 0, { armF: -150, armB: 20 });
        R.pop(tl, "#f19-count", K.p0 - 0.1, 0.3);
        const half = (K.p1 - K.p0) / 2;
        for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) {
          const tt = K.p0 + r * half + (i * half) / 4;
          tl.set("#f19-c0, #f19-c1, #f19-c2", { opacity: 0 }, tt);
          tl.set(`#f19-c${i}`, { opacity: 1 }, tt);
        }
        tl.to("#f19-count", { opacity: 0, duration: 0.2 }, K.p1);
        R.face(tl, "f19p", K.p1, { eyes: "happy" });
      },
      sfx: [
        { name: "pop", t: k.forca - 0.2, vol: 0.35 },
        { name: "pop", t: k.leg - 0.1, vol: 0.3 }, { name: "pop", t: k.cad - 0.1, vol: 0.3 }, { name: "pop", t: k.aga - 0.1, vol: 0.3 },
        { name: "click-soft", t: k.lenta + 0.75, vol: 0.3 }, { name: "click-soft", t: k.lenta + 2.25, vol: 0.3 }, { name: "click-soft", t: k.lenta + 3.75, vol: 0.3 },
        { name: "pop", t: k.carga - 0.2, vol: 0.3 },
        { name: "sparkle", t: k.reo, vol: 0.35 },
        { name: "pop", t: k.p0 - 0.4, vol: 0.35 },
      ],
    };
  },
};
