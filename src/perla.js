/* =====================================================================
   v89: 2. DÍL – OTEVŘENÉ MOŘE PODRUHÉ
   Kapitán Calavera (kloubová loutka podle předlohy: šavle, hák,
   dřevěná noha, papoušek Chili) a jeho černá loď La Viuda Negra.
   Žádné vlny: z boku lodi se spouštějí čluny, připlouvají k nám,
   piráti šplhají přes zábradlí; loď mezitím pálí z děl.
   ===================================================================== */
const PKJ=PKA.j,PKI={},PK={ok:0,K:.25,fl:0,red:0};
(function(){const ks=Object.keys(PKA.p);let n=ks.length;ks.forEach(k=>{const im=new Image();im.onload=()=>{PKI[k]=im;if(--n==0)pkPrep()};im.onerror=()=>{if(--n==0)pkPrep()};im.src=PKA.p[k].u})})();
function pkPrep(){try{for(const k of Object.keys(PKA.p)){const im=PKI[k];if(!im)continue;PKI[k+'@w']=pr3Var(im,'rgba(255,255,255,.8)','source-atop');PKI[k+'@r']=pr3Var(im,'rgba(255,40,20,.45)','source-atop')}}catch(e){}PK.ok=1}
const pkC=(v,a,b)=>v<a?a:v>b?b:v,pkL=(a,b,u)=>a+(b-a)*u;
const pkE={io:u=>u<.5?2*u*u:1-2*(1-u)*(1-u),o:u=>1-(1-u)*(1-u),o3:u=>1-Math.pow(1-u,3),i:u=>u*u,l:u=>u,
 ob:u=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(u-1,3)+c1*Math.pow(u-1,2)}};
/* klíčové snímky: K=[[f,{...}],...] → interpolovaný objekt */
function pkKey(f,K){if(f<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){if(f<=K[i][0]){const a=K[i-1],b=K[i],u=pkC((f-a[0])/Math.max(1e-6,b[0]-a[0]),0,1),e=(b[2]||pkE.io)(u),o={};for(const k in b[1])o[k]=pkL(a[1][k]!=null?a[1][k]:0,b[1][k],e);for(const k in a[1])if(!(k in o))o[k]=a[1][k];return o}}return K[K.length-1][1]}
function pkP(k,al){const d=PKA.p['pk_'+k],im=PKI['pk_'+k];if(!d||!im)return;const g=X.globalAlpha;if(al!=null)X.globalAlpha=g*al;X.drawImage(im,d.ox,d.oy,d.w,d.h);
 if(PK.fl>.02&&PKI['pk_'+k+'@w']){X.globalAlpha=g*(al==null?1:al)*Math.min(1,PK.fl);X.drawImage(PKI['pk_'+k+'@w'],d.ox,d.oy,d.w,d.h)}
 if(PK.red>.02&&PKI['pk_'+k+'@r']){X.globalAlpha=g*(al==null?1:al)*Math.min(1,PK.red);X.drawImage(PKI['pk_'+k+'@r'],d.ox,d.oy,d.w,d.h)}X.globalAlpha=g}
function pkR(pt,a,fn){if(!a){fn();return}X.save();X.translate(pt[0],pt[1]);X.rotate(a);X.translate(-pt[0],-pt[1]);fn();X.restore()}
/* ruka bez šavle (šavle odletěla) */
function pkHand(){const d=PKA.p.pk_sab,im=PKI.pk_sab;if(!d||!im)return;X.save();X.beginPath();X.rect(d.ox,318,d.w,d.h);X.clip();X.drawImage(im,d.ox,d.oy,d.w,d.h);X.restore()}
/* ústa: tmavá dutina a spodní zuby posunuté dolů */
function pkMouth(o){if(!(o>.03))return;const d=PKA.p.pk_head,im=PKI.pk_head;if(!d||!im)return;const k=im.width/d.w,dy=o*16;X.save();X.fillStyle='#2a0806';X.beginPath();X.ellipse(562,302+dy*.5,36,4+dy*.75,0,0,7);X.fill();
 const sy=303,sh=11;X.drawImage(im,(527-d.ox)*k,(sy-d.oy)*k,72*k,sh*k,527,sy+dy,72,sh);X.restore()}
function pkEye(bl,ang){X.save();if(bl>.03){X.fillStyle='#c98a5e';X.strokeStyle='#1e1a12';X.lineWidth=3;X.beginPath();X.ellipse(600,197,15,13*Math.min(1,bl),0,Math.PI,0);X.lineTo(615,197);X.fill();if(bl>.6){X.beginPath();X.moveTo(585,197+13*(bl-1));X.lineTo(615,197+13*(bl-1));X.stroke()}}
 if(ang){X.fillStyle='rgba(255,40,20,'+(.5*ang)+')';X.beginPath();X.arc(600,197,9,0,7);X.fill()}X.restore()}
/* ---------- póza ---------- */
function pkP0(){return{bx:0,by:0,tr:0,hr:0,hat:0,hatX:0,hatY:0,b1:0,b2:0,f1:0,f2:0,f3:0,pa:0,ta:0,ka:0,sk:0,pr:0,px:0,py:0,mo:0,bl:0,ang:0,par:1,sab:1,hatOn:1,stars:0,trail:0}}
const PKB={};/* pózy podle stavu: fn(f,e,P) – f = uplynulé snímky stavu */
function pkWalk(P,ph,amp){const s=Math.sin(ph),c=Math.cos(ph);P.ta=-s*.38*amp;P.ka=Math.max(0,Math.sin(ph+.9))*.55*amp;P.pa=s*.32*amp;P.by=(-Math.abs(c)*12+(s>0?6:0))*amp;P.tr+=s*.035*amp;P.b1=s*.16*amp;P.f1+=-s*.07*amp;P.sk=Math.sin(ph+1)*.08*amp;P.pr=Math.sin(ph*2)*.07*amp;P.py=-Math.abs(Math.sin(ph))*7*amp;P.hr+=c*.02*amp}
function pkPose(e){const P=pkP0(),t=(e.t2||T)+(e.id7||0),B=e.bst;if(e._pb!==B){e._pb=B;e._pt0=T}const f=e.bfx!=null?e.bfx:T-e._pt0;
 if(e._lt!==T){const v=e._lx==null?0:e.x-e._lx;e._lx=e.x;e._lt=T;if(Math.abs(v)>40)e.pkMv=0;else{e.pkMv=(e.pkMv||0)*.8+Math.abs(v)*.2;e.pkPh=(e.pkPh||0)+v*(e.face||1)*.055}}
 const br=Math.sin(t*.05);P.by=br*3;P.hr=Math.sin(t*.021)*.025;P.f3=Math.sin(t*.034)*.04;P.b1=br*.02;P.pr=Math.sin(t*.07)*.05;P.py=Math.sin(t*.11)*1.5;P.sk=br*.02;
 const bc=(t+(e.id7||0)*13)%240;if(bc<7)P.bl=Math.sin(bc/7*Math.PI);
 const fn=PKB[B];if(fn)fn(f,e,P);else if(B=='walk'||B=='idle'||!B)PKB.idle(f,e,P);
 if(e.pkMv>.25&&!['lunge','leap','air','pegstuck','stuck','rage','boat','climb','tied','dead','dazed'].includes(B))pkWalk(P,e.pkPh||0,Math.min(1,e.pkMv/1.6));
 if(e.hs>0){P.tr-=.06;P.hr-=.12;P.bl=Math.max(P.bl,.6);P.mo=Math.max(P.mo,.35)}
 if(e.lost&&e.lost.w)P.sab=0;if(e.lost&&e.lost.hat)P.hatOn=0;if(e.lost&&e.lost.par)P.par=0;if(e.parOff)P.par=0;
 return P}
PKB.idle=(f,e,P)=>{const t=(e.t2||T)+(e.id7||0),c=t%420;
 if(c>=60&&c<130){const v=(c-60)/70,s=Math.sin(v*Math.PI);P.f3+=Math.sin(v*Math.PI*4)*.5*s;P.f2-=.15*s;P.hr+=.05*s}/* švihne šavlí */
 else if(c>=200&&c<250){const v=(c-200)/50;P.mo=Math.max(0,Math.sin(v*Math.PI*3))*.5;P.hr-=Math.sin(v*Math.PI)*.08;P.pr+=Math.sin(v*Math.PI*6)*.15}/* smích */
 else if(c>=300&&c<350){const v=(c-300)/50;P.pa=-Math.max(0,Math.sin(v*Math.PI*3))*.12}/* ťuká dřevěnou nohou */};
PKB.walk=PKB.idle;
PKB.slash=(f,e,P)=>{Object.assign(P,pkKey(f,[[0,{f1:0,f2:0,f3:0,tr:0,bx:0,hr:0,mo:0}],[13,{f1:-1.3,f2:.2,f3:-.3,tr:-.08,bx:-10,hr:-.06,mo:.3}],[19,{f1:-.45,f2:1.85,f3:.65,tr:.1,bx:40,hr:.06,mo:.7},pkE.o3],[29,{f1:-.4,f2:1.8,f3:.6,tr:.08,bx:36,hr:.04,mo:.3}],
 [36,{f1:-.2,f2:1.95,f3:.9,tr:.06,bx:30,hr:.03,mo:.2}],[42,{f1:-1.05,f2:.95,f3:.45,tr:-.04,bx:60,hr:-.08,mo:.8},pkE.o3],[50,{f1:-1,f2:.9,f3:.4,tr:-.03,bx:56,hr:-.06,mo:.4}],[64,{f1:0,f2:0,f3:0,tr:0,bx:0,hr:0,mo:0}]]));
 P.trail=(f>=15&&f<=21)?1:(f>=38&&f<=44)?2:0;P.armBack=f>=4&&f<16?1:0;P.ta=-.18*Math.min(1,f/14);P.pa=.12*Math.min(1,f/14)};
PKB.lunge=(f,e,P)=>{Object.assign(P,pkKey(f,[[0,{f1:0,f2:0,f3:0,tr:0,by:0,ta:0,pa:0,ka:0,hr:0}],[18,{f1:.3,f2:.72,f3:.22,tr:-.16,by:34,ta:.25,pa:-.35,ka:.6,hr:-.05}],[33,{f1:.33,f2:.74,f3:.22,tr:-.18,by:38,ta:.28,pa:-.38,ka:.65,hr:-.06}],
 [38,{f1:-.85,f2:1.85,f3:.24,tr:.2,by:10,ta:-.55,pa:.45,ka:.1,hr:.08},pkE.o3],[54,{f1:-.82,f2:1.82,f3:.24,tr:.18,by:12,ta:-.5,pa:.42,ka:.12,hr:.06}],[72,{f1:0,f2:0,f3:0,tr:0,by:0,ta:0,pa:0,ka:0,hr:0}]]));
 if(f<34){P.f3+=Math.sin(f*.9)*.05;P.ang=.6}P.trail=f>=35&&f<=54?3:0;P.mo=f>34&&f<54?.8:.2};
PKB.hook=(f,e,P)=>{Object.assign(P,pkKey(f,[[0,{b1:0,b2:0,tr:0,hr:0,f1:0}],[18,{b1:.45,b2:.5,tr:-.08,hr:-.04,f1:-.2}],[25,{b1:-1.2,b2:.25,tr:.12,hr:.06,f1:.15},pkE.o3],[36,{b1:-1.1,b2:.2,tr:.1,hr:.05,f1:.1}],[58,{b1:0,b2:0,tr:0,hr:0,f1:0}]]));P.mo=f>18&&f<36?.6:0;P.trail=f>=20&&f<=27?4:0;P.bFront=f>=19&&f<44?1:0};
PKB.pull=(f,e,P)=>{Object.assign(P,pkKey(f,[[0,{b1:-1.1,b2:.2,tr:.1}],[16,{b1:.2,b2:.4,tr:-.12},pkE.o],[30,{b1:0,b2:0,tr:0}]]));P.mo=.5};
PKB.leapc=(f,e,P)=>{const u=Math.min(1,f/22);P.by=40*u;P.tr=-.1*u;P.f1=-1.3*u;P.f2=.2*u;P.f3=-.3*u;P.b1=.4*u;P.armBack=u>.4?1:0;P.ta=.3*u;P.ka=.7*u;P.pa=-.3*u;P.mo=.5*u};
PKB.air=(f,e,P)=>{const vz=e.vz||0;const k=vz>0?0:pkC(-vz/8,0,1);P.f1=pkL(-1.3,-.45,k);P.f2=pkL(.2,1.85,k);P.f3=pkL(-.3,.6,k);P.armBack=k<.4?1:0;P.b1=-.6;P.b2=-.4;P.ta=-.6;P.ka=1.1;P.pa=-.5;P.tr=vz>0?-.05:.12;P.mo=.9;P.sk=-.25;P.trail=vz<0?5:0;P.py=-10};
PKB.land=(f,e,P)=>{const u=pkC(1-f/26,0,1);P.f1=-.45*u;P.f2=1.85*u;P.f3=.6*u;P.by=36*u;P.tr=.16*u;P.ta=.35*u;P.ka=.7*u;P.pa=-.2*u;P.mo=.5*u};
PKB.pegstuck=(f,e,P)=>{const w=Math.sin(f*.35);P.by=26;P.tr=-.14+w*.06;P.pa=.05;P.ta=-.35+w*.1;P.ka=.4;P.b1=-.9+w*.4;P.b2=-.6;P.f1=-.7-w*.3;P.f2=-.2;P.f3=.1;P.hr=.12+w*.05;P.mo=.6+.3*Math.abs(w);P.ang=.4;P.bl=.25;P.sk=w*.1};
PKB.stuck=(f,e,P)=>{const w=Math.sin(f*.4);P.f1=-.85;P.f2=1.85;P.f3=.24;P.tr=-.2+w*.05;P.bx=-12+w*6;P.ta=.3;P.pa=-.35;P.ka=.3;P.b1=-.4+w*.3;P.b2=-.3;P.hr=-.1;P.mo=.7;P.ang=.5};
PKB.signal=(f,e,P)=>{const u=Math.min(1,f/12);P.f1=-1.94*u;P.f2=1.28*u;P.f3=.33*u+Math.sin(f*.5)*.06*u;P.tr=-.08*u;P.hr=-.18*u;P.mo=f>14&&f<44?.9:.2;P.b1=-.3*u;P.pr+=Math.sin(f*.6)*.25*u};
PKB.point=(f,e,P)=>{const u=Math.min(1,f/10);P.f1=-.5*u;P.f2=1.5*u;P.f3=.24*u;P.hr=-.04*u;P.mo=f>8&&f<30?.7:.2;P.tr=.04*u};
PKB.parrot=(f,e,P)=>{PKB.point(f,e,P);P.b1=-.5*Math.min(1,f/10);P.b2=-.6*Math.min(1,f/10)};
PKB.whistle=(f,e,P)=>{const u=Math.min(1,f/10);P.b1=-2.1*u;P.b2=-1.6*u;P.hr=-.05*u;P.mo=f>10&&f<40?.5:0;P.tr=-.04*u};
PKB.dazed=(f,e,P)=>{const w=Math.sin(f*.2);P.tr=w*.08;P.hr=w*.15+.1;P.by=14;P.f1=.2;P.f2=1.84;P.f3=.76;P.b1=.15;P.mo=.5;P.bl=.7;P.stars=1;P.ka=.25;P.ta=.1};
PKB.tired=(f,e,P)=>{const t=(e.t2||T),w=Math.sin(t*.12);P.by=24+w*3;P.tr=.12;P.hr=.2+w*.03;P.f1=.2;P.f2=1.84;P.f3=.76;P.b1=.12;P.b2=.2;P.mo=.35+.25*Math.abs(w);P.bl=.5;P.ka=.25;P.ta=.08;P.sk=.04};
PKB.hurt=(f,e,P)=>{P.tr=-.1;P.hr=-.18;P.mo=.6;P.bl=.8};
PKB.rage=(f,e,P)=>{const u=Math.min(1,f/18),w=Math.sin(f*.7);P.b1=-.9*u;P.b2=.2*u;P.f1=-1.94*u;P.f2=1.28*u;P.f3=.33*u+w*.08;P.hr=-.3*u;P.mo=.95;P.tr=-.12*u;P.by=6*u;P.ang=1;P.pr=w*.3;P.py=-8*u+Math.abs(w)*-6};
PKB.laugh=(f,e,P)=>{const w=Math.sin(f*.55);P.hr=-.22+w*.05;P.mo=.5+.45*Math.abs(w);P.by=Math.abs(w)*5;P.b1=.1;P.f3+=w*.1;P.bl=.6};
PKB.boat=(f,e,P)=>{const t=(e.t2||T);P.ta=-.75;P.ka=.85;P.pa=.12;P.by=6;P.tr=.06;P.f1=-.5;P.f2=1.5;P.f3=.24+Math.sin(t*.06)*.05;P.b1=.15;P.b2=-.2;P.hr=-.03;P.mo=0};
PKB.climb=(f,e,P)=>{const w=Math.sin(f*.25);P.b1=-2.6;P.b2=-.3;P.bFront=1;P.f1=.2+w*.1;P.f2=1.6;P.f3=.7;P.ta=.15+w*.15;P.ka=.5;P.pa=-.1-w*.15;P.tr=-.04;P.hr=-.12;P.by=-10;P.mo=.3};
PKB.vault=(f,e,P)=>{P.f1=-1.3;P.f2=.2;P.f3=-.3;P.armBack=1;P.b1=-.9;P.b2=.1;P.ta=-.7;P.ka=1;P.pa=-.6;P.tr=.08;P.mo=.9;P.sk=-.3};
PKB.tied=(f,e,P)=>{const t=(e.t2||T),w=Math.sin(t*.08);P.b1=.05;P.b2=.15;P.f1=.2;P.f2=1.84;P.f3=.76;P.hr=.12+w*.04;P.mo=.15;P.bl=.4;P.by=8};
/* staré názvy stavů ze scén a závěru */
PKB.cannon=PKB.signal;PKB.parrots=PKB.parrot;PKB.barrage=PKB.signal;PKB.dash=PKB.lunge;PKB.volley=PKB.signal;PKB.leap=PKB.leapc;
/* ---------- vykreslení ---------- */
const PKO=['peg','thF','boot','torso','skirt','armB1','armB2','head','hat','armF1','armF2','sab','parrot'];
function pkDrawAt(sx,sy,face,s,P,e){const J=PKJ;X.save();X.translate(sx,sy);X.scale(face*s,s);X.translate(-480,-1000);X.lineJoin='round';
 pkR(J.hipB,P.pa,()=>pkP('peg'));
 pkR(J.hipF,P.ta,()=>{pkP('thF');pkR(J.knF,P.ka,()=>pkP('boot'))});
 X.save();X.translate(P.bx,P.by);pkR(J.pel,P.tr,()=>{
  pkP('torso');pkR(J.skP,P.sk,()=>pkP('skirt'));
  const armB=()=>pkR(J.shB,P.b1,()=>{pkP('armB1');pkR(J.elB,P.b2,()=>pkP('armB2'))});
  const armF=()=>pkR(J.shF,P.f1,()=>{pkP('armF1');pkR(J.elF,P.f2,()=>{pkP('armF2');pkR(J.wrF,P.f3,()=>{if(P.sab)pkP('sab');else pkHand()})})});
  if(!P.bFront)armB();if(P.armBack)armF();
  pkR(J.neck,P.hr,()=>{pkP('head');pkMouth(P.mo);pkEye(P.bl,P.ang);
   if(P.hatOn){X.save();X.translate(P.hatX,P.hatY);pkR(J.hatP,P.hat,()=>pkP('hat'));X.restore()}
   if(P.stars){for(let i=0;i<4;i++){const a=(e?(e.t2||T):T)*.12+i*1.57;X.fillStyle=i%2?'#ffe27a':'#fff';X.save();X.translate(540+Math.cos(a)*110,90+Math.sin(a)*26);X.rotate(a);X.beginPath();for(let k=0;k<10;k++){const r=k%2?6:15;X.lineTo(Math.cos(k*Math.PI/5)*r,Math.sin(k*Math.PI/5)*r)}X.closePath();X.fill();X.restore()}}});
  if(!P.armBack)armF();if(P.bFront)armB();
  if(P.par){X.save();X.translate(P.px,P.py);pkR(J.parP,P.pr,()=>pkP('parrot'));X.restore()}
 });X.restore();X.restore()}
/* pozice bodu šavle/háku ve světě (pro zásahy a stopy) */
function pkWorld(e,P,pt,chain){const J=PKJ,s=PK.K*(e.pks||1);let x=pt[0],y=pt[1];const rot=(c,a)=>{if(!a)return;const dx=x-c[0],dy=y-c[1],co=Math.cos(a),si=Math.sin(a);x=c[0]+dx*co-dy*si;y=c[1]+dx*si+dy*co};
 if(chain=='F'){rot(J.wrF,P.f3);rot(J.elF,P.f2);rot(J.shF,P.f1)}else if(chain=='B'){rot(J.elB,P.b2);rot(J.shB,P.b1)}rot(J.pel,P.tr);x+=P.bx;y+=P.by;
 return{x:e.x+e.face*(x-480)*s,z:e.z+(1000-y)*s}}
function pkTrail(e,P){if(!P.trail)return;const k=e.pkTr||(e.pkTr=[]);const a=pkWorld(e,P,P.trail==4?PKJ.hookT:PKJ.sabT,P.trail==4?'B':'F'),b=pkWorld(e,P,P.trail==4?PKJ.wrB:PKJ.grip,P.trail==4?'B':'F');k.push({a,b,t:T});}
function pkTrailDraw(e){const k=e.pkTr;if(!k||!k.length)return;while(k.length&&T-k[0].t>8)k.shift();if(k.length<2)return;X.save();X.globalCompositeOperation='lighter';
 for(let i=1;i<k.length;i++){const A=k[i-1],B=k[i],al=(1-(T-B.t)/8)*.75;X.fillStyle='rgba(230,240,255,'+al+')';X.beginPath();X.moveTo(A.a.x-cam,LY-A.a.z);X.lineTo(B.a.x-cam,LY-B.a.z);X.lineTo(B.b.x-cam,LY-B.b.z);X.lineTo(A.b.x-cam,LY-A.b.z);X.closePath();X.fill()}X.restore()}
function pkDraw(e,o){o=o||{};if(!PK.ok)return;if(e.st=='dead'&&e.dt>140)return;const s=PK.K*(e.pks||1),gf=e.gf==null?e.z:e.gf,sx=e.x-cam,sy=LY-e.z;
 if(!o.noShd)shd(sx,LY-gf,52*s*4,10*s*4,.3);
 const P=pkPose(e);if(e.st=='dead'){P.tr=.2;P.hr=.25;P.by=30;P.bl=1;P.mo=.6}
 PK.fl=e.hs>0?Math.min(1,e.hs/5)*.7:0;PK.red=(e.vul>0&&T%16<8)?.35:(e.enr||e.ph2d)&&e.st!='dead'?.12+.06*Math.sin(T*.2):0;
 try{pkDrawAt(sx,sy,e.face||1,s,P,e)}finally{PK.fl=0;PK.red=0}
 if(e.st!='dead'&&!o.noTrail){pkTrail(e,P);pkTrailDraw(e)}}
BOSSDRAW.adm=function(e){pkDraw(e)};

/* =====================================================================
   LA VIUDA NEGRA – černá loď (černý trup, potrhané černé plachty)
   kreslí se do vyrovnávací plochy; místní souřadnice: (0,0) = čára ponoru
   uprostřed, příď vpravo
   ===================================================================== */
const PNS={cv:null,g:null,lt:-9,W:860,H:640,ox:430,oy:580,s:.7,ports:[-232,-168,-104,-40,24,88,152],fl:[0,0,0,0,0,0,0],dav:[-96,96],hang:[1,1],hit:0};
function pnRag(g,x0,y0,x1,y1,n,amp,seed){/* potrhaný okraj */g.lineTo(x0,y0);for(let i=1;i<=n;i++){const u=i/n,x=pkL(x0,x1,u),y=pkL(y0,y1,u);const r=hs(seed+i*3.7);g.lineTo(x,y+(i%2?amp*(.4+r):-amp*.2*r))}}
function pnSail(g,x,yt,hw,sh,i,t,torn){const bl=Math.sin(t*.028+i*1.3),bel=hw*.16*(1+.25*bl),yb=yt+sh;g.save();
 const P=new Path2D();P.moveTo(x-hw,yt);P.quadraticCurveTo(x,yt-6,x+hw,yt);P.quadraticCurveTo(x+hw+bel,yt+sh*.5,x+hw*.92,yb);
 const n=9;for(let k=1;k<=n;k++){const u=k/n,xx=pkL(x+hw*.92,x-hw*.92,u),r=hs(i*11+k*2.3),yy=yb+(k%2?sh*.08*(.5+r):-sh*.05*r)+Math.sin(u*Math.PI)*bel*.5;P.lineTo(xx,yy)}
 P.quadraticCurveTo(x-hw-bel*.6,yt+sh*.5,x-hw,yt);P.closePath();
 const G=g.createLinearGradient(x-hw,yt,x+hw,yb);G.addColorStop(0,'#2a2626');G.addColorStop(.45,'#3e3836');G.addColorStop(.7,'#24201f');G.addColorStop(1,'#141212');g.fillStyle=G;g.fill(P);
 g.save();g.clip(P);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.4;for(let k=-hw+18;k<hw;k+=26){g.beginPath();g.moveTo(x+k,yt+2);g.quadraticCurveTo(x+k+bel*.4,yt+sh*.5,x+k*.95,yb+4);g.stroke()}
 g.fillStyle='rgba(255,255,255,.06)';g.beginPath();g.ellipse(x+hw*.2+bel*.3,yt+sh*.42,hw*.45,sh*.3,-.2,0,7);g.fill();
 if(torn){g.fillStyle='rgba(150,180,205,.85)';for(let k=0;k<3;k++){const hx=x+(hs(i*7+k)-.5)*hw*1.3,hy=yt+sh*(.25+hs(i*5+k*3)*.5),r=5+hs(i+k*9)*9;g.beginPath();for(let a=0;a<7;a++){const rr=r*(.6+hs(i+k+a)*.7);g.lineTo(hx+Math.cos(a*.9)*rr,hy+Math.sin(a*.9)*rr*.8)}g.closePath();g.fill()}}g.restore();
 g.strokeStyle='#0a0808';g.lineWidth=2;g.stroke(P);g.restore()}
function pnShipPaint(t){const g=PNS.g,o=PNS;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,o.W,o.H);g.save();g.translate(o.ox,o.oy);g.lineJoin='round';g.lineCap='round';
 const X0=X;X=g;try{
 /* stěžně a lanoví (za plachtami) */
 const M=[[-190,-470],[10,-540],[205,-430]];
 g.strokeStyle='rgba(30,26,24,.85)';g.lineWidth=1.2;M.forEach(([mx,mh])=>{for(let k=-1;k<=1;k+=2){for(let j=0;j<5;j++){g.beginPath();g.moveTo(mx,-112+mh*.92);g.lineTo(mx+k*(36+j*16),-108);g.stroke()}}});
 g.beginPath();g.moveTo(205,-430+30);g.lineTo(330,-120);g.moveTo(10,-540+20);g.lineTo(205,-430+20);g.moveTo(-190,-470+20);g.lineTo(10,-540+20);g.moveTo(-190,-470+40);g.lineTo(-300,-150);g.stroke();
 M.forEach(([mx,mh],i)=>{const G=g.createLinearGradient(mx-7,0,mx+7,0);G.addColorStop(0,'#1a1412');G.addColorStop(.5,'#4a3a30');G.addColorStop(1,'#120e0c');g.fillStyle=G;g.fillRect(mx-6,mh,12,-mh-100);g.strokeStyle='#060505';g.lineWidth=1.5;g.strokeRect(mx-6,mh,12,-mh-100);
  g.fillStyle='#231c18';g.fillRect(mx-22,mh+70,44,9);g.strokeRect(mx-22,mh+70,44,9)});
 /* plachty */
 const S=[[-190,[[-430,92,92],[-325,112,108],[-205,124,92]]],[10,[[-505,104,98],[-395,128,124],[-258,140,112]]],[205,[[-400,86,88],[-300,104,100],[-190,112,82]]]];
 S.forEach(([mx,L],mi)=>L.forEach(([yt,hw,sh],k)=>{g.fillStyle='#1a1412';g.fillRect(mx-hw-10,yt-4,hw*2+20,6);pnSail(g,mx,yt,hw,sh,mi*4+k,t,(mi+k)%2==0)}));
 /* kosatky */for(let k=0;k<2;k++){const b=Math.sin(t*.04+k)*5;g.beginPath();g.moveTo(222+k*30,-400+k*60);g.quadraticCurveTo(290+k*40+b,-260+k*40,330+k*30,-140+k*10);pnRag(g,330+k*30,-140+k*10,236+k*24,-150+k*14,5,7,k*5);g.closePath();g.fillStyle='#2c2725';g.fill();g.strokeStyle='#0a0808';g.lineWidth=1.5;g.stroke()}
 /* vlajka s lebkou */const fw=k=>Math.sin(t*.13+k)*5;g.save();g.translate(10,-548);g.fillStyle='#0e0c0c';g.beginPath();g.moveTo(0,0);for(let i=0;i<=10;i++)g.lineTo(-i*8,fw(i*.7)*(i/10)+i*.3);for(let i=10;i>=0;i--)g.lineTo(-i*8,48+fw(i*.7)*(i/10)+i*.2);g.closePath();g.fill();
  g.fillStyle='#e8e2d4';g.beginPath();g.arc(-40,18+fw(5)*.5,9,0,7);g.fill();g.fillRect(-45,24+fw(5)*.5,10,6);g.fillStyle='#0e0c0c';g.beginPath();g.arc(-43,17+fw(5)*.5,2.6,0,7);g.arc(-37,17+fw(5)*.5,2.6,0,7);g.fill();
  g.strokeStyle='#e8e2d4';g.lineWidth=3;g.beginPath();g.moveTo(-56,30+fw(5)*.5);g.lineTo(-24,42+fw(5)*.5);g.moveTo(-24,30+fw(5)*.5);g.lineTo(-56,42+fw(5)*.5);g.stroke();g.restore();
 g.fillStyle='#8a1410';g.beginPath();g.moveTo(205,-436);for(let i=0;i<=12;i++)g.lineTo(205-i*9,-436+fw(i*.5)*(i/12)*1.3+i*.6);g.lineTo(205-108,-430);for(let i=12;i>=0;i--)g.lineTo(205-i*9,-428+fw(i*.5)*(i/12)*1.3+i*.3);g.closePath();g.fill();
 /* trup */
 const H=new Path2D();H.moveTo(-330,-130);H.lineTo(-262,-128);H.lineTo(-250,-104);H.lineTo(-120,-100);H.quadraticCurveTo(80,-96,250,-110);H.lineTo(300,-126);H.quadraticCurveTo(318,-60,286,-6);H.quadraticCurveTo(160,14,-200,10);H.quadraticCurveTo(-312,0,-330,-130);H.closePath();
 const G=g.createLinearGradient(0,-130,0,14);G.addColorStop(0,'#2e2826');G.addColorStop(.35,'#1c1817');G.addColorStop(1,'#0b0a0a');g.fillStyle=G;g.fill(H);
 g.save();g.clip(H);g.strokeStyle='rgba(70,60,56,.45)';g.lineWidth=1;for(let y=-120;y<10;y+=9){g.beginPath();g.moveTo(-340,y);g.quadraticCurveTo(0,y+6,320,y-8);g.stroke()}
  g.fillStyle='rgba(120,30,20,.55)';g.fillRect(-340,-74,700,5);g.fillStyle='#120f0e';g.fillRect(-340,-12,700,26);
  g.fillStyle='rgba(255,255,255,.05)';g.fillRect(-340,-128,700,10);g.restore();
 g.strokeStyle='#050404';g.lineWidth=2.5;g.stroke(H);
 /* záďová nástavba s okny */g.fillStyle='#1d1817';g.beginPath();g.moveTo(-330,-130);g.lineTo(-326,-196);g.lineTo(-236,-188);g.lineTo(-232,-128);g.closePath();g.fill();g.stroke();
 for(let i=0;i<4;i++){const wx=-318+i*21;g.fillStyle='#2a1a10';g.fillRect(wx,-178,15,22);g.fillStyle='rgba(255,196,96,.9)';g.fillRect(wx+2,-176,11,18);g.fillStyle='#2a1a10';g.fillRect(wx+7,-176,1.5,18)}
 g.fillStyle='#14100e';g.fillRect(-334,-200,104,6);[-326,-290,-254].forEach(x=>{g.fillStyle='#1a1412';g.fillRect(x-1,-214,2,14);g.fillStyle='#ffcf6a';g.beginPath();g.arc(x,-218,4,0,7);g.fill()});
 /* zábradlí paluby */g.strokeStyle='#14100e';g.lineWidth=2;g.beginPath();g.moveTo(-232,-140);g.quadraticCurveTo(40,-134,300,-142);g.stroke();for(let x=-226;x<296;x+=14){g.beginPath();g.moveTo(x,-140);g.lineTo(x,-104+Math.abs(x)*.01);g.stroke()}
 /* příďová figura: zahalená vdova */g.save();g.translate(300,-120);g.rotate(-.5);g.fillStyle='#c8c4bc';g.beginPath();g.ellipse(18,-6,22,9,0,0,7);g.fill();g.fillStyle='#e0dcd4';g.beginPath();g.arc(38,-12,7,0,7);g.fill();g.fillStyle='#1a1616';g.beginPath();g.moveTo(32,-20);g.quadraticCurveTo(50,-22,48,-4);g.lineTo(30,-10);g.closePath();g.fill();g.restore();
 g.strokeStyle='#1a1412';g.lineWidth=5;g.beginPath();g.moveTo(296,-128);g.lineTo(420,-176);g.stroke();
 /* dělové porty */o.ports.forEach((px,i)=>{const y=-56,fl=o.fl[i];g.fillStyle='#0a0606';g.fillRect(px-11,y-9,22,18);g.fillStyle=fl>0?'#ffb050':'#3a0c08';g.fillRect(px-8,y-6,16,12);g.fillStyle='#262628';g.save();g.translate(px,y);g.fillRect(-4,-4,(fl>0?6:14),8);g.restore();g.strokeStyle='#4a3a30';g.lineWidth=1;g.strokeRect(px-11,y-9,22,18)});
 /* visící čluny na jeřábech */o.dav.forEach((dx,i)=>{g.strokeStyle='#1a1412';g.lineWidth=3;g.beginPath();g.moveTo(dx-26,-140);g.quadraticCurveTo(dx-26,-170,dx-14,-170);g.moveTo(dx+26,-140);g.quadraticCurveTo(dx+26,-170,dx+14,-170);g.stroke();
  if(o.hang[i]){g.strokeStyle='rgba(60,50,40,.9)';g.lineWidth=1;g.beginPath();g.moveTo(dx-14,-168);g.lineTo(dx-22,-118);g.moveTo(dx+14,-168);g.lineTo(dx+22,-118);g.stroke();pnBoatShape(g,dx,-112,.5,null,0)}});
 }finally{X=X0}g.restore();
 /* opar dálky */g.save();g.globalCompositeOperation='source-atop';g.fillStyle='rgba(120,150,180,.16)';g.fillRect(0,0,o.W,o.H);g.restore()}
/* člun – loďka s veslaři (lokálně: příď vpravo, (0,0) = ponor) */
function pnBoatShape(g,x,y,s,b,t){g.save();g.translate(x,y);g.scale(s,s);g.lineJoin='round';const n=b?b.n:0,row=b&&b.row?1:0,oa=Math.sin(t*.22)*(row?.5:0);
 if(b&&n>0){/* piráti */for(let i=0;i<Math.min(4,n+(b.cap?0:0));i++){const px=-34+i*22,col=['#a8322a','#2a5a9a','#c8a040','#5a8a3a'][(i+b.seed)%4],bob=Math.sin(t*.22+i)*2*row;g.fillStyle=col;g.fillRect(px-7,-36+bob,14,18);g.fillStyle='#d8a070';g.beginPath();g.arc(px,-42+bob,6,0,7);g.fill();g.fillStyle=['#1a1414','#8a1a14','#2a2a6a'][(i+b.seed)%3];g.beginPath();g.arc(px,-45+bob,6.4,Math.PI,0);g.fill();
   if(row){g.strokeStyle='#5a3a1e';g.lineWidth=2.4;g.beginPath();g.moveTo(px,-30+bob);g.lineTo(px+Math.cos(oa+2.2)*30,-30+Math.sin(oa+2.2)*12+16);g.stroke()}}
  }
 const H=new Path2D();H.moveTo(-64,-24);H.quadraticCurveTo(-60,4,-30,8);H.lineTo(34,8);H.quadraticCurveTo(62,2,72,-28);H.lineTo(60,-24);H.quadraticCurveTo(0,-18,-64,-24);H.closePath();
 const G=g.createLinearGradient(0,-28,0,8);G.addColorStop(0,b&&b.cap?'#5a1a14':'#6a4424');G.addColorStop(1,b&&b.cap?'#2a0806':'#2e1c0e');g.fillStyle=G;g.fill(H);g.strokeStyle='#140c06';g.lineWidth=2.4;g.stroke(H);
 g.strokeStyle='rgba(255,220,170,.25)';g.lineWidth=1.2;g.beginPath();g.moveTo(-58,-20);g.quadraticCurveTo(0,-14,64,-24);g.stroke();
 if(b&&b.cap){g.fillStyle='#d8b050';g.fillRect(-64,-30,3,8);g.fillStyle='#0e0c0c';g.beginPath();g.moveTo(-63,-56);g.lineTo(-38,-52);g.lineTo(-63,-44);g.closePath();g.fill();g.strokeStyle='#2a1a0e';g.lineWidth=2;g.beginPath();g.moveTo(-63,-24);g.lineTo(-63,-58);g.stroke()}
 if(b&&row){g.strokeStyle='#5a3a1e';g.lineWidth=3;for(let i=0;i<2;i++){const ox=-10+i*26;g.beginPath();g.moveTo(ox,-14);g.lineTo(ox+Math.cos(oa+1.9)*36,12+Math.sin(oa)*4);g.stroke()}}
 g.restore()}

/* =====================================================================
   ABORDÁŽ: časová osa, čluny, palba z děl, naše palubní děla
   ===================================================================== */
Object.assign(SFX,{
 pnOar:{p:[['n',{d:.12,g:.18,ft:'bandpass',f:900,f2:500,q:2}]],v:.5,mi:120},
 pnHook:{p:[['t',{w:'square',f:900,f2:600,d:.06,g:.08}],['n',{d:.08,g:.3,ft:'highpass',f:2400}]],mi:60},
 pnSquawk:{p:[['t',{w:'sawtooth',f:1500,f2:2400,d:.09,g:.08}],['t',{w:'sawtooth',f:2300,f2:1300,d:.12,g:.07,dl:.09}],['t',{w:'square',f:1900,f2:2600,d:.08,g:.05,dl:.2}]],rv:.2,vr:.15,mi:160},
 pnFlap:{p:[['n',{d:.07,g:.18,ft:'bandpass',f:500,f2:300,q:1}]],mi:80},
 pnPeg:{p:[['t',{w:'triangle',f:220,f2:120,d:.07,g:.18}],['n',{d:.04,g:.2,ft:'bandpass',f:1200,f2:600,q:3}]],v:.7,mi:120},
 pnWood:{p:[['n',{d:.3,g:.45,ft:'bandpass',f:700,f2:200,q:1.5}],['t',{f:120,f2:50,d:.25,g:.4}]],rv:.3,mi:200}});
const PN={on:0,t:0,ev:0,boats:[],balls:[],shots:[],par:null,cd:{},hint:0,ann:null,seed:1,capB:null,last:0,cpOK:0,vd:0};
const PNTL=[[120,'warn'],[200,'boat',3],[700,'boat',2],[1200,'vol',3],[1400,'boat',3],[1800,'boat',3,0,1],[1860,'boat',2,0,1],[2500,'vol',4],[2700,'boat',3],[3100,'boat',3],[3150,'boat',2,0,1],[3700,'vol',5],[3900,'boat',4],[4300,'boat',3,0,1],[4360,'boat',3,0,1],[5000,'vol',5],[5200,'boat',4],[5600,'boat',3],[5650,'boat',3,0,1],[6300,'vol',6],[6800,'cap']];
const PNZ=[[540,860],[1200,1430],[1705,1820]];
function pnOn(){return!!(SEA&&lv&&lv.k=='sea'&&!TR2)}
function pnShipPos(){return{x:700-cam*.32+Math.sin(T*.004)*24,y:GY+50+Math.sin(T*.03)*2.4}}
function pnFreeX(){const nz=PNZ.filter(z=>z[1]>p.x-520&&z[0]<p.x+520);for(let k=0;k<20;k++){const L=nz.length&&k<12?nz:PNZ,Z=L[(Math.random()*L.length)|0],x=Math.round(R(Z[0],Z[1]));if(!PN.boats.some(b=>!b.gone&&Math.abs(b.tx-x)<160)&&Math.abs(x-p.x)>90)return x}return 700}
function pnLaunch(n,el,o){o=o||{};const i=PN.boats.filter(b=>b.st=='lower').length?1-(PN.last%2):PN.last%2;PN.last++;const b={st:'lower',t:0,i,n,el:el||0,tx:o.tx||pnFreeX(),u:0,seed:(PN.seed++)%4,cap:o.cap||0,boss:o.boss||0,row:1,sp:o.cap?1/300:1/([240,200,165][SV.dif]||200),hooks:0,cl:0};PNS.hang[i]=0;PN.boats.push(b);
 sfx('pnWood');if(!o.cap&&!o.quiet)pnAnn(n>=3?'Z Vdovy spouštějí člun – '+n+' piráti!':'Z Vdovy spouštějí člun!');return b}
function pnAnn(t){}/* v93: bez vyskakovacích hlášení */
function pnBoatPos(b){const S=pnShipPos(),s0=PNS.s,lx=S.x+PNS.dav[b.i]*s0;if(b.st=='lower'){const k=pkE.io(Math.min(1,b.t/32));return{x:lx,y:S.y-112*s0*(1-k)+2,s:.5*s0,rot:0}}
 const u=pkE.io(pkC(b.u,0,1)),ax=b.tx-cam,ay=LY-37+camZ*.55;return{x:pkL(lx,ax,u),y:pkL(S.y+2,ay,Math.pow(u,1.25))+Math.sin(T*.05+b.seed)*1.5,s:pkL(.42,.95,u),rot:b.st=='sink'?Math.min(.5,b.t*.01):0}}
function pnBoatDraw(b){const q=pnBoatPos(b);if(b.st=='lower'){const S=pnShipPos(),s0=PNS.s,lx=S.x+PNS.dav[b.i]*s0,ty=S.y-168*s0;X.strokeStyle='rgba(30,24,18,.9)';X.lineWidth=1;X.beginPath();X.moveTo(lx-8*s0,ty);X.lineTo(q.x-14*q.s,q.y-20*q.s);X.moveTo(lx+8*s0,ty);X.lineTo(q.x+14*q.s,q.y-20*q.s);X.stroke()}
 X.save();X.translate(q.x,q.y);if(b.st=='sink'){X.rotate(q.rot);X.translate(0,b.t*.5*q.s)}
 /* brázda */if(b.st=='row'){X.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<6;i++){const u=((T*.7+i*11)%60)/60;X.globalAlpha=(1-u)*.6;X.beginPath();X.ellipse((-70-u*120)*q.s,4*q.s,(18+u*20)*q.s,2.2*q.s,0,0,7);X.fill()}X.globalAlpha=1;if(T%38==b.seed*7%38)sfx('pnOar',b.tx)}
 const cl=b.st=='sink'?Math.max(0,1-b.t/60):1;X.save();if(b.st=='sink'){X.beginPath();X.rect(-400,-400,800,400+8*q.s);X.clip()}
 pnBoatShape(X,0,0,q.s,{n:b.st=='dock'||b.st=='away'?Math.max(0,b.n-b.cl):b.n,row:b.st=='row'||b.st=='away'?1:0,seed:b.seed,cap:b.cap},T+b.seed*30);
 if(b.cap&&b.st!='dock'&&b.st!='away'&&b.capOn!==0){const P=pkP0();PKB.boat(0,{t2:T},P);P.par=1;pkDrawAt(36*q.s,-22*q.s,1,.09*q.s,P,{t2:T})}
 X.restore();X.fillStyle='rgba(255,255,255,'+(.4*cl)+')';X.beginPath();X.ellipse(0,6*q.s,76*q.s,4*q.s,0,0,7);X.fill();X.restore();
 /* lana s háky k našemu zábradlí */if(b.hooks>0&&b.st=='dock'){const rx=b.tx-cam;for(let k=-1;k<=1;k+=2){const hx=rx+k*22,hy=LY-34+camZ*.55,k2=Math.min(1,b.hooks/14),x0=q.x+k*20*q.s,y0=q.y-16*q.s;X.strokeStyle='#5a4020';X.lineWidth=2;X.beginPath();X.moveTo(x0,y0);X.lineTo(pkL(x0,hx,k2),pkL(y0,hy,k2)-Math.sin(k2*Math.PI)*30);X.stroke()}}}
function pnUpdBoats(){for(const b of PN.boats){b.t++;
 if(b.st=='lower'){if(b.t==32){b.st='row';b.t=0;sfx('splash',b.tx);PNS.hang[b.i]=1}continue}
 if(b.st=='row'){b.u+=b.sp*(PN.vd>0?.5:1);if(b.u>=1){b.u=1;b.st='dock';b.t=0;sfx('heavy',b.tx);shake=Math.max(shake,3)}continue}
 if(b.st=='dock'){if(b.t<16){b.hooks=b.t;if(b.t==6)sfx('pnHook',b.tx)}
  if(b.cap){if(b.t==20&&!b.spawned){b.spawned=1;b.capOn=0;pnCapArrive(b)}if(b.t>200){b.st='away';b.t=0}continue}
  if(b.t>=14&&(b.t-14)%20==0&&b.cl<b.n){pnClimbE(b,b.cl);b.cl++}if(b.cl>=b.n&&b.t>14+b.n*20+50){b.st='away';b.t=0}continue}
 if(b.st=='away'){b.u-=1/500;if(b.t>220)b.gone=1;continue}
 if(b.st=='sink'){if(b.t%6==0)spawnP(b.tx,LY,3,'#cfe8f0',2,10,-20);if(b.t>70)b.gone=1}}
 PN.boats=PN.boats.filter(b=>!b.gone)}
function pnClimbE(b,k){const e=seaE(b.tx+(k%2?1:-1)*R(10,46));e.st='pnClimb';e.z=-80;e.gf=0;e.cl=0;e.face=Math.sign(p.x-e.x)||1;e.pnB=b;
 if(Math.random()<.4)pop(e.x,LY,40,['¡AL ABORDAJE!','¡ARRIBA!','¡VAMOS!','Harr!'][(Math.random()*4)|0],'#ffb14a')}
/* piráti šplhají přes zábradlí (vidět jen nad ním) */
{const _u=updE;updE=function(e){if(e&&e.st=='pnClimb'){e.cl++;e.z=-80+76*pkE.o(Math.min(1,e.cl/26));e.face=Math.sign(p.x-e.x)||e.face;if(e.cl>=26){e.st='jumpin';e.z=4;e.vz=6.5;spawnP(e.x,LY,5,'#d8c8a0',2,6,0)}return}return _u(e)}}
{const _f=fxE;fxE=function(e){if(e&&e.st=='pnClimb'){X.save();X.beginPath();X.rect(-200,-2000,W+400,LY-26+2000);X.clip();try{_f(e)}finally{X.restore()}
  const x=e.x-cam;X.save();X.strokeStyle='#5a4020';X.lineWidth=2;X.beginPath();X.moveTo(x-6,LY-30);X.lineTo(x-6,LY-26);X.stroke();X.fillStyle='#2a2a2e';X.beginPath();X.arc(x-6,LY-31,3,0,7);X.fill();X.restore();return}return _f(e)}}
/* shozen do moře během šplhání */
{const _h=hurtE;hurtE=function(e,d,dir,la,mel){if(e&&e.st=='pnClimb'&&!TR2){e.hp=0;e.st='dead';e.dt=0;e.vz=-2;e.z=-60;kills++;try{comboHit();comboKill(e);addSc(150)}catch(er){}pop(e.x,LY,30,'SHOZEN DO MOŘE!','#9fe8ff');try{const sv=pgSV();sv.rail=(sv.rail|0)+1}catch(er){}sfx('splash',e.x);spawnP(e.x,LY,10,'#cfe8f0',3,20,-30);try{bjSty&&bjSty('env',1.4)}catch(er){}return}return _h(e,d,dir,la,mel)}}
/* palba z Vdovy */
function pnVolley(n,o){o=o||{};const T0=o.T||74;const tg=[];for(let i=0;i<n;i++){let x;if(i==0)x=p.x+p.vx*20;else if(o.boss&&i==1&&bossE)x=bossE.x+R(-40,40);else x=p.x+R(-340,340);x=pkC(x,170,2130);
  if(tg.some(v=>Math.abs(v-x)<70))x+=90;tg.push(x);PN.balls.push({x,z:Math.max(0,floorAt(x,1e4,6)),t:-i*9-(o.d||20),T:T0,i:(i*3)%7})}if(!o.quiet)pnAnn('Černá vdova pálí z děl!')}
function pnUpdBalls(){for(const c of PN.balls){c.t++;if(c.t==0){PNS.fl[c.i]=9;sfx('cannon',c.x);c.sp=pnShipPos();c.s0={x:c.sp.x+PNS.ports[c.i]*PNS.s,y:c.sp.y-56*PNS.s}}
  if(c.t>=c.T){c.g=1;const be=bossE&&bossE.st!='dead'&&Math.abs(bossE.x-c.x)<100&&Math.abs(bossE.z-c.z)<80?bossE:null;blast(c.x,c.z,0);if(be&&be.B=='adm')pnFriendly(be)}}PN.balls=PN.balls.filter(c=>!c.g);for(let i=0;i<7;i++)if(PNS.fl[i]>0)PNS.fl[i]--}
function pnBallsDraw(){for(const c of PN.balls){const x=c.x-cam,y=LY-c.z;if(c.t<-4)continue;const a=pkC(c.t/c.T,0,1);
  X.save();X.strokeStyle='rgba(255,50,30,'+(.45+.45*Math.sin(T*.5))+')';X.lineWidth=2.5;X.beginPath();X.ellipse(x,y,48*(1-a*.35),9*(1-a*.35),0,0,7);X.stroke();X.lineWidth=1.5;X.beginPath();X.ellipse(x,y,48*(1-a)+4,9*(1-a)+1,0,0,7);X.stroke();
  X.beginPath();X.moveTo(x-12,y);X.lineTo(x+12,y);X.moveTo(x,y-5);X.lineTo(x,y+5);X.stroke();X.restore();
  if(c.t>=0&&c.s0){const u=a,sx=pkL(c.s0.x,x,u),sy=pkL(c.s0.y-camZ*.55,y,u)-Math.sin(u*Math.PI)*170,r=pkL(3,9,u);X.fillStyle='#141418';X.beginPath();X.arc(sx,sy,r,0,7);X.fill();rgGlow(sx,sy,r*2.4,'255,190,110',.35)}}}
/* naše palubní děla: hráč střílí na čluny */
function pnNearCan(){if(!pnOn()||!p||p.dead)return null;return deco.find(d=>d.k=='cann'&&Math.abs(d.x-p.x)<52&&p.z<30&&p.on)||null}
function pnFire(d){const k=d.x;PN.cd[k]=SV.dif==2?540:420;d.rc=14;sfx('cannon',d.x);shake=Math.max(shake,6);for(let i=0;i<10;i++)par.push({x:d.x+R(-10,10),y:LY,z:40+R(-6,8),vx:R(-1,1),vz:R(.5,2),l:R(30,50),c:'rgba(210,210,210,.6)',s:R(6,10)});
 const tgt=PN.boats.filter(b=>b.st=='row'&&!b.cap&&b.u>.08&&b.u<.94).sort((a,b)=>b.u-a.u)[0]||null;PN.shots.push({x:d.x,t:0,T:30,b:tgt});if(!PN.hint2){PN.hint2=1}}
function pnUpdShots(){for(const s of PN.shots){s.t++;if(s.t>=s.T){s.g=1;const b=s.b;if(b&&b.st=='row'){b.st='sink';b.t=0;sfx('boom',b.tx);sfx('splash',b.tx);pop(b.tx,LY,40,'ČLUN POTOPEN! +'+b.n*2+' $','#9fe8ff');try{pgCoins(b.n*2,pnBoatPos(b).x,pnBoatPos(b).y)}catch(e){SV.st+=b.n*2}addSc(100*b.n);try{bjSty&&bjSty('env',2)}catch(e){}const sv=pgSV();sv.sunk=(sv.sunk|0)+1}
  else{PNS.hit=24;PN.vd=360;sfx('boom');pop(p.x,LY,p.z+150,'ZÁSAH DO VDOVY!','#ffd27a')}}}PN.shots=PN.shots.filter(s=>!s.g);if(PNS.hit>0)PNS.hit--;if(PN.vd>0)PN.vd--;for(const k in PN.cd)if(PN.cd[k]>0)PN.cd[k]--}
function pnShotsDraw(){for(const s of PN.shots){const u=s.t/s.T,x0=s.x-cam,y0=LY-46;let tx,ty;if(s.b){const q=pnBoatPos(s.b);tx=q.x;ty=q.y-10*q.s+camZ*.45}else{const S=pnShipPos();tx=S.x;ty=S.y-60*PNS.s+camZ*.45}
  const x=pkL(x0,tx,u),y=pkL(y0,ty,u)-Math.sin(u*Math.PI)*90,r=pkL(9,3,u);X.fillStyle='#141418';X.beginPath();X.arc(x,y,r,0,7);X.fill();rgGlow(x,y,r*2.4,'255,190,110',.3)}}
{const _ip=interactP;interactP=function(){const d=pnNearCan();if(d&&!(PN.cd[d.x]>0)&&state=='play'){pnFire(d);return}return _ip.apply(this,arguments)}}
/* kreslení Vdovy a člunů (pozadí – za naší palubou) */
{const _b=b5Galleon;b5Galleon=function(){if(!pnOn())return _b()}}
{const _g=groundOld;groundOld=function(){_g();if(!pnOn())return;try{pnShipDraw();PN.boats.slice().sort((a,b)=>a.u-b.u).forEach(pnBoatDraw)}catch(e){console.error('pnShip',e)}}}
function pnShipDraw(){const o=PNS;if(!o.cv){o.cv=pbCv(o.W,o.H);o.g=o.cv.getContext('2d')}if(Math.abs(T-o.lt)>=3||o.fl.some(v=>v>0)||o.hit>0){o.lt=T;pnShipPaint(T)}
 const S=pnShipPos(),s=o.s,rot=Math.sin(T*.02)*.014+(o.hit>0?Math.sin(o.hit*.8)*.02:0);
 X.save();const rg=X.createLinearGradient(0,S.y,0,S.y+30);rg.addColorStop(0,'rgba(6,14,26,.55)');rg.addColorStop(1,'rgba(6,14,26,0)');X.fillStyle=rg;X.beginPath();X.ellipse(S.x,S.y+8,200,20,0,0,7);X.fill();
 X.translate(S.x,S.y);X.rotate(rot);X.drawImage(o.cv,-o.ox*s,-o.oy*s,o.W*s,o.H*s);
 /* výšlehy */for(let i=0;i<7;i++){const f=o.fl[i];if(f>0){const px=o.ports[i]*s,py=-56*s,k=f/9;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(px,py,0,px,py,30+(9-f)*3);g.addColorStop(0,'rgba(255,235,170,'+k+')');g.addColorStop(.45,'rgba(255,140,50,'+k*.7+')');g.addColorStop(1,'rgba(255,90,30,0)');X.fillStyle=g;X.fillRect(px-40,py-40,80,80);X.restore();if(f==8)for(let j=0;j<5;j++)PN.sm=(PN.sm||[]).concat([{x:S.x+px+R(-4,4),y:S.y+py,t:0,v:R(.3,1)}])}}
 if(o.hit>0){X.save();X.globalCompositeOperation='lighter';X.fillStyle='rgba(255,180,80,'+o.hit/40+')';X.beginPath();X.arc(-40*s,-90*s,40,0,7);X.fill();X.restore()}
 /* pěna u přídě */X.fillStyle='rgba(255,255,255,.7)';for(let k=0;k<3;k++){X.beginPath();X.ellipse(290*s+k*6,2+k*2,14-k*3,2.6,-.2,0,7);X.fill()}for(let i=0;i<16;i++){X.globalAlpha=.5;X.fillRect(-300*s+i*36*s+Math.sin(T*.05+i)*3,5,10,1.2)}X.globalAlpha=1;X.restore();
 /* kouř po výstřelech */if(PN.sm){for(const m of PN.sm){m.t++;rgPuff(m.x-m.t*.5,m.y-m.t*m.v*.4,8+m.t*.35,Math.max(0,.7-m.t/90),'190,190,195')}PN.sm=PN.sm.filter(m=>m.t<90)}}

/* ---------- režie útoku ---------- */
function pnLive(){return ens.filter(e=>e.sea&&e.st!='dead').length}
function pnPending(){return PN.boats.filter(b=>b.st=='lower'||b.st=='row'||(b.st=='dock'&&b.cl<b.n)).length}
function pnNext(){return PNTL[PN.ev]||null}
function pnDirector(){if(state!='play'||PN.cap)return;const nx=pnNext();if(!nx)return;
 const live=pnLive(),pend=pnPending(),busy=live+pend*2;
 let rate=1;if(live==0&&pend==0&&nx[0]-PN.t>240&&nx[1]!='vol')rate=4;
 if((nx[1]=='boat'||nx[1]=='cap')&&PN.t>=nx[0]-1&&(busy>=9||(nx[1]=='cap'&&(live>0||pend>0))))rate=0;
 PN.t+=rate;
 while(PNTL[PN.ev]&&PN.t>=PNTL[PN.ev][0]){const E=PNTL[PN.ev];PN.ev++;
  if(E[1]=='warn'){PNS.fl[3]=9;sfx('cannon');PN.balls.push({x:-999,z:0,t:0,T:60,i:3,miss:1});pnAnn('Na obzoru je Černá vdova – loď Kapitána Calavery!')}
  else if(E[1]=='boat')pnLaunch(E[2],E[3],{quiet:E[4]});
  else if(E[1]=='vol')pnVolley(E[2]+(SV.dif==2?1:0));
  else if(E[1]=='cap'){PN.cap=1;PN.capB=pnLaunch(0,0,{cap:1,tx:pnCapX()});pnAnn('Kapitán Calavera spouští svůj člun!');sfx('bosun')}}
 /* kontrolní bod uprostřed útoku */if(!PN.cpOK&&PN.ev>=11&&live==0&&pend==0&&!(CP&&CP.sea)){PN.cpOK=1;CP={li,x:p.x,z:p.z,sea:1,pt:PN.t,pe:PN.ev};pop(p.x,LY,p.z+130,'KONTROLNÍ BOD','#7fe07a');sfx('flag')}}
function pnCapArrive(b){spawnB('adm',b.tx,0)}
function pnCapX(){let best=700,bd=1e9;for(const Z of PNZ)for(let x=Z[0]+30;x<=Z[1]-30;x+=10){const d=Math.abs(Math.abs(x-p.x)-300);if(d<bd){bd=d;best=x}}return best}
/* varovná rána vedle lodi */
{const _u=pnUpdBalls;pnUpdBalls=function(){for(const c of PN.balls)if(c.miss){c.t++;if(c.t==1){c.sp=pnShipPos()}if(c.t>=c.T){c.g=1;sfx('splash');shake=Math.max(shake,4)}}PN.balls=PN.balls.filter(c=>!(c.miss&&c.g));const m=PN.balls.filter(c=>c.miss);PN.balls=PN.balls.filter(c=>!c.miss);_u();PN.balls=PN.balls.concat(m)}}
{const _d=pnBallsDraw;pnBallsDraw=function(){const m=PN.balls.filter(c=>c.miss);for(const c of m){if(!c.sp)continue;const u=c.t/c.T,sx=pkL(c.sp.x-200*PNS.s,c.sp.x+260,u),sy=pkL(c.sp.y-60*PNS.s,GY+60,u)-Math.sin(u*Math.PI)*120;X.fillStyle='#141418';X.beginPath();X.arc(sx,sy,4,0,7);X.fill();if(c.t>=c.T-2)for(let i=0;i<10;i++)par.push({x:cam+c.sp.x+260+R(-12,12),y:LY,z:LY-GY-60+R(0,30),vx:R(-1,1),vz:R(2,6),l:30,c:'#e6f4f8',s:3})}
 const o=PN.balls;PN.balls=o.filter(c=>!c.miss);try{_d()}finally{PN.balls=o}}}
/* náhrada vln: celá mořská smyčka */
updSea2=function(){const S=SEA;S.off+=S.spd;if(S.fl>0)S.fl--;if(!pnOn())return;
 try{pnUpdBoats();pnUpdBalls();pnUpdShots();pnUpdPar();if(PN.ann){PN.ann.t++;if(PN.ann.t>220)PN.ann=null}pnDirector()}catch(e){console.error('pn',e)}
 if(state!='play')return;
 if(bossE&&bossE.B=='adm'&&bossE.st=='dead'&&bossE.dt>156&&!PN.done){PN.done=1;trig('dock')}};
{const _g=genSea;genSea=function(){_g();Object.assign(PN,{on:1,t:0,ev:0,boats:[],balls:[],shots:[],par:null,cd:{},ann:null,cap:0,capB:null,last:0,cpOK:0,vd:0,done:0,sm:[],flee:0,ff:0});PNS.hang=[1,1];PNS.fl=[0,0,0,0,0,0,0];PNS.hit=0;CB=[];
 hn=[]}}
{const _r=respawnCP;respawnCP=function(){const cp=CP&&CP.li==li?CP:null;const r=_r.apply(this,arguments);try{if(cp&&cp.sea&&pnOn()){PN.t=cp.pt||PN.t;PN.ev=cp.pe||PN.ev;PN.cpOK=1;CP=cp}}catch(e){}return r}}
/* vrstva před palubou: zaměřovače, letící koule, prompt u děla */
{const _s=seaFront;seaFront=function(){if(!pnOn())return _s();try{pnBallsDraw();pnShotsDraw();pnParDraw();
 for(const d of deco){if(d.k!='cann')continue;const x=d.x-cam;if(x<-80||x>W+80)continue;const cd=PN.cd[d.x]||0;if(cd>0){X.save();X.strokeStyle='rgba(255,220,140,.8)';X.lineWidth=3;X.beginPath();X.arc(x,LY-70,11,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-cd/(SV.dif==2?540:420)));X.stroke();X.restore()}
  if(d.rc>0){d.rc--;rgGlow(x+d.f*26,LY-30,40,'255,200,120',d.rc/14)}}
 const d=pnNearCan();if(d&&state=='play'){const cd=PN.cd[d.x]||0,x=d.x-cam,tg=PN.boats.some(b=>b.st=='row'&&!b.cap&&b.u>.08&&b.u<.94);X.save();X.textAlign='center';X.font='700 14px Georgia';X.lineWidth=4;X.strokeStyle='#120806';const t=cd>0?'Nabíjím…':(TOUCH?'[E]':'['+keyName((SV.keys.interact||[])[0])+']')+(tg?' Pal na člun!':' Pal na Vdovu');X.strokeText(t,x,LY-92);X.fillStyle=cd>0?'#c8c8c8':'#ffe28a';X.fillText(t,x,LY-92);X.restore()}}catch(e){console.error('pnf',e)}}}

/* =====================================================================
   PAPOUŠEK CHILI – útočí střemhlav, dá se srazit úderem
   ===================================================================== */
function pnParHome(e){const P=pkPose(e);return pkWorld(e,P,[372,290],null)}
function pnParLaunch(e){const s=pnParHome(e);PN.par={st:'out',x:s.x,z:s.z,t:0,n:e.hp<e.mhp*.33?4:3,e,face:e.face,vx:0,vz:0,hc:0};e.parOff=1;sfx('pnSquawk',e.x);sfx('pnFlap',e.x)}
function pnParStun(){const q=PN.par;if(!q)return;q.st='stun';q.t=0;q.vz=4;q.vx=(Math.sign(q.x-p.x)||1)*3;sfx('pnSquawk',q.x);sfx('punch',q.x);pop(q.x,LY,q.z+30,'CHILI SRAŽEN!','#9fe09a');
 for(let i=0;i<12;i++)par.push({x:q.x,y:LY,z:q.z,vx:R(-3,3),vz:R(-1,4),l:R(30,50),c:i%3?'#3ab03a':i%2?'#e83a2a':'#f4d040',s:R(2,4)});addSc(80);try{bjSty&&bjSty('env',1.3)}catch(e){}if(q.e)q.e.sumcd=Math.max(q.e.sumcd|0,0)}
function pnUpdPar(){const q=PN.par;if(!q)return;q.t++;const e=q.e;
 if((!e||e.st=='dead'||e.bst=='tired')&&q.st!='flee'&&q.st!='stun'){q.st='flee';q.t=0}
 if(p.pt<=0)q.hc=0;
 const hx=p.x-(Math.sign(p.x-(e?e.x:p.x))||1)*30,hz=p.z+200;
 if(q.st=='out'||q.st=='hover'){const a=q.t*.08,tx=hx+Math.cos(a)*64,tz=hz+Math.sin(a*2)*18;q.x+=(tx-q.x)*.07;q.z+=(tz-q.z)*.07;q.face=Math.sign(tx-q.x)||q.face;if(T%14==0)sfx('pnFlap',q.x);
  if(q.st=='out'&&q.t>44){q.st='hover';q.t=0}if(q.st=='hover'&&q.t>(SV.dif==2?40:58)){q.st='warn';q.t=0;sfx('pnSquawk',q.x)}}
 else if(q.st=='warn'){q.face=Math.sign(p.x-q.x)||q.face;q.z+=Math.sin(q.t*.9)*.6;if(q.t>=22){q.st='dive';q.t=0;q.dx=p.x+p.vx*6;q.dz=p.z+64;q.sx=q.x;q.sz=q.z}}
 else if(q.st=='dive'){const u=Math.min(1,q.t/15);q.x=pkL(q.sx,q.dx,pkE.i(u));q.z=pkL(q.sz,q.dz,pkE.i(u));
  if(u>=1&&!q.hit){q.hit=1;if(Math.abs(p.x-q.x)<48&&Math.abs(p.z+60-q.z)<74&&!p.dead&&state=='play'){const h0=p.hp,l0=p.lives|0;hurtP(1,Math.sign(p.x-q.x)||1);if(p.hp>=h0&&(p.lives|0)>=l0&&typeof BOJ!='undefined'&&BOJ.pf>0)pnParStun();else pop(q.x,LY,q.z+20,'KLOV!','#ff8a5a')}}
  if(q.st=='dive'&&q.t>=15){q.st='rise';q.t=0;q.hit=0}}
 else if(q.st=='rise'){q.z+=3.4;q.x-=q.face*2;if(q.t>24){q.n--;q.st=q.n>0?'hover':'home';q.t=0}}
 else if(q.st=='home'){const s=pnParHome(e);q.x+=(s.x-q.x)*.08;q.z+=(s.z-q.z)*.08;q.face=Math.sign(s.x-q.x)||q.face;if(Math.hypot(s.x-q.x,s.z-q.z)<14){e.parOff=0;PN.par=null;sfx('pnSquawk',e.x);return}}
 else if(q.st=='flee'){q.x+=4;q.z+=2.5;q.face=1;if(q.t>160){PN.par=null;if(e)e.parOff=1;return}}
 else if(q.st=='stun'){q.vz-=.5;q.z+=q.vz;q.x+=q.vx;const f=Math.max(0,floorAt(q.x,q.z+10,8));if(q.z<=f){q.z=f;q.vz=0;q.vx*=.7}if(q.t>150){q.st='home';q.t=0;sfx('pnSquawk',q.x)}}
 if(['hover','warn','dive','rise','out'].includes(q.st)&&p.pt>0&&!q.hc){const dx=(q.x-p.x)*p.face;if(dx>-24&&dx<96&&Math.abs(q.z-(p.z+80))<80){q.hc=1;pnParStun()}}}
function pnParrotAt(x,y,f,s,flap,st,t){const d=PKA.p.pk_parrot,im=PKI.pk_parrot;if(!d||!im)return;X.save();X.translate(x,y);X.scale(f*s,s);if(st=='stun'){X.rotate(1.3)}
 const fl=flap?Math.sin(t*.75):0;X.lineJoin='round';
 if(flap)for(const k of[0,1]){X.save();X.translate(k?-12:-4,-18);X.rotate((k?-.15:.1)-fl*.9);X.fillStyle=k?'#1e7a1e':'#2a9a2a';X.strokeStyle='#1e1a12';X.lineWidth=6;X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(-60,-70,-120,-50);X.lineTo(-100,-28);X.lineTo(-112,-12);X.lineTo(-84,-4);X.lineTo(-90,14);X.quadraticCurveTo(-40,20,0,0);X.closePath();X.fill();X.stroke();
  X.strokeStyle='#f4d040';X.lineWidth=4;X.beginPath();X.moveTo(-30,-14);X.lineTo(-86,-26);X.stroke();X.strokeStyle='#2a6ad8';X.beginPath();X.moveTo(-40,0);X.lineTo(-96,-4);X.stroke();X.restore()}
 X.drawImage(im,d.ox-372,d.oy-290,d.w,d.h);
 if(st=='stun'){X.strokeStyle='#1e1a12';X.lineWidth=5;X.beginPath();X.moveTo(20,-60);X.lineTo(34,-46);X.moveTo(34,-60);X.lineTo(20,-46);X.stroke()}X.restore()}
function pnParDraw(){const q=PN.par;if(!q)return;const x=q.x-cam,y=LY-q.z;if(x<-100||x>W+100)return;
 if(q.st!='stun'&&q.z>q.e?.z+40)shd(x,LY-Math.max(0,floorAt(q.x,q.z,8)),14,4,.2);
 pnParrotAt(x,y,q.face,.3,q.st!='stun',q.st,T);
 if(q.st=='warn'){X.save();X.textAlign='center';X.font='700 22px Georgia';X.lineWidth=4;X.strokeStyle='#120806';X.strokeText('!',x,y-34);X.fillStyle=T%8<4?'#ff4a2a':'#ffd27a';X.fillText('!',x,y-34);X.restore()}
 if(q.st=='stun'&&q.t>20){for(let i=0;i<3;i++){const a=T*.15+i*2.1;X.fillStyle='#ffe27a';X.fillRect(x+Math.cos(a)*16-2,y-26+Math.sin(a)*5-2,4,4)}}}

/* =====================================================================
   KAPITÁN CALAVERA – souboj
   ===================================================================== */
function pnGo(e,st,tm){e.bst=st;e.tm=tm;e.f2=0;e.h1=e.h2=e.hl=0}
function pnFriendly(e){if(e.st=='dead')return;pnGo(e,'dazed',84);e.vul=84;e.kb=0;pop(e.x,LY,e.z+250,'¡AY! ¡MI PROPIA VIUDA!','#ffd27a');sfx('pnSquawk',e.x);try{bjSty&&bjSty('env',2)}catch(er){}PN.ff=(PN.ff|0)+1}
function pnPick(e,ad,P2,P3){const W={},near=ad<175,mid=ad>=175&&ad<400;
 if(near){W.slash=3;W.hook=1.6;W.leapc=.5}else if(mid){W.lunge=3;if(ad<270)W.hook=1.4;W.leapc=1.4}else{W.leapc=2;W.lunge=1.2}
 if(P2){if(!PN.balls.length&&!(e.sgc>0))W.signal=1.3;if(!PN.par&&!e.parOff&&!(e.pcd>0))W.parrot=1.4;if(!(e.sumcd>0)&&pnLive()<2&&!PN.boats.some(b=>b.boss&&b.st!='away'))W.whistle=1}
 if(e.lastA&&W[e.lastA])W[e.lastA]*=.3;let sum=0;for(const k in W)sum+=W[k];let r=Math.random()*sum;for(const k in W){r-=W[k];if(r<=0)return k}return'slash'}
function pnAI(e,dx,dz,ad,adz,sd){const P2=e.hp<e.mhp*.66,P3=e.hp<e.mhp*.33,spd=(P3?1.28:P2?1.12:1)*(e.enr?1.12:1);
 e.tm--;e.f2=(e.f2||0)+1;if(e.vul>0)e.vul--;if(e.sumcd>0)e.sumcd--;if(e.sgc>0)e.sgc--;if(e.pcd>0)e.pcd--;
 const B=e.bst,f=e.f2,fw=e.face,inFront=dx*fw>-30;
 if(bRageOK(e)&&['idle','walk','land','hurt'].includes(B)){bRageStart(e);e.f2=0;return}
 if(B=='rage'){bRageUpd(e,sd);if(e.bst!='rage'){pnGo(e,'idle',30)}return}
 const fin=(n)=>{pnGo(e,'idle',n!=null?n:Math.round((P3?30:P2?42:56)*R(.8,1.2)))};
 const clampX=()=>{e.x=pkC(e.x,180,2120)};
 if(B=='idle'||B=='walk'){e.face=sd;const want=e.parOff?150:190;if(ad>want+60)bmv(e,sd*1.5*spd);else if(ad<want-80)bmv(e,-sd*.9*spd);clampX();
  if(e.pkMv>.4&&T%22==0)sfx('pnPeg',e.x);
  if(e.tm<=0&&e.z<=e.gf+1){const a=pnPick(e,ad,P2,P3);e.lastA=a;
   if(a=='slash')pnGo(e,'slash',64);else if(a=='lunge'){pnGo(e,'lunge',72);pop(e.x,LY,e.z+250,'!','#ff4a2a')}else if(a=='hook')pnGo(e,'hook',58);
   else if(a=='leapc')pnGo(e,'leapc',22);else if(a=='signal'){pnGo(e,'signal',70);e.sgc=P3?600:780}else if(a=='parrot'){pnGo(e,'parrot',40);e.pcd=P3?520:700}else if(a=='whistle'){pnGo(e,'whistle',52);e.sumcd=P3?900:1200}}
  return}
 if(B=='slash'){if(f<14)e.face=sd;if((f>=14&&f<=20)||(f>=37&&f<=43))bmv(e,fw*2.4*spd);clampX();if(f==14||f==37)sfx('blade',e.x);
  if(f>=16&&f<=20&&!e.h1&&ad<185&&adz<74&&inFront){e.h1=1;hurtP(1,fw);p.vx=fw*7}
  if(f>=39&&f<=43&&!e.h2&&ad<185&&adz<90&&inFront){e.h2=1;hurtP(1,fw);p.vx=fw*6;p.vz=Math.max(p.vz,5)}
  if(f>=64)fin();return}
 if(B=='lunge'){if(f<34){e.face=sd;if(f%8==0)sfx('blade',e.x)}
  if(f==34){sfx('whoosh',e.x);e.lx=e.x}
  if(f>=34&&f<54){const v=fw*11*spd;const nx=e.x+v;if(wallAt(nx+fw*40,e.z,120,16)||nx<190||nx>2110){pnGo(e,'stuck',100);e.vul=100;shake=Math.max(shake,8);sfx('heavy',e.x);sfx('pnWood',e.x);pop(e.x,LY,e.z+250,'ŠAVLE SE ZASEKLA!','#9fe09a');spawnP(e.x+fw*60,LY,10,'#8a5a30',3,40,e.z+60);return}
   e.x=nx;if(T%2==0)spawnP(e.x,LY,2,'#e6f4f8',2,6,e.z);if(!e.hl&&Math.abs(p.x-e.x)<62&&adz<80){e.hl=1;hurtP(1,fw);p.vx=fw*9;p.vz=Math.max(p.vz,5)}}
  if(f>=54&&f<62)bmv(e,fw*3);clampX();if(f>=72)fin();return}
 if(B=='hook'){if(f<18)e.face=sd;if(f==20)sfx('whoosh',e.x);
  if(f>=22&&f<=27&&!e.h1){const P=pkPose(e),h=pkWorld(e,P,PKJ.hookT,'B');if(Math.abs(p.x-h.x)<64&&Math.abs(p.z+56-h.z)<80&&!p.dead){e.h1=1;const h0=p.hp;hurtP(1,fw);if(p.hp<h0||!(typeof BOJ!='undefined'&&BOJ.pf>0)){pnGo(e,'pull',30);e.grab=1;pop(p.x,LY,p.z+140,'CHYCEN NA HÁK!','#ffb14a');sfx('pnHook',e.x)}return}}
  if(f>=58)fin();return}
 if(B=='pull'){const tx=e.x+fw*100;if(f<16){p.x+=(tx-p.x)*.22;p.vx=0}if(f==16){pnGo(e,'slash',64);e.f2=10}return}
 if(B=='leapc'){e.face=sd;e.kb=0;if(f==1)sfx('charge',e.x);if(f>=22){pnGo(e,'air',200);e.vz=12.5;e.z+=1;e.kb=sd*Math.min(7.5,ad/24+.5);sfx('whoosh',e.x)}return}
 if(B=='air'){clampX();if(f>4&&e.z<=e.gf+.5&&e.vz<=0){shake=Math.max(shake,13);sfx('heavy',e.x);sfx('pnWood',e.x);ring(e.x,LY,110,'rgba(255,230,190,.85)',22,e.z);spawnP(e.x,LY,18,'#8a6040',4,14,e.z);
   shock(e.x,e.z,1,1);shock(e.x,e.z,-1,1);if(ad<110&&adz<60)hurtP(1,sd);e.kb=0;
   if(Math.random()<(P3?.35:.5)){pnGo(e,'pegstuck',P3?90:115);e.vul=e.tm;pop(e.x,LY,e.z+250,'DŘEVĚNÁ NOHA V PALUBĚ!','#9fe09a');sfx('pnPeg',e.x)}else pnGo(e,'land',26)}return}
 if(B=='land'){if(f>=26)fin(P3?20:30);return}
 if(B=='pegstuck'||B=='stuck'||B=='dazed'){e.kb=0;if(B=='pegstuck'&&f%18==0)sfx('pnWood',e.x);if(e.tm<=0){if(B=='pegstuck'){spawnP(e.x-fw*20,LY,10,'#8a6040',3,30,e.z);pop(e.x,LY,e.z+240,'¡Maldita tabla!','#ffcf8a')}fin(24)}return}
 if(B=='signal'){e.face=sd;if(f==16){bSay(e,['¡FUEGO, VIUDA!','¡Dělá, pal!','¡A discreción!'][(Math.random()*3)|0],80,1);sfx('bosun',e.x)}if(f==22)pnVolley(P3?6:4,{boss:1,T:80,quiet:1});if(f>=70)fin();return}
 if(B=='parrot'){e.face=sd;if(f==10)bSay(e,'¡Chili, al ataque!',70,1);if(f==16)pnParLaunch(e);if(f>=40)fin();return}
 if(B=='whistle'){e.face=sd;if(f==12){sfx('bosun',e.x);bSay(e,'¡A mí, muchachos!',70,1)}if(f==20)pnLaunch(2,P3?1:0,{boss:1,quiet:1});if(f>=52)fin();return}
 if(B=='hurt'||B=='tired'){if(e.tm<=0)fin();return}
 fin()}
{const _bx=bossX;bossX=function(e,dx,dz,ad,adz,sd){if(e.B=='adm'&&pnOn()){const prev=e.bst;try{pnAI(e,dx,dz,ad,adz,sd)}catch(er){console.error('pnAI',er);pnGo(e,'idle',40)}try{bTalk(e,prev)}catch(er){}return}return _bx(e,dx,dz,ad,adz,sd)}}
/* telegraf výpadu */
{const _bf=bFx;bFx=function(){_bf();try{const e=bossE;if(e&&e.B=='adm'&&e.st!='dead'&&e.bst=='lunge'&&e.f2<34&&pnOn()){const x=e.x-cam,y=LY-e.z-90,L=Math.min(240,Math.abs(p.x-e.x)+60);X.save();X.strokeStyle='rgba(255,70,40,'+(.35+.35*Math.sin(T*.5))+')';X.lineWidth=4;X.setLineDash([12,8]);X.lineDashOffset=-T*3;X.beginPath();X.moveTo(x,y);X.lineTo(x+e.face*L,y);X.stroke();X.restore()}}catch(er){}}}

/* =====================================================================
   SCÉNY: nástup kapitána (šplhá z člunu po háku) a jeho porážka
   ===================================================================== */
BDK.pkhat={hh:18,rest:0};BDK.pksab={hh:10,rest:Math.PI/2+.25,oy:34};
function pkPieceAt(k,cx,cy,x,y,a,s){const d=PKA.p['pk_'+k],im=PKI['pk_'+k];if(!d||!im)return;X.save();X.translate(x,y);X.rotate(a);X.scale(s,s);X.drawImage(im,d.ox-cx,d.oy-cy,d.w,d.h);X.restore()}
{const _d=bDebDraw;bDebDraw=function(){const M=BDB.filter(o=>o.k=='pkhat'||o.k=='pksab');if(!M.length)return _d();const A=BDB;BDB=A.filter(o=>!M.includes(o));try{_d()}finally{BDB=A}
 for(const o of M){const x=o.x-cam;if(x<-200||x>W+200)continue;const s=(o.s||1)*.25;if(o.k=='pkhat')pkPieceAt('hat',530,120,x,LY-o.z-16,o.a,s*(o.f||1));else pkPieceAt('sab',728,330,x,LY-o.z-12,o.a,s)}}}
const PKW=(c,q)=>Math.sign(q.x-p.x)||1;
BPS.adm={dur:600,c5:1,
 cam(c,t,q){return(p.x+q.x)/2},
 upd(c,t,q){const s=PKW(c,q);
  if(t==1){c.qo={w:640,h:720};c.hideQ=1;c.noFace=1;q.x=c.bx;q.z=-96;q.gf=0;q.face=-s;q.pks=1;c.clip=1;bpPose(q,'climb',60);PN.capB&&(PN.capB.capOn=0)}
  /* 1) háky zaklesnou, člun narazí */
  if(t<70){c5Shot(c,(p.x+c.bx)/2,150,1.05,.06,t==1);if(t==8)sfx('pnHook',c.bx);if(t==22)sfx('pnHook',c.bx+30);if(t==24)c5Say('KAKTUS','Háky na zábradlí… Teď přijde šéf.');q.z=-96}
  /* 2) šplhá po háku */
  if(t>=70&&t<140){const u=tiE.io(tiS(t,70,140));q.z=-96+96*u;bpPose(q,'climb',60);c5Shot(c,q.x,120,1.35,.07);if(t%16==0)sfx('pnHook',q.x);if(t==90)c5Say('KAPITÁN CALAVERA','Harrr… Kdo mi to potápí čluny?')}
  /* 3) přeskok zábradlí ve zpomalení */
  if(t>=140&&t<178){c.clip=0;c.hideQ=0;const u=tiS(t,140,178);q.z=Math.sin(u*Math.PI)*120;q.x=c.bx;bpPose(q,'vault',30);c5Shot(c,q.x,q.z+130,1.45,.12);if(t==150)c5Slow(c,22,.35);if(t==144){sfx('whoosh',q.x);sfx('pnSquawk',q.x)}}
  if(t==178){q.z=0;shake=12;sfx('heavy',q.x);sfx('pnPeg',q.x);ring(q.x,LY,100,'rgba(255,255,255,.6)',18,0);spawnP(q.x,LY,16,'#8a6040',4,10,0)}
  if(t>=178&&t<200){q.z=0;bpPose(q,'land',30)}
  /* 4) představení */
  if(t>=200&&t<300){q.z=0;q.face=-s;bpPose(q,t<250?'idle':'point',60);c5Two(c,q,1.3,.06);if(t==206){c5Say('KAPITÁN CALAVERA','Kapitán Calavera, pán Černé vdovy. Baron platí za tvou pichlavou hlavu zlatem.',150);sfx('vAdm',q.x)}
   if(t==262)c5Say('CHILI','¡Cra! ¡Zlato! ¡Zlato! Pichlavý kaktus!',90)}
  if(t>=300&&t<380){bpPose(q,'laugh',60);c5Shot(c,q.x-s*30,170,1.55,.07);if(t==300)c5Say('KAKTUS','Tvoji kluci už plavou. Chceš se k nim přidat?');if(t==344){c5Say('KAPITÁN CALAVERA','¡Jajaja! Odvážný bodlák.');sfx('vAdm',q.x)}}
  /* 5) Vdova vypálí varovnou salvu za Kaktuse */
  if(t>=380&&t<470){bpPose(q,'signal',60);c5Two(c,q,1.12,.06);if(t==386)c5Say('KAPITÁN CALAVERA','¡Viuda! ¡Fuego!');
   [400,410,420].forEach((tt,i)=>{if(t==tt){PNS.fl[i*2+1]=9;sfx('cannon')}if(t==tt+40){const x=p.x-s*(140+i*70);sfx('splash');shake=Math.max(shake,5);for(let k=0;k<14;k++)par.push({x:x+R(-10,10),y:LY,z:-10,vx:R(-1.5,1.5),vz:R(4,9),l:R(30,46),c:'#e6f4f8',s:R(2,4)})}})}
  /* 6) en garde */
  if(t>=470){bpPose(q,'point',60);c5Two(c,q,1.25,.07);if(t==476){c5Say('KAPITÁN CALAVERA','Moje Vdova tě má na mušce. ¡En garde, cactus!',110);sfx('vAdm',q.x)}if(t==540){c5Say('CHILI','¡Al ataque! ¡Cra!');sfx('pnSquawk',q.x)}if(t==520)c5Aim()}
  c.ex=q.x},
 front(c,t,q){if(c.clip&&c.hideQ){X.save();X.beginPath();X.rect(-200,-2000,W+400,LY-26+2000);X.clip();q.t2=T;pkDraw(q,{noShd:1,noTrail:1});X.restore();
   const x=q.x-cam;X.save();X.fillStyle='#2a2a2e';X.strokeStyle='#5a4020';X.lineWidth=2;[-20,24].forEach(o=>{X.beginPath();X.moveTo(x+o,LY-30);X.lineTo(x+o,LY-22);X.stroke();X.beginPath();X.arc(x+o,LY-31,3.5,0,7);X.fill()});X.restore()}}};
POST.adm={dur:560,c5:1,
 init(c){const ms=deco.filter(d=>d.k=='mast');const m=ms.sort((a,b)=>Math.abs(a.x-c.ex)-Math.abs(b.x-c.ex))[0];c.m=m;c.tx=m?m.x+6:c.ex;c.qo={w:640,h:720};c.ropes=0;c.sab=null;c.hat=null;c.par=null;c.q.pks=1;c.q.lost={};c.lost={};PN.par=null},
 upd(c,t,q){const s=Math.sign(q.x-p.x)||1,m=c.m;
  if(t<70){q.x=c.ex;q.z=c.ez;bpPose(q,'tired',30);q.face=-s;c5Two(c,q,1.3,.06,t==0);if(t==10)c5Say('KAPITÁN CALAVERA','¡Imposible! Porazil mě… kaktus?!');if(t==40)sfx('pnSquawk',q.x)}
  /* poslední výpad: Kaktus uhne a vyrazí mu šavli */
  if(t>=70&&t<150){bpPose(q,t<92?'slash':'tired',t<92?40:30);if(t==74)c5Say('KAPITÁN CALAVERA','¡Muere!');if(t==86){c5Dodge(c,-s,1)}if(t==102){c5Punch(c);sfx('blade',q.x);sfx('punch',q.x);shake=8;q.lost={w:1};c.sab={x:q.x,z:180,vx:-s*0+(m?Math.sign(m.x-q.x):1)*5,vz:9,a:0,va:.42}}c5Shot(c,(p.x+q.x)/2,150,1.4,.08)}
  if(c.sab){const o=c.sab;if(!o.stuck){o.x+=o.vx;o.vz-=.4;o.z+=o.vz;o.a+=o.va;if(m&&Math.abs(o.x-m.x)<12&&o.z<300){o.stuck=1;o.x=m.x-Math.sign(o.vx)*8;o.a=Math.sign(o.vx)*(Math.PI/2+.2);sfx('blade',o.x);sfx('pnWood',o.x);shake=6}else if(o.z<=0){o.z=0;o.vz=0;o.vx=0;o.va=0;o.stuck=1;o.a=Math.PI/2+.25}}}
  /* papoušek uletí s kloboukem */
  if(t>=150&&t<260){bpPose(q,'tired',30);if(t==150){c.par={x:q.x-s*20,z:q.z+215,t:0};q.parOff=1;sfx('pnSquawk',q.x)}if(t==170){q.lost={w:1,hat:1};c.hat=1;sfx('cloth',q.x)}
   if(c.par){const o=c.par;o.t++;o.x+=o.t<30?-s*.5:3.2;o.z+=o.t<30?1.5:2.6}c5Shot(c,q.x+30,230,1.2,.06);if(t==176)c5Say('CHILI','¡Cra! ¡Adiós, capitán! ¡Klobouk je můj!');if(t==222)c5Say('KAPITÁN CALAVERA','¡Chili! ¡Traidor! ¡Vuelve!')}
  /* Vdova obrací kormidlo a odplouvá */
  if(t>=260&&t<330){PN.flee=Math.min(1,(PN.flee||0)+.02);c5Shot(c,cam+W*.7,260,1,.05);if(t==270)c5Say('KAKTUS','Tvoje Vdova odplouvá. Bez tebe.')}
  /* přivázání ke stěžni */
  if(t>=330&&t<350){const u=tiE.io(tiS(t,330,350));q.x=tiL(c.ex,c.tx,u);q.z=0;bpPose(q,'tired',30)}
  if(t>=350&&t<460){q.x=c.tx;q.z=0;bpPose(q,'tied',60);q.face=-1;const ph=Math.sin((t-350)*.16);p.x=c.tx+ph*70;p.vx=Math.cos((t-350)*.16)*11;p.face=Math.sign(p.vx)||1;c.ropes=Math.min(5,Math.floor((t-350)/18)+1);if((t-350)%18==0)sfx('cloth',q.x);c5Shot(c,c.tx,140,1.4,.08);if(t==360)c5Say('KAPITÁN CALAVERA','¡Oye! Takhle se s kapitánem nejedná!')}
  if(t>=460){q.x=c.tx;q.z=0;bpPose(q,'tied',60);q.face=-1;c5Walk(c.tx-130,2.4);c5Shot(c,c.tx-60,140,1.3,.05);if(t==466)c5Say('KAKTUS','Pojedeš s námi, kapitáne. Bez lodi, bez šavle… a bez klobouku.');if(t==520)c2Fid(C2HERO[SV.cls])}
  c.cx=null},
 front(c,t,q){adRopes(q.x,q.z,c.ropes||0);
  if(c.sab){const o=c.sab;pkPieceAt('sab',728,330,o.x-cam,LY-o.z,o.a,.25)}
  if(c.par&&t<300){const o=c.par,x=o.x-cam,y=LY-o.z;pnParrotAt(x,y,1,.3,1,'fly',T);if(c.hat)pkPieceAt('hat',530,120,x+4,y+22,.15,.17)}},
 fin(c){c.fx=c.tx;c.fz=110;c.lost={};ADT={x:c.tx,soot:0};ADQ.parOff=1;ADQ.lost={hat:1,w:1};PN.flee=1}};
/* odplouvající Vdova */
{const _p=pnShipPos;pnShipPos=function(){const r=_p();if(PN.flee){r.x+=PN.flee*PN.flee*900;r.y-=PN.flee*8}return r}}

/* =====================================================================
   HUD: časová osa abordáže + oznámení
   ===================================================================== */
function pnIcon(k,x,y,s,a){X.save();X.translate(x,y);X.scale(s,s);X.globalAlpha*=a;X.lineJoin='round';
 if(k=='boat'){X.fillStyle='#8a5a30';X.strokeStyle='#1a0e06';X.lineWidth=1.5;X.beginPath();X.moveTo(-9,-2);X.quadraticCurveTo(-8,4,-4,5);X.lineTo(5,5);X.quadraticCurveTo(9,3,10,-3);X.closePath();X.fill();X.stroke();X.fillStyle='#e8d0a0';X.beginPath();X.arc(-3,-5,2.2,0,7);X.arc(3,-5,2.2,0,7);X.fill()}
 else if(k=='vol'){X.fillStyle='#1a1a1e';X.beginPath();X.arc(0,0,5,0,7);X.fill();X.fillStyle='#ff8a3a';X.beginPath();X.arc(5,-4,2.4,0,7);X.fill()}
 else if(k=='cap'){X.fillStyle='#e8e2d4';X.beginPath();X.arc(0,-1,6,0,7);X.fill();X.fillRect(-3.5,3,7,4);X.fillStyle='#120e0c';X.beginPath();X.arc(-2.2,-1.5,1.6,0,7);X.arc(2.2,-1.5,1.6,0,7);X.fill()}
 else if(k=='ship'){X.fillStyle='#141212';X.beginPath();X.moveTo(-12,0);X.lineTo(12,0);X.lineTo(9,5);X.lineTo(-9,5);X.closePath();X.fill();X.fillRect(-1,-13,2,13);X.fillStyle='#2a2626';X.beginPath();X.moveTo(1,-12);X.lineTo(9,-3);X.lineTo(1,-2);X.closePath();X.fill();X.beginPath();X.moveTo(-1,-11);X.lineTo(-8,-3);X.lineTo(-1,-3);X.closePath();X.fill()}
 X.restore()}
function pnHud(){if(!pnOn()||state!='play'||TR2)return;const w=360,x0=W/2-w/2,y0=94,Tend=PNTL[PNTL.length-1][0];
 if(!(bossE&&bossE.B=='adm'&&bossE.st!='dead')){X.save();X.fillStyle='rgba(16,8,4,.62)';X.beginPath();X.roundRect(x0,y0,w,36,10);X.fill();X.strokeStyle='rgba(232,184,96,.45)';X.lineWidth=1.2;X.stroke();
  X.font='700 10px Georgia';X.fillStyle='#e8b860';X.textAlign='left';X.fillText('ABORDÁŽ',x0+10,y0+14);
  const lx0=x0+76,lx1=x0+w-14,ly=y0+20,k=Math.min(1,PN.t/Tend);X.strokeStyle='rgba(255,236,200,.25)';X.lineWidth=3;X.beginPath();X.moveTo(lx0,ly);X.lineTo(lx1,ly);X.stroke();X.strokeStyle='#e8b860';X.beginPath();X.moveTo(lx0,ly);X.lineTo(pkL(lx0,lx1,k),ly);X.stroke();
  PNTL.forEach((E,i)=>{if(E[1]=='warn')return;const x=pkL(lx0,lx1,E[0]/Tend),done=i<PN.ev;pnIcon(E[1],x,ly-(E[1]=='boat'?9:E[1]=='cap'?1:-9),E[1]=='cap'?1.3:1,done?.35:1)});
  pnIcon('ship',pkL(lx0,lx1,k),ly+2,1,1);
  const nx=pnNext();let txt='';if(PN.cap)txt='Kapitán Calavera připlouvá!';else if(nx){const sec=Math.max(0,Math.ceil((nx[0]-PN.t)/60)),nm=nx[1]=='boat'?'Další člun':nx[1]=='vol'?'Salva z děl':nx[1]=='cap'?'Kapitán':'Vdova';const busy=pnLive()+pnPending()*2>=9&&nx[1]!='vol'&&PN.t>=nx[0]-1;txt=busy?nm+' čeká – paluba je plná':nm+' za 0:'+String(sec).padStart(2,'0')}
  X.font='italic 10.5px Georgia';X.fillStyle='rgba(244,226,188,.85)';X.textAlign='left';X.fillText(txt,x0+10,y0+31);
  const live=pnLive(),pend=PN.boats.filter(b=>b.st=='row'||b.st=='lower').length;X.textAlign='right';X.fillStyle='#ffcf8a';X.fillText((pend?'čluny na vodě: '+pend+'  •  ':'')+'na palubě: '+live,x0+w-10,y0+31);X.restore()}
 if(PN.ann){const a=Math.max(0,Math.min(1,PN.ann.t/10,(220-PN.ann.t)/24));X.save();X.globalAlpha=a;X.textAlign='center';X.font='700 16px Georgia';X.lineWidth=5;X.strokeStyle='#120806';const y=bossE&&bossE.st!='dead'?120:150;X.strokeText(PN.ann.tx,W/2,y);X.fillStyle='#ffe2a0';X.fillText(PN.ann.tx,W/2,y);X.restore()}}
{const _h=hudX;hudX=function(){_h();try{pnHud()}catch(e){console.error('pnh',e)}}}

/* =====================================================================
   PŘEJMENOVÁNÍ A PŘÍBĚH
   ===================================================================== */
Object.assign(BD.adm,{n:'Kapitán Calavera',sub:'pán Černé vdovy',hp:60});
Object.assign(BPROF.adm,{n:'Kapitán Calavera',ep:'pán Černé vdovy',k:1.05,hx:14,hy:-190,c1:'#1a0606',c2:'#7a1612',ac:'#f2d27a',
 q:'„Baron platí za tvou hlavu zlatem. A já miluju zlato.“',rage:'¡Chili! ¡Viuda! ¡Todos al abordaje!',die:'Chili… kde jsi…',tn:['¡En garde!','Harrr!','Chili, klovni ho!','¡A los peces!'],sf:['blade','vAdm'],
 ban:['HLEDÁ SE','DOPADEN','ODMĚNA 7 500 $'],lost:{},pose:['signal',20],rp:['parrot',20]});

try{SUMA.adm=()=>'crew'}catch(e){}
try{STORY[1]='Kaktus naskočil na Baronovu loď se šťávou Srdce. Za ní se z mlhy vynořila Černá vdova Kapitána Calavery – a spouští čluny.'}catch(e){}
try{const i=EPP.findIndex(a=>a[0]=='adm');if(i>=0)EPP[i][1]='Kapitán Calavera'}catch(e){}
try{QBOSS[1]='kapitána Calaveru'}catch(e){}
try{ADQ.parOff=1;ADQ.lost={hat:1,w:1}}catch(e){}
try{if(typeof ACH2!='undefined'&&!ACH2.some(a=>a[0]=='sunk'))ACH2.push(['sunk','Dělostřelec',n=>'Potop palubním dělem '+n+' '+qPl(n,'člun','čluny','člunů'),()=>pgSV().sunk|0,[2,6,15]])}catch(e){}

/* v93: základní trailer končí před přehlídkou bossů – zůstává jen závěrečná karta KAKTUS */
{const i=TRB3.findIndex(b=>b.k=='boss'),f=TRB3.find(b=>b.k=='final');if(i>=0)TRB3.splice(i,TRB3.length-i,...(f?[f]:[]))}
