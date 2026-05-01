<template>
    <CRow>
        <!--Datos Personales -->
        <CCol :xs="6">
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-description" size="lg" class="me-2" />Datos Personales
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CCol :xs="12">
                        <CWidgetStatsC class="mb-3" :value="persona.idp" :progress="{ color: 'success', value: 100 }"
                            title="Visitors">
                            <template #icon>
                                <img :src="imagen" class="img-fluid rounded-start" alt="..."><br>
                                <CButton color="dark" @click="clickModalFoto(true)" size="sm" class="mt-2">
                                    <CIcon icon="cil-camera" class="me-1"></CIcon> Actualizar Foto
                                </CButton>
                            </template>
                            <template #title>
                                {{ persona.nombre }} {{ persona.paterno }} {{ persona.materno }}
                                <ul>
                                    <li class="lista">IDP : {{ persona.idp }} </li>
                                    <li class="lista">Correo : {{ persona.email }}</li>
                                    <li class="lista">Celular : {{ persona.celular }}</li>
                                    <li class="lista">Fecha N : {{ persona.fechaNacimiento }}</li>
                                    <li class="lista" v-if="persona.sexo == 1">Sexo : Femenino</li>
                                    <li class="lista" v-else>Sexo : Masculino</li>
                                </ul>
                            </template>
                        </CWidgetStatsC>
                    </CCol>

                </CCardBody>
            </CCard>
        </CCol>
        <!--End Datos Personales -->

        <!--Datos De Usuario -->
        <CCol :xs="6">
            <br>
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-at" size="lg" class="me-2" />Datos Empleados
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CNav variant="tabs" class="nav nav-tabs">
                        <CNavItem>
                            <CNavLink :active="tab == 1" @click="clickTab(1)"
                                class="d-flex align-items-center gap-2 px-3 py-2 rounded" style="cursor: pointer;">
                                <CIcon icon="cil-user"></CIcon>
                                <span class="d-none d-md-inline">Datos</span>
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink :active="tab == 2" @click="clickTab(2)"
                                class="d-flex align-items-center gap-2 px-3 py-2 rounded" style="cursor: pointer;">
                                <CIcon icon="cil-pencil"></CIcon>
                                <span class="d-none d-md-inline">Actualizar</span>
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    <CTabContent>
                        <CTabPane :visible="tab == 1">
                            <br>
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">ID app</CInputGroupText>
                                <CFormInput type="text" :value="idUsuario" disabled />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">IDP</CInputGroupText>
                                <CFormInput type="text" :value="persona.idp" disabled />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Email</CInputGroupText>
                                <CFormInput type="text" :value="persona.email" disabled />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Celular</CInputGroupText>
                                <CFormInput type="text" :value="persona.celular" disabled />
                            </CInputGroup>
                        </CTabPane>

                        <CTabPane :visible="tab == 2">
                            <br>
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">ID Usuario</CInputGroupText>
                                <CFormInput type="text" :value="idUsuario" disabled />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">IPD.</CInputGroupText>
                                <CFormInput type="text" :value="persona.idp" disabled />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Email</CInputGroupText>
                                <CFormInput type="text" :value="persona.email" disabled />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Celular</CInputGroupText>
                                <CFormInput type="text" :value="persona.celular" disabled />
                                <CButton type="button" color="success" class="font" size="sm"
                                    @click="clickModalCelular(true)">
                                    Actualizar</CButton>
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText as="label">Password</CInputGroupText>
                                <CFormInput type="text" value="***************" disabled />
                                <CButton type="button" color="success" class="font" size="sm"
                                    @click="clickModalPass(true)">
                                    Actualizar Contraseña</CButton>
                            </CInputGroup>
                        </CTabPane>
                    </CTabContent>
                </CCardBody>
            </CCard>
        </CCol>
        <!--Datos De Usuario -->

    </CRow>

    <!-- Modal  Actualizar Celular-->
    <CModal :visible="modalCelular" backdrop="static" @close="clickModalCelular(false)">
        <CForm @submit.prevent="updateCelular">
            <CModalHeader class="headercolor" dismiss @close="clickModalCelular(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-at" size="lg" class="me-2" />Actualizar Numero de Celular
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="datos" />
                <br>
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Nuevo Numero de Celular</CInputGroupText>
                    <CFormInput type="text" v-model="persona.celular" required />
                </CInputGroup>
            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalCelular(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" color="success" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Actualizar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Actualizar Celular-->

    <!-- Modal  Actualizar Contraseña-->
    <CModal backdrop="static" :visible="modalPass" @close="clickModalPass(false)">
        <CForm @submit.prevent="updatePass">
            <CModalHeader class="headercolor" dismiss @close="clickModalPass(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-at" size="lg" class="me-2" />Actualizar Contraseña
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="datos" />
                <br>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Contraseña Actual</CInputGroupText>
                    <CFormInput type="password" v-model="pass.pass1" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Nueva Contraseña</CInputGroupText>
                    <CFormInput type="password" v-model="pass.pass2" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Confirmar Nueva Contraseña</CInputGroupText>
                    <CFormInput type="password" v-model="pass.pass3" />
                </CInputGroup>

                <CAlert color="warning" class="d-flex align-items-center" v-if="pass.pass2 != pass.pass3">
                    <CRow>
                        <CAlertHeading>Well done!</CAlertHeading>
                        <CCol :xs="2">
                            <CIcon icon="cil-warning" size="3xl" />
                        </CCol>
                        <CCol :xs="10">
                            <p>La nueva contraseña no coincide con su confirmación..</p>
                            <hr />
                        </CCol>
                    </CRow>
                </CAlert>

            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalPass(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>
                <CButton v-if="botones" type="submit" class="font" color="success" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Actualizar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Actualizar Contraseña-->

    <!-- Modal  Actualizar Foto-->
    <CModal backdrop="static" :visible="modalFoto" @close="clickModalFoto(false)">
        <CForm @submit.prevent="uploadFile" enctype="multipart/form-data">
            <CModalHeader class="headercolor" dismiss @close="clickModalFoto(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-description" size="lg" class="me-2" />Actualizar Foto de Perfil
                    </h6>
                </CModalTitle>
            </CModalHeader>

            <CModalBody>
                <!-- INPUT -->
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label">Foto de Perfil</CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png,image/jpeg"
                        @change="selectFile" :valid="fileValid" :disabled="uploading" required />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check" class="text-success" />
                    </CInputGroupText>
                </CInputGroup>

                <!-- PREVIEW -->
                <div class="md-3 row text-center" v-if="nuevafoto">
                    <img :src="nuevafoto" class="img-fluid rounded shadow-sm" />
                </div>
                <!-- PROGRESS -->
                <CProgress v-if="uploading" :height="50" class="mb-3">
                    <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                        animated>
                        {{ uploadProgress < 100 ? `Subiendo... ${uploadProgress}%` : 'Procesando imagen...' }}
                            </CProgressBar>
                </CProgress>
                <!-- ERROR -->
                <div v-if="errorMsg" class="alert alert-danger text-center">
                    {{ errorMsg }}
                </div>

            </CModalBody>

            <CModalFooter>
                <CButton @click="clickModalFoto(false)" color="danger" class="font" size="sm" :disabled="uploading">
                    <CIcon icon="cil-x" class="me-2" />
                    Cancelar
                </CButton>

                <CButton type="submit" class="font" color="success" size="sm" :disabled="!fileValid || uploading">
                    <CIcon icon="cil-camera" class="me-2" />
                    <span v-if="uploading">Subiendo...</span>
                    <span v-else>Actualizar</span>
                </CButton>
            </CModalFooter>

        </CForm>
    </CModal>
    <!-- End Modal  Actualizar Foto-->

</template>


<script setup>

/**Imports de librerias  y Propos*/
import { nextTick, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStores'
import { uploadProfile } from '@/services/uploadService'
import ComponenteNombres from '@/components/usuario/ComponenteNombres.vue'
import { CRow } from '@coreui/vue';
import { useAuth } from '@/composables/useAuth'
const { logout } = useAuth()

import { useUsuario } from '@/composables/useUsuario'
const { updateUsuarioImagenUse, updatePassUse, loading, errorUse } = useUsuario()

import { usePersona } from '@/composables/usePersona'
const { updateCelularUse,loadingPersona,errorPersona } = usePersona()

import { API_URL_IMG200, API_URL_IMG800 } from "@/env"
const img200 = API_URL_IMG200
const img800 = API_URL_IMG800

import { useAlert } from '@/composables/useAlert'
const { confirm, success, error } = useAlert()



/** Declaraciones de VAriables reactibas */
const router = useRouter()
const auth = useAuthStore()
const tab = ref(1)

const archivo = ref(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const errorMsg = ref(null)
const fileValid = ref(false)

const nombre = ref(auth.nombre)
const idUsuario = ref(auth.idUsuario)
var nombre200 = "/public/usuario.png"
var nombre800 = nombre200
if (auth.imagen != "usuario.png"){
    nombre200 = img200 + auth.imagen
    nombre800 = img800 + auth.imagen
}
const imagen = ref(nombre200)
const nuevafoto = ref(nombre800)

const persona = auth.persona
const celularAnt = persona.celular

/**Declaracion de objetos */
const datos = {
    idp: persona.idp,
    nombre: persona.nombre,
    apellidos: persona.paterno + " " + persona.materno
}

const pass = reactive({
    id: '',
    pass1: '',
    pass2: '',
    pass3: ''
})


/**Variables para Modales */
const modalCelular = ref(false)
const modalPass = ref(false)
const modalFoto = ref(false)

/** Funciones  */
const clickTab = (value) => {
    tab.value = value
}

const clickModalCelular = (value) => {
    modalCelular.value = value
}

const clickModalPass = (value) => {
    modalPass.value = value
}
const clickModalFoto = (value) => {
    modalFoto.value = value
}

const botones = computed(() => {
    return (
        pass.pass1 !== '' &&
        pass.pass2 !== '' &&
        pass.pass2 === pass.pass3
    )
})


const selectFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    archivo.value = file
    fileValid.value = true
    nuevafoto.value = URL.createObjectURL(file)
}

const uploadFile = () => {
    if (!archivo.value) return

    uploading.value = true
    uploadProgress.value = 0
    errorMsg.value = null

    uploadProfile({
        file: archivo.value,

        onProgress: (progress) => {
            uploadProgress.value = progress
        },

        onSuccess: async (data) => {
            clickModalFoto(false)
            const resultAlert = await confirm('Desea Subir su foto de perfil ?')
            nuevafoto.value = img800 + data

            if (resultAlert.isConfirmed) {
                const resultService = await updateUsuarioImagenUse(idUsuario.value, data)
                if (resultService.status == 200) {
                    await success('La Foto de Perfil fue guardado correctamente')
                    localStorage.setItem('imagen', data)
                    location.reload()
                }
                else {
                    await error('No se pudo guardar la Foto de Perfil')
                }
            }
            else {
                await error('Datos Cancelados')
            }

        },

        onError: async (err) => {
            errorMsg.value = 'Error al subir archivo'
            await error(errorMsg.value)

        }
    })
        .finally(() => {
            uploading.value = false
        })
}
const updateCelular = async () => {
    clickModalCelular(false)
    const resultAlert = await confirm('Desea Actualizar el numero de Celular ?')
    if (resultAlert.isConfirmed) {
        try {
            const resultService = await updateCelularUse(persona)
            if (resultService.status == 200) {
                await success('Numero de Celular Actualizado Correctamente')
                localStorage.setItem('persona', JSON.stringify(persona))
            }
            else {
                await error('No se pudo Actualizar el nuevo Numero de celular, intente nuevamente')
                persona.celular = celularAnt
            }
        } catch (err) {
            await error('Error al Actualizar los datos intente mas tarde '+err)
            persona.celular = celularAnt
        }
    }
    else {
        await error('Datos Cancelados')
        persona.celular = celularAnt
    }
}
const updatePass = async () => {
    clickModalPass(false)
    const resultAlert = await confirm('Desea Actualizar la Contrasena ?')
    if (resultAlert.isConfirmed) {
        pass.id = idUsuario.value
        try {
            const resultService = await updatePassUse(pass)
            if (resultService == true) {
                await success('Constrasena Actualizada Correctamente, Ingrese nuevamente con sus nuevas credenciales')
                logout()
            }
            else {
                await error('la contrasena actual no coincide con el enviado, verifique e intente nuevamente')
            }
        } catch (err) {
            await error('Datos Cancelados' + err)
        }
    }
    else {
        await error('Datos Cancelados')
    }
}

</script>