#!/usr/bin/env node
// Erzeugt /en/index.html und /ar/index.html aus der deutschen Startseite
// (Phase 65-06, Paket W-2).
//
// Warum: Die Seite spricht drei Sprachen, aber die Uebersetzung passierte
// ausschliesslich im Browser — die Adresse aenderte sich nie. Damit war zwei
// Drittel der Uebersetzungsarbeit weder verlinkbar noch fuer Suchmaschinen
// sichtbar: ein Generalplaner konnte die englische Fassung nicht an einen
// Partner weiterschicken, die arabische fand niemand.
//
// Warum mit einem Browser und nicht mit einem HTML-Parser: sprachen.js
// uebersetzt ueber das DOM (Blattknoten suchen, innerHTML ersetzen). Diese Logik
// nachzubauen hiesse, eine zweite Wahrheit zu schaffen, die beim naechsten
// Wortlaut-Wechsel auseinanderlaeuft. Also laeuft das echte Skript im echten
// Browser, und das Ergebnis wird eingefroren.
//
// Rein:  index.html + assets/js/sprachen.js (+ sprachen.en.js / sprachen.ar.js, nachgeladen)
// Raus:  en/index.html, ar/index.html — je mit eigenem canonical, wechselseitigem
//        hreflang, passendem lang/dir und auf ../ umgebogenen relativen Pfaden.
//
// Der Lauf ist wiederholbar: gleiche Quelle, gleiches Ergebnis.
//
// Aufruf: node tools/sprachkopien-erzeugen.mjs

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { setTimeout as sleep } from 'node:timers/promises';
import { createRequire } from 'node:module';
import { SEITEN, adresse } from './seiten.mjs';

// Playwright liegt im App-Repo; die Website bleibt abhaengigkeitsfrei.
// Ausserhalb des eigenen Rechners (Cloud-Sitzung, CI) zeigt BIT_APP_REPO auf ein
// beliebiges Verzeichnis mit installiertem playwright oder playwright-core, und
// BIT_CHROMIUM auf eine feste Chromium-Datei, falls die Playwright-Fassung nicht
// zum vorinstallierten Browser passt.
const APP_REPO = process.env.BIT_APP_REPO || 'C:/Users/Asus TUF Z590 P Wifi/My Drive/bit-atelier-app';
const require = createRequire(path.join(APP_REPO, 'package.json'));
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('playwright-core')); }

const WURZEL = path.resolve(import.meta.dirname, '..');
const PORT = 4188;
const BASIS = `http://localhost:${PORT}/`;

const SPRACHEN = [
  { code: 'en', dir: 'ltr', ogLocale: 'en_US' },
  { code: 'ar', dir: 'rtl', ogLocale: 'ar_AR' },
];

/* Eigener winziger Static-Server statt vite preview: der laesst sich nicht auf
   ein Verzeichnis ausserhalb seines Projekts richten. Reicht voellig — es geht
   nur darum, dem Browser die Seite unter http:// zu servieren, damit Module und
   importmap so laufen wie spaeter auf der echten Domain. */
const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
  '.ifc': 'text/plain', '.ids': 'application/xml', '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  const roh = decodeURIComponent((req.url || '/').split('?')[0]);
  let datei = path.join(WURZEL, roh);
  if (roh.endsWith('/')) datei = path.join(datei, 'index.html');
  // Kein Ausbruch aus dem Wurzelverzeichnis.
  if (!path.resolve(datei).startsWith(path.resolve(WURZEL))) {
    res.writeHead(403).end('verboten');
    return;
  }
  fs.readFile(datei, (fehler, inhalt) => {
    if (fehler) { res.writeHead(404).end('nicht gefunden'); return; }
    res.writeHead(200, { 'Content-Type': TYPEN[path.extname(datei)] || 'application/octet-stream' });
    res.end(inhalt);
  });
});

async function warteAufServer() {
  await new Promise((res) => server.listen(PORT, res));
  for (let i = 0; i < 30; i++) {
    try { if ((await fetch(BASIS)).ok) return true; } catch { /* warten */ }
    await sleep(200);
  }
  return false;
}

/**
 * Biegt die relativen Verweise einer Kopie in en/ oder ar/ eine Ebene hoeher.
 * Absolute Pfade (/assets/…) und vollstaendige URLs bleiben unberuehrt.
 * @param {string} html
 * @returns {string}
 */
function pfadeAnheben(html) {
  return html
    .replace(/(\s(?:href|src|content)=")(?!https?:|\/|#|data:|mailto:|\.\.\/)(assets\/)/g, '$1../$2')
    .replace(/(\s(?:href|src)=")(?!https?:|\/|#|data:|mailto:|\.\.\/)(downloads\/)/g, '$1../$2')
    .replace(/("imports":\s*\{\s*"three":\s*")\.\//g, '$1../')
    /* Schriften und Hintergrundbilder stehen in url(...) im eingebetteten CSS —
       ohne diese Zeile laufen sie in der Kopie ins Leere (Befund aus dem ersten
       Lauf: 404 auf ibmplexsansarabic-*.woff2 und die Bauablauf-Bilder). */
    .replace(/url\((['"]?)(?!https?:|\/|data:|\.\.\/)(assets\/)/g, 'url($1../$2')
    /* srcset traegt MEHRERE Pfade in einem Attribut ("…-800.jpg 800w, ….jpg 1600w").
       Die Attribut-Regel oben erwischt nur den ersten — der zweite lief ins Leere
       (Befund aus dem zweiten Lauf: 404 auf die 1600w-Fassungen). */
    .replace(/\ssrcset="([^"]*)"/g, (_treffer, wert) =>
      ' srcset="' + wert.replace(/(^|,\s*)(?!https?:|\/|data:|\.\.\/)(assets\/)/g, '$1../$2') + '"');
}

/** Escapes text for an HTML attribute. */
const attr = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * Sets canonical, og:url and og:locale of the copy, and (69-10) the meta
 * description, og/twitter description from tools/seiten.mjs and og/twitter title
 * from the translated <title> — sprachen.js does not touch <head>, so until 69-10
 * the English and Arabic copies carried the German description.
 * The hreflang set is the same in every language and stays as it is.
 * @param {string} html
 * @param {{code:string, ogLocale:string}} sprache
 * @param {import('./seiten.mjs').Seite} seiteDef
 * @param {string} titel  translated document title
 * @returns {string}
 */
function kopfSetzen(html, sprache, seiteDef, titel) {
  const eigen = adresse(seiteDef, sprache.code);
  const besch = attr(seiteDef.beschreibung[sprache.code]);
  const t = attr(titel);
  const regeln = [
    [/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${eigen}">`],
    [/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${eigen}">`],
    [/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${sprache.ogLocale}">`],
    [/<meta name="description" content="[^"]*">/, `<meta name="description" content="${besch}">`],
    [/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${besch}">`],
    [/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${besch}">`],
    [/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${t}">`],
    [/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${t}">`],
  ];
  for (const [re, neu] of regeln) {
    if (!re.test(html)) throw new Error(`head of the copy lacks ${re}`);
    html = html.replace(re, neu);
  }
  return html;
}

try {
  if (!(await warteAufServer())) throw new Error(`Server auf ${BASIS} nicht erreichbar`);
  const browser = await chromium.launch(
    process.env.BIT_CHROMIUM ? { executablePath: process.env.BIT_CHROMIUM } : {},
  );

  // Every page of tools/seiten.mjs (home page + topic pages, 69-10) in every copy language.
  for (const seiteDef of SEITEN) for (const s of SPRACHEN) {
    const pfad = seiteDef.ordner ? seiteDef.ordner + '/' : '';
    const seite = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    // Ein Skriptfehler auf der Seite wuerde sonst still in die Kopie eingefroren.
    const skriptfehler = [];
    seite.on('pageerror', (f) => skriptfehler.push(f.message));
    await seite.goto(`${BASIS}${pfad}?lang=${s.code}`, { waitUntil: 'networkidle' });
    // The dictionary is loaded on demand since 69-17 — wait until it is applied.
    await seite.waitForFunction((c) => window.bitSprache && window.bitSprache.aktuell() === c, s.code, { timeout: 10000 });
    // sprachen.js laeuft ueber alle Blattknoten; kurz Luft lassen.
    await seite.waitForTimeout(1200);
    if (skriptfehler.length) throw new Error(`Skriptfehler auf der Seite (${s.code}):\n  ${skriptfehler.join('\n  ')}`);

    const lang = await seite.evaluate(() => document.documentElement.getAttribute('lang'));
    if (lang !== s.code) throw new Error(`Umschaltung nach ${s.code} hat nicht gegriffen (lang=${lang})`);

    // Unuebersetzte Textbloecke zaehlen — die Zahl steht im Protokoll, damit ein
    // neuer Wortlaut ohne Woerterbucheintrag nicht unbemerkt deutsch bleibt.
    const fehlend = await seite.evaluate((c) => window.bitSprache.fehlende(c), s.code);
    if (fehlend.length) console.log(`  ${fehlend.length} ohne Übersetzung (/${pfad}, ${s.code}):\n    ${fehlend.map((t) => t.slice(0, 90)).join('\n    ')}`);

    // Laufzeit-Spuren entfernen: Kapitelknoepfe und Canvas-Zustand erzeugt das
    // Buehnen-Modul beim Laden selbst neu. Eingefroren waeren sie doppelt.
    const html = await seite.evaluate(() => {
      const route = document.getElementById('route');
      if (route) route.innerHTML = '';
      const leinwand = document.getElementById('buehne-leinwand');
      if (leinwand) leinwand.removeAttribute('style');
      const video = document.getElementById('buehne-video');
      if (video) { video.removeAttribute('src'); video.removeAttribute('style'); }
      for (const el of document.querySelectorAll('.ebene')) el.removeAttribute('style');
      // Detected operating system of the generating browser (92-09) — the page
      // script sets it per visitor on load.
      const dl = document.getElementById('herunterladen');
      if (dl) dl.removeAttribute('data-system');
      // The dictionary script tag injected by sprachen.js (69-17) must not be
      // frozen into the copy — there sprachen.js loads it itself, with the right path.
      for (const el of document.querySelectorAll('script[data-nachgeladen]')) el.remove();
      // Paketfinder-Ergebnis und Anfrage-Vorschau schreibt das Skript beim Laden
      // selbst; eingefroren staenden sie doppelt und in der Sprache des Laufs.
      for (const id of ['finder-ergebnis', 'a-vorschau']) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
      }
      return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    });

    const titel = await seite.evaluate(() => document.title);
    // Topic pages use root-absolute resource paths; only the home page needs lifting.
    const fertig = kopfSetzen(seiteDef.ordner ? html : pfadeAnheben(html), s, seiteDef, titel);
    const ziel = path.join(WURZEL, s.code, seiteDef.ordner);
    fs.mkdirSync(ziel, { recursive: true });
    fs.writeFileSync(path.join(ziel, 'index.html'), fertig, 'utf8');
    console.log(
      `  ${String((Buffer.byteLength(fertig) / 1024).toFixed(0)).padStart(5)} KB  ${s.code}/${pfad}index.html` +
        `  (lang=${s.code}, dir=${s.dir})`,
    );
    await seite.close();
  }

  await browser.close();
  console.log('\nSPRACHKOPIEN_OK');
} finally {
  server.close();
}
