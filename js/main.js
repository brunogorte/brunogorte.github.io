/* =========================================================
   LUMIÈRE SEMIJOIAS — JAVASCRIPT PRINCIPAL
   main.js: Loader, Cursor, Header, Scroll, Mobile Menu
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        // Disparar animações do hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) heroContent.classList.add('loaded');
      }, 1200);
    });
    document.body.classList.add('no-scroll');
  }

  // ---- CURSOR PERSONALIZADO ----
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Follower suave
    function animateCursor() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top  = followerY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover em links/botões → cursor maior
    const interactives = document.querySelectorAll('a, button, .product-card, .cat-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
        cursor.style.background = 'rgba(201,169,110,0.4)';
        cursorFollower.style.transform = 'translate(-50%,-50%) scale(0.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursor.style.background = 'var(--gold)';
        cursorFollower.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }

  // ---- HEADER SCROLL ----
  const header = document.getElementById('header');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Fundo ao scrollar
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Ocultar/mostrar ao scrollar (auto-hide)
      if (scrollY > lastScrollY && scrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    lastScrollY = scrollY;

    // Barra de progresso
    updateScrollProgress();

    // Botão voltar ao topo
    updateBackToTop();
  });

  function updateScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
  }

  // ---- BARRA DE PROGRESSO (criar dinamicamente) ----
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  // ---- BOTÃO VOLTAR AO TOPO ----
  const backToTopBtn = document.getElementById('back-to-top');
  function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- SEARCH TOGGLE ----
  const searchToggle = document.getElementById('search-toggle');
  const searchBar    = document.getElementById('search-bar');
  const searchClose  = document.getElementById('search-close');
  const searchInput  = document.getElementById('search-input');

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) searchInput?.focus();
    });
    searchClose?.addEventListener('click', () => searchBar.classList.remove('open'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchBar.classList.remove('open');
    });
  }

  // ---- MOBILE MENU ----
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });
  }

  // ---- SCROLL REVEAL ----
  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-fade, .stagger'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- CONTADOR ANIMADO ----
  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('pt-BR') + '+';
    }, 16);
  }

  // ---- NEWSLETTER FORM ----
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        showToast('🎉 Desconto enviado para ' + email + '!');
        newsletterForm.reset();
      }
    });
  }

  // ---- TOAST ----
  window.showToast = function(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  };

  // ---- SMOOTH ANCHOR SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- LAZY IMAGE PLACEHOLDER ----
  // Simula imagens com gradientes coloridos nas cards de produto
  document.querySelectorAll('.product-img').forEach(img => {
    if (!img.src || img.src.includes('undefined')) {
      img.style.display = 'none';
    }
  });

});
