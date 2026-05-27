<template>
    <CRow>
        <CCol :xs="4" class="align-self-start">
            <CTable align="middle" class="mb-0 border" hover responsive>
                <CTableHead class="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell class="bg-body-secondary text-center">
                            <CIcon name="cil-people" />
                        </CTableHeaderCell>
                        <CTableHeaderCell class="bg-body-secondary"> Autorizadores </CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="item in srf.lista" :key="item.name">
                        <CTableDataCell class="text-center">
                            <CAvatar size="md" :src="getFoto(item.jefe.foto)" :status="getColor(item.estado)" />
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{{ item.jefe.nombre }}</div>
                            <div class="small text-body-secondary text-nowrap">
                                <span>{{ item.jefe.idp }}</span> |
                                <CChip clickable @click="getObs(item.id)" :color="getColor(item.estado)" size="sm">
                                    <span class="chip-icon">
                                        <i :class="getIcono(item.estado)"></i>
                                    </span>{{ item.estado }}
                                </CChip>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol :xs="12" :sm="6" class="d-grid gap-2">
                            <CButton v-if="srf.estado === 'PENDIENTE'" :disabled="!srf.editar" @click="clickModalSrf(true)" color="warning" size="sm">
                                <CIcon icon="cil-pencil" class="me-2" />
                                Editar
                            </CButton>
                        </CCol>
                        <CCol :xs="12" :sm="6" class="d-grid gap-2">
                            <CButton :disabled="srf.pdf" type="submit" class="font" color="success" size="sm">
                                <CIcon icon="cil-data-transfer-down" class="me-2" />
                                PDF
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="8" class="align-self-center">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                        <CChip :color="getColor(srf.estado)">
                            <span class="chip-icon">
                                <i :class="getIcono(srf.estado)"></i>
                            </span>{{ srf.estado }}
                        </CChip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol :xs="8">
                            <h5><strong>{{ formato?.value.titulo }}</strong></h5>
                        </CCol>
                        <CCol :xs="4" class="text-end">
                            <h3><strong>No.: {{ srf.numero }}</strong> </h3>
                            <div class="space">{{ persona.idp }} | {{ srf.gestion }}</div>
                        </CCol>
                    </CRow>
                    <CAlert color="success">Fecha de solicitud: {{ srf.fechaInicio }}</CAlert>
                    <CAccordion>
                        <CAccordionItem :item-key="1">
                            <CAccordionHeader :style="vars">
                                I. {{ formato?.value.seccionUno }}
                            </CAccordionHeader>
                            <CAccordionBody>
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Nombre Completo
                                    </CInputGroupText>
                                    <CFormInput type="text"
                                        :value="`${persona.nombre} ${persona?.paterno} ${persona?.materno}`" disabled />
                                    <CInputGroupText class="headercolor" as="label">IDP</CInputGroupText>
                                    <CFormInput type="text" :value="persona.idp" disabled />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Cargo</CInputGroupText>
                                    <CFormInput type="text" :value="srf.cargo" disabled />
                                </CInputGroup>

                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">Centro de Costos
                                    </CInputGroupText>
                                    <CFormInput type="text" :value="srf.costo" disabled />
                                    <CInputGroupText class="headercolor" as="label">CC</CInputGroupText>
                                    <CFormInput type="text" :value="srf.codigo" disabled />
                                </CInputGroup>
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                    <br>
                    <CAlert color="secondary">II. {{ formato?.value.seccionDos }}</CAlert>

                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">{{ formato.value.fecha }}
                        </CInputGroupText>
                        <CFormInput type="text" :value="srf.fechaFin" disabled />
                        <CInputGroupText class="headercolor" as="label">{{ formato.value.monto }}
                        </CInputGroupText>
                        <CFormInput type="text" :value="srf.monto" disabled />
                    </CInputGroup>
                    <CAlert color="secondary">
                        {{ srf.detalle }}
                    </CAlert>

                    <hr>
                    <div v-if="formato.value.estadoDos">
                        <CAlert color="warning">{{ formato.value.cuidado }}</CAlert>
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">{{ formato.value.detalleDos }}
                            </CInputGroupText>
                            <CFormInput type="text" :value="srf.texto" disabled />

                            <CInputGroupText class="headercolor" as="label">{{ formato.value.cantidadDos }}
                            </CInputGroupText>
                            <CFormInput type="text" :value="srf.numerico" disabled />
                        </CInputGroup>
                    </div>

                    <div v-if="formato.value.estadoTres">
                        <CAlert color="secondary">III. {{ formato?.value.seccionTres }}</CAlert>
                        <CAlert>{{ formato?.value.detalle }}</CAlert>
                    </div>

                </CCardBody>
                <CCardFooter class="text-center">

                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

    <!-- Modal  Actualizar Solicitud-->
    <CModal :visible="modalSrf" backdrop="static" @close="clickModalSrf(false)">
        <CForm @submit.prevent="actualizarSrf">
            <CModalHeader class="headercolor" dismiss @close="clickModalSrf(false)">
                <CModalTitle>
                    <h6>
                        <CIcon icon="cil-pencil" size="lg" class="me-2" />Actualizar Solicitud
                    </h6>
                </CModalTitle>
            </CModalHeader>
            <CModalBody>

                <CAlert color="secondary">II. {{ formato?.value.seccionDos }}</CAlert>

                <CInputGroup size="sm" class="mb-3">
                    <CInputGroupText class="headercolor" as="label">{{ formato.value.fecha }}
                    </CInputGroupText>
                    <CFormInput type="date" v-model="updateSrf.fechaFin" :min="hoy" @change="validarFecha"
                        @keydown="bloquearTeclado" required />
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                    <CInputGroupText class="headercolor" as="label">{{ formato.value.monto }}
                    </CInputGroupText>
                    <CFormInput type="text" v-model="updateSrf.monto" required />
                    <CFormSelect v-model="updateSrf.moneda" required>
                        <option value="">Moneda</option>
                        <option value="USD">Dollar</option>
                        <option value="PESOS">Pesos</option>
                        <option value="EUR">Euros</option>
                    </CFormSelect>
                </CInputGroup>

                <CFormTextarea :label="formato.value.descripcion" v-model="updateSrf.detalle" rows="3" text="100."
                    maxlength="100" required>
                </CFormTextarea>
                <hr>
                <div v-if="formato.value.estadoDos">
                    <CAlert color="warning">{{ formato.value.cuidado }}</CAlert>
                    <CInputGroup size="sm" class="mb-3">
                        <CInputGroupText class="headercolor" as="label">{{ formato.value.detalleDos }}
                        </CInputGroupText>
                        <CFormInput type="text" v-model="updateSrf.texto" />

                        <CInputGroupText class="headercolor" as="label">{{ formato.value.cantidadDos }}
                        </CInputGroupText>
                        <CFormInput type="text" v-model="updateSrf.numerico" />
                    </CInputGroup>
                </div>

            </CModalBody>
            <CModalFooter>
                <CButton @click="clickModalSrf(false)" color="danger" class="font" size="sm">
                    <CIcon icon="cil-x" class="me-2" />Cancelar
                </CButton>

                <CButton type="submit" class="font" color="success" size="sm">
                    <CIcon icon="cil-check-alt" class="me-2" />
                    <span>Actualizar</span>
                </CButton>
            </CModalFooter>
        </CForm>
    </CModal>
    <!-- End Modal  Actualizar Solicitud-->

    <!-- Modal  Observaciones-->
    <CModal :visible="modalObs" backdrop="static" @close="clickModalObs(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalObs(false)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-description" size="lg" class="me-2" />Observaciones
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow>
                <CCol :xs="12">
                    <CWidgetStatsB class="mb-3" :progress="{ color: obsSrf.color, value: 100 }">
                        <template #text>{{ obsSrf.estado }} el {{obsSrf.fecha}}</template>
                        <template #title>{{ obsSrf.nombre }} | {{ obsSrf.idp }}</template>
                        <template #value>{{ obsSrf.estado }}</template>
                    </CWidgetStatsB>
                    <CAlert :color="obsSrf.color"> 
                        {{ obsSrf.obs }}
                    </CAlert>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalObs(false)" class="font" color="success" size="sm">
                <CIcon icon="cil-check-alt" class="me-2" />
                <span>Aceptar</span>
            </CButton>
        </CModalFooter>
    </CModal>
    <!-- End Modal Observaciones-->

</template>
<script setup>
const detalleProps = defineProps({
    estado: {
        type: String,
        required: true
    },
    idSrf: {
        type: String,
        required: true
    }
})
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, computed, onMounted } from 'vue'

import { useFunction } from '@/composables/useFunction'
const { getColor, getIcono } = useFunction()

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100

import { useAlert } from '@/composables/useAlert'
import { CModal } from '@coreui/vue'
const { confirm, error, success } = useAlert()

import { useSettings } from '@/composables/useSettings'
const { getSettingsUse } = useSettings()
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

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
import { useUsuario } from '@/composables/useUsuario'
const { getDatosUse } = useUsuario()

const persona = auth.persona
const idUsuario = ref(auth.idUsuario)
const perfil = ref(null)


import { useSrf } from '@/composables/useSrf'
const { updateSrfUse, getSrfUse } = useSrf()

const srf = reactive({
    id: null,
    numero: '',
    gestion: '',
    fechaInicio: '',
    fechaFin: '',
    monto: 0,
    moneda: '',
    detalle: '',
    numerico: 0,
    texto: '',
    tipo: '',
    estado: false,
    cargo: '',
    codigo: '',
    costo: '',
    lista: [],
    editar: false,
    pdf: false
})
const updateSrf = reactive({
    id: null,
    fechaFin: '',
    monto: 0,
    moneda: '',
    detalle: '',
    texto: '',
    numerico: 0
})

const obsSrf = reactive({
    nombre: '',
    idp: '',
    estado: '',
    color: '',
    fecha: '',
    obs: ''
})

const modalSrf = ref(false)
const modalObs = ref(false)
const hoy = new Date().toISOString().split('T')[0]
const fechaSeleccionada = ref(updateSrf.fechaFin)

const vars = {
    '--cui-accordion-btn-bg': 'var(--cui-secondary-bg-subtle)',
    '--cui-accordion-border-color': 'var(--cui-secondary-border-subtle)',
    '--cui-accordion-active-bg': 'var(--cui-secondary-bg-subtle)', // Mismo que el base
    '--cui-accordion-active-color': 'var(--cui-body-color)',
    '--cui-accordion-btn-focus-box-shadow': 'none', // Elimina el resplandor azul al hacer clic
    '--cui-accordion-border-width': '10px',
    '--cui-accordion-border-style': 'solid',
    '--cui-accordion-border-color': 'var(--cui-secondary-border-subtle)',
}

const getFoto = (value) => {
    return value === 'usuario.png' ? '/public/usuario.png' : API_URL_IMG100 + value
}

const validarFecha = (e) => {
    const valor = e.target.value
    if (valor && valor < hoy) {
        fechaSeleccionada.value = hoy // Forzamos a que sea hoy
    }
}

const bloquearTeclado = (e) => {
    e.preventDefault()
}

const getFormato = async () => {
    try {
        const formulario = await getSettingsUse(2)
        formato.nombre = formulario.nombre
        formato.categoria = formulario.categoria
        formato.value.titulo = formulario.value.titulo
        formato.value.seccionUno = formulario.value.seccionUno
        formato.value.seccionDos = formulario.value.seccionDos
        formato.value.fecha = formulario.value.fecha
        formato.value.monto = formulario.value.monto
        formato.value.descripcion = formulario.value.descripcion
        formato.value.estadoDos = formulario.value.estadoDos
        formato.value.cuidado = formulario.value.cuidado
        formato.value.detalleDos = formulario.value.detalleDos
        formato.value.cantidadDos = formulario.value.cantidadDos
        formato.value.seccionTres = formulario.value.seccionTres
        formato.value.detalle = formulario.value.detalle
        formato.value.estadoTres = formulario.value.estadoTres
        formato.fecha = formulario.fechaActualizacion
    } catch (errr) {
        console.log(errr)
    }
}

const clickModalSrf = (value) => {
    modalSrf.value = value
}

const clickModalObs = (value) => {
    modalObs.value = value
}

const getDatos = async () => {
    try {
        perfil.value = await getDatosUse(persona.id)
    } catch (errr) {
        console.log(errr)
    }
}

const getSrf = async (value) => {
    try {
        const srfResult = await getSrfUse(value)
        srf.id = srfResult.id
        srf.numero = srfResult.numero
        srf.gestion = srfResult.gestion
        srf.fechaInicio = srfResult.fechaSolicitud
        srf.fechaFin = srfResult.fechaEstimada.split('T')[0]
        srf.monto = srfResult.monto + ' ' + srfResult.moneda
        srf.moneda = srfResult.moneda
        srf.detalle = srfResult.detalle
        srf.numerico = srfResult.campoNumerico
        srf.texto = srfResult.campoTexto
        srf.tipo = srfResult.tipo
        srf.estado = srfResult.estado
        srf.lista = srfResult.aprobadores
        srf.cargo = srfResult.cargo
        srf.costo = srfResult.centrocosto
        srf.codigo = srfResult.codigo
        srf.editar = srfResult.edit
        srf.pdf = srfResult.pdf
        updateSrf.id = srfResult.id
        updateSrf.fechaFin = srfResult.fechaEstimada.split('T')[0]
        updateSrf.monto = srfResult.monto
        updateSrf.moneda = srfResult.moneda
        updateSrf.texto = srfResult.campoTexto
        updateSrf.numerico = srfResult.campoNumerico
        updateSrf.detalle = srfResult.detalle
    } catch (errr) {
        console.log(errr)
    }

}

const actualizarSrf = async () => {
    clickModalSrf(false)
    const resultAlert = await confirm('Actualizar Solicitud', 'Esta seguro de actualizar el formulario', '')
    if (resultAlert.isConfirmed) {
        try {
            const resultService = await updateSrfUse(updateSrf)
            if (resultService.status == 200 && resultService.data.id > 0) {
                await success('Well Done!!!', 'Solicitud Actualizada Corectamente', '')
                location.reload()
            }
            else {
                await error('Error !!!', 'Solcitud no encontrada, verifique e intente nuevamente')
            }
        } catch (errr) {
            await error('Error!!!!', 'Servicio no Disponible', errr)
        }
    }
    else {
        await error('Datos Cancelados', '', '')
    }

}

const getObs = (value) => {
    srf.lista.forEach(element => {
        if (element.id === value) {
            obsSrf.nombre = element.jefe.nombre
            obsSrf.idp = element.jefe.idp
            obsSrf.estado = element.estado
            obsSrf.obs = element.obs
            obsSrf.color = getColor(element.estado)
            obsSrf.fecha = new Date(element.fechaActualizacion)
        }
    });
    clickModalObs(true)
}

onMounted(() => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    getFormato()
    getDatos()
    getSrf(detalleProps.idSrf)
})
</script>