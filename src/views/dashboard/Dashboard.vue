<template>
  <CRow>
    <!-- ==================================================================== -->
    <!-- Tarjeta de Configuración (Visible solo para administradores)         -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="6" :md="4" :lg="3" v-if="admin">
      <CCard class="mb-4 mb-sm-0">
        <!-- Cabecera de la tarjeta con estilo moderno y sutil degradado -->
        <CCardHeader class="headercolor">
          <i class="bi bi-gear-fill me-2"></i>
          <span class="text-white">Configuración</span>
        </CCardHeader>

        <!-- Cuerpo de la tarjeta con lista de opciones estilizadas -->
        <CCardBody class="p-2">
          <ul class="list-unstyled mb-0">
            <li class="mb-1">
              <CButton color="light" variant="ghost"
                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg" @click="getSettings">
                <i class="bi bi-gear me-2 text-primary"></i>
                <span>Local Settings</span>
              </CButton>
            </li>
            <li class="mb-1">
              <CButton color="light" variant="ghost"
                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg" @click="getFormSrf">
                <i class="bi bi-file-earmark-text me-2 text-success"></i>
                <span>Form. de Solicitud</span>
              </CButton>
            </li>
            <li class="mb-1">
              <CButton color="light" variant="ghost"
                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg" @click="getFormRdg">
                <i class="bi bi-file-earmark-fill me-2 text-warning"></i>
                <span>Form. de Rendicion</span>
              </CButton>
            </li>
            <li class="mb-1">
              <CButton color="light" variant="ghost"
                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg" @click="getUsuarios">
                <i class="bi bi-people-fill me-2 text-info"></i>
                <span>Usuarios</span>
              </CButton>
            </li>
            <li>
              <CButton color="light" variant="ghost"
                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg"
                @click="getDependencias">
                <i class="bi bi-hdd-network-fill me-2 text-danger"></i>
                <span>Dependencias</span>
              </CButton>
            </li>
          </ul>
        </CCardBody>

        <CCardFooter class="bg-transparent border-0 text-center pb-3">
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta: Crear Solicitud de Fondos                                   -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="6" :md="4" :lg="3" v-if="pernicions?.crear_solicitud">
      <div class="d-md-none mb-3"></div>
      <CCard class="mb-4 mb-sm-0">
        <!-- Cabecera de la tarjeta con estilo limpio y profesional -->
        <CCardHeader class="headercolor">
          <i class="bi bi-file-earmark-text me-2"></i>
          <span class="text-white">Solicitud de Fondos</span>
        </CCardHeader>

        <!-- Cuerpo de la tarjeta con icono estilizado y espaciado adecuado -->
        <CCardBody class="text-center d-flex flex-column align-items-center justify-content-center py-4">
          <div class="icon-container mb-3 text-primary bg-light p-3 rounded-circle shadow-inner">
            <i class="bi bi-file-earmark-text display-4"></i>
          </div>
          <p class="text-muted small mb-0 px-2">Crear Solicitud de Fondos</p>
        </CCardBody>

        <!-- Pie de tarjeta con botón destacado -->
        <CCardFooter class="text-center pb-3">
          <CButton color="primary" variant="outline" size="sm" class="w-75 rounded-pill shadow-sm py-2" @click="getSrf">
            <i class="bi bi-arrow-right-circle me-1"></i> Ingresar
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ==================================================================== -->
    <!-- Tarjeta: Rendición de Gastos                                   -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="6" :md="4" :lg="3" v-if="pernicions?.crear_repocicion">
      <div class="d-md-none mb-3"></div>
      <CCard class="mb-4 mb-sm-0">
        <!-- Cabecera de la tarjeta con estilo limpio y profesional -->
        <CCardHeader class="headercolor">
          <i class="bi bi-file-earmark-text-fill me-2"></i>
          <span class="text-white">Rendicion de Gastos</span>
        </CCardHeader>

        <!-- Cuerpo de la tarjeta con icono estilizado y espaciado adecuado -->
        <CCardBody class="text-center d-flex flex-column align-items-center justify-content-center py-4">
          <div class="icon-container mb-3 text-warning bg-light p-3 rounded-circle shadow-inner">
            <i class="bi bi-file-earmark-text-fill display-4"></i>
          </div>
          <p class="text-muted small mb-0 px-2">Crear Rendicion de Gastos</p>
        </CCardBody>

        <!-- Pie de tarjeta con botón destacado -->
        <CCardFooter class="text-center pb-3">
          <CButton color="warning" variant="outline" size="sm" class="w-75 rounded-pill shadow-sm py-2 text-dark"
            @click="getRdg">
            <i class="bi bi-arrow-right-circle me-1"></i> Ingresar
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
import { useAlert } from '@/composables/useAlert'
import { useRouter } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const auth = useAuthStore()
const { success } = useAlert()
const router = useRouter()


// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const pernicions = ref(auth.pernicions)
const pass = auth.pass
const rol = ref(auth.rol)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const admin = ref(rol.value === 'ADMIN' ? true : false)

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================

const getSrf = () => {
  router.push({ name: 'MenuSrf' })
}

const getRdg = () => {
  router.push({ name: 'MenuRdg' })
}

const getSettings = () => {
  router.push({ name: 'LocalSettings' })
}

const getFormSrf = () => {
  router.push({ name: 'FormularioSRF' })
}

const getFormRdg = () => {
  router.push({ name: 'FormularioRDG' })
}

const getUsuarios = () => {
  router.push({ name: 'UsuariosMenu' })
}

const getDependencias = () => {
  router.push({ name: 'Dependencias' })
}

const updatePass = async () => {
  if (pass === true) {
    await success('¡Bienvenido!', 'Por seguridad, por favor actualiza tu contraseña.')
    router.push({ name: 'Profile' })
  }
}
// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(() => {
  updatePass()
})
// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================


</script>
