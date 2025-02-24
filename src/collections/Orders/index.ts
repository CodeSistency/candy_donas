import { adminsOnly, authenticated, selfOrStaffForField, staffOnly } from "@/access/roleBasedAuth";
import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
    slug: 'orders',
    access: {
      read: selfOrStaffForField('customer'), // Customers read own, staff read all
      create: authenticated, // Logged-in users can create
      update: staffOnly,
      delete: adminsOnly,
    },
    fields: [
      { name: 'customer', type: 'relationship', relationTo: 'users', label: 'Cliente', required: true },
      {
        name: 'items',
        type: 'array',
        label: 'Artículos',
        fields: [
          { name: 'product', type: 'relationship', relationTo: 'products', label: 'Producto', required: true },
          { name: 'quantity', type: 'number', label: 'Cantidad', required: true, defaultValue: 1, min: 1 },
          { name: 'price', type: 'number', label: 'Precio', required: true },
          { name: 'variantName', type: 'text', label: 'Variante' },
        ],
      },
      { name: 'total', type: 'number', label: 'Total', required: true, min: 0 },
      {
        name: 'shippingAddress',
        type: 'group',
        label: 'Dirección de Envío',
        fields: [
          { name: 'streetAddress', type: 'text', label: 'Dirección' },
          { name: 'city', type: 'text', label: 'Ciudad' },
          { name: 'state', type: 'text', label: 'Provincia/Estado' },
          { name: 'zipCode', type: 'text', label: 'Código Postal' },
          { name: 'country', type: 'text', label: 'País' },
        ],
      },
      {
        name: 'billingAddress',
        type: 'group',
        label: 'Dirección de Facturación',
        fields: [
          { name: 'streetAddress', type: 'text', label: 'Dirección' },
          { name: 'city', type: 'text', label: 'Ciudad' },
          { name: 'state', type: 'text', label: 'Provincia/Estado' },
          { name: 'zipCode', type: 'text', label: 'Código Postal' },
          { name: 'country', type: 'text', label: 'País' },
        ],
      },
      { name: 'paymentMethod', type: 'text', label: 'Método de Pago' },
      {
        name: 'orderStatus',
        type: 'select',
        label: 'Estado del Pedido',
        options: [
          { label: 'Pendiente', value: 'pending' },
          { label: 'Procesando', value: 'processing' },
          { label: 'Enviado', value: 'shipped' },
          { label: 'Completado', value: 'completed' },
          { label: 'Cancelado', value: 'cancelled' },
          { label: 'Reembolsado', value: 'refunded' },
        ],
        defaultValue: 'pending',
      },
      { name: 'trackingNumber', type: 'text', label: 'Número de Seguimiento' },
      { name: 'orderDate', type: 'date', label: 'Fecha del Pedido', defaultValue: () => new Date().toISOString() },
      { name: 'orderNumber', type: 'text', label: 'Número de Pedido', unique: true },
      { name: 'shippingCost', type: 'number', label: 'Costo de Envío' },
      { name: 'discountAmount', type: 'number', label: 'Monto de Descuento' },
      { name: 'discountCode', type: 'text', label: 'Código de Descuento' },
      {
        name: 'paymentStatus',
        type: 'select',
        label: 'Estado del Pago',
        options: [
          { label: 'Pendiente', value: 'pending' },
          { label: 'Pagado', value: 'paid' },
          { label: 'Fallido', value: 'failed' },
          { label: 'Reembolsado', value: 'refunded' },
        ],
        defaultValue: 'pending',
      },
      { name: 'shippingMethod', type: 'text', label: 'Método de Envío' },
      { name: 'estimatedDeliveryDate', type: 'date', label: 'Fecha de Entrega Estimada' },
      { name: 'customerNotes', type: 'text', label: 'Notas del Cliente' },
      { name: 'isGift', type: 'checkbox', label: 'Es un Regalo' },
      { name: 'giftMessage', type: 'text', label: 'Mensaje de Regalo' },
      {
        name: 'giftWrapOption',
        type: 'select',
        label: 'Opción de Envoltura',
        options: [
          { label: 'Ninguna', value: 'none' },
          { label: 'Estándar', value: 'standard' },
          { label: 'Premium', value: 'premium' },
        ],
      },
    ],
  };