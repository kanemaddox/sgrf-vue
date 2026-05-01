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

export default axiosService