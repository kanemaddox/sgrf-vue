/**
 * router/index.js - Vue Router Configuration
 *
 * This file configures the application routing using Vue Router 5.
 * It defines all routes and navigation structure for the SPA.
 *
 * Routing Features:
 * - Hash-based routing (createWebHashHistory) for static hosting compatibility
 * - Lazy loading for all route components (code splitting)
 * - Nested routes for layout-based navigation
 * - Automatic scroll to top on navigation
 *
 * Route Structure:
 * - Protected routes: Wrapped in DefaultLayout with sidebar and header
 * - Public routes: Login, Register, 404, 500 pages without layout
 *
 * Adding New Routes:
 * 1. Import component (use dynamic import for code splitting)
 * 2. Add route object to appropriate section
 * 3. Update _nav.js for sidebar navigation (if needed)
 *
 * @see https://router.vuejs.org/
 */

import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStores'

import DefaultLayout from '@/layouts/DefaultLayout'

/**
 * Application routes configuration
 * @type {Array<Object>}
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {//rutas para Cuenta
        path: '/cuenta',
        name: 'Cuenta',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/cuenta/profile',
        children: [
          {
            path: '/cuenta/profile',
            name: 'Profile',
            component: () => import('@/views/cuenta/ProfileView.vue'),
          },
          {
            path: '/cuenta/cuentabancaria',
            name: 'Cuentas Bancarias',
            component: () => import('@/views/cuenta/CuentasBancariasView.vue'),
          },

        ],
      },
      {// rutas para Usuarios
        path: '/usuarios',
        name: 'Usuarios',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/usuarios/menu',
        children: [
          {
            path: '/usuarios/menu',
            name: 'Usuarios Menu',
            component: () => import('@/views/usuarios/MenuView.vue'),
          },
          {
            path: '/usuarios/lista',
            name: 'Lista de Usuarios',
            component: () => import('@/views/usuarios/ListaView.vue'),
          },
          {
            path: '/usuarios/registrar',
            name: 'Registrar Usuario',
            component: () => import('@/views/usuarios/RegistrarUsuarioView.vue'),
          },
          {
            path: '/usuarios/perfilusuario/:idUsuario',
            name: 'Perfil de Usuario',
            component: () => import('@/views/usuarios/ProfileUsuarioView.vue'),
            props: true
          },
          {
            path: '/usuarios/importar',
            name: 'Importar Usuarios',
            component: () => import('@/views/usuarios/ImportarView.vue'),
          },
        ],

      },
      {
        path: '/administradores',
        name: 'Administradores',
        component: () => import('@/views/admin/AdministradoresView.vue'),
      },
      {// rutas Administracion
        path: '/admin',
        name: 'Dependencias',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/admin/dependencia/menu',
        children: [
          {
            path: '/admin/dependencia/menu',
            name: 'Dependencias Menu',
            component: () => import('@/views/admin/dependencia/MenuView.vue'),
          },
          {
            path: '/admin/dependencia/jefes',
            name: 'Lista de Jefes',
            component: () => import('@/views/admin/dependencia/JefesView.vue'),
          },
          {
            path: '/admin/dependencia/areas',
            name: 'Lista de Areas',
            component: () => import('@/views/admin/dependencia/AreasView.vue'),
          },
          {
            path: '/admin/dependencia/sucursales',
            name: 'Lista de Sucursales',
            component: () => import('@/views/admin/dependencia/SucursalesView.vue'),
          },
        ],

      },
      {// rutas solicitudes de rendicion de fondos
        path: '/srf',
        name: 'SRF',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        redirect: '/srf/menu',
        children: [
          {
            path: 'menu',// hijo 1
            name: 'Menu Srf',
            meta: { title: 'Menu', },
            component: () => import('@/views/srf/MenuView.vue'),// link crear aprobar solicitudes
          },
          {
            path: 'crear', // hijo 2
            name: 'Crear Solicitud de Fondos',
            component: () => import('@/views/srf/CrearSolicitudView.vue'),
          },
          {
            path: 'autorizar/:solicitud', // hijo 3 
            name: 'SolicitudSRF',
            component: { render() { return h(resolveComponent('router-view')) }, },
            props: true,
            meta: { title: (route) => route.params.solicitud.charAt(0).toUpperCase() + route.params.solicitud.slice(1) + 's' },
            redirect: to => { return '/srf/autorizar/'+ to.params.solicitud+'/solicitud'},
            children: [
              {
                path:'solicitud',
                name:'',
                meta: { title: '' },
                component: () => import('@/views/srf/SolicitudesView.vue'),
                props:true,
              },
              {
                path: 'revisar/:idSrf',
                name: 'RevisarSrf',
                meta: { title: 'Revisar Solicitud', },
                component: () => import('@/views/srf/detalle/SolicitudView.vue'),
                props: true
              },
            ],
          },
          {
            path: 'estado/:estado', // hijo 4
            name: 'ListaSRF',
            component: { render() { return h(resolveComponent('router-view')) }, },
            props: true,
            meta: { title: (route) => route.params.estado.charAt(0).toUpperCase() + route.params.estado.slice(1) + 's' },
            redirect: to => { return '/srf/estado/' + to.params.estado + '/listas' },
            children: [
              {
                path: 'listas',
                name: '',
                meta: { title: ' ' },
                component: () => import('@/views/srf/ListaSolicitudesView.vue'),
                props: true,
              },
              {
                path: 'detalle/:idSrf',
                name: 'DetalleSrf',
                component: () => import('@/views/srf/detalle/DetalleView.vue'),
                props: true,
                meta: { title: ' Detalle' }
              },
            ],
          },
        ],
      },
      {// rutas para Configuracion de formularios
        path: '/settings',
        name: 'Settings',
        component: {
          render() { return h(resolveComponent('router-view')) },
        },
        children: [
          {
            path: '/settings/formulariosolicitud',
            name: 'Formulario SRF',
            component: () => import('@/views/settings/FormularioSolicitudView.vue'),
          },
          {
            path: '/settings/formulariorendicion',
            name: 'Formulario RDF',
            component: () => import('@/views/settings/FormularioSolicitudView.vue'),
          },
        ],

      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})
router.beforeEach(async (to) => {
  console.log('➡️ TO:', to.name)
  const auth = useAuthStore()
  const token = auth.token || localStorage.getItem('token')

  /*if (token && !auth.user) {
    auth.fetchUser()
  }*/

  if (to.meta.requiresAuth && !token) {
    return { name: 'Login' }
  }

  if (to.name === 'Login' && token) {
    return { name: 'Dashboard' }
  }

  return true
})

export default router
