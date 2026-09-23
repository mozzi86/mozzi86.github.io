#!/usr/bin/env node
// Erzeugt die Bildformate, die außerhalb des Browsers gebraucht werden
// (Phase 65-06): Favicon-PNGs, Apple-Touch-Icon und das OG-Vorschaubild.
//
// Warum überhaupt: Ohne Favicon ist der Tab namenlos, und als Vorschaubild
// diente bisher ein beschnittenes Gebäudefoto ohne Wortmarke und ohne Aussage —
// bei jedem geteilten Link ist das die erste und oft einzige Wirkung.
//
// Warum ein Generator: Die Bilder müssen reproduzierbar sein und dürfen keine
// Binärdateien sein, die niemand neu erzeugen kann. Gerendert wird mit dem
// Chromium aus Playwright (liegt im App-Repo als Dev-Abhängigkeit) — die
// Website selbst bekommt dadurch keine Abhängigkeit.
//
// Rein: die Wortmarke aus index.html (symbol #logo-mark) und die Seitenfarben.
// Raus: assets/img/favicon-180.png, favicon-192.png, favicon-512.png,
//       assets/img/og-bit-atelier.png (1200 × 630)
//
// Aufruf (Playwright kommt aus dem App-Repo):
//   node --experimental-default-type=module tools/bilder-erzeugen.mjs
// oder aus dem App-Repo heraus:
//   node "…/BIT-Atelier-Web/tools/bilder-erzeugen.mjs"

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Playwright liegt im App-Repo; die Website bleibt abhängigkeitsfrei.
const APP_REPO = 'C:/Users/Asus TUF Z590 P Wifi/My Drive/bit-atelier-app';
const require = createRequire(path.join(APP_REPO, 'package.json'));
const { chromium } = require('playwright');

const WURZEL = path.resolve(import.meta.dirname, '..');
const ZIEL = path.join(WURZEL, 'assets', 'img');

const GRUND = '#0c1117';
const AKZENT = '#2dd4bf';
const HELL = '#f2f6f8';
const GEDAEMPFT = '#7d8b9c';

/** Die Marke aus index.html, hier als eigenständiges SVG. */
const MARKE = `
<g fill="none" stroke="${AKZENT}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M20 64 H74"/><path d="M54 64 V18 L68 9 V64"/><path d="M38 64 V34 H54"/>
</g>
<g fill="none" stroke="${AKZENT}" stroke-width="1.4">
  <rect x="41" y="40" width="3.4" height="3.4"/><rect x="47.2" y="40" width="3.4" height="3.4"/>
  <rect x="41" y="48" width="3.4" height="3.4"/><rect x="47.2" y="48" width="3.4" height="3.4"/>
  <rect x="41" y="56" width="3.4" height="3.4"/><rect x="47.2" y="56" width="3.4" height="3.4"/>
</g>
<g fill="${AKZENT}">
  <rect x="30" y="29" width="4" height="4"/><rect x="29" y="39" width="4" height="4"/>
  <rect x="31" y="49" width="3.6" height="3.6"/><rect x="29.4" y="58" width="3.2" height="3.2"/>
  <rect x="23" y="33" width="3.4" height="3.4"/><rect x="24" y="45" width="3.2" height="3.2"/>
  <rect x="21" y="54" width="3" height="3"/><rect x="15" y="37" width="2.8" height="2.8"/>
</g>`;

/** Quadratisches Icon in der gewünschten Kantenlänge. */
function iconSeite(px) {
  return `<body style="margin:0">
  <svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 104 104">
    <rect width="104" height="104" fill="${GRUND}"/>
    <g transform="translate(0,16)">${MARKE}</g>
  </svg></body>`;
}

/**
 * Vorschaubild für geteilte Links: Wortmarke, der Satz aus der Bühne, die drei
 * Leistungen. Kein Foto — ein Foto ohne Text sagt beim Teilen nichts.
 */
function ogSeite() {
  return `<body style="margin:0;width:1200px;height:630px;background:${GRUND};
      font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:${HELL};
      display:flex;flex-direction:column;justify-content:center;padding:0 84px;box-sizing:border-box">
    <div style="display:flex;align-items:center;gap:22px;margin-bottom:38px">
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="52" viewBox="0 0 104 72">${MARKE}</svg>
      <span style="font-size:34px;font-weight:700;letter-spacing:.13em">BIT-ATELIER</span>
    </div>
    <div style="font-size:62px;font-weight:700;line-height:1.14;max-width:960px">
      Architektur trifft<br>Digitalisierung
    </div>
    <div style="margin-top:30px;font-size:29px;color:${GEDAEMPFT};line-height:1.45;max-width:960px">
      BIM-Koordination und Modellprüfung mit eigener Prüf-Engine —<br>
      Fehler finden, bevor sie gebaut werden.
    </div>
    <div style="margin-top:44px;display:flex;gap:14px">
      ${['BIM-Koordination', 'Modellprüfung', 'Planung LPH 1–9']
        .map(
          (s) =>
            `<span style="border:1.5px solid ${AKZENT};color:${AKZENT};border-radius:999px;
              padding:9px 21px;font-size:21px">${s}</span>`,
        )
        .join('')}
    </div>
  </body>`;
}

const AUFTRAEGE = [
  { datei: 'favicon-180.png', breite: 180, hoehe: 180, html: () => iconSeite(180) },
  { datei: 'favicon-192.png', breite: 192, hoehe: 192, html: () => iconSeite(192) },
  { datei: 'favicon-512.png', breite: 512, hoehe: 512, html: () => iconSeite(512) },
  { datei: 'og-bit-atelier.png', breite: 1200, hoehe: 630, html: ogSeite },
];

fs.mkdirSync(ZIEL, { recursive: true });
const browser = await chromium.launch();
try {
  for (const a of AUFTRAEGE) {
    const seite = await browser.newPage({
      viewport: { width: a.breite, height: a.hoehe },
      deviceScaleFactor: 1,
    });
    await seite.setContent(a.html(), { waitUntil: 'load' });
    const png = await seite.screenshot();
    fs.writeFileSync(path.join(ZIEL, a.datei), png);
    console.log(`  ${String((png.length / 1024).toFixed(1)).padStart(7)} KB  assets/img/${a.datei}`);
    await seite.close();
  }
} finally {
  await browser.close();
}
