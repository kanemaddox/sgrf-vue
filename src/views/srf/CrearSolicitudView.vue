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
                            <label class="mb-0 fs-6 text-white">{{ formatoSRF.value?.titulo }}</label>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CAlert color="success">Fecha de solicitud: {{ fecha }}</CAlert>
                        <CAccordion>
                            <CAccordionItem :item-key="1">
                                <CAccordionHeader :style="vars">
                                    I. {{ formatoSRF.value?.seccionUno }}
                                </CAccordionHeader>
                                <CAccordionBody>

                                    <ComponenteDatos :datos="datos" />

                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>
                        <br>
                        <CAlert color="secondary">II. {{ formatoSRF.value?.seccionDos }}</CAlert>

                        <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
                            <CInputGroupText class="headercolor" as="label">{{ formatoSRF.value?.fecha }} :
                            </CInputGroupText>
                            <CFormInput type="date" v-model="fechaSeleccionada" :min="hoy" @change="validarFecha"
                                @keydown="bloquearTeclado" required />
                            <CInputGroupText class="headercolor" as="label">{{ formatoSRF.value?.monto }} :
                            </CInputGroupText>
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
                                <CInputGroupText class="headercolor" as="label">{{ formatoSRF.value?.fecha }} :
                                </CInputGroupText>
                                <CFormInput type="date" v-model="fechaSeleccionada" :min="hoy" @change="validarFecha"
                                    @keydown="bloquearTeclado" required />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">{{ formatoSRF.value?.monto }} :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="srf.monto" required />
                                <CFormSelect v-model="srf.moneda" required>
                                    <option value="">Moneda</option>
                                    <option value="USD">Dollar</option>
                                    <option value="PESOS">Pesos</option>
                                    <option value="EUR">Euros</option>
                                </CFormSelect>
                            </CInputGroup>
                        </div>

                        <CFormTextarea :label="formatoSRF.value?.descripcion" v-model="srf.detalle" rows="3"
                            :text="getCantidadCaracteres(150, srf.detalle.length)" maxlength="150" required>
                        </CFormTextarea>
                        <hr>
                        <div v-if="formatoSRF.value?.estadoDos">
                            <CAlert color="warning">
                                <CInputGroup size="sm" class="mb-3 d-none d-md-flex checkcolor">
                                    <CFormCheck type="checkbox" v-model="trueEstadoDos"
                                        :label="formatoSRF.value?.cuidado" />
                                </CInputGroup>

                                <div v-if="trueEstadoDos">
                                    <CInputGroup size="sm" class="mb-3 d-none d-md-flex">
                                        <CInputGroupText class="headercolor" as="label">{{ formatoSRF.value?.detalleDos
                                        }} :
                                        </CInputGroupText>
                                        <CFormInput type="text" v-model="srf.texto" />

                                        <CInputGroupText class="headercolor" as="label">{{ formatoSRF.value?.cantidadDos
                                        }} :
                                        </CInputGroupText>
                                        <CFormInput type="text" v-model="srf.numerico" />
                                    </CInputGroup>

                                    <div class="d-md-none mb-3">
                                        <CInputGroup size="sm" class="mb-3">
                                            <CInputGroupText class="headercolor" as="label">{{
                                                formatoSRF.value?.detalleDos }} :
                                            </CInputGroupText>
                                            <CFormInput type="text" v-model="srf.texto" />
                                        </CInputGroup>

                                        <CInputGroup size="sm" class="mb-3">
                                            <CInputGroupText class="headercolor" as="label">{{
                                                formatoSRF.value?.cantidadDos }}
                                                :
                                            </CInputGroupText>
                                            <CFormInput type="text" v-model="srf.numerico" />
                                        </CInputGroup>
                                    </div>
                                </div>

                            </CAlert>
                        </div>

                        <div v-if="formatoSRF.value?.estadoTres">
                            <CAlert color="secondary">III. {{ formatoSRF.value?.seccionTres }}</CAlert>
                            <CAlert>{{ formatoSRF.value?.detalle }}</CAlert>
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


</template>
<script setup>
import { nextTick, ref, reactive, computed, onMounted, getCurrentWatcher } from 'vue'
import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = auth.persona
const idUsuario = ref(auth.idUsuario)
const idpName = ref(auth.idpName)
const srfCantidad = ref(auth.srfCantidad)

import ComponenteDatos from '@/components/srf/ComponenteDatos.vue'

import { useUsuario } from '@/composables/useUsuario'
const { perfilUsuario, getDatosUse,getPerfilUse,perfilCuenta } = useUsuario()

import { useFunction } from '@/composables/useFunction'
const { getCantidadCaracteres } = useFunction()

import { useSettings } from '@/composables/useSettings'
const { getFormatoSrfUse, formatoSRF } = useSettings()

import { useSrf } from '@/composables/useSrf'
import { CForm } from '@coreui/vue'
const { createSrfUse } = useSrf()

const srf = reactive({
    idUsuario: null,
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
const trueEstadoDos = ref(false)


import router from '../../router'

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
    nombre:'',
    idp:'',
    idpName:'',
    cargo:'',
    centroCostos:'',
    codigo:''
})

const perfil = ref(null)
const fecha = new Date()

const hoy = new Date().toISOString().split('T')[0]
const fechaSeleccionada = ref('')

const validarFecha = (e) => {
    const valor = e.target.value
    if (valor && valor < hoy) {
        fechaSeleccionada.value = hoy // Forzamos a que sea hoy
    }
}

const bloquearTeclado = (e) => {
    e.preventDefault()
}

const createSrf = async () => {

    srf.idUsuario = idUsuario.value
    srf.fechaInicio = new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
    srf.fechaFin = fechaSeleccionada.value
    srf.cargo = perfilCuenta.cargo
    srf.costo = perfilCuenta.subCentroCostos
    srf.codigo = perfilCuenta.codigo
    srf.formato = formatoSRF.value
    srf.formato.trueEstadoDos = trueEstadoDos.value
    const resultService = await createSrfUse(srf)
    if (resultService) {
        auth.srfCantidad++
        srfCantidad.value = auth.srfCantidad
        localStorage.setItem('srfCantidad', Number(auth.srfCantidad))
        router.push({
            name: 'ListaSRF',
            params: { estado: 'pendiente' }
        })
    }

}
const cancelar = () => {
    router.push({
        name: 'MenuSrf'
    })
}
const getLoadData=()=>{
    datos.nombre = perfilCuenta.nombre
    datos.idpName = idpName
    datos.idp = perfilCuenta.idp
    datos.cargo = perfilCuenta.cargo
    datos.centroCostos = perfilCuenta.subCentroCostos
    datos.codigo = perfilCuenta.codigo
}

onMounted(async () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    await getPerfilUse(persona.id)
    await getFormatoSrfUse(srfCantidad.value)
    getLoadData()
    
})
</script>