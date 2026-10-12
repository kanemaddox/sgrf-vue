<template>
    <CRow>
        <CCol :xs="12" :sm="12" :md="5" :lg="5">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">
                            FORMULARIO DE SOLICITUD
                        </label>
                    </div>
                </CCardHeader>
                <CForm @submit.prevent="updateFormato">
                    <CCardBody>
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-boxes me-2"></i>Maximo de Solicitudes :
                            </CInputGroupText>
                            <CFormSelect v-model="formato.cantidadSolicitudes" required>
                                <option value="">Seleccionar</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </CFormSelect>
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Titulo :
                            </CInputGroupText>
                            <CFormInput type="text" v-model="formato.titulo" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Seccion I.
                            </CInputGroupText>
                            <CFormInput type="text" v-model="formato.seccionUno" required />
                        </CInputGroup>

                        <CAlert color="secondary">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-tags me-2"></i>Seccion II.
                                </CInputGroupText>
                                <CFormInput type="text" v-model="formato.seccionDos" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-calendar-date me-2"></i>Fecha :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="formato.fechaTitulo" required />
                            </CInputGroup>
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-currency-dollar me-2"></i>Monto :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="formato.montoTitulo" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-tags me-2"></i>Descripcion :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="formato.descripcion" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-tags me-2"></i>Complemento :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="formato.complemento" />
                                <CInputGroupText class="headercolor">
                                    <CFormCheck type="checkbox" v-model="formato.estadoComplemento"
                                        aria-label="Checkbox for following text input" />
                                </CInputGroupText>
                            </CInputGroup>
                            <div v-if="formato.estadoComplemento">
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">
                                        <i class="bi bi-card-text me-2"></i>Detalle :
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="formato.detalleComplemento" required />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">
                                        <i class="bi bi-archive me-2"></i>Cantidad :
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="formato.cantidadComplemento" required />
                                </CInputGroup>
                            </div>
                        </CAlert>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Seccion III.
                            </CInputGroupText>
                            <CFormInput type="text" v-model="formato.seccionTres" />
                            <CInputGroupText class="headercolor">
                                <CFormCheck type="checkbox" v-model="formato.estadoTres"
                                    aria-label="Checkbox for following text input" />
                            </CInputGroupText>
                        </CInputGroup>

                        <div v-if="formato.estadoTres">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">Detalle.</CInputGroupText>
                                <CFormTextarea v-model="formato.detalle" rows="10">
                                </CFormTextarea>
                            </CInputGroup>
                        </div>
                    </CCardBody>
                    <CCardFooter class="text-center">
                        <CRow>
                            <CCol :xs="6" :sm="6" class="d-grid gap-2">
                                <CButton color="danger" size="sm" class="font">
                                    <CIcon icon="cil-x" class="me-2" />
                                    Cancelar
                                </CButton>

                            </CCol>
                            <CCol :xs="6" :sm="6" class="d-grid gap-2">
                                <CButton type="submit" class="font" color="success" size="sm">
                                    <CIcon icon="cil-description" class="me-2" />
                                    Aceptar
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CForm>
            </CCard>
        </CCol>
        <CCol :xs="12" :sm="12" :md="7" :lg="7">
            <br>
            <CAlert color="secondary">
                <h2>Maximo de Solicitudes {{ formato.cantidadSolicitudes }} </h2>
                <label class="small text-body-secondary"> Vista Previa |
                    {{ formatoSRF.fecha }}
                </label>
            </CAlert>
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">{{ formato.titulo }}</label><br>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CAlert color="secondary">I. {{ formato.seccionUno }}</CAlert>
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">Nombre Completo :
                        </CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                        <CInputGroupText class="headercolor" as="label">{{ idpName }} : </CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                    </CInputGroup>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">Cargo : </CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                    </CInputGroup>

                    <CAlert color="secondary">II. {{ formato.seccionDos }}</CAlert>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">
                            <i class="bi bi-calendar-date me-2"></i>{{ formato.fechaTitulo }} :
                        </CInputGroupText>
                        <CFormInput type="date" />
                        <CInputGroupText class="headercolor" as="label">
                            <i class="bi bi-currency-dollar me-2"></i>{{ formato.montoTitulo }} :
                        </CInputGroupText>
                        <CFormInput type="text" />
                        <CFormSelect>
                            <option>Moneda</option>
                            <option value="1">Dollar</option>
                            <option value="2">Pesos</option>
                            <option value="3">Euros</option>
                        </CFormSelect>
                    </CInputGroup>

                    <CFormTextarea :label="formato.descripcion" rows="1" disabled>
                    </CFormTextarea>

                    <hr>

                    <div v-if="formato.estadoComplemento">
                        <CAlert color="warning">{{ formato.complemento }}</CAlert>
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-card-text me-2"></i>{{ formato.detalleComplemento }} :
                            </CInputGroupText>
                            <CFormInput type="text" />

                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-archive me-2"></i>{{ formato.cantidadComplemento }} :
                            </CInputGroupText>
                            <CFormInput type="text" />
                        </CInputGroup>
                    </div>

                    <div v-if="formato.estadoTres">
                        <CAlert color="secondary">III. {{ formato.seccionTres }}</CAlert>
                        <CAlert> {{ formato.detalle }}
                        </CAlert>
                    </div>

                </CCardBody>
                <CCardFooter class="text-center">
                    <CRow>
                        <CCol :xs="2" :sm="6"></CCol>
                        <CCol :xs="5" :sm="3" class="d-grid gap-2">
                            <CButton color="danger" size="sm" class="font" disabled>
                                <CIcon icon="cil-x" class="me-2" />
                                Cancelar
                            </CButton>

                        </CCol>
                        <CCol :xs="5" :sm="3" class="d-grid gap-2">
                            <CButton type="submit" class="font" color="success" size="sm" disabled>
                                <CIcon icon="cil-description" class="me-2" />
                                Crear
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard>

        </CCol>
    </CRow>

</template>
<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'

import { ref, onMounted,onUnmounted } from 'vue'

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useSettings } from '@/composables/useSettings'
const { updateSettingsUse, getFormatoSrfUse, formatoSRF } = useSettings()
import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const idpName = ref(auth.idpName)

/**Funciones */
const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({name: 'Home'})
}

const formato = ref({
    cantidadSolicitudes: '0',
    titulo: '',
    seccionUno: '',
    seccionDos: '',
    fechaTitulo: '',
    montoTitulo: '',
    descripcion: '',
    complemento: '',
    estadoComplemento: false,
    detalleComplemento: '',
    cantidadComplemento: '',
    seccionTres: '',
    detalle: '',
    estadoTres: false,
    nivel: 0,
    total: 0
})

const updateFormato = async () => {
    formato.value.nivel = 0
    formato.value.total = 0
    const formulario = {
        id: formatoSRF.id,
        nombre: formatoSRF.nombre,
        categoria: formatoSRF.categoria,
        value: formato.value
    }
    const resultService = await updateSettingsUse(formulario)
    if (resultService) {
        location.reload()
    }
    else {
        formato.value = { ...formatoSRF.formato }
    }
}

const getLoadData = () => {
    formato.value = { ...formatoSRF.formato }
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
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove())
    dataLoading()
    try {
        await getFormatoSrfUse()
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
