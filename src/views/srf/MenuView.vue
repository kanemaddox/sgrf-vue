<template>
    <!--Card para revisar solicitudes-->
    <CRow>
        <CCol :xs="12" :sm="4" :md="4" :lg="4" v-if="pernicions?.aprobar_solicitud">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-clipboard2-check-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Revisar Solicitudes de Fondos</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <CRow>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <i class="bi bi-clipboard2-check-fill text-success" style="font-size: 4rem;"></i>
                            <p>Revisar Solicitudes de Fondos</p>
                        </CCol>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('pendiente')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[3] }}
                                            </CBadge>
                                            <i class="bi bi-exclamation-triangle text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('aprobado')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[4] }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
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
                </CCardFooter>
            </CCard>
        </CCol>
    
            <!--Card para revisar solicitudes-->

        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.crear_solicitud">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-file-earmark-text me-2"></i>
                    <label class="mb-0 fs-6 text-white">Formulario de Solicitud</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-file-earmark-text" style="font-size: 4rem;"></i>
                    <p>Crear un Formulario de Solicitud de Fondos</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getCrear">
                        <i class="bi bi-file-earmark-text"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="4" :lg="4">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-file-earmark-text-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Mis Solicitudes de Fondos</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <CRow>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <i class="bi bi-file-earmark-text-fill text-info" style="font-size: 4rem;"></i>
                            <p>Formularios de Solicitudes de Fondos</p>
                        </CCol>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes('pendiente')">
                                            <CBadge color="warning" position="top-end" shape="rounded-pill">{{ estado[0]
                                            }}
                                            </CBadge>
                                            <i class="bi bi-exclamation-triangle text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes('aprobado')">
                                            <CBadge color="success" position="top-end" shape="rounded-pill">{{ estado[1]
                                            }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes('rechazado')">
                                            <CBadge color="danger" position="top-end" shape="rounded-pill">{{ estado[2]
                                            }}
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

                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
    <br>

</template>
<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close, info } = useAlert()

import { useRouter } from 'vue-router'
const router = useRouter()

import { useSrf } from '@/composables/useSrf'
const { getSrfEstadoUse, estado } = useSrf()

const pernicions = ref(auth.pernicions)
const persona = ref(auth.persona)
const image = ref(auth.imagen)

const vars = {
    '--cui-card-border-color': '#ffffff',
}

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

/**Funciones */

onMounted(async () => {
    dataLoading()
    try {
        await getSrfEstadoUse(persona.value.id)
    } finally {
        close()
    }

})

</script>
