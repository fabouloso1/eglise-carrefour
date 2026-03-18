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
