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

  /* Dictionaries per language (69-17): sprachen.en.js / sprachen.ar.js register
     themselves in window.bitWoerterbuch and are loaded on demand. */
  const WB = window.bitWoerterbuch = window.bitWoerterbuch || {};
  /* Same folder as this script — works on / and on the copies /en/, /ar/ (../assets/js/). */
  const BASIS = ((document.currentScript && document.currentScript.src) || '').replace(/[^/]*$/, '');
  const ladend = {};

  function woerterbuchLaden(sprache) {
    if (WB[sprache]) return Promise.resolve(WB[sprache]);
    if (!ladend[sprache]) {
      ladend[sprache] = new Promise((fertig, fehler) => {
        const el = document.createElement('script');
        el.src = BASIS + 'sprachen.' + sprache + '.js';
        /* Marked so the generator does not freeze this tag into en/ar (69-17). */
        el.setAttribute('data-nachgeladen', '');
        el.onload = () => WB[sprache] ? fertig(WB[sprache])
          : fehler(new Error('Wörterbuch ' + el.src + ' geladen, aber leer'));
        el.onerror = () => { delete ladend[sprache]; el.remove(); fehler(new Error('Wörterbuch ' + el.src + ' nicht ladbar')); };
        document.head.appendChild(el);
      });
    }
    return ladend[sprache];
  }

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
  let urTitel = null;

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

  /* Since 69-17 setze() is async: a language other than German first loads its
     dictionary. A newer choice overtakes an older one still loading. When done,
     the event "bit-sprache" lets page scripts redraw texts they build themselves
     (package finder, mail preview). */
  let auftrag = 0;
  async function setze(sprache) {
    const nr = ++auftrag;
    if (sprache !== 'de' && !WB[sprache]) {
      try { await woerterbuchLaden(sprache); }
      catch (e) {
        console.error('[sprachen] ' + e.message + ' — die Seite bleibt in der bisherigen Sprache.');
        return false;
      }
      if (nr !== auftrag) return false;
    }
    anwenden(sprache);
    document.dispatchEvent(new CustomEvent('bit-sprache', { detail: sprache }));
    return true;
  }

  function anwenden(sprache) {
    const wb = WB[sprache];
    for (const el of blaetter()) {
      if (!urtext.has(el)) urtext.set(el, el.innerHTML);
      const de = normal(urtext.get(el));
      if (!de) continue;
      if (sprache === 'de') { el.innerHTML = urtext.get(el); continue; }
      const neu = wb && wb[de];
      el.innerHTML = neu !== undefined ? neu : urtext.get(el);   /* Rückfall: Deutsch */
    }

    /* Page title: the German title of THIS page is the key (69-10: topic pages
       have their own titles). On the copies the frozen title is already
       translated and simply stays. */
    if (urTitel === null) urTitel = document.title;
    const titel = WB[sprache] && WB[sprache][urTitel];
    document.title = (sprache === 'de' || !titel) ? urTitel : titel;

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
  /* On the pre-rendered copies /en/ and /ar/ the frozen text is English or
     Arabic, but the dictionary is keyed by German — translating in place cannot
     work there. So the buttons go to the address of the chosen language instead
     (side finding of 92-09: DE/EN/AR did nothing on /en/ and /ar/). */
  function sprachAdresse(ziel) {
    /* /en/, /ar/ and the topic pages below them (/en/bim-koordination/, 69-10) */
    const m = location.pathname.match(/^\/(en|ar)\/(.*)$/);
    if (!m || ziel === m[1]) return '';
    return '/' + (ziel === 'de' ? '' : ziel + '/') + m[2].replace(/index\.html$/, '') + location.hash;
  }
  document.querySelectorAll('[data-sprache]').forEach(b =>
    b.addEventListener('click', () => {
      const ziel = b.dataset.sprache;
      const adresse = sprachAdresse(ziel);
      if (adresse) {
        try { localStorage.setItem('bit-sprache', ziel); } catch (e) { /* egal */ }
        location.href = adresse;
        return;
      }
      setze(ziel);
    }));

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
  window.bitSprache = { setze, aktuell: () => aktuell, fehlende: async (s) => {
    if (s !== 'de') { try { await woerterbuchLaden(s); } catch (e) { /* then everything counts as missing */ } }
    const wb = WB[s] || {};
    return blaetter().map(el => normal(urtext.get(el) || el.innerHTML))
      .filter(t => t && wb[t] === undefined);
  }};
})();
