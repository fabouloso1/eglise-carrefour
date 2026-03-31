// ===== NOTIF.JS — Système Push Notifications =====
// Web Push API avec VAPID

(function() {
  'use strict';

  const VAPID_PUBLIC_KEY = 'BNg-j6snW7gavkDl3yhmlBO2KpRsH4Fd-YM_C5yKPH2JFsHPO3WwOarclIvrR7BHhY9QlsweclnP6slO0BuIFAI';
  const STORAGE_KEY = 'notif_subscribed';

  // Konvèti VAPID key pou Push API
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
  }

  // Verifye si Push Notifications sipòte
  function estSupporte() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }

  // Verifye si deja abonnen
  function dejaAbonne() {
    return localStorage.getItem(STORAGE_KEY) === '1';
  }

  // Abonnen ak Web Push
  async function abonnen() {
    try {
      // Mande pèmisyon
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return null;

      // Jwenn Service Worker
      const reg = await navigator.serviceWorker.ready;

      // Abonnen ak VAPID
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly:      true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      return sub;
    } catch(e) {
      console.log('Push subscribe error:', e);
      return null;
    }
  }

  // Sove abònman nan Firestore
  async function saveSubscription(sub) {
    if (!sub || !window.firebase || !firebase.apps.length) return;
    
    try {
      const subJSON = sub.toJSON();
      const membre  = JSON.parse(localStorage.getItem('eglise_membre') || '{}');
      
      await firebase.firestore().collection('push_subscriptions').add({
        endpoint:   subJSON.endpoint,
        p256dh:     subJSON.keys ? subJSON.keys.p256dh : '',
        auth:       subJSON.keys ? subJSON.keys.auth : '',
        nom:        membre.nom || 'Anonyme',
        telephone:  membre.telephone || '',
        date:       new Date().toLocaleDateString('fr-FR'),
        timestamp:  firebase.firestore.FieldValue.serverTimestamp()
      });

      localStorage.setItem(STORAGE_KEY, '1');
      console.log('Push subscription saved!');
      return true;
    } catch(e) {
      console.log('Save subscription error:', e);
      return false;
    }
  }

  // Aktive notifikasyon — rele sa lè moun klike bouton
  window.activerNotifications = async function() {
    if (!estSupporte()) {
      alert('Votre navigateur ne supporte pas les notifications push.');
      return false;
    }

    if (Notification.permission === 'denied') {
      alert('❌ Notifications bloquées.\n\nAllez dans les paramètres de votre navigateur et activez les notifications pour ce site.');
      return false;
    }

    const sub = await abonnen();
    if (!sub) return false;

    const saved = await saveSubscription(sub);
    return saved;
  };

  // Expose estat
  window.notifEstAbonne  = dejaAbonne;
  window.notifEstSupporte = estSupporte;
  window.notifPermission = function() { return Notification.permission; };

  // Enregistre Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/eglise-carrefour/sw.js', {
      scope: '/eglise-carrefour/'
    }).catch(e => console.log('SW error:', e));
  }

})();
