import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const RASTER = new Set(['.png', '.jpg', '.jpeg']);

/** Rewrite /uploads/*.png|jpg to the generated .webp sibling when it exists. */
export default function remarkUploads() {
  return (tree) => {
    const visit = (node) => {
      if (
        node.type === 'image' &&
        typeof node.url === 'string' &&
        node.url.startsWith('/uploads/') &&
        RASTER.has(extname(node.url).toLowerCase())
      ) {
        const webp = node.url.replace(/\.(png|jpe?g)$/i, '.webp');
        if (existsSync(join(process.cwd(), 'public', webp))) node.url = webp;
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}
