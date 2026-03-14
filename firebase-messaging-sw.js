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

// Gere notifikasyon lè app la fèmen
messaging.onBackgroundMessage(function(payload) {
  console.log('Notifikasyon background:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body: body,
    icon: icon || '/logo.png',
    badge: '/logo.png'
  });
});
