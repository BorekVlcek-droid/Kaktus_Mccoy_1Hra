/* =====================================================================
   v86: ÚPLNĚ NOVÉ SCÉNY BOSSŮ – nástupy všech osmi bossů a porážky šesti
   Každá scéna má vlastní děj, dialog s Kaktusem, akci a režii kamery.
   ===================================================================== */
const C5={c:null,cx:0,cz:0,zm:1,pu:0,ls:0};
/* oznámení úkolů až po scéně */
{const _t=qBanTick;qBanTick=function(){if(state=='cut')return;return _t()}}
{const _b=qBanners;qBanners=function(){if(state=='cut')return;return _b()}}
/* ---------- pomocníci ---------- */
function c5Say(who,txt,L){CINL.sub.length=0;c2Sub(who,txt,L||Math.max(100,40+txt.length*3.2))}
function c5Two(c,q,zm,sp,cut){const d=Math.abs(p.x-q.x),fit=Math.max(.95,Math.min(zm,W*.92/(d+340)));c5Shot(c,(p.x+q.x)/2,(p.z+q.z)/2+110,fit,sp,cut)}
function c5Shot(c,x,z,zm,sp,cut){c.c5k=[x,z,zm,sp||.08];if(cut)c.c5cut=1}
function c5Walk(tx,sp){const d=tx-p.x;if(Math.abs(d)>2){const v=Math.min(Math.abs(d),sp||1.8);p.x+=Math.sign(d)*v;p.vx=Math.sign(d)*v;p.face=Math.sign(d);return 0}p.vx=0;return 1}
function c5Dodge(c,dir,big){try{kHop(c,dir*(big?3.2:2.4),big?8.5:7)}catch(e){}c.c5flip=26;sfx('whoosh',p.x);for(let i=0;i<8;i++)c2P({x:p.x+R(-10,10),z:p.z+4,vx:R(-1.5,1.5),vz:R(.3,1.4),L:R(30,50),k:'smoke',c:'200,185,160',s:R(8,14)})}
function c5Punch(c){c.c5pt=20;sfx('punch',p.x)}
function c5Slow(c,n,f){B1C.slow=f||.45;c.c5sl=n}
function c5Aim(){if(SV.cls==0||SV.cls==2)p.aim=46;else c2Fid(C2COOL[SV.cls])}
function c5Arc(x0,z0,x1,z1,h,u){return[tiL(x0,x1,u),tiL(z0,z1,u)+h*Math.sin(Math.PI*u)]}
const c5X=x=>x-cam,c5Y=z=>LY-z;
/* ---------- rekvizity ---------- */
function c5Coin(x,y,a){X.save();X.translate(x,y);X.scale(Math.max(.15,Math.abs(Math.cos(a))),1);X.fillStyle='#ffd24a';X.strokeStyle='#8a6010';X.lineWidth=1.4;X.beginPath();X.arc(0,0,6,0,7);X.fill();X.stroke();X.fillStyle='#fff3b0';X.fillRect(-1,-3,2,6);X.restore();rgGlow(x,y,14,'255,220,120',.5)}
function c5Chest(x,y,open,t){X.save();X.translate(x,y);X.lineJoin='round';X.strokeStyle='#1a0e06';X.lineWidth=2;X.fillStyle='#6a3e1c';X.fillRect(-34,-36,68,36);X.strokeRect(-34,-36,68,36);X.fillStyle='#c9a040';X.fillRect(-34,-26,68,4);X.fillRect(-4,-30,8,10);
 X.save();X.translate(-34,-36);X.rotate(-open*1.9);X.fillStyle='#7a4a24';X.beginPath();X.moveTo(0,0);X.lineTo(68,0);X.quadraticCurveTo(68,-18,34,-20);X.quadraticCurveTo(0,-18,0,0);X.fill();X.stroke();X.restore();
 if(open>.2){X.fillStyle='#ffd24a';X.beginPath();X.ellipse(0,-36,30,8,0,0,7);X.fill();for(let i=0;i<7;i++){X.fillStyle=i%2?'#fff0a0':'#e8b830';X.beginPath();X.arc(-22+i*7,-40-hs(i)*6,4,0,7);X.fill()}rgGlow(0,-40,60,'255,220,120',.5+.15*Math.sin(t*.2))}X.restore()}
function c5Barrel(x,y,rot,boots,t){X.save();X.translate(x,y);X.rotate(rot);X.lineJoin='round';X.strokeStyle='#120a06';X.lineWidth=2;X.fillStyle=tiLG(-26,0,26,0,['#4a2c14','#8a5a30','#4a2c14']);X.beginPath();X.moveTo(-22,26);X.quadraticCurveTo(-30,0,-22,-26);X.lineTo(22,-26);X.quadraticCurveTo(30,0,22,26);X.closePath();X.fill();X.stroke();X.fillStyle='#3a3e46';[-18,12].forEach(yy=>X.fillRect(-26,yy,52,5));
 if(boots){const w=Math.sin(t*.5)*.3;[[-8,1],[8,-1]].forEach(([bx,s])=>{X.save();X.translate(bx,-26);X.rotate(w*s);X.fillStyle='#c8a070';X.fillRect(-5,-30,10,30);X.strokeRect(-5,-30,10,30);X.fillStyle='#2a1a10';X.beginPath();X.ellipse(s*4,-34,10,6,0,0,7);X.fill();X.stroke();X.restore()})}X.restore()}
function c5Parrot(x,y,t,f,col,perch){X.save();X.translate(x,y);X.scale(f,1);X.lineJoin='round';X.strokeStyle='#14100a';X.lineWidth=1.3;const fl=perch?0:Math.sin(t*.6);
 X.fillStyle=col||'#d8322a';X.beginPath();X.ellipse(0,0,9,6,-.2,0,7);X.fill();X.stroke();X.beginPath();X.moveTo(-8,2);X.lineTo(-20,10);X.lineTo(-16,2);X.closePath();X.fillStyle='#2a6ad8';X.fill();X.stroke();
 X.fillStyle=col||'#d8322a';X.beginPath();X.arc(8,-5,5,0,7);X.fill();X.stroke();X.fillStyle='#f0e0b0';X.beginPath();X.moveTo(12,-6);X.quadraticCurveTo(17,-5,14,0);X.lineTo(11,-3);X.closePath();X.fill();X.stroke();X.fillStyle='#000';X.fillRect(8,-7,1.6,1.6);
 X.fillStyle='#f4c030';X.beginPath();X.moveTo(-2,-2);X.quadraticCurveTo(-8,-12-fl*10,-16,-14-fl*12);X.lineTo(-6,2);X.closePath();X.fill();X.stroke();X.restore()}
function c5Sign(x,y,a,txt){X.save();X.translate(x,y);X.rotate(a);X.fillStyle='#6a4a2a';X.fillRect(-3,-70,6,70);X.fillStyle='#c8a070';X.strokeStyle='#3a2410';X.lineWidth=2;X.fillRect(-46,-92,92,30);X.strokeRect(-46,-92,92,30);X.fillStyle='#5a1a10';X.font='700 12px Georgia';X.textAlign='center';X.fillText(txt,0,-72);X.restore()}
function c5Bundle(x,y,a,s,lit,t){X.save();X.translate(x,y);X.rotate(a);X.scale(s,s);for(let i=-3;i<=3;i++){X.save();X.translate(i*7,0);bDyn(0,0,0,0);X.restore()}X.fillStyle='#3a2a1a';X.fillRect(-26,-4,52,5);X.restore();if(lit){const fx=x+Math.sin(a)*24*s,fy=y-Math.cos(a)*30*s;X.fillStyle=T%4<2?'#ffd44a':'#fff';X.beginPath();X.arc(fx,fy,3+Math.random()*3,0,7);X.fill();rgGlow(fx,fy,26,'255,200,90',.9)}}
function c5Helmet(x,y,a){X.save();X.translate(x,y);X.rotate(a);X.fillStyle='#e8b830';X.strokeStyle='#4a3010';X.lineWidth=2;X.beginPath();X.arc(0,0,18,Math.PI,0);X.lineTo(22,0);X.lineTo(-22,0);X.closePath();X.fill();X.stroke();X.fillStyle='#fff6c0';X.fillRect(-5,-14,10,7);X.restore()}
function c5Key(x,y,a,s){X.save();X.translate(x,y);X.rotate(a);X.scale(s||1,s||1);X.strokeStyle='#8a6010';X.fillStyle='#e8c040';X.lineWidth=2;X.beginPath();X.arc(-14,0,8,0,7);X.fill();X.stroke();X.fillRect(-6,-2.5,26,5);X.strokeRect(-6,-2.5,26,5);X.fillRect(14,2,4,7);X.fillRect(8,2,4,5);X.restore();rgGlow(x,y,26,'255,220,120',.6)}
function c5Bottle(x,y,col){X.save();X.translate(x,y);X.fillStyle=col||'rgba(120,200,120,.85)';X.strokeStyle='#14100a';X.lineWidth=1.2;X.beginPath();X.moveTo(-6,0);X.lineTo(6,0);X.lineTo(6,-16);X.lineTo(3,-20);X.lineTo(3,-28);X.lineTo(-3,-28);X.lineTo(-3,-20);X.lineTo(-6,-16);X.closePath();X.fill();X.stroke();X.strokeStyle='#5a4a3a';X.beginPath();X.moveTo(0,-28);X.lineTo(0,-60);X.stroke();X.restore()}
function c5Shards(x,y,age,n,col){if(age<0||age>40)return;for(let i=0;i<n;i++){const a=hs(i+x)*6.283,v=2+hs(i*3+x)*3;X.fillStyle=col||'rgba(180,255,180,'+(1-age/40)+')';X.fillRect(x+Math.cos(a)*v*age,y+Math.sin(a)*v*age+.15*age*age,3,3)}}
function c5Scroll(x,y,len,t){X.save();X.fillStyle='#ece0c0';X.strokeStyle='#6a5030';X.lineWidth=1.4;X.fillRect(x-14,y,28,len);X.strokeRect(x-14,y,28,len);X.fillStyle='#6a5030';for(let i=10;i<len-6;i+=9)X.fillRect(x-9,y+i,8+hs(i)*10,1.6);X.fillStyle='#c8b890';X.beginPath();X.ellipse(x,y+len,16,6,0,0,7);X.fill();X.stroke();X.restore()}
function c5Watch(x,y,t){X.save();X.translate(x,y);X.strokeStyle='#8a6010';X.lineWidth=1.5;X.beginPath();X.moveTo(0,-9);X.quadraticCurveTo(-14,-20,-22,-6);X.stroke();X.fillStyle='#e8c040';X.beginPath();X.arc(0,0,9,0,7);X.fill();X.stroke();X.fillStyle='#fff8e0';X.beginPath();X.arc(0,0,6.5,0,7);X.fill();X.strokeStyle='#2a1a0a';X.lineWidth=1.2;X.beginPath();X.moveTo(0,0);X.lineTo(0,-5);X.moveTo(0,0);X.lineTo(Math.cos(t*.1)*4,Math.sin(t*.1)*4);X.stroke();X.restore();rgGlow(x,y,18,'255,230,150',.4)}
function c5Smoke(x,y,age,n,r,col){if(age<0||age>90)return;for(let i=0;i<n;i++){const a=hs(i*7+x)*6.283,v=.6+hs(i*3)*1.6,k=age/90;rgPuff(x+Math.cos(a)*v*age,y+Math.sin(a)*v*age*.5-age*.4,r*(.6+k*1.6),(1-k)*.7,col||'200,200,200')}}
/* ---------- režie: kamera, zpomalení, salto, úder ---------- */
function c5Cam(c){const k=c.c5k;if(!k)return;const[x,z,zm,sp]=k;if(C5.c!==c||c.c5cut){C5.cx=x;C5.cz=z;C5.zm=zm;C5.c=c;c.c5cut=0}
 C5.cx+=(x-C5.cx)*sp;C5.cz+=(z-C5.cz)*sp;C5.zm+=(zm-C5.zm)*sp;if(shake>=8&&C5.ls<8)C5.pu=.16;C5.ls=shake;C5.pu*=.9;
 c2Look(C5.cx,C5.cz,C5.zm+C5.pu);const mx=lv.len-W+(lv.k=='port'?600:0);cam=Math.max(0,Math.min(mx,cam))}
function c5Tick(c){if(c.c5pt>0)p.pt=c.c5pt--;else if(c.c5pt===0){p.pt=0;c.c5pt=-1}
 if(c.c5sl>0&&--c.c5sl==0)B1C.slow=1;if(c.c5flip>0){c.c5flip--;p.ds=c.c5flip>4?10*(c.c5flip-4)/22:0}}
function c5End(c){if(state!='cut'||cut!==c){B1C.z=B1C.zt=1;B1C.slow=1;C5.c=null;p.ds=0;p.pt=0;p.aim=0}}
{const _b=CUTX.bpre;CUTX.bpre=c=>{_b(c);const S=BPS[c.k2];if(S&&S.c5){try{if(cut===c&&state=='cut'){c5Tick(c);c5Cam(c)}}catch(e){console.error('c5',e)}c5End(c)}}}
{const _b=CUTX.bpost;CUTX.bpost=c=>{_b(c);const S=POST[c.k2];if(S&&S.c5){try{if(cut===c&&state=='cut'){c5Tick(c);c5Cam(c)}}catch(e){console.error('c5',e)}c5End(c)}}}
const C5OLD={bps:Object.assign({},BPS),post:Object.assign({},POST)};

/* =====================================================================
   1) KAPITÁN ANCLA – „Výplata“: počítá zlato, mince se zakutálí ke
   Kaktusovi, ten ji hodí zpátky, Ancla ji kousne, výhrůžky, rozbije bedny
   ===================================================================== */
BPS.cap={dur:660,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){const LX=BX+PI2.LX,QX=LX+70,CX=LX+150,S=CAP.ship;
  if(t==1){q.x=QX;q.z=0;q.gf=0;q.face=-1;c.qo={w:620,h:700};c.noFace=1;c.cz=null;c.coins=[];if(S){S.x=BX+300;S.tilt=0;S.lit=1}c.px0=p.x}
  q.x=QX;q.z=0;q.face=t<230?1:-1;
  /* 1) Kaktus přichází, z dálky cinkot mincí */
  if(t<100){c5Walk(Math.min(c.px0+150,BX-140),1.5);c5Shot(c,p.x+160,110,1.15,.05);if(t%14==0)sfx('coin',QX);if(t==24)c5Say('KAPITÁN ANCLA','…čtyři sta jedna… čtyři sta dva… čtyři sta tři…')}
  /* 2) Ancla u truhly: mince letí do truhly */
  if(t>=100&&t<200){c5Shot(c,QX+30,120,1.35,.07,t==100);bpPose(q,t%28<14?'grab':'idle',40);if(t%14==0){c.coins.push({x:QX+30,z:130,vx:(CX-QX-30)/22,vz:4.4,l:0,L:22});sfx('coin',QX)}if(t==120)c5Say('KAPITÁN ANCLA','…a jedna pro Barona, dvě pro mě. Jo-jo.')}
  /* 3) jedna mince odskočí a kutálí se ke Kaktusovi */
  if(t==170){c.rc={x:CX,z:46,vx:-5.2,vz:5,a:0}}
  if(c.rc&&t<240){const r=c.rc;r.x+=r.vx;r.z+=r.vz;r.vz-=.4;if(r.z<=0){r.z=0;r.vz=0;r.vx*=.995}r.a+=.4;if(r.x<=p.x+18){r.x=p.x+18;r.vx=0}if(t>=176)c5Shot(c,r.x,40,1.7,.12)}
  if(t==200)sfx('coin',p.x);
  /* 4) Kaktus ji zvedne a hodí zpět, Ancla ji chytí a kousne */
  if(t>=240&&t<262){p.cr=1;c5Shot(c,p.x+20,70,1.9,.1)}if(t==262){p.cr=0;c.rc=null;c.fl={t:0}}
  if(c.fl){c.fl.t++;if(c.fl.t==1){sfx('whoosh',p.x);c5Punch(c)}if(c.fl.t>=34)c.fl.done=1}
  if(t>=262&&t<300)c5Shot(c,(p.x+QX)/2,120,1.2,.08);
  if(t==296){bpPose(q,'grab',60);sfx('grab',QX)}if(t>=300&&t<340){bpPose(q,'neck',40);c5Shot(c,QX,150,1.5,.1);if(t==312){sfx('crk',QX);pop(QX,LY,250,'křup','#f4e6c8')}}
  if(t==322)c5Say('KAPITÁN ANCLA','Pravá. Ne jako ty, zelenáči.');
  /* 5) rozhovor */
  if(t>=340&&t<430){bpPose(q,'point',30);c5Shot(c,QX-60,150,1.5,.06);if(t==346)c5Say('KAPITÁN ANCLA','Baron platí sud zlata za kaktus z Pueblo Seco. Živý, nebo naložený v láku.')}
  if(t>=430&&t<510){bpPose(q,'idle',40);c5Shot(c,p.x+50,100,1.75,.07);if(t==436){c5Say('KAKTUS','V těch sudech na lodi není zlato. Je v nich šťáva Srdce. Vracím si ji.');c2Fid(C2COOL[SV.cls])}}
  /* 6) smích a úder do beden */
  if(t>=510&&t<548){bpPose(q,'laugh',30);c5Shot(c,QX-20,150,1.45,.08);if(t==512){sfx('vCap',QX);c5Say('KAPITÁN ANCLA','¡Jo-jo-jo! Tak si pro ni pojď… přes mou mrtvolu!')}}
  if(t>=548&&t<590){bpPose(q,'slam',Math.max(0,40-(t-548)*2));q.face=-1;if(t==560){c.cr=1;stop=6;shake=18;B1C.flash=.6;sfx('heavy',LX);sfx('break',LX);try{cpSmash(LX,30)}catch(e){}bpSplinters(LX,60,18,'#8a5a30');ring(LX,LY,120,'rgba(255,230,170,.85)',22,0);spawnP(LX,LY,26,'#b08a5a',5,46,20);c5Slow(c,22,.4);
    for(let i=0;i<16;i++)c2P({x:LX+R(-30,30),z:R(30,90),vx:R(-5,5),vz:R(2,7),g:.3,L:R(30,50),c:'#9cff8a',s:R(3,5)})}c5Shot(c,LX+20,110,1.35,.1)}
  if(t>=590&&t<660){bpPose(q,t<620?'twirl':'roar',t<620?60:Math.max(0,110-(t-620)*2));c5Shot(c,(p.x+QX)/2,120,1.1,.06);if(t%10==0&&t<620)sfx('whoosh',QX);if(t==624){sfx('roar',QX);sfx('vCap',QX);shake=9}
   if(t==600)c5Say('','Býčí útok → vyskoč na paletu. Hvězdičky nad hlavou → mlať ho! Dělo [E] ho srazí k zemi.',160)}
  for(const m of c.coins){m.l++;m.x+=m.vx;m.z+=m.vz;m.vz-=.4}c.coins=c.coins.filter(m=>m.l<m.L);
  if(c.dust==null)c.dust=[]},
 back(c,t,q){const LX=BX+PI2.LX,CX=LX+150;c5Chest(c5X(CX),c5Y(0),1,t)},
 front(c,t,q){for(const m of c.coins)c5Coin(c5X(m.x),c5Y(m.z),m.l*.5);if(c.rc)c5Coin(c5X(c.rc.x),c5Y(c.rc.z+6),c.rc.a);
  if(c.fl&&!c.fl.done){const u=c.fl.t/34,[x,z]=c5Arc(p.x+20,90,BX+PI2.LX+90,150,90,u);c5Coin(c5X(x),c5Y(z),t*.6)}
  if(c.fl&&c.fl.done&&t<330){c5Coin(c5X(BX+PI2.LX+92),c5Y(152),0)}},
 fin(c){C5OLD.bps.cap.fin(c)}};

/* --- Ancla poražen: nabízí úplatek, spadne do sudu, sud doletí na loď, loď prchá --- */
POST.cap={dur:560,c5:1,
 init(c){b1Reset();CAP.shot=null;CAP.anc=null;c.qo={s:1,rot:0,w:620,h:700};c.lost={};c.q.lost={};c.bx=c.ex+c.dir*90;c.bz=0;c.brl=null;const S=CAP.ship;c.sx0=S?S.x:BX+300},
 upd(c,t,q){const S=CAP.ship;q.face=-c.dir;
  if(t<80){const u=tiE.o(tiS(t,0,70));q.x=tiL(c.ex,c.ex+c.dir*50,u);q.z=c.ez;bpPose(q,'dizzy',30);c.qo.rot=Math.sin(t*.15)*.06;c5Two(c,q,1.35,.06,t==0);if(t==10)c5Say('KAPITÁN ANCLA','Počkej… počkej, amigo! Dělíme se. Půl na půl, jo?')}
  else if(t<170){bpPose(q,'dizzy',30);c.qo.rot=Math.sin(t*.15)*.06;c5Walk(q.x-c.dir*80,3.2);c5Two(c,q,1.4,.06);if(t==96)c5Say('KAKTUS','Nabídni to poušti. Ta ti řekne cenu.')}
  else if(t<230){if(t==176){c5Punch(c);sfx('hit',q.x)}const u=tiS(t,180,214);c.qo.rot=-c.dir*u*1.6;q.x=c.ex+c.dir*(50+u*40);q.z=c.ez+30*Math.sin(Math.PI*u);bpPose(q,'hurt',20);c5Shot(c,q.x,110,1.8,.1);if(t==186)c5Slow(c,26,.4);
   if(t==214){c.hideQ=1;c.brl={x:c.bx,z:0,r:0,b:1};shake=10;sfx('heavy',c.bx);sfx('break',c.bx);spawnP(c.bx,LY,14,'#8a6040',4,30,10);pop(c.bx,LY,140,'BUMP!','#ffcf8a')}}
  else if(t<300){c5Shot(c,(p.x+c.bx)/2,90,1.6,.08);if(t==236)c5Say('KAPITÁN ANCLA','(ze sudu) ¡Sáquenme de aquí! Vytáhněte mě!');if(t==280)c5Walk(c.bx-c.dir*60,2)}
  else if(t<330){if(t==300){c5Punch(c);sfx('punch',c.bx);c.roll=1;shake=5}}
  if(c.roll&&c.brl){const b=c.brl;if(t<360){b.x+=c.dir*5.5;b.r+=c.dir*.22;if(t%6==0)sfx('thud',b.x)}else if(t<400){if(t==360){c.jx0=b.x;sfx('whoosh',b.x)}const u=(t-360)/40,tx=S?S.x+40:b.x+400,tz=S?piShipZ(PI2.DECK)+10:200;[b.x,b.z]=c5Arc(c.jx0,0,tx,tz,190,u);b.r+=c.dir*.3}
   else if(t==400){shake=12;sfx('break',b.x);sfx('heavy',b.x);bpSplinters(b.x,b.z,16,'#8a5a30');c.brl=null;pop(b.x,LY,b.z+60,'¡AAAY!','#ff8a5a')}
   c5Shot(c,b.x,Math.max(100,b.z+40),1.15,.09)}
  if(t>=400&&S){S.x+=Math.min(2.4,(t-400)*.04);S.tilt=Math.sin(t*.05)*.03;c5Shot(c,S.x-120,170,1.05,.04);if(t==412)c5Say('POSÁDKA','¡Kapitán na palubě! Plnou parou pryč!');if(t%30==0)sfx('creak',S.x)}
  if(t==470)c5Say('KAKTUS','Jedna loď šťávy se k Baronovi nedostane. Pozdravuj ho, kapitáne.');
  if(t>=470){c5Shot(c,p.x+60,100,1.4,.05);if(t==480)c2Fid(C2HERO[SV.cls])}},
 front(c,t,q){if(c.brl){const b=c.brl;c5Barrel(c5X(b.x),c5Y(b.z+26),b.r,1,t)}},
 fin(c){CAP.on=0;CAP.carry=0;c.fx=BX+40;c.fz=0;b1Reset();B1C.zt=1;if(CAP.ship){CAP.ship.cpt=null;CAP.ship.burn=0;CAP.ship.sink=400}}};

/* =====================================================================
   2) ADMIRÁL TIBURÓN – vystřelen z vlastního děla, papoušci, meč
   ===================================================================== */
function c5Bicorne(x,y,a){X.save();X.translate(x,y);X.rotate(a);X.fillStyle='#14141c';X.strokeStyle='#000';X.lineWidth=1.4;X.beginPath();X.moveTo(-26,0);X.quadraticCurveTo(0,-26,26,0);X.quadraticCurveTo(0,-8,-26,0);X.fill();X.stroke();X.fillStyle='#c9a040';X.beginPath();X.arc(0,-10,3,0,7);X.fill();X.restore()}
function c5Sword(x,y,a){X.save();X.translate(x,y);X.rotate(a);X.strokeStyle='#d8dce4';X.lineWidth=3;X.beginPath();X.moveTo(0,0);X.lineTo(52,0);X.stroke();X.fillStyle='#c9a040';X.fillRect(-8,-5,8,10);X.restore()}
BPS.adm={dur:520,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){const s=Math.sign(c.bx-p.x)||1;
  if(t==1){c.qo={w:520,h:600};c.hideQ=1;c.noFace=1;c.pr=[0,1].map(i=>({x:0,z:0}))}
  q.gf=c.bz-999;p.face=s;
  if(t<62){q.x=c.bx+s*700;q.z=c.bz+400;c5Shot(c,p.x+s*220,140,1.1,.05,t==1);if(t==2&&typeof CS2!='undefined')CS2.horn(1);if(t==16)c5Say('KAKTUS','Galeona… a míří přímo na nás.')}
  if(t==60){sfx('cannon');sfx('boom');shake=8;if(SEA)SEA.fl=10;c.hideQ=0}
  if(t>=62&&t<122){const u=(t-62)/60,[x,z]=c5Arc(c.bx+s*700,c.bz+400,c.bx,c.bz,160,u);q.x=x;q.z=z;c.qo.rot=-s*u*Math.PI*4;bpPose(q,'tired',30);q.face=-s;if(t%2==0)c2P({x:q.x,z:q.z+80,vx:s*R(.5,1.5),vz:R(-.3,.5),L:40,k:'smoke',c:'220,220,220',s:R(10,16)});c5Shot(c,q.x,q.z+90,1.15,.14);if(t==96)c5Slow(c,20,.4);if(t==70)c5Say('ADMIRÁL TIBURÓN','¡Al abordaje!')}
  if(t==122){q.x=c.bx;q.z=c.bz;c.qo.rot=0;shake=14;sfx('heavy',q.x);ring(q.x,LY,100,'rgba(255,255,255,.6)',18,q.z);spawnP(q.x,LY,16,'#d8c8a0',4,10,q.z);c5Dodge(c,-s,0)}
  if(t>=122){q.x=c.bx;q.z=c.bz;q.gf=c.bz;q.face=-s}
  if(t>=122&&t<150)bpPose(q,'tired',30);
  if(t>=150&&t<230){bpPose(q,'idle',60);c5Shot(c,q.x-s*40,c.bz+150,1.5,.07);if(t==156){c5Say('ADMIRÁL TIBURÓN','Admirál Tiburón. Pán sedmi moří… a od dnešní noci i jednoho kaktusu.');sfx('vAdm',q.x)}}
  /* papoušci útočí, Kaktus je odežene */
  if(t>=230&&t<340){bpPose(q,t<250?'parrots':'idle',30);c5Two(c,q,1.25,.07);if(t==236)c5Say('ADMIRÁL TIBURÓN','¡Papagayos! Klovněte ho!');
   c.pr.forEach((r,i)=>{const u=tiS(t,240+i*8,272+i*8),ang=t*.18+i*3.14,hx=p.x+Math.cos(ang)*46,hz=p.z+120+Math.sin(ang)*14;if(t<300){r.x=tiL(q.x,hx,u);r.z=tiL(q.z+150,hz,u)+40*Math.sin(Math.PI*u)}else{const v=tiS(t,300,336);r.x=tiL(hx,q.x+(i?20:-20),v);r.z=tiL(hz,q.z+150,v)+60*Math.sin(Math.PI*v)}});
   if(t%12==0&&t>270&&t<298)sfx('flap',p.x);if(t==294){c5Punch(c);for(let i=0;i<10;i++)c2P({x:p.x+R(-20,20),z:p.z+120,vx:R(-2,2),vz:R(-1,2),g:.05,L:60,c:i%2?'#d8322a':'#2a6ad8',s:3})}if(t==300)c5Say('KAKTUS','Kšá! Ancla už plave. Chceš se k němu přidat?')}
  /* šermířská ukázka */
  if(t>=340&&t<430){const k=(t-340)%30;bpPose(q,'slash',30-k);if(k==14){sfx('blade',q.x);c.sl.push({t,a:((t-340)/30|0)%2})}c5Shot(c,q.x-s*30,c.bz+150,1.45,.08);if(t==346)c5Say('ADMIRÁL TIBURÓN','Vyřežu ti na záda mapu pokladu. ¡Ostře!')}
  if(t>=430){bpPose(q,'cannon',30);c5Two(c,q,1.15,.06);if(t==436){c5Say('ADMIRÁL TIBURÓN','¡En garde, pouštní plevele!');sfx('vAdm',q.x)}if(t==470)c5Aim()}
  if(!c.sl)c.sl=[];c.sl=c.sl.filter(e=>t-e.t<18);c.ex=q.x},
 front(c,t,q){if(t>=240&&t<340)c.pr.forEach((r,i)=>c5Parrot(c5X(r.x),c5Y(r.z),t+i*9,(r.x<p.x?1:-1),i?'#3ac04a':'#d8322a'));
  if(c.sl)for(const e of c.sl){const k=(t-e.t)/18,x=c5X(q.x+(Math.sign(p.x-q.x)||-1)*90),y=c5Y(q.z+150);X.save();X.globalCompositeOperation='lighter';X.strokeStyle='rgba(230,240,255,'+(1-k)+')';X.lineWidth=4*(1-k)+1;X.beginPath();if(e.a)X.moveTo(x-50,y-50),X.lineTo(x+50,y+50);else X.moveTo(x+50,y-50),X.lineTo(x-50,y+50);X.stroke();X.restore()}}};
/* --- admirál poražen: papoušci přeběhnou ke Kaktusovi, ukradnou mu klobouk a meč, přivázání ke stěžni --- */
POST.adm={dur:520,c5:1,
 init(c){C5OLD.post.adm.init(c);c.qo={w:520,h:600};c.pr=[{x:c.ex,z:c.ez+150},{x:c.ex,z:c.ez+150}];c.ropes=0;c.hat=null},
 upd(c,t,q){const s=Math.sign(q.x-p.x)||1,m=c.m;
  if(t<60){q.x=c.ex;q.z=c.ez;bpPose(q,'tired',30);q.face=-s;c5Two(c,q,1.3,.06,t==0);if(t==8)c5Say('ADMIRÁL TIBURÓN','Papoušci! ¡Al ataque!')}
  if(t>=40&&t<200){const ph=t<110?tiS(t,40,100):1;c.pr.forEach((r,i)=>{const hx=p.x+(i?24:-14),hz=p.z+(i?96:118);if(t<110){r.x=tiL(q.x,hx,ph)+Math.sin(t*.2+i)*20*(1-ph);r.z=tiL(q.z+150,hz,ph)+50*Math.sin(Math.PI*ph)}else{r.x=hx;r.z=hz}});if(t==110){c5Punch(c);c.ck=1;sfx('coin',p.x)}c5Shot(c,p.x,p.z+100,1.7,.07);if(t==120)c5Say('PAPOUŠEK','Krrr! Sušenka! Kaktus hodný! Krrr!');if(t==170)c5Say('ADMIRÁL TIBURÓN','¡Traidores! Zrádci opeření!')}
  if(t>=200&&t<300){c.ck=0;c.pr.forEach((r,i)=>{const u=tiS(t,200+i*10,240+i*10),v=tiS(t,250,300);r.x=tiL(tiL(p.x,q.x,u),q.x+s*600,v);r.z=tiL(tiL(p.z+110,q.z+(i?120:190),u),q.z+400,v)+40*Math.sin(Math.PI*u)});if(t==240){q.lost={w:1,hat:1};sfx('grab',q.x);c.hat=1}c5Shot(c,q.x+s*80,c.ez+170,1.2,.07);if(t==262)c5Say('ADMIRÁL TIBURÓN','Můj klobouk! Můj meč! ¡Vuelvan!');if(t==296){sfx('splash');c.hat=0}}
  if(t>=300&&t<330){const u=tiE.io(tiS(t,300,330));q.x=tiL(c.ex,c.tx,u);q.z=tiL(c.ez,0,u);bpPose(q,'tired',30)}
  if(t>=330&&t<420){q.x=c.tx;q.z=0;bpPose(q,'idle',60);q.face=-1;const ph=Math.sin((t-330)*.16);p.x=c.tx+ph*70;p.vx=Math.cos((t-330)*.16)*11;p.face=Math.sign(p.vx)||1;c.ropes=Math.min(5,Math.floor((t-330)/16)+1);if((t-330)%16==0)sfx('cloth',q.x);c5Shot(c,c.tx,120,1.4,.08);if(t==340)c5Say('ADMIRÁL TIBURÓN','¡Oye! ¡Para! To se nedělá… ¡a un almirante!')}
  if(t>=420){q.x=c.tx;q.z=0;bpPose(q,t%60<20?'tired':'idle',60);c5Walk(c.tx-120,2.4);c5Shot(c,c.tx-60,130,1.3,.05);if(t==430)c5Say('KAKTUS','Pojedeš s námi, admirále. Jako figura na přídi.');if(t==470)c2Fid(C2HERO[SV.cls])}
  c.cx=null},
 front(c,t,q){adRopes(q.x,q.z,c.ropes||0);
  if(t>=40&&t<300)c.pr.forEach((r,i)=>c5Parrot(c5X(r.x),c5Y(r.z),t+i*9,t<200?(r.x<p.x+5?1:-1):(Math.sign(q.x-p.x)||1),i?'#3ac04a':'#d8322a',t>=110&&t<200));
  if(c.ck&&t<200){X.fillStyle='#e8c890';X.fillRect(c5X(p.x+22)-5,c5Y(p.z+80)-3,10,6)}
  if(t>=240&&c.hat){const r=c.pr[0],r2=c.pr[1];c5Bicorne(c5X(r.x),c5Y(r.z-12),Math.sin(t*.2)*.2);c5Sword(c5X(r2.x)-20,c5Y(r2.z-10),.3)}
  if(t>=420)[0,1].forEach(i=>c5Parrot(c5X(q.x+(i?18:-14)),c5Y(260+i*4),t+i*9,i?-1:1,i?'#3ac04a':'#d8322a',1))},
 fin(c){c.fx=c.tx;c.fz=110;c.lost={};ADT={x:c.tx,soot:0}}};

/* =====================================================================
   3) LA SOMBRA – ukázka střelby na lahve, laser na hrudi, seskok z větve
   ===================================================================== */
BPS.n={dur:480,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){const s=Math.sign(c.bx-p.x)||1;
  if(t==1){c.qo={w:300,h:330,s:.86};HUNT.st='leap';if(sn)sn.aim=0;q.face=-s;c.lx=p.x+s*190;c.lz=Math.max(0,floorAt(c.lx,p.z+60,8));c.noFace=0;c.bt=[0,1,2].map(i=>({x:p.x+s*(80+i*70),z:p.z+150+(i%2)*26,hit:0}))}
  const mz=[q.x+q.face*150,q.z+140];c.las=null;
  if(t<330){bpPose(q,'snipe',40)}
  if(t<60){c5Shot(c,p.x+s*80,p.z+100,1.3,.06,t==1);if(t==8)c5Say('LA SOMBRA','Šest nocí mě stopuješ, kaktusi. Teď chvíli budu já tebe.')}
  /* tři výstřely na lahve */
  if(t>=60&&t<160){const i=Math.min(2,Math.floor((t-60)/32)),b=c.bt[i],k=(t-60)%32;if(!b.hit){c.las=[b.x,b.z-10];if(k==24){b.hit=t;sfx('snipe',q.x);c.mf=t;for(let j=0;j<12;j++)c2P({x:b.x,z:b.z-12,vx:R(-3,3),vz:R(-1,4),g:.25,L:40,c:'#b8ffb8',s:3})}}c5Shot(c,b.x,b.z-30,1.5,.1)}
  if(t>=160&&t<250){c.las=[p.x,p.z+(p.cr?40:72)];c5Shot(c,p.x,p.z+80,tiL(1.4,1.9,tiS(t,160,240)),.05);if(t%34==0)synth(()=>TS.heart(.7));if(t==196)c5Say('KAKTUS','Kdybys mě chtěl trefit, už bych ležel.')}
  if(t>=250&&t<320){c.las=[p.x,p.z+72];c5Shot(c,q.x,q.z+110,1.45,.07,t==250);if(t==256){c5Say('LA SOMBRA','Chtěl jsem vidět, jestli uhneš. Neuhnul jsi. Škoda – takové mám nejradši.');sfx('vSnp',q.x)}}
  if(t>=320&&t<366){const u=(t-320)/46;q.x=tiL(c.bx,c.lx,u);q.z=tiL(c.bz,c.lz,u)+150*Math.sin(Math.PI*u);bpPose(q,'tired',30);c.qo.rot=q.face*u*Math.PI*2;c.qo.s=tiL(.86,1,u);if(t==320){sfx('whoosh',q.x);c5Slow(c,24,.45)}if(t%3==0)c2P({x:q.x,z:q.z+60,L:20,c:'#c8ff8a',s:2});c5Shot(c,(q.x+p.x)/2,Math.max(q.z,p.z)+90,1.2,.12)}
  if(t==366){c.qo.rot=0;c.qo.s=1;q.x=c.lx;q.z=c.lz;shake=10;sfx('heavy',q.x);ring(q.x,LY,80,'rgba(220,255,200,.6)',18,q.z);spawnP(q.x,LY,22,'#4a5a2a',5,14,q.z)}
  if(t>=366){q.x=c.lx;q.z=c.lz;bpPose(q,t<380?'tired':'idle',30);c5Two(c,q,1.35,.07);if(t==384){sfx('reload',q.x);c5Say('LA SOMBRA','Baron platí za každou ránu. Ty budeš moje nejdražší.')}if(t==438)c5Say('KAKTUS','Tak tě budu stát víc, než dostaneš.');if(t==452)c5Aim()}},
 front(c,t,q){if(c.bt)for(const b of c.bt){if(!b.hit)c5Bottle(c5X(b.x),c5Y(b.z-28)+28,'rgba(120,200,120,.85)');else{X.strokeStyle='#5a4a3a';X.beginPath();X.moveTo(c5X(b.x),c5Y(b.z+32));X.lineTo(c5X(b.x),c5Y(b.z-12));X.stroke()}}
  if(c.las&&t<320){const m=[q.x+q.face*150,q.z+140],a=.5+.5*Math.sin(t*.5);X.save();X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,40,40,'+(.3+.3*a)+')';X.lineWidth=1.6;X.beginPath();X.moveTo(c5X(m[0]),c5Y(m[1]));X.lineTo(c5X(c.las[0]),c5Y(c.las[1]));X.stroke();X.restore();rgGlow(c5X(c.las[0]),c5Y(c.las[1]),14,'255,60,60',.9)}
  if(c.mf&&t-c.mf<5){const m=[q.x+q.face*150,q.z+140];rgGlow(c5X(m[0]),c5Y(m[1]),40,'255,230,150',1-(t-c.mf)/5)}},
 fin(c){C5OLD.bps.n.fin(c)}};
/* --- La Sombra poražen: zaseknutá puška, dýmovnice, bažina, Kaktus ho vytáhne --- */
POST.n={dur:540,c5:1,
 init(c){c.qo={w:300,h:330};c.sink=0},
 upd(c,t,q){const s=Math.sign(q.x-p.x)||1;q.x=c.ex;q.face=-s;
  if(t<56){bpPose(q,'snipe',40);c5Two(c,q,1.35,.06,t==0);if(t==8)c5Say('LA SOMBRA','Poslední výstřel… ¿Qué? ¡Se atascó! Zasekla se!');if(t==22||t==36)sfx('deny',q.x)}
  if(t==56){c.smk=t;sfx('smoke',q.x);sfx('whoosh',q.x)}
  if(t>=56&&t<220){c.sink=Math.min(80,c.sink+(t<120?.9:.3));bpPose(q,'tired',30);c5Shot(c,q.x,c.ez+70,1.6,.06);if(t==130)c5Say('LA SOMBRA','¡Ayuda! Bažina… mě stahuje!');if(t%14==0)c2P({x:q.x+R(-30,30),z:c.ez+2,vz:.6,L:30,c:'#6a7a3a',s:R(3,6)})}
  if(t>=150&&t<240){c5Walk(q.x-s*62,2.6);if(t>=200)c5Two(c,q,1.6,.07);if(t==206){c5Say('KAKTUS','Chyť se.');}if(t>=210)p.pt=12}
  if(t>=240&&t<270){p.pt=0;c.sink=Math.max(0,c.sink-4);if(t==240){sfx('splash',q.x);for(let i=0;i<16;i++)c2P({x:q.x+R(-20,20),z:c.ez+10,vx:R(-3,3),vz:R(2,6),g:.3,L:40,c:'#4a5a2a',s:R(3,6)})}}
  q.z=c.ez-c.sink;
  if(t>=270&&t<450){bpPose(q,'tired',30);c5Two(c,q,1.45,.05);if(t==276)c5Say('LA SOMBRA','Proč…? Proč jsi mi pomohl?');if(t==330)c5Say('KAKTUS','Tahle bažina má mrtvých dost.');if(t==390)c5Say('LA SOMBRA','Starý důl. Dinamitero tam vrtá přímo k Srdci. Pospěš si, kaktusi.')}
  if(t==456){c.smk=t;sfx('smoke',q.x);c.hideQ=1;c.lost={w:'rifle'};c.fx=q.x;c.fz=c.ez}
  if(t==492)c5Say('KAKTUS','…a nechal tu pušku. Díky, Sombro.')},
 back(c,t,q){},
 front(c,t,q){if(c.sink>1&&!c.hideQ){const x=c5X(q.x),y=c5Y(c.ez);X.fillStyle='#2a3418';X.beginPath();X.ellipse(x,y-2,70,16,0,0,7);X.fill();X.fillStyle='#3a4a22';X.fillRect(x-70,y-2,140,c.sink*.6+4);X.strokeStyle='rgba(150,180,110,.5)';X.lineWidth=1.5;for(let i=0;i<2;i++){const r=(t*1.2+i*30)%60;X.beginPath();X.ellipse(x,y-2,40+r,8+r*.15,0,0,7);X.stroke()}}
  if(c.smk)c5Smoke(c5X(q.x),c5Y(c.ez+40),t-c.smk,14,30,'190,200,180')}};

/* =====================================================================
   4) EL DINAMITERO – přijede na vozíku, hodí „suvenýr“, Kaktus ho vrátí
   ===================================================================== */
BPS.dyn={dur:560,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){const s=Math.sign(c.bx-p.x)||1,cx=c.bx+s*40;
  if(t==1){c.qo={w:520,h:600};c.noFace=1;c.cart=c.bx+s*640}
  q.face=-s;p.face=s;q.gf=c.bz-999;
  if(t<140)c5Walk(c.bx-s*330,1.6);if(t<92){c.cart=tiL(c.bx+s*640,cx,tiE.o(tiS(t,0,90)));q.x=c.cart;q.z=c.bz+36;bpPose(q,'idle',60);if(t%9==0)sfx('clack',q.x);if(t==10)c5Say('EL DINAMITERO','♪ La cucaracha, la cucaracha… ya no puede caminar… ♪');c5Two(c,q,1.1,.06,t==1);if(t>70&&t%2==0)c2P({x:q.x-s*30,z:c.bz+4,vx:s*R(1,3),vz:R(1,3),g:.2,L:20,c:'#ffd27a',s:2})}
  if(t==88)sfx('screech',q.x);
  if(t>=92&&t<124){const u=(t-92)/32,[x,z]=c5Arc(cx,c.bz+36,c.bx,c.bz,60,u);q.x=x;q.z=z;bpPose(q,'tired',30);if(t==92)sfx('jump',q.x)}
  if(t>=124){q.x=c.bx;q.z=c.bz;q.gf=c.bz}
  if(t>=124&&t<196){bpPose(q,'idle',60);c5Shot(c,q.x-s*40,c.bz+140,1.5,.07);if(t==130){c5Say('EL DINAMITERO','¿Un turista? Prohlídka dolu je dnes zdarma, amigo!');sfx('vDyn',q.x)}}
  if(t>=196&&t<240){bpPose(q,'throw',Math.max(0,52-(t-196)*2.2));if(t==200)c5Say('EL DINAMITERO','…a tady máš suvenýr!');if(t==206){c.d1=t;sfx('fuse',q.x)}c5Two(c,q,1.2,.08)}
  if(t>=240&&t<300){bpPose(q,'idle',30);c5Shot(c,p.x,p.z+90,1.85,.08);if(t==248)c5Say('KAKTUS','Myslím, že ti něco upadlo.');if(t%6==0)sfx('fuse',p.x)}
  if(t==290){c5Punch(c);sfx('whoosh',p.x)}
  if(t>=290&&t<350){c5Two(c,q,1.2,.08);if(t>=310){bpPose(q,'stuck',30);c.qo.rot=Math.sin(t*.6)*.06}if(t==312)c5Say('EL DINAMITERO','¡¿Qué?! ¡No, no, NO!')}
  if(t==350){c.boom=t;c.qo.rot=0;shake=18;stop=5;B1C.flash=.7;sfx('boom',q.x);sfx('heavy',q.x);fx.push({k:'boom',x:q.x,y:LY,z:q.z+250,l:28,L:28});for(let i=0;i<12;i++)RGO.push({k:'rock',x:q.x+R(-120,120),z:q.z+R(300,420),vx:R(-2,2),vz:R(-2,1),g:.5,a:0,va:R(-.3,.3),w:R(7,15),sd:R(0,99),col:'#5a4a3a'});c5Slow(c,24,.4)}
  if(t>=350&&t<430){const k=Math.max(0,1-(t-350)/120);c.qo.tint='rgba(20,16,14,'+(.6*k)+')';bpPose(q,'tired',30);c5Shot(c,q.x,c.bz+130,1.5,.07);if(t%8==0)c2P({x:q.x+R(-20,20),z:q.z+R(150,200),vz:1.2,L:40,k:'smoke',c:'90,90,90',s:R(8,12)});if(t==374)c5Say('EL DINAMITERO','…kchh. Kchh. To byla jen zkouška.')}
  if(t>=430&&t<500){c.qo.tint=null;bpPose(q,'drill',30);if(t%5==0)c2P({x:q.x-s*120,z:q.z+90,vx:R(-2,2),vz:R(1,3),g:.2,L:18,c:'#ffd27a',s:2});if(t%9==0)sfx('saw',q.x);shake=Math.max(shake,2);c5Shot(c,q.x-s*40,c.bz+120,1.35,.07);if(t==436){c5Say('EL DINAMITERO','¡Ahora sí! Vyvrtám ti do bodlin pěknou díru!');sfx('vDyn',q.x)}}
  if(t>=500){bpPose(q,'carts',30);c5Two(c,q,1.1,.06);if(t==510)c5Aim()}
  c.ex=q.x},
 back(c,t,q){if(t>=92||c.cart==null)if(c.cart!=null)dCart(c5X(t<92?c.cart:c.bx+(Math.sign(c.bx-p.x)||1)*40),c5Y(c.bz)-2,t<92?t:0)},
 front(c,t,q){if(t<92&&c.cart!=null)dCart(c5X(c.cart),c5Y(c.bz)-2,t);
  if(c.d1&&t<240){const u=(t-c.d1)/34;if(u<1){const[x,z]=c5Arc(q.x,q.z+170,p.x+(Math.sign(q.x-p.x)||1)*16,p.z+74,110,Math.min(1,u));bDyn(c5X(x),c5Y(z),t*.3,1);rgGlow(c5X(x),c5Y(z)-14,18,'255,220,120',.8)}else{bDyn(c5X(p.x+(Math.sign(q.x-p.x)||1)*16),c5Y(p.z+74),.3,1);rgGlow(c5X(p.x+(Math.sign(q.x-p.x)||1)*16),c5Y(p.z+88),18,'255,220,120',.8)}}
  if(t>=240&&t<290){const hx=p.x+(Math.sign(q.x-p.x)||1)*16;bDyn(c5X(hx),c5Y(p.z+74),.3,1);rgGlow(c5X(hx),c5Y(p.z+88),20,'255,220,120',.9)}
  if(t>=290&&t<350){const u=Math.min(1,(t-290)/22),[x,z]=c5Arc(p.x,p.z+80,q.x,q.z+170,90,u),jx=t>=312?Math.sin(t*.5)*30:0,jz=t>=312?Math.abs(Math.sin(t*.25))*80+(t-312)*2:0;bDyn(c5X(x+jx),c5Y(z+jz),t*.4,1);rgGlow(c5X(x+jx),c5Y(z+jz)-14,18,'255,220,120',.8)}}};
/* --- Dinamitero poražen: obří svazek, Kaktus ho zhasne, svazek skončí v jeho batohu --- */
POST.dyn={dur:480,c5:1,
 init(c){c.qo={w:520,h:600}},
 upd(c,t,q){const s=Math.sign(q.x-p.x)||1;q.face=-s;if(!c.fly){q.x=c.ex;q.z=c.ez}
  if(t<60){bpPose(q,'throw',40);c5Shot(c,q.x,c.ez+150,1.35,.06,t==0);if(t==6)c5Say('EL DINAMITERO','Bueno… bueno. Tohle je moje poslední. ¡La GRANDE!');if(t==30)sfx('fuse',q.x)}
  if(t>=60&&t<130){bpPose(q,'throw',40);c5Walk(q.x-s*70,2.8);c5Two(c,q,1.3,.06);if(t%6==0)sfx('fuse',q.x)}
  if(t==124){c5Punch(c);c.out=t;sfx('hiss',q.x)}
  if(t>=124&&t<160){if(t==130)c5Say('KAKTUS','Zhasnuto.')}
  if(t==168){c.out=0;sfx('fuse',q.x);c5Say('EL DINAMITERO','…¿Otra vez? ¡Hoří to znovu!')}
  if(t>=168&&t<200){bpPose(q,'stuck',30);c.qo.rot=Math.sin(t*.7)*.05;c5Shot(c,q.x,c.ez+170,1.6,.08)}
  if(t==196){c5Punch(c);c.kick=t;sfx('whoosh',p.x)}
  if(t>=210&&t<240){c.qo.rot=0;bpPose(q,'idle',30);q.face=s;if(t==214)c5Say('EL DINAMITERO','Ay… mamá.')}
  if(t==240){c.fly=t;shake=22;stop=6;B1C.flash=.8;sfx('boom',q.x);sfx('heavy',q.x);fx.push({k:'boom',x:q.x,y:LY,z:q.z+80,l:28,L:28});ring(q.x,LY,150,'rgba(255,200,80,.9)',24,q.z);spawnP(q.x,LY,40,'#ffb14a',6,60,q.z);c5Slow(c,30,.4);c.lost={hat:'helm',w:'drill'};c.fx=c.ex;c.fz=c.ez}
  if(c.fly){const v=t-c.fly;q.x=c.ex;q.z=c.ez+v*14;c.qo.rot=v*.3;bpPose(q,'tired',30);if(q.z>c.ez+600)c.hideQ=1;if(v%3==0&&v<40)c2P({x:q.x,z:q.z,vx:R(-1,1),vz:R(-1,1),L:30,k:'smoke',c:'80,80,80',s:R(8,14)});
   c5Shot(c,(p.x+c.ex)/2,c.ez+150+Math.min(150,v*3),1.05,.06);if(v>10&&v<90&&v%10==0)RGO.push({k:'rock',x:c.ex+R(-160,160),z:c.ez+R(300,420),vx:R(-1,1),vz:R(-2,0),g:.5,a:0,va:R(-.3,.3),w:R(6,12),sd:R(0,99),col:'#5a4a3a'});if(v==60)pop(c.ex,LY,c.ez+360,'…¡aaaaaay!…','#ffcf8a')}
  if(t==370)c5Say('KAKTUS','Bum.');if(t==420)c5Say('KAKTUS','Teď najít, kam vrtal. Srdce musí být blízko.');if(t>=360)c5Shot(c,p.x,p.z+90,1.5,.05)},
 front(c,t,q){if(c.fly)return;const hx=q.x,hz=q.z+250;if(t<196){c5Bundle(c5X(hx),c5Y(hz),0,1,t<124||t>=168,t);if(c.out&&t-c.out<40)c5Smoke(c5X(hx),c5Y(hz+20),t-c.out,5,10,'200,200,200')}
  else if(t<240){const u=Math.min(1,(t-196)/14),[x,z]=c5Arc(hx,hz,q.x+(Math.sign(q.x-p.x)||1)*26,q.z+150,40,u);c5Bundle(c5X(x),c5Y(z),u*.6,1,1,t)}}};

/* =====================================================================
   5) OBŘÍ ŠTÍR – cedule „Nechoď dál“, propadlina, klepeta ji ukradnou
   ===================================================================== */
BPS.scp={dur:520,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){const s=Math.sign(c.bx-p.x)||1,sx=c.bx-s*140;c.sx=sx;
  if(t==1){c.qo={w:560,h:600};c.hideQ=1;c.vul=[0,1,2].map(i=>({a:i*2.1,r:110+i*40}));synth(()=>TS.wind(5,.8,0,420))}
  q.x=c.bx;q.face=-s;
  if(t<120){c5Walk(sx-s*130,1.4);c5Shot(c,(p.x+sx)/2,120,1.15,.05,t==1);if(t==60)c5Say('KAKTUS','„Nechoď dál.“ … Milé uvítání.')}
  if(t>=120&&t<200){c.sink=tiS(t,140,200)*60;c5Shot(c,sx,90,1.55,.06);if(t%12==0){shake=Math.max(shake,3);sfx('thud',sx)}if(t%4==0)c2P({x:sx+R(-50,50),z:0,vz:R(.5,1.5),L:30,c:'#d9b27a',s:3});if(t==150){c5Dodge(c,-s,0);c5Say('KAKTUS','Hm. Písek se hýbe.')}}
  if(t<200){bpPose(q,'under',60);q.z=c.bz}
  if(t==200){c.hideQ=0;shake=16;sfx('roar',c.bx);sfx('hiss',c.bx);spawnP(c.bx,LY,46,lv.du,6,60,c.bz);c.signGone=t;c.fly=0;c5Slow(c,22,.45)}
  if(t>=200&&t<250){bpPose(q,'emerge',60);q.z=c.bz-70+70*tiE.o((t-200)/50);c5Shot(c,c.bx,c.bz+130,1.2,.1)}
  if(t>=250&&t<300){q.z=c.bz;bpPose(q,'idle',30);c5Shot(c,c.bx-s*40,c.bz+140,1.35,.06);if(t%6==0)c2P({x:c.bx+R(-40,40),z:c.bz+R(180,230),vz:-1,g:.1,L:30,c:'#9cff8a',s:3});if(t==256)c5Say('KAKTUS','Baronova šťáva z tebe udělala obra…')}
  if(t>=300&&t<360){q.z=c.bz;const k=(t-300)%30;bpPose(q,'snap',30-k);if(k==12)sfx('clack',q.x);c5Shot(c,(p.x+c.bx)/2,c.bz+120,1.2,.07)}
  if(t>=360&&t<410){q.z=c.bz;bpPose(q,'stab',Math.max(0,54-(t-360)*2));if(t==372){c5Dodge(c,-s,1);c5Slow(c,16,.45)}if(t==382){const bx=p.x+s*20;shake=10;sfx('heavy',bx);spawnP(bx,LY,24,lv.du,5,30,0)}}
  if(t>=410){q.z=c.bz;bpPose(q,'idle',30);c5Shot(c,(p.x+c.bx)/2,c.bz+110,1.12,.06);if(t==420)c5Say('KAKTUS','…tak tě zase zmenším na brouka.');if(t==450)c5Aim();if(t==470){sfx('hiss',q.x);pop(q.x,LY,q.z+200,'SSSHHHRRR!','#c8ff8a')}}
  if(c.fly!=null)c.fly++},
 back(c,t,q){const sx=c.sx;if(sx==null)return;const sk=c.sink||0;if(t<210){X.save();X.beginPath();X.rect(c5X(sx)-80,0,160,c5Y(0)+2);X.clip();c5Sign(c5X(sx),c5Y(-sk),Math.sin(t*.3)*.05*(sk>0?1:0),'NECHOĎ DÁL');bpSkull(c5X(sx+30),c5Y(-sk*.6),.8,0);X.restore()}
  if(sk>0&&t<230){const x=c5X(sx),y=c5Y(0);X.save();X.strokeStyle='rgba(120,80,40,.55)';X.lineWidth=2;for(let i=0;i<4;i++){X.beginPath();X.ellipse(x,y,20+i*16+Math.sin(t*.3+i)*3,4+i*3,t*.05*(i%2?1:-1),0,7);X.stroke()}X.restore()}
  if(c.signGone&&t-c.signGone<40)c5Shards(c5X(sx),c5Y(80),t-c.signGone,14,'rgba(200,160,110,'+(1-(t-c.signGone)/40)+')')},
 front(c,t,q){if(c.vul){c.vul.forEach((v,i)=>{let x,y;if(!c.fly){x=c.bx-cam+Math.cos(t*.02+v.a)*v.r;y=70+Math.sin(t*.02+v.a)*v.r*.25+i*14}else{const f=c.fly;x=c.bx-cam+Math.cos(v.a)*v.r+f*(4+i)*(i%2?1:-1);y=70+i*14-f*3.5}if(y>-60)bpVulture(x,y,.8+i*.1,t+i*30)})}}};
/* --- štír poražen: ocas zapíchnutý v zemi, Kaktus mu na něm uváže uzel, štír zdrhne pod pískem --- */
POST.scp={dur:440,c5:1,
 init(c){c.qo={w:560,h:600}},
 upd(c,t,q){const s=Math.sign(q.x-p.x)||1;q.x=c.ex;q.z=c.ez;q.face=-s;const tx=c.ex-s*170;c.tx=tx;
  if(t<40){bpPose(q,'tired',30);c5Two(c,q,1.2,.06,t==0);if(t==8)pop(q.x,LY,q.z+180,'Ssss…','#c8ff8a')}
  if(t>=40&&t<200){bpPose(q,'stab',t<64?Math.max(10,54-(t-40)*2):10);if(t==50){c5Dodge(c,-s,1);c5Slow(c,18,.45)}if(t==62){shake=10;sfx('heavy',tx);spawnP(tx,LY,24,lv.du,5,30,0)}}
  if(t>=80&&t<200){c5Walk(tx-s*36,2.4);c5Shot(c,tx,60,1.75,.07);if(t>=120&&t<180){c.knot=tiS(t,120,170);if(t%10==0)sfx('cloth',tx)}if(t==184)c5Say('KAKTUS','Takhle. Pěkná mašle.')}
  if(t>=200&&t<236){bpPose(q,'snap',12-((t-200)%12));c.qo.rot=Math.sin(t*.8)*.04;if(t==204)pop(q.x,LY,q.z+200,'SSS?!','#c8ff8a');c5Shot(c,q.x,c.ez+130,1.3,.08)}
  if(t==236){c.hideQ=1;c.qo.rot=0;c.mo={x:c.ex};shake=8;sfx('thud',c.ex);spawnP(c.ex,LY,30,lv.du,5,40,c.ez);c.lost={}}
  if(c.mo){const m=c.mo;m.x+=s*4.2;m.z=Math.sin(t*.25)*6;if(t%4==0)c2P({x:m.x,z:c.ez,vx:R(-1,1),vz:R(1,2),L:24,c:'#d9b27a',s:3});if(t%14==0)sfx('thud',m.x);c5Shot(c,(p.x+Math.min(Math.max(m.x,p.x-500),p.x+500))/2,c.ez+100,1.05,.06)}
  if(t==330)c5Say('KAKTUS','Až si ho rozmotáš, bude poušť zase zelená.');if(t==390)c2Fid(C2HERO[SV.cls])},
 front(c,t,q){const k=c.knot||0;if(k>0&&!c.mo){const x=c5X(c.tx),y=c5Y(c.ez+40);X.save();X.strokeStyle='#c8a060';X.lineWidth=4;X.lineCap='round';X.beginPath();X.arc(x,y,10,0,6.283*k);X.stroke();if(k>.6){X.beginPath();X.moveTo(x-8,y+6);X.quadraticCurveTo(x-20,y+16,x-14,y+24);X.moveTo(x+8,y+6);X.quadraticCurveTo(x+20,y+16,x+14,y+24);X.stroke()}X.restore()}
  if(c.mo){const x=c5X(c.mo.x),y=c5Y(c.ez);X.fillStyle='#b08a52';X.beginPath();X.ellipse(x,y,46,14,0,Math.PI,0);X.fill();X.fillStyle='rgba(0,0,0,.2)';X.beginPath();X.ellipse(x,y,46,5,0,0,7);X.fill();X.strokeStyle='#c8a060';X.lineWidth=4;X.beginPath();X.arc(x-30*Math.sign(c.mo.x-p.x),y-30+Math.sin(t*.3)*4,9,0,7);X.stroke();X.strokeStyle='#8a4a1a';X.lineWidth=6;X.beginPath();X.moveTo(x-20*Math.sign(c.mo.x-p.x),y-6);X.lineTo(x-30*Math.sign(c.mo.x-p.x),y-22+Math.sin(t*.3)*4);X.stroke()}}};

/* =====================================================================
   6) EL JEFE – přehlídka, reflektory, seznam poražených, oslavná dávka
   ===================================================================== */
BPS.jef={dur:560,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){const s=Math.sign(c.bx-p.x)||1;
  if(t==1){c.qo={w:520,h:600};c.noFace=0}
  q.gf=c.bz;q.z=c.bz;q.face=-s;
  if(t<90&&t%30==0)synth(t2=>{taOsc('triangle',523,t2,.18,.12,{f2:523});taOsc('triangle',659,t2+.18,.18,.12);taOsc('triangle',784,t2+.36,.4,.12)});
  if(t<200){q.x=tiL(c.bx+s*520,c.bx,tiE.o(tiS(t,60,200)));q.vx=t>=60?-s*2.4:0;bpPose(q,'idle',60);c5Shot(c,t<60?(p.x+c.bx)/2:(q.x+p.x)/2,c.bz+150,t<60?1.05:1.2,.05,t==1);if(t>=96&&t<200&&t%22==0)pop(cam+R(80,W-80),LY,LY-GY+170,'¡JEFE! ¡JEFE!','#ffcf8a');if(t==40)c5Say('','(fanfáry, reflektory, dupot bot)')}
  if(t>=200){q.x=c.bx;q.vx=0}
  if(t>=200&&t<280){bpPose(q,'call',30);c5Shot(c,q.x-s*30,c.bz+160,1.45,.06);if(t==206){c5Say('EL JEFE','Ancla. Tiburón. La Sombra. Dinamitero. A můj mazlíček štír.');sfx('vJef',q.x)}}
  if(t>=280&&t<360){bpPose(q,'idle',30);c.scr=Math.min(150,(t-280)*3);c5Shot(c,q.x-s*50,c.bz+120,1.45,.06);if(t==286)c5Say('EL JEFE','Celý seznam je škrtnutý. Zbýváš jen ty, kaktusi.')}
  if(t>=360&&t<430){c5Shot(c,p.x+s*40,p.z+100,1.7,.07);if(t==366){c5Say('KAKTUS','Tak si tam připiš ještě jedno jméno. Svoje.');c2Fid(C2COOL[SV.cls])}}
  if(t==430){c.scr=0;c.ball=t;sfx('cloth',q.x)}
  if(t>=436&&t<500){bpPose(q,'gfire',30);q.fl=t%4<2?6:0;if(t%5==0)sfx('gun',q.x);if(t%3==0)RGO.push({k:'case',x:q.x+q.face*40,z:q.z+128,vx:-q.face*R(2,4.5),vz:R(4,7.5),g:.5,a:R(0,6),va:R(-.5,.5),l:0});c5Shot(c,q.x,c.bz+170,1.3,.07);if(t==440)c5Say('EL JEFE','¡JA JA JA! Muchachos, pusťte ho ke mně. Tenhle je MŮJ!')}
  if(t>=500){q.fl=0;bpPose(q,'stomp',t<508?8:30);if(t==500){shake=18;sfx('boom',q.x);ring(q.x,LY,150,'rgba(255,220,160,.85)',26,q.z);spawnP(q.x,LY,40,lv.du,6,20,q.z);RGFL=.25}c5Two(c,q,1.1,.06);if(t==520)c5Aim()}
  c.ex=c.bx},
 draw(c,t,q){if(t<200){const tx=c5X(q.x),ty=c5Y(q.z);[[60,-40],[W-60,-40]].forEach(([sx,sy],i)=>{bpBeam(sx,sy,tx+(i?20:-20),ty-80,40,.8,'255,245,210')});X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.ellipse(tx,ty,70,14,0,0,7);X.fill()}},
 back(c,t,q){for(let i=0;i<9;i++){const x=(i+.5)*W/9+Math.sin(i*3)*20,y=GY-110;bpMerc(x,y,t,i,t>60&&t<520)}},
 front(c,t,q){if(c.scr>0){const s=Math.sign(c.bx-p.x)||1;c5Scroll(c5X(q.x-s*70),c5Y(q.z+150),c.scr,t);X.save();X.strokeStyle='#a8262a';X.lineWidth=2;for(let i=1;i<Math.min(6,c.scr/22);i++){const y=c5Y(q.z+150)+i*22;X.beginPath();X.moveTo(c5X(q.x-s*70)-12,y);X.lineTo(c5X(q.x-s*70)+12,y-4);X.stroke()}X.restore()}
  if(c.ball&&t-c.ball<50){const u=(t-c.ball)/50,s=Math.sign(c.bx-p.x)||1,[x,z]=c5Arc(q.x-s*60,q.z+150,q.x+s*260,q.z,120,u);X.fillStyle='#ece0c0';X.beginPath();X.arc(c5X(x),c5Y(z),8,0,7);X.fill();X.strokeStyle='#6a5030';X.stroke()}}};
/* --- El Jefe poražen: žoldáci utečou, dá Kaktusovi klíč od Baronova expresu --- */
POST.jef={dur:520,c5:1,
 init(c){c.qo={w:520,h:600,cy:0};c.mx=0},
 upd(c,t,q){const s=Math.sign(q.x-p.x)||1;q.x=c.ex;q.z=c.ez;q.face=-s;
  if(t<60){bpPose(q,t<20?'tired':'call',30);c5Shot(c,q.x,c.ez+150,1.35,.06,t==0);if(t==10)c5Say('EL JEFE','¡Muchachos! ¡A mí! ¡AHORA!')}
  if(t>=60&&t<170){bpPose(q,'tired',30);c.mx=(t-60)*7;c5Two(c,q,1.0,.05);if(t==70)synth(()=>TS.wind(3,.6,0,400));if(t==150)c5Say('EL JEFE','…Cobardes. Zbabělci, všichni do jednoho.')}
  if(t>=170&&t<250){bpPose(q,'tired',30);c5Walk(q.x-s*90,2.2);c5Two(c,q,1.35,.06);if(t==236)c5Say('KAKTUS','Kde je Baron?')}
  if(t>=250&&t<350){bpPose(q,'tired',30);c5Shot(c,q.x-s*20,c.ez+140,1.5,.06);if(t==256)c5Say('EL JEFE','Odjel. Jeho expres jede dnes v noci k Leviatanovi.')}
  if(t==340){c.key=t;sfx('whoosh',q.x)}
  if(t>=350&&t<430){c5Two(c,q,1.4,.06);if(t==372){c5Punch(c);sfx('coin',p.x)}if(t==380)c5Say('EL JEFE','Klíč od posledního vagonu. Ať ti udělá radost, kaktusi.')}
  if(t>=430&&t<452){const u=(t-430)/22;c.qo.rot=-q.face*Math.PI/2*tiE.i(u);bpPose(q,'tired',30)}
  if(t==452){shake=12;sfx('heavy',q.x);spawnP(q.x,LY,18,lv.du,4,10,q.z);c.lost={};c.fx=q.x;c.fz=q.z;BDB.push({k:'somb',x:q.x-q.face*80,z:q.z+260,vx:-q.face*1.2,vz:2,a:0,va:.08,l:0,s:sc(LY)*1.05})}
  if(t>=452){c5Shot(c,p.x,p.z+90,1.5,.05);if(t==470)c5Say('KAKTUS','Expres, říkáš… Tak to bych neměl zmeškat.')}},
 back(c,t,q){if(t<170){for(let i=0;i<7;i++){const x=(i+.5)*W/7+(c.mx||0)*(1+i*.15),y=GY-110;if(x<W+60)bpMerc(x,y,t*2,i,0)}}if(t>=60&&t<200){const u=(t-60)/140;c2Tumble(tiL(-60,W+60,u),GY-4-Math.abs(Math.sin(t*.2))*14,18,t*.2,1)}},
 front(c,t,q){if(c.key&&t<380){const u=Math.min(1,(t-c.key)/32),[x,z]=c5Arc(q.x,q.z+130,p.x+(Math.sign(q.x-p.x)||1)*18,p.z+80,110,u);c5Key(c5X(x),c5Y(z),t*.3,1.2)}else if(c.key&&t<440){c5Key(c5X(p.x+(Math.sign(q.x-p.x)||1)*18),c5Y(p.z+80),.2,1.2)}}};

/* =====================================================================
   7) EL MAQUINISTA – jízdní řád, kapesní hodinky, „Jízdenku, prosím!“
   ===================================================================== */
BPS.eng={dur:540,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){if(t==1){c.qo={w:560,h:640};c.hideQ=1;c.crT=999}
  if(t<80){q.x=9330;q.z=150;bpPose(q,'idle',60);c5Shot(c,p.x+160,p.z+110,1.15,.05,t==1);if(t%14==2){synth(()=>{TS.clank(.6);TS.chug(.5)});for(let i=0;i<5;i++)par.push({x:9300+R(-10,10),y:LY,z:150+R(0,20),fz:-999,vx:R(-1,1)-2,vz:R(1,3),l:20,c:'#ffb14a',s:R(1.5,3)})}if(t==14)c5Say('EL MAQUINISTA','(z kabiny) ¡Más carbón! ¡MÁS! Leviatan nečeká!')}
  else if(t<110){c.hideQ=0;const u=(t-80)/30;q.x=tiL(9330,9640,u);q.z=tiL(150,200,u)+Math.sin(Math.PI*u)*150;q.gf=c.bz-999;bpPose(q,'idle',60);c5Shot(c,q.x,q.z+90,1.15,.12);
   if(t==80){shake=10;synth(()=>{TS.whoosh(.7,.7,300,2600);TS.piston(1)});for(let i=0;i<30;i++)par.push({x:9330+R(-30,30),y:LY,z:200+R(0,20),fz:-999,vx:R(-4,4)-2,vz:R(2,8),l:R(24,40),c:'rgba(245,245,245,.65)',s:R(8,18)})}}
  else{q.x=9640;q.z=c.bz;q.gf=c.bz;if(t==110){shake=16;sfx('heavy',q.x);synth(()=>TS.hit(.7));ring(q.x,LY,110,'rgba(255,230,190,.8)',22,c.bz);spawnP(q.x,LY,20,'#2a2222',4,14,c.bz)}
   if(t<130)bpPose(q,'steamv',Math.max(0,30-(t-110)*3));
   else if(t<230){bpPose(q,'idle',60);c.watch=1;c5Shot(c,q.x,c.bz+160,1.5,.06);if(t==136)c5Say('EL MAQUINISTA','Expres číslo sedm. Pueblo Seco – Leviatan. Zpoždění: nula minut.');if(t%20==0)synth(()=>TS.tick(.6))}
   else if(t<300){c.watch=0;bpPose(q,'whistle',Math.max(0,64-(t-230)));if(t==236){synth(()=>TS.whistle(1.2,1));c5Say('EL MAQUINISTA','A černý pasažér! Jízdenku, prosím!')}c5Two(c,q,1.25,.07)}
   else if(t<370){bpPose(q,'idle',30);c.map=1;c5Shot(c,p.x+60,p.z+100,1.7,.07);if(t==306)c5Say('KAKTUS','Postačí tahle? Je na ní Baronova pečeť.')}
   else if(t<440){c.map=0;bpPose(q,'stokers',30);c5Shot(c,q.x,c.bz+150,1.4,.08);if(t==376){c5Say('EL MAQUINISTA','¡Esa es MI línea! Pokuta za tohle: přes palubu!');sfx('vEng',q.x)}if(t==396){synth(()=>TS.whistle(1.2,1));TTG=19;shake=6}}
   else if(t<500){const k=t-440;bpPose(q,'coal',52-(k%40));if(k==12){RGO.push({k:'coal',x:q.x+q.face*50,z:q.z+190,vx:(p.x+70-q.x-q.face*50)/34,vz:6.4,g:.4,a:0,va:.3,l:0});sfx('whoosh',q.x)}if(k==40)c5Dodge(c,-(Math.sign(q.x-p.x)||1),1);c5Two(c,q,1.1,.07)}
   else{bpPose(q,'idle',60);c5Two(c,q,1.05,.06);if(t==506)c5Aim()}}
  c.ex=q.x},
 back(c,t,q){if(t<110){const x=9236+30-cam,y=LY-200+32,a=.5+.4*Math.sin(t*.4);rgGlow(x+23,y+20,90,'255,140,50',a*.7)}},
 front(c,t,q){if(c.watch)c5Watch(c5X(q.x+q.face*46),c5Y(q.z+130),t);if(c.map){X.save();X.translate(c5X(p.x+(Math.sign(q.x-p.x)||1)*22),c5Y(p.z+96));X.scale(1.6,1.6);X.fillStyle='#e8d4a4';X.strokeStyle='#5a3a1a';X.lineWidth=1;X.fillRect(-12,-8,24,16);X.strokeRect(-12,-8,24,16);X.fillStyle='#a8262a';X.beginPath();X.arc(6,3,3.4,0,7);X.fill();X.restore()}}};

/* =====================================================================
   8) BARON VANE – diriguje stroj, smeknutí, Srdce, vysátí síly
   ===================================================================== */
BPS.bar={dur:540,c5:1,
 cam(c,t,q){return p.x},
 upd(c,t,q){if(t==1){c.qo={w:620,h:780};q.x=9230;q.face=1;c.noFace=0;LVHS.dim=.45;c.px0=p.x}
  q.x=9230;
  if(t<130){q.face=1;bpPose(q,(t>>4)%2?'cane':'wave',30);if(t%16==0)synth(()=>TS.piston(.6));c5Walk(Math.min(c.px0+160,9230-330),1.3);c5Shot(c,t<60?p.x+120:(p.x+q.x)/2,180,t<60?1.15:1.05,.04,t==1);if(t==20)c5Say('BARON VANE','Slyšíš to? Písty, kotle, výhně… Symfonie pokroku.');if(t==80)c5Say('BARON VANE','A já jsem její dirigent.')}
  else if(t<220){q.face=-1;bpPose(q,'tip',Math.max(0,60-(t-130)));c5Shot(c,q.x,q.z+200,1.45,.06);if(t==136){c5Say('BARON VANE','Ach, kaktus. Semínko, které mělo zůstat v zemi.');sfx('vBar',q.x)}}
  else if(t<290){q.face=-1;bpPose(q,'idle',40);c5Shot(c,p.x+60,p.z+100,1.7,.07);if(t==226){c5Say('KAKTUS','Vyrostl jsem. A přišel jsem pro Srdce.');c2Fid(C2COOL[SV.cls])}}
  else if(t<340){q.face=-1;bpPose(q,t<310?'point':'laugh',30);c5Shot(c,q.x,q.z+200,1.3,.06);if(t==296)c5Say('BARON VANE','Srdce? Tohle? ¡Ja! Už nebije pro poušť.');LVHS.dim=.45+.2*Math.max(0,Math.sin((t-290)*.3))}
  else if(t<430){q.face=-1;bpPose(q,'absorb',Math.max(0,70-(t-340)));q.tm0=70;LVHS.dim=Math.min(.78,LVHS.dim+.004);c.abs=1;c5Shot(c,q.x,q.z+220,tiL(1.2,1.5,tiS(t,340,430)),.05);if(t==346)c5Say('BARON VANE','Teď bije pro MĚ.');if(t%4==0)synth(()=>TS.glint(.3))}
  else{c.abs=0;q.face=-1;bpPose(q,'storm',Math.max(0,60-(t-430)));if(t==436){shake=14;sfx('heavy',q.x);ring(q.x,LY,160,'rgba(150,255,170,.85)',24,q.z);RGFL=.2;synth(()=>TS.hit(.8));c5Say('BARON VANE','Pojď, zahradníku. Zasadím tě zpátky do země.')}c5Two(c,q,1.05,.06);if(t==480)c5Aim()}
  c.ex=q.x},
 front(c,t,q){if(c.abs){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const ph=((t*.03+i/10)%1),a=i/10*6.283+t*.01,r=(1-ph)*360,x=c5X(q.x)+Math.cos(a)*r,y=c5Y(q.z+200)+Math.sin(a)*r*.6;X.strokeStyle='rgba(140,255,170,'+(.7*ph)+')';X.lineWidth=3;X.beginPath();X.moveTo(x,y);X.lineTo(x+(c5X(q.x)-x)*.25,y+(c5Y(q.z+200)-y)*.25);X.stroke()}X.restore();rgGlow(c5X(q.x),c5Y(q.z+200),120,'140,255,170',.5)}}};
