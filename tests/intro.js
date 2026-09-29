/* Ride tests — the God's-eye intro that flies from the whole hall down to one
   rack and hands over to the trainer, and the silicon dive that continues from
   the GPU down to a single silicon atom. Run with the app served:
     APP_URL=http://127.0.0.1:8123/index.html node tests/intro.js
   Requires: playwright. If the three.js CDN is unreachable, set THREE_LOCAL to
   a local three.min.js (same convention as tests/acceptance.js). */
const { chromium } = require('playwright');
const fs = require('fs');

const URL = process.env.APP_URL || 'http://127.0.0.1:8123/index.html';
const THREE_LOCAL = process.env.THREE_LOCAL;
const GLTF_LOCAL = process.env.GLTF_LOCAL;

const HOOK_ANCHOR = 'window.__audit=function(){';
const HOOK =
  'window.__ride={' +
  'st:function(){return {on:introOn,pT:pT,pC:pC,ch:curChapter,auto:auto.on,' +
  'active:active?active.userData.def.uid:null,step:curStep,tab:curTab,hall:HALL.group.visible,' +
  'radius:cam.radius,goalR:goal.radius,theta:cam.theta,phi:cam.phi,fov:camera.fov,far:camera.far,fogN:scene.fog.near,fogF:scene.fog.far,' +
  'allT:components.map(function(c){return c._t})};},' +
  'set:function(p){pT=pC=p;},dive:function(){return DIVE.state();},diveGo:function(q){DIVE.go(q);},' +
  'open:function(uid){var c=components.find(function(c2){return c2.userData.def.uid===uid});if(c)openComponent(c);}' +
  '};' + HOOK_ANCHOR;

let passed = 0, failed = 0;
function check(name, cond, extra) {
  if (cond) { passed++; console.log('  PASS  ' + name); }
  else { failed++; console.log('  FAIL  ' + name + (extra !== undefined ? '  → ' + JSON.stringify(extra) : '')); }
}

async function boot(browser, w, h, opts) {
  opts = opts || {};
  const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' });
  if (THREE_LOCAL) await page.route('**/three.min.js', (r) => r.fulfill({
    contentType: 'application/javascript', body: fs.readFileSync(THREE_LOCAL, 'utf8') }));
  if (GLTF_LOCAL) await page.route('**/GLTFLoader.js', (r) => r.fulfill({
    contentType: 'application/javascript', body: fs.readFileSync(GLTF_LOCAL, 'utf8') }));
  await page.route('**/index.html*', async (route) => {
    const res = await route.fetch();
    await route.fulfill({ response: res, body: (await res.text()).replace(HOOK_ANCHOR, HOOK) });
  });
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) page.errors.push('console: ' + m.text());
  });
  await page.goto(URL + (opts.query || ''), { waitUntil: 'load' });
  await page.waitForFunction('!!window.__ride', null, { timeout: 30000 });
  await page.waitForTimeout(2000);
  return page;
}
const st = (p) => p.evaluate(() => window.__ride.st());
const settle = (p, ms) => p.waitForTimeout(ms || 1500);
const shown = (p, id) => p.evaluate((id) => { const el = document.getElementById(id); const cs = getComputedStyle(el);
  return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.5; }, id);
const waitRide = (p, pred, arg, ms) => p.waitForFunction(pred, arg, { timeout: ms || 30000 });

async function assertTrainerHome(page, label) {
  const s = await st(page);
  check(label + ': ride over, hall hidden', !s.on && !s.hall, s);
  check(label + ': rack overview (step 1, Overview tab, nothing pulled out)',
    s.active === null && s.step === 1 && s.tab === 'overview' && s.allT.every((t) => t < 0.01), s);
  check(label + ': camera handed over exactly at the trainer default',
    Math.abs(s.radius - 31) < 0.01 && Math.abs(s.theta - 0.7) < 0.35 && Math.abs(s.phi - 1.12) < 0.01, s);
  check(label + ': lens, far plane and fog restored', s.fov === 45 && s.far === 240 && s.fogN === 42 && s.fogF === 78, s);
  const name = await page.evaluate(() => document.getElementById('cardName').textContent);
  check(label + ': inspector shows the rack', /42U Data Center Rack/.test(name), name);
  const back = await page.waitForFunction(() => ['sidebar', 'card', 'controls'].every((id) => { const cs = getComputedStyle(document.getElementById(id));
    return cs.visibility === 'visible' && parseFloat(cs.opacity) > 0.9; }), null, { timeout: 8000 }).then(() => true, () => false);
  check(label + ': trainer chrome visible again', back);
}

(async () => {
  const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });

  console.log('\n== The ride opens the app (1536x900) ==');
  let page = await boot(browser, 1536, 900);
  let s = await st(page);
  check('ride is on at load with the hall visible', s.on && s.hall && s.pC === 0, s);
  check('body carries the intro-on state', await page.evaluate(() => document.body.classList.contains('intro-on')));
  const hook = await page.evaluate(() => ({ txt: document.getElementById('introHook').textContent,
    on: document.getElementById('introHook').classList.contains('on') }));
  check('hook asks "Want to learn what’s inside a data center rack?"', hook.on && /inside a data center rack\?/i.test(hook.txt));
  check('hook says "Start here and zoom — you’re in for a ride."', /Start here and zoom/i.test(hook.txt) && /in for a ride/i.test(hook.txt));
  check('Start the ride / Skip are visible', (await shown(page, 'introStart')) && (await shown(page, 'introSkip')) && (await shown(page, 'btnSkipIntro')));
  const chromeHidden = await page.waitForFunction(() => ['sidebar', 'card', 'controls', 'bottombar'].every((id) =>
    getComputedStyle(document.getElementById(id)).visibility === 'hidden'), null, { timeout: 8000 }).then(() => true, () => false);
  check('trainer chrome steps aside during the ride', chromeHidden);
  check('authorship mark stays visible during the ride', await shown(page, 'owner'));
  const fov0 = await page.evaluate(() => document.getElementById('fovVal').textContent);
  check('field-of-view ruler reads the whole hall (≥ 10 m)', /≈ \d+(\.\d+)? m$/.test(fov0) && parseFloat(fov0.replace('≈ ', '')) >= 10, fov0);
  check('canvas describes the ride to assistive tech', /data hall/i.test(await page.evaluate(() => document.querySelector('#app canvas').getAttribute('aria-label'))));

  // scrolling while the pointer is over the headline still drives the ride
  const hb = await page.evaluate(() => { const r = document.querySelector('#introHook h2').getBoundingClientRect(); return { x: r.left + 40, y: r.top + 20 }; });
  await page.mouse.move(hb.x, hb.y);
  await page.mouse.wheel(0, 120);
  await settle(page, 300);
  const overHook = (await st(page)).pT;
  check('scroll over the headline drives the ride', overHook > 0.02, overHook);
  await page.evaluate(() => window.__ride.set(0));
  await settle(page, 600);
  // keyboard: ↓ steps to the next chapter
  await page.keyboard.press('ArrowDown');
  await waitRide(page, () => window.__ride.st().pC > 0.17);
  await settle(page, 1200);
  let cap = await page.evaluate(() => ({ t: document.getElementById('capT').textContent, s: document.getElementById('capS').textContent,
    on: document.getElementById('introCap').classList.contains('on'), hook: document.getElementById('introHook').classList.contains('on') }));
  check('↓ flies to chapter 1 "The data hall"', cap.on && /data hall/i.test(cap.t) && !cap.hook, cap);
  check('chapter 1 states the hall size', /8 rows · 128 racks/.test(cap.s), cap.s);
  const fov1 = await page.evaluate(() => document.getElementById('fovVal').textContent);
  check('FOV readout tracks the zoom', fov1 !== fov0, [fov0, fov1]);

  // wheel: down = deeper, up = pull back
  const before = (await st(page)).pT;
  await page.mouse.move(768, 450);
  await page.mouse.wheel(0, 700);
  await settle(page, 400);
  const afterDown = (await st(page)).pT;
  check('scroll down zooms deeper', afterDown > before + 0.1, [before, afterDown]);
  await page.mouse.wheel(0, -350);
  await settle(page, 400);
  const afterUp = (await st(page)).pT;
  check('scroll up pulls back out', afterUp < afterDown - 0.05, [afterDown, afterUp]);

  // aisle annotations teach the overhead services
  await page.evaluate(() => window.__ride.set(0.32));
  await settle(page, 1500);
  const tags = await page.evaluate(() => [...document.querySelectorAll('.htag')].filter((t) => parseFloat(t.style.opacity) > 0.5).map((t) => t.textContent));
  check('overhead services are labelled (fiber raceway, busway, fire suppression)',
    tags.some((t) => /Fiber raceway/.test(t)) && tags.some((t) => /busway/i.test(t)) && tags.some((t) => /Fire suppression/.test(t)), tags);
  check('aisles are labelled (cold / hot)', tags.some((t) => /Cold aisle/.test(t)) && tags.some((t) => /Hot aisle/.test(t)), tags);

  // one rack → isolate
  await page.evaluate(() => window.__ride.set(0.52));
  await settle(page, 1500);
  cap = await page.evaluate(() => document.getElementById('capT').textContent);
  check('chapter 3 singles out "One rack"', /one rack/i.test(cap), cap);
  const heroTag = await page.evaluate(() => [...document.querySelectorAll('.htag.hero')].some((t) => parseFloat(t.style.opacity) > 0.5 && /Rack C-08/.test(t.textContent)));
  check('the chosen rack is tagged Rack C-08', heroTag);
  await page.evaluate(() => window.__ride.set(0.7));
  await settle(page, 1500);
  cap = await page.evaluate(() => document.getElementById('capT').textContent);
  check('chapter 4 isolates it', /isolate/i.test(cap), cap);

  // End → hand-over
  await page.keyboard.press('End');
  await waitRide(page, () => !window.__ride.st().on, null, 30000);
  await settle(page, 1500);
  await assertTrainerHome(page, 'after the ride');
  check('the ride offers to continue into the GPU node', await page.waitForFunction(() => { const el = document.getElementById('rideNext');
    return el.classList.contains('on') && parseFloat(getComputedStyle(el).opacity) > 0.9; }, null, { timeout: 8000 }).then(() => true, () => false));
  const crumb = await page.evaluate(() => document.getElementById('crumb').textContent.replace(/\s+/g, ''));
  check('breadcrumb roots at the data hall', /^Datahall›Rack/.test(crumb), crumb);
  const fovT = await page.evaluate(() => document.getElementById('fovVal').textContent);
  check('FOV readout at the rack is ≈ 2–4 m', /≈ [23]\.\d\d m/.test(fovT), fovT);

  // continue the ride → GPU dissection
  await page.click('#rideNext');
  await waitRide(page, () => window.__ride.st().active === 'gpu-u33', null, 10000);
  check('continue-the-ride opens the AI GPU node', (await st(page)).active === 'gpu-u33');

  // Data hall button flies back out, Esc lands back on the rack
  await page.click('#btnHall');
  await settle(page, 1200);
  s = await st(page);
  check('"Data hall" flies back out to the hall', s.on && s.hall && Math.abs(s.pT - 0.18) < 0.001, s);
  check('flying out retracts any dissection', s.active === null);
  await page.keyboard.press('Escape');
  await waitRide(page, () => window.__ride.st().allT.every((t) => t < 0.01), null, 20000);
  await settle(page, 800);
  await assertTrainerHome(page, 'Esc from the hall');

  // one zoom language: in the trainer, scroll down = closer; scrolling up past the full rack returns to the hall
  await settle(page, 900);
  await page.mouse.move(700, 450);
  const r0 = (await st(page)).goalR;
  await page.mouse.wheel(0, 300); await settle(page, 400);
  const r1 = (await st(page)).goalR;
  check('trainer: scroll down dollies in', r1 < r0 - 1, [r0, r1]);
  for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, -500); await page.waitForTimeout(120); }
  await settle(page, 800);
  s = await st(page);
  check('trainer: pulling back past the full rack returns to the hall', s.on && s.hall, s);
  await page.click('#btnSkipIntro');
  await settle(page, 1200);
  check('header Skip ends the ride', !(await st(page)).on);

  // entering the trainer from the ride via a deep selection
  await page.click('#btnHall'); await settle(page, 800);
  await page.evaluate(() => window.__ride.open('ups-u6'));
  await settle(page, 1200);
  s = await st(page);
  check('selecting equipment during the ride ends it and selects', !s.on && s.active === 'ups-u6', s);
  check('desktop: no console errors', page.errors.length === 0, page.errors);
  await page.close();

  console.log('\n== Start the ride (hands-free) ==');
  page = await boot(browser, 1280, 800);
  const t0 = Date.now();
  await page.click('#introStart');
  await waitRide(page, () => { const r = window.__ride.st(); return !r.on; }, null, 300000); // software GL can be slow
  const secs = (Date.now() - t0) / 1000;
  check('the ride is a real flight, not a cut (≥ 8 s)', secs >= 8, secs);
  await waitRide(page, () => window.__ride.st().active === 'gpu-u33', null, 15000);
  check('the ride carries on into the GPU node dissection', (await st(page)).active === 'gpu-u33');
  await waitRide(page, () => window.__ride.dive().on, null, 90000).then(() => {}, () => {});
  check('…and on into the silicon dive, hands-free', await page.evaluate(() => window.__ride.dive().on));
  check('hands-free: no console errors', page.errors.length === 0, page.errors);
  await page.close();

  console.log('\n== Silicon dive: GPU → die → L2 → SM → wiring → transistor → atoms ==');
  page = await boot(browser, 1280, 800, { query: '?intro=0' });
  await page.evaluate(() => window.__ride.open('gpu-u33'));
  await page.waitForFunction(() => { const s = window.__ride.st(); return s.active === 'gpu-u33' && Math.max(...s.allT) >= 1; }, null, { timeout: 30000 });
  await settle(page, 800);
  check('the GPU node offers "Zoom into the silicon"', await page.evaluate(() => !!document.querySelector('#cardBody [data-dive]')));
  await page.click('#cardBody [data-dive]');
  await waitRide(page, () => window.__ride.dive().on, null, 30000);
  let dv = await page.evaluate(() => window.__ride.dive());
  check('the dive starts from the open GPU node', dv.on && dv.q < 0.05, dv);
  const diveChrome = await page.waitForFunction(() => document.body.classList.contains('dive-on') &&
    getComputedStyle(document.getElementById('sidebar')).visibility === 'hidden', null, { timeout: 8000 }).then(() => true, () => false);
  check('trainer chrome steps aside for the dive', diveChrome);
  check('"Back to the rack" is offered', await shown(page, 'btnDiveBack'));
  await settle(page, 1200);
  let dcap = await page.evaluate(() => ({ t: document.getElementById('capT').textContent, f: document.getElementById('fovVal').textContent }));
  check('chapter "Into the GPU" at metre scale', /into the gpu/i.test(dcap.t) && / m$/.test(dcap.f), dcap);
  const depth = async (q, re, unit, label) => {
    await page.evaluate((q) => window.__ride.diveGo(q), q);
    await waitRide(page, (q) => Math.abs(window.__ride.dive().q - q) < 0.004, q, 30000);
    await settle(page, 700);
    const c = await page.evaluate(() => ({ t: document.getElementById('capT').textContent, f: document.getElementById('fovVal').textContent }));
    check(label, re.test(c.t) && unit.test(c.f), c);
  };
  await depth(0.15, /one blackwell gpu/i, / cm$/, 'the GPU package, at centimetre scale');
  await depth(0.22, /104 billion transistors/i, / cm$| mm$/, 'one die: 104 billion transistors');
  await depth(0.3, /l2 cache/i, / mm$/, 'the L2 cache corridor, at millimetre scale');
  await depth(0.4, /one streaming multiprocessor/i, / mm$/, 'one streaming multiprocessor: 128 CUDA cores, 4 Tensor Cores');
  await depth(0.47, /one processing block/i, / mm$| µm$/, 'one processing block: 32 CUDA cores, 64 KB register file');
  await depth(0.53, /inside the processing block/i, / µm$/, 'inside the processing block, at micrometre scale');
  const bx = await page.evaluate(() => [...document.querySelectorAll('.htag.bx')].filter((t) => parseFloat(t.style.opacity) > 0.5).map((t) => t.textContent));
  check('processing-block parts are labelled (scheduler, register file, CUDA cores)',
    bx.some((t) => /scheduler/i.test(t)) && bx.some((t) => /Register file/.test(t)) && bx.some((t) => /32 CUDA cores/.test(t)), bx);
  await depth(0.565, /tensor core/i, / µm$/, 'one Tensor Core');
  await depth(0.63, /wiring/i, / µm$/, 'passing through the copper wiring, at micrometre scale');
  await depth(0.76, /transistor, cut in half/i, / nm$| µm$/, 'one transistor, cut in half');
  await depth(1, /bottom of the zoom/i, / nm$/, 'the bottom: silicon atoms at nanometre scale');
  const mk = await page.evaluate(() => parseFloat(document.getElementById('fovMk').style.top));
  check('FOV ruler marker reaches the bottom decade', mk > 85, mk);
  await page.keyboard.press('Escape');
  await settle(page, 900);
  s = await st(page);
  check('Esc leaves the dive with the GPU node still open', !(await page.evaluate(() => window.__ride.dive().on)) && s.active === 'gpu-u33', s);
  check('the inspector is back on the GPU part', /Blackwell GPU/.test(await page.evaluate(() => document.getElementById('cardName').textContent)));
  check('trainer chrome returns after the dive', await page.waitForFunction(() => { const cs = getComputedStyle(document.getElementById('card'));
    return !document.body.classList.contains('dive-on') && cs.visibility === 'visible' && parseFloat(cs.opacity) > 0.9; }, null, { timeout: 8000 }).then(() => true, () => false));
  // scrolling deeper at the closest orbit keeps going into the silicon; scrolling back up comes back out
  await page.mouse.move(420, 600);   // open canvas, clear of the explorer, controls dock and inspector
  for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 500); await page.waitForTimeout(250); }
  await waitRide(page, () => window.__ride.dive().on, null, 30000).then(() => {}, () => {});
  check('scrolling deeper on the GPU node enters the dive', await page.evaluate(() => window.__ride.dive().on));
  await settle(page, 900);
  await page.mouse.wheel(0, -700);
  await waitRide(page, () => !window.__ride.dive().on, null, 20000).then(() => {}, () => {});
  check('scrolling back up out of the dive returns to the trainer', !(await page.evaluate(() => window.__ride.dive().on)));
  // "Back to the rack" rewinds out of the silicon
  await page.click('#cardBody [data-dive]').catch(async () => { await page.click('.tab[data-tab="overview"]'); await page.click('#cardBody [data-dive]'); });
  await waitRide(page, () => window.__ride.dive().on, null, 30000);
  await page.evaluate(() => window.__ride.diveGo(0.6)); await settle(page, 2500);
  await page.click('#btnDiveBack');
  await waitRide(page, () => !window.__ride.dive().on, null, 30000).then(() => {}, () => {});
  check('"Back to the rack" rewinds and returns to the trainer', !(await page.evaluate(() => window.__ride.dive().on)));
  check('dive: no console errors', page.errors.length === 0, page.errors);
  await page.close();

  console.log('\n== Skip ==');
  page = await boot(browser, 1536, 900);
  await page.click('#introSkip');
  await settle(page, 1500);
  await assertTrainerHome(page, 'skip');
  check('skip never auto-opens a component', (await st(page)).active === null);
  await page.close();

  console.log('\n== Reduced motion ==');
  page = await boot(browser, 1536, 900, { reduced: true });
  await page.keyboard.press('ArrowDown');
  await waitRide(page, () => window.__ride.st().pT === 0.18, null, 10000);
  await settle(page, 2500);    // at least one rendered frame, even on software GL
  s = await st(page);
  check('chapters cut instead of fly (pC === pT)', s.pT === 0.18 && s.pC === s.pT, s);
  await page.mouse.move(768, 450);
  await page.mouse.wheel(0, 150);
  await settle(page, 2500);
  s = await st(page);
  check('a scroll step jumps a whole chapter', s.pT === 0.36 && s.pC === 0.36, s);
  await page.keyboard.press('End'); await settle(page, 3500);
  await page.evaluate(() => window.__ride.open('gpu-u33'));
  await page.waitForFunction(() => Math.max(...window.__ride.st().allT) >= 1, null, { timeout: 20000 });
  await page.evaluate(() => document.querySelector('#cardBody [data-dive]').click());
  await waitRide(page, () => window.__ride.dive().on, null, 20000);
  await page.keyboard.press('ArrowDown'); await settle(page, 2500);
  const rd = await page.evaluate(() => window.__ride.dive());
  check('reduced motion: the dive cuts level to level', rd.q === rd.qT && rd.q > 0.07, rd);
  check('hint animation is off', await page.evaluate(() => getComputedStyle(document.querySelector('.mouse'), '::after').animationName === 'none'));
  await page.close();

  console.log('\n== Deep link straight to the rack ==');
  page = await boot(browser, 1536, 900, { query: '?intro=0' });
  s = await st(page);
  check('?intro=0 opens on the trainer', !s.on && !s.hall && !(await page.evaluate(() => document.body.classList.contains('intro-on'))), s);
  await page.close();

  console.log('\n== Mobile 390x844 ==');
  page = await boot(browser, 390, 844);
  const m = await page.evaluate(() => {
    const r = (id) => document.getElementById(id).getBoundingClientRect();
    return { scrollW: document.documentElement.scrollWidth, hook: r('introHook'), skip: r('btnSkipIntro'),
      h1: document.querySelector('#brand h1').getBoundingClientRect(), actionsR: r('topActions').right, vh: innerHeight };
  });
  check('no horizontal overflow during the ride', m.scrollW <= 390, m.scrollW);
  check('hook fits the viewport', m.hook.left >= 0 && m.hook.right <= 390 && m.hook.bottom <= m.vh && m.hook.top > 60, m.hook);
  check('Skip does not collide with the title', m.h1.right <= m.skip.left + 1 && m.actionsR <= 390, [m.h1, m.skip]);
  // swipe up = deeper (pointer drag on the canvas)
  await page.mouse.move(195, 600); await page.mouse.down(); await page.mouse.move(195, 300, { steps: 6 }); await page.mouse.up();
  await settle(page, 300);
  check('swipe up zooms deeper', (await st(page)).pT > 0.1, await st(page));
  check('mobile: no console errors', page.errors.length === 0, page.errors);
  await page.close();

  console.log('\n== Compact 1024x768 ==');
  page = await boot(browser, 1024, 768);
  check('no horizontal overflow during the ride', (await page.evaluate(() => document.documentElement.scrollWidth)) <= 1024);
  await page.close();

  await browser.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
