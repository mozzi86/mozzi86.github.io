// Page list of the site (69-10): the home page plus three topic pages, each in
// German (source) and as English/Arabic copies.
//
// Used by:
//   tools/unterseiten-erzeugen.mjs   cuts the topic pages out of index.html and writes sitemap.xml
//   tools/sprachkopien-erzeugen.mjs  translates every page in a real browser into en/ and ar/
//
// In:  nothing (static data). Out: DOMAIN, SPRACHEN, SEITEN.
// Page titles and the visible texts of the topic pages (h1, intro) are translated
// through the dictionaries (assets/js/sprachen.*.js) like everything else; only the
// meta description lives here, because sprachen.js does not touch <head>.

/** Public origin of the site, with trailing slash. */
export const DOMAIN = 'https://bit-atelier.de/';

/** Languages: German is the source, en/ar are generated copies in /en/ and /ar/. */
export const SPRACHEN = [
  { code: 'de', dir: 'ltr', ogLocale: 'de_DE' },
  { code: 'en', dir: 'ltr', ogLocale: 'en_US' },
  { code: 'ar', dir: 'rtl', ogLocale: 'ar_AR' },
];

/**
 * @typedef {Object} Seite
 * @property {string} ordner        folder below the language root ('' = home page)
 * @property {string[]} [abschnitte] section ids taken from index.html (topic pages only)
 * @property {boolean} [inhalt]    own content from tools/seiten/<ordner>.html instead of sections (69-33)
 * @property {string} [titel]       German <title>; translated via the dictionary
 * @property {string} [h1]          German page heading of a topic page
 * @property {string} [intro]       German intro paragraph of a topic page
 * @property {string} [herkunft]    source tag the enquiry builder puts into the mail subject (69-01)
 * @property {{de:string,en:string,ar:string}} beschreibung  meta description per language
 * @property {number} prioritaet    sitemap priority (0..1)
 */

/** @type {Seite[]} */
export const SEITEN = [
  {
    ordner: '',
    prioritaet: 1.0,
    beschreibung: {
      de: 'BIT-ATELIER, Architekturbüro von Mohamed Elmokadem: BIM-Koordination und Modellprüfung mit eigener Prüf-Engine, dazu Planung und Architektur über alle Leistungsphasen. Raum Nürnberg, Projekte bundesweit.',
      en: 'BIT-ATELIER, the architecture practice of Mohamed Elmokadem: BIM coordination and model checking with an in-house checking engine, plus design and architecture across all work stages. Nuremberg area, projects across Germany.',
      ar: 'BIT-ATELIER، مكتب العمارة للمهندس محمد المقدم: تنسيق BIM وتدقيق النماذج بمحرِّك تدقيق مُطوَّر داخلياً، إلى جانب التصميم المعماري في جميع مراحل الخدمة. منطقة نورنبرغ، ومشاريع في عموم ألمانيا.',
    },
  },
  {
    ordner: 'bim-koordination',
    abschnitte: ['leistungen', 'pakete'],
    titel: 'BIM-Koordination und Leistungspakete — BIT-ATELIER',
    h1: 'BIM-Koordination mit festen Paketen.',
    intro: 'Vom Quick-Check bis zur Gesamtkoordination: drei Pakete für Großprojekte ab etwa 5 Mio. € Bausumme, als Festpreis oder monatliches Mandat — dazu Planung und Architektur über alle Leistungsphasen.',
    herkunft: 'BIM-Koordination',
    prioritaet: 0.8,
    beschreibung: {
      de: 'BIM-Koordination von BIT-ATELIER: Quick-Check und Setup, automatisierte Modellprüfung, Gesamtkoordination — als Festpreis oder Mandat, mit Paketfinder und Anfrage ohne Anmeldung.',
      en: 'BIM coordination by BIT-ATELIER: quick check and set-up, automated model checking, full coordination — as a fixed price or retainer, with a package finder and an enquiry without sign-up.',
      ar: 'تنسيق BIM من BIT-ATELIER: فحص سريع وإعداد، وتدقيق آلي للنماذج، وتنسيق شامل — بسعر ثابت أو بعقد شهري، مع أداة لاختيار الحزمة وطلب دون تسجيل.',
    },
  },
  {
    ordner: 'modellpruefung-ids-bcf',
    abschnitte: ['werkzeuge'],
    titel: 'Modellprüfung mit IFC, IDS und BCF — BIT-ATELIER',
    h1: 'Modellprüfung mit IFC, IDS und BCF.',
    intro: 'Kollisionen, Duplikate und AIA-Anforderungen nach buildingSMART IDS prüfen — lokal auf Ihrem Rechner, mit Befunden als BCF zurück an die Fachplaner.',
    herkunft: 'Modellprüfung',
    prioritaet: 0.8,
    beschreibung: {
      de: 'Modellprüfung mit eigener Prüf-Engine: IFC lesen, Kollisionen und Duplikate finden, IDS-Anforderungen prüfen, Befunde als BCF. Lokal, ohne Upload — mit Musterbericht zum Herunterladen.',
      en: 'Model checking with an in-house engine: read IFC, find clashes and duplicates, check IDS requirements, return findings as BCF. Local, no upload — with a sample report to download.',
      ar: 'تدقيق النماذج بمحرِّك مُطوَّر داخلياً: قراءة IFC، وكشف التصادمات والتكرارات، وفحص متطلبات IDS، وإعادة النتائج بصيغة BCF. محلياً ودون رفع ملفات — مع تقرير نموذجي للتنزيل.',
    },
  },
  {
    // 69-33 (D-HR-16): own content in tools/seiten/mengen-ava.html.
    ordner: 'mengen-ava',
    inhalt: true,
    titel: 'Mengen und AVA aus dem Modell — BIT-ATELIER',
    h1: 'Mengen und AVA aus dem Modell.',
    intro: 'Mengen aus dem IFC-Modell, Leistungsverzeichnis als GAEB X83, Kostenberechnung nach DIN 276, Preisspiegel und Abrechnung — lokal auf Ihrem Rechner.',
    herkunft: 'Mengen & AVA',
    prioritaet: 0.6,
    beschreibung: {
      de: 'Mengen aus dem IFC-Modell und AVA in BIT-Atelier: Leistungsverzeichnis als GAEB DA XML X83, liest X81/82/84/86 und GAEB 90, Kostenberechnung nach DIN 276, Preisspiegel, Aufmaß und Abrechnung.',
      en: 'Quantities from the IFC model and tendering in BIT-Atelier: bill of quantities as GAEB DA XML X83, reads X81/82/84/86 and GAEB 90, cost calculation to DIN 276, bid comparison, measurement and billing.',
      ar: 'الكميات من نموذج IFC وإعداد المناقصات في BIT-Atelier: جدول الكميات بصيغة GAEB DA XML X83، وقراءة X81/82/84/86 وGAEB 90، وحساب التكاليف وفق DIN 276، ومقارنة العروض، والقياس والفوترة.',
    },
  },
  {
    // 69-33 (D-HR-17): strictly a screening on the model, never a GEG proof.
    ordner: 'energie-screening',
    inhalt: true,
    titel: 'Energie-Screening am Modell — BIT-ATELIER',
    h1: 'Energie-Screening am Modell — kein GEG-Nachweis.',
    intro: 'Hülle, Technik und Versorgung früh am Modell vergleichen, mit Richtwerten statt Nachweisen. Den Nachweis stellt die Energieberatung.',
    herkunft: 'Energie-Screening',
    prioritaet: 0.6,
    beschreibung: {
      de: 'Energie-Screening am Gebäudemodell in BIT-Atelier: U-Wert und Tauwasser, Heizlast bis PV-Ertrag, Wärmebrücken als Richtwert — zum Vergleichen in der frühen Planung, ausdrücklich kein GEG-Nachweis.',
      en: 'Energy screening on the building model in BIT-Atelier: U value and condensation, heating load to PV yield, thermal bridges as guide values — for comparing early design options, explicitly not a GEG compliance proof.',
      ar: 'فحص أولي للطاقة على نموذج المبنى في BIT-Atelier: قيمة U والتكاثف، من الحمل الحراري إلى إنتاج الطاقة الشمسية، والجسور الحرارية كقيم استرشادية — للمقارنة في مراحل التصميم المبكرة، وليس إثباتاً وفق قانون GEG.',
    },
  },
  {
    ordner: 'bit-pdf',
    abschnitte: ['downloads'],
    titel: 'BIT-PDF — portabler PDF-Editor — BIT-ATELIER',
    h1: 'BIT-PDF: PDF bearbeiten, ohne dass etwas Ihr Gerät verlässt.',
    intro: 'Der kostenlose PDF-Editor aus dem BIT-Atelier — im Browser, als portable .exe für Windows oder als DMG für macOS.',
    herkunft: 'BIT-PDF',
    prioritaet: 0.6,
    beschreibung: {
      de: 'BIT-PDF: kostenloser, portabler PDF-Editor — bearbeiten, organisieren, konvertieren, signieren und schwärzen, vollständig lokal mit Offline-OCR. Im Browser, für Windows und macOS.',
      en: 'BIT-PDF: free, portable PDF editor — edit, organise, convert, sign and redact, fully local with offline OCR. In the browser, for Windows and macOS.',
      ar: 'BIT-PDF: محرِّر PDF مجاني ومحمول — تحرير وتنظيم وتحويل وتوقيع وحجب، محلياً بالكامل مع التعرف الضوئي دون اتصال. في المتصفح ولأنظمة Windows وmacOS.',
    },
  },
];

/**
 * Public URL of a page in a language.
 * @param {Seite} seite
 * @param {string} code  'de' | 'en' | 'ar'
 * @returns {string}
 */
export function adresse(seite, code) {
  return DOMAIN + (code === 'de' ? '' : code + '/') + (seite.ordner ? seite.ordner + '/' : '');
}
