<template>

    <CRow>
        <CCol :xs="0" :sm="0" :md="1" :lg="1" class="align-self-start">
        </CCol>
        <CCol :xs="12" :sm="12" :md="10" :lg="10" class="align-self-center">
            <CForm @submit.prevent="createSrf">
                <CCard>
                    <CCardHeader class="headercolor justify-content-between align-items-center">
                        <div class="align-items-center">
                            <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                            <label class="mb-0 fs-6 text-white">{{ formatoSRF.formato?.titulo }}</label>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CAlert color="success">Fecha de solicitud: {{ fecha }}</CAlert>
                        <CAccordion>
                            <CAccordionItem :item-key="1">
                                <CAccordionHeader :style="vars">
                                    I. {{ formatoSRF.formato?.seccionUno }}
                                </CAccordionHeader>
                                <CAccordionBody>

                                    <ComponenteDatos :datos="datos" />

                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>
                        <br>
                        <CAlert color="secondary">II. {{ formatoSRF.formato?.seccionDos }}</CAlert>

                        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-calendar-event me-2"></i>{{ formatoSRF.formato?.fechaTitulo }} :
                            </CInputGroupText>
                            <CFormInput type="date" v-model="fechaSeleccionada" :min="hoy" @change="validarFecha"
                                @keydown="bloquearTeclado" required />
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-currency-dollar me-2"></i>{{ formatoSRF.formato?.montoTitulo }} :
                            </CInputGroupText>
                            <input type="hidden" v-maska="maskOptions" v-model="srf.monto">
                            <CFormInput type="text" v-model="srf.monto" required />
                            <CFormSelect v-model="srf.moneda" required>
                                <option value="">Moneda</option>
                                <option value="USD">Dollar</option>
                                <option value="PESOS">Pesos</option>
                                <option value="EUR">Euros</option>
                            </CFormSelect>
                        </CInputGroup>

                        <div class="d-md-none mb-3">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-calendar-event me-2"></i>{{ formatoSRF.formato?.fechaTitulo }} :
                                </CInputGroupText>
                                <CFormInput type="date" v-model="fechaSeleccionada" :min="hoy" @change="validarFecha"
                                    @keydown="bloquearTeclado" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-currency-dollar me-2"></i>{{ formatoSRF.formato?.montoTitulo }} :
                                </CInputGroupText>
                                <input type="hidden" v-maska="maskOptions" v-model="srf.monto">
                                <CFormInput type="text" v-model="srf.monto" required />
                                <CFormSelect v-model="srf.moneda" required>
                                    <option value="">Moneda</option>
                                    <option value="USD">Dollar</option>
                                    <option value="PESOS">Pesos</option>
                                    <option value="EUR">Euros</option>
                                </CFormSelect>
                            </CInputGroup>
                        </div>

                        <CFormTextarea :label="formatoSRF.formato?.descripcion" v-model="srf.detalle" rows="3"
                            :text="getCantidadCaracteres(150, srf.detalle.length)" maxlength="150" required>
                        </CFormTextarea>
                        <hr>
                        <div v-if="formatoSRF.formato?.estadoComplemento">
                            <CAlert color="warning">
                                <CInputGroup size="sm" class="mb-3 d-md-flex checkcolor">
                                    <CFormCheck type="checkbox" v-model="trueComplemento"
                                        :label="formatoSRF.formato?.complemento" />
                                </CInputGroup>

                                <div v-if="trueComplemento">
                                    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
                                        <CInputGroupText class="headercolor" as="label">
                                            <i class="bi bi-person-vcard-fill me-2"></i>{{
                                            formatoSRF.formato?.detalleComplemento
                                        }} :
                                        </CInputGroupText>
                                        <CFormInput type="text" v-model="srf.texto" />

                                        <CInputGroupText class="headercolor" as="label">
                                            <i class="bi bi-list-ol me-2"></i>{{
                                            formatoSRF.formato?.cantidadComplemento
                                        }} :
                                        </CInputGroupText>
                                        <CFormInput type="text" v-model="srf.numerico" />
                                    </CInputGroup>

                                    <div class="d-md-none mb-3">
                                        <CInputGroup size="sm" class="mb-3">
                                            <CInputGroupText class="headercolor" as="label">
                                                <i class="bi bi-person-vcard-fill me-2"></i>{{
                                                formatoSRF.formato?.detalleComplemento }} :
                                            </CInputGroupText>
                                            <CFormInput type="text" v-model="srf.texto" />
                                        </CInputGroup>

                                        <CInputGroup size="sm" class="mb-3">
                                            <CInputGroupText class="headercolor" as="label">
                                                <i class="bi bi-list-ol me-2"></i>{{
                                                formatoSRF.formato?.cantidadComplemento }}
                                                :
                                            </CInputGroupText>
                                            <CFormInput type="text" v-model="srf.numerico" />
                                        </CInputGroup>
                                    </div>
                                </div>

                            </CAlert>
                        </div>

                        <div v-if="formatoSRF.formato?.estadoTres">
                            <CAlert color="secondary">III. {{ formatoSRF.formato?.seccionTres }}</CAlert>
                            <CAlert>{{ formatoSRF.formato?.detalle }}</CAlert>
                        </div>

                    </CCardBody>
                    <CCardFooter class="text-center">
                        <CRow>
                            <CCol :xs="2" :sm="6"></CCol>
                            <CCol :xs="5" :sm="3" class="d-grid gap-2">
                                <CButton @click="cancelar" color="danger" size="sm" class="font">
                                    <CIcon icon="cil-x" class="me-2" />
                                    Cancelar
                                </CButton>

                            </CCol>
                            <CCol :xs="5" :sm="3" class="d-grid gap-2">
                                <CButton type="submit" class="font" color="success" size="sm">
                                    <CIcon icon="cil-description" class="me-2" />
                                    Crear
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CForm>
        </CCol>
        <CCol :xs="0" :sm="0" :md="1" :lg="1" class="align-self-end">
        </CCol>
    </CRow>
    <br>

</template>
<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, onMounted } from 'vue'
import { vMaska } from "maska/vue"

import { useRouter } from 'vue-router'
const router = useRouter()


import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = ref(auth.persona)
const idpName = ref(auth.idpName)

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close, confirm } = useAlert()

import ComponenteDatos from '@/components/srf/ComponenteDatos.vue'

import { useUsuario } from '@/composables/useUsuario'
const { getPerfilUse, perfilCuenta } = useUsuario()

import { useFunction } from '@/composables/useFunction'
const { getCantidadCaracteres } = useFunction()

import { useSettings } from '@/composables/useSettings'
const { getFormatoSrfUse, formatoSRF } = useSettings()

import { useSrf } from '@/composables/useSrf'
const { createSrfUse } = useSrf()

const srf = reactive({
    idPersona: null,
    tipo: '',
    fechaInicio: '',
    fechaFin: '',
    monto: 0,
    moneda: '',
    detalle: '',
    numerico: 0,
    texto: '',
    cargo: '',
    codigo: '',
    costo: '',
    formato: ''
})
const trueComplemento = ref(false)

//import router from '../../router'

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
const datos = reactive({
    nombre: '',
    idp: '',
    idpName: '',
    cargo: '',
    centroCostos: '',
    codigo: ''
})

const fecha = new Date()

const hoy = new Date().toISOString().split('T')[0]
const fechaSeleccionada = ref('')

const validarFecha = (e) => {
    const valor = e.target.value
    if (valor && valor < hoy) {
        fechaSeleccionada.value = hoy 
    }
}

const bloquearTeclado = (e) => {
    e.preventDefault()
}

const createSrf = async () => {

    srf.idPersona = persona.value.id
    srf.fechaInicio = new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
    srf.fechaFin = fechaSeleccionada.value
    srf.cargo = perfilCuenta.cargo
    srf.costo = perfilCuenta.subCentroCostos
    srf.codigo = perfilCuenta.codigo
    srf.formato = formatoSRF.formato
    srf.formato.trueComplemento = trueComplemento.value
    const resultService = await createSrfUse(srf)
    if (resultService) {
        getSolicitudes('pendiente')
    }

}
const cancelar = async () => {
    const resulAlert = await confirm('Cancelar', 'Desea Cancelar la Solicitud ????', '')
    if (resulAlert.isConfirmed) {
        router.push({
            name: 'MenuSrf'
        })
    }
}

const getSolicitudes = (value) => {
    router.push({
        name: 'ListaSRF',
        params: { estado: value }
    })
}

const maskOptions = reactive({
    mask: "0.99",
    tokens: {
        "0": { pattern: /\d/, multiple: true },
        "9": { pattern: /\d/, optional: true }
    }
})
const getLoadData = () => {
    datos.nombre = perfilCuenta.nombre
    datos.idpName = idpName
    datos.idp = perfilCuenta.idp
    datos.cargo = perfilCuenta.cargo
    datos.centroCostos = perfilCuenta.subCentroCostos
    datos.codigo = perfilCuenta.codigo
}

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach(tooltip => tooltip.remove())
    dataLoading()
    try {
        await getPerfilUse(persona.value.id)
        await getFormatoSrfUse()
        getLoadData()
    } finally {
        close()
    }
})
</script>