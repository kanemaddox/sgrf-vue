<template>
    <CRow>
        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.jefes && admin">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-person-workspace me-2"></i>
                        <label class="mb-0 fs-6 text-white">Jefes</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-person-workspace" style="font-size: 5rem;"></i>
                    <p>Administrar Categoria de Jefes</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getJefes">
                        <i class="bi bi bi-person-workspace"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.areas && admin">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-building-check me-2"></i>
                        <label class="mb-0 fs-6 text-white">Centro Costos</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-building-check" style="font-size: 5rem;"></i>
                    <p>Administrar Centros de Costo</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getAreas">
                        <i class="bi bi-building-check"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>


        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.sucursales && admin">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-person-vcard me-2"></i>
                        <label class="mb-0 fs-6 text-white">Cuentas de Gastos</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-person-vcard" style="font-size: 5rem;"></i>
                    <p>Adminsitrar Cuentas de Gastos</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getGastos">
                        <i class="bi bi-person-vcard"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

    </CRow>
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)
const admin = ref(rol.value==='ADMIN'?true:false)

const getFormularioSolicitud = () => {
    router.push({ name: 'Formulario SRF' })
}
const getMenuUsuario = () => {
    router.push({ name: 'Usuarios Menu' })
}
const getJefes = () => {
    router.push({ name: 'Lista de Jefes' })
}
const getAreas = () => {
    router.push({ name: 'AREA' })
}
const getSucursales = () => {
    router.push({ name: 'Lista de Sucursales' })
}

const getGastos = () => {
    router.push({ name: 'GASTOS' })
}

</script>