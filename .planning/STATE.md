# Project State

**Last updated:** 2026-06-01

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-01)

**Core value:** Property businesses get a professional website with a CMS — no developer needed to manage listings and capture leads.

**Current focus:** Phase 2.3 complete — Media collection created

## Project Model

**Website Agency Model (MVP)**
- We build complete websites + CMS for property businesses
- Not a self-service SaaS (that's Version 2)

## Demo Client

**Not Just A Stay** (Airbnb vertical)
- Website: https://www.notjustastay.com
- Vertical: Airbnb/Short-let properties
- Scope: Import all property details and photographs from existing site
- Account: Single account for MVP

## Phase Status

| Phase | Status | Plans | Progress |
|-------|--------|-------|----------|
| 1 — Infrastructure Setup | ✅ Complete | 3/3 | 100% |
| 2 — Data Layer | 📋 In progress | 4/4 | 75% (3/4) |
| 2.1 — Properties Collection | ✅ Complete | - | - |
| 2.2 — Leads Collection | ✅ Complete | - | - |
| 2.3 — Media Collection | ✅ Complete | - | - |
| 3 — Activities & Inquiry | ○ Pending | 0/3 | 0% |
| 4 — Search & Maps | ○ Pending | 0/4 | 0% |
| 5 — Storefront SSR | ○ Pending | 0/4 | 0% |
| 6 — Admin Polish | ○ Pending | 0/2 | 0% |

## Execution State

**Mode:** yolo (auto-approve)
**Parallelization:** enabled
**Current wave:** none

## Notes

- MVP: Build website for Not Just A Stay as proof of concept
- Shopify-style SaaS is Version 2
- 6 phases total for MVP
- Vertical: Airbnb (Agent & Builder are future clients)

## Roadmap Correction (2026-06-01)

Phase 1 context discussion revealed fundamental misalignment:
- Original: Multi-tenant SaaS with subdomain routing
- Corrected: Website agency model — we build & deploy for each client

Updated ROADMAP.md and PROJECT.md accordingly.

## Demo Client Info

| Field | Value |
|-------|-------|
| Client | Not Just A Stay |
| URL | https://www.notjustastay.com |
| Vertical | Airbnb/Short-let |
| Data to import | Property details, photographs |

## Recent Commits

- `a5f9dda` — docs(phase-2): Add 2.3 execution summary for Media collection
- `6182e03` — docs(phase-2): Add 2.1 execution summary
- `0fce52d` — feat(phase-2): Replace PropertiesStub with full Airbnb collection
- `e75e8ac` — feat(phase-2): add Leads collection for inquiry capture
- `b87ca93` — fix(phase-2): address checker issues
- `e06807c` — docs(phase-2): create phase 2 data layer plans
- `7b0643d` — docs(phase-2): capture demo client context
- `c25b0e8` — docs: revise roadmap for MVP-first approach
- `f80a085` — feat(phase-1): complete infrastructure setup
