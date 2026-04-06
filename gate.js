// ===== GATE.JS — Système d'accès Korije =====

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
  var btn = document.getElementById('gate-btn');

  // Validasyon fòm nan
  if (!nom) { 
    err.style.display='block'; 
    err.textContent='Veuillez saisir votre nom.'; 
    return; 
  }
  if (!tel || tel.replace(/\D/g,'').length < 8) { 
    err.style.display='block'; 
    err.textContent='Numéro invalide (8 chiffres minimum).'; 
    return; 
  }
  
  err.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Enregistrement...';

  var doneMoun Nan = {
    nom: nom, 
    telephone: tel, 
    ville: vil,
    date: new Date().toLocaleDateString('fr-FR')
  };

  // Sove nan telefòn moun nan dabò
  localStorage.setItem(GATE_STORAGE, JSON.stringify(doneMoun Nan));

  // Voye done yo sou Firebase
  fetch('https://firestore.googleapis.com/v1/projects/eglise-carrefour/databases/(default)/documents/membres', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        nom: { stringValue: nom },
        telephone: { stringValue: tel },
        ville: { stringValue: vil },
        date: { stringValue: doneMoun Nan.date },
        timestamp: { stringValue: new Date().toISOString() }
      }
    })
  })
  .then(function() {
    console.log("Sove nan Firebase ak siksè");
  })
  .catch(function(error) {
    console.error("Erè Firebase: ", error);
  })
  .finally(function() {
    // Menm si gen erè entènèt, nou montre mesaj siksè a pou moun nan ka antre
    var form = document.getElementById('gate-form');
    var success = document.getElementById('gate-success');
    if(form) form.style.display = 'none';
    if(success) success.style.display = 'block';
  });
}

function gateAfficherBlocage() {
  var blok = document.createElement('div');
  blok.id = 'gate-overlay';
  blok.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#0f0c2e;z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px';
  blok.innerHTML = '<div style="background:linear-gradient(180deg,#1c1c3c,#0d1f4a);border-radius:24px;padding:40px 28px;max-width:400px;width:100%;text-align:center;border-top:4px solid #e74c3c">' +
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
    // Si moun nan poko enskri, nou pa bezwen bloke l, fòm nan ap parèt nan HTML la
    return;
  }
  // Si li enskri, ou ka ajoute lòt verifikasyon isit la si sa nesesè
}

// Lese fòm nan tcheke lè paj la chaje
window.addEventListener('load', gateInit);
