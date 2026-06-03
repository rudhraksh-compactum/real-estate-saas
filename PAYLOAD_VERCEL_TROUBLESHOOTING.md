# Payload CMS + Neon + Vercel Troubleshooting Guide

## Overview

This document logs all errors encountered during the Payload CMS + Neon + Vercel integration, along with attempted solutions.

---

## Error Log

### Error 1: "users is not a valid admin"

**Symptom:** Payload CMS admin page returns 500 error with message "users is not a valid admin user collection"

**Root Cause:** Payload config was missing the `admin.user` property, or the Users collection was not properly configured.

**Solution:** Created `Users.ts` collection with proper auth configuration:
```typescript
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    defaultColumns: ['email', 'name', 'role'],
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'role', type: 'select', options: [...] },
  ],
};
```

**Status:** Fixed by adding Users collection to collections index.

---

### Error 2: "ECONNREFUSED" / Database Connection Refused

**Symptom:** Runtime logs show "connect ECONNREFUSED" when accessing /admin

**Root Cause:** DATABASE_URL environment variable was not set in Vercel.

**Solution:** Added environment variables in Vercel dashboard:
- DATABASE_URL
- PAYLOAD_SECRET
- NEXT_PUBLIC_BASE_URL

**Status:** Fixed after adding environment variables.

---

### Error 3: "Failed query: se..." / Query Execution Failure

**Symptom:** /admin returns 500 with "Failed query" in logs. Payload connects but queries fail.

**Root Cause:** Database schema not created - Payload tables don't exist in Neon.

**Solution Attempted:** Set `push: true` in postgresAdapter config to auto-create schema on startup.

**Status:** Not fully resolved - DNS resolution issues prevent proper testing.

---

### Error 4: "getaddrinfo ENOTFOUND" - DNS Resolution Failure

**Symptom:** 
```
getaddrinfo ENOTFOUND ep-round-art-aos6mbkn.c-2.ap-southeast-1.aws.neon.tech
```

**Root Cause:** Node.js's pg library cannot resolve the Neon hostname in certain network environments.

**Investigations:**
1. `dig` command resolves hostname correctly to IPs (18.138.49.39, 3.0.167.45, 13.251.17.193)
2. Raw TCP connection to port 5432 succeeds
3. Node.js DNS resolver fails with EREFUSED
4. Vercel (US East region) cannot resolve the hostname
5. Local machine (India) can resolve via some DNS servers but not Node.js

**Attempted Solutions:**

1. **Connection Pooling ON in Neon**
   - Uses `-pooler` in hostname
   - Still fails: `ENOTFOUND ep-round-art-aos6mbkn-pooler.c-2.ap-southeast-1.aws.neon.tech`

2. **Direct Connection (Pooler OFF)**
   - Uses hostname without `-pooler`
   - Still fails: `ENOTFOUND ep-round-art-aos6mbkn.c-2.ap-southeast-1.aws.neon.tech`

3. **IP Address Instead of Hostname**
   - Uses 18.138.49.39 directly
   - SSL cert mismatch: "Hostname/IP does not match certificate's altnames"
   - Added `options: 'endpoint=ep-round-art-aos6mbkn'` - partially worked in testing

4. **SSL Options**
   - Tried `sslmode=require`
   - Tried `sslmode=verify-full`
   - Tried `ssl: { rejectUnauthorized: false }`
   - Still DNS resolution fails before SSL

**Status:** UNRESOLVED - Core networking issue between Vercel/Node.js and Neon's DNS.

---

### Error 5: SSL Certificate Mismatch

**Symptom:** 
```
Hostname/IP does not match certificate's altnames: 
Host: localhost. is not in the cert's altnames: DNS:*.c-2.ap-southeast-1.aws.neon.tech
```

**Root Cause:** When using IP address instead of hostname, SSL certificate validation fails because cert is issued for `*.c-2.ap-southeast-1.aws.neon.tech`, not for raw IP.

**Solution Attempted:** Use hostname with SNI (Server Name Indication) support, which Neon requires.

**Status:** Cannot work around - IP-based connections not possible with Neon's SSL cert setup.

---

### Error 6: Node.js 24.x DNS Resolution Issue

**Symptom:** `dns.lookup()` and pg library's internal DNS resolution both fail with EREFUSED.

**Root Cause:** Node.js 24.x has stricter DNS resolution behavior. The hostname `ep-round-art-aos6mbkn.c-2.ap-southeast-1.aws.neon.tech` resolves via `dig` but not via Node.js's built-in resolver.

**Workaround Attempted:** Use `dns/promises` with explicit IPv4 resolution.

**Status:** Not a viable workaround - underlying network routing issue.

---

## What Works

1. **Frontend pages** (`/`, `/properties`, `/properties/[id]`) - All work perfectly with static/hardcoded data
2. **Database connection from local machine** - Works when DNS resolves
3. **Neon Dashboard** - Accessible, database exists
4. **Build process** - No build errors

## What Doesn't Work

1. **Payload Admin** (`/admin`) - Fails at runtime due to database connection issues

---

## Potential Solutions to Try

### 1. Use Different Database Provider
- Try Supabase instead of Neon (different DNS infrastructure)
- Try Railway, Render, or ElephantSQL

### 2. Use Neon with Serverless Driver
- Neon recommends their Serverless Driver for serverless environments
- See: https://neon.tech/docs/serverless/serverless-driver

### 3. Configure Custom Domain
- Point custom domain to Vercel
- Use CNAME that Neon can resolve

### 4. Contact Neon Support
- The DNS resolution failure from Vercel's infrastructure suggests a potential infrastructure issue

---

## Current Configuration

### payload.config.ts
```typescript
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { collections } from './payload-src/collections';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: 'Not Just A Stay - Admin',
    },
  },
  db: postgresAdapter({
    push: true,
    migrationDir: './migrations',
    pool: {
      max: 10,
      connectionString: process.env.DATABASE_URL,
    },
  }),
  collections: collections,
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',
});
```

### DATABASE_URL (Current Attempt)
```
postgresql://neondb_owner:npg_mYnkzK3wTcq9@ep-round-art-aos6mbkn-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

### Vercel Environment Variables
| Name | Value |
|------|-------|
| DATABASE_URL | postgresql://neondb_owner:npg_...@ep-round-art-aos6mbkn-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require |
| PAYLOAD_SECRET | mxeN8I7Yy4zeMfOrwKYGhp6rm+cw5VHKtDBrsgOkjrc= |
| NEXT_PUBLIC_BASE_URL | https://real-estate-app-rudhraksh-s-projects.vercel.app |

---

## Test Commands

```bash
# Test DNS resolution
dig @8.8.8.8 ep-round-art-aos6mbkn.c-2.ap-southeast-1.aws.neon.tech

# Test raw TCP connection
nc -zv 18.138.49.39 5432

# Get Neon connection string
npx neonctl@latest cs production --api-key "YOUR_API_KEY" --pooled=true
```

---

## Timeline

| Date | Issue | Status |
|------|-------|--------|
| 2024-06-03 | Initial Payload CMS setup | Completed |
| 2024-06-03 | Users collection missing | Fixed |
| 2024-06-03 | Environment variables missing | Fixed |
| 2024-06-03 | Payload schema creation | In Progress |
| 2024-06-03 | DNS resolution failure | UNRESOLVED |
