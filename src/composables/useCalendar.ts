// src/composables/useCalendar.ts
import { ref } from 'vue'

export type CalendarEventType =
  | 'leave'
  | 'company'
  | 'department'
  | 'holiday'
  | 'schedule'
  | 'meeting'

export interface CalendarEvent {
  title: string
  type: CalendarEventType
  time?: string
  category?: string
  location?: string
  organiser?: string
  description?: string
}

export interface DayData {
  dateStr: string
  weekday: string
  day: number
  month: string
  year: number
  isToday: boolean
  events: CalendarEvent[]
}

export interface CalendarCell {
  label: number
  dateStr: string
  otherMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}

const customEvents = ref<Record<string, CalendarEvent[]>>({
  '2026-09-01': [{ title: 'Staff Meeting', type: 'company', time: '9:00 AM - 10:00 AM', category: 'Company Event', location: 'Meeting Room 1', organiser: 'Management', description: 'Monthly staff meeting' }],
  '2026-09-02': [{ title: 'Team Sync', type: 'schedule', time: '2:00 PM - 3:00 PM', category: 'Schedule', location: 'Meeting Room 2', organiser: 'Team Lead', description: 'Weekly team sync' }],
  '2026-09-03': [{ title: 'Public Holiday', type: 'holiday', time: 'All Day', category: 'Public Holiday', location: '-', organiser: 'Government', description: 'National holiday' }],
  '2026-09-04': [{ title: 'Annual Leave', type: 'leave', time: 'All Day', category: 'My Leave', location: '-', organiser: 'Self', description: 'Annual leave' }],
  '2026-09-05': [{ title: 'IT Training', type: 'department', time: '10:00 AM - 12:00 PM', category: 'Department Event', location: 'Training Room', organiser: 'IT Dept', description: 'New software training' }],
  '2026-09-07': [{ title: 'Project Review', type: 'schedule', time: '3:00 PM - 4:30 PM', category: 'Schedule', location: 'Meeting Room 3', organiser: 'Project Manager', description: 'Project review meeting' }],
  '2026-09-08': [{ title: 'Company Event', type: 'company', time: '7:00 PM - 10:00 PM', category: 'Company Event', location: 'Grand Ballroom', organiser: 'Events Team', description: 'Annual dinner' }],
  '2026-09-10': [{ title: 'Department Meeting', type: 'department', time: '9:00 AM - 10:30 AM', category: 'Department Event', location: 'Meeting Room 1', organiser: 'Dept Head', description: 'Monthly department meeting' }],
  '2026-09-12': [{ title: 'Weekend Workshop', type: 'schedule', time: '9:00 AM - 5:00 PM', category: 'Schedule', location: 'Training Center', organiser: 'HR Dept', description: 'Skills development workshop' }],
  '2026-09-15': [{ title: 'Leave Application', type: 'leave', time: 'All Day', category: 'My Leave', location: '-', organiser: 'Self', description: 'Leave application' }],
  '2026-09-16': [{ title: 'Public Holiday - Malaysia Day', type: 'holiday', time: 'All Day', category: 'Public Holiday', location: '-', organiser: 'Government', description: 'Malaysia Day celebration' }],
  '2026-09-18': [{ title: 'Team Building', type: 'department', time: '8:00 AM - 6:00 PM', category: 'Department Event', location: 'Offsite', organiser: 'HR Dept', description: 'Annual team building' }],
  '2026-09-19': [{ title: 'Admin Duty', type: 'schedule', time: 'All Day', category: 'Schedule', location: 'Headquarters', organiser: 'Admin Dept', description: 'Admin duty rotation' }],
  '2026-09-22': [
    { title: 'Annual Leave', type: 'leave', time: 'All Day', category: 'My Leave', location: '-', organiser: 'Self', description: 'Annual leave' },
    { title: 'Company Dinner', type: 'company', time: '6:00 PM - 10:00 PM', category: 'Company Event', location: 'Grand Ballroom', organiser: 'Events Team', description: 'Annual dinner' }
  ],
  '2026-09-25': [{ title: 'IT Training Session', type: 'department', time: '9:00 AM - 12:00 PM', category: 'Department Event', location: 'Training Center', organiser: 'IT Dept', description: 'Advanced training' }],
  '2026-09-28': [{ title: 'Meeting with Client', type: 'schedule', time: '2:00 PM - 4:00 PM', category: 'Schedule', location: 'Meeting Room 2', organiser: 'Sales Manager', description: 'Client meeting' }],
  '2026-09-30': [{ title: 'Monthly Review', type: 'company', time: '10:00 AM - 12:00 PM', category: 'Company Event', location: 'Meeting Room 1', organiser: 'Management', description: 'Monthly review meeting' }],
  '2026-10-01': [{ title: 'Public Holiday', type: 'holiday', time: 'All Day', category: 'Public Holiday', location: '-', organiser: 'Government', description: 'National holiday' }],
  '2026-10-05': [{ title: 'Team Meeting', type: 'schedule', time: '9:00 AM - 10:00 AM', category: 'Schedule', location: 'Meeting Room 3', organiser: 'Team Lead', description: 'Weekly team meeting' }],
  '2026-10-10': [{ title: 'Training Session', type: 'department', time: '10:00 AM - 1:00 PM', category: 'Department Event', location: 'Training Room', organiser: 'Training Dept', description: 'New employee training' }],
  '2026-10-15': [{ title: 'Annual Leave', type: 'leave', time: 'All Day', category: 'My Leave', location: '-', organiser: 'Self', description: 'Annual leave' }]
})

export const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const MONTH_NAMES_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const DAY_NAMES_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const viewOptions = [
  { label: 'Month', value: 'month' as const },
  { label: 'Week', value: 'week' as const },
  { label: 'Day', value: 'day' as const }
]

const categoryOptions = [
  { title: 'All Categories', value: 'all' },
  { title: 'My Leave', value: 'My Leave' },
  { title: 'Company Event', value: 'Company Event' },
  { title: 'Department Event', value: 'Department Event' },
  { title: 'Public Holiday', value: 'Public Holiday' },
  { title: 'Schedule', value: 'Schedule' }
]

const legendItems = [
  { label: 'My Leave', color: 'bg-pink-500' },
  { label: 'Company Event', color: 'bg-red-500' },
  { label: 'Department Event', color: 'bg-purple-500' },
  { label: 'Public Holiday', color: 'bg-blue-500' },
  { label: 'Schedule', color: 'bg-amber-500' }
]

const formatDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const getTodayKey = () => formatDateKey(new Date())

const getEventsForDate = (dateStr: string): CalendarEvent[] =>
  customEvents.value[dateStr] || []

const getFilteredEvents = (
  events: CalendarEvent[],
  category: string,
  search: string
): CalendarEvent[] => {
  const s = search.toLowerCase()
  return events.filter(event => {
    const matchesCategory = category === 'all' ||
      (event.category && event.category === category)
    const matchesSearch = !search ||
      event.title.toLowerCase().includes(s) ||
      (event.category && event.category.toLowerCase().includes(s))
    return matchesCategory && matchesSearch
  })
}

const buildCalendarRows = (
  year: number,
  month: number
): CalendarCell[][] => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayStr = getTodayKey()

  const cells: CalendarCell[] = []

  const daysInPrevMonth = new Date(year, month, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const dateObj = new Date(year, month - 1, day)
    cells.push({
      label: day,
      dateStr: formatDateKey(dateObj),
      otherMonth: true,
      isToday: false,
      events: []
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    cells.push({
      label: day,
      dateStr,
      otherMonth: false,
      isToday: dateStr === todayStr,
      events: getEventsForDate(dateStr)
    })
  }

  const remaining = (7 - (cells.length % 7)) % 7
  for (let day = 1; day <= remaining; day++) {
    const dateObj = new Date(year, month + 1, day)
    cells.push({
      label: day,
      dateStr: formatDateKey(dateObj),
      otherMonth: true,
      isToday: false,
      events: []
    })
  }

  const rows: CalendarCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }
  return rows
}

const buildWeekDays = (focusDate: Date): DayData[] => {
  const todayStr = getTodayKey()
  const currentDate = new Date(focusDate)
  const startDate = new Date(currentDate)
  startDate.setDate(currentDate.getDate() - currentDate.getDay())

  const days: DayData[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const dateStr = formatDateKey(date)
    days.push({
      dateStr,
      weekday: DAY_NAMES_SHORT[date.getDay()],
      day: date.getDate(),
      month: MONTH_NAMES_LONG[date.getMonth()],
      year: date.getFullYear(),
      isToday: dateStr === todayStr,
      events: getEventsForDate(dateStr)
    })
  }
  return days
}

const buildDayData = (focusDate: Date): DayData => {
  const date = new Date(focusDate)
  const dateStr = formatDateKey(date)
  const todayStr = getTodayKey()
  return {
    dateStr,
    weekday: DAY_NAMES[date.getDay()],
    day: date.getDate(),
    month: MONTH_NAMES_LONG[date.getMonth()],
    year: date.getFullYear(),
    isToday: dateStr === todayStr,
    events: getEventsForDate(dateStr)
  }
}

const getUpcomingEvents = (limit = 10) => {
  const todayStr = getTodayKey()
  const results: (CalendarEvent & { dateStr: string; day: number; monthLabel: string; year: number })[] = []

  const allDates = Object.keys(customEvents.value).sort()

  for (const dateStr of allDates) {
    if (dateStr < todayStr) continue
    const events = customEvents.value[dateStr] || []
    const date = new Date(dateStr)
    for (const event of events) {
      if (results.length >= limit) break
      results.push({
        ...event,
        dateStr,
        day: date.getDate(),
        monthLabel: MONTH_NAMES_SHORT[date.getMonth()].toUpperCase(),
        year: date.getFullYear()
      })
    }
    if (results.length >= limit) break
  }

  return results
}

const getCalendarDotColor = (type: string) => {
  const colors: Record<string, string> = {
    leave: 'bg-pink-500',
    company: 'bg-red-500',
    department: 'bg-purple-500',
    holiday: 'bg-blue-500',
    schedule: 'bg-amber-500',
    meeting: 'bg-purple-500'
  }
  return colors[type] || 'bg-blue-500'
}

const getEventIcon = (type: string) => {
  const icons: Record<string, string> = {
    leave: 'mdi-account-clock',
    company: 'mdi-account-group',
    department: 'mdi-office-building',
    holiday: 'mdi-flag',
    schedule: 'mdi-calendar-check',
    meeting: 'mdi-handshake'
  }
  return icons[type] || 'mdi-calendar-star'
}

const getEventIconColor = (type: string) => {
  const colors: Record<string, string> = {
    leave: '#ec4899',
    company: '#ef4444',
    department: '#8b5cf6',
    holiday: '#3b82f6',
    schedule: '#f59e0b',
    meeting: '#8b5cf6'
  }
  return colors[type] || '#3b82f6'
}

const getEventIconClass = (type: string) => {
  const classes: Record<string, string> = {
    leave: 'bg-pink-50',
    company: 'bg-red-50',
    department: 'bg-purple-50',
    holiday: 'bg-blue-50',
    schedule: 'bg-amber-50',
    meeting: 'bg-purple-50'
  }
  return classes[type] || 'bg-blue-50'
}

const formatEventDate = (dateStr: string) => {
  if (!dateStr) return 'Date not available'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const addEvent = (dateStr: string, event: CalendarEvent) => {
  if (!customEvents.value[dateStr]) {
    customEvents.value[dateStr] = []
  }
  customEvents.value[dateStr].push(event)
}

const removeEvent = (dateStr: string, title: string) => {
  const list = customEvents.value[dateStr]
  if (!list) return
  customEvents.value[dateStr] = list.filter(e => e.title !== title)
  if (customEvents.value[dateStr].length === 0) {
    delete customEvents.value[dateStr]
  }
}

const resetEvents = (events: Record<string, CalendarEvent[]>) => {
  customEvents.value = { ...events }
}

export const useCalendar = () => ({
  customEvents,
  viewOptions,
  categoryOptions,
  legendItems,
  monthNamesShort: MONTH_NAMES_SHORT,
  monthNamesLong: MONTH_NAMES_LONG,
  dayNames: DAY_NAMES,
  dayNamesShort: DAY_NAMES_SHORT,
  formatDateKey,
  getTodayKey,
  getEventsForDate,
  getFilteredEvents,
  buildCalendarRows,
  buildWeekDays,
  buildDayData,
  getUpcomingEvents,
  getCalendarDotColor,
  getEventIcon,
  getEventIconColor,
  getEventIconClass,
  formatEventDate,
  addEvent,
  removeEvent,
  resetEvents
})
