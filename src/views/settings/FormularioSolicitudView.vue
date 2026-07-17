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
                            <CFormSelect  v-model="valores.cantidad" required>
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
                            <CFormInput type="text" v-model="valores.titulo" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Seccion I.
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.seccionUno" required />
                        </CInputGroup>

                        <CAlert color="secondary">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-tags me-2"></i>Seccion II.
                                </CInputGroupText>
                                <CFormInput type="text" v-model="valores.seccionDos" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-calendar-date me-2"></i>Fecha :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="valores.fecha" required />
                            </CInputGroup>
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-currency-dollar me-2"></i>Monto :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="valores.monto" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-tags me-2"></i>Descripcion :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="valores.descripcion" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-tags me-2"></i>Complemento :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="valores.cuidado" />
                                <CInputGroupText class="headercolor">
                                    <CFormCheck type="checkbox" v-model="valores.estadoDos"
                                        aria-label="Checkbox for following text input" />
                                </CInputGroupText>
                            </CInputGroup>
                            <div v-if="valores.estadoDos">
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">
                                        <i class="bi bi-card-text me-2"></i>Detalle :
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="valores.detalleDos" required />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">
                                        <i class="bi bi-archive me-2"></i>Cantidad :
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="valores.cantidadDos" required />
                                </CInputGroup>
                            </div>
                        </CAlert>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-tags me-2"></i>Seccion III.
                            </CInputGroupText>
                            <CFormInput type="text" v-model="valores.seccionTres" />
                            <CInputGroupText class="headercolor">
                                <CFormCheck type="checkbox" v-model="valores.estadoTres"
                                    aria-label="Checkbox for following text input" />
                            </CInputGroupText>
                        </CInputGroup>

                        <div v-if="valores.estadoTres">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">Detalle.</CInputGroupText>
                                <CFormTextarea v-model="valores.detalle" rows="10">
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
                <h2>Maximo de Solicitudes {{ valores.cantidad }} </h2>
                <label class="small text-body-secondary"> Vista Previa | 
                    {{ formatoSRF.fecha }}
                </label>
            </CAlert>
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">{{ valores.titulo }}</label><br>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CAlert color="secondary">I. {{ valores.seccionUno }}</CAlert>
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

                    <CAlert color="secondary">II. {{ valores.seccionDos }}</CAlert>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">
                            <i class="bi bi-calendar-date me-2"></i>{{ valores.fecha }} :
                        </CInputGroupText>
                        <CFormInput type="date" />
                        <CInputGroupText class="headercolor" as="label">
                            <i class="bi bi-currency-dollar me-2"></i>{{ valores.monto }} :
                        </CInputGroupText>
                        <CFormInput type="text" />
                        <CFormSelect>
                            <option>Moneda</option>
                            <option value="1">Dollar</option>
                            <option value="2">Pesos</option>
                            <option value="3">Euros</option>
                        </CFormSelect>
                    </CInputGroup>

                    <CFormTextarea :label="valores.descripcion" rows="1" disabled>
                    </CFormTextarea>

                    <hr>

                    <div v-if="valores.estadoDos">
                        <CAlert color="warning">{{ valores.cuidado }}</CAlert>
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-card-text me-2"></i>{{ valores.detalleDos }} :
                            </CInputGroupText>
                            <CFormInput type="text" />

                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-archive me-2"></i>{{ valores.cantidadDos }} :
                            </CInputGroupText>
                            <CFormInput type="text" />
                        </CInputGroup>
                    </div>

                    <div v-if="valores.estadoTres">
                        <CAlert color="secondary">III. {{ valores.seccionTres }}</CAlert>
                        <CAlert> {{ valores.detalle }}
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
import { CCardBody, CForm } from '@coreui/vue';
import { reactive, ref, onMounted } from 'vue'

import { useSettings } from '@/composables/useSettings'
const { updateSettingsUse, getSettingsUse, getFormatoSrfUse, formatoSRF } = useSettings()

import 'bootstrap-icons/font/bootstrap-icons.css'

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const idpName = ref(auth.idpName)

const valores = ref({
    cantidad:0,
    titulo: "",
    seccionUno: "",
    seccionDos: "",
    fecha: "",
    monto: "",
    descripcion: "",
    estadoDos: false,
    cuidado: "",
    detalleDos: "",
    cantidadDos: "",
    seccionTres: "",
    detalle: "",
    estadoTres: false
})

const updateFormato = async () => {
    const formato = {
        id: formatoSRF.id,
        nombre: formatoSRF.nombre,
        categoria: formatoSRF.categoria,
        value: valores.value
    }
    const resultService = await updateSettingsUse(formato)
    if (resultService) {
        location.reload()
    }
    else {
        valores.value = { ...formatoSRF.value }
    }
}

const getLoadData = () => {
    valores.value = { ...formatoSRF.value }
}
onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    await getFormatoSrfUse()
    getLoadData()
})

</script>
