#!/usr/bin/env node
// Rauchtest der Startseite in echtem Chromium (Stand 06.10.2026, 83-05):
// Paketfinder, Anfrage-Vorschau / Kopieren / Drucken, <picture>-Quellen,
// Sprachumschaltung DE/EN/AR, Open-Source-Abschnitt (Download, Quellcode,
// Feedback, Registrierung), ein Download-Block mit Systemerkennung, Kopierknopf
// und Fassungszeile (92-09), keine Demo-Reste, Querlauf bei 390 px.
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

// Quellcode-Adresse der Open-Source-Fassung. EINE Stelle in dieser Datei —
// bei einer neuen Adresse hier und in index.html (Kommentar OSS_REPO) tauschen.
const OSS_REPO = 'https://github.com/mozzi86/bit-atelier-oss';
const OSS_ZIP = OSS_REPO + '/releases/latest/download/BIT-Atelier.zip';
const OSS_INSTALLER = OSS_REPO + '/releases/latest/download/BIT-Atelier-Installer.cmd';
const REGISTRIEREN = 'https://bit-atelier.pages.dev/registrieren';

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
    if (e) {
      // Like the host: unknown paths get 404.html with status 404 (69-17).
      fs.readFile(path.join(WURZEL, '404.html'), (e2, d2) => {
        if (e2) { res.writeHead(404).end(); return; }
        res.writeHead(404, { 'Content-Type': TYPEN['.html'] }).end(d2);
      });
      return;
    }
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
  const text =async (sel) => (await seite.locator(sel).textContent()).trim();   /* ohne text-transform */
  ok(await seite.evaluate(() => window.bitSprache.aktuell()) === 'de', 'Seite startet auf Deutsch (?lang=de)');

  console.log('\nPaketfinder');
  const paket = () => text('#finder-ergebnis .finder__paket');
  ok((await paket()).includes('Paket 1'), 'Vorbelegung (10–30 / A+T+TGA / LPH 3) -> Paket 1');
  ok((await text('#finder-ergebnis .finder__danach')).includes('Paket 3'), 'Im Anschluss Paket 3 genannt');
  await seite.click('.finder__frage[data-frage="summe"] button[data-wert="u5"]');
  ok((await paket()).includes('Unterhalb'), 'unter 5 Mio -> Planung');
  ok(!/10 Mio. € Bausumme/.test(await text('#pakete')) && (await text('#finder-ergebnis')).includes('ab etwa 5 Mio.'),
    'Schwelle der Pakete = Schwelle des Finders: 5 Mio. (69-35)');
  await seite.click('.finder__frage[data-frage="summe"] button[data-wert="10-30"]');
  await seite.click('.finder__frage[data-frage="modelle"] button[data-wert="bestand"]');
  ok((await text('#finder-ergebnis')).includes('Vorleistung Dritter'), 'Antwort „Bestandsmodell / Scan“: Scan = Vorleistung Dritter (69-35, D-HR-20)');
  await seite.click('.finder__frage[data-frage="modelle"] button[data-wert="atg"]');
  await seite.click('.finder__frage[data-frage="summe"] button[data-wert="u5"]');
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
  ok((await s2.evaluate(() => anfrageText().betreff)).startsWith('[BIT-Atelier] '), '?befund= setzt Herkunft [BIT-Atelier]');
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
  console.log(`  ohne Übersetzung (Altbestand, Stand 06.10.2026: en 32, ar 26): en ${fehlendEn.length}, ar ${fehlendAr.length}`);
  await seite.evaluate(() => window.bitSprache.setze('ar'));
  await seite.evaluate(() => { anfrageVorschau(); finderZeigen(); });
  ok(await seite.evaluate(() => document.documentElement.dir) === 'rtl', 'Arabisch: dir=rtl');
  ok(/[\u0600-\u06FF]/.test(await text('#finder-ergebnis .finder__paket')), 'Finder-Ergebnis auf Arabisch');
  await seite.locator('#paketfinder').screenshot({ path: path.join(AUS, 'finder-ar.png') });

  console.log('\nOpen Source (83-05)');
  await seite.evaluate(() => window.bitSprache.setze('de'));
  ok(await seite.locator('#open-source').isVisible(), 'Abschnitt #open-source sichtbar');
  ok(await seite.locator('.kopf__tun a[href="#open-source"]').count() === 1, 'Kopfzeilen-Knopf führt zu #open-source');
  ok(await seite.locator('#menue a[href="#open-source"]').count() === 1, 'Menü führt zu #open-source');
  ok(await seite.locator(`#open-source a[href="${OSS_ZIP}"]`).count() === 1, 'ZIP-Download im Abschnitt');
  ok(await seite.locator(`a[href="${OSS_ZIP}"]`).count() === 1
    && await seite.locator(`a[href="${OSS_INSTALLER}"]`).count() === 1, 'ZIP und Installer genau einmal auf der Seite (92-09)');
  ok(await seite.locator('#downloads a[href="#herunterladen"]').count() === 1, '#downloads verweist auf den einen Download-Block');
  ok(await seite.locator(`#open-source a[href="${OSS_REPO}"]`).count() === 1, 'Quellcode-Link');
  ok(await seite.locator(`#open-source a[href="${OSS_REPO}/issues"]`).count() === 1, 'GitHub-Issues-Link');
  ok(await seite.locator(`#open-source a[href="${REGISTRIEREN}"]`).count() === 1
    && await seite.locator(`#menue a[href="${REGISTRIEREN}"]`).count() === 1, 'Registrieren im Abschnitt und im Menü');
  ok((await text('#open-source')).includes('ohne Gewährleistung'), 'Haftungssatz im Abschnitt');
  ok((await text('#open-source')).includes('ein paar Werktage'), 'Hinweis auf Freischaltung von Hand');
  const fb = await seite.evaluate(() => ({ ...feedbackText(), an: rev(_eu) + '@' + rev(_ed) }));
  ok(fb.an === 'me@bit-atelier.de' && fb.betreff.startsWith('[Feedback] ') && fb.koerper.includes('Was passiert ist:'),
    'Feedback-Mail: Empfänger, Betreff, Gliederung');
  const ld = await seite.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => JSON.parse(s.textContent)));
  const sw = ld.find((x) => x['@type'] === 'SoftwareSourceCode');
  ok(sw && sw.license === 'https://opensource.org/licenses/MIT' && sw.codeRepository === OSS_REPO
    && sw.isAccessibleForFree === true, 'JSON-LD: Lizenz, Repository, kostenlos');
  await seite.evaluate(() => window.bitSprache.setze('en'));
  ok((await text('#open-source h2')).includes('open source'), 'Abschnitt auf Englisch');
  ok(await seite.evaluate(() => feedbackText().betreff) === '[Feedback] BIT-Atelier (open source)', 'Feedback-Betreff auf Englisch');
  await seite.evaluate(() => window.bitSprache.setze('de'));
  await seite.locator('#open-source').screenshot({ path: path.join(AUS, 'open-source-desktop.png') });

  console.log('\nDownload (92-09)');
  const fassung = await seite.evaluate(() => {
    const zeile = document.querySelector('#herunterladen .download__fassung');
    const sw = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => JSON.parse(s.textContent)).find((x) => x['@type'] === 'SoftwareSourceCode');
    return {
      text: zeile ? zeile.textContent.replace(/\s+/g, ' ') : '',
      version: zeile ? zeile.querySelector('b').textContent.trim() : '',
      tag: zeile ? zeile.querySelector('a').getAttribute('href') : '',
      datum: zeile ? zeile.querySelector('time').getAttribute('datetime') : '',
      ld: sw && sw.targetProduct && sw.targetProduct.softwareVersion,
      sha: (document.getElementById('dl-sha256') || {}).textContent || '',
    };
  });
  ok(/^\d+\.\d+\.\d+$/.test(fassung.version) && fassung.tag === `${OSS_REPO}/releases/tag/v${fassung.version}`
    && fassung.ld === fassung.version, `Fassungszeile, Änderungs-Link und JSON-LD nennen dieselbe Fassung (${fassung.version})`);
  ok(/^\d{4}-\d{2}-\d{2}$/.test(fassung.datum) && /Node\.js 22\.9 oder neuer/.test(fassung.text) && /\d+ MB/.test(fassung.text),
    'Fassungszeile: ' + fassung.text);
  ok(/^[0-9a-f]{64}$/.test(fassung.sha.trim()), 'SHA-256 hat 64 Hex-Zeichen');
  ok(await seite.locator(`#herunterladen a[href="${OSS_ZIP}.sha256"]`).count() === 1, 'Link auf die .sha256 der aktuellen Fassung');
  for (const pfad of ['index.html', 'en/index.html', 'ar/index.html']) {
    const roh = fs.readFileSync(path.join(WURZEL, pfad), 'utf8');
    ok(!/Node\.js (?:>= )?22(?!\.9)/.test(roh), `${pfad}: kein „Node.js 22“ ohne .9`);
  }
  // Operating-system detection: override what the page reads, then check order and mark.
  const systeme = [
    ['Windows', 'Win32', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 0, 'windows'],
    ['macOS', 'MacIntel', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)', 0, 'unix'],
    ['Linux', 'Linux x86_64', 'Mozilla/5.0 (X11; Linux x86_64)', 0, 'unix'],
    ['Android', 'Linux armv8l', 'Mozilla/5.0 (Linux; Android 14; Pixel 8) Mobile', 5, 'mobil'],
    ['', '', 'Mozilla/5.0', 0, ''],
  ];
  for (const [plattform, platform, ua, touch, erwartet] of systeme) {
    const k = await browser.newContext({ viewport: { width: 1400, height: 900 } });
    await k.addInitScript(([p, pl, u, t]) => {
      Object.defineProperty(navigator, 'userAgentData', { get: () => (p ? { platform: p } : undefined) });
      Object.defineProperty(navigator, 'platform', { get: () => pl });
      Object.defineProperty(navigator, 'userAgent', { get: () => u });
      Object.defineProperty(navigator, 'maxTouchPoints', { get: () => t });
    }, [plattform, platform, ua, touch]);
    const p = await k.newPage();
    await p.goto(B + '?lang=de', { waitUntil: 'load' });
    const r = await p.evaluate(() => {
      const d = document.getElementById('herunterladen');
      const wege = [...d.querySelectorAll('.download__weg')].filter((w) => w.offsetParent)
        .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
      const marke = [...d.querySelectorAll('.download__empfohlen')].filter((m) => m.offsetParent)
        .map((m) => m.closest('.download__weg').dataset.fuer);
      return { sys: d.dataset.system || '', erster: wege[0] && wege[0].dataset.fuer, sichtbar: wege.length, marke,
        mobil: !!d.querySelector('.download__mobil').offsetParent };
    });
    const vorne = erwartet === 'windows' || erwartet === 'unix' ? erwartet : 'windows';
    ok(r.sys === erwartet && r.erster === vorne && r.sichtbar === 3
      && r.marke.join() === (vorne === erwartet ? erwartet : '') && r.mobil === (erwartet === 'mobil'),
      `${plattform || 'unbekannt'}: System „${r.sys}“, vorne ${r.erster}, ${r.sichtbar} Wege sichtbar, Marke ${r.marke.join() || '—'}${r.mobil ? ', Handy-Hinweis' : ''}`);
    await k.close();
  }
  // Copy button for the shell line.
  await seite.click('#dl-kopieren');
  await seite.waitForTimeout(200);
  ok((await text('#dl-kopieren')).includes('Kopiert'), 'Kopierknopf bestätigt');
  ok((await seite.evaluate(() => navigator.clipboard.readText()).catch(() => ''))
    === `curl -fsSL ${OSS_REPO}/releases/latest/download/install.sh | sh`, 'Zwischenablage enthält genau die Shell-Zeile');
  await seite.waitForTimeout(2400);
  await seite.evaluate(() => window.bitSprache.setze('en'));
  ok(await text('#dl-kopieren') === 'Copy command' && (await text('#herunterladen .download__fassung')).includes('Version'),
    'Download-Block auf Englisch');
  await seite.evaluate(() => window.bitSprache.setze('de'));
  await seite.locator('#herunterladen').screenshot({ path: path.join(AUS, 'download-desktop.png') });

  console.log('\nVersprechen vorn (69-03)');
  const vers = await seite.evaluate(() => {
    const v = document.getElementById('ihr-modell');
    const w = document.getElementById('werkzeuge');
    const karten = w.querySelector('.gitter');
    return { da: !!v && w.contains(v), vorn: !!v && !!karten && (v.compareDocumentPosition(karten) & Node.DOCUMENT_POSITION_FOLLOWING) > 0,
      text: v ? v.textContent.replace(/\s+/g, ' ') : '', ziele: v ? [...v.querySelectorAll('a')].map((a) => a.getAttribute('href')) : [],
      fussnote: [...w.querySelectorAll('.fussnote')].length };
  });
  ok(vers.da && vers.vorn, 'Block #ihr-modell steht in #werkzeuge vor den Werkzeug-Karten');
  ok(vers.text.includes('Trennen Sie die Netzverbindung') && /Gemessen am \d/.test(vers.text) && vers.text.includes('Die Grenze:'),
    'Nachweissatz, Messung und Grenze stehen im Block');
  ok(vers.ziele.join() === '#herunterladen,#befund-beispiel' && vers.fussnote === 0, 'Knöpfe zum Download und zum Musterbefund, alte Fußnote weg');
  await seite.evaluate(() => window.bitSprache.setze('en'));
  ok((await text('#ihr-modell h3')).startsWith('Nothing leaves your computer'), 'Block auf Englisch');
  await seite.evaluate(() => window.bitSprache.setze('de'));
  await seite.locator('#ihr-modell').screenshot({ path: path.join(AUS, 'versprechen-desktop.png') });

  console.log('\nReferenzen (69-09): Gerüst, verborgen bis Inhalte kommen');
  const ref = await seite.evaluate(() => {
    const r = document.getElementById('referenzen');
    return { da: !!r, versteckt: !!r && getComputedStyle(r).display === 'none',
      verlinkt: document.querySelectorAll('a[href="#referenzen"], a[href$="/#referenzen"]').length,
      karten: r ? r.querySelectorAll('article').length : -1,
      klammern: r ? /\[[^\]]+\]/.test(r.textContent) : true };
  });
  ok(ref.da && ref.versteckt && ref.verlinkt === 0 && ref.karten === 0 && !ref.klammern,
    `#referenzen vorhanden, verborgen, nicht verlinkt, ${ref.karten} Karten, kein sichtbarer Platzhalter`);
  ok(!fs.readFileSync(path.join(WURZEL, 'sitemap.xml'), 'utf8').includes('referenzen'), 'Referenzen nicht in der Sitemap');

  console.log('\nWörterbuch pro Sprache, nachgeladen (69-17)');
  for (const [pfad, erwartet] of [['?lang=de', []], ['en/', ['en']], ['ar/', ['ar']], ['?lang=en', ['en']]]) {
    const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const geladen = [];
    p.on('request', (r) => { const m = r.url().match(/sprachen\.(en|ar)\.js/); if (m) geladen.push(m[1]); });
    await p.goto(B + pfad, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => ({ aktuell: window.bitSprache.aktuell(),
      finder: document.querySelector('#finder-ergebnis .finder__auge').textContent.trim() }));
    const sprache = erwartet[0] || 'de';
    const auge = { de: 'Empfehlung', en: 'Recommendation', ar: 'التوصية' }[sprache];
    ok(geladen.join() === erwartet.join() && r.aktuell === sprache && r.finder === auge,
      `/${pfad}: lädt [${geladen.join(', ') || '—'}], Sprache ${r.aktuell}, Finder „${r.finder}“`);
    await p.close();
  }
  for (const k of ['en', 'ar']) {
    const roh = fs.readFileSync(path.join(WURZEL, k, 'index.html'), 'utf8');
    ok(!/<script[^>]*(?:data-nachgeladen|sprachen\.(?:en|ar)\.js)/.test(roh), `${k}/index.html: kein eingefrorenes Nachlade-Skript`);
  }
  const kern = fs.statSync(path.join(WURZEL, 'assets/js/sprachen.js')).size;
  ok(kern < 20000, `sprachen.js ohne Wörterbuch: ${kern} B`);

  console.log('\nSprachknöpfe auf den Kopien /en/ und /ar/');
  for (const [von, knopf, ziel, lang] of [['en/', 'de', '', 'de'], ['en/', 'ar', 'ar/', 'ar'], ['ar/', 'en', 'en/', 'en'], ['ar/', 'de', '', 'de']]) {
    const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await p.goto(B + von, { waitUntil: 'load' });
    await Promise.all([p.waitForURL(B + ziel), p.click(`.kopf [data-sprache="${knopf}"]`)]);
    await p.waitForLoadState('load');
    ok(await p.evaluate(() => document.documentElement.lang) === lang, `/${von} → ${knopf}: landet auf /${ziel} (lang=${lang})`);
    await p.close();
  }

  console.log('\nKeine Demo-Reste, interne Anker, Konsole (DE/EN/AR)');
  ok(!fs.readFileSync(path.join(WURZEL, 'assets/js/sprachen.js'), 'utf8').includes('demo/'), 'sprachen.js ohne "demo/"');
  ok(!fs.existsSync(path.join(WURZEL, 'demo')), 'Ordner demo/ entfernt');
  for (const pfad of ['', 'en/', 'ar/']) {
    const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const meldungen = [];
    p.on('pageerror', (f) => meldungen.push(f.message));
    p.on('console', (m) => { if (m.type() === 'error') meldungen.push(m.text()); });
    await p.goto(B + pfad, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    const r = await p.evaluate(() => {
      const html = document.documentElement.outerHTML;
      const tot = [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href'))
        .filter((h) => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1))));
      const os = document.getElementById('open-source');
      return { demo: (html.match(/demo\//g) || []).length, tot, oss: !!os && os.getBoundingClientRect().height > 0 };
    });
    const name = '/' + pfad;
    ok(r.demo === 0, `${name}: 0× "demo/" im Dokument`);
    ok(r.tot.length === 0, `${name}: keine toten internen Anker` + (r.tot.length ? ' — ' + r.tot.join(', ') : ''));
    ok(r.oss, `${name}: Open-Source-Abschnitt vorhanden und sichtbar`);
    ok(meldungen.length === 0, `${name}: keine Konsolenfehler` + (meldungen.length ? '\n    ' + meldungen.join('\n    ') : ''));
    await p.close();
  }

  console.log('\nThemenseiten (69-10): 4 Seiten × 3 Sprachen');
  const { SEITEN, SPRACHEN: SPR, adresse } = await import('./seiten.mjs');
  const titel = new Map();
  for (const sd of SEITEN) for (const sp of SPR) {
    const pfad = (sp.code === 'de' ? '' : sp.code + '/') + (sd.ordner ? sd.ordner + '/' : '');
    const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const meldungen = [];
    const kaputt = [];
    p.on('pageerror', (f) => meldungen.push(f.message));
    p.on('console', (m) => { if (m.type() === 'error') meldungen.push(m.text()); });
    p.on('response', (r) => { if (r.status() >= 400) kaputt.push(r.status() + ' ' + r.url()); });
    p.on('requestfailed', (r) => { if (r.url().startsWith(B)) kaputt.push('failed ' + r.url()); });
    const antwort = await p.goto(B + pfad, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => ({
      titel: document.title, lang: document.documentElement.lang, dir: document.documentElement.dir,
      canonical: [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.href),
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => l.hreflang + '=' + l.href).sort(),
      beschreibung: (document.querySelector('meta[name="description"]') || {}).content || '',
      senden: !!document.getElementById('a-senden'),
      herkunft: (document.getElementById('a-herkunft') || {}).value,
      impressum: !!document.getElementById('impressum') || !!document.querySelector('footer a[href$="#impressum"]'),
      tot: [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href'))
        .filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
      h1: document.querySelectorAll('h1').length,
    }));
    const erwartetHref = SPR.map((x) => x.code + '=' + adresse(sd, x.code)).concat('x-default=' + adresse(sd, 'de')).sort();
    titel.set(pfad, r.titel);
    ok(antwort.status() === 200 && r.lang === sp.code && (sp.code !== 'ar' || r.dir === 'rtl')
      && r.canonical.length === 1 && r.canonical[0] === adresse(sd, sp.code)
      && r.hreflang.join() === erwartetHref.join() && r.beschreibung === sd.beschreibung[sp.code]
      && r.senden && r.impressum && r.tot.length === 0 && r.h1 === 1
      && (!sd.ordner || r.herkunft === sd.herkunft) && meldungen.length === 0 && kaputt.length === 0,
      `/${pfad}: „${r.titel}“` + (r.tot.length ? ' — tote Anker ' + r.tot.join(',') : '')
      + (meldungen.length || kaputt.length ? ' — ' + [...meldungen, ...kaputt].join(' | ') : ''));
    await p.close();
  }
  ok(new Set(titel.values()).size === titel.size, `${titel.size} Seiten, ${new Set(titel.values()).size} verschiedene Titel`);
  // Stale topic pages: their page script and style must equal the home page's
  // (otherwise node tools/unterseiten-erzeugen.mjs was not run after a change).
  {
    const teil = (html, a, e) => { const i = html.indexOf(a); return i < 0 ? '' : html.slice(i, html.indexOf(e, i)); };
    const norm = (t) => t.replace(/\r\n/g, '\n').replace(/url\((['"]?)\/?assets\//g, 'url($1assets/');
    const start = fs.readFileSync(path.join(WURZEL, 'index.html'), 'utf8');
    const veraltet = SEITEN.filter((sd) => sd.ordner).filter((sd) => {
      const t = fs.readFileSync(path.join(WURZEL, sd.ordner, 'index.html'), 'utf8');
      return norm(teil(t, '<script>\n// Jahr im Footer', '</script>')) !== norm(teil(start.replace(/\r\n/g, '\n'), '<script>\n// Jahr im Footer', '</script>'))
        || norm(teil(t, '<style>', '</style>')) !== norm(teil(start.replace(/\r\n/g, '\n'), '<style>', '</style>'));
    }).map((sd) => sd.ordner);
    ok(veraltet.length === 0, 'Themenseiten aktuell (Skript + Stil = Startseite)' + (veraltet.length ? ' — neu erzeugen: ' + veraltet.join(', ') : ''));
  }
  const sitemap = fs.readFileSync(path.join(WURZEL, 'sitemap.xml'), 'utf8');
  ok((sitemap.match(/<url>/g) || []).length === SEITEN.length * SPR.length && !/demo/.test(sitemap),
    `sitemap.xml: ${(sitemap.match(/<url>/g) || []).length} Adressen, kein /demo/`);
  // Language buttons on a topic page copy go to the same topic in the other language.
  for (const [von, knopf, ziel] of [['en/bim-koordination/', 'de', 'bim-koordination/'], ['ar/bit-pdf/', 'en', 'en/bit-pdf/']]) {
    const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await p.goto(B + von, { waitUntil: 'load' });
    await Promise.all([p.waitForURL(B + ziel), p.click(`.kopf [data-sprache="${knopf}"]`)]);
    ok(true, `/${von} → ${knopf}: /${ziel}`);
    await p.close();
  }
  // The legal notice opens from /#impressum (links of the topic pages).
  {
    const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await p.goto(B + 'bim-koordination/', { waitUntil: 'load' });
    await Promise.all([p.waitForURL(B + '#impressum'), p.click('footer a[href="../#impressum"]')]);
    await p.waitForTimeout(400);
    ok(await p.evaluate(() => !document.getElementById('impressum').classList.contains('verborgen')), 'Impressum-Link der Themenseite öffnet das Impressum');
    await p.close();
  }
  for (const [pfad, name] of [['bim-koordination/', 'thema-bim'], ['ar/modellpruefung-ids-bcf/', 'thema-pruefung-ar']]) {
    const p = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await p.goto(B + pfad, { waitUntil: 'networkidle' });
    await p.screenshot({ path: path.join(AUS, name + '.png') });
    await p.close();
  }

  console.log('\n404-Seite und Schriften (69-17)');
  for (const [pfad, lang, start, haupt] of [
    ['gibt-es-nicht', 'de', '/', '/'], ['en/gibt-es-nicht', 'en', '/en/', '/en/'], ['ar/x/y', 'ar', '/ar/', '/ar/'],
    ['demo/', 'de', '/', '/#herunterladen'], ['demo/EnergyAnalysis', 'de', '/', '/#herunterladen'], ['en/demo/', 'en', '/en/', '/en/#herunterladen'],
  ]) {
    const p = await browser.newPage({ viewport: { width: 1000, height: 800 } });
    const meldungen = [];
    p.on('pageerror', (f) => meldungen.push(f.message));
    p.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) meldungen.push(m.text()); });
    const fehlgeschlagen = [];
    p.on('response', (r) => { if (r.status() >= 400 && r.url() !== B + pfad) fehlgeschlagen.push(r.url()); });
    const antwort = await p.goto(B + pfad, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => ({
      lang: document.documentElement.lang, dir: document.documentElement.dir,
      haupt: document.getElementById('t-haupt').getAttribute('href'),
      links: [...document.querySelectorAll('#marken a')].map((a) => a.getAttribute('href')),
      demoHinweis: !!document.getElementById('t-demo'),
      fonts: [...document.fonts].filter((f) => f.status === 'error').length,
    }));
    ok(antwort.status() === 404 && r.lang === lang && (lang !== 'ar' || r.dir === 'rtl') && r.haupt === haupt
      && r.links.every((h) => h.startsWith(start + '#')) && !r.links.some((h) => /demo/.test(h))
      && r.demoHinweis === /demo/.test(pfad) && meldungen.length === 0 && fehlgeschlagen.length === 0 && r.fonts === 0,
      `/${pfad}: 404, lang=${lang}, Hauptknopf ${r.haupt}${r.demoHinweis ? ', Hinweis „keine Demo mehr“' : ''}`
      + (meldungen.length || fehlgeschlagen.length ? ' — ' + [...meldungen, ...fehlgeschlagen].join(', ') : ''));
    if (pfad === 'ar/x/y' || pfad === 'demo/') await p.screenshot({ path: path.join(AUS, `404-${pfad.replace(/\W+/g, '-')}.png`) });
    await p.close();
  }
  // Every font file named in a delivered page or stylesheet exists (fonts were thinned out in 69-17).
  const fehlendeSchriften = [];
  for (const datei of ['index.html', 'en/index.html', 'ar/index.html', '404.html', 'assets/css/fonts.css']) {
    for (const [, n] of fs.readFileSync(path.join(WURZEL, datei), 'utf8').matchAll(/fonts\/([\w.-]+\.woff2)/g)) {
      if (!fs.existsSync(path.join(WURZEL, 'assets/fonts', n))) fehlendeSchriften.push(`${datei}: ${n}`);
    }
  }
  ok(fehlendeSchriften.length === 0, 'alle referenzierten Schriftdateien vorhanden' + (fehlendeSchriften.length ? ' — ' + fehlendeSchriften.join(', ') : ''));
  ok(!fs.existsSync(path.join(WURZEL, 'assets/fontawesome')), 'Font Awesome entfernt (0 Referenzen)');

  console.log('\nBühne: three.js nur bei Bedarf (69-02)');
  const modul = fs.readFileSync(path.join(WURZEL, 'index.html'), 'utf8');
  ok(!/import \* as THREE from 'three'/.test(modul) && modul.includes("await import('three')"), 'kein statischer three-Import, dynamischer Import vorhanden');
  ok(await seite.evaluate(() => performance.getEntriesByType('resource').some((e) => /three\.module/.test(e.name))), '1400 px: three.js geladen (Bühne in Sicht)');

  console.log('\nMobil (390 px)');
  const handy = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  handy.on('pageerror', (f) => skriptfehler.push('mobil: ' + f.message));
  const dreiMobil = [];
  handy.on('request', (r) => { if (/three\.module/.test(r.url())) dreiMobil.push(r.url()); });
  await handy.goto(B + '?lang=de', { waitUntil: 'networkidle' });
  await handy.waitForTimeout(600);
  ok(await handy.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    'kein Querlauf: scrollWidth ' + await handy.evaluate(() => document.documentElement.scrollWidth));
  ok(dreiMobil.length === 0, '390 px: three.js nicht geladen (Wächter < 900 px)');
  await handy.locator('#paketfinder').screenshot({ path: path.join(AUS, 'finder-mobil.png') });
  await handy.locator('.anfrage').screenshot({ path: path.join(AUS, 'anfrage-mobil.png') });
  await handy.locator('#herunterladen').screenshot({ path: path.join(AUS, 'download-mobil.png') });

  console.log('\nSkriptfehler: ' + skriptfehler.length + (skriptfehler.length ? '\n  ' + skriptfehler.join('\n  ') : ''));
  ok(skriptfehler.length === 0, 'keine Skriptfehler');
} finally {
  await browser.close();
  server.close();
}
console.log(`\nBildschirmfotos: ${AUS}`);
console.log(fehler ? `RAUCHTEST_FEHLER ${fehler}` : 'RAUCHTEST_OK');
process.exit(fehler ? 1 : 0);
