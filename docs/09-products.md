# 09 Products

**Updated:** 2026-11-18. Replaces the four temporary products (FinSight, Pulse, TrustKey, Sentinel), which have been removed from the site.

The site now presents two real ANAYA products. Their content was written from each project's requirements documents and codebase. Only statements the code or architecture documents support are used. Both are labelled **[DRAFT]** until the product owner approves the wording.

| # | Product | Slug / file | Domain | Technologies | Status shown |
|---|---|---|---|---|---|
| 1 | ANAYA Open Banking | `open-banking` · `src/content/products/open-banking.js` | Financial (secondary: Security & Trust) | Financial Intelligence, Cybersecurity, PKI | In development |
| 2 | ANAYA CDM (Certificate Deployment Manager) | `cdm` · `src/content/products/cdm.js` | Security & Trust | PKI, Cybersecurity | In development |

## 1. ANAYA Open Banking

**Source:** `Open Banking/` (Business_Requirement_Document.md, Functional_Requirement_Specification.md, README.md, backend/app, frontend/src).

A UK Open Banking Third-Party Provider platform offering account information (AIS) and payment initiation (PIS).

| Website claim | Evidence |
|---|---|
| Redirect-only bank login; no credentials stored | BRD §1, §8; connectors return bank authorisation URL |
| OAuth 2.0 code flow with PKCE, server-side token exchange | `connectors/base.py` `exchange_code_for_tokens(code, code_verifier)`, `natwest_group_base.py` |
| Tokens encrypted at rest | `infrastructure/vault.py` (Fernet) |
| Accounts, balances, transactions; payments with status | `connectors/base.py`, `api/v1/payments.py` |
| Consent dashboard, revoke, expiry and re-authorisation | `services/consent_service.py`, `routes/ConsentDashboard.tsx` |
| Hash-chained audit log | `services/audit_service.py` |
| API monitoring per bank | `api/v1/monitoring.py`, `routes/Monitoring.tsx` |
| mTLS and JWS support | `infrastructure/http_client.py`, `infrastructure/jws.py` |
| RBS and NatWest (sandbox); new banks as connectors | `connectors/registry.py`, README |

**Deliberately not claimed:** FCA authorisation (the site states it is a requirement for live use), production bank access, target performance/uptime figures from the BRD, transaction categorisation, webhook handling (signature verification is still a TODO).

## 2. ANAYA CDM

**Source:** `CDM/` (backend/docs/requirements, backend/docs/ARCHITECTURE.md, SOLUTION_ARCHITECTURE.md, backend/cdm, frontend).

Automated TLS certificate lifecycle management: discover → landing → match → plan → deploy → confirm → retire.

| Website claim | Evidence |
|---|---|
| Discovery over WinRM/SSH, read-only `scan-server` | `transport/`, `discovery/`, ARCHITECTURE.md |
| ACME (Let's Encrypt) and approved-folder sources | `sources/acme.py`, `sources/folder.py` |
| Matching rules incl. downgrade guard and review queue | `matcher.py`, ARCHITECTURE.md |
| IIS, Windows store, Apache/Nginx, Java keystore adapters | `deploy/iis.py`, `windows_store.py`, `linux_web.py`, `java_keystore.py` |
| Canary then batches; verify; rollback | `deploy/engine.py`, ARCHITECTURE.md |
| CyberArk credentials in memory only | `vault/cyberark.py`, ARCHITECTURE.md |
| Hash-chained audit log | ARCHITECTURE.md (`logs/audit.jsonl`) |
| Web dashboard | `frontend/`, SOLUTION_ARCHITECTURE.md |

**Deliberately not claimed:** the AI root-cause agent (proposed only; the Errors screen is a scripted demo), BRD target metrics (e.g. "< 5 minutes for 100 servers"), production scale. The dashboard photo `backend/docs/CDM_Dashboard_demo.jpeg` shows a client environment and **must not** be used on the website.

## 2b. EchoLoop (added 2026-11-21)

**Source:** `docs/EchoLoop pitch deck (2).pptx` (pre-seed investor deck, Nov 2026). **File:** `src/content/products/echoloop.js`. Domain: Social. Technologies: Social Sentiment, AI & ML. Status: **Pilot** (confirmed by ANAYA). Order 1 (lead product on Home and Products).

AI-assisted replies at scale: comments on six platforms are grouped by theme, one grounded answer is drafted per group, a named person approves it, and it is delivered as a personal reply under each comment. EchoCore (own statistical models) handles fair voice weighting, emotions, crisis early warning, coordination detection and reply priority.

| Website claim | Deck slide |
|---|---|
| Six platforms (YouTube, Instagram, Facebook, TikTok, Bluesky, X); live connections depend on app review | 5 |
| Read → group → draft → approve → reply → learn | 4 |
| Named approvals, tamper-evident audit trail | 5, 6 |
| Open-weight models, never trained on customer data | 5 |
| Workspace isolation, UK hosting | 5, 10 |
| Fair voice weighting, eight emotions, crisis early warning, coordination detection | 6 |
| Enterprises can bring their own LLM | 11, 13 |
| Four audiences (creators, agencies, brands, PR) and their one-liners | 8 |
| Command-centre screenshot (demo workspace) → `public/images/products/echoloop/command-centre.png` | 5 |

**Deliberately not used:** market size, financial plan, the funding ask, competitor price tables, pricing and the trial offer, ownership structure (EchoLoop Ltd), team biographies.

## 2c. Build with us (development partner offer, added 2026-11-21)

New page `/build-with-us` (content in `src/content/build.js`), in the main menu and footer, with a teaser on Home and a hero button. Engagement models confirmed by ANAYA: **Idea to MVP**, **Full product build**, **AI features for existing products** (no prices, no co-ownership terms). "What we build" points at ANAYA's own products as proof. Contact form gains the enquiry type "Build a product with us" (prefilled from `/contact?type=build`). The old Services page stays switched off.

## 3. Open points for ANAYA

1. Confirm product names ("ANAYA Open Banking", "ANAYA CDM") and status "In development".
2. Approve the wording in both files (then remove the [DRAFT] header comment).
3. Resolved: EchoLoop is AI-led (AI & ML, Social Sentiment), so the "AI product company" positioning now has a flagship.
4. Resolved: the Social domain now has EchoLoop.
6. EchoLoop: confirm whether to link to an EchoLoop website or demo-booking page (`externalUrl`), and approve the wording.
7. Client logos: the deck lists Barclays, Lloyds, TSB and J.P. Morgan as team members' past employers. The temporary "Our Clients" strip was kept at ANAYA's request; confirm these are ANAYA clients with permission before launch.
5. Product screenshots (cleaned of client data) can be added through `media.hero` / `media.gallery`.
