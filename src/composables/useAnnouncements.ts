// src/composables/useAnnouncements.ts
import { ref } from 'vue'

export interface AnnouncementDetail {
  label: string
  value: string
  subValue?: string
}

export interface Announcement {
  id: number
  title: string
  date: string
  time?: string
  isNew: boolean
  isFeatured?: boolean
  excerpt?: string
  category?: string
  warning?: string
  details?: AnnouncementDetail[]
  bm?: {
    title?: string
    body: string[]
  }
}

const announcements = ref<Announcement[]>([
  {
    id: 1,
    title: 'Public Holiday – Melaka Governor\'s Birthday',
    date: '24 Aug 2026',
    time: '09:30 AM',
    isNew: true,
    isFeatured: true,
    category: 'Holiday',
    excerpt: 'Please be informed that this year\'s Melaka Governor\'s Birthday falls on Monday, 24 August 2026. All offices will be closed in observance of the public holiday.',
    warning: 'Please plan your work accordingly and ensure all urgent matters are attended to before the holiday.',
    details: [
      { label: 'Holiday Date', value: 'Monday, 24 August 2026' },
      { label: 'Offices Affected', value: 'All Offices (HQ & Regional)' }
    ],
    bm: {
      title: 'Cuti Umum – Hari Keputeraan Yang di-Pertua Negeri Melaka',
      body: [
        'Dimaklumkan bahawa Hari Keputeraan Yang di-Pertua Negeri Melaka pada tahun ini jatuh pada hari Isnin, 24 Ogos 2026. Semua pejabat akan ditutup sempena cuti umum tersebut.',
        'Sila merancang kerja anda dengan sewajarnya dan pastikan semua urusan penting diselesaikan sebelum cuti.'
      ]
    }
  },
  {
    id: 2,
    title: 'Replacement Holiday – HQ only',
    date: '24 Aug 2026',
    time: '09:30 AM',
    isNew: true,
    isFeatured: false,
    category: 'Holiday',
    excerpt: 'Further to memo dated 16 March 2026 regarding the additional public holiday, HQ will observe a replacement holiday on 31 August 2026.',
    warning: 'This replacement holiday is applicable to HQ employees only. Regional offices will operate as usual.',
    details: [
      { label: 'Start Date', value: '31 August 2026 (Monday)' },
      { label: 'End Date', value: '1 September 2026 (Tuesday)' },
      { label: 'Affected Office', value: 'HQ Only' }
    ],
    bm: {
      title: 'Cuti Gantian – HQ sahaja',
      body: [
        'Sehubungan dengan memo bertarikh 16 Mac 2026 mengenai cuti umum tambahan, HQ akan mengambil cuti gantian pada 31 Ogos 2026.',
        'Cuti gantian ini hanya terpakai untuk pekerja HQ sahaja. Pejabat serantau akan beroperasi seperti biasa.'
      ]
    }
  },
  {
    id: 3,
    title: 'Staff Purchase – Special Offer',
    date: '12 May 2026',
    time: '09:00 AM',
    isNew: false,
    isFeatured: true,
    category: 'Staff Purchase',
    excerpt: 'Exclusive staff purchase event with special discounts on selected products. Don\'t miss out on this limited-time offer!',
    warning: 'The special offer is valid while stocks last. Terms and conditions apply.',
    details: [
      { label: 'Start Date & Time', value: '15 May 2026 (Friday)', subValue: '09:00 AM' },
      { label: 'End Date & Time', value: '22 May 2026 (Friday)', subValue: '05:00 PM' },
      { label: 'Location', value: 'Staff Store, Ground Floor' }
    ]
  },
  {
    id: 4,
    title: 'New Policy Update – Remote Work Guidelines',
    date: '10 May 2026',
    time: '02:00 PM',
    isNew: false,
    isFeatured: false,
    category: 'Policy Update',
    excerpt: 'Updated remote work guidelines effective 1 June 2026. Please review the new policy document for details.',
    details: [
      { label: 'Effective Date', value: '1 June 2026' },
      { label: 'Document Link', value: 'Click here to view policy' }
    ]
  },
  {
    id: 5,
    title: 'Annual Dinner & Awards Night 2026',
    date: '5 May 2026',
    time: '10:00 AM',
    isNew: false,
    isFeatured: false,
    category: 'Event',
    excerpt: 'Join us for the Annual Dinner & Awards Night 2026. Book your seats now!',
    warning: 'Limited seats available. Please register before the deadline.',
    details: [
      { label: 'Date', value: '15 December 2026 (Saturday)' },
      { label: 'Time', value: '7:00 PM – 11:00 PM' },
      { label: 'Venue', value: 'Grand Ballroom, Hotel Melaka' }
    ]
  },
  {
    id: 6,
    title: 'System Maintenance – 29 August 2026',
    date: '25 Aug 2026',
    time: '08:00 AM',
    isNew: true,
    isFeatured: false,
    category: 'General',
    excerpt: 'Scheduled system maintenance on 29 August 2026 from 10:00 PM to 2:00 AM. The system will be unavailable during this period.',
    warning: 'Employees are advised not to perform critical transactions during the maintenance window. If you experience access issues after the maintenance period, please contact the relevant support team.',
    details: [
      { label: 'Date', value: '29 August 2026 (Saturday)' },
      { label: 'Time', value: '10:00 PM – 2:00 AM' },
      { label: 'Expected Downtime', value: '4 hours' }
    ],
    bm: {
      title: 'Penyelenggaraan Sistem – 29 Ogos 2026',
      body: [
        'Penyelenggaraan sistem berjadual pada 29 Ogos 2026 dari jam 10:00 malam hingga 2:00 pagi. Sistem akan tidak tersedia sepanjang tempoh ini.',
        'Pekerja dinasihatkan supaya tidak menjalankan transaksi kritikal semasa tempoh penyelenggaraan.'
      ]
    }
  },
  {
    id: 7,
    title: 'HR Requisition Form Update',
    date: '20 Jul 2026',
    time: '11:30 AM',
    isNew: false,
    isFeatured: false,
    category: 'Policy Update',
    excerpt: 'The HR Requisition form has been updated with new fields. Please use the latest version for all submissions.',
    details: [
      { label: 'Form Version', value: 'v3.2 (July 2026)' },
      { label: 'Effective Date', value: '1 August 2026' }
    ]
  },
  {
    id: 8,
    title: 'Training Program – Leadership Development',
    date: '15 Jul 2026',
    time: '09:00 AM',
    isNew: false,
    isFeatured: false,
    category: 'Event',
    excerpt: 'Leadership Development Training Program for Managers. Limited seats available.',
    warning: 'Registration is on a first-come, first-served basis. Only 20 seats available.',
    details: [
      { label: 'Date', value: '10-12 September 2026' },
      { label: 'Venue', value: 'Training Center, Level 5' },
      { label: 'Registration Deadline', value: '31 August 2026' }
    ]
  },
  {
    id: 9,
    title: 'Office Closure – National Day',
    date: '10 Jul 2026',
    time: '10:00 AM',
    isNew: false,
    isFeatured: false,
    category: 'Holiday',
    excerpt: 'All offices will be closed on 31 August 2026 in celebration of National Day.',
    details: [
      { label: 'Date', value: '31 August 2026 (Monday)' },
      { label: 'Offices Affected', value: 'All Offices' }
    ]
  },
  {
    id: 10,
    title: 'New Staff Onboarding – Welcome!',
    date: '1 Jul 2026',
    time: '08:30 AM',
    isNew: false,
    isFeatured: false,
    category: 'General',
    excerpt: 'Welcome to all new staff joining us in July 2026. Please complete your onboarding tasks.',
    details: [
      { label: 'Onboarding Date', value: '1 July 2026' },
      { label: 'Orientation', value: '9:00 AM – 12:00 PM, HR Training Room' }
    ]
  }
])

const loading = ref(false)

const filterOptions = [
  'All',
  'Featured',
  'New',
  'Holiday',
  'Event',
  'Policy Update',
  'Staff Purchase',
  'General'
]

const sortOptions = [
  'Newest First',
  'Oldest First',
  'Title A-Z',
  'Title Z-A'
]

const filterAnnouncements = (
  items: Announcement[],
  query: string,
  filter: string,
  sort: string
): Announcement[] => {
  let result = [...items]

  if (query.trim()) {
    const q = query.trim().toLowerCase()
    result = result.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
      (a.category && a.category.toLowerCase().includes(q)) ||
      (a.details && a.details.some(d =>
        d.label.toLowerCase().includes(q) ||
        d.value.toLowerCase().includes(q)
      ))
    )
  }

  if (filter !== 'All') {
    switch (filter) {
      case 'Featured':
        result = result.filter(a => a.isFeatured)
        break
      case 'New':
        result = result.filter(a => a.isNew)
        break
      default:
        result = result.filter(a => a.category === filter)
        break
    }
  }

  switch (sort) {
    case 'Newest First':
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break
    case 'Oldest First':
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break
    case 'Title A-Z':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'Title Z-A':
      result.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return result
}

const getById = (id: number) => announcements.value.find(a => a.id === id)

const addAnnouncement = (a: Omit<Announcement, 'id'>) => {
  const nextId = Math.max(0, ...announcements.value.map(x => x.id)) + 1
  announcements.value.unshift({ ...a, id: nextId })
}

const updateAnnouncement = (id: number, patch: Partial<Announcement>) => {
  const idx = announcements.value.findIndex(a => a.id === id)
  if (idx !== -1) {
    announcements.value[idx] = { ...announcements.value[idx], ...patch }
  }
}

const removeAnnouncement = (id: number) => {
  announcements.value = announcements.value.filter(a => a.id !== id)
}

const resetAnnouncements = (items: Announcement[]) => {
  announcements.value = [...items]
}

export const useAnnouncements = () => ({
  announcements,
  loading,
  filterOptions,
  sortOptions,
  filterAnnouncements,
  getById,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
  resetAnnouncements,
})
