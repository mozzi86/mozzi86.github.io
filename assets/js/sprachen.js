/* ===========================================================================
   BIT-ATELIER — Sprachumschaltung Deutsch / Englisch / Arabisch
   ---------------------------------------------------------------------------
   Aufbau: Das Wörterbuch ist nach dem DEUTSCHEN Quelltext verschlüsselt, nicht
   nach künstlichen Schlüsseln. Vorteil: die Seite braucht keine data-Attribute,
   der deutsche Text im HTML bleibt die Wahrheit, und fehlende Übersetzungen
   fallen automatisch auf Deutsch zurück statt eine leere Stelle zu zeigen.

   Das Impressum wird NICHT übersetzt — ein Rechtstext für deutsche
   Gerichtsbarkeit bleibt deutsch. In EN/AR steht ein Hinweis darüber.

   Arabisch schaltet zusätzlich dir="rtl" und die arabische Schrift.
=========================================================================== */
(function () {
  'use strict';

  const WB = {
    en: {
      'BIT-ATELIER — Architektur trifft Digitalisierung': 'BIT-ATELIER — where architecture meets data',
      'Prinzip': 'Approach',
      'Leistungen': 'Services',
      'Pakete': 'Packages',
      'Werkzeuge': 'Tools',
      'Erfahrung': 'Experience',
      'Kontakt': 'Contact',
      'Open Source': 'Open source',
      'Open Source · Herunterladen': 'Open source · Download',
      'Registrieren': 'Register',
      'Anmelden': 'Sign in',
      'Projekt anfragen': 'Start a project',
      'Leistungspakete': 'Service packages',
      'Baufeld': 'The site',
      'Scrollen ↓': 'Scroll ↓',

      'Kapitel 01 · Baufeld': 'Chapter 01 · The site',
      'Architektur trifft <em>Digitalisierung</em>.': 'Where architecture meets <em>data</em>.',
      'Jedes Projekt beginnt mit den Regeln des Ortes: Grenzen, Himmelsrichtung, Sonnenlauf, Nachbarschaft. Ich halte sie im Modell fest, bevor die erste Linie gezeichnet wird — als eingetragener Architekt mit einem Master für klimaoptimiertes Bauen.':
        'Every project starts with the rules of its place: boundaries, orientation, the path of the sun, the neighbourhood. I record them in the model before the first line is drawn — as a chartered architect holding a master’s degree in climate-responsive design.',
      'Bestandsaufnahme': 'Site survey',
      'Baurecht': 'Planning law',
      'Sonnenstudie': 'Solar study',

      'Kapitel 02 · Gründung': 'Chapter 02 · Foundations',
      'Alles Gute steht auf <em>Millimetern</em>.': 'Everything good stands on <em>millimetres</em>.',
      'Fundamente, Sohlplatte, Durchbrüche für die Technik — im Modell verortet, bevor der erste Kubikmeter Beton fließt. Was hier stimmt, kostet später nichts.':
        'Footings, base slab, service penetrations — located in the model before the first cubic metre of concrete is poured. What is right here costs nothing later.',
      'Gründung': 'Foundations',
      'Durchbruchsplanung': 'Penetration planning',
      'Mengen': 'Quantities',

      'Kapitel 03 · Tragwerk': 'Chapter 03 · Structure',
      'Das Haus wächst <em>zuerst im Modell</em>.': 'The building rises <em>in the model first</em>.',
      'Decken, Stützen, Erschließungskern — Geschoss um Geschoss. Jedes Bauteil trägt seine Daten mit: Material, Schicht, Brandschutz, Kosten. Ein Bauteil, eine Wahrheit.':
        'Slabs, columns, circulation core — storey by storey. Every component carries its own data: material, layer, fire rating, cost. One component, one truth.',
      'Tragwerk': 'Structure',
      'IFC-Struktur': 'IFC structure',

      'Kapitel 04 · Hülle': 'Chapter 04 · Envelope',
      'Fassade, Fenster, <em>Licht</em>.': 'Facade, windows, <em>light</em>.',
      'Die Hülle entscheidet, wie sich ein Haus anfühlt — und was es verbraucht. Öffnungen, Verschattung und Aufbau prüfe ich am Modell und rechne die Energiebilanz mit, nicht hinterher.':
        'The envelope decides how a building feels — and what it consumes. I test openings, shading and build-up on the model and calculate the energy balance alongside, not afterwards.',
      'Fassadenaufbau': 'Facade build-up',
      'Verschattung': 'Shading',
      'Energiebilanz': 'Energy balance',

      'Kapitel 05 · Technik &amp; Prüfung': 'Chapter 05 · Services &amp; checking',
      'Der Fehler wird gefunden, <em>bevor er teuer wird</em>.': 'The error is found <em>before it gets expensive</em>.',
      'Röntgenblick auf Leitungen, Kanäle und Schächte. Meine eigene Prüf-Engine fährt Kollisionsprüfung und IDS über das Modell und gibt die Befunde als BCF an die Fachplaner zurück. Rot wird grün — im Rechner, nicht auf der Baustelle.':
        'An X-ray view of pipes, ducts and shafts. My own checking engine runs clash detection and IDS across the model and returns the findings to the specialist designers as BCF. Red turns green — in the computer, not on site.',
      'Kollisionsprüfung': 'Clash detection',

      'Kapitel 06 · Übergabe': 'Chapter 06 · Handover',
      'Fertig ist erst, wenn es <em>stimmt</em>.': 'It is only finished when it is <em>right</em>.',
      'Am Ende steht ein Haus — und ein Modell, das zu ihm passt. Mengen, Kosten, Bauteile, Wartung: übergeben als offene Daten, nicht als Aktenordner.':
        'At the end there is a building — and a model that matches it. Quantities, costs, components, maintenance: handed over as open data, not as ring binders.',
      'Übergabemodell': 'Handover model',
      'Betrieb': 'Operation',

      'Das BIT-Atelier Prinzip': 'The BIT-Atelier approach',
      'Präzision trifft <em>Ästhetik</em>.': 'Precision meets <em>design</em>.',
      'Gutes Design allein reicht im Bauwesen nicht mehr. Mein Ansatz verbindet die gestalterische Arbeit des Architekten mit der Präzision moderner Datenmethoden — von BIM über Energiesimulation bis zur KI-gestützten Projektentwicklung.':
        'Good design alone is no longer enough in construction. My approach combines the architect’s design work with the precision of modern data methods — from BIM and energy simulation through to AI-assisted project development.',
      'Als eingetragener Architekt und Absolvent des Masters „Klimaoptimiertes Bauen / ClimaDesign" an der TU München bringe ich wissenschaftliche Methodik in jedes Projekt. Nachhaltigkeit ist dabei kein Schlagwort, sondern rechnerische Grundlage.':
        'As a chartered architect and graduate of the master’s programme in climate-responsive design (ClimaDesign) at the Technical University of Munich, I bring scientific method to every project. Sustainability is not a slogan here but a basis for calculation.',
      'Architekt': 'Architect',
      'Bayerische Architektenkammer, Listen-Nr. 192.197': 'Bavarian Chamber of Architects, reg. no. 192.197',
      'M.Sc. TUM': 'M.Sc. TUM',
      'BIM &amp; Digital': 'BIM &amp; digital',
      '15+ Jahre': '15+ years',
      'Planung &amp; Projektleitung': 'Design &amp; project management',

      'Zwei Wege, <em>ein Anspruch</em>.': 'Two routes, <em>one standard</em>.',
      'Ob Sie bauen oder Ihr Großprojekt digital absichern möchten — beides folgt demselben Prinzip: durchdachte, datengestützte Planung ohne Reibungsverluste.':
        'Whether you are building or want to secure a major project digitally — both follow the same principle: considered, data-driven design without friction.',
      'Für Generalplaner, Büros &amp; Bauunternehmen': 'For lead designers, practices &amp; contractors',
      'BIM-Koordination &amp; Modellprüfung': 'BIM coordination &amp; model checking',
      'Externe BIM-Generalleitung für Großprojekte — von der BAP-Strukturierung bis zur kollisionsfreien IFC-Übergabe. Ziel: Planungsfehler werden <em>vor</em> Baubeginn gefunden, nicht auf der Baustelle bezahlt.':
        'External BIM management for major projects — from structuring the BIM execution plan to a clash-free IFC handover. The aim: design errors are found <em>before</em> construction starts, not paid for on site.',
      'Kollisionsfreie IFC-Übergabe vor Ausführungsbeginn — eine verhinderte Rohbau-Kollision spart ein Vielfaches des Honorars':
        'Clash-free IFC handover before construction begins — one avoided structural clash saves many times the fee',
      'AIA &amp; BIM-Abwicklungsplan (BAP) — prüffähig strukturiert nach ISO 19650':
        'Employer’s information requirements &amp; BIM execution plan — structured for auditing to ISO 19650',
      'Automatisierte Modell- und AIA-Konformitätsprüfung mit eigener Prüf-Engine (IFC/IDS), Befund-Rückgabe als BCF an die Fachplaner':
        'Automated model and requirements compliance checking with my own engine (IFC/IDS), findings returned to the specialist designers as BCF',
      'Steuerung der Fachmodelle (Architektur, Tragwerk, TGA) inkl. LOD/LOI':
        'Coordination of the discipline models (architecture, structure, building services) including LOD/LOI',
      'Entlastung Ihrer internen Teams — ohne neue Software-Lizenzen':
        'Relief for your in-house teams — without new software licences',
      'Zu den Leistungspaketen': 'See the service packages',
      'Für Bauherren': 'For clients',
      'Planung &amp; Architektur': 'Design &amp; architecture',
      'Ganzheitliche Planung von Wohn- und Sanierungsprojekten über alle Leistungsphasen — mit dem Blick fürs Detail und für die Energiebilanz.':
        'End-to-end design of residential and refurbishment projects across all work stages — with an eye for the detail and for the energy balance.',
      'Entwurf &amp; Genehmigungsplanung (HOAI 1–4)': 'Concept &amp; planning application design (HOAI stages 1–4)',
      'Werk-, Ausführungs- &amp; Detailplanung (HOAI 5)': 'Technical, construction &amp; detail design (HOAI stage 5)',
      'Wohnungsbau, geförderter Wohnungsbau, KfW': 'Housing, subsidised housing, KfW standards',
      'Sanierung &amp; Denkmalpflege': 'Refurbishment &amp; historic buildings',
      'Barrierefreies &amp; rollstuhlgerechtes Planen (DIN 18040)': 'Accessible &amp; wheelchair-friendly design (DIN 18040)',

      'BIM-Leistungspakete': 'BIM service packages',
      'Klarer Umfang. Klares Ergebnis. <em>Klarer Preis.</em>': 'Clear scope. Clear result. <em>Clear price.</em>',
      'Drei Pakete für Großprojekte ab ca. 10 Mio. € Bausumme — als Festpreis oder monatliches Mandat, bepreist am Projektwert statt nach Stundenzetteln.':
        'Three packages for major projects from around €10 million construction value — as a fixed price or a monthly retainer, priced on project value rather than timesheets.',
      'Paket 1 · Festpreis': 'Package 1 · Fixed price',
      'BIM-Quick-Check &amp; Setup': 'BIM quick check &amp; setup',
      'ab 8.500 € je Projekt': 'from €8,500 per project',
      'Der schnelle, prüffähige Einstieg: Ihr Projekt wird BIM-ablieferfähig — in 2–4 Wochen.':
        'The fast, auditable start: your project becomes fit for BIM delivery — in two to four weeks.',
      'AIA prüfen bzw. erstellen, BAP strukturieren': 'Review or draft the information requirements, structure the BIM execution plan',
      'Koordinationsumgebung aufsetzen (IFC-/openBIM-Standards, Namenskonventionen)':
        'Set up the coordination environment (IFC/openBIM standards, naming conventions)',
      'Automatisierte Erstprüfung des Modells mit Prüfbericht': 'Automated initial model check with a written report',
      '<b>Ergebnis:</b> prüffähiger BAP + dokumentierter Modellstatus':
        '<b>Result:</b> an auditable BIM execution plan and a documented model status',
      'Paket 2 · Festpreis je Planungsstand · Kernleistung': 'Package 2 · Fixed price per design stage · Core service',
      'Automatisierte Modellprüfung &amp; QS': 'Automated model checking &amp; QA',
      'Festpreis je Prüflauf': 'Fixed price per checking run',
      'Jeder Planungsstand wird maschinell geprüft, bevor er teuer wird — mit eigener Prüf-Engine statt Lizenz-Software.':
        'Every design stage is checked by machine before it gets expensive — with my own engine instead of licensed software.',
      'Kollisionsprüfung Architektur / Tragwerk / TGA mit Toleranz- und Duplikatregeln':
        'Clash detection across architecture, structure and building services with tolerance and duplicate rules',
      'IDS-Konformitätsprüfung gegen Ihre AIA (buildingSMART-Standard)':
        'IDS compliance checking against your information requirements (buildingSMART standard)',
      'Befunde als BCF direkt zurück an die Fachplaner + Prüfbericht als PDF':
        'Findings returned directly to the specialist designers as BCF, plus a PDF report',
      '<b>Ergebnis:</b> dokumentiert kollisions- und regelgeprüfter Planungsstand':
        '<b>Result:</b> a design stage documented as clash-checked and rule-compliant',
      'Paket 3 · Monatliches Mandat': 'Package 3 · Monthly retainer',
      'BIM-Gesamtkoordination': 'Overall BIM coordination',
      'ab 4.500 € / Monat': 'from €4,500 per month',
      'Die laufende externe BIM-Leitung über die Planungsphasen — Ihre Teams planen, ich halte die Modelle zusammen.':
        'Ongoing external BIM management across the design stages — your teams design, I hold the models together.',
      'Steuerung der Fachmodelle inkl. LOD/LOI-Vorgaben': 'Coordination of the discipline models including LOD/LOI requirements',
      'Regelmäßige Prüfzyklen mit Koordinationssitzung und Maßnahmenliste':
        'Regular checking cycles with a coordination meeting and an action list',
      'Berichtswesen für Bauherr und Projektsteuerung': 'Reporting for the client and the project managers',
      '<b>Ergebnis:</b> ein koordiniertes Modell als verlässliche Ausführungsgrundlage':
        '<b>Result:</b> a coordinated model as a reliable basis for construction',
      'Alle Preise netto zzgl. gesetzlicher Umsatzsteuer. Bepreisung orientiert an den Vergütungsempfehlungen für BIM-Management (AHO/DVP: üblich 20–25 % des Projektsteuerungshonorars). Konkretes Angebot nach kurzem Gespräch über Projektgröße und Fachmodelle.':
        'All prices are net, excluding statutory VAT. Pricing follows the German fee recommendations for BIM management (AHO/DVP: typically 20–25 % of the project management fee). A firm quotation follows a short conversation about project size and discipline models.',

      'Der Unterschied': 'The difference',
      'Eigene Werkzeuge statt <em>Lizenz-Software</em>.': 'Own tools instead of <em>licensed software</em>.',
      'Die Prüf- und Auswertungswerkzeuge hinter meinen Leistungen sind im eigenen Haus entwickelt: die BIT-Atelier-Plattform liest IFC-Modelle direkt (buildingSMART-Standards, ohne Cloud-Zwang), ermittelt Mengen filterbasiert nach dem Prinzip WAS ∩ ZUSTAND und prüft Modelle auf Kollisionen und AIA-Konformität (IDS) — mit Befund-Rückgabe als BCF.':
        'The checking and evaluation tools behind my services are developed in house: the BIT-Atelier platform reads IFC models directly (buildingSMART standards, no cloud required), derives quantities by filter on a WHAT ∩ STATE principle, and checks models for clashes and requirements compliance (IDS) — returning findings as BCF.',
      'Das heißt für Sie: Prüfregeln, die sich exakt an Ihr Projekt anpassen lassen, keine Lizenzkosten, die auf Ihr Honorar umgelegt werden — und keine Abhängigkeit von Software-Abos Dritter.':
        'For you that means checking rules tailored precisely to your project, no licence costs passed on through the fee — and no dependence on third-party software subscriptions.',
      'IFC-Import': 'IFC import',
      'Geschosse, Bauteile, Eigenschaften, Klassifizierung — direkt aus dem openBIM-Format':
        'Storeys, components, properties, classification — straight from the openBIM format',
      'Regel-Matrix je Gewerkepaar, Toleranzen, Duplikat-Erkennung': 'Rule matrix per discipline pair, tolerances, duplicate detection',
      'IDS-Prüfung': 'IDS checking',
      'AIA-Anforderungen maschinell prüfbar nach buildingSMART IDS': 'Information requirements made machine-checkable to buildingSMART IDS',
      'BCF-Rückgabe': 'BCF return',
      'Befunde landen als offene Issues direkt bei den Fachplanern': 'Findings arrive as open issues directly with the specialist designers',
      'bit-atelier · prüf-suite — Prüfergebnis': 'bit-atelier · checking suite — result',
      'bit-atelier · prüf-engine — Beispiel-Prüflauf': 'bit-atelier · checking engine — sample run',
      'Energiesimulation': 'Energy simulation',
      'AVA &amp; Kostenplanung': 'Tendering &amp; cost planning',
      'Python-Automatisierung': 'Python automation',
      'Prüflauf am mitgelieferten Musterprojekt, direkt im Browser geprüft — harte Kollisionen gefunden, AIA-Anforderungen per IDS kontrolliert, Befunde gehen als BCF zurück an die Fachplaner. Denselben Lauf können Sie mit der Open-Source-Fassung auf Ihrem Rechner selbst starten.':
        'A checking run on the bundled sample project, checked directly in the browser — hard clashes found, information requirements verified via IDS, findings returned to the specialist designers as BCF. You can run the same check yourself with the open-source version on your own computer.',
      'So sieht Ihr Befund aus.': 'This is what your findings look like.',
      'Prüfbericht und Befundliste aus einem Prüflauf über ein mitgeliefertes Musterprojekt — synthetisch erzeugt, keine Projektdaten. Denselben Lauf können Sie in der Open-Source-Fassung mit einem Klick selbst auslösen; das BCF öffnet sich in jeder gängigen Koordinationssoftware.':
        'Check report and findings list from a run on a bundled sample project — synthetic, no project data. You can trigger the same run yourself in the open-source version with one click; the BCF opens in any common coordination software.',
      'Musterprüfbericht (PDF)': 'Sample check report (PDF)',
      'Befunde als BCF': 'Findings as BCF',
      'BIT-Atelier herunterladen': 'Download BIT-Atelier',
      'BIT-Atelier ist Open Source (MIT-Lizenz) und läuft lokal auf Ihrem Rechner — ohne Konto und ohne Lizenzkosten. <a href="#open-source" style="color:var(--accent)">Zum Download</a>.':
        'BIT-Atelier is open source (MIT licence) and runs locally on your computer — no account, no licence fees. <a href="#open-source" style="color:var(--accent)">Go to download</a>.',

      /* Open Source (#open-source, 83-05) */
      'Open Source · MIT-Lizenz': 'Open source · MIT licence',
      'BIT-Atelier ist <em>Open Source</em>.': 'BIT-Atelier is <em>open source</em>.',
      'Die Werkzeuge, mit denen ich Modelle prüfe, stehen allen offen — frei unter der MIT-Lizenz. BIT-Atelier läuft lokal auf Ihrem Rechner, ohne Cloud-Zwang und ohne Lizenzkosten. Ihre Modelle und Projektdaten bleiben auf Ihrem eigenen Gerät.':
        'The tools I use to check models are open to everyone — free under the MIT licence. BIT-Atelier runs locally on your computer, with no cloud requirement and no licence fees. Your models and project data stay on your own machine.',
      '01 · Herunterladen': '01 · Download',
      'Eine ZIP für Windows, macOS und Linux': 'One ZIP for Windows, macOS and Linux',
      'Voraussetzung ist Node.js 22. Entpacken, per Doppelklick starten und im Browser arbeiten — alles auf Ihrem Rechner.':
        'Requires Node.js 22. Unzip, start with a double-click and work in your browser — all on your own computer.',
      'BIT-Atelier.zip herunterladen': 'Download BIT-Atelier.zip',
      '02 · Quellcode': '02 · Source code',
      'Offen auf GitHub': 'Open on GitHub',
      'Lesen, anpassen, weitergeben. Aus dem Quellcode starten: <code dir="ltr">git clone</code>, <code dir="ltr">npm install</code>, <code dir="ltr">npm run dev</code>. Eigene Prüfregeln und Erweiterungen sind ausdrücklich erwünscht.':
        'Read it, adapt it, pass it on. To run from source: <code dir="ltr">git clone</code>, <code dir="ltr">npm install</code>, <code dir="ltr">npm run dev</code>. Your own checking rules and extensions are explicitly welcome.',
      'Quellcode auf GitHub': 'Source code on GitHub',
      '03 · KI anbinden': '03 · Connect AI',
      'Ihr Modell, Ihre Wahl': 'Your model, your choice',
      'Anbieterunabhängig: Anthropic, jede OpenAI-kompatible Schnittstelle, Ollama lokal oder ein eigener Endpunkt. Dazu ein lokaler KI-Harness (Python) mit Profilen u.&nbsp;a. für LM Studio, Ollama, Qwen/DashScope, DeepSeek und Groq.':
        'Vendor-neutral: Anthropic, any OpenAI-compatible API, Ollama running locally, or your own endpoint. Plus a local AI harness (Python) with profiles for LM Studio, Ollama, Qwen/DashScope, DeepSeek and Groq, among others.',
      '04 · Feedback': '04 · Feedback',
      'Feedback erwünscht': 'Feedback wanted',
      'Fehler gefunden, Idee für eine Prüfregel, etwas unklar? Schreiben Sie mir per E-Mail oder legen Sie ein Issue auf GitHub an — ich lese jede Rückmeldung selbst.':
        'Found a bug, have an idea for a checking rule, or is something unclear? Email me or open an issue on GitHub — I read every message myself.',
      'Feedback per E-Mail': 'Feedback by email',
      'GitHub-Issue anlegen': 'Open a GitHub issue',
      'Schnellstart': 'Quick start',
      'In drei Schritten startklar': 'Up and running in three steps',
      'Schritt 1': 'Step 1',
      'Node.js 22 installieren': 'Install Node.js 22',
      'Einmalig und kostenlos von nodejs.org — falls noch nicht vorhanden.': 'Once and free of charge from nodejs.org — if it is not already installed.',
      'Schritt 2': 'Step 2',
      'ZIP herunterladen und entpacken': 'Download and unzip',
      'BIT-Atelier.zip in einen beliebigen Ordner entpacken.': 'Unzip BIT-Atelier.zip into any folder.',
      'Schritt 3': 'Step 3',
      'Starten und loslegen': 'Start and get going',
      'Doppelklick auf <code dir="ltr">start-windows.cmd</code> (Windows) bzw. <code dir="ltr">./start.sh</code> ausführen (macOS, Linux), dann im Browser <code dir="ltr">http://localhost:3001</code> öffnen.':
        'Double-click <code dir="ltr">start-windows.cmd</code> (Windows) or run <code dir="ltr">./start.sh</code> (macOS, Linux), then open <code dir="ltr">http://localhost:3001</code> in your browser.',
      'Funktionsumfang': 'Features',
      'Was BIT-Atelier kann': 'What BIT-Atelier does',
      'IFC lesen — lokal im Browser (web-ifc); IFC4 schreiben aus dem Komplex-Designer': 'Read IFC — locally in the browser (web-ifc); write IFC4 from the complex designer',
      'IDS 1.0 lesen und schreiben': 'Read and write IDS 1.0',
      'BCF 2.1 lesen und schreiben — Austausch mit Solibri, BIMcollab und Catenda': 'Read and write BCF 2.1 — exchange with Solibri, BIMcollab and Catenda',
      'GAEB DA XML X81, X82, X83, X84, X86 und GAEB 90 lesen; X83 schreiben': 'Read GAEB DA XML X81, X82, X83, X84, X86 and GAEB 90; write X83',
      'Exporte als CSV/Excel (LV, Preisspiegel, Befundliste), Prüfbericht als PDF': 'Exports to CSV/Excel (bill of quantities, bid comparison, findings list), check report as PDF',
      'Flurstücke aus GeoJSON': 'Land parcels from GeoJSON',
      'Revit, Archicad, Allplan, Vectorworks u.&nbsp;a. über ihren IFC-Export angebunden': 'Revit, Archicad, Allplan, Vectorworks and others connected through their IFC export',
      'BIT-Atelier ist freie Software (MIT-Lizenz) und wird ohne Gewährleistung bereitgestellt. Die Nutzung erfolgt auf eigene Gefahr; Prüfergebnisse sind Hinweise und ersetzen keine fachliche Prüfung.':
        'BIT-Atelier is free software (MIT licence) and is provided without warranty. You use it at your own risk; checking results are pointers and do not replace a professional review.',
      'Optional: Konto für die gehostete Fassung': 'Optional: an account for the hosted version',
      'Konten für die gehostete Fassung werden von Hand freigeschaltet — das dauert in der Regel ein paar Werktage. Die lokale Fassung braucht kein Konto.':
        'Accounts for the hosted version are activated by hand — this usually takes a few working days. The local version needs no account.',
      /* Downloads: Block "BIT-Atelier (Open Source)" */
      'BIT-Atelier (Open Source)': 'BIT-Atelier (open source)',
      'Die BIM-Plattform aus dem BIT-Atelier — IFC, IDS, BCF und GAEB lokal auf Ihrem Rechner. Eine ZIP für Windows, macOS und Linux; Voraussetzung ist Node.js 22.':
        'The BIM platform from BIT-Atelier — IFC, IDS, BCF and GAEB locally on your computer. One ZIP for Windows, macOS and Linux; requires Node.js 22.',
      'Windows · macOS · Linux': 'Windows · macOS · Linux',
      'BIT-Atelier.zip': 'BIT-Atelier.zip',
      'Entpacken, dann <code dir="ltr">start-windows.cmd</code> per Doppelklick bzw. <code dir="ltr">./start.sh</code> starten und im Browser <code dir="ltr">localhost:3001</code> öffnen.':
        'Unzip, then double-click <code dir="ltr">start-windows.cmd</code> or run <code dir="ltr">./start.sh</code>, and open <code dir="ltr">localhost:3001</code> in your browser.',
      'Download (ZIP)': 'Download (ZIP)',
      'Quellcode': 'Source code',
      'MIT-Lizenz auf GitHub': 'MIT licence on GitHub',
      'Quellcode, alle Versionen und Issues im öffentlichen Repository.': 'Source code, all releases and issues in the public repository.',
      'Zum Repository': 'Go to the repository',
      'Ebenfalls kostenlos': 'Also free',
      /* Feedback-Mail (feedbackText in index.html; Betreff nutzt
         'BIT-Atelier (Open Source)' von oben mit) */
      'Was ich gemacht habe:': 'What I did:',
      'Was passiert ist:': 'What happened:',
      'Was ich erwartet hätte:': 'What I expected:',
      'Fassung, Betriebssystem, Browser:': 'Version, operating system, browser:',

      'Der portable PDF-Editor aus dem BIT-Atelier — bearbeiten, organisieren, konvertieren, signieren und forensisch schwärzen. Läuft vollständig lokal: keine Cloud, keine Uploads, keine Telemetrie — inklusive Offline-OCR (Deutsch/Englisch).':
        'The portable PDF editor from BIT-Atelier — edit, organise, convert, sign and redact irreversibly. Runs entirely on your machine: no cloud, no uploads, no telemetry — including offline OCR (German and English).',
      'Portable .exe': 'Portable .exe',
      'Keine Installation, läuft auch vom USB-Stick.': 'No installation, runs from a USB stick too.',
      'Download für Windows': 'Download for Windows',
      'DMG für Apple Silicon': 'DMG for Apple silicon',
      'Download für macOS': 'Download for macOS',

      'Über den Gründer': 'About the founder',
      'Das BIT-Atelier wurde von Mohamed Elmokadem gegründet. In über 15 Jahren Planung und Projektleitung hat er Wohnungs-, Schul- und Laborbauten durch alle Leistungsphasen geführt — vom geförderten Wohnungsbau in Nürnberg bis zur Sanierung deutscher Institutionen in Kairo.':
        'BIT-Atelier was founded by Mohamed Elmokadem. In more than fifteen years of design and project management he has taken housing, school and laboratory buildings through every work stage — from subsidised housing in Nuremberg to the refurbishment of German institutions in Cairo.',
      'Heute verbindet er die Handschrift des Architekten mit eigener Prüftechnik. Sie arbeiten direkt mit ihm, ohne Zwischenebene. Was ein großes Büro über Personal löst, löst das BIT-Atelier über Werkzeuge: eine im Haus entwickelte Prüf-Engine für Kollisionen und AIA-Konformität — statt zugekaufter Lizenzsoftware.':
        'Today he combines the hand of the architect with his own checking technology. You work with him directly, with no layer in between. What a large practice solves with staff, BIT-Atelier solves with tools: an in-house checking engine for clashes and requirements compliance — instead of bought-in licensed software.',
      'Mohamed Elmokadem · Architekt, M.Sc. (TUM) ClimaDesign': 'Mohamed Elmokadem · Architect, M.Sc. (TUM) ClimaDesign',
      'Ausgewählte Stationen': 'Selected positions',
      'Über <em>15 Jahre</em> Planung und Projektleitung.': 'More than <em>15 years</em> of design and project management.',
      'Vom geförderten Wohnungsbau in Nürnberg bis zu Sanierungsprojekten deutscher Institutionen in Kairo.':
        'From subsidised housing in Nuremberg to refurbishment projects for German institutions in Cairo.',
      'Volle Leistungsbreite über HOAI 1–9': 'Full scope across HOAI work stages 1–9',
      'Abstimmung mit Fachingenieuren, Herstellern &amp; Behörden': 'Coordination with engineers, manufacturers &amp; authorities',
      'Dozent für 3D-/CAD-Planung': 'Lecturer in 3D and CAD design',

      'Lassen Sie uns <em>sprechen</em>.': 'Let’s <em>talk</em>.',
      'Ob Bauvorhaben oder Digitalisierungs-Projekt — schildern Sie kurz Ihre Idee. Aus Spam-Schutz werden meine Kontaktdaten erst auf Klick angezeigt.':
        'Whether it is a building project or a digitalisation project — tell me briefly what you have in mind. As protection against spam, my contact details only appear on click.',
      'Telefon': 'Phone',
      'Telefon anzeigen<small>Klicken, um die Nummer einzublenden</small>': 'Show phone<small>Click to reveal the number</small>',
      'E-Mail': 'Email',
      'E-Mail anzeigen<small>Klicken, um die Adresse einzublenden</small>': 'Show email<small>Click to reveal the address</small>',
      'Region': 'Region',
      'Raum Nürnberg / Mittelfranken · Projekte bundesweit': 'Nuremberg region · projects across Germany',
      'Auf einen Blick': 'At a glance',
      'Eingetragener Architekt — Bayerische Architektenkammer (Nr. 192.197)': 'Chartered architect — Bavarian Chamber of Architects (no. 192.197)',
      'M.Sc. ClimaDesign, TU München': 'M.Sc. ClimaDesign, TU Munich',
      'Volle Planungsbreite HOAI 1–9': 'Full design scope, HOAI stages 1–9',
      'BIM · IFC · KI-gestützte Projektentwicklung': 'BIM · IFC · AI-assisted project development',
      'Raum Nürnberg / Mittelfranken': 'Nuremberg region',
      'Leistungspakete ansehen': 'See the service packages',
      'Impressum &amp; Datenschutz': 'Legal notice &amp; privacy',
      'Schließen': 'Close',
      'BIT-ATELIER Architekturbüro': 'BIT-ATELIER architectural practice',
      'Alle Rechte vorbehalten.': 'All rights reserved.',
      'Der portable PDF-Editor': 'The portable PDF editor',

      /* Nachtrag: Stationen, Bühnen-Beschriftungen, Download-Hinweise */
      'Leistungsphase': 'Work stage',
      'Bauteile im Modell': 'Components in the model',
      'Modellstand': 'Model status',
      'Hülle': 'Envelope',
      'Prüfung': 'Checking',
      'Prüflauf': 'Checking run',
      'Rohbau': 'Structural shell',
      'Übergabe': 'Handover',
      'Seit 2025 · Nürnberg': 'Since 2025 · Nuremberg',
      'Projektleiter · BIM-Koordinator · Bauzeichner-Koordinator · Schwarz Architekturbüro':
        'Project lead · BIM coordinator · drafting coordinator · Schwarz Architekturbüro',
      'Alle Projekte · HOAI 1–9': 'All projects · HOAI stages 1–9',
      '2020 – 2025 · Nürnberg': '2020 – 2025 · Nuremberg',
      'Architekt / Planer · Schultheiß Projektentwicklung AG': 'Architect / designer · Schultheiß Projektentwicklung AG',
      'Geförderter Wohnungsbau, u.&nbsp;a. Lichtenreutherzeile WA 19/20 · Werkplanung, KfW-55':
        'Subsidised housing, including Lichtenreutherzeile WA 19/20 · construction design, KfW-55',
      '2019 · Wendelstein': '2019 · Wendelstein',
      'Projektleiter · Gömmel Wieland Architekten': 'Project lead · Gömmel Wieland Architekten',
      'Bauhof Lauf a. d. Pegnitz, Laborgebäude (Pharma) · Vorentwurf bis Werkplanung':
        'Municipal depot in Lauf an der Pegnitz, pharmaceutical laboratory · concept through construction design',
      '2018 – 2019 · Kairo': '2018 – 2019 · Cairo',
      'Prokurist / Büroleitung · Bit-Design Architekturbüro': 'Authorised officer / practice lead · Bit-Design Architekturbüro',
      'Sanierung Deutsche Botschaft, DAAD &amp; Goethe-Institut · Brandschutz, Flucht- &amp; Rettungswege':
        'Refurbishment of the German Embassy, DAAD &amp; Goethe-Institut · fire safety, escape and rescue routes',
      '2009 – 2017 · Bayern': '2009 – 2017 · Bavaria',
      'Architekt &amp; Werkplaner · diverse Büros': 'Architect &amp; technical designer · various practices',
      'Mehrfamilienhäuser mit Tiefgarage, Schulbau, Nutzungsänderungen · Detail- &amp; Ausführungsplanung':
        'Apartment buildings with underground parking, school buildings, changes of use · detail and construction design',
      'Ausbildung': 'Education',
      'M.Sc. Klimaoptimiertes Bauen · TU München': 'M.Sc. Climate-Responsive Building · TU Munich',
      'Climate Responsive Design · ganzheitliche Gebäudeoptimierung (Konzept, Fassade, Gebäudetechnik)':
        'Climate-responsive design · whole-building optimisation (concept, facade, building services)',
      'Intel-Version <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-PDF-x64.dmg" style="color:var(--accent)">hier</a>.':
        'Intel version <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-PDF-x64.dmg" style="color:var(--accent)">here</a>.',
      'Kostenlos · quelloffen entwickelt im BIT-Atelier · alle Versionen <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">auf GitHub</a>. Die Apps sind nicht signiert bzw. notarisiert — Windows SmartScreen bzw. macOS Gatekeeper beim ersten Start über „Trotzdem ausführen" / Rechtsklick → „Öffnen" bestätigen.':
        'Free · developed openly at BIT-Atelier · all releases <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">on GitHub</a>. The apps are not code-signed or notarised — on first launch confirm through Windows SmartScreen (“Run anyway”) or macOS Gatekeeper (right-click → “Open”).',

      /* Paketfinder (#pakete) */
      'Welches Paket passt zu Ihrem Projekt?': 'Which package fits your project?',
      'Drei Angaben, keine Anmeldung. Die Einordnung folgt den Regeln, nach denen ich selbst sortiere — und nimmt Ihre Angaben gleich mit in die Anfrage.':
        'Three answers, no sign-up. The result follows the same rules I use myself — and carries your answers straight into the enquiry.',
      'Bausumme': 'Construction cost',
      'Fachmodelle': 'Discipline models',
      'Phase': 'Stage',
      'unter 5 Mio. €': 'under €5 m',
      '5–10 Mio. €': '€5–10 m',
      '10–30 Mio. €': '€10–30 m',
      'über 30 Mio. €': 'over €30 m',
      'Architektur': 'Architecture',
      'Architektur + Tragwerk': 'Architecture + structure',
      'Architektur + Tragwerk + TGA': 'Architecture + structure + MEP',
      'Bestandsmodell / Scan': 'As-built model / scan',
      'noch keine': 'none yet',
      'Vorplanung (LPH 2)': 'Concept design (LPH 2)',
      'Entwurf (LPH 3)': 'Developed design (LPH 3)',
      'Genehmigung (LPH 4)': 'Planning approval (LPH 4)',
      'Ausführungsplanung (LPH 5)': 'Technical design (LPH 5)',
      'Vergabe / Ausführung (LPH 6–8)': 'Tender / construction (LPH 6–8)',
      'Empfehlung': 'Recommendation',
      'Im Anschluss:': 'Afterwards:',
      'Mit diesen Angaben anfragen': 'Enquire with these details',
      'Zu Planung & Architektur': 'To design & architecture',
      'Bausumme, Fachmodelle und Phase stehen dann schon im Anfrage-Baukasten.': 'Cost, models and stage are then pre-filled in the enquiry form.',
      'Alle Leistungsphasen, auch Sanierung und geförderter Wohnungsbau.': 'All work stages, including refurbishment and subsidised housing.',
      'Paket 1 · BIM-Quick-Check & Setup': 'Package 1 · BIM quick check & setup',
      'Paket 2 · Automatisierte Modellprüfung & QS': 'Package 2 · Automated model checking & QA',
      'Paket 3 · BIM-Gesamtkoordination': 'Package 3 · Overall BIM coordination',
      'Unterhalb der Paketgröße — der Weg ist die Planung': 'Below the package range — the route is design',
      'Die drei Pakete sind für Großprojekte ab etwa 10 Mio. € Bausumme geschnitten. Für Ihr Vorhaben ist der direkte Weg die Planung aus einer Hand: Entwurf, Genehmigung, Ausführung — mit Energiebilanz und Modell von Anfang an.':
        'The three packages are cut for large projects from about €10 m construction cost. For your project the direct route is design from one hand: concept, approval, construction — with energy balance and model from day one.',
      'Ohne Fachmodell beginnt jedes Projekt mit dem Setup: AIA und BAP, Koordinationsumgebung, Namenskonventionen — und der erste Prüflauf, sobald das erste Modell steht.':
        'Without a discipline model every project starts with the setup: EIR and BEP, coordination environment, naming conventions — and the first checking run as soon as the first model exists.',
      'Ein Bestandsmodell oder Scan ist eine Grundlage, noch keine Koordinationsbasis. Der Quick-Check legt fest, was die Fachmodelle liefern müssen, und prüft den Bestand gleich mit.':
        'An as-built model or scan is a basis, not yet a coordination baseline. The quick check defines what the discipline models must deliver and checks the existing model on the way.',
      'In Vorplanung und Entwurf entscheidet sich, ob das Projekt später prüffähig ist. Der Quick-Check schafft die Grundlage in 2–4 Wochen; über die Planungsphasen hinweg hält dann das Mandat die Fachmodelle zusammen.':
        'Concept and developed design decide whether the project can be checked later. The quick check lays that foundation in 2–4 weeks; across the design stages the retainer then keeps the discipline models together.',
      'Bei 5–10 Mio. € ist der Quick-Check die passende Einstiegsgröße. Ein laufendes Mandat lohnt sich hier meist erst, wenn drei Fachmodelle koordiniert werden müssen.':
        'At €5–10 m the quick check is the right entry size. A running retainer usually pays off here only once three discipline models need coordinating.',
      'Drei Fachmodelle in Genehmigung und Ausführungsplanung: Hier laufen die meisten Änderungen gleichzeitig. Das Mandat prüft jeden Stand, hält Koordinationssitzung und Maßnahmenliste — die Prüfläufe sind darin enthalten.':
        'Three discipline models in approval and technical design: this is where most changes run in parallel. The retainer checks every issue, runs the coordination meeting and the action list — the checking runs are included.',
      'Jeder Planungsstand wird geprüft, bevor er in die nächste Runde geht: Kollisionen, Duplikate, IDS-Konformität — mit Befunden als BCF zurück an die Fachplaner. Als Festpreis je Prüflauf, planbar je Meilenstein.':
        'Every design issue is checked before it goes into the next round: clashes, duplicates, IDS conformity — with findings returned as BCF to the design teams. Fixed price per run, plannable per milestone.',
      'Vor Vergabe und Ausführung zählt der dokumentierte Stand: ein Prüflauf mit Prüfbericht und BCF, bevor der erste Auftrag vergeben wird. Was hier gefunden wird, kostet noch keinen Nachtrag.':
        'Before tender and construction the documented state counts: one checking run with report and BCF before the first contract is awarded. What is found here does not yet cost a variation.',

      /* Anfrage-Baukasten (#kontakt) */
      'Erstgespräch vorbereiten': 'Prepare a first conversation',
      'Ein paar Angaben, dann steht Ihr Text fertig darunter — zum Absenden über Ihr Mailprogramm, zum Kopieren oder zum Drucken. Es wird nichts übertragen und nichts gespeichert.':
        'A few details and your text is ready below — to send from your mail app, to copy, or to print. Nothing is transmitted and nothing is stored.',
      'Projektart': 'Project type',
      'Zeitrahmen': 'Timeframe',
      'Rückmeldung bitte per': 'Reply preferred by',
      'Kurz zum Vorhaben (freiwillig)': 'About the project (optional)',
      'So geht Ihr Text ab': 'This is the text you send',
      'Erstgespräch anfragen': 'Request a first conversation',
      'Text kopieren': 'Copy text',
      'Drucken / als PDF sichern': 'Print / save as PDF',
      'oder direkt in:': 'or straight into:',
      'Gmail': 'Gmail',
      'Outlook Web': 'Outlook Web',
      'Nur beim Weg über Gmail oder Outlook Web steht Ihr Text in der Adresse zum jeweiligen Anbieter — beim Mailprogramm, beim Kopieren und beim Drucken verlässt nichts Ihren Rechner.': 'Only via Gmail or Outlook Web does your text travel in the address to that provider — with your mail program, copying and printing nothing leaves your computer.',
      'Kennzahlen aus einem Prüflauf mit BIT-Atelier:': 'Key figures from a BIT-Atelier checking run:',
      'Modell': 'Model',
      'Bauteile mit Geometrie': 'Elements with geometry',
      'Geschosse': 'Storeys',
      'Harte Kollisionen': 'Hard clashes',
      'Doppelmodellierungen': 'Duplicate modelling',
      'IDS-Verstöße': 'IDS violations',
      'Antwort in der Regel innerhalb von 24 Stunden.': 'Reply usually within 24 hours.',
      'Guten Tag,': 'Dear Mr Elmokadem,',
      'ich möchte ein Erstgespräch vereinbaren.': 'I would like to arrange a first conversation.',
      '(offen)': '(open)',
      'Zum Vorhaben:': 'About the project:',
      'Mit freundlichen Grüßen': 'Kind regards',
      'Erstgespräch BIT-ATELIER — ': 'First conversation BIT-ATELIER — ',
      'Kopiert ✓': 'Copied ✓',
      'Bitte den Text oben markieren und kopieren': 'Please select and copy the text above',
      'An': 'To'
    },

    ar: {
      'BIT-ATELIER — Architektur trifft Digitalisierung': 'BIT-ATELIER — حيث تلتقي العمارة بالبيانات',
      'Prinzip': 'المنهج',
      'Leistungen': 'الخدمات',
      'Pakete': 'الحزم',
      'Werkzeuge': 'الأدوات',
      'Downloads': 'التنزيلات',
      'Erfahrung': 'الخبرة',
      'Kontakt': 'اتصل بنا',
      'Open Source': 'مفتوح المصدر',
      'Open Source · Herunterladen': 'مفتوح المصدر · تنزيل',
      'Registrieren': 'إنشاء حساب',
      'Anmelden': 'تسجيل الدخول',
      'Projekt anfragen': 'اطلب استشارة لمشروعك',
      'Leistungspakete': 'حزم الخدمات',
      'Baufeld': 'أرض المشروع',
      'Scrollen ↓': 'اسحب للأسفل ↓',

      'Kapitel 01 · Baufeld': 'الفصل 01 · أرض المشروع',
      'Architektur trifft <em>Digitalisierung</em>.': 'حيث تلتقي العمارة <em>بالبيانات</em>.',
      'Jedes Projekt beginnt mit den Regeln des Ortes: Grenzen, Himmelsrichtung, Sonnenlauf, Nachbarschaft. Ich halte sie im Modell fest, bevor die erste Linie gezeichnet wird — als eingetragener Architekt mit einem Master für klimaoptimiertes Bauen.':
        'كل مشروع يبدأ بقواعد موقعه: الحدود، والاتجاه، ومسار الشمس، والجوار. أُثبِّت هذه المعطيات في النموذج قبل رسم أول خط — بصفتي مهندساً معمارياً مُسجَّلاً حاملاً لماجستير في البناء المُحسَّن مناخياً.',
      'Bestandsaufnahme': 'حصر الوضع القائم',
      'Baurecht': 'أنظمة البناء',
      'Sonnenstudie': 'دراسة الإشماس',

      'Kapitel 02 · Gründung': 'الفصل 02 · الأساسات',
      'Alles Gute steht auf <em>Millimetern</em>.': 'كل عمل جيد يقوم على <em>المليمترات</em>.',
      'Fundamente, Sohlplatte, Durchbrüche für die Technik — im Modell verortet, bevor der erste Kubikmeter Beton fließt. Was hier stimmt, kostet später nichts.':
        'القواعد، والبلاطة الأرضية، وفتحات التمديدات — كلها محدَّدة في النموذج قبل صبّ أول متر مكعب من الخرسانة. ما يصحّ هنا لا يُكلِّف شيئاً لاحقاً.',
      'Gründung': 'الأساسات',
      'Durchbruchsplanung': 'تخطيط الفتحات',
      'Mengen': 'حصر الكميات',

      'Kapitel 03 · Tragwerk': 'الفصل 03 · الهيكل الإنشائي',
      'Das Haus wächst <em>zuerst im Modell</em>.': 'المبنى يرتفع <em>في النموذج أولاً</em>.',
      'Decken, Stützen, Erschließungskern — Geschoss um Geschoss. Jedes Bauteil trägt seine Daten mit: Material, Schicht, Brandschutz, Kosten. Ein Bauteil, eine Wahrheit.':
        'البلاطات، والأعمدة، ونواة الحركة — طابقاً بعد طابق. كل عنصر يحمل بياناته معه: المادة، والطبقة، ومقاومة الحريق، والتكلفة. عنصرٌ واحد، وحقيقةٌ واحدة.',
      'Tragwerk': 'الهيكل الإنشائي',
      'IFC-Struktur': 'بنية IFC',

      'Kapitel 04 · Hülle': 'الفصل 04 · الغلاف الخارجي',
      'Fassade, Fenster, <em>Licht</em>.': 'الواجهة، والنوافذ، <em>والضوء</em>.',
      'Die Hülle entscheidet, wie sich ein Haus anfühlt — und was es verbraucht. Öffnungen, Verschattung und Aufbau prüfe ich am Modell und rechne die Energiebilanz mit, nicht hinterher.':
        'الغلاف الخارجي هو ما يحدِّد إحساس المبنى — وما يستهلكه. أختبر الفتحات والتظليل وتركيب الطبقات على النموذج، وأحسب الموازنة الطاقية بالتوازي، لا بعد الانتهاء.',
      'Fassadenaufbau': 'تركيب الواجهة',
      'Verschattung': 'التظليل',
      'Energiebilanz': 'الموازنة الطاقية',

      'Kapitel 05 · Technik &amp; Prüfung': 'الفصل 05 · التمديدات والتدقيق',
      'Der Fehler wird gefunden, <em>bevor er teuer wird</em>.': 'يُكتشف الخطأ <em>قبل أن يصبح مُكلِفاً</em>.',
      'Röntgenblick auf Leitungen, Kanäle und Schächte. Meine eigene Prüf-Engine fährt Kollisionsprüfung und IDS über das Modell und gibt die Befunde als BCF an die Fachplaner zurück. Rot wird grün — im Rechner, nicht auf der Baustelle.':
        'نظرة نافذة إلى المواسير والمجاري والمناور. محرِّك التدقيق الذي طوَّرته يُجري كشف التعارضات وفحص IDS على النموذج، ويعيد النتائج إلى مهندسي التخصصات بصيغة BCF. الأحمر يصير أخضر — في الحاسوب، لا في الموقع.',
      'Kollisionsprüfung': 'كشف التعارضات',

      'Kapitel 06 · Übergabe': 'الفصل 06 · التسليم',
      'Fertig ist erst, wenn es <em>stimmt</em>.': 'لا يكون العمل منتهياً إلا حين <em>يكون صحيحاً</em>.',
      'Am Ende steht ein Haus — und ein Modell, das zu ihm passt. Mengen, Kosten, Bauteile, Wartung: übergeben als offene Daten, nicht als Aktenordner.':
        'في النهاية يقوم مبنى — ويقوم معه نموذج مطابق له. الكميات والتكاليف والعناصر والصيانة: تُسلَّم كبيانات مفتوحة، لا كملفات ورقية.',
      'Übergabemodell': 'نموذج التسليم',
      'Betrieb': 'التشغيل',

      'Das BIT-Atelier Prinzip': 'منهج BIT-Atelier',
      'Präzision trifft <em>Ästhetik</em>.': 'الدقة تلتقي <em>بالجمال</em>.',
      'Gutes Design allein reicht im Bauwesen nicht mehr. Mein Ansatz verbindet die gestalterische Arbeit des Architekten mit der Präzision moderner Datenmethoden — von BIM über Energiesimulation bis zur KI-gestützten Projektentwicklung.':
        'التصميم الجيد وحده لم يعد كافياً في قطاع البناء. منهجي يجمع بين العمل التصميمي للمعماري ودقة أساليب البيانات الحديثة — من نمذجة معلومات البناء ومحاكاة الطاقة إلى تطوير المشاريع بمساعدة الذكاء الاصطناعي.',
      'Als eingetragener Architekt und Absolvent des Masters „Klimaoptimiertes Bauen / ClimaDesign" an der TU München bringe ich wissenschaftliche Methodik in jedes Projekt. Nachhaltigkeit ist dabei kein Schlagwort, sondern rechnerische Grundlage.':
        'بصفتي مهندساً معمارياً مُسجَّلاً وحاملاً لماجستير «البناء المُحسَّن مناخياً / ClimaDesign» من جامعة ميونخ التقنية، أُدخل المنهج العلمي في كل مشروع. الاستدامة هنا ليست شعاراً، بل أساساً حسابياً.',
      'Architekt': 'مهندس معماري',
      'Bayerische Architektenkammer, Listen-Nr. 192.197': 'نقابة المعماريين البافارية، رقم التسجيل 192.197',
      'M.Sc. TUM': 'ماجستير — جامعة ميونخ التقنية',
      'Climate Responsive Design': 'التصميم المستجيب للمناخ',
      'BIM &amp; Digital': 'نمذجة معلومات البناء والرقمنة',
      'Management · Modeling · IFC': 'الإدارة · النمذجة · IFC',
      '15+ Jahre': '‏+15 عاماً',
      'Planung &amp; Projektleitung': 'التصميم وإدارة المشاريع',

      'Zwei Wege, <em>ein Anspruch</em>.': 'مسارانِ، <em>ومعيارٌ واحد</em>.',
      'Ob Sie bauen oder Ihr Großprojekt digital absichern möchten — beides folgt demselben Prinzip: durchdachte, datengestützte Planung ohne Reibungsverluste.':
        'سواء كنت تبني أو ترغب في تأمين مشروعك الكبير رقمياً — كلا المسارين يتبع المبدأ ذاته: تصميم مدروس مبني على البيانات، بلا هدرٍ في الاحتكاك.',
      'Für Generalplaner, Büros &amp; Bauunternehmen': 'للمكاتب الرئيسية والمكاتب الهندسية وشركات المقاولات',
      'BIM-Koordination &amp; Modellprüfung': 'تنسيق نمذجة معلومات البناء وتدقيق النماذج',
      'Externe BIM-Generalleitung für Großprojekte — von der BAP-Strukturierung bis zur kollisionsfreien IFC-Übergabe. Ziel: Planungsfehler werden <em>vor</em> Baubeginn gefunden, nicht auf der Baustelle bezahlt.':
        'إدارة خارجية لنمذجة معلومات البناء في المشاريع الكبيرة — من هيكلة خطة تنفيذ النمذجة إلى تسليم IFC خالٍ من التعارضات. الهدف: أن تُكتشف أخطاء التصميم <em>قبل</em> بدء التنفيذ، لا أن تُدفَع في الموقع.',
      'Kollisionsfreie IFC-Übergabe vor Ausführungsbeginn — eine verhinderte Rohbau-Kollision spart ein Vielfaches des Honorars':
        'تسليم IFC خالٍ من التعارضات قبل بدء التنفيذ — تعارضٌ إنشائي واحد يُتَجنَّب يوفِّر أضعاف الأتعاب',
      'AIA &amp; BIM-Abwicklungsplan (BAP) — prüffähig strukturiert nach ISO 19650':
        'متطلبات معلومات المالك وخطة تنفيذ النمذجة — مُهيكلة للتدقيق وفق ISO 19650',
      'Automatisierte Modell- und AIA-Konformitätsprüfung mit eigener Prüf-Engine (IFC/IDS), Befund-Rückgabe als BCF an die Fachplaner':
        'تدقيق آلي للنموذج ولمطابقة المتطلبات بمحرِّك خاص (IFC/IDS)، وإعادة النتائج إلى مهندسي التخصصات بصيغة BCF',
      'Steuerung der Fachmodelle (Architektur, Tragwerk, TGA) inkl. LOD/LOI':
        'تنسيق نماذج التخصصات (المعماري، الإنشائي، الميكانيكي والكهربائي) بما فيها LOD/LOI',
      'Entlastung Ihrer internen Teams — ohne neue Software-Lizenzen':
        'تخفيف العبء عن فرقكم الداخلية — دون تراخيص برمجية جديدة',
      'Zu den Leistungspaketen': 'إلى حزم الخدمات',
      'Für Bauherren': 'لأصحاب المشاريع',
      'Planung &amp; Architektur': 'التصميم والعمارة',
      'Ganzheitliche Planung von Wohn- und Sanierungsprojekten über alle Leistungsphasen — mit dem Blick fürs Detail und für die Energiebilanz.':
        'تصميم متكامل لمشاريع الإسكان والترميم عبر جميع مراحل الخدمات — بعينٍ على التفصيل وعلى الموازنة الطاقية.',
      'Entwurf &amp; Genehmigungsplanung (HOAI 1–4)': 'التصميم المبدئي ومخططات الترخيص (مراحل HOAI 1–4)',
      'Werk-, Ausführungs- &amp; Detailplanung (HOAI 5)': 'المخططات التنفيذية والتفصيلية (مرحلة HOAI 5)',
      'Wohnungsbau, geförderter Wohnungsbau, KfW': 'الإسكان، والإسكان المدعوم، ومعايير KfW',
      'Sanierung &amp; Denkmalpflege': 'الترميم والمباني التاريخية',
      'Barrierefreies &amp; rollstuhlgerechtes Planen (DIN 18040)': 'التصميم الخالي من العوائق والملائم للكراسي المتحركة (DIN 18040)',

      'BIM-Leistungspakete': 'حزم خدمات نمذجة معلومات البناء',
      'Klarer Umfang. Klares Ergebnis. <em>Klarer Preis.</em>': 'نطاقٌ واضح. نتيجةٌ واضحة. <em>وسعرٌ واضح.</em>',
      'Drei Pakete für Großprojekte ab ca. 10 Mio. € Bausumme — als Festpreis oder monatliches Mandat, bepreist am Projektwert statt nach Stundenzetteln.':
        'ثلاث حزم للمشاريع الكبيرة بقيمة تنفيذ تبدأ من نحو 10 ملايين يورو — بسعر ثابت أو بعقد شهري، والتسعير على قيمة المشروع لا على ساعات العمل.',
      'Paket 1 · Festpreis': 'الحزمة 1 · سعر ثابت',
      'BIM-Quick-Check &amp; Setup': 'تدقيق سريع وتأسيس للنمذجة',
      'ab 8.500 € je Projekt': 'من 8,500 يورو للمشروع',
      'Der schnelle, prüffähige Einstieg: Ihr Projekt wird BIM-ablieferfähig — in 2–4 Wochen.':
        'بداية سريعة وقابلة للتدقيق: يصبح مشروعك جاهزاً لتسليم النمذجة — في أسبوعين إلى أربعة.',
      'AIA prüfen bzw. erstellen, BAP strukturieren': 'مراجعة متطلبات المعلومات أو إعدادها، وهيكلة خطة التنفيذ',
      'Koordinationsumgebung aufsetzen (IFC-/openBIM-Standards, Namenskonventionen)':
        'تأسيس بيئة التنسيق (معايير IFC وopenBIM، وأنظمة التسمية)',
      'Automatisierte Erstprüfung des Modells mit Prüfbericht': 'تدقيق آلي أولي للنموذج مع تقرير مكتوب',
      '<b>Ergebnis:</b> prüffähiger BAP + dokumentierter Modellstatus':
        '<b>النتيجة:</b> خطة تنفيذ قابلة للتدقيق وحالة نموذج موثَّقة',
      'Paket 2 · Festpreis je Planungsstand · Kernleistung': 'الحزمة 2 · سعر ثابت لكل مرحلة · الخدمة الأساسية',
      'Automatisierte Modellprüfung &amp; QS': 'تدقيق آلي للنماذج وضمان الجودة',
      'Festpreis je Prüflauf': 'سعر ثابت لكل جولة تدقيق',
      'Jeder Planungsstand wird maschinell geprüft, bevor er teuer wird — mit eigener Prüf-Engine statt Lizenz-Software.':
        'كل مرحلة تصميم تُدقَّق آلياً قبل أن تصبح مُكلِفة — بمحرِّك خاص بدلاً من برامج مُرخَّصة.',
      'Kollisionsprüfung Architektur / Tragwerk / TGA mit Toleranz- und Duplikatregeln':
        'كشف التعارضات بين المعماري والإنشائي والتمديدات، مع قواعد للتفاوت وللعناصر المكرَّرة',
      'IDS-Konformitätsprüfung gegen Ihre AIA (buildingSMART-Standard)':
        'تدقيق المطابقة بمعيار IDS مقابل متطلبات معلوماتكم (معيار buildingSMART)',
      'Befunde als BCF direkt zurück an die Fachplaner + Prüfbericht als PDF':
        'إعادة النتائج بصيغة BCF مباشرة إلى مهندسي التخصصات، مع تقرير بصيغة PDF',
      '<b>Ergebnis:</b> dokumentiert kollisions- und regelgeprüfter Planungsstand':
        '<b>النتيجة:</b> مرحلة تصميم موثَّقة كمُدقَّقة من التعارضات ومطابقة للقواعد',
      'Paket 3 · Monatliches Mandat': 'الحزمة 3 · عقد شهري',
      'BIM-Gesamtkoordination': 'التنسيق الشامل لنمذجة معلومات البناء',
      'ab 4.500 € / Monat': 'من 4,500 يورو شهرياً',
      'Die laufende externe BIM-Leitung über die Planungsphasen — Ihre Teams planen, ich halte die Modelle zusammen.':
        'إدارة خارجية مستمرة للنمذجة عبر مراحل التصميم — فرقكم تُصمِّم، وأنا أُبقي النماذج متماسكة.',
      'Steuerung der Fachmodelle inkl. LOD/LOI-Vorgaben': 'تنسيق نماذج التخصصات بما فيها متطلبات LOD/LOI',
      'Regelmäßige Prüfzyklen mit Koordinationssitzung und Maßnahmenliste':
        'جولات تدقيق منتظمة مع اجتماع تنسيقي وقائمة إجراءات',
      'Berichtswesen für Bauherr und Projektsteuerung': 'تقارير لصاحب المشروع وإدارة المشروع',
      '<b>Ergebnis:</b> ein koordiniertes Modell als verlässliche Ausführungsgrundlage':
        '<b>النتيجة:</b> نموذج مُنسَّق يصلح أساساً موثوقاً للتنفيذ',
      'Alle Preise netto zzgl. gesetzlicher Umsatzsteuer. Bepreisung orientiert an den Vergütungsempfehlungen für BIM-Management (AHO/DVP: üblich 20–25 % des Projektsteuerungshonorars). Konkretes Angebot nach kurzem Gespräch über Projektgröße und Fachmodelle.':
        'جميع الأسعار صافية بدون ضريبة القيمة المضافة. التسعير يستند إلى التوصيات الألمانية لأتعاب إدارة النمذجة (AHO/DVP: عادةً 20–25 ٪ من أتعاب إدارة المشروع). العرض النهائي يُقدَّم بعد حديث قصير عن حجم المشروع ونماذج التخصصات.',

      'Der Unterschied': 'الفارق',
      'Eigene Werkzeuge statt <em>Lizenz-Software</em>.': 'أدوات خاصة بدلاً من <em>البرامج المُرخَّصة</em>.',
      'Die Prüf- und Auswertungswerkzeuge hinter meinen Leistungen sind im eigenen Haus entwickelt: die BIT-Atelier-Plattform liest IFC-Modelle direkt (buildingSMART-Standards, ohne Cloud-Zwang), ermittelt Mengen filterbasiert nach dem Prinzip WAS ∩ ZUSTAND und prüft Modelle auf Kollisionen und AIA-Konformität (IDS) — mit Befund-Rückgabe als BCF.':
        'أدوات التدقيق والتحليل التي تقف خلف خدماتي مُطوَّرة داخلياً: منصة BIT-Atelier تقرأ نماذج IFC مباشرة (بمعايير buildingSMART ودون إلزام سحابي)، وتستخرج الكميات بالتصفية وفق مبدأ «ماذا ∩ الحالة»، وتُدقِّق النماذج بحثاً عن التعارضات ومطابقة المتطلبات (IDS) — مع إعادة النتائج بصيغة BCF.',
      'Das heißt für Sie: Prüfregeln, die sich exakt an Ihr Projekt anpassen lassen, keine Lizenzkosten, die auf Ihr Honorar umgelegt werden — und keine Abhängigkeit von Software-Abos Dritter.':
        'ما يعنيه ذلك لكم: قواعد تدقيق تُضبَط على مشروعكم تماماً، وبلا تكاليف تراخيص تُحمَّل على الأتعاب — وبلا تبعية لاشتراكات برمجية لطرف ثالث.',
      'IFC-Import': 'استيراد IFC',
      'Geschosse, Bauteile, Eigenschaften, Klassifizierung — direkt aus dem openBIM-Format':
        'الطوابق والعناصر والخصائص والتصنيف — مباشرة من صيغة openBIM',
      'Regel-Matrix je Gewerkepaar, Toleranzen, Duplikat-Erkennung': 'مصفوفة قواعد لكل زوج تخصصات، وحدود تفاوت، وكشف للتكرار',
      'IDS-Prüfung': 'تدقيق IDS',
      'AIA-Anforderungen maschinell prüfbar nach buildingSMART IDS': 'متطلبات المعلومات قابلة للتدقيق آلياً وفق buildingSMART IDS',
      'BCF-Rückgabe': 'إعادة النتائج بصيغة BCF',
      'Befunde landen als offene Issues direkt bei den Fachplanern': 'تصل النتائج كملاحظات مفتوحة مباشرة إلى مهندسي التخصصات',
      'bit-atelier · prüf-suite — Prüfergebnis': 'bit-atelier · حزمة التدقيق — النتيجة',
      'bit-atelier · prüf-engine — Beispiel-Prüflauf': 'bit-atelier · محرِّك التدقيق — جولة نموذجية',
      'Energiesimulation': 'محاكاة الطاقة',
      'AVA &amp; Kostenplanung': 'المناقصات وتخطيط التكاليف',
      'Python-Automatisierung': 'الأتمتة ببايثون',
      'Prüflauf am mitgelieferten Musterprojekt, direkt im Browser geprüft — harte Kollisionen gefunden, AIA-Anforderungen per IDS kontrolliert, Befunde gehen als BCF zurück an die Fachplaner. Denselben Lauf können Sie mit der Open-Source-Fassung auf Ihrem Rechner selbst starten.':
        'جولة تدقيق على المشروع النموذجي المُرفق، دُقِّقت مباشرة في المتصفح — عُثر على تعارضات صلبة، وتحقَّقت متطلبات المعلومات عبر IDS، وأُعيدت النتائج بصيغة BCF إلى مهندسي التخصصات. يمكنك تشغيل الجولة نفسها بنفسك بالنسخة مفتوحة المصدر على حاسوبك.',
      'So sieht Ihr Befund aus.': 'هكذا تبدو ملاحظات التدقيق لديك.',
      'Prüfbericht und Befundliste aus einem Prüflauf über ein mitgeliefertes Musterprojekt — synthetisch erzeugt, keine Projektdaten. Denselben Lauf können Sie in der Open-Source-Fassung mit einem Klick selbst auslösen; das BCF öffnet sich in jeder gängigen Koordinationssoftware.':
        'تقرير التدقيق وقائمة الملاحظات من جولة تدقيق على مشروع نموذجي مُرفق — مُولَّد اصطناعياً، دون بيانات مشاريع. يمكنك تشغيل الجولة نفسها بنقرة واحدة في النسخة مفتوحة المصدر؛ ويُفتح ملف BCF في أي برنامج تنسيق شائع.',
      'Musterprüfbericht (PDF)': 'تقرير تدقيق نموذجي (PDF)',
      'Befunde als BCF': 'الملاحظات بصيغة BCF',
      'BIT-Atelier herunterladen': 'تنزيل BIT-Atelier',
      'BIT-Atelier ist Open Source (MIT-Lizenz) und läuft lokal auf Ihrem Rechner — ohne Konto und ohne Lizenzkosten. <a href="#open-source" style="color:var(--accent)">Zum Download</a>.':
        'BIT-Atelier مفتوح المصدر (رخصة MIT) ويعمل محلياً على حاسوبك — دون حساب ودون رسوم ترخيص. <a href="#open-source" style="color:var(--accent)">إلى التنزيل</a>.',

      /* Open Source (#open-source, 83-05) */
      'Open Source · MIT-Lizenz': 'مفتوح المصدر · رخصة MIT',
      'BIT-Atelier ist <em>Open Source</em>.': 'BIT-Atelier <em>مفتوح المصدر</em>.',
      'Die Werkzeuge, mit denen ich Modelle prüfe, stehen allen offen — frei unter der MIT-Lizenz. BIT-Atelier läuft lokal auf Ihrem Rechner, ohne Cloud-Zwang und ohne Lizenzkosten. Ihre Modelle und Projektdaten bleiben auf Ihrem eigenen Gerät.':
        'الأدوات التي أدقّق بها النماذج متاحة للجميع — مجاناً بموجب رخصة MIT. يعمل BIT-Atelier محلياً على حاسوبك، دون إلزام بالسحابة ودون رسوم ترخيص. وتبقى نماذجك وبيانات مشاريعك على جهازك.',
      '01 · Herunterladen': '01 · التنزيل',
      'Eine ZIP für Windows, macOS und Linux': 'ملف ZIP واحد لأنظمة Windows وmacOS وLinux',
      'Voraussetzung ist Node.js 22. Entpacken, per Doppelklick starten und im Browser arbeiten — alles auf Ihrem Rechner.':
        'المتطلب: Node.js 22. فُكَّ الضغط، وشغِّل بنقرة مزدوجة، واعمل في المتصفح — كل ذلك على حاسوبك.',
      'BIT-Atelier.zip herunterladen': 'تنزيل BIT-Atelier.zip',
      '02 · Quellcode': '02 · الشيفرة المصدرية',
      'Offen auf GitHub': 'مفتوحة على GitHub',
      'Lesen, anpassen, weitergeben. Aus dem Quellcode starten: <code dir="ltr">git clone</code>, <code dir="ltr">npm install</code>, <code dir="ltr">npm run dev</code>. Eigene Prüfregeln und Erweiterungen sind ausdrücklich erwünscht.':
        'اقرأها وعدِّلها وشاركها. للتشغيل من الشيفرة المصدرية: <code dir="ltr">git clone</code> ثم <code dir="ltr">npm install</code> ثم <code dir="ltr">npm run dev</code>. قواعد التدقيق والإضافات الخاصة بك مُرحَّب بها صراحةً.',
      'Quellcode auf GitHub': 'الشيفرة المصدرية على GitHub',
      '03 · KI anbinden': '03 · ربط الذكاء الاصطناعي',
      'Ihr Modell, Ihre Wahl': 'نموذجك، اختيارك',
      'Anbieterunabhängig: Anthropic, jede OpenAI-kompatible Schnittstelle, Ollama lokal oder ein eigener Endpunkt. Dazu ein lokaler KI-Harness (Python) mit Profilen u.&nbsp;a. für LM Studio, Ollama, Qwen/DashScope, DeepSeek und Groq.':
        'مستقل عن المزوِّد: Anthropic، أو أي واجهة متوافقة مع OpenAI، أو Ollama محلياً، أو نقطة وصول خاصة بك. إضافةً إلى بيئة تشغيل محلية للذكاء الاصطناعي (Python) بملفات إعداد لـ LM Studio وOllama وQwen/DashScope وDeepSeek وGroq وغيرها.',
      '04 · Feedback': '04 · الملاحظات',
      'Feedback erwünscht': 'ملاحظاتك مرحَّب بها',
      'Fehler gefunden, Idee für eine Prüfregel, etwas unklar? Schreiben Sie mir per E-Mail oder legen Sie ein Issue auf GitHub an — ich lese jede Rückmeldung selbst.':
        'وجدتَ خطأً، أو لديك فكرة لقاعدة تدقيق، أو هناك ما هو غير واضح؟ راسلني بالبريد الإلكتروني أو افتح Issue على GitHub — أقرأ كل رسالة بنفسي.',
      'Feedback per E-Mail': 'ملاحظات عبر البريد الإلكتروني',
      'GitHub-Issue anlegen': 'فتح Issue على GitHub',
      'Schnellstart': 'بدء سريع',
      'In drei Schritten startklar': 'جاهز للعمل في ثلاث خطوات',
      'Schritt 1': 'الخطوة 1',
      'Node.js 22 installieren': 'ثبِّت Node.js 22',
      'Einmalig und kostenlos von nodejs.org — falls noch nicht vorhanden.': 'مرة واحدة ومجاناً من nodejs.org — إن لم يكن مثبَّتاً لديك.',
      'Schritt 2': 'الخطوة 2',
      'ZIP herunterladen und entpacken': 'نزِّل الملف وفُكَّ ضغطه',
      'BIT-Atelier.zip in einen beliebigen Ordner entpacken.': 'فُكَّ ضغط BIT-Atelier.zip في أي مجلد.',
      'Schritt 3': 'الخطوة 3',
      'Starten und loslegen': 'شغِّل وابدأ',
      'Doppelklick auf <code dir="ltr">start-windows.cmd</code> (Windows) bzw. <code dir="ltr">./start.sh</code> ausführen (macOS, Linux), dann im Browser <code dir="ltr">http://localhost:3001</code> öffnen.':
        'انقر نقراً مزدوجاً على <code dir="ltr">start-windows.cmd</code> (Windows) أو شغِّل <code dir="ltr">./start.sh</code> (macOS وLinux)، ثم افتح <code dir="ltr">http://localhost:3001</code> في المتصفح.',
      'Funktionsumfang': 'الإمكانات',
      'Was BIT-Atelier kann': 'ما يقدِّمه BIT-Atelier',
      'IFC lesen — lokal im Browser (web-ifc); IFC4 schreiben aus dem Komplex-Designer': 'قراءة IFC — محلياً في المتصفح (web-ifc)؛ وكتابة IFC4 من مصمِّم المجمَّعات',
      'IDS 1.0 lesen und schreiben': 'قراءة IDS 1.0 وكتابتها',
      'BCF 2.1 lesen und schreiben — Austausch mit Solibri, BIMcollab und Catenda': 'قراءة BCF 2.1 وكتابتها — للتبادل مع Solibri وBIMcollab وCatenda',
      'GAEB DA XML X81, X82, X83, X84, X86 und GAEB 90 lesen; X83 schreiben': 'قراءة GAEB DA XML (X81 وX82 وX83 وX84 وX86) وGAEB 90؛ وكتابة X83',
      'Exporte als CSV/Excel (LV, Preisspiegel, Befundliste), Prüfbericht als PDF': 'تصدير بصيغة CSV/Excel (جدول الكميات، مقارنة العروض، قائمة الملاحظات)، وتقرير التدقيق بصيغة PDF',
      'Flurstücke aus GeoJSON': 'قطع الأراضي من GeoJSON',
      'Revit, Archicad, Allplan, Vectorworks u.&nbsp;a. über ihren IFC-Export angebunden': 'Revit وArchicad وAllplan وVectorworks وغيرها مرتبطة عبر تصدير IFC الخاص بها',
      'BIT-Atelier ist freie Software (MIT-Lizenz) und wird ohne Gewährleistung bereitgestellt. Die Nutzung erfolgt auf eigene Gefahr; Prüfergebnisse sind Hinweise und ersetzen keine fachliche Prüfung.':
        'BIT-Atelier برنامج حرّ (رخصة MIT) ويُقدَّم دون أي ضمان. الاستخدام على مسؤوليتك الخاصة؛ ونتائج التدقيق إرشادات ولا تُغني عن المراجعة المهنية.',
      'Optional: Konto für die gehostete Fassung': 'اختياري: حساب للنسخة المستضافة',
      'Konten für die gehostete Fassung werden von Hand freigeschaltet — das dauert in der Regel ein paar Werktage. Die lokale Fassung braucht kein Konto.':
        'تُفعَّل حسابات النسخة المستضافة يدوياً — ويستغرق ذلك عادةً بضعة أيام عمل. أما النسخة المحلية فلا تحتاج إلى حساب.',
      /* Downloads: Block "BIT-Atelier (Open Source)" */
      'BIT-Atelier (Open Source)': 'BIT-Atelier (مفتوح المصدر)',
      'Die BIM-Plattform aus dem BIT-Atelier — IFC, IDS, BCF und GAEB lokal auf Ihrem Rechner. Eine ZIP für Windows, macOS und Linux; Voraussetzung ist Node.js 22.':
        'منصة BIM من BIT-Atelier — IFC وIDS وBCF وGAEB محلياً على حاسوبك. ملف ZIP واحد لأنظمة Windows وmacOS وLinux؛ ويتطلب Node.js 22.',
      'Windows · macOS · Linux': 'Windows · macOS · Linux',
      'BIT-Atelier.zip': 'BIT-Atelier.zip',
      'Entpacken, dann <code dir="ltr">start-windows.cmd</code> per Doppelklick bzw. <code dir="ltr">./start.sh</code> starten und im Browser <code dir="ltr">localhost:3001</code> öffnen.':
        'فُكَّ الضغط، ثم انقر نقراً مزدوجاً على <code dir="ltr">start-windows.cmd</code> أو شغِّل <code dir="ltr">./start.sh</code>، وافتح <code dir="ltr">localhost:3001</code> في المتصفح.',
      'Download (ZIP)': 'تنزيل (ZIP)',
      'Quellcode': 'الشيفرة المصدرية',
      'MIT-Lizenz auf GitHub': 'رخصة MIT على GitHub',
      'Quellcode, alle Versionen und Issues im öffentlichen Repository.': 'الشيفرة المصدرية وجميع الإصدارات والمشكلات (Issues) في المستودع العام.',
      'Zum Repository': 'إلى المستودع',
      'Ebenfalls kostenlos': 'مجاني أيضاً',
      /* Feedback-Mail (feedbackText in index.html; Betreff nutzt
         'BIT-Atelier (Open Source)' von oben mit) */
      'Was ich gemacht habe:': 'ما الذي فعلته:',
      'Was passiert ist:': 'ما الذي حدث:',
      'Was ich erwartet hätte:': 'ما الذي كنت أتوقعه:',
      'Fassung, Betriebssystem, Browser:': 'الإصدار ونظام التشغيل والمتصفح:',

      'Der portable PDF-Editor aus dem BIT-Atelier — bearbeiten, organisieren, konvertieren, signieren und forensisch schwärzen. Läuft vollständig lokal: keine Cloud, keine Uploads, keine Telemetrie — inklusive Offline-OCR (Deutsch/Englisch).':
        'محرِّر PDF محمول من BIT-Atelier — للتحرير والتنظيم والتحويل والتوقيع والحجب النهائي. يعمل بالكامل على جهازك: بلا سحابة، وبلا رفع للملفات، وبلا تتبُّع — ويشمل التعرُّف الضوئي على النصوص دون اتصال (بالألمانية والإنجليزية).',
      'Portable .exe': 'ملف ‎.exe‎ محمول',
      'Keine Installation, läuft auch vom USB-Stick.': 'بلا تثبيت، ويعمل من ذاكرة USB أيضاً.',
      'Download für Windows': 'تنزيل لنظام Windows',
      'DMG für Apple Silicon': 'ملف DMG لمعالجات Apple',
      'Download für macOS': 'تنزيل لنظام macOS',

      'Über den Gründer': 'عن المؤسِّس',
      'Das BIT-Atelier wurde von Mohamed Elmokadem gegründet. In über 15 Jahren Planung und Projektleitung hat er Wohnungs-, Schul- und Laborbauten durch alle Leistungsphasen geführt — vom geförderten Wohnungsbau in Nürnberg bis zur Sanierung deutscher Institutionen in Kairo.':
        'أسَّس محمد المقدم مكتب BIT-Atelier. وعلى مدى أكثر من خمسة عشر عاماً في التصميم وإدارة المشاريع، قاد مشاريع إسكان ومدارس ومختبرات عبر جميع مراحل الخدمات — من الإسكان المدعوم في نورنبرغ إلى ترميم مؤسسات ألمانية في القاهرة.',
      'Heute verbindet er die Handschrift des Architekten mit eigener Prüftechnik. Sie arbeiten direkt mit ihm, ohne Zwischenebene. Was ein großes Büro über Personal löst, löst das BIT-Atelier über Werkzeuge: eine im Haus entwickelte Prüf-Engine für Kollisionen und AIA-Konformität — statt zugekaufter Lizenzsoftware.':
        'اليوم يجمع بين بصمة المعماري وتقنية تدقيق طوَّرها بنفسه. تعملون معه مباشرة، بلا وسيط. وما يحلُّه مكتب كبير بالكوادر، يحلُّه BIT-Atelier بالأدوات: محرِّك تدقيق مُطوَّر داخلياً للتعارضات ومطابقة المتطلبات — بدلاً من برامج مُرخَّصة مُشتراة.',
      'Mohamed Elmokadem · Architekt, M.Sc. (TUM) ClimaDesign': 'محمد المقدم · مهندس معماري، ماجستير (جامعة ميونخ التقنية) ClimaDesign',
      'Mohamed Elmokadem': 'محمد المقدم',
      'Ausgewählte Stationen': 'محطات مختارة',
      'Über <em>15 Jahre</em> Planung und Projektleitung.': 'أكثر من <em>15 عاماً</em> في التصميم وإدارة المشاريع.',
      'Vom geförderten Wohnungsbau in Nürnberg bis zu Sanierungsprojekten deutscher Institutionen in Kairo.':
        'من الإسكان المدعوم في نورنبرغ إلى مشاريع ترميم مؤسسات ألمانية في القاهرة.',
      'Volle Leistungsbreite über HOAI 1–9': 'النطاق الكامل لمراحل HOAI من 1 إلى 9',
      'Abstimmung mit Fachingenieuren, Herstellern &amp; Behörden': 'التنسيق مع المهندسين المتخصصين والمُصنِّعين والجهات الرسمية',
      'Dozent für 3D-/CAD-Planung': 'محاضر في التصميم ثلاثي الأبعاد والحاسوبي',

      'Lassen Sie uns <em>sprechen</em>.': 'لنتحدَّث <em>معاً</em>.',
      'Ob Bauvorhaben oder Digitalisierungs-Projekt — schildern Sie kurz Ihre Idee. Aus Spam-Schutz werden meine Kontaktdaten erst auf Klick angezeigt.':
        'سواء كان مشروع بناء أو مشروع رقمنة — اشرح فكرتك بإيجاز. وللحماية من الرسائل المزعجة، لا تظهر بيانات الاتصال إلا بعد النقر.',
      'Telefon': 'الهاتف',
      'Telefon anzeigen<small>Klicken, um die Nummer einzublenden</small>': 'إظهار الهاتف<small>انقر لعرض الرقم</small>',
      'E-Mail': 'البريد الإلكتروني',
      'E-Mail anzeigen<small>Klicken, um die Adresse einzublenden</small>': 'إظهار البريد<small>انقر لعرض العنوان</small>',
      'Region': 'النطاق الجغرافي',
      'Raum Nürnberg / Mittelfranken · Projekte bundesweit': 'منطقة نورنبرغ · ومشاريع في عموم ألمانيا',
      'Auf einen Blick': 'في سطور',
      'Eingetragener Architekt — Bayerische Architektenkammer (Nr. 192.197)': 'مهندس معماري مُسجَّل — نقابة المعماريين البافارية (رقم 192.197)',
      'M.Sc. ClimaDesign, TU München': 'ماجستير ClimaDesign، جامعة ميونخ التقنية',
      'Volle Planungsbreite HOAI 1–9': 'النطاق التصميمي الكامل، مراحل HOAI 1–9',
      'BIM · IFC · KI-gestützte Projektentwicklung': 'نمذجة معلومات البناء · IFC · تطوير المشاريع بمساعدة الذكاء الاصطناعي',
      'Raum Nürnberg / Mittelfranken': 'منطقة نورنبرغ',
      'Leistungspakete ansehen': 'استعراض حزم الخدمات',
      'Impressum &amp; Datenschutz': 'البيانات القانونية وحماية البيانات',
      'Schließen': 'إغلاق',
      'BIT-ATELIER Architekturbüro': 'BIT-ATELIER مكتب هندسة معمارية',
      'Alle Rechte vorbehalten.': 'جميع الحقوق محفوظة.',

      /* Nachtrag: Stationen, Bühnen-Beschriftungen, Download-Hinweise */
      'Leistungsphase': 'مرحلة الخدمة',
      'Bauteile im Modell': 'عناصر في النموذج',
      'Modellstand': 'حالة النموذج',
      'Hülle': 'الغلاف',
      'Prüfung': 'التدقيق',
      'Prüflauf': 'جولة التدقيق',
      'Rohbau': 'الهيكل',
      'Übergabe': 'التسليم',
      'Seit 2025 · Nürnberg': 'من 2025 · نورنبرغ',
      'Projektleiter · BIM-Koordinator · Bauzeichner-Koordinator · Schwarz Architekturbüro':
        'مدير مشروع · منسِّق نمذجة · منسِّق رسم تنفيذي · مكتب Schwarz',
      'Alle Projekte · HOAI 1–9': 'جميع المشاريع · مراحل HOAI 1–9',
      '2020 – 2025 · Nürnberg': '2020 – 2025 · نورنبرغ',
      'Architekt / Planer · Schultheiß Projektentwicklung AG': 'مهندس معماري · شركة Schultheiß للتطوير العقاري',
      'Geförderter Wohnungsbau, u.&nbsp;a. Lichtenreutherzeile WA 19/20 · Werkplanung, KfW-55':
        'إسكان مدعوم، منها مشروع Lichtenreutherzeile WA 19/20 · مخططات تنفيذية بمعيار KfW-55',
      '2019 · Wendelstein': '2019 · فِندلشتاين',
      'Projektleiter · Gömmel Wieland Architekten': 'مدير مشروع · مكتب Gömmel Wieland',
      'Bauhof Lauf a. d. Pegnitz, Laborgebäude (Pharma) · Vorentwurf bis Werkplanung':
        'مستودع بلدية لاوف، ومبنى مختبرات دوائية · من التصميم المبدئي إلى المخططات التنفيذية',
      '2018 – 2019 · Kairo': '2018 – 2019 · القاهرة',
      'Prokurist / Büroleitung · Bit-Design Architekturbüro': 'مدير المكتب والمفوَّض بالتوقيع · مكتب Bit-Design',
      'Sanierung Deutsche Botschaft, DAAD &amp; Goethe-Institut · Brandschutz, Flucht- &amp; Rettungswege':
        'ترميم السفارة الألمانية وDAAD ومعهد جوته · الحماية من الحريق ومسارات الهروب والإنقاذ',
      '2009 – 2017 · Bayern': '2009 – 2017 · بافاريا',
      'Architekt &amp; Werkplaner · diverse Büros': 'مهندس معماري ومُعِدّ مخططات تنفيذية · مكاتب متعددة',
      'Mehrfamilienhäuser mit Tiefgarage, Schulbau, Nutzungsänderungen · Detail- &amp; Ausführungsplanung':
        'عمارات سكنية بمواقف تحت الأرض، ومبانٍ مدرسية، وتغييرات استخدام · مخططات تفصيلية وتنفيذية',
      'Ausbildung': 'التعليم',
      'M.Sc. Klimaoptimiertes Bauen · TU München': 'ماجستير البناء المُحسَّن مناخياً · جامعة ميونخ التقنية',
      'Climate Responsive Design · ganzheitliche Gebäudeoptimierung (Konzept, Fassade, Gebäudetechnik)':
        'التصميم المستجيب للمناخ · تحسين شامل للمبنى (المفهوم، الواجهة، التمديدات)',
      'Intel-Version <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-PDF-x64.dmg" style="color:var(--accent)">hier</a>.':
        'نسخة Intel <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-PDF-x64.dmg" style="color:var(--accent)">من هنا</a>.',
      'Kostenlos · quelloffen entwickelt im BIT-Atelier · alle Versionen <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">auf GitHub</a>. Die Apps sind nicht signiert bzw. notarisiert — Windows SmartScreen bzw. macOS Gatekeeper beim ersten Start über „Trotzdem ausführen" / Rechtsklick → „Öffnen" bestätigen.':
        'مجاني · مُطوَّر بشكل مفتوح في BIT-Atelier · جميع الإصدارات <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">على GitHub</a>. التطبيقات غير موقَّعة رقمياً — عند أول تشغيل أكِّد عبر Windows SmartScreen («تشغيل على أي حال») أو macOS Gatekeeper (نقر بالزر الأيمن ← «فتح»).',

      /* Paketfinder (#pakete) */
      'Welches Paket passt zu Ihrem Projekt?': 'أي حزمة تناسب مشروعكم؟',
      'Drei Angaben, keine Anmeldung. Die Einordnung folgt den Regeln, nach denen ich selbst sortiere — und nimmt Ihre Angaben gleich mit in die Anfrage.':
        'ثلاث إجابات، دون تسجيل. يتبع التصنيف القواعد نفسها التي أعتمدها بنفسي — وينقل إجاباتكم مباشرةً إلى نموذج الطلب.',
      'Bausumme': 'تكلفة البناء',
      'Fachmodelle': 'النماذج التخصصية',
      'Phase': 'المرحلة',
      'unter 5 Mio. €': 'أقل من 5 ملايين يورو',
      '5–10 Mio. €': '5–10 ملايين يورو',
      '10–30 Mio. €': '10–30 مليون يورو',
      'über 30 Mio. €': 'أكثر من 30 مليون يورو',
      'Architektur': 'العمارة',
      'Architektur + Tragwerk': 'العمارة + الإنشاء',
      'Architektur + Tragwerk + TGA': 'العمارة + الإنشاء + التمديدات',
      'Bestandsmodell / Scan': 'نموذج الوضع القائم / مسح',
      'noch keine': 'لا يوجد بعد',
      'Vorplanung (LPH 2)': 'التصميم الأولي (LPH 2)',
      'Entwurf (LPH 3)': 'التصميم التطويري (LPH 3)',
      'Genehmigung (LPH 4)': 'الترخيص (LPH 4)',
      'Ausführungsplanung (LPH 5)': 'التصميم التنفيذي (LPH 5)',
      'Vergabe / Ausführung (LPH 6–8)': 'الترسية / التنفيذ (LPH 6–8)',
      'Empfehlung': 'التوصية',
      'Im Anschluss:': 'بعد ذلك:',
      'Mit diesen Angaben anfragen': 'إرسال طلب بهذه البيانات',
      'Zu Planung & Architektur': 'إلى التصميم والعمارة',
      'Bausumme, Fachmodelle und Phase stehen dann schon im Anfrage-Baukasten.': 'تكون التكلفة والنماذج والمرحلة مُدرجة مسبقاً في نموذج الطلب.',
      'Alle Leistungsphasen, auch Sanierung und geförderter Wohnungsbau.': 'جميع مراحل الخدمة، بما فيها الترميم والإسكان المدعوم.',
      'Paket 1 · BIM-Quick-Check & Setup': 'الحزمة 1 · فحص BIM السريع والإعداد',
      'Paket 2 · Automatisierte Modellprüfung & QS': 'الحزمة 2 · تدقيق النماذج الآلي وضبط الجودة',
      'Paket 3 · BIM-Gesamtkoordination': 'الحزمة 3 · التنسيق الشامل لـ BIM',
      'Unterhalb der Paketgröße — der Weg ist die Planung': 'أقل من حجم الحزم — الطريق هو التصميم',
      'Die drei Pakete sind für Großprojekte ab etwa 10 Mio. € Bausumme geschnitten. Für Ihr Vorhaben ist der direkte Weg die Planung aus einer Hand: Entwurf, Genehmigung, Ausführung — mit Energiebilanz und Modell von Anfang an.':
        'الحزم الثلاث مُصمَّمة للمشاريع الكبرى بتكلفة بناء تبدأ من نحو 10 ملايين يورو. الطريق المباشر لمشروعكم هو التصميم من جهة واحدة: التصميم، الترخيص، التنفيذ — مع ميزان الطاقة والنموذج منذ البداية.',
      'Ohne Fachmodell beginnt jedes Projekt mit dem Setup: AIA und BAP, Koordinationsumgebung, Namenskonventionen — und der erste Prüflauf, sobald das erste Modell steht.':
        'من دون نموذج تخصصي يبدأ كل مشروع بالإعداد: متطلبات المعلومات (AIA) وخطة التنفيذ (BAP)، بيئة التنسيق، قواعد التسمية — ثم أول جولة تدقيق حين يتوفر أول نموذج.',
      'Ein Bestandsmodell oder Scan ist eine Grundlage, noch keine Koordinationsbasis. Der Quick-Check legt fest, was die Fachmodelle liefern müssen, und prüft den Bestand gleich mit.':
        'نموذج الوضع القائم أو المسح أساسٌ، لكنه ليس قاعدة تنسيق بعد. يحدد الفحص السريع ما يجب أن تقدمه النماذج التخصصية ويدقق الوضع القائم في الوقت نفسه.',
      'In Vorplanung und Entwurf entscheidet sich, ob das Projekt später prüffähig ist. Der Quick-Check schafft die Grundlage in 2–4 Wochen; über die Planungsphasen hinweg hält dann das Mandat die Fachmodelle zusammen.':
        'في التصميم الأولي والتطويري يتحدد ما إذا كان المشروع قابلاً للتدقيق لاحقاً. يضع الفحص السريع الأساس خلال 2–4 أسابيع؛ وعبر مراحل التصميم يحفظ التكليف الشهري تماسك النماذج التخصصية.',
      'Bei 5–10 Mio. € ist der Quick-Check die passende Einstiegsgröße. Ein laufendes Mandat lohnt sich hier meist erst, wenn drei Fachmodelle koordiniert werden müssen.':
        'عند 5–10 ملايين يورو يكون الفحص السريع هو حجم البداية المناسب. أما التكليف المستمر فلا يستحق عادةً إلا حين يلزم تنسيق ثلاثة نماذج تخصصية.',
      'Drei Fachmodelle in Genehmigung und Ausführungsplanung: Hier laufen die meisten Änderungen gleichzeitig. Das Mandat prüft jeden Stand, hält Koordinationssitzung und Maßnahmenliste — die Prüfläufe sind darin enthalten.':
        'ثلاثة نماذج تخصصية في مرحلتَي الترخيص والتصميم التنفيذي: هنا تجري أكثر التغييرات في وقت واحد. يدقق التكليف كل إصدار ويدير اجتماع التنسيق وقائمة الإجراءات — وجولات التدقيق مشمولة فيه.',
      'Jeder Planungsstand wird geprüft, bevor er in die nächste Runde geht: Kollisionen, Duplikate, IDS-Konformität — mit Befunden als BCF zurück an die Fachplaner. Als Festpreis je Prüflauf, planbar je Meilenstein.':
        'يُدقَّق كل إصدار تصميمي قبل انتقاله إلى الجولة التالية: التصادمات، التكرارات، مطابقة IDS — مع إعادة النتائج بصيغة BCF إلى المصممين. بسعر ثابت لكل جولة، قابل للتخطيط لكل مرحلة إنجاز.',
      'Vor Vergabe und Ausführung zählt der dokumentierte Stand: ein Prüflauf mit Prüfbericht und BCF, bevor der erste Auftrag vergeben wird. Was hier gefunden wird, kostet noch keinen Nachtrag.':
        'قبل الترسية والتنفيذ يهم الوضع الموثَّق: جولة تدقيق واحدة مع تقرير وملف BCF قبل ترسية أول عقد. ما يُكتشف هنا لا يكلف أمرَ تغيير بعد.',

      /* Anfrage-Baukasten (#kontakt) */
      'Erstgespräch vorbereiten': 'الإعداد للمحادثة الأولى',
      'Ein paar Angaben, dann steht Ihr Text fertig darunter — zum Absenden über Ihr Mailprogramm, zum Kopieren oder zum Drucken. Es wird nichts übertragen und nichts gespeichert.':
        'بضع بيانات ويكون نصكم جاهزاً أدناه — للإرسال عبر برنامج البريد، أو للنسخ، أو للطباعة. لا يُنقل شيء ولا يُخزَّن شيء.',
      'Projektart': 'نوع المشروع',
      'Zeitrahmen': 'الإطار الزمني',
      'Rückmeldung bitte per': 'الرد المفضَّل عبر',
      'Kurz zum Vorhaben (freiwillig)': 'نبذة عن المشروع (اختياري)',
      'So geht Ihr Text ab': 'هذا هو النص الذي سترسلونه',
      'Erstgespräch anfragen': 'طلب محادثة أولى',
      'Text kopieren': 'نسخ النص',
      'Drucken / als PDF sichern': 'طباعة / حفظ كـ PDF',
      'oder direkt in:': 'أو مباشرة في:',
      'Gmail': 'Gmail',
      'Outlook Web': 'Outlook Web',
      'Nur beim Weg über Gmail oder Outlook Web steht Ihr Text in der Adresse zum jeweiligen Anbieter — beim Mailprogramm, beim Kopieren und beim Drucken verlässt nichts Ihren Rechner.': 'فقط عند استخدام Gmail أو Outlook Web يُنقل نصكم في عنوان المزوّد المعني — مع برنامج البريد والنسخ والطباعة لا يغادر شيء جهازكم.',
      'Kennzahlen aus einem Prüflauf mit BIT-Atelier:': 'مؤشرات من دورة تدقيق في BIT-Atelier:',
      'Modell': 'النموذج',
      'Bauteile mit Geometrie': 'عناصر ذات هندسة',
      'Geschosse': 'الطوابق',
      'Harte Kollisionen': 'تصادمات صلبة',
      'Doppelmodellierungen': 'نمذجة مكررة',
      'IDS-Verstöße': 'مخالفات IDS',
      'Antwort in der Regel innerhalb von 24 Stunden.': 'الرد عادةً خلال 24 ساعة.',
      'Guten Tag,': 'السيد المقدم المحترم،',
      'ich möchte ein Erstgespräch vereinbaren.': 'أرغب في ترتيب محادثة أولى.',
      '(offen)': '(غير محدد)',
      'Zum Vorhaben:': 'عن المشروع:',
      'Mit freundlichen Grüßen': 'مع أطيب التحيات',
      'Erstgespräch BIT-ATELIER — ': 'محادثة أولى BIT-ATELIER — ',
      'Kopiert ✓': 'تم النسخ ✓',
      'Bitte den Text oben markieren und kopieren': 'يُرجى تحديد النص أعلاه ونسخه',
      'An': 'إلى'
    }
  };

  /* Hinweis über dem Impressum, wenn nicht Deutsch gewählt ist */
  const IMPRESSUM_HINWEIS = {
    en: 'The legal notice and privacy statement below are given in German — they are the legally binding version under German law.',
    ar: 'البيانات القانونية وسياسة حماية البيانات أدناه بالألمانية، وهي النسخة المُلزِمة قانوناً وفق القانون الألماني.'
  };

  /* --------------------------------------------------------------------- */
  const AUSWAHL = 'h1,h2,h3,h4,p,li,span,b,figcaption,button,a';
  const BLOCK = 'h1,h2,h3,h4,p,li,ul,ol,div,figure,figcaption,button,section,nav';
  const urtext = new Map();          /* Element -> deutsches Original */
  let aktuell = 'de';

  function blaetter() {
    const alle = [...document.querySelectorAll(AUSWAHL)].filter(el =>
      !el.closest('#impressum') &&
      !el.closest('[data-sprachwahl]') &&
      !el.closest('[data-nicht-uebersetzen]') &&   /* gilt auch für Kindelemente */
      !el.querySelector(BLOCK)
    );
    /* nur das äußerste passende Element je Textblock nehmen */
    return alle.filter(el => !alle.some(o => o !== el && o.contains(el)));
  }

  function normal(t) { return t.replace(/\s+/g, ' ').trim(); }

  function setze(sprache) {
    const wb = WB[sprache];
    for (const el of blaetter()) {
      if (!urtext.has(el)) urtext.set(el, el.innerHTML);
      const de = normal(urtext.get(el));
      if (!de) continue;
      if (sprache === 'de') { el.innerHTML = urtext.get(el); continue; }
      const neu = wb && wb[de];
      el.innerHTML = neu !== undefined ? neu : urtext.get(el);   /* Rückfall: Deutsch */
    }

    /* Seitentitel */
    const titel = WB[sprache] && WB[sprache]['BIT-ATELIER — Architektur trifft Digitalisierung'];
    document.title = (sprache === 'de' || !titel)
      ? 'BIT-ATELIER — Architektur trifft Digitalisierung' : titel;

    /* Sprache und Leserichtung am Wurzelelement */
    const wurzel = document.documentElement;
    wurzel.setAttribute('lang', sprache);
    wurzel.setAttribute('dir', sprache === 'ar' ? 'rtl' : 'ltr');

    /* Hinweis über dem Impressum */
    let hinweis = document.getElementById('impressum-sprachhinweis');
    const imp = document.getElementById('impressum');
    if (imp) {
      if (sprache === 'de') { if (hinweis) hinweis.remove(); }
      else {
        if (!hinweis) {
          hinweis = document.createElement('p');
          hinweis.id = 'impressum-sprachhinweis';
          hinweis.setAttribute('data-nicht-uebersetzen', '');
          hinweis.style.cssText = 'border:1px solid var(--line-strong);padding:.8rem 1rem;margin-bottom:1.6rem';
          imp.querySelector('.mitte').prepend(hinweis);
        }
        hinweis.textContent = IMPRESSUM_HINWEIS[sprache];
      }
    }

    /* Jahreszahl im Fuß neu setzen — sie steht in einem übersetzten Block */
    const jahr = document.getElementById('jahr');
    if (jahr) jahr.textContent = new Date().getFullYear();

    /* Kapitelknoepfe der Buehne neu beschriften. Sie werden vom Modul erzeugt
       und trugen sonst dauerhaft die Sprache, in der sie entstanden sind. */
    document.querySelectorAll('#route button[data-label]').forEach(b => {
      const de = b.dataset.label;
      const t = (sprache === 'de') ? de : ((WB[sprache] && WB[sprache][de]) || de);
      b.textContent = b.dataset.nr + ' ' + t;
    });

    /* Knöpfe markieren */
    document.querySelectorAll('[data-sprache]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.sprache === sprache)));

    aktuell = sprache;
    try { localStorage.setItem('bit-sprache', sprache); } catch (e) { /* egal */ }

    /* Die Wahl gehoert in die Adresse (Phase 65-06). Vorher aenderte sich die URL
       nie: zwei Drittel der Uebersetzungsarbeit waren weder verlinkbar noch fuer
       Suchmaschinen sichtbar. replaceState statt pushState — die Sprachwahl soll
       den Zurueck-Knopf nicht mit Zwischenstaenden fuellen. */
    try {
      const u = new URL(location.href);
      const aufKopie = /^\/(en|ar)\//.test(u.pathname);
      /* Auf /en/ und /ar/ steht die Sprache schon im Pfad — ein zusaetzliches
         ?lang waere Redundanz und wuerde den canonical-Link verwaessern. */
      if (!aufKopie) {
        if (sprache === 'de') u.searchParams.delete('lang');
        else u.searchParams.set('lang', sprache);
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      }
    } catch (e) { /* aeltere Browser: dann eben ohne */ }
  }

  /* Knöpfe verdrahten */
  document.querySelectorAll('[data-sprache]').forEach(b =>
    b.addEventListener('click', () => setze(b.dataset.sprache)));

  /* Reihenfolge: ?lang= aus der Adresse, dann gemerkte Wahl, dann Browsersprache.
     Die Adresse gewinnt, damit ein geteilter Link beim Empfaenger dieselbe
     Sprache zeigt wie beim Absender — auch wenn dessen Browser anders steht. */
  let start = '';
  try {
    const u = new URL(location.href);
    /* Vorgerenderte Fassung: /en/ und /ar/ sind eigene Adressen und tragen ihre
       Sprache im Pfad. Ohne diese Zeile wuerde sprachen.js die fertige Kopie
       anhand von localStorage wieder zurueckuebersetzen — der Besucher landet
       auf einer englischen URL und liest Deutsch. */
    const ausPfad = (u.pathname.match(/^\/(en|ar)\//) || [])[1];
    const wunsch = (u.searchParams.get('lang') || ausPfad || '').toLowerCase();
    if (wunsch === 'en' || wunsch === 'ar' || wunsch === 'de') start = wunsch;
  } catch (e) { /* egal */ }
  if (!start) {
    try { start = localStorage.getItem('bit-sprache') || ''; } catch (e) { start = ''; }
  }
  if (!start) {
    const b = (navigator.language || 'de').slice(0, 2).toLowerCase();
    start = (b === 'ar' || b === 'en') ? b : 'de';
  }
  if (start !== 'de') setze(start); else setze('de');

  /* Das Bühnen-Modul erzeugt Kapitelknöpfe und HUD-Texte erst nach diesem
     Skript. Deshalb einmal nach dem Laden erneut anwenden, und dem Modul
     eine Nachschlagefunktion geben. */
  window.bitHud = (t) => (aktuell === 'de') ? t : ((WB[aktuell] && WB[aktuell][t]) || t);
  addEventListener('load', () => setze(aktuell));

  /* Für die Abnahme von außen erreichbar */
  window.bitSprache = { setze, aktuell: () => aktuell, fehlende: (s) => {
    const wb = WB[s] || {};
    return blaetter().map(el => normal(urtext.get(el) || el.innerHTML))
      .filter(t => t && wb[t] === undefined);
  }};
})();
