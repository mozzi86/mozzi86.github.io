/* ===========================================================================
   BIT-ATELIER — Honorarrechner HOAI 2021: Oberfläche (93-08)
   ---------------------------------------------------------------------------
   Rein: die Felder im Block #honorarrechner (index.html), Rechenkern
   window.bitHoai (assets/js/hoai2021.js), Wörterbuch über window.bitHud.
   Raus: Ergebnis mit Spanne je Leistungsphase, Summe und Herleitung in
   #h-ergebnis — alles im Browser, keine Anfrage, nichts wird gespeichert.

   Texte mit Zahlen stehen als Muster mit {platzhaltern} im Wörterbuch; die
   Zahlen werden nach der Übersetzung eingesetzt. Neu gezeichnet wird bei jeder
   Eingabe und beim Ereignis "bit-sprache" (sprachen.js).
=========================================================================== */
(function () {
  'use strict';
  const H = window.bitHoai;
  const box = document.getElementById('honorarrechner');
  if (!H || !box) return;

  const wort = (t) => (window.bitHud ? window.bitHud(t) : t);
  const sprache = () => (window.bitSprache ? window.bitSprache.aktuell() : 'de');
  const gebiet = () => ({ en: 'en-GB', ar: 'ar-u-nu-latn' }[sprache()] || 'de-DE');
  const euro = (x, stellen = 0) => new Intl.NumberFormat(gebiet(), { style: 'currency', currency: 'EUR', minimumFractionDigits: stellen, maximumFractionDigits: stellen }).format(x);
  const zahl = (x, stellen = 0) => new Intl.NumberFormat(gebiet(), { minimumFractionDigits: stellen, maximumFractionDigits: stellen }).format(x);
  /** Fills {name} placeholders of a translated pattern. */
  const muster = (t, werte) => wort(t).replace(/\{(\w+)\}/g, (_, k) => (k in werte ? werte[k] : '{' + k + '}'));
  const el = (tag, attr = {}, kinder = []) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attr)) { if (k === 'text') e.textContent = v; else e.setAttribute(k, v); }
    for (const k of kinder) e.append(k);
    return e;
  };
  /** Number from a number input ("" -> NaN); a comma is read as decimal point. */
  const lies = (id) => {
    const roh = String((document.getElementById(id) || {}).value || '').trim().replace(',', '.');
    return roh ? Number(roh) : NaN;
  };

  const wahl = { bild: 'gebaeude', modus: 'direkt', zone: 'III' };
  /* Default: all nine work stages commissioned. */
  let phasen = Array(9).fill(true);

  box.querySelectorAll('.honorar__wahl').forEach((gruppe) => {
    const feld = gruppe.dataset.hfeld;
    gruppe.addEventListener('click', (ev) => {
      const b = ev.target.closest('button[data-wert]'); if (!b) return;
      wahl[feld] = b.dataset.wert;
      gruppe.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      if (feld === 'modus') box.querySelectorAll('[data-hmodus]').forEach((l) => l.classList.toggle('verborgen', l.dataset.hmodus !== wahl.modus));
      if (feld === 'bild') { zeichneObjekte(); zeichnePhasen(); }
      rechnen();
    });
  });
  ['h-kosten', 'h-bgf', 'h-kennwert', 'h-quelle', 'h-satz'].forEach((id) => {
    const f = document.getElementById(id);
    if (f) f.addEventListener('input', rechnen);
  });

  function zeichneObjekte() {
    const ziel = document.getElementById('h-objekte');
    if (!ziel) return;
    const tbody = el('tbody');
    let gruppe = null;
    for (const [g, name, zonen] of H.OBJEKTE[wahl.bild]) {
      if (g && g !== gruppe) { gruppe = g; tbody.append(el('tr', {}, [el('th', { colspan: '2', text: g })])); }
      tbody.append(el('tr', {}, [el('td', { text: name }), el('td', { text: zonen })]));
    }
    ziel.replaceChildren(el('table', {}, [tbody]),
      el('p', { class: 'honorar__klein' }, [el('a', { href: 'https://www.gesetze-im-internet.de/hoai_2013/anlage_10.html', style: 'color:var(--accent)', text: wort('Vollständige Anlage 10 auf gesetze-im-internet.de') })]));
  }

  function zeichnePhasen() {
    const ziel = document.getElementById('h-lph');
    if (!ziel) return;
    const prozente = H.LPH[wahl.bild];
    ziel.replaceChildren(...prozente.map((p, i) => {
      const haken = el('input', { type: 'checkbox', 'data-lph': String(i + 1) });
      haken.checked = phasen[i];
      haken.addEventListener('change', () => { phasen[i] = haken.checked; rechnen(); });
      return el('label', {}, [haken, el('span', { text: `${wort('LPH')} ${i + 1} · ${wort(H.LPH_NAMEN[i])} (${zahl(p)} %)` })]);
    }));
  }

  function rechnen() {
    const ziel = document.getElementById('h-ergebnis');
    const satz = Number(document.getElementById('h-satz').value) || 0;
    document.getElementById('h-satz-wert').textContent = satz === 0 ? wort('Basissatz')
      : satz === 100 ? wort('Oberer Honorarsatz') : muster('{p} % zwischen Basissatz und oberem Satz', { p: zahl(satz) });

    /* 1. chargeable costs — given, or an estimate BGF × benchmark (never a built-in benchmark) */
    let kosten, kostenZeile;
    if (wahl.modus === 'direkt') {
      kosten = lies('h-kosten');
      kostenZeile = muster('Anrechenbare Kosten: {k} (Ihre Eingabe).', { k: euro(kosten || 0) });
    } else {
      const bgf = lies('h-bgf'), kw = lies('h-kennwert');
      const quelle = String(document.getElementById('h-quelle').value || '').trim();
      if (!(bgf > 0) || !(kw > 0)) {
        ziel.replaceChildren(el('p', { class: 'honorar__klein', text: wort('Für die Schätzung bitte BGF und einen Kostenkennwert eintragen — der Rechner gibt bewusst keinen Kennwert vor.') }));
        return;
      }
      kosten = H.rundeCent(bgf * kw);
      kostenZeile = muster('Schätzung: {b} m² BGF × {w} €/m² = {k} — Quelle des Kennwerts: {q}. Eine Schätzung, keine Kostenberechnung nach DIN 276.',
        { b: zahl(bgf), w: zahl(kw), k: euro(kosten), q: quelle || wort('nicht angegeben') });
    }
    if (!(kosten > 0)) { ziel.replaceChildren(el('p', { class: 'honorar__klein', text: wort('Bitte anrechenbare Kosten eintragen.') })); return; }

    const r = H.rechne({ kostenEuro: kosten, zone: wahl.zone, positionProzent: satz, leistungsbild: wahl.bild, phasen });
    if (r.summe === null) {
      ziel.replaceChildren(el('p', { class: 'honorar__summe', text: wort('Außerhalb der Honorartafel') }),
        el('p', { text: muster('Die Tafel des § 35 reicht von {a} bis {b} anrechenbarer Kosten. Darunter und darüber ist das Honorar frei vereinbar — hier wird nichts hochgerechnet.', { a: euro(H.TAFEL[0][0]), b: euro(H.TAFEL[H.TAFEL.length - 1][0]) }) }),
        el('p', { class: 'honorar__klein', text: kostenZeile }));
      return;
    }

    const t = r.tafel;
    const kopf = el('div', {}, [
      el('p', { class: 'finder__auge', text: muster('Honorar der gewählten Leistungsphasen ({p} %)', { p: zahl(r.prozentSumme) }) }),
      el('p', { class: 'honorar__summe', text: euro(r.summe.betrag) }),
      el('p', { class: 'honorar__klein', text: muster('Spanne Basissatz bis oberer Satz: {a} – {b}', { a: euro(r.summe.basis), b: euro(r.summe.oben) }) }),
    ]);

    const tabelle = el('table', { class: 'honorar__tabelle' }, [
      el('thead', {}, [el('tr', {}, [
        el('th', { text: wort('Leistungsphase') }), el('th', { text: wort('Anteil') }),
        el('th', { text: wort('Basissatz') }), el('th', { text: wort('oberer Satz') }), el('th', { text: wort('gewählt') })])]),
      el('tbody', {}, r.phasen.map((p) => el('tr', p.beauftragt ? {} : { class: 'aus' }, [
        el('td', { text: `${p.nr} · ${wort(p.name)}` }), el('td', { text: zahl(p.prozent) + ' %' }),
        el('td', { text: euro(p.basis, 2) }), el('td', { text: euro(p.oben, 2) }), el('td', { text: p.beauftragt ? euro(p.betrag, 2) : '—' })]))),
      el('tfoot', {}, [el('tr', {}, [
        el('td', { text: wort('Summe') }), el('td', { text: zahl(r.prozentSumme) + ' %' }),
        el('td', { text: euro(r.summe.basis, 2) }), el('td', { text: euro(r.summe.oben, 2) }), el('td', { text: euro(r.summe.betrag, 2) })])]),
    ]);

    const zu = t.zeileUnten, zo = t.zeileOben;
    const herleitung = el('details', { class: 'honorar__herleitung', open: '' }, [
      el('summary', {}, [el('span', { text: wort('Herleitung') })]),
      el('ol', {}, [
        el('li', { text: kostenZeile }),
        el('li', { text: muster('Honorartafel § 35 Abs. 1, Honorarzone {z}: bei {k1} anrechenbaren Kosten {a1} – {b1}, bei {k2} {a2} – {b2}.',
          { z: wahl.zone, k1: euro(zu[0]), a1: euro(zu[1]), b1: euro(zu[2]), k2: euro(zo[0]), a2: euro(zo[1]), b2: euro(zo[2]) }) }),
        el('li', { text: muster('Lineare Interpolation zwischen den beiden Tafelzeilen (§ 13 Abs. 1): Anteil {f} → Basissatz {a}, oberer Satz {b}.',
          { f: zahl(t.anteil, 3), a: euro(t.basis, 2), b: euro(t.oben, 2) }) }),
        el('li', { text: muster('Honorar für alle Leistungsphasen = Basissatz + {p} % × (oberer Satz − Basissatz) = {h}.', { p: zahl(satz), h: euro(t.honorar, 2) }) }),
        el('li', { text: muster('Je Leistungsphase: Honorar × Anteil nach § 34 Abs. 3 ({l}), auf Cent gerundet; Summe der gewählten Phasen.',
          { l: wort(wahl.bild === 'innenraeume' ? 'Innenräume' : 'Gebäude') }) }),
      ]),
    ]);
    ziel.replaceChildren(kopf, el('div', { class: 'honorar__tabelle-rahmen' }, [tabelle]), herleitung);
  }

  function alles() { zeichneObjekte(); zeichnePhasen(); rechnen(); }
  document.addEventListener('bit-sprache', alles);
  alles();
  /* For the smoke test: the same numbers the page shows. */
  window.bitHonorar = { wahl, phasen: () => phasen.slice(), rechnen };
})();
