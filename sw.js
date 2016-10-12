self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('pwa-demo-v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/vendor/bootstrap/css/bootstrap.min.css',
                '/vendor/bootstrap-material-design/css/bootstrap-material-design.min.css',
                '/vendor/jquery/jquery.min.js',
                '/vendor/bootstrap/js/bootstrap.min.js',
                '/vendor/bootstrap-material-design/js/material.min.js',
                '/scripts/app.js',
                '/manifest.json'
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
