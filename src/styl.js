/* =====================================================================
   v96: „TOTÁLNÍ STYL“ – šťavnaté cutscény 2. a 3. levelu
   impact framy, zastavení času, rázové vlny, rychlostní čáry, švihy
   kamery, jiskry, třísky, bahno a voda – nad původní režií scén
   (moře: pád na palubu, nástup a porážka Calavery, pobřeží;
    bažina: vplutí lodi a skok, nástup a porážka La Sombry)
   ===================================================================== */
const JZ={fl:0,fc:'255,250,235',inv:0,ln:0,lc:'255,255,255',lx:.5,ly:.55,pu:0,wh:0,wd:1,vl:0,last:-99,tint:0,tc:'255,70,40',seed:0};
function jzOn(){return state=='cut'&&!!cut&&!!lv&&(lv.k=='sea'||lv.k=='swamp')&&!TR2}
/* světový bod → obrazovka (stejná transformace jako draw(): zoom kolem W/2, H*.64) */
function jzScr(x,z){const Z=B1C.z||1,wx=x-cam,wy=LY-z+camZ;return[(wx-W/2)*Z+W/2,(wy-H*.64)*Z+H*.64]}
function jzAim(x,z){const s=jzScr(x,z);JZ.lx=Math.max(.15,Math.min(.85,s[0]/W));JZ.ly=Math.max(.2,Math.min(.8,s[1]/H))}
/* úder: zastavení času, otřes, nájezd kamery, záblesk, impact frame, rázová vlna, prach, jiskry, třísky */
function jzHit(x,z,pw,o){o=o||{};pw=pw||1;
 stop=Math.max(stop,o.stop!=null?o.stop:Math.round(3+pw*3));shake=Math.max(shake,5+pw*7);JZ.pu=Math.max(JZ.pu,.05+pw*.07);
 JZ.fl=Math.max(JZ.fl,.1+.13*pw);JZ.fc=o.fc||'255,250,235';if(pw>=1.1&&!o.noInv)JZ.inv=2;
 jzAim(x,z+40);JZ.ln=Math.max(JZ.ln,8+pw*12);JZ.lc=o.lc||'255,255,255';
 ring(x,LY,50+pw*60,o.rc||'rgba(255,255,255,.85)',16+pw*4,z);ring(x,LY,24+pw*30,'rgba(255,240,200,.9)',10,z+30);
 const dc=o.dust||'210,200,180';for(let i=0;i<10+pw*10;i++)c2P({x:x+R(-20,20)*pw,z:z+R(2,14),vx:R(-5,5)*pw,vz:R(.4,2.6),g:.04,dr:.92,L:R(26,52),k:'smoke',c:dc,s:R(8,16)*(.7+pw*.4),fl:z});
 const sc=o.spark||'#fff2c0';for(let i=0;i<8+pw*9;i++){const a=R(0,6.283),v=R(4,11)*Math.min(1.6,pw);c2P({x,z:z+40,vx:Math.cos(a)*v,vz:Math.sin(a)*v,g:.22,dr:.95,L:R(10,22),k:'spark',c:sc,s:R(1.5,3)})}
 if(o.deb)for(let i=0;i<6+pw*6;i++)c2P({x:x+R(-12,12),z:z+10,vx:R(-6,6),vz:R(3,10),g:.45,L:R(34,64),k:'rock',c:o.deb,s:R(3,6),vr:R(-.4,.4),fl:z})}
/* švih / skok: rychlostní čáry a šmouhy kolem těla */
function jzRush(x,z,pw){jzAim(x,z);JZ.ln=Math.max(JZ.ln,10+pw*14);JZ.fl=Math.max(JZ.fl,.08*pw)}
function jzSmear(x,z,vx,vz,c){for(let i=0;i<2;i++)c2P({x:x+R(-14,14),z:z+R(10,110),vx:vx*.25,vz:vz*.25,L:9,k:'streak',c:c||'rgba(255,255,255,.6)',s:R(1.4,2.8)})}
/* dramatické zamrznutí (vrchol skoku) */
function jzFreeze(x,z,n,tc){stop=Math.max(stop,n||9);JZ.tint=Math.max(JZ.tint,.55);JZ.tc=tc||'255,70,40';JZ.pu=Math.max(JZ.pu,.16);jzAim(x,z);JZ.ln=Math.max(JZ.ln,30)}
function jzSplash(x,z,pw,mud){const c1=mud?'#4a5a2a':'#e6f4f8',c2=mud?'#6a7a3a':'#bfe6f5';for(let i=0;i<14+pw*12;i++)c2P({x:x+R(-16,16),z:z+4,vx:R(-4,4)*pw,vz:R(4,11)*pw,g:.35,L:R(26,44),k:'dot',c:i%2?c1:c2,s:R(2,5),fl:z-2})}
function jzFeathers(x,z){const C=['#d8322a','#2a6ad8','#f4c030','#3aa04a'];for(let i=0;i<16;i++)c2P({x,z,vx:R(-3,3),vz:R(-1,3),g:.04,dr:.96,L:R(40,80),k:'rock',c:C[i%4],s:R(2,3.5),vr:R(-.3,.3)})}

/* ---------- automatická šťáva ze zvuků scény ---------- */
const JZS={heavy:1,break:.85,boom:1.3,punch:.8,blade:.6,pnWood:.7,pnPeg:.45,splash:.7,snipe:.5,cannon:.5,chain:.4,smoke:.7};
function jzAuto(n,x){const pw=JZS[n],q=cut&&cut.q;let x0=x==null?(q&&n!='splash'?q.x:p.x):x,z0;
 if(p&&Math.abs(x0-p.x)<70)z0=p.z;else if(q&&Math.abs(x0-q.x)<150)z0=q.z||0;else z0=Math.max(0,floorAt(x0,1e4,8));
 if(n=='cannon'||n=='snipe'){JZ.fl=Math.max(JZ.fl,.14);JZ.pu=Math.max(JZ.pu,.05);shake=Math.max(shake,4);return}
 if(n=='splash'){if(x==null)return;jzHit(x0,z0,pw,{dust:'225,238,244',spark:'#e8f8ff',noInv:1,stop:2});jzSplash(x0,z0,.8,lv.k=='swamp');return}
 if(n=='smoke'){for(let i=0;i<18;i++)c2P({x:x0+R(-30,30),z:z0+R(20,90),vx:R(-3,3),vz:R(-.5,1.5),dr:.95,L:R(50,90),k:'smoke',c:'200,205,195',s:R(16,30)});JZ.fl=Math.max(JZ.fl,.3);JZ.fc='235,235,225';return}
 jzHit(x0,z0,pw,{deb:n=='break'||n=='pnWood'?'#8a5a30':null,noInv:pw<1.1})}
{const _s=sfx;sfx=function(n,x){try{if(JZS[n]&&jzOn()&&T-JZ.last>3){JZ.last=T;jzAuto(n,x)}}catch(e){console.error('jz',e)}return _s.apply(this,arguments)}}

/* ---------- kamera: nájezd při úderu, švih při střihu ---------- */
{const _l=c2Look;c2Look=function(x,z,zoom){return _l(x,z,zoom+(jzOn()?JZ.pu:0))}}
{const _s=c5Shot;c5Shot=function(c,x,z,zm,sp,ct){if(ct&&c&&c.t>2&&jzOn()&&C5.c===c){JZ.wh=7;JZ.wd=Math.sign(x-C5.cx)||1}return _s.apply(this,arguments)}}

/* ---------- tik (běží i během zastavení času) ---------- */
{const _u=upd;upd=function(){if(JZ.inv>0)JZ.inv--;if(JZ.wh>0)JZ.wh--;JZ.fl=Math.max(0,JZ.fl-.07);JZ.ln=Math.max(0,JZ.ln-1);JZ.pu*=.86;JZ.tint=Math.max(0,JZ.tint-.05);JZ.vl=Math.max(0,JZ.vl-.08);JZ.seed++;
 if(!jzOn()&&JZ.inv)JZ.inv=0;return _u.apply(this,arguments)}}

/* ---------- obrazovkové vrstvy ---------- */
function jzLines(cx,cy,a,col,n,r0){X.save();X.globalCompositeOperation='source-over';X.fillStyle='rgba('+col+','+a+')';const D=Math.hypot(W,H);for(let i=0;i<n;i++){const an=hs(i*3.1+JZ.seed*.73)*6.283,w=.006+hs(i+JZ.seed)*.016,r1=r0*(.85+hs(i*7+JZ.seed)*.5);
  X.beginPath();X.moveTo(cx+Math.cos(an)*r1,cy+Math.sin(an)*r1);X.lineTo(cx+Math.cos(an-w)*D,cy+Math.sin(an-w)*D);X.lineTo(cx+Math.cos(an+w)*D,cy+Math.sin(an+w)*D);X.closePath();X.fill()}X.restore()}
function jzDraw(){if(!jzOn()&&!(JZ.fl>0))return;X.save();X.setTransform(1,0,0,1,0,0);const cx=JZ.lx*W,cy=JZ.ly*H;
 /* impact frame: převrácené barvy + černé paprsky */
 if(JZ.inv>0&&jzOn()){X.globalCompositeOperation='difference';X.fillStyle='#fff';X.fillRect(0,0,W,H);X.globalCompositeOperation='saturation';X.fillStyle='#808080';X.fillRect(0,0,W,H);
  X.globalCompositeOperation='overlay';X.drawImage(C,0,0,W,H);X.drawImage(C,0,0,W,H);X.globalCompositeOperation='source-over';jzLines(cx,cy,.95,'0,0,0',50,H*.16);X.restore();return}
 /* rychlostní čáry */
 if(JZ.ln>0&&jzOn()){const a=Math.min(.75,JZ.ln/26);jzLines(cx,cy,a*.55,JZ.lc,38,H*.3)}
 /* pád: svislé čáry */
 if(JZ.vl>0&&jzOn()){const va=Math.min(.6,JZ.vl*.42);for(let i=0;i<18;i++){const x=hs(i*5.3)*W,l=160+hs(i*2)*260,y=H+l-((T*46+i*137)%(H+l*2)),w=2+hs(i*3)*5;
   const g=X.createLinearGradient(0,y,0,y+l);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.7,'rgba(255,255,255,'+va+')');g.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=g;X.fillRect(x-w/2,y,w,l)}
  jzLines(cx,cy,Math.min(.3,JZ.vl*.2),'255,255,255',30,H*.34)}
 /* švih kamery */
 if(JZ.wh>0&&jzOn()){const k=JZ.wh/7;X.globalAlpha=.55*k;X.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<30;i++){const y=hs(i*4.7+JZ.seed*.3)*H,h=1+hs(i)*3,l=W*(.3+hs(i*2.2)*.6),x=(hs(i*6.1+JZ.seed)*W)-l*.5;X.fillRect(x,y,l,h)}X.globalAlpha=.22*k;X.fillStyle='#fff';X.fillRect(0,0,W,H);X.globalAlpha=1}
 /* barevný nádech zamrznutí */
 if(JZ.tint>0&&jzOn()){X.globalCompositeOperation='multiply';X.fillStyle='rgba('+JZ.tc+','+(JZ.tint*.45)+')';X.fillRect(0,0,W,H);X.globalCompositeOperation='source-over';
  const g=X.createRadialGradient(cx,cy,H*.15,cx,cy,H*.9);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(.55*JZ.tint)+')');X.fillStyle=g;X.fillRect(0,0,W,H)}
 /* záblesk */
 if(JZ.fl>0){X.fillStyle='rgba('+JZ.fc+','+Math.min(.7,JZ.fl)+')';X.fillRect(0,0,W,H)}
 /* tah vinětou při nájezdu */
 if(JZ.pu>.03&&jzOn()){const g=X.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.95);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+Math.min(.45,JZ.pu*2.4)+')');X.fillStyle=g;X.fillRect(0,0,W,H)}
 X.restore()}
{const _h=hud;hud=function(){const r=_h.apply(this,arguments);try{jzDraw()}catch(e){console.error('jzd',e)}return r}}

/* =====================================================================
   MOŘE – pád z oblohy na palubu: svislé čáry, šmouhy, superhrdinský dopad
   ===================================================================== */
{const _b=CUTX.board;CUTX.board=c=>{const ld0=c.ld;_b(c);if(!jzOn()||cut!==c)return;const t=c.t;
 if(!c.ld){JZ.vl=Math.max(JZ.vl,.7+Math.min(1,-p.vz/14)*.7);jzAim(p.x,p.z+60);jzSmear(p.x,p.z,0,-p.vz*1.2,'rgba(255,255,255,.7)');if(t%10==0)JZ.pu=Math.max(JZ.pu,.04)}
 else if(!ld0){JZ.vl=0;jzHit(p.x,110,1.9,{deb:'#8a5a30',dust:'225,210,185',stop:9});for(let i=0;i<10;i++)c2P({x:p.x+R(-60,60),z:112,vx:R(-7,7),vz:R(5,12),g:.5,L:R(40,70),k:'rock',c:i%2?'#a06a38':'#6a4224',s:R(4,8),vr:R(-.5,.5),fl:110});
  c.jzsl=30;JZ.tint=.5;JZ.tc='255,190,120'}
 if(c.ld){const u=t-c.ld;if(u<34)p.cr=1;if(u>0&&u<28&&u%4==0)c2P({x:p.x+R(-50,50),z:112,vx:R(-1,1),vz:R(.2,.8),L:40,k:'smoke',c:'220,205,180',s:R(10,18)})}
 if(c.jzsl>0){c.jzsl--;B1C.slow=c.jzsl>0?.32:1}}}

/* =====================================================================
   MOŘE – nástup Calavery: jiskry háků, šplh, zamrznutí ve skoku, dopad, salva
   ===================================================================== */
{const S=BPS.adm,u0=S.upd;S.upd=function(c,t,q){u0.call(this,c,t,q);if(!jzOn())return;const s=PKW(c,q);
 if(t==8||t==22)jzHit(c.bx+(t==22?30:0),24,.4,{noInv:1,stop:2,spark:'#ffe0a0',dust:'200,210,220'});
 if(t>=70&&t<140&&t%3==0)jzSmear(q.x,q.z-40,0,4,'rgba(230,240,255,.45)');
 if(t==141){jzRush(q.x,q.z+130,1.4);jzSplash(q.x,-6,1,0)}
 if(t>=140&&t<178)jzSmear(q.x,q.z+20,0,(t<159?6:-6),'rgba(255,255,255,.6)');
 if(t==159)jzFreeze(q.x,q.z+140,10,'255,60,40');
 if(t==178){jzHit(q.x,0,1.7,{deb:'#8a5a30',stop:8});c5Slow(c,18,.4)}
 [400,410,420].forEach((tt,i)=>{if(t==tt){JZ.fl=Math.max(JZ.fl,.18);JZ.fc='255,220,170';JZ.pu=Math.max(JZ.pu,.05)}if(t==tt+40){const x=p.x-s*(140+i*70);jzHit(x,0,.8,{dust:'225,238,244',spark:'#e8f8ff',noInv:1,stop:3});jzSplash(x,0,1.2,0)}});
 if(t==476||t==540)JZ.pu=Math.max(JZ.pu,.1)};}

/* =====================================================================
   MOŘE – porážka Calavery: úskok, vyražená šavle, zásek do stěžně, peří
   ===================================================================== */
{const S=POST.adm,u0=S.upd;S.upd=function(c,t,q){const st0=c.sab&&c.sab.stuck;u0.call(this,c,t,q);if(!jzOn())return;
 if(t==86)jzRush(p.x,p.z+60,1.2);if(t>86&&t<100)jzSmear(p.x,p.z,-(Math.sign(q.x-p.x)||1)*8,0);
 if(t==102){jzHit(q.x,150,1.6,{spark:'#fff4c0',stop:10});c5Slow(c,26,.35);JZ.tint=.5;JZ.tc='255,210,120'}
 if(c.sab&&!c.sab.stuck&&t%2==0)c2P({x:c.sab.x,z:c.sab.z,vx:0,vz:0,L:12,k:'glow',c:'255,240,200',s:10,a:.5});
 if(c.sab&&c.sab.stuck&&!st0)jzHit(c.sab.x,c.sab.z,.9,{deb:'#8a5a30',spark:'#ffe8a0',noInv:1,stop:5});
 if(t==150)JZ.pu=Math.max(JZ.pu,.08);if(t==170&&c.par)jzFeathers(c.par.x,c.par.z);if(c.par&&t>170&&t<240&&t%6==0)jzFeathers(c.par.x,c.par.z-10);
 if(t>=350&&t<460&&(t-350)%18==0){jzRush(c.tx,140,.5);shake=Math.max(shake,2)}};}

/* =====================================================================
   MOŘE → pobřeží: tříšť od přídě, kotva s cákancem
   ===================================================================== */
{const _s=CUTX.shore;CUTX.shore=c=>{_s(c);if(!jzOn()||cut!==c)return;const t=c.t;
 if(t%54==20){const x=p.x+R(260,420);jzSplash(x,-4,1.1,0);JZ.pu=Math.max(JZ.pu,.03)}
 if(t==300)jzSplash(p.x+200,-4,1.6,0)}}

/* =====================================================================
   BAŽINA – vplutí lodi a skok: kotva, salto se šmouhami, zamrznutí, bahno
   ===================================================================== */
{const _s=CUTX.sarr;CUTX.sarr=c=>{_s(c);if(!jzOn()||cut!==c)return;const t=c.t,J0=300,J1=344;
 if(t==16)JZ.pu=Math.max(JZ.pu,.05);
 if(t==196){JZ.pu=Math.max(JZ.pu,.1);jzSplash(SWF+(JSL+60)*SWS,0,1.4,1)}
 if(t==J0){jzRush(p.x,p.z+60,1.4);JZ.fl=Math.max(JZ.fl,.15)}
 if(t>J0&&t<J1){const u=(t-J0)/(J1-J0);p.ds=u<.7?10*(1-u/.7):0;jzSmear(p.x,p.z,-5,u<.5?-6:6,'rgba(220,255,200,.55)');if(t==J0+20)jzFreeze(p.x,p.z+60,9,'120,255,150')}
 if(t==J1){p.ds=0;jzHit(p.x,p.z,1.5,{dust:'110,130,80',spark:'#c8ff8a',deb:'#3a4a22',stop:8});jzSplash(p.x,p.z,1.3,1);c.jzsl=22}
 if(c.jzsl>0){c.jzsl--;B1C.slow=c.jzsl>0?.4:1}}}

/* =====================================================================
   BAŽINA – nástup La Sombry: střepy lahví, skok se zamrznutím, dopad
   ===================================================================== */
{const S=BPS.n,u0=S.upd;S.upd=function(c,t,q){u0.call(this,c,t,q);if(!jzOn())return;
 if(c.bt)for(const b of c.bt)if(b.hit==t){jzHit(b.x,b.z-12,.6,{spark:'#c8ffc8',dust:'200,230,200',noInv:1,stop:4});for(let j=0;j<10;j++)c2P({x:b.x,z:b.z-12,vx:R(-5,5),vz:R(0,6),g:.3,L:R(24,40),k:'rock',c:'rgba(150,230,150,.9)',s:R(1.5,3),vr:R(-.6,.6)})}
 if(t>=160&&t<250&&t%34==0)JZ.pu=Math.max(JZ.pu,.05);
 if(t==320)jzRush(q.x,q.z+80,1.3);
 if(t>320&&t<366){const u=(t-320)/46;jzSmear(q.x,q.z,-q.face*5,u<.5?6:-6,'rgba(200,255,150,.5)');if(t==343)jzFreeze(q.x,q.z+90,9,'110,255,120')}
 if(t==366)jzHit(q.x,q.z,1.6,{dust:'110,130,80',spark:'#c8ff8a',deb:'#3a4a22',stop:8});
 if(t==452)JZ.pu=Math.max(JZ.pu,.08)};}

/* =====================================================================
   BAŽINA – porážka La Sombry: cvaknutí, dýmovnice, bahno, vytažení
   ===================================================================== */
{const S=POST.n,u0=S.upd;S.upd=function(c,t,q){u0.call(this,c,t,q);if(!jzOn())return;
 if(t==22||t==36){JZ.pu=Math.max(JZ.pu,.07);shake=Math.max(shake,3)}
 if(t==56)jzHit(q.x,c.ez+40,.9,{dust:'190,200,180',spark:'#e8ffe0',noInv:1,stop:5});
 if(t>60&&t<220&&t%9==0)c2P({x:q.x+R(-40,40),z:c.ez+2,vx:R(-.5,.5),vz:R(.5,1.5),L:30,k:'dot',c:'#6a7a3a',s:R(3,5)});
 if(t==240){jzHit(q.x,c.ez,1.3,{dust:'100,120,70',spark:'#c8ff8a',deb:'#3a4a22',stop:7});jzSplash(q.x,c.ez,1.4,1)}
 if(t==456){JZ.fl=Math.max(JZ.fl,.4);JZ.fc='225,230,215';JZ.pu=Math.max(JZ.pu,.1)}};}
