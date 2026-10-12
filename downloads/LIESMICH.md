# Belegpaket „So sieht Ihr Befund aus“

Zwei Dateien aus einem Prüflauf mit BIT-Atelier über das mitgelieferte
**Musterprojekt**. Das Musterprojekt ist **synthetisch erzeugt** — es enthält
keinerlei Projekt-, Kunden- oder Personendaten.

| Datei | Format | Inhalt |
|---|---|---|
| `musterpruefbericht.pdf` | PDF, 2 Seiten (erzeugt am 23.09.2026) | der Prüfbericht dieses Laufs |
| `musterbefunde.bcf` | BCF 2.1 (BIM Collaboration Format, buildingSMART) | die drei Befunde als Issues mit Blickpunkt — öffnet sich in Solibri, BIMcollab, Catenda und anderen BCF-fähigen Programmen |

Die drei Befunde sind absichtlich eingebaut:

1. **Harte Kollision** — Lüftungskanal gegen Unterzug
2. **Doppelte Modellierung** — eine Außenwand zweimal deckungsgleich
3. **IDS-Verstoß** — eine Außenwand ohne Feuerwiderstandsklasse

## Woher das Modell kommt

Das geprüfte Modell (`musterprojekt.ifc`, IFC4) und die Prüfregel
(`musterprojekt.ids`, Information Delivery Specification nach buildingSMART IDS)
liegen der Open-Source-Fassung von BIT-Atelier bei. Dort startet „Musterprojekt
prüfen“ in der Prüf-Suite genau diesen Lauf — Sie können die Dateien hier also
selbst nachvollziehen:
<https://github.com/mozzi86/bit-atelier-oss>

## Lizenz

Die Dateien dieses Belegpakets stehen unter der
**Creative Commons Namensnennung 4.0 International (CC BY 4.0)**:
<https://creativecommons.org/licenses/by/4.0/deed.de>

Sie dürfen sie teilen und bearbeiten, auch kommerziell — mit Namensnennung,
zum Beispiel:

> Musterprüfbericht und Musterbefunde: BIT-ATELIER (bit-atelier.de), CC BY 4.0

Die Software BIT-Atelier selbst steht unter der MIT-Lizenz (siehe Repository).
