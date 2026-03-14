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
  const title = (payload.notification && payload.notification.title) || 'Eglise de Dieu de la Prophetie';
  const body  = (payload.notification && payload.notification.body)  || '';
  const link  = (payload.fcmOptions && payload.fcmOptions.link)
                || (payload.data && payload.data.link)
                || 'https://fabouloso1.github.io/eglise-carrefour/Galerie.html#pasteur';

  self.registration.showNotification(title, {
    body: body,
    icon: '/eglise-carrefour/logo.png',
    badge: '/eglise-carrefour/logo.png',
    data: { url: link }
  });
});

// Ouvri lyen lè moun klike sou notifikasyon an
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url)
            || 'https://fabouloso1.github.io/eglise-carrefour/Galerie.html#pasteur';
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
