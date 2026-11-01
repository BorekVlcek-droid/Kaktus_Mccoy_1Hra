/* =====================================================================
   v85: REŽISÉR BOSSÍCH SCÉN (nástupy i porážky všech bossů)
   – kamera: úvodní záběr, střihy na mluvčího, dvojzáběr, úder = přiblížení
     a zpomalení, závěrečné oddálení
   – Kaktus už nestojí: přijde, uskočí, kryje se, tasí, gestikuluje
   – během scén se neukazují vyskakovací oznámení úkolů
   ===================================================================== */
const C3={who:null,whoT:0,punch:0,ls:0,cx:null,cz:0,zm:1,k:null,brace:0};
const C3SKIP={cap:1};/* kapitán má vlastní režii (v82) */
/* kdo mluví → střih na něj */
{const _b=bSay;bSay=function(e,txt,l,pr){const r=_b.apply(this,arguments);try{if(state=='cut'&&cut&&(cut.k=='bpre'||cut.k=='bpost')&&txt&&String(txt).length>3){C3.who=e===p?'p':'q';C3.whoT=Math.min(120,(l||100))}}catch(err){}return r}}
{const _v=vnSay;vnSay=function(q,txt,l){_v.apply(this,arguments);try{if(state=='cut'&&cut&&(cut.k=='bpre'||cut.k=='bpost')){C3.who='q';C3.whoT=Math.min(120,l||110)}}catch(err){}}}
{const _pp=pop;pop=function(x,y,z,t,c){try{if(state=='cut'&&cut&&(cut.k=='bpre'||cut.k=='bpost')&&typeof t=='string'&&t.length>8){const q=cut.q;C3.who=p&&Math.abs(x-p.x)<90?'p':'q';C3.whoT=90}}catch(err){}return _pp.apply(this,arguments)}}
/* oznámení úkolů až po scéně */
{const _t=qBanTick;qBanTick=function(){if(state=='cut')return;return _t()}}
{const _b=qBanners;qBanners=function(){if(state=='cut')return;return _b()}}
function c3Shot(c,q,t,end,post){const pz=p.z+90,qz=(q.z||0)+(q.B=='bar'?190:130);
 if(C3.whoT>0)C3.whoT--;
 /* úder: přiblížení + krátké zpomalení */if(shake>=8&&C3.ls<8){C3.punch=.2;B1C.slow=.5;C3.slT=12}C3.ls=shake;if(C3.slT>0&&--C3.slT==0)B1C.slow=1;C3.punch*=.92;
 let tx,tz,tzm,k=.07;
 const d=Math.abs((q.x||p.x)-p.x),two=[(p.x+q.x)/2,(pz+qz)/2,Math.max(1,Math.min(1.36,820/(d+300)))];
 if(!post&&t<46){tx=p.x+(q.x-p.x)*.18;tz=pz;tzm=1.38}
 else if(C3.whoT>0){if(C3.who=='p'){tx=p.x+(q.x>p.x?60:-60);tz=pz;tzm=1.5}else{tx=q.x+(p.x>q.x?40:-40);tz=qz;tzm=q.B=='bar'||q.B=='eng'?1.25:1.42}k=.12}
 else{[tx,tz,tzm]=two}
 if(t>end-40){[tx,tz,tzm]=two;tzm=Math.min(tzm,1.12);k=.06}
 if(C3.cx==null||C3.k!==c){C3.cx=tx;C3.cz=tz;C3.zm=tzm;C3.k=c}
 C3.cx+=(tx-C3.cx)*k;C3.cz+=(tz-C3.cz)*k;C3.zm+=(tzm-C3.zm)*k;
 c2Look(C3.cx,C3.cz,C3.zm+C3.punch)}
/* Kaktus ve scéně: příchod, uskočení před řevem, krytí, tasení */
function c3Hero(c,q,t,end,post){if(!p||p.dead)return;
 if(!post&&t>2&&t<44&&!c.c3w){const dx=q.x-p.x,dir=Math.sign(dx)||1;if(Math.abs(dx)>260){p.x+=dir*1.6;p.vx=dir*1.6}}else if(!post&&t>=44)c.c3w=1;
 if(shake>=10&&!(c.c3b>t)){c.c3b=t+26;if(p.on!==false&&!post){try{kHop(c,-(Math.sign(q.x-p.x)||1)*1.6,5.5)}catch(err){}}}
 if(c.c3b>t)p.cr=1;
 if(!post&&t==end-60){if(SV.cls==0||SV.cls==2)p.aim=40;else c2Fid(C2COOL[SV.cls])}
 if(post&&t==end-80)c2Fid(C2HERO[SV.cls])}
{const _b=CUTX.bpre;CUTX.bpre=c=>{_b(c);try{if(cut===c&&state=='cut'&&c.q&&!C3SKIP[c.k2]){c3Hero(c,c.q,c.t,c.end,0);c3Shot(c,c.q,c.t,c.end,0)}}catch(err){console.error('c3',err)}if(state!='cut'||cut!==c){B1C.z=B1C.zt=1;B1C.slow=1;C3.cx=null}}}
{const _b=CUTX.bpost;CUTX.bpost=c=>{_b(c);try{if(cut===c&&state=='cut'&&c.q&&!C3SKIP[c.k2]){c3Hero(c,c.q,c.t,c.end,1);c3Shot(c,c.q,c.t,c.end,1)}}catch(err){console.error('c3',err)}if(state!='cut'||cut!==c){B1C.z=B1C.zt=1;B1C.slow=1;C3.cx=null}}}
/* ---------- akce Kaktuse ve scénách ---------- */
function c3Say(t){try{pop(p.x,LY,p.z+120,t,'#e8f0ff')}catch(err){}}
function c3Dodge(c,q,big){const d=-(Math.sign(q.x-p.x)||1);try{kHop(c,d*(big?3.2:2.4),big?8.5:7)}catch(err){}c.c3flip=26;sfx('whoosh',p.x);for(let i=0;i<8;i++)c2P({x:p.x+R(-10,10),z:p.z+4,vx:R(-1.5,1.5),vz:R(.3,1.4),L:R(30,50),k:'smoke',c:'200,185,160',s:R(8,14)})}
function c3Aim(){if(SV.cls==0||SV.cls==2)p.aim=46;else c2Fid(C2COOL[SV.cls])}
/* salto při úskoku */{const _u=upd;upd=function(){const r=_u();try{const c=cut;if(c&&c.c3flip>0&&state=='cut'){c.c3flip--;p.ds=c.c3flip>4?10*(c.c3flip-4)/22:0;if(!c.c3flip)p.ds=0}}catch(err){}return r}}
/* doplňky děje pro jednotlivé bossy: {nástup: [čas, akce], porážka: …} */
const C3X={
 dyn:{pre:{dur:400,f:(c,t,q)=>{if(t==40)c3Say('Slyšíš to? Někdo tu vrtá…');if(t==72){p.face=Math.sign(q.x-p.x)||1;c2Fid(C2COOL[SV.cls])}
   if(c.dy&&t==c.dy+30)c3Dodge(c,q,1);if(t==318)c3Say('Díky, ale nekouřím. Vrať se do díry, Dinamitero.');if(t==352)c3Aim();if(t>=330&&t%20==0){sfx('fuse',q.x);c2P({x:q.x+R(-30,30),z:q.z+200,vx:R(-1,1),vz:R(1,2),L:30,k:'spark',c:'#ffd27a',s:1.5})}}},
      post:{dur:300,f:(c,t,q)=>{if(t==232)c3Say('Konec výbuchů. Tenhle důl má zase klid.')}}},
 scp:{pre:{dur:390,f:(c,t,q)=>{if(t==30)c3Say('Ten vítr… a supi. Něco tu číhá pod pískem.');if(t==140)c3Dodge(c,q,0);if(t==238)c3Dodge(c,q,1);
   if(t==306)c3Say('Tak ty jsi ten Baronův hlídací štír. Pojď si pro mě!');if(t==344)c3Aim()}},
      post:{dur:340,f:(c,t,q)=>{if(t==300)c3Say('A je po štíří. Supi mají hostinu.')}}},
 jef:{pre:{dur:380,f:(c,t,q)=>{if(t==20)c3Say('Sirény… Ví o mně celá pevnost.');if(t==92)c3Dodge(c,q,1);
   if(t>=112&&t<186&&t%9==0){const bx=p.x+R(-60,60);c2P({x:bx,z:Math.max(0,floorAt(bx,p.z+40,8))+2,vx:0,vz:R(1,3),L:16,k:'spark',c:'#ffe28a',s:2});if(t%27==0)sfx('block',bx)}
   if(t>=112&&t<186)p.cr=1;if(t==150)c3Say('Kulky? To mě jen šimrá!');if(t==226)c3Dodge(c,q,0);if(t==300)c3Say('El Jefe… Dneska tvoje pevnost padne.');if(t==336)c3Aim()}},
      post:{dur:360,f:(c,t,q)=>{if(t==324)c2Fid(C2HERO[SV.cls])}}},
 n:{pre:{dur:290,f:(c,t,q)=>{if(t==14)c3Say('Laser! Odstřelovač!');if(t==34)c3Dodge(c,q,0);if(t==150)c3Dodge(c,q,1);if(t==226)c3Say('Na tohle jsem čekal, Sombro. Vylez ze stínu.');if(t==260)c3Aim()}},
    post:{dur:300,f:(c,t,q)=>{if(t==250)c3Say('Poslední výstřel byl můj, Sombro.')}}},
 adm:{pre:{dur:380,f:(c,t,q)=>{if(t==14)c3Say('Děla! Oni po mně střílí z lodi!');if(t==40)c3Dodge(c,q,0);if(t==176)c3Dodge(c,q,1);
   if(t==290)c3Say('Admirále, ta šťáva nepatří Baronovi. Vrať ji.');if(t==330){bSay(q,'¡Jamás! Ke žralokům s tebou!',60,1)}if(t==352)c3Aim()}},
      post:{dur:330,f:(c,t,q)=>{if(t==290)c3Say('Loď je moje, admirále. A šťáva taky.')}}},
 eng:{pre:{dur:360,f:(c,t,q)=>{if(t==96)c3Dodge(c,q,1);if(t==236)c3Dodge(c,q,0);if(t==312)c3Say('Tak zastavím ho já. I s tebou, Maquinisto.');if(t==340)c3Aim()}},post:{}},
 bar:{pre:{dur:470,f:(c,t,q)=>{if(t==60)c3Say('Baron Vane… konečně.');if(t==392)c3Dodge(c,q,1);if(t==440)c3Say('Srdce patří poušti. Jdu si pro něj.');if(t==456)c3Aim()}},post:{}}};
for(const k in C3X){const x=C3X[k];if(x.pre&&x.pre.dur&&BPS[k])BPS[k].dur=Math.max(BPS[k].dur,x.pre.dur);if(x.post&&x.post.dur&&POST[k])POST[k].dur=Math.max(POST[k].dur,x.post.dur)}
{const _b=CUTX.bpre;CUTX.bpre=c=>{_b(c);try{const x=C3X[c.k2];if(x&&x.pre&&x.pre.f&&cut===c&&state=='cut'&&c.q)x.pre.f(c,c.t,c.q)}catch(err){console.error('c3x',err)}}}
{const _b=CUTX.bpost;CUTX.bpost=c=>{_b(c);try{const x=C3X[c.k2];if(x&&x.post&&x.post.f&&cut===c&&state=='cut'&&c.q)x.post.f(c,c.t,c.q)}catch(err){console.error('c3x',err)}}}
