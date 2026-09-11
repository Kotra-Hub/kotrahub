// src/composables/useServices.ts
import { ref } from 'vue'

export interface ServiceItem {
  name: string
  description: string
  icon?: string
  action?: string
  page?: string
}

export interface ServiceSection {
  title: string
  items: ServiceItem[]
}

export interface ServiceConfig {
  id: string
  title: string
  icon: string
  description: string
  sections: ServiceSection[]
}

const serviceConfigs = ref<Record<string, ServiceConfig>>({
  plant: {
    id: 'plant',
    title: 'Plant',
    icon: 'mdi-factory',
    description:
      'Access and manage plant operations, production monitoring, quality systems, technical services, equipment management and project activities.',
    sections: [
      {
        title: 'Production & Monitoring',
        items: [
          { name: 'Line Monitoring', icon: 'mdi-chart-line', description: 'Access production line monitoring dashboard.' },
          { name: 'Plant Performance Monitoring System (PPMS)', icon: 'mdi-gauge', description: 'Monitor plant performance information, entries and reports.' },
          { name: 'Material Management', icon: 'mdi-package-variant', description: 'Manage production materials, material records and batch preparation.' },
          { name: 'Planner', icon: 'mdi-calendar-clock', description: 'Manage batch planning, scheduling and production monitoring.' },
          { name: 'Inventory Management System (IMS)', icon: 'mdi-warehouse', description: 'Manage spare parts, inventory, stock and approvals.' }
        ]
      },
      {
        title: 'Quality & Regulatory',
        items: [
          { name: 'Quality Assurance', icon: 'mdi-flask', description: 'Manage formula, recipe, UOM and batch approval management.' },
          { name: 'British Pharmacopoeia', icon: 'mdi-book-open-variant', description: 'Access and manage British Pharmacopoeia publications.' },
          { name: 'Stability', icon: 'mdi-flask-empty-outline', description: 'Manage stability plans, samples, reports and administration.' },
          { name: 'Filter', icon: 'mdi-filter-variant', description: 'Access and maintain authorised PQA filter information.' },
          { name: 'Product QR', icon: 'mdi-qrcode', description: 'Access and use available product QR information.' },
          { name: 'GS1 (UAE)', icon: 'mdi-barcode', description: 'Manage authorised GS1 UAE records.' },
          { name: 'Approved Supplier List & Halal Monitoring List (e-ASL&HML)', icon: 'mdi-file-check-outline', description: 'Manage approved suppliers, halal monitoring and master data.' }
        ]
      },
      {
        title: 'Technical Services',
        items: [
          { name: 'Work Order', icon: 'mdi-clipboard-list-outline', description: 'Create, track and process Work Order requests.' },
          { name: 'Technical Service Requisition (TSR)', icon: 'mdi-file-sign', description: 'Create, approve and manage Technical Service Requisitions.' },
          { name: 'TSP', icon: 'mdi-file-sign', description: 'Manage Technical Services Reports and related records.' },
          { name: 'Calibration of Assets / Equipment Management', icon: 'mdi-ruler', description: 'Manage equipment calibration activities and records.' },
          { name: 'Qualification of Assets / Equipment Management', icon: 'mdi-check-circle-outline', description: 'Manage equipment qualification activities and documentation.' },
          { name: 'Decommissioning Management', icon: 'mdi-close-circle-outline', description: 'Manage asset or equipment decommissioning processes.' },
          { name: 'Line Clearance', icon: 'mdi-broom', description: 'Manage area clearance processes, records and audit trail.' },
          { name: 'Leak Tester 19/167', icon: 'mdi-water', description: 'Access the Leak Tester system.' },
          { name: 'Friability Tester CAL/QC/O/0150', icon: 'mdi-flask', description: 'Access the Friability Tester system.' },
        ]
      },
      {
        title: 'Project Management',
        items: [
          { name: 'Project Management System (PMS)', icon: 'mdi-file-tree', description: 'Manage projects, processes, teams, timesheets and reports.' },
          { name: 'Projects Management', icon: 'mdi-folder-open', description: 'Create and manage projects.' },
          { name: 'Project Tasks Management', icon: 'mdi-format-list-checkbox', description: 'Create, assign and track project tasks.' },
          { name: 'UAT / FAT Module Management', icon: 'mdi-clipboard-check-outline', description: 'Manage UAT and FAT activities.' }
        ]
      }
    ]
  },
  sales: {
    id: 'sales',
    title: 'Sales',
    icon: 'mdi-chart-line',
    description:
      'Access and manage sales operations, customer information, product management and commercial activities.',
    sections: [
      {
        title: 'Sales & Commercial',
        items: [
          { name: 'Sales Automation Solutions (SAS)', icon: 'mdi-chart-line', description: 'Price, customer and ordering management.' },
          { name: 'Agreement Management', icon: 'mdi-file-document-check-outline', description: 'Create, review, approve and manage agreement records.' },
          { name: 'Product Information', icon: 'mdi-package-variant', description: 'Create, review and manage product and marketing information.' },
          { name: 'Appeton Signage', icon: 'mdi-television-classic', description: 'Manage Appeton Signage applications and approval workflow.' },
          { name: 'BigLink Rebate', icon: 'mdi-hand-coin-outline', description: 'Rebate submission, verification, approval and payout.' }
        ]
      },
      {
        title: 'Finance Transaction',
        items: [
          { name: 'AP Management', icon: 'mdi-invoice', description: 'Manage AP records, approval, payment status and reports.' },
          { name: 'EFT', icon: 'mdi-credit-card-outline', description: 'Process and manage authorised EFT transactions.' },
          { name: 'E-Invoice', icon: 'mdi-file-check-outline', description: 'Create, validate, process and report e-Invoice records.' }
        ]
      }
    ]
  },
  employee: {
    id: 'employee',
    title: 'Staff',
    icon: 'mdi-account-plus',
    description:
      'Access employee services, HR systems, staff management, training activities and employee progress tracking.',
    sections: [
      {
        title: 'Staff Dashboard',
        items: [
          { name: 'Staff Dashboard', icon: 'mdi-chart-line', description: 'View overall staff information, activities and summary.' },
          { name: 'My Staff Dashboard', icon: 'mdi-account', description: 'View assigned staff information and progress overview.' }
        ]
      },
      {
        title: 'Employee Management',
        items: [
          { name: 'Employee Staff', icon: 'mdi-account-group', description: 'Manage employee staff information and records.' },
          { name: 'New Employee List', icon: 'mdi-account-plus', description: 'Manage newly joined employee records.' },
          { name: 'Staff Tracker', icon: 'mdi-map-marker', description: 'Track employee status, activities and progress.' },
          { name: 'Checklist Management', icon: 'mdi-clipboard-check', description: 'Manage employee checklists and completion status.' },
          { name: 'Required Documents', icon: 'mdi-folder-open', description: 'Manage required employee documents and submissions.' },
          { name: 'Staff Reports', icon: 'mdi-file-document', description: 'View and manage staff reports.' }
        ]
      },
      {
        title: 'Staff Workspace',
        items: [
          { name: 'My Tasks', icon: 'mdi-checkbox-marked-circle', description: 'View and manage assigned staff tasks.' },
          { name: 'My Staff Progress', icon: 'mdi-chart-bar', description: 'Monitor staff development and progress tracking.' }
        ]
      },
      {
        title: 'Training & Development',
        items: [
          { name: 'Training Record System (TRS)', icon: 'mdi-book-open-variant', description: 'Manage training calendar, attendance and reports.' },
          { name: 'Training Record System (TRS - SMO)', icon: 'mdi-clipboard-text', description: 'Manage SMO training attendance and reporting.' }
        ]
      },
      {
        title: 'HR & Employee Services',
        items: [
          { name: 'Human Resource', icon: 'mdi-office-building', description: 'Access HR requisitions, handbook and leave / gate pass services.' },
          { name: 'Employees Management', icon: 'mdi-id-card', description: 'Manage employee records and system information.' },
          { name: 'Staff Purchase', icon: 'mdi-cart', description: 'Manage staff purchase orders, uploads, receipts and reports.' },
          { name: 'Claims Management', icon: 'mdi-cash', description: 'Submit and manage claims.' },
          { name: 'Events Management', icon: 'mdi-calendar', description: 'Create and manage company events.' },
          { name: 'Surveys / Questionnaires Management', icon: 'mdi-clipboard-text', description: 'Create and manage surveys and questionnaires.' }
        ]
      },
      {
        title: 'Staff Applications',
        items: [
          { name: 'e-Library', icon: 'mdi-book-open-variant', description: 'Access and share authorised links and files.' },
          { name: 'NDMS', icon: 'mdi-database', description: 'Access the NDMS system.' },
          { name: 'VTFP', icon: 'mdi-cog', description: 'Access the VTFP system.' },
          { name: 'SIS', icon: 'mdi-chart-line', description: 'Access SIS reports.' },
          { name: 'EHR', icon: 'mdi-hospital-building', description: 'Access the EHR system.' },
          { name: 'BigLink', icon: 'mdi-web', description: 'Manage conferences, forms and user access.' }
        ]
      }
    ]
  },
  po: {
    id: 'po',
    title: 'Procurement',
    icon: 'mdi-cart-outline',
    description:
      'Access and manage procurement processes, purchasing activities, supplier management, purchase orders and related operational services.',
    sections: [
      {
        title: 'Purchasing Management',
        items: [
          { name: 'Purchase Order Management', icon: 'mdi-cart-check', description: 'Create, submit, verify, approve and manage purchase orders.' },
          { name: 'Purchase Order Items Management', icon: 'mdi-package-variant', description: 'Manage items related to purchase orders.' },
          { name: 'Quotations Management', icon: 'mdi-file-document-edit', description: 'Manage quotations for purchase orders.' },
          { name: 'Terms and Conditions Management', icon: 'mdi-file-document-outline', description: 'Manage PO terms and conditions.' },
          { name: 'Vendors / Suppliers Management', icon: 'mdi-handshake', description: 'Manage vendor and supplier records.' }
        ]
      },
      {
        title: 'Asset & Equipment Management',
        items: [
          { name: 'Assets Management', icon: 'mdi-office-building', description: 'Register and manage company assets.' },
          { name: 'Consumables Management', icon: 'mdi-package-variant-closed', description: 'Manage consumable items and stock.' },
          { name: 'Calibration of Assets / Equipment Management', icon: 'mdi-tools', description: 'Manage equipment calibration activities.' },
          { name: 'Qualification of Assets / Equipment Management', icon: 'mdi-check-circle-outline', description: 'Manage equipment qualification activities.' },
          { name: 'Decommissioning Management', icon: 'mdi-recycle', description: 'Manage asset or equipment decommissioning.' }
        ]
      }
    ]
  },
  requisition: {
    id: 'requisition',
    title: 'Requisition',
    icon: 'mdi-file-document',
    description:
      'Access and manage request submissions, approval workflows, document requests and operational requisition processes.',
    sections: [
      {
        title: 'Request Management',
        items: [
          { name: 'General Requisitions Management', icon: 'mdi-file-plus', description: 'Create and manage general requisitions.' },
          { name: 'Technical Service Requisition (TSR)', icon: 'mdi-wrench', description: 'Create, approve and manage Technical Service Requisitions.' },
          { name: 'Product Development Requisition Form (PDRF)', icon: 'mdi-flask', description: 'Manage product development requisitions and approvals.' },
          { name: 'Transfer Slip', icon: 'mdi-swap-horizontal', description: 'Create, submit and track transfer slip forms.' },
          { name: 'Property Release Chit Management (e-PRC)', icon: 'mdi-tag-outline', description: 'Manage Property Release Chit records and requests.' },
          { name: 'e-MRR', icon: 'mdi-file-document', description: 'Manage E-MRR forms, approvals and Virtual Library.' },
          { name: 'e-Regulatory And Product Development (e-RPD)', icon: 'mdi-clipboard-list-outline', description: 'Manage regulatory forms, monitoring, reports and approvals.' }
        ]
      },
      {
        title: 'Approval & Workflow',
        items: [
          { name: 'Approval Workflow by System Module Management', icon: 'mdi-sync', description: 'Configure module approval workflows.' },
          { name: 'Unlock', icon: 'mdi-lock-open', description: 'Unlock users for system e-signature purposes.' }
        ]
      }
    ]
  },
  inventory: {
    id: 'inventory',
    title: 'Inventory',
    icon: 'mdi-package',
    description:
      'Access and manage inventory operations, stock control, consumables, assets and location management.',
    sections: [
      {
        title: 'Inventory Management',
        items: [
          { name: 'Inventory Management System (IMS)', icon: 'mdi-package', description: 'Manage spare parts, inventory, stock and approvals.' },
          { name: 'Inventory Categories & Subcategories Management', icon: 'mdi-layers', description: 'Manage inventory categories and subcategories.' },
          { name: 'Consumables Management', icon: 'mdi-toolbox', description: 'Manage consumable items and stock.' }
        ]
      },
      {
        title: 'Asset & Location Management',
        items: [
          { name: 'Assets Management', icon: 'mdi-office-building', description: 'Register and manage company assets.' },
          { name: 'Location Management', icon: 'mdi-map-marker', description: 'Manage organisation locations.' },
          { name: 'Location SAP', icon: 'mdi-web', description: 'View and maintain authorised SAP location records.' },
          { name: 'Location Sites Management', icon: 'mdi-factory', description: 'Manage sites under company locations.' },
          { name: 'Location Areas Management', icon: 'mdi-pin', description: 'Manage location areas.' },
          { name: 'Location Divisions Management', icon: 'mdi-map', description: 'Manage location divisions.' },
          { name: 'Location Floors Management', icon: 'mdi-office-building', description: 'Manage floors for each location.' }
        ]
      }
    ]
  }
})

const DEFAULT_SERVICE_ID = 'plant'

const getServiceById = (id: string): ServiceConfig =>
  serviceConfigs.value[id] || serviceConfigs.value[DEFAULT_SERVICE_ID]

const countServices = (service: ServiceConfig): number =>
  service.sections.reduce((sum, section) => sum + section.items.length, 0)

const slugify = (value: string): string =>
  value.toLowerCase().replace(/\s+/g, '-')

const resolveServiceTarget = (
  service: ServiceItem
): { type: 'ai' } | { type: 'navigate'; page: string } => {
  if (service.action === 'ai') {
    return { type: 'ai' }
  }
  if (service.page) {
    return { type: 'navigate', page: service.page }
  }
  return { type: 'navigate', page: slugify(service.name) }
}

const getServiceIds = (): string[] => Object.keys(serviceConfigs.value)

const addServiceConfig = (config: ServiceConfig) => {
  serviceConfigs.value[config.id] = config
}

const updateServiceConfig = (id: string, patch: Partial<ServiceConfig>) => {
  const existing = serviceConfigs.value[id]
  if (existing) {
    serviceConfigs.value[id] = { ...existing, ...patch }
  }
}

const removeServiceConfig = (id: string) => {
  delete serviceConfigs.value[id]
}

export const useServices = () => ({
  serviceConfigs,
  DEFAULT_SERVICE_ID,
  getServiceById,
  countServices,
  slugify,
  resolveServiceTarget,
  getServiceIds,
  addServiceConfig,
  updateServiceConfig,
  removeServiceConfig
})
