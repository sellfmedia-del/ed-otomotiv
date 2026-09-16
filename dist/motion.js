const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const header=document.querySelector('.header');
const hero=document.querySelector('.hero');
const photo=document.querySelector('.hero-photo');

function updateScroll(){
  header?.classList.toggle('scrolled',window.scrollY>28);
  if(!reducedMotion.matches&&window.innerWidth>600&&photo&&hero){
    const top=hero.getBoundingClientRect().top;
    if(top>-hero.offsetHeight&&top<window.innerHeight){
      photo.style.setProperty('--parallax',Math.max(-38,Math.min(38,-top*.055))+'px');
    }
  }
}
let ticking=false;
window.addEventListener('scroll',()=>{
  if(ticking)return;
  ticking=true;
  requestAnimationFrame(()=>{updateScroll();ticking=false});
},{passive:true});
updateScroll();

if(hero&&!reducedMotion.matches&&window.matchMedia('(pointer: fine)').matches){
  hero.addEventListener('pointermove',event=>{
    const bounds=hero.getBoundingClientRect();
    hero.style.setProperty('--mouse-x',((event.clientX-bounds.left)/bounds.width*100).toFixed(1)+'%');
    hero.style.setProperty('--mouse-y',((event.clientY-bounds.top)/bounds.height*100).toFixed(1)+'%');
  },{passive:true});
}

if('IntersectionObserver' in window&&!reducedMotion.matches){
  const targets=document.querySelectorAll('.section-head,.brands-top,.brand-rule,.services-list article,.ford-feature,.about-intro,.about-copy,.trust-numbers>div,.trust-details article,.steps article,.review-grid article,.location-layout,.final-cta .shell');
  targets.forEach(element=>element.classList.add('reveal'));
  document.body.classList.add('motion-on');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{rootMargin:'0px 0px -55px 0px',threshold:.08});
  targets.forEach(element=>observer.observe(element));
}
