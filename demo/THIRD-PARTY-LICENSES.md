# Third-Party-Lizenzen

Diese Datei dokumentiert Open-Source-Komponenten mit Hinweispflichten, die mit
der BIT-Atelier-Plattform an den Browser ausgeliefert werden. Permissiv
lizenzierte Abhängigkeiten (MIT/ISC/BSD/Apache-2.0) sind über `package.json`
und npm nachvollziehbar und hier nicht einzeln gelistet.

## @mapbox/mapbox-gl-rtl-text — BSD-2-Clause

- **Version:** 0.3.x (npm) · Kopie der `dist/mapbox-gl-rtl-text.js` liegt unter
  `public/mapbox-gl-rtl-text.js` (Map-Worker lädt sie per importScripts —
  ein Vite-Modulimport würde sie im Dev-Server transformieren).
- **Was:** RTL-Text-Shaping (Arabisch/Hebräisch, ICU-Bidi) für MapLibre-Karten.
- **Lizenz:** BSD-2-Clause (permissiv) — Hinweis genügt.
  Quelle: https://github.com/mapbox/mapbox-gl-rtl-text

## @salusoft89/planegcs — LGPL-2.1-or-later

- **Version:** 1.2.0 (gepinnt)
- **Was:** 2D-Geometric-Constraint-Solver aus FreeCAD (PlaneGCS,
  © 2011 Konstantinos Poulios u. a.) als WebAssembly-Build mit
  TypeScript-Wrapper von Salusoft89 (Miroslav Šerý).
- **Lizenz:** GNU Lesser General Public License 2.1 or later.
  Volltext: `node_modules/@salusoft89/planegcs/LICENSE` sowie
  https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
- **Quellcode:** https://github.com/Salusoft89/planegcs (Wrapper + Build) und
  https://github.com/FreeCAD/FreeCAD `src/Mod/Sketcher/App/planegcs` (C++-Kern).
  Zusätzlich lokal archiviert: `vendor/salusoft89-planegcs-1.2.0.tgz`
  (npm-Tarball der gepinnten Version inkl. TypeScript-Quellen des Wrappers).

**Compliance-Maßnahmen in diesem Repo** (Austauschbarkeit gemäß LGPL §6):

1. Die `.wasm`-Datei wird als separates Asset ausgeliefert (Vite `?url`-Import,
   kein Inlining) — funktionales Äquivalent zu Dynamic Linking.
2. Der LGPL-JS-Wrapper wird als eigener Chunk gebaut
   (`build.rollupOptions.output.manualChunks.planegcs` in `vite.config.js`)
   und zusätzlich nur lazy importiert (`packages/bit-sketch/src/lib/solver.js`) —
   er wird nie in den proprietären App-Code eingeschmolzen.
3. Das Paket wird unmodifiziert verwendet. Jede Modifikation (auch am
   TS-Wrapper) müsste als LGPL-Quellcode veröffentlicht werden (Fork).
4. Nutzungsbedingungen der Plattform dürfen Reverse Engineering dieses
   Bibliotheks-Teils nicht verbieten (LGPL-Carve-out nötig).
