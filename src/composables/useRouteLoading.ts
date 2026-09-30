import { ref } from 'vue'

const loading = ref(false)

export function useRouteLoading() {
  return {
    loading
  }
}
