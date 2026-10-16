<template>
    <CRow>
        <!--Datos Personales -->
        <CCol :xs="12" :sm="6" :md="5">
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-user" size="lg" class="me-2" />Perfil
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CCol :xs="12">
                        <CWidgetStatsC class="mb-3" :value="persona.idp" :progress="{ color: 'success', value: 100 }"
                            title="Visitors">
                            <template #icon>
                                <img :src="imagen" class="img-fluid " alt="..."><br>
                                <CButton color="dark" @click="clickModalFoto(true)" size="sm" class="mt-2">
                                    <CIcon icon="cil-camera" class="me-1"></CIcon> Actualizar Foto
                                </CButton>
                            </template>

                            <template #title>
                                {{ perfilCuenta.nombre }}
                            </template>
                        </CWidgetStatsC>

                    </CCol>

                </CCardBody>
            </CCard>
        </CCol>
        <!--End Datos Personales -->

        <!--Datos De Usuario -->
        <CCol :xs="12" :sm="6" :md="7">
            <br>
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-user" size="lg" class="me-2" />Datos del Perfil
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CTabs :activeItemKey="1">
                        <CTabList variant="tabs" layout="justified">
                            <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="1">
                                <CIcon icon="cil-user"></CIcon>
                                <span class="d-none d-md-inline">Datos</span>
                            </CTab>
                            <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="2">
                                <CIcon icon="cil-clipboard"></CIcon>
                                <span class="d-none d-md-inline">Archivo</span>
                            </CTab>
                            <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="3">
                                <CIcon icon="cil-pencil"></CIcon>
                                <span class="d-none d-md-inline">Actualizar</span>
                            </CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel class="p-3" :itemKey="1">
                                <br>
                                <ComponenteDatos :persona="persona" :idpName="idpName" />
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="2">
                                <br>
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-pencil-square me-2"></i>Profesion : 
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.profesion" disabled />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-person-badge-fill me-2"></i>Cargo : 
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.cargo" disabled />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">
                                        <i class="bi bi-envelope-check-fill me-2"></i>Email Corporativo :
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.corporativo" disabled />
                                </CInputGroup>

                                <CWidgetStatsB class="mb-3" :progress="{ color: 'success', value: 100 }">
                                    <template #value>{{ perfilCuenta.centroCostos }}</template>
                                    <template #title>{{ perfilCuenta.subCentroCostos }} | {{ perfilCuenta.codigo
                                    }}</template>
                                    <template #text>
                                        {{ perfilCuenta.idpJefe }} | {{ perfilCuenta.jefe }}
                                    </template>
                                </CWidgetStatsB>
                            </CTabPanel>

                            <CTabPanel class="p-3" :itemKey="3">
                                <br>
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">ID Usuario :</CInputGroupText>
                                    <CFormInput type="text" :value="idUsuario" disabled />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-person-vcard me-2"></i>{{ idpName }} : 
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.idp" disabled />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-envelope-at me-2"></i>Email : 
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.email" disabled />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-phone me-2"></i>Celular : 
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.celular" disabled />
                                    <CButton type="button" color="success" class="font" size="sm"
                                        @click="clickModalCelular(true)">
                                        <i class="bi bi-arrow-clockwise me-2"></i>
                                        <span class="d-none d-md-inline">Actualizar</span>
                                    </CButton>
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-key me-2"></i>Password : 
                                    </CInputGroupText>
                                    <CFormInput type="text" value="***************" disabled />
                                    <CButton type="button" color="success" class="font" size="sm"
                                        @click="clickModalPass(true)">
                                        <i class="bi bi-arrow-clockwise me-2"></i>
                                        <span class="d-none d-md-inline">Actualizar Contraseña</span>
                                    </CButton>
                                </CInputGroup>
                            </CTabPanel>
                        </CTabContent>
                    </CTabs>
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
                        <CIcon icon="cil-pencil" size="lg" class="me-2" />Actualizar Numero de Celular
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="datos" />
                <br>
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor">
                        <i class="bi bi-phone me-2"></i>Nuevo Numero de Celular : 
                    </CInputGroupText>
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
                        <CIcon icon="cil-pencil" size="lg" class="me-2" />Actualizar Contraseña
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <ComponenteNombres :datos="datos" />
                <br>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor">
                        <i class="bi bi-key me-2"></i>Contraseña Actual : 
                    </CInputGroupText>
                    <CFormInput type="password" v-model="pass.pass1" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor">
                        <i class="bi bi-key me-2"></i>Nueva Contraseña : 
                    </CInputGroupText>
                    <CFormInput type="password" v-model="pass.pass2" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor">
                        <i class="bi bi-key me-2"></i>Confirmar Nueva Contraseña : 
                    </CInputGroupText>
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
                    <CInputGroupText as="label" class="headercolor" for="filedoc">Foto de Perfil : </CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png,image/jpeg"
                        @change="selectFile" :valid="fileValid" :disabled="uploading" required />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check-alt" class="text-success" />
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
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, computed, onMounted } from 'vue'

import { useAlert } from '@/composables/useAlert'
const { error, dataLoading, close ,updateLoading} = useAlert()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import { uploadProfile } from '@/services/uploadService'

/**Importaciones de Componentes */
import ComponenteNombres from '@/components/usuario/ComponenteNombres.vue'
import ComponenteDatos from '@/components/usuario/ComponenteDatos.vue'

import { useAuth } from '@/composables/useAuth'
const { logout } = useAuth()

import { useUsuario } from '@/composables/useUsuario'
const { perfilCuenta, updateUsuarioImagenUse, updatePassUse, getPerfilUse } = useUsuario()

import { usePersona } from '@/composables/usePersona'
const { updateCelularUse } = usePersona()

import { API_URL_IMG100, API_URL_IMG200, API_URL_IMG800 } from "@/env"
const img200 = API_URL_IMG200
const img800 = API_URL_IMG800
const img100 = API_URL_IMG100

/** Declaraciones de VAriables reactibas */

const archivo = ref(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const errorMsg = ref(null)
const fileValid = ref(false)

const nombre = ref(auth.nombre)
const idUsuario = ref(auth.idUsuario)

var nombre100 = "/usuario.png"
var nombre200 = nombre100
var nombre800 = nombre200
if (auth.imagen != "usuario.png") {
    nombre100 = img100 + auth.imagen
    nombre200 = img200 + auth.imagen
    nombre800 = img800 + auth.imagen
}
const imagen = ref(nombre200)
const nuevafoto = ref(nombre800)

const persona = ref(auth.persona)
const celularAnt = persona.value.celular
const idpName = ref(auth.idpName)

/**Declaracion de objetos */
const datos = {
    idp: persona.value.idp,
    nombre: persona.value.nombre,
    apellidos: persona.value.paterno + " " + persona.value.materno,
    idpName: idpName.value
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

const uploadFile = async () => {
    if (!archivo.value) return

    uploading.value = true
    uploadProgress.value = 0
    errorMsg.value = null

    dataLoading('Subiendo imagen', 'Preparando archivo...')
    try {
        await uploadProfile({
            file: archivo.value,

            onProgress: (progress) => {
                uploadProgress.value = progress
                updateLoading(`Subiendo imagen: ${progress}%`)
            },

            onSuccess: async (data) => {
                try {
                    updateLoading('Actualizando perfil...')
                    clickModalFoto(false)
                    nuevafoto.value = img800 + data
                    const resultService = await updateUsuarioImagenUse(idUsuario.value, data)
                    if (resultService) {
                        localStorage.setItem('imagen', data)
                        location.reload()
                    }
                    else {
                        close()
                    }
                } catch (err) {
                    close()
                    errorMsg.value = 'Error al actualizar la imagen: ' + err
                    await error(errorMsg.value)
                }
            },

            onError: async (errr) => {
                errorMsg.value = 'Error al subir archivo' + errr
                await error(errorMsg.value)
            }
        })
    } catch (err) {
        close()
        errorMsg.value = 'Error al subir archivo: ' + err
        await error(errorMsg.value)
    } finally {
        uploading.value = false
    }
}

const updateCelular = async () => {
    clickModalCelular(false)
    const resultService = await updateCelularUse(persona.value)
    if (resultService) {
        localStorage.setItem('persona', JSON.stringify(persona.value))
        location.reload()
    }
    else {
        persona.value.celular = celularAnt
    }
}
const updatePass = async () => {
    clickModalPass(false)
    pass.id = idUsuario.value
    const resultService = await updatePassUse(pass)
    if (resultService) {
        logout()
    }
}

onMounted(async () => {
    dataLoading()
    try {
        await getPerfilUse(persona.value.id)
    } finally {
        close()
    }

})

</script>