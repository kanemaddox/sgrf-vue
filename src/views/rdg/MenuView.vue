<template>
    <CRow>
        <!-- ================================================================================ -->
        <!-- Tarjeta de Revisar Rendiciones de Fondos (Visible solo para autorizados)         -->
        <!-- ================================================================================ -->
        <CCol v-if="pernicions?.aprobar_solicitud" :xs="12" :sm="12" :md="6" :lg="4">
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-clipboard2-check-fill text-white me-2"></i>
                        <span class="text-white">Revisar Rendiciones</span>
                    </div>
                    <CBadge color="light" text-color="dark" shape="rounded-pill" class="px-2.5 py-1 fw-semibold">
                        {{ (Number(estado[4]) || 0) + (Number(estado[5]) || 0) + (Number(estado[6]) || 0) }} Total
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
                            <span class="text-muted small fw-medium">Gestión de Rendiciones</span>
                        </CCol>
                        <!-- Columna Derecha: Botones de estado modernos -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('pendiente')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[4] }}
                                            </CBadge>
                                            <i class="bi bi-hourglass-split text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('aprobado')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[5] }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('rechazado')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[6] }}
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
                    <span class="text-muted small fw-medium">Gestione y consulte el estado de los Formularios
                        Solicitados.</span>
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- ================================================================================ -->
        <!-- Tarjeta de Creacion de formulario de Rendiciones de Fondos                       -->
        <!-- ================================================================================ -->
        <CCol :xs="12" :sm="12" :md="6" :lg="4">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-folder-plus text-white me-2"></i>
                        <span class="text-white">Formulario de Rendicion</span>
                    </div>
                </CCardHeader>
                <!-- Cuerpo de la tarjeta dividido en dos columnas responsivas -->
                <CCardBody>
                    <CRow>
                        <!-- Columna Izquierda: Icono ilustrativo y título secundario -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6"
                            class="text-center border-end d-flex flex-column align-items-center justify-content-center py-2">
                            <div class="bg-warning-subtle p-3 rounded-circle mb-2 d-inline-flex align-items-center justify-content-center"
                                style="width: 100px; height: 100px;">
                                <i class="bi bi-folder-plus text-warning fs-2"></i>
                            </div>
                            <span class="text-muted small fw-medium">Crear Rendicion de Fondos</span>
                        </CCol>
                        <CCol :xs="12" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes()">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">
                                                {{ estado[0] }}
                                            </CBadge>
                                            <i class="bi bi-hourglass-split text-info"></i> Con Solicitud
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" variant="outline" size="sm" @click="getRdg">
                                            <i class="bi bi-clipboard2-pulse text-warning"></i> Sin Solicitud
                                        </CButton>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter class="text-center">
                    <span class="text-muted small fw-medium">Seleccione una opción para continuar.</span>
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- ================================================================================ -->
        <!-- Gestion de formularios de Rendiciones de Fondos                       -->
        <!-- ================================================================================ -->
        <CCol :xs="12" :sm="12" :md="6" :lg="4">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-file-earmark-text-fill text-white me-2"></i>
                        <span class="text-white">Mis Formularios</span>
                    </div>
                </CCardHeader>
                <!-- Cuerpo de la tarjeta dividido en dos columnas responsivas -->
                <CCardBody>
                    <CRow>
                        <!-- Columna Izquierda: Icono ilustrativo y título secundario -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6" class="text-center border-end d-flex flex-column align-items-center justify-content-center py-2">
                            <div class="bg-info-subtle p-3 rounded-circle mb-2 d-inline-flex align-items-center justify-content-center"
                                style="width: 100px; height: 100px;">
                                <i class="bi bi-file-earmark-text-fill text-info fs-2"></i>
                            </div>
                            <span class="text-muted small fw-medium">Gestión de Mis Rendiciones</span>
                        </CCol>
                        <!-- Columna Derecha: Botones de estado modernos -->
                        <CCol :xs="12" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getLista('pendiente')">
                                            <CBadge color="warning" position="top-end" shape="rounded-pill">
                                                {{ estado[1] }}
                                            </CBadge>
                                            <i class="bi bi-hourglass-split text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getLista('aprobado')">
                                            <CBadge color="success" position="top-end" shape="rounded-pill">
                                                {{ estado[2] }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem class="d-flex flex-column">
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getLista('rechazado')">
                                            <CBadge color="danger" position="top-end" shape="rounded-pill">
                                                {{ estado[3] }}
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
                    <span class="text-muted small fw-medium">Consulte y gestione el estado de sus Rendiciones de Fondos.</span>
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
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
import { useAlert } from '@/composables/useAlert'
import { useRouter } from 'vue-router'
import { useRdg } from '@/composables/useRdg'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================

const auth = useAuthStore()
const { dataLoading, close } = useAlert()
const router = useRouter()
const { getRdgEstadoUse, estado } = useRdg()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const pernicions = ref(auth.pernicions)
const persona = ref(auth.persona)

// ============================================================================
// 4. CONFIGURACIÓN VISUAL
// ============================================================================
const vars = {
    '--cui-card-border-color': '#ffffff',
}

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const getLista = (value) => {
    router.push({
        name: 'ListaRDG',
        params: { estado: value }
    })
}

const getSolicitudes = () => {
    router.push({
        name: 'Solicitudes'
    })
}

const getRdg = () => {
    router.push({
        name: 'CrearRDG',
        params: { idRdg: 0 }
    })
}

const getRevisar = (value) => {
    router.push({
        name: 'RendicionRdg',
        params: { rendicion: value }
    })
}

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================

onMounted(async () => {
    dataLoading()
    try {
        await getRdgEstadoUse(persona.value.id)
    } finally {
        close()
    }
})

</script>
