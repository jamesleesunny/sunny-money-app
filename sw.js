self.addEventListener('install', event => {
  event.waitUntil(caches.open('sunny-money-v1').then(cache => cache.addAll([
    './',
    './index.html',
    './manifest.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png'
  ])));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
      const copy = resp.clone();
      caches.open('sunny-money-v1').then(cache => cache.put(event.request, copy));
      return resp;
    }).catch(() => cached))
  );
});
