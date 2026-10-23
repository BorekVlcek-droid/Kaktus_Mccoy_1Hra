/* =====================================================================
   v74: NOVÉ HLAVNÍ MENU
   živá malovaná krajina při západu slunce (pomalý průlet kamery), hrdina
   u ohně na skále, rozcestník se šipkovými cedulemi, karta s náhledem,
   nové nastavení s přepínači a posuvníky, výběr oblasti = mapa
   ===================================================================== */
const M3={t:0,lt:-99,hov:-1,sw:{},fire:0,fireI:-1,tw:null,twT:300,sp:[],dust:[],ss:null,ssT:200,lastS:-1,bump:0};
function m3Ease(u){u=Math.max(0,Math.min(1,u));return 1-Math.pow(1-u,3)}
function m3Back(u){u=Math.max(0,Math.min(1,u));const c=1.7;return 1+(c+1)*Math.pow(u-1,3)+c*Math.pow(u-1,2)}
/* ---------- scéna: malovaná step, popředí, oheň, hrdina ---------- */
function m3Scene(t){const lv0=lv,li0=li,c0=cam,cz0=camZ;lv=LVK('steppe');li=LVI('steppe');
 try{if(PB.k!=='steppe'||!PB.ok)pbBuild();cam=900+t*.32+(MX-W/2)*.04;camZ=0;X.save();X.translate(-(MX-W/2)*.012,-(MY-H/2)*.01);if(PB.ok)pbDraw();else{X.fillStyle='#3a1a3a';X.fillRect(0,0,W,H)}X.restore()}catch(err){X.fillStyle='#3a1a3a';X.fillRect(0,0,W,H)}
 cam=c0;camZ=cz0;lv=lv0;li=li0;
 /* padající hvězda */if(--M3.ssT<=0){M3.ss={x:R0(200,W),y:R0(20,120),l:40};M3.ssT=R0(400,900)}if(M3.ss){const s=M3.ss,k=s.l/40;X.save();X.strokeStyle='rgba(255,245,220,'+k+')';X.lineWidth=2;X.lineCap='round';X.beginPath();X.moveTo(s.x,s.y);X.lineTo(s.x+26,s.y-10);X.stroke();X.restore();s.x-=6;s.y+=2.3;if(--s.l<=0)M3.ss=null}
 /* supi kroužící nad městem */for(let i=0;i<2;i++){const a=T*.006+i*2.6,bx=470+i*90+Math.cos(a)*(110-i*30),by=96+i*30+Math.sin(a)*22,fl=Math.sin(T*.16+i*2),dir=-Math.sin(a)>0?1:-1;X.save();X.translate(bx,by);X.scale(dir*(1-i*.25),1-i*.25);X.fillStyle='rgba(40,14,30,.75)';X.beginPath();X.moveTo(-16,-fl*6);X.quadraticCurveTo(-8,-4-fl*3,0,0);X.quadraticCurveTo(8,-4-fl*3,16,-fl*6);X.quadraticCurveTo(8,1,0,3);X.quadraticCurveTo(-8,1,-16,-fl*6);X.fill();X.beginPath();X.ellipse(2,1,5,2,0,0,7);X.fill();X.restore()}
 /* popředí: poušť, skála s hrdinou */const px=(MX-W/2)*.03;X.save();X.translate(-px,0);
 const fg=X.createLinearGradient(0,400,0,H);fg.addColorStop(0,'#5a2c2a');fg.addColorStop(.3,'#3a1a20');fg.addColorStop(1,'#1a0c12');X.fillStyle=fg;X.beginPath();X.moveTo(-40,H);X.lineTo(-40,430);for(let x=-40;x<=W+80;x+=40)X.lineTo(x,422+Math.sin(x*.013)*8+Math.sin(x*.037)*4);X.lineTo(W+80,H);X.closePath();X.fill();
 X.strokeStyle='rgba(255,170,110,.35)';X.lineWidth=2;X.beginPath();for(let x=-40;x<=W+80;x+=40)X.lineTo(x,422+Math.sin(x*.013)*8+Math.sin(x*.037)*4);X.stroke();
 /* skála */const rk=new Path2D();rk.moveTo(560,H+10);rk.lineTo(574,470);rk.quadraticCurveTo(600,440,650,446);rk.lineTo(700,438);rk.quadraticCurveTo(760,432,812,444);rk.lineTo(850,452);rk.quadraticCurveTo(880,470,890,H+10);rk.closePath();X.fillStyle='#2a1418';X.fill(rk);X.save();X.clip(rk);X.fillStyle='rgba(255,150,90,.18)';X.fillRect(560,430,340,14);X.strokeStyle='rgba(0,0,0,.35)';X.lineWidth=2;X.beginPath();X.moveTo(640,470);X.lineTo(660,500);X.moveTo(780,460);X.lineTo(770,490);X.lineTo(790,520);X.stroke();X.restore();X.strokeStyle='#120608';X.lineWidth=2.5;X.stroke(rk);X.strokeStyle='rgba(255,180,120,.55)';X.lineWidth=1.6;X.beginPath();X.moveTo(578,468);X.quadraticCurveTo(600,442,650,447);X.lineTo(700,439);X.quadraticCurveTo(760,433,810,445);X.stroke();
 /* saguáro siluety v popředí */for(const [sx,sh,sc] of [[930,0,1.15],[520,0,.7]]){X.save();X.translate(sx,438);X.scale(sc,sc);X.fillStyle='#1c0c12';X.beginPath();X.roundRect(-9,-110,18,114,9);X.fill();X.beginPath();X.roundRect(-34,-78,12,40,6);X.fill();X.beginPath();X.roundRect(-34,-46,30,11,5);X.fill();X.beginPath();X.roundRect(20,-92,12,46,6);X.fill();X.beginPath();X.roundRect(6,-54,26,11,5);X.fill();X.strokeStyle='rgba(255,170,110,.4)';X.lineWidth=1.4;X.beginPath();X.moveTo(8,-104);X.lineTo(8,0);X.moveTo(31,-88);X.lineTo(31,-50);X.stroke();X.restore()}
 X.save();X.translate(640,452);X.scale(1,.28);tiGlow(0,0,190,'255,130,50',.35*m3Ease((t-20)/30)*(1+.08*Math.sin(T*.5)));X.restore();
 m3Fire(640,452,t);
 /* hrdina na skále */const hk=m3Ease((t-26)/40);if(hk>0){X.save();X.globalAlpha=hk;try{tiHero(SV.cls,738,440+(1-hk)*30,2.15,{t:T,every:2,face:-1,tint:['rgba(40,10,30,.22)'],rim:'rgba(255,160,90,1)',rdx:-3,rdy:1,ra:.85})}catch(e){}X.restore()}
 m3Tumble();
 X.restore();
 /* prach ve vzduchu */for(let i=0;i<40;i++){const u=((T*.0018+hs(i*3.1))%1),x=hs(i+30)*W+Math.sin(T*.01+i)*24,y=H*.92-u*H*.8;X.fillStyle='rgba(255,215,170,'+(.35*Math.sin(u*Math.PI))+')';X.fillRect(x,y,2,2)}}
/* táborák */
function m3Fire(x,y,t){const a=m3Ease((t-20)/30);if(a<=0)return;
 tiGlow(x,y-20,170*a,'255,140,60',.38*a+.06*Math.sin(T*.4));
 X.save();X.translate(x,y);X.scale(1.12,1.12);X.fillStyle='#2a160c';for(const r of [-.35,.35]){X.save();X.rotate(r);X.beginPath();X.roundRect(-26,-5,52,10,5);X.fill();X.strokeStyle='#0c0604';X.lineWidth=1.5;X.stroke();X.restore()}
 for(let i=0;i<7;i++){const a2=i/7*Math.PI*2;X.fillStyle='#3a3036';X.beginPath();X.ellipse(Math.cos(a2)*30,4+Math.sin(a2)*6,7,5,0,0,7);X.fill()}
 for(const L of [0,1,2])for(let i=0;i<3;i++){const ph=i*1.7+L,fl=1+Math.sin(T*.37+ph)*.18+Math.sin(T*.83+ph*2)*.1,h=[46,34,20][L]*fl*a*(i==1?1.15:.8),w=[13,9,5][L],ox=(i-1)*10,sw=Math.sin(T*.21+ph)*w*.6;X.fillStyle=['#d8401a','#ff9a2a','#ffe89a'][L];X.beginPath();X.moveTo(ox-w,-4);X.bezierCurveTo(ox-w,-h*.45,ox-w*.2+sw*.3,-h*.65,ox+sw,-h);X.bezierCurveTo(ox+w*.35+sw*.3,-h*.6,ox+w,-h*.45,ox+w,-4);X.closePath();X.fill();if(L==0){X.strokeStyle='rgba(70,16,6,.7)';X.lineWidth=1.4;X.stroke()}}
 X.restore();
 if(T%14==0)(M3.sm=M3.sm||[]).push({x:x+R0(-6,6),y:y-50,r:6,l:150});if(M3.sm)M3.sm=M3.sm.filter(q=>{q.l--;q.y-=.55;q.x-=.25+(150-q.l)*.004;q.r+=.12;const al=Math.min(1,(150-q.l)/20)*q.l/150*.16*a;X.fillStyle='rgba(70,50,60,'+al+')';X.beginPath();X.arc(q.x,q.y,q.r,0,7);X.fill();return q.l>0});
 if(T%3==0)M3.sp.push({x:x+R0(-10,10),y:y-20,vx:R0(-.4,.4),vy:R0(-1.8,-.8),l:R0(40,80)});M3.sp=M3.sp.filter(s=>{s.x+=s.vx+Math.sin(T*.05+s.l)*.3;s.y+=s.vy;s.l--;X.fillStyle='rgba(255,'+(170+((s.l*7)%70))+',80,'+Math.min(1,s.l/40)*a+')';X.fillRect(s.x,s.y,2,2);return s.l>0})}
/* koulející se keř (občas) */
function m3Tumble(){if(!M3.tw&&--M3.twT<=0){M3.tw={x:W+60,y:470,vx:-R0(2.4,3.4),vy:0,a:0,r:R0(16,22)};M3.twT=R0(500,1100)}const w=M3.tw;if(!w)return;w.x+=w.vx;w.vy+=.35;w.y+=w.vy;if(w.y>478-w.r*.2){w.y=478-w.r*.2;w.vy=-R0(2.5,5)}w.a+=w.vx/w.r;
 X.save();X.translate(w.x,w.y-w.r);X.rotate(w.a);X.strokeStyle='#4a2a14';X.lineWidth=1.6;for(let i=0;i<9;i++){X.beginPath();X.ellipse(0,0,w.r,w.r*(.4+.07*i),i*.7,0,7);X.stroke()}X.strokeStyle='#8a5a2a';X.lineWidth=1;for(let i=0;i<5;i++){X.beginPath();X.ellipse(0,0,w.r*.8,w.r*(.5+.08*i),i*1.1+.3,0,7);X.stroke()}X.restore();
 if(T%4==0)M3.dust.push({x:w.x,y:476,l:30});if(w.x<-80)M3.tw=null}
{const _d=()=>{M3.dust=M3.dust.filter(d=>{d.l--;X.fillStyle='rgba(200,150,110,'+(d.l/30*.25)+')';X.beginPath();X.arc(d.x,d.y-(30-d.l)*.4,4+(30-d.l)*.3,0,7);X.fill();return d.l>0})};M3.dustDraw=_d}
/* ---------- rozložení ---------- */
const M3P={x:70,top:204,sp:40,h:33};
function m3Rows(){const it=MI(),n=it.length,sp=Math.min(M3P.sp,(H-58-M3P.top)/n);return it.map((t,i)=>({t,i,y:M3P.top+i*sp+sp/2,h:Math.min(M3P.h,sp-5)}))}
function m3Lab(t){return t.replace('▶ ','')}
function m3Ic(t){return t=='Úkoly'?'qst':t=='Nová hra'?'new':t=='Pokračovat'?'cont':t=='Výběr oblasti'?'map':t.startsWith('Postava')?'cls':t=='Schopnosti'?'sk':t.indexOf('Trailer')>=0?'tr':'set'}
function m3Reset(){M3.t=0;M3.quick=0;M3.sw={};M3.card={a:-.5,v:0,k:0};M3.lastS=-1;M3.go=null;M3.sub=mn.sub;M3.subT0=0;M3.pkT0=30;M3.lgB=0;M3.row={};
 if(mn.sub==0&&mn.s==0&&SV.un>0&&MI()[1]=='Pokračovat')mn.s=1}
/* ---------- ikonky ---------- */
function m3Icon(k,x,y,c){X.save();X.translate(x,y);X.lineWidth=2.2;X.lineJoin='round';X.lineCap='round';X.strokeStyle=c;X.fillStyle=c;
 if(k=='new'){X.beginPath();for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=i%2?4.6:10.5;X.lineTo(Math.cos(a)*r,Math.sin(a)*r)}X.closePath();X.fill();for(let i=0;i<5;i++){const a=i/5*Math.PI*2-Math.PI/2;X.beginPath();X.arc(Math.cos(a)*10.5,Math.sin(a)*10.5,1.8,0,7);X.fill()}}
 else if(k=='cont'){X.beginPath();X.moveTo(-6,-9);X.lineTo(9,0);X.lineTo(-6,9);X.closePath();X.fill();X.fillRect(-11,-9,3,18)}
 else if(k=='map'){X.beginPath();X.moveTo(-11,-7);X.lineTo(-4,-10);X.lineTo(4,-7);X.lineTo(11,-10);X.lineTo(11,7);X.lineTo(4,10);X.lineTo(-4,7);X.lineTo(-11,10);X.closePath();X.stroke();X.beginPath();X.moveTo(-4,-10);X.lineTo(-4,7);X.moveTo(4,-7);X.lineTo(4,10);X.stroke();X.lineWidth=1.6;X.beginPath();X.moveTo(-8,4);X.lineTo(-5,1);X.moveTo(6,-3);X.lineTo(9,0);X.moveTo(9,-3);X.lineTo(6,0);X.stroke()}
 else if(k=='cls'){X.beginPath();X.ellipse(0,5,13,3.6,0,0,7);X.fill();X.beginPath();X.moveTo(-7,4);X.quadraticCurveTo(-8,-9,-2.5,-8);X.lineTo(0,-5.5);X.lineTo(2.5,-8);X.quadraticCurveTo(8,-9,7,4);X.closePath();X.fill()}
 else if(k=='sk'){X.beginPath();X.arc(0,0,10,0,7);X.stroke();X.beginPath();X.moveTo(-5,0);X.lineTo(0,-6);X.lineTo(5,0);X.moveTo(0,-6);X.lineTo(0,6);X.stroke()}
 else if(k=='tr'){X.beginPath();X.arc(0,0,10,0,7);X.stroke();for(let i=0;i<5;i++){const a=i/5*Math.PI*2+T*.03;X.beginPath();X.arc(Math.cos(a)*5.2,Math.sin(a)*5.2,2.1,0,7);X.fill()}}
 else if(k=='qst'){X.fillRect(-7,-9,14,18);X.fillRect(-9,-11,18,4);X.fillRect(-9,7,18,4);X.fillStyle='rgba(30,10,2,.55)';X.fillRect(-4,-4,8,1.6);X.fillRect(-4,0,8,1.6);X.fillRect(-4,4,6,1.6)}
 else{X.lineWidth=3.2;X.beginPath();X.arc(0,0,6,0,7);X.stroke();for(let i=0;i<8;i++){X.save();X.rotate(i/8*Math.PI*2+T*.01);X.fillRect(-2,-11,4,4);X.restore()}}
 X.restore()}
/* ---------- logo ---------- */
function m3LogoBuild(){const LW=540,LH=170;let c=M3.lg;if(!c){c=M3.lg=document.createElement('canvas');c.width=LW;c.height=LH;M3.lgS=document.createElement('canvas');M3.lgS.width=LW;M3.lgS.height=LH}
 const g=c.getContext('2d');g.clearRect(0,0,LW,LH);const ox=X;X=g;try{goldText('KAKTUS',LW/2,122,100,10,1)}finally{X=ox}M3.lgB=1}
function m3Logo(t){const k=m3Ease((t-6)/16);if(k<=0)return;if(!M3.lg||(M3.lgB<4&&T%45==0)){m3LogoBuild();M3.lgB++}
 const cx=258,cy=106,pop=t<22?1+(1-k)*.9:1+.01*Math.sin(T*.05);
 if(t==22){shake=10;sfx('boom');for(let i=0;i<30;i++)M3.dust.push({x:cx+R0(-200,200),y:cy+40,l:R0(20,30),vx:R0(-2,2)})}
 if(shake>0){shake*=.86;if(shake<.3)shake=0}const sx=shake>1?R0(-shake,shake):0,sy=shake>1?R0(-shake,shake):0;
 tiGlow(cx,cy+10,260,'255,150,60',.22*k);
 X.save();X.globalAlpha=k;X.translate(cx+sx,cy+sy);X.scale(pop,pop);X.rotate(-.035);X.drawImage(M3.lg,-270,-110);
 /* lesk */const sh=(T%300)/300;if(sh<.35){const s=M3.lgS.getContext('2d');s.globalCompositeOperation='source-over';s.clearRect(0,0,540,170);s.drawImage(M3.lg,0,0);s.globalCompositeOperation='source-atop';const bx=-120+sh/.35*780,gg=s.createLinearGradient(bx-60,0,bx+60,0);gg.addColorStop(0,'rgba(255,255,240,0)');gg.addColorStop(.5,'rgba(255,255,240,.85)');gg.addColorStop(1,'rgba(255,255,240,0)');s.fillStyle=gg;s.setTransform(1,0,-.5,1,0,0);s.fillRect(bx-60,0,120+170,170);s.setTransform(1,0,0,1,0,0);X.globalCompositeOperation='lighter';X.globalAlpha=.55*k;X.drawImage(M3.lgS,-270,-110)}
 X.restore();
 mRibbon(cx+4,cy+56,236,'Srdce pouště',m3Ease((t-26)/14))}
/* ---------- rozcestník ---------- */
function m3Post(t){const k=m3Ease((t-20)/18);if(k<=0)return;const x=M3P.x,y0=M3P.top-30,y1=H;X.save();X.translate(0,(1-k)*60);X.globalAlpha=k;
 X.fillStyle='rgba(8,2,4,.4)';X.fillRect(x-4,y0+10,22,y1-y0);
 const g=X.createLinearGradient(x-11,0,x+11,0);g.addColorStop(0,'#2a160a');g.addColorStop(.35,'#7a4e2a');g.addColorStop(.6,'#6a4020');g.addColorStop(1,'#2e1a0c');X.fillStyle=g;X.beginPath();X.moveTo(x-11,y1);X.lineTo(x-11,y0+8);X.lineTo(x,y0-6);X.lineTo(x+11,y0+8);X.lineTo(x+11,y1);X.closePath();X.fill();X.strokeStyle='#140804';X.lineWidth=2.2;X.stroke();
 X.strokeStyle='rgba(20,8,2,.5)';X.lineWidth=1.2;for(const dx of [-5,2,6]){X.beginPath();X.moveTo(x+dx,y0+14);for(let y=y0+14;y<y1;y+=30)X.lineTo(x+dx+Math.sin(y*.07+dx)*1.2,y);X.stroke()}
 /* provaz */for(const ry of [y0+18]){X.strokeStyle='#c8a46a';X.lineWidth=2.4;for(let j=0;j<3;j++){X.beginPath();X.moveTo(x-12,ry+j*5);X.lineTo(x+12,ry+j*5+3);X.stroke()}X.strokeStyle='#5a3c1a';X.lineWidth=1;for(let j=0;j<3;j++){X.beginPath();X.moveTo(x-12,ry+j*5+2);X.lineTo(x+12,ry+j*5+5);X.stroke()}}
 X.restore()}
function m3Board(w,h,sel,i,lab,ic,lk){const tip=h*.6,j=q=>(hs(i*13.1+q)-.5)*3;
 const P2=new Path2D();P2.moveTo(0,-h/2+j(1));P2.lineTo(w-tip,-h/2+j(2));P2.lineTo(w,j(3)*.4);P2.lineTo(w-tip,h/2+j(4));P2.lineTo(0,h/2+j(5));P2.lineTo(4,j(6)*.5);P2.closePath();
 X.save();X.translate(6,8);X.fillStyle='rgba(8,2,4,.5)';X.fill(P2);X.restore();
 if(sel){X.save();X.shadowColor='rgba(255,180,80,.95)';X.shadowBlur=22;X.fillStyle='#ffcf7a';X.fill(P2);X.restore()}
 const g=X.createLinearGradient(0,-h/2,0,h/2);if(sel){g.addColorStop(0,'#f0c080');g.addColorStop(.45,'#cf8a46');g.addColorStop(1,'#8a4c1c')}else{g.addColorStop(0,'#86562e');g.addColorStop(.5,'#64401f');g.addColorStop(1,'#3e2410')}X.fillStyle=g;X.fill(P2);
 X.save();X.clip(P2);X.strokeStyle=sel?'rgba(110,50,14,.4)':'rgba(24,10,2,.5)';X.lineWidth=1.2;for(let q=0;q<4;q++){const yy=-h/2+5+q*(h-10)/3+(hs(i+q*3)-.5)*3;X.beginPath();X.moveTo(0,yy);for(let x=0;x<=w;x+=20)X.lineTo(x,yy+Math.sin(x*.045+i*2+q*2)*1.7);X.stroke()}
 X.beginPath();X.ellipse(w*(.35+hs(i*5)*.35),(hs(i*9)-.5)*h*.35,7,2.6,0,0,7);X.stroke();X.beginPath();X.ellipse(w*(.35+hs(i*5)*.35),(hs(i*9)-.5)*h*.35,3,1,0,0,7);X.stroke();
 X.fillStyle=sel?'rgba(255,246,210,.45)':'rgba(255,200,140,.14)';X.fillRect(0,-h/2,w,3);X.fillStyle='rgba(0,0,0,.28)';X.fillRect(0,h/2-4,w,4);X.restore();
 X.strokeStyle='#1a0904';X.lineWidth=2.4;X.lineJoin='round';X.stroke(P2);
 /* hřebík */X.fillStyle='#1e1a18';X.beginPath();X.arc(26,0,3.8,0,7);X.fill();X.fillStyle='rgba(255,240,220,.6)';X.beginPath();X.arc(25,-1.2,1.3,0,7);X.fill();
 m3Icon(ic,54,0,sel?'#5a1c04':lk?'#7a6a5a':'#e8b860');
 X.font='21px '+FONT;X.textAlign='left';X.textBaseline='middle';if(sel){X.fillStyle='rgba(255,240,200,.6)';X.fillText(lab,76,2.5);X.fillStyle='#3a1204';X.fillText(lab,76,1)}else{X.lineWidth=4;X.lineJoin='round';X.strokeStyle='rgba(14,4,2,.85)';X.strokeText(lab,76,1);X.fillStyle=lk?'#9a8a78':'#f6e4bc';X.fillText(lab,76,1)}X.textBaseline='alphabetic'}
function m3Planks(t){const R=m3Rows();R.forEach(r=>{const s=M3.sw[r.i];if(!s||!s.on)return;const sel=mn.s==r.i,lab=m3Lab(r.t);X.font='21px '+FONT;const w=Math.max(236,X.measureText(lab).width+104);r.w=w;
  X.save();X.translate(M3P.x,r.y);X.rotate(s.a);const sc=1+.06*s.o;X.scale(sc,sc);X.translate(-26,0);m3Board(w,r.h,sel,r.i,lab,m3Ic(r.t));
  if(r.t=='Úkoly'&&rwPend().length){const pu=1+.12*Math.sin(T*.25);X.save();X.translate(w-30,-r.h/2+2);X.scale(pu,pu);X.fillStyle='#c8241a';X.beginPath();X.arc(0,0,10,0,7);X.fill();X.strokeStyle='#fff3dc';X.lineWidth=1.5;X.stroke();X.font='700 12px Georgia';X.textAlign='center';X.fillStyle='#fff';X.fillText(String(rwPend().length),0,4.5);X.restore()}
  if(sel){const g=M3.go,gt=g?g.t:99,rec=gt<10?(1-gt/10)*.6:0,bob=Math.sin(T*.12)*3;X.save();X.translate(w+34+bob+(gt<10?(1-gt/10)*8:0),2);X.rotate(rec);X.scale(-1.35,1.35);mRevolver(0,0);X.restore();
   if(gt<18){const f2=1-gt/18;X.fillStyle='rgba(30,10,4,'+Math.min(1,gt/2)+')';X.beginPath();X.arc(w-26,1,4.2,0,7);X.fill();X.strokeStyle='rgba(30,10,4,'+Math.min(1,gt/2)*.8+')';X.lineWidth=1.4;for(let q=0;q<6;q++){const a=q/6*Math.PI*2+.3;X.beginPath();X.moveTo(w-26+Math.cos(a)*4,1+Math.sin(a)*4);X.lineTo(w-26+Math.cos(a)*8,1+Math.sin(a)*8);X.stroke()}
    for(let q=0;q<3;q++){const r=5+gt*1.3+q*3;X.fillStyle='rgba(230,220,200,'+(.45*f2)+')';X.beginPath();X.arc(w+12+q*7,-gt*1.4-q*5,r,0,7);X.fill()}}
   if(gt<8){const f=1-gt/8,mx=w+8;tiGlow(mx,0,60*f,'255,200,90',.9*f);X.fillStyle='rgba(255,250,210,'+f+')';X.beginPath();for(let q=0;q<12;q++){const a=q/12*Math.PI*2,rr=q%2?5:20*f+6;X.lineTo(mx+Math.cos(a)*rr,Math.sin(a)*rr)}X.closePath();X.fill()}}
  X.restore()});M3.R=R}
/* ---------- karta s náhledem (vpravo nahoře) ---------- */
function m3Pips(x,y,n,on,c){for(let q=0;q<n;q++){X.fillStyle=q<on?c:'rgba(60,30,10,.25)';X.strokeStyle='#3a1a08';X.lineWidth=1;X.beginPath();X.arc(x+q*12,y,4,0,7);X.fill();X.stroke()}}
function m3Star(x,y,r,c){X.fillStyle=c;X.beginPath();for(let q=0;q<10;q++){const a=q/10*Math.PI*2-Math.PI/2,rr=q%2?r*.45:r;X.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}X.closePath();X.fill()}
function m3CardData(it){const D={t:m3Lab(it),s:'',b:mDesc(it),eh:0,ex:null};
 if(it=='Nová hra'){D.s='Prolog a 1. kapitola';if(SV.un>0||SV.st>0){D.eh=34;D.ex=(x,y,w)=>{X.fillStyle='rgba(150,30,16,.14)';X.beginPath();X.roundRect(x,y,w,28,6);X.fill();X.fillStyle='#8a1a0a';X.font='italic 13px Georgia';X.fillText('Pozor: začne odznova a smaže postup',x+10,y+18)}}else{D.eh=24;D.ex=(x,y)=>{X.fillStyle='#5a3a1a';X.font='13px Georgia';X.fillText('Obtížnost: '+DIFN[SV.dif]+'  •  Postava: '+CLN[SV.cls].n,x,y+14)}}}
 else if(it=='Pokračovat'){D.s='Kapitola '+(SV.un+1)+' z '+LV.length;D.b='Na řadě: '+LV[SV.un].n+'. Otevře se mapa světa.';D.eh=40;D.ex=(x,y,w)=>{const n=LV.length,dx=(w-24)/(n-1);X.strokeStyle='#8a6a3a';X.lineWidth=2;X.setLineDash([4,4]);X.beginPath();X.moveTo(x+12,y+14);X.lineTo(x+12+dx*(n-1),y+14);X.stroke();X.setLineDash([]);
   for(let q=0;q<n;q++){const px=x+12+q*dx,cur=q==SV.un;X.fillStyle=q<SV.un?'#c88a2a':cur?'#b02a18':'#cbb48a';X.strokeStyle='#3a1a08';X.lineWidth=1.6;X.beginPath();X.arc(px,y+14,cur?7+Math.sin(T*.15):5.5,0,7);X.fill();X.stroke();if(q<SV.un&&SV.best&&SV.best[q]){X.fillStyle=RKC[SV.best[q].r]||'#555';X.font='700 11px Georgia';X.textAlign='center';X.strokeStyle='#2a1206';X.lineWidth=3;X.strokeText(SV.best[q].r,px,y+34);X.fillText(SV.best[q].r,px,y+34);X.textAlign='left'}}}}
 else if(it=='Výběr oblasti'){D.s='Mapa světa';let ch=0;for(let q=0;q<LV.length;q++)ch+=chCount(q);D.eh=24;D.ex=(x,y)=>{X.font='13px Georgia';X.fillStyle='#5a3a1a';X.fillText('Oblasti '+(SV.un+1)+'/'+LV.length+'   •   Výzvy '+ch+'/'+LV.length*5+'   •   Semínka '+seedTotal()+'/'+SEEDP_N(),x,y+14)}}
 else if(it.startsWith('Postava')){const c=CLN[SV.cls];D.t=c.n;D.s=c.d;D.b='';D.eh=c.ab.length*19;D.ex=(x,y)=>{X.font='13.5px Georgia';c.ab.forEach((a,q)=>{m3Star(x+6,y+9+q*19,5.5,'#b0701e');X.fillStyle='#3a2210';X.fillText(a,x+18,y+14+q*19)})}}
 else if(it=='Schopnosti'){D.s='★ '+SV.st+' hvězd k utracení';D.eh=Math.ceil(UPS.length/2)*20;D.ex=(x,y,w)=>{X.font='12.5px Georgia';UPS.forEach((u,q)=>{const cx=x+(q%2)*(w/2+6),cy=y+(q>>1)*20;X.fillStyle='#3a2210';X.fillText(u[1],cx,cy+13);for(let k=0;k<3;k++){X.fillStyle=k<upv(u[0])?'#d89a2a':'rgba(60,30,10,.22)';X.strokeStyle='#3a1a08';X.lineWidth=1;X.beginPath();X.arc(cx+w/2-26+k*8.5,cy+9,3.2,0,7);X.fill();X.stroke()}})}}
 else if(it.indexOf('Trailer')>=0){D.s='cca 1 minuta';D.eh=30;D.ex=(x,y,w)=>{X.fillStyle='#2a1a12';X.fillRect(x,y+2,w,24);X.fillStyle='#e8d4a8';for(let q=0;q<w/14;q++){X.fillRect(x+4+q*14,y+4,7,4);X.fillRect(x+4+q*14,y+20,7,4)}X.fillStyle='#ffd27a';X.font='12px Georgia';X.textAlign='center';X.fillText('▶  příběh • záběry • bossové',x+w/2,y+18);X.textAlign='left'}}
 else if(it=='Nastavení'){D.s='Ovládání, zvuk, grafika';D.b='';D.eh=4*19;const rows=[['Obtížnost',DIFN[SV.dif]],['Zvuky',SV.sfx?'zapnuté':'vypnuté'],['Hlasitost',Math.round(SV.vol*100)+' %'],['Grafika',SV.fx?'vysoká':'nízká']];D.ex=(x,y,w)=>{X.font='13.5px Georgia';rows.forEach((r,q)=>{X.fillStyle='#5a3a1a';X.fillText(r[0],x,y+14+q*19);X.textAlign='right';X.fillStyle='#2a1206';X.font='700 13.5px Georgia';X.fillText(r[1],x+w,y+14+q*19);X.textAlign='left';X.font='13.5px Georgia'})}}
 else if(it=='Úkoly'){const n=qTotal(),ri=rankIdx(),pd=rwPend().length,w0=rwSV();D.s='Hodnost: '+RANKS[ri].n;D.b=pd?'Čeká na tebe '+pd+' '+qPl(pd,'nevyzvednutá odměna','nevyzvednuté odměny','nevyzvednutých odměn')+'!':'Úkoly všech oblastí, talismany a hodnosti šerifa.';D.eh=46;D.ex=(x,y,w)=>{X.font='13px Georgia';X.fillStyle='#5a3a1a';X.fillText('Splněno '+n+' / 40 úkolů',x,y+12);X.fillStyle='rgba(60,30,10,.2)';X.fillRect(x,y+18,w,6);X.fillStyle='#c8801e';X.fillRect(x,y+18,w*n/40,6);
   X.fillStyle='#5a3a1a';X.fillText('Talismany:',x,y+42);w0.eq.forEach((id,k)=>{X.fillStyle='rgba(58,30,12,.85)';X.beginPath();X.arc(x+84+k*26,y+37,11,0,7);X.fill();talIco(id,x+84+k*26,y+37,9)});if(!w0.eq.length){X.font='italic 12px Georgia';X.fillStyle='#7a5a3a';X.fillText('žádný nasazený',x+72,y+42)}}}
 else if(it=='Ovládání kláves'){D.s='Klávesnice';D.b='Přemapuj si klávesy podle sebe. Ovladač i dotyk fungují automaticky.'}
 else if(it.startsWith('Obtížnost')){D.t='Obtížnost';D.s=DIFN[SV.dif]}
 else if(it.startsWith('Zvuky')){D.t='Zvuky';D.s=SV.sfx?'Zapnuté':'Vypnuté'}
 else if(it.startsWith('Hlasitost')){D.t='Hlasitost';D.s=Math.round(SV.vol*100)+' %'}
 else if(it.startsWith('Grafika')){D.t='Grafika';D.s=SV.fx?'Vysoká':'Nízká'}
 else if(it=='Úspěchy'){const n=ACH.filter(a=>SV.ach[a[0]]).length;D.s=n+' z '+ACH.length+' odemčeno';const nx=ACH.filter(a=>!SV.ach[a[0]]).slice(0,2);if(nx.length){D.eh=nx.length*19+4;D.ex=(x,y)=>{X.font='italic 13px Georgia';nx.forEach((a,q)=>{X.fillStyle='#7a5a3a';X.fillText('☐ '+a[1]+' – '+a[2],x,y+14+q*19)})}}}
 else if(it=='Zpět'){D.s='';D.b='Návrat do hlavního menu.'}
 return D}
function m3Card(t){const k=m3Ease((t-38)/22);if(k<=0)return;const it=MI()[mn.s];if(!it)return;const D=m3CardData(it),c=M3.card;
 const w=300,x=W-w-26,y=26;X.font='italic 14px Georgia';const L=D.b?wrapL(D.b,w-40):[];const h=58+(D.s?20:0)+L.length*19+(D.eh?D.eh+8:0)+10;
 X.save();X.translate(x+w/2,y+26);X.rotate(c.a+(1-k)*-.4);X.translate(0,(1-k)*-160);X.globalAlpha=Math.min(1,k*1.5);
 /* provázek a hřebík */X.strokeStyle='#3a2410';X.lineWidth=1.5;X.beginPath();X.moveTo(0,-24);X.lineTo(-w/2+30,10);X.moveTo(0,-24);X.lineTo(w/2-30,10);X.stroke();X.fillStyle='#2a2420';X.beginPath();X.arc(0,-24,4,0,7);X.fill();
 X.translate(-w/2,0);
 X.fillStyle='rgba(10,2,4,.45)';X.beginPath();X.roundRect(7,9,w,h,4);X.fill();
 const pg=X.createLinearGradient(0,0,0,h);pg.addColorStop(0,'#f6e8c4');pg.addColorStop(1,'#dcc08a');X.fillStyle=pg;X.beginPath();X.moveTo(0,0);for(let q=0;q<=10;q++)X.lineTo(q*w/10,(hs(q*3.3)-.5)*3);for(let q=0;q<=10;q++)X.lineTo(w+(hs(q*5.1)-.5)*3,q*h/10);for(let q=10;q>=0;q--)X.lineTo(q*w/10,h+(hs(q*7.7)-.5)*4);for(let q=10;q>=0;q--)X.lineTo((hs(q*9.9)-.5)*3,q*h/10);X.closePath();X.fill();X.strokeStyle='#7a5228';X.lineWidth=1.6;X.stroke();
 X.save();X.clip();const vg=X.createRadialGradient(w/2,h/2,40,w/2,h/2,w*.7);vg.addColorStop(0,'rgba(120,70,20,0)');vg.addColorStop(1,'rgba(120,70,20,.28)');X.fillStyle=vg;X.fillRect(0,0,w,h);X.restore();
 X.strokeStyle='rgba(122,82,40,.55)';X.lineWidth=1;X.strokeRect(8,8,w-16,h-16);
 /* očka připínáčků */for(const px of [30,w-30]){X.fillStyle='#8a2a14';X.beginPath();X.arc(px,10,4.5,0,7);X.fill();X.fillStyle='rgba(255,220,200,.6)';X.beginPath();X.arc(px-1.3,8.7,1.5,0,7);X.fill()}
 const ca=Math.min(1,c.k);X.globalAlpha*=ca;let yy=42;
 X.textAlign='left';X.font='23px '+FONT;X.fillStyle='#3a1606';X.fillText(D.t,20,yy);m3Icon(m3Ic(it),w-34,yy-8,'#8a4a1a');yy+=8;X.strokeStyle='#8a5a28';X.lineWidth=1.4;X.beginPath();X.moveTo(20,yy);X.lineTo(w-20,yy);X.stroke();yy+=4;
 if(D.s){X.font='700 14px Georgia';X.fillStyle='#8a2a10';X.fillText(D.s,20,yy+15);yy+=20}
 X.font='italic 14px Georgia';X.fillStyle='#3a2410';L.forEach(l=>{X.fillText(l,20,yy+16);yy+=19});
 if(D.ex){yy+=8;try{D.ex(20,yy,w-40)}catch(e){}}
 X.restore()}
/* ---------- nastavení: dřevěná tabule s přepínači ---------- */
const M3S={x:44,y:112,w:470,rh:44};
function m3SetInfo(it){if(it=='Ovládání kláves')return{l:'Ovládání kláves',ty:'btn',v:'Upravit'};if(it.startsWith('Obtížnost'))return{l:'Obtížnost',ty:'sel',v:DIFN[SV.dif],i:SV.dif,n:3};if(it.startsWith('Zvuky'))return{l:'Zvuky',ty:'tog',on:!!SV.sfx};if(it.startsWith('Hlasitost'))return{l:'Hlasitost',ty:'sld',f:SV.vol};if(it.startsWith('Grafika'))return{l:'Grafika',ty:'sel',v:SV.fx?'Vysoká':'Nízká',i:SV.fx?1:0,n:2};if(it=='Úspěchy')return{l:'Úspěchy',ty:'btn',v:ACH.filter(a=>SV.ach[a[0]]).length+' / '+ACH.length};return{l:'Zpět',ty:'back'}}
function m3SetGeo(){const it=MI(),bh=56+it.length*M3S.rh+18;return{x:M3S.x,y:M3S.y,w:M3S.w,h:bh,it,ry:i=>M3S.y+56+i*M3S.rh+M3S.rh/2,cx:M3S.x+M3S.w-232,cw:206}}
function m3Adj(i,d,abs){const it=MI()[i];if(!it)return;let ch=1;
 if(it.startsWith('Obtížnost')){const n=Math.max(0,Math.min(2,SV.dif+d));ch=n!=SV.dif;SV.dif=n}
 else if(it.startsWith('Zvuky')){const n=d>0?1:0;ch=n!=SV.sfx;SV.sfx=n}
 else if(it.startsWith('Hlasitost')){const n=abs!=null?Math.round(Math.max(0,Math.min(1,abs))*10)/10:Math.round(Math.max(0,Math.min(1,SV.vol+d*.1))*10)/10;ch=n!=SV.vol;SV.vol=n;if(AU.m)AU.m.gain.value=SV.vol}
 else if(it.startsWith('Grafika')){const n=d>0?1:0;ch=n!=SV.fx;SV.fx=n}
 else return;
 if(ch){saveSV();sfx(it.startsWith('Hlasitost')?'coin':'ui');M3.row[i]=10;M3.card.v+=.03}else sfx('deny')}
function m3Toggle(x,y,on,sel){X.save();const w=64,h=26;X.fillStyle='rgba(0,0,0,.35)';X.beginPath();X.roundRect(x+2,y-h/2+3,w,h,13);X.fill();X.fillStyle=on?'#3a7a2a':'#6a2216';X.beginPath();X.roundRect(x,y-h/2,w,h,13);X.fill();X.strokeStyle='#140804';X.lineWidth=2;X.stroke();
 X.font='700 12px Georgia';X.textAlign='center';X.fillStyle='rgba(255,240,210,.85)';X.fillText(on?'ZAP':'VYP',on?x+22:x+w-22,y+4);
 const kx=on?x+w-14:x+14;X.fillStyle='#e8c070';X.beginPath();X.arc(kx,y,10,0,7);X.fill();X.strokeStyle='#3a1a06';X.stroke();m3Star(kx,y,6.5,'#8a5a1a');X.restore()}
function m3Slider(x,y,w,f,sel){X.save();X.fillStyle='rgba(0,0,0,.4)';X.beginPath();X.roundRect(x,y-5,w,10,5);X.fill();const g=X.createLinearGradient(x,0,x+w,0);g.addColorStop(0,'#c86a1a');g.addColorStop(1,'#ffd27a');X.fillStyle=g;X.beginPath();X.roundRect(x,y-5,Math.max(10,w*f),10,5);X.fill();X.strokeStyle='#140804';X.lineWidth=1.6;X.beginPath();X.roundRect(x,y-5,w,10,5);X.stroke();
 for(let q=0;q<=10;q++){X.fillStyle='rgba(255,230,190,.35)';X.fillRect(x+q*w/10-.5,y+8,1,q%5?3:6)}
 const kx=x+w*f;X.save();X.translate(kx,y);X.rotate(f*3);m3Star(0,0,13,'#1a0a04');m3Star(0,0,11,sel?'#ffd27a':'#d8a040');X.fillStyle='#6a3a10';X.beginPath();X.arc(0,0,3,0,7);X.fill();X.restore();X.restore()}
function m3Settings(t){const G=m3SetGeo(),k=m3Back((M3.t-M3.subT0)/24);if(k<=0)return;const it=G.it;
 X.save();X.translate(0,(1-k)*-(G.y+G.h+40));
 /* lana */X.strokeStyle='#b89058';X.lineWidth=3;for(const rx of [G.x+60,G.x+G.w-60]){X.beginPath();X.moveTo(rx,-10);X.lineTo(rx,G.y+8);X.stroke()}
 /* tabule */X.fillStyle='rgba(8,2,4,.5)';X.beginPath();X.roundRect(G.x+8,G.y+10,G.w,G.h,8);X.fill();
 const np=Math.ceil(G.h/38);for(let q=0;q<np;q++){const py=G.y+q*38,ph=Math.min(38,G.y+G.h-py);const g=X.createLinearGradient(0,py,0,py+ph);g.addColorStop(0,q%2?'#5a381c':'#634020');g.addColorStop(1,q%2?'#3e2410':'#46290f');X.fillStyle=g;X.fillRect(G.x,py,G.w,ph);X.strokeStyle='rgba(20,8,2,.55)';X.lineWidth=1;X.beginPath();for(let x=G.x;x<=G.x+G.w;x+=24)X.lineTo(x,py+ph*.5+Math.sin(x*.04+q*3)*2);X.stroke();X.fillStyle='rgba(0,0,0,.3)';X.fillRect(G.x,py+ph-2,G.w,2)}
 X.strokeStyle='#1a0904';X.lineWidth=3;X.strokeRect(G.x,G.y,G.w,G.h);X.strokeStyle='rgba(232,184,96,.35)';X.lineWidth=1.2;X.strokeRect(G.x+7,G.y+7,G.w-14,G.h-14);
 for(const [nx,ny] of [[G.x+60,G.y+12],[G.x+G.w-60,G.y+12],[G.x+12,G.y+G.h-12],[G.x+G.w-12,G.y+G.h-12]]){X.fillStyle='#1e1a18';X.beginPath();X.arc(nx,ny,4,0,7);X.fill();X.fillStyle='rgba(255,240,220,.5)';X.beginPath();X.arc(nx-1,ny-1,1.3,0,7);X.fill()}
 mRibbon(G.x+G.w/2,G.y+4,250,'NASTAVENÍ',1);
 it.forEach((s,i)=>{const I=m3SetInfo(s),y=G.ry(i),sel=mn.s==i,fl=M3.row[i]||0,ra=m3Ease((M3.t-M3.subT0-10-i*3)/10);if(ra<=0)return;X.save();X.globalAlpha*=ra;X.translate((1-ra)*-30,0);
  if(sel){X.fillStyle='rgba(255,200,110,'+(.16+.06*Math.sin(T*.12))+')';X.beginPath();X.roundRect(G.x+14,y-M3S.rh/2+3,G.w-28,M3S.rh-6,8);X.fill();X.strokeStyle='rgba(255,210,130,.7)';X.lineWidth=1.5;X.stroke();X.save();X.translate(G.x+4+Math.sin(T*.12)*3,y+1);X.scale(1.1,1.1);mRevolver(0,0);X.restore()}
  if(fl>0){X.fillStyle='rgba(255,240,180,'+fl/10*.35+')';X.beginPath();X.roundRect(G.x+14,y-M3S.rh/2+3,G.w-28,M3S.rh-6,8);X.fill()}
  X.textAlign='left';X.font='19px '+FONT;X.lineWidth=4;X.lineJoin='round';X.strokeStyle='rgba(14,4,2,.85)';X.strokeText(I.l,G.x+40,y+7);X.fillStyle=sel?'#ffe2a0':'#f0dcb4';X.fillText(I.l,G.x+40,y+7);
  const cx=G.cx,cw=G.cw;
  if(I.ty=='tog')m3Toggle(cx+cw-64,y,I.on,sel);
  else if(I.ty=='sld'){m3Slider(cx+8,y,cw-62,I.f,sel);X.font='700 14px Georgia';X.textAlign='right';X.fillStyle='#ffe2a0';X.fillText(Math.round(I.f*100)+' %',cx+cw,y+5)}
  else if(I.ty=='sel'){X.textAlign='center';X.font='17px '+FONT;X.strokeStyle='rgba(14,4,2,.85)';X.lineWidth=4;X.strokeText(I.v,cx+cw/2,y+4);X.fillStyle='#ffd27a';X.fillText(I.v,cx+cw/2,y+4);
   for(const sd of [-1,1]){const ax=cx+cw/2+sd*(cw/2-12),en=sd<0?I.i>0:I.i<I.n-1;X.fillStyle=en?(sel?'#ffd27a':'#c8a060'):'rgba(200,160,100,.25)';X.beginPath();X.moveTo(ax+sd*7,y);X.lineTo(ax-sd*6,y-8);X.lineTo(ax-sd*6,y+8);X.closePath();X.fill()}
   for(let q=0;q<I.n;q++){X.fillStyle=q==I.i?'#ffd27a':'rgba(255,220,160,.25)';X.beginPath();X.arc(cx+cw/2+(q-(I.n-1)/2)*12,y+15,2.6,0,7);X.fill()}}
  else if(I.ty=='btn'){X.textAlign='right';X.font='16px '+FONT;X.fillStyle=sel?'#ffd27a':'#d8b880';X.fillText(I.v+'  ▶',cx+cw,y+6)}
  else{X.textAlign='right';X.font='italic 13px Georgia';X.fillStyle='rgba(255,230,190,.6)';X.fillText(TOUCH?'':'Esc',cx+cw,y+5)}
  X.restore()});
 X.textAlign='center';X.font='italic 13px Georgia';X.fillStyle='rgba(255,230,190,.55)';X.fillText(TOUCH?'Klepni na řádek':'↑↓ výběr  •  ←→ změna  •  Enter potvrdit  •  Esc zpět',G.x+G.w/2,G.y+G.h-8+0);
 X.restore()}
/* ---------- spodní lišta ---------- */
function m3Bar(t){const k=m3Ease((t-30)/20);if(k<=0)return;X.save();X.translate(0,(1-k)*40);const y=H-30;
 const g=X.createLinearGradient(0,y,0,H);g.addColorStop(0,'rgba(20,6,6,.82)');g.addColorStop(1,'rgba(10,2,4,.95)');X.fillStyle=g;X.fillRect(0,y,W,30);X.fillStyle='rgba(232,184,96,.5)';X.fillRect(0,y,W,1.5);
 let x=22;const chip=(draw,txt,col)=>{X.font='700 14px Georgia';const tw=X.measureText(txt).width;X.fillStyle='rgba(255,220,160,.08)';X.beginPath();X.roundRect(x-6,y+6,tw+36,19,9);X.fill();draw(x+8,y+15.5);X.fillStyle=col;X.textAlign='left';X.fillText(txt,x+22,y+20.5);x+=tw+48};
 chip((cx,cy)=>m3Star(cx,cy,8,'#ffd44a'),String(SV.st),'#ffe6a0');
 chip((cx,cy)=>{X.fillStyle='#e8b040';X.beginPath();X.moveTo(cx-6,cy-6);X.lineTo(cx+6,cy-6);X.lineTo(cx+4,cy+1);X.lineTo(cx-4,cy+1);X.closePath();X.fill();X.fillRect(cx-1.2,cy+1,2.4,4);X.fillRect(cx-4,cy+5,8,2)},ACH.filter(a=>SV.ach[a[0]]).length+'/'+ACH.length,'#ffe6a0');
 chip((cx,cy)=>{try{seedShape(cx,cy+1,.42,1)}catch(e){}},seedTotal()+'/'+SEEDP_N(),'#a8ffb0');
 X.textAlign='right';X.font='13px Georgia';X.fillStyle='rgba(255,236,200,.62)';X.fillText(TOUCH?'Klepni na ceduli':(mn.sub==3?'':'↑↓ výběr  •  Enter potvrdit  •  myš i gamepad'),W-20,y+20);X.textAlign='left';X.restore()}
/* ---------- hlavní vykreslení ---------- */
function m3Step(){M3.t++;const n=MI().length;
 if(M3.sub!=mn.sub){M3.sub=mn.sub;M3.subT0=M3.t;M3.sw={};M3.pkT0=M3.t+2;M3.lastS=-1;M3.row={};M3.quick=1}
 if(M3.lastS!=mn.s){const o=M3.sw[M3.lastS];if(o)o.v-=.035;const s=M3.sw[mn.s];if(s&&s.on)s.v+=.075;M3.card.v+=M3.lastS<0?0:.07;M3.card.k=M3.lastS<0?M3.card.k:0;M3.lastS=mn.s}
 for(let i=0;i<n;i++){let s=M3.sw[i];if(!s)s=M3.sw[i]={a:0,v:0,o:0,ov:0,on:0};if(!s.on){if(M3.t>=M3.pkT0+i*4){s.on=1;s.a=(M3.quick?-.55:-1.15)-hs(i*2.7)*.2;s.v=0}else continue}
  const tg=(hs(i*7.3)-.5)*.05+(M3.go&&M3.go.i==i&&M3.go.t<6?-.08:0);s.v+=(tg-s.a)*.09;s.v*=.81;s.a+=s.v;const to=mn.s==i?1:0;s.ov+=(to-s.o)*.22;s.ov*=.6;s.o+=s.ov}
 const c=M3.card;c.v+=(0-c.a)*.07;c.v*=.88;c.a+=c.v;c.k=Math.min(1,c.k+.14);for(const q in M3.row)if(M3.row[q]>0)M3.row[q]--}
function m3Draw(){const dT=T-M3.lt;if(dT>3||dT<0||M3.t==null)m3Reset();M3.lt=T;const st=Math.max(0,Math.min(3,dT));for(let q=0;q<st;q++)m3Step();const t=M3.t;
 lv=LVK('steppe');li=LVI('steppe');const c0=cam;
 X.fillStyle='#2a0e18';X.fillRect(0,0,W,H);m3Scene(t);M3.dustDraw();
 const lg=X.createLinearGradient(0,0,600,0);lg.addColorStop(0,'rgba(16,4,10,.8)');lg.addColorStop(.5,'rgba(16,4,10,.45)');lg.addColorStop(1,'rgba(16,4,10,0)');X.fillStyle=lg;X.fillRect(0,0,600,H);
 if(mn.sub==3){const k=m3Ease((M3.t-M3.subT0)/16);X.save();X.globalAlpha=1-k;if(k<1){m3Logo(t)}X.restore();m3Settings(t)}else{m3Logo(t);m3Post(t);m3Planks(t)}
 m3Card(t);m3Bar(t);
 if(M3.go){const f=Math.max(0,M3.go.t-8)/10;X.fillStyle='rgba(12,2,4,'+Math.min(1,f)*.7+')';X.fillRect(0,0,W,H)}
 const vg=X.createRadialGradient(W/2,H/2,H*.48,W/2,H/2,H*1.05);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.5)');X.fillStyle=vg;X.fillRect(0,0,W,H);try{grain()}catch(e){}
 if(t<22){X.fillStyle='rgba(0,0,0,'+(1-t/22)+')';X.fillRect(0,0,W,H)}cam=c0}
dMenu=function(){if(mn.sub==2)return dMenuOld();return m3Draw()};
/* ---------- ovládání ---------- */
function m3Go(i){const it=MI()[i];if(!it)return;if(mn.sub==0){if(M3.go)return;M3.go={i,t:0};mn.s=i;sfx('gun');shake=Math.max(shake,4);return}
 if(mn.sub==3){const I=m3SetInfo(it);M3.row[i]=10;if(I.ty=='back'){sfx('uiok');m3Back3();return}if(I.ty=='sld'){m3Adj(i,SV.vol>=1?-10:1);return}if(I.ty=='sel'){const n=MI()[i].startsWith('Obtížnost')?(SV.dif+1)%3:(SV.fx?0:1);if(it.startsWith('Obtížnost')){SV.dif=n}else SV.fx=n;saveSV();sfx('ui');return}if(I.ty=='tog'){SV.sfx=SV.sfx?0:1;saveSV();sfx('uiok');return}}
 act(i)}
function m3Back3(){mn.sub=0;mn.s=Math.max(0,MI().indexOf('Nastavení'))}
{const _s=sfx;sfx=function(n,x){if(M3.mute&&(n=='gun'||n=='uiok'))return;return _s(n,x)}}
updMenu=function(){if(!SV.seenTr){SV.seenTr=1;saveSV();openTrailer();return}if(mn.sub==1){mn.sub=0;mn.s=0;openMap(SV.un);return}
 if(M3.go){M3.go.t++;if(M3.go.t>=18){const i=M3.go.i;M3.go=null;M3.mute=1;try{act(i)}finally{M3.mute=0}}return}
 if(++MIDLE>1800&&mn.sub==0){MIDLE=0;openTrailer();return}
 const n=MI().length;if(P.ArrowDown||P.KeyS){mn.s=(mn.s+1)%n;sfx('ui')}if(P.ArrowUp||P.KeyW){mn.s=(mn.s+n-1)%n;sfx('ui')}
 if(mn.sub==3){const d=(P.ArrowRight||P.KeyD?1:0)-(P.ArrowLeft||P.KeyA?1:0);if(d)m3Adj(mn.s,d)}
 if(P.Enter||P.Space)m3Go(mn.s);if(P.Escape&&mn.sub){sfx('uiok');m3Back3()}};
function m3Hit(x,y){if(mn.sub==3){const G=m3SetGeo();for(let i=0;i<G.it.length;i++){const ry=G.ry(i);if(x>G.x+10&&x<G.x+G.w-10&&y>ry-M3S.rh/2&&y<ry+M3S.rh/2)return{i,G}}return null}
 const R=M3.R||m3Rows();for(const r of R){const w=(r.w||240)*1.06;if(x>M3P.x-30&&x<M3P.x-26+w+20&&y>r.y-r.h/2-3&&y<r.y+r.h/2+3)return{i:r.i}}return null}
{const _mh=mh;mh=function(e,c){if(state!='menu'||mn.sub==2)return _mh(e,c);const r=C.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W,y=(e.clientY-r.top)/r.height*H;MX=x;MY=y;MIDLE=0;if(M3.go)return;
 const h=m3Hit(x,y);if(!h)return;if(mn.s!=h.i){mn.s=h.i;if(!c)sfx('ui')}if(!c)return;auKick();
 if(mn.sub==3){const it=MI()[h.i],I=m3SetInfo(it),G=h.G;if(x>G.cx-10){if(I.ty=='sld'){m3Adj(h.i,0,(x-(G.cx+8))/(G.cw-62));return}if(I.ty=='sel'){m3Adj(h.i,x<G.cx+G.cw/2?-1:1);return}}}
 m3Go(h.i)}}
