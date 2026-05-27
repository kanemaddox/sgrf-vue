<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router'

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
  <CBreadcrumb class="my-0">
    <CBreadcrumbItem
      v-for="item in breadcrumbs"
      :key="item"
      :href="item.active ? '' : item.path"
      :active="item.active === breadcrumbs.length - 1"
    >
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>