// ⚠️ BỎ CACHE HOÀN TOÀN
self.addEventListener('install', function(event) {
  // Không cache gì cả
  self.skipWaiting(); // kích hoạt ngay lập tức
});

self.addEventListener('activate', function(event) {
  // Xóa mọi cache cũ (nếu có)
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', function(event) {
  // Luôn fetch từ mạng, không dùng cache
  event.respondWith(fetch(event.request));
});
