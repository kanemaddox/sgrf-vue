<template>
    <CContainer>
        <CRow>
            <CCol :xs="1" class="align-self-start">
            </CCol>
            <CCol :xs="10" class="align-self-center">
                <CForm @submit.prevent="createSrf">
                    <CCard>
                        <CCardHeader class="headercolor justify-content-between align-items-center">
                            <div class="align-items-center">
                                <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                                <label class="mb-0 fs-6 text-white">{{ formato?.value.titulo }}</label>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CAlert color="success">Fecha de solicitud: {{ fecha }}</CAlert>
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
                                                :value="`${persona.nombre} ${persona?.paterno} ${persona?.materno}`"
                                                disabled />
                                            <CInputGroupText class="headercolor" as="label">IDP</CInputGroupText>
                                            <CFormInput type="text" :value="persona.idp" disabled />
                                        </CInputGroup>

                                        <CInputGroup size="sm" class="mb-3">
                                            <CInputGroupText class="headercolor" as="label">Cargo</CInputGroupText>
                                            <CFormInput type="text" :value="perfil?.cargoNombre" disabled />
                                        </CInputGroup>

                                        <CInputGroup size="sm" class="mb-3">
                                            <CInputGroupText class="headercolor" as="label">Centro de Costos
                                            </CInputGroupText>
                                            <CFormInput type="text"
                                                :value="perfil?.nombreCentroCostos === 'NINGUNO' ? perfil?.nombreSucursal : perfil?.nombreCentroCostos"
                                                disabled />
                                            <CInputGroupText class="headercolor" as="label">CC</CInputGroupText>
                                            <CFormInput type="text"
                                                :value="perfil?.codigoCentroCostos === 'NINGUNO' ? perfil?.codigoSucursal : perfil?.codigoCentroCostos"
                                                disabled />
                                        </CInputGroup>
                                    </CAccordionBody>
                                </CAccordionItem>
                            </CAccordion>
                            <br>
                            <CAlert color="secondary">II. {{ formato?.value.seccionDos }}</CAlert>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">{{ formato.value.fecha }}
                                </CInputGroupText>
                                <CFormInput type="date" v-model="fechaSeleccionada" :min="hoy" @change="validarFecha"
                                    @keydown="bloquearTeclado" required />
                                <CInputGroupText class="headercolor" as="label">{{ formato.value.monto }}
                                </CInputGroupText>
                                <CFormInput type="text" v-model="srf.monto" required />
                                <CFormSelect v-model="srf.moneda" required>
                                    <option value="">Moneda</option>
                                    <option value="USD">Dollar</option>
                                    <option value="PESOS">Pesos</option>
                                    <option value="EUR">Euros</option>
                                </CFormSelect>
                            </CInputGroup>

                            <CFormTextarea :label="formato.value.descripcion" v-model="srf.detalle" rows="3" text="100."
                                maxlength="100" required>
                            </CFormTextarea>
                            <hr>
                            <div v-if="formato.value.estadoDos">
                                <CAlert color="warning">{{ formato.value.cuidado }}</CAlert>
                                <CInputGroup size="sm" class="mb-3">
                                    <CInputGroupText class="headercolor" as="label">{{ formato.value.detalleDos }}
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="srf.texto" />

                                    <CInputGroupText class="headercolor" as="label">{{ formato.value.cantidadDos }}
                                    </CInputGroupText>
                                    <CFormInput type="text" v-model="srf.numerico" />
                                </CInputGroup>
                            </div>

                            <div v-if="formato.value.estadoTres">
                                <CAlert color="secondary">III. {{ formato?.value.seccionTres }}</CAlert>
                                <CAlert>{{ formato?.value.detalle }}</CAlert>
                            </div>

                        </CCardBody>
                        <CCardFooter class="text-center">
                            <CRow>
                                <CCol :xs="2" :sm="6"></CCol>
                                <CCol :xs="5" :sm="3" class="d-grid gap-2">
                                    <CButton @click="clickModalFoto(false)" color="danger" size="sm" class="font">
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
            <CCol :xs="1" class="align-self-end">
            </CCol>
        </CRow>
    </CContainer>

</template>
<script setup>
import { nextTick, ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = auth.persona
const idUsuario = ref(auth.idUsuario)

import { useUsuario } from '@/composables/useUsuario'
const { getDatosUse } = useUsuario()


import { useSettings } from '@/composables/useSettings'
const { getSettingsUse } = useSettings()

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
})

import { useAlert } from '@/composables/useAlert'
import router from '../../router'
const { confirm, error, success } = useAlert()

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

const getDatos = async () => {
    try {
        perfil.value = await getDatosUse(persona.id)
    } catch (errr) {
        console.log("===================" + errr)
    }
}

const getFormato = async () => {
    try {
        const formulario = await getSettingsUse(2)
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
const createSrf = async () => {
    const resultAlert = await confirm('Crear Solicitud', 'Desea crear y enviar la Solicitud ????', '')
    if (resultAlert.isConfirmed) {
        srf.idUsuario = idUsuario.value
        srf.fechaInicio = new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
        srf.fechaFin = fechaSeleccionada.value
        srf.cargo = perfil.value.cargoNombre
        srf.costo = perfil.value.nombreCentroCostos === 'NINGUNO' ? perfil.value.nombreSucursal : perfil.value.nombreCentroCostos
        srf.codigo = perfil.value.codigoCentroCostos === 'NINGUNO' ? perfil.value.codigoSucursal : perfil.value.codigoCentroCostos
        try {
            const resultService = await createSrfUse(srf)
            if (resultService.status == 201) {
                const result = await success('Well Done!!!', 'Solicitud creada con exito, la solicitud se envio a su inmediato superior', '')
                if (result.isConfirmed) {
                    router.push({
                        name: 'ListaSRF',
                        params: { estado: 'pendiente' }
                    })
                }
            }
        } catch (errr) {
            await error('Error !!!!', 'Datos cancelados ' + errr, '')
        }
    }
    else {
        await error('Datos Cancelados', '', '')
    }

}

onMounted(() => {
    getFormato()
    getDatos()
})
</script>