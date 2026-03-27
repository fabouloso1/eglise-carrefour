// ===== PWA INSTALL MANAGER — Église de Carrefour =====
(function() {
  'use strict';

  const INSTALLED_KEY = 'pwa_installed';
  let deferredPrompt = null;

  // ===== SERVICE WORKER =====
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  // ===== KAPTE beforeinstallprompt =====
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Montre bouton enstale si disponib
    const btn = document.getElementById('pwa-install-btn');
    if (btn) btn.style.display = 'flex';
  });

  // ===== APRE ENSTALE =====
  window.addEventListener('appinstalled', () => {
    localStorage.setItem(INSTALLED_KEY, '1');
    const btn = document.getElementById('pwa-install-btn');
    if (btn) btn.style.display = 'none';
  });

  // ===== VERIFYE SI DEJA ENSTALE =====
  function dejaInstale() {
    if (localStorage.getItem(INSTALLED_KEY)) return true;
    if (window.navigator.standalone) return true;
    if (window.matchMedia('(display-mode: standalone)').matches) return true;
    return false;
  }

  // ===== FONKSYON ENSTALE =====
  window.instalerApp = async function() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (result.outcome === 'accepted') {
        localStorage.setItem(INSTALLED_KEY, '1');
        const btn = document.getElementById('pwa-install-btn');
        if (btn) btn.style.display = 'none';
      }
    } else {
      // iOS Safari oswa lòt navigatè
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      if (isIOS) {
        alert('📱 Sur iPhone/iPad :\n\n1. Appuyez sur le bouton Partager ↑\n2. Appuyez sur "Sur l\'écran d\'accueil"\n3. Appuyez sur "Ajouter"');
      } else {
        alert('📱 Pour installer :\n\nDans votre navigateur, cherchez "Ajouter à l\'écran d\'accueil" dans le menu (⋮).');
      }
    }
  };

  // ===== CACHE BOUTON SI DEJA ENSTALE =====
  document.addEventListener('DOMContentLoaded', function() {
    if (dejaInstale()) {
      const btn = document.getElementById('pwa-install-btn');
      if (btn) btn.style.display = 'none';
    }
  });

})();
