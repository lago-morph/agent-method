// Automated checks for implementation 2 against the Initial UI and Edit ideas
// use cases.
//
// Run from anywhere:   NODE_PATH="$(npm root -g)" node verify.js [output-dir]
//
// Needs Playwright with Chromium. Loads idea-workbench.html from this
// directory over file://, drives it at iPad landscape and portrait sizes with
// touch emulation, and prints one JSON object of named checks per orientation
// plus an overall PASS/FAIL. Screenshots go to output-dir (default: a temp
// directory), never into the repository.
//
// This script is derived from workbench/note/automated-checks-2.md: the
// sequence, the expected values, and the hooks it relies on are specified
// there. When script and note disagree, the note is corrected first and the
// script regenerated.

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

const file = 'file://' + path.join(__dirname, 'idea-workbench.html');
const outDir = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), 'idea-workbench-2-verify-'));
fs.mkdirSync(outDir, { recursive: true });

const viewports = {
  landscape: { width: 1024, height: 768 },
  portrait: { width: 768, height: 1024 }
};

// Helpers shared by both sequences.
const rowCount = page => page.$$eval('#ideas li', ls => ls.length);
const emptyCount = page => page.$$eval('#ideas li.empty', ls => ls.length);
const value = page => page.$eval('#text', e => e.value);
const inOrder = page => page.$$eval('#ideas li:not(.empty)', ls => {
  const t = ls.map(l => l.textContent.toLowerCase());
  return t.every((x, i) => i === 0 || t[i - 1].localeCompare(x) <= 0);
});
// Put the insertion point at a known offset without a click, so the checks do
// not depend on where in the text a click would land.
const caretTo = (page, where) => page.$eval('#text', (e, w) => {
  const at = w === 'end' ? e.value.length : w;
  e.setSelectionRange(at, at);
}, where);
const press = async (page, key, times) => {
  for (let i = 0; i < times; i++) await page.keyboard.press(key);
};

(async () => {
  const browser = await chromium.launch();
  const results = {};

  for (const [name, viewport] of Object.entries(viewports)) {
    const ctx = await browser.newContext({ viewport, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    const r = {};
    const shot = n => page.screenshot({ path: path.join(outDir, `${name}-${n}.png`) });

    // ================= Sequence A: display (Initial UI) =================
    await page.goto(file);

    // Layout: three panes, left one empty.
    r.threePanesLeftEmpty = await page.evaluate(() =>
      document.querySelectorAll('main > .pane').length === 3 &&
      document.getElementById('left').textContent.trim() === '');

    // No ideas: list empty, edit area blank and not editable.
    r.noIdeasListEmpty = await rowCount(page) === 0;
    r.noSelectionTextBlank = await value(page) === '';
    r.noSelectionNotEditable = await page.$eval('#text', e => e.disabled === true);
    await shot('a0-empty');

    // One load: full set, ordering, placeholders, truncation.
    await page.click('#load-test-data');
    r.oneLoadGivesFullSet = await rowCount(page) === 19;
    r.emptiesFirstAndGreyed = await page.$$eval('#ideas li', ls =>
      ls.slice(0, 2).every(l => l.classList.contains('empty') && l.textContent === '(empty)') &&
      !ls[2].classList.contains('empty'));
    r.orderCaseInsensitive = await inOrder(page);
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

    // Select the large idea: the edit area scrolls vertically only.
    await page.click('#ideas li:has-text("A very large idea") >> nth=0');
    r.selectedShowsText = (await value(page)).startsWith('A very large idea');
    r.selectedHighlighted = await page.$$eval('#ideas li.selected', ls =>
      ls.length === 1 && ls[0].textContent === 'A very large idea');
    r.editAreaScrollsVertically = await page.$eval('#text', e => e.scrollHeight > e.clientHeight);
    r.editAreaNoHorizontalScroll = await page.$eval('#text', e => e.scrollWidth <= e.clientWidth);
    await shot('a1-large-selected');

    // More loads: identities, selection, independent list scrolling.
    await page.click('#load-test-data');
    await page.click('#load-test-data');
    r.eachLoadAppendsCopy = await rowCount(page) === 57;
    r.selectionSurvivesLoad = await page.$$eval('#ideas li.selected', ls => ls.length === 1);
    r.middleScrolls = await page.$eval('#middle', e => e.scrollHeight > e.clientHeight);
    r.pageItselfDoesNotScroll = await page.evaluate(() =>
      document.documentElement.scrollHeight <= window.innerHeight + 1 &&
      document.documentElement.scrollWidth <= window.innerWidth);
    await page.$eval('#middle', e => { e.scrollTop = 600; });
    r.middleScrollsIndependently = await page.evaluate(() =>
      document.getElementById('middle').scrollTop > 0 &&
      document.getElementById('text').scrollTop === 0 && window.scrollY === 0);
    await shot('a2-scrolled');

    // Placeholders are selectable and show their literal content; leaving one
    // with no visible content deletes it.
    await page.click('#ideas li.empty >> nth=1');
    r.whitespaceShownLiterally = await value(page) === '  \n\t \n   ';
    await page.click('#ideas li.empty >> nth=0');
    r.emptyShownAsNothing = await value(page) === '';
    r.emptyDeletedOnLeaving = await rowCount(page) === 56 && await emptyCount(page) === 5;
    await shot('a3-empty-selected');

    // ================= Sequence B: editing (Edit ideas) =================
    await page.goto(file);
    await page.click('#load-test-data');
    await page.click('#load-test-data');
    await page.click('#load-test-data');

    // New: an empty placeholder, selected, in the group at the top of the
    // list, with the insertion point in the edit area.
    await page.click('#new');
    r.newGivesEmptySelectedInTopGroup = await page.$$eval('#ideas li', ls => {
      const i = ls.findIndex(l => l.classList.contains('selected'));
      return ls.length === 58 && i >= 0 && ls[i].classList.contains('empty') &&
        ls[i].textContent === '(empty)' &&
        ls.slice(0, i).every(l => l.classList.contains('empty'));
    });
    r.newIsEditableAndFocused = await page.evaluate(() =>
      document.activeElement === document.getElementById('text') &&
      document.getElementById('text').disabled === false &&
      document.getElementById('text').value === '');

    // Scroll the selected row out of view first, so that "stays visible"
    // means the list actually scrolled back to it.
    await page.$eval('#middle', e => { e.scrollTop = e.scrollHeight; });
    await page.keyboard.type('Aardvark');
    r.listFollowsTypingImmediately = await page.$$eval('#ideas li.selected', ls =>
      ls.length === 1 && ls[0].textContent === 'Aardvark' && !ls[0].classList.contains('empty'));
    r.movesToItsAlphabeticalPosition = await inOrder(page) && await page.$$eval('#ideas li', ls => {
      const i = ls.findIndex(l => l.classList.contains('selected'));
      // It has left the "(empty)" group: every remaining empty row is before it.
      return i >= 0 && ls.every((l, j) => !l.classList.contains('empty') || j < i);
    });
    r.selectedRowStaysVisible = await page.evaluate(() => {
      const row = document.querySelector('#ideas li.selected').getBoundingClientRect();
      const pane = document.getElementById('middle').getBoundingClientRect();
      return row.top >= pane.top - 1 && row.bottom <= pane.bottom + 1;
    });

    // Undo and redo of one change: a run of typed characters is one change.
    await page.keyboard.press('Control+z');
    r.undoRevertsMostRecentChange = await value(page) === '' &&
      await page.$$eval('#ideas li.selected', ls => ls.length === 1 && ls[0].classList.contains('empty'));
    await page.keyboard.press('Control+Shift+z');
    r.redoReappliesUndoneChange = await value(page) === 'Aardvark';

    // A second line does not change the title.
    await page.keyboard.type('\nA second line.');
    r.secondLineDoesNotChangeTitle = await page.$$eval('#ideas li.selected', ls =>
      ls.length === 1 && ls[0].textContent === 'Aardvark');

    // The history reaches back to the text as it was at selection, and no
    // further; redo comes all the way forward, and no further.
    await press(page, 'Control+z', 40);
    r.undoReachesTextAtSelection = await value(page) === '';
    await press(page, 'Control+z', 3);
    r.furtherUndoDoesNothing = await value(page) === '';
    await press(page, 'Control+Shift+z', 40);
    r.redoReachesLatestText = await value(page) === 'Aardvark\nA second line.';
    await press(page, 'Control+Shift+z', 3);
    r.furtherRedoDoesNothing = await value(page) === 'Aardvark\nA second line.';

    // A new change after undoing discards what could have been redone.
    await page.keyboard.press('Control+z');
    await caretTo(page, 'end');
    await page.keyboard.type('!');
    const afterNewChange = await value(page);
    await page.keyboard.press('Control+Shift+z');
    r.newChangeDiscardsRedo = await value(page) === afterNewChange &&
      afterNewChange !== 'Aardvark\nA second line.';
    r.undoNeverChangesOtherIdeas = await rowCount(page) === 58;

    // A blank first line: the first line with visible content stands in for
    // the title, distinguished, and the list sorts by it.
    await page.click('#ideas li:has-text("Banana bread") >> nth=0');
    await page.focus('#text');
    await caretTo(page, 0);
    await page.keyboard.press('Enter');
    r.blankFirstLineShowsNextLine = await page.$$eval('#ideas li.selected', ls =>
      ls.length === 1 && ls[0].textContent === 'Banana bread' &&
      ls[0].classList.contains('placeholder-title') && !ls[0].classList.contains('empty'));
    r.blankFirstLineSortsByThatLine = await inOrder(page);

    // Emptied while editing: the entry shows "(empty)" but the idea remains.
    await page.click('#ideas li:has-text("mango sorbet") >> nth=0');
    await page.focus('#text');
    await page.$eval('#text', e => e.setSelectionRange(0, e.value.length));
    await page.keyboard.press('Backspace');
    r.emptiedIdeaShowsPlaceholderButRemains = await rowCount(page) === 58 &&
      await value(page) === '' &&
      await page.$$eval('#ideas li.selected', ls => ls.length === 1 && ls[0].classList.contains('empty'));
    await shot('b1-editing');

    // Its undo history is intact while it is empty.
    await page.keyboard.press('Control+z');
    r.momentarilyEmptyKeepsItsHistory = await value(page) === 'mango sorbet' &&
      await rowCount(page) === 58;
    await page.keyboard.press('Control+Shift+z');

    // Leaving it deletes it.
    await page.click('#ideas li:has-text("lighthouse tour") >> nth=0');
    r.emptiedIdeaDeletedOnLeaving = await rowCount(page) === 57;

    // Re-selecting the already-selected idea is not leaving it.
    await page.click('#new');
    await page.click('#ideas li.selected');
    r.reselectingSameIdeaDeletesNothing = await rowCount(page) === 58 &&
      await page.$$eval('#ideas li.selected', ls => ls.length === 1 && ls[0].classList.contains('empty'));

    // Repeating New never piles up empty ideas.
    await page.click('#new');
    await page.click('#new');
    await page.click('#new');
    r.newWhileEmptyDoesNotPileUp = await rowCount(page) === 58 &&
      await emptyCount(page) === 7;

    // The history is cleared when another idea is selected.
    await page.click('#ideas li:has-text("Quantum garden") >> nth=0');
    await page.focus('#text');
    await caretTo(page, 'end');
    await page.keyboard.type('zzz');
    const edited = await value(page);
    await page.click('#ideas li:has-text("Walnut desk plans") >> nth=0');
    await page.click('#ideas li:has-text("Quantum garden") >> nth=0');
    await page.keyboard.press('Control+z');
    r.historyClearedOnSelectingAnother = await value(page) === edited && edited.endsWith('zzz');

    // The editor keeps the insertion point in view: with the caret at the end
    // of a text larger than the area, and the area scrolled back to the top,
    // typing must bring the caret's line into view again.
    await page.click('#ideas li:has-text("A very large idea") >> nth=0');
    await page.focus('#text');
    await caretTo(page, 'end');
    await page.$eval('#text', e => { e.scrollTop = 0; });
    await page.keyboard.type('X');
    r.typingAtEndScrollsEditorToCaret = await page.$eval('#text', e => {
      const style = getComputedStyle(e);
      const slack = (parseFloat(style.paddingBottom) || 0) + (parseFloat(style.lineHeight) || 24);
      return e.scrollTop > 0 && (e.scrollHeight - e.scrollTop - e.clientHeight) <= slack;
    });

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
