// ===== PWA INSTALL MANAGER — Église de Carrefour =====
// Jere fenèt "Installer l'application" sou tout paj

(function() {
  'use strict';

  let deferredPrompt = null;
  const STORAGE_KEY = 'pwa_dismissed';
  const DELAY_MS    = 3000; // Rete 3 segonn anvan montre fenèt la

  // ===== ENREJISTRE SERVICE WORKER =====
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('SW enregistré:', reg.scope))
        .catch(err => console.log('SW erreur:', err));
    });
  }

  // ===== KAPTE EVÈNMAN INSTALL =====
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Si moun te deja di "Non" — pa montre pou 3 jou
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const since = Date.now() - parseInt(dismissed);
      if (since < 3 * 24 * 60 * 60 * 1000) return; // 3 jou
    }

    // Si app deja enstale — pa montre
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // Montre fenèt la apre yon ti délai
    setTimeout(montreBanner, DELAY_MS);
  });

  // ===== KREYE HTML BANNER =====
  function montreBanner() {
    if (document.getElementById('pwa-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'pwa-banner';
    banner.innerHTML = `
      <div id="pwa-backdrop"></div>
      <div id="pwa-card">
        <div id="pwa-icon">
          <img src="logo.png" alt="Logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:2rem;">⛪</div>
        </div>
        <div id="pwa-content">
          <h3>Installer l'application</h3>
          <p>Ajoutez l'Église de Carrefour sur votre écran d'accueil pour un accès rapide, même sans connexion !</p>
          <ul id="pwa-benefits">
            <li>⚡ Accès rapide depuis l'écran d'accueil</li>
            <li>📴 Fonctionne sans connexion</li>
            <li>🔔 Recevez les notifications</li>
          </ul>
        </div>
        <div id="pwa-actions">
          <button id="pwa-btn-install">
            <i class="fas fa-download"></i> Installer
          </button>
          <button id="pwa-btn-dismiss">
            Pas maintenant
          </button>
        </div>
      </div>
    `;

    // Styles inline pour le banner
    const style = document.createElement('style');
    style.textContent = `
      #pwa-backdrop {
        position: fixed; inset: 0;
        background: rgba(5,5,20,0.7);
        z-index: 99998;
        backdrop-filter: blur(4px);
        animation: pwaFadeIn 0.3s ease;
      }
      #pwa-card {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        background: white;
        border-radius: 20px 20px 0 0;
        padding: 28px 24px 40px;
        z-index: 99999;
        box-shadow: 0 -8px 40px rgba(0,0,0,0.25);
        animation: pwaSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
        max-width: 520px;
        margin: 0 auto;
      }
      #pwa-icon {
        width: 80px; height: 80px;
        border-radius: 20px;
        overflow: hidden;
        margin: 0 auto 20px;
        border: 2px solid #e0e0e0;
        box-shadow: 0 4px 14px rgba(0,0,0,0.12);
      }
      #pwa-icon img { width: 100%; height: 100%; object-fit: cover; }
      #pwa-content { text-align: center; }
      #pwa-content h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: #111111;
        margin-bottom: 10px;
        line-height: 1.3;
      }
      #pwa-content p {
        color: #333333;
        font-size: 1rem;
        line-height: 1.7;
        margin-bottom: 16px;
        font-weight: 500;
      }
      #pwa-benefits {
        list-style: none;
        padding: 0;
        margin: 0 0 22px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        text-align: left;
      }
      #pwa-benefits li {
        font-size: 0.95rem;
        color: #222222;
        font-weight: 600;
        padding: 10px 14px;
        background: #f0f0f0;
        border-radius: 10px;
        border-left: 4px solid #1c1c3c;
      }
      #pwa-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      #pwa-btn-install {
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, #1c1c3c, #3a1c3c);
        color: white;
        border: none;
        border-radius: 30px;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: transform 0.2s;
        letter-spacing: 0.3px;
      }
      #pwa-btn-install:hover { transform: translateY(-2px); }
      #pwa-btn-dismiss {
        width: 100%;
        padding: 14px;
        background: #f0f0f0;
        color: #444444;
        border: none;
        border-radius: 30px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
      }
      #pwa-btn-dismiss:hover { background: #e0e0e0; color: #222; }
      @keyframes pwaFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes pwaSlideUp {
        from { transform: translateY(100%); }
        to   { transform: translateY(0); }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Bouton Installer
    document.getElementById('pwa-btn-install').addEventListener('click', async () => {
      fermerBanner();
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        if (result.outcome === 'accepted') {
          console.log('App installée !');
          localStorage.removeItem(STORAGE_KEY);
        }
        deferredPrompt = null;
      }
    });

    // Bouton Pas maintenant
    document.getElementById('pwa-btn-dismiss').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      fermerBanner();
    });

    // Klike sou backdrop fèmen tou
    document.getElementById('pwa-backdrop').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      fermerBanner();
    });
  }

  function fermerBanner() {
    const banner = document.getElementById('pwa-banner');
    if (banner) {
      const card = document.getElementById('pwa-card');
      const backdrop = document.getElementById('pwa-backdrop');
      if (card) card.style.animation = 'pwaSlideUp 0.25s reverse forwards';
      if (backdrop) backdrop.style.animation = 'pwaFadeIn 0.25s reverse forwards';
      setTimeout(() => banner.remove(), 260);
    }
  }

  // Si app deja enstale — pa janm montre banner
  window.addEventListener('appinstalled', () => {
    localStorage.removeItem(STORAGE_KEY);
    const banner = document.getElementById('pwa-banner');
    if (banner) banner.remove();
  });

})();
