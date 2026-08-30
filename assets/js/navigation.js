/**
 * S.A.L.S.A — Navigation & HUD Controller
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
        const isOpen = mobileDrawer.classList.contains('open');
        mobileBtn.innerHTML = isOpen ? '✕' : '☰';
      });
    }

    // 2. Active Route Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown a, .mobile-nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('active');
        // If inside a dropdown, highlight parent nav-link too
        const parentDropdown = link.closest('.nav-dropdown');
        if (parentDropdown) {
          const parentNavItem = parentDropdown.closest('.nav-item');
          if (parentNavItem) {
            const parentNavLink = parentNavItem.querySelector('.nav-link');
            if (parentNavLink) parentNavLink.classList.add('active');
          }
        }
      }
    });

    // 3. Audio Sonar Ping from HUD
    const hudPingBtn = document.getElementById('hud-ping-trigger');
    if (hudPingBtn) {
      hudPingBtn.addEventListener('click', () => {
        if (window.SalsaSimulator && typeof window.SalsaSimulator.playPingSound === 'function') {
          window.SalsaSimulator.playPingSound();
        } else {
          try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const actx = new AudioContext();
            const osc = actx.createOscillator();
            const gain = actx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, actx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1760, actx.currentTime + 0.15);

            gain.gain.setValueAtTime(0.2, actx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(actx.destination);

            osc.start();
            osc.stop(actx.currentTime + 0.25);
          } catch (e) {
            console.log('Audio requires user activation');
          }
        }
      });
    }
  });
})();
