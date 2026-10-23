/* ===== W30: HRDINA v3 – fyzika látek, mimika, smeary, squash & stretch, afterimage ===== */
const hCl=(v,a,b)=>v<a?a:v>b?b:v;
/* ---------- obličej: procedurální oči a obočí (zdrojové px) ---------- */
const HFE=[{x:452,y:332,rx:29.5,ry:22,r:-.08,ir:15.5,bs:1,inn:1},{x:529,y:321,rx:33,ry:26,r:.05,ir:17,bs:0,inn:-1}];
const HFB=[{a:[413,268],b:[482,287]},{a:[561,260],b:[502,290]}];
const HLID='#4f9e3a';
function hFace(F){X.save();X.scale(HK,HK);X.translate(-HCX,-HPY);X.lineJoin='round';X.lineCap='round';
 for(let i=0;i<2;i++){const E=HFE[i],w=F.wide,rx=E.rx*w,ry=E.ry*w;X.save();X.translate(E.x,E.y);X.rotate(E.r);
  X.fillStyle='rgba(24,60,18,.32)';X.beginPath();X.ellipse(0,1,rx+8,ry+7,0,0,7);X.fill();
  if(F.x>.5){X.strokeStyle=HOL;X.lineWidth=7;X.beginPath();X.moveTo(-rx*.6,-ry*.6);X.lineTo(rx*.6,ry*.6);X.moveTo(rx*.6,-ry*.6);X.lineTo(-rx*.6,ry*.6);X.stroke();X.restore();continue}
  if(F.sq>.5){const s=E.inn;X.strokeStyle=HOL;X.lineWidth=7.5;X.beginPath();X.moveTo(-s*rx*.65,-ry*.75);X.lineTo(s*rx*.55,0);X.lineTo(-s*rx*.65,ry*.65);X.stroke();X.restore();continue}
  const S=new Path2D();S.ellipse(0,0,rx,ry,0,0,7);X.fillStyle='#f4f0e2';X.fill(S);
  X.save();X.clip(S);X.fillStyle='rgba(140,120,90,.32)';X.fillRect(-rx,-ry,rx*2,ry*.6);
  if(E.bs){X.strokeStyle='#c8342a';X.lineWidth=2.2;X.beginPath();X.moveTo(-rx,4);X.lineTo(-rx*.55,0);X.moveTo(-rx*.45,ry);X.lineTo(-rx*.28,ry*.45);X.moveTo(rx*.55,ry*.9);X.lineTo(rx*.25,ry*.42);X.stroke()}
  const ir=E.ir,ix=F.lx*(rx-ir*.62),iy=F.ly*(ry-ir*.5);
  X.fillStyle='#7c4a1e';X.beginPath();X.arc(ix,iy,ir,0,7);X.fill();X.fillStyle='rgba(30,14,4,.35)';X.beginPath();X.arc(ix,iy-ir*.15,ir*.92,Math.PI*1.05,Math.PI*1.95);X.fill();
  X.strokeStyle='#40220a';X.lineWidth=2.4;X.beginPath();X.arc(ix,iy,ir,0,7);X.stroke();
  X.fillStyle='#120a06';X.beginPath();X.arc(ix,iy,ir*.56*F.pu,0,7);X.fill();
  X.fillStyle='#fff';X.beginPath();X.arc(ix-ir*.34,iy-ir*.36,ir*.25,0,7);X.fill();X.beginPath();X.arc(ix+ir*.3,iy+ir*.28,ir*.1,0,7);X.fill();
  const lu=hCl(F.lu[i],0,1),ld=hCl(F.ld[i],0,1),tl=(F.lt||0)*E.inn;
  if(lu>.02){const y0=-ry+2*ry*lu,yA=y0-tl*ry*.45,yB=y0+tl*ry*.45,cy=(yA+yB)/2+ry*.3*(1-lu*.7),P=new Path2D();P.moveTo(-rx-4,-ry-5);P.lineTo(rx+4,-ry-5);P.lineTo(rx+4,yB);P.quadraticCurveTo(0,cy,-rx-4,yA);P.closePath();
   X.fillStyle=HLID;X.fill(P);X.fillStyle='rgba(255,255,220,.18)';X.fillRect(-rx,-ry-5,rx*2,ry*.5);X.strokeStyle=HOL;X.lineWidth=5.5;X.beginPath();X.moveTo(rx+4,yB);X.quadraticCurveTo(0,cy,-rx-4,yA);X.stroke()}
  if(ld>.02){const y1=ry-2*ry*ld,P=new Path2D();P.moveTo(-rx-4,ry+5);P.lineTo(rx+4,ry+5);P.lineTo(rx+4,y1);P.quadraticCurveTo(0,y1-ry*.28,-rx-4,y1);P.closePath();X.fillStyle=HLID;X.fill(P);X.strokeStyle=HOL;X.lineWidth=4;X.beginPath();X.moveTo(rx+4,y1);X.quadraticCurveTo(0,y1-ry*.28,-rx-4,y1);X.stroke()}
  X.restore();X.strokeStyle=HOL;X.lineWidth=6;X.stroke(S);X.restore()}
 /* obočí */
 for(let i=0;i<2;i++){const B=HFB[i],ax=B.a[0],ay=B.a[1]+F.bo[i],bx=B.b[0],by=B.b[1]+F.bi[i],dx=bx-ax,dy=by-ay,l=Math.hypot(dx,dy)||1;let nx=-dy/l,ny=dx/l;if(ny>0){nx=-nx;ny=-ny}
  const cx=(ax+bx)/2,cy=(ay+by)/2-2*F.arch,h=8,P=new Path2D();
  P.moveTo(ax+nx*h,ay+ny*h);P.quadraticCurveTo(cx+nx*h,cy+ny*h,bx+nx*h*.9,by+ny*h*.9);P.lineTo(bx-nx*h*.9,by-ny*h*.9);P.quadraticCurveTo(cx-nx*h,cy-ny*h,ax-nx*h,ay-ny*h);P.closePath();
  X.fillStyle='#5a2c0e';X.fill(P);X.save();X.clip(P);X.translate(nx*2.6,ny*2.6);X.fillStyle='#93501f';X.fill(P);X.restore();
  X.strokeStyle='#d08040';X.lineWidth=3;const Q=v=>[(1-v)*(1-v)*ax+2*v*(1-v)*cx+v*v*bx+nx*h*.38,(1-v)*(1-v)*ay+2*v*(1-v)*cy+v*v*by+ny*h*.38];
  for(const v of[.1,.4,.7]){const a=Q(v),b=Q(v+.15);X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke()}
  X.strokeStyle=HOL;X.lineWidth=5.5;X.stroke(P)}
 X.restore()}
const HFACE0=[{lu:[.3,.06],bi:[0,0],bo:[0,0]},{lu:[.4,.26],bi:[3,3],bo:[0,0]},{lu:[.46,.36],bi:[5,5],bo:[2,2]},{lu:[.46,.0],bi:[6,-7],bo:[2,-10]}];
function hFaceT(s,C,o){const b=HFACE0[C]||HFACE0[0],F={lx:s.lkx,ly:s.lky,lu:b.lu.slice(),ld:[0,0],bi:b.bi.slice(),bo:b.bo.slice(),arch:0,wide:1,pu:1,sq:0,x:0,lt:0};
 const add=(lu,bi,bo)=>{for(let i=0;i<2;i++){F.lu[i]+=lu;F.bi[i]+=bi;F.bo[i]+=bo}};
 if(o.dead){F.x=1;return F}if(o.hurt){F.sq=1;add(0,-9,7);return F}
 if(o.angry){add(.12,8,-3);F.lt=.5;F.ld=[.14,.14]}else if(o.focus)add(.07,4,-1);
 if(o.up){add(-.25,-6,-6);F.wide=1.05;F.arch=2}
 if(o.fall){F.lu=[0,0];add(0,-11,-5);F.wide=1.1;F.pu=.62;F.arch=3}
 if(o.sleepy)add(.28,-2,1);if(o.squint)F.lu=F.lu.map(v=>Math.max(v,o.squint));if(o.wideR&&C==3)F.lu[1]=0;
 if(C==3&&!o.fall&&!o.angry)F.lu[1]=Math.min(F.lu[1],.08);
 for(let i=0;i<2;i++)F.lu[i]=hCl(F.lu[i],0,.92);return F}
/* ---------- látky: verlet v lokálním rámci postavy s inerciálními silami ---------- */
const HCLO=[
 [{k:'flap',w:2,n:6,seg:3.4,an:[[-7.4,-5.6],[-2.8,-4.2]],wt:4.6,wb:10.5,rd:[[-.62,1],[-.36,1]],st:.06,col:'#b8302a',lin:'#6e1612',hem:'zig',g:.3,dr:.07,dm:.955,xm:-1},
  {k:'sc1',w:1,n:4,seg:2.4,an:[[-6.4,-24.6]],rd:[[-1,.55]],st:.05,w0:1.6,w1:.5,col:'#c0322a',g:.22,dr:.1,dm:.94,xm:-3.5},
  {k:'sc2',w:1,n:3,seg:2.5,an:[[-6.4,-23.4]],rd:[[-.8,1]],st:.05,w0:1.3,w1:.5,col:'#9a261e',g:.22,dr:.1,dm:.94,xm:-3.5}],
 [{k:'cloak',w:2,n:8,seg:5.3,an:[[-8.6,-23.6],[-3.2,-25.6]],rd:[[-.2,1],[-.06,1]],st:.03,wt:5.6,wb:12.5,col:'#4e4438',lin:'#2a241c',hem:'tat',g:.3,dr:.06,dm:.955,xm:-2},
  {k:'m1',w:1,n:4,seg:2.3,head:[HMOUTH[0]-8.8,HMOUTH[1]-.8],w0:1.35,w1:.5,col:'#6a5c46',g:.2,dr:.11,dm:.93,xm:99},
  {k:'m2',w:1,n:3,seg:2.4,head:[HMOUTH[0]-8.6,HMOUTH[1]+.9],w0:1.15,w1:.45,col:'#5a4e3c',g:.2,dr:.11,dm:.93,xm:99},
  {k:'sash',w:1,n:4,seg:2.5,an:[[-8.8,-1.6]],rd:[[-.45,1]],st:.04,w0:1.5,w1:.8,col:'#6a5a40',g:.25,dr:.08,dm:.94,xm:-3}],
 [{k:'skirt',w:2,n:6,seg:4,an:[[-9.6,-3],[-1.6,-1.2]],rd:[[-.22,1],[.02,1]],st:.035,wt:8.2,wb:13.5,col:'#2c2c34',lin:'#6a1c22',hem:'notch',g:.32,dr:.05,dm:.955,xm:1.5}],
 [{k:'t1',w:2,n:5,seg:3.5,an:[[-7.8,-4.2],[-5.2,-4.2]],rd:[[-.42,1],[-.36,1]],st:.05,wt:2.8,wb:2.2,col:'#47182a',lin:'#c8a050',hem:'point',g:.3,dr:.07,dm:.95,xm:-2},
  {k:'t2',w:2,n:5,seg:3.5,an:[[-5,-4.4],[-2.2,-4.4]],rd:[[-.3,1],[-.24,1]],st:.05,wt:2.8,wb:2.2,col:'#5a2236',lin:'#d8b060',hem:'point',g:.3,dr:.07,dm:.95,xm:.5},
  {k:'ch',w:1,n:7,seg:1.9,head:[HEYE[1][0]+2.6,HEYE[1][1]+2.2],col:'#d9b25a',rope:1,g:.28,dr:.05,dm:.92,xm:99,front:1}]];
function hCon(a,b,L,wa,wb,st){const dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1e-4,s=wa+wb;if(!s)return;const k=(l-L)/l/s*(st||1);a.x+=dx*k*wa;a.y+=dy*k*wa;b.x-=dx*k*wb;b.y-=dy*k*wb}
function hClothInit(it,A){const P=[];for(let r=0;r<it.n;r++)for(let c=0;c<it.w;c++){const a=A[c]||A[0];let x=a[0],y=a[1]+r*it.seg;if(it.w==2){const dw=(it.wb-it.wt)*r/(it.n-1)/2;x+=c?dw:-dw}P.push({x,y,px:x,py:y})}return P}
function hClothStep(it,P,A,gx,gy,ax,ay,lean,pel,t,gnd,RS){const W=it.w,n=it.n,dm=it.dm;
 for(let c=0;c<W;c++){const q=P[c],a=A[c]||A[0];q.px=q.x;q.py=q.y;q.x=a[0];q.y=a[1]}
 for(let i=W;i<P.length;i++){const q=P[i];let vx=(q.x-q.px)*dm,vy=(q.y-q.py)*dm;const vl=Math.hypot(vx,vy);if(vl>5){vx*=5/vl;vy*=5/vl}const fl=Math.sin(t*.11+i*1.3)*.022+Math.sin(t*.047+i*.7)*.018;q.px=q.x;q.py=q.y;q.x+=vx+gx+ax+fl;q.y+=vy+gy+ay+fl*.4;if(RS){const r=RS[i];q.x+=(r[0]-q.x)*it.st;q.y+=(r[1]-q.y)*it.st}}
 const c=Math.cos(lean),sn=Math.sin(lean);
 for(let k=0;k<4;k++){
  for(let r=0;r<n-1;r++)for(let cc=0;cc<W;cc++)hCon(P[r*W+cc],P[(r+1)*W+cc],it.seg,r==0?0:1,1);
  if(W==2)for(let r=1;r<n;r++){const wr=it.wt+(it.wb-it.wt)*r/(n-1),dg=Math.hypot(it.seg,it.wt+(it.wb-it.wt)*(r-.5)/(n-1));hCon(P[r*2],P[r*2+1],wr,1,1);hCon(P[(r-1)*2],P[r*2+1],dg,r==1?0:1,1,.3);hCon(P[(r-1)*2+1],P[r*2],dg,r==1?0:1,1,.3)}
  if(it.xm<90)for(let i=W;i<P.length;i++){const q=P[i],xt=c*q.x+sn*(q.y-pel);if(xt>it.xm){const d=xt-it.xm;q.x-=c*d;q.y-=sn*d}}
  for(let i=W;i<P.length;i++){const q=P[i];if(q.y>gnd){q.y=gnd;q.px+=(q.x-q.px)*.35}}}
 /* nenatažitelnost: follow‑the‑leader po sloupcích */
 for(let r=1;r<n;r++)for(let cc=0;cc<W;cc++){const a=P[(r-1)*W+cc],b=P[r*W+cc],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy),mx=it.seg*1.06;if(l>mx){const k=mx/l,nx=a.x+dx*k,ny=a.y+dy*k;b.px+=(nx-b.x)*.6;b.py+=(ny-b.y)*.6;b.x=nx;b.y=ny}}}
function hRot(q,C){if(q.dead){const dt2=q.dt||0;if(dt2<12)return 0;const v=Math.min(1,(dt2-12)/18);return-1.45*(1-Math.pow(1-v,3))+(dt2>30&&dt2<42?Math.sin((dt2-30)/12*Math.PI)*.1:0)}if(q.ds>0&&C!=1)return-(1-q.ds/10)*6.283;return 0}
function hClothUpd(q,s,C,t,t2r,h2r,lean,pel,gl){const L=HCLO[C]||[];if(!s.clo||s.cloC!=C||s.clReset){s.clo=L.map(it=>({it,P:null}));s.cloC=C;s.clReset=0}
 const f=q.face||1,n=s.fresh?0:Math.min(3,s.n),rot=hRot(q,C),cr=Math.cos(-rot),sr=Math.sin(-rot);
 const vlx=s.vwx*f,vly=-s.vwz,pvx=s.pvwx*f,pvy=-s.pvwz;
 for(const o of s.clo){const it=o.it,A=it.head?[h2r(it.head[0],it.head[1])]:it.an.map(a=>t2r(a[0],a[1]));let RS=null;if(it.rd&&!it.head){RS=[];for(let r=0;r<it.n;r++)for(let c=0;c<it.w;c++){const a=it.an[c]||it.an[0],d=it.rd[c]||it.rd[0],l=Math.hypot(d[0],d[1]),dw=it.w==2?(it.wb-it.wt)*r/(it.n-1)/2*(c?1:-1):0;RS.push(t2r(a[0]+d[0]/l*r*it.seg+dw*.3,a[1]+d[1]/l*r*it.seg))}}
  const g=it.g,gx=Math.sin(rot)*g,gy=Math.cos(rot)*g;
  if(!o.P){o.P=hClothInit(it,A);for(let i=0;i<45;i++)hClothStep(it,o.P,A,gx,gy,0,0,lean,pel,t+i,gl,RS)}
  if(n){const dvx=pvx-vlx,dvy=pvy-vly;for(let i=0;i<n;i++){const ix=(i?0:dvx)-it.dr*vlx,iy=(i?0:dvy)-it.dr*vly;hClothStep(it,o.P,A,gx,gy,cr*ix-sr*iy,sr*ix+cr*iy,lean,pel,t-n+i+1,gl,RS)}}
  else hClothStep(it,o.P,A,gx,gy,0,0,lean,pel,t,gl,RS)}}
function hDrawLadder(it,P){const n=it.n,L=[],R=[];for(let r=0;r<n;r++){L.push(P[r*2].x,P[r*2].y);R.push(P[r*2+1].x,P[r*2+1].y)}
 const S=new Path2D();S.moveTo(L[0],L[1]);crTo(S,L);
 const lx=L[2*n-2],ly=L[2*n-1],rx=R[2*n-2],ry=R[2*n-1],qx=(P[(n-2)*2].x+P[(n-2)*2+1].x)/2,qy=(P[(n-2)*2].y+P[(n-2)*2+1].y)/2;let dx=(lx+rx)/2-qx,dy=(ly+ry)/2-qy;const dl=Math.hypot(dx,dy)||1;dx/=dl;dy/=dl;
 if(it.hem=='zig'||it.hem=='tat'||it.hem=='notch'){const k=it.hem=='tat'?6:it.hem=='zig'?4:3,dep=it.hem=='tat'?4.4:it.hem=='zig'?2.6:1.3;for(let i=1;i<k*2;i++){const v=i/(k*2),x=lx+(rx-lx)*v,y=ly+(ry-ly)*v,o=i%2?dep*(it.hem=='tat'?(.55+.45*Math.abs(Math.sin(i*2.3))):1):-dep*.12;S.lineTo(x+dx*o,y+dy*o)}}
 else if(it.hem=='point')S.lineTo((lx+rx)/2+dx*3,(ly+ry)/2+dy*3);
 S.lineTo(rx,ry);const Rr=[];for(let r=n-1;r>=0;r--)Rr.push(R[r*2],R[r*2+1]);crTo(S,Rr);S.closePath();
 cel(S,it.col,1.4,1,cDk(it.col,.45),cLt(it.col,.28));
 X.save();X.clip(S);X.fillStyle=it.lin;
 for(let r=0;r<n-1;r++){const a=P[r*2],b=P[r*2+1],c2=P[r*2+3],d=P[r*2+2],cr=(b.x-a.x)*(d.y-a.y)-(b.y-a.y)*(d.x-a.x);if(cr<0){X.beginPath();X.moveTo(a.x,a.y);X.lineTo(b.x,b.y);X.lineTo(c2.x,c2.y);X.lineTo(d.x,d.y);X.closePath();X.fill()}}
 X.lineCap='round';X.strokeStyle=cDk(it.col,.5);X.lineWidth=.75;X.globalAlpha=.7;
 for(const fq of(it.wb>5?[.3,.62]:[.5])){const Q=[];for(let r=0;r<n;r++)Q.push(P[r*2].x+(P[r*2+1].x-P[r*2].x)*fq,P[r*2].y+(P[r*2+1].y-P[r*2].y)*fq);const Pq=new Path2D();Pq.moveTo(Q[0],Q[1]);crTo(Pq,Q);X.stroke(Pq)}
 X.strokeStyle=cLt(it.col,.35);X.lineWidth=.6;X.globalAlpha=.45;{const Q=[];for(let r=0;r<n;r++)Q.push(P[r*2+1].x+(P[r*2].x-P[r*2+1].x)*.14,P[r*2+1].y+(P[r*2].y-P[r*2+1].y)*.14);const Pq=new Path2D();Pq.moveTo(Q[0],Q[1]);crTo(Pq,Q);X.stroke(Pq)}
 X.globalAlpha=1;X.restore();hStroke(S,1.1)}
function hDrawRibbon(P,w0,w1,col){const n=P.length,A=[],B=[];for(let i=0;i<n;i++){const a=P[Math.max(0,i-1)],b=P[Math.min(n-1,i+1)];let dx=b.x-a.x,dy=b.y-a.y;const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const w=w0+(w1-w0)*i/(n-1);A.push(P[i].x-dy*w,P[i].y+dx*w);B.push(P[i].x+dy*w,P[i].y-dx*w)}
 const e=P[n-1],pe=P[n-2],S=new Path2D();S.moveTo(A[0],A[1]);crTo(S,A);S.lineTo(e.x+(e.x-pe.x)*.45,e.y+(e.y-pe.y)*.45);const Br=[];for(let i=n-1;i>=0;i--)Br.push(B[i*2],B[i*2+1]);S.lineTo(Br[0],Br[1]);crTo(S,Br);S.closePath();cel(S,col,1,.7);hStroke(S,.8)}
function hDrawCloth(s,front){if(!s.clo)return;for(const o of s.clo){if(!o.P||!!o.it.front!=front)continue;const it=o.it;
 if(it.rope){const Q=[];o.P.forEach(q=>Q.push(q.x,q.y));const R=new Path2D();R.moveTo(Q[0],Q[1]);crTo(R,Q);X.save();X.lineCap='round';X.strokeStyle='#6a4a1a';X.lineWidth=.75;X.stroke(R);X.strokeStyle=it.col;X.lineWidth=.42;X.stroke(R);X.restore()}
 else if(it.w==2)hDrawLadder(it,o.P);else hDrawRibbon(o.P,it.w0,it.w1,it.col)}}
/* ---------- kroky: klíčové pózy nohy (contact → down → pass → up) ---------- */
const HKW=[[0,-1,0,.4],[.25,-.72,-.55,.62],[.55,.05,-.62,.12],[.82,.96,-.26,-.2],[1,1,0,-.26]];
const HKR=[[0,-1,0,.6],[.2,-.88,-1.15,.95],[.48,-.12,-1.02,.45],[.78,.98,-.5,-.12],[1,1,0,-.22]];
function hKeys(K,v){let i=0;while(i<K.length-2&&v>K[i+1][0])i++;const k0=K[Math.max(0,i-1)],k1=K[i],k2=K[i+1],k3=K[Math.min(K.length-1,i+2)],tt=hCl((v-k1[0])/((k2[0]-k1[0])||1),0,1),t2=tt*tt,t3=t2*tt;
 const cr=(a,b,c,d)=>.5*((2*b)+(-a+c)*tt+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);return[cr(k0[1],k1[1],k2[1],k3[1]),cr(k0[2],k1[2],k2[2],k3[2]),cr(k0[3],k1[3],k2[3],k3[3])]}
function hFoot(u,S,L,run){u=((u%1)+1)%1;const st=run?.4:.56;
 if(u<st){const v=u/st;return[S*(1-2*v),0,v<.15?-.25*(1-v/.15):v>.7?(v-.7)/.3*(run?.6:.4):0]}
 const k=hKeys(run?HKR:HKW,(u-st)/(1-st));return[k[0]*S,k[1]*L,k[2]]}
function hGait3(u,k,run,C,acc){const S=(3.2+5.4*k+(run?3.2:0))*(C==2?.92:1),L=(2.2+4*k+(run?3.6:0))*(C==1?.8:1),FE=[],FA=[];
 for(let i=0;i<2;i++){const f=hFoot(u+i*.5,S,L,run);FE.push([f[0]+(i?2.2:-2.2),f[1]]);FA.push(f[2])}
 const B=(.8+1.6*k+(run?1.2:0))*(C==2?1.35:1);
 let BOB=run?B*(.5+.5*Math.cos(2*Math.PI*(2*u-.36)))+.6:B*(.5+.5*Math.cos(2*Math.PI*(2*u-.12)));
 let LEAN=.03+.09*k+(run?.09:0)+Math.sin(4*Math.PI*u)*.012+hCl(acc,-.5,.5)*.22;
 const a0=-Math.cos(2*Math.PI*(u-.05)),a1=-a0;let H0,H1,AB=[-1,-1];
 if(run){const hand=(sh,a)=>[sh[0]+1+a*7.5,sh[1]+12.5-Math.max(0,a)*7.5-Math.max(0,-a)*1.5];H0=hand(HSH[0],a0);H1=hand(HSH[1],a1)}
 else{const A=2.5+5.5*k;H0=[HSH[0][0]+1.2+a0*A,HSH[0][1]+15.5-Math.max(0,a0)*3*k];H1=[HSH[1][0]+1.2+a1*A,HSH[1][1]+15.5-Math.max(0,a1)*3*k]}
 if(C==1){BOB+=2.6;LEAN+=.1;H1=[H1[0]+4,H1[1]-4];H0=[H0[0]+5,H0[1]-3]}
 else if(C==2){LEAN-=.03;if(!run){H0=[2,-13];AB=[1,-1]}}
 else if(C==3){if(!run){H1=[5,-18.5];AB=[-1,1];H0=[HSH[0][0]+3+a0*5.5,HSH[0][1]+19-Math.max(0,a0)*3]}}
 else if(!run)H0=[HSH[0][0]-3.6+a0*2.5,HSH[0][1]+17];
 return{FE,FA,H0,H1,BOB,LEAN,AB,TW:(run?.04:.025)*a1,PX:0}}
/* ---------- vzduch: odraz → stoupání → vrchol → pád ---------- */
function hAir3(vz,t,tk){const s1=HSH[1],s0=HSH[0];
 if(tk<6&&vz>2)return{FE:[[-4.5,2],[3,.5]],FA:[.65,.35],H1:[s1[0]+6,s1[1]-13],H0:[s0[0]-3,s0[1]+9],LEAN:.13,BOB:-3,AB:[-1,-1]};
 if(vz>2.5)return{FE:[[-6.5,-1.5],[6,-12.5]],FA:[.55,-.2],H1:[s1[0]+9,s1[1]-13],H0:[s0[0]-7,s0[1]+11],LEAN:.06,BOB:-1.5,AB:[-1,-1]};
 if(vz>-2.5)return{FE:[[-3,-10.5],[5.5,-13.5]],FA:[.35,-.1],H1:[s1[0]+12,s1[1]-3],H0:[s0[0]-10,s0[1]-1],LEAN:.1,BOB:-1,AB:[-1,-1]};
 const f=Math.min(1,(-vz-2.5)/7),w=Math.sin(t*.42)*f;
 return{FE:[[-4.5,-3+f*2],[6.5,-6+f*4]],FA:[-.15,-.3],H1:[s1[0]+9+w*3,s1[1]-14-f*2+Math.cos(t*.42)*3*f],H0:[s0[0]-8-w*3,s0[1]-12-f*2-Math.cos(t*.42)*3*f],LEAN:-.04-f*.04,BOB:-f*2,AB:[-1,-1]}}
const HSLIDE={FE:[[-2,0],[18,0]],FA:[.35,-.7],H1:[HSH[1][0]+8,HSH[1][1]+12],H0:[HSH[0][0]-14,HSH[0][1]+22],BOB:14,LEAN:-.52,AB:[-1,-1]};
const HLAND={FE:[[-6.5,0],[7,0]],FA:[0,-.1],H1:[HSH[1][0]+10,HSH[1][1]+8],H0:[HSH[0][0]-7,HSH[0][1]+9],BOB:8,LEAN:.17,AB:[-1,-1]};
const HSKID={FE:[[-7,0],[10.5,0]],FA:[.15,-.5],H1:[HSH[1][0]+9,HSH[1][1]-6],H0:[HSH[0][0]-8,HSH[0][1]+5],BOB:5,LEAN:-.16,AB:[-1,-1]};
const HSTOP={FE:[[-5,0],[8.5,0]],FA:[.05,-.3],H1:[HSH[1][0]+8,HSH[1][1]+8],H0:[HSH[0][0]+5,HSH[0][1]+11],BOB:3.5,LEAN:-.12,AB:[-1,-1]};
function hLay(tp,L,w,armFree){if(w<=.005)return tp;const T=armFree?L:Object.assign({},L,{H0:tp.H0,H1:tp.H1,AB:tp.AB,LEAN:tp.LEAN+(L.LEAN-.0)*.4});const m=hMixPose(tp,T,hCl(w,0,1));m.TW=tp.TW;m.PX=(tp.PX||0)*(1-w);return m}
/* ---------- dynamika: rychlosti, odraz/dopad, pružiny, mrkání, sakády ---------- */
function hDyn(q,s,C,air){const n=s.fresh?0:s.n;
 if(s.d3==null){Object.assign(s,{d3:1,sq:0,sqv:0,wasAir:air?1:0,tk:99,lt2:99,li:0,minvz:0,acc:0,skid:0,stopT:99,stopW:0,pvxa:0,rc:0,rcv:0,laim:q.aim||0,mf:99,bkT:60+Math.random()*90,bk:0,sacT:0,slx:.4,sly:-.15,lkx:.4,lky:-.15,F:null,lx3:q.x||0,lz3:q.z||0,vwx:0,vwz:0,pvwx:0,pvwz:0,ftr:[],ktr:[],smk:[],idleT:0,fvar:0,ls:0,lsv:0,u:0,lvx3:q.vx||0})}
 const vwx=n?((q.x||0)-s.lx3)/n:0,vwz=n?((q.z||0)-s.lz3)/n:0;s.lx3=q.x||0;s.lz3=q.z||0;const tele=Math.abs(vwx)>26||Math.abs(vwz)>40;
 s.pvwx=tele?0:s.vwx;s.pvwz=tele?0:s.vwz;s.vwx=tele?0:vwx;s.vwz=tele?0:vwz;if(tele){s.clReset=1;s.smk.length=0}
 if(s.face3!=null&&s.face3!=q.face)s.smk.forEach(m=>{m.x=-m.x});s.face3=q.face;
 if(!n)return;
 if(air&&!s.wasAir&&(q.vz||0)>3){s.tk=0;s.sqv+=.08;s.minvz=0}
 if(air)s.minvz=Math.min(s.minvz,q.vz||0);
 if(!air&&s.wasAir&&!q.climb&&!q.hang&&!(q.cu>0)){const im=hCl((-s.minvz-2)/11,0,1);s.lt2=0;s.li=.35+.65*im;s.sqv-=.04+.12*im}
 s.wasAir=air?1:0;s.tk+=n;s.lt2+=n;
 for(let i=0;i<n;i++){const tg=air&&!q.climb?Math.min(.075,Math.abs(q.vz||0)*.0065):0;s.sqv+=(tg-s.sq)*.3-s.sqv*.24;s.sq=hCl(s.sq+s.sqv,-.24,.18)}
 const vx=q.vx||0,dv=vx-s.lvx3;s.lvx3=vx;s.acc=s.acc*.6+dv*(q.face||1)*.4;
 if((q.aim||0)>s.laim+4){s.rcv+=C==2?.5:.32;s.mf=0}s.laim=q.aim||0;s.mf+=n;
 for(let i=0;i<n;i++){s.rcv+=-s.rc*.3-s.rcv*.3;s.rc+=s.rcv}
 s.bkT-=n;if(s.bk>0)s.bk=Math.max(0,s.bk-n);if(s.bkT<=0){s.bk=9;s.bkT=Math.random()<.18?14:150+Math.random()*230}
 s.sacT-=n;if(s.sacT<=0){s.sacT=45+Math.random()*120;s.slx=-.55+Math.random()*1.45;s.sly=-.55+Math.random()*.95;if(Math.random()<.25){s.slx=.05;s.sly=.05}}}
/* ---------- nečinnost ---------- */
function hFidget3(q,C,s,t,still){let fv=0;
 if(q===p){if(still){s.idleT+=s.n;if(s.fid){s.fv+=s.n/(C==0&&s.fvar==1?175:150);if(s.fv>=1){s.fid=0;s.fv=0;s.idle=0}}else if((s.idle=(s.idle||0)+s.n)>280+((q.x|0)%100)){s.fid=1;s.fv=0;s.lfv=0;s.fvar=(s.fvar+1)%3;}}else{s.fid=0;s.fv=0;s.idle=0;s.idleT=0}fv=s.fid?s.fv:0}
 else if(still){const c=t%620;fv=c>440?(c-440)/150:0;if(fv>1)fv=0;s.fvar=((t/620)|0)%3}return fv}
/* ---------- efekty: smear, hvězda zásahu, záblesk hlavně ---------- */
function hSmear(tr,w,col,core){const n=tr.length;if(n<3)return;let len=0;for(let i=1;i<n;i++)len+=Math.hypot(tr[i][0]-tr[i-1][0],tr[i][1]-tr[i-1][1]);if(len<7)return;
 const mk=ww=>{const A=[],B=[];for(let i=0;i<n;i++){const a=tr[Math.max(0,i-1)],b=tr[Math.min(n-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const k=ww*Math.pow(i/(n-1),.75);A.push(tr[i][0]-dy*k,tr[i][1]+dx*k);B.push(tr[i][0]+dy*k,tr[i][1]-dx*k)}
  const S=new Path2D();S.moveTo(A[0],A[1]);crTo(S,A);const Br=[];for(let i=n-1;i>=0;i--)Br.push(B[i*2],B[i*2+1]);S.lineTo(Br[0],Br[1]);crTo(S,Br);S.closePath();return S};
 X.save();const a=X.globalAlpha;X.globalAlpha=a*Math.min(1,len/22)*.55;X.fillStyle='rgba(236,244,255,1)';X.fill(mk(w));X.globalAlpha=a*Math.min(1,len/22)*.7;X.fillStyle=col;X.fill(mk(w*.55));
 X.globalAlpha=a*.5;X.strokeStyle='#fff';X.lineWidth=.6;X.lineCap='round';const e=tr[n-1],b=tr[0];let dx=e[0]-b[0],dy=e[1]-b[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;for(let i=-1;i<=1;i++){const o=i*w*.9,sx=e[0]-dy*o,sy=e[1]+dx*o;X.beginPath();X.moveTo(sx-dx*(4+Math.abs(i)*2),sy-dy*(4+Math.abs(i)*2));X.lineTo(sx-dx*(4+len*.7),sy-dy*(4+len*.7));X.stroke()}X.restore()}
function hStar(x,y,r,a){X.save();X.translate(x,y);X.globalAlpha*=a;const P=new Path2D();for(let i=0;i<12;i++){const an=i/12*6.283+.2,rr=i%2?r*.38:r*(i%4?.75:1);P.lineTo(Math.cos(an)*rr,Math.sin(an)*rr)}P.closePath();X.fillStyle='#fff6c8';X.fill(P);X.fillStyle='#ffffff';X.beginPath();X.arc(0,0,r*.3,0,7);X.fill();X.strokeStyle='rgba(255,190,80,.9)';X.lineWidth=.6;X.stroke(P);X.restore()}
function hMuzzle(x,y,a,r){X.save();X.translate(x,y);X.rotate(a);X.globalCompositeOperation='lighter';const g=X.createRadialGradient(4,0,0,4,0,r*1.6);g.addColorStop(0,'rgba(255,250,210,.95)');g.addColorStop(.4,'rgba(255,200,90,.7)');g.addColorStop(1,'rgba(255,120,30,0)');X.fillStyle=g;X.beginPath();X.moveTo(0,-r*.35);X.lineTo(r*.9,-r*.55);X.lineTo(r*2.2,0);X.lineTo(r*.9,r*.55);X.lineTo(0,r*.35);X.closePath();X.fill();X.beginPath();X.arc(3,0,r*.9,0,7);X.fill();X.restore()}
/* ---------- upravené díly v2 (bez sinusových cípů – ty přebírá fyzika) ---------- */
function hArmA(x0,y0,h,back,K,bd,al){al=al||HAL;const k=ik(x0,y0,h[0],h[1],al,al,bd||-1),jx=k[0],jy=k[1],ex=k[2],ey=k[3],an=Math.atan2(ey-jy,ex-jx),col=back?'#3f9232':'#4fae3c';
 const L=aLimb(x0,y0,jx,jy,ex,ey,[5.2,4.8,4.3,4.1,3.9],[5.1,4.7,4.2,4,3.8],0);
 if(!K.sleeve)hSpike(x0+(jx-x0)*.5+L.n1x*4.2,y0+(jy-y0)*.5+L.n1y*4.2,L.n1x-L.d1x*.35,L.n1y-L.d1y*.35,4.8,1.4);
 hSpike(jx+(ex-jx)*.55-L.n2x*3.8,jy+(ey-jy)*.55-L.n2y*3.8,-L.n2x-L.d2x*.3,-L.n2y-L.d2y*.3,4.2,1.25);
 cel(L.P,col,1.6,1.1,cDk(col,.36),cLt(col,.35));
 X.save();X.clip(L.P);X.lineCap='round';X.strokeStyle=cDk(col,.42);X.lineWidth=.8;X.globalAlpha=.75;X.beginPath();X.moveTo(x0+L.n1x*.6,y0+L.n1y*.6);X.lineTo(jx+L.mx*.6,jy+L.my*.6);X.lineTo(ex+L.n2x*.6,ey+L.n2y*.6);X.stroke();
  X.strokeStyle=cLt(col,.5);X.lineWidth=.8;X.globalAlpha=.6;X.beginPath();X.moveTo(x0-L.n1x*2.3,y0-L.n1y*2.3);X.lineTo(jx-L.mx*2.2,jy-L.my*2.2);X.lineTo(ex-L.n2x*2,ey-L.n2y*2);X.stroke();X.globalAlpha=1;
  if(K.wrap){X.strokeStyle=back?cDk(K.wrap,.2):K.wrap;X.lineWidth=1.5;for(let v=.38;v<.95;v+=.13){const px=jx+(ex-jx)*v,py=jy+(ey-jy)*v;X.beginPath();X.moveTo(px+L.n2x*5,py+L.n2y*5);X.lineTo(px-L.n2x*5+L.d2x*1.6,py-L.n2y*5+L.d2y*1.6);X.stroke()}X.strokeStyle='rgba(60,40,20,.4)';X.lineWidth=.5;for(let v=.38;v<.95;v+=.13){const px=jx+(ex-jx)*v,py=jy+(ey-jy)*v;X.beginPath();X.moveTo(px+L.n2x*5+L.d2x*.7,py+L.n2y*5+L.d2y*.7);X.lineTo(px-L.n2x*5+L.d2x*2.3,py-L.n2y*5+L.d2y*2.3);X.stroke()}}
 X.restore();hStroke(L.P,1.2);
 if(K.sleeve){const sc=back?cDk(K.sleeve,.18):K.sleeve,S=aLimb(x0,y0,jx,jy,jx+(ex-jx)*.42,jy+(ey-jy)*.42,[5.7,5.2,4.8,4.7,4.8],[5.6,5.1,4.7,4.6,4.7],0);cel(S.P,sc,1.6,1.1,cDk(sc,.45),cLt(sc,.3));X.save();X.clip(S.P);X.strokeStyle=cDk(sc,.5);X.lineWidth=.7;X.globalAlpha=.7;const s2=S.tu>0?1:-1;for(let q=0;q<2;q++){const ox=jx+S.mx*s2*(2+q*1.5),oy=jy+S.my*s2*(2+q*1.5);X.beginPath();X.moveTo(ox-S.d1x*2,oy-S.d1y*2);X.quadraticCurveTo(ox+S.mx*s2,oy+S.my*s2,ox+S.d2x*2,oy+S.d2y*2);X.stroke()}X.restore();hStroke(S.P,1.1);
  const cx=jx+(ex-jx)*.42,cy=jy+(ey-jy)*.42;X.save();X.translate(cx,cy);X.rotate(an);const Cf=aRR(-1.8,-5.6,3.6,11.2,1.2);cel(Cf,K.cuff||cDk(sc,.25),1,.7);hStroke(Cf,.8);X.restore()}
 else hSpike(jx+L.mx*(L.tu>0?-4:4),jy+L.my*(L.tu>0?-4:4),L.mx*(L.tu>0?-1:1)+L.d1x*.4,L.my*(L.tu>0?-1:1)+L.d1y*.4,3.4,1.1);
 return[ex,ey,an]}
function hMask(K){const col=K.mask,[mx,my]=HMOUTH,P=new Path2D();P.moveTo(mx-8.6,my-4.2);P.quadraticCurveTo(mx,my-5.6,mx+8.4,my-4.6);P.quadraticCurveTo(mx+9.4,my+.6,mx+8,my+4.8);P.quadraticCurveTo(mx,my+6.6,mx-8.2,my+4.6);P.quadraticCurveTo(mx-9.6,my,mx-8.6,my-4.2);P.closePath();cel(P,col,1.4,1,cDk(col,.45),cLt(col,.3));X.save();X.clip(P);X.strokeStyle=cDk(col,.5);X.lineWidth=.6;X.globalAlpha=.8;for(let k=-1;k<=1;k++){X.beginPath();X.moveTo(mx-8,my+k*2.4);X.quadraticCurveTo(mx,my+k*2.4+1.2,mx+8,my+k*2.4-.4);X.stroke()}X.restore();hStroke(P,.9);
 X.fillStyle=cDk(col,.2);X.beginPath();X.ellipse(mx-8.8,my,1.4,1.8,0,0,7);X.fill();X.strokeStyle=HOL;X.lineWidth=.6;X.stroke()}
function hMonocle(){const[ex,ey]=HEYE[1];X.save();X.strokeStyle='#d9b25a';X.lineWidth=.8;X.beginPath();X.arc(ex,ey,3.3,0,7);X.stroke();X.fillStyle='rgba(220,240,255,.18)';X.beginPath();X.arc(ex,ey,3,0,7);X.fill();X.strokeStyle='rgba(255,255,255,.7)';X.lineWidth=.5;X.beginPath();X.arc(ex,ey,2.4,-2.4,-1.6);X.stroke();X.restore()}
function hCigar(a,b,c){const glow=typeof a=='number'?a:(c||.2);const[mx,my]=HMOUTH,x0=mx+6.4,y0=my+1.6;X.save();X.translate(x0,y0);X.rotate(.18);const C=aRR(0,-.8,6.2,1.6,.6);cel(C,'#6a4224',.6,.5);hStroke(C,.45);X.fillStyle='#e8e0d0';X.fillRect(4.6,-.8,1.6,1.6);X.fillStyle=glow>.5?'#ffcf5a':'#ff7a2a';X.beginPath();X.arc(6.4,0,.7+glow*.3,0,7);X.fill();X.restore();
 X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x0+6.3,y0+1.1,0,x0+6.3,y0+1.1,3+glow*3);g.addColorStop(0,'rgba(255,150,60,'+(.35+glow*.4)+')');g.addColorStop(1,'rgba(255,150,60,0)');X.fillStyle=g;X.fillRect(x0,y0-6,14,14);X.restore()}
function hTorsoFX(K,C,t,gun){
 if(C==0){X.save();X.translate(-4.4,-16.6);const St=new Path2D();for(let k=0;k<10;k++){const a=k/10*6.283-1.571,r=k%2?1.2:2.6;St.lineTo(Math.cos(a)*r,Math.sin(a)*r)}St.closePath();cel(St,'#e0c050',.8,.6,'#9a7a20','#fff6c0');hStroke(St,.6);X.restore();
  const Hs=aRR(-11.2,-2.4,4.6,9.6,1.4);cel(Hs,'#6a3a1c',1,.7);hStroke(Hs,.8);if(!gun){const G=new Path2D();G.moveTo(-10.6,-2.2);G.quadraticCurveTo(-11.6,-6,-9.4,-7.2);G.quadraticCurveTo(-7,-7.4,-6.8,-5.6);G.lineTo(-7.2,-2.2);G.closePath();cel(G,'#8a5a32',.8,.6);hStroke(G,.7);X.fillStyle='#c8ccd2';X.fillRect(-7.4,-4.2,2.2,1.2)}
  X.save();X.translate(9.6,-1.4);for(let k=0;k<3;k++){X.strokeStyle=k%2?'#c8a868':'#a8885a';X.lineWidth=1.3;X.beginPath();X.ellipse(0,k*.4,3.6-k*.5,4.6-k*.4,.2,0,7);X.stroke()}X.strokeStyle=HOL;X.lineWidth=.5;X.beginPath();X.ellipse(0,0,4.3,5.2,.2,0,7);X.stroke();X.restore()}
 else if(C==1){gKnives(6.6,-23,-7.4,-4.6);const Sh=new Path2D();Sh.moveTo(-9,-4.8);Sh.quadraticCurveTo(0,-3.6,10.4,-4.8);Sh.lineTo(10.4,.6);Sh.quadraticCurveTo(0,1.6,-9,.6);Sh.closePath();cel(Sh,'#7a6a4e',1,.7);X.save();X.clip(Sh);X.strokeStyle='rgba(40,26,14,.4)';X.lineWidth=.6;for(let x=-8;x<10;x+=2.4){X.beginPath();X.moveTo(x,-4.6);X.lineTo(x+1.4,.6);X.stroke()}X.restore();hStroke(Sh,.8);
  const Kn=aEll(-8.8,-1.8,1.8,2.2);cel(Kn,'#6a5a40',.8,.6);hStroke(Kn,.6)}
 else if(C==2){const col=HCLS[2].coat;[[-1,-8.8,-5.4],[1,10.6,7]].forEach(([s,a,b])=>{const P=new Path2D();P.moveTo(a,-23.4);P.quadraticCurveTo(a+s*.6,-8,a+s*1.2,12);P.lineTo(b+s*.4,12);P.quadraticCurveTo(b,-6,b-s*.2,-21);P.closePath();cel(P,col,1.6,1,cDk(col,.5),cLt(col,.28));hStroke(P,.9);X.fillStyle='#8a8e96';[-16,-9,-2].forEach(y=>{X.beginPath();X.arc((a+b)/2+s*.2,y,.6,0,7);X.fill()})});
  gBandK(-7,-22.6,8.6,-3.6,3.6,'#4a2414','#b02a1e');X.save();X.translate(-6.6,-1.6);X.rotate(-.3);const Pp=aRR(-2,-6.6,4,9,.3);cel(Pp,'#e8d8b0',.6,.4);X.fillStyle='#b02a2a';X.fillRect(-2,-3,4,1.3);X.fillStyle='rgba(60,40,20,.5)';X.fillRect(-1.2,-5.4,2.4,.5);hStroke(Pp,.5);X.restore()}
 else{const col=HCLS[3].coat;[[-1,-8.8,-4.6],[1,10.6,6.2]].forEach(([s,a,b])=>{const P=new Path2D();P.moveTo(a,-23.4);P.quadraticCurveTo(a+s*.4,-12,a+s*.6,-4);P.lineTo(b+s*.6,-4);P.lineTo(b,-17);P.lineTo(b+s*1.8,-19);P.lineTo(b-s*.4,-23);P.closePath();cel(P,col,1.6,1,cDk(col,.5),cLt(col,.28));hStroke(P,.9)});
  X.save();X.translate(-.6,-24.6);const Bt=new Path2D();Bt.moveTo(0,0);Bt.lineTo(-3.4,-1.8);Bt.lineTo(-3.4,1.8);Bt.closePath();Bt.moveTo(0,0);Bt.lineTo(3.4,-1.8);Bt.lineTo(3.4,1.8);Bt.closePath();cel(Bt,'#b01e2a',.8,.6);hStroke(Bt,.6);X.fillStyle='#7a1018';X.beginPath();X.arc(0,0,1,0,7);X.fill();X.restore();
  X.save();X.translate(-6.4,-18.4);for(let k=0;k<5;k++){X.fillStyle=k%2?'#c8242a':'#e8404a';X.beginPath();X.arc(Math.cos(k*1.26)*1,Math.sin(k*1.26)*1,1.1,0,7);X.fill()}X.fillStyle='#3a7a2a';X.beginPath();X.ellipse(1.4,1.4,1.2,.5,.6,0,7);X.fill();X.restore();
  X.strokeStyle='#e0b850';X.lineWidth=.55;X.beginPath();X.moveTo(1.2,-11);X.quadraticCurveTo(4,-7.6,6.6,-10.4);X.stroke();X.fillStyle='#e0b850';X.beginPath();X.arc(6.8,-10.4,.9,0,7);X.fill()}}
function hDusterTop(K){const col=K.coat,P=new Path2D();P.moveTo(-8.6,-22);P.quadraticCurveTo(-10.6,-12,-9.8,-2.6);P.lineTo(-1.4,-.8);P.quadraticCurveTo(1.6,-8,1,-14);P.lineTo(1,-22);P.closePath();cel(P,col,1.8,1.1,cDk(col,.5),cLt(col,.25));X.save();X.clip(P);X.strokeStyle=cDk(col,.55);X.lineWidth=.8;X.globalAlpha=.8;X.beginPath();X.moveTo(-6,-18);X.quadraticCurveTo(-7.4,-10,-6.4,-2);X.stroke();X.restore();hStroke(P,1.1)}
function hKnife(x,y,a){X.save();X.translate(x,y);X.rotate(a);const Bl=new Path2D();Bl.moveTo(-1,-1.4);Bl.lineTo(9,-.6);Bl.lineTo(11.5,.3);Bl.lineTo(9,1.2);Bl.lineTo(-1,1.4);Bl.closePath();cel(Bl,'#d8dce2',.8,.6,'#8a9098','#ffffff');hStroke(Bl,.5);const H=aRR(-6,-1.3,5,2.6,.8);cel(H,'#4a3424',.6,.4);hStroke(H,.5);X.restore()}
/* ---------- celá postava v3 ---------- */
function heroRig3(q,C,t,bob,lean,FA,fe,h0,h1,fc,lines,bl,wa,W2,wpm,gun,pun,u,air,wf){
 const K=HCLS[C]||HCLS[0],ky=HPEL/40,hang=q.hang||(q==p&&p&&(p.zip||p.rope)),sh=hang?Math.max(0,(q.zip||(p&&(p.zip||p.rope))?92:100)-(HPEL+22.8+2*HAL-2)):0;
 const fl0=q.fl==null?0:q.fl,cl0=q.climb||q.hang||q.cu>0;
 {let sqx=1,sqy=1;if(!q.dead&&!cl0&&!(q.ds>0)){if(q.ld>0){const k=q.ld/12;sqy=1-.1*k;sqx=1+.08*k}else if(air){const k=Math.max(-1,Math.min(1,q.vz/10));sqy=1+.05*k;sqx=1-.04*k}}X.scale(1/sqx,1/sqy)}
 if(sh)X.translate(0,sh);
 if(q===p&&p.rope){const ra=-(p.ra||0)*(q.face||1);X.translate(0,-92-sh);X.rotate(ra);X.translate(0,92+sh)}
 const s=hState(q,bob);hDyn(q,s,C,air);
 const mv=Math.abs(q.vx||0)>.4&&!air&&!q.climb&&!q.hang,still=!mv&&!air&&!pun&&!(q.ak>0)&&!(q.aim>0)&&!q.cr&&!q.climb&&!q.hang&&!(q.ds>0)&&!(q.ht>0)&&!q.dead&&!q.tied&&!(q.td>0)&&!q.sl&&!(q.th>0)&&!(q.sb>0)&&!gun&&!wpm&&!(q.rld>0&&q===p)&&!(q==p&&(carry||p.zip));
 const fv=hFidget3(q,C,s,t,still),fk=hEase(hWin(fv,.05,.3))*(1-hEase(hWin(fv,.75,.98))),fvar=s.fvar||0;
 const vxa=Math.abs(q.vx||0),k=Math.min(1,vxa/3.6),run=k>.72,breath=still?Math.sin(t*.045):0;
 const S_=(3.2+5.4*k+(run?3.2:0))*(C==2?.92:1),st_=run?.4:.56;if(s.fresh)s.u=t*.02;else if(mv)s.u+=vxa*st_/(2*S_)/(run?1.05:1.35)*s.n;
 const legFree=!q.cr&&!(q.ds>0)&&!q.sl&&!q.dead&&!q.tied&&!(q.td>0)&&!(q.cu>0)&&!q.climb&&!hang&&!(q.ak>0)&&!q.ws,
  armFree=legFree&&!pun&&!(q.aim>0)&&!gun&&!wpm&&!(q.th>0)&&!(q.sb>0)&&!(q.ht>0)&&!(q==p&&carry)&&!(q.pk>0);
 const old={FE:fe.map(f=>[f[0]*.85,f[1]*ky]),FA:FA?FA.slice():[0,0],H0:[h0[0]-HOSH[0][0]+HSH[0][0],h0[1]-HOSH[0][1]+HSH[0][1]],H1:[h1[0]-HOSH[1][0]+HSH[1][0],h1[1]-HOSH[1][1]+HSH[1][1]],BOB:bob*ky*1.15,LEAN:lean};
 let tp=old,mode='old';
 if(legFree&&mv){const g=hGait3(s.u,k,run,C,s.acc);tp={AB:armFree?g.AB:[-1,-1],FE:g.FE,FA:g.FA,BOB:g.BOB,H0:armFree?g.H0:old.H0,H1:armFree?g.H1:old.H1,LEAN:armFree?g.LEAN:old.LEAN,TW:g.TW};mode=run?'run':'walk'}
 else if(legFree&&air){const vz=q.vz||0,g=hAir3(vz,t,s.tk);tp={AB:g.AB,FE:g.FE,FA:g.FA,BOB:g.BOB,H0:armFree?g.H0:old.H0,H1:armFree?g.H1:old.H1,LEAN:armFree?g.LEAN:old.LEAN};mode='air'+(s.tk<6&&vz>2?0:vz>2.5?1:vz>-2.5?2:3)}
 else if(legFree&&!mv&&!air){const g=HIDLE[C]||HIDLE[0],ws=Math.sin(t*.0105);tp={AB:armFree?g.AB:[-1,-1],FE:g.FE,FA:[0,0],BOB:g.BOB+breath*.35+Math.abs(ws)*.5,H0:armFree?[g.H0[0],g.H0[1]+breath*.4]:old.H0,H1:armFree?[g.H1[0],g.H1[1]+breath*.4]:old.H1,LEAN:armFree?g.LEAN+ws*.015:old.LEAN,PX:ws*1.1};mode='idle'+(armFree?1:0)}
 const MS=hMel(q,s,C,pun,wpm,gun,air,tp,mode);if(MS.pose){tp=MS.pose;mode=MS.mode}
 if(q===p&&p.sld>0&&!air){tp=HSLIDE;mode='slide'}
 /* skluz při otočce, zabrzdění, dopad */
 if(q===p&&!s.fresh){const vx=q.vx||0;if(legFree&&!air&&!pun&&Math.abs(vx)>.9&&Math.sign(vx)!=q.face&&s.skid<=0&&s.pvxa>2){s.skid=12;for(let i=0;i<2;i++)try{spawnP(q.x+q.face*10,q.y,3,lv&&lv.du||'#b8a080',1.6,5,q.z)}catch(e){}}
  if(s.skid>0){s.skid-=s.n;if(s.skid>3&&T%2==0)try{spawnP(q.x+q.face*12,q.y,1,lv&&lv.du||'#b8a080',1.2,4,q.z)}catch(e){}}
  if(legFree&&!air&&!pun&&s.pvxa>2.6&&s.pvxa-vxa>.3&&vxa<2.7&&Math.sign(vx||q.face)==q.face&&s.skid<=0)s.stopT=0;
  s.pvxa=vxa;s.stopT+=s.n;s.stopW=s.stopT<16?(s.stopT<3?s.stopT/3:1-(s.stopT-3)/13):0}
 if(legFree&&!air){const wl=s.li*(s.lt2<3?1:Math.max(0,1-(s.lt2-3)/13));tp=hLay(tp,HLAND,hEase(Math.min(1,wl))*(mv?.5:1),armFree);
  if(s.skid>0)tp=hLay(tp,HSKID,hEase(Math.min(1,s.skid/7)),armFree);else if(s.stopW>.01&&!mv)tp=hLay(tp,HSTOP,hEase(s.stopW),armFree)}
 let P=tp;if(!s.fresh){if(mode!=s.mode){s.Pp=s.P||tp;s.bl=0;s.mode=mode}if(s.bl<1){s.bl=Math.min(1,s.bl+(mode=='old'?.34:mode.startsWith('air')?.26:.2)*Math.max(1,s.n));P=hMixPose(s.Pp,tp,hEase(s.bl));P.TW=tp.TW;P.PX=(s.Pp.PX||0)+((tp.PX||0)-(s.Pp.PX||0))*hEase(s.bl)}s.P=P}
 /* náklon s pružinou (dotažení a překmit) */
 if(s.fresh||s.d3==null){s.ls=P.LEAN;s.lsv=0}else{const kk=mode=='old'?.5:.24,dd=mode=='old'?.55:.44;for(let i=0;i<s.n;i++){s.lsv+=(P.LEAN-s.ls)*kk-s.lsv*dd;s.ls+=s.lsv}}
 const step=mode=='walk'||mode=='run'?Math.abs(Math.sin(s.u*Math.PI*2)):0;
 if(q===p&&!s.fresh&&s.n>0){if(mode=='run'){const c0=Math.floor((s.u-vxa*st_/(2*S_)/1.05*s.n)*2),c1=Math.floor(s.u*2);if(c1!=c0&&typeof spawnP=='function'&&lv)try{spawnP(p.x-p.face*4,LY,2,lv.du||'#b8a080',1,5,p.z)}catch(e){}}
  if(s.face!=null&&s.face!=q.face)s.turn=1;s.face=q.face;if(s.turn>0)s.turn=Math.max(0,s.turn-.17*s.n)}
 let pun2=pun&&!MS.on&&!q.up&&!q.hv&&!wpm&&q.arm!=1,ex=pun?(u<.25?-.4*u*4:u<.5?-.4+(u-.25)*5.6:1-(u-.5)*2):0;
 const PX=P.PX||0,pel=-HPEL+P.BOB,ff=P.FE,tw=1+(P.TW||0)+(pun2?ex*.06:0),tsy=1+breath*.012+(step?(step-.5)*.024:0)+s.sq*.0,tsx=(1-breath*.006)*tw;
 lean=s.ls+(mode.startsWith('idle')?Math.sin(t*.013)*.02:0)-(gun?s.rc*.12:0);FA=P.FA;
 /* pohled očí */
 if(!s.fresh){let tx=null,ty=0;if(q===p&&typeof ens!='undefined'&&ens){let bd=1e9,be=null;for(const e of ens){if(!e||e.st=='dead'||e.gone||e.dead||e.hid)continue;const dx=e.x-q.x,dz=(e.z||0)-(q.z||0);if(Math.abs(dz)>170)continue;const d=Math.abs(dx)+Math.abs(dz)*.6;if(d<bd&&d<340){bd=d;be=e}}if(be){tx=hCl((be.x-q.x)*q.face/70,-1,1);ty=hCl(-((be.z||0)+64-((q.z||0)+72))/60,-1,1)}}
  if(tx==null){if(mode=='walk'||mode=='run'){tx=.75;ty=.12}else if(air){tx=.5;ty=(q.vz||0)>2?-.55:(q.vz||0)<-4?.75:0}else if(q.climb||hang){tx=.1;ty=-.85}else{tx=s.slx;ty=s.sly}}
  if(pun||q.ak>0||gun||q.th>0){tx=.95;ty=gun?-.05:.1}
  s.lkx+=(tx-s.lkx)*Math.min(1,.45*s.n);s.lky+=(ty-s.lky)*Math.min(1,.45*s.n)}else{s.lkx=.45;s.lky=-.2}
 /* hlava */
 let hr=Math.sin(t*.021)*.018+s.lky*.05,hx=0,hy=breath*.25;
 if(mode=='walk'||mode=='run'){hr+=Math.sin(s.u*Math.PI*4+.7)*.035+lean*.3;hy+=Math.cos(s.u*Math.PI*4+.6)*(run?.7:.45)-(P.BOB-1)*.12}
 if(air)hr+=q.vz>2?-.08:q.vz<-3?.08:0;if(pun)hr+=.16*Math.sin(Math.min(1,u*1.4)*Math.PI);if(q.ht>0)hr-=.28*Math.min(1,q.ht/14);if(q.climb)hr-=.12;if(q.cr)hr+=.08;if(q.dead)hr+=.25;if(gun)hr-=s.rc*.12;
 if(s.lt2<16&&legFree&&!air)hr+=.1*s.li*Math.sin(Math.min(1,s.lt2/16)*Math.PI);
 let jt=0;if(pun&&u>.1&&u<.7)jt=q.hv||q.up?2.4:1.5;if(q.ht>0)jt=2.6;if(q.dead)jt=2;if(air&&q.vz>5)jt=.6;if(air&&q.vz<-9)jt=1.8;if(q.ak>0)jt=2;if(gun&&q.aim>16)jt=.4;if(s.skid>0)jt=1.2;
 /* fidgety */const fcr=v=>(s.lfv||0)<v&&fv>=v;let hatLift=0,hatTip=0,cigGlow=.2,h1o=null,h0o=null,caneSpin=0,fGun=null,fKnife=null,squint=0,lookO=null,ring=0;
 if(fk>0||fv>0){
  if(C==0&&fvar==0&&fk>0){h1o=[HBRIM[0]+12.5,HBRIM[1]+.5];hatLift=2.2*hEase(hWin(fv,.3,.45))*(1-hEase(hWin(fv,.6,.75)));hatTip=-.32*hatLift/2.2;hr+=.05*fk}
  else if(C==0&&fvar==1){/* točení revolverem */const HO=[-8.6,-5.4],OUT=[10.5,-12.5],a=hEase(hWin(fv,.04,.17)),b=hEase(hWin(fv,.2,.32)),c=hEase(hWin(fv,.8,.92)),rel=1-hEase(hWin(fv,.92,1));
   const pt=fv<.2?HO:fv<.8?[HO[0]+(OUT[0]-HO[0])*b,HO[1]+(OUT[1]-HO[1])*b+Math.sin(b*Math.PI)*-4]:[OUT[0]+(HO[0]-OUT[0])*c,OUT[1]+(HO[1]-OUT[1])*c];
   h1o=pt;s.fkw=fv<.2?a:rel;if(fv>.18&&fv<.92){const sp=hWin(fv,.34,.78);fGun=fv<.34?1.5*(1-b):fv<.78?-hEase(sp)*Math.PI*6:-Math.PI*6+1.5*c}lookO=[.55,.45]}
  else if(C==1&&fvar==0&&fk>0){hr+=Math.sin(fv*Math.PI*4)*.14*fk;squint=.5*fk;h1o=[1,-15];h0o=[-2,-14];lookO=[Math.sin(fv*Math.PI*4)>0?.9:-.7,0]}
  else if(C==1&&fvar==1&&fk>0){/* vyhození nože */h1o=[8,-11];h0o=[1,-13];const v=hWin(fv,.28,.66);fKnife=v>0&&v<1?{y:-36*Math.sin(Math.PI*v),a:v*Math.PI*6}:{y:0,a:0};lookO=[.6,v>0&&v<1?-.2-.7*Math.sin(Math.PI*v):.3]}
  else if(C==2&&fvar==0&&fk>0){const inh=hWin(fv,.2,.45)*(1-hWin(fv,.45,.55));h1o=[HMOUTH[0]+9,HMOUTH[1]+2];if(fv>.5)h1o=[HMOUTH[0]+16,HMOUTH[1]+12];cigGlow=.2+.8*inh;squint=.6*inh;if(fv>.58&&s.ring!=1){s.ring=1;ring=1}if(fv<.5)s.ring=0}
  else if(C==2&&fvar==1&&fk>0){/* klobouk do očí, ruce zkřížené */h1o=[-1,-11];h0o=[5,-12.5];hatLift=-1.6*fk;hatTip=.12*fk;squint=.85*fk;hr+=.06*fk}
  else if(C==3&&fvar==0&&fk>0){h0o=[HSH[0][0]+9,HSH[0][1]+10];caneSpin=hWin(fv,.3,.85)}
  else if(C==3&&fvar==1&&fk>0){h1o=[HEYE[1][0]+3,HEYE[1][1]+3];squint=.3*fk}
  else if(C==0&&fvar==2&&fk>0){/* triky s kapesním nožem */h1o=[11,-15];h0o=[3,-19];MS.inHand=true;s.kf=hCl(Math.min(hWin(fv,.06,.14),1-hWin(fv,.86,.94)),0,1);const sp=hEase(hWin(fv,.2,.72)),tv=hWin(fv,.4,.6);MS.WA=-.4-sp*HP2*3;MS.WY=tv>0&&tv<1?-22*Math.sin(Math.PI*tv):0;lookO=[.5,MS.WY<-2?-.4:.35];if(fcr(.07)||fcr(.87))sfx('flick')}
  else if(C==1&&fvar==2&&fk>0){/* praskání kloubů a pozdrav */const j=fv>.22&&fv<.5?Math.max(0,Math.sin((fv-.22)/.1*Math.PI*2))*2:0;h1o=[9+j,-20];h0o=[7,-21];const bw=hEase(hWin(fv,.58,.68))*(1-hEase(hWin(fv,.82,.92)));lean+=.32*bw;hr+=.12*bw;squint=Math.max(squint,.7*bw);if(fcr(.25)||fcr(.35)||fcr(.45))sfx('crack')}
  else if(C==2&&fvar==2&&fk>0){/* broušení tesáku */MS.inHand=true;MS.WA=-.25;h1o=[11,-17];const ph=hWin(fv,.18,.82)*3,f=ph%1,d=5+13*f;h0o=[11+Math.cos(-.25)*d,-19.5+Math.sin(-.25)*d];lookO=[.55,.45];if(fv>.18&&fv<.82&&Math.floor(ph)!=Math.floor(s.sph||0))sfx('scrape');s.sph=ph;if(f>.82&&fv<.82&&T%2==0)MS.spark=1}
  else if(C==3&&fvar==2&&fk>0){/* gentlemanská poklona */h1o=[HBRIM[0]+12.5,HBRIM[1]+.5];h0o=[-8,-10];const bw=hEase(hWin(fv,.3,.42))*(1-hEase(hWin(fv,.68,.8)));hatLift=4*bw;hatTip=-.3*bw;lean+=.3*bw;hr+=.1*bw}
  s.lfv=fv}
 if(s.fresh)s.hy=Math.max(0,Math.sin(t*.05))*.15;
 s.jaw+=(jt-s.jaw)*(s.fresh?1:.35);
 /* mimika */
 const o={dead:q.dead,hurt:q.ht>0&&!q.dead,angry:pun||q.ak>0||q.td>0||q.sl||q.th>0||q.sb>0||q.aim>0||q.pk>0||q.ds>0,focus:run||q.cr||q.climb||hang,up:air&&(q.vz||0)>3.5,fall:air&&(q.vz||0)<-8,sleepy:s.idleT>1500,squint};
 if(lookO&&!s.fresh){s.lkx+=(lookO[0]-s.lkx)*.3;s.lky+=(lookO[1]-s.lky)*.3}
 const TF=hFaceT(s,C,o);if(!s.F||s.fresh)s.F=TF;else{const F=s.F,a=Math.min(1,.4*s.n);for(const kk of['lx','ly','arch','wide','pu'])F[kk]+=(TF[kk]-F[kk])*a;for(const kk of['lu','ld','bi','bo'])for(let i=0;i<2;i++)F[kk][i]+=(TF[kk][i]-F[kk][i])*a;F.lt+=(TF.lt-F.lt)*a;F.sq=TF.sq;F.x=TF.x;F.lx=s.lkx;F.ly=s.lky}
 const FD=Object.assign({},s.F,{lu:s.F.lu.slice()});if(s.bk>0&&!FD.sq&&!FD.x){const b=s.bk/9,c=b>.75?(1-b)/.25:b>.5?1:b/.5;FD.lu=FD.lu.map(x=>x+(1-x)*c)}
 /* matice: trup → kořen, hlava → kořen */
 const cL=Math.cos(lean),sL=Math.sin(lean),t2r=(x,y)=>[PX+cL*x-sL*y,pel+sL*x+cL*y];
 const nyy=HNECK[1]*(tsy-1),hdx=HNECK[0]+hx,hdy=HNECK[1]+hy+nyy,cH=Math.cos(hr),sH=Math.sin(hr),h2r=(x,y)=>{const dx=x-HNECK[0],dy=y-HNECK[1];return t2r(hdx+cH*dx-sH*dy,hdy+sH*dx+cH*dy)};
 const rot=hRot(q,C),gl=rot?1e9:Math.max(0,(q.z||0)-fl0)-.4;
 hClothUpd(q,s,C,t,t2r,h2r,lean,pel,gl);
 /* kouř doutníku (svět) */
 if(C==2&&!s.fresh&&s.n){const tip=h2r(HMOUTH[0]+12.6,HMOUTH[1]+2.6),vl=s.vwx*(q.face||1),vy=-s.vwz;if(T%6==0&&!q.dead)s.smk.push({x:tip[0],y:tip[1],vx:.05,vy:-.32,r:.8,a:.32,l:0,L:90});if(ring)s.smk.push({x:tip[0]+3,y:tip[1]-1,vx:.35,vy:-.18,r:1.2,a:.7,l:0,L:110,ring:1});
  for(const m of s.smk){m.x+=(m.vx-vl)*s.n;m.y+=(m.vy-vy)*s.n;m.vx*=.985;m.vy*=.99;m.r+=m.ring?.06:.05;m.l+=s.n}s.smk=s.smk.filter(m=>m.l<m.L);if(s.smk.length>30)s.smk.splice(0,s.smk.length-30)}
 /* klobouk při smrti odletí */
 if(q.dead&&K.hat!='hood'&&!s.fresh){if(!s.hatF){const b=h2r(HBRIM[0],HBRIM[1]-1),cr=Math.cos(rot),sr=Math.sin(rot);s.hatF={x:cr*b[0]-sr*b[1],y:sr*b[0]+cr*b[1],vx:-1.2,vy:-4.4,r:hr+rot,vr:-.2}}
  const h=s.hatF;for(let i=0;i<s.n;i++){h.vy+=.32;h.x+=h.vx;h.y+=h.vy;h.r+=h.vr;const gy=Math.max(0,(q.z||0)-fl0)-2.2;if(h.y>gy){h.y=gy;h.vy*=-.32;h.vx*=.55;h.vr*=.45;if(Math.abs(h.vy)<.6){h.vy=0;h.r+=(-.18-h.r)*.3}}}}else s.hatF=null;
 const tor=f=>{X.save();X.translate(PX,pel);X.rotate(lean);try{f()}finally{X.restore()}};
 const mix=(a,b,k)=>[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k];
 let H0=P.H0.slice(),H1=P.H1.slice();const fw1=C==0&&fvar==1&&fv>0?(s.fkw||0):fk;if(h1o)H1=mix(H1,h1o,fw1);if(h0o)H0=mix(H0,h0o,fk);
 if(C==3&&caneSpin>0)H0=[H0[0]+Math.sin(caneSpin*Math.PI*2)*2.5,H0[1]-Math.sin(caneSpin*Math.PI)*3];
 /* úder: protipohyb zadní ruky, natažení paže */
 let al=HAL,al0=HAL;if(MS.on&&C==1){const kk2=hCl(1-Math.abs(MS.u-MS.hitU)/.16,0,1)*.15;if(MS.hand==0||MS.kind=='h')al0=HAL*(1+kk2);if(MS.hand==1)al=HAL*(1+kk2)}if(pun2){if(ex>.3)H0=mix(H0,[-5,-12],hCl((ex-.3)/.4,0,1));if(u>.28&&u<.55)al=HAL*(1+.16*Math.sin((u-.28)/.27*Math.PI))}
 if(gun){H1=[H1[0]-s.rc*5,H1[1]-s.rc*4.5];if(C==2&&gun=='shotgun'&&q.aim>12&&q.aim<27){const v=(27-q.aim)/15;H0=[H0[0]-6*Math.sin(v*Math.PI),H0[1]+1]}}
 X.save();
 if(s.turn>0){const v=1-s.turn,sx=-Math.cos(Math.PI*v);X.scale(Math.abs(sx)<.12?(sx<0?-.12:.12):sx,1)}
 X.scale(1-s.sq*.55,1+s.sq);
 /* 1) zadní vrstvy: látky, prachovka, kápě */
 hDrawCloth(s,false);
 tor(()=>{if(C==2){hDusterTop(K);hSheath(!MS.inHand&&!(q===p&&p.cbrk))}if(K.hat=='hood'){X.save();X.translate(HNECK[0]+hx,HNECK[1]+hy);X.rotate(hr);X.translate(-HNECK[0],-HNECK[1]);hHoodBack(K,s);X.restore()}});
 /* kopnutí: smear chodidla */
 if(q.ak>0&&C!=1){const f1=ff[1];s.ktr.push([PX+f1[0],f1[1]-4]);if(s.ktr.length>6)s.ktr.shift();hSmear(s.ktr,4,'rgba(80,90,110,.8)')}else s.ktr.length=0;
 /* 2) nohy */ff.forEach((f,i)=>{const ba=q.ak>0&&i==1?-.4:(FA?FA[i]:0);hLegA(i,C,PX-3.6+i*7.2,pel,f,ba,K)});
 let A0,A1,F;
 tor(()=>{/* 3) zadní paže */A0=hArmA(HSH[0][0],HSH[0][1],H0,1,K,(P.AB||[-1,-1])[0],al0);hFistA(A0[0],A0[1],A0[2],1,K);
  if(C==3&&!MS.inHand&&!(q===p&&p.cbrk)){X.save();X.translate(A0[0],A0[1]);X.rotate(caneSpin*Math.PI*2);X.strokeStyle='#1e181c';X.lineWidth=2.4;X.beginPath();X.moveTo(-1,0);X.lineTo(1.5,Math.max(8,-pel-A0[1]-.4));X.stroke();X.strokeStyle='rgba(255,255,255,.3)';X.lineWidth=.7;X.beginPath();X.moveTo(-.4,3);X.lineTo(1.2,Math.max(6,-pel-A0[1]-2.4));X.stroke();const Kb=aEll(0,-2.4,2.6,2.4);cel(Kb,'#d9b25a',.8,.6,'#8a6a2a','#fff0b0');X.restore();
   if(caneSpin>0&&caneSpin<1){X.save();X.globalAlpha*=.35*Math.sin(caneSpin*Math.PI);X.strokeStyle='#fff';X.lineWidth=1.2;X.beginPath();X.arc(A0[0],A0[1],18,caneSpin*12.6-1.2,caneSpin*12.6);X.stroke();X.restore()}}
  /* 4) hlava */X.save();X.translate(HNECK[0]+hx,HNECK[1]+hy+nyy);X.rotate(hr);X.translate(-HNECK[0],-HNECK[1]);
   hAt('head');X.save();X.translate(0,s.jaw);hAt('jaw');X.restore();hFace(FD);
   if(C==1)hMask(K);if(C==3){hMust();hMonocle()}if(C==2)hCigar(cigGlow);
   if(K.hat!='hood'&&!s.hatF){const hs={hy:s.hy+hatLift,hr:s.hr+hatTip};hHat(K,C,hs,t)}
   X.restore();
  /* 5) trup */X.save();X.translate(HNECK[0],0);X.scale(tsx,tsy);X.translate(-HNECK[0],0);hAt('tor'+C);hTorsoFX(K,C,t,gun||fGun!=null);X.restore();
  if(K.hat=='hood'){X.save();X.translate(HNECK[0]+hx,HNECK[1]+hy+nyy);X.rotate(hr);X.translate(-HNECK[0],-HNECK[1]);hHoodFront(K,s);X.restore()}});
 hDrawCloth(s,true);
 tor(()=>{/* 6) přední paže, zbraň, smear, pěst */
  const ab1=(P.AB||[-1,-1])[1];F=ik(HSH[1][0],HSH[1][1],H1[0],H1[1],HAL,HAL,ab1);
  if(gun){const ga=-s.rc*.9,gx=F[2]+2,gy=F[3];wp(gun,gx,gy,ga,t);if(s.mf<3){const L=gun=='shotgun'?44:gun=='pistol'?30:36,c=Math.cos(ga),sn=Math.sin(ga);hMuzzle(gx+c*L+sn*1.5,gy+sn*L-c*1.5,ga,gun=='shotgun'?8:6)}}
  else if(wpm)wp(W2,F[2]+2,F[3],wa,t);
  if(fGun!=null){X.save();X.translate(F[2],F[3]);X.rotate(fGun);wp('pistol',-6,-2,0,t);X.restore();if(fv>.34&&fv<.78){X.save();X.globalAlpha*=.3;X.strokeStyle='#fff';X.lineWidth=1;X.beginPath();X.arc(F[2],F[3],14,fGun-1.4,fGun);X.stroke();X.restore()}}
  /* smear: stopa zbraně / pěsti */
  const atk=(MS.on&&MS.u>MS.hitU-.2&&MS.u<MS.hitU+.15)||(pun&&wpm)||q.td>0;if(atk&&!s.fresh){let tx,ty;
   if(MS.on&&MS.hand==0&&A0){tx=A0[0];ty=A0[1]}else{const kk=ik(HSH[1][0],HSH[1][1],H1[0],H1[1],al,al,ab1);tx=kk[2];ty=kk[3];const wl=MS.on?(C==0?HWLEN[0]*s.kf:HWLEN[C]):wpm?26:0,wa2=MS.on&&MS.WA!=null?MS.WA:wa;if(wl){tx+=Math.cos(wa2)*wl;ty+=Math.sin(wa2)*wl}}
   s.ftr.push([tx,ty]);if(s.ftr.length>6)s.ftr.shift();const sw=C==2?5.4:C==3?2.6:C==0?2.8:4.6,sc=C==0||C==2?'rgba(214,222,232,.95)':C==3?'rgba(60,44,52,.8)':'rgba(79,174,60,.9)';hSmear(s.ftr,MS.on?sw:3.2,MS.on?sc:'rgba(79,174,60,.9)')}else s.ftr.length=0;
  A1=hArmA(HSH[1][0],HSH[1][1],H1,0,K,ab1,al);
  if((C==0?s.kf>0:MS.inHand)&&!gun&&!wpm&&fGun==null&&!(q===p&&p.cbrk)){const wa2=MS.WA!=null?MS.WA:A1[2]+HWOFF[C];hWpn(C,A1[0],A1[1]+(MS.WY||0),wa2,C==0?s.kf:1);if(s.lwa!=null&&Math.abs(wa2-s.lwa)>.38&&(MS.on||MS.WY!=null)){const L=HWLEN[C]*(C==0?1.25:1),d=hCl(wa2-s.lwa,-2.6,2.6);X.save();X.globalAlpha*=.38;X.strokeStyle='#f4f6ff';X.lineWidth=C==2?3:1.6;X.lineCap='round';X.beginPath();X.arc(A1[0],A1[1]+(MS.WY||0),L*.92,d>0?wa2-d:wa2,d>0?wa2:wa2-d);X.stroke();X.restore()}s.lwa=wa2;
   if(MS.spark){const L=HWLEN[2];X.save();X.globalCompositeOperation='lighter';X.fillStyle='#ffd27a';for(let k2=0;k2<4;k2++){X.beginPath();X.arc(A1[0]+Math.cos(wa2)*L+Math.random()*4,A1[1]+Math.sin(wa2)*L-Math.random()*4,.6,0,7);X.fill()}X.restore()}}
  if(C==1&&q.pk>0){const a=A1[2];X.save();X.translate(A1[0],A1[1]);X.rotate(a);const Bl=new Path2D();Bl.moveTo(2,-1.6);Bl.lineTo(18,-.6);Bl.lineTo(21,.4);Bl.lineTo(18,1.4);Bl.lineTo(2,1.6);Bl.closePath();cel(Bl,'#d8dce2',.8,.6,'#8a9098','#ffffff');X.strokeStyle='rgba(255,255,255,.8)';X.lineWidth=.5;X.beginPath();X.moveTo(4,-.4);X.lineTo(18,-.1);X.stroke();X.restore()}
  hFistA(A1[0],A1[1],A1[2],0,K);
  if(fKnife){if(fKnife.y<-.5)hKnife(A1[0]+1,A1[1]+fKnife.y-2,fKnife.a-1.2);else hKnife(A1[0]+1,A1[1]-1.5,-1.4)}
  if(C==3&&fk>0&&fvar==1){const[ex2,ey2]=HEYE[1];X.save();X.translate(HNECK[0]+hx,HNECK[1]+hy+nyy);X.rotate(hr);X.translate(-HNECK[0],-HNECK[1]);X.strokeStyle='rgba(255,255,255,.7)';X.lineWidth=.6;X.beginPath();X.arc(ex2,ey2,4.4,t*.3,t*.3+2);X.stroke();X.restore()}
  if(MS.on&&Math.abs(MS.u-MS.hitU)<.07&&s.ftr.length){const e2=s.ftr[s.ftr.length-1];hStar(e2[0],e2[1],(C==2?8.5:6.5)*(1-Math.abs(MS.u-MS.hitU)/.07),.9)}
  if(lines==2&&(u<.7||q.ak>0)&&!s.ftr.length){X.strokeStyle='rgba(230,235,255,.7)';X.lineWidth=3;X.beginPath();X.arc(6,-28,30,-2.2,1);X.stroke()}
  if(lines==3&&!s.ftr.length){X.strokeStyle='rgba(230,235,255,.7)';X.lineWidth=3;X.beginPath();X.arc(6,-22,26,.6,-1.5,true);X.stroke()}
  if(q.tied){[['#8a6a3a',4.5],['#c8a060',2.5]].forEach(([c2,w2])=>{X.strokeStyle=c2;X.lineWidth=w2;[-18,-6].forEach(y=>{X.beginPath();X.ellipse(1,y,13,4,0,0,7);X.stroke()})})}});
 X.restore();
 /* svět: kouř a odlétající klobouk (bez otočky a squashe) */
 if(s.smk.length){X.save();for(const m of s.smk){const a=m.a*(1-m.l/m.L);if(m.ring){X.strokeStyle='rgba(225,225,230,'+a+')';X.lineWidth=.9;X.beginPath();X.ellipse(m.x,m.y,m.r*1.3,m.r*.8,-.2,0,7);X.stroke()}else{X.fillStyle='rgba(205,205,212,'+a+')';X.beginPath();X.arc(m.x,m.y,m.r,0,7);X.fill()}}X.restore()}
 if(s.hatF){X.save();X.rotate(-rot);X.translate(s.hatF.x,s.hatF.y);X.rotate(s.hatF.r);X.translate(-HBRIM[0],-HBRIM[1]);hHat(K,C,{hy:0,hr:0},t);X.restore()}}
/* ---------- hráč přes offscreen: bílý záblesk zásahu a afterimage ---------- */
const HOC={c:null,g:null,w:0,h:0,gh:[],pool:[],lt:-1};
function heroRigOC(q,...A){if(q!==p||!X.getTransform)return heroRig3(q,...A);
 const M=X.getTransform(),sc=Math.hypot(M.a,M.b);if(sc>2.6||sc<.25)return heroRig3(q,...A);
 const W=Math.ceil(320*sc),H=Math.ceil(300*sc),ox=Math.round(160*sc),oy=Math.round(235*sc);
 /* afterimage: stárnutí a kreslení za postavou */
 const dt=T-HOC.lt;HOC.lt=T;if(dt>0)for(const gh of HOC.gh)gh.a-=.11*Math.min(3,dt);
 HOC.gh=HOC.gh.filter(gh=>{if(gh.a>0&&gh.w==W)return true;HOC.pool.push(gh.c);return false});
 if(HOC.gh.length){X.save();X.setTransform(1,0,0,1,0,0);const ga=X.globalAlpha;for(const gh of HOC.gh){X.globalAlpha=ga*Math.max(0,gh.a);X.drawImage(gh.c,M.e-ox+(gh.x-q.x)*sc,M.f-oy-(gh.z-q.z)*sc)}X.restore()}
 const fl=q.ht>0&&!q.dead?Math.min(1,Math.max(0,(q.ht-19)/5)):0,fast=q.ds>0||q.sl||(q.pt>0&&q.hv)||q.ak>0||q.td>0||(q.vz<-11&&!q.on)||q.zip,cap=fast&&dt>0&&T%2==0&&HOC.gh.length<5;
 if(!fl&&!cap)return heroRig3(q,...A);
 if(!HOC.c||HOC.w!=W||HOC.h!=H){HOC.c=document.createElement('canvas');HOC.c.width=W;HOC.c.height=H;HOC.g=HOC.c.getContext('2d');HOC.w=W;HOC.h=H;HOC.pool=[];HOC.gh=[]}
 const g=HOC.g;g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.clearRect(0,0,W,H);g.setTransform(M.a,M.b,M.c,M.d,ox,oy);g.lineJoin='round';g.lineCap='round';
 const X0=X;X=g;try{heroRig3(q,...A)}finally{X=X0}
 if(cap){const c=HOC.pool.pop()||document.createElement('canvas');c.width=W;c.height=H;const gg=c.getContext('2d');gg.drawImage(HOC.c,0,0);gg.globalCompositeOperation='source-atop';gg.fillStyle=(q.cls==null?SV.cls:q.cls)==1?'rgba(70,40,110,.6)':'rgba(170,215,255,.55)';gg.fillRect(0,0,W,H);HOC.gh.push({c,x:q.x,z:q.z,a:.6,w:W})}
 if(fl>0){g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(255,252,240,'+(fl*.9)+')';g.fillRect(0,0,W,H);g.restore()}
 X.save();X.setTransform(1,0,0,1,0,0);X.drawImage(HOC.c,M.e-ox,M.f-oy);X.restore()}
const heroRig2=heroRig;heroRig=heroRigOC;
