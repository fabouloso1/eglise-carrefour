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

    // Mande pèmisyon notifikasyon IMEDYATMAN — dirèkteman nan klike bouton
    let notifPerm = 'default';
    if ('Notification' in window && Notification.permission === 'default') {
      try { notifPerm = await Notification.requestPermission(); } catch(e) {}
    } else {
      notifPerm = Notification.permission;
    }

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

    // Abòne FCM otomatikman + mande pèmisyon
    setTimeout(async () => {
      try {
        const VAPID = 'BJ1bOLbFM6qNV2XgVA4F9pA7cWng1NKPlU24sgSOk8MyqhhqWsBXVlN0V2Sjnt-Z7xFIHK8wiRS12xFGWddAtFI';
        const SW    = '/eglise-carrefour/firebase-messaging-sw.js';

        // Chaje Firebase dynamikman
        const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
        const { getMessaging, getToken } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js');
        const { getFirestore, doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

        const app = getApps().find(a => a.name === 'gate') || initializeApp({
          apiKey: "AIzaSyBg9wUQyE7gikWOXryjWOuy-3G32tnqZtM",
          authDomain: "eglise-carrefour.firebaseapp.com",
          projectId: "eglise-carrefour",
          storageBucket: "eglise-carrefour.firebasestorage.app",
          messagingSenderId: "421333694767",
          appId: "1:421333694767:web:30c18da36ae020821a49da"
        }, 'gate');

        const db = getFirestore(app);
        const messaging = getMessaging(app);

        // Verifye pèmisyon — deja mande anwo
        if (notifPerm !== 'granted') return;

        // Enrejistre Service Worker
        const swReg = await navigator.serviceWorker.register(SW, { scope: '/eglise-carrefour/' });
        await navigator.serviceWorker.ready;

        // Jwenn FCM token
        const token = await getToken(messaging, { vapidKey: VAPID, serviceWorkerRegistration: swReg });
        if (!token) return;

        // Sove token + info manm nan Firestore
        await setDoc(doc(db, 'fcm_tokens', token.substring(0, 40)), {
          token:     token,
          nom:       nom,
          telephone: tel,
          date:      new Date().toISOString(),
          platform:  navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
        });

        localStorage.setItem('fcm_subscribed', 'true');
        localStorage.setItem('fcm_token', token);
        localStorage.setItem('fcm_nom', nom);

        // Notif byenveni
        new Notification('Bienvenue — Eglise de Dieu de la Prophetie', {
          body: 'Vous etes inscrit ! Vous recevrez les annonces, etudes et rappels a 9h.',
          icon: '/eglise-carrefour/logo.png',
          tag:  'bienvenue'
        });

      } catch(e) { console.log('FCM gate:', e.message); }
    }, 1500);
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
  // ===== EKRAN BLOKE =====
  function montreEkranBloke() {
    // Kache tout sit la
    document.body.style.overflow = 'hidden';
    const blok = document.createElement('div');
    blok.id = 'bloque-overlay';
    blok.innerHTML = `
      <div style="position:fixed;inset:0;background:#0f0c2e;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div style="background:linear-gradient(135deg,#1a0a3c,#0d1f4a);border-radius:24px;padding:40px 28px;max-width:400px;width:100%;text-align:center;border-top:4px solid #e74c3c;">
          <div style="font-size:3.5rem;margin-bottom:20px;">🚫</div>
          <h2 style="color:#ff6b6b;font-family:'Playfair Display',serif;font-size:1.5rem;margin-bottom:12px;font-weight:800;">Accès restreint</h2>
          <p style="color:rgba(255,255,255,0.75);font-size:0.98rem;line-height:1.7;margin-bottom:24px;">
            Votre accès à ce site a été temporairement suspendu.<br>
            Veuillez contacter le Pasteur pour rétablir votre accès.
          </p>
          <a href="tel:+50912345678"
            style="display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f1c40f,#e67e22);color:#0f0c2e;padding:14px 28px;border-radius:30px;font-weight:800;font-size:1rem;text-decoration:none;margin-bottom:12px;">
            <i class="fas fa-phone"></i> Contacter le Pasteur
          </a>
          <p style="color:rgba(255,255,255,0.3);font-size:0.8rem;margin-top:10px;">
            Église de Dieu de la Prophétie de Carrefour
          </p>
        </div>
      </div>`;
    document.body.appendChild(blok);
  }

  window.gateInit = async function() {
    if (!estInscrit()) {
      // Kache kontni paj la imedyatman
      document.body.style.visibility = 'hidden';
      document.body.style.overflow = 'hidden';
      // Montre gate
      setTimeout(function() {
        document.body.style.visibility = 'visible';
        montreGate();
      }, 100);
      return;
    }

    // Si enskri — verifye si li bloke nan Firebase
    try {
      const membre = JSON.parse(localStorage.getItem('eglise_membre') || '{}');
      const tel    = membre.telephone || '';
      const nom    = membre.nom || '';
      if (!tel) return;

      // Chèche nan Firebase si moun sa bloke
      const firebase = window.firebase;
      if (!firebase || !firebase.apps || !firebase.apps.length) return;

      const db   = firebase.firestore();
      const snap = await db.collection('membres')
        .where('telephone', '==', tel)
        .limit(1)
        .get();

      if (!snap.empty) {
        const data = snap.docs[0].data();
        if (data.bloque === true) {
          montreEkranBloke();
        }
      }
    } catch(e) {
      // Si Firebase pa disponib, laisse passer
      console.log('Gate check:', e.message);
    }
  };

  // Expose pou paj yo ka rele li
  window.gateEstInscrit = estInscrit;

})();
