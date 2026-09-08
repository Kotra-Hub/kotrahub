<!-- src/views/ServicePage.vue -->
<template>
  <div class="service-page animate-pop-in">
    <!-- Page Header -->
    <div class="header-section mb-6">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon :icon="currentService.icon" size="28" :color="iconColor" />
        </div>
        <div class="header-text">
          <h2 class="text-h4 font-weight-bold text-primary">
            {{ currentService.title }}
          </h2>
          <p class="text-body-1 text-medium-emphasis mt-1">
            {{ currentService.description }}
          </p>
          <p class="text-caption text-medium-emphasis mt-0.5">
            Services Available: {{ totalServiceCount }}
          </p>
        </div>
      </div>
    </div>

    <!-- Service Sections -->
    <div class="service-sections">
      <v-card
        v-for="section in currentService.sections"
        :key="section.title"
        class="section-card mb-5"
        variant="outlined"
        rounded="lg"
      >
        <v-card-title class="section-title px-5 py-3">
          {{ section.title }}
        </v-card-title>

        <v-divider />

        <div class="service-list">
          <div
            v-for="service in section.items"
            :key="service.name"
            class="service-item"
            @click="handleServiceAction(service)"
          >
            <div class="col-icon">
              <div class="service-icon-wrapper">
                <v-icon :icon="service.icon || 'mdi-cog'" size="20" :color="iconColor" />
              </div>
            </div>

            <div class="col-name">
              <span class="service-name">{{ service.name }}</span>
            </div>

            <div class="col-description">
              <span class="service-description">{{ service.description }}</span>
            </div>

            <div class="col-action">
              <div class="service-action">
                <span class="action-text">View</span>
                <v-icon icon="mdi-arrow-right" size="18" :color="iconColor" />
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

interface ServiceItem {
  name: string
  description: string
  icon?: string
  action?: string
  page?: string
}

interface ServiceSection {
  title: string
  items: ServiceItem[]
}

interface ServiceConfig {
  id: string
  title: string
  icon: string
  description: string
  sections: ServiceSection[]
}

const theme = useTheme()
const isDark = computed(() => theme.current.value.dark)
const iconColor = computed(() => isDark.value ? '#ffffff' : 'primary')

const props = defineProps<{
  serviceId: string
}>()

const emit = defineEmits<{
  (e: 'navigate', page: string): void
  (e: 'openAI'): void
}>()

// List of Services
const serviceConfigs: Record<string, ServiceConfig> = {
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
          { name: 'Line Monitoring', icon: 'mdi-chart-line', description: 'Access production line monitoring dashboard.'},
          { name: 'Plant Performance Monitoring System (PPMS)', icon: 'mdi-gauge', description: 'Monitor plant performance information, entries and reports.' },
          { name: 'Material Management', icon: 'mdi-package-variant', description: 'Manage production materials, material records and batch preparation.'},
          { name: 'Planner', icon: 'mdi-calendar-clock', description: 'Manage batch planning, scheduling and production monitoring.'},
          { name: 'Inventory Management System (IMS)', icon: 'mdi-warehouse', description: 'Manage spare parts, inventory, stock and approvals.'}
        ]
      },
      {
        title: 'Quality & Regulatory',
        items: [
          { name: 'Quality Assurance', icon: 'mdi-flask', description: 'Manage formula, recipe, UOM and batch approval management.'},
          { name: 'British Pharmacopoeia', icon: 'mdi-book-open-variant', description: 'Access and manage British Pharmacopoeia publications.'},
          { name: 'Stability', icon: 'mdi-flask-empty-outline', description: 'Manage stability plans, samples, reports and administration.'},
          { name: 'Filter', icon: 'mdi-filter-variant', description: 'Access and maintain authorised PQA filter information.'},
          { name: 'Product QR', icon: 'mdi-qrcode',  description: 'Access and use available product QR information.'},
          { name: 'GS1 (UAE)', icon: 'mdi-barcode', description: 'Manage authorised GS1 UAE records.'},
          { name: 'Approved Supplier List & Halal Monitoring List (e-ASL&HML)', icon: 'mdi-file-check-outline', description: 'Manage approved suppliers, halal monitoring and master data.'}
        ]
      },
      {
        title: 'Technical Services',
        items: [
          { name: 'Work Order', icon: 'mdi-clipboard-list-outline', description: 'Create, track and process Work Order requests.'},
          { name: 'Technical Service Requisition (TSR)', icon: 'mdi-file-sign', description: 'Create, approve and manage Technical Service Requisitions.'},
          { name: 'TSP', icon: 'mdi-file-sign', description: 'Manage Technical Services Reports and related records.'},
          { name: 'Calibration of Assets / Equipment Management', icon: 'mdi-ruler', description: 'Manage equipment calibration activities and records.'},
          { name: 'Qualification of Assets / Equipment Management', icon: 'mdi-check-circle-outline', description: 'Manage equipment qualification activities and documentation.'},
          { name: 'Decommissioning Management', icon: 'mdi-close-circle-outline', description: 'Manage asset or equipment decommissioning processes.'},
          { name: 'Line Clearance', icon: 'mdi-broom', description: 'Manage area clearance processes, records and audit trail.'},
          { name: 'Leak Tester 19/167', icon: 'mdi-water', description: 'Access the Leak Tester system.'},
          { name: 'Friability Tester CAL/QC/O/0150', icon: 'mdi-flask', description: 'Access the Friability Tester system.'},
        ]
      },
      {
        title: 'Project Management',
        items: [
          { name: 'Project Management System (PMS)', icon: 'mdi-file-tree', description: 'Manage projects, processes, teams, timesheets and reports.'},
          { name: 'Projects Management', icon: 'mdi-folder-open', description: 'Create and manage projects.'},
          { name: 'Project Tasks Management', icon: 'mdi-format-list-checkbox', description: 'Create, assign and track project tasks.'},
          { name: 'UAT / FAT Module Management', icon: 'mdi-clipboard-check-outline', description: 'Manage UAT and FAT activities.'}
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
          { name: 'Sales Automation Solutions (SAS)', icon: 'mdi-chart-line', description: 'Price, customer and ordering management.'},
          { name: 'Agreement Management', icon: 'mdi-file-document-check-outline', description: 'Create, review, approve and manage agreement records.'},
          { name: 'Product Information', icon: 'mdi-package-variant', description: 'Create, review and manage product and marketing information.'},
          { name: 'Appeton Signage', icon: 'mdi-television-classic', description: 'Manage Appeton Signage applications and approval workflow.'},
          { name: 'BigLink Rebate', icon: 'mdi-hand-coin-outline', description: 'Rebate submission, verification, approval and payout.'}
        ]
      },
      {
        title: 'Finance Transaction',
        items: [
          { name: 'AP Management', icon: 'mdi-invoice', description: 'Manage AP records, approval, payment status and reports.'},
          { name: 'EFT', icon: 'mdi-credit-card-outline', description: 'Process and manage authorised EFT transactions.'},
          { name: 'E-Invoice', icon: 'mdi-file-check-outline', description: 'Create, validate, process and report e-Invoice records.'}
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
          { name: 'Staff Dashboard', icon: 'mdi-chart-line', description: 'View overall staff information, activities and summary.'},
          { name: 'My Staff Dashboard', icon: 'mdi-account', description: 'View assigned staff information and progress overview.'}
        ]
      },
      {
        title: 'Employee Management',
        items: [
          { name: 'Employee Staff', icon: 'mdi-account-group', description: 'Manage employee staff information and records.'},
          { name: 'New Employee List', icon: 'mdi-account-plus', description: 'Manage newly joined employee records.'},
          { name: 'Staff Tracker', icon: 'mdi-map-marker', description: 'Track employee status, activities and progress.'},
          { name: 'Checklist Management', icon: 'mdi-clipboard-check', description: 'Manage employee checklists and completion status.'},
          { name: 'Required Documents', icon: 'mdi-folder-open', description: 'Manage required employee documents and submissions.'},
          { name: 'Staff Reports', icon: 'mdi-file-document', description: 'View and manage staff reports.'}
        ]
      },
      {
        title: 'Staff Workspace',
        items: [
          { name: 'My Tasks', icon: 'mdi-checkbox-marked-circle', description: 'View and manage assigned staff tasks.'},
          { name: 'My Staff Progress', icon: 'mdi-chart-bar', description: 'Monitor staff development and progress tracking.'}
        ]
      },
      {
        title: 'Training & Development',
        items: [
          { name: 'Training Record System (TRS)', icon: 'mdi-book-open-variant', description: 'Manage training calendar, attendance and reports.'},
          { name: 'Training Record System (TRS - SMO)', icon: 'mdi-clipboard-text', description: 'Manage SMO training attendance and reporting.'}
        ]
      },
      {
        title: 'HR & Employee Services',
        items: [
          { name: 'Human Resource', icon: 'mdi-office-building', description: 'Access HR requisitions, handbook and leave / gate pass services.'},
          { name: 'Employees Management', icon: 'mdi-id-card', description: 'Manage employee records and system information.'},
          { name: 'Staff Purchase', icon: 'mdi-cart', description: 'Manage staff purchase orders, uploads, receipts and reports.'},
          { name: 'Claims Management', icon: 'mdi-cash', description: 'Submit and manage claims.'},
          { name: 'Events Management', icon: 'mdi-calendar', description: 'Create and manage company events.'},
          { name: 'Surveys / Questionnaires Management', icon: 'mdi-clipboard-text', description: 'Create and manage surveys and questionnaires.'}
        ]
      },
      {
        title: 'Staff Applications',
        items: [
          { name: 'e-Library', icon: 'mdi-book-open-variant', description: 'Access and share authorised links and files.'},
          { name: 'NDMS', icon: 'mdi-database', description: 'Access the NDMS system.',},
          { name: 'VTFP', icon: 'mdi-cog', description: 'Access the VTFP system.'},
          { name: 'SIS', icon: 'mdi-chart-line', description: 'Access SIS reports.'},
          { name: 'EHR', icon: 'mdi-hospital-building', description: 'Access the EHR system.'},
          { name: 'BigLink', icon: 'mdi-web', description: 'Manage conferences, forms and user access.'}
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
          { name: 'Purchase Order Management', icon: 'mdi-cart-check', description: 'Create, submit, verify, approve and manage purchase orders.'},
          { name: 'Purchase Order Items Management', icon: 'mdi-package-variant', description: 'Manage items related to purchase orders.'},
          { name: 'Quotations Management', icon: 'mdi-file-document-edit', description: 'Manage quotations for purchase orders.'},
          { name: 'Terms and Conditions Management', icon: 'mdi-file-document-outline', description: 'Manage PO terms and conditions.'},
          { name: 'Vendors / Suppliers Management', icon: 'mdi-handshake', description: 'Manage vendor and supplier records.'}
        ]
      },
      {
        title: 'Asset & Equipment Management',
        items: [
          { name: 'Assets Management', icon: 'mdi-office-building', description: 'Register and manage company assets.'},
          { name: 'Consumables Management', icon: 'mdi-package-variant-closed', description: 'Manage consumable items and stock.'},
          { name: 'Calibration of Assets / Equipment Management', icon: 'mdi-tools', description: 'Manage equipment calibration activities.'},
          { name: 'Qualification of Assets / Equipment Management', icon: 'mdi-check-circle-outline', description: 'Manage equipment qualification activities.'},
          { name: 'Decommissioning Management', icon: 'mdi-recycle', description: 'Manage asset or equipment decommissioning.'}
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
          { name: 'General Requisitions Management', icon: 'mdi-file-plus', description: 'Create and manage general requisitions.'},
          { name: 'Technical Service Requisition (TSR)', icon: 'mdi-wrench', description: 'Create, approve and manage Technical Service Requisitions.'},
          { name: 'Product Development Requisition Form (PDRF)', icon: 'mdi-flask', description: 'Manage product development requisitions and approvals.'},
          { name: 'Transfer Slip', icon: 'mdi-swap-horizontal', description: 'Create, submit and track transfer slip forms.'},
          { name: 'Property Release Chit Management (e-PRC)', icon: 'mdi-tag-outline', description: 'Manage Property Release Chit records and requests.'},
          { name: 'e-MRR', icon: 'mdi-file-document', description: 'Manage E-MRR forms, approvals and Virtual Library.'},
          { name: 'e-Regulatory And Product Development (e-RPD)', icon: 'mdi-clipboard-list-outline', description: 'Manage regulatory forms, monitoring, reports and approvals.'}
        ]
      },
      {
        title: 'Approval & Workflow',
        items: [
          { name: 'Approval Workflow by System Module Management', icon: 'mdi-sync', description: 'Configure module approval workflows.'},
          { name: 'Unlock', icon: 'mdi-lock-open', description: 'Unlock users for system e-signature purposes.'}
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
          { name: 'Inventory Management System (IMS)', icon: 'mdi-package', description: 'Manage spare parts, inventory, stock and approvals.'},
          { name: 'Inventory Categories & Subcategories Management', icon: 'mdi-layers', description: 'Manage inventory categories and subcategories.'},
          { name: 'Consumables Management', icon: 'mdi-toolbox', description: 'Manage consumable items and stock.'}
        ]
      },
      {
        title: 'Asset & Location Management',
        items: [
          { name: 'Assets Management', icon: 'mdi-office-building', description: 'Register and manage company assets.'},
          { name: 'Location Management', icon: 'mdi-map-marker', description: 'Manage organisation locations.'},
          { name: 'Location SAP', icon: 'mdi-web', description: 'View and maintain authorised SAP location records.'},
          { name: 'Location Sites Management', icon: 'mdi-factory', description: 'Manage sites under company locations.'},
          { name: 'Location Areas Management', icon: 'mdi-pin', description: 'Manage location areas.'},
          { name: 'Location Divisions Management', icon: 'mdi-map', description: 'Manage location divisions.'},
          { name: 'Location Floors Management', icon: 'mdi-office-building', description: 'Manage floors for each location.'}
        ]
      }
    ]
  }
}

const currentService = computed(() => {
  return serviceConfigs[props.serviceId] || serviceConfigs.plant
})

const totalServiceCount = computed(() => {
  let count = 0
  currentService.value.sections.forEach(section => {
    count += section.items.length
  })
  return count
})

// Handle service action (click on View button)
const handleServiceAction = (service: ServiceItem) => {
  if (service.action === 'ai') {
    emit('openAI')
  } else if (service.page) {
    emit('navigate', service.page)
  } else {
    emit('navigate', service.name.toLowerCase().replace(/\s+/g, '-'))
  }
}
</script>

<style scoped>
.service-page {
  animation: popIn 0.18s ease-out;
}

@keyframes popIn {
  0% {
    transform: scale(0.95) translateY(6px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

/* Header Section */
.header-section {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.header-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: rgb(var(--v-theme-primaryBg)) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-text h2 {
  color: rgb(var(--v-theme-darkText)) !important;
}

.section-card {
  background: rgb(var(--v-theme-surface)) !important;
  border-color: rgb(var(--v-theme-borderLight)) !important;
  overflow: hidden;
}

.section-title {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: rgb(var(--v-theme-darkText)) !important;
  padding: 12px 20px !important;
}

.service-list {
  background: transparent !important;
  padding: 0 !important;
}

.service-item {
  display: flex !important;
  align-items: center !important;
  min-height: 56px !important;
  padding: 10px 20px !important;
  border-bottom: 1px solid rgb(var(--v-theme-borderLight)) !important;
  transition: background 0.15s ease !important;
  cursor: pointer !important;
}

.service-item:last-child {
  border-bottom: none !important;
}

.service-item:hover {
  background: rgb(var(--v-theme-primaryBg)) !important;
}

.col-icon {
  width: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-name {
  width: 30%;
  flex-shrink: 0;
  padding-right: 16px;
}

.col-description {
  flex: 1;
  min-width: 0;
  padding-right: 16px;
}

.col-action {
  width: 90px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.service-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgb(var(--v-theme-primaryBg)) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-name {
  font-size: 15px !important;
  font-weight: 600 !important;
  color: rgb(var(--v-theme-darkText)) !important;
  white-space: nowrap !important;
  display: block !important;
}

.service-description {
  font-size: 15px !important;
  color: rgb(var(--v-theme-textMuted)) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: block !important;
}

.service-action {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.service-action .action-text {
  display: none;
}

@media (min-width: 600px) {
  .service-action .action-text {
    display: inline;
  }
}

:deep(.v-theme--dark) .header-icon-wrapper {
  background: rgba(15, 157, 154, 0.15) !important;
}

:deep(.v-theme--dark) .service-item:hover {
  background: rgba(15, 157, 154, 0.1) !important;
}

:deep(.v-theme--dark) .service-icon-wrapper {
  background: rgba(15, 157, 154, 0.12) !important;
}

:deep(.v-theme--dark) .section-card {
  border-color: rgb(var(--v-theme-borderLight)) !important;
}

@media (min-width: 600px) and (max-width: 899px) {
  .service-item {
    flex-wrap: nowrap !important;
    gap: 8px !important;
    min-height: 44px !important;
    padding: 4px 12px !important;
  }

  .col-icon {
    width: 32px !important;
    flex-shrink: 0 !important;
  }

  .col-name {
    width: auto !important;
    flex: 0 0 auto !important;
    max-width: 35% !important;
    padding-right: 8px !important;
  }

  .col-description {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    padding-right: 8px !important;
  }

  .col-action {
    width: auto !important;
    flex-shrink: 0 !important;
  }

  .service-name {
    font-size: 13px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-description {
    font-size: 12px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-icon-wrapper {
    width: 24px;
    height: 24px;
  }

  .service-icon-wrapper .v-icon {
    font-size: 15px !important;
  }

  .service-action {
    font-size: 13px !important;
  }

  .service-action .v-icon {
    font-size: 14px !important;
  }
}

@media (max-width: 599px) {
  .service-item {
    flex-wrap: nowrap !important;
    gap: 6px !important;
    min-height: 40px !important;
    padding: 4px 8px !important;
  }

  .col-icon {
    width: 28px !important;
    flex-shrink: 0 !important;
  }

  .col-name {
    width: auto !important;
    flex: 0 0 auto !important;
    max-width: 30% !important;
    padding-right: 6px !important;
  }

  .col-description {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    padding-right: 6px !important;
  }

  .col-action {
    width: auto !important;
    flex-shrink: 0 !important;
  }

  .service-name {
    font-size: 12px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-description {
    font-size: 11px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-icon-wrapper {
    width: 20px;
    height: 20px;
  }

  .service-icon-wrapper .v-icon {
    font-size: 12px !important;
  }

  .service-action {
    font-size: 11px !important;
  }

  .service-action .v-icon {
    font-size: 11px !important;
  }

  .service-action .action-text {
    display: none !important;
  }
}

@media (max-width: 899px) {
  .header-content {
    gap: 12px;
  }

  .header-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .header-icon-wrapper .v-icon {
    font-size: 22px !important;
  }

  .header-text h2 {
    font-size: 20px !important;
  }

  .header-text p {
    font-size: 13px !important;
  }

  .section-title {
    font-size: 15px !important;
    padding: 10px 16px !important;
  }
}

@media (max-width: 599px) {
  .header-content {
    gap: 10px;
  }

  .header-icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .header-icon-wrapper .v-icon {
    font-size: 18px !important;
  }

  .header-text h2 {
    font-size: 17px !important;
  }

  .header-text p {
    font-size: 12px !important;
  }

  .section-title {
    font-size: 14px !important;
    padding: 8px 12px !important;
  }
}
</style>
