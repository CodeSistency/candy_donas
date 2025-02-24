import { anyone, staffOnly } from "@/access/roleBasedAuth";
import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: 'categories',
    access: {
      read: anyone,
      create: staffOnly,
      update: staffOnly,
      delete: staffOnly,
    },
    hooks: {
      beforeValidate: [
        ({ data }) => {
          if (data.name && !data.slug) {
            data.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
          }
          return data;
        },
      ],
    },
    fields: [
      { name: 'name', type: 'text', label: 'Nombre', required: true },
      { name: 'slug', type: 'text', label: 'Slug', unique: true },
      { name: 'description', type: 'text', label: 'Descripción' },
      { name: 'image', type: 'relationship', relationTo: 'media', label: 'Imagen' },
      { name: 'parentCategory', type: 'relationship', relationTo: 'categories', label: 'Categoría Padre' },
      { name: 'categoryOrder', type: 'number', label: 'Orden de Categoría' },
      { name: 'isVisibleInNavigation', type: 'checkbox', label: 'Visible en Navegación', defaultValue: true },
    ],
  };