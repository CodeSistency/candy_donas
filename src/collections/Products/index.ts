import { anyone, staffOnly } from "@/access/roleBasedAuth";
import { CollectionConfig } from "payload";


export const Products: CollectionConfig = {
    slug: 'products',
    access: {
      read: anyone, // Publicly readable
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
      { name: 'productCode', type: 'text', label: 'Código de Producto', unique: true },
      { name: 'description', type: 'richText', label: 'Descripción' },
      {
        name: 'images',
        type: 'relationship',
        relationTo: 'media',
        label: 'Imágenes',
        hasMany: true,
      },
      {
        name: 'price',
        type: 'number',
        label: 'Precio',
        required: true,
        min: 0,
      },
      {
        name: 'categories',
        type: 'relationship',
        relationTo: 'categories',
        label: 'Categorías',
        hasMany: true,
      },
      { name: 'tags', type: 'text', label: 'Etiquetas' },
      {
        name: 'variants',
        type: 'array',
        label: 'Variantes',
        fields: [
          { name: 'variantName', type: 'text', label: 'Nombre', required: true },
          { name: 'sku', type: 'text', label: 'SKU', unique: true },
          { name: 'priceModifier', type: 'number', label: 'Modificador de Precio', defaultValue: 0 },
          {
            name: 'variantImages',
            type: 'relationship',
            relationTo: 'media',
            label: 'Imágenes',
            hasMany: true,
          },
          {
            name: 'variantInventory',
            type: 'number',
            label: 'Inventario',
            defaultValue: 0,
            min: 0,
          },
        ],
      },
      { name: 'inventory', type: 'number', label: 'Inventario', defaultValue: 0, min: 0 },
      { name: 'featured', type: 'checkbox', label: 'Destacado' },
      {
        name: 'meta',
        type: 'group',
        label: 'Meta',
        fields: [
          { name: 'metaTitle', type: 'text', label: 'Título Meta' },
          { name: 'metaDescription', type: 'text', label: 'Descripción Meta' },
          { name: 'metaKeywords', type: 'text', label: 'Palabras Clave Meta' },
        ],
      },
      {
        name: 'nutritionalInfo',
        type: 'group',
        label: 'Información Nutricional',
        fields: [
          { name: 'calories', type: 'number', label: 'Calorías' },
          { name: 'fat', type: 'number', label: 'Grasa' },
        ],
      },
      { name: 'allergens', type: 'text', label: 'Alérgenos' },
      { name: 'isPublished', type: 'checkbox', label: 'Publicado', defaultValue: false },
      {
        name: 'unit',
        type: 'select',
        label: 'Unidad',
        options: [
          { label: 'Pieza', value: 'piece' },
          { label: 'Caja', value: 'box' },
          { label: 'Docena', value: 'dozen' },
        ],
      },
      { name: 'purchaseNote', type: 'richText', label: 'Nota de Compra' },
    ],
  };