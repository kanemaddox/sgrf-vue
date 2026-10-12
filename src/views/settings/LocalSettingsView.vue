<template>
    <CRow>
        <CCol :xs="12" :sm="6" :md="6" :lg="6">
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-settings" size="lg" class="me-2" />Settings Organizacion
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CForm @submit.prevent="updateSettings">
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-house me-2"></i>
                                Nombre :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.nombre""
                                placeholder=" Nombre de la Organizacion" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-geo-alt me-2"></i>
                                Direccion :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.direccion"
                                placeholder="Direccion de la Organizacion" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-telephone me-2"></i>
                                Telefono :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.telefono"
                                placeholder="Telefono de la Organizacion" />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-whatsapp me-2"></i>
                                Movil :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.movil" placeholder="Movil de la Organizacion" />
                        </CInputGroup>
                        <hr>
                        <CButton type="submit" color="secondary" size="sm" variant="outline"">
                            <i class=" bi bi-check-lg me-2"></i> Guardar
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12" :sm="6" :md="6" :lg="6">
            <div class="d-md-none mb-3"></div>
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-settings" size="lg" class="me-2" />Settings Site
                    </h6>
                </CCardHeader>
                <CCardBody>
                    <CForm @submit.prevent="updateSettings">
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-person-vcard me-2"></i>
                                IDP :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.idp" placeholder="C.I. ,RUT, DNI, C.C. ,  .. "
                                required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-envelope-at me-2"></i>
                                Email :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.correo" placeholder="Email institucional "
                                required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-globe-americas me-2"></i>
                                Dominio :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.dominio" placeholder="Dominio del Sitio "
                                required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-translate me-2"></i>
                                Idioma :
                            </CInputGroupText>
                            <CFormSelect v-model="valores.idioma" required>
                                <option>Seleccionar</option>
                                <option value="Spanish">Spanish</option>
                                <option value="English">English</option>
                            </CFormSelect>
                        </CInputGroup>

                        <hr>
                        <CButton type="submit" color="secondary" size="sm" variant="outline">
                            <i class="bi bi-check-lg me-2"></i> Guardar
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>

        <CCol :xs="12" :sm="6" :md="6" :lg="6">
            <br>
            <CCard>
                <CCardHeader class="headercolor">
                    <h6>
                        <CIcon icon="cil-settings" size="lg" class="me-2" />Settings Image
                    </h6>
                </CCardHeader>
                <CCardBody>

                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script setup>
import { onMounted, ref ,onUnmounted} from 'vue';
import { useSettings } from '@/composables/useSettings'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

const { getSettingsLocalUse, config, updateSettingsUse } = useSettings()

const valores = ref({
    idp: '',
    correo: '',
    nombre: '',
    direccion: '',
    telefono: '',
    movil: '',
    direccion: '',
    dominio: '',
    idioma: 'Spanish'
})

/**Funciones */
const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({name: 'Home'})
}

const updateSettings = async () => {
    const setting = {
        id: config.id,
        nombre: config.nombre,
        categoria: config.categoria,
        value: valores.value
    }
    const result = await updateSettingsUse(setting)
    if (result) {
        location.reload()
    }
    else {
        valores.value = { ...config.value }
    }
}

const getLoadData = () => {
    valores.value = { ...config.value }
}

const getAction = () => {
    setActions([
        {
            visible: true,
            label: 'Salir',
            icon: 'cil-account-logout',
            color: 'secondary',
            variant: 'ghost',
            disabled: false,
            onClick: salir
        }
    ])
}
onMounted(async () => {
    dataLoading()
    try {
        await getSettingsLocalUse()
        getLoadData()
    } finally {
        close()
    }
    getAction()
})
onUnmounted(() => {
    clearActions()
})
</script>
