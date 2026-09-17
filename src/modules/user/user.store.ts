import { defineStore } from 'pinia'
import type { CrtUser } from '@/modules/employee/employee.interface'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as CrtUser | null
  }),
  getters: {
    me: (state) => state.user
  }
})
