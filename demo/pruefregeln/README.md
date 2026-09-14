# Prüfregeln (IDS-Dateien) der Prüf-Suite

Dieser Ordner enthält die **mitgelieferten** buildingSMART-IDS-1.0-Regelsätze
für die Prüf-Suite (Reiter Modellprüfung, `/ModelCheck`). Der Regelsatz-Wähler
liest die Liste aus `index.json` (`[{ datei, titel, quelle }]`, Pfade relativ
zu `public/`).

## rohbau-nhr.ids — Rohbau NHR Erlangen (LOI LPH5)

**Erzeugt, nicht von Hand geschrieben.** Quelle: die LOI-Liste des Bauherrn
(Stand 07.08.2026, `.planning/quellen/rohbau-bim-erlangen/LOI-Liste_2026-08-07.csv`,
NDA — die Liste selbst liegt nicht in `public/`, nur das erzeugte Ergebnis).

Neu erzeugen (deterministisch — gleiche CSV ergibt byte-gleiche Datei):

```
node tools/loi-zu-ids.mjs                    # LPH5, sieben Rohbau-Blätter
node tools/loi-zu-ids.mjs --lph 8            # As-Built-Pflichten (LPH8)
node tools/loi-zu-ids.mjs --blaetter Wand,Decken --nach ziel.ids
```

Inhalt (7 Spezifikationen, Pflicht = „x" in LPH5-Spalte, Entscheidung D-P71-03):
Fassade 15 · Wand 18 · Stützen 12 · Decken 12 · Träger 12 · Treppenpodeste 10 ·
Treppen 9 Merkmale. Entity-Facetten als enumeration UPPERCASE (D-P71-02);
Beispielwerte der LOI (Spalte G) sind **keine** Wertrestriktionen.

### Nicht prüfbare Merkmale (bewusst ausgelassen)

- **SiteName / BuildingName / BuildingStoreyName** — wären `partOf`-Facetten;
  `evaluateIds` (ids.js) wertet partOf nicht aus (raeumliche Struktur fehlt in
  der Elementliste). 21 Merkmale der LOI insgesamt.
- **Treppenpodeste: `ifcTypeObject: Landing`** — nicht als PredefinedType-
  Facette geschrieben: ob die Revit-Modelle den Typ auf der Instanz tragen,
  ist unbelegt (71-RESEARCH misst ihn nicht); eine zu enge Facette würde die
  ganze Spezifikation „0 anwendbar" melden statt echte Merkmalslücken.
- **Datenlücken der LOI**: bei Tür/Treppen/Treppenpodeste heißt die Ifc
  Variable der „Element ID" `zu definieren`, aber der Beispielwert ist eine
  GUID — der Generator leitet daraus `attribute GlobalId` ab und warnt.
- **Mehrdeutige Angaben**: „RG:BaseQuantities/BG:NHR" (Tür/Wanddicke) → RG-Teil
  (Rechnergebäude, Fachsicht TX per D-P71-10); „Width / Thickness" (Stützen) →
  erster Name. Beides als Warnung beim Erzeugen protokolliert.

### Wartungsmerkmale

Hersteller/Lieferant/Seriennummer/Garantiedauer/Lebensdauer/Baujahr/DatumAbnahme
sind in der LOI nur für **LPH8** (As-Built) gefordert — in der LPH5-IDS fehlen
sie deshalb. Für die Übergabe `--lph 8` erzeugen (Phase 71-10).

## musterprojekt.ids (unter public/beispiel/)

Die Demo-IDS des Musterprojekts (BRAND-01: FireRating je Wand) gehört zum
Musterprojekt-Pfad und liegt weiter unter `beispiel/`; `index.json` verweist
dorthin, damit der Wähler beide Sätze zeigt.
