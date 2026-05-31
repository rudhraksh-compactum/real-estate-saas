import type { CollectionConfig } from 'payload';

export const PropertiesStub: CollectionConfig = {
  slug: 'properties',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
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
      type: 'point',
    },
  ],
};
