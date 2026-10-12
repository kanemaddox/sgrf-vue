<template>
  <CSidebar class="border-end" colorScheme="dark" position="fixed" :unfoldable="sidebar.unfoldable"
    :visible="sidebar.visible" @visible-change="(value) => sidebar.toggleVisible(value)">
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">
          <!--<CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32" />
          <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32" />-->
          SGRF
        </CSidebarBrand>
      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="sidebar.toggleVisible()" />

    </CSidebarHeader>
    <ul class="small text-nowrap">
      <li>Sesión : {{ tiempoSesion }}</li>
    </ul>
    <AppSidebarNav :menu=menu />
    <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="sidebar.toggleUnfoldable()" />
    </CSidebarFooter>
  </CSidebar>
</template>


<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { AppSidebarNav } from '@/components/AppSidebarNav.js'
import { useSidebarStore } from '@/stores/sidebar.js'
import { useAuthStore } from '@/stores/authStores'
import nav from '@/_nav.js'

// 1. Inicialización de Stores
const auth = useAuthStore()
const sidebar = useSidebarStore()

// 2. Estado de Permisos (Mantenemos la reactividad del store)
const permissions = ref(auth.pernicions)

const tiempoSesion = computed(() => {
  const totalSegundos = Math.ceil(
    auth.tiempoRestante / 1000
  )
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = totalSegundos % 60
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
})

// 3. Filtrado de menú optimizado y reactivo mediante un computed
const menu = computed(() => {
  const filterMenu = (items) => {
    return items
      .map(item => ({ ...item }))
      .filter(item => {
        // Si no tiene clave de permiso, se muestra siempre
        if (!item.key) return true

        // Si tiene subelementos, filtramos los hijos recursivamente
        if (item.items && Array.isArray(item.items)) {
          item.items = filterMenu(item.items)
          return item.items.length > 0
        }

        // Validación segura del permiso
        return !!permissions.value?.[item.key]
      })
  }

  return filterMenu(nav)
})
</script>