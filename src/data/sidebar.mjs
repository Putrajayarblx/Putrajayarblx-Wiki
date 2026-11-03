import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { articleSlug, categorySlug } from './slugs.mjs';

const dir = join(process.cwd(), 'src/content/docs');

function readFrontmatter(file) {
  const raw = readFileSync(join(dir, file), 'utf8').replace(/^\uFEFF/, '');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!match) return data;
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    data[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

const files = readdirSync(dir).filter(
  (file) => /\.mdx?$/.test(file) && file !== 'index.mdx' && file !== '404.md'
);

const docs = files
  .map((file) => {
    const data = readFrontmatter(file);
    const fileBase = file.replace(/\.mdx?$/, '');
    const route = data.category
      ? `${categorySlug(data.category)}/${articleSlug(fileBase, data)}`
      : fileBase;
    return { ...data, route, label: data.title ?? fileBase };
  })
  .filter((doc) => doc.category);

const groups = new Map();
for (const doc of docs) {
  if (!groups.has(doc.category)) groups.set(doc.category, []);
  groups.get(doc.category).push(doc);
}

const preferred = ['Start here', 'City', 'Companies'];
const groupsSorted = [...groups.entries()].sort((a, b) => {
  const ia = preferred.indexOf(a[0]);
  const ib = preferred.indexOf(b[0]);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a[0].localeCompare(b[0]);
});

export const sidebar = groupsSorted.map(([label, items]) => ({
  label,
  items: items
    .sort(
      (a, b) =>
        Number(b.landing === 'true') - Number(a.landing === 'true') ||
        (a.title ?? '').localeCompare(b.title ?? '')
    )
    .map((doc) => ({ label: doc.label, slug: doc.route })),
}));
