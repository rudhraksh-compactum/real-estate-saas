// Tenant types (MULTI-04 stub)
export type VerticalType = 'airbnb' | 'agent' | 'builder';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  verticalType: VerticalType;
  // Branding fields (Phase 2): logo, primaryColor, tagline
}

// Property types (PROP-02 stub)
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Geolocation {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  address: Address;
  geolocation: Geolocation;
  // Stub fields (Phase 2):
  // BHK type, furnishing, bathrooms, floor, etc.
  // Agent extension: listingMode, rentPrice, salePrice
  // Airbnb extension: nightlyPricing, amenities, houseRules
}

// Export all types
export type { Tenant, Property, Address, Geolocation, VerticalType };
