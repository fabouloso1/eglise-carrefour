// ===== PWA INSTALL MANAGER — Église de Carrefour =====
(function() {
  'use strict';

  const DISMISS_KEY  = 'pwa_dismissed_until';
  const INSTALLED_KEY = 'pwa_installed';
  let deferredPrompt = null;

  // ===== SERVICE WORKER =====
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }

  // ===== KAPTE beforeinstallprompt =====
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    localStorage.setItem(INSTALLED_KEY, '1');
    fermerBanner();
  });

  // ===== VERIFYE SI DEJA ENSTALE =====
  function dejaInstale() {
    if (localStorage.getItem(INSTALLED_KEY)) return true;
    if (window.navigator.standalone) return true; // iOS
    if (window.matchMedia('(display-mode: standalone)').matches) return true;
    return false;
  }

  // ===== VERIFYE SI DISMISSED =====
  function dismissed() {
    const until = localStorage.getItem(DISMISS_KEY);
    if (!until) return false;
    return Date.now() < parseInt(until);
  }

  // ===== DECIDE SI MONTRE BANNER =====
  function devraitMontre() {
    if (dejaInstale()) return false;
    if (dismissed()) return false;
    return true;
  }

  // ===== MONTRE BANNER =====
  function montreBanner() {
    if (!devraitMontre()) return;
    if (document.getElementById('pwa-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'pwa-banner';
    banner.innerHTML = `
      <div id="pwa-backdrop"></div>
      <div id="pwa-card">
        <div id="pwa-logo-wrap">
          <img src="logo.png" alt="Logo" id="pwa-logo" onerror="this.style.display='none'">
        </div>
        <h3 id="pwa-title">Installer l'application</h3>
        <p id="pwa-desc">Ajoutez l'Église de Carrefour sur votre écran d'accueil pour un accès rapide, même hors connexion !</p>
        <div id="pwa-list">
          <div class="pwa-item">⚡ Accès rapide depuis l'écran d'accueil</div>
          <div class="pwa-item">📴 Fonctionne sans connexion internet</div>
          <div class="pwa-item">🔔 Recevez les notifications</div>
        </div>
        <button id="pwa-yes">
          <span>✅ Oui, installer</span>
        </button>
        <button id="pwa-no">Non, pas maintenant</button>
      </div>
    `;

    const style = document.createElement('style');
    style.id = 'pwa-style';
    style.textContent = `
      #pwa-backdrop {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.65);
        z-index: 99998;
        animation: pwaFadeIn 0.3s ease;
      }
      #pwa-card {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        background: #ffffff;
        border-radius: 24px 24px 0 0;
        padding: 30px 22px 44px;
        z-index: 99999;
        max-width: 500px;
        margin: 0 auto;
        box-shadow: 0 -6px 40px rgba(0,0,0,0.22);
        animation: pwaSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        text-align: center;
      }
      #pwa-logo-wrap {
        width: 80px; height: 80px;
        border-radius: 20px;
        overflow: hidden;
        margin: 0 auto 18px;
        border: 2px solid #ddd;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        background: #1c1c3c;
        display: flex; align-items: center; justify-content: center;
      }
      #pwa-logo { width: 100%; height: 100%; object-fit: cover; }
      #pwa-title {
        font-size: 1.5rem;
        font-weight: 800;
        color: #111111;
        margin: 0 0 10px;
        font-family: Georgia, serif;
      }
      #pwa-desc {
        font-size: 1rem;
        color: #2a2a2a;
        font-weight: 500;
        line-height: 1.6;
        margin: 0 0 18px;
      }
      #pwa-list {
        margin: 0 0 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        text-align: left;
      }
      .pwa-item {
        font-size: 1rem;
        color: #1a1a1a;
        font-weight: 600;
        padding: 11px 16px;
        background: #efefef;
        border-radius: 12px;
        border-left: 4px solid #1c1c3c;
      }
      #pwa-yes {
        width: 100%;
        padding: 17px;
        background: linear-gradient(135deg, #1c1c3c 0%, #3a1c3c 100%);
        color: #ffffff;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 800;
        cursor: pointer;
        margin-bottom: 12px;
        letter-spacing: 0.3px;
      }
      #pwa-yes:active { opacity: 0.88; }
      #pwa-no {
        width: 100%;
        padding: 14px;
        background: #e8e8e8;
        color: #333333;
        border: none;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
      }
      #pwa-no:active { background: #d8d8d8; }
      @keyframes pwaFadeIn {
        from { opacity: 0; } to { opacity: 1; }
      }
      @keyframes pwaSlideUp {
        from { transform: translateY(110%); }
        to   { transform: translateY(0); }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // ===== BOUTON OUI =====
    document.getElementById('pwa-yes').addEventListener('click', async () => {
      if (deferredPrompt) {
        // Chrome/Android — prompt natif
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (result.outcome === 'accepted') {
          localStorage.setItem(INSTALLED_KEY, '1');
        }
        fermerBanner();
      } else {
        // iOS Safari / lòt — montre enstriksyon manyèl
        montreInstructions();
      }
    });

    // ===== BOUTON NON =====
    document.getElementById('pwa-no').addEventListener('click', () => {
      // Bloke pou 3 jou
      localStorage.setItem(DISMISS_KEY, (Date.now() + 3 * 24 * 60 * 60 * 1000).toString());
      fermerBanner();
    });

    // Klike backdrop fèmen
    document.getElementById('pwa-backdrop').addEventListener('click', () => {
      localStorage.setItem(DISMISS_KEY, (Date.now() + 3 * 24 * 60 * 60 * 1000).toString());
      fermerBanner();
    });
  }

  // ===== ENSTRIKSYON iOS =====
  function montreInstructions() {
    fermerBanner();
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const msg = isIOS
      ? '📱 Sur iPhone/iPad :\n\n1. Appuyez sur le bouton Partager (carré avec flèche ↑)\n2. Faites défiler et appuyez sur "Sur l\'écran d\'accueil"\n3. Appuyez sur "Ajouter"'
      : '📱 Pour installer :\n\nDans votre navigateur, cherchez l\'option "Ajouter à l\'écran d\'accueil" dans le menu (⋮ ou ⋯).';
    alert(msg);
  }

  // ===== FERMER BANNER =====
  function fermerBanner() {
    const banner = document.getElementById('pwa-banner');
    const style  = document.getElementById('pwa-style');
    if (banner) {
      const card     = document.getElementById('pwa-card');
      const backdrop = document.getElementById('pwa-backdrop');
      if (card)     { card.style.animation     = 'pwaSlideUp 0.25s ease reverse forwards'; }
      if (backdrop) { backdrop.style.animation = 'pwaFadeIn 0.25s ease reverse forwards'; }
      setTimeout(() => {
        if (banner.parentNode) banner.remove();
        if (style && style.parentNode) style.remove();
      }, 260);
    }
  }

  // ===== LANSE =====
  function lanse() {
    // Toujou montre apre 2.5 sekonn si kondisyon ranpli
    setTimeout(montreBanner, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lanse);
  } else {
    lanse();
  }

})();
