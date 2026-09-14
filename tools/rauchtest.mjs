#!/usr/bin/env node
// Rauchtest der Startseite in echtem Chromium (Stand 14.09.2026):
// Paketfinder, Anfrage-Vorschau / Kopieren / Drucken, <picture>-Quellen,
// Sprachumschaltung DE/EN/AR, Sprachuebergabe an die Demo, Querlauf bei 390 px.
//
// Aufruf wie sprachkopien-erzeugen.mjs:
//   node tools/rauchtest.mjs
// oder ausserhalb des eigenen Rechners:
//   BIT_APP_REPO=<Ordner mit playwright(-core)> BIT_CHROMIUM=<chrome> node tools/rauchtest.mjs
//
// Ergebnis: Zeilen mit ✓/✗, Bildschirmfotos im Temp-Ordner, Exit 1 bei Fehlern.

import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const APP_REPO = process.env.BIT_APP_REPO || 'C:/Users/Asus TUF Z590 P Wifi/My Drive/bit-atelier-app';
const require = createRequire(path.join(APP_REPO, 'package.json'));
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('playwright-core')); }

const WURZEL = path.resolve(import.meta.dirname, '..');
const PORT = 4189;
const B = `http://localhost:${PORT}/`;
const AUS = path.join(os.tmpdir(), 'bit-atelier-rauchtest');
fs.mkdirSync(AUS, { recursive: true });

const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webmanifest': 'application/manifest+json',
};
const server = http.createServer((req, res) => {
  const roh = decodeURIComponent((req.url || '/').split('?')[0]);
  let p = path.join(WURZEL, roh);
  if (roh.endsWith('/')) p = path.join(p, 'index.html');
  if (!path.resolve(p).startsWith(WURZEL)) { res.writeHead(403).end(); return; }
  fs.readFile(p, (e, d) => {
    if (e) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': TYPEN[path.extname(p)] || 'application/octet-stream' });
    res.end(d);
  });
});
await new Promise((r) => server.listen(PORT, r));

let fehler = 0;
const ok = (bed, was) => { console.log((bed ? '  ✓ ' : '  ✗ ') + was); if (!bed) fehler++; };

const browser = await chromium.launch(
  process.env.BIT_CHROMIUM ? { executablePath: process.env.BIT_CHROMIUM } : {},
);
try {
  const seite = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const skriptfehler = [];
  seite.on('pageerror', (f) => skriptfehler.push(f.message));
  await seite.goto(B + '?lang=de', { waitUntil: 'networkidle' });
  await seite.waitForTimeout(800);
  // Demo-Links nicht wirklich verfolgen: der window-Listener laeuft NACH dem
  // document-Listener von sprachen.js, der die Sprache in localStorage schreibt.
  await seite.evaluate(() => addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (a && /demo\//.test(a.getAttribute('href'))) e.preventDefault();
  }));
  const text = async (sel) => (await seite.locator(sel).textContent()).trim();   /* ohne text-transform */
  ok(await seite.evaluate(() => window.bitSprache.aktuell()) === 'de', 'Seite startet auf Deutsch (?lang=de)');

  console.log('\nPaketfinder');
  const paket = () => text('#finder-ergebnis .finder__paket');
  ok((await paket()).includes('Paket 1'), 'Vorbelegung (10–30 / A+T+TGA / LPH 3) -> Paket 1');
  ok((await text('#finder-ergebnis .finder__danach')).includes('Paket 3'), 'Im Anschluss Paket 3 genannt');
  await seite.click('.finder__frage[data-frage="summe"] button[data-wert="u5"]');
  ok((await paket()).includes('Unterhalb'), 'unter 5 Mio -> Planung');
  ok(await seite.locator('#finder-ergebnis a.btn[href="#leistungen"]').count() === 1, 'Link zu #leistungen');
  await seite.click('.finder__frage[data-frage="summe"] button[data-wert="ue30"]');
  await seite.click('.finder__frage[data-frage="phase"] button[data-wert="5"]');
  ok((await paket()).includes('Paket 3'), 'über 30 / A+T+TGA / LPH 5 -> Paket 3');
  await seite.click('.finder__frage[data-frage="modelle"] button[data-wert="at"]');
  ok((await paket()).includes('Paket 2'), 'A+T / LPH 5 -> Paket 2');
  await seite.click('.finder__frage[data-frage="phase"] button[data-wert="6"]');
  ok((await paket()).includes('Paket 2'), 'LPH 6–8 -> Paket 2');
  ok((await seite.locator('.finder__frage[data-frage="phase"] button[aria-pressed="true"]').getAttribute('data-wert')) === '6', 'aria-pressed folgt der Wahl');
  await seite.locator('#paketfinder').screenshot({ path: path.join(AUS, 'finder-desktop.png') });

  console.log('\nÜbernahme in den Baukasten');
  await seite.click('#finder-ergebnis button.btn');
  await seite.waitForTimeout(400);
  ok(await seite.inputValue('#a-summe') === 'über 30 Mio. €', 'Bausumme übernommen');
  ok(await seite.inputValue('#a-modelle') === 'Architektur + Tragwerk', 'Fachmodelle übernommen');
  ok(await seite.inputValue('#a-phase') === 'Vergabe / Ausführung (LPH 6–8)', 'Phase übernommen');
  ok(await seite.inputValue('#a-art') === 'Modellprüfung / QS', 'Projektart aus Paket 2 abgeleitet');
  const vorschau = () => seite.locator('#a-vorschau').innerText();
  ok((await vorschau()).includes('über 30 Mio. €'), 'Vorschau zeigt die Bausumme');
  await seite.fill('#a-termin', 'Start im November');
  ok((await vorschau()).includes('Start im November'), 'Vorschau läuft mit der Eingabe mit');
  ok(await seite.evaluate(() => document.activeElement && document.activeElement.id) === 'a-termin', 'Fokus liegt im Zeitrahmen-Feld');

  console.log('\nKopieren und Drucken');
  await seite.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: B });
  await seite.click('#a-kopieren');
  await seite.waitForTimeout(200);
  ok((await text('#a-kopieren')).includes('Kopiert'), 'Knopf bestätigt: ' + await text('#a-kopieren'));
  const zw = await seite.evaluate(() => navigator.clipboard.readText()).catch(() => '');
  ok(zw.includes('Start im November'), 'Zwischenablage enthält den Text');
  await seite.waitForTimeout(2400);
  ok(await text('#a-kopieren') === 'Text kopieren', 'Knopf stellt sich zurück');
  await seite.evaluate(() => { window.print = () => {}; anfrageDrucken(); });
  ok(await seite.locator('#anfrage-druck pre').count() === 1
    && (await seite.locator('#anfrage-druck pre').textContent()).includes('Start im November'), 'Druckblatt gefüllt');
  ok(await seite.evaluate(() => document.body.classList.contains('druckt-anfrage')), 'Druckklasse gesetzt');
  await seite.emulateMedia({ media: 'print' });
  await seite.screenshot({ path: path.join(AUS, 'druck.png'), fullPage: true });
  await seite.emulateMedia({ media: 'screen' });
  await seite.evaluate(() => document.body.classList.remove('druckt-anfrage'));

  console.log('\nHerkunft, Compose-Links, ?befund= (69-01)');
  ok((await seite.evaluate(() => anfrageText().betreff)).startsWith('[Paketfinder] '),
    'Betreff trägt das Kürzel des Finders: ' + await seite.evaluate(() => anfrageText().betreff));
  await seite.evaluate(() => { document.getElementById('a-herkunft').value = ''; });
  ok((await seite.evaluate(() => anfrageText().betreff)).startsWith('[Website] '), 'ohne Angabe [Website]');
  await seite.click('header a[data-herkunft="Kopfzeile"]');
  ok((await seite.evaluate(() => anfrageText().betreff)).startsWith('[Kopfzeile] '), 'Kopfzeilen-Knopf setzt die Herkunft');
  const geoeffnet = await seite.evaluate(() => {
    const urls = []; window.open = (u) => { urls.push(u); return null; };
    anfrageCompose('gmail'); anfrageCompose('outlook'); return urls;
  });
  ok(geoeffnet.length === 2 && geoeffnet[0].startsWith('https://mail.google.com/mail/?view=cm')
    && geoeffnet[0].includes('su=%5BKopfzeile%5D') && geoeffnet[0].includes('Start%20im%20November'), 'Gmail-Compose mit Betreff und Text');
  ok(geoeffnet[1].startsWith('https://outlook.office.com/mail/deeplink/compose?')
    && geoeffnet[1].includes('subject=%5BKopfzeile%5D') && geoeffnet[1].includes('body='), 'Outlook-Compose mit Betreff und Text');
  ok(geoeffnet.every(u => /to=me%40bit-atelier\.de/.test(u)), 'Empfänger in beiden Links');
  const befund = Buffer.from(JSON.stringify({ modell: 'musterprojekt.ifc', bauteile: 128, kollisionen: 2, duplikate: 1, idsFehler: 0 }))
    .toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const s2 = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await s2.goto(B + '?befund=' + befund + '#kontakt', { waitUntil: 'load' });
  const frei = await s2.inputValue('#a-text');
  ok(frei.includes('musterprojekt.ifc') && frei.includes('Harte Kollisionen: 2') && frei.includes('IDS-Verstöße: 0'), '?befund= füllt das Freitextfeld');
  ok((await s2.evaluate(() => anfrageText().betreff)).startsWith('[Demo] '), '?befund= setzt Herkunft [Demo]');
  await s2.goto(B + '?befund=%%%kaputt#kontakt', { waitUntil: 'load' });
  ok((await s2.inputValue('#a-text')) === '', 'Unsinn in ?befund= wird verworfen');
  await s2.close();

  console.log('\nBühne: Bildquellen');
  for (const f of ['phase-1-baufeld-800.avif', 'phase-1-baufeld.webp', 'phase-6-uebergabe-800.avif']) {
    const r = await seite.request.get(B + 'assets/img/bauablauf/' + f);
    ok(r.ok(), `${f} -> ${r.status()} ${r.headers()['content-type']}`);
  }
  const quelle = await seite.evaluate(() => document.querySelector('.ebene img').currentSrc);
  ok(/\.avif$/.test(quelle), 'Chromium wählt AVIF: ' + quelle);

  console.log('\nSprache');
  await seite.evaluate(() => window.bitSprache.setze('en'));
  await seite.evaluate(() => { anfrageVorschau(); finderZeigen(); });
  ok(await text('#finder-ergebnis .finder__auge') === 'Recommendation', 'Finder-Ergebnis auf Englisch');
  ok((await text('#finder-ergebnis .finder__paket')).startsWith('Package 2'), 'Pakettitel auf Englisch');
  ok((await vorschau()).startsWith('Dear'), 'Mailtext auf Englisch');
  ok((await text('.finder__frage[data-frage="summe"] button[data-wert="u5"]')).includes('under'), 'Finder-Knöpfe übersetzt');
  ok(await text('#a-kopieren') === 'Copy text', 'Knopf "Text kopieren" übersetzt');
  const fehlendEn = await seite.evaluate(() => window.bitSprache.fehlende('en'));
  const fehlendAr = await seite.evaluate(() => window.bitSprache.fehlende('ar'));
  console.log(`  ohne Übersetzung (Altbestand, Stand 14.09.2026: en 36, ar 30): en ${fehlendEn.length}, ar ${fehlendAr.length}`);
  await seite.evaluate(() => window.bitSprache.setze('ar'));
  await seite.evaluate(() => { anfrageVorschau(); finderZeigen(); });
  ok(await seite.evaluate(() => document.documentElement.dir) === 'rtl', 'Arabisch: dir=rtl');
  ok(/[\u0600-\u06FF]/.test(await text('#finder-ergebnis .finder__paket')), 'Finder-Ergebnis auf Arabisch');
  await seite.locator('#paketfinder').screenshot({ path: path.join(AUS, 'finder-ar.png') });

  console.log('\nDemo-Link trägt die Sprache');
  await seite.evaluate(() => window.bitSprache.setze('en'));
  await seite.evaluate(() => localStorage.removeItem('lang'));
  await seite.locator('.kopf__tun a[href="demo/"]').click({ force: true });
  await seite.waitForTimeout(200);
  ok(await seite.evaluate(() => localStorage.getItem('lang')) === 'en', 'localStorage.lang = en (Seite auf Englisch)');
  ok(await seite.evaluate(() => location.pathname) === '/', 'Navigation im Test unterbunden');
  await seite.evaluate(() => window.bitSprache.setze('ar'));
  await seite.locator('.kopf__tun a[href="demo/"]').click({ force: true });
  await seite.waitForTimeout(200);
  ok(await seite.evaluate(() => localStorage.getItem('lang')) === 'en', 'Arabisch -> Demo auf Englisch (Rückfall)');
  await seite.evaluate(() => window.bitSprache.setze('de'));
  await seite.locator('#werkzeuge a[href^="demo/#/ModelCheck"]').first().click({ force: true });
  await seite.waitForTimeout(200);
  ok(await seite.evaluate(() => localStorage.getItem('lang')) === 'de', 'Deutsch -> auch der Prüflauf-Link setzt de');

  console.log('\nMobil (390 px)');
  const handy = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  handy.on('pageerror', (f) => skriptfehler.push('mobil: ' + f.message));
  await handy.goto(B + '?lang=de', { waitUntil: 'networkidle' });
  await handy.waitForTimeout(600);
  ok(await handy.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    'kein Querlauf: scrollWidth ' + await handy.evaluate(() => document.documentElement.scrollWidth));
  await handy.locator('#paketfinder').screenshot({ path: path.join(AUS, 'finder-mobil.png') });
  await handy.locator('.anfrage').screenshot({ path: path.join(AUS, 'anfrage-mobil.png') });

  console.log('\nSkriptfehler: ' + skriptfehler.length + (skriptfehler.length ? '\n  ' + skriptfehler.join('\n  ') : ''));
  ok(skriptfehler.length === 0, 'keine Skriptfehler');
} finally {
  await browser.close();
  server.close();
}
console.log(`\nBildschirmfotos: ${AUS}`);
console.log(fehler ? `RAUCHTEST_FEHLER ${fehler}` : 'RAUCHTEST_OK');
process.exit(fehler ? 1 : 0);
