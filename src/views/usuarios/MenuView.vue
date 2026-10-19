<template>
  <CRow>
    <!-- ==================================================================== -->
    <!-- Tarjeta para mostrar usuarios                                        -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3">
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center ">
          <i class="bi bi-people me-2"></i>
          <span class="fs-6">Lista de Usuarios</span>
        </CCardHeader>

        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 text-primary bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-people fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-1">Usuarios Registrados</h6>
          <small class="text-body-secondary">Consulta y gestiona el listado completo</small>
        </CCardBody>

        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getUsuarios">
            Ver Usuarios
            <CIcon icon="cil-arrow-right" class="ms-1" />
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta de para mostrar adminsitradores         -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3">
      <div class="d-md-none mb-3"></div>
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <i class="bi bi-people-fill me-2"></i>
          <span class="fs-6 text-white">Administradores</span>
        </CCardHeader>
        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 bg-warning-subtle bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-people-fill text-warning fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-1">Administradores</h6>
          <small class="text-body-secondary">Consulta y gestiona el listado completo</small>
        </CCardBody>
        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getAdmin">
            Ver Administradores
            <CIcon icon="cil-arrow-right" class="ms-1" />
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta para importar lista de usuarios por Excel                    -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3">
      <div class="d-md-none mb-3"></div>
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <i class="bi bi-file-earmark-excel me-2"></i>
          <span class="fs-6">Importar Usuarios</span>
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
            <a href="#" @click.prevent="formatoExcel('usuario')">
              descarga el formato Excel
            </a>
          </small>
        </CCardBody>

        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getUsuariosImport">
            Importar
            <CIcon icon="cil-arrow-right" class="ms-1" />
          </CButton>
        </CCardFooter>

      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta para registrar un nuevo usuario         -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="3" :lg="3">
      <div class="d-md-none mb-3"></div>
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor text-white d-flex align-items-center">
          <i class="bi bi-person-add me-2"></i>
          <span class="fs-6 text-white">Registrar Usuario</span>
        </CCardHeader>
        <!-- Cuerpo de la tarjeta  -->
        <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
          <!-- Icono principal en contenedor estético -->
          <div class="icon-container mb-3 bg-secundary-subtle bg-light p-3 rounded-circle shadow-inner"
            style="width: 100px; height: 100px;">
            <i class="bi bi-person-add fs-1"></i>
          </div>
          <h6 class="fw-bold text-body mb-1">Registrar Usuario</h6>
          <small class="text-body-secondary">Registra un usuario nuevo</small>

        </CCardBody>
        <!-- Pie de la Tarjeta -->
        <CCardFooter class="bg-transparent border-0 text-center pb-3">
          <CButton color="primary" variant="outline" class="w-100 rounded-pill" @click="getUsuariosRegister">
            Registrar
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
import { onMounted, onUnmounted } from 'vue';
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useRouter } from 'vue-router'
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
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'Home' })
}

const getUsuarios = () => {
  router.push({ name: 'ListaUsuarios' })
}
const getUsuariosImport = () => {
  router.push({ name: 'ImportarUsuarios' })
}
const getUsuariosRegister = () => {
  router.push({ name: 'RegistrarUsuario' })
}
const getAdmin = () => {
  router.push({ name: 'Administradores' })
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
onMounted(() => {
  getAction()
})
onUnmounted(() => {
  clearActions()
})

// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================
</script>