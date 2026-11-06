// F22 — Exercício 6: força de trás da coxa em pé (calcanhar ao bumbum, caneleira leve) + subir degrau baixo com joelho alinhado (Seu Zé)
export default {
  extra: 0.6,
  build(ctx) {
    const { C, human, w } = ctx;
    const k = {
      seis: w(0, "Seis"), fort: w(0, "fortalecer"), tras: w(0, "trás"), puxam: w(0, "puxam"), sub: w(0, "subir"), alin: w(0, "alinhado"), carga: w(0, "Carga"), poucos: w(0, "poucos"),
    };
    // flexões de joelho até "subir"; depois subidas de degrau
    const curls = [];
    for (let t = k.fort + 0.2; t < k.sub - 1.0; t += 1.3) curls.push(+t.toFixed(3));
    const steps = [];
    for (let t = k.sub + 0.3; t < ctx.dur - 2.0; t += 2.6) steps.push(+t.toFixed(3));
    k.curls = curls; k.steps = steps;
    const sfx = [{ name: "whoosh", t: 0.05, vol: 0.4 }, { name: "pop", t: k.tras, vol: 0.35 }, { name: "whoosh-short", t: k.sub, vol: 0.4 }, { name: "pop", t: k.alin, vol: 0.35 }, { name: "pop", t: k.carga, vol: 0.35 }];
    curls.forEach((t) => sfx.push({ name: "click-soft", t: t + 0.45, vol: 0.3 }));
    const st = `stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"`;
    return {
      k,
      sfx,
      css: `
        #f22-head { left:110px; top:80px; font-size:80px; }
        #f22-head span { color:${C.good}; }
        #f22-card { left:1340px; top:150px; width:480px; padding:26px 30px; }
        #f22-card .t { font-size:40px; }
        #f22-card .row { font-size:29px; margin-top:12px; display:flex; align-items:center; gap:14px; }
        #f22-card .dot { width:22px; height:22px; border-radius:50%; background:${C.good}; border:5px solid ${C.ink}; flex:none; }
        #f22-ok { left:1380px; top:690px; width:440px; padding:14px 18px; font-size:27px; background:${C.good}; text-align:center; }
        #f22-ok b { font-size:31px; display:block; }
        #f22-tag { left:120px; top:210px; padding:12px 20px; font-size:30px; }
        #f22-tag2 { left:120px; top:210px; padding:12px 20px; font-size:30px; }
        #f22-load { left:820px; top:250px; width:380px; padding:16px 20px; }
        #f22-load .t { font-size:26px; margin-bottom:8px; }
      `,
      html: `
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      <rect width="1920" height="850" fill="${C.wall}"/>
      <rect y="850" width="1920" height="230" fill="${C.floor}"/>
      <line x1="0" y1="850" x2="1920" y2="850" stroke="${C.ink}" stroke-width="7"/>
      <!-- parede de apoio (parte 1) -->
      <g id="f22-wall"><rect x="680" y="300" width="30" height="550" fill="#9FC3CC" ${st}/></g>
      <!-- degrau baixo (parte 2) -->
      <g id="f22-step" opacity="0"><rect x="560" y="770" width="300" height="80" rx="8" fill="#C99A62" ${st}/><path d="M572 790 L848 790" stroke="#B07A4A" stroke-width="5"/></g>
      <g id="f22-zw"><g transform="translate(500,640) scale(1.2)">${human("f22z", "ze")}</g></g>
      <!-- caneleira no tornozelo (acompanha via grupo próprio) -->
      <g id="f22-ank" opacity="0"><rect x="-26" y="-16" width="52" height="32" rx="12" fill="${C.pain}" stroke="${C.ink}" stroke-width="5"/><text x="0" y="8" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="18" fill="#fff">1kg</text></g>
      <!-- linha guia joelho-pé (parte 2) -->
      <g id="f22-guide" opacity="0"><line x1="640" y1="560" x2="640" y2="840" stroke="${C.good}" stroke-width="6" stroke-dasharray="14 10"/></g>
    </svg>
    <div id="f22-head" class="abs title">6. <span>FORÇA ATRÁS + DEGRAU</span></div>
    <div id="f22-tag" class="abs card label" style="opacity:0">calcanhar ao bumbum · <b style="color:${C.pain}">caneleira leve</b></div>
    <div id="f22-tag2" class="abs card label" style="opacity:0">degrau baixo · <b style="color:#1E9C72">joelho alinhado</b></div>
    <div id="f22-load" class="abs card" style="opacity:0">
      <div class="t label">CARGA NAS SEMANAS</div>
      <svg width="340" height="120" viewBox="0 0 340 120"><line x1="10" y1="110" x2="330" y2="110" stroke="${C.ink}" stroke-width="5"/>
        ${[0, 1, 2, 3, 4].map((i) => `<rect id="f22-b${i}" x="${24 + i * 62}" y="${100 - (i + 1) * 17}" width="42" height="${(i + 1) * 17}" rx="6" fill="${C.good}" stroke="${C.ink}" stroke-width="4"/>`).join("")}</svg>
    </div>
    <div id="f22-card" class="abs card">
      <div class="t title">Força + degrau</div>
      <div class="row label" id="f22-r0"><div class="dot"></div>Calcanhar ao bumbum, em pé</div>
      <div class="row label" id="f22-r1"><div class="dot"></div>Subir degrau baixo</div>
      <div class="row label" id="f22-r2"><div class="dot"></div>Joelho alinhado com o pé</div>
      <div class="row label" id="f22-r3"><div class="dot" style="background:${C.sun}"></div><b>3 x 10 · carga leve, sobe aos poucos</b></div>
    </div>
    <div id="f22-ok" class="abs card label">Dor até 3/10 e normal no dia seguinte:<b>OK</b></div>`,
      js: function (tl, K, R) {
        const z = "f22z";
        R.setPose(tl, z, 0, { shF: -70, elF: -20, shB: -60, elB: -20 });
        R.face(tl, z, 0, { eyes: "normal", mouth: "smile" });
        R.blinks(tl, z, 0, K.dur);
        R.slideIn(tl, "#f22-head", 0.05, 0.5, -300);
        R.slideIn(tl, "#f22-card", 0.2, 0.55, 400);
        R.pop(tl, "#f22-ok", 0.6, 0.4);
        [K.fort, K.sub, K.alin, K.carga].forEach((t, i) => tl.fromTo(`#f22-r${i}`, { opacity: 0.25 }, { opacity: 1, duration: 0.25 }, t));
        // parte 1: flexão de joelho em pé, mão na parede
        R.pop(tl, "#f22-tag", K.fort - 0.1, 0.4);
        R.pop(tl, "#f22-ank", K.fort, 0.3);
        // caneleira acompanha o tornozelo da perna de trás: posição de repouso e dobrada
        tl.set("#f22-ank", { x: 492, y: 852 }, 0);
        K.curls.forEach((t) => {
          R.pose(tl, z, t, 0.45, { knB: 105, hipB: 6 }, "power2.out");
          tl.to("#f22-ank", { x: 400, y: 770, duration: 0.45, ease: "power2.out" }, t);
          R.face(tl, z, t + 0.3, { eyes: "closed", mouth: "flat" });
          R.pose(tl, z, t + 0.6, 0.5, { knB: 0, hipB: 0 }, "power2.inOut");
          tl.to("#f22-ank", { x: 492, y: 852, duration: 0.5, ease: "power2.inOut" }, t + 0.6);
          R.face(tl, z, t + 0.7, { eyes: "normal", mouth: "smile" });
        });
        // parte 2: degrau
        tl.to("#f22-wall, #f22-ank, #f22-tag", { opacity: 0, duration: 0.3 }, K.sub - 0.3);
        tl.to("#f22-step", { opacity: 1, duration: 0.3 }, K.sub - 0.3);
        R.pose(tl, z, K.sub - 0.3, 0.3, { shF: -10, elF: -20, shB: 5, elB: -10 });
        R.pop(tl, "#f22-tag2", K.sub, 0.4);
        R.fadeIn(tl, "#f22-guide", K.alin - 0.1, 0.3);
        K.steps.forEach((t) => {
          R.pose(tl, z, t, 0.4, { hipF: -60, knF: 72, shF: -30, shB: 20 }, "power2.out");
          R.pose(tl, z, t + 0.45, 0.5, { hipF: -6, knF: 8, hipB: 20, knB: 50, torso: 6 }, "power2.inOut");
          tl.to("#f22-zw", { x: 110, y: -80, duration: 0.5, ease: "power2.inOut" }, t + 0.45);
          R.pose(tl, z, t + 0.95, 0.3, { hipB: 0, knB: 0, hipF: 0, knF: 0, torso: 0, shF: -10, shB: 5 });
          R.face(tl, z, t + 1.0, { eyes: "happy", mouth: "smile" });
          R.pose(tl, z, t + 1.6, 0.4, { hipB: 30, knB: 20, hipF: 0, knF: 10 }, "power2.inOut");
          tl.to("#f22-zw", { x: 0, y: 0, duration: 0.45, ease: "power2.inOut" }, t + 1.65);
          R.pose(tl, z, t + 2.1, 0.3, { hipB: 0, knB: 0, hipF: 0, knF: 0 });
          R.face(tl, z, t + 2.1, { eyes: "normal", mouth: "smile" });
        });
        // carga aumentando aos poucos
        R.pop(tl, "#f22-load", K.carga - 0.1, 0.4);
        for (let i = 0; i < 5; i++) tl.fromTo(`#f22-b${i}`, { opacity: 0 }, { opacity: 1, duration: 0.2 }, K.carga + 0.1 + i * 0.25);
      },
    };
  },
};
