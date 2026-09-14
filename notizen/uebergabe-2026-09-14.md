# Übergabe — Stand 14.09.2026

**Zweig** `claude/determined-allen-iv68pe`, basiert auf `main` = `9ded2b3`.
**Nicht gepusht:** Die Claude-GitHub-App hat für dieses Repo kein Schreibrecht
(403 auf `git push` und auf die GitHub-API). Die Commits liegen im Bundle
`bit-atelier-ideen.bundle`, das in der Sitzung übergeben wurde.

```
git fetch bit-atelier-ideen.bundle claude/determined-allen-iv68pe:claude/determined-allen-iv68pe
git checkout claude/determined-allen-iv68pe
git push -u origin claude/determined-allen-iv68pe
```

Damit Claude künftig selbst pushen kann: der App unter
<https://github.com/apps/claude/installations/select_target> für dieses Repo
*Contents: write* geben.

> **Vor einem Merge nach `main`:** Der Ordner `notizen/` wäre unter
> `bit-atelier.de/notizen/` öffentlich (`.nojekyll` liefert alles aus). Entweder
> den Ordner vor dem Merge entfernen oder die Notizen auf dem Zweig belassen.

---

## Was auf dem Zweig liegt

| Commit | Inhalt |
|---|---|
| `88636d5` | `notizen/ideen-2026-09-14.md` — zehn Vorschläge mit Ist-Stand, Nutzen, Weg |
| `4627d62` | Vier Vorschläge umgesetzt (siehe unten), EN/AR neu erzeugt |
| *dieser*  | Diese Übergabe, `tools/rauchtest.mjs` |

### Umgesetzt (Website, `index.html` + `assets/js/sprachen.js`)

**Paketfinder** (`#paketfinder`, im Abschnitt `#pakete`)
Drei Fragen — Bausumme, Fachmodelle, Phase — als Knopfgruppen; die Einordnung
steht in `finderEmpfehlung()` im Inline-Skript. Preise sind ausschließlich die
veröffentlichten Einstiegspreise der drei Karten; **es wird nichts
hochgerechnet.** Wer eine €-Spanne will, füllt `finderEmpfehlung()` mit der
eigenen Tariflogik — das ist die eine Stelle dafür. Der Knopf „Mit diesen
Angaben anfragen" setzt `#a-art`, `#a-summe`, `#a-modelle`, `#a-phase` im
Anfrage-Baukasten und springt dorthin. Unter 5 Mio. € verweist der Finder auf
`#leistungen` (Planung), nicht auf ein Paket.

**Anfrage-Baukasten ohne Sackgasse** (`.anfrage` in `#kontakt`)
`anfrageText()` baut den Text einmal; `anfrageOeffnen()` (mailto),
`anfrageVorschau()` (Live-Vorschau in `#a-vorschau`), `anfrageKopieren()`
(Clipboard-API, Rückfall über Auswahl + `execCommand`), `anfrageDrucken()`
(Druckblatt `#anfrage-druck`, `@media print` blendet alles andere aus). Der
Mailtext folgt der Seitensprache über `wort()` = `window.bitHud`.

**Bühne** (`.buehne__medien`)
Alle fünf Standbilder als `<picture>` mit AVIF- und WebP-Quelle (erzeugt aus
den 1600er-JPEG-Mastern; AVIF ≈ −32 %, WebP ≈ −12 % gegenüber JPEG — die JPEGs
waren bereits eng). `videoPruefen()` bindet das Video zusätzlich an
`navigator.connection.saveData` und `effectiveType` `*2g` (`netzSparsam()`),
mit `change`-Listener.

**Sprache → Demo** (`sprachen.js`, Ende der IIFE)
Klick auf einen same-origin-Link nach `/demo/` (auch `demo/#/ModelCheck…`)
schreibt die Seitensprache nach `localStorage["lang"]` — der Schlüssel, den
die Demo-Hülle (`nr()` in `demo/assets/index-*.js`) liest. `ar → en`, weil die
Demo nur `de`/`en` kennt.

**Wörterbuch** EN/AR für alle neuen Zeichenketten und für den bisher komplett
unübersetzten Anfrage-Baukasten. Weiterhin unübersetzt: `<option>`-Texte und
`placeholder` — `sprachen.js` übersetzt nur Blattelemente aus `AUSWAHL`.

**Werkzeug** `tools/sprachkopien-erzeugen.mjs`: `BIT_APP_REPO` (Ordner mit
`playwright` oder `playwright-core`) und `BIT_CHROMIUM` (Chromium-Datei) für
Läufe außerhalb des eigenen Rechners; Abbruch bei Skriptfehlern auf der Seite;
Zählung unübersetzter Blöcke; `#finder-ergebnis` und `#a-vorschau` werden
nicht mehr eingefroren.

### Prüfung

```
node tools/rauchtest.mjs            # 41 Schritte, Exit 1 bei Fehlern
node tools/sprachkopien-erzeugen.mjs   # nach jeder Änderung an index.html / sprachen.js
```

Beide laufen mit Playwright aus dem App-Repo (Vorgabe) oder mit
`BIT_APP_REPO=… BIT_CHROMIUM=…`. Stand 14.09.2026: alle 41 Schritte grün, keine
Skriptfehler, kein Querlauf bei 390 px, Chromium wählt AVIF, Druckansicht
zeigt nur das Blatt. Unübersetzter Altbestand: 36 Blöcke EN, 30 AR — vor allem
Downloads- und Nachweis-Abschnitt, Chips, HUD-Zahlen.

---

## Offen in diesem Repo

| # | Was | Warum nicht jetzt | Weg |
|---|---|---|---|
| B-01 | Referenzen-Abschnitt | Inhalt sind reale Projekte — nicht zu erfinden | `#referenzen` zwischen `#pakete` und `#werkzeuge`, `.karte`-Raster, je Karte `schema.org/CreativeWork` im JSON-LD |
| #3 | „Befund des Monats" | Inhalt sind reale Befunde | Datenfeld + Vorlage in `index.html`; Sprachkopien wie bisher |
| B-02 | Unterseiten `/bim-koordination/`, `/modellpruefung-ids-bcf/`, `/nova-pdf/` | URL-Struktur ist eine Entscheidung für Jahre | `sprachkopien-erzeugen.mjs` um Abschnitt-Schnitt erweitern: eigener `<title>`, Description, Canonical, hreflang-Tripel; `sitemap.xml` ergänzen |
| B-05 | Terminlink unter dem Baukasten | Kein Buchungswerkzeug bekannt | Ein `<a class="btn btn--geist">` in `.anfrage__fuss` |
| B-03 | WebM/AV1-Videofassung | Kein Encoder in der Sitzung | `ffmpeg -i bauablauf-1280.mp4 -c:v libsvtav1 -crf 38 …`, zweite `<source>` am Video |
| — | `<option>`/`placeholder` übersetzen | Erweiterung von `sprachen.js` | In `setze()` zusätzlich `option` und `[placeholder]` behandeln; Wortlaut der Optionen ist bereits im Wörterbuch (Finder-Knöpfe) |
| — | Finder-Preisspanne | Braucht die eigene Tariflogik | `finderEmpfehlung()` um `spanne` erweitern, `finderZeigen()` zeigt sie |

---

## Übergabe ans App-Repo (`bit-atelier-app`)

Hier liegt die Plattform nur als gebautes Bundle unter `demo/`. Alles Folgende
gehört ins App-Repo; der Demo-Build wird danach wie gewohnt hierher kopiert.
Reihenfolge nach Hebel:

1. **Eigenes Modell von der Startseite prüfen** (Ideen #1 / B-04).
   Website und Demo sind same-origin. Ablagefläche im Abschnitt `#werkzeuge`
   schreibt die IFC-Datei nach IndexedDB (eigener Store, z. B.
   `bit-atelier-uebergabe`), öffnet `demo/#/ModelCheck?eigenes=1`; die Route
   liest den Store aus, startet den Lauf, löscht den Eintrag. Der Website-Teil
   (Drop-Zone, Store schreiben) kann hier gebaut werden, sobald der Store-Name
   feststeht.

2. **Sprache aus der Adresse** (B-06, Teil 2–3). `nr()` liest heute nur
   `localStorage["lang"]`. Zusätzlich `?lang=` aus `location.search` bzw. dem
   Hash auswerten und speichern; dann kann die Website den Link statt
   localStorage nutzen. Arabisch: Hülle + `dir="rtl"`; `mapbox-gl-rtl-text.js`
   liegt schon bei. Danach `ar → en` in `sprachen.js` (Website) auf `ar → ar`
   ändern.

3. **Rundgang** (#6 / B-07). Vier bis sechs Schritte auf dem Demo-Seed:
   Projekt → Musterprojekt-IFC → Prüflauf → Befund (→ LV-Position → Baustelle).
   Die drei eingebauten Befunde des Musterprojekts (`demo/beispiel/README.md`)
   sind die Dramaturgie. Startzustand für Besucher, die über „Demo starten"
   kommen (z. B. `?rundgang=1`, den die Website anhängt).

4. **Ladebudget** (#7 / B-03). `ModelCheck` + `ifcImport` nach dem
   Interaktivwerden in `requestIdleCallback` vorholen; Route-Chunks beim
   Überfahren des Navigationseintrags; benannter Wartezustand („IFC-Kern wird
   geladen — 3,6 MB") statt leerem Suspense; Karte (`map-*.js`, 1,05 MB) erst
   in den Routen laden, die sie brauchen.

5. **Prüflauf gegen Prüflauf** (#10). `ModelVersions` existiert als Route.
   Vergleich zweier Läufe: erledigt / neu / weiterhin offen je Fachmodell,
   Einseitige für den Bauherrn (jsPDF ist im Bundle).

6. **Regelwerk sichtbar und exportierbar** (#9). Gewerkepaar-Matrix,
   Toleranzen, Duplikatregeln, IDS-Anforderungen als Bildschirm, Aus-/Einlesen
   als JSON — Übergabeobjekt nach Paket 1.

7. **Befund-Paket** (B-10). Am Ende des Prüflaufs ein Download: PDF-Bericht +
   BCF + kurze HTML-Zusammenfassung, benannt nach Projekt und Datum.

8. **Schnappschüsse** (B-09) und **Aktionspalette** (B-08): klein, aus
   vorhandenen Bausteinen (Projekt-Export, Tooltip-Texte).

Nach jedem App-Build: `demo/` hier ersetzen, `demo/sw.js` wird vom Build
erzeugt (`npm run build:demo`), Commit „Demo neu gebaut auf App-Stand <hash>"
wie bisher.

---

## Dateien dieser Sitzung

```
index.html                         Finder, Vorschau/Kopieren/Drucken, <picture>, Netz-Gate
assets/js/sprachen.js              Wörterbuch EN/AR (+ ~70 Einträge), Demo-Sprache
assets/img/bauablauf/*.avif|.webp  20 neue Dateien
en/index.html, ar/index.html       neu erzeugt
tools/sprachkopien-erzeugen.mjs    Umgebungsvariablen, Fehlerabbruch, Zählung
tools/rauchtest.mjs                neu
notizen/ideen-2026-09-14.md        Vorschläge
notizen/uebergabe-2026-09-14.md    diese Datei
```
