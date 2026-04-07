// ===== GATE.JS — Sistèm Enskripsyon ak Aksè =====

var GATE_STORAGE = 'eglise_membre';

function gateSubmit() {
  var nom = document.getElementById('gate-nom').value.trim();
  var tel = document.getElementById('gate-tel').value.trim();
  var vil = document.getElementById('gate-ville').value.trim();
  var err = document.getElementById('gate-error');
  var btn = document.getElementById('gate-btn');

  if (!nom || !tel || !vil) { 
    err.style.display='block'; 
    err.textContent='Tanpri ranpli tout bwat yo.'; 
    return; 
  }

  err.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Y ap sove...';

  var doneMounNan = {
    nom: nom, 
    telephone: tel, 
    ville: vil,
    date: new Date().toLocaleDateString('fr-FR')
  };

  // Voye done yo nan Firebase
  fetch('https://firestore.googleapis.com/v1/projects/eglise-carrefour/databases/(default)/documents/membres', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        nom: { stringValue: nom },
        telephone: { stringValue: tel },
        ville: { stringValue: vil },
        date: { stringValue: doneMounNan.date },
        timestamp: { stringValue: new Date().toISOString() }
      }
    })
  })
  .then(function() {
    localStorage.setItem(GATE_STORAGE, JSON.stringify(doneMounNan));
    document.getElementById('gate-form').style.display = 'none';
    document.getElementById('gate-success').style.display = 'block';
  })
  .catch(function() {
    localStorage.setItem(GATE_STORAGE, JSON.stringify(doneMounNan));
    document.getElementById('gate-form').style.display = 'none';
    document.getElementById('gate-success').style.display = 'block';
  });
}

function openAdmin() {
  var pass = prompt("Antre modpas administratè a :");
  if (pass === "1234") { 
    window.location.href = "admin.html";
  } else if (pass !== null) {
    alert("Modpas sa a pa bon !");
  }
}
