/* =====================================================================
   v87: PROGRESE 2.0 – nový systém postupu
   • ZLAŤÁKY ($) = měna (sbírají se v oblastech, platí se schopnosti)
   • HVĚZDY 1–3 za oblast: ★ dokončení • ★ všechna semínka • ★ výzva
   • HVĚZDNÁ CESTA: šerifské hodnosti za hvězdy → sloty, zlaťáky, stopy
   • ZAKÁZKY: 3 v každé oblasti za zlaťáky
   • HLEDANÝ: v každé oblasti jeden bandita s vlastním talismanem
   • ÚSPĚCHY: bronz / stříbro / zlato, každý stupeň má odměnu
   • DENÍK: všechno přehledně na jednom místě
   ===================================================================== */
const PG={ban:[],fly:[],tr:[],last:null,lastC:null,lastSt:null,init:0,hud:{ek:0},nw:0};
const PGSN=['DOKONČENO','SEMÍNKA','VÝZVA'];
/* ---------- hodnosti (Hvězdná cesta) ---------- */
const PGR=[{s:0,n:'Tulák',d:'Začátek cesty'},
 {s:3,n:'Pomocník šerifa',c:60},{s:6,n:'Zástupce šerifa',slot:1},{s:9,n:'Šerif',c:120,tr:'jiskry'},
 {s:12,n:'Maršál',slot:1},{s:15,n:'Strážce zákona',c:200,tr:'hvezdy'},{s:18,n:'Legenda Západu',slot:1},
 {s:21,n:'Postrach Barona',c:300},{s:24,n:'Srdce pouště',tal:'stava',tr:'stava',ti:'Srdce pouště'}];
/* ---------- hledaní bandité ---------- */
const WNT=[{n:'Pepe „Zub“ Vargas',tal:'zub'},{n:'Nacho „Čas“ Leal',tal:'hodinky'},{n:'Chuy „Šála“ Vega',tal:'satek'},{n:'Toro „Bum“ Ríos',tal:'rozbuska'},
 {n:'Paco „Pěst“ Díaz',tal:'boxer'},{n:'Beto „Kůže“ Sanz',tal:'vesta'},{n:'Rico „Kopyto“ Paz',tal:'podkova'},{n:'Gordo „Srdce“ Ruiz',tal:'srdce'}];
/* ---------- stopy (kosmetika) ---------- */
const PGTR={zadna:{n:'Žádná stopa',d:'Čistý prach pod botami.'},jiskry:{n:'Jiskry',d:'Za hodnost Šerif'},hvezdy:{n:'Hvězdný prach',d:'Za hodnost Strážce zákona'},
 ohen:{n:'Žhavé uhlíky',d:'Úspěch Pyrotechnik (zlato)'},kvety:{n:'Okvětní lístky',d:'Úspěch Zahradník (zlato)'},kour:{n:'Stínový kouř',d:'Úspěch Stín (zlato)'},
 noty:{n:'Noty',d:'Úspěch Mistr komba (zlato)'},zlato:{n:'Zlaťáky',d:'Úspěch Boháč (zlato)'},stava:{n:'Šťáva Srdce',d:'Za hodnost Srdce pouště'}};
const PGTK=Object.keys(PGTR);
/* ---------- úspěchy: [id, název, popis(n), statistika, [bronz, stříbro, zlato], zlatá kosmetika] ---------- */
const ACH2=[
 ['kill','Postrach prérie',n=>'Zneškodni '+n+' enemigos',()=>SV.tk|0,[50,250,1000]],
 ['combo','Mistr komba',n=>'Dosáhni komba '+n+'×',()=>pgSV().cmx|0,[15,30,60],'noty'],
 ['stin','Stín',n=>'Zneškodni '+n+' enemigos, kteří o tobě nevěděli',()=>pgSV().sth|0,[10,50,150],'kour'],
 ['boss','Lovec bossů',n=>'Poraz '+n+' '+qPl(n,'bosse','bossy','bossů'),()=>Object.keys(SV.bd||{}).length,[1,4,8]],
 ['star','Hvězdář',n=>'Získej '+n+' hvězd',()=>pgStars(),[6,14,24]],
 ['seed','Zahradník',n=>'Najdi '+n+' semínek Srdce',()=>seedTotal(),[3,12,24],'kvety'],
 ['wnt','Lovec lebek',n=>'Dopadni '+n+' '+qPl(n,'hledaného banditu','hledané bandity','hledaných banditů'),()=>pgWantedN(),[1,4,8]],
 ['zak','Pravá ruka šerifa',n=>'Splň '+n+' zakázek',()=>pgZakN(),[5,12,24]],
 ['earn','Boháč',n=>'Vydělej celkem '+n+' zlaťáků',()=>pgSV().earn|0,[200,800,2000],'zlato'],
 ['boom','Pyrotechnik',n=>'Vyhoď do vzduchu '+n+' enemigos',()=>pgSV().boom|0,[10,40,120],'ohen'],
 ['air','Akrobat',n=>'Zneškodni '+n+' enemigos útokem ze vzduchu',()=>pgSV().air|0,[10,50,150]],
 ['thr','Silák',n=>'Hoď enemigem do jiného '+n+'×',()=>pgSV().thr|0,[3,15,40]],
 ['nohit','Nedotknutelný',n=>'Dokonči '+n+' '+qPl(n,'oblast','oblasti','oblastí')+' bez zranění',()=>pgBits(pgSV().nh),[1,3,6]],
 ['rankS','Hodnocení S',n=>'Získej hodnocení S v '+n+' '+qPl(n,'oblasti','oblastech','oblastech'),()=>pgRankS(),[1,4,8]],
 ['cls','Všestranný',n=>'Dokonči oblast s '+n+' '+qPl(n,'postavou','postavami','postavami'),()=>Object.keys(SV.cu||{}).length,[1,2,4]],
 ['up','Kovář',n=>'Kup '+n+' vylepšení schopností',()=>Object.values(SV.up||{}).reduce((a,b)=>a+b,0),[3,9,18]],
 ['end','Srdce zachráněno',n=>['Dokonči příběh','Dokonči příběh na normální obtížnost','Dokonči příběh na těžkou obtížnost'][n-1],()=>pgSV().endD==null?0:(pgSV().endD|0)+1,[1,2,3]]];
const ACHT=['BRONZ','STŘÍBRO','ZLATO'],ACHC=['#c8803a','#c8ccd4','#ffd44a'],ACHR=[25,60,150];
/* ---------- výzva (★3) a zakázky: nové řádky QD ze starých úkolů ---------- */
const QD_OLD=QD.map(r=>r.map(d=>d.slice()));
const PGCH=[4,4,4,4,4,0,4,4],PGZK=[[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[1,2,4],[0,1,2],[0,1,2]];
for(let i=0;i<QD.length;i++){const o=QD_OLD[i];QD[i]=[o[PGCH[i]].slice(),...PGZK[i].map(k=>{const d=o[k].slice();d[2]=d[2]*3;return d})]}
QK.coins.t=n=>'Posbírej '+n+' zlaťáků';QK.coins.s=n=>'Zlaťáky';
/* ---------- uložení ---------- */
function pgSV(){if(!SV.ps){let o=null;try{o=JSON.parse(localStorage.getItem('kaktus_asasin')||'null')}catch(e){}SV.ps=o&&o.ps&&typeof o.ps=='object'?o.ps:{}}
 const s=SV.ps;['s','z','w','a','tal','own'].forEach(k=>{if(!s[k]||typeof s[k]!='object')s[k]={}});if(!Array.isArray(s.eq))s.eq=[];if(!s.c)s.c={tr:'zadna',ti:''};if(s.rk==null)s.rk=0;
 if(!s.mig){s.mig=1;pgMigrate(s)}return s}
function pgMigrate(s){try{for(let i=0;i<LV.length;i++){let m=0;if((SV.best&&SV.best[i])||i<SV.un)m|=1;if(seedCount(i)>=3)m|=2;const om=SV.qd?SV.qd[i]|0:0;if(om>>PGCH[i]&1)m|=4;let z=0;PGZK[i].forEach((k,j)=>{if(om>>k&1)z|=1<<j});if(m)s.s[i]=m;if(z)s.z[i]=z}
  const w=SV.rw;if(w&&w.cl)TAL.forEach(t=>{if(w.cl[talKey(t)])s.tal[t.id]=1});if(w&&w.eq)s.eq=w.eq.filter(id=>s.tal[id]);
  s.earn=Math.max(s.earn|0,SV.st|0);s.rk=0;for(let r=1;r<PGR.length;r++)if(pgStars()>=PGR[r].s)s.rk=r}catch(e){console.error('pgMig',e)}}
const pgBits=m=>{let n=0;m=m|0;while(m){n+=m&1;m>>=1}return n};
function pgMask(i){return pgSV().s[i]|0}
function pgHas(i,b){return(pgMask(i)>>b&1)==1}
function pgStarsOf(i){return pgBits(pgMask(i))}
function pgStars(){let n=0;for(let i=0;i<LV.length;i++)n+=pgStarsOf(i);return n}
function pgZk(i,j){return((pgSV().z[i]|0)>>j&1)==1}
function pgZakN(){let n=0;for(let i=0;i<LV.length;i++)n+=pgBits(pgSV().z[i]);return n}
function pgWantedN(){return Object.keys(pgSV().w).length}
function pgRankS(){let n=0;for(let i=0;i<LV.length;i++)if(SV.best&&SV.best[i]&&SV.best[i].r=='S')n++;return n}
function pgRankIdx(st){st=st==null?pgStars():st;let r=0;PGR.forEach((R,i)=>{if(st>=R.s)r=i});return r}
function pgSlots(){let n=1;const rk=pgSV().rk|0;for(let i=1;i<=rk;i++)if(PGR[i].slot)n+=PGR[i].slot;return n}
function pgCoins(n,x,y){if(!n)return;SV.st+=n;pgFlyCoins(Math.min(14,4+(n/10|0)),x,y)}
/* nová hra: kampaň od nuly, úspěchy a jejich odměny zůstávají */
{const _d=cs3Do;cs3Do=function(){if(cs.mode=='new'){const s=pgSV();s.s={};s.z={};s.w={};s.tal={};s.eq=[];s.rk=0;s.nh=0;SV.sd={};SV.best={};const tr=s.c.tr;if(['jiskry','hvezdy','stava'].includes(tr))s.c.tr='zadna';saveSV()}return _d()}}

/* ======================= ZLAŤÁKY ======================= */
/* sběratelské předměty v oblastech jsou teď zlaté mince */
dCo=function(c){if(c.g)return;const x=c.x-cam;if(x<-20||x>W+20)return;const y=LY-c.z+Math.sin(T*.08+c.x)*2;hbCoin(x,y-4,8.5,T*.12+c.x);if(T%40==(c.x|0)%40){X.save();X.globalCompositeOperation='lighter';X.fillStyle='rgba(255,250,210,.9)';X.fillRect(x-1,y-14,2,8);X.fillRect(x-4,y-11,8,2);X.restore()}};
/* texty „+1 ★“ u měny → „+1 $“ */
{const _p=pop;pop=function(x,y,z,t,c){if(typeof t=='string'&&t.indexOf('★')>=0&&!PG.starPop)t=t.replace(/★/g,'$');return _p.call(this,x,y,z,t,c)}}
/* létající mince k počítadlu v liště */
function pgFlyCoins(n,x,y){const sx=x==null?W/2:x,sy=y==null?150:y;let ty=H-40;try{if(typeof HB!='undefined'&&HB.on)ty=hbY0()+19}catch(e){}for(let j=0;j<n;j++)PG.fly.push({x:sx+R0(-20,20),y:sy+R0(-12,12),c1x:sx+R0(-160,60),c1y:sy-R0(40,140),tx:68,ty,t:-j*3,d:36+j})}

/* ======================= HVĚZDY OBLASTÍ ======================= */
function pgStar(i,b){const s=pgSV();if(i<0||i>=LV.length||TR2)return;if(pgHas(i,b))return;s.s[i]=pgMask(i)|1<<b;saveSV();PG.nw++;if(!PG.quiet)pgBan({k:'star',i,b});pgRankCheck();pgAchCheck()}
/* zakázky a výzva běží na úkolovém stroji z v75: index 0 = výzva (★3), 1–3 = zakázky */
qDoneEver=function(i,k){return k==0?pgHas(i,2):pgZk(i,k-1)};
qCount=function(i){let n=0;for(let j=0;j<3;j++)if(pgZk(i,j))n++;return n};
qTotal=function(){return pgZakN()};
qComplete=function(k,why){const q=LS&&LS.q;if(!q||q.dn[k])return;q.dn[k]=1;const i=q.i;if(qDoneEver(i,k))return;QS.ui.fl[k]=60;QS.ui.exp=Math.max(QS.ui.exp,260);
 if(k==0){q.nw=(q.nw||0)|1;pgStar(i,2);return}
 const s=pgSV();s.z[i]=(s.z[i]|0)|1<<(k-1);const rew=QD[i][k][2];q.gain=(q.gain||0)+rew;q.nw=(q.nw||0)|1<<k;pgCoins(rew,W/2,140);saveSV();PG.nw++;pgBan({k:'zak',i,q:k,rew});pgAchCheck()};
qFail=function(k){const q=LS&&LS.q;if(!q||q.fl[k]||q.dn[k]||qDoneEver(q.i,k))return;q.fl[k]=1;QS.ui.exp=Math.max(QS.ui.exp,200);QS.ui.sh[k]=30;sfx('deny');pgBan({k:'fail',i:q.i,q:k})};
/* semínka: +10 $ a při třetím ★ */
{const _s=seedUpd;seedUpd=function(){const n0=TR2?0:seedCount(li);_s();if(!TR2&&lv&&seedCount(li)>n0&&seedCount(li)>=3)pgStar(li,1)}}
/* konec oblasti: ★ dokončení, statistiky pro úspěchy */
{const _o=openRes;openRes=function(next){const ok=!TR2&&li>=0&&li<LV.length,L=LS,m0=ok?pgMask(li):0,st0=pgStars();PG.quiet=1;try{_o(next)}finally{PG.quiet=0}if(!ok)return;const s=pgSV();
  if(L&&L.dmg==0){s.nh=(s.nh|0)|1<<li}if(li==LV.length-1)s.endD=Math.max(s.endD==null?-1:s.endD,SV.dif|0);
  PG.quiet=1;pgStar(li,0);if(seedCount(li)>=3)pgStar(li,1);PG.quiet=0;if(RES){RES.pg0=m0;RES.pg1=pgMask(li);RES.pgSt0=st0;RES.coins=L?Math.max(0,SV.st-(L.co0|0)):0}saveSV();pgAchCheck()}}
{const _li=lsInit;lsInit=function(){_li();if(LS){LS.co0=SV.st;LS.mk0=pgMask(li)}}}

/* ======================= HLEDANÝ BANDITA ======================= */
function pgWCand(min,max){return ens.filter(e=>e.st!='dead'&&!isB(e)&&e.t!='k'&&!AN[e.t]&&!e.civ&&e.v&&!e.bty&&e.x>p.x+min&&e.x<p.x+max&&Math.abs(e.z-p.z)<420)}
function pgMakeCT(e,wanted){const Wn=WNT[li];const nm=wanted?Wn.n:BN[(Math.random()*BN.length)|0];e.bty=nm;e.hp=Math.round(e.hp*(wanted?2.4:2));CT={e,name:nm,rew:wanted?60:15,done:0,feat:bountyFeat(e),_pg:1,first:wanted,tal:wanted?Wn.tal:null};state='poster';sfx('cloth')}
/* hledaný se ohlásí sám v každé oblasti (plakát), nástěnky nabízejí další zakázky všem postavám */
function pgWantedAuto(){if(CT||TR2||state!='play'||PG.wAsk||!lv||li<0||li>=WNT.length||!p||p.dead||bossE)return;if(pgSV().w[li]){PG.wAsk=1;return}if(p.x<Math.min(900,lv.len*.08))return;
 const cs=pgWCand(300,1600);if(!cs.length)return;PG.wAsk=1;pgMakeCT(cs[(Math.random()*cs.length)|0],1)}
boardUse=function(b){if(CT&&CT.e.st!='dead'&&!CT.done){say('Už máš zakázku: '+CT.name);return}if(b.used){say('Tahle nástěnka je už prázdná.');return}
 const cs=pgWCand(450,3000).sort((a,c)=>a.x-c.x).slice(0,6);if(!cs.length){say('Na nástěnce nic není.');return}b.used=1;const w=!pgSV().w[li]&&!(CT&&CT.first);if(w)PG.wAsk=1;pgMakeCT(cs[(Math.random()*cs.length)|0],w)};
{const _s=start;start=function(i,arr){PG.wAsk=0;return _s.apply(this,arguments)}}
{const _d=dPoster;dPoster=function(){try{pgWantedUpd()}catch(e){}return _d()}}
function pgWantedUpd(){if(!CT||TR2||li<0||li>=WNT.length)return;const s=pgSV(),Wn=WNT[li];
 if(!CT._pg){CT._pg=1;CT.first=!s.w[li];CT.rew=CT.first?60:15;CT.tal=CT.first?Wn.tal:null;if(CT.first){CT.name=Wn.n;if(CT.e)CT.e.bty=Wn.n}}
 if(!CT.done&&CT.e&&CT.e.st=='dead'){CT.done=1;addSc(500);pgCoins(CT.rew,W/2,150);const fst=CT.first&&!s.w[li];if(fst){s.w[li]=1;s.tal[Wn.tal]=1;if(s.eq.length<pgSlots()&&!s.eq.includes(Wn.tal))s.eq.push(Wn.tal)}saveSV();PG.nw++;
  if(fst)pgBan({k:'wnt',i:li,rew:CT.rew,tal:Wn.tal,n:Wn.n});else pgBan({k:'zak',i:li,q:-1,rew:CT.rew,n:CT.name});pop(p.x,LY,p.z+130,'DOPADEN! +'+CT.rew+' $','#ffd44a');pgAchCheck()}}
{const _q=qUpd;qUpd=function(){try{pgWantedUpd();pgWantedAuto()}catch(e){console.error('pgW',e)}return _q()}}

/* ======================= HVĚZDNÁ CESTA ======================= */
function pgRankCheck(){const s=pgSV(),r=pgRankIdx();while((s.rk|0)<r){s.rk=(s.rk|0)+1;const R=PGR[s.rk];if(R.c)pgCoins(R.c,W/2,160);if(R.tal){s.tal[R.tal]=1;if(s.eq.length<pgSlots()&&!s.eq.includes(R.tal))s.eq.push(R.tal)}if(R.tr)s.own[R.tr]=1;if(R.ti)s.own['ti:'+R.ti]=1;saveSV();PG.nw++;pgBan({k:'rank',r:s.rk})}}

/* ======================= ÚSPĚCHY ======================= */
function pgAchTier(id){return pgSV().a[id]|0}
function pgAchCheck(){if(TR2)return;const s=pgSV();for(const A of ACH2){const v=A[3](),t0=s.a[A[0]]|0;let t=t0;while(t<3&&v>=A[4][t])t++;if(t>t0){for(let k=t0;k<t;k++){s.a[A[0]]=k+1;pgCoins(ACHR[k],W-200,90);if(k==2){s.own['ti:'+A[1]]=1;if(A[5])s.own[A[5]]=1}PG.nw++;pgBan({k:'ach',id:A[0],tier:k})}saveSV()}}}
function pgAchPts(){let n=0;for(const A of ACH2)n+=pgAchTier(A[0]);return n}
achU=function(id){};/* staré úspěchy nahrazeny */
achCheck=function(){pgAchCheck()};
/* sledování statistik: přírůstky z úkolových počítadel oblasti */
function pgStatTick(){const s=pgSV();if(CMB&&CMB.mx>(s.cmx|0))s.cmx=CMB.mx;const q=LS&&LS.q&&!TR2?LS.q:null;
 if(q){const c=q.c,L=PG.lastC;if(!L||L.q!==q)PG.lastC={q,stealth:c.stealth,air:c.air,boom:c.boom,throw:c.throw};else{['stealth','air','boom','throw'].forEach(k=>{const d=c[k]-L[k];if(d>0){const key=k=='stealth'?'sth':k=='throw'?'thr':k;s[key]=(s[key]|0)+d}L[k]=c[k]})}}
 if(PG.lastSt==null)PG.lastSt=SV.st;if(SV.st>PG.lastSt&&!TR2)s.earn=(s.earn|0)+(SV.st-PG.lastSt);PG.lastSt=SV.st}

/* ======================= TALISMANY ======================= */
talOwned=function(id){return !!pgSV().tal[id]};
rwSlots=function(){return pgSlots()};
rwSV=function(){const s=pgSV();return{cl:{},eq:s.eq}};
rwPend=function(){return[]};
function pgTalHow(id){const w=WNT.findIndex(o=>o.tal==id);if(w>=0)return'Dopadni hledaného: '+WNT[w].n+' ('+LV[w].n+')';const r=PGR.findIndex(o=>o.tal==id);if(r>=0)return'Hodnost '+PGR[r].n+' ('+PGR[r].s+' ★)';return''}

/* ======================= STOPY ZA POSTAVOU ======================= */
function pgTrailOn(){const s=pgSV();return s.c.tr&&s.c.tr!='zadna'&&s.own[s.c.tr]?s.c.tr:null}
function pgTrailSpawn(k,x,z,o){const r=Math.random;const P={k,x,z,vx:o.vx||R0(-.4,.4),vz:o.vz||R0(.2,1),l:0,L:o.L||R0(30,50),a:r()*6,s:o.s||1,c:o.c};PG.tr.push(P)}
function pgTrailTick(){const k=pgTrailOn();if(k&&p&&!p.dead&&state=='play'&&!TR2){const mv=Math.abs(p.vx)>.8||p.z>(p.fl||0)+4;if(mv&&T%3==0){const bx=p.x-(p.face||1)*10,bz=p.z+(k=='hvezdy'||k=='noty'?60:k=='zlato'?50:12);
   if(k=='jiskry')pgTrailSpawn(k,bx,bz,{vx:R0(-1.2,1.2),vz:R0(.8,2.4),L:22});else if(k=='kour')pgTrailSpawn(k,bx,p.z+30,{vz:R0(.2,.6),L:46,s:R0(.8,1.4)});else if(k=='ohen')pgTrailSpawn(k,bx,bz,{vz:R0(.6,1.6),L:34});
   else if(k=='kvety')pgTrailSpawn(k,bx,p.z+70,{vx:R0(-.6,.6),vz:R0(-.4,.3),L:60,c:['#ff7aa8','#ffd84a','#fff4f8'][T%3]});else if(k=='stava')pgTrailSpawn(k,bx,bz,{vz:R0(.2,1.2),L:40});else pgTrailSpawn(k,bx,bz,{vz:R0(.3,1.2),L:44,c:['#ffd44a','#fff2b0'][T%2]})}}
 for(const t of PG.tr){t.l++;t.x+=t.vx;t.z+=t.vz;t.a+=.12;if(t.k=='jiskry'||t.k=='stava')t.vz-=.08;if(t.k=='kvety')t.vz-=.015}PG.tr=PG.tr.filter(t=>t.l<t.L);if(PG.tr.length>160)PG.tr.splice(0,PG.tr.length-160)}
function pgTrailDraw(t,x,y,a){if(t.k=='jiskry'){X.fillStyle='rgba(255,'+(200+(t.l*3)%55)+',90,'+a+')';X.fillRect(x-1.5,y-1.5,3,3)}
 else if(t.k=='kour'){rgPuff(x,y,10*t.s+t.l*.3,a*.45,'60,50,70')}
 else if(t.k=='ohen'){X.fillStyle='rgba(255,'+(120+t.l*3)+',40,'+a+')';X.beginPath();X.arc(x,y,3*(1-t.l/t.L)+1,0,7);X.fill()}
 else if(t.k=='kvety'){X.save();X.translate(x,y);X.rotate(t.a);X.globalAlpha=a;X.fillStyle=t.c;X.beginPath();X.ellipse(0,0,4,2,0,0,7);X.fill();X.restore()}
 else if(t.k=='stava'){X.fillStyle='rgba(120,255,160,'+a+')';X.beginPath();X.arc(x,y,2.6,0,7);X.fill();rgGlow(x,y,10,'120,255,160',a*.4)}
 else if(t.k=='noty'){X.save();X.globalAlpha=a;X.fillStyle=t.c;X.font='14px Georgia';X.fillText(t.l%2?'♪':'♫',x,y);X.restore()}
 else if(t.k=='zlato'){X.save();X.globalAlpha=a;hbCoin(x,y,4,t.a);X.restore()}
 else{m3Star(x,y,3.5,'rgba(255,240,170,'+a+')')}}
{const _dp=dPlayer;dPlayer=function(){try{for(const t of PG.tr){const x=t.x-cam,y=LY-t.z;if(x<-20||x>W+20)continue;pgTrailDraw(t,x,y,Math.max(0,1-t.l/t.L))}}catch(e){}return _dp()}}

/* ======================= OZNÁMENÍ ======================= */
function pgBan(b){b.t=0;PG.ban.push(b)}
function pgBanDur(b){const q=PG.ban.length;const base=b.k=='star'||b.k=='rank'||b.k=='wnt'?210:b.k=='ach'?170:b.k=='fail'?110:150;return q>3?Math.round(base*.6):base}
function pgBanTick(){if(state=='cut'||state=='cin'||state=='res'||TR2)return;const b=PG.ban[0];if(b){b.t++;if(b.t==1){if(b.k=='star'){sfx('win');sfx('sparkle');try{synth(()=>{TS.glint(1.1);TS.shimmer(1.2,.5,0,[86,90,93,98])})}catch(e){}}else if(b.k=='rank'||b.k=='wnt'){sfx('win');sfx('heavy')}else if(b.k=='ach'){sfx('flag');sfx('sparkle')}else if(b.k=='zak'){sfx('flag');sfx('coin')}}
  if(b.t>=pgBanDur(b))PG.ban.shift()}
 for(const f of PG.fly){f.t++;if(f.t==f.d)sfx('coin')}PG.fly=PG.fly.filter(f=>f.t<=f.d)}
qBanTick=function(){const U=QS.ui;if(U.exp>0)U.exp--;for(let k=0;k<5;k++){if(U.fl[k]>0)U.fl[k]--;if(U.sh[k]>0)U.sh[k]--}};
qBanners=function(){};
/* velká hvězda */
function pgStarShape(x,y,r,on,rot,glow){if(!(r>=1))return;X.save();X.translate(x,y);X.rotate(rot||0);if(on&&glow)tiGlow(0,0,r*2.6,'255,210,90',glow);const P=new Path2D();for(let k=0;k<10;k++){const a=k/10*Math.PI*2-Math.PI/2,rr=k%2?r*.47:r;P.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}P.closePath();
 X.fillStyle='rgba(10,4,2,.35)';X.save();X.translate(r*.08,r*.12);X.fill(P);X.restore();
 if(on){const g=X.createLinearGradient(0,-r,0,r);g.addColorStop(0,'#fff6b8');g.addColorStop(.45,'#ffc83a');g.addColorStop(1,'#c8780e');X.fillStyle=g}else X.fillStyle='rgba(60,40,24,.55)';X.fill(P);X.strokeStyle=on?'#6a3606':'rgba(200,170,120,.45)';X.lineWidth=Math.max(1.2,r*.1);X.lineJoin='round';X.stroke(P);
 if(on){X.fillStyle='rgba(255,255,255,.45)';X.beginPath();X.ellipse(-r*.2,-r*.38,r*.24,r*.1,-.6,0,7);X.fill()}X.restore()}
function pgMedal(x,y,r,t,dim){X.save();X.translate(x,y);const c=dim?'#5a4a3a':ACHC[t];X.fillStyle='#8a1a14';X.beginPath();X.moveTo(-r*.55,-r*1.6);X.lineTo(-r*.1,-r*.6);X.lineTo(-r*.5,-r*.5);X.closePath();X.fill();X.fillStyle='#1a3a8a';X.beginPath();X.moveTo(r*.55,-r*1.6);X.lineTo(r*.1,-r*.6);X.lineTo(r*.5,-r*.5);X.closePath();X.fill();
 const g=X.createRadialGradient(-r*.3,-r*.3,1,0,0,r);g.addColorStop(0,dim?'#8a7a6a':'#ffffff');g.addColorStop(.35,c);g.addColorStop(1,dim?'#3a2a1a':'#4a2a10');X.fillStyle=g;X.beginPath();X.arc(0,0,r,0,7);X.fill();X.strokeStyle='#2a1406';X.lineWidth=1.5;X.stroke();
 X.strokeStyle=dim?'rgba(0,0,0,.2)':'rgba(255,255,255,.4)';X.beginPath();X.arc(0,0,r*.72,0,7);X.stroke();if(!dim){X.fillStyle='#2a1406';X.font='700 '+Math.round(r*.9)+'px Georgia';X.textAlign='center';X.fillText(['I','II','III'][t],0,r*.32)}X.restore()}
function pgPlaque(w,h,dark){X.fillStyle='rgba(8,2,2,.45)';X.beginPath();X.roundRect(-w/2+5,-h/2+7,w,h,8);X.fill();const g=X.createLinearGradient(0,-h/2,0,h/2);if(dark){g.addColorStop(0,'#cbb89a');g.addColorStop(1,'#9a8466')}else{g.addColorStop(0,'#fbf0d6');g.addColorStop(1,'#dcc08a')}X.fillStyle=g;X.beginPath();X.roundRect(-w/2,-h/2,w,h,8);X.fill();X.strokeStyle='#6a4218';X.lineWidth=2;X.stroke();X.strokeStyle='rgba(140,90,30,.4)';X.lineWidth=1;X.strokeRect(-w/2+6,-h/2+6,w-12,h-12)}
function pgBanDraw(){const b=PG.ban[0];if(b&&!(state=='cut'||state=='cin'||state=='res'||TR2)){const low=!['play','over','pause','poster'].includes(state);const t=b.t,D=pgBanDur(b),a=Math.max(0,Math.min(1,t/8,(D-t)/14));if(a>0){const sc=t<14?m3Back(t/14)*.25+.75:1,yo=t>D-14?-(t-(D-14))*3:0,big=b.k=='star'||b.k=='rank'||b.k=='wnt';
  X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha=a;X.translate(W/2,low?H-(big?92:78)-yo:(big?118:100)+yo);X.scale(sc*(low?.86:1),sc*(low?.86:1));const w=big?500:440,h=big?96:70;
  if(big){X.save();X.rotate(T*.006);X.globalCompositeOperation='lighter';for(let q=0;q<14;q++){X.rotate(Math.PI/7);X.fillStyle='rgba(255,200,90,.1)';X.beginPath();X.moveTo(0,0);X.lineTo(-24,-260);X.lineTo(24,-260);X.closePath();X.fill()}X.restore()}
  pgPlaque(w,h,b.k=='fail');const lx=-w/2+(big?60:42);let title='',sub='',rew='';
  if(b.k=='star'){const m=pgMask(b.i);for(let k=0;k<3;k++){const on=m>>k&1,isN=k==b.b,u=isN?Math.min(1,t/22):1,s2=isN&&t<30?1+(1-u)*1.4:1;pgStarShape(lx-30+k*30,4+(k==1?-8:0),(isN?16:13)*s2,on&&(!isN||t>6),isN?(1-u)*-3:0,isN?.6:0)}
   title='HVĚZDA ZÍSKÁNA!';sub=LV[b.i].n+' • '+PGSN[b.b]+(b.b==2?': '+qTxt(b.i,0):'')}
  else if(b.k=='zak'){hbCoin(lx,0,20,T*.1);title='ZAKÁZKA SPLNĚNA';sub=b.q<0?'Dopaden: '+b.n:qTxt(b.i,b.q);rew='+'+b.rew}
  else if(b.k=='fail'){X.save();X.translate(lx,0);X.fillStyle='#8a1a0a';X.beginPath();X.arc(0,0,22,0,7);X.fill();X.restore();qCross(lx,0,1.5,'#ffe8d8');title=b.q==0?'VÝZVA ZMAŘENA':'ZAKÁZKA ZMAŘENA';sub=qTxt(b.i,b.q)+' – zkus to příště'}
  else if(b.k=='rank'){qSheriff(lx,0,30,Math.sin(T*.05)*.1);title='NOVÁ HODNOST!';const R=PGR[b.r];sub=R.n+' • '+pgRankRew(R)}
  else if(b.k=='ach'){const A=ACH2.find(o=>o[0]==b.id);pgMedal(lx,6,20,b.tier);title='ÚSPĚCH – '+ACHT[b.tier];sub=A[1]+': '+A[2](A[4][b.tier]);rew='+'+ACHR[b.tier]}
  else if(b.k=='wnt'){X.save();X.translate(lx,0);X.rotate(-.08);X.fillStyle='#e8d4a4';X.fillRect(-24,-30,48,60);X.strokeStyle='#5a3a1a';X.lineWidth=2;X.strokeRect(-24,-30,48,60);X.fillStyle='#3a2210';X.font='700 9px Georgia';X.textAlign='center';X.fillText('SE HLEDÁ',0,-18);X.strokeStyle='#a8241a';X.lineWidth=2.4;X.strokeRect(-20,-6,40,16);X.fillStyle='#a8241a';X.font='700 9px Georgia';X.fillText('DOPADEN',0,6);X.restore();
   title='HLEDANÝ DOPADEN!';sub=b.n+(b.tal?' • talisman „'+talById(b.tal).n+'“':'');rew='+'+b.rew}
  X.textAlign='left';const tx=-w/2+(big?120:80);X.font=(big?'26px ':'21px ')+FONT;X.fillStyle=b.k=='fail'?'#8a1a0a':'#7a2a06';X.fillText(title,tx,big?-12:-6);
  X.font='italic 14px Georgia';X.fillStyle='#3a2210';wrapL(sub,w-(tx+w/2)-(rew?(b.tal?140:90):b.k=='rank'?80:24)).slice(0,2).forEach((l,j)=>X.fillText(l,tx,(big?12:16)+j*17));
  if(rew){const rx=b.k=='wnt'&&b.tal?w/2-96:w/2-46;X.textAlign='right';X.font='26px '+FONT;X.lineWidth=5;X.lineJoin='round';X.strokeStyle='#3a1a06';X.strokeText(rew,rx,10);X.fillStyle='#ffd44a';X.fillText(rew,rx,10);hbCoin(rx+18,1,11,T*.1)}
  if(b.k=='wnt'&&b.tal){X.fillStyle='rgba(58,30,12,.85)';X.beginPath();X.arc(w/2-40,0,28,0,7);X.fill();talIco(b.tal,w/2-40,0,23)}
  if(b.k=='rank'){const R=PGR[b.r];X.fillStyle='rgba(58,30,12,.85)';X.beginPath();X.arc(w/2-40,0,28,0,7);X.fill();pgRewIco(R,w/2-40,0,22)}
  X.restore()}}
 for(const f of PG.fly){if(f.t<0)continue;const u=Math.min(1,f.t/f.d),v=1-u,x=v*v*f.x+2*v*u*f.c1x+u*u*f.tx,y=v*v*f.y+2*v*u*f.c1y+u*u*f.ty;X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha=Math.min(1,(1-u)*3+.3);hbCoin(x,y,7+3*(1-u),f.t*.3);X.restore()}}
function pgRankRew(R){const a=[];if(R.c)a.push('+'+R.c+' $');if(R.slot)a.push('nový slot na talisman');if(R.tal)a.push('talisman „'+talById(R.tal).n+'“');if(R.tr)a.push('stopa „'+PGTR[R.tr].n+'“');if(R.ti)a.push('titul');return a.join(', ')||R.d||''}
function pgRewIco(R,x,y,r){if(R.tal)talIco(R.tal,x,y,r);else if(R.slot)rwSlotIco(x,y,r*1.2);else if(R.tr){pgTrailIco(R.tr,x,y,r)}else if(R.c)hbCoin(x,y,r*.75,T*.05);else qSheriff(x,y,r*.8,0)}
function pgTrailIco(k,x,y,r){X.save();X.translate(x,y);const s=r/20;X.scale(s,s);if(k=='zadna'){X.strokeStyle='#8a7a6a';X.lineWidth=3;X.beginPath();X.arc(0,0,12,0,7);X.moveTo(-8,8);X.lineTo(8,-8);X.stroke()}
 else for(let i=0;i<7;i++){const a=i/7*6.283+T*.03,rr=6+((i*5)%9),px=Math.cos(a)*rr,py=Math.sin(a)*rr;const tt={k,l:i*4,L:40,a:a,s:1,c:['#ff7aa8','#ffd84a','#fff4f8','#ffd44a'][i%4]};pgTrailDraw(tt,px,py,.9)}X.restore()}
{const _u=upd;upd=function(){const r=_u();try{if(!PG.init&&state!='intro'){PG.init=1;pgSV();pgRankCheck();pgAchCheck()}pgStatTick();pgBanTick();pgTrailTick();if(T%60==0&&!TR2)pgAchCheck()}catch(e){console.error('pg',e)}return r}}
{const _d=draw;draw=function(){_d();try{pgBanDraw()}catch(e){console.error('pgd',e)}}}

/* =====================================================================
   ROZHRANÍ
   ===================================================================== */
const PGP={dark:'#2a1406',mid:'#7a4a1e',ok:'#2a7a2a',bad:'#a8241a'};
function pgCk(x,y,on,fail){X.save();X.strokeStyle=on?'#2a7a2a':fail?'#a8241a':'rgba(90,60,30,.55)';X.lineWidth=1.6;X.strokeRect(x-6,y-6,12,12);X.restore();if(on)qCheck(x+1,y-1,.75,'#2a8a2a');else if(fail)qCross(x,y,.6,'#a8241a')}
function pgWantedIco(x,y,s,done){X.save();X.translate(x,y);X.scale(s,s);X.rotate(-.06);X.fillStyle=done?'#e8d4a4':'#d8c494';X.fillRect(-12,-15,24,30);X.strokeStyle='#5a3a1a';X.lineWidth=1.5;X.strokeRect(-12,-15,24,30);X.fillStyle='#5a3a1a';X.beginPath();X.arc(0,-3,6,0,7);X.fill();X.fillRect(-7,3,14,8);if(done){X.strokeStyle='#a8241a';X.lineWidth=2.4;X.beginPath();X.moveTo(-10,-12);X.lineTo(10,12);X.moveTo(10,-12);X.lineTo(-10,12);X.stroke()}X.restore()}
/* souhrn oblasti (mapa, pauza, deník) */
function pgAreaMini(i,x,y,w,lk){const m=pgMask(i),s=pgSV();X.save();X.textAlign='left';
 X.font='15px '+FONT;X.fillStyle=PGP.dark;X.fillText('HVĚZDY',x+2,y+12);for(let k=0;k<3;k++)pgStarShape(x+w-60+k*22,y+7,8,m>>k&1);
 const rows=[['Dokonči oblast',m&1],['Najdi semínka Srdce '+seedCount(i)+'/3',m>>1&1],[qTxt(i,0),m>>2&1]];
 rows.forEach((r,k)=>{const yy=y+30+k*22;pgStarShape(x+9,yy-4,6.5,r[1]);X.font='12px Georgia';X.fillStyle=r[1]?'#4a6a2a':PGP.dark;wrapL(r[0],w-28).slice(0,1).forEach(l=>X.fillText(l,x+22,yy))});
 let y2=y+30+3*22+4;X.fillStyle='#7a5228';X.fillRect(x,y2-10,w,1.2);
 X.font='15px '+FONT;X.fillStyle=PGP.dark;X.fillText('ZAKÁZKY',x+2,y2+8);X.font='700 12px Georgia';X.fillStyle=PGP.mid;X.textAlign='right';X.fillText(qCount(i)+' / 3',x+w,y2+8);X.textAlign='left';
 for(let j=0;j<3;j++){const yy=y2+28+j*21,d=QD[i][j+1],done=pgZk(i,j);pgCk(x+8,yy-4,done);X.font='12px Georgia';X.fillStyle=done?'#4a6a2a':PGP.dark;X.fillText(wrapL(qTxt(i,j+1),w-74)[0],x+22,yy);
  X.textAlign='right';X.font='700 12px Georgia';X.fillStyle=done?'#8a7a5a':'#8a4a0a';X.fillText('+'+d[2],x+w-16,yy);hbCoin(x+w-6,yy-4,5.5,0);X.textAlign='left'}
 let y3=y2+28+3*21+2;X.fillStyle='#7a5228';X.fillRect(x,y3-10,w,1.2);const wd=!!s.w[i],Wn=WNT[i];
 pgWantedIco(x+12,y3+12,.9,wd);X.font='700 11px Georgia';X.fillStyle='#8a4a1a';X.fillText('HLEDANÝ',x+30,y3+6);X.font='12.5px Georgia';X.fillStyle=PGP.dark;X.fillText(lk?'???':Wn.n,x+30,y3+21);
 X.fillStyle='rgba(58,30,12,'+(wd?.85:.35)+')';X.beginPath();X.arc(x+w-14,y3+12,13,0,7);X.fill();talIco(Wn.tal,x+w-14,y3+12,10.5,!wd);
 X.textAlign='right';X.font='italic 11px Georgia';X.fillStyle=wd?'#2a7a2a':'#7a5a3a';X.fillText(wd?'dopaden':'plakát na nástěnce',x+w-32,y3+21);X.restore();return y3+34}
/* ---------- panel ve hře (vlevo nahoře) ---------- */
qHud=function(){const q=LS&&LS.q;if(!q||!p||TR2)return;const i=q.i,U=QS.ui,m=pgMask(i);const tgt=(U.exp>0||U.pin)?1:0;U.ek=(U.ek||0)+(tgt-(U.ek||0))*.16;const e=U.ek;
 U.my=(U.my||0)+((msgT>0&&!(bI>0)?30:0)-(U.my||0))*.2;const HBo=typeof HB!='undefined'&&HB.on,x=14,yb=(HBo?62:94)+(p.w&&!HBo?32:0)+(p.hid?30:0)+U.my,rh=22,w=Math.round(176+e*140),h=Math.round(28+e*(5*rh+12));
 X.save();X.fillStyle='rgba(22,10,6,'+(.62+.2*e)+')';rr(x,yb,w,h,8);X.strokeStyle='rgba(232,184,96,'+(.45+.3*e)+')';X.lineWidth=1.4;X.beginPath();X.roundRect(x+.5,yb+.5,w-1,h-1,8);X.stroke();
 for(let k=0;k<3;k++){const on=m>>k&1;pgStarShape(x+16+k*20,yb+14,8,on,0,on&&(U.fl[0]>0&&k==2)?.5:0)}
 X.textAlign='left';X.font='13px '+FONT;X.fillStyle='#ffd27a';X.fillText(LV[i].n.toUpperCase().slice(0,16),x+76,yb+19);
 pgSV().eq.forEach((id,k)=>{const tx=x+w+16+k*24,ty=yb+14;X.fillStyle='rgba(22,10,6,.7)';X.beginPath();X.arc(tx,ty,11,0,7);X.fill();X.strokeStyle='rgba(232,184,96,.5)';X.lineWidth=1;X.stroke();talIco(id,tx,ty,8.5)});
 if(e>.5){X.globalAlpha=(e-.5)*2;X.textAlign='right';X.font='11px Georgia';X.fillStyle='rgba(255,230,190,.55)';X.fillText(U.pin?'[U] skrýt':'[U] připnout',x+w-8,yb+18);X.globalAlpha=1}
 if(e>.04){X.save();X.beginPath();X.rect(x,yb+26,w,h-26);X.clip();X.globalAlpha=Math.min(1,e*1.5);
  const line=(k,yy)=>{const d=QD[i][k],st=qState(k),done=st=='done'||st=='ever',fail=st=='fail',fl=U.fl[k]||0,sh=(U.sh[k]||0)>0?Math.sin(U.sh[k]*1.3)*3:0;
   if(fl>0){X.fillStyle='rgba(255,200,90,'+(Math.min(1,fl/40)*.4)+')';X.beginPath();X.roundRect(x+4,yy-rh/2+1,w-8,rh-2,5);X.fill()}
   if(k==0)pgStarShape(x+16+sh,yy,7,done);else{hbCoin(x+16+sh,yy,6.5,0);if(done){X.fillStyle='rgba(20,60,10,.5)';X.beginPath();X.arc(x+16,yy,7,0,7);X.fill()}}
   X.font='12.5px Georgia';X.textAlign='left';X.fillStyle=done?'rgba(190,230,160,.85)':fail?'rgba(230,150,130,.6)':'#f4e2bc';const tx=k==0?'Výzva: '+qShort(i,0):qShort(i,k);X.fillText(tx,x+30+sh,yy+(qCountable(d)&&!done&&!fail?2:4));
   if(done||fail){const tw=X.measureText(tx).width;X.fillStyle=done?'rgba(160,220,140,.55)':'rgba(255,110,90,.6)';X.fillRect(x+30+sh,yy,tw,1.3)}
   if(done)qCheck(x+w-16,yy,.75);else if(fail)qCross(x+w-16,yy,.7);
   else{const vt=qValTxt(i,k),warn=d[0]=='time'&&d[1]-qVal(i,k)<30;X.textAlign='right';X.font='700 12px Georgia';X.fillStyle=warn?(T%30<15?'#ff7a5a':'#ffd27a'):'#ffd27a';X.fillText(vt,x+w-8,yy+4);
    if(qCountable(d)){const f=Math.min(1,qVal(i,k)/d[1]);X.fillStyle='rgba(0,0,0,.45)';X.fillRect(x+30,yy+6,w-100,2.5);X.fillStyle=fl>0?'#ffe08a':'#e8a83a';X.fillRect(x+30,yy+6,(w-100)*f,2.5)}}};
  line(0,yb+38);for(let k=1;k<4;k++)line(k,yb+38+k*rh);
  const ys=yb+38+4*rh,sc=seedCount(i);seedShape(x+16,ys,.38,sc>=3);X.textAlign='left';X.font='12.5px Georgia';X.fillStyle=sc>=3?'rgba(190,230,160,.85)':'#f4e2bc';X.fillText('Semínka Srdce',x+30,ys+4);X.textAlign='right';X.font='700 12px Georgia';X.fillStyle='#a8ffb0';X.fillText(sc+' / 3',x+w-8,ys+4);
  X.restore()}
 X.restore()};
/* ---------- pauza: deník oblasti ---------- */
{const _dp=dPause;dPause=function(){_dp();try{if(!LS||!LS.q||TR2)return;const i=LS.q.i,x=W-292,y=96,w=276,h=392;qPaper(x,y,w,h,i*3+1);
 X.textAlign='left';X.font='17px '+FONT;X.fillStyle='#3a1606';X.fillText(LV[i].n.toUpperCase(),x+16,y+28);X.fillStyle='#7a5228';X.fillRect(x+14,y+36,w-28,1.5);
 const yy=pgAreaMini(i,x+14,y+52,w-28,0);X.textAlign='center';X.font='italic 11.5px Georgia';X.fillStyle='#6a4a2a';X.fillText('Hvězdy celkem: '+pgStars()+' / 24  •  hodnost '+PGR[pgRankIdx()].n,x+w/2,Math.min(y+h-12,yy+18))}catch(e){console.error(e)}}}
{const _md=m3CardData;m3CardData=function(it){if(it!='Deník')return _md(it);const D={t:'Deník',s:'Hodnost: '+PGR[pgRankIdx()].n,b:PG.nw?'Máš '+PG.nw+' '+qPl(PG.nw,'novinku','novinky','novinek')+' – podívej se!':'Hvězdy oblastí, zakázky, hledaní, úspěchy, talismany a vzhled.',eh:46,ex:null};
 D.ex=(x,y,w)=>{const n=pgStars(),R=PGR[pgRankIdx()],N=PGR[Math.min(PGR.length-1,pgRankIdx()+1)];X.font='13px Georgia';X.fillStyle='#5a3a1a';X.fillText('Hvězdy '+n+' / 24',x,y+12);X.fillStyle='rgba(60,30,10,.2)';X.fillRect(x,y+18,w,6);X.fillStyle='#e8a020';X.fillRect(x,y+18,w*n/24,6);
  X.fillStyle='#5a3a1a';X.fillText('Talismany:',x,y+42);const eq=pgSV().eq;eq.forEach((id,k)=>{X.fillStyle='rgba(58,30,12,.85)';X.beginPath();X.arc(x+84+k*26,y+37,11,0,7);X.fill();talIco(id,x+84+k*26,y+37,9)});if(!eq.length){X.font='italic 12px Georgia';X.fillStyle='#7a5a3a';X.fillText('žádný nasazený',x+72,y+42)}};return D}}
MDESC['Deník']='Hvězdy oblastí, zakázky, hledaní bandité, úspěchy, talismany a vzhled postavy.';

/* =====================================================================
   VÝSLEDKY OBLASTI
   ===================================================================== */
const PGRS={st:70,gap:22};
function pgResT(){return PGRS.st+3*PGRS.gap+60}
updRes=function(){if(!RES){state='menu';return}RES.t++;const R=RES;const m0=R.pg0|0,m1=R.pg1|0;
 for(let k=0;k<3;k++){const tk=PGRS.st+k*PGRS.gap;if(R.t==tk){if(m1>>k&1){sfx('heavy');if(!(m0>>k&1)){sfx('win');sfx('sparkle');shake=Math.max(shake,5);try{synth(()=>TS.glint(1))}catch(e){}}else sfx('coin')}else sfx('cloth')}}
 if(R.t>50&&(P.Enter||P.Space||kp('attack')||kp('jump'))){if(R.t<pgResT()){R.t=pgResT();return}const n=R.next;RES=null;sfx('uiok');n()}};
dRes=function(){if(!RES)return;const R=RES,t=R.t,i=R.qi!=null?R.qi:li,q=R.q,m0=R.pg0|0,m1=R.pg1|0;X.fillStyle='rgba(6,4,2,'+Math.min(.84,t/20)+')';X.fillRect(0,0,W,H);
 const k0=m3Ease(t/18),x0=34,y0=22,w=892,h=496;X.save();X.translate(0,(1-k0)*40);X.globalAlpha=k0;
 X.fillStyle='rgba(0,0,0,.5)';X.beginPath();X.roundRect(x0+6,y0+8,w,h,14);X.fill();const g=X.createLinearGradient(0,y0,0,y0+h);g.addColorStop(0,'#3e2614');g.addColorStop(1,'#24140a');X.fillStyle=g;X.beginPath();X.roundRect(x0,y0,w,h,14);X.fill();
 X.strokeStyle='#c9a95a';X.lineWidth=2;X.strokeRect(x0+8,y0+8,w-16,h-16);X.strokeStyle='rgba(201,169,90,.35)';X.lineWidth=1;X.strokeRect(x0+13,y0+13,w-26,h-26);
 goldText('OBLAST DOKONČENA',x0+w/2,y0+56,32,4,k0);X.textAlign='center';X.font='italic 17px Georgia';X.fillStyle='#e9d3a4';X.fillText(R.n+(pgSV().c.ti?'  •  '+pgSV().c.ti:''),x0+w/2,y0+82);
 /* tři hvězdy */const sy=y0+150;for(let k=0;k<3;k++){const tk=PGRS.st+k*PGRS.gap,u=Math.max(0,Math.min(1,(t-tk)/14)),on=(m1>>k&1)&&t>=tk,nw=on&&!(m0>>k&1),sx=x0+w/2+(k-1)*120,yy=sy+(k==1?-14:0),r=(k==1?46:38)*(on?(u<1?m3Back(u):1):1);
  if(t<tk){pgStarShape(sx,yy,k==1?46:38,0)}else pgStarShape(sx,yy,r,on,0,nw?.5+.2*Math.sin(T*.2):on?.15:0);
  X.font='700 12px Georgia';X.fillStyle=on?'#ffe6a0':'rgba(233,211,164,.5)';X.fillText(PGSN[k],sx,yy+(k==1?66:58));X.font='italic 11px Georgia';X.fillStyle='rgba(233,211,164,.7)';const sub=k==0?'oblast prošlá':k==1?'semínka '+seedCount(i)+'/3':qShort(i,0);X.fillText(sub,sx,yy+(k==1?81:73));
  if(nw&&t>=tk+6){X.font='700 11px Georgia';X.fillStyle=T%30<15?'#ffd44a':'#fff';X.fillText('NOVÁ!',sx,yy+(k==1?98:90))}}
 /* statistiky */const rows=[['Čas',Math.floor(R.secs/60)+':'+String(R.secs%60).padStart(2,'0')],['Zneškodněno',R.L.k],['Nejvyšší kombo',R.L.mx+'×'],['Utržená zranění',R.L.dmg==0?'žádná!':Math.round(R.L.dmg*10)/10],['Body',R.sc]];
 rows.forEach((r,j)=>{const a=Math.max(0,Math.min(1,(t-14-j*6)/12));X.globalAlpha=a*k0;const yy=y0+282+j*30;X.textAlign='left';X.font='15px Georgia';X.fillStyle='#e9d3a4';X.fillText(r[0],x0+50,yy);X.textAlign='right';X.font='700 16px Georgia';X.fillStyle='#fff3d6';X.fillText(String(r[1]),x0+300,yy)});X.globalAlpha=k0;
 if(t>40){const k=Math.min(1,(t-40)/12),z=1+(1-k)*2;X.save();X.translate(x0+380,y0+330);X.scale(z,z);X.rotate(-.12);X.globalAlpha=k*k0;X.strokeStyle=RKC[R.rk];X.lineWidth=4;X.beginPath();X.arc(0,0,40,0,7);X.stroke();X.font='48px '+FONT;X.textAlign='center';X.fillStyle=RKC[R.rk];X.fillText(R.rk,0,17);X.restore();
  if(R.nb){X.textAlign='center';X.font='700 13px Georgia';X.fillStyle=T%30<15?'#ffd44a':'#fff';X.fillText('NOVÝ REKORD!',x0+380,y0+396)}}
 /* odměny */const rx=x0+500,ry=y0+262,ra=m3Ease((t-PGRS.st-20)/16);if(ra>0){X.save();X.globalAlpha=ra*k0;X.fillStyle='rgba(255,230,180,.06)';X.beginPath();X.roundRect(rx,ry-18,360,214,10);X.fill();X.strokeStyle='rgba(201,169,90,.4)';X.stroke();
  X.textAlign='left';X.font='16px '+FONT;X.fillStyle='#ffd27a';X.fillText('ODMĚNY Z VÝPRAVY',rx+14,ry+4);const cc=Math.round((R.coins|0)*Math.min(1,(t-PGRS.st-20)/40));hbCoin(rx+26,ry+34,11,T*.08);X.font='26px '+FONT;X.fillStyle='#ffd44a';X.fillText('+'+cc,rx+44,ry+44);X.font='italic 13px Georgia';X.fillStyle='#e9d3a4';X.fillText('zlaťáků celkem • máš '+SV.st,rx+44+X.measureText('+'+cc).width*2.1,ry+42);
  let yy=ry+74;X.font='13px Georgia';for(let k=1;k<4;k++){const d=QD[i][k],nw=q&&(q.nw>>k&1),ev=pgZk(i,k-1);pgCk(rx+20,yy-4,ev);X.fillStyle=nw?'#9fe09a':ev?'rgba(190,230,160,.7)':'#e9d3a4';X.fillText(wrapL(qTxt(i,k),250)[0],rx+34,yy);X.textAlign='right';X.fillStyle=nw?'#ffd44a':'rgba(233,211,164,.5)';X.fillText(nw?'+'+d[2]+' $':ev?'splněno':'',rx+346,yy);X.textAlign='left';yy+=22}
  const wd=!!pgSV().w[i];pgWantedIco(rx+20,yy+10,.8,wd);X.fillStyle=wd?'#9fe09a':'#e9d3a4';X.fillText('Hledaný: '+WNT[i].n+(wd?' – dopaden':''),rx+36,yy+14);
  X.font='italic 12px Georgia';X.fillStyle='rgba(233,211,164,.75)';X.fillText('Hvězdy celkem '+pgStars()+' / 24  •  hodnost '+PGR[pgRankIdx()].n,rx+14,ry+186);X.restore()}
 if(t>50){X.textAlign='center';X.font='14px Georgia';X.fillStyle='rgba(230,220,200,.75)';X.fillText(t<pgResT()?'Enter – přeskočit':'Enter – pokračovat',x0+w/2,y0+h-20)}
 X.restore();X.textAlign='left'};

/* =====================================================================
   SCHOPNOSTI
   ===================================================================== */
const PGUC=[60,140,260],PGUS=[0,4,10];
upCost=function(l){return PGUC[l]};
upOK=function(l){return pgStars()>=PGUS[l]};
skPos=function(i){if(i<6){const c=i%2,r=i/2|0;return{x:28+c*302,y:100+r*124,w:290,h:114}}return{x:28,y:474,w:592,h:46}};
updSkills=function(){const o=sk.s;if(sk.fl>0)sk.fl--;if(sk.no>0)sk.no--;
 if(P.ArrowRight||P.KeyD){if(sk.s<6&&sk.s%2==0)sk.s++}if(P.ArrowLeft||P.KeyA){if(sk.s<6&&sk.s%2==1)sk.s--}if(P.ArrowDown||P.KeyS){sk.s=sk.s<4?sk.s+2:6}if(P.ArrowUp||P.KeyW){sk.s=sk.s==6?4:sk.s>=2?sk.s-2:sk.s}if(sk.s!=o)sfx('ui');
 if(P.Enter||P.Space||P.KeyJ||kp('attack')){if(sk.s<UPS.length){const k=UPS[sk.s][0],l=SV.up[k];if(l<3&&upOK(l)&&SV.st>=upCost(l)){SV.st-=upCost(l);SV.up[k]++;saveSV();sk.fl=30;sk.fi=sk.s;sk.sb=T;sfx('pick');sfx('heavy');pgAchCheck()}else{sk.no=24;sk.ni=sk.s;sfx('deny')}}else leaveSkills()}
 if(P.Escape)leaveSkills()};
dSkills=function(){scBg(.6);const C=SV.cls;X.textAlign='left';X.font='40px '+FONT;X.lineWidth=7;X.strokeStyle='#1a0c06';X.strokeText('SCHOPNOSTI',28,62);const tg=X.createLinearGradient(0,30,0,64);tg.addColorStop(0,'#fff2c0');tg.addColorStop(1,'#d9952f');X.fillStyle=tg;X.fillText('SCHOPNOSTI',28,62);
 X.font='italic 14px Georgia';X.fillStyle='#e9d3a4';X.fillText(CLN[C].n+'  •  zlaťáky kupují úrovně, hvězdy odemykají vyšší',30,86);
 /* počítadla */const bump=Math.max(0,1-(T-(sk.sb||-99))/20);X.save();X.translate(W-150,48);X.fillStyle='rgba(20,8,6,.72)';X.beginPath();X.roundRect(-128,-26,256,52,26);X.fill();X.strokeStyle='rgba(232,184,96,.5)';X.lineWidth=1.5;X.stroke();
 X.save();X.translate(-74,0);X.scale(1+bump*.3,1+bump*.3);hbCoin(-30,0,13,T*.06);X.font='26px '+FONT;X.textAlign='left';X.fillStyle='#ffd44a';X.fillText(String(SV.st),-12,9);X.restore();pgStarShape(40,-1,13,1);X.font='26px '+FONT;X.fillStyle='#ffe6a0';X.textAlign='left';X.fillText(String(pgStars()),58,9);X.restore();
 UPS.forEach((u,i)=>{const q=skPos(i),sel=sk.s==i,l=SV.up[u[0]],nm=UPN[C][i],cst=l<3?upCost(l):0,gl=l<3&&!upOK(l),can=l<3&&!gl&&SV.st>=cst,sh=sk.no>0&&sk.ni==i?Math.sin(sk.no*1.5)*4:0,lift=sel?-3:0;X.save();X.translate(q.x+sh,q.y+lift);
  X.fillStyle='rgba(0,0,0,.4)';X.beginPath();X.roundRect(5,7,q.w,q.h,10);X.fill();const g=X.createLinearGradient(0,0,0,q.h);g.addColorStop(0,sel?'#f8ead0':'#efdcb0');g.addColorStop(1,sel?'#dcc08a':'#c9a76a');X.fillStyle=g;X.beginPath();X.roundRect(0,0,q.w,q.h,10);X.fill();X.strokeStyle=sel?'#ffb84a':'#6a4a22';X.lineWidth=sel?3.5:2;X.stroke();
  X.fillStyle='#3a2414';X.beginPath();X.arc(40,42,28,0,7);X.fill();X.strokeStyle=l>=3?'#ffd44a':'#c9a95a';X.lineWidth=2.5;X.stroke();skIconC(i,40,42);
  X.textAlign='left';X.fillStyle='#3a2210';X.font='700 17px Georgia';X.fillText(nm[0],80,28);
  for(let j=0;j<3;j++){const on=j<l,lock=!on&&!upOK(j);X.save();X.translate(88+j*30,48);X.fillStyle=on?'#e8a830':lock?'rgba(60,40,20,.15)':'rgba(60,40,20,.28)';X.strokeStyle='#3a2210';X.lineWidth=1.4;X.beginPath();X.roundRect(-11,-8,22,16,4);X.fill();X.stroke();X.font='700 10px Georgia';X.textAlign='center';X.fillStyle=on?'#3a1a06':'#6a4a2a';X.fillText(lock?'🔒':['I','II','III'][j],0,4);X.restore()}
  X.font='italic 12.5px Georgia';X.fillStyle='#4a2e14';X.textAlign='left';wrapL(nm[1],q.w-24).slice(0,2).forEach((t,k)=>X.fillText(t,12,82+k*15));
  /* cena */X.textAlign='right';if(l>=3){X.font='700 13px Georgia';X.fillStyle='#2e8a3a';X.fillText('✔ MAXIMUM',q.w-12,28)}else if(gl){X.font='700 12px Georgia';X.fillStyle='#8a6a4a';X.fillText('od '+PGUS[l]+' ★',q.w-30,28);pgStarShape(q.w-18,24,7,0)}
  else{X.font='700 15px Georgia';X.fillStyle=can?'#8a5a10':'#b02a2a';X.fillText(String(cst),q.w-30,29);hbCoin(q.w-18,24,7,0)}
  if(sk.fl>0&&sk.fi==i){const k=sk.fl/30;X.save();X.translate(q.w/2,q.h/2);X.rotate(-.12);X.scale(1+k*.5,1+k*.5);X.globalAlpha=Math.min(1,(30-sk.fl)/6+.2);X.strokeStyle='#b02a2a';X.lineWidth=3;X.strokeRect(-74,-18,148,36);X.font='22px '+FONT;X.textAlign='center';X.fillStyle='#b02a2a';X.fillText('VYLEPŠENO!',0,8);X.restore()}
  X.restore()});
 const bq=skPos(6),bs=sk.s==6;plank(bq.x,bq.y,bq.w,bq.h,sk.next>=0&&sk.next<LV.length?'POKRAČOVAT: KAPITOLA '+(sk.next+1)+' ▶':'ZPĚT DO MENU',bs,'21px '+FONT);if(bs)mRevolver(bq.x-18+Math.sin(T*.15)*3,bq.y+bq.h/2);
 /* detail vybrané schopnosti */const px=650,py=96,pw=290;if(sk.s<6){const u=UPS[sk.s],nm=UPN[C][sk.s],l=SV.up[u[0]];X.save();qPaper(px,py,pw,170,sk.s*7);X.textAlign='left';X.font='19px '+FONT;X.fillStyle='#3a1606';X.fillText(nm[0].toUpperCase(),px+14,py+28);X.font='italic 12.5px Georgia';X.fillStyle='#4a2e14';wrapL(nm[1],pw-28).slice(0,2).forEach((t,k)=>X.fillText(t,px+14,py+48+k*15));
  for(let j=0;j<3;j++){const yy=py+94+j*24,on=j<l,ok=upOK(j);X.fillStyle=on?'rgba(60,140,40,.18)':'rgba(60,30,10,.08)';X.fillRect(px+10,yy-15,pw-20,21);X.font='700 13px Georgia';X.fillStyle=on?'#2a7a2a':'#3a2210';X.fillText('Úroveň '+['I','II','III'][j],px+16,yy);
   X.textAlign='right';X.font='12.5px Georgia';X.fillStyle=on?'#2a7a2a':ok?'#5a3a1a':'#9a4a2a';X.fillText(on?'koupeno':(PGUC[j]+' $'+(PGUS[j]?'  •  od '+PGUS[j]+' ★':'')),px+pw-16,yy);X.textAlign='left'}X.restore()}
 spot(796,440);pedestal(796,440,140);heroAt(C,796,440,1.9,heroPose(C,T));X.textAlign='center';X.font='700 14px Georgia';X.fillStyle='#ffe9b0';X.fillText('Srdce: '+(5+upv('hp'))+'  •  vylepšení: '+Object.values(SV.up).reduce((a,b)=>a+b,0)+' / 18',796,476);X.textAlign='left';
 X.font='12px Georgia';X.fillStyle='rgba(255,236,200,.7)';X.textAlign='right';X.fillText('← → ↑ ↓ výběr  •  Enter koupit  •  Esc pokračovat',W-14,H-10);X.textAlign='left'};

/* =====================================================================
   DENÍK (nahrazuje Úkoly a odměny)
   ===================================================================== */
const PGT=['OBLASTI','HVĚZDNÁ CESTA','ÚSPĚCHY','TALISMANY','VZHLED'];
const PGD={hits:[],tsel:0,tr:[],pv:[]};
openQM=function(ret,reg,tab){state='qmenu';QM.t=0;QM.ret=ret||'menu';QM.pop=null;QM.hv=null;QM.reg=Math.max(0,Math.min(LV.length-1,reg==null?SV.un:reg));QM.tab=tab||0;QM.cur=0;PG.nw=0;PGD.tsel=0;sfx('cloth');pgSV()};
function pgHit(x,y,w,h,k,i){PGD.hits.push({x,y,w,h,k,i});const hv=QM.hv;return !!(hv&&hv.k==k&&hv.i==i)}
qmHit=function(x,y){for(let j=PGD.hits.length-1;j>=0;j--){const b=PGD.hits[j];if(x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h)return{k:b.k,i:b.i}}return null};
qmMouse=function(x,y,c){MX=x;MY=y;const h=qmHit(x,y);if(!c){if(h&&(!QM.hv||QM.hv.k!=h.k||QM.hv.i!=h.i))sfx('ui');QM.hv=h;return}try{auKick()}catch(e){}qmAct(h)};
qmAct=function(h){if(!h)return;if(h.k=='back')return closeQM();if(h.k=='tab'){if(QM.tab!=h.i){QM.tab=h.i;QM.t=Math.min(QM.t,6);sfx('cloth')}return}
 if(h.k=='reg'){if(QM.reg!=h.i){QM.reg=h.i;sfx('ui')}return}
 if(h.k=='tal'){const id=TAL[h.i].id;talToggle(id);return}
 if(h.k=='trl'){const k=PGTK[h.i],s=pgSV();if(k=='zadna'||s.own[k]){s.c.tr=k;saveSV();sfx('pick');PGD.tsel=h.i}else sfx('deny');return}
 if(h.k=='tit'){const s=pgSV(),T0=pgTitles()[h.i];if(T0==null)return;s.c.ti=s.c.ti==T0?'':T0;saveSV();sfx('pick');return}};
function pgTitles(){const s=pgSV();return Object.keys(s.own).filter(k=>k.startsWith('ti:')).map(k=>k.slice(3))}
updQM=function(){QM.t++;if(shake>0){shake*=.85;if(shake<.3)shake=0}
 if(P.Escape){closeQM();return}
 if(P.Tab||P.KeyE||P.PageDown){QM.tab=(QM.tab+1)%PGT.length;sfx('cloth')}if(P.KeyQ||P.PageUp){QM.tab=(QM.tab+PGT.length-1)%PGT.length;sfx('cloth')}
 for(let d=1;d<=5;d++)if(P['Digit'+d]){QM.tab=d-1;sfx('cloth')}
 if(QM.tab==0){if(P.ArrowDown||P.KeyS){QM.reg=Math.min(LV.length-1,QM.reg+1);sfx('ui')}if(P.ArrowUp||P.KeyW){QM.reg=Math.max(0,QM.reg-1);sfx('ui')}}
 if(QM.tab==3){const n=TAL.length;if(P.ArrowRight||P.KeyD){QM.cur=(QM.cur+1)%n;sfx('ui')}if(P.ArrowLeft||P.KeyA){QM.cur=(QM.cur+n-1)%n;sfx('ui')}if(P.ArrowDown){QM.cur=Math.min(n-1,QM.cur+3);sfx('ui')}if(P.ArrowUp){QM.cur=Math.max(0,QM.cur-3);sfx('ui')}if(P.Enter||P.Space)qmAct({k:'tal',i:QM.cur})}
 if(QM.tab==4){const n=PGTK.length;if(P.ArrowDown||P.KeyS){PGD.tsel=Math.min(n-1,PGD.tsel+1);sfx('ui')}if(P.ArrowUp||P.KeyW){PGD.tsel=Math.max(0,PGD.tsel-1);sfx('ui')}if(P.Enter||P.Space)qmAct({k:'trl',i:PGD.tsel})}
 /* náhled stopy */const tk=QM.tab==4?PGTK[PGD.tsel]:null;if(tk&&tk!='zadna'&&T%3==0){PGD.pv.push({k:tk,x:812+R0(-8,8),y:420-(tk=='hvezdy'||tk=='noty'?60:tk=='zlato'?50:tk=='kvety'?70:12),vx:-R0(1.5,2.6),vy:-R0(.2,1.2)*(tk=='kvety'?.2:1),l:0,L:R0(30,50),a:Math.random()*6,s:1,c:['#ff7aa8','#ffd84a','#fff4f8','#ffd44a'][T%4]})}
 for(const t of PGD.pv){t.l++;t.x+=t.vx;t.y+=t.vy;t.a+=.12;if(t.k=='jiskry'||t.k=='stava')t.vy+=.08}PGD.pv=PGD.pv.filter(t=>t.l<t.L)};
function pgTabs(){const x0=146,w=128,g=6;PGT.forEach((t,i)=>{const x=x0+i*(w+g),sel=QM.tab==i,hv=pgHit(x,56,w,34,'tab',i);X.save();if(sel)X.translate(0,-3);m2Plank(x,56,w,34,t,hv||sel,sel?'g':null);X.restore()})}
dQM=function(){PGD.hits=[];qmBg();const hv=pgHit(14,10,118,36,'back',0);m2Plank(14,10,118,36,'◀ ZPĚT',hv);mRibbon(W/2,30,250,'DENÍK',1);
 /* počítadla vpravo nahoře */X.save();X.fillStyle='rgba(20,8,4,.6)';X.beginPath();X.roundRect(W-214,12,200,32,16);X.fill();X.strokeStyle='rgba(232,184,96,.5)';X.stroke();pgStarShape(W-194,28,9,1);X.textAlign='left';X.font='700 14px Georgia';X.fillStyle='#ffe6a0';X.fillText(pgStars()+'/24',W-180,33);hbCoin(W-120,28,8,T*.05);X.fillText(String(SV.st),W-106,33);X.restore();
 pgTabs();const a=Math.min(1,QM.t/12);X.save();X.globalAlpha=a;X.translate(0,(1-a)*14);
 try{[pgTabAreas,pgTabRoad,pgTabAch,pgTabTal,pgTabLook][QM.tab]()}catch(e){console.error('dnk',e)}
 X.restore();X.textAlign='center';X.font='12px Georgia';X.fillStyle='rgba(255,236,200,.6)';X.fillText('Tab / Q E – karty  •  šipky a Enter – výběr  •  Esc – zpět',W/2,H-8);X.textAlign='left'};
/* ---------- OBLASTI ---------- */
function pgTabAreas(){for(let i=0;i<LV.length;i++){const y=104+i*50,lk=i>SV.un,sel=QM.reg==i,hv=pgHit(18,y,246,44,'reg',i),m=pgMask(i);X.save();X.fillStyle=sel?'rgba(255,214,140,.22)':hv?'rgba(255,214,140,.12)':'rgba(20,8,4,.45)';X.beginPath();X.roundRect(18,y,246,44,8);X.fill();X.strokeStyle=sel?'#ffcf7a':'rgba(232,184,96,.35)';X.lineWidth=sel?2:1;X.stroke();
  X.fillStyle=MPCOL[i]||'#5a4a3a';X.beginPath();X.arc(40,y+22,13,0,7);X.fill();X.strokeStyle='#1a0a04';X.lineWidth=1.5;X.stroke();X.fillStyle='#fff3dc';X.font='700 12px Georgia';X.textAlign='center';X.fillText(String(i+1),40,y+26);
  X.textAlign='left';X.font='15px '+FONT;X.fillStyle=lk?'rgba(240,220,190,.4)':'#f4e2bc';X.fillText(lk?'???':LV[i].n,62,y+20);for(let k=0;k<3;k++)pgStarShape(70+k*17,y+33,6,m>>k&1);
  X.font='700 11px Georgia';X.fillStyle='rgba(255,230,190,.6)';X.textAlign='right';X.fillText(qCount(i)+'/3 $',256,y+37);if(pgSV().w[i]){pgWantedIco(244,y+17,.55,1)}X.restore()}
 const i=QM.reg,lk=i>SV.un,x=280,y=100,w=660,h=410;qPaper(x,y,w,h,i*11+3);X.save();X.textAlign='left';
 X.font='700 11px Georgia';X.fillStyle='#8a4a1a';X.fillText('KAPITOLA '+(i+1)+' / '+LV.length,x+20,y+24);X.font='26px '+FONT;X.fillStyle='#2a1206';X.fillText(lk?'Neprozkoumáno':LV[i].n,x+20,y+52);
 const b=SV.best&&SV.best[i];X.textAlign='right';X.font='12px Georgia';X.fillStyle='#5a3a1a';X.fillText(b?'Rekord '+b.sc+'  •  čas '+qMMSS(b.t):'zatím nedokončeno',x+w-20,y+26);if(b){X.font='26px '+FONT;X.fillStyle=RKC[b.r];X.fillText(b.r,x+w-20,y+54)}
 X.fillStyle='#7a5228';X.fillRect(x+16,y+64,w-32,1.5);
 /* hvězdy */const m=pgMask(i),lab=[['DOKONČENÍ','Projdi oblast až do konce.'],['SEMÍNKA SRDCE','Najdi všechna 3 skrytá semínka ('+seedCount(i)+'/3).'],['VÝZVA',qTxt(i,0)+'.']];
 for(let k=0;k<3;k++){const cx=x+20+k*210,cy=y+80,on=m>>k&1;X.fillStyle=on?'rgba(255,200,80,.18)':'rgba(60,30,10,.07)';X.beginPath();X.roundRect(cx,cy,200,98,8);X.fill();X.strokeStyle=on?'#c8901e':'rgba(122,82,40,.3)';X.lineWidth=1.4;X.stroke();
  pgStarShape(cx+30,cy+34,20,on,0,on?.25:0);X.textAlign='left';X.font='700 12px Georgia';X.fillStyle=on?'#8a5a06':'#5a3a1a';X.fillText(lab[k][0],cx+58,cy+24);X.font='12px Georgia';X.fillStyle='#3a2210';wrapL(lab[k][1],132).slice(0,3).forEach((l,j)=>X.fillText(l,cx+58,cy+41+j*14));
  if(k==1){for(let s=0;s<3;s++)seedShape(cx+18+s*20,cy+80,.42,seedMask(i)>>s&1)}else if(k==2&&!on){const bb=qCountable(QD[i][0])?qBest(i,0):0;X.font='italic 11px Georgia';X.fillStyle='#7a5a3a';X.fillText(on?'splněno':'zatím nesplněno',cx+14,cy+86)}else{X.font='italic 11px Georgia';X.fillStyle=on?'#2a7a2a':'#7a5a3a';X.fillText(on?'získáno':'zatím ne',cx+14,cy+86)}}
 /* zakázky */let zy=y+200;X.font='18px '+FONT;X.fillStyle='#2a1206';X.fillText('ZAKÁZKY',x+20,zy);X.font='italic 12px Georgia';X.fillStyle='#7a5a3a';X.fillText('splň během hraní, odměna jsou zlaťáky',x+120,zy);
 for(let j=0;j<3;j++){const yy=zy+26+j*34,d=QD[i][j+1],done=pgZk(i,j),K=QK[d[0]];X.fillStyle='rgba(122,82,40,.25)';X.fillRect(x+20,yy+14,390,1);qIco(K.c,x+34,yy,11,false);X.font='13px Georgia';X.fillStyle=done?'#4a6a2a':'#2a1406';X.fillText(qTxt(i,j+1),x+54,yy+5);
  X.textAlign='right';if(done)qCheck(x+400,yy,1,'#2a8a2a');else{X.font='700 13px Georgia';X.fillStyle='#8a4a0a';X.fillText('+'+d[2],x+384,yy+5);hbCoin(x+398,yy,7,0);if(qCountable(d)){const bb=Math.min(d[1],qBest(i,j+1));if(bb>0){X.font='10px Georgia';X.fillStyle='#7a5a3a';X.fillText('nejlépe '+bb+'/'+d[1],x+350,yy+5)}}}X.textAlign='left'}
 /* hledaný */const wx=x+440,wy=y+186,ww=200,wh=208,wd=!!pgSV().w[i],Wn=WNT[i];X.save();X.translate(wx+ww/2,wy+wh/2);X.rotate(.02);X.fillStyle='#e8d4a4';X.fillRect(-ww/2,-wh/2,ww,wh);X.strokeStyle='#6a4a22';X.lineWidth=2;X.strokeRect(-ww/2,-wh/2,ww,wh);
  X.textAlign='center';X.fillStyle='#3a2210';X.font='700 22px Georgia';X.fillText('SE HLEDÁ',0,-wh/2+28);X.font='700 13px Georgia';X.fillText(lk?'???':Wn.n,0,-wh/2+50);X.fillStyle='rgba(58,30,12,.85)';X.beginPath();X.arc(0,-6,34,0,7);X.fill();talIco(Wn.tal,0,-6,28,!wd);
  X.font='italic 12px Georgia';X.fillStyle='#5a3a1a';X.fillText('Odměna: talisman',0,44);X.fillText('„'+talById(Wn.tal).n+'“ + 60 $',0,60);X.font='italic 10.5px Georgia';X.fillStyle='#7a5a3a';X.fillText('najdi plakát na nástěnce v oblasti',0,82);
  if(wd){X.save();X.rotate(-.25);X.strokeStyle='#a8241a';X.lineWidth=4;X.strokeRect(-76,-22,152,44);X.font='30px '+FONT;X.fillStyle='#a8241a';X.fillText('DOPADEN',0,11);X.restore()}X.restore();
 if(lk){X.fillStyle='rgba(60,44,30,.55)';X.fillRect(x+6,y+70,w-12,h-80);X.textAlign='center';X.font='22px '+FONT;X.fillStyle='#f4e2bc';X.fillText('ZAMČENO – dokonči předchozí oblast',x+w/2,y+h/2+20)}
 X.restore()}
/* ---------- HVĚZDNÁ CESTA ---------- */
function pgTabRoad(){const st=pgStars(),ri=pgRankIdx(),R=PGR[ri],N=PGR[ri+1];
 X.save();X.fillStyle='rgba(20,8,4,.55)';X.beginPath();X.roundRect(20,100,920,120,12);X.fill();X.strokeStyle='rgba(232,184,96,.4)';X.stroke();
 qSheriff(86,160,44,Math.sin(T*.02)*.05);X.textAlign='left';X.font='700 12px Georgia';X.fillStyle='#e8c070';X.fillText('TVOJE HODNOST',150,136);X.font='34px '+FONT;X.fillStyle='#ffe6a0';X.fillText(R.n,150,172);
 X.font='14px Georgia';X.fillStyle='#e9d3a4';X.fillText(N?'Další: '+N.n+' za '+N.s+' ★ (chybí '+(N.s-st)+')':'Nejvyšší hodnost! Poušť ti patří.',150,198);
 const bx=560,bw=350;X.fillStyle='rgba(0,0,0,.4)';X.beginPath();X.roundRect(bx,150,bw,14,7);X.fill();const f=N?(st-R.s)/(N.s-R.s):1;X.fillStyle='#e8a020';X.beginPath();X.roundRect(bx,150,bw*Math.max(.02,f),14,7);X.fill();pgStarShape(bx-16,157,10,1);X.font='700 14px Georgia';X.fillStyle='#ffe6a0';X.textAlign='right';X.fillText(st+' / 24 hvězd',bx+bw,140);
 X.textAlign='left';X.font='12px Georgia';X.fillStyle='rgba(233,211,164,.8)';X.fillText('Sloty na talismany: '+pgSlots()+' / 4',bx,188);
 /* cesta */const x0=70,x1=900,yy=350,px=s=>x0+(x1-x0)*s/24;X.lineCap='round';X.strokeStyle='rgba(20,8,4,.6)';X.lineWidth=14;X.beginPath();X.moveTo(x0,yy);X.lineTo(x1,yy);X.stroke();X.strokeStyle='#8a5a2a';X.lineWidth=8;X.stroke();X.strokeStyle='#ffd44a';X.lineWidth=8;X.beginPath();X.moveTo(x0,yy);X.lineTo(px(st),yy);X.stroke();
 for(let s=1;s<24;s++){X.fillStyle=s<=st?'#ffe6a0':'rgba(40,20,8,.7)';X.beginPath();X.arc(px(s),yy,2.2,0,7);X.fill()}
 PGR.forEach((Rk,k)=>{const x=px(Rk.s),got=st>=Rk.s,up=k%2==0;X.save();qSheriff(x,yy,got?16:13,0,!got);X.textAlign='center';X.font='700 11px Georgia';X.fillStyle=got?'#ffe6a0':'rgba(233,211,164,.55)';X.fillText(Rk.s+' ★',x,yy+(up?34:-28));
  X.font='12px '+FONT;X.fillStyle=got?'#f4e2bc':'rgba(233,211,164,.5)';const nm=Rk.n.split(' ');nm.forEach((w2,j)=>X.fillText(w2,x,yy+(up?50+j*13:-54-(nm.length-1-j)*13)));
  if(k>0){const ry=up?yy+92+13*(nm.length-1):yy-104-13*(nm.length-1);X.fillStyle=got?'rgba(58,30,12,.9)':'rgba(58,30,12,.5)';X.beginPath();X.arc(x,ry,16,0,7);X.fill();X.strokeStyle=got?'#ffd44a':'rgba(232,184,96,.3)';X.lineWidth=1.5;X.stroke();X.globalAlpha=got?1:.45;pgRewIco(Rk,x,ry,13);X.globalAlpha=1}X.restore()});
 /* žeton hrdiny */const hx=px(st);X.save();X.translate(hx,yy-30+Math.sin(T*.08)*2);X.fillStyle='#2a1406';X.beginPath();X.moveTo(0,10);X.lineTo(-7,0);X.lineTo(7,0);X.closePath();X.fill();X.fillStyle='#3a8a3a';X.beginPath();X.arc(0,-6,9,0,7);X.fill();X.strokeStyle='#1a3a10';X.lineWidth=2;X.stroke();X.restore();
 X.textAlign='center';X.font='italic 13px Georgia';X.fillStyle='rgba(233,211,164,.8)';X.fillText('Každá oblast dává až 3 hvězdy: dokončení, všechna semínka a výzvu. Odměny hodností se připíšou samy.',W/2,500);X.restore()}
/* ---------- ÚSPĚCHY ---------- */
function pgTabAch(){let b=0,s=0,g=0;ACH2.forEach(A=>{const t=pgAchTier(A[0]);if(t>=1)b++;if(t>=2)s++;if(t>=3)g++});X.save();X.textAlign='left';X.font='13px Georgia';X.fillStyle='#e9d3a4';X.fillText('Medaile: '+pgAchPts()+' / '+ACH2.length*3,28,116);[[b,0],[s,1],[g,2]].forEach(([n,k],j)=>{pgMedal(190+j*70,111,8,k);X.fillStyle='#e9d3a4';X.fillText(String(n),202+j*70,116)});
 X.textAlign='right';X.fillText('Za medaile: bronz +25 $, stříbro +60 $, zlato +150 $ a titul',W-28,116);
 ACH2.forEach((A,j)=>{const c=j%3,r=j/3|0,x=22+c*308,y=128+r*62,w=300,h=56,t=pgAchTier(A[0]),v=A[3](),nx=t<3?A[4][t]:A[4][2],pv=t>0?A[4][t-1]:0,hv=pgHit(x,y,w,h,'ach',j);
  X.fillStyle=hv?'rgba(255,214,140,.16)':'rgba(20,8,4,.5)';X.beginPath();X.roundRect(x,y,w,h,8);X.fill();X.strokeStyle=t?ACHC[t-1]:'rgba(232,184,96,.3)';X.lineWidth=t?1.6:1;X.stroke();
  pgMedal(x+26,y+30,15,Math.max(0,t-1),!t);X.textAlign='left';X.font='700 13px Georgia';X.fillStyle='#f4e2bc';X.fillText(A[1],x+50,y+19);X.font='italic 11px Georgia';X.fillStyle='rgba(233,211,164,.75)';X.fillText(wrapL(t<3?A[2](nx):'Hotovo – všechny tři medaile',w-120)[0],x+50,y+33);
  const f=t>=3?1:Math.max(0,Math.min(1,(v-pv)/(nx-pv)));X.fillStyle='rgba(0,0,0,.45)';X.fillRect(x+50,y+41,w-120,5);X.fillStyle=t>=3?'#ffd44a':'#e8a020';X.fillRect(x+50,y+41,(w-120)*f,5);
  X.textAlign='right';X.font='700 11px Georgia';X.fillStyle='#ffe6a0';X.fillText(t>=3?'ZLATO':Math.min(v,nx)+'/'+nx,x+w-10,y+19);if(t<3){X.fillStyle=ACHC[t];X.fillText(ACHT[t],x+w-10,y+33);X.fillStyle='#ffd44a';X.fillText('+'+ACHR[t],x+w-22,y+47);hbCoin(x+w-12,y+43,5,0)}else if(A[5]){X.font='italic 10px Georgia';X.fillStyle='#9fe09a';X.fillText('stopa „'+PGTR[A[5]].n+'“',x+w-10,y+47)}});
 X.restore()}
/* ---------- TALISMANY ---------- */
function pgTabTal(){const s=pgSV(),sl=pgSlots();X.save();X.fillStyle='rgba(20,8,4,.55)';X.beginPath();X.roundRect(20,100,920,86,12);X.fill();X.strokeStyle='rgba(232,184,96,.4)';X.stroke();
 X.textAlign='left';X.font='16px '+FONT;X.fillStyle='#ffd27a';X.fillText('NASAZENO',40,128);X.font='italic 12px Georgia';X.fillStyle='rgba(233,211,164,.75)';X.fillText('Klikni na talisman níž – nasadíš ho nebo sundáš.',40,148);X.fillText('Další sloty dávají hodnosti na Hvězdné cestě.',40,166);
 for(let k=0;k<4;k++){const x=420+k*124,y=106,open=k<sl,id=s.eq[k];X.fillStyle=open?'rgba(255,214,140,.12)':'rgba(0,0,0,.35)';X.beginPath();X.roundRect(x,y,112,74,10);X.fill();X.strokeStyle=open?'#c9a95a':'rgba(120,90,60,.4)';X.setLineDash(open&&!id?[5,4]:[]);X.stroke();X.setLineDash([]);
  X.textAlign='center';if(id){X.fillStyle='rgba(58,30,12,.9)';X.beginPath();X.arc(x+56,y+30,22,0,7);X.fill();talIco(id,x+56,y+30,18);X.font='11px Georgia';X.fillStyle='#f4e2bc';X.fillText(talById(id).n,x+56,y+66)}
  else if(open){X.font='italic 12px Georgia';X.fillStyle='rgba(233,211,164,.6)';X.fillText('volný slot',x+56,y+42)}else{const R=PGR.filter(o=>o.slot)[k-1];X.font='18px Georgia';X.fillStyle='rgba(233,211,164,.5)';X.fillText('🔒',x+56,y+32);X.font='italic 10.5px Georgia';X.fillText(R?R.n+' ('+R.s+' ★)':'',x+56,y+56)}}
 TAL.forEach((t0,i)=>{const c=i%3,r=i/3|0,x=22+c*308,y=200+r*100,w=300,h=92,own=!!s.tal[t0.id],on=s.eq.includes(t0.id),sel=QM.cur==i,hv=pgHit(x,y,w,h,'tal',i);
  X.fillStyle=on?'rgba(120,200,90,.18)':hv||sel?'rgba(255,214,140,.16)':'rgba(20,8,4,.5)';X.beginPath();X.roundRect(x,y,w,h,10);X.fill();X.strokeStyle=on?'#8ad06a':sel?'#ffcf7a':'rgba(232,184,96,.3)';X.lineWidth=on||sel?2:1;X.stroke();
  X.fillStyle='rgba(58,30,12,.9)';X.beginPath();X.arc(x+40,y+46,28,0,7);X.fill();talIco(t0.id,x+40,y+46,24,!own);X.textAlign='left';X.font='700 14px Georgia';X.fillStyle=own?'#f4e2bc':'rgba(233,211,164,.5)';X.fillText(t0.n,x+80,y+24);
  X.font='12px Georgia';X.fillStyle=own?'rgba(233,211,164,.85)':'rgba(233,211,164,.45)';wrapL(t0.d,w-92).slice(0,2).forEach((l,j)=>X.fillText(l,x+80,y+42+j*14));
  X.font='italic 11px Georgia';X.fillStyle=on?'#9fe09a':own?'#ffd27a':'#c8906a';X.fillText(on?'✔ nasazeno':own?'Enter / klik – nasadit':wrapL(pgTalHow(t0.id),w-92)[0],x+80,y+80)});X.restore()}
/* ---------- VZHLED ---------- */
function pgTabLook(){const s=pgSV();X.save();X.textAlign='left';X.font='17px '+FONT;X.fillStyle='#ffd27a';X.fillText('STOPA ZA KAKTUSEM',28,120);
 PGTK.forEach((k,i)=>{const x=22,y=132+i*40,w=420,h=36,own=k=='zadna'||s.own[k],on=s.c.tr==k||(k=='zadna'&&!s.c.tr),sel=PGD.tsel==i,hv=pgHit(x,y,w,h,'trl',i);X.fillStyle=on?'rgba(120,200,90,.18)':hv||sel?'rgba(255,214,140,.16)':'rgba(20,8,4,.5)';X.beginPath();X.roundRect(x,y,w,h,8);X.fill();X.strokeStyle=on?'#8ad06a':sel?'#ffcf7a':'rgba(232,184,96,.25)';X.lineWidth=on||sel?2:1;X.stroke();
  X.fillStyle='rgba(58,30,12,.9)';X.beginPath();X.arc(x+22,y+18,14,0,7);X.fill();X.globalAlpha=own?1:.35;pgTrailIco(k,x+22,y+18,12);X.globalAlpha=1;X.font='700 13px Georgia';X.fillStyle=own?'#f4e2bc':'rgba(233,211,164,.45)';X.fillText(PGTR[k].n,x+44,y+16);X.font='italic 11px Georgia';X.fillStyle=own?'rgba(233,211,164,.7)':'#c8906a';X.fillText(own?(on?'✔ používáš':'Enter / klik – použít'):'🔒 '+PGTR[k].d,x+44,y+30)});
 /* náhled */const cx=812,cy=420;spot(cx,cy);pedestal(cx,cy,140);for(const t of PGD.pv)pgTrailDraw(t,t.x,t.y,Math.max(0,1-t.l/t.L));heroAt(SV.cls,cx,cy,1.9,{vx:2.2,t:T});
 X.textAlign='center';X.font='16px '+FONT;X.fillStyle='#ffe6a0';X.fillText(CLN[SV.cls].n,cx,cy+34);X.font='italic 13px Georgia';X.fillStyle='#e9d3a4';X.fillText(s.c.ti||'bez titulu',cx,cy+52);
 /* tituly */X.textAlign='left';X.font='17px '+FONT;X.fillStyle='#ffd27a';X.fillText('TITULY',470,120);const ts=pgTitles();X.font='italic 12px Georgia';X.fillStyle='rgba(233,211,164,.7)';if(!ts.length)X.fillText('Získáš je za zlaté medaile úspěchů.',470,140);
 let tx=470,ty=134;ts.forEach((ti,i)=>{X.font='700 12px Georgia';const tw=X.measureText(ti).width+24;if(tx+tw>940){tx=470;ty+=32}const on=s.c.ti==ti,hv=pgHit(tx,ty,tw,26,'tit',i);X.fillStyle=on?'rgba(120,200,90,.25)':hv?'rgba(255,214,140,.2)':'rgba(20,8,4,.55)';X.beginPath();X.roundRect(tx,ty,tw,26,13);X.fill();X.strokeStyle=on?'#8ad06a':'rgba(232,184,96,.4)';X.stroke();X.fillStyle='#f4e2bc';X.fillText(ti,tx+12,ty+17);tx+=tw+8});
 X.restore()}

/* staré obrazovky úspěchů → Deník */
{const _u=upd;upd=function(){if(state=='ach'){openQM(MAP&&MAP.ret?'map':'menu',null,2)}return _u()}}
