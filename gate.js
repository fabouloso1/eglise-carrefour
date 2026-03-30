// ===== GATE.JS — Sistèm Aksè ak Notifikasyon =====

var GATE_STORAGE = 'eglise_membre';

// 1. Konfigirasyon Firebase (Piske gate.js bezwen l pou sove manm yo)
const firebaseConfigGate = {
  apiKey: "AIzaSyBg9wUQyE7gikWOXryjWOuy-3G32tnqZtM",
  authDomain: "eglise-carrefour.firebaseapp.com",
  projectId: "eglise-carrefour",
  storageBucket: "eglise-carrefour.firebasestorage.app",
  messagingSenderId: "421333694767",
  appId: "1:421333694767:web:30c18da36ae020821a49da"
};

// Inisyalize Firebase si l poko fè sa
if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfigGate);
}
const db = firebase.firestore();

// Verifye si moun nan enskri deja
function gateEstInscrit() {
  try {
    var d = JSON.parse(localStorage.getItem(GATE_STORAGE) || '{}');
    return !!(d.nom && d.telephone);
  } catch(e) { return false; }
}

// Fonksyon pou aktive Notifikasyon ak sove Token an
async function aktiveNotifikasyon(tel, non) {
  if (!('serviceWorker' in navigator)) return;

  try {
    const messaging = firebase.messaging();
    
    // Mande navigatè a pèmisyon
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Pran Token inik telefòn lan
      const token = await messaging.getToken();

      if (token) {
        // Sove token nan Firestore nan koleksyon 'tokens_notif'
        await db.collection('tokens_notif').doc(tel.replace(/\D/g, '')).set({
          token: token,
          nom: non,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Notifikasyon aktive pou: " + non);
      }
    }
  } catch (err) {
    console.log("Erè pèmisyon notif:", err);
  }
}

// Lè moun nan klike sou bouton ENTRER
async function gateSubmit() {
  var nom = document.getElementById('gate-nom').value.trim();
  var tel = document.getElementById('gate-tel').value.trim();
  var err = document.getElementById('gate-error');

  if (!nom || !tel) {
    err.style.display = 'block';
    err.textContent = '⚠️ Tanpri ranpli tout chan yo.';
    return;
  }

  var btn = document.getElementById('gate-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';

  // 1. Sove nan telefòn nan (localStorage)
  localStorage.setItem(GATE_STORAGE, JSON.stringify({
    nom: nom, telephone: tel, date: new Date().toLocaleDateString('fr-FR')
  }));

  try {
    // 2. Sove nan Firebase nan lis manm yo
    await db.collection('membres').doc(tel.replace(/\D/g, '')).set({
      nom: nom,
      telephone: tel,
      dateInscription: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 3. DEKLANCHE DEMANN NOTIFIKASYON AN
    await aktiveNotifikasyon(tel, nom);

    // Relanse paj la pou debloke rès sit la
    window.location.reload();
  } catch (e) {
    btn.disabled = false;
    btn.innerHTML = 'ENTRER';
    alert("Gen yon pwoblèm koneksyon. Verifye entènèt ou.");
  }
}

// Montre bwat enskripsyon an si moun nan poko enskri
function montreGate() {
  if (document.getElementById('gate-overlay')) return;

  var div = document.createElement('div');
  div.id = 'gate-overlay';
  div.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:#1c1c3c;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;color:white;text-align:center;font-family:sans-serif;";
  
  div.innerHTML = `
    <div style="max-width:400px; width:100%; background:rgba(255,255,255,0.05); padding:30px; border-radius:15px; border:1px solid rgba(255,255,255,0.1);">
      <h2 style="margin-bottom:10px;">Byenvini</h2>
      <p style="font-size:14px; opacity:0.8; margin-bottom:20px;">Antre enfòmasyon ou pou w ka jwenn aksè ak tout anons Legliz la.</p>
      <input type="text" id="gate-nom" placeholder="Non ou" style="width:100%;padding:12px;margin:10px 0;border-radius:8px;border:none;outline:none;">
      <input type="tel" id="gate-tel" placeholder="Telefòn ou" style="width:100%;padding:12px;margin:10px 0;border-radius:8px;border:none;outline:none;">
      <div id="gate-error" style="color:#ff4757;display:none;margin-bottom:10px;font-size:13px;"></div>
      <button id="gate-btn" onclick="gateSubmit()" style="width:100%;padding:15px;background:#f1c40f;color:#1c1c3c;border:none;border-radius:8px;font-weight:bold;cursor:pointer;font-size:16px;">ENTRER</button>
    </div>
  `;
  document.body.appendChild(div);
}

function gateInit() {
  if (!gateEstInscrit()) {
    montreGate();
  }
}

// Lanse sistèm nan
gateInit();
