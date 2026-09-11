// src/composables/useImportantNotices.ts
import { ref, computed } from 'vue'

export interface ImportantNotice {
  id: string
  title: string
  date: string
  fullDate?: string
  type?: string
  body: string[]
  warning?: string
  signoff?: string
  bm?: { title: string; body: string[] }
}

const notices = ref<ImportantNotice[]>([
  {
    id: 'important-1',
    title: 'Ad Hoc Preventive System Downtime',
    date: '15-16 Aug 2026',
    fullDate: 'Saturday, 15 August 2026',
    type: 'important',
    body: [
      'Please be informed that an ad hoc preventive system downtime will be carried out on <strong>Saturday, 15 August 2026, starting at 10:00PM</strong>. This activity is a precautionary measure following the server issue experienced earlier this week.',
      'The following systems will be temporarily unavailable:',
      '<ul class="list-disc pl-6 mt-2 space-y-1"><li><strong>E-Service</strong></li><li><strong>Kotra File Server</strong></li><li><strong>SAP</strong></li><li><strong>SIS</strong></li></ul>',
      'Services are expected to be restored by <strong>Sunday 10:00PM, 16 August 2026</strong>. An update will be provided once all systems are confirmed operational. We apologize for the short notice and any inconvenience caused.',
      'Thank you for your understanding.',
    ],
    warning: 'Employees are advised not to perform critical transactions during the maintenance window. If you experience access issues after the maintenance period, please contact the relevant support team.',
    signoff: '<em>Best regards,</em><br><strong>Idzni</strong><br>Associate Infrastructure Engineer (IT)<br>KOTRA PHARMA (M) Sdn Bhd',
    bm: {
      title: 'Notis Gangguan Sistem Pencegahan Ad Hoc',
      body: [
        'Dimaklumkan bahawa kerja gangguan sistem pencegahan ad hoc akan dijalankan pada <strong>Sabtu, 15 Ogos 2026, bermula jam 10:00 malam</strong>.',
        'Sepanjang tempoh ini, beberapa perkhidmatan portal mungkin tidak dapat diakses buat sementara waktu. Sila simpan kerja anda sebelum aktiviti penyelenggaraan bermula.',
        'Sekiranya terdapat masalah akses selepas penyelenggaraan selesai, sila hubungi pasukan sokongan yang berkaitan.',
      ],
    },
  },
])

const showBanner = ref(true)

const latest     = computed(() => notices.value[0] ?? null)
const hasNotices = computed(() => notices.value.length > 0)

const getById = (id: string) => notices.value.find(n => n.id === id)

const dismissBanner = () => { showBanner.value = false }
const showBannerNow = () => { showBanner.value = true }

export const useImportantNotices = () => ({
  notices,
  latest,
  hasNotices,
  showBanner,
  getById,
  dismissBanner,
  showBannerNow,
})
