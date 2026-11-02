# Putrajaya of Roblox — Wiki

The community wiki for **Putrajaya of Roblox**, migrated from `putrajaya-of-roblox`.

## How it works

Plain static site — no build step, no framework.

- `index.html` — article directory with search and section filter
- `wiki-article.html` — renders one article (`?slug=<name>`)
- `script.js` — fetches `content/wiki/*.md` from the GitHub API, parses frontmatter, renders Markdown
- `.pages.yml` — Pages CMS config for editing articles in the browser
- `content/wiki/` — the articles, one Markdown file each

Because content is loaded client-side from the GitHub API, a new article appears as soon as it's committed — no redeploy needed.

## Adding an article

Through Pages CMS, or by adding `content/wiki/<slug>.md`:

```markdown
---
title: Your title
section: Departments
summary: One-line description shown in the directory.
---

Body in Markdown.
```

## Local preview

```sh
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Related

Main community site: https://putrajayarblx.github.io/putrajaya-of-roblox/
