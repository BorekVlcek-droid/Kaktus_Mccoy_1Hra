/* =====================================================================
   v83: SPODNÍ PÁS HUD (podle předlohy hráče)
   ↻ restart │ mince + body │ portrét (třída, nálada, prostředí) × životy
   + zdraví │ zbraň + výdrž (rozbití s animací) │ Menu │ tichá pauza │ zvuk
   ===================================================================== */
const HB={on:1,H:54,vis:0,hpV:1,trail:1,trD:0,lifeT:0,lifeN:5,cntV:null,ptsV:0,coinT:0,hov:'',conf:'',confT:0,pz:0,
 wFlash:0,brk:null,swapT:0,wKey:'',repT:0,lastCP:null,mx:-1,my:-1,mt:0,bg:null,hitT:0,deb:[],idle:0,lastSt:null,lastHp:null,shT:0,tip:''};
const CDUR=[60,0,45,70],CWN=['Kapesní nůž','Pěsti','Tesák','Vycházková hůl'],CREP=1800;
const WNC={pistol:'Pistole',saw:'Motorová pila',club:'Pálka',shotgun:'Brokovnice',pick:'Krumpáč',bazooka:'Bazuka',lasso:'Laso'};
const HBRK={cls0:'NŮŽ SE ZLOMIL!',cls2:'TESÁK PRASKL!',cls3:'HŮL SE ZLOMILA!',pistol:'PISTOLE DOSLOUŽILA!',shotgun:'BROKOVNICE DOSLOUŽILA!',bazooka:'BAZUKA DOSLOUŽILA!',saw:'PILA SE ROZPADLA!',club:'PÁLKA PRASKLA!',pick:'KRUMPÁČ SE ZLOMIL!',lasso:'LASO SE PŘETRHLO!'};
const HBMAT={cls0:'m',cls2:'m',cls3:'w',pistol:'m',shotgun:'m',bazooka:'m',saw:'m',club:'w',pick:'w',lasso:'r'};
Object.assign(SFX,{
 hbClick:{p:[['t',{w:'triangle',f:620,f2:420,d:.06,g:.12}],['n',{d:.03,g:.08,ft:'bandpass',f:2400,q:2}]],mi:40},
 hbSnap:{p:[['n',{d:.05,g:.6,ft:'highpass',f:2200}],['t',{w:'square',f:880,f2:220,d:.12,g:.08}],['n',{d:.22,g:.25,ft:'bandpass',f:3600,f2:900,q:2,dl:.03}],['t',{w:'triangle',f:1900,f2:1700,d:.25,g:.05,dl:.06}]],mi:200},
 hbLife:{p:[['t',{w:'triangle',f:520,f2:130,d:.5,g:.16}],['t',{w:'sine',f:260,f2:90,d:.6,g:.14,dl:.08}],['n',{d:.3,g:.12,f:500,f2:120}]],mi:300},
 hbFix:{p:[['t',{w:'triangle',f:900,f2:1500,d:.1,g:.08}],['t',{w:'triangle',f:1500,f2:2200,d:.12,g:.07,dl:.09}],['n',{d:.05,g:.15,ft:'highpass',f:3000,dl:.02}]],mi:200}});
const hbNow=()=>performance.now();
/* ---------- geometrie (vůči horní hraně pásu) ---------- */
const HBB={restart:{x:30,y:27,r:19},menu:{x:780,y:13,w:76,h:28},pause:{x:886,y:27,r:18},sound:{x:932,y:27,r:18}};
function hbY0(){return H-HB.H*HB.vis}
function hbHit(x,y){if(HB.vis<.9)return'';const y0=hbY0();for(const k in HBB){const b=HBB[k];if(b.r){if(Math.hypot(x-b.x,y-(y0+b.y))<=b.r+3)return k}else if(x>=b.x-2&&x<=b.x+b.w+2&&y>=y0+b.y-2&&y<=y0+b.y+b.h+2)return k}return''}
function hbShow(){return HB.on&&p&&lv&&!TR2&&['play','pause','over','poster'].includes(state)}
/* ---------- pozadí pásu (předkreslený pergamen) ---------- */
function hbBgBuild(){const c=document.createElement('canvas');c.width=W;c.height=HB.H+14;const g=c.getContext('2d'),y=14,h=HB.H;
 const sh=g.createLinearGradient(0,0,0,y);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,.42)');g.fillStyle=sh;g.fillRect(0,0,W,y);
 const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#f2deb0');gr.addColorStop(.5,'#e4c891');gr.addColorStop(1,'#caa66a');g.fillStyle=gr;g.fillRect(0,y,W,h);
 let sd=7;const rn=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
 for(let i=0;i<16;i++){const x=rn()*W,yy=y+rn()*h,r=12+rn()*34,rg=g.createRadialGradient(x,yy,0,x,yy,r);rg.addColorStop(0,'rgba(150,100,40,.11)');rg.addColorStop(1,'rgba(150,100,40,0)');g.fillStyle=rg;g.fillRect(x-r,yy-r,r*2,r*2)}
 for(let i=0;i<1400;i++){const x=rn()*W,yy=y+rn()*h,a=rn()*.09;g.fillStyle=rn()<.55?'rgba(110,70,25,'+a+')':'rgba(255,250,230,'+a+')';g.fillRect(x,yy,1+rn()*2.2,1)}
 for(let i=0;i<40;i++){const x=rn()*W,yy=y+4+rn()*(h-8);g.strokeStyle='rgba(120,80,30,'+(.05+rn()*.06)+')';g.lineWidth=.8;g.beginPath();g.moveTo(x,yy);g.quadraticCurveTo(x+10+rn()*20,yy+(rn()-.5)*6,x+26+rn()*40,yy+(rn()-.5)*4);g.stroke()}
 const eg=g.createLinearGradient(0,0,W,0);eg.addColorStop(0,'rgba(80,45,12,.42)');eg.addColorStop(.035,'rgba(80,45,12,0)');eg.addColorStop(.965,'rgba(80,45,12,0)');eg.addColorStop(1,'rgba(80,45,12,.42)');g.fillStyle=eg;g.fillRect(0,y,W,h);
 const bg=g.createLinearGradient(0,y+h-10,0,y+h);bg.addColorStop(0,'rgba(80,45,12,0)');bg.addColorStop(1,'rgba(80,45,12,.3)');g.fillStyle=bg;g.fillRect(0,y+h-10,W,10);
 g.fillStyle='#3a210e';g.fillRect(0,y,W,3);g.fillStyle='rgba(255,240,205,.6)';g.fillRect(0,y+3,W,1);
 for(let x=6;x<W;x+=22){g.fillStyle='rgba(60,34,12,.5)';g.fillRect(x,y+1,1,1)}
 [170,490,768].forEach(x=>{g.fillStyle='rgba(90,55,20,.32)';g.fillRect(x,y+9,2,h-17);g.fillStyle='rgba(255,246,220,.55)';g.fillRect(x+2,y+9,1,h-17)});
 HB.bg=c}
/* ---------- drobné kreslicí pomůcky ---------- */
function hbRR(x,y,w,h,r){X.beginPath();X.roundRect(x,y,w,h,r)}
function hbMix(a,b,t){const A=parseInt(a.slice(1),16),B=parseInt(b.slice(1),16),r=(A>>16)+(((B>>16)-(A>>16))*t),g=((A>>8)&255)+((((B>>8)&255)-((A>>8)&255))*t),bl=(A&255)+(((B&255)-(A&255))*t);return'rgb('+(r|0)+','+(g|0)+','+(bl|0)+')'}
function hbTxt(t,x,y,f,col,al,st){X.font=f;X.textAlign=al||'left';if(st){X.lineWidth=st;X.strokeStyle='rgba(255,244,214,.55)';X.strokeText(t,x,y)}X.fillStyle=col;X.fillText(t,x,y)}
/* kruhové tlačítko ze tmavé kůže s mosazným lemem */
function hbCirc(x,y,r,hov,act,warn){X.save();const s=hov?1.07:1;X.translate(x,y);X.scale(s,s);
 X.fillStyle='rgba(40,20,6,.35)';X.beginPath();X.arc(1.5,2.5,r+1,0,7);X.fill();
 const g=X.createRadialGradient(-r*.3,-r*.35,2,0,0,r);g.addColorStop(0,warn?'#b0402a':act?'#7a5226':'#6a4222');g.addColorStop(1,warn?'#5a140a':act?'#3a2410':'#2e1a0a');X.fillStyle=g;X.beginPath();X.arc(0,0,r,0,7);X.fill();
 X.lineWidth=2.4;X.strokeStyle=act?'#ffd27a':warn?'#ffb08a':'#c9a46a';X.beginPath();X.arc(0,0,r-1.2,0,7);X.stroke();
 X.lineWidth=1;X.strokeStyle='rgba(20,10,2,.8)';X.beginPath();X.arc(0,0,r+.6,0,7);X.stroke();
 X.fillStyle='rgba(255,240,210,.14)';X.beginPath();X.ellipse(-r*.15,-r*.45,r*.62,r*.32,-.2,0,7);X.fill();X.restore()}
function hbIcoRestart(x,y,s,a){X.save();X.translate(x,y);X.rotate(a||0);X.scale(s,s);X.lineCap='round';X.lineJoin='round';
 for(let i=0;i<2;i++){X.save();X.rotate(i*Math.PI);X.strokeStyle='#2a1406';X.lineWidth=5.2;X.beginPath();X.arc(0,0,8,-2.75,-.55);X.stroke();X.strokeStyle='#f0a040';X.lineWidth=3;X.beginPath();X.arc(0,0,8,-2.75,-.55);X.stroke();
  const ax=Math.cos(-.55)*8,ay=Math.sin(-.55)*8;X.fillStyle='#2a1406';X.beginPath();X.moveTo(ax+5.4,ay-3.4);X.lineTo(ax-1.2,ay+6);X.lineTo(ax-4.6,ay-3);X.closePath();X.fill();X.fillStyle='#ffc060';X.beginPath();X.moveTo(ax+3.6,ay-2.4);X.lineTo(ax-.9,ay+3.9);X.lineTo(ax-3.1,ay-2);X.closePath();X.fill();X.restore()}X.restore()}
function hbIcoPause(x,y,on){X.save();X.translate(x,y);X.fillStyle='#f4e2bc';if(on){X.beginPath();X.moveTo(-4,-7.5);X.lineTo(8,0);X.lineTo(-4,7.5);X.closePath();X.fill()}else{hbRR(-6.5,-7.5,4.6,15,1.5);X.fill();hbRR(1.9,-7.5,4.6,15,1.5);X.fill()}X.restore()}
function hbIcoSound(x,y,mute){X.save();X.translate(x,y);X.fillStyle='#f4e2bc';X.beginPath();X.moveTo(-9,-3.6);X.lineTo(-4.6,-3.6);X.lineTo(1,-8.6);X.lineTo(1,8.6);X.lineTo(-4.6,3.6);X.lineTo(-9,3.6);X.closePath();X.fill();
 X.lineCap='round';if(mute){X.strokeStyle='#ff7a5a';X.lineWidth=2.6;X.beginPath();X.moveTo(4,-4.5);X.lineTo(10,4.5);X.moveTo(10,-4.5);X.lineTo(4,4.5);X.stroke()}
 else{X.strokeStyle='#f4e2bc';X.lineWidth=2;const pu=.5+.5*Math.sin(hbNow()*.006);X.beginPath();X.arc(1.5,0,5,-.9,.9);X.stroke();X.globalAlpha=.55+.45*pu;X.beginPath();X.arc(1.5,0,9,-.85,.85);X.stroke()}X.restore()}
/* mince s hvězdou (měna hry = hvězdy) */
function hbCoin(x,y,r,spin){X.save();X.translate(x,y);const sx=Math.max(.15,Math.abs(Math.cos(spin||0)));X.scale(sx,1);
 X.fillStyle='#5a3606';X.beginPath();X.arc(0,1.2,r+1.4,0,7);X.fill();const g=X.createRadialGradient(-r*.35,-r*.4,1,0,0,r);g.addColorStop(0,'#fff1a8');g.addColorStop(.55,'#f2c23a');g.addColorStop(1,'#b07a12');X.fillStyle=g;X.beginPath();X.arc(0,0,r,0,7);X.fill();
 X.strokeStyle='rgba(120,70,8,.8)';X.lineWidth=1.2;X.beginPath();X.arc(0,0,r*.74,0,7);X.stroke();X.fillStyle='#a8700e';X.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr2=i%2?r*.28:r*.62;X.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2)}X.closePath();X.fill();
 X.fillStyle='rgba(255,255,255,.55)';X.beginPath();X.ellipse(-r*.35,-r*.42,r*.3,r*.16,-.5,0,7);X.fill();X.restore()}
/* ---------- ikony zbraní ---------- */
function hbFist(){const P=new Path2D();P.moveTo(-9,-6);P.quadraticCurveTo(-8,-12,0,-11.5);P.quadraticCurveTo(10,-12,11,-4);P.quadraticCurveTo(12,5,6,9);P.lineTo(-6,9.5);P.quadraticCurveTo(-11,6,-9,-6);P.closePath();
 X.fillStyle='#1d3a12';X.save();X.translate(.8,1.2);X.fill(P);X.restore();const g=X.createLinearGradient(-8,-12,8,10);g.addColorStop(0,'#9ae070');g.addColorStop(1,'#3f8a26');X.fillStyle=g;X.fill(P);X.strokeStyle='#14280c';X.lineWidth=1.6;X.stroke(P);
 X.strokeStyle='rgba(20,50,12,.75)';X.lineWidth=1.2;[[-4,-11],[1,-11.5],[6,-10.5]].forEach(([x,y])=>{X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+.6,y+4,x-.2,y+7);X.stroke()});
 X.strokeStyle='#f4f0d0';X.lineWidth=1;[[-9,-1,-12,-2],[10,1,13,0],[-2,-11.5,-2.5,-14.5],[5,-11,6,-14]].forEach(([a,b,c,d])=>{X.beginPath();X.moveTo(a,b);X.lineTo(c,d);X.stroke()})}
function hbWIcoRaw(k){X.save();X.lineJoin='round';X.lineCap='round';
 try{if(k=='cls0'){X.rotate(-.75);X.scale(2.3,2.3);hWpn(0,0,0,0,1)}
 else if(k=='cls2'){X.rotate(-.75);X.scale(1.42,1.42);hWpn(2,0,0,0,1)}
 else if(k=='cls3'){X.rotate(-.78);X.lineCap='round';X.strokeStyle='#0e0a0c';X.lineWidth=7;X.beginPath();X.moveTo(-14,0);X.lineTo(17,0);X.stroke();X.strokeStyle='#3c3038';X.lineWidth=4.2;X.beginPath();X.moveTo(-14,0);X.lineTo(17,0);X.stroke();X.strokeStyle='rgba(255,255,255,.35)';X.lineWidth=1.2;X.beginPath();X.moveTo(-12,-1.1);X.lineTo(15,-1.1);X.stroke();
  X.fillStyle='#0e0a0c';X.fillRect(14.5,-3.4,5.5,6.8);X.fillStyle='#c8ccd2';X.fillRect(15.3,-2.6,4,5.2);const kg=X.createRadialGradient(-17.5,-2,1,-16,0,6);kg.addColorStop(0,'#fff0b0');kg.addColorStop(.6,'#d9b25a');kg.addColorStop(1,'#7a5a1a');X.fillStyle='#2a1a06';X.beginPath();X.arc(-16,0,6.4,0,7);X.fill();X.fillStyle=kg;X.beginPath();X.arc(-16,0,5,0,7);X.fill()}
 else if(k=='cls1')hbFist();
 else{X.rotate(k=='lasso'?0:-.6);wp(k,0,0,0,T)}}catch(err){}X.restore()}
/* automatické vystředění a zmenšení ikony do kruhu (změřeno jednou z pixelů) */
const HBFIT={};
function hbFit(k){if(HBFIT[k])return HBFIT[k];const c=document.createElement('canvas');c.width=c.height=240;const g=c.getContext('2d'),X0=X;X=g;try{X.translate(120,120);X.scale(2,2);hbWIcoRaw(k)}catch(err){}finally{X=X0}
 let x0=240,y0=240,x1=0,y1=0;try{const d=g.getImageData(0,0,240,240).data;for(let y=0;y<240;y++)for(let x=0;x<240;x++)if(d[(y*240+x)*4+3]>30){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}catch(err){}
 if(x1<=x0)return HBFIT[k]={s:1,dx:0,dy:0};const w=(x1-x0)/2,h=(y1-y0)/2,cx=((x0+x1)/2-120)/2,cy=((y0+y1)/2-120)/2,m=k=='cls1'?26:Math.hypot(w,h)>40?33:30;return HBFIT[k]={s:m/Math.max(w,h),dx:-cx,dy:-cy}}
function hbWIco(k,s){const f=hbFit(k);X.save();X.scale(s*f.s,s*f.s);X.translate(f.dx,f.dy);hbWIcoRaw(k);X.restore()}
/* rozlomená zbraň (dvě půlky po trhlině) */
const HBCR=[[-40,-40],[-1,-24],[3,-13],[-3,-4],[4,5],[-2,14],[2,24],[-40,40]];
function hbHalf(k,s,side,dx,dy,rot,al){X.save();X.translate(dx,dy);X.rotate(rot);X.globalAlpha*=al;X.beginPath();HBCR.forEach(([x,y],i)=>{const xx=side<0?x:(i==0||i==7?-x:x);i?X.lineTo(xx,y):X.moveTo(xx,y)});X.closePath();X.clip();hbWIco(k,s);X.restore()}
/* ---------- zdraví, životy ---------- */
function hbHealth(x,y,w,h){const v=Math.max(0,Math.min(1,HB.hpV)),tr=Math.max(v,Math.min(1,HB.trail)),now=hbNow(),low=v<.3&&p.hp>0;
 X.fillStyle='#2b180a';hbRR(x-2.5,y-2.5,w+5,h+5,(h+5)/2);X.fill();X.fillStyle='#173012';hbRR(x,y,w,h,h/2);X.fill();
 X.save();hbRR(x,y,w,h,h/2);X.clip();
 X.fillStyle='rgba(0,0,0,.35)';X.fillRect(x,y,w,3);
 if(tr>v){X.fillStyle=HB.trD>0?'#fff6d0':'#f0c060';X.fillRect(x,y,w*tr,h)}
 const pu=low?.5+.5*Math.sin(now*.012):0,g=X.createLinearGradient(0,y,0,y+h);
 if(low){g.addColorStop(0,hbMix('#ffb070','#ffe0a0',pu));g.addColorStop(.5,'#e8582e');g.addColorStop(1,'#9a2414')}else{g.addColorStop(0,'#c4f586');g.addColorStop(.5,'#73d040');g.addColorStop(1,'#3b8a22')}
 X.fillStyle=g;X.fillRect(x,y,w*v,h);X.fillStyle='rgba(255,255,255,.38)';X.fillRect(x+2,y+1.5,Math.max(0,w*v-4),h*.28);
 /* lesklý přejezd při doplnění nového života */if(HB.lifeT>0&&HB.lifeT<52){const u=1-(HB.lifeT/52),sx=x+w*u;const sg=X.createLinearGradient(sx-40,0,sx+10,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.8,'rgba(255,255,230,.85)');sg.addColorStop(1,'rgba(255,255,255,0)');X.fillStyle=sg;X.fillRect(sx-40,y,50,h)}
 const n=Math.max(1,Math.round(p.mx));X.fillStyle='rgba(12,34,8,.45)';for(let i=1;i<n;i++)X.fillRect(x+w*i/n-1,y+2,2,h-4);
 X.restore();X.strokeStyle=low?'rgba(255,120,90,'+(.4+.5*pu)+')':'rgba(255,240,200,.3)';X.lineWidth=1.2;hbRR(x+.5,y+.5,w-1,h-1,h/2);X.stroke()}
function hbLives(x,y){const n=Math.max(0,p.lives|0),lt=HB.lifeT,col=n<=1?'#a8200e':'#3a2210';
 hbTxt('×',x,y,"700 17px Georgia",'#3a2210');
 if(lt>40){const u=(lt-40)/40;X.save();X.globalAlpha=u;X.translate(x+16,y-(1-u)*22);hbTxt(String(n+1),0,0,"22px 'Rye',Georgia",'#a8200e');X.restore();
  X.save();const k=1+.7*u;X.translate(x+16,y);X.scale(k,k);X.globalAlpha=1-u*.7;hbTxt(String(n),0,0,"22px 'Rye',Georgia",col);X.restore()}
 else{const sh=lt>0?Math.sin(lt*.9)*2*(lt/40):0;hbTxt(String(n),x+16+sh,y,"22px 'Rye',Georgia",col,null,2)}
 /* srdíčka životů vedle čísla */for(let i=0;i<5;i++){const on=i<n,hx=x+44+i*13,hy=y-7,pu=!on&&lt>40&&i==n?(lt-40)/40:0;X.save();X.translate(hx,hy-pu*10);X.globalAlpha=on?1:.32+pu*.6;X.scale(.62,.62);heart(0,0,9,on?'#d3322b':pu>0?'#d3322b':'#6a4a30');X.restore()}}
/* ---------- portrét ---------- */
const PRT={cv:null,key:'',on:0,fo:null,blink:0,last:-99,OY:[0,-6,2,16]};
{const _f=hFaceT;hFaceT=function(s,C,o){if(PRT.on&&PRT.fo)o=Object.assign({dead:0,hurt:0,angry:0,focus:0,up:0,fall:0,sleepy:0,squint:0},PRT.fo);const F=_f(s,C,o);if(PRT.on&&PRT.blink&&!F.x&&!F.sq)F.lu=F.lu.map(()=>.92);return F}}
function prtMood(){if(!p)return'n';const st=state;
 if(p.dead||st=='over')return'dead';if(HB.lifeT>0)return'dizzy';if(p.ht>0)return'hurt';if(HB.brkT>0)return'shock';
 if(!p.on&&(p.vz||0)<-9)return'fall';if(typeof LTN!='undefined'&&LTN>18)return'shock';if(HB.coinT>0)return'happy';
 if(p.pt>0||p.aim>0||p.ak>0||p.th>0||(bossE&&bossE.st!='dead'&&Math.abs(bossE.x-p.x)<900))return'angry';
 if(p.hid||p.dis)return'sneak';if(p.hp/p.mx<.3||p.lives<=1)return'worried';if(HB.idle>900)return'sleepy';
 if(HB.alert>=3)return'angry';if(HB.alert>=1)return'focus';return'n'}
const PRTFO={n:{},dead:{dead:1},dizzy:{hurt:1},hurt:{hurt:1},shock:{fall:1},fall:{fall:1},happy:{up:1},angry:{angry:1},sneak:{focus:1,squint:.55},worried:{up:1},sleepy:{sleepy:1},focus:{focus:1}};
function prtRender(C,mood){if(!PRT.cv){PRT.cv=document.createElement('canvas');PRT.cv.width=PRT.cv.height=128}const g=PRT.cv.getContext('2d');g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.clearRect(0,0,128,128);
 const X0=X,cam0=cam,fx0=SV.fx;X=g;PRT.on=1;PRT.fo=PRTFO[mood]||{};try{SV.fx=0;heroAt(C,60,78+77*2.95+PRT.OY[C],2.95,{t:T,face:1})}catch(err){}finally{X=X0;cam=cam0;SV.fx=fx0;PRT.on=0}}
function hbPortrait(x,y,s){const C=SV.cls,mood=prtMood(),now=hbNow();HB.mood=mood;
 const blink=mood!='dead'&&mood!='sleepy'&&((now/1000)%3.7)<.12?1:0;PRT.blink=blink;
 const key=C+mood+blink;if(key!=PRT.key||T-PRT.last>=5||T<PRT.last){PRT.key=key;PRT.last=T;prtRender(C,mood)}
 const sh=mood=='hurt'?Math.sin(now*.09)*2.2:mood=='dizzy'?Math.sin(now*.02)*1.4:0;
 X.save();X.translate(x+s/2+sh,y+s/2);const hs=s/2;
 /* rám */X.fillStyle='rgba(30,14,4,.45)';hbRR(-hs+2,-hs+3,s,s,10);X.fill();X.fillStyle='#2e1a0a';hbRR(-hs-3,-hs-3,s+6,s+6,12);X.fill();
 const low=(p.hp/p.mx<.3||p.lives<=1)&&mood!='dead',pu=.5+.5*Math.sin(now*.01);X.strokeStyle=mood=='hurt'?'#ff6a4a':low?hbMix('#c9a46a','#ff5a3a',pu):'#c9a46a';X.lineWidth=2.4;hbRR(-hs-1.4,-hs-1.4,s+2.8,s+2.8,11);X.stroke();
 X.save();hbRR(-hs,-hs,s,s,9);X.clip();
 /* pozadí podle úrovně */const sk=lv&&lv.sky||['#203040','#405060'],bg=X.createLinearGradient(0,-hs,0,hs);bg.addColorStop(0,sk[0]);bg.addColorStop(1,sk[1]||sk[0]);X.fillStyle=bg;X.fillRect(-hs,-hs,s,s);
 const env=hbEnv();if(env.glow){const gl=X.createRadialGradient(0,hs*.6,2,0,hs*.6,s);gl.addColorStop(0,env.glow);gl.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gl;X.fillRect(-hs,-hs,s,s)}
 X.drawImage(PRT.cv,-hs,-hs,s,s);
 if(mood=='dead'){X.globalCompositeOperation='saturation';X.fillStyle='#808080';X.fillRect(-hs,-hs,s,s);X.globalCompositeOperation='source-over';X.fillStyle='rgba(60,0,0,.25)';X.fillRect(-hs,-hs,s,s)}
 hbEnvFx(env,hs,now);hbMoodFx(mood,hs,now);
 if(HB.hitT>0){X.fillStyle='rgba(255,40,20,'+(HB.hitT/18*.5)+')';X.fillRect(-hs,-hs,s,s)}
 /* sklo */const gg=X.createLinearGradient(-hs,-hs,hs*.2,hs*.2);gg.addColorStop(0,'rgba(255,255,255,.22)');gg.addColorStop(.45,'rgba(255,255,255,0)');X.fillStyle=gg;X.fillRect(-hs,-hs,s,s);
 X.restore();X.strokeStyle='rgba(10,4,0,.9)';X.lineWidth=1.2;hbRR(-hs,-hs,s,s,9);X.stroke();X.restore()}
/* prostředí: déšť, horko, tma, bažina, moře, vlak, mlha, blesk */
function hbEnv(){const k=lv&&lv.k,r={};if(k=='port'||k=='fort'||(WX&&WX.rain>.1))r.rain=k=='fort'?1.3:1;if(k=='steppe')r.heat=1;if(k=='mine')r.dark=1,r.glow='rgba(255,170,80,.45)';if(k=='swamp')r.swamp=1;if(k=='sea'||k=='levi')r.sea=1;if(k=='train')r.speed=1;
 if(WX&&WX.chip&&WX.chip[0]=='MLHA')r.fog=1;if(typeof LTN!='undefined'&&LTN>0)r.flash=LTN;if(k=='port')r.glow='rgba(255,210,140,.18)';return r}
function hbEnvFx(E,hs,now){const t=now/1000;X.save();
 if(E.dark){const v=X.createRadialGradient(0,hs*.2,hs*.3,0,0,hs*1.4);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(8,4,0,.72)');X.fillStyle=v;X.fillRect(-hs,-hs,hs*2,hs*2)}
 if(E.heat){X.fillStyle='rgba(255,140,40,.12)';X.fillRect(-hs,-hs,hs*2,hs*2);X.strokeStyle='rgba(255,230,180,.28)';X.lineWidth=1.2;for(let i=0;i<3;i++){const yy=-hs+8+i*9+((t*14)%9);X.beginPath();for(let xx=-hs;xx<=hs;xx+=4)X.lineTo(xx,yy+Math.sin(xx*.3+t*6+i)*1.4);X.stroke()}
  const d=(t*.6)%1;if(d<.8){X.fillStyle='rgba(200,235,255,.9)';X.beginPath();X.ellipse(hs*.42,-hs*.2+d*hs*.9,2,3,0,0,7);X.fill()}}
 if(E.rain){X.strokeStyle='rgba(200,220,255,.55)';X.lineWidth=1;for(let i=0;i<9*E.rain;i++){const xx=((i*37+t*90)%(hs*2.6))-hs*1.3,yy=((i*53+t*260)%(hs*2.4))-hs*1.2;X.beginPath();X.moveTo(xx,yy);X.lineTo(xx-3,yy+9);X.stroke()}
  for(let i=0;i<4;i++){const u=((t*.25+i*.27)%1),xx=-hs+8+((i*29)%(hs*2-14)),yy=-hs+u*hs*2.2;X.fillStyle='rgba(220,235,255,.5)';X.beginPath();X.ellipse(xx,yy,1.6,2.4,0,0,7);X.fill();X.fillStyle='rgba(220,235,255,.18)';X.fillRect(xx-.8,yy-12*u,1.6,12*u)}}
 if(E.swamp){X.fillStyle='rgba(90,140,60,.16)';X.fillRect(-hs,-hs,hs*2,hs*2);const a=t*3.1,fx=Math.cos(a)*hs*.62,fy=-hs*.3+Math.sin(a*1.7)*hs*.35;X.fillStyle='#1a1a12';X.beginPath();X.arc(fx,fy,1.8,0,7);X.fill();X.fillStyle='rgba(230,240,255,.7)';X.beginPath();X.ellipse(fx-1.5,fy-2,1.6,.9,Math.sin(t*60),0,7);X.ellipse(fx+1.5,fy-2,1.6,.9,-Math.sin(t*60),0,7);X.fill()}
 if(E.sea){X.strokeStyle='rgba(255,255,255,.35)';X.lineWidth=1;for(let i=0;i<3;i++){const yy=-hs*.5+i*hs*.45,xx=((t*80+i*40)%(hs*3))-hs*1.5;X.beginPath();X.moveTo(xx,yy);X.lineTo(xx-14,yy);X.stroke()}for(let i=0;i<5;i++){const u=(t*.9+i*.21)%1;X.fillStyle='rgba(230,245,255,'+(.6*(1-u))+')';X.beginPath();X.arc(-hs+u*hs*2,hs*.7-Math.sin(u*Math.PI)*hs*.8,1.4,0,7);X.fill()}}
 if(E.speed){X.strokeStyle='rgba(255,255,255,.3)';X.lineWidth=1;for(let i=0;i<5;i++){const yy=-hs+6+i*11,xx=hs-((t*300+i*47)%(hs*3));X.beginPath();X.moveTo(xx,yy);X.lineTo(xx+18,yy);X.stroke()}}
 if(E.fog){X.fillStyle='rgba(220,230,235,.25)';X.fillRect(-hs,-hs,hs*2,hs*2)}
 if(E.flash){X.fillStyle='rgba(235,240,255,'+Math.min(.6,E.flash/26*.7)+')';X.fillRect(-hs,-hs,hs*2,hs*2)}
 X.restore()}
function hbMoodFx(m,hs,now){const t=now/1000;X.save();X.textAlign='center';
 if(m=='dizzy'){for(let i=0;i<3;i++){const a=t*5+i*2.1;X.save();X.translate(Math.cos(a)*hs*.55,-hs*.62+Math.sin(a)*hs*.16);X.rotate(a);hbStar(0,0,4.2,'#ffe28a');X.restore()}}
 if(m=='worried'||m=='hurt'&&p.hp/p.mx<.3){const u=(t*.7)%1;X.fillStyle='rgba(190,230,255,.95)';X.strokeStyle='rgba(40,80,120,.8)';X.lineWidth=.8;X.beginPath();const sx=hs*.48,sy=-hs*.38+u*hs*.5;X.moveTo(sx,sy-4);X.quadraticCurveTo(sx+3.4,sy+1,sx,sy+3);X.quadraticCurveTo(sx-3.4,sy+1,sx,sy-4);X.fill();X.stroke()}
 if(m=='sleepy'){for(let i=0;i<3;i++){const u=((t*.45)+i/3)%1;X.globalAlpha=Math.sin(u*Math.PI);X.font='700 '+(7+u*6)+'px Georgia';X.fillStyle='#f4e2bc';X.fillText('z',hs*.25+u*hs*.5,-hs*.2-u*hs*.6)}X.globalAlpha=1}
 if(m=='happy'){for(let i=0;i<4;i++){const u=((t*1.6)+i/4)%1,a=i*1.6;X.globalAlpha=Math.sin(u*Math.PI);hbStar(Math.cos(a)*hs*.7,Math.sin(a)*hs*.55-4,2.5+u*2,'#fff2a0')}X.globalAlpha=1}
 if(m=='angry'&&bossE&&bossE.st!='dead'){const pu=.5+.5*Math.sin(t*8);X.strokeStyle='rgba(220,40,20,'+(.5+.4*pu)+')';X.lineWidth=1.8;const vx=hs*.55,vy=-hs*.6;for(let i=0;i<4;i++){const a=i*Math.PI/2+.78;X.beginPath();X.moveTo(vx+Math.cos(a)*1.5,vy+Math.sin(a)*1.5);X.quadraticCurveTo(vx+Math.cos(a+.4)*4,vy+Math.sin(a+.4)*4,vx+Math.cos(a)*5.5,vy+Math.sin(a)*5.5);X.stroke()}}
 if(m=='sneak'){const v=X.createRadialGradient(0,0,hs*.4,0,0,hs*1.3);v.addColorStop(0,'rgba(10,20,40,0)');v.addColorStop(1,'rgba(10,20,40,.6)');X.fillStyle=v;X.fillRect(-hs,-hs,hs*2,hs*2)}
 if(m=='shock'){X.font="700 16px 'Rye',Georgia";X.lineWidth=3;X.strokeStyle='#2a1406';X.strokeText('!',hs*.6,-hs*.35);X.fillStyle='#ffe28a';X.fillText('!',hs*.6,-hs*.35)}
 X.restore()}
function hbStar(x,y,r,c){X.fillStyle=c;X.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.42:r;X.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}X.closePath();X.fill()}
/* ---------- zbraň ---------- */
function hbWslot(){if(p.w)return{k:p.w,name:WNC[p.w]||p.w,v:p.wu/((WP[p.w]&&WP[p.w].u)||1),n:p.wu,mx:(WP[p.w]&&WP[p.w].u)||1};const C=SV.cls;
 if(!CDUR[C])return{k:'cls1',name:CWN[1],v:1,inf:1};if(p.cbrk)return{k:'cls'+C,name:CWN[C],v:0,brk:1,rep:p.crep/CREP};return{k:'cls'+C,name:CWN[C],v:p.cdur/CDUR[C],n:Math.ceil(p.cdur),mx:CDUR[C]}}
function hbWeapon(y0){const S=hbWslot(),now=hbNow(),bx=500,bw=212,by=y0+29,bh=13,cx=740,cy=y0+27,low=!S.inf&&!S.brk&&S.v<.25;
 if(S.k!=HB.wKey){if(HB.wKey)HB.swapT=14;HB.wKey=S.k}
 /* název */const nm=S.brk?S.name+' – zlomený':S.name;hbTxt(nm,bx+bw-4,y0+21,"700 14px Georgia",S.brk?'#8a2010':'#3a2210','right',2);
 if(S.n!=null&&!S.inf&&!S.brk){hbTxt(S.n+'/'+S.mx,bx+2,y0+21,"700 11px Georgia",'rgba(58,34,16,.7)')}
 /* lišta výdrže */X.fillStyle='#1a1424';hbRR(bx-2.5,by-2.5,bw+5,bh+5,(bh+5)/2);X.fill();X.fillStyle='#14203a';hbRR(bx,by,bw,bh,bh/2);X.fill();
 X.save();hbRR(bx,by,bw,bh,bh/2);X.clip();X.fillStyle='rgba(0,0,0,.35)';X.fillRect(bx,by,bw,3);
 if(S.brk){const w=bw*S.rep;X.fillStyle='#5a1a0a';X.fillRect(bx,by,bw,bh);X.save();X.beginPath();X.rect(bx,by,w,bh);X.clip();for(let i=-2;i<bw/8+2;i++){X.fillStyle=i%2?'#e08a2a':'#c0601a';X.beginPath();const ox=((now*.03)%16);X.moveTo(bx+i*8+ox,by+bh);X.lineTo(bx+i*8+8+ox,by+bh);X.lineTo(bx+i*8+16+ox,by);X.lineTo(bx+i*8+8+ox,by);X.closePath();X.fill()}X.restore();
  hbTxt('oprava '+Math.floor(S.rep*100)+' %',bx+bw/2,by+bh-2.5,"700 10px Georgia",'#ffe8c0','center')}
 else{const pu=low?.5+.5*Math.sin(now*.014):0,g=X.createLinearGradient(0,by,0,by+bh);
  if(S.inf){g.addColorStop(0,'#ffe9a8');g.addColorStop(.5,'#d9a53a');g.addColorStop(1,'#8a5a14')}else if(low){g.addColorStop(0,hbMix('#ffc080','#ffe0b0',pu));g.addColorStop(.5,'#e06a2a');g.addColorStop(1,'#8a2a10')}else{g.addColorStop(0,'#b8e4ff');g.addColorStop(.5,'#4aa0e8');g.addColorStop(1,'#1d5aa0')}
  X.fillStyle=g;X.fillRect(bx,by,bw*S.v,bh);X.fillStyle='rgba(255,255,255,.4)';X.fillRect(bx+2,by+1.5,Math.max(0,bw*S.v-4),bh*.28);
  if(HB.wFlash>0){X.fillStyle='rgba(255,255,255,'+(HB.wFlash/10*.6)+')';X.fillRect(bx+bw*S.v-14,by,14,bh)}
  if(S.inf)hbTxt('∞',bx+bw/2,by+bh-1.5,"700 13px Georgia",'#4a2a06','center');
  if(!S.inf&&S.mx){const n=Math.min(12,S.mx);X.fillStyle='rgba(10,20,40,.35)';for(let i=1;i<n;i++)X.fillRect(bx+bw*i/n-.5,by+3,1,bh-6)}}
 X.restore();X.strokeStyle=low?'rgba(255,140,90,.8)':'rgba(210,230,255,.3)';X.lineWidth=1.2;hbRR(bx+.5,by+.5,bw-1,bh-1,bh/2);X.stroke();
 /* kruh s ikonou */X.save();X.translate(cx,cy);X.fillStyle='rgba(30,14,4,.4)';X.beginPath();X.arc(2,3,24,0,7);X.fill();X.fillStyle='#1a2236';X.beginPath();X.arc(0,0,24,0,7);X.fill();
 const ig=X.createRadialGradient(-6,-8,2,0,0,20);ig.addColorStop(0,'#fbf1da');ig.addColorStop(1,'#d8c49a');X.fillStyle=ig;X.beginPath();X.arc(0,0,19.5,0,7);X.fill();X.strokeStyle=S.brk?'#c0401a':low?hbMix('#7a9ac8','#ff6a3a',.5+.5*Math.sin(now*.014)):'#7a9ac8';X.lineWidth=2;X.beginPath();X.arc(0,0,21.7,0,7);X.stroke();
 X.save();X.beginPath();X.arc(0,0,19.5,0,7);X.clip();
 const B=HB.brk;if(B&&B.t<46){const u=B.t/46,e=1-(1-u)*(1-u),pre=B.t<6;const jx=pre?Math.sin(B.t*3)*1.6:0;
  if(pre)hbWIco(B.k,1);else if(B.k.startsWith('cls')){const v=Math.min(1,(B.t-6)/36),e2=1-(1-v)*(1-v),ov=Math.sin(v*Math.PI);X.save();X.filter='grayscale('+(.75*v).toFixed(2)+') brightness('+(1-.22*v).toFixed(2)+')';
   hbHalf(B.k,1,-1,-3*e2-7*ov,2*e2+3*ov,-.12*e2-.35*ov,1);hbHalf(B.k,1,1,3*e2+7*ov,3*e2+5*ov,.14*e2+.4*ov,1);X.restore();
   for(const s of B.sh){X.fillStyle=s.c;X.save();X.translate(s.x+s.vx*B.t*1.6,s.y+s.vy*B.t*1.6+.1*B.t*B.t);X.rotate(s.a+B.t*.3);X.fillRect(-s.s/2,-s.s/2,s.s,s.s*.6);X.restore()}
   X.strokeStyle='rgba(255,250,220,'+(1-v)+')';X.lineWidth=2;X.beginPath();HBCR.slice(1,7).forEach(([x,y],i)=>i?X.lineTo(x,y):X.moveTo(x,y));X.stroke()}
  else{hbHalf(B.k,1,-1,-16*e+jx,6*e+16*e*e,-.7*e,1-u*.8);hbHalf(B.k,1,1,15*e,4*e+18*e*e,.8*e,1-u*.8);
   for(const s of B.sh){X.fillStyle=s.c;X.save();X.translate(s.x+s.vx*B.t,s.y+s.vy*B.t+.12*B.t*B.t);X.rotate(s.a+B.t*.3);X.fillRect(-s.s/2,-s.s/2,s.s,s.s*.6);X.restore()}}}
 else if(S.brk){X.save();X.filter='grayscale(.75) brightness(.78)';hbHalf(S.k,1,-1,-3,2,-.12,1);hbHalf(S.k,1,1,3,3,.14,1);X.restore();
  X.strokeStyle='#e08a2a';X.lineWidth=3;X.lineCap='round';X.beginPath();X.arc(0,0,16,-Math.PI/2,-Math.PI/2+Math.PI*2*S.rep);X.stroke()}
 else{const sw=HB.swapT>0?HB.swapT/14:0;X.save();X.translate(0,sw*26);X.globalAlpha=1-sw;hbWIco(S.k,1);X.restore();
  if(!S.inf&&S.v<.25){X.strokeStyle='rgba(40,20,10,.8)';X.lineWidth=1.2;X.beginPath();X.moveTo(-3,-12);X.lineTo(1,-5);X.lineTo(-2,0);X.lineTo(3,7);X.stroke()}}
 X.restore();X.restore()}
/* ---------- celý pás ---------- */
function hbDraw(){HB.vis+=((hbShow()?1:0)-HB.vis)*.2;if(HB.vis<.01||!p||!lv)return;if(!HB.bg)hbBgBuild();
 X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.textBaseline='alphabetic';
 const y0=hbY0(),now=hbNow(),hv=k=>HB.hov==k&&now-HB.mt<4000;X.drawImage(HB.bg,0,y0-14);
 /* restart */{const b=HBB.restart,cf=HB.conf=='restart'&&HB.confT>0;hbCirc(b.x,y0+b.y,b.r,hv('restart'),0,cf);hbIcoRestart(b.x,y0+b.y,hv('restart')?1.08:1,hv('restart')?-((now*.004)%6.283):0)}
 /* mince a body */{const c=SV.st|0;if(HB.cntV==null)HB.cntV=c;if(c>HB.cntV)HB.cntV=Math.min(c,HB.cntV+Math.max(.2,(c-HB.cntV)*.15));else HB.cntV=c;
  const bo=HB.coinT>0?Math.sin((40-HB.coinT)*.35)*3*(HB.coinT/40):0;hbCoin(68,y0+19-Math.abs(bo),10,HB.coinT>0?(40-HB.coinT)*.32:0);
  hbTxt(String(Math.floor(HB.cntV)),84,y0+26,"19px 'Rye',Georgia",HB.coinT>0?'#8a5a06':'#3a2210',null,2);
  const sc=LS?LS.sc|0:0;HB.ptsV+=(sc-HB.ptsV)*.15;if(Math.abs(sc-HB.ptsV)<.5)HB.ptsV=sc;hbTxt('Body',58,y0+46,"700 11px Georgia",'#7a5226');hbTxt(String(Math.round(HB.ptsV)),90,y0+46,"700 13px Georgia",'#3a2210')}
 /* portrét, životy, zdraví */hbPortrait(184,y0-8,58);hbLives(254,y0+22);hbHealth(254,y0+30,222,13);
 /* zbraň */hbWeapon(y0);
 /* menu */{const b=HBB.menu,h=hv('menu'),cf=HB.conf=='menu'&&HB.confT>0;X.save();X.translate(b.x+b.w/2,y0+b.y+b.h/2);if(h)X.scale(1.05,1.05);X.fillStyle='rgba(30,14,4,.4)';hbRR(-b.w/2+1.5,-b.h/2+2.5,b.w,b.h,9);X.fill();
  const g=X.createLinearGradient(0,-b.h/2,0,b.h/2);g.addColorStop(0,cf?'#b0402a':h?'#7a5226':'#6a4222');g.addColorStop(1,cf?'#5a140a':'#2e1a0a');X.fillStyle=g;hbRR(-b.w/2,-b.h/2,b.w,b.h,9);X.fill();X.strokeStyle=cf?'#ffb08a':'#c9a46a';X.lineWidth=2;hbRR(-b.w/2+1.2,-b.h/2+1.2,b.w-2.4,b.h-2.4,8);X.stroke();
  X.fillStyle='rgba(255,240,210,.12)';hbRR(-b.w/2+4,-b.h/2+3,b.w-8,b.h*.38,6);X.fill();hbTxt('Menu',0,6,"16px 'Rye',Georgia",'#f4e2bc','center');X.restore()}
 /* pauza */{const b=HBB.pause,on=HB.pz;hbCirc(b.x,y0+b.y,b.r,hv('pause'),on);hbIcoPause(b.x,y0+b.y,on);
  if(on){const pu=.5+.5*Math.sin(now*.006);X.strokeStyle='rgba(255,210,120,'+(.3+.6*pu)+')';X.lineWidth=2;X.beginPath();X.arc(b.x,y0+b.y,b.r+4+pu*2,0,7);X.stroke()}}
 /* zvuk */{const b=HBB.sound;hbCirc(b.x,y0+b.y,b.r,hv('sound'),0,0);hbIcoSound(b.x+1,y0+b.y,!!SV.mute)}
 /* tichá pauza: jen nenápadný štítek, žádné menu */if(HB.pz){const pu=.6+.4*Math.sin(now*.005);X.globalAlpha=pu;X.fillStyle='rgba(20,10,4,.75)';hbRR(W-150,y0-30,140,22,11);X.fill();X.globalAlpha=1;hbTxt('ČAS STOJÍ  ·  H',W-80,y0-14,"700 12px Georgia",'#ffd27a','center')}
 /* bublina nápovědy */{let tip='',warn=0,bx2=0;const k=HB.hov&&now-HB.mt<4000?HB.hov:'';
  if(HB.confT>0&&HB.conf){tip=HB.conf=='restart'?'Klikni znovu = restart úrovně':'Klikni znovu = odejít do menu';warn=1;bx2=HB.conf=='restart'?HBB.restart.x:HBB.menu.x+HBB.menu.w/2}
  else if(k){tip={restart:'Restartovat úroveň',menu:'Hlavní menu',pause:HB.pz?'Pokračovat  [H]':'Zastavit čas  [H]',sound:SV.mute?'Zapnout zvuk  [M]':'Vypnout zvuk  [M]'}[k];const b=HBB[k];bx2=b.r?b.x:b.x+b.w/2}
  if(tip&&!(HB.pz&&k=='pause')){X.font='700 12px Georgia';const w=X.measureText(tip).width+18,x=Math.max(6,Math.min(W-w-6,bx2-w/2));X.fillStyle=warn?'rgba(110,20,8,.92)':'rgba(24,12,4,.88)';hbRR(x,y0-32,w,22,8);X.fill();X.strokeStyle=warn?'#ffb08a':'#c9a46a';X.lineWidth=1;hbRR(x+.5,y0-31.5,w-1,21,8);X.stroke();hbTxt(tip,x+w/2,y0-17,"700 12px Georgia",warn?'#ffe0d0':'#f4e2bc','center')}}
 X.restore()}
/* ---------- akce tlačítek ---------- */
function hbClick(k){if(k=='restart'||k=='menu'){if(HB.conf==k&&HB.confT>0){HB.conf='';HB.confT=0;hbPause(0);sfx('uiok');if(k=='restart'){start(li,false);state='play';lsInit()}else{state='menu';mn={s:0,sub:0}}}else{HB.conf=k;HB.confT=200;sfx('hbClick')}return}
 if(k=='pause'){hbPause(!HB.pz);return}if(k=='sound'){hbMute(!SV.mute)}}
function hbPause(on){on=!!on;if(on==!!HB.pz)return;if(on)sfx('hbClick');HB.pz=on?1:0;try{if(AU.ctx){if(on)AU.ctx.suspend();else if(!SV.mute)AU.ctx.resume()}}catch(err){}if(!on)setTimeout(()=>sfx('hbClick'),30)}
function hbMute(m){if(!m){SV.mute=0;saveSV();auInit();try{if(AU.ctx&&!HB.pz)AU.ctx.resume()}catch(err){}setTimeout(()=>sfx('hbClick'),40)}else{sfx('hbClick');SV.mute=1;saveSV();setTimeout(()=>{try{if(AU.ctx&&SV.mute)AU.ctx.suspend()}catch(err){}},60)}}
function hbAudioGuard(){try{if(AU.ctx&&(SV.mute||HB.pz)){AU.ctx.suspend();if(!HB.ag){HB.ag=1;setTimeout(()=>{HB.ag=0;if(AU.ctx&&(SV.mute||HB.pz))AU.ctx.suspend()},70)}}}catch(err){}}
{const _ak=auKick;auKick=function(){if(SV.mute||HB.pz){auInit();return}_ak()}}
addEventListener('pointerdown',hbAudioGuard);addEventListener('keydown',hbAudioGuard);
/* myš: klik na pás má přednost */
{const _mh=mh;mh=function(e,c){if(hbShow()&&state!='pause'){const r=C.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W,y=(e.clientY-r.top)/r.height*H;HB.mx=x;HB.my=y;HB.mt=hbNow();const k=hbHit(x,y);if(k!=HB.hov&&k)sfx('ui');HB.hov=k;C.style.cursor=k?'pointer':'';if(c&&k){hbClick(k);return}}else if(C.style.cursor)C.style.cursor='';return _mh(e,c)}}
/* dotyk: klepnutí na tlačítko pásu se nepředá ovládání */
addEventListener('touchstart',ev=>{if(!hbShow()||state=='pause')return;const r=C.getBoundingClientRect();for(const t of ev.changedTouches){const x=(t.clientX-r.left)/r.width*W,y=(t.clientY-r.top)/r.height*H,k=hbHit(x,y);if(k){ev.preventDefault();ev.stopPropagation();hbClick(k);return}}},{capture:true,passive:false});
/* dotykové ovládání posunout nad pás */try{if(!HB.tsh){HB.tsh=1;TBT.forEach(b=>{if(b.a!='pause')b.y-=46});TJS.y-=46}}catch(err){}
/* ---------- životy: zásah ubírá z lišty, prázdná lišta = −1 život ---------- */
function hbLifeLost(){p.lives=Math.max(0,(p.lives|0)-1);p.hp=p.mx;p.inv=Math.max(p.inv||0,150);HB.lifeT=80;HB.hpV=0;HB.trail=0;HB.trD=0;
 SLO=Math.max(SLO||0,380);shake=Math.max(shake,12);sfx('hbLife');pop(p.x,LY,p.z+150,'−1 ŽIVOT','#ff8a6a');try{ring(p.x,LY,70,'rgba(255,120,90,.7)',18,p.z+50)}catch(err){}
 for(let i=0;i<14;i++)par.push({x:p.x+R(-20,20),y:LY,z:p.z+R(30,90),vx:R(-3,3),vz:R(2,6),l:R(26,40),c:i%2?'#ff8a6a':'#ffe28a',s:R(2,4)})}
function hbDie(fall){p.lives=0;sfx('die');p.dead=1;p.dt=0;p.vz=fall?0:6;state='over'}
{const _h=hurtP;hurtP=function(d,dir){if(!p||p.dead||state!='play'||!HB.on)return _h.apply(this,arguments);const h0=p.hp;p.hp+=1000;let r;try{r=_h.apply(this,arguments)}finally{p.hp-=1000}
 if(p.hp<h0){HB.hitT=18;HB.trD=26}if(p.hp<=0&&!p.dead){if((p.lives|0)>1)hbLifeLost();else hbDie(0)}return r}}
{const _f=fallP;fallP=function(){if(!p||p.dead||state!='play'||!HB.on)return _f.apply(this,arguments);const h0=p.hp;p.hp+=1000;let r;try{r=_f.apply(this,arguments)}finally{p.hp-=1000}
 if(p.hp<h0){HB.hitT=18;HB.trD=26}if(p.hp<=0&&!p.dead){if((p.lives|0)>1)hbLifeLost();else hbDie(1)}return r}}
/* ---------- výdrž zbraní ---------- */
function hbWear(){const C=SV.cls,M=CDUR[C];if(!p||p.w||!M||p.cbrk)return;p.cdur=Math.max(0,(p.cdur==null?M:p.cdur)-(p.hv?2:1));HB.wFlash=10;if(p.cdur<=0){p.cbrk=1;p.crep=0;hbBreak('cls'+C)}}
function hbBreak(k){if(!p)return;const f=p.face||1,hx=p.x+f*36,hz=p.z+64,mat=HBMAT[k]||'m';
 sfx('hbSnap');sfx('break');shake=Math.max(shake,8);stop=Math.max(stop,5);pop(p.x,LY,p.z+140,HBRK[k]||'ZBRAŇ SE ROZBILA!','#ffb07a');
 const cols=mat=='w'?['#7a4a24','#a0703a','#4a2a10']:mat=='r'?['#d9bd85','#a88a52']:['#e2e6ea','#9aa2ac','#ffffff'];
 for(let i=0;i<16;i++)par.push({x:hx+R(-6,6),y:LY,z:hz+R(-6,6),vx:f*R(-1,4)+R(-2,2),vz:R(2,7),l:R(24,46),c:cols[i%cols.length],s:R(2,4.5)});
 if(mat=='m')for(let i=0;i<8;i++)par.push({x:hx,y:LY,z:hz,vx:R(-5,5),vz:R(1,6),l:R(8,14),c:'#fff6c8',s:2});
 /* dvě větší trosky padají na zem */for(let i=0;i<2;i++)HB.deb.push({x:hx,z:hz,vx:f*R(.8,3)*(i?1:-.5),vz:R(4.5,7.5),a:R(0,6),va:R(-.45,.45),k,side:i?1:-1,l:0,on:0});try{ring(hx,LY,26,'rgba(255,250,220,.9)',10,hz)}catch(err){}burst(hx,LY,hz,'#fff6c8');
 const sh=[];for(let i=0;i<10;i++)sh.push({x:R(-4,4),y:R(-8,8),vx:R(-1.4,1.4),vy:R(-1.6,.4),a:R(0,6),s:R(2,4),c:cols[i%cols.length]});HB.brk={k,t:0,sh};HB.brkT=60;
 if(SV.cls!=1&&k.startsWith('cls'))setTimeout(()=>{try{if(state=='play')say('Zbraň je zlomená – bojuješ pěstmi. Oprava za chvíli, nebo hned u vlajky.')}catch(err){}},500)}
function hbRepair(why){if(!p||!p.cbrk)return;p.cbrk=0;p.crep=0;p.cdur=CDUR[SV.cls];sfx('hbFix');pop(p.x,LY,p.z+140,why=='cp'?'SPRAVENO U VLAJKY!':(CWN[SV.cls]+' JE ZPÁTKY!').toUpperCase(),'#9fe0ff');
 for(let i=0;i<12;i++)par.push({x:p.x+p.face*30+R(-8,8),y:LY,z:p.z+60+R(-8,8),vx:R(-2,2),vz:R(1,4),l:R(18,30),c:i%2?'#9fe0ff':'#ffffff',s:2.5});HB.fixT=30}
/* trosky zbraně ve světě */
function hbDebUpd(){for(const d of HB.deb){d.l++;if(!d.on){d.x+=d.vx;d.z+=d.vz;d.vz-=.45;d.a+=d.va;const f=Math.max(-60,floorAt(d.x,d.z+10,8));if(d.z<=f){d.z=f;if(Math.abs(d.vz)>2.5){d.vz*=-.32;d.vx*=.5;d.va*=.5;sfx('clack')}else{d.on=1;d.vz=0}}}}HB.deb=HB.deb.filter(d=>d.l<150)}
function hbDebDraw(){for(const d of HB.deb){const x=d.x-cam,y=LY-d.z;if(x<-40||x>W+40)continue;X.save();X.globalAlpha=Math.min(1,(150-d.l)/30);X.translate(x,y-6);X.rotate(d.a);hbHalf(d.k,.95,d.side,0,0,0,1);X.restore()}}
{const _d=dFx;dFx=function(){_d();try{hbDebDraw()}catch(err){}}}
/* ---------- tik: pauza, klávesy, animace HUD, opravy ---------- */
const hbKeyFree=c=>{try{return!Object.values(SV.keys||{}).some(a=>Array.isArray(a)&&a.includes(c))}catch(err){return true}};
function hbTick(){if(!p)return;
 if(HB.confT>0&&--HB.confT==0)HB.conf='';if(HB.lifeT>0)HB.lifeT--;if(HB.hitT>0)HB.hitT--;if(HB.wFlash>0)HB.wFlash--;if(HB.swapT>0)HB.swapT--;if(HB.brkT>0)HB.brkT--;if(HB.coinT>0)HB.coinT--;
 if(HB.brk){HB.brk.t++;if(HB.brk.t>46)HB.brk=null}
 /* zdraví: rychlá lišta + opožděná stopa poškození */const v=p.mx?Math.max(0,p.hp/p.mx):0;
 if(HB.lifeT>0){const u=Math.max(0,Math.min(1,(52-HB.lifeT)/34));HB.hpV=u*v;HB.trail=HB.hpV}
 else{HB.hpV+=(v-HB.hpV)*.35;if(v>HB.trail)HB.trail=v;else if(HB.trD>0)HB.trD--;else HB.trail=Math.max(v,HB.trail-.014)}
 /* mince */if(HB.lastSt==null)HB.lastSt=SV.st;if(SV.st>HB.lastSt)HB.coinT=40;HB.lastSt=SV.st;
 /* nečinnost (pro ospalý portrét) */if(state=='play'&&Math.abs(p.vx)<.1&&p.on&&!p.pt&&!K.Space&&!Object.keys(K).some(k=>K[k]))HB.idle++;else HB.idle=0;
 /* poplach nepřátel */if(T%15==0){let lvl=0;for(const e of ens){if(!e.br||e.st=='dead'||Math.abs(e.x-p.x)>900)continue;if(e.st!='pat'&&e.st!='inv'&&e.st!='surr'&&e.st!='runoff')lvl=3;else if(e.st=='inv'&&lvl<1)lvl=1}HB.alert=lvl}
 /* oprava zlomené zbraně: časem, nebo hned u nové vlajky */if(p.cbrk&&state=='play'){p.crep=(p.crep||0)+1;if(p.crep>=CREP)hbRepair('t')}
 if(typeof CP!='undefined'&&CP!==HB.lastCP){const was=HB.lastCP;HB.lastCP=CP;if(was!==null&&CP&&p.cbrk)hbRepair('cp')}
 hbDebUpd()}
{const _u=upd;upd=function(){
 if(HB.pz){if(state!='play'||TR2){hbPause(0)}else{if(P.KeyH||P.Pause){hbPause(0)}else if(P.Escape){hbPause(0);return _u()}if(P.KeyM)hbMute(!SV.mute);return}}
 if(state=='play'&&!TR2&&HB.on&&((P.KeyH&&hbKeyFree('KeyH'))||P.Pause)){hbPause(1);return}
 if(HB.on&&!TR2&&(state=='play'||state=='over'||state=='poster')&&P.KeyM&&hbKeyFree('KeyM'))hbMute(!SV.mute);
 const r=_u();try{hbTick()}catch(err){}return r}}
/* ---------- start úrovně: 5 životů, nová zbraň třídy ---------- */
{const _s=start;start=function(i,arr){const r=_s.apply(this,arguments);try{if(p){p.lives=5;p.cdur=CDUR[SV.cls]||0;p.cbrk=0;p.crep=0}HB.pz=0;HB.hpV=HB.trail=1;HB.lifeT=0;HB.brk=null;HB.deb=[];HB.conf='';HB.lastCP=typeof CP!='undefined'?CP:null;HB.cntV=null;HB.lastSt=null;HB.idle=0}catch(err){}return r}}
/* ---------- kreslení: pás navrch HUD, čipy a ukazatel postupu nad něj ---------- */
{const _hd=hud;hud=function(){_hd();try{hbDraw()}catch(err){console.error('hb',err)}}}
{const _wc=wxChip;wxChip=function(){const o=HB.on?HB.H*HB.vis-16:0;if(o>0){X.save();X.translate(0,-o);try{_wc()}finally{X.restore()}}else _wc()}}
{const _es=euiStatus;euiStatus=function(){const o=HB.on?HB.H*HB.vis-16:0;if(o>0){X.save();X.translate(0,-o);try{_es()}finally{X.restore()}}else _es()}}
/* stav ztlumení se pamatuje */try{if(SV.mute)setTimeout(()=>{try{if(AU.ctx)AU.ctx.suspend()}catch(e){}},100)}catch(err){}
