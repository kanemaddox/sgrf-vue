<template>
    <CRow>
        <CCol :xs="12" :sm="4" :md="4" :lg="4" class="align-self-start">
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
                            <CAvatar size="md" :src="getFoto(item.jefe.foto, '/usuario.png', img100)"
                                :status="getColor(item.estado)" />
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
        </CCol>

        <CCol :xs="12" :sm="8" :md="8" :lg="8" class="align-self-center">
            <br>
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
                        <CCol :xs="12" :sm="8" :md="8" :lg="8">
                            <h5><strong>{{ srf.formato?.titulo }}</strong></h5>
                        </CCol>
                        <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
                            <h3><strong>No.: {{ srf.numero }}</strong> </h3>
                            <div class="space">{{ persona.idp }} | {{ srf.gestion }}</div>
                        </CCol>
                    </CRow>
                    <CAlert color="success">Fecha de solicitud: {{ srf.fechaInicio }}</CAlert>
                    <CAccordion>
                        <CAccordionItem :item-key="1">
                            <CAccordionHeader :style="vars">
                                I. {{ srf.formato?.seccionUno }}
                            </CAccordionHeader>
                            <CAccordionBody>
                                <ComponenteDatos :datos="datos" />
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>
                    <br>
                    <CAlert color="secondary">II. {{ srf.formato?.seccionDos }}</CAlert>

                    <!--PC-->
                    <div class="mb-3 d-none d-md-flex">
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-calendar-event me-2"></i>{{ srf.formato?.fechaTitulo }} :
                            </CInputGroupText>
                            <CFormInput type="text" :value="srf.fechaFin" disabled />
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-currency-dollar me-2"></i>{{ srf.formato?.montoTitulo }} :
                            </CInputGroupText>
                            <CFormInput type="text" :value="`${formatearNumero(srf.monto)} ${srf.moneda}`" disabled />
                        </CInputGroup>
                    </div>

                    <!--Movil-->
                    <div class="d-md-none mb-3">
                        <CInputGroup size="sm" class="mb-3">
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-calendar-event me-2"></i>{{ srf.formato?.fechaTitulo }} :
                            </CInputGroupText>
                            <CFormInput type="text" :value="srf.fechaFin" disabled />
                        </CInputGroup>
                        <CInputGroup>
                            <CInputGroupText class="headercolor" as="label">
                                <i class="bi bi-currency-dollar me-2"></i>{{ srf.formato?.montoTitulo }} :
                            </CInputGroupText>
                            <CFormInput type="text" :value="`${formatearNumero(srf.monto)} ${srf.moneda}`" disabled />
                        </CInputGroup>
                    </div>

                    {{ srf.formato?.descripcion }} :
                    <CAlert color="secondary">
                        {{ srf.detalle }}
                    </CAlert>
                    <hr>

                    <div v-if="srf.formato?.trueComplemento">
                        <div class="d-md-none mb-3">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-person-vcard-fill me-2"></i>{{ srf.formato?.detalleComplemento }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="srf.texto" disabled />
                            </CInputGroup>
                            <CInputGroup>
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-list-ol me-2"></i>{{ srf.formato?.cantidadComplemento }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="srf.numerico" disabled />
                            </CInputGroup>
                        </div>

                        <div class="mb-3 d-none d-md-flex">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-person-vcard-fill me-2"></i>{{ srf.formato?.detalleComplemento }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="srf.texto" disabled />

                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-list-ol me-2"></i>{{ srf.formato?.cantidadComplemento }} :
                                </CInputGroupText>
                                <CFormInput type="text" :value="srf.numerico" disabled />
                            </CInputGroup>
                        </div>
                    </div>

                    <div v-if="srf.formato?.estadoTres">
                        <CAlert color="secondary">III. {{ srf.formato?.seccionTres }}</CAlert>
                        <CAlert>{{ srf.formato?.detalle }}</CAlert>
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

                <CAlert color="secondary">II. {{ srf.formato?.seccionDos }}</CAlert>

                <CInputGroup size="sm" class="mb-3">
                    <CInputGroupText class="headercolor" as="label">
                        <i class="bi bi-calendar-event me-2"></i>{{ srf.formato?.fechaTitulo }} :
                    </CInputGroupText>
                    <CFormInput type="date" v-model="updateSrf.fechaFin" :min="hoy" @change="validarFecha"
                        @keydown="bloquearTeclado" required />
                </CInputGroup>

                <CInputGroup size="sm" class="mb-3">
                    <CInputGroupText class="headercolor" as="label">
                        <i class="bi bi-currency-dollar me-2"></i>{{ srf.formato?.montoTitulo }} :
                    </CInputGroupText>

                    <CFormInput type="text" v-model="updateSrf.monto" required />

                    <CFormSelect v-model="updateSrf.moneda" required>
                        <option value="">Moneda</option>
                        <option value="USD">Dollar</option>
                        <option value="PESOS">Pesos</option>
                        <option value="EUR">Euros</option>
                    </CFormSelect>
                </CInputGroup>

                <CFormTextarea :label="srf.formato?.descripcion" v-model="updateSrf.detalle" rows="3"
                    :text="getCantidadCaracteres(150 - srf.detalle.length)" maxlength="150" required>
                </CFormTextarea>
                <hr>
                <div v-if="srf.formato?.estadoComplemento">
                    <CAlert color="warning">
                        <CInputGroup size="sm" class="mb-3 checkcolor">
                            <CFormCheck type="checkbox" v-model="trueComplemento" :label="srf.formato?.complemento" />
                        </CInputGroup>

                        <div v-if="trueComplemento">
                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-person-vcard-fill me-2"></i>
                                    {{ srf.formato?.detalleComplemento }} :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="updateSrf.texto" />
                            </CInputGroup>

                            <CInputGroup size="sm" class="mb-3">
                                <CInputGroupText class="headercolor" as="label">
                                    <i class="bi bi-list-ol me-2"></i>
                                    {{ srf.formato?.cantidadComplemento }} :
                                </CInputGroupText>
                                <CFormInput type="text" v-model="updateSrf.numerico" />
                            </CInputGroup>
                        </div>
                    </CAlert>
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
                        <template #text>{{ obsSrf.estado }} el {{ obsSrf.fecha }}</template>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()
import ComponenteDatos from '@/components/srf/ComponenteDatos.vue'
import { useFunction } from '@/composables/useFunction'
const { getFoto, formatearNumero, getColor, getIcono, lenFirma, lenPdf, getCantidadCaracteres } = useFunction()
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { API_URL_SGRF, API_URL_IMG100} from "@/env"
const img100 = API_URL_IMG100
const dominio = API_URL_SGRF

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

const persona = ref(auth.persona)
const idpName = ref(auth.idpName)
const trueComplemento = ref(false)

import { useSrf } from '@/composables/useSrf'
const { updateSrfUse, getSrfUsuarioUse, srf } = useSrf()

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { crearSrfPdf } from '../pdf/srfPdfLite'

pdfMake.vfs = pdfFonts.vfs

const updateSrf = reactive({
    id: null,
    fechaFin: '',
    monto: 0,
    moneda: '',
    detalle: '',
    texto: '',
    numerico: 0,
    formato: {}
})

const obsSrf = reactive({
    nombre: '',
    idp: '',
    estado: '',
    color: '',
    fecha: '',
    obs: ''
})

const datos = reactive({
    nombre: '',
    idp: '',
    idpName: '',
    cargo: '',
    centroCostos: '',
    codigo: ''
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

const salir = () => {
    getSalir()
}

const editar = () => {
    clickModalSrf(true)
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

const clickModalSrf = (value) => {
    modalSrf.value = value
}

const clickModalObs = (value) => {
    modalObs.value = value
}

const actualizarSrf = async () => {
    clickModalSrf(false)
    updateSrf.formato.trueComplemento = trueComplemento.value
    const resultService = await updateSrfUse(updateSrf)
    if (resultService) {
        location.reload()
    } else {
        getLoadData()
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
    })
    clickModalObs(true)
}

const generarPDF = async () => {
    const pdf = {
        titulo: srf.formato?.titulo,
        numero: srf.numero,
        fecha: 'Fecha de Solicitud : ' + srf.fechaInicio,
        gestion: persona.value.idp + ' | ' + srf.gestion,

        seccionUno: srf.formato?.seccionUno,
        qr: dominio + '#/pages/srfpublico/' + srf.token,
        nombre: datos.nombre,
        idp: persona.value.idp,
        idpName: idpName.value + ":",
        email: persona.value.email,
        cargo: srf.cargo,
        costo: srf.centrocosto,
        codigo: srf.codigo,

        seccionDos: srf.formato?.seccionDos,
        fechaTituloFin: srf.formato?.fechaTitulo + ' : ',
        fechafin: srf.fechaFin,
        montoTitulo: srf.formato?.montoTitulo + ' : ',
        monto: formatearNumero(srf.monto) + ' ' + srf.moneda,
        descripcion: srf.formato?.descripcion + " : ",
        detalle: srf.detalle,

        //-condicional
        visibleDos: srf.formato?.trueEstadoDos,
        //obstitulo: srf.formato?.cuidado,
        texto: srf.formato?.detalleDos + ' : ' + srf.texto,
        numerico: srf.formato.cantidadDos + ' : ' + srf.numerico,

        visibleTres: srf.formato.estadoTres,
        seccionTres: srf.formato.seccionTres,
        obs: srf.formato.detalle,

        jefe: {
            nombre: lenFirma(srf.lista[0].jefe.nombre + ' ' + srf.lista[0].jefe.paterno + ' ' + srf.lista[0].jefe.materno),
            idp: srf.lista[0].jefe.idp,
            cargo: lenPdf(srf.lista[0].cargo)
        },
        pago: {
            nombre: lenFirma(srf.lista[srf.lista.length - 1].jefe.nombre + ' ' + srf.lista[srf.lista.length - 1].jefe.paterno + ' ' + srf.lista[srf.lista.length - 1].jefe.materno),
            idp: srf.lista[srf.lista.length - 1].jefe.idp,
            cargo: lenPdf(srf.lista[srf.lista.length - 1].cargo)
        },
        nombreFirma: lenFirma(datos.nombre),
        cargofirma: lenPdf(srf.cargo),

    }
    const docDefinition = crearSrfPdf(pdf)
    const name = persona.value.idp + '' + srf.id + '' + srf.numero + '.pdf'
    pdfMake.createPdf(docDefinition).download(name)
}

const getSalir = () => {
    router.push({
        name: 'ListaSRF',
        params: { estado: detalleProps.estado }
    })
}

const getLoadData = () => {
    updateSrf.id = srf.id
    updateSrf.fechaFin = srf.fechaFin
    updateSrf.monto = srf.monto
    updateSrf.moneda = srf.moneda
    updateSrf.detalle = srf.detalle
    updateSrf.texto = srf.texto
    updateSrf.numerico = srf.numerico
    updateSrf.formato = srf.formato
    trueComplemento.value = srf.formato?.trueComplemento

    datos.nombre = persona.value.nombre + " " + persona.value.paterno + " " + persona.value.materno
    datos.idpName = idpName
    datos.idp = persona.value.idp
    datos.cargo = srf.cargo
    datos.centroCostos = srf.centrocosto
    datos.codigo = srf.codigo
}


const getAction = () => {
    setActions([
        {
            visible: srf.editar ? true : false,
            label: 'Editar',
            icon: 'cil-pencil',
            color: 'secondary',
            variant: 'ghost',
            disabled: false,
            onClick: editar
        },
        {
            visible: true,
            label: 'PDF',
            icon: 'cil-data-transfer-down',
            color: 'success',
            variant: 'ghost',
            disabled: srf.pdf ? true : false,
            onClick: generarPDF
        },
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
        await getSrfUsuarioUse(detalleProps.idSrf, persona.value.id)
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