/* =====================================================================
   v75: NOVÝ VÝBĚR POSTAVY
   – čtyři hrdinové na dřevěném pódiu v kruhovém „karuselu“, vybraný
     stojí vpředu pod reflektorem, ostatní ve stínu
   – vpravo profil postavy: výzbroj, schopnosti s ikonami, vlastnosti
     jako náboje, odznak „dohráno“
   ===================================================================== */
const CS3={p:[0,1,2,3],t0:-99,hop:0,hv:null,lt:-99,go:0,fl:0,stF:[0,0,0,0,0]};
const CABI=[[2,3,1,5],[1,2,3,4],[2,1,3,5],[1,3,3,5]];
const CTAG=[['Střelba','Laso','Vyvážený'],['Plížení','Rychlost','Atentáty'],['Síla','Brokovnice','Zakázky'],['Převleky','Karty','Lest']];
const CDIF=['Vhodný pro začátečníky','Pro zkušené hráče','Jednoduchý, ale pomalý','Náročný na taktiku'];
function cs3Slot(q){const a=q*Math.PI/2,c=Math.cos(a),s=Math.sin(a);return{x:290+s*178,y:404+c*40,k:.62+.38*(c+1)/2,f:(c+1)/2,c}}
function cs3Ico(cls,i,x,y){const c0=SV.cls;SV.cls=cls;try{skIconC(i,x,y)}catch(e){}finally{SV.cls=c0}}
function cs3Bg(){const t=T,c0=cam,cz=camZ,lv0=lv,li0=li;lv=LVK('steppe');li=LVI('steppe');try{if(PB.k!=='steppe'||!PB.ok)pbBuild();cam=2200+Math.sin(t*.002)*80;camZ=0;if(PB.ok)pbDraw();else{X.fillStyle='#2a1020';X.fillRect(0,0,W,H)}}catch(e){X.fillStyle='#2a1020';X.fillRect(0,0,W,H)}cam=c0;camZ=cz;lv=lv0;li=li0;
 X.fillStyle='rgba(20,6,16,.5)';X.fillRect(0,0,W,H);
 /* pódium */const y0=420;X.fillStyle='#3a2212';X.beginPath();X.moveTo(0,H);X.lineTo(0,y0+10);X.quadraticCurveTo(290,y0-34,560,y0+10);X.lineTo(560,H);X.closePath();X.fill();
 X.save();X.clip();for(let k=0;k<9;k++){const yy=y0-20+k*16;const g=X.createLinearGradient(0,yy,0,yy+16);g.addColorStop(0,k%2?'#6a4022':'#74482a');g.addColorStop(1,'#3a2210');X.fillStyle=g;X.fillRect(0,yy,560,16);X.fillStyle='rgba(0,0,0,.5)';X.fillRect(0,yy+15,560,1.5);for(let j=0;j<4;j++){const sx=((k*97+j*151)%560);X.fillRect(sx,yy,1.5,16)}}X.restore();
 X.strokeStyle='#e8b860';X.lineWidth=2;X.globalAlpha=.4;X.beginPath();X.moveTo(0,y0+10);X.quadraticCurveTo(290,y0-34,560,y0+10);X.stroke();X.globalAlpha=1;
 const vg=X.createRadialGradient(W/2,H/2,H*.4,W/2,H/2,H*1.05);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');X.fillStyle=vg;X.fillRect(0,0,W,H)}
function cs3Spot(x,y,a){X.save();X.globalCompositeOperation='lighter';const g=X.createLinearGradient(0,0,0,y);g.addColorStop(0,'rgba(255,220,150,0)');g.addColorStop(1,'rgba(255,220,150,'+(.2*a)+')');X.fillStyle=g;X.beginPath();X.moveTo(x-30,0);X.lineTo(x+30,0);X.lineTo(x+125,y+14);X.lineTo(x-125,y+14);X.closePath();X.fill();
 X.translate(x,y+8);X.scale(1,.24);const r=X.createRadialGradient(0,0,0,0,0,130);r.addColorStop(0,'rgba(255,220,150,'+(.4*a)+')');r.addColorStop(1,'rgba(255,220,150,0)');X.fillStyle=r;X.fillRect(-130,-130,260,260);X.restore();
 for(let i=0;i<22;i++){const u=(T*.003+hs(i*2.3))%1,px=x+(hs(i)-.5)*(60+u*170),py=u*y;X.fillStyle='rgba(255,236,190,'+(.4*Math.sin(u*Math.PI)*a)+')';X.fillRect(px,py,2,2)}}
function cs3Bullet(x,y,on,col){X.save();X.translate(x,y);X.fillStyle=on?col:'rgba(60,40,20,.25)';X.strokeStyle='#2a1406';X.lineWidth=1.2;X.beginPath();X.moveTo(-4,7);X.lineTo(-4,-2);X.quadraticCurveTo(-4,-9,0,-11);X.quadraticCurveTo(4,-9,4,-2);X.lineTo(4,7);X.closePath();X.fill();X.stroke();if(on){X.fillStyle='rgba(255,255,255,.35)';X.fillRect(-2.5,-6,1.6,11)}X.fillStyle=on?'#b07a2a':'rgba(60,40,20,.2)';X.fillRect(-4.5,5,9,3);X.restore()}
const CSB3={x:W-250,y:478,w:226,h:44},CSBK={x:14,y:12,w:118,h:36},CSAR=[{x:46,y:362,d:-1},{x:534,y:362,d:1}];
function cs3Med(i){return{x:290+(i-1.5)*60,y:513,r:19}}
dCls=function(){const C=cs.s,t=cs.t||0;if(T-CS3.lt>3){CS3.t0=T;CS3.p=[0,1,2,3].map(i=>((i-C)%4+4)%4);CS3.stF=CST[C].slice()}CS3.lt=T;const age=T-CS3.t0;
 /* plynulý posun karuselu */for(let i=0;i<4;i++){let tg=((i-C)%4+4)%4;if(tg>2)tg-=4;let cur=CS3.p[i];let d=tg-cur;while(d>2)d-=4;while(d<-2)d+=4;CS3.p[i]=cur+d*.16}
 for(let j=0;j<5;j++)CS3.stF[j]+=(CST[C][j]-CS3.stF[j])*.15;if(CS3.hop>0)CS3.hop--;if(CS3.fl>0)CS3.fl--;
 cs3Bg();
 X.textAlign='center';goldText('VYBER SI POSTAVU',W/2+150,58,40,5,Math.min(1,age/12));X.font='italic 15px Georgia';X.fillStyle='rgba(255,236,200,.85)';X.fillText(cs.mode=='new'?'Každý kaktus hraje jinak – vyber si svůj styl.':'Změna postavy – postup, hvězdy i úkoly zůstávají.',W/2+150,84);
 /* hrdinové – od zadních po přední */const ord=[0,1,2,3].map(i=>[i,cs3Slot(CS3.p[i])]).sort((a,b)=>a[1].c-b[1].c);
 const sel=cs3Slot(CS3.p[C]);cs3Spot(sel.x,sel.y,.9);
 ord.forEach(([i,s])=>{const z=2.3+i*.004,front=i==C,hop=front?Math.sin(Math.min(1,(18-CS3.hop)/18)*Math.PI)*(CS3.hop>0?16:0):0,dk=.62*(1-s.f);
  const al=Math.max(0,Math.min(1,(s.c+.85)/.55));if(al<=0)return;X.save();X.globalAlpha=al;
  X.fillStyle='rgba(10,4,2,'+(.35+.15*s.f)+')';X.beginPath();X.ellipse(s.x,s.y+4,60*s.k,10*s.k,0,0,7);X.fill();
  X.save();X.translate(s.x,s.y-hop);X.scale(s.k,s.k);try{tiHero(i,0,0,z,{t:T+i*37,every:2,face:s.x<290?1:s.x>290?-1:1,ex:front?heroPose(i,T):{},tint:dk>.02?['rgba(24,10,22,'+dk.toFixed(2)+')']:[],rim:front?'rgba(255,214,150,1)':null,rdx:3,rdy:2,ra:.9})}catch(e){}X.restore();
  X.restore();if(front&&CS3.fl>0){tiGlow(s.x,s.y-110,180,'255,230,170',CS3.fl/14*.8)}});
 /* jmenovka */{const nm=CLN[C].n.toUpperCase();X.font='24px '+FONT;const tw=X.measureText(nm).width+56,px=sel.x-tw/2,py=450;X.save();X.translate(0,Math.max(0,1-age/14)*30);m2Plank(px,py,tw,40,nm,0);X.restore()}
 /* šipky */CSAR.forEach(a=>{const hv=CS3.hv&&CS3.hv.k=='arr'&&CS3.hv.d==a.d,b=Math.sin(T*.12)*3*a.d;X.save();X.translate(a.x+b,a.y);X.scale(a.d,1);X.fillStyle='rgba(0,0,0,.45)';X.beginPath();X.arc(2,4,22,0,7);X.fill();X.fillStyle=hv?'#c8925a':'#8a5a2a';X.beginPath();X.arc(0,0,22,0,7);X.fill();X.strokeStyle=hv?'#ffe2a0':'#1a0a04';X.lineWidth=2;X.stroke();X.fillStyle='#f6e4bc';X.beginPath();X.moveTo(8,0);X.lineTo(-5,-10);X.lineTo(-5,10);X.closePath();X.fill();X.restore()});
 /* medailonky */for(let i=0;i<4;i++){const m=cs3Med(i),s=i==C,hv=CS3.hv&&CS3.hv.k=='med'&&CS3.hv.i==i;X.save();X.beginPath();X.arc(m.x,m.y,m.r,0,7);X.fillStyle=s?'#7a2a1a':'#2a1a10';X.fill();X.clip();try{heroAt(i,m.x-4,m.y+110,1.2,{t:T+i*40})}catch(e){}X.restore();X.strokeStyle=s?'#ffd27a':hv?'#e8c080':'#6a4a2a';X.lineWidth=s?3.2:2.2;X.beginPath();X.arc(m.x,m.y,m.r,0,7);X.stroke();if(SV.cu&&SV.cu[i]){qCheck(m.x+m.r-4,m.y-m.r+5,.55,'#9fe09a')}}
 /* profil vpravo */cs3Card(C,age);
 /* tlačítka */m2Plank(CSBK.x,CSBK.y,CSBK.w,CSBK.h,'◀ ZPĚT',CS3.hv&&CS3.hv.k=='back');
 const pul=.5+.5*Math.sin(T*.1);X.save();X.shadowColor='rgba(120,255,90,'+(.3+.3*pul)+')';X.shadowBlur=14;m2Plank(CSB3.x,CSB3.y,CSB3.w,CSB3.h,cs.mode=='new'?'ZAČÍT HRU ▶':'VYBRAT ▶',CS3.hv&&CS3.hv.k=='ok','g');X.restore();
 if(cs.mode=='new'&&(SV.un>0||SV.st>0)){X.textAlign='right';X.font='italic 12px Georgia';X.fillStyle='#ffb09a';X.fillText('Pozor: nová hra smaže postup (kapitola '+(SV.un+1)+', ★ '+SV.st+')',CSB3.x+CSB3.w,CSB3.y-8)}
 X.textAlign='left';X.font='12px Georgia';X.fillStyle='rgba(255,236,200,.6)';X.fillText(TOUCH?'Klepni na postavu':'← → výběr  •  Enter potvrdit  •  Esc zpět',150,36);
 if(age<14){X.fillStyle='rgba(0,0,0,'+(1-age/14)+')';X.fillRect(0,0,W,H)}
 if(CS3.go>0){X.fillStyle='rgba(255,240,210,'+(CS3.go/16*.5)+')';X.fillRect(0,0,W,H)}}
function cs3Card(C,age){const x=572,y=104,w=364,h=360,k=m3Ease((age-6)/16),ch=Math.min(1,(T-(cs.ch||-99))/12);X.save();X.translate((1-k)*80,0);X.globalAlpha=k;
 qPaper(x,y,w,h,C*11+3);
 X.save();X.translate(x+w-52,y+34);X.rotate(.18);X.strokeStyle='rgba(168,36,26,.75)';X.lineWidth=2;X.strokeRect(-36,-12,72,24);X.font='700 13px Georgia';X.textAlign='center';X.fillStyle='rgba(168,36,26,.85)';X.fillText('PROFIL',0,5);X.restore();
 X.globalAlpha=k*(.3+.7*ch);X.textAlign='left';X.font='28px '+FONT;X.fillStyle='#2a1206';X.fillText(CLN[C].n,x+20,y+42);X.font='italic 14px Georgia';X.fillStyle='#6a3a1a';X.fillText(CLN[C].d,x+20,y+64);
 /* štítky */let tx=x+20;[...CTAG[C],...(SV.cu&&SV.cu[C]?['✓ Už jsi s ní hrál']:[])].forEach(tg=>{const ok=tg[0]=='✓';X.font='700 11px Georgia';const tw=X.measureText(tg).width+16;X.fillStyle=ok?'rgba(42,122,42,.16)':'rgba(122,58,20,.16)';X.beginPath();X.roundRect(tx,y+74,tw,19,9);X.fill();X.strokeStyle=ok?'rgba(42,122,42,.6)':'rgba(122,58,20,.5)';X.lineWidth=1;X.stroke();X.fillStyle=ok?'#2a7a2a':'#7a3a14';X.fillText(tg,tx+8,y+87);tx+=tw+6});
 X.fillStyle='#7a5228';X.fillRect(x+16,y+102,w-32,1.5);
 X.font='700 11px Georgia';X.fillStyle='#8a1a0a';X.fillText('VÝZBROJ: '+CWP[C].toUpperCase(),x+20,y+120);
 CLN[C].ab.forEach((a,i)=>{const yy=y+132+i*34;X.fillStyle='rgba(58,30,12,.82)';X.beginPath();X.arc(x+34,yy+12,15,0,7);X.fill();X.strokeStyle='rgba(122,82,40,.9)';X.lineWidth=1;X.stroke();cs3Ico(C,CABI[C][i],x+34,yy+12);X.font='13.5px Georgia';X.fillStyle='#2a1406';const ls=wrapL(a,w-90);ls.slice(0,2).forEach((l,j)=>X.fillText(l,x+58,yy+(ls.length>1?9:16)+j*14))});
 X.fillStyle='#7a5228';X.fillRect(x+16,y+272,w-32,1.5);
 CSN.forEach((n,i)=>{const col=i%2,row=i>>1,sx=x+20+col*172,sy=y+294+row*22,v=CS3.stF[i];X.font='700 11.5px Georgia';X.fillStyle='#3a2210';X.fillText(n,sx,sy+4);for(let j=0;j<5;j++)cs3Bullet(sx+88+j*13,sy,v>j+.5,i==4?'#c8402a':'#d8a040')});
 X.font='italic 12px Georgia';X.fillStyle='#7a4a1e';X.fillText(CDIF[C],x+20+172,y+294+2*22+4);
 X.restore()}
function cs3Pick(i){if(i==cs.s)return;cs.pv=cs.s;cs.s=i;cs.ch=T;CS3.hop=18;sfx('ui');sfx('cloth')}
function cs3Confirm(){if(CS3.go>0)return;CS3.go=16;CS3.fl=14;sfx('gun')}
updCls=function(){cs.t=(cs.t||0)+1;if(CS3.go>0){if(--CS3.go==0)cs3Do();return}
 if(P.ArrowLeft||P.KeyA)cs3Pick((cs.s+3)%4);if(P.ArrowRight||P.KeyD)cs3Pick((cs.s+1)%4);
 if(P.Escape){sfx('uiok');state='menu';mn={s:0,sub:0};return}if(P.Enter||P.Space||kp('attack'))cs3Confirm()};
function cs3Do(){SV.cls=cs.s;saveSV();if(cs.mode=='new'){SV.st=0;SV.un=0;for(const k in SV.up)SV.up[k]=0;SV.qd={};SV.qb={};SV.qm={};saveSV();p=null;kills=0;playStory(()=>startLv(0))}else{state='menu';mn={s:0,sub:0}}}
function cs3Hit(x,y){if(x>CSBK.x&&x<CSBK.x+CSBK.w&&y>CSBK.y&&y<CSBK.y+CSBK.h)return{k:'back'};if(x>CSB3.x&&x<CSB3.x+CSB3.w&&y>CSB3.y&&y<CSB3.y+CSB3.h)return{k:'ok'};
 for(const a of CSAR)if(Math.hypot(x-a.x,y-a.y)<26)return{k:'arr',d:a.d};for(let i=0;i<4;i++){const m=cs3Med(i);if(Math.hypot(x-m.x,y-m.y)<m.r+3)return{k:'med',i}}
 for(let i=0;i<4;i++){const s=cs3Slot(CS3.p[i]);if(Math.abs(x-s.x)<55*s.k&&y<s.y&&y>s.y-250*s.k)return{k:'hero',i}}return null}
{const _mh=mh;mh=function(e,c){if(state!='cls')return _mh(e,c);const r=C.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W,y=(e.clientY-r.top)/r.height*H;MX=x;MY=y;const h=cs3Hit(x,y);
 if(!c){if((h&&h.k)!=(CS3.hv&&CS3.hv.k)||(h&&h.i)!=(CS3.hv&&CS3.hv.i))if(h)sfx('ui');CS3.hv=h;return}if(!h||CS3.go>0)return;auKick();
 if(h.k=='back'){sfx('uiok');state='menu';mn={s:0,sub:0}}else if(h.k=='ok')cs3Confirm();else if(h.k=='arr')cs3Pick((cs.s+h.d+4)%4);else if(h.k=='med'||h.k=='hero'){if(h.i==cs.s&&h.k=='hero')cs3Confirm();else cs3Pick(h.i)}}}
