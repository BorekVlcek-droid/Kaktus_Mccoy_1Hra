/* ===== W28: KULISY – navržené sklady, domy, lodě, vodárna a hradby (předkreslené do mezipaměti) ===== */
const KUL={map:new Map(),gen:0,cur:null};
function kulReset(){KUL.map.clear();KUL.gen++}
{const _st=start;start=function(i,arr){kulReset();return _st(i,arr)}}
try{if(document.fonts){document.fonts.ready.then(kulReset);if(document.fonts.addEventListener)document.fonts.addEventListener('loadingdone',kulReset)}}catch(e){}
/* jedna mezipaměť na objekt; e.lamps/e.fx = živé prvky v lokálních souřadnicích */
function kulCv(o,key,w,h,paint){let e=KUL.map.get(o);if(e&&e.key===key)return e;const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w));c.height=Math.max(1,Math.ceil(h));
 const g=c.getContext('2d');g.lineJoin='round';g.lineCap='round';const X0=X;X=g;e={key,c,lamps:[],fx:[],fire:[],smoke:[]};KUL.cur=e;
 try{paint(e);const P=kP();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='lighter';const ox=e.ox||0,oy=e.oy||0;e.fx=e.fx.filter(q=>{if(q[0]!='win')return true;const x=q[1]+ox,y=q[2]+oy,r=q[3];const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba('+P.lamp+',.2)');gr.addColorStop(1,'rgba('+P.lamp+',0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);return false});g.globalCompositeOperation='source-over'}catch(err){console.error('kul',err)}finally{X=X0;KUL.cur=null}KUL.map.set(o,e);return e}
const kH=n=>hs(n*1.913+.37);
/* paleta světla podle úrovně: barva lemu, strana světla (1 = zprava), okolní tón */
const KPAL={port:{rim:'#a8c4ff',ra:.5,side:1,lamp:'255,200,120',sky:'#34465e'},
 swamp:{rim:'#d0f0a8',ra:.32,side:1,lamp:'255,196,104',sky:'#3a5242'},
 steppe:{rim:'#ffbe7a',ra:.62,side:1,lamp:'255,210,130',sky:'#8a5a6a'},
 fort:{rim:'#b4c4ff',ra:.42,side:-1,lamp:'255,190,100',sky:'#262c46'},
 mine:{rim:'#ffb060',ra:.28,side:1,lamp:'255,176,80',sky:'#2a2018'},
 sea:{rim:'#fff6d8',ra:.5,side:1,lamp:'255,216,140',sky:'#6a9cc0'}};
const kP=()=>KPAL[lv&&lv.k]||KPAL.port;
/* ---------- základní malířské nástroje ---------- */
function kClip(x,y,w,h){X.save();X.beginPath();X.rect(x,y,w,h);X.clip()}
function kShade(x,y,w,h,o){o=o||{};const P=kP();X.save();X.globalCompositeOperation='source-atop';let g=X.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'rgba(255,240,214,'+(o.top==null?.07:o.top)+')');g.addColorStop(.32,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(12,4,14,'+(o.bot==null?.4:o.bot)+')');X.fillStyle=g;X.fillRect(x,y,w,h);
 const a=o.side==null?.3:o.side;g=X.createLinearGradient(x,0,x+w,0);if(P.side>0){g.addColorStop(0,'rgba(12,4,16,'+a+')');g.addColorStop(Math.min(.45,40/w),'rgba(0,0,0,0)');g.addColorStop(1,'rgba(255,240,210,.04)')}else{g.addColorStop(0,'rgba(255,240,210,.04)');g.addColorStop(Math.max(.55,1-40/w),'rgba(0,0,0,0)');g.addColorStop(1,'rgba(12,4,16,'+a+')')}X.fillStyle=g;X.fillRect(x,y,w,h);X.restore()}
function kRim(x,y,w,h,a){const P=kP();X.save();X.globalCompositeOperation='source-atop';X.globalAlpha=(a==null?1:a)*P.ra;X.fillStyle=P.rim;if(P.side>0)X.fillRect(x+w-2.4,y,2.4,h);else X.fillRect(x,y,2.4,h);X.globalAlpha*=.55;X.fillRect(x,y,w,1.6);X.restore()}
function kOut(P,w){X.save();X.strokeStyle=OL;X.lineWidth=w||2.4;X.lineJoin='round';X.stroke(P);X.restore()}
function kGrime(x,y,w,h,seed,c,n,len){kClip(x,y,w,h);X.globalCompositeOperation='source-atop';for(let i=0;i<n;i++){const sx=x+kH(seed+i)*w,sy=y+kH(seed+i*3)*h*.7,l=(len||40)*(.4+kH(seed+i*5)),sw=2+kH(seed+i*7)*7;const g=X.createLinearGradient(0,sy,0,sy+l);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.beginPath();X.moveTo(sx,sy);X.lineTo(sx+sw,sy);X.lineTo(sx+sw*.6,sy+l);X.lineTo(sx+sw*.3,sy+l);X.closePath();X.fill()}X.restore()}
function kMoss(x,y,w,seed,c,dir){for(let i=0;i<w;i+=5){const r=kH(seed+i),hh=3+r*9;X.fillStyle=cMix(c,r<.5?'#0a1a08':'#d8f0a0',r*.25);X.beginPath();X.ellipse(x+i+r*3,y,3+r*3,hh*.5,0,0,7);X.fill();if(dir&&r>.6){X.fillRect(x+i,y,1.2,hh*1.6*dir)}}}
/* cihly */
function kBricks(x,y,w,h,base,mort,seed,o){o=o||{};const bw=o.bw||18,bh=o.bh||8;kClip(x,y,w,h);X.fillStyle=mort;X.fillRect(x,y,w,h);
 for(let r=0,yy=y;yy<y+h;r++,yy+=bh){const off=(r%2)*bw/2;for(let xx=x-off;xx<x+w;xx+=bw){const q=kH(seed+r*31+Math.round(xx)*.7);
   X.fillStyle=q<.16?cMix(base,'#140808',.28):q>.86?cMix(base,'#f0b898',.14):q>.62?cMix(base,'#3a1a10',.12):q<.32?cMix(base,'#7a4a60',.1):base;X.fillRect(xx+.7,yy+.7,bw-1.4,bh-1.4);
   X.fillStyle='rgba(255,232,205,.14)';X.fillRect(xx+.7,yy+.7,bw-1.4,1);X.fillStyle='rgba(12,0,0,.24)';X.fillRect(xx+.7,yy+bh-1.7,bw-1.4,1);
   if(q>.94){X.fillStyle=mort;X.beginPath();X.moveTo(xx+bw*.55,yy+.6);X.lineTo(xx+bw-.7,yy+.6);X.lineTo(xx+bw-.7,yy+bh*.65);X.closePath();X.fill()}}}
 X.restore()}
/* kamenné kvádry */
function kStones(x,y,w,h,base,mort,seed,o){o=o||{};const bh=o.bh||22,bw0=o.bw||36;kClip(x,y,w,h);X.fillStyle=mort;X.fillRect(x,y,w,h);
 for(let r=0,yy=y;yy<y+h;r++,yy+=bh){let xx=x-kH(seed+r*3)*bw0*.8,k=0;while(xx<x+w){const bw=bw0*(.65+kH(seed+r*7+k*3)*.75),q=kH(seed+k*13+r*17);k++;
   const c=cMix(base,q<.5?'#100c14':'#fff2dc',.05+((q*9)%1)*.12),P=aRR(xx+1,yy+1,bw-2,bh-2,o.r==null?2.6:o.r);X.fillStyle=c;X.fill(P);
   X.save();X.clip(P);X.fillStyle='rgba(255,244,222,.17)';X.fillRect(xx,yy,bw,2.2);X.fillRect(xx,yy,2,bh);X.fillStyle='rgba(8,4,12,.3)';X.fillRect(xx,yy+bh-4.2,bw,4.2);X.fillRect(xx+bw-3.4,yy,3.4,bh);
   for(let s=0;s<5;s++){X.fillStyle=kH(q*91+s)<.5?'rgba(0,0,0,.12)':'rgba(255,255,255,.08)';X.fillRect(xx+kH(q*7+s)*bw,yy+kH(q*11+s)*bh,1.4,1.2)}
   if(q>.78){X.strokeStyle='rgba(10,6,10,.5)';X.lineWidth=.8;X.beginPath();X.moveTo(xx+bw*.3,yy+2);X.lineTo(xx+bw*.42,yy+bh*.5);X.lineTo(xx+bw*.35,yy+bh-2);X.stroke()}
   X.restore();xx+=bw}}
 X.restore()}
/* prkna: svislá (výchozí) nebo vodorovná obložení s přesahem */
function kBoards(x,y,w,h,base,seed,o){o=o||{};const hor=!!o.hor,pw=o.pw||(hor?9:10);kClip(x,y,w,h);const L=hor?h:w,n=Math.ceil(L/pw)+1;
 for(let i=0;i<n;i++){const q=kH(seed+i*7.7),c=cMix(base,q<.5?'#140806':'#fff0d6',.03+((q*13)%1)*.11);X.fillStyle=c;
  if(hor){const yy=y+i*pw;X.fillRect(x,yy,w,pw);X.fillStyle='rgba(14,5,2,.5)';X.fillRect(x,yy+pw-1.7,w,1.7);X.fillStyle='rgba(255,236,200,.16)';X.fillRect(x,yy,w,1);
   let k=kH(seed+i*3)*70;while(k<w){X.fillStyle='rgba(14,5,2,.42)';X.fillRect(x+k,yy,1.1,pw-1.5);k+=70+kH(seed+i*5+k)*110}
   X.strokeStyle=cDk(base,.45);X.globalAlpha=.15;X.lineWidth=.5;X.beginPath();X.moveTo(x,yy+pw*.45);for(let k2=0;k2<=w;k2+=14)X.lineTo(x+k2,yy+pw*.45+Math.sin(k2*.05+i)*1.1);X.stroke();X.globalAlpha=1}
  else{const xx=x+i*pw,b=o.ragged?y+h-kH(seed+i*9)*o.ragged:y+h;X.fillRect(xx,y,pw,b-y);X.fillStyle='rgba(14,5,2,.55)';X.fillRect(xx,y,1.3,b-y);X.fillStyle='rgba(255,236,200,.13)';X.fillRect(xx+1.3,y,.9,b-y);
   X.strokeStyle=cDk(base,.45);X.globalAlpha=.17;X.lineWidth=.55;for(let k=0;k<2;k++){const gx=xx+pw*(.32+k*.36);X.beginPath();X.moveTo(gx,y);for(let yy=y;yy<=b;yy+=10)X.lineTo(gx+Math.sin(yy*.06+i*2+k)*.9,yy);X.stroke()}X.globalAlpha=1;
   if(q>.8){X.fillStyle=cDk(base,.45);X.beginPath();X.ellipse(xx+pw*.5,y+(b-y)*kH(seed+i*3),1.4,2.4,0,0,7);X.fill()}
   if(o.nails)o.nails.forEach(ny=>{X.fillStyle='rgba(28,24,22,.85)';X.fillRect(xx+2,y+ny,1.3,1.3);X.fillRect(xx+pw-3.3,y+ny,1.3,1.3)})}}
 X.restore()}
/* omítka (adobe) s fleky, prasklinami a odhalenými cihlami */
function kPlaster(x,y,w,h,base,seed,o){o=o||{};kClip(x,y,w,h);X.fillStyle=base;X.fillRect(x,y,w,h);
 for(let i=0;i<w*h/900;i++){const px=x+kH(seed+i)*w,py=y+kH(seed+i*3)*h,r=6+kH(seed+i*5)*22;const g=X.createRadialGradient(px,py,0,px,py,r);const l=kH(seed+i*7)<.5;g.addColorStop(0,l?'rgba(255,236,200,.1)':'rgba(70,30,20,.1)');g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.fillRect(px-r,py-r,r*2,r*2)}
 const nP=o.patches==null?Math.max(1,Math.round(w*h/14000)):o.patches;for(let i=0;i<nP;i++){const px=x+12+kH(seed*3+i)*(w-50),py=y+20+kH(seed*5+i)*(h-60),pw=24+kH(seed+i*11)*30,ph=14+kH(seed+i*13)*18;
  const pts=[];for(let k=0;k<9;k++){const a=k/9*6.283,rr=.75+kH(seed+i*17+k)*.4;pts.push(px+Math.cos(a)*pw*.5*rr,py+Math.sin(a)*ph*.5*rr)}const Pp=crLoop(pts);X.save();X.clip(Pp);
  kBricks(px-pw,py-ph,pw*2,ph*2,o.brick||'#9a5a3a',cDk(o.brick||'#9a5a3a',.45),seed+i,{bw:14,bh:7});X.fillStyle='rgba(20,8,4,.2)';X.fillRect(px-pw,py-ph,pw*2,ph*2);X.restore();
  X.save();X.strokeStyle=cDk(base,.45);X.lineWidth=1.2;X.stroke(Pp);X.strokeStyle='rgba(255,240,215,.4)';X.lineWidth=.8;X.translate(-.8,-.8);X.stroke(Pp);X.restore()}
 const nC=o.cracks==null?Math.round(w/70):o.cracks;X.strokeStyle=cDk(base,.5);X.lineWidth=.9;for(let i=0;i<nC;i++){let cx=x+kH(seed+i*19)*w,cy=y+kH(seed+i*23)*h*.8;X.beginPath();X.moveTo(cx,cy);for(let k=0;k<5;k++){cx+=(kH(seed+i*29+k)-.5)*12;cy+=4+kH(seed+i*31+k)*9;X.lineTo(cx,cy)}X.stroke()}
 X.restore()}
/* okno: rám, sklo (rozsvícené / tmavé), příčky, parapet, nadpraží nebo cihlový oblouk, okenice */
function kWin(x,y,w,h,o){o=o||{};const fr=o.fr||'#3a2a1e',lit=o.lit,tr=o.trim||cLt(fr,.15);X.save();
 X.fillStyle='rgba(8,4,10,.32)';X.fillRect(x-2,y,w+8,h+7);
 if(o.arch){const ar=w/2+7;X.save();X.translate(x+w/2,y+2);for(let k=0;k<9;k++){const a0=Math.PI+k*Math.PI/9,a1=a0+Math.PI/9;const Pv=new Path2D();Pv.arc(0,0,ar+7,a0,a1);Pv.arc(0,0,ar,a1,a0,true);Pv.closePath();cel(Pv,k%2?o.arch:cMix(o.arch,'#2a1008',.15),1,.6);aLine(Pv,o.arch,.6,.7)}X.restore()}
 const T=o.arch?(()=>{const P=new Path2D();P.moveTo(x-4,y+h+4);P.lineTo(x-4,y+2);P.arc(x+w/2,y+2,w/2+4,Math.PI,0);P.lineTo(x+w+4,y+h+4);P.closePath();return P})():aRR(x-4,y-4,w+8,h+8,1.5);cel(T,fr,1.2,.8);aLine(T,fr,1,.9);
 const G=o.arch?(()=>{const P=new Path2D();P.moveTo(x,y+h);P.lineTo(x,y+2);P.arc(x+w/2,y+2,w/2,Math.PI,0);P.lineTo(x+w,y+h);P.closePath();return P})():aRR(x,y,w,h,.5);
 X.save();X.clip(G);const yt=o.arch?y-w/2:y,hh=y+h-yt;
 if(lit){let g=X.createLinearGradient(0,yt,0,y+h);g.addColorStop(0,'#ffeab2');g.addColorStop(1,'#de8c38');X.fillStyle=g;X.fillRect(x,yt,w,hh);
  g=X.createRadialGradient(x+w*.5,y+h*.6,1,x+w*.5,y+h*.6,w);g.addColorStop(0,'rgba(255,252,226,.75)');g.addColorStop(1,'rgba(255,252,226,0)');X.fillStyle=g;X.fillRect(x,yt,w,hh);
  if(o.sil!=null){X.fillStyle='rgba(70,26,10,.6)';const sx=x+w*o.sil;X.beginPath();X.ellipse(sx,y+h*.4,w*.13,w*.15,0,0,7);X.fill();X.beginPath();X.moveTo(sx-w*.3,y+h+1);X.quadraticCurveTo(sx-w*.2,y+h*.52,sx,y+h*.52);X.quadraticCurveTo(sx+w*.2,y+h*.52,sx+w*.3,y+h+1);X.fill();if(o.hat){X.fillRect(sx-w*.22,y+h*.3,w*.44,w*.05);X.fillRect(sx-w*.11,y+h*.2,w*.22,w*.11)}}
  if(o.cur!==0){const cc=o.cc||'#a8302a';X.fillStyle=cc;X.beginPath();X.moveTo(x,yt);X.lineTo(x+w*.3,yt);X.quadraticCurveTo(x+w*.1,y+h*.5,x+w*.2,y+h);X.lineTo(x,y+h);X.closePath();X.fill();X.beginPath();X.moveTo(x+w,yt);X.lineTo(x+w*.7,yt);X.quadraticCurveTo(x+w*.9,y+h*.5,x+w*.8,y+h);X.lineTo(x+w,y+h);X.closePath();X.fill();
   X.strokeStyle=cDk(cc,.4);X.lineWidth=.6;X.beginPath();X.moveTo(x+w*.08,yt);X.quadraticCurveTo(x+w*.04,y+h*.5,x+w*.1,y+h);X.moveTo(x+w*.92,yt);X.quadraticCurveTo(x+w*.96,y+h*.5,x+w*.9,y+h);X.stroke();X.fillStyle='rgba(0,0,0,.22)';X.fillRect(x,yt,w,2.5)}
  if(KUL.cur)KUL.cur.fx.push(['win',x+w/2,y+h/2,Math.max(w,h)*1.25])}
 else{let g=X.createLinearGradient(0,yt,0,y+h);g.addColorStop(0,o.sky||kP().sky);g.addColorStop(1,'#0c1016');X.fillStyle=g;X.fillRect(x,yt,w,hh);
  X.fillStyle='rgba(255,255,255,.15)';X.beginPath();X.moveTo(x+w*.12,y+h);X.lineTo(x+w*.52,yt);X.lineTo(x+w*.7,yt);X.lineTo(x+w*.3,y+h);X.closePath();X.fill();X.fillStyle='rgba(255,255,255,.08)';X.beginPath();X.moveTo(x+w*.62,y+h);X.lineTo(x+w*.9,yt+hh*.3);X.lineTo(x+w*.98,yt+hh*.3);X.lineTo(x+w*.72,y+h);X.closePath();X.fill();
  if(o.broken){X.fillStyle='#07060a';X.beginPath();X.moveTo(x+w*.55,yt);X.lineTo(x+w,yt);X.lineTo(x+w,y+h*.55);X.lineTo(x+w*.8,y+h*.32);X.lineTo(x+w*.7,y+h*.46);X.lineTo(x+w*.62,y+h*.2);X.closePath();X.fill()}}
 X.fillStyle='rgba(10,4,4,.38)';X.fillRect(x,yt,w,2.6);X.fillRect(x,yt,2,hh);X.restore();
 if(o.bars){X.strokeStyle='#2a2626';X.lineWidth=2;for(let k=x+w/(o.bars+1);k<x+w-1;k+=w/(o.bars+1)){X.beginPath();X.moveTo(k,yt);X.lineTo(k,y+h);X.stroke()}X.strokeStyle='rgba(200,200,210,.4)';X.lineWidth=.6;for(let k=x+w/(o.bars+1);k<x+w-1;k+=w/(o.bars+1)){X.beginPath();X.moveTo(k-.6,yt);X.lineTo(k-.6,y+h);X.stroke()}}
 else{X.strokeStyle=fr;X.lineWidth=1.8;X.beginPath();X.moveTo(x+w/2,yt+(o.arch?2:0));X.lineTo(x+w/2,y+h);const rows=o.rows||2;for(let k=1;k<rows;k++){X.moveTo(x,y+h*k/rows);X.lineTo(x+w,y+h*k/rows)}X.stroke()}
 if(o.boards){X.save();[[-.1,.3],[.08,.62]].forEach(([a,v])=>{X.save();X.translate(x+w/2,y+h*v);X.rotate(a);const B=aRR(-w/2-5,-4,w+10,8,1);cel(B,'#7a6a52',1,.7);aLine(B,'#7a6a52',.8,.9);X.fillStyle='#2a2626';X.fillRect(-w/2-2,-1,1.4,1.4);X.fillRect(w/2+1,-1,1.4,1.4);X.restore()});X.restore()}
 const S=aRR(x-6,y+h+2,w+12,4.6,1);cel(S,tr,1,.8);aLine(S,fr,.8,.9);X.fillStyle='rgba(6,2,6,.34)';X.fillRect(x-4,y+h+6.6,w+8,3);
 if(!o.arch&&o.lintel!==0){const Li=aRR(x-6,y-10,w+12,5.4,1);cel(Li,tr,1,.8);aLine(Li,fr,.8,.9);X.fillStyle='rgba(6,2,6,.3)';X.fillRect(x-4,y-4.6,w+8,2)}
 if(o.sh){const sc=o.sh,sw=w*.5+2;[[x-4-sw,-1],[x+w+4,1]].forEach(([sx,d],i)=>{if(o.shOne&&i)return;X.save();X.translate(sx+(d<0?sw:0),y-2);if(i&&o.skew)X.rotate(o.skew);const Sh=aRR(d<0?-sw:0,0,sw,h+4,1);cel(Sh,sc,1,.8);X.save();X.clip(Sh);X.strokeStyle=cDk(sc,.42);X.lineWidth=.8;for(let yy=3;yy<h+4;yy+=3.4){X.beginPath();X.moveTo(d<0?-sw:0,yy);X.lineTo(d<0?0:sw,yy+1.3);X.stroke()}X.fillStyle='rgba(255,240,210,.12)';X.fillRect(d<0?-sw:0,0,sw,2);X.restore();aLine(Sh,sc,.9,.9);X.restore()})}
 X.restore()}
/* dveře: rám, prkna, Z‑výztuha, panty, klika; dvojité vrata */
function kDoor(x,y,w,h,o){o=o||{};const c=o.c||'#5a3a22',fr=o.fr||'#3a2414';X.save();
 X.fillStyle='rgba(8,4,8,.35)';X.fillRect(x-3,y-3,w+10,h+3);
 const F=o.arch?(()=>{const P=new Path2D();P.moveTo(x-5,y+h);P.lineTo(x-5,y+w/2);P.arc(x+w/2,y+w/2,w/2+5,Math.PI,0);P.lineTo(x+w+5,y+h);P.closePath();return P})():aRR(x-5,y-5,w+10,h+5,1.5);cel(F,fr,1.2,.8);aLine(F,fr,1,.9);
 const D=o.arch?(()=>{const P=new Path2D();P.moveTo(x,y+h);P.lineTo(x,y+w/2);P.arc(x+w/2,y+w/2,w/2,Math.PI,0);P.lineTo(x+w,y+h);P.closePath();return P})():aRR(x,y,w,h,.5);
 X.save();X.clip(D);X.fillStyle='#120a06';X.fillRect(x,y,w,h);
 if(o.open){const g=X.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#3a1e10');g.addColorStop(1,'#120806');X.fillStyle=g;X.fillRect(x,y,w,h);if(o.glow){const q=X.createRadialGradient(x+w/2,y+h*.7,2,x+w/2,y+h*.7,w);q.addColorStop(0,'rgba(255,200,120,.55)');q.addColorStop(1,'rgba(255,200,120,0)');X.fillStyle=q;X.fillRect(x,y,w,h)}}
 else{kBoards(x,y,w,h,c,o.seed||7,{pw:o.pw||7});if(o.dbl){X.fillStyle='rgba(10,4,2,.75)';X.fillRect(x+w/2-.9,y,1.8,h)}
  if(o.z){const zc=cDk(c,.12),brace=(x0,x1)=>{[y+h*.16,y+h*.82].forEach(yy=>{const B=aRR(x0+1,yy-3,x1-x0-2,6,1);cel(B,zc,1,.7);aLine(B,zc,.7,.85)});X.save();X.strokeStyle=cDk(zc,.35);X.lineWidth=6.6;X.beginPath();X.moveTo(x0+4,y+h*.82-2);X.lineTo(x1-4,y+h*.16+2);X.stroke();X.strokeStyle=zc;X.lineWidth=4.8;X.stroke();X.strokeStyle='rgba(255,236,200,.2)';X.lineWidth=1;X.stroke();X.restore()};if(o.dbl){brace(x,x+w/2);brace(x+w/2,x+w)}else brace(x,x+w)}
  if(o.studs){X.fillStyle='#2a2626';for(let yy=y+10;yy<y+h-6;yy+=12)for(let xx=x+6;xx<x+w-4;xx+=10){X.beginPath();X.arc(xx,yy,1.3,0,7);X.fill()}}
  X.fillStyle='#262224';[y+h*.16,y+h*.82].forEach(yy=>{X.fillRect(x+1,yy-2.2,w*(o.dbl?.18:.32),4.4);X.fillStyle='#7a7a80';X.fillRect(x+1,yy-2.2,w*(o.dbl?.18:.32),1);X.fillStyle='#262224'});
  if(o.dbl)[y+h*.16,y+h*.82].forEach(yy=>{X.fillStyle='#262224';X.fillRect(x+w*.82-1,yy-2.2,w*.18,4.4);X.fillStyle='#7a7a80';X.fillRect(x+w*.82-1,yy-2.2,w*.18,1)});
  X.fillStyle='#d9b25a';X.beginPath();X.arc(o.dbl?x+w/2-4:x+w-6,y+h*.56,1.9,0,7);X.fill();X.fillStyle='rgba(60,40,10,.6)';X.beginPath();X.arc((o.dbl?x+w/2-4:x+w-6)+.6,y+h*.56+.6,1.1,0,7);X.fill()}
 X.fillStyle='rgba(8,2,4,.45)';X.fillRect(x,y,w,4);X.fillRect(x,y,3,h);X.restore();
 const St=aRR(x-8,y+h-3,w+16,4,1);cel(St,'#6a6a70',1,.7);X.restore()}
/* dřevěná cedule s ozdobným písmem */
function kSign(cx,cy,txt,o){o=o||{};X.save();X.font=(o.fs||14)+'px '+FONT;const tw=X.measureText(txt).width,w=Math.max(o.minW||0,tw+(o.pad||26)),h=o.h||24,x=cx-w/2,y=cy-h/2,c=o.c||'#c8a46a';
 X.fillStyle='rgba(6,2,4,.42)';X.fillRect(x+3,y+4,w,h);
 const B=aRR(x,y,w,h,2);X.save();X.clip(B);kBoards(x,y,w,h,c,(o.seed||7)+w,{hor:1,pw:h/2});X.restore();shOver(B,1.6,1);
 X.strokeStyle=o.fr||'#4a2a14';X.lineWidth=2.6;X.strokeRect(x+3,y+3,w-6,h-6);X.strokeStyle=OL;X.lineWidth=1.8;X.strokeRect(x,y,w,h);
 X.fillStyle='#2a2626';[[x+5.5,y+5.5],[x+w-5.5,y+5.5],[x+5.5,y+h-5.5],[x+w-5.5,y+h-5.5]].forEach(([a,b])=>{X.beginPath();X.arc(a,b,1.2,0,7);X.fill()});
 X.textAlign='center';X.textBaseline='middle';X.fillStyle='rgba(255,244,214,.35)';X.fillText(txt,cx+.8,cy+2.2);X.fillStyle=o.tc||'#3a1a08';X.fillText(txt,cx,cy+1.4);X.restore();return w}
/* malované písmo přímo na zdi (vybledlé) */
function kPaint(cx,cy,txt,o){o=o||{};X.save();X.font=(o.fs||22)+'px '+FONT;X.textAlign='center';X.textBaseline='middle';X.globalAlpha=o.a||.8;
 if(o.band){const tw=X.measureText(txt).width+30;X.fillStyle=o.band;X.fillRect(cx-tw/2,cy-(o.fs||22)*.7,tw,(o.fs||22)*1.4);X.strokeStyle=o.tc||'#f2e6c8';X.lineWidth=1.4;X.strokeRect(cx-tw/2+3,cy-(o.fs||22)*.7+3,tw-6,(o.fs||22)*1.4-6)}
 X.fillStyle='rgba(0,0,0,.35)';X.fillText(txt,cx+1.4,cy+1.6);X.fillStyle=o.tc||'#f2e6c8';X.fillText(txt,cx,cy);
 X.globalCompositeOperation='destination-out';X.globalAlpha=.35;for(let i=0;i<40;i++){X.fillRect(cx+(kH(i*3+cx)-.5)*X.measureText(txt).width,cy+(kH(i*7+cy)-.5)*(o.fs||22),1.6+kH(i)*3,1.2)}X.restore()}
/* římsa s konzolkami */
function kCornice(x,y,w,c,o){o=o||{};const hh=o.h||14;X.fillStyle='rgba(6,2,6,.4)';X.fillRect(x,y+hh-2,w,5);
 if(o.br){for(let k=x+8;k<=x+w-14;k+=o.br){const Br=new Path2D();Br.moveTo(k,y+hh-2);Br.lineTo(k+7,y+hh-2);Br.lineTo(k+7,y+hh+5);Br.quadraticCurveTo(k+2,y+hh+5,k,y+hh+13);Br.closePath();cel(Br,c,1,.7);aLine(Br,c,.7,.85)}}
 const B=aRR(x-6,y,w+12,hh,1.5);cel(B,c,1.6,1);X.save();X.clip(B);X.fillStyle=cDk(c,.4);for(let k=x-4;k<x+w+4;k+=o.dent||10)X.fillRect(k,y+hh-5,5,5);X.fillStyle=cDk(c,.25);X.fillRect(x-6,y+hh*.45,w+12,1.2);X.fillStyle=cLt(c,.35);X.fillRect(x-6,y,w+12,1.8);X.restore();aLine(B,c,1.1,.95)}
/* nástěnná lucerna (živé světlo přidá kreslení) */
function kLamp(x,y,d){d=d||1;X.save();X.strokeStyle='#1e1a1a';X.lineWidth=2;X.beginPath();X.moveTo(x-d*12,y-12);X.quadraticCurveTo(x-d*2,y-16,x,y-10);X.stroke();X.fillStyle='#2a2626';X.fillRect(x-d*14,y-16,d*3,9);
 const B=new Path2D();B.moveTo(x-5,y-8);B.lineTo(x+5,y-8);B.lineTo(x+6,y+6);B.lineTo(x-6,y+6);B.closePath();X.fillStyle='#ffe2a0';X.fill(B);X.fillStyle='rgba(255,255,230,.8)';X.fillRect(x-2,y-4,4,7);X.strokeStyle='#1e1a1a';X.lineWidth=1.4;X.stroke(B);X.beginPath();X.moveTo(x,y-8);X.lineTo(x,y+6);X.stroke();
 const Tp=new Path2D();Tp.moveTo(x-7,y-8);Tp.lineTo(x,y-14);Tp.lineTo(x+7,y-8);Tp.closePath();X.fillStyle='#2a2626';X.fill(Tp);X.fillStyle='#2a2626';X.fillRect(x-6,y+6,12,3);X.restore();if(KUL.cur)KUL.cur.lamps.push([x,y-1])}
/* okap / svod */
function kPipe(x,y0,y1){const g=X.createLinearGradient(x-3,0,x+3,0);g.addColorStop(0,'#24262a');g.addColorStop(.45,'#7a7e86');g.addColorStop(1,'#1a1c20');X.fillStyle=g;X.fillRect(x-2.6,y0,5.2,y1-y0);X.strokeStyle=OL;X.lineWidth=1;X.strokeRect(x-2.6,y0,5.2,y1-y0);for(let yy=y0+22;yy<y1-6;yy+=52){X.fillStyle='#3a3c40';X.fillRect(x-4.2,yy,8.4,3)}X.fillStyle='#4a4e56';X.beginPath();X.moveTo(x-2.6,y1-7);X.lineTo(x+7,y1-1);X.lineTo(x-2.6,y1-1);X.closePath();X.fill();X.stroke()}
/* plakát „SE HLEDÁ“ */
function kPoster(x,y,rot,s){X.save();X.translate(x,y);X.rotate(rot);X.scale(s||1,s||1);const w=22,h=28;X.fillStyle='rgba(6,2,4,.35)';X.fillRect(-w/2+2,-h/2+2,w,h);X.fillStyle='#e8d8aa';X.beginPath();X.moveTo(-w/2,-h/2);X.lineTo(w/2,-h/2);X.lineTo(w/2,h/2-3);X.lineTo(w/2-4,h/2);X.lineTo(-w/2,h/2);X.closePath();X.fill();X.fillStyle='rgba(140,90,40,.25)';X.fillRect(-w/2,h/2-7,w,7);
 X.fillStyle='#3a2210';X.font='700 5px Georgia';X.textAlign='center';X.fillText('SE HLEDÁ',0,-h/2+6.5);X.fillStyle='#5a4a34';X.beginPath();X.ellipse(0,-h/2+13.5,4,4.4,0,0,7);X.fill();X.fillRect(-5.5,-h/2+17,11,4);X.fillStyle='#3a2210';X.font='700 4.6px Georgia';X.fillText('500 $',0,h/2-3.5);X.strokeStyle='rgba(60,40,20,.55)';X.lineWidth=.6;X.strokeRect(-w/2,-h/2,w,h);X.fillStyle='#2a2626';X.beginPath();X.arc(0,-h/2+2,1.1,0,7);X.fill();X.restore()}
/* svislý trámek / sloup */
function kPost(x,y,w,h,c){const P=aRR(x,y,w,h,1);cel(P,c,1.4,.9);X.save();X.clip(P);X.strokeStyle=cDk(c,.45);X.globalAlpha=.25;X.lineWidth=.6;X.beginPath();X.moveTo(x+w*.4,y);X.lineTo(x+w*.45,y+h);X.stroke();X.restore();aLine(P,c,.9,.9)}
/* živé prvky: rozkmitané světlo luceren a oken */
function kulLive(e,dx,dy){const P=kP();if(!e.lamps.length&&!e.fx.length&&!e.smoke.length&&!e.fire.length)return;X.save();X.globalCompositeOperation='lighter';
 for(const q of e.lamps){const x=dx+q[0],y=dy+q[1];if(x<-120||x>W+120)continue;const f=.82+.12*Math.sin(T*.21+q[0])+.06*Math.sin(T*.53+q[1]);const g=X.createRadialGradient(x,y,0,x,y,70);g.addColorStop(0,'rgba('+P.lamp+','+.55*f+')');g.addColorStop(.25,'rgba('+P.lamp+','+.2*f+')');g.addColorStop(1,'rgba('+P.lamp+',0)');X.fillStyle=g;X.fillRect(x-70,y-70,140,140)}
 for(const q of e.fx){if(q[0]!='win')continue;const x=dx+q[1],y=dy+q[2],r=q[3];if(x<-r||x>W+r)continue;const f=.9+.1*Math.sin(T*.07+q[1]*.1);const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+P.lamp+','+.16*f+')');g.addColorStop(1,'rgba('+P.lamp+',0)');X.fillStyle=g;X.fillRect(x-r,y-r,r*2,r*2)}
 for(const q of e.fire){const x=dx+q[0],y=dy+q[1];if(x<-60||x>W+60)continue;const f=.8+.2*Math.sin(T*.4+q[0]);X.fillStyle='rgba(255,170,60,'+.9*f+')';X.beginPath();X.moveTo(x-4,y);X.quadraticCurveTo(x-5,y-8,x+Math.sin(T*.3+q[0])*2,y-15*f);X.quadraticCurveTo(x+5,y-8,x+4,y);X.closePath();X.fill();X.fillStyle='rgba(255,240,180,.9)';X.beginPath();X.ellipse(x,y-3,2,4*f,0,0,7);X.fill();const g=X.createRadialGradient(x,y-6,0,x,y-6,60);g.addColorStop(0,'rgba(255,170,70,'+.35*f+')');g.addColorStop(1,'rgba(255,170,70,0)');X.fillStyle=g;X.fillRect(x-60,y-66,120,120)}
 X.restore();
 for(const q of e.smoke){const x=dx+q[0],y=dy+q[1];if(x<-100||x>W+100)continue;for(let k=0;k<6;k++){const age=((T*.6+k*20)%120)/120,px=x-age*28+Math.sin(T*.03+k)*4,py=y-age*70,r=4+age*14;X.fillStyle='rgba('+(q[2]||'150,150,150')+','+(.32*(1-age))+')';X.beginPath();X.arc(px,py,r,0,7);X.fill()}}}

/* =================== STAVBY =================== */
const KST={};
/* ---------- PŘÍSTAV: sklady, krámky a úřad přístavního mistra ---------- */
function kWhGround(o,w,h,pl,sd,fr,tr,doorC,shop){/* přízemí: vrata/dveře + výloha nebo okna */
 if(!(o.b<=0&&w>=100))return;const dw=shop?Math.min(40,w*.2):Math.min(76,w*.34),dh=shop?70:84;let dx=shop?w-dw-22:w/2-dw/2;
 kDoor(dx,h-dh,dw,dh,shop?{c:doorC,fr,seed:sd}:{c:doorC,fr,dbl:1,z:1,seed:sd});kLamp(dx-12,h-dh-16,-1);
 if(shop){const sx=16,sw=dx-sx-30,sy=h-pl-62;if(sw>40){const lit=1;kWin(sx,sy,sw,56,{lit,fr,trim:tr,rows:2,cur:0});X.save();X.beginPath();X.rect(sx,sy,sw,56);X.clip();
   if(shop=='fish'){for(let k=0;k<Math.floor(sw/12);k++){const fx=sx+8+k*12,fy=sy+10+(k%2)*6;X.strokeStyle='#3a2a1a';X.lineWidth=.8;X.beginPath();X.moveTo(fx,sy);X.lineTo(fx,fy-6);X.stroke();X.save();X.translate(fx,fy+4);X.rotate(1.5);const F=new Path2D();F.ellipse(0,0,8,3.4,0,0,7);cel(F,k%3?'#9aa8b4':'#c0a070',.8,.6);X.fillStyle='#6a7a86';X.beginPath();X.moveTo(-7,0);X.lineTo(-11,-3);X.lineTo(-11,3);X.closePath();X.fill();X.restore()}
    X.fillStyle='#5a3a22';X.fillRect(sx,sy+44,sw,12);for(let k=0;k<sw;k+=9){X.fillStyle=k%18?'#b8c4cc':'#c8a070';X.beginPath();X.ellipse(sx+k+5,sy+44,4.5,2.2,0,0,7);X.fill()}}
   else{for(let r=0;r<2;r++){X.fillStyle='#4a2a14';X.fillRect(sx,sy+22+r*22,sw,3);for(let k=0;k<Math.floor(sw/8);k++){const bx=sx+4+k*8,bc=['#2a5a2a','#6a3a14','#3a2a1a','#7a5a20'][(k+r)%4];X.fillStyle=bc;X.fillRect(bx,sy+8+r*22,5,14);X.fillRect(bx+1.5,sy+4+r*22,2,5);X.fillStyle='rgba(255,240,200,.45)';X.fillRect(bx+1,sy+10+r*22,1,9)}}}
   X.restore();if(KUL.cur)KUL.cur.fx.push(['win',sx+sw/2,sy+28,sw*.8])}}
 else if(w>=170){const room=(dx-24),ww=Math.min(30,room-10);if(ww>=18){[[dx/2-ww/2-4],[dx+dw+(w-dx-dw)/2-ww/2+4]].forEach(([wx],i)=>kWin(wx,h-pl-58,ww,36,{lit:kH(sd+i*9)>.35,fr,trim:tr,rows:3,cc:'#7a3a2a'}))}}}
KST.whouse={m:[34,40,70,4],paint(o,w,h){const sd=(o.x|0)%997,pl=Math.min(44,h*.16),wh=h-pl,sg=o.sign||'',
 kind=sg=='RYBY'?'fish':sg=='ROM'?'rum':sg.indexOf('MISTR')>=0?'office':'brick',fr='#2e3a32',tr='#8a8476';
 if(kind=='fish'||kind=='rum'){const wc=kind=='fish'?'#46687a':'#76302a',tc='#e6dcc0';kBoards(0,0,w,wh,wc,sd,{hor:1,pw:9});[0,w-9].forEach(px=>{const Cb=aRR(px,0,9,wh,1);cel(Cb,tc,1,.8);aLine(Cb,'#5a5040',.7,.9)});
  kStones(0,wh,w,pl,'#5a5e66','#1e2026',sd,{bh:pl/2,bw:42});kMoss(2,h-3,w-4,sd,'#3a5a32');
  if(wh>200){const n=Math.max(1,Math.floor((w-30)/70)),cw=(w-20)/n;for(let wy=56;wy+40<wh-110;wy+=70)for(let c=0;c<n;c++)kWin(10+cw*c+cw/2-13,wy,26,34,{lit:kH(sd+c*7+wy)>.45,fr:'#3a2a1e',trim:tc,cc:'#8a2a24',sh:kH(sd+c+wy)>.6?wc:null})}
  kWhGround(o,w,h,pl,sd,'#3a2a1e',tc,kind=='fish'?'#2e4a56':'#4a1e18',kind);
  if(sg){const sw=kSign(w/2,26,sg,{fs:16,h:26,c:kind=='fish'?'#d8c8a0':'#e0c890',tc:'#2a1406',seed:sd});X.save();X.translate(w/2+sw/2+16,26);if(kind=='fish'){const F=new Path2D();F.ellipse(0,0,11,5,0,0,7);cel(F,'#8aa0b0',1,.8);aLine(F,'#2a3a46',.8,.9);X.fillStyle='#6a8090';X.beginPath();X.moveTo(-10,0);X.lineTo(-17,-5);X.lineTo(-17,5);X.closePath();X.fill();X.fillStyle='#111';X.beginPath();X.arc(6,-1,1.2,0,7);X.fill()}else{const Bt=new Path2D();Bt.moveTo(-4,10);Bt.lineTo(-4,-2);Bt.quadraticCurveTo(-4,-5,-1.6,-6);Bt.lineTo(-1.6,-12);Bt.lineTo(1.6,-12);Bt.lineTo(1.6,-6);Bt.quadraticCurveTo(4,-5,4,-2);Bt.lineTo(4,10);Bt.closePath();cel(Bt,'#3a6a2a',1,.8);aLine(Bt,'#14260e',.8,.9);X.fillStyle='#e8d8b0';X.fillRect(-3,0,6,5)}X.restore()}
  kPipe(w-14,10,h-2);kGrime(0,12,w,wh,sd,'rgba(10,14,20,.3)',Math.round(w/22),60);kCornice(0,0,w,kind=='fish'?'#e6dcc0':'#d8c8a8',{h:12,br:40,dent:9})}
 else{const office=kind=='office',bc=office?'#5e3a30':['#6a382c','#5c3428','#6e3e30','#54383a'][sd%4];
  kBricks(0,0,w,wh,bc,'#2a1e1c',sd,{bw:18,bh:8});
  if(office){kStones(0,wh-96,w,96,'#7a766c','#2a2822',sd,{bh:24,bw:46});}
  for(let yy=18,i=0;yy<wh-(office?100:12);yy+=21,i++){const qw=i%2?15:24;[[0,qw],[w-qw,qw]].forEach(([qx,ww])=>{const Q=aRR(qx,yy,ww,19,1.5);cel(Q,'#868276',1.2,.8);aLine(Q,'#5a564c',.7,.8)})}
  kStones(0,wh,w,pl,'#5a5e66','#1e2026',sd,{bh:pl/2,bw:42});X.fillStyle='rgba(30,60,40,.35)';X.fillRect(0,h-10,w,10);kMoss(2,h-3,w-4,sd,'#3a5a32');
  const gf=Math.max(0,wh-96);if(gf>40){const B=aRR(-3,gf,w+6,7,1);cel(B,'#8a8476',1,.8);aLine(B,'#5a564c',.8,.9);X.fillStyle='rgba(6,2,6,.35)';X.fillRect(0,gf+7,w,3)}
  const cols=Math.max(1,Math.floor((w-40)/(office?70:64))),cw=(w-20)/cols;let rr=0;for(let wy=office?74:50;wy+40<gf-4;wy+=office?82:66,rr++){for(let c=0;c<cols;c++){const ww=office?28:24,wh2=office?44:32,wx=10+cw*c+cw/2-ww/2;const lit=kH(sd+c*7+rr*13)>.5;kWin(wx,wy,ww,wh2,{lit,arch:'#7a4a36',fr,trim:tr,rows:office?3:2,sil:lit&&kH(sd+c+rr)>.7?.4:null,hat:1,cc:kH(sd+c*3)>.5?'#8a2a24':'#2a5a6a',sh:office?'#2e4a3a':(!lit&&kH(sd+c*5+rr)>.55?'#2e4a3a':null),skew:.08})}}
  kWhGround(o,w,h,pl,sd,fr,tr,office?'#4a2a1a':'#3a4a3a',null);
  if(sg&&!office)kSign(w/2,26,sg,{fs:16,h:26,c:'#c8a868',tc:'#2a1406',seed:sd});
  if(office){kSign(w/2,32,sg,{fs:12,h:22,c:'#d8c8a0',tc:'#2a1406',seed:sd,pad:20});const Cl=aEll(w/2,-22,14,14);X.save();const Pd=new Path2D();Pd.moveTo(w/2-34,0);Pd.lineTo(w/2-28,-22);Pd.quadraticCurveTo(w/2,-46,w/2+28,-22);Pd.lineTo(w/2+34,0);Pd.closePath();X.save();X.clip(Pd);kBricks(w/2-36,-48,72,50,bc,'#2a1e1c',sd+7,{bw:16,bh:7});X.restore();kOut(Pd,2);X.restore();cel(Cl,'#ece6d0',1,.8);aLine(Cl,'#3a3020',1,.9);X.strokeStyle='#2a2018';X.lineWidth=1.6;X.beginPath();X.moveTo(w/2,-22);X.lineTo(w/2,-31);X.moveTo(w/2,-22);X.lineTo(w/2+7,-19);X.stroke();X.strokeStyle='#8a7a5a';X.lineWidth=2.4;X.beginPath();X.arc(w/2,-22,15.5,0,7);X.stroke()}
  if(kind=='brick'&&sg=='LANA'){[[w*.22,h-pl-40],[w*.8,h-pl-46]].forEach(([cx,cy],i)=>{X.fillStyle='#2a2626';X.fillRect(cx-1.5,cy-16,3,6);for(let k=0;k<4;k++){X.strokeStyle=k%2?'#c8a868':'#a8885a';X.lineWidth=2.4;X.beginPath();X.ellipse(cx,cy+k*.6,12-k*1.5,15-k*1.2,0,0,7);X.stroke()}X.strokeStyle='rgba(40,20,10,.5)';X.lineWidth=.8;X.beginPath();X.ellipse(cx,cy,13,16,0,0,7);X.stroke()})}
  kPipe(9,10,h-2);if(w>150&&!office)kPoster(w*.78,h-pl-70,(kH(sd)-.5)*.2,1);kGrime(0,12,w,wh,sd,'rgba(10,14,20,.32)',Math.round(w/22),60);kCornice(0,0,w,'#6e6a62',{h:13,br:44,dent:9})}
 /* kladkový trám se zavěšeným hákem */if(w>=150&&kind!='office'){X.save();const bx=w-4,by=18;const Bm=aRR(bx-4,by-5,52,10,1.5);cel(Bm,'#5a3a22',1.4,.9);aLine(Bm,'#5a3a22',.9,.9);X.fillStyle='#2a2626';X.beginPath();X.arc(bx+40,by+8,5.5,0,7);X.fill();X.fillStyle='#7a7a80';X.beginPath();X.arc(bx+40,by+8,2,0,7);X.fill();
  X.strokeStyle='#8a7a5a';X.lineWidth=1.6;X.beginPath();X.moveTo(bx+45.5,by+8);X.lineTo(bx+45.5,by+86);X.moveTo(bx+34.5,by+8);X.lineTo(bx+34.5,by+60);X.stroke();X.strokeStyle='#2a2626';X.lineWidth=2.4;X.beginPath();X.arc(bx+45.5,by+92,5,-1.2,Math.PI*.9);X.stroke();X.restore()}
 kShade(0,0,w,h,{bot:.42,side:.32});kRim(0,0,w,h);X.lineWidth=2.4;X.strokeStyle=OL;X.strokeRect(0,0,w,h)}};
/* ---------- PŘÍSTAV: palubní kajuta ---------- */
KST.cabin={m:[16,26,16,4],paint(o,w,h){const sd=(o.x|0)%997,c='#7a4a2a';kBoards(0,0,w,h,c,sd,{hor:1,pw:9});
 X.fillStyle='rgba(20,10,4,.35)';X.fillRect(0,0,6,h);X.fillRect(w-6,0,6,h);[0,w-6].forEach(px=>{const P=aRR(px,0,6,h,1);cel(P,'#5a3418',1,.7)});
 for(let wx=18;wx<w-64;wx+=52)kWin(wx,24,24,26,{lit:1,fr:'#3a2414',trim:'#c9a95a',cc:'#2a5a7a'});
 kDoor(w-46,22,30,h-22,{c:'#6a3a1e',fr:'#3a2414',seed:sd});
 const R=aRR(-7,-6,w+14,12,2);cel(R,'#3a2414',1.4,.9);X.fillStyle='#c9a95a';X.fillRect(-7,-6,w+14,2);aLine(R,'#3a2414',1,.9);
 /* zábradlí na střeše */X.fillStyle='#6a4426';for(let px=4;px<w;px+=18){kPost(px,-24,4,18,'#6a4426')}const Rl=aRR(-4,-27,w+8,5,1.5);cel(Rl,'#7a5230',1,.8);aLine(Rl,'#3a2414',.8,.9);
 kLamp(12,16,1);const Lb=aEll(w*.55,h*.62,11,11);X.save();X.lineWidth=5;X.strokeStyle='#e8e0d0';X.stroke(Lb);X.lineWidth=5;X.setLineDash([5,7]);X.strokeStyle='#c8241a';X.stroke(Lb);X.restore();X.strokeStyle=OL;X.lineWidth=1;X.beginPath();X.arc(w*.55,h*.62,13.5,0,7);X.stroke();X.beginPath();X.arc(w*.55,h*.62,8.5,0,7);X.stroke();
 kShade(0,0,w,h,{bot:.3});kRim(0,0,w,h);X.strokeStyle=OL;X.lineWidth=2.2;X.strokeRect(0,0,w,h)}};
/* ---------- PŘÍSTAV: trup Baronovy plachetnice ---------- */
KST.hull={m:[44,170,230,10],paint(o,w,h){const sd=(o.x|0)%997;
 const P=new Path2D();P.moveTo(-26,-8);P.lineTo(w-50,-8);P.quadraticCurveTo(w+26,-12,w+46,-46);P.quadraticCurveTo(w+44,130,w-70,h);P.lineTo(60,h);P.quadraticCurveTo(-6,150,-26,-8);P.closePath();
 const sh=x=>{const u=Math.max(0,(x-(w-130))/176);return-40*u*u};/* stoupání přídě */
 X.save();X.clip(P);X.fillStyle='#2a1a12';X.fillRect(-40,-60,w+120,h+80);
 /* pásy obšívky */const band=(y0,y1,c,seed)=>{X.beginPath();X.moveTo(-40,y0+sh(-40));for(let x=-40;x<=w+80;x+=20)X.lineTo(x,y0+sh(x)*(1-y0/240));for(let x=w+80;x>=-40;x-=20)X.lineTo(x,y1+sh(x)*(1-y1/240));X.closePath();X.fillStyle=c;X.fill()};
 for(let y=-10,i=0;y<h;y+=11,i++){const q=kH(sd+i*5);band(y,y+11,cMix('#3a2418',q<.5?'#0c0604':'#e8c8a0',.04+q*.08),i);X.strokeStyle='rgba(8,3,2,.55)';X.lineWidth=1.1;X.beginPath();for(let x=-40;x<=w+80;x+=20)X.lineTo(x,y+11+sh(x)*(1-(y+11)/240));X.stroke()}
 band(-10,16,'#1c1412');band(40,74,'#b0843a');band(74,80,'#1c1412');band(18,30,'#140c0a');band(84,96,'#140c0a');
 X.fillStyle='#d8b050';X.globalAlpha=.9;band(37,40,'#d8b050');band(80,82,'#c9a040');X.globalAlpha=1;
 /* měděné oplechování pod čárou ponoru */band(150,h+40,'#4e6a58');X.save();X.globalAlpha=.5;for(let r=0;r<12;r++)for(let x=-30+(r%2)*12;x<w+60;x+=24){X.fillStyle=kH(r*17+x)>.5?'#6a8a6a':'#3a5244';X.fillRect(x,154+r*12+sh(x)*.3,23,11)}X.restore();
 /* dřevo – žilkování */X.strokeStyle='rgba(255,220,180,.06)';X.lineWidth=.8;for(let i=0;i<60;i++){const x=kH(sd+i)*w,y=-6+kH(sd+i*3)*150;X.beginPath();X.moveTo(x,y+sh(x));X.lineTo(x+30+kH(i)*40,y+sh(x)+(kH(i*7)-.5)*2);X.stroke()}
 /* dělové střílny s otevřenými víky a hlavněmi */for(let gx=90,i=0;gx<w-150;gx+=118,i++){const gy=44+sh(gx);X.fillStyle='#0c0604';X.fillRect(gx,gy,26,24);X.strokeStyle='#d8b050';X.lineWidth=2;X.strokeRect(gx-1,gy-1,28,26);
  const L=new Path2D();L.moveTo(gx-1,gy-1);L.lineTo(gx+27,gy-1);L.lineTo(gx+30,gy-17);L.lineTo(gx+2,gy-19);L.closePath();cel(L,'#8a1e1a',1,.7);aLine(L,'#3a0c08',.8,.9);
  X.fillStyle='#1a1a1e';X.beginPath();X.ellipse(gx+13,gy+13,8,7,0,0,7);X.fill();X.fillStyle='#050405';X.beginPath();X.arc(gx+13,gy+13,4,0,7);X.fill();X.strokeStyle='rgba(200,210,230,.5)';X.lineWidth=1;X.beginPath();X.arc(gx+13,gy+13,7.5,-2.4,-.9);X.stroke()}
 /* kulatá okénka */for(let gx=120,i=0;gx<w-120;gx+=110,i++){const gy=110+sh(gx)*.6,lit=kH(sd+i*3)>.45;X.fillStyle='#c9a040';X.beginPath();X.arc(gx,gy,7.5,0,7);X.fill();X.strokeStyle='#3a2406';X.lineWidth=1.3;X.stroke();X.fillStyle=lit?'#ffd88a':'#1a2a36';X.beginPath();X.arc(gx,gy,5,0,7);X.fill();X.fillStyle='rgba(255,255,255,.55)';X.beginPath();X.arc(gx-1.8,gy-1.8,1.4,0,7);X.fill();if(lit&&KUL.cur)KUL.cur.fx.push(['win',gx,gy,22])}
 /* jméno lodi a zlatá ornamentika na přídi */X.save();X.font='22px '+FONT;X.textAlign='right';X.fillStyle='rgba(0,0,0,.5)';X.fillText('VANE & CO.',w-118,64+sh(w-118)+2);X.fillStyle='#e8c050';X.fillText('VANE & CO.',w-120,62+sh(w-120));X.restore();
 X.strokeStyle='#d8b050';X.lineWidth=2;X.beginPath();X.moveTo(w-100,96+sh(w-100));X.bezierCurveTo(w-60,80+sh(w-60),w-20,100+sh(w),w+20,60+sh(w+20));X.stroke();X.beginPath();X.arc(w-104,92+sh(w-104),5,0,6);X.stroke();
 /* záďová galerie s okny */X.fillStyle='#3a2014';X.fillRect(-30,-6,70,64);[[-12],[8]].forEach(([wx])=>{X.fillStyle='#d8b050';X.fillRect(wx-2,6,16,30);X.fillStyle='#ffd27a';X.fillRect(wx,8,12,26);X.strokeStyle='#5a3a10';X.lineWidth=1.2;X.beginPath();X.moveTo(wx+6,8);X.lineTo(wx+6,34);X.moveTo(wx,21);X.lineTo(wx+12,21);X.stroke()});if(KUL.cur)KUL.cur.fx.push(['win',4,20,40]);
 X.fillStyle='#d8b050';X.fillRect(-30,40,70,3);
 /* vlhkost, řasy u čáry ponoru, stín */const g=X.createLinearGradient(0,-10,0,h);g.addColorStop(0,'rgba(255,230,190,.1)');g.addColorStop(.3,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.55)');X.fillStyle=g;X.fillRect(-40,-60,w+120,h+80);
 X.fillStyle='rgba(40,70,40,.55)';for(let x=-30;x<w+40;x+=6){const r=kH(sd+x);X.fillRect(x,136+sh(x)*.2,6,8+r*16)}kGrime(-30,0,w+60,140,sd,'rgba(12,8,6,.35)',Math.round(w/30),70);
 X.restore();
 kOut(P,3);X.save();X.globalAlpha=kP().ra*.8;X.strokeStyle=kP().rim;X.lineWidth=1.6;X.beginPath();X.moveTo(-24,-6);X.lineTo(w-50,-6);X.quadraticCurveTo(w+24,-10,w+44,-44);X.stroke();X.restore();
 /* příďový čelen (bugsprit) s plachtou a lany */X.save();X.strokeStyle=OL;X.lineWidth=8;X.beginPath();X.moveTo(w+30,-36);X.lineTo(w+196,-140);X.stroke();X.strokeStyle='#6a4426';X.lineWidth=5.6;X.stroke();X.strokeStyle='rgba(255,226,180,.35)';X.lineWidth=1.4;X.beginPath();X.moveTo(w+32,-39);X.lineTo(w+196,-143);X.stroke();
 [[w+120,-92],[w+160,-117]].forEach(([bx,by])=>{X.fillStyle='#2a2626';X.fillRect(bx-3,by-4,6,8)});
 const J=new Path2D();J.moveTo(w+70,-60);J.quadraticCurveTo(w+110,-96,w+170,-125);J.lineTo(w+150,-104);J.quadraticCurveTo(w+110,-82,w+78,-54);J.closePath();cel(J,'#d8ccb0',1.4,.9);aLine(J,'#8a7a5a',.9,.9);
 X.strokeStyle='rgba(200,180,140,.7)';X.lineWidth=1.2;X.beginPath();X.moveTo(w+190,-138);X.lineTo(w+30,LY);X.moveTo(w+190,-138);X.lineTo(w+90,LY);X.stroke();X.restore();
 /* galion – pozlacená figura pod čelenem */X.save();X.translate(w+40,-40);X.rotate(-.55);const Fg=new Path2D();Fg.moveTo(0,0);Fg.bezierCurveTo(10,-6,24,-4,30,-12);Fg.bezierCurveTo(34,-18,30,-24,24,-22);Fg.bezierCurveTo(28,-16,22,-10,14,-10);Fg.bezierCurveTo(20,-2,12,8,0,8);Fg.closePath();cel(Fg,'#d8b050',1.2,.9,'#8a6a20','#fff0b0');aLine(Fg,'#6a4a10',.9,.9);X.restore();
 /* kotva na kočníku */X.save();X.translate(w-30,4+sh(w-30));const Ch=()=>{X.strokeStyle='#3a3a40';X.lineWidth=1.8;for(let k=0;k<6;k++){X.beginPath();X.ellipse(0,k*6,1.6,3.2,0,0,7);X.stroke()}};Ch();X.translate(0,40);const A=new Path2D();A.moveTo(-1.6,-4);A.lineTo(1.6,-4);A.lineTo(1.6,24);A.quadraticCurveTo(12,22,16,10);A.lineTo(19,13);A.quadraticCurveTo(14,32,0,32);A.quadraticCurveTo(-14,32,-19,13);A.lineTo(-16,10);A.quadraticCurveTo(-12,22,-1.6,24);A.closePath();cel(A,'#4a4e56',1.2,.8);aLine(A,'#1a1c20',1,.9);X.fillStyle='#4a4e56';X.fillRect(-9,0,18,3.4);X.strokeStyle='#4a4e56';X.lineWidth=2.4;X.beginPath();X.arc(0,-7,4,0,7);X.stroke();X.restore();
 /* odrazníky na boku */for(let fx=200;fx<w-200;fx+=240){X.strokeStyle='#8a7a5a';X.lineWidth=1.4;X.beginPath();X.moveTo(fx,-6);X.lineTo(fx,24);X.stroke();const Fd=aRR(fx-7,24,14,24,6);cel(Fd,'#a08a60',1,.7);X.save();X.clip(Fd);X.strokeStyle='rgba(60,40,20,.5)';X.lineWidth=.8;for(let k=0;k<6;k++){X.beginPath();X.moveTo(fx-8,27+k*4);X.lineTo(fx+8,25+k*4);X.stroke()}X.restore();aLine(Fd,'#5a4a2a',.8,.9)}
 /* zábradlí (balustráda) */for(let px=-14;px<w-40;px+=16){const Bp=new Path2D();Bp.moveTo(px-1.6,-8);Bp.quadraticCurveTo(px-4,-16,px-1.6,-22);Bp.quadraticCurveTo(px-3,-27,px-1.4,-32);Bp.lineTo(px+1.4,-32);Bp.quadraticCurveTo(px+3,-27,px+1.6,-22);Bp.quadraticCurveTo(px+4,-16,px+1.6,-8);Bp.closePath();cel(Bp,'#7a5232',1,.7);aLine(Bp,'#2a160a',.7,.9)}
 const Rl=aRR(-24,-38,w-10,6,2);cel(Rl,'#6a4426',1.2,.9);aLine(Rl,'#2a160a',.9,.95);X.fillStyle='#c9a95a';X.fillRect(-24,-38,w-10,1.4);
 kLamp(-14,-48,1)},
 live(o,x,top,w,h,e,dx,dy){/* hladina u boku lodi */const wy=LY+14;if(wy-camZ<H+40){X.save();const P=new Path2D();P.moveTo(x-30,wy);for(let k=0;k<=w+160;k+=12)P.lineTo(x-30+k,wy+Math.sin((x+k+cam)*.04+T*.06)*2.5);P.lineTo(x+w+130,H+420);P.lineTo(x-30,H+420);P.closePath();const g=X.createLinearGradient(0,wy,0,wy+160);g.addColorStop(0,'rgba(40,62,86,.62)');g.addColorStop(1,'rgba(10,18,30,.9)');X.fillStyle=g;X.fill(P);X.strokeStyle='rgba(200,220,255,.3)';X.lineWidth=1.6;X.beginPath();for(let k=0;k<=w+160;k+=12)X.lineTo(x-30+k,wy+Math.sin((x+k+cam)*.04+T*.06)*2.5);X.stroke();X.restore()}}};
/* ---------- BAŽINA: chatrč na kůlech ---------- */
KST.hut={m:[24,40,24,0],pre(o,w,h){const gz=gBel(o.x+w/2,o.b-2);return Math.max(0,Math.min(420,(LY-Math.max(gz,-60))-(LY-o.b)+20))},
 paint(o,w,h,e,ext){const sd=(o.x|0)%997,wall=['#5a5444','#544a3c','#5e5848'][sd%3],gy=h+ext-20;
 /* kůly a výztuhy */[10,w/2-4,w-18].forEach((sx,i)=>{kPost(sx,h-6,8,gy-h+22,'#3e3424');X.fillStyle='rgba(60,90,50,.5)';X.fillRect(sx,gy-6,8,14)});X.save();X.strokeStyle='#3a2e20';X.lineWidth=3.4;X.beginPath();X.moveTo(14,gy-10);X.lineTo(w/2,h+4);X.lineTo(w-14,gy-10);X.stroke();X.strokeStyle='rgba(255,230,190,.14)';X.lineWidth=1;X.stroke();X.restore();
 /* stěny ze zvětralých prken */kBoards(0,12,w,h-12,wall,sd,{pw:11,ragged:6,nails:[20,h-30]});
 X.fillStyle='#14100a';for(let i=0;i<3;i++){const gx=20+kH(sd+i*5)*(w-60);X.fillRect(gx,30+kH(sd+i)*40,3,14+kH(i*3)*20)}
 /* záplata z plechu */const Pt=aRR(w*.62,h*.5,30,24,1);cel(Pt,'#7a6a5e',1,.6);X.save();X.clip(Pt);X.fillStyle='rgba(150,70,30,.45)';X.beginPath();X.ellipse(w*.62+12,h*.5+16,10,6,0,0,7);X.fill();X.restore();aLine(Pt,'#3a3028',.8,.9);X.fillStyle='#2a2626';[[3,3],[27,3],[3,21],[27,21]].forEach(([a,b])=>X.fillRect(w*.62+a-1,h*.5+b-1,1.6,1.6));
 kWin(18,32,22,22,{lit:kH(sd)>.3,fr:'#2a2218',trim:'#5a5040',cur:1,cc:'#6a5a2a',sh:'#4a4434',shOne:1});
 if(w>140){kDoor(w-52,30,30,h-34,{c:'#4a4232',fr:'#2a2218',seed:sd,z:1})}
 /* rybářská síť a lebka aligátora */X.save();X.strokeStyle='rgba(200,190,150,.5)';X.lineWidth=.7;const nx=w*.4,ny=26;for(let k=0;k<7;k++){X.beginPath();X.moveTo(nx+k*5,ny);X.quadraticCurveTo(nx+k*5+4,ny+20,nx+k*4+2,ny+36);X.stroke()}for(let k=0;k<6;k++){X.beginPath();X.moveTo(nx,ny+k*6);X.quadraticCurveTo(nx+15,ny+k*6+3,nx+32,ny+k*6);X.stroke()}X.restore();
 if(w>130){X.save();X.translate(w*.5+20,22);const S=new Path2D();S.moveTo(-10,0);S.quadraticCurveTo(-4,-6,8,-4);S.lineTo(22,-2);S.lineTo(22,3);S.lineTo(6,5);S.quadraticCurveTo(-6,7,-10,0);S.closePath();cel(S,'#e8dcc0',1,.7);aLine(S,'#6a5a40',.8,.9);X.fillStyle='#2a1a10';X.beginPath();X.arc(0,-1,1.8,0,7);X.fill();for(let k=8;k<21;k+=3){X.fillStyle='#fff8e8';X.fillRect(k,2.5,1.2,2.4)}X.restore()}
 /* mech dole, vlhkost */kMoss(0,h-2,w,sd,'#4a6a34',1);kGrime(0,12,w,h-12,sd,'rgba(20,30,16,.35)',Math.round(w/18),50);
 kShade(0,12,w,h-12,{bot:.45,side:.3});kRim(0,12,w,h-12,.8);X.strokeStyle=OL;X.lineWidth=2.2;X.strokeRect(0,12,w,h-12);
 /* vlnitý plech střechy */const Rf=new Path2D();Rf.moveTo(-12,14);Rf.lineTo(-6,-3);Rf.lineTo(w+6,-3);Rf.lineTo(w+12,14);Rf.closePath();X.save();X.clip(Rf);const rg=X.createLinearGradient(0,-4,0,14);rg.addColorStop(0,'#9a9ea6');rg.addColorStop(1,'#565a62');X.fillStyle=rg;X.fillRect(-14,-6,w+30,22);
  for(let i=-12;i<w+12;i+=6){X.fillStyle='rgba(0,0,0,.28)';X.fillRect(i,-4,2,19);X.fillStyle='rgba(255,255,255,.18)';X.fillRect(i+3,-4,1.2,19)}for(let k=0;k<4;k++){const rx=kH(sd+k*7)*w,ry=kH(sd+k*3)*10;const g=X.createRadialGradient(rx,ry,0,rx,ry,18);g.addColorStop(0,'rgba(160,70,30,.65)');g.addColorStop(1,'rgba(160,70,30,0)');X.fillStyle=g;X.fillRect(rx-18,ry-18,36,36)}X.restore();kOut(Rf,1.8);
 /* komínová roura */X.save();const cx=w-26;const Cp=aRR(cx,-26,8,26,1);cel(Cp,'#4a4a50',1,.8);aLine(Cp,'#1a1a1e',.9,.9);X.fillStyle='#3a3a40';X.fillRect(cx-3,-30,14,5);X.restore();if(KUL.cur)KUL.cur.smoke.push([cx+4,-32,'170,180,165']);
 kLamp(w-6,24,1)}};
/* ---------- STEP: adobe ---------- */
KST.adobe={m:[30,20,30,4],paint(o,w,h){const sd=(o.x|0)%997,base=['#c8875a','#c07e54','#cc9064'][sd%3];
 const Wp=new Path2D();Wp.moveTo(0,h);Wp.lineTo(0,8);Wp.quadraticCurveTo(0,0,8,0);for(let x=8;x<w-8;x+=16)Wp.quadraticCurveTo(x+8,(kH(sd+x)-.5)*2.2,x+16,0);Wp.quadraticCurveTo(w,0,w,8);Wp.lineTo(w,h);Wp.closePath();
 X.save();X.clip(Wp);kPlaster(0,0,w,h,base,sd,{brick:'#9a5a3a'});
 /* spodní pás – omšelý a zaprášený */const g=X.createLinearGradient(0,h-40,0,h);g.addColorStop(0,'rgba(120,60,30,0)');g.addColorStop(1,'rgba(120,60,30,.45)');X.fillStyle=g;X.fillRect(0,h-40,w,40);
 kShade(0,0,w,h,{bot:.3,side:.28,top:.1});X.restore();
 /* vigas – vyčnívající trámy */for(let vx=14;vx<w-8;vx+=34){X.fillStyle='rgba(60,20,10,.35)';X.beginPath();X.ellipse(vx+3,24,8,4,0,0,7);X.fill();X.fillStyle='rgba(60,20,10,.25)';X.fillRect(vx-5,24,10,12);const V=aEll(vx,16,6.5,6.5);cel(V,'#8a5a32',1,.8);X.strokeStyle='rgba(60,30,14,.6)';X.lineWidth=.7;X.beginPath();X.arc(vx,16,3.6,0,7);X.stroke();X.beginPath();X.arc(vx,16,1.4,0,7);X.stroke();aLine(V,'#5a3418',.9,.9)}
 /* okna hluboko v omítce */const bank=o.sign=='BANKA';for(let wy=44;wy<h-96;wy+=62)for(let wx=26;wx<=w-50;wx+=64){if(o.b<=0&&w>110&&wx<w/2+30&&wx+24>w/2-30&&wy>h-160)continue;kWin(wx,wy,24,30,{lit:kH(wx+wy+sd)>.55,fr:'#2e6a74',trim:'#3a7a84',sh:bank?null:'#2e6a74',bars:bank?3:0,cc:'#b8402a',rows:2})}
 if(o.b<=0&&w>110&&h<170){[[w/2-20-52],[w/2+20+28]].forEach(([wx],i)=>{if(wx<10||wx+24>w-10)return;kWin(wx,h-64,24,30,{lit:kH(sd+i*5)>.4,fr:'#2e6a74',trim:'#3a7a84',bars:bank?3:0,sh:bank?null:'#2e6a74',shOne:1,cc:'#b8402a'})})}
 if(o.b<=0&&w>110){kDoor(w/2-20,h-66,40,66,{arch:1,c:bank?'#4a3a2e':'#6a4426',fr:'#4a2a14',studs:bank,z:!bank,seed:sd});
  /* ristra a lucerna */X.save();X.strokeStyle='#8a7a5a';X.lineWidth=1;X.beginPath();X.moveTo(w/2+34,h-80);X.lineTo(w/2+34,h-72);X.stroke();for(let k=0;k<9;k++){const C=aEll(w/2+34+(k%2?2.6:-2.6),h-70+k*4.6,3,4.2,(k%2?.4:-.4));cel(C,'#c8281e',1,.8,'#7a1410','#ff8a6a')}X.fillStyle='#4a7a2a';X.fillRect(w/2+32,h-76,4,4);X.restore();kLamp(w/2-34,h-74,-1)}
 /* portál – stříška na sloupech */if(!bank&&o.b<=0&&w>=150){const py=h-92;X.fillStyle='rgba(40,14,8,.28)';X.fillRect(6,py,w-12,34);for(let k=10;k<w-10;k+=7){X.strokeStyle=kH(sd+k)<.5?'#8a6a3a':'#7a5a30';X.lineWidth=2.4;X.beginPath();X.moveTo(k,py-3);X.lineTo(k+3,py-8);X.stroke()}
  const Bm=aRR(-6,py-4,w+12,9,3);cel(Bm,'#7a4a2a',1.2,.8);aLine(Bm,'#3a1a08',.9,.9);for(let vx=0;vx<w;vx+=Math.max(40,(w-10)/4)){const V=aEll(vx+4,py+.5,4.4,4.4);cel(V,'#8a5a32',.8,.6);aLine(V,'#3a1a08',.7,.9)}
  [10,w-20].forEach(px=>{kPost(px,py+5,10,h-py-5,'#6a4426');const Zp=aRR(px-6,py+4,22,6,2);cel(Zp,'#7a4a2a',1,.7);aLine(Zp,'#3a1a08',.7,.9)})}
 /* cedule */if(o.sign)kPaint(w/2,bank?h-86:30,o.sign,{fs:bank?20:18,band:'rgba(60,30,18,.75)',tc:'#f6e2b0',a:.92});
 /* okap z kmene */X.save();X.translate(4,10);const Cn=aRR(-16,-3,20,6,1.5);cel(Cn,'#7a4a2a',1,.7);aLine(Cn,'#3a1a08',.8,.9);X.restore();X.fillStyle='rgba(90,40,20,.3)';X.fillRect(-12,12,5,h-12);
 kGrime(0,30,w,h-40,sd,'rgba(110,50,24,.22)',Math.round(w/26),50);
 kRim(0,0,w,h);kOut(Wp,2.4)}};
/* ---------- STEP: dřevěná vodárna na nohách ---------- */
KST.wtank={m:[34,30,40,0],pre(o,w,h){const gz=gBel(o.x+w/2,o.b-2);return Math.max(0,Math.min(420,(LY-Math.max(gz,-100))-(LY-o.b)))},
 paint(o,w,h,e,ext){const sd=(o.x|0)%997,gy=h+ext;
 /* nohy s křížovým ztužením */const leg=(x0,x1,c)=>{X.save();X.strokeStyle=OL;X.lineWidth=9;X.beginPath();X.moveTo(x0,h-6);X.lineTo(x1,gy);X.stroke();X.strokeStyle=c;X.lineWidth=7;X.stroke();X.strokeStyle='rgba(255,230,190,.18)';X.lineWidth=1.5;X.beginPath();X.moveTo(x0+2,h-6);X.lineTo(x1+2,gy);X.stroke();X.restore()};
 leg(w*.3,w*.36,'#3a2416');leg(w*.7,w*.64,'#3a2416');leg(10,-6,'#5a3a22');leg(w-10,w+6,'#5a3a22');
 X.save();X.strokeStyle='#2a2626';X.lineWidth=2;for(let yy=h+10;yy<gy-24;yy+=58){const a=(yy-h)/(gy-h),b=Math.min(1,(yy+52-h)/(gy-h));const lx=t=>10+(-16)*t,rx=t=>w-10+16*t;X.beginPath();X.moveTo(lx(a),yy);X.lineTo(rx(b),yy+52);X.moveTo(rx(a),yy);X.lineTo(lx(b),yy+52);X.stroke();const Gt=aRR(lx(a)-2,yy-3,rx(a)-lx(a)+4,6,1);cel(Gt,'#5a3a22',1,.7);aLine(Gt,'#2a160a',.7,.9)}X.restore();
 [[-14],[w-4]].forEach(([fx])=>{const F=aRR(fx,gy-8,18,10,1.5);cel(F,'#7a7468',1,.7);aLine(F,'#3a362e',.8,.9)});
 /* nosný rošt */const Pl=aRR(-6,h-12,w+12,10,1.5);cel(Pl,'#5a3a22',1.2,.8);aLine(Pl,'#2a160a',.9,.9);
 /* nádrž z dužin */const Tk=aRR(0,0,w,h-12,8);X.save();X.clip(Tk);kBoards(0,0,w,h-12,'#8a5a34',sd,{pw:9});
  const cg=X.createLinearGradient(0,0,w,0);cg.addColorStop(0,'rgba(20,6,4,.55)');cg.addColorStop(.25,'rgba(255,220,170,.12)');cg.addColorStop(.42,'rgba(255,230,190,.2)');cg.addColorStop(.7,'rgba(0,0,0,0)');cg.addColorStop(1,'rgba(20,6,4,.6)');X.fillStyle=cg;X.fillRect(0,0,w,h);
  kGrime(0,h*.4,w,h*.6,sd,'rgba(30,20,40,.35)',Math.round(w/12),40);
  X.save();X.font='700 16px '+FONT;X.textAlign='center';X.globalAlpha=.7;X.fillStyle='#f0e0c0';X.fillText('AGUA',w/2,h/2-2);X.restore();X.restore();
 [12,(h-12)/2,h-26].forEach(yy=>{X.save();X.beginPath();X.moveTo(-2,yy);X.quadraticCurveTo(w/2,yy+4,w+2,yy);X.lineTo(w+2,yy+5);X.quadraticCurveTo(w/2,yy+9,-2,yy+5);X.closePath();const g=X.createLinearGradient(0,yy,0,yy+6);g.addColorStop(0,'#8a8e96');g.addColorStop(1,'#2a2c30');X.fillStyle=g;X.fill();X.strokeStyle=OL;X.lineWidth=1;X.stroke();X.fillStyle='#c8ccd2';for(let k=8;k<w;k+=16){X.beginPath();X.arc(k,yy+2.5+Math.sin(k/w*Math.PI)*3.4,1,0,7);X.fill()}X.restore()});
 kOut(Tk,2.4);kRim(0,0,w,h-12,.8);
 /* víko */const L=aRR(-7,-5,w+14,8,2);cel(L,'#6a4426',1.2,.9);aLine(L,'#2a160a',.9,.95);X.fillStyle='rgba(255,230,190,.3)';X.fillRect(-7,-5,w+14,1.4);
 /* sklopná výlevka */X.save();X.translate(w-2,h*.55);X.rotate(.5);const S=aRR(0,-4,36,8,3);cel(S,'#4a4e56',1,.8);aLine(S,'#1a1c20',.9,.9);X.restore();X.strokeStyle='#2a2626';X.lineWidth=1;X.beginPath();X.moveTo(w+28,h*.55+14);X.lineTo(w+30,-2);X.stroke();
 if(KUL.cur)KUL.cur.fx.push(['drip',w+30,h*.55+18])},
 live(o,x,top,w,h,e,dx,dy){for(const q of e.fx){if(q[0]!='drip')continue;const v=(T*.03)%1;X.fillStyle='rgba(170,210,240,'+(.7*(1-v))+')';X.beginPath();X.ellipse(dx+q[1],dy+q[2]+v*60,1.6,2.6,0,0,7);X.fill()}}};
/* ---------- PEVNOST: hradba a věž ---------- */
function kFort(o,w,h,tower){const sd=(o.x|0)%997,base=tower?'#6e665a':'#746c5e';kStones(0,0,w,h,base,'#26221e',sd,{bh:tower?20:24,bw:tower?30:40});
 kGrime(0,0,w,h,sd,'rgba(10,12,20,.32)',Math.round(w/20),80);kMoss(0,h-2,w,sd,'#3a4a30');
 /* střílny */for(let sy=36;sy<h-60;sy+=74)for(let sx=24;sx<w-20;sx+=tower?w:90){const lit=tower&&kH(sy+sd)>.4;X.fillStyle='rgba(0,0,0,.35)';X.fillRect(sx-4,sy-4,15,32);const Sl=aRR(sx,sy,7,24,3);X.fillStyle=lit?'#ffcf7a':'#0a0806';X.fill(Sl);if(lit){X.fillStyle='rgba(255,250,220,.7)';X.fillRect(sx+2,sy+4,3,16);if(KUL.cur)KUL.cur.fx.push(['win',sx+3.5,sy+12,26])}X.strokeStyle='#d8d0bc';X.globalAlpha=.4;X.lineWidth=1;X.beginPath();X.moveTo(sx-1,sy+25);X.lineTo(sx+8,sy+25);X.stroke();X.globalAlpha=1}
 /* brána s padací mříží */if(o.gate){const gx=w/2,gw=110;const A=new Path2D();A.moveTo(gx-gw/2,h);A.lineTo(gx-gw/2,h-120);A.quadraticCurveTo(gx,h-176,gx+gw/2,h-120);A.lineTo(gx+gw/2,h);A.closePath();
  X.save();for(let k=0;k<11;k++){const t0=k/11,t1=(k+1)/11,q=u=>{const v=1-u;return[v*v*(gx-gw/2-14)+2*v*u*gx+u*u*(gx+gw/2+14),v*v*(h-120)+2*v*u*(h-190)+u*u*(h-120)]},a=q(t0),b=q(t1);const V=new Path2D();V.moveTo(a[0],a[1]);V.lineTo(b[0],b[1]);V.lineTo(b[0]+(gx-b[0])*.2,b[1]+18);V.lineTo(a[0]+(gx-a[0])*.2,a[1]+18);V.closePath();cel(V,k%2?'#8a8272':'#7a7262',1,.7);aLine(V,'#3a362e',.8,.9)}X.restore();
  X.fillStyle='#0a0606';X.fill(A);X.save();X.clip(A);const g=X.createLinearGradient(0,h-160,0,h);g.addColorStop(0,'rgba(60,30,20,.3)');g.addColorStop(1,'rgba(255,160,80,.18)');X.fillStyle=g;X.fillRect(gx-gw/2,h-180,gw,180);
  X.strokeStyle='#1a1a1e';X.lineWidth=5;for(let i=gx-gw/2+10;i<gx+gw/2;i+=16){X.beginPath();X.moveTo(i,h-14);X.lineTo(i,h-176);X.stroke()}for(let yy=h-20;yy>h-150;yy-=28){X.beginPath();X.moveTo(gx-gw/2,yy);X.lineTo(gx+gw/2,yy);X.stroke()}
  X.strokeStyle='#5a5e66';X.lineWidth=2;for(let i=gx-gw/2+10;i<gx+gw/2;i+=16){X.beginPath();X.moveTo(i-1,h-14);X.lineTo(i-1,h-176);X.stroke()}X.fillStyle='#4a4e56';for(let i=gx-gw/2+10;i<gx+gw/2;i+=16){X.beginPath();X.moveTo(i-4,h-14);X.lineTo(i+4,h-14);X.lineTo(i,h-4);X.closePath();X.fill()}X.restore();kOut(A,2.6);
  if(KUL.cur){KUL.cur.fire.push([gx-gw/2-26,h-118]);KUL.cur.fire.push([gx+gw/2+26,h-118])}[gx-gw/2-26,gx+gw/2+26].forEach(tx=>{X.fillStyle='#2a2626';X.fillRect(tx-2,h-118,4,18);X.fillRect(tx-6,h-104,12,3);X.fillStyle='#4a3a2a';X.beginPath();X.moveTo(tx-5,h-118);X.lineTo(tx+5,h-118);X.lineTo(tx+3,h-110);X.lineTo(tx-3,h-110);X.closePath();X.fill()})}
 /* prapor s erbem */if(o.ban){const bx=w*.3,by=20;X.save();X.strokeStyle='#3a3a40';X.lineWidth=3;X.beginPath();X.moveTo(bx-6,by);X.lineTo(bx+46,by);X.stroke();const B=new Path2D();B.moveTo(bx,by);B.lineTo(bx+40,by);B.quadraticCurveTo(bx+42,by+50,bx+40,by+96);B.lineTo(bx+20,by+82);B.lineTo(bx,by+96);B.quadraticCurveTo(bx-2,by+50,bx,by);B.closePath();cel(B,'#8a1a1e',1.6,1);X.save();X.clip(B);X.strokeStyle='rgba(30,0,4,.4)';X.lineWidth=1.2;[12,28].forEach(k=>{X.beginPath();X.moveTo(bx+k,by);X.quadraticCurveTo(bx+k+3,by+40,bx+k-1,by+90);X.stroke()});X.fillStyle='#d8a830';X.fillRect(bx,by+4,40,3);X.restore();aLine(B,'#3a0608',1,.9);
  X.fillStyle='#e0b040';X.beginPath();X.moveTo(bx+20,by+30);X.lineTo(bx+30,by+40);X.lineTo(bx+20,by+60);X.lineTo(bx+10,by+40);X.closePath();X.fill();X.strokeStyle='#6a4a10';X.lineWidth=1;X.stroke();X.fillStyle='#8a1a1e';X.beginPath();X.arc(bx+20,by+43,4,0,7);X.fill();X.restore()}
 kShade(0,0,w,h,{bot:.4,side:.3,top:.05});kRim(0,0,w,h,.8);X.strokeStyle=OL;X.lineWidth=2.4;X.strokeRect(0,0,w,h);
 /* cimbuří */for(let i=0;i<w-8;i+=26){const M=aRR(i,-15,15,16,1.5);cel(M,'#7a7262',1.4,.9);X.save();X.clip(M);X.fillStyle='rgba(255,244,222,.15)';X.fillRect(i,-15,15,2);X.restore();aLine(M,'#2a2620',1.2,.95)}
 const Cb=aRR(-3,-2,w+6,6,1);cel(Cb,'#8a8272',1,.8);aLine(Cb,'#2a2620',.9,.95)}
KST.fwall={m:[50,30,50,4],paint(o,w,h){kFort(o,w,h,0)}};
KST.tower={m:[30,90,60,4],paint(o,w,h){kFort(o,w,h,1);X.save();X.strokeStyle=OL;X.lineWidth=5;X.beginPath();X.moveTo(w/2,-16);X.lineTo(w/2,-78);X.stroke();X.strokeStyle='#5a5a62';X.lineWidth=3;X.stroke();X.fillStyle='#d8b050';X.beginPath();X.arc(w/2,-80,3.4,0,7);X.fill();X.restore()},
 live(o,x,top,w,h,e){const fx=x+w/2+2,fy=top-74;X.save();X.beginPath();X.moveTo(fx,fy);for(let i=0;i<=6;i++)X.lineTo(fx+i*7,fy+Math.sin(T*.12+i*.8)*2.5*(i/6));X.lineTo(fx+40,fy+20+Math.sin(T*.12+5)*2);for(let i=6;i>=0;i--)X.lineTo(fx+i*7,fy+20+Math.sin(T*.12+i*.8)*2.5*(i/6));X.closePath();X.fillStyle='#9a1e2a';X.fill();X.strokeStyle=OL;X.lineWidth=1.6;X.stroke();X.fillStyle='rgba(0,0,0,.25)';X.fillRect(fx,fy+12,40,3);X.restore()}};
/* ---------- STEP: stolová hora z vrstev pískovce ---------- */
KST.mesa={m:[22,26,22,4],paint(o,w,h){const sd=(o.x|0)%997,cols=['#d89a62','#c27a4a','#e2ae74','#b0603c','#cc8a56','#a4583a'];
 const bands=[];let y=10;for(let i=0;y<h;i++){const bh=9+kH(sd+i*3)*14;bands.push([y,Math.min(h,y+bh),(kH(sd+i*5)-.5)*7,(kH(sd+i*7)-.5)*7,cols[(i+sd)%cols.length]]);y+=bh}
 const L=[],Rr=[];bands.forEach(([y0,y1,ol,orr])=>{L.push([3+ol,y0],[3+ol,y1]);Rr.push([w-3+orr,y0],[w-3+orr,y1])});
 const P=new Path2D();P.moveTo(L[L.length-1][0],h);for(let i=L.length-1;i>=0;i--)P.lineTo(L[i][0],L[i][1]);P.lineTo(6,4);P.quadraticCurveTo(w/2,-9,w-6,4);Rr.forEach(q=>P.lineTo(q[0],q[1]));P.lineTo(Rr[Rr.length-1][0],h);P.closePath();
 X.save();X.clip(P);X.fillStyle='#c27a4a';X.fillRect(-10,-12,w+20,h+14);
 bands.forEach(([y0,y1,ol,orr,c],i)=>{X.fillStyle=c;X.beginPath();X.moveTo(-10,y0);for(let x=-10;x<=w+10;x+=12)X.lineTo(x,y0+Math.sin(x*.045+i)*1.3);X.lineTo(w+10,y1);X.lineTo(-10,y1);X.closePath();X.fill();
  X.fillStyle='rgba(255,236,200,.22)';X.fillRect(-10,y0,w+20,1.6);X.fillStyle='rgba(70,24,14,.35)';X.fillRect(-10,y1-2.4,w+20,2.4);
  for(let k=0;k<w/9;k++){const px=kH(sd+i*41+k)*w,py=y0+2+kH(sd+i*43+k)*(y1-y0-4);X.fillStyle=kH(k+i)<.5?'rgba(90,30,16,.22)':'rgba(255,230,190,.18)';X.fillRect(px,py,2+kH(k)*5,1.1)}});
 for(let i=0;i<Math.round(w/22);i++){const x=10+kH(sd+i*3)*(w-20),y0=12+kH(sd+i*5)*h*.35,l=24+kH(sd+i*7)*h*.6;X.strokeStyle='rgba(60,20,10,.55)';X.lineWidth=1.3;X.beginPath();X.moveTo(x,y0);X.lineTo(x+(kH(i)-.5)*7,y0+l*.45);X.lineTo(x+(kH(i*3)-.5)*9,y0+l);X.stroke();X.strokeStyle='rgba(255,214,170,.3)';X.lineWidth=.9;X.beginPath();X.moveTo(x+1.5,y0);X.lineTo(x+1.5+(kH(i)-.5)*7,y0+l*.45);X.stroke()}
 kShade(-10,-12,w+20,h+12,{bot:.38,side:.42,top:.04});const rg=X.createLinearGradient(w-28,0,w+8,0);rg.addColorStop(0,'rgba(255,180,100,0)');rg.addColorStop(1,'rgba(255,180,100,.4)');X.fillStyle=rg;X.fillRect(w-28,-12,40,h+12);X.restore();
 kOut(P,2.4);
 /* skalní čepice */const Cp=new Path2D();Cp.moveTo(4,8);Cp.quadraticCurveTo(w/2,-12,w-4,8);Cp.lineTo(w-6,13);Cp.quadraticCurveTo(w/2,-1,6,13);Cp.closePath();cel(Cp,'#ecbc84',1.2,.9);aLine(Cp,'#7a4a2a',1,.9);
 for(let i=0;i<Math.round(w/36);i++){const tx=14+kH(sd+i*11)*(w-28),ty=6-Math.sin((tx/w)*Math.PI)*10;X.strokeStyle=kH(i)<.5?'#8a7a3a':'#a08a48';X.lineWidth=1.2;for(let j=-3;j<=3;j++){X.beginPath();X.moveTo(tx,ty);X.lineTo(tx+j*2.4,ty-6-Math.abs(3-Math.abs(j))*2);X.stroke()}}
 /* balvany u paty */for(let i=0;i<3;i++){const bx=kH(sd+i*13)<.5?-8+kH(i)*14:w-6-kH(i)*14,br=5+kH(sd+i)*7;const B=aEll(bx,h-br*.6,br*1.3,br*.8);cel(B,'#b8744a',1,.8);aLine(B,'#5a2a14',.8,.9)}
 if(w>140){const cx=w*.72,cy=2-Math.sin(.72*Math.PI)*10;const S=aRR(cx-3,cy-22,6,22,3);cel(S,'#4a8a3a',1,.8);aLine(S,'#1e3a16',.8,.9);const A1=aRR(cx-9,cy-16,5,9,2.4);cel(A1,'#4a8a3a',1,.8);aLine(A1,'#1e3a16',.7,.9);const A2=aRR(cx+4,cy-19,5,8,2.4);cel(A2,'#4a8a3a',1,.8);aLine(A2,'#1e3a16',.7,.9)}}};
/* ---------- DŮL: dřevěné lešení ---------- */
KST.scaffold={m:[14,18,14,4],paint(o,w,h){const sd=(o.x|0)%997;X.fillStyle='rgba(14,10,8,.82)';X.fillRect(0,0,w,h);
 const g=X.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(90,60,30,.25)');g.addColorStop(1,'rgba(0,0,0,.3)');X.fillStyle=g;X.fillRect(0,0,w,h);
 for(let yy=12;yy<h-14;yy+=64){X.save();X.strokeStyle=OL;X.lineWidth=7;X.beginPath();X.moveTo(9,yy);X.lineTo(w-9,Math.min(h,yy+64));X.moveTo(w-9,yy);X.lineTo(9,Math.min(h,yy+64));X.stroke();X.strokeStyle='#5a3a20';X.lineWidth=5;X.stroke();X.strokeStyle='rgba(255,220,170,.15)';X.lineWidth=1;X.stroke();X.restore();const B=aRR(0,yy-4,w,8,1);cel(B,'#6a4a2a',1.2,.8);aLine(B,'#2a160a',.9,.9);X.fillStyle='#2a2626';[6,w-8].forEach(bx=>{X.beginPath();X.arc(bx,yy,1.6,0,7);X.fill()})}
 [0,w-11].forEach(px=>kPost(px,0,11,h,'#6a4a2a'));const T0=aRR(-5,-6,w+10,12,1.5);cel(T0,'#7a5632',1.4,.9);aLine(T0,'#2a160a',1,.95);
 if(o.lamp)kLamp(w/2,30,1);X.strokeStyle=OL;X.lineWidth=2;X.strokeRect(0,0,w,h)}};

/* napojení na kreslení terénu (vlak a Leviatan mají vlastní kresbu) */
function kulSTok(o){return KST[o.s]&&lv&&lv.k!='train'&&lv.k!='levi'&&!(typeof leviOn=='function'&&leviOn())}
function kulSTe(o){const f=KST[o.s],w=o.w,top=LY-o.t,bot=Math.min(LY-o.b,H+420),h=bot-top,M=f.m||[30,30,30,4],ext=f.pre?f.pre(o,w,h):0;
 const e=kulCv(o,o.s+'|'+w+'x'+Math.round(h)+'|'+ext+'|'+lv.k,w+M[0]+M[2],h+M[1]+M[3]+ext,e=>{e.ox=M[0];e.oy=M[1];X.translate(M[0],M[1]);f.paint(o,w,h,e,ext)});
 return e}
function kulST(o){if(!kulSTok(o))return false;const f=KST[o.s],x=o.x-cam,w=o.w;if(x>W+260||x+w<-260)return true;const top=LY-o.t,bot=Math.min(LY-o.b,H+420),h=bot-top,M=f.m||[30,30,30,4],e=kulSTe(o);
 const dx=Math.round(x-M[0]),dy=Math.round(top-M[1]);X.drawImage(e.c,dx,dy);kulLive(e,dx+M[0],dy+M[1]);if(f.live)f.live(o,x,top,w,h,e,dx+M[0],dy+M[1]);return true}
{const _dt=dTer;dTer=function(o){if(o&&!o.gone&&o.k=='st'&&kulST(o))return;return _dt(o)}}
/* =================== FASÁDY S PATRY (bld) =================== */
const KBLD={};
/* přístav: tržnice – cihly, kamenné pilastry, obloukové arkády, štít s hodinami */
KBLD.port={top:96,paint(d,w,h,F){const sd=(d.x|0)%997;kBricks(0,0,w,h,'#64362c','#2a1e1c',sd,{bw:18,bh:8});
 /* štít nad střechou */const Pd=new Path2D();Pd.moveTo(w*.2,0);Pd.lineTo(w*.2,-34);Pd.quadraticCurveTo(w*.3,-36,w*.36,-50);Pd.lineTo(w*.64,-50);Pd.quadraticCurveTo(w*.7,-36,w*.8,-34);Pd.lineTo(w*.8,0);Pd.closePath();X.save();X.clip(Pd);kBricks(w*.2,-52,w*.6,54,'#6a3a2e','#2a1e1c',sd+3,{bw:18,bh:8});kShade(w*.2,-52,w*.6,52,{bot:.1});X.restore();kOut(Pd,2.2);
 const Cl=aEll(w/2,-34,13,13);cel(Cl,'#e8e2cc',1,.8);aLine(Cl,'#3a3020',1,.9);X.strokeStyle='#2a2018';X.lineWidth=1.6;X.beginPath();X.moveTo(w/2,-34);X.lineTo(w/2,-43);X.moveTo(w/2,-34);X.lineTo(w/2+6,-31);X.stroke();X.strokeStyle='#8a7a5a';X.lineWidth=2.6;X.beginPath();X.arc(w/2,-34,14.5,0,7);X.stroke();
 /* pilastry */const pil=[0,w/2-9,w-18];pil.forEach(px=>{kStones(px,0,18,h,'#8a8476','#3a362e',sd+px,{bh:16,bw:18,r:1.5});X.strokeStyle=OL;X.lineWidth=1.2;X.strokeRect(px,0,18,h)});
 /* patra: oblouková okna */const ys=[0,...F];for(let i=0;i<ys.length-1;i++){const y0=ys[i],y1=ys[i+1],fh=y1-y0;const ground=i==ys.length-2;
  [[18,w/2-9],[w/2+9,w-18]].forEach(([a,b],j)=>{const n=Math.max(1,Math.round((b-a)/86)),cw=(b-a)/n;for(let k=0;k<n;k++){const cx=a+cw*k+cw/2;
   if(ground&&d.z0<=60){/* arkáda */const aw=Math.min(cw-22,66),ah=fh-26;const A=new Path2D();A.moveTo(cx-aw/2,y1);A.lineTo(cx-aw/2,y1-ah+aw/2);A.arc(cx,y1-ah+aw/2,aw/2,Math.PI,0);A.lineTo(cx+aw/2,y1);A.closePath();X.save();X.translate(cx,y1-ah+aw/2);for(let v=0;v<9;v++){const a0=Math.PI+v*Math.PI/9;const Pv=new Path2D();Pv.arc(0,0,aw/2+7,a0,a0+Math.PI/9);Pv.arc(0,0,aw/2,a0+Math.PI/9,a0,true);Pv.closePath();cel(Pv,v%2?'#8a8476':'#7a7466',1,.6);aLine(Pv,'#3a362e',.6,.8)}X.restore();
    X.fillStyle='#120a08';X.fill(A);X.save();X.clip(A);const g=X.createRadialGradient(cx,y1-20,2,cx,y1-20,aw);g.addColorStop(0,'rgba(255,190,110,.45)');g.addColorStop(1,'rgba(255,190,110,0)');X.fillStyle=g;X.fillRect(cx-aw,y1-ah,aw*2,ah);for(let q=0;q<3;q++){const bx=cx-aw/2+6+q*(aw/3),bh=10+kH(sd+q+k)*10;X.fillStyle='#4a3420';X.fillRect(bx,y1-bh,aw/3-4,bh);X.fillStyle='rgba(255,220,160,.2)';X.fillRect(bx,y1-bh,aw/3-4,1.4)}X.restore();kOut(A,1.8);if(KUL.cur)KUL.cur.fx.push(['win',cx,y1-24,aw*.8])}
   else{const ww=Math.min(30,cw-30),wh=Math.min(44,fh-50);if(wh>16)kWin(cx-ww/2,y0+(fh-wh)/2+6,ww,wh,{lit:kH(sd+i*7+k*3+j)>.4,arch:'#7a4a36',fr:'#2e3a32',trim:'#8a8476',rows:3,sil:kH(sd+k+i)>.75?.5:null,hat:1,cc:'#7a2a24'})}}});
  if(i>0){const B=aRR(-4,y0-2,w+8,8,1);cel(B,'#8a8476',1,.8);aLine(B,'#3a362e',.8,.9)}}
 kSign(w/2,22,'TRŽNICE',{fs:16,h:26,c:'#c8a868',tc:'#2a1406'});kLamp(18+30,h-60,1);kLamp(w-48,h-60,-1);
 kGrime(0,0,w,h,sd,'rgba(10,14,20,.3)',Math.round(w/20),60);kShade(0,-50,w,h+50,{bot:.4,side:.3});kRim(0,0,w,h);X.strokeStyle=OL;X.lineWidth=2.4;X.strokeRect(0,0,w,h);kCornice(0,0,w,'#6e6a62',{h:12,br:46,dent:9})}};
/* bažina: stará pila – šedá prkna, plech, mech, kotoučová pila */
KBLD.swamp={top:70,paint(d,w,h,F){const sd=(d.x|0)%997;
 const G=new Path2D();G.moveTo(-8,2);G.lineTo(w/2,-56);G.lineTo(w+8,2);G.closePath();X.save();X.clip(G);kBoards(-10,-58,w+20,62,'#5e5848',sd+5,{pw:11});kShade(-10,-58,w+20,62,{bot:.15});X.restore();kOut(G,2.2);
 X.save();X.strokeStyle='#4a4a50';X.lineWidth=6;X.beginPath();X.moveTo(-10,4);X.lineTo(w/2,-58);X.lineTo(w+10,4);X.stroke();X.strokeStyle='#8a8e96';X.lineWidth=2;X.stroke();X.restore();
 /* kotoučová pila jako vývěsní štít */X.save();X.translate(w/2,-24);const R=17,Bl=new Path2D();for(let k=0;k<24;k++){const a=k/24*6.283,a2=(k+.5)/24*6.283;Bl.lineTo(Math.cos(a)*R,Math.sin(a)*R);Bl.lineTo(Math.cos(a2)*(R+4),Math.sin(a2)*(R+4))}Bl.closePath();cel(Bl,'#a8acb4',1.2,.9,'#5a5e66','#f0f4f8');aLine(Bl,'#2a2c30',.9,.9);X.fillStyle='rgba(150,70,30,.5)';X.beginPath();X.arc(5,4,7,0,7);X.fill();X.fillStyle='#3a3a40';X.beginPath();X.arc(0,0,3.6,0,7);X.fill();X.restore();
 kBoards(0,0,w,h,'#5a5444',sd,{pw:12,nails:[10,h*.5]});X.fillStyle='#120e0a';for(let i=0;i<5;i++){const gx=10+kH(sd+i*5)*(w-20);X.fillRect(gx,20+kH(sd+i)*(h-60),3,12+kH(i*3)*24)}
 const ys=[0,...F];for(let i=0;i<ys.length-1;i++){const y0=ys[i],y1=ys[i+1],fh=y1-y0,ground=i==ys.length-2;const n=Math.max(1,Math.round(w/110)),cw=w/n;
  for(let k=0;k<n;k++){const cx=cw*k+cw/2;if(ground&&k==Math.floor(n/2)){kDoor(cx-22,y1-Math.min(70,fh-14),44,Math.min(70,fh-14),{c:'#4a4232',fr:'#2a2218',dbl:1,z:1,seed:sd+k});continue}const ww=26,wh=Math.min(28,fh-40);if(wh<12)continue;const r=kH(sd+i*11+k*5);kWin(cx-ww/2,y0+(fh-wh)/2+4,ww,wh,{lit:r>.45,fr:'#2a2218',trim:'#5a5040',broken:r<.25,boards:r<.15,cc:'#5a5a2a'})}
  if(i>0){const B=aRR(-3,y0-3,w+6,8,1);cel(B,'#4a4234',1,.7);aLine(B,'#2a2218',.8,.9)}}
 /* plechové záplaty, popínavky */for(let i=0;i<3;i++){const px=kH(sd+i*13)*(w-40),py=20+kH(sd+i*17)*(h-80);const Pt=aRR(px,py,28+kH(i)*14,20+kH(i*3)*10,1);cel(Pt,'#76685a',1,.6);X.save();X.clip(Pt);X.fillStyle='rgba(150,70,30,.45)';X.beginPath();X.ellipse(px+10,py+12,9,6,0,0,7);X.fill();X.restore();aLine(Pt,'#3a3028',.8,.9)}
 X.save();X.strokeStyle='#3a5a2a';X.lineWidth=2;for(let i=0;i<3;i++){let vx=kH(sd+i*29)*w,vy=0;X.beginPath();X.moveTo(vx,vy);for(let k=0;k<8;k++){vx+=(kH(sd+i*7+k)-.5)*14;vy+=h/9;X.lineTo(vx,vy)}X.stroke();for(let k=0;k<10;k++){X.fillStyle=k%2?'#4a7a34':'#3a6a2a';X.beginPath();X.ellipse(kH(sd+i*7+k)*0+vx+(kH(k+i)-.5)*10,h*(k/10),4,2.4,kH(k)*3,0,7);X.fill()}}X.restore();
 kMoss(0,h-2,w,sd,'#4a6a34',1);kGrime(0,0,w,h,sd,'rgba(20,30,16,.35)',Math.round(w/16),70);kShade(0,0,w,h,{bot:.45,side:.3});kRim(0,0,w,h,.8);X.strokeStyle=OL;X.lineWidth=2.4;X.strokeRect(0,0,w,h);
 X.save();X.font='15px '+FONT;X.textAlign='center';X.globalAlpha=.85;X.fillStyle='#e8dcc0';X.fillText('STARÁ PILA',w/2,24);X.restore();kLamp(26,h-80,1)}};
/* step: saloon – obložení, bílé lišty, štít s nápisem, lítačky */
KBLD.steppe={top:84,paint(d,w,h,F){const sd=(d.x|0)%997,wall='#9a5236',trim='#efe2c4';
 /* štítová nástavba (false front) */const Ff=new Path2D();Ff.moveTo(8,0);Ff.lineTo(8,-46);Ff.lineTo(w*.16,-46);Ff.lineTo(w*.16,-64);Ff.lineTo(w*.84,-64);Ff.lineTo(w*.84,-46);Ff.lineTo(w-8,-46);Ff.lineTo(w-8,0);Ff.closePath();X.save();X.clip(Ff);kBoards(0,-66,w,68,'#8a4a32',sd+9,{hor:1,pw:9});kShade(0,-66,w,66,{bot:.1});X.restore();kOut(Ff,2.4);
 [[8,-46,w*.16-8],[w*.16,-64,w*.68],[w*.84,-46,w*.16-8]].forEach(([x0,y0,ww])=>{const C=aRR(x0-3,y0-4,ww+6,6,1);cel(C,trim,1,.8);aLine(C,'#6a5a40',.8,.9)});
 X.save();X.font='30px '+FONT;X.textAlign='center';X.textBaseline='middle';X.fillStyle='rgba(30,10,4,.5)';X.fillText('SALOON',w/2+2,-29);X.fillStyle='#f6e6c0';X.fillText('SALOON',w/2,-31);X.strokeStyle='#3a1a08';X.lineWidth=1;X.strokeText('SALOON',w/2,-31);X.restore();
 kBoards(0,0,w,h,wall,sd,{hor:1,pw:9});[0,w-10].forEach(px=>{const Cb=aRR(px,0,10,h,1);cel(Cb,trim,1,.8);aLine(Cb,'#6a5a40',.7,.9)});
 const ys=[0,...F];for(let i=0;i<ys.length-1;i++){const y0=ys[i],y1=ys[i+1],fh=y1-y0,ground=i==ys.length-2;
  if(ground){const dw=50,dh=Math.min(64,fh-20),dx=w/2-dw/2;kDoor(dx,y1-dh-22,dw,dh+22,{open:1,glow:1,fr:'#4a2a14'});
   /* lítačky */[[dx,1],[dx+dw/2,-1]].forEach(([bx,s],q)=>{const B=new Path2D();B.moveTo(bx+2,y1-dh+2);B.lineTo(bx+dw/2-2,y1-dh+2+(q?6:-6)*0);B.quadraticCurveTo(bx+dw/4,y1-dh-6,bx+2,y1-dh+2);B.lineTo(bx+2,y1-dh+2);X.save();const Bb=aRR(bx+2,y1-dh+4,dw/2-4,dh*.55,2);cel(Bb,'#8a5a32',1,.8);X.save();X.clip(Bb);X.strokeStyle='rgba(30,10,4,.5)';X.lineWidth=1;for(let k=0;k<5;k++){X.beginPath();X.moveTo(bx+5+k*4.6,y1-dh+8);X.lineTo(bx+5+k*4.6,y1-dh+4+dh*.55-4);X.stroke()}X.restore();aLine(Bb,'#3a1a08',.9,.9);X.restore()});
   if(KUL.cur)KUL.cur.fx.push(['win',w/2,y1-30,60]);
   [[30],[w-30-34]].forEach(([wx],q)=>kWin(wx,y1-fh+24,34,Math.min(48,fh-60),{lit:1,fr:'#4a2a14',trim,rows:3,cc:'#6a1a20',sil:q?.35:.6,hat:1}));kLamp(w/2-dw/2-18,y1-dh-10,-1);kLamp(w/2+dw/2+18,y1-dh-10,1)}
  else{const n=Math.max(2,Math.round(w/100)),cw=(w-20)/n;for(let k=0;k<n;k++){const cx=10+cw*k+cw/2,ww=28,wh=Math.min(44,fh-50);if(wh<14)continue;kWin(cx-ww/2,y0+(fh-wh)/2+6,ww,wh,{lit:kH(sd+k*5+i)>.3,fr:'#4a2a14',trim,rows:2,cc:k%2?'#2a5a3a':'#7a1a2a',sil:kH(sd+k+i*3)>.6?.45:null,hat:kH(k)>.5})}}
  if(i>0){const B=aRR(-4,y0-2,w+8,8,1);cel(B,trim,1,.8);aLine(B,'#6a5a40',.8,.9)}}
 /* plakáty a zaprášený spodek */kPoster(w*.17,h-90,-.12,1.1);kPoster(w*.84,h-84,.1,1);const g=X.createLinearGradient(0,h-36,0,h);g.addColorStop(0,'rgba(150,90,40,0)');g.addColorStop(1,'rgba(150,90,40,.5)');X.fillStyle=g;X.fillRect(0,h-36,w,36);
 kShade(0,-64,w,h+64,{bot:.32,side:.3});kRim(0,-46,w,h+46);X.strokeStyle=OL;X.lineWidth=2.4;X.strokeRect(0,0,w,h)}};
KBLD.mine=null;KBLD.fort=null;
function kulBld(d){const f=KBLD[lv&&lv.k];if(!f)return false;const x=d.x-cam;if(x>W+120||x+d.w<-120)return true;const top=LY-d.z1,h=d.z1-d.z0,w=d.w,F=(d.fl||[]).filter(z=>z>d.z0).map(z=>d.z1-z).sort((a,b)=>a-b),M=[40,f.top||60,40,4];
 const e=kulCv(d,'bld|'+w+'x'+h+'|'+lv.k,w+M[0]+M[2],h+M[1]+M[3],e=>{e.ox=M[0];e.oy=M[1];X.translate(M[0],M[1]);f.paint(d,w,h,F.filter(v=>v>0&&v<h).concat([h]).filter((v,i,a)=>a.indexOf(v)==i))});
 const dx=Math.round(x-M[0]),dy=Math.round(top-M[1]);X.drawImage(e.c,dx,dy);kulLive(e,dx+M[0],dy+M[1]);return true}
{const _b=dBld;dBld=function(d){if(d&&d.k=='bld'&&kulBld(d))return;return _b(d)}}
/* =================== MOŘE: palubní nástavby Baronovy lodi =================== */
function kulDeckhouse(o){const x=o.x-cam;if(x>W+80||x+o.w<-80)return true;const top=LY-o.t,w=o.w,h=o.t-o.b,M=[20,44,20,4];
 const e=kulCv(o,'dh|'+w+'x'+h+'|'+(o.cab?1:0),w+M[0]+M[2],h+M[1]+M[3],e=>{e.ox=M[0];e.oy=M[1];X.translate(M[0],M[1]);const sd=(o.x|0)%997;
  kBoards(0,0,w,h,'#8a5230',sd,{hor:1,pw:10});
  for(let px=0;px<=w;px+=Math.max(70,w/5)){const pxx=Math.min(px,w-8);const Fp=aRR(pxx,0,8,h,1);cel(Fp,'#5a3418',1.2,.8);aLine(Fp,'#2a1408',.8,.9);X.fillStyle='#d8b050';X.fillRect(pxx,h-6,8,3)}
  if(o.cab){const n=Math.max(1,Math.floor((w-90)/86));for(let k=0;k<n;k++){const wx=34+k*86;kWin(wx,24,34,34,{lit:1,fr:'#3a2414',trim:'#d8b050',rows:2,cc:k%2?'#2a4a7a':'#8a2a24',sil:kH(sd+k)>.6?.45:null,hat:1})}
   kDoor(w-48,20,30,h-22,{c:'#6a3a1e',fr:'#3a2414',seed:sd});X.fillStyle='#ffe2a0';X.beginPath();X.arc(w-33,36,4.4,0,7);X.fill();X.strokeStyle='#d8b050';X.lineWidth=1.6;X.stroke();kLamp(w-62,30,-1)}
  else{for(let k=34;k<w-24;k+=64){X.fillStyle='#d8b050';X.beginPath();X.arc(k,h*.48,8,0,7);X.fill();X.strokeStyle='#5a3a10';X.lineWidth=1.2;X.stroke();X.fillStyle=kH(sd+k)>.4?'#ffe0a0':'#2a4a62';X.beginPath();X.arc(k,h*.48,5.4,0,7);X.fill();X.fillStyle='rgba(255,255,255,.6)';X.beginPath();X.arc(k-1.8,h*.48-1.8,1.5,0,7);X.fill();if(KUL.cur)KUL.cur.fx.push(['win',k,h*.48,18])}
   const Lb=aEll(w*.5,h*.5,10,10);X.save();X.lineWidth=5;X.strokeStyle='#efe6d4';X.stroke(Lb);X.setLineDash([5,6]);X.strokeStyle='#c8241a';X.stroke(Lb);X.restore();X.strokeStyle=HOL;X.lineWidth=1;X.beginPath();X.arc(w*.5,h*.5,12.5,0,7);X.stroke();X.beginPath();X.arc(w*.5,h*.5,7.5,0,7);X.stroke()}
  kShade(0,0,w,h,{bot:.3,side:.22});kRim(0,0,w,h,.7);X.strokeStyle=OL;X.lineWidth=2;X.strokeRect(0,0,w,h);
  /* střecha a zábradlí */const R=aRR(-6,-6,w+12,10,2);cel(R,'#6a4026',1.3,.9);X.fillStyle='#e8c070';X.fillRect(-6,-6,w+12,1.6);aLine(R,'#2a1408',1,.9);
  for(let px=4;px<w;px+=14){const Bp=new Path2D();Bp.moveTo(px-1.4,-6);Bp.quadraticCurveTo(px-3.4,-13,px-1.4,-18);Bp.quadraticCurveTo(px-2.6,-23,px-1.2,-27);Bp.lineTo(px+1.2,-27);Bp.quadraticCurveTo(px+2.6,-23,px+1.4,-18);Bp.quadraticCurveTo(px+3.4,-13,px+1.4,-6);Bp.closePath();cel(Bp,'#9a6a3a',1,.7);aLine(Bp,'#2a1408',.6,.9)}
  const Rl=aRR(-4,-32,w+8,5.5,2);cel(Rl,'#8a5a30',1.2,.9);X.fillStyle='rgba(255,236,200,.35)';X.fillRect(-4,-32,w+8,1.2);aLine(Rl,'#2a1408',.8,.95)});
 const dx=Math.round(x-M[0]),dy=Math.round(top-M[1]);X.drawImage(e.c,dx,dy);kulLive(e,dx+M[0],dy+M[1]);return true}
{const _d=dShip2;dShip2=function(o){if(o&&o.k=='sq'&&!o.tank&&lv&&lv.k=='sea'&&kulDeckhouse(o))return;return _d(o)}}
/* =================== MALOVANÁ POZADÍ: městečko ve stepi a lodě v přístavu =================== */
function kTown(g,x0,n,seed){qrS(seed);let x=x0;const C=['#5a2a2e','#62302f','#542830','#6a3632'],RIM='rgba(255,170,110,',lamps=[];
 const sign=(cx,cy,t)=>{g.fillStyle='#3a181c';g.fillRect(cx-t.length*3-3,cy-5,t.length*6+6,10);g.fillStyle='rgba(255,214,160,.55)';g.font='700 7px Georgia';g.textAlign='center';g.fillText(t,cx,cy+2.6)};
 const names=['HOTEL','SALOON','BANK','STORE','JAIL','BARBER','SMITH','POST'];
 for(let i=0;i<n;i++){const w=qr(46,86),h=qr(38,70),top=386-h,c=C[(qr()*4)|0],ff=qr()<.75;g.fillStyle=c;g.fillRect(x,top,w,h);
  if(ff){/* štít */const fh=qr(10,20);g.beginPath();g.moveTo(x,top);g.lineTo(x,top-fh*.5);g.lineTo(x+w*.2,top-fh*.5);g.quadraticCurveTo(x+w*.5,top-fh*1.4,x+w*.8,top-fh*.5);g.lineTo(x+w,top-fh*.5);g.lineTo(x+w,top);g.closePath();g.fill();g.fillStyle=RIM+'.5)';g.fillRect(x+w-3,top-fh*.5,3,h+fh*.5)}
  else{g.beginPath();g.moveTo(x-4,top);g.lineTo(x+w*.5,top-qr(14,22));g.lineTo(x+w+4,top);g.closePath();g.fill();g.fillStyle=RIM+'.45)';g.fillRect(x+w-3,top,3,h)}
  /* stříška verandy */const py=386-qr(22,28);g.fillStyle='#3e1c22';g.fillRect(x-3,py-3,w+6,4);g.fillStyle=RIM+'.35)';g.fillRect(x-3,py-3,w+6,1);for(let k=x+2;k<=x+w-2;k+=Math.max(14,w/3)){g.fillStyle='#3a1a20';g.fillRect(k,py,2,386-py)}
  g.fillStyle='rgba(20,6,10,.35)';g.fillRect(x,py+1,w,386-py-1);
  /* okna */for(let wx=x+8;wx<x+w-10;wx+=18){const lit=qr()<.45;g.fillStyle=lit?'#ffcf7a':'#2a1218';g.fillRect(wx,top+10,7,10);if(lit){pbGlow(g,wx+3.5,top+15,16,'#ffc060',.35);lamps.push([wx+3.5,top+15])}}
  const dl=qr()<.6;g.fillStyle=dl?'#ffb860':'#24100f';g.fillRect(x+w*.5-5,386-18,10,16);if(dl)pbGlow(g,x+w*.5,378,18,'#ffb060',.3);
  if(ff&&qr()<.85)sign(x+w/2,top+3,names[(qr()*names.length)|0]);
  x+=w+qr(3,12)}
 /* kostel se zvonicí */g.fillStyle='#5e2c2e';g.fillRect(x+14,316,36,70);g.beginPath();g.moveTo(x+10,316);g.lineTo(x+32,290);g.lineTo(x+54,316);g.fill();g.fillRect(x+26,262,12,30);g.beginPath();g.moveTo(x+24,262);g.lineTo(x+32,246);g.lineTo(x+40,262);g.fill();g.fillRect(x+31,234,2,14);g.fillRect(x+27,239,10,2);g.fillStyle='#ffcf7a';g.beginPath();g.arc(x+32,334,5,Math.PI,0);g.fill();g.fillRect(x+27,334,10,8);pbGlow(g,x+32,338,22,'#ffc060',.35);g.fillStyle='#2a1218';g.beginPath();g.arc(x+32,276,3.4,0,7);g.fill();g.fillStyle=RIM+'.5)';g.fillRect(x+47,316,3,70);g.fillRect(x+36,262,2,30);
 /* vodárna */const tx=x+90;g.fillStyle='#4e2428';[[-14,4],[14,-4]].forEach(([a,b])=>{g.beginPath();g.moveTo(tx+a,386);g.lineTo(tx+a+b,330);g.lineTo(tx+a+b+3,330);g.lineTo(tx+a+3,386);g.fill()});g.strokeStyle='#4e2428';g.lineWidth=1.4;g.beginPath();g.moveTo(tx-12,382);g.lineTo(tx+12,340);g.moveTo(tx+12,382);g.lineTo(tx-12,340);g.stroke();
 g.fillStyle='#5a2a2e';g.beginPath();g.roundRect(tx-18,300,36,32,4);g.fill();g.beginPath();g.moveTo(tx-21,300);g.lineTo(tx,284);g.lineTo(tx+21,300);g.fill();g.fillStyle=RIM+'.5)';g.fillRect(tx+14,300,3,32);g.strokeStyle='rgba(30,10,14,.6)';g.lineWidth=1;[308,318,326].forEach(y=>{g.beginPath();g.moveTo(tx-18,y);g.lineTo(tx+18,y);g.stroke()});
 return lamps}
{const _pb=PBB.steppe;PBB.steppe=function(){_pb();try{const L=pbLayer(2400,150,300,.75,.13,(g,Lw)=>{qrS(17);g.fillStyle='#5a2a2e';g.fillRect(0,384,Lw,70);kTown(g,260,9,71);kTown(g,1460,8,73);
  const mill=(x)=>{g.fillStyle='#5a2a2c';g.beginPath();g.moveTo(x-12,386);g.lineTo(x-3,290);g.lineTo(x+3,290);g.lineTo(x+12,386);g.fill();g.save();g.translate(x,288);g.strokeStyle='#5a2a2c';g.lineWidth=2;for(let i=0;i<12;i++){g.rotate(Math.PI/6);g.beginPath();g.moveTo(0,0);g.lineTo(0,-26);g.stroke()}g.restore();g.fillStyle='#5a2a2c';g.beginPath();g.moveTo(x+4,288);g.lineTo(x+22,282);g.lineTo(x+22,294);g.closePath();g.fill()};mill(1150);mill(2250);
  g.strokeStyle='#4a2226';g.lineWidth=2;for(let x=0;x<Lw;x+=160){g.beginPath();g.moveTo(x,386);g.lineTo(x,338);g.moveTo(x-8,342);g.lineTo(x+8,342);g.stroke()}g.lineWidth=.8;g.beginPath();for(let x=0;x<Lw;x+=160){g.moveTo(x-8,342);g.quadraticCurveTo(x+80,352,x+152,342)}g.stroke();
  pbTexFill(g,0,150,Lw,300,.3);const hz=g.createLinearGradient(0,280,0,400);hz.addColorStop(0,'rgba(240,150,110,0)');hz.addColorStop(1,'rgba(240,150,110,.36)');g.fillStyle=hz;g.fillRect(0,250,Lw,200)});
  if(PB.L.length>=3)PB.L[2]=L}catch(err){console.error('town',err)}}}
/* přístav: lodě v pozadí s ráhnovím, plachtami a světly */
function kBgShip(g,x,s,lit,seed){qrS(seed);g.save();g.translate(x,384);g.scale(s,s);const hull='#111a26',edge='rgba(140,170,210,.32)';
 /* stěžně, ráhna, svinuté plachty, lanoví */[[-70,200],[10,236],[86,180]].forEach(([mx,mh],i)=>{g.strokeStyle=hull;g.lineWidth=4-i*.4;g.beginPath();g.moveTo(mx,-34);g.lineTo(mx,-34-mh);g.stroke();
  for(let y=1;y<4;y++){const yy=-34-mh*y/4.2,hw=34-y*6;g.lineWidth=2;g.beginPath();g.moveTo(mx-hw,yy);g.lineTo(mx+hw,yy);g.stroke();g.fillStyle='#3a4458';g.beginPath();g.ellipse(mx,yy+3,hw-3,3.2,0,0,7);g.fill();g.fillStyle='rgba(160,180,210,.25)';g.fillRect(mx-hw+4,yy+1.2,(hw-3)*2-2,1)}
  g.strokeStyle='rgba(20,30,44,.8)';g.lineWidth=.8;for(let k=-1;k<=1;k+=2){g.beginPath();g.moveTo(mx,-34-mh*.95);g.lineTo(mx+k*42,-34);g.stroke();for(let r=1;r<8;r++){const yy=-34-mh*.95*(r/8);g.beginPath();g.moveTo(mx+k*42*(1-r/8),yy+4);g.lineTo(mx+k*4,yy);g.stroke()}}
  g.fillStyle='#7a1a1e';g.beginPath();g.moveTo(mx,-34-mh);g.lineTo(mx+16,-34-mh+3);g.lineTo(mx,-34-mh+6);g.fill()});
 g.strokeStyle='rgba(20,30,44,.85)';g.lineWidth=.9;g.beginPath();g.moveTo(-136,-46);g.lineTo(-70,-230);g.lineTo(10,-266);g.lineTo(86,-210);g.lineTo(200,-80);g.stroke();
 /* trup: zvednutá záď, sheer, čelen */g.fillStyle=hull;g.beginPath();g.moveTo(-140,-58);g.lineTo(-96,-58);g.lineTo(-92,-36);g.quadraticCurveTo(20,-30,128,-40);g.quadraticCurveTo(150,-44,166,-62);g.lineTo(150,0);g.quadraticCurveTo(0,6,-118,0);g.quadraticCurveTo(-134,-20,-140,-58);g.closePath();g.fill();
 g.strokeStyle=hull;g.lineWidth=3;g.beginPath();g.moveTo(160,-56);g.lineTo(206,-82);g.stroke();
 g.fillStyle='#2a3448';g.beginPath();g.moveTo(-136,-30);g.quadraticCurveTo(0,-22,150,-28);g.lineTo(150,-22);g.quadraticCurveTo(0,-15,-134,-23);g.closePath();g.fill();
 g.strokeStyle=edge;g.lineWidth=1.4;g.beginPath();g.moveTo(-140,-58);g.lineTo(-96,-58);g.lineTo(-92,-36);g.quadraticCurveTo(20,-30,128,-40);g.quadraticCurveTo(150,-44,166,-62);g.stroke();
 for(let i=0;i<9;i++){const px=-110+i*28,py=-24+Math.abs(i-4)*.4;const on=qr()<lit;g.fillStyle=on?'#ffcf7a':'#0a1018';g.fillRect(px-2.5,py-2.5,5,5);if(on)pbGlow(g,px,py,10,'#ffc870',.4)}
 g.fillStyle='#ffcf7a';g.fillRect(-132,-52,6,7);g.fillRect(-120,-52,6,7);pbGlow(g,-126,-48,18,'#ffc870',.45);
 g.fillStyle='#ffe0a0';g.beginPath();g.arc(-142,-66,3,0,7);g.fill();pbGlow(g,-142,-66,22,'#fff0b0',.5);g.restore()}
{const _pb=PBB.port;PBB.port=function(){_pb();try{const L=pbLayer(2400,110,300,.75,.12,(g,Lw)=>{qrS(23);
  [[200,.62,.5],[1050,.72,.45],[1800,.58,.55]].forEach(([x,s,l],i)=>pbWrap(Lw,x,180,xx=>kBgShip(g,xx,s,l,41+i)));
  const crane=(x)=>{g.save();g.strokeStyle='#1a2434';g.lineWidth=3;g.beginPath();g.moveTo(x-18,384);g.lineTo(x-10,170);g.lineTo(x+10,170);g.lineTo(x+18,384);g.stroke();g.lineWidth=1.2;for(let y=184;y<384;y+=18){g.beginPath();g.moveTo(x-16+(y-170)*.03,y);g.lineTo(x+16-(y-170)*.03,y+18);g.stroke()}g.lineWidth=3;g.beginPath();g.moveTo(x-40,170);g.lineTo(x+150,160);g.stroke();g.lineWidth=1;g.beginPath();g.moveTo(x,140);g.lineTo(x+150,160);g.moveTo(x,140);g.lineTo(x-40,170);g.moveTo(x+120,162);g.lineTo(x+120,250);g.stroke();g.fillStyle='#1a2434';g.fillRect(x-8,140,16,30);g.fillRect(x+112,250,16,10);g.fillStyle='#ff4a3a';g.beginPath();g.arc(x,138,2.4,0,7);g.fill();g.restore()};
  [650,1500,2250].forEach(x=>pbWrap(Lw,x,180,crane));g.fillStyle='#0c1420';g.fillRect(0,384,Lw,40);pbTexFill(g,0,110,Lw,300,.35)});
  const old=PB.L[2];if(old&&old.post)L.post=old.post;if(PB.L.length>=3)PB.L[2]=L}catch(err){console.error('ships',err)}}}
/* =================== BLUDIŠTĚ: interiéry (zadní stěna, trámy, drobnosti) =================== */
const KMZ={port:{wall:(w,h,sd)=>kBricks(0,0,w,h,'#4a2c26','#1e1614',sd,{bw:18,bh:8}),beam:'#4a3020'},
 steppe:{wall:(w,h,sd)=>kPlaster(0,0,w,h,'#9a6040',sd,{brick:'#7a4430',patches:Math.round(w*h/30000)}),beam:'#6a4426'},
 swamp:{wall:(w,h,sd)=>kBoards(0,0,w,h,'#4a4436',sd,{pw:12}),beam:'#3a3024'},
 fort:{wall:(w,h,sd)=>kStones(0,0,w,h,'#5a564c','#22201c',sd,{bh:22,bw:38}),beam:'#4a3a2a'},
 mine:{wall:(w,h,sd)=>kStones(0,0,w,h,'#4a3a2c','#1a120a',sd,{bh:26,bw:44,r:6}),beam:'#5a3a20'}};
function kMzDecor(x,y,cw,ch,sd,k){const r=kH(sd),cx=x+cw/2;
 if(r<.22){/* police s lahvemi / hrnky */const sy=y+ch*.42;const S=aRR(cx-34,sy,68,5,1);cel(S,'#6a4426',1,.7);aLine(S,'#2a1408',.7,.9);for(let i=0;i<6;i++){const bx=cx-30+i*11,bc=['#2a5a2a','#6a3a14','#c8c0a8','#3a2a1a'][(i+sd)%4];X.fillStyle=bc;X.fillRect(bx,sy-12,6,12);X.fillRect(bx+2,sy-16,2,4);X.fillStyle='rgba(255,240,200,.4)';X.fillRect(bx+1,sy-10,1,8)}}
 else if(r<.4){/* obraz v rámu / plakát */if(k=='steppe'||k=='port')kPoster(cx,y+ch*.4,(kH(sd*3)-.5)*.2,1.2);else{const F=aRR(cx-14,y+ch*.3,28,22,1);cel(F,'#8a6a3a',1,.7);X.fillStyle='#3a4a5a';X.fillRect(cx-10,y+ch*.3+4,20,14);X.fillStyle='#6a8a5a';X.beginPath();X.moveTo(cx-10,y+ch*.3+18);X.lineTo(cx-2,y+ch*.3+9);X.lineTo(cx+10,y+ch*.3+18);X.fill();aLine(F,'#2a1408',.8,.9)}}
 else if(r<.58){/* sudy a bedny u stěny */const by=y+ch-2;[[cx-22,0],[cx+4,1]].forEach(([bx,i])=>{if(i){const C=aRR(bx,by-24,26,24,1);cel(C,'#7a5432',1,.7);X.strokeStyle='#3a2410';X.lineWidth=1.2;X.beginPath();X.moveTo(bx+2,by-2);X.lineTo(bx+24,by-22);X.stroke();aLine(C,'#2a1408',.8,.9)}else{const B=aRR(bx,by-28,20,28,6);cel(B,'#6a3a22',1,.7);X.fillStyle='#4a4e56';X.fillRect(bx,by-22,20,2.4);X.fillRect(bx,by-8,20,2.4);aLine(B,'#2a1408',.8,.9)}})}
 else if(r<.72){/* okénko */kWin(cx-11,y+ch*.28,22,26,{lit:0,fr:'#3a2a1e',trim:'#6a5a46',rows:2,sky:'#1a2230',bars:k=='fort'||k=='mine'?2:0})}
 else if(r<.86&&KUL.cur){/* lucerna na háku */X.strokeStyle='#2a2626';X.lineWidth=1.2;X.beginPath();X.moveTo(cx,y+4);X.lineTo(cx,y+18);X.stroke();X.fillStyle='#2a2626';X.fillRect(cx-5,y+18,10,3);X.fillStyle='#ffe2a0';X.fillRect(cx-4,y+21,8,10);X.strokeStyle='#1e1a1a';X.strokeRect(cx-4,y+21,8,10);KUL.cur.lamps.push([cx,y+26])}}
function kulMaze(d){const f=KMZ[lv&&lv.k];if(!f)return false;const x=d.x-cam;if(x>W+60||x+d.w<-60)return true;const top=LY-d.z1,h=d.z1-d.z0,w=d.w;
 const e=kulCv(d,'mz|'+w+'x'+h+'|'+lv.k,w,h,e=>{const sd=(d.x|0)%997;f.wall(w,h,sd);X.fillStyle='rgba(10,6,12,.42)';X.fillRect(0,0,w,h);
  const cw=150,ch=120;for(let r=0;r*ch<h;r++)for(let c=0;c*cw<w-20;c++)kMzDecor(18+c*cw,h-(r+1)*ch,cw,ch,sd+r*13+c*7,lv.k);
  for(let c=1;c*cw<w-20;c++){const bx=18+c*cw-6;const B=aRR(bx-1,0,10,h,1);X.globalAlpha=.85;cel(B,f.beam,1.2,.8);X.globalAlpha=1;aLine(B,'#140a06',.8,.7)}
  const g=X.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(0,0,0,.35)');g.addColorStop(.5,'rgba(0,0,0,.05)');g.addColorStop(1,'rgba(0,0,0,.3)');X.fillStyle=g;X.fillRect(0,0,w,h);
  const g2=X.createLinearGradient(0,0,w,0);g2.addColorStop(0,'rgba(0,0,0,.45)');g2.addColorStop(.08,'rgba(0,0,0,0)');g2.addColorStop(.92,'rgba(0,0,0,0)');g2.addColorStop(1,'rgba(0,0,0,.45)');X.fillStyle=g2;X.fillRect(0,0,w,h)});
 const dx=Math.round(x),dy=Math.round(top);X.drawImage(e.c,dx,dy);kulLive(e,dx,dy);return true}
{const _m=dMzBg;dMzBg=function(d){if(kulMaze(d))return;return _m(d)}}
/* podlahy a příčky bludiště: trámy nebo kámen */
function kulMzP(o){const k=lv&&lv.k;if(!KMZ[k])return false;const x=o.x-cam,top=LY-o.t,h=o.t-o.b,w=o.w;if(x>W+30||x+w<-30)return true;
 const e=kulCv(o,'mzp|'+w+'x'+h+'|'+k,w+8,h+8,e=>{X.translate(4,4);const stone=k=='fort',c=stone?'#7a7466':KMZ[k].beam;
  if(stone)kStones(0,0,w,h,'#6a665a','#26241e',(o.x|0)+(o.t|0),{bh:Math.max(8,Math.min(22,h)),bw:30,r:1.5});else kBoards(0,0,w,h,cLt(c,.12),(o.x|0)+(o.t|0),{hor:o.k=='mf',pw:o.k=='mf'?Math.max(5,h/2):9});
  kShade(0,0,w,h,{bot:.35,side:.2,top:.12});X.fillStyle='rgba(255,236,200,.18)';X.fillRect(0,0,w,2);X.strokeStyle=OL;X.lineWidth=1.6;X.strokeRect(0,0,w,h);
  if(o.k=='mf'&&!stone){X.fillStyle='#2a2626';for(let i=8;i<w-4;i+=24){X.fillRect(i,2,1.6,1.6);X.fillRect(i,h-4,1.6,1.6)}}});
 X.drawImage(e.c,Math.round(x-4),Math.round(top-4));return true}
{const _m=dMzP;dMzP=function(o){if(kulMzP(o))return;return _m(o)}}
/* =================== předehřátí mezipaměti: po jedné stavbě za snímek, nejbližší první =================== */
function kulWarmCall(x,fn){const X0=X,c=cam;if(!KUL.dummy){const cv=document.createElement('canvas');cv.width=cv.height=2;KUL.dummy=cv.getContext('2d')}X=KUL.dummy;cam=x-200;try{fn()}finally{X=X0;cam=c}}
function kulWarmList(){const L=[];if(!lv)return L;try{
 for(const o of sol){if(o.gone)continue;if(o.k=='st'&&kulSTok(o))L.push([o.x,()=>kulSTe(o)]);else if((o.k=='mw'||o.k=='mf')&&KMZ[lv.k])L.push([o.x,()=>kulWarmCall(o.x,()=>kulMzP(o))]);else if(o.k=='sq'&&!o.tank&&lv.k=='sea')L.push([o.x,()=>kulWarmCall(o.x,()=>kulDeckhouse(o))])}
 for(const d of deco){if(d.k=='bld'&&KBLD[lv.k])L.push([d.x,()=>kulWarmCall(d.x,()=>kulBld(d))]);else if(d.k=='mz'&&KMZ[lv.k])L.push([d.x,()=>kulWarmCall(d.x,()=>kulMaze(d))])}}catch(e){}return L}
KUL.q=null;
function kulWarm(){if(!lv||!sol)return;if(KUL.qk!==KUL.gen+'|'+lv.k+'|'+sol.length){KUL.qk=KUL.gen+'|'+lv.k+'|'+sol.length;KUL.q=kulWarmList()}if(!KUL.q||!KUL.q.length)return;
 const t0=performance.now();KUL.q.sort((a,b)=>Math.abs(a[0]-cam-W/2)-Math.abs(b[0]-cam-W/2));while(KUL.q.length&&performance.now()-t0<5){const it=KUL.q.shift();try{it[1]()}catch(e){}}}
{const _u=upd;upd=function(){const r=_u();if(state=='play'||state=='cut'||state=='tr2')kulWarm();return r}}
/* =================== STEP: Baronův vlak na trati (lokomotiva a vagony) =================== */
function kWheels(w,bot,big){X.save();const fy=bot-24;const Fr=aRR(4,fy-2,w-8,9,2);cel(Fr,'#24242a',1,.7);aLine(Fr,'#0a0a0c',.9,.9);
 const xs=big?[w*.22,w*.47,w*.72]:[w*.16,w*.3,w*.7,w*.84],r=big?15:11;xs.forEach(wx=>{const cy=bot-r;X.fillStyle='rgba(0,0,0,.35)';X.beginPath();X.ellipse(wx,bot,r,3,0,0,7);X.fill();
  const Wh=aEll(wx,cy,r,r);cel(Wh,'#3a3a42',1.2,.8);X.strokeStyle='#8a8e96';X.lineWidth=1.2;for(let k=0;k<8;k++){const a=k*Math.PI/4;X.beginPath();X.moveTo(wx,cy);X.lineTo(wx+Math.cos(a)*(r-2.5),cy+Math.sin(a)*(r-2.5));X.stroke()}X.strokeStyle='#5a5e66';X.lineWidth=2.4;X.beginPath();X.arc(wx,cy,r-1.6,0,7);X.stroke();X.fillStyle='#c9a95a';X.beginPath();X.arc(wx,cy,2.4,0,7);X.fill();aLine(Wh,'#0a0a0c',1.1,.95)});
 if(big){X.strokeStyle='#9aa0a8';X.lineWidth=2.6;X.beginPath();X.moveTo(xs[0],bot-r+5);X.lineTo(xs[2],bot-r+5);X.stroke();X.strokeStyle=OL;X.lineWidth=.8;X.stroke()}
 [[-6],[w-2]].forEach(([cx])=>{const C=aRR(cx,fy-1,8,6,1);cel(C,'#4a4e56',1,.7)});X.restore()}
function kCarBody(w,h,col,sd){kBoards(0,0,w,h,col,sd,{pw:10,nails:[6,h-8]});kShade(0,0,w,h,{bot:.3,side:.25});kRim(0,0,w,h,.8);X.strokeStyle=OL;X.lineWidth=2.2;X.strokeRect(0,0,w,h);
 const R=aRR(-5,-6,w+10,8,2);cel(R,'#3a2a24',1.2,.8);aLine(R,'#120a06',.9,.95);X.fillStyle='#8a8e96';X.fillRect(w*.3,-9,w*.4,3)}
KST.boxcar={m:[14,16,14,4],paint(o,w,h){const sd=(o.x|0)%997,bh=h-24;kCarBody(w,bh,'#7a3424',sd);
 const dx=w/2-34,dw=68;X.fillStyle='rgba(0,0,0,.3)';X.fillRect(dx-3,12,dw+6,bh-20);kBoards(dx,14,dw,bh-24,'#6a2c20',sd+3,{pw:8});X.save();X.strokeStyle='#3a1810';X.lineWidth=4;X.beginPath();X.moveTo(dx+3,bh-12);X.lineTo(dx+dw-3,16);X.moveTo(dx+3,16);X.lineTo(dx+3,bh-12);X.moveTo(dx+dw-3,16);X.lineTo(dx+dw-3,bh-12);X.stroke();X.strokeStyle='rgba(255,220,190,.18)';X.lineWidth=1;X.beginPath();X.moveTo(dx+3,bh-13);X.lineTo(dx+dw-3,15);X.stroke();X.restore();X.strokeStyle=OL;X.lineWidth=1.6;X.strokeRect(dx,14,dw,bh-24);
 const Ra=aRR(dx-8,10,dw+16,4,1);cel(Ra,'#4a4e56',1,.7);const Rb=aRR(dx-8,bh-10,dw+16,4,1);cel(Rb,'#4a4e56',1,.7);X.fillStyle='#d8d0b8';X.font='700 11px '+FONT;X.textAlign='left';X.globalAlpha=.8;X.fillText('VANE R.R.',10,24);X.font='700 8px Georgia';X.fillText('N° '+(100+sd%90),12,36);X.globalAlpha=1;
 X.fillStyle='#2a2626';for(let k=0;k<4;k++){X.fillRect(w-12,16+k*12,8,2.4)}kWheels(w,h,0)}};
KST.caboose={m:[16,20,16,4],paint(o,w,h){const sd=(o.x|0)%997,bh=h-24;kCarBody(w,bh,'#9a2e22',sd);[20,w-46].forEach(wx=>kWin(wx,22,24,24,{lit:1,fr:'#3a1810',trim:'#d8c8a0',cc:'#2a4a6a',rows:2}));kLamp(w-8,18,1);
 [[-12,0],[w+2,1]].forEach(([px])=>{X.strokeStyle='#2a2626';X.lineWidth=1.6;X.strokeRect(px,bh-34,10,30)});kWheels(w,h,0)}};
KST.flatcar={m:[10,10,10,4],paint(o,w,h){const sd=(o.x|0)%997,bh=h-20;kBoards(0,0,w,bh,'#7a5634',sd,{hor:1,pw:Math.max(5,bh/2)});kShade(0,0,w,bh,{bot:.3});X.strokeStyle=OL;X.lineWidth=1.8;X.strokeRect(0,0,w,bh);X.fillStyle='#2a2626';for(let k=10;k<w;k+=30)X.fillRect(k,bh/2-1,2,2);kWheels(w,h+4,0)}};
KST.cab={m:[14,20,14,4],paint(o,w,h){const sd=(o.x|0)%997,bh=h-24;kBoards(0,0,w,bh,'#6a2a1e',sd,{hor:1,pw:9});kShade(0,0,w,bh,{bot:.3});kWin(14,24,w-28,28,{lit:1,fr:'#2a1a10',trim:'#c9a95a',rows:1,cur:0,sil:.5,hat:1});
 X.strokeStyle=OL;X.lineWidth=2.2;X.strokeRect(0,0,w,bh);const R=aRR(-10,-8,w+20,10,3);cel(R,'#2a2228',1.3,.9);aLine(R,'#0a0608',1,.95);X.fillStyle='#c9a95a';X.fillRect(-10,-8,w+20,1.6);kWheels(w,h,0)}};
KST.tender={m:[12,26,12,4],paint(o,w,h){const sd=(o.x|0)%997,bh=h-24;const B=aRR(0,0,w,bh,3);cel(B,'#2e2e36',1.6,1);X.save();X.clip(B);for(let y=8;y<bh;y+=14){X.fillStyle='rgba(220,224,230,.35)';for(let x=8;x<w;x+=14)X.fillRect(x,y,1.6,1.6)}X.fillStyle='#8a1a1e';X.fillRect(0,bh*.42,w,8);X.fillStyle='#c9a040';X.fillRect(0,bh*.42,w,1.4);X.fillRect(0,bh*.42+6.6,w,1.4);X.restore();aLine(B,'#0a0a0c',1.4,.95);
 for(let i=0;i<14;i++){const cx=8+kH(sd+i)*(w-16),cy=2-kH(sd+i*3)*8;const C=aEll(cx,cy,6+kH(i)*4,4+kH(i*3)*2);cel(C,'#1e1e22',1,.7,'#0a0a0c','#5a5a66')}kWheels(w,h,0)}};
KST.tanker={m:[12,16,12,4],paint(o,w,h){const bh=h-28;X.fillStyle='#1a1a1e';X.fillRect(6,bh-2,w-12,8);const Tk=aRR(0,0,w,bh,bh/2);cel(Tk,'#4a4e56',2,1.2);X.save();X.clip(Tk);X.fillStyle='rgba(255,255,255,.15)';X.fillRect(0,bh*.2,w,3);[w*.25,w*.75].forEach(bx=>{X.fillStyle='#2a2c30';X.fillRect(bx-3,0,6,bh)});X.restore();aLine(Tk,'#0a0a0c',1.6,.95);
 const Gw=aEll(w/2,bh/2,24,15);X.fillStyle='#0b2218';X.fill(Gw);X.save();X.clip(Gw);const g=X.createLinearGradient(0,bh/2-15,0,bh/2+15);g.addColorStop(0,'#b4ffc8');g.addColorStop(1,'#18a057');X.fillStyle=g;X.fillRect(w/2-24,bh/2-4,48,20);X.restore();X.strokeStyle='#c9a040';X.lineWidth=2.4;X.stroke(Gw);if(KUL.cur)KUL.cur.lamps.push([w/2,bh/2]);
 X.fillStyle='#e8c050';X.font='700 11px Georgia';X.textAlign='left';X.fillText('SRDCE',12,bh/2+4);const D=aRR(w/2-10,-7,20,8,2);cel(D,'#5a5e66',1,.8);kWheels(w,h,0)}};
KST.boiler={m:[40,70,14,4],paint(o,w,h){const bh=h-24;const B=aRR(0,0,w,bh,16);cel(B,'#2e3036',2,1.2);X.save();X.clip(B);const g=X.createLinearGradient(0,0,0,bh);g.addColorStop(0,'rgba(255,255,255,.18)');g.addColorStop(.35,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(0,0,0,.4)');X.fillStyle=g;X.fillRect(0,0,w,bh);
  [40,w*.55,w-20].forEach(bx=>{X.fillStyle='#c9a95a';X.fillRect(bx,0,6,bh);X.fillStyle='rgba(255,250,220,.4)';X.fillRect(bx+1,0,1.4,bh)});X.restore();aLine(B,'#0a0a0c',1.6,.95);
 const St=new Path2D();St.moveTo(30,0);St.lineTo(28,-40);St.lineTo(20,-50);St.lineTo(54,-50);St.lineTo(46,-40);St.lineTo(44,0);St.closePath();cel(St,'#24262c',1.4,.9);aLine(St,'#0a0a0c',1.2,.95);
 const Dm=aRR(w*.66-10,-14,20,16,8);cel(Dm,'#c9a040',1,.8,'#8a6a20','#fff0b0');aLine(Dm,'#4a3008',.9,.9);
 const Hl=aRR(2,8,16,14,3);cel(Hl,'#3a3a40',1,.8);X.fillStyle='#ffe8a0';X.beginPath();X.arc(8,15,5,0,7);X.fill();if(KUL.cur)KUL.cur.lamps.push([6,15]);
 const Cw=new Path2D();Cw.moveTo(0,bh-30);Cw.lineTo(-28,bh+2);Cw.lineTo(0,bh+2);Cw.closePath();cel(Cw,'#8a1e1a',1,.8);X.save();X.clip(Cw);X.strokeStyle='rgba(0,0,0,.4)';X.lineWidth=1.2;for(let k=-28;k<0;k+=5){X.beginPath();X.moveTo(k,bh+2);X.lineTo(0,bh-30);X.stroke()}X.restore();aLine(Cw,'#2a0606',1,.95);kWheels(w,h,1)},
 live(o,x,top,w,h,e,dx,dy){for(let k=0;k<6;k++){const age=((T*.9+k*24)%144)/144,px=dx+37-age*60,py=dy-52-age*90,r=8+age*24;X.fillStyle='rgba(70,64,70,'+(.45*(1-age))+')';X.beginPath();X.arc(px,py,r,0,7);X.fill()}}};
