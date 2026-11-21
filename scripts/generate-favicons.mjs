import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'src/assets/logo-mark.png');
const output = path.join(root, 'public');
const sizes = [16, 32, 48, 96, 144, 180, 192, 512];

await mkdir(output, { recursive: true });

// Use the emblem from the full mark without the wordmark, which is
// unreadable at favicon sizes. The crop is centred in a transparent square.
const emblem = await sharp(source)
  .extract({ left: 90, top: 0, width: 320, height: 245 })
  .png()
  .toBuffer();

const pngs = new Map();
for (const size of sizes) {
  const buffer = await sharp(emblem)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  pngs.set(size, buffer);
  // Keep the existing URLs valid while the cache-busted v2 URLs are linked.
  await writeFile(path.join(output, `icon-${size}.png`), buffer);
  await writeFile(path.join(output, `icon-${size}-v2.png`), buffer);
}

// Build a multi-size favicon.ico with PNG entries for the root fallback.
const icoSizes = [16, 32, 48];
const entries = icoSizes.map((size) => ({ size, png: pngs.get(size) }));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);

const directory = Buffer.alloc(16 * entries.length);
let offset = 6 + directory.length;
entries.forEach((entry, index) => {
  const item = directory.subarray(index * 16, (index + 1) * 16);
  item.writeUInt8(entry.size, 0);
  item.writeUInt8(entry.size, 1);
  item.writeUInt8(0, 2);
  item.writeUInt8(0, 3);
  item.writeUInt16LE(1, 4);
  item.writeUInt16LE(32, 6);
  item.writeUInt32LE(entry.png.length, 8);
  item.writeUInt32LE(offset, 12);
  offset += entry.png.length;
});

await writeFile(
  path.join(output, 'favicon.ico'),
  Buffer.concat([header, directory, ...entries.map((entry) => entry.png)])
);

const svgPng = await sharp(emblem)
  .resize(64, 64, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${svgPng.toString('base64')}"/></svg>`;

await writeFile(path.join(output, 'favicon.svg'), svg);
await writeFile(path.join(output, 'favicon-v2.svg'), svg);

console.log(
  `[favicons] generated ${sizes.map((size) => `${size}x${size}`).join(', ')} + favicon.ico`
);
