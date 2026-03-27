// Service Worker — Église de Carrefour
const VERSION = 'v2026';
const CACHE   = 'eglise-' + VERSION;

const ASSETS = [
  '/eglise-carrefour/',
  '/eglise-carrefour/index.html',
  '/eglise-carrefour/style.css',
  '/eglise-carrefour/nav.js',
  '/eglise-carrefour/logo.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (url.includes('firestore') || url.includes('firebase') ||
      url.includes('cloudinary') || url.includes('googleapis') ||
      url.includes('getbible')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
