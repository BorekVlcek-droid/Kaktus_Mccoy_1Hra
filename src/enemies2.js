/* =====================================================================
   v77: NOVÍ ENEMIGOS – PŮVODNÍ GRAFIKA Z PŘEDLOH
   kus  – bažinný kušiník (dřevěná maska, kuše)        → bažina
   mnr  – důlní hlídač (ušanka s čelovkou, brokovnice)  → důl
   harp – harpunář (šátek, zrzavé vousy, harpunomet)    → různé oblasti
   Každá postava je rozřezaná na díly přímo z dodaného obrázku (hlava,
   trup se zbraní, stehna, bérce s botami, hrot šipky / harpuny) a
   rozpohybovaná jako loutka – kresba zůstává přesně podle předlohy.
   ===================================================================== */
const V2N={kus:'bažinný kušiník',mnr:'důlní hlídač',harp:'harpunář'};
const E2I={},E2S={ok:0};
(function(){const ks=Object.keys(E2A);let left=ks.length;ks.forEach(k=>{const im=new Image();im.onload=()=>{E2I[k]=im;if(--left==0)e2Prep()};im.onerror=()=>{if(--left==0)e2Prep()};im.src=E2A[k].u})})();
function e2Var(im,fill,op){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation=op||'source-atop';g.fillStyle=fill;g.fillRect(0,0,c.width,c.height);return c}
function e2Prep(){try{for(const k of Object.keys(E2A)){const im=E2I[k];if(!im)continue;E2I[k+'@w']=e2Var(im,'#fff6e8','source-in');if(/_th|_sh/.test(k))E2I[k+'@d']=e2Var(im,'rgba(16,8,24,.3)')}E2S.ok=1}catch(e){E2S.ok=0}}
/* kostra v souřadnicích předlohy (900×1022, zem y=1003) */
const E2R={
 kus:{gy:1003,cx:345,pel:[335,650],hip:[[285,648],[378,648]],knee:[[276,797],[422,797]],shK:[420,800],shF:[416,1003],neck:[452,372],mz:[832,514],k:.118,tip:[790,515]},
 mnr:{gy:1003,cx:340,pel:[330,652],hip:[[292,652],[368,652]],knee:[[284,793],[432,793]],shK:[430,795],shF:[422,1003],neck:[452,330],mz:[890,520],lamp:[547,104],k:.12},
 harp:{gy:1003,cx:340,pel:[330,652],hip:[[292,652],[368,652]],knee:[[284,793],[434,793]],shK:[432,795],shF:[422,1003],neck:[446,312],mz:[792,519],k:.122,tip:[860,520]}};
function e2P(key,v,fl){const d=E2A[key],im=E2I[key+(v||'')];if(!d||!im)return;X.drawImage(im,d.ox,d.oy,d.w,d.h);if(fl>.02){const w=E2I[key+'@w'];if(w){const a=X.globalAlpha;X.globalAlpha=a*Math.min(1,fl);X.drawImage(w,d.ox,d.oy,d.w,d.h);X.globalAlpha=a}}}
/* noha: kyčel H, chodidlo F (bod podrážky), náklon bérce shA; stehno se natočí a lehce natáhne */
function e2Leg(R,vr,i,H,F,shA,fl){const hip=R.hip[i],kn=R.knee[i],sv=[R.shF[0]-R.shK[0],R.shF[1]-R.shK[1]],c=Math.cos(shA),s=Math.sin(shA),K=[F[0]-(sv[0]*c-sv[1]*s),F[1]-(sv[0]*s+sv[1]*c)];
 const ra=Math.atan2(kn[1]-hip[1],kn[0]-hip[0]),rl=Math.hypot(kn[0]-hip[0],kn[1]-hip[1]),na=Math.atan2(K[1]-H[1],K[0]-H[0]),nl=Math.hypot(K[0]-H[0],K[1]-H[1]),st=Math.max(.8,Math.min(1.18,nl/rl)),dk=i==0?'@d':'';
 X.save();X.translate(H[0],H[1]);X.rotate(na);X.scale(st,1);X.rotate(-ra);X.translate(-hip[0],-hip[1]);e2P(vr+(i?'_thF':'_thB'),dk,fl);X.restore();
 X.save();X.translate(K[0],K[1]);X.rotate(shA);X.translate(-R.shK[0],-R.shK[1]);e2P(vr+'_sh',dk,fl);X.restore()}
/* ---------- póza ---------- */
function e2Pose(e){const st=e.st,T2=e.t2,dead=st=='dead',hit=e.hs>0&&!dead,vr=e.vr;
 if(e._t2!==T2){const mv=Math.abs(e.x-(e._px==null?e.x:e._px));e._px=e.x;e._mv=(e._mv||0)*.8+mv*.2;e._t2=T2;e._step=1}else e._step=0;
 const P={bob:0,lean:0,crouch:0,ph:null,amp:0,ht:0,hdy:0,rx:0,rot:0,piv:null,brace:0,aim:0};
 if(e._mv>.3&&!dead&&st!='held'&&st!='thrown'){if(e._step)e._wp=(e._wp||0)+.1+Math.min(.16,e._mv*.045);P.ph=e._wp;P.amp=Math.min(105,34+e._mv*22);P.wb=-Math.abs(Math.cos(P.ph))*P.amp*.16;P.ws=Math.sin(P.ph*2)*.018}
 if(dead){const d=e.dt;if(d<8){P.lean=-.3*d/8;P.ht=-.3*d/8}else{const v=Math.min(1,(d-8)/18);const ev=1-Math.pow(1-v,3);P.rot=-1.52*ev;P.dx=420*ev;P.lean=-.3*(1-v)+.12*v;P.ht=-.3+.5*v}P.ph=null;P.piv=[230,1003];return P}
 if(st=='held'||st=='thrown'){P.rot=st=='held'?-1.45:-1.45+T2*.35;P.piv=[340,650];P.ph=null;P.ht=.3;return P}
 if(st=='surr'||st=='runoff'){P.lean=-.12;P.ht=-.25+Math.sin(T2*.3)*.05;if(st=='surr'){P.ph=null;P.bob=Math.sin(T2*.3)*4}return P}
 if(hit){const k=e.hs/14;P.lean=-.28*k;P.ht=-.35*k;P.rx=-30*k;return P}
 if(e.stn>0){P.lean=Math.sin(T2*.15)*.12;P.ht=Math.sin(T2*.2)*.25;P.rx=Math.sin(T2*.1)*10;P.crouch=30;return P}
 const act=e.act;if(st=='pat'&&act=='sleep'){P.crouch=70;P.lean=.32;P.ht=.55;P.ph=null;P.bob=Math.sin(T2*.05)*4;return P}
 P.aim=['shoot','pop','aimb','range','cover','alert','chase','spin','lthrow','pull','whip','atk'].includes(st)?1:0;
 if(!P.aim){P.lean=.05;P.ht=.04}
 if(st=='alert'){const u=Math.min(1,(36-(e.tm||0))/14);P.bob=-Math.sin(u*Math.PI)*60;P.ht=-.2*Math.sin(u*Math.PI)}
 if(st=='hide'){P.crouch=95;P.lean=.34;P.ht=.15;P.ph=null}
 if(st=='pop'){P.crouch=40;P.lean=.05}
 if(st=='reload'||st=='reloadz'){P.lean=.16;P.ht=.25+Math.sin(T2*.25)*.05;P.rx=-10}
 if(e.fl>0){P.rx-=e.fl*4.5;P.lean-=e.fl*.02;P.ht-=e.fl*.01}
 if(vr=='harp'){if(st=='spin'){P.lean=-.05;P.rx=-14+Math.sin(T2*.6)*4}else if(st=='pull'){P.lean=-.22+Math.sin(T2*.4)*.04;P.rx=-40;P.brace=1}else if(st=='whip'||st=='atk'){const T0=st=='whip'?26:24,v=1-(e.tm||0)/T0,ext=v<.5?v/.5:Math.max(0,1-(v-.5)/.5);P.rx=-30+ext*90;P.lean=.16*ext}}
 if(e.lmp){P.lean+=.1;P.ht+=.08}
 if(e.act&&st=='pat'&&P.ph==null){P.ht+=Math.sin(T2*.02)*.08}
 P.lean+=Math.sin(T2*.045)*.012+(P.ws||0);P.bob+=Math.sin(T2*.07)*3;return P}
function e2Smooth(e,P,k){const S=e._pz||(e._pz={});for(const q of['bob','lean','crouch','ht','hdy','rx','brace']){S[q]=S[q]==null?P[q]:S[q]+(P[q]-S[q])*k;P[q]=S[q]}
 /* setrvačnost hlavy */const hv=e._hv||(e._hv={a:P.ht,v:0});hv.v+=(P.ht-hv.a)*.18-(P.bob-(S._pb==null?P.bob:S._pb))*.0025;hv.v*=.72;hv.a+=hv.v;S._pb=P.bob;P.ht=hv.a}
/* ---------- kreslení ---------- */
function e2Mat(e,R,P,sx,sk){let M=new DOMMatrix().translate(sx,e.y-e.z).scale(e.face*sk,sk).translate(-R.cx,-R.gy);if(P.dx)M=M.translate(P.dx,0);if(P.rot){const pv=P.piv||[R.cx,R.gy];M=M.translate(pv[0],pv[1]).rotate(P.rot*57.2958).translate(-pv[0],-pv[1])}return M}
function e2Upper(R,P){const pel=R.pel,cr=P.crouch;return new DOMMatrix().translate(pel[0]+P.rx-cr*.55,pel[1]+P.bob*.5+cr+(P.wb||0)).rotate(P.lean*57.2958).translate(-pel[0],-pel[1])}
function v2Draw(e){const vr=e.vr,R=E2R[vr];if(!R||!E2S.ok)return;const sx=e.x-cam;if(sx<-170||sx>W+170)return;
 const s=sc(e.y)*(e.ks||1),sk=s*R.k,st=e.st,dead=st=='dead';const P=e2Pose(e);e2Smooth(e,P,dead||e.hs>0?.5:['whip','atk','pull','lthrow','hide','pop'].includes(st)?.4:.22);
 {const gf=e.gf==null?e.z:e.gf;if(gf>-999)shd(sx,e.y-gf,24*s*Math.max(.5,1-(e.z-gf)/150),6*s,.3)}
 const fl=e.hs>0&&!dead&&(e.hs%4<2)?Math.min(1,e.hs/8)*.55:0,M=e2Mat(e,R,P,sx+(e.hs>0&&!dead?R0(-2,2):0),sk),U=e2Upper(R,P);
 X.save();X.setTransform(X.getTransform().multiply(M));if(dead)X.globalAlpha*=e.dt>100?Math.max(0,1-(e.dt-100)/40):1;
 /* nohy */const pel=R.pel,cr=P.crouch,hipO=[P.rx*.35-cr*.55,P.bob*.5+cr+(P.wb||0)*.8];const restF=[0,1].map(i=>[R.knee[i][0]+R.shF[0]-R.shK[0],R.knee[i][1]+R.shF[1]-R.shK[1]]);
 const feet=[0,1].map(i=>{if(P.ph!=null){const a=P.ph+i*Math.PI,lift=Math.max(0,Math.cos(a))*P.amp*.5;return[restF[i][0]+Math.sin(a)*P.amp,restF[i][1]-lift,-.32*Math.max(0,Math.cos(a))*Math.sin(a)]}const b=P.brace?(i?40:-26):0;return[restF[i][0]+b-(cr*(i?-.15:.25)),restF[i][1],0]});
 for(const i of[0,1]){const H=[R.hip[i][0]+hipO[0],R.hip[i][1]+hipO[1]];e2Leg(R,vr,i,H,[feet[i][0],feet[i][1]],feet[i][2],fl)}
 /* horní polovina */X.save();X.setTransform(X.getTransform().multiply(U));e2P(vr+'_torso','',fl);
 X.save();X.translate(R.neck[0],R.neck[1]+P.hdy);X.rotate(P.ht);X.translate(-R.neck[0],-R.neck[1]);e2P(vr+'_head','',fl);X.restore();
 if(vr=='kus')e2P('kus_pad','',fl);
 if(e._step){if(e.fl>=5&&!e._fls)e._sht=vr=='kus'?55:0;if(e._sht>0)e._sht--}e._fls=e.fl>=5;
 const loaded=vr=='kus'?!(st=='reload'||e._sht>0):vr=='harp'?!(e.ls||st=='lthrow'||st=='pull'):0;if(loaded)e2P(vr+'_tip','',fl);
 if(e.fl>0&&!dead){const f=e.fl/8,mz=R.mz;X.save();X.translate(mz[0],mz[1]);X.fillStyle='rgba(255,236,170,'+Math.min(1,f*1.2)+')';X.beginPath();for(let q=0;q<14;q++){const a=q/14*Math.PI*2,rr=q%2?14:(vr=='kus'?34:70)*f+18;X.lineTo(Math.cos(a)*rr*(q%4==0?1.4:1),Math.sin(a)*rr*.7)}X.closePath();X.fill();X.restore()}
 if(vr=='mnr'&&!dead){const l=R.lamp;X.save();X.translate(R.neck[0],R.neck[1]);X.rotate(P.ht);X.translate(-R.neck[0],-R.neck[1]);X.globalCompositeOperation='lighter';const g=X.createRadialGradient(l[0],l[1],4,l[0],l[1],90);g.addColorStop(0,'rgba(255,240,180,.55)');g.addColorStop(1,'rgba(255,240,180,0)');X.fillStyle=g;X.fillRect(l[0]-90,l[1]-90,180,180);X.restore()}
 X.restore();X.restore();
 const WM=M.multiply(U),wp=(x,y)=>{const q=WM.transformPoint(new DOMPoint(x,y));return[q.x,q.y]};e._mzw=wp(R.mz[0],R.mz[1]);
 const OV=()=>{
 /* harpuna v letu a lano */if(vr=='harp'&&e.ls&&!dead){const m=wp(R.mz[0],R.mz[1]),pu=st=='pull',tx=(pu?p.x:e.ls.x)-cam,ty=pu?p.y-p.z-52:LY-e.ls.z;
  X.save();X.strokeStyle='#1e1610';X.lineWidth=3.4;X.beginPath();X.moveTo(m[0],m[1]);X.quadraticCurveTo((m[0]+tx)/2,Math.max(m[1],ty)+(pu?2:14),tx,ty);X.stroke();X.strokeStyle='#d8b878';X.lineWidth=1.8;X.stroke();X.restore();
  e2Tip('harp',tx,ty,Math.atan2(ty-m[1],(tx-m[0])||e.face),s*1.25)}
 /* čelovka – kužel světla */if(vr=='mnr'&&!dead&&lv&&lv.dark){const hl=WM.translate(R.neck[0],R.neck[1]).rotate(P.ht*57.2958).translate(-R.neck[0],-R.neck[1]).transformPoint(new DOMPoint(R.lamp[0],R.lamp[1])),hx=hl.x,hy=hl.y;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(hx,hy,4,hx,hy,300*s);g.addColorStop(0,'rgba(255,240,190,.32)');g.addColorStop(1,'rgba(255,240,190,0)');X.fillStyle=g;X.beginPath();X.moveTo(hx,hy);X.lineTo(hx+e.face*300*s,hy+40*s);X.lineTo(hx+e.face*300*s,hy+170*s);X.closePath();X.fill();X.restore()}
 /* ukazatele nad hlavou */if(!dead){const hy=e.y-e.z-128*s;X.textAlign='center';X.font='27px '+FONT;X.lineWidth=4;X.strokeStyle='#1a0c06';
  if(st=='alert'){X.strokeText('!',sx,hy);X.fillStyle='#e23a2b';X.fillText('!',sx,hy)}else if(e.stn>0){for(let i=0;i<3;i++){const a=T*.12+i*2.09;star(sx+Math.cos(a)*16*s,hy+14+Math.sin(a)*5,5,'#ffd44a')}}else if(st=='reload'){X.font='700 20px Georgia';X.fillStyle='#fff';X.fillText('.'.repeat(1+(T/15|0)%3),sx,hy+10)}else if(e.lost>110||st=='inv'){X.strokeText('?',sx,hy);X.fillStyle='#f2c94c';X.fillText('?',sx,hy)}
  X.textAlign='left'}};if(FXR)e._ov=OV;else OV();
 if(e.net>0&&!dead){const y0=e.y-e.z;X.strokeStyle='rgba(225,210,170,.85)';X.lineWidth=1.1;for(let i=-3;i<=3;i++){X.beginPath();X.moveTo(sx+i*9*s,y0);X.lineTo(sx+i*5*s,y0-118*s);X.stroke()}for(let j=0;j<7;j++){X.beginPath();X.moveTo(sx-28*s,y0-j*17*s);X.lineTo(sx+28*s,y0-j*17*s);X.stroke()}}}
/* hrot (šipka z kuše / harpuna) jako samostatný obrázek z předlohy */
function e2Tip(vr,x,y,a,s){const d=E2A[vr+'_tip'],im=E2I[vr+'_tip'],R=E2R[vr];if(!d||!im)return;const k=R.k*(s||1),c=R.tip;X.save();X.translate(x,y);X.rotate(a);X.scale(k,k);X.drawImage(im,d.ox-c[0],d.oy-c[1],d.w,d.h);X.restore()}
function v2BoltDraw(x,y,a,s){if(E2S.ok&&E2I.kus_tip){e2Tip('kus',x,y,a,1.5*(s||1));return}X.save();X.translate(x,y);X.rotate(a);X.strokeStyle='#1e1610';X.lineWidth=3;X.beginPath();X.moveTo(-14,0);X.lineTo(12,0);X.stroke();X.restore()}
{const _de=dE;dE=function(e){if(e&&e.vr&&V2N[e.vr]&&E2S.ok)return v2Draw(e);return _de(e)}}
/* =====================================================================
   chování, střely, světlo, rozmístění
   ===================================================================== */
/* --- kušiník: šipky z kuše (oblouk), jediný výstřel a natažení --- */
{const _s=shoot;shoot=function(e){if(e.vr!='kus')return _s(e);sfx('whoosh',e.x);sfx('egun',e.x);const z0=e.z+(e.st=='pop'?70:64),v=8.2,dx=Math.abs(p.x-e.x),tt=dx/v,g=.07;bul.push({x:e.x+e.face*34,y:LY,z:z0,vx:e.face*v,vz:aimVz(e,v,z0)+g*tt*.5,o:0,k:'bolt',g2:g,r:700,sz:13});e.fl=8}}
{const _d=dBulX;dBulX=function(b){if(b.k=='bolt'){v2BoltDraw(b.x-cam,LY-b.z,Math.atan2(-(b.vz||0),b.vx));return}return _d(b)}}
const V2STK=[];
{const _u=updBul;updBul=function(){const bl=bul.filter(b=>b.k=='bolt'&&!b.g);_u();try{bl.forEach(b=>{if(b.g&&!(p&&Math.abs(b.x-p.x)<26&&b.z>p.z-14&&b.z<p.z+110)){V2STK.push({x:b.x,z:b.z,a:Math.atan2(-(b.vz||0),b.vx),l:420});spawnP(b.x,LY,3,'#c89a5a',1.5,2,b.z)}})}catch(e){}}}
{const _dd=dDeco;dDeco=function(d){if(V2STK.dt!=T){V2STK.dt=T;for(let i=V2STK.length-1;i>=0;i--){const q=V2STK[i];if(state=='play'&&--q.l<=0){V2STK.splice(i,1);continue}const x=q.x-cam;if(x<-40||x>W+40)continue;X.save();X.globalAlpha=Math.min(1,q.l/40);v2BoltDraw(x-Math.cos(q.a)*6,LY-q.z+Math.sin(q.a)*-6,q.a);X.restore()}}return _dd(d)}}
{const _st=start;start=function(i,arr){V2STK.length=0;V2SEEN.lv=-1;return _st.apply(this,arguments)}}
/* --- důlní hlídač: kužel čelovky prozradí hráče i ve tmě --- */
function v2Beam(e,x,z){return e.vr=='mnr'&&e.st!='dead'&&!(e.stn>0)&&lv&&lv.dark&&Math.sign(x-e.x)==e.face&&Math.abs(x-e.x)<300&&Math.abs(z-e.z)<80}
function v2Spot(e){return p&&!p.dead&&!p.hid&&!p.dis&&v2Beam(e,p.x,p.z)}
{const _bp=brPercept;brPercept=function(e,raw){if(!raw&&v2Spot(e)){raw=1;e.sus=Math.min(1,(e.sus||0)+.04)}return _bp.call(this,e,raw)}}
{const _se=see;see=function(e){const r=_se(e);if(!r&&e&&e.vr=='mnr'&&v2Spot(e))return 1;return r}}
{const _la=litAt;litAt=function(x,z,e){if(ens.some(o=>v2Beam(o,x,z)))return true;return _la(x,z,e)}}
{const _l=lighting;lighting=function(){if(!lv||!lv.dark||TR2)return _l();const add=[];ens.forEach(e=>{if(e.vr=='mnr'&&e.st!='dead'&&Math.abs(e.x-cam-W/2)<W){for(const d of[50,130,210,280])add.push({x:e.x+e.face*d,z:e.z+70-d*.12,t:999,civL:1})}});BSP.push(...add);try{_l()}finally{BSP=BSP.filter(q=>!q.civL)}}}
/* --- harpunář: rychlá harpuna, zásah zraní a přitáhne --- */
{const _u=updE;updE=function(e){const vr=e&&e.vr,pst=e&&e.st;_u(e);if(!vr||e.st=='dead')return;
 if(vr=='kus'){if(e.am>1)e.am=1;if(pst=='shoot'&&e.cd==80)e.cd=115}
 else if(vr=='harp'){if(e.st=='lthrow'&&e.ls&&!e.ls.h){e.ls.h=1;e.ls.vx=e.face*12.5;e.ls.vz=aimVz(e,12.5,e.ls.z,58);e.tm=34;sfx('egun',e.x);sfx('whoosh',e.x);e.fl=6}
  if(pst=='lthrow'&&e.st=='pull'){const tied=p.tied;p.inv=0;hurtP(1,e.face);if(!p.dead&&state=='play'){p.tied=tied||e;p.inv=30}pop(p.x,LY,p.z+124,'HARPUNA!','#ff9a4a');shake=Math.max(shake,6)}
  if(e.st=='spin'&&pst!='spin'){e.tm=34;pop(e.x,LY,e.z+124,'ZAMĚŘUJE','#ffcf8a')}}}}
/* --- rozmístění do úrovní --- */
function v2Plan(E){const k=lv&&lv.k,out=[],m=[];let gi=0,li2=0;
 E.forEach(q=>{let[t,x,z,o]=q,vr=null;
  if(k=='swamp'){if(t=='g')vr='kus';else if(t=='x'&&gi++%3==0){t='g';vr='kus'}}
  else if(k=='mine'){if(t=='b'||t=='g'){t='b';vr='mnr'}else if(t=='m'&&gi++%2==1){t='b';vr='mnr'}}
  else if(['port','steppe','fort','train','levi'].includes(k)){if(t=='l'){if(li2++%2==0)vr='harp'}else if(t=='g'&&gi++%4==1){t='l';vr='harp'}}
  out.push(vr?[t,x,z,o]:q);if(vr)m.push({t,x,z,vr})});return{E:out,m}}
function v2Apply(e,vr){e.vr=vr;if(vr=='kus'){e.am=1}else if(vr=='harp'){e.hp=Math.round(e.hp*1.1*10)/10;e.hp0=e.hp}else if(vr=='mnr'){e.hp=Math.round(e.hp*1.15*10)/10;e.hp0=e.hp}}
{const _sd=spawnDesign;spawnDesign=function(E){if(TR2)return _sd(E);const P0=v2Plan(E);const r=_sd(P0.E);P0.m.forEach(q=>{const e=ens.find(o=>!o.vr&&o.t==q.t&&o.ix==q.x&&o.z==q.z);if(e)v2Apply(e,q.vr)});return r}}
{const _s=seaE;seaE=function(x){const e=_s(x);try{if(!TR2&&lv&&lv.k=='sea'){if(e.t=='l'&&Math.random()<.6)v2Apply(e,'harp');else if(e.t=='g'&&Math.random()<.2){e.t='l';mkLook(e);v2Apply(e,'harp')}}}catch(err){}return e}}
/* --- první setkání: krátká rada --- */
const V2SEEN={lv:-1,s:{}};const V2TIP={kus:'Bažinný kušiník! Šipky z kuše letí obloukem – po výstřelu ji musí znovu natáhnout. To je tvoje chvíle.',mnr:'Důlní hlídač s čelovkou! Nevstupuj do kužele světla – uvidí tě i v té největší tmě.',harp:'Harpunář! Když tě harpuna trefí, přitáhne si tě k sobě – mačkej ← → a vysmekni se.'};
{const _q=qUpd;qUpd=function(){_q();try{if(TR2||state!='play')return;if(V2SEEN.lv!=li){V2SEEN.lv=li;V2SEEN.s={}}for(const e of ens){if(e.vr&&e.st!='dead'&&!V2SEEN.s[e.vr]&&Math.abs(e.x-cam-W/2)<W/2-40){V2SEEN.s[e.vr]=1;if(!(SV.v2t&&SV.v2t[e.vr])){SV.v2t=SV.v2t||{};SV.v2t[e.vr]=1;saveSV();say(V2TIP[e.vr])}}}}catch(err){}}}
/* vlastní (širší) okno pro obrysy a překryvy mimo něj (lano harpuny, kužel čelovky, ukazatele) */
{const _f=fxE;fxE=function(e){if(e&&e.vr&&V2N[e.vr]&&E2S.ok){if(e.st=='swing'&&e.sw<0)return;eLines(e);fxDraw(e.x-cam,LY-e.z,300,272,()=>dE(e));if(e._ov){const f=e._ov;e._ov=null;f()}return}return _f(e)}}
