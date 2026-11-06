/* =====================================================================
   v88: BOJ A OBSAH – styl, protiútok, popravy, nabitý úder, elitní
   enemigos, zuřivost bossů, truhly, zvony výzvy, pomoc, efekty, tipy
   ===================================================================== */
const BOJ={v:0,rk:0,idle:0,mv:[],ctx:null,brk:0,pw:0,pcd:0,pa:0,pf:0,ch:0,ccd:0,rkUp:0,drop:0,rep:0,nw:0,last:null,lt:0,ma:0,sl:[],fz:[],chs:[],bell:null,
 sid:0,init:-1,dth:{},asD:1,kc:0,flash:0,fc:'255,90,60',tip:null,tipQ:[],eng:0,engT:0,hb:0,perf:{n:0,s:0},ban:null,bl:0,blx:0,blz:0,blf:1,inX:0,zt:0};
const BJR=['D','C','B','A','S','SS','SSS'],BJN=['DRSNÝ','CVALEM!','BRAVO!','¡AY, CARAMBA!','ŠERIF!','SUPER ŠERIF!','SRDCE POUŠTĚ!'],
 BJC=['#c8c8c8','#7fc8ff','#7fe07a','#ff9a3a','#ffd44a','#ff7ad8','#ff4a3a'];
const BJP={pt:5,hv:9,up:10,air:10,slam:12,rng:6,thr:14,parry:26,exec:30,chg:18,td:20,env:9,kick:9,wpn:7};
const BJL={pt:'úder',hv:'těžký úder',up:'výmet',air:'ze vzduchu',slam:'dupák',rng:'střela',thr:'hod',parry:'protiútok',exec:'poprava',chg:'nabitý úder',td:'atentát',env:'prostředí',kick:'kop',wpn:'zbraň'};
const BJE={panc:{n:'PANCÉŘOVANÝ',c:'#b4c0d0',r:'170,190,215',t:'#6a7684',d:'Pancíř prorazíš těžkým či nabitým úderem nebo hodem.'},
 rych:{n:'RYCHLÍK',c:'#5ab8ff',r:'80,170,255',t:'#2a64a0',d:'Rychlejší pohyb i útoky.'},
 vyb:{n:'VÝBUŠNÝ',c:'#ff9a3a',r:'255,140,40',t:'#c8561a',d:'Po smrti vybuchne – uteč od těla!'},
 zur:{n:'ZUŘIVEC',c:'#ff5a4a',r:'255,70,50',t:'#8a1212',d:'Víc zdraví, zraněný zuří a zrychlí.'}};
const BJCH=42;
Object.assign(SFX,{
 bjParry:{p:[['n',{d:.05,g:.55,ft:'highpass',f:3200}],['t',{w:'square',f:1900,f2:1750,d:.22,g:.09}],['t',{w:'triangle',f:2650,f2:2550,d:.45,g:.09}],['t',{f:240,f2:80,d:.16,g:.55}]],rv:.5},
 bjChg:{p:[['t',{w:'sawtooth',f:160,f2:640,d:.32,g:.08,a:.05}],['t',{w:'sine',f:320,f2:1280,d:.32,g:.09,a:.05}],['t',{w:'triangle',f:1600,f2:1600,d:.25,g:.06,dl:.28}]],rv:.3},
 bjBlast:{p:[['n',{d:.5,g:.8,f:2400,f2:90}],['t',{f:110,f2:30,d:.5,g:.95}],['t',{w:'square',f:70,f2:35,d:.2,g:.18}]],rv:.45},
 bjExe:{p:[['n',{d:.28,g:.5,ft:'bandpass',f:2400,f2:500,q:1}],['t',{f:95,f2:28,d:.7,g:.95}],['t',{w:'triangle',f:330,f2:326,d:1.1,g:.07,dl:.05}],['t',{w:'triangle',f:495,f2:490,d:.9,g:.05,dl:.05}]],rv:.65},
 bjRank:{p:[['t',{w:'triangle',f:880,f2:880,d:.12,g:.1}],['t',{w:'triangle',f:1320,f2:1320,d:.14,g:.1,dl:.06}],['t',{w:'triangle',f:1760,f2:1760,d:.26,g:.1,dl:.12}]],rv:.4,mi:120},
 bjChest:{p:[['n',{d:.32,g:.22,ft:'bandpass',f:700,f2:260,q:5}],['t',{w:'triangle',f:1560,f2:1560,d:.1,g:.08,dl:.2}],['t',{w:'triangle',f:2080,f2:2080,d:.12,g:.08,dl:.27}],['t',{w:'triangle',f:2620,f2:2620,d:.3,g:.08,dl:.34}]],rv:.4},
 bjBell:{p:[['t',{w:'sine',f:523,f2:521,d:2.2,g:.3}],['t',{w:'sine',f:1309,f2:1305,d:1.5,g:.1}],['t',{w:'sine',f:784,f2:782,d:1.8,g:.09}],['t',{w:'sine',f:1568,f2:1566,d:1.1,g:.05}],['n',{d:.04,g:.3,ft:'highpass',f:2500}]],rv:.75,mi:300},
 bjHb:{p:[['t',{f:62,f2:40,d:.13,g:.55}],['t',{f:56,f2:36,d:.13,g:.4,dl:.17}]],v:.8,mi:300},
 bjKill:{p:[['t',{f:70,f2:30,d:.9,g:.8}],['n',{d:.6,g:.25,f:900,f2:120,a:.02}],['t',{w:'triangle',f:220,f2:110,d:.8,g:.05}]],rv:.7,mi:500},
 bjEl:{p:[['t',{w:'sawtooth',f:110,f2:70,d:.35,g:.12}],['t',{w:'square',f:55,f2:50,d:.3,g:.08}]],rv:.3,mi:400}});

/* ---------- pomocné ---------- */
function bjOn(){return state=='play'&&!TR2&&p&&!p.dead}
function bjSV(){const s=pgSV();if(!s.ch||typeof s.ch!='object')s.ch={};if(!s.bl||typeof s.bl!='object')s.bl={};if(!s.tips||typeof s.tips!='object')s.tips={};return s}
function bjK(a){if(TOUCH)return({crouch:'KRYT',attack:'ÚTOK',heavy:'VÝMET',interact:'E'})[a]||a;return'['+keyName((SV.keys[a]||[])[0])+']'}
function bjRng(s){return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function bjBits(m){let n=0;m=m|0;while(m){n+=m&1;m>>=1}return n}
function bjChestN(){const s=bjSV();let n=0;for(const k in s.ch)n+=bjBits(s.ch[k]);return n}
function bjBellN(){return Object.keys(bjSV().bl).length}
function bjCoins(n,x,z){try{pgCoins(n,x-cam,LY-z+camZ)}catch(e){SV.st+=n}}
function bjCanX(e){return e&&e.st!='dead'&&!isB(e)&&!AN[e.t]&&e.t!='k'&&!e.civ&&e.st!='held'&&e.st!='thrown'&&((e.stn>0&&e.exw)||e.net>0)}

/* ---------- styl ---------- */
function bjSty(k,m){if(!bjOn())return;const L=BOJ.mv,b=BJP[k]||5,same=k==BOJ.last&&Math.abs(T-(BOJ.lT|0))<=2;let f=1;
 if(same)f=BOJ.lF||1;else if(L.length>=2&&L[L.length-1]==k&&L[L.length-2]==k){f=.3;BOJ.rep=45;BOJ.nw=0}else if(!L.slice(-4).includes(k)){f=1.4;BOJ.nw=34;BOJ.rep=0}else{BOJ.nw=0;BOJ.rep=0}
 BOJ.v=Math.min(699,BOJ.v+b*f*(m||1)*(1-BOJ.rk*.06));BOJ.idle=0;BOJ.lT=T;BOJ.lF=f;if(!same){L.push(k);if(L.length>8)L.shift()}BOJ.last=k;BOJ.lt=50;bjRank()}
function bjRank(){const r=Math.max(0,Math.min(6,BOJ.v/100|0));if(r>BOJ.rk){BOJ.rkUp=56;sfx('bjRank');if(r>=3&&p)pop(p.x,LY,p.z+168,BJN[r],BJC[r]);if(r>=1)bjTip('sty');const s=bjSV();if(r>(s.smx|0)){s.smx=r;try{pgAchCheck()}catch(e){}}}BOJ.rk=r}
{const _a=addSc;addSc=function(n){return _a(n*(1+BOJ.rk*.2))}}

/* ---------- tipy ---------- */
const BJT={parry:()=>'PROTIÚTOK: stiskni '+bjK('crouch')+' těsně před zásahem – útok odrazíš a útočníka omráčíš.',
 exec:()=>'Nepřítel je omráčený! Stiskni u něj '+bjK('attack')+' – POPRAVA ho vyřídí na místě.',
 chg:()=>'Podrž '+bjK('heavy')+' – NABITÝ ÚDER prorazí kryt, štít i pancíř.',
 sty:()=>'STYL roste za pestré tahy. Kdo opakuje pořád totéž, klesá. Vyšší styl = víc bodů a zlaťáků.',
 elite:()=>'ELITNÍ nepřítel! Barva aury prozradí jeho zvláštní schopnost (viz Deník → TAHY).',
 chest:()=>'Truhla s pokladem! Vyšplhej k ní a otevři ji '+bjK('interact')+'.',
 bell:()=>'ZVON VÝZVY: rozezvoň ho '+bjK('interact')+' a poraz dvě vlny nepřátel, než vyprší čas.',
 assist:()=>'Šerifova pomoc: po několika pádech tu rozdáváš silnější rány.',
 boss:()=>'Boss ZUŘÍ! Útočí rychleji – drž si odstup a trestej jeho chyby.',
 perf:()=>'Kvůli plynulosti jsem vypnul náročné světelné efekty (zapneš je v Nastavení).'};
function bjTip(k,force){const s=bjSV();if((!force&&s.tips[k])||BOJ.tipQ.includes(k)||(BOJ.tip&&BOJ.tip.k==k))return;BOJ.tipQ.push(k)}
function bjTipTick(){if(BOJ.tip){BOJ.tip.t++;if(BOJ.tip.t>360)BOJ.tip=null}else if(BOJ.tipQ.length&&state=='play'&&!TR2){const k=BOJ.tipQ.shift();BOJ.tip={k,t:0,tx:BJT[k]()};bjSV().tips[k]=1;try{saveSV()}catch(e){}}}

/* ---------- protiútok ---------- */
function bjParry(dir){BOJ.pw=0;BOJ.pcd=0;BOJ.pf=20;p.inv=Math.max(p.inv|0,40);p.ht=0;stop=Math.max(stop,7);shake=Math.max(shake,7);SLO=Math.max(SLO,340);sfx('bjParry');sfx('block');
 const d=-(dir||-p.face);p.face=d||p.face;ring(p.x+p.face*16,LY,44,'rgba(150,225,255,.95)',14,p.z+56);ring(p.x+p.face*16,LY,80,'rgba(255,255,255,.6)',18,p.z+56);
 for(let i=0;i<14;i++)par.push({x:p.x+p.face*18,y:LY,z:p.z+56+R(-10,10),vx:p.face*R(1,6)+R(-1,1),vz:R(-2,5),l:R(14,26),c:i%2?'#bff4ff':'#fff',s:R(2,3.5)});
 let best=null,bd=150;for(const e of ens){if(e.st=='dead'||AN[e.t]||e.civ||e.st=='held')continue;const ad=Math.abs(e.x-p.x);if(ad<bd&&Math.abs(e.z-p.z)<90){bd=ad;best=e}}
 if(best&&!isB(best)&&best.t!='k'){best.stn=Math.max(best.stn|0,115);best.exw=1;best.kb=Math.sign(best.x-p.x)*3;best.hs=0;pop(best.x,LY,best.z+130,'PROTIÚTOK!','#9fe8ff');burst(best.x,LY,best.z+60,'#bff4ff')}
 else pop(p.x,LY,p.z+130,'ODRAŽENO!','#9fe8ff');
 const s=bjSV();s.par=(s.par|0)+1;bjSty('parry');try{pgAchCheck()}catch(e){}}
{const _hp=hurtP;hurtP=function(d,dir){
 if(BOJ.pw>0&&bjOn()&&!(p.inv>0)&&!(p.ds>0)&&!(p.cu>0)&&!p.hang&&!p.climb){bjParry(dir);return}
 const h0=p?p.hp:0,l0=p?p.lives|0:0;const r=_hp.apply(this,arguments);
 if(p&&!TR2&&(p.hp<h0||(p.lives|0)<l0)){if(BOJ.v>0){BOJ.v=Math.max(0,BOJ.v-150);BOJ.drop=40;BOJ.rk=Math.min(BOJ.rk,BOJ.v/100|0)}BOJ.mv.length=0;bjTip('parry');if(p.dead||(p.lives|0)<l0){BOJ.dth[li]=(BOJ.dth[li]|0)+1;bjAssist()}}
 return r}}

/* ---------- poprava ---------- */
function bjExec(e){const c0=BOJ.ctx;BOJ.ctx='exec';try{sfx('bjExe',e.x);sfx('td',e.x);stop=Math.max(stop,12);shake=Math.max(shake,12);SLO=Math.max(SLO,460);BOJ.flash=12;BOJ.fc='255,80,50';
 comboHit();comboKill(e);addSc(250);pop(e.x,LY,e.z+150,'POPRAVA!','#ff4a3a');burst(e.x,LY,e.z+60,'#ffdcc8');ring(e.x,LY,64,'rgba(255,90,60,.85)',18,e.z+56);spawnP(e.x,LY,14,'#7a1010',3,70,e.z);
 for(let i=0;i<10;i++)par.push({x:e.x,y:LY,z:e.z+60,vx:p.face*R(2,7),vz:R(1,6),l:R(18,30),c:i%2?'#ffd44a':'#fff',s:R(2,4)});
 BOJ.sl.push({x:e.x,z:e.z+62,d:p.face,l:14,big:2});
 try{if(hum(e))brOnDeath(e)}catch(er){}const hp0=e.hp;e.hp=0;e.st='dead';e.dt=0;e.vz=6;e.z+=1;e.kb=p.face*7;e.stn=0;e.net=0;e.exw=0;if(e.ls){e.ls=null;if(p.tied==e)p.tied=null}if(carry==e)carry=null;kills++;
 try{dropE(e)}catch(er){}if(Math.random()<.35)pk.push({x:e.x,y:e.y,z:e.z+40,vz:5,k:'food'});bjCoins(2,e.x,e.z+100);
 const s=bjSV();s.exe=(s.exe|0)+1;bjSty('exec',1.4);bjKill(e,'exec');try{pgAchCheck()}catch(er){}}finally{BOJ.ctx=c0}}
{const _hc=hitCheck;hitCheck=function(){if(TR2||!p)return _hc();const c0=BOJ.ctx;BOJ.ctx=(p.w&&!RG[p.w])?'wpn':p.up?'up':p.hv?'hv':'pt';
 try{const C=SV.cls,rg=(p.w&&!RG[p.w])?92:(p.hv?MEL[C].rgh:MEL[C].rg)+14;const t=bjOn()?ens.find(e=>{if(!bjCanX(e))return false;const dx=(e.x-p.x)*p.face;return dx>-18&&dx<rg&&Math.abs(p.z-e.z)<54}):null;if(t)bjExec(t);return _hc()}finally{BOJ.ctx=c0}}}
{const _a=airHit;airHit=function(){const c0=BOJ.ctx;BOJ.ctx='air';try{return _a.apply(this,arguments)}finally{BOJ.ctx=c0}}}
{const _s=slam;slam=function(){const c0=BOJ.ctx;BOJ.ctx='slam';try{return _s.apply(this,arguments)}finally{BOJ.ctx=c0}}}
{const _t=takedown;takedown=function(e,r){const o=_t.apply(this,arguments);try{if(bjOn()&&e){bjSty('td',1.5);bjKill(e,'td')}}catch(er){}return o}}

/* ---------- nabitý úder ---------- */
function bjBlast(){const C=SV.cls,bm=MEL[C].d*(1+upv('blade')*.3),dmg=bm*3.2,f=p.face,hv0=p.hv,c0=BOJ.ctx;BOJ.ccd=46;let n=0;
 BOJ.ctx='chg';BOJ.brk=1;p.hv=1;
 try{for(const e of ens.slice()){if(e.st=='dead'||e.st=='under'||e.st=='rise'||e.bst=='hide'||e.bst=='under'||e.civ||e.st=='held')continue;const dx=(e.x-p.x)*f;if(dx>-70&&dx<178&&Math.abs(e.z-p.z)<78){const b=isB(e);hurtE(e,b?dmg*.6:dmg,dx>=0?f:-f,b?0:7,b?0:1);if(!b&&e.st!='dead'&&e.t!='k'&&!AN[e.t]){e.stn=Math.max(e.stn|0,80);e.exw=1}n++}}
  bar.forEach(b=>{const dx=(b.x-p.x)*f;if(!b.g&&dx>-40&&dx<178&&Math.abs(b.z-p.z)<64)hitBar(b,3)})}
 finally{BOJ.ctx=c0;BOJ.brk=0;p.hv=hv0}
 sfx('bjBlast');sfx('heavy');shake=Math.max(shake,13);stop=Math.max(stop,6);
 ring(p.x+f*60,LY,118,'rgba(255,214,130,.9)',22,p.z+4);ring(p.x+f*40,LY,62,'rgba(255,255,255,.8)',12,p.z+44);spawnP(p.x+f*50,LY,20,lv.du||'#b8a080',5,12,p.z);
 for(let i=0;i<16;i++)par.push({x:p.x+f*R(10,150),y:LY,z:p.z+R(4,96),vx:f*R(2,8),vz:R(1,5),l:R(18,30),c:i%2?'#ffe6a0':'#fff',s:R(2,4)});
 BOJ.bl=18;BOJ.blx=p.x;BOJ.blz=p.z;BOJ.blf=f;noise(p.x,LY,420);pop(p.x+f*70,LY,p.z+150,'NABITÝ ÚDER!','#ffd44a');if(!n)bjSty('chg',.4)}

/* ---------- výbuch výbušného elity ---------- */
function bjBoom(F){const e=F.e,x=e?e.x:F.x,z=e?e.z:F.z,c0=BOJ.ctx;sfx('boom',x);sfx('heavy',x);shake=Math.max(shake,12);fx.push({k:'boom',x,y:LY,z:z+40,l:28,L:28});ring(x,LY,124,'rgba(255,170,60,.9)',22,z);ring(x,LY,70,'rgba(255,240,200,.9)',14,z+30);
 spawnP(x,LY,24,'#ff9a3a',5,60,z);spawnP(x,LY,14,'#3a3030',3,60,z);if(e)e.dt=Math.max(e.dt|0,140);
 if(bjOn()&&Math.abs(p.x-x)<108&&Math.abs(p.z-z)<84)hurtP(1,Math.sign(p.x-x)||1);
 BOJ.ctx='env';try{for(const o of ens.slice()){if(o==e||o.st=='dead'||o.civ||o.st=='held')continue;if(Math.abs(o.x-x)<128&&Math.abs(o.z-z)<84)hurtE(o,isB(o)?1.5:3,Math.sign(o.x-x)||1,6,0)}}finally{BOJ.ctx=c0}
 bar.forEach(b=>{if(!b.g&&Math.abs(b.x-x)<112&&Math.abs(b.z-z)<72)hitBar(b,3)});noise(x,LY,520)}

/* ---------- zásahy enemigos ---------- */
function bjKill(e,ctx){if(TR2||!e||e._bk)return;e._bk=1;if(isB(e)||AN[e.t]||e.civ)return;const s=bjSV();
 if(e.el){s.eli=(s.eli|0)+1;bjCoins(5,e.x,e.z+110);pop(e.x,LY,e.z+168,'ELITA PADLA! +5 $','#ffd44a');sfx('coin');if(e.el=='vyb')BOJ.fz.push({e,x:e.x,z:e.z,t:48});try{pgAchCheck()}catch(er){}}
 if(BOJ.rk>=3)bjCoins(BOJ.rk>=5?2:1,e.x,e.z+90);
 const left=ens.some(o=>o!=e&&o.st!='dead'&&!AN[o.t]&&!o.civ&&o.st!='pat'&&o.st!='inv'&&o.st!='ride'&&Math.abs(o.x-p.x)<950);
 if(!left&&BOJ.eng>=3&&!(BOJ.kc>0)&&!bossE&&!(BOJ.bell&&BOJ.bell.st==1)){SLO=Math.max(SLO,700);BOJ.kc=70;BOJ.eng=0;sfx('bjKill');pop(e.x,LY,e.z+186,'ČISTO!','#ffe6a0')}}
{const _h=hurtE;hurtE=function(e,d,dir,la,mel){
 if(!e||TR2||e.st=='dead')return _h.apply(this,arguments);
 const ctx=BOJ.ctx||(mel?'pt':'rng'),hp0=e.hp;
 if(e.el=='panc'&&e.arm>0&&!isB(e)&&!(e.st=='under'||e.st=='rise')){const big=BOJ.brk||(mel&&(p.hv||p.up))||ctx=='slam'||ctx=='thr'||ctx=='env'||ctx=='exec';
  if(big)e.arm=Math.max(0,e.arm-2);else{e.arm--;d*=.3}sfx('block',e.x);spawnP(e.x,LY,7,'#c8d0dc',3,60,e.z);
  for(let i=0;i<5;i++)par.push({x:e.x,y:LY,z:e.z+60,vx:-(dir||1)*R(1,4)+R(-1,1),vz:R(2,6),l:R(14,24),c:'#e8f0ff',s:2});pop(e.x,LY,e.z+118,e.arm>0?'PANCÍŘ '+e.arm+'/3':'PANCÍŘ ZNIČEN!','#c8d4e8')}
 if(BOJ.asD>1)d*=BOJ.asD;
 const he0=BOJ.he;BOJ.he=e;let r;try{r=_h.call(this,e,d,dir,la,mel)}finally{BOJ.he=he0}
 if(la>5&&!e._gb)e._la=3;e._gb=0;
 if(e.hp<hp0&&!AN[e.t]&&!e.civ&&!TR2){const kill=e.hp<=0;if(state=='play')bjSty(ctx,kill?1.6:1);if(mel||ctx=='chg'||ctx=='air'||ctx=='slam')BOJ.sl.push({x:e.x,z:e.z+58,d:dir||p.face,l:10,big:ctx=='hv'||ctx=='up'||ctx=='chg'?1:0});if(kill)bjKill(e,ctx)}
 return r}}
{const _p=pop;pop=function(x,y,z,t,c){const e=BOJ.he;if(e&&(t=='KRYT PROLOMEN!'||t=='ŠTÍT PROLOMEN!'||t=='PRŮLOM!')){e.exw=1;e._gb=1;e._la=0}return _p.apply(this,arguments)}}
{const _m=emv;emv=function(e,dx){if(e&&e.el&&(e.el=='rych'||(e.el=='zur'&&e.enr))&&!isB(e))dx*=1.42;return _m(e,dx)}}
{const _u=updE;updE=function(e){if(!e||TR2||BOJ.inX)return _u(e);
 const sn=e.stn|0;if(sn>(e._sp|0)&&!(e._la>0)&&!isB(e))e.exw=1;if(e._la>0)e._la--;
 const c0=BOJ.ctx;if(!c0)BOJ.ctx=e.st=='thrown'?'thr':'env';let r;try{r=_u(e)}finally{BOJ.ctx=c0}
 e._sp=e.stn|0;if(!(e.stn>0)&&!(e.net>0))e.exw=0;
 if(e.st=='dead')return r;
 if(e.el&&!isB(e)){if(e.el=='zur'&&!e.enr&&e.hp<e.emx*.5){e.enr=1;pop(e.x,LY,e.z+136,'ZUŘÍ!','#ff4a3a');sfx('bjEl',e.x);ring(e.x,LY,50,'rgba(255,70,50,.85)',16,e.z+40)}
  if((e.el=='rych'||(e.el=='zur'&&e.enr))&&e.cd>0&&T%2==0)e.cd--;
  if(e.el=='zur'&&e.enr&&T%5==0)par.push({x:e.x+R(-12,12),y:LY,z:e.z+R(60,110),vx:R(-.6,.6),vz:R(1,2.4),l:R(16,26),c:'rgba(255,90,60,.55)',s:R(4,7)})}
 if(isB(e)&&e.mhp&&e.hp>0&&state=='play'&&!cut){
  if(!e.enr&&e.hp<e.mhp*.3){e.enr=1;BOJ.ban={t:0,tx:'ZUŘIVOST!',sub:((e.B&&BD[e.B])?BD[e.B].n:'Boss')+' útočí rychleji'};sfx('roar',e.x);sfx('bjEl',e.x);shake=Math.max(shake,12);bjTip('boss')}
  if(e.enr){if(T%5==0){BOJ.inX=1;try{_u(e)}finally{BOJ.inX=0}}if(T%3==0)par.push({x:e.x+R(-40,40),y:LY,z:e.z+R(20,170),vx:R(-.8,.8),vz:R(1,3),l:R(18,30),c:'rgba(255,60,30,.6)',s:R(3,6)})}}
 return r}}

/* ---------- elity, truhly, zvon: rozmístění ---------- */
function bjElite(e,k){e.el=k;e.hp*=k=='zur'?1.7:1.45;e.emx=e.hp;e.ks=(e.ks||1)*1.07;if(k=='panc')e.arm=3;const c=BJE[k].t;if(e.pal)e.pal=Object.assign({},e.pal,{tor:c});if(e.v&&e.v.o){e.v.o.coatC=shade(c,-.3);e.v.o.sashC=c}}
function bjPickEl(e){const mel='fpcmshl'.includes(e.t),ks=mel?['panc','rych','vyb','zur']:['panc','vyb','zur'];return ks[Math.random()*ks.length|0]}
function bjInitLv(){BOJ.init=BOJ.sid;if(TR2||!lv)return;
 const C=ens.filter(e=>hum(e)&&e.st!='dead'&&!e.el&&!e.fw),ch=.05+li*.02+SV.dif*.03;let n=Math.round(C.length*ch);if(n<1&&li>=1&&C.length>=5)n=1;
 const pool=C.slice();for(let i=0;i<n&&pool.length;i++){const e=pool.splice(Math.random()*pool.length|0,1)[0];bjElite(e,bjPickEl(e))}
 try{bjPlace()}catch(er){console.error('bjPlace',er)}}
function bjPlace(){BOJ.chs=[];BOJ.bell=null;if(TR2||!lv||lv.k=='sea')return;const s=bjSV(),r=bjRng(li*7919+101),lim=lv.end=='final'?lv.len-1500:(lv.bk&&typeof BX=='number'&&BX>0?BX-700:lv.len-800);
 const cand=sol.filter(o=>!o.gone&&o.dx==null&&!o.mv&&o.k!='deck'&&o.t>=110&&o.t<900&&o.w>=40&&o.x>600&&o.x+o.w<lim).map(o=>({x:Math.round(o.x+o.w/2),z:o.t,k:o.k})).filter(c=>Math.abs(floorAt(c.x,c.z+4,9)-c.z)<1&&!wallAt(c.x,c.z,70,14));
 cand.sort((a,b)=>b.z-a.z);const top=cand.slice(0,14),pick=[];while(top.length&&pick.length<2){const c=top.splice(r()*top.length|0,1)[0];if(pick.every(q=>Math.abs(q.x-c.x)>550))pick.push(c)}
 pick.sort((a,b)=>a.x-b.x).forEach((c,i)=>BOJ.chs.push({x:c.x,z:c.z,i,op:(s.ch[li]>>i&1)?2:0,t:0}));
 if(lv.k!='train'){const B=[];for(let x=900;x<lim-500;x+=50){const z=floorAt(x,60,9);if(z<-40||z>60)continue;let ok=1,bad=0;
  for(let dx=-60;dx<=60;dx+=20){const f=floorAt(x+dx,z+40,9);if(Math.abs(f-z)>4||wallAt(x+dx,z,130,12)||sol.some(o=>o.ow&&!o.gone&&x+dx>o.x-10&&x+dx<o.x+o.w+10&&o.t>z+8&&o.t<z+160))ok=0}if(!ok||BOJ.chs.some(c=>Math.abs(c.x-x)<300)||deco.some(d=>['gear','lpit','board','cage','ccell','heart','lbcar','lpipe'].includes(d.k)&&Math.abs((d.x||0)-x)<220))continue;
  for(let dx=-380;dx<=380;dx+=38){const f=floorAt(x+dx,z+40,9);if(f<z-30||f>z+70||wallAt(x+dx,z+72,100,10))bad++}B.push({x,z,bad,m:Math.abs(x-lv.len*.5)})}
  const mn=Math.min(99,...B.map(b=>b.bad)),C=B.filter(b=>b.bad<=Math.max(3,mn));if(C.length){const c=C[r()*C.length|0];BOJ.bell={x:c.x,z:c.z,st:s.bl[li]?3:0,t:0,T:60*45,w:0,cd:0,ens:[],sw:0}}}}
{const _s=start;start=function(i,arr){const r=_s.apply(this,arguments);try{BOJ.sid++;BOJ.v=0;BOJ.rk=0;BOJ.mv.length=0;BOJ.ch=0;BOJ.pw=0;BOJ.fz=[];BOJ.sl=[];BOJ.chs=[];BOJ.bell=null;BOJ.ban=null;BOJ.kc=0;BOJ.eng=0;BOJ.flash=0;
 if(BOJ.zt){try{B1C.zt=1}catch(e){}BOJ.zt=0}
 BOJ.asD=1;bjAssist()}catch(er){console.error('bjst',er)}return r}}
function bjAssist(){const d=BOJ.dth[li]|0,a=TR2||SV.dif>=2?1:d>=5?1.35:d>=3?1.18:1;if(a>BOJ.asD)bjTip('assist',1);BOJ.asD=a}
{const _m=mkE;mkE=function(t,x,y){const e=_m(t,x,y);try{if(e&&!AN[t]&&!TR2&&li>0&&e.hp>0)e.hp*=1+li*.04}catch(er){}return e}}
{const _o=openRes;openRes=function(){try{if(!TR2)BOJ.dth[li]=0}catch(e){}return _o.apply(this,arguments)}}

/* ---------- truhly a zvon ---------- */
function bjNearChest(){return BOJ.chs.find(c=>!c.op&&Math.abs(c.x-p.x)<48&&Math.abs(c.z-p.z)<34&&p.on)}
function bjNearBell(){const b=BOJ.bell;return b&&b.st==0&&Math.abs(b.x-p.x)<60&&Math.abs(b.z-p.z)<40&&p.on?b:null}
function bjOpen(c){c.op=1;c.t=0;const s=bjSV();s.ch[li]=(s.ch[li]|0)|1<<c.i;try{saveSV()}catch(e){}sfx('bjChest');sfx('coin');bjCoins(30,c.x,c.z+40);pop(c.x,LY,c.z+96,'POKLAD! +30 $','#ffd44a');
 for(let i=0;i<18;i++)par.push({x:c.x+R(-10,10),y:LY,z:c.z+22,vx:R(-3,3),vz:R(3,7),l:R(30,50),c:i%3?'#ffd44a':'#fff3b0',s:R(2,4)});ring(c.x,LY,40,'rgba(255,220,120,.8)',16,c.z+10);
 if(Math.random()<.3)pk.push({x:c.x,y:LY,z:c.z+40,vz:5,k:'food'});try{pgAchCheck()}catch(e){}}
function bjBellStart(b){b.st=1;b.t=0;b.w=0;b.ens=[];b.sw=1;b.wt=0;sfx('bjBell',b.x);shake=Math.max(shake,6);BOJ.ban={t:0,tx:'ZVON VÝZVY!',sub:'poraz dvě vlny do 45 sekund'};bjWave(b)}
function bjWave(b){b.w++;const n=b.w==1?3:4,types=[...(lv.en||'gf')].filter(t=>t!='k'&&!AN[t]&&LOOK[t]),TT=types.length?types:['g','f'];
 for(let i=0;i<n;i++){const side=i%2?1:-1;let ex=null,fz=0;for(let k=0;k<8&&ex==null;k++){const x=Math.round(b.x+side*(k%2?-1:1)*R(210,380));const f=floorAt(x,b.z+60,9);if(Math.abs(f-b.z)<60&&!wallAt(x,f,100,10)){ex=x;fz=f}}if(ex==null){ex=b.x+side*240;fz=b.z}
  const t=TT[Math.random()*TT.length|0],e=mkE(t,ex,LY);e.z=fz+170;e.gf=fz;e.vz=0;e.st='alert';e.tm=30;e.face=Math.sign(p.x-ex)||1;e.bw=1;e.px0=ex-200;e.px1=ex+200;
  if(i==0||(b.w==2&&i==1))bjElite(e,bjPickEl(e));ens.push(e);b.ens.push(e);spawnP(ex,LY,10,'#d8c8a8',3,30,fz)}
 pop(b.x,LY,b.z+210,'VLNA '+b.w+'/2','#ffb14a');sfx('bjEl',b.x)}
function bjBellTick(){const b=BOJ.bell;if(!b)return;if(b.sw>0)b.sw=Math.max(0,b.sw-.008);
 if(b.st==1){b.t++;const alive=b.ens.filter(e=>e.st!='dead'&&e.z>LOWZ).length;
  if(alive==0){if(b.w<2){b.wt=(b.wt|0)+1;if(b.wt>50){b.wt=0;b.sw=1;sfx('bjBell',b.x);bjWave(b)}}else{b.st=3;const s=bjSV();s.bl[li]=1;try{saveSV()}catch(e){}bjCoins(50,b.x,b.z+120);sfx('bjBell',b.x);sfx('win');b.sw=1;BOJ.ban={t:0,tx:'ZVON UTICHL!',sub:'+50 $  •  výzva splněna'};bjSty('env',2);try{pgAchCheck()}catch(e){}}}
  else if(b.t>=b.T){b.st=2;b.cd=480;sfx('deny');BOJ.ban={t:0,tx:'ČAS VYPRŠEL',sub:'zvon půjde zkusit znovu za chvíli'}}}
 else if(b.st==2&&--b.cd<=0){b.st=0}}
{const _ip=interactP;interactP=function(){if(bjOn()){const c=bjNearChest();if(c){bjOpen(c);return}const b=bjNearBell();if(b){bjBellStart(b);return}}return _ip.apply(this,arguments)}}

/* ---------- smyčka (jen hra) ---------- */
{const _u=updP;updP=function(){if(TR2||!p||p.dead||state!='play')return _u.apply(this,arguments);
 if(kp('crouch')&&p.on&&!(BOJ.pcd>0)&&!p.climb&&!p.hang&&!carry){BOJ.pw=[15,11,8][SV.dif]||11;BOJ.pcd=30;BOJ.pa=14}
 if(kp('heavy'))bjTip('chg');
 const c0=BOJ.ctx;BOJ.ctx='kick';let r;try{r=_u.apply(this,arguments)}finally{BOJ.ctx=c0}
 if(!p||p.dead)return r;
 const hold=kd('heavy')&&p.on&&!carry&&!p.climb&&!p.hang&&!(p.pk>0)&&!(p.ds>0)&&!p.tied&&!(BOJ.ccd>0)&&!(p.td>0);
 if(hold&&!kp('attack')){BOJ.ch++;if(BOJ.ch==BJCH){sfx('bjChg');ring(p.x,LY,42,'rgba(255,220,120,.85)',14,p.z+50)}if(BOJ.ch>16){p.vx*=.55;if(T%2==0){const k=Math.min(1,BOJ.ch/BJCH),a=Math.random()*6.28;par.push({x:p.x+Math.cos(a)*R(14,30),y:LY,z:p.z+50+Math.sin(a)*R(10,40),vx:-Math.cos(a)*1.2,vz:-Math.sin(a)*1.2+.4,l:14,c:k>=1?'#fff4c0':'rgba(255,200,90,.8)',s:k>=1?3:2})}}}
 else{if(BOJ.ch>=BJCH&&!kd('heavy')&&p.on&&!carry)bjBlast();BOJ.ch=0}
 return r}}
function bjFrame(){if(BOJ.init!=BOJ.sid)bjInitLv();
 for(const k of['rkUp','drop','rep','nw','lt','pf','pa','pw','pcd','ccd','flash','bl'])if(BOJ[k]>0)BOJ[k]--;
 BOJ.idle++;if(BOJ.idle>110&&BOJ.v>0){BOJ.v=Math.max(0,BOJ.v-(.45+BOJ.rk*.3));BOJ.rk=Math.min(BOJ.rk,BOJ.v/100|0)}
 if(BOJ.kc>0){BOJ.kc--;try{if(B1C.zt==1||BOJ.zt){B1C.zt=BOJ.kc>8?1.07:1;BOJ.zt=BOJ.kc>8?1:0}}catch(e){}}
 BOJ.sl=BOJ.sl.filter(s=>--s.l>0);
 for(const F of BOJ.fz){F.t--;if(F.t%8==0&&F.e)sfx('fuse',F.e.x);if(F.t<=0)bjBoom(F)}BOJ.fz=BOJ.fz.filter(F=>F.t>0);
 bjBellTick();
 if(T%6==0&&p){let n=0;for(const e of ens){if(e.st=='dead'||AN[e.t]||e.civ||isB(e))continue;if(e.st!='pat'&&e.st!='inv'&&e.st!='ride'&&Math.abs(e.x-p.x)<800)n++;
   if(e.el&&Math.abs(e.x-p.x)<560){bjTip('elite');e.seen=(e.seen|0)+6}if(bjCanX(e)&&Math.abs(e.x-p.x)<320)bjTip('exec')}
  if(n>0){BOJ.eng=Math.max(BOJ.eng,n);BOJ.engT=200}else if((BOJ.engT-=6)<=0)BOJ.eng=0;
  for(const c of BOJ.chs)if(!c.op&&Math.abs(c.x-p.x)<620)bjTip('chest');const b=BOJ.bell;if(b&&b.st==0&&Math.abs(b.x-p.x)<620)bjTip('bell')}
 for(const c of BOJ.chs)if(c.op==1)c.t++;
 if(BOJ.ban){BOJ.ban.t++;if(BOJ.ban.t>150)BOJ.ban=null}
 if(p&&!p.dead&&p.hp<=Math.max(1,Math.floor(p.mx*.25))&&p.hp>0){if(++BOJ.hb>=54){BOJ.hb=0;sfx('bjHb')}}else BOJ.hb=40}
LHK.push(()=>{if(TR2||!p)return;try{bjFrame()}catch(e){console.error('bjf',e)}});
{const _u=upd;upd=function(){const r=_u.apply(this,arguments);try{bjTipTick()}catch(e){}return r}}

/* ---------- kreslení ve světě ---------- */
function bjChestDraw(c){const x=c.x-cam,y=LY-c.z;if(x<-60||x>W+60)return;const open=c.op>0,k=c.op==1?Math.min(1,c.t/14):open?1:0;X.save();X.translate(x,y);
 X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.ellipse(0,0,24,5,0,0,7);X.fill();
 if(open&&c.op==1&&c.t<90){const g=Math.max(0,1-c.t/90);X.save();X.globalCompositeOperation='lighter';const G=X.createRadialGradient(0,-24,2,0,-24,70);G.addColorStop(0,'rgba(255,220,120,'+(.6*g)+')');G.addColorStop(1,'rgba(255,200,90,0)');X.fillStyle=G;X.fillRect(-70,-94,140,140);X.restore()}
 X.lineWidth=2;X.strokeStyle='#1a0c04';X.fillStyle='#7a4a22';X.beginPath();X.roundRect(-20,-22,40,22,3);X.fill();X.stroke();X.fillStyle='#5a3416';X.fillRect(-20,-12,40,3);
 X.fillStyle='#c9a24a';X.fillRect(-15,-22,4,22);X.fillRect(11,-22,4,22);
 if(open){X.fillStyle='#2a1406';X.fillRect(-18,-24,36,4);if(c.op==1&&c.t<40){X.fillStyle='#ffd44a';for(let i=0;i<5;i++){X.beginPath();X.arc(-10+i*5,-24-Math.sin(i*2+c.t*.2)*2,3,0,7);X.fill()}}}
 X.save();X.translate(0,-22);X.rotate(-k*1.9);X.fillStyle='#8a5428';X.beginPath();X.moveTo(-20,0);X.lineTo(-20,-6);X.quadraticCurveTo(0,-16,20,-6);X.lineTo(20,0);X.closePath();X.fill();X.stroke();
 X.fillStyle='#c9a24a';X.fillRect(-15,-10,4,10);X.fillRect(11,-10,4,10);if(!open){X.fillStyle='#e8c860';X.fillRect(-3,-3,6,7);X.strokeRect(-3,-3,6,7)}X.restore();
 if(!open){const g=(T+c.i*37)%80;if(g<16){const a=Math.sin(g/16*Math.PI);X.save();X.globalCompositeOperation='lighter';X.fillStyle='rgba(255,240,180,'+a+')';X.translate(10,-30);X.rotate(g*.05);X.beginPath();for(let j=0;j<8;j++){const rr=j%2?1.6:8*a+2;X.lineTo(Math.cos(j*Math.PI/4)*rr,Math.sin(j*Math.PI/4)*rr)}X.closePath();X.fill();X.restore()}}
 X.restore()}
function bjBellDraw(b){const x=b.x-cam,y=LY-b.z;if(x<-90||x>W+90)return;X.save();X.translate(x,y);X.lineWidth=2;X.strokeStyle='#1a0c04';
 X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.ellipse(0,0,46,7,0,0,7);X.fill();
 if(b.st==1){const a=.18+.08*Math.sin(T*.2);X.strokeStyle='rgba(255,120,60,'+a+')';X.lineWidth=3;X.beginPath();X.ellipse(0,0,380,26,0,0,7);X.stroke();X.lineWidth=2;X.strokeStyle='#1a0c04'}
 X.fillStyle='#6a4424';[-34,30].forEach(px=>{X.beginPath();X.rect(px,-118,6,118);X.fill();X.stroke()});X.beginPath();X.rect(-42,-126,84,10);X.fill();X.stroke();X.fillStyle='#4a2c14';X.fillRect(-40,-50,80,5);
 const sw=Math.sin(T*.25)*b.sw*.5;X.save();X.translate(0,-116);X.rotate(sw);X.strokeStyle='#2a1a0a';X.beginPath();X.moveTo(0,0);X.lineTo(0,8);X.stroke();
 const done=b.st==3,G=X.createLinearGradient(-18,0,18,0);G.addColorStop(0,done?'#5a4a30':'#8a5a1a');G.addColorStop(.45,done?'#9a8a60':'#f0c060');G.addColorStop(1,done?'#4a3a20':'#7a4a10');X.fillStyle=G;X.strokeStyle='#1a0c04';
 X.beginPath();X.moveTo(-6,8);X.quadraticCurveTo(-9,22,-13,36);X.lineTo(-19,44);X.lineTo(19,44);X.lineTo(13,36);X.quadraticCurveTo(9,22,6,8);X.closePath();X.fill();X.stroke();X.fillStyle='#3a2a10';X.beginPath();X.arc(Math.sin(sw*3)*6,46,4,0,7);X.fill();X.restore();
 if(b.st==0&&(T%90)<20){const a=Math.sin((T%90)/20*Math.PI);X.save();X.globalCompositeOperation='lighter';X.fillStyle='rgba(255,235,170,'+a+')';X.translate(8,-90);X.beginPath();for(let j=0;j<8;j++){const rr=j%2?1.6:9*a+2;X.lineTo(Math.cos(j*Math.PI/4)*rr,Math.sin(j*Math.PI/4)*rr)}X.closePath();X.fill();X.restore()}
 if(done){X.fillStyle='#a8241a';X.beginPath();X.moveTo(-8,-108);X.lineTo(8,-108);X.lineTo(4,-96);X.lineTo(0,-100);X.lineTo(-4,-96);X.closePath();X.fill()}
 X.restore()}
function bjAura(e){const x=e.x-cam;if(x<-80||x>W+80)return;const E=BJE[e.el],y=LY-e.z,pu=.5+.5*Math.sin(T*.12+e.x*.01);X.save();
 X.fillStyle='rgba('+E.r+','+(.16+.12*pu)+')';X.beginPath();X.ellipse(x,y,34,9,0,0,7);X.fill();X.strokeStyle='rgba('+E.r+','+(.55+.3*pu)+')';X.lineWidth=2;X.beginPath();X.ellipse(x,y,30+pu*4,8+pu,0,0,7);X.stroke();X.restore()}
{const _a=dArena;dArena=function(){_a();if(TR2||state=='menu')return;try{BOJ.chs.forEach(bjChestDraw);if(BOJ.bell)bjBellDraw(BOJ.bell);
 for(const e of ens)if(e.el&&e.st!='dead'&&!isB(e))bjAura(e);
 for(const e of ens)if(e.enr&&isB(e)&&e.st!='dead'){const x=e.x-cam;if(x<-150||x>W+150)continue;const pu=.5+.5*Math.sin(T*.2);X.save();X.globalCompositeOperation='lighter';X.fillStyle='rgba(255,50,20,'+(.12+.1*pu)+')';X.beginPath();X.ellipse(x,LY-e.z,90,18,0,0,7);X.fill();X.restore()}
 if(p&&BOJ.ch>10&&state=='play'){const k=Math.min(1,BOJ.ch/BJCH),x=p.x-cam,y=LY-p.z;X.save();X.globalCompositeOperation='lighter';X.fillStyle='rgba(255,200,90,'+(.12+.2*k+(k>=1?.12*Math.sin(T*.5):0))+')';X.beginPath();X.ellipse(x,y,26+k*20,6+k*4,0,0,7);X.fill();X.restore()}}catch(er){console.error('bjda',er)}}}
function bjBadge(e){const x=e.x-cam;if(x<-60||x>W+60)return;let top=e.z+120;try{top=euiTop(e)}catch(er){}const y=LY-top-22,E=BJE[e.el];X.save();X.translate(x,y);
 X.fillStyle='rgba(16,6,2,.75)';X.strokeStyle=E.c;X.lineWidth=2;X.beginPath();X.moveTo(0,-11);X.lineTo(10,0);X.lineTo(0,11);X.lineTo(-10,0);X.closePath();X.fill();X.stroke();X.fillStyle=E.c;X.strokeStyle=E.c;X.lineWidth=1.6;
 if(e.el=='panc'){X.beginPath();X.moveTo(-5,-5);X.lineTo(5,-5);X.lineTo(5,0);X.quadraticCurveTo(5,5,0,7);X.quadraticCurveTo(-5,5,-5,0);X.closePath();X.fill()}
 else if(e.el=='rych'){X.beginPath();X.moveTo(2,-7);X.lineTo(-4,1);X.lineTo(0,1);X.lineTo(-2,7);X.lineTo(4,-1);X.lineTo(0,-1);X.closePath();X.fill()}
 else if(e.el=='vyb'){X.beginPath();X.arc(-1,2,4.5,0,7);X.fill();X.beginPath();X.moveTo(2,-2);X.quadraticCurveTo(5,-6,3,-8);X.stroke();X.fillStyle=T%10<5?'#fff':'#ffd44a';X.beginPath();X.arc(3,-8,1.6,0,7);X.fill()}
 else{X.beginPath();X.moveTo(-6,5);X.lineTo(-5,-6);X.lineTo(-1,0);X.lineTo(1,0);X.lineTo(5,-6);X.lineTo(6,5);X.closePath();X.fill()}
 if(e.el=='panc'&&e.arm>0){for(let i=0;i<3;i++){X.fillStyle=i<e.arm?'#c8d4e8':'rgba(120,120,130,.4)';X.fillRect(14+i*7,-3,5,6)}}
 const near=Math.abs(e.x-p.x)<300;if((e.seen|0)<170||near){X.textAlign='center';X.font='700 11px Georgia';X.lineWidth=3;X.strokeStyle='#120806';const t=(e.el=='zur'&&e.enr?'ZUŘÍCÍ ':'')+BJE[e.el].n;X.strokeText(t,0,-16);X.fillStyle=E.c;X.fillText(t,0,-16)}
 X.restore()}
{const _f=dFx;dFx=function(){const r=_f.apply(this,arguments);if(TR2||state=='menu')return r;try{
 for(const s of BOJ.sl){const x=s.x-cam,y=LY-s.z,a=s.l/(s.big==2?14:10),R0=s.big?46:32;X.save();X.translate(x,y);X.scale(s.d,1);X.rotate(-.5);X.globalAlpha=Math.max(0,a);X.strokeStyle=s.big==2?'#ff6a4a':'#fff';X.lineWidth=(s.big?5:3)*a+1;X.lineCap='round';X.beginPath();X.arc(-6,0,R0*(1.15-a*.15),-1.1,1.1);X.stroke();X.globalAlpha=Math.max(0,a*.5);X.strokeStyle='#ffe6a0';X.lineWidth=1.5;X.beginPath();X.arc(-10,0,R0*.8,-.9,.9);X.stroke();X.restore()}
 if(BOJ.bl>0){const k=1-BOJ.bl/18,x=BOJ.blx-cam,y=LY-BOJ.blz-40;X.save();X.translate(x,y);X.scale(BOJ.blf,1);X.globalAlpha=1-k;X.strokeStyle='#fff4d0';X.lineWidth=8*(1-k)+1;X.beginPath();X.arc(0,0,40+k*150,-.9,.9);X.stroke();X.strokeStyle='#ffb14a';X.lineWidth=4*(1-k)+1;X.beginPath();X.arc(0,0,26+k*120,-.8,.8);X.stroke();X.restore()}
 if(BOJ.pf>0&&p){const k=BOJ.pf/20,x=p.x-cam+p.face*18,y=LY-p.z-58;X.save();X.globalAlpha=k;X.strokeStyle='#bff4ff';X.lineWidth=4;X.beginPath();X.arc(x,y,24+(1-k)*30,0,7);X.stroke();X.restore()}
 if(BOJ.pa>0&&p&&!(BOJ.pf>0)){const k=BOJ.pa/14,x=p.x-cam+p.face*14,y=LY-p.z-56;X.save();X.globalAlpha=.7*k;X.strokeStyle='#9fe8ff';X.lineWidth=3;X.beginPath();X.arc(x,y,22,p.face>0?-1.1:Math.PI-1.1,p.face>0?1.1:Math.PI+1.1);X.stroke();X.restore()}
 for(const e of ens)if(e.el&&e.st!='dead'&&!isB(e))bjBadge(e);
 for(const F of BOJ.fz){const e=F.e;if(!e)continue;const x=e.x-cam,y=LY-e.z-30,on=(F.t>>2)%2==0||F.t<14;X.save();X.globalCompositeOperation='lighter';X.fillStyle='rgba(255,'+(on?80:160)+',40,'+(on?.55:.25)+')';X.beginPath();X.arc(x,y,18+(48-F.t)*.5,0,7);X.fill();X.restore();X.save();X.textAlign='center';X.font='700 16px Georgia';X.lineWidth=3;X.strokeStyle='#120806';X.strokeText('!',x,y-34);X.fillStyle=on?'#ff5a3a':'#ffd44a';X.fillText('!',x,y-34);X.restore()}
 if(bjOn()){let xe=null,xd=261;for(const e of ens){if(!bjCanX(e)||Math.abs(e.z-p.z)>90)continue;const d=Math.abs(e.x-p.x);if(d<xd){xd=d;xe=e}}for(const e of xe?[xe]:[]){let top=e.z+120;try{top=euiTop(e)}catch(er){}const x=e.x-cam,y=LY-top-(e.el?52:26)+Math.sin(T*.25)*2,t=bjK('attack')+' POPRAVA';X.save();X.textAlign='center';X.font='700 13px Georgia';X.lineWidth=4;X.strokeStyle='#120806';X.strokeText(t,x,y);X.fillStyle=T%20<10?'#ff5a3a':'#ffd0c0';X.fillText(t,x,y);X.restore()}
  const c=bjNearChest(),b=bjNearBell(),t=c?bjK('interact')+' Otevřít truhlu':b?bjK('interact')+' Rozezvonit zvon výzvy':null;if(t){const o=c||b,x=o.x-cam,y=LY-o.z-(c?52:140);X.save();X.textAlign='center';X.font='700 14px Georgia';X.lineWidth=4;X.strokeStyle='#120806';X.strokeText(t,x,y);X.fillStyle='#ffe28a';X.fillText(t,x,y);X.restore()}}
 }catch(er){console.error('bjfx',er)}return r}}
{const _l=lighting;lighting=function(){_l();if(TR2||state=='menu'||!lv||!lv.dark)return;try{X.save();X.translate(0,camZ);X.globalCompositeOperation='lighter';
 for(const c of BOJ.chs){if(c.op)continue;const x=c.x-cam,y=LY-c.z-14;if(x<-80||x>W+80)continue;const G=X.createRadialGradient(x,y,2,x,y,46);G.addColorStop(0,'rgba(255,210,110,'+(.28+.12*Math.sin(T*.08+c.i))+')');G.addColorStop(1,'rgba(255,200,90,0)');X.fillStyle=G;X.fillRect(x-46,y-46,92,92)}
 for(const e of ens){if(!e.el||e.st=='dead')continue;const x=e.x-cam,y=LY-e.z-4;if(x<-60||x>W+60)continue;const G=X.createRadialGradient(x,y,2,x,y,40);G.addColorStop(0,'rgba('+BJE[e.el].r+',.35)');G.addColorStop(1,'rgba('+BJE[e.el].r+',0)');X.fillStyle=G;X.fillRect(x-40,y-40,80,80)}
 X.restore()}catch(er){console.error('bjl',er)}}}

/* ---------- HUD ---------- */
let BJVG=null;
function bjVig(){if(!BJVG){BJVG=document.createElement('canvas');BJVG.width=W/2;BJVG.height=H/2;const g=BJVG.getContext('2d'),G=g.createRadialGradient(W/4,H/4,H*.14,W/4,H/4,W*.3);G.addColorStop(0,'rgba(160,0,0,0)');G.addColorStop(1,'rgba(150,0,0,.75)');g.fillStyle=G;g.fillRect(0,0,W/2,H/2)}return BJVG}
function bjMeter(){const show=state=='play'&&(BOJ.v>1||CMB.n>=2);BOJ.ma+=((show?1:0)-BOJ.ma)*.15;if(BOJ.ma<.02)return;const a=BOJ.ma,r=BOJ.rk,x0=W-236-(TOUCH?52:0),y0=168,col=BJC[r];X.save();X.globalAlpha=a;
 X.fillStyle='rgba(16,6,2,.5)';X.beginPath();X.roundRect(x0,y0,214,72,10);X.fill();X.strokeStyle='rgba(232,184,96,.25)';X.lineWidth=1;X.stroke();
 const up=BOJ.rkUp>0?BOJ.rkUp/56:0,sc=1+up*up*1.1;X.save();X.translate(x0+38,y0+40);X.scale(sc,sc);X.rotate(-.08);X.textAlign='center';X.font=(r>=6?28:r>=5?34:42)+'px '+FONT;X.lineWidth=6;X.lineJoin='round';X.strokeStyle='#120806';X.strokeText(BJR[r],0,12);X.fillStyle=col;X.fillText(BJR[r],0,12);
 if(up>0){X.globalAlpha=a*up;X.strokeStyle=col;X.lineWidth=3;X.beginPath();X.arc(0,0,30+(1-up)*30,0,7);X.stroke()}X.restore();
 X.textAlign='left';X.font='700 12px Georgia';X.fillStyle=col;X.fillText(BJN[r],x0+76,y0+22);X.font='700 9px Georgia';X.fillStyle='rgba(233,211,164,.6)';X.textAlign='right';X.fillText('STYL',x0+204,y0+22);X.textAlign='left';
 const f=r>=6?1:Math.max(0,(BOJ.v-r*100)/100);X.fillStyle='rgba(0,0,0,.55)';X.fillRect(x0+76,y0+30,128,6);X.fillStyle=col;X.fillRect(x0+76,y0+30,128*f,6);
 if(BOJ.idle>110&&BOJ.v>0){X.fillStyle='rgba(255,255,255,'+(.25+.2*Math.sin(T*.3))+')';X.fillRect(x0+76+128*f-3,y0+30,3,6)}
 if(BOJ.rep>0){X.font='700 11px Georgia';X.fillStyle='#ff6a5a';X.fillText('OPAKUJEŠ SE  ×0,3',x0+76,y0+54)}else if(BOJ.lt>0&&BOJ.last){X.globalAlpha=a*Math.min(1,BOJ.lt/15);X.font='700 11px Georgia';X.fillStyle=BOJ.nw>0?'#9fffb0':'#f4e2bc';X.fillText('+ '+BJL[BOJ.last].toUpperCase()+(BOJ.nw>0?'  ×1,4':''),x0+76,y0+54);X.globalAlpha=a}
 if(r>=3){X.font='italic 10px Georgia';X.fillStyle='rgba(255,212,74,.8)';X.fillText('body ×'+(1+r*.2).toFixed(1).replace('.',',')+'  •  +'+(r>=5?2:1)+' $ za vyřízení',x0+76,y0+67)}
 if(CMB.n>=2){X.globalAlpha=a*Math.min(1,CMB.t/30);X.textAlign='center';X.font='700 13px Georgia';X.lineWidth=3;X.strokeStyle='#120806';X.strokeText(CMB.n+'× kombo',x0+38,y0+66);X.fillStyle='#fff';X.fillText(CMB.n+'× kombo',x0+38,y0+66);X.globalAlpha=a}
 if(BOJ.drop>0){X.globalAlpha=BOJ.drop/40*.55;X.fillStyle='#ff3a2a';X.beginPath();X.roundRect(x0,y0,214,72,10);X.fill()}
 X.restore()}
function bjBellHud(){const b=BOJ.bell;if(!b||b.st!=1)return;const left=Math.max(0,b.T-b.t),s=Math.ceil(left/60),alive=b.ens.filter(e=>e.st!='dead'&&e.z>LOWZ).length,w=214,x=W-236-(TOUCH?52:0),y=246;X.save();
 X.fillStyle='rgba(16,6,2,.7)';X.beginPath();X.roundRect(x,y,w,40,10);X.fill();X.strokeStyle=s<=10&&T%30<15?'#ff5a3a':'rgba(232,184,96,.5)';X.lineWidth=1.5;X.stroke();
 X.textAlign='left';X.font='15px '+FONT;X.fillStyle='#ffd27a';X.fillText('ZVON VÝZVY',x+12,y+18);X.font='700 12px Georgia';X.fillStyle='#e9d3a4';X.fillText('vlna '+b.w+'/2  •  zbývá '+alive,x+12,y+33);
 X.textAlign='right';X.font='22px '+FONT;X.fillStyle=s<=10?'#ff6a4a':'#fff3dc';X.fillText('0:'+String(s).padStart(2,'0'),x+w-10,y+27);X.fillStyle='rgba(0,0,0,.5)';X.fillRect(x+10,y+36,w-20,3);X.fillStyle=s<=10?'#ff6a4a':'#ffb14a';X.fillRect(x+10,y+36,(w-20)*left/b.T,3);X.restore()}
function bjTipDraw(){const t=BOJ.tip;if(!t||state!='play')return;const a=Math.max(0,Math.min(1,t.t/12,(360-t.t)/18));if(a<=0)return;X.save();X.globalAlpha=a;X.font='13.5px Georgia';const L=wrapL(t.tx,620).slice(0,2),w=Math.min(720,Math.max(...L.map(l=>X.measureText(l).width))+92),h=L.length>1?50:34;
 const x=W/2-w/2,y=(bossE&&bossE.st!='dead'?58:8)-(1-a)*10;
 X.fillStyle='rgba(20,8,4,.82)';X.beginPath();X.roundRect(x,y,w,h,10);X.fill();X.strokeStyle='#e8b860';X.lineWidth=1.5;X.stroke();X.fillStyle='#e8b860';X.beginPath();X.roundRect(x+8,y+h/2-10,46,20,10);X.fill();
 X.textAlign='center';X.font='700 11px Georgia';X.fillStyle='#2a1206';X.fillText('TIP',x+31,y+h/2+4);X.textAlign='left';X.font='13.5px Georgia';X.fillStyle='#f4e2bc';L.forEach((l,i)=>X.fillText(l,x+66,y+(L.length>1?21+i*17:22)));X.restore()}
function bjBanDraw(){const b=BOJ.ban;if(!b)return;const t=b.t,a=Math.max(0,Math.min(1,t/8,(150-t)/20)),k=t<12?1+(1-t/12)*1.2:1;X.save();X.globalAlpha=a;X.translate(W/2,H*.36);X.scale(k,k);X.textAlign='center';
 X.font='52px '+FONT;X.lineWidth=8;X.lineJoin='round';X.strokeStyle='#1a0804';X.strokeText(b.tx,0,0);X.fillStyle=b.tx.startsWith('ZUŘ')?'#ff4a2a':b.tx.startsWith('ČAS')?'#c8c8d0':'#ffd44a';X.fillText(b.tx,0,0);
 X.font='italic 17px Georgia';X.lineWidth=4;X.strokeText(b.sub,0,28);X.fillStyle='#f4e2bc';X.fillText(b.sub,0,28);X.restore()}
function bjHud(){
 if(state=='play'&&p&&!p.dead&&p.hp>0&&p.hp<=Math.max(1,Math.floor(p.mx*.25))){const pu=.5+.5*Math.sin(T*.116);X.save();X.globalAlpha=.22+.2*pu;X.drawImage(bjVig(),0,0,W,H);X.restore()}
 if(BOJ.flash>0){X.save();X.fillStyle='rgba('+BOJ.fc+','+(BOJ.flash/12*.22)+')';X.fillRect(0,0,W,H);X.restore()}
 bjMeter();if(state=='play'){bjBellHud();bjBanDraw();bjTipDraw()}}
{const _hx=hudX;hudX=function(){const pl=state=='play'&&!TR2,n=CMB.n;if(pl)CMB.n=0;try{_hx()}finally{if(pl)CMB.n=n}if(!TR2)try{bjHud()}catch(er){console.error('bjh',er)}}}

/* ---------- výkon: automatická kvalita ---------- */
{const _d=draw;draw=function(){const a=performance.now();const r=_d.apply(this,arguments);try{const dt=performance.now()-a,q=BOJ.perf;
 if(state=='play'&&!TR2&&SV.fx&&!SV.fxA&&!(typeof navigator!='undefined'&&navigator.webdriver)){q.n++;q.s+=dt;if(q.n>=180){if(q.s/q.n>24){SV.fx=0;SV.fxA=1;try{saveSV()}catch(e){}bjTip('perf',1)}q.n=0;q.s=0}}}catch(e){}return r}}

/* ---------- dotykové ovládání: výmet a kryt ---------- */
{const sh=(typeof HB!='undefined'&&HB.tsh)?46:0;TBT.push({a:'heavy',x:604,y:482-sh,r:27},{a:'crouch',x:620,y:404-sh,r:24})}
{const _t=tIcon;tIcon=function(a,x,y){if(a=='heavy'){X.save();X.strokeStyle='#fff4dc';X.fillStyle='#fff4dc';X.lineWidth=4;X.lineCap='round';X.beginPath();X.moveTo(x-9,y+9);X.lineTo(x+7,y-7);X.stroke();X.beginPath();X.moveTo(x+11,y-11);X.lineTo(x+1,y-9);X.lineTo(x+9,y-1);X.closePath();X.fill();if(BOJ.ch>10){X.globalAlpha=Math.min(1,BOJ.ch/BJCH);X.strokeStyle='#ffd44a';X.lineWidth=3;X.beginPath();X.arc(x,y,20,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(1,BOJ.ch/BJCH));X.stroke()}X.restore();return}
 if(a=='crouch'){X.save();X.fillStyle='#fff4dc';X.beginPath();X.moveTo(x-9,y-9);X.lineTo(x+9,y-9);X.lineTo(x+9,y);X.quadraticCurveTo(x+9,y+8,x,y+12);X.quadraticCurveTo(x-9,y+8,x-9,y);X.closePath();X.fill();X.fillStyle='rgba(60,30,10,.7)';X.fillRect(x-1.5,y-6,3,14);X.restore();return}
 return _t(a,x,y)}}
try{ACTS.forEach(a=>{if(a[0]=='heavy')a[1]='Výmet (podrž = nabitý úder)';if(a[0]=='crouch')a[1]='Krýt se / protiútok'})}catch(e){}

/* ---------- Deník: nové úspěchy, karta TAHY ---------- */
ACH2.push(['elit','Lovec elit',n=>'Zneškodni '+n+' elitních enemigos',()=>bjSV().eli|0,[5,25,80]],
 ['exec','Kat',n=>'Proveď '+n+' '+qPl(n,'popravu','popravy','poprav'),()=>bjSV().exe|0,[5,30,100]],
 ['parry','Neprůstřelný',n=>'Odraz '+n+' '+qPl(n,'útok','útoky','útoků')+' protiútokem',()=>bjSV().par|0,[5,30,100]],
 ['styl','Stylista',n=>'Dosáhni stylu '+BJR[n]+' ('+BJN[n].toLowerCase()+')',()=>bjSV().smx|0,[3,4,6]],
 ['chest','Hledač pokladů',n=>'Otevři '+n+' '+qPl(n,'truhlu','truhly','truhel'),()=>bjChestN(),[3,7,12]],
 ['bell','Zvoník',n=>'Utiš '+n+' '+qPl(n,'zvon výzvy','zvony výzvy','zvonů výzvy'),()=>bjBellN(),[1,3,6]]);
PGT.push('TAHY');
pgTabs=function(){const x0=140,w=124,g=4;PGT.forEach((t,i)=>{const x=x0+i*(w+g),sel=QM.tab==i,hv=pgHit(x,56,w,34,'tab',i);X.save();if(sel)X.translate(0,-3);m2Plank(x,56,w,34,t,hv||sel,sel?'g':null);X.restore()})};
dQM=function(){PGD.hits=[];qmBg();const hv=pgHit(14,10,118,36,'back',0);m2Plank(14,10,118,36,'◀ ZPĚT',hv);mRibbon(W/2,30,250,'DENÍK',1);
 X.save();X.fillStyle='rgba(20,8,4,.6)';X.beginPath();X.roundRect(W-214,12,200,32,16);X.fill();X.strokeStyle='rgba(232,184,96,.5)';X.stroke();pgStarShape(W-194,28,9,1);X.textAlign='left';X.font='700 14px Georgia';X.fillStyle='#ffe6a0';X.fillText(pgStars()+'/24',W-180,33);hbCoin(W-120,28,8,T*.05);X.fillText(String(SV.st),W-106,33);X.restore();
 pgTabs();const a=Math.min(1,QM.t/12);X.save();X.globalAlpha=a;X.translate(0,(1-a)*14);
 try{[pgTabAreas,pgTabRoad,pgTabAch,pgTabTal,pgTabLook,bjTabMoves][QM.tab]()}catch(e){console.error('dnk',e)}
 X.restore();X.textAlign='center';X.font='12px Georgia';X.fillStyle='rgba(255,236,200,.6)';X.fillText('Tab / Q E nebo 1–6 – karty  •  šipky a Enter – výběr  •  Esc – zpět',W/2,H-8);X.textAlign='left'};
{const _u=updQM;updQM=function(){if(P.Digit6){QM.tab=5;sfx('cloth')}return _u.apply(this,arguments)}}
pgTabAch=function(){let b=0,s=0,g=0;ACH2.forEach(A=>{const t=pgAchTier(A[0]);if(t>=1)b++;if(t>=2)s++;if(t>=3)g++});X.save();X.textAlign='left';X.font='13px Georgia';X.fillStyle='#e9d3a4';X.fillText('Medaile: '+pgAchPts()+' / '+ACH2.length*3,28,116);[[b,0],[s,1],[g,2]].forEach(([n,k],j)=>{pgMedal(190+j*70,111,8,k);X.fillStyle='#e9d3a4';X.fillText(String(n),202+j*70,116)});
 X.textAlign='right';X.fillText('Za medaile: bronz +25 $, stříbro +60 $, zlato +150 $ a titul',W-28,116);
 ACH2.forEach((A,j)=>{const c=j%4,r=j/4|0,x=18+c*233,y=126+r*63,w=226,h=59,t=pgAchTier(A[0]),v=A[3](),nx=t<3?A[4][t]:A[4][2],pv=t>0?A[4][t-1]:0,hv=pgHit(x,y,w,h,'ach',j);
  X.fillStyle=hv?'rgba(255,214,140,.16)':'rgba(20,8,4,.5)';X.beginPath();X.roundRect(x,y,w,h,8);X.fill();X.strokeStyle=t?ACHC[t-1]:'rgba(232,184,96,.3)';X.lineWidth=t?1.6:1;X.stroke();
  pgMedal(x+20,y+27,12,Math.max(0,t-1),!t);X.textAlign='left';X.font='700 12.5px Georgia';X.fillStyle='#f4e2bc';X.fillText(A[1],x+38,y+16);
  X.font='italic 10.5px Georgia';X.fillStyle='rgba(233,211,164,.78)';wrapL(t<3?A[2](nx):'Hotovo – všechny tři medaile',w-48).slice(0,2).forEach((l,k)=>X.fillText(l,x+38,y+29+k*11));
  const f=t>=3?1:Math.max(0,Math.min(1,(v-pv)/(nx-pv)));X.fillStyle='rgba(0,0,0,.45)';X.fillRect(x+38,y+45,w-48,4);X.fillStyle=t>=3?'#ffd44a':'#e8a020';X.fillRect(x+38,y+45,(w-48)*f,4);
  X.textAlign='right';X.font='700 10.5px Georgia';X.fillStyle='#ffe6a0';X.fillText(t>=3?'ZLATO':(A[0]=='styl'?BJR[Math.min(6,v)]+' / '+BJR[nx]:Math.min(v,nx)+'/'+nx),x+w-8,y+16);
  if(t<3){X.font='700 9.5px Georgia';X.fillStyle=ACHC[t];X.textAlign='left';X.fillText(ACHT[t],x+38,y+57);X.textAlign='right';X.fillStyle='#ffd44a';X.fillText('+'+ACHR[t],x+w-20,y+57);hbCoin(x+w-11,y+54,4.5,0)}else if(A[5]){X.font='italic 9.5px Georgia';X.fillStyle='#9fe09a';X.fillText('stopa „'+PGTR[A[5]].n+'“',x+w-8,y+57)}});
 X.restore()};
function bjChip(t,x,y){X.font='700 11.5px Georgia';const w=Math.max(22,X.measureText(t).width+12);X.fillStyle='#f4e2bc';X.beginPath();X.roundRect(x,y-13,w,18,5);X.fill();X.strokeStyle='#1a0a04';X.lineWidth=1.2;X.stroke();X.fillStyle='#2a1206';X.textAlign='center';X.fillText(t,x+w/2,y);X.textAlign='left';return w}
function bjTabMoves(){const C=SV.cls,k=a=>TOUCH?({attack:'ÚTOK',heavy:'VÝMET',crouch:'KRYT',interact:'E',jump:'SKOK',down:'↓',ranged:'STŘELBA',special:'SCHOPNOST',dash:'ÚSKOK'})[a]:keyName((SV.keys[a]||[])[0]);
 const M=[['KOMBO',[k('attack'),k('attack'),k('attack')],'třetí rána je těžká a odhodí'],['VÝMET',[k('heavy')],'vyhodí nepřítele do vzduchu'],['NABITÝ ÚDER',['podrž',k('heavy')],'vlna prorazí kryt, štít i pancíř'],
  ['PROTIÚTOK',[k('crouch'),'před zásahem'],'odrazí útok, útočníka omráčí'],['POPRAVA',[k('attack'),'u omráčeného'],'vyřídí ho na místě, šance na ♥'],['ZE VZDUCHU',['skok',k('attack'),'/',k('down'),'+',k('attack')],'úder ve skoku a dupák'],
  ['HOD',[k('interact'),'+',k('attack')],'zvedni omráčeného a hoď ho'],['STŘELBA',[k('ranged')],['revolver','vrhací nůž','brokovnice','vrhací karta'][C]],['SCHOPNOST',[k('special')],['laso – omráčí','kouřová bomba','vrhací síť – omráčí','převlek'][C]]];
 X.save();X.fillStyle='rgba(20,8,4,.55)';X.beginPath();X.roundRect(18,100,468,412,12);X.fill();X.strokeStyle='rgba(232,184,96,.4)';X.lineWidth=1;X.stroke();X.textAlign='left';X.font='17px '+FONT;X.fillStyle='#ffd27a';X.fillText('TAHY',34,126);
 M.forEach((m,i)=>{const y=152+i*40;X.fillStyle=i%2?'rgba(255,214,140,.05)':'rgba(255,214,140,.1)';X.fillRect(26,y-18,452,36);X.font='14px '+FONT;X.fillStyle='#f4e2bc';X.fillText(m[0],34,y-1);let cx=158;m[1].forEach(t=>{if(['podrž','před zásahem','u omráčeného','skok','/','+'].includes(t)){X.font='italic 11px Georgia';X.fillStyle='rgba(233,211,164,.75)';X.fillText(t,cx,y-2);cx+=X.measureText(t).width+5}else cx+=bjChip(t,cx,y-2)+4});
  X.font='italic 11px Georgia';X.fillStyle='rgba(233,211,164,.7)';X.fillText(m[2],158,y+13)});
 const x=500;X.fillStyle='rgba(20,8,4,.55)';X.beginPath();X.roundRect(x,100,442,412,12);X.fill();X.strokeStyle='rgba(232,184,96,.4)';X.stroke();X.font='17px '+FONT;X.fillStyle='#ffd27a';X.fillText('STYL',x+16,126);
 BJR.forEach((r,i)=>{const cx=x+30+i*60;X.textAlign='center';X.font=(i>=5?20:24)+'px '+FONT;X.fillStyle=BJC[i];X.fillText(r,cx,158);X.font='700 8.5px Georgia';X.fillStyle='rgba(233,211,164,.7)';X.fillText(['DRSNÝ','CVALEM','BRAVO','CARAMBA','ŠERIF','SUPER','SRDCE'][i],cx,172)});X.textAlign='left';
 X.font='12px Georgia';X.fillStyle='#e9d3a4';['Styl roste za zásahy – nejvíc za pestrost: nový tah ×1,4.','Stejný tah třikrát po sobě dává jen ×0,3.','Zásah od nepřítele styl srazí, nečinnost ho pomalu bere.','Od A: víc bodů a zlaťáky za každé vyřízení.'].forEach((l,i)=>X.fillText('• '+l,x+16,194+i*17));
 X.font='17px '+FONT;X.fillStyle='#ffd27a';X.fillText('ELITNÍ ENEMIGOS',x+16,282);Object.keys(BJE).forEach((kk,i)=>{const E=BJE[kk],y=304+i*30;X.fillStyle=E.c;X.beginPath();X.moveTo(x+26,y-12);X.lineTo(x+34,y-4);X.lineTo(x+26,y+4);X.lineTo(x+18,y-4);X.closePath();X.fill();X.font='700 12px Georgia';X.fillText(E.n,x+44,y-3);X.font='italic 11px Georgia';X.fillStyle='rgba(233,211,164,.78)';X.fillText(E.d,x+44,y+10)});
 X.font='17px '+FONT;X.fillStyle='#ffd27a';X.fillText('PRŮZKUM',x+16,438);X.font='12px Georgia';X.fillStyle='#e9d3a4';X.fillText('Truhly s pokladem (+30 $): otevřeno '+bjChestN()+'.  Hledej je vysoko na římsách.',x+16,458);X.fillText('Zvony výzvy (+50 $): utišeno '+bjBellN()+'.  Dvě vlny do 45 sekund.',x+16,476);X.fillText('Elitní enemigos poraženo: '+(bjSV().eli|0)+'  •  popravy: '+(bjSV().exe|0)+'  •  protiútoky: '+(bjSV().par|0),x+16,494);
 X.restore()}
{const _a=pgTabAreas;pgTabAreas=function(){_a();try{const i=QM.reg;if(i>SV.un)return;const s=bjSV(),x=300,y=492;X.save();X.textAlign='left';X.font='700 11px Georgia';X.fillStyle='#5a3a1a';X.fillText('TRUHLY',x,y);for(let k=0;k<2;k++){const on=(s.ch[i]>>k&1);X.fillStyle=on?'#c8901e':'rgba(122,82,40,.3)';X.fillRect(x+54+k*16,y-9,12,9);X.strokeStyle='#3a2210';X.lineWidth=1;X.strokeRect(x+54+k*16,y-9,12,9)}
 X.fillStyle='#5a3a1a';X.fillText('ZVON VÝZVY',x+100,y);X.fillStyle=s.bl[i]?'#2a7a2a':'#9a6a3a';X.fillText(s.bl[i]?'utišen ✔':'zatím ne',x+180,y);X.restore()}catch(e){}}}
