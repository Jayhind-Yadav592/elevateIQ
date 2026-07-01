/* script.js — Core site interactions and initialization */

// DOM helpers
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

// Loader: simple fade out when ready
window.addEventListener('load', ()=>{
  const loader = qs('#loader');
  if(loader){
    loader.style.opacity = '0';
    setTimeout(()=>loader.style.display='none', 600);
  }
  AOS.init({duration:700, once:true, offset:120});
  // add subtle entrance for elements not covered by AOS
  initScrollReveal();
});

// Scroll progress
window.addEventListener('scroll', ()=>{
  const doc = document.documentElement;
  const scrolled = (window.scrollY/(doc.scrollHeight - doc.clientHeight)) * 100;
  qs('#scroll-progress').style.width = scrolled + '%';

  // back to top visibility
  const b = qs('#backToTop');
  if(window.scrollY > 400) b.style.display = 'block'; else b.style.display = 'none';
});

// Smooth scrolling for anchor links
qsa('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  })
});

// Active nav on scroll
const navLinks = qsa('.navbar .nav-link');
const sections = navLinks.map(l=>document.querySelector(l.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', ()=>{
  const y = window.scrollY + 120;
  sections.forEach((sec, i)=>{
    if(sec.offsetTop <= y && (sec.offsetTop + sec.offsetHeight) > y){
      navLinks.forEach(n=>n.classList.remove('active'));
      navLinks[i].classList.add('active');
    }
  });
});

// Navbar background on scroll (glass appear)
const header = qs('#header');
const navObserver = () => {
  if(window.scrollY > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled');
};
window.addEventListener('scroll', navObserver);

// Back to top
qs('#backToTop')?.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

// Contact form basic handling (no backend) — validate and simulate submission
qs('#contactForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  // Basic validation
  if(!data.name || !data.email || !data.message){
    alert('Please fill required fields.');
    return;
  }
  // Simulate send
  const btn = form.querySelector('button[type=submit]');
  const original = btn.innerHTML;
  btn.disabled = true; btn.innerHTML = 'Sending...';
  setTimeout(()=>{
    btn.disabled=false; btn.innerHTML = original;
    form.reset();
    alert('Thanks! Your message has been received. We will contact you within 24 hours.');
  }, 1200);
});

// Floating icons animation (subtle)
const floatIcons = qsa('.floating-icons .icon');
floatIcons.forEach((ic, idx)=>{
  ic.style.transition = 'transform 600ms ease';
  setInterval(()=>{
    ic.style.transform = `translateY(${(idx%2? -6:6)}px)`;
    setTimeout(()=>ic.style.transform='translateY(0)', 600);
  }, 2200 + idx*180);
});

// lazy images: native loading=lazy used; additional progressive image handling can be added

// Set current year
const yEl = qs('#year'); if(yEl) yEl.textContent = new Date().getFullYear();

/* End of script.js */

/* ------- Additional UI helpers ------- */

// Intersection Observer based reveal animations (runs once)
function initScrollReveal(){
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('reveal-visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.12});
  qsa('[data-reveal]').forEach(el=>io.observe(el));
}

// Simple parallax movement for hero image based on mouse move
const hero = qs('#hero');
if(hero){
  hero.addEventListener('mousemove', e=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const img = qs('.hero-card img');
    const blob = qs('.hero-blob');
    if(img) img.style.transform = `translate(${x*12}px, ${y*10}px) scale(1.01)`;
    if(blob) blob.style.transform = `translate(${x*-18}px, ${y*-10}px) rotate(${x*6}deg)`;
  });
  hero.addEventListener('mouseleave', ()=>{
    const img = qs('.hero-card img');
    const blob = qs('.hero-blob');
    if(img) img.style.transform = '';
    if(blob) blob.style.transform = '';
  });
}

// Improve counter animation using IntersectionObserver
const counters = qsa('.counter');
if(counters.length){
  const cObs = new IntersectionObserver((entries, obs)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        const el = ent.target;
        const to = parseInt(el.dataset.target||el.textContent||0,10);
        let start = 0; const dur = 1400; const step = Math.ceil(to/(dur/16));
        const t = setInterval(()=>{
          start += step; if(start>=to){ el.textContent = to; clearInterval(t); } else el.textContent = start; }, 16);
        obs.unobserve(el);
      }
    });
  },{threshold:0.6});
  counters.forEach(c=>cObs.observe(c));
}

// Typing text fallback (if typing.js exists it will control); small enhancement
const typingEl = qs('#typing');
if(typingEl && !window.Typewriter){
  const phrases = ['Scalable Platforms','Secure Cloud','AI & Data Engineering','Product Design'];
  let i=0, j=0, dir=1;
  setInterval(()=>{
    typingEl.textContent = phrases[i].slice(0,j);
    j += dir;
    if(j>phrases[i].length){ dir=-1; setTimeout(()=>{},900); }
    if(j<=0){ dir=1; i=(i+1)%phrases.length; }
  },120);
}

/* end additions */