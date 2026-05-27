<template>
    <CRow>
        <!--Card para observaciones Aprobadas-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.crear_solicitud">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <i class="bi bi-file-earmark-text me-2"></i>
                    <label class="mb-0 fs-6 text-white">Solicitud de Fondos</label>
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-file-earmark-text" style="font-size: 5rem;"></i>
                    <p>Crear Solicitud de Fondos</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="getFondos">
                        <i class="bi bi-file-earmark-text"></i> Ingresar
                    </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.crear_repocicion">
            <br />
            <CCard>
                <CCardHeader class="headercolor text-center">
                    <i class="bi bi-file-earmark-text-fill me-2"></i>
                    <label class="mb-0 fs-6 text-white">Rendicion de Gastos</label>
                    
                </CCardHeader>
                <CCardBody class="text-center">
                    <i class="bi bi-file-earmark-text-fill" style="font-size: 5rem;"></i>
                    <p>Crear Rendicion de Gastos</p>
                </CCardBody>
                <CCardFooter class="text-center">
                    <CButton color="secondary" variant="outline" size="sm" @click="clickModalObs(true)">
                        <i class="bi bi-file-earmark-text-fill"></i> Ingresar
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
const router = useRouter()

const nombre = ref(auth.nombre)
const pass = auth.pass

const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)
const admin = ref(rol.value==='ADMIN'?true:false)


const getFondos = ()=>{
    router.push({name:'Crear Solicitud de Fondos'})
}

/**Funciones */
const updatePass = async () => {
    console.log(pass)
    if (pass === true) {
        await success('¡Bienvenido!', 'Por seguridad, por favor actualiza tu contraseña.')
        router.push({ name: 'Profile' })
    }

}
onMounted(() => {
    updatePass()
})

</script>
