// ===== GATE.JS — Système d'accès =====

var GATE_STORAGE = 'eglise_membre';

// Verifye si moun nan enskri
function gateEstInscrit() {
  try {
    var d = JSON.parse(localStorage.getItem(GATE_STORAGE) || '{}');
    return !!(d.nom && d.telephone);
  } catch(e) { return false; }
}

// Soumèt fòm enskripsyon
function gateSubmit() {
  var nom = document.getElementById('gate-nom').value.trim();
  var tel = document.getElementById('gate-tel').value.trim();
  var vil = (document.getElementById('gate-ville') || {}).value || '';
  var err = document.getElementById('gate-error');

  if (!nom) {
    err.style.display = 'block';
    err.textContent = '⚠️ Veuillez saisir votre nom.';
    return;
  }
  if (!tel || tel.replace(/\D/g, '').length < 8) {
    err.style.display = 'block';
    err.textContent = '⚠️ Numéro de téléphone invalide.';
    return;
  }
  err.style.display = 'none';

  var btn = document.getElementById('gate-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';

  // Sove nan localStorage
  localStorage.setItem(GATE_STORAGE, JSON.stringify({
    nom: nom, telephone: tel, ville: vil.trim(),
    date: new Date().toLocaleDateString('fr-FR')
  }));

  // Sove nan Firebase (si disponib)
  try {
    fetch('https://firestore.googleapis.com/v1/projects/eglise-carrefour/databases/(default)/documents/membres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          nom:       { stringValue: nom },
          telephone: { stringValue: tel },
          ville:     { stringValue: vil.trim() },
          date:      { stringValue: new Date().toLocaleDateString('fr-FR') },
          timestamp: { timestampValue: new Date().toISOString() }
        }
      })
    });
  } catch(e) {}

  // Montre siksè
  document.getElementById('gate-form').style.display = 'none';
  document.getElementById('gate-success').style.display = 'block';
}

// Fèmen gate epi debloke paj la
function gateFermer() {
  var ov = document.getElementById('gate-overlay');
  var st = document.getElementById('gate-style');
  if (ov) ov.remove();
  if (st) st.remove();
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

// Montre modal enskripsyon
function montreGate() {
  if (document.getElementById('gate-overlay')) return;

  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.visibility = 'visible';

  var ov = document.createElement('div');
  ov.id = 'gate-overlay';
  ov.innerHTML = '<div id="gate-card">' +
    '<div id="gate-header">' +
      '<div id="gate-logo-wrap"><img src="logo.png" alt="Logo" onerror="this.style.display=\'none\'"></div>' +
      '<h2 id="gate-title">Rejoignez notre communauté</h2>' +
      '<p id="gate-subtitle">Inscrivez-vous pour accéder à cette page.</p>' +
    '</div>' +
    '<div id="gate-form">' +
      '<div class="gate-field"><label>Votre nom complet *</label>' +
        '<input type="text" id="gate-nom" placeholder="Ex: Marie Joseph..."></div>' +
      '<div class="gate-field"><label>Numéro de téléphone *</label>' +
        '<input type="tel" id="gate-tel" placeholder="Ex: +509 3700 0000..."></div>' +
      '<div class="gate-field"><label>Quartier / Ville (optionnel)</label>' +
        '<input type="text" id="gate-ville" placeholder="Ex: Carrefour..."></div>' +
      '<div id="gate-error" style="display:none;"></div>' +
      '<button id="gate-btn" type="button">S\'inscrire et accéder</button>' +
      '<p id="gate-note">Vos informations sont confidentielles.</p>' +
    '</div>' +
    '<div id="gate-success" style="display:none;">' +
      '<div style="font-size:3rem;margin-bottom:16px;">🙏</div>' +
      '<h3>Bienvenue dans notre famille!</h3>' +
      '<p>Inscription enregistrée. Vous avez accès à toutes les pages.</p>' +
      '<button id="gate-continue-btn" type="button">Continuer →</button>' +
    '</div>' +
  '</div>';

  var st = document.createElement('style');
  st.id = 'gate-style';
  st.textContent =
    '#gate-overlay{position:fixed;inset:0;background:rgba(10,5,40,0.93);z-index:99999;display:flex;align-items:flex-end;justify-content:center}' +
    '#gate-card{background:linear-gradient(160deg,#0f0c2e,#1a0a3c);border-radius:20px 20px 0 0;padding:24px 20px 36px;width:100%;max-width:480px;max-height:85vh;overflow-y:auto;border-top:3px solid #f1c40f}' +
    '#gate-header{text-align:center;margin-bottom:18px}' +
    '#gate-logo-wrap{width:60px;height:60px;border-radius:14px;overflow:hidden;margin:0 auto 12px;border:2px solid rgba(241,196,15,0.5);background:#1c1c3c}' +
    '#gate-logo-wrap img{width:100%;height:100%;object-fit:cover}' +
    '#gate-title{color:#f1c40f!important;font-size:1.3rem!important;font-weight:800!important;margin-bottom:6px!important}' +
    '#gate-subtitle{color:rgba(255,255,255,0.75)!important;font-size:0.95rem!important;line-height:1.6!important}' +
    '.gate-field{margin-bottom:12px}' +
    '.gate-field label{display:block;color:#f1c40f!important;font-weight:700!important;font-size:0.9rem!important;margin-bottom:6px}' +
    '.gate-field input{width:100%;padding:12px 14px;border:2px solid rgba(241,196,15,0.3);border-radius:12px;font-size:1rem;color:white!important;background:rgba(255,255,255,0.08);box-sizing:border-box;font-family:inherit}' +
    '.gate-field input:focus{outline:none;border-color:#f1c40f;background:rgba(255,255,255,0.12)}' +
    '#gate-error{background:rgba(231,76,60,0.2);border-radius:10px;padding:12px;color:#ff8a80!important;font-weight:700!important;margin-bottom:12px;text-align:center}' +
    '#gate-btn{width:100%;padding:14px;background:linear-gradient(135deg,#f1c40f,#e67e22);color:#0f0c2e!important;border:none;border-radius:50px;font-size:1.1rem!important;font-weight:800!important;cursor:pointer;margin-bottom:12px;font-family:inherit}' +
    '#gate-btn:disabled{opacity:0.6;cursor:not-allowed}' +
    '#gate-note{text-align:center;color:rgba(255,255,255,0.4)!important;font-size:0.82rem!important}' +
    '#gate-success{text-align:center;padding:20px 0}' +
    '#gate-success h3{color:#f1c40f!important;font-size:1.5rem!important;font-weight:800!important;margin-bottom:10px!important}' +
    '#gate-success p{color:rgba(255,255,255,0.75)!important;font-size:0.95rem!important;margin-bottom:24px!important}' +
    '#gate-continue-btn{padding:14px 36px;background:linear-gradient(135deg,#f1c40f,#e67e22);color:#0f0c2e!important;border:none;border-radius:50px;font-size:1rem!important;font-weight:800!important;cursor:pointer;font-family:inherit}' +
    '@media(min-width:500px){#gate-overlay{align-items:center}#gate-card{border-radius:20px}}';

  document.head.appendChild(st);
  document.body.appendChild(ov);

  // Attach events dirèkteman
  document.getElementById('gate-btn').onclick = gateSubmit;
  document.getElementById('gate-continue-btn').onclick = gateFermer;
}

// Montre ekran bloke
function montreEkranBloke() {
  document.body.style.overflow = 'hidden';
  var blok = document.createElement('div');
  blok.id = 'bloque-overlay';
  blok.style.cssText = 'position:fixed;inset:0;background:#0f0c2e;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px';
  blok.innerHTML =
    '<div style="background:linear-gradient(135deg,#1a0a3c,#0d1f4a);border-radius:24px;padding:40px 28px;max-width:400px;width:100%;text-align:center;border-top:4px solid #e74c3c">' +
    '<div style="font-size:3.5rem;margin-bottom:20px">🚫</div>' +
    '<h2 style="color:#ff6b6b;font-size:1.5rem;margin-bottom:12px;font-weight:800">Accès restreint</h2>' +
    '<p style="color:rgba(255,255,255,0.75);font-size:0.95rem;line-height:1.7;margin-bottom:24px">Votre accès a été suspendu. Contactez le Pasteur pour le rétablir.</p>' +
    '<a href="tel:+50931573591" style="display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f1c40f,#e67e22);color:#0f0c2e;padding:14px 28px;border-radius:30px;font-weight:800;font-size:1rem;text-decoration:none">' +
    '<i class="fas fa-phone"></i> +509 31 57 3591</a>' +
    '</div>';
  document.body.appendChild(blok);
}

// INIT PRINCIPAL
function gateInit() {
  if (!gateEstInscrit()) {
    montreGate();
    return;
  }
  // Verifye si bloke nan Firebase
  try {
    var m = JSON.parse(localStorage.getItem(GATE_STORAGE) || '{}');
    if (!m.telephone) return;
    if (window.firebase && firebase.apps && firebase.apps.length) {
      firebase.firestore().collection('membres')
        .where('telephone', '==', m.telephone).limit(1).get()
        .then(function(snap) {
          if (!snap.empty && snap.docs[0].data().bloque === true) {
            montreEkranBloke();
          }
        }).catch(function() {});
    }
  } catch(e) {}
}

// Fonksyon pou bouton nan Navigasyon an
function gateShowFromNav() {
  montreGate();
}

// Rele gateInit otomatikman
gateInit();
