import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const dir = join(process.cwd(), 'public', 'uploads');
const RASTER = new Set(['.png', '.jpg', '.jpeg', '.avif']);
const MAX_WIDTH = 1600;
const QUALITY = 80;

let made = 0;
let skipped = 0;

const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
for (const entry of entries) {
  if (!entry.isFile()) continue;
  const ext = extname(entry.name).toLowerCase();
  if (!RASTER.has(ext)) continue;

  const src = join(dir, entry.name);
  const out = join(dir, entry.name.slice(0, -ext.length) + '.webp');

  const [srcStat, outStat] = await Promise.all([
    stat(src),
    stat(out).catch(() => null),
  ]);

  if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) {
    skipped += 1;
    continue;
  }

  await sharp(src)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  const size = (await stat(out)).size;
  made += 1;
  console.log(
    `[uploads] ${entry.name} → ${entry.name.slice(0, -ext.length)}.webp ` +
      `(${Math.round(srcStat.size / 1024)} KB → ${Math.round(size / 1024)} KB)`
  );
}

console.log(`[uploads] ${made} converted, ${skipped} up to date`);
