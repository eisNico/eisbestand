const CACHE_NAME = 'eistabelle-cache-v1';
const urlsToCache = [
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Leite alle Varianten von index.html (z. B. mit Parametern) auf den Cache um
  if (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      caches.match('/index.html').then(response => {
        return response || fetch(event.request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request);
    })
  );
});

    })
  );
});
