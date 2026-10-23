/* =====================================================================
   v76: DENÍK ÚKOLŮ A ODMĚN (samostatná obrazovka)
   karty: ÚKOLY (oblasti vlevo, úkoly vpravo) • ODMĚNY (hodnosti,
   talismany a sloty) • STATISTIKY
   ===================================================================== */
const QM={tab:0,reg:0,cur:0,t:0,pop:null,ret:'menu',hv:null,ft:0};
const QMT=[{t:'ÚKOLY',x:286,w:136},{t:'ODMĚNY',x:430,w:150},{t:'STATISTIKY',x:588,w:176}];
function openQM(ret,reg){state='qmenu';QM.t=0;QM.ret=ret||'menu';QM.pop=null;QM.hv=null;QM.reg=Math.max(0,Math.min(LV.length-1,reg==null?SV.un:reg));QM.tab=rwPend().length?1:0;QM.cur=0;const pd=rwPend();if(pd.length)QM.cur=qmItems().findIndex(it=>it.key==pd[0]);if(QM.cur<0)QM.cur=0;sfx('cloth')}
function closeQM(){sfx('uiok');if(QM.ret=='map'){openMap(MAP.sel)}else{state='menu';mn={s:Math.max(0,MI().indexOf('Úkoly')),sub:0}}}
/* položky karty ODMĚNY (pro kurzor): hodnosti 1..7, talismany 0..8 */
function qmItems(){const a=[];for(let i=1;i<RANKS.length;i++)a.push({k:'rank',i,key:'r'+i});TAL.forEach((t,i)=>a.push({k:'tal',i,id:t.id,key:talKey(t)}));return a}
const QMR={x0:70,x1:890,y:178};
function qmRankX(i){return QMR.x0+(QMR.x1-QMR.x0)*RANKS[i].q/40}
function qmTalRect(i){const c=i%3,r=(i/3)|0;return{x:250+c*230,y:240+r*82,w:222,h:76}}
function qmSlotRect(i){return{x:40,y:262+i*66,w:186,h:56}}
/* ---------- pozadí a rám ---------- */
function qmBg(){X.drawImage(tiCache('m2T',W,H,m2Table),0,0);tiGlow(W/2,-20,420,'255,190,110',.22);
 const sw=Math.sin(T*.02)*.04;X.save();X.translate(W/2,0);X.rotate(sw);X.strokeStyle='#1a0a04';X.lineWidth=2;X.beginPath();X.moveTo(0,0);X.lineTo(0,-4);X.stroke();X.restore()}
function qmTop(){const h=QM.hv||{};m2Plank(14,10,118,36,'◀ ZPĚT',h.k=='back');mRibbon(W/2,30,290,'ÚKOLY A ODMĚNY',1);
 const ri=rankIdx(),R=RANKS[ri],n=qTotal();X.save();const x0=W-294;X.fillStyle='rgba(20,8,4,.6)';X.beginPath();X.roundRect(x0,12,280,32,16);X.fill();X.strokeStyle='rgba(232,184,96,.55)';X.lineWidth=1.2;X.stroke();qSheriff(x0+18,28,10,0,ri==0);X.textAlign='left';X.font='13px '+FONT;X.fillStyle='#ffd27a';X.fillText(R.n,x0+34,33);X.font='700 13px Georgia';X.fillStyle='#f4e2bc';X.textAlign='right';X.fillText(n+'/40  ',x0+222,33);m3Star(x0+236,28,7,'#ffd44a');X.textAlign='left';X.fillStyle='#ffe6a0';X.fillText(String(SV.st),x0+246,33);X.restore();
 const pd=rwPend().length;QMT.forEach((tb,i)=>{const sel=QM.tab==i,hv=h.k=='tab'&&h.i==i;X.save();m2Plank(tb.x,sel?54:58,tb.w,sel?38:32,tb.t,hv||sel);if(sel){X.fillStyle='#ffd27a';X.fillRect(tb.x+14,90,tb.w-28,2.5)}
  if(i==1&&pd){const bx=tb.x+tb.w-6,by=sel?56:60,pu=1+.12*Math.sin(T*.25);X.translate(bx,by);X.scale(pu,pu);X.fillStyle='#c8241a';X.beginPath();X.arc(0,0,11,0,7);X.fill();X.strokeStyle='#fff3dc';X.lineWidth=1.6;X.stroke();X.font='700 13px Georgia';X.textAlign='center';X.fillStyle='#fff';X.fillText(String(pd),0,5)}X.restore()})}
/* ---------- karta ÚKOLY ---------- */
function qmSeal(i,x,y,r,lock){X.save();X.translate(x,y);if(lock){X.fillStyle='#8a7e6c';X.beginPath();X.arc(0,0,r,0,7);X.fill();X.strokeStyle='#4a3e2c';X.lineWidth=1.6;X.stroke();X.fillStyle='#efe2c0';X.fillRect(-4,-1,8,6);X.strokeStyle='#efe2c0';X.lineWidth=1.6;X.beginPath();X.arc(0,-2,2.8,Math.PI,0);X.stroke();X.restore();return}
 const g=X.createRadialGradient(-r*.3,-r*.35,1,0,0,r);g.addColorStop(0,cLt(MPCOL[i],.35));g.addColorStop(1,MPCOL[i]);X.fillStyle=g;X.beginPath();X.arc(0,0,r,0,7);X.fill();X.strokeStyle=cDk(MPCOL[i],.5);X.lineWidth=2;X.stroke();m2Icon(i,r);X.restore()}
function qmRegions(){const h=QM.hv||{};for(let i=0;i<LV.length;i++){const y=100+i*47,lk=i>SV.un,sel=QM.reg==i,hv=h.k=='reg'&&h.i==i,n=qCount(i),pend=SV.qm&&SV.qm[i]&&!rwSV().cl['m'+i];
  X.save();X.fillStyle=sel?'rgba(255,200,110,.22)':hv?'rgba(255,220,160,.1)':'rgba(20,8,4,.45)';X.beginPath();X.roundRect(14,y,254,42,8);X.fill();X.strokeStyle=sel?'#ffd27a':'rgba(232,184,96,.3)';X.lineWidth=sel?2:1;X.stroke();
  qmSeal(i,38,y+21,15,lk);X.textAlign='left';X.font='15px '+FONT;X.fillStyle=lk?'#9a8a78':sel?'#ffe2a0':'#f4e2bc';X.fillText(lk?'???':LV[i].n,60,y+18);
  for(let k=0;k<5;k++)mStar(66+k*11,y+31,4.4,k<n);if(SV.qm&&SV.qm[i])qSheriff(136,y+30,7,0);X.font='700 11px Georgia';X.fillStyle=n==5?'#9fe09a':'rgba(255,230,190,.6)';X.fillText(n+'/5',150,y+35);
  if(pend){const pu=1+.15*Math.sin(T*.25);X.translate(248,y+21);X.scale(pu,pu);X.fillStyle='#c8241a';X.beginPath();X.arc(0,0,9,0,7);X.fill();X.font='700 12px Georgia';X.textAlign='center';X.fillStyle='#fff';X.fillText('!',0,4)}X.restore()}}
function qmClaimBtn(x,y,w,h,txt,hv){const pu=.5+.5*Math.sin(T*.15);X.save();X.shadowColor='rgba(255,210,90,'+(.4+.4*pu)+')';X.shadowBlur=12+6*pu;m2Plank(x,y,w,h,txt,hv,'g');X.restore()}
function qmQuests(){const i=QM.reg,lk=i>SV.un,x=280,y=98,w=664,h=384,h2=QM.hv||{};qPaper(x,y,w,h,i*13+2);
 X.textAlign='left';X.font='700 11px Georgia';X.fillStyle='#8a4a1a';X.fillText('KAPITOLA '+(i+1)+' / '+LV.length,x+20,y+24);X.font='24px '+FONT;X.fillStyle='#2a1206';X.fillText(lk?'Neprozkoumaná oblast':LV[i].n,x+20,y+50);
 const n=qCount(i);X.font='700 13px Georgia';X.fillStyle=n==5?'#2a7a2a':'#7a4a1e';X.fillText('Splněno '+n+' z 5',x+20,y+70);
 /* odměna za oblast */const t=TAL.find(o=>o.m==i),bx=x+w-300,by=y+12,cl=rwSV().cl['m'+i],ready=SV.qm&&SV.qm[i]&&!cl;X.fillStyle=ready?'rgba(255,210,90,.25)':'rgba(122,82,40,.12)';X.beginPath();X.roundRect(bx,by,284,62,8);X.fill();X.strokeStyle=ready?'#c8901a':'rgba(122,82,40,.45)';X.lineWidth=ready?2:1;X.stroke();
 X.font='700 10px Georgia';X.fillStyle='#8a4a1a';X.fillText('ODMĚNA ZA VŠECH 5 ÚKOLŮ',bx+56,by+16);X.fillStyle=cl?'rgba(122,82,40,.12)':'rgba(58,30,12,.85)';X.beginPath();X.arc(bx+28,by+31,22,0,7);X.fill();talIco(t.id,bx+28,by+31,19,!cl&&!ready);
 X.font='14px '+FONT;X.fillStyle='#2a1206';X.fillText(t.n,bx+56,by+34);X.font='700 12px Georgia';X.fillStyle='#8a4a0a';X.fillText('+'+QMEDAL,bx+56,by+52);m3Star(bx+56+X.measureText('+'+QMEDAL).width+9,by+48,6,'#e8a020');X.font='italic 11px Georgia';X.fillStyle='#7a5a3a';X.fillText('a šerifská hvězda',bx+92,by+52);
 if(cl){qCheck(bx+262,by+31,1.1,'#2a8a2a')}else if(ready){qmClaimBtn(bx+178,by+18,100,30,'VYZVEDNI',h2.k=='claimR')}else{X.textAlign='right';X.font='italic 11px Georgia';X.fillStyle='#7a5a3a';X.fillText((5-n)+' zbývá',bx+276,by+36);X.textAlign='left'}
 X.fillStyle='#7a5228';X.fillRect(x+16,y+84,w-32,1.5);
 /* karty úkolů */QD[i].forEach((d,k)=>{const cy=y+94+k*56,ev=qDoneEver(i,k),K=QK[d[0]],cat=QCAT[K.c],cx=x+18,cw=w-36;
  X.fillStyle=ev?'rgba(90,140,60,.12)':'rgba(122,82,40,.1)';X.beginPath();X.roundRect(cx,cy,cw,50,6);X.fill();X.strokeStyle=ev?'rgba(60,120,40,.45)':'rgba(122,82,40,.3)';X.lineWidth=1;X.stroke();
  qIco(K.c,cx+26,cy+25,15,lk);X.font='700 10px Georgia';X.fillStyle=cat[1];X.fillText(cat[0],cx+50,cy+15);
  X.font='15px Georgia';X.fillStyle=lk?'#8a7a64':ev?'#3a6a2a':'#2a1406';X.fillText(qTxt(i,k),cx+50,cy+33);
  if(qCountable(d)&&!ev){const b=Math.min(d[1],qBest(i,k)),bw=200;X.fillStyle='rgba(60,30,10,.18)';X.fillRect(cx+50,cy+40,bw,4);X.fillStyle='#c8801e';X.fillRect(cx+50,cy+40,bw*b/d[1],4);X.font='10px Georgia';X.fillStyle='#7a5a3a';X.fillText('rekord '+b+' / '+d[1],cx+258,cy+45)}
  else if(!ev&&!qCountable(d)){X.font='italic 10.5px Georgia';X.fillStyle='#7a5a3a';X.fillText(d[0]=='time'?'počítá se čas celé oblasti':d[0]=='nohit'?'celou oblast bez zásahu':d[0]=='noalarm'?'žádný světlomet tě nesmí zachytit':d[0]=='bossnohit'?'počítají se zásahy v souboji s bossem':'vyhodnotí se na konci oblasti',cx+50,cy+46)}
  /* odměna */X.textAlign='right';X.font='700 16px '+FONT;X.fillStyle=ev?'#8a9a6a':'#8a4a0a';X.fillText('+'+d[2],cx+cw-34,cy+31);m3Star(cx+cw-20,cy+25,9,ev?'#b8c09a':'#e8a020');X.textAlign='left';
  if(ev){X.save();X.translate(cx+cw-110,cy+26);X.rotate(-.1);X.strokeStyle='#2a7a2a';X.lineWidth=2;X.strokeRect(-36,-11,72,21);X.font='700 11px Georgia';X.textAlign='center';X.fillStyle='#2a7a2a';X.fillText('SPLNĚNO',0,4);X.restore()}});
 if(lk){X.fillStyle='rgba(60,44,30,.45)';X.fillRect(x+12,y+90,w-24,h-100);X.font='20px '+FONT;X.textAlign='center';X.fillStyle='#fff3dc';X.fillText('Oblast je zatím zamčená',x+w/2,y+h/2+40);X.textAlign='left'}
 X.textAlign='center';X.font='italic 11.5px Georgia';X.fillStyle='#6a4a2a';X.fillText('Úkoly plníš přímo během hraní oblasti – hvězdy dostaneš hned, talisman si vyzvedni tady.',x+w/2,y+h-10);X.textAlign='left'}
/* ---------- karta ODMĚNY ---------- */
function qmRanks(){const w=rwSV(),n=qTotal(),ri=rankIdx(),cur=qmItems()[QM.cur],h=QM.hv||{};X.save();X.fillStyle='rgba(20,8,4,.55)';X.beginPath();X.roundRect(20,98,920,126,10);X.fill();X.strokeStyle='rgba(232,184,96,.4)';X.lineWidth=1.2;X.stroke();
 X.textAlign='left';X.font='13px '+FONT;X.fillStyle='#e8c080';X.fillText('HODNOST',40,124);X.font='22px '+FONT;X.fillStyle='#ffd27a';X.fillText(RANKS[ri].n,118,126);const nw=X.measureText(RANKS[ri].n).width;X.font='italic 12px Georgia';X.fillStyle='rgba(255,230,190,.7)';const nx=RANKS[ri+1];X.fillText(nx?'další hodnost „'+nx.n+'“ za '+(nx.q-n)+' '+qPl(nx.q-n,'úkol','úkoly','úkolů'):'nejvyšší hodnost dosažena!',118+nw+14,125);
 const y=QMR.y;X.fillStyle='rgba(0,0,0,.5)';X.beginPath();X.roundRect(QMR.x0,y-5,QMR.x1-QMR.x0,10,5);X.fill();const g=X.createLinearGradient(QMR.x0,0,QMR.x1,0);g.addColorStop(0,'#c86a1a');g.addColorStop(1,'#ffd27a');X.fillStyle=g;X.beginPath();X.roundRect(QMR.x0,y-5,Math.max(10,(QMR.x1-QMR.x0)*Math.min(1,n/40)),10,5);X.fill();
 for(let i=1;i<RANKS.length;i++){const R=RANKS[i],x=qmRankX(i),got=n>=R.q,cl=w.cl['r'+i],pend=got&&!cl,isC=QM.tab==1&&cur&&cur.key=='r'+i,hv=h.k=='rank'&&h.i==i,pu=pend?1+.08*Math.sin(T*.2):1;
  X.save();X.translate(x,y);X.scale(pu*(hv||isC?1.1:1),pu*(hv||isC?1.1:1));if(pend){tiGlow(0,0,34,'255,200,90',.5)}X.fillStyle=cl?'#c8962a':got?'#e8b440':'#5a4a3a';X.beginPath();X.arc(0,0,17,0,7);X.fill();X.strokeStyle=isC?'#fff':'#1a0a04';X.lineWidth=isC?2.4:2;X.stroke();
  if(R.tal)talIco(R.tal,0,0,12,!got);else if(R.slot)rwSlotIco(0,0,17);else{m3Star(0,0,10,got?'#fff3dc':'#8a7e6c')}X.restore();
  X.textAlign='center';X.font='700 10.5px Georgia';X.fillStyle=got?'#ffe2a0':'rgba(255,230,190,.45)';X.fillText(R.n,x,y+34);X.font='10.5px Georgia';X.fillStyle=got?'#f4e2bc':'rgba(255,230,190,.35)';X.fillText(R.st?'+'+R.st+' ★':R.slot?'+1 slot':talById(R.tal).n,x,y+47);
  if(pend){X.font='700 10.5px Georgia';X.fillStyle=T%40<26?'#ffd27a':'#fff3dc';X.fillText('VYZVEDNI!',x,y-24)}else{X.font='700 9.5px Georgia';X.fillStyle='rgba(255,230,190,.5)';X.fillText(R.q+' úk.',x,y-24)}
  if(cl)qCheck(x+12,y-12,.6,'#9fe09a')}
 X.restore()}
function qmTals(){const w=rwSV(),slots=rwSlots(),cur=qmItems()[QM.cur],h=QM.hv||{};
 X.save();X.fillStyle='rgba(20,8,4,.55)';X.beginPath();X.roundRect(20,232,220,248,10);X.fill();X.strokeStyle='rgba(232,184,96,.4)';X.lineWidth=1.2;X.stroke();X.textAlign='left';X.font='14px '+FONT;X.fillStyle='#ffd27a';X.fillText('NASAZENO',36,254);X.font='700 12px Georgia';X.fillStyle='#f4e2bc';X.fillText(w.eq.length+' / '+slots,140,254);
 for(let i=0;i<3;i++){const r=qmSlotRect(i),open=i<slots,id=w.eq[i];X.fillStyle=open?'rgba(255,220,160,.08)':'rgba(0,0,0,.3)';X.beginPath();X.roundRect(r.x,r.y,r.w,r.h,8);X.fill();X.strokeStyle=open?'rgba(232,184,96,.5)':'rgba(120,100,80,.3)';X.setLineDash(id?[]:[4,3]);X.stroke();X.setLineDash([]);
  if(id){const t=talById(id);X.fillStyle='rgba(58,30,12,.85)';X.beginPath();X.arc(r.x+28,r.y+28,22,0,7);X.fill();talIco(id,r.x+28,r.y+28,18);X.font='13px '+FONT;X.fillStyle='#ffe2a0';X.fillText(t.n,r.x+56,r.y+25);X.font='italic 10.5px Georgia';X.fillStyle='rgba(255,230,190,.65)';X.fillText('klikni pro sundání',r.x+56,r.y+42)}
  else if(open){X.font='italic 12px Georgia';X.fillStyle='rgba(255,230,190,.55)';X.fillText('volný slot',r.x+56,r.y+33);rwSlotIco(r.x+28,r.y+28,20)}
  else{X.font='italic 11px Georgia';X.fillStyle='rgba(255,230,190,.4)';const sr=RANKS.map((R,j)=>R.slot?j:-1).filter(j=>j>0),ri=sr[i-1]||-1;X.fillText('zamčeno – hodnost',r.x+56,r.y+24);X.fillText('„'+(ri>0?RANKS[ri].n:'?')+'“',r.x+56,r.y+39);X.fillStyle='#8a7e6c';X.fillRect(r.x+22,r.y+27,12,9);X.strokeStyle='#8a7e6c';X.lineWidth=2;X.beginPath();X.arc(r.x+28,r.y+26,4,Math.PI,0);X.stroke()}}
 X.font='italic 10.5px Georgia';X.fillStyle='rgba(255,230,190,.5)';X.fillText('Talismany platí ve všech',36,466);X.fillText('oblastech, dokud je nosíš.',36,478);X.restore();
 TAL.forEach((t,i)=>{const r=qmTalRect(i),own=talOwned(t.id),key=talKey(t),pend=!own&&rwPend().includes(key),eq=w.eq.includes(t.id),isC=QM.tab==1&&cur&&cur.k=='tal'&&cur.i==i,hv=h.k=='tal'&&h.i==i;
  X.save();if(hv||isC)X.translate(0,-2);X.fillStyle='rgba(6,2,2,.45)';X.beginPath();X.roundRect(r.x+3,r.y+5,r.w,r.h,8);X.fill();
  const g=X.createLinearGradient(0,r.y,0,r.y+r.h);if(own||pend){g.addColorStop(0,'#f6e8c6');g.addColorStop(1,'#dcc290')}else{g.addColorStop(0,'#8a7e6c');g.addColorStop(1,'#5e5446')}X.fillStyle=g;X.beginPath();X.roundRect(r.x,r.y,r.w,r.h,8);X.fill();
  X.strokeStyle=eq?'#2a8a2a':isC?'#fff6d0':hv?'#ffe2a0':pend?'#c8901a':'#3a2410';X.lineWidth=eq||isC||pend?2.6:1.5;X.stroke();if(pend){tiGlow(r.x+r.w/2,r.y+r.h/2,90,'255,200,90',.18+.1*Math.sin(T*.15))}
  X.fillStyle=own?'rgba(58,30,12,.85)':'rgba(30,20,12,.5)';X.beginPath();X.arc(r.x+34,r.y+38,26,0,7);X.fill();talIco(t.id,r.x+34,r.y+38,21,!own&&!pend);
  X.textAlign='left';X.font='14px '+FONT;X.fillStyle=own||pend?'#2a1206':'#2a2018';X.fillText(own||pend?t.n:'???',r.x+66,r.y+20);
  X.font='11px Georgia';X.fillStyle=own||pend?'#4a3018':'#2a2018';const ls=wrapL(t.d,r.w-74);ls.slice(0,2).forEach((l,j)=>X.fillText(l,r.x+66,r.y+36+j*13));
  X.font='700 10px Georgia';if(eq){X.fillStyle='#2a8a2a';X.fillText('✓ NASAZENO',r.x+66,r.y+r.h-7)}else if(own){X.fillStyle='#7a4a1e';X.fillText('klikni pro nasazení',r.x+66,r.y+r.h-7)}else if(pend){X.fillStyle='#a8241a';X.fillText(T%40<26?'VYZVEDNI ODMĚNU!':'',r.x+66,r.y+r.h-7)}else{X.fillStyle='#1a1410';X.fillText(t.m!=null?'Šerifská hvězda: '+(t.m<=SV.un?LV[t.m].n:'???'):'Hodnost: '+RANKS[t.r].n,r.x+66,r.y+r.h-7)}
  X.restore()})}
/* ---------- karta STATISTIKY ---------- */
function qmStats(){const x=180,y=104,w=600,h=372;qPaper(x,y,w,h,77);let ms=0;for(let i=0;i<LV.length;i++)if(SV.qm&&SV.qm[i])ms++;
 const rows=[['Hodnost',RANKS[rankIdx()].n],['Odemčené oblasti',(SV.un+1)+' / '+LV.length],['Splněné úkoly',qTotal()+' / '+LV.length*5],['Šerifské hvězdy',ms+' / '+LV.length],['Talismany',TAL.filter(t=>talOwned(t.id)).length+' / '+TAL.length],['Hvězdy',''+SV.st],['Hvězdy získané z úkolů',''+qStarsTotal()],['Semínka Srdce',seedTotal()+' / '+SEEDP_N()],['Poražení bossové',Object.keys(SV.bd||{}).length+' / '+(Object.keys(BD).length+1)],['Zneškodnění enemigos',''+(SV.tk||0)],['Tiché atentáty',''+(SV.td||0)],['Úspěchy',ACH.filter(a=>SV.ach[a[0]]).length+' / '+ACH.length]];
 X.textAlign='center';X.font='22px '+FONT;X.fillStyle='#2a1206';X.fillText('STATISTIKY',x+w/2,y+34);
 rows.forEach(([a,b],k)=>{const yy=y+62+k*25.5;X.textAlign='left';X.font='14px Georgia';X.fillStyle='#3a2410';X.fillText(a,x+46,yy);X.textAlign='right';X.font='700 14px Georgia';X.fillText(b,x+w-46,yy);X.fillStyle='rgba(122,74,30,.25)';X.fillRect(x+42,yy+7,w-84,1)});X.textAlign='left'}
/* ---------- vyskakovací okno s odměnou ---------- */
function qmPop(){const P0=QM.pop;if(!P0)return;const t=P0.t,I=P0.I,k=m3Back(t/18);X.save();X.fillStyle='rgba(6,2,2,'+Math.min(.78,t/10)+')';X.fillRect(0,0,W,H);
 X.translate(W/2,H/2-20);X.save();X.rotate(T*.006);X.globalCompositeOperation='lighter';for(let q=0;q<16;q++){X.rotate(Math.PI/8);X.fillStyle='rgba(255,200,90,'+(.12*Math.min(1,t/14))+')';X.beginPath();X.moveTo(0,0);X.lineTo(-22,-300);X.lineTo(22,-300);X.closePath();X.fill()}X.restore();
 X.scale(k,k);X.globalAlpha=Math.min(1,t/8);
 X.textAlign='center';goldText('ODMĚNA ZÍSKÁNA!',0,-122,36,4,Math.min(1,t/8));X.font='italic 15px Georgia';X.fillStyle='#e9d3a4';X.fillText(I.title,0,-94);
 X.fillStyle='rgba(58,30,12,.9)';X.beginPath();X.arc(0,-8,62,0,7);X.fill();X.strokeStyle='#ffd27a';X.lineWidth=3;X.stroke();
 if(I.t){X.save();X.translate(0,-8);X.rotate(Math.sin(T*.05)*.08);talIco(I.t.id,0,0,48);X.restore()}else if(I.slot){rwSlotIco(0,-8,64)}else{for(let q=0;q<5;q++){m3Star(-24+q*12,-8-Math.abs(q-2)*-6,16,'#3a1a06');m3Star(-24+q*12,-8-Math.abs(q-2)*-6,13,'#ffd44a')}}
 let yy=78;X.font='22px '+FONT;X.fillStyle='#ffe2a0';if(I.t){X.fillText('Talisman: '+I.t.n,0,yy);yy+=24;X.font='italic 14px Georgia';X.fillStyle='#f4e2bc';X.fillText(I.t.d,0,yy);yy+=24}
 if(I.slot){X.fillText('Nový slot na talisman!',0,yy);yy+=26}
 if(I.st){X.font='26px '+FONT;X.lineWidth=5;X.strokeStyle='#3a1a06';X.strokeText('+'+I.st+' ★',0,yy+6);X.fillStyle='#ffd44a';X.fillText('+'+I.st+' ★',0,yy+6);yy+=30}
 if(I.eq){X.font='700 13px Georgia';X.fillStyle='#9fe09a';X.fillText('✓ rovnou nasazeno do volného slotu',0,yy+4)}
 X.restore();if(t>20){X.textAlign='center';X.font='13px Georgia';X.fillStyle='rgba(255,236,200,.7)';X.fillText(TOUCH?'klepni pro pokračování':'Enter / klik – pokračovat',W/2,H-24);X.textAlign='left'}}
function qmClaim(key){const I=rwClaim(key);if(!I)return;QM.pop={I,t:0};sfx('win');sfx('coin');shake=6;for(let q=0;q<14;q++)QFLY.push({x:W/2+R0(-40,40),y:H/2-20+R0(-30,30),c1x:W/2+R0(-200,200),c1y:R0(0,120),tx:W-50,ty:28,t:-q*2,d:40})}
/* ---------- kreslení obrazovky ---------- */
function dQM(){qmBg();qmTop();const a=Math.min(1,QM.t/12);X.save();X.globalAlpha=a;
 if(QM.tab==0){qmRegions();qmQuests()}else if(QM.tab==1){qmRanks();qmTals()}else qmStats();X.restore();
 X.save();X.textAlign='left';X.font='12px Georgia';X.fillStyle='rgba(255,236,200,.5)';X.fillText(TOUCH?'':(QM.tab==0?'↑↓ oblast  •  ←→ / Tab karta  •  Enter vyzvednout  •  Esc zpět':QM.tab==1?'šipky výběr  •  Enter vyzvednout / nasadit  •  Tab karta  •  Esc zpět':'Tab karta  •  Esc zpět'),16,H-8);X.restore();
 for(const f of QFLY){if(f.t<0)continue;const u=Math.min(1,f.t/f.d),v=1-u,x=v*v*f.x+2*v*u*f.c1x+u*u*f.tx,y=v*v*f.y+2*v*u*f.c1y+u*u*f.ty;m3Star(x,y,8,'#3a1a06');m3Star(x,y,6.5,'#ffd44a')}
 qmPop();if(QM.t<12){X.fillStyle='rgba(0,0,0,'+(1-QM.t/12)+')';X.fillRect(0,0,W,H)}}
/* ---------- ovládání ---------- */
function qmAct(h){if(!h)return;if(h.k=='back')return closeQM();if(h.k=='tab'){if(QM.tab!=h.i){QM.tab=h.i;sfx('cloth')}return}
 if(h.k=='reg'){if(QM.reg!=h.i){QM.reg=h.i;sfx('ui')}return}if(h.k=='claimR')return qmClaim('m'+QM.reg);
 if(h.k=='rank'){QM.cur=h.i-1;const key='r'+h.i;if(rwPend().includes(key))qmClaim(key);else sfx('deny');return}
 if(h.k=='tal'){const t=TAL[h.i];QM.cur=RANKS.length-1+h.i;const key=talKey(t);if(rwPend().includes(key))qmClaim(key);else talToggle(t.id);return}
 if(h.k=='slot'){const id=rwSV().eq[h.i];if(id)talToggle(id);return}}
function qmHit(x,y){if(x>14&&x<132&&y>10&&y<46)return{k:'back'};for(let i=0;i<QMT.length;i++){const b=QMT[i];if(x>b.x&&x<b.x+b.w&&y>54&&y<92)return{k:'tab',i}}
 if(QM.tab==0){for(let i=0;i<LV.length;i++){const yy=100+i*47;if(x>14&&x<268&&y>yy&&y<yy+42)return{k:'reg',i}}const bx=280+664-300+178,by=98+12+18;if(SV.qm&&SV.qm[QM.reg]&&!rwSV().cl['m'+QM.reg]&&x>bx&&x<bx+100&&y>by&&y<by+30)return{k:'claimR'}}
 else if(QM.tab==1){for(let i=1;i<RANKS.length;i++)if(Math.hypot(x-qmRankX(i),y-QMR.y)<22)return{k:'rank',i};for(let i=0;i<TAL.length;i++){const r=qmTalRect(i);if(x>r.x&&x<r.x+r.w&&y>r.y&&y<r.y+r.h)return{k:'tal',i}}for(let i=0;i<3;i++){const r=qmSlotRect(i);if(x>r.x&&x<r.x+r.w&&y>r.y&&y<r.y+r.h)return{k:'slot',i}}}
 return null}
function updQM(){QM.t++;for(const f of QFLY)f.t++;for(let j=QFLY.length-1;j>=0;j--)if(QFLY[j].t>QFLY[j].d)QFLY.splice(j,1);if(shake>0){shake*=.85;if(shake<.3)shake=0}
 if(QM.pop){QM.pop.t++;if(QM.pop.t>20&&(P.Enter||P.Space||P.Escape)){QM.pop=null;sfx('uiok')}return}
 if(P.Escape)return closeQM();if(P.Tab||P.Digit1||P.Digit2||P.Digit3){const n=P.Digit1?0:P.Digit2?1:P.Digit3?2:(QM.tab+1)%3;if(n!=QM.tab){QM.tab=n;sfx('cloth')}return}
 if(QM.tab==0){if(P.ArrowDown||P.KeyS){QM.reg=(QM.reg+1)%LV.length;sfx('ui')}if(P.ArrowUp||P.KeyW){QM.reg=(QM.reg+LV.length-1)%LV.length;sfx('ui')}if(P.ArrowRight||P.KeyD){QM.tab=1;sfx('cloth')}if(P.ArrowLeft||P.KeyA){QM.tab=2;sfx('cloth')}
  if((P.Enter||P.Space)&&SV.qm&&SV.qm[QM.reg]&&!rwSV().cl['m'+QM.reg])qmClaim('m'+QM.reg)}
 else if(QM.tab==1){const its=qmItems(),nR=RANKS.length-1;let c=QM.cur;if(P.ArrowRight||P.KeyD)c=Math.min(its.length-1,c+1);if(P.ArrowLeft||P.KeyA)c=Math.max(0,c-1);
  if(P.ArrowDown||P.KeyS)c=c<nR?nR+Math.min(2,Math.floor(c/2)):Math.min(its.length-1,c+3);if(P.ArrowUp||P.KeyW)c=c<nR?c:c-3<nR?Math.min(nR-1,(c-nR)*2+1):c-3;if(c!=QM.cur){QM.cur=c;sfx('ui')}
  if(P.Enter||P.Space){const it=its[QM.cur];if(it.k=='rank')qmAct({k:'rank',i:it.i});else qmAct({k:'tal',i:it.i})}}
 else{if(P.ArrowRight||P.KeyD){QM.tab=0;sfx('cloth')}if(P.ArrowLeft||P.KeyA){QM.tab=1;sfx('cloth')}}}
function qmMouse(x,y,c){MX=x;MY=y;if(QM.pop){if(c&&QM.pop.t>20){QM.pop=null;sfx('uiok')}return}const h=qmHit(x,y);if(!c){if(h&&(!QM.hv||QM.hv.k!=h.k||QM.hv.i!=h.i))sfx('ui');QM.hv=h;return}auKick();qmAct(h)}
/* ---------- napojení ---------- */
{const _u=upd;upd=function(){if(state=='qmenu'){T++;updQM();return}return _u()}}
{const _ds=drawScene;drawScene=function(){if(state=='qmenu'){X.save();if(shake>1)X.translate(R0(-shake,shake),R0(-shake,shake));dQM();X.restore();return}return _ds()}}
{const _mh=mh;mh=function(e,c){if(state=='qmenu'){const r=C.getBoundingClientRect();qmMouse((e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H,c);return}return _mh(e,c)}}
{const _tt=tTap;tTap=function(x,y){if(state=='qmenu'){qmMouse(x,y,1);return}return _tt(x,y)}}
{const _mw=musWantK;musWantK=function(){if(state=='qmenu')return'menu';return _mw()}}
{const _ac=act;act=function(i){const it=MI()[i];if(state=='menu'&&mn.sub==0&&it=='Úkoly'){sfx('uiok');openQM('menu');return}return _ac(i)}}
{const _ma=mapAct;mapAct=function(k,i){if(k=='quests'){sfx('uiok');openQM('map',MAP.sel);return}return _ma(k,i)}}
addEventListener('keydown',e=>{if(e.code=='Tab'&&(state=='qmenu'||state=='menu'||state=='map'))e.preventDefault()});
