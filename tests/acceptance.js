/* Acceptance tests for the rack-trainer UI (see ACCEPTANCE_CRITERIA in the
   claude-code-ui-handoff package). Run with:
     APP_URL=http://127.0.0.1:8123/index.html node tests/acceptance.js
   Requires: playwright (npm i -D playwright) and a served copy of the app.
   If the three.js CDN is unreachable, set THREE_LOCAL to a local
   three.min.js (and GLTF_LOCAL to GLTFLoader.js) to have the test serve it. */
const { chromium } = require('playwright');
const fs = require('fs');

const URL = process.env.APP_URL || 'http://127.0.0.1:8123/index.html';
const THREE_LOCAL = process.env.THREE_LOCAL;
const GLTF_LOCAL = process.env.GLTF_LOCAL;

const HOOK_ANCHOR = 'window.__audit=function(){';
const HOOK =
  'window.__t9={' +
  'uids:function(){return components.map(function(c){return c.userData.def.uid});},' +
  'open:function(uid){var c=components.find(function(c2){return c2.userData.def.uid===uid});if(c)openComponent(c);},' +
  't:function(uid){var c=components.find(function(c2){return c2.userData.def.uid===uid});return c?c._t:-1;},' +
  'allT:function(){return components.map(function(c){return c._t});},' +
  'state:function(){return {active:active?active.userData.def.uid:null,step:curStep,tab:curTab};}' +
  '};' + HOOK_ANCHOR;

let passed = 0, failed = 0;
function check(name, cond) {
  if (cond) { passed++; console.log('  PASS  ' + name); }
  else { failed++; console.log('  FAIL  ' + name); }
}

async function boot(browser, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  if (THREE_LOCAL) await page.route('**/three.min.js', (r) => r.fulfill({
    contentType: 'application/javascript', body: fs.readFileSync(THREE_LOCAL, 'utf8') }));
  if (GLTF_LOCAL) await page.route('**/GLTFLoader.js', (r) => r.fulfill({
    contentType: 'application/javascript', body: fs.readFileSync(GLTF_LOCAL, 'utf8') }));
  await page.route('**/index.html', async (route) => {
    const res = await route.fetch();
    await route.fulfill({ response: res, body: (await res.text()).replace(HOOK_ANCHOR, HOOK) });
  });
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('console', (m) => {
    // GLB assets are optional (models/*.glb 404 by design); everything else is a defect
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) page.errors.push('console: ' + m.text());
  });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForFunction('!!window.__t9', null, { timeout: 20000 });
  await page.waitForTimeout(2500);
  return page;
}

const st = (p) => p.evaluate(() => window.__t9.state());
const settle = (p, ms) => p.waitForTimeout(ms || 1200);
async function assertRackOverview(p, label) {
  const s = await st(p);
  const allT = await p.evaluate(() => window.__t9.allT());
  const name = await p.evaluate(() => document.getElementById('cardName').textContent);
  check(label + ': no geometry pulled out', allT.every((t) => t < 0.01));
  check(label + ': no active selection', s.active === null);
  check(label + ': step is 1', s.step === 1);
  check(label + ': tab is Overview', s.tab === 'overview');
  check(label + ': inspector shows rack', /42U Data Center Rack/.test(name));
}

(async () => {
  const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });

  console.log('\n== State correctness (1536x900) ==');
  let page = await boot(browser, 1536, 900);

  const uids = await page.evaluate(() => window.__t9.uids());
  check('every device has a stable unique ID', new Set(uids).size === uids.length && uids.length === 12);

  // canonical level 1: rack-overview on load
  await assertRackOverview(page, 'load');

  // explorer rows: one per instance, independently selectable
  for (const [uid, expect] of [['patch-u41', 'Patch Panel'], ['server-u36', '2U Compute Server'],
      ['server-u24', '1U Server'], ['storage-u28', '4U Storage Array'], ['ups-u6', '3U UPS / Battery (BBU)']]) {
    await page.click(`#rackList li[data-uid="${uid}"]`);
    await settle(page);
    const name = await page.evaluate(() => document.getElementById('cardName').textContent);
    const s = await st(page);
    check(`row ${uid} selects "${expect}"`, name === expect && s.active === uid);
  }
  const rowActive = await page.evaluate(() => document.querySelector('#rackList li.active').dataset.uid);
  check('scene selection marks the matching explorer row', rowActive === 'ups-u6');

  // canonical levels 2-4: equipment-selected -> chassis-opened -> internal-component-focused
  await page.evaluate(() => window.__t9.open('switch-u42'));
  await page.waitForFunction(() => window.__t9.t('switch-u42') >= 1, null, { timeout: 20000 });
  await settle(page);
  let s = await st(page);
  check('chassis-opened: step 4, internals tab', s.step === 4 && s.tab === 'internals');
  await page.click('#cardBody [data-peri]');
  await settle(page);
  s = await st(page);
  const crumbTxt = await page.evaluate(() => document.getElementById('crumb').textContent);
  check('inspect opens the part Overview immediately', s.tab === 'overview');
  check('breadcrumb shows Rack › chassis › part', /Rack›Top-of-RackSwitch›SwitchASIC/.test(crumbTxt.replace(/\s+/g, '')));
  // back to parent chassis without losing its state
  await page.click('#crumb button[data-lvl="chassis"]');
  await settle(page);
  s = await st(page);
  const tSwitch = await page.evaluate(() => window.__t9.t('switch-u42'));
  check('back returns to chassis, geometry intact', s.tab === 'internals' && tSwitch >= 1 && s.active === 'switch-u42');
  // return to rack from the breadcrumb
  await page.click('#crumb button[data-lvl="rack"]');
  await page.waitForFunction(() => window.__t9.allT().every((t) => t < 0.01), null, { timeout: 20000 });
  await assertRackOverview(page, 'return-to-rack');

  // reset after each dissection stage, and reset idempotency
  for (const stage of ['overview', 'selected', 'opened', 'internal']) {
    if (stage === 'selected') { await page.click('#rackList li[data-uid="patch-u41"]'); await settle(page); }
    if (stage === 'opened') { await page.evaluate(() => window.__t9.open('gpu-u33'));
      await page.waitForFunction(() => window.__t9.t('gpu-u33') >= 1, null, { timeout: 20000 }); }
    if (stage === 'internal') { await page.evaluate(() => window.__t9.open('ups-u6'));
      await page.waitForFunction(() => window.__t9.t('ups-u6') >= 1, null, { timeout: 20000 });
      await page.click('#cardBody [data-peri]'); await settle(page); }
    await page.click('#btnReset');
    await page.waitForFunction(() => window.__t9.allT().every((t) => t < 0.01), null, { timeout: 20000 });
    await settle(page);
    await assertRackOverview(page, 'reset after ' + stage);
  }
  await page.click('#btnReset'); await settle(page);
  await assertRackOverview(page, 'reset twice (idempotent)');

  // search
  await page.fill('#expSearch', 'u25');
  await page.dispatchEvent('#expSearch', 'input');
  const vis = await page.evaluate(() => [...document.querySelectorAll('#rackList li:not(.hiddenrow)')].map((li) => li.dataset.uid || 'blank'));
  // U25 matches the 1U server at U25 and the storage array spanning U25–28
  check('search "u25" filters to matching rows only', vis.includes('server-u25') && vis.includes('storage-u28') && !vis.includes('switch-u42') && vis.length === 2);
  await page.fill('#expSearch', '');
  await page.dispatchEvent('#expSearch', 'input');

  console.log('\n== Desktop 1536x900 layout ==');
  const boxes = await page.evaluate(() => {
    const b = (id) => { const r = document.getElementById(id).getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width }; };
    return { sidebar: b('sidebar'), card: b('card'), controls: b('controls'), bottom: b('bottombar'),
      sidebarOpen: document.getElementById('sidebar').classList.contains('open') };
  });
  check('explorer open by default on desktop', boxes.sidebarOpen);
  check('explorer, workspace, inspector do not overlap', boxes.sidebar.r <= boxes.controls.l && boxes.controls.r <= boxes.card.l + 1);
  check('bottom metrics visible', boxes.bottom.w > 0 && boxes.bottom.b <= 900);
  for (const tab of ['overview', 'specs', 'internals', 'vendors']) {
    await page.click(`.tab[data-tab="${tab}"]`);
    const body = await page.evaluate(() => document.getElementById('cardBody').textContent.trim().length);
    check(`tab "${tab}" renders content`, body > 10);
  }
  // explorer and inspector collapse independently
  await page.click('#menuBtn');
  await page.click('#cardMin');
  const collapsed = await page.evaluate(() => ({
    side: !document.getElementById('sidebar').classList.contains('open'),
    card: document.getElementById('card').classList.contains('min') }));
  check('explorer and inspector collapse independently', collapsed.side && collapsed.card);
  await page.click('#cardMin'); await page.click('#menuBtn');
  check('desktop: no unexpected console errors', page.errors.length === 0);
  if (page.errors.length) console.log(page.errors);
  await page.close();

  console.log('\n== Compact 1024x768 ==');
  page = await boot(browser, 1024, 768);
  const c1 = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    actionsR: document.getElementById('topActions').getBoundingClientRect().right,
    metricsVisible: getComputedStyle(document.getElementById('bottombar')).display !== 'none',
    cardH: document.getElementById('card').getBoundingClientRect().height, vh: innerHeight }));
  check('no horizontal overflow', c1.scrollW <= 1024);
  check('header actions visible', c1.actionsR <= 1024);
  check('metrics remain available', c1.metricsVisible);
  check('inspector does not cover the working area', c1.cardH < c1.vh * 0.5);
  await page.click('#menuBtn');
  const drawer1024 = await page.evaluate(() => getComputedStyle(document.getElementById('sidebar')).display);
  check('rack menu functional', drawer1024 === 'block');
  check('compact: no unexpected console errors', page.errors.length === 0);
  await page.close();

  console.log('\n== Mobile 390x844 ==');
  page = await boot(browser, 390, 844);
  const m1 = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    actionsR: document.getElementById('topActions').getBoundingClientRect().right,
    ctlNames: [...document.querySelectorAll('#controls .ctl')].every((el) => (el.getAttribute('aria-label') || '').length > 2) }));
  check('document width ≤ 390', m1.scrollW <= 390);
  check('header actions reachable', m1.actionsR <= 390);
  check('view controls have accessible names', m1.ctlNames);
  await page.click('#menuBtn');
  let drawer = await page.evaluate(() => document.getElementById('sidebar').classList.contains('open'));
  check('drawer opens', drawer);
  await page.click('#menuBtn');
  drawer = await page.evaluate(() => document.getElementById('sidebar').classList.contains('open'));
  check('drawer closes', !drawer);
  await page.click('#menuBtn');
  await page.click('#rackList li[data-uid="gpu-u33"]');
  await page.waitForFunction(() => window.__t9.t('gpu-u33') >= 1, null, { timeout: 20000 });
  const mCard = await page.evaluate(() => { const el = document.getElementById('cardBody');
    return { visible: el.getBoundingClientRect().height > 100, scrollable: el.scrollHeight >= el.clientHeight }; });
  check('inspector content readable on mobile', mCard.visible && mCard.scrollable);
  check('mobile: no unexpected console errors', page.errors.length === 0);
  await page.close();

  console.log('\n== Accessibility ==');
  page = await boot(browser, 1536, 900);
  const a11y = await page.evaluate(() => ({
    ctls: [...document.querySelectorAll('#controls .ctl')].every((el) => el.getAttribute('role') === 'button' && el.tabIndex === 0),
    rows: [...document.querySelectorAll('#rackList li')].every((el) => el.getAttribute('role') === 'button' && el.tabIndex === 0),
    critText: !!document.querySelector('#rackList .crit-tag'),
    feedsText: [...document.querySelectorAll('#rackList .upos')].some((el) => /A-feed/.test(el.textContent)) }));
  check('controls are keyboard reachable buttons', a11y.ctls);
  check('explorer rows are keyboard reachable buttons', a11y.rows);
  check('criticality conveyed with text, not color alone', a11y.critText);
  check('A/B feeds conveyed with text, not color alone', a11y.feedsText);
  await page.focus('#btnAir'); await page.keyboard.press('Enter'); await settle(page, 600);
  const pressed = await page.evaluate(() => document.getElementById('btnAir').getAttribute('aria-pressed'));
  check('keyboard activation + aria-pressed on view modes', pressed === 'true');
  await page.keyboard.press('Enter'); await settle(page, 600);
  await page.close();

  await browser.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
