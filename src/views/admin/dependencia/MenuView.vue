<template>
  <CRow>
    <!-- ==================================================================== -->
    <!-- Tarjeta para gestionar jefes         -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.jefes && admin">
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <i class="bi bi-person-workspace me-2"></i>
          <span class="fs-6 text-white">Jefes</span>
        </CCardHeader>
        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 bg-secundary-subtle bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-person-workspace fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-1">Jefes</h6>
          <small class="text-body-secondary">Genstion de Jefes</small>
        </CCardBody>
        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getJefes">
            Ingresar
            <CIcon icon="cil-arrow-right" class="ms-1" />
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta para administrar Centros de Costos         -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.areas && admin">
      <div class="d-md-none mb-3"></div>
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <div class="align-items-center">
            <i class="bi bi-building-check me-2"></i>
            <span class="fs-6 text-white">Centro Costos</span>
          </div>
        </CCardHeader>
        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 bg-secundary-subtle bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-building-check fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-1">Centros de Costo</h6>
          <small class="text-body-secondary">Gestion y Administracion.</small>
        </CCardBody>
        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getAreas">
            Ingresar
            <CIcon icon="cil-arrow-right" class="ms-1" />
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta para administrar Cuantas Contables        -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.sucursales && admin">
      <div class="d-md-none mb-3"></div>
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <i class="bi bi-person-vcard me-2"></i>
          <span class="fs-6 text-white">Cuenta de Gastos</span>
        </CCardHeader>
        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 bg-secundary-subtle bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-person-vcard fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-1">Cuenta de Gastos</h6>
          <small class="text-body-secondary">Genstion de Gastos.</small>
        </CCardBody>
        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getGastos">
            Ingresar
            <CIcon icon="cil-arrow-right" class="ms-1" />
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

  </CRow>
</template>

<script setup>
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================

import { onMounted, ref, onUnmounted } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useAuthStore } from '@/stores/authStores'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const router = useRouter()
const auth = useAuthStore()
const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const admin = ref(rol.value === 'ADMIN' ? true : false)


// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================


// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'Home' })
}
const getJefes = () => {
  router.push({ name: 'JEFES' })
}
const getAreas = () => {
  router.push({ name: 'AREA' })
}

const getGastos = () => {
  router.push({ name: 'GASTOS' })
}

const getAction = () => {
  setActions([
    {
      visible: true,
      label: 'Salir',
      icon: 'cil-account-logout',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      onClick: salir
    }
  ])
}
// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  getAction()
})
onUnmounted(() => {
  clearActions()
})
// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================
</script>