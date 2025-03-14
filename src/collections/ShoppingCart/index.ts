import { authenticated, selfOrStaffForField } from "@/access/roleBasedAuth";
import { CollectionConfig } from "payload";

export const ShoppingCart: CollectionConfig = {
    slug: 'shopping-carts',
    timestamps: true, // Automatically adds createdAt and updatedAt
    access: {
      read: selfOrStaffForField('user'), // Owner or staff
      create: authenticated,
      update: selfOrStaffForField('user'),
      delete: selfOrStaffForField('user'),
    },
    fields: [
      { name: 'user', type: 'relationship', relationTo: 'users', label: 'Usuario', required: true },
      {
        name: 'items',
        type: 'array',
        label: 'Artículos',
        fields: [
          { name: 'product', type: 'relationship', relationTo: 'products', label: 'Producto' },
          { name: 'quantity', type: 'number', label: 'Cantidad', defaultValue: 1, min: 1 },
          { name: 'variant', type: 'text', label: 'Variante' },
        ],
      },
    ],
    hooks: {
      beforeChange: [
        ({ req, operation, data }) => {
          if (operation === 'create') {
            data.user = req.user?.id; // Ensure user is set to current user
          }
          return data;
        },
      ],
    },
  };