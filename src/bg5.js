/* ===================================================================
   v67: NOVÁ MALOVANÁ POZADÍ – objemové mraky, vzdušná perspektiva,
   okrajové světlo, mlžné pásy, oprava textury (žádné obdélníky)
   =================================================================== */
const B5={tmp:null,noise:null};
/* opakování přes šev vrstvy: kopie dostane stejná náhodná čísla jako originál (žádné nesedící švy) */
pbWrap=function(Lw,x,w,fn){const s0=PBR_s;fn(x);if(x-w<0){const s1=PBR_s;PBR_s=s0;fn(x+Lw);PBR_s=s1}if(x+w>Lw){const s1=PBR_s;PBR_s=s0;fn(x-Lw);PBR_s=s1}};
function b5Cv(w,h){return pbCv(w,h)}
function b5Scratch(w,h){let c=B5.tmp;if(!c||c.width<w||c.height<h){c=B5.tmp=pbCv(Math.max(w,c?c.width:0),Math.max(h,c?c.height:0))}return c}
/* oprava: overlay textura se omezí na to, co vrstva opravdu obsahuje */
pbTexFill=function(g,x,y,w,h,a){const c=g.canvas;if(!c||!c.width)return;const t=pbCv(c.width,c.height),q=t.getContext('2d');let m;try{m=g.getTransform()}catch(e){m=null}
 if(m)q.setTransform(m);q.save();q.beginPath();q.rect(x,y,w,h);q.clip();const tx=pbTex(),n=Math.max(1,Math.round(w/256)),tw=w/n;for(let i=0;i<n;i++)for(let yy=y;yy<y+h;yy+=256)q.drawImage(tx,x+i*tw,yy,tw+.5,256);q.restore();q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='destination-in';q.drawImage(c,0,0);
 g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='overlay';g.globalAlpha=(a==null?.5:a)*.7;g.drawImage(t,0,0);g.restore()};
/* jemné zrno proti pruhování přechodů */
function b5NoiseTile(){if(B5.noise)return B5.noise;const c=pbCv(128,128),g=c.getContext('2d'),d=g.createImageData(128,128);let s=12345;for(let i=0;i<d.data.length;i+=4){s=(s*1103515245+12345)&0x7fffffff;const v=128+((s>>16)%17)-8;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0);B5.noise=c;return c}
function b5Dither(g,x,y,w,h,a){g.save();g.globalCompositeOperation='overlay';g.globalAlpha=a||.5;g.fillStyle=g.createPattern(b5NoiseTile(),'repeat');g.fillRect(x,y,w,h);g.restore()}
/* nebe: přechod + malba + zrno */
function b5Sky(stops,paint){const c=pbSkyCv(stops,paint),g=c.getContext('2d');b5Dither(g,0,0,c.width,c.height,.45);return c}
function b5Hex(c){const A=pbRgb(c);return A}
/* ---------- objemový mrak (hustota + světlo pochodující k slunci) ----------
 P: top/bot barvy tělesa (nahoře/dole), sh barva ve stínu, hi barva na slunci, rim lem, L směr ke světlu, a alfa, type cu|st|wi */
function b5H(i,j,s){let h=(Math.imul(i,374761393)+Math.imul(j,668265263)+Math.imul(s,1442695041))|0;h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return(h>>>0)/4294967296}
function b5VN(x,y,s){const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy),a=b5H(i,j,s),b=b5H(i+1,j,s),c=b5H(i,j+1,s),d=b5H(i+1,j+1,s);return a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy}
function b5FBM(x,y,s,o){let v=0,a=.5,n=0;for(let k=0;k<o;k++){v+=a*b5VN(x,y,s+k*17);n+=a;x*=2.03;y*=2.03;a*=.5}return v/n}
function b5Cloud(g,cx,cy,w,h,P,seed){qrS(seed);const type=P.type||'cu',rs=P.rs||.5,pad=Math.ceil(h*.7+16),cw=Math.ceil(w+pad*2),ch=Math.ceil(h*(type=='cu'?1.9:1.5)+pad*1.2);
 const gw=Math.ceil(cw*rs),gh=Math.ceil(ch*rs),D=new Float32Array(gw*gh),base=(ch-pad*.6)*rs,ox=pad*rs,W2=w*rs,H2=h*rs,puffs=[];
 if(type=='cu'){const n=P.n||Math.max(6,Math.round(w/(h*.38)));for(let i=0;i<n;i++){const u=(i+qr(-.3,.3))/(n-1),e=Math.sin(Math.PI*(.04+Math.min(1,Math.max(0,u))*.92)),r=H2*(.24+.46*Math.pow(e,.8))*qr(.8,1.15);puffs.push([ox+u*W2,base-r*.55-e*H2*qr(.05,.42),r,1])}
  const t=Math.round(n*.45);for(let i=0;i<t;i++){const u=qr(.18,.82),e=Math.sin(Math.PI*u),r=H2*(.16+.3*e)*qr(.75,1.1);puffs.push([ox+u*W2+qr(-6,6),base-H2*(.5+.6*e)*qr(.7,1.05),r,1])}}
 else if(type=='st'){const n=P.n||Math.max(6,Math.round(w/(h*.7)));for(let i=0;i<n;i++){const u=qr(.02,.98),e=Math.sin(Math.PI*u),r=H2*(.32+.42*e)*qr(.75,1.1);puffs.push([ox+u*W2,base-H2*.42-e*H2*qr(0,.22),r,qr(2,3.2)])}}
 else{const n=P.n||Math.max(8,Math.round(w/22));for(let i=0;i<n;i++){const u=qr(.02,.98),e=Math.sin(Math.PI*u),r=H2*(.2+.42*e)*qr(.6,1.1);puffs.push([ox+u*W2,base-H2*.5+qr(-H2*.3,H2*.3)*e-u*(P.tilt||0)*H2,r,qr(3.5,6)])}}
 /* hustota */for(const q of puffs){const r=q[2],sx=q[3],rx=r*sx,x0=Math.max(0,Math.floor(q[0]-rx)),x1=Math.min(gw-1,Math.ceil(q[0]+rx)),y0=Math.max(0,Math.floor(q[1]-r)),y1=Math.min(gh-1,Math.ceil(q[1]+r));
  for(let y=y0;y<=y1;y++){const dy=(y-q[1])/r,dy2=dy*dy;for(let x=x0;x<=x1;x++){const dx=(x-q[0])/rx,d=dx*dx+dy2;if(d<1){const f=1-d;D[y*gw+x]+=f*f*(type=='cu'?1.35:.9)}}}}
 const ns=(P.ns||(type=='wi'?.09:.055))/rs,seedN=(seed*13)|0,fl=type=='cu'&&P.flat!==0,an=type=='wi'?4:1;
 const EX=[];for(let x=0;x<gw;x++){const u=(x-ox)/W2,e0=Math.min(1,Math.max(0,(u+.02)/.2)),e1=Math.min(1,Math.max(0,(1.02-u)/.2));EX.push(e0*e0*(3-2*e0)*e1*e1*(3-2*e1))}
 for(let y=0;y<gh;y++){const fy=fl?Math.min(1,Math.max(0,(base+H2*.1-y)/(H2*.22))):1;for(let x=0;x<gw;x++){const i=y*gw+x;let d=D[i];if(d<=0)continue;const nz=b5FBM(x*ns/an,y*ns,seedN,4);d*=(type=='cu'?.55:.35)+nz*(type=='cu'?.95:1.3);D[i]=d*fy*(.15+.85*EX[x])}}
 const L=P.L||[.4,-.9],ll=Math.hypot(L[0],L[1])||1,lx=L[0]/ll,ly=L[1]/ll,st=Math.max(1.2,H2*.06),K=(P.k||.09)/Math.max(.5,H2/40),NS=8;
 const c=pbCv(gw,gh),q=c.getContext('2d'),img=q.createImageData(gw,gh),o=img.data;
 const hiP=P.hiP||3,cT=pbRgb(P.top),cB=pbRgb(P.bot||P.top),cS=pbRgb(P.sh||P.bot||P.top),cH=pbRgb(P.hi||P.top),cR=P.rim?pbRgb(P.rim):null,hiA=P.hiA==null?.6:P.hiA,rimA=P.rimA||.7,t0=P.t0==null?.22:P.t0,t1=P.t1==null?.62:P.t1,A=P.a==null?1:P.a,shA=P.shA==null?.75:P.shA;
 const topY=base-H2*1.25;
 for(let y=0;y<gh;y++){const vy=Math.min(1,Math.max(0,(y-topY)/(base-topY)));for(let x=0;x<gw;x++){const i=y*gw+x,d=D[i];if(d<=t0*.6)continue;
   let al=(d-t0)/(t1-t0);al=al<=0?0:al>=1?1:al*al*(3-2*al);if(al<=0.003)continue;
   let tau=0,px=x,py=y;for(let k=0;k<NS;k++){px+=lx*st;py+=ly*st;const ix=px|0,iy=py|0;if(ix<0||iy<0||ix>=gw||iy>=gh)break;tau+=D[iy*gw+ix]}
   const li=Math.exp(-tau*st*K),bl=1-(1-li)*shA;
   let r=cT[0]+(cB[0]-cT[0])*vy,gg=cT[1]+(cB[1]-cT[1])*vy,b=cT[2]+(cB[2]-cT[2])*vy;
   r=cS[0]+(r-cS[0])*bl;gg=cS[1]+(gg-cS[1])*bl;b=cS[2]+(b-cS[2])*bl;
   const hk=Math.pow(li,hiP)*hiA;r+=(cH[0]-r)*hk;gg+=(cH[1]-gg)*hk;b+=(cH[2]-b)*hk;
   if(cR){const e=(1-Math.min(1,(d-t0)/(t1*1.3-t0)))*li*rimA;if(e>0){r+=(cR[0]-r)*e;gg+=(cR[1]-gg)*e;b+=(cR[2]-b)*e}}
   const j=i*4;o[j]=r;o[j+1]=gg;o[j+2]=b;o[j+3]=255*al*A}}
 q.putImageData(img,0,0);g.save();g.imageSmoothingEnabled=true;try{g.imageSmoothingQuality='high'}catch(e){}g.drawImage(c,cx-w/2-pad,cy-ch+pad*.6+h*.15,cw,ch);g.restore()}
/* světlo k mraku: směr od mraku ke slunci/měsíci */
function b5L(cx,cy,sx,sy){return[sx-cx,sy-cy]}
/* vrstva mraků, která pomalu pluje (periodická na šířku Lw) */
function b5CloudLayer(Lw,y0,h,s,f,dr,list,P0,src){return pbLayer(Lw,y0,h,s,f,(g,Lw)=>{list.forEach(([x,y,w,hh,sd,o])=>{const P=Object.assign({},P0,o||{});pbWrap(Lw,x,w*.75,xx=>{if(src)P.L=b5L(xx,y,src[0],src[1]);b5Cloud(g,xx,y,w,hh,P,sd)})})},{dr})}
/* ---------- mlžný pás (protáhlé měkké skvrny, bez švů) ---------- */
function b5Mist(Lw,h,col,a,seed,dens,str){const c=pbCv(Lw,h),g=c.getContext('2d');qrS(seed);const n=Math.round(Lw/(dens||40));for(let i=0;i<n;i++){const x=qr(0,Lw),y=qr(h*.3,h*.75),r=qr(40,110),sx=str||qr(2.4,4);pbWrap(Lw,x,r*sx,xx=>{g.save();g.translate(xx,y);g.scale(sx,1);const gr=g.createRadialGradient(0,0,0,0,0,r);gr.addColorStop(0,pbA(col,a*qr(.5,1)));gr.addColorStop(1,pbA(col,0));g.fillStyle=gr;g.fillRect(-r,-r,r*2,r*2);g.restore()})}return c}
function b5MistL(Lw,y0,h,f,dr,col,a,seed,dens,str){return{c:b5Mist(Lw,h,col,a,seed,dens,str),Lw,y0,h,f,dr}}
/* ---------- hřeben s okrajovým světlem, stínováním svahů a oparem ---------- */
function b5RidgePts(Lw,o){const pts=[];const st=o.step||3;for(let x=0;x<=Lw+st;x+=st){let n=pbF(x/Lw*o.P,o.P,o.seed,o.oct||5);if(o.sharp)n=Math.pow(1-Math.abs(n*2-1),o.sharp);if(o.mesa)n=Math.min(1,Math.max(0,(n-o.mesa)*(o.mk||4)));if(o.pow)n=Math.pow(n,o.pow);pts.push([x,o.y-o.amp*n])}return pts}
function b5Ridge(g,Lw,Hb,o){const pts=o.pts||b5RidgePts(Lw,o),top=o.y-o.amp;const path=new Path2D();path.moveTo(-4,Hb);pts.forEach(q=>path.lineTo(q[0],q[1]));path.lineTo(Lw+4,Hb);path.closePath();
 g.save();const gr=g.createLinearGradient(0,top,0,o.y+(o.fade||60));gr.addColorStop(0,o.top);gr.addColorStop(1,o.bot);g.fillStyle=gr;g.fill(path);g.clip(path);
 const L=o.L||[.6,-.8],ll=Math.hypot(L[0],L[1]),lx=L[0]/ll,ly=L[1]/ll;
 /* svahy: stín na odvrácené straně, světlo na přivrácené (vyhlazené, s přechodem do ztracena) */
 if(o.lit||o.shd){const sm=[];for(let i=0;i<pts.length;i++){let s=0,n=0;const R=o.sm||7;for(let k=-R;k<=R;k++){const a=pts[Math.max(0,Math.min(pts.length-1,i+k))],b=pts[Math.max(0,Math.min(pts.length-1,i+k+1))];s+=b[1]-a[1];n++}sm.push(s/n)}
  const lh=o.litH||90;for(let i=0;i<pts.length-1;i++){const s=sm[i];if(Math.abs(s)<.08)continue;const facing=(s*lx<0)?1:-1,k=Math.min(1,Math.abs(s)/(o.sk||2.2));const col=facing>0?o.lit:(o.shd||'#000000'),al=(facing>0?(o.litA||.35):(o.shdA||.3))*k;if(!col||al<.01)continue;
   const x=pts[i][0],y=pts[i][1],gg=g.createLinearGradient(0,y,0,y+lh);gg.addColorStop(0,pbA(col,al));gg.addColorStop(1,pbA(col,0));g.fillStyle=gg;g.fillRect(x-.3,y-1,(pts[i+1][0]-x)+.6,lh)}}
 if(o.strata){const S=o.strata;for(let i=0;i<S.n;i++){const yy=top+o.amp*(S.o||.12)+i*S.h;g.strokeStyle=pbA(i%2?(S.c2||'#000000'):(S.c1||'#ffffff'),S.a||.07);g.lineWidth=S.w||3;g.beginPath();for(let x=-6;x<=Lw+6;x+=10)g.lineTo(x,yy+Math.sin(x*.012+i*1.7)*2.5+pbF(x/Lw*9,9,o.seed+i,2)*7);g.stroke()}}
 if(o.tex)pbStrokes(g,0,top,Lw,Hb-top,o.tex,Math.round(Lw*(Hb-top)/(o.td||400)),o.tl||16,o.tw||3,o.ta||0);
 if(o.gr)b5Grain(g,0,top,Lw,Hb-top,o.gr);
 if(o.haze){const hz=g.createLinearGradient(0,o.y-o.amp*(o.hz0==null?.25:o.hz0),0,Hb);hz.addColorStop(0,pbA(o.haze,0));hz.addColorStop(1,pbA(o.haze,o.hazeA||.55));g.fillStyle=hz;g.fillRect(-4,top-4,Lw+8,Hb-top+8)}
 if(o.tint){g.fillStyle=pbA(o.tint,o.tintA||.2);g.fillRect(-4,top-4,Lw+8,Hb-top+8)}
 g.restore();
 /* okrajové světlo po hraně */if(o.rim){const d=o.rimD||3;g.save();g.clip(path);const p2=new Path2D();p2.rect(-10,top-40,Lw+20,Hb-top+80);const sh=new Path2D();sh.moveTo(-4-lx*d,Hb-ly*d);pts.forEach(q=>sh.lineTo(q[0]-lx*d,q[1]-ly*d));sh.lineTo(Lw+4-lx*d,Hb-ly*d);sh.closePath();p2.addPath(sh);g.fillStyle=pbA(o.rim,o.rimA||.8);g.fill(p2,'evenodd');
  if(o.rim2!==0){const d2=d*3.2,p3=new Path2D();p3.rect(-10,top-40,Lw+20,Hb-top+80);const s3=new Path2D();s3.moveTo(-4-lx*d2,Hb-ly*d2);pts.forEach(q=>s3.lineTo(q[0]-lx*d2,q[1]-ly*d2));s3.lineTo(Lw+4-lx*d2,Hb-ly*d2);s3.closePath();p3.addPath(s3);g.fillStyle=pbA(o.rim,(o.rimA||.8)*.22);g.fill(p3,'evenodd')}g.restore()}
 return pts}
function b5Grain(g,x,y,w,h,a){pbTexFill(g,x,y,w,h,a)}
/* vzdušná perspektiva: přebarví už nakreslený obsah vrstvy k barvě oparu (jen tam, kde něco je) */
function b5Atmo(g,y0,y1,col,a0,a1,Lw){g.save();g.globalCompositeOperation='source-atop';const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,pbA(col,a0));gr.addColorStop(1,pbA(col,a1));g.fillStyle=gr;g.fillRect(-10,y0,Lw+20,y1-y0);g.restore()}
/* hvězdy s mléčnou dráhou */
function b5Stars(g,n,yMax,seed,mw){qrS(seed);if(mw){g.save();g.translate(mw.x,mw.y);g.rotate(mw.a);for(let i=0;i<70;i++){const x=qr(-700,700),y=qr(-40,40)*(1-Math.abs(x)/900),r=qr(30,90);const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,pbA(mw.c||'#b8c4ff',qr(.03,.07)));gr.addColorStop(1,pbA(mw.c||'#b8c4ff',0));g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}
  for(let i=0;i<500;i++){const x=qr(-700,700),y=(qr()+qr()-1)*55;g.fillStyle=pbA('#ffffff',qr(.15,.5));g.fillRect(x,y,qr(.5,1.1),qr(.5,1.1))}
  g.restore()}
 for(let i=0;i<n;i++){const x=qr(0,W),y=qr(-330,yMax),r=qr(.5,1.6),t=qr();g.fillStyle=pbA(t<.15?'#ffd8b0':t<.3?'#c8d8ff':'#ffffff',qr(.35,.95)*(1-Math.max(0,(y-yMax*.6)/(yMax*.4+1))*.7));g.beginPath();g.arc(x,y,r*.6,0,7);g.fill();if(r>1.4){g.fillStyle='rgba(255,255,255,.18)';g.fillRect(x-3,y-.3,6,.6);g.fillRect(x-.3,y-3,.6,6)}}}
/* slunce / měsíc s měkkou září */
function b5Sun(g,x,y,r,core,halo,a){pbGlow(g,x,y,r*12,halo,.22*(a||1));pbGlow(g,x,y,r*5,halo,.35*(a||1));pbGlow(g,x,y,r*2,core,.6*(a||1));g.fillStyle=core;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
function b5Moon(g,x,y,r,c,halo){pbGlow(g,x,y,r*10,halo,.12);pbGlow(g,x,y,r*4,halo,.22);pbGlow(g,x,y,r*1.7,c,.35);const mg=g.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);mg.addColorStop(0,'#ffffff');mg.addColorStop(.7,c);mg.addColorStop(1,pbMix(c,'#7a8090',.35));g.fillStyle=mg;g.beginPath();g.arc(x,y,r,0,7);g.fill();
 g.save();g.beginPath();g.arc(x,y,r,0,7);g.clip();[[-.3,-.15,.3],[.3,.25,.22],[.05,.45,.15],[-.42,.38,.13],[.38,-.38,.12],[-.05,-.5,.1]].forEach(q=>{g.fillStyle='rgba(90,100,120,.16)';g.beginPath();g.arc(x+q[0]*r,y+q[1]*r,q[2]*r,0,7);g.fill()});g.restore()}
/* jednotlivé prvky */
function b5Pine(g,x,yb,h,c,seed,rimc,lx){qrS(seed);const n=Math.round(h/9)+4;g.fillStyle=c;g.fillRect(x-h*.02,yb-h*.25,h*.04,h*.25);for(let i=0;i<n;i++){const u=i/n,w=h*.26*(1-u)*qr(.85,1.1)+2,y=yb-h*.12-u*h*.88;g.beginPath();g.moveTo(x-w,y+h*.08);g.quadraticCurveTo(x-w*.3,y+h*.02,x,y-h*.06);g.quadraticCurveTo(x+w*.3,y+h*.02,x+w,y+h*.08);g.closePath();g.fill();if(rimc){g.fillStyle=rimc;g.beginPath();if((lx||1)>0){g.moveTo(x,y-h*.06);g.quadraticCurveTo(x+w*.3,y+h*.02,x+w,y+h*.08);g.lineTo(x+w*.8,y+h*.08);g.quadraticCurveTo(x+w*.25,y+h*.03,x,y-h*.03)}else{g.moveTo(x,y-h*.06);g.quadraticCurveTo(x-w*.3,y+h*.02,x-w,y+h*.08);g.lineTo(x-w*.8,y+h*.08);g.quadraticCurveTo(x-w*.25,y+h*.03,x,y-h*.03)}g.fill();g.fillStyle=c}}}
function b5Saguaro(g,x,yb,h,c,rim,lx,seed){qrS(seed||x|0);const tw=h*.075;g.save();g.lineCap='round';g.lineJoin='round';
 const arm=(sd,y0,l,w2)=>{const ex=x+sd*w2,ay=yb-y0,aw=tw*1.45;g.strokeStyle=c;g.lineWidth=aw;g.beginPath();g.moveTo(x,ay);g.lineTo(ex-sd*aw*.9,ay);g.quadraticCurveTo(ex,ay,ex,ay-aw*.9);g.lineTo(ex,ay-l);g.stroke();
  if(rim){g.strokeStyle=rim;g.lineWidth=aw*.22;g.beginPath();const o=(lx||1)*aw*.32;g.moveTo(ex+o,ay-aw*.7);g.lineTo(ex+o,ay-l);g.stroke()}};
 const A=[];if(qr()<.9)A.push([1,h*qr(.38,.55),h*qr(.22,.36),h*qr(.13,.19)]);if(qr()<.8)A.push([-1,h*qr(.3,.5),h*qr(.18,.32),h*qr(.13,.19)]);A.forEach(q=>arm(q[0],q[1],q[2],q[3]));
 g.strokeStyle=c;g.lineWidth=tw*2;g.beginPath();g.moveTo(x,yb+tw);g.lineTo(x,yb-h+tw);g.stroke();
 if(rim){g.strokeStyle=rim;g.lineWidth=tw*.38;const o=(lx||1)*tw*.55;g.beginPath();g.moveTo(x+o,yb-h+tw*1.2);g.lineTo(x+o,yb);g.stroke()}
 g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=.8;for(let k=-1;k<=1;k+=2){g.beginPath();g.moveTo(x+k*tw*.45,yb-h+tw*1.4);g.lineTo(x+k*tw*.45,yb);g.stroke()}g.restore()}
function b5Rock(g,x,yb,r,c,lit,lx,seed){qrS(seed);const pts=[];const n=9;for(let i=0;i<=n;i++){const a=Math.PI+i/n*Math.PI,rr=r*qr(.75,1.1);pts.push([x+Math.cos(a)*rr*1.5,yb+Math.sin(a)*rr*qr(.8,1.15)])}g.fillStyle=c;g.beginPath();g.moveTo(x-r*1.6,yb);pts.forEach(q=>g.lineTo(q[0],Math.min(yb,q[1])));g.lineTo(x+r*1.6,yb);g.closePath();g.fill();
 if(lit){g.save();g.clip();const gg=g.createLinearGradient(x-(lx||1)*r*1.5,0,x+(lx||1)*r*1.5,0);gg.addColorStop(0,'rgba(0,0,0,0)');gg.addColorStop(.6,'rgba(0,0,0,0)');gg.addColorStop(1,lit);g.fillStyle=gg;g.fillRect(x-r*2,yb-r*2.2,r*4,r*2.3);g.restore()}}
/* světélka okna */
function b5Win(g,x,y,w,h,on,c){g.fillStyle=on?(c||'#ffcf7a'):'rgba(8,10,16,.55)';g.fillRect(x,y,w,h);if(on){pbGlow(g,x+w/2,y+h/2,Math.max(w,h)*2.6,c||'#ffc060',.28);g.fillStyle='rgba(255,250,220,.5)';g.fillRect(x+1,y+1,w*.4,h*.4)}}

/* ---------- koloniální přístavní městečko v noci (měsíc vpravo nahoře) ---------- */
const B5T={wall:['#6e5c48','#4b5e63','#6a4a4e','#737888','#5c5270','#56644c','#7c6650','#5e6a7a'],sh:['#2a4a4c','#3c2e4c','#4c2c26','#24384f','#3c4c2c','#5a3a1e'],moon:'rgba(176,196,232,'};
function b5Shut(g,x,y,w,h,c,lit){g.fillStyle=c;g.fillRect(x,y,w,h);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=.7;for(let yy=y+2.6;yy<y+h-1;yy+=2.6){g.beginPath();g.moveTo(x+1.5,yy);g.lineTo(x+w-1.5,yy);g.stroke();if(lit){g.fillStyle='rgba(255,196,110,.55)';g.fillRect(x+2,yy+.8,w-4,.7)}}
 g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=1;g.strokeRect(x+.5,y+.5,w-1,h-1);g.fillStyle=B5T.moon+'.22)';g.fillRect(x+w-1.4,y,1.4,h)}
function b5Window(g,cx,y,w,h,o){const x=cx-w/2,arch=o.arch,lit=o.lit,P=new Path2D();if(arch){P.moveTo(x,y+h);P.lineTo(x,y+w/2);P.arc(cx,y+w/2,w/2,Math.PI,0);P.lineTo(x+w,y+h);P.closePath()}else P.rect(x,y,w,h);
 g.save();g.strokeStyle='rgba(230,220,200,.32)';g.lineWidth=3.4;g.stroke(P);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1;g.stroke(P);
 if(lit&&o.shut!='closed'){const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#ffe6a8');gr.addColorStop(1,'#ff9844');g.fillStyle=gr;g.fill(P);g.save();g.clip(P);g.fillStyle='rgba(160,70,30,.55)';g.fillRect(x,y,w*.24,h);g.fillRect(x+w*.76,y,w*.24,h);if(o.fig!=null){g.fillStyle='rgba(70,30,12,.7)';g.beginPath();g.arc(cx+o.fig,y+h*.42,w*.15,0,7);g.fill();g.fillRect(cx+o.fig-w*.2,y+h*.56,w*.4,h*.5)}g.restore()}
 else{g.fillStyle='#10161f';g.fill(P);g.save();g.clip(P);g.fillStyle=B5T.moon+'.24)';g.beginPath();g.moveTo(x+w*.5,y);g.lineTo(x+w,y);g.lineTo(x+w,y+h*.4);g.closePath();g.fill();g.restore()}
 g.strokeStyle='rgba(28,18,12,.9)';g.lineWidth=1.1;g.beginPath();g.moveTo(cx,y+(arch?1:0));g.lineTo(cx,y+h);g.moveTo(x,y+h*.52);g.lineTo(x+w,y+h*.52);g.stroke();
 g.fillStyle='rgba(225,215,195,.5)';g.fillRect(x-3,y+h,w+6,2.4);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-3,y+h+2.4,w+6,1.6);
 if(o.shut){const sw=w*.5;if(o.shut=='open'){b5Shut(g,x-sw-1.5,y,sw,h,o.sc);b5Shut(g,x+w+1.5,y,sw,h,o.sc)}else if(o.shut=='half'){b5Shut(g,x-sw-1.5,y,sw,h,o.sc);b5Shut(g,x+sw,y,sw,h,o.sc,lit)}else{b5Shut(g,x,y,sw,h,o.sc,lit);b5Shut(g,x+sw,y,sw,h,o.sc,lit)}}
 if(lit)pbGlow(g,cx,y+h*.5,Math.max(w,h)*1.7,'#ffb860',o.shut=='closed'?.1:.24);g.restore()}
function b5Balc(g,x,y,w,pots){g.save();g.fillStyle='#1c1612';g.fillRect(x-3,y,w+6,4);g.fillStyle=B5T.moon+'.35)';g.fillRect(x-3,y,w+6,1);
 g.fillStyle='#1c1612';[x+5,x+w-9].forEach(bx=>{g.beginPath();g.moveTo(bx,y+4);g.lineTo(bx+5,y+4);g.lineTo(bx+2.5,y+11);g.closePath();g.fill()});
 g.strokeStyle='#120e0c';g.lineWidth=1.5;g.beginPath();g.moveTo(x-2,y-15);g.lineTo(x+w+2,y-15);g.stroke();g.lineWidth=.85;for(let bx=x;bx<=x+w+.1;bx+=3.4){g.beginPath();g.moveTo(bx,y-15);g.lineTo(bx,y);g.stroke()}
 g.lineWidth=.9;for(let bx=x+6;bx<x+w-4;bx+=12){g.beginPath();g.arc(bx,y-8,3,0,7);g.stroke()}g.strokeStyle=B5T.moon+'.4)';g.lineWidth=.8;g.beginPath();g.moveTo(x-2,y-15.9);g.lineTo(x+w+2,y-15.9);g.stroke();
 if(pots)for(let k=0;k<pots;k++){const px=x+6+qr(0,w-12);g.fillStyle='#5a2e1e';g.beginPath();g.moveTo(px-4,y-15);g.lineTo(px+4,y-15);g.lineTo(px+3,y-21);g.lineTo(px-3,y-21);g.closePath();g.fill();g.fillStyle='#1e3220';for(let j=0;j<5;j++){g.beginPath();g.arc(px+qr(-5,5),y-23-qr(0,5),qr(2,3.4),0,7);g.fill()}g.fillStyle='rgba(200,80,90,.7)';for(let j=0;j<3;j++)g.fillRect(px+qr(-4,4),y-26-qr(0,3),1.6,1.6)}g.restore()}
function b5Lantern(g,x,y,side){g.save();g.strokeStyle='#120e0c';g.lineWidth=1.6;g.beginPath();g.moveTo(x,y);g.lineTo(x+side*14,y);g.lineTo(x+side*14,y+5);g.stroke();g.beginPath();g.moveTo(x,y+8);g.quadraticCurveTo(x+side*4,y+2,x+side*12,y);g.stroke();
 const lx=x+side*14;g.fillStyle='#1a1410';g.fillRect(lx-4,y+5,8,2);g.fillStyle='#ffd88a';g.fillRect(lx-3,y+7,6,8);g.fillStyle='#1a1410';g.fillRect(lx-4,y+15,8,2);pbGlow(g,lx,y+11,36,'#ffb860',.42);g.restore();return[lx,y+11]}
function b5TileRoof(g,x,top,w,rh,o){const P=new Path2D();P.moveTo(x-9,top);P.lineTo(x+(o.hip?14:-2),top-rh);P.lineTo(x+w-(o.hip?14:-2),top-rh);P.lineTo(x+w+9,top);P.closePath();g.save();const gr=g.createLinearGradient(0,top-rh,0,top);gr.addColorStop(0,'#4e2a22');gr.addColorStop(1,'#331813');g.fillStyle=gr;g.fill(P);g.clip(P);
 for(let yy=top-rh+4;yy<top;yy+=5){g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.2;g.beginPath();for(let xx=x-10;xx<x+w+12;xx+=6){g.moveTo(xx,yy);g.quadraticCurveTo(xx+3,yy+2.6,xx+6,yy)}g.stroke();g.strokeStyle='rgba(255,170,130,.09)';g.lineWidth=1;g.beginPath();g.moveTo(x-10,yy-1.5);g.lineTo(x+w+12,yy-1.5);g.stroke()}
 const mg=g.createLinearGradient(x,0,x+w,0);mg.addColorStop(0,'rgba(0,0,0,.25)');mg.addColorStop(.6,'rgba(0,0,0,0)');mg.addColorStop(1,B5T.moon+'.18)');g.fillStyle=mg;g.fillRect(x-10,top-rh,w+20,rh);g.restore();
 g.strokeStyle=B5T.moon+'.55)';g.lineWidth=1.4;g.beginPath();g.moveTo(x+(o.hip?14:-2),top-rh);g.lineTo(x+w-(o.hip?14:-2),top-rh);if(o.hip)g.lineTo(x+w+9,top);g.stroke();
 const eg=g.createLinearGradient(0,top,0,top+9);eg.addColorStop(0,'rgba(0,0,0,.45)');eg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=eg;g.fillRect(x,top,w,9);
 g.fillStyle='#2a1612';for(let xx=x-6;xx<x+w+8;xx+=6){g.beginPath();g.arc(xx,top,2.2,0,Math.PI);g.fill()}}
function b5Parapet(g,x,top,w,wall,o){g.save();g.fillStyle=wall;const P=new Path2D();P.moveTo(x,top);P.lineTo(x,top-12);if(o.gable){const c=x+w/2,gw=Math.min(w*.4,70);P.lineTo(c-gw,top-12);P.bezierCurveTo(c-gw*.6,top-12,c-gw*.55,top-30,c-gw*.25,top-30);P.quadraticCurveTo(c-gw*.2,top-40,c,top-42);P.quadraticCurveTo(c+gw*.2,top-40,c+gw*.25,top-30);P.bezierCurveTo(c+gw*.55,top-30,c+gw*.6,top-12,c+gw,top-12)}P.lineTo(x+w,top-12);P.lineTo(x+w,top);P.closePath();g.fill(P);
 g.strokeStyle='rgba(235,225,205,.45)';g.lineWidth=2;g.stroke(P);g.strokeStyle=B5T.moon+'.5)';g.lineWidth=1;g.stroke(P);
 if(o.gable){const c=x+w/2;g.fillStyle='#1a1410';g.beginPath();g.arc(c,top-24,5,0,7);g.fill();if(o.bell){g.fillStyle='#a8823a';g.beginPath();g.arc(c,top-23,3,Math.PI,0);g.fill()}}
 g.fillStyle='rgba(230,220,200,.38)';g.fillRect(x-4,top-2,w+8,4);g.fillStyle='rgba(0,0,0,.4)';g.fillRect(x-4,top+2,w+8,3);g.restore()}
function b5Wall(g,x,top,w,h,col){const base=top+h;g.fillStyle=col;g.fillRect(x,top,w,h);const vg=g.createLinearGradient(0,top,0,base);vg.addColorStop(0,'rgba(170,190,225,.1)');vg.addColorStop(.6,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.42)');g.fillStyle=vg;g.fillRect(x,top,w,h);
 for(let i=0;i<Math.round(w*h/1400);i++){const sx=x+qr(0,w),sy=top+qr(0,h),r=qr(6,24),gr=g.createRadialGradient(sx,sy,0,sx,sy,r);gr.addColorStop(0,qr()<.65?'rgba(0,0,0,.11)':'rgba(255,245,225,.06)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(sx-r,sy-r,r*2,r*2)}
 g.save();g.beginPath();g.rect(x,top,w,h);g.clip();pbStrokes(g,x,top,w,h,['#000000','#2a2a2a','#ffffff'],Math.round(w*h/1100),8,1.6,1.5);g.restore();
 const rg=g.createLinearGradient(x+w-14,0,x+w,0);rg.addColorStop(0,'rgba(176,196,232,0)');rg.addColorStop(1,'rgba(176,196,232,.2)');g.fillStyle=rg;g.fillRect(x+w-14,top,14,h);const lg=g.createLinearGradient(x,0,x+16,0);lg.addColorStop(0,'rgba(0,0,0,.28)');lg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=lg;g.fillRect(x,top,16,h)}
function b5Door(g,cx,base,w,h,o){g.save();const x=cx-w/2,P=new Path2D();P.moveTo(x,base);P.lineTo(x,base-h+w/2);P.arc(cx,base-h+w/2,w/2,Math.PI,0);P.lineTo(x+w,base);P.closePath();g.strokeStyle='rgba(230,220,200,.3)';g.lineWidth=4;g.stroke(P);
 if(o&&o.open){g.fillStyle='#ffb860';g.fill(P);g.save();g.clip(P);const ig=g.createLinearGradient(0,base-h,0,base);ig.addColorStop(0,'#ffd890');ig.addColorStop(1,'#b8602a');g.fillStyle=ig;g.fillRect(x,base-h,w,h);g.fillStyle='#3a2414';g.fillRect(x,base-h,w*.42,h);g.restore();pbGlow(g,cx,base-h*.4,w*1.6,'#ffb050',.3)}
 else{g.fillStyle='#2e1e14';g.fill(P);g.save();g.clip(P);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=1;for(let xx=x+3;xx<x+w;xx+=4){g.beginPath();g.moveTo(xx,base-h);g.lineTo(xx,base);g.stroke()}g.fillStyle=B5T.moon+'.15)';g.fillRect(x+w-3,base-h,3,h);g.restore();g.fillStyle='#c8a050';g.fillRect(cx-3,base-h*.45,1.6,3);g.fillRect(cx+1.5,base-h*.45,1.6,3)}g.restore()}
/* typy domů; vrací světla (lucerny, okna) a komíny */
function b5Casa(g,x,w,nf,sd,out,o){qrS(sd);o=o||{};const fh=46,h=nf*fh+14,base=392,top=base-h,wall=o.wall||B5T.wall[(qr()*B5T.wall.length)|0],sc=B5T.sh[(qr()*B5T.sh.length)|0];
 const roofT=o.roof||(qr()<.5?'tile':'par');if(roofT=='tile')b5TileRoof(g,x,top,w,qr(16,26),{hip:qr()<.6});
 b5Wall(g,x,top,w,h,wall);if(roofT=='par')b5Parapet(g,x,top,w,wall,{gable:w>130&&qr()<.55,bell:qr()<.3});
 g.fillStyle='rgba(235,225,205,.3)';g.fillRect(x,top,4,h);g.fillRect(x+w-4,top,4,h);for(let k=1;k<nf;k++){const yy=base-k*fh-2;g.fillStyle='rgba(235,225,205,.3)';g.fillRect(x-2,yy,w+4,3);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(x-2,yy+3,w+4,2)}
 /* přízemí */const gf=base-fh;const arc=o.arcade!=null?o.arcade:(w>150&&qr()<.5);
 if(arc){const n=Math.max(2,Math.round((w-10)/46)),aw=(w-10)/n;for(let i=0;i<n;i++){const ax=x+5+i*aw,cx=ax+aw/2,iw=aw-10,P=new Path2D();P.moveTo(cx-iw/2,base);P.lineTo(cx-iw/2,gf+14+iw/2);P.arc(cx,gf+14+iw/2,iw/2,Math.PI,0);P.lineTo(cx+iw/2,base);P.closePath();const lit=qr()<.5;g.fillStyle=lit?'#2a1a10':'#0c0a0c';g.fill(P);
   if(lit){g.save();g.clip(P);const ig=g.createRadialGradient(cx,base-14,2,cx,base-14,iw);ig.addColorStop(0,'rgba(255,190,100,.75)');ig.addColorStop(1,'rgba(255,150,60,0)');g.fillStyle=ig;g.fillRect(cx-iw,gf,iw*2,fh);g.fillStyle='rgba(40,22,10,.85)';g.fillRect(cx-iw*.4,base-16,iw*.8,10);g.restore();pbGlow(g,cx,base-12,iw*1.4,'#ffb050',.2)}
   g.strokeStyle='rgba(235,225,205,.35)';g.lineWidth=2;g.stroke(P);g.fillStyle='rgba(235,225,205,.32)';g.fillRect(ax,gf+12,3,fh-12);}}
 else{const dx=x+w*(qr()<.5?.28:.72);b5Door(g,dx,base,22,38,{open:qr()<.35});const sx=dx<x+w/2?x+w*.66:x+w*.3,sw=Math.min(54,w*.32),lit=qr()<.7;g.fillStyle='rgba(0,0,0,.4)';g.fillRect(sx-sw/2-3,gf+10,sw+6,28);if(lit){const sg=g.createLinearGradient(0,gf+12,0,gf+36);sg.addColorStop(0,'#ffe0a0');sg.addColorStop(1,'#e88a40');g.fillStyle=sg}else g.fillStyle='#121820';g.fillRect(sx-sw/2,gf+12,sw,24);
  g.fillStyle='rgba(40,20,10,.8)';if(lit)for(let k=0;k<5;k++){const bx=sx-sw/2+5+k*(sw-10)/4;g.fillRect(bx-1.5,gf+26,3,10);g.fillRect(bx-.6,gf+22,1.2,4)}g.strokeStyle='rgba(28,18,12,.9)';g.lineWidth=1.2;g.strokeRect(sx-sw/2,gf+12,sw,24);if(lit)pbGlow(g,sx,gf+24,sw,'#ffb050',.25);
  if(!o.nosign&&(o.sign||qr()<.6)){const t=o.sign||['ULTRAMARINOS','BOTICA','SASTRERÍA','PANADERÍA','CORREOS','HERRERÍA','FARMACIA'][(qr()*7)|0];g.font='700 8px Georgia';const tw=g.measureText(t).width+12;g.fillStyle='#2a1c12';g.fillRect(sx-tw/2,gf+1,tw,10);g.strokeStyle='rgba(200,170,110,.6)';g.lineWidth=.8;g.strokeRect(sx-tw/2+1,gf+2,tw-2,8);g.fillStyle='#e0c890';g.textAlign='center';g.fillText(t,sx,gf+9)}
  if(qr()<.6)out.lights.push(b5Lantern(g,dx+(dx<x+w/2?14:-14),gf+6,dx<x+w/2?1:-1))}
 /* patra */const n=Math.max(2,Math.floor((w-16)/50));const longB=qr()<.45;
 for(let k=1;k<nf;k++){const fy=base-(k+1)*fh;for(let i=0;i<n;i++){const cx=x+w*(i+.5)/n,lit=qr()<.42,sh=['open','closed','half'][(qr()*3)|0],ww=17,wh=28;b5Window(g,cx,fy+10,ww,wh,{lit,arch:k==nf-1&&qr()<.5,shut:sh,sc,fig:lit&&qr()<.25?qr(-3,3):null});if(!longB&&qr()<.3)b5Balc(g,cx-ww/2-6,fy+10+wh+2,ww+12,qr()<.5?1:0)}
  if(longB&&k==1)b5Balc(g,x+10,base-fh-2,w-20,qr()<.6?2:0)}
 /* okapní roura, komín */g.fillStyle='rgba(20,16,14,.8)';const px=qr()<.5?x+6:x+w-8;g.fillRect(px,top+4,2.4,h-6);g.fillRect(px-1.5,base-6,5.4,6);
 if(qr()<.6){const cx=x+w*(qr()<.5?qr(.12,.26):qr(.74,.88)),ct=top-(roofT=='tile'?26:12)-qr(14,24);g.fillStyle='#2a2422';g.fillRect(cx-6,ct,12,top-ct+(roofT=='tile'?-4:0));g.fillStyle='#3a3230';g.fillRect(cx-8,ct-3,16,4);g.fillStyle=B5T.moon+'.3)';g.fillRect(cx+4,ct,2,top-ct-6);out.chim.push([cx,ct-3])}
 return h}
function b5Almacen(g,x,w,sd,out){qrS(sd);const h=qr(120,150),base=392,top=base-h,rh=w*.32,cx=x+w/2;
 const P=new Path2D();P.moveTo(x,base);P.lineTo(x,top);P.lineTo(cx,top-rh);P.lineTo(x+w,top);P.lineTo(x+w,base);P.closePath();g.save();g.fillStyle='#3a2a20';g.fill(P);g.clip(P);
 for(let xx=x;xx<x+w;xx+=7){g.fillStyle=((xx-x)/7|0)%2?'#3e2c21':'#33251c';g.fillRect(xx,top-rh,7,h+rh);g.fillStyle='rgba(0,0,0,.45)';g.fillRect(xx,top-rh,1,h+rh)}
 for(let i=0;i<Math.round(w/8);i++){const sx=x+qr(0,w),sy=top-rh+qr(0,h+rh),r=qr(8,26),gr=g.createRadialGradient(sx,sy,0,sx,sy,r);gr.addColorStop(0,'rgba(0,0,0,.14)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(sx-r,sy-r,r*2,r*2)}
 const vg=g.createLinearGradient(0,top-rh,0,base);vg.addColorStop(0,'rgba(170,190,225,.08)');vg.addColorStop(1,'rgba(0,0,0,.45)');g.fillStyle=vg;g.fillRect(x,top-rh,w,h+rh);const rg=g.createLinearGradient(x+w-14,0,x+w,0);rg.addColorStop(0,'rgba(176,196,232,0)');rg.addColorStop(1,'rgba(176,196,232,.2)');g.fillStyle=rg;g.fillRect(x+w-14,top-rh,14,h+rh);g.restore();
 g.strokeStyle='#1e140e';g.lineWidth=5;g.beginPath();g.moveTo(x-10,top+3);g.lineTo(cx,top-rh-3);g.lineTo(x+w+10,top+3);g.stroke();g.strokeStyle=B5T.moon+'.55)';g.lineWidth=1.4;g.beginPath();g.moveTo(cx,top-rh-5.5);g.lineTo(x+w+10,top+.5);g.stroke();
 /* velká vrata */const dw=w*.46,dh=62,dx=cx-dw/2,open=qr()<.45;g.fillStyle='#120c08';g.fillRect(dx-3,base-dh-3,dw+6,dh+3);if(open){const ig=g.createLinearGradient(0,base-dh,0,base);ig.addColorStop(0,'#ffcc80');ig.addColorStop(1,'#a8541e');g.fillStyle=ig;g.fillRect(dx+dw*.5,base-dh,dw*.5,dh);g.fillStyle='rgba(60,30,12,.85)';g.fillRect(dx+dw*.58,base-22,16,22);g.fillRect(dx+dw*.62,base-36,12,14);g.fillRect(dx+dw*.82,base-18,14,18);pbGlow(g,dx+dw*.75,base-dh*.4,dw*.9,'#ffb050',.32)}
 [[dx,dw*.5],[dx+dw*.5,dw*.5]].forEach(([bx,bw],j)=>{if(open&&j==1)return;g.fillStyle='#4a3424';g.fillRect(bx+1,base-dh,bw-2,dh);g.strokeStyle='#2a1c12';g.lineWidth=2.4;g.beginPath();g.moveTo(bx+3,base-dh+3);g.lineTo(bx+bw-3,base-3);g.moveTo(bx+bw-3,base-dh+3);g.lineTo(bx+3,base-3);g.stroke();g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=1;g.strokeRect(bx+1.5,base-dh+.5,bw-3,dh-1)});
 /* štítek */const t=['ALMACÉN','CARGA Y DESCARGA','PESCADO FRESCO','LONJA','ADUANA','N° '+((qr()*9|0)+2)][(qr()*6)|0];g.font='700 9px Georgia';const tw=Math.min(w-16,g.measureText(t).width+14);g.fillStyle='#d8c8a0';g.fillRect(cx-tw/2,base-dh-20,tw,13);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(cx-tw/2,base-dh-8,tw,1.5);g.fillStyle='#3a2414';g.textAlign='center';g.fillText(t,cx,base-dh-10.5,tw-6);
 /* půdní dvířka s kladkou */const ly=top-rh*.35;g.fillStyle='#120c08';g.fillRect(cx-11,ly-4,22,26);const ll=qr()<.4;if(ll){g.fillStyle='#ffc070';g.fillRect(cx-9,ly-2,18,22);pbGlow(g,cx,ly+8,30,'#ffb050',.3)}else{g.fillStyle='#4a3424';g.fillRect(cx-9,ly-2,18,22)}
 g.fillStyle='#24180e';g.fillRect(cx-3,ly-14,40,6);g.fillStyle='#4a4e56';g.beginPath();g.arc(cx+32,ly-6,4.4,0,7);g.fill();g.strokeStyle='#8a7a5a';g.lineWidth=1;g.beginPath();g.moveTo(cx+36,ly-6);const rl=qr(40,80);g.lineTo(cx+36,ly-6+rl);g.stroke();g.fillStyle='#5a4028';g.fillRect(cx+28,ly-6+rl,16,13);g.strokeStyle='rgba(0,0,0,.5)';g.strokeRect(cx+28.5,ly-5.5+rl,15,12);g.fillStyle=B5T.moon+'.25)';g.fillRect(cx+42,ly-6+rl,2,13);
 /* okno vedle */for(const ox of [x+12,x+w-26])if(qr()<.7){const lit=qr()<.45;g.fillStyle='#120c08';g.fillRect(ox-1,base-dh-6-30,16,22);g.fillStyle=lit?'#ffc878':'#141a22';g.fillRect(ox+1,base-dh-4-30,12,18);if(lit)pbGlow(g,ox+7,base-dh-25,22,'#ffb050',.3)}
 return h+rh}
function b5Torre(g,x,w,sd,out){qrS(sd);const h=qr(230,250),base=392,top=base-h,cx=x+w/2,wall='#7a7686';b5Wall(g,x,top,w,h,wall);
 for(const yy of [base-80,base-150,top+46]){g.fillStyle='rgba(235,225,205,.38)';g.fillRect(x-4,yy,w+8,4);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-4,yy+4,w+8,3)}
 b5Door(g,cx,base,20,40,{open:false});b5Window(g,cx,base-138,12,24,{lit:qr()<.5,arch:true});
 /* hodiny */const cy=base-120+0;g.fillStyle='rgba(235,225,205,.5)';g.beginPath();g.arc(cx,base-106,12,0,7);g.fill();g.fillStyle='#f4e8c4';g.beginPath();g.arc(cx,base-106,10,0,7);g.fill();pbGlow(g,cx,base-106,22,'#ffe0a0',.35);g.strokeStyle='#2a1c12';g.lineWidth=1.3;g.beginPath();g.moveTo(cx,base-106);g.lineTo(cx,base-113);g.moveTo(cx,base-106);g.lineTo(cx+5,base-104);g.stroke();
 /* zvonice */const by=top+6,bw=w-16,P=new Path2D();P.moveTo(cx-bw/2,top+42);P.lineTo(cx-bw/2,by+bw/2);P.arc(cx,by+bw/2,bw/2,Math.PI,0);P.lineTo(cx+bw/2,top+42);P.closePath();const bg=g.createRadialGradient(cx,top+26,2,cx,top+26,bw);bg.addColorStop(0,'#5a3a1e');bg.addColorStop(1,'#140e0a');g.fillStyle=bg;g.fill(P);g.fillStyle='#b08838';g.beginPath();g.moveTo(cx-8,top+34);g.quadraticCurveTo(cx-8,top+18,cx,top+16);g.quadraticCurveTo(cx+8,top+18,cx+8,top+34);g.closePath();g.fill();g.fillStyle='rgba(255,230,160,.45)';g.fillRect(cx+3,top+20,2,12);g.strokeStyle='rgba(235,225,205,.4)';g.lineWidth=2.4;g.stroke(P);
 /* kopule a kříž */g.fillStyle='#3e4a5e';g.beginPath();g.moveTo(x-4,top);g.quadraticCurveTo(x-2,top-26,cx,top-30);g.quadraticCurveTo(x+w+2,top-26,x+w+4,top);g.closePath();g.fill();g.strokeStyle=B5T.moon+'.6)';g.lineWidth=1.5;g.beginPath();g.moveTo(cx,top-30);g.quadraticCurveTo(x+w+2,top-26,x+w+4,top);g.stroke();
 g.fillStyle='#2a2a30';g.fillRect(cx-1.5,top-52,3,24);g.fillRect(cx-7,top-46,14,3);g.fillStyle=B5T.moon+'.5)';g.fillRect(cx+.5,top-52,1,24);return h+52}
function b5Taberna(g,x,w,sd,out){const h=b5Casa(g,x,w,2,sd,out,{arcade:false,nosign:true,roof:'tile'});qrS(sd+3);const base=392,gf=base-46;
 /* markýza */const ax=x+8,aw=w-16;for(let i=0;i<aw;i+=10){g.fillStyle=(i/10)%2?'#5a2a2a':'#8a7a68';g.beginPath();g.moveTo(ax+i,gf+2);g.lineTo(ax+i+10,gf+2);g.lineTo(ax+i+12,gf+16);g.lineTo(ax+i+2,gf+16);g.closePath();g.fill()}g.fillStyle='rgba(0,0,0,.35)';g.fillRect(ax+2,gf+16,aw,2);g.strokeStyle=B5T.moon+'.4)';g.lineWidth=1;g.beginPath();g.moveTo(ax,gf+2);g.lineTo(ax+aw,gf+2);g.stroke();
 /* vývěsní štít */const sx=x+w-4;g.strokeStyle='#120e0c';g.lineWidth=1.8;g.beginPath();g.moveTo(sx,gf-18);g.lineTo(sx+26,gf-18);g.moveTo(sx,gf-8);g.quadraticCurveTo(sx+10,gf-16,sx+22,gf-18);g.stroke();g.beginPath();g.moveTo(sx+8,gf-18);g.lineTo(sx+8,gf-12);g.moveTo(sx+22,gf-18);g.lineTo(sx+22,gf-12);g.stroke();
 g.fillStyle='#4a3020';g.beginPath();g.ellipse(sx+15,gf-2,13,10,0,0,7);g.fill();g.strokeStyle='#c8a050';g.lineWidth=1.2;g.stroke();g.fillStyle='#e8d090';g.font='700 6px Georgia';g.textAlign='center';g.fillText('TABERNA',sx+15,gf-.5);
 /* sudy */for(const bx of [x+12,x+26]){g.fillStyle='#4a3020';g.beginPath();g.ellipse(bx,base-9,6.5,9,0,0,7);g.fill();g.strokeStyle='#1a120c';g.lineWidth=1.1;g.beginPath();g.moveTo(bx-6,base-14);g.lineTo(bx+6,base-14);g.moveTo(bx-6,base-4);g.lineTo(bx+6,base-4);g.stroke()}
 out.lights.push(b5Lantern(g,x+w*.5,gf-10,1));return h}
function b5PortTown(g,Lw,seed){qrS(seed);const out={lights:[],chim:[],lamps:[]};let x=6,i=0;const tower=[Math.round(Lw*.27),Math.round(Lw*.74)];
 while(x<Lw-60){let kind,w;if(tower.some(t=>t>=x&&t<x+120)){kind='torre';w=58}else{const r=qr();kind=r<.56?'casa':r<.8?'alm':'tab';w=kind=='alm'?qr(130,175):kind=='tab'?qr(130,170):qr(120,230)}
  if(x+w>Lw-20){w=Lw-20-x;if(w<110)break;if(kind=='torre')kind='casa'}const sd=seed*31+i*17;
  if(kind=='casa')b5Casa(g,x,w,2+((qr()*3)|0),sd,out);else if(kind=='alm')b5Almacen(g,x,w,sd,out);else if(kind=='tab')b5Taberna(g,x,w,sd,out);else b5Torre(g,x,w,sd,out);
  qrS(sd+99);const gap=qr()<.25?qr(60,120):qr(10,30);if(gap>40&&x+w+gap/2<Lw-10)out.lamps.push(x+w+gap/2);x+=w+gap;i++}
 return out}

/* =========================================================
   1) PŘÍSTAV – noc, úplněk, mlha nad zálivem
   ========================================================= */
PBB.port=function(){const MO=[700,104];Object.assign(K3R.port||{},{x:MO[0],y:MO[1]});
 PB.sky=b5Sky([[0,'#02050d'],[.3,'#08122a'],[.55,'#142744'],[.74,'#24405e'],[.88,'#3e5672'],[1,'#6a6672']],g=>{
  b5Stars(g,260,250,3,{x:300,y:-60,a:.35,c:'#b0c4ff'});
  const hg=g.createLinearGradient(0,240,0,400);hg.addColorStop(0,'rgba(220,150,100,0)');hg.addColorStop(1,'rgba(220,150,100,.16)');g.fillStyle=hg;g.fillRect(0,240,W,160);
  b5Moon(g,MO[0],MO[1],32,'#eef2f6','#9fb6d6');
  const NP={type:'cu',top:'#3c4e70',bot:'#1e2a44',hi:'#b4c6e6',hiA:.7,hiP:2,sh:'#0a1020',shA:.5,rim:'#eaf0ff',rimA:.8,a:.9,k:.06};
  [[150,40,360,70,11],[920,10,300,60,12],[470,-60,280,50,13]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},NP,{L:b5L(x,y,MO[0],MO[1])}),s));
  [[560,170,520,34,14],[90,210,380,26,15],[880,200,420,30,16]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},NP,{type:'st',a:.7,L:b5L(x,y,MO[0],MO[1])}),s))});
 /* plující mraky */
 PB.L.push(b5CloudLayer(2600,-120,330,.6,.02,.05,[[200,60,420,64,21],[1000,20,360,56,22],[1700,80,460,70,23],[2300,40,300,50,24]],{type:'cu',top:'#3c4e70',bot:'#1e2a44',hi:'#b4c6e6',hiA:.65,hiP:2,sh:'#0a1020',shA:.5,rim:'#eaf0ff',rimA:.7,a:.86,k:.06},[MO[0]+600,MO[1]]));
 /* vzdálené pobřeží s městem a majákem */
 const L1=pbLayer(1920,200,240,.5,.03,(g,Lw)=>{b5Ridge(g,Lw,440,{y:338,amp:62,P:6,seed:5,top:'#1a2840',bot:'#22324a',lit:'#6a84aa',litA:.28,shd:'#0a1220',shdA:.3,L:[.3,-1],rim:'#8aa4cc',rimA:.5,rimD:1.5,haze:'#3a5070',hazeA:.55,tex:['#2a3a52','#16202e'],td:900});
  const pts=b5RidgePts(Lw,{y:338,amp:62,P:6,seed:5,oct:5}),ry=x=>pts[Math.min(pts.length-1,Math.max(0,Math.round(((x%Lw)+Lw)%Lw/3)))][1];qrS(9);
  for(const cx of [260,820,1180]){for(let k=0;k<26;k++){const x=cx+qr(-140,140),w=qr(6,14),h=qr(5,13),yb=Math.min(352,ry(x)+qr(6,26));pbWrap(Lw,x,w,xx=>{g.fillStyle='#1a2638';g.fillRect(xx,yb-h,w,h);g.fillStyle='#22304a';g.beginPath();g.moveTo(xx-1,yb-h);g.lineTo(xx+w/2,yb-h-4);g.lineTo(xx+w+1,yb-h);g.fill();if(qr()<.6){g.fillStyle=pbA('#ffd090',qr(.6,.95));g.fillRect(xx+w*.3,yb-h*.6,1.6,1.6);pbGlow(g,xx+w*.3,yb-h*.6,5,'#ffc070',.3)}})}}
  {const cx=820,yb=Math.min(350,ry(820)+18);g.fillStyle='#1a2638';g.fillRect(cx-16,yb-20,32,20);g.fillRect(cx-22,yb-34,8,34);g.fillRect(cx+14,yb-34,8,34);g.beginPath();g.arc(cx,yb-20,11,Math.PI,0);g.fill();g.fillRect(cx-.8,yb-38,1.6,8);g.fillRect(cx-3,yb-35,6,1.4);g.fillStyle='rgba(150,175,215,.4)';g.fillRect(cx+20,yb-34,2,34);g.fillStyle='#ffd090';g.fillRect(cx-2,yb-12,4,6);pbGlow(g,cx,yb-9,10,'#ffc070',.4)}
  for(let i=0;i<70;i++){const x=qr(0,Lw),y=Math.min(354,ry(x)+qr(8,30)),c=qr();g.fillStyle=pbA(c<.7?'#ffd090':c<.9?'#fff0d0':'#ff9a6a',qr(.35,.8));g.fillRect(x,y,qr(1,1.8),1.2)}
  g.fillStyle='#14202e';g.beginPath();g.moveTo(1488,342);g.lineTo(1495,262);g.lineTo(1513,262);g.lineTo(1520,342);g.fill();g.fillStyle='#8a2a24';g.fillRect(1493,290,22,7);g.fillRect(1491,314,26,7);g.fillStyle='#1a2634';g.fillRect(1492,250,24,12);g.fillStyle='#fff0b0';g.fillRect(1497,252,14,9);pbGlow(g,1504,256,34,'#fff2b0',.55)},
  {post(L){for(const sx of pbSX(L,1504,900)){const a=T*.018,ly=256;X.save();X.globalCompositeOperation='lighter';const c=Math.cos(a),g=X.createLinearGradient(sx,ly,sx+c*700,ly);g.addColorStop(0,'rgba(255,240,180,'+(.12+.12*Math.abs(c))+')');g.addColorStop(1,'rgba(255,240,180,0)');X.fillStyle=g;X.beginPath();X.moveTo(sx,ly);X.lineTo(sx+c*800,ly+Math.sin(a)*40-30*Math.abs(c)-6);X.lineTo(sx+c*800,ly+Math.sin(a)*40+30*Math.abs(c)+6);X.closePath();X.fill();X.restore()}}});
 PB.L.push(L1);
 /* záliv s měsíční cestou */
 PB.L.push(pbLayer(1920,330,120,.5,.05,(g,Lw)=>{const gr=g.createLinearGradient(0,340,0,450);gr.addColorStop(0,'#2c4060');gr.addColorStop(.3,'#1a2a42');gr.addColorStop(1,'#0a121e');g.fillStyle=gr;g.fillRect(0,338,Lw,112);qrS(13);for(let i=0;i<700;i++){const y=qr(342,450),k=(y-342)/108;g.fillStyle=pbA(qr()<.5?'#8aa6c8':'#04080e',qr(.05,.2));g.fillRect(qr(0,Lw),y,qr(6,26)*(.4+k),1+k*.6)}
  for(let i=0;i<9;i++){const x=qr(0,Lw),y=qr(352,372);pbWrap(Lw,x,20,xx=>{g.fillStyle='#0c141e';g.fillRect(xx-10,y-3,20,3);g.fillRect(xx-1,y-16,1.4,13);g.fillStyle='#ffcf7a';g.fillRect(xx-1.5,y-18,3,3);pbGlow(g,xx,y-17,10,'#ffc070',.5);g.fillStyle='rgba(255,200,120,.25)';g.fillRect(xx-1,y+1,2,10)})}},
  {post(L){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<34;i++){const y=342+i*3.1,w=(8+i*2)*(.55+.45*Math.sin(T*.06+i*1.7)),xo=Math.sin(T*.04+i*.9)*(3+i*.25);X.fillStyle='rgba(220,232,255,'+Math.max(0,.34-i*.0095)+')';X.fillRect(MO[0]-w/2+xo,y,w,1.2)}X.restore()}}));
 /* lodě a jeřáby */
 PB.L.push(pbLayer(2400,110,300,.75,.12,(g,Lw)=>{qrS(23);[[200,.62,.5],[1050,.72,.45],[1800,.58,.55]].forEach(([x,s,l],i)=>pbWrap(Lw,x,180,xx=>kBgShip(g,xx,s,l,41+i)));
  const crane=(x)=>{g.save();g.strokeStyle='#18222f';g.lineWidth=3;g.beginPath();g.moveTo(x-18,384);g.lineTo(x-10,170);g.lineTo(x+10,170);g.lineTo(x+18,384);g.stroke();g.lineWidth=1.2;for(let y=184;y<384;y+=18){g.beginPath();g.moveTo(x-16+(y-170)*.03,y);g.lineTo(x+16-(y-170)*.03,y+18);g.stroke()}g.lineWidth=3;g.beginPath();g.moveTo(x-40,170);g.lineTo(x+150,160);g.stroke();g.lineWidth=1;g.beginPath();g.moveTo(x,140);g.lineTo(x+150,160);g.moveTo(x,140);g.lineTo(x-40,170);g.moveTo(x+120,162);g.lineTo(x+120,250);g.stroke();g.fillStyle='#18222f';g.fillRect(x-8,140,16,30);g.fillRect(x+112,250,16,10);g.strokeStyle='rgba(150,175,215,.35)';g.lineWidth=1;g.beginPath();g.moveTo(x-40,169);g.lineTo(x+150,159);g.moveTo(x+10,170);g.lineTo(x+18,384);g.stroke();g.restore()};
  [650,1500,2250].forEach(x=>pbWrap(Lw,x,180,crane));const wg=g.createLinearGradient(0,380,0,410);wg.addColorStop(0,'#101a28');wg.addColorStop(1,'#0a111c');g.fillStyle=wg;g.fillRect(0,383,Lw,30);
  b5Atmo(g,110,410,'#2a3c56',.38,.2,Lw)},{post(L){for(const x of [650,1500,2250])for(const sx of pbSX(L,x,60)){if(T%90<45){X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(sx,248,0,sx,248,10);g.addColorStop(0,'rgba(255,80,60,.65)');g.addColorStop(1,'rgba(255,80,60,0)');X.fillStyle=g;X.fillRect(sx-10,238,20,20);X.restore()}}}}));
 PB.L.push(b5MistL(1600,300,140,.16,.15,'#5a6e8a',.22,41,34));
 /* koloniální nábřeží: domy s balkony a okenicemi, arkády, sklady s kladkami, zvonice */
 const TW={o:null};
 PB.L.push(pbLayer(2600,100,320,1,.26,(g,Lw)=>{const o=b5PortTown(g,Lw,31);TW.o=o;
  o.lamps.forEach(lx=>{g.fillStyle='#10161e';g.fillRect(lx-2,302,4,90);g.fillRect(lx-7,298,14,5);g.fillStyle='#ffd88a';g.fillRect(lx-4,303,8,10);g.fillStyle='#10161e';g.fillRect(lx-5,313,10,2);g.fillRect(lx-5,384,10,8);pbGlow(g,lx,308,62,'#ffc870',.42)});
  PB._plamps=o.lamps.concat(o.lights.map(q=>q[0]));
  b5Grain(g,0,100,Lw,320,.2);b5Atmo(g,100,400,'#1c2846',.14,.16,Lw);b5Atmo(g,320,400,'#34445c',0,.24,Lw)},{post(L){if(!TW.o)return;X.save();for(const c of TW.o.chim)for(const sx of pbSX(L,c[0],120)){for(let j=0;j<7;j++){const t=((T*.5+j*26+c[0])%180)/180,r=6+t*32,a=(1-t)*(t<.1?t*10:1)*.2,x=sx+t*48+Math.sin(t*5+j)*5,y=c[1]-t*120,gr=X.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(150,165,190,'+a+')');gr.addColorStop(1,'rgba(150,165,190,0)');X.fillStyle=gr;X.fillRect(x-r,y-r,r*2,r*2)}}
   X.globalCompositeOperation='lighter';for(const q of TW.o.lights)for(const sx of pbSX(L,q[0],40)){const f=.8+.2*Math.sin(T*.13+q[0]),gr=X.createRadialGradient(sx,q[1],0,sx,q[1],26);gr.addColorStop(0,'rgba(255,190,110,'+.25*f+')');gr.addColorStop(1,'rgba(255,190,110,0)');X.fillStyle=gr;X.fillRect(sx-26,q[1]-26,52,52)}X.restore()}}));
 PB.L.push(b5MistL(1800,340,110,.34,.25,'#7a8ca8',.08,47,40));
 /* mokré nábřeží */
 PB.G=pbLayer(2000,360,200,1,.55,(g,Lw)=>{const gr=g.createLinearGradient(0,372,0,560);gr.addColorStop(0,'#3a4250');gr.addColorStop(.5,'#2a303a');gr.addColorStop(1,'#14181e');g.fillStyle=gr;g.fillRect(0,372,Lw,190);qrS(51);
  for(let y=376;y<560;y+=7)for(let x=(y/7%2)*8-16;x<Lw+16;x+=16){const xm=((x%Lw)+Lw)%Lw;g.fillStyle=pbA(hs(xm*.37+y*1.31)<.5?'#5a6270':'#40464f',.35+.35*hs(xm*.71+y*.53));g.beginPath();g.ellipse(x,y,6.2,3,0,0,7);g.fill();g.fillStyle='rgba(180,200,230,.12)';g.fillRect(x-4,y-2.4,6,1)}
  for(let i=0;i<14;i++){const x=qr(0,Lw),y=qr(390,440),w=qr(40,110);pbWrap(Lw,x,w,xx=>{g.fillStyle='rgba(20,28,40,.7)';g.beginPath();g.ellipse(xx,y,w/2,6,0,0,7);g.fill();g.fillStyle='rgba(255,210,140,.3)';g.fillRect(xx-w*.2,y-2,w*.15,4);g.fillStyle='rgba(160,180,220,.2)';g.fillRect(xx+w*.05,y-1,w*.25,2)})}
  for(let x=60;x<Lw;x+=qr(160,320))pbWrap(Lw,x,20,xx=>{g.fillStyle='#1e2228';g.beginPath();g.roundRect(xx-7,368,14,18,4);g.fill();g.fillStyle='rgba(160,180,210,.35)';g.fillRect(xx+2,370,2,14)});
  b5Grain(g,0,372,Lw,190,.4)},{post(L){if(!PB._plamps)return;const L4=PB.L.find(q=>q.f==.26);if(!L4)return;X.save();X.globalCompositeOperation='lighter';for(const lx of PB._plamps)for(const sx of pbSX(L4,lx,80)){const g=X.createLinearGradient(0,380,0,440);g.addColorStop(0,'rgba(255,200,120,.16)');g.addColorStop(1,'rgba(255,200,120,0)');X.fillStyle=g;X.fillRect(sx-5+Math.sin(T*.1+lx)*1.5,380,10,60)}X.restore()}});
};

/* ---------- tropické prvky: palma, ostrov, vzdálené lodě ---------- */
function b5Palm2(g,x,yb,h,lean,o,seed){qrS(seed);const tx=x+lean*h,ty=yb-h,tw=Math.max(1.4,h*.045);g.save();g.lineCap='round';
 /* kmen – zahnutý, zužující se, s kroužky */const seg=12;for(let i=0;i<seg;i++){const u=i/seg,u2=(i+1)/seg,x1=x+lean*h*u*u,y1=yb-h*u,x2=x+lean*h*u2*u2,y2=yb-h*u2;g.strokeStyle=o.trunk;g.lineWidth=tw*(1.25-u*.55);g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();
  if(o.ring){g.strokeStyle=o.ring;g.lineWidth=.7;g.beginPath();g.moveTo(x1-tw*.6,y1);g.lineTo(x1+tw*.6,y1-.6);g.stroke()}}
 if(o.trunkLit){g.strokeStyle=o.trunkLit;g.lineWidth=tw*.35;g.beginPath();for(let i=0;i<=seg;i++){const u=i/seg;g.lineTo(x+lean*h*u*u+tw*.35,yb-h*u)}g.stroke()}
 /* listy */const n=o.n||9;const fr=[];for(let i=0;i<n;i++){const a=-Math.PI/2+(i/(n-1)-.5)*3.5+qr(-.12,.12),L=h*qr(.36,.52);fr.push([a,L])}fr.sort((p,q)=>Math.sin(q[0])-Math.sin(p[0]));
 for(const [a,L] of fr){const droop=L*(.25+.3*Math.abs(Math.cos(a))),ex=tx+Math.cos(a)*L,ey=ty+Math.sin(a)*L*.5+droop,mx=tx+Math.cos(a)*L*.55,my=ty+Math.sin(a)*L*.55-L*.12,lit=Math.cos(a)>0||Math.sin(a)<-.6;
  const col=lit?o.leafLit:o.leaf;g.strokeStyle=col;g.lineWidth=Math.max(.8,h*.012);g.beginPath();g.moveTo(tx,ty);g.quadraticCurveTo(mx,my,ex,ey);g.stroke();
  g.fillStyle=col;const N=10;for(let j=1;j<N;j++){const u=j/N,qx=(1-u)*(1-u)*tx+2*(1-u)*u*mx+u*u*ex,qy=(1-u)*(1-u)*ty+2*(1-u)*u*my+u*u*ey,dx=2*(1-u)*(mx-tx)+2*u*(ex-mx),dy=2*(1-u)*(my-ty)+2*u*(ey-my),dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl,ll=L*.2*Math.sin(Math.PI*(u*.85+.1));
   g.beginPath();g.moveTo(qx,qy);g.lineTo(qx+nx*ll+dx/dl*ll*.5,qy+Math.abs(ny*ll)+ll*.55);g.lineTo(qx+dx/dl*ll*.35,qy+ll*.12);g.lineTo(qx-nx*ll+dx/dl*ll*.5,qy+Math.abs(ny*ll)*.6+ll*.5);g.closePath();g.fill()}}
 g.fillStyle=o.nut||'#4a3a22';for(let i=0;i<3;i++){g.beginPath();g.arc(tx+(i-1)*h*.03,ty+h*.03,h*.028,0,7);g.fill()}g.restore()}
function b5Canopy(g,pts,o,seed){qrS(seed);/* zelené koruny džungle po profilu kopce, světlo zprava nahoře */for(let k=0;k<pts.length;k+=1){const [x,y]=pts[k];const r=o.r*qr(.65,1.2),cy=y+r*.35;const gr=g.createRadialGradient(x+r*.35,cy-r*.45,r*.1,x,cy,r);gr.addColorStop(0,o.lit);gr.addColorStop(.55,o.mid);gr.addColorStop(1,o.dark);g.fillStyle=gr;g.beginPath();g.arc(x,cy,r,0,7);g.fill()}}
function b5FarShip(g,x,y,s,o){g.save();g.translate(x,y);g.scale(s,s);const hc=o.hull||'#4a5868',sc=o.sail||'#f2f0e6',sd=o.sailSh||'#b8c4cc';
 g.fillStyle=hc;g.beginPath();g.moveTo(-46,-14);g.lineTo(40,-12);g.quadraticCurveTo(52,-14,58,-24);g.lineTo(50,0);g.quadraticCurveTo(0,4,-40,0);g.quadraticCurveTo(-48,-6,-46,-14);g.closePath();g.fill();g.fillRect(-46,-22,18,9);
 g.strokeStyle=hc;g.lineWidth=2;[[-24,74],[4,90],[30,70]].forEach(([mx,mh])=>{g.beginPath();g.moveTo(mx,-12);g.lineTo(mx,-12-mh);g.stroke()});g.beginPath();g.moveTo(54,-20);g.lineTo(84,-40);g.stroke();
 [[-24,74],[4,90],[30,70]].forEach(([mx,mh],i)=>{for(let k=0;k<2;k++){const top=-12-mh+6+k*mh*.42,hw=15-k*0-(i==1?-3:0),sh=mh*.36;g.fillStyle=sc;g.beginPath();g.moveTo(mx-hw,top);g.lineTo(mx+hw,top);g.quadraticCurveTo(mx+hw+5,top+sh*.6,mx+hw+1,top+sh);g.quadraticCurveTo(mx,top+sh+4,mx-hw+1,top+sh);g.quadraticCurveTo(mx-hw+4,top+sh*.6,mx-hw,top);g.fill();g.fillStyle=sd;g.beginPath();g.moveTo(mx-hw,top);g.quadraticCurveTo(mx-hw+4,top+sh*.6,mx-hw+1,top+sh);g.lineTo(mx-hw+7,top+sh);g.quadraticCurveTo(mx-hw+8,top+sh*.5,mx-hw+5,top);g.closePath();g.fill()}});
 g.fillStyle=sc;g.beginPath();g.moveTo(54,-22);g.lineTo(82,-38);g.lineTo(62,-14);g.closePath();g.fill();g.fillStyle=o.flag||'#8a2a24';g.fillRect(4,-108,10,5);g.restore()}
/* =========================================================
   2) MOŘE – slunečný den, tropické ostrovy, plachetnice
   ========================================================= */
PBB.sea=function(){const SU=[800,96];Object.assign(K3R.sea||{},{x:SU[0],y:SU[1]});const HZ=368;
 PB.sky=b5Sky([[0,'#1c5aa6'],[.35,'#3a86cc'],[.62,'#72b4e2'],[.82,'#b2dcf0'],[.94,'#dcf0f4'],[1,'#f2f6ee']],g=>{b5Sun(g,SU[0],SU[1],30,'#fffef4','#fff4c8');
  const CP={type:'cu',top:'#ffffff',bot:'#c4d2e2',hi:'#ffffff',hiA:.9,sh:'#6a84a8',shA:.62,rim:'#ffffff',rimA:.9,a:1,k:.13};
  [[160,90,330,80,1],[520,160,280,60,2],[920,190,240,50,3],[340,-40,300,70,4]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},CP,{L:b5L(x,y,SU[0],SU[1])}),s));
  /* oblačná věž za obzorem */[[260,312,300,70,51],[700,318,240,56,52]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},CP,{bot:'#d8e4ee',sh:'#9ab0c8',shA:.45,a:.85,L:b5L(x,y,SU[0],SU[1])}),s));
  [[480,330,900,22,7],[100,340,500,18,8],[900,336,500,16,9]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},CP,{type:'st',a:.65,bot:'#e0eaf2',sh:'#a8bccf',L:[0,-1]}),s));
  [[300,-180,700,30,31],[760,-240,600,24,32]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,{type:'wi',top:'#ffffff',bot:'#dce8f4',a:.5,soft:.8,tilt:.4},s))});
 PB.L.push(b5CloudLayer(2800,-150,420,.6,.015,.12,[[300,120,380,82,41],[1100,60,300,64,42],[1800,150,420,86,43],[2450,90,320,70,44]],{type:'cu',top:'#ffffff',bot:'#c0cee0',hi:'#ffffff',hiA:.85,sh:'#6a84a8',shA:.6,rim:'#ffffff',rimA:.85,a:.97,k:.13},[SU[0]+800,SU[1]]));
 /* 1) daleké ostrovy: sopka s čepicí mraku, nízké pevniny, plachetnice na obzoru */
 PB.L.push(pbLayer(2400,240,150,.6,.008,(g,Lw)=>{qrS(2);
  const land=(cx,w,h,seed,col,sharp)=>{const pts=[];for(let i=0;i<=60;i++){const u=i/60,e=Math.pow(Math.sin(Math.PI*u),sharp?1.6:.9),n=pbF(u*7,7,seed,4);pts.push([cx-w+u*w*2,HZ-h*e*(.8+.3*n)])}pbWrap(Lw,cx,w,xx=>{const d=xx-cx;g.fillStyle=col;g.beginPath();g.moveTo(cx-w+d,HZ+1);pts.forEach(q=>g.lineTo(q[0]+d,q[1]));g.lineTo(cx+w+d,HZ+1);g.closePath();g.fill();
   g.save();g.clip();const lg=g.createLinearGradient(cx-w*.2+d,0,cx+w+d,0);lg.addColorStop(0,'rgba(255,255,255,0)');lg.addColorStop(1,'rgba(255,250,235,.22)');g.fillStyle=lg;g.fillRect(cx-w+d,HZ-h-10,w*2,h+12);g.restore()})};
  land(1500,180,96,3,'#8eb2c8',1);land(1500,60,30,8,'#9cbccf');land(560,260,26,5,'#a4c4d4');land(2150,150,20,9,'#a8c6d6');
  pbWrap(Lw,1500,140,xx=>{const d=xx-1500;b5Cloud(g,1500+d,HZ-96,160,26,{type:'st',top:'#ffffff',bot:'#e6eef4',sh:'#b4c4d4',shA:.4,a:.75,L:[.5,-1]},71)});
  [[820,.32,'#5a6a78'],[1180,.24,'#6a7886'],[2000,.28,'#62707e'],[300,.2,'#6e7c8a']].forEach(([x,sc,c])=>pbWrap(Lw,x,40,xx=>b5FarShip(g,xx,HZ+1,sc,{hull:c,sail:'#f4f2ea',sailSh:'#c4ccd2',flag:'#9a4a40'})));
  const sg=g.createLinearGradient(0,HZ,0,HZ+20);sg.addColorStop(0,'#9cc8dc');sg.addColorStop(1,'#78b0cc');g.fillStyle=sg;g.fillRect(0,HZ,Lw,22);g.fillStyle='rgba(255,255,255,.55)';g.fillRect(0,HZ-.6,Lw,1.2);b5Atmo(g,240,HZ+2,'#d4e8f0',.38,.2,Lw)}));
 /* 2) hlavní ostrovy: džungle, útes, pláž, palmy, maják na skalisku */
 PB.L.push(pbLayer(2400,220,190,.75,.022,(g,Lw)=>{qrS(13);
  const isle=(cx,w,h,seed,o)=>{pbWrap(Lw,cx,w+60,xx=>{qrS(seed);const N=120,pts=[];for(let i=0;i<=N;i++){const u=i/N;let e=0;for(const [pu,ps,ph] of o.hills)e=Math.max(e,ph*Math.exp(-Math.pow((u-pu)/ps,2)));e*=Math.min(1,u/.1)*Math.min(1,(1-u)/.06);const n=pbF(u*8,8,seed,3);pts.push([xx-w+u*w*2,HZ-2-h*e*(.86+.28*n)])}
   const P=new Path2D();P.moveTo(xx-w,HZ+1);pts.forEach(q=>P.lineTo(q[0],q[1]));P.lineTo(xx+w,HZ+1);P.closePath();const lg=g.createLinearGradient(0,HZ-h,0,HZ);lg.addColorStop(0,'#5e9e60');lg.addColorStop(.6,'#3e7a52');lg.addColorStop(1,'#2a5a44');g.fillStyle=lg;g.fill(P);
   const sc=h/60+.5;for(let i=1;i<N;i++){const q=pts[i];if(q[1]>HZ-5)continue;const r=qr(2.4,5)*sc;g.beginPath();g.arc(q[0]+qr(-1,1),q[1]+r*.55,r,0,7);g.fill()}
   g.save();g.globalCompositeOperation='source-atop';
   for(let k=0;k<N*9;k++){const i=(qr()*N)|0,top=pts[i][1];if(top>HZ-4)continue;const d=qr(),y=top-2+d*d*(HZ-top),x=pts[i][0]+qr(-4,4),r=qr(1.6,4)*sc,lit=qr()<.5+.25*(1-d);
    g.fillStyle=lit?pbA(qr()<.5?'#a6d684':'#86c070',qr(.3,.65)):pbA('#1c4434',qr(.25,.5));g.beginPath();if(lit)g.arc(x+r*.25,y,r,Math.PI,0);else g.arc(x-r*.2,y+r*.25,r,0,Math.PI);g.fill()}
   const sg=g.createLinearGradient(xx-w,0,xx+w,0);sg.addColorStop(0,'rgba(10,40,30,.22)');sg.addColorStop(.6,'rgba(0,0,0,0)');sg.addColorStop(1,'rgba(255,244,210,.14)');g.fillStyle=sg;g.fillRect(xx-w-10,HZ-h*1.5,w*2+20,h*1.5+4);
   if(o.cliff){const i0=Math.round(N*o.cliff),xr=pts[N][0];const C=new Path2D();C.moveTo(pts[i0][0],HZ+1);for(let i=i0;i<=N;i++)C.lineTo(pts[i][0],Math.min(HZ,pts[i][1]+7+((i-i0)/(N-i0))*4));C.lineTo(xr+2,HZ+1);C.closePath();
    const cg=g.createLinearGradient(pts[i0][0],0,xr,0);cg.addColorStop(0,'#5e5a52');cg.addColorStop(.55,'#9a907a');cg.addColorStop(1,'#d4c8a8');g.fillStyle=cg;g.fill(C);g.save();g.clip(C);g.strokeStyle='rgba(50,40,30,.35)';g.lineWidth=1;for(let k=0;k<12;k++){const lx=pts[i0][0]+qr(4,xr-pts[i0][0]);g.beginPath();g.moveTo(lx,HZ-h);g.lineTo(lx+qr(-5,3),HZ);g.stroke()}for(let k=0;k<4;k++){const ly=HZ-qr(4,h*.5);g.strokeStyle='rgba(255,240,210,.18)';g.beginPath();g.moveTo(pts[i0][0],ly);g.lineTo(xr,ly+qr(-3,3));g.stroke()}g.restore()}
   g.restore();
   /* pláž a příboj */const bx0=xx-w*(o.bL||.95),bx1=xx+w*(o.cliff?.25:.9);const bg=g.createLinearGradient(0,HZ-6,0,HZ+1);bg.addColorStop(0,'#f2e2b6');bg.addColorStop(1,'#e2cc96');g.fillStyle=bg;g.beginPath();g.moveTo(bx0-10,HZ+1);g.quadraticCurveTo(bx0+20,HZ-6,(bx0+bx1)/2,HZ-6);g.quadraticCurveTo(bx1-20,HZ-6,bx1+10,HZ+1);g.closePath();g.fill();
   const tg=g.createLinearGradient(0,HZ,0,HZ+8);tg.addColorStop(0,'rgba(120,230,220,.95)');tg.addColorStop(1,'rgba(90,190,210,0)');g.fillStyle=tg;g.fillRect(bx0-30,HZ,bx1-bx0+60,9);g.fillStyle='rgba(255,255,255,.9)';g.fillRect(bx0-6,HZ,bx1-bx0+12,1.4);g.fillStyle='rgba(255,255,255,.5)';for(let k=0;k<6;k++)g.fillRect(bx0+qr(0,bx1-bx0),HZ+3+qr(0,3),qr(8,26),1);
   if(o.cliff){g.fillStyle='rgba(255,255,255,.75)';for(let k=0;k<5;k++)g.fillRect(xx+w*qr(.5,.98),HZ+qr(0,2),qr(4,12),1.2);for(let k=0;k<4;k++){const rx=xx+w*qr(.6,1.05),rr=qr(3,7);g.fillStyle='#6a6458';g.beginPath();g.ellipse(rx,HZ,rr*1.3,rr,0,Math.PI,0);g.fill();g.fillStyle='rgba(255,240,210,.4)';g.beginPath();g.ellipse(rx+rr*.4,HZ-rr*.5,rr*.6,rr*.3,0,0,7);g.fill()}}
   /* palmy */const np=o.palms||5;for(let k=0;k<np;k++){const px=bx0+18+k*(bx1-bx0-36)/Math.max(1,np-1)+qr(-8,8),ph=h*qr(.55,.85);b5Palm2(g,px,HZ-4,ph,qr(-.3,.3),{trunk:'#8a7656',trunkLit:'rgba(255,240,200,.5)',ring:'rgba(60,40,20,.4)',leaf:'#3a7a4e',leafLit:'#7ab868',n:9},seed+k*7)}
   /* maják */if(o.light){const li=Math.round(N*.86),lx=pts[li][0],ly=pts[li][1]+6;g.fillStyle='#e8e4dc';g.beginPath();g.moveTo(lx-5,ly);g.lineTo(lx-3.5,ly-34);g.lineTo(lx+3.5,ly-34);g.lineTo(lx+5,ly);g.fill();g.fillStyle='#b83a2a';g.fillRect(lx-4.4,ly-24,8.8,5);g.fillRect(lx-3.9,ly-12,7.8,5);g.fillStyle='#3a3a40';g.fillRect(lx-5,ly-40,10,6);g.beginPath();g.moveTo(lx-5,ly-40);g.lineTo(lx,ly-46);g.lineTo(lx+5,ly-40);g.fill();g.fillStyle='rgba(255,255,255,.6)';g.fillRect(lx+1.5,ly-33,1.5,32)}
   /* chýše na kůlech */if(o.hut){const hx=bx0+(bx1-bx0)*.35;g.fillStyle='#7a5a3a';g.fillRect(hx-10,HZ-14,1.6,12);g.fillRect(hx+9,HZ-14,1.6,12);g.fillStyle='#9a7a4a';g.fillRect(hx-11,HZ-22,23,9);g.fillStyle='#c8a868';g.beginPath();g.moveTo(hx-15,HZ-21);g.lineTo(hx+1,HZ-32);g.lineTo(hx+16,HZ-21);g.closePath();g.fill();g.fillStyle='rgba(60,40,20,.5)';g.fillRect(hx-3,HZ-20,5,7)}
   })};
  isle(420,260,82,21,{hills:[[.32,.2,.55],[.66,.13,1],[.82,.07,.82]],cliff:.8,palms:5,light:1});isle(1240,90,30,23,{hills:[[.5,.3,1]],palms:3,bL:.9});isle(1900,200,58,25,{hills:[[.3,.18,.7],[.6,.2,1]],palms:6,hut:1});
  b5Atmo(g,220,HZ+2,'#c4e0ec',.32,.12,Lw);
  }));
 /* 3) moře: hloubka, vlny v perspektivě, třpyt */
 PB.L.push(pbLayer(2000,366,110,.75,.07,(g,Lw)=>{const top=374,gr=g.createLinearGradient(0,top,0,476);gr.addColorStop(0,'#6aaccc');gr.addColorStop(.18,'#3f8ab8');gr.addColorStop(.6,'#2a6ea2');gr.addColorStop(1,'#1a5486');g.fillStyle=gr;g.fillRect(0,top,Lw,104);
  const fg=g.createLinearGradient(0,366,0,top+6);fg.addColorStop(0,'rgba(120,180,210,0)');fg.addColorStop(1,'rgba(106,172,204,1)');g.fillStyle=fg;g.fillRect(0,366,Lw,top-366+6);qrS(9);
  for(let row=0;row<46;row++){const k=row/45,y=top+2+Math.pow(k,1.35)*100,n=Math.round(60+k*40),sz=2+k*16;for(let i=0;i<n;i++){const x=qr(0,Lw),w=sz*qr(.6,1.4);pbWrap(Lw,x,w,xx=>{g.strokeStyle=pbA('#ffffff',(.12+.22*k)*qr(.4,1));g.lineWidth=.6+k*1.3;g.beginPath();g.moveTo(xx-w,y);g.quadraticCurveTo(xx,y-sz*.18,xx+w,y);g.stroke();g.strokeStyle=pbA('#0c3a64',(.1+.25*k)*qr(.4,1));g.beginPath();g.moveTo(xx-w*.8,y+1+k*2);g.quadraticCurveTo(xx,y+1+k*2+sz*.12,xx+w*.8,y+1+k*2);g.stroke()})}}
  for(let i=0;i<140;i++){const k=qr(),y=top+4+Math.pow(k,1.4)*96,w=4+k*14;pbWrap(Lw,qr(0,Lw),w,xx=>{g.fillStyle=pbA('#e8fbff',.25+.35*k);g.beginPath();g.ellipse(xx,y,w,.6+k*1.4,0,0,7);g.fill()})}},
  {post(L){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<50;i++){const y=375+i*1.9,w=(10+i*3.4)*(.45+.55*Math.sin(T*.08+i*2.1)),xo=Math.sin(T*.05+i*1.3)*(6+i*.3);X.fillStyle='rgba(255,250,224,'+Math.max(0,.42-i*.008)+')';X.fillRect(SU[0]-w/2+xo,y,w,1.2)}
   for(let i=0;i<30;i++){const ph=(T*.02+i*.37)%1,x=((i*197+Math.floor(T*.02+i*.37)*331)%W),y=378+((i*53)%90);const a=Math.sin(ph*Math.PI)*.55;X.fillStyle='rgba(255,255,255,'+a+')';X.fillRect(x-3,y,6,1);X.fillRect(x-.5,y-2,1,5)}X.restore()}}));
};
/* ---------- nepřátelská galeona v pozadí (barona Vanea) ---------- */
const B5G={hull:null,cv:null};
function b5GalHull(noMain){const HK2=noMain?'hullN':'hull';if(B5G[HK2])return B5G[HK2];const c=pbCv(720,470),g=c.getContext('2d');g.translate(320,400);
 const H=new Path2D();H.moveTo(-232,-110);H.lineTo(-244,-62);H.quadraticCurveTo(-236,-6,-196,10);H.quadraticCurveTo(0,22,196,10);H.quadraticCurveTo(250,-8,266,-52);H.lineTo(302,-64);H.lineTo(296,-74);H.lineTo(252,-84);H.lineTo(150,-82);H.lineTo(148,-62);H.lineTo(-116,-62);H.lineTo(-118,-104);H.closePath();
 let gr=g.createLinearGradient(0,-110,0,16);gr.addColorStop(0,'#5a3c24');gr.addColorStop(.5,'#3e2816');gr.addColorStop(1,'#24160c');g.fillStyle=gr;g.fill(H);g.save();g.clip(H);
 for(let y=-104;y<16;y+=5){g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=1;g.beginPath();g.moveTo(-250,y);g.quadraticCurveTo(0,y+7,300,y-8);g.stroke();g.strokeStyle='rgba(255,220,170,.06)';g.beginPath();g.moveTo(-250,y+1.2);g.quadraticCurveTo(0,y+8.2,300,y-6.8);g.stroke()}
 /* barevný pás s dělovými porty */g.fillStyle='#6e1c16';g.beginPath();g.moveTo(-250,-50);g.quadraticCurveTo(0,-44,300,-58);g.lineTo(300,-40);g.quadraticCurveTo(0,-26,-250,-32);g.closePath();g.fill();g.strokeStyle='#c8a050';g.lineWidth=1.6;g.beginPath();g.moveTo(-250,-50);g.quadraticCurveTo(0,-44,300,-58);g.moveTo(-250,-32);g.quadraticCurveTo(0,-26,300,-40);g.stroke();
 for(const [y,w] of [[-18,6],[-4,5]]){g.fillStyle='#160e08';g.beginPath();g.moveTo(-250,y);g.quadraticCurveTo(0,y+7,300,y-10);g.lineTo(300,y-10+w);g.quadraticCurveTo(0,y+7+w,-250,y+w);g.closePath();g.fill();g.strokeStyle='rgba(255,220,170,.25)';g.lineWidth=1;g.beginPath();g.moveTo(-250,y);g.quadraticCurveTo(0,y+7,300,y-10);g.stroke()}
 B5G.ports=[];for(let x=-96;x<=134;x+=33){const y=-46+(x/300)*-4+((x*x)/90000)*6;B5G.ports.push([x,y+5]);g.fillStyle='#0c0806';g.fillRect(x-6,y,12,11);g.fillStyle='#8a2a20';g.save();g.translate(x,y);g.rotate(-.5);g.fillRect(-6,-9,12,3);g.restore();g.fillStyle='#1a1a1e';g.fillRect(x+4,y+3,9,4);g.fillStyle='rgba(200,200,210,.4)';g.fillRect(x+4,y+3,9,1)}
 /* zádní kastel: okna galerie, zlacení */g.fillStyle='#2a1a0e';g.fillRect(-232,-104,112,4);for(let i=0;i<5;i++){const wx=-222+i*20;g.fillStyle='#120a06';g.fillRect(wx-1,-95,13,15);const lg=g.createLinearGradient(0,-94,0,-81);lg.addColorStop(0,'#ffe0a0');lg.addColorStop(1,'#ff9a48');g.fillStyle=lg;g.fillRect(wx,-94,11,13);g.fillStyle='#2a1a0e';g.fillRect(wx+5,-94,1.2,13);g.fillRect(wx,-88,11,1.2)}
 g.strokeStyle='#c8a050';g.lineWidth=1.4;g.beginPath();g.moveTo(-236,-78);g.lineTo(-118,-76);g.moveTo(-234,-98);g.lineTo(-118,-98);g.stroke();for(let x=-230;x<-120;x+=8){g.beginPath();g.arc(x,-70,2.4,Math.PI,0);g.stroke()}
 g.restore();g.strokeStyle='#160c06';g.lineWidth=2;g.stroke(H);
 /* zábradlí */g.strokeStyle='#2a1a0e';g.lineWidth=1.2;g.beginPath();g.moveTo(-232,-120);g.lineTo(-118,-114);g.moveTo(-116,-70);g.lineTo(148,-70);g.moveTo(150,-90);g.lineTo(252,-92);g.stroke();for(let x=-230;x<-118;x+=5){g.beginPath();g.moveTo(x,-110);g.lineTo(x,-119.5+(x+230)*.05);g.stroke()}for(let x=-114;x<148;x+=6){g.beginPath();g.moveTo(x,-62);g.lineTo(x,-70);g.stroke()}for(let x=152;x<252;x+=6){g.beginPath();g.moveTo(x,-82);g.lineTo(x,-90.5);g.stroke()}
 /* figura na přídi a čelen */g.fillStyle='#c8a050';g.beginPath();g.moveTo(268,-56);g.quadraticCurveTo(284,-60,292,-70);g.quadraticCurveTo(282,-64,272,-64);g.closePath();g.fill();g.strokeStyle='#3a2414';g.lineWidth=3;g.beginPath();g.moveTo(250,-84);g.lineTo(372,-140);g.stroke();
 /* stěžně a ráhna – statické */g.lineCap='round';[[150,-262],[10,-300],[-150,-236]].filter(q=>!(noMain&&q[0]==10)).forEach(([mx,mt])=>{const mg=g.createLinearGradient(mx-4,0,mx+4,0);mg.addColorStop(0,'#2a1a0e');mg.addColorStop(.6,'#6a4a2c');mg.addColorStop(1,'#2a1a0e');g.fillStyle=mg;g.fillRect(mx-4,mt,8,-62-mt+(mx<-120?-40:0));g.fillStyle='#2a1a0e';g.fillRect(mx-10,mt+70,20,4);g.fillRect(mx-8,mt+150,16,4)});
 /* lanoví: vanty s vyblinkami a štagy */g.strokeStyle='rgba(30,20,12,.7)';g.lineWidth=1;[[150,-262,-82],[10,-300,-62],[-150,-236,-104]].filter(q=>!(noMain&&q[0]==10)).forEach(([mx,mt,rail])=>{for(const sd of [-1,1]){for(let k=0;k<4;k++){g.beginPath();g.moveTo(mx+sd*3,mt+74);g.lineTo(mx+sd*(16+k*10),rail);g.stroke()}g.lineWidth=.6;for(let yy=rail-8;yy>mt+84;yy-=8){const f=(yy-(mt+74))/(rail-(mt+74));g.beginPath();g.moveTo(mx+sd*(3+13*f),yy);g.lineTo(mx+sd*(3+43*f),yy);g.stroke()}g.lineWidth=1}});
 g.beginPath();g.moveTo(150,-262);g.lineTo(372,-140);if(!noMain){g.moveTo(10,-300);g.lineTo(150,-262);g.moveTo(10,-300);g.lineTo(-150,-236)}g.moveTo(-150,-236);g.lineTo(-232,-118);g.moveTo(150,-190);g.lineTo(330,-128);g.stroke();
 B5G[HK2]=c;return c}
function b5Galleon(){if(!SEA)return;const sc=.6,gx=W*.74+Math.sin(T*.004)*30,gy=GY+20+Math.sin(T*.03)*2,rot=Math.sin(T*.02)*.012;
 let c=B5G.cv;if(!c){c=B5G.cv=pbCv(480,320);B5G.g=c.getContext('2d')}const q=B5G.g,redo=B5G.lt==null||Math.abs(T-B5G.lt)>=3||SEA.fl>0||B5G.lfl>0;B5G.lfl=SEA.fl;
 if(redo){B5G.lt=T;q.setTransform(1,0,0,1,0,0);q.clearRect(0,0,480,320);
 const X0=X;X=q;try{X.save();X.translate(200,276);X.rotate(rot);X.scale(sc,sc);
  /* plachty za stěžni */const t=T;[[150,-262,[[-250,62,62],[-180,74,74]]],[10,-300,[[-290,70,70],[-218,84,82],[-136,92,70]]]].forEach(([mx,mt,S],mi)=>{S.forEach(([yt,hw,sh],k)=>{k3Sail(mx,yt,hw*.95,sh,{i:mi*5+k+20,emb:mi==1&&k==1},t);k3Yard(mx,yt-2,hw*.95)})});
  /* latinská plachta na mizéně */const ls=Math.sin(t*.03)*4;X.fillStyle='#e8dcc0';X.beginPath();X.moveTo(-150,-226);X.quadraticCurveTo(-110+ls,-170,-112,-118);X.lineTo(-226,-114);X.quadraticCurveTo(-200,-170+ls,-150,-226);X.closePath();X.fill();X.strokeStyle='#5a4428';X.lineWidth=1.6;X.stroke();X.strokeStyle='#3a2414';X.lineWidth=3;X.beginPath();X.moveTo(-232,-104);X.lineTo(-140,-240);X.stroke();
  /* kosatky na čelenu */for(let k=0;k<2;k++){const b=Math.sin(t*.04+k)*4;X.fillStyle='#efe6cc';X.beginPath();X.moveTo(160+k*40,-246+k*30);X.quadraticCurveTo(220+k*40+b,-170+k*20,250+k*30,-96+k*6);X.lineTo(330-k*10+(k?20:0),-134+k*8);X.closePath();X.fill();X.strokeStyle='rgba(90,70,40,.6)';X.lineWidth=1.2;X.stroke()}
  X.drawImage(b5GalHull(),-320,-400);
  /* vlajky */const fw=k=>Math.sin(t*.12+k)*4;X.fillStyle='#8a1e18';X.beginPath();X.moveTo(10,-300);for(let i=0;i<=10;i++)X.lineTo(10-i*9,-298+fw(i*.7)*(i/10)+i*.4);for(let i=10;i>=0;i--)X.lineTo(10-i*9,-292+fw(i*.7)*(i/10)+i*.2);X.closePath();X.fill();
  X.fillStyle='#1a1414';X.beginPath();X.moveTo(-246,-112);X.lineTo(-246,-150);for(let i=0;i<=6;i++)X.lineTo(-246-i*7,-150+fw(i)*(i/6));for(let i=6;i>=0;i--)X.lineTo(-246-i*7,-128+fw(i)*(i/6));X.closePath();X.fill();X.fillStyle='#c8a050';X.font='700 16px Georgia';X.textAlign='center';X.fillText('V',-266,-133);X.strokeStyle='#2a1a0e';X.lineWidth=2;X.beginPath();X.moveTo(-246,-108);X.lineTo(-246,-152);X.stroke();
  /* lucerny na zádi */for(const lx of [-238,-200,-160]){X.fillStyle='#2a1a0e';X.fillRect(lx-3,-128,6,3);X.fillStyle='#ffd27a';X.fillRect(lx-2.5,-125,5,7)}
  /* výstřely */if(SEA.fl>0){for(let i=0;i<B5G.ports.length;i++){if(i%2)continue;const [px,py]=B5G.ports[i],f=SEA.fl/10;X.globalCompositeOperation='lighter';const fg=X.createRadialGradient(px+12,py,0,px+12,py,26+(10-SEA.fl)*3);fg.addColorStop(0,'rgba(255,230,150,'+f+')');fg.addColorStop(.4,'rgba(255,150,60,'+f*.7+')');fg.addColorStop(1,'rgba(255,90,30,0)');X.fillStyle=fg;X.fillRect(px-30,py-40,90,80);X.globalCompositeOperation='source-over'}}
  X.restore()}finally{X=X0}
 /* opar vzdálenosti */q.save();q.globalCompositeOperation='source-atop';q.fillStyle='rgba(170,205,228,.2)';q.fillRect(0,0,480,320);q.restore()}
 X.save();/* odraz a stín na vodě */const rg=X.createLinearGradient(0,gy,0,gy+26);rg.addColorStop(0,'rgba(12,36,64,.45)');rg.addColorStop(1,'rgba(12,36,64,0)');X.fillStyle=rg;X.beginPath();X.ellipse(gx+20,gy+6,150,18,0,0,7);X.fill();
 X.drawImage(c,gx-200,gy-276);
 /* pěna u přídě a brázda */X.fillStyle='rgba(255,255,255,.75)';for(let i=0;i<14;i++){const u=((T*.6+i*9)%120),xx=gx+170-u*1.6,yy=gy+4+Math.sin(i*1.7)*2+u*.06;X.globalAlpha=Math.max(0,1-u/120)*.8;X.fillRect(xx-8,yy,16-u*.08,1.4)}X.globalAlpha=1;
 for(let k=0;k<3;k++){const b=Math.sin(T*.08+k)*2;X.fillStyle='rgba(255,255,255,'+(.7-k*.18)+')';X.beginPath();X.ellipse(gx+168+k*6,gy+2+k*2,12-k*2,2.4+b*.3,-.2,0,7);X.fill()}
 X.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<20;i++){const xx=gx-140+i*15+Math.sin(T*.05+i)*3;X.fillRect(xx,gy+6+Math.sin(i)*1.5,8,1)}
 /* kouř po výstřelech */if(SEA.fl>0||B5G.sm){if(SEA.fl>=9&&!B5G.smT){B5G.sm=B5G.ports.filter((_,i)=>i%2==0).map(p=>({x:gx-200+200+p[0]*sc+12,y:gy-276+276+p[1]*sc,t:0}));B5G.smT=1}if(SEA.fl<9)B5G.smT=0}
 if(B5G.sm){B5G.sm.forEach(s=>{s.t++;const k=s.t/120,r=8+k*40,a=(1-k)*.4;if(a<=0)return;const xx=s.x+k*30,yy=s.y-k*26,gg=X.createRadialGradient(xx,yy,0,xx,yy,r);gg.addColorStop(0,'rgba(235,235,230,'+a+')');gg.addColorStop(1,'rgba(235,235,230,0)');X.fillStyle=gg;X.fillRect(xx-r,yy-r,r*2,r*2)});if(B5G.sm.every(s=>s.t>120))B5G.sm=null}
 X.restore()}
/* událost: vzdálená loď na obzoru */
function b5WevShip(v){const y=lv&&lv.k=='sea'?369:258;X.globalAlpha=Math.min(1,v.t/200,(v.L-v.t)/200)*.95;b5FarShip(X,v.x,y,.42,{hull:'#56687a',sail:'#f6f4ec',sailSh:'#c8d0d6',flag:'#9a4a40'})}

/* =========================================================
   3) BAŽINA – měsíční noc, lysé cypřiše se španělským mechem, mlhy
   ========================================================= */
function b5BaldCypress(g,x,yb,h,o,seed){qrS(seed);const c=o.c,tw=h*.045,lx=o.lx||1;g.save();g.fillStyle=c;
 g.beginPath();g.moveTo(x-tw*2.6,yb);g.quadraticCurveTo(x-tw*1.1,yb-h*.05,x-tw*.95,yb-h*.22);g.lineTo(x-tw*.5,yb-h*.92);g.lineTo(x+tw*.5,yb-h*.92);g.lineTo(x+tw*.95,yb-h*.22);g.quadraticCurveTo(x+tw*1.1,yb-h*.05,x+tw*2.6,yb);g.closePath();g.fill();
 for(let i=0;i<3;i++){const kx=x+qr(-h*.22,h*.22),kh=qr(4,10)*(h/150);g.beginPath();g.moveTo(kx-kh*.6,yb);g.quadraticCurveTo(kx-kh*.15,yb-kh,kx,yb-kh*1.1);g.quadraticCurveTo(kx+kh*.15,yb-kh,kx+kh*.6,yb);g.fill()}
 if(o.trunkRim){g.fillStyle=o.trunkRim;g.beginPath();g.moveTo(x+lx*tw*.5,yb-h*.92);g.lineTo(x+lx*tw*.95,yb-h*.22);g.quadraticCurveTo(x+lx*tw*1.1,yb-h*.05,x+lx*tw*2.6,yb);g.lineTo(x+lx*tw*2.1,yb);g.quadraticCurveTo(x+lx*tw*.75,yb-h*.05,x+lx*tw*.62,yb-h*.22);g.lineTo(x+lx*tw*.22,yb-h*.92);g.closePath();g.fill();g.fillStyle=c}
 const pads=[],nb=3+(qr()*3|0);g.strokeStyle=c;g.lineCap='round';for(let i=0;i<nb;i++){const by=yb-h*qr(.52,.9),sd=i%2?1:-1,L=h*qr(.1,.27);g.lineWidth=Math.max(1,tw*.5);g.beginPath();g.moveTo(x,by);g.quadraticCurveTo(x+sd*L*.5,by-L*.3,x+sd*L,by-L*.45);g.stroke();pads.push([x+sd*L,by-L*.45,h*qr(.11,.19)])}
 pads.push([x+qr(-4,4),yb-h*.96,h*qr(.11,.17)]);
 for(const [px,py,r] of pads){g.fillStyle=c;for(let k=0;k<16;k++){const ex=px+qr(-r,r),ey=py+qr(-r*.16,r*.1),rr=r*qr(.22,.42);g.beginPath();g.ellipse(ex,ey,rr,rr*.4,0,0,7);g.fill()}
  if(o.rim){g.fillStyle=o.rim;for(let k=0;k<7;k++){const ex=px+lx*qr(-r*.2,r*.95),ey=py-r*.13+qr(-r*.04,r*.04),rr=r*qr(.14,.3);g.beginPath();g.ellipse(ex,ey,rr,rr*.2,0,0,7);g.fill()}}
  if(o.moss){g.strokeStyle=o.moss;g.lineWidth=Math.max(.6,h*.004);for(let k=0;k<Math.round(r/4);k++){const mx=px+qr(-r*.85,r*.85),ml=qr(r*.3,r*1.15),my=py+r*.04;g.beginPath();g.moveTo(mx,my);g.quadraticCurveTo(mx+qr(-2,2),my+ml*.5,mx+qr(-3,3),my+ml);g.stroke()}}}
 g.restore()}
PBB.swamp=function(){const MO=[744,126];Object.assign(K3R.swamp||{},{x:MO[0],y:MO[1]});
 PB.sky=b5Sky([[0,'#02060e'],[.3,'#071420'],[.52,'#0f2a2c'],[.72,'#1f4238'],[.86,'#3a5e4a'],[.95,'#62805e'],[1,'#86a07a']],g=>{b5Stars(g,140,170,7,{x:300,y:-90,a:.25,c:'#b8d8ff'});
  pbGlow(g,MO[0],MO[1]+60,520,'#a8d0a0',.16);b5Moon(g,MO[0],MO[1],40,'#f2f6e2','#b8d8b0');
  const SP={type:'wi',top:'#46665a',bot:'#304a40',sh:'#16261f',hi:'#d8eccc',hiA:.65,rim:'#f4fbe8',rimA:.75,a:.55,k:.05,t0:.18,t1:.7,ns:.07};
  [[300,150,560,40,1],[900,190,420,34,2],[620,236,620,30,3],[80,90,380,30,4]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},SP,{L:b5L(x,y,MO[0],MO[1])}),s))});
 PB.L.push(b5CloudLayer(2600,-60,320,.6,.015,.06,[[200,120,560,40,21],[1100,80,500,36,22],[1900,150,620,42,23]],{type:'wi',top:'#46665a',bot:'#304a40',sh:'#16261f',hi:'#d8eccc',hiA:.6,rim:'#f4fbe8',rimA:.7,a:.5,k:.05,t0:.18,t1:.7,ns:.07},[MO[0]+500,MO[1]]));
 /* 1) daleký les v mlze */
 PB.L.push(pbLayer(1920,200,260,.5,.015,(g,Lw)=>{b5Ridge(g,Lw,460,{y:384,amp:30,P:40,seed:3,oct:3,top:'#4e7262',bot:'#5a7c68',L:[0,-1],rim:'#a8c8a8',rimA:.3,rimD:1.2,rim2:0});
  qrS(4);for(let x=10;x<Lw;x+=qr(34,80)){const h=qr(70,130);pbWrap(Lw,x,40,xx=>b5BaldCypress(g,xx,388,h,{c:'#466a58',moss:'rgba(110,150,120,.5)'},x|0))}
  b5Atmo(g,220,400,'#6a8c74',.4,.25,Lw)}));
 PB.L.push(b5MistL(1600,300,140,.03,.07,'#a8c8b0',.16,11,30,5));
 /* 2) střední cypřiše, klidná voda, chýše */
 const hutX=[700,1900];
 PB.L.push(pbLayer(2400,40,440,.75,.06,(g,Lw)=>{qrS(13);for(let x=30;x<Lw;x+=qr(70,140)){if(hutX.some(h=>Math.abs(h+40-x)<110))continue;pbWrap(Lw,x,90,xx=>b5BaldCypress(g,xx,398,qr(150,240),{c:'#26402f',rim:'rgba(170,205,165,.55)',trunkRim:'rgba(170,205,165,.25)',moss:'rgba(130,165,130,.6)',lx:1},x|0))}
  const hut=(x)=>{g.save();g.fillStyle='#182a20';[0,40,80].forEach(o=>g.fillRect(x+o,330,5,70));g.fillRect(x-6,322,100,10);g.fillStyle='#21342a';g.fillRect(x,282,86,42);g.fillStyle='#182a20';g.beginPath();g.moveTo(x-12,286);g.lineTo(x+43,248);g.lineTo(x+98,286);g.fill();g.strokeStyle='rgba(200,230,180,.45)';g.lineWidth=1.4;g.beginPath();g.moveTo(x+43,248);g.lineTo(x+98,286);g.stroke();
   b5Win(g,x+18,296,12,12,1,'#ffc870');b5Win(g,x+56,296,10,12,1,'#ffc870');g.fillStyle='#2a1a10';g.fillRect(x+40,300,10,22);g.fillStyle='#182a20';g.fillRect(x+62,264,6,18);g.fillStyle='#ffd27a';g.fillRect(x-2,312,4,6);pbGlow(g,x,315,26,'#ffb050',.45);g.restore()};hutX.forEach(x=>pbWrap(Lw,x,120,hut));
  const wg=g.createLinearGradient(0,398,0,420);wg.addColorStop(0,'#2e4a40');wg.addColorStop(1,'#1a2c24');g.fillStyle=wg;g.fillRect(0,398,Lw,30);g.fillStyle='rgba(200,230,200,.25)';g.fillRect(0,398,Lw,1);qrS(14);for(let i=0;i<260;i++){g.fillStyle=pbA(qr()<.6?'#b8d8b8':'#0a140f',qr(.05,.18));g.fillRect(qr(0,Lw),qr(400,426),qr(8,30),1)}
  b5Grain(g,0,40,Lw,440,.25);b5Atmo(g,160,420,'#5a7c6a',.06,.22,Lw)},{post(L){X.save();X.globalCompositeOperation='lighter';for(const hx of hutX)for(const sx of pbSX(L,hx,120)){for(let i=0;i<8;i++){const y=401+i*2.6,w=(6+i*1.5)*(.5+.5*Math.sin(T*.07+i*1.9));X.fillStyle='rgba(255,200,120,'+(.28-i*.03)+')';X.fillRect(sx+24-w/2+Math.sin(T*.05+i)*2,y,w,1.1);X.fillRect(sx+61-w/2+Math.sin(T*.05+i+1)*2,y,w,1.1)}}X.restore()}}));
 PB.L.push(b5MistL(1700,310,150,.1,.15,'#b0d0b4',.12,17,32,5));
 /* 3) blízké mohutné cypřiše, suché stromy, rákosí */
 PB.L.push(pbLayer(2600,-40,520,.75,.15,(g,Lw)=>{qrS(23);for(let x=60;x<Lw;x+=qr(260,460))pbWrap(Lw,x,160,xx=>b5BaldCypress(g,xx,410,qr(260,360),{c:'#132219',rim:'rgba(150,190,150,.45)',trunkRim:'rgba(150,190,150,.2)',moss:'rgba(110,140,110,.65)',lx:1},x|0));
  for(let x=200;x<Lw;x+=qr(500,800))pbWrap(Lw,x,140,xx=>pbDead(g,xx,410,qr(160,240),'#15241b',x|0));
  for(let x=0;x<Lw;x+=qr(22,48))pbWrap(Lw,x,20,xx=>{g.lineWidth=2;for(let j=0;j<qr(3,7);j++){const h=qr(26,70);g.strokeStyle=qr()<.5?'#1e301c':'#2a4026';g.beginPath();g.moveTo(xx+j*3,410);g.quadraticCurveTo(xx+j*3+qr(-4,4),410-h*.6,xx+j*3+qr(-8,8),410-h);g.stroke()}if(qr()<.45){g.fillStyle='#3a2618';g.beginPath();g.ellipse(xx+6,410-qr(44,66),2.4,7,0,0,7);g.fill()}});
  g.fillStyle='#122019';g.fillRect(0,408,Lw,80);b5Grain(g,0,-40,Lw,520,.25);b5Atmo(g,250,420,'#3a5a48',0,.25,Lw)}));
 /* 4) obří kmeny v popředí pozadí */
 PB.L.push(pbLayer(2800,-200,680,.6,.36,(g,Lw)=>{qrS(33);for(let x=300;x<Lw;x+=qr(600,1000))pbWrap(Lw,x,200,xx=>{const tw=qr(30,44);const gr=g.createLinearGradient(xx-tw,0,xx+tw,0);gr.addColorStop(0,'#0c140c');gr.addColorStop(.7,'#1a281a');gr.addColorStop(1,'#34503a');g.fillStyle=gr;g.beginPath();g.moveTo(xx-tw*3,440);g.bezierCurveTo(xx-tw*1.4,400,xx-tw,280,xx-tw*.8,-200);g.lineTo(xx+tw*.8,-200);g.bezierCurveTo(xx+tw,280,xx+tw*1.4,400,xx+tw*3,440);g.fill();
   g.fillStyle='rgba(200,230,180,.16)';g.beginPath();g.moveTo(xx+tw*.8,-200);g.bezierCurveTo(xx+tw,280,xx+tw*1.4,400,xx+tw*3,440);g.lineTo(xx+tw*2.6,440);g.bezierCurveTo(xx+tw*1.1,400,xx+tw*.8,280,xx+tw*.62,-200);g.fill();
   g.strokeStyle='rgba(120,150,100,.5)';g.lineWidth=1.3;for(let j=0;j<22;j++){const mx=xx+qr(-tw*4,tw*4),my=-200,ml=qr(150,300);g.beginPath();g.moveTo(mx,my);g.quadraticCurveTo(mx+qr(-6,6),my+ml*.5,mx+qr(-4,4),my+ml);g.stroke()}
   g.fillStyle='#162216';for(let k=0;k<4;k++){const kx=xx+qr(-160,160);g.beginPath();g.moveTo(kx-10,440);g.quadraticCurveTo(kx-3,440-qr(20,40),kx,440-qr(30,46));g.quadraticCurveTo(kx+3,420,kx+10,440);g.fill()}});b5Grain(g,0,-200,Lw,680,.3)}));
 PB.G=pbLayer(2000,360,200,1,.6,(g,Lw)=>{const gr=g.createLinearGradient(0,372,0,560);gr.addColorStop(0,'#34503e');gr.addColorStop(.25,'#20342a');gr.addColorStop(1,'#0a120c');g.fillStyle=gr;g.fillRect(0,372,Lw,190);qrS(41);
  for(let i=0;i<800;i++){g.fillStyle=pbA(qr()<.6?'#a8c8a0':'#0a120c',qr(.04,.14));g.fillRect(qr(0,Lw),qr(380,560),qr(10,46),1)}
  for(let i=0;i<60;i++){const x=qr(0,Lw),y=qr(390,500),r=qr(6,14);pbWrap(Lw,x,r,xx=>{g.fillStyle=qr()<.5?'#2e5a2a':'#3e6a32';g.beginPath();g.ellipse(xx,y,r,r*.4,0,.3,6.0);g.lineTo(xx,y);g.fill();g.fillStyle='rgba(220,240,200,.25)';g.fillRect(xx-r*.5,y-r*.32,r*.6,1);if(qr()<.2){g.fillStyle='#f0e0e8';g.beginPath();g.arc(xx+2,y-2,2.4,0,7);g.fill()}})}
  for(let x=0;x<Lw;x+=qr(70,160))pbWrap(Lw,x,30,xx=>{g.fillStyle='#2a3620';g.beginPath();g.ellipse(xx,376,qr(20,40),5,0,0,7);g.fill();g.strokeStyle='#3a5630';g.lineWidth=1.6;for(let j=0;j<6;j++){g.beginPath();g.moveTo(xx+qr(-14,14),377);g.lineTo(xx+qr(-18,18),377-qr(10,26));g.stroke()}});b5Grain(g,0,372,Lw,190,.4)},
  {post(L){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<18;i++){const y=382+i*4,w=(8+i*2.4)*(.55+.45*Math.sin(T*.06+i*1.9));X.fillStyle='rgba(225,245,200,'+Math.max(0,.22-i*.011)+')';X.fillRect(MO[0]-w/2+Math.sin(T*.04+i)*5,y,w,1.4)}X.restore()}});
};

/* =========================================================
   4) DŮL – hluboká jeskyně, lucerny, krystaly, podzemní vodopád
   ========================================================= */
PBB.mine=function(){PB.lights=[];const LT=[];
 PB.sky=b5Sky([[0,'#020101'],[.5,'#080504'],[.85,'#120c08'],[1,'#1a120c']],g=>{});
 /* 1) daleká stěna jeskyně s osvětlenými chodbami */
 const far=pbLayer(1920,-160,640,.5,.03,(g,Lw)=>{const gr=g.createLinearGradient(0,-160,0,480);gr.addColorStop(0,'#0e0a07');gr.addColorStop(.6,'#1a130d');gr.addColorStop(1,'#241a11');g.fillStyle=gr;g.fillRect(0,-160,Lw,640);qrS(5);
   g.save();g.beginPath();g.rect(0,-160,Lw,640);g.clip();pbStrokes(g,0,-160,Lw,640,['#2a1e14','#0c0806','#36281a'],2200,34,7,.15);g.restore();
   for(let i=0;i<10;i++){const yy=qr(-100,440);g.strokeStyle='rgba(70,52,34,.28)';g.lineWidth=qr(3,8);g.beginPath();for(let x=-10;x<=Lw+10;x+=20)g.lineTo(x,yy+Math.sin(x*.004+i)*14+pbF(x/Lw*6,6,i,3)*30);g.stroke()}
   /* chodby se světlem */for(let i=0;i<4;i++){const x=180+i*440+qr(-60,60),y=qr(300,350),w=qr(46,70);pbWrap(Lw,x,w*2,xx=>{const og=g.createRadialGradient(xx,y+20,4,xx,y+10,w*1.6);og.addColorStop(0,'rgba(255,170,80,.55)');og.addColorStop(.4,'rgba(200,110,40,.25)');og.addColorStop(1,'rgba(120,60,20,0)');g.fillStyle=og;g.fillRect(xx-w*2,y-w*1.6,w*4,w*3);
     g.fillStyle='#060403';g.beginPath();g.moveTo(xx-w,398);g.lineTo(xx-w,y);g.quadraticCurveTo(xx,y-w*.95,xx+w,y);g.lineTo(xx+w,398);g.closePath();g.fill();
     const ig=g.createLinearGradient(0,y-w*.6,0,398);ig.addColorStop(0,'rgba(255,170,90,.0)');ig.addColorStop(1,'rgba(255,160,80,.45)');g.save();g.clip();g.fillStyle=ig;g.fillRect(xx-w,y-w,w*2,400);g.restore();
     g.strokeStyle='#3a2816';g.lineWidth=6;g.beginPath();g.moveTo(xx-w-3,398);g.lineTo(xx-w-3,y);g.moveTo(xx+w+3,398);g.lineTo(xx+w+3,y);g.moveTo(xx-w-8,y-2);g.lineTo(xx+w+8,y-2);g.stroke();g.strokeStyle='rgba(255,180,100,.35)';g.lineWidth=1.5;g.beginPath();g.moveTo(xx+w+5,398);g.lineTo(xx+w+5,y);g.stroke()});LT.push({L:'far',x,y:372,r:90,c:'#ff9a40',a:.28})}
   /* krystaly */for(let i=0;i<10;i++){const x=qr(0,Lw),y=qr(-40,280),c=qr()<.6?['#5ad8ff','#c8f6ff']:['#b070ff','#ecd0ff'];pbWrap(Lw,x,30,xx=>{pbGlow(g,xx,y,30,c[0],.22);for(let j=0;j<5;j++){const a=-Math.PI/2+qr(-.9,.9),l=qr(6,16);g.save();g.translate(xx+qr(-5,5),y);g.rotate(a+Math.PI/2);g.fillStyle=pbA(c[0],.75);g.beginPath();g.moveTo(-2.4,0);g.lineTo(0,-l);g.lineTo(2.4,0);g.fill();g.fillStyle=pbA(c[1],.8);g.fillRect(-.5,-l*.8,1,l*.6);g.restore()}});LT.push({L:'far',x,y,r:26,c:c[0],a:.3})}
   b5Atmo(g,-160,480,'#1a120c',.0,.25,Lw)});
 PB.L.push(far);
 /* 2) skalní pilíře, krápníky a podzemní vodopád */
 const WF={x:1250,y:-40,h:440,w:34};
 const mid=pbLayer(2400,-200,680,.6,.08,(g,Lw)=>{qrS(7);
   for(let x=60;x<Lw;x+=qr(260,420)){const w=qr(70,130),sd=x|0;pbWrap(Lw,x,w*1.5,xx=>{qrS(sd);const pts=[];for(let y=-200;y<=480;y+=16)pts.push([xx-w/2+(pbF((y+200)/680*6,6,sd%97,3)-.5)*40+Math.sin(y*.01)*8,y]);const pr=[];for(let y=-200;y<=480;y+=16)pr.push([xx+w/2+(pbF((y+200)/680*6,6,(sd+5)%97,3)-.5)*40-Math.sin(y*.012)*10,y]);
     const gr=g.createLinearGradient(xx-w,0,xx+w,0);gr.addColorStop(0,'#0c0907');gr.addColorStop(.6,'#1e160f');gr.addColorStop(1,'#2e2216');g.fillStyle=gr;g.beginPath();pts.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));pr.slice().reverse().forEach(q=>g.lineTo(q[0],q[1]));g.closePath();g.fill();
     g.save();g.clip();pbStrokes(g,xx-w,-200,w*2,680,['#2e2216','#080605','#3e2e1e'],Math.round(w*680/260),22,4,1.45);g.restore();
     g.strokeStyle='rgba(255,170,100,.28)';g.lineWidth=2;g.beginPath();pr.forEach((q,i)=>i?g.lineTo(q[0]-1,q[1]):g.moveTo(q[0]-1,q[1]));g.stroke()})}
   for(let x=0;x<Lw;x+=qr(30,70)){const h=qr(30,150),w=qr(12,30);pbWrap(Lw,x,w,xx=>{const gr=g.createLinearGradient(xx-w/2,0,xx+w/2,0);gr.addColorStop(0,'#100b08');gr.addColorStop(.65,'#261c13');gr.addColorStop(1,'#100b08');g.fillStyle=gr;g.beginPath();g.moveTo(xx-w/2,-200);g.lineTo(xx-w/2,-150);g.quadraticCurveTo(xx-w*.2,-150+h*.6,xx,-150+h);g.quadraticCurveTo(xx+w*.2,-150+h*.6,xx+w/2,-150);g.lineTo(xx+w/2,-200);g.fill()})}
   g.fillStyle='#0e0a07';g.fillRect(0,-200,Lw,52);
   for(let x=0;x<Lw;x+=qr(50,120)){const h=qr(16,60),w=qr(14,34);pbWrap(Lw,x,w,xx=>{g.fillStyle='#1a130d';g.beginPath();g.moveTo(xx-w/2,410);g.quadraticCurveTo(xx-w*.2,410-h*.6,xx,410-h);g.quadraticCurveTo(xx+w*.2,410-h*.6,xx+w/2,410);g.fill();g.fillStyle='rgba(255,170,100,.12)';g.beginPath();g.moveTo(xx,410-h);g.quadraticCurveTo(xx+w*.2,410-h*.6,xx+w/2,410);g.lineTo(xx+w*.3,410);g.fill()})}
   /* jezírko u vodopádu */pbWrap(Lw,WF.x,140,xx=>{const pg=g.createLinearGradient(0,396,0,420);pg.addColorStop(0,'#1a3a48');pg.addColorStop(1,'#0a1820');g.fillStyle=pg;g.beginPath();g.ellipse(xx,404,120,12,0,0,7);g.fill();pbGlow(g,xx,400,90,'#5ac8ff',.18);g.fillStyle='#0a0806';g.fillRect(xx-WF.w/2-6,WF.y-6,WF.w+12,14)});
   g.fillStyle='#120d09';g.fillRect(0,408,Lw,80);b5Grain(g,0,-200,Lw,680,.35);b5Atmo(g,-200,480,'#120c08',.1,.2,Lw)},
  {post(L){for(const sx of pbSX(L,WF.x,140)){X.save();const x0=sx-WF.w/2;const g=X.createLinearGradient(x0-6,0,x0+WF.w+6,0);g.addColorStop(0,'rgba(150,210,240,0)');g.addColorStop(.25,'rgba(160,215,240,.3)');g.addColorStop(.55,'rgba(200,235,255,.42)');g.addColorStop(.8,'rgba(160,215,240,.26)');g.addColorStop(1,'rgba(150,210,240,0)');X.fillStyle=g;X.beginPath();X.moveTo(x0+4,WF.y);X.lineTo(x0+WF.w-4,WF.y);X.lineTo(x0+WF.w+8,WF.y+WF.h);X.lineTo(x0-8,WF.y+WF.h);X.closePath();X.fill();
    X.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const xx=x0+3+i*3.4,o=(T*(3+i%3)+i*37)%60;X.fillStyle='rgba(200,240,255,.12)';for(let y=WF.y-60+o;y<WF.y+WF.h;y+=60)X.fillRect(xx,y,1.4,26)}
    for(let i=0;i<10;i++){const t=((T*.02+i*.1)%1),r=10+t*30;const gg=X.createRadialGradient(sx+(i-5)*5,WF.y+WF.h-6-t*20,0,sx+(i-5)*5,WF.y+WF.h-6-t*20,r);gg.addColorStop(0,'rgba(200,235,255,'+(.14*(1-t))+')');gg.addColorStop(1,'rgba(200,235,255,0)');X.fillStyle=gg;X.fillRect(sx+(i-5)*5-r,WF.y+WF.h-6-t*20-r,r*2,r*2)}X.restore()}}});
 PB.L.push(mid);LT.push({L:'mid',x:WF.x,y:398,r:110,c:'#5ac8ff',a:.16});
 PB.L.push(b5MistL(1500,250,200,.1,.1,'#6a5240',.12,23,36));
 /* 3) lešení, lucerny, koleje a vozíky */
 const tim=pbLayer(2400,-80,520,.75,.15,(g,Lw)=>{qrS(15);for(let x=0;x<Lw;x+=qr(260,360)){pbWrap(Lw,x,60,xx=>{const top=qr(150,200);const wd=(x0,y0,w,h)=>{const gr=g.createLinearGradient(x0,0,x0+w,0);gr.addColorStop(0,'#24180d');gr.addColorStop(.6,'#46301c');gr.addColorStop(1,'#24180d');g.fillStyle=gr;g.fillRect(x0,y0,w,h);g.fillStyle='rgba(0,0,0,.35)';for(let k=0;k<6;k++)g.fillRect(x0+qr(1,w-2),y0+qr(0,h),1,qr(10,40))};
    wd(xx-60,top,14,400-top);wd(xx+46,top,14,400-top);g.fillStyle='#3a2a18';g.fillRect(xx-70,top-12,140,16);g.fillStyle='rgba(255,200,130,.18)';g.fillRect(xx-70,top-12,140,2);g.strokeStyle='#26190d';g.lineWidth=6;g.beginPath();g.moveTo(xx-54,top+40);g.lineTo(xx-30,top+4);g.moveTo(xx+52,top+40);g.lineTo(xx+28,top+4);g.stroke();
    g.strokeStyle='#2a2a2a';g.lineWidth=1.2;g.beginPath();g.moveTo(xx,top+4);g.lineTo(xx,top+30);g.stroke();g.fillStyle='#3a3020';g.fillRect(xx-5,top+30,10,4);g.fillStyle='#ffcf7a';g.fillRect(xx-4,top+34,8,9);pbGlow(g,xx,top+38,40,'#ffb050',.45);
    const lg=g.createRadialGradient(xx,top+38,4,xx,top+60,130);lg.addColorStop(0,'rgba(255,170,80,.18)');lg.addColorStop(1,'rgba(255,170,80,0)');g.fillStyle=lg;g.fillRect(xx-130,top-80,260,260);LT.push({L:'tim',x:xx,y:top+38,r:52,c:'#ffb050',a:.5})})}
  g.fillStyle='#16100a';g.fillRect(0,398,Lw,12);g.strokeStyle='#5a5a5e';g.lineWidth=2;g.beginPath();g.moveTo(0,398);g.lineTo(Lw,398);g.stroke();g.strokeStyle='rgba(255,200,140,.3)';g.lineWidth=1;g.beginPath();g.moveTo(0,397);g.lineTo(Lw,397);g.stroke();for(let x=0;x<Lw;x+=22){g.fillStyle='#2a1c10';g.fillRect(x,398,12,6)}
  for(let i=0;i<3;i++){const cx=qr(100,Lw-100);g.fillStyle='#262020';g.beginPath();g.moveTo(cx-34,360);g.lineTo(cx+34,360);g.lineTo(cx+28,392);g.lineTo(cx-28,392);g.fill();g.fillStyle='#5a4a3a';g.beginPath();g.ellipse(cx,360,30,8,0,Math.PI,0);g.fill();g.fillStyle='#c8a050';for(let k=0;k<5;k++){g.beginPath();g.arc(cx-16+k*8,356-qr(0,4),3,0,7);g.fill()}g.fillStyle='#151210';[cx-18,cx+18].forEach(w=>{g.beginPath();g.arc(w,394,6,0,7);g.fill()})}
  b5Grain(g,0,-80,Lw,520,.35)});tim.id='tim';PB.L.push(tim);
 /* 4) strop s krápníky (blízko) */
 PB.L.push(pbLayer(2600,-300,420,.6,.3,(g,Lw)=>{qrS(25);g.fillStyle='#0e0906';g.fillRect(0,-300,Lw,190);for(let x=0;x<Lw;x+=qr(18,50)){const h=qr(20,120),w=qr(10,26);pbWrap(Lw,x,w,xx=>{const gr=g.createLinearGradient(xx-w/2,0,xx+w/2,0);gr.addColorStop(0,'#120c08');gr.addColorStop(.6,'#2a1e14');gr.addColorStop(1,'#120c08');g.fillStyle=gr;g.beginPath();g.moveTo(xx-w/2,-112);g.quadraticCurveTo(xx-w*.2,-112+h*.6,xx,-112+h);g.quadraticCurveTo(xx+w*.2,-112+h*.6,xx+w/2,-112);g.fill();g.fillStyle='rgba(160,210,230,.35)';g.beginPath();g.arc(xx,-112+h+2,1.2,0,7);g.fill()})}b5Grain(g,0,-300,Lw,420,.35)}));
 const map={far,mid,tim};LT.forEach(q=>{q.L=map[q.L]||far;PB.lights.push(q)});
 PB.G=pbLayer(2000,360,200,1,.6,(g,Lw)=>{const gr=g.createLinearGradient(0,372,0,560);gr.addColorStop(0,'#3a2c1e');gr.addColorStop(1,'#120c08');g.fillStyle=gr;g.fillRect(0,372,Lw,190);qrS(31);g.save();g.beginPath();g.rect(0,372,Lw,190);g.clip();pbStrokes(g,0,372,Lw,190,['#4a3a2a','#1a120a','#5a4a36'],1200,14,4,0);g.restore();
  for(let i=0;i<120;i++){const x=qr(0,Lw),y=qr(378,520),r=qr(2,7);g.fillStyle='#4a3e32';g.beginPath();g.ellipse(x,y,r*1.4,r,0,0,7);g.fill();g.fillStyle='rgba(255,220,170,.15)';g.beginPath();g.ellipse(x-r*.3,y-r*.4,r*.6,r*.3,0,0,7);g.fill()}
  for(let x=0;x<Lw;x+=20){g.fillStyle='#2a1c10';g.fillRect(x,404,14,6)}g.strokeStyle='#6a6a70';g.lineWidth=2;g.beginPath();g.moveTo(0,402);g.lineTo(Lw,402);g.moveTo(0,410);g.lineTo(Lw,410);g.stroke();b5Grain(g,0,372,Lw,190,.4)});
};

/* =========================================================
   5) STEP – západ slunce, stolové hory, městečko, saguara
   ========================================================= */
PBB.steppe=function(){const SU=[690,300];Object.assign(K3R.steppe||{},{x:SU[0],y:SU[1]});
 PB.sky=b5Sky([[0,'#120a2a'],[.22,'#341a4e'],[.42,'#6e2a5c'],[.58,'#b8424e'],[.72,'#e86c44'],[.84,'#ffa652'],[.94,'#ffd884'],[1,'#fff0c0']],g=>{b5Stars(g,50,-120,9);
  const hg=g.createRadialGradient(SU[0],SU[1],0,SU[0],SU[1],620);hg.addColorStop(0,'rgba(255,220,140,.55)');hg.addColorStop(.35,'rgba(255,150,80,.22)');hg.addColorStop(1,'rgba(255,120,80,0)');g.fillStyle=hg;g.fillRect(0,-340,W,H+340);
  b5Sun(g,SU[0],SU[1],52,'#fff6d0','#ffb860');
  const CP={type:'cu',top:'#8a4a78',bot:'#ff9a78',sh:'#4a2050',shA:.5,hi:'#ffd8a0',hiA:.9,hiP:1.3,rim:'#fff2cc',rimA:.9,a:.97,k:.045};
  [[170,120,380,70,1],[560,40,300,56,2],[930,150,320,60,3],[330,-80,340,60,4]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},CP,{L:b5L(x,y,SU[0],SU[1]+120)}),s));
  [[600,238,700,22,7],[160,256,460,18,8],[980,226,420,20,9]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,{type:'st',n:40,top:'#d06a62',bot:'#ffb070',sh:'#7a3050',hi:'#ffe0a0',hiA:.7,rim:'#fff4d0',rimA:.8,a:.85,k:.08,L:b5L(x,y,SU[0],SU[1]+60)},s));
  [[300,-200,700,30,31],[780,-150,600,26,32]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,{type:'wi',top:'#e08aa0',bot:'#f0a8a0',sh:'#8a4a6a',hi:'#ffd8c0',a:.5,tilt:.5,k:.04},s))});
 PB.L.push(b5CloudLayer(2800,-160,420,.6,.015,.07,[[300,100,400,64,41],[1150,40,320,54,42],[1900,130,440,70,43],[2500,70,300,50,44]],{type:'cu',top:'#8a4a7c',bot:'#ff9a7c',sh:'#4a2050',shA:.5,hi:'#ffd8a0',hiA:.85,hiP:1.3,rim:'#fff2cc',rimA:.85,a:.95,k:.045},[SU[0]+700,SU[1]+200]));
 /* 1) dalekné pohoří v oparu */
 PB.L.push(pbLayer(1920,180,300,.5,.012,(g,Lw)=>{b5Ridge(g,Lw,480,{y:340,amp:70,P:6,seed:3,oct:5,top:'#9a5a7c',bot:'#c0748a',L:[.2,-1],rim:'#ffc8a0',rimA:.45,rimD:1.4,lit:'#ffb090',litA:.18,shd:'#5a2a50',shdA:.18,haze:'#f4a888',hazeA:.6,hz0:.4})}));
 /* 2) stolové hory (mesy a buty) */
 PB.L.push(pbLayer(2200,140,340,.6,.04,(g,Lw)=>{b5Ridge(g,Lw,480,{y:378,amp:170,P:4,seed:7,mesa:.46,mk:5,top:'#9c4a46',bot:'#7a3a3e',L:[.35,-1],lit:'#ffb070',litA:.42,litH:140,shd:'#3a1426',shdA:.4,sk:1.4,rim:'#ffd090',rimA:.75,rimD:2,haze:'#ea9070',hazeA:.55,hz0:.1,strata:{n:10,h:15,a:.08,w:3,o:.18},tex:['#b8604e','#6a2c34','#c87050'],td:300,tl:22,tw:4,gr:.25});
  qrS(8);for(let i=0;i<5;i++){const x=qr(0,Lw),w=qr(18,34),h=qr(70,120);pbWrap(Lw,x,w,xx=>{const gr=g.createLinearGradient(xx-w,0,xx+w,0);gr.addColorStop(0,'#5a2432');gr.addColorStop(.7,'#8a3a3c');gr.addColorStop(1,'#d07a5a');g.fillStyle=gr;g.beginPath();g.moveTo(xx-w*1.6,384);g.lineTo(xx-w*.7,384-h*.35);g.lineTo(xx-w*.55,384-h);g.lineTo(xx+w*.55,384-h);g.lineTo(xx+w*.7,384-h*.35);g.lineTo(xx+w*1.6,384);g.fill();g.fillStyle='rgba(255,210,150,.55)';g.fillRect(xx-w*.55,384-h,w*1.1,2)})}
  b5Atmo(g,140,384,'#e88a70',.12,.42,Lw)}));
 PB.L.push(b5MistL(1600,300,140,.07,.1,'#f0a070',.16,13,30,5));
 /* 3) městečko */
 PB.L.push(pbLayer(2400,150,300,.75,.13,(g,Lw)=>{qrS(17);g.fillStyle='#5a2a2e';g.fillRect(0,384,Lw,70);kTown(g,260,9,71);kTown(g,1460,8,73);
  const mill=(x)=>{g.fillStyle='#5a2a2c';g.beginPath();g.moveTo(x-12,386);g.lineTo(x-3,290);g.lineTo(x+3,290);g.lineTo(x+12,386);g.fill();g.save();g.translate(x,288);g.strokeStyle='#5a2a2c';g.lineWidth=2;for(let i=0;i<12;i++){g.rotate(Math.PI/6);g.beginPath();g.moveTo(0,0);g.lineTo(0,-26);g.stroke()}g.restore();g.fillStyle='#5a2a2c';g.beginPath();g.moveTo(x+4,288);g.lineTo(x+22,282);g.lineTo(x+22,294);g.closePath();g.fill()};mill(1150);mill(2250);
  g.strokeStyle='#4a2226';g.lineWidth=2;for(let x=0;x<Lw;x+=160){g.beginPath();g.moveTo(x,386);g.lineTo(x,338);g.moveTo(x-8,342);g.lineTo(x+8,342);g.stroke()}g.lineWidth=.8;g.beginPath();for(let x=0;x<Lw;x+=160){g.moveTo(x-8,342);g.quadraticCurveTo(x+80,352,x+152,342)}g.stroke();
  b5Grain(g,0,150,Lw,300,.3);b5Atmo(g,240,400,'#e89070',.18,.38,Lw)}));
 PB.L.push(b5MistL(1800,320,130,.2,.18,'#ffb080',.1,19,36,5));
 /* 4) saguara, balvany, plot */
 PB.L.push(pbLayer(2600,120,330,.75,.28,(g,Lw)=>{qrS(27);for(let x=100;x<Lw;x+=qr(220,420))pbWrap(Lw,x,60,xx=>b5Saguaro(g,xx,404,qr(80,140),'#3a1c22','rgba(255,160,90,.6)',1,x|0));
  for(let x=0;x<Lw;x+=qr(120,260))pbWrap(Lw,x,50,xx=>b5Rock(g,xx,404,qr(12,30),'#4a2622','rgba(255,170,100,.55)',1,x|0));
  for(let x=0;x<Lw;x+=qr(50,110))pbWrap(Lw,x,16,xx=>{g.strokeStyle=qr()<.5?'#5a3a24':'#6a4428';g.lineWidth=1.3;const y=404;for(let j=-3;j<=3;j++){g.beginPath();g.moveTo(xx,y);g.lineTo(xx+j*3.4,y-qr(6,18)+Math.abs(j));g.stroke()}});
  for(let k=0;k<2;k++){const fx=qr(0,Lw);for(let i=0;i<8;i++)pbWrap(Lw,fx+i*34,20,xx=>{g.fillStyle='#3a1e1a';g.fillRect(xx-2,376,4,28);if(i<7){g.fillRect(xx,382,34,3);g.fillRect(xx,392,34,3)}})}
  g.fillStyle='#4a2622';g.fillRect(0,402,Lw,40);b5Grain(g,0,120,Lw,330,.3);b5Atmo(g,300,420,'#f09a70',0,.2,Lw)},{post(L){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<22;i++){const sp=.3+(i%5)*.12,x=((i*173+T*sp-cam*.28)%(W+40)+W+40)%(W+40)-20,y=250+((i*97)%170)+Math.sin(T*.02+i)*8,a=.25+.2*Math.sin(T*.05+i*2);X.fillStyle='rgba(255,220,160,'+a+')';X.fillRect(x,y,1.6,1.6)}X.restore()}}));
 PB.G=pbLayer(2000,360,200,1,.6,(g,Lw)=>{const gr=g.createLinearGradient(0,372,0,560);gr.addColorStop(0,'#d89a60');gr.addColorStop(.35,'#b07a44');gr.addColorStop(1,'#6a4424');g.fillStyle=gr;g.fillRect(0,372,Lw,190);qrS(37);g.save();g.beginPath();g.rect(0,372,Lw,190);g.clip();pbStrokes(g,0,372,Lw,190,['#e8b880','#9a6838','#c08850','#f0c890'],1500,18,3,0);
  for(let i=0;i<40;i++){const x=qr(0,Lw),y=qr(390,540);g.strokeStyle='rgba(90,50,24,.4)';g.lineWidth=1;g.beginPath();g.moveTo(x,y);for(let j=0;j<5;j++)g.lineTo(x+qr(-14,14)*j,y+qr(-4,4));g.stroke()}g.strokeStyle='rgba(120,70,30,.35)';g.lineWidth=3;g.beginPath();g.moveTo(0,420);g.bezierCurveTo(Lw*.3,412,Lw*.6,430,Lw,420);g.moveTo(0,428);g.bezierCurveTo(Lw*.3,420,Lw*.6,438,Lw,428);g.stroke();g.restore();
  for(let x=0;x<Lw;x+=qr(40,110))pbWrap(Lw,x,14,xx=>{g.strokeStyle=qr()<.5?'#8a7a3a':'#a08a48';g.lineWidth=1.3;const y=qr(376,400);for(let j=-3;j<=3;j++){g.beginPath();g.moveTo(xx,y);g.lineTo(xx+j*3,y-qr(6,16)+Math.abs(j));g.stroke()}});
  for(let x=0;x<Lw;x+=qr(90,200))pbWrap(Lw,x,20,xx=>{const y=qr(390,470),r=qr(4,12);g.fillStyle='#8a5a3a';g.beginPath();g.ellipse(xx,y,r*1.3,r*.8,0,0,7);g.fill();g.fillStyle='rgba(255,200,140,.35)';g.beginPath();g.ellipse(xx+r*.3,y-r*.3,r*.7,r*.3,0,0,7);g.fill()});
  const sh=g.createLinearGradient(0,372,0,392);sh.addColorStop(0,'rgba(255,220,160,.3)');sh.addColorStop(1,'rgba(255,220,160,0)');g.fillStyle=sh;g.fillRect(0,372,Lw,20);b5Grain(g,0,372,Lw,190,.45)});
};

/* =========================================================
   6) PEVNOST – hvězdná noc, zasněžené štíty, světlomety
   ========================================================= */
k3Search=function(){};
PBB.fort=function(){const MO=[210,92];PB.lights=[];Object.assign(K3R.fort||{},{x:MO[0],y:MO[1]});
 PB.sky=b5Sky([[0,'#010208'],[.32,'#050a1c'],[.58,'#0e1832'],[.78,'#1c2a4a'],[.92,'#2c3a5c'],[1,'#444c6c']],g=>{b5Stars(g,330,260,13,{x:600,y:-40,a:-.5,c:'#c0ccff'});
  b5Moon(g,MO[0],MO[1],28,'#eef2fa','#90a4d4');
  const NP={type:'cu',top:'#3a4670',bot:'#1c2240',sh:'#080a1a',shA:.5,hi:'#b6c4ec',hiA:.7,hiP:2,rim:'#eaf0ff',rimA:.85,a:.88,k:.06};
  [[420,60,360,56,1],[820,140,300,50,2],[80,200,260,40,3]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},NP,{L:b5L(x,y,MO[0],MO[1])}),s));
  [[600,250,640,24,5]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},NP,{type:'st',a:.6,L:b5L(x,y,MO[0],MO[1])}),s))});
 PB.L.push(b5CloudLayer(2600,-120,330,.6,.015,.05,[[300,40,380,56,21],[1200,90,320,50,22],[2000,20,420,62,23]],{type:'cu',top:'#3a4670',bot:'#1c2240',sh:'#080a1a',shA:.5,hi:'#b6c4ec',hiA:.65,hiP:2,rim:'#eaf0ff',rimA:.75,a:.84,k:.06},[MO[0]-600,MO[1]]));
 /* 1) zasněžené štíty */
 PB.L.push(pbLayer(1920,120,360,.5,.015,(g,Lw)=>{const o={y:356,amp:190,P:5,seed:21,sharp:1.7,oct:5};const pts=b5RidgePts(Lw,o);
  b5Ridge(g,Lw,480,Object.assign({pts,top:'#242e4e',bot:'#161d38',L:[-.5,-1],lit:'#8a9ad0',litA:.32,litH:150,shd:'#050814',shdA:.4,sk:2.2,sm:10,rim:'#d6e0ff',rimA:.75,rimD:1.6,haze:'#262f4e',hazeA:.55,hz0:.15,tex:['#323c5e','#10162a'],td:700,tl:14,tw:2,ta:-.9},o));
  g.save();const path=new Path2D();path.moveTo(-4,480);pts.forEach(q=>path.lineTo(q[0],q[1]));path.lineTo(Lw+4,480);path.closePath();g.clip(path);const sl=o.y-o.amp*.55;
  g.beginPath();g.moveTo(-4,-10);pts.forEach(q=>g.lineTo(q[0],-10));for(let x=Lw+4;x>=-4;x-=6){const n=pbF(x/Lw*30,30,77,3);g.lineTo(x,sl+n*40-20+Math.sin(x*.05)*6)}g.closePath();const sg=g.createLinearGradient(0,o.y-o.amp,0,sl+30);sg.addColorStop(0,'rgba(215,226,255,.55)');sg.addColorStop(1,'rgba(150,165,215,.0)');g.fillStyle=sg;g.fill();g.restore();
  b5Atmo(g,160,480,'#2c3658',.15,.45,Lw)}));
 /* 2) zalesněné hřbety */
 PB.L.push(pbLayer(2200,200,280,.6,.04,(g,Lw)=>{const o={y:392,amp:80,P:6,seed:33,oct:4};const pts=b5RidgePts(Lw,o);b5Ridge(g,Lw,480,Object.assign({pts,top:'#141a30',bot:'#10152a',L:[-.5,-1],rim:'#8a9ad0',rimA:.45,rimD:1.2,haze:'#222a48',hazeA:.5,hz0:0},o));
  qrS(34);for(let i=0;i<pts.length-1;i+=2){if(qr()<.55){const q=pts[i],ph=qr(14,30);pbWrap(Lw,q[0],ph*.4,xx=>b5Pine(g,xx,q[1]+6,ph,'#0e1326',(i*7)|0,'rgba(140,160,220,.35)',-1))}}b5Atmo(g,280,480,'#1e2644',.1,.35,Lw)}));
 /* 3) pevnost na kopci */
 const fortL=pbLayer(2600,100,320,.75,.09,(g,Lw)=>{qrS(31);const hill=b5RidgePts(Lw,{y:392,amp:26,P:8,seed:35,oct:3});g.fillStyle='#0c0f1e';g.beginPath();g.moveTo(-4,430);hill.forEach(q=>g.lineTo(q[0],q[1]));g.lineTo(Lw+4,430);g.fill();
  g.fillStyle='#0d1022';g.fillRect(0,334,Lw,64);for(let x=0;x<Lw;x+=14)g.fillRect(x,326,8,10);g.fillStyle='rgba(150,170,230,.2)';g.fillRect(0,334,Lw,1.5);const towers=[];
  for(let x=120;x<Lw;x+=qr(380,560)){const w=qr(50,80),h=qr(120,190);pbWrap(Lw,x,w,xx=>{g.fillStyle='#0e1122';g.fillRect(xx-w/2,392-h,w,h);for(let c=0;c<w;c+=14)g.fillRect(xx-w/2+c,392-h-12,9,12);const rg=g.createLinearGradient(xx-w/2,0,xx-w/2+12,0);rg.addColorStop(0,'rgba(150,170,230,.3)');rg.addColorStop(1,'rgba(150,170,230,0)');g.fillStyle=rg;g.fillRect(xx-w/2,392-h-12,12,h+12);
    for(let r=0;r<3;r++){if(qr()<.65)b5Win(g,xx-4,392-h+20+r*34,8,12,1,'#ffcf7a')}if(qr()<.7){g.strokeStyle='#0e1122';g.lineWidth=2;g.beginPath();g.moveTo(xx,392-h-12);g.lineTo(xx,392-h-46);g.stroke();g.fillStyle='#6a1a1e';g.beginPath();g.moveTo(xx,392-h-46);g.lineTo(xx+20,392-h-40);g.lineTo(xx,392-h-34);g.fill()}});towers.push([x,392-h-6])}
  for(let x=0;x<Lw;x+=qr(40,90))pbWrap(Lw,x,6,xx=>{if(qr()<.25)b5Win(g,xx,352,5,7,1,'#ffc870')});b5Grain(g,0,100,Lw,320,.3);b5Atmo(g,200,420,'#1e2848',.1,.3,Lw);PB._ft=towers});
 fortL.post=function(L){if(!PB._ft)return;X.save();X.globalCompositeOperation='lighter';PB._ft.forEach(([tx,ty],i)=>{for(const sx of pbSX(L,tx,700)){const a=-1.57+Math.sin(T*.008+i*2.3)*.7;const g=X.createLinearGradient(sx,ty,sx+Math.cos(a)*620,ty+Math.sin(a)*620);g.addColorStop(0,'rgba(220,230,255,.2)');g.addColorStop(.6,'rgba(220,230,255,.06)');g.addColorStop(1,'rgba(220,230,255,0)');X.fillStyle=g;X.beginPath();X.moveTo(sx-2,ty);X.lineTo(sx+Math.cos(a-.06)*700,ty+Math.sin(a-.06)*700);X.lineTo(sx+Math.cos(a+.06)*700,ty+Math.sin(a+.06)*700);X.lineTo(sx+2,ty);X.closePath();X.fill();const hg=X.createRadialGradient(sx,ty,0,sx,ty,14);hg.addColorStop(0,'rgba(255,255,240,.8)');hg.addColorStop(1,'rgba(255,255,240,0)');X.fillStyle=hg;X.fillRect(sx-14,ty-14,28,28)}});X.restore()};
 PB.L.push(fortL);
 PB.L.push(b5MistL(1500,300,150,.12,.2,'#3a4466',.18,43,30));
 /* 4) palisáda, strážní věže, kasárna */
 const near=pbLayer(2600,120,320,.75,.2,(g,Lw)=>{qrS(41);g.fillStyle='#121626';for(let x=0;x<Lw;x+=11){const h=qr(56,70);g.beginPath();g.moveTo(x,400);g.lineTo(x,400-h);g.lineTo(x+5,400-h-8);g.lineTo(x+10,400-h);g.lineTo(x+10,400);g.fill()}g.fillStyle='rgba(150,170,230,.16)';for(let x=0;x<Lw;x+=11)g.fillRect(x+7,342,2,56);
  for(let x=200;x<Lw;x+=qr(500,800))pbWrap(Lw,x,60,xx=>{g.fillStyle='#141828';g.strokeStyle='#141828';g.lineWidth=4;g.beginPath();g.moveTo(xx-26,400);g.lineTo(xx-18,250);g.moveTo(xx+26,400);g.lineTo(xx+18,250);g.moveTo(xx-24,360);g.lineTo(xx+22,300);g.moveTo(xx+24,360);g.lineTo(xx-22,300);g.stroke();g.fillRect(xx-32,236,64,16);g.beginPath();g.moveTo(xx-36,236);g.lineTo(xx,208);g.lineTo(xx+36,236);g.fill();g.strokeStyle='rgba(150,170,230,.3)';g.lineWidth=1.2;g.beginPath();g.moveTo(xx-36,236);g.lineTo(xx,208);g.stroke();b5Win(g,xx-6,240,12,8,1,'#ffcf7a');PB.lights.push({L:null,x:xx,y:244,r:34,c:'#ffc060',a:.5,li:3})});
  for(let x=60;x<Lw;x+=qr(300,500))pbWrap(Lw,x,120,xx=>{const bw=qr(140,200);g.fillStyle='#161a2a';g.fillRect(xx,330,bw,70);g.beginPath();g.moveTo(xx-10,332);g.lineTo(xx+bw/2,300);g.lineTo(xx+bw+10,332);g.fill();g.strokeStyle='rgba(150,170,230,.3)';g.lineWidth=1.2;g.beginPath();g.moveTo(xx-10,332);g.lineTo(xx+bw/2,300);g.stroke();for(let k=0;k<4;k++)b5Win(g,xx+14+k*(bw-30)/3.2,346,10,12,qr()<.65,'#ffc870');g.fillStyle='#1e2232';g.fillRect(xx+bw*.7,286,10,22)});
  for(let i=0;i<3;i++){const x=qr(0,Lw);pbWrap(Lw,x,80,xx=>{pbGlow(g,xx,392,70,'#ff9a40',.3);g.fillStyle='#1a1410';g.beginPath();g.moveTo(xx-40,400);g.lineTo(xx-22,370);g.lineTo(xx,400);g.fill();g.beginPath();g.moveTo(xx+6,400);g.lineTo(xx+26,366);g.lineTo(xx+46,400);g.fill();PB.lights.push({L:null,x:xx,y:390,r:60,c:'#ff9a40',a:.3,li:3})})}
  b5Grain(g,0,120,Lw,320,.3);b5Atmo(g,320,420,'#283252',0,.35,Lw)});PB.L.push(near);
 PB.lights.forEach(q=>{if(q.li==3)q.L=near});
 PB.L.push(b5MistL(1700,330,120,.26,.3,'#4a5478',.1,47,36));
 PB.G=pbLayer(2000,360,200,1,.6,(g,Lw)=>{const gr=g.createLinearGradient(0,372,0,560);gr.addColorStop(0,'#3a3a44');gr.addColorStop(.4,'#26262e');gr.addColorStop(1,'#101014');g.fillStyle=gr;g.fillRect(0,372,Lw,190);qrS(51);
  for(let y=376;y<560;y+=9)for(let x=(y/9%2)*10-20;x<Lw+20;x+=20){const xm=((x%Lw)+Lw)%Lw;g.fillStyle=pbA(hs(xm*.37+y*1.31)<.5?'#4a4a54':'#36363e',.4+.4*hs(xm*.71+y*.53));g.fillRect(x,y,18,7);g.fillStyle='rgba(170,180,230,.1)';g.fillRect(x,y,18,1)}
  for(let i=0;i<16;i++){const x=qr(0,Lw),y=qr(388,450),w=qr(40,120);pbWrap(Lw,x,w,xx=>{g.fillStyle='rgba(12,14,24,.75)';g.beginPath();g.ellipse(xx,y,w/2,6,0,0,7);g.fill();g.fillStyle='rgba(180,190,240,.2)';g.fillRect(xx-w*.25,y-1,w*.3,2)})}b5Grain(g,0,372,Lw,190,.4)});
};

/* =========================================================
   7) VLAK – západ slunce → kaňon → noc s Leviatanem
   ========================================================= */
function b5Canyon(g,Lw,y0,h,o){/* plynulé pilíře se strukturou vrstev a svislou erozí */qrS(o.seed);let x=o.x0||0;while(x<Lw){const w=qr(o.wMin,o.wMax),top=y0+qr(o.tMin,o.tMax),sd=(x*7+o.seed)|0;
  pbWrap(Lw,x+w/2,w*.8,cx=>{const L=[],R=[],n=26;for(let i=0;i<=n;i++){const u=i/n,y=top+(480-top)*u,flare=Math.pow(u,2.2)*w*.35;L.push([cx-w/2-flare+(pbF(u*5+sd%13,50,sd%31,3)-.5)*w*.22,y]);R.push([cx+w/2+flare+(pbF(u*5+sd%17+3,50,(sd+7)%31,3)-.5)*w*.22,y])}
   const cap=[];for(let i=0;i<=8;i++){const u=i/8;cap.push([L[0][0]+(R[0][0]-L[0][0])*u,top-Math.sin(Math.PI*u)*qr(4,18)-(i%3==1?qr(0,8):0)])}
   const p=new Path2D();p.moveTo(L[n][0],482);for(let i=n;i>=0;i--)p.lineTo(L[i][0],L[i][1]);cap.forEach(q=>p.lineTo(q[0],q[1]));for(let i=0;i<=n;i++)p.lineTo(R[i][0],R[i][1]);p.lineTo(R[n][0],482);p.closePath();
   const gr=g.createLinearGradient(cx-w*.7,0,cx+w*.7,0);gr.addColorStop(0,o.c[0]);gr.addColorStop(.5,o.c[1]);gr.addColorStop(1,o.c[2]);g.fillStyle=gr;g.fill(p);g.save();g.clip(p);
   for(let i=0;i<Math.round(w/14);i++){const xx=cx-w*.6+qr(0,w*1.2),ww=qr(3,10);const vg=g.createLinearGradient(0,top,0,480);const dk=qr()<.55;vg.addColorStop(0,dk?'rgba(30,8,8,.25)':'rgba(255,210,150,.14)');vg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=vg;g.beginPath();g.moveTo(xx,top-20);g.bezierCurveTo(xx+qr(-8,8),top+(480-top)*.3,xx+qr(-12,12),top+(480-top)*.6,xx+qr(-6,6),480);g.lineTo(xx+ww,480);g.bezierCurveTo(xx+ww+qr(-12,12),top+(480-top)*.6,xx+ww+qr(-8,8),top+(480-top)*.3,xx+ww,top-20);g.closePath();g.fill()}
   for(let yy=top+qr(8,20);yy<480;yy+=qr(12,26)){g.strokeStyle=qr()<.5?'rgba(40,10,10,.22)':'rgba(255,200,140,.12)';g.lineWidth=qr(2,5);g.beginPath();for(let xx=cx-w;xx<=cx+w;xx+=12)g.lineTo(xx,yy+Math.sin(xx*.03+yy)*1.5+pbF((xx-cx+w)/(2*w)*6,6,(yy|0)%50,2)*4);g.stroke()}
   const sg=g.createLinearGradient(cx-w*.7,0,cx+w*.7,0);sg.addColorStop(0,'rgba(0,0,0,.35)');sg.addColorStop(.45,'rgba(0,0,0,0)');sg.addColorStop(.8,'rgba(255,190,120,0)');sg.addColorStop(1,o.rim||'rgba(255,190,120,.35)');g.fillStyle=sg;g.fillRect(cx-w*1.2,top-30,w*2.4,520-top);
   if(o.haze){const hz=g.createLinearGradient(0,top,0,480);hz.addColorStop(0,pbA(o.haze,o.hz0||0));hz.addColorStop(1,pbA(o.haze,o.hazeA||.5));g.fillStyle=hz;g.fillRect(cx-w*1.2,top-30,w*2.4,520-top)}g.restore();
   g.strokeStyle=o.rimTop||'rgba(255,214,160,.7)';g.lineWidth=1.5;g.beginPath();cap.forEach((q,i)=>i?g.lineTo(q[0],q[1]+.8):g.moveTo(q[0],q[1]+.8));g.stroke()});
  x+=w+qr(o.gMin,o.gMax)}}
PBB.train=function(){const SU=[640,262];Object.assign(K3R.train||{},{x:SU[0],y:SU[1]});
 const skyA=b5Sky([[0,'#1c1036'],[.28,'#4c2258'],[.48,'#9a3a5a'],[.64,'#d85e4e'],[.78,'#f8964e'],[.9,'#ffc874'],[1,'#ffe8a8']],g=>{b5Stars(g,40,-140,21);
  const hg=g.createRadialGradient(SU[0],SU[1],0,SU[0],SU[1],600);hg.addColorStop(0,'rgba(255,220,140,.5)');hg.addColorStop(.4,'rgba(255,150,80,.18)');hg.addColorStop(1,'rgba(255,120,80,0)');g.fillStyle=hg;g.fillRect(0,-340,W,H+340);b5Sun(g,SU[0],SU[1],50,'#fff6d0','#ffb460');
  const CP={type:'cu',top:'#8a4a78',bot:'#ff9a7a',sh:'#4a2048',shA:.5,hi:'#ffd8a0',hiA:.9,hiP:1.3,rim:'#fff2cc',rimA:.9,a:.96,k:.045};
  [[150,110,360,66,1],[500,30,300,54,2],[890,140,330,60,3]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,Object.assign({},CP,{L:b5L(x,y,SU[0],SU[1]+120)}),s));
  [[560,222,760,22,7],[120,240,420,18,8]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,{type:'st',n:40,top:'#e07a6a',bot:'#ffbe80',sh:'#8a3a58',hi:'#ffe6b0',hiA:.75,rim:'#fff4d8',rimA:.8,a:.85,k:.07,L:b5L(x,y,SU[0],SU[1]+60)},s))});
 const skyB=b5Sky([[0,'#02020a'],[.4,'#0a0a20'],[.72,'#1c1434'],[.9,'#341c3a'],[1,'#4a2236']],g=>{b5Stars(g,300,230,23,{x:500,y:-60,a:.3,c:'#c8b8ff'});b5Moon(g,180,92,24,'#ece8f6','#9a90cc');
  [[300,120,420,40,1],[780,80,360,34,2]].forEach(([x,y,w,h,s])=>b5Cloud(g,x,y,w,h,{type:'st',top:'#2a2244',bot:'#16122a',sh:'#06040e',hi:'#a89cd0',hiA:.5,rim:'#e0d8ff',rimA:.7,a:.75,k:.07,L:b5L(x,y,180,92)},s))});
 const mk=(a)=>pbLayer(a.Lw,a.y0,a.h,a.s,a.f,a.paint,{tr:1});
 const A=[mk({Lw:2200,y0:180,h:300,s:.5,f:.012,paint:(g,Lw)=>b5Ridge(g,Lw,480,{y:338,amp:74,P:6,seed:41,mesa:.42,top:'#9a5a7c',bot:'#b46e84',L:[.2,-1],rim:'#ffc8a0',rimA:.5,rimD:1.4,lit:'#ffb090',litA:.2,shd:'#5a2a50',shdA:.18,haze:'#f4a888',hazeA:.6,hz0:.3})}),
  mk({Lw:2600,y0:150,h:330,s:.6,f:.05,paint:(g,Lw)=>{b5Ridge(g,Lw,480,{y:380,amp:160,P:5,seed:43,mesa:.47,mk:5,top:'#a24e46',bot:'#7a3a3e',L:[.35,-1],lit:'#ffb070',litA:.42,litH:130,shd:'#3a1426',shdA:.38,sk:1.4,rim:'#ffd090',rimA:.75,rimD:2,haze:'#ea9070',hazeA:.55,hz0:.1,strata:{n:9,h:15,a:.08,w:3,o:.18},tex:['#b8604e','#6a2c34'],td:320,tl:22,tw:4,gr:.25});b5Atmo(g,150,390,'#e88a70',.1,.35,Lw)}}),
  mk({Lw:2400,y0:200,h:260,s:.75,f:.32,paint:(g,Lw)=>{qrS(45);g.fillStyle='#6a3226';g.fillRect(0,392,Lw,70);for(let x=0;x<Lw;x+=qr(60,140))pbWrap(Lw,x,40,xx=>{const h=qr(10,26);g.fillStyle='#5a2a20';g.beginPath();g.ellipse(xx,394,h*1.6,h*.6,0,Math.PI,0);g.fill();g.fillStyle='rgba(255,170,110,.25)';g.beginPath();g.ellipse(xx+h*.4,392,h*.9,h*.3,0,Math.PI,0);g.fill()});
   for(let x=80;x<Lw;x+=240){g.fillStyle='#3a1a18';g.fillRect(x-2,300,4,94);g.fillRect(x-14,306,28,4);g.fillStyle='#5a3a30';g.fillRect(x-12,302,3,4);g.fillRect(x+9,302,3,4)}g.strokeStyle='rgba(50,20,20,.8)';g.lineWidth=1;g.beginPath();for(let x=80;x<Lw+240;x+=240){g.moveTo(x-12,306);g.quadraticCurveTo(x+108,322,x+228,306)}g.stroke();
   for(let x=150;x<Lw;x+=qr(300,600))pbWrap(Lw,x,40,xx=>b5Saguaro(g,xx,394,qr(50,90),'#4a2222','rgba(255,150,90,.55)',1,x|0));b5Grain(g,0,200,Lw,260,.3);b5Atmo(g,280,400,'#f09070',.12,.3,Lw)}}),
  mk({Lw:2800,y0:300,h:200,s:.6,f:.85,paint:(g,Lw)=>{qrS(47);for(let x=0;x<Lw;x+=qr(140,320))pbWrap(Lw,x,80,xx=>b5Rock(g,xx,470,qr(16,38),'#3a1a14','rgba(255,160,100,.45)',1,x|0));
   for(let x=0;x<Lw;x+=qr(40,90))pbWrap(Lw,x,14,xx=>{g.strokeStyle='#6a4a2a';g.lineWidth=1.2;for(let j=-3;j<=3;j++){g.beginPath();g.moveTo(xx,468);g.lineTo(xx+j*3,468-qr(6,16));g.stroke()}})}})];
 const B=[mk({Lw:2200,y0:200,h:280,s:.5,f:.012,paint:(g,Lw)=>b5Ridge(g,Lw,480,{y:350,amp:110,P:6,seed:51,sharp:1.4,top:'#16142c',bot:'#1c1830',L:[-.6,-1],rim:'#8a80c0',rimA:.5,rimD:1.3,lit:'#6a5a98',litA:.25,haze:'#2a2040',hazeA:.5,tex:['#201a38'],td:700})}),
  mk({Lw:2400,y0:200,h:260,s:.75,f:.32,paint:(g,Lw)=>{qrS(55);g.fillStyle='#120e1a';g.fillRect(0,392,Lw,70);for(let x=80;x<Lw;x+=240){g.fillStyle='#08060c';g.fillRect(x-2,300,4,94);g.fillRect(x-14,306,28,4)}g.strokeStyle='rgba(10,8,16,.9)';g.lineWidth=1;g.beginPath();for(let x=80;x<Lw+240;x+=240){g.moveTo(x-12,306);g.quadraticCurveTo(x+108,322,x+228,306)}g.stroke();
   for(let x=150;x<Lw;x+=qr(300,600))pbWrap(Lw,x,40,xx=>b5Saguaro(g,xx,394,qr(50,90),'#0c0a12','rgba(150,140,210,.35)',-1,x|0))}}),
  mk({Lw:2800,y0:300,h:200,s:.6,f:.85,paint:(g,Lw)=>{qrS(57);for(let x=0;x<Lw;x+=qr(140,320))pbWrap(Lw,x,80,xx=>b5Rock(g,xx,470,qr(16,38),'#0a080e','rgba(140,130,200,.3)',-1,x|0))}})];
 const C2=mk({Lw:2400,y0:-120,h:600,s:.5,f:.2,paint:(g,Lw)=>{b5Canyon(g,Lw,-120,600,{seed:62,wMin:160,wMax:320,tMin:-60,tMax:160,gMin:30,gMax:140,c:['#7a3a3a','#a85a4a','#d88a6a'],haze:'#f0a080',hz0:.1,hazeA:.55,rim:'rgba(255,200,150,.3)'})}});
 const C=mk({Lw:2600,y0:-320,h:800,s:.6,f:.6,paint:(g,Lw)=>{b5Canyon(g,Lw,-320,800,{seed:61,wMin:180,wMax:300,tMin:-260,tMax:-60,gMin:120,gMax:300,c:['#3e1612','#7a3424','#c0644a'],haze:'#5a2018',hz0:0,hazeA:.35})}});
 const kN=()=>Math.max(0,Math.min(1,(cam-4900)/2200)),kC=()=>Math.max(0,Math.min(1,(cam-3150)/300,(5250-cam)/300));
 PB.custom=function(){const n=kN(),c=kC();X.globalAlpha=1;if(n<1){X.drawImage(skyA,0,-340)}if(n>0){X.globalAlpha=n;X.drawImage(skyB,0,-340);X.globalAlpha=1}
  A.forEach((L,i)=>{if(n<1){X.globalAlpha=(1-n)*(i>=2?1-c*.85:1);pbDrawL(L)}});if(n>0)B.forEach((L,i)=>{X.globalAlpha=n*(i>=1?1-c*.85:1);pbDrawL(L);if(i==0){const k=Math.max(0,Math.min(1,(cam-4600)/4600)),ls=.34+k*.5,lx=W*.74-(cam-6000)*.03;X.save();X.globalAlpha=n;try{tiGlow(lx,384-60*ls,520*ls,'255,70,40',.22);X.translate(lx,388);X.scale(ls,ls);tiLeviSil(T,0,0,.3)}catch(err){}X.restore()}});X.globalAlpha=1;
  if(c>0){X.globalAlpha=c;pbDrawL(C2);pbDrawL(C);X.globalAlpha=1}};
 PB.sky=skyA;PB.G=pbLayer(2400,360,200,1,.9,(g,Lw)=>{const gr=g.createLinearGradient(0,372,0,470);gr.addColorStop(0,'#b07a4c');gr.addColorStop(1,'#5a3a22');g.fillStyle=gr;g.fillRect(0,372,Lw,190);qrS(63);for(let i=0;i<600;i++){g.fillStyle=pbA(qr()<.5?'#f0c890':'#4a2a18',qr(.1,.3));g.fillRect(qr(0,Lw),qr(376,470),qr(10,50),1.2)}b5Grain(g,0,372,Lw,190,.35)},{tr:1,post(L){const n=kN(),c=kC();if(n>0){X.fillStyle='rgba(8,6,16,'+n*.75+')';X.fillRect(0,360,W,120)}if(c>0){const g=X.createLinearGradient(0,360,0,480);g.addColorStop(0,'rgba(40,14,12,'+c+')');g.addColorStop(1,'rgba(10,4,4,'+c+')');X.fillStyle=g;X.fillRect(0,360,W,130)}}});
};

/* =========================================================
   8) LEVIATAN – nitro obřího stroje: žebra, pece, potrubí
   ========================================================= */
PBB.levi=function(){PB.lights=[];
 PB.sky=b5Sky([[0,'#030202'],[.4,'#0e0606'],[.72,'#220c0a'],[.9,'#3a140e'],[1,'#4a1a10']],g=>{const fg=g.createRadialGradient(W*.5,GY+80,0,W*.5,GY+80,760);fg.addColorStop(0,'rgba(255,110,40,.3)');fg.addColorStop(.5,'rgba(160,50,20,.12)');fg.addColorStop(1,'rgba(80,20,10,0)');g.fillStyle=fg;g.fillRect(0,-340,W,H+340)});
 /* 1) katedrála žeber s pecemi */
 const L1=pbLayer(2400,-60,540,.6,.04,(g,Lw)=>{qrS(11);for(let x=0;x<Lw;x+=300){pbWrap(Lw,x+150,60,cx=>{const fy=420;const fg=g.createRadialGradient(cx,fy,4,cx,fy-20,140);fg.addColorStop(0,'rgba(255,170,70,.55)');fg.addColorStop(.4,'rgba(230,90,30,.22)');fg.addColorStop(1,'rgba(120,30,10,0)');g.fillStyle=fg;g.fillRect(cx-150,fy-170,300,220);
    g.fillStyle='#1a0c0a';g.fillRect(cx-46,fy-60,92,62);g.fillStyle='#ff9a40';g.fillRect(cx-34,fy-44,68,40);const ig=g.createLinearGradient(0,fy-44,0,fy-4);ig.addColorStop(0,'#ffd27a');ig.addColorStop(1,'#ff6a20');g.fillStyle=ig;g.fillRect(cx-30,fy-40,60,34);g.fillStyle='#1a0c0a';for(let k=-26;k<30;k+=10)g.fillRect(cx+k,fy-44,3,40)})}
   for(let x=0;x<Lw;x+=300){const w=qr(40,56);pbWrap(Lw,x,200,xx=>{const p=new Path2D();p.moveTo(xx-w/2,480);p.lineTo(xx-w/2,120);p.quadraticCurveTo(xx+150,-50,xx+300-w/2,120);p.lineTo(xx+300-w/2+w,120);p.quadraticCurveTo(xx+150,-90,xx+w/2,120);p.lineTo(xx+w/2,480);p.closePath();g.fillStyle='#150a09';g.fill(p);
    g.save();g.clip(p);const rg=g.createLinearGradient(xx-w/2,0,xx+w/2,0);rg.addColorStop(0,'rgba(255,130,70,.22)');rg.addColorStop(.25,'rgba(255,130,70,0)');g.fillStyle=rg;g.fillRect(xx-w/2,100,w,380);const bg2=g.createLinearGradient(0,300,0,480);bg2.addColorStop(0,'rgba(255,120,50,0)');bg2.addColorStop(1,'rgba(255,120,50,.2)');g.fillStyle=bg2;g.fillRect(xx-w,300,w*2,180);g.restore();
    for(let r=140;r<470;r+=26){g.fillStyle='rgba(0,0,0,.45)';g.fillRect(xx-w/2+6,r,3,3);g.fillRect(xx+w/2-9,r,3,3);g.fillStyle='rgba(255,150,90,.18)';g.fillRect(xx-w/2+6,r,3,1)}})}
   for(let i=0;i<14;i++){const x=qr(0,Lw),l=qr(80,260);pbWrap(Lw,x,10,xx=>{g.strokeStyle='#120807';g.lineWidth=3;g.setLineDash([6,3]);g.beginPath();g.moveTo(xx,-60);g.lineTo(xx+qr(-6,6),l);g.stroke();g.setLineDash([]);g.fillStyle='#1a0c0a';g.beginPath();g.arc(xx,l,6,0,7);g.fill()})}
   b5Atmo(g,-60,480,'#3a140e',.25,.45,Lw)});PB.L.push(L1);
 for(let x=150;x<2400;x+=300)PB.lights.push({L:L1,x,y:396,r:110,c:'#ff8a3a',a:.3});
 PB.L.push(b5MistL(1500,260,220,.07,.12,'#8a3418',.14,31,30));
 /* 2) potrubí, nádrže se šťávou a budíky */
 const pipes=pbLayer(2600,40,440,.75,.13,(g,Lw)=>{qrS(23);
  const P=[[110,14,0],[150,10,1],[332,18,0],[358,12,1]];for(const [y,h,t] of P){const c=t?['#2a2a30','#6a6a74','#16161a']:['#3a2418','#8a5a38','#2a180e'];const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,c[1]);gr.addColorStop(.45,c[0]);gr.addColorStop(1,c[2]);g.fillStyle=gr;g.fillRect(0,y,Lw,h);g.fillStyle='rgba(255,170,110,.18)';g.fillRect(0,y+1,Lw,1);for(let x=qr(0,120);x<Lw;x+=qr(150,260)){g.fillStyle=c[2];g.fillRect(x,y-3,10,h+6);g.fillStyle='rgba(255,190,120,.25)';g.fillRect(x,y-3,1.5,h+6)}}
  for(let i=0;i<9;i++){const x=qr(0,Lw),w=qr(14,24);pbWrap(Lw,x,w,xx=>{const gr=g.createLinearGradient(xx,0,xx+w,0);gr.addColorStop(0,'#2a180e');gr.addColorStop(.35,'#9a6a40');gr.addColorStop(1,'#1a0e08');g.fillStyle=gr;g.fillRect(xx,40,w,440);for(let y=60;y<480;y+=qr(70,120)){g.fillStyle='#1a0e08';g.fillRect(xx-3,y,w+6,7);g.fillStyle='rgba(255,200,130,.3)';g.fillRect(xx-3,y,w+6,1)}})}
  for(let i=0;i<4;i++){const x=180+i*650+qr(-60,60),w=qr(64,86),y=qr(176,230);pbWrap(Lw,x,w,xx=>{g.fillStyle='#16241e';g.fillRect(xx,y,w,480-y);const gr=g.createLinearGradient(0,y+40,0,480);gr.addColorStop(0,'rgba(150,255,180,.8)');gr.addColorStop(1,'rgba(20,130,70,.65)');g.fillStyle=gr;g.fillRect(xx+8,y+40,w-16,440-y);g.fillStyle='rgba(255,255,255,.35)';g.fillRect(xx+12,y+46,4,400-y);pbGlow(g,xx+w/2,y+120,w*1.6,'#5aff8a',.2);
   for(let k=0;k<6;k++){g.fillStyle='rgba(220,255,230,.5)';g.beginPath();g.arc(xx+12+qr(0,w-24),y+60+qr(0,200),qr(1.5,3.5),0,7);g.fill()}g.fillStyle='#c8a050';g.fillRect(xx-4,y,w+8,10);g.fillRect(xx-4,y+30,w+8,6);g.fillStyle='rgba(255,240,180,.5)';g.fillRect(xx-4,y,w+8,1.5);PB.lights.push({L:null,li:2,x:xx+w/2,y:y+140,r:w*1.5,c:'#5aff8a',a:.32})})}
  for(let i=0;i<4;i++){const x=500+i*650+qr(-40,40),y=qr(190,250);pbWrap(Lw,x,90,xx=>{g.fillStyle='#24160e';g.fillRect(xx-60,y-36,120,72);g.strokeStyle='rgba(255,180,110,.35)';g.lineWidth=1.5;g.strokeRect(xx-60,y-36,120,72);for(let k=0;k<3;k++){const gx=xx-36+k*36,r=14;g.fillStyle='#3a2a1a';g.beginPath();g.arc(gx,y-6,r+3,0,7);g.fill();g.fillStyle='#e0d6bc';g.beginPath();g.arc(gx,y-6,r,0,7);g.fill();g.strokeStyle='#2a1a10';g.lineWidth=1;for(let j=0;j<7;j++){const a=Math.PI*.8+j/6*Math.PI*1.4;g.beginPath();g.moveTo(gx+Math.cos(a)*r*.72,y-6+Math.sin(a)*r*.72);g.lineTo(gx+Math.cos(a)*r*.9,y-6+Math.sin(a)*r*.9);g.stroke()}g.strokeStyle='#c83a2a';g.lineWidth=2;g.beginPath();g.moveTo(gx,y-6);g.lineTo(gx+Math.cos(-.6+k)*r*.8,y-6+Math.sin(-.6+k)*r*.8);g.stroke()}
   for(let k=0;k<5;k++){g.fillStyle=qr()<.5?'#ff5a3a':'#ffd060';g.fillRect(xx-50+k*24,y+18,6,6)}})}
  b5Grain(g,0,40,Lw,440,.3);b5Atmo(g,40,480,'#3a140e',.12,.3,Lw)});PB.L.push(pipes);PB.lights.forEach(q=>{if(q.li==2)q.L=pipes});
 qrS(29);PB._gears=[];for(let i=0;i<5;i++)PB._gears.push({x:qr(0,2600),y:qr(140,360),r:qr(50,110),sp:(qr()<.5?-1:1)*qr(.004,.01)});
 pipes.post=function(L){for(const gq of PB._gears)for(const sx of pbSX(L,gq.x,gq.r+20)){X.save();X.translate(sx,gq.y);X.rotate(T*gq.sp);const n=Math.round(gq.r/7);X.fillStyle='rgba(40,28,20,.94)';X.beginPath();for(let k=0;k<n*2;k++){const a=k/(n*2)*6.283,rr=k%2?gq.r:gq.r*.87;X.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}X.closePath();X.fill();X.strokeStyle='rgba(255,160,90,.22)';X.lineWidth=1.5;X.beginPath();X.arc(0,0,gq.r*.86,-2.4,-.6);X.stroke();X.fillStyle='rgba(16,10,8,.92)';for(let k=0;k<5;k++){const a=k/5*6.283;X.beginPath();X.arc(Math.cos(a)*gq.r*.5,Math.sin(a)*gq.r*.5,gq.r*.18,0,7);X.fill()}X.fillStyle='rgba(140,100,60,.85)';X.beginPath();X.arc(0,0,gq.r*.14,0,7);X.fill();X.restore()}
  /* pára a jiskry z ventilů */X.save();for(let i=0;i<6;i++){const vx=(i*433+120)%2600;for(const sx of pbSX(L,vx,100)){const vy=120+(i*71)%220,u=(T+i*53)%220;if(u<70){const k=u/70;for(let j=0;j<5;j++){const t2=Math.max(0,k-j*.07),r=6+t2*44,a=(1-t2)*.26;if(a<=0)continue;const gx=sx+t2*18+Math.sin(j)*6,gy=vy-t2*70-j*4,gg=X.createRadialGradient(gx,gy,0,gx,gy,r);gg.addColorStop(0,'rgba(230,215,205,'+a+')');gg.addColorStop(1,'rgba(230,215,205,0)');X.fillStyle=gg;X.fillRect(gx-r,gy-r,r*2,r*2)}}
   else if(i%2&&u>150&&u<190){X.globalCompositeOperation='lighter';for(let k=0;k<12;k++){const tt=((u-150)+k*3)%40/40,px=sx+(k3h(k+i)-.5)*60*tt,py=vy+tt*50+tt*tt*80;X.fillStyle='rgba(255,'+(170+(k%3)*30)+',80,'+(1-tt)+')';X.fillRect(px,py,2,2)}X.globalCompositeOperation='source-over'}}}X.restore()};
 PB.L.push(b5MistL(1400,290,170,.18,.25,'#7a3018',.15,47,30));
 /* 3) blízké nosníky a lávky */
 PB.L.push(pbLayer(2200,0,480,.75,.32,(g,Lw)=>{qrS(37);for(let x=0;x<Lw;x+=qr(280,440)){const w=34;pbWrap(Lw,x,80,xx=>{g.fillStyle='#110908';g.fillRect(xx,0,w,480);g.strokeStyle='#110908';g.lineWidth=5;for(let y=20;y<480;y+=60){g.beginPath();g.moveTo(xx,y);g.lineTo(xx+w,y+60);g.moveTo(xx+w,y);g.lineTo(xx,y+60);g.stroke()}g.fillStyle='rgba(255,140,90,.2)';g.fillRect(xx,0,2,480);g.fillStyle='rgba(255,140,90,.08)';g.fillRect(xx+w-2,0,2,480)})}
  for(let i=0;i<4;i++){const y=qr(60,200),x=qr(0,Lw),w=qr(300,600);pbWrap(Lw,x,w,xx=>{g.fillStyle='#150b09';g.fillRect(xx,y,w,8);g.fillStyle='rgba(255,150,90,.25)';g.fillRect(xx,y,w,1.2);g.strokeStyle='#150b09';g.lineWidth=2;for(let k=xx;k<xx+w;k+=18){g.beginPath();g.moveTo(k,y);g.lineTo(k,y-26);g.stroke()}g.fillRect(xx,y-28,w,3)})}
  const hz=g.createLinearGradient(0,330,0,480);hz.addColorStop(0,'rgba(40,14,10,0)');hz.addColorStop(1,'rgba(40,14,10,.7)');g.save();g.globalCompositeOperation='source-atop';g.fillStyle=hz;g.fillRect(0,330,Lw,150);g.restore()}));
 PB.G=pbLayer(2000,360,200,1,.6,(g,Lw)=>{const gr=g.createLinearGradient(0,372,0,560);gr.addColorStop(0,'#2a1a16');gr.addColorStop(1,'#0a0606');g.fillStyle=gr;g.fillRect(0,372,Lw,190);qrS(53);for(let x=0;x<Lw;x+=40){g.fillStyle='rgba(0,0,0,.4)';g.fillRect(x,372,2,190);g.fillStyle='rgba(255,140,80,.06)';g.fillRect(x+2,372,1,190)}for(let i=0;i<10;i++){const x=qr(0,Lw),r=qr(40,90);pbWrap(Lw,x,r,xx=>pbGlow(g,xx,400,r,'#ff6a2a',.18))}b5Grain(g,0,372,Lw,190,.35)});
};

/* sestavená pozadí se pamatují (restart úrovně / filmové záběry bez zaseknutí) */
{const C=new Map(),BASE=['k','L','ok','sky','fx'];const _pb=pbBuild;pbBuild=function(){const k=lv&&lv.k;
 if(k&&C.has(k)){const o=C.get(k);C.delete(k);C.set(k,o);for(const key of Object.keys(PB))if(!BASE.includes(key))delete PB[key];Object.assign(PB,o);PB.k=k;PB.ok=1;PB.ms=0;return}
 for(const key of Object.keys(PB))if(!BASE.includes(key))delete PB[key];_pb();if(PB.ok&&k){const o={};for(const key of Object.keys(PB))o[key]=PB[key];C.set(k,o);while(C.size>3)C.delete(C.keys().next().value)}}}
