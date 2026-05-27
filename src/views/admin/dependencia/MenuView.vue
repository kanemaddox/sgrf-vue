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
                    <p>Categoria de Jefes</p>
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
                        <i class="bi bi-buildings me-2"></i>
                        <label class="mb-0 fs-6 text-white">Areas</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-buildings" style="font-size: 5rem;"></i>
                    <p>Areas de Trabajo</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getAreas">
                        <i class="bi bi-buildings"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.sucursales && admin">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <div class="align-items-center">
                        <i class="bi bi-house-door me-2"></i>
                        <label class="mb-0 fs-6 text-white">Sucursales</label>
                    </div>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-house-door" style="font-size: 5rem;"></i>
                    <p>Sucursales de Trabajo</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getSucursales">
                        <i class="bi bi-house-door"></i> Ingresar
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
    router.push({ name: 'Lista de Areas' })
}
const getSucursales = () => {
    router.push({ name: 'Lista de Sucursales' })
}

</script>