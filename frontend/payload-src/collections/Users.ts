import type { CollectionConfig } from 'payload';

/**
 * Users Collection
 *
 * Payload's built-in users collection for authentication.
 * This is required for admin access.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    listSearchableFields: ['name', 'email'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      defaultValue: 'admin',
      required: true,
      access: {
        update: () => false, // Only admins can update roles
      },
    },
  ],
};
