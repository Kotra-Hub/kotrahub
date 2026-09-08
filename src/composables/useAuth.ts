// src\composables\useAuth.ts
import { ref } from 'vue'

interface AppUser {
  name: string
  email: string
  role: string
}

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
const user = ref<AppUser | null>(
  JSON.parse(localStorage.getItem('user') || 'null')
)

function login(userData: AppUser) {
  localStorage.setItem('isAuthenticated', 'true')
  localStorage.setItem('user', JSON.stringify(userData))
  user.value = userData
  isAuthenticated.value = true
}

function logout() {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('user')
  user.value = null
  isAuthenticated.value = false
}

export function useAuth() {
  return { isAuthenticated, user, login, logout }
}
