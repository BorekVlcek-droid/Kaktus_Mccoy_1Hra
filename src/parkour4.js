/* ===== W35: PARKOUR – lanovky s fyzikou, houpací lana, trampolíny, skluz ===== */
const RS=[],PK4={bn:[],seen:{}};
Object.assign(SFX,{boing:{p:[['t',{w:'triangle',f:150,f2:520,d:.2,g:.22}],['t',{w:'sine',f:300,f2:900,d:.14,g:.08,dl:.03}]],mi:90},
 zipr:{p:[['n',{d:.22,g:.12,ft:'bandpass',f:2400,f2:3600,q:4}]],mi:180},
 rope:{p:[['n',{d:.16,g:.18,ft:'bandpass',f:500,f2:260,q:1.5}]],mi:120},
 slide:{p:[['n',{d:.32,g:.22,ft:'bandpass',f:900,f2:300,q:.8,a:.02}]],mi:200},
 steam:{p:[['n',{d:.5,g:.3,ft:'highpass',f:1800,f2:3000,a:.03}]],mi:200}});
const pk4Kd=a=>typeof kd=='function'&&kd(a);
function pk4Hint(k,t){SV.pkh=SV.pkh||{};if(SV.pkh[k])return;SV.pkh[k]=1;try{say(t)}catch(e){}}
/* ---------- rozmístění podle tvaru úrovně ---------- */
function pk4Clear(x0,x1,z0,z1,ign){if(sol.some(o=>o!==ign&&!o.gone&&o.x<x1&&o.x+o.w>x0&&o.b<z1&&o.t>z0))return false;if(lad.some(l=>l.x>x0-10&&l.x<x1+10&&l.z1>z0&&l.z0<z1))return false;
 if(deco.some(d=>d.k=='mz'&&d.x<x1&&d.x+d.w>x0&&d.z0<z1&&d.z1>z0))return false;if(ZL.some(l=>Math.min(l.x1,l.x2)<x1&&Math.max(l.x1,l.x2)>x0&&Math.min(l.z1,l.z2)-110<z1&&Math.max(l.z1,l.z2)>z0))return false;return true}
function pk4Place(){RS.length=0;PK4.bn=[];PK4.lt=-1;if(!lv||!sol||lv.k=='sea'||lv.k=='train')return;const k=lv.k,BXL=BX?BX-650:1e9,end=lv.len-260;
 const gs=sol.filter(o=>o.k=='g'&&!o.gone&&o.t>-200).sort((a,b)=>a.x-b.x);
 /* houpací lana nad propastmi: pod plošinou/nosníkem nebo na trámu přes propast */
 const dbg=window.__pkdbg=[];
 for(let i=0;i<gs.length-1;i++){const a=gs[i],b=gs[i+1],g0=a.x+a.w,g1=b.x,gw=g1-g0;if(gw<170||gw>1000||g1>BXL||g0<300)continue;const gz=Math.max(a.t,b.t);
  if(ZL.some(l=>Math.min(l.x1,l.x2)<g1&&Math.max(l.x1,l.x2)>g0))continue;const got=[];
  for(let x=g0+95;x<=g1-80&&got.length<3;x+=15){if(got.length&&x-got[got.length-1].ax<250)continue;
   const ov=sol.filter(o=>!o.gone&&o.k!='g'&&o.x+12<x&&o.x+o.w-12>x&&o.b>=gz+165&&o.b<=gz+400).sort((p1,p2)=>p1.b-p2.b)[0];
   let az,L,mode;if(ov){az=ov.b;L=Math.max(120,az-gz-40);mode='under'}else{az=gz+340;L=250;mode='free'}
   const sw=Math.min(L*.88,220);if(!pk4Clear(x-sw,x+sw,gz+6,az-4,ov)){continue}
   if(!got.length&&x-g0>230)break;got.push({ax:x,az,L,mode,ov})}
  if(!got.length){dbg.push('gap '+g0+' none');continue}
  const free=got.filter(q=>q.mode=='free');let beam=null;if(free.length){const bx0=Math.min(...free.map(q=>q.ax))-60,bx1=Math.max(...free.map(q=>q.ax))+60,az=free[0].az,L0=g0-26,R0=g1+26;
   if(pk4Clear(L0-14,R0+14,az+8,az+44)&&pk4Clear(L0-10,L0+10,gz+1,az+40)&&pk4Clear(R0-10,R0+10,gz+1,az+40))beam=[L0,R0,gz]}
  got.forEach((q,j)=>RS.push({ax:q.ax,az:q.az,L:q.L,a:0,av:0,r:q.L,k,beam:q.mode=='free'&&beam&&q===free[0]?beam:null,hang:q.mode=='free'&&!beam,under:q.mode=='under',sd:(q.ax|0)%97,rid:0}));dbg.push('gap '+g0+' ropes '+got.map(q=>q.ax+q.mode).join(','))}
 /* trampolíny u vysokých staveb: dostaneš se rovnou na střechu */
 const tall=sol.filter(o=>!o.gone&&!o.ow&&o.k!='g'&&o.k!='mw'&&o.k!='mf'&&o.k!='e'&&o.w>=60&&o.x>500&&o.x<BXL&&o.x<end).filter(o=>{const gz=floorAt(o.x-40,o.b+10,4);return o.t-gz>=170&&o.t-gz<=390&&FO&&(FO.k=='g'||FO.k=='deck')}).sort((a,b)=>b.t-a.t);
 for(const o of tall){if(PK4.bn.length>=4)break;let placed=false;
  for(const bw of[80,64]){if(placed)break;for(const side of[-1,1]){if(placed)break;for(let off=40;off<=220&&!placed;off+=20){const x=side<0?o.x-off-bw:o.x+o.w+off,gz=floorAt(x+bw/2,o.b+10,30);if(!FO||FO.k!='g')continue;if(Math.abs(gz-floorAt(o.x+o.w/2,o.b+10,4))>4)continue;
   if(floorAt(x+2,gz+4,2)!=gz||floorAt(x+bw-2,gz+4,2)!=gz)continue;if(o.t-gz<170)continue;
   if(!pk4Clear(x-14,x+bw+14,gz+1,gz+300))continue;if(PK4.bn.some(q=>Math.abs(q.x-x)<500))continue;
   const B={x,w:bw,t:gz+42,b:gz+14,k:'p',ow:1,s:'bnc',bk:k,sq:0,gz};sol.push(B);PK4.bn.push(B);placed=true;dbg.push('bnc '+x+' for '+o.k+(o.s||'')+o.x)}}}
  if(!placed)dbg.push('bnc fail '+(o.s||o.k)+o.x)}
 /* nové lanovky ze střech vysokých staveb */
 let nz=0;const tops=sol.filter(o=>!o.gone&&!o.ow&&o.t>=230&&o.w>=60&&o.k!='mw'&&o.k!='mf'&&o.x>400&&o.x+o.w<BXL-300).sort((a,b)=>a.x-b.x);
 for(const o of tops){if(nz>=2)break;const x1=o.x+o.w-14,z1=o.t+96;if(ZL.some(l=>Math.abs(Math.min(l.x1,l.x2)-x1)<320||(Math.min(l.x1,l.x2)<x1+300&&Math.max(l.x1,l.x2)>x1)))continue;if(floorAt(x1,o.t+4,4)!=o.t)continue;
  for(let x2=x1+700;x2>=x1+340;x2-=20){const f=floorAt(x2,z1,9),fo=FO;if(!fo||['m','e','k','mf','mw','ld'].includes(fo.k)||fo.mv||z1-(f+92)<90||x2>BXL||x2>end)continue;if(floorAt(x2-30,z1,4)!=f||floorAt(x2+30,z1,4)!=f)continue;const l={x1,z1,x2,z2:f+92};let ok=true;
   for(let u=.03;u<=.97&&ok;u+=.02){const x=x1+(x2-x1)*u,cz=zipZ(l,u)-9*Math.sin(Math.PI*u);if(!pk4Clear(x-14,x+14,cz-100,cz+8,o))ok=false}
   if(ok&&!pk4Clear(x2-40,x2+40,f+1,f+110))ok=false;if(!ok)continue;l.nw=1;ZL.push(l);nz++;break}}}
{const _st=start;start=function(i,arr){const r=_st(i,arr);try{pk4Place()}catch(e){console.error('pk4',e)}return r}}
/* ---------- lanovka: sklon zrychluje, seskok s rozjezdem, kopnutí do enemigů ---------- */
const zipZr=(l,u)=>zipZ(l,u)-9*Math.sin(Math.PI*u);
function pk4Kick(list,dir,txt){for(const e of ens){if(e.st=='dead'||e.st=='under'||e.st=='rise'||e.bst=='hide'||list.includes(e))continue;if(Math.abs(e.x-p.x)<34&&p.z<e.z+100&&p.z+50>e.z){list.push(e);hurtE(e,isB(e)?1:1.6,dir,8);pop(e.x,e.y,e.z+120,txt,'#ffd27a');shake=Math.max(shake,5);sfx('heavy');burst(e.x,e.y,e.z+60,'#fff')}}}
function pk4Zip(){if(p.zip){const z=p.zip,l=z.l,len=Math.hypot(l.x2-l.x1,l.z2-l.z1)||1,dir=Math.sign(l.x2-l.x1)||1,sl=(l.z1-l.z2)/len;z.v=Math.max(2.6,Math.min(11.5,z.v+.06+sl*.42-z.v*.004));z.u+=z.v/len;const u=Math.min(1,z.u);
  p.x=l.x1+(l.x2-l.x1)*u;p.z=zipZr(l,u)-92;p.vz=0;p.vx=dir*z.v;p.face=dir;p.on=false;p.fl=-1e4;l.ru=u;l.rv=z.v;if(T%10==0)sfx(z.v>8?'zipr':'chain');if(z.v>6&&T%2==0)spawnP(p.x,LY,1,'#ffd27a',2.4,3,p.z+96);
  pk4Kick(z.hit,dir,'ZIP KOP!');pk4Hint('zip','Lanovka: Mezerník = seskok s rozjezdem, ↓ = pustit se. Po cestě kopneš enemigy.');
  const rel=(vz,k,cd)=>{p.zip=null;l.ru=null;l.vib=1;p.vz=vz;p.vlt=vz>2?14:0;p.vx=dir*Math.max(3.5,z.v*k);p.mom=36;p.zcd=cd;p.z+=1;return false};
  if(kp('jump')){sfx('jump');spawnP(p.x,LY,4,'#ffd27a',2,6,p.z+90);return rel(9.4,.9,20)}if(kp('down'))return rel(0,.7,26);if(u>=1){spawnP(p.x,LY,6,lv.du||'#b8a080',2,6,p.z);return rel(5,.8,16)}return true}
 if(!p.on&&p.vz<9&&!p.climb&&!p.hang&&!p.rope&&!(p.zcd>0)){for(const l of ZL){const lo=Math.min(l.x1,l.x2),hi=Math.max(l.x1,l.x2);if(p.x<lo||p.x>hi)continue;const u=(p.x-l.x1)/(l.x2-l.x1);if(u<0||u>.95)continue;const zr=zipZr(l,u),hz=p.z+92;
  if(hz>zr-26&&hz<zr+22){p.zip={l,u,v:Math.max(3,Math.abs(p.vx)*.9),hit:[]};l.vib=.6;sfx('grab');return true}}}return false}
/* ---------- houpací lano: kyvadlo, rozhoupání, šplh, výskok ---------- */
const RG4=.5;
function pk4RopeEnd(r){return[r.ax+Math.sin(r.a)*r.L,r.az-Math.cos(r.a)*r.L]}
function pk4Rope(){const q=p.rope;
 if(q){const r=q,ax=(pk4Kd('right')?1:0)-(pk4Kd('left')?1:0),up=pk4Kd('up'),dn=pk4Kd('down');
  r.av+=-(RG4/r.r)*Math.sin(r.a);if(ax&&Math.sign(r.av||ax)==ax&&Math.abs(r.a)<1.15)r.av+=ax*.0016;r.av*=.997;
  if(up||dn){const r0=r.r;r.r=Math.max(40,Math.min(r.L-8,r.r+(dn?2:-2)));r.av*=r0/r.r}
  const a0=r.a;r.a+=r.av;if(Math.abs(r.a)>1.35){r.a=Math.sign(r.a)*1.35;r.av*=-.3}
  const hx=r.ax+Math.sin(r.a)*r.r,hz=r.az-Math.cos(r.a)*r.r,nx=hx,nz=hz-92;
  if(wallAt(nx,nz,92,9)){r.a=a0;r.av*=-.35}else{p.x=nx;p.z=nz}
  const vx=r.r*Math.cos(r.a)*r.av,vz=r.r*Math.sin(r.a)*r.av;p.vx=vx;p.vz=0;p.on=false;p.fl=-1e4;p.ra=r.a;if(Math.abs(vx)>.5)p.face=Math.sign(vx);
  if(Math.abs(r.av*r.r)>4.5)pk4Kick(r.hit,Math.sign(vx)||p.face,'HOUP!');if(Math.abs(r.a)<.05&&Math.abs(r.av*r.r)>4&&T%8==0)sfx('rope');
  const f=floorAt(p.x,p.z+20,9);if(p.z<f+1){p.z=f;p.on=true;p.rope=null;p.rcd=20;p.rlast=r;p.rlt=T;return false}
  pk4Hint('rope','Lano: ← → rozhoupej, ↑ ↓ šplhej, Mezerník = výskok. Pusť se na konci švihu!');
  if(kp('jump')){p.rope=null;p.rcd=7;p.rlast=r;p.rlt=T;p.vx=vx*1.1+ax*.8;p.vz=Math.max(vz*1.1,0)+5.5;p.vlt=16;p.mom=44;p.z+=1;sfx('jump');spawnP(p.x,LY,4,'#e8d8a8',2,6,p.z+80);return false}
  return true}
 if(!p.on&&!p.climb&&!p.hang&&!p.zip&&!(p.rcd>0)){const hx=p.x,hz=p.z+92;for(const r of RS){if(Math.abs(hx-r.ax)>r.L||(r===p.rlast&&T-(p.rlt||0)<26))continue;const[ex,ez]=pk4RopeEnd(r),dx=ex-r.ax,dz=ez-r.az,L2=dx*dx+dz*dz,t=Math.max(-14/r.L,Math.min(1,((hx-r.ax)*dx+(hz-r.az)*dz)/L2)),px=r.ax+dx*t,pz=r.az+dz*t;
  if(Math.hypot(hx-px,hz-pz)<18){r.r=Math.max(40,t*r.L);const vt=p.vx*Math.cos(r.a)+p.vz*Math.sin(r.a);r.av=Math.max(-8/r.r,Math.min(8/r.r,vt/r.r))+(Math.sign(p.vx)||p.face)*Math.min(.012,1.6/r.r);r.hit=[];p.rope=r;r.rid=1;p.zip=null;sfx('grab');spawnP(px,LY,3,'#e8d8a8',1.5,4,pz);return true}}}
 return false}
function pk4RopeIdle(){const n=PK4.lt<0?1:Math.max(0,Math.min(3,T-PK4.lt));PK4.lt=T;for(let k=0;k<n;k++)for(const r of RS){if(p&&p.rope===r)continue;r.rid=0;r.r=r.L;r.av+=-(RG4/r.L)*Math.sin(r.a)+Math.sin(T*.01+r.sd)*.00006;r.av*=.985;r.a+=r.av}}
/* ---------- skluz: pod nízkými překážkami, podrazí enemiga ---------- */
function pk4Slide(){if(p.sld>0){const d=Math.sign(p.sdv)||p.face;p.sld--;p.cr=1;p.face=d;
  if(!mvX(p,p.sdv,50,9)){p.sld=0;p.sdv=0}p.sdv*=.955;p.vx=p.sdv;p.x=Math.max(lv.sx||30,Math.min(lv.len-30,p.x));
  const f=floorAt(p.x,p.z,9);if(f<p.z-3){p.sld=0;p.on=false;p.mom=20;return false}if(f>p.z&&f-p.z<14)p.z=f;p.on=true;p.vz=0;
  const low=!!wallAt(p.x,p.z+52,40,8);if((p.sld<=0||Math.abs(p.sdv)<1.5)&&low){p.sld=3;p.sdv=d*Math.max(1.6,Math.abs(p.sdv))}
  for(const e of ens){if(e.st=='dead'||e.st=='under'||e.st=='rise'||isB(e)||p.shit.includes(e))continue;if(Math.abs(e.x-p.x)<30&&Math.abs(e.z-p.z)<24){p.shit.push(e);hurtE(e,.6,d,4);e.stn=Math.max(e.stn||0,55);pop(e.x,e.y,e.z+110,'PODRAZ!','#ffd27a');sfx('heavy');shake=Math.max(shake,3)}}
  if(T%2==0)spawnP(p.x-d*8,LY,1,lv.du||'#b8a080',1.4,5,p.z);
  if(kp('jump')&&!low){p.sld=0;p.cr=0;p.vz=9.8;p.vlt=10;p.on=false;p.vx=p.sdv*1.05;p.mom=26;sfx('jump');return false}
  if(p.sld<=0||Math.abs(p.sdv)<1.5){p.sld=0;p.sdv=0}return true}
 if(p.on&&Math.abs(p.vx)>2.6&&kp('down')&&!p.climb&&!p.hang&&!p.tied&&!(p.pt>0)&&!(p.ds>0)&&!(p.ht>0)&&!ladAt(p.x,p.z)&&!(FO&&FO.ow&&pk4Kd('jump'))){const d=Math.sign(p.vx);p.sld=26;p.sdv=d*Math.max(6.2,Math.abs(p.vx)+2.6);p.shit=[];p.cr=1;p.pt=0;sfx('slide');pk4Hint('slide','Skluz! Projedeš pod nízkou překážkou a podrazíš enemiga. Mezerník = výskok ze skluzu.');return true}
 return false}
/* ---------- trampolíny: odraz při dopadu, super skok z místa ---------- */
function pk4BncUnder(){if(!p.on)return null;for(const b of PK4.bn)if(p.x+9>b.x&&p.x-9<b.x+b.w&&Math.abs(p.z-b.t)<1)return b;for(const o of sol)if(o.s=='awning'&&p.x+9>o.x&&p.x-9<o.x+o.w&&Math.abs(p.z-o.t)<1)return o;return null}
{const _u=updP;updP=function(){const vz0=p.vz,on0=p.on,b0=on0?pk4BncUnder():null,r=_u.apply(this,arguments);try{
 const b=pk4BncUnder();if(b&&!pk4Kd('down')){const aw=b.s=='awning';
  if(!on0&&vz0<(aw?-7:-2.5)){const v=aw?Math.min(13,-vz0*.8+2):Math.max(12.5,Math.min(16.5,-vz0*1.1+4));p.vz=v;p.vlt=24;p.on=false;p.z+=1;p.ld=0;b.sq=1;sfx('boing');spawnP(p.x,LY,6,b.bk=='levi'?'#e0e8f0':'#e8d8a8',2,8,b.t);if(b.bk=='levi')sfx('steam');if(!aw)pk4Hint('bnc','Trampolína! Skoč na ni z výšky a vyletíš až na střechu.')}}
 if(b0&&on0&&!p.on&&p.vz>9&&p.vz<11){p.vz=15;p.vlt=20;b0.sq=1;sfx('boing')}
 for(const q of PK4.bn)if(q.sq>0)q.sq=Math.max(0,q.sq-.08);for(const o of sol)if(o.s=='awning'&&o.sq>0)o.sq=Math.max(0,o.sq-.08);
 if(!PK4.seen.rope&&RS.some(r=>Math.abs(r.ax-p.x)<380)){PK4.seen.rope=1;pk4Hint('rope0','Nad propastí visí lano – skoč a chyť se ho!')}
 if(!PK4.seen.bn&&PK4.bn.some(q=>Math.abs(q.x-p.x)<360)){PK4.seen.bn=1;pk4Hint('bnc0','Trampolína! Skoč na ni z výšky a vyletíš až na střechu.')}}catch(e){}return r}}
/* zip → lano → skluz; jinak běžný pohyb */
zipUpd=function(){if(!p||p.dead){if(p){p.zip=null;p.rope=null;p.sld=0}return false}
 if(p.zip||!p.rope&&!(p.sld>0)){if(pk4Zip())return true}
 if(pk4Rope())return true;if(pk4Slide())return true;if(p.zcd>0)p.zcd--;if(p.rcd>0)p.rcd--;return false};
{const _u=upd;upd=function(){const r=_u.apply(this,arguments);try{if(state=='play'||state=='cut')pk4RopeIdle();for(const l of ZL)if(l.vib>0)l.vib=Math.max(0,l.vib*.965-.002)}catch(e){}return r}}
/* ---------- kreslení: lanovka ---------- */
const PK4C={port:['#1e1c1a','#9a9890','#c8c4b8'],swamp:['#1a2a14','#6a7a4a','#a8b888'],mine:['#141416','#7a7e86','#c8ccd2'],steppe:['#1a1410','#6a5a48','#a89878'],fort:['#141418','#8a8e96','#d0d4dc'],levi:['#0e0c0c','#6a5a4a','#c8a070']};
function pk4Trolley(x,y,a,v,ride){X.save();X.translate(x,y);X.rotate(a);const sp=T*v*.12;
 [[-7],[7]].forEach(([wx])=>{X.fillStyle='#3a3e44';X.beginPath();X.arc(wx,-1,5.2,0,7);X.fill();X.strokeStyle=OL;X.lineWidth=1.2;X.stroke();X.strokeStyle='#9aa0a8';X.lineWidth=1;X.beginPath();for(let k=0;k<3;k++){const b=sp+k*2.09;X.moveTo(wx,-1);X.lineTo(wx+Math.cos(b)*4.4,-1+Math.sin(b)*4.4)}X.stroke();X.fillStyle='#c8a050';X.beginPath();X.arc(wx,-1,1.4,0,7);X.fill()});
 const Pl=aRR(-12,-2,24,9,2);cel(Pl,'#c8302a',1,.8,'#6a1410','#ff8a7a');aLine(Pl,'#200606',1,.95);X.fillStyle='#e8c34a';X.fillRect(-10,4,20,1.6);
 X.strokeStyle=OL;X.lineWidth=3.4;X.beginPath();X.moveTo(-2,7);X.lineTo(-2,ride?13:16);X.moveTo(2,7);X.lineTo(2,ride?13:16);X.stroke();X.strokeStyle='#5a5e66';X.lineWidth=2;X.stroke();
 const H=aRR(-9,ride?12:15,18,4.4,2);cel(H,'#2a2a2e',.8,.6);aLine(H,'#000',.8,.95);X.restore()}
dZip=function(l){const x1=l.x1-cam,x2=l.x2-cam;if(Math.max(x1,x2)<-80||Math.min(x1,x2)>W+80)return;if(!l.nw)zipAnchor(l);const C=PK4C[lv.k]||PK4C.port;X.save();X.lineCap='round';X.lineJoin='round';
 /* stojany s kladkou a kotevním lankem */[[l.x1,l.z1,-1],[l.x2,l.z2,1]].forEach(([wx,z,s],i)=>{const g0=Math.max(-100,floorAt(wx,z-60,8)),x=wx-cam,ty=LY-z,gy=LY-g0;if(gy-ty<6)return;
  X.strokeStyle=OL;X.lineWidth=1.4;X.beginPath();X.moveTo(x,ty-10);X.lineTo(x+s*26,gy);X.stroke();X.strokeStyle='rgba(200,190,170,.5)';X.lineWidth=.7;X.stroke();
  const P=aRR(x-5,ty-14,10,gy-ty+14,2);cel(P,lv.k=='fort'||lv.k=='levi'||lv.k=='mine'?'#3a3e44':'#5a3a20',1.2,.8);aLine(P,'#120804',1,.95);
  const Bk=aRR(x-11,ty-18,22,7,2);cel(Bk,'#4a4e56',1,.7);aLine(Bk,'#0a0a0c',.9,.95);X.fillStyle='#2a2a2e';X.beginPath();X.arc(x,ty-4,5.6,0,7);X.fill();X.strokeStyle='#9aa0a8';X.lineWidth=1;X.beginPath();X.arc(x,ty-4,3.6,0,7);X.stroke();X.fillStyle='#c8a050';X.beginPath();X.arc(x,ty-4,1.4,0,7);X.fill()});
 /* lano: průhyb pod jezdcem, chvění po seskoku */
 const ru=l.ru,vib=l.vib||0,N=40,pts=[];for(let k=0;k<=N;k++){const u=k/N;let z=ru!=null?zipZr(l,u):zipZ(l,u);if(vib)z+=vib*7*Math.sin(Math.PI*u*3)*Math.sin(T*.7);pts.push(l.x1+(l.x2-l.x1)*u-cam,LY-z)}
 const Pc=new Path2D();Pc.moveTo(pts[0],pts[1]);for(let k=1;k<=N;k++)Pc.lineTo(pts[k*2],pts[k*2+1]);
 X.strokeStyle=C[0];X.lineWidth=4;X.stroke(Pc);X.strokeStyle=C[1];X.lineWidth=2.2;X.stroke(Pc);X.strokeStyle=C[2];X.lineWidth=.8;X.setLineDash([3,4]);X.lineDashOffset=-(l.ru!=null?T*(l.rv||3)*.5:0);X.stroke(Pc);X.setLineDash([]);
 if(lv.k=='swamp'){X.fillStyle='#5a7a3a';for(let k=2;k<N;k+=4){X.beginPath();X.ellipse(pts[k*2],pts[k*2+1]+3,4,2,.6,0,7);X.fill()}}
 /* vozík: zaparkovaný na startu, nebo pod rukama jezdce */
 const ang=Math.atan2(-(zipZ(l,.05)-zipZ(l,.02)),(l.x2-l.x1)*.03);
 if(ru!=null){const hx=p.x-cam,hy=LY-(p.z+92),ua=Math.max(0,ru-.01),ub=Math.min(1,ru+.01),ta=Math.atan2(-(zipZr(l,ub)-zipZr(l,ua)),(l.x2-l.x1)*(ub-ua));pk4Trolley(hx,hy-12,ta,l.rv||3,1);
  const v=l.rv||0;if(v>6){X.save();X.globalCompositeOperation='lighter';const d=Math.sign(l.x2-l.x1)||1;for(let k=0;k<6;k++){const s=Math.random();X.strokeStyle='rgba(255,'+(170+s*80|0)+',80,'+(.5+s*.5)+')';X.lineWidth=1.2;X.beginPath();X.moveTo(hx-d*4,hy-12);X.lineTo(hx-d*(10+s*18),hy-12+R(-6,8));X.stroke()}
   X.strokeStyle='rgba(255,255,255,.22)';X.lineWidth=1.4;for(let k=0;k<4;k++){const yy=hy+10+k*18,ln=20+v*4;X.beginPath();X.moveTo(hx-d*(18+k*4),yy);X.lineTo(hx-d*(18+k*4+ln),yy);X.stroke()}X.restore()}}
 else{const u0=.035,px=l.x1+(l.x2-l.x1)*u0-cam,py=LY-zipZ(l,u0);pk4Trolley(px,py-6,ang,0,0);if(p&&!p.zip&&Math.abs(p.x-l.x1)<260&&Math.abs(p.z+92-l.z1)<200){X.save();X.globalAlpha=.5+.4*Math.sin(T*.12);X.fillStyle='#ffe2a0';X.beginPath();X.moveTo(px,py+28);X.lineTo(px-5,py+21);X.lineTo(px+5,py+21);X.closePath();X.fill();X.restore()}}
 X.restore()};
/* ---------- kreslení: houpací lana a jejich trámy ---------- */
const PK4R={port:{rope:'#b89a62',dk:'#5a4426',beam:'#5a3a20',post:'#4a3020',iron:0},swamp:{rope:'#4a6a2a',dk:'#22341a',beam:'#3a3026',post:'#2e261c',vine:1},mine:{rope:'#7a7e86',dk:'#2a2a2e',beam:'#6a4a2a',post:'#5a3a20',chain:1},
 steppe:{rope:'#c8a868',dk:'#6a5030',beam:'#6a4426',post:'#5a3a20'},fort:{rope:'#8a8e96',dk:'#2a2a30',beam:'#3a3e44',post:'#2e3036',chain:1,iron:1},levi:{rope:'#8a7a62',dk:'#2a2018',beam:'#2e2a2a',post:'#22201e',chain:1,iron:1}};
function pk4DrawRopes(){if(!RS.length)return;X.save();X.lineCap='round';X.lineJoin='round';
 for(const r of RS){const S=PK4R[r.k]||PK4R.port,ax=r.ax-cam,ay=LY-r.az;if(ax<-400||ax>W+400)continue;
  if(r.beam){const[b0,b1,gz]=r.beam,x0=b0-cam,x1=b1-cam,gy=LY-gz,by=ay-14;
   [[x0],[x1]].forEach(([px])=>{const P=aRR(px-7,by-6,14,gy-by+6,2);cel(P,S.post,1.2,.8);aLine(P,'#0c0604',1,.95);X.strokeStyle=OL;X.lineWidth=5;[[-1],[1]].forEach(([d])=>{X.beginPath();X.moveTo(px,by+40);X.lineTo(px+d*22,by+8);X.stroke()});X.strokeStyle=S.post;X.lineWidth=3.2;[[-1],[1]].forEach(([d])=>{X.beginPath();X.moveTo(px,by+40);X.lineTo(px+d*22,by+8);X.stroke()})});
   const B=aRR(x0-14,by-8,x1-x0+28,12,2);cel(B,S.beam,1.4,.9);if(S.iron){X.save();X.clip(B);X.fillStyle='rgba(0,0,0,.35)';for(let k=x0;k<x1;k+=24){X.beginPath();X.moveTo(k,by-8);X.lineTo(k+12,by+4);X.lineTo(k+18,by+4);X.lineTo(k+6,by-8);X.fill()}X.restore()}aLine(B,'#0a0604',1.1,.95);
   if(S.vine){X.strokeStyle='#3a5a24';X.lineWidth=2;for(let k=x0;k<x1;k+=36){X.beginPath();X.moveTo(k,by+2);X.quadraticCurveTo(k+6,by+16,k+2,by+26+Math.sin(T*.02+k)*3);X.stroke()}}}
  else if(r.hang){X.strokeStyle=S.dk;X.lineWidth=2;X.beginPath();X.moveTo(ax,ay);X.lineTo(ax,-20);X.stroke()}
  /* kladka / hák */X.fillStyle='#3a3e44';X.beginPath();X.arc(ax,ay-4,5,0,7);X.fill();X.strokeStyle=OL;X.lineWidth=1.2;X.stroke();X.fillStyle='#c8a050';X.beginPath();X.arc(ax,ay-4,1.6,0,7);X.fill();
  /* lano: k ruce napnuté, zbytek visí */const ridden=p&&p.rope===r,rr=ridden?r.r:r.L,hx=ax+Math.sin(r.a)*rr,hy=ay+Math.cos(r.a)*rr;
  const seg=(x0,y0,x1,y1,bend)=>{const P=new Path2D();P.moveTo(x0,y0);P.quadraticCurveTo((x0+x1)/2+bend,(y0+y1)/2,x1,y1);return P};
  const P1=seg(ax,ay,hx,hy,ridden?0:-r.av*r.L*1.5);
  const drawRope=P=>{if(S.chain){X.strokeStyle=OL;X.lineWidth=5.4;X.setLineDash([5,2]);X.stroke(P);X.strokeStyle=S.rope;X.lineWidth=3.4;X.stroke(P);X.setLineDash([]);X.strokeStyle='rgba(255,255,255,.3)';X.lineWidth=.8;X.setLineDash([2,5]);X.stroke(P);X.setLineDash([])}
   else{X.strokeStyle=S.dk;X.lineWidth=5.6;X.stroke(P);X.strokeStyle=S.rope;X.lineWidth=3.8;X.stroke(P);X.strokeStyle='rgba(40,24,10,.5)';X.lineWidth=1;X.setLineDash([2,3]);X.stroke(P);X.setLineDash([])}};
  drawRope(P1);
  if(ridden){const tl=r.L-r.r,ta=r.a-r.av*6,tx=hx+Math.sin(ta)*tl,ty=hy+Math.cos(ta)*tl;drawRope(seg(hx,hy,tx,ty,-r.av*tl*3))}
  /* uzel / smyčka na konci, listy na liáně */const[ex,ey]=ridden?[hx+Math.sin(r.a-r.av*6)*(r.L-r.r),hy+Math.cos(r.a-r.av*6)*(r.L-r.r)]:[hx,hy];X.fillStyle=S.chain?'#5a5e66':S.dk;X.beginPath();X.arc(ex,ey,S.chain?4:3.4,0,7);X.fill();if(S.chain){X.strokeStyle=OL;X.lineWidth=1;X.beginPath();X.arc(ex,ey+5,4,0,Math.PI);X.stroke()}
  if(S.vine){X.fillStyle='#5a8a3a';for(let k=1;k<6;k++){const v=k/6,lx=ax+(hx-ax)*v,ly=ay+(hy-ay)*v;X.beginPath();X.ellipse(lx+(k%2?4:-4),ly,5,2.4,k%2?.6:-.6,0,7);X.fill()}}
  if(!ridden&&p&&Math.abs(p.x-r.ax)<300&&!p.rope){X.save();X.globalAlpha=.35+.3*Math.sin(T*.1);X.strokeStyle='#ffe2a0';X.lineWidth=1.4;X.beginPath();X.arc(ex,ey,9,0,7);X.stroke();X.restore()}}
 X.restore()}
{const _a=dArena;dArena=function(){_a();try{pk4DrawRopes()}catch(e){console.error('pk4r',e)}}}
/* ---------- kreslení: trampolíny podle úrovně ---------- */
function pk4Bnc(o){const x=o.x-cam,w=o.w,top=LY-o.t,gy=LY-o.gz,k=o.bk,sq=(o.sq||0)*Math.sin((1-(o.sq||0))*Math.PI*3)*1.6,dip=(o.sq||0)*8;if(x>W+80||x+w<-80)return;X.save();X.lineJoin='round';X.lineCap='round';
 const cloth=(c1,c2,stripe)=>{const P=new Path2D();P.moveTo(x-4,top+2);P.quadraticCurveTo(x+w/2,top+2+dip*1.4-sq*4,x+w+4,top+2);P.lineTo(x+w+2,top+8);P.quadraticCurveTo(x+w/2,top+8+dip,x-2,top+8);P.closePath();cel(P,c1,1,.8);if(stripe){X.save();X.clip(P);for(let i=0;i<w+8;i+=12){X.fillStyle=(i/12)%2?c2:c1;X.fillRect(x-4+i,top,6,12)}X.restore()}aLine(P,'#1a0c06',1,.95)};
 if(k=='port'){/* trampolína: železný rám na nohách, pružiny, pruhovaná plachta */[[x+4],[x+w-10]].forEach(([lx])=>{const L=aRR(lx,top+8,6,gy-top-8,1);cel(L,'#4a4e56',1,.7);aLine(L,'#0a0a0c',.9,.95)});X.strokeStyle='#3a3e44';X.lineWidth=2;X.beginPath();X.moveTo(x+7,gy-6);X.lineTo(x+w-7,top+16);X.moveTo(x+w-7,gy-6);X.lineTo(x+7,top+16);X.stroke();const Fr=aRR(x-6,top+6,w+12,7,3);cel(Fr,'#5a5e66',1,.8);aLine(Fr,'#0a0a0c',1,.95);cloth('#b8323a','#e8e0cc',1)}
 else if(k=='fort'){/* plachta napnutá na bednách */[[x+2],[x+w-24]].forEach(([cx])=>dCrate(cx,top+8,22,gy-top-8,(o.x|0)+cx));[[x-2],[x+w+2]].forEach(([sx])=>{X.strokeStyle='#2a2a2e';X.lineWidth=2;X.beginPath();X.moveTo(sx,top+4);X.lineTo(sx,gy);X.stroke()});
  for(let i=0;i<5;i++){const sx=x+6+i*(w-12)/4;X.strokeStyle='#8a8e96';X.lineWidth=1.2;X.beginPath();X.moveTo(sx,top+8+dip);for(let j=0;j<4;j++)X.lineTo(sx+(j%2?3:-3),top+10+dip+j*2.6);X.stroke()}cloth('#5a6a4a','#4a5a3a',1)}
 else if(k=='swamp'){/* obří pružná houba */const st=aRR(x+w/2-9,top+8,18,gy-top-8,6);cel(st,'#d8cfae',1,.8);aLine(st,'#3a3020',1,.95);const C=new Path2D();C.moveTo(x-8,top+10+dip*.5);C.quadraticCurveTo(x+w/2,top-22+dip*1.6-sq*5,x+w+8,top+10+dip*.5);C.quadraticCurveTo(x+w/2,top+16+dip,x-8,top+10+dip*.5);C.closePath();cel(C,'#c8502a',1.4,.9,'#7a2414','#ff9a6a');
  X.fillStyle='#f4e8c8';[[.25,-.2],[.5,-.55],[.72,-.25],[.4,.1],[.85,.05]].forEach(([u,v],i)=>{X.beginPath();X.ellipse(x+w*u,top+2+v*18+dip,3+i%2*2,2+i%2,0,0,7);X.fill()});aLine(C,'#2a0c04',1.1,.95);
  X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x+w/2,top,2,x+w/2,top,46);g.addColorStop(0,'rgba(255,170,110,'+(.18+.06*Math.sin(T*.06+o.x))+')');g.addColorStop(1,'rgba(255,170,110,0)');X.fillStyle=g;X.fillRect(x-30,top-46,w+60,92);X.restore()}
 else if(k=='mine'){/* pérová matrace na vozíku */const Bd=new Path2D();Bd.moveTo(x-2,top+12);Bd.lineTo(x+w+2,top+12);Bd.lineTo(x+w-4,gy-12);Bd.lineTo(x+4,gy-12);Bd.closePath();cel(Bd,'#4a4e56',1.2,.8);aLine(Bd,'#0a0a0c',1,.95);[[x+14],[x+w-14]].forEach(([wx])=>{const Wh=aEll(wx,gy-7,7,7);cel(Wh,'#2a2a30',1,.7);aLine(Wh,'#000',.9,.95)});
  for(let i=0;i<6;i++){const sx=x+6+i*(w-12)/5;X.strokeStyle='#9aa0a8';X.lineWidth=1.3;X.beginPath();X.moveTo(sx,top+12);for(let j=0;j<4;j++)X.lineTo(sx+(j%2?3:-3),top+10-j*1.6+dip*.3);X.stroke()}
  const M=aRR(x-2,top+1+dip,w+4,9,4);cel(M,'#b8a078',1,.8);X.save();X.clip(M);X.strokeStyle='rgba(90,60,30,.5)';X.lineWidth=.8;for(let i=x+4;i<x+w;i+=8){X.beginPath();X.moveTo(i,top+1+dip);X.lineTo(i,top+10+dip);X.stroke()}X.restore();aLine(M,'#2a1a08',1,.95)}
 else if(k=='steppe'){/* vůz se senem */const Bd=aRR(x-4,top+14,w+8,gy-top-30,2);cel(Bd,'#7a4a28',1.2,.8);X.save();X.clip(Bd);X.strokeStyle='rgba(30,14,4,.5)';X.lineWidth=1;for(let i=top+20;i<gy-16;i+=7){X.beginPath();X.moveTo(x-4,i);X.lineTo(x+w+4,i);X.stroke()}X.restore();aLine(Bd,'#1a0c04',1,.95);
  [[x+10],[x+w-10]].forEach(([wx])=>{const Wh=aEll(wx,gy-10,10,10);cel(Wh,'#6a4426',1,.7);X.strokeStyle='#3a2414';X.lineWidth=1.2;for(let a=0;a<6;a++){X.beginPath();X.moveTo(wx,gy-10);X.lineTo(wx+Math.cos(a*1.05)*9,gy-10+Math.sin(a*1.05)*9);X.stroke()}aLine(Wh,'#1a0c04',1,.95)});
  const H=new Path2D();H.moveTo(x-6,top+16);H.quadraticCurveTo(x+4,top-8+dip-sq*4,x+w/2,top-10+dip*1.5-sq*5);H.quadraticCurveTo(x+w-4,top-8+dip-sq*4,x+w+6,top+16);H.closePath();cel(H,'#e2bc5a',1.2,.9,'#9a7a2a','#fff0a0');X.save();X.clip(H);X.strokeStyle='rgba(140,100,30,.6)';X.lineWidth=.9;for(let i=0;i<22;i++){const sx=x+kH(o.x+i)*w,sy=top-6+kH(o.x+i*3)*20+dip;X.beginPath();X.moveTo(sx,sy);X.lineTo(sx+(kH(i)-.5)*12,sy+6);X.stroke()}X.restore();aLine(H,'#5a3a10',1,.95);
  X.strokeStyle='#e2bc5a';X.lineWidth=1;for(let i=0;i<5;i++){const sx=x+kH(o.x+i*7)*w;X.beginPath();X.moveTo(sx,top-4+dip);X.lineTo(sx+(kH(i*5)-.5)*14,top-12+dip);X.stroke()}}
 else{/* Leviatan: parní výdech */const R=aRR(x-4,top+10,w+8,gy-top-10,3);cel(R,'#2e2a2a',1.2,.8);aLine(R,'#000',1,.95);const G=aRR(x+2,top+2+dip*.3,w-4,9,3);cel(G,'#c8a050',1,.8,'#6a4a1a','#ffe6a0');X.save();X.clip(G);X.fillStyle='#1a1414';for(let i=x+6;i<x+w-4;i+=7)X.fillRect(i,top+3,3,8);X.restore();aLine(G,'#2a1a08',1,.95);
  const pulse=(Math.sin(T*.08+o.x)+1)/2,s=(o.sq||0);for(let k2=0;k2<5;k2++){const v=((T*1.6+k2*20)%100)/100,hh=24+pulse*20+s*90;X.fillStyle='rgba(230,236,240,'+(.32*(1-v)*(.5+pulse*.5+s))+')';X.beginPath();X.ellipse(x+w/2+Math.sin(T*.07+k2)*5,top-v*hh,10+v*16,6+v*8,0,0,7);X.fill()}
  X.fillStyle='#ffcf5a';X.fillRect(x+w/2-6,top+18,12,4);X.fillStyle='#e8c34a';X.font='700 8px Georgia';X.textAlign='center';X.fillText('PÁRA',x+w/2,top+32)}
 if(p&&Math.abs(p.x-(o.x+w/2))<320&&!p.rope&&!p.zip){X.save();X.globalAlpha=.35+.3*Math.sin(T*.12);X.fillStyle='#ffe2a0';for(let i=0;i<2;i++){const yy=top-34-i*11-((T*.6)%11);X.beginPath();X.moveTo(x+w/2,yy-6);X.lineTo(x+w/2-8,yy+2);X.lineTo(x+w/2+8,yy+2);X.closePath();X.fill()}X.restore()}
 X.restore()}
{const _dt=dTer;dTer=function(o){if(o&&o.s=='bnc'){if(!o.gone)pk4Bnc(o);return}if(o&&o.s=='awning'&&o.sq>0){X.save();X.translate(0,o.sq*Math.sin((1-o.sq)*Math.PI*3)*3);const r=_dt(o);X.restore();return r}return _dt(o)}}
