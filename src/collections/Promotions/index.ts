import { anyone, staffOnly } from "@/access/roleBasedAuth";
import { CollectionConfig } from "payload";

export const Promotions: CollectionConfig = {
    slug: 'promotions',
    access: {
      read: anyone, // Public for frontend to fetch active promotions
      create: staffOnly,
      update: staffOnly,
      delete: staffOnly,
    },
    fields: [
      { name: 'code', type: 'text', label: 'Código', unique: true, required: true },
      {
        name: 'discountType',
        type: 'select',
        label: 'Tipo de Descuento',
        options: [
          { label: 'Porcentaje', value: 'percentage' },
          { label: 'Monto Fijo', value: 'fixed' },
        ],
        required: true,
      },
      { name: 'discountValue', type: 'number', label: 'Valor de Descuento', required: true },
      { name: 'startDate', type: 'date', label: 'Fecha de Inicio' },
      { name: 'endDate', type: 'date', label: 'Fecha de Fin' },
      {
        name: 'applicableProducts',
        type: 'relationship',
        relationTo: 'products',
        label: 'Productos Aplicables',
        hasMany: true,
      },
      {
        name: 'applicableCategories',
        type: 'relationship',
        relationTo: 'categories',
        label: 'Categorías Aplicables',
        hasMany: true,
      },
    ],
  };