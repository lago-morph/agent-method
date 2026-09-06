// Automated checks for implementation 3 against the Initial UI and Edit ideas
// use cases as revised on 2026-09-05 (PR #18).
//
// Run from anywhere:   NODE_PATH="$(npm root -g)" node verify.js [output-dir]
//
// Needs Playwright with Chromium. Loads idea-workbench.html from this
// directory over file://, drives it at iPad landscape and portrait sizes with
// touch emulation, and prints one JSON object of named checks per orientation
// plus an overall PASS/FAIL. Screenshots go to output-dir (default: a temp
// directory), never into the repository.
//
// This script is derived from workbench/note/automated-checks-3.md: the
// sequence, the expected values, and the hooks it relies on are specified
// there. When script and note disagree, the note is corrected first and the
// script regenerated.

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

const implFile = path.join(__dirname, 'idea-workbench.html');
const file = 'file://' + implFile;
const outDir = process.argv[2] || fs.mkdtempSync(path.join(os.tmpdir(), 'idea-workbench-3-verify-'));
fs.mkdirSync(outDir, { recursive: true });

const MESSAGE = 'Leading whitespace was removed.';

const viewports = {
  landscape: { width: 1024, height: 768 },
  portrait: { width: 768, height: 1024 }
};

// ---- helpers shared by both sequences --------------------------------------

const rowCount = page => page.$$eval('#ideas li', ls => ls.length);
const emptyCount = page => page.$$eval('#ideas li.empty', ls => ls.length);
const value = page => page.$eval('#text', e => e.value);
const messageText = page => page.$eval('#message-text', e => e.textContent);
const listEntries = page => page.$$eval('#message-entries li', ls => ls.map(l => ({
  none: l.classList.contains('none'),
  time: l.querySelector('.message-time') ? l.querySelector('.message-time').textContent : null,
  body: l.querySelector('.message-body') ? l.querySelector('.message-body').textContent : l.textContent
})));
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
const selectRange = (page, from, to) => page.$eval('#text', (e, r) => {
  e.setSelectionRange(r[0], r[1] === 'end' ? e.value.length : r[1]);
}, [from, to]);
const press = async (page, key, times) => {
  for (let i = 0; i < times; i++) await page.keyboard.press(key);
};
const pickRow = async (page, text) => {
  await page.click(`#ideas li:has-text(${JSON.stringify(text)}) >> nth=0`);
  await page.focus('#text');
};

// ---- inspection checks (the source file, not the running page) -------------

const source = fs.readFileSync(implFile, 'utf8');
const inspection = {
  // "Copy, cut, and paste use the platform's standard text-editing
  // facilities; the application adds no facilities of its own for them."
  noClipboardCode: !/navigator\.clipboard|execCommand|addEventListener\(\s*['"](copy|cut|paste)['"]/.test(source),
  // "Opened directly (no server) ... no build step, no external dependencies."
  noExternalReferences: !/https?:\/\/|<script[^>]+src=|<link\b|\bfetch\s*\(|\bimport\s*\(/.test(source),
  // "Messages are not kept across sessions" — nothing is persisted at all.
  noPersistence: !/localStorage|sessionStorage|indexedDB|document\.cookie/.test(source)
};

(async () => {
  const browser = await chromium.launch();
  const results = { inspection };

  for (const [name, viewport] of Object.entries(viewports)) {
    const ctx = await browser.newContext({ viewport, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    const r = {};
    const shot = n => page.screenshot({ path: path.join(outDir, `${name}-${n}.png`) });

    // ================= Sequence A: display (Initial UI) =================
    await page.goto(file);

    // Layout: three panes, left one empty, message area full width below them.
    r.threePanesLeftEmpty = await page.evaluate(() =>
      document.querySelectorAll('main > .pane').length === 3 &&
      document.getElementById('left').textContent.trim() === '');
    r.messageAreaSpansWidthBelowPanes = await page.evaluate(() => {
      const m = document.querySelector('main').getBoundingClientRect();
      const f = document.getElementById('messages').getBoundingClientRect();
      return f.top >= m.bottom - 1 && Math.abs(f.width - m.width) <= 1 && f.height > 0;
    });

    // No ideas: list empty, edit area blank and not editable, no message.
    r.noIdeasListEmpty = await rowCount(page) === 0;
    r.noSelectionTextBlank = await value(page) === '';
    r.noSelectionNotEditable = await page.$eval('#text', e => e.disabled === true);
    r.noMessageAreaEmpty = await messageText(page) === '' &&
      await page.$eval('#message-dismiss', e => e.hidden === true);

    // The message list: opened and closed by its button; "No messages" first.
    await page.click('#message-list-button');
    const emptyList = await listEntries(page);
    r.messageListSaysNoMessages = await page.$eval('#message-list', e => e.hidden === false) &&
      emptyList.length === 1 && emptyList[0].none && emptyList[0].body === 'No messages';
    await page.click('#message-list-button');
    r.messageListClosesOnItsButton = await page.$eval('#message-list', e => e.hidden === true);
    await shot('a0-empty');

    // One load: the full set minus its two blank items, which the update that
    // follows the load deletes, silently.
    await page.click('#load-test-data');
    r.oneLoadGivesFullSet = await rowCount(page) === 17;
    r.blankLoadedContentNeverAppears = await emptyCount(page) === 0;
    r.loadedStrippingIsSilent = await messageText(page) === '' &&
      (await listEntries(page)).every(e => e.none);

    // Ordering and titles.
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
      return !!w && w.scrollWidth > w.clientWidth &&
        getComputedStyle(w).textOverflow === 'ellipsis';
    });

    // Select the large idea: the edit area scrolls vertically only.
    await page.click('#ideas li:has-text("A very large idea") >> nth=0');
    r.selectedShowsText = (await value(page)).startsWith('A very large idea');
    r.selectedHighlighted = await page.$$eval('#ideas li.selected', ls =>
      ls.length === 1 && ls[0].textContent === 'A very large idea');
    r.editAreaScrollsVertically = await page.$eval('#text', e => e.scrollHeight > e.clientHeight);
    r.editAreaNoHorizontalScroll = await page.$eval('#text', e => e.scrollWidth <= e.clientWidth);
    await shot('a1-large-selected');

    // More loads: own identities, selection survives, panes scroll on their own.
    await page.click('#load-test-data');
    await page.click('#load-test-data');
    r.eachLoadAppendsCopy = await rowCount(page) === 51;
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

    // ================= Sequence B: editing (Edit ideas) =================
    await page.goto(file);
    await page.click('#load-test-data');
    await page.click('#load-test-data');
    await page.click('#load-test-data');

    // New: a blank idea, selected, at the top, with the insertion point at the
    // beginning of the edit area.
    await page.click('#new');
    r.newGivesBlankSelectedAtTop = await page.$$eval('#ideas li', ls =>
      ls.length === 52 && ls[0].classList.contains('selected') &&
      ls[0].classList.contains('empty') && ls[0].textContent === '(empty)');
    r.newIsEditableWithCaretAtStart = await page.evaluate(() => {
      const t = document.getElementById('text');
      return document.activeElement === t && t.disabled === false &&
        t.value === '' && t.selectionStart === 0 && t.selectionEnd === 0;
    });

    // Scroll the selected row out of view first, so that "stays visible" means
    // the list actually scrolled back to it.
    await page.$eval('#middle', e => { e.scrollTop = e.scrollHeight; });
    await page.keyboard.type('Aardvark');
    r.listFollowsTypingImmediately = await page.$$eval('#ideas li.selected', ls =>
      ls.length === 1 && ls[0].textContent === 'Aardvark' && !ls[0].classList.contains('empty'));
    r.movesToItsAlphabeticalPosition = await inOrder(page) && await emptyCount(page) === 0;
    r.selectedRowStaysVisible = await page.evaluate(() => {
      const row = document.querySelector('#ideas li.selected').getBoundingClientRect();
      const pane = document.getElementById('middle').getBoundingClientRect();
      return row.top >= pane.top - 1 && row.bottom <= pane.bottom + 1;
    });

    // Undo and redo of one change: a run of typed characters is one change.
    await page.keyboard.press('Control+z');
    r.undoRevertsMostRecentChange = await value(page) === '' &&
      await page.$$eval('#ideas li.selected', ls =>
        ls.length === 1 && ls[0].classList.contains('empty'));
    r.blankActiveIdeaIsNotDeleted = await rowCount(page) === 52;
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
    r.undoNeverChangesOtherIdeas = await rowCount(page) === 52;

    // ---- Leading whitespace ----
    // Typed at the start it is stripped as it arrives, with a message, and it
    // leaves no undo entry: one undo goes back past the "!" that preceded it.
    await pickRow(page, 'mango sorbet');
    await caretTo(page, 'end');
    await page.keyboard.type('!');
    await caretTo(page, 0);
    await page.keyboard.type(' ');
    r.leadingWhitespaceStrippedAsTyped = await value(page) === 'mango sorbet!' &&
      await page.$eval('#text', e => e.selectionStart === 0);
    r.leadingWhitespaceMessageShown = await messageText(page) === MESSAGE &&
      await page.$eval('#message-dismiss', e => e.hidden === false);
    await page.keyboard.press('Control+z');
    r.strippingLeavesNoUndoEntry = await value(page) === 'mango sorbet';

    // A replacement is one change, like a paste; whatever leading whitespace it
    // brings is stripped, and undo never brings the stripped whitespace back.
    await selectRange(page, 0, 1);
    await page.keyboard.type(' ');
    r.replacementIsOneChangeAndStrips = await value(page) === 'ango sorbet';
    await page.keyboard.press('Control+z');
    r.undoDoesNotRestoreStrippedWhitespace = await value(page) === 'mango sorbet';

    // ---- Undo grouping by units ----
    // "Walnut desk plans": six backspaces remove "plans" and the space before
    // it — one unit, one change. The seventh reaches the previous unit and
    // starts a new change.
    await pickRow(page, 'Walnut desk plans');
    await caretTo(page, 'end');
    await press(page, 'Backspace', 6);
    const afterUnit = await value(page);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Control+z');
    r.deletingOneUnitIsOneChange = afterUnit === 'Walnut desk' &&
      await value(page) === 'Walnut desk';
    await page.keyboard.press('Control+z');
    r.deletingIntoAnotherUnitStartsANewChange = await value(page) === 'Walnut desk plans';

    // Typing: a run ends where whitespace begins, and a sequence of whitespace
    // goes with the text that follows it.
    await page.click('#new');
    await page.keyboard.type('hello   world');
    await page.keyboard.press('Control+z');
    r.typedRunEndsAtWhitespace = await value(page) === 'hello';
    await page.keyboard.press('Control+z');
    r.whitespaceGroupsWithFollowingText = await value(page) === '';

    // A blank idea survives while it is active and goes when it is left.
    r.blankIdeaRemainsWhileActive = await rowCount(page) === 53 &&
      await page.$$eval('#ideas li.selected', ls =>
        ls.length === 1 && ls[0].classList.contains('empty'));
    await page.click('#ideas li:has-text("lighthouse tour") >> nth=0');
    r.blankIdeaDeletedOnLeaving = await rowCount(page) === 52;

    // Emptied while editing: the entry shows "(empty)" but the idea remains,
    // and its undo history is intact.
    await pickRow(page, 'Dinosaur museum trip');
    await selectRange(page, 0, 'end');
    await page.keyboard.press('Backspace');
    r.emptiedIdeaShowsPlaceholderButRemains = await rowCount(page) === 52 &&
      await value(page) === '' &&
      await page.$$eval('#ideas li.selected', ls =>
        ls.length === 1 && ls[0].classList.contains('empty'));
    await shot('b1-editing');
    await page.keyboard.press('Control+z');
    r.momentarilyBlankKeepsItsHistory = await value(page) === 'Dinosaur museum trip' &&
      await rowCount(page) === 52;
    await page.keyboard.press('Control+Shift+z');
    await page.click('#ideas li:has-text("kite festival weekend") >> nth=0');
    r.emptiedIdeaDeletedOnLeaving = await rowCount(page) === 51;

    // Re-selecting the already-selected idea is not leaving it.
    await page.click('#new');
    await page.click('#ideas li.selected');
    r.reselectingSameIdeaDeletesNothing = await rowCount(page) === 52 &&
      await page.$$eval('#ideas li.selected', ls =>
        ls.length === 1 && ls[0].classList.contains('empty'));

    // Repeating New never piles up blank ideas: there is only ever one.
    await page.click('#new');
    await page.click('#new');
    await page.click('#new');
    r.newWhileBlankDoesNotPileUp = await rowCount(page) === 52 &&
      await emptyCount(page) === 1;

    // The history is cleared when another idea is selected.
    await pickRow(page, 'Quantum garden');
    await caretTo(page, 'end');
    await page.keyboard.type('zzz');
    const edited = await value(page);
    await page.click('#ideas li:has-text("Walnut desk plans") >> nth=0');
    await page.click('#ideas li:has-text("Quantum garden") >> nth=0');
    await page.keyboard.press('Control+z');
    r.historyClearedOnSelectingAnother = await value(page) === edited && edited.endsWith('zzz');

    // The history is cleared when New is issued: undo after New leaves the
    // previous idea exactly as it was.
    await page.click('#new');
    await page.keyboard.press('Control+z');
    const blankAfterNew = await value(page) === '';
    await page.click('#ideas li:has-text("Quantum garden") >> nth=0');
    r.historyClearedOnNew = blankAfterNew && await value(page) === edited &&
      await rowCount(page) === 51;

    // The editor keeps the insertion point in view: with the caret at the end
    // of a text larger than the area, and the area scrolled back to the top,
    // typing must bring the caret's line into view again.
    await pickRow(page, 'A very large idea');
    await caretTo(page, 'end');
    await page.$eval('#text', e => { e.scrollTop = 0; });
    await page.keyboard.type('X');
    r.typingAtEndScrollsEditorToCaret = await page.$eval('#text', e => {
      const style = getComputedStyle(e);
      const slack = (parseFloat(style.paddingBottom) || 0) + (parseFloat(style.lineHeight) || 24);
      return e.scrollTop > 0 && (e.scrollHeight - e.scrollTop - e.clientHeight) <= slack;
    });

    // ---- The message area and the message list ----
    // Two "leading whitespace" messages have been produced so far.
    await page.click('#message-list-button');
    const entries = await listEntries(page);
    r.messageListNewestFirstWithTimes = entries.length === 2 &&
      entries.every(e => /^\d\d:\d\d:\d\d$/.test(e.time) && e.body === MESSAGE) &&
      entries[0].time >= entries[1].time;
    r.identicalMessagesAreSeparateEntries = entries.length === 2 &&
      entries[0].body === entries[1].body;
    r.messageListScrollsWhenTall = await page.evaluate(() => {
      const panel = document.getElementById('message-list');
      const ul = document.getElementById('message-entries');
      return getComputedStyle(ul).overflowY === 'auto' &&
        panel.getBoundingClientRect().height <= window.innerHeight;
    });
    await shot('b2-message-list');
    await page.click('#message-list-close');
    r.messageListClosesOnItsOwnX = await page.$eval('#message-list', e => e.hidden === true);

    // The × dismisses the current message; the list keeps it.
    await page.click('#message-dismiss');
    r.messageDismissedByX = await messageText(page) === '' &&
      await page.$eval('#message-dismiss', e => e.hidden === true) &&
      (await listEntries(page)).length === 2;

    // A new message takes the area again, and is one more entry in the list.
    await page.focus('#text');
    await caretTo(page, 0);
    await page.keyboard.type(' ');
    r.newMessageReplacesTheCurrentOne = await messageText(page) === MESSAGE &&
      (await listEntries(page)).length === 3;
    r.messageAreaTruncatesLongMessages = await page.$eval('#message-text', e => {
      const s = getComputedStyle(e);
      return s.whiteSpace === 'nowrap' && s.overflow === 'hidden' &&
        s.textOverflow === 'ellipsis';
    });

    // Messages are not kept across sessions.
    await page.goto(file);
    await page.click('#message-list-button');
    const afterReload = await listEntries(page);
    r.messagesNotKeptAcrossSessions = afterReload.length === 1 && afterReload[0].none &&
      await messageText(page) === '' && await rowCount(page) === 0;

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
