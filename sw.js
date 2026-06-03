const CACHE_NAME = 'oscar-v6.4.6-admin-company-keys';
const PRECACHE = [
  "./",
  "index.html",
  "dashboard.html",
  "cashier.html",
  "customers.html",
  "accounts.html",
  "suppliers.html",
  "products.html",
  "invoices.html",
  "expenses.html",
  "inventory.html",
  "finance.html",
  "analytics.html",
  "notifications.html",
  "mobile-scanner.html",
  "manifest.json",
  "sw.js",
  "README.md",
  "DATABASE_STRUCTURE.md",
  "firestore.rules",
  "database.rules.json",
  "employees.html",
  "settings.html",
  "login.html",
  "admin.html",
  "icon-192.png",
  "icon-512.png",
  "app-version.json",
  "offline-update.js",
  "firestore.secure.rules"
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE.map(u => new Request(u, {cache:'reload'}))).catch(()=>null));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  // لا نلمس Firebase أو أي طلب خارجي؛ هذا كان يسبب كاش ونتائج مزامنة قديمة/فاشلة.
  if(url.origin !== self.location.origin) {
    event.respondWith(fetch(req, {cache:'no-store'}));
    return;
  }
  if(url.pathname.endsWith('/app-version.json') || url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname.endsWith('.json')) {
    event.respondWith(fetch(req, {cache:'reload'}).then(res => { const copy=res.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)); return res; }).catch(()=>caches.match(req).then(r=>r || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => { const copy=res.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)); return res; }).catch(()=>caches.match('./index.html'))));
});