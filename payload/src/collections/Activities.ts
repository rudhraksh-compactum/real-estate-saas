import type { CollectionConfig } from 'payload';

/**
 * Activities Collection
 * Airbnb experiences (tours, cooking classes, activities) that can be linked to properties.
 *
 * Access Control:
 * - read: Public (anyone can view published activities)
 * - create/update/delete: Authenticated users only (admin)
 *
 * @see Phase 3: Activities & Inquiry
 */
export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'status', 'createdAt'],
    listSearchableFields: ['title', 'description'],
    description: 'Airbnb experiences and activities',
  },
  access: {
    // Public read for published activities
    read: () => true,
    // Admin only - authenticated users can create
    create: ({ req: { user } }) => Boolean(user),
    // Admin only - authenticated users can update
    update: ({ req: { user } }) => Boolean(user),
    // Admin only - authenticated users can delete
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // Tabs for organization
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Activity or experience name',
              },
            },
            {
              name: 'shortDescription',
              type: 'text',
              admin: {
                description: 'Brief tagline for listings (max 150 chars)',
              },
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Full description of the experience',
              },
            },
            {
              name: 'highlights',
              type: 'array',
              admin: {
                description: 'Key highlights of this experience',
              },
              fields: [
                {
                  name: 'highlight',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'duration',
              type: 'text',
              admin: {
                description: 'Duration (e.g., "2 hours", "Full day")',
              },
            },
            {
              name: 'groupSize',
              type: 'group',
              fields: [
                {
                  name: 'minGuests',
                  type: 'number',
                  min: 1,
                  admin: {
                    description: 'Minimum number of guests',
                  },
                },
                {
                  name: 'maxGuests',
                  type: 'number',
                  min: 1,
                  admin: {
                    description: 'Maximum number of guests',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
              admin: {
                description: 'Price per person (INR)',
              },
            },
            {
              name: 'currency',
              type: 'select',
              defaultValue: 'INR',
              options: [
                { label: 'INR', value: 'INR' },
                { label: 'USD', value: 'USD' },
                { label: 'EUR', value: 'EUR' },
              ],
              admin: {
                description: 'Currency for pricing',
              },
            },
            {
              name: 'includes',
              type: 'textarea',
              admin: {
                description: 'What is included in the price',
              },
            },
            {
              name: 'cancellationPolicy',
              type: 'textarea',
              admin: {
                description: 'Cancellation and refund policy',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'gallery',
              type: 'relationship',
              relationTo: 'media',
              hasMany: true,
              isSortable: true,
              admin: {
                description: 'Activity photos (drag to reorder)',
              },
            },
            {
              name: 'featuredImage',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'Main image shown in listings',
              },
            },
          ],
        },
        {
          label: 'Availability',
          fields: [
            {
              name: 'availability',
              type: 'json',
              admin: {
                description: 'Availability schedule (Phase 5 will add calendar UI)',
              },
            },
            {
              name: 'bookingLeadTime',
              type: 'number',
              admin: {
                description: 'Minimum advance booking time in hours',
              },
            },
          ],
        },
      ],
    },
    // Outside tabs - sidebar fields
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        description: 'Activity publication status',
        position: 'sidebar',
      },
    },
    {
      name: 'linkedProperties',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
      admin: {
        description: 'Properties this activity is associated with',
      },
    },
  ],
  indexes: [
    { status: 1 },
    { price: 1 },
  ],
  timestamps: true,
};
