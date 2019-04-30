
var CACHE_NAME = 'prueba-cache-v1';
var urlsToCache = [
  'img/portfolio/thumbnails/1.jpg',
  'img/portfolio/thumbnails/2.jpg',
  'img/portfolio/thumbnails/3.jpg',
  'img/portfolio/thumbnails/4.jpg',
  'img/portfolio/thumbnails/5.jpg',
  'img/portfolio/thumbnails/6.jpg',
  'js/index.js',
  'internet.html',
  'css/estilos.css'
];

/* Al cargar la pagina se guardan en cache los archivos. */
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) { 
          if(response != undefined) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(error => {
          console.log('Fetch failed: ' + error);
          return caches.match('internet.html');
        });
        return response || fetchPromise;
      })
    })
  );
});
