/* ===== W34: BUDOVY S INTERIÉREM – fasáda skrývá vnitřek, uvnitř jen krátký dohled ===== */
const K4={cur:null,v:0,lt:-1,cv:null,g:null};
{const _st=start;start=function(i,arr){K4.cur=null;K4.v=0;K4.lt=-1;K4.rs=null;return _st(i,arr)}}
/* vzhled fasády podle úrovně */
const K4S={
 port:{wall:(w,h,sd)=>kBricks(0,0,w,h,'#6a3a2e','#2a1e1c',sd,{bw:18,bh:8}),ledge:'#8a8476',fr:'#2a2a30',trim:'#8a8476',cor:'#7a7468',signs:['NÁMOŘNICKÁ UBYTOVNA'],cc:'#3a5a7a',arch:1,grime:'rgba(10,12,20,.32)'},
 steppe:{wall:(w,h,sd)=>kBoards(0,0,w,h,'#8a5634',sd,{hor:1,pw:11}),ledge:'#6a4426',fr:'#4a2a16',trim:'#c8a46a',cor:'#7a4a28',signs:['GRAND HOTEL'],cc:'#a8302a',sh:'#3a6a7a',grime:'rgba(40,16,6,.3)'},
 fort:{wall:(w,h,sd)=>kStones(0,0,w,h,'#6e685c','#26221e',sd,{bh:22,bw:38}),ledge:'#8a8476',fr:'#2a2a30',trim:'#9a948a',cor:'#7a7468',signs:['KASÁRNA','ZBROJNICE'],cc:'#7a1a1e',bars:2,arch:1,grime:'rgba(10,12,20,.35)'},
 mine:{wall:(w,h,sd)=>kStones(0,0,w,h,'#5a4a3a','#1a120a',sd,{bh:26,bw:44,r:6}),ledge:'#6a4828',fr:'#3a2414',trim:'#7a5632',cor:'#6a4828',signs:['SPRÁVA DOLU','UBIKACE HORNÍKŮ'],cc:'#6a5a2a',bars:2,grime:'rgba(14,8,4,.45)'},
 swamp:{wall:(w,h,sd)=>kBoards(0,0,w,h,'#5a5444',sd,{pw:12,nails:[10,h-14]}),ledge:'#4a3a28',fr:'#2a2218',trim:'#6a5a46',cor:'#4a3a28',signs:['STARÁ SUŠÁRNA'],cc:'#6a5a2a',sh:'#4a4434',grime:'rgba(20,30,16,.4)'}};
/* patra (podle podlah uvnitř) a otvory na okrajích (kde chybí stěna i sousední stavba) */
function k4Bands(d){if(d._bands)return d._bands;const x0=d.x,x1=d.x+d.w;
 const fl=[...new Set(sol.filter(o=>(o.k=='mf'||o.k=='p')&&o.x<x1-4&&o.x+o.w>x0+4&&o.t>d.z0+8&&o.t<d.z1-4).map(o=>o.t))].sort((a,b)=>a-b),lz=[d.z0,...fl,d.z1],B=[];
 const solidAt=(x,z)=>sol.some(o=>!o.gone&&o.k!='p'&&o.k!='mf'&&o.k!='mw'&&o.k!='ld'&&x>=o.x&&x<=o.x+o.w&&z>o.b&&z<o.t);
 const wallAt=(side,zb,zt)=>sol.some(o=>o.k=='mw'&&Math.abs((side<0?o.x:o.x+o.w)-(side<0?x0:x1))<6&&o.b<=zb+8&&o.t>=zt-8);
 for(let i=0;i<lz.length-1;i++){const zb=lz[i],zt=lz[i+1],zm=(zb+zt-16)/2;B.push({zb,zt,L:!wallAt(-1,zb,zt-16)&&!solidAt(x0-8,zm),R:!wallAt(1,zb,zt-16)&&!solidAt(x1+8,zm)})}
 return d._bands=B}
function k4Paint(d,w,h,k,e){const S=K4S[k]||K4S.port,sd=(d.x|0)%997,B=k4Bands(d),yOf=z=>h-(z-d.z0);e.wl=[];
 S.wall(w,h,sd);
 /* hrázděné trámy v dole, rohové sloupky jinde */
 if(k=='mine'){for(let x=150;x<w-60;x+=150){const P=aRR(x,0,12,h,1);cel(P,'#5a3c22',1.2,.9);aLine(P,'#1a0c04',.9,.95)}}
 [[0],[w-14]].forEach(([px])=>{const P=aRR(px,0,14,h,1);if(k=='steppe'||k=='swamp'||k=='mine')cel(P,k=='swamp'?'#3e3424':'#6a4426',1.2,.9);else{X.save();X.clip(P);kStones(px,0,14,h,'#8a8476','#3a362e',sd+px,{bh:16,bw:14,r:1.5});X.restore()}aLine(P,'#120804',1,.9)});
 kGrime(0,0,w,h,sd,S.grime,Math.round(w/22),90);
 let signY=0;const top=B.length-1;
 B.forEach((b,i)=>{const yb=yOf(b.zb),yt=yOf(b.zt)+16,bh=yb-yt,doors=[];if(b.L)doors.push(18);if(b.R)doors.push(w-58);
  const ww=28,wh=Math.min(42,bh*.42),n=Math.max(2,Math.round((w-80)/108));
  /* štítek pod římsou v nejvyšším patře */const sgn=i==top?S.signs[(sd>>3)%S.signs.length]:null;
  for(let j=0;j<n;j++){const cx=40+(j+.5)*(w-80)/n;if(doors.some(dx=>Math.abs(cx-(dx+20))<64))continue;if(sgn&&Math.abs(cx-w/2)<110)continue;
   const r=kH(sd+i*31+j*7),lit=r<.42,wy=yt+(bh-wh)*.42;
   if(k=='fort'&&i>0&&r>.7){/* střílna */const Sl=aRR(cx-4,wy,8,wh,3);X.fillStyle=lit?'#ffcf7a':'#0a0806';X.fill(Sl);aLine(Sl,'#d8d0bc',.8,.5);if(lit){e.wl.push([cx,wy+wh/2]);if(KUL.cur)KUL.cur.fx.push(['win',cx,wy+wh/2,26])}continue}
   kWin(cx-ww/2,wy,ww,wh,{lit,fr:S.fr,trim:S.trim,rows:2,cur:lit?1:0,cc:S.cc,sil:lit&&kH(r*7)<.4?.3+kH(r*9)*.4:null,hat:k=='steppe'||k=='swamp',bars:S.bars&&kH(r*3)<.6?S.bars:0,arch:S.arch&&i==0,sh:S.sh&&kH(r*5)<.7?S.sh:null,broken:!lit&&kH(r*11)<.15});
   if(lit)e.wl.push([cx,wy+wh/2])}
  /* otvory dveří – tady se dá vejít */
  doors.forEach(dx=>{const dh=Math.min(86,bh-10);kDoor(dx,yb-dh,40,dh,{open:1,glow:1,arch:S.arch,fr:S.fr});
   if(k=='steppe'&&i==0){[[dx+1,1],[dx+21,-1]].forEach(([bx])=>{const P=aRR(bx,yb-dh*.72,18,dh*.4,2);cel(P,'#8a5a34',1,.7);X.save();X.clip(P);X.strokeStyle='rgba(40,20,8,.5)';X.lineWidth=.8;for(let yy=yb-dh*.72+5;yy<yb-dh*.32;yy+=5){X.beginPath();X.moveTo(bx,yy);X.lineTo(bx+18,yy);X.stroke()}X.restore();aLine(P,'#1a0c04',.9,.95)})}
   kLamp(dx<w/2?dx+56:dx-16,yb-dh+6,dx<w/2?1:-1)});
  /* balkonové zábradlí ve stepi */
  if(k=='steppe'&&i>0){const ry=yb-2;X.fillStyle='#5a3a22';for(let x=10;x<w-10;x+=9){if(doors.some(dx=>x>dx-4&&x<dx+44))continue;X.fillRect(x,ry-15,3,15)}const Rl=aRR(6,ry-18,w-12,4,1);cel(Rl,'#6a4426',1,.7);aLine(Rl,'#1a0c04',.8,.95)}
  /* prapory v pevnosti */
  if(k=='fort'&&i>0&&i<top){const bx=w*(kH(sd+i)<.5?.3:.7),by=yt+2;const P=new Path2D();P.moveTo(bx-13,by);P.lineTo(bx+13,by);P.lineTo(bx+13,by+bh*.62);P.lineTo(bx,by+bh*.52);P.lineTo(bx-13,by+bh*.62);P.closePath();cel(P,'#8a1e24',1.2,.9);X.fillStyle='#d9a830';X.font='700 14px Georgia';X.textAlign='center';X.fillText('V',bx,by+bh*.3);aLine(P,'#2a0808',.9,.95)}
  if(sgn)signY=yt+24});
 /* vybledlý nápis přes přízemí ve stepi, plakáty v přístavu, mech v bažině */
 if(k=='steppe')kPaint(w/2,yOf(d.z0+104)+14,'BAR · POKOJE · KOUPEL',{fs:14,band:'#5a1a14',a:.85});
 if(k=='port'){kPipe(w*.5,8,h-2);for(let q=0;q<2;q++)kPoster(w*(.36+q*.3),h-60+kH(sd+q)*8,(kH(sd*3+q)-.5)*.2,1)}
 if(k=='swamp'){kMoss(0,h-2,w,sd,'#4a6a34',1);const Pt=aRR(w*.6,h*.42,34,26,1);cel(Pt,'#7a6a5e',1,.6);aLine(Pt,'#3a3028',.8,.9);X.save();X.strokeStyle='rgba(200,190,150,.5)';X.lineWidth=.7;const nx=w*.25,ny=h*.55;for(let q=0;q<7;q++){X.beginPath();X.moveTo(nx+q*5,ny);X.quadraticCurveTo(nx+q*5+4,ny+20,nx+q*4+2,ny+36);X.stroke()}X.restore()}
 if(k=='mine'){const Sg=aRR(w*.5-30,h-36,60,14,2);cel(Sg,'#b8a078',1,.7);aLine(Sg,'#2a1a08',.8,.95);X.fillStyle='#7a1a14';X.font='700 9px Georgia';X.textAlign='center';X.fillText('PELIGRO · TNT',w*.5,h-26)}
 /* římsy pater a hlavní římsa (na ní se dá stát – je to střecha) */
 B.forEach((b,i)=>{if(i==top)return;const y=yOf(b.zt);const L=aRR(-3,y,w+6,14,1.5);cel(L,S.ledge,1.2,.9);aLine(L,'#120804',1,.95);X.fillStyle='rgba(6,2,6,.35)';X.fillRect(0,y+14,w,4)});
 kShade(0,0,w,h,{bot:.36,side:.32,top:.08});kRim(0,0,w,h,.8);X.strokeStyle=OL;X.lineWidth=2.2;X.strokeRect(0,0,w,h);
 kCornice(0,0,w,S.cor,{h:16,br:k=='mine'||k=='swamp'?0:32});
 const sgn=S.signs[(sd>>3)%S.signs.length];if(signY)kSign(w/2,signY+4,sgn,{fs:15,seed:sd,minW:150})}
function k4Fac(d){const k=lv.k,w=d.w,h=d.z1-d.z0;d._fc=d._fc||{};return kulCv(d._fc,'mzf|'+w+'x'+h+'|'+k,w+20,h+10,e=>{e.ox=10;e.oy=6;X.translate(10,6);k4Paint(d,w,h,k,e)})}
/* kdo je kde: fasáda zmizí, když jsi uvnitř; dohled se zúží */
function k4Upd(){const n=K4.lt<0?0:Math.max(0,Math.min(3,T-K4.lt));K4.lt=T;let cur=null;
 if(p&&p.dead)cur=K4.cur;else if(p)for(const d of deco)if(d.k=='mz'&&p.x>d.x+2&&p.x<d.x+d.w-2&&p.z>=d.z0-2&&p.z<d.z1-6){cur=d;break}
 K4.cur=cur;for(const d of deco)if(d.k=='mz'){const tg=d===cur?0:1;if(d._fa==null||!n)d._fa=d._fa==null?tg:d._fa;if(n)d._fa+=(tg-d._fa)*(1-Math.pow(.84,n));if(Math.abs(d._fa-tg)<.01)d._fa=tg}
 const tv=cur?1:0;if(n)K4.v+=(tv-K4.v)*(1-Math.pow(.88,n));if(Math.abs(K4.v-tv)<.01)K4.v=tv}
function k4DrawAll(){if(!lv||!KMZ[lv.k])return;k4Upd();for(const d of deco){if(d.k!='mz'||!(d._fa>.005))continue;const x=d.x-cam;if(x>W+40||x+d.w<-40)continue;const e=k4Fac(d),dx=Math.round(x)-10,dy=Math.round(LY-d.z1)-6;
 X.save();X.globalAlpha*=d._fa;X.drawImage(e.c,dx,dy);kulLive(e,dx+10,dy+6);X.restore()}}
{const _f=dFx;dFx=function(){try{k4DrawAll()}catch(e){console.error('k4',e)}return _f()}}
/* vnitřek za plnou fasádou nekreslit (kromě předehřívání mezipaměti) */
{const _km=kulMaze;kulMaze=function(d){if(d&&d._fa>=1&&X!==KUL.dummy&&lv&&KMZ[lv.k]){const x=d.x-cam;return true}return _km(d)}}
{const _wl=kulWarmList;kulWarmList=function(){const L=_wl();try{if(KMZ[lv.k])for(const d of deco)if(d.k=='mz')L.push([d.x,()=>kulWarmCall(d.x,()=>k4Fac(d))])}catch(e){}return L}}
/* tma uvnitř: dohled jen v místnosti, kde hrdina je (zdi a stropy nejsou průhledné) */
function k4Closed(xb,r){for(const o of sol){if(o.gone||o.ow||o.k=='mf'||o.k=='p'||o.k=='m'||o.k=='e')continue;if(o.x<xb+5&&o.x+o.w>xb-5&&o.b<=r.zb+24&&o.t>=r.zt-24)return true}return false}
function k4Rooms(){const d=K4.cur,tg=new Set();if(d&&p){const R=d._rm||(d._rm=k2Rooms(d));
  for(const r of R){if(p.x<r.x0-16||p.x>r.x1+16)continue;if(!(r.zt+12>p.z&&r.zb-4<p.z+86))continue;
   const main=p.z>=r.zb-6&&p.z<r.zt+12;if(!main){const zf=r.zb>p.z?r.zb:r.zt+16;if(sol.some(o=>o.k=='mf'&&!o.gone&&Math.abs(o.t-zf)<3&&p.x>o.x-6&&p.x<o.x+o.w+6))continue}
   if(r._ol==null){r._ol=r.x0<=d.x+20&&!k4Closed(d.x,r);r._or=r.x1>=d.x+d.w-2&&!k4Closed(d.x+d.w,r);r._lo=r.zb<=d.z0+1}
   tg.add(r)}}
 const M=K4.rs||(K4.rs=new Map());for(const r of tg)if(!M.has(r))M.set(r,0);
 for(const[r,a]of M){const t=tg.has(r)?1:0;let na=a+(t-a)*.2;if(Math.abs(na-t)<.02)na=t;if(na<=0&&!t)M.delete(r);else M.set(r,na)}return M}
function k4Dark(){const v=K4.v;if(v<.01||!p)return;const M=40,CW=W+M*2,CH=H+M*2;let c=K4.cv;if(!c||c.width!=CW){c=K4.cv=document.createElement('canvas');c.width=CW;c.height=CH;K4.g=c.getContext('2d')}const g=K4.g;
 g.globalCompositeOperation='source-over';g.clearRect(0,0,CW,CH);g.fillStyle='rgba(4,3,7,.992)';g.fillRect(0,0,CW,CH);g.globalCompositeOperation='destination-out';
 const hole=(x,y,r0,r,a)=>{x+=M;y+=M;if(x<-r||x>CW+r||a<=0)return;const gr=g.createRadialGradient(x,y,r0,x,y,r);gr.addColorStop(0,'rgba(0,0,0,'+a+')');gr.addColorStop(.55,'rgba(0,0,0,'+a*.55+')');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)};
 const fl=1+.025*Math.sin(T*.11)+.015*Math.sin(T*.37),px=p.x-cam,py=LY-p.z-50+camZ,d=K4.cur,RM=k4Rooms();
 const e=d?KUL.map.get(d):null,bx=d?Math.round(d.x-cam):0,by=d?Math.round(LY-d.z1)+camZ:0;
 for(const[r,a]of RM){if(a<=0)continue;g.save();g.beginPath();
  const x0=r.x0-18-cam+M,x1=r.x1+18-cam+M,y0=LY-(r.zt+16)+camZ+M-2,y1=r._lo?CH:LY-(r.zb-16)+camZ+M;g.rect(x0,y0,x1-x0,y1-y0);
  /* otevřené dveře ven: venek je vidět */
  if(r._ol)g.rect(-10,0,Math.max(0,r.x0-cam+M+2),y1);if(r._or){const xo=r.x1-cam+M-2;g.rect(xo,0,CW-xo+10,y1)}
  g.clip();hole(px,py,40,175*fl,a);if(e&&e.lamps)for(const q of e.lamps){const lx=d.x+q[0],lz=d.z1-q[1];if(lx>r.x0-20&&lx<r.x1+20&&lz>r.zb-4&&lz<r.zt+20)hole(bx+q[0],by+q[1],4,70,.55*a)}g.restore()}
 X.save();X.globalAlpha=v;X.drawImage(c,-M,-M);X.globalCompositeOperation='lighter';const wg=X.createRadialGradient(px,py,0,px,py,150);wg.addColorStop(0,'rgba(255,190,120,.07)');wg.addColorStop(1,'rgba(255,190,120,0)');X.fillStyle=wg;X.fillRect(px-150,py-150,300,300);X.restore()}
/* v tmavých úrovních okna fasád svítí přes tmu */
function k4Glow(){if(!lv.dark)return;X.save();X.translate(0,camZ);X.globalCompositeOperation='lighter';
 for(const d of deco){if(d.k!='mz'||!(d._fa>.02)||!d._fc)continue;const e=KUL.map.get(d._fc);if(!e)continue;const bx=d.x-cam,by=LY-d.z1;if(bx>W+60||bx+d.w<-60)continue;
  for(const q of e.wl||[]){const x=bx+q[0],y=by+q[1],f=(.85+.15*Math.sin(T*.05+q[0]))*d._fa,gr=X.createRadialGradient(x,y,2,x,y,44);gr.addColorStop(0,'rgba(255,196,120,'+.45*f+')');gr.addColorStop(1,'rgba(255,196,120,0)');X.fillStyle=gr;X.fillRect(x-44,y-44,88,88)}
  for(const q of e.lamps){const x=bx+q[0],y=by+q[1],gr=X.createRadialGradient(x,y,2,x,y,80);gr.addColorStop(0,'rgba(255,190,100,'+.4*d._fa+')');gr.addColorStop(1,'rgba(255,190,100,0)');X.fillStyle=gr;X.fillRect(x-80,y-80,160,160)}}X.restore()}
{const _l=lighting;lighting=function(){_l();if(!lv||TR2||state=='menu'||!KMZ[lv.k])return;try{k4Glow();k4Dark()}catch(e){console.error('k4l',e)}}}
/* uvnitř nepadá déšť ani mlha z popředí */
{const _f=fg;fg=function(){if(K4.v>.01&&lv&&KMZ[lv.k]){X.save();X.globalAlpha=1-.88*K4.v;try{return _f()}finally{X.restore()}}return _f()}}
