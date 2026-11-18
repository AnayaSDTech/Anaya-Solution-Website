// Full production build.
//   node scripts/build-site.js                    live site at the domain root   → build/client/
//   node scripts/build-site.js --base=/v2/        test copy in a subfolder       → deploy/site-v2/
//   add --zip to also create deploy/anaya-website-hostinger[-v2].zip for Hostinger
import { execFileSync, execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { root } from './lib/load-content.js';
import { normaliseBase, deployDirFor } from './lib/base.js';

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1];
const base = normaliseBase(arg('base') ?? process.env.SITE_BASE);
const isRoot = base === '/';
const wantZip = process.argv.includes('--zip');
const env = { ...process.env, SITE_BASE: base };
const run = (cmd) => execSync(cmd, { cwd: root, env, stdio: 'inherit' });

console.log(`\n▶ Building ANAYA website for base path "${base}"${isRoot ? ' (live site)' : ' (test copy)'}\n`);

// 1. Validate content, build and pre-render
run('node scripts/validate-content.js');
run('npx react-router build');

// 2. Assemble the deploy folder
const client = path.join(root, 'build', 'client');
const outDir = deployDirFor(base);
if (!isRoot) {
  // React Router writes pages to build/client/<base>/, while assets and public
  // files stay in build/client/. Put everything into one folder for upload.
  const pages = path.join(client, base.replace(/\//g, ''));
  rmSync(outDir, { recursive: true, force: true });
  cpSync(pages, outDir, { recursive: true });
  for (const name of readdirSync(client)) {
    if (['robots.txt', 'index.html', base.replace(/\//g, '')].includes(name)) continue;
    cpSync(path.join(client, name), path.join(outDir, name), { recursive: true });
  }
  // The empty app shell React Router generates for non-pre-rendered URLs
  cpSync(path.join(client, 'index.html'), path.join(outDir, '__spa-fallback.html'));
} else {
  // Sitemap only for the live site
  const { default: config } = await import('../react-router.config.js');
  const { site } = await import('../src/content/site.js');
  const paths = (await config.prerender()).filter((p) => p !== '/404');
  const today = new Date().toISOString().slice(0, 10);
  const priority = (p) =>
    p === '/' ? '1.0' : p.startsWith('/products') ? '0.9' : p.startsWith('/legal') || p === '/accessibility' ? '0.3' : '0.7';
  writeFileSync(
    path.join(client, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
      .map((p) => `  <url>\n    <loc>${site.url}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(p)}</priority>\n  </url>`)
      .join('\n')}\n</urlset>\n`,
  );
  console.log(`sitemap.xml written (${paths.length} URLs)`);
}

// 3. Host configuration
const { writeHostConfig } = await import('./lib/host-config.js');
const { legacyCount } = await writeHostConfig({ outDir, base });
console.log(`.htaccess written${isRoot ? ` (${legacyCount} old-URL redirects) + _redirects/_headers` : ` for ${base}`}`);

// 4. Optional zip for Hostinger
if (wantZip) {
  const deployDir = path.join(root, 'deploy');
  const zipName = isRoot ? 'anaya-website-hostinger.zip' : `anaya-website-hostinger-${base.replace(/\//g, '')}.zip`;
  const zipPath = path.join(deployDir, zipName);
  const entries = readdirSync(outDir).filter((n) => !['_redirects', '_headers'].includes(n));
  mkdirSync(deployDir, { recursive: true });
  rmSync(zipPath, { force: true });
  const isZip = () => existsSync(zipPath) && readFileSync(zipPath).subarray(0, 2).toString() === 'PK';
  try {
    // bsdtar (Windows 10+, macOS) writes zip with -a. Use the Windows copy by full
    // path so Git's GNU tar (which cannot write zip) is not picked up.
    const tar = process.platform === 'win32' ? path.join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe') : 'tar';
    execFileSync(tar, ['-a', '-c', '-f', zipPath, ...entries], { cwd: outDir, stdio: 'pipe' });
    if (!isZip()) throw new Error('not a zip');
  } catch {
    rmSync(zipPath, { force: true });
    execFileSync('zip', ['-r', '-q', zipPath, ...entries], { cwd: outDir, stdio: 'pipe' });
  }
  const mb = (statSync(zipPath).size / 1024 / 1024).toFixed(2);
  const target = isRoot ? 'public_html' : `public_html/${base.replace(/\//g, '')}`;
  console.log(`\n✔ Hostinger package: deploy/${zipName} (${mb} MB) — extract into ${target}`);
}

console.log(`\n✔ Done. Deploy folder: ${path.relative(root, outDir)}${isRoot ? '' : `  (preview: npm run preview -- --base=${base})`}\n`);
