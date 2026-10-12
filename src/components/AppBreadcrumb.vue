<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { actions } = useBreadcrumb()

const breadcrumbs = ref()

const getBreadcrumbs = () => {
  return router.currentRoute.value.matched.map((route) => {

    let tituloFinal = route.name
    if (route.meta?.title) {
      tituloFinal = typeof route.meta.title === 'function'
        ? route.meta.title(router.currentRoute.value)
        : route.meta.title
    }

    let pathProcesado = route.path;
    Object.keys(router.currentRoute.value.params).forEach(param => {
      pathProcesado = pathProcesado.replace(`:${param}`, router.currentRoute.value.params[param]);
    });

    return {
      active: route.path === router.currentRoute.value.fullPath,
      name: tituloFinal,
      path: `${router.options.history.base}${pathProcesado}`,
    }
  })
}

router.afterEach(() => {
  breadcrumbs.value = getBreadcrumbs()
})

onMounted(() => {
  breadcrumbs.value = getBreadcrumbs()
})
</script>

<template>

  <CCol :xs="12" :sm="6" :md="6" :lg="6">
    <CBreadcrumb class="my-0" >
      <CBreadcrumbItem v-for="item in breadcrumbs" :key="item" :href="item.active ? '' : item.path"
        :active="item.active === breadcrumbs.length - 1" >
        {{ item.name }}
      </CBreadcrumbItem>
    </CBreadcrumb>
  </CCol>

  <!-- Acciones -->
  <CCol :xs="12" :sm="6" :md="6" :lg="6" class="text-end">
      <CButtonGroup v-if="actions.length" role="group" size="sm">
        <CButton v-for="action in actions" :key="action.label" v-show="action.visible !== false"
          :color="action.color || 'success'" :variant="action.variant || 'outline'" size="sm"
          :disabled="action.disabled" @click="action.onClick" class="custom-hover-btn">
          <CIcon v-if="action.icon" :icon="action.icon" class="me-2"/>
          <span :class="action.movile">{{ action.label }}</span>
        </CButton>
      </CButtonGroup>
  </CCol>


</template>