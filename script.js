document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});


// =========================================================
// CERASUS MOTION SYSTEM — V3
// =========================================================

const heroCopy = document.querySelector('.hero-copy');
const topbar = document.querySelector('.topbar');

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.remove('page-loading');
    heroCopy?.classList.add('loaded');
  }, 120);
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal-section, .reveal-card').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  topbar?.classList.toggle('scrolled', window.scrollY > 25);
}, { passive: true });

// Very subtle hero parallax — disabled on small screens and reduced-motion.
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const orb = document.querySelector('.orb');

if (!prefersReduced && orb && window.innerWidth > 800) {
  window.addEventListener('scroll', () => {
    const y = Math.min(window.scrollY, 700);
    orb.style.marginTop = `${y * 0.08}px`;
  }, { passive: true });
}

// Counter animation when the stats row enters view.
const counter = document.querySelector('.counter');
if (counter && !prefersReduced) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const target = Number(counter.dataset.target || 1);
      const start = performance.now();
      const duration = 850;

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(counter);
    });
  }, { threshold: .7 });

  counterObserver.observe(counter);
}
