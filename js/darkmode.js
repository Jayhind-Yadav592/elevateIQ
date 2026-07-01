/* darkmode.js — lightweight dark / light toggle using CSS variables */

(function(){
  const KEY = 'technova-theme';
  const btn = document.getElementById('dark-toggle');
  const root = document.documentElement;

  const setTheme = (isDark)=>{
    if(isDark){
      root.style.setProperty('--bg','#071025');
      root.style.setProperty('--text','#e6eef8');
      root.style.setProperty('--card','#071025');
      btn.textContent = 'Light';
      btn.setAttribute('aria-pressed','true');
    } else {
      root.style.removeProperty('--bg');
      root.style.removeProperty('--text');
      root.style.removeProperty('--card');
      btn.textContent = 'Dark';
      btn.setAttribute('aria-pressed','false');
    }
    localStorage.setItem(KEY, isDark ? 'dark' : 'light');
  }

  // init
  const pref = localStorage.getItem(KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(pref === 'dark');

  btn?.addEventListener('click', ()=>{
    const isDark = btn.getAttribute('aria-pressed') === 'true';
    setTheme(!isDark);
  });
})();
