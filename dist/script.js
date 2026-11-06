const pages=[...document.querySelectorAll('.page')];
function route(){const hash=location.hash.slice(1)||'home';const id=hash==='story'?'home':hash;const page=pages.find(p=>p.id===id);if(!page){location.hash='home';return}pages.forEach(p=>p.hidden=p!==page);document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});document.title=id==='home'?'Saif Sayed | Marketing Analytics':({resume:'Resume / CV',portfolio:'Marketing Portfolio',reading:'My Reading List',essays:'Essays'}[id]+' | Saif Sayed');requestAnimationFrame(()=>{if(hash==='story')document.getElementById('story').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});else window.scrollTo({top:0,behavior:'instant'})})}
window.addEventListener('hashchange',route);document.querySelectorAll('a[href="#home"]').forEach(a=>a.addEventListener('click',()=>{if(location.hash==='#home')window.scrollTo({top:0,behavior:'smooth'})}));route();

// Animate verified portfolio metrics once, when each result comes into view.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
function metricText(el,value){return (el.dataset.prefix||'')+value.toLocaleString('en-US')+(el.dataset.suffix||'')}
function countMetric(el){
 const target=Number(el.dataset.count);
 if(motionPreference.matches){el.textContent=metricText(el,target);return}
 const start=performance.now(),duration=750;
 function frame(now){const progress=Math.min((now-start)/duration,1);el.textContent=metricText(el,motionPreference.matches?target:Math.round(target*(1-Math.pow(1-progress,3))));if(progress<1&&!motionPreference.matches)requestAnimationFrame(frame)}
 el.textContent=metricText(el,0);requestAnimationFrame(frame)
}
if('IntersectionObserver' in window){const metricObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){metricObserver.unobserve(entry.target);countMetric(entry.target)}}},{threshold:.65});document.querySelectorAll('[data-count]').forEach(el=>metricObserver.observe(el))}
