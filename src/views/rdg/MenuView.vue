<template>
    <CRow>
        <!--Card para revisar solicitudes-->

        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.crear_solicitud">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-cash-coin me-2"></i>
                    <label class="mb-0 fs-6 text-white">Rendicion de Fondos</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-cash-coin text-success" style="font-size: 5rem;"></i>
                    <p>Crear una Rendicion de Fondos con Formulario de Solicitud</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getLista('tramite')">
                        <i class="bi bi-cash-coin"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.crear_solicitud">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-cash me-2"></i>
                    <label class="mb-0 fs-6 text-white">Rendicion de Fondos</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-cash text-danger" style="font-size: 5rem;"></i>
                    <p>Crear una Rendicion de Fondos sin Formulario de Solicitud</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getRdg">
                        <i class="bi bi-cash"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3">
            <br />
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <i class="bi bi-folder-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Mis Resndiciones</label>
                </CCardHeader>
                <CListGroup flush>
                    <CListGroupItem class="text-center">
                        <i class="bi bi-folder-fill text-warning" style="font-size: 4rem;"></i>
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


const getRendicion = () => {
    router.push({ name: 'CrearRDG' })
}

const getLista = (value) => {
    router.push({
        name: 'ListaRDG',
        params: { estado: value }
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
        name: 'SolicitudSRF',
        params: { solicitud: value }
    })
}

/**Funciones */

</script>
