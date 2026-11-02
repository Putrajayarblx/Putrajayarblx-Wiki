# Changelog

Notable changes to the wiki itself. Content edits are tracked in git history.

## 2026-11-02

### Added
- Mobile top-bar menu with search, theme toggle and quick links.
- Scroll progress indicator on every page.
- Hero search button that opens the search dialog.
- "Was this page helpful?" feedback and reading time on articles.
- Custom 404 page.
- Open Graph image, Apple touch icon and web manifest.
- JSON-LD (`WebSite`, `Organization`) and Vercel Analytics / Speed Insights.
- Contributing guide and pull request template.

### Changed
- Rebuilt on Astro Starlight; migrated from hand-rolled static pages.
- Rebranded to **Putrajaya.rblx Wiki** with palette sampled from the logo.
- Sidebar now auto-generates from `src/content/docs`.
- Icons bundled locally instead of loaded from two CDNs.
- Header is solid at the top and fades to transparent on scroll.
- Logo split into a header mark, hero artwork and favicon.

### Removed
- Legacy `wiki.html` / `wiki-article.html` pages (redirect to the new URLs).
