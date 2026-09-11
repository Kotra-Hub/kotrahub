// src/composables/usePhoneDirectory.ts
import { ref, computed } from 'vue'

export interface Contact {
  name: string
  jobTitle: string
  ext: string
  email: string
  department: string
  team: string
  phone?: string
}

const contacts = ref<Contact[]>([
  { name: 'Amirul Hakim', jobTitle: 'Product Manager', ext: '1702', email: 'amirul.hakim@kotra.com', department: 'PD', team: 'Product', phone: '+60123456701' },
  { name: 'Siti Nur Aina', jobTitle: 'Regulatory Executive', ext: '2345', email: 'siti.aina@kotra.com', department: 'RPD', team: 'Regulatory', phone: '+60123456702' },
  { name: 'Muhammad Khairul', jobTitle: 'Medical Representative', ext: '2901', email: 'khairul.m@kotra.com', department: 'SMO', team: 'Medical', phone: '+60123456703' },
  { name: 'Yvonne Wong', jobTitle: 'HR Executive', ext: '4567', email: 'yvonne.wong@kotra.com', department: 'AHR', team: 'HR', phone: '+60123456704' },
  { name: 'Faris Azman', jobTitle: 'Finance Analyst', ext: '5678', email: 'faris.azman@kotra.com', department: 'AACT', team: 'Finance', phone: '+60123456705' },
  { name: 'Nurul Liyana', jobTitle: 'QC Chemist', ext: '6789', email: 'nurul.liyana@kotra.com', department: 'QC', team: 'QC', phone: '+60123456706' },
  { name: 'Ahmad Faiz', jobTitle: 'Senior Developer', ext: '7890', email: 'ahmad.faiz@kotra.com', department: 'IT', team: 'Development', phone: '+60123456707' },
  { name: 'Nadia Binti Razak', jobTitle: 'QA Engineer', ext: '8901', email: 'nadia.razak@kotra.com', department: 'IT', team: 'QA', phone: '+60123456708' },
  { name: 'Tan Wei Ming', jobTitle: 'UX Designer', ext: '9012', email: 'tan.weiming@kotra.com', department: 'IT', team: 'Design', phone: '+60123456709' },
  { name: 'Siti Zaharah', jobTitle: 'Operations Manager', ext: '0123', email: 'siti.zaharah@kotra.com', department: 'OM', team: 'Operations', phone: '+60123456710' },
  { name: 'Lim Chee Wei', jobTitle: 'Supply Chain Executive', ext: '1234', email: 'lim.cheewei@kotra.com', department: 'SCM', team: 'Supply Chain', phone: '+60123456711' },
  { name: 'Nur Aisyah', jobTitle: 'Marketing Executive', ext: '2345', email: 'nur.aisyah@kotra.com', department: 'MKT', team: 'Marketing', phone: '+60123456712' }
])

const departmentOptions = computed(() => {
  const depts = ['All', ...new Set(contacts.value.map(c => c.department))]
  return depts.map(d => ({ title: d, value: d }))
})

const teamOptionsFor = (department: string) => {
  const source = department === 'All'
    ? contacts.value
    : contacts.value.filter(c => c.department === department)

  const teams = ['All', ...new Set(source.map(c => c.team))]
  return teams.map(t => ({ title: t, value: t }))
}

const filterContacts = (
  search: string,
  department: string,
  team: string
): Contact[] => {
  const s = search.trim().toLowerCase()

  return contacts.value.filter(contact => {
    const matchesSearch = !s ||
      contact.name.toLowerCase().includes(s) ||
      contact.jobTitle.toLowerCase().includes(s) ||
      contact.department.toLowerCase().includes(s) ||
      contact.team.toLowerCase().includes(s) ||
      contact.email.toLowerCase().includes(s)

    const matchesDepartment = department === 'All' || contact.department === department
    const matchesTeam = team === 'All' || contact.team === team

    return matchesSearch && matchesDepartment && matchesTeam
  })
}

const getInitials = (name: string) => {
  if (!name) return ''
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const getById = (email: string) => contacts.value.find(c => c.email === email)

const makeCall = (phone: string) => {
  if (typeof window === 'undefined') return
  window.location.href = `tel:${phone}`
}

const sendEmail = (email: string) => {
  if (typeof window === 'undefined') return
  window.location.href = `mailto:${email}`
}

export const usePhoneDirectory = () => ({
  contacts,
  departmentOptions,
  teamOptionsFor,
  filterContacts,
  getInitials,
  getById,
  makeCall,
  sendEmail
})
