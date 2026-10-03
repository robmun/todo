/* To Do Jassie – service worker
   1. Bewaart de app zodat hij ook zonder internet opent.
   2. Ontvangt pushmeldingen via Firebase Cloud Messaging.
   Pas CACHE aan bij elke nieuwe versie van de app. */
const CACHE = "todo-jassie-26.10.8";
const SHELL = ["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "favicon.png", "icon-192.png", "icon-512.png"];
const EXTERN = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];

/* ---- pushmeldingen ---- */
try {
  importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
                "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
  firebase.initializeApp({
  apiKey: "AIzaSyDxb_1PUgsSEL8sYlLZ_tzzj5iBLhpLo24",
  authDomain: "to-do-jasmijn.firebaseapp.com",
  projectId: "to-do-jasmijn",
  storageBucket: "to-do-jasmijn.firebasestorage.app",
  messagingSenderId: "853734829865",
  appId: "1:853734829865:web:465b0da8e9a570ee4a9138"
});
  firebase.messaging(); // toont meldingen automatisch als de app dicht is
} catch (e) { /* zonder internet bij de allereerste keer: meldingen later */ }

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) { if ("focus" in c) return c.focus(); }
    return clients.openWindow("./");
  })());
});

/* ---- offline ---- */
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const eigen = url.origin === location.origin;
  if (!eigen && !EXTERN.includes(url.hostname)) return; // Firestore e.d. niet aanraken

  // De app zelf: eerst online (zodat updates direct binnenkomen), anders uit de cache
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        const c = await caches.open(CACHE); c.put("index.html", res.clone());
        return res;
      } catch (_) {
        return (await caches.match("index.html")) || (await caches.match("./")) || Response.error();
      }
    })());
    return;
  }
  // Overige bestanden: direct uit de cache, op de achtergrond bijwerken
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req);
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(() => null);
    return hit || (await net) || Response.error();
  })());
});
