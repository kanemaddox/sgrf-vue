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
                        <label class="mb-0 fs-6 text-white">
                            Fecha de Actualizacion : {{ formato.fecha }}
                        </label>
                    </div>
                </CCardHeader>
                <CForm @submit.prevent="updateFormato">
                    <CCardBody>
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">Titulo del Formulario</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.titulo" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">Seccion I.</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.seccionUno" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">Seccion II.</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.seccionDos" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">II. Fecha</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.fecha" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">II. Monto</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.monto" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">II. Descripcion</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.descripcion" required />
                        </CInputGroup>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">Complemento.</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.cuidado" />
                            <CInputGroupText class="headercolor">
                                <CFormCheck type="checkbox" v-model="formato.value.estadoDos"
                                    aria-label="Checkbox for following text input" />
                            </CInputGroupText>
                        </CInputGroup>
                        <div v-if="formato.value.estadoDos">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">Detalle</CInputGroupText>
                                <CFormInput type="text" v-model="formato.value.detalleDos" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">Cantidad</CInputGroupText>
                                <CFormInput type="text" v-model="formato.value.cantidadDos" required />
                            </CInputGroup>
                        </div>

                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">Seccion III.</CInputGroupText>
                            <CFormInput type="text" v-model="formato.value.seccionTres" />
                            <CInputGroupText class="headercolor">
                                <CFormCheck type="checkbox" v-model="formato.value.estadoTres"
                                    aria-label="Checkbox for following text input" />
                            </CInputGroupText>
                        </CInputGroup>

                        <div v-if="formato.value.estadoTres">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">Detalle.</CInputGroupText>
                                <CFormTextarea v-model="formato.value.detalle" rows="10">
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
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">{{ formato.value.titulo }}</label><br>
                        <label class="small">Vista Previa</label>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CAlert color="secondary">I. {{ formato.value.seccionUno }}</CAlert>
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">Nombre Completo
                        </CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                        <CInputGroupText class="headercolor" as="label">IDP</CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                    </CInputGroup>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">Cargo</CInputGroupText>
                        <CFormInput type="text" value="" disabled />
                    </CInputGroup>

                    <CAlert color="secondary">II. {{ formato.value.seccionDos }}</CAlert>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">{{ formato.value.fecha }}
                        </CInputGroupText>
                        <CFormInput type="date" />
                        <CInputGroupText class="headercolor" as="label">{{ formato.value.monto }}
                        </CInputGroupText>
                        <CFormInput type="text" />
                        <CFormSelect>
                            <option>Moneda</option>
                            <option value="1">Dollar</option>
                            <option value="2">Pesos</option>
                            <option value="3">Euros</option>
                        </CFormSelect>
                    </CInputGroup>

                    <CFormTextarea :label="formato.value.descripcion" rows="1" disabled>
                    </CFormTextarea>

                    <hr>

                    <div v-if="formato.value.estadoDos">
                        <CAlert color="warning">{{ formato.value.cuidado }}</CAlert>
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">{{ formato.value.detalleDos }}
                            </CInputGroupText>
                            <CFormInput type="text" />

                            <CInputGroupText class="headercolor" as="label">{{ formato.value.cantidadDos }}
                            </CInputGroupText>
                            <CFormInput type="text" />
                        </CInputGroup>
                    </div>

                    <div v-if="formato.value.estadoTres">
                        <CAlert color="secondary">III. {{ formato.value.seccionTres }}</CAlert>
                        <CAlert> {{ formato.value.detalle }}
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

import { useAlert } from '@/composables/useAlert'
const { confirm, success, error } = useAlert();

import { useSettings } from '@/composables/useSettings'
const { updateSettingsUse, getSettingsUse } = useSettings()


const formato = reactive({
    id: null,
    categoria: '',
    nombre: '',
    value: {
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
    },
    fecha: ''
})

const getFormato = async () => {
    try {
        const formulario = await getSettingsUse(2)
        formato.id = formulario.id,
            formato.nombre = formulario.nombre,
            formato.categoria = formulario.categoria,
            formato.value.titulo = formulario.value.titulo,
            formato.value.seccionUno = formulario.value.seccionUno,
            formato.value.seccionDos = formulario.value.seccionDos,
            formato.value.fecha = formulario.value.fecha,
            formato.value.monto = formulario.value.monto,
            formato.value.descripcion = formulario.value.descripcion,
            formato.value.estadoDos = formulario.value.estadoDos,
            formato.value.cuidado = formulario.value.cuidado,
            formato.value.detalleDos = formulario.value.detalleDos,
            formato.value.cantidadDos = formulario.value.cantidadDos,
            formato.value.seccionTres = formulario.value.seccionTres,
            formato.value.detalle = formulario.value.detalle,
            formato.value.estadoTres = formulario.value.estadoTres,
            formato.fecha = formulario.fechaActualizacion
    } catch (errr) {
        console.log(errr)
    }
}

const updateFormato = async () => {
    const resultAlert = await confirm('Actualizar Formato.', 'Desea Actualizar el formato del formulario??', '')
    if (resultAlert.isConfirmed) {
        try {
            const resultService = await updateSettingsUse(formato)
            if (resultService.status === 200) {
                await success('', 'Formato Actualizado Corectamente')
                location.reload()
            }
        } catch (errr) {
            await error('Erro!!!', 'Error al Actualizar los datos intente nuevamente', errr)
        }
    }
    else {
        await error('Datos Cancelados', '', '')
    }
}

onMounted(() => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    getFormato()
})

const fecha = new Date()
</script>
