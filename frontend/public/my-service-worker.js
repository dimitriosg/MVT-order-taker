/* eslint-disable */

// Files to cache
const cacheName = 'v1';
const cacheAssets = [
  '/index.html',
  '/style.css',  // your css file
  '/main.js'    // your main js file
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
        .open(cacheName)
        .then((cache) => {
            console.log(`Service Worker: Caching Files: ${cache}`);
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});
  
// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Activate event: clear old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== cacheName) {
              console.log(`Service Worker: Clearing Old Cache: ${cache}`);
              return caches.delete(cache);
            }
          })
        );
      })
    );
});