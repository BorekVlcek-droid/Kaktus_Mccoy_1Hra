/* =====================================================================
   v80: KAKTUS SKÁČE NA LOĎ – nová filmová sekvence konce 1. levelu
   rozběh s prachem → odraz z hrany mola → zpomalený let se saltem
   (balistická dráha s předsazením na plující loď) → dopad do podřepu,
   loď se zhoupne → ohlédnutí k molu → loď odplouvá
   ===================================================================== */
const SJ={RU:0,TR:262,TJ:334,TL:378,H:250};
function sjFlight(c){const x0=c.sjX0,z0=c.sjZ0,T=SJ.TL-SJ.TJ,x1=psX(SJ.TL)+190*PSS,z1=PZR,H=Math.max(SJ.H,z1+60)-z0;
 const dz=z1-z0,vz=(2*H/T)*(1+Math.sqrt(Math.max(0,1-dz/H))),g=(vz*T-dz)*2/(T*T);return{x0,z0,x1,z1,vz,g,T}}
function sjDust(x,z,n,dir){for(let i=0;i<n;i++)par.push({x:x+R(-10,10),y:LY,z:z+R(0,6),fz:-999,vx:-dir*R(.5,3),vz:R(.4,2.2),l:R(20,34),c:i%2?'rgba(200,190,170,.7)':'rgba(160,150,130,.6)',s:R(3,7)})}
CUTX.ship=c=>{const t=c.t,PE=PSH.pe;if(!c.sj){c.sj=1;SJ.RU=PE-440;c.zt=1}
 /* --- úvod: siréna, loď vyplouvá --- */
 if(t==6){CS2.horn(1);shake=5;p.face=1}if(t==12)pop(p.x,LY,p.z+120,'?!','#ffe28a');if(t==40)say('Co to bylo…? Lodní siréna!');
 if(t==150)say('Baronova loď… plná šťávy Srdce! Odváží ji na moře.');if(t==170){CS2.horn(1.15);shake=4}if(t==236)say('Tahle loď mi neuteče!');
 p.on=true;p.ds=0;
 if(t<SJ.TR-12){/* dojít na místo rozběhu (případně couvnout) */
  if(t>34){const dx=SJ.RU-p.x;if(Math.abs(dx)>3){const v=Math.min(Math.abs(dx),3.6);p.x+=Math.sign(dx)*v;p.vx=Math.sign(dx)*v;p.face=Math.sign(dx)}else{p.vx=0;p.face=1}}else{p.vx=0;p.face=1}p.cr=0}
 else if(t<SJ.TR){/* příprava: podřep, nadechnutí */p.vx=0;p.face=1;p.cr=t<SJ.TR-4?1:0;if(t==SJ.TR-12){sfx('cloth')}if(t==SJ.TR-3)sjDust(p.x,p.z,8,1)}
 else if(t<SJ.TJ){/* rozběh se zrychlením */const T0=SJ.TR,D=PE-6-SJ.RU,u=(t-T0)/(SJ.TJ-T0),x=SJ.RU+D*Math.pow(u,1.55),xp=SJ.RU+D*Math.pow(Math.max(0,(t-1-T0)/(SJ.TJ-T0)),1.55);
  p.x=x;p.vx=Math.max(2,x-xp);p.face=1;p.cr=0;p.z=Math.max(0,floorAt(p.x,p.z+40,8));if(t%4==0){sjDust(p.x-8,p.z,2,1);sfx('step')}if(t==T0)sfx('whoosh');c.zt=1;
  if(t%2==0&&u>.4)par.push({x:p.x-30,y:LY,z:p.z+R(20,90),fz:-999,vx:-R(4,7),vz:0,l:8,c:'rgba(255,255,255,.55)',s:R(1.5,2.5)})}
 else if(t<SJ.TL){/* let: balistická dráha s předsazením na loď + salto */
  if(t==SJ.TJ){c.sjX0=PE-6;c.sjZ0=p.z;c.F=sjFlight(c);sfx('jump');CS2.sting(.9);SLO=Math.max(SLO,900);sjDust(p.x,p.z,14,1);ring(p.x,LY,40,'rgba(255,255,255,.6)',12,p.z);p.ld=0}
  const F=c.F,tau=t-SJ.TJ,u=tau/F.T;F.x1=psX(SJ.TL)+190*PSS;p.x=F.x0+(F.x1-F.x0)*u;p.z=F.z0+F.vz*tau-F.g*tau*tau/2;p.vz=F.vz-F.g*tau;p.vx=(F.x1-F.x0)/F.T;p.on=false;p.face=1;p.cr=0;
  /* salto kolem vrcholu dráhy */const a0=Math.round(F.vz/F.g)-9,a1=a0+16;if(tau>=a0&&tau<=a1)p.ds=10*(1-(tau-a0)/(a1-a0));
  c.zt=1+.1*Math.sin(Math.PI*Math.min(1,u*1.2));if(t%2==0)spawnP(p.x,LY,1,'#cfe8ff',1,4,p.z);
  /* stříkance z vody pod letícím kaktusem */if(tau==Math.round(F.T*.5)){for(let i=0;i<14;i++)par.push({x:p.x+R(-30,30),y:LY,z:-14+R(0,8),fz:-999,vx:R(-2,2),vz:R(2,6),l:R(24,40),c:i%2?'rgba(220,235,255,.8)':'rgba(140,180,220,.7)',s:R(2,5)});try{CS2.gull(.7,.4)}catch(e){}}}
 else{/* dopad do podřepu, loď se zhoupne */
  if(t==SJ.TL){p.z=PZR;p.vz=0;p.on=true;p.ld=12;shake=10;stop=4;sfx('heavy');sfx('thud');ring(p.x,LY,60,'rgba(255,255,255,.65)',18,p.z);sjDust(p.x,p.z,16,-1);spawnP(p.x,LY,12,'#b8a080',3,14,p.z);pop(p.x,LY,p.z+130,'NA PALUBĚ!','#9fffb0');c.zt=1.1;c.bob=1}
  const k=t-SJ.TL;p.x=psX(t)+190*PSS+(k<10?Math.max(0,6-k)*.6:0);p.z=PZR-(PSH&&PSH.dip||0);p.vx=0;p.on=true;p.ds=0;p.ld=Math.max(0,12-k);
  p.cr=k<14?1:0;p.face=k>34&&k<70?-1:1;if(k==30)say('Mířím tam, kam veze šťávu. Uvidíme, kdo dřív.');
  c.zt=1.1-.1*Math.min(1,k/60)}
 if(c.bob&&PSH){const k=t-SJ.TL;PSH.dip=k<40?Math.sin(k*.35)*Math.exp(-k*.06)*5:0}
 /* kamera: vede před běžcem, při skoku sleduje i výšku */
 const camT=t<SJ.TR?Math.max(PE-300,Math.min(p.x-260,PE-300)):t<SJ.TL?p.x-W*.42+Math.min(160,(p.vx||0)*14):Math.min(p.x-430,lv.w[1]-W-20);camTo(camT,t<60?.05:t<SJ.TL?.12:.08);
 camZ+=((t>=SJ.TJ&&t<SJ.TL+20?Math.max(0,(p.z-70)*.55):0)-camZ)*.18;
 B1C.zt=c.zt||1;
 if(t>440)fade=Math.min(1,(t-440)/50);if(t>496){fade=0;PSH=null;B1C.zt=1;B1C.z=1;camZ=0;endLevel()}};
/* zhoupnutí lodi po dopadu */
{const _w=wat;wat=function(){if(PSH&&PSH.dip&&lv.k=='port'){X.save();X.translate(0,PSH.dip);_w();X.restore()}else _w()}}
