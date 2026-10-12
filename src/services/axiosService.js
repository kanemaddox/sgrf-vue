import axios from 'axios'
import { API_URL } from "@/env";

const base = API_URL

const axiosService = axios.create({baseURL: base})

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer '+token
  }

  return config
})

axiosService.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response?.status === 401) {
            const { useAuthStore } = await import('@/stores/authStores')
            const authStore = useAuthStore()
            if (authStore.token) {
                authStore.logout()
            }
        }
        return Promise.reject(error)
    }
)

export default axiosService