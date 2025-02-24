import type { Access, FieldAccess } from 'payload'

// Check if user has any of the specified roles
const hasRole = (roles: string[], user: any): boolean => {
  return user && user.role && roles.includes(user.role);
};

// 1. Anyone can access
export const anyone: Access = () => true;

// 2. Only authenticated users
export const authenticated: Access = ({ req: { user } }) => !!user;

// 3. Only customers
// export const customersOnly: Access = ({ req: { user } }) =>
//   hasRole(['customer'], user);
// export const customersOnly: Access = ({ req: { user } }) =>
//     hasRole(['customer'], user);
export const customersOnly: FieldAccess<any, any> = ({ req }) => {
    const isCustomer= hasRole(['customer'], req.user);
    return isCustomer;
  };
// 4. Only staff (employees and admins)
// export const staffOnly: Access = ({ req: { user } }) =>
//   hasRole(['employee', 'admin'], user);
export const staffOnly: FieldAccess<any, any> = ({ req }) => {
    const isStaff= hasRole(['employee', 'admin'], req.user);
    return isStaff;
  };

// 5. Only admins
// export const adminsOnly: Access = ({ req: { user } }) =>
//   hasRole(['admin'], user);

export const adminsOnly: FieldAccess<any, any> = ({ req }) => {
    const isAdmin = hasRole(['admin'], req.user);
    return isAdmin;
  };

// 6. Self or staff for a specific field (e.g., 'id', 'customer', 'user')
// 6. Self or staff for a specific field (e.g., 'id', 'customer', 'user')
export const selfOrStaffForField = (field: string): Access => ({ req: { user } }) => {
    if (hasRole(['employee', 'admin'], user)) return true;
    if (hasRole(['customer'], user)) return { read: { [field]: user?.id } };
    return false;
  };