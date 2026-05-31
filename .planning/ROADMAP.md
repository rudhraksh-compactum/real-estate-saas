# Roadmap: Real Estate SaaS Platform

**Defined:** 2026-05-31
**Granularity:** Standard (5-8 phases, 3-5 plans each)
**Project mode:** horizontal-layers
**Parallel execution:** enabled

## Phase Overview

| # | Phase | Goal | Requirements | Plans |
|---|-------|------|-------------|-------|
| 1 | Infrastructure Setup | Docker + Payload + Next.js + PostGIS connected | MULTI-04, PROP-02 | 3 |
| 2 | Shared Data Layer | Core collections with tenant isolation | MULTI-01, AUTH-01, AUTH-02, PROP-01, PROP-03, PROP-04, PROP-05, PROP-06, PROP-07, PROP-08, PROP-09, PROP-10, PROP-11, PROP-12, PROP-13, PROP-14, PROP-15, AGENT-01, AGENT-02, AGENT-03, AGENT-04, BLDR-01, BLDR-02, BLDR-03, LEAD-01, LEAD-02, LEAD-03, LEAD-04, POI-02, ADMIN-01, ADMIN-04, ADMIN-05 | 4 |
| 3 | Tenant Routing | Subdomain resolution + frontend tenant awareness | MULTI-01, MULTI-02, MULTI-03, AUTH-04 | 2 |
| 4 | Airbnb Vertical | Full Airbnb extension + Activities + Inquiry | AIRB-01, AIRB-02, AIRB-03, AIRB-04, AIRB-05, AIRB-06, AIRB-07, AIRB-08 | 3 |
| 5 | Search & Maps | Filters + MapLibre integration + POI caching | FILT-01, FILT-02, FILT-03, FILT-04, FILT-05, FILT-06, FILT-07, FILT-08, FILT-09, FILT-10, FILT-11, FILT-12, MAP-01, MAP-02, MAP-03, MAP-04, POI-01, POI-03, POI-04 | 4 |
| 6 | Storefront SSR | SEO-optimized pages for all public routes | FRONT-01, FRONT-02, FRONT-03, FRONT-04, FRONT-05, FRONT-06, FRONT-07, FRONT-08, FRONT-09, FRONT-10 | 4 |
| 7 | Admin Polish | Clean forms for non-technical users | ADMIN-02, ADMIN-03, ADMIN-06 | 2 |

---

## Phase 1: Infrastructure Setup

**Goal:** Docker Compose with Payload + Next.js + Postgres/PostGIS, all services connected and booting.

**Success Criteria:**
1. `docker compose up` starts all services without errors
2. Payload admin accessible at localhost:3000/admin
3. PostgreSQL connection verified with PostGIS extension
4. Spatial index created on geolocation field
5. Next.js frontend connects to Payload API

### Plans

Plans:
- [x] 1.1-PLAN.md — Docker Compose with Postgres/PostGIS and app service
- [x] 1.2-PLAN.md — Payload CMS integration with monorepo structure
- [x] 1.3-PLAN.md — Next.js frontend with tenant-aware routing

**1.1: Docker Compose Setup**
- Create `docker-compose.yml` with `app`, `postgres` services
- Use `postgis/postgis:15-3.4` for Postgres image
- Configure volume for postgres data persistence
- Set environment variables for Payload DB connection
- Test: `docker compose up -d && docker compose ps`

**1.2: Payload CMS Integration**
- Create `payload/` directory with Payload config
- Configure `payload.config.ts` with collections stub
- Connect Payload to Postgres via `@payloadcms/db-postgres`
- Configure Payload authentication
- Test: Access `/admin` and create first user

**1.3: Next.js Frontend Setup**
- Create `frontend/` directory with Next.js 14+ (App Router)
- Configure TypeScript + Tailwind CSS
- Set up Payload client (`payload.config.ts` in root)
- Create placeholder tenant home page
- Test: Frontend builds without errors

---

## Phase 2: Shared Data Layer

**Goal:** Core collections (Tenant, User, Property, Lead, Media, POI Cache) with full tenant isolation via Payload ACLs.

**Success Criteria:**
1. All collections created with proper fields
2. Tenant access control enforced — users can only see their tenant's data
3. Property collection has all shared base fields
4. Agent vertical extension points added as stubs
5. Builder vertical extension points added as stubs
6. Leads collection captures inquiry data
7. Media collection handles image uploads

### Plans

**2.1: Tenant & Auth Collections**
- Create `Tenants` collection with: slug, name, verticalType (airbnb|agent|builder), branding (logo, primaryColor, tagline)
- Create `Users` collection extending Payload auth with tenant reference
- Configure Payload access functions for tenant isolation
- Test: Create two tenants, verify data isolation

**2.2: Property Base Collection**
- Create `Properties` collection with all shared fields:
  - Base: title, description, address, geolocation (lat/lng)
  - Core: bhkType, propertyType, furnishingStatus
  - Details: facing, floor (current, total), bathrooms
  - Policy: petPolicy, tenantPreference, availabilityTiming
  - Meta: status (draft|published|archived), locality
  - Agent stubs: listingMode, rentPrice, salePrice, listingStatus
  - Builder stubs: projectReference (future)
- Add spatial index on geolocation field
- Configure media relationship for gallery
- Test: Create property, verify all fields save

**2.3: Lead Collection**
- Create `Leads` collection with: name, email, phone, message, propertyReference, activityReference, status (new|contacted|qualified|lost)
- Link to tenant and optional property/activity
- Configure access control (public create, tenant read/update)
- Test: Submit lead via API, verify tenant sees it

**2.4: Media & POI Cache**
- Create `Media` collection (Payload built-in upload)
- Create `PoiCache` collection with: property, poiType, data (JSON), cachedAt
- Configure auto-cleanup for expired cache entries
- Test: Upload image, verify CDN URL returned

---

## Phase 3: Tenant Routing

**Goal:** Next.js middleware extracts tenant from subdomain; frontend knows which tenant to query.

**Success Criteria:**
1. Middleware extracts subdomain from hostname
2. Tenant slug passed to frontend via header
3. Reserved subdomains (www, api, admin, localhost) blocked
4. Invalid tenant redirects to 404 or landing
5. Tenant-aware API calls include tenant filter

### Plans

**3.1: Middleware Implementation**
- Create `middleware.ts` in frontend root
- Extract subdomain from `host` header
- Skip reserved domains: www, api, admin, localhost, platform
- Set `x-tenant-slug` header for valid subdomains
- Return 404 for invalid tenants (optional: redirect to main site)
- Test: `{tenant}.localhost:3000` → header set correctly

**3.2: Tenant Resolution Utilities**
- Create `lib/tenant.ts` with `getCurrentTenant()` helper
- Create `lib/payload.ts` with tenant-scoped query wrapper
- Update all API calls to include tenant filter
- Test: Query properties for correct tenant only

---

## Phase 4: Airbnb Vertical

**Goal:** Full Airbnb extension fields on Property + Activities collection + Booking/Inquiry model.

**Success Criteria:**
1. Property has Airbnb-specific fields (pricing, amenities, availability, rules)
2. Activities collection with CRUD
3. Activities can be linked to Properties
4. Inquiry/Booking records for experiences
5. Airbnb vertical renders correctly in Payload admin

### Plans

**4.1: Property Airbnb Extension**
- Add to Property collection (via field composition):
  - nightlyPricing: number
  - seasonalPricing: array of {startDate, endDate, price}
  - amenities: array of select (WiFi, AC, Pool, Kitchen, Parking, Washer, TV, Gym, etc.)
  - houseRules: textarea
  - availabilityCalendar: JSON field (dates with availability status)
- Create `lib/collections/Properties/airbnb.ts` with Airbnb-specific fields
- Test: Create Airbnb property with all fields

**4.2: Activities Collection**
- Create `Activities` collection with: title, description, price, media (images), availability, linkedProperties (relationship)
- Add to Payload config
- Create Activity-specific inquiry form
- Test: Create activity, link to property

**4.3: Inquiry/Booking Records**
- Create `Bookings` collection with: type (property|activity), referenceId, customer info (name, email, phone, message), dates (for Airbnb), status
- Configure public create, tenant read/update
- Test: Submit booking request, verify in admin

---

## Phase 5: Search & Maps

**Goal:** Property filters, MapLibre integration, POI caching from Google Places.

**Success Criteria:**
1. All filter types implemented (BHK, type, rent/sale, budget, locality, amenities, etc.)
2. Property map view shows all tenant properties as markers
3. Clustered markers at low zoom levels
4. POI overlay on property detail map
5. Google Places API integration with 7-day cache TTL
6. PostGIS radius search works

### Plans

**5.1: Property Filters**
- Create filter components: BHK selector, property type, rent/sale toggle, budget range slider, locality autocomplete
- Add remaining filters: furnishing, amenities multi-select, pet policy, tenant preference, facing, floor, bathrooms, availability timing
- Build filter state management (URL params for shareability)
- Connect filters to Payload queries
- Test: Apply multiple filters, verify correct results

**5.2: Property Map View**
- Install MapLibre GL: `npm install maplibre-gl`
- Create `MapView` client component with SSR skeleton
- Add property markers as GeoJSON layer
- Implement marker clustering at zoom < 12
- Add popup on marker click (property summary)
- Test: Map loads with property markers

**5.3: POI Integration & Caching**
- Create `lib/poi.ts` with Google Places API client
- Implement nearby search: restaurants, bars, parks, beaches
- Add to `PoiCache` collection with 7-day TTL
- Create POI overlay component for property detail
- Implement cache invalidation on property location change
- Test: Fetch POIs, verify cache hit on second load

**5.4: PostGIS Geolocation Search**
- Add `ST_DWithin` radius filter to property queries
- Create radius selector UI component
- Optimize: Ensure spatial index exists
- Test: "Properties within 5km" returns correct results

---

## Phase 6: Storefront SSR

**Goal:** SEO-optimized public pages for all routes, with JSON-LD structured data.

**Success Criteria:**
1. Home page renders with tenant branding and featured properties
2. Property list page with filters (SSR)
3. Property detail page with gallery, amenities, pricing, POI map (SSR)
4. Activities list and detail pages (SSR)
5. Inquiry forms on property and activity pages (SSR)
6. JSON-LD schema on property pages
7. Responsive design on all pages
8. Meta tags (title, description, OG) on all pages

### Plans

**6.1: Home & Property List Pages**
- Create `app/[tenant]/page.tsx` (home)
- Create `app/[tenant]/properties/page.tsx` (list with filters)
- Implement SSR with `generateMetadata`
- Add loading skeletons
- Test: `curl` returns full HTML content

**6.2: Property Detail Page**
- Create `app/[tenant]/properties/[id]/page.tsx`
- Implement gallery component with lazy loading
- Display all property fields, amenities, pricing
- Add inquiry form
- Add POI map overlay
- Implement JSON-LD: `RealEstateListing` schema
- Test: Verify JSON-LD in page source

**6.3: Activities Pages**
- Create `app/[tenant]/activities/page.tsx` (list)
- Create `app/[tenant]/activities/[id]/page.tsx` (detail)
- Implement SSR and metadata
- Add inquiry form to detail page
- Test: Activities pages render correctly

**6.4: SEO & Performance**
- Add canonical URLs per page
- Implement Open Graph meta tags
- Add sitemap generation
- Optimize images: next/image with blur placeholders
- Test: Pages score well in SEO audit

---

## Phase 7: Admin Polish

**Goal:** Payload admin forms optimized for non-technical property owners.

**Success Criteria:**
1. Property edit form has clear field groupings
2. Field labels are user-friendly (not technical)
3. Helpful hints/text for complex fields
4. Activity edit form polished similarly
5. Media library is intuitive
6. No developer-only terminology visible

### Plans

**7.1: Property Form Organization**
- Group fields into tabs/sections: Basic Info, Location, Pricing, Details, Media
- Add descriptive labels: "Number of Bedrooms" not "bhkType"
- Add field descriptions: hints for what to enter
- Order fields logically (basic info first, advanced last)
- Test: Non-technical user can complete form without help

**7.2: Activity & Media Polish**
- Organize Activity fields similarly
- Configure media upload with size/format guidance
- Add preview for uploaded images
- Test: Activity creation flow is intuitive

---

## Requirements Coverage

| Requirement Category | Phase | Status |
|---------------------|-------|--------|
| Multi-Tenancy core | Phase 1, 3 | Pending |
| Authentication | Phase 2, 3 | Pending |
| Property (shared) | Phase 2 | Pending |
| Agent extension | Phase 2 | Pending |
| Builder extension | Phase 2 | Pending |
| Airbnb extension | Phase 4 | Pending |
| Activities | Phase 4 | Pending |
| Booking/Inquiry | Phase 4 | Pending |
| Filters | Phase 5 | Pending |
| Maps | Phase 5 | Pending |
| POI | Phase 5 | Pending |
| Storefront SSR | Phase 6 | Pending |
| Admin Polish | Phase 7 | Pending |

**Total phases:** 7
**Estimated complexity:** Medium-High

---

## Phase Dependencies

```
Phase 1 (Infrastructure)
    ↓
Phase 2 (Data Layer) — depends on Phase 1
    ↓
Phase 3 (Routing) — depends on Phase 2
    ↓
Phase 4 (Airbnb) — depends on Phase 2
Phase 5 (Maps) — depends on Phase 3
Phase 6 (Storefront) — depends on Phase 4, 5
Phase 7 (Admin) — depends on Phase 6
```

---

*Last updated: 2026-05-31 after Phase 1 planning*
