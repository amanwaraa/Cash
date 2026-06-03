const CACHE_NAME = 'oscar-pwa-v3';
const ASSETS = [
  "./",
  "login.html",
  "index.html",
  "cashier.html",
  "products.html",
  "customers.html",
  "accounts.html",
  "suppliers.html",
  "invoices.html",
  "expenses.html",
  "inventory.html",
  "finance.html",
  "analytics.html",
  "notifications.html",
  "employees.html",
  "settings.html",
  "mobile-scanner.html",
  "manifest.json",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then(res => {
    const copy = res.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(()=>{});
    return res;
  }).catch(() => caches.match(event.request).then(res => res || caches.match('login.html'))));
});
