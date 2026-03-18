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
        background: rgba(10, 5, 40, 0.92);
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
        background: linear-gradient(160deg, #0f0c2e 0%, #1a0a3c 50%, #0d1f4a 100%);
        border-radius: 28px 28px 0 0;
        padding: 36px 26px 50px;
        width: 100%;
        max-width: 500px;
        max-height: 94vh;
        overflow-y: auto;
        animation: gateSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        border-top: 3px solid #f1c40f;
      }

      /* HEADER */
      #gate-header { text-align: center; margin-bottom: 30px; }

      #gate-logo-wrap {
        width: 80px; height: 80px;
        border-radius: 20px;
        overflow: hidden;
        margin: 0 auto 18px;
        border: 3px solid rgba(241,196,15,0.5);
        box-shadow: 0 0 24px rgba(241,196,15,0.25);
        background: #1c1c3c;
      }
      #gate-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }

      #gate-title {
        font-family: 'Playfair Display', serif !important;
        font-size: 1.7rem !important;
        color: #f1c40f !important;
        margin-bottom: 10px !important;
        font-weight: 700 !important;
        line-height: 1.3 !important;
      }

      #gate-subtitle {
        color: rgba(255,255,255,0.75) !important;
        font-size: 1rem !important;
        line-height: 1.7 !important;
        font-weight: 500 !important;
      }

      /* CHAMPS */
      .gate-field { margin-bottom: 20px; }

      .gate-field label {
        display: block;
        margin-bottom: 8px;
        font-size: 0.95rem !important;
        font-weight: 700 !important;
        color: #f1c40f !important;
        letter-spacing: 0.3px;
      }
      .gate-field label i {
        margin-right: 7px;
        width: 16px;
      }

      .gate-field input {
        width: 100%;
        padding: 16px 18px !important;
        border: 2px solid rgba(241,196,15,0.3) !important;
        border-radius: 14px !important;
        font-size: 1.05rem !important;
        color: white !important;
        background: rgba(255,255,255,0.08) !important;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600 !important;
        box-sizing: border-box;
        caret-color: #f1c40f;
      }
      .gate-field input::placeholder {
        color: rgba(255,255,255,0.35) !important;
        font-weight: 400 !important;
      }
      .gate-field input:focus {
        outline: none !important;
        border-color: #f1c40f !important;
        background: rgba(255,255,255,0.12) !important;
        box-shadow: 0 0 0 4px rgba(241,196,15,0.15);
      }

      /* ERREUR */
      #gate-error {
        background: rgba(231,76,60,0.2);
        border: 1px solid rgba(231,76,60,0.5);
        border-radius: 12px;
        padding: 14px 18px;
        color: #ff8a80 !important;
        font-size: 0.95rem !important;
        font-weight: 700 !important;
        margin-bottom: 18px;
        text-align: center;
      }

      /* BOUTON SOUMET */
      #gate-btn {
        width: 100%;
        padding: 18px !important;
        background: linear-gradient(135deg, #f1c40f, #e67e22) !important;
        color: #0f0c2e !important;
        border: none;
        border-radius: 50px;
        font-size: 1.15rem !important;
        font-weight: 800 !important;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 18px;
        font-family: 'Montserrat', sans-serif;
        box-shadow: 0 6px 24px rgba(241,196,15,0.35);
        letter-spacing: 0.3px;
      }
      #gate-btn:disabled { opacity: 0.6; cursor: not-allowed; }

      /* NOTE */
      #gate-note {
        text-align: center;
        color: rgba(255,255,255,0.45) !important;
        font-size: 0.82rem !important;
        line-height: 1.6;
        font-weight: 500 !important;
      }
      #gate-note i { margin-right: 5px; color: rgba(241,196,15,0.5); }

      /* SUCCES */
      #gate-success { text-align: center; padding: 20px 0; }
      #gate-success-icon { font-size: 4rem; margin-bottom: 18px; }
      #gate-success h3 {
        font-family: 'Playfair Display', serif !important;
        font-size: 1.6rem !important;
        color: #f1c40f !important;
        margin-bottom: 12px !important;
        font-weight: 700 !important;
      }
      #gate-success p {
        color: rgba(255,255,255,0.75) !important;
        font-size: 1rem !important;
        line-height: 1.7 !important;
        margin-bottom: 28px !important;
        font-weight: 500 !important;
      }
      #gate-continue-btn {
        padding: 17px 44px !important;
        background: linear-gradient(135deg, #f1c40f, #e67e22) !important;
        color: #0f0c2e !important;
        border: none;
        border-radius: 50px;
        font-size: 1.05rem !important;
        font-weight: 800 !important;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'Montserrat', sans-serif;
        box-shadow: 0 6px 24px rgba(241,196,15,0.35);
      }

      /* SCROLLBAR */
      #gate-card::-webkit-scrollbar { width: 4px; }
      #gate-card::-webkit-scrollbar-track { background: transparent; }
      #gate-card::-webkit-scrollbar-thumb { background: rgba(241,196,15,0.3); border-radius: 4px; }

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
