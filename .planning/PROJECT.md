# Real Estate SaaS Platform

## What This Is

A multi-tenant SaaS platform — "Shopify for Real Estate." Three verticals run on one shared core: Airbnb/short-let owners, real estate agents, and property builders. Each tenant gets their own branded site on a subdomain (later: custom domains), populated only with their properties.

**This build**: Shared core + Airbnb vertical fully implemented. Agent and builder verticals scaffolded as extension points (data model ready, UI not built).

## Core Value

Property owners and agents can publish their listings and capture leads — without needing a developer.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Multi-tenant architecture with subdomain-based tenant resolution
- [ ] Shared data core: Tenant, User, Property, Lead, Media, POI cache
- [ ] Tenant-scoped access control via Payload ACLs
- [ ] Airbnb vertical: nightly/seasonal pricing, amenities, availability calendar, house rules, Activities (experiences)
- [ ] Agent vertical scaffold: buy/rent mode, listing status, filter/search extension points
- [ ] Builder vertical scaffold: Project → floorplans extension point
- [ ] Storefront: SSR pages for SEO (home, map view, property detail with POI map, activities, inquiry forms)
- [ ] Property filters: BHK type, property type, rent vs sale mode, furnishing, budget range, locality, amenities, pet policy, tenant preference, facing/floor/bathrooms, availability timing
- [ ] Google Places integration with POI caching
- [ ] Tenant-facing Payload admin forms polished for non-technical users

### Out of Scope

- Payments / Stripe billing — inquiry capture only for v1
- Live booking availability locking — inquiry capture only for v1
- Custom domains — subdomain-only for v1
- Theme marketplace / visual page builder
- Real-time features, queues, caching layers beyond POI cache

## Context

**Target users**: Property owners (Airbnb hosts), real estate agents, and property builders who need a branded web presence without building from scratch.

**Core differentiator**: Clean multi-tenant architecture that doesn't become a bloated monolith. Each vertical extends cleanly without polluting the shared core.

## Constraints

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS — no substitution
- **Backend/CMS/Admin**: Payload CMS (TypeScript) — no substitution
- **Database**: PostgreSQL + PostGIS — geospatial queries required
- **Maps**: MapLibre GL (frontend rendering) + Google Places API (POI data)
- **Auth**: Payload built-in authentication
- **Deployment**: Docker Compose (app + Postgres/PostGIS)
- **SEO**: Server-rendered storefront pages — non-negotiable (these sites rank on Google)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Payload CMS as backend+CMS+admin | Single TypeScript codebase, built-in auth/ACL, reduces vendor count | — Pending |
| PostGIS for geolocation | Native geospatial queries, works with Payload | — Pending |
| Inquiry-first (not live booking) | Payments/availability engine is v2; lead capture is v1 | — Pending |
| Subdomain tenant routing | Simplest to implement; custom domains layered on later | — Pending |
| BHK types: Studio, 1 RK, 1BHK, 2BHK, 3BHK, 4BHK, 5BHK+ | Full spectrum for Indian + international markets | — Pending |
| Property types: Apartment, Villa, Penthouse, Independent House, Plot/Land, Studio | All in scope per user confirmation | — Pending |
| Rent/Sale dual mode | Agent vertical supports both; user toggles filter on site | — Pending |
| POI categories: Restaurants/Cafes, Bars/Nightlife, Parks/Recreation, Beaches/Scenic | User-specified priority list | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-31 after initialization*
