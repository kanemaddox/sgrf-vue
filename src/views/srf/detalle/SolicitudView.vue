<template>
  <CRow>

    <CCol :xs="0" :sm="1" :md="1" :lg="1" class="align-self-start">
    </CCol>

    <CCol :xs="12" :sm="10" :md="10" :lg="10" class="align-self-center">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <div class="align-items-center">
            <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
            <CChip :color="color">
              <span class="chip-icon">
                <i :class="icon"></i>
              </span>{{ updateApr.estado }}
            </CChip>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :xs="7" :sm="8" :md="7" :lg="7">
              <h5><strong>{{ formato?.value.titulo }}</strong></h5>
            </CCol>
            <CCol :xs="5" :sm="4" :md="5" :lg="5" class="text-end">
              <CRow>
                <CButtonGroup role="group" size="sm">
                  <CButton v-if="updateApr.estado !== 'APROBADO'" color="success" variant="outline"
                    @click="AprobarSolicitud()"
                    v-c-tooltip="{ content: 'Aprobar Solicitud ' + srf.numero, placement: 'top' }">
                    <i class="bi bi-hand-thumbs-up d-inline-block"></i> <span
                      class="small d-none d-md-inline">Aprobar</span>
                  </CButton>

                  <CButton v-if="updateApr.estado !== 'APROBADO'" color="secondary" variant="outline"
                    @click="clickModalDevolver(true)"
                    v-c-tooltip="{ content: 'Devolver para Modificacion', placement: 'top' }">
                    <i class="bi bi-send-arrow-down me-2"></i>
                  </CButton>

                  <CButton v-if="updateApr.estado !== 'APROBADO'" color="danger" class="font"
                    @click="clickModalRechazar(true)" v-c-tooltip="{ content: 'Rechazar Solicitud', placement: 'top' }">
                    <i class="bi bi-trash3 me-2"></i>
                  </CButton>

                  <CButton color="secondary" variant="outline" @click="clickCanvaApr(true)"
                    v-c-tooltip="{ content: 'Lista de Autorizadores', placement: 'top' }">
                    <i class="bi bi-inboxes me-2"></i>
                  </CButton>
                </CButtonGroup>
              </CRow>
              <h3><strong>No.: {{ srf.numero }}</strong> </h3>
              <div class="space">{{ srf.idp }} | {{ srf.gestion }}</div>
            </CCol>
          </CRow>
          <div>
            <CAlert color="success" :style="vars">Fecha de solicitud: {{ srf.fechaInicio }}</CAlert>
            <CAlert color="secondary" :style="vars">I. {{ formato?.value.seccionUno }}</CAlert>

            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText class="headercolor d-none d-md-inline" as="label">Nombre Completo
              </CInputGroupText>
              <CFormInput type="text" :value="srf.nombre" disabled />
              <CInputGroupText class="headercolor" as="label">IDP</CInputGroupText>
              <CFormInput type="text" :value="srf.idp" disabled />
            </CInputGroup>

            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText class="headercolor" as="label">Cargo</CInputGroupText>
              <CFormInput type="text" :value="srf.cargo" disabled />
            </CInputGroup>

            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText class="headercolor d-none d-md-inline" as="label">Centro de Costos
              </CInputGroupText>
              <CFormInput type="text" :value="srf.costo" disabled />
              <CInputGroupText class="headercolor" as="label">CC</CInputGroupText>
              <CFormInput type="text" :value="srf.codigo" disabled />
            </CInputGroup>


            <CAlert color="secondary" :style="vars">II. {{ formato?.value.seccionDos }}</CAlert>

            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText class="headercolor d-none d-md-inline" as="label">{{ formato.value.fecha }}
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
              <CAccordion>
                <CAccordionItem>
                  <CAccordionHeader>
                    III. {{ formato?.value.seccionTres }}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CAlert>{{ formato?.value.detalle }}</CAlert>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </div>
          </div>
        </CCardBody>
        <CCardFooter class="text-center">

        </CCardFooter>
      </CCard>
    </CCol>

    <CCol :xs="0" :sm="1" :md="1" :lg="1" class="align-self-end">
    </CCol>
  </CRow>

  <!--Canvas Lista de Aprobadores-->
  <COffcanvas placement="end" :visible="canvaApr" @hide="clickCanvaApr(false)">
    <COffcanvasHeader>
      <COffcanvasTitle>Estado de Solicitud</COffcanvasTitle>
      <CCloseButton class="text-reset" @click="clickCanvaApr(false)" />
    </COffcanvasHeader>
    <COffcanvasBody>
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
              <CAvatar size="md" :src="getFoto(item.persona.foto)" :status="getColor(item.estado)" />
            </CTableDataCell>
            <CTableDataCell>
              <div>{{ item.persona.nombre }}</div>
              <div class="small text-body-secondary text-nowrap">
                <span>{{ item.persona.idp }}</span> |
                <CChip :color="getColor(item.estado)">
                  <span class="chip-icon">
                    <i :class="getIcono(item.estado)"></i>
                  </span>{{ item.estado }}
                </CChip>
              </div>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </COffcanvasBody>
  </COffcanvas>
  <!--End Canvas Lista de Aprobadores-->

  <!-- Modal  Observaciones-->
  <CModal :visible="modalRechazar" backdrop="static" @close="clickModalRechazar(false)">
    <CForm @submit.prevent="RechazarSolicitud">
      <CModalHeader class="headercolor" dismiss @close="clickModalRechazar(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-trash" size="lg" class="me-2" />Rechazar Solicitud
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="danger">
          <CIcon icon="cil-trash" size="lg" class="me-2" />Motivos del Rechazo
        </CAlert>
        <CContainer>
          <CRow>
            <CCol :xs="6">
              <CFormCheck type="radio" name="obs" id="flex1" label="Moneda Incorrecta" value="Moneda Incorrecta"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex2" label="Detalle Insuficiente" value="Detalle Insuficiente"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex3" label="Solicitud Injustificada"
                value="Solicitud Injustificada" v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex4" label="Monto Exesivo" value="Monto Exesivo"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex5" label="Fondos Insuficientes" value="Fondos Insuficientes"
                v-model="motivoSeleccionado" required />
            </CCol>
            <CCol :xs="6">
              <CFormCheck type="radio" name="obs" id="flex6" label="No Corresponde" value="No Corresponde"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex7" label="Monto Insuficiente" value="Monto Insuficiente"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex8" label="Fecha Incompatible" value="Fecha Incompatible"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex9" label="Corto Plazo" value="Corto Plazo"
                v-model="motivoSeleccionado" required />
            </CCol>
            <hr>
            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText>
                <CFormCheck type="radio" value="otros" name="obs" id="flex10" v-model="motivoSeleccionado" required />
              </CInputGroupText>
              <CFormInput type="text" v-model="updateApr.obs" placeholder="Otros motivos de Rechazo"
                :disabled="motivoSeleccionado !== 'otros'" />
            </CInputGroup>
          </CRow>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalRechazar(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>

        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />
          <span>Aceptar</span>
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Observaciones-->

  <!-- Modal  Devolver-->
  <CModal :visible="modalDevolver" backdrop="static" @close="clickModalDevolver(false)">
    <CForm @submit.prevent="DevolverSolicitud">
      <CModalHeader class="headercolor" dismiss @close="clickModalDevolver(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-send" size="lg" class="me-2" />Devolver Solicitud
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="info">
          <CIcon icon="cil-send" size="lg" class="me-2" />Motivos de la Devolucion
        </CAlert>
        <CContainer>
          <CRow>
            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText class="headercolor" as="label">Motivo
              </CInputGroupText>
              <CFormInput type="text" v-model="updateApr.obs" placeholder="Motivo de Devolucion" required/>
            </CInputGroup>
          </CRow>
        </CContainer>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalDevolver(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>

        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />
          <span>Aceptar</span>
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Devolver-->

</template>
<script setup>
const solicitud = defineProps({
  solicitud: {
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
import { CContainer, CModal } from '@coreui/vue'
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
    estadoTres: false,
  },
  fecha: '',
})

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
import { useUsuario } from '@/composables/useUsuario'
const { getDatosUse } = useUsuario()

const persona = auth.persona
const idUsuario = ref(auth.idUsuario)
const perfil = ref(null)

import { useAprobacion } from '@/composables/useAprobacion'
import router from '../../../router'
const { updateAprobacionUse, getAprUse } = useAprobacion()

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
  nombre: '',
  idp: '',
  cargo: '',
  codigo: '',
  costo: '',
  lista: []
})
const updateApr = reactive({
  idApr: null,
  destino: 0,
  estado: '',
  tipo: '',
  idPersona: null,
  idSrf: null,
  obs: ''
})

const canvaApr = ref(false)
const modalRechazar = ref(false)
const modalDevolver = ref(false)
const color = ref('danger')
const icon = ref('')
const motivoSeleccionado = ref('ninguna')

const getFoto = (value) => {
  return value === 'usuario.png' ? '/public/usuario.png' : API_URL_IMG100 + value
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
const clickCanvaApr = (value) => {
  canvaApr.value = value
}

const clickModalRechazar = (value) => {
  modalRechazar.value = value
}

const clickModalDevolver = (value) => {
  modalDevolver.value = value
}

const getApr = async (value) => {
  try {
    const aprResult = await getAprUse(idUsuario.value, value)
    srf.id = aprResult.srf.id
    srf.numero = aprResult.srf.numero
    srf.gestion = aprResult.srf.gestion
    srf.fechaInicio = aprResult.srf.fechaSolicitud
    srf.fechaFin = aprResult.srf.fechaEstimada.split('T')[0]
    srf.monto = aprResult.srf.monto + ' ' + aprResult.srf.moneda
    srf.moneda = aprResult.srf.moneda
    srf.detalle = aprResult.srf.detalle
    srf.numerico = aprResult.srf.campoNumerico
    srf.texto = aprResult.srf.campoTexto
    srf.tipo = aprResult.srf.tipo
    srf.estado = aprResult.srf.estado
    srf.lista = aprResult.srf.autorizador
    srf.nombre = aprResult.srf.empleado.persona.nombre + ' ' + aprResult.srf.empleado.persona.paterno + ' ' + aprResult.srf.empleado.persona.materno
    srf.idp = aprResult.srf.empleado.persona.idp
    srf.cargo = aprResult.srf.cargo
    srf.costo = aprResult.srf.centrocosto
    srf.codigo = aprResult.srf.codigo
    updateApr.idApr = aprResult.id
    updateApr.destino = aprResult.destino
    updateApr.estado = aprResult.estado
    updateApr.idSrf = aprResult.srf.id
    updateApr.idPersona = idUsuario.value
    color.value = getColor(aprResult.estado)
    icon.value = getIcono(aprResult.estado)
  } catch (errr) {
    console.log(errr)
  }

}

const AprobarSolicitud = async () => {
  const detail = 'Solicitud No. ' + srf.numero + ', por ' + srf.monto + ', Solicitado por ' + srf.nombre
  const resultAlert = await confirm('Aprobar Solicitud', detail, '')
  if (resultAlert.isConfirmed) {
    try {
      updateApr.estado = 'APROBADO'
      updateApr.obs = 'Ninguno'
      const resultService = await updateAprobacionUse(updateApr)
      if (resultService.status == 200) {
        await success('Well Done!', 'Solicitud Aprobada y enviada a ', '', '')
        location.reload()
      }
      else {
        await error('Error!', 'Datos Incorrectos verifique e intente nuevamente', '')
      }
    } catch (errr) {
      await error('Error!', 'Servicio no Disponible', errr)
    }
  }
  else {
    await error('Aprobacion Cancelada', detail, '')
  }
}

const RechazarSolicitud = async () => {
  clickModalRechazar(false)
  const detail = 'Solicitud No. ' + srf.numero + ', por ' + srf.monto + ', Solicitado por ' + srf.nombre
  const resultAlert = await confirm('Rechazar Solicitud', detail, '')
  if (resultAlert.isConfirmed) {
    try {
      updateApr.estado = 'RECHAZADO'
      updateApr.obs = motivoSeleccionado.value === 'otros' ? updateApr.obs : motivoSeleccionado.value
      const resultService = await updateAprobacionUse(updateApr)
      if (resultService.status == 200) {
        await success('Well Done!', 'Solicitud Rechazada correctamente ', '', '')
        location.reload()
      }
      else {
        await error('Error!', 'Datos Incorrectos verifique e intente nuevamente', '')
      }
    } catch (errr) {
      await error('Error!', 'Servicio no Disponible', errr)
    }
  }
  else {
    await error('Rechazo Cancelado', detail, '')
  }
}

const DevolverSolicitud = async () => {
  clickModalDevolver(false)
  const detail = 'Solicitud No. ' + srf.numero + ', por ' + srf.monto + ', Solicitado por ' + srf.nombre
  const resultAlert = await confirm('Devolver Solicitud', detail, '')
  if (resultAlert.isConfirmed) {
    try {
      updateApr.estado = 'DEVUELTO'
      const resultService = await updateAprobacionUse(updateApr)
      if (resultService.status == 200) {
        const result = await success('Well Done!', 'Solicitud Devuelta Correctamente ', '', '')
        if (result.isConfirmed) {
          router.push({
            name: 'SolicitudSRF',
            params: { solicitud: 'pendiente' }
          })
        }
      }
      else {
        await error('Error!', 'Datos Incorrectos verifique e intente nuevamente', '')
      }
    } catch (errr) {
      await error('Error!', 'Servicio no Disponible', errr)
    }
  }
  else {
    await error('Rechazo Cancelado', detail, '')
  }
}

const vars = {
  '--cui-alert-padding-y': '2px',
  '--cui-alert-border-radius': '0px'
}

onMounted(() => {
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => tooltip.remove());
  getFormato()
  getApr(solicitud.idSrf)
})
</script>