/* =====================================================================
   v82: KAPITÁN ANCLA – pirát s kyjem a lanem (kloubová loutka podle předlohy)
   kyj = úder/zaseknutí, lano s uzlem = hod/vířivka/houpání, píšťalka = salva,
   rum = 4. fáze; IK paží a nohou, pružiny, mimika, plynulé zpomalení
   ===================================================================== */
const PRJ=PRA.j,PRI={},PR3={ok:0,K:.255};
(function(){const ks=Object.keys(PRA.p);let left=ks.length;ks.forEach(k=>{const im=new Image();im.onload=()=>{PRI[k]=im;if(--left==0)pr3Prep()};im.onerror=()=>{if(--left==0)pr3Prep()};im.src=PRA.p[k].u})})();
function pr3Var(im,col,op){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation=op;g.fillStyle=col;g.fillRect(0,0,c.width,c.height);return c}
function pr3Prep(){try{for(const k of Object.keys(PRA.p)){const im=PRI[k];if(!im)continue;
  PRI[k+'@s']=pr3Var(im,'rgba(26,20,16,.8)','source-atop');
  if(/head|jaw|neck|upF|loF|upB|loB|fist/.test(k))PRI[k+'@r']=pr3Var(im,'rgba(255,36,18,.38)','source-atop')}}catch(err){}PR3.ok=1}
const prCl=(v,a,b)=>v<a?a:v>b?b:v,prL=(a,b,u)=>a+(b-a)*u;
const prE={io:u=>u<.5?2*u*u:1-2*(1-u)*(1-u),o:u=>1-(1-u)*(1-u),o3:u=>1-Math.pow(1-u,3),i:u=>u*u,i3:u=>u*u*u,l:u=>u,
 ob:u=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(u-1,3)+c1*Math.pow(u-1,2)}};
function prLV(a,b,u){if(typeof a=='number')return a+(b-a)*u;return[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u]}
function prKey(f,K){if(f<=K[0][0])return K[0][1];for(let i=1;i<K.length;i++){if(f<=K[i][0]){const a=K[i-1],b=K[i],u=(f-a[0])/Math.max(1e-6,b[0]-a[0]);return prLV(a[1],b[1],(b[2]||prE.io)(prCl(u,0,1)))}}return K[K.length-1][1]}
function prIK(S,T,L1,L2,bs){let dx=T[0]-S[0],dy=T[1]-S[1],d=Math.hypot(dx,dy);const mx=(L1+L2)*.995;if(d>mx){dx*=mx/d;dy*=mx/d;d=mx}d=Math.max(d,Math.abs(L1-L2)+2,1);
 const a=Math.atan2(dy,dx),c=(L1*L1+d*d-L2*L2)/(2*L1*d),b=Math.acos(prCl(c,-1,1)),an=a+bs*b;return[[S[0]+Math.cos(an)*L1,S[1]+Math.sin(an)*L1],[S[0]+dx,S[1]+dy]]}
const prD=(a,b)=>Math.hypot(b[0]-a[0],b[1]-a[1]);
function prP(k,v,al){const d=PRA.p[k];if(!d)return;const im=(v&&PRI[k+v])||PRI[k];if(!im)return;const g=X.globalAlpha;if(al!=null)X.globalAlpha=g*al;X.drawImage(im,d.ox,d.oy,d.w,d.h);
 if(PR3.red>.03&&PRI[k+'@r']&&v!=='@s'){X.globalAlpha=g*(al==null?1:al)*Math.min(1,PR3.red)*.85;X.drawImage(PRI[k+'@r'],d.ox,d.oy,d.w,d.h)}
 if(PR3.soot>.03&&PRI[k+'@s']){X.globalAlpha=g*(al==null?1:al)*PR3.soot;X.drawImage(PRI[k+'@s'],d.ox,d.oy,d.w,d.h)}X.globalAlpha=g}
function prBone(k,a0,b0,a,b,str){const r0=Math.atan2(b0[1]-a0[1],b0[0]-a0[0]),r1=Math.atan2(b[1]-a[1],b[0]-a[0]),L0=prD(a0,b0),L1=prD(a,b),sx=prCl(L0>0?L1/L0:1,1-(str||.1),1+(str||.1));
 X.save();X.translate(a[0],a[1]);X.rotate(r1);X.scale(sx,1);X.rotate(-r0);X.translate(-a0[0],-a0[1]);prP(k);X.restore()}
function prAt(p,r,fn){X.save();X.translate(p[0],p[1]);X.rotate(r);X.translate(-p[0],-p[1]);fn();X.restore()}
/* lano: obrys, tělo, kroucení */
function prRope(x0,y0,x1,y1,sag,w){w=w||18;const mx=(x0+x1)/2,my=(y0+y1)/2+(sag||0);X.save();X.lineCap='round';X.lineJoin='round';const P=new Path2D();P.moveTo(x0,y0);P.quadraticCurveTo(mx,my,x1,y1);
 X.strokeStyle='#1e1a12';X.lineWidth=w+9;X.stroke(P);X.strokeStyle='#d9bd85';X.lineWidth=w;X.stroke(P);X.strokeStyle='rgba(255,240,200,.55)';X.lineWidth=w*.28;X.stroke(P);
 const L=Math.hypot(x1-x0,y1-y0)+Math.abs(sag||0),n=Math.floor(L/(w*1.3));X.strokeStyle='rgba(120,90,50,.85)';X.lineWidth=w*.22;X.beginPath();
 for(let i=1;i<n;i++){const u=i/n,ax=(1-u)*(1-u)*x0+2*(1-u)*u*mx+u*u*x1,ay=(1-u)*(1-u)*y0+2*(1-u)*u*my+u*u*y1,tx=2*(1-u)*(mx-x0)+2*u*(x1-mx),ty=2*(1-u)*(my-y0)+2*u*(y1-my),tl=Math.hypot(tx,ty)||1,nx=-ty/tl,ny=tx/tl,dx=tx/tl,dy=ty/tl;
  X.moveTo(ax+nx*w*.42-dx*w*.25,ay+ny*w*.42-dy*w*.25);X.lineTo(ax-nx*w*.42+dx*w*.25,ay-ny*w*.42+dy*w*.25)}X.stroke();X.restore()}
/* uzel na konci lana (opičí pěst) */
function prKnot(x,y,r,a){X.save();X.translate(x,y);X.rotate(a||0);X.fillStyle='#1e1a12';X.beginPath();X.arc(0,0,r+5,0,7);X.fill();const g=X.createRadialGradient(-r*.35,-r*.35,1,0,0,r);g.addColorStop(0,'#f0dba8');g.addColorStop(1,'#b8955a');X.fillStyle=g;X.beginPath();X.arc(0,0,r,0,7);X.fill();
 X.save();X.beginPath();X.arc(0,0,r,0,7);X.clip();X.strokeStyle='rgba(110,80,40,.9)';X.lineWidth=r*.16;for(let i=-2;i<=2;i++){X.beginPath();X.moveTo(-r,i*r*.36);X.lineTo(r,i*r*.36);X.stroke()}X.strokeStyle='rgba(90,64,30,.7)';for(let i=-2;i<=2;i++){X.beginPath();X.moveTo(i*r*.36,-r);X.lineTo(i*r*.36,r);X.stroke()}X.restore();X.restore()}
/* šátek samostatně (odhozený) */
function prBandDraw(x,y,a,s){const d=PRA.p.pr_band,im=PRI.pr_band;if(!d||!im)return;const c=PRJ.capP;X.save();X.translate(x,y);X.rotate(a);X.scale(s,s);X.drawImage(im,d.ox-c[0],d.oy-c[1],d.w,d.h);const t=PRA.p.pr_tails,ti=PRI.pr_tails;if(t&&ti)X.drawImage(ti,t.ox-c[0],t.oy-c[1],t.w,t.h);X.restore()}
/* láhev rumu */
function prBottle(x,y,a,s,cork){X.save();X.translate(x,y);X.rotate(a);X.scale(s||1,s||1);X.lineJoin='round';const P=new Path2D();P.moveTo(-16,40);P.lineTo(-16,-4);P.quadraticCurveTo(-16,-22,-6,-28);P.lineTo(-6,-48);P.lineTo(6,-48);P.lineTo(6,-28);P.quadraticCurveTo(16,-22,16,-4);P.lineTo(16,40);P.closePath();
 X.fillStyle='#1e1a12';X.lineWidth=10;X.strokeStyle='#1e1a12';X.stroke(P);const g=X.createLinearGradient(-16,0,16,0);g.addColorStop(0,'#2c5a2a');g.addColorStop(.4,'#4f8a3c');g.addColorStop(1,'#1e3a1c');X.fillStyle=g;X.fill(P);
 X.fillStyle='#e8dcb4';X.fillRect(-13,4,26,20);X.strokeStyle='#1e1a12';X.lineWidth=3;X.strokeRect(-13,4,26,20);X.fillStyle='#8a2a1a';X.font='bold 13px Georgia';X.textAlign='center';X.fillText('XXX',0,19);
 X.fillStyle='rgba(255,255,255,.35)';X.fillRect(-11,-8,4,40);if(cork){X.fillStyle='#a87a4a';X.fillRect(-6,-58,12,12);X.strokeStyle='#1e1a12';X.lineWidth=3;X.strokeRect(-6,-58,12,12)}X.restore()}

/* =====================================================================
   PÓZY (zdrojové px; ruce v souřadnicích trupu)
   úhel kyje: absolutní směr od úchopu ke špičce = -1.18 + fa
   ===================================================================== */
const PRR={fH:[762,372],bH:[318,606],FB:[380,916],FF:[578,916]},PRCA=a=>a+1.18;
function prPose(e,A){const B=e.bst,tm=e.tm,t=e.t2||T,dead=e.st=='dead',gf=e.gf==null?e.z:e.gf,air=e.z>gf+2;
 const P={rx:0,ry:0,rr:0,rp:[480,995],sq:1,px:0,py:0,lean:.02,br:1,hr:0,hx:0,hy:0,jaw:0,bA:.35,bS:0,lid:0,cx:0,cy:0,cr:0,
  fH:PRR.fH.slice(),fa:0,fbs:1,bH:PRR.bH.slice(),ba:0,bbs:1,FB:PRR.FB.slice(),FF:PRR.FF.slice(),fba:0,ffa:0,fI:'club',bI:'rope',eyes:'n',k:.3,cap:1,
  smear:0,sweat:0,stars:0,steam:0,red:0,soot:0,tuck:0,walk:0,run:0,wob:0,whB:0,stuck:0,tug:0,spin:0,w:0,toShip:0,bandHand:0};
 const k=v=>prCl(v,0,1),f=(T0)=>T0-tm;
 const br=Math.sin(t*.05);P.py=br*2.4;P.br=1+br*.014;P.hr=Math.sin(t*.021)*.025;P.hy=-br*1.4;P.fH=[762+br*2,372-br*3];
 /* ---- chůze / běh: kolébavá námořnická chůze ---- */
 const mv=A.mv||0,run=B=='charge';
 if(mv>.3&&!air&&!dead&&['idle','walk','charge','whirl','laugh','roar','guard','point','twirl'].includes(B)){
  const ph=A.ph||0,c=Math.cos(ph),sn=Math.sin(ph),stp=run?1:Math.min(1,mv/1.8),st=run?.42:.58;
  const foot=u=>{u=((u%1)+1)%1;if(u<st)return[prL(1,-1,u/st),0];const v=(u-st)/(1-st);return[prL(-1,1,prE.io(v)),Math.sin(Math.PI*v)]};
  const u0=ph/(Math.PI*2),fF=foot(u0),fB=foot(u0+.5),SL=(run?170:96)*stp*(A.dir||1),LF=(run?84:34)*stp;
  P.FF=[PRR.FF[0]+fF[0]*SL,916-fF[1]*LF];P.FB=[PRR.FB[0]+fB[0]*SL,916-fB[1]*LF];P.ffa=-fF[1]*.28*(A.dir||1);P.fba=-fB[1]*.28*(A.dir||1);
  const dbl=Math.abs(Math.cos(ph*2));P.py=(run?20:9)*stp*(1-dbl)-(run?8:0)+br;P.rr=Math.sin(ph)*(run?.02:.04)*stp;P.lean=run?.38:.05*stp;P.hr+=Math.sin(ph*2+1)*.035*stp;P.walk=1;P.run=run?1:0;
  P.fH=[762-c*14*stp*(A.dir||1),372-Math.abs(sn)*10*stp];P.fa=c*.08*stp;P.bH=[318+c*34*stp*(A.dir||1),606-Math.abs(c)*10*stp];P.ba=-c*.18*stp;
  if(run){P.fH=[560-c*40,470+sn*20];P.fa=PRCA(-2.6);P.bH=[430+c*60,560+sn*20];P.jaw=.6;P.bA=1;P.hr=.18;P.k=.5}}
 /* ---- klid: drobné akce ---- */
 if((B=='idle'||B=='walk')&&mv<=.3&&!air&&!dead){const c=(t+(e.id3||0))%400;
  if(c<80){/* kyj na rameno, poklepání */const u=c<14?prE.io(c/14):c>66?1-prE.io((c-66)/14):1,tap=c>20&&c<62?Math.abs(Math.sin((c-20)*.3))*14:0;P.fH=prLV(P.fH,[712,432+tap*.6],u);P.fa=prL(0,PRCA(-2.55)-tap*.003,u);P.armBack=u>.5?1:0;P.hr=prL(P.hr,-.05,u);P.k=.3}
  else if(c>=150&&c<205){const v=(c-150)/55;P.jaw=Math.max(0,Math.sin(v*Math.PI*2))*.5;P.hr+=Math.sin(v*Math.PI)*-.12;P.lid=Math.sin(v*Math.PI)*.3}
  else if(c>=260&&c<330){const v=(c-260)/70;P.bH=[318+Math.sin(v*Math.PI*4)*30,600-Math.sin(v*Math.PI)*40];P.ba=Math.sin(v*Math.PI*4)*.3;P.hr=-.06}}
 if(B=='sweep'){const g=f(46);P.k=.55;
  P.fH=prKey(g,[[0,PRR.fH],[8,[700,300]],[20,[560,180]],[24,[566,176]],[28,[860,560],prE.o3],[34,[866,600]],[46,PRR.fH]]);
  P.fa=prKey(g,[[0,0],[8,-.5],[20,PRCA(-3.05)],[24,PRCA(-3.15)],[28,PRCA(1.0),prE.o3],[34,PRCA(1.25)],[46,0]]);
  P.lean=prKey(g,[[0,.02],[8,-.05],[20,-.2],[24,-.22],[28,.3,prE.o3],[34,.34],[46,.02]]);P.py=prKey(g,[[0,0],[20,-8],[28,42,prE.o],[36,46],[46,0]]);
  P.FF=prKey(g,[[0,PRR.FF],[22,[590,916]],[26,[640,890]],[29,[700,916]],[40,[700,916]],[46,PRR.FF]]);P.ffa=prKey(g,[[0,0],[26,-.3],[29,0]]);
  P.bH=prKey(g,[[0,PRR.bH],[20,[280,500]],[28,[380,640]],[46,PRR.bH]]);P.ba=prKey(g,[[0,0],[20,.5],[28,-.3],[46,0]]);P.hr=prKey(g,[[0,0],[20,-.12],[28,.16],[46,0]]);
  P.jaw=prKey(g,[[0,0],[20,.15],[26,1],[36,.6],[46,0]]);P.bA=1;P.smear=g>=24&&g<=31?1:0}
 else if(B=='anchor'){const g=f(44),an=CAP.anc&&CAP.anc.e===e?CAP.anc:null;P.k=.5;P.bA=1;
  if(g<20&&!an){const sp=g*(.25+g*.02);P.bI='spin';P.spin=sp;P.bH=prKey(g,[[0,PRR.bH],[8,[300,520]],[20,[260,470]]]);P.lean=prKey(g,[[0,.02],[16,-.14]]);P.hr=prKey(g,[[0,0],[16,-.08]]);P.jaw=prKey(g,[[0,0],[14,.3]]);P.FB=[350,916];P.fH=[720,330];P.fa=-.2}
  else if(!an&&g<=26){const u=prE.o3(k((g-20)/5));P.bI='spin';P.spin=g*.7;P.bH=prLV([260,470],[760,440],u);P.lean=prL(-.14,.26,u);P.FF=[680,916];P.jaw=1;P.hr=.12}
  else{const back=an&&an.back,ph=t*.32;P.bI=an?'out':'rope';P.bH=an?(back?[700+Math.sin(ph)*50,460+Math.cos(ph)*16]:[790,440]):prLV([760,440],PRR.bH,k((10-tm)/10));P.lean=an?(back?-.12+Math.sin(ph)*.05:.22):.05;P.FF=[680,916];P.FB=an&&back?[340,916]:PRR.FB;P.jaw=back?.5:.7;P.py=back?16:6;P.sweat=back?1:0;P.fH=[700,330];P.fa=-.3}}
 else if(B=='slam'){const u=prE.io(k(f(30)/30));P.k=.45;P.fH=prLV(PRR.fH,[600,150],u);P.fa=prL(0,PRCA(-2.2),u);P.bH=prLV(PRR.bH,[430,230],u);P.py=50*u;P.lean=prL(.02,-.12,u);P.sq=1-.08*u;P.FF=[620,916];P.FB=[350,916];P.bA=1;P.jaw=.3*u}
 else if(B=='air'){const vz=e.vz||0,u=k((6-vz)/16),uu=prE.i(u);P.k=.5;P.fH=prLV([600,150],[860,600],uu);P.fa=prL(PRCA(-2.2),PRCA(1.3),uu);P.bH=prLV([430,230],[600,560],uu);P.lean=prL(-.12,.3,u);P.FF=[620,860];P.FB=[420,850];P.ffa=-.3;P.fba=.2;P.py=-20;P.jaw=prL(.4,1,u);P.bA=1;P.smear=u>.45?1:0}
 else if(B=='stuck'){const tug=Math.max(0,Math.sin(t*.19))**3,s2=Math.sin(t*.55);P.fI='grip';P.stuck=1;P.tug=tug;P.k=.4;
  P.fH=[700-tug*30,640-tug*10];P.fa=.9;P.bH=[650-tug*30,600-tug*12];P.bI='grip';P.lean=-.06-.18*tug+s2*.012;P.py=60+tug*10;P.FF=[690,916];P.FB=[350,916];P.fba=-.15*tug;P.ffa=.08;P.jaw=.3+.7*tug;P.bA=1;P.sweat=1;P.lid=.15;P.hr=-.1*tug;P.red=.4*tug}
 else if(B=='yank'){const g=f(18);P.k=.5;P.bA=1;P.fH=prKey(g,[[0,[690,640]],[6,[620,220],prE.o],[18,PRR.fH]]);P.fa=prKey(g,[[0,PRCA(1.1)],[6,PRCA(-2.4),prE.o],[18,0]]);P.lean=prKey(g,[[0,-.24],[6,-.14],[18,.02]]);P.py=prKey(g,[[0,44],[6,20],[18,0]]);P.jaw=prKey(g,[[0,1],[18,.2]]);P.smear=g<9?1:0;P.FB=prKey(g,[[0,[350,916]],[8,[300,916]],[18,PRR.FB]])}
 else if(B=='whirl'){P.k=.5;P.bA=1;P.jaw=.6;
  if(tm>70){const u=k((116-tm)/46),w=(116-tm)*(.14+.24*u);P.bI='whirlUp';P.w=w;P.bH=[420+Math.cos(w)*10,90+Math.sin(w)*8];P.fH=[790,380];P.fa=-.25;P.lean=-.06;P.hr=-.1}
  else{const w=(70-tm)*.38+3;P.bI='whirl';P.w=w;P.bH=[600+Math.cos(w)*50,420+Math.sin(w)*14];P.fH=[800,340];P.fa=-.45;P.lean=Math.sin(w)*.06+.05;P.rr=Math.sin(w)*.03;P.py=10+Math.sin(w*2)*4}}
 else if(B=='guard'){P.fH=[748,436];P.fa=PRCA(-1.66);P.armFront=1;P.bH=[470,330];P.bI='grip';P.py=46;P.lean=.08;P.FF=[640,916];P.FB=[350,916];P.hr=.08;P.bA=.9;P.k=.35}
 else if(['broad','command','barrels','crew','call','deck'].includes(B)){P.k=.4;
  const BQ=B=='broad'&&typeof cpBroadCfg=='function'?cpBroadCfg(e.ph||1).shots:null;let ch=0;
  if(B=='deck')ch=e._chop||0;else if(BQ){for(const s of BQ){const d=tm-s;if(d>=-4&&d<10)ch=Math.max(ch,d>=4?(10-d)/6:d>=0?1:(d+4)/4)}}else ch=Math.max(0,Math.sin(t*.12))**6;
  const blow=B=='broad'?(tm>96||ch>.2):B=='deck'?ch>.1||(t%160)<40:(t%90)<30;
  if(blow){P.bI='whistleT';P.whB=1;P.jaw=0;P.hr=-.06}
  P.fH=prLV([720,250],[850,430],ch);P.fa=prL(-.6,PRCA(.4),ch);P.lean=prL(-.04,.14,ch);if(!blow)P.jaw=prL(.3,1,ch);P.bA=.9;P.hr+=prL(-.04,.08,ch)}
 else if(B=='tired'){const pt=Math.sin(t*.22);P.lean=.42+pt*.02;P.py=52+pt*4;P.fH=[700,660];P.fa=PRCA(1.4);P.bH=[440,660];P.FF=[640,916];P.FB=[350,916];P.jaw=.6+pt*.3;P.lid=.45;P.bA=-.2;P.bS=.3;P.sweat=1;P.hr=.14;P.k=.25}
 else if(B=='dizzy'){const w=Math.sin(t*.09),w2=Math.sin(t*.13+1);P.eyes='spiral';P.jaw=.3+w2*.15;P.py=12+w2*6;P.lean=w*.1;P.rr=w*.05;P.hr=-w*.2;P.fH=[720+w*30,560];P.fa=PRCA(1.2);P.bH=[330-w*20,620];P.FF=[610+w*16,916];P.FB=[400+w*12,916];P.stars=1;P.cr=-.2;P.cx=-12;P.bA=0;P.bS=.5;P.k=.2}
 else if(B=='laugh'){const b=Math.abs(Math.sin(t*.45)),b2=Math.sin(t*.9);P.lean=-.16-b*.05;P.py=-b*18+6;P.sq=1+b*.04;P.br=1+b*.04;P.jaw=.9+b*.3;P.eyes='shut';P.fH=[712,432+b*10];P.fa=PRCA(-2.55);P.armBack=1;P.bH=[430,600];P.hr=-.16-b*.08+b2*.02;P.bS=.4;P.bA=0;P.k=.45}
 else if(B=='shove'){const g=f(24);P.k=.6;P.lean=prKey(g,[[0,0],[10,.16],[12,.18],[15,-.2,prE.o3],[24,0]]);P.px=prKey(g,[[0,0],[11,-30],[15,60,prE.o3],[20,50],[24,0]]);P.br=prKey(g,[[0,1],[11,.97],[15,1.07,prE.o3],[24,1]]);P.py=prKey(g,[[0,0],[11,26],[15,4],[24,0]]);
  P.FF=prKey(g,[[0,PRR.FF],[12,[600,916]],[15,[700,916]],[24,PRR.FF]]);P.FB=prKey(g,[[0,PRR.FB],[15,[360,916]],[24,PRR.FB]]);P.fH=prKey(g,[[0,P.fH],[11,[680,400]],[15,[600,300]],[24,P.fH]]);P.fa=prKey(g,[[0,0],[11,-.3],[15,PRCA(-2.2)],[24,0]]);P.bH=prKey(g,[[0,PRR.bH],[11,[380,560]],[15,[260,480]],[24,PRR.bH]]);P.jaw=prKey(g,[[0,0],[12,.2],[15,1],[24,0]]);P.bA=1;P.hr=prKey(g,[[0,0],[11,.1],[15,-.14],[24,0]])}
 else if(B=='roar'||B=='rage'){const sh=Math.sin(t*.9),g=B=='roar'?110-tm:60,inh=B=='roar'?prKey(g,[[0,0],[40,1],[54,0,prE.i]]):0,up=B=='roar'?prKey(g,[[0,0],[46,0],[56,1,prE.o3],[100,1],[110,0]]):1;
  P.jaw=prL(.1,1.2,up);P.bA=1;P.lid=inh*.4;P.br=1+.07*inh;P.lean=-.12*inh+.1*up;P.hr=-.12*inh+.06*up+sh*.02*up;P.py=8*inh+(10+sh*3)*up;
  P.fH=prLV(prLV(PRR.fH,[700,420],inh),[800,150+sh*10],up);P.fa=prL(0,-.4,up);P.bH=prLV(prLV(PRR.bH,[420,470],inh),[300,170-sh*10],up);P.FF=[660,916];P.FB=[350,916];P.red=up*(e._redK!=null?e._redK:.62);P.steam=up;P.sq=1+.03*up;P.k=.5;P.wob=up}
 else if(B=='hurt'||B=='fly'||B=='blasted'){const u=k(1-tm/40);P.lean=-.4;P.rr=-.3*u;P.rp=[480,700];P.fH=[820,170];P.fa=-.8;P.bH=[300,200];P.jaw=1;P.eyes='x';P.FF=[640,820];P.FB=[480,860];P.ffa=-.5;P.fba=-.3;P.k=.5;P.bS=1;P.bA=0;if(B=='blasted')P.soot=1}
 else if(B=='down'){const ly=Math.sin(t*.07);P.rr=-1.5;P.rp=[400,995];P.ry=-40;P.eyes='spiral';P.jaw=.4+ly*.1;P.fH=[760,320];P.fa=-.6;P.bH=[380,380];P.FF=[640,880];P.FB=[470,900];P.stars=1;P.k=.25;P.bA=0;P.bS=.6}
 else if(B=='rise2'){const g=f(56);P.rr=prL(-1.5,0,prE.io(k(g/40)));P.rp=[400,995];P.ry=prL(-40,0,k(g/40));P.py=prKey(g,[[0,40],[34,60],[46,20],[56,0]]);P.lean=prKey(g,[[0,.2],[34,.38],[56,.02]]);P.jaw=prKey(g,[[0,.3],[40,.1],[50,.8],[56,.2]]);P.bA=prL(0,1,k(g/56));P.k=.3;
  if(tm<=30&&tm>12){P.bandHand=1;P.bH=[440,150];P.bI='none';P.fH=[650,170];P.fa=PRCA(-2.6)}P.FF=[630,916];P.FB=[380,916]}
 else if(B=='fuses'){const g=150-tm;P.k=.42;P.fI=g<86?'bottle':'club';P.clubBelt=g<86?1:0;P.armFront=g>=18&&g<86?1:0;
  P.fH=prKey(g,[[0,PRR.fH],[10,[600,600]],[22,[640,330]],[30,[600,290]],[78,[590,270]],[84,[480,240]],[86,[560,560]],[92,[800,140]],[150,[800,150]]]);
  P.fa=prKey(g,[[0,0],[10,1.2],[22,.2],[30,-.6],[40,-1.6],[78,-1.7],[84,-2.4],[86,0],[92,-.4]]);
  P.hr=prKey(g,[[0,0],[30,0],[40,-.42],[76,-.42],[86,.1]]);P.lean=prKey(g,[[0,.02],[30,.02],[40,-.18],[78,-.16],[84,-.24],[90,-.2],[150,-.1]]);P.jaw=prKey(g,[[0,0],[22,.6],[28,.2],[34,.4],[78,.4],[90,1.2],[130,1.2],[150,.4]]);
  P.red=prKey(g,[[0,0],[40,0],[80,.7],[92,1]]);P.steam=g>84?1:0;P.glug=g>40&&g<78?1:0;P.bA=1;P.py=prKey(g,[[0,0],[84,0],[90,30],[98,10]]);P.wob=g>88?1:0;P.cork=g<24;
  P.bH=prKey(g,[[0,PRR.bH],[84,PRR.bH],[92,[300,200]],[150,[300,220]]]);if(g>=84&&g<=86)P.throwB=1}
 else if(B=='chargeW'){const s2=Math.sin(t*.5);P.k=.4;P.fH=[580,480];P.fa=PRCA(-2.6);P.bH=[460,560];P.lean=.36;P.py=52;P.hr=.26;P.cy=6;P.cr=.06;P.FF=[650,916];P.FB=[330+s2*44,916-Math.max(0,s2)*30];P.fba=-.3*Math.max(0,s2);P.bA=1;P.lid=.2;P.jaw=.2;P.steam=.4;P.red=.4}
 else if(B=='charge'){P.hr=.22;P.cr=.08;P.bA=1;P.jaw=.85;P.red=.3}
 else if(B=='leapW'){const u=prE.io(k((28-tm)/28));P.k=.45;P.py=70*u;P.sq=1-.12*u;P.lean=.14*u;P.fH=prLV(PRR.fH,[620,120],u);P.fa=prL(0,PRCA(-2.4),u);P.bH=prLV(PRR.bH,[340,520],u);P.FF=[640,916];P.FB=[350,916];P.bA=1;P.jaw=.2}
 else if(['leapU','sky','toShip','retreat'].includes(B)){P.k=.6;P.sq=1.12;P.fH=[700,140];P.fa=-.6;P.bH=[420,90];P.FF=[600,840];P.FB=[430,880];P.ffa=.3;P.fba=.4;P.lean=-.06;P.jaw=.9;P.bA=.6;if(B=='toShip'){P.toShip=1;P.bI='grip';P.bH=[460,60];P.FF=[640,830];P.FB=[450,870]}}
 else if(B=='drop'){P.k=.6;P.sq=1.06;P.fH=[760,640];P.fa=PRCA(Math.PI/2);P.bH=[300,160];P.FF=[640,800];P.FB=[440,830];P.ffa=-.4;P.fba=-.3;P.jaw=1;P.bA=1;P.cy=-24;P.cr=-.1;if(e.back){P.toShip=2;P.bI='grip';P.bH=[420,80]}}
 else if(B=='curl'){const u=prE.io(k((30-tm)/30));P.py=60*u;P.lean=.5*u;P.hr=.4*u;P.fH=prLV(P.fH,[640,540],u);P.fa=prL(0,PRCA(-2.8),u);P.bH=prLV(PRR.bH,[440,560],u);P.k=.5;P.jaw=.2}
 else if(B=='roll'){P.tuck=1;P.k=.8}
 /* ---- úvodní scéna ---- */
 else if(B=='yard'){P.bI='whistleT';P.whB=e._whB!=null?e._whB:((t%70)<28?1:0);P.fH=[712,432];P.fa=PRCA(-2.55);P.armBack=1;P.hr=-.04;P.bA=.6;P.k=.35}
 else if(B=='grab'){const g=Math.sin(t*.25);P.bI='grip';P.bH=[440,70];P.fH=[712,432+g*6];P.fa=PRCA(-2.55);P.armBack=1;P.jaw=.8;P.hr=-.12;P.lean=-.06;P.bA=.4;P.k=.4
  if(e._laugh){const b=Math.abs(Math.sin(t*.45));P.py=-b*14+4;P.jaw=.9+b*.3;P.eyes='shut';P.hr=-.2-b*.08;P.lean=-.14-b*.04;P.br=1+b*.04;P.fH=[690,300+b*12];P.bA=0}
  if(e._crouch){const u=e._crouch;P.py+=70*u;P.lean+=.18*u;P.FF=[640,916];P.FB=[380,916];P.hr+=.1*u;P.jaw=.3;P.bA=1;P.k=.5}}
 else if(B=='swing'){P.bI='grip';P.bH=[440,60];P.fH=[860,260];P.fa=PRCA(-.2);P.FF=[680,820];P.FB=[520,840];P.ffa=-.3;P.fba=-.2;P.lean=.08;P.jaw=1;P.bA=1;P.k=.5;P.cy=-10}
 else if(B=='crash'){const u=k(tm/30);P.py=80*u;P.sq=1-.1*u;P.lean=.3*u;P.fH=[800,600];P.fa=PRCA(1.3);P.bH=[380,640];P.FF=[660,916];P.FB=[320,916];P.jaw=.4;P.bA=1;P.k=.4}
 else if(B=='neck'){const c=(60-tm);const ti=c<20?-.3*prE.io(k(c/10)):c<40?prL(-.3,.3,prE.io(k((c-20)/8))):prL(.3,0,k((c-40)/10));P.hr=ti;P.hx=ti*12;P.jaw=Math.abs(ti)>.25?.4:.1;P.fH=[712,432];P.fa=PRCA(-2.55);P.armBack=1;P.bA=.8;P.k=.45;P.lid=Math.abs(ti)>.25?.4:0}
 else if(B=='slap'){const c=(t*.14)%(Math.PI*2),hit=Math.max(0,Math.sin(c))**4;P.fH=prLV([770,330],[560,520],hit);P.fa=prL(PRCA(-1.45),PRCA(-.2),hit);P.bH=[520,560];P.bI='rope';P.jaw=.3+.4*hit;P.bA=1;P.hr=.06*hit;P.k=.6}
 else if(B=='point'){P.fH=[880,300];P.fa=PRCA(-.15);P.lean=.08;P.jaw=.7;P.bA=1;P.FF=[650,916];P.hr=.06;P.k=.35}
 else if(B=='smashUp'){P.fH=[650,60];P.fa=PRCA(-2.5);P.bH=[470,150];P.bI='grip';P.lean=-.14;P.hr=-.12;P.jaw=1;P.bA=1;P.FF=[640,860];P.FB=[420,880];P.ffa=-.3;P.fba=.2;P.k=.5;P.armBack=1}
 else if(B=='twirl'){const w=t*.45;P.bI='whirlUp';P.w=w;P.bH=[420+Math.cos(w)*10,90+Math.sin(w)*8];P.fH=[790,380];P.fa=-.25;P.jaw=.9;P.eyes=(t%60)<30?'shut':'n';P.hr=-.1;P.k=.4}
 /* ---- ve vzduchu ---- */
 if(air&&!['leapU','sky','drop','retreat','hurt','fly','blasted','toShip','air','roll','swing','grab','yard','smashUp'].includes(B)&&!dead){const vz=e.vz||0;P.FF=[620,870];P.FB=[430,880];P.ffa=-.25;P.fba=.2;P.k=.45;if(vz>2){P.fH=[720,220];P.fa=-.5;P.bH=[330,250];P.jaw=.6}else{P.fH=[760,300];P.bH=[300,300];P.jaw=.9;P.bS=.6}}
 if((e.stg||1)>=4&&!dead&&B!='fuses'){P.red=Math.max(P.red,.45);P.steam=Math.max(P.steam,.5);P.bA=Math.max(P.bA,.9)}
 if(e.ph>=2&&P.bA<.6&&P.eyes=='n')P.bA=.6;
 if(dead){const u=k((e.dt||0)/26);P.rr=-1.48*prE.o3(u);P.rp=[420,995];P.eyes='x';P.jaw=.8;P.fH=[800,300];P.bH=[330,320];P.FF=[640,850];P.FB=[470,880];P.k=.4;P.bS=1;P.bA=0;P.cap=0}
 if(e.lost&&e.lost.hat&&!P.bandHand)P.cap=0;
 return P}

/* =====================================================================
   TIK: pružiny, chůze, sekundární pohyb
   ===================================================================== */
const PRN=['rx','ry','rr','sq','px','py','lean','br','hr','hx','hy','jaw','bA','bS','lid','cx','cy','cr','fa','ba','fba','ffa','red','steam','soot'];
function prTick(e,A){const fresh=A.T==null||Math.abs(T-A.T)>40;A.T=T;
 const x=e.x;if(A.lx==null||fresh)A.lx=x;const dx=x-A.lx;A.lx=x;const sp=Math.abs(dx)>40?0:Math.abs(dx);A.mv=prL(A.mv||0,sp,.35);
 if(sp>.05)A.dir=(Math.sign(dx)*(e.face||1))>=0?1:-1;if(A.dir==null)A.dir=1;const run=e.bst=='charge';A.ph=(A.ph||0)+sp/(run?130:74)*Math.PI*2;
 const P=prPose(e,A);
 if(e._fig!=1&&typeof par!='undefined'){if(A.pB=='roll'&&e.bst!='roll'){try{bpSplinters(e.x,e.z+40,16,'#8a5a30')}catch(err){}spawnP(e.x,LY,18,'#b08a5a',5,40,e.z+40);sfx('break',e.x);shake=Math.max(shake,8)}if(A.pB=='curl'&&e.bst=='roll'){spawnP(e.x,LY,20,'#e8e0d0',5,30,e.z+60);sfx('heavy',e.x)}}A.pB=e.bst;
 if(PR3HS>0&&!A.hs0)A.kick=1;A.hs0=PR3HS>0;
 const gf=e.gf==null?e.z:e.gf,air=e.z>gf+2;if(A.air&&!air&&(A.vz||0)<-2)A.land=1;A.air=air;A.vz=e.vz||0;
 const V=A.V||(A.V={}),Vv=A.Vv||(A.Vv={}),kk=prCl(P.k||.3,.1,.9),dm=.62;A.Vp=Object.assign({},A.Vc||{});
 for(const key of PRN){const tg=P[key]!=null?P[key]:0;if(fresh||V[key]==null){V[key]=tg;Vv[key]=0}else{let v=Vv[key];v+=(tg-V[key])*kk;v*=dm;V[key]+=v;Vv[key]=v}}
 for(const key of ['fH','bH','FF','FB']){const tg=P[key];if(fresh||!V[key]){V[key]=tg.slice();Vv[key]=[0,0]}else for(let i=0;i<2;i++){let v=Vv[key][i];v+=(tg[i]-V[key][i])*kk;v*=dm;V[key][i]+=v;Vv[key][i]=v}}
 if(P.walk){V.FF=P.FF.slice();V.FB=P.FB.slice()}
 if(A.land){A.sqv=(A.sqv||0)-.12;A.capv=(A.capv||0)+6;A.land=0}if(A.kick){A.kickv=(A.kickv||0)+1;A.kick=0;A.capv=(A.capv||0)+3}
 A.sqo=(A.sqo||0)+(A.sqv||0);A.sqv=((A.sqv||0)-A.sqo*.32)*.7;A.kickv=(A.kickv||0)*.8;
 const acc=(A.mv||0)*(A.dir||1)*.004+(V.lean-(A.pl==null?V.lean:A.pl))*1.2;A.pl=V.lean;
 const pend=(key,g,dmp,drive)=>{const av=key+'v';A[av]=((A[av]||0)+(-(A[key]||0)*g-drive))*dmp;A[key]=(A[key]||0)+A[av]};
 pend('wa',.08,.9,acc*3+(P.wob?(Math.random()-.5)*.05:0));pend('sa',.07,.9,acc*3.5+(P.walk?Math.sin(A.ph)*.012:0));pend('da',.06,.9,acc*2.5+(P.walk?Math.cos(A.ph)*.01:0));
 pend('ra',.05,.88,acc*2+((V.bH[0]-(A.pbx==null?V.bH[0]:A.pbx))*.004));A.pbx=V.bH[0];
 pend('cb',.25,.65,-(A.capv||0)*.5);A.capv=0;
 /* cípy šátku vlají */A.tl=(A.tl||0)+((-(A.mv||0)*(A.dir||1)*.05-V.lean*.6+(P.walk?Math.sin(A.ph*2)*.04:0)+Math.sin(T*.08)*.05+(e.vz||0)*.01)-(A.tl||0))*.12;
 if(!A.bt||fresh)A.bt=T+90+Math.random()*140;if(T>=A.bt){A.blink=6;A.bt=T+110+Math.random()*180}if(A.blink>0)A.blink--;
 A.hist=A.hist||[];A.P=P;A.Vc=Object.assign({},V,{fH:V.fH.slice(),bH:V.bH.slice(),FF:V.FF.slice(),FB:V.FB.slice()});if(fresh)A.Vp=A.Vc}
function prLerp(A){const a=prCl(typeof CP3IPA!='undefined'?CP3IPA:1,0,1),p=A.Vp,c=A.Vc;if(!p||a>=.999||!p.fH)return c;const o={};for(const k in c){const u=c[k],v=p[k];if(Array.isArray(u))o[k]=v?[v[0]+(u[0]-v[0])*a,v[1]+(u[1]-v[1])*a]:u;else if(typeof u=='number'&&typeof v=='number')o[k]=v+(u-v)*a;else o[k]=u}return o}

/* =====================================================================
   KRESLENÍ
   ===================================================================== */
let PR3HS=0;
function prDraw(e){if(!PR3.ok)return;if(e.st=='dead'&&e.dt>140)return;
 const A=e._pr||(e._pr={});if(A.T!==T||!A.Vc)prTick(e,A);const P=A.P,V=prLerp(A),J=PRJ;
 const s=sc(LY)*.92,K=PR3.K*s,sx=e.x-cam,sy=LY-e.z,gf=e.gf==null?e.z:e.gf;
 A.ropeP=null;if(e._ropeW){const o=e._qo||{},s1=o.s||1,r=o.rot||0,cY=sy-(o.cy||70),px=e._ropeW[0]-cam-sx,py=LY-e._ropeW[1]-cY,c=Math.cos(r),sn=Math.sin(r);A.ropeP=[sx+(px*c+py*sn)/s1,cY+(-px*sn+py*c)/s1];A.ropeM=X.getTransform()}
 if(!e._nosh)shd(sx,LY-gf,60*s,10*s,.34);
 X.save();X.translate(sx+(PR3HS>0?R(-2,2):0),sy);if(e._rot){X.translate(0,-110*s);X.rotate(e._rot);X.translate(0,110*s)}
 if(e.st=='dead'&&e.dt>90)X.globalAlpha*=Math.max(0,1-(e.dt-90)/48);
 if(A.fc!=null&&A.fc!=(e.face||1))A.turnT=8;A.fc=e.face||1;let tx=1;if(A.turnT>0){if(A.tT!==T){A.turnT--;A.tT=T}tx=1-.42*Math.sin(Math.PI*(A.turnT/8))}
 X.scale((e.face||1)*K*tx,K*(1+(1-tx)*.08));X.translate(-J.cx,-J.gy);
 PR3.soot=V.soot||0;PR3.red=0;
 if(P.tuck)prRoll(e,A,P,V);
 else{const sq=(V.sq||1)*(1+(A.sqo||0));X.translate(V.rx,V.ry);if(V.rr){X.translate(P.rp[0],P.rp[1]);X.rotate(V.rr);X.translate(-P.rp[0],-P.rp[1])}
  X.translate(J.cx,J.gy);X.scale(1/Math.sqrt(sq),sq);X.translate(-J.cx,-J.gy);prBody(e,A,P,V)}
 X.restore();PR3.soot=0;PR3.red=0;
 const f=e.face||1,W2=q=>[e.x+f*(q[0]+V.rx-J.cx)*K,e.z+(J.gy-(q[1]+V.ry))*K];
 if(A.fhR){e._fh=W2(A.fhR)}if(A.bhR){e._bh=W2(A.bhR)}if(A.hdR){const h=W2(A.hdR);e._hx=h[0];e._hz=h[1]}}
function prTMf(V,lean){const J=PRJ,pel=J.pel,c=Math.cos(lean),sn=Math.sin(lean),bx=V.px||0,by=V.py||0,brx=1+((V.br||1)-1)*.5,bry=V.br||1;
 return q=>{const x=(q[0]-pel[0])*brx,y=(q[1]-pel[1])*bry;return[pel[0]+bx+x*c-y*sn,pel[1]+by+x*sn+y*c]}}
function prSmear(A){const H=A.hist;if(H.length<3)return;const pts=[];
 for(let i=0;i<H.length-1;i++){const a=H[i],b=H[i+1];let da=b[2]-a[2];while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;for(let j=0;j<4;j++){const u=j/4;pts.push([prL(a[0],b[0],u),prL(a[1],b[1],u),a[2]+da*u,a[3]])}}
 X.save();for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],al=.42*Math.pow(1-i/(pts.length-1),1.4);X.fillStyle='rgba(255,246,226,'+al+')';X.beginPath();
  X.moveTo(a[0]+Math.cos(a[2])*a[3]*.35,a[1]+Math.sin(a[2])*a[3]*.35);X.lineTo(a[0]+Math.cos(a[2])*a[3],a[1]+Math.sin(a[2])*a[3]);X.lineTo(b[0]+Math.cos(b[2])*b[3],b[1]+Math.sin(b[2])*b[3]);X.lineTo(b[0]+Math.cos(b[2])*b[3]*.35,b[1]+Math.sin(b[2])*b[3]*.35);X.closePath();X.fill()}X.restore()}
function prBody(e,A,P,V){const J=PRJ,lean=V.lean-(A.kickv||0)*.12,TM=prTMf(V,lean),pel=J.pel,bx=V.px||0,by=V.py||0;
 PR3.red=prCl(V.red||0,0,1);
 const torsoT=()=>{X.translate(pel[0]+bx,pel[1]+by);X.rotate(lean);X.scale(1+((V.br||1)-1)*.5,V.br||1);X.translate(-pel[0],-pel[1])};
 const NK=J.neck,headT=()=>{torsoT();X.translate(NK[0]+V.hx,NK[1]+V.hy);X.rotate(V.hr);X.translate(-NK[0],-NK[1])};
 const L1=prD(J.shF,J.elF),L2=prD(J.elF,J.wrF),M1=prD(J.shB,J.elB),M2=prD(J.elB,J.wrB);
 const fk=prIK(J.shF,V.fH,L1,L2,P.fbs||1),bk=prIK(J.shB,V.bH,M1,M2,P.bbs||1);
 const hipB=[J.hipB[0]+bx*.8,J.hipB[1]+by],hipF=[J.hipF[0]+bx*.8,J.hipF[1]+by],LT=prD(J.hipF,J.kneeF),LS=prD(J.kneeF,J.ankF);
 const kB=prIK(hipB,V.FB,LT,LS,-1),kF=prIK(hipF,V.FF,LT,LS,-1);
 const W=fk[1],ha=V.fa,Wb=bk[1],hb=V.ba+(A.ra||0);A.fhR=TM([W[0],W[1]-40]);A.bhR=TM([Wb[0],Wb[1]+44]);A.hdR=TM([NK[0],NK[1]-130]);
 /* kyj: úchop a špička v souřadnicích trupu (pro stopu) */
 const clubAbs=-1.18+ha,G=[W[0]+(J.grip[0]-J.wrF[0])*Math.cos(ha)-(J.grip[1]-J.wrF[1])*Math.sin(ha),W[1]+(J.grip[0]-J.wrF[0])*Math.sin(ha)+(J.grip[1]-J.wrF[1])*Math.cos(ha)];
 if(P.fI=='club'){A.hist.unshift([G[0],G[1],clubAbs,230]);if(A.hist.length>7)A.hist.length=7}else A.hist.length=0;
 const armBehind=P.armBack||(W[1]<340&&W[0]<725&&!P.armFront);
 const WH=P.bI&&P.bI.startsWith('whirl')?prWhirl(P,V):null;
 /* ---- 1) zadní paže + lano (za tělem) ---- */
 if(WH&&!WH.front)prWhirlDraw(WH,TM(Wb));
 X.save();torsoT();
 prBone('pr_upB',J.shB,J.elB,J.shB,bk[0],.12);prBone('pr_loB',J.elB,J.wrB,bk[0],bk[1],.12);
 const bfa=Math.atan2(bk[1][1]-bk[0][1],bk[1][0]-bk[0][0])-Math.atan2(J.wrB[1]-J.elB[1],J.wrB[0]-J.elB[0]);
 X.save();X.translate(Wb[0],Wb[1]);X.rotate(bfa*.6+hb*.3);X.translate(-J.wrB[0],-J.wrB[1]);
 if(P.bI=='rope'||P.bI=='whistleT'||P.bI=='spin'||P.bI=='out'||P.bI.startsWith('whirl')){const sc=P.bI=='rope'?1:.72;X.save();X.translate(J.gripB[0],J.gripB[1]);X.rotate(hb*.7-bfa*.6);X.scale(sc,sc);X.translate(-J.gripB[0],-J.gripB[1]);prP('pr_rope');X.restore()}
 if(P.bI=='bottle')prBottle(J.gripB[0]+14,J.gripB[1]-6,.15,1.15,(e.tm||0)>120);
 if(A.ropeP&&P.bI=='grip'){try{const M=X.getTransform().inverse().multiply(A.ropeM),pt=M.transformPoint(new DOMPoint(A.ropeP[0],A.ropeP[1]));prRope(J.gripB[0]+8,J.gripB[1]+40,J.gripB[0]-4,J.gripB[1]+120,10,15);prRope(J.gripB[0],J.gripB[1],pt.x,pt.y,0,16)}catch(err){}}
 prP('pr_fistB');
 if(P.bI=='spin'){const r=90,a=P.spin||0,kx=J.gripB[0]+Math.cos(a)*r,ky=J.gripB[1]+30+Math.sin(a)*r;prRope(J.gripB[0],J.gripB[1]+20,kx,ky,10,15);prKnot(kx,ky,20,a)}
 X.restore();X.restore();
 /* ---- 2) nohy ---- */
 const leg=(t,hip,kn,ank,ankR,fa)=>{prBone('pr_th'+t,t=='B'?J.hipB:J.hipF,t=='B'?J.kneeB:J.kneeF,hip,kn,.08);prBone('pr_sh'+t,t=='B'?J.kneeB:J.kneeF,ankR,kn,ank,.12);X.save();X.translate(ank[0],ank[1]);X.rotate(fa);X.translate(-ankR[0],-ankR[1]);prP('pr_ft'+t);X.restore()};
 leg('B',hipB,kB[0],kB[1],J.ankB,V.fba);leg('F',hipF,kF[0],kF[1],J.ankF,V.ffa);
 /* ---- 3) krk, trup, píšťalka, šerpa, dýka ---- */
 X.save();headT();prP('pr_neck');X.restore();
 X.save();torsoT();prP('pr_torso');
 if(P.bI!='whistleT')prAt(J.whK,(A.wa||0)-lean*.7,()=>prP('pr_whistle'));
 prAt(J.stK,(A.sa||0)-lean*.5,()=>prP('pr_stail'));prAt(J.dgK,(A.da||0)-lean*.4,()=>prP('pr_dagger'));
 if(P.clubBelt){X.save();X.translate(430,690);X.rotate(-.5);X.translate(-764,-330);prP('pr_club');X.restore()}X.restore();
 /* zaseklý kyj (za paží) */if(P.stuck)prStuckClub(A,P,V,TM(W));
 const frontArm=()=>{X.save();torsoT();
  if(P.smear&&P.fI=='club')prSmear(A);
  prBone('pr_upF',J.shF,J.elF,J.shF,fk[0],.12);prBone('pr_loF',J.elF,J.wrF,fk[0],fk[1],.12);
  X.save();X.translate(W[0],W[1]);X.rotate(ha);X.translate(-J.wrF[0],-J.wrF[1]);if(P.fI=='club')prP('pr_club');if(P.fI=='bottle')prBottle(J.grip[0]-4,J.grip[1]-40,-.05,1.25,P.cork);prP('pr_fist');X.restore();X.restore()};
 if(armBehind)frontArm();
 /* ---- 4) hlava ---- */
 X.save();headT();prHead(e,A,P,V);X.restore();
 /* píšťalka v zubech */if(P.bI=='whistleT'){const m=TM([592,300]);X.save();X.translate(m[0],m[1]);X.rotate(lean-.2);X.translate(-548,-472);prP('pr_whistle');X.restore();if(P.whB)prWaves(m[0]+40,m[1]-10)}
 if(!armBehind)frontArm();
 if(WH&&WH.front)prWhirlDraw(WH,TM(Wb));
 if(P.toShip)prShipRope(e,A,P,TM(Wb));
 prFx(e,A,P,V,TM)}
function prHead(e,A,P,V){const J=PRJ;
 if(P.cap)prAt(J.tailK,(A.tl||0)+Math.sin(T*.13)*.04,()=>prP('pr_tails'));
 prP('pr_head');
 const jw=prCl(V.jaw,0,1.3);X.save();X.translate(J.jawK[0],J.jawK[1]);X.rotate(jw*.08);X.translate(0,jw*24);X.translate(-J.jawK[0],-J.jawK[1]);prP('pr_jaw');X.restore();
 prEyes(A,P,V);
 const ang=V.bA-.35,sur=V.bS;X.save();X.translate(0,-sur*12+Math.max(0,ang)*4);prAt(J.browL,ang*.2-sur*.1,()=>prP('pr_browL'));prAt(J.browR,-ang*.22+sur*.1,()=>prP('pr_browR'));X.restore();
 if(P.cap){X.save();X.translate(V.cx,V.cy+(A.cb||0));prAt(J.capP,V.cr+(A.cb||0)*.004,()=>prP('pr_band'));X.restore()}
 if(P.bandHand){X.save();X.translate(0,-30);prAt(J.capP,-.3,()=>prP('pr_band'));X.restore()}
 if(P.glug){const g=Math.sin(T*.5);X.save();X.fillStyle='rgba(30,26,18,.5)';X.beginPath();X.ellipse(520,328+g*4,10,6,0,0,7);X.fill();X.restore()}}
function prEyes(A,P,V){const J=PRJ,[ex,ey,rx,ry]=J.eyeL,lid=prCl(V.lid+(A.blink>0&&P.eyes=='n'?1:0),0,1),skin='#c98a5e',OLc='#1e1a12';
 if(P.eyes=='x'||P.eyes=='spiral'){X.save();X.fillStyle='#f4f0e6';X.beginPath();X.ellipse(ex,ey,rx+1,ry+1,0,0,7);X.fill();X.strokeStyle=OLc;X.lineWidth=6;X.stroke();
  if(P.eyes=='x'){X.lineWidth=7;X.lineCap='round';X.beginPath();X.moveTo(ex-rx*.55,ey-ry*.6);X.lineTo(ex+rx*.55,ey+ry*.6);X.moveTo(ex+rx*.55,ey-ry*.6);X.lineTo(ex-rx*.55,ey+ry*.6);X.stroke()}
  else{X.lineWidth=3.6;X.beginPath();for(let a=0;a<14;a+=.35){const r=a/14*Math.min(rx,ry)*.95;X.lineTo(ex+Math.cos(a+T*.25)*r,ey+Math.sin(a+T*.25)*r)}X.stroke()}X.restore();return}
 if(P.eyes=='shut'){X.save();X.fillStyle=skin;X.beginPath();X.ellipse(ex,ey,rx+2,ry+2,0,0,7);X.fill();X.strokeStyle=OLc;X.lineWidth=6;X.lineCap='round';X.beginPath();X.moveTo(ex-rx,ey+3);X.quadraticCurveTo(ex,ey-ry*.9,ex+rx,ey+3);X.stroke();X.restore();return}
 if(lid>.02){X.save();X.beginPath();X.ellipse(ex,ey,rx+2,ry+2,0,0,7);X.clip();const y=ey-ry-3+(ry*2+6)*lid;X.fillStyle=skin;X.fillRect(ex-rx-4,ey-ry-6,rx*2+8,y-(ey-ry-6));X.strokeStyle=OLc;X.lineWidth=6;X.beginPath();X.moveTo(ex-rx-4,y);X.quadraticCurveTo(ex,y+ry*.25*(1-lid),ex+rx+4,y);X.stroke();X.restore()}
 if((V.red||0)>.45){X.save();X.globalAlpha*=Math.min(1,(V.red-.45)*1.8)*.65;X.fillStyle='#ff2a10';X.beginPath();X.arc(ex+3,ey-2,6.5,0,7);X.fill();X.restore()}}
function prWaves(x,y){X.save();X.strokeStyle='rgba(255,255,255,.85)';X.lineWidth=5;X.lineCap='round';for(let i=0;i<3;i++){const r=24+i*18+((T*2)%18);X.globalAlpha*=.85;X.beginPath();X.arc(x,y,r,-.6,.6);X.stroke()}X.restore()}
/* vířící lano s uzlem */
function prWhirl(P,V){const w=P.w||0;if(P.bI=='whirlUp')return{up:1,w,front:Math.sin(w)>0};return{w,x:520+Math.cos(w)*560,y:500+Math.sin(w)*100,front:Math.sin(w)>0}}
function prWhirlDraw(W,H){if(W.up){const cx=H[0],cy=H[1]-40,r=230,ax=cx+Math.cos(W.w)*r,ay=cy+Math.sin(W.w)*r*.3;X.save();X.strokeStyle='rgba(255,246,226,.22)';X.lineWidth=40;X.beginPath();X.ellipse(cx,cy,r,r*.3,0,0,7);X.stroke();X.restore();prRope(H[0],H[1],ax,ay,0,15);prKnot(ax,ay,24,W.w);return}
 X.save();X.strokeStyle='rgba(255,246,226,.2)';X.lineWidth=60;X.beginPath();X.ellipse(520,500,560,100,0,0,7);X.stroke();X.restore();prRope(H[0],H[1],W.x,W.y,0,15);prKnot(W.x,W.y,26,W.w)}
/* kyj zaseklý v prknech: špička zapuštěná pod podlahou, rukojeť k rukám */
const PRST={C:[800,1012]};
function prStuckClub(A,P,V,H){const C=PRST.C,a=Math.atan2(H[1]-C[1],H[0]-C[0])+Math.sin(T*.6)*.012*(P.tug||0),im=PRI.pr_club,d=PRA.p.pr_club;if(!im)return;
 X.save();X.beginPath();X.rect(C[0]-500,C[1]-800,1000,800-12);X.clip();
 /* kyj: osa od špičky (852,118) k rukojeti (740,400); špička v C */const ra=Math.atan2(400-118,740-852);X.translate(C[0],C[1]);X.rotate(a-ra);X.translate(-852,-118);X.drawImage(im,d.ox,d.oy,d.w,d.h);X.restore();
 X.save();X.fillStyle='rgba(40,26,14,.55)';X.beginPath();X.ellipse(C[0],C[1]-12,90,16,0,0,7);X.fill();X.fillStyle='#8a5a30';X.strokeStyle='#1e1a12';X.lineWidth=4;for(let i=0;i<4;i++){const x=C[0]-60+i*36,y=C[1]-16-(i%2)*6;X.beginPath();X.moveTo(x,y);X.lineTo(x+14,y-22-(i%3)*8);X.lineTo(x+22,y);X.closePath();X.fill();X.stroke()}X.restore()}
/* lano k lodi (houpání na loď a zpět) */
function prShipRope(e,A,P,H){const S=CAP&&CAP.ship;if(!S)return;const K=PR3.K*sc(LY)*.92,f=e.face||1,top=[S.x+6*.62,300];const rx=(top[0]-e.x)*f/K+PRJ.cx,ry=PRJ.gy-(top[1]-e.z)/K;prRope(H[0],H[1],rx,ry,0,14)}
/* efekty */
function prFx(e,A,P,V,TM){const J=PRJ;
 if(P.sweat){for(let i=0;i<2;i++){const ph=(T*.05+i*.5)%1,p=TM([470+i*150,170+ph*90]);X.fillStyle='rgba(200,230,255,'+(1-ph)+')';X.beginPath();X.ellipse(p[0],p[1],8,13,0,0,7);X.fill();X.strokeStyle='rgba(30,40,60,'+(1-ph)*.6+')';X.lineWidth=2.5;X.stroke()}}
 if((V.steam||0)>.05&&FXR){for(let i=0;i<3;i++){const ph=((T*.04+i/3)%1),p=TM([450-ph*40,220-ph*140]);X.fillStyle='rgba(240,240,245,'+(1-ph)*.5*Math.min(1,V.steam)+')';X.beginPath();X.arc(p[0],p[1],14+ph*30,0,7);X.fill()}}
 if(P.stars){const c=TM([540,60]);for(let i=0;i<4;i++){const a=T*.13+i*Math.PI/2,x=c[0]+Math.cos(a)*170,y=c[1]+Math.sin(a)*34,sz=(Math.sin(a)>0?1:.75)*4.4;X.save();X.translate(x,y);X.scale(sz,sz);X.rotate(T*.1+i);const St=new Path2D();for(let j=0;j<10;j++){const rr=j%2?3.4:8,aa=j*Math.PI/5-Math.PI/2;St.lineTo(Math.cos(aa)*rr,Math.sin(aa)*rr)}St.closePath();X.fillStyle='#ffe24a';X.fill(St);X.strokeStyle='#1e1a12';X.lineWidth=1.4;X.stroke(St);X.restore()}}
 /* částice ve světě (jednou za tik) */
 if(A.pT!==T&&e._fig!=1&&typeof par!='undefined'){A.pT=T;const K=PR3.K*sc(LY)*.92,f=e.face||1,W2=q=>[e.x+f*(q[0]+V.rx-J.cx)*K,e.z+(J.gy-(q[1]+V.ry))*K];
  for(const [key,F] of [['sF',V.FF],['sB',V.FB]]){const down=F[1]>=910;if(down&&A[key]===0&&P.walk){const w=W2(F);for(let i=0;i<(P.run?5:2);i++)par.push({x:w[0]+R(-8,8),y:LY,z:e.z+2,fz:-999,vx:R(-1.4,1.4),vz:R(.3,1.4),l:R(16,26),c:'rgba(170,160,140,.55)',s:R(3,6)});if(P.run)shake=Math.max(shake,2)}A[key]=down?1:0}
  if(P.throwB&&!A.thrB){A.thrB=1;const w=W2(TM(V.fH));for(let i=0;i<10;i++)par.push({x:w[0],y:LY,z:w[1],fz:-999,vx:-f*R(2,6),vz:R(2,7),l:R(30,50),c:i%2?'rgba(80,140,70,.9)':'rgba(220,240,220,.8)',s:R(2,4)});sfx('break',e.x)}if(!P.throwB)A.thrB=0}}
/* valí se v sudu (pohled na dno sudu: rotující obruč, uvnitř vzteklá hlava, pěsti na okraji) */
function prRoll(e,A,P,V){const J=PRJ,r=215,cx=J.cx,cy=J.gy-r,ri=r*.7;if(A.rlT!==A.T){A.rlA=(A.rlA||0)+(A.mv||0)/(r*PR3.K*sc(LY)*.92)*(A.dir||1);A.rlT=A.T}const a0=A.rlA||0;
 X.save();X.translate(cx,cy);X.rotate(a0);
 X.fillStyle='#1e1a12';X.beginPath();X.arc(0,0,r+10,0,7);X.fill();
 const g=X.createRadialGradient(-r*.3,-r*.3,r*.2,0,0,r);g.addColorStop(0,'#b07a44');g.addColorStop(1,'#6e4422');X.fillStyle=g;X.beginPath();X.arc(0,0,r,0,7);X.fill();
 X.strokeStyle='rgba(40,24,12,.8)';X.lineWidth=6;for(let i=0;i<16;i++){const an=i/16*Math.PI*2;X.beginPath();X.moveTo(Math.cos(an)*ri,Math.sin(an)*ri);X.lineTo(Math.cos(an)*r,Math.sin(an)*r);X.stroke()}
 X.strokeStyle='#1e1a12';X.lineWidth=26;X.beginPath();X.arc(0,0,r*.86,0,7);X.stroke();X.strokeStyle='#7a808a';X.lineWidth=16;X.stroke();X.strokeStyle='rgba(255,255,255,.35)';X.lineWidth=4;X.beginPath();X.arc(0,0,r*.86,3.6,4.6);X.stroke();
 X.fillStyle='#d8dce4';for(let i=0;i<8;i++){const an=i/8*Math.PI*2+.2;X.beginPath();X.arc(Math.cos(an)*r*.86,Math.sin(an)*r*.86,5,0,7);X.fill()}
 X.fillStyle='#1e1a12';X.beginPath();X.arc(0,0,ri+8,0,7);X.fill();X.fillStyle='#2a1a10';X.beginPath();X.arc(0,0,ri,0,7);X.fill();X.restore();
 /* hlava uvnitř */X.save();X.translate(cx,cy);X.beginPath();X.arc(0,0,ri,0,7);X.clip();X.rotate(Math.sin(a0)*.22);X.scale(.78,.78);X.translate(-J.neck[0]+10,-(J.neck[1]-150));
 if(!(e.lost&&e.lost.hat))prAt(J.tailK,Math.sin(T*.3)*.2,()=>prP('pr_tails'));prP('pr_head');X.save();X.translate(0,16);prP('pr_jaw');X.restore();prEyes(A,{eyes:'n'},Object.assign({},V,{lid:0}));X.save();X.translate(0,6);prAt(J.browL,.3,()=>prP('pr_browL'));prAt(J.browR,-.3,()=>prP('pr_browR'));X.restore();if(!(e.lost&&e.lost.hat))prP('pr_band');X.restore();
 /* pěsti svírají okraj */for(const an of [a0+.7,a0+.7+Math.PI]){X.save();X.translate(cx+Math.cos(an)*ri,cy+Math.sin(an)*ri);X.rotate(an+Math.PI/2);X.scale(.8,.8);X.translate(-762,-330);prP('pr_fist');X.restore()}
 if((A.mv||0)>2){X.save();X.globalAlpha*=.3;X.strokeStyle='#ffffff';X.lineWidth=14;X.lineCap='round';const d=(A.dir||1)>0;for(let i=0;i<4;i++){X.beginPath();X.arc(cx,cy,r+40+i*24,d?Math.PI*.95:-.4,d?Math.PI*1.4:.05);X.stroke()}X.restore()}}
/* ---------- napojení na hru ---------- */
BOSSDRAW.cap=function(e){if(!e._pr)e._pr={};PR3HS=e.hs>0&&e.st!='dead'?e.hs:0;try{return bDrawW(e,prDraw,'cap')}finally{PR3HS=0}};
/* hozené lano s uzlem (místo kotvy) */
cpAncDraw=function(){const a=CAP.anc;if(!a||!a.e)return;const e=a.e,K=PR3.K*sc(LY)*.92,f=e.face||1,h=e._bh||[e.x+f*60,e.z+120],hx=h[0]-cam,hy=LY-h[1],ax=a.x-cam,ay=LY-a.z;
 X.save();X.translate(hx,hy);X.scale(K,K);prRope(0,0,(ax-hx)/K,(ay-hy)/K,a.back?60:20,14);prKnot((ax-hx)/K,(ay-hy)/K,26,T*.3);X.restore()};
/* odhozený šátek */
cpHat=function(x,y,a,s){prBandDraw(x,y-6,a,PR3.K*sc(LY)*.92)};
/* pirát na palubě lodi (salva) */
cpDeckCapt=function(){const e=bossE;if(!e||e.bst!='onship'||!CAP.ship)return;const S=CAP.ship,P=CAP.deckQ4||(CAP.deckQ4={B:'cap',t:'x',x:0,z:0,gf:0,face:-1,st:'boss',bst:'deck',tm:60,t2:0,hs:0,dt:0,hp:1,mhp:1,gd:0,fl:0,lost:null,vul:0,vx:0,vz:0,ph:1,_pr:{}});
 P.x=cam;P.t2=T;P.bst='deck';const fr=S.fire.filter(f=>f.t>=0&&f.t<14).length;P._chop=CAP.mode=='salvo'?Math.min(1,fr/3):0;P.face=-1;P.lost=e.lost;
 X.save();X.translate(70,-84);X.scale(.66,.66);X.translate(0,-LY);prDraw(P);X.restore()};
/* pirát na sudu ve vodě (finále) */
cpBarrelCapt=function(x,y,t){const K=PR3.K*sc(LY)*.92*.85,J=PRJ;X.save();X.translate(x,y);X.lineJoin='round';X.lineCap='round';
 const Br=aRR(-22,-14,44,30,7);cel(Br,'#6a4426',1.4,1,'#3a2410','#a07040');hStroke(Br,1.8);X.strokeStyle='#2a1a0a';X.lineWidth=2;X.beginPath();X.moveTo(-22,-4);X.lineTo(22,-4);X.moveTo(-22,7);X.lineTo(22,7);X.stroke();
 X.save();X.translate(0,-10+Math.sin(t*.15)*2);X.rotate(Math.sin(t*.07)*.08);X.scale(-K,K);X.translate(-J.neck[0],-J.neck[1]-20);
 const fw=Math.sin(t*.4)*.35;X.save();X.translate(600,250);X.rotate(-.3+fw);X.translate(-J.wrF[0],-J.wrF[1]);prP('pr_club');prP('pr_fist');X.restore();
 prAt(J.tailK,Math.sin(t*.2)*.1,()=>prP('pr_tails'));prP('pr_head');X.save();X.translate(0,10+Math.abs(Math.sin(t*.3))*10);prP('pr_jaw');X.restore();prEyes({blink:0},{eyes:'n'},{lid:0,red:0});prP('pr_browL');prP('pr_browR');prP('pr_band');X.restore();
 X.fillStyle='rgba(220,235,255,.5)';for(let i=0;i<4;i++)X.fillRect(-32+i*16+Math.sin(t*.1+i)*3,12,12,1.6);X.restore()};
