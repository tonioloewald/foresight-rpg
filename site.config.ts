import { defineSiteConfig } from 'tosijs-ui/site'
import { renderEntityViews } from './entity-views'

export default defineSiteConfig({
  // Render static tables + detail cards from static/data/*.json into the rules
  // pages BEFORE doc extraction, so the book (which ships no JS) has real HTML.
  // <foresight-table> then enhances it in the browser. See entity-views.ts.
  prebuild: renderEntityViews,
  name: 'ForeSight RPG',
  description: 'A streamlined modern edition of the ForeSight tabletop RPG.',
  baseUrl: 'https://foresight-rpg.com',
  basePath: process.env.BASE_PATH ?? '/', // custom domain (foresight-rpg.com) serves from root
  outputDir: 'docs',
  docPaths: ['src', 'README.md'],
  sectionsDir: 'src/docs',
  staticDirs: ['static'],
  bundleEntry: 'bundle.ts',
  // emit foresight-rpg.epub into docs/ on every build. `cover` is the committed,
  // web-optimized export (1414×2000, ~585KB) of the Affinity master in legacy/
  // (gitignored). Title defaults to `name` ("ForeSight RPG").
  epub: { author: 'Tonio Loewald', cover: 'static/cover.jpg' },
  // The book is a curated subset/sequence of the site — the site still shows everything.
  book: {
    // README is the home page (pinned top in nav) but sorted LAST in the book;
    // name it here so it leads as front matter.
    order: ['README'],
    // The character builder is pure JS with no static substrate — a stub chapter
    // in a book, so it stays out. (`skills.md` is IN: entity-views.ts renders its
    // table + cards at build time, so it's real HTML in the ePub.)
    // The `1986-*` pages are the raw original-edition restoration (site-only, a
    // different book) — kept out of the streamlined edition's ePub.
    exclude: [
      'character-builder.md',
      '1986-00-front-matter.md', '1986-01-foreword.md', '1986-02-characters.md',
      '1986-03-resolution.md', '1986-04-combat.md', '1986-05-travel.md',
      '1986-06-equipment.md', '1986-07-star-system.md', '1986-08-spacecraft.md',
      '1986-09-appendices.md', '1986-10-commentary.md',
    ],
  },
  host: 'static',
  port: 1986,                 // dev server (https://localhost:1986/)
  watchPaths: ['./static'],   // also rebuild when data/*.json change
  // NOTE: `icon` is required in practice — a navbar link without one renders
  // class="" and tosijs-ui's element builder throws on the empty class token.
  navbarLinks: [{ label: 'GitHub', icon: 'github', href: 'https://github.com/tonioloewald/foresight-rpg' }],
} as any)
