// ===== GATE.JS — Sistèm Aksè ak Notifikasyon =====

var GATE_STORAGE = 'eglise_membre';

// 1. Konfigirasyon Firebase (Piske gate.js chaje separeman)
const firebaseConfigGate = {
  apiKey: "AIzaSyBg9wUQyE7gikWOXryjWOuy-3G32tnqZtM",
  authDomain: "eglise-carrefour.firebaseapp.com",
  projectId: "eglise-carrefour",
  storageBucket: "eglise-carrefour.firebasestorage.app",
  messagingSenderId: "421333694767",
  appId: "1:421333694767:web:30c18da36ae020821a49da"
};

// Inisyalize si l poko fè sa
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfigGate);
}
const db = firebase.firestore();

// Verifye si moun nan enskri
function gateEstInscrit() {
  try {
    var d = JSON.parse(localStorage.getItem(GATE_STORAGE) || '{}');
    return !!(d.nom && d.telephone);
  } catch(e) { return false; }
}

// Fonksyon pou mande pèmisyon Notifikasyon
async function aktiveNotifikasyon(tel) {
  if (!('serviceWorker' in navigator)) return;

  try {
    const messaging = firebase.messaging();
    // Mande pèmisyon nan navigatè a
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const token = await messaging.getToken({
        validVapidKey: 'BLe-Z-YOUR_PUBLIC_VAPID_KEY_IF_NEEDED' // Ou ka jwenn sa nan Firebase Console
      });

      if (token) {
        // Sove token an nan Firestore pou Pastè a ka voye mesaj la
        await db.collection('tokens_notif').doc(tel.replace(/\D/g, '')).set({
          token: token,
          nom: JSON.parse(localStorage.getItem(GATE_STORAGE)).nom,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Notifikasyon aktive!");
      }
    }
  } catch (err) {
    console.log("Erè notifikasyon:", err);
  }
}

// Soumèt fòm enskripsyon
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

  // 1. Sove lokalman
  localStorage.setItem(GATE_STORAGE, JSON.stringify({
    nom: nom, telephone: tel, date: new Date().toLocaleDateString('fr-FR')
  }));

  // 2. Sove nan Firebase
  try {
    await db.collection('membres').doc(tel.replace(/\D/g, '')).set({
      nom: nom,
      telephone: tel,
      dateInscription: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 3. Mande pou aktive notifikasyon
    await aktiveNotifikasyon(tel);

    // Relanse paj la pou debloke kontni an
    window.location.reload();
  } catch (e) {
    btn.disabled = false;
    btn.innerHTML = 'Entrer';
    alert("Erè koneksyon. Verifye entènèt ou.");
  }
}

// Montre bwat enskripsyon an si li pa enskri
function montreGate() {
  if (document.getElementById('gate-overlay')) return;

  var div = document.createElement('div');
  div.id = 'gate-overlay';
  div.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:#1c1c3c;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;color:white;text-align:center;";
  
  div.innerHTML = `
    <div style="max-width:400px; width:100%;">
      <img src="logo.png" style="width:80px;margin-bottom:20px;">
      <h2>Byenvini nan Legliz la</h2>
      <p>Tanpri antre enfòmasyon ou pou w ka jwenn aksè epi resevwa anons Pastè a.</p>
      <input type="text" id="gate-nom" placeholder="Non ou" style="width:100%;padding:12px;margin:10px 0;border-radius:8px;border:none;">
      <input type="tel" id="gate-tel" placeholder="Telefòn ou" style="width:100%;padding:12px;margin:10px 0;border-radius:8px;border:none;">
      <div id="gate-error" style="color:#ff4757;display:none;margin-bottom:10px;font-size:14px;"></div>
      <button id="gate-btn" onclick="gateSubmit()" style="width:100%;padding:15px;background:#f1c40f;color:#1c1c3c;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">ENTRER</button>
    </div>
  `;
  document.body.appendChild(div);
}

function gateInit() {
  if (!gateEstInscrit()) {
    montreGate();
  }
}

// Lanse verifikasyon an
gateInit();
