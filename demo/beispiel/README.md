# Musterprojekt der Online-Demo

**Synthetisch erzeugt — enthält keinerlei Projekt- oder Kundendaten.**

Erzeugt von `tools/beispielmodell-erzeugen.mjs`. Neu erzeugen:

```
node tools/beispielmodell-erzeugen.mjs
```

Der Lauf ist deterministisch: feste GlobalIds, fester Zeitstempel im Kopf,
feste Reihenfolge. Ein zweiter Lauf ändert die Dateien nicht.

## Was drin ist

Eine Halle 12 × 8 m, lichte Höhe 3 m, ein Geschoss, 9 Bauteile:
Bodenplatte, vier Außenwände, zwei Unterzüge, ein Lüftungskanal.

## Die drei eingebauten Befunde

| Befund | Wo | Was die Prüf-Suite meldet |
|---|---|---|
| **Harte Kollision** | Lüftungskanal Zuluft × Unterzug Achse B | Der Kanal läuft auf 2,60–3,00 m durch den Unterzug. |
| **Doppelte Modellierung** | Aussenwand Ost | Zweimal deckungsgleich modelliert, eigene GlobalId — im 3D unsichtbar, in der Menge doppelt. |
| **IDS-Verstoß** | Aussenwand Nord | Ohne `Pset_WallCommon.FireRating`, das `musterprojekt.ids` verlangt. |

Erwartete Zahlen (auch im Test festgehalten, `tests/unit/beispielmodell.test.js`):
{
  "hart": 1,
  "duplikate": 1,
  "idsFehler": 1,
  "bauteile": 9,
  "geschosse": 1
}

Alles andere ist bewusst kollisionsfrei: die Unterzüge beginnen bei x = 0,50 m
und berühren die Wände nicht, der Kanal endet bei x = 7,00 m und erreicht die
Ostwand nicht, die Bodenplatte liegt vollständig unter z = 0.
