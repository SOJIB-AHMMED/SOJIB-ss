/**
 * CHATGPT KING - Core JavaScript (Vanilla JS)
 * Handles shared functionality across all subdomains
 */

(function () {
  'use strict';

  // === State Management ===
  const state = {
    userRole: localStorage.getItem('userRole') || 'guest',
    drawerOpen: false,
    activeAccordions: new Set()
  };

  // === Helper Functions ===
  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return document.querySelectorAll(selector);
  }

  function on(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
    }
  }

  function addClass(element, className) {
    if (element) {
      element.classList.add(className);
    }
  }

  function removeClass(element, className) {
    if (element) {
      element.classList.remove(className);
    }
  }

  function toggleClass(element, className) {
    if (element) {
      element.classList.toggle(className);
    }
  }

  function hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
  }

  // === Role Management ===
  function setUserRole(role) {
    const validRoles = ['guest', 'member', 'pro', 'admin'];
    if (validRoles.includes(role)) {
      state.userRole = role;
      localStorage.setItem('userRole', role);
      document.body.setAttribute('data-user-role', role);
      updateRoleSwitcherUI();
      console.log('User role set to:', role);
    }
  }

  function getUserRole() {
    return state.userRole;
  }

  function updateRoleSwitcherUI() {
    const buttons = $$('.role-switcher__btn');
    buttons.forEach(btn => {
      const role = btn.getAttribute('data-role');
      if (role === state.userRole) {
        addClass(btn, 'active');
      } else {
        removeClass(btn, 'active');
      }
    });
  }

  function initRoleSwitcher() {
    const buttons = $$('.role-switcher__btn');
    buttons.forEach(btn => {
      on(btn, 'click', function () {
        const role = this.getAttribute('data-role');
        setUserRole(role);
      });
    });
    updateRoleSwitcherUI();
  }

  // === Off-Canvas Drawer ===
  function openDrawer() {
    state.drawerOpen = true;
    const drawer = $('.drawer');
    const overlay = $('.drawer__overlay');
    const toggle = $('.header__menu-toggle');

    addClass(drawer, 'open');
    addClass(overlay, 'visible');
    addClass(toggle, 'active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    state.drawerOpen = false;
    const drawer = $('.drawer');
    const overlay = $('.drawer__overlay');
    const toggle = $('.header__menu-toggle');

    removeClass(drawer, 'open');
    removeClass(overlay, 'visible');
    removeClass(toggle, 'active');
    document.body.style.overflow = '';
  }

  function toggleDrawer() {
    if (state.drawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function initDrawer() {
    const toggle = $('.header__menu-toggle');
    const overlay = $('.drawer__overlay');
    const drawerLinks = $$('.drawer__menu-link');

    on(toggle, 'click', toggleDrawer);
    on(overlay, 'click', closeDrawer);

    // Close drawer when clicking on a link
    drawerLinks.forEach(link => {
      on(link, 'click', closeDrawer);
    });

    // Close drawer on ESC key
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape' && state.drawerOpen) {
        closeDrawer();
      }
    });
  }

  // === Accordion ===
  function toggleAccordion(accordionItem) {
    const header = accordionItem.querySelector('.accordion__header');
    const content = accordionItem.querySelector('.accordion__content');
    const accordionId = accordionItem.getAttribute('data-accordion-id');

    if (hasClass(content, 'active')) {
      // Close accordion
      removeClass(header, 'active');
      removeClass(content, 'active');
      state.activeAccordions.delete(accordionId);
    } else {
      // Open accordion
      addClass(header, 'active');
      addClass(content, 'active');
      state.activeAccordions.add(accordionId);
    }
  }

  function initAccordions() {
    const accordionHeaders = $$('.accordion__header');

    accordionHeaders.forEach((header, index) => {
      const accordionItem = header.closest('.accordion__item');
      
      // Set unique ID if not present
      if (!accordionItem.getAttribute('data-accordion-id')) {
        accordionItem.setAttribute('data-accordion-id', `accordion-${index}`);
      }

      on(header, 'click', function () {
        toggleAccordion(accordionItem);
      });
    });
  }

  // === Navigation Helpers ===
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentHost = window.location.hostname;

    // Update header navigation
    const headerLinks = $$('.header__nav-link');
    headerLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        addClass(link, 'active');
      } else {
        removeClass(link, 'active');
      }
    });

    // Update drawer navigation
    const drawerLinks = $$('.drawer__menu-link');
    drawerLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      const linkHost = new URL(link.href).hostname;
      if (linkPath === currentPath && linkHost === currentHost) {
        addClass(link, 'active');
      } else {
        removeClass(link, 'active');
      }
    });
  }

  // === Subdomain Navigation ===
  function getSubdomain() {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    // For localhost or IP addresses
    if (hostname === 'localhost' || hostname === '127.0.0.1' || !hostname.includes('.')) {
      return 'root';
    }
    
    // For actual domains (e.g., app.example.com)
    if (parts.length > 2) {
      return parts[0];
    }
    
    return 'root';
  }

  function navigateToSubdomain(subdomain) {
    const currentUrl = new URL(window.location.href);
    const hostname = currentUrl.hostname;
    const parts = hostname.split('.');
    
    let newHostname;
    
    if (subdomain === 'root') {
      // Navigate to root domain
      if (parts.length > 2) {
        newHostname = parts.slice(1).join('.');
      } else {
        newHostname = hostname;
      }
    } else {
      // Navigate to subdomain
      if (parts.length > 2) {
        parts[0] = subdomain;
        newHostname = parts.join('.');
      } else {
        newHostname = subdomain + '.' + hostname;
      }
    }
    
    const newUrl = currentUrl.protocol + '//' + newHostname + currentUrl.pathname;
    console.log('Navigating to:', newUrl);
    
    // For demo purposes, we'll just log this since we can't actually create subdomains
    // In production, this would navigate to the actual subdomain
    return newUrl;
  }

  // === Initialization ===
  function init() {
    console.log('CHATGPT KING - Core JS initialized');
    console.log('Current subdomain:', getSubdomain());

    // Set initial user role
    setUserRole(state.userRole);

    // Initialize components
    initDrawer();
    initAccordions();
    initRoleSwitcher();
    setActiveNavLink();

    // Update current subdomain indicator
    const subdomainIndicator = $('.current-subdomain');
    if (subdomainIndicator) {
      subdomainIndicator.textContent = getSubdomain();
    }
  }

  // === Public API ===
  window.ChatGPTKing = {
    init: init,
    setUserRole: setUserRole,
    getUserRole: getUserRole,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    toggleDrawer: toggleDrawer,
    getSubdomain: getSubdomain,
    navigateToSubdomain: navigateToSubdomain
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
