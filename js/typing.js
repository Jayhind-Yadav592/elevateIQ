// /* typing.js — simple typing animation for hero */

// document.addEventListener('DOMContentLoaded', ()=>{
//   const el = document.getElementById('typing');
//   if(!el) return;
//   const phrases = ['Cybersecurity Services ', 'Cybersecurity Services ', 'Secure engineering', 'Technical Support ','Quality Assurance & Testing ','Cloud Solutions & DevOps ','Software Development ','IT Consulting & Strategy '];
//   let p = 0, i = 0, forward = true;
//   const typeSpeed = 60, pause=1200;

//   const tick = ()=>{
//     const current = phrases[p];
//     if(forward){
//       el.textContent = current.slice(0, i+1);
//       i++;
//       if(i === current.length){ forward = false; setTimeout(tick, pause); return; }
//     } else {
//       el.textContent = current.slice(0, i-1);
//       i--;
//       if(i===0){ forward=true; p=(p+1)%phrases.length; }
//     }
//     setTimeout(tick, forward ? typeSpeed : 40);
//   }
//   tick();
// });
