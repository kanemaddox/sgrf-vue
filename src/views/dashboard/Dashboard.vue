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
                                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg"
                                @click="getSettings">
                                <i class="bi bi-gear me-2 text-primary"></i>
                                <span>Local Settings</span>
                            </CButton>
                        </li>
                        <li class="mb-1">
                            <CButton color="light" variant="ghost"
                                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg"
                                @click="getFormSrf">
                                <i class="bi bi-file-earmark-text me-2 text-success"></i>
                                <span>Form. de Solicitud</span>
                            </CButton>
                        </li>
                        <li class="mb-1">
                            <CButton color="light" variant="ghost"
                                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg"
                                @click="getFormRdg">
                                <i class="bi bi-file-earmark-fill me-2 text-warning"></i>
                                <span>Form. de Rendicion</span>
                            </CButton>
                        </li>
                        <li class="mb-1">
                            <CButton color="light" variant="ghost"
                                class="w-100 text-start d-flex align-items-center py-2 px-3 text-dark hover-bg"
                                @click="getUsuarios">
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
                    <CButton color="primary" variant="outline" size="sm" class="w-75 rounded-pill shadow-sm py-2"
                        @click="getSrf">
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
                    <CButton color="warning" variant="outline" size="sm"
                        class="w-75 rounded-pill shadow-sm py-2 text-dark" @click="getRdg">
                        <i class="bi bi-arrow-right-circle me-1"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

</template>
<script setup>
/**
 * ============================================================================
 * IMPORTACIONES DE LIBRERÍAS Y COMPOSABLES
 * ============================================================================
 */
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
import { useAlert } from '@/composables/useAlert'
import { useRouter } from 'vue-router'

// Instancias de Stores, Router y Utilidades de Alerta
const auth = useAuthStore()
const { success } = useAlert()
const router = useRouter()
const pass = auth.pass

// Propiedades reactivas para permisos y roles de usuario
const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)
const admin = ref(rol.value === 'ADMIN' ? true : false)

/**
 * ============================================================================
 * FUNCIONES Y MÉTODOS DE CONTROL
 * ============================================================================
 */
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

/**
 * Métodos de navegación para los módulos principales (Fondos y Rendición)
 */
const getSrf = () => {
    router.push({ name: 'MenuSrf' })
}

const getRdg = () => {
    router.push({ name: 'MenuRdg' })
}

/**
 * Funciones del Sistema
 * Valida si el usuario requiere actualizar su contraseña por seguridad al iniciar sesión.
 */
const updatePass = async () => {
    if (pass === true) {
        await success('¡Bienvenido!', 'Por seguridad, por favor actualiza tu contraseña.')
        router.push({ name: 'Profile' })
    }
}

/**
 * ============================================================================
 * HOOKS DEL CICLO DE VIDA (Lifecycle Hooks)
 * ============================================================================
 */
onMounted(() => {
    updatePass()
})
</script>
