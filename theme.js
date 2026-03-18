// ===== THEME SYSTEM JAVASCRIPT =====

(function() {
  'use strict';

  // Theme toggle functionality
  function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    
    // Mobile theme toggle elements
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const mobileThemeToggleDarkIcon = document.getElementById('mobile-theme-toggle-dark-icon');
    const mobileThemeToggleLightIcon = document.getElementById('mobile-theme-toggle-light-icon');
    const mobileThemeText = document.getElementById('mobile-theme-text');

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Function to update theme icons and text
    function updateThemeUI(isLight) {
      // Desktop theme toggle
      if (themeToggleDarkIcon && themeToggleLightIcon) {
        if (isLight) {
          themeToggleDarkIcon.classList.add('hidden');
          themeToggleLightIcon.classList.remove('hidden');
        } else {
          themeToggleDarkIcon.classList.remove('hidden');
          themeToggleLightIcon.classList.add('hidden');
        }
      }
      
      // Mobile theme toggle
      if (mobileThemeToggleDarkIcon && mobileThemeToggleLightIcon && mobileThemeText) {
        if (isLight) {
          mobileThemeToggleDarkIcon.classList.add('hidden');
          mobileThemeToggleLightIcon.classList.remove('hidden');
          mobileThemeText.textContent = 'Dark Theme';
        } else {
          mobileThemeToggleDarkIcon.classList.remove('hidden');
          mobileThemeToggleLightIcon.classList.add('hidden');
          mobileThemeText.textContent = 'Light Theme';
        }
      }
    }

    // Apply initial theme
    if (currentTheme === 'light') {
      document.body.classList.add('light-theme');
      updateThemeUI(true);
    } else {
      document.body.classList.remove('light-theme');
      updateThemeUI(false);
    }

    // Function to toggle theme
    function toggleTheme() {
      if (document.body.classList.contains('light-theme')) {
        // Switch to dark theme
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeUI(false);
      } else {
        // Switch to light theme
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeUI(true);
      }
    }

    // Desktop theme toggle event listener
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Mobile theme toggle event listener
    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  // Mobile menu functionality
  function initMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const openBtn = document.querySelector('[data-menu-toggle]');
    const closeBtn = document.querySelector('[data-menu-close]');

    if (!menu || !backdrop || !openBtn || !closeBtn) {
      return; // Exit if mobile menu elements don't exist
    }

    const closeMenu = () => {
      menu.classList.add('translate-x-full');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    };

    // Event listeners
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    
    // Close menu when clicking on links
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Initialize everything when DOM is loaded
  function init() {
    initThemeToggle();
    initMobileMenu();
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();