// Minimal static server for previewing a production build the way Hostinger
// serves it: /about -> about/index.html, unknown paths -> SPA fallback (404).
//   npm run preview                  live build (build/client) at http://localhost:4173/
//   npm run preview -- --base=/v2/   test copy (deploy/site-v2) at http://localhost:4173/v2/
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { normaliseBase, deployDirFor } from './lib/base.js';

const base = normaliseBase(process.argv.find((a) => a.startsWith('--base='))?.split('=')[1] ?? process.env.SITE_BASE);
const dir = deployDirFor(base);
const port = Number(process.env.PORT) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

if (!existsSync(path.join(dir, 'index.html'))) {
  console.error(`No build found in ${dir}. Run the matching build first.`);
  process.exit(1);
}

function resolve(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0]);
  if (!pathname.startsWith(base) && pathname !== base.slice(0, -1)) return undefined;
  const rel = pathname.slice(base.length);
  const clean = path.normalize(rel).replace(/^(\.\.[/\\])+/, '');
  const candidates = [path.join(dir, clean), path.join(dir, clean, 'index.html')];
  return candidates.find((f) => f.startsWith(dir) && existsSync(f) && statSync(f).isFile());
}

createServer((req, res) => {
  if (base !== '/' && req.url === base.slice(0, -1)) {
    res.writeHead(301, { Location: base });
    return res.end();
  }
  const file = resolve(req.url ?? '/');
  const target = file ?? path.join(dir, '__spa-fallback.html');
  res.writeHead(file ? 200 : 404, { 'Content-Type': types[path.extname(target)] ?? 'application/octet-stream' });
  createReadStream(target).pipe(res);
}).listen(port, () => console.log(`Preview: http://localhost:${port}${base}`));
