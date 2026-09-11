// src/composables/useRecentActivities.ts
import { ref } from 'vue'

export type ActivityType =
  | 'Login'
  | 'Logout'
  | 'Navigation'
  | 'Action'
  | 'Update'
  | 'View'
  | 'System'

export type TimeRange =
  | 'All Time'
  | 'Today'
  | 'This Week'
  | 'This Month'
  | 'Last 3 Months'

export interface Activity {
  id: number
  action: string
  date: string
  time: string
  relativeTime: string
  type: ActivityType
  icon: string
  details?: string
}

const activities = ref<Activity[]>([
  {
    id: 1,
    action: 'Logged in to the system',
    date: '27 Aug 2026',
    time: '02:15 PM',
    relativeTime: '2 Minutes Ago',
    type: 'Login',
    icon: 'mdi-login',
    details: 'Successful login from IP 192.168.1.100'
  },
  {
    id: 2,
    action: 'Updated Quick Access shortcuts',
    date: '27 Aug 2026',
    time: '02:02 PM',
    relativeTime: '15 Minutes Ago',
    type: 'Update',
    icon: 'mdi-lightning-bolt',
    details: 'Reordered and added 2 new shortcuts'
  },
  {
    id: 3,
    action: 'Completed pending action',
    date: '27 Aug 2026',
    time: '01:15 PM',
    relativeTime: '1 Hour Ago',
    type: 'Action',
    icon: 'mdi-check-circle',
    details: 'Approved Leave Application LA-2026-000123'
  },
  {
    id: 4,
    action: 'Checked Calendar events',
    date: '27 Aug 2026',
    time: '12:15 PM',
    relativeTime: '2 Hours Ago',
    type: 'View',
    icon: 'mdi-calendar-check',
    details: 'Viewed upcoming 5 events for this week'
  },
  {
    id: 5,
    action: 'Viewed Announcements',
    date: '27 Aug 2026',
    time: '11:15 AM',
    relativeTime: '3 Hours Ago',
    type: 'View',
    icon: 'mdi-bullhorn',
    details: 'Viewed 3 new announcements'
  },
  {
    id: 6,
    action: 'Viewed Recent Activities',
    date: '27 Aug 2026',
    time: '11:10 AM',
    relativeTime: '3 Hours Ago',
    type: 'View',
    icon: 'mdi-clock',
    details: 'Visited Recent Activities page'
  },
  {
    id: 7,
    action: 'Submitted Purchase Requisition',
    date: '27 Aug 2026',
    time: '10:45 AM',
    relativeTime: '4 Hours Ago',
    type: 'Action',
    icon: 'mdi-file-document-outline',
    details: 'PR-2026-000987 for IT equipment'
  },
  {
    id: 8,
    action: 'Logged out of the system',
    date: '27 Aug 2026',
    time: '10:30 AM',
    relativeTime: '4 Hours Ago',
    type: 'Logout',
    icon: 'mdi-logout',
    details: 'Session duration: 2 hours 15 minutes'
  },
  {
    id: 9,
    action: 'Changed password',
    date: '26 Aug 2026',
    time: '05:20 PM',
    relativeTime: 'Yesterday',
    type: 'Update',
    icon: 'mdi-lock-reset',
    details: 'Password updated successfully'
  },
  {
    id: 10,
    action: 'Updated profile information',
    date: '26 Aug 2026',
    time: '04:45 PM',
    relativeTime: 'Yesterday',
    type: 'Update',
    icon: 'mdi-account-edit',
    details: 'Updated job title and department'
  },
  {
    id: 11,
    action: 'Viewed Dashboard',
    date: '26 Aug 2026',
    time: '09:00 AM',
    relativeTime: 'Yesterday',
    type: 'View',
    icon: 'mdi-view-dashboard',
    details: 'Dashboard overview'
  },
  {
    id: 12,
    action: 'System maintenance completed',
    date: '25 Aug 2026',
    time: '11:30 PM',
    relativeTime: '2 Days Ago',
    type: 'System',
    icon: 'mdi-server',
    details: 'Database backup and performance optimization'
  }
])

const activityTypes: (ActivityType | 'All')[] = [
  'All',
  'Login',
  'Logout',
  'Navigation',
  'Action',
  'Update',
  'View',
  'System'
]

const timeRanges: TimeRange[] = [
  'All Time',
  'Today',
  'This Week',
  'This Month',
  'Last 3 Months'
]

const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
}

const parseActivityDate = (dateStr: string): Date => {
  const parts = dateStr.split(' ')
  return new Date(
    parseInt(parts[2]),
    MONTH_MAP[parts[1]],
    parseInt(parts[0])
  )
}

const filterActivities = (
  items: Activity[],
  search: string,
  type: string,
  timeRange: TimeRange
): Activity[] => {
  let result = [...items]

  if (search.trim()) {
    const q = search.trim().toLowerCase()
    result = result.filter(a =>
      a.action.toLowerCase().includes(q) ||
      a.type.toLowerCase().includes(q) ||
      (a.details && a.details.toLowerCase().includes(q))
    )
  }

  if (type !== 'All') {
    result = result.filter(a => a.type === type)
  }

  if (timeRange !== 'All Time') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    result = result.filter(a => {
      const activityDate = parseActivityDate(a.date)

      switch (timeRange) {
        case 'Today':
          return activityDate >= today
        case 'This Week': {
          const weekStart = new Date(today)
          weekStart.setDate(today.getDate() - today.getDay())
          return activityDate >= weekStart
        }
        case 'This Month': {
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
          return activityDate >= monthStart
        }
        case 'Last 3 Months': {
          const threeMonthsAgo = new Date(today)
          threeMonthsAgo.setMonth(today.getMonth() - 3)
          return activityDate >= threeMonthsAgo
        }
        default:
          return true
      }
    })
  }

  result.sort((a, b) => {
    const aDate = parseActivityDate(a.date)
    const bDate = parseActivityDate(b.date)
    return bDate.getTime() - aDate.getTime()
  })

  return result
}

const getActivityTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    Login: 'primary',
    Logout: 'grey',
    Navigation: 'info',
    Action: 'success',
    Update: 'warning',
    View: 'primary-lighten-1',
    System: 'purple'
  }
  return colors[type] || 'grey'
}

const getRelativeTimeColor = (relativeTime: string): string => {
  if (relativeTime.includes('Minute') || relativeTime.includes('Hour')) {
    return 'rgb(var(--v-theme-primary))'
  }
  if (relativeTime.includes('Yesterday') || relativeTime.includes('Day')) {
    return 'rgb(var(--v-theme-warning))'
  }
  return 'rgb(var(--v-theme-textMuted))'
}

const addActivity = (a: Omit<Activity, 'id'>) => {
  const nextId = Math.max(0, ...activities.value.map(x => x.id)) + 1
  activities.value.unshift({ ...a, id: nextId })
}

const removeActivity = (id: number) => {
  activities.value = activities.value.filter(a => a.id !== id)
}

const clearAll = () => {
  activities.value = []
}

const resetActivities = (items: Activity[]) => {
  activities.value = [...items]
}

export const useRecentActivities = () => ({
  activities,
  activityTypes,
  timeRanges,
  filterActivities,
  getActivityTypeColor,
  getRelativeTimeColor,
  addActivity,
  removeActivity,
  clearAll,
  resetActivities
})
