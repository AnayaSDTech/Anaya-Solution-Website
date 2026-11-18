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

## 3. Open points for ANAYA

1. Confirm product names ("ANAYA Open Banking", "ANAYA CDM") and status "In development".
2. Approve the wording in both files (then remove the [DRAFT] header comment).
3. Neither product currently uses AI/ML, while the home hero positions ANAYA as an AI product company. Confirm the positioning, or tag a product with `ai-ml` once AI features ship (e.g. the CDM error agent).
4. The Social domain has no product; its panel shows the domain description only.
5. Product screenshots (cleaned of client data) can be added through `media.hero` / `media.gallery`.
