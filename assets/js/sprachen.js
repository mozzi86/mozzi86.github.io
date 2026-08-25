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
      'Demo starten': 'Live demo',
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
      'Echter Prüflauf: Werkplanungsmodell mit 4.185 Bauteil-Geometrien über 5 Geschosse, direkt im Browser geprüft — 1 harte Kollision gefunden, AIA-Anforderungen per IDS kontrolliert, Befunde gehen als BCF zurück an die Fachplaner (Projektdaten anonymisiert).':
        'A real checking run: a construction-design model with 4,185 component geometries across five storeys, checked directly in the browser — one hard clash found, information requirements verified via IDS, findings returned to the specialist designers as BCF (project data anonymised).',
      'bit-atelier · prüf-engine — Beispiel-Prüflauf': 'bit-atelier · checking engine — sample run',
      'Energiesimulation': 'Energy simulation',
      'AVA &amp; Kostenplanung': 'Tendering &amp; cost planning',
      'Python-Automatisierung': 'Python automation',
      'Die Plattform ist als Online-Demo zum Ausprobieren freigegeben — serverlos, alles bleibt im Browser. <a href="demo/" style="color:var(--accent)">Demo starten</a>.':
        'The platform is open to try as an online demo — serverless, everything stays in your browser. <a href="demo/" style="color:var(--accent)">Try the demo</a>.',

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
      'Plattform-Demo': 'Platform demo',
      'Impressum &amp; Datenschutz': 'Legal notice &amp; privacy',
      'Die BIT-Atelier-Plattform startet in Kürze': 'The BIT-Atelier platform launches shortly',
      'Konten für die Plattform sind noch nicht freigeschaltet. Die Prüf- und Auswertungswerkzeuge können Sie aber schon jetzt als Online-Demo ausprobieren — serverlos, alles bleibt in Ihrem Browser.':
        'Accounts for the platform are not yet open. You can already try the checking and evaluation tools as an online demo — serverless, everything stays in your browser.',
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
      'Intel-Version <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-Nova-PDF-x64.dmg" style="color:var(--accent)">hier</a>.':
        'Intel version <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-Nova-PDF-x64.dmg" style="color:var(--accent)">here</a>.',
      'Kostenlos · quelloffen entwickelt im BIT-Atelier · alle Versionen <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">auf GitHub</a>. Die Apps sind nicht signiert bzw. notarisiert — Windows SmartScreen bzw. macOS Gatekeeper beim ersten Start über „Trotzdem ausführen" / Rechtsklick → „Öffnen" bestätigen.':
        'Free · developed openly at BIT-Atelier · all releases <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">on GitHub</a>. The apps are not code-signed or notarised — on first launch confirm through Windows SmartScreen (“Run anyway”) or macOS Gatekeeper (right-click → “Open”).'
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
      'Demo starten': 'تجربة النسخة التجريبية',
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
      'Echter Prüflauf: Werkplanungsmodell mit 4.185 Bauteil-Geometrien über 5 Geschosse, direkt im Browser geprüft — 1 harte Kollision gefunden, AIA-Anforderungen per IDS kontrolliert, Befunde gehen als BCF zurück an die Fachplaner (Projektdaten anonymisiert).':
        'جولة تدقيق حقيقية: نموذج تنفيذي يحتوي 4,185 عنصراً هندسياً على خمسة طوابق، دُقِّق مباشرة في المتصفح — عُثر على تعارضٍ حقيقي واحد، وتحقَّقت متطلبات المعلومات عبر IDS، وأُعيدت النتائج بصيغة BCF إلى مهندسي التخصصات (بيانات المشروع مُجهَّلة).',
      'bit-atelier · prüf-engine — Beispiel-Prüflauf': 'bit-atelier · محرِّك التدقيق — جولة نموذجية',
      'Energiesimulation': 'محاكاة الطاقة',
      'AVA &amp; Kostenplanung': 'المناقصات وتخطيط التكاليف',
      'Python-Automatisierung': 'الأتمتة ببايثون',
      'Die Plattform ist als Online-Demo zum Ausprobieren freigegeben — serverlos, alles bleibt im Browser. <a href="demo/" style="color:var(--accent)">Demo starten</a>.':
        'المنصة متاحة للتجربة كنسخة تجريبية على الإنترنت — بلا خادم، وكل شيء يبقى في متصفحك. <a href="demo/" style="color:var(--accent)">ابدأ التجربة</a>.',

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
      'Plattform-Demo': 'النسخة التجريبية للمنصة',
      'Impressum &amp; Datenschutz': 'البيانات القانونية وحماية البيانات',
      'Die BIT-Atelier-Plattform startet in Kürze': 'منصة BIT-Atelier تنطلق قريباً',
      'Konten für die Plattform sind noch nicht freigeschaltet. Die Prüf- und Auswertungswerkzeuge können Sie aber schon jetzt als Online-Demo ausprobieren — serverlos, alles bleibt in Ihrem Browser.':
        'حسابات المنصة لم تُفتَح بعد. لكن يمكنكم تجربة أدوات التدقيق والتحليل الآن كنسخة تجريبية على الإنترنت — بلا خادم، وكل شيء يبقى في متصفحكم.',
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
      'Intel-Version <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-Nova-PDF-x64.dmg" style="color:var(--accent)">hier</a>.':
        'نسخة Intel <a href="https://github.com/mozzi86/NovaPDF/releases/latest/download/BIT-Nova-PDF-x64.dmg" style="color:var(--accent)">من هنا</a>.',
      'Kostenlos · quelloffen entwickelt im BIT-Atelier · alle Versionen <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">auf GitHub</a>. Die Apps sind nicht signiert bzw. notarisiert — Windows SmartScreen bzw. macOS Gatekeeper beim ersten Start über „Trotzdem ausführen" / Rechtsklick → „Öffnen" bestätigen.':
        'مجاني · مُطوَّر بشكل مفتوح في BIT-Atelier · جميع الإصدارات <a href="https://github.com/mozzi86/NovaPDF/releases" style="color:var(--accent)">على GitHub</a>. التطبيقات غير موقَّعة رقمياً — عند أول تشغيل أكِّد عبر Windows SmartScreen («تشغيل على أي حال») أو macOS Gatekeeper (نقر بالزر الأيمن ← «فتح»).'
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
  }

  /* Knöpfe verdrahten */
  document.querySelectorAll('[data-sprache]').forEach(b =>
    b.addEventListener('click', () => setze(b.dataset.sprache)));

  /* Gemerkte Wahl, sonst Browsersprache, sonst Deutsch */
  let start = 'de';
  try { start = localStorage.getItem('bit-sprache') || ''; } catch (e) { start = ''; }
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
