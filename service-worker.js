importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) 
  console.log(`Workbox berhasil dimuat`);

else 
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/article.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/notification.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/slider.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/preloader.js', revision: '1' },
    { url: '/images/icon/icon.png', revision: '1' },
    { url: '/images/icon/48x48.png', revision: '1' },
    { url: '/images/icon/96x96.png', revision: '1' },
    { url: '/images/icon/192x192.png', revision: '1' },
    { url: '/images/1.jpg', revision: '1' },
    { url: '/images/2.png', revision: '1' },
    { url: '/images/slider/3.jpg', revision: '1' },
    { url: '/images/slider/5.png', revision: '1' },
    { url: '/images/slider/7.jpg', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'apifootball'
    })
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Hello';
    }
    var options = {
        body: body,
        icon: 'images/icon/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});