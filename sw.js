// ===== SERVICE WORKER — Église de Carrefour =====
const CACHE_NAME = 'eglise-carrefour-v1';

const FICHIERS_CACHE = [
  '/eglise-carrefour/index.html',
  '/eglise-carrefour/style.css',
  '/eglise-carrefour/nav.js',
  '/eglise-carrefour/lang.js',
  '/eglise-carrefour/manifest.json',
  '/eglise-carrefour/logo.png',
  '/eglise-carrefour/Apropos.html',
  '/eglise-carrefour/Contact.html',
  '/eglise-carrefour/priere.html',
  '/eglise-carrefour/Horaires.html',
  '/eglise-carrefour/Actualites.html',
  '/eglise-carrefour/Galerie.html',
  '/eglise-carrefour/Temoigner.html',
  '/eglise-carrefour/don.html',
];

// Installation — cache fichye prensipal yo
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FICHIERS_CACHE).catch(err => {
        console.log('Cache partiel:', err);
      });
    })
  );
  self.skipWaiting();
});

// Aktivasyon — efase vye cache yo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — sèvi depi cache si pa gen entènèt
self.addEventListener('fetch', event => {
  // Sèlman pou GET requests
  if (event.request.method !== 'GET') return;

  // Pa cache Firebase/Cloudinary/external APIs
  const url = event.request.url;
  if (url.includes('firestore') || url.includes('cloudinary') ||
      url.includes('firebase') || url.includes('googleapis') ||
      url.includes('gstatic') || url.includes('cdnjs')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache nouvo resous HTML/CSS/JS
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Si offline ak pa nan cache — retounen index
        if (event.request.destination === 'document') {
          return caches.match('/eglise-carrefour/index.html');
        }
      });
    })
  );
});
