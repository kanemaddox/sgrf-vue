import { defineStore } from 'pinia'
import * as authService from '@/services/authService'

import router from '@/router'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    nombre: localStorage.getItem('nombre') || null,
    imagen: localStorage.getItem('imagen') || null,
    pass: localStorage.getItem('pass') || null,
    idUsuario: localStorage.getItem('idUsuario') || null,
    persona: JSON.parse(localStorage.getItem('persona')) || null,
    pernicions: JSON.parse(localStorage.getItem('pernicions')) || null,
    rol: localStorage.getItem('rol') || null,
    srfCantidad: localStorage.getItem('srfCantidad') || null,
    rdgCantidad: localStorage.getItem('rdgCantidad') || null,
    idpName: localStorage.getItem('idpName') || null,
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
          this.token = data.token
          this.nombre = data.nombre
          this.imagen = data.imagen
          this.idUsuario = data.idUsuario
          this.pass = data.pass
          this.persona = data.persona
          this.pernicions = data.pernicions
          this.rol = data.rol
          this.idpName = data.idpName
          this.srfCantidad = data.srf
          this.rdgCantidad = data.rdg 

          localStorage.setItem('token', data.token)
          localStorage.setItem('imagen', data.imagen)
          localStorage.setItem('pass', data.pass)
          localStorage.setItem('nombre', data.nombre)
          localStorage.setItem('idUsuario', data.idUsuario)
          localStorage.setItem('persona', JSON.stringify(data.persona))
          localStorage.setItem('pernicions', JSON.stringify(data.pernicions))
          localStorage.setItem('rol', data.rol)
          localStorage.setItem('idpName', data.idpName)
          localStorage.setItem('srfCantidad',data.srf)
          localStorage.setItem('rdgCantidad',data.rdg)
          //await this.fetchUser()
          this.user = {
            user: data.user,
            nombre: data.nombre,
            email: data.email,
            imagen: data.imagen,
          }
          return data
        }
        else
          return data
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
      this.pernicions = null
      this.rol = null
      this.idpName = null
      this.srfCantidad = null
      this.rdgCantidad = null

      localStorage.removeItem('token')
      localStorage.removeItem('persona')
      localStorage.removeItem('imagen')
      localStorage.removeItem('pass')
      localStorage.removeItem('nombre')
      localStorage.removeItem('idUsuario')
      localStorage.removeItem('pernicions')
      localStorage.removeItem('rol')
      localStorage.removeItem('idpName')
      localStorage.removeItem('srfCantidad')
      localStorage.removeItem('rdgCantidad')
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