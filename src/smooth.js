var CP3IPA=1;
/* =====================================================================
   v80: plynulé zpomalení – bossí zpomalené záběry (B1C.slow) už nepřeskakují
   snímky, ale zpomalí herní čas; pozice i kloubové postavy se mezi tiky
   interpolují (CP3IPA), takže zpomalení je hladké a vstupy se neztrácí
   ===================================================================== */
loop=function(t){const dt=Math.max(0,Math.min(50,t-last));try{musTick()}catch(err){}pollGP();tMerge();
 const bs=(typeof B1C!='undefined'&&B1C.slow<.999&&(state=='play'||state=='cut'))?Math.max(.15,B1C.slow):1;
 acc+=dt*(SLO>0?.32:1)*bs;if(SLO>0)SLO-=dt;last=t;DK=Math.max(.25,Math.min(3,dt/16.67));
 while(acc>16.7){const sp2=stop>0;ipSnap();if(typeof B1C!='undefined')B1C.acc=1;try{upd()}catch(err){console.error(err)}ipGait();acc-=16.7;if(!sp2){for(const k in P)delete P[k];for(const k in GAP)delete GAP[k]}}
 const a=Math.max(0,Math.min(1,acc/16.7));CP3IPA=a;ipApply(a);try{draw()}catch(err){console.error(err);try{X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over'}catch(e2){}}finally{ipRestore()}requestAnimationFrame(loop)};
