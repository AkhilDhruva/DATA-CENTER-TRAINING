/* Provenance / attribution-integrity tests.
     APP_URL=http://127.0.0.1:8123/index.html node tests/provenance.js
   Verifies that the authorship notices required by LICENSE are present, are
   restored if tampered with, are composited into the rendered 3D frame, and
   that the production Content-Security-Policy does not break the application. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = process.env.APP_URL || 'http://127.0.0.1:8123/index.html';
const THREE_LOCAL = process.env.THREE_LOCAL;
const GLTF_LOCAL = process.env.GLTF_LOCAL;
const AUTHOR = 'Akhil Gaddam';
const REPO_ROOT = path.join(__dirname, '..');

let passed = 0, failed = 0;
function check(name, cond) {
  if (cond) { passed++; console.log('  PASS  ' + name); }
  else { failed++; console.log('  FAIL  ' + name); }
}

async function boot(browser, extraHeaders) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, reducedMotion: 'reduce' });
  if (THREE_LOCAL) await page.route('**/three.min.js', (r) => r.fulfill({
    contentType: 'application/javascript', body: fs.readFileSync(THREE_LOCAL, 'utf8') }));
  if (GLTF_LOCAL) await page.route('**/GLTFLoader.js', (r) => r.fulfill({
    contentType: 'application/javascript', body: fs.readFileSync(GLTF_LOCAL, 'utf8') }));
  if (extraHeaders) {
    // replay the production headers from vercel.json so CSP is actually exercised
    await page.route('**/index.html', async (route) => {
      const res = await route.fetch();
      await route.fulfill({ response: res, headers: { ...res.headers(), ...extraHeaders } });
    });
  }
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) page.errors.push('console: ' + m.text());
  });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(3500);
  return page;
}

(async () => {
  const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });

  console.log('\n== Repository notices ==');
  const lic = fs.readFileSync(path.join(REPO_ROOT, 'LICENSE'), 'utf8');
  check('LICENSE names the copyright holder', lic.includes('Copyright (c) 2026 ' + AUTHOR));
  check('LICENSE reserves all rights', /ALL RIGHTS RESERVED/i.test(lic));
  check('LICENSE covers attribution integrity', lic.includes('1202'));
  check('humans.txt names the author', fs.readFileSync(path.join(REPO_ROOT, 'humans.txt'), 'utf8').includes(AUTHOR));
  check('README states ownership', fs.readFileSync(path.join(REPO_ROOT, 'README.md'), 'utf8').includes('Created and owned by'));
  const html = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  check('index.html carries a source copyright header', html.slice(0, 2000).includes('Copyright (c) 2026 ' + AUTHOR));
  const mirror = fs.readFileSync(path.join(REPO_ROOT, 'DC_42U-Rack_Interactive-3D.html'), 'utf8');
  check('mirrored HTML copy is byte-identical', mirror === html);

  console.log('\n== Document metadata ==');
  let page = await boot(browser);
  const meta = await page.evaluate(() => ({
    author: document.querySelector('meta[name="author"]').content,
    copyright: document.querySelector('meta[name="copyright"]').content,
    rightsHolder: document.querySelector('meta[name="dcterms.rightsHolder"]').content,
    ld: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
    rootAuthor: document.documentElement.getAttribute('data-author'),
    rootBuilt: document.documentElement.getAttribute('data-built'),
    licenseLink: !!document.querySelector('link[rel="license"]'),
    prov: window.__PROVENANCE,
  }));
  check('meta author', meta.author === AUTHOR);
  check('meta copyright', meta.copyright.includes(AUTHOR));
  check('Dublin Core rights holder', meta.rightsHolder === AUTHOR);
  check('structured data author/creator/copyrightHolder', meta.ld.author.name === AUTHOR &&
    meta.ld.creator.name === AUTHOR && meta.ld.copyrightHolder.name === AUTHOR);
  check('structured data carries creation date', meta.ld.dateCreated === '2026-07-04');
  check('license link present', meta.licenseLink);
  check('document element stamped with author', meta.rootAuthor === AUTHOR);
  check('build timestamp exposed', /^\d{4}-\d{2}-\d{2}T/.test(meta.rootBuilt));
  check('window.__PROVENANCE published', meta.prov && meta.prov.author === AUTHOR);
  const frozen = await page.evaluate(() => {
    try { window.__PROVENANCE.author = 'someone else'; } catch (e) {}
    return window.__PROVENANCE.author;
  });
  check('provenance object is immutable', frozen === AUTHOR);

  console.log('\n== On-screen mark ==');
  const mark = await page.evaluate(() => {
    const el = document.getElementById('owner');
    return { text: el.textContent, visible: el.getBoundingClientRect().width > 0,
             byline: document.querySelector('#brand .byline').textContent };
  });
  check('authorship mark visible in viewport', mark.visible && mark.text.includes(AUTHOR));
  check('header byline names the owner', mark.byline.includes(AUTHOR));

  // tamper: delete the node, it must come back
  await page.evaluate(() => document.getElementById('owner').remove());
  await page.waitForFunction(() => !!document.getElementById('owner'), null, { timeout: 8000 }).catch(() => {});
  check('mark is restored after removal', await page.evaluate(() => {
    const el = document.getElementById('owner');
    return !!el && el.textContent.includes('Akhil Gaddam');
  }));

  // tamper: hide it, it must become visible again
  await page.evaluate(() => { document.getElementById('owner').style.display = 'none'; });
  await page.waitForTimeout(2600);
  check('mark is restored after being hidden', await page.evaluate(() =>
    getComputedStyle(document.getElementById('owner')).display !== 'none'));

  // restored mark stays interactive
  await page.click('#ownerInfo');
  await page.waitForTimeout(500);
  const dlg = await page.evaluate(() => {
    const d = document.getElementById('own');
    return { open: d.classList.contains('open'), txt: d.textContent,
             built: document.getElementById('ownBuild').textContent,
             opened: document.getElementById('ownOpened').textContent };
  });
  check('ownership dialog opens from the restored mark', dlg.open);
  check('dialog states the owner and licence', dlg.txt.includes(AUTHOR) && /All rights reserved/i.test(dlg.txt));
  check('dialog shows the build timestamp', dlg.built.length > 4 && dlg.built !== '—');
  check('dialog shows the session-open timestamp', dlg.opened.length > 4 && dlg.opened !== '—');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const afterEsc = await page.evaluate(() => ({
    closed: !document.getElementById('own').classList.contains('open'),
    stillRack: document.getElementById('cardName').textContent }));
  check('Escape closes the dialog without disturbing the scene', afterEsc.closed && /42U Data Center Rack/.test(afterEsc.stillRack));

  console.log('\n== Rendered-frame watermark ==');
  // The WebGL context runs without preserveDrawingBuffer (which also defeats
  // canvas.toDataURL() scraping), so the frame is sampled via a real screenshot,
  // decoded back inside the page. Panels are collapsed first so nothing occludes
  // the bottom-right corner where the mark is composited.
  await page.evaluate(() => {
    document.getElementById('cardMin').click();
    if (document.getElementById('sidebar').classList.contains('open')) document.getElementById('menuBtn').click();
  });
  await page.waitForTimeout(900);
  const vp = page.viewportSize();
  const clip = { x: vp.width - 330, y: vp.height - 74, width: 320, height: 64 };
  const shotB64 = (await page.screenshot({ clip })).toString('base64');
  const ink = await page.evaluate(async (b64) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + b64; });
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    let bright = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i] > 80 && d[i + 1] > 85 && d[i + 2] > 90) bright++;
    return { bright, total: c.width * c.height };
  }, shotB64);
  check('watermark is composited into the rendered frame', ink.bright > 60);
  await page.evaluate(() => document.getElementById('cardMin').click());

  check('no console errors introduced', page.errors.length === 0);
  if (page.errors.length) console.log(page.errors);
  await page.close();

  console.log('\n== Production security headers ==');
  const vercel = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'vercel.json'), 'utf8'));
  const hdrs = {};
  vercel.headers[0].headers.forEach((h) => { hdrs[h.key] = h.value; });
  check('CSP restricts frame-ancestors (anti-embedding)', /frame-ancestors 'self'/.test(hdrs['Content-Security-Policy']));
  check('X-Frame-Options set', hdrs['X-Frame-Options'] === 'SAMEORIGIN');
  check('nosniff set', hdrs['X-Content-Type-Options'] === 'nosniff');
  check('HSTS set', /max-age=\d+/.test(hdrs['Strict-Transport-Security']));
  check('author asserted in HTTP headers', hdrs['X-Author'] === AUTHOR);
  check('copyright asserted in HTTP headers', hdrs['X-Copyright'].includes(AUTHOR));

  // boot the app under the real production headers — CSP must not break it
  page = await boot(browser, {
    'content-security-policy': hdrs['Content-Security-Policy'],
    'x-frame-options': hdrs['X-Frame-Options'],
    'x-content-type-options': hdrs['X-Content-Type-Options'],
  });
  const underCsp = await page.evaluate(() => ({
    booted: !!document.querySelector('#app canvas'),
    rows: document.querySelectorAll('#rackList li').length,
    errShown: getComputedStyle(document.getElementById('err')).display !== 'none',
    mark: !!document.getElementById('owner'),
  }));
  check('app boots under the production CSP', underCsp.booted && !underCsp.errShown);
  check('equipment explorer populated under CSP', underCsp.rows >= 12);
  check('authorship mark present under CSP', underCsp.mark);
  check('no CSP violations logged', page.errors.filter((e) => /Content Security Policy/i.test(e)).length === 0);
  if (page.errors.length) console.log(page.errors);
  await page.close();

  await browser.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
