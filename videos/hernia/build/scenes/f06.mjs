// F6 — Como a hérnia acontece: tirinha normal → protrusão → extrusão → sequestro, com o termômetro "quanto saiu"
export default {
  speakers: { geleia: "f06g" },
  build(ctx) {
    const { C, geleia, w, lines, JELLY } = ctx;
    const k = {
      tempo: w(0, "tempo"), agua: w(0, "água"), rach: w(0, "rachaduras"), estufa: w(0, "estufa"), prot: w(0, "protrusão"),
      gel: w(0, "Geleia"), extr: w(0, "extrusão"), ped: w(0, "pedacinho"), seq: w(0, "sequestro"), filme: w(0, "filme"), anat: w(0, "anatomia"),
      g0: lines[1].start, g1: lines[1].end,
    };
    const CX = [300, 730, 1160, 1590], CY = 430;
    const st = `stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"`;
    const ring = "#C9B48E", side = "#F3EAD3";
    const disc = (i) => {
      const cx = CX[i], cy = CY;
      const lobe = i >= 1 ? `<ellipse cx="${cx - 62}" cy="${cy + 92}" rx="70" ry="40"/>` : "";
      const shapes = `<ellipse cx="${cx}" cy="${cy}" rx="150" ry="115"/>${lobe}`;
      const crack = i >= 2 ? `<path d="M${cx - 18} ${cy + 26} L${cx - 34} ${cy + 52} L${cx - 22} ${cy + 66} L${cx - 50} ${cy + 96} L${cx - 44} ${cy + 116}" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>` : "";
      const chan = i === 2 ? `<path d="M${cx - 14} ${cy + 20} Q${cx - 46} ${cy + 70} ${cx - 62} ${cy + 128}" fill="none" stroke="${JELLY}" stroke-width="16" stroke-linecap="round"/>` : "";
      const blob = i === 2 ? `<ellipse cx="${cx - 66}" cy="${cy + 140}" rx="40" ry="26" fill="${JELLY}" ${st}/>`
        : i === 3 ? `<g id="f06-frag"><ellipse cx="${cx - 92}" cy="${cy + 182}" rx="30" ry="20" fill="${JELLY}" ${st}/><path d="M${cx - 132} ${cy + 168} L${cx - 150} ${cy + 160} M${cx - 130} ${cy + 186} L${cx - 152} ${cy + 188}" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/></g>` : "";
      const nuc = i >= 2 ? `<ellipse cx="${cx}" cy="${cy}" rx="42" ry="32" fill="${JELLY}" ${st}/>` : `<ellipse cx="${cx}" cy="${cy + (i === 1 ? 10 : 0)}" rx="54" ry="40" fill="${JELLY}" ${st}/>`;
      return `<g id="f06-disc${i}">
        <g stroke="${C.ink}" stroke-width="14" fill="${C.ink}">${shapes}</g>
        <g id="f06-dfill${i}" fill="${side}">${shapes}</g>
        ${[118, 90, 64].map((r) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.77}" fill="none" stroke="${ring}" stroke-width="5"/>`).join("")}
        ${i >= 1 ? `<path d="M${cx - 112} ${cy + 96} Q${cx - 62} ${cy + 124} ${cx - 14} ${cy + 98}" fill="none" stroke="${ring}" stroke-width="5"/>` : ""}
        ${chan}${nuc}${crack}${blob}
        <circle cx="${cx - 128}" cy="${cy + 150}" r="17" fill="${C.nerve}" ${st}/>
      </g>`;
    };
    const titles = [["NORMAL", "anel inteiro", C.good], ["PROTRUSÃO", "estufa sem sair", C.sun], ["EXTRUSÃO", "a Geleia passa", "#F28C38"], ["SEQUESTRO", "um pedaço se solta", C.pain]];
    const cards = titles.map(([t, s, col], i) => `<div id="f06-card${i}" class="abs card" style="left:${CX[i] - 200}px;top:150px;width:400px;height:520px;opacity:0">
        <div class="title" id="f06-tt${i}" style="text-align:center;font-size:38px;margin-top:14px;color:${col}">${t}</div>
        <div class="label" style="text-align:center;font-size:26px;opacity:.8">${s}</div></div>`).join("");
    return {
      k,
      css: `
        #f06-thermo { left:300px; top:735px; width:1290px; height:48px; border:6px solid ${C.ink}; border-radius:30px; background:#fff; overflow:hidden; }
        #f06-fill { position:absolute; left:0; top:0; bottom:0; width:100%; background:linear-gradient(90deg, ${C.good}, ${C.sun}, ${C.pain}); transform-origin:0 50%; }
        #f06-thl { left:300px; top:690px; font-size:32px; }
        #f06-tape { left:1340px; top:560px; width:520px; padding:10px 0; text-align:center; font-size:34px; background:${C.sun}; border:5px solid ${C.ink}; transform: rotate(-9deg); }
        #f06-stamp { left:1430px; top:470px; padding:8px 18px; font-size:34px; color:${C.pain}; border:6px solid ${C.pain}; border-radius:14px; background:#fff; transform: rotate(8deg); }
        #f06-age { left:120px; top:40px; font-size:48px; }
        #f06-age span { color:#3BA9D6; }
      `,
      html: `
    <div id="f06-age" class="abs title">Como a <span>hérnia</span> acontece</div>
    ${cards}
    <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
      ${[0, 1, 2, 3].map((i) => `<g id="f06-dw${i}" opacity="0">${disc(i)}</g>`).join("")}
      <g id="f06-drops" opacity="0">${[0, 1, 2, 3].map((i) => `<path id="f06-drop${i}" d="M${230 + i * 46} 300 Q${218 + i * 46} 322 ${230 + i * 46} 334 Q${242 + i * 46} 322 ${230 + i * 46} 300Z" fill="#59B8E6" stroke="${C.ink}" stroke-width="4"/>`).join("")}</g>
      <g id="f06-cracks0" opacity="0"><path d="M${CX[0] + 90} ${CY - 60} L${CX[0] + 110} ${CY - 40} L${CX[0] + 100} ${CY - 22}" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/><path d="M${CX[0] - 100} ${CY + 40} L${CX[0] - 120} ${CY + 58}" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/></g>
      <g id="f06-g-wrap" opacity="0"><g transform="translate(1745,890) scale(0.95)">${geleia("f06g")}
        <g transform="translate(70,-20)"><rect x="-4" y="-34" width="56" height="40" rx="8" fill="#B07A4A" ${st}/><path d="M14 -34 L14 -44 L34 -44 L34 -34" fill="none" stroke="${C.ink}" stroke-width="5"/></g></g></g>
    </svg>
    <div id="f06-thl" class="abs label" style="opacity:0">QUANTO SAIU?</div>
    <div id="f06-thermo" class="abs" style="opacity:0"><div id="f06-fill"></div></div>
    <div id="f06-tape" class="abs title" style="opacity:0">NÃO ULTRAPASSE · NÃO ULTRAPASSE</div>
    <div id="f06-stamp" class="abs title" style="opacity:0">SÓ ANATOMIA!</div>`,
      js: function (tl, K, R) {
        R.rise(tl, "#f06-age", 0.1, 0.4);
        const showPanel = (i, t) => {
          R.pop(tl, `#f06-card${i}`, t, 0.4);
          tl.set(`#f06-dw${i}`, { opacity: 1 }, t + 0.1);
          tl.fromTo(`#f06-disc${i}`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, t + 0.1);
        };
        // painel 1: normal, depois perde água e racha
        showPanel(0, 0.3);
        tl.set("#f06-thl, #f06-thermo", { opacity: 1 }, 0.5);
        tl.fromTo("#f06-fill", { scaleX: 0 }, { scaleX: 0.02, duration: 0.3 }, 0.5);
        tl.set("#f06-drops", { opacity: 1 }, K.agua - 0.1);
        tl.fromTo("#f06-drops path", { y: 0, opacity: 1 }, { y: -140, opacity: 0, duration: 1.0, stagger: 0.12, ease: "power1.out" }, K.agua - 0.1);
        tl.to("#f06-dfill0", { attr: { fill: "#E3D6B4" }, duration: 0.6 }, K.agua);
        tl.set("#f06-cracks0", { opacity: 1 }, K.rach);
        R.draw(tl, "#f06-cracks0 path", K.rach, 0.4);
        // protrusão
        showPanel(1, K.estufa - 0.2);
        tl.to("#f06-fill", { scaleX: 0.25, duration: 0.5, ease: "power2.out" }, K.prot);
        R.shake(tl, "#f06-tt1", K.prot, 0.3, 3);
        // extrusão
        showPanel(2, K.gel - 0.2);
        tl.to("#f06-fill", { scaleX: 0.62, duration: 0.5, ease: "power2.out" }, K.extr);
        R.shake(tl, "#f06-tt2", K.extr, 0.3, 3);
        // sequestro
        showPanel(3, K.ped - 0.2);
        tl.fromTo("#f06-frag", { x: 30, y: -40 }, { x: 0, y: 0, duration: 0.5, ease: "back.out(2)" }, K.ped + 0.3);
        tl.to("#f06-fill", { scaleX: 1, duration: 0.5, ease: "power2.out" }, K.seq);
        R.shake(tl, "#f06-tt3", K.seq, 0.3, 3);
        // filme policial
        tl.set("#f06-tape", { opacity: 1 }, K.filme);
        tl.fromTo("#f06-tape", { x: 600 }, { x: 0, duration: 0.4, ease: "power3.out" }, K.filme);
        R.pop(tl, "#f06-stamp", K.anat - 0.1, 0.35);
        // Geleia quer conhecer o mundo
        R.fadeOut(tl, "#f06-tape, #f06-stamp", K.g0 - 0.4);
        tl.set("#f06-g-wrap", { opacity: 1 }, K.g0 - 0.3);
        tl.fromTo("#f06-g-wrap", { x: 260 }, { x: 0, duration: 0.45, ease: "back.out(1.6)" }, K.g0 - 0.3);
        R.face(tl, "f06g", K.g0 - 0.3, { eyes: "happy" });
        R.pose(tl, "f06g", K.g0, 0.3, { armB: 150 }, "back.out(2)");
        R.squash(tl, "#f06g-body", K.g0 + 0.5);
        R.pose(tl, "f06g", K.g1, 0.3, { armB: 0 });
      },
      sfx: [
        { name: "pop", t: 0.3, vol: 0.35 },
        { name: "sparkle", t: k.agua, vol: 0.3 },
        { name: "click", t: k.rach, vol: 0.4 },
        { name: "pop", t: k.estufa - 0.2, vol: 0.35 },
        { name: "pop", t: k.gel - 0.2, vol: 0.35 },
        { name: "pop", t: k.ped - 0.2, vol: 0.35 },
        { name: "whoosh-short", t: k.filme, vol: 0.4 },
        { name: "impact-bass-1", t: k.anat, vol: 0.35 },
        { name: "whoosh-short", t: k.g0 - 0.3, vol: 0.4 },
      ],
    };
  },
};
