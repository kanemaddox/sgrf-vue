import { defineStore } from 'pinia'
import * as authService from '@/services/authService'

//import router from '@/router'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    timer: null,
    token: localStorage.getItem('token') || null,
    expiresAt: Number(localStorage.getItem('expiresAt')) || null,
    nombre: localStorage.getItem('nombre') || null,
    imagen: localStorage.getItem('imagen') || null,
    pass: localStorage.getItem('pass') || null,
    idUsuario: localStorage.getItem('idUsuario') || null,
    persona: JSON.parse(localStorage.getItem('persona')) || null,
    pernicions: JSON.parse(localStorage.getItem('pernicions')) || null,
    rol: localStorage.getItem('rol') || null,
    idpName: localStorage.getItem('idpName') || null,
    loading: false,
    tiempoRestante: 0,
    countdownTimer: null,
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
          this.expiresAt = data.expiresAt
          this.nombre = data.nombre
          this.imagen = data.imagen
          this.idUsuario = data.idUsuario
          this.pass = data.pass
          this.persona = data.persona
          this.pernicions = data.pernicions
          this.rol = data.rol
          this.idpName = data.idpName

          localStorage.setItem('token', data.token)
          localStorage.setItem('expiresAt', data.expiresAt)
          localStorage.setItem('imagen', data.imagen)
          localStorage.setItem('pass', data.pass)
          localStorage.setItem('nombre', data.nombre)
          localStorage.setItem('idUsuario', data.idUsuario)
          localStorage.setItem('persona', JSON.stringify(data.persona))
          localStorage.setItem('pernicions', JSON.stringify(data.pernicions))
          localStorage.setItem('rol', data.rol)
          localStorage.setItem('idpName', data.idpName)

          this.startExpirationTimer()
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

    logout() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }

      this.user = null
      this.token = null
      this.expiresAt = null
      this.nombre = null
      this.imagen = null
      this.idUsuario = null
      //this.usuario = null
      this.persona = null
      this.pernicions = null
      this.rol = null
      this.idpName = null

      localStorage.removeItem('token')
      localStorage.removeItem('expiresAt')
      localStorage.removeItem('persona')
      localStorage.removeItem('imagen')
      localStorage.removeItem('pass')
      localStorage.removeItem('nombre')
      localStorage.removeItem('idUsuario')
      localStorage.removeItem('pernicions')
      localStorage.removeItem('rol')
      localStorage.removeItem('idpName')

      //router.replace({ name: 'Login' })
      window.location.href = '/'
    },

    /*async refresh() {
      try {
        const { data } = await authService.refreshToken(this.token)
        this.token = data.token
        localStorage.setItem('token', data.token)
      } catch (e) {
        this.logout()
      }
    },*/

    startExpirationTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      if (!this.expiresAt) {
        return
      }

      const tiempo = this.expiresAt - Date.now()

      if (tiempo <= 0) {
        this.logout()
        return
      }

      this.timer = setTimeout(() => {
        this.logout()
      }, tiempo)

      this.startCountdown()
    },

    initSession() {
      if (!this.token || !this.expiresAt) {
        return
      }
      this.startExpirationTimer()
    },

    startCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
      }
      if (!this.expiresAt) {
        this.tiempoRestante = 0
        return
      }
      const actualizar = () => {
        const restante = this.expiresAt - Date.now()
        if (restante <= 0) {
          this.tiempoRestante = 0
          clearInterval(this.countdownTimer)
          this.countdownTimer = null
          return
        }
        this.tiempoRestante = restante
      }
      actualizar()
      this.countdownTimer = setInterval(actualizar, 1000)
    },
  }
})