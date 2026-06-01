// Re-export types from shared package
// This provides a stable import path for the frontend

export type {
  Tenant,
  Property,
  Address,
  Geolocation,
  VerticalType,
} from '@real-estate-saas/shared';

// Frontend-specific types can be added here
// e.g., API response wrappers, form types, etc.

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
