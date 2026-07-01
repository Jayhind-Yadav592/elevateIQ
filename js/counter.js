/* counter.js — animated counters for stats section */

document.addEventListener('DOMContentLoaded', ()=>{
  const counters = Array.from(document.querySelectorAll('.counter'));
  const speed = 1800;
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = +el.getAttribute('data-target') || 0;
        let start = 0; const step = Math.ceil(target/(speed/20));
        const timer = setInterval(()=>{
          start += step;
          if(start >= target){ el.textContent = target; clearInterval(timer);} else el.textContent = start;
        }, 20);
        obs.unobserve(el);
      }
    })
  }, {threshold:0.6});
  counters.forEach(c=>io.observe(c));
});
