<template>
    <CRow>
        <!--Card para revisar solicitudes-->

        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.aprobar_solicitud">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-clipboard2-check-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Revisar Solicitudes</label>
                </CCardHeader>
                <CListGroup flush>
                    <CListGroupItem class="text-center">
                        <i class="bi bi-clipboard2-check-fill text-success" style="font-size: 2rem;"></i>
                    </CListGroupItem>
                    <CListGroupItem class="d-grid gap-2">
                        <CButton color="secondary" variant="outline" size="sm" @click="getRevisar('pendiente')">
                            <i class="bi bi-exclamation-triangle-fill"></i> Pendientes
                        </CButton>
                    </CListGroupItem>
                    <CListGroupItem class="d-grid gap-2">
                        <CButton color="secondary" variant="outline" size="sm" @click="getRevisar('aprobado')">
                            <i class="bi bi-check-circle-fill"></i> Aprobadas
                        </CButton>
                    </CListGroupItem>
                    <CListGroupItem class="d-grid gap-2">
                        <CButton color="secondary" variant="outline" size="sm" @click="getRevisar('rechazado')">
                            <i class="bi bi-x-circle-fill"></i> Rechazadas
                        </CButton>
                    </CListGroupItem>

                </CListGroup>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getRevisar('todos')">
                        <i class="bi bi-clipboard2-check-fill"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.crear_solicitud">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-file-earmark-text me-2"></i>
                    <label class="mb-0 fs-6 text-white">Crear Solicitud</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-file-earmark-text" style="font-size: 5rem;"></i>
                    <p>Crear una Solicitud de Fondos</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getFondos">
                        <i class="bi bi-file-earmark-text"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-folder-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Mis Solicitudes</label>
                </CCardHeader>
                <CListGroup flush>
                    <CListGroupItem class="text-center">
                        <i class="bi bi-folder-fill text-warning" style="font-size: 2rem;"></i> 
                    </CListGroupItem>
                    <CListGroupItem class="d-grid gap-2">
                        <CButton color="secondary" variant="outline" size="sm" @click="getSolicitudes('pendiente')">
                            <i class="bi bi-exclamation-triangle"></i> Pendientes
                        </CButton>
                    </CListGroupItem>
                    <CListGroupItem class="d-grid gap-2">
                        <CButton color="secondary" variant="outline" size="sm" @click="getSolicitudes('aprobado')">
                            <i class="bi bi-check-circle"></i> Aprobadas
                        </CButton>
                    </CListGroupItem>
                    <CListGroupItem class="d-grid gap-2">
                        <CButton color="secondary" variant="outline" size="sm" @click="getSolicitudes('rechazado')">
                            <i class="bi bi-x-circle"></i> Rechazadas
                        </CButton>
                    </CListGroupItem>

                </CListGroup>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getSolicitudes('rechazado')">
                            <i class="bi bi-folder-fill "></i> Ingresar
                        </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

    </CRow>

</template>
<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import { useAlert } from '@/composables/useAlert'
const { success, confirm, error } = useAlert()

import { useRouter } from 'vue-router'
import { CCardBody, CListGroup, CListGroupItem } from '@coreui/vue'
const router = useRouter()

const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)
const admin = ref(rol.value === 'ADMIN' ? true : false)


const getFondos = () => {
    router.push({ name: 'Crear Solicitud de Fondos' })
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
        params:{solicitud:value}
     })
}

/**Funciones */

</script>
