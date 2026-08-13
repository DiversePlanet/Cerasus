/* =========================================================
   CERASUS — MOTION SYSTEM
   Cinematic Apple-inspired interface
   ========================================================= */


/* =========================================================
   CINEMATIC PAGE INTRO
   ========================================================= */

const intro = document.querySelector('#page-intro');

const prefersReduced =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


window.addEventListener('load', () => {

  if (!intro) return;


  /* Reduced motion */

  if (prefersReduced) {

    document.body.classList.add(
      'intro-finished'
    );

    return;

  }


  /*
     The page remains completely black
     for a short moment.
  */

  setTimeout(() => {

    document.body.classList.add(
      'intro-finished'
    );

  }, 900);

});


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((a) => {

  a.addEventListener('click', (e) => {

    const target =
      document.querySelector(
        a.getAttribute('href')
      );

    if (target) {

      e.preventDefault();

      target.scrollIntoView({
        behavior:'smooth',
        block:'start'
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
   HERO ENTRANCE
   ========================================================= */

window.addEventListener('load', () => {

  if (!heroCopy) return;


  if (prefersReduced) {

    heroCopy.classList.add('loaded');

    return;

  }


  /*
     Wait until the black intro has started
     disappearing, then activate the hero.
  */

  setTimeout(() => {

    heroCopy.classList.add('loaded');

  }, 750);

});


/* =========================================================
   HERO MOUSE DEPTH
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


  hero.addEventListener(
    'mousemove',
    (e) => {

      const rect =
        hero.getBoundingClientRect();

      mouseX =
        ((e.clientX - rect.left) /
          rect.width - .5) * 2;

      mouseY =
        ((e.clientY - rect.top) /
          rect.height - .5) * 2;

    }
  );


  function animateHeroDepth(){

    currentX +=
      (mouseX - currentX) * .035;

    currentY +=
      (mouseY - currentY) * .035;


    if (heroTitle) {

      /*
         Don't overwrite the entrance transform
         until the hero is visible.
      */

      if (
        document.body.classList.contains(
          'intro-finished'
        )
      ) {

        heroTitle.style.transform =
          `translate3d(
            ${currentX * 3}px,
            ${currentY * 2}px,
            0
          )`;

      }

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

function updateNavigation(){

  if (!topbar) return;

  topbar.classList.toggle(
    'scrolled',
    window.scrollY > 25
  );

}


window.addEventListener(
  'scroll',
  updateNavigation,
  {passive:true}
);

updateNavigation();


/* =========================================================
   SECTION REVEALS
   ========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting)
          return;


        entry.target.classList.add(
          'is-visible'
        );


        observer.unobserve(
          entry.target
        );

      });

    },
    {
      threshold:.14,
      rootMargin:'0px 0px -8% 0px'
    }
  );


document
  .querySelectorAll(
    '.reveal-section, .reveal-card'
  )
  .forEach((element) => {

    revealObserver.observe(
      element
    );

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
            (.5 - y) * 3;

          const rotateY =
            (x - .5) * 3;


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

          if (!entry.isIntersecting)
            return;


          const target =
            Number(
              counter.dataset.target || 1
            );


          const start =
            performance.now();

          const duration =
            1100;


          function tick(now){

            const progress =
              Math.min(
                (now - start) /
                duration,
                1
              );


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


            if (progress < 1){

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
        threshold:.7
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
        threshold:.15
      }
    );


  timelineObserver.observe(
    timelineSection
  );

}


/* =========================================================
   HERO ARC PARALLAX
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
          `${scrollY * .035}px`;

      }

    },
    {passive:true}
  );

}


/* =========================================================
   IMAGE LOAD
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
