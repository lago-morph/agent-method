// Automated checks for implementation 1 against the Initial UI use case.
//
// Run from anywhere:   NODE_PATH="$(npm root -g)" node verify.js [output-dir]
// Needs Playwright with Chromium. Loads idea-workbench.html from this
// directory over file://, drives it at iPad landscape and portrait sizes
// with touch emulation, and prints one JSON object of named checks per
// orientation plus an overall PASS/FAIL. Screenshots go to output-dir
// (default: a temp directory), never into the repository.
//
// Each check is named for the use-case sentence it verifies; see the
// acceptance-criteria table in note/implementation-record-1.md.

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

const file = 'file://' + path.join(__dirname, 'idea-workbench.html');
const outDir = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), 'idea-workbench-verify-'));
fs.mkdirSync(outDir, { recursive: true });

const viewports = {
  landscape: { width: 1024, height: 768 },
  portrait: { width: 768, height: 1024 }
};

(async () => {
  const browser = await chromium.launch();
  const results = {};
  for (const [name, viewport] of Object.entries(viewports)) {
    const ctx = await browser.newContext({ viewport, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(file);
    const r = {};
    const shot = n => page.screenshot({ path: path.join(outDir, `${name}-${n}.png`) });

    // Layout: three panes, left one empty.
    r.threePanesLeftEmpty = await page.evaluate(() =>
      document.querySelectorAll('main > .pane').length === 3 &&
      document.getElementById('left').textContent.trim() === '');

    // No ideas: list empty, right pane blank.
    r.noIdeasListEmpty = await page.$$eval('#ideas li', ls => ls.length === 0);
    r.noSelectionTextBlank = await page.$eval('#text', e => e.textContent === '');
    await shot('0-empty');

    // One load: full set, ordering, placeholders, truncation.
    await page.click('#load-test-data');
    r.oneLoadGivesFullSet = await page.$$eval('#ideas li', ls => ls.length === 19);
    r.emptiesFirstAndGreyed = await page.$$eval('#ideas li', ls =>
      ls.slice(0, 2).every(l => l.classList.contains('empty') && l.textContent === '(empty)') &&
      !ls[2].classList.contains('empty'));
    r.orderCaseInsensitive = await page.$$eval('#ideas li:not(.empty)', ls => {
      const t = ls.map(l => l.textContent.toLowerCase());
      return t.every((x, i) => i === 0 || t[i - 1].localeCompare(x) <= 0);
    });
    r.caseInterleaves = await page.$$eval('#ideas li', ls => {
      const t = ls.map(l => l.textContent);
      return t.indexOf('Apple crumble') < t.indexOf('apple pie recipe') &&
        t.indexOf('apple pie recipe') < t.indexOf('Banana bread');
    });
    r.titleIsFirstLineOnly = await page.$$eval('#ideas li', ls =>
      ls.some(l => l.textContent === 'apple pie recipe'));
    r.wideTitleTruncates = await page.$$eval('#ideas li', ls => {
      const w = ls.find(l => l.textContent.startsWith('This idea has a first line'));
      return w.scrollWidth > w.clientWidth && getComputedStyle(w).textOverflow === 'ellipsis';
    });

    // Select the large idea: right pane scrolls vertically only.
    await page.click('#ideas li:has-text("A very large idea")');
    r.selectedShowsText = await page.$eval('#text', e => e.textContent.startsWith('A very large idea'));
    r.selectedHighlighted = await page.$$eval('#ideas li.selected', ls =>
      ls.length === 1 && ls[0].textContent === 'A very large idea');
    r.rightScrollsVertically = await page.$eval('#right', e => e.scrollHeight > e.clientHeight);
    r.rightNoHorizontalScroll = await page.evaluate(() =>
      document.getElementById('right').scrollWidth <= document.getElementById('right').clientWidth &&
      document.getElementById('text').scrollWidth <= document.getElementById('text').clientWidth);
    await shot('1-large-selected');

    // Placeholders are selectable and show literal content.
    await page.click('#ideas li.empty >> nth=1');
    r.whitespaceShownLiterally = await page.$eval('#text', e => e.textContent === '  \n\t \n   ');
    await page.click('#ideas li.empty >> nth=0');
    r.emptyShownAsNothing = await page.$eval('#text', e => e.textContent === '');
    await shot('2-empty-selected');

    // More loads: identities, selection, independent list scrolling.
    await page.click('#ideas li:has-text("This idea has a first line")');
    await page.click('#load-test-data');
    await page.click('#load-test-data');
    r.eachLoadAppendsCopy = await page.$$eval('#ideas li', ls => ls.length === 57);
    r.selectionSurvivesLoad = await page.$$eval('#ideas li.selected', ls => ls.length === 1);
    r.middleScrolls = await page.$eval('#middle', e => e.scrollHeight > e.clientHeight);
    r.pageItselfDoesNotScroll = await page.evaluate(() =>
      document.documentElement.scrollHeight <= window.innerHeight + 1 &&
      document.documentElement.scrollWidth <= window.innerWidth);
    await page.$eval('#middle', e => { e.scrollTop = 600; });
    r.middleScrollsIndependently = await page.evaluate(() =>
      document.getElementById('middle').scrollTop > 0 &&
      document.getElementById('right').scrollTop === 0 && window.scrollY === 0);
    await shot('3-scrolled');

    r.noScriptErrors = errors.length === 0;
    if (errors.length) r.errors = errors;
    results[name] = r;
    await ctx.close();
  }
  await browser.close();

  const failed = Object.entries(results).flatMap(([name, r]) =>
    Object.entries(r).filter(([k, v]) => v === false).map(([k]) => `${name}.${k}`));
  console.log(JSON.stringify(results, null, 2));
  console.log(failed.length ? 'FAIL: ' + failed.join(', ') : 'PASS');
  console.log('screenshots: ' + outDir);
  process.exitCode = failed.length ? 1 : 0;
})();
