export const PERMISSIONS = {
    USERS_VIEW: "users:view",
    USERS_CREATE: "users:create",
    USERS_EDIT: "users:edit",
    USERS_DEACTIVATE: "users:deactivate",
  
    CUSTOMERS_READ: "customers:read",
    CUSTOMERS_CREATE: "customers:create",
    CUSTOMERS_EDIT: "customers:edit",
    CUSTOMERS_DELETE: "customers:delete",
  
    INVOICES_READ: "invoices:read",
    INVOICES_CREATE: "invoices:create",
    INVOICES_APPROVE: "invoices:approve",
    INVOICES_DELETE: "invoices:delete",
  
    INVENTORY_READ: "inventory:read",
    INVENTORY_MANAGE: "inventory:manage",
    INVENTORY_ORDER: "inventory:order",
    INVENTORY_AUDIT: "inventory:audit",
  
    REPORTS_VIEW: "reports:view",
    REPORTS_EXPORT: "reports:export",
    REPORTS_SCHEDULE: "reports:schedule",
    REPORTS_ADMIN: "reports:admin",
  } as const;
  
  export type Permission =
    (typeof PERMISSIONS)[keyof typeof PERMISSIONS];