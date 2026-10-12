<template>
    <CRow>
        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="admin">
            <CCard>
                <CCardHeader class="headercolor">
                    <i class="bi bi-gear me-2"></i>
                    <label class="mb-0 fs-6 text-white">Settings</label>
                </CCardHeader>
                <CCardBody>
                    <ul style="list-style-type: none; padding: 0;">
                        <li>
                            <CButton color="secondary" variant="ghost" @click="getSettings">
                                <i class="bi bi-gear me-2"></i>Local Settings
                            </CButton>
                        </li>
                        <li>
                            <CButton color="secondary" variant="ghost" @click="getFormSrf">
                                <i class="bi bi-file-earmark me-2"></i>Form. de Solicitud
                            </CButton>
                        </li>
                        <li>
                            <CButton color="secondary" variant="ghost" @click="getFormRdg">
                                <i class="bi bi-file-earmark-fill me-2"></i>Form. de Rendicion
                            </CButton>
                        </li>
                        <li>
                            <CButton color="secondary" variant="ghost" @click="getUsuarios">
                                <i class="bi bi-people me-2"></i>Usuarios
                            </CButton>
                        </li>
                        <li>
                            <CButton color="secondary" variant="ghost" @click="getDependencias">
                                <i class="bi bi-hdd-network-fill me-2"></i>Dependencias
                            </CButton>
                        </li>
                    </ul>
                </CCardBody>
                <CCardFooter class="text-center">
                </CCardFooter>
            </CCard>
        </CCol>

        <!--Card para observaciones Aprobadas-->
        <CCol :xs="12" :sm="4" :md="3" :lg="3" v-if="pernicions?.crear_solicitud">
            <div class="d-md-none mb-3"></div>
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
                    <CButton color="secondary" variant="outline" size="sm" @click="getSrf">
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
                    <CButton color="secondary" variant="outline" size="sm" @click="getRdg">
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
const { success } = useAlert()

import { useRouter } from 'vue-router'
const router = useRouter()
const pass = auth.pass

const pernicions = ref(auth.pernicions)
const rol = ref(auth.rol)
const admin = ref(rol.value === 'ADMIN' ? true : false)

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

const getSrf = () => {
    router.push({ name: 'MenuSrf' })
}

const getRdg = () => {
    router.push({ name: 'MenuRdg' })
}

/**Funciones */
const updatePass = async () => {
    if (pass === true) {
        await success('¡Bienvenido!', 'Por seguridad, por favor actualiza tu contraseña.')
        router.push({ name: 'Profile' })
    }

}
onMounted(() => {
    updatePass()
})

</script>
