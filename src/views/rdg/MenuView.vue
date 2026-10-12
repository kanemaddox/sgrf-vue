<template>

    <CRow>
        <!--Card para revisar solicitudes-->
        <CCol :xs="12" :sm="4" :md="4" :lg="4" v-if="pernicions?.aprobar_solicitud">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-clipboard2-check-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Solicitudes de Rendiciones de Fondos</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <CRow>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <i class="bi bi-clipboard2-check-fill text-success" style="font-size: 4rem;"></i>
                            <p>Revisar Formularios de Rendiciones de Fondos Solicitadas</p>
                        </CCol>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('pendiente')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[4] }}
                                            </CBadge>
                                            <i class="bi bi-exclamation-triangle text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getRevisar('aprobado')">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">{{ estado[5] }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
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

                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para revisar solicitudes-->
        <CCol :xs="12" :sm="4" :md="4" :lg="4">
            <br>
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-file-earmark-text me-2"></i>
                    <label class="mb-0 fs-6 text-white">Crear Formulario</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <CCardText>Crear Formulario de Rendicion de Fondos : </CCardText>
                    <CRow>
                        <CCol :xs="5" :sm="5" :md="5" :lg="5">
                            <i class="bi bi-folder-plus text-warning" style="font-size: 4rem;"></i>
                        </CCol>
                        <CCol :xs="7" :sm="7" :md="7" :lg="7">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getSolicitudes()">
                                            <CBadge color="info" position="top-end" shape="rounded-pill">
                                                {{ estado[0] }}
                                            </CBadge>
                                            <i class="bi bi-hourglass-split text-info"></i> Con Solicitud
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="secondary" variant="outline" size="sm" @click="getRdg">
                                            <i class="bi bi-clipboard2-pulse"></i> Sin Solicitud
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

        <CCol :xs="12" :sm="4" :md="4" :lg="4">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-file-earmark-text-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Mis Formularios</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <CRow>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <i class="bi bi-file-earmark-text-fill text-info" style="font-size: 4rem;"></i>
                            <CCardText>Formularios de Rendiciones de Fondos</CCardText>
                        </CCol>
                        <CCol :xs="6" :sm="6" :md="6" :lg="6">
                            <CCard :style="vars">
                                <CListGroup flush>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getLista('pendiente')">
                                            <CBadge color="warning" position="top-end" shape="rounded-pill">
                                                {{ estado[1] }}
                                            </CBadge>
                                            <i class="bi bi-exclamation-triangle text-warning"></i> Pendientes
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
                                        <CButton color="secondary" class="position-relative ms-1" variant="outline"
                                            size="sm" @click="getLista('aprobado')">
                                            <CBadge color="success" position="top-end" shape="rounded-pill">
                                                {{ estado[2] }}
                                            </CBadge>
                                            <i class="bi bi-check-circle text-success"></i> Aprobados
                                        </CButton>
                                    </CListGroupItem>
                                    <CListGroupItem>
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
const { dataLoading, close } = useAlert()


import { useRouter } from 'vue-router'
const router = useRouter()

import { useRdg } from '@/composables/useRdg'
import { CCardText } from '@coreui/vue'
const { getRdgEstadoUse, estado } = useRdg()

const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)
const persona = ref(auth.persona)
const admin = ref(rol.value === 'ADMIN' ? true : false)

const vars = {
    '--cui-card-border-color': '#ffffff',
}
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

/**Funciones */

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove())

    dataLoading()
    try {
        await getRdgEstadoUse(persona.value.id)
    } finally {
        close()
    }
})

</script>
