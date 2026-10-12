#!/usr/bin/env node
// Checks the website's HOAI calculator (assets/js/hoai2021.js, 93-08) against the
// app's fee engine: same table (§ 35 Abs. 1), same work-stage shares (§ 34 Abs. 3),
// same results of honorarAusTafel() and of the LPH split of honorarVertrag()
// over a grid of chargeable costs × zones × positions × both service profiles.
//
// In:  assets/js/hoai2021.js, the app repo (BIT_APP_REPO, default as in
//      sprachkopien-erzeugen.mjs) — packages/nova-core/src/lib/hoai/*.js.
// Out: one line per check, "HOAI_OK" or "HOAI_FEHLER <n>" and exit code 1.
//
// Call: node tools/hoai-pruefen.mjs

import path from 'node:path';
import { pathToFileURL } from 'node:url';

const APP_REPO = process.env.BIT_APP_REPO || 'C:/Users/Asus TUF Z590 P Wifi/My Drive/bit-atelier-app';
const HOAI = path.join(APP_REPO, 'packages/nova-core/src/lib/hoai');
const WURZEL = path.resolve(import.meta.dirname, '..');

await import(pathToFileURL(path.join(WURZEL, 'assets/js/hoai2021.js')).href);
const web = globalThis.bitHoai;
const tafel = await import(pathToFileURL(path.join(HOAI, 'tafel2021.js')).href);
const lb = await import(pathToFileURL(path.join(HOAI, 'leistungsbilder.js')).href);
const engine = await import(pathToFileURL(path.join(HOAI, 'honorar.js')).href);

let fehler = 0;
const ok = (bed, was) => { console.log((bed ? '  ✓ ' : '  ✗ ') + was); if (!bed) fehler++; };

ok(JSON.stringify(web.TAFEL) === JSON.stringify(tafel.TAFEL_GEBAEUDE_INNENRAEUME), `Tafel § 35 Abs. 1: ${web.TAFEL.length} Zeilen wortgleich`);
ok(web.GEPRUEFT_AM === tafel.GEPRUEFT_AM && web.QUELLE === tafel.QUELLE.p35, `Quelle und Prüfdatum gleich (${web.GEPRUEFT_AM})`);
for (const k of ['gebaeude', 'innenraeume']) {
  ok(JSON.stringify(web.LPH[k]) === JSON.stringify(lb.LPH[k].map((s) => s.prozent)), `Leistungsanteile ${k}: ${web.LPH[k].join('/')}`);
}

// Grid: table rows, values between rows, both ends, outside the table.
const kosten = [25000, 31000, 100000, 123456.78, 425000, 999999, 1000000, 2750000, 8000000, 24999999, 25000000, 24999, 25000001];
const zonen = ['I', 'II', 'III', 'IV', 'V'];
const positionen = [0, 25, 50, 100];
let gleich = 0, verglichen = 0;
const abweichungen = [];
for (const k of kosten) for (const z of zonen) for (const pos of positionen) for (const bild of ['gebaeude', 'innenraeume']) {
  const a = engine.honorarAusTafel(k, z, pos, bild);
  const w = web.honorarAusTafel(k, z, pos);
  verglichen++;
  const tafelGleich = a.basis === w.basis && a.oben === w.oben && a.honorar === w.honorar && a.ausserhalb === w.ausserhalb;
  // LPH split as in honorarVertrag (all nine stages commissioned, no surcharges).
  let lphGleich = true;
  if (a.honorar !== null) {
    const v = engine.honorarVertrag({ leistungsbild: bild, kg300_euro: k, kg400_euro: 0, honorarzone: z, satz_position_prozent: pos,
      lph: lb.LPH[bild].map((s) => ({ beauftragt: true, prozent: s.prozent })), nebenkosten_prozent: 0, ust_satz: 0 });
    const r = web.rechne({ kostenEuro: k, zone: z, positionProzent: pos, leistungsbild: bild, phasen: Array(9).fill(true) });
    lphGleich = v.grund === r.summe.betrag && v.lph.every((s, i) => s.betrag === r.phasen[i].betrag);
  }
  if (tafelGleich && lphGleich) gleich++;
  else abweichungen.push(`${k} ${z} ${pos}% ${bild}: App ${a.honorar} / Web ${w.honorar}`);
}
ok(gleich === verglichen, `${verglichen} Fälle (Kosten × Zone × Satz × Leistungsbild) gleich der App-Engine, inkl. LPH-Aufteilung` +
  (abweichungen.length ? '\n    ' + abweichungen.slice(0, 10).join('\n    ') : ''));

// Spot values a reader can check by hand against the printed table.
const tab = (k, z, i) => tafel.TAFEL_GEBAEUDE_INNENRAEUME.find((r) => r[0] === k)[1][i];
ok(web.honorarAusTafel(1000000, 'III', 0).honorar === tab(1000000, 'III', 2) && web.honorarAusTafel(1000000, 'III', 100).honorar === tab(1000000, 'III', 3),
  `Tafelzeile 1 Mio. €, Zone III: Basissatz ${tab(1000000, 'III', 2)} €, oberer Satz ${tab(1000000, 'III', 3)} €`);
ok(web.honorarAusTafel(24999, 'III', 0).ausserhalb && web.honorarAusTafel(25000001, 'III', 0).ausserhalb, 'außerhalb 25.000 € – 25 Mio. €: keine Tafelwerte (frei vereinbar)');

console.log(fehler ? `HOAI_FEHLER ${fehler}` : 'HOAI_OK');
process.exit(fehler ? 1 : 0);
