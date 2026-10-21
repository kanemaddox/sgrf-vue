<template>
    <CRow>
        <!-- ================================================================================ -->
        <!-- Tarjeta de Revisar Solicitudes de Fondos (Visible solo para autorizados)         -->
        <!-- ================================================================================ -->
        <CCol :xs="12" :sm="12" :md="6" :lg="4" v-if="pernicions?.aprobar_solicitud">
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-clipboard2-check-fill text-white me-2"></i>
                        <span class="text-white">Revisar Solicitudes</span>
                    </div>
                    <CBadge color="light" text-color="dark" shape="rounded-pill" class="px-2.5 py-1 fw-semibold">
                        {{ (Number(estado[3]) || 0) + (Number(estado[4]) || 0) + (Number(estado[5]) || 0) }} Total
                    </CBadge>
                </CCardHeader>

                <!-- Cuerpo de la tarjeta dividido en dos columnas responsivas -->
                <CCardBody>
                    <CRow>
                        <!-- Columna Izquierda: Icono ilustrativo y título secundario -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6"
                            class="text-center border-end d-flex flex-column align-items-center justify-content-center py-2">
                            <div class="bg-success-subtle p-3 rounded-circle mb-2 d-inline-flex align-items-center justify-content-center"
                                style="width: 100px; height: 100px;">
                                <i class="bi bi-clipboard2-check-fill text-success fs-2"></i>
                            </div>
                            <span class="text-muted small fw-medium">Gestión de Fondos</span>
                        </CCol>

                        <!-- Columna Derecha: Botones de estado modernos -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush >
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('pendiente')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[3] }}
                                            </CBadge>
                                            <i class="bi bi-hourglass-split text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>

                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('aprobado')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[4] }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>

                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('rechazado')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[5] }}
                                            </CBadge>
                                            <i class="bi bi-x-circle text-danger"></i> Rechazados
                                        </CButton>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter class="text-center">
                    <span class="text-muted small fw-medium">Gestione y consulte el estado de sus formularios
                        enviados.</span>
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- ==================================================================== -->
        <!-- Tarjeta: Crear Solicitud de Fondos                                   -->
        <!-- ==================================================================== -->
        <CCol :xs="12" :sm="6" :md="4" :lg="3" v-if="pernicions?.crear_solicitud">
            <CCard>
                <!-- Encabezado -->
                <CCardHeader class="headercolor">
                    <i class="bi bi-file-earmark-plus-fill text-white me-2"></i>
                    <span class="text-white">Formulario de Solicitud</span>
                </CCardHeader>

                <!-- Cuerpo de la Tarjeta -->
                <CCardBody class="d-flex flex-column align-items-center justify-content-center text-center p-4">
                    <!-- Icono principal en contenedor estético -->
                    <div class="icon-container mb-3 text-primary bg-light p-3 rounded-circle shadow-inner"
                        style="width: 100px; height: 100px;">
                        <i class="bi bi-file-earmark-text fs-1"></i>
                    </div>

                    <h6 class="fw-bold text-dark mb-1">Crear Solicitud</h6>
                    <p class="text-muted small mb-0">Genere una nueva solicitud de fondos para su procesamiento.</p>
                </CCardBody>

                <!-- Pie de la Tarjeta -->
                <CCardFooter class="pb-3 text-center">
                    <CButton color="primary" variant="outline" size="sm" class="w-75 rounded-pill shadow-sm py-2"
                        @click="getCrear">
                        <i class="bi bi-arrow-right-circle me-1"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- ==================================================================== -->
        <!-- Tarjeta: Mis Solicitudes de Fondos                                   -->
        <!-- ==================================================================== -->
        <CCol :xs="12" :sm="6" :md="6" :lg="4">
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-file-earmark-text-fill me-2"></i>
                        <span class="text-white">Mis Solicitudes de Fondos</span>
                    </div>
                    <CBadge color="light" text-color="dark" shape="rounded-pill" class="px-2.5 py-1 fw-semibold">
                        {{ (Number(estado[0]) || 0) + (Number(estado[1]) || 0) + (Number(estado[2]) || 0) }} Total
                    </CBadge>
                </CCardHeader>

                <!-- Cuerpo de la tarjeta -->
                <CCardBody class="d-flex flex-column justify-content-center p-3">
                    <CRow class="w-100 align-items-center g-3">
                        <!-- Columna Izquierda: Icono ilustrativo y título secundario -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6"
                            class="text-center border-end d-flex flex-column align-items-center justify-content-center py-2">
                            <div class="bg-info-subtle p-3 rounded-circle mb-2 d-inline-flex align-items-center justify-content-center"
                                style="width: 100px; height: 100px;">
                                <i class="bi bi-file-earmark-text-fill text-info fs-2"></i>
                            </div>
                            <span class="text-muted small fw-medium">Gestión de Solicitudes</span>
                        </CCol>

                        <!-- Columna Derecha: Botones de estado modernos -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes('pendiente')">
                                            <CBadge color="warning" position="top-end" shape="rounded-pill">{{ estado[0]
                                                || 0 }}
                                            </CBadge>
                                            <i class="bi bi-hourglass-split text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>

                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes('aprobado')">
                                            <CBadge color="success" position="top-end" shape="rounded-pill">{{ estado[1]
                                                || 0 }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>

                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes('rechazado')">
                                            <CBadge color="danger" position="top-end" shape="rounded-pill">{{ estado[2]
                                                || 0 }}
                                            </CBadge>
                                            <i class="bi bi-x-circle text-danger"></i> Rechazados
                                        </CButton>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter class="text-center">
                    <span class="text-muted small fw-medium">Gestione y consulte el estado de sus formularios
                        enviados.</span>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
    <br>

</template>
<script setup>
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
import { useAlert } from '@/composables/useAlert'
import { useRouter } from 'vue-router'
import { useSrf } from '@/composables/useSrf'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { getSrfEstadoUse, estado } = useSrf()
const { dataLoading, close, info } = useAlert()
const router = useRouter()
const auth = useAuthStore()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const pernicions = ref(auth.pernicions)
const persona = ref(auth.persona)
const image = ref(auth.imagen)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================


// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================

const getCrear = async () => {
    if (image.value === "usuario.png") {
        await info('Informacion', 'Debes de Colocar tu imagen de perfil antes de Seguir.')
        router.push({
            name: 'Profile'
        })
    } else {
        router.push({
            name: 'CrearSrf'
        })
    }

}

const getSolicitudes = (value) => {
    router.push({
        name: 'ListaSRF',
        params: { estado: value }
    })
}

const getRevisar = (value) => {
    router.push({
        name: 'SolicitudSRF',
        params: { solicitud: value }
    })
}

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================

onMounted(async () => {
    dataLoading()
    try {
        await getSrfEstadoUse(persona.value.id)
    } finally {
        close()
    }

})
// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================
const vars = {
    '--cui-card-border-color': '#ffffff',
}

</script>