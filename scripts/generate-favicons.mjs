import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'src/assets/logo-mark.png');
const output = path.join(root, 'public');
const sizes = [48, 96, 144, 180, 192, 512];

await mkdir(output, { recursive: true });

for (const size of sizes) {
  await sharp(source)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(path.join(output, `icon-${size}.png`));
}

console.log(`[favicons] generated ${sizes.map((size) => `${size}x${size}`).join(', ')}`);
