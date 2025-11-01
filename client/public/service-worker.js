const CACHE_NAME = 'mgnrega-dashboard-v1';
const DYNAMIC_CACHE = 'mgnrega-dynamic-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // API calls
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then((cache) => cache.put(request, clonedResponse));
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets
  event.respondWith(
    caches.match(request)
      .then((response) => {
        return response || fetch(request)
          .then((fetchResponse) => {
            return caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, fetchResponse.clone());
                return fetchResponse;
              });
          });
      })
      .catch(() => {
        if (request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }
      })
  );
});