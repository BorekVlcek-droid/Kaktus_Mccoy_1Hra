/* =====================================================================
   v75: NOVÁ MAPA ZÁPADU
   – mapa jako malovaný pergamen na dřevěném stole, vlevo deník oblasti
   – nová krajina: moře, přístav, bažina, hory s dolem, poušť, pevnost,
     železnice a Leviatan; živé vrstvy (vlny, loď, vlak, mraky, supi)
   – mlha nad neprozkoumanými oblastmi, pečetě oblastí, figurka hrdiny
   ===================================================================== */
const MPA={x0:334,y0:60,x1:944,y1:478};
const MP2=[[392,148],[552,100],[470,256],[418,392],[592,420],[700,302],[818,398],[876,148]];
MP2.forEach((q,i)=>{if(MPN[i]){MPN[i][0]=q[0];MPN[i][1]=q[1]}});
const MPCOL=['#4a5e72','#2a6a9a','#4a6a2a','#6a4a2a','#c07a34','#8a3a2a','#3a3a48','#8a1a14'];
const MPLB=[[34,4,'l'],[0,-32,'c'],[0,36,'c'],[0,42,'c'],[0,36,'c'],[0,38,'c'],[38,22,'l'],[0,42,'c']];
const MCOAST=[[334,60],[770,60],[756,82],[728,94],[700,88],[668,106],[632,120],[598,128],[566,140],[530,134],[498,150],[462,160],[432,176],[400,184],[366,178],[334,190]];
const MRAIL=[[690,478],[742,452],[790,420],[818,398],[846,352],[866,300],[880,248],[886,200],[880,166]];
function m2CoastY(x){for(let i=1;i<MCOAST.length;i++){const a=MCOAST[i-1],b=MCOAST[i];if((x<=a[0]&&x>=b[0])||(x>=a[0]&&x<=b[0])){if(a[1]==60&&b[1]==60)continue;const u=(x-a[0])/((b[0]-a[0])||1);return a[1]+(b[1]-a[1])*u}}return 60}
function m2Curve(i){const a=MPN[i],b=MPN[i+1],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1],s=i%2?1:-1;return[a,[mx-dy*.2*s,my+dx*.2*s],b]}
function m2Pt(c,u){const[a,q,b]=c,v=1-u;return[v*v*a[0]+2*v*u*q[0]+u*u*b[0],v*v*a[1]+2*v*u*q[1]+u*u*b[1]]}
function m2Poly(pts,u){let L=0;const seg=[];for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(l);L+=l}let d=u*L;for(let i=0;i<seg.length;i++){if(d<=seg[i]){const k=d/seg[i],a=pts[i],b=pts[i+1];return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,Math.atan2(b[1]-a[1],b[0]-a[0])]}d-=seg[i]}const a=pts[pts.length-2],b=pts[pts.length-1];return[b[0],b[1],Math.atan2(b[1]-a[1],b[0]-a[0])]}
/* ---------- stůl ---------- */
function m2Table(){X.fillStyle='#24140c';X.fillRect(0,0,W,H);pbSeed(31);for(let y=0;y<H;y+=46){const g=X.createLinearGradient(0,y,0,y+46);const b=qr(-.04,.04);g.addColorStop(0,'rgba(120,70,36,'+(.32+b)+')');g.addColorStop(.5,'rgba(90,50,24,'+(.26+b)+')');g.addColorStop(1,'rgba(30,14,6,.5)');X.fillStyle=g;X.fillRect(0,y,W,46);
  X.strokeStyle='rgba(16,6,2,.35)';X.lineWidth=1;for(let k=0;k<5;k++){const yy=y+6+k*8+qr(-2,2);X.beginPath();for(let x=0;x<=W;x+=30)X.lineTo(x,yy+Math.sin(x*.012+k+y)*2.5);X.stroke()}
  X.fillStyle='rgba(0,0,0,.55)';X.fillRect(0,y+44,W,2);const sx=qr(0,W);X.fillStyle='rgba(0,0,0,.4)';X.fillRect(sx,y,2,46)}
 const vg=X.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*1.1);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');X.fillStyle=vg;X.fillRect(0,0,W,H)}
/* ---------- malovaný pergamen ---------- */
function m2PaperPath(){const{x0,y0,x1,y1}=MPA,P=new Path2D();pbSeed(77);P.moveTo(x0,y0);for(let x=x0;x<x1;x+=14)P.lineTo(x,y0+qr(-2.5,2.5));for(let y=y0;y<y1;y+=14)P.lineTo(x1+qr(-2.5,2.5),y);for(let x=x1;x>x0;x-=14)P.lineTo(x,y1+qr(-2.5,2.5));for(let y=y1;y>y0;y-=14)P.lineTo(x0+qr(-2.5,2.5),y);P.closePath();return P}
function m2Blob(x,y,r,col,a){const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba('+col+','+a+')');g.addColorStop(1,'rgba('+col+',0)');X.fillStyle=g;X.fillRect(x-r,y-r,r*2,r*2)}
function m2Mount(x,y,s,snow){X.fillStyle='#e8d6ae';X.beginPath();X.moveTo(x-s,y);X.lineTo(x-s*.1,y-s*1.15);X.lineTo(x+s,y);X.closePath();X.fill();X.fillStyle='rgba(110,80,60,.35)';X.beginPath();X.moveTo(x-s*.1,y-s*1.15);X.lineTo(x+s,y);X.lineTo(x+s*.1,y);X.closePath();X.fill();
 if(snow){X.fillStyle='#fbf6ea';X.beginPath();X.moveTo(x-s*.1,y-s*1.15);X.lineTo(x-s*.38,y-s*.8);X.lineTo(x-s*.18,y-s*.86);X.lineTo(x-s*.02,y-s*.72);X.lineTo(x+s*.28,y-s*.82);X.closePath();X.fill()}
 X.strokeStyle='#4a2e18';X.lineWidth=1.5;X.beginPath();X.moveTo(x-s,y);X.lineTo(x-s*.1,y-s*1.15);X.lineTo(x+s,y);X.stroke();X.lineWidth=.8;for(let k=1;k<6;k++){X.beginPath();X.moveTo(x-s*.1+k*s*.15,y-s*1.15+k*s*.2);X.lineTo(x-s*.1+k*s*.15-s*.12,y);X.stroke()}}
function m2Cactus(x,y,s){X.save();X.translate(x,y);X.scale(s,s);X.fillStyle='#5a8a3a';X.strokeStyle='#22340f';X.lineWidth=1.2;X.beginPath();X.roundRect(-2.5,-15,5,15,2.5);X.fill();X.stroke();X.beginPath();X.roundRect(-8,-11,4,8,2);X.fill();X.stroke();X.beginPath();X.roundRect(4,-9,4,7,2);X.fill();X.stroke();X.restore()}
function m2Tree(x,y,s){X.save();X.translate(x,y);X.scale(s,s);X.strokeStyle='#2a3a18';X.lineWidth=1.6;X.beginPath();X.moveTo(0,0);X.lineTo(0,-14);X.moveTo(0,-8);X.lineTo(-5,-13);X.moveTo(0,-10);X.lineTo(5,-15);X.stroke();X.fillStyle='rgba(70,100,50,.85)';X.beginPath();X.ellipse(0,-16,9,5,0,0,7);X.ellipse(-6,-13,5,3,0,0,7);X.ellipse(6,-15,5,3,0,0,7);X.fill();X.strokeStyle='rgba(60,80,40,.8)';X.lineWidth=.8;for(const dx of[-5,0,4]){X.beginPath();X.moveTo(dx,-14);X.lineTo(dx+.5,-7);X.stroke()}X.restore()}
function m2House(x,y,w,h,col){X.fillStyle=col||'#e2cfa4';X.strokeStyle='#4a2e18';X.lineWidth=1.1;X.fillRect(x,y-h,w,h);X.strokeRect(x,y-h,w,h);X.fillStyle='#8a4a2a';X.beginPath();X.moveTo(x-2,y-h);X.lineTo(x+w/2,y-h-w*.45);X.lineTo(x+w+2,y-h);X.closePath();X.fill();X.stroke();X.fillStyle='#4a2e18';X.fillRect(x+w*.4,y-h*.55,w*.22,h*.55)}
function m2Paint(){const{x0,y0,x1,y1}=MPA,P=m2PaperPath();
 X.save();X.fillStyle='rgba(0,0,0,.5)';X.translate(7,9);X.fill(P);X.restore();
 X.save();X.clip(P);pbSeed(911);
 const g=X.createRadialGradient(640,270,60,640,270,520);g.addColorStop(0,'#f6e9c8');g.addColorStop(.7,'#e8d4a6');g.addColorStop(1,'#cdb17c');X.fillStyle=g;X.fillRect(x0-10,y0-10,x1-x0+20,y1-y0+20);
 for(let i=0;i<70;i++)m2Blob(qr(x0,x1),qr(y0,y1),qr(14,70),'150,110,60',qr(.03,.09));
 X.globalCompositeOperation='multiply';
 /* akvarelové plochy krajin */
 for(let i=0;i<14;i++)m2Blob(470+qr(-70,70),256+qr(-50,50),qr(30,60),'120,160,90',.22);
 for(let i=0;i<12;i++)m2Blob(420+qr(-70,60),395+qr(-50,50),qr(30,60),'150,130,140',.2);
 for(let i=0;i<16;i++)m2Blob(610+qr(-110,110),425+qr(-40,40),qr(30,60),'230,170,90',.22);
 for(let i=0;i<10;i++)m2Blob(705+qr(-60,60),300+qr(-50,50),qr(30,55),'200,120,90',.2);
 for(let i=0;i<10;i++)m2Blob(880+qr(-60,50),150+qr(-70,80),qr(30,70),'110,60,50',.28);
 X.globalCompositeOperation='source-over';
 /* moře */
 X.beginPath();MCOAST.forEach((q,i)=>i?X.lineTo(q[0],q[1]):X.moveTo(q[0],q[1]));X.lineTo(334,60);X.closePath();const sg=X.createLinearGradient(0,60,0,190);sg.addColorStop(0,'#7ab2b0');sg.addColorStop(1,'#a8d2c6');X.fillStyle=sg;X.fill();
 X.save();X.clip();for(let i=0;i<10;i++)m2Blob(qr(340,760),qr(62,150),qr(20,50),'60,120,130',.15);X.restore();
 for(let k=0;k<4;k++){X.strokeStyle='rgba(50,100,110,'+(.4-k*.09)+')';X.lineWidth=1.1;X.beginPath();MCOAST.slice(1,-1).forEach((q,i)=>{const yy=q[1]-5-k*6;i?X.lineTo(q[0]-k*2,yy):X.moveTo(q[0]-k*2,yy)});X.stroke()}
 X.strokeStyle='#4a2e18';X.lineWidth=2.2;X.beginPath();MCOAST.slice(1,-1).forEach((q,i)=>i?X.lineTo(q[0],q[1]):X.moveTo(q[0],q[1]));X.stroke();
 X.strokeStyle='rgba(74,46,24,.35)';X.lineWidth=.8;MCOAST.slice(1,-1).forEach((q,i)=>{if(i%1==0){X.beginPath();X.moveTo(q[0],q[1]);X.lineTo(q[0]+3,q[1]+6);X.stroke()}});
 /* řeka z hor přes bažinu do moře */
 X.lineCap='round';X.strokeStyle='#6aa4ac';X.lineWidth=5;X.beginPath();X.moveTo(452,352);X.bezierCurveTo(430,320,492,300,468,268);X.bezierCurveTo(446,236,500,214,486,186);X.bezierCurveTo(478,170,496,160,500,152);X.stroke();X.strokeStyle='#3a6a74';X.lineWidth=1.1;X.stroke();X.lineCap='butt';
 /* bažina */
 for(let i=0;i<26;i++){const x=qr(410,540),y=qr(210,300);if(Math.hypot(x-470,y-256)<26)continue;X.fillStyle='rgba(90,120,70,'+qr(.25,.45)+')';X.beginPath();X.ellipse(x,y,qr(6,16),qr(3,6),0,0,7);X.fill()}
 for(let i=0;i<9;i++){const x=qr(410,540),y=qr(214,300);if(Math.hypot(x-470,y-256)<34)continue;m2Tree(x,y,qr(.8,1.1))}
 X.strokeStyle='#3a4a1a';X.lineWidth=1;for(let i=0;i<40;i++){const x=qr(405,545),y=qr(212,302);if(Math.hypot(x-470,y-256)<28)continue;X.beginPath();X.moveTo(x,y);X.lineTo(x+qr(-2,2),y-qr(4,9));X.stroke()}
 /* hory a důl */
 const mts=[];for(let i=0;i<30;i++){const x=qr(344,520),y=qr(330,470);if(Math.hypot(x-418,y-392)<34||Math.hypot(x-452,y-352)<10)continue;if(y<350&&x>480)continue;mts.push([x,y,qr(14,28)])}mts.sort((a,b)=>a[1]-b[1]).forEach(([x,y,s])=>m2Mount(x,y,s,s>23));
 X.fillStyle='#2a1a10';X.beginPath();X.arc(448,414,7,Math.PI,0);X.lineTo(455,418);X.lineTo(441,418);X.closePath();X.fill();X.strokeStyle='#5a3a1e';X.lineWidth=1;X.beginPath();X.moveTo(455,418);X.lineTo(486,428);X.moveTo(455,421);X.lineTo(484,432);X.stroke();X.fillStyle='#6a4a2a';X.fillRect(470,420,9,6);
 /* poušť: duny, kaktusy, mesy, městečko */
 X.strokeStyle='rgba(140,96,48,.55)';X.lineWidth=1;for(let i=0;i<16;i++){const x=qr(520,740),y=qr(380,470);if(Math.hypot(x-592,y-420)<30)continue;X.beginPath();X.moveTo(x-14,y);X.quadraticCurveTo(x,y-6,x+14,y);X.stroke()}
 for(let i=0;i<14;i++){const x=qr(520,760),y=qr(372,474);if(Math.hypot(x-592,y-420)<34||Math.hypot(x-660,y-452)<26)continue;m2Cactus(x,y,qr(.7,1.05))}
 [[540,372,26,12],[740,452,30,14]].forEach(([x,y,w,h])=>{X.fillStyle='#d89a6a';X.beginPath();X.moveTo(x-w,y);X.lineTo(x-w*.7,y-h);X.lineTo(x+w*.7,y-h);X.lineTo(x+w,y);X.closePath();X.fill();X.strokeStyle='#4a2e18';X.lineWidth=1.3;X.stroke();X.strokeStyle='rgba(90,50,24,.45)';X.lineWidth=.8;X.beginPath();X.moveTo(x-w*.85,y-h*.45);X.lineTo(x+w*.85,y-h*.45);X.stroke()});
 m2House(644,456,12,9);m2House(660,452,14,12,'#e8d8b0');m2House(678,457,11,8);X.strokeStyle='#4a2e18';X.lineWidth=1;X.beginPath();X.moveTo(667,440);X.lineTo(667,433);X.moveTo(664,436);X.lineTo(670,436);X.stroke();
 X.save();X.translate(560,452);X.strokeStyle='#8a7a64';X.fillStyle='#efe6d4';X.lineWidth=1;X.beginPath();X.ellipse(0,0,6,4,0,0,7);X.fill();X.stroke();X.beginPath();X.moveTo(-5,-2);X.quadraticCurveTo(-12,-8,-10,-12);X.moveTo(5,-2);X.quadraticCurveTo(12,-8,10,-12);X.stroke();X.restore();
 /* mesa s pevností */
 X.fillStyle='#d48a62';X.beginPath();X.moveTo(640,334);X.lineTo(658,312);X.lineTo(744,310);X.lineTo(764,336);X.closePath();X.fill();X.strokeStyle='#4a2e18';X.lineWidth=1.4;X.stroke();X.strokeStyle='rgba(90,40,20,.5)';X.lineWidth=.8;for(let k=0;k<4;k++){X.beginPath();X.moveTo(646+k*3,330-k*4);X.lineTo(758-k*3,330-k*4);X.stroke()}
 X.save();X.translate(746,286);X.fillStyle='#e0cca0';X.strokeStyle='#4a2e18';X.lineWidth=1.2;X.beginPath();for(let k=0;k<10;k++){const a=k/10*Math.PI*2,r=k%2?11:18;X.lineTo(Math.cos(a)*r,Math.sin(a)*r*.55)}X.closePath();X.fill();X.stroke();X.beginPath();X.moveTo(0,-8);X.lineTo(0,-22);X.stroke();X.fillStyle='#a8241a';X.beginPath();X.moveTo(0,-22);X.lineTo(9,-19);X.lineTo(0,-16);X.closePath();X.fill();X.restore();
 /* kaňon */
 X.strokeStyle='#5a3a1e';X.lineWidth=1.6;X.beginPath();X.moveTo(780,210);X.bezierCurveTo(800,240,770,270,800,300);X.bezierCurveTo(820,330,800,350,830,372);X.stroke();X.strokeStyle='rgba(90,58,30,.4)';X.lineWidth=5;X.stroke();
 /* železnice */
 const tr=off=>{X.beginPath();MRAIL.forEach((q,i)=>{const a=MRAIL[Math.max(0,i-1)],b=MRAIL[Math.min(MRAIL.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;i?X.lineTo(q[0]+nx*off,q[1]+ny*off):X.moveTo(q[0]+nx*off,q[1]+ny*off)});X.stroke()};
 X.strokeStyle='#5a3a1e';X.lineWidth=1.1;for(let i=0;i<MRAIL.length-1;i++){const a=MRAIL[i],b=MRAIL[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.floor(L/7),nx=-(b[1]-a[1])/L,ny=(b[0]-a[0])/L;for(let k=0;k<n;k++){const u=k/n,x=a[0]+(b[0]-a[0])*u,y=a[1]+(b[1]-a[1])*u;X.beginPath();X.moveTo(x-nx*6,y-ny*6);X.lineTo(x+nx*6,y+ny*6);X.stroke()}}
 X.strokeStyle='#3a2414';X.lineWidth=1.4;tr(-3.5);tr(3.5);
 /* most přes kaňon */X.strokeStyle='#4a2e18';X.lineWidth=1;for(let k=0;k<5;k++){X.beginPath();X.moveTo(842+k*3,352-k*9);X.lineTo(842+k*3,366-k*9);X.stroke()}
 /* spálená zem a Leviatan */
 X.strokeStyle='rgba(60,20,10,.5)';X.lineWidth=1;for(let i=0;i<14;i++){const a=qr(0,7),r0=qr(30,60),x=876+Math.cos(a)*r0,y=150+Math.sin(a)*r0*.7;X.beginPath();X.moveTo(x,y);X.lineTo(x+Math.cos(a)*qr(10,26),y+Math.sin(a)*qr(8,18));X.stroke()}
 try{X.save();X.globalAlpha=.85;tiLeviSil(0,880,182,.07);X.restore()}catch(e){X.restore()}
 /* přístav a maják */
 m2House(404,176,11,9);m2House(418,172,13,12,'#d8c8a4');m2House(434,178,10,8);X.strokeStyle='#4a2e18';X.lineWidth=1.4;X.beginPath();X.moveTo(380,172);X.lineTo(366,158);X.stroke();X.fillStyle='#4a2e18';X.fillRect(372,166,3,10);
 X.save();X.translate(352,170);X.fillStyle='#f2ead8';X.strokeStyle='#4a2e18';X.lineWidth=1.2;X.beginPath();X.moveTo(-5,8);X.lineTo(-3,-16);X.lineTo(3,-16);X.lineTo(5,8);X.closePath();X.fill();X.stroke();X.fillStyle='#a8241a';X.fillRect(-4,-6,8,4);X.fillStyle='#ffd27a';X.fillRect(-3,-21,6,5);X.strokeRect(-3,-21,6,5);X.restore();
 /* ozdobný rám a nápis */
 X.strokeStyle='rgba(90,58,30,.7)';X.lineWidth=2;X.strokeRect(x0+10,y0+10,x1-x0-20,y1-y0-20);X.lineWidth=.8;X.strokeRect(x0+15,y0+15,x1-x0-30,y1-y0-30);
 [[x0+10,y0+10],[x1-10,y0+10],[x0+10,y1-10],[x1-10,y1-10]].forEach(([x,y])=>{X.save();X.translate(x,y);X.fillStyle='#5a3a1e';X.beginPath();for(let k=0;k<8;k++){const a=k/8*Math.PI*2,r=k%2?2.5:6;X.lineTo(Math.cos(a)*r,Math.sin(a)*r)}X.closePath();X.fill();X.restore()});
 /* růžice */
 X.save();X.translate(906,438);X.strokeStyle='#5a3a1e';X.lineWidth=1.2;X.beginPath();X.arc(0,0,22,0,7);X.stroke();X.beginPath();X.arc(0,0,17,0,7);X.stroke();for(let k=0;k<8;k++){const a=k/8*Math.PI*2,r=k%2?14:30;X.fillStyle=k%4==0?'#7a3a1a':'#efe2c0';X.beginPath();X.moveTo(Math.cos(a)*r,Math.sin(a)*r);X.lineTo(Math.cos(a+Math.PI/2)*4,Math.sin(a+Math.PI/2)*4);X.lineTo(Math.cos(a-Math.PI/2)*4,Math.sin(a-Math.PI/2)*4);X.closePath();X.fill();X.stroke()}X.font='700 10px Georgia';X.fillStyle='#5a3a1e';X.textAlign='center';X.fillText('S',0,-34);X.restore();
 X.font='italic 13px Georgia';X.fillStyle='rgba(70,40,18,.55)';X.textAlign='center';X.fillText('Hory Plata',384,470);X.fillText('Pueblo Seco',664,474);X.fillText('Kaňon',808,200);X.fillText('Mořská zátoka',446,92);
 /* ohořelé okraje, přehyby, textura */
 X.globalCompositeOperation='multiply';const eg=X.createRadialGradient(640,270,200,640,270,460);eg.addColorStop(0,'rgba(255,255,255,0)');eg.addColorStop(1,'rgba(120,70,30,.55)');X.fillStyle=eg;X.fillRect(x0,y0,x1-x0,y1-y0);
 X.globalAlpha=.25;try{X.fillStyle=X.createPattern(pbTex(),'repeat');X.fillRect(x0,y0,x1-x0,y1-y0)}catch(e){}X.globalAlpha=1;X.globalCompositeOperation='source-over';
 X.strokeStyle='rgba(120,90,50,.16)';X.lineWidth=2;X.beginPath();X.moveTo(640,y0);X.lineTo(646,y1);X.moveTo(x0,272);X.lineTo(x1,266);X.stroke();
 X.restore();X.strokeStyle='#7a5228';X.lineWidth=1.5;X.stroke(P)}
/* ---------- ikony oblastí na pečetích ---------- */
function m2Icon(i,r){X.save();X.strokeStyle='#fff3dc';X.fillStyle='#fff3dc';X.lineWidth=Math.max(1.6,r*.13);X.lineCap='round';X.lineJoin='round';const s=r*.55;
 switch(i){
 case 0:X.beginPath();X.arc(0,-s*.85,s*.22,0,7);X.stroke();X.beginPath();X.moveTo(0,-s*.6);X.lineTo(0,s*.95);X.moveTo(-s*.45,-s*.3);X.lineTo(s*.45,-s*.3);X.stroke();X.beginPath();X.arc(0,s*.2,s*.78,Math.PI*.12,Math.PI*.88);X.stroke();break;
 case 1:X.beginPath();X.arc(0,0,s*.62,0,7);X.stroke();X.beginPath();X.arc(0,0,s*.2,0,7);X.fill();for(let k=0;k<8;k++){const a=k/8*Math.PI*2;X.beginPath();X.moveTo(Math.cos(a)*s*.22,Math.sin(a)*s*.22);X.lineTo(Math.cos(a)*s*1.02,Math.sin(a)*s*1.02);X.stroke()}break;
 case 2:for(const[dx,h,a]of[[-s*.45,s*1.6,-.18],[0,s*1.9,0],[s*.45,s*1.5,.18]]){X.save();X.translate(dx,s*.95);X.rotate(a);X.beginPath();X.moveTo(0,0);X.lineTo(0,-h);X.stroke();X.beginPath();X.roundRect(-s*.15,-h*.88,s*.3,h*.36,s*.15);X.fill();X.restore()}break;
 case 3:for(const sd of[-1,1]){X.save();X.rotate(sd*.75);X.beginPath();X.moveTo(0,s*.95);X.lineTo(0,-s*.75);X.stroke();X.beginPath();X.moveTo(-s*.72,-s*.5);X.quadraticCurveTo(0,-s*1.08,s*.72,-s*.5);X.stroke();X.restore()}break;
 case 4:X.lineWidth=Math.max(2,r*.2);X.beginPath();X.moveTo(0,s);X.lineTo(0,-s);X.moveTo(-s*.62,-s*.35);X.lineTo(-s*.62,s*.05);X.quadraticCurveTo(-s*.62,s*.32,0,s*.32);X.moveTo(s*.62,-s*.62);X.lineTo(s*.62,-s*.1);X.quadraticCurveTo(s*.62,s*.12,0,s*.12);X.stroke();break;
 case 5:X.beginPath();X.moveTo(-s*.62,s*.95);X.lineTo(-s*.5,-s*.45);X.lineTo(s*.5,-s*.45);X.lineTo(s*.62,s*.95);X.closePath();X.fill();for(let k=0;k<3;k++)X.fillRect(-s*.62+k*s*.47,-s*.88,s*.3,s*.46);X.fillStyle=MPCOL[5];X.beginPath();X.arc(0,s*.95,s*.3,Math.PI,0);X.fill();break;
 case 6:X.fillRect(-s*.95,-s*.12,s*1.4,s*.62);X.fillRect(s*.1,-s*.7,s*.62,s*.6);X.fillRect(-s*.72,-s*.62,s*.26,s*.52);X.beginPath();X.moveTo(-s*.98,s*.5);X.lineTo(-s*1.2,s*.78);X.lineTo(-s*.75,s*.78);X.closePath();X.fill();X.fillStyle=MPCOL[6];X.lineWidth=1;for(const dx of[-s*.55,0,s*.45]){X.beginPath();X.arc(dx,s*.62,s*.21,0,7);X.fill();X.stroke()}break;
 default:X.beginPath();for(let k=0;k<16;k++){const a=k/16*Math.PI*2,rr=k%2?s*.76:s*1.02;X.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}X.closePath();X.fill();X.fillStyle=MPCOL[7];X.beginPath();X.ellipse(0,0,s*.52,s*.32,0,0,7);X.fill();X.fillStyle='#ffd27a';X.beginPath();X.arc(0,0,s*.18,0,7);X.fill()}
 X.restore()}
function m2Node(i,x,y,lock,pop,hov){const big=i==7,r=big?22:18;X.save();X.translate(x,y);if(pop<1){const s=1+(1-tiE.o(Math.max(0,pop)))*.9;X.scale(s,s)}if(hov&&!lock)X.scale(1.08,1.08);
 X.fillStyle='rgba(30,14,4,.4)';X.beginPath();X.ellipse(2,r*.75,r*1.05,r*.4,0,0,7);X.fill();
 if(lock){X.fillStyle='#a89a84';X.beginPath();X.arc(0,0,r,0,7);X.fill();X.strokeStyle='#6a5a44';X.lineWidth=2;X.stroke();X.fillStyle='#efe2c0';X.fillRect(-6,-2,12,9);X.strokeStyle='#efe2c0';X.lineWidth=2.2;X.beginPath();X.arc(0,-3,4,Math.PI,0);X.stroke();X.restore();return}
 X.beginPath();for(let k=0;k<28;k++){const a=k/28*Math.PI*2,rr=k%2?r:r+2.4;X.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}X.closePath();X.fillStyle=cDk(MPCOL[i],.4);X.fill();
 const g=X.createRadialGradient(-r*.3,-r*.35,2,0,0,r);g.addColorStop(0,cLt(MPCOL[i],.35));g.addColorStop(1,MPCOL[i]);X.fillStyle=g;X.beginPath();X.arc(0,0,r-2.6,0,7);X.fill();
 if(i<SV.un){X.strokeStyle='#ffd27a';X.lineWidth=2.4;X.beginPath();X.arc(0,0,r+4,0,7);X.stroke();X.strokeStyle='rgba(90,50,10,.6)';X.lineWidth=1;X.beginPath();X.arc(0,0,r+5.6,0,7);X.stroke()}
 X.strokeStyle='rgba(255,240,210,.45)';X.lineWidth=1;X.beginPath();X.arc(0,0,r-5.5,0,7);X.stroke();m2Icon(i,r);
 const n=qCount(i);for(let k=0;k<5;k++){const a=Math.PI/2+(k-2)*.34,sx=Math.cos(a)*(r+10),sy=Math.sin(a)*(r+10);mStar(sx,sy,4.3,k<n)}
 if(SV.qm&&SV.qm[i])qSheriff(r*.8,-r*.8,8.5,.2);
 X.restore()}
/* ---------- živá vrstva mapy ---------- */
const M2={sm:[],th:{},thQ:0,pp:null};
function m2Live(){const{x0,y0,x1,y1}=MPA;X.save();X.clip(M2.pp||(M2.pp=m2PaperPath()));
 /* vlnky */X.strokeStyle='rgba(40,90,100,.5)';X.lineWidth=1.1;for(let k=0;k<26;k++){const x=340+((hs(k)*430+T*.12*(.6+hs(k+9)))%430),cy=m2CoastY(x),y=66+hs(k+3)*Math.max(0,cy-84);if(y>cy-10)continue;const a=.3+.5*Math.abs(Math.sin(T*.02+k));X.globalAlpha=a;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+4,y-3,x+8,y);X.quadraticCurveTo(x+12,y-3,x+16,y);X.stroke()}X.globalAlpha=1;
 /* loď */{const bx=640+Math.sin(T*.004)*30,by=86+Math.sin(T*.05)*1.5;X.save();X.translate(bx,by);X.rotate(Math.sin(T*.05)*.05);X.fillStyle='#6a3a1a';X.strokeStyle='#2a1406';X.lineWidth=1.2;X.beginPath();X.moveTo(-18,0);X.lineTo(18,0);X.lineTo(13,7);X.lineTo(-14,7);X.closePath();X.fill();X.stroke();X.beginPath();X.moveTo(-2,0);X.lineTo(-2,-26);X.moveTo(8,0);X.lineTo(8,-18);X.stroke();X.fillStyle='#f4ead8';X.beginPath();X.moveTo(-1,-25);X.quadraticCurveTo(10,-16,-1,-6);X.closePath();X.fill();X.stroke();X.beginPath();X.moveTo(9,-17);X.quadraticCurveTo(17,-11,9,-4);X.closePath();X.fill();X.stroke();X.fillStyle='#1a1a1a';X.beginPath();X.moveTo(-2,-26);X.lineTo(-11,-23);X.lineTo(-2,-21);X.fill();X.restore()}
 /* světlušky v bažině */for(let k=0;k<9;k++){const a=T*.01+k*2.1,x=470+Math.cos(a*1.3+k)*56,y=256+Math.sin(a+k*1.7)*38;tiGlow(x,y,8,'200,255,120',.35+.3*Math.sin(T*.1+k))}
 /* vlak po trati tam a zpět */{const ph=(T*.0012)%2,u=ph<1?ph:2-ph,ue=u*u*(3-2*u),dir=ph<1?1:-1;for(let c=0;c<4;c++){const uc=Math.max(0,Math.min(1,ue-dir*c*.035)),[x,y,a]=m2Poly(MRAIL,uc);X.save();X.translate(x,y-3);X.rotate(a+(dir<0?Math.PI:0));X.fillStyle=c==0?'#2a2a30':'#6a3a1e';X.strokeStyle='#120806';X.lineWidth=1;X.beginPath();X.roundRect(-7,-5,14,8,2);X.fill();X.stroke();if(c==0){X.fillRect(2,-10,3,5);X.fillStyle='#ffd27a';X.fillRect(6,-3,2,3)}X.restore();
   if(c==0&&T%7==0)M2.sm.push({x:x+Math.cos(a)*dir*4,y:y-12,r:3,l:50})}}
 /* kouř z Leviatana */if(T%9==0)M2.sm.push({x:866+R0(-14,14),y:118,r:4,l:90,lv:1});
 M2.sm=M2.sm.filter(s=>{s.l--;s.y-=s.lv?.45:.3;s.x+=s.lv?.15:-.1;s.r+=s.lv?.14:.09;X.fillStyle=s.lv?'rgba(50,30,30,'+(s.l/90*.35)+')':'rgba(240,236,226,'+(s.l/50*.7)+')';X.beginPath();X.arc(s.x,s.y,s.r,0,7);X.fill();return s.l>0});
 tiGlow(876,140,60+5*Math.sin(T*.08),'255,80,40',.28);
 /* supi nad pouští */for(let k=0;k<2;k++){const a=T*.008+k*3,bx=626+Math.cos(a)*(46+k*14),by=372+Math.sin(a)*14,fl=Math.sin(T*.18+k*2);X.save();X.translate(bx,by);X.scale(Math.cos(a+1.57)>0?1:-1,1);X.strokeStyle='#2a1406';X.lineWidth=1.4;X.beginPath();X.moveTo(-7,-fl*3);X.quadraticCurveTo(-3,-3-fl,0,0);X.quadraticCurveTo(3,-3-fl,7,-fl*3);X.stroke();X.restore()}
 /* stíny mraků */for(let k=0;k<3;k++){const w2=x1-x0+360,x=x0-180+((T*.12+k*290)%w2),y=y0+90+k*130+Math.sin(T*.003+k)*20,r=110+k*20;X.save();X.translate(x,y);X.scale(1,.45);const g=X.createRadialGradient(0,0,0,0,0,r);g.addColorStop(0,'rgba(60,40,30,.10)');g.addColorStop(1,'rgba(60,40,30,0)');X.fillStyle=g;X.fillRect(-r,-r,2*r,2*r);X.restore()}
 X.restore()}
function m2Fog(i,a){if(a<=0)return;const[x,y]=MPN[i];pbSeed(i*31+5);for(let k=0;k<8;k++){const ox=qr(-62,62),oy=qr(-44,44),r=qr(36,64),dx=Math.sin(T*.008+k+i)*7,cx=x+ox+dx,cy=y+oy;const g=X.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(238,226,198,'+(.95*a)+')');g.addColorStop(.6,'rgba(234,220,190,'+(.7*a)+')');g.addColorStop(1,'rgba(234,220,190,0)');X.fillStyle=g;X.fillRect(cx-r,cy-r,r*2,r*2)}
 X.save();X.globalAlpha=a;X.font='22px '+FONT;X.textAlign='center';X.fillStyle='rgba(120,90,60,.55)';X.fillText('?',x+30,y-14);X.restore()}
/* ---------- miniatury krajin (malované pozadí úrovně) ---------- */
function m2Thumb(i){if(i in M2.th)return M2.th[i];const sv={};for(const k in PB)sv[k]=PB[k];const lv0=lv,li0=li,c0=cam,cz=camZ;let c=null;
 try{lv=LV[i];li=i;pbBuild();if(PB.ok){c=document.createElement('canvas');c.width=288;c.height=64;const g=c.getContext('2d'),X0=X;X=g;try{cam=Math.round(LV[i].len*.3);camZ=0;X.save();X.scale(.3,.3);X.translate(0,-150);pbDraw();X.restore()}catch(e){}finally{X=X0}}}catch(e){c=null}
 finally{for(const k in PB)delete PB[k];Object.assign(PB,sv);lv=lv0;li=li0;cam=c0;camZ=cz}M2.th[i]=c;return c}
function m2ThumbWork(sel){if(MAP.t>=2&&sel<=SV.un&&!(sel in M2.th))m2Thumb(sel)}
/* ---------- cesta a figurka ---------- */
function m2Paths(){const un=SV.un,A=MAP.anim;for(let i=0;i<MPN.length-1;i++){const c=m2Curve(i),isA=A&&i==A.i-1,done=i<un&&!isA,pr=isA?tiE.io(Math.min(1,A.t/60)):done?1:0;
 X.save();X.lineCap='round';X.setLineDash([2,7]);X.strokeStyle='rgba(90,58,30,.4)';X.lineWidth=2.2;X.beginPath();X.moveTo(c[0][0],c[0][1]);X.quadraticCurveTo(c[1][0],c[1][1],c[2][0],c[2][1]);X.stroke();
 if(pr>0){X.setLineDash([9,6]);X.lineDashOffset=-T*.3;X.strokeStyle='#7a3a12';X.lineWidth=3.2;X.beginPath();X.moveTo(c[0][0],c[0][1]);for(let k=1;k<=26;k++){const q=m2Pt(c,k/26*pr);X.lineTo(q[0],q[1])}X.stroke();
  if(isA&&pr<1){const q=m2Pt(c,pr);X.setLineDash([]);X.fillStyle='#7a3a12';X.beginPath();X.arc(q[0],q[1],3.5,0,7);X.fill()}}X.restore()}}
function m2TokPos(){const tk=MAP.tk,A=MAP.anim;if(tk){const u=Math.min(1,tk.u),ue=tiE.io(u),f=tk.f,t=tk.t;let x,y;if(Math.abs(t-f)==1){const c=m2Curve(Math.min(f,t)),uu=t>f?ue:1-ue;[x,y]=m2Pt(c,uu)}else{x=MPN[f][0]+(MPN[t][0]-MPN[f][0])*ue;y=MPN[f][1]+(MPN[t][1]-MPN[f][1])*ue}
  const hop=Math.abs(Math.sin(u*Math.PI*(2+Math.min(4,Math.abs(t-f))*1.5)))*9;return[x,y-hop,MPN[t][0]>=MPN[f][0]?1:-1,hop]}
 const i=A&&A.t<60?Math.max(0,A.i-1):MAP.sel;return[MPN[i][0],MPN[i][1],MAP.face||1,0]}
function m2Token(){const[x,y,f,hop]=m2TokPos(),r=(MAP.tk?MAP.tk.t:MAP.sel)==7?22:18;MAP.face=f;
 X.fillStyle='rgba(30,14,4,'+(.35-hop*.015)+')';X.beginPath();X.ellipse(x,y+hop-r+6,13-hop*.4,4,0,0,7);X.fill();
 try{tiHero(SV.cls,x,y-r+6,.46,{t:T,every:2,face:f,rim:'rgba(255,230,170,1)',rdx:1,rdy:1,ra:.6})}catch(e){}}
/* ---------- popisky ---------- */
function m2Labels(){X.save();X.textAlign='center';for(let i=0;i<MPN.length;i++){const lk=i>SV.un,[ox,oy,al]=MPLB[i],x=MPN[i][0]+ox,y=MPN[i][1]+oy,t=lk?'???':LV[i].n;X.font='italic 700 12px Georgia';const tw=X.measureText(t).width,ax=al=='l'?x:al=='r'?x-tw:x-tw/2;
 X.fillStyle='rgba(246,236,210,.78)';X.beginPath();X.roundRect(ax-5,y-11,tw+10,16,4);X.fill();X.strokeStyle='rgba(122,82,40,.5)';X.lineWidth=1;X.stroke();X.textAlign='left';X.fillStyle=lk?'#8a7a64':i==MAP.sel?'#7a1a08':'#3a2210';X.fillText(t,ax,y+1)}X.restore()}
/* ---------- deník vlevo ---------- */
const M2PB={x:28,y:438,w:280,h:34};
function m2Panel(i){const x=12,y=58,w=312,h=420,L=LV[i],lk=i>SV.un,b=SV.best&&SV.best[i];X.save();
 qPaper(x,y,w,h,i*5+1);
 /* záložka */X.fillStyle='#a8241a';X.beginPath();X.moveTo(x+w-46,y-6);X.lineTo(x+w-28,y-6);X.lineTo(x+w-28,y+44);X.lineTo(x+w-37,y+36);X.lineTo(x+w-46,y+44);X.closePath();X.fill();X.strokeStyle='#5a0a06';X.lineWidth=1;X.stroke();
 X.textAlign='left';X.font='700 11px Georgia';X.fillStyle='#8a4a1a';X.fillText('KAPITOLA '+(i+1)+' / '+LV.length,x+16,y+22);X.font='22px '+FONT;X.fillStyle='#2a1206';X.fillText(lk?'Neprozkoumáno':L.n,x+16,y+46);
 /* miniatura */const tx=x+12,ty=y+54,tw=288,th=64,tc=lk?null:M2.th[i];X.fillStyle='#2a1a10';X.fillRect(tx-3,ty-3,tw+6,th+6);
 if(tc){X.drawImage(tc,tx,ty)}else{const g=X.createLinearGradient(0,ty,0,ty+th),sk=L.sky||['#333','#777'];g.addColorStop(0,sk[0]);g.addColorStop(1,sk[1]);X.fillStyle=g;X.fillRect(tx,ty,tw,th);const cl=L.col||['#222','#333','#444'];for(let k=0;k<3;k++){X.fillStyle=cl[k];X.beginPath();X.moveTo(tx,ty+th);for(let xx=0;xx<=tw;xx+=16)X.lineTo(tx+xx,ty+th*(.55+k*.13)+Math.sin(xx*.03+k*2+i)*8);X.lineTo(tx+tw,ty+th);X.closePath();X.fill()}}
 if(lk){X.fillStyle='rgba(60,44,30,.75)';X.fillRect(tx,ty,tw,th);X.font='18px '+FONT;X.textAlign='center';X.fillStyle='#e8d8b8';X.fillText('ZAMČENO',tx+tw/2,ty+th/2+2);X.font='italic 11px Georgia';X.fillText('dokonči předchozí oblast',tx+tw/2,ty+th/2+18);X.textAlign='left'}
 X.strokeStyle='#c9a95a';X.lineWidth=1.5;X.strokeRect(tx-1.5,ty-1.5,tw+3,th+3);
 /* boss */const bk=L.bk||(L.snip?'n':null);if(bk){const bx=tx+tw-30,by=ty+th-26,seen=SV.bd&&SV.bd[bk];X.save();X.beginPath();X.arc(bx,by,24,0,7);X.fillStyle='#1a0e08';X.fill();X.clip();try{const md=bMed(bk,{mhp:100,hp:100,gd:0});X.drawImage(md,bx-30,by-28,60,60)}catch(e){}if(!seen){X.fillStyle='rgba(30,20,12,.9)';X.fillRect(bx-26,by-26,52,52);X.font='22px '+FONT;X.textAlign='center';X.fillStyle='#c9a95a';X.fillText('?',bx,by+8);X.textAlign='left'}X.restore();X.strokeStyle=seen?'#ffd27a':'#8a6a3a';X.lineWidth=2;X.beginPath();X.arc(bx,by,24,0,7);X.stroke();X.font='700 9px Georgia';X.textAlign='center';X.fillStyle='#fff';X.strokeStyle='#1a0a04';X.lineWidth=3;X.strokeText('BOSS',bx,by+30);X.fillText('BOSS',bx,by+30);X.textAlign='left'}
 /* rekordy */const sy=ty+th+21;X.font='700 12px Georgia';X.fillStyle='#3a2410';X.fillText('Rekord: '+(b?b.sc:'—'),x+16,sy);X.fillText('Čas: '+(b?qMMSS(b.t):'—'),x+122,sy);
 if(b){X.font='20px '+FONT;X.lineWidth=3;X.strokeStyle='#2a1406';X.strokeText(b.r,x+198,sy+3);X.fillStyle=RKC[b.r]||'#3a2410';X.fillText(b.r,x+198,sy+3)}
 const sm=seedMask(i);for(let k=0;k<3;k++)seedShape(x+236+k*20,sy-5,.42,sm>>k&1);
 X.fillStyle='#7a5228';X.fillRect(x+12,sy+9,w-24,1.5);
 /* úkoly */const qy=sy+27,n=qCount(i);X.font='16px '+FONT;X.fillStyle='#3a1606';X.fillText('ÚKOLY',x+16,qy);X.font='700 12px Georgia';X.fillStyle=n==5?'#2a7a2a':'#7a4a1e';X.fillText(n+' / 5',x+82,qy);
 X.font='italic 11px Georgia';X.fillStyle='#7a5a3a';X.textAlign='right';X.fillText(SV.qm&&SV.qm[i]?'šerifská hvězda získána':'všech 5 = +'+QMEDAL+' ★',x+w-38,qy);X.textAlign='left';qSheriff(x+w-24,qy-5,10,0,!SV.qm||!SV.qm[i]);
 QD[i].forEach((d,k)=>{const yy=qy+6+k*41,ev=qDoneEver(i,k),K=QK[d[0]];if(k<4){X.fillStyle='rgba(122,82,40,.3)';X.fillRect(x+12,yy+40,w-24,1)}
  qIco(K.c,x+26,yy+16,10,false);X.font='12px Georgia';X.fillStyle=ev?'#4a6a2a':'#2a1406';const ls=wrapL(qTxt(i,k),w-112);ls.slice(0,2).forEach((l,j)=>X.fillText(l,x+42,yy+14+j*13));
  if(ev){qCheck(x+w-30,yy+16,1,'#2a8a2a')}else{X.textAlign='right';X.font='700 12px Georgia';X.fillStyle='#8a4a0a';X.fillText('+'+d[2],x+w-32,yy+19);m3Star(x+w-21,yy+15,6,'#e8a020');X.textAlign='left';
   if(qCountable(d)){const bb=Math.min(d[1],qBest(i,k));if(bb>0){const bw=w-150;X.fillStyle='rgba(60,30,10,.2)';X.fillRect(x+42,yy+32,bw,4);X.fillStyle='#c8801e';X.fillRect(x+42,yy+32,bw*bb/d[1],4);X.font='10px Georgia';X.fillStyle='#7a5a3a';X.fillText('nejlépe '+bb+'/'+d[1],x+48+bw,yy+36)}}}});
 X.restore()}
/* ---------- tlačítka ---------- */
function m2Plank(x,y,w,h,t,hov,col,dis){X.save();if(hov&&!dis){X.translate(0,-2)}X.fillStyle='rgba(0,0,0,.45)';X.beginPath();X.roundRect(x+3,y+5,w,h,6);X.fill();
 const g=X.createLinearGradient(0,y,0,y+h);if(col=='g'){g.addColorStop(0,dis?'#8a8a7a':'#8ad06a');g.addColorStop(.5,dis?'#6a6a5a':'#4a9a2a');g.addColorStop(1,dis?'#4a4a3a':'#2a6a14')}else{g.addColorStop(0,hov?'#c8925a':'#9a6a3a');g.addColorStop(.5,hov?'#a8703a':'#7a4e28');g.addColorStop(1,'#4a2a12')}X.fillStyle=g;X.beginPath();X.roundRect(x,y,w,h,6);X.fill();
 X.save();X.clip();X.strokeStyle='rgba(30,12,4,.35)';X.lineWidth=1;for(let k=0;k<3;k++){const yy=y+6+k*(h-12)/2;X.beginPath();for(let xx=x;xx<=x+w;xx+=16)X.lineTo(xx,yy+Math.sin(xx*.05+k*3)*1.4);X.stroke()}X.fillStyle='rgba(255,240,200,.18)';X.fillRect(x,y,w,3);X.restore();
 X.strokeStyle=hov&&!dis?'#ffe2a0':'#1a0a04';X.lineWidth=hov&&!dis?2.2:2;X.beginPath();X.roundRect(x,y,w,h,6);X.stroke();X.fillStyle='#2a2420';for(const nx of[x+8,x+w-8]){X.beginPath();X.arc(nx,y+h/2,2.3,0,7);X.fill()}
 X.textAlign='center';X.font=(h>36?'19px ':'15px ')+FONT;X.lineWidth=4;X.lineJoin='round';X.strokeStyle='rgba(20,6,2,.85)';X.strokeText(t,x+w/2,y+h/2+(h>36?7:5));X.fillStyle=dis?'#c8c0b0':col=='g'?'#fffbe8':'#f6e4bc';X.fillText(t,x+w/2,y+h/2+(h>36?7:5));X.restore()}
const MBT2=[{k:'quests',t:'ÚKOLY'},{k:'ach',t:'ÚSPĚCHY'},{k:'skills',t:'SCHOPNOSTI'},{k:'keys',t:'OVLÁDÁNÍ'},{k:'cls',t:'POSTAVA'}];MBT2.forEach((b,i)=>{b.w=114;b.x=338+i*122});
function m2Bars(){const h=MAP.hv||{};
 m2Plank(14,10,118,36,'◀ ZPĚT',h.k=='back');mRibbon(640,32,250,'MAPA ZÁPADU',1);
 /* počítadla */X.save();const cx0=142;X.fillStyle='rgba(20,8,4,.55)';X.beginPath();X.roundRect(cx0,12,182,32,16);X.fill();X.strokeStyle='rgba(232,184,96,.5)';X.lineWidth=1.2;X.stroke();m3Star(cx0+18,28,8,'#ffd44a');X.textAlign='left';X.font='700 14px Georgia';X.fillStyle='#ffe6a0';X.fillText(String(SV.st),cx0+30,33);seedShape(cx0+78,29,.42,1);X.fillStyle='#a8ffb0';X.fillText(seedTotal()+'',cx0+90,33);qSheriff(cx0+124,28,9,0);let qa=0;for(let j=0;j<LV.length;j++)qa+=qCount(j);X.fillStyle='#ffd27a';X.fillText(qa+'/'+LV.length*5,cx0+137,33);X.restore();
 X.save();X.translate(W-36,28);X.fillStyle='rgba(0,0,0,.5)';X.beginPath();X.arc(1,3,17,0,7);X.fill();const sg=X.createLinearGradient(0,-17,0,17);sg.addColorStop(0,'#c8925a');sg.addColorStop(1,'#5a3418');X.fillStyle=sg;X.beginPath();X.arc(0,0,17,0,7);X.fill();X.strokeStyle=h.k=='snd'?'#ffe2a0':'#1a0a04';X.lineWidth=2;X.stroke();X.fillStyle='#f6e4bc';X.beginPath();X.moveTo(-8,-4);X.lineTo(-3,-4);X.lineTo(2,-9);X.lineTo(2,9);X.lineTo(-3,4);X.lineTo(-8,4);X.closePath();X.fill();
 if(SV.sfx){X.strokeStyle='#f6e4bc';X.lineWidth=1.8;X.beginPath();X.arc(3,0,5.5,-.8,.8);X.stroke();X.beginPath();X.arc(3,0,10,-.8,.8);X.stroke()}else{X.strokeStyle='#ff6a4a';X.lineWidth=2.4;X.beginPath();X.moveTo(6,-5);X.lineTo(13,5);X.moveTo(13,-5);X.lineTo(6,5);X.stroke()}X.restore();
 MBT2.forEach(b=>{m2Plank(b.x,H-50,b.w,32,b.t,h.k==b.k);if(b.k=='quests'){const pd=rwPend().length;if(pd){const pu=1+.12*Math.sin(T*.25);X.save();X.translate(b.x+b.w-6,H-50);X.scale(pu,pu);X.fillStyle='#c8241a';X.beginPath();X.arc(0,0,10,0,7);X.fill();X.strokeStyle='#fff3dc';X.lineWidth=1.5;X.stroke();X.font='700 12px Georgia';X.textAlign='center';X.fillStyle='#fff';X.fillText(String(pd),0,4.5);X.restore()}}});
 const lk=MAP.sel>SV.un;m2Plank(M2PB.x,M2PB.y,M2PB.w,M2PB.h,lk?'ZAMČENO':'HRÁT ▶',h.k=='play',lk?'g':'g',lk);
 X.save();X.textAlign='left';X.font='12px Georgia';X.fillStyle='rgba(255,236,200,.55)';X.fillText(TOUCH?'Klepni na oblast a pak na HRÁT':'←→ oblast  •  Enter hrát  •  Esc zpět',16,H-24);X.restore()}
mapHit=function(x,y){if(x>14&&x<132&&y>10&&y<46)return{k:'back'};if(Math.hypot(x-(W-36),y-28)<19)return{k:'snd'};for(const b of MBT2){if(x>b.x&&x<b.x+b.w&&y>H-50&&y<H-18)return b}
 if(x>M2PB.x&&x<M2PB.x+M2PB.w&&y>M2PB.y&&y<M2PB.y+M2PB.h)return{k:'play'};for(let i=0;i<MPN.length;i++){const q=MPN[i];if(Math.hypot(x-q[0],y-q[1])<26)return{k:'node',i}}return null};
/* ---------- kresba ---------- */
dMap=function(){const t=MAP.t,sel=MAP.sel,A=MAP.anim;m2ThumbWork(sel);
 X.drawImage(tiCache('m2T',W,H,m2Table),0,0);X.drawImage(tiCache('m2P',W,H,m2Paint),0,0);m2Live();m2Paths();
 for(let i=0;i<MPN.length;i++){if(i>SV.un)m2Fog(i,1);else if(A&&i==A.i)m2Fog(i,1-Math.min(1,Math.max(0,(A.t-40)/50)))}
 m2Labels();
 /* výběr: pulzující kruh */{const[x,y]=MPN[sel],pu=.5+.5*Math.sin(T*.1),r=sel==7?22:18;X.save();X.strokeStyle='rgba(170,40,20,'+(.45+.3*pu)+')';X.lineWidth=2.5;X.setLineDash([6,5]);X.lineDashOffset=T*.4;X.beginPath();X.arc(x,y,r+14+pu*3,0,7);X.stroke();X.restore()}
 for(let i=0;i<MPN.length;i++){const lock=i>SV.un||(A&&i==A.i&&A.t<70),pop=!lock&&A&&i==A.i?Math.min(1,(A.t-70)/14):1;m2Node(i,MPN[i][0],MPN[i][1],lock,pop,MAP.hv&&MAP.hv.k=='node'&&MAP.hv.i==i)}
 m2Token();m2Panel(sel);m2Bars();
 if(MAP.ov=='stats')mapStats();
 if(t<16){X.fillStyle='rgba(0,0,0,'+(1-t/16)+')';X.fillRect(0,0,W,H)}};
/* ---------- figurka: plynulý přesun mezi oblastmi ---------- */
{const _om=openMap;openMap=function(sel,fresh){_om(sel,fresh);MAP.ps=MAP.sel;MAP.tk=null;MAP.face=1}}
{const _u=updMap;updMap=function(){_u();if(state!='map')return;const A=MAP.anim;if(A&&A.t==60&&A.i>0){MAP.tk={f:A.i-1,t:A.i,u:0};MAP.ps=A.i}
 if(MAP.ps==null)MAP.ps=MAP.sel;if(MAP.sel!=MAP.ps&&!(A&&A.t<60)){const f=MAP.tk?MAP.tk.t:MAP.ps;MAP.tk={f:MAP.tk&&MAP.tk.u<1?Math.round(MAP.tk.u<.5?MAP.tk.f:MAP.tk.t):f,t:MAP.sel,u:0};MAP.ps=MAP.sel;sfx('step')}
 if(MAP.tk){MAP.tk.u+=1/(16+6*Math.min(5,Math.abs(MAP.tk.t-MAP.tk.f)));if(MAP.tk.u>=1)MAP.tk=null}}}
