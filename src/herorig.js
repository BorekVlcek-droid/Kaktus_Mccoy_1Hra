/* ===== W29: HRDINA Z ASSETU v2 – loutka z dílů, sekundární pohyb, mimika, vlastní vzhled tříd ===== */
const HAS={ok:0,img:{}};
(function(){const ks=Object.keys(HAD);if(!ks.length)return;let left=ks.length;
 ks.forEach(k=>{const im=new Image();im.onload=()=>{if(--left==0){HAS.ok=1;try{hasPrep()}catch(e){HAS.ok=0}}};im.src=HAD[k].u;HAS.img[k]=im})})();
/* zdroj: 900×1335 px; zem y=1265, osa x=478, spodek opasku y=941 */
const HK=98/1235,HCX=478,HGY=1265,HPY=941,HPEL=(HGY-HPY)*HK,HOL='#1c1612';
const hu=(x,y)=>[(x-HCX)*HK,(y-HPY)*HK];/* zdroj → jednotky trupu (počátek = pánev) */
const HSH=[[-4.8,-22.8],[6.6,-22.8]],HOSH=[[-2,-27],[4,-27]],HAL=15;
const HNECK=hu(470,592),HBRIM=hu(460,250),HEYE=[hu(460,322),hu(522,310)],HMOUTH=hu(471,415);
const HBOOT=[{k:'bootL',ax:332,ay:1131,an:(1270-1131)*HK},{k:'bootR',ax:620,ay:1121,an:(1275-1121)*HK}];
const HFIST={ax:735,ay:470,s:.66};
/* vzhled tříd: barvy, pokrývka hlavy, kabát, rukávy, rukavice */
const HCLS=[
 {cape:'#b8302a',jeans:'#3c414e',fist:'fist0',hat:'hat0',back:'cape'},
 {cape:'#4e4438',jeans:'#3e3a34',fist:'fist0',hat:'hood',back:'cloak',hood:'#4e4438',mask:'#7a6a52',wrap:'#d2c8b0'},
 {cape:'#26242a',jeans:'#2a2a30',fist:'fist2',hat:'wide',back:'duster',coat:'#2c2c34',sleeve:'#2c2c34'},
 {cape:'#4a1e30',jeans:'#40404c',fist:'fist3',hat:'top',back:'tails',coat:'#5a2236',sleeve:'#5a2236',cuff:'#f2eee4'}];
function hasPrep(){/* tmavší kopie pro vzdálenější končetiny */Object.keys(HAD).forEach(k=>{if(!/^fist|^bootL/.test(k))return;const im=HAS.img[k],c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(10,20,30,.22)';g.fillRect(0,0,c.width,c.height);HAS.img[k+'D']=c})}
function hPiece(name,ax,ay,sc){const d=HAD[name.replace(/D$/,'')],im=HAS.img[name];if(!d||!im)return;sc=sc||1;X.drawImage(im,(d.ox-ax)*HK*sc,(d.oy-ay)*HK*sc,d.w*HK*sc,d.h*HK*sc)}
function hAt(name){const d=HAD[name],im=HAS.img[name];if(!d||!im)return;X.drawImage(im,(d.ox-HCX)*HK,(d.oy-HPY)*HK,d.w*HK,d.h*HK)}
function hStroke(P,w){X.save();X.strokeStyle=HOL;X.lineWidth=w||1.1;X.lineJoin='round';X.stroke(P);X.restore()}
function hSpike(x,y,dx,dy,len,bw){const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const nx=-dy,ny=dx,P=new Path2D();P.moveTo(x+nx*bw,y+ny*bw);P.lineTo(x+dx*len,y+dy*len);P.lineTo(x-nx*bw,y-ny*bw);P.closePath();
 X.fillStyle='#f2eedc';X.fill(P);X.save();X.clip(P);X.fillStyle='#c9bfa4';X.beginPath();X.moveTo(x,y);X.lineTo(x+dx*len,y+dy*len);X.lineTo(x-nx*bw*1.2,y-ny*bw*1.2);X.closePath();X.fill();X.restore();X.strokeStyle=HOL;X.lineWidth=.7;X.stroke(P)}
/* ---------- stav sekundárního pohybu (klobouk na pružině, čelist, víčka, plášť, nuda) ---------- */
const HST=new WeakMap();
function hState(q,bob){let s=HST.get(q);const yb=(q.z||0)-bob*.65,xb=q.x||0;
 if(!s){s={n:0,ph:0,mode:'',bl:1,P:null,Pp:null,hy:0,hv:0,hr:0,hrv:0,lyb:yb,lvb:0,lxb:xb,lvx:0,lt:T,jaw:0,lid:0,ca:0,cav:0,idle:0,fid:0,fv:0,lht:0,fresh:1};HST.set(q,s);return s}
 s.fresh=0;const n=Math.min(3,Math.max(0,T-s.lt));s.lt=T;s.n=n;
 for(let i=0;i<n;i++){const vb=(yb-s.lyb)/n,ab=vb-s.lvb,vx=(xb-s.lxb)/n,ax=vx-s.lvx;s.lvb=vb;s.lvx=vx;
  s.hv+=-ab*.55;s.hrv+=-ax*.03*(q.face||1);
  if((q.ht||0)>0&&s.lht<=0){s.hv+=2.4;s.hrv+=.16}
  s.hv+=-.16*s.hy-.15*s.hv;s.hy+=s.hv;if(s.hy<-.55){s.hy=-.55;s.hv=Math.abs(s.hv)*.4}if(s.hy>6){s.hy=6;s.hv=0}
  s.hrv+=-.12*s.hr-.13*s.hrv;s.hr=Math.max(-.6,Math.min(.6,s.hr+s.hrv));
  const tca=Math.max(-.9,Math.min(1.2,-Math.abs(vx)*.16+vb*.2));s.cav+=(tca-s.ca)*.08-.18*s.cav;s.ca+=s.cav}
 s.lyb=yb;s.lxb=xb;s.lht=q.ht||0;return s}
/* ---------- kaktusová paže (volitelně rukáv, manžeta, obvazy) ---------- */
function hArmA(x0,y0,h,back,K,bd){const k=ik(x0,y0,h[0],h[1],HAL,HAL,bd||-1),jx=k[0],jy=k[1],ex=k[2],ey=k[3],an=Math.atan2(ey-jy,ex-jx),col=back?'#3f9232':'#4fae3c';
 const L=aLimb(x0,y0,jx,jy,ex,ey,[5.2,4.8,4.3,4.1,3.9],[5.1,4.7,4.2,4,3.8],0);
 if(!K.sleeve){hSpike(x0+(jx-x0)*.5+L.n1x*4.2,y0+(jy-y0)*.5+L.n1y*4.2,L.n1x-L.d1x*.35,L.n1y-L.d1y*.35,4.8,1.4)}
 hSpike(jx+(ex-jx)*.55-L.n2x*3.8,jy+(ey-jy)*.55-L.n2y*3.8,-L.n2x-L.d2x*.3,-L.n2y-L.d2y*.3,4.2,1.25);
 cel(L.P,col,1.6,1.1,cDk(col,.36),cLt(col,.35));
 X.save();X.clip(L.P);X.lineCap='round';X.strokeStyle=cDk(col,.42);X.lineWidth=.8;X.globalAlpha=.75;X.beginPath();X.moveTo(x0+L.n1x*.6,y0+L.n1y*.6);X.lineTo(jx+L.mx*.6,jy+L.my*.6);X.lineTo(ex+L.n2x*.6,ey+L.n2y*.6);X.stroke();
  X.strokeStyle=cLt(col,.5);X.lineWidth=.8;X.globalAlpha=.6;X.beginPath();X.moveTo(x0-L.n1x*2.3,y0-L.n1y*2.3);X.lineTo(jx-L.mx*2.2,jy-L.my*2.2);X.lineTo(ex-L.n2x*2,ey-L.n2y*2);X.stroke();X.globalAlpha=1;
  if(K.wrap){/* obvazy na předloktí */X.strokeStyle=back?cDk(K.wrap,.2):K.wrap;X.lineWidth=1.5;for(let v=.38;v<.95;v+=.13){const px=jx+(ex-jx)*v,py=jy+(ey-jy)*v;X.beginPath();X.moveTo(px+L.n2x*5,py+L.n2y*5);X.lineTo(px-L.n2x*5+L.d2x*1.6,py-L.n2y*5+L.d2y*1.6);X.stroke()}X.strokeStyle='rgba(60,40,20,.4)';X.lineWidth=.5;for(let v=.38;v<.95;v+=.13){const px=jx+(ex-jx)*v,py=jy+(ey-jy)*v;X.beginPath();X.moveTo(px+L.n2x*5+L.d2x*.7,py+L.n2y*5+L.d2y*.7);X.lineTo(px-L.n2x*5+L.d2x*2.3,py-L.n2y*5+L.d2y*2.3);X.stroke()}}
 X.restore();hStroke(L.P,1.2);
 if(K.sleeve){/* rukáv kabátu přes nadloktí a loket */const sc=back?cDk(K.sleeve,.18):K.sleeve,S=aLimb(x0,y0,jx,jy,jx+(ex-jx)*.42,jy+(ey-jy)*.42,[5.7,5.2,4.8,4.7,4.8],[5.6,5.1,4.7,4.6,4.7],0);cel(S.P,sc,1.6,1.1,cDk(sc,.45),cLt(sc,.3));X.save();X.clip(S.P);X.strokeStyle=cDk(sc,.5);X.lineWidth=.7;X.globalAlpha=.7;const s2=S.tu>0?1:-1;for(let q=0;q<2;q++){const ox=jx+S.mx*s2*(2+q*1.5),oy=jy+S.my*s2*(2+q*1.5);X.beginPath();X.moveTo(ox-S.d1x*2,oy-S.d1y*2);X.quadraticCurveTo(ox+S.mx*s2,oy+S.my*s2,ox+S.d2x*2,oy+S.d2y*2);X.stroke()}X.restore();hStroke(S.P,1.1);
  const cx=jx+(ex-jx)*.42,cy=jy+(ey-jy)*.42;X.save();X.translate(cx,cy);X.rotate(an);const Cf=aRR(-1.8,-5.6,3.6,11.2,1.2);cel(Cf,K.cuff||cDk(sc,.25),1,.7);hStroke(Cf,.8);X.restore()}
 else hSpike(jx+L.mx*(L.tu>0?-4:4),jy+L.my*(L.tu>0?-4:4),L.mx*(L.tu>0?-1:1)+L.d1x*.4,L.my*(L.tu>0?-1:1)+L.d1y*.4,3.4,1.1);
 return[ex,ey,an]}
function hFistA(x,y,a,back,K){X.save();X.translate(x,y);X.rotate(a+Math.PI/2);hPiece(K.fist+(back?'D':''),HFIST.ax,HFIST.ay,HFIST.s);X.restore()}
/* ---------- nohavice + bota ---------- */
function hLegA(i,C,hx,hy,f,ba,K){const B=HBOOT[i],k=ik(hx,hy,f[0],f[1]-B.an,8.2,8.2,1),jx=k[0],jy=k[1],ex=k[2],ey=k[3],col=i?K.jeans:cDk(K.jeans,.14);
 const L=aLimb(hx,hy,jx,jy,ex,ey,[4.5,4.1,3.7,3.8,4.2],[4.4,4,3.6,3.7,4.1],0);cel(L.P,col,1.6,1,cDk(col,.42),cLt(col,.28));
 X.save();X.clip(L.P);X.strokeStyle=C==3?'rgba(20,20,30,.35)':'rgba(196,204,220,.85)';X.lineWidth=C==3?.5:.55;if(C!=3)X.setLineDash([1.5,1.3]);X.beginPath();X.moveTo(hx+L.n1x*1.6,hy+L.n1y*1.6);X.lineTo(jx+L.mx*1.6,jy+L.my*1.6);X.lineTo(ex+L.n2x*1.6,ey+L.n2y*1.6);X.stroke();X.setLineDash([]);
  if(C==3){X.strokeStyle='rgba(20,20,30,.25)';for(let d=-2.5;d<=2.5;d+=1.7){X.beginPath();X.moveTo(hx+L.n1x*d,hy+L.n1y*d);X.lineTo(jx+L.mx*d,jy+L.my*d);X.lineTo(ex+L.n2x*d,ey+L.n2y*d);X.stroke()}}
  X.strokeStyle=HOL;X.lineWidth=.7;X.globalAlpha=.75;const s=L.tu>0?1:-1;for(let q=0;q<2;q++){const ox=jx+L.mx*s*(1.8+q*1.4),oy=jy+L.my*s*(1.8+q*1.4);X.beginPath();X.moveTo(ox-L.d1x*1.6,oy-L.d1y*1.6);X.quadraticCurveTo(ox+L.mx*s*.8,oy+L.my*s*.8,ox+L.d2x*1.6,oy+L.d2y*1.6);X.stroke()}
  if(i&&C!=3){const px=hx+(jx-hx)*.55,py=hy+(jy-hy)*.55;X.translate(px,py);X.rotate(Math.atan2(jy-hy,jx-hx)-Math.PI/2);X.globalAlpha=1;const Pt=aRR(-2.2,-2.4,4.6,4.8,.5);X.fillStyle=cLt(col,.18);X.fill(Pt);X.strokeStyle=HOL;X.lineWidth=.55;X.stroke(Pt);X.strokeStyle='rgba(196,204,220,.8)';X.lineWidth=.4;X.setLineDash([.9,.8]);X.strokeRect(-1.5,-1.7,3.2,3.4);X.setLineDash([])}X.restore();
 hStroke(L.P,1.15);
 X.save();X.translate(ex,ey);X.rotate((ba||0)*.8);hPiece(i?B.k+C:B.k+C+'D',B.ax,B.ay,1);X.restore();return k}
/* ---------- zadní vrstvy: plášť / kápě‑plášť / prachovka / šosy ---------- */
function hBackA(K,t,wf,ca,C){const sw=Math.sin(t*.2)*1.6,fl=wf*.9+ca*6,dn=Math.max(0,-ca)*4;
 if(K.back=='cape'||K.back=='cloak'){const lg=K.back=='cloak'?1.45:1,col=K.cape;const P=new Path2D();P.moveTo(-6.6,K.back=='cloak'?-24:-6);P.quadraticCurveTo(-10-fl*.3,2*lg,-15-fl,(12+sw*.4)*lg+dn);
  const pts=[[-15-fl,(12+sw*.4)*lg+dn],[-12.6-fl*.8,10.4*lg+dn],[-12-fl*.7,(15+sw)*lg+dn],[-9.4-fl*.55,12*lg+dn],[-8.4-fl*.45,(17.4+sw*.6)*lg+dn],[-6.2-fl*.3,13*lg+dn],[-4.6-fl*.2,(16+sw*.3)*lg+dn],[-2.6,9*lg]];pts.forEach(q=>P.lineTo(q[0],q[1]));P.quadraticCurveTo(-2.6,0,K.back=='cloak'?2:-1.6,K.back=='cloak'?-24:-3.6);P.closePath();
  cel(P,col,1.8,1.1,cDk(col,.45),cLt(col,.3));X.save();X.clip(P);X.strokeStyle=cDk(col,.5);X.lineWidth=.8;X.globalAlpha=.7;X.beginPath();X.moveTo(-5,-3);X.quadraticCurveTo(-8-fl*.3,5,-10-fl*.7,13*lg);X.moveTo(-3.6,-2);X.quadraticCurveTo(-4.6-fl*.2,6,-6-fl*.4,14*lg);if(K.back=='cloak'){X.moveTo(-4,-18);X.quadraticCurveTo(-9-fl*.3,-2,-11-fl*.6,10)}X.stroke();X.restore();hStroke(P,1.1)}
 else if(K.back=='duster'){const col=K.coat,P=new Path2D();P.moveTo(-8.6,-22);P.quadraticCurveTo(-11-fl*.2,0,-12-fl*.9,20+sw*.5+dn);P.lineTo(-7-fl*.7,22+sw*.3+dn);P.lineTo(-4.5-fl*.5,19.5+dn);P.lineTo(-1-fl*.3,22.6+dn);P.quadraticCurveTo(2,10,1,-4);P.lineTo(1,-22);P.closePath();
  cel(P,col,1.8,1.1,cDk(col,.5),cLt(col,.25));X.save();X.clip(P);X.strokeStyle=cDk(col,.55);X.lineWidth=.8;X.globalAlpha=.8;X.beginPath();X.moveTo(-5.5,0);X.quadraticCurveTo(-6.6-fl*.4,10,-6-fl*.6,21);X.moveTo(-9,-4);X.quadraticCurveTo(-10-fl*.4,8,-10.6-fl*.8,19);X.stroke();X.fillStyle='rgba(120,90,60,.35)';X.fillRect(-14-fl,18+dn,20,5);X.restore();hStroke(P,1.1)}
 else if(K.back=='tails'){const col=K.coat;[0,1].forEach(j=>{const o=j*3.2,P=new Path2D();P.moveTo(-7.4+o,-4);P.quadraticCurveTo(-10-fl*.3+o,6,-11.6-fl*.8+o,15+sw*(j?.6:.3)+dn);P.lineTo(-8.4-fl*.6+o,15.6+sw*(j?.5:.2)+dn);P.quadraticCurveTo(-6+o,6,-4+o,-4);P.closePath();const c=j?col:cDk(col,.15);cel(P,c,1.4,1,cDk(c,.45),cLt(c,.3));hStroke(P,1)})}}
/* ---------- přední vrstvy trupu podle třídy ---------- */
function hTorsoFX(K,C,t,gun){
 if(C==0){/* šerifská hvězda, pouzdro s revolverem, smotané laso */X.save();X.translate(-4.4,-16.6);const St=new Path2D();for(let k=0;k<10;k++){const a=k/10*6.283-1.571,r=k%2?1.2:2.6;St.lineTo(Math.cos(a)*r,Math.sin(a)*r)}St.closePath();cel(St,'#e0c050',.8,.6,'#9a7a20','#fff6c0');hStroke(St,.6);X.restore();
  const Hs=aRR(-11.2,-2.4,4.6,9.6,1.4);cel(Hs,'#6a3a1c',1,.7);hStroke(Hs,.8);if(!gun){const G=new Path2D();G.moveTo(-10.6,-2.2);G.quadraticCurveTo(-11.6,-6,-9.4,-7.2);G.quadraticCurveTo(-7,-7.4,-6.8,-5.6);G.lineTo(-7.2,-2.2);G.closePath();cel(G,'#8a5a32',.8,.6);hStroke(G,.7);X.fillStyle='#c8ccd2';X.fillRect(-7.4,-4.2,2.2,1.2)}
  X.save();X.translate(9.6,-1.4);for(let k=0;k<3;k++){X.strokeStyle=k%2?'#c8a868':'#a8885a';X.lineWidth=1.3;X.beginPath();X.ellipse(0,k*.4,3.6-k*.5,4.6-k*.4,.2,0,7);X.stroke()}X.strokeStyle=HOL;X.lineWidth=.5;X.beginPath();X.ellipse(0,0,4.3,5.2,.2,0,7);X.stroke();X.restore()}
 else if(C==1){/* bandalír s noži a šerpa s uzlem */gKnives(6.6,-23,-7.4,-4.6);const Sh=new Path2D();Sh.moveTo(-9,-4.8);Sh.quadraticCurveTo(0,-3.6,10.4,-4.8);Sh.lineTo(10.4,.6);Sh.quadraticCurveTo(0,1.6,-9,.6);Sh.closePath();cel(Sh,'#7a6a4e',1,.7);X.save();X.clip(Sh);X.strokeStyle='rgba(40,26,14,.4)';X.lineWidth=.6;for(let x=-8;x<10;x+=2.4){X.beginPath();X.moveTo(x,-4.6);X.lineTo(x+1.4,.6);X.stroke()}X.restore();hStroke(Sh,.8);
  const sw=Math.sin(t*.18)*1.4,Kt=new Path2D();Kt.moveTo(-8.6,-2.6);Kt.quadraticCurveTo(-11-sw*.3,3,-12.6-sw,8.6);Kt.lineTo(-10.6-sw*.8,9.2);Kt.quadraticCurveTo(-9.6,3.6,-6.8,-1);Kt.closePath();cel(Kt,'#6a5a40',1,.6);hStroke(Kt,.7)}
 else if(C==2){/* prachovka: klopy, bandalír s náboji, plakát za opaskem */const col=HCLS[2].coat;[[-1,-8.8,-5.4],[1,10.6,7]].forEach(([s,a,b])=>{const P=new Path2D();P.moveTo(a,-23.4);P.quadraticCurveTo(a+s*.6,-8,a+s*1.2,12);P.lineTo(b+s*.4,12);P.quadraticCurveTo(b,-6,b-s*.2,-21);P.closePath();cel(P,col,1.6,1,cDk(col,.5),cLt(col,.28));hStroke(P,.9);X.fillStyle='#8a8e96';[-16,-9,-2].forEach(y=>{X.beginPath();X.arc((a+b)/2+s*.2,y,.6,0,7);X.fill()})});
  gBandK(-7,-22.6,8.6,-3.6,3.6,'#4a2414','#b02a1e');X.save();X.translate(-6.6,-1.6);X.rotate(-.3);const Pp=aRR(-2,-6.6,4,9,.3);cel(Pp,'#e8d8b0',.6,.4);X.fillStyle='#b02a2a';X.fillRect(-2,-3,4,1.3);X.fillStyle='rgba(60,40,20,.5)';X.fillRect(-1.2,-5.4,2.4,.5);hStroke(Pp,.5);X.restore()}
 else{/* frak: klopy, motýlek, růže, řetízek */const col=HCLS[3].coat;[[-1,-8.8,-4.6],[1,10.6,6.2]].forEach(([s,a,b])=>{const P=new Path2D();P.moveTo(a,-23.4);P.quadraticCurveTo(a+s*.4,-12,a+s*.6,-4);P.lineTo(b+s*.6,-4);P.lineTo(b,-17);P.lineTo(b+s*1.8,-19);P.lineTo(b-s*.4,-23);P.closePath();cel(P,col,1.6,1,cDk(col,.5),cLt(col,.28));hStroke(P,.9)});
  X.save();X.translate(-.6,-24.6);const Bt=new Path2D();Bt.moveTo(0,0);Bt.lineTo(-3.4,-1.8);Bt.lineTo(-3.4,1.8);Bt.closePath();Bt.moveTo(0,0);Bt.lineTo(3.4,-1.8);Bt.lineTo(3.4,1.8);Bt.closePath();cel(Bt,'#b01e2a',.8,.6);hStroke(Bt,.6);X.fillStyle='#7a1018';X.beginPath();X.arc(0,0,1,0,7);X.fill();X.restore();
  X.save();X.translate(-6.4,-18.4);for(let k=0;k<5;k++){X.fillStyle=k%2?'#c8242a':'#e8404a';X.beginPath();X.arc(Math.cos(k*1.26)*1,Math.sin(k*1.26)*1,1.1,0,7);X.fill()}X.fillStyle='#3a7a2a';X.beginPath();X.ellipse(1.4,1.4,1.2,.5,.6,0,7);X.fill();X.restore();
  X.strokeStyle='#e0b850';X.lineWidth=.55;X.beginPath();X.moveTo(1.2,-11);X.quadraticCurveTo(4,-7.6,6.6,-10.4);X.stroke();X.fillStyle='#e0b850';X.beginPath();X.arc(6.8,-10.4,.9,0,7);X.fill()}}
/* ---------- oči: plynulá víčka, přimhouření, X při zásahu ---------- */
function hEyesA(lid,fc,C){if(fc==2){HEYE.forEach(([x,y],i)=>{const rx=i?2.3:2.7,ry=1.9;X.fillStyle='#4a9a3a';X.beginPath();X.ellipse(x,y,rx+.3,ry+.3,0,0,7);X.fill();X.strokeStyle=HOL;X.lineWidth=.6;X.beginPath();X.moveTo(x-rx*.7,y-ry*.7);X.lineTo(x+rx*.7,y+ry*.7);X.moveTo(x+rx*.7,y-ry*.7);X.lineTo(x-rx*.7,y+ry*.7);X.stroke()});return}
 if(lid<.04)return;HEYE.forEach(([x,y],i)=>{const rx=(i?2.3:2.7)+.35,ry=1.9+.35,top=y-ry,ly=top+ry*2*Math.min(1,lid);X.save();X.beginPath();X.ellipse(x,y,rx,ry,0,0,7);X.clip();X.fillStyle=C==1?'#3c7e2e':'#4a9a3a';X.fillRect(x-rx,top-1,rx*2,ly-top+1);X.fillStyle='rgba(20,60,16,.35)';X.fillRect(x-rx,ly-.6,rx*2,.6);X.restore();X.strokeStyle=HOL;X.lineWidth=.6;X.beginPath();X.moveTo(x-rx,ly);X.quadraticCurveTo(x,ly+.5,x+rx,ly);X.stroke()})}
/* ---------- pokrývky hlavy a doplňky obličeje ---------- */
function hHat(K,C,s,t){const[bx,by]=HBRIM;
 if(K.hat=='hat0'){X.save();X.translate(bx,by-s.hy);X.rotate(s.hr);X.translate(-bx,-by);hAt('hat0');X.restore();return}
 X.save();X.translate(bx,by-s.hy);X.rotate(s.hr+(K.hat=='top'?-.08:0));
 if(K.hat=='wide'){const Cr=new Path2D();Cr.moveTo(-8.6,.4);Cr.bezierCurveTo(-9,-6,-8.2,-11.6,-4.2,-12.4);Cr.quadraticCurveTo(-1.6,-10.4,1,-12.2);Cr.quadraticCurveTo(5.8,-12,6.8,-6);Cr.lineTo(7.2,.4);Cr.closePath();cel(Cr,'#22222a',1.6,1,'#0e0e14','#5a5a6a');X.save();X.clip(Cr);X.fillStyle='#7a1e1e';X.fillRect(-10,-3.2,20,2.6);X.fillStyle='#c8ccd2';[-5.6,-.8,4].forEach(x=>{X.beginPath();X.arc(x,-1.9,.8,0,7);X.fill()});X.restore();hStroke(Cr,1.1);
  hSpike(-6.2,-9.4,-1,-1.4,4.4,1.2);hSpike(3.4,-11.2,.6,-1.6,4.6,1.2);
  const Br=new Path2D();Br.moveTo(-17.6,-.6);Br.quadraticCurveTo(-1,-2.6,16.4,-2.4);Br.quadraticCurveTo(18.6,-.8,16,1);Br.quadraticCurveTo(-1,2.4,-16.8,1.4);Br.quadraticCurveTo(-19,.6,-17.6,-.6);Br.closePath();cel(Br,'#26262e',1.2,.9,'#0e0e14','#6a6a7a');hStroke(Br,1.1)}
 else if(K.hat=='top'){const Cr=new Path2D();Cr.moveTo(-7,.2);Cr.lineTo(-7.8,-17.6);Cr.quadraticCurveTo(1,-19,9.4,-17.6);Cr.lineTo(8.2,.2);Cr.closePath();cel(Cr,'#1a181e',1.6,1,'#08080c','#5a5866');X.save();X.clip(Cr);X.fillStyle='#a01e2a';X.fillRect(-9,-4.4,20,3.4);X.fillStyle='rgba(255,255,255,.18)';X.fillRect(-4.6,-17,1.6,12);X.restore();hStroke(Cr,1.1);
  X.save();X.translate(5.4,-5);X.rotate(.25);const Cd=aRR(-1.6,-2.6,3.2,4.4,.4);cel(Cd,'#f2eee4',.5,.4);X.fillStyle='#c8241a';X.font='700 2.6px Georgia';X.textAlign='center';X.fillText('♥',0,.6);hStroke(Cd,.4);X.restore();
  const Tp=aEll(.8,-17.8,8.6,1.4);X.fillStyle='#2a2830';X.fill(Tp);hStroke(Tp,.8);
  const Br=new Path2D();Br.moveTo(-11.4,-1.6);Br.quadraticCurveTo(-10,.6,-6.6,.6);Br.lineTo(8,.6);Br.quadraticCurveTo(11.6,.4,13,-1.8);Br.quadraticCurveTo(13.6,1.8,8.4,2.4);Br.lineTo(-6.8,2.4);Br.quadraticCurveTo(-12,1.8,-11.4,-1.6);Br.closePath();cel(Br,'#1e1c22',1,.8,'#08080c','#5a5866');hStroke(Br,1)}
 X.restore()}
function hHoodBack(K,s){const col=K.hood,[bx,by]=HBRIM,P=new Path2D();P.moveTo(-11.4,-27);P.bezierCurveTo(-15,-40,-15.6,-54,-9,-60.6);P.quadraticCurveTo(-13,-63,-18-s.hr*6,-62.4+s.hy);P.quadraticCurveTo(-10,-67,-1,-63.4);P.bezierCurveTo(8,-62,12,-52,11,-40);P.lineTo(10,-27);P.closePath();cel(P,cDk(col,.18),1.8,1,cDk(col,.55),cLt(col,.2));hStroke(P,1.1)}
function hHoodFront(K,s){const col=K.hood;/* stín pod kápí přes čelo */X.save();X.beginPath();X.ellipse(-1.2,-50,10.6,9.4,0,0,7);X.clip();const g=X.createLinearGradient(0,-58,0,-47);g.addColorStop(0,'rgba(10,6,4,.75)');g.addColorStop(1,'rgba(10,6,4,0)');X.fillStyle=g;X.fillRect(-12,-60,22,14);X.restore();
 const F=new Path2D();F.moveTo(-12.4,-28);F.bezierCurveTo(-13.4,-40,-13.6,-52,-8.6,-58.6);F.quadraticCurveTo(-1,-63,7.4,-58);F.bezierCurveTo(10.6,-54,11.2,-44,10.6,-28);F.lineTo(8.4,-28);F.bezierCurveTo(9,-42,8.6,-52,5,-55.2);F.quadraticCurveTo(-1,-58,-6.4,-55);F.bezierCurveTo(-10.4,-50,-10.6,-40,-10,-28);F.closePath();cel(F,col,1.6,1,cDk(col,.5),cLt(col,.3));X.save();X.clip(F);X.strokeStyle=cDk(col,.5);X.lineWidth=.6;X.globalAlpha=.7;X.beginPath();X.moveTo(-11.6,-36);X.quadraticCurveTo(-11,-46,-8,-54);X.moveTo(9.4,-36);X.quadraticCurveTo(9.6,-46,6.4,-54);X.stroke();X.restore();hStroke(F,1)}
function hMask(K,t){const col=K.mask,[mx,my]=HMOUTH,P=new Path2D();P.moveTo(mx-8.6,my-4.2);P.quadraticCurveTo(mx,my-5.6,mx+8.4,my-4.6);P.quadraticCurveTo(mx+9.4,my+.6,mx+8,my+4.8);P.quadraticCurveTo(mx,my+6.6,mx-8.2,my+4.6);P.quadraticCurveTo(mx-9.6,my,mx-8.6,my-4.2);P.closePath();cel(P,col,1.4,1,cDk(col,.45),cLt(col,.3));X.save();X.clip(P);X.strokeStyle=cDk(col,.5);X.lineWidth=.6;X.globalAlpha=.8;for(let k=-1;k<=1;k++){X.beginPath();X.moveTo(mx-8,my+k*2.4);X.quadraticCurveTo(mx,my+k*2.4+1.2,mx+8,my+k*2.4-.4);X.stroke()}X.restore();hStroke(P,.9);
 const sw=Math.sin(t*.22)*1.2,T1=new Path2D();T1.moveTo(mx-8.8,my-1);T1.quadraticCurveTo(mx-12-sw*.4,my+1,mx-14.6-sw,my+3.6);T1.lineTo(mx-13.4-sw,my+5);T1.quadraticCurveTo(mx-11,my+2.6,mx-8.6,my+1.6);T1.closePath();cel(T1,cDk(col,.12),1,.6);hStroke(T1,.7)}
function hMust(){const[mx,my]=HMOUTH,y=my-5.6,M=new Path2D();M.moveTo(mx,y+.4);M.bezierCurveTo(mx-2,y-1.2,mx-5,y-.6,mx-6.4,y+.8);M.bezierCurveTo(mx-7.6,y+2,mx-8.8,y+.6,mx-8.6,y-.8);M.bezierCurveTo(mx-8,y+2.6,mx-5.6,y+2.8,mx-4,y+1.8);M.quadraticCurveTo(mx-1.6,y+1,mx,y+1.8);M.quadraticCurveTo(mx+1.6,y+1,mx+4,y+1.8);M.bezierCurveTo(mx+5.6,y+2.8,mx+8,y+2.6,mx+8.6,y-.8);M.bezierCurveTo(mx+8.8,y+.6,mx+7.6,y+2,mx+6.4,y+.8);M.bezierCurveTo(mx+5,y-.6,mx+2,y-1.2,mx,y+.4);M.closePath();cel(M,'#2a1a14',1,.7,'#100804','#6a4a3a');hStroke(M,.6)}
function hMonocle(t){const[ex,ey]=HEYE[1];X.save();X.strokeStyle='#d9b25a';X.lineWidth=.8;X.beginPath();X.arc(ex,ey,3.3,0,7);X.stroke();X.fillStyle='rgba(220,240,255,.18)';X.beginPath();X.arc(ex,ey,3,0,7);X.fill();X.strokeStyle='rgba(255,255,255,.7)';X.lineWidth=.5;X.beginPath();X.arc(ex,ey,2.4,-2.4,-1.6);X.stroke();X.strokeStyle='#d9b25a';X.lineWidth=.35;X.beginPath();X.moveTo(ex+2.6,ey+2);X.quadraticCurveTo(ex+4.6,ey+8,ex+2.4,ey+14+Math.sin(t*.1)*.6);X.stroke();X.restore()}
function hCigar(s,t,glow){const[mx,my]=HMOUTH,x0=mx+6.4,y0=my+1.6;X.save();X.translate(x0,y0);X.rotate(.18);const C=aRR(0,-.8,6.2,1.6,.6);cel(C,'#6a4224',.6,.5);hStroke(C,.45);X.fillStyle='#e8e0d0';X.fillRect(4.6,-.8,1.6,1.6);X.fillStyle=glow>.5?'#ffcf5a':'#ff7a2a';X.beginPath();X.arc(6.4,0,.7+glow*.3,0,7);X.fill();X.restore();
 X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x0+6.3,y0+1.1,0,x0+6.3,y0+1.1,3+glow*3);g.addColorStop(0,'rgba(255,150,60,'+(.35+glow*.4)+')');g.addColorStop(1,'rgba(255,150,60,0)');X.fillStyle=g;X.fillRect(x0,y0-6,14,14);X.restore();
 for(let k=0;k<4;k++){const age=((t*.5+k*22)%88)/88,px=x0+7+age*3+Math.sin(t*.05+k)*1.4,py=y0-age*16;X.fillStyle='rgba(210,210,215,'+(.32*(1-age))+')';X.beginPath();X.arc(px,py,.8+age*2.8,0,7);X.fill()}}
/* ---------- nečinnost: krátké „fidgety“ podle třídy ---------- */
function hFidget(q,C,s,t,still){let fv=0;if(q===p){if(still){if(s.fid){s.fv+=1/150;if(s.fv>=1){s.fid=0;s.fv=0;s.idle=0}}else if(++s.idle>320+((q.x|0)%120)){s.fid=1;s.fv=0}}else{s.fid=0;s.fv=0;s.idle=0}fv=s.fid?s.fv:0}
 else if(still){const c=t%620;fv=c>440?(c-440)/150:0;if(fv>1)fv=0}return fv}
const hEase=v=>v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2,hWin=(v,a,b)=>Math.max(0,Math.min(1,(v-a)/(b-a)));
/* ---------- vlastní pózy loutky: chůze/běh, vzduch, postoje tříd ---------- */
function hGaitPose(ph,k,run,C){const S=(3.4+5.6*k+(run?2.6:0))*(C==2?.9:1),L=(2+4.2*k+(run?3:0))*(C==1?.8:1),B=(.7+1.5*k+(run?.9:0))*(C==2?1.35:1),FE=[],FA=[];
 for(let i=0;i<2;i++){const f=ph+i*Math.PI,c=Math.cos(f),sn=Math.sin(f);FE.push([S*c+(i?2.2:-2.2),sn<0?-L*Math.pow(-sn,.8):0]);FA.push(sn<0?(c>0?-.38:.5)*(-sn):0)}
 const a1=Math.cos(ph),a0=-a1,A=(3+6.5*k)*(C==2?.6:1);let H1,H0;
 if(run){H1=[HSH[1][0]+3.5+a1*A,HSH[1][1]+9.5-Math.max(0,a1)*6];H0=[HSH[0][0]+2.5+a0*A,HSH[0][1]+9.5-Math.max(0,a0)*6]}
 else{H1=[HSH[1][0]+1.5+a1*A,HSH[1][1]+15.5-Math.max(0,a1)*3.5];H0=[HSH[0][0]+1.5+a0*A,HSH[0][1]+15.5-Math.max(0,a0)*3.5]}
 let BOB=B*Math.cos(2*ph)+(run?1.4:0),LEAN=.03+.09*k+(run?.08:0)+Math.sin(2*ph)*.018,AB=[-1,-1];
 if(C==1){/* asasín: přikrčený plíživý krok, ruce připravené */BOB+=2.6;LEAN+=.1;H1=[H1[0]+4,H1[1]-4];H0=[H0[0]+5,H0[1]-3]}
 else if(C==2){/* lovec: těžký houpavý krok, ruka u bandalíru */LEAN-=.03;if(!run){H0=[2,-13];AB=[1,-1]}}
 else if(C==3){/* mistr: ruka na klopě, hůl se opírá v rytmu kroků */if(!run){H1=[5,-18.5];AB=[-1,1];H0=[HSH[0][0]+3+Math.cos(ph)*5.5,HSH[0][1]+19-Math.max(0,Math.cos(ph))*3]}}
 else if(!run){/* kovboj: ruka nad pouzdrem */H0=[HSH[0][0]-3.6+a0*A*.5,HSH[0][1]+17]}
 return{FE,FA,H0,H1,BOB,LEAN,AB}}
function hAirPose(vz,t){const sh1=HSH[1],sh0=HSH[0];
 if(vz>2.5)return{FE:[[-5,-3],[5.5,-11]],FA:[.35,-.25],H1:[sh1[0]+8,sh1[1]-14],H0:[sh0[0]-6,sh0[1]+12],LEAN:.06,BOB:-1};
 if(vz>-2.5)return{FE:[[-2.5,-8],[4.5,-10]],FA:[.15,-.15],H1:[sh1[0]+12,sh1[1]-4],H0:[sh0[0]-10,sh0[1]-2],LEAN:.08,BOB:0};
 const w=Math.sin(t*.35);return{FE:[[-4.5,-1],[6.5,-3]],FA:[-.25,-.35],H1:[sh1[0]+9+w,sh1[1]-15+w*2],H0:[sh0[0]-8-w,sh0[1]-13-w*2],LEAN:-.05,BOB:0}}
const HIDLE=[{FE:[[-4,0],[5,0]],FA:[0,0],H1:[9.5,-6],H0:[-10,-5.5],LEAN:-.02,BOB:0,AB:[-1,1]},
 {FE:[[-6.5,0],[7,0]],FA:[0,0],H1:[13,-13],H0:[8,-15],LEAN:.13,BOB:3,AB:[-1,-1]},
 {FE:[[-4.5,0],[5.5,0]],FA:[0,0],H1:[-2,-14],H0:[7,-16],LEAN:-.03,BOB:0,AB:[1,1]},
 {FE:[[-3.5,0],[4.5,0]],FA:[0,0],H1:[5,-18.5],H0:[-8,-3],LEAN:-.04,BOB:0,AB:[-1,1]}];
const hL=(a,b,k)=>a+(b-a)*k,hL2=(a,b,k)=>[hL(a[0],b[0],k),hL(a[1],b[1],k)];
function hMixPose(a,b,k){return{AB:k<.5?(a.AB||[-1,-1]):(b.AB||[-1,-1]),FE:[hL2(a.FE[0],b.FE[0],k),hL2(a.FE[1],b.FE[1],k)],FA:[hL(a.FA[0],b.FA[0],k),hL(a.FA[1],b.FA[1],k)],H0:hL2(a.H0,b.H0,k),H1:hL2(a.H1,b.H1,k),BOB:hL(a.BOB,b.BOB,k),LEAN:hL(a.LEAN,b.LEAN,k)}}
/* ---------- celá postava ---------- */
function heroRig(q,C,t,bob,lean,FA,fe,h0,h1,fc,lines,bl,wa,W2,wpm,gun,pun,u,air,wf){
 const K=HCLS[C]||HCLS[0],ky=HPEL/40,hang=q.hang||(q==p&&p&&p.zip),sh=hang?Math.max(0,(q.zip||(p&&p.zip)?92:100)-(HPEL+22.8+2*HAL-2)):0;
 if(sh)X.translate(0,sh);
 const s=hState(q,bob),mv=Math.abs(q.vx||0)>.4&&!air&&!q.climb&&!q.hang,still=!mv&&!air&&!pun&&!(q.ak>0)&&!(q.aim>0)&&!q.cr&&!q.climb&&!q.hang&&!(q.ds>0)&&!(q.ht>0)&&!q.dead&&!q.tied&&!(q.td>0)&&!q.sl&&!(q.th>0)&&!(q.sb>0)&&!gun&&!wpm&&!(q==p&&(carry||p.zip));
 const fv=hFidget(q,C,s,t,still),fk=hEase(hWin(fv,.05,.3))*(1-hEase(hWin(fv,.75,.98)));
 /* pohybová póza: vlastní chůze, vzduch a postoj; akce přebírají původní pózy */
 const vxa=Math.abs(q.vx||0),k=Math.min(1,vxa/3.6),run=k>.72,breath=still?Math.sin(t*.045):0;
 const rS=Math.PI/(2*(3.4+5.6*k+(run?2.6:0))*1.2);if(s.fresh)s.ph=t*.32;else s.ph+=vxa*rS*s.n;const ph=s.ph;
 const legFree=!q.cr&&!(q.ds>0)&&!q.sl&&!q.dead&&!q.tied&&!(q.td>0)&&!(q.cu>0)&&!q.climb&&!hang&&!(q.ak>0),
  armFree=legFree&&!pun&&!(q.aim>0)&&!gun&&!wpm&&!(q.th>0)&&!(q.sb>0)&&!(q.ht>0)&&!(q==p&&carry)&&!(q.pk>0);
 const old={FE:fe.map(f=>[f[0]*.85,f[1]*ky]),FA:FA?FA.slice():[0,0],H0:[h0[0]-HOSH[0][0]+HSH[0][0],h0[1]-HOSH[0][1]+HSH[0][1]],H1:[h1[0]-HOSH[1][0]+HSH[1][0],h1[1]-HOSH[1][1]+HSH[1][1]],BOB:bob*ky*1.15,LEAN:lean};
 let tp=old,mode='old';
 if(legFree&&mv){const g=hGaitPose(ph,k,run,C);tp={AB:armFree?g.AB:[-1,-1],FE:g.FE,FA:g.FA,BOB:g.BOB,H0:armFree?g.H0:old.H0,H1:armFree?g.H1:old.H1,LEAN:armFree?g.LEAN:old.LEAN};mode=run?'run':'walk'}
 else if(legFree&&air){const g=hAirPose(q.vz||0,t);tp={FE:g.FE,FA:g.FA,BOB:g.BOB,H0:armFree?g.H0:old.H0,H1:armFree?g.H1:old.H1,LEAN:armFree?g.LEAN:old.LEAN};mode='air'+((q.vz||0)>2.5?1:(q.vz||0)>-2.5?2:3)}
 else if(legFree&&!mv&&!air){const g=HIDLE[C]||HIDLE[0];tp={AB:armFree?g.AB:[-1,-1],FE:g.FE,FA:[0,0],BOB:g.BOB+breath*.35,H0:armFree?[g.H0[0],g.H0[1]+breath*.4]:old.H0,H1:armFree?[g.H1[0],g.H1[1]+breath*.4]:old.H1,LEAN:armFree?g.LEAN:old.LEAN};mode='idle'+(armFree?1:0)}
 if(q.ld>0&&legFree){const kk=q.ld/12;tp=Object.assign({},tp,{BOB:tp.BOB+kk*5,LEAN:tp.LEAN+.07*kk})}
 /* plynulé přechody mezi režimy */
 let P=tp;if(!s.fresh){if(mode!=s.mode){s.Pp=s.P||tp;s.bl=0;s.mode=mode}if(s.bl<1){s.bl=Math.min(1,s.bl+(mode=='old'?.34:.2)*Math.max(1,s.n));P=hMixPose(s.Pp,tp,hEase(s.bl))}s.P=P}
 const step=mode=='walk'||mode=='run'?Math.abs(Math.sin(ph)):0;
 if(q===p&&!s.fresh&&s.n>0){if(mode=='run'){const c0=Math.floor((ph-vxa*rS*s.n)/Math.PI),c1=Math.floor(ph/Math.PI);if(c1!=c0&&typeof spawnP=='function'&&lv)try{spawnP(p.x-p.face*4,LY,2,lv.du||'#b8a080',1,5,p.z)}catch(e){}}
  if(s.face!=null&&s.face!=q.face)s.turn=1;s.face=q.face;if(s.turn>0)s.turn=Math.max(0,s.turn-.17*s.n)}
 if(s.turn>0){const v=1-s.turn,sx=-Math.cos(Math.PI*v);X.scale(Math.abs(sx)<.12?(sx<0?-.12:.12):sx,1)}
 const pel=-HPEL+P.BOB,ff=P.FE,tsy=1+breath*.012+(step?(step-.5)*.024:0),tsx=1-breath*.006;lean=P.LEAN+(mode.startsWith('idle')?Math.sin(t*.013)*.02:0);FA=P.FA;
 /* hlava: zpožděné kývání, předklon při útoku, záklon při zásahu */
 let hr=Math.sin(t*.021)*.018,hx=0,hy=breath*.25;
 if(mode=='walk'||mode=='run'){hr+=Math.sin(ph*2+.7)*.04+lean*.3;hy+=Math.cos(ph*2+.6)*(run?.7:.45)}
 if(air)hr+=q.vz>2?-.08:q.vz<-3?.08:0;if(pun)hr+=.16*Math.sin(Math.min(1,u*1.4)*Math.PI);if(q.ht>0)hr-=.28*Math.min(1,q.ht/14);if(q.climb)hr-=.12;if(q.cr)hr+=.08;if(q.dead)hr+=.25;
 /* čelist: výkřik při útoku a zásahu */let jt=0;if(pun&&u>.1&&u<.7)jt=q.hv||q.up?2.4:1.5;if(q.ht>0)jt=2.6;if(q.dead)jt=2;if(air&&q.vz>5)jt=.6;if(q.ak>0)jt=2;if(gun&&q.aim>16)jt=.4;
 let lt=(t%190<7&&fc==0)?1:0;if(fc==1||q.aim>0||q.cr)lt=Math.max(lt,.42);
 /* fidgety */let hatLift=0,hatTip=0,cigGlow=.2,h1o=null,h0o=null,caneSpin=0,eyeShift=0;
 if(fk>0){if(C==0){h1o=[HBRIM[0]+12.5,HBRIM[1]+.5];hatLift=2.2*hEase(hWin(fv,.3,.45))*(1-hEase(hWin(fv,.6,.75)));hatTip=-.32*hatLift/2.2;hr+=.05*fk}
  else if(C==1){hr+=Math.sin(fv*Math.PI*4)*.14*fk;lt=Math.max(lt,.5*fk);h1o=[1,-15];h0o=[-2,-14]}
  else if(C==2){const inh=hWin(fv,.22,.5)*(1-hWin(fv,.5,.6));h1o=[HMOUTH[0]+9,HMOUTH[1]+2];cigGlow=.2+.8*inh;lt=Math.max(lt,.35*inh)}
  else{h1o=[HEYE[1][0]+3,HEYE[1][1]+3];caneSpin=hWin(fv,.5,.9);lt=Math.max(lt,.3*fk)}}
 if(q.ht>0)hatLift+=0;
 if(s.fresh){/* objekty bez paměti (menu): klobouk jen podle času */s.hy=Math.max(0,Math.sin(t*.05))*.15}
 s.jaw+=(jt-s.jaw)*(s.fresh?1:.35);s.lid+=(lt-s.lid)*(s.fresh?1:.5);
 const tor=f=>{X.save();X.translate(0,pel);X.rotate(lean);try{f()}finally{X.restore()}};
 const ht=(h,i)=>[h[0]-HOSH[i][0]+HSH[i][0],h[1]-HOSH[i][1]+HSH[i][1]];
 const mix=(a,b,k)=>[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k];
 let H0=P.H0.slice(),H1=P.H1.slice();if(h1o)H1=mix(H1,h1o,fk);if(h0o)H0=mix(H0,h0o,fk);
 if(C==3&&caneSpin>0)H0=[H0[0]+Math.sin(caneSpin*Math.PI*2)*2,H0[1]-Math.sin(caneSpin*Math.PI)*3];
 /* 1) zadní vrstvy (plášť, kabát, kápě) */
 tor(()=>{hBackA(K,t,wf,s.ca,C);if(K.hat=='hood'){X.save();X.translate(HNECK[0]+hx,HNECK[1]+hy);X.rotate(hr);X.translate(-HNECK[0],-HNECK[1]);hHoodBack(K,s);X.restore()}});
 /* 2) nohy */ff.forEach((f,i)=>{const ba=q.ak>0&&i==1?-.4:(FA?FA[i]:0);hLegA(i,C,-3.6+i*7.2,pel,f,ba,K)});
 let A0,A1,F;
 tor(()=>{/* 3) zadní paže */A0=hArmA(HSH[0][0],HSH[0][1],H0,1,K,(P.AB||[-1,-1])[0]);hFistA(A0[0],A0[1],A0[2],1,K);
  if(C==3&&!pun){X.save();X.translate(A0[0],A0[1]);X.rotate(caneSpin*Math.PI*2);X.strokeStyle='#1e181c';X.lineWidth=2.4;X.beginPath();X.moveTo(-1,0);X.lineTo(1.5,Math.max(8,-pel-A0[1]-.4));X.stroke();X.strokeStyle='rgba(255,255,255,.3)';X.lineWidth=.7;X.beginPath();X.moveTo(-.4,3);X.lineTo(1.2,Math.max(6,-pel-A0[1]-2.4));X.stroke();const Kb=aEll(0,-2.4,2.6,2.4);cel(Kb,'#d9b25a',.8,.6,'#8a6a2a','#fff0b0');X.restore()}
  /* 4) hlava (s čelistí, očima a doplňky) – pod šátkem trupu */const ny=HNECK[1]*(tsy-1);X.save();X.translate(HNECK[0]+hx,HNECK[1]+hy+ny);X.rotate(hr);X.translate(-HNECK[0],-HNECK[1]);
   hAt('head');X.save();X.translate(0,s.jaw);hAt('jaw');X.restore();hEyesA(s.lid,fc,C);
   if(C==1)hMask(K,t);if(C==3){hMust();hMonocle(t)}if(C==2)hCigar(s,t,cigGlow);
   if(K.hat!='hood'){const hs={hy:s.hy+hatLift,hr:s.hr+hatTip};if(q.dead){hs.hy=1.4;hs.hr=-.45}hHat(K,C,hs,t)}
   X.restore();
  /* 5) trup s dechem (šátek překryje krk) */X.save();X.translate(HNECK[0],0);X.scale(tsx,tsy);X.translate(-HNECK[0],0);hAt('tor'+C);hTorsoFX(K,C,t,gun);X.restore();
  if(K.hat=='hood'){X.save();X.translate(HNECK[0]+hx,HNECK[1]+hy+ny);X.rotate(hr);X.translate(-HNECK[0],-HNECK[1]);hHoodFront(K,s);X.restore()}
  /* 6) přední paže, zbraň, pěst */
  const ab1=(P.AB||[-1,-1])[1];F=ik(HSH[1][0],HSH[1][1],H1[0],H1[1],HAL,HAL,ab1);if(gun)wp(gun,F[2]+2,F[3],0,t);else if(wpm)wp(W2,F[2]+2,F[3],wa,t);
  if(C==3&&pun&&!wpm){X.save();X.translate(F[2],F[3]);X.rotate(wa);X.strokeStyle='#1e181c';X.lineWidth=2.4;X.beginPath();X.moveTo(-4,0);X.lineTo(36,0);X.stroke();X.fillStyle='#c8ccd2';X.fillRect(34,-1.3,2.6,2.6);const Kb=aEll(-4.4,0,2.6,2.4);cel(Kb,'#d9b25a',.8,.6,'#8a6a2a','#fff0b0');X.restore()}
  A1=hArmA(HSH[1][0],HSH[1][1],H1,0,K,ab1);
  if(bl||(C==1&&q.pk>0)){const a=A1[2];X.save();X.translate(A1[0],A1[1]);X.rotate(a);const Bl=new Path2D();Bl.moveTo(2,-1.6);Bl.lineTo(18,-.6);Bl.lineTo(21,.4);Bl.lineTo(18,1.4);Bl.lineTo(2,1.6);Bl.closePath();cel(Bl,'#d8dce2',.8,.6,'#8a9098','#ffffff');X.strokeStyle='rgba(255,255,255,.8)';X.lineWidth=.5;X.beginPath();X.moveTo(4,-.4);X.lineTo(18,-.1);X.stroke();X.restore()}
  hFistA(A1[0],A1[1],A1[2],0,K);
  if(C==3&&fk>0&&!caneSpin){const[ex,ey]=HEYE[1];X.strokeStyle='rgba(255,255,255,.6)';X.lineWidth=.6;X.beginPath();X.arc(ex,ey,4.4,t*.3,t*.3+2);X.stroke()}
  if(pun&&u>.38&&u<.66&&!q.up&&!q.hv){X.strokeStyle='rgba(230,235,255,.7)';X.lineWidth=2.5;X.beginPath();X.arc(A1[0]-6,A1[1],20,-1.2,1.2);X.stroke()}
  if(lines==2&&(u<.7||q.ak>0)){X.strokeStyle='rgba(230,235,255,.7)';X.lineWidth=3;X.beginPath();X.arc(6,-28,30,-2.2,1);X.stroke()}
  if(lines==3){X.strokeStyle='rgba(230,235,255,.7)';X.lineWidth=3;X.beginPath();X.arc(6,-22,26,.6,-1.5,true);X.stroke()}
  if(q.tied){[['#8a6a3a',4.5],['#c8a060',2.5]].forEach(([c2,w2])=>{X.strokeStyle=c2;X.lineWidth=w2;[-18,-6].forEach(y=>{X.beginPath();X.ellipse(1,y,13,4,0,0,7);X.stroke()})})}})}
