self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('pwa-demo-v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/assets/style.css',
                '/assets/material-icons.woff2',
                '/scripts/app.js',
                '/assets/favicon.ico',
                '/assets/karlsruhe-schloss.jpg',
                '/content/home.html',
                '/content/info.html'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
