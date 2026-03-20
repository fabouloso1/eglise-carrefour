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
  var title = (payload.notification && payload.notification.title) || 'Eglise de Dieu de la Prophetie';
  var body  = (payload.notification && payload.notification.body)  || '';
  var link  = (payload.fcmOptions && payload.fcmOptions.link)
              || (payload.data && payload.data.link)
              || 'https://fabouloso1.github.io/eglise-carrefour/index.html';
  var type  = (payload.data && payload.data.type) || 'default';

  // Options notifikasyon selon tip
  var options = {
    body: body,
    icon: '/eglise-carrefour/logo.png',
    badge: '/eglise-carrefour/logo.png',
    data: { url: link },
    requireInteraction: false
  };

  // Sonnerie espesyal pou etude a
  if (type === 'etude') {
    options.vibrate = [200, 100, 200, 100, 400];
    options.tag = 'etude-biblique';
    options.requireInteraction = true;
    options.actions = [
      { action: 'ouvrir', title: 'Rejoindre l\'étude' },
      { action: 'fermer', title: 'Plus tard' }
    ];
  }
  // Notif 9h lekti
  else if (type === 'lecture') {
    options.vibrate = [300, 100, 300];
    options.tag = 'lecture-9h';
    options.actions = [
      { action: 'ouvrir', title: 'Lire maintenant' }
    ];
  }
  // Annonce
  else if (type === 'annonce') {
    options.vibrate = [100, 50, 100];
    options.tag = 'annonce';
  }
  // Foto
  else if (type === 'foto') {
    options.vibrate = [100];
    options.tag = 'nouvelle-photo';
  }

  self.registration.showNotification(title, options);
});

// Ouvri lyen lè moun klike sou notifikasyon an
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url)
            || 'https://fabouloso1.github.io/eglise-carrefour/index.html';

  // Si klike sou aksyon "fermer"
  if (event.action === 'fermer') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.indexOf('fabouloso1.github.io') >= 0 && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
