// Service Worker — Église de Carrefour
// Chanje VERSION chak fwa ou fè yon nouvo deploy
const VERSION = 'v' + Date.now();
const CACHE = 'eglise-' + VERSION;

// Enstale — pa cache anyen, toujou chaje depi rezo
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Aktive — efase TOUT vye cache yo
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — toujou chaje depi rezo (network first)
// Si pa gen koneksyon — sèvi cache
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  
  // Pa cache API calls externes
  const url = e.request.url;
  if (url.includes('firestore') || url.includes('cloudinary') ||
      url.includes('firebase') || url.includes('googleapis') ||
      url.includes('onesignal') || url.includes('gtag')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Sove nan cache pou offline
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// ===== NOTIFIKASYON 9H CHAK JOU =====
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_DAILY') {
    const { title, body, url } = e.data;
    // Kalkile konbyen milisegond rete jiska 9h demen
    const now   = new Date();
    const next9 = new Date();
    next9.setHours(9, 0, 0, 0);
    if (now.getHours() >= 9) next9.setDate(next9.getDate() + 1);
    const ms = next9 - now;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body, icon: '/eglise-carrefour/logo.png',
        badge: '/eglise-carrefour/logo.png',
        data: { url }
      });
    }, ms);
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || '/eglise-carrefour/Guide.html';
  e.waitUntil(clients.openWindow(url));
});
