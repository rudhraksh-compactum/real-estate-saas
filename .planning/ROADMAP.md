# Roadmap: Real Estate SaaS Platform — MVP

**Defined:** 2026-05-31
**Revised:** 2026-06-01
**Granularity:** Standard (5-7 phases, 3-5 plans each)
**Project mode:** single-account-first
**Parallel execution:** enabled

> **Version 2 Note:** Shopify-style multi-tenant SaaS (self-service signup, subdomain routing, account self-onboarding) is **Version 2**. This roadmap covers the MVP — building one complete site as a proof of concept, then making it repeatable for future clients.

---

## MVP Scope

**Current target:** Build one complete website + CMS for a demo client (e.g., Airbnb host or real estate agent).

**What we deliver:**
- Complete frontend website (property listings, detail pages, inquiry form)
- CMS backend for the client to manage properties
- Search, maps, and POI integration
- SEO-optimized pages

**What's NOT in MVP:**
- Multi-tenant SaaS infrastructure
- Self-service account signup
- Subdomain or custom domain routing per account
- Template system for cloning sites

---

## Phase Overview

| # | Phase | Goal | Plans |
|---|-------|------|-------|
| 1 | Infrastructure Setup | Docker + Payload + Next.js + PostgreSQL connected | 3 |
| 2 | Data Layer | Properties, Leads, Media collections with full fields | 4 |
| 3 | Airbnb Vertical | Airbnb-specific fields + Activities + Inquiry | 3 |
| 4 | Search & Maps | Filters + MapLibre integration + POI caching | 4 |
| 5 | Storefront SSR | SEO pages for all public routes | 4 |
| 6 | Admin Polish | Clean forms for non-technical users | 2 |

---

## Phase 1: Infrastructure Setup ✅

**Goal:** Docker Compose with Payload + Next.js + PostgreSQL, all services connected and booting.

**Status:** Complete (3/3 plans)

**Success Criteria:**
1. `docker compose up` starts all services without errors
2. Payload admin accessible at localhost:3000/admin
3. PostgreSQL connection verified
4. Next.js frontend connects to Payload API
5. Frontend builds without errors

### Plans

- [x] 1.1 — Docker Compose with Postgres/PostGIS and app service
- [x] 1.2 — Payload CMS integration with monorepo structure
- [x] 1.3 — Next.js frontend with placeholder pages

---

## Phase 2: Data Layer

**Goal:** Core Payload CMS collections (Properties, Leads, Media) with full field definitions for the demo client.

**Success Criteria:**
1. Properties collection with all base fields (title, description, address, geolocation, BHK, type, furnishing, etc.)
2. Leads collection captures inquiry data
3. Media collection handles image uploads
4. All collections accessible in Payload admin

### Plans

**2.1: Properties Collection**
- Create `Properties` collection with all fields:
  - Base: title, description, address, geolocation (lat/lng)
  - Core: bhkType, propertyType, furnishingStatus
  - Details: facing, floor (current, total), bathrooms
  - Policy: petPolicy, tenantPreference, availabilityTiming
  - Meta: status (draft|published|archived), locality
  - Pricing: nightlyPrice (Airbnb), rentPrice, salePrice (agent)
- Add spatial index on geolocation field
- Configure media relationship for gallery
- Test: Create property, verify all fields save

**2.2: Leads Collection**
- Create `Leads` collection with: name, email, phone, message, propertyReference
- Link to property
- Status workflow: new → contacted → qualified → lost
- Configure access control (public create, admin read/update)
- Test: Submit lead via API, verify in admin

**2.3: Media Collection**
- Create `Media` collection using Payload built-in upload
- Configure image upload with size/format validation
- Test: Upload image, verify URL returned

**2.4: Airbnb Extension Fields**
- Add to Properties collection:
  - nightlyPricing: number
  - seasonalPricing: array of {startDate, endDate, price}
  - amenities: array of select (WiFi, AC, Pool, Kitchen, Parking, Washer, TV, Gym, etc.)
  - houseRules: textarea
  - availabilityCalendar: JSON field
- Test: Create Airbnb property with all fields

---

## Phase 3: Activities & Inquiry

**Goal:** Activities collection for Airbnb experiences + inquiry submission flow.

**Success Criteria:**
1. Activities collection with CRUD
2. Activities can be linked to Properties
3. Inquiry form submits lead to CMS
4. Inquiry visible in admin

### Plans

**3.1: Activities Collection**
- Create `Activities` collection with: title, description, price, media (images), availability, linkedProperties (relationship)
- Configure in Payload admin
- Test: Create activity, link to property

**3.2: Inquiry Form**
- Create inquiry form component for properties
- Fields: name, email, phone, message, property reference
- Submit to Leads collection
- Show success/error states
- Test: Submit form, verify lead created in admin

**3.3: Activity Inquiry**
- Create inquiry form for activities
- Same fields as property inquiry
- Link to activity
- Test: Submit activity inquiry, verify lead created

---

## Phase 4: Search & Maps

**Goal:** Property filters, MapLibre integration, POI caching.

**Success Criteria:**
1. All filter types implemented (BHK, type, budget, locality, amenities, etc.)
2. Property map view shows properties as markers
3. POI overlay on property detail
4. Google Places API integration with 7-day cache TTL

### Plans

**4.1: Property Filters**
- Create filter components: BHK selector, property type, budget range slider, locality autocomplete
- Add: furnishing, amenities multi-select, pet policy, tenant preference, facing, floor, bathrooms
- Build filter state management (URL params)
- Connect filters to Payload queries
- Test: Apply filters, verify correct results

**4.2: Property Map View**
- Install MapLibre GL
- Create `MapView` component with SSR skeleton
- Add property markers as GeoJSON layer
- Implement marker clustering at low zoom
- Add popup on marker click
- Test: Map loads with property markers

**4.3: POI Integration**
- Create `lib/poi.ts` with Google Places API client
- Implement nearby search: restaurants, bars, parks, beaches
- Add POI cache collection with 7-day TTL
- Create POI overlay component
- Test: Fetch POIs, verify cache hit on second load

**4.4: Geolocation Search**
- Add PostGIS radius filter to property queries
- Create radius selector UI
- Test: "Properties within 5km" returns correct results

---

## Phase 5: Storefront SSR

**Goal:** SEO-optimized public pages for all routes.

**Success Criteria:**
1. Home page renders with featured properties
2. Property list page with filters (SSR)
3. Property detail page with gallery, amenities, POI map (SSR)
4. Activities pages (SSR)
5. JSON-LD schema on property pages
6. Responsive design
7. Meta tags on all pages

### Plans

**5.1: Home & Property List**
- Create home page with featured properties
- Create property list page with filters
- Implement SSR with `generateMetadata`
- Add loading skeletons
- Test: `curl` returns full HTML

**5.2: Property Detail Page**
- Create property detail page
- Implement gallery with lazy loading
- Display all fields, amenities, pricing
- Add inquiry form
- Add POI map overlay
- Implement JSON-LD: RealEstateListing schema
- Test: Verify JSON-LD in page source

**5.3: Activities Pages**
- Create activities list page (SSR)
- Create activity detail page (SSR)
- Add inquiry form to detail page
- Test: Pages render correctly

**5.4: SEO & Performance**
- Add canonical URLs
- Implement Open Graph meta tags
- Add sitemap generation
- Optimize images with next/image
- Test: Pages score well in SEO audit

---

## Phase 6: Admin Polish

**Goal:** Payload admin forms optimized for non-technical users.

**Success Criteria:**
1. Property edit form with clean field groupings
2. Field labels are user-friendly
3. Helpful hints for complex fields
4. Activity edit form polished
5. Media library is intuitive

### Plans

**6.1: Property Form Organization**
- Group fields into tabs/sections
- Add descriptive labels
- Add field descriptions
- Order fields logically
- Test: Non-technical user can complete form

**6.2: Activity & Media Polish**
- Organize Activity fields
- Configure media upload with guidance
- Add image previews
- Test: Flow is intuitive

---

## Version 2: Shopify-Style SaaS (Future)

These items are **out of scope** for MVP and will be addressed in Version 2:

| Feature | Notes |
|---------|-------|
| Multi-tenant architecture | Account isolation, shared database |
| Self-service signup | Clients sign up themselves |
| Subdomain routing | `{account}.platform.com` |
| Custom domain routing | Automatic domain → account lookup |
| Template system | Clone site for new client |
| Account management dashboard | Onboard new clients from admin |

---

*Last updated: 2026-06-01 — Revised for MVP-first approach*
