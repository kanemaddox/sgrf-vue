import axios from "axios";
import { API_URL } from "@/env";

const usuario_api = API_URL;

export const login = (credentials) => {
  var request ={
    "user":credentials.username,
    "pass":credentials.password
  }
  return axios.post(usuario_api+'login', request)
}

/*export const refreshToken = (refreshToken) => {
  return axios.post(usuario_api+'/auth/refresh', { refreshToken })
}

export const getMe = () => {
  return axios.get(usuario_api+'/auth/me')
}

export const logout = () => {
  return axios.post(usuario_api+'/auth/logout')
}*/