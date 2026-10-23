/* ===== W33: KULISY 3 – plachty a lanoví, hlubiny dolu, paprsky světla, déšť na površích, živé popředí ===== */
const K3={spl:[],lt:-1};
const k3h=(i)=>hs(i*7.31+3.7);
/* ---------- MOŘE: stěžeň s ráhny, vzdutými plachtami a lanovím ---------- */
function k3Sail(x,yt,hw,sh,o,t){const bl=Math.sin(t*.031+o.i*1.7),fl=Math.sin(t*.13+o.i*2.3)*1.4,bw=hw*1.07,yb=yt+sh,bel=.55+.18*bl,dip=sh*(.12+.03*bl);
 const P=new Path2D();P.moveTo(x-hw,yt);P.quadraticCurveTo(x,yt+4,x+hw,yt);
 P.bezierCurveTo(x+hw+hw*.15*bel,yt+sh*.35,x+bw+hw*.09*bel+fl,yt+sh*.78,x+bw,yb);P.quadraticCurveTo(x+bl*9,yb+dip+fl,x-bw,yb);
 P.bezierCurveTo(x-bw-hw*.09*bel+fl*.5,yt+sh*.78,x-hw-hw*.15*bel,yt+sh*.35,x-hw,yt);P.closePath();
 const g=X.createRadialGradient(x+hw*.22+bl*6,yt+sh*.55,sh*.1,x+hw*.1,yt+sh*.5,hw*1.25);g.addColorStop(0,'#fbf5e2');g.addColorStop(.55,'#e6dcc0');g.addColorStop(1,'#b3a37f');X.fillStyle=g;X.fill(P);
 X.save();X.clip(P);
 /* stín pod ráhnem a v záhybu u spodního lemu */
 let s=X.createLinearGradient(0,yt,0,yt+sh*.22);s.addColorStop(0,'rgba(70,50,30,.38)');s.addColorStop(1,'rgba(70,50,30,0)');X.fillStyle=s;X.fillRect(x-bw-30,yt,bw*2+60,sh*.24);
 s=X.createLinearGradient(0,yb-sh*.25,0,yb+dip);s.addColorStop(0,'rgba(90,70,40,0)');s.addColorStop(1,'rgba(90,70,40,.32)');X.fillStyle=s;X.fillRect(x-bw-30,yb-sh*.25,bw*2+60,sh*.25+dip+4);
 /* závětrná strana tmavší */
 s=X.createLinearGradient(x-bw,0,x-bw*.2,0);s.addColorStop(0,'rgba(60,45,30,.28)');s.addColorStop(1,'rgba(60,45,30,0)');X.fillStyle=s;X.fillRect(x-bw-30,yt,bw*.85,sh+dip+10);
 /* skvrny a mapy od soli */
 for(let k=0;k<4;k++){const rx=x+(k3h(o.i*9+k)-.5)*hw*1.6,ry=yt+sh*(.25+.6*k3h(o.i*5+k+3)),rr=10+18*k3h(k+o.i);const gg=X.createRadialGradient(rx,ry,0,rx,ry,rr);gg.addColorStop(0,'rgba(120,96,60,.13)');gg.addColorStop(1,'rgba(120,96,60,0)');X.fillStyle=gg;X.fillRect(rx-rr,ry-rr,rr*2,rr*2)}
 /* švy pásů plátna */
 const n=Math.round(hw/21);X.strokeStyle='rgba(110,88,56,.42)';X.lineWidth=1;for(let k=-n+1;k<n;k++){const v=k/n,xt=x+v*hw,xb=x+v*bw,cx=x+v*(hw+hw*.2*bel)+bl*3*(1-Math.abs(v));X.beginPath();X.moveTo(xt,yt+2);X.quadraticCurveTo(cx,yt+sh*.55,xb,yb+dip*(1-v*v)*.95);X.stroke()}
 X.strokeStyle='rgba(255,255,245,.35)';X.lineWidth=.8;for(let k=-n+1;k<n;k+=2){const v=k/n,xt=x+v*hw+2,xb=x+v*bw+2,cx=x+v*(hw+hw*.2*bel)+2+bl*3*(1-Math.abs(v));X.beginPath();X.moveTo(xt,yt+2);X.quadraticCurveTo(cx,yt+sh*.55,xb,yb+dip*(1-v*v)*.9);X.stroke()}
 /* refovací pás s refovačkami */
 const ry0=yt+sh*.2;X.strokeStyle='rgba(120,96,62,.6)';X.lineWidth=1.6;X.beginPath();X.moveTo(x-hw-6,ry0);X.quadraticCurveTo(x,ry0+5,x+hw+6,ry0);X.stroke();X.strokeStyle='rgba(70,52,32,.75)';X.lineWidth=.9;
 for(let k=-n*2+1;k<n*2;k++){const v=k/(n*2),px=x+v*(hw+4),py=ry0+5*(1-v*v)+1;X.beginPath();X.moveTo(px,py);X.lineTo(px+Math.sin(t*.12+k)*.8,py+5);X.stroke()}
 /* záplata */
 if(o.patch){const px=x+hw*o.patch[0],py=yt+sh*o.patch[1];X.save();X.translate(px,py);X.rotate(.06);X.fillStyle='rgba(196,176,136,.9)';X.fillRect(-14,-10,28,20);X.strokeStyle='rgba(80,60,36,.7)';X.setLineDash([2,2]);X.lineWidth=.8;X.strokeRect(-13,-9,26,18);X.setLineDash([]);X.restore()}
 /* znak barona: rudé V v kruhu */
 if(o.emb){const ex=x+bl*4,ey=yt+sh*.58,r=sh*.27;X.save();X.globalAlpha=.88;X.strokeStyle='#7a1a1a';X.lineWidth=4;X.beginPath();X.arc(ex,ey,r,0,7);X.stroke();X.fillStyle='rgba(150,30,28,.82)';X.beginPath();X.moveTo(ex-r*.62,ey-r*.55);X.lineTo(ex-r*.3,ey-r*.55);X.lineTo(ex,ey+r*.3);X.lineTo(ex+r*.3,ey-r*.55);X.lineTo(ex+r*.62,ey-r*.55);X.lineTo(ex+r*.1,ey+r*.65);X.lineTo(ex-r*.1,ey+r*.65);X.closePath();X.fill();X.restore()}
 X.restore();
 /* lem (lano) a rohové výztuhy */
 X.strokeStyle='#5a4428';X.lineWidth=2;X.stroke(P);X.strokeStyle='rgba(40,28,14,.6)';X.lineWidth=.8;X.stroke(P);
 X.fillStyle='rgba(150,124,86,.85)';[[x-bw,yb],[x+bw,yb]].forEach(([cx,cy])=>{X.beginPath();X.moveTo(cx,cy);X.lineTo(cx+(cx<x?12:-12),cy-2);X.lineTo(cx+(cx<x?3:-3),cy-12);X.closePath();X.fill()});
 return[x-bw,yb,x+bw,yb]}
function k3Yard(x,y,hw){const P=new Path2D();P.moveTo(x-hw-14,y-1.5);P.quadraticCurveTo(x,y-4.5,x+hw+14,y-1.5);P.lineTo(x+hw+14,y+1.8);P.quadraticCurveTo(x,y+4.6,x-hw-14,y+1.8);P.closePath();const g=X.createLinearGradient(0,y-4,0,y+4);g.addColorStop(0,'#8a6038');g.addColorStop(1,'#3a2210');X.fillStyle=g;X.fill(P);X.strokeStyle='#160c06';X.lineWidth=1;X.stroke(P);
 X.fillStyle='#4a4e56';X.fillRect(x-7,y-4,14,8);X.strokeStyle='rgba(40,28,14,.75)';X.lineWidth=.8;X.beginPath();X.moveTo(x-hw-10,y+2);X.quadraticCurveTo(x-hw*.5,y+10,x-8,y+4);X.moveTo(x+8,y+4);X.quadraticCurveTo(x+hw*.5,y+10,x+hw+10,y+2);X.stroke()}
function k3Mast(x,y,h,i,t){const top=y-h;X.save();X.lineCap='round';
 /* úpony a vanty s vyblinkami */
 X.strokeStyle='rgba(50,34,18,.75)';X.lineWidth=1.2;X.beginPath();X.moveTo(x,top+20);X.lineTo(x-300,y-2);X.moveTo(x,top+20);X.lineTo(x+300,y-2);X.stroke();
 const sh=[[-112,-160],[112,160]];sh.forEach(([a,b])=>{X.strokeStyle='rgba(46,30,16,.82)';X.lineWidth=1.3;for(let k=0;k<3;k++){const ex=a+(b-a)*k/2;X.beginPath();X.moveTo(x+(a>0?4:-4),top+150);X.lineTo(x+ex,y-3);X.stroke()}
  X.strokeStyle='rgba(60,42,22,.65)';X.lineWidth=.8;for(let yy=y-14;yy>top+170;yy-=11){const f=(yy-(top+150))/(y-3-(top+150)),xa=x+(a>0?4:-4)+(a-(a>0?4:-4))*f,xb=x+(a>0?4:-4)+(b-(a>0?4:-4))*f;X.beginPath();X.moveTo(xa,yy);X.lineTo(xb,yy);X.stroke()}});
 X.strokeStyle='rgba(46,30,16,.8)';X.lineWidth=1.1;[[-70],[70]].forEach(([a])=>{X.beginPath();X.moveTo(x,top+6);X.lineTo(x+a,top+150);X.stroke()});
 /* stěžeň: spodní a horní díl, železné obruče */
 let g=X.createLinearGradient(x-8,0,x+8,0);g.addColorStop(0,'#3a2414');g.addColorStop(.45,'#9a6c46');g.addColorStop(1,'#2a1a0c');X.fillStyle=g;X.fillRect(x-8,top+150,16,h-150);
 g=X.createLinearGradient(x-6,0,x+6,0);g.addColorStop(0,'#3a2414');g.addColorStop(.45,'#a07448');g.addColorStop(1,'#2a1a0c');X.fillStyle=g;X.fillRect(x-6,top,12,160);
 X.strokeStyle='#120a06';X.lineWidth=1.4;X.strokeRect(x-8,top+150,16,h-150);X.strokeRect(x-6,top,12,160);
 X.strokeStyle='rgba(30,16,6,.35)';X.lineWidth=.8;for(let k=0;k<3;k++){X.beginPath();X.moveTo(x-3+k*3,top+160);X.lineTo(x-3+k*3+(k-1)*.5,y);X.stroke()}
 for(let yy=y-60;yy>top+160;yy-=90){X.fillStyle='#4e525a';X.fillRect(x-9,yy,18,5);X.fillStyle='rgba(255,255,255,.25)';X.fillRect(x-9,yy,18,1)}
 X.fillStyle='#3a2414';X.fillRect(x-14,top+144,28,9);X.strokeStyle='#120a06';X.strokeRect(x-14,top+144,28,9);X.fillStyle='#2a1a0c';X.beginPath();X.arc(x,top-2,6,0,7);X.fill();
 /* ráhna a plachty */
 const S=[[y-252,150,118,{i:i*2,patch:i?[.45,.62]:null,emb:i==1}],[y-412,110,98,{i:i*2+1,patch:i?null:[-.5,.4]}]];
 let lo=null;S.forEach(([yt,hw,hh,o])=>{const c=k3Sail(x,yt+2,hw,hh,o,t);if(!lo)lo=c;k3Yard(x,yt,hw);X.strokeStyle='rgba(46,30,16,.7)';X.lineWidth=.9;X.beginPath();X.moveTo(x,top+4);X.lineTo(x-hw-12,yt);X.moveTo(x,top+4);X.lineTo(x+hw+12,yt);X.stroke()});
 /* šoty od spodních rohů na palubu */
 if(lo){X.strokeStyle='rgba(46,30,16,.75)';X.lineWidth=1.1;X.beginPath();X.moveTo(lo[0],lo[1]);X.lineTo(lo[0]-36,y-4);X.moveTo(lo[2],lo[3]);X.lineTo(lo[2]+36,y-4);X.stroke()}
 X.restore()}
{const _sd=dShipDeco;dShipDeco=function(d){if(d.k!='mast'||!SV.fx&&SV.fx!=null)return _sd(d);const x=d.x-cam;if(x<-330||x>W+330)return;k3Mast(x,LY,d.h,d.i||0,T);try{jsFlag(x+6,LY-d.h+10,T+(d.i||0)*20,1)}catch(e){}}}
/* ---------- DŮL: hlubiny s jeskyněmi, krápníky, krystaly a světelnými šachtami ---------- */
{const _pm=PBB.mine;PBB.mine=function(){_pm();try{
 const cave=pbLayer(2200,-120,600,.6,.09,(g,Lw)=>{qrS(71);
  /* vzdálené jeskynní otvory */
  for(let i=0;i<4;i++){const x=qr(150,Lw-150),y=qr(160,260),w=qr(90,160),h=qr(100,170);pbWrap(Lw,x,w*1.4,xx=>{const P=new Path2D();P.moveTo(xx-w,y+h);for(let a=Math.PI;a<=Math.PI*2+.01;a+=.25)P.lineTo(xx+Math.cos(a)*w*(1+qr(-.12,.12)),y+Math.sin(a)*h*(1+qr(-.1,.1)));P.lineTo(xx+w,y+h);P.closePath();
   const gr=g.createRadialGradient(xx,y+h*.3,10,xx,y,w*1.2);gr.addColorStop(0,'#0a1218');gr.addColorStop(1,'#020203');g.fillStyle=gr;g.fill(P);g.save();g.clip(P);pbGlow(g,xx,y+h*.4,w*.7,'#3a7a9a',.25);for(let k=0;k<6;k++){const cx=xx+qr(-w*.6,w*.6),cy=y+qr(h*.1,h*.7);g.fillStyle=pbA(qr()<.5?'#7ae8ff':'#c890ff',qr(.4,.8));g.fillRect(cx,cy,1.6,1.6)}g.restore();
   g.strokeStyle='rgba(120,170,200,.35)';g.lineWidth=2;g.stroke(P)})}
  /* sloupy krápníků s vrstvami */
  for(let x=60;x<Lw;x+=qr(220,380)){const w=qr(40,80),sd=x|0;pbWrap(Lw,x,w*1.5,xx=>{qrS(sd);const L0=[],R0=[];for(let yy=-120;yy<=480;yy+=30){const k=Math.abs(yy-200)/320,ww=w*(.45+k*.9);L0.push([xx-ww+qr(-6,6),yy]);R0.push([xx+ww+qr(-6,6),yy])}
   const P=new Path2D();P.moveTo(L0[0][0],L0[0][1]);L0.forEach(q=>P.lineTo(q[0],q[1]));R0.slice().reverse().forEach(q=>P.lineTo(q[0],q[1]));P.closePath();
   const gr=g.createLinearGradient(xx-w,0,xx+w,0);gr.addColorStop(0,'#3a2c20');gr.addColorStop(.35,'#2a2018');gr.addColorStop(1,'#120c08');g.fillStyle=gr;g.fill(P);g.save();g.clip(P);
   pbStrokes(g,xx-w*1.6,-120,w*3.2,600,['#4a3a2a','#1a120a','#5a4a36','#2a2016'],220,24,5,0);
   for(let k=0;k<9;k++){const yy=qr(-100,460);g.strokeStyle=pbA(k%2?'#000000':'#b89a70',qr(.08,.2));g.lineWidth=qr(2,5);g.beginPath();g.moveTo(xx-w*1.6,yy);g.quadraticCurveTo(xx,yy+qr(-8,8),xx+w*1.6,yy+qr(-6,6));g.stroke()}
   for(let k=0;k<12;k++){g.fillStyle=pbA('#ffd27a',qr(.35,.8));const gx=xx+qr(-w*.6,w*.6),gy=qr(-60,440);g.fillRect(gx,gy,qr(1,2.4),qr(1,2.4))}
   g.restore();g.strokeStyle='rgba(255,210,150,.16)';g.lineWidth=2;g.beginPath();L0.forEach((q,j)=>j?g.lineTo(q[0]+2,q[1]):g.moveTo(q[0]+2,q[1]));g.stroke()})}
  /* krystaly */
  PB._k3cr=[];for(let i=0;i<9;i++){const x=qr(0,Lw),y=qr(200,420),c=qr()<.55?['#5ad8ff','#c8f6ff','#1a6a8a']:['#b070ff','#ecd0ff','#4a2a8a'],n=3+(qr()*4|0);pbWrap(Lw,x,40,xx=>{pbGlow(g,xx,y-8,46,c[0],.3);for(let k=0;k<n;k++){const a=-Math.PI/2+qr(-.7,.7),L=qr(12,30),w=qr(3,6),bx=xx+qr(-10,10);g.save();g.translate(bx,y);g.rotate(a+Math.PI/2);g.fillStyle=c[2];g.beginPath();g.moveTo(-w,0);g.lineTo(-w,-L);g.lineTo(0,-L-w*1.4);g.lineTo(w,-L);g.lineTo(w,0);g.closePath();g.fill();g.fillStyle=c[0];g.beginPath();g.moveTo(0,0);g.lineTo(0,-L-w*1.4);g.lineTo(w,-L);g.lineTo(w,0);g.closePath();g.fill();g.fillStyle=c[1];g.fillRect(-w*.3,-L*.9,1.2,L*.7);g.restore()}});PB._k3cr.push([x,y-14,c[0]])}
  /* vzdálený dřevěný most s kolejí a vozíkem */
  const by=300;for(let x=0;x<Lw;x+=qr(700,1000)){const w=qr(260,380);pbWrap(Lw,x,w,xx=>{g.strokeStyle='#2a1c10';g.lineWidth=5;g.beginPath();g.moveTo(xx,by);g.lineTo(xx+w,by);g.stroke();g.lineWidth=3;for(let k=xx;k<xx+w;k+=50){g.beginPath();g.moveTo(k,by);g.lineTo(k+25,480);g.moveTo(k+50,by);g.lineTo(k+25,480);g.stroke()}g.strokeStyle='#5a5a62';g.lineWidth=1.5;g.beginPath();g.moveTo(xx,by-3);g.lineTo(xx+w,by-3);g.stroke();
   g.fillStyle='#ffcf7a';g.fillRect(xx+w*.5-2,by-34,4,6);(PB._k3lan=PB._k3lan||[]).push([xx+w*.5,by-31]);const cx=xx+w*qr(.3,.7);g.fillStyle='#2a2420';g.beginPath();g.moveTo(cx-20,by-22);g.lineTo(cx+20,by-22);g.lineTo(cx+16,by-6);g.lineTo(cx-16,by-6);g.fill();g.fillStyle='#6a5a3a';g.beginPath();g.ellipse(cx,by-22,18,5,0,Math.PI,0);g.fill();g.fillStyle='#151210';[cx-11,cx+11].forEach(q=>{g.beginPath();g.arc(q,by-5,4,0,7);g.fill()})})}
  pbTexFill(g,0,-120,Lw,600,.45);const hz=g.createLinearGradient(0,240,0,480);hz.addColorStop(0,'rgba(40,28,18,0)');hz.addColorStop(1,'rgba(40,28,18,.55)');g.fillStyle=hz;g.fillRect(0,240,Lw,240)});
 qrS(77);PB._k3sh=[];for(let i=0;i<4;i++)PB._k3sh.push({x:qr(0,2200),w:qr(30,70),a:qr(.08,.16),sd:i});
 PB._k3wf=[{x:qr(200,2000),y:120,h:300}];
 cave.post=function(L){X.save();X.globalCompositeOperation='lighter';
  for(const c of PB._k3cr)for(const sx of pbSX(L,c[0],60)){const p2=.5+.5*Math.sin(T*.03+c[0]);const g=X.createRadialGradient(sx,c[1],0,sx,c[1],34);g.addColorStop(0,pbA(c[2],.18*p2));g.addColorStop(1,pbA(c[2],0));X.fillStyle=g;X.fillRect(sx-34,c[1]-34,68,68)}
  X.restore();
  for(const w of PB._k3wf)for(const sx of pbSX(L,w.x,30)){X.save();const g=X.createLinearGradient(0,w.y,0,w.y+w.h);g.addColorStop(0,'rgba(120,180,210,.0)');g.addColorStop(.15,'rgba(150,200,230,.28)');g.addColorStop(1,'rgba(180,220,240,.12)');X.fillStyle=g;X.fillRect(sx-7,w.y,14,w.h);X.strokeStyle='rgba(220,240,255,.4)';X.lineWidth=1;for(let k=0;k<4;k++){const o=(T*3+k*37)%w.h;X.beginPath();X.moveTo(sx-5+k*3,w.y+o);X.lineTo(sx-5+k*3,w.y+o+18);X.stroke()}X.fillStyle='rgba(200,230,250,.18)';X.beginPath();X.ellipse(sx,w.y+w.h,26,6,0,0,7);X.fill();X.restore()}};
 PB._k3cave=cave;const wi=PB.L.findIndex(L=>L.id=='tim');PB.L.splice(wi<0?1:wi,0,cave);
 for(const c of PB._k3cr)PB.lights.push({L:cave,x:c[0],y:c[1],r:40,c:c[2],a:.3,li:0});const seen={};for(const q of PB._k3lan||[]){const k=Math.round(q[0]);if(seen[k])continue;seen[k]=1;PB.lights.push({L:cave,x:q[0],y:q[1],r:70,c:'#ffb050',a:.32,li:0})}
}catch(e){console.error('k3 mine',e)}}}
/* ---------- paprsky světla od slunce a měsíce ---------- */
const K3R={port:{x:730,y:92,c:'190,210,255',a:.035,n:7,s:1.3},swamp:{x:760,y:118,c:'215,255,190',a:.06,n:9,s:1.5},steppe:{x:700,y:262,c:'255,214,150',a:.07,n:11,s:1.9},fort:{x:210,y:86,c:'190,200,255',a:.03,n:6,s:1.2},sea:{x:780,y:90,c:'255,250,220',a:.055,n:10,s:1.7},train:{x:640,y:250,c:'255,190,130',a:.07,n:11,s:1.9}};
function k3Rays(){const R=K3R[lv.k];if(!R)return;let a0=R.a;if(lv.k=='train')a0*=1-Math.max(0,Math.min(1,(cam-4900)/2200));if(a0<.004)return;X.save();X.globalCompositeOperation='lighter';
 for(let i=0;i<R.n;i++){const u=i/(R.n-1)-.5,an=Math.PI/2+u*R.s+.05*Math.sin(T*.0035+i*1.9),w=.025+.035*k3h(i+R.n),al=a0*(.35+.65*Math.pow(.5+.5*Math.sin(T*.008+i*2.3),2)),L=1150;
  const ex=R.x+Math.cos(an)*L,ey=R.y+Math.sin(an)*L,g=X.createLinearGradient(R.x,R.y,ex,ey);g.addColorStop(0,'rgba('+R.c+','+al+')');g.addColorStop(.5,'rgba('+R.c+','+al*.45+')');g.addColorStop(1,'rgba('+R.c+',0)');X.fillStyle=g;
  X.beginPath();X.moveTo(R.x,R.y);X.lineTo(R.x+Math.cos(an-w)*L,R.y+Math.sin(an-w)*L);X.lineTo(R.x+Math.cos(an+w)*L,R.y+Math.sin(an+w)*L);X.closePath();X.fill()}X.restore()}
/* pevnost: světlomety prohledávají oblohu */
function k3Search(){if(lv.k!='fort')return;X.save();X.globalCompositeOperation='lighter';const f=.1;
 for(let j=0;j<3;j++){const wx=500+j*700,sx=((wx-cam*f)%2100+2100)%2100-300;if(sx<-400||sx>W+400)continue;const by=GY+10,an=-Math.PI/2+.55*Math.sin(T*.0055+j*2.1),L=760,w=.07;
  const g=X.createLinearGradient(sx,by,sx+Math.cos(an)*L,by+Math.sin(an)*L);g.addColorStop(0,'rgba(220,230,255,.14)');g.addColorStop(1,'rgba(220,230,255,0)');X.fillStyle=g;X.beginPath();X.moveTo(sx-3,by);X.lineTo(sx+Math.cos(an-w)*L,by+Math.sin(an-w)*L);X.lineTo(sx+Math.cos(an+w)*L,by+Math.sin(an+w)*L);X.lineTo(sx+3,by);X.closePath();X.fill();
  const hx=sx+Math.cos(an)*L*.72,hy=by+Math.sin(an)*L*.72,h2=X.createRadialGradient(hx,hy,0,hx,hy,60);h2.addColorStop(0,'rgba(220,230,255,.07)');h2.addColorStop(1,'rgba(220,230,255,0)');X.fillStyle=h2;X.fillRect(hx-60,hy-60,120,120)}X.restore()}
/* step: tetelení vzduchu nad obzorem */
function k3Heat(){if(lv.k!='steppe')return;X.save();for(let i=0;i<7;i++){const y=GY-38+i*7+Math.sin(T*.05+i)*1.5;X.fillStyle='rgba(255,236,200,'+(.028+.02*Math.sin(T*.07+i*1.3))+')';X.beginPath();for(let x=0;x<=W;x+=24)X.lineTo(x,y+Math.sin(x*.03+T*.09+i*2)*2.2);X.lineTo(W,y+4);X.lineTo(0,y+4);X.closePath();X.fill()}X.restore()}
{const _bx=bgX;bgX=function(){_bx();if(!lv||TR2||!SV.fx&&SV.fx!=null||state=='menu')return;try{k3Search();k3Rays();k3Heat()}catch(e){}}}
/* ---------- déšť: šplouchání na plošinách a kužely světla luceren ---------- */
const k3Rainy=()=>lv&&(lv.k=='port'||lv.k=='fort')&&!TR2;
function k3Splash(){if(!k3Rainy())return;const n=lv.k=='port'?7:5,dt=T-K3.lt;K3.lt=T;
 if(dt>0&&dt<4){let tw=0;const vis=[];for(const o of sol){if(o.gone||o.t==null||o.x>cam+W||o.x+o.w<cam||o.k=='ld'||o.t<-300)continue;if((o.k=='mf'||o.k=='mw'||o.k=='p')&&deco.some(d=>d.k=='mz'&&o.x>=d.x-2&&o.x+o.w<=d.x+d.w+2&&o.t<d.z1-2))continue;vis.push(o);tw+=Math.min(o.w,W)}
  for(let k=0;k<n&&tw>0;k++){let r=Math.random()*tw;for(const o of vis){r-=Math.min(o.w,W);if(r<=0){const x=Math.max(o.x,cam)+Math.random()*Math.min(o.w,W);K3.spl.push({x,z:o.t,t:0});break}}}}
 X.save();X.lineCap='round';for(const s of K3.spl){if(dt>0)s.t+=Math.min(3,dt);const x=s.x-cam,y=LY-s.z,a=1-s.t/8;if(a<=0)continue;X.strokeStyle='rgba(200,215,240,'+(.5*a)+')';X.lineWidth=1;X.beginPath();X.ellipse(x,y,1+s.t*1.4,.5+s.t*.35,0,0,7);X.stroke();if(s.t<4){X.beginPath();X.moveTo(x-1,y-1);X.lineTo(x-3-s.t,y-3-s.t*1.6);X.moveTo(x+1,y-1);X.lineTo(x+3+s.t,y-3-s.t*1.6);X.stroke()}}X.restore();
 K3.spl=K3.spl.filter(s=>s.t<8);if(K3.spl.length>80)K3.spl.splice(0,K3.spl.length-80)}
{const _f=dFx;dFx=function(){try{k3Splash()}catch(e){}return _f()}}
{const _kl=kulLive;kulLive=function(e,dx,dy){_kl(e,dx,dy);if(!k3Rainy()||!e.lamps||!e.lamps.length)return;X.save();X.globalCompositeOperation='lighter';
 for(const q of e.lamps){const x=dx+q[0],y=dy+q[1];if(x<-80||x>W+80)continue;const f=.85+.15*Math.sin(T*.21+q[0]),g=X.createLinearGradient(0,y,0,y+120);g.addColorStop(0,'rgba(255,214,150,'+(.13*f)+')');g.addColorStop(1,'rgba(255,214,150,0)');X.fillStyle=g;X.beginPath();X.moveTo(x-5,y+2);X.lineTo(x+5,y+2);X.lineTo(x+44,y+120);X.lineTo(x-44,y+120);X.closePath();X.fill();
  X.strokeStyle='rgba(255,236,200,.38)';X.lineWidth=.9;X.beginPath();for(let k=0;k<6;k++){const u=((T*.06+k*.17+q[0]*.01)%1),yy=y+6+u*104,xx=x+(k3h(k+q[0])-.5)*u*70;X.moveTo(xx,yy);X.lineTo(xx-1.5,yy+7)}X.stroke()}X.restore()}}
/* ---------- popředí: mech v bažině, telegrafní sloupy u vlaku, prach v dole, jiskry v Leviatanovi, sprška na moři ---------- */
function k3Moss(){if(lv.k!='swamp')return;const f=1.25,step=210,o=cam*f;X.save();X.lineCap='round';
 for(let i=Math.floor(o/step)-1;i<=(o+W)/step+1;i++){const r=k3h(i),x=i*step-o+r*90;if(r<.35)continue;const n=3+(r*4|0);for(let j=0;j<n;j++){const len=50+k3h(i*3+j)*110,sw=Math.sin(T*.016+i+j*.7)*7,xx=x+j*9;X.strokeStyle=j%2?'#14200f':'#1c2c16';X.lineWidth=3-j%2;X.beginPath();X.moveTo(xx,-8);X.quadraticCurveTo(xx+sw*.5,len*.5,xx+sw,len);X.stroke();
   X.fillStyle='rgba(110,140,90,.35)';for(let k=1;k<5;k++){const v=k/5;X.beginPath();X.ellipse(xx+sw*v*v,len*v,2.4,4,0,0,7);X.fill()}}}
 /* kola na vodní hladině */
 for(let k=0;k<5;k++){const ph=(T*.012+k*.2)%1,id=Math.floor(T*.012+k*.2),x=((k3h(id*5+k)*W*1.3-cam*.9)%W+W)%W,y=H-14-k3h(id+k)*40;X.strokeStyle='rgba(170,210,160,'+(.22*(1-ph))+')';X.lineWidth=1;X.beginPath();X.ellipse(x,y,4+ph*26,1.2+ph*5,0,0,7);X.stroke()}
 X.restore()}
function k3Poles(){if(lv.k!='train')return;const n=Math.max(0,Math.min(1,(cam-4900)/2200)),c=Math.max(0,Math.min(1,(cam-3150)/300,(5250-cam)/300));if(c>.5)return;const sp=1.7,step=1500,o=(TD||0)*sp+cam*sp;X.save();
 const col=n>.5?'6,4,10':'26,10,18';for(let i=Math.floor(o/step)-1;i<=(o+W)/step+1;i++){const x=i*step-o+k3h(i)*300;
  /* rozmazaný sloup: několik průsvitných kopií ve směru jízdy */
  for(let b=0;b<5;b++){const a=(.22-b*.035)*(1-c*2);if(a<=0)continue;X.fillStyle='rgba('+col+','+a+')';const bx=x+b*10;X.fillRect(bx-8,46,16,H);X.fillRect(bx-48,62,96,6)}
  X.fillStyle='rgba('+col+','+(.5*(1-c*2))+')';X.beginPath();X.ellipse(x+380+k3h(i+7)*300,H+20,150,48,0,0,7);X.fill()}X.restore()}
function k3Chains(){if(lv.k!='levi')return;const f=1.3,step=420,o=cam*f;X.save();X.lineCap='round';
 for(let i=Math.floor(o/step)-1;i<=(o+W)/step+1;i++){const r=k3h(i+40);if(r<.3)continue;const x=i*step-o+r*120,len=60+k3h(i+9)*150,sw=Math.sin(T*.02+i)*4;
  X.strokeStyle='#0c0605';X.lineWidth=5;for(let y=-6;y<len;y+=10){const xx=x+sw*(y/len);X.beginPath();X.ellipse(xx,y,(y/10)%2?1.5:3.6,5,0,0,7);X.stroke()}
  X.fillStyle='#0c0605';X.beginPath();X.moveTo(x+sw-8,len);X.quadraticCurveTo(x+sw-10,len+14,x+sw,len+18);X.quadraticCurveTo(x+sw+10,len+14,x+sw+8,len);X.closePath();X.fill();X.fillStyle='rgba(255,120,60,.25)';X.fillRect(x+sw+3,len+2,2,10)}
 /* trubky dole v popředí */
 const st2=640,o2=cam*1.35;for(let i=Math.floor(o2/st2)-1;i<=(o2+W)/st2+1;i++){const x=i*st2-o2+k3h(i+70)*200;X.fillStyle='#0a0504';X.fillRect(x,H-42,240,22);X.fillRect(x-6,H-46,12,30);X.fillRect(x+234,H-46,12,30);X.fillStyle='rgba(255,110,50,.18)';X.fillRect(x,H-42,240,2)}
 X.restore()}
function k3Motes(){const k=lv.k;if(k!='mine'&&k!='levi'&&k!='sea'&&k!='steppe')return;X.save();
 if(k=='mine'){X.globalCompositeOperation='lighter';for(let i=0;i<34;i++){const x=((k3h(i)*W*1.5-cam*1.1+Math.sin(T*.01+i)*30)%W+W)%W,y=((k3h(i+50)*H-T*.12*(.4+k3h(i+9)))%H+H)%H,a=.25+.25*Math.sin(T*.04+i*2);X.fillStyle='rgba(255,220,160,'+a+')';X.fillRect(x,y,1.6,1.6)}}
 else if(k=='levi'){X.globalCompositeOperation='lighter';for(let i=0;i<26;i++){const life=((T*.006+k3h(i))%1),x=((k3h(i+3)*W*1.4-cam*1.05+Math.sin(T*.03+i)*20)%W+W)%W,y=H+10-life*(H*.9);X.fillStyle='rgba(255,'+(140+(i%3)*30)+',60,'+(.7*(1-life))+')';X.fillRect(x,y,2,2)}}
 else if(k=='sea'){for(let i=0;i<20;i++){const x=((k3h(i)*W*1.3-cam*1.2-T*1.5)%W+W)%W,y=H-30-k3h(i+20)*70+Math.sin(T*.05+i)*6;X.fillStyle='rgba(255,255,255,'+(.25+.2*Math.sin(T*.07+i))+')';X.fillRect(x,y,2,1.5)}}
 else{for(let i=0;i<24;i++){const x=((k3h(i)*W*1.4-cam*1.15+T*(2+k3h(i+4)*2))%W+W)%W,y=GY+k3h(i+30)*(H-GY)+Math.sin(T*.04+i)*5;X.fillStyle='rgba(240,210,160,'+(.3+.2*k3h(i+8))+')';X.fillRect(x,y,2.2,1.2)}}
 X.restore()}
{const _f=fg;fg=function(){const r=_f();if(!lv||TR2&&lv.k!='train'||!SV.fx&&SV.fx!=null)return r;try{k3Moss();k3Poles();k3Chains();k3Motes()}catch(e){}return r}}
/* ---------- LEVIATAN: výtrysky páry a sprška jisker ---------- */
{const _pl=PBB.levi;PBB.levi=function(){_pl();try{qrS(91);const V=[];for(let i=0;i<6;i++)V.push({x:qr(0,2600),y:qr(140,360),p:qr(150,260)|0,o:qr(0,200)|0,sp:qr()<.4});
 const L={c:null,Lw:2600,y0:0,h:480,f:.13,post(L){X.save();for(const v of V)for(const sx of pbSX(L,v.x,120)){const u=(T+v.o)%v.p;if(v.sp){if(u<50){X.globalCompositeOperation='lighter';for(let k=0;k<14;k++){const tt=(u+k*3)%50/50,vx=(k3h(k+v.x)-.5)*3,px=sx+vx*tt*40,py=v.y+tt*60+tt*tt*90;X.fillStyle='rgba(255,'+(170+(k%3)*30)+',80,'+(1-tt)+')';X.fillRect(px,py,2,2)}X.globalCompositeOperation='source-over'}X.fillStyle='rgba(255,200,120,'+(u<50?.6:.15)+')';X.beginPath();X.arc(sx,v.y,3,0,7);X.fill()}
   else if(u<70){const k=u/70;for(let j=0;j<6;j++){const t2=Math.max(0,k-j*.06),r=6+t2*46,a=(1-t2)*.32;if(a<=0)continue;X.fillStyle='rgba(225,215,205,'+a+')';X.beginPath();X.arc(sx+t2*20+Math.sin(j)*6,v.y-t2*70-j*4,r,0,7);X.fill()}}}
  X.restore()}};const pi=PB.L.findIndex(q=>q.post&&q.f==.13);PB.L.splice(pi<0?2:pi+1,0,L)}catch(e){console.error('k3 levi',e)}}}

/* důl: světelné šachty z puklin ve stropě – kreslené přes ztmavení */
{const _l=lighting;lighting=function(){_l();if(TR2||!lv||lv.k!='mine'||!PB.ok||PB.k!='mine'||!PB._k3cave||state=='menu')return;const L=PB._k3cave;X.save();X.translate(0,camZ*.45);X.globalCompositeOperation='lighter';
 for(const s of PB._k3sh)for(const sx of pbSX(L,s.x,220)){const sw=Math.sin(T*.004+s.sd)*14,fl=.75+.25*Math.sin(T*.017+s.sd*3),x0=sx,x1=sx+sw+60,a=s.a*.8*fl;const g=X.createLinearGradient(0,-60,0,430);g.addColorStop(0,'rgba(255,214,150,'+a+')');g.addColorStop(.7,'rgba(255,214,150,'+a*.35+')');g.addColorStop(1,'rgba(255,214,150,0)');X.fillStyle=g;X.beginPath();X.moveTo(x0-s.w*.3,-60);X.lineTo(x0+s.w*.3,-60);X.lineTo(x1+s.w*1.2,430);X.lineTo(x1-s.w*1.2,430);X.closePath();X.fill();
  X.fillStyle='rgba(255,232,190,.55)';for(let k=0;k<9;k++){const u=((T*.0025+k*.111+s.sd*.31)%1),px=x0+(x1-x0)*u+Math.sin(T*.02+k)*s.w*.5,py=-60+480*u;X.fillRect(px,py,1.4,1.4)}
  const pg=X.createRadialGradient(x1,425,0,x1,425,s.w*1.6);pg.addColorStop(0,'rgba(255,214,150,'+a*.9+')');pg.addColorStop(1,'rgba(255,214,150,0)');X.fillStyle=pg;X.fillRect(x1-s.w*1.6,400,s.w*3.2,50)}
 X.restore()}}
/* moře: lodě v dálce s novými plachtami */
{const _g2=dBG2;dBG2=function(d){if(d.k!='mast2'||!SV.fx&&SV.fx!=null)return _g2(d);const x=d.x-cam;if(x<-500||x>W+500)return;const y=LY-d.z;X.save();X.lineCap='round';
 X.strokeStyle='rgba(60,40,20,.7)';X.lineWidth=1.1;[[-260],[260]].forEach(([a])=>{X.beginPath();X.moveTo(x,y-d.h+10);X.lineTo(x+a,y-4);X.stroke()});
 const g=X.createLinearGradient(x-7,0,x+7,0);g.addColorStop(0,'#3a2414');g.addColorStop(.5,'#7a5434');g.addColorStop(1,'#2a1a0c');X.fillStyle=g;X.fillRect(x-7,y-d.h,14,d.h);X.strokeStyle='#160c06';X.lineWidth=1.2;X.strokeRect(x-7,y-d.h,14,d.h);
 [[y-d.h+90,140,108],[y-d.h+220,180,118]].forEach(([yt,hw,hh],j)=>{k3Sail(x,yt+2,hw,hh,{i:j+7+(d.x|0)%5,patch:j?[-.4,.5]:null},T);k3Yard(x,yt,hw)});
 X.fillStyle='#111';X.fillRect(x+8,y-d.h-4,40,24);X.fillStyle='#d9a830';X.beginPath();X.ellipse(x+28,y-d.h+8,10,3,0,0,7);X.fill();X.restore()}}
