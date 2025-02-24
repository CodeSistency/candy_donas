import { anyone, customersOnly, staffOnly } from "@/access/roleBasedAuth";
import { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
    slug: 'reviews',
    access: {
      read: anyone, // Publicly readable
      create: customersOnly, // Only customers can create
      update: staffOnly,
      delete: staffOnly,
    },
    fields: [
      { name: 'product', type: 'relationship', relationTo: 'products', label: 'Producto', required: true },
      { name: 'user', type: 'relationship', relationTo: 'users', label: 'Usuario', required: true },
      {
        name: 'rating',
        type: 'number',
        label: 'Calificación',
        required: true,
        min: 1,
        max: 5,
      },
      { name: 'comment', type: 'text', label: 'Comentario' },
      { name: 'createdAt', type: 'date', label: 'Fecha de Creación', defaultValue: () => new Date().toISOString() },
    ],
  };