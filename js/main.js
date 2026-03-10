// Mobile Navigation Toggle
(function() {
  'use strict';
  
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const mobileBreakpoint = 768;
  
  if (!navToggle || !siteNav) {
    return; // Elements not found, exit
  }
  
  function isMobileViewport() {
    return window.innerWidth <= mobileBreakpoint;
  }

  // Toggle menu function
  function toggleMenu() {
    const isOpen = siteNav.classList.contains('is-open');
    
    if (isOpen) {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      siteNav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMenu() {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  
  // Toggle menu on button click
  navToggle.addEventListener('click', toggleMenu);
  
  // Close menu when clicking on a nav link (mobile only)
  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (isMobileViewport()) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', function(event) {
    if (!isMobileViewport()) {
      return;
    }

    if (!siteNav.classList.contains('is-open')) {
      return;
    }

    if (siteNav.contains(event.target) || navToggle.contains(event.target)) {
      return;
    }

    closeMenu();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
  
  // Close menu when window is resized to desktop size
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (!isMobileViewport()) {
        closeMenu();
      }
    }, 250);
  });
})();
