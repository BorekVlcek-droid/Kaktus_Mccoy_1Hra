/* =====================================================================
   v86: ÚPLNĚ NOVÉ FILMOVÉ SCÉNY – úvod a závěr hry hrané postavami
   Úvod: Pueblo Seco v noci → z nebe spadne semínko Srdce → zrodí se
   Kaktus → přepadení Baronovými muži, souboj → ztracená Baronova mapa →
   odchod do úsvitu.  Závěr: trosky Leviatana → návrat Srdce do studny →
   oživení pouště → fiesta.
   ===================================================================== */
const FGY=410;/* zem ve scéně (souřadnice jeviště) */
let FMC=[640,270,1];/* aktuální kamera jeviště: střed x, y, zoom */
/* ---------- kamera a vrstvy ---------- */
function fmKey(t,K){if(t<=K[0][0])return K[0].slice(1,4);for(let i=1;i<K.length;i++){const b=K[i];if(t<=b[0]){const a=K[i-1];if(b[4]=='cut')return a.slice(1,4);const u=(b[4]=='lin'?(v=>v):b[4]=='o'?tiE.o:tiE.s)((t-a[0])/(b[0]-a[0]));return[tiL(a[1],b[1],u),tiL(a[2],b[2],u),tiL(a[3],b[3],u)]}}return K[K.length-1].slice(1,4)}
/* vrstva s paralaxou f (0 = obrazovka, 1 = jeviště) */
function fmLay(f,fn){const[cx,cy,z]=FMC,zz=1+(z-1)*f;X.save();X.translate(W/2,H/2);X.scale(zz,zz);X.translate(-(W/2+(cx-W/2)*f),-(H/2+(cy-H/2)*f));try{fn()}catch(e){console.error('fm',e)}X.restore()}
function fmShake(a){if(a>.3)X.translate((hs(T*1.7)-.5)*2*a,(hs(T*2.3+5)-.5)*2*a)}
/* ---------- postavy ---------- */
function fmHero(x,gy,o){o=o||{};const c0=cam;cam=x-W/2;const q=Object.assign({},mp,{x,y:LY,z:0,t:T,cls:SV.cls,face:1,vx:0,fl:0,pt:0,arm:1},o);X.save();X.translate(cam,gy-LY);try{dC(q,o.zm||1)}catch(e){console.error('fmH',e)}X.restore();cam=c0}
function fmMan(t,x,gy,o){o=o||{};const c0=cam;cam=x-W/2;const e=Object.assign({t,civ:t.startsWith('cv')?1:0,x,y:LY,z:0,gf:0,face:1,hp:3,hp0:3,st:'pat',tm:0,lost:0,cd:0,hs:0,kb:0,dt:0,fl:0,t2:T,am:0,dg:0,stn:0,bk:0,lk:999,ix:x,act:null,at:0,nm:''},o);
 X.save();X.translate(cam,gy-LY);const sx=W/2;if(o.zm&&o.zm!=1){X.translate(sx,LY);X.scale(o.zm,o.zm);X.translate(-sx,-LY)}if(o.rot){X.translate(sx,LY-40);X.rotate(o.rot);X.translate(-sx,-LY+40)}try{dE(e)}catch(er){console.error('fmM',er)}X.restore();cam=c0}
function fmBoss(k,x,gy,bst,o){o=o||{};const c0=cam;cam=x-W/2;const q=Object.assign({B:k,t:'x',x,z:0,gf:0,face:-1,st:'boss',bst,tm:30,t2:T,hs:0,dt:0,hp:100,mhp:100,_fig:1,gd:0,fl:0,lost:null,vul:0,ks:(BD[k]||{}).ks||1},o);X.save();X.translate(cam,gy-LY);if(o.s){X.translate(W/2,LY);X.scale(o.s,o.s);X.translate(-W/2,-LY)}try{BOSSDRAW[k](q)}catch(e){console.error('fmB',e)}X.restore();cam=c0}
/* ---------- titulky ---------- */
function fmSubs(t,L){for(const s of L){const[t0,t1,who,txt]=s;if(t<t0||t>t1)continue;const a=Math.min(1,(t-t0)/8,(t1-t)/10),n=Math.floor((t-t0)*1.6);
  X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha=a;X.textAlign='center';const y=H-86;
  if(who){X.font='700 13px Georgia';try{X.letterSpacing='3px'}catch(e){}X.fillStyle=who=='KAKTUS'?'#9cff8a':'#ffcf7a';X.shadowColor='rgba(0,0,0,.95)';X.shadowBlur=8;X.fillText(who,W/2,y-28);try{X.letterSpacing='0px'}catch(e){}}
  X.font='italic 23px Georgia';X.fillStyle='#fbf1dc';X.shadowColor='rgba(0,0,0,.95)';X.shadowBlur=10;const vis=txt.slice(0,n);const ln=wrapL(vis,780);ln.forEach((l,i)=>X.fillText(l,W/2,y+i*27-(ln.length-1)*13));X.restore()}}
function fmCap(t,t0,t1,a,b){if(t<t0||t>t1+20)return;X.save();X.setTransform(1,0,0,1,0,0);tiTxt(a,40,104,t,t0,t1,{al:'l',sz:15,it:0,b:1,c:'#e9c77a',tr:4,stg:3});if(b)tiTxt(b,40,132,t,t0+12,t1,{al:'l',sz:20,c:'#f4e6c8',stg:3});X.restore()}
/* ---------- prostředí ---------- */
function fmSky(st){const g=X.createLinearGradient(0,0,0,H);st.forEach((c,i)=>g.addColorStop(i/(st.length-1),c));X.fillStyle=g;X.fillRect(-60,-60,W+120,H+120)}
function fmStars(t,a,n){X.save();for(let i=0;i<(n||110);i++){const x=hs(i*3.1)*W*1.5-W*.25,y=hs(i*7.7)*H*.62-20,tw=.5+.5*Math.sin(t*.05+i*1.7);X.fillStyle='rgba(255,250,230,'+(a*(.2+.7*tw*hs(i+.5)))+')';const s=hs(i*1.3)>.92?2.2:1.3;X.fillRect(x,y,s,s)}X.restore()}
function fmMoon(x,y,r,a){tiGlow(x,y,r*4,'220,230,255',.25*a);X.save();X.globalAlpha=a;X.fillStyle='#f4f0dc';X.beginPath();X.arc(x,y,r,0,7);X.fill();X.fillStyle='rgba(180,170,150,.35)';[[-.3,-.2,.25],[.25,.15,.18],[-.05,.35,.12]].forEach(([dx,dy,s])=>{X.beginPath();X.arc(x+dx*r,y+dy*r,s*r,0,7);X.fill()});X.restore()}
function fmMesas(y,cols,lit){tiButte(140,260,120,y,cols[0],cols[1],lit,3);tiButte(560,180,92,y+6,cols[0],cols[1],lit,7);tiButte(980,320,140,y,cols[0],cols[1],lit,11);tiButte(1420,220,104,y+4,cols[0],cols[1],lit,17)}
function fmHills(y,col,seed,amp){X.fillStyle=col;X.beginPath();X.moveTo(-600,H+300);for(let x=-600;x<=2200;x+=10)X.lineTo(x,y-amp*tiF(x*.004+seed,4));X.lineTo(2200,H+300);X.closePath();X.fill()}
function fmGround(c1,c2,y){X.fillStyle=tiLG(0,y,0,y+160,[c1,c2]);X.fillRect(-800,y,3400,400)}
function fmCracks(y,a,col){X.save();X.strokeStyle=col||'rgba(40,24,14,'+a+')';X.lineWidth=1.4;for(let i=0;i<26;i++){const x0=-300+i*90+hs(i)*40,y0=y+8+hs(i+3)*70;X.beginPath();X.moveTo(x0,y0);let x=x0,yy=y0;for(let k=0;k<4;k++){x+=(hs(i*5+k)-.5)*70;yy+=(hs(i*7+k)-.3)*10;X.lineTo(x,yy)}X.stroke()}X.restore()}
function fmWell(x,y,o){o=o||{};X.save();X.translate(x,y);X.lineJoin='round';X.strokeStyle='#1a120c';X.lineWidth=2;
 /* rám a rumpál */X.fillStyle='#5a3a22';X.fillRect(-46,-118,7,92);X.fillRect(39,-118,7,92);X.strokeRect(-46,-118,7,92);X.strokeRect(39,-118,7,92);
 X.fillStyle='#7a3a22';X.beginPath();X.moveTo(-62,-112);X.lineTo(0,-150);X.lineTo(62,-112);X.lineTo(52,-108);X.lineTo(0,-138);X.lineTo(-52,-108);X.closePath();X.fill();X.stroke();
 X.fillStyle='#4a2e18';X.fillRect(-40,-98,80,8);X.strokeRect(-40,-98,80,8);const cr=o.crank||0;X.save();X.translate(46,-94);X.rotate(cr);X.strokeStyle='#3a2a1a';X.lineWidth=3;X.beginPath();X.moveTo(0,0);X.lineTo(14,0);X.lineTo(14,10);X.stroke();X.restore();
 /* lano a vědro */const by=o.bucket==null?-60:o.bucket;X.strokeStyle='#c8a870';X.lineWidth=1.6;X.beginPath();X.moveTo(0,-90);X.lineTo(0,by-14);X.stroke();if(by<-30){X.save();X.translate(0,by);X.rotate(o.tilt||0);X.fillStyle='#6a5a4a';X.beginPath();X.moveTo(-10,-14);X.lineTo(10,-14);X.lineTo(8,4);X.lineTo(-8,4);X.closePath();X.fill();X.stroke();X.restore()}
 /* kamenná obruba */X.fillStyle=tiLG(0,-40,0,0,['#8a7a66','#5a4a3c']);X.beginPath();X.moveTo(-54,-40);X.lineTo(54,-40);X.lineTo(50,0);X.lineTo(-50,0);X.closePath();X.fill();X.stroke();
 X.fillStyle=o.water?'#2a6a7a':'#1a120c';X.beginPath();X.ellipse(0,-40,54,9,0,0,7);X.fill();X.stroke();
 X.strokeStyle='rgba(0,0,0,.35)';X.lineWidth=1.2;for(let r=0;r<3;r++)for(let i=0;i<6;i++){const xx=-50+i*18+(r%2)*9;X.strokeRect(xx,-36+r*12,18,12)}
 X.restore()}
function fmHouse(x,y,w,h,lit,ruin){X.save();X.lineJoin='round';X.fillStyle=tiLG(0,y-h,0,y,['#b8865a','#8a5a38']);X.strokeStyle='#1e120a';X.lineWidth=2;X.beginPath();X.moveTo(x,y);X.lineTo(x,y-h);if(ruin){X.lineTo(x+w*.4,y-h);X.lineTo(x+w*.55,y-h*.72);X.lineTo(x+w*.7,y-h*.86);X.lineTo(x+w,y-h*.8)}else X.lineTo(x+w,y-h);X.lineTo(x+w,y);X.closePath();X.fill();X.stroke();
 X.fillStyle='#5a3422';for(let i=x+8;i<x+w-6;i+=16)if(!ruin||i<x+w*.4){X.fillRect(i,y-h+6,7,6)}
 X.fillStyle='#2a180e';X.fillRect(x+w*.14,y-h*.58,w*.2,h*.58);X.strokeRect(x+w*.14,y-h*.58,w*.2,h*.58);
 const wx=x+w*.56,wy=y-h*.66,ww=w*.22,wh=h*.26;X.fillStyle=lit?'#ffcf7a':'#1a1210';X.fillRect(wx,wy,ww,wh);X.strokeRect(wx,wy,ww,wh);X.beginPath();X.moveTo(wx+ww/2,wy);X.lineTo(wx+ww/2,wy+wh);X.stroke();if(lit)tiGlow(wx+ww/2,wy+wh/2,60,'255,190,100',.35*lit);X.restore()}
function fmChurch(x,y,s,lit){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#a8784e';X.strokeStyle='#1e120a';X.lineWidth=2;X.fillRect(-40,-90,80,90);X.strokeRect(-40,-90,80,90);X.beginPath();X.moveTo(-30,-90);X.lineTo(-30,-150);X.quadraticCurveTo(0,-176,30,-150);X.lineTo(30,-90);X.fill();X.stroke();X.fillStyle='#2a180e';X.beginPath();X.arc(0,-136,9,Math.PI,0);X.lineTo(9,-122);X.lineTo(-9,-122);X.fill();X.fillStyle='#c9a040';X.fillRect(-2,-190,4,22);X.fillRect(-9,-184,18,4);X.fillStyle=lit?'#ffcf7a':'#2a180e';X.fillRect(-10,-50,20,50);X.restore()}
function fmFence(x0,x1,y){X.save();X.strokeStyle='#3a2616';X.lineWidth=4;for(let x=x0;x<=x1;x+=34){X.beginPath();X.moveTo(x,y);X.lineTo(x+(hs(x)-.5)*4,y-34-hs(x+1)*8);X.stroke()}X.lineWidth=3;X.beginPath();X.moveTo(x0,y-24);X.lineTo(x1,y-22);X.moveTo(x0,y-12);X.lineTo(x1,y-13);X.stroke();X.restore()}
function fmLantern(x,y,a,on){X.save();X.translate(x,y);X.rotate(a||0);X.strokeStyle='#1a120c';X.lineWidth=1.4;X.beginPath();X.moveTo(0,-14);X.lineTo(0,-6);X.stroke();X.fillStyle='#3a2e22';X.fillRect(-6,-6,12,3);X.fillStyle=on===0?'#3a3026':'#ffd27a';X.fillRect(-5,-3,10,12);X.strokeRect(-5,-3,10,12);X.fillStyle='#3a2e22';X.fillRect(-6,9,12,3);X.restore();if(on!==0)tiGlow(x,y+3,46,'255,190,90',.55)}
function fmSombrero(x,y,a,s){X.save();X.translate(x,y);X.rotate(a);X.scale(s,s);X.fillStyle='#d8b878';X.strokeStyle='#2a1a0a';X.lineWidth=1.6;X.beginPath();X.ellipse(0,0,24,6,0,0,7);X.fill();X.stroke();X.beginPath();X.moveTo(-10,-1);X.quadraticCurveTo(-8,-16,0,-17);X.quadraticCurveTo(8,-16,10,-1);X.fill();X.stroke();X.fillStyle='#a8323a';X.fillRect(-10,-5,20,3);X.restore()}
function fmMap(x,y,s,a){X.save();X.translate(x,y);X.rotate(a||0);X.scale(s,s);X.fillStyle='#e8d4a4';X.strokeStyle='#5a3a1a';X.lineWidth=1.2;X.fillRect(-14,-9,28,18);X.strokeRect(-14,-9,28,18);X.strokeStyle='rgba(120,40,20,.7)';X.beginPath();X.moveTo(-10,4);X.lineTo(-2,-3);X.lineTo(6,2);X.lineTo(11,-5);X.stroke();X.fillStyle='#a8262a';X.beginPath();X.arc(8,5,3,0,7);X.fill();X.restore()}
/* zelený záblesk / vlna */
function fmRing(x,y,r,a,col,w){if(a<=0)return;X.save();X.globalCompositeOperation='lighter';X.strokeStyle='rgba('+col+','+a+')';X.lineWidth=w||6;X.beginPath();X.ellipse(x,y,r,r*.28,0,0,7);X.stroke();X.restore()}
/* deterministická dávka částic (prach, jiskry) */
function fmBurst(t,t0,n,seed,x,y,o){const age=t-t0,L=o.L||60;if(age<0||age>L)return;X.save();if(o.add)X.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const a=(o.a0==null?-Math.PI:o.a0)+hs(seed+i)*(o.sp==null?Math.PI:o.sp),v=(o.v||4)*(.4+hs(seed+i*3)*.8),px=x+Math.cos(a)*v*age,py=y+Math.sin(a)*v*age+(o.g||.12)*age*age,k=age/L,r=(o.r||3)*(o.grow?1+k*o.grow:1);
  if(o.puff)rgPuff(px,py,r,(1-k)*(o.al||.6),o.c||'200,180,150');else{X.fillStyle='rgba('+(o.c||'255,230,160')+','+(1-k)*(o.al||1)+')';X.fillRect(px-r/2,py-r/2,r,r)}}X.restore()}
function fmDust(x,y,t,t0,n,col,L){fmBurst(t,t0,n,x*.37+y,x,y-6,{puff:1,a0:-Math.PI,sp:Math.PI,v:1.6,g:-.008,r:16,grow:2.4,L:L||70,c:col||'190,165,130',al:.55})}
function fmBlack(a){if(a>0){X.save();X.setTransform(1,0,0,1,0,0);X.fillStyle='rgba(0,0,0,'+Math.min(1,a)+')';X.fillRect(0,0,W,H);X.restore()}}
function fmWhite(a,c){if(a>0){X.save();X.setTransform(1,0,0,1,0,0);X.fillStyle='rgba('+(c||'235,255,240')+','+Math.min(1,a)+')';X.fillRect(0,0,W,H);X.restore()}}
function fmTint(c,a){if(a>0){X.save();X.setTransform(1,0,0,1,0,0);X.fillStyle='rgba('+c+','+a+')';X.fillRect(0,0,W,H);X.restore()}}
/* rostoucí kaktus ze semínka */
function fmSprout(x,y,h,k,pu){if(h<=1)return;X.save();X.translate(x,y);X.lineJoin='round';const w=Math.min(26,6+h*.22);X.strokeStyle='#0e2a10';X.lineWidth=2;
 const arm=(sy,l,d)=>{if(l<=1)return;X.beginPath();X.moveTo(0,-sy);X.quadraticCurveTo(d*w*1.2,-sy,d*w*1.3,-sy-l);X.lineWidth=w*.62;X.strokeStyle='#0e2a10';X.stroke();X.lineWidth=w*.62-3;X.strokeStyle='#4caf3a';X.stroke()};
 arm(h*.45,Math.max(0,(k-.45)/.55)*h*.32,-1);arm(h*.6,Math.max(0,(k-.6)/.4)*h*.26,1);
 X.fillStyle=tiLG(-w/2,0,w/2,0,['#2a6a24','#6ad84a','#2a6a24']);X.beginPath();X.roundRect(-w/2,-h,w,h,w/2);X.fill();X.lineWidth=2;X.strokeStyle='#0e2a10';X.stroke();
 X.strokeStyle='rgba(230,255,200,.9)';X.lineWidth=1;for(let i=1;i<h/12;i++){const yy=-i*12;[-1,1].forEach(d=>{X.beginPath();X.moveTo(d*w/2,yy);X.lineTo(d*(w/2+4),yy-3);X.stroke()})}
 X.restore();tiGlow(x,y-h*.5,80+h,'120,255,150',.25+.35*(pu||0))}
/* paprsky světla */
function fmRays(x,y,r,a,col,t){if(a<=0)return;X.save();X.globalCompositeOperation='lighter';X.translate(x,y);for(let i=0;i<14;i++){const an=i/14*6.283+t*.004+hs(i)*.3,w=.05+hs(i+4)*.07;X.fillStyle=tiRG(0,0,0,r,[[0,'rgba('+col+','+.4*a+')'],[1,'rgba('+col+',0)']]);X.beginPath();X.moveTo(0,0);X.lineTo(Math.cos(an-w)*r,Math.sin(an-w)*r);X.lineTo(Math.cos(an+w)*r,Math.sin(an+w)*r);X.closePath();X.fill()}X.restore()}
const fmBeats=(t,arr)=>{let v=0;for(const b of arr){const d=t-b;if(d>=0&&d<40)v+=Math.exp(-d/6)}return Math.min(1,v)};

/* ===== Pueblo Seco – noční kulisa (společná pro úvod) ===== */
function fmTownBack(t,o){o=o||{};const night=o.night==null?1:o.night;
 fmSky(night>.5?['#070a1c','#1a1838','#4a2a3e','#7a4038']:['#2a2850','#c8603a','#ffb05a','#ffe0a0']);
 if(night>.5){fmStars(t,1);fmMoon(170,92,24,1)}else{const sy=tiL(470,330,o.sun||0);tiGlow(W*.72,sy,420,'255,200,120',.6);X.fillStyle='#fff1c8';X.beginPath();X.arc(W*.72,sy,40,0,7);X.fill()}
 fmLay(.15,()=>{fmMesas(FGY-50,night>.5?['#2a1e30','#1a1422']:['#a0583a','#6a3424'],night>.5?'rgba(120,110,160,.12)':'rgba(255,210,150,.25)');if(o.levi!==0)tiLeviSil(t,840,FGY-38,.15)});
 fmLay(.35,()=>{fmHills(FGY-10,night>.5?'#1a1420':'#7a4a30',3,40);[[40,70,44],[120,60,38],[190,84,52]].forEach(([x,w,h],i)=>fmHouse(x,FGY-6,w,h,night>.5&&i==1?.6:0,i==0));fmChurch(300,FGY-6,.6,night>.5)});
 fmLay(.7,()=>{fmHills(FGY+6,night>.5?'#241a1a':'#94603a',9,18)})}
function fmTownNear(t,o){o=o||{};const night=o.night==null?1:o.night;
 fmGround(night>.5?'#3a2a20':'#c08a52',night>.5?'#1a120e':'#8a5a32',FGY);fmCracks(FGY,night>.5?.6:.45);
 X.fillStyle=night>.5?'rgba(80,60,44,.6)':'rgba(220,180,120,.5)';X.beginPath();X.moveTo(-400,FGY+70);X.quadraticCurveTo(500,FGY+10,1700,FGY+40);X.lineTo(1700,FGY+60);X.quadraticCurveTo(500,FGY+30,-400,FGY+96);X.closePath();X.fill();
 fmHouse(-60,FGY+4,190,130,night>.5?.8:0,0);fmHouse(160,FGY+2,150,110,0,1);
 tiSaguaro(330,FGY+4,120,o.green?0:1);tiSaguaro(1620,FGY+2,150,o.green?0:1,o.green);tiSaguaro(1480,FGY+6,100,o.green?0:1);bpSkull(1250,FGY+14,.7,0);
 fmFence(1300,1560,FGY+8)}

/* ================= ÚVOD 1: noc, prázdná studna, padající semínko ================= */
const FN1={WX:720,IX:960};
function fn1Seed(t){/* kometa: od 600 do 690 */const u=tiS(t,600,690),x=tiL(150,FN1.IX,tiE.i(u)),y=tiL(-60,FGY-4,tiE.i(u));return[x,y,u]}
tiDef('s_fi1',840,(t,d)=>{
 FMC=fmKey(t,[[0,560,290,1.18],[250,640,300,1.32],[330,700,330,1.6],[460,690,330,1.6],[470,640,280,1.05,'cut'],[600,640,280,1.05],[690,800,300,1.18],[700,800,300,1.18],[840,840,330,1.42]]);
 const sh=tiShk(t,[[690,16,14],[700,8,20]]);fmShake(sh);
 fmTownBack(t,{});
 fmLay(1,()=>{fmTownNear(t,{});
  /* děda Chencho */const wx=FN1.WX,ax=t<250?tiL(420,wx-70,tiE.s(tiS(t,40,250))):wx-70;
  let act='walk',st='pat',lk=0,face=1;if(t>=250){lk=999;act=t<330?'pick':t<470?'rub':t<600?'shoo':t<690?'lookup':'cower'}if(t>=470&&t<600)face=1;
  const crank=t>=260&&t<330?(t-260)*.25:0,buck=t<260?-60:t<330?tiL(-30,-110,(t-260)/70):-110;
  fmWell(wx,FGY,{crank,bucket:buck,tilt:t>=330&&t<420?Math.min(1.4,(t-330)*.05):0});
  if(t>=336&&t<430)fmBurst(t,336,30,7,wx+4,FGY-112,{a0:Math.PI*.35,sp:.3,v:1.4,g:.22,r:3,L:70,c:'170,140,100'});
  const kn=t>=690?Math.min(1,(t-690)/10):0;fmMan('cvh',ax-kn*30,FGY,{act,st,lk,face:t>=690?1:face,t2:t,at:t});
  if(t<250)fmLantern(ax+16,FGY-62+Math.sin(t*.18)*2,Math.sin(t*.18)*.2);else if(t<690)fmLantern(wx-118,FGY-2,0);else{const u=Math.min(1,(t-690)/40);fmLantern(tiL(wx-118,wx-260,u),FGY-2-120*Math.sin(Math.PI*u),t*.3,u>.9?0:1)}
  /* sombrero odletí */if(t>=690){const u=Math.min(1,(t-690)/90);fmSombrero(tiL(ax-20,ax-180,u),FGY-120-170*Math.sin(Math.PI*u*.9)+u*80,t*.25,1)}
  /* kometa a dopad */const[sx,sy,u]=fn1Seed(t);if(t>=600&&t<690){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<22;i++){const[tx,ty]=fn1Seed(t-i*1.5);X.fillStyle='rgba(150,255,170,'+(1-i/22)*.8+')';X.beginPath();X.arc(tx,ty,8*(1-i/22)+1,0,7);X.fill()}X.restore();tiGlow(sx,sy,80,'150,255,170',.9);if(t%2==0)fmBurst(t,t-1,3,t,sx,sy,{add:1,v:2,L:20,c:'200,255,210'})}
  if(t>=690){const k=t-690;fmRing(FN1.IX,FGY,k*9,Math.max(0,1-k/45),'160,255,180',8);fmRing(FN1.IX,FGY,k*5,Math.max(0,1-k/35),'255,255,255',4);fmBurst(t,690,40,3,FN1.IX,FGY-10,{v:7,g:.3,r:4,L:60,c:'90,70,50',a0:-Math.PI,sp:Math.PI});fmBurst(t,690,26,9,FN1.IX,FGY-10,{add:1,v:5,g:.05,r:3,L:50,c:'160,255,180'});fmDust(FN1.IX,FGY,t,692,18,'150,130,100',120);
   const gl=Math.min(1,k/20);tiGlow(FN1.IX,FGY-20,240,'110,255,150',.55*gl*(.85+.15*Math.sin(t*.2)));X.save();X.globalCompositeOperation='lighter';X.fillStyle=tiLG(0,FGY-400,0,FGY,['rgba(120,255,160,0)','rgba(120,255,160,'+.25*gl+')']);X.fillRect(FN1.IX-22,FGY-400,44,400);X.restore()}
  /* Leviatan bliká rudě při troubení */});
 if(t>=470&&t<600){const a=.18*Math.max(0,Math.sin((t-470)*.12));fmTint('255,40,30',a)}
 fmWhite(t>=690?Math.max(0,1-(t-690)/14)*.85:0);
 fmCap(t,30,220,'PUEBLO SECO','městečko, kterému Baron vypil řeku');
 fmSubs(t,[[340,452,'DĚDA CHENCHO','Zase jen písek… Ani kapka.'],[474,598,'DĚDA CHENCHO','Ten tvůj stroj, Barone… vypil nám i slzy.'],[620,686,'DĚDA CHENCHO','¿Qué es eso…?'],[730,836,'DĚDA CHENCHO','¡Madre de Dios…!']]);
 fmBlack(1-tiS(t,0,40));fmBlack(tiS(t,815,840))},
t=>{if(t==1)TS.wind(12,.5,0,380);if(t==2)TS.drone(13,.25,55);if(t>40&&t<250&&t%26==0)sfx('step');if(t>=260&&t<330&&t%12==0)sfx('creak');if(t==336)sfx('spit');if(t==470){TS.braam(.6,38,0,3)}if(t==476)sfx('bIn');if(t==600)TS.riser(1.6,.8);if(t==612)TS.whoosh(1.4,.6,300,2600);if(t==690){TS.hit(1);sfx('boom');TS.crack(1,0,14)}if(t==700)TS.shimmer(2.5,.5,0,[74,81,86,93]);if(t==730)TS.heart(.9)});

/* ================= ÚVOD 2: kráter, zrození Kaktuse ================= */
const FN2B=[30,92,146,192,230,262,288,308,322,332];
tiDef('s_fi2',900,(t,d)=>{const IX=FN1.IX;
 FMC=fmKey(t,[[0,IX-90,FGY-62,2.1],[150,IX-30,FGY-60,2.3],[320,IX,FGY-70,2.55],[340,IX-40,FGY-70,1.9,'cut'],[430,IX-70,FGY-70,1.9],[520,IX-40,FGY-62,2.2],[640,IX-110,FGY-76,1.75],[760,IX-80,FGY-70,1.9],[900,IX+40,FGY-86,1.55]]);
 const pu=fmBeats(t,FN2B),sh=tiShk(t,[[332,12,14]])+(t>150&&t<332?pu*2:0);fmShake(sh);
 fmTownBack(t,{});
 fmLay(1,()=>{fmTownNear(t,{});fmWell(FN1.WX,FGY,{bucket:-110});
  /* kráter s prasklinami */X.fillStyle='rgba(20,12,8,.85)';X.beginPath();X.ellipse(IX,FGY+6,70,14,0,0,7);X.fill();
  X.save();X.globalCompositeOperation='lighter';X.lineCap='round';for(let i=0;i<9;i++){const a=i/9*6.283,L=tiL(30,170,Math.min(1,t/300))*(.6+hs(i)*.6);X.strokeStyle='rgba(120,255,160,'+(.25+.6*pu)+')';X.lineWidth=2.5;X.beginPath();X.moveTo(IX,FGY+6);let x=IX,y=FGY+6;for(let k=1;k<=4;k++){x+=Math.cos(a)*L/4+(hs(i*4+k)-.5)*14;y+=Math.sin(a)*L/16;X.lineTo(x,y)}X.stroke()}X.restore();
  tiGlow(IX,FGY-10,150+60*pu,'110,255,150',.35+.35*pu);
  /* růst výhonku */const hg=t<150?0:t<332?tiE.i(tiS(t,150,320))*118:0;if(hg>0){fmRays(IX,FGY-hg*.6,260,tiS(t,200,330),'170,255,190',t);fmSprout(IX,FGY+2,hg,tiS(t,150,320),pu)}
  /* Kaktus */if(t>=332){const cr=t<400?1:0,face=t<440?1:t<470?-1:t<500?1:-1;const fc=t>=640&&t<760?-1:face;
   fmHero(IX,FGY,{cr,face:t>=520?-1:fc,t});
   const gl=Math.max(0,1-(t-332)/120);tiGlow(IX,FGY-50,200,'150,255,180',gl*.9);if(t>=650&&t<760){const p2=.5+.5*Math.sin(t*.3);tiGlow(IX-4,FGY-62,30+12*p2,'140,255,170',.7)}}
  /* děda */const dx=t<120?IX-230:t<330?tiL(IX-230,IX-150,tiS(t,120,320)):t<345?IX-150-tiS(t,332,345)*40:IX-190;
  let act=t<120?'cower':t<330?'walk':t<420?'cower':t<640?'listen':t<760?'point':'cheer';let lk=t>=120&&t<330?0:999;
  fmMan('cvh',dx,FGY,{act,st:'pat',lk,face:1,t2:t,at:t});
  if(t<120){fmSombrero(IX-330,FGY-2,.1,1)}else if(t<180){const u=(t-120)/60;fmSombrero(tiL(IX-330,dx-2,u),FGY-2-60*Math.sin(Math.PI*u)-u*90,u*3,1)}
  if(t>=332){fmRing(IX,FGY,(t-332)*10,Math.max(0,1-(t-332)/40),'200,255,210',6);fmDust(IX,FGY,t,334,16,'170,150,120',90);fmBurst(t,332,30,21,IX,FGY-40,{add:1,v:4,g:-.02,r:3,L:70,c:'170,255,190'})}
  /* lucerny na obzoru */if(t>820){const a=tiS(t,820,860);[[1500,0],[1560,1],[1610,2]].forEach(([x,i])=>{fmLantern(x-(t-820)*.6,FGY-60+Math.sin(t*.2+i)*3,Math.sin(t*.2+i)*.2,a>.1?1:0)})}});
 fmWhite(t>=318&&t<360?(t<332?(t-318)/14:1-(t-332)/28):0);
 fmSubs(t,[[60,140,'DĚDA CHENCHO','Ay, ay… co to tu svítí?'],[452,540,'KAKTUS','Kde… to jsem?'],[548,640,'DĚDA CHENCHO','V Pueblu Seco, hijo. V tom, co z něj Baron nechal.'],[650,756,'KAKTUS','Slyším ho. Pod zemí… Srdce pouště ještě bije.'],[764,830,'DĚDA CHENCHO','¡Milagro! Strážce Srdce – jako v legendě!'],[840,900,'DĚDA CHENCHO','Ay… Baronovi psi. Viděli tu záři.']]);
 fmBlack(1-tiS(t,0,24))},
t=>{FN2B.forEach(b=>{if(t==b)TS.heart(.6+b/500)});if(t==150)TS.riser(3,.6);if(t==200)TS.bloom(2.5,.4);if(t==332){TS.hit(.8);sfx('boom');TS.glint(1.2)}if(t==340)TS.shimmer(2,.6,0,[74,78,81,86]);if(t==452||t==650)sfx('vIn2');if(t==764)TS.glint(.8);if(t==840)TS.braam(.5,40,0,2.5)});

/* ================= ÚVOD 3: přepadení a souboj ================= */
/* časování souboje */const FN3={IX:FN1.IX};
tiDef('s_fi3',1160,(t,d)=>{const IX=FN3.IX;
 /* zpomalení (časová osa souboje) */
 FMC=fmKey(t,[[0,IX+120,FGY-110,1.3],[180,IX+80,FGY-110,1.4],[330,IX+60,FGY-100,1.5],[360,IX+40,FGY-100,1.9,'o'],[420,IX+90,FGY-100,1.45],[440,IX+120,FGY-110,1.55],[480,IX+80,FGY-130,1.95],[540,IX+130,FGY-110,1.6],[600,IX+220,FGY-110,1.7],[720,IX+60,FGY-100,1.35],[820,IX+40,FGY-100,1.5],[960,IX+250,FGY-80,1.9],[1160,IX+290,FGY-90,2.4]]);
 const sh=tiShk(t,[[372,10,10],[531,8,10],[650,5,10]]);fmShake(sh);
 fmTownBack(t,{});
 fmLay(1,()=>{fmTownNear(t,{});fmWell(FN1.WX,FGY,{bucket:-110});X.fillStyle='rgba(20,12,8,.85)';X.beginPath();X.ellipse(IX,FGY+6,70,14,0,0,7);X.fill();tiGlow(IX,FGY-10,120,'110,255,150',.25);
  /* bandité: A (rváč), B (pistolník), V (vůdce) */
  const enter=u=>tiE.o(tiS(t,0,150));
  const Ax=t<330?tiL(IX+460,IX+170,enter()):t<372?tiL(IX+170,IX+40,(t-330)/42):IX+40+Math.min(1,(t-372)/40)*360,Az=t>=372?Math.max(0,140*Math.sin(Math.PI*Math.min(1,(t-372)/40))):0;
  const Bx=tiL(IX+520,IX+260,enter()),Vx=t<600?tiL(IX+580,IX+340,enter()):IX+340+Math.max(0,t-650)*7;
  fmMan('g',Ax,FGY-Az,{st:t<150?'pat':t<330?'pat':t<372?'chase':'dead',lk:t<150?0:999,face:-1,t2:t,dt:t>=372?Math.min(60,(t-372)*1.2):0,gf:0,hs:0});
  const bDead=t>=531;fmMan('g',Bx,FGY,{st:bDead?'dead':(t>=430&&t<531?'shoot':(t<150?'pat':'pat')),lk:t<150?0:999,face:-1,t2:t,dt:bDead?Math.min(60,(t-531)*1.5):0,hs:t>=531&&t<540?10:0});
  fmMan('c',Vx,FGY,{st:t<150||t>=650?'pat':'pat',lk:t<150||t>=650?0:999,face:t>=650?1:-1,t2:t*(t>=650?2.2:1),hs:t>=600&&t<650?(Math.sin(t*.9)>0?6:0):0});
  /* lucerny banditů */if(t<372)fmLantern(Ax-14,FGY-64+Math.sin(t*.2)*2,Math.sin(t*.2)*.2);else if(t<420){const u=(t-372)/48;fmLantern(tiL(Ax-14,Ax+60,u),FGY-64-90*Math.sin(Math.PI*u),t*.4)}else fmLantern(IX+300,FGY-2,1.4,0);
  if(t<600)fmLantern(Vx-18,FGY-80+Math.sin(t*.2+2)*2,Math.sin(t*.2+2)*.2);else if(t<650)fmLantern(Vx-18+R0(-2,2),FGY-80,R0(-.3,.3));else if(t<690){const u=(t-650)/40;fmLantern(IX+322,FGY-80+u*78,u*1.6,1);if(t>=686)fmBurst(t,686,16,4,IX+322,FGY-6,{add:1,v:2,L:30,c:'255,190,90'})}
  /* mapa vypadne vůdci */if(t>=650){const u=Math.min(1,(t-650)/30);const mx=IX+300,my=FGY-50+u*44;if(t<830)fmMap(mx,my,1.4,u*1.2);}
  /* Kaktus */let hx=t<180?IX:t<300?tiL(IX,IX+30,tiS(t,180,300)):IX+30,hz=0,ds=0,pt=0,aim=0,cr=0,face=1,vx=t>=180&&t<300?1.2:0;
  if(t>=360&&t<380)pt=Math.max(0,20-(t-360));
  if(t>=470&&t<515){const u=(t-470)/45;hz=110*Math.sin(Math.PI*u);ds=10*(1-u);hx=IX+30+u*30}else if(t>=515)hx=IX+60;
  if(t>=518&&t<600)aim=40;if(t>=840&&t<900){hx=tiL(IX+60,IX+290,tiS(t,840,900));vx=2}else if(t>=900)hx=IX+290;if(t>=905&&t<940)cr=1;
  fmHero(hx,FGY,{z:hz,fl:0,ds,pt,aim,cr,face,vx,t});
  if(t>=900&&t<1160&&t>=930){fmMap(hx+18,FGY-52,1.2,-.2)}
  /* výstřely */if(t>=440&&t<444){tiGlow(Bx-40,FGY-62,40,'255,220,140',1)}
  if(t>=441&&t<505){const u=(t-441)/64,bx=tiL(Bx-40,IX-200,u),by=FGY-62;X.save();X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,240,180,.85)';X.lineWidth=2;X.beginPath();X.moveTo(bx,by);X.lineTo(bx+40,by);X.stroke();X.restore();tiGlow(bx,by,12,'255,230,160',.9)}
  if(t>=528&&t<533){tiGlow(hx+42,FGY-58,50,'255,220,140',1);X.save();X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,240,180,.9)';X.lineWidth=2.5;X.beginPath();X.moveTo(hx+42,FGY-58);X.lineTo(Bx,FGY-60);X.stroke();X.restore()}
  if(t>=531){const u=Math.min(1,(t-531)/60);fmSombrero(tiL(Bx,Bx+90,u),FGY-110-80*Math.sin(Math.PI*u)+u*104,u*5,1)}
  if(t>=372)fmBurst(t,372,14,2,IX+50,FGY-60,{add:1,v:4,L:18,c:'255,255,220',a0:-1.2,sp:2.4});
  /* děda za studnou */const dx=t<700?FN1.WX-60:tiL(FN1.WX-60,FN1.WX+60,tiS(t,700,750));fmMan('cvh',dx,FGY,{act:t<700?'cower':t<750?'walk':t<840?'cheer':'point',st:'pat',lk:t>=700&&t<750?0:999,face:1,t2:t,at:t});
 });
 /* zpomalení: barevný nádech při skoku */if(t>=455&&t<530)fmTint('120,180,255',.1*Math.sin(Math.PI*(t-455)/75));
 fmSubs(t,[[40,150,'VŮDCE BANDITŮ','Tamhle to spadlo! Baron chce to zelené světlo!'],[190,268,'KAKTUS','To světlo nikomu nepatří. Jděte domů.'],[272,350,'VŮDCE BANDITŮ','¡Ja! Mluvící okurka. Chlapi, sbalte ji!'],[548,598,'KAKTUS','Ještě někdo?'],[602,660,'VŮDCE BANDITŮ','E-ehm… ¡MAMÁÁÁ!'],[700,800,'DĚDA CHENCHO','¡Olé! Utíká, jako by mu hořely kalhoty!'],[910,1000,'KAKTUS','Utíkal tak rychle, že ztratil mapu…'],[1010,1100,'KAKTUS','…s Baronovou pečetí.']]);
 fmBlack(1-tiS(t,0,20));fmBlack(tiS(t,1130,1160))},
t=>{if(t==2)TS.drone(19,.22,49);if(t<150&&t%18==0)sfx('step');if(t==40)sfx('vJef');if(t==330)sfx('grunt');if(t==360)TS.whoosh(.3,.5,600,2000);if(t==372){sfx('punch');TS.hit(.6)}if(t==410)sfx('thud');if(t==430)sfx('reload');if(t==441){sfx('gun');TS.rev(1,.4)}if(t==470){sfx('jump');TS.whoosh(.8,.5,300,1600)}if(t==515)sfx('land');if(t==528)sfx('gun');if(t==531){sfx('hit');TS.hit(.5)}if(t==602)sfx('screech');if(t==650)sfx('dash');if(t==690)sfx('break');if(t==700)TS.shimmer(1.5,.5,0,[74,78,81]);if(t==905)sfx('cloth');if(t==1010)TS.braam(.5,38,0,2.5)});

/* ================= ÚVOD 4: Baronova mapa a odchod do úsvitu ================= */
const FN4P=[['Pueblo Seco',-300,150,'x'],['Ponurý přístav',-230,40,'a'],['Moře',-120,-60,'w'],['Bažina',-10,30,'s'],['Starý důl',80,-40,'m'],['Step',150,60,'d'],['Pevnost',230,-30,'f'],['Leviatan',300,-120,'L']];
function fn4Map(t,a){X.save();X.translate(W/2,H/2-26);const s=.84+.04*tiS(t,0,380);X.scale(s,s);X.globalAlpha=a;
 X.fillStyle='#e6cf9a';X.strokeStyle='#5a3a1a';X.lineWidth=3;X.beginPath();X.moveTo(-390,-170);for(let i=0;i<=16;i++)X.lineTo(-390+i*49,-170+(hs(i)-.5)*8);for(let i=0;i<=8;i++)X.lineTo(394+(hs(i+20)-.5)*8,-170+i*44);for(let i=16;i>=0;i--)X.lineTo(-390+i*49,182+(hs(i+40)-.5)*8);X.closePath();X.fill();X.stroke();
 X.fillStyle='rgba(120,80,30,.12)';for(let i=0;i<40;i++)X.fillRect(-380+hs(i)*760,-160+hs(i+9)*330,3+hs(i+3)*8,2);
 X.font='22px '+FONT;X.textAlign='center';X.fillStyle='#4a2a10';X.fillText('MAJETEK BARONA VANE',0,-136);X.font='italic 13px Georgia';X.fillText('trasa šťávy Srdce · přísně tajné',0,-116);
 const k=tiE.io(tiS(t,30,300));X.strokeStyle='#a8262a';X.lineWidth=3;X.setLineDash([9,7]);X.beginPath();const n=FN4P.length-1,tot=k*n;for(let i=0;i<=n;i++){const[,x,y]=FN4P[i];if(i>tot+1)break;if(i==0)X.moveTo(x,y);else{const[,x0,y0]=FN4P[i-1],u=Math.min(1,tot-(i-1));if(u<=0)break;X.lineTo(tiL(x0,x,u),tiL(y0,y,u))}}X.stroke();X.setLineDash([]);
 FN4P.forEach(([nm,x,y,ic],i)=>{const sh=tiS(tot,i-.3,i+.2);if(i&&sh<=0)return;X.globalAlpha=a*(i?sh:1);X.fillStyle=ic=='L'?'#1a0a08':'#5a3a1a';X.beginPath();X.arc(x,y,ic=='L'?11:6,0,7);X.fill();if(ic=='L'){X.fillStyle='#ff4a2a';X.beginPath();X.arc(x-4,y-2,2.2,0,7);X.arc(x+4,y-2,2.2,0,7);X.fill()}if(ic=='x'){X.strokeStyle='#1e6a34';X.lineWidth=3;X.beginPath();X.arc(x,y,12,0,7);X.stroke()}
  X.fillStyle='#3a2410';X.font=(i==0||ic=='L'?'700 ':'')+'italic 14px Georgia';X.fillText(nm,x,y+(i%2?-16:26))});
 X.globalAlpha=a;if(t>300){const pu=.5+.5*Math.sin(t*.2);X.strokeStyle='rgba(168,38,42,'+(.5+.5*pu)+')';X.lineWidth=3;X.beginPath();X.arc(FN4P[1][1],FN4P[1][2],22+pu*4,0,7);X.stroke()}
 /* pečeť */X.fillStyle='#8a1a1e';X.beginPath();X.arc(330,140,24,0,7);X.fill();X.fillStyle='#c84a3a';X.font='700 18px Georgia';X.fillText('V',330,147);X.restore()}
tiDef('s_fi4',1000,(t,d)=>{
 if(t<400){X.fillStyle='#120a06';X.fillRect(0,0,W,H);tiGlow(W/2,H/2,520,'255,180,90',.25);fn4Map(t,Math.min(1,t/20,(400-t)/20));
  fmSubs(t,[[40,190,'DĚDA CHENCHO','Baronovy lodě vozí šťávu Srdce z Ponurého přístavu…'],[196,300,'DĚDA CHENCHO','…přes moře, bažinu a hory až k Leviatanovi.'],[306,396,'KAKTUS','Pak začnu v přístavu. A skončím u toho stroje.']]);return}
 const s=t-400;
 FMC=fmKey(s,[[0,780,FGY-110,1.5],[200,860,FGY-120,1.25],[420,980,FGY-200,1.05],[600,1060,FGY-260,1]]);
 fmTownBack(T,{night:0,sun:tiE.o(tiS(s,0,600)),levi:1});
 fmLay(1,()=>{fmTownNear(T,{night:0});fmWell(FN1.WX,FGY,{bucket:-110});
  const hx=s<60?800:tiL(800,1500,tiS(s,60,560));fmHero(hx,FGY,{vx:s>=60?1.6:0,t:s,face:1});
  fmMan('cvh',FN1.WX-70,FGY,{act:s<60?'listen':s<300?'wave':'watch',st:'pat',lk:999,face:1,t2:s,at:s});
  fmSombrero(FN1.WX-74,FGY-108,0,0)});
 fmTint('255,160,80',.08);
 fmSubs(s,[[10,90,'DĚDA CHENCHO','Vaya con Dios, kaktusi!'],[100,180,'KAKTUS','Udržujte tu studnu čistou. Voda se vrátí.']]);
 X.save();X.setTransform(1,0,0,1,0,0);tiTxt('Kapitola 1 · Ponurý přístav',W/2,H/2+120,s,300,560,{sz:22,c:'#fff1d0',stg:4});X.restore();
 fmBlack(1-tiS(t,400,420));fmBlack(tiS(s,560,600))},
t=>{if(t==2)TS.drone(6,.2,55);if(t==30)TS.shimmer(3,.3,0,[62,66,69]);if(t==300)TS.glint(.9);if(t==400){TS.bloom(4,.5);TS.wind(10,.3,0,500)}if(t>460&&t<960&&t%24==0)sfx('step');if(t==700)TS.shimmer(3,.5,0,[74,78,81,86,90])});
/* úvod hry = nové hrané scény + titul */
STORYB2.splice(0,STORYB2.length,{k:'s_fi1',d:840},{k:'s_fi2',d:900},{k:'s_fi3',d:1160},{k:'s_fi4',d:1000},{k:'title',d:200});

/* ======================= ZÁVĚR HRY ======================= */
function fmTopHat(x,y,a,s){X.save();X.translate(x,y);X.rotate(a);X.scale(s,s);X.fillStyle='#1e1a2a';X.strokeStyle='#06040a';X.lineWidth=1.6;X.beginPath();X.ellipse(0,0,20,5,0,0,7);X.fill();X.stroke();X.fillRect(-12,-30,24,30);X.strokeRect(-12,-30,24,30);X.fillStyle='#c9a040';X.fillRect(-12,-9,24,4);X.fillStyle='#7ae08a';X.fillRect(4,-8,3,3);X.restore()}
function fmHeartHeld(x,y,t,s){const pu=fmBeats(t%90,[0,14]);tiHeart(x,y,s||.16,pu,{t})}
function fmGrass(x0,x1,y,k,seed){if(k<=0)return;X.save();X.lineCap='round';for(let i=0;x0+i*14<x1;i++){const x=x0+i*14+hs(seed+i)*8,h=(8+hs(seed+i*3)*14)*Math.min(1,k*1.4-hs(i)*.4);if(h<=0)continue;X.strokeStyle=i%3?'#4a8a2a':'#6aaa3a';X.lineWidth=2;X.beginPath();X.moveTo(x,y+4);X.quadraticCurveTo(x-3,y-h*.5,x-5+hs(i)*10,y-h);X.stroke();if(hs(seed+i*7)>.82&&k>.7){X.fillStyle=['#ff6fa0','#ffd84a','#ffffff'][i%3];X.beginPath();X.arc(x-5+hs(i)*10,y-h,2.6,0,7);X.fill()}}X.restore()}
function fmGeyser(x,y,h,a,t){if(a<=0||h<=0)return;X.save();X.globalAlpha=a;X.fillStyle=tiLG(0,y-h,0,y,['rgba(200,240,255,.0)','rgba(170,225,255,.85)','rgba(120,200,240,.9)']);X.beginPath();X.moveTo(x-16,y);for(let k=0;k<=10;k++){const yy=y-h*k/10;X.lineTo(x-16-k*1.4+Math.sin(t*.4+k)*3,yy)}for(let k=10;k>=0;k--){const yy=y-h*k/10;X.lineTo(x+16+k*1.4+Math.sin(t*.4+k+2)*3,yy)}X.closePath();X.fill();
 X.fillStyle='rgba(230,248,255,.9)';for(let i=0;i<40;i++){const ph=((t*.02+hs(i))%1),dx=(hs(i+5)-.5)*2*(40+ph*200),dy=-h*(.6+hs(i+9)*.4)+ph*ph*(h+60)*1.4-ph*60;X.beginPath();X.arc(x+dx,y+dy,1.5+hs(i)*2.5,0,7);X.fill()}X.restore();tiGlow(x,y-h*.6,160,'170,230,255',.3*a)}
function fmRain(t,a){if(a<=0)return;X.save();X.setTransform(1,0,0,1,0,0);X.strokeStyle='rgba(200,230,255,'+.5*a+')';X.lineWidth=1.2;for(let i=0;i<90;i++){const x=(hs(i)*W*1.2+t*2)%(W+60)-30,y=(hs(i+50)*H+t*(9+hs(i)*5))%(H+40)-20;X.beginPath();X.moveTo(x,y);X.lineTo(x-3,y+12);X.stroke()}X.restore()}
function fmFirework(x,y,t,t0,col,seed){const age=t-t0;if(age<0||age>90)return;if(age<26){const k=age/26;X.fillStyle='rgba(255,230,180,.9)';X.fillRect(x-1,y+240*(1-k)-2,2,6);return}const a=age-26,L=64;X.save();X.globalCompositeOperation='lighter';for(let i=0;i<34;i++){const an=i/34*6.283+hs(seed+i)*.2,v=2.6+hs(seed+i*3)*1.4,px=x+Math.cos(an)*v*a,py=y+Math.sin(an)*v*a+.03*a*a;X.fillStyle='rgba('+col+','+Math.max(0,1-a/L)+')';X.beginPath();X.arc(px,py,2,0,7);X.fill()}X.restore();tiGlow(x,y,120,col,Math.max(0,.5-a/L))}
function fmLanternString(x0,x1,y,t,a){X.save();X.strokeStyle='rgba(40,30,20,.8)';X.lineWidth=1.4;X.beginPath();X.moveTo(x0,y);X.quadraticCurveTo((x0+x1)/2,y+40,x1,y);X.stroke();const n=Math.floor((x1-x0)/46);for(let i=1;i<n;i++){const u=i/n,x=tiL(x0,x1,u),yy=y+160*u*(1-u)*.5+6;X.fillStyle=['#ff6a5a','#ffd84a','#6ae08a','#6ab0ff'][i%4];X.beginPath();X.ellipse(x,yy,6,8,0,0,7);X.fill();tiGlow(x,yy,22,'255,210,140',.35*a)}X.restore()}

/* ---- ZÁVĚR 1: trosky Leviatana, Kaktus vynáší Srdce ---- */
tiDef('s_fe1',780,(t,d)=>{
 FMC=fmKey(t,[[0,760,FGY-180,1],[260,700,FGY-140,1.2],[420,640,FGY-90,1.9],[560,600,FGY-80,2.2],[561,520,FGY-140,1.1,'cut'],[780,700,FGY-150,1.15]]);
 const ns=t>560;/* druhý záběr: cesta pouští za soumraku */
 if(!ns){fmSky(['#3a2440','#a85a48','#ffb070','#ffd8a0']);fmLay(.15,()=>{fmMesas(FGY-50,['#7a4a3a','#4a2a24'],'rgba(255,200,150,.2)')});
  fmLay(.6,()=>{X.save();X.translate(900,FGY+40);X.rotate(.16);X.scale(.34,.34);X.globalAlpha=.95;X.drawImage(tiLeviImg(),-LVX,-LVY,LVW,LVH);X.restore();fmTint('30,16,20',.0);
   X.save();X.translate(900,FGY+40);X.scale(.34,.34);for(let i=0;i<5;i++)for(let k=0;k<10;k++){const age=(t*1.2+k*28+i*41)%280,u=age/280;tiPuff(-300+i*150+u*u*200,-420-age*1.4,30+age*.8,.55*(1-u),'40,28,30')}
   [[-200,-300],[60,-420],[260,-260]].forEach(([fx,fy],i)=>{const f=.7+.3*Math.sin(t*.4+i*2);tiGlow(fx,fy,120,'255,120,40',.6*f);for(let k=0;k<6;k++){const ph=((t*.05+k/6+i*.3)%1);X.fillStyle='rgba(255,'+(150+k*15)+',60,'+(1-ph)+')';X.beginPath();X.arc(fx+(hs(k+i)-.5)*40,fy-ph*90,10*(1-ph)+3,0,7);X.fill()}});X.restore()});
  fmLay(1,()=>{fmGround('#a8704a','#5a3420',FGY);fmCracks(FGY,.5);
   /* trosky, Baronův klobouk */for(let i=0;i<9;i++){X.save();X.translate(500+i*110+hs(i)*60,FGY+6+hs(i+2)*20);X.rotate((hs(i+4)-.5)*1.4);X.fillStyle=i%2?'#2a2428':'#3a3236';X.strokeStyle='#0a0808';X.lineWidth=2;X.fillRect(-20-hs(i)*20,-10,40+hs(i)*40,12);X.strokeRect(-20-hs(i)*20,-10,40+hs(i)*40,12);X.restore()}
   tiGear(820,FGY-8,26,.4,'#2a2428');fmTopHat(560,FGY+4,-.3,1.4);
   const hx=t<120?1040:tiL(1040,660,tiS(t,120,480));const walk=t>=120&&t<480;
   fmHero(hx,FGY,{vx:walk?-1.2:0,t,face:-1});fmHeartHeld(hx-24,FGY-62+Math.sin(t*.1)*2,t,.13);
   if(t<200)fmDust(hx,FGY,t,0,24,'60,48,44',220)});
  fmTint('255,140,80',.08)}
 else{const s=t-560;fmSky(['#141030','#5a2a48','#d86a48','#ffb070']);fmStars(t,.5,60);
  fmLay(.15,()=>{fmMesas(FGY-50,['#3a2030','#24141e'],'rgba(255,180,140,.15)')});fmLay(.5,()=>fmHills(FGY,'#2a1820',5,26));
  fmLay(1,()=>{fmGround('#5a3828','#2a1810',FGY);const hx=tiL(600,860,s/220);for(let i=0;i<5;i++)tiSaguaro(200+i*260,FGY+4,60+hs(i)*50,1);
   fmHero(hx,FGY,{vx:1.4,t,face:1});fmHeartHeld(hx+22,FGY-62,t,.12)})}
 fmSubs(t,[[150,250,'KAKTUS','Je po všem, Barone. Tvůj stroj už nikoho nevysaje.'],[280,400,'KAKTUS','Vydrž, Srdce. Bije ti to slabě…'],[410,540,'KAKTUS','…ale znám jednu studnu, která na tebe čeká.']]);
 fmCap(t,20,200,'LEVIATAN','to, co z něj zbylo');
 fmBlack(1-tiS(t,0,30));fmWhite(t>=561&&t<575?1-(t-561)/14:0,'0,0,0');fmBlack(tiS(t,750,780))},
t=>{if(t==2){TS.wind(12,.5,0,320);TS.drone(9,.2,49)}if(t>120&&t<480&&t%26==0)sfx('step');if(t%90==0||t%90==14)TS.heart(.35);if(t==150)TS.shimmer(2,.3,0,[62,66,69]);if(t==561){TS.bloom(4,.4);TS.wind(6,.3,0,500)}if(t>561&&t%24==0)sfx('step')});

/* ---- ZÁVĚR 2: Srdce se vrací do studny, poušť ožívá ---- */
const FE2B=[440,470,500,526,548,566,580];
tiDef('s_fe2',1300,(t,d)=>{const WX=FN1.WX;
 FMC=fmKey(t,[[0,860,FGY-120,1.15],[200,820,FGY-110,1.3],[320,WX+30,FGY-80,1.8],[430,WX+10,FGY-70,2.25],[580,WX,FGY-80,2.4],[600,WX,FGY-150,1.2,'o'],[900,WX+60,FGY-180,1.05],[1300,WX+120,FGY-160,1.2]]);
 const rv=tiE.io(tiS(t,580,820));/* oživení 0→1 */const pu=fmBeats(t,FE2B),sh=tiShk(t,[[580,18,18]])+pu*1.5;fmShake(sh);
 /* obloha: suché ráno → svěží den */
 fmSky(rv<1?['#4a3a5a','#c8784a','#f0b070','#f8d8a0']:['#3a8ad0','#7ac0e8','#c8e8f0','#f0f4e0']);if(rv>0){X.save();X.globalAlpha=rv;fmSky(['#3a8ad0','#7ac0e8','#c8e8f0','#f0f4e0']);X.restore()}
 tiGlow(W*.78,110,300,'255,240,200',.5);X.fillStyle='#fff6d8';X.beginPath();X.arc(W*.78,110,34,0,7);X.fill();
 fmLay(.15,()=>{fmMesas(FGY-50,rv>.5?['#b07050','#7a4a34']:['#a0583a','#6a3424'],'rgba(255,220,170,.25)')});
 fmLay(.35,()=>{fmHills(FGY-10,rv>.5?'#5a8a3a':'#8a5a3a',3,40);if(rv>0&&rv<=.5){X.save();X.globalAlpha=rv*2;fmHills(FGY-10,'#5a8a3a',3,40);X.restore()}[[40,70,44],[120,60,38],[190,84,52]].forEach(([x,w,h],i)=>fmHouse(x,FGY-6,w,h,0,i==0));fmChurch(300,FGY-6,.6,0)});
 fmLay(1,()=>{fmGround('#c08a52','#8a5a32',FGY);if(rv>0){X.save();X.globalAlpha=rv;fmGround('#6aa040','#3a6a28',FGY);X.restore()}fmCracks(FGY,.45*(1-rv));
  fmHouse(-60,FGY+4,190,130,0,0);fmHouse(160,FGY+2,150,110,0,1);tiSaguaro(330,FGY+4,120,rv<.5?1:0,rv>.8);tiSaguaro(1620,FGY+2,150,rv<.5?1:0,rv>.8);fmFence(1300,1560,FGY+8);
  fmGrass(-200,1700,FGY+2,rv,3);fmGrass(-180,1700,FGY+30,rv-.15,9);
  fmWell(WX,FGY,{bucket:-110,water:rv>.3});
  /* vesničané */const V=[['cvf',WX-260,1],['cvw',WX-200,1],['cvb',WX-330,1],['cvm',WX+250,-1],['cvf',WX+320,-1]];
  V.forEach(([ty,x,f],i)=>{const act=t<380?(i%2?'watch':'listen'):t<580?(t>380&&t<440?'watch':'listen'):(t<700?'cheer':(i%2?'dance':'cheer'));fmMan(ty,x,FGY,{act,st:'pat',lk:999,face:f,t2:t+i*13,at:t})});
  const ab=t<580?WX-130:WX-130;fmMan('cvh',ab,FGY,{act:t<160?'watch':t<300?'cheer':t<580?'listen':(t<760?'cheer':'dance'),st:'pat',lk:999,face:1,t2:t,at:t});
  /* Kaktus přichází se Srdcem, spouští ho do studny */
  const hx=t<220?tiL(1300,WX+90,tiS(t,0,220)):WX+90;const kneel=t>=440&&t<600;
  fmHero(hx,FGY,{vx:t<220?-1.4:0,t,face:-1,cr:kneel?1:0});
  if(t<340)fmHeartHeld(hx-24,FGY-62,t,.13);else if(t<420){const u=tiE.io(tiS(t,340,420));fmHeartHeld(tiL(hx-24,WX,u),tiL(FGY-62,FGY-40,u)+(u<1?-40*Math.sin(Math.PI*u):0),t,tiL(.13,.08,u))}
  if(t>=420&&t<580){const k=tiS(t,420,440);tiGlow(WX,FGY-40,90+60*pu,'110,255,150',.2+.6*pu);if(k<1)fmHeartHeld(WX,FGY-40+k*30,t,.08*(1-k))}
  /* výbuch života: vlna, gejzír, kapky */
  if(t>=580){const k=t-580;fmRing(WX,FGY,k*12,Math.max(0,1-k/60),'160,255,180',10);fmRing(WX,FGY,k*7,Math.max(0,1-k/50),'255,255,255',5);fmBurst(t,580,40,13,WX,FGY-46,{add:1,v:6,g:.05,r:4,L:70,c:'170,255,190'});
   const gh=t<600?(t-580)*12:t<900?240+Math.sin(t*.2)*8:Math.max(0,240-(t-900)*2.4);fmGeyser(WX,FGY-44,gh,t<1000?1:Math.max(0,1-(t-1000)/80),t)}
  /* klobouky do vzduchu */if(t>=620){[[WX-260,0],[WX-200,1],[WX+250,2],[WX-130,3]].forEach(([x,i])=>{const a=(t-620-i*9);if(a<0)return;const u=Math.min(1,a/80);fmSombrero(x+(i-1.5)*20*u,FGY-110-200*Math.sin(Math.PI*u),a*.2,1)})}});
 fmRain(t-600,t>=600&&t<1000?Math.min(1,(t-600)/40,(1000-t)/60)*.8:0);
 fmWhite(t>=580&&t<610?(1-(t-580)/30)*.8:0,'220,255,230');
 fmSubs(t,[[90,190,'DĚDA CHENCHO','¡Volviste! Kaktus se vrátil!'],[200,300,'DĚDA CHENCHO','A co to neseš… to je… ¿el Corazón?'],[310,420,'KAKTUS','Patří sem. Domů.'],[470,560,'VESNIČAN','…nic se neděje.'],[640,740,'DĚDA CHENCHO','¡AGUA! ¡AGUA! Voda se vrátila!'],[1000,1120,'KAKTUS','Poušť zase dýchá.'],[1130,1290,'DĚDA CHENCHO','Dnes večer bude fiesta, jakou Pueblo Seco nevidělo!']]);
 fmBlack(1-tiS(t,0,24));fmBlack(tiS(t,1270,1300))},
t=>{if(t==2)TS.wind(8,.3,0,420);if(t<220&&t%24==0)sfx('step');if(t==340)TS.shimmer(2,.4,0,[74,78,81]);if(t==420)TS.sub(1.5,.6,40);FE2B.forEach(b=>{if(t==b)TS.heart(.5+(b-440)/250)});if(t==470)TS.riser(2.2,.6);if(t==580){TS.hit(.9);sfx('boom');TS.bloom(5,.7);sfx('splash')}if(t==600)TS.river&&TS.river(6,.4);if(t>600&&t<1000&&t%40==0)sfx('splash');if(t==640)sfx('win');if(t==700)TS.shimmer(4,.6,0,[74,78,81,86,90,93])});

/* ---- ZÁVĚR 3: fiesta a jedna malá záhada ---- */
tiDef('s_fe3',1100,(t,d)=>{const WX=FN1.WX;
 const tz=t>=820;/* závěrečný záběr: poušť a klobouk */
 if(!tz){FMC=fmKey(t,[[0,WX-60,FGY-130,1.25],[260,WX-40,FGY-100,1.6],[520,WX-90,FGY-80,2.1],[640,WX-60,FGY-200,1.3],[820,WX-60,FGY-300,1.1]]);
  fmSky(['#060a20','#141838','#2a2448','#3a2a48']);fmStars(t,1);fmMoon(170,92,24,1);
  [[180,100,'255,200,120',0],[520,70,'160,255,170',1],[760,120,'255,140,180',2],[340,60,'200,220,255',3],[640,90,'255,230,140',4]].forEach(([x,y,c,i])=>{for(let r=0;r<4;r++)fmFirework(x+(r%2)*60-30,y+r*20,t,40+i*70+r*190,c,i*9+r)});
  fmLay(.15,()=>{fmMesas(FGY-50,['#1e2030','#141422'],'rgba(140,150,200,.12)')});
  fmLay(.35,()=>{fmHills(FGY-10,'#1a2a1a',3,40);[[40,70,44],[120,60,38],[190,84,52]].forEach(([x,w,h],i)=>fmHouse(x,FGY-6,w,h,.8,i==0));fmChurch(300,FGY-6,.6,1)});
  fmLay(1,()=>{fmGround('#2a3a20','#141c10',FGY);fmGrass(-200,1700,FGY+2,1,3);fmHouse(-60,FGY+4,190,130,1,0);fmHouse(160,FGY+2,150,110,1,1);tiSaguaro(330,FGY+4,120,0,1);
   fmLanternString(-40,WX-150,FGY-150,t,1);fmLanternString(WX+60,WX+560,FGY-150,t,1);fmWell(WX,FGY,{bucket:-110,water:1});
   /* ohniště */const fx=WX+250;X.fillStyle='#2a1a10';X.fillRect(fx-26,FGY-6,52,8);for(let k=0;k<12;k++){const ph=((t*.04+k/12)%1);X.fillStyle='rgba(255,'+(140+k*8)+',50,'+(1-ph)+')';X.beginPath();X.arc(fx+(hs(k)-.5)*30,FGY-8-ph*60,12*(1-ph)+3,0,7);X.fill()}tiGlow(fx,FGY-30,180,'255,150,60',.5+.1*Math.sin(t*.3));
   const D=[['cvh',WX-330,'guitar',1],['cvf',WX-250,'dance',1],['cvw',WX-200,'dance',-1],['cvb',WX+180,'dance',1],['cvm',WX+330,'dance',-1],['cvf',WX+390,'cheer',-1]];D.forEach(([ty,x,a,f],i)=>fmMan(ty,x+Math.sin(t*.03+i)*(a=='dance'?14:0),FGY,{act:a,st:'pat',lk:999,face:f,t2:t+i*17,at:t}));
   /* Kaktus a děda u studny */fmHero(WX+70,FGY,{t,face:-1});fmMan('cvh',WX-80,FGY,{act:t<400?'listen':'laugh',st:'pat',lk:999,face:1,t2:t,at:t})});
  fmTint('40,20,60',.08)}
 else{const s=t-820;FMC=fmKey(s,[[0,640,FGY-120,1.2],[280,700,FGY-80,1.9]]);
  fmSky(['#05060e','#10142a','#2a1e34']);fmStars(t,.9);
  fmLay(.2,()=>fmHills(FGY-30,'#120e18',7,50));
  fmLay(1,()=>{fmGround('#2a2018','#100c08',FGY);bpTumble(tiL(200,620,tiS(s,0,160)),FGY-20-Math.abs(Math.sin(s*.15))*16,20,s*.2);
   const hk=tiS(s,170,200);fmTopHat(700,FGY+2-hk*30,-.2+hk*.2,1.6);if(s>200){/* zelené oko pod kloboukem */const a=tiS(s,200,220)*(s<260?1:Math.max(0,1-(s-260)/10));tiGlow(706,FGY-20,30,'110,255,150',a);X.fillStyle='rgba(180,255,190,'+a+')';X.beginPath();X.ellipse(706,FGY-20,4,2.4,0,0,7);X.fill()}});
  X.save();X.setTransform(1,0,0,1,0,0);tiTxt('KONEC…?',W/2,H/2-40,s,190,280,{sz:54,rye:1,it:0,c:'#e9c77a',stg:0});X.restore()}
 fmSubs(t,[[120,220,'DĚDA CHENCHO','Hijo… zůstaneš u nás?'],[230,340,'KAKTUS','Dokud bude Srdce bít.'],[350,450,'DĚDA CHENCHO','Pak tu budeš navždy. ¡Salud!'],[520,620,'KAKTUS','Ať to tak zůstane.']]);
 fmBlack(1-tiS(t,0,30));fmBlack(t>=800&&t<840?1-Math.abs(t-820)/20:0);fmBlack(tiS(t,1080,1100))},
t=>{if(t==2){TS.drone(13,.15,55);TS.shimmer(6,.4,0,[62,66,69,74])}[40,110,180,250,320].forEach((b,i)=>{for(let r=0;r<4;r++){const tt=b+r*190;if(t==tt)TS.whoosh(.6,.4,400,2600);if(t==tt+26){sfx('boom');TS.crack(.5,0,12);TS.glint(.6)}}});if(t%60==0&&t<800)TS.shimmer(1,.25,0,[[74,78,81],[76,79,83],[74,77,81]][(t/60|0)%3]);if(t==820)TS.wind(10,.4,0,300);if(t==1010)TS.braam(.6,36,0,3)});
EPIB.splice(0,EPIB.length,{k:'s_fe1',d:780},{k:'s_fe2',d:1300},{k:'s_fe3',d:1100},{k:'s_e5',d:560});
