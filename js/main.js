/* BMW.nl Clone - Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== NAVIGATION SCROLL ==========
  const nav = document.querySelector('.nav-wrapper');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    });
    // Initial check
    if (window.scrollY > 50) nav.classList.add('scrolled');
  }

  // ========== HAMBURGER MENU ==========
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== DESKTOP DROPDOWNS ==========
  const dropdownBtns = document.querySelectorAll('.nav-dropdown-trigger');
  dropdownBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdown = btn.nextElementSibling;
      if (!dropdown) return;
      
      // Close all other dropdowns
      document.querySelectorAll('.nav-dropdown.active').forEach(function(d) {
        if (d !== dropdown) d.classList.remove('active');
      });
      
      dropdown.classList.toggle('active');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown-container')) {
      document.querySelectorAll('.nav-dropdown.active').forEach(function(d) {
        d.classList.remove('active');
      });
    }
  });

  // ========== SCROLL ANIMATIONS ==========
  window.addEventListener('load', function() {
    // Force reflow for CSS
    document.body.offsetHeight;
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      observer.observe(el);
    });
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== COOKIE BANNER ==========
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    const acceptBtn = cookieBanner.querySelector('.cookie-accept');
    const rejectBtn = cookieBanner.querySelector('.cookie-reject');
    const customizeBtn = cookieBanner.querySelector('.cookie-customize');
    
    function hideCookieBanner() {
      cookieBanner.style.transform = 'translateY(100%)';
      cookieBanner.style.transition = 'transform 0.3s ease';
      setTimeout(function() { cookieBanner.style.display = 'none'; }, 300);
    }
    
    if (acceptBtn) acceptBtn.addEventListener('click', hideCookieBanner);
    if (rejectBtn) rejectBtn.addEventListener('click', hideCookieBanner);
    if (customizeBtn) customizeBtn.addEventListener('click', hideCookieBanner);
  }

  // ========== MODEL CARDS FILTERING ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modelCards = document.querySelectorAll('.model-card');
  
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filter = btn.dataset.filter;
      if (!filter) return;
      
      // Toggle active state
      btn.classList.toggle('active');
      
      // Get all active filters
      const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active')).map(function(b) {
        return b.dataset.filter;
      });
      
      // Show/hide cards
      modelCards.forEach(function(card) {
        if (activeFilters.length === 0) {
          card.style.display = '';
          return;
        }
        const cardCategories = (card.dataset.category || '').split(' ');
        const matches = activeFilters.some(function(f) { return cardCategories.includes(f); });
        card.style.display = matches ? '' : 'none';
      });
    });
  });

  // ========== SEARCH INPUT ==========
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      const query = input.value.toLowerCase().trim();
      const cards = input.closest('section') ? input.closest('section').querySelectorAll('.model-card, .occasion-card, .dealer-card') : [];
      cards.forEach(function(card) {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  });

  // ========== COUNTER ANIMATION ==========
  function animateCounter(el, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    function step() {
      start += increment;
      if (start >= target) {
        el.textContent = target.toLocaleString();
        return;
      }
      el.textContent = Math.floor(start).toLocaleString();
      requestAnimationFrame(step);
    }
    step();
  }

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        if (target) animateCounter(entry.target, target, 2000);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function(el) {
    counterObserver.observe(el);
  });

  // ========== TAB COMPONENT ==========
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tabId = btn.dataset.tab;
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabContents.forEach(function(c) { c.style.display = 'none'; });
      btn.classList.add('active');
      const content = document.getElementById(tabId);
      if (content) content.style.display = '';
    });
  });

  // ========== VIDEO PLAY BUTTON ==========
  (function() {
    var heroVideo = document.getElementById('heroVideo');
    var heroPlayBtn = document.getElementById('heroPlayBtn');
    if (!heroVideo || !heroPlayBtn) return;

    var playIcon = heroPlayBtn.querySelector('.play-icon');
    var pauseIcon = heroPlayBtn.querySelector('.pause-icon');

    function updateBtnState() {
      if (heroVideo.paused) {
        heroPlayBtn.classList.remove('is-playing');
        if (playIcon) playIcon.style.display = '';
        if (pauseIcon) pauseIcon.style.display = 'none';
        heroPlayBtn.setAttribute('aria-label', 'Video afspelen');
      } else {
        heroPlayBtn.classList.add('is-playing');
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = '';
        heroPlayBtn.setAttribute('aria-label', 'Video pauzeren');
      }
    }

    // Sync button state on every video state change
    heroVideo.addEventListener('play', updateBtnState);
    heroVideo.addEventListener('playing', updateBtnState);
    heroVideo.addEventListener('pause', updateBtnState);
    heroVideo.addEventListener('ended', updateBtnState);
    heroVideo.addEventListener('loadeddata', updateBtnState);

    // Sync immediately — autoplay may have already started
    updateBtnState();

    // Also sync after a short delay to catch late autoplay
    setTimeout(updateBtnState, 100);
    setTimeout(updateBtnState, 500);

    heroPlayBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (heroVideo.paused) {
        var promise = heroVideo.play();
        if (promise && promise.catch) promise.catch(function() {});
      } else {
        heroVideo.pause();
      }
    });
  })();

  // ========== ACCORDION ==========
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = content.style.maxHeight;
      
      // Close all
      document.querySelectorAll('.accordion-content').forEach(function(c) {
        c.style.maxHeight = '';
      });
      document.querySelectorAll('.accordion-header').forEach(function(h) {
        h.classList.remove('active');
      });
      
      // Open clicked
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        header.classList.add('active');
      }
    });
  });

  // ========== SCROLL TO TOP ==========
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      scrollTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    });
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== PARALLAX HERO ==========
  const heroBg = document.querySelector('.hero-bg.parallax');
  if (heroBg) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY;
      heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    });
  }

});
