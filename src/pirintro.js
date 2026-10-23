/* =====================================================================
   v82: NOVÝ NÁSTUP BOSSE 1. LEVELU – pirát s kyjem (Kapitán Ancla)
   mlha, lucerny se rozsvěcují → píšťalka z přídě → chytí lano →
   „¡AL ABORDAJE!“ zhoupnutí od stěžně (zpomalení) → pustí lano, salto
   k divákovi → rozdrtí kyjem stoh beden → křupne za krkem, plácá kyjem
   do dlaně → výhrůžka → Kaktus a dělo → roztočí lano → řev
   ===================================================================== */
Object.assign(SFX,{bosun:{p:[['t',{w:'sine',f:2050,f2:2850,d:.42,g:.06,a:.04}],['t',{w:'sine',f:2850,f2:2350,d:.42,g:.06,dl:.42}],['t',{w:'sine',f:2350,f2:2400,d:.3,g:.045,dl:.86}],['n',{d:.9,g:.015,ft:'bandpass',f:2600,q:4}]],mi:500},
 crk:{p:[['n',{d:.025,g:.42,ft:'highpass',f:1800}],['n',{d:.02,g:.32,ft:'bandpass',f:900,q:3,dl:.05}],['n',{d:.02,g:.26,ft:'bandpass',f:1300,q:3,dl:.1}]],mi:150}});
const PI2={CY:120,HX:30,HY:84,LX:142,CT:88,BOW:109,DECK:148};
/* bod v kulisách lodi → světové souřadnice (pozadí má svislou paralaxu .45) */
function piShipZ(z){const S=CAP.ship;return z-(S&&S.sink||0)+camZ*.55}
function piPiv(){const S=CAP.ship;return[S.x+6,piShipZ(282)]}
/* lano ve světě (stejný styl jako lano v ruce piráta) */
function piRope(x0,z0,x1,z1,sag,k){X.save();X.translate(x0-cam,LY-z0);X.scale(k,k);prRope(0,0,(x1-x0)/k,-(z1-z0)/k,sag/k,16);X.restore()}
/* postava stojí nohama v bodě / visí rukou v bodě (qDraw škáluje a točí kolem středu těla) */
function piStand(q,c,fx,fz){const s=c.qo.s;q.x=fx;q.z=fz-PI2.CY*(1-s);q.gf=q.z}
function piHang(q,c,hx,hz){const s=c.qo.s,r=c.qo.rot||0,hx0=-(q.face||-1)*PI2.HX,ox=s*(hx0*Math.cos(r)+PI2.HY*Math.sin(r)),oy=s*(hx0*Math.sin(r)-PI2.HY*Math.cos(r));q.x=hx-ox;q.z=hz+oy-PI2.CY;q.gf=q.z}
/* stoh beden, který pirát rozdrtí (horní bedna navíc na bedně z arény) */
function piTopCrate(x,z){dCrate(x-22-cam,LY-z-44,44,44,7);X.save();X.strokeStyle='rgba(30,18,8,.55)';X.lineWidth=2;X.beginPath();X.moveTo(x-22-cam,LY-z-44);X.lineTo(x+22-cam,LY-z);X.moveTo(x+22-cam,LY-z-44);X.lineTo(x-22-cam,LY-z);X.stroke();X.restore()}
{const _da=dArena;dArena=function(){_da();try{if(cpArenaOK()&&!BPRE.done&&!(cut&&cut.k=='bpre'&&cut.cr))piTopCrate(BX+PI2.LX,44)}catch(err){}}}
/* bedna z arény rozbitá bez efektů (při přeskočení scény) */
function piBreak(){for(const o of sol)if(o.cpc&&!o.gone&&BX+PI2.LX+30>o.x&&BX+PI2.LX-30<o.x+o.w){o.gone=1;o.rt=720}}

BPS.cap={dur:664,
 cam(c,t,q){const S=CAP.ship,sx=S?S.x:BX+300;
  if(t<46)return(p.x+sx)/2+40;if(t<196)return sx+30;if(t<284)return q.x+40;if(t<470)return q.x-40;if(t<505)return p.x+150;if(t<548)return CAP.can?CAP.can.x+150:p.x;return(p.x+q.x)/2+60},
 upd(c,t,q){const S=CAP.ship,pv=piPiv(),bowX=(S?S.x:BX+300)+PI2.BOW,deckZ=piShipZ(PI2.DECK),LX=BX+PI2.LX;c.landX=LX;c.cz=0;c.ck=t>=196&&t<300?.14:.07;
  if(t==1){q.face=-1;c.qo={w:620,h:700,s:.42,rot:0,cy:PI2.CY};c.rp='hang';B1C.vigT=.85;if(S){S.x=BX+300;S.tilt=0;S.lit=0}p.face=1;c.dust=[];c.fog=1}
  if(S&&S.lit!=null&&t<90)S.lit=Math.min(1,Math.max(0,(t-26)/46))*(t%7<1&&t<70?.4:1);
  q._nosh=0;q._ropeW=null;q._qo=c.qo;q._redK=.3;
  /* ---- 1) mlha, píšťalka z přídě, lucerny ---- */
  if(t<84){bpPose(q,'yard',60);c.qo.s=.42;c.qo.rot=0;piStand(q,c,bowX,deckZ);
   const b=t>=10&&t<44||t>=58&&t<80;q._whB=b?1:0;if(t==10||t==58)sfx('bosun',bowX);if(t==20)pop(p.x,LY,p.z+120,'!','#ffe28a');if(t==26)sfx('fuse',bowX);
   if(t==50){B1C.zt=1.3;sfx('whoosh',bowX)}}
  /* ---- 2) chytí lano, hláška, smích ---- */
  else if(t<196){if(t==84){c.rp='held';sfx('grab',bowX);sfx('cloth',bowX);q._whB=0}
   piStand(q,c,bowX,deckZ);q._ropeW=pv;
   bpPose(q,'grab',60);
   if(t==96)b1Sub('KAPITÁN ANCLA','Ale, ale… zelený pasažér bez lístku.',100);
   if(t==150){sfx('vCap',bowX);b1Sub('KAPITÁN ANCLA','¡Jo-jo-jo!',46);shake=2}
   if(t>=150&&t<186){q._laugh=1}else q._laugh=0;
   if(t>=186){q._crouch=prCl((t-186)/8,0,1)}}
  /* ---- 3) zhoupnutí na laně (zpomalení u spodního bodu) ---- */
  else if(t<250){q._crouch=0;q._laugh=0;const u=(t-196)/54,e=(1-Math.cos(Math.PI*u))/2;
   if(t==196){sfx('jump',bowX);sfx('whoosh',bowX);sfx('vCap',bowX);b1Sub('KAPITÁN ANCLA','¡AL ABORDAJE!',60);B1C.zt=1.16;c.th0=null}
   const hx0=bowX+(-q.face)*PI2.HX*.42,hz0=deckZ+.42*(PI2.CY+PI2.HY);
   if(c.th0==null){const dx=hx0-pv[0],dz=hz0-pv[1];c.th0=Math.atan2(dx,-dz);c.L0=Math.hypot(dx,dz)}
   const th=prL(c.th0,-.95,e),L=c.L0+26*u,hx=pv[0]+L*Math.sin(th),hz=pv[1]-L*Math.cos(th);
   c.qo.s=prL(.42,.5,u);c.qo.rot=-th*.85*Math.min(1,u/.22)+(1-Math.min(1,u/.22))*0;bpPose(q,'swing',60);q._nosh=1;piHang(q,c,hx,hz);q._ropeW=pv;
   c.hand=[hx,hz];c.th=th;c.thv=(th-(c.thp==null?th:c.thp));c.thp=th;c.Lr=L;
   B1C.slow=u>.55?prL(1,.42,Math.min(1,(u-.55)/.3)):1;if(t%9==0)sfx('whoosh',q.x)}
  /* ---- 4) pustí lano, salto k divákovi, drtí bedny ---- */
  else if(t<282){const s=t-250,F=32,u=s/F;
   if(s==0){c.rp='free';c.fr={a:c.th,va:c.thv*.9,L:c.Lr};c.f0=[q.x,q.z+PI2.CY];c.r0=c.qo.rot;B1C.zt=1.26;sfx('whoosh',q.x);bpPose(q,'curl',30)}
   const x=prL(c.f0[0],LX,u),z=prL(c.f0[1],PI2.CT+PI2.CY,u)+70*Math.sin(Math.PI*Math.min(1,u*1.15));
   c.qo.s=prL(.5,1,prE.i(u));c.qo.rot=prL(c.r0,-Math.PI*2,prE.io(Math.min(1,u*1.25)));q.x=x;q.z=z-PI2.CY;q.gf=0;q._nosh=u<.7?1:0;
   if(s<16)bpPose(q,'curl',Math.max(0,30-s*2));else bpPose(q,'smashUp',30);
   B1C.slow=u<.7?.42:prL(.42,1,(u-.7)/.3);if(s%3==0)spawnP(q.x,LY,1,'#e8dcc0',1,4,q.z+60)}
  /* ---- 5) dopad: rozdrcené bedny, prach ---- */
  else if(t<318){const s=t-282;
   if(s==0){c.cr=1;c.qo.s=1;c.qo.rot=0;q.x=LX;q.z=PI2.CT-PI2.CY*0;B1C.slow=1;stop=7;shake=20;B1C.flash=.65;B1C.zt=1.08;
    sfx('heavy',LX);sfx('break',LX);sfx('boom',LX);try{cpSmash(LX,30)}catch(err){}bpSplinters(LX,PI2.CT-10,18,'#8a5a30');bpSplinters(LX,40,10,'#6a4426');
    ring(LX,LY,130,'rgba(255,230,170,.85)',24,0);ring(LX,LY,64,'rgba(255,255,255,.9)',14,0);spawnP(LX,LY,30,'#b08a5a',5,46,20);
    for(let i=0;i<16;i++)c.dust.push({x:LX+R(-70,70),z:R(0,50),vx:R(-2.4,2.4),vz:R(.2,1.4),r:R(26,48),l:0,L:R(50,90)});
    try{RGC.push(...[0,1,2,3,4].map(i=>Object.assign(rgCrackAt(LX,0,i,5,1,null),{col:'255,200,140',L:260})))}catch(err){}kHop(c,-1.6,6)}
   q.z=Math.max(0,PI2.CT-s*22);q.gf=0;c.qo.s=1;c.qo.rot=0;bpPose(q,'crash',Math.max(0,30-Math.max(0,s-10)));
   if(s==4){shake=8;sfx('thud',LX)}if(s==20)pop(p.x,LY,p.z+120,'!!','#ffe28a')}
  /* ---- 6) křupnutí za krkem, plácání kyjem ---- */
  else if(t<400){q.z=0;q.gf=0;
   if(t<370){const k=t-318;bpPose(q,'neck',Math.max(0,60-k));if(t==318)B1C.zt=1.34;if(k==10||k==28){sfx('crk',q.x);pop(q.x+(k==10?40:-40),LY,q.z+250,'křup','#f4e6c8')}}
   else{bpPose(q,'slap',30);const cc=(T*.14)%(Math.PI*2),cp=((T-1)*.14)%(Math.PI*2);if(cp<Math.PI/2&&cc>=Math.PI/2){sfx('punch',q.x);shake=Math.max(shake,2)}if(t==372)B1C.zt=1.22}}
  /* ---- 7) výhrůžka ---- */
  else if(t<470){bpPose(q,'point',20);if(t==402){b1Sub('KAPITÁN ANCLA','Šťáva Srdce patří Baronovi…',70);B1C.zt=1.3}if(t==436){b1Sub('KAPITÁN ANCLA','…a ty půjdeš ke dnu, bodlinatý!',80);sfx('vCap',q.x);B1C.zt=1.38;shake=3}}
  /* ---- 8) Kaktus, pohled na dělo ---- */
  else if(t<548){if(t==470){B1C.zt=1.18;sfx('whoosh',p.x)}bpPose(q,(t>500&&t<540)?'laugh':'idle',40);if(t==476)b1Sub('KAKTUS','Hora svalů… Až se omámí, je můj. A to dělo se taky hodí!',96);if(t==505)B1C.zt=1.1}
  /* ---- 9) roztočí lano, řev ---- */
  else{if(t==548){B1C.zt=1;B1C.vigT=0;b1Sub('','Býčí útok → vyskoč na paletu. Hvězdičky nad hlavou → mlať ho! Dělo [E] ho srazí k zemi.',150)}
   if(t<596){bpPose(q,'twirl',60);if(t%10==0)sfx('whoosh',q.x)}else{bpPose(q,'roar',Math.max(0,110-(t-590)*1.6));if(t==620){sfx('roar',q.x);sfx('vCap',q.x);shake=8;cpSay(q,'¡A pelear!')}}}
  /* volné lano po puštění: tlumené kyvadlo */
  if(c.fr){const f=c.fr;f.va+=-.0065*Math.sin(f.a);f.va*=.985;f.a+=f.va}
  for(const d of c.dust){d.l++;d.x+=d.vx;d.z+=d.vz;d.vx*=.96;d.r+=.5}c.dust=c.dust.filter(d=>d.l<d.L);
  if(t>=c.end-2)piEnd(c)},
 back(c,t,q){const S=CAP.ship;if(!S)return;const pv=piPiv(),k=.25*.45;
  if(S.lit&&t<230){const bx=S.x+PI2.BOW-cam,by=LY-piShipZ(PI2.DECK)-46;rgGlow(bx+6,by,110,'255,180,100',.42*S.lit*(t<196?1:1-(t-196)/34)*(.92+.08*Math.sin(t*.4)))}
  if(c.rp=='hang'){const bx=S.x+PI2.BOW-8,bz=piShipZ(PI2.DECK+26);piRope(pv[0],pv[1],bx,bz,40,k)}
  else if(c.rp=='free'&&c.fr){const f=c.fr,ex=pv[0]+f.L*Math.sin(f.a),ez=pv[1]-f.L*Math.cos(f.a);piRope(pv[0],pv[1],ex,ez,-f.va*260,k)}},
 draw(c,t,q){},
 front(c,t,q){
  if(c.fog&&t<150){const a=.13*(1-t/150);X.save();for(let i=0;i<8;i++){const fx=((i*157+t*.6)%(W+300))-150,fy=LY-50-((i*37)%70);rgPuff(fx,fy,150,a*1.6,'150,170,200')}X.restore()}
  for(const d of c.dust){const u=d.l/d.L;rgPuff(d.x-cam,LY-d.z-d.r*.3,d.r,(1-u)*(u<.1?u*10:1)*.55,'206,186,150')}}};
function piEnd(c){B1C.zt=1;B1C.vigT=0;B1C.slow=1;const S=CAP.ship;if(S){S.lit=null;S.x=BX+300;S.tilt=0}}
BPS.cap.fin=function(c){piEnd(c);const LX=BX+PI2.LX;piBreak();ARN=[BX-470,BX+470];const gz=Math.max(0,floorAt(LX,c.bz+60,6)),e=spawnB(lv.bk,LX,gz);if(e){e.z=e.gf=gz;e.bst='idle';e.tm=40;e.face=-1}};
/* zuřivost ve 3.–4. fázi: rumové barvy místo „bouřkové kotvy“ */
try{Object.assign(RGF.cap,{name:'RUMOVÁ ZUŘIVOST',ring:'255,196,130',wave:'255,190,120',vig:'26,8,4',tint:'255,150,90',vein:'255,110,70',aura:'255,160,90',eye:'255,224,150',bp:['#ffcf8a','#ff8a5a','#ffffff'],steam:'rgba(240,220,200,.3)'})}catch(err){}
