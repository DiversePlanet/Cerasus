/* =========================================================
   CERASUS — MOTION SYSTEM
   Apple-inspired cinematic entrance
   ========================================================= */


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((a) => {

  a.addEventListener('click', (e) => {

    const target =
      document.querySelector(a.getAttribute('href'));

    if (target) {

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  });

});


/* =========================================================
   ELEMENTS
   ========================================================= */

const heroCopy =
  document.querySelector('.hero-copy');

const topbar =
  document.querySelector('.topbar');

const hero =
  document.querySelector('.hero');

const heroTitle =
  document.querySelector('.cerasus-hero-title');

const heroTagline =
  document.querySelector('.hero-tagline');

const heroLead =
  document.querySelector('.hero .lead');

const heroActions =
  document.querySelector('.hero-actions');

const heroStatus =
  document.querySelector('.hero-status');


/* =========================================================
   REDUCED MOTION
   ========================================================= */

const prefersReduced =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


/* =========================================================
   CINEMATIC HERO ENTRANCE
   =========================================================
   
   Sequence:

   0.00s — page remains completely quiet
   0.60s — Cerasus begins appearing
   1.60s — Cerasus settles
   1.95s — tagline
   2.45s — description
   2.90s — buttons
   3.30s — status
   3.70s — interface fully alive

   This intentionally takes several seconds.
   ========================================================= */

window.addEventListener('load', () => {

  if (!heroCopy) return;


  /* Reduced motion */

  if (prefersReduced) {

    document.body.classList.remove(
      'page-loading'
    );

    heroCopy.classList.add('loaded');

    return;

  }


  /*
     Give the browser a moment to finish rendering.
     The page starts completely silent.
  */

  setTimeout(() => {

    document.body.classList.remove(
      'page-loading'
    );

    heroCopy.classList.add('loaded');

  }, 550);

});


/* =========================================================
   HERO MOUSE MOVEMENT
   Very subtle Apple-style depth.
   ========================================================= */

if (
  !prefersReduced &&
  hero &&
  window.innerWidth > 800
) {

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;


  hero.addEventListener('mousemove', (e) => {

    const rect =
      hero.getBoundingClientRect();

    mouseX =
      ((e.clientX - rect.left) /
        rect.width - 0.5) * 2;

    mouseY =
      ((e.clientY - rect.top) /
        rect.height - 0.5) * 2;

  });


  function animateHeroDepth() {

    currentX +=
      (mouseX - currentX) * 0.035;

    currentY +=
      (mouseY - currentY) * 0.035;


    if (heroTitle) {

      heroTitle.style.transform =
        `translate3d(
          ${currentX * 3}px,
          ${currentY * 2}px,
          0
        )`;

    }


    requestAnimationFrame(
      animateHeroDepth
    );

  }


  animateHeroDepth();

}


/* =========================================================
   NAVIGATION SCROLL STATE
   ========================================================= */

function updateNavigation() {

  if (!topbar) return;

  topbar.classList.toggle(
    'scrolled',
    window.scrollY > 25
  );

}

window.addEventListener(
  'scroll',
  updateNavigation,
  { passive: true }
);

updateNavigation();


/* =========================================================
   SECTION REVEAL SYSTEM
   ========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;


        entry.target.classList.add(
          'is-visible'
        );


        observer.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    }
  );


document
  .querySelectorAll(
    '.reveal-section, .reveal-card'
  )
  .forEach((element) => {

    revealObserver.observe(element);

  });


/* =========================================================
   CARD HOVER DEPTH
   ========================================================= */

if (
  !prefersReduced &&
  window.innerWidth > 800
) {

  document
    .querySelectorAll('.card')
    .forEach((card) => {

      card.addEventListener(
        'mousemove',
        (e) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (e.clientX - rect.left) /
            rect.width;

          const y =
            (e.clientY - rect.top) /
            rect.height;


          const rotateX =
            (0.5 - y) * 3;

          const rotateY =
            (x - 0.5) * 3;


          card.style.transform =
            `
            translateY(-8px)
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            `;

        }
      );


      card.addEventListener(
        'mouseleave',
        () => {

          card.style.transform = '';

        }
      );

    });

}


/* =========================================================
   COUNTER ANIMATION
   ========================================================= */

const counter =
  document.querySelector('.counter');


if (counter && !prefersReduced) {

  const counterObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;


          const target =
            Number(
              counter.dataset.target || 1
            );


          const start =
            performance.now();


          const duration =
            1100;


          function tick(now) {

            const progress =
              Math.min(
                (now - start) /
                duration,
                1
              );


            /*
               Apple-style ease-out.
            */

            const eased =
              1 -
              Math.pow(
                1 - progress,
                4
              );


            counter.textContent =
              Math.round(
                target * eased
              );


            if (progress < 1) {

              requestAnimationFrame(
                tick
              );

            }

          }


          requestAnimationFrame(
            tick
          );


          counterObserver.unobserve(
            counter
          );

        });

      },
      {
        threshold: 0.7
      }
    );


  counterObserver.observe(
    counter
  );

}


/* =========================================================
   TIMELINE
   ========================================================= */

const timelineSection =
  document.querySelector(
    '.timeline-section'
  );


if (timelineSection) {

  const timelineObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting)
            return;


          timelineSection.classList.add(
            'timeline-visible'
          );


          timelineObserver.unobserve(
            timelineSection
          );

        });

      },
      {
        threshold: 0.15
      }
    );


  timelineObserver.observe(
    timelineSection
  );

}


/* =========================================================
   SUBTLE SCROLL PARALLAX
   ========================================================= */

if (
  !prefersReduced &&
  window.innerWidth > 800
) {

  const heroArc =
    document.querySelector(
      '.hero-arc'
    );


  window.addEventListener(
    'scroll',
    () => {

      const scrollY =
        Math.min(
          window.scrollY,
          700
        );


      if (heroArc) {

        heroArc.style.marginTop =
          `${scrollY * 0.035}px`;

      }

    },
    { passive: true }
  );

}


/* =========================================================
   IMAGE LAZY REVEAL
   ========================================================= */

document
  .querySelectorAll('.card-art img')
  .forEach((image) => {

    image.addEventListener(
      'load',
      () => {

        image.classList.add(
          'image-loaded'
        );

      }
    );

  });


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
  'visibilitychange',
  () => {

    if (
      document.visibilityState ===
      'visible'
    ) {

      document.body.classList.add(
        'page-visible'
      );

    }

  }
);
