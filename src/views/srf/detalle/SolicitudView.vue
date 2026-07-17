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
              <h5><strong>{{ srf.formato?.titulo }}</strong></h5>
            </CCol>
            <CCol :xs="5" :sm="4" :md="5" :lg="5" class="text-end">
              <CRow>
                <CButtonGroup role="group" size="sm">
                  <CButton v-if="updateApr.estado !== 'APROBADO'" color="success" variant="outline"
                    @click="AprobarSolicitud()" v-c-tooltip="{ content: 'Aprobar Solicitud ', placement: 'top' }">
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
            <CAlert color="secondary" :style="vars">I. {{ srf.formato?.seccionUno }}</CAlert>

            <ComponenteDatos :datos="datos" />

            <CAlert color="secondary" :style="vars">II. {{ srf.formato?.seccionDos }}</CAlert>

            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText class="headercolor d-none d-md-inline" as="label">{{ srf.formato?.fecha }} :
              </CInputGroupText>
              <CFormInput type="text" :value="srf.fechaFin" disabled />
              <CInputGroupText class="headercolor" as="label">{{ srf.formato?.monto }} :
              </CInputGroupText>
              <CFormInput type="text" :value="srf.monto" disabled />
            </CInputGroup>
            <CAlert color="secondary">
              {{ srf.detalle }}
            </CAlert>

            <hr>
            <div v-if="srf.formato?.trueEstadoDos">

              <CInputGroup size="sm" class="mb-3">
                <CInputGroupText class="headercolor" as="label">{{ srf.formato?.detalleDos }} :
                </CInputGroupText>
                <CFormInput type="text" :value="srf.texto" disabled />

                <CInputGroupText class="headercolor" as="label">{{ srf.formato?.cantidadDos }} :
                </CInputGroupText>
                <CFormInput type="text" :value="srf.numerico" disabled />
              </CInputGroup>
            </div>

            <div v-if="srf.formato?.estadoTres">
              <CAccordion>
                <CAccordionItem>
                  <CAccordionHeader>
                    III. {{ srf.formato?.seccionTres }}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CAlert>{{ srf.formato?.detalle }}</CAlert>
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

  <!-- Modal  Rechazar-->
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
              <CFormInput type="text" v-model="observacion" placeholder="Otros motivos de Rechazo"
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
  <!-- End Modal Rechazar-->

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
              <CInputGroupText class="headercolor" as="label">Motivo :
              </CInputGroupText>
              <CFormInput type="text" v-model="observacion" placeholder="Motivo de Devolucion" required />
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
import ComponenteDatos from '@/components/srf/ComponenteDatos.vue'
import { useFunction } from '@/composables/useFunction'
const { getColor, getIcono } = useFunction()

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100

import { useAlert } from '@/composables/useAlert'
import { CContainer, CModal } from '@coreui/vue'
const { confirm, error, success } = useAlert()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
import { useUsuario } from '@/composables/useUsuario'
const { getDatosUse } = useUsuario()

const persona = auth.persona
const idUsuario = ref(auth.idUsuario)
const perfil = ref(null)
const idpName = ref(auth.idpName)

import { useAprobacion } from '@/composables/useAprobacion'
import router from '../../../router'

const { updateAprobacionUse, getAprUse, srf } = useAprobacion()

const updateApr = reactive({
  idApr: null,
  destino: 0,
  estado: '',
  tipo: '',
  idPersona: null,
  idSrf: null,
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

const canvaApr = ref(false)
const modalRechazar = ref(false)
const modalDevolver = ref(false)
const color = ref('danger')
const icon = ref('')
const motivoSeleccionado = ref('ninguna')
const observacion = ref('')

const getFoto = (value) => {
  return value === 'usuario.png' ? '/public/usuario.png' : API_URL_IMG100 + value
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

const AprobarSolicitud = async () => {
  getTool()
  updateApr.estado = 'APROBADO'
  const ob = updateApr.obs === 'PENDIENTE' ? 'Ninguno' : (updateApr.obs + ' | Ninguno')
  updateApr.obs = ob
  const sms = "Solictud Aprobada Correctamente"
  const resultService = await updateAprobacionUse(updateApr, srf.numero, srf.monto, srf.nombre, sms,'Aprobar Solicitud ?')
  if (resultService) {
    router.push({
      name: 'SolicitudSRF',
      params: { solicitud: 'pendiente' }
    })
  } else {
    getLoadData()
  }

}

const RechazarSolicitud = async () => {
  clickModalRechazar(false)
  updateApr.estado = 'RECHAZADO'
  updateApr.obs = motivoSeleccionado.value === 'otros' ? observacion.value : motivoSeleccionado.value
  const sms = "Solictud Rechazada Correctamente"
  const resultService = await updateAprobacionUse(updateApr, srf.numero, srf.monto, srf.nombre, sms)
  if (resultService) {
    router.push({
      name: 'SolicitudSRF',
      params: { solicitud: 'pendiente' }
    })
  } else {
    getLoadData()
  }
}

const DevolverSolicitud = async () => {
  clickModalDevolver(false)
  updateApr.estado = 'DEVUELTO'
  updateApr.obs = observacion.value
  const sms = "Solictud Devuelta Correctamente"
  const resultService = await updateAprobacionUse(updateApr, srf.numero, srf.monto, srf.nombre, sms)
  if (resultService) {
    router.push({
      name: 'SolicitudSRF',
      params: { solicitud: 'pendiente' }
    })
  } else {
    getLoadData()
  }
}

// para personalizacion de los Alerts
const vars = {
  '--cui-alert-padding-y': '2px',
  '--cui-alert-border-radius': '0px'
}

const getLoadData = () => {
  updateApr.idApr = srf.idApr
  updateApr.destino = srf.destino
  updateApr.estado = srf.estado
  updateApr.idSrf = srf.id
  updateApr.idPersona = idUsuario.value
  updateApr.obs = srf.obs
  color.value = getColor(srf.estado)
  icon.value = getIcono(srf.estado)

  datos.nombre = srf.nombre
  datos.idpName = idpName
  datos.idp = srf.idp
  datos.cargo = srf.cargo
  datos.centroCostos = srf.centrocosto
  datos.codigo = srf.codigo
}
const getTool = () => {
  const tooltips = document.querySelectorAll('.tooltip')
  tooltips.forEach(tooltip => tooltip.remove())
}

onMounted(async () => {
  getTool()
  await getAprUse(idUsuario.value, solicitud.idSrf)
  getLoadData()
})

</script>