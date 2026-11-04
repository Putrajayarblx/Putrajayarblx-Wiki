# Putrajaya.rblx Wiki

![OpenGraph Image](./public/PutrajayaWikiLaunch.png)

The official Wiki of Putrajaya.rblx maintained by the community, approved by the devs. Covering all sorts of topics ranging from gameplay to community history.

The community wiki for **Putrajaya of Roblox**, built with [Astro Starlight](https://starlight.astro.build).

**Live:** https://putrajayarblx-wiki.vercel.app

## Stack

- **Astro 7** static build, deployed on Vercel
- **Starlight** docs theme — sidebar, dark mode, built-in Pagefind search, sitemap
- Articles live in `src/content/docs/` as Markdown
- Edited through Pages CMS (`.pages.yml`)

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

## Adding an article

Create `src/content/docs/<slug>.md`:

```markdown
---
title: Your title
description: One-line summary shown in search and previews.
---

Body in Markdown.
```

Then add it to the sidebar in `astro.config.mjs`:

```js
sidebar: [
  { label: 'City', items: ['your-slug'] },
]
```

## Layout

| Path | Purpose |
|---|---|
| `astro.config.mjs` | Site metadata, sidebar, integrations |
| `src/content/docs/` | Articles (Markdown/MDX) |
| `src/styles/custom.css` | Brand colours |
| `public/` | Static files copied verbatim (`uploads/`, legacy redirects) |
| `.pages.yml` | Pages CMS collections |

## Legacy URLs

`public/wiki.html` and `public/wiki-article.html` keep old links working:

- `/wiki.html` → `/`
- `/wiki-article.html?slug=city-roles` → `/city-roles/`

## Related

Main community site: https://putrajayarblx.github.io/putrajaya-of-roblox/
