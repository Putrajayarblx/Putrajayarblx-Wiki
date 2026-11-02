# Contributing to the Putrajaya.rblx Wiki

Thanks for helping keep the wiki accurate. Everything here is Markdown, so a correction is usually a one-file change.

## Ways to help

- **Fix a mistake** — use the "Edit page" link at the bottom of any article.
- **Add context** — expand a thin section with what actually happens in-game.
- **Report outdated content** — [open an issue](https://github.com/Putrajayarblx/Putrajayarblx-Wiki/issues).
- **Improve the theme** — CSS lives in `src/styles/custom.css`.

## Editing an article

1. Open the article and click **Edit page** (bottom of the page), or edit the file directly in `src/content/docs/`.
2. Keep the frontmatter:

   ```yaml
   ---
   title: Clear, specific title
   description: One sentence used in search results and previews.
   ---
   ```

3. Write in plain language. Prefer short paragraphs, `##` headings, and lists over long walls of text.
4. Open a pull request. Small, focused PRs are reviewed fastest.

## Style guide

| Do | Don't |
|---|---|
| "The Police Department recruits in cycles." | "PD recruits whenever they feel like it." |
| Use `##` for sections (they become the table of contents) | Skip heading levels |
| Link to other pages with `/city-roles/` | Use full URLs for internal links |
| Use `:::note`, `:::tip`, `:::caution` for asides | Bold whole paragraphs for emphasis |

## Adding a new article

1. Create `src/content/docs/<slug>.md` with the frontmatter above.
2. Add it to the navigation — Starlight generates the sidebar from the folder, so no config change is needed.
3. Preview locally:

   ```sh
   npm install
   npm run dev
   ```

## What gets reviewed

- Factual accuracy against current community rules.
- Tone: helpful, neutral, no inside jokes.
- Links that resolve.

## Code of conduct

Be decent. Disagreements about content are fine; personal attacks are not.
