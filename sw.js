const CACHE_NAME = 'eglise-carrefour-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/nav.js',
  '/Apropos.html',
  '/Galerie.html',
  '/priere.html',
  '/Contact.html',
  '/don.html',
  '/Actualites.html',
  '/Temoigner.html',
  '/Horaires.html',
  '/logo.png'
];

// Enstale service worker ak cache fichye yo
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktive ak netwaye vye cache yo
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

// Sèvi paj yo — si pa gen entènèt, itilize cache
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
