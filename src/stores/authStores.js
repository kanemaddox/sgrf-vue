import { defineStore } from 'pinia'
import * as authService from '@/services/authService'

import router from '@/router'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    nombre: localStorage.getItem('nombre') || null,
    imagen: localStorage.getItem('imagen') || null,
    //usuario: localStorage.getItem('usuario') || null,
    idUsuario: localStorage.getItem('idUsuario') || null,
    persona: JSON.parse(localStorage.getItem('persona')) || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const { data } = await authService.login(credentials)
        if (data.user != "0") {
          console.log(data)
          this.token = data.token
          this.nombre = data.nombre
          this.imagen = data.imagen
          this.idUsuario = data.idUsuario
          //this.usuario = data.usuario
          this.persona = data.persona

          localStorage.setItem('token', data.token)
          localStorage.setItem('imagen', data.imagen)
          //localStorage.setItem('user', data.user)
          localStorage.setItem('nombre', data.nombre)
          localStorage.setItem('idUsuario', data.idUsuario)
          localStorage.setItem('persona',JSON.stringify(data.persona))
          //await this.fetchUser()
          this.user = {
            user: data.user,
            nombre: data.nombre,
            email: data.email,
            imagen: data.imagen,
          }
          return true
        }
        else
          return false
      } catch (e) {
        return false
      } finally {
        this.loading = false
      }
    },

    /*async fetchUser() {
      try {
        const { data } = await authService.getMe()
        this.user = data
      } catch (e) {
        this.logout()
      }
    },*/

    async logout() {
      this.user = null
      this.token = null
      this.nombre = null
      this.imagen = null
      this.idUsuario = null
      //this.usuario = null
      this.persona = null
      localStorage.removeItem('token')
      localStorage.removeItem('persona')
      router.replace({ name: 'Login' })
    },

    async refresh() {
      try {
        const { data } = await authService.refreshToken(this.token)
        this.token = data.token
        localStorage.setItem('token', data.token)
      } catch (e) {
        this.logout()
      }
    },
  },
})