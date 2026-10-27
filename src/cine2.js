/* =====================================================================
   v84: FILMOVÉ PŘECHODY MEZI ÚROVNĚMI
   režisér kamery (záběry, nájezdy, zoom, zpomalení), světlo a efekty,
   nové scény konců kapitol: důl (výtah), step (výhled na pevnost),
   pevnost (pád vlajky, ohňostroj, odjíždějící expres) …
   ===================================================================== */
const C2={k:null,fx:[],flash:0,white:0,ov:null,back:null,front:null,sh:0};
const c2E=u=>{u=Math.max(0,Math.min(1,u));return u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2};
const c2S=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
const c2L=(a,b,u)=>a+(b-a)*u;
/* klíčové snímky kamery: [[t, x, z, zoom], …] → plynule */
function c2Path(K,t){if(t<=K[0][0])return K[0].slice(1);for(let i=0;i<K.length-1;i++){const a=K[i],b=K[i+1];if(t<=b[0]){const u=c2E((t-a[0])/(b[0]-a[0]));return[c2L(a[1],b[1],u),c2L(a[2],b[2],u),c2L(a[3],b[3],u)]}}return K[K.length-1].slice(1)}
/* zaměř bod světa (x, výška z) doprostřed obrazu se zoomem */
function c2Look(x,z,zoom){B1C.z=B1C.zt=zoom;cam=x-W/2;camZ=Math.max(-26,(H*.64-(H*.12)/zoom)-LY+z)}
/* titulek s mluvčím (filmová vrstva) */
function c2Sub(who,txt,L){CINL.sub=CINL.sub.filter(s=>s.l<s.L-12);if(CINL.sub.length>1)CINL.sub.shift();CINL.sub.push({txt,who:who||'',c:'#fff',l:0,L:L||Math.max(110,46+txt.length*3.3)})}
/* částice ve světě */
function c2P(o){C2.fx.push(Object.assign({l:0,L:60,vx:0,vz:0,g:0,dr:1,s:3,c:'#fff',k:'dot',a:1,rot:0,vr:0},o))}
function c2Reset(){C2.fx=[];C2.flash=0;C2.white=0;C2.ov=C2.back=C2.front=null;B1C.z=B1C.zt=1;B1C.slow=1;B1C.vigT=0}
/* ---------- kreslení vrstev ---------- */
function c2DrawFx(){for(const f of C2.fx){const x=f.x-cam,y=LY-f.z;if(x<-120||x>W+120)continue;const u=f.l/f.L,a=f.a*Math.min(1,(1-u)*3,f.l/4);if(a<=0)continue;X.globalAlpha=a;
  if(f.k=='dot'){X.fillStyle=f.c;X.fillRect(x-f.s/2,y-f.s/2,f.s,f.s)}
  else if(f.k=='glow'){rgGlow(x,y,f.s,f.c,a)}
  else if(f.k=='smoke'){rgPuff(x,y,f.s*(1+u*1.6),a*.5,f.c)}
  else if(f.k=='streak'){X.strokeStyle=f.c;X.lineWidth=f.s;X.beginPath();X.moveTo(x,y);X.lineTo(x-f.vx*4,y+f.vz*4);X.stroke()}
  else if(f.k=='rock'){X.save();X.translate(x,y);X.rotate(f.rot);X.fillStyle=f.c;X.beginPath();X.moveTo(-f.s,-f.s*.6);X.lineTo(f.s*.7,-f.s);X.lineTo(f.s,f.s*.5);X.lineTo(-f.s*.4,f.s);X.closePath();X.fill();X.restore()}
  else if(f.k=='tumble')c2Tumble(x,y,f.s,f.rot,a);
  else if(f.k=='spark'){X.save();X.globalCompositeOperation='lighter';X.strokeStyle=f.c;X.lineWidth=f.s;X.beginPath();X.moveTo(x,y);X.lineTo(x-f.vx*2.5,y+f.vz*2.5);X.stroke();X.restore()}}
 X.globalAlpha=1}
function c2Tick(){for(const f of C2.fx){f.l++;f.x+=f.vx;f.z+=f.vz;f.vz-=f.g;f.vx*=f.dr;f.rot+=f.vr;if(f.fl!=null&&f.z<f.fl&&f.vz<0){f.z=f.fl;f.vz*=-.35;f.vx*=.7}}C2.fx=C2.fx.filter(f=>f.l<f.L);if(C2.flash>0)C2.flash=Math.max(0,C2.flash-.045)}
function c2Tumble(x,y,r,rot,a){X.save();X.translate(x,y-r);X.rotate(rot);X.globalAlpha*=a;X.strokeStyle='#8a6a3a';X.lineWidth=1.6;for(let i=0;i<9;i++){X.beginPath();X.ellipse(0,0,r*(.55+.45*hs(i)),r*(.35+.6*hs(i+4)),i*.7,0,7);X.stroke()}X.strokeStyle='#5a4220';X.lineWidth=1;for(let i=0;i<6;i++){X.beginPath();X.ellipse(0,0,r*.7,r*.4,i*1.1+.3,0,7);X.stroke()}X.restore()}
/* paprsky světla (obrazovka) */
function c2Rays(cx,cy,ang,spr,len,col,a,n){X.save();X.globalCompositeOperation='lighter';const t=T*.01;for(let i=0;i<(n||7);i++){const an=ang+(i/((n||7)-1)-.5)*spr+Math.sin(t+i*1.7)*.02,w=.025+.03*hs(i),al=a*(.35+.65*hs(i+3))*(.7+.3*Math.sin(t*2+i));
  const g=X.createLinearGradient(cx,cy,cx+Math.cos(an)*len,cy+Math.sin(an)*len);g.addColorStop(0,'rgba('+col+','+al+')');g.addColorStop(1,'rgba('+col+',0)');X.fillStyle=g;X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+Math.cos(an-w)*len,cy+Math.sin(an-w)*len);X.lineTo(cx+Math.cos(an+w)*len,cy+Math.sin(an+w)*len);X.closePath();X.fill()}X.restore()}
/* ohňostroj (obrazovka) */
function c2Firework(x,y,u,col,n,r){if(u<0||u>1)return;X.save();X.globalCompositeOperation='lighter';const R=r*Math.sqrt(u)*1.1,dr=60*u*u;for(let i=0;i<n;i++){const a=i/n*6.283+hs(i)*.2,px=x+Math.cos(a)*R,py=y+Math.sin(a)*R+dr,al=(1-u)*(.6+.4*Math.sin(u*40+i));
  X.strokeStyle='rgba('+col+','+al*.5+')';X.lineWidth=1.4;X.beginPath();X.moveTo(x+Math.cos(a)*R*.6,y+Math.sin(a)*R*.6+dr*.6);X.lineTo(px,py);X.stroke();X.fillStyle='rgba(255,250,230,'+al+')';X.fillRect(px-1.2,py-1.2,2.4,2.4)}rgGlow(x,y,r*1.2*(1-u),col,.5*(1-u));X.restore()}
/* ---------- napojení na hru ---------- */
{const _a=abyss;abyss=function(){_a();try{if(C2.back&&cut)C2.back(cut,cut.t)}catch(err){console.error('c2b',err)}}}
{const _d=dFx;dFx=function(){_d();try{if(C2.front&&cut)C2.front(cut,cut.t);c2DrawFx()}catch(err){console.error('c2f',err)}}}
{const _g=cineGrade;cineGrade=function(a){_g(a);try{if(C2.ov&&cut)C2.ov(cut,cut.t,a);if(C2.flash>0){X.fillStyle='rgba(240,244,255,'+Math.min(.85,C2.flash)+')';X.fillRect(0,0,W,H)}if(C2.white>0){X.fillStyle='rgba(255,252,240,'+Math.min(1,C2.white)+')';X.fillRect(0,0,W,H)}}catch(err){console.error('c2o',err)}}}
{const _u=upd;upd=function(){const k=state=='cut'&&cut?cut.k:null;if(k!==C2.k){if(C2.k&&C2SC[C2.k])c2Reset();C2.k=k}const r=_u();try{c2Tick()}catch(err){}return r}}
const C2SC={};
/* závěrečný banner kapitoly až na konci scény (nepřekrývá titulky) */
cineBanner=(function(_b){return function(){const B=CINL.ban;if(B&&C2SC[CINL.k]){const d=B.d,t0=B.t,s=d-125;if(t0<s)return;const tt=B.t;B.t=tt-s+30;try{_b()}finally{B.t=tt}return}return _b()}})(cineBanner);
/* gesta postavy na povel (klobouk, revolver, nůž, doutník, hůl…) */
const C2HERO=[0,1,0,2],C2COOL=[1,1,2,0];
function c2Fid(v){try{const s=HST.get(p);if(s){s.fid=1;s.fv=0;s.lfv=0;s.fvar=v;s.idle=0}}catch(err){}}
function c2Skip(c,end){if(c.t>30&&(P.Enter||P.Space||P.Escape)&&!c.skip){c.skip=1;c.t=end-1;fade=1}}
/* =====================================================================
   DŮL → výtah k povrchu
   ===================================================================== */
C2SC.lift=1;CEND.lift=400;
function c2Cage(d,x,y){const L=d.lift||0,top=y-L-150,fl=y-L;X.save();X.lineJoin='round';
 /* lano a kladka */X.strokeStyle='#1a1410';X.lineWidth=4;X.beginPath();X.moveTo(x,top-10);X.lineTo(x,-camZ-60);X.stroke();X.strokeStyle='#5a4e44';X.lineWidth=1.6;X.beginPath();X.moveTo(x-1,top-10);X.lineTo(x-1,-camZ-60);X.stroke();
 /* zadní mříž a podlaha */X.fillStyle='rgba(20,14,10,.55)';X.fillRect(x-48,top,96,150);X.strokeStyle='#3a2a1e';X.lineWidth=2;for(let i=-36;i<=36;i+=12){X.beginPath();X.moveTo(x+i,top+4);X.lineTo(x+i,fl-4);X.stroke()}
 /* lampa uvnitř */const fl2=.85+.15*Math.sin(T*.3);rgGlow(x+30,top+30,70,'255,180,90',.35*fl2);X.fillStyle='#2a2018';X.fillRect(x+25,top+16,10,14);X.fillStyle='rgba(255,200,120,'+fl2+')';X.fillRect(x+27,top+19,6,9);
 /* rám */X.fillStyle='#5a3a20';X.fillRect(x-52,top-12,104,14);X.fillRect(x-52,fl-6,104,10);X.fillRect(x-52,top-12,9,162);X.fillRect(x+43,top-12,9,162);
 X.strokeStyle='#1a0e06';X.lineWidth=2;X.strokeRect(x-52,top-12,104,14);X.strokeRect(x-52,fl-6,104,10);X.strokeRect(x-52,top-12,9,162);X.strokeRect(x+43,top-12,9,162);
 X.fillStyle='#8a8a92';[[-47,-6],[47,-6],[-47,fl-top-2],[47,fl-top-2]].forEach(([dx,dy])=>{X.beginPath();X.arc(x+dx,top+dy,2.2,0,7);X.fill()});
 /* třmen nahoře */X.strokeStyle='#2a2420';X.lineWidth=3;X.beginPath();X.moveTo(x-40,top-12);X.lineTo(x,top-34);X.lineTo(x+40,top-12);X.stroke();X.fillStyle='#4a4048';X.beginPath();X.arc(x,top-34,6,0,7);X.fill();
 /* páka */const la=d.lev||0;X.save();X.translate(x+40,fl-60);X.rotate(-.9+la*1.5);X.fillStyle='#2a2420';X.fillRect(-2,-34,4,34);X.fillStyle='#b02a1a';X.beginPath();X.arc(0,-34,5,0,7);X.fill();X.restore();
 X.restore()}
function c2CageFront(d,x,y){const L=d.lift||0,top=y-L-150,fl=y-L,g=d.gate||0;if(g<=0)return;X.save();const gh=150*g;X.strokeStyle='#6a6470';X.lineWidth=3;for(let i=-40;i<=40;i+=10){X.beginPath();X.moveTo(x+i,top+2);X.lineTo(x+i,top+gh);X.stroke()}X.strokeStyle='#3a3640';X.lineWidth=4;X.beginPath();X.moveTo(x-46,top+gh);X.lineTo(x+46,top+gh);X.moveTo(x-46,top+gh*.5);X.lineTo(x+46,top+gh*.5);X.stroke();X.strokeStyle='rgba(255,255,255,.18)';X.lineWidth=1;for(let i=-40;i<=40;i+=10){X.beginPath();X.moveTo(x+i-1,top+2);X.lineTo(x+i-1,top+gh);X.stroke()}X.restore()}
{const _dd=dDeco;dDeco=function(d){if(d.k=='cage'&&lv&&lv.k=='mine'){const x=d.x-cam,y=LY-d.z;if(x<-120||x>W+120)return;c2Cage(d,x,y);return}return _dd(d)}}
/* šachta: skála kolem, trámy, lucerny, světlo shora */
function c2ShaftBack(cg){const x0=cg.x-cam,base=LY-cg.z,L=cg.lift||0;if(L<4)return;X.save();X.globalAlpha=Math.min(1,L/60);
 const g=X.createLinearGradient(x0-70,0,x0+70,0);g.addColorStop(0,'#120c08');g.addColorStop(.5,'#22170f');g.addColorStop(1,'#120c08');X.fillStyle=g;X.fillRect(x0-72,-400,144,H+800);
 for(let z=Math.floor((L-300)/60)*60;z<L+800;z+=60){const y=base-z;X.fillStyle='rgba(0,0,0,.35)';X.fillRect(x0-72,y,144,2);X.fillStyle='rgba(255,200,140,.05)';X.fillRect(x0-60+hs(z)*80,y-20,30,1)}
 const top=1180,sy=base-top;if(sy>-500){const gg=X.createLinearGradient(0,sy-260,0,sy+80);gg.addColorStop(0,'rgba(255,250,235,1)');gg.addColorStop(1,'rgba(255,250,235,0)');X.fillStyle=gg;X.fillRect(x0-72,sy-500,144,580)}
 X.restore()}
function c2Shaft(cg,t){const x0=cg.x-cam,base=LY-cg.z,L=cg.lift||0,top=1180;if(L<4)return;X.save();X.globalAlpha=Math.min(1,L/60);
 for(let k=0;k<2;k++){const sd=k?1:-1;
  for(let z=Math.floor((L-400)/40)*40;z<L+800;z+=40){if(z>top+40)break;const y=base-z,j=hs(z*.07+k*3)*18,j2=hs(z*.07+k*3+40)*18,xi=x0+sd*(66+j),xi2=x0+sd*(66+j2),xo=x0+sd*W*1.2;
   X.fillStyle=((z/40)%3==0)?'#2c1e14':((z/40)%3==1)?'#251810':'#30221a';X.beginPath();X.moveTo(xi,y);X.lineTo(xo,y);X.lineTo(xo,y-41);X.lineTo(xi2,y-41);X.closePath();X.fill();
   X.strokeStyle='rgba(255,200,150,.08)';X.lineWidth=1;X.beginPath();X.moveTo(xi,y);X.lineTo(xi2,y-41);X.stroke();
   X.strokeStyle='rgba(0,0,0,.45)';X.beginPath();X.moveTo(xi,y);X.lineTo(xi+sd*(60+hs(z)*120),y-hs(z+1)*8);X.stroke();
   if((z/40)%7==3){X.fillStyle='#4a301a';X.fillRect(sd>0?xi:xi-150,y-24,150,15);X.strokeStyle='#1a0e06';X.lineWidth=1.5;X.strokeRect(sd>0?xi:xi-150,y-24,150,15);X.fillStyle='#8a8a92';X.beginPath();X.arc(xi+sd*10,y-16,2,0,7);X.fill()}
   if((z/40)%9==5){const lx=xi+sd*30,ly=y-30;rgGlow(lx,ly,70,'255,170,80',.5);X.fillStyle='#1a1410';X.fillRect(lx-6,ly-9,12,16);X.fillStyle='#ffc070';X.fillRect(lx-3.5,ly-6,7,9)}}}
 /* okraj ústí */const sy=base-top;if(sy>-60&&sy<H+60){X.fillStyle='#3a2a1a';X.fillRect(x0-W,sy-6,W-70,10);X.fillRect(x0+70,sy-6,W,10)}
 X.restore()}
CUTX.lift=c=>{const t=c.t,cg=deco.find(d=>d.k=='cage'),END=400;c2Skip(c,END);if(!cg){if(t>40){fade=0;endLevel()}return}
 if(t==1){C2.back=(c,t)=>c2ShaftBack(cg);C2.front=(c,t)=>{const x=cg.x-cam,y=LY-cg.z;c2CageFront(cg,x,y);c2Shaft(cg,t);if(cg.lift>10){/* jiskry na laně */if(T%3==0){const sx=cg.x+R(-3,3),sz=cg.z+cg.lift+190+R(0,20);c2P({x:sx,z:sz,vx:R(-2,2),vz:R(-1,3),g:.25,L:16,k:'spark',c:'#ffd27a',s:1.4})}}};
  C2.ov=(c,t,a)=>{const L=cg.lift||0;if(L>380){const k=Math.min(1,(L-380)/600);c2Rays(W/2,-40,Math.PI/2,1.1,H*1.2,'255,245,215',.22*k,9);const g=X.createLinearGradient(0,0,0,H*.6);g.addColorStop(0,'rgba(255,248,230,'+.5*k+')');g.addColorStop(1,'rgba(255,248,230,0)');X.fillStyle=g;X.fillRect(0,0,W,H*.6)}};
  cg.gate=0;cg.lev=0;cg.lift=0;B1C.vigT=.6}
 /* 1) dojde do klece */if(t<86){go(cg.x);if(Math.abs(p.x-cg.x)<4){p.vx=0;p.face=-1}}
 else{p.vx=0;p.x=cg.x}
 if(t==60)c2Sub('KAKTUS','Výtah k povrchu. Konečně čerstvý vzduch.');
 /* 2) mříž se zabouchne */if(t>=86&&t<100){cg.gate=Math.min(1,(t-86)/8);if(t==94){sfx('gate');shake=5;for(let i=0;i<12;i++)c2P({x:cg.x+R(-50,50),z:cg.z+150+R(0,10),vx:R(-.6,.6),vz:R(-.5,.5),g:.12,L:R(40,70),c:i%2?'#8a7a6a':'#5a4a3a',s:R(2,3.5),k:'rock',vr:R(-.2,.2),rot:R(0,6)})}}else if(t>=100)cg.gate=1;
 if(t==104){p.face=1}
 /* 3) páka */if(t>=120&&t<134){cg.lev=c2E((t-120)/14);if(t==128){sfx('clack');synth(()=>{TS.clank(1.1);TS.piston(.6)});shake=4;for(let i=0;i<10;i++)c2P({x:cg.x+40,z:cg.z+70,vx:R(-3,3),vz:R(1,4),g:.3,L:R(14,24),k:'spark',c:'#ffe28a',s:1.5})}}
 if(t==136)c2Sub('KAKTUS','Drž se, plechovko…');
 /* 4) jízda vzhůru */if(t>=140){const u=t-140;const sp=Math.min(5.4,.02*u*u*.09+u*.05);cg.lift=(cg.lift||0)+sp;if(u==0){sfx('chain');synth(()=>TS.rumble?TS.rumble(2,.5):0)}if(t%22==0)sfx('chain');
  if(t%3==0)c2P({x:cg.x+R(-60,60),z:cg.z+cg.lift+R(300,460),vx:R(-.3,.3),vz:R(-3,-6),g:.1,L:90,k:'rock',c:'#5a4a3a',s:R(1.5,3.5),vr:R(-.2,.2)});if(t%2==0)c2P({x:cg.x+R(-64,64),z:cg.z+cg.lift+R(0,300),vx:0,vz:-R(8,14),L:20,k:'streak',c:'rgba(255,220,180,.18)',s:1});
  if(t%40==0)shake=Math.max(shake,2)}
 p.z=cg.z+(cg.lift||0);
 /* kamera */const f=c2Path([[0,cg.x-120,cg.z+90,1.12],[86,cg.x,cg.z+90,1.2],[118,cg.x+10,cg.z+95,1.45],[150,cg.x,cg.z+100,1.32],[230,cg.x,cg.z+110,1.5],[300,cg.x,cg.z+110,1.25]],t);c2Look(f[0],(t>=140?p.z+(t<230?100:c2L(100,20,c2S(t,230,300))):f[1]),f[2]);
 if(t>=300)C2.white=Math.min(1,(t-300)/70);
 if(t==318)c2Sub('KAKTUS','Světlo! …Step.');
 if(t>=END){fade=0;C2.white=0;c2Reset();endLevel()}};
/* =====================================================================
   STEP → výhled na pevnost
   ===================================================================== */
C2SC.reach=1;CEND.reach=430;
/* vzdálená pevnost na mese (obrazovka) */
function c2Fort(x,y,s,t,lt){X.save();X.translate(x,y);X.scale(s,s);
 X.fillStyle='#2a1a2a';X.beginPath();X.moveTo(-260,40);X.lineTo(-190,-20);X.lineTo(-120,-34);X.lineTo(120,-34);X.lineTo(170,-18);X.lineTo(260,40);X.closePath();X.fill();
 X.fillStyle='#1c1220';X.fillRect(-110,-84,220,52);[-110,-40,30,90].forEach((tx,i)=>{X.fillRect(tx,-118-(i%2)*14,22,40+(i%2)*14);for(let m=0;m<3;m++)X.fillRect(tx-2+m*9,-124-(i%2)*14,6,8)});
 for(let i=0;i<9;i++){X.fillRect(-106+i*24,-92,12,10)}
 /* okna */for(let i=0;i<7;i++){const on=hs(i*7)>.3;if(!on)continue;const wx=-96+i*30,wy=-62+(i%2)*12;X.fillStyle='rgba(255,190,100,'+(.6+.3*Math.sin(t*.1+i))+')';X.fillRect(wx,wy,5,7)}
 /* reflektory */X.globalCompositeOperation='lighter';[[-99,-120],[101,-134]].forEach(([sx,sy],i)=>{const an=-Math.PI/2+Math.sin(t*.025+i*2.2)*.75,L=420,w=.09;const g=X.createLinearGradient(sx,sy,sx+Math.cos(an)*L,sy+Math.sin(an)*L);g.addColorStop(0,'rgba(255,245,210,'+.35*lt+')');g.addColorStop(1,'rgba(255,245,210,0)');X.fillStyle=g;X.beginPath();X.moveTo(sx,sy);X.lineTo(sx+Math.cos(an-w)*L,sy+Math.sin(an-w)*L);X.lineTo(sx+Math.cos(an+w)*L,sy+Math.sin(an+w)*L);X.closePath();X.fill();rgGlow(sx,sy,18,'255,240,200',.8*lt)});
 X.restore()}
function c2Storm(t,a){X.save();X.globalAlpha=a;for(let i=0;i<6;i++){const cx=((i*230+t*.35)%(W+400))-200,cy=70+hs(i)*50;rgPuff(cx,cy,140+hs(i+2)*80,.55,'40,30,60')}X.restore()}
CUTX.reach=c=>{const t=c.t,END=430,Ln=lv.len,ex=Ln-200;c2Skip(c,END);
 if(t==1){B1C.vigT=.5;c.tw=[];C2.ov=(c,t,a)=>{/* výhled */const k=c2S(t,130,200)*(1-c2S(t,330,370)),z=c2L(1,1.45,c2E(c2S(t,190,320)));if(k<=0)return;X.save();X.globalAlpha=k;
   const sky=X.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#2e2040');sky.addColorStop(.42,'#b0503c');sky.addColorStop(.6,'#f2a65a');sky.addColorStop(.75,'#7a3a24');sky.addColorStop(1,'#2a120a');X.fillStyle=sky;X.fillRect(0,0,W,H);
   /* slunce */const sx=W*.3,sy=H*.6;rgGlow(sx,sy,260,'255,170,90',.55);X.fillStyle='rgba(255,230,170,.95)';X.beginPath();X.arc(sx,sy,46,0,7);X.fill();
   X.translate(W/2,H*.62);X.scale(z,z);X.translate(-W/2,-H*.62);
   /* bouřka nad pevností */for(let i=0;i<7;i++){const cx=W*.48+i*70+Math.sin(t*.01+i)*20,cy=H*.18+hs(i)*50;rgPuff(cx,cy,110+hs(i+2)*70,.75,'34,24,44')}
   X.strokeStyle='rgba(120,110,150,.35)';X.lineWidth=1;for(let i=0;i<40;i++){const rx=W*.5+hs(i)*W*.5+((t*3)%30),ry=H*.25+hs(i+9)*H*.2;X.beginPath();X.moveTo(rx,ry);X.lineTo(rx-8,ry+26);X.stroke()}
   const mesa=(x,y,w,h,col,sd)=>{X.fillStyle=col;X.beginPath();X.moveTo(x-w/2-h*.5,y);X.lineTo(x-w/2,y-h*.92);X.quadraticCurveTo(x-w/2+8,y-h,x-w/2+20,y-h);X.lineTo(x+w/2-16,y-h);X.quadraticCurveTo(x+w/2-4,y-h,x+w/2,y-h*.9);X.lineTo(x+w/2+h*.55,y);X.closePath();X.fill();
    X.strokeStyle='rgba(0,0,0,.18)';X.lineWidth=2;for(let k=1;k<4;k++){X.beginPath();X.moveTo(x-w/2-h*.5*(k/4)+4,y-h*(1-k/4)*.92);X.lineTo(x+w/2+h*.55*(k/4)-4,y-h*(1-k/4)*.92);X.stroke()}};
   mesa(W*.12,H*.63,120,70,'rgba(150,80,70,.55)');mesa(W*.88,H*.64,160,60,'rgba(150,80,70,.5)');mesa(W*.32,H*.66,140,46,'#7a3a34');
   mesa(W*.6,H*.66,190,96,'#4a2228');c2Fort(W*.6,H*.66-96+34,.62,t,1);
   if(c.lb>0){X.globalCompositeOperation='lighter';X.strokeStyle='rgba(230,235,255,'+c.lb/8+')';X.lineWidth=3;X.beginPath();let lx=W*.66,ly=H*.15;X.moveTo(lx,ly);for(let i=0;i<6;i++){lx+=R(-26,26);ly+=26;X.lineTo(lx,ly)}X.stroke();X.globalCompositeOperation='source-over'}
   X.fillStyle='#2a140c';X.beginPath();X.moveTo(-40,H*.74);for(let x=-40;x<=W+40;x+=24)X.lineTo(x,H*.72-tiF(x*.02+5,2)*16);X.lineTo(W+40,H);X.lineTo(-40,H);X.closePath();X.fill();
   /* sup krouží */for(let i=0;i<3;i++){const a2=t*.02+i*2.1;c2Gull(W*.55+Math.cos(a2)*120,H*.3+Math.sin(a2)*30,.35,t+i*20,'rgba(30,14,20,.85)')}
   X.restore();X.save();X.globalAlpha=k;/* silueta Kaktuse přes rameno, s okrajovým světlem */const kz=c2L(2.6,3.1,c2S(t,150,330));try{tiHero(SV.cls,W*.2,H+40,kz,{t:T,every:2,face:1,tint:['rgba(16,8,8,.94)'],rim:'rgba(255,170,90,.9)',rdx:-3,rdy:1,ra:.9})}catch(err){}
   /* prach ve větru */X.fillStyle='rgba(255,210,160,.25)';for(let i=0;i<30;i++){const px=((i*97+t*5)%(W+100))-50,py=H*.4+hs(i)*H*.5;X.fillRect(px,py,10+hs(i+1)*20,1.4)}
   X.restore()};
  C2.front=(c,t)=>{for(const w of c.tw)c2Tumble(w.x-cam,LY-w.z,w.r,w.rot,1)}}
 /* vítr a koule chrastí */if(t%70==10&&t<300)c.tw.push({x:cam-60,z:0,vx:R(4,6),r:R(12,18),rot:0,vz:0});for(const w of c.tw){w.x+=w.vx;w.rot+=w.vx*.06;w.vz-=.4;w.z+=w.vz;const f=Math.max(0,floorAt(w.x,w.z+20,8));if(w.z<f){w.z=f;w.vz=R(2,4.5)}}c.tw=c.tw.filter(w=>w.x<cam+W+100);
 if(t%3==0)c2P({x:cam+R(0,W),z:R(10,260),vx:R(5,9),vz:R(-.3,.3),L:30,k:'streak',c:'rgba(255,220,180,.35)',s:1});
 if(t%40==0)synth(()=>TS.wind?TS.wind(1.5,.25):0);
 /* Kaktus jde na hranu */if(t<120)go(ex);else{p.vx=0;p.face=1}
 if(t==96)c2Sub('KAKTUS','Konec stepi. Dál je jen skála…');if(t==124)c2Fid(C2COOL[SV.cls]);
 if(t==150){CS2.sting&&CS2.sting(.7)}
 if(t==230){c.lb=8;C2.flash=.6;sfx('thunder')}if(c.lb>0)c.lb--;
 if(t==236)c2Sub('','Na obzoru se tyčí pevnost enemigos. Tam drží Baronovy zajatce.',150);
 if(t==300){c.lb=6;sfx('thunder')}
 if(t==372)c2Sub('KAKTUS','Tak jo. Jdu pro ně.');
 if(t>=376&&t<END-20){go(ex+80)}
 /* kamera */const f=c2Path([[0,p.x+60,p.z+80,1.18],[110,ex+40,p.z+90,1.3],[150,ex+80,p.z+80,1.12],[340,ex+80,p.z+80,1.12],[372,ex+10,p.z+90,1.55],[430,ex+60,p.z+90,1.3]],t);c2Look(f[0],f[1],f[2]);
 if(t>=END-40)fade=Math.min(1,(t-(END-40))/36);
 if(t>=END){fade=0;c2Reset();endLevel()}};
/* =====================================================================
   PEVNOST → pád vlajky, ohňostroj, odjíždějící expres
   ===================================================================== */
C2SC.fin=1;CEND.fin=490;
function c2Flag(x,y,a,burn,t,np){X.save();X.translate(x,y);if(!np){X.strokeStyle='#2a2024';X.lineWidth=5;X.beginPath();X.moveTo(0,0);X.lineTo(0,-170);X.stroke();X.fillStyle='#c8a050';X.beginPath();X.arc(0,-172,5,0,7);X.fill()}
 X.translate(0,-164+a*120);const wv=k=>Math.sin(t*.18+k*1.6)*6*(1-a*.5);X.fillStyle=burn>0?'#5a1010':'#a01818';X.beginPath();X.moveTo(0,0);for(let k=0;k<=5;k++)X.lineTo(k*16,wv(k)+(k?-2:0));for(let k=5;k>=0;k--)X.lineTo(k*16,46+wv(k));X.closePath();X.fill();
 X.fillStyle='#f0e0c0';X.beginPath();X.arc(36,22+wv(2),9,0,7);X.fill();X.fillStyle='#2a0a0a';X.fillRect(31,19+wv(2),3,3);X.fillRect(38,19+wv(2),3,3);X.fillRect(32,27+wv(2),8,2);
 if(burn>0){X.globalCompositeOperation='lighter';for(let i=0;i<8;i++){const fx=80-burn*80+hs(i)*20,fy=hs(i+3)*46,h=10+Math.sin(t*.5+i)*6;rgGlow(fx,fy,h*2,'255,140,40',.6);X.fillStyle='rgba(255,200,90,.8)';X.beginPath();X.moveTo(fx-4,fy);X.quadraticCurveTo(fx,fy-h*2,fx+4,fy);X.fill()}
  X.globalCompositeOperation='destination-out';X.fillRect(80-burn*80+10,-10,100,70)}
 X.restore()}
function c2Train(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#120a10';X.fillRect(-40,-26,60,22);X.fillRect(-30,-40,14,14);X.beginPath();X.moveTo(20,-4);X.lineTo(34,-4);X.lineTo(20,-22);X.closePath();X.fill();
 for(let i=0;i<4;i++){X.fillRect(-120-i*74,-24,68,20);X.fillStyle='rgba(255,200,120,.7)';for(let w=0;w<4;w++)X.fillRect(-114-i*74+w*16,-20,6,5);X.fillStyle='#120a10'}
 X.globalCompositeOperation='lighter';rgGlow(30,-14,40,'255,240,190',.9);const g=X.createLinearGradient(30,-14,240,0);g.addColorStop(0,'rgba(255,240,190,.4)');g.addColorStop(1,'rgba(255,240,190,0)');X.fillStyle=g;X.beginPath();X.moveTo(30,-16);X.lineTo(240,-40);X.lineTo(240,20);X.closePath();X.fill();X.globalCompositeOperation='source-over';
 for(let i=0;i<6;i++){const u=((t*.02+i/6)%1);rgPuff(-23-u*90,-44-u*30,8+u*26,.5*(1-u),'60,50,60')}X.restore()}
function c2Rocket(f,t){const u=(t-f.t)/f.up;if(u<0)return;X.save();X.globalCompositeOperation='lighter';if(u<1){const x=c2L(f.x0,f.x,u),y=c2L(H*.9,f.y,1-(1-u)*(1-u));for(let k=0;k<8;k++){const kk=k/8,yy=y+(1-kk)*0+k*8;X.fillStyle='rgba(255,220,160,'+(.6*(1-kk))+')';X.fillRect(x-1,yy,2,6)}rgGlow(x,y,10,'255,230,180',.8)}else c2Firework(f.x,f.y,(t-f.t-f.up)/70,f.c,34,f.r);X.restore()}
function c2Viaduct(t,k){/* střih: expres na viaduktu za pevností */X.save();X.globalAlpha=k;const sky=X.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#0c1028');sky.addColorStop(.6,'#2a2a52');sky.addColorStop(1,'#141428');X.fillStyle=sky;X.fillRect(0,0,W,H);
 X.fillStyle='rgba(235,235,255,.9)';X.beginPath();X.arc(W*.16,H*.26,26,0,7);X.fill();rgGlow(W*.16,H*.26,120,'200,210,255',.35);
 X.fillStyle='#1a1a36';X.beginPath();X.moveTo(0,H*.66);for(let x=0;x<=W;x+=30)X.lineTo(x,H*.6-tiF(x*.008+2,3)*70);X.lineTo(W,H);X.lineTo(0,H);X.closePath();X.fill();
 /* viadukt */const vy=H*.58;X.fillStyle='#0e0e20';X.fillRect(-20,vy,W+40,10);for(let a=0;a<9;a++){const ax=a*120-((t*.4)%120);X.beginPath();X.moveTo(ax,vy+10);X.lineTo(ax,H);X.lineTo(ax+18,H);X.lineTo(ax+18,vy+46);X.quadraticCurveTo(ax+60,vy+10,ax+102,vy+46);X.lineTo(ax+102,H);X.lineTo(ax+120,H);X.lineTo(ax+120,vy+10);X.closePath();X.fill()}
 c2Train(c2L(-160,W+760,c2S(t,334,440)),vy,2.1,t);
 X.fillStyle='#08080e';X.beginPath();X.moveTo(0,H);X.lineTo(0,H*.8);for(let x=0;x<=W;x+=20)X.lineTo(x,H*.8-tiF(x*.03+9,2)*26);X.lineTo(W,H);X.closePath();X.fill();
 X.restore()}
CUTX.fin=c=>{const t=c.t,END=490;c2Skip(c,END);
 if(t==1){c.fx0=p.x+230;B1C.vigT=.6;c.fw=[];c.fl={a:0,b:0,x:0,z:0,r:0,off:0};
  C2.front=(c,t)=>{const fz=Math.max(0,floorAt(c.fx0,1e4,8)),x=c.fx0-cam,y=LY-fz;if(!c.fl.off)c2Flag(x,y,0,c.fl.b,t);else{X.save();X.strokeStyle='#2a2024';X.lineWidth=5;X.beginPath();X.moveTo(x,y);X.lineTo(x,y-170);X.stroke();X.restore();
    /* utržená hořící vlajka odlétá */X.save();X.translate(c.fl.x-cam,LY-c.fl.z);X.rotate(c.fl.r);X.globalAlpha=Math.max(0,1-c.fl.off/140);c2Flag(0,164,0,Math.min(1,c.fl.b),t,1);X.restore()}};
  C2.ov=(c,t,a)=>{const k=c2S(t,40,200);if(k>0)c2Rays(W*.2,-60,1.05,.9,H*1.4,'200,215,255',.22*k,8);
   for(const f of c.fw)c2Rocket(f,t);
   const vk=c2S(t,318,334)*(1-c2S(t,438,452));if(vk>0)c2Viaduct(t,vk)}}
 p.vx=0;B1C.slow=t<60?.55:1;
 if(t%3==0)c2P({x:p.x+R(-300,300),z:R(0,40),vx:R(-.3,.3),vz:R(.6,1.6),L:R(60,110),k:'dot',c:i2c(t),s:R(1.5,3)});
 if(t==20)c2Sub('','Pevnost padla. Enemigos jsou poraženi.',130);
 /* vlajka hoří, utrhne se a vítr ji odnese */if(t==100){sfx('fuse');synth(()=>TS.crack?TS.crack(.8):0)}if(t>=100)c.fl.b=Math.min(1,(t-100)/70);
 if(t==150){c.fl.off=1;c.fl.x=c.fx0;c.fl.z=Math.max(0,floorAt(c.fx0,1e4,8))+164;c.fl.vx=.4;c.fl.vz=1.6;sfx('cloth');shake=2}
 if(c.fl.off){c.fl.off++;c.fl.x+=c.fl.vx;c.fl.z+=c.fl.vz;c.fl.vz=Math.max(.3,c.fl.vz-.01);c.fl.vx+=.012;c.fl.r+=.01;if(t%2==0)c2P({x:c.fl.x+R(10,80),z:c.fl.z+R(110,160),vx:R(-.6,.6),vz:R(.5,1.5),L:R(20,40),k:'glow',c:'255,150,60',s:R(4,8)})}
 if(t==136)c2Sub('KAKTUS','Sbohem, hadrová lebko.');
 /* ohňostroj nad pevností */if(t>=196&&t<318&&t%11==0){const col=['255,120,90','140,220,255','255,220,120','190,255,160','255,150,230'][(t/11|0)%5];const x=R(W*.15,W*.85);c.fw.push({x,x0:x+R(-40,40),y:R(80,200),t,up:26,c:col,r:R(70,110)});synth(()=>TS.thump(.35));if(t%22==0)sfx('boom')}
 if(t==222)c2Sub('','Osvobození vězni: ¡Viva el cactus! ¡Viva!',110);
 if(t==310){synth(()=>TS.whistle(2.4,.8))}
 if(t==340)c2Sub('KAKTUS','Ta píšťala… Baronův expres! Šťáva Srdce mi ujíždí!',130);
 if(t==452){c2Sub('KAKTUS','Ten vlak dostanu.');c2Fid(C2HERO[SV.cls])}
 if(t>=452&&t<END-12)go(p.x+3);
 const f=c2Path([[0,p.x,p.z+90,1.0],[96,p.x+30,p.z+90,1.42],[150,p.x+150,p.z+130,1.2],[196,p.x+60,p.z+200,1.0],[318,p.x+40,p.z+170,1.0],[452,p.x+10,p.z+90,1.55],[490,p.x+40,p.z+90,1.35]],t);c2Look(f[0],f[1],f[2]);
 if(t>=END-36)fade=Math.min(1,(t-(END-36))/32);
 if(t>=END){fade=0;c2Reset();endLevel()}};
function i2c(t){return['rgba(255,180,90,1)','rgba(255,120,60,1)','rgba(255,220,140,1)'][t%3]}
/* =====================================================================
   OTEVŘENÉ MOŘE → pobřeží bažiny (obal původní scény: kamera, racci, světlo)
   ===================================================================== */
C2SC.shore=1;
function c2Coast(t,k,sw){/* bažina dalekohledem */X.save();const sky=X.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#7aa0a8');sky.addColorStop(.55,'#c8d8c8');sky.addColorStop(1,'#5a7a70');X.fillStyle=sky;X.fillRect(0,0,W,H);
 X.translate(W/2+sw[0],H/2+sw[1]);X.scale(1.15,1.15);X.translate(-W/2,-H/2);
 const hz=H*.58;/* vzdálené stromy */for(let l=0;l<3;l++){X.fillStyle=['rgba(90,120,100,.45)','rgba(60,90,70,.7)','#2e4a38'][l];for(let i=0;i<14;i++){const x=hs(i*3+l*9)*W*1.2-60,th=60+l*30+hs(i+l)*60,w=6+l*3;X.fillRect(x-w/2,hz-th+l*6,w,th);X.beginPath();X.ellipse(x,hz-th+l*6,th*.28,th*.08,0,0,7);X.fill();X.strokeStyle=X.fillStyle;X.lineWidth=1.4;for(let m=0;m<5;m++){X.beginPath();X.moveTo(x-th*.2+m*th*.1,hz-th+l*6);X.lineTo(x-th*.2+m*th*.1+Math.sin(t*.02+m)*2,hz-th+l*6+th*.3);X.stroke()}}}
 /* voda a mlha */X.fillStyle='#4a6a62';X.fillRect(-40,hz,W+80,H);X.strokeStyle='rgba(230,245,235,.35)';X.lineWidth=1.2;for(let i=0;i<14;i++){const y=hz+8+i*9,x=((i*97+t*.6)%(W+80))-40;X.beginPath();X.moveTo(x,y);X.lineTo(x+30+hs(i)*40,y);X.stroke()}
 /* potrubí a čerpací věž */X.strokeStyle='#22302a';X.lineWidth=9;X.beginPath();X.moveTo(-20,hz+2);X.bezierCurveTo(W*.3,hz-10,W*.45,hz+6,W*.62,hz-8);X.stroke();X.strokeStyle='rgba(120,255,170,'+(.45+.25*Math.sin(t*.1))+')';X.lineWidth=2.5;X.setLineDash([14,10]);X.lineDashOffset=-t*1.4;X.stroke();X.setLineDash([]);
 const tx=W*.64;X.fillStyle='#1c2a22';X.fillRect(tx-10,hz-130,20,130);X.fillRect(tx-40,hz-60,80,60);X.beginPath();X.moveTo(tx-26,hz-130);X.lineTo(tx,hz-158);X.lineTo(tx+26,hz-130);X.fill();rgGlow(tx,hz-90,90,'110,255,160',.35+.15*Math.sin(t*.1));X.fillStyle='rgba(160,255,190,.85)';X.fillRect(tx-4,hz-110,8,10);
 for(let i=0;i<6;i++)rgPuff(((i*190+t*.4)%(W+300))-150,hz-10+hs(i)*20,120,.35,'215,230,220');
 X.restore();
 /* clona dalekohledu */X.save();X.fillStyle='#000';X.beginPath();X.rect(0,0,W,H);X.moveTo(W/2+H*.42,H/2);X.arc(W/2,H/2,H*.42,0,Math.PI*2,true);X.fill('evenodd');const g=X.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*.43);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.85)');X.fillStyle=g;X.beginPath();X.arc(W/2,H/2,H*.43,0,7);X.fill();
 X.strokeStyle='rgba(255,255,255,.12)';X.lineWidth=2;X.beginPath();X.arc(W/2,H/2,H*.4,3.6,4.4);X.stroke();X.restore()}
function c2Gull(x,y,s,t,col){X.save();X.translate(x,y);X.scale(s,s);const f=Math.sin(t*.35)*.9;X.fillStyle=col||'#1a1a22';X.beginPath();X.moveTo(-26,-f*12);X.quadraticCurveTo(-12,-6-f*4,0,0);X.quadraticCurveTo(12,-6-f*4,26,-f*12);X.quadraticCurveTo(12,-2,0,4);X.quadraticCurveTo(-12,-2,-26,-f*12);X.fill();X.restore()}
{const _s=CUTX.shore;CUTX.shore=c=>{const t=c.t;_s(c);if(state!='cut'||!cut)return;
 if(t==1){B1C.vigT=.45;c.gl=[];C2.ov=(c,t,a)=>{const k=c2S(t,10,440);c2Rays(W*.86,-30,2.05,.8,H*1.3,'255,230,180',.16*(1-k*.6),7);
   for(const g of c.gl){const u=(t-g.t)/g.d;if(u<0||u>1)continue;c2Gull(c2L(g.x0,g.x1,u),g.y+Math.sin(u*6)*10,g.s,t+g.t,g.col)}
   if(t>300&&t<330){const u=(t-300)/30;X.fillStyle='rgba(255,255,255,'+(.12*(1-u))+')';X.fillRect(0,0,W,H)}
   const sk=c2S(t,168,178)*(1-c2S(t,286,296));if(sk>0){X.save();X.globalAlpha=sk;c2Coast(t,1,[Math.sin(t*.05)*6,Math.cos(t*.037)*4]);X.restore()}}}
 if(t==30||t==150||t==260)c.gl.push({t,d:120+R(0,40),x0:-80,x1:W+80,y:R(90,170),s:R(.9,1.4),col:'#141820'});if(t==60||t==200)c.gl.push({t,d:200,x0:W+60,x1:-60,y:R(120,200),s:R(.35,.5),col:'rgba(30,40,50,.8)'});
 if(t%4==0)c2P({x:p.x+R(80,300),z:R(20,90),vx:R(-3,-6),vz:R(1,3),g:.12,L:R(20,34),k:'dot',c:'rgba(230,245,255,.8)',s:R(1.5,3)});
 if(t==300){sfx('chain');sfx('splash',p.x+200);shake=3;synth(()=>TS.clank(.9))}if(t==150){c2Fid(C2COOL[SV.cls]);sfx('cloth')}if(t==168)synth(()=>TS.glint(.8));if(t==392)c2Fid(C2HERO[SV.cls]);
 c2Skip(c,526);
 const f=c2Path([[0,p.x+30,p.z+90,1.5],[70,p.x+40,p.z+95,1.45],[180,p.x+260,p.z+110,1.0],[330,p.x+420,p.z+130,1.22],[390,p.x+40,p.z+95,1.5],[526,p.x+60,p.z+95,1.35]],t);c2Look(f[0],f[1],f[2])}}
/* =====================================================================
   MOŘE – příjezd: pád z oblohy na palubu
   ===================================================================== */
C2SC.board=1;
CUTX.board=c=>{const t=c.t;fade=Math.max(0,1-t/22);SEA.off+=SEA.spd;
 if(t==1){p.z=1000;p.vz=0;p.x=300;B1C.vigT=.5;C2.ov=(c,t,a)=>{if(!c.ld){const k=c2S(t,0,60);X.save();X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,255,255,.18)';X.lineWidth=2;for(let i=0;i<14;i++){const x=(hs(i)*W),y=((hs(i+5)*H+t*24)%(H+200))-100;X.beginPath();X.moveTo(x,y);X.lineTo(x,y-60-hs(i)*60);X.stroke()}X.restore()}}}
 if(!c.ld){p.vz=Math.max(-14,p.vz-.55);p.z+=p.vz;p.vx=.6;p.on=false;p.face=1;p.ds=p.z<520&&p.z>240?10*(1-(p.z-240)/280):0;B1C.slow=p.z<330?.42:1;
  if(t%2==0)c2P({x:p.x+R(-10,10),z:p.z+R(40,90),vx:0,vz:R(2,4),L:14,k:'streak',c:'rgba(255,255,255,.5)',s:1.5});
  if(p.z<=110){p.z=110;p.vz=0;p.on=true;p.ds=0;p.ld=12;c.ld=t;B1C.slow=1;shake=12;stop=5;sfx('heavy');sfx('break');ring(p.x,LY,70,'rgba(255,255,255,.65)',18,110);spawnP(p.x,LY,18,'#c8b8a0',3,12,110);try{bpSplinters(p.x,112,12,'#8a5a30')}catch(err){}
   for(let i=0;i<20;i++)c2P({x:p.x+R(-30,30),z:112,vx:R(-4,4),vz:R(1,5),g:.25,L:R(20,40),k:'smoke',c:'220,205,180',s:R(8,16),fl:110});
   ens.filter(e=>Math.abs(e.x-p.x)<700&&e.st!='dead').forEach((e,i)=>setTimeout(()=>{try{pop(e.x,LY,e.z+140,'!','#ff8a5a')}catch(err){}},120+i*90))}}
 else{const u=t-c.ld;p.vx=0;p.cr=u<16?1:0;p.ld=Math.max(0,12-u);if(u==26)p.face=-1;if(u==44)p.face=1;
  if(u==20)c2Sub('PAQUITO','¡Santa María! Kaktus padá z nebe!',80);if(u==56){c2Sub('KAKTUS','Pardon, že ruším. Kdo tady velí?');c2Fid(C2HERO[SV.cls])}if(u==96)c2Sub('PAQUITO','Admirál Tiburón. A jeho posádka nemá ráda pasažéry…',100);
  if(u==150){try{say(hn[0].t);hn[0].d=1}catch(err){}}if(u>=160){B1C.z=B1C.zt=1;state='play';cut=null;return}}
 const f=c.ld?c2Path([[c.ld,p.x,p.z+80,1.5],[c.ld+50,p.x+20,p.z+90,1.42],[c.ld+96,p.x-60,p.z+90,1.3],[c.ld+160,p.x+120,p.z+80,1.0]],t):[p.x,Math.max(p.z+40,200),c2L(1.05,1.35,c2S(p.z,700,150))];c2Look(f[0],f[1],f[2])};
/* =====================================================================
   BAŽINA – příjezd lodí (obal: mlha, světlušky, záběry admirála, skok)
   ===================================================================== */
C2SC.sarr=1;
{const _s=CUTX.sarr;CUTX.sarr=c=>{const t=c.t;_s(c);if(state!='cut'||!cut)return;
 if(t==1){B1C.vigT=.55;C2.ov=(c,t,a)=>{c2Rays(W*.78,-40,1.95,.7,H*1.3,'190,230,200',.14,7);X.save();for(let i=0;i<6;i++){const fx=((i*190-t*.5)%(W+300)+W+300)%(W+300)-150,fy=H*.55+hs(i)*90;rgPuff(fx,fy,120+hs(i+3)*60,.18,'170,200,175')}X.restore()}}
 if(t%6==0)c2P({x:cam+R(0,W),z:R(40,260),vx:R(-.4,.4),vz:R(-.2,.3),L:R(60,120),k:'glow',c:'190,255,140',s:R(5,9),a:.8});
 const J0=300,J1=344,mx=(SWX!=null?SWX:SWF)+SWM,mz=LY-SWYD+200;
 if(t>J0&&t<J1)B1C.slow=t<J0+30?.45:1;else B1C.slow=1;
 if(t==J1){for(let i=0;i<22;i++)c2P({x:p.x+R(-20,20),z:p.z+4,vx:R(-3,3),vz:R(2,6),g:.3,L:R(20,36),k:'dot',c:i%2?'#3a4a22':'#6a7a3a',s:R(2,4),fl:p.z});for(let i=0;i<8;i++)c2P({x:p.x+R(-40,40),z:p.z+6,vx:R(-1,1),vz:R(.2,.8),L:R(40,70),k:'smoke',c:'160,190,150',s:R(10,18)})}
 if(t>J1+40){B1C.z=B1C.zt=1;return}
 let f;if(t<120)f=[c2L(cam+W/2,cam+W/2,0),200,1.0];
 else if(t<200)f=c2Path([[120,mx+40,mz,1.0],[160,mx,mz,1.6],[200,mx,mz,1.6]],t);
 else if(t<J0)f=c2Path([[200,mx,mz,1.6],[236,p.x,p.z+90,1.4],[J0,p.x+20,p.z+90,1.4]],t);
 else f=c2Path([[J0,p.x+20,p.z+90,1.35],[J1,p.x,p.z+90,1.5],[J1+40,p.x+120,p.z+90,1.0]],t);
 if(t<120){B1C.z=B1C.zt=1}else c2Look(f[0],f[1],f[2])}}
/* =====================================================================
   EXPRES – příjezd na koni (obal: rychlost, prach, zpomalený skok)
   ===================================================================== */
C2SC.trarr=1;
{const _s=CUTX.trarr;CUTX.trarr=c=>{const t=c.t;_s(c);if(state!='cut'||!cut||!TRA)return;
 if(t==1){B1C.vigT=.45;C2.ov=(c,t,a)=>{/* odlesk zapadajícího slunce */const sx=W*.72,sy=H*.38;X.save();X.globalCompositeOperation='lighter';rgGlow(sx,sy,160,'255,190,120',.35);[[.3,14,'255,220,150'],[.55,8,'255,160,120'],[.8,20,'200,220,255']].forEach(([k,r,col])=>rgGlow(sx+(W/2-sx)*k*2,sy+(H/2-sy)*k*2,r,col,.35));X.restore();
   const sp=t<132?1:0;if(sp){X.save();X.strokeStyle='rgba(255,240,220,.22)';X.lineWidth=1.4;for(let i=0;i<16;i++){const y=60+hs(i)*(H-120),x=W-((t*26+i*130)%(W+200));X.beginPath();X.moveTo(x,y);X.lineTo(x+60+hs(i)*80,y);X.stroke()}X.restore()}}}
 if(t<132&&t%2==0)c2P({x:TRA.hx-40+R(-10,10),z:R(0,20),vx:R(-3,-5),vz:R(.4,1.6),L:R(30,50),k:'smoke',c:'190,150,110',s:R(10,20)});
 if(t>=128&&t<150)B1C.slow=.4;else B1C.slow=1;
 if(t>=228){B1C.z=B1C.zt=1;return}
 const f=c2Path([[0,TRA.hx+180,140,1.0],[60,TRA.hx+80,120,1.25],[120,TRA.hx+60,130,1.45],[140,p.x,p.z+80,1.65],[170,p.x+40,p.z+80,1.3],[228,p.x+200,p.z+60,1.0]],t);c2Look(Math.max(W/2-260,f[0]),f[1],f[2])}}
/* =====================================================================
   LEVIATAN – příjezd: vůz do hangáru, Baron (obal: kamera, pára, záře)
   ===================================================================== */
C2SC.lvarr=1;
{const _s=CUTX.lvarr;CUTX.lvarr=c=>{const t=c.t;_s(c);if(state!='cut'||!cut||!LVA)return;const A=LVA,q=A.q;
 if(t==1){B1C.vigT=.6;C2.ov=(c,t,a)=>{const pu=.5+.5*Math.sin(t*.08);X.save();X.globalCompositeOperation='lighter';rgGlow(W*.82,H*.45,320,'90,255,140',.12+.06*pu);X.restore();
   if(t>=200&&t<300){const k=Math.min(1,(t-200)/16,(300-t)/16);X.fillStyle='rgba(0,0,0,'+.25*k+')';X.fillRect(0,0,W,H)}}}
 if(t%9==0)c2P({x:R(0,420),z:R(0,60),vx:R(-.5,.5),vz:R(1,2.4),L:R(50,80),k:'smoke',c:'220,230,225',s:R(14,24),a:.6});
 if(t<170&&t%5==0)c2P({x:160+R(-6,6),z:A.lift+150,vx:R(-2,2),vz:R(0,3),g:.3,L:18,k:'spark',c:'#ffe28a',s:1.3});
 if(t==200){synth(()=>TS.braam?TS.braam(1,0):0);shake=4}
 if(t>=140&&t<165)B1C.slow=.5;else B1C.slow=1;
 if(t>=418){B1C.z=B1C.zt=1;return}
 const hz=A.lift+40;let f;
 if(t<140)f=[200,Math.max(110,hz),c2L(1.15,1.35,t/140)];
 else if(t<200)f=c2Path([[140,p.x,p.z+80,1.35],[200,p.x+60,p.z+80,1.15]],t);
 else if(t<300)f=c2Path([[200,q.x+10,190,1.0],[226,q.x+10,200,1.45],[300,q.x+20,200,1.45]],t);
 else f=c2Path([[300,p.x+20,p.z+80,1.55],[372,p.x+30,p.z+80,1.5],[418,p.x+160,p.z+80,1.0]],t);
 c2Look(Math.max(W/2-80,f[0]),f[1],f[2])}}
/* =====================================================================
   konce Expresu a Leviatana: zavírací clona místo prostého zatmění
   ===================================================================== */
C2SC.trend=1;C2SC.lvend=1;
function c2Iris(c,t){const u=c2E(Math.min(1,t/40)),r=c2L(Math.hypot(W,H),0,u),px=(p?p.x-cam:W/2),py=p?LY-p.z-70+camZ:H/2;X.save();X.fillStyle='#000';X.beginPath();X.rect(0,0,W,H);X.moveTo(px+Math.max(0,r),py);X.arc(px,py,Math.max(0,r),0,Math.PI*2,true);X.fill('evenodd');if(r>4){X.strokeStyle='rgba(201,169,90,.6)';X.lineWidth=3;X.beginPath();X.arc(px,py,r,0,7);X.stroke()}X.restore()}
['trend','lvend'].forEach(k=>{CUTX[k]=c=>{fade=0;if(c.t==1){C2.ov=(c,t)=>c2Iris(c,t);synth(()=>TS.thump(.8))}if(c.t>52){c2Reset();endLevel()}}});
/* =====================================================================
   BAŽINA – konec: Baronova mapa (kamera po trase, lucerna, pečeť)
   ===================================================================== */
C2SC.trail=1;
{const _s=CUTX.trail;CUTX.trail=c=>{const t=c.t;_s(c);if(state!='cut'||!cut)return;
 if(t==1){B1C.vigT=.5}
 if(!c.got){const f=c2Path([[0,p.x,p.z+90,1.1],[60,(p.x+c.mx)/2,p.z+100,1.2]],t);c2Look(f[0],f[1],f[2])}
 else{const u=t-c.got;if(u<5)B1C.slow=.45;else B1C.slow=1;const f=c2Path([[0,p.x,p.z+90,1.25],[20,p.x,p.z+100,1.6],[70,p.x,p.z+100,1.7]],u);c2Look(f[0],f[1],f[2]);if(u==2){for(let i=0;i<16;i++)c2P({x:p.x+R(-20,20),z:p.z+R(80,130),vx:R(-2,2),vz:R(-1,2),L:R(30,50),k:'glow',c:'255,230,150',s:R(4,8)})}}
 if(MAPO){const m=MAPO,k=c2E(c2S(m.t,40,300));m.z=1+.32*k;m.ox=W/2-(W/2+120*k*1.32)*m.z/m.z;m.ox=(W/2)*(1-m.z)-110*k;m.oy=(H/2)*(1-m.z)+70*k;if(m.t==236){synth(()=>TS.thump(1));shake=3}}}}

/* mluvčí titulků ve scénách přechodů */
{const _w=cineWho;cineWho=function(x){const c=cut;if(c&&c.k=='sarr'&&!(p&&Math.abs(x-p.x)<70))return'ADMIRÁL TIBURÓN';return _w(x)}}
