const pages=[...document.querySelectorAll('.page')];
function route(){const hash=location.hash.slice(1)||'home';const id=hash==='story'?'home':hash;const page=pages.find(p=>p.id===id);if(!page){location.hash='home';return}pages.forEach(p=>p.hidden=p!==page);document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});document.title=id==='home'?'Saif Sayed | Marketing Analytics':({resume:'Resume / CV',portfolio:'Marketing Portfolio',reading:'My Reading List',essays:'Essays'}[id]+' | Saif Sayed');requestAnimationFrame(()=>{if(hash==='story')document.getElementById('story').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});else window.scrollTo({top:0,behavior:'instant'})})}
window.addEventListener('hashchange',route);document.querySelectorAll('a[href="#home"]').forEach(a=>a.addEventListener('click',()=>{if(location.hash==='#home')window.scrollTo({top:0,behavior:'smooth'})}));route();

// Roll each digit upward, then settle left to right over 1.5 seconds.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const activeReels=new Set();
function metricText(el){const value=el.dataset.count;return (el.dataset.prefix||'')+(/^\d+$/.test(value)?Number(value).toLocaleString('en-US'):value)+(el.dataset.suffix||'')}
function countMetric(el){
 const finalText=metricText(el);
 if(motionPreference.matches||!Element.prototype.animate){el.textContent=finalText;return}
 const digitCount=(finalText.match(/\d/g)||[]).length;
 let digitIndex=0;
 el.replaceChildren();
 for(const character of finalText){
  if(!/\d/.test(character)){el.append(document.createTextNode(character));continue}
  const digit=document.createElement('span');digit.className='digit-window';
  const reel=document.createElement('span');reel.className='digit-reel';
  const steps=20+Number(character);
  for(let step=0;step<=steps;step++){const cell=document.createElement('span');cell.className='digit-cell';cell.textContent=String(step%10);reel.append(cell)}
  digit.append(reel);el.append(digit);
  const duration=digitCount>1?1000+digitIndex*500/(digitCount-1):1500;
  digitIndex++;
  const animation=reel.animate([{transform:'translateY(0)'},{transform:`translateY(-${steps}em)`}],{duration,easing:'cubic-bezier(.16,.55,.3,1)',fill:'forwards'});
  activeReels.add(animation);
  animation.finished.then(()=>{digit.textContent=character;activeReels.delete(animation);animation.cancel()}).catch(()=>activeReels.delete(animation));
 }
}
motionPreference.addEventListener('change',()=>{if(motionPreference.matches)activeReels.forEach(animation=>animation.finish())});
if('IntersectionObserver' in window){const metricObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){metricObserver.unobserve(entry.target);countMetric(entry.target)}}},{threshold:.65});document.querySelectorAll('[data-count]').forEach(el=>metricObserver.observe(el))}
