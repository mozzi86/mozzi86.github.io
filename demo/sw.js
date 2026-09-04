// Service worker der BIT-Atelier-Online-Demo — ERZEUGT von scripts/build-sw.mjs.
// Nicht von Hand ändern; der Inhalt entsteht bei jedem `npm run build:demo` neu.
const CACHE = 'bit-atelier-demo-4be99e964671';
const BASIS = '/demo/';
const PRECACHE = [
  "/demo/",
  "/demo/index.html",
  "/demo/assets/index-BJMjgows.css",
  "/demo/assets/index-BwR8Vxpq.js",
  "/demo/assets/motion-BCLExD6E.js",
  "/demo/assets/vendor-yXl-1oZS.js",
  "/demo/assets/planegcs-r8EUavAY.wasm",
  "/demo/assets/web-ifc-DaBphSR1.wasm",
  "/demo/beispiel/README.md",
  "/demo/beispiel/musterprojekt.ids",
  "/demo/beispiel/musterprojekt.ifc",
  "/demo/manifest.webmanifest",
  "/demo/icons/icon-192.png",
  "/demo/icons/icon-512-maskable.png",
  "/demo/icons/icon-512.png"
];

self.addEventListener('install', (e) => {
  // Kein skipWaiting: eine neue Fassung übernimmt erst, wenn der Nutzer sie
  // annimmt (Meldung in der App). Ein stiller Wechsel mitten in der Arbeit
  // hieße halb alte, halb neue Chunks.
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((namen) =>
      Promise.all(namen.filter((n) => n.startsWith('bit-atelier-demo-') && n !== CACHE).map((n) => caches.delete(n))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.typ === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const anfrage = e.request;
  if (anfrage.method !== 'GET') return;

  const url = new URL(anfrage.url);
  // Nur die eigene Herkunft und nur unterhalb von /demo/ — Kartenkacheln und
  // andere Fremdhosts gehören nicht in unseren Cache.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASIS)) return;

  // Gehashte Bau-Artefakte und das Musterprojekt: cache-first. Der Dateiname
  // ändert sich bei jeder Änderung, ein veralteter Treffer ist unmöglich.
  const unveraenderlich = url.pathname.startsWith(BASIS + 'assets/') ||
    url.pathname.startsWith(BASIS + 'beispiel/') ||
    url.pathname.startsWith(BASIS + 'icons/');

  if (unveraenderlich) {
    e.respondWith(
      caches.match(anfrage).then((treffer) =>
        treffer ||
        fetch(anfrage).then((antwort) => {
          if (antwort.ok) {
            const kopie = antwort.clone();
            caches.open(CACHE).then((c) => c.put(anfrage, kopie));
          }
          return antwort;
        }),
      ),
    );
    return;
  }

  // Alles andere (im Wesentlichen das Einstiegsdokument): network-first mit
  // Cache-Rückfall — ohne Netz startet die App aus dem Cache.
  e.respondWith(
    fetch(anfrage)
      .then((antwort) => {
        if (antwort.ok) {
          const kopie = antwort.clone();
          caches.open(CACHE).then((c) => c.put(anfrage, kopie));
        }
        return antwort;
      })
      .catch(() =>
        caches.match(anfrage).then((treffer) => treffer || caches.match(BASIS + 'index.html')),
      ),
  );
});
