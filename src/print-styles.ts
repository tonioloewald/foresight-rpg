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
  table, figure, .fs-panel, .ev-card { break-inside: avoid; page-break-inside: avoid; }
  tr, li { break-inside: avoid; page-break-inside: avoid; }
  thead { display: table-header-group; }

  /* ── the character sheet: the character, not the editor ────────────── */
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
