<template>
    <CRow>
        <!-- ========================================== -->
        <!-- SECCIÓN: Datos Personales / Perfil         -->
        <!-- ========================================== -->
        <CCol :xs="12" :sm="6" :md="5">
            <CCard class="mb-4 mb-sm-0 shadow-sm">
                <!-- Cabecera de la tarjeta -->
                <CCardHeader class="headercolor py-3">
                    <h6 class="mb-0 fw-bold">
                        <CIcon icon="cil-user" size="lg" class="me-2" />Perfil de Usuario
                    </h6>
                </CCardHeader>

                <!-- Cuerpo de la tarjeta -->
                <CCardBody>
                    <CCol :xs="12">
                        <CWidgetStatsC class="mb-2 border-0 bg-transparent" :value="persona.idp"
                            :progress="{ color: 'success', value: 100 }" title="ID de Persona">
                            <!-- Slot para la imagen de perfil y botón de actualización -->
                            <template #icon>
                                <div class="position-relative d-inline-block mb-3">
                                    <img :src="imagen"
                                        class="img-fluid rounded-circle shadow-sm border border-2 border-light"
                                        style="width: 120px; height: 120px; object-fit: cover;"
                                        alt="Avatar de perfil" />
                                </div>
                                <div>
                                    <CButton color="dark" variant="outline" @click="clickModalFoto(true)" size="sm"
                                        class="mt-1 px-3">
                                        <CIcon icon="cil-camera" class="me-1"></CIcon> Actualizar Foto
                                    </CButton>
                                </div>
                            </template>

                            <!-- Slot para el título del widget (Nombre de la cuenta) -->
                            <template #title>
                                <span class="fw-semibold text-dark fs-6">{{ perfilCuenta.nombre }}</span>
                            </template>
                        </CWidgetStatsC>
                    </CCol>
                </CCardBody>
            </CCard>
        </CCol>
        <!-- End Datos Personales -->

        <!-- ========================================== -->
        <!-- SECCIÓN: Datos de Usuario y Pestañas (Tabs)-->
        <!-- ========================================== -->
        <CCol :xs="12" :sm="6" :md="7">
            <div class="mt-3 mt-sm-0"></div>
            <CCard class="shadow-sm">
                <CCardHeader class="headercolor py-3">
                    <h6 class="mb-0 fw-bold">
                        <CIcon icon="cil-user" size="lg" class="me-2" />Datos del Perfil
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CTabs :activeItemKey="1">
                        <!-- Lista de Pestañas de Navegación -->
                        <CTabList variant="tabs" layout="justified">
                            <CTab class="d-flex align-items-center justify-content-center gap-2 px-3 py-2" :itemKey="1">
                                <CIcon icon="cil-user"></CIcon>
                                <span class="d-none d-md-inline">Datos</span>
                            </CTab>
                            <CTab class="d-flex align-items-center justify-content-center gap-2 px-3 py-2" :itemKey="2">
                                <CIcon icon="cil-clipboard"></CIcon>
                                <span class="d-none d-md-inline">Archivo</span>
                            </CTab>
                            <CTab class="d-flex align-items-center justify-content-center gap-2 px-3 py-2" :itemKey="3">
                                <CIcon icon="cil-pencil"></CIcon>
                                <span class="d-none d-md-inline">Actualizar</span>
                            </CTab>
                        </CTabList>

                        <!-- Contenido de las Pestañas -->
                        <CTabContent>
                            <!-- Panel 1: Componente de Datos -->
                            <CTabPanel class="p-3 pt-4" :itemKey="1">
                                <ComponenteDatos :persona="persona" :idpName="idpName" />
                            </CTabPanel>

                            <!-- Panel 2: Información Laboral y Archivos -->
                            <CTabPanel class="p-3 pt-4" :itemKey="2">
                                <!-- Profesión -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-pencil-square me-2"></i>Profesión :
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.profesion" disabled />
                                </CInputGroup>

                                <!-- Cargo -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-person-badge-fill me-2"></i>Cargo :
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.cargo" disabled />
                                </CInputGroup>

                                <!-- Email Corporativo -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">
                                        <i class="bi bi-envelope-check-fill me-2"></i>Email Corporativo :
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.corporativo" disabled />
                                </CInputGroup>

                                <!-- Widget con Centro de Costos y Jefatura -->
                                <CWidgetStatsB class="mb-3 border-0 bg-light p-3 rounded"
                                    :progress="{ color: 'success', value: 100 }">
                                    <template #value>{{ perfilCuenta.centroCostos }}</template>
                                    <template #title>{{ perfilCuenta.subCentroCostos }} | {{ perfilCuenta.codigo
                                        }}</template>
                                    <template #text>
                                        {{ perfilCuenta.idpJefe }} | {{ perfilCuenta.jefe }}
                                    </template>
                                </CWidgetStatsB>
                            </CTabPanel>

                            <!-- Panel 3: Opciones de Actualización de Datos y Accesos -->
                            <CTabPanel class="p-3 pt-4" :itemKey="3">
                                <!-- ID de Usuario -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">ID Usuario :</CInputGroupText>
                                    <CFormInput type="text" :value="idUsuario" disabled />
                                </CInputGroup>

                                <!-- Identificador Personal Dinámico (ej. CI, DNI) -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-person-vcard me-2"></i>{{ idpName }} :
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.idp" disabled />
                                </CInputGroup>

                                <!-- Email Personal -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-envelope-at me-2"></i>Email :
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.email" disabled />
                                </CInputGroup>

                                <!-- Número de Celular con Botón de Actualización -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-phone me-2"></i>Celular :
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="perfilCuenta.celular" disabled />
                                    <CButton type="button" color="success" class="px-4 text-white" size="sm"
                                        @click="clickModalCelular(true)">
                                        <i class="bi bi-arrow-clockwise me-2"></i>
                                        <span class="d-none d-md-inline">Actualizar</span>
                                    </CButton>
                                </CInputGroup>

                                <!-- Contraseña con Botón de Actualización -->
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText as="label" class="headercolor">
                                        <i class="bi bi-key me-2"></i>Password :
                                    </CInputGroupText>
                                    <CFormInput type="text" value="***************" disabled />
                                    <CButton type="button" color="success" class="px-4 text-white" size="sm"
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
        <!-- End Datos De Usuario -->
    </CRow>

    <!-- ========================================== -->
    <!-- MODAL: Actualizar Número de Celular        -->
    <!-- ========================================== -->
    <CModal :visible="modalCelular" backdrop="static" @close="clickModalCelular(false)" alignment="center">
        <CForm @submit.prevent="updateCelular">
            <CModalHeader class="headercolor py-3" dismiss @close="clickModalCelular(false)">
                <CModalTitle class="d-flex align-items-center">
                    <CIcon icon="cil-phone" size="lg" class="me-2" />
                    <span class="fw-bold fs-6">Actualizar Número de Celular</span>
                </CModalTitle>
            </CModalHeader>

            <CModalBody class="p-4">
                <!-- Información previa del usuario -->
                <div class="mb-3">
                    <ComponenteNombres :datos="datos" />
                </div>

                <hr class="text-muted my-3" />

                <!-- Input para el nuevo número con diseño mejorado -->
                <div class="mb-2">
                    <label for="nuevoCelular" class="form-label small fw-semibold text-secondary mb-1">
                        Nuevo Número de Celular
                    </label>
                    <CInputGroup class="mb-1">
                        <CInputGroupText class="headercolor">
                            <i class="bi bi-phone-fill fs-5"></i>
                        </CInputGroupText>
                        <CFormInput id="nuevoCelular" type="text" v-model="persona.celular"
                            placeholder="Ingrese el número..." required />
                    </CInputGroup>
                    <div class="form-text text-muted small">
                        Se enviará una notificación o código de validación a este número de contacto.
                    </div>
                </div>
            </CModalBody>

            <CModalFooter class="bg-light py-2">
                <CButton @click="clickModalCelular(false)" color="danger" class="text-white px-3" size="sm">
                    <CIcon icon="cil-x" class="me-1" />Cancelar
                </CButton>
                <CButton type="submit" color="success" class="px-4 text-white" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Guardar Cambios</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal Actualizar Celular -->

    <!-- ========================================== -->
    <!-- MODAL: Actualizar Contraseña               -->
    <!-- ========================================== -->
    <CModal backdrop="static" :visible="modalPass" @close="clickModalPass(false)" alignment="center">
        <CForm @submit.prevent="updatePass">
            <CModalHeader class="headercolor py-3" dismiss @close="clickModalPass(false)">
                <CModalTitle class="d-flex align-items-center">
                    <CIcon icon="cil-lock-locked" size="lg" class="me-2 text-warning" />
                    <span class="fw-bold fs-6">Actualizar Contraseña</span>
                </CModalTitle>
            </CModalHeader>

            <CModalBody class="p-4">
                <!-- Información previa del usuario -->
                <div class="mb-3">
                    <ComponenteNombres :datos="datos" />
                </div>

                <hr class="text-muted my-3" />

                <!-- Contraseña Actual -->
                <div class="mb-3">
                    <label class="form-label small fw-semibold text-secondary mb-1">Contraseña Actual</label>
                    <CInputGroup size="sm">
                        <CInputGroupText class="headercolor">
                            <i class="bi bi-key-fill"></i>
                        </CInputGroupText>
                        <CFormInput type="password" v-model="pass.pass1" placeholder="Ingrese su contraseña actual" required />
                    </CInputGroup>
                </div>

                <!-- Nueva Contraseña -->
                <div class="mb-3">
                    <label class="form-label small fw-semibold text-secondary mb-1">Nueva Contraseña</label>
                    <CInputGroup size="sm">
                        <CInputGroupText class="headercolor">
                            <i class="bi bi-shield-lock-fill"></i>
                        </CInputGroupText>
                        <CFormInput type="password" v-model="pass.pass2" placeholder="Ingrese su nueva contraseña" required />
                    </CInputGroup>
                </div>

                <!-- Confirmación de Nueva Contraseña -->
                <div class="mb-3">
                    <label class="form-label small fw-semibold text-secondary mb-1">Confirmar Nueva Contraseña</label>
                    <CInputGroup size="sm">
                        <CInputGroupText class="headercolor">
                            <i class="bi bi-shield-check"></i>
                        </CInputGroupText>
                        <CFormInput type="password" v-model="pass.pass3" placeholder="Repita la nueva contraseña" required />
                    </CInputGroup>
                </div>

                <!-- Alerta visual corregida si las contraseñas no coinciden -->
                <CAlert color="warning" class="d-flex align-items-center py-2 px-3 mt-3 mb-0"
                    v-if="pass.pass2 != pass.pass3">
                    <div class="d-flex align-items-center w-100">
                        <CIcon icon="cil-warning" size="xl" class="me-3 text-warning flex-shrink-0" />
                        <div>
                            <span class="fw-bold d-block small">Atención</span>
                            <small class="mb-0">La nueva contraseña no coincide con su confirmación.</small>
                        </div>
                    </div>
                </CAlert>
            </CModalBody>

            <CModalFooter class="bg-light py-2">
                <CButton @click="clickModalPass(false)" color="danger"  class="text-white px-3"
                    size="sm">
                    <CIcon icon="cil-x" class="me-1" />Cancelar
                </CButton>
                <CButton v-if="botones" type="submit" color="success" class="px-4 text-white" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Actualizar Contraseña</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal Actualizar Contraseña -->

    <!-- ========================================== -->
    <!-- MODAL: Actualizar Foto de Perfil           -->
    <!-- ========================================== -->
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
                <!-- Input de selección de archivo -->
                <CInputGroup class="mb-3">
                    <CInputGroupText as="label" class="headercolor" for="filedoc">Foto de Perfil : </CInputGroupText>
                    <CFormInput type="file" ref="fileInput" id="filedoc" accept="image/png,image/jpeg"
                        @change="selectFile" :valid="fileValid" :disabled="uploading" required />
                    <CInputGroupText v-if="fileValid">
                        <CIcon icon="cil-check-alt" class="text-success" />
                    </CInputGroupText>
                </CInputGroup>

                <!-- Vista previa de la nueva imagen (Con restricciones de tamaño para mejor estética) -->
                <div class="mb-3 text-center" v-if="nuevafoto">
                    <div class="p-2 border rounded bg-light d-inline-block">
                        <img :src="nuevafoto" class="img-fluid rounded shadow-sm"
                            style="max-height: 160px; object-fit: cover;" alt="Vista previa" />
                    </div>
                </div>

                <!-- Barra de progreso de subida -->
                <CProgress v-if="uploading" :height="25" class="mb-3">
                    <CProgressBar :value="uploadProgress" :color="uploadProgress === 100 ? 'success' : 'warning'"
                        animated>
                        {{ uploadProgress < 100 ? `Subiendo... ${uploadProgress}%` : 'Procesando imagen...' }}
                            </CProgressBar>
                </CProgress>

                <!-- Mensaje de error general -->
                <div v-if="errorMsg" class="alert alert-danger text-center py-2 mb-0">
                    <small>{{ errorMsg }}</small>
                </div>
            </CModalBody>

            <CModalFooter>
                <CButton @click="clickModalFoto(false)" color="danger" class="px-4 text-white" size="sm"
                    :disabled="uploading">
                    <CIcon icon="cil-x" class="me-2" />
                    Cancelar
                </CButton>

                <CButton type="submit" class="px-4 text-white" color="success" size="sm"
                    :disabled="!fileValid || uploading">
                    <CIcon icon="cil-camera" class="me-2" />
                    <span v-if="uploading">Subiendo...</span>
                    <span v-else>Actualizar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal Actualizar Foto -->
</template>

<script setup>
/**
 * ============================================================================
 * IMPORTACIONES DE LIBRERÍAS Y COMPOSABLES
 * ============================================================================
 */
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, computed, onMounted } from 'vue'

import { useAlert } from '@/composables/useAlert'
const { error, dataLoading, close, updateLoading } = useAlert()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import { uploadProfile } from '@/services/uploadService'

// Importación de Componentes Hijos
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


/**
 * ============================================================================
 * DECLARACIÓN DE VARIABLES REACTIVAS Y ESTADOS
 * ============================================================================
 */
const archivo = ref(null)
const uploadProgress = ref(0)
const uploading = ref(false)
const errorMsg = ref(null)
const fileValid = ref(false)

const idUsuario = ref(auth.idUsuario)

// Lógica para definir las URLs de las imágenes según resolución
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

// Objeto de datos personales para pasar a los componentes de nombres
const datos = {
    idp: persona.value.idp,
    nombre: persona.value.nombre,
    apellidos: persona.value.paterno + " " + persona.value.materno,
    idpName: idpName.value
}

// Objeto reactivo para la gestión de cambio de contraseña
const pass = reactive({
    id: '',
    pass1: '',
    pass2: '',
    pass3: ''
})

// Estados de visibilidad para los Modales
const modalCelular = ref(false)
const modalPass = ref(false)
const modalFoto = ref(false)


/**
 * ============================================================================
 * FUNCIONES Y MÉTODOS DE CONTROL
 * ============================================================================
 */

/** Controla la apertura/cierre del modal de celular */
const clickModalCelular = (value) => {
    modalCelular.value = value
}

/** Controla la apertura/cierre del modal de contraseña */
const clickModalPass = (value) => {
    modalPass.value = value
}

/** Controla la apertura/cierre del modal de foto */
const clickModalFoto = (value) => {
    modalFoto.value = value
    if (!value) {
        // Limpiamos estados al cerrar para evitar residuos visuales
        archivo.value = null
        fileValid.value = false
        errorMsg.value = null
        nuevafoto.value = nombre800 // Regresa a la foto original
    }
}

/** Propiedad computada para validar que las contraseñas sean correctas antes de enviar */
const botones = computed(() => {
    return (
        pass.pass1 !== '' &&
        pass.pass2 !== '' &&
        pass.pass2 === pass.pass3
    )
})

/** Captura el archivo de imagen seleccionado para la foto de perfil */
const selectFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    archivo.value = file
    fileValid.value = true
    nuevafoto.value = URL.createObjectURL(file)
}

/** Proceso asíncrono para subir la foto de perfil al servidor */
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

/** Proceso asíncrono para actualizar el número de celular */
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

/** Proceso asíncrono para actualizar la contraseña del usuario */
const updatePass = async () => {
    clickModalPass(false)
    pass.id = idUsuario.value
    const resultService = await updatePassUse(pass)
    if (resultService) {
        logout()
    }
}

/**
 * ============================================================================
 * HOOKS DEL CICLO DE VIDA (Lifecycle Hooks)
 * ============================================================================
 */
onMounted(async () => {
    dataLoading()
    try {
        await getPerfilUse(persona.value.id)
    } finally {
        close()
    }
})
</script>