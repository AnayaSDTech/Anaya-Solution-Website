# Deploying to Hostinger

The website is a static site: plain HTML, CSS, JavaScript and images, with no Node.js server or database. It runs on any Hostinger **Web Hosting** plan (Premium, Business, Cloud) using the normal `public_html` folder.

## Test copy at anaya.uk/v2 (WordPress stays live)

Use this to review the new site on the real server before it replaces WordPress.

**Build:**
```bash
cd frontend
npm run build:hostinger:v2      # creates deploy/anaya-website-hostinger-v2.zip
npm run preview:v2              # optional local check at http://localhost:4173/v2/
```

This build differs from the live build:
- Every link, image and script path starts with `/v2/`.
- Every page is marked `noindex, nofollow` (meta tag + `X-Robots-Tag` header), so search engines won't list it.
- It has its own `.htaccess` that only applies inside `/v2/`. It forces HTTPS, serves clean URLs, and shows the not-found page for unknown URLs. It has **no** old-URL redirects and **no** HSTS, so it doesn't affect WordPress or the rest of the domain.

**Upload:**
1. In hPanel → **File Manager**, open `public_html` and create a folder named **`v2`** (lowercase, exactly this name; the build expects it).
2. Open `public_html/v2`, click **Upload**, and choose `anaya-website-hostinger-v2.zip`.
3. Right-click the zip → **Extract** → extract into `public_html/v2` itself. `index.html` and `.htaccess` must sit directly inside `v2/`, not in `v2/anaya-website-hostinger-v2/`.
4. Delete the zip.
5. Leave everything else in `public_html` (WordPress) untouched.

**Check** (in a private window):

| URL | Expected |
|---|---|
| `https://anaya.uk/v2/` | New home page with styles and logo |
| `https://anaya.uk/v2` | Redirects to `/v2/` |
| `https://anaya.uk/v2/products/open-banking` | Product page |
| `https://anaya.uk/v2/about/` | Redirects to `/v2/about` |
| `https://anaya.uk/v2/does-not-exist` | New "Page not found" page (not WordPress's) |
| `https://anaya.uk/` | The current WordPress site, unchanged |

**Updating the test copy:** rebuild with `npm run build:hostinger:v2`, delete the old `public_html/v2/assets` folder, then upload and extract the new zip into `public_html/v2` (overwrite).

**If `anaya.uk/v2/...` pages show WordPress's 404 page:** the `.htaccess` inside `v2/` is missing (enable **Show hidden files**) or was extracted into a subfolder.

**Moving to the live site later:** don't move the `v2` files up. They only work under `/v2/`. Build the live version with `npm run build:hostinger` and follow the steps below, then delete `public_html/v2`.

---

# Live site at anaya.uk (replaces WordPress)

## 1. Build the package

```bash
cd frontend
npm install                # first time only (needs Node.js 22.22 or later)
npm run build:hostinger
```

This creates **`frontend/deploy/anaya-website-hostinger.zip`**, which contains:

| In the zip | Purpose |
|---|---|
| `index.html`, `about/index.html`, `products/open-banking/index.html`, … | Every page, pre-rendered |
| `assets/` | JavaScript, CSS and fonts (file names change on every build) |
| `images/`, `favicon.svg`, `robots.txt`, `sitemap.xml` | Static files |
| `.htaccess` | Clean URLs (`/about`), HTTPS and non-www redirect, old-URL redirects, security headers, 404 page |
| `assets/.htaccess` | Long-term caching for build assets |
| `__spa-fallback.html` | Served for unknown URLs (404). The browser then shows the "Page not found" page |

## 2. Before the first upload

1. **Back up the current site.** The current anaya.uk is a WordPress site. In hPanel, go to **Websites → Manage → Files → Backups** and download a backup of the files and the database. Replacing `public_html` removes WordPress from public view (the database is not touched).
2. **SSL.** In hPanel, go to **Security → SSL** and make sure the certificate for anaya.uk is **Active**. The `.htaccess` forces HTTPS, so the site will not load until SSL is active.

## 3. Upload

1. In hPanel, open **Websites → Manage → File Manager** and go into **`public_html`**.
2. **Empty `public_html`** (after the backup above): select everything and delete it, including WordPress files, `default.php` and the old `.htaccess`.
   - Hidden files such as `.htaccess` may not show by default. Turn on **Show hidden files** in File Manager settings.
3. Click **Upload**, choose `anaya-website-hostinger.zip`, and wait for it to finish.
4. Right-click the zip → **Extract** → extract into **`public_html`** itself, not a subfolder. `index.html` must sit directly in `public_html`.
5. Delete the zip from `public_html`.

> **FTP alternative:** upload the **contents** of `frontend/build/client/` (not the folder itself) into `public_html` with FileZilla, using the FTP details from hPanel → Files → FTP Accounts. Make sure `.htaccess` is uploaded; some FTP clients hide dot-files.

## 4. Check the live site

Open each of these in a private/incognito window:

| Test | Expected result |
|---|---|
| `https://anaya.uk/` | Home page |
| `https://anaya.uk/products` and `https://anaya.uk/products/open-banking` | Products page and product page (no trailing slash, no redirect loop) |
| `https://anaya.uk/about/` | Redirects to `/about` |
| `http://anaya.uk/` and `https://www.anaya.uk/` | Redirect to `https://anaya.uk/` |
| `https://anaya.uk/expertise/` and `https://anaya.uk/career/` | Redirect to `/technology` and `/careers` (old WordPress URLs) |
| `https://anaya.uk/this-does-not-exist` | "Page not found" page |
| Click through the menu, open a product, use the product filters, submit the contact form | Everything works; the form opens your email app addressed to info@anaya.uk |

Then submit `https://anaya.uk/sitemap.xml` in **Google Search Console**.

## 5. Updating the site later

1. Make changes (for example edit `src/content/...`).
2. Run `npm run build:hostinger`.
3. In File Manager, **delete the old `assets` folder** in `public_html` (old files are never reused), then upload and extract the new zip over the rest, overwriting existing files.

Pages are sent with `Cache-Control: no-cache`, so visitors see updates straight away. If Hostinger's **CDN** or **LiteSpeed Cache** is enabled, purge the cache in hPanel after each upload.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Too many redirects" on every page | SSL is not active yet, or Cloudflare/CDN "Flexible SSL" is in front of the site. Activate SSL in hPanel (step 2), or remove the HTTPS rule (block 1) in `.htaccess`. |
| "Too many redirects" only on pages like `/about` | The server is adding a trailing slash before our rules run. Delete rule block 3 ("Canonical URLs have no trailing slash") in `public_html/.htaccess`. Pages will then also work at `/about/`. |
| Pages work but `/about` shows a 404 or directory error | `.htaccess` was not uploaded. Check hidden files in `public_html`. |
| Site shows the old WordPress site or Hostinger's default page | Old files are still in `public_html` (e.g. `index.php`, `default.php`) and take priority. Delete them. |
| Styles or scripts missing after an update | Clear the Hostinger cache/CDN in hPanel and make sure the new `assets` folder was extracted. |
| The domain should use `www.anaya.uk` | Change `url` in `src/content/site.js` to `https://www.anaya.uk`, adjust rule block 1 in `scripts/lib/host-config.js`, and rebuild. |

The `.htaccess` is generated by `scripts/lib/host-config.js`. Make permanent changes there, not in the uploaded file, or the next build will overwrite them.
