# Phase 1: Infrastructure Setup - Context

**Gathered:** 2026-05-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Docker Compose with Payload + Next.js + Postgres/PostGIS, all services connected and booting.
</domain>

<decisions>
## Implementation Decisions

### Monorepo Structure
- **D-01:** Payload CMS embedded inside Next.js via `@payloadcms/next` plugin (not standalone)
- **D-02:** pnpm workspaces monorepo structure with `payload/`, `frontend/`, and `packages/` directories
- **D-03:** Workspace packages for future shared utilities (`packages/shared/` for types, etc.)

### Development Workflow
- **D-04:** Docker Compose + volume mounts for hot reload (consistent with production)
- **D-05:** Standard ports: Next.js/Payload on 3000, Postgres on 5432
- **D-06:** VS Code debugging config (launch.json) for Payload and Next.js with attached debugger

### Environment Management
- **D-07:** `.env.example` template committed to repo with all variables documented
- **D-08:** Optional service placeholders: Google Places API, email (SendGrid/Resend), S3 storage

### Docker Configuration
- **D-09:** Use `postgis/postgis:15-3.4` image for Postgres with PostGIS extension
- **D-10:** Volume mounts for Postgres data persistence
- **D-11:** Environment variables configured for Payload DB connection

### Project Files
- **D-12:** `payload.config.ts` in root for Payload configuration
- **D-13:** Standard pnpm workspace config (`pnpm-workspace.yaml`)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Architecture & Stack
- `.planning/research/STACK.md` — Recommended libraries, PostGIS + Payload integration, version compatibility
- `.planning/research/ARCHITECTURE.md` — Project structure, recommended patterns, data flow

### Requirements
- `.planning/REQUIREMENTS.md` — Core requirements (MULTI-01-MULTI-04, AUTH-01-AUTH-04, PROP-01-PROP-15)
- `.planning/ROADMAP.md` — Phase 1 success criteria, plan breakdown (1.1 Docker Compose, 1.2 Payload, 1.3 Next.js)

### Project
- `.planning/PROJECT.md` — Tech stack constraints (Next.js, Payload, PostgreSQL, PostGIS, MapLibre, Docker Compose)
- `.planning/STATE.md` — Current project state

### External Docs
- [Payload CMS Docs](https://payloadcms.com/docs) — Framework integration, multi-tenancy patterns
- [PostGIS Documentation](https://postgis.net/docs/) — Geospatial functions
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) — Multi-tenancy

</canonical_refs>

<codebase_context>
## Existing Code Insights

### Reusable Assets
- No existing code yet — this is a greenfield project

### Established Patterns
- Multi-tenant SaaS architecture from ARCHITECTURE.md research
- Field composition pattern for vertical extensions (Properties/base + Properties/airbnb)
- Tenant-scoped access control via Payload ACLs

### Integration Points
- `frontend/middleware.ts` — subdomain extraction (Phase 3)
- `lib/payload.ts` — Payload client singleton (Phase 2)
- `lib/tenant.ts` — Tenant resolution (Phase 3)
- `payload/src/collections/` — Collection configs (Phase 2)

</codebase_context>

<specifics>
## Specific Ideas

- User prefers standard, well-established approaches over exotic configurations
- Want debugging support from the start for development productivity
- All optional service env vars included upfront to reduce future changes
</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 1-Infrastructure Setup*
*Context gathered: 2026-05-31*
