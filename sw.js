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
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function (event) {
    // Clean-up stuff
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache first
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function (event) {
    event.waitUntil(
        self.registration.showNotification('New Notification', {
            body: 'Please come back!',
            icon: '/assets/launcher-icon-3x.png'
        })
    );
});
