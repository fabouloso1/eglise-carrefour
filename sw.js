// Service Worker — Église de Carrefour
// Push Notifications + Cache

const VERSION = 'v2026-notif';
const CACHE   = 'eglise-' + VERSION;

const ASSETS = [
  '/eglise-carrefour/',
  '/eglise-carrefour/index.html',
  '/eglise-carrefour/style.css',
  '/eglise-carrefour/logo.png'
];

// ===== INSTALL =====
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
  );
});

// ===== ACTIVATE =====
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ===== FETCH (cache) =====
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
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// ===== PUSH NOTIFICATION =====
self.addEventListener('push', e => {
  if (!e.data) return;
  
  let data = {};
  try { data = e.data.json(); } catch(err) { data = { title: e.data.text() }; }

  const title   = data.title   || 'Église de la Prophétie';
  const body    = data.body    || 'Nouveau message';
  const icon    = data.icon    || '/eglise-carrefour/logo.png';
  const badge   = data.badge   || '/eglise-carrefour/logo.png';
  const url     = data.url     || '/eglise-carrefour/';
  const tag     = data.tag     || 'eglise-notif';

  e.waitUntil(
    self.registration.showNotification(title, {
      body, icon, badge, tag,
      data: { url },
      vibrate: [200, 100, 200],
      requireInteraction: false
    })
  );
});

// ===== CLIC SOU NOTIF =====
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url)
    ? e.notification.data.url
    : '/eglise-carrefour/';

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(wins => {
        for (const win of wins) {
          if (win.url.includes('eglise-carrefour') && 'focus' in win) {
            win.navigate(url);
            return win.focus();
          }
        }
        return clients.openWindow(url);
      })
  );
});
