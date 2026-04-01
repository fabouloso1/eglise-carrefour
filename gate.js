// ===== GATE.JS — Système d'accès =====

var GATE_STORAGE = 'eglise_membre';

function gateEstInscrit() {
  try {
    var d = JSON.parse(localStorage.getItem(GATE_STORAGE) || '{}');
    return !!(d.nom && d.telephone);
  } catch(e) { return false; }
}

function gateSubmit() {
  var nom = document.getElementById('gate-nom').value.trim();
  var tel = document.getElementById('gate-tel').value.trim();
  var vil = '';
  try { vil = document.getElementById('gate-ville').value.trim(); } catch(e) {}
  var err = document.getElementById('gate-error');

  if (!nom) { err.style.display='block'; err.textContent='Veuillez saisir votre nom.'; return; }
  if (!tel || tel.replace(/\D/g,'').length < 8) { err.style.display='block'; err.textContent='Numéro invalide.'; return; }
  err.style.display = 'none';

  var btn = document.getElementById('gate-btn');
  btn.disabled = true;
  btn.textContent = 'Enregistrement...';

  localStorage.setItem(GATE_STORAGE, JSON.stringify({
    nom: nom, telephone: tel, ville: vil,
    date: new Date().toLocaleDateString('fr-FR')
  }));

  // Sove nan Firebase SDK
  try {
    if (window.firebase && firebase.apps && firebase.apps.length) {
      firebase.firestore().collection('membres').add({
        nom: nom, telephone: tel, ville: vil,
        date: new Date().toLocaleDateString('fr-FR'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(function(e) { console.log('Firebase save:', e.message); });
    }
  } catch(e) {}

  document.getElementById('gate-form').style.display = 'none';
  document.getElementById('gate-success').style.display = 'block';
}

function gateFermer() {
  var ov = document.getElementById('gate-overlay');
  var st = document.getElementById('gate-style');
  if (ov) ov.remove();
  if (st) st.remove();
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

function montreGate() {
  if (document.getElementById('gate-overlay')) return;
  if (gateEstInscrit()) return;

  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  var ov = document.createElement('div');
  ov.id = 'gate-overlay';
  ov.innerHTML =
    '<div id="gate-card">' +
      '<div id="gate-header">' +
        '<div id="gate-logo-wrap"><img src="logo.png" alt="Logo" onerror="this.style.display=\'none\'" /></div>' +
        '<h2 id="gate-title">Rejoignez notre communauté</h2>' +
        '<p id="gate-subtitle">Inscrivez-vous pour accéder à cette page.</p>' +
      '</div>' +
      '<div id="gate-form">' +
        '<div class="gate-field"><label>Votre nom complet *</label><input type="text" id="gate-nom" placeholder="Ex: Marie Joseph..." /></div>' +
        '<div class="gate-field"><label>Numéro de téléphone *</label><input type="tel" id="gate-tel" placeholder="Ex: +509 3700 0000..." /></div>' +
        '<div class="gate-field"><label>Quartier / Ville (optionnel)</label><input type="text" id="gate-ville" placeholder="Ex: Carrefour..." /></div>' +
        '<div id="gate-error" style="display:none;background:rgba(231,76,60,0.2);border-radius:10px;padding:10px;color:#ff8a80;font-weight:700;margin-bottom:10px;text-align:center;"></div>' +
        '<button id="gate-btn" type="button">S'inscrire et accéder</button>' +
        '<button type="button" id="gate-back-btn">← Retour</button>' +
      '</div>' +
      '<div id="gate-success" style="display:none;text-align:center;padding:20px 0;">' +
        '<div style="font-size:3rem;margin-bottom:16px;">🙏</div>' +
        '<h3 style="color:#f1c40f;font-size:1.4rem;font-weight:800;margin-bottom:10px;">Bienvenue!</h3>' +
        '<p style="color:rgba(255,255,255,0.75);margin-bottom:24px;">Inscription enregistrée. Vous avez accès à toutes les pages.</p>' +
        '<button id="gate-continue-btn" type="button">Continuer →</button>' +
        '<br><button type="button" id="gate-back-btn2" style="margin-top:10px;background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:50px;color:rgba(255,255,255,0.5);padding:10px 24px;cursor:pointer;font-size:0.9rem;">← Retour</button>' +
      '</div>' +
    '</div>';

  var st = document.createElement('style');
  st.id = 'gate-style';
  st.textContent =
    '#gate-overlay{position:fixed;inset:0;background:rgba(10,5,40,0.93);z-index:99999;display:flex;align-items:flex-end;justify-content:center}' +
    '#gate-card{background:linear-gradient(160deg,#0f0c2e,#1a0a3c);border-radius:20px 20px 0 0;padding:24px 20px 36px;width:100%;max-width:480px;max-height:88vh;overflow-y:auto;border-top:3px solid #f1c40f}' +
    '#gate-header{text-align:center;margin-bottom:18px}' +
    '#gate-logo-wrap{width:60px;height:60px;border-radius:14px;overflow:hidden;margin:0 auto 12px;border:2px solid rgba(241,196,15,0.5);background:#1c1c3c}' +
    '#gate-logo-wrap img{width:100%;height:100%;object-fit:cover}' +
    '#gate-title{color:#f1c40f!important;font-size:1.3rem!important;font-weight:800!important;margin-bottom:6px!important}' +
    '#gate-subtitle{color:rgba(255,255,255,0.75)!important;font-size:0.93rem!important;line-height:1.6!important}' +
    '.gate-field{margin-bottom:12px}' +
    '.gate-field label{display:block;color:#f1c40f;font-weight:700;font-size:0.88rem;margin-bottom:6px}' +
    '.gate-field input{width:100%;padding:12px 14px;border:2px solid rgba(241,196,15,0.3);border-radius:12px;font-size:1rem;color:white;background:rgba(255,255,255,0.08);box-sizing:border-box;font-family:inherit}' +
    '.gate-field input:focus{outline:none;border-color:#f1c40f;background:rgba(255,255,255,0.12)}' +
    '#gate-btn{width:100%;padding:14px;background:linear-gradient(135deg,#f1c40f,#e67e22);color:#0f0c2e;border:none;border-radius:50px;font-size:1.1rem;font-weight:800;cursor:pointer;margin-bottom:10px;font-family:inherit}' +
    '#gate-btn:disabled{opacity:0.6;cursor:not-allowed}' +
    '#gate-back-btn{width:100%;padding:11px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:50px;color:rgba(255,255,255,0.5);font-size:0.9rem;cursor:pointer;font-family:inherit}' +
    '#gate-continue-btn{padding:13px 36px;background:linear-gradient(135deg,#f1c40f,#e67e22);color:#0f0c2e;border:none;border-radius:50px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit}' +
    '@media(min-width:500px){#gate-overlay{align-items:center}#gate-card{border-radius:20px}}';

  document.head.appendChild(st);
  document.body.appendChild(ov);

  // Attach events
  document.getElementById('gate-btn').onclick = gateSubmit;
  document.getElementById('gate-continue-btn').onclick = gateFermer;
  document.getElementById('gate-back-btn').onclick = function() { gateFermer(); history.back(); };
  document.getElementById('gate-back-btn2').onclick = function() { gateFermer(); history.back(); };
}

function montreEkranBloke() {
  document.body.style.overflow = 'hidden';
  var blok = document.createElement('div');
  blok.style.cssText = 'position:fixed;inset:0;background:#0f0c2e;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px';
  blok.innerHTML =
    '<div style="background:linear-gradient(135deg,#1a0a3c,#0d1f4a);border-radius:24px;padding:40px 28px;max-width:400px;width:100%;text-align:center;border-top:4px solid #e74c3c">' +
    '<div style="font-size:3.5rem;margin-bottom:20px">🚫</div>' +
    '<h2 style="color:#ff6b6b;font-size:1.5rem;margin-bottom:12px;font-weight:800">Accès restreint</h2>' +
    '<p style="color:rgba(255,255,255,0.75);font-size:0.95rem;line-height:1.7;margin-bottom:24px">Votre accès a été suspendu. Contactez le Pasteur.</p>' +
    '<a href="tel:+50931573591" style="display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#f1c40f,#e67e22);color:#0f0c2e;padding:14px 28px;border-radius:30px;font-weight:800;font-size:1rem;text-decoration:none">' +
    '<i class="fas fa-phone"></i> +509 31 57 3591</a>' +
    '</div>';
  document.body.appendChild(blok);
}

function gateInit() {
  if (!gateEstInscrit()) {
    montreGate();
    return;
  }
  try {
    var m = JSON.parse(localStorage.getItem(GATE_STORAGE) || '{}');
    if (!m.telephone) return;
    var telKey = m.telephone.replace(/\D/g, '');

    if (window.firebase && firebase.apps && firebase.apps.length) {
      var db = firebase.firestore();
      db.collection('reinscription_required').doc(telKey).get()
        .then(function(doc) {
          if (doc.exists) {
            localStorage.removeItem(GATE_STORAGE);
            db.collection('reinscription_required').doc(telKey).delete();
            montreGate();
            return;
          }
          db.collection('membres').where('telephone', '==', m.telephone).limit(1).get()
            .then(function(snap) {
              if (!snap.empty && snap.docs[0].data().bloque === true) {
                montreEkranBloke();
              }
            }).catch(function() {});
        }).catch(function() {});
    }
  } catch(e) {}
}

gateInit();
