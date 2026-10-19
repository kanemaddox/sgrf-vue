<template>
  <CRow>
    <!-- ==================================================================== -->
    <!-- Tarjeta para Listar los Centros de Costo         -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3">
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <i class="bi bi-list-task me-2"></i>
          <span class="fs-6 text-white">Centros de Costo</span>
        </CCardHeader>
        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 bg-secundary-subtle bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-list-task fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-1">Centros de Costo</h6>
          <small class="text-body-secondary">Gestion de los Centros de Costo</small>
        </CCardBody>
        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getArea">
            Ingresar
            <CIcon icon="cil-arrow-right" class="ms-1" />
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta para importar centros de costo por Excel                    -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3">
      <div class="d-md-none mb-3"></div>
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <i class="bi bi-file-earmark-excel me-2"></i>
          <span class="fs-6">Importar Centros de Costo</span>
        </CCardHeader>

        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 bg-success-subtle bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-file-earmark-excel text-success fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-2">Importar desde Excel</h6>
          <!-- Enlace para descargar el formato/plantilla -->
          <small class="text-body-secondary">
            <a href="#" @click.prevent="formatoExcel('centro')">
              descarga el formato Excel
            </a>
          </small>
        </CCardBody>

        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getAreaImport">
            Importar
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

import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useFunction } from '@/composables/useFunction'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { setActions, clearActions } = useBreadcrumb()
const {formatoExcel} = useFunction()
const router = useRouter()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================


// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================


// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================

const getArea = () => {
  router.push({ name: 'ListaArea' })
}
const getAreaImport = () => {
  router.push({ name: 'ImportarArea' })
}

const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'Dependencias' })
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