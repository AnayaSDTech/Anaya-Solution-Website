// Base path the site is served from. "/" for the live site at the domain root.
// Set SITE_BASE (e.g. "/v2/") to build a copy that runs in a subfolder.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function normaliseBase(value) {
  const trimmed = (value ?? '').trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

export const siteBase = normaliseBase(process.env.SITE_BASE);
export const isSubfolderBuild = siteBase !== '/';

const root = fileURLToPath(new URL('../../', import.meta.url));

/** Folder whose contents are uploaded: build/client for "/", deploy/site-v2 for "/v2/". */
export function deployDirFor(base) {
  const name = base.replace(/\//g, '');
  // Kept outside build/ so a later live build (which empties build/) doesn't remove it
  return name ? path.join(root, 'deploy', `site-${name}`) : path.join(root, 'build', 'client');
}
