const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
    '/',
    'index.html',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .catch(error => console.error('Error al precachear archivos:', error))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(error => console.error('Error al interceptar la solicitud:', error))
    );
});
