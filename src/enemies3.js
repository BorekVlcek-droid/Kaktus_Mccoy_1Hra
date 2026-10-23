/* =====================================================================
   v78: NOVÍ ENEMIGOS – KLOUBOVÁ LOUTKA Z PŮVODNÍ KRESBY
   Díly jsou vyříznuté přímo z dodaných obrázků (hlava, trup, paže,
   předloktí, ruce, stehna, bérce, boty, zbraň po částech). Zakrytá místa
   jsou doplněná. Pohyb řeší inverzní kinematika (ruce drží zbraň, nohy
   šlapou po zemi) a pružiny pro plynulost a setrvačnost.
   ===================================================================== */
const E3I={},E3S={ok:0};
(function(){const ks=Object.keys(E3A.p);let left=ks.length;const done=()=>{if(--left==0)e3Prep()};ks.forEach(k=>{const im=new Image();im.onload=()=>{E3I[k]=im;done()};im.onerror=done;im.src=E3A.p[k].u})})();
function e3Var(im,fill,op){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation=op||'source-atop';g.fillStyle=fill;g.fillRect(0,0,c.width,c.height);return c}
function e3Prep(){try{for(const k of Object.keys(E3A.p)){const im=E3I[k];if(!im)continue;E3I[k+'@w']=e3Var(im,'#fff6e8','source-in');if(/_(thigh|shin|foot|up|fore|hand|bhand)$/.test(k))E3I[k+'@d']=e3Var(im,'rgba(14,6,22,.34)')}E3S.ok=Object.keys(E3I).length>10?1:0}catch(e){E3S.ok=0}}
const E3K={kus:.118,mnr:.12,harp:.122};
/* ---------- drobná matematika ---------- */
const e3d=(a,b)=>Math.hypot(b[0]-a[0],b[1]-a[1]),e3a=(a,b)=>Math.atan2(b[1]-a[1],b[0]-a[0]);
function e3ik(S,T,L1,L2,bs){let dx=T[0]-S[0],dy=T[1]-S[1],d=Math.hypot(dx,dy);const mx=(L1+L2)*.995;if(d>mx){dx*=mx/d;dy*=mx/d;d=mx}d=Math.max(d,Math.abs(L1-L2)+1);const a=Math.atan2(dy,dx),c=(L1*L1+d*d-L2*L2)/(2*L1*d),b=Math.acos(Math.max(-1,Math.min(1,c)));return[S[0]+Math.cos(a+bs*b)*L1,S[1]+Math.sin(a+bs*b)*L1]}
function e3reach(S,T,L){const d=e3d(S,T);if(d<=L)return T;return[S[0]+(T[0]-S[0])/d*L,S[1]+(T[1]-S[1])/d*L]}
function e3mp(M,p){const q=M.transformPoint(new DOMPoint(p[0],p[1]));return[q.x,q.y]}
function e3P(k,v,fl){const d=E3A.p[k],im=E3I[k+(v||'')];if(!d||!im)return;X.drawImage(im,d.ox,d.oy,d.w,d.h);if(fl>.02){const w=E3I[k+'@w'];if(w){const a=X.globalAlpha;X.globalAlpha=a*Math.min(1,fl);X.drawImage(w,d.ox,d.oy,d.w,d.h);X.globalAlpha=a}}}
/* kost: díl se natočí (a mírně natáhne) tak, aby úsečka a0→b0 z předlohy ležela na a→b */
function e3Bone(k,a0,b0,a,b,v,fl,str){const r0=e3a(a0,b0),r=e3a(a,b),s=str?Math.max(.88,Math.min(1.14,e3d(a,b)/Math.max(1,e3d(a0,b0)))):1;X.save();X.translate(a[0],a[1]);X.rotate(r);if(s!=1)X.scale(s,1);X.rotate(-r0);X.translate(-a0[0],-a0[1]);e3P(k,v,fl);X.restore()}
/* ---------- pružiny ---------- */
function e3Spr(e,key,tg,k,dmp){const S=e._s3||(e._s3={});let o=S[key];if(!o){o=S[key]={x:tg,v:0}}if(e._t3)return o.x;o.v+=(tg-o.x)*(k||.18);o.v*=(dmp||.62);o.x+=o.v;return o.x}
function e3Imp(e,key,v){const S=e._s3||(e._s3={});const o=S[key]||(S[key]={x:0,v:0});o.v+=v}
/* ---------- póza: cílové hodnoty podle stavu ---------- */
function e3Target(e,J,vr){const st=e.st,T2=e.t2,dead=st=='dead',P={px:0,py:0,lean:.03,ht:0,hy:0,aim:.18,wx:0,wy:0,rec:0,crouch:0,fH:null,bH:null,wOn:1,walk:0,stride:0,lift:0,jaw:0,tails:0,legW:0,spin:0,rootR:0,piv:null,rootY:0,feetUp:0,brace:0,nockT:null,boltIn:1,brk:0,hpIn:1,blinkF:0,k:.18,d:.62};
 const mv=e._mv||0,run=mv>2.1;
 if(mv>.25&&!dead&&st!='held'&&st!='thrown'&&st!='surr'){P.walk=1;P.stride=run?250:150+mv*30;P.lift=run?78:46;P.lean=run?.17:.07;P.aim=run?.08:.14;const ph=e._ph||0;P.py=-Math.abs(Math.cos(ph))*(run?22:12)+(run?6:3);P.lean+=Math.cos(ph*2)*(run?.03:.015);P.wy=Math.cos(ph*2+.6)*(run?10:6);P.aim+=Math.sin(ph)*(run?.04:.025);P.ht=Math.cos(ph*2+1.2)*(run?.05:.03);P.px=run?14:6}
 else{/* klid: dech, přenášení váhy */const b=Math.sin(T2*.045);P.py=b*5;P.lean=.03+b*.012;P.ht=Math.sin(T2*.045+1)*.025;P.aim=.24+b*.015;P.px=Math.sin(T2*.011)*6}
 /* ohlédnutí a ošívání v klidu */
 if(!P.walk&&(st=='pat'||st=='inv')&&!e.act){const c=(T2+(e.id3||0))%420;if(c<70){const u=Math.sin(c/70*Math.PI);P.ht+=-.16*u;P.lean-=.04*u;P.aim+=.08*u}else if(c>200&&c<250){const u=Math.sin((c-200)/50*Math.PI);P.py+=14*u;P.ht+=.12*u}}
 const aimAt=()=>{if(!p)return 0;const dx=Math.abs(p.x-e.x)+60,dz=(p.z+58)-(e.z+66);return Math.max(-.55,Math.min(.45,-Math.atan2(dz,dx)))};
 if(['shoot','range','aimb','aimz','aimx','pop','cover','spin','lthrow','chase','alert'].includes(st)&&!dead){P.aim=st=='chase'&&P.walk?.06:aimAt();P.wy=-14;P.ht=P.aim*.35;if(!P.walk)P.lean=.05}
 if(st=='inv'){P.aim=.1;P.ht=Math.sin(T2*.03)*.12}
 if(st=='alert'){const T0=e._aT0||36,u=Math.max(0,Math.min(1,1-(e.tm||0)/T0)),j=Math.sin(Math.min(1,u*2.2)*Math.PI);P.py=-70*j;P.feetUp=60*j;P.ht=-.28*j;P.aim=-.15*j+P.aim*(1-j);P.lean=-.1*j;P.jaw=1;P.k=.32}
 if(st=='hide'){P.crouch=120;P.lean=.34;P.ht=.18;P.aim=.55;P.wy=-10;P.walk=0}
 if(st=='cover'){P.crouch=60;P.lean=.18}
 if(st=='pop'){P.crouch=26}
 if(st=='reload'||st=='reloadz'){const T0=e._rT0||90,u=Math.max(0,Math.min(1,1-(e.tm||0)/T0));e3Reload(e,P,vr,u,J)}
 if(st=='tired'){P.crouch=40;P.lean=.32;P.ht=.25;P.aim=.6;P.py=Math.sin(T2*.2)*6}
 if(e.stn>0&&!dead){P.crouch=34;P.lean=Math.sin(T2*.13)*.14+.08;P.ht=Math.sin(T2*.21)*.28;P.px=Math.sin(T2*.09)*18;P.aim=.75+Math.sin(T2*.17)*.08;P.blinkF=.6;P.walk=0;P.k=.12}
 if(e.act=='sleep'&&st=='pat'){const br=Math.sin(T2*.045);P.sit=1;P.crouch=150+br*4;P.lean=.2+br*.02;P.ht=.5+br*.04;P.wOn=0;P.sling=1;P.walk=0;P.blinkF=1;P.fH=[J.cx+110,J.pel[1]-90+br*4];P.bH=[J.cx+60,J.pel[1]-70+br*4];P.jaw=.25+.2*Math.max(0,br);P.k=.1}
 {const A=e.act&&typeof ACT!='undefined'&&ACT[e.act];if(A&&A.pose&&st=='pat'&&!dead&&!(e.hs>0)&&!(e.stn>0)&&!['sleep','cower','surr','walk','cwalk','run','ride','carry','dance'].includes(e.act)){const v={};try{A.pose(e,v,acT(e))}catch(err){}const f=12,mp=q=>[J.cx+q[0]*f,J.gy+q[1]*f];
  if(v.hf){P.fH=mp(v.hf);P.wOn=0;P.sling=1}if(v.hb)P.bH=mp(v.hb);if(v.lean!=null)P.lean=v.lean+.03;if(v.bob>0)P.crouch=v.bob*5.5;else if(v.bob<0)P.py+=v.bob*10;if(v.fe){P.sit=1;P.crouch=150}P.walk=0;P.ht=(v.lean||0)*.5+Math.sin(T2*.03)*.05;P.k=.16}}
 if(e.act=='cower'){P.crouch=110;P.lean=.3;P.wOn=0;P.fH=[J.neck[0]+40,J.neck[1]-20];P.bH=[J.neck[0]-20,J.neck[1]-30];P.ht=.3}
 if(e.act=='warm'){P.aim=.9;P.crouch=30}
 if(e.act=='dance'){P.py=Math.abs(Math.sin(T2*.15))*-30;P.lean=Math.sin(T2*.15)*.1;P.ht=Math.sin(T2*.15)*.15}
 if(st=='surr'||st=='runoff'){P.wOn=0;P.hBH=1;const sh=Math.sin(T2*.9);P.fH=[J.neck[0]-10+sh*3,J.neck[1]-120];P.bH=[J.neck[0]-60-sh*3,J.neck[1]-110];P.ht=.06+Math.sin(T2*.05)*.1;P.lean=.06;P.jaw=.6+.3*Math.sin(T2*.5);if(st=='surr'){P.crouch=36+sh*5;P.walk=0}else{P.walk=1;P.stride=240;P.lift=70;P.lean=.12}P.k=.25}
 if(st=='held'){P.rootR=-1.42;P.piv=J.pel;P.wOn=0;P.crouch=60;const w=Math.sin(T2*.35);P.fH=[J.sh[0]+60+w*30,J.sh[1]+150];P.bH=[J.sh[0]-30-w*30,J.sh[1]+160];P.walk=1;P.stride=120;P.lift=30;P.ht=.4+w*.1;P.jaw=1}
 if(st=='thrown'){P.rootR=-1.42+T2*.33;P.piv=J.pel;P.wOn=0;P.fH=[J.sh[0]+120,J.sh[1]-40];P.bH=[J.sh[0]-120,J.sh[1]-20];P.crouch=50;P.jaw=1}
 if(vr=='harp'){if(st=='spin'){P.aim+=Math.sin(T2*.7)*.015;P.wy-=6;P.jaw=0;P.lean=.08;P.brace=.4}
  if(st=='lthrow'){P.hpIn=0;P.lean=.1}
  if(st=='pull'){P.hpIn=0;P.brace=1;P.lean=-.24+Math.sin(T2*.3)*.03;P.aim=aimAt()*.6-.08;P.px=-30;P.crouch=34;P.jaw=.5;const c=(T2*.12)%1;P.bH=[J.bgrip[0]+80-c*150,J.bgrip[1]-10+Math.sin(c*Math.PI)*-20];P.bHw=1}
  if(st=='whip'||st=='atk'){const T0=st=='whip'?26:24,v2=1-(e.tm||0)/T0,ext=v2<.4?-(v2/.4)*.6:v2<.6?(v2-.4)/.2:Math.max(0,1-(v2-.6)/.4);P.wx=ext*120;P.lean=.1+.2*Math.max(0,ext);P.aim=-.05;P.k=.35;P.jaw=1}}
 if((st=='atk'||st=='brawl'||st=='whip')&&vr!='harp'){const T0=26,v2=1-(e.tm||0)/T0,ext=v2<.4?-(v2/.4):v2<.6?(v2-.4)/.2:Math.max(0,1-(v2-.6)/.4);P.wx=ext*90;P.aim=-.2-ext*.25;P.lean=.12+.15*Math.max(0,ext);P.k=.35}
 if(vr=='harp'&&e.ls&&st!='pull')P.hpIn=0;
 {const gf=e.gf==null?e.z:e.gf;if(e.z>gf+6&&!dead&&st!='held'&&st!='thrown'){P.walk=0;P.feetUp=Math.min(70,(e.z-gf)*1.2);P.lean=.1;P.aim=-.1}}
 if(vr=='harp'&&e._hrl>0&&!e.ls&&!dead&&!(e.hs>0))e3Reload(e,P,'harp',1-e._hrl/50,J);
 if(e.hs>0&&!dead){const k=Math.min(1,e.hs/12);P.lean=-.3*k+P.lean*(1-k);P.ht=-.42*k;P.px-=26*k;P.aim-=.35*k;P.jaw=1;P.k=.35;P.blinkF=.8*k}
 if(e.lmp&&!dead){P.lean+=.1;P.ht+=.1;P.crouch+=12}
 if(EBUB.some(b=>b.e===e))P.jaw=Math.max(P.jaw,.5+.5*Math.sin(T2*.7));
 return P}
/* nabíjení podle zbraně (u = 0..1) */
function e3Reload(e,P,vr,u,J){P.walk=0;const sm=a=>a<0?0:a>1?1:a*a*(3-2*a);
 if(vr=='kus'){/* sklopit kuši, natáhnout tětivu, vložit šipku, zvednout */const dn=sm(u/.15)*(1-sm((u-.85)/.15));P.aim=.55*dn+.2*(1-dn);P.lean=.12;P.ht=.25*dn;
  const pull=sm((u-.15)/.35);P.nockT=1-pull;/* 1 = uvolněná, 0 = natažená */
  const N=e3Nock(J,P.nockT);if(u>.12&&u<.55)P.bH=['w',N[0]+6,N[1]];else if(u>=.55&&u<.85){const g=sm((u-.55)/.12);P.bH=g<1?['t',J.bgrip[0]-40,J.bgrip[1]+70]:['w',640-80*sm((u-.67)/.18),508];P.boltIn=u<.67?0:sm((u-.67)/.18)}else P.boltIn=u<.15?1:0;
  if(u<.15){P.nockT=0;P.boltIn=0}}
 else if(vr=='mnr'){/* zlomit hlavně, vypadnou nábojnice, vložit nové, zaklapnout */const br=sm(u/.14)*(1-sm((u-.82)/.08));P.brk=br;P.aim=.1*br+.12;P.wy=-20*br;P.lean=.1;P.ht=.3*br;
  if(u>.18&&u<.36)P.bH=['t',J.bgrip[0]-30,J.bgrip[1]+70];else if(u>=.36&&u<.5)P.bH=['w',J.hinge[0]+10,J.hinge[1]-24];else if(u>=.5&&u<.62)P.bH=['t',J.bgrip[0]+90,J.bgrip[1]+76];else if(u>=.62&&u<.78)P.bH=['w',J.hinge[0]+10,J.hinge[1]-24];
  if(!e._shl&&u>.16){e._shl=1;e3Shells(e)}if(u<.1)e._shl=0}
 else{/* harpunář: nová harpuna z opasku do hlavně */P.aim=.15;P.hpIn=sm((u-.45)/.4);if(u<.4)P.bH=['t',J.bgrip[0]-20,J.bgrip[1]+70];else P.bH=['w',J.mz[0]-230-(1-P.hpIn)*160,J.mz[1]+4];P.ht=.15}}
function e3Nock(J,t){const a=J.nock,b=[J.tipU[0]+2,(J.tipU[1]+J.tipL[1])/2];return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]}
/* nábojnice z brokovnice */
const E3SH=[];
function e3Shells(e){const s=sc(e.y)*(e.ks||1);for(let i=0;i<2;i++)E3SH.push({x:e.x+e.face*(14+i*4)*s,y:LY-e.z-58*s,vx:-e.face*(1.5+i*.7+Math.random()),vy:-(3+Math.random()*1.5),r:0,vr:(Math.random()-.5)*.6,l:150,g:LY-e.z,s})}
function e3ShellsDraw(){for(let i=E3SH.length-1;i>=0;i--){const q=E3SH[i];if(state=='play'){q.vy+=.35;q.x+=q.vx;q.y+=q.vy;q.r+=q.vr;if(q.y>q.g-2){q.y=q.g-2;q.vy*=-.35;q.vx*=.6;q.vr*=.5}if(--q.l<=0){E3SH.splice(i,1);continue}}
 const x=q.x-cam;if(x<-20||x>W+20)continue;X.save();X.translate(x,q.y);X.rotate(q.r);X.globalAlpha=Math.min(1,q.l/30);X.fillStyle='#c8241a';X.fillRect(-4*q.s*2,-2*q.s*2,6*q.s*2,4*q.s*2);X.fillStyle='#d8a040';X.fillRect(2*q.s*2,-2*q.s*2,2*q.s*2,4*q.s*2);X.restore()}}
/* ---------- výpočet a kreslení ---------- */
function e3Draw(e){const vr=e.vr,J=E3A.j[vr];if(!J||!E3S.ok)return false;const sx=e.x-cam;if(sx<-200||sx>W+200)return true;
 if(e.id3==null)e.id3=(Math.random()*400)|0;
 /* takt: pružiny a fáze kroku jen jednou za herní snímek */
 const tick=e._tt!==e.t2;e._tt=e.t2;e._t3=!tick;
 if(tick){const mv=Math.abs(e.x-(e._p3x==null?e.x:e._p3x)),dx=(e.x-(e._p3x==null?e.x:e._p3x))*e.face;e._p3x=e.x;e._mv=(e._mv||0)*.75+mv*.25;e._ph=(e._ph||0)+dx/Math.max(80,(e._mv>2.1?250:150+e._mv*30))*Math.PI*2*(1/(E3K[vr]*sc(e.y)*(e.ks||1)));
  if(e.st=='reload'&&e._lst!='reload')e._rT0=Math.max(30,e.tm||90);if(e.st=='alert'&&e._lst!='alert')e._aT0=Math.max(10,e.tm||36);
  if(e.fl>=7&&!e._flS){e._flS=1;e3Imp(e,'rec',vr=='mnr'?26:vr=='harp'?16:10);e3Imp(e,'lean',-.05);e3Imp(e,'ht',-.06);if(vr=='kus'){e._snap=1;e._loaded=0}}if(e.fl<7)e._flS=0;
  if(vr=='kus'){if(e.st!='reload'&&e._lst=='reload')e._loaded=1;if(e._loaded==null)e._loaded=1}
  if(vr=='harp'){if(e.ls)e._hrl=-1;else if(e._hrl==-1)e._hrl=50;if(e._hrl>0)e._hrl--}
  e._lst=e.st}
 const P=e3Target(e,J,vr),dead=e.st=='dead';
 /* plynulé hodnoty */const k=P.k,dm=P.d;
 const px=e3Spr(e,'px',P.px,k,dm),py=e3Spr(e,'py',P.py,k*1.2,dm),lean=e3Spr(e,'lean',P.lean,k,dm),ht=e3Spr(e,'ht',P.ht,k*.8,.68),aim=e3Spr(e,'aim',P.aim,k*1.1,dm),wx=e3Spr(e,'wx',P.wx,k*1.4,dm),wy=e3Spr(e,'wy',P.wy,k,dm),
  cr=e3Spr(e,'cr',P.crouch,k,dm),rec=e3Spr(e,'rec',0,.3,.55),walkK=e3Spr(e,'wk',P.walk,.12,.6),brk=e3Spr(e,'brk',P.brk,.25,.55),jaw=e3Spr(e,'jaw',P.jaw,.3,.5),brace=e3Spr(e,'brace',P.brace,.15,.6),feetUp=e3Spr(e,'fu',P.feetUp,.4,.5),
  str=e3Spr(e,'str',P.stride||150,.1,.7),lift=e3Spr(e,'lift',P.lift||40,.1,.7),hpIn=e3Spr(e,'hpi',P.hpIn,.25,.55);
 /* sekundární pohyb: cípy šátku, sukně, hlava se zpožděním */
 const vx0=(e._mv||0)*e.face,tails=e3Spr(e,'tl',Math.sin(e.t2*.21)*.12+(e._mv||0)*.09+(P.walk?Math.sin(e._ph*2)*.08:0),.12,.82),skirt=e3Spr(e,'sk',(e._mv||0)*.03+(P.walk?Math.sin(e._ph*2)*.04:0),.15,.75);
 /* smrt: pád na záda */
 let rootR=e3Spr(e,'rr',P.rootR,.2,.6),piv=P.piv||J.pel,rootDY=0;
 if(dead){const d=e.dt||0;const k1=Math.min(1,d/9),fall=d<9?0:Math.min(1,Math.pow((d-9)/16,2));const bounce=d>25?Math.sin(Math.min(1,(d-25)/10)*Math.PI)*.08*(1-Math.min(1,(d-25)/10)):0;rootR=-(1.5*fall)+bounce;piv=[J.cx-60,J.gy];rootDY=0;
  P.wOn=d<6;P.fH=[J.sh[0]+70-fall*40,J.sh[1]-120*fall+40*(1-fall)];P.bH=[J.sh[0]-40,J.sh[1]-90*fall+60*(1-fall)]}
 /* kořen */const s=sc(e.y)*(e.ks||1),sk=s*E3K[vr];const hx=e.hs>0&&!dead?R0(-2,2):0;
 if(tick){if(e._fc!=null&&e._fc!==e.face&&!dead)e._turn=7;e._fc=e.face;if(e._turn>0)e._turn--}
 const tq=e._turn>0?Math.max(.18,Math.abs(Math.cos((7-e._turn)/7*Math.PI))):1;
 let M=new DOMMatrix().translate(sx+hx,e.y-e.z).scale(e.face*sk*tq,sk*(e._turn>0?1+(1-tq)*.06:1)).translate(-J.cx,-J.gy);if(rootR)M=M.translate(piv[0],piv[1]).rotate(rootR*57.2958).translate(-piv[0],-piv[1]);
 /* stín */{const gf=e.gf==null?e.z:e.gf;if(gf>-999){const lf=Math.max(.4,1-(e.z-gf)/150);shd(sx,e.y-gf,(dead&&e.dt>20?44:26)*s*lf,6*s,.3)}}
 const fl=e.hs>0&&!dead&&(e.hs%4<2)?Math.min(1,e.hs/8)*.55:0;
 X.save();X.setTransform(X.getTransform().multiply(M));if(dead&&e.dt>100)X.globalAlpha*=Math.max(0,1-(e.dt-100)/40);
 /* pánev a trup */const pel=[J.pel[0]+px-cr*.25+brace*-20,J.pel[1]+py+cr-feetUp*.0];const Mt=new DOMMatrix().translate(pel[0],pel[1]).rotate((lean)*57.2958).translate(-J.pel[0],-J.pel[1]);
 /* nohy */const Lt=e3d(J.hipF,J.knee0),Ls=e3d(J.knee0,J.ank0),ankH=J.gy-J.ank0[1];
 const feet=[0,1].map(i=>{const restX=i?J.ank0[0]-10:J.ankB0[0]+30+brace*-30;let fx=restX,fy=J.ank0[1],fa=0;
  if(walkK>.02){const u=(((e._ph||0)/(Math.PI*2)+(i?0:.5))%1+1)%1;let wxv,lf=0,a=0;if(u<.6){const t=u/.6;wxv=str/2-str*t;a=t>.85?-(t-.85)*1.6:0}else{const t=(u-.6)/.4,ez=t*t*(3-2*t);wxv=-str/2+str*ez;lf=Math.sin(t*Math.PI)*lift;a=-.35*Math.sin(t*Math.PI)+(t>.7?(t-.7)*.9:0)}
   fx=restX+wxv*walkK;fy=J.ank0[1]-lf*walkK;fa=a*walkK}
  if(brace>.05)fx+=(i?60:-50)*brace;
  if(P.sit)fx+=i?150:170;
  fy-=feetUp*(i?1:.8);return[fx,fy,fa]});
 const hips=[[J.hipB[0]+(pel[0]-J.pel[0])+18,J.hipB[1]+(pel[1]-J.pel[1])],[J.hipF[0]+(pel[0]-J.pel[0]),J.hipF[1]+(pel[1]-J.pel[1])]];
 const leg=(i)=>{const v=i?'':'@d',Hh=hips[i],F=feets(i);const K=e3ik(Hh,F,Lt,Ls,-1);
  /* bota */X.save();X.translate(F[0],F[1]);X.rotate(feet[i][2]);X.translate(-J.ank0[0],-J.ank0[1]);e3P(vr+'_foot',v,fl);X.restore();
  e3Bone(vr+'_thigh',J.hipF,J.knee0,Hh,K,v,fl,1);e3Bone(vr+'_shin',J.knee0,J.ank0,K,F,v,fl,1)};
 const feets=i=>[feet[i][0],feet[i][1]];
 /* zbraň: rám */const WP=[(J.grip[0]+J.bgrip[0])/2,(J.grip[1]+J.bgrip[1])/2];
 let Mw=Mt.translate(WP[0]+wx,WP[1]+wy).rotate(aim*57.2958).translate(-WP[0]-rec,-WP[1]);
 const wOn=P.wOn&&!(dead&&e.dt>=6);
 if(dead&&!wOn&&!e._drop&&e.dt<40){const Wm=new DOMMatrix().translate(cam,0).multiply(M).multiply(Mw);e._drop={M:Wm,x:0,y:0,r:0,vx:e.face*1.6,vy:-3.2,vr:.05*e.face,g:e.y-(e.gf==null?e.z:e.gf)-3*s,rest:0}}
 /* paže: IK */const L1=e3d(J.sh,J.el),L2=e3d(J.el,J.wr);const S=e3mp(Mt,J.sh);
 let handFree=!wOn||P.fH;let Wt=wOn&&!P.fH?e3mp(Mw,J.wr):e3mp(Mt,P.fH||[J.sh[0]+60,J.sh[1]+220]);if(handFree)Wt=e3reach(S,Wt,(L1+L2)*.99);
 const E=e3ik(S,Wt,L1,L2,P.hBH?-1:1);
 /* zadní paže (jen když ruka nedrží zbraň) */let bT=null;if(P.bH){if(P.bH[0]=='w')bT=e3mp(Mw,[P.bH[1],P.bH[2]]);else if(P.bH[0]=='t')bT=e3mp(Mt,[P.bH[1],P.bH[2]]);else bT=e3mp(Mt,P.bH)}
 const SB=e3mp(Mt,[J.sh[0]-58,J.sh[1]+6]);if(bT)bT=e3reach(SB,bT,(e3d(J.sh,J.el)+e3d(J.el,J.wr))*.99);
 const backArm=()=>{if(!bT)return;const EB=e3ik(SB,bT,L1,L2,P.hBH?-1:1);e3Bone(vr+'_up',J.sh,J.el,SB,EB,'@d',fl,1);e3Bone(vr+'_fore',J.el,J.wr,EB,bT,'@d',fl,1);
  X.save();X.translate(bT[0],bT[1]);X.rotate(e3a(EB,bT)-e3a(J.el,J.wr));X.translate(-J.bgrip[0],-J.bgrip[1]);e3P(vr+'_bhand','',fl);X.restore()};
 /* --- kreslení --- */
 if(bT&&!(P.bH&&P.bH[0]=='w')&&!P.armsUp)backArm();
 leg(0);leg(1);
 if(P.sling&&!dead){const Ms=Mt.translate(300,470).rotate(-1.15*57.2958).translate(-WP[0],-WP[1]);X.save();X.setTransform(X.getTransform().multiply(Ms));X.globalAlpha*=.98;e3Weapon(e,vr,J,fl,0,1,{boltIn:1,nockT:0});X.restore()}
 X.save();X.setTransform(X.getTransform().multiply(Mt));e3P(vr+'_torso','',fl);if(vr=='kus'){X.save();X.translate(J.skirtTop[0],J.skirtTop[1]);X.transform(1,0,-skirt,1,0,0);X.translate(-J.skirtTop[0],-J.skirtTop[1]);e3P('kus_skirt','',fl);X.restore()}X.restore();
 if(bT&&((P.bH&&P.bH[0]=='w')||P.armsUp))backArm();
 /* zbraň */if(wOn){X.save();X.setTransform(X.getTransform().multiply(Mw));e3Weapon(e,vr,J,fl,brk,hpIn,P);if(!bT)e3P(vr+'_bhand','',fl);X.restore()}
 /* přední paže */const frontArm=()=>{e3Bone(vr+'_fore',J.el,J.wr,E,Wt,'',fl,1);
 if(wOn&&!P.fH){X.save();X.setTransform(X.getTransform().multiply(Mw));e3P(vr+'_hand','',fl);X.restore()}else{X.save();X.translate(Wt[0],Wt[1]);X.rotate(e3a(E,Wt)-e3a(J.el,J.wr));X.translate(-J.wr[0],-J.wr[1]);e3P(vr+'_hand','',fl);X.restore()}
 e3Bone(vr+'_up',J.sh,J.el,S,E,'',fl,1);
 if(vr=='kus'){X.save();const a=e3a(S,E)-e3a(J.sh,J.el);X.translate(S[0],S[1]);X.rotate(a*.35);X.translate(-J.sh[0],-J.sh[1]);e3P('kus_pad','',fl);X.restore()}};
 if(!P.armsUp)frontArm();
 /* hlava */const N=e3mp(Mt,J.neck);X.save();X.translate(N[0],N[1]);X.rotate(ht+lean);X.translate(-J.neck[0],-J.neck[1]+P.hy);
 if(vr=='harp'){X.save();X.translate(J.tailK[0],J.tailK[1]);X.rotate(-tails);X.translate(-J.tailK[0],-J.tailK[1]);e3P('harp_tails','',fl);X.restore()}
 if(vr=='harp'&&jaw>.05){X.fillStyle='#3a0c0c';X.beginPath();J.mouth.forEach((q,i)=>i?X.lineTo(q[0],q[1]+(i>1?jaw*20:0)):X.moveTo(q[0],q[1]));X.closePath();X.fill()}
 e3P(vr+'_head','',fl);
 if(vr=='harp'){X.save();X.translate(J.jawK[0],J.jawK[1]);X.rotate(jaw*.16);X.translate(-J.jawK[0],-J.jawK[1]);e3P('harp_jaw','',fl);X.restore()}
 /* mrknutí */const bl=Math.max(P.blinkF,((e.t2+(e.id3||0))%190)<6?1:0);if(bl>.05&&!dead){X.fillStyle=vr=='kus'?'#e8d8b0':vr=='mnr'?'#7a4a3a':'#b07040';for(const q of J.eyes){const hh=(q[3]-q[1])*Math.min(1,bl);X.fillRect(q[0],q[1],q[2]-q[0],hh);X.fillStyle=X.fillStyle;X.strokeStyle='#1e1610';X.lineWidth=5;X.beginPath();X.moveTo(q[0],q[1]+hh);X.lineTo(q[2],q[1]+hh);X.stroke()}}
 if(dead&&e.dt>12){X.strokeStyle='#1e1610';X.lineWidth=7;for(const q of J.eyes){const cx=(q[0]+q[2])/2,cy=(q[1]+q[3])/2,r=Math.min(q[2]-q[0],q[3]-q[1])*.35;X.beginPath();X.moveTo(cx-r,cy-r);X.lineTo(cx+r,cy+r);X.moveTo(cx+r,cy-r);X.lineTo(cx-r,cy+r);X.stroke()}}
 if(P.armsUp){X.restore();X.save();frontArm();X.restore();X.save()}
 /* čelovka: záře */if(vr=='mnr'&&!dead){const l=J.lamp,f=.5+.12*Math.sin(e.t2*.31)+.06*Math.sin(e.t2*1.7);X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(l[0],l[1],4,l[0],l[1],100);g.addColorStop(0,'rgba(255,240,180,'+f+')');g.addColorStop(1,'rgba(255,240,180,0)');X.fillStyle=g;X.fillRect(l[0]-100,l[1]-100,200,200);X.restore()}
 X.restore();
 /* dech hlídače */if(vr=='mnr'&&!dead&&tick&&(e.t2%70)==10){(e._br||(e._br=[])).push({x:J.neck[0]+150,y:J.neck[1]-30,l:46})}
 if(e._br){X.save();X.setTransform(X.getTransform().multiply(Mt));for(let i=e._br.length-1;i>=0;i--){const b=e._br[i];if(tick){b.l--;b.x+=3;b.y-=1.2}if(b.l<=0){e._br.splice(i,1);continue}X.fillStyle='rgba(235,240,245,'+(b.l/46*.5)+')';X.beginPath();X.arc(b.x,b.y,16+(46-b.l)*.9,0,7);X.fill()}X.restore()}
 X.restore();
 /* svět: body pro překryvy (lano, kužel světla, výstřel) */const WM=M.multiply(Mw);e._mzw=e3mp(WM,J.mz);e._wm=WM;e._headM=M.multiply(Mt);
 return true}
/* části zbraně */
function e3Weapon(e,vr,J,fl,brk,hpIn,P){
 if(vr=='kus'){/* tětiva */let nt=P.nockT;if(nt==null){nt=e._loaded?0:1}const snap=e3Spr(e,'nock',nt,e._snap?.55:.2,e._snap?.45:.6);if(Math.abs(snap-nt)<.01)e._snap=0;
  const flex=1+(1-snap)*.0-(snap>.5?.05:0)+(e._snap?.06*Math.sin(e.t2*2.4):0);
  e3P('kus_stock','',fl);e3P('kus_rail','',fl);
  X.save();X.translate(J.prodC[0],J.prodC[1]);X.scale(1,flex);X.translate(-J.prodC[0],-J.prodC[1]);e3P('kus_prod','',fl);X.restore();
  const N=e3Nock(J,snap),tu=[J.tipU[0],J.prodC[1]+(J.tipU[1]-J.prodC[1])*flex],tl=[J.tipL[0],J.prodC[1]+(J.tipL[1]-J.prodC[1])*flex];
  X.lineCap='round';X.lineJoin='round';X.strokeStyle='#1e1610';X.lineWidth=13;X.beginPath();X.moveTo(tu[0],tu[1]);X.lineTo(N[0],N[1]);X.lineTo(tl[0],tl[1]);X.stroke();X.strokeStyle=fl>.1?'#fff':'#d8402a';X.lineWidth=5;X.stroke();
  const bi=P.boltIn!=null&&(e.st=='reload')?P.boltIn:(e._loaded?1:0);if(bi>.02){X.save();X.translate(-(1-bi)*110,0);X.globalAlpha*=Math.min(1,bi*3);e3P('kus_bolt','',fl);X.restore()}}
 else if(vr=='mnr'){e3P('mnr_stock','',fl);e3P('mnr_recv','',fl);X.save();X.translate(J.hinge[0],J.hinge[1]);X.rotate(brk*.62);X.translate(-J.hinge[0],-J.hinge[1]);e3P('mnr_barrel','',fl);X.restore()}
 else{e3P('harp_stock','',fl);e3P('harp_recv','',fl);e3P('harp_barrel','',fl);
  if(hpIn>.02){X.save();X.translate(-(1-hpIn)*160,0);X.globalAlpha*=Math.min(1,hpIn*3);e3P('harp_harpoon','',fl);X.restore()}
  if(!e.ls){const sw=Math.sin(e.t2*.11)*.05+(e._mv||0)*.02;X.save();X.translate(640,560);X.rotate(sw);X.translate(-640,-560);e3P('harp_rope','',fl);X.restore()}}
 /* záblesk z hlavně */if(e.fl>0&&e.st!='dead'){const f=e.fl/8,mz=J.mz;X.save();X.translate(mz[0],mz[1]);if(vr!='kus'){X.globalCompositeOperation='lighter';const g=X.createRadialGradient(0,0,4,0,0,(vr=='mnr'?130:70)*f+30);g.addColorStop(0,'rgba(255,240,180,'+Math.min(1,f*1.3)+')');g.addColorStop(1,'rgba(255,140,40,0)');X.fillStyle=g;X.fillRect(-170,-170,340,340);X.globalCompositeOperation='source-over';X.fillStyle='rgba(255,246,200,'+Math.min(1,f*1.3)+')';X.beginPath();for(let q=0;q<14;q++){const a=q/14*Math.PI*2,rr=q%2?16:(vr=='mnr'?95:50)*f+20;X.lineTo(Math.cos(a)*rr*(q%4==0?1.5:1),Math.sin(a)*rr*.6)}X.closePath();X.fill()}X.restore()}}
/* upuštěná zbraň po smrti */
function e3DropDraw(e){const d=e._drop;if(!d)return;const vr=e.vr,J=E3A.j[vr];const pts=[J.grip,J.bgrip,[J.mz[0],J.mz[1]],[J.bgrip[0]-200,J.bgrip[1]]];
 const MM=()=>{const c=d.M.transformPoint(new DOMPoint(J.grip[0],J.grip[1]));return new DOMMatrix().translate(d.x,d.y).translate(c.x,c.y).rotate(d.r*57.2958).translate(-c.x,-c.y).multiply(d.M)};
 if(state=='play'&&e._dtk!==e.dt){e._dtk=e.dt;if(!d.rest){d.vy+=.45;d.x+=d.vx;d.y+=d.vy;d.r+=d.vr;const M2=MM();let low=-1e9;for(const q of pts){const w=M2.transformPoint(new DOMPoint(q[0],q[1]));low=Math.max(low,w.y)}if(low>d.g){d.y-=low-d.g;const flat=Math.round(d.r/Math.PI)*Math.PI;d.r+=(flat-d.r)*.35;if(d.vy>2.2){d.vy*=-.3;d.vx*=.5;d.vr=(flat-d.r)*.15;sfx('thud',e.x)}else{d.vy=0;d.vx*=.7;d.vr*=.5;if(Math.abs(d.vx)<.2&&Math.abs(flat-d.r)<.02)d.rest=1}}}}
 const a=e.dt>100?Math.max(0,1-(e.dt-100)/40):1;if(a<=0)return;X.save();X.globalAlpha*=a;X.setTransform(X.getTransform().multiply(new DOMMatrix().translate(-cam,0).multiply(MM())));
 if(vr=='kus'){e3P('kus_stock');e3P('kus_rail');e3P('kus_prod')}else{e3P(vr+'_stock');e3P(vr+'_recv');e3P(vr+'_barrel');if(vr=='harp'&&!e.ls)e3P('harp_harpoon')}X.restore()}
/* ---------- napojení na hru ---------- */
{const _de=dE;dE=function(e){if(e&&e.vr&&E3S.ok&&E3A.j[e.vr]){e3DropDraw(e);if(e3Draw(e))return e3Over(e)}return _de(e)}}
function e3Over(e){const vr=e.vr,st=e.st,dead=st=='dead',s=sc(e.y)*(e.ks||1),sx=e.x-cam;
 const OV=()=>{
 /* harpuna v letu a lano */if(vr=='harp'&&e.ls&&!dead&&e._mzw){const m=e._mzw,pu=st=='pull',tx=(pu?p.x:e.ls.x)-cam,ty=pu?p.y-p.z-52:LY-e.ls.z;
  X.save();X.strokeStyle='#1e1610';X.lineWidth=3.4;X.beginPath();X.moveTo(m[0],m[1]);X.quadraticCurveTo((m[0]+tx)/2,Math.max(m[1],ty)+(pu?2+Math.sin(T*.4)*2:14),tx,ty);X.stroke();X.strokeStyle='#d8b878';X.lineWidth=1.8;X.stroke();X.restore();
  const J=E3A.j.harp,a=Math.atan2(ty-m[1],(tx-m[0])||e.face);X.save();X.translate(tx,ty);X.rotate(a);const k=E3K.harp*s*1.2;X.scale(k,k);X.translate(-J.tip[0],-J.tip[1]);e3P('harp_harpoon');X.restore()}
 /* kužel čelovky */if(vr=='mnr'&&!dead&&lv&&lv.dark&&e._headM){const J=E3A.j.mnr,hl=e3mp(e._headM,J.lamp);const hx=hl[0],hy=hl[1];X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(hx,hy,4,hx,hy,300*s);g.addColorStop(0,'rgba(255,240,190,.32)');g.addColorStop(1,'rgba(255,240,190,0)');X.fillStyle=g;X.beginPath();X.moveTo(hx,hy);X.lineTo(hx+e.face*300*s,hy+40*s);X.lineTo(hx+e.face*300*s,hy+170*s);X.closePath();X.fill();X.restore()}
 /* ukazatele nad hlavou */if(!dead){const hy=e.y-e.z-132*s;X.textAlign='center';X.font='27px '+FONT;X.lineWidth=4;X.strokeStyle='#1a0c06';
  if(st=='alert'){X.strokeText('!',sx,hy);X.fillStyle='#e23a2b';X.fillText('!',sx,hy)}else if(e.stn>0){for(let i=0;i<3;i++){const a=T*.12+i*2.09;star(sx+Math.cos(a)*16*s,hy+14+Math.sin(a)*5,5,'#ffd44a')}}else if(e.act=='sleep'&&st=='pat'){X.font='700 16px Georgia';const z=(T*.4)%40;X.globalAlpha=1-z/40;X.fillStyle='#fff';X.strokeText('z',sx+10+z*.3,hy+10-z*.6);X.fillText('z',sx+10+z*.3,hy+10-z*.6);X.globalAlpha=1}else if(e.lost>110||st=='inv'){X.strokeText('?',sx,hy);X.fillStyle='#f2c94c';X.fillText('?',sx,hy)}
  X.textAlign='left'}};
 if(FXR)e._ov=OV;else OV();
 if(e.net>0&&!dead){const y0=e.y-e.z;X.strokeStyle='rgba(225,210,170,.85)';X.lineWidth=1.1;for(let i=-3;i<=3;i++){X.beginPath();X.moveTo(sx+i*9*s,y0);X.lineTo(sx+i*5*s,y0-118*s);X.stroke()}for(let j=0;j<7;j++){X.beginPath();X.moveTo(sx-28*s,y0-j*17*s);X.lineTo(sx+28*s,y0-j*17*s);X.stroke()}}}
{const _f=fxE;fxE=function(e){if(e&&e.vr&&E3S.ok&&E3A.j[e.vr]){if(e.st=='swing'&&e.sw<0)return;eLines(e);fxDraw(e.x-cam,LY-e.z,330,300,()=>dE(e));if(e._ov){const f=e._ov;e._ov=null;f()}return}return _f(e)}}
/* letící šipka z kuše: obrázek šipky z předlohy */
v2BoltDraw=function(x,y,a,s){const d=E3A.p.kus_bolt,im=E3I.kus_bolt;if(!E3S.ok||!d||!im){X.save();X.translate(x,y);X.rotate(a);X.strokeStyle='#1e1610';X.lineWidth=3;X.beginPath();X.moveTo(-14,0);X.lineTo(12,0);X.stroke();X.restore();return}const k=E3K.kus*1.45*(s||1);X.save();X.translate(x,y);X.rotate(a);X.scale(k,k);X.translate(-838,-512);X.drawImage(im,d.ox,d.oy,d.w,d.h);X.restore()};
{const _dd=dDeco;dDeco=function(d){if(E3SH.dt!=T){E3SH.dt=T;e3ShellsDraw()}return _dd(d)}}
{const _st=start;start=function(i,arr){E3SH.length=0;return _st.apply(this,arguments)}}
{const _f=eWhipLine;eWhipLine=function(e){if(e.vr=='harp')return;return _f(e)}}
