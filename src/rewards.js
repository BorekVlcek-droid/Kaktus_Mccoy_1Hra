/* =====================================================================
   v76: ODMĚNY ZA ÚKOLY
   – talismany (pasivní bonusy), které se nasazují do slotů
   – šerifská hvězda oblasti (všech 5 úkolů) = talisman + 20 ★
   – hodnosti podle počtu splněných úkolů = hvězdy, sloty, talisman
   – odměny se vyzvedávají v deníku Úkolů (s animací)
   ===================================================================== */
const TAL=[
 {id:'podkova',n:'Podkova štěstí',d:'Hvězdy v okolí se samy přitahují k tobě.',m:0,c:'#a8a8b0'},
 {id:'hodinky',n:'Kapesní hodinky',d:'Kombo vydrží o polovinu déle.',m:1,c:'#e8b440'},
 {id:'satek',n:'Pouštní šátek',d:'Nic netušící enemigos tě zahlédnou jen zblízka.',m:2,c:'#c8402a'},
 {id:'rozbuska',n:'Rozbuška',d:'Výbuchy dávají enemigos o 50 % větší poškození.',m:3,c:'#c8402a'},
 {id:'zub',n:'Zlatý zub',d:'Ze zneškodněných enemigos častěji vypadne hvězda.',m:4,c:'#ffd44a'},
 {id:'vesta',n:'Kožená vesta',d:'První zásah v každém životě vesta odrazí.',m:5,c:'#8a5a2a'},
 {id:'boxer',n:'Mosazný boxer',d:'Útoky zblízka jsou o 20 % silnější.',m:6,c:'#d8a040'},
 {id:'srdce',n:'Kaktusové srdce',d:'+1 srdce navíc v každé oblasti.',m:7,c:'#5aa83a'},
 {id:'stava',n:'Lahvička šťávy',d:'Každých 10 zneškodnění ti doplní 1 srdce.',r:3,c:'#5ad07a'}];
const RANKS=[{q:0,n:'Tulák'},{q:5,n:'Pomocník šerifa',st:25},{q:10,n:'Zástupce šerifa',slot:1},{q:15,n:'Šerif',tal:'stava'},{q:20,n:'Maršál',st:50},{q:26,n:'Strážce zákona',slot:1},{q:33,n:'Legenda Západu',st:100},{q:40,n:'Srdce pouště',st:200}];
function rwSV(){if(!SV.rw)SV.rw={cl:{},eq:[]};if(!SV.rw.cl)SV.rw.cl={};if(!SV.rw.eq)SV.rw.eq=[];return SV.rw}
function qTotal(){let n=0;for(let i=0;i<QD.length;i++)n+=qCount(i);return n}
function rankIdx(n){n=n==null?qTotal():n;let r=0;RANKS.forEach((R,i)=>{if(n>=R.q)r=i});return r}
function rwSlots(){const w=rwSV();let s=1;RANKS.forEach((R,i)=>{if(R.slot&&w.cl['r'+i])s+=R.slot});return s}
function talById(id){return TAL.find(t=>t.id==id)}
function talKey(t){return t.m!=null?'m'+t.m:'r'+t.r}
function talOwned(id){const t=talById(id);return !!(t&&rwSV().cl[talKey(t)])}
function talOn(id){return !TR2&&rwSV().eq.includes(id)&&talOwned(id)}
function rwPend(){const w=rwSV(),out=[];for(let i=0;i<QD.length;i++)if(SV.qm&&SV.qm[i]&&!w.cl['m'+i])out.push('m'+i);const ri=rankIdx();for(let i=1;i<=ri;i++)if(!w.cl['r'+i])out.push('r'+i);return out}
function rwInfo(key){const i=+key.slice(1);if(key[0]=='m'){const t=TAL.find(o=>o.m==i);return{k:'m',i,t,st:QMEDAL,title:'Šerifská hvězda: '+LV[i].n}}const R=RANKS[i],t=R.tal?talById(R.tal):null;return{k:'r',i,t,st:R.st||0,slot:R.slot||0,title:'Hodnost: '+R.n}}
function rwClaim(key){const w=rwSV();if(w.cl[key])return null;const I=rwInfo(key);w.cl[key]=1;if(I.st)SV.st+=I.st;let eq=0;if(I.t&&w.eq.length<rwSlots()&&!w.eq.includes(I.t.id)){w.eq.push(I.t.id);eq=1}saveSV();I.eq=eq;return I}
function talToggle(id){const w=rwSV();if(!talOwned(id)){sfx('deny');return 0}const k=w.eq.indexOf(id);if(k>=0){w.eq.splice(k,1);sfx('cloth');saveSV();return 1}if(w.eq.length>=rwSlots()){sfx('deny');return -1}w.eq.push(id);sfx('pick');saveSV();return 2}
/* ---------- ikony talismanů ---------- */
function talIco(id,x,y,r,lock){X.save();X.translate(x,y);const s=r/24;X.scale(s,s);X.lineJoin='round';X.lineCap='round';const OL='#1a0a04';
 const L=lock?(c=>'#5a4e44'):(c=>c);X.strokeStyle=OL;X.lineWidth=2;
 if(id=='podkova'){X.lineWidth=9;X.strokeStyle=OL;X.beginPath();X.arc(0,-2,13,Math.PI*.9,Math.PI*2.1);X.lineTo(14,16);X.moveTo(-12,-6);X.lineTo(-14,16);X.stroke();X.lineWidth=6;X.strokeStyle=L('#b8b8c4');X.stroke();X.fillStyle=OL;for(const[a,b]of[[-13,4],[13,4],[-10,-11],[10,-11],[0,-15]]){X.beginPath();X.arc(a,b,1.4,0,7);X.fill()}}
 else if(id=='hodinky'){X.strokeStyle=L('#c8962a');X.lineWidth=3;X.beginPath();X.arc(0,-19,5,0,7);X.stroke();X.fillStyle=L('#e8b440');X.beginPath();X.arc(0,2,17,0,7);X.fill();X.strokeStyle=OL;X.lineWidth=2;X.stroke();X.fillStyle=lock?'#8a7e70':'#fff6dc';X.beginPath();X.arc(0,2,12,0,7);X.fill();X.stroke();X.strokeStyle=OL;X.lineWidth=2;X.beginPath();X.moveTo(0,2);X.lineTo(0,-6);X.moveTo(0,2);X.lineTo(6,4);X.stroke();for(let k=0;k<12;k++){const a=k/12*Math.PI*2;X.fillStyle=OL;X.fillRect(Math.cos(a)*10-.6,2+Math.sin(a)*10-.6,1.2,1.2)}}
 else if(id=='satek'){X.fillStyle=L('#c8402a');X.beginPath();X.moveTo(-20,-10);X.lineTo(20,-10);X.lineTo(0,18);X.closePath();X.fill();X.stroke();X.fillStyle=lock?'#7a6e60':'#fff0d8';for(const[a,b]of[[-10,-5],[0,-5],[10,-5],[-5,3],[5,3],[0,10]]){X.beginPath();X.arc(a,b,2,0,7);X.fill()}X.fillStyle=L('#a8301a');X.beginPath();X.moveTo(-20,-10);X.quadraticCurveTo(-26,-16,-24,-20);X.lineTo(-18,-12);X.closePath();X.fill();X.stroke()}
 else if(id=='rozbuska'){X.save();X.rotate(-.35);for(const dx of[-8,0,8]){X.fillStyle=L('#c8402a');X.beginPath();X.roundRect(dx-4,-12,8,26,2);X.fill();X.stroke()}X.fillStyle=L('#3a2a1a');X.fillRect(-13,-2,26,4);X.strokeStyle=L('#5a4a3a');X.lineWidth=2;X.beginPath();X.moveTo(0,-12);X.quadraticCurveTo(4,-20,10,-20);X.stroke();if(!lock){tiGlow(10,-20,10,'255,200,80',.6+.3*Math.sin(T*.4));X.fillStyle='#ffe08a';X.beginPath();X.arc(10,-20,2.6,0,7);X.fill()}X.restore()}
 else if(id=='zub'){X.fillStyle=L('#ffd44a');X.beginPath();X.moveTo(-12,-12);X.quadraticCurveTo(0,-20,12,-12);X.quadraticCurveTo(14,2,9,6);X.lineTo(6,18);X.quadraticCurveTo(3,20,1,10);X.lineTo(-1,10);X.quadraticCurveTo(-3,20,-6,18);X.lineTo(-9,6);X.quadraticCurveTo(-14,2,-12,-12);X.closePath();X.fill();X.stroke();if(!lock){X.fillStyle='rgba(255,255,255,.7)';X.beginPath();X.ellipse(-5,-8,3,5,-.4,0,7);X.fill()}}
 else if(id=='vesta'){X.fillStyle=L('#8a5a2a');X.beginPath();X.moveTo(-16,-16);X.lineTo(-6,-16);X.lineTo(0,-2);X.lineTo(6,-16);X.lineTo(16,-16);X.lineTo(17,18);X.lineTo(-17,18);X.closePath();X.fill();X.stroke();X.strokeStyle=OL;X.beginPath();X.moveTo(0,-2);X.lineTo(0,18);X.stroke();X.fillStyle=L('#e8c070');for(const yy of[3,9,15]){X.beginPath();X.arc(-3,yy,1.6,0,7);X.fill()}X.strokeStyle=L('#5a3a1a');X.lineWidth=1.2;X.setLineDash([2,2]);X.strokeRect(-13,2,7,7);X.strokeRect(6,2,7,7);X.setLineDash([])}
 else if(id=='boxer'){X.fillStyle=L('#d8a040');X.beginPath();X.roundRect(-20,-8,40,13,6);X.fill();X.stroke();X.beginPath();X.moveTo(-14,5);X.quadraticCurveTo(0,20,14,5);X.closePath();X.fill();X.stroke();X.fillStyle=lock?'#3a3028':'#2a1a10';for(let k=0;k<4;k++){X.beginPath();X.arc(-14+k*9.3,-1.5,3.4,0,7);X.fill()}}
 else if(id=='srdce'){X.fillStyle=L('#5aa83a');X.beginPath();X.moveTo(0,18);X.bezierCurveTo(-26,0,-16,-22,0,-10);X.bezierCurveTo(16,-22,26,0,0,18);X.closePath();X.fill();X.stroke();X.strokeStyle=lock?'#8a7e70':'#fff6dc';X.lineWidth=1.4;for(const[a,b]of[[-12,-8],[-16,0],[12,-8],[16,0],[-6,10],[6,10],[0,-6]]){X.beginPath();X.moveTo(a,b);X.lineTo(a*1.25,b*1.25-2);X.stroke()}if(!lock){X.fillStyle='rgba(255,255,255,.35)';X.beginPath();X.ellipse(-8,-6,4,6,-.5,0,7);X.fill()}}
 else if(id=='stava'){X.fillStyle=lock?'#5a4e44':'rgba(200,240,255,.45)';X.beginPath();X.moveTo(-5,-18);X.lineTo(5,-18);X.lineTo(5,-8);X.quadraticCurveTo(14,-4,14,8);X.quadraticCurveTo(14,19,0,19);X.quadraticCurveTo(-14,19,-14,8);X.quadraticCurveTo(-14,-4,-5,-8);X.closePath();X.fill();X.stroke();
  if(!lock){X.save();X.clip();X.fillStyle='#4ad06a';X.fillRect(-15,0+Math.sin(T*.08)*1.5,30,20);X.fillStyle='rgba(255,255,255,.5)';X.beginPath();X.arc(-4,8,2,0,7);X.arc(4,12,1.4,0,7);X.fill();X.restore()}X.fillStyle=L('#8a5a2a');X.fillRect(-6,-23,12,6);X.strokeRect(-6,-23,12,6)}
 X.restore()}
function rwSlotIco(x,y,r){X.save();X.translate(x,y);X.strokeStyle='#fff3dc';X.lineWidth=2;X.setLineDash([3,2]);X.beginPath();X.arc(0,0,r*.55,0,7);X.stroke();X.setLineDash([]);X.font='700 '+Math.round(r*.7)+'px Georgia';X.textAlign='center';X.fillStyle='#fff3dc';X.fillText('+',0,r*.25);X.restore()}
/* ---------- účinky talismanů ve hře ---------- */
{const _s=start;start=function(i,arr){const r=_s.apply(this,arguments);try{if(p&&!TR2&&talOn('srdce')){p.mx++;p.hp=p.mx}}catch(e){}return r}}
{const _q=qUpd;qUpd=function(){try{if(p&&!p.dead&&state=='play'&&talOn('podkova'))co.forEach(c=>{if(c.g)return;const dx=p.x-c.x,dz=p.z+50-c.z,d=Math.hypot(dx,dz);if(d<140&&d>3){const v=Math.min(7,3+(140-d)*.06);c.x+=dx/d*v;c.z+=dz/d*v}})}catch(e){}return _q()}}
{const _c=comboHit;comboHit=function(){const r=_c.apply(this,arguments);if(talOn('hodinky')&&CMB.t>0)CMB.t=Math.max(CMB.t,225);return r}}
{const _k=comboKill;comboKill=function(e){const r=_k.apply(this,arguments);try{if(state=='play'&&e&&!AN[e.t]&&!isB(e)){if(talOn('zub')&&Math.random()<.4)co.push({x:e.x,y:LY,z:e.z+50});
 if(talOn('stava')&&LS){LS.tk10=(LS.tk10||0)+1;if(LS.tk10%10==0&&p&&p.hp<p.mx){p.hp=Math.min(p.mx,p.hp+1);pop(p.x,LY,p.z+110,'+1 ♥ ŠŤÁVA','#7fe07a');sfx('heart')}}}}catch(err){}return r}}
{const _h=hurtP;hurtP=function(d,dir){if(talOn('vesta')&&p&&!p.vst&&state=='play'&&!(p.inv>0)&&!(p.ds>0)&&!p.dead&&!(p.cu>0)){p.vst=1;p.inv=60;sfx('block');pop(p.x,LY,p.z+110,'VESTA ODRAZILA!','#e8c070');burst(p.x,LY,p.z+60,'#e8c070');return}return _h.apply(this,arguments)}}
{const _h=hurtE;hurtE=function(e,d,dir,la,mel){if(state=='play'&&!TR2){if(mel&&talOn('boxer'))d*=1.2;if(QS.ctx.boom>0&&talOn('rozbuska'))d*=1.5}return _h.call(this,e,d,dir,la,mel)}}
{const _bp=brPercept;brPercept=function(e,raw){if(raw&&talOn('satek')&&p&&Math.abs(p.x-e.x)>190)raw=0;return _bp.call(this,e,raw)}}
{const _se=see;see=function(e){const r=_se(e);if(r&&talOn('satek')&&p&&e&&(e.st=='pat'||e.st=='inv')&&Math.abs(p.x-e.x)>190)return 0;return r}}
