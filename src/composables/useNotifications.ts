// src/composables/useNotifications.ts
import { ref, computed } from 'vue'

export type NotificationType = 'alert' | 'leave' | 'success' | 'hr' | 'system'

export interface AppNotification {
  id: string
  title: string
  time: string
  read: boolean
  type: NotificationType
  link?: string
  createdAt?: string
}

const notifications = ref<AppNotification[]>([
  { id: 'n1', title: 'System Maintenance / Security Alert', time: 'Today, 12:00 PM',     read: false, type: 'alert'   },
  { id: 'n2', title: 'Annual leave application submitted',  time: 'Today, 11:45 AM',     read: false, type: 'leave'   },
  { id: 'n3', title: 'Leave application approved',          time: 'Today, 10:20 AM',     read: true,  type: 'success' },
  { id: 'n4', title: 'New employee record created',         time: 'Yesterday, 3:00 PM',  read: true,  type: 'hr'      },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const iconFor = (n: AppNotification): string => {
  switch (n.type) {
    case 'alert':   return 'mdi-alert-circle-outline'
    case 'leave':   return 'mdi-calendar-clock-outline'
    case 'success': return 'mdi-check-circle-outline'
    case 'hr':      return 'mdi-account-plus-outline'
    default:        return 'mdi-bell-outline'
  }
}

const markAsRead = (id: string) => {
  const n = notifications.value.find(x => x.id === id)
  if (n) n.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach(n => (n.read = true))
}

const addNotification = (n: Omit<AppNotification, 'id' | 'read'>) => {
  notifications.value.unshift({
    ...n,
    id: crypto.randomUUID(),
    read: false,
  })
}

const removeNotification = (id: string) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const clearAll = () => {
  notifications.value = []
}

export const useNotifications = () => ({
  notifications,
  unreadCount,
  iconFor,
  markAsRead,
  markAllAsRead,
  addNotification,
  removeNotification,
  clearAll,
})
