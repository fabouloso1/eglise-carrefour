importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBg9wUQyE7gikWOXryjWOuy-3G32tnqZtM",
  authDomain: "eglise-carrefour.firebaseapp.com",
  projectId: "eglise-carrefour",
  storageBucket: "eglise-carrefour.firebasestorage.app",
  messagingSenderId: "421333694767",
  appId: "1:421333694767:web:30c18da36ae020821a49da"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Notifikasyon background:', payload);
  const title = payload.notification?.title || 'Église de Dieu de la Prophétie';
  const body = payload.notification?.body || '';
  const icon = payload.notification?.icon || '/eglise-carrefour/logo.png';
  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    badge: '/eglise-carrefour/logo.png'
  });
});
