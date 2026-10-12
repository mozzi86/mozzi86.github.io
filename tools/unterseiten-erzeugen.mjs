#!/usr/bin/env node
// Builds the topic pages (69-10) from the home page and writes sitemap.xml.
//
// Why: the home page is one long story that competes for every topic at once,
// and its navigation is made of anchors — a mail could not link to "the BIM
// coordination offer", only to the whole page. Each topic gets its own address,
// title, description, canonical and hreflang set. The pages are CUT OUT of
// index.html, not copied by hand: same source, same result, repeatable.
//
// In:  index.html, tools/seiten.mjs (page list)
// Out: <ordner>/index.html for every topic page, sitemap.xml; then runs
//      tools/sprachkopien-erzeugen.mjs, which writes the en/ and ar/ copies of
//      ALL pages (home page included).
//
// What a topic page contains: <head> of the home page (title, description,
// canonical, og/twitter, hreflang replaced; structured data and the three.js
// import map dropped), header, a page heading, the chosen sections, the contact
// section as call to action (enquiry builder with the page as source tag),
// footer with a link to the legal notice on the home page, the page script and
// sprachen.js. NOT included: the 3D stage and its module script, the legal text
// itself (one place only: /#impressum).
//
// Paths: resources become root-absolute (/assets/…), links to sections that are
// not on the topic page become "../#id" — relative on purpose, so the same link
// lands on /en/#id inside the English copy.
//
// Deterministic: lastmod in the sitemap is the date of the last commit that
// touched index.html, not the date of the run.
//
// Call: node tools/unterseiten-erzeugen.mjs   (needs playwright like sprachkopien-erzeugen.mjs)

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { SEITEN, SPRACHEN, adresse } from './seiten.mjs';

const WURZEL = path.resolve(import.meta.dirname, '..');
const quelle = fs.readFileSync(path.join(WURZEL, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

/** Escapes text for an HTML attribute or text node. */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Cuts the text from the first occurrence of `anfang` up to and including `ende`.
 * @param {string} text @param {string} anfang @param {string} ende
 * @returns {string}
 */
function schneide(text, anfang, ende) {
  const a = text.indexOf(anfang);
  if (a < 0) throw new Error(`not found: ${anfang.slice(0, 60)}`);
  const e = text.indexOf(ende, a);
  if (e < 0) throw new Error(`end not found after: ${anfang.slice(0, 60)}`);
  return text.slice(a, e + ende.length);
}

/** One <section … id="id">…</section> of the home page (sections are not nested). */
function abschnitt(id) {
  const m = quelle.match(new RegExp(`\\n  <section[^>]*\\sid="${id}"[^>]*>`));
  if (!m) throw new Error(`section #${id} not found`);
  const a = m.index + 1;
  const e = quelle.indexOf('\n  </section>', a);
  return quelle.slice(a, e + '\n  </section>'.length);
}

/** Relative resource paths of the home page -> root-absolute. */
function absolut(html) {
  return html
    .replace(/(\s(?:href|src|content)=")(?!https?:|\/|#|data:|mailto:|\.\.\/)((?:assets|downloads)\/)/g, '$1/$2')
    .replace(/url\((['"]?)(?!https?:|\/|data:)(assets\/)/g, 'url($1/$2')
    .replace(/\ssrcset="([^"]*)"/g, (_t, wert) =>
      ' srcset="' + wert.replace(/(^|,\s*)(?!https?:|\/|data:)(assets\/)/g, '$1/$2') + '"');
}

/** <head> of a topic page. */
function kopf(seite) {
  let k = schneide(quelle, '<!DOCTYPE html>', '</head>');
  const titel = esc(seite.titel);
  const besch = esc(seite.beschreibung.de);
  const ersetze = (re, neu) => {
    if (!re.test(k)) throw new Error('head: ' + re);
    k = k.replace(re, neu);
  };
  ersetze(/<title>[^<]*<\/title>/, `<title>${titel}</title>`);
  ersetze(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${besch}">`);
  ersetze(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${adresse(seite, 'de')}">`);
  ersetze(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${adresse(seite, 'de')}">`);
  ersetze(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${titel}">`);
  ersetze(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${besch}">`);
  ersetze(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${titel}">`);
  ersetze(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${besch}">`);
  // hreflang set of THIS page; the language copies keep it unchanged.
  const alt = SPRACHEN.map((s) => `<link rel="alternate" hreflang="${s.code}" href="${adresse(seite, s.code)}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${adresse(seite, 'de')}">`).join('\n');
  ersetze(/<!-- Sprachfassungen:[\s\S]*?hreflang="x-default"[^>]*>/,
    `<!-- Generated by tools/unterseiten-erzeugen.mjs from index.html (69-10) — edit the
     home page or tools/seiten.mjs, not this file. -->\n${alt}`);
  // Structured data describes the practice and the software — it belongs to the home page.
  // (a comment directly in front of a JSON-LD block explains that block — it goes too;
  // the pattern must not run across the end of another comment)
  k = k.replace(/\n<!--(?:(?!-->)[\s\S])*-->\n(?=<script type="application\/ld\+json">)/g, '\n');
  k = k.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, '');
  // No 3D stage on topic pages: no import map and no note about the three.js build.
  k = k.replace(/<script type="importmap">[\s\S]*?<\/script>\n?/, '');
  k = k.replace(/<!-- three\.module\.min\.js[\s\S]*?-->\n?/, '');
  return absolut(k);
}

/** Body of a topic page. */
function koerper(seite) {
  const logo = schneide(quelle, '<svg width="0" height="0"', '</svg>');
  let kopfzeile = schneide(quelle, '<header class="kopf">', '</header>');
  kopfzeile = kopfzeile.replace('<a class="marke" href="#top"', '<a class="marke" href="../"');
  const seitenkopf = `  <!-- Page heading of the topic page (69-10). -->
  <section class="abschnitt seitenkopf" id="seitenkopf">
    <div class="mitte">
      <p class="auge">BIT-ATELIER</p>
      <h1>${esc(seite.h1)}</h1>
      <p class="unter">${esc(seite.intro)}</p>
    </div>
  </section>`;
  // A topic page shows sections cut from the home page, or (69-33) its own
  // content fragment tools/seiten/<ordner>.html when the home page has no such section.
  const teile = seite.inhalt
    ? [fs.readFileSync(path.join(WURZEL, 'tools/seiten', seite.ordner + '.html'), 'utf8').replace(/\r\n/g, '\n').trimEnd()]
    : seite.abschnitte.map(abschnitt);
  // The "more on …" links of the home page point to the topic pages themselves.
  const inhalt = teile.join('\n\n').replace(/\n\s*<p class="mehr" data-mehr[^>]*>[\s\S]*?<\/p>/g, '');
  let kontakt = abschnitt('kontakt');
  kontakt = kontakt.replace('<input type="hidden" id="a-herkunft" value="">',
    `<input type="hidden" id="a-herkunft" value="${esc(seite.herkunft)}">`);
  if (!kontakt.includes(`value="${esc(seite.herkunft)}"`)) throw new Error('a-herkunft not set');
  let fuss = schneide(quelle, '<footer class="fuss">', '</footer>');
  fuss = fuss.replace('<button type="button" onclick="toggleImpressum()">Impressum &amp; Datenschutz</button>',
    '<a href="../#impressum">Impressum &amp; Datenschutz</a>');
  if (!fuss.includes('../#impressum')) throw new Error('footer: legal notice link not set');
  const skript = schneide(quelle, '<script>\n// Jahr im Footer', '</script>');

  let html = `<body>\n\n${logo}\n\n${kopfzeile}\n\n<main id="top">\n\n${seitenkopf}\n\n${inhalt}\n\n${kontakt}\n\n  ${fuss}\n\n</main>\n\n${skript}\n<script src="/assets/js/sprachen.js" defer></script>\n</body>\n</html>\n`;

  // Anchors to sections that are not on this page go to the home page.
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  html = html.replace(/href="#([^"]*)"/g, (t, id) => (id && !ids.has(id) ? `href="../#${id}"` : t));
  return absolut(html);
}

// ---- topic pages -----------------------------------------------------------------
for (const seite of SEITEN.filter((s) => s.ordner)) {
  const html = kopf(seite) + '\n' + koerper(seite);
  const ziel = path.join(WURZEL, seite.ordner);
  fs.mkdirSync(ziel, { recursive: true });
  fs.writeFileSync(path.join(ziel, 'index.html'), html, 'utf8');
  console.log(`  ${(Buffer.byteLength(html) / 1024).toFixed(0).padStart(5)} KB  ${seite.ordner}/index.html`);
}

// ---- sitemap ---------------------------------------------------------------------
let lastmod;
try {
  lastmod = execFileSync('git', ['log', '-1', '--format=%cs', '--', 'index.html'], { cwd: WURZEL, encoding: 'utf8' }).trim();
} catch { /* no git: fall back below */ }
if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod || '')) throw new Error('lastmod: no commit date for index.html');
const urls = [];
for (const seite of SEITEN) {
  for (const s of SPRACHEN) {
    const alt = SPRACHEN.map((x) => `    <xhtml:link rel="alternate" hreflang="${x.code}" href="${adresse(seite, x.code)}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${adresse(seite, 'de')}"/>`).join('\n');
    const prio = s.code === 'de' ? seite.prioritaet : Math.round(seite.prioritaet * 0.8 * 10) / 10;
    urls.push(`  <url>\n    <loc>${adresse(seite, s.code)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${prio.toFixed(1)}</priority>\n${alt}\n  </url>`);
  }
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by tools/unterseiten-erzeugen.mjs from tools/seiten.mjs (69-10). -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(WURZEL, 'sitemap.xml'), sitemap, 'utf8');
console.log(`  sitemap.xml: ${urls.length} addresses, lastmod ${lastmod}`);

// ---- language copies of all pages --------------------------------------------------
const lauf = spawnSync(process.execPath, [path.join(WURZEL, 'tools/sprachkopien-erzeugen.mjs')], { stdio: 'inherit' });
if (lauf.status !== 0) { console.error('sprachkopien-erzeugen.mjs failed'); process.exit(lauf.status || 1); }
console.log('\nUNTERSEITEN_OK');
