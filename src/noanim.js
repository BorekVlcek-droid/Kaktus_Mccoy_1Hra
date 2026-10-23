/* ===== v67: ve hře nejsou zvířata (bossové zůstávají) ===== */
const NOAN=new Set(['bat','bird','canary','cat','circ','crab','dog','dolphin','fish','fly','frog','gator','gnats','hen','heron','horse','lizard','monkey','pdog','rat']);
{const _ls=lfSpawn;lfSpawn=function(k,x,z,o){if(NOAN.has(k))return null;return _ls(k,x,z,o)}}
{const _ev=evRun;evRun=function(k){if(k=='ffish'||k=='flock'||k=='howl'||k=='bird')return;return _ev(k)}}
{const NOS=new Set(['gull','frog','cricket','bird','hawk','howl','neigh']);const _s=sfx;sfx=function(n,x){if(NOS.has(n))return;return _s(n,x)}}
try{CS2.gull=function(){}}catch(e){}
/* přisluhovači bossů: místo zvířat lidé nebo valící se nebezpečí */
SUMA.cap=()=>Math.random()<.5?'barrels':'crew';SUMA.adm=()=>'crew';SUMA.gol=()=>'boulders';SUMA.scp=()=>'boulders';SUMA.jef=()=>Math.random()<.5?'call':'rain';
{const _sm=sendMin;sendMin=function(e,t,n){if(AN[t])return _sm(e,Math.random()<.5?'g':'x',Math.min(n,2));return _sm(e,t,n)}}
/* běžní nepřátelé-zvířata pryč, ambientní tvorové pryč */
{const _st=start;start=function(i,arr){const r=_st(i,arr);try{ens=ens.filter(e=>!AN[e.t]||e.B||isB(e));LIFE=LIFE.filter(a=>!NOAN.has(a.k));WEV=WEV.filter(v=>v.k!='flock'&&v.k!='ffish')}catch(err){console.error('noan',err)}return r}}
/* menu: bez koně a světlušek */
mHorse=function(){};mFireflies=function(){};
