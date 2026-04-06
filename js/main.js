/* ============================================
   ZELKOVA SAITAMA 3x3 - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Loader ---
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');

  if (loader && loaderBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('is-hidden');
        }, 300);
      }
      loaderBar.style.width = progress + '%';
    }, 200);
  }

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Mobile menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-open');
      document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll reveal animations ---
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Parallax effect on hero ---
  const hero = document.querySelector('.hero__bg');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // --- Counter animation for stat numbers ---
  const statNumbers = document.querySelectorAll('.stat-item__number');

  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const num = parseInt(text);

          if (!isNaN(num) && num > 100) {
            let current = 0;
            const increment = Math.ceil(num / 40);
            const timer = setInterval(() => {
              current += increment;
              if (current >= num) {
                current = num;
                clearInterval(timer);
              }
              el.textContent = current;
            }, 30);
          }

          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  // --- Player card tilt effect ---
  document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Contact form validation ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Basic validation
      let valid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#E53E3E';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (valid) {
        // Show success (in production, this would submit to a server)
        const btn = contactForm.querySelector('.form-submit');
        if (btn) {
          btn.textContent = 'SENT!';
          btn.style.background = '#2A7D41';
          setTimeout(() => {
            btn.textContent = 'SEND MESSAGE';
            btn.style.background = '';
            contactForm.reset();
          }, 3000);
        }
      }
    });
  }

  // --- Language toggle placeholder ---
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      // Placeholder for future i18n implementation
      const spans = langToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        const isJP = spans[0].style.color !== 'var(--gray)';
        spans[0].style.color = isJP ? 'var(--gray)' : '';
        spans[2].style.color = isJP ? '' : 'var(--gray)';
      }
    });
  }

});
