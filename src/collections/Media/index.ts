import { CollectionConfig } from "payload";

export const Media: CollectionConfig<'media'> = {
    slug: 'media',
    upload: true,
    admin: {
      useAsTitle: 'Media', // Etiqueta en español
    },
    graphQL: {
      singularName: 'Media',
      pluralName: 'Media',
    },
    fields: [
      {
        name: 'alt',
        type: 'text',
        label: 'Texto Alternativo', // Etiqueta en español
        admin: {
          description: 'Texto alternativo para imágenes', // Descripción en español
        },
      },
    ],
  };