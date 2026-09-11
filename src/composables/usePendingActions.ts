// src/composables/usePendingActions.ts
import { ref, computed } from 'vue'

export type PendingUrgency = 'urgent' | 'normal' | 'low'

export interface PendingAction {
  id: number
  name: string
  ref: string
  date: string
  status: string
  urgency: PendingUrgency
  icon: string
}

const pendingActions = ref<PendingAction[]>([
  {
    id: 1,
    name: 'Leave Application',
    ref: 'LA-2026-000123',
    date: '24 Jul 2026, 10:30 AM',
    status: 'Pending Approval',
    urgency: 'urgent',
    icon: 'mdi-calendar-outline'
  },
  {
    id: 2,
    name: 'Work Order',
    ref: 'WO-2026-000456',
    date: '24 Jul 2026, 09:15 AM',
    status: 'Pending IT Approval',
    urgency: 'urgent',
    icon: 'mdi-wrench'
  },
  {
    id: 3,
    name: 'Training Attendance',
    ref: 'TR-2026-000789',
    date: '23 Jul 2026, 04:45 PM',
    status: 'Pending Verification',
    urgency: 'normal',
    icon: 'mdi-account-group'
  },
  {
    id: 4,
    name: 'Purchase Requisition',
    ref: 'PR-2026-000321',
    date: '23 Jul 2026, 03:45 PM',
    status: 'Pending Approval',
    urgency: 'normal',
    icon: 'mdi-file-document-outline'
  },
  {
    id: 5,
    name: 'HR Requisition',
    ref: 'HR-2026-000654',
    date: '22 Jul 2026, 02:30 PM',
    status: 'Pending Review',
    urgency: 'low',
    icon: 'mdi-account-plus'
  },
  {
    id: 6,
    name: 'IT Support Ticket',
    ref: 'IT-2026-000789',
    date: '21 Jul 2026, 11:20 AM',
    status: 'Pending Assignment',
    urgency: 'normal',
    icon: 'mdi-help-circle'
  },
  {
    id: 7,
    name: 'Project Proposal Review',
    ref: 'PP-2026-000234',
    date: '20 Jul 2026, 02:00 PM',
    status: 'Pending Review',
    urgency: 'low',
    icon: 'mdi-file-document-edit'
  }
])

const totalCount = computed(() => pendingActions.value.length)

const countByUrgency = (urgency: PendingUrgency) =>
  pendingActions.value.filter(a => a.urgency === urgency).length

const urgentCount = computed(() => countByUrgency('urgent'))
const normalCount = computed(() => countByUrgency('normal'))
const lowCount = computed(() => countByUrgency('low'))

const urgencyPercentage = (urgency: PendingUrgency) => {
  const total = pendingActions.value.length || 1
  return (countByUrgency(urgency) / total) * 100
}

const urgencyColor = (urgency: PendingUrgency): string => {
  switch (urgency) {
    case 'urgent': return 'error'
    case 'normal': return 'warning'
    default: return 'grey'
  }
}

const getById = (id: number) => pendingActions.value.find(a => a.id === id)

const addPendingAction = (a: Omit<PendingAction, 'id'>) => {
  const nextId = Math.max(0, ...pendingActions.value.map(x => x.id)) + 1
  pendingActions.value.unshift({ ...a, id: nextId })
}

const updatePendingAction = (id: number, patch: Partial<PendingAction>) => {
  const idx = pendingActions.value.findIndex(a => a.id === id)
  if (idx !== -1) {
    pendingActions.value[idx] = { ...pendingActions.value[idx], ...patch }
  }
}

const removePendingAction = (id: number) => {
  pendingActions.value = pendingActions.value.filter(a => a.id !== id)
}

const clearAll = () => {
  pendingActions.value = []
}

export const usePendingActions = () => ({
  pendingActions,
  totalCount,
  urgentCount,
  normalCount,
  lowCount,
  countByUrgency,
  urgencyPercentage,
  urgencyColor,
  getById,
  addPendingAction,
  updatePendingAction,
  removePendingAction,
  clearAll
})
