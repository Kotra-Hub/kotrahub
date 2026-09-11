// src/composables/useSearchData.ts
import { ref, computed } from 'vue'

export type SearchCategory =
  | 'AI'
  | 'Navigation'
  | 'Services'
  | 'Operations'
  | 'Reports'
  | 'Actions'
  | 'Help'

export interface SearchItem {
  id: string
  label: string
  icon: string
  meta: string
  category: SearchCategory
  description?: string
  keywords?: string[]
}

const searchItems = ref<SearchItem[]>([
  { id: 'ai-assistant', label: 'KPAI Assistant', icon: 'mdi-robot-happy', meta: 'Chat with KPAI', category: 'AI', description: 'Ask KPAI for help navigating KotraHub or get support', keywords: ['ai', 'assistant', 'kpai', 'chat', 'bot', 'help me'] },

  { id: 'dashboard', label: 'Dashboard', icon: 'mdi-view-dashboard', meta: 'Home page', category: 'Navigation', description: 'Overview of your workspace and shortcuts', keywords: ['home', 'main', 'overview'] },
  { id: 'profile', label: 'Profile Details', icon: 'mdi-account', meta: 'View and edit profile', category: 'Navigation', description: 'Manage your personal info and preferences', keywords: ['account', 'user', 'me'] },
  { id: 'settings', label: 'Settings', icon: 'mdi-cog', meta: 'App preferences', category: 'Navigation', description: 'Theme, notifications, and system settings', keywords: ['preferences', 'config', 'theme'] },
  { id: 'phonedirectory', label: 'Phone Directory', icon: 'mdi-phone', meta: 'Find colleagues', category: 'Navigation', description: 'Search contacts by name, department, or team', keywords: ['contact', 'directory', 'colleague', 'extension', 'ext'] },
  { id: 'announcements', label: 'Announcements', icon: 'mdi-bullhorn', meta: 'Company news', category: 'Navigation', description: 'Latest company-wide announcements', keywords: ['news', 'notice', 'memo'] },
  { id: 'calendar', label: 'Calendar Agenda', icon: 'mdi-calendar', meta: 'Events and meetings', category: 'Navigation', description: 'Your schedule and team calendar', keywords: ['schedule', 'events', 'meeting'] },
  { id: 'quickaccess', label: 'Quick Access', icon: 'mdi-lightning-bolt', meta: 'Shortcuts', category: 'Navigation', description: 'Frequently used services and links', keywords: ['shortcut', 'favorite', 'pin'] },

  { id: 'plant', label: 'Plant', icon: 'mdi-factory', meta: 'Plant services', category: 'Services', description: 'Plant operations, monitoring, and production', keywords: ['factory', 'production', 'manufacturing'] },
  { id: 'sales', label: 'Sales', icon: 'mdi-chart-line', meta: 'Sales services', category: 'Services', description: 'Sales analytics, orders, and customers', keywords: ['revenue', 'orders', 'customer', 'crm'] },
  { id: 'employee', label: 'Staff', icon: 'mdi-account-group', meta: 'Employee services', category: 'Services', description: 'Employee records, org chart, and management', keywords: ['hr', 'employee', 'staff', 'people', 'directory'] },
  { id: 'po', label: 'Procurement', icon: 'mdi-cart', meta: 'PO services', category: 'Services', description: 'Purchase orders and vendor management', keywords: ['purchase', 'po', 'order', 'vendor', 'supplier'] },
  { id: 'requisition', label: 'Requisition', icon: 'mdi-file-document', meta: 'Requisition services', category: 'Services', description: 'Submit and track requisitions', keywords: ['request', 'form', 'req'] },
  { id: 'inventory', label: 'Inventory', icon: 'mdi-package', meta: 'Inventory services', category: 'Services', description: 'Stock levels and warehouse management', keywords: ['stock', 'warehouse', 'items'] },

  { id: 'pending', label: 'Pending Actions', icon: 'mdi-clock-outline', meta: 'Things awaiting you', category: 'Operations', description: 'Tasks and approvals pending your action', keywords: ['approval', 'task', 'todo', 'pending'] },
  { id: 'recent-activities', label: 'Recent Activities', icon: 'mdi-history', meta: 'Your history', category: 'Operations', description: 'Recently viewed and modified items', keywords: ['history', 'recent', 'log'] },

  { id: 'reports-sales', label: 'Sales Report', icon: 'mdi-file-chart', meta: 'Monthly sales report', category: 'Reports', description: 'Detailed sales performance by period', keywords: ['report', 'analytics', 'revenue', 'kpi'] },
  { id: 'reports-hr', label: 'HR Report', icon: 'mdi-file-account', meta: 'HR analytics', category: 'Reports', description: 'Headcount, attendance, and payroll', keywords: ['report', 'hr', 'payroll', 'people'] },

  { id: 'action-leave', label: 'Apply Leave', icon: 'mdi-calendar-plus', meta: 'Submit leave request', category: 'Actions', description: 'Request time off from your manager', keywords: ['leave', 'vacation', 'time off', 'annual'] },
  { id: 'action-claim', label: 'Submit Claim', icon: 'mdi-receipt', meta: 'File expense claim', category: 'Actions', description: 'Reimburse an expense from company budget', keywords: ['claim', 'expense', 'reimburse', 'money'] },

  //{ id: 'help', label: 'Help & Support', icon: 'mdi-help-circle', meta: 'Get assistance', category: 'Help', description: 'FAQs, guides, and contact IT support', keywords: ['help', 'support', 'faq', 'guide', 'it'] },
])

const matchesQuery = (item: SearchItem, q: string): boolean => {
  return (
    item.label.toLowerCase().includes(q) ||
    item.meta.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    (item.description?.toLowerCase().includes(q) ?? false) ||
    (item.keywords?.some(k => k.toLowerCase().includes(q)) ?? false)
  )
}

export const getTopResults = (query: string, limit = 5): SearchItem[] => {
  const q = query.toLowerCase().trim()

  if (!q) {
    const defaults = ['dashboard', 'phonedirectory', 'pending', 'plant', 'sales']
    return searchItems.value.filter(i => defaults.includes(i.id)).slice(0, limit)
  }

  return searchItems.value.filter(i => matchesQuery(i, q)).slice(0, limit)
}

export const getAllResults = (query: string): SearchItem[] => {
  const q = query.toLowerCase().trim()
  if (!q) return searchItems.value
  return searchItems.value.filter(i => matchesQuery(i, q))
}

export const useSearchData = () => ({
  searchItems,
  getTopResults,
  getAllResults,
  categories: computed<SearchCategory[]>(() =>
    [...new Set(searchItems.value.map(i => i.category))] as SearchCategory[]
  ),
})
