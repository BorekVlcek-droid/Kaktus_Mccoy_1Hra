/* =====================================================================
   v75: ÚKOLY – nový systém questů
   - každá oblast má 5 úkolů (boj, plížení, průzkum, mistrovství, boss)
   - průběh se sleduje živě během hraní, splnění hned odmění hvězdami
   - úkoly s podmínkou (čas, bez zranění, poplach, boss) se dají i zmařit
   - za všech 5 úkolů v oblasti šerifská hvězda (+20 ★)
   ===================================================================== */
const QCAT={boj:['BOJ','#c8402a'],pliz:['PLÍŽENÍ','#4a6aa8'],pruz:['PRŮZKUM','#3a8a3a'],mistr:['MISTR','#a8741a'],boss:['BOSS','#7a2a6a']};
function qPl(n,a,b,c){return n==1?a:n>=2&&n<=4?b:c}
function qMMSS(n){return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')}
const QBOSS=['kapitána Anclu','admirála Tiburóna','strážce bažin','El Dinamitera','obřího štíra','Jefeho','strojvůdce expresu','barona'];
/* typ: kategorie, dlouhý text, krátký text (HUD), režim */
const QK={
 kills:{c:'boj',t:n=>'Zneškodni '+n+' enemigos',s:n=>'Zneškodni enemigos'},
 stealth:{c:'pliz',t:n=>'Zneškodni '+n+' '+qPl(n,'enemiga, který','enemigos, kteří','enemigos, kteří')+' o tobě nevěděli',s:n=>'Nepozorované zásahy'},
 air:{c:'boj',t:n=>'Zneškodni '+n+' '+qPl(n,'enemiga','enemigos','enemigos')+' útokem ze vzduchu',s:n=>'Útoky ze vzduchu'},
 boom:{c:'boj',t:n=>'Vyhoď do vzduchu '+n+' '+qPl(n,'enemiga','enemigos','enemigos')+' výbuchem',s:n=>'Výbuchy'},
 throw:{c:'boj',t:n=>'Hoď zvednutého enemiga do jiného'+(n>1?' ('+n+'×)':''),s:n=>'Hod enemigem'},
 wpn:{c:'boj',t:n=>'Zneškodni '+n+' enemigos ukořistěnou zbraní',s:n=>'Ukořistěné zbraně'},
 combo:{c:'mistr',t:n=>'Dosáhni komba '+n+'×',s:n=>'Kombo'},
 coins:{c:'pruz',t:n=>'Posbírej '+n+' hvězd',s:n=>'Hvězdy'},
 seeds:{c:'pruz',t:n=>'Najdi všechna 3 semínka Srdce',s:n=>'Semínka Srdce'},
 free:{c:'pruz',t:n=>'Osvoboď vězně z cely',s:n=>'Osvoboď vězně'},
 rid:{c:'boj',t:n=>'Sestřel '+n+' '+qPl(n,'jezdce','jezdce','jezdců')+' vedle vlaku',s:n=>'Sestřel jezdce'},
 surr:{c:'pliz',t:n=>'Ušetři enemiga, který se vzdá',s:n=>'Ušetři enemiga'},
 noalarm:{c:'pliz',t:n=>'Projdi pevností, aniž tě zachytí světlomet',s:n=>'Bez poplachu',end:1,fail:1,flag:1},
 time:{c:'mistr',t:n=>'Dokonči oblast do '+qMMSS(n),s:n=>'Do '+qMMSS(n),end:1,fail:1},
 nohit:{c:'mistr',t:n=>'Dokonči oblast bez jediného zranění',s:n=>'Bez zranění',end:1,fail:1,flag:1},
 bossnohit:{c:'boss',t:(n,i)=>'Poraz '+QBOSS[i]+' a schytej nejvýš '+n+' '+qPl(n,'zásah','zásahy','zásahů'),s:n=>'Boss: max '+n+' '+qPl(n,'zásah','zásahy','zásahů'),fail:1},
 rank:{c:'mistr',t:n=>'Získej hodnocení A nebo S',s:n=>'Hodnocení A/S',end:1,flag:1}};
/* [typ, cíl, odměna ★] */
const QD=[
 [['kills',8,5],['stealth',2,10],['coins',50,5],['seeds',3,10],['bossnohit',3,15]],
 [['kills',15,5],['combo',10,10],['coins',12,5],['seeds',3,10],['bossnohit',4,15]],
 [['stealth',3,10],['air',2,10],['coins',55,5],['seeds',3,10],['time',300,15]],
 [['boom',2,10],['throw',1,10],['kills',9,5],['seeds',3,10],['bossnohit',3,15]],
 [['wpn',3,10],['surr',1,10],['combo',15,10],['seeds',3,10],['time',330,15]],
 [['noalarm',1,15],['free',1,5],['stealth',4,10],['seeds',3,10],['bossnohit',3,15]],
 [['rid',3,10],['free',1,5],['kills',14,5],['seeds',3,10],['time',390,15]],
 [['free',1,5],['combo',20,10],['nohit',1,20],['seeds',3,10],['rank',1,15]]];
const QMEDAL=20;
function qTxt(i,k){const q=QD[i][k];return QK[q[0]].t(q[1],i)}
function qShort(i,k){const q=QD[i][k];return QK[q[0]].s(q[1],i)}
/* ---------- uložené stavy ---------- */
function qSV(){if(!SV.qd)SV.qd={};if(!SV.qb)SV.qb={};if(!SV.qm)SV.qm={}}
function qMask(i){qSV();return SV.qd[i]|0}
function qDoneEver(i,k){return(qMask(i)>>k&1)==1}
function qCount(i){let n=0;for(let k=0;k<5;k++)if(qDoneEver(i,k))n++;return n}
function qBest(i,k){qSV();return(SV.qb[i]||[])[k]||0}
function qStarsTotal(){let s=0;for(let i=0;i<QD.length;i++)for(let k=0;k<5;k++)if(qDoneEver(i,k))s+=QD[i][k][2];return s}
/* staré „výzvy“ přesměrujeme na nové úkoly (mapa, statistiky) */
CHL.length=0;chMask=function(i){return qMask(i)};chCount=function(i){return qCount(i)};
/* ---------- běh úrovně ---------- */
const QS={ban:[],ui:{exp:0,pin:0,fl:[0,0,0,0,0],sh:[0,0,0,0,0],lv:[0,0,0,0,0]},ctx:{pre:null,mel:0,la:0,d:0,td:0,boom:0,air:0,rng:0,thr:null}};
function qNew(i){return{i,c:{kill:0,stealth:0,air:0,boom:0,throw:0,wpn:0,surr:0,alarm:0,coins:0,free:0},dn:[0,0,0,0,0],fl:[0,0,0,0,0],gain:0,lco:-1,lfr:-1,bossT:0}}
function qOn(){return !!(LS&&LS.q&&!TR2&&lv&&li>=0&&li<QD.length&&LS.q.i==li&&state!='cin')}
function qPlay(){return qOn()&&state=='play'}
{const _li=lsInit;lsInit=function(){_li();if(LS&&!TR2&&li>=0&&li<QD.length){LS.q=qNew(li);QS.ui.exp=420;QS.ui.lv=[0,0,0,0,0];QS.ban=[];QFLY.length=0}}}
/* hodnota průběhu pro úkol */
function qVal(i,k){const q=QD[i][k],L=LS,c=L&&L.q?L.q.c:null;if(!c)return 0;switch(q[0]){
 case'kills':return c.kill;case'stealth':return c.stealth;case'air':return c.air;case'boom':return c.boom;case'throw':return c.throw;case'wpn':return c.wpn;case'surr':return c.surr;
 case'combo':return L.mx|0;case'coins':return c.coins;case'seeds':return seedCount(i);case'free':return c.free;case'rid':return L.rid|0;
 case'time':return Math.floor(L.t/60);case'nohit':return L.dmg>0?1:0;case'noalarm':return c.alarm;case'bossnohit':return L.bh|0;case'rank':return 0}return 0}
/* stav úkolu v aktuálním běhu: 'ever' | 'done' | 'fail' | 'run' */
function qState(k){const q=LS&&LS.q;if(!q)return'run';if(qDoneEver(q.i,k)&&!q.dn[k])return'ever';if(q.dn[k])return'done';if(q.fl[k])return'fail';return'run'}
function qComplete(k,why){const q=LS.q,i=q.i,d=QD[i][k];if(q.dn[k])return;q.dn[k]=1;const first=!qDoneEver(i,k);qSV();if(!first)return;
 SV.qd[i]=qMask(i)|1<<k;SV.st+=d[2];q.gain+=d[2];q.nw=(q.nw||0)|1<<k;saveSV();if(!QS.silent)QS.ban.push({k:'done',i,q:k,rew:d[2],t:0});QS.ui.exp=Math.max(QS.ui.exp,260);QS.ui.fl[k]=60;
 if(qCount(i)==5&&!SV.qm[i]){SV.qm[i]=1;q.medal=1;saveSV();if(!QS.silent)QS.ban.push({k:'medal',i,rew:QMEDAL,t:0})}
 try{const r0=rankIdx(qTotal()-1),r1=rankIdx();if(r1>r0){q.rank=r1;if(!QS.silent)QS.ban.push({k:'rank',i,r:r1,t:0})}}catch(e){}}
function qFail(k){const q=LS.q;if(q.fl[k]||q.dn[k]||qDoneEver(q.i,k))return;q.fl[k]=1;QS.ban.push({k:'fail',i:q.i,q:k,t:0});QS.ui.exp=Math.max(QS.ui.exp,200);QS.ui.sh[k]=30;sfx('deny')}
function qBestSave(){const q=LS&&LS.q;if(!q)return;qSV();const i=q.i,b=SV.qb[i]||[0,0,0,0,0];let ch=0;QD[i].forEach((d,k)=>{const K=QK[d[0]];if(K.end||K.flag||d[0]=='bossnohit')return;const v=Math.min(d[1],qVal(i,k));if(v>(b[k]||0)){b[k]=v;ch=1}});if(ch){SV.qb[i]=b;saveSV()}}
/* každý snímek během hraní */
function qTick(){if(!qPlay())return;const q=LS.q,i=q.i,c=q.c;
 /* sběr hvězd a osvobozené cely – přírůstkově (po návratu na checkpoint se pole obnoví) */
 const nco=co.reduce((a,o)=>a+(o.g?1:0),0);if(q.lco<0||nco<q.lco)q.lco=nco;else if(nco>q.lco){c.coins+=nco-q.lco;q.lco=nco}
 const nfr=(typeof CCELL!='undefined'?CCELL.filter(o=>o.free).length:0);if(q.lfr<0||nfr<q.lfr)q.lfr=nfr;else if(nfr>q.lfr){c.free+=nfr-q.lfr;q.lfr=nfr}
 ens.forEach(e=>{if(e.st=='surr'&&!e._qs){e._qs=1;c.surr++}});
 if(deco.some(d=>d.k=='sl'&&d.al==200))c.alarm++;
 if(bossE&&bossE.st!='dead'&&!(bI>0))q.bossT++;
 QD[i].forEach((d,k)=>{const K=QK[d[0]];if(q.dn[k]||q.fl[k])return;const v=qVal(i,k);
  if(v!=QS.ui.lv[k]){if(!K.end&&!K.fail&&v>QS.ui.lv[k]&&!qDoneEver(i,k)){QS.ui.fl[k]=Math.max(QS.ui.fl[k],36);if(QS.ui.lv[k]>0||v>0)QS.ui.exp=Math.max(QS.ui.exp,150)}QS.ui.lv[k]=v}
  if(qDoneEver(i,k))return;
  switch(d[0]){case'time':if(v>d[1])qFail(k);return;case'nohit':if(v>0)qFail(k);return;case'noalarm':if(v>0)qFail(k);return;case'rank':return;
   case'bossnohit':if(v>d[1])qFail(k);else if(bossE&&bossE.st=='dead'&&isB(bossE))qComplete(k);return}
  if(v>=d[1])qComplete(k)});
 if(T%120==0)qBestSave()}
{const _qu=qUpd;qUpd=function(){_qu();try{qTick()}catch(err){}}}
/* konec úrovně: vyhodnocení podmínek */
{const _or=openRes;openRes=function(next){const q=LS&&LS.q&&!TR2?LS.q:null;QS.silent=1;if(q&&q.i==li){try{QD[li].forEach((d,k)=>{if(q.dn[k]||q.fl[k]||qDoneEver(li,k))return;const v=qVal(li,k);
   if(d[0]=='time'&&v<=d[1])qComplete(k);else if(d[0]=='nohit'&&v==0)qComplete(k);else if(d[0]=='noalarm'&&v==0)qComplete(k);else if(d[0]=='bossnohit'&&v<=d[1])qComplete(k)});qBestSave()}catch(err){}}
 try{_or(next)}finally{QS.silent=0}QS.silent=1;if(q&&RES){try{if(q.i==li){QD[li].forEach((d,k)=>{if(d[0]=='rank'&&!q.dn[k]&&!qDoneEver(li,k)&&(RES.rk=='A'||RES.rk=='S'))qComplete(k)})}}catch(err){}RES.q=q;RES.qi=li}QS.silent=0;QS.ban=[]}}
/* ---------- háčky pro rozpoznání způsobu zneškodnění ---------- */
{const _h=hurtE;hurtE=function(e,d,dir,la,mel){const C=QS.ctx,s0=[C.pre,C.mel,C.la,C.d];C.pre=e&&e.st;C.mel=mel?1:0;C.la=la||0;C.d=d;
 if(C.thr&&e!==C.thr&&qPlay()&&e&&e.st!='dead'&&!AN[e.t])LS.q.c.throw++;
 try{return _h.apply(this,arguments)}finally{C.pre=s0[0];C.mel=s0[1];C.la=s0[2];C.d=s0[3]}}}
{const _t=takedown;takedown=function(e,r){const C=QS.ctx,o=C.td,o2=C.pre;C.td=1;C.pre=e&&e.st;try{return _t.apply(this,arguments)}finally{C.td=o;C.pre=o2}}}
{const _b=blast;blast=function(){QS.ctx.boom++;try{return _b.apply(this,arguments)}finally{QS.ctx.boom--}}}
{const _b=boom;boom=function(){QS.ctx.boom++;try{return _b.apply(this,arguments)}finally{QS.ctx.boom--}}}
{const _a=airHit;airHit=function(){QS.ctx.air++;try{return _a.apply(this,arguments)}finally{QS.ctx.air--}}}
{const _s=slam;slam=function(){QS.ctx.air++;try{return _s.apply(this,arguments)}finally{QS.ctx.air--}}}
{const _b=updBul;updBul=function(){QS.ctx.rng++;try{return _b.apply(this,arguments)}finally{QS.ctx.rng--}}}
{const _t=updThr;updThr=function(){QS.ctx.rng++;try{return _t.apply(this,arguments)}finally{QS.ctx.rng--}}}
{const _t=updThrown;updThrown=function(e){const o=QS.ctx.thr;if(e&&e.st=='thrown')QS.ctx.thr=e;try{return _t.apply(this,arguments)}finally{QS.ctx.thr=o}}}
{const _k=comboKill;comboKill=function(e){_k.apply(this,arguments);try{if(!qPlay()||!e||AN[e.t]||isB(e))return;const C=QS.ctx,c=LS.q.c;c.kill++;
 const un=C.td||['pat','inv','ride'].includes(C.pre);if(un)c.stealth++;
 if(C.boom>0)c.boom++;else if(C.air>0||(C.la==3&&C.d==1.5)||(C.td&&p&&!p.on))c.air++;
 if(p&&p.w&&!C.boom&&!C.td&&(C.mel||C.rng))c.wpn++}catch(err){}}}
/* =====================================================================
   ÚKOLY – rozhraní: ukazatel ve hře, oznámení, pauza, výsledky
   ===================================================================== */
function qIco(cat,x,y,r,dim){const col=(QCAT[cat]||QCAT.boj)[1];X.save();X.translate(x,y);X.fillStyle=dim?'#5a4a3a':col;X.strokeStyle='#1a0a04';X.lineWidth=1.4;X.beginPath();X.arc(0,0,r,0,7);X.fill();X.stroke();
 X.strokeStyle='#fff3d8';X.fillStyle='#fff3d8';X.lineWidth=Math.max(1.3,r*.17);X.lineCap='round';X.lineJoin='round';const s=r*.55;
 if(cat=='boj'){X.beginPath();X.moveTo(-s,-s);X.lineTo(s,s);X.moveTo(s,-s);X.lineTo(-s,s);X.stroke();X.beginPath();X.moveTo(-s*1.15,s*.35);X.lineTo(-s*.35,s*1.15);X.moveTo(s*1.15,s*.35);X.lineTo(s*.35,s*1.15);X.stroke()}
 else if(cat=='pliz'){X.beginPath();X.moveTo(-s*1.25,0);X.quadraticCurveTo(0,-s*1.15,s*1.25,0);X.quadraticCurveTo(0,s*1.15,-s*1.25,0);X.stroke();X.beginPath();X.arc(0,0,s*.4,0,7);X.fill()}
 else if(cat=='pruz'){X.beginPath();X.arc(-s*.2,-s*.2,s*.72,0,7);X.stroke();X.beginPath();X.moveTo(s*.32,s*.32);X.lineTo(s*1.08,s*1.08);X.stroke()}
 else if(cat=='mistr'){X.beginPath();for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,rr=i%2?s*.48:s*1.1;X.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}X.closePath();X.fill()}
 else{X.beginPath();X.arc(0,-s*.15,s*.82,Math.PI*.85,Math.PI*2.15);X.lineTo(s*.45,s*.85);X.lineTo(-s*.45,s*.85);X.closePath();X.fill();X.fillStyle=dim?'#5a4a3a':col;X.beginPath();X.arc(-s*.33,-s*.1,s*.24,0,7);X.arc(s*.33,-s*.1,s*.24,0,7);X.fill()}
 X.restore()}
function qCheck(x,y,s,col){X.save();X.strokeStyle=col||'#7fe07a';X.lineWidth=2.6*s;X.lineCap='round';X.lineJoin='round';X.beginPath();X.moveTo(x-6*s,y);X.lineTo(x-2*s,y+4.5*s);X.lineTo(x+6*s,y-5*s);X.stroke();X.restore()}
function qCross(x,y,s,col){X.save();X.strokeStyle=col||'#ff5a3a';X.lineWidth=2.6*s;X.lineCap='round';X.beginPath();X.moveTo(x-5*s,y-5*s);X.lineTo(x+5*s,y+5*s);X.moveTo(x+5*s,y-5*s);X.lineTo(x-5*s,y+5*s);X.stroke();X.restore()}
function qSheriff(x,y,r,rot,dim){X.save();X.translate(x,y);X.rotate(rot||0);X.fillStyle='rgba(10,4,2,.4)';X.beginPath();X.arc(3,4,r*1.02,0,7);X.fill();
 const P=new Path2D();for(let i=0;i<12;i++){const a=i/12*Math.PI*2-Math.PI/2,rr=i%2?r*.56:r;P.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}P.closePath();
 const g=X.createLinearGradient(0,-r,0,r);if(dim){g.addColorStop(0,'#c8bca4');g.addColorStop(1,'#7a6e5c')}else{g.addColorStop(0,'#fff2a8');g.addColorStop(.5,'#e8b440');g.addColorStop(1,'#a8661a')}X.fillStyle=g;X.fill(P);X.strokeStyle='#3a1a06';X.lineWidth=Math.max(1.4,r*.07);X.stroke(P);
 for(let i=0;i<6;i++){const a=i/6*Math.PI*2-Math.PI/2;X.fillStyle=dim?'#a89c84':'#ffe08a';X.beginPath();X.arc(Math.cos(a)*r,Math.sin(a)*r,r*.13,0,7);X.fill();X.stroke()}
 X.fillStyle=dim?'#9a8e78':'#d8982a';X.beginPath();X.arc(0,0,r*.42,0,7);X.fill();X.stroke();X.fillStyle='rgba(255,255,255,.35)';X.beginPath();X.ellipse(-r*.25,-r*.4,r*.28,r*.12,-.5,0,7);X.fill();X.restore()}
function qValTxt(i,k){const d=QD[i][k],v=qVal(i,k);if(d[0]=='time'){const r=d[1]-v;return qMMSS(Math.max(0,r))}if(d[0]=='nohit'||d[0]=='noalarm')return'zatím ✓';if(d[0]=='rank')return'na konci';if(d[0]=='bossnohit')return v+' / '+d[1];return Math.min(v,d[1])+' / '+d[1]}
function qCountable(d){const K=QK[d[0]];return !K.end&&!K.flag&&d[0]!='bossnohit'}
/* ---------- ukazatel úkolů ve hře (vlevo) ---------- */
function qHud(){const q=LS&&LS.q;if(!q||!p||TR2)return;const i=q.i,U=QS.ui;const tgt=(U.exp>0||U.pin)?1:0;U.ek=(U.ek||0)+(tgt-(U.ek||0))*.16;const e=U.ek;
 U.my=(U.my||0)+((msgT>0&&!(bI>0)?30:0)-(U.my||0))*.2;const HBo=typeof HB!='undefined'&&HB.on,x=14,yb=(HBo?62:94)+(p.w&&!HBo?32:0)+(p.hid?30:0)+U.my,rh=23,w=Math.round(150+e*136),h=Math.round(26+e*(5*rh+8));
 let nd=0;for(let k=0;k<5;k++){const s=qState(k);if(s=='done'||s=='ever')nd++}
 X.save();X.fillStyle='rgba(22,10,6,'+(.6+.2*e)+')';rr(x,yb,w,h,8);X.strokeStyle='rgba(232,184,96,'+(.45+.3*e)+')';X.lineWidth=1.4;X.beginPath();X.roundRect(x+.5,yb+.5,w-1,h-1,8);X.stroke();
 /* záhlaví */X.save();X.translate(x+14,yb+13);X.fillStyle='#e8d0a0';X.fillRect(-6,-7,12,14);X.fillStyle='#b88a4a';X.fillRect(-7,-8,14,3);X.fillRect(-7,5,14,3);X.strokeStyle='#5a3a1a';X.lineWidth=1;for(let j=-3;j<=3;j+=3){X.beginPath();X.moveTo(-4,j);X.lineTo(4,j);X.stroke()}X.restore();
 X.textAlign='left';X.font='14px '+FONT;X.fillStyle='#ffd27a';X.fillText('ÚKOLY',x+28,yb+18);X.font='700 12.5px Georgia';X.fillStyle=nd==5?'#9fe09a':'#f4e2bc';X.fillText(nd+'/5',x+86,yb+18);
 try{const eqs=rwSV().eq.filter(id=>talOwned(id));eqs.forEach((id,k)=>{const tx=x+w+16+k*24,ty=yb+13;X.fillStyle='rgba(22,10,6,.7)';X.beginPath();X.arc(tx,ty,11,0,7);X.fill();X.strokeStyle='rgba(232,184,96,.5)';X.lineWidth=1;X.stroke();talIco(id,tx,ty,8.5)})}catch(err){}
 if(e<.6){X.globalAlpha=1-e/.6;for(let k=0;k<5;k++){const s=qState(k),cx=x+118+k*7;X.fillStyle=s=='done'||s=='ever'?'#ffc84a':s=='fail'?'#c8402a':'rgba(255,230,190,.25)';X.beginPath();X.arc(cx,yb+13,2.6,0,7);X.fill()}X.globalAlpha=1}
 if(e>.5){X.globalAlpha=(e-.5)*2;X.textAlign='right';X.font='11px Georgia';X.fillStyle='rgba(255,230,190,.55)';X.fillText(U.pin?'[U] skrýt':'[U] připnout',x+w-8,yb+17);X.globalAlpha=1}
 if(e>.04){X.save();X.beginPath();X.rect(x,yb+24,w,h-24);X.clip();X.globalAlpha=Math.min(1,e*1.5);
  QD[i].forEach((d,k)=>{const y=yb+28+k*rh+rh/2,st=qState(k),fl=U.fl[k]||0,sh=(U.sh[k]||0)>0?Math.sin(U.sh[k]*1.3)*3:0,done=st=='done'||st=='ever';
   if(fl>0){X.fillStyle='rgba(255,200,90,'+(Math.min(1,fl/40)*.4)+')';X.beginPath();X.roundRect(x+4,y-rh/2+1,w-8,rh-2,5);X.fill()}
   qIco(QK[d[0]].c,x+16+sh,y,8,st=='fail');
   X.font='12.5px Georgia';X.textAlign='left';const tx=qShort(i,k);X.fillStyle=done?'rgba(190,230,160,.8)':st=='fail'?'rgba(230,150,130,.6)':'#f4e2bc';X.fillText(tx,x+30+sh,y+(qCountable(d)&&!done&&st!='fail'?2:4));
   if(done||st=='fail'){const tw=X.measureText(tx).width;X.fillStyle=done?'rgba(160,220,140,.55)':'rgba(255,110,90,.6)';X.fillRect(x+30+sh,y,tw,1.3)}
   if(done)qCheck(x+w-16,y,.75);else if(st=='fail')qCross(x+w-16,y,.7);
   else{const vt=qValTxt(i,k),warn=d[0]=='time'&&d[1]-qVal(i,k)<30;X.textAlign='right';X.font='700 12px Georgia';X.fillStyle=warn?(T%30<15?'#ff7a5a':'#ffd27a'):'#ffd27a';X.fillText(vt,x+w-8,y+4);
    if(qCountable(d)){const f=Math.min(1,qVal(i,k)/d[1]);X.fillStyle='rgba(0,0,0,.45)';X.fillRect(x+30,y+6,w-96,2.5);X.fillStyle=fl>0?'#ffe08a':'#e8a83a';X.fillRect(x+30,y+6,(w-96)*f,2.5)}}});
  X.restore()}
 X.restore()}
/* ---------- oznámení uprostřed nahoře ---------- */
const QFLY=[];
function qBanDur(b){return b.k=='medal'?230:b.k=='rank'?200:b.k=='done'?170:120}
function qBanTick(){const U=QS.ui;if(U.exp>0)U.exp--;for(let k=0;k<5;k++){if(U.fl[k]>0)U.fl[k]--;if(U.sh[k]>0)U.sh[k]--}
 const b=QS.ban[0];if(b){b.t++;if(b.t==1){if(b.k=='done'){sfx('flag');sfx('sparkle')}else if(b.k=='medal'||b.k=='rank'){sfx('win');sfx('heavy')}}
  if(b.k=='done'&&b.t==18){const n=8;for(let j=0;j<n;j++)QFLY.push({x:W/2+52+170+R0(-14,14),y:122+R0(-10,10),c1x:W/2+R0(120,360),c1y:R0(-40,60),tx:W-34,ty:52,t:-j*3,d:34})}
  if(b.t>=qBanDur(b))QS.ban.shift()}
 for(const f of QFLY){f.t++;if(f.t==f.d&&f===QFLY[0])sfx('coin')}for(let j=QFLY.length-1;j>=0;j--)if(QFLY[j].t>QFLY[j].d)QFLY.splice(j,1)}
function qBanners(){const b=QS.ban[0];if(b){const t=b.t,D=qBanDur(b),a=Math.max(0,Math.min(1,t/8,(D-t)/14));if(a>0){const sc=t<14?m3Back(t/14)*.25+.75:1,yo=t>D-14?-(t-(D-14))*3:0;
  X.save();X.globalAlpha=a;X.translate(W/2+52,124+yo);X.scale(sc,sc);
  const big=b.k=='medal'||b.k=='rank',w=big?470:440,h=big?84:68;
  /* plakát */X.fillStyle='rgba(8,2,2,.45)';X.beginPath();X.roundRect(-w/2+5,-h/2+7,w,h,6);X.fill();
  const g=X.createLinearGradient(0,-h/2,0,h/2);if(b.k=='fail'){g.addColorStop(0,'#cbb89a');g.addColorStop(1,'#9a8466')}else{g.addColorStop(0,'#f8ead0');g.addColorStop(1,'#dcc08a')}X.fillStyle=g;X.beginPath();X.moveTo(-w/2,-h/2);for(let q=0;q<=12;q++)X.lineTo(-w/2+q*w/12,-h/2+(hs(q*3.1)-.5)*3);X.lineTo(w/2,h/2);for(let q=12;q>=0;q--)X.lineTo(-w/2+q*w/12,h/2+(hs(q*5.3)-.5)*3);X.closePath();X.fill();X.strokeStyle=b.k=='fail'?'#5a2a1a':'#7a4a1a';X.lineWidth=2;X.stroke();
  X.strokeStyle=b.k=='fail'?'rgba(90,30,20,.4)':'rgba(140,90,30,.45)';X.lineWidth=1;X.strokeRect(-w/2+6,-h/2+6,w-12,h-12);
  /* odznak vlevo */const bx=-w/2+(big?44:34),rot=(1-Math.min(1,t/16))*-2.5;
  if(b.k=='fail'){X.save();X.translate(bx,0);X.rotate(rot);X.fillStyle='#8a1a0a';X.beginPath();X.arc(0,0,28,0,7);X.fill();X.strokeStyle='#2a0604';X.lineWidth=2.4;X.stroke();X.restore();qCross(bx,0,1.9,'#ffe8d8')}
  else{if(big){X.save();X.translate(bx,0);X.rotate(T*.01);X.globalCompositeOperation='lighter';for(let q=0;q<12;q++){X.rotate(Math.PI/6);X.fillStyle='rgba(255,200,90,.18)';X.beginPath();X.moveTo(0,0);X.lineTo(-10,-90);X.lineTo(10,-90);X.closePath();X.fill()}X.restore()}qSheriff(bx,0,big?42:32,rot);if(!big)qCheck(bx,1,1.3,'#5a2a06');else{X.font='18px '+FONT;X.textAlign='center';X.fillStyle='#5a2a06';X.fillText(b.k=='rank'?String(b.r):String(b.i+1),bx,7)}}
  /* texty */X.textAlign='left';const tx0=-w/2+(big?94:72);X.font=(big?'26px ':'22px ')+FONT;X.fillStyle=b.k=='fail'?'#8a1a0a':'#7a2a06';X.fillText(b.k=='done'?'ÚKOL SPLNĚN!':b.k=='fail'?'ÚKOL ZMAŘEN':b.k=='rank'?'NOVÁ HODNOST!':'ŠERIFSKÁ HVĚZDA!',tx0,big?-8:-6);
  X.font='italic 14px Georgia';X.fillStyle='#3a2210';const st=b.k=='medal'?'Talisman „'+TAL.find(o=>o.m==b.i).n+'“ čeká v deníku Úkolů':b.k=='rank'?RANKS[b.r].n+' – odměna čeká v deníku Úkolů':qTxt(b.i,b.q);const ls=wrapL(st,w-(big?190:170));X.fillText(ls[0]+(ls.length>1?'…':''),tx0,big?18:16);
  if(b.k=='medal'||b.k=='rank'){const id=b.k=='medal'?TAL.find(o=>o.m==b.i).id:RANKS[b.r].tal;X.fillStyle='rgba(58,30,12,.85)';X.beginPath();X.arc(w/2-40,0,26,0,7);X.fill();if(id)talIco(id,w/2-40,0,21);else{m3Star(w/2-40,0,16,'#3a1a06');m3Star(w/2-40,0,13,'#ffd44a')}X.textAlign='right';X.font='700 10px Georgia';X.fillStyle='#a8241a';X.fillText('!',w/2-14,-16)}
  else if(b.k!='fail'){X.textAlign='right';X.font=(big?'30px ':'26px ')+FONT;X.lineWidth=5;X.lineJoin='round';X.strokeStyle='#3a1a06';X.strokeText('+'+b.rew,w/2-44,big?12:10);X.fillStyle='#ffd44a';X.fillText('+'+b.rew,w/2-44,big?12:10);m3Star(w/2-26,big?2:0,13,'#3a1a06');m3Star(w/2-26,big?2:0,10.5,'#ffd44a')}
  else{X.textAlign='right';X.font='italic 12px Georgia';X.fillStyle='#5a3a2a';X.fillText('zkus to při dalším průchodu',w/2-16,h/2-10)}
  X.restore()}}
 for(const f of QFLY){if(f.t<0)continue;const u=Math.min(1,f.t/f.d),v=1-u,ez=u*u,x=v*v*f.x+2*v*u*f.c1x+u*u*f.tx,y=v*v*f.y+2*v*u*f.c1y+u*u*f.ty;X.save();X.globalAlpha=Math.min(1,(1-u)*3+.3);m3Star(x,y,7+3*(1-ez),'#3a1a06');m3Star(x,y,5.5+3*(1-ez),'#ffd44a');X.restore()}}
{const _h=hud;hud=function(){_h();try{if(!TR2&&LS&&LS.q&&p&&(state=='play'||state=='over'||state=='poster'||state=='cut')){if(state!='cut')qHud();qBanners()}}catch(err){}}}
{const _qt=qTick;qTick=function(){if(qOn()){if(P.KeyU&&state=='play'){QS.ui.pin=QS.ui.pin?0:1;sfx('cloth')}qBanTick()}return _qt()}}
/* ---------- pauza: deník úkolů vpravo ---------- */
function qPaper(x,y,w,h,seed){X.save();X.fillStyle='rgba(6,2,2,.5)';X.beginPath();X.roundRect(x+6,y+8,w,h,4);X.fill();const g=X.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#f6e8c6');g.addColorStop(1,'#dcc290');X.fillStyle=g;X.beginPath();X.moveTo(x,y);for(let q=0;q<=10;q++)X.lineTo(x+q*w/10,y+(hs(q*3.3+seed)-.5)*3);for(let q=0;q<=12;q++)X.lineTo(x+w+(hs(q*5.1+seed)-.5)*3,y+q*h/12);for(let q=10;q>=0;q--)X.lineTo(x+q*w/10,y+h+(hs(q*7.7+seed)-.5)*4);for(let q=12;q>=0;q--)X.lineTo(x+(hs(q*9.9+seed)-.5)*3,y+q*h/12);X.closePath();X.fill();X.strokeStyle='#7a5228';X.lineWidth=1.6;X.stroke();
 X.save();X.clip();const vg=X.createRadialGradient(x+w/2,y+h/2,40,x+w/2,y+h/2,Math.max(w,h)*.7);vg.addColorStop(0,'rgba(120,70,20,0)');vg.addColorStop(1,'rgba(120,70,20,.3)');X.fillStyle=vg;X.fillRect(x,y,w,h);X.restore();X.restore()}
function qJournal(i,x,y,w,o){o=o||{};const q=LS&&LS.q&&LS.q.i==i?LS.q:null,rh=o.rh||60;
 QD[i].forEach((d,k)=>{const ra=o.ra?o.ra(k):1;if(ra<=0)return;X.save();X.globalAlpha*=ra;X.translate((1-ra)*20,0);const yy=y+k*rh,ev=qDoneEver(i,k),st=q?qState(k):(ev?'ever':'run'),done=st=='done'||st=='ever',fail=st=='fail',K=QK[d[0]];
  X.fillStyle='rgba(122,82,40,.35)';X.fillRect(x,yy+rh-2,w,1);
  qIco(K.c,x+14,yy+18,11,fail);
  X.textAlign='left';X.font='700 9.5px Georgia';X.fillStyle=QCAT[K.c][1];X.fillText(QCAT[K.c][0],x+32,yy+10);
  X.font='13px Georgia';X.fillStyle=done?'#4a6a2a':fail?'#7a4a3a':'#2a1406';const ls=wrapL(qTxt(i,k),w-96);ls.slice(0,2).forEach((l,j)=>X.fillText(l,x+32,yy+25+j*15));
  /* odměna */X.textAlign='right';X.font='700 13px Georgia';X.fillStyle=done?'#8a7a5a':'#8a4a0a';X.fillText('+'+d[2],x+w-18,yy+22);m3Star(x+w-8,yy+18,6.5,done?'#b8a888':'#e8a020');
  /* stav */const sy=yy+rh-12;
  if(done){const ss=o.ss?o.ss(k):1;X.save();X.translate(x+w-40,yy+rh-18);X.rotate(-.12);X.scale(ss,ss);X.strokeStyle=st=='done'?'#2a7a2a':'#6a7a5a';X.lineWidth=1.8;X.strokeRect(-30,-9,60,17);X.font='700 10px Georgia';X.textAlign='center';X.fillStyle=X.strokeStyle;X.fillText(st=='done'&&q&&(q.nw>>k&1)?'SPLNĚNO!':'SPLNĚNO',0,3);X.restore()}
  else if(fail){X.save();X.translate(x+w-40,yy+rh-18);X.rotate(-.1);X.strokeStyle='#a8241a';X.lineWidth=1.8;X.strokeRect(-30,-9,60,17);X.font='700 10px Georgia';X.textAlign='center';X.fillStyle='#a8241a';X.fillText('ZMAŘENO',0,3);X.restore()}
  else if(qCountable(d)){const v=q?qVal(i,k):0,b=Math.max(v,qBest(i,k)),f=Math.min(1,v/d[1]),fb=Math.min(1,b/d[1]),bw=w-120;X.fillStyle='rgba(60,30,10,.2)';X.fillRect(x+32,sy,bw,5);X.fillStyle='rgba(200,140,60,.35)';X.fillRect(x+32,sy,bw*fb,5);X.fillStyle='#c8801e';X.fillRect(x+32,sy,bw*f,5);X.strokeStyle='rgba(60,30,10,.5)';X.lineWidth=1;X.strokeRect(x+32,sy,bw,5);X.textAlign='left';X.font='700 11px Georgia';X.fillStyle='#5a3a1a';X.fillText((q?Math.min(v,d[1]):Math.min(b,d[1]))+' / '+d[1]+(q&&b>v?'  (rekord '+Math.min(b,d[1])+')':''),x+36+bw,sy+5)}
  else{X.textAlign='left';X.font='italic 11px Georgia';X.fillStyle='#6a4a2a';let s='';const v=q?qVal(i,k):0;if(d[0]=='time')s=q?'zbývá '+qMMSS(Math.max(0,d[1]-v)):'limit '+qMMSS(d[1]);else if(d[0]=='nohit')s=q?'zatím bez zranění':'celou oblast bez zásahu';else if(d[0]=='noalarm')s=q?'zatím tě nezachytil':'vyhni se světlometům';else if(d[0]=='bossnohit')s=q?'zásahy od bosse: '+v+' / '+d[1]:'počítají se zásahy v souboji';else if(d[0]=='rank')s='vyhodnotí se na konci oblasti';X.fillText(s,x+32,sy+5)}X.restore()});
 return y+5*rh}
{const _dp=dPause;dPause=function(){_dp();try{if(!LS||!LS.q||TR2)return;const i=LS.q.i,x=W-292,y=96,w=276,h=392;qPaper(x,y,w,h,i*3);
 X.textAlign='left';X.font='18px '+FONT;X.fillStyle='#3a1606';X.fillText('ÚKOLY',x+16,y+28);X.font='italic 13px Georgia';X.fillStyle='#7a4a1e';X.fillText(LV[i].n,x+86,y+28);qSheriff(x+w-24,y+22,13,0,!SV.qm||!SV.qm[i]);X.fillStyle='#7a5228';X.fillRect(x+14,y+36,w-28,1.5);
 qJournal(i,x+12,y+42,w-24,{rh:64});X.textAlign='center';X.font='italic 11.5px Georgia';X.fillStyle='#6a4a2a';X.fillText(SV.qm&&SV.qm[i]?'Šerifská hvězda této oblasti je tvoje!':'Všech 5 = talisman „'+TAL.find(o=>o.m==i).n+'“ + '+QMEDAL+' ★',x+w/2,y+h-12);X.textAlign='left'}catch(err){}}}
/* ---------- výsledky oblasti (nová obrazovka) ---------- */
function qResT(){return 104+5*14+(RES&&RES.q&&RES.q.medal?40:10)}
updRes=function(){if(!RES){state='menu';return}RES.t++;const R=RES,q=R.q;
 if(q){for(let k=0;k<5;k++){const tk=104+k*14+6;if(R.t==tk&&(q.nw>>k&1)){sfx('heavy');sfx('coin');shake=Math.max(shake,4)}}if(q.medal&&R.t==104+5*14+12)sfx('win')}
 if(R.t>50&&(P.Enter||P.Space||kp('attack')||kp('jump'))){if(R.t<qResT()){R.t=qResT();return}const n=R.next;RES=null;sfx('uiok');n()}};
dRes=function(){if(!RES)return;const R=RES,t=R.t,q=R.q,i=R.qi!=null?R.qi:li;X.fillStyle='rgba(6,4,2,'+Math.min(.84,t/20)+')';X.fillRect(0,0,W,H);
 const k0=m3Ease(t/18),x0=34,y0=22,w=892,h=496;X.save();X.translate(0,(1-k0)*40);X.globalAlpha=k0;
 X.fillStyle='rgba(0,0,0,.5)';X.beginPath();X.roundRect(x0+6,y0+8,w,h,14);X.fill();const g=X.createLinearGradient(0,y0,0,y0+h);g.addColorStop(0,'#3e2614');g.addColorStop(1,'#24140a');X.fillStyle=g;X.beginPath();X.roundRect(x0,y0,w,h,14);X.fill();
 X.strokeStyle='rgba(20,8,2,.5)';X.lineWidth=1;for(let yy=y0+30;yy<y0+h;yy+=36){X.beginPath();for(let xx=x0;xx<=x0+w;xx+=30)X.lineTo(xx,yy+Math.sin(xx*.03+yy)*2);X.stroke()}
 X.strokeStyle='#c9a95a';X.lineWidth=2;X.strokeRect(x0+8,y0+8,w-16,h-16);X.strokeStyle='rgba(201,169,90,.35)';X.lineWidth=1;X.strokeRect(x0+13,y0+13,w-26,h-26);
 goldText('OBLAST DOKONČENA',x0+300,y0+58,32,4,k0);X.textAlign='center';X.font='italic 17px Georgia';X.fillStyle='#e9d3a4';X.fillText(R.n,x0+300,y0+84);
 const rows=[['Čas',Math.floor(R.secs/60)+':'+String(R.secs%60).padStart(2,'0')],['Zneškodněno',R.L.k],['Nejvyšší kombo',R.L.mx+'×'],['Utržená zranění',R.L.dmg==0?'žádná!':Math.round(R.L.dmg*10)/10],['Hvězdy',R.stars],['Semínka Srdce',seedCount(i)+' / 3'],['Obtížnost',DIFN[SV.dif]]];
 rows.forEach((r,j)=>{const a=Math.max(0,Math.min(1,(t-10-j*7)/12));X.globalAlpha=a*k0;const yy=y0+128+j*33;X.textAlign='left';X.font='16px Georgia';X.fillStyle='#e9d3a4';X.fillText(r[0],x0+44,yy);X.textAlign='right';X.font='700 17px Georgia';X.fillStyle='#fff';X.fillText(String(r[1]),x0+316,yy);X.fillStyle='rgba(201,169,90,.18)';X.fillRect(x0+42,yy+10,276,1)});X.globalAlpha=k0;
 const sa=Math.max(0,Math.min(1,(t-60)/20)),shown=Math.round(R.sc*sa);X.textAlign='center';X.font='700 14px Georgia';X.fillStyle='#e9d3a4';X.fillText('BODY',x0+438,y0+128);X.font='28px '+FONT;X.fillStyle='#ffd44a';X.fillText(shown,x0+438,y0+162);
 if(t>85){const k=Math.min(1,(t-85)/12),z=1+(1-k)*2;X.save();X.translate(x0+438,y0+262);X.scale(z,z);X.rotate(-.12);X.globalAlpha=k*k0;X.strokeStyle=RKC[R.rk];X.lineWidth=5;X.beginPath();X.arc(0,0,54,0,7);X.stroke();X.lineWidth=1.5;X.beginPath();X.arc(0,0,62,0,7);X.stroke();X.font='88px '+FONT;X.fillStyle=RKC[R.rk];X.textBaseline='middle';X.fillText(R.rk,0,6);X.textBaseline='alphabetic';X.restore();if(t==86){shake=8;sfx('heavy')}}
 if(R.nb&&t>100){X.font='700 16px Georgia';X.fillStyle=T%30<15?'#ffd44a':'#fff';X.fillText('NOVÝ REKORD!',x0+438,y0+352)}
 /* deník úkolů */
 if(i>=0&&i<QD.length){const jx=x0+548,jy=y0+30,jw=330,jh=400,ja=m3Ease((t-90)/16);if(ja>0){X.save();X.globalAlpha=ja*k0;X.translate((1-ja)*30,0);qPaper(jx,jy,jw,jh,i*7);
  X.textAlign='left';X.font='19px '+FONT;X.fillStyle='#3a1606';X.fillText('ÚKOLY OBLASTI',jx+16,jy+30);qSheriff(jx+jw-26,jy+22,14,0,!SV.qm||!SV.qm[i]);X.fillStyle='#7a5228';X.fillRect(jx+14,jy+40,jw-28,1.5);
  qJournal(i,jx+12,jy+46,jw-24,{rh:66,ra:k=>m3Ease((t-104-k*14)/10),ss:k=>{if(!q||!(q.nw>>k&1))return 1;const u=(t-104-k*14-6)/8;return u<0?0:u<1?1+(1-u)*1.6:1}});X.restore()}}
 /* spodní souhrn */
 const ga=q?q.gain:0,ba=m3Ease((t-104-5*14)/14);if(ba>0){X.save();X.globalAlpha=ba*k0;X.textAlign='center';
  if(q&&q.medal){const my=y0+h-58;X.fillStyle='rgba(120,70,10,.35)';X.beginPath();X.roundRect(x0+40,my-22,480,40,8);X.fill();X.strokeStyle='#ffd44a';X.lineWidth=1.5;X.stroke();qSheriff(x0+66,my-2,16,T*.02);X.font='17px '+FONT;X.fillStyle='#ffd44a';X.fillText('ŠERIFSKÁ HVĚZDA! Talisman čeká v deníku Úkolů',x0+300,my+4)}
  else if(ga>0){X.font='700 17px Georgia';X.fillStyle='#ffd44a';X.fillText('Za úkoly získáváš +'+ga+' ★'+(q.rank?'  •  nová hodnost '+RANKS[q.rank].n+'!':''),x0+300,y0+h-54)}
  else if(q){X.font='italic 14px Georgia';X.fillStyle='rgba(233,211,164,.7)';X.fillText('Splněno '+qCount(i)+' z 5 úkolů – vrať se pro zbytek!',x0+300,y0+h-54)}
  X.restore()}
 if(t>50){X.textAlign='center';X.font='14px Georgia';X.fillStyle='rgba(230,220,200,.75)';X.fillText(t<qResT()?'Enter – přeskočit':'Enter – pokračovat',x0+300,y0+h-20)}
 X.restore();X.textAlign='left'};
