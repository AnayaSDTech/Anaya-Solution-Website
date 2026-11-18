// Node-side content loader for build scripts and react-router.config.js.
// (Vite's import.meta.glob is not available outside the Vite pipeline.)
import { readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const productsDir = path.join(root, 'src', 'content', 'products');

export async function loadAllProducts() {
  const files = (await readdir(productsDir)).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
  const products = [];
  for (const file of files) {
    const mod = await import(/* @vite-ignore */ pathToFileURL(path.join(productsDir, file)).href);
    products.push({ ...mod.default, __file: file });
  }
  return products;
}

export async function loadPublishedProducts() {
  return (await loadAllProducts()).filter((p) => p.published);
}
