/**
 * _nav.js - Sidebar Navigation Configuration
 *
 * This file defines the structure and content of the sidebar navigation menu.
 * The navigation is rendered by AppSidebar component using CoreUI nav components.
 *
 * Navigation item types:
 * - CNavItem: Single navigation link
 * - CNavGroup: Expandable group of navigation items
 * - CNavTitle: Section title/divider
 *
 * Each item can have:
 * - component: CoreUI component type ('CNavItem', 'CNavGroup', 'CNavTitle')
 * - name: Display text
 * - to: Vue Router path (for CNavItem)
 * - icon: CoreUI icon name (from @coreui/icons)
 * - badge: Optional badge with color and text
 * - items: Array of child items (for CNavGroup)
 * - href: External link URL
 * - external: Boolean for external links
 *
 * @type {Array<Object>}
 */

export default [
  {
    component: 'CNavTitle',
    name: 'Preferencias',
  },
  {
    component: 'CNavItem',
    name: 'Mi Cuenta',
    icon: 'cil-settings',
    key:'mi_cuenta',
    items: [
      {
        component: 'CNavItem',
        name: 'Perfil Usuario',
        to: '/cuenta/profile',
        key:'perfil',
      },
      {
        component:'CNavItem',
        name:'Cuentas Bancarias',
        to:'/cuenta/cuentabancaria',
        key:'cuenta_bancaria',
      },
    ],
  },
  {
    component: 'CNavTitle',
    name: 'Menu',
  },
  {
    component: 'CNavItem',
    name: 'Usuarios',
    icon: 'cil-user-plus',
    key:'usuarios',
    items: [
      {
        component: 'CNavItem',
        name: 'Lista de Usuarios',
        to: '/usuarios/lista',
        key:'listar_usuarios',
      },
      {
        component: 'CNavItem',
        name: 'Importar Usuarios',
        to: '/usuarios/importar',
        key:'importar_usuarios',
      },
      {
        component: 'CNavItem',
        name: 'Registrar Usuario',
        to: '/usuarios/registrar',
        key:'registrar_usuarios',
      }
    ],
  },
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'Solicitud de Fondos',
    icon: 'cil-description',
    key:'formulario_solicitud',
    items: [
      {
        component: 'CNavItem',
        name: 'Menu',
        to: '/srf/menu',
      },
      {
        component: 'CNavItem',
        name: 'Crear Solicitud',
        to: '/srf/crear',
        key:'crear_solicitud',
      },
      {
        component: 'CNavItem',
        name: 'Solisitudes Pendientes',
        to: '/srf/estado/pendiente',
        key:'listar_solicitud',
      },
      {
        component: 'CNavItem',
        name: 'Revisar Solicitudes',
        to: '/srf/autorizar/pendiente',
        key:'aprobar_solicitud',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Rendicion de Gastos',
    icon: 'cil-folder',
    key:'formulario_repocicion',
    items: [
      {
        component: 'CNavItem',
        name: 'Menu',
        to: '/rdg/menu',
      },
      {
        component: 'CNavItem',
        name: 'Crear Rendicion',
        to: '/rdg/crear/0',
        key:'crear_repocicion',
      },
      {
        component: 'CNavItem',
        name: 'Rendiciones de Gastos',
        to: '/usuarios/lista',
        key:'listar_repocicion',
      },
    ],
  },
  
]
