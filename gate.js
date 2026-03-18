// ===== GATE.JS — Système d'accès =====
// Ajoute nan paj pwoteje yo: <script src="gate.js"></script>
// Apre nav.js

(function() {
  'use strict';

  const STORAGE_KEY = 'eglise_membre';
  const DB_URL      = 'https://firestore.googleapis.com/v1/projects/eglise-carrefour/databases/(default)/documents/membres';

  // ===== VERIFYE SI MOUN NAN DEJA ENSKRI =====
  function estInscrit() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;
    try {
      const m = JSON.parse(data);
      return !!(m.nom && m.telephone);
    } catch(e) { return false; }
  }

  // ===== MONTRE MODAL ENSKRIPSYON =====
  function montreGate() {
    if (document.getElementById('gate-overlay')) return;

    // Kache kontni paj la
    document.body.style.overflow = 'hidden';

    const overlay = document.createElement('div');
    overlay.id = 'gate-overlay';
    overlay.innerHTML = `
      <div id="gate-card">

        <div id="gate-header">
          <div id="gate-logo-wrap">
            <img src="logo.png" alt="Logo" onerror="this.style.display='none'">
          </div>
          <h2 id="gate-title">Rejoignez notre communauté</h2>
          <p id="gate-subtitle">Inscrivez-vous gratuitement pour accéder à cette page et rester connecté à notre église.</p>
        </div>

        <div id="gate-form">

          <div class="gate-field">
            <label><i class="fas fa-user"></i> Votre nom complet *</label>
            <input type="text" id="gate-nom" placeholder="Ex: Marie Joseph..." autocomplete="name">
          </div>

          <div class="gate-field">
            <label><i class="fas fa-phone"></i> Numéro de téléphone *</label>
            <input type="tel" id="gate-tel" placeholder="Ex: +509 3700 0000..." autocomplete="tel">
          </div>

          <div class="gate-field">
            <label><i class="fas fa-map-marker-alt"></i> Quartier / Ville (optionnel)</label>
            <input type="text" id="gate-ville" placeholder="Ex: Carrefour, Port-au-Prince...">
          </div>

          <div id="gate-error" style="display:none;"></div>

          <button id="gate-btn" onclick="gateSubmit()">
            <i class="fas fa-check-circle"></i>
            <span>S'inscrire et accéder</span>
          </button>

          <p id="gate-note">
            <i class="fas fa-lock"></i>
            Vos informations sont confidentielles et ne seront utilisées que pour les communications de l'église.
          </p>
        </div>

        <div id="gate-success" style="display:none;">
          <div id="gate-success-icon">🙏</div>
          <h3>Bienvenue dans notre famille !</h3>
          <p>Votre inscription a été enregistrée. Vous avez maintenant accès à toutes les pages.</p>
          <button onclick="gateFermer()" id="gate-continue-btn">
            <i class="fas fa-arrow-right"></i> Continuer
          </button>
        </div>

      </div>
    `;

    // CSS inline complet
    const style = document.createElement('style');
    style.id = 'gate-style';
    style.textContent = `
      #gate-overlay {
        position: fixed; inset: 0;
        background: rgba(5, 5, 20, 0.88);
        z-index: 99999;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        animation: gateFadeIn 0.3s ease;
      }
      @keyframes gateFadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes gateSlideUp {
        from { transform: translateY(100%); }
        to   { transform: translateY(0); }
      }

      #gate-card {
        background: white;
        border-radius: 28px 28px 0 0;
        padding: 32px 24px 44px;
        width: 100%;
        max-width: 500px;
        max-height: 92vh;
        overflow-y: auto;
        animation: gateSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      #gate-header { text-align: center; margin-bottom: 28px; }

      #gate-logo-wrap {
        width: 72px; height: 72px;
        border-radius: 18px;
        overflow: hidden;
        margin: 0 auto 16px;
        border: 2px solid #eee;
        box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        background: #1c1c3c;
      }
      #gate-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }

      #gate-title {
        font-family: 'Playfair Display', serif !important;
        font-size: 1.5rem !important;
        color: #111111 !important;
        margin-bottom: 8px !important;
        font-weight: 700 !important;
      }

      #gate-subtitle {
        color: #555555 !important;
        font-size: 0.95rem !important;
        line-height: 1.6;
        font-weight: 500 !important;
      }

      .gate-field { margin-bottom: 18px; }

      .gate-field label {
        display: block;
        margin-bottom: 7px;
        font-size: 0.9rem !important;
        font-weight: 700 !important;
        color: #111111 !important;
      }
      .gate-field label i {
        color: #1c1c3c;
        margin-right: 6px;
        width: 16px;
      }

      .gate-field input {
        width: 100%;
        padding: 14px 16px !important;
        border: 2px solid #cccccc !important;
        border-radius: 12px !important;
        font-size: 1rem !important;
        color: #111111 !important;
        background: #f8f8f8 !important;
        font-family: 'Montserrat', sans-serif;
        transition: border-color 0.2s;
        box-sizing: border-box;
      }
      .gate-field input:focus {
        outline: none !important;
        border-color: #1c1c3c !important;
        background: white !important;
      }

      #gate-error {
        background: #fee;
        border: 1px solid #f5c6cb;
        border-radius: 10px;
        padding: 12px 16px;
        color: #c00 !important;
        font-size: 0.9rem !important;
        font-weight: 600 !important;
        margin-bottom: 16px;
        text-align: center;
      }

      #gate-btn {
        width: 100%;
        padding: 17px !important;
        background: linear-gradient(135deg, #1c1c3c, #3a1c5c) !important;
        color: white !important;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem !important;
        font-weight: 800 !important;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 16px;
        font-family: 'Montserrat', sans-serif;
      }
      #gate-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      #gate-note {
        text-align: center;
        color: #888 !important;
        font-size: 0.8rem !important;
        line-height: 1.5;
        font-weight: 500 !important;
      }
      #gate-note i { margin-right: 5px; }

      /* SUCCESS */
      #gate-success { text-align: center; padding: 20px 0; }
      #gate-success-icon { font-size: 3.5rem; margin-bottom: 16px; }
      #gate-success h3 {
        font-family: 'Playfair Display', serif !important;
        font-size: 1.4rem !important;
        color: #111 !important;
        margin-bottom: 10px !important;
        font-weight: 700 !important;
      }
      #gate-success p {
        color: #444 !important;
        font-size: 0.95rem !important;
        line-height: 1.6;
        margin-bottom: 24px !important;
        font-weight: 500 !important;
      }
      #gate-continue-btn {
        padding: 16px 40px !important;
        background: linear-gradient(135deg, #f1c40f, #e67e22) !important;
        color: #1c1c3c !important;
        border: none;
        border-radius: 50px;
        font-size: 1rem !important;
        font-weight: 800 !important;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'Montserrat', sans-serif;
      }

      @media (min-width: 500px) {
        #gate-overlay { align-items: center; }
        #gate-card { border-radius: 28px; max-height: 90vh; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);
  }

  // ===== SOUMÈT ENSKRIPSYON =====
  window.gateSubmit = async function() {
    const nom  = document.getElementById('gate-nom').value.trim();
    const tel  = document.getElementById('gate-tel').value.trim();
    const vil  = document.getElementById('gate-ville').value.trim();
    const err  = document.getElementById('gate-error');
    const btn  = document.getElementById('gate-btn');

    // Validasyon
    if (!nom) {
      err.style.display = 'block';
      err.textContent   = '⚠️ Veuillez saisir votre nom.';
      document.getElementById('gate-nom').focus();
      return;
    }
    if (!tel || tel.replace(/\D/g,'').length < 8) {
      err.style.display = 'block';
      err.textContent   = '⚠️ Veuillez saisir un numéro de téléphone valide.';
      document.getElementById('gate-tel').focus();
      return;
    }
    err.style.display = 'none';

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';

    // Sove nan localStorage imedyatman
    const membre = { nom, telephone: tel, ville: vil, date: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(membre));

    // Sove nan Firebase Firestore
    try {
      await fetch('https://firestore.googleapis.com/v1/projects/eglise-carrefour/databases/(default)/documents/membres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            nom:       { stringValue: nom },
            telephone: { stringValue: tel },
            ville:     { stringValue: vil },
            date:      { stringValue: new Date().toLocaleDateString('fr-FR') },
            timestamp: { stringValue: new Date().toISOString() }
          }
        })
      });
    } catch(e) {
      // Si Firebase pa disponib, localStorage sifi
      console.log('Firebase save:', e.message);
    }

    // Montre siksè
    document.getElementById('gate-form').style.display    = 'none';
    document.getElementById('gate-success').style.display = 'block';
  };

  // ===== FÈMEN GATE =====
  window.gateFermer = function() {
    const overlay = document.getElementById('gate-overlay');
    const style   = document.getElementById('gate-style');
    if (overlay) overlay.remove();
    if (style)   style.remove();
    document.body.style.overflow = '';
  };

  // ===== INIT — Rele sa lè paj la chaje =====
  window.gateInit = function() {
    if (!estInscrit()) {
      // Rete yon ti moman pou paj la chaje anvan montre modal
      setTimeout(montreGate, 400);
    }
  };

  // Expose pou paj yo ka rele li
  window.gateEstInscrit = estInscrit;

})();
