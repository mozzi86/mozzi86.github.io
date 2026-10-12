/* ===========================================================================
   BIT-ATELIER — HOAI-2021-Honorarrechner: Daten und Rechenkern (93-08)
   ---------------------------------------------------------------------------
   Rein: anrechenbare Kosten (Euro), Honorarzone I–V, Satzposition 0–100 %
   (0 = Basissatz, 100 = oberer Honorarsatz, § 7 Abs. 1), Leistungsbild
   Gebäude oder Innenräume, beauftragte Leistungsphasen.
   Raus: Tafelwerte der Zone, Honorar je Leistungsphase und Summe (netto,
   ohne Umbauzuschlag, Nebenkosten und Umsatzsteuer) samt Herleitung.

   Die Zahlen sind NICHT abgetippt: Tafel § 35 Abs. 1 und die Leistungsanteile
   § 34 Abs. 3 stammen wortgleich aus dem App-Repo
   (packages/nova-core/src/lib/hoai/tafel2021.js, leistungsbilder.js — dort aus
   dem amtlichen HTML erzeugt und am 2026-09-27 geprüft); die Interpolation
   folgt honorarAusTafel() in honorar.js. tools/hoai-pruefen.mjs vergleicht
   Tafel, Anteile und Ergebnisse mit der App-Engine.
   Objektlisten: HOAI Anlage 10.2 (Gebäude, vollständig) und die fünf
   allgemeinen Zeilen von 10.3 (Innenräume), aus gesetze-im-internet.de.

   Kein DOM, kein Netz: läuft im Browser (window.bitHoai) und unter Node
   (globalThis.bitHoai) — nichts verlässt das Gerät.
=========================================================================== */
(function (g) {
  'use strict';

  const QUELLE = "https://www.gesetze-im-internet.de/hoai_2013/__35.html";
  const GEPRUEFT_AM = "2026-09-27";   /* Tafel gegen den amtlichen Text geprüft */
  const GILT_AB = "2021-01-01";
  const ZONEN = ['I', 'II', 'III', 'IV', 'V'];

  /* § 35 Abs. 1 HOAI: [anrechenbare Kosten in Euro, [Zone I von, II von, III von, IV von, V von, V bis] in Euro] */
  const TAFEL = Object.freeze([
    [25000, [3120, 3657, 4339, 5412, 6094, 6631]],
    [35000, [4217, 4942, 5865, 7315, 8237, 8962]],
    [50000, [5804, 6801, 8071, 10066, 11336, 12333]],
    [75000, [8342, 9776, 11601, 14469, 16293, 17727]],
    [100000, [10790, 12644, 15005, 18713, 21074, 22928]],
    [150000, [15500, 18164, 21555, 26883, 30274, 32938]],
    [200000, [20037, 23480, 27863, 34751, 39134, 42578]],
    [300000, [28750, 33692, 39981, 49864, 56153, 61095]],
    [500000, [45232, 53006, 62900, 78449, 88343, 96118]],
    [750000, [64666, 75781, 89927, 112156, 126301, 137416]],
    [1000000, [83182, 97479, 115675, 144268, 162464, 176761]],
    [1500000, [119307, 139813, 165911, 206923, 233022, 253527]],
    [2000000, [153965, 180428, 214108, 267034, 300714, 327177]],
    [3000000, [220161, 258002, 306162, 381843, 430003, 467843]],
    [5000000, [343879, 402984, 478207, 596416, 671640, 730744]],
    [7500000, [493923, 578816, 686862, 856648, 964694, 1049587]],
    [10000000, [638277, 747981, 887604, 1107012, 1246635, 1356339]],
    [15000000, [915129, 1072416, 1272601, 1587176, 1787360, 1944648]],
    [20000000, [1180414, 1383298, 1641513, 2047281, 2305496, 2508380]],
    [25000000, [1436874, 1683837, 1998153, 2492079, 2806395, 3053358]],
  ].map((z) => Object.freeze([z[0], Object.freeze(z[1])])));

  /* § 34 Abs. 3 HOAI: Anteil je Leistungsphase in Prozent */
  const LPH = Object.freeze({
    gebaeude: Object.freeze([2, 7, 15, 3, 25, 10, 4, 32, 2]),
    innenraeume: Object.freeze([2, 7, 15, 2, 30, 7, 3, 32, 2]),
  });
  const LPH_NAMEN = Object.freeze(["Grundlagenermittlung","Vorplanung","Entwurfsplanung","Genehmigungsplanung","Ausführungsplanung","Vorbereitung der Vergabe","Mitwirkung bei der Vergabe","Objektüberwachung – Bauüberwachung und Dokumentation","Objektbetreuung"]);

  /* Anlage 10.2 / 10.3: [Gruppe, Objekt, Honorarzone(n) in der Regel] */
  const OBJEKTE = Object.freeze({
    gebaeude: Object.freeze([
    ["Wohnen", "Einfache Behelfsbauten für vorübergehende Nutzung", "I"],
    ["Wohnen", "Einfache Wohnbauten mit gemeinschaftlichen Sanitär- und Kücheneinrichtungen", "II"],
    ["Wohnen", "Einfamilienhäuser, Wohnhäuser oder Hausgruppen in verdichteter Bauweise", "III/IV"],
    ["Wohnen", "Wohnheime, Gemeinschaftsunterkünfte, Jugendherbergen, -freizeitzentren, -stätten", "III/IV"],
    ["Ausbildung/Wissenschaft/Forschung", "Offene Pausen-, Spielhallen", "I"],
    ["Ausbildung/Wissenschaft/Forschung", "Studentenhäuser", "III/IV"],
    ["Ausbildung/Wissenschaft/Forschung", "Schulen mit durchschnittlichen Planungsanforderungen, zum Beispiel Grundschulen, weiterführende Schulen und Berufsschulen", "III"],
    ["Ausbildung/Wissenschaft/Forschung", "Schulen mit hohen Planungsanforderungen, Bildungszentren, Hochschulen, Universitäten, Akademien", "IV"],
    ["Ausbildung/Wissenschaft/Forschung", "Hörsaal-, Kongresszentren", "IV"],
    ["Ausbildung/Wissenschaft/Forschung", "Labor- oder Institutsgebäude", "IV/V"],
    ["Büro/Verwaltung/Staat/Kommune", "Büro-, Verwaltungsgebäude", "III/IV"],
    ["Büro/Verwaltung/Staat/Kommune", "Wirtschaftsgebäude, Bauhöfe", "III/IV"],
    ["Büro/Verwaltung/Staat/Kommune", "Parlaments-, Gerichtsgebäude", "IV"],
    ["Büro/Verwaltung/Staat/Kommune", "Bauten für den Strafvollzug", "IV/V"],
    ["Büro/Verwaltung/Staat/Kommune", "Feuerwachen, Rettungsstationen", "III/IV"],
    ["Büro/Verwaltung/Staat/Kommune", "Sparkassen- oder Bankfilialen", "III/IV"],
    ["Büro/Verwaltung/Staat/Kommune", "Büchereien, Bibliotheken, Archive", "III/IV"],
    ["Gesundheit/Betreuung", "Liege- oder Wandelhallen", "I"],
    ["Gesundheit/Betreuung", "Kindergärten, Kinderhorte", "III"],
    ["Gesundheit/Betreuung", "Jugendzentren, Jugendfreizeitstätten", "III"],
    ["Gesundheit/Betreuung", "Betreuungseinrichtungen, Altentagesstätten", "III"],
    ["Gesundheit/Betreuung", "Pflegeheime oder Bettenhäuser, ohne oder mit medizinisch-technischer Einrichtungen", "III/IV"],
    ["Gesundheit/Betreuung", "Unfall-, Sanitätswachen, Ambulatorien", "II/III"],
    ["Gesundheit/Betreuung", "Therapie- oder Rehabilitations-Einrichtungen, Gebäude für Erholung, Kur oder Genesung", "III/IV"],
    ["Gesundheit/Betreuung", "Hilfskrankenhäuser", "III"],
    ["Gesundheit/Betreuung", "Krankenhäuser der Versorgungsstufe I oder II, Krankenhäuser besonderer Zweckbestimmung", "IV"],
    ["Gesundheit/Betreuung", "Krankenhäuser der Versorgungsstufe III, Universitätskliniken", "V"],
    ["Handel und Verkauf/Gastgewerbe", "Einfache Verkaufslager, Verkaufsstände, Kioske", "II"],
    ["Handel und Verkauf/Gastgewerbe", "Ladenbauten, Discounter, Einkaufszentren, Märkte, Messehallen", "III/IV"],
    ["Handel und Verkauf/Gastgewerbe", "Gebäude für Gastronomie, Kantinen oder Mensen", "III/IV"],
    ["Handel und Verkauf/Gastgewerbe", "Großküchen, mit oder ohne Speiseräume", "IV"],
    ["Handel und Verkauf/Gastgewerbe", "Pensionen, Hotels", "III/IV"],
    ["Freizeit/Sport", "Einfache Tribünenbauten", "II"],
    ["Freizeit/Sport", "Bootshäuser", "II"],
    ["Freizeit/Sport", "Turn- oder Sportgebäude", "III/IV"],
    ["Freizeit/Sport", "Mehrzweckhallen, Hallenschwimmbäder, Großsportstätten", "IV/V"],
    ["Gewerbe/Industrie/Landwirtschaft", "Einfache Landwirtschaftliche Gebäude, zum Beispiel Feldscheunen, Einstellhallen", "I"],
    ["Gewerbe/Industrie/Landwirtschaft", "Landwirtschaftliche Betriebsgebäude, Stallanlagen", "II/III/IV"],
    ["Gewerbe/Industrie/Landwirtschaft", "Gewächshäuser für die Produktion", "II"],
    ["Gewerbe/Industrie/Landwirtschaft", "Einfache geschlossene, eingeschossige Hallen, Werkstätten", "II"],
    ["Gewerbe/Industrie/Landwirtschaft", "Spezielle Lagergebäude, zum Beispiel Kühlhäuser", "III"],
    ["Gewerbe/Industrie/Landwirtschaft", "Werkstätten, Fertigungsgebäude des Handwerks oder der Industrie", "II/III/IV"],
    ["Gewerbe/Industrie/Landwirtschaft", "Produktionsgebäude der Industrie", "III/IV/V"],
    ["Infrastruktur", "Offene Verbindungsgänge, Überdachungen, zum Beispiel Wetterschutzhäuser, Carports", "I"],
    ["Infrastruktur", "Einfache Garagenbauten", "II"],
    ["Infrastruktur", "Parkhäuser, -garagen, Tiefgaragen, jeweils mit integrierten weiteren Nutzungsarten", "II/III"],
    ["Infrastruktur", "Bahnhöfe oder Stationen verschiedener öffentlicher Verkehrsmittel", "IV"],
    ["Infrastruktur", "Flughäfen", "IV/V"],
    ["Infrastruktur", "Energieversorgungszentralen, Kraftwerksgebäude, Großkraftwerke", "IV/V"],
    ["Kultur-/Sakralbauten", "Pavillons für kulturelle Zwecke", "II/III"],
    ["Kultur-/Sakralbauten", "Bürger-, Gemeindezentren, Kultur-/Sakralbauten, Kirchen", "IV"],
    ["Kultur-/Sakralbauten", "Mehrzweckhallen für religiöse oder kulturelle Zwecke", "IV"],
    ["Kultur-/Sakralbauten", "Ausstellungsgebäude, Lichtspielhäuser", "III/IV"],
    ["Kultur-/Sakralbauten", "Museen", "IV/V"],
    ["Kultur-/Sakralbauten", "Theater-, Opern-, Konzertgebäude", "IV/V"],
    ["Kultur-/Sakralbauten", "Studiogebäude für Rundfunk oder Fernsehen", "IV/V"],
    ]),
    innenraeume: Object.freeze([
    ["", "Einfachste Innenräume für vorübergehende Nutzung ohne oder mit einfachsten seriellen Einrichtungsgegenständen", "I"],
    ["", "Innenräume mit geringer Planungsanforderung, unter Verwendung von serienmäßig hergestellten Möbeln und Ausstattungsgegenständen einfacher Qualität, ohne technische Ausstattung", "II"],
    ["", "Innenräume mit durchschnittlicher Planungsanforderung, zum überwiegenden Teil unter Verwendung von serienmäßig hergestellten Möbeln und Ausstattungsgegenständen oder mit durchschnittlicher technischer Ausstattung", "III"],
    ["", "Innenräume mit hohen Planungsanforderungen, unter Mitverwendung von serienmäßig hergestellten Möbeln und Ausstattungsgegenständen gehobener Qualität oder gehobener technischer Ausstattung", "IV"],
    ["", "Innenräume mit sehr hohen Planungsanforderungen, unter Verwendung von aufwendiger Einrichtung oder Ausstattung oder umfangreicher technischer Ausstattung", "V"],
    ]),
  });

  /** Commercial rounding to whole cents (same as rundeCent in the app's honorar.js). */
  function rundeCent(betragEuro) {
    if (!Number.isFinite(betragEuro)) return 0;
    const cent = Math.round(Number((Math.abs(betragEuro) * 100).toPrecision(15)));
    return ((betragEuro < 0 ? -cent : cent) || 0) / 100;
  }

  /**
   * § 13 interpolation, as honorarAusTafel() in the app: bilinear between the two
   * zone bounds (position 0..100 %) and between the two table rows that bracket
   * the chargeable costs. Outside 25,000 .. 25,000,000 Euro the fee is freely
   * negotiable — no extrapolation.
   * @param {number} kostenEuro anrechenbare Kosten in Euro
   * @param {string} zone 'I'..'V'
   * @param {number} positionProzent 0 (Basissatz) .. 100 (oberer Satz)
   * @returns {{basis:number|null, oben:number|null, honorar:number|null, ausserhalb:boolean,
   *   zeileUnten:number[]|null, zeileOben:number[]|null, anteil:number|null}}
   */
  function honorarAusTafel(kostenEuro, zone, positionProzent) {
    const leer = { basis: null, oben: null, honorar: null, ausserhalb: false, zeileUnten: null, zeileOben: null, anteil: null };
    const z = ZONEN.indexOf(zone);
    if (z < 0) return leer;
    if (!(kostenEuro >= TAFEL[0][0]) || !(kostenEuro <= TAFEL[TAFEL.length - 1][0])) return { ...leer, ausserhalb: true };
    let unten = TAFEL[0], oben = TAFEL[TAFEL.length - 1];
    for (let i = 0; i < TAFEL.length - 1; i++) {
      if (kostenEuro >= TAFEL[i][0] && kostenEuro <= TAFEL[i + 1][0]) { unten = TAFEL[i]; oben = TAFEL[i + 1]; break; }
    }
    const spanne = oben[0] - unten[0];
    const anteil = spanne === 0 ? 0 : (kostenEuro - unten[0]) / spanne;
    const wert = (i) => unten[1][i] + anteil * (oben[1][i] - unten[1][i]);
    const b = wert(z), o = wert(z + 1);
    const h = b + (positionProzent / 100) * (o - b);
    return { basis: rundeCent(b), oben: rundeCent(o), honorar: rundeCent(h), ausserhalb: false,
      zeileUnten: [unten[0], unten[1][z], unten[1][z + 1]], zeileOben: [oben[0], oben[1][z], oben[1][z + 1]], anteil };
  }

  /**
   * Fee per service phase and in total, at the chosen position and as the range
   * Basissatz .. oberer Satz. Rounded per phase to the cent, as the app does.
   * @param {{kostenEuro:number, zone:string, positionProzent:number, leistungsbild:'gebaeude'|'innenraeume', phasen:boolean[]}} e
   */
  function rechne(e) {
    const prozente = LPH[e.leistungsbild] || LPH.gebaeude;
    const t = honorarAusTafel(e.kostenEuro, e.zone, e.positionProzent);
    if (t.honorar === null) return { tafel: t, phasen: [], summe: null };
    let summe = 0, summeBasis = 0, summeOben = 0;
    const phasen = prozente.map((p, i) => {
      const an = !!(e.phasen && e.phasen[i]);
      const betrag = rundeCent(t.honorar * p / 100);
      const basis = rundeCent(t.basis * p / 100);
      const oben = rundeCent(t.oben * p / 100);
      if (an) { summe += betrag; summeBasis += basis; summeOben += oben; }
      return { nr: i + 1, name: LPH_NAMEN[i], prozent: p, beauftragt: an, betrag, basis, oben };
    });
    const prozentSumme = phasen.filter((p) => p.beauftragt).reduce((s, p) => s + p.prozent, 0);
    return { tafel: t, phasen, prozentSumme,
      summe: { betrag: rundeCent(summe), basis: rundeCent(summeBasis), oben: rundeCent(summeOben) } };
  }

  g.bitHoai = Object.freeze({ QUELLE, GEPRUEFT_AM, GILT_AB, ZONEN, TAFEL, LPH, LPH_NAMEN, OBJEKTE, rundeCent, honorarAusTafel, rechne });
})(typeof window !== 'undefined' ? window : globalThis);
