import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone, selfOrStaffForField, staffOnly } from '@/access/roleBasedAuth';


export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Adds email and password fields automatically
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: selfOrStaffForField('id'), // Customers read own profile, staff read all
    create: anyone, // Anyone can sign up
    update: selfOrStaffForField('id'), // Customers update own, staff update all
    delete: adminsOnly, // Only admins can delete
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'Nombre',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Apellido',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      options: [
        { label: 'Cliente', value: 'customer' },
        { label: 'Empleado', value: 'employee' },
        { label: 'Administrador', value: 'admin' },
      ],
      defaultValue: 'customer',
      access: {
        update: adminsOnly, // Only admins can change roles
      },
    },
    {
      name: 'addresses',
      type: 'array',
      label: 'Direcciones',
      fields: [
        {
          name: 'addressType',
          type: 'select',
          label: 'Tipo de Dirección',
          options: [
            { label: 'Envío', value: 'shipping' },
            { label: 'Facturación', value: 'billing' },
            { label: 'Otra', value: 'other' },
          ],
        },
        { name: 'streetAddress', type: 'text', label: 'Dirección' },
        { name: 'city', type: 'text', label: 'Ciudad' },
        { name: 'state', type: 'text', label: 'Provincia/Estado' },
        { name: 'zipCode', type: 'text', label: 'Código Postal' },
        { name: 'country', type: 'text', label: 'País' },
        { name: 'isDefaultShipping', type: 'checkbox', label: 'Envío Predeterminado' },
        { name: 'isDefaultBilling', type: 'checkbox', label: 'Facturación Predeterminada' },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Número de Teléfono',
    },
    {
      name: 'isMarketingOptIn',
      type: 'checkbox',
      label: 'Opt-in de Marketing',
      defaultValue: false,
    },
    {
      name: 'loyaltyPoints',
      type: 'number',
      label: 'Puntos de Lealtad',
      defaultValue: 0,
      access: {
        update: staffOnly, // Only staff can update points
      },
    },
  ],
};