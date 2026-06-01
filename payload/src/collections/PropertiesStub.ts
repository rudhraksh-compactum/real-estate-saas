import { CollectionConfig } from 'payload';

export const PropertiesStub: CollectionConfig = {
  slug: 'properties',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text' },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'zipCode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    {
      name: 'geolocation',
      type: 'point', // PostGIS geometry point
    },
    // Stub fields (Phase 2):
    // BHK type, furnishing status, bathrooms, floor, etc.
    // Agent extension: rentPrice, salePrice, listingMode
    // Airbnb extension: nightlyPricing, amenities, houseRules
  ],
  // Access: tenant-scoped (Phase 2)
  // Index: GIST on geolocation (Phase 2)
};
