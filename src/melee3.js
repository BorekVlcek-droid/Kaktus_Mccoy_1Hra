/* ===== W31: ZBRANĚ TŘÍD – kapesní nůž, holé ruce, tesák, hůl (hra + animace) ===== */
const MEL=[
 {d:1.25,rg:64,rgh:80,pt:16,hv:22,up:24,hu:[.38,.55,.5],sw:'knife'},
 {d:1.15,rg:60,rgh:72,pt:14,hv:20,up:22,hu:[.4,.5,.5],sw:'swing'},
 {d:1.6,rg:72,rgh:86,pt:24,hv:30,up:26,hu:[.52,.58,.52],sw:'whoosh'},
 {d:1.3,rg:84,rgh:98,pt:20,hv:26,up:24,hu:[.45,.62,.5],sw:'swing'}];
Object.assign(SFX,{
 cane:{p:[['n',{d:.06,g:.55,ft:'bandpass',f:1300,q:2.2}],['t',{w:'triangle',f:460,f2:300,d:.08,g:.28}]],mi:60},
 chop:{p:[['n',{d:.12,g:.5,ft:'bandpass',f:2600,f2:800,q:1}],['n',{d:.16,g:.55,f:700,f2:120,dl:.01}]],rv:.2,mi:60},
 flick:{p:[['t',{w:'square',f:3300,d:.014,g:.05}],['t',{w:'square',f:2500,d:.02,g:.06,dl:.045}],['n',{d:.035,g:.1,ft:'highpass',f:5000,dl:.04}]],mi:120,vr:.05},
 scrape:{p:[['n',{d:.26,g:.11,ft:'bandpass',f:3200,f2:5600,q:3,a:.07}]],mi:150},
 crack:{p:[['n',{d:.018,g:.35,ft:'bandpass',f:2600,q:3}],['n',{d:.018,g:.28,ft:'bandpass',f:2000,q:3,dl:.055}]],mi:90},
 palm:{p:[['n',{d:.07,g:.6,f:1100,f2:250}],['t',{f:140,f2:60,d:.09,g:.25}]],mi:50}});
function meleeCfg(){const C=SV.cls;if(p.w&&!RG[p.w]){p.pt0=p.pt;p.ptH=12;sfx('swing');return}
 const M=MEL[C],bu=upv('blade'),base=p.up?M.up:p.hv?M.hv:M.pt,hu=M.hu[p.up?2:p.hv?1:0];
 p.pt=Math.max(base-4,base-bu*2);p.pt0=p.pt;p.ptH=Math.max(1,Math.round(p.pt*(1-hu)));sfx(p.hv&&C==2?'whoosh':M.sw)}
function meleeHitSnd(wpm){const C=SV.cls,big=p.hv||p.up;if(wpm){sfx(big?'heavy':'punch');return}
 if(C==0){sfx('blade');if(big)sfx('heavy')}else if(C==1)sfx(big?'palm':'punch');else if(C==2){sfx('chop');if(p.hv)sfx('heavy')}else{sfx('cane');if(big)sfx('heavy')}}
{const _hc=hitCheck;hitCheck=function(){_hc();try{const C=SV.cls;if(p.w&&!RG[p.w])return;const fx=p.x+p.face*46;
 if(C==2&&p.hv){shake=Math.max(shake,12);spawnP(fx,p.y,12,lv.du||'#b8a080',3,14,p.z);if(typeof ring=='function')ring(fx,p.y,30,'rgba(255,236,200,.55)',12,p.z+2);sfx('heavy')}
 else if(C==1&&p.hv){if(typeof ring=='function')ring(p.x+p.face*34,p.y,22,'rgba(220,235,255,.6)',10,p.z+60)}
 else if(C==3&&p.hv){burst(p.x+p.face*70,p.y,p.z+58,'#fff6c8')}}catch(e){}}}
/* ---------- klíčové pózy útoků (rámec trupu; ruka přední h1, zadní h0, úhel zbraně wa) ---------- */
const HK_=(u,h1,h0,wa,ln,bb,st,tw,e,fk)=>({u,h1,h0,wa:wa||0,ln:ln||0,bb:bb||0,st:st||0,tw:tw||0,e:e||'s',fk:fk||null});
const HRDY=[{h1:[11,-12],h0:[2,-18],wa:-.35,ln:.04,bb:2,st:1},{h1:[13,-27],h0:[7,-25],wa:0,ln:.1,bb:3.5,st:2},{h1:[8,-27],h0:[-1,-8],wa:-2.55,ln:-.02,bb:1,st:0},{h1:[15,-17],h0:[-6,-5],wa:-.12,ln:-.05,bb:1.5,st:2}];
const hR=(C,u,dw,e)=>{const R=HRDY[C];return HK_(u,R.h1,R.h0,R.wa+(dw||0),R.ln,R.bb,R.st,0,e||'s')};
const HP2=Math.PI*2;
const HMK=[
 {a:[hR(0,0),HK_(.2,[3,-18],[6,-21],-.15,-.06,3,-1,-.04,'o'),HK_(.38,[27,-21],[-3,-13],-.05,.18,4,7,.06,'i'),HK_(.6,[25,-20],[-2,-14],0,.15,4,7,.05,'o'),hR(0,1)],
  b:[hR(0,0),HK_(.2,[0,-31],[8,-19],-2.6,-.08,2,0,-.05,'o'),HK_(.38,[24,-18],[-4,-15],.35,.14,4,5,.06,'i'),HK_(.56,[18,-8],[-4,-15],1.05,.12,4,5,.04,'o'),hR(0,1)],
  h:[hR(0,0),HK_(.12,[10,-20],[3,-18],-.3,0,2,0,0,'s'),HK_(.4,[8,-25],[2,-20],-.3-2*HP2,-.06,5,-2,-.05,'s'),HK_(.55,[31,-22],[-12,-21],-.05-2*HP2,.3,6,12,.09,'i'),HK_(.78,[28,-21],[-11,-20],-2*HP2,.26,6,12,.08,'o'),hR(0,1,-2*HP2)],
  u:[hR(0,0),HK_(.28,[14,-4],[2,-16],.9,.14,8,2,.04,'o'),HK_(.5,[12,-50],[-2,-14],-1.6,-.12,-3,4,-.03,'i'),HK_(.7,[9,-52],[-1,-15],-1.9,-.1,-2,4,-.02,'o'),hR(0,1,-HP2)],
  k:[HK_(0,[8,-20],[0,-20],-.4),HK_(.22,[2,-34],[6,-18],-2.4,-.05,0,0,-.04,'o'),HK_(.42,[24,-14],[-6,-20],.7,.15,0,0,.06,'i'),HK_(.65,[16,-4],[-6,-20],1.3,.12,0,0,.04,'o'),HK_(1,[10,-18],[0,-20],-.3,0,0,0,0,'s')]},
 {a:[hR(1,0),HK_(.18,[9,-26],[7,-26],0,.05,3.5,1,0,'o'),HK_(.4,[31,-26],[5,-27],0,.17,4,6,.07,'i'),HK_(.62,[28,-26],[5,-27],0,.15,4,6,.06,'o'),hR(1,1)],
  b:[hR(1,0),HK_(.18,[11,-27],[3,-25],0,.02,3.5,1,-.03,'o'),HK_(.4,[6,-27],[29,-25],0,.2,4,5,-.07,'i'),HK_(.62,[6,-27],[26,-25],0,.17,4,5,-.06,'o'),hR(1,1)],
  h:[hR(1,0),HK_(.25,[7,-29],[3,-27],0,0,7,0,0,'o'),HK_(.5,[31,-24],[28,-31],0,.2,-7,6,.05,'i',[9,-15]),HK_(.72,[28,-24],[26,-30],0,.18,-5,6,.05,'o',[9,-12]),hR(1,1)],
  u:[hR(1,0),HK_(.28,[14,-12],[6,-26],0,.16,8,2,.04,'o'),HK_(.5,[13,-58],[4,-24],0,-.1,-6,4,-.03,'i',[6,-8]),HK_(.7,[11,-56],[4,-24],0,-.08,-4,4,-.02,'o',[6,-5]),hR(1,1)],
  k:[HK_(0,[12,-26],[6,-24],0,0,0,0,0,'s',[7,-12]),HK_(.22,[6,-28],[2,-26],0,-.05,0,0,0,'o',[4,-20]),HK_(.42,[10,-30],[-4,-22],0,-.16,0,0,0,'i',[31,-25]),HK_(.7,[10,-30],[-4,-22],0,-.13,0,0,0,'o',[27,-23]),HK_(1,[12,-26],[6,-24],0,0,0,0,0,'s',[8,-12])]},
 {a:[hR(2,0),HK_(.3,[0,-43],[4,-21],-2.3,-.1,2,-1,-.05,'o'),HK_(.52,[26,-12],[-6,-14],.75,.24,6,8,.07,'i'),HK_(.68,[21,-3],[-6,-14],1.25,.22,6.5,8,.06,'o'),hR(2,1)],
  b:[hR(2,0),HK_(.3,[-6,-22],[6,-18],-3.3,-.06,2,0,-.07,'o'),HK_(.52,[27,-24],[-6,-16],-.05,.18,3,6,.07,'i'),HK_(.68,[21,-30],[-5,-16],-.65,.14,3,6,.05,'o'),hR(2,1)],
  h:[hR(2,0),HK_(.35,[0,-50],[-2,-48],-2.0,-.14,-1,0,-.04,'o'),HK_(.58,[28,-4],[24,-6],1.05,.3,10,10,.08,'i'),HK_(.8,[27,-4],[23,-6],1.1,.28,10,10,.08,'o'),hR(2,1)],
  u:[hR(2,0),HK_(.3,[16,-2],[2,-12],1.2,.14,8,2,.04,'o'),HK_(.52,[12,-52],[0,-18],-1.5,-.12,-3,4,-.03,'i'),HK_(.7,[9,-54],[0,-18],-1.85,-.1,-2,4,-.02,'o'),hR(2,1)],
  k:[HK_(0,[6,-30],[-2,-12],-2.4),HK_(.22,[0,-44],[2,-20],-2.2,-.08,0,0,0,'o'),HK_(.42,[26,-10],[-6,-16],.8,.16,0,0,.06,'i'),HK_(.68,[20,-2],[-6,-16],1.3,.14,0,0,.04,'o'),HK_(1,[8,-27],[-1,-10],-2.5,0,0,0,0,'s')]},
 {a:[hR(3,0),HK_(.25,[8,-20],[-9,-27],-.1,-.05,3,-2,-.03,'o'),HK_(.45,[31,-22],[-15,-29],-.03,.22,7,13,.05,'i'),HK_(.7,[29,-22],[-14,-29],-.03,.2,7,13,.05,'o'),hR(3,1)],
  b:[hR(3,0),HK_(.25,[2,-34],[-6,-6],-2.2,-.08,2,0,-.05,'o'),HK_(.45,[24,-18],[-6,-6],.5,.14,4,5,.06,'i'),HK_(.6,[18,-10],[-6,-6],1.0,.12,4,5,.05,'o'),hR(3,1)],
  h:[hR(3,0),HK_(.15,[14,-22],[-6,-6],-.15,0,2,1,0,'s'),HK_(.45,[14,-24],[-8,-20],-.15-2*HP2,-.04,3,0,-.02,'s'),HK_(.62,[32,-24],[-15,-30],-.04-2*HP2,.27,8,14,.06,'i'),HK_(.82,[30,-24],[-14,-30],-.04-2*HP2,.24,8,14,.05,'o'),hR(3,1,-2*HP2)],
  u:[hR(3,0),HK_(.3,[16,-6],[-6,-6],1.2,.12,6,2,.03,'o'),HK_(.5,[12,-50],[-6,-8],-1.7,-.1,-2,4,-.03,'i'),HK_(.7,[9,-52],[-6,-8],-2.0,-.08,-1,4,-.02,'o'),hR(3,1,-HP2)],
  k:[HK_(0,[10,-24],[-6,-12],-.5),HK_(.22,[2,-36],[-4,-16],-2.3,-.05,0,0,-.04,'o'),HK_(.42,[24,-14],[-6,-16],.6,.15,0,0,.06,'i'),HK_(.68,[18,-6],[-6,-16],1.1,.12,0,0,.04,'o'),HK_(1,[12,-20],[-6,-12],-.3,0,0,0,0,'s')]}];
const HWLEN=[12.5,2,22.5,34],HWOFF=[0,0,-1.1,.15];
function hMelS(K,u){let i=0;while(i<K.length-2&&u>K[i+1].u)i++;const a=K[i],b=K[i+1];let t=hCl((u-a.u)/((b.u-a.u)||1),0,1);const e=b.e;t=e=='i'?t*t*t:e=='o'?1-Math.pow(1-t,3):e=='l'?t:t*t*(3-2*t);
 const L=(x,y)=>x+(y-x)*t,L2=(x,y)=>[L(x[0],y[0]),L(x[1],y[1])],fa=a.fk||[5.5+a.st,0],fb=b.fk||[5.5+b.st,0];
 return{h1:L2(a.h1,b.h1),h0:L2(a.h0,b.h0),wa:L(a.wa,b.wa),ln:L(a.ln,b.ln),bb:L(a.bb,b.bb),st:L(a.st,b.st),tw:L(a.tw,b.tw),fk:L2(fa,fb),raised:!!(a.fk||b.fk)}}
/* stav útoku pro rig: póza, zbraň v ruce, úhel zbraně */
function hMel(q,s,C,pun,wpm,gun,air,tp,mode){
 const kind=q.ak>0&&!pun?'k':pun&&!wpm&&!(q.td>0)?(q.up?'u':q.hv?'h':q.arm?'b':'a'):null;
 const busy=!!(gun||wpm||q.th>0||q.sb>0||(q==p&&carry)||q.climb||q.hang||q.tied||q.dead||q.pk>0||q.cu>0||(q==p&&p.zip));
 if(s.mwt==null){s.mwt=999;s.kf=0}
 const n=Math.max(1,s.n||1);if((kind||q.td>0)&&!busy)s.mwt=0;else s.mwt+=n;
 const R={pose:null,mode,on:false,WA:null,inHand:false,hand:1,kind};
 if(kind&&!busy){const K=HMK[C][kind];const u=hCl(kind=='k'?1-q.ak/20:1-q.pt/(q.pt0||(q.up?24:20)),0,1),S=hMelS(K,u);R.u=u;R.S=S;R.on=true;R.WA=S.wa;R.hand=C==1&&kind=='b'?0:1;
  const px=air?0:Math.max(0,S.st)*.42,FE=air?[[-5,-9],S.raised?S.fk:[6,-11]]:[[-5.5-Math.max(0,S.st)*.22,0],S.fk];R.pose={AB:[-1,-1],FE,FA:[0,S.raised?.3:0],H1:S.h1,H0:S.h0,BOB:air?0:S.bb,LEAN:S.ln*1.2,TW:S.tw,PX:px};R.mode='atk'+kind;
  R.hitU=kind=='k'?.42:(MEL[C].hu[kind=='u'?2:kind=='h'?1:0])}
 else if(!busy&&s.mwt<78&&mode.startsWith('idle')&&!(q.td>0)){const Rd=HRDY[C],w=1-hEase(hWin(s.mwt,52,78)),rp={AB:[-1,-1],FE:[[-5.5,0],[5.5+Rd.st,0]],FA:[0,0],H1:Rd.h1,H0:Rd.h0,BOB:Rd.bb,LEAN:Rd.ln};const m=hMixPose(tp,rp,w);m.TW=0;m.PX=(tp.PX||0)*(1-w);R.pose=m;if(w>.02)R.WA=Rd.wa}
 R.inHand=C!=1&&!busy&&(R.on||s.mwt<80||(C==3&&q.td>0));
 if(C==0){const tg=R.inHand?1:0;if(tg&&s.kf<.05&&q===p)sfx('flick');s.kf+=(tg-s.kf)*Math.min(1,.4*n);if(s.kf<.03)s.kf=0}
 return R}
/* ---------- kreslení zbraní ---------- */
function hWpn(C,x,y,a,kf){X.save();X.translate(x,y);X.rotate(a);X.lineJoin='round';
 if(C==0){X.scale(1.25,1.25);const H=aRR(-3.2,-1.4,7.4,2.8,1.2);cel(H,'#7a4a24',.6,.4,'#4a2a10','#b07a4a');hStroke(H,.5);X.fillStyle='#c8ccd2';X.fillRect(-2.8,-.6,1.1,1.2);X.fillRect(2.9,-.7,1.1,1.4);
  X.save();X.translate(4,0);X.rotate((1-kf)*2.9);const B=new Path2D();B.moveTo(0,-1.05);B.lineTo(7,-1);B.quadraticCurveTo(9.6,-.7,10.2,.55);B.lineTo(6,1.15);B.lineTo(0,1.05);B.closePath();cel(B,'#e2e6ea',.7,.5,'#8a9098','#ffffff');hStroke(B,.5);X.strokeStyle='rgba(255,255,255,.9)';X.lineWidth=.35;X.beginPath();X.moveTo(1,-.45);X.lineTo(7.6,-.45);X.stroke();X.restore()}
 else if(C==2){const H=aRR(-4.4,-1.6,7.4,3.2,1.1);cel(H,'#3a2416',.6,.4,'#20120a','#6a4a30');hStroke(H,.55);X.fillStyle='#d9b25a';[-2.6,.2].forEach(x=>{X.beginPath();X.arc(x,0,.5,0,7);X.fill()});
  const G=aRR(2.6,-3,1.4,6,.5);cel(G,'#b08a3a',.5,.4,'#6a4a1a','#ffe6a0');hStroke(G,.5);
  const B=new Path2D();B.moveTo(4,-1.9);B.lineTo(16.5,-2.5);B.quadraticCurveTo(21.5,-2.7,22.6,-.5);B.lineTo(19.6,1.7);B.quadraticCurveTo(12,3,4,2.1);B.closePath();cel(B,'#cfd5dc',.9,.6,'#7a828c','#ffffff');
  X.save();X.clip(B);X.fillStyle='rgba(60,66,76,.35)';X.fillRect(4,-2.8,19,1.2);X.strokeStyle='rgba(255,255,255,.8)';X.lineWidth=.4;X.beginPath();X.moveTo(5,1.3);X.quadraticCurveTo(13,2,19.4,1.2);X.stroke();X.restore();hStroke(B,.6)}
 else if(C==3){X.lineCap='round';X.strokeStyle='#1e181c';X.lineWidth=2.4;X.beginPath();X.moveTo(-3.5,0);X.lineTo(34,0);X.stroke();X.strokeStyle='rgba(255,255,255,.3)';X.lineWidth=.7;X.beginPath();X.moveTo(0,-.6);X.lineTo(32,-.6);X.stroke();X.fillStyle='#c8ccd2';X.fillRect(32,-1.3,3,2.6);const Kb=aEll(-4.4,0,2.6,2.4);cel(Kb,'#d9b25a',.8,.6,'#8a6a2a','#fff0b0')}
 X.restore()}
function hSheath(full){X.save();X.translate(-7.4,-2.4);X.rotate(1.95);const S=new Path2D();S.moveTo(-.5,-2.4);S.lineTo(19,-2);S.quadraticCurveTo(22,-1.6,22.4,.3);S.lineTo(19.5,2.4);S.lineTo(-.5,2.6);S.closePath();cel(S,'#6a4224',.8,.6,'#3a2210','#a07048');X.save();X.clip(S);X.strokeStyle='rgba(240,220,170,.55)';X.lineWidth=.35;X.setLineDash([.8,.8]);X.beginPath();X.moveTo(0,1.6);X.lineTo(19,1.4);X.stroke();X.setLineDash([]);X.restore();hStroke(S,.6);
 X.fillStyle='#3a2416';X.fillRect(3,-2.7,1.6,5.4);X.fillRect(10,-2.6,1.6,5.2);
 if(full){X.save();X.rotate(Math.PI);X.translate(.6,0);const H=aRR(-.2,-1.6,7.4,3.2,1.1);cel(H,'#3a2416',.6,.4,'#20120a','#6a4a30');hStroke(H,.55);X.restore();const G=aRR(-1.6,-3,1.4,6,.5);cel(G,'#b08a3a',.5,.4,'#6a4a1a','#ffe6a0');hStroke(G,.5)}
 X.restore()}
