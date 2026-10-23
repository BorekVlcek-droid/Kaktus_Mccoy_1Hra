/* =====================================================================
   v69: KAPITÁN ANCLA – obří pirát v železném náprsníku (styl hrdiny), souboj s dělem
   a filmové scény (úvod, zásahy dělem ve zpomaleném záběru, finále)
   ===================================================================== */
const CPC={skin:'#dc9a6a',skinS:'#a65c38',skinH:'#f7c9a0',nose:'#d4644c',beard:'#2b2523',beardS:'#120e0d',beardH:'#6e645e',coat:'#24386a',coatS:'#141f42',gold:'#e8be4c',goldS:'#9a7420',hat:'#1e1b24',feather:'#c8302a',featherS:'#7a1410',featherH:'#f2785a',pant1:'#a8322a',pant2:'#ecdfc2',boot:'#2a1c14',peg:'#8a5a30',steel:'#c9ccd2',plate:'#a4adba',plateS:'#5e6674',plateH:'#eef2f6',pipe:'#6a4422',sash:'#a8221a',belt:'#3a2414',scar:'#e8a088'};
/* v80: původní procedurální kresba piráta nahrazena kloubovou loutkou (captain.js) */

/* =====================================================================
   FILMOVÝ SYSTÉM: zoom, černé pruhy, zpomalení, záblesk, titulky
   ===================================================================== */
const B1C={z:1,zt:1,bar:0,bart:0,fx:null,fk:.12,flash:0,slow:1,acc:0,hide:0,sub:null,subT:0,vig:0,vigT:0,lock:0};
function b1Reset(){Object.assign(B1C,{z:1,zt:1,bar:0,bart:0,fx:null,flash:0,slow:1,acc:0,hide:0,sub:null,subT:0,vig:0,vigT:0,lock:0})}
function b1Sub(who,txt,l){B1C.sub={who,txt,l:l||120,L:l||120}}
function b1Tick(){if(B1C.ban&&!(cut&&(cut.k=='bpre'||cut.k=='bpost'))&&!bI)B1C.ban.t++;B1C.z+=(B1C.zt-B1C.z)*.1;B1C.bar+=(B1C.bart-B1C.bar)*.12;B1C.vig+=(B1C.vigT-B1C.vig)*.08;if(B1C.flash>0)B1C.flash=Math.max(0,B1C.flash-.075);if(B1C.sub){B1C.sub.l--;if(B1C.sub.l<=0)B1C.sub=null}}
{const _cz=cinZoom;cinZoom=function(){return _cz()*B1C.z}}
{const _u=upd;upd=function(){b1Tick();if(B1C.slow<.999&&(state=='play'||state=='cut')){B1C.acc+=B1C.slow;if(B1C.acc<1)return;B1C.acc-=1}return _u()}}
{const _cu=camUpd;camUpd=function(){_cu();if(B1C.fx!=null&&state=='play'){const tg=Math.max(0,Math.min(lv.len-W,B1C.fx-W/2));cam+=(tg-cam)*B1C.fk}else if(state=='play'&&CAP.on&&ARN&&bossE&&bossE.B=='cap'&&bossE.st!='dead'){const e=bossE,sal=e.bst=='onship'&&CAP.mode=='salvo'&&CAP.ship,bx=sal?CAP.ship.x:(e.z>400||e.bst=='onship')?p.x:e.x,mid=sal?Math.max(p.x-W/2+90,Math.min(p.x+W/2-90,(p.x+bx)/2)):Math.abs(bx-p.x)<W*.75?p.x*.62+bx*.38:p.x,tg=Math.max(ARN[0]-40,Math.min(ARN[1]+40-W,mid-W/2));cam+=(tg-cam)*.07}}}
{const _hd=hud;hud=function(){if(B1C.hide>.5&&state=='play')return;_hd()}}
{const _d=draw;draw=function(){_d();try{b1Over()}catch(err){}}}
function b1Over(){const b=B1C.bar;X.save();X.setTransform(1,0,0,1,0,0);
 if(B1C.vig>.01){const g=X.createRadialGradient(W/2,H*.55,H*.25,W/2,H*.55,H*.9);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+.55*B1C.vig+')');X.fillStyle=g;X.fillRect(0,0,W,H)}
 if(b>.01&&!(cut&&(cut.k=='bpre'||cut.k=='bpost'))){X.fillStyle='#000';X.fillRect(0,0,W,56*b);X.fillRect(0,H-56*b,W,56*b)}
 if(B1C.flash>0){X.fillStyle='rgba(255,252,240,'+Math.min(1,B1C.flash)+')';X.fillRect(0,0,W,H)}
 const bn=B1C.ban;if(bn&&!(cut&&(cut.k=='bpre'||cut.k=='bpost'))){if(bn.t>bn.T)B1C.ban=null;else{const u=bn.t/bn.T,ia=Math.min(1,bn.t/14),oa=Math.min(1,(bn.T-bn.t)/20),sx=(1-Math.pow(1-ia,3))*W/2+(1-oa)*W*.3,y=176;X.globalAlpha=Math.min(ia,oa);X.fillStyle='rgba(10,8,14,.72)';X.beginPath();X.moveTo(sx-250,y-40);X.lineTo(sx+270,y-40);X.lineTo(sx+250,y+38);X.lineTo(sx-270,y+38);X.closePath();X.fill();X.strokeStyle='#e8c34a';X.lineWidth=2;X.stroke();X.textAlign='center';X.font='700 16px Georgia';X.fillStyle='#e8c34a';X.fillText('— '+bn.a+' —',sx,y-14);X.font="700 34px 'Rye',Georgia,serif";X.lineWidth=5;X.strokeStyle='rgba(0,0,0,.85)';X.strokeText(bn.b,sx,y+24);X.fillStyle='#fff2d0';X.fillText(bn.b,sx,y+24);X.textAlign='left';X.globalAlpha=1}}
 const s=B1C.sub;if(s){const a=Math.min(1,(s.L-s.l)/8,s.l/10);X.globalAlpha=a;X.textAlign='center';X.font='700 13px Georgia';X.fillStyle='#e8c34a';const y=H-26;if(s.who)X.fillText(s.who,W/2,y-20);X.font='italic 19px Georgia';X.lineWidth=4;X.strokeStyle='rgba(0,0,0,.85)';X.strokeText(s.txt,W/2,y);X.fillStyle='#f6eedc';X.fillText(s.txt,W/2,y);X.textAlign='left';X.globalAlpha=1}
 X.restore()}

/* =====================================================================
   DĚLO, KOULE A LOĎ KAPITÁNA
   ===================================================================== */
const CAP={on:0,can:null,pile:0,balls:[],shot:null,ship:null,hits:0,carry:0,anc:null,refill:0,props:[],tip:0,tipT:0,last:null};
const CPF=58,CPV=17;/* doutnák (snímky), rychlost koule */
function cpArenaOK(){return lv&&lv.k=='port'&&lv.bk=='cap'}
{const _st=start;start=function(i,arr){const r=_st(i,arr);Object.assign(CAP,{on:0,can:null,pile:0,balls:[],shot:null,ship:null,hits:0,carry:0,anc:null,refill:0,props:[],tip:0,tipT:0,smk:[]});b1Reset();
 try{if(cpArenaOK()){deco=deco.filter(d=>!(d.k=='pcan')&&!(d.k=='pp'&&d.x>BX-760&&d.x<BX+840)&&!(d.k=='flag'&&d.x>BX-760&&d.x<BX-300));bar=bar.filter(b=>!(b.x>BX-760&&b.x<BX+860));const cz=Math.max(0,floorAt(BX-600,1e4,6));CAP.can={x:BX-600,z:cz,st:'empty',t:0,rc:0,fuse:0};CAP.pile=2;CAP.pileX=BX-660;CAP.ship={x:BX+300,z:0,arr:0,tilt:0,sink:0,broken:0,fire:[],mast:null,t:0};
  /* visící palety jeřábu (uhnout býčímu útoku) a bedny, které kapitán rozbíjí */CAP.bump=null;for(const [x0,t0] of [[BX-360,88],[BX-60,88],[BX+250,88],[BX+540,88]])sol.push({x:x0,w:118,t:t0,b:t0-14,k:'cph',ow:1});for(const x0 of [BX-200,BX+120,BX+420,BX+690])sol.push({x:x0,w:44,t:44,b:0,k:'c',cpc:1,rt:0,drop:0})}}catch(err){console.error('cp',err)}return r}}
function cpMuzzle(){const c=CAP.can;return[c.x+74-c.rc,c.z+44]}
function cpNearCan(){const c=CAP.can;return c&&Math.abs(p.x-(c.x-6))<70&&Math.abs(p.z-c.z)<40}
function cpNearPile(){return CAP.pile>0&&Math.abs(p.x-CAP.pileX)<46&&Math.abs(p.z-CAP.can.z)<40}
function cpLooseNear(){let b=null,bd=40;for(const q of CAP.balls){if(q.hot>0)continue;const d=Math.abs(q.x-p.x);if(d<bd&&Math.abs(q.z-p.z)<44&&q.rest){bd=d;b=q}}return b}
/* E: zvednout / nabít / zapálit */
{const _ip=interactP;interactP=function(){if(CAP.on&&CAP.can){const c=CAP.can;
  if(!CAP.carry){const lb=cpLooseNear();if(lb){CAP.balls=CAP.balls.filter(q=>q!==lb);CAP.carry=1;sfx('pick',p.x);return}if(cpNearPile()){CAP.pile--;CAP.carry=1;sfx('pick',p.x);return}}
  if(cpNearCan()){if(CAP.carry&&c.st=='empty'){CAP.carry=0;c.st='load';c.t=22;sfx('clack',c.x);sfx('thud',c.x);pop(c.x,LY,c.z+90,'NABITO!','#ffe28a');return}
   if(c.st=='loaded'){c.st='fuse';c.fuse=CPF;sfx('fuse',c.x);CAP.tipT=0;return}
   if(c.st=='empty'&&!CAP.carry){pop(c.x,LY,c.z+90,'Chybí koule!','#ffb0a0');return}}}
 return _ip()}}
/* nesení koule: bez útoků, pomalejší */
{const _u=upd;upd=function(){if(CAP.carry&&state=='play'){for(const k of ['attack','heavy','ranged','special','dash'])delete P[k]}const r=_u();if(CAP.carry&&state=='play'&&p){p.vx*=.82;if(p.dead){CAP.carry=0}}return r}}
{const _hp=hurtP;hurtP=function(d,dir){const h0=p.hp;const r=_hp(d,dir);if(CAP.carry&&p.hp<h0){CAP.carry=0;CAP.balls.push({x:p.x,z:p.z+70,vx:dir*2.5,vz:4,hot:0,rest:0});pop(p.x,LY,p.z+120,'Upustil jsi kouli!','#ffb0a0')}return r}}
{const _dp=dPlayer;dPlayer=function(){const r=_dp();if(CAP.carry&&p){const x=p.x-cam,y=LY-p.z-112+Math.sin(T*.2)*1.5;cpBallDraw(x,y,1)}return r}}
function cpBallDraw(x,y,s,hot){X.save();X.translate(x,y);X.scale(s,s);const g=X.createRadialGradient(-4,-4,1,0,0,11);g.addColorStop(0,hot?'#ffb070':'#7a7e88');g.addColorStop(.6,hot?'#c8501e':'#3a3c44');g.addColorStop(1,hot?'#5a1a08':'#141518');X.fillStyle=g;X.beginPath();X.arc(0,0,10.5,0,7);X.fill();X.strokeStyle='#0c0a08';X.lineWidth=1.6;X.stroke();X.fillStyle='rgba(255,255,255,.45)';X.beginPath();X.arc(-4,-4,2.6,0,7);X.fill();X.restore();if(hot)rgGlow(x,y,26*s,'255,120,40',.5)}
/* --------- aktualizace děla, koulí a výstřelu --------- */
function cpUpd(){if(!CAP.on)return;const c=CAP.can;c.rc*=.86;if(c.st=='load'){c.t--;if(c.t<=0)c.st='loaded'}
 if(c.st=='fuse'){c.fuse--;if(c.fuse%6==0)par.push({x:c.x-34,y:LY,z:c.z+52,fz:-999,vx:R(-.6,.6),vz:R(.5,1.6),l:R(10,18),c:T%12<6?'#ffd44a':'#fff',s:2});if(c.fuse<=0)cpFire()}
 if(c.st=='cool'){c.t--;if(c.t<=0)c.st='empty'}
 /* koule na zemi */for(const b of CAP.balls){if(b.hot>0)b.hot--;b.vz-=.5;b.z+=b.vz;b.x+=b.vx;const f=floorAt(b.x,b.z+8,6);if(b.z<=f){b.z=f;if(b.vz<-3){b.vz*=-.35;sfx('thud',b.x);spawnP(b.x,LY,4,lv.du,2,8,f)}else{b.vz=0}b.vx*=.94;if(Math.abs(b.vx)<.08){b.vx=0;b.rest=1}}if(ARN){if(b.x<ARN[0]+30){b.x=ARN[0]+30;b.vx=Math.abs(b.vx)*.4}if(b.x>ARN[1]-30){b.x=ARN[1]-30;b.vx=-Math.abs(b.vx)*.4}}if(b.z<LOWZ)b.dead=1;if(b.hot>0&&T%5==0)par.push({x:b.x,y:LY,z:b.z+10,fz:-999,vx:R(-.3,.3),vz:R(.6,1.4),l:30,c:'rgba(200,200,200,.4)',s:R(3,6)})}
 CAP.balls=CAP.balls.filter(b=>!b.dead);
 /* doplnění munice – přístavní dělník hodí kouli */const e=bossE;if(c.st=='empty'&&!CAP.carry&&!CAP.pile&&!CAP.balls.length&&!CAP.shot&&e&&e.st!='dead'){CAP.refill++;if(CAP.refill==200){CAP.balls.push({x:ARN[0]+10,z:150,vx:3.4,vz:3,hot:0,rest:0});b1Sub('DĚLNÍK Z PŘÍSTAVU','Kaktusi! Chytej – poslední koule z lodi!',110);sfx('whoosh',p.x)}}else CAP.refill=0;
 cpShotUpd();cpAncUpd();cpPropsUpd();
 if(CAP.ship){const s=CAP.ship;s.t++;s.fire=s.fire.filter(f=>++f.t<70)}}
function cpPropsUpd(){CAP.props.forEach(q=>{q.vz-=.4;q.z+=q.vz;q.x+=q.vx;q.r+=q.vr;const f=floorAt(q.x,q.z+6,6);if(q.z<=f){q.z=f;q.vz=0;q.vx*=.8;q.vr*=.6;const tr=Math.round(q.r/(Math.PI*2))*Math.PI*2;q.r+=(tr-q.r)*.2}})}
{const _cb=CUTX.bpost;CUTX.bpost=c=>{_cb(c);if(c.k2=='cap')try{cpPropsUpd();if(CAP.ship){CAP.ship.t++;CAP.ship.fire=CAP.ship.fire.filter(f=>++f.t<70)}}catch(e){}}}
function cpFire(){const c=CAP.can,[mx,mz]=cpMuzzle();c.st='cool';c.t=50;c.rc=18;shake=10;stop=4;sfx('cannon',c.x);sfx('boom',c.x);ring(mx,LY,60,'rgba(255,220,150,.9)',16,mz-20);fx.push({k:'boom',x:mx+20,y:LY,z:mz-30,l:20,L:20});
 for(let i=0;i<16;i++)par.push({x:mx+R(0,30),y:LY,z:mz+R(-10,10),fz:-999,vx:R(1,6),vz:R(-1,2.4),l:R(40,70),c:'rgba(220,215,205,.55)',s:R(6,12)});spawnP(mx,LY,10,'#ffb14a',4,20,mz);
 if(bossE&&bossE.bst=='onship'&&CAP.mode=='salvo'&&CAP.ship){const S=CAP.ship;CAP.shot={ph:'ship',t:0,x0:mx,z0:mz,tx:S.x-30+R(-30,30),tr:[]};c.aim=-.5;B1C.flash=.3;B1C.zt=1.06;B1C.fx=mx+260;B1C.fk=.08;return}
 const be=bossE,tz=be&&be.st!='dead'?(be.gf==null?be.z:be.gf)+118:mz+40,tt=be?Math.max(8,(be.x-mx)/CPV):20;CAP.shot={x:mx,z:mz,vx:CPV,vz:(tz-mz)/tt+.015*tt/2,t:0,ph:'fly',tr:[]};c.aim=Math.atan2(CAP.shot.vz,CPV);B1C.flash=.35;B1C.bart=1;B1C.hide=1;B1C.zt=1.16;B1C.fx=mx+180;B1C.fk=.2;B1C.slow=.35;CAP.shot.sl=14}
/* rozhodne, zda je kapitán bezbranný (a jak dlouho ještě) */
function cpVul(e){if(!e||e.st=='dead')return 0;const B=e.bst;if(B=='stuck'||B=='tired'||B=='dizzy'||B=='broad'||B=='chargeW'||B=='down'||B=='rise2'||B=='yank')return 1;if(B=='air'&&e.vz<0&&e.z-(e.gf||0)<90)return 1;if(B=='anchor'&&(e.tm<=24||CAP.anc))return 1;if(B=='sweep'&&e.tm<=22&&e.tm>=6)return 1;return 0}
/* předpověď: kdy začne/skončí okno (ve snímcích) */
function cpWin(e){if(!e||e.st=='dead')return null;const B=e.bst,tm=e.tm,stuckT=[0,150,118,96][e.ph||1];
 if(e.x<cpMuzzle()[0]+40)return null;
 if(B=='stuck'||B=='tired'||B=='dizzy'||B=='broad'||B=='chargeW')return[0,Math.max(0,tm)];if(B=='down')return[0,Math.max(0,tm)+40];
 if(B=='anchor')return CAP.anc?[0,CAP.anc.back?Math.max(0,CAP.anc.d/9):40+CAP.anc.d/9]:[Math.max(0,tm-24),Math.max(0,tm-24)+70];
 if(B=='air'||B=='slam'){const [mx]=cpMuzzle();let kb=B=='air'?(e.kb||0):Math.sign(p.x-e.x)*Math.min(6,Math.abs(p.x-e.x)/24);if(B=='slam'&&kb<0)kb=Math.max(kb,Math.min(0,-(e.x-(CAP.can.x+180))*.14));if(e.x+kb/.14<mx+70)return null}
 if(B=='air'){const tl=Math.max(2,(e.vz+Math.sqrt(Math.max(0,e.vz*e.vz+2*.5*(e.z-e.gf))))/.5);return[Math.max(0,tl-6),tl+stuckT]}
 if(B=='slam'){return[tm+42,tm+48+stuckT]}
 if(B=='curl')return[tm+150,tm+250];
 if(B=='sweep')return[Math.max(0,tm-22),Math.max(0,tm-6)];
 return null}
function cpArrive(e,lit){const [mx]=cpMuzzle();const ex=e.x+(e.bst=='air'&&e.kb?e.kb/.14:0);return(lit?0:CPF)+Math.max(0,(ex-mx-40)/CPV)}
function cpShotUpd(){const s=CAP.shot;if(!s)return;const e=bossE;s.t++;
 if(s.sl>0){s.sl--;if(s.sl==0)B1C.slow=1}
 if(s.ph=='fly'){s.x+=s.vx;s.z+=s.vz;s.vz-=.015;s.tr.push([s.x,s.z]);if(s.tr.length>14)s.tr.shift();B1C.fx=s.x+60;if(s.t>4)B1C.zt=1.08;
  for(const o of ens){if(o===e||o.st=='dead'||isB(o))continue;if(Math.abs(o.x-s.x)<26&&s.z>o.z&&s.z<o.z+120){hurtE(o,99,1,1);pop(o.x,LY,o.z+120,'KUŽELKA!','#ffe28a')}}
  if(e&&e.st!='dead'&&e.B=='cap'){const dx=e.x-s.x,hit=Math.abs(dx)<52&&s.z>e.z+6&&s.z<e.z+215;
   if(dx>0&&dx<190&&cpVul(e)&&!s.bt&&s.z>e.z+6&&s.z<e.z+215){s.bt=1;B1C.slow=.14;B1C.zt=1.42;B1C.vigT=1;sfx('whoosh',s.x)}
   if(hit){if(cpVul(e))cpHit(e,s);else cpBlock(e,s);return}}
  if(s.x>(ARN?ARN[1]+260:s.x+1)||s.z<-60){CAP.shot=null;cpSplash(s.x,0);cpCineEnd(30);pop(p.x,LY,p.z+120,'Vedle!','#ffb0a0')}}
 else if(s.ph=='after'){s.k--;if(s.k<=0){CAP.shot=null;cpCineEnd(40)}}
 else if(s.ph=='ship'){const u=s.t/52,S=CAP.ship;s.x=s.x0+(s.tx-s.x0)*u;s.y=(LY-s.z0)+((LY-112)-(LY-s.z0))*u-210*Math.sin(Math.PI*u);s.k2=1-.45*u;s.tr.push([s.x,s.y,s.k2]);if(s.tr.length>12)s.tr.shift();B1C.fx=s.x;
  if(u>=1){CAP.shot=null;cpCineEnd(30);CAP.shipHits=(CAP.shipHits||0)+1;shake=14;B1C.flash=.3;sfx('boom',s.x);sfx('break',s.x);if(S){for(let i=0;i<4;i++)S.fire.push({t:-i*2,px:(s.tx-S.x)/.62+R(-30,30),py:-40+R(-20,10)});S.hit=30}for(let i=0;i<22;i++)par.push({x:s.tx+R(-20,20),y:LY,z:100+R(-10,30),fz:-999,vx:R(-4,4),vz:R(1,7),l:R(30,60),c:i%3?'#ffb040':'rgba(70,60,56,.6)',s:R(3,7)});{const nd=cpSalvoCfg().need;pop(s.tx,LY,220,CAP.shipHits>=nd?'PRACHÁRNA!':'ZÁSAH LODI! '+CAP.shipHits+'/'+nd,'#ffe28a');if(CAP.shipHits<nd){const bE=bossE;if(bE)bE.svT=Math.min(bE.svT||0,cpSalvoCfg().per-80);cpSalvoFood(1)}}}}}
function cpCineEnd(d){B1C.slow=1;B1C.zt=1;B1C.bart=0;B1C.fx=null;B1C.vigT=0;setTimeout(()=>{},0);CAP.endT=d;B1C.hide=bossE&&bossE.st=='dead'?1:0}
function cpSplash(x,z0){sfx('splash',x);for(let i=0;i<18;i++)par.push({x:x+R(-20,20),y:LY,z:(z0||-20)+R(0,10),fz:-999,vx:R(-2,2),vz:R(3,8),l:R(30,50),c:i%2?'rgba(220,235,255,.85)':'rgba(140,180,220,.7)',s:R(3,6)})}
function cpHit(e,s){const dmg=Math.min(Math.ceil(e.mhp*.15),(e.phS||1)>=4?1e9:Math.max(0,e.hp-cpFloor(e)));CAP.hits++;stop=6;shake=20;B1C.flash=.75;sfx('boom',e.x);sfx('heavy',e.x);sfx('break',e.x);sfx('vCap',e.x);
 const hz=s.z;ring(e.x,LY,140,'rgba(255,240,200,.95)',26,hz-30);ring(e.x,LY,80,'rgba(255,170,90,.9)',18,hz-30);fx.push({k:'boom',x:e.x-20,y:LY,z:hz-30,l:28,L:28});
 for(let i=0;i<26;i++)par.push({x:e.x+R(-30,30),y:LY,z:hz+R(-20,40),fz:-999,vx:R(-2,9),vz:R(0,9),l:R(30,60),c:i%3==0?CPC.gold:i%3==1?'#2a3c78':'#efe8d8',s:R(2,5)});
 for(let i=0;i<10;i++)par.push({x:e.x,y:LY,z:hz+20,fz:-999,vx:R(-3,6),vz:R(2,7),l:R(40,70),c:i%2?'#1e2a52':'#ffd24a',s:R(2,4)});
 pop(e.x,LY,e.z+230,['BUM!','TREFA!','KABOOM!','BUM!'][CAP.hits-1]||'BUM!','#ffe28a');
 CAP.props.push({k:'hat',x:e.x,z:e.z+160,vx:3.2*(e.face>0?-1:1)*-1+R(-1,1),vz:9,r:0,vr:R(.2,.35)});e.lost={hat:1};
 CAP.shot.ph='after';CAP.shot.k=60;B1C.zt=1.22;B1C.fx=e.x+60;B1C.slow=.32;CAP.shot.sl=20;
 CAP.allow=1;try{if(e.hp-dmg<=0&&(e.phS||1)>=4){e.hp=1;hurtE(e,5,1,1)}else{e.hp-=dmg;e.hs=3}}finally{CAP.allow=0}
 if(e.st!='dead'){e.bst='hurt';e.tm=60;e.vz=10;e.z+=1;e.kb=7.5;e.face=-1;cpSay(e,['¡AAAARGH! Moje vesta!','¡Por todos los mares…!','To… to byla moje vlastní koule?!'][CAP.hits-1]||'¡AY!')}
 else{B1C.slow=.25;CAP.shot.sl=18;B1C.zt=1.3}}
function cpBlock(e,s){sfx('block',e.x);sfx('clack',e.x);B1C.flash=.4;stop=5;shake=8;burst(s.x,LY,s.z,'#fff');for(let i=0;i<14;i++)par.push({x:s.x,y:LY,z:s.z,fz:-999,vx:R(-5,1),vz:R(-2,6),l:R(12,24),c:i%2?'#ffe28a':'#fff',s:2});
 pop(e.x,LY,e.z+210,'CINK!','#cfe8ff');cpSay(e,['¡Ja! Kyj je můj štít!','Na to si musíš přivstat, kaktusi!','¡Jo-jo-jo! Vedle!'][(T>>3)%3]);
 CAP.balls.push({x:s.x-20,z:s.z,vx:-R(3,5.5),vz:R(7,9),hot:40,rest:0});CAP.shot.ph='after';CAP.shot.k=26;B1C.slow=.4;CAP.shot.sl=16;B1C.zt=1.1;if(e.bst=='guard'){e.bst='laugh';e.tm=50}}
function cpSay(e,t){bSay(e,t,80,1)}
/* kotva na řetězu (hod) */
function cpAncUpd(){const a=CAP.anc;if(!a)return;const e=a.e;if(!e||e.st=='dead'||e.bst!='anchor'){CAP.anc=null;return}
 if(!a.back){a.d+=9;if(a.d>=a.max||wallAt(e.x+e.face*a.d,e.z,30,6)){a.back=1;sfx('chain',e.x);shake=4;spawnP(e.x+e.face*a.d,LY,6,lv.du,3,12,e.z)}}else{a.d-=8;if(a.d<=40){CAP.anc=null;e.tm=Math.min(e.tm,10)}}
 const ax=e.x+e.face*(a.d+30),az=e.z+(a.back?60:90);a.x=ax;a.z=az;if(!p.dead&&Math.abs(p.x-ax)<40&&Math.abs(p.z+40-az)<55&&!(p.inv>0))hurtP(1,e.face)}
function cpAncDraw(){const a=CAP.anc;if(!a||!a.e)return;const e=a.e,s=sc(LY)*1.02,hx=e._fh?e._fh[0]-cam:e.x-cam+e.face*90*s,hy=e._fh?LY-e._fh[1]:LY-e.z-140*s,ax=a.x-cam,ay=LY-a.z;cpChain(hx,hy,ax-e.face*10,ay,10,.9);bAnchor(ax,ay,e.face>0?Math.PI*0+Math.sin(T*.3)*.1:Math.PI+Math.sin(T*.3)*.1,.95)}
/* --------- kreslení děla, munice, kotvy, rekvizit --------- */
{const _da=dArena;dArena=function(){_da();if(!cpArenaOK()||!CAP.can)return;try{cpDrawAll()}catch(err){console.error('cpd',err)}}}
function cpDrawAll(){const c=CAP.can;if(!c)return;const x=c.x-cam,y=LY-c.z;
 /* pyramida koulí */if(CAP.pile>0){const px=CAP.pileX-cam;const pos=[[-12,0],[12,0],[0,-18]].slice(0,CAP.pile+(CAP.pile>1?1:0));for(let i=0;i<Math.min(3,CAP.pile);i++){const q=[[-11,-10],[11,-10],[0,-27]][i];cpBallDraw(px+q[0],y+q[1],1)}X.fillStyle='#3a2414';X.fillRect(px-24,y-2,48,4)}
 /* dělo na lafetě */X.save();X.translate(x,y);X.lineJoin='round';const rc=-c.rc;
 X.fillStyle='rgba(0,0,0,.35)';X.beginPath();X.ellipse(0,2,60,7,0,0,7);X.fill();
 const Lf=new Path2D();Lf.moveTo(-56,-8);Lf.lineTo(40,-8);Lf.lineTo(44,-30);Lf.lineTo(-30,-40);Lf.lineTo(-56,-24);Lf.closePath();cel(Lf,'#6a4426',1.6,1,'#3a2410','#a07040');hStroke(Lf,1.8);X.strokeStyle='rgba(0,0,0,.35)';X.lineWidth=1;X.beginPath();X.moveTo(-50,-16);X.lineTo(40,-18);X.stroke();
 for(const wx of [-34,26]){X.save();X.translate(wx,-8);X.rotate(-c.rc*.05+(c.st=='cool'?0:0));const Wh=new Path2D();Wh.arc(0,0,13,0,7);cel(Wh,'#4a3020',1.2,.8,'#2a1a0e','#8a6040');hStroke(Wh,1.6);X.strokeStyle='#2a1a0e';X.lineWidth=2;for(let k=0;k<4;k++){X.rotate(.785);X.beginPath();X.moveTo(-11,0);X.lineTo(11,0);X.stroke()}X.fillStyle='#c9a040';X.beginPath();X.arc(0,0,3.2,0,7);X.fill();X.restore()}
 X.save();X.translate(rc,-40);c.aimV=(c.aimV||0)+(((c.st=='loaded'||c.st=='fuse')&&bossE&&bossE.st!='dead'?Math.atan2(((bossE.gf==null?bossE.z:bossE.gf)+92)-(c.z+44),Math.max(60,bossE.x-c.x)):(c.aim||0))-(c.aimV||0))*.1;X.rotate(-.04-c.aimV);const Br=new Path2D();Br.moveTo(-46,-13);Br.quadraticCurveTo(-60,0,-46,13);Br.lineTo(70,9);Br.lineTo(70,-9);Br.closePath();cel(Br,'#a07a3a',2,1.2,'#5a3e18','#f2d28a');hStroke(Br,1.8);
 for(const bx of [-30,8,50,66]){const Bd=aRR(bx,-12+(bx>40?1.4:0),5,24-(bx>40?2.8:0),1.5);cel(Bd,'#c89a4a',1,.8,'#6a4a1e','#ffe2a0');hStroke(Bd,1)}X.fillStyle='#120a04';X.beginPath();X.ellipse(70,0,3.6,8,0,0,7);X.fill();
 X.fillStyle='#2a1a0a';X.beginPath();X.arc(-40,-12,3,0,7);X.fill();X.fillStyle='#f2d28a';X.font='700 11px Georgia';X.textAlign='center';X.fillText('K',20,4);X.restore();
 /* doutnák */if(c.st=='fuse'||c.st=='loaded'){const u=c.st=='fuse'?c.fuse/CPF:1,L=26*u;X.strokeStyle='#d8c8a0';X.lineWidth=2;X.beginPath();X.moveTo(-40+rc,-52);X.quadraticCurveTo(-52+rc,-60,-50+rc-L*.2,-52-L);X.stroke();if(c.st=='fuse'){const fx2=-50+rc-L*.2,fy2=-52-L;X.fillStyle=T%4<2?'#ffd44a':'#fff';X.beginPath();X.arc(fx2,fy2,3.4+Math.random()*2.4,0,7);X.fill();X.restore();rgGlow(x+fx2,y+fy2,26,'255,200,80',.9);X.save();X.translate(x,y)}}
 if(c.st=='loaded'||c.st=='fuse'){X.fillStyle='rgba(255,220,140,.35)';X.beginPath();X.arc(70+rc,-40,5,0,7);X.fill()}
 X.restore();
 /* volné koule */for(const b of CAP.balls)cpBallDraw(b.x-cam,LY-b.z-10,1,b.hot>0);
 /* kotva na řetězu */cpAncDraw();
 /* odhozený klobouk */for(const q of CAP.props){if(q.k=='hat'){X.save();X.translate(q.x-cam,LY-q.z-6);X.rotate(q.r);cpHat(0,-4,0,.75,1);X.restore()}}
 /* koule letí na loď (do hloubky) */const s=CAP.shot;if(s&&s.ph=='ship'&&s.y!=null){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<s.tr.length;i++){const q=s.tr[i],k=i/s.tr.length;X.fillStyle='rgba(255,'+(160+k*80|0)+',90,'+k*.45+')';X.beginPath();X.arc(q[0]-cam,q[1],(3+k*7)*q[2],0,7);X.fill()}X.restore();cpBallDraw(s.x-cam,s.y,1.15*s.k2);rgGlow(s.x-cam,s.y,26*s.k2,'255,190,110',.5)}
 if(s&&s.ph=='fly'){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<s.tr.length;i++){const q=s.tr[i],k=i/s.tr.length;X.fillStyle='rgba(255,'+(160+k*80|0)+',90,'+k*.45+')';X.beginPath();X.arc(q[0]-cam,LY-q[1],3+k*8,0,7);X.fill()}X.restore();for(let i=0;i<3;i++){const k=i/3;X.fillStyle='rgba(230,230,230,'+(.25-k*.07)+')';X.beginPath();X.arc(s.x-cam-24-i*16,LY-s.z+R(-2,2),6+i*3,0,7);X.fill()}cpBallDraw(s.x-cam,LY-s.z,1.15);rgGlow(s.x-cam,LY-s.z,30,'255,190,110',.5)}
 }
{const _df=dFx;dFx=function(){_df();try{if(cpArenaOK()&&CAP.on)cpHints()}catch(err){console.error('cph',err)}}}
/* nápovědy u děla a zaměřovač na kapitánovi */
function cpHints(){const c=CAP.can,e=bossE;if(!c||state!='play'||!CAP.on)return;const x=c.x-cam,y=LY-c.z;
 let t=null;if(cpNearCan()){if(CAP.carry&&c.st=='empty')t='[E] Nabít';else if(c.st=='loaded')t='[E] Zapálit doutnák';else if(c.st=='empty')t='Přines kouli';}else if(!CAP.carry&&(cpNearPile()||cpLooseNear()))t='[E] Zvednout kouli';
 if(t){X.save();X.font='700 13px Georgia';const w=X.measureText(t).width+20,hx=(cpNearCan()?x:p.x-cam)-w/2,hy=(cpNearCan()?y-92:LY-p.z-150);X.fillStyle='rgba(20,10,6,.75)';X.beginPath();X.roundRect(hx,hy,w,22,11);X.fill();X.strokeStyle='#e8c34a';X.lineWidth=1.4;X.stroke();X.fillStyle='#ffe8b0';X.fillText(t,hx+10,hy+15.5);X.restore()}
 if(c.st=='fuse'){const u=c.fuse/CPF;X.save();X.fillStyle='rgba(0,0,0,.6)';X.fillRect(x-30,y-82,60,7);X.fillStyle=u<.3?'#ff6a3a':'#ffd44a';X.fillRect(x-29,y-81,58*u,5);X.restore()}
 if(e&&e.bst=='onship'&&CAP.mode=='salvo'&&CAP.ship&&!CAP.shot){const S=CAP.ship,tx=S.x-30-cam,ty=LY-112,r=26+Math.sin(T*.3)*3;X.save();X.strokeStyle='rgba(140,255,150,.95)';X.lineWidth=3;X.beginPath();X.arc(tx,ty,r,0,7);X.stroke();for(let k=0;k<4;k++){const a=k*Math.PI/2+T*.03;X.beginPath();X.moveTo(tx+Math.cos(a)*(r-8),ty+Math.sin(a)*(r-8));X.lineTo(tx+Math.cos(a)*(r+8),ty+Math.sin(a)*(r+8));X.stroke()}X.font='800 16px Georgia';X.textAlign='center';X.lineWidth=4;X.strokeStyle='rgba(0,0,0,.8)';const tt='PAL NA LOĎ! '+(CAP.shipHits||0)+'/'+cpSalvoCfg().need;X.strokeText(tt,tx,ty-r-12);X.fillStyle='#9cff8a';X.fillText(tt,tx,ty-r-12);X.textAlign='left';X.restore()}
 /* zaměřovač: zelený = zapal teď a koule dorazí, když bude bezbranný */
 if(e&&e.B=='cap'&&e.st!='dead'&&e.bst!='onship'&&e.z<400&&(c.st=='loaded'||c.st=='fuse')&&!CAP.shot){const w=cpWin(e),arr=cpArrive(e,c.st=='fuse'),good=w&&arr>=w[0]-4&&arr<=w[1]-2;const ex=e.x-cam,ey=LY-e.z-96,r=good?30+Math.sin(T*.3)*3:34;
  X.save();X.strokeStyle=good?'rgba(140,255,150,.95)':'rgba(255,120,90,.55)';X.lineWidth=good?3:2;X.beginPath();X.arc(ex,ey,r,0,7);X.stroke();for(let k=0;k<4;k++){const a=k*Math.PI/2+T*.03;X.beginPath();X.moveTo(ex+Math.cos(a)*(r-8),ey+Math.sin(a)*(r-8));X.lineTo(ex+Math.cos(a)*(r+8),ey+Math.sin(a)*(r+8));X.stroke()}
  if(good&&c.st=='loaded'){X.font='800 18px Georgia';X.textAlign='center';X.lineWidth=4;X.strokeStyle='rgba(0,0,0,.8)';X.strokeText('TEĎ!',ex,ey-r-10);X.fillStyle='#9cff8a';X.fillText('TEĎ!',ex,ey-r-10);X.textAlign='left'}
  if(cpNearCan()){const [mx,mz]=cpMuzzle();X.setLineDash([4,7]);X.strokeStyle=good?'rgba(140,255,150,.45)':'rgba(255,230,180,.25)';X.lineWidth=1.6;X.beginPath();X.moveTo(mx-cam,LY-mz);X.lineTo(ex-30,LY-mz);X.stroke();X.setLineDash([])}X.restore()}}
/* --------- loď kapitána za molem (pozadí) --------- */
{const _bx=bgX;bgX=function(){_bx();if(cpArenaOK()&&CAP.ship)try{cpShipDraw()}catch(err){console.error('ship',err)}}}
const CPS={cv:null};
function cpShipDraw(){const s=CAP.ship,wx=s.x-cam;if(wx<-500||wx>W+500)return;const wy=LY-96+s.sink;
 /* voda za molem */const x0=Math.max(-20,ARN?ARN[0]-cam-300:wx-700),x1=W+20;const wg=X.createLinearGradient(0,LY-118,0,LY-40);wg.addColorStop(0,'rgba(18,34,58,0)');wg.addColorStop(.3,'rgba(14,28,48,.95)');wg.addColorStop(1,'#08121e');X.fillStyle=wg;X.fillRect(x0,LY-118,x1-x0,80);
 X.save();X.globalCompositeOperation='lighter';for(let i=0;i<10;i++){const y=LY-96+i*3,w=(20+i*8)*(.5+.5*Math.sin(T*.06+i*1.7));X.fillStyle='rgba(180,200,240,'+(.12-i*.01)+')';X.fillRect(wx+Math.sin(T*.04+i)*10-w/2-140,y,w,1.2);X.fillRect(wx+Math.sin(T*.05+i+2)*10-w/2+180,y,w*.7,1.2)}X.restore();
 /* loď do pomocného plátna */let c=CPS.cv;if(!c){c=CPS.cv=pbCv(520,360);CPS.g=c.getContext('2d')}const q=CPS.g;q.setTransform(1,0,0,1,0,0);q.clearRect(0,0,520,360);const sc2=.62;
 const X0=X;X=q;try{X.save();X.translate(220,318);X.rotate(s.tilt);X.scale(sc2,sc2);const t=T;
  [[150,-262,[[-250,62,62],[-180,74,74]]],[10,-300,[[-290,70,70],[-218,84,82],[-136,92,70]]]].forEach(([mx,mt,S],mi)=>{if(mi==1&&s.broken)return;S.forEach(([yt,hw,sh],k)=>{k3Sail(mx,yt,hw*.95,sh,{i:mi*5+k+40,emb:mi==1&&k==1},t);k3Yard(mx,yt-2,hw*.95)})});
  const ls=Math.sin(t*.03)*4;X.fillStyle='#e8dcc0';X.beginPath();X.moveTo(-150,-226);X.quadraticCurveTo(-110+ls,-170,-112,-118);X.lineTo(-226,-114);X.quadraticCurveTo(-200,-170+ls,-150,-226);X.closePath();X.fill();X.strokeStyle='#3a2414';X.lineWidth=3;X.beginPath();X.moveTo(-232,-104);X.lineTo(-140,-240);X.stroke();
  X.drawImage(b5GalHull(s.broken),-320,-400);
  const fw=k=>Math.sin(t*.12+k)*4;X.fillStyle='#1a1414';X.beginPath();X.moveTo(-246,-112);X.lineTo(-246,-150);for(let i=0;i<=6;i++)X.lineTo(-246-i*7,-150+fw(i)*(i/6));for(let i=6;i>=0;i--)X.lineTo(-246-i*7,-128+fw(i)*(i/6));X.closePath();X.fill();X.fillStyle='#c8a050';X.font='700 16px Georgia';X.textAlign='center';X.fillText('V',-266,-133);
  try{cpDeckCapt()}catch(err){console.error('deck',err)}if(s.hit>0)s.hit--;
  if(s.broken&&s.mast){const m=s.mast;X.save();X.translate(10,-62);X.rotate(m.a);X.fillStyle='#4a3220';X.fillRect(-4,-238,8,238);X.fillStyle='#e6dcc0';X.beginPath();X.moveTo(-60,-200);X.quadraticCurveTo(0,-150+Math.sin(t*.1)*6,64,-196);X.lineTo(50,-120);X.quadraticCurveTo(0,-100,-48,-126);X.closePath();X.fill();X.restore()}
  X.restore()}finally{X=X0}
 q.save();q.globalCompositeOperation='source-atop';q.fillStyle='rgba(10,18,40,.4)';q.fillRect(0,0,520,360);q.restore();
 X.save();X.beginPath();X.rect(-50,-400,W+100,wy+400+2);X.clip();X.drawImage(c,wx-220,wy-318);X.restore();
 /* světla oken a luceren */X.save();X.globalCompositeOperation='lighter';if(s.sink<60){const a=(1-s.sink/60)*(s.lit==null?1:s.lit);for(let i=0;i<5;i++){const lx=wx+(-222+i*20+5)*sc2,ly=wy+(-88)*sc2;const g=X.createRadialGradient(lx,ly,0,lx,ly,16);g.addColorStop(0,'rgba(255,200,120,'+.5*a+')');g.addColorStop(1,'rgba(255,200,120,0)');X.fillStyle=g;X.fillRect(lx-16,ly-16,32,32)}
  for(const lx0 of [-238,-200,-160]){const lx=wx+lx0*sc2,ly=wy-125*sc2;const g=X.createRadialGradient(lx,ly,0,lx,ly,22);g.addColorStop(0,'rgba(255,220,140,'+.7*a+')');g.addColorStop(1,'rgba(255,220,140,0)');X.fillStyle=g;X.fillRect(lx-22,ly-22,44,44)}}
 /* záblesky lodních děl */for(const f of s.fire){if(f.t<0)continue;const k=1-f.t/70,px=wx+f.px*sc2,py=wy+f.py*sc2;if(f.t<10){const g=X.createRadialGradient(px,py,0,px,py,46);g.addColorStop(0,'rgba(255,230,160,'+(1-f.t/10)+')');g.addColorStop(1,'rgba(255,120,40,0)');X.fillStyle=g;X.fillRect(px-46,py-46,92,92)}}X.restore();
 for(const f of s.fire){if(f.t<0)continue;const k=f.t/70;for(let j=0;j<3;j++){const r=10+k*40+j*8,a=(1-k)*.35;if(a<=0)continue;const px=wx+f.px*sc2+k*30+j*10,py=wy+f.py*sc2-k*30-j*6,g=X.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(200,200,205,'+a+')');g.addColorStop(1,'rgba(200,200,205,0)');X.fillStyle=g;X.fillRect(px-r,py-r,r*2,r*2)}}
 /* požár na palubě po nárazu – jazyky plamenů, odlesk na vodě, jiskry a dým */if(s.burn){if(!s.bT)s.bT=T;const gr=Math.min(1,(T-s.bT)/50)*Math.max(0,1-s.sink/110),dy=wy-60*sc2;
  X.save();X.beginPath();X.rect(-50,-400,W+100,LY-98+400);X.clip();
  X.save();X.globalCompositeOperation='lighter';const gg=X.createRadialGradient(wx,dy-20,10,wx,dy-20,220);gg.addColorStop(0,'rgba(255,150,60,'+.45*gr+')');gg.addColorStop(1,'rgba(255,90,30,0)');X.fillStyle=gg;X.fillRect(wx-230,dy-240,460,300);X.restore();
  const FS=[[-178,46,12],[-128,70,16],[-80,54,13],[-30,92,19],[18,62,15],[62,80,17],[112,58,14],[158,40,11]];
  for(const L of [0,1,2])for(let i=0;i<FS.length;i++){const [fx0,h0,w0]=FS[i],k=Math.min(1,gr*1.6-i*.08);if(k<=0)continue;const x=wx+fx0*sc2,ph=i*1.93,fl=1+Math.sin(T*.37+ph)*.16+Math.sin(T*.83+ph*2.1)*.09,h=h0*k*fl*[1,.72,.42][L],w=w0*[1,.7,.42][L],sw=Math.sin(T*.19+ph)*w*.6+(Math.sin(T*.05)*.5+.5)*w*.4;
   X.fillStyle=['#d8401a','#ff9a2a','#ffe89a'][L];X.beginPath();X.moveTo(x-w,dy);X.bezierCurveTo(x-w*1.05,dy-h*.42,x-w*.2+sw*.3,dy-h*.62,x+sw,dy-h);X.bezierCurveTo(x+w*.35+sw*.3,dy-h*.6,x+w*1.05,dy-h*.42,x+w,dy);X.quadraticCurveTo(x,dy+w*.35,x-w,dy);X.fill();if(L==0){X.strokeStyle='rgba(70,16,6,.75)';X.lineWidth=1.6;X.stroke()}
   if(L==1){const u=((T*1.3+i*17)%26)/26,tx=x+sw*.8+Math.sin(T*.3+ph)*3,ty=dy-h*1.3-u*26;X.globalAlpha=Math.max(0,1-u);X.beginPath();X.ellipse(tx,ty,w*.16*(1-u*.5),w*.3*(1-u*.5),0,0,7);X.fill();X.globalAlpha=1}}
  X.save();X.globalCompositeOperation='lighter';for(let i=0;i<14;i++){const u=((T*.9+i*37)%120)/120,ex=wx+(-150+((i*71)%300))*sc2+Math.sin(T*.07+i)*14*u,ey=dy-u*170;X.fillStyle='rgba(255,'+(170+((i*13)%60))+',90,'+(1-u)*gr+')';X.fillRect(ex,ey,2,2)}X.restore();
  X.restore();
  /* odlesk ohně na vodě */X.save();X.globalCompositeOperation='lighter';for(let i=0;i<9;i++){const y=wy+3+i*4,w=(150-i*12)*(.8+.2*Math.sin(T*.11+i*1.3));X.fillStyle='rgba(255,140,60,'+(.22-i*.022)*gr*Math.max(0,1-s.sink/160)+')';X.fillRect(wx-w+Math.sin(T*.07+i*2)*8,y,w*2,2)}X.restore();
  if(T%3==0)par.push({x:s.x+R(-80,80),y:LY,z:96+R(30,60)-s.sink,fz:-999,vx:R(-.4,.4),vz:R(1,2.2),l:R(50,90),c:'rgba(40,34,36,.5)',s:R(9,16)});
  if(s.sink>60&&T%4==0)par.push({x:s.x+R(-90,90),y:LY,z:96-Math.min(30,s.sink*.1),fz:-999,vx:R(-.3,.3),vz:R(1.5,2.5),l:R(30,60),c:'rgba(220,225,235,.4)',s:R(8,14)})}
 /* kapitán na sudu ve vodě */if(s.cpt){const x=s.cpt.x-cam,y=LY-96+Math.sin(T*.08)*3;cpBarrelCapt(x,y,s.cpt.t)}
 /* pěna u čáry ponoru */X.fillStyle='rgba(220,235,255,.35)';for(let i=0;i<12;i++){const xx=wx-140+i*28+Math.sin(T*.05+i)*4;X.fillRect(xx,wy-1+Math.sin(i)*1.5,14,1.2)}
 if(s.sink>0&&s.sink<160){for(let i=0;i<6;i++){const xx=wx+R(-150,150),yy=wy-R(0,4);X.fillStyle='rgba(220,235,255,.5)';X.beginPath();X.arc(xx,yy,R(1,3),0,7);X.fill()}}}

/* =====================================================================
   UMĚLÁ INTELIGENCE KAPITÁNA – průběh jako v klasických bitkách:
   3 fáze podle zdraví, mezi nimi posádka na pomoc, býčí útok (uhni na
   paletu), skok z výšky (sleduj stín), omráčení = čas na pěsti, dělo = těžká rána
   ===================================================================== */
const CAPS={stun:['dizzy','stuck','tired','down','yank'],imm:['command','retreat','leapU','sky','drop','roar','toShip','onship','blasted','fuses']};
{const _sb=spawnB;spawnB=function(k,x,z){const e=_sb(k,x,z);if(e&&k=='cap'&&cpArenaOK()){ARN=[BX-700,BX+790];CAP.on=1;CAP.mode=null;CAP.ban1=1;e.ph=1;e.phS=1;e.stg=1;e.ph2d=1;e.bst='idle';e.tm=50;e.brcd=520;e.face=-1;e.hc=0;e.hcT=0;CAP.hits=0;if(CAP.ship){CAP.ship.x=BX+300;CAP.ship.arr=1}}return e}}
{const _ua=updBossArena;updBossArena=function(){_ua();try{cpUpd();cpArenaUpd()}catch(err){console.error('cpu',err)}}}
function cpBlockFx(e,txt){sfx('block',e.x);sfx('clack',e.x);burst(e.x+e.face*40,LY,e.z+100,'#ffe28a');for(let i=0;i<6;i++)par.push({x:e.x+e.face*40,y:LY,z:e.z+100,fz:-999,vx:R(-4,4),vz:R(1,5),l:R(14,24),c:CPC.gold,s:2});pop(e.x,LY,e.z+210,txt,'#cfe8ff')}
{const _he=hurtE;hurtE=function(e,d,dir,la,mel){if(e&&e.B=='cap'&&CAP.on&&e.st!='dead'&&!CAP.allow){const B=e.bst;
  /* nedotknutelný: velí posádce, je ve vzduchu, řve */if(CAPS.imm.includes(B)||e.z>e.gf+150){if(!(e.ibT>0)){cpBlockFx(e,B=='command'?'NEDOSÁHNEŠ!':'CINK!');e.ibT=14}return}
  /* kryje se kotvou zepředu (jen mimo omráčení) */const front=(Math.sign(p.x-e.x)||1)==e.face;if(mel&&front&&(B=='idle'||B=='guard'||B=='laugh')&&Math.random()<(B=='guard'?1:[0,.45,.55,.62][e.ph||1])){if(!(e.ibT>0)){cpBlockFx(e,pick(['CINK!','KRYT KYJEM!','ODRAŽENO!']));p.vx=-dir*5;stop=Math.max(stop,3);e.ibT=8;e.hc=(e.hc||0)+1;e.hcT=60}return}
  const h0=e.hp,b0=e.bst;if(b0=='idle')e.bst='walk';const st0=CAPS.stun.includes(b0);e.vul=st0?2:0;const mB=(st0||b0=='stuck'||b0=='tired')?1.35:.6,D=Math.min(d,2.4)*(st0?1.1:.55);d=D/mB;
  if(e.hp-D<=0&&(e.phS||1)>=4){CAP.allow=1;const sn0=e.stn;e.stn=1;try{_he(e,d,dir,la,mel)}finally{CAP.allow=0;if(e.st!='dead')e.stn=sn0}if(e.st=='dead'){B1C.zt=1.3;B1C.flash=.6;B1C.fx=e.x;B1C.bart=1;B1C.hide=1;pop(e.x,LY,e.z+240,'K.O.!','#ffe28a')}return}
  const sn0=e.stn;e.stn=1;try{_he(e,d,dir,la,mel)}finally{e.stn=sn0}if(e.bst=='walk')e.bst=b0;if(e.hs>2)e.hs=2;if(stop>3)stop=3;
  if(e.hp<cpFloor(e))e.hp=cpFloor(e);if(e.hp<h0&&!st0){e.hc=(e.hc||0)+1;e.hcT=70}if(e.hp<h0&&st0){e.sdm=(e.sdm||0)+(h0-e.hp)}
  return}
 return _he(e,d,dir,la,mel)}}
{const _bx=bossX;bossX=function(e,dx,dz,ad,adz,sd){if(e.B=='cap'&&CAP.on)return capAI(e,dx,dz,ad,adz,sd);return _bx(e,dx,dz,ad,adz,sd)}}
/* zdraví nesmí přeskočit fázi */function cpFloor(e){return (e.phS||1)<4?e.mhp*(1-.25*(e.phS||1))-1:0}
/* fáze podle zdraví: 4 fáze */function cpPh(e){const f=e.hp/e.mhp;return f>.75?1:f>.5?2:f>.25?3:4}
const CPBAN={1:['FÁZE 1','KYJ A LANO'],2:['FÁZE 2','ABORDÁŽ!'],3:['FÁZE 3','SALVA Z LODI'],4:['FÁZE 4','RUM A ZUŘIVOST']};function cpBanner(n){const b=CPBAN[n];if(b)B1C.ban={t:0,T:170,a:b[0],b:b[1]}}
/* bedny na molu: býčí útok i dopad je rozbijí */function cpSmash(x,r){for(const o of sol)if(o.cpc&&!o.gone&&x+r>o.x&&x-r<o.x+o.w){o.gone=1;o.rt=720;sfx('break',o.x);shake=Math.max(shake,6);bpSplinters(o.x+o.w/2,o.b,10,'#8a5a30');spawnP(o.x+o.w/2,LY,14,'#b08a5a',4,30,o.b+20);pop(o.x+o.w/2,LY,o.b+90,pick(['PRÁSK!','KŘUP!','TŘESK!']),'#ffe28a')}}
function cpArenaUpd(){if(!CAP.on)return;{const S=CAP.ship,e=bossE;if(S&&e&&e.st!='dead'&&!(e.bst=='onship'&&CAP.mode=='salvo')&&state=='play')S.x+=(BX+300-S.x)*.01}if(CAP.bump&&CAP.bump.t>0)CAP.bump.t--;if(ARN)for(const m of ens)if(m.min&&m.st!='dead'){if(m.x<ARN[0]+30)m.x=ARN[0]+30;if(m.x>ARN[1]-30)m.x=ARN[1]-30}for(const o of sol)if(o.cpc&&o.gone){o.rt--;const e=bossE;if(o.rt<=0&&Math.abs(p.x-(o.x+22))>60&&(!e||Math.abs(e.x-(o.x+22))>90)){o.gone=0;o.drop=34;sfx('thud',o.x)}}for(const o of sol)if(o.cpc&&o.drop>0)o.drop-=2}
function cpShipBlast(e){const S=CAP.ship;shake=24;stop=6;B1C.flash=.7;B1C.zt=1.12;sfx('boom',S.x);sfx('heavy',S.x);sfx('break',S.x);if(S){S.burn=1;S.bT=0;for(let i=0;i<8;i++)S.fire.push({t:-i*3,px:R(-160,160),py:-60+R(-30,20)})}for(let i=0;i<40;i++)par.push({x:S.x+R(-80,80),y:LY,z:120+R(-20,60),fz:-999,vx:R(-6,6),vz:R(2,10),l:R(40,80),c:i%3?'#ffb040':'rgba(60,54,50,.65)',s:R(4,9)});
 e.bst='blasted';e.tm=56;e.bx0=S.x;e.bx1=Math.max(ARN[0]+200,Math.min(ARN[1]-120,p.x+(p.x<S.x?160:-160)));e.z=620;b1Sub('KAPITÁN ANCLA','¡NOOO! Moje prachárna!',90);cpSay(e,'¡AAAAY!')}
function capAI(e,dx,dz,ad,adz,sd){if(CAP.ban1&&!bI&&state=='play'){CAP.ban1=0;cpBanner(1)}e.tm--;if(e.ibT>0)e.ibT--;if(e.sumcd>0)e.sumcd--;if(e.brcd>0)e.brcd--;if(e.hcT>0){e.hcT--;if(e.hcT==0)e.hc=0}
 const stg=cpPh(e),ph=[0,1,2,2,3][stg];e.ph=ph;e.stg=Math.max(e.stg||1,stg);const B=e.bst,tm=e.tm,c=CAP.can,lit=c&&c.st=='fuse',gr=e.z<=e.gf+1;e.vul=CAPS.stun.includes(B)?2:0;if(e.vul&&!CAPS.stun.includes(e.pb))e.sdm=0;e.pb=B;if(B!='sky'){e.sk3=0;e.lk3=0}
 /* z omráčení se po nějaké nadílce vytrhne */if(e.vul&&B!='down'&&(e.sdm||0)>e.mhp*.15&&gr){e.sdm=0;e.bst='shove';e.tm=24;e.face=Math.sign(p.x-e.x)||1;cpSay(e,pick(['Dost! ¡Basta!','Ruce pryč, plevele!','Hrrr… a dost!']));sfx('roar',e.x);return}
 /* nikdy nestojí na visící paletě */if(e.gf>=60&&B!='sky'&&B!='drop'){e.z=Math.min(e.z,e.gf-12);e.gf=0;e.vz=Math.min(e.vz,-1)}
 const LW=c?c.x+205:ARN[0]+80,RW=ARN[1]-75;
 const fin=(r)=>{e.bst='idle';e.tm=r!=null?r:[0,58,46,36][ph]};
 /* nová fáze: 2 = posádka z lodi, 3 = salva z lodi, 4 = zapálí si doutnáky ve vousech */
 const neutral=B=='idle'||B=='walk';if(stg>e.phS&&neutral&&gr){e.phS=stg;cpBanner(stg);if(stg==4){e.bst='fuses';e.tm=150;e.face=sd;b1Sub('KAPITÁN ANCLA','Dost hraní! Lok rumu a jdu na tebe!',120);sfx('vRage',e.x);return}
  CAP.mode=stg==2?'crew':'salvo';e.bst='toShip';e.tm=80;e.vz=0;e.sx0=e.x;e.face=Math.sign((CAP.ship?CAP.ship.x:e.x)-e.x)||1;sfx('jump',e.x);sfx('vCap',e.x);shake=8;spawnP(e.x,LY,20,lv.du,4,16,e.z);cpSay(e,stg==2?'¡Muchachos! Na něj!':'Na palubu! ¡Cañones listos!');return}
 if(B=='fuses'){e.face=sd;e.kb=0;if(tm==110){sfx('fuse',e.x);sfx('spark',e.x)}if(tm==60){shake=14;B1C.flash=.4;sfx('roar',e.x);ring(e.x,LY,180,'rgba(255,150,80,.9)',26,e.z+150);for(let i=0;i<30;i++)par.push({x:e.x+R(-20,20),y:LY,z:e.z+190,fz:-999,vx:R(-6,6),vz:R(0,7),l:R(30,60),c:i%2?'#ffb040':'#ffe8a0',s:R(2,4)});if(ad<260&&!p.dead){p.vx=sd*10;p.vz=Math.max(p.vz,6);p.z+=1;p.on=false}}if(tm<=0)fin(20);return}
 if(B=='toShip'){const S=CAP.ship;e.vz=0;const u=1-tm/80;e.z=Math.max(e.z,u*u*900);if(S)e.x=e.sx0+(S.x-e.sx0)*Math.min(1,u*1.3);if(tm<=0){e.bst='onship';e.tm=CAP.mode=='crew'?1100:cpSalvoCfg().dur;e.z=900;e.cmT=0;CAP.shipHits=0;e.svT=-70;e.svN=0;e.dudT=0;if(CAP.mode=='salvo')cpSalvoStart(e);b1Sub('KAPITÁN ANCLA',CAP.mode=='crew'?'¡A mí, marineros! Rozsekejte ho!':'¡Fuego! Ať z mola zbudou jen třísky!',120)}return}
 if(B=='onship'){const S=CAP.ship;e.vz=0;e.z=900;if(S)e.x=S.x;e.cmT=(e.cmT||0)+1;const ct=e.cmT;
  if(CAP.mode=='crew'){if(ct==40){sendMin(e,'g',2);sendMin(e,'x',1)}if(ct==140)sendMin(e,'g',1);if(ct>90&&ct%240==0&&minions()>0){roll('barrel',ARN[1]-40,0,-(5+Math.random()));cpSay(e,'¡Rodando!')}
   if(ct>160&&(minions()==0||tm<=0)){e.bst='sky';e.tm=46;e.tx=p.x;e.back=1}}
  else{if(S&&CAP.can){S.x+=(CAP.can.x+560-S.x)*.025}cpSalvo(e,S,ct);
   if((CAP.shipHits||0)>=cpSalvoCfg().need){cpShipBlast(e);return}
   if(tm<=0){e.bst='sky';e.tm=46;e.tx=p.x;e.back=1}}
  return}
 if(B=='blasted'){const u=1-tm/56;e.vz=0;e.x=e.bx0+(e.bx1-e.bx0)*u;e.z=Math.max(0,(1-u)*620+Math.sin(Math.PI*u)*140);e._rot=u*Math.PI*3*(e.bx1>e.bx0?1:-1);if(T%2==0)par.push({x:e.x,y:LY,z:e.z+90,fz:-999,vx:R(-1,1),vz:R(0,1),l:26,c:'rgba(70,64,60,.55)',s:R(6,10)});
  if(tm<=0||e.z<=0){e._rot=0;e.z=0;e.gf=0;e.bst='down';e.tm=120;shake=20;stop=5;B1C.flash=.35;sfx('heavy',e.x);sfx('break',e.x);ring(e.x,LY,140,'rgba(255,230,170,.9)',24,0);spawnP(e.x,LY,24,lv.du,5,30,0);bpSplinters(e.x,0,10,'#8a5a30');cpSmash(e.x,90);CAP.allow=1;try{e.hp=Math.max(cpFloor(e),1,e.hp-Math.ceil(e.mhp*.08));e.hs=3;pop(e.x,LY,e.z+240,'BUM! '+Math.ceil(e.mhp*.08),'#ffb14a')}finally{CAP.allow=0}cpSay(e,'¡Mi barco! Moje loď…!')}return}
 if(B=='hurt'){if(gr&&e.vz<=0&&tm<52){e.bst='down';e.tm=ph>=3?64:80;shake=Math.max(shake,8);spawnP(e.x,LY,16,lv.du,4,16,e.z);sfx('heavy',e.x)}return}
 if(B=='down'){if(tm<=0){e.bst='rise2';e.tm=56}return}
 if(B=='rise2'){if(tm==28){CAP.props=CAP.props.filter(q=>q.k!='hat');e.lost=null;sfx('cloth',e.x)}if(tm<=0)fin(26);return}
 if(B=='roar'){e.face=sd;if(tm%10==0)shake=Math.max(shake,3);if(tm==56){shake=16;B1C.flash=.45;sfx('roar',e.x);sfx('shock',e.x);ring(e.x,LY,170,'rgba(190,230,255,.9)',26,e.z);ring(e.x,LY,96,'rgba(255,255,255,.9)',18,e.z);if(ad<260&&adz<120&&!p.dead){p.vx=sd*10;p.vz=Math.max(p.vz,6);p.z+=1;p.on=false}for(let i=0;i<24;i++)par.push({x:e.x,y:LY,z:e.z+100,fz:-999,vx:R(-7,7),vz:R(-1,8),l:R(30,50),c:i%2?CPC.gold:'#ffffff',s:R(2,4)})}if(tm<=0)fin(20);return}
 if(B=='guard'){e.face=Math.sign((c?c.x:p.x)-e.x)||-1;e.kb=0;if(!lit&&!CAP.shot)fin(18);return}
 if(B=='laugh'){if(tm==40)sfx('vCap',e.x);if(tm<=0)fin(20);return}
 if(lit&&B=='idle'&&gr&&!CAP.shot&&ad>140){e.bst='guard';e.tm=999;if(Math.random()<.55)cpSay(e,pick(['¡Ja! Dělo? Tohle odrazím kyjem!','Jen pal, kaktusi!','Tohle znám, chlapče!']));return}
 /* odstrčení břichem, když ho někdo mlátí bez omráčení */if((B=='idle'||B=='walk')&&e.hc>=4&&ad<130){e.hc=0;e.bst='shove';e.tm=24;e.face=sd;cpSay(e,pick(['¡Fuera!','Ruce pryč!','Uhni, plevele!']));return}
 if(B=='shove'){if(tm==12){sfx('heavy',e.x);shake=6;burst(e.x+e.face*60,LY,e.z+80,'#fff');if(ad<140&&adz<70&&dx*e.face>-30){hurtP(1,e.face);p.vx=e.face*12;p.vz=Math.max(p.vz,5);p.z+=1;p.on=false}}if(tm<=0)fin(30);return}
 if(B=='idle'){e.face=sd;if(e.stg>=4&&tm>14)e.tm-=1;if(e.stg>=4&&T%6==0&&e._hz)par.push({x:e._hx+R(-14,14),y:LY,z:e._hz-30,fz:-999,vx:R(-.4,.4),vz:R(.6,1.4),l:R(30,50),c:'rgba(60,56,56,.45)',s:R(5,9)});const spd=[0,1.5,1.9,2.3][ph]+(e.stg>=4?.5:0),lim=c&&sd<0&&e.x<c.x+260;if(ad>150&&!lim)emv(e,sd*spd);else if(ad<70)emv(e,-sd*1.1);if(c&&e.x<c.x+210)emv(e,1.3);cpSmash(e.x+sd*40,30);
  if(tm<=0){const near=ad<170,r=Math.random();let a;e.seq=e.seq||['anchor','sweep','slam'];
   const st=e.stg;
   if(st>=3&&e.brcd<=0&&r<.25){a='broad';e.brcd=[0,700,560,460][ph]}
   else if(st>=3&&r<.2)a='curl';
   else if(near)a=r<.45?'sweep':r<.62?'slam':(st>=3&&r<.8)?'whirl':(st>=2?'chargeW':'anchor');
   else if(st==1)a=r<.55?'anchor':'slam';
   else a=r<.3?'chargeW':r<.55?'leapW':r<.8?'anchor':(st>=3?'whirl':'slam');
   if(st>=4&&a=='anchor'&&Math.random()<.5)e.chain='chargeW';
   if(e.seq.length){const q=e.seq.shift();if(q!='sweep'||near)a=q}
   if(a=='chargeW'&&(e.x<LW+160&&sd<0||e.x>RW-160&&sd>0))a='leapW';
   if(e.chain&&a!='anchor'){a=e.chain;e.chain=null}e.bst=a;e.tm={sweep:46,anchor:44,slam:30,whirl:116,broad:124,curl:30,chargeW:[0,56,46,38][ph],leapW:28}[a];e.cd2=sd;
   if(a!='sweep')pop(e.x,LY,e.z+230,'!','#ff5a3a');if(a=='broad'){e.face=1;cpSay(e,'¡Muchachos! ¡FUEGO A DISCRECIÓN!')}if(a=='chargeW'){cpSay(e,pick(['¡Al abordaje!','Rozdupu tě!','Plnou parou vpřed!']));sfx('roar',e.x)}}
  return}
 /* ---- býčí útok: rozběh přes celé molo, rozbíjí bedny, náraz = omráčení ---- */
 if(B=='chargeW'){e.face=e.cd2||sd;if(tm%8==0){spawnP(e.x-e.face*40,LY,4,lv.du,3,10,e.z);sfx('step',e.x)}if(tm%10==0)for(let i=0;i<2;i++)par.push({x:e.x+e.face*36,y:LY,z:e.z+168,fz:-999,vx:e.face*R(1,2.4),vz:R(.4,1.2),l:R(20,30),c:'rgba(235,235,240,.7)',s:R(4,7)});
  if(tm<=0){e.bst='charge';e.tm=400;e.cv=[0,8.6,9.6,10.6][ph];sfx('whoosh',e.x);shake=5}return}
 if(B=='charge'){const d=e.face;e.x+=d*e.cv;cpSmash(e.x+d*46,36);if(T%2==0){spawnP(e.x-d*30,LY,3,lv.du,3,12,e.z);par.push({x:e.x-d*60,y:LY,z:e.z+R(40,170),fz:-999,vx:-d*R(4,8),vz:0,l:8,c:'rgba(255,255,255,.55)',s:R(2,3)})}if(T%10==0)sfx('step',e.x);
  if(!p.dead&&!(p.inv>0)&&Math.abs(p.x-e.x)<64&&p.z<e.z+80){hurtP(2,d);p.vx=d*13;p.vz=Math.max(p.vz,7);p.z+=1;p.on=false;pop(p.x,LY,p.z+120,'PRÁSK!','#ffb14a')}
  if((d<0&&e.x<=LW)||(d>0&&e.x>=RW)||tm<=0){e.x=d<0?Math.max(e.x,LW):Math.min(e.x,RW);e.bst='dizzy';e.tm=[0,124,108,92][ph];shake=18;stop=5;B1C.flash=.35;sfx('heavy',e.x);sfx('break',e.x);sfx('clang',e.x);ring(e.x+d*50,LY,120,'rgba(255,230,170,.9)',22,e.z+90);spawnP(e.x+d*50,LY,22,'#b08a5a',5,40,e.z+60);bpSplinters(e.x+d*50,e.z+40,8,d<0?'#5a5e66':'#8a5a30');pop(e.x,LY,e.z+250,'BUM!','#ffe28a');CAP.bump={x:d<0?LW-55:RW+45,t:24};e.kb=-d*3;cpSay(e,pick(['Kdo… kdo tu postavil… ten sloup…','Hvězdičky… ¡qué bonito!','Ugh… kde je moje loď?']))}
  return}
 /* ---- skok z výšky: zmizí nahoře, stín sleduje hráče, dopad = zaseklá kotva ---- */
 if(B=='leapW'){e.face=sd;if(tm<=0){e.bst='leapU';e.tm=16;sfx('jump',e.x);sfx('vCap',e.x);spawnP(e.x,LY,18,lv.du,4,16,e.z);shake=6}return}
 if(B=='leapU'){e.vz=0;e.z+=38;if(tm<=0){e.bst='sky';e.tm=[0,72,60,48][ph];e.tx=e.x;sfx('whoosh',e.x)}return}
 if(B=='sky'){const Q=cpSkyCfg();e.vz=0;e.z=900;if(e.tx==null)e.tx=e.x;if(!e.sk3){e.sk3=1;e.lk3=0;e.tm+=Q.lk}
  /* stín sleduje hráče jen do zamčení; pak stojí a odpočítává dopad */
  if(e.tm>Q.lk){const lo=c?c.x+150:ARN[0]+60;e.tx+=Math.max(-7,Math.min(7,(Math.max(lo,Math.min(ARN[1]-60,p.x))-e.tx)*.09));if(e.tm%12==0)sfx('whoosh',e.x)}else if(!e.lk3){e.lk3=1;sfx('alert',e.tx);sfx('clack',e.tx);pop(e.tx,LY,170,'UHNI!','#ff6a4a')}
  e.x=e.tx;if(e.tm<=0){e.bst='drop';e.tm=60;e.z=560;e.sk3=0;e.lk3=0;sfx('fall',e.x)}return}
 if(B=='drop'){e.vz=0;e.z=Math.max(0,e.z-40);if(e.z<=0){e.z=0;e.gf=0;shake=22;stop=4;B1C.flash=.3;sfx('heavy',e.x);sfx('break',e.x);sfx('boom',e.x);ring(e.x,LY,140,'rgba(255,230,170,.9)',24,0);ring(e.x,LY,70,'rgba(255,255,255,.9)',16,0);{const Q=cpSkyCfg();if(Q.sw){shock(e.x,0,1,Q.sw>1);shock(e.x,0,-1,Q.sw>1)}}cpSmash(e.x,110);spawnP(e.x+e.face*90,LY,24,'#8a5a30',5,34,0);bpSplinters(e.x+e.face*90,0,10,'#8a5a30');if(Math.abs(p.x-e.x)<cpSkyCfg().R&&p.z<170&&!(p.inv>0)){hurtP(cpSkyCfg().dmg,Math.sign(p.x-e.x)||1);p.vx=(Math.sign(p.x-e.x)||1)*10}if(e.back){e.back=0;e.bst='roar';e.tm=110;cpSay(e,e.stg>=3?'Ještě jsem neskončil!':'Teď jsi můj!');return}e.bst='stuck';e.tm=[0,130,112,94][ph];cpSay(e,pick(['Ugh! Zasekl se!','¡Maldita sea! Pusť, prkno!','Hrrrgh… pojď ven!']))}return}
 if(B=='sweep'){if(tm==18){shake=6;burst(e.x+e.face*80,LY,e.z+80,'#fff');sfx('swing',e.x);if(ad<170&&adz<60&&dx*e.face>-20){hurtP(1,e.face);p.vx=e.face*8}}if(tm<=0){if(Math.random()<.3){e.bst='tired';e.tm=[0,96,80,66][ph];pop(e.x,LY,e.z+230,'ZADÝCHANÝ!','#9fe09a')}else fin()}return}
 if(B=='anchor'){if(tm==24){CAP.anc={e,d:40,max:[0,380,430,480][ph],back:0};sfx('chain',e.x);sfx('swing',e.x)}if(!CAP.anc&&tm<=0)fin();if(tm<-260){CAP.anc=null;fin()}return}
 if(B=='slam'){e.face=sd;if(tm<=0){e.vz=12;e.z+=1;e.kb=sd*Math.min(6,ad/24);if(c&&e.kb<0)e.kb=Math.max(e.kb,Math.min(0,-(e.x-(c.x+180))*.14));e.bst='air';sfx('jump',e.x);sfx('vCap',e.x)}return}
 if(B=='air'){if(gr&&e.vz<=0){shake=14;stop=3;e.kb=0;sfx('heavy',e.x);sfx('break',e.x);ring(e.x,LY,110,'rgba(255,230,170,.85)',22,e.z);shock(e.x,e.z,1,1);shock(e.x,e.z,-1,1);cpSmash(e.x,90);spawnP(e.x+e.face*90,LY,20,'#8a5a30',5,30,e.z);bpSplinters(e.x+e.face*90,e.z,8,'#8a5a30');if(ad<110&&adz<40)hurtP(1,sd);e.bst='stuck';e.tm=[0,120,104,88][ph];if(Math.random()<.5)cpSay(e,pick(['Ugh! Zasekl se!','¡Maldita sea! Pusť, prkno!','Hrrrgh… pojď ven!']))}return}
 if(B=='stuck'){if(tm%14==0)spawnP(e.x+e.face*96,LY,2,'#8a5a30',2,8,e.z);if(tm<=0){e.bst='yank';e.tm=18;sfx('break',e.x);bpSplinters(e.x+e.face*96,e.z,6,'#8a5a30')}return}
 if(B=='yank'){if(tm<=0)fin(30);return}
 if(B=='whirl'){if(tm<=70){if(!(c&&sd<0&&e.x<c.x+180))emv(e,sd*(ph>=3?3:2.4));cpSmash(e.x,60);if(tm%9==0)sfx('whoosh',e.x);if(ad<138&&adz<80&&!(p.inv>0)&&tm%3==0)hurtP(1,sd)}if(tm<=0){if(Math.random()<.6){e.bst='tired';e.tm=[0,96,80,66][ph];pop(e.x,LY,e.z+230,'TOČÍ SE MU HLAVA!','#9fe09a')}else fin()}return}
 if(B=='broad'){e.face=1;if(tm==100)b1Sub('KAPITÁN ANCLA','¡Fuego! Celá salva na molo!',90);const BQ=cpBroadCfg(ph),shots=BQ.shots;if(shots.includes(tm)){const i=shots.indexOf(tm),lo=ARN[0]+60,hi=ARN[1]-60,lead=BQ.lead&&i%2==1?p.vx*BQ.lead:0,x=Math.max(lo,Math.min(hi,p.x+lead+R(-BQ.jit,BQ.jit)));cpShell(x,BQ.tm,BQ.r,BQ.dmg);if(CAP.ship)CAP.ship.fire.push({t:0,px:-96+i*44,py:-46});sfx('cannon',CAP.ship?CAP.ship.x:e.x)}
  if(tm==64){const lo=c?c.x+90:ARN[0]+120,tx=Math.max(lo,Math.min(e.x-140,lo+R(60,260)));CAP.balls.push({x:tx,z:420,vx:0,vz:-1,hot:110,rest:0});pop(tx,LY,140,'Nevybuchla!','#ffe28a')}
  if(tm<=0)fin(30);return}
 if(B=='curl'){if(tm<=0){e.bst='roll';e.tm=150;e.rd=sd;e.bn=0;sfx('roar',e.x)}return}
 if(B=='roll'){const v=e.rd*7.2;cpSmash(e.x+e.rd*40,40);if(!emv(e,v)||(ARN&&(e.x<ARN[0]+50&&e.rd<0||e.x>ARN[1]-50&&e.rd>0))||(c&&e.rd<0&&e.x<c.x+150)){e.rd*=-1;e.bn++;shake=10;sfx('heavy',e.x);spawnP(e.x,LY,12,lv.du,4,14,e.z)}if(T%3==0)spawnP(e.x,LY,2,lv.du,2,8,e.z);if(Math.abs(p.x-e.x)<62&&p.z<e.z+90&&!(p.inv>0))hurtP(2,e.rd);if(tm<=0||e.bn>=2){e.bst='dizzy';e.tm=120;pop(e.x,LY,e.z+230,'OMÁMENÝ!','#9fe09a')}return}
 if(B=='dizzy'){if(tm<=0)fin(24);return}
 if(B=='tired'){if(tm<=0)fin(24);return}
 fin()}

/* --------- rekvizity arény: palety na jeřábu, pacholek, sudy, stín skoku --------- */
{const _dt=dTer;dTer=function(o){if(o.k=='cph'){if(!o.gone)cpPallet(o);return}if(o.cpc&&o.drop>0){X.save();X.translate(0,-o.drop*4);_dt(o);X.restore();return}return _dt(o)}}
function cpPallet(o){const x=o.x-cam,w=o.w,top=LY-o.t,sw=Math.sin(T*.02+o.x)*3;if(x>W+40||x+w<-40)return;X.save();X.lineCap='round';
 const hx=x+w/2+sw,hy=top-150;X.strokeStyle=HOL;X.lineWidth=4;X.beginPath();X.moveTo(x+8,top-2);X.lineTo(hx,hy);X.lineTo(x+w-8,top-2);X.moveTo(hx,hy-10);X.lineTo(hx+sw*.5,-camZ-60);X.stroke();X.strokeStyle='#b89a6a';X.lineWidth=2;X.beginPath();X.moveTo(x+8,top-2);X.lineTo(hx,hy);X.lineTo(x+w-8,top-2);X.moveTo(hx,hy-10);X.lineTo(hx+sw*.5,-camZ-60);X.stroke();
 X.fillStyle='#5a5e66';X.strokeStyle=HOL;X.lineWidth=1.6;X.beginPath();X.arc(hx,hy-4,7,0,7);X.fill();X.stroke();
 for(let i=0;i<3;i++){const P=aRR(x+i*(w/3)+1,top,w/3-2,9,2);cel(P,i%2?'#8a5a30':'#9a6a3a',1,.8,'#4a2e14','#c08a54');hStroke(P,1.4)}
 for(const bx of [x+6,x+w/2-5,x+w-16]){const P=aRR(bx,top+8,10,9,1.5);cel(P,'#6a4426',1,.8,'#3a2410','#a07040');hStroke(P,1.2)}
 X.fillStyle='rgba(0,0,0,.22)';X.beginPath();X.ellipse(x+w/2,LY-2,w*.42,5,0,0,7);X.fill();X.restore()}
function cpArenaProps(){const c=CAP.can,e=bossE;if(!c)return;const bmp=CAP.bump&&CAP.bump.t>0?CAP.bump:null;
 /* železný pacholek – tady býčí útok končí */const bx=c.x+150-cam,by=LY-c.z,wb=bmp&&bmp.x<c.x+300?Math.sin(bmp.t*1.4)*3*bmp.t/24:0;X.save();X.translate(bx+wb,by);const P1=new Path2D();P1.moveTo(-14,0);P1.lineTo(-12,-34);P1.quadraticCurveTo(-20,-40,-18,-48);P1.lineTo(18,-48);P1.quadraticCurveTo(20,-40,12,-34);P1.lineTo(14,0);P1.closePath();cel(P1,'#4a4e58',1.6,1,'#24262c','#8a909c');hStroke(P1,2);X.fillStyle='#24262c';X.fillRect(-14,-30,28,4);X.fillStyle='rgba(160,90,40,.5)';X.fillRect(-10,-20,6,10);X.strokeStyle='#c8b080';X.lineWidth=3;X.beginPath();X.moveTo(-12,-40);X.quadraticCurveTo(-40,-30,-58,-6);X.stroke();X.restore();
 /* sudy u pravého okraje */const rx=(ARN?ARN[1]:BX+470)-30-cam,wr=bmp&&bmp.x>c.x+300?Math.sin(bmp.t*1.4)*4*bmp.t/24:0;for(const [ox,oy] of [[-22,0],[22,0],[0,-40]]){X.save();X.translate(rx+ox+wr*(oy?1.6:1),LY+oy);const Br=aRR(-18,-40,36,40,8);cel(Br,'#7a4a26',1.4,1,'#3a2410','#b07a46');hStroke(Br,1.6);X.strokeStyle='#3a3e46';X.lineWidth=3;X.beginPath();X.moveTo(-18,-31);X.lineTo(18,-31);X.moveTo(-18,-9);X.lineTo(18,-9);X.stroke();X.restore()}
 /* náraz */if(bmp){const k=bmp.t/24,ix=bmp.x-cam,iy=LY-90;X.save();X.globalAlpha=k;X.fillStyle='#fff6c8';X.strokeStyle=HOL;X.lineWidth=2;X.beginPath();for(let j=0;j<16;j++){const rr=(j%2?16:38)*(1.3-k*.3),aa=j*Math.PI/8;X.lineTo(ix+Math.cos(aa)*rr,iy+Math.sin(aa)*rr)}X.closePath();X.fill();X.stroke();X.restore()}
 /* skok z výšky: stín + zaměřovací kruh (v79: po zamčení plný kruh s odpočtem) */if(e&&e.st!='dead'&&(e.bst=='sky'||e.bst=='drop'||e.bst=='leapU'))cpSkyDraw(e)}
{const _da=dArena;dArena=function(){_da();if(cpArenaOK()&&CAP.can)try{cpArenaProps()}catch(err){console.error('cpap',err)}}}
BD.cap.hp=130;
/* profil bosse, rady na kartě */
Object.assign(BPROF.cap,{k:1.05,hx:22,hy:-196,pose:['laugh',20],rp:['rage',40],q:'„Šťáva Srdce patří Baronovi. A ty půjdeš ke dnu, bodlinatý!“',tn:['¡Jo-jo-jo!','K rybám s tebou!','Kyj tě srovná!','Harr! Ještě stojíš?'],die:'Moje… loď…'});
BTIP.cap=['4 fáze: kyj a lano → abordáž → salva → rum a zuřivost','Býčí útok – vyskoč na paletu','Při salvě střílej z děla na loď (2 zásahy)','Omráčený kapitán = mlať ho! Dělo [E] ho srazí k zemi.'];

/* =====================================================================
   ÚVODNÍ FILMOVÁ SCÉNA: loď z mlhy, dýmka, skok, dopad, odhalení děla
   ===================================================================== */
BPS.cap={dur:560,
 cam(c,t,q){const S=CAP.ship;if(t<95)return BX+120;if(t<215)return q.x-30;if(t<290)return q.x;if(t<380)return q.x+10;if(t<450)return CAP.can?CAP.can.x+120:BX-200;return BX+40},
 upd(c,t,q){const S=CAP.ship,bowX=BX+300+176*.62,deckZ=96+84*.62,landX=BX+260;c.ck=t<380&&t>=95?.12:.07;c.cz=t<60?10:t<218?64:t<300?30:0;
  if(t==1){c.hideQ=1;q.face=-1;q.x=bowX;q.z=deckZ;q.gf=deckZ;c.qo={w:560,h:640,s:.46};B1C.vigT=.8;if(S){S.x=BX+1150}sfx('sting');}
  if(S&&t<=95){const u=tiE.o(Math.min(1,t/90));S.x=tiL(BX+1150,BX+300,u);S.tilt=Math.sin(t*.05)*.02}
  if(t==10)try{CS2.horn(.5)}catch(e){}
  if(t==62)pop(p.x,LY,p.z+120,'!','#ffe28a');
  if(t==95){c.hideQ=0;bpPose(q,'puff',60);B1C.zt=1.38}
  if(t>=95&&t<150){bpPose(q,'puff',60);if(t==112)b1Sub('KAPITÁN ANCLA','Ale, ale… malý zelený pasažér bez lístku.',100);if(t%30==0)c.ring=(c.ring||[]).concat([{t:0,x:q.x-50,z:q.z+118}])}
  if(t==150){sfx('vCap',q.x);b1Sub('KAPITÁN ANCLA','¡Jo-jo-jo-jo!',60);shake=3}
  if(t>=150&&t<205)bpPose(q,'laugh',30);
  if(t>=205&&t<218){bpPose(q,'rise2',50);B1C.zt=1.2}
  if(t==218){sfx('jump',q.x);sfx('whoosh',q.x);B1C.slow=.45;B1C.zt=1.12;q.gf=-999}
  if(t>=218&&t<275){const u=(t-218)/57;q.x=tiL(bowX,landX,u);q.z=tiL(deckZ,0,u)+110*Math.sin(Math.PI*u);bpPose(q,'idle',60);q.gf=-999;c.qo.s=tiL(.46,1,u*u)}
  if(t==275){q.x=landX;q.z=0;q.gf=0;c.qo.s=1;B1C.slow=1;stop=6;shake=18;B1C.flash=.6;sfx('heavy',q.x);sfx('break',q.x);sfx('boom',q.x);ring(q.x,LY,120,'rgba(255,230,170,.9)',24,0);ring(q.x,LY,60,'rgba(255,255,255,.9)',16,0);spawnP(q.x,LY,26,'#b08a5a',5,40,0);bpSplinters(q.x+40,0,12,'#8a5a30');try{RGC.push(...[0,1,2,3,4,5].map(i=>Object.assign(rgCrackAt(q.x,0,i,6,1,null),{col:'255,200,140',L:300})))}catch(e){}kHop(c,-1.5,5)}
  if(t>=275&&t<300){bpPose(q,'rise2',Math.max(1,50-(t-275)*2));B1C.zt=1.5}
  if(t>=300&&t<345){bpPose(q,'bloom',Math.max(0,40-(t-300)));if(t==302){b1Sub('KAPITÁN ANCLA','Šťáva Srdce patří Baronovi…',80);SS.glint&&SS.glint(.8)}}
  if(t>=345&&t<385){bpPose(q,'point',20);if(t==345){b1Sub('KAPITÁN ANCLA','…a ty půjdeš ke dnu, bodlinatý!',90);sfx('vCap',q.x);B1C.zt=1.3}}
  if(t==385){B1C.zt=1.22;sfx('whoosh',p.x);c.ck=.16}
  if(t>=385&&t<450){bpPose(q,'idle',60);if(t==398)b1Sub('KAKTUS','Hora svalů… Až se omámí, je můj. A to dělo se taky hodí!',100)}
  if(t==450){B1C.zt=1;B1C.vigT=0;b1Sub('','Býčí útok → vyskoč na paletu. Hvězdičky nad hlavou → mlať ho! Dělo [E] ho srazí k zemi.',150)}
  if(t>=450){if(t<505)bpPose(q,'whirl',Math.max(40,116-(t-450)*2));else bpPose(q,'idle',60);if(t%10==0&&t<505)sfx('whoosh',q.x);if(t==505)cpSay(q,'¡A pelear!')}
  if(c.ring)c.ring.forEach(r=>{r.t++;r.x-=.6;r.z+=.5});
  if(t>=c.end-2){B1C.zt=1;B1C.vigT=0;B1C.slow=1;if(S){S.x=BX+300;S.tilt=0}}},
 front(c,t,q){if(c.ring)for(const r of c.ring){const k=r.t/80;if(k>=1)continue;X.save();X.strokeStyle='rgba(225,225,230,'+(1-k)*.55+')';X.lineWidth=3*(1-k)+1;X.beginPath();X.ellipse(r.x-cam,LY-r.z,6+k*22,3+k*10,0,0,7);X.stroke();X.restore()}
  if(t<120){X.save();for(let i=0;i<8;i++){const fx=((i*157+t*.6)%(W+300))-150,fy=LY-60-((i*37)%60),g=X.createRadialGradient(fx,fy,0,fx,fy,140);g.addColorStop(0,'rgba(150,170,200,'+.12*(1-t/120)+')');g.addColorStop(1,'rgba(150,170,200,0)');X.fillStyle=g;X.fillRect(fx-140,fy-140,280,280)}X.restore()}}};
{const _uc=updCut;updCut=function(){_uc();const c=cut;if(c&&(c.k=='bpre'||c.k=='bpost')&&c.k2=='cap'&&c.cz!=null){if(c._czv==null)c._czv=camZ;c._czv+=(c.cz-c._czv)*.08;camZ=c._czv}}}
{const _sk=CUTX.bpre;CUTX.bpre=c=>{_sk(c);if(!cut&&c.k2=='cap'){b1Reset();if(CAP.ship){CAP.ship.x=BX+300;CAP.ship.tilt=0}}}}

function cpBarrelCapt(x,y,t){X.save();X.translate(x,y);X.lineJoin='round';X.lineCap='round';
   const Br=aRR(-16,-12,32,26,6);cel(Br,'#6a4426',1.4,1,'#3a2410','#a07040');hStroke(Br,1.6);X.strokeStyle='#2a1a0a';X.lineWidth=2;X.beginPath();X.moveTo(-16,-4);X.lineTo(16,-4);X.moveTo(-16,6);X.lineTo(16,6);X.stroke();
   const fw=Math.sin(t*.4)*.5;X.save();X.translate(10,-20);X.rotate(-1.1+fw);const A=aRR(0,-6,22,12,5);cel(A,CPC.coat,1,.8,CPC.coatS,cLt(CPC.coat,.25));hStroke(A,1.2);X.fillStyle=CPC.gold;X.fillRect(17,-6,4,12);X.translate(26,0);const F=new Path2D();F.ellipse(0,0,6.5,6,0,0,7);cel(F,CPC.skin,1,.8,CPC.skinS,CPC.skinH);hStroke(F,1.2);X.restore();
   X.save();X.translate(0,-30);X.scale(.62,.62);const Hr=new Path2D();Hr.moveTo(-10,-24);Hr.quadraticCurveTo(-32,-20,-31,2);Hr.quadraticCurveTo(-30,16,-21,22);Hr.lineTo(-17,9);Hr.quadraticCurveTo(-19,-6,-6,-18);Hr.closePath();cel(Hr,CPC.beard,1.2,.8,CPC.beardS,CPC.beardH);hStroke(Hr,2);
   const H=new Path2D();H.ellipse(4,0,23,27,0,0,7);cel(H,CPC.skin,2,1.2,CPC.skinS,CPC.skinH);hStroke(H,2.4);
   const Bd=new Path2D();Bd.moveTo(-17,-2);Bd.quadraticCurveTo(-18,24,4,34);Bd.quadraticCurveTo(26,30,30,6);Bd.quadraticCurveTo(14,14,-17,-2);cel(Bd,CPC.beard,1.4,1,CPC.beardS,CPC.beardH);hStroke(Bd,2);
   cpEye(14,-7,7.6,{lx:-.4,ly:-.2});X.fillStyle='#1a1416';X.beginPath();X.ellipse(-3,-7,7.4,8.2,.15,0,7);X.fill();X.strokeStyle='#120c0a';X.lineWidth=2.6;X.beginPath();X.moveTo(-1,-12);X.quadraticCurveTo(4,-24,9,-33);X.stroke();
   const N=new Path2D();N.ellipse(25,1,8.6,7.6,.2,0,7);cel(N,CPC.nose,1.4,1,cDk(CPC.nose,.35),'#f6a690');hStroke(N,2);
   X.fillStyle='#3a0c0c';X.beginPath();X.ellipse(16,16,7,5+Math.abs(Math.sin(t*.3))*3,0,0,7);X.fill();X.restore();
   X.fillStyle='rgba(220,235,255,.5)';for(let i=0;i<4;i++)X.fillRect(-26+i*14+Math.sin(t*.1+i)*3,10,10,1.4);X.restore()}
/* =====================================================================
   FINÁLE: poslední koule → let do lodi → zlomený stěžeň → potápění
   ===================================================================== */
POST.cap={dur:480,
 init(c){b1Reset();CAP.shot=null;CAP.anc=null;c.qo={s:1,rot:0};c.sx=c.ex;c.sz=c.ez;c.hideQ=0;B1C.zt=1.25;B1C.slow=.35;B1C.vigT=1;c.lost={};c.q.lost={hat:1};const S=CAP.ship;c.tx=S?S.x+10*.62:BX+300;c.tz=96+70;shake=16},
 cam(c){},
 upd(c,t,q){const S=CAP.ship;bpPose(q,'hurt',20);
  if(t==30){B1C.slow=1;B1C.zt=1.08}
  if(t<70){const u=tiE.io(t/70);q.x=tiL(c.sx,c.tx,u);q.z=tiL(c.sz,c.tz,u)+150*Math.sin(Math.PI*u);q.gf=-999;c.qo.rot=-u*Math.PI*2.4;c.qo.s=1-.24*u;if(t%3==0)spawnP(q.x,LY,1,'#d8d0c0',1,6,q.z+60);if(t==4)b1Sub('KAPITÁN ANCLA','¡NOOOOOOO…!',70)}
  if(t==70&&S){S.broken=1;S.burn=1;S.mast={a:0,v:.004};B1C.zt=1.3;stop=5;shake=16;B1C.flash=.7;sfx('break',S.x);sfx('heavy',S.x);sfx('boom',S.x);for(let i=0;i<20;i++)par.push({x:S.x+R(-20,30),y:LY,z:96+R(60,160),fz:-999,vx:R(-4,4),vz:R(-1,6),l:R(30,60),c:i%2?'#8a5a30':'#e6dcc0',s:R(3,6)})}
  if(t>=70&&t<112){const u=(t-70)/42;q.x=c.tx+u*20;q.z=c.tz+20-u*u*140;c.qo.rot=-Math.PI*2.4-u*1.5;if(q.z<=96&&!c.spl){c.spl=1;cpSplash(q.x,96);c.hideQ=1}}
  if(S&&S.mast){const m=S.mast;if(m.a<1.35){m.v+=.0016;m.a+=m.v;if(m.a>=1.35){m.a=1.35;shake=10;cpSplash(S.x+200,96);sfx('splash',S.x)}}}
  if(t>=110&&S){const u=Math.min(1,(t-110)/220);S.tilt=-.24*tiE.i(u)+Math.sin(t*.07)*.01;S.sink=170*tiE.i(u);if(t%14==0)sfx('thud',S.x);if(t==130)b1Sub('','(praskání trámů… loď jde ke dnu)',90)}
  if(t==200){c.bob=1;if(S)S.cpt={x:BX+150,t:0}}
  if(c.bob&&S&&S.cpt){S.cpt.x+=.45;S.cpt.t++;c.bx2=S.cpt.x;if(t==220)b1Sub('KAPITÁN ANCLA','¡Esto no termina aquí! Baron ti to spočítá, kaktusi!',130)}
  if(t==300)B1C.zt=1.15;if(t==360){b1Sub('KAKTUS','Jeden pirát pod hladinou. Na Barona dojde taky.',110);B1C.zt=1.18}
  c.cx=t<60?(p.x+q.x)/2:t<200?(S?S.x-40:q.x):t<360?(c.bx2||BX+150)+20:p.x+40;c.ck=.08},
 front(c,t,q){},
 fin(c){CAP.on=0;CAP.carry=0;c.fx=BX+40;c.fz=0;b1Reset();B1C.zt=1;if(CAP.ship){CAP.ship.cpt=null;CAP.ship.burn=0;CAP.ship.sink=400}},
 lost:{}};

/* =====================================================================
   v79: salva z lodi – férová podle obtížnosti
   Mezi dopady vždy zůstane bezpečná mezera, koule dopadají postupně (zleva doprava),
   během výstřelu na loď kapitán nepálí a dělník podává koule častěji.
   ===================================================================== */
function cpSalvoCfg(){return[{per:175,n:3,sp:310,tm:92,st:10,r:58,dmg:1,dud:80,hot:24,need:1,dur:1050,food:1},
 {per:128,n:4,sp:262,tm:76,st:8,r:70,dmg:1.5,dud:130,hot:45,need:2,dur:1300,food:0},
 {per:94,n:5,sp:224,tm:64,st:6,r:84,dmg:2,dud:180,hot:75,need:2,dur:1500,food:0}][SV.dif|0]||null}
function cpSalvoOn(){const e=bossE;return !!(CAP.on&&e&&e.st!='dead'&&e.bst=='onship'&&CAP.mode=='salvo')}
function cpSalvoFood(k){const Q=cpSalvoCfg(),c=CAP.can;if(!c)return;if(!(Q.food||(k==0&&p.hp<=p.mx*.4&&SV.dif==1)))return;if(p.hp>=p.mx)return;
 const x=c.x+R(150,230);pk.push({x,y:LY,z:Math.max(0,floorAt(x,c.z+60,8))+60,vz:4,k:'food'});pop(x,LY,c.z+140,'Čutora!','#7fe07a')}
function cpSalvoStart(e){cpSalvoFood(0);e.svTip=0}
function cpSalvo(e,S,ct){const Q=cpSalvoCfg(),c=CAP.can;
 /* během výstřelu na loď (a chvíli po něm) se nepálí */
 if(!CAP.shot)e.svT=(e.svT||0)+1;
 if(e.svTip==0&&ct==40){e.svTip=1;let kn='E';try{kn=keyName(SV.keys.interact[0])}catch(err){}b1Sub('DĚLNÍK Z PŘÍSTAVU','Uhýbej mezi terči! Nevybuchlou kouli zvedni ['+kn+'], nabij do děla a pal na loď!',170)}
 if(e.svT>=Q.per){e.svT=0;e.svN=(e.svN||0)+1;const lo=ARN[0]+60,hi=ARN[1]-60;
  /* stojí-li hráč u nabitého/hořícího děla, mezera je přesně u něj (lehká + normální) */
  const atCan=c&&SV.dif<2&&(c.st=='load'||c.st=='loaded'||c.st=='fuse')&&Math.abs(p.x-(c.x-6))<90;
  const u=atCan?Q.sp/2:R(-Q.sp/2,Q.sp/2),n=Q.n,base=p.x+u-Math.floor((n-1)/2)*Q.sp;const xs=[];
  for(let i=0;i<n;i++){const x=base+i*Q.sp;if(x>=lo&&x<=hi)xs.push(x)}
  /* když okraj arény ubral dopady, doplní se na druhé straně (ne přes hráče) */
  let k=1;while(xs.length<n&&k<6){const a=xs.length?xs[0]-Q.sp:base-Q.sp,b=xs.length?xs[xs.length-1]+Q.sp:base+n*Q.sp;if(a>=lo)xs.unshift(a);else if(b<=hi)xs.push(b);k++}
  const dirL=e.svN%2==0;xs.sort((a,b)=>dirL?a-b:b-a);
  xs.forEach((x,i)=>cpShell(x,Q.tm+i*Q.st,Q.r,Q.dmg));
  if(S){for(let i=0;i<xs.length;i++)S.fire.push({t:-i*3,px:-120+i*48,py:-46})}sfx('cannon',S?S.x:e.x);sfx('boom',S?S.x:e.x);shake=Math.max(shake,4)}
 /* dělník/kapitán podá novou kouli, když žádná není ve hře */
 const any=CAP.carry||CAP.balls.length||(c&&(c.st=='load'||c.st=='loaded'||c.st=='fuse'))||CAP.shot||CAP.pile>0;
 if(any)e.dudT=0;else if(++e.dudT>=Q.dud){e.dudT=0;const tx=c?c.x+R(90,190):p.x;CAP.balls.push({x:tx,z:420,vx:0,vz:-1,hot:Q.hot,rest:0});pop(tx,LY,140,'Nevybuchla!','#ffe28a')}}
/* zásah koulí ze salvy: poloměr a poškození podle obtížnosti */
/* dělová koule s vlastním dosahem/poškozením (terč = skutečný dosah) */
function cpShell(x,Tm,r,dmg){const z=Math.max(LOWZ+10,floorAt(x,p.z+60,8));bTgt(x,z,Tm,r);bul.push({x,y:LY,z:z+520,vx:0,vz:(-520+.5*.25*Tm*Tm)/Tm,o:0,k:'gr',g2:.25,sz:14,cpR:r,cpD:dmg})}
{const _b=blast;blast=function(x,z,own){if(!own){const b=bul.find(q=>q.cpR&&q.g&&!q.cpX&&Math.abs(q.x-x)<.5);if(b){b.cpX=1;const r=_b(x,z,1);if(!p.dead&&Math.hypot(p.x-x,(p.z+50-z)*.8)<b.cpR)hurtP(b.cpD,Math.sign(p.x-x)||1);return r}}return _b(x,z,own)}}
/* boční salva na molo: koule míří tam, kde hráč stojí v okamžiku výstřelu – kdo běží, uteče */
function cpBroadCfg(ph){const d=SV.dif|0;if(d==0)return{shots:[96,78,60],tm:74,r:60,dmg:1,jit:20,lead:0};if(d==1)return{shots:ph>=3?[96,82,68,54]:[96,80,64],tm:66,r:70,dmg:1.5,jit:25,lead:0};return{shots:ph>=3?[96,84,72,60,48]:[96,82,68,54],tm:58,r:84,dmg:2,jit:30,lead:22}}

/* =====================================================================
   v79: skok z výšky je čitelný – stín se před dopadem zamkne (zvuk + plný kruh + UHNI!),
   hráč má čas utéct; dosah dopadu = nakreslený kruh. Podle obtížnosti.
   ===================================================================== */
function cpSkyCfg(){return[{lk:52,R:80,dmg:1,sw:0},{lk:44,R:86,dmg:2,sw:1},{lk:34,R:92,dmg:2,sw:2}][SV.dif|0]||{lk:38,R:86,dmg:2,sw:1}}
function cpSkyDraw(e){const Q=cpSkyCfg(),sx=e.x-cam,sy=LY-2-(e.gf||0)*0,bl=.6+.4*Math.sin(T*.6),R0=Q.R;
 const locked=e.bst=='drop'||(e.bst=='sky'&&e.lk3),u=e.bst=='drop'?1:e.bst=='sky'&&locked?1-Math.max(0,e.tm)/Q.lk:0;
 const k=e.bst=='sky'?(locked?1:Math.max(0,Math.min(1,1-(e.tm-Q.lk)/60))):e.bst=='drop'?1:0;
 X.save();X.fillStyle='rgba(0,0,0,'+(.22+.4*k)+')';X.beginPath();X.ellipse(sx,sy,Math.max(4,30+50*k),Math.max(2,6+8*k),0,0,7);X.fill();
 if(!locked){/* sleduje: přerušovaný pulzující kruh + šipka nahoře */X.setLineDash([12,8]);X.lineDashOffset=-T*.8;X.strokeStyle='rgba(255,90,60,'+bl*.85+')';X.lineWidth=3;X.beginPath();X.ellipse(sx,sy,R0+18,(R0+18)*.17,0,0,7);X.stroke();X.setLineDash([]);
  if(e.bst!='drop'){const ay=-camZ+92+Math.sin(T*.4)*5;X.fillStyle='rgba(255,70,50,'+bl+')';X.strokeStyle=HOL;X.lineWidth=2.5;X.beginPath();X.moveTo(sx-16,ay-20);X.lineTo(sx+16,ay-20);X.lineTo(sx+16,ay);X.lineTo(sx+28,ay);X.lineTo(sx,ay+26);X.lineTo(sx-28,ay);X.lineTo(sx-16,ay);X.closePath();X.fill();X.stroke()}}
 else{/* zamčeno: plná zóna dopadu + odpočet (vnitřní kruh roste k okraji) */const fl=(T%8<4)?1:.75;
  X.fillStyle='rgba(255,40,24,'+(.16+.22*u)*fl+')';X.beginPath();X.ellipse(sx,sy,R0,R0*.17,0,0,7);X.fill();
  X.strokeStyle='rgba(255,60,40,.95)';X.lineWidth=4.5;X.stroke();
  X.strokeStyle='rgba(255,230,180,'+(.5+.5*u)+')';X.lineWidth=2.5;X.beginPath();X.ellipse(sx,sy,Math.max(2,R0*u),Math.max(1,R0*u*.17),0,0,7);X.stroke();
  X.strokeStyle='rgba(255,60,40,.95)';X.lineWidth=3;X.beginPath();X.moveTo(sx-R0-26,sy);X.lineTo(sx-R0-6,sy);X.moveTo(sx+R0+6,sy);X.lineTo(sx+R0+26,sy);X.stroke();
  /* šipky „ven“ */if(e.bst=='sky'){X.fillStyle='rgba(255,220,120,'+bl+')';X.strokeStyle=HOL;X.lineWidth=2;for(const d of[-1,1]){const ax=sx+d*(R0+40+Math.sin(T*.5)*4),ay=sy-14;X.beginPath();X.moveTo(ax-d*10,ay-8);X.lineTo(ax+d*6,ay);X.lineTo(ax-d*10,ay+8);X.closePath();X.fill();X.stroke()}}}
 X.restore()}
