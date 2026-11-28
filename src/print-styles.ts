// Print styles for the site — injected globally from bundle.ts.
//
// WHY JS AND NOT A STYLESHEET: there is no site-wide CSS file. The doc-system
// ships `doc-system.css` and we have no hook to add a second <link>, so the one
// thing that runs on every page is the bundle. Injecting a <style media="print">
// costs nothing and keeps the rules in version control next to the component
// they mostly serve.
//
// WHAT IT IS FOR: a printed page should be the *document*, not the application.
// Screen chrome (nav tree, header, theme buttons) and editing affordances
// (steppers, Add/Delete, the Save/Load panel) are how you got the content —
// they are not the content, and on paper they are noise that costs ink and
// column width.

const CSS = `
@page { margin: 14mm; }

@media print {
  /* ── site chrome: not the document ─────────────────────────────────── */
  nav, header, footer,
  .doc-nav, .nav-toggle, .nav-branch-head,
  tosi-doc-system [part="header"],
  tosi-doc-system [part="toolbar"],
  tosi-doc-system [part="sidebar"],
  tosi-doc-system [part="menu"],
  .doc-menu, .doc-header, .doc-footer, .doc-toolbar,
  tosi-dialog, .tosi-notification, #tosi-notifications {
    display: none !important;
  }

  /* The sidenav is a GRID with a fixed nav column (200px 1fr). Hiding the nav
     leaves the column, and the page prints with a blank gutter down the left. */
  tosi-sidenav, tosi-doc-system > div {
    display: block !important;
    grid-template-columns: none !important;
  }

  /* On a page that IS an application — the character builder — the prose around
     it is interface, not content: the H1 and the "here is what this tool does"
     paragraph belong on screen and not on a printed character sheet. Scoped
     with :has() so every other page still prints its heading and body. */
  article.doc-content:has(foresight-character-sheet) > *:not(foresight-character-sheet) {
    display: none !important;
  }

  /* the article is the page */
  html, body, tosi-doc-system, tosi-sidenav, .doc-content, article {
    display: block !important;
    width: auto !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
    float: none !important;
    position: static !important;
    overflow: visible !important;
    background: #fff !important;
    color: #000 !important;
  }

  /* paper is not a screen: no dark mode, no inset panels, no shadows */
  * {
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
    color: #000 !important;
  }

  a { text-decoration: none !important; }
  /* print the destination of real links, but not of every in-page anchor */
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.8em; opacity: 0.7; }

  /* ── keep blocks whole ─────────────────────────────────────────────── */
  h1, h2, h3, h4 { break-after: avoid-page; page-break-after: avoid; }
  /* NOT table or .fs-panel: the skills table is taller than a page, and a
     block that cannot fit gets clipped rather than kept whole. Rows are the
     right granularity, and a repeating header makes the break readable. */
  figure, .ev-card { break-inside: avoid; page-break-inside: avoid; }
  tr, li { break-inside: avoid; page-break-inside: avoid; }
  thead { display: table-header-group; }

  /* ── the character sheet: the character, not the editor ────────────── */

  /* Concept is prose and wants the page, not a 254px column. tosi-field renders
     as an inline-flex <label>, so widening the textarea alone does nothing —
     the label and its inner wrappers have to give too. */
  foresight-character-sheet label:has(textarea) {
    display: flex !important;
    width: 100% !important;
    align-items: baseline;
  }
  foresight-character-sheet label:has(textarea) > span,
  foresight-character-sheet label:has(textarea) tosi-slot {
    display: block !important;
    flex: 1 1 auto !important;
    width: auto !important;
  }
  foresight-character-sheet textarea {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    text-align: left !important;
  }
  foresight-character-sheet label:has(textarea) > [part="caption"] {
    flex: 0 0 auto !important;
    margin-right: 0.5em !important;
  }

  /* THE PRINTED SHEET IS FOR PLAY; THE APP IS FOR BUILDING. So nothing that
     only exists to help you generate or update a character goes on paper.

     Every "add a thing" row is a control: it carries an empty text box, a
     number spinner and a button, all of which print as stray furniture. They
     are the rows with buttons in them. */
  foresight-character-sheet .fs-row:has(button),
  foresight-character-sheet .fs-row:has(input[list]),
  foresight-character-sheet [part="slots"],
  foresight-character-sheet [part="pools"],
  foresight-character-sheet datalist,
  /* Points Awards is a ledger of where the build points came from — the purest
     generation info on the sheet. */
  foresight-character-sheet section:has([part="awardList"]) { display: none !important; }

  /* ATTRIBUTES: only the name and the Final value matter on paper — Base,
     Conferred, Bought and Cost are the arithmetic that got you there. The
     markup puts Final last, so hiding the middle leaves name → value. */
  /* Body cells are: abbr | name | base | conferred | bought | cost | steppers |
     final — keep 1, 2 and the last. The HEADER has one fewer cell, because
     "Attr" spans the two name columns, so its indices differ by one. */
  foresight-character-sheet [part="attrs"] td:nth-child(n+3):nth-child(-n+7),
  foresight-character-sheet [part="attrs"] th:nth-child(n+2):nth-child(-n+6) { display: none !important; }
  foresight-character-sheet [part="attrs"] td:first-child { font-weight: 700; width: 3em; }
  foresight-character-sheet [part="attrs"] td:last-child,
  foresight-character-sheet [part="attrs"] th:last-child { text-align: right !important; font-weight: 700; }

  /* BACKGROUND FACTORS: the names ARE the character on paper. Category says
     how the factor was filed and Grants is the build arithmetic — both are
     generation info, not play info. Collapse to a plain list of names. */
  foresight-character-sheet [part="bfList"] th,
  foresight-character-sheet [part="bfList"] thead,
  foresight-character-sheet [part="bfList"] td:nth-child(1),
  foresight-character-sheet [part="bfList"] td:nth-child(3),
  foresight-character-sheet [part="bfList"] td:nth-child(4),
  foresight-character-sheet [part="bfList"] td:last-child { display: none !important; }
  foresight-character-sheet [part="bfList"] table,
  foresight-character-sheet [part="bfList"] tbody,
  foresight-character-sheet [part="bfList"] tr { display: block !important; }
  foresight-character-sheet [part="bfList"] td {
    display: list-item !important;
    list-style: disc inside !important;
    border: 0 !important;
    padding: 0 0 0 0.4em !important;
  }

  /* ── the page is a two-column grid ──────────────────────────────────
     The panels are plain siblings with no wrapper, but the component root is
     their parent, so IT becomes the grid. Explicit placement beats floats:
     Skills runs down the left spanning two rows, with Fields and Quirks
     stacked beside it on the right. align-items:start stops short panels
     stretching to their row. */
  foresight-character-sheet {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    column-gap: 4mm;
    align-items: start;
  }
  foresight-character-sheet > section:has([part="nameField"]) { grid-column: 1 / -1; }
  foresight-character-sheet > section:has([part="attrs"])     { grid-column: 1; }
  foresight-character-sheet > section:has([part="bfList"])    { grid-column: 2; }
  foresight-character-sheet > section:has([part="skills"])    { grid-column: 1; grid-row: span 2; }
  foresight-character-sheet > section:has([part="fieldList"]) { grid-column: 2; }
  foresight-character-sheet > section:has([part="ltfList"])   { grid-column: 2; }

  /* Condition and Gear are EPHEMERAL — wounds, exhaustion and what you are
     carrying all change during play. They get their own page, so page 1 is the
     character and page 2 is the sheet you actually write on. */
  foresight-character-sheet > section:has([part="condNote"]) {
    grid-column: 1;
    break-before: page !important;
    page-break-before: always !important;
  }
  foresight-character-sheet > section:has(textarea[placeholder]) { grid-column: 2; }

  /* The element's no-JS fallback paragraph is a light-DOM child, so making the
     root a grid turned it into a grid ITEM and dropped it in among the panels.
     It is a message for a browser that never ran this code; it is not content. */
  foresight-character-sheet > p { display: none !important; }

  /* SKILLS: Skill, Formula, Score, BEF. Conf., Level and Max are how the score
     was arrived at and what it could become — build info. Formula stays
     because it is genuinely useful mid-game when an attribute changes. */
  foresight-character-sheet [part="skills"] th:nth-child(3),
  foresight-character-sheet [part="skills"] td:nth-child(3),
  foresight-character-sheet [part="skills"] th:nth-child(4),
  foresight-character-sheet [part="skills"] td:nth-child(4),
  foresight-character-sheet [part="skills"] th:nth-child(5),
  foresight-character-sheet [part="skills"] td:nth-child(5),
  foresight-character-sheet [part="skills"] th:nth-child(6),
  foresight-character-sheet [part="skills"] td:nth-child(6) { display: none !important; }
  foresight-character-sheet [part="skills"] table { font-size: 0.82em !important; }
  foresight-character-sheet [part="skills"] thead { display: table-header-group; }
  foresight-character-sheet [part="skills"] th:last-child,
  foresight-character-sheet [part="skills"] td:last-child,
  foresight-character-sheet [part="skills"] th:nth-last-child(2),
  foresight-character-sheet [part="skills"] td:nth-last-child(2) { text-align: right !important; }

  /* IDENTITY: the character's name is the title of the page, not a labelled
     field, and Archetype is a chargen shortcut nobody reads at the table. */
  foresight-character-sheet [part="nameField"] [part="caption"] { display: none !important; }
  foresight-character-sheet [part="nameField"] input {
    font-size: 20pt !important;
    font-weight: 700 !important;
    line-height: 1.1 !important;
  }
  foresight-character-sheet [part="nameField"] { display: block !important; width: 100% !important; }
  foresight-character-sheet tosi-field:has([part="archPick"]) { display: none !important; }

  /* TIGHTEN: the target is one sheet of paper, and screen line-heights are
     generous by design. The skills table is the bulk of the page, so it gets
     the hardest squeeze. */
  foresight-character-sheet { font-size: 9.5pt !important; line-height: 1.2 !important; }
  foresight-character-sheet .fs-panel { padding: 3pt 5pt !important; margin-bottom: 4pt !important; }
  foresight-character-sheet h3 { margin: 1pt 0 2pt !important; font-size: 1.05em !important; }
  foresight-character-sheet th, foresight-character-sheet td {
    padding: 0.5pt 3pt !important;
    line-height: 1.15 !important;
  }
  foresight-character-sheet [part="skills"] table { font-size: 8pt !important; }
  foresight-character-sheet [part="skills"] td,
  foresight-character-sheet [part="skills"] th { line-height: 1.1 !important; }
  /* the condition inputs are full-size form controls; they only need to hold
     one digit on paper */
  foresight-character-sheet input.fs-num,
  foresight-character-sheet input[type="number"] { width: 3em !important; line-height: 1.2 !important; }
  foresight-character-sheet textarea { line-height: 1.2 !important; }

  foresight-character-sheet .fs-step,
  foresight-character-sheet button,
  foresight-character-sheet select,
  foresight-character-sheet tosi-select,
  foresight-character-sheet input[type="file"],
  foresight-character-sheet .fs-savepanel,
  /* the setting-tag chips are a filter for editing, not part of the character */
  foresight-character-sheet tosi-segmented,
  /* ...and the row it sits in, or a bare "Genre:" prints with nothing after it */
  foresight-character-sheet .fs-row:has(tosi-segmented) {
    display: none !important;
  }

  /* a filled-in field should read as text, not as a form control */
  foresight-character-sheet input,
  foresight-character-sheet textarea {
    border: 0 !important;
    padding: 0 !important;
    resize: none !important;
    font: inherit !important;
    color: #000 !important;
    -webkit-appearance: none !important;
    appearance: none !important;
  }
  /* an empty field still needs somewhere to write by hand */
  foresight-character-sheet input:placeholder-shown {
    border-bottom: 1px solid #999 !important;
  }
  foresight-character-sheet textarea { height: auto !important; min-height: 3em !important; }

  /* the table borders carry the layout once the panels lose their fill */
  foresight-character-sheet .fs-panel {
    border: 1px solid #999 !important;
    margin-bottom: 8pt !important;
  }
  foresight-character-sheet th,
  foresight-character-sheet td { border-bottom: 1px solid #ccc !important; }

  details > summary { font-weight: 600; list-style: none; }
}
`

let injected = false

/** Add the print stylesheet once, on any page. Safe to call repeatedly. */
export function installPrintStyles() {
  if (injected || typeof document === 'undefined') return
  injected = true

  const style = document.createElement('style')
  style.setAttribute('media', 'print')
  style.setAttribute('data-foresight-print', '')
  style.textContent = CSS
  document.head.append(style)

  // A collapsed <details> is hidden by the user agent, and CSS cannot reliably
  // force it open — so open them for the duration of the print and put them
  // back afterwards. Otherwise half the character sheet silently doesn't print.
  let reclose: HTMLDetailsElement[] = []
  addEventListener('beforeprint', () => {
    reclose = [...document.querySelectorAll<HTMLDetailsElement>('details:not([open])')]
    for (const d of reclose) d.open = true
  })
  addEventListener('afterprint', () => {
    for (const d of reclose) d.open = false
    reclose = []
  })
}
