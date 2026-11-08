import fs from "fs";
import * as L from "/home/user/pablopaciente/videos/lombar/build/lib.mjs";
const { C } = L;
const fonts = fs.readFileSync(process.argv[2], "utf8");
const logo = "data:image/webp;base64," + fs.readFileSync("/home/user/pablopaciente/videos/lombar/assets/marca/logo-completa-branca.webp").toString("base64");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:${C.sun};}
.t{position:absolute;font-family:Montserrat;font-weight:900;line-height:0.95;letter-spacing:-0.02em;}
#t1{left:70px;top:70px;font-size:150px;color:${C.ink};}
#t1 span{color:${C.pain};}
#t2{left:70px;top:430px;font-size:130px;color:#fff;background:${C.pain};padding:18px 34px 26px;border:10px solid ${C.ink};border-radius:30px;box-shadow:14px 14px 0 ${C.ink};transform:rotate(-3deg);-webkit-text-stroke:5px ${C.ink};paint-order:stroke fill;}
#t3{position:absolute;left:90px;top:720px;font-family:Nunito;font-weight:900;font-size:58px;color:${C.ink};background:#fff;padding:12px 30px;border:7px solid ${C.ink};border-radius:22px;}
#logo{position:absolute;left:70px;bottom:52px;height:120px;padding:14px 26px;background:${C.ink};border-radius:20px;}
svg{position:absolute;left:0;top:0;overflow:visible}
</style></head><body>
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
  <g opacity="0.18">${Array.from({length:14},(_,i)=>`<circle cx="${(i*263+120)%1920}" cy="${(i*421+80)%1080}" r="${18+(i%4)*10}" fill="#fff"/>`).join("")}</g>
  <circle cx="1440" cy="600" r="420" fill="#fff" stroke="${C.ink}" stroke-width="10"/>
  <g transform="translate(1400,560) scale(1.5)">${L.human("z","ze")}
    <circle cx="-34" cy="-40" r="34" fill="${C.pain}" opacity="0.45"/><circle cx="-34" cy="-40" r="16" fill="${C.pain}" stroke="#fff" stroke-width="5"/>
  </g>
  <g transform="translate(1730,330) scale(0.7) rotate(14)">${L.alarmildo("a")}</g>
  ${[0,1,2].map(i=>`<path d="M${1120-i*30} ${300+i*55} l-70 -20" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>`).join("")}
</svg>
<div id="t1" class="t">TRAVOU A<br><span>COLUNA?</span></div>
<div id="t2" class="t">DOR ≠ ESTRAGO</div>
<div id="t3">o que fazer na dor lombar</div>
<img id="logo" src="${logo}">
<script>
const set=(id,a)=>{const e=document.getElementById(id); if(e) e.setAttribute("transform","rotate("+a+")");};
const pose={torso:22,neck:-14,shF:-55,elF:-35,shB:55,elB:-110,hipF:-12,knF:18,hipB:8,knB:14};
for(const j in pose) set("z-"+j,pose[j]);
const face=(id,e,m)=>{document.querySelectorAll('[id^="'+id+'-e-"]').forEach(x=>x.setAttribute("opacity",x.id===id+"-e-"+e?1:0));document.querySelectorAll('[id^="'+id+'-m-"]').forEach(x=>x.setAttribute("opacity",x.id===id+"-m-"+m?1:0));};
face("z","pain","scream"); face("a","wide","scream");
set("a-armF",-150); set("a-armB",150);
</script></body></html>`;
fs.writeFileSync(process.argv[3], html);
