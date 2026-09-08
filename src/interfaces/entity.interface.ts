import type { EmployeeBasic } from "@/modules/employee/employee.interface";

export enum EntityTypes {
  GENERIC                   = 'generic',
  TASK                      = 'task',
  PROJECT                   = 'project',
  VENDOR                    = 'vendor',
  ASSET                     = 'asset',
  SERVICE                   = 'service',
  MACHINE                   = 'machine',
  EQUIPMENT_PROD            = 'production equipment',
  DEVICE                    = 'device',
  CONTACT                   = 'contact',
  CONTACT_TYPE              = 'contact type',
  PURCHASE_REQUISITION      = 'purchase requisition',
  PURCHASE_ORDER            = 'purchase order',
  PURCHASE_ORDER_ITEM       = 'purchase order item',
  CAPEX                     = 'capital expenditure',
  OPEX                      = 'operational expenditure',
  PR_ITEM                   = 'requisition item',
  ORDER_ITEM                = 'order item',
  OPEX_PURPOSE              = 'operational expenditure purpose',
  PROJECT_PHASE             = 'project phase',
  VENDOR_CHECKLIST          = 'vendor checklist',
  EQUIPMENT                 = 'equipment',
  PAYMENT_TERM              = 'payment term',
  PAYMENT_METHOD            = 'payment method',
  INCOTERM                  = 'incoterm',
  PARAMETER                 = 'parameter',
  REQUISITION               = 'requisition',
  ANNOUNCEMENT              = 'announcement',
  REPORT                    = 'report',
  INVENTORY                 = 'inventory item',
  TAX_TYPE                  = 'tax type',
  SHIPPING_METHOD           = 'shipping method',
  INVENTORY_TYPE            = 'inventory type',
  DEPARTMENT                = 'department',
  COST_CENTER               = 'cost center',
  LOGISTIC                  = 'logistic',
  ADDRESS                   = 'address',
  BANK_ACCOUNT              = 'bank account',
  TYPE_REQUISITION          = 'type requisition',
  GENERAL_REQUISITION       = 'general requisition',
  GENERAL_REQUISITION_ITEM = 'general requisition item',
  CLAIM                     = 'claim',
  ORGANIZATIONAL_LEVEL      = 'organizational level',
  FUNCTIONAL_CLUSTER        = 'functional cluster',
  // HOUSE_BANK                = 'house bank',
}

export interface EntityType {
  id?: number;
  entity: string;
  name: string;
  description: string;
  dtCreated?: Date;
  dtUpdated?: Date;
  crtUser?: EmployeeBasic;
}

export const newEntityType: EntityType = {
  id: 0,
  name: '',
  entity: '',
  description: ''
}

// export interface EntityType {
//   id?: number;
//   name: string;
//   entity: string;
//   description: string;
//   dtCreated?: Date;
//   dtUpdated?: Date;
//   crtUser?: EmployeeBasic;
// }

// export const newEntityType: EntityType = {
//   name: '',
//   entity: '',
//   description: ''
// }