<template>
  <CRow>
    <CCol :xs="12" :sm="12" :md="12" :lg="12">
      <CCard>
        <!--Numero de Formulario y estado -->
        <CCardHeader class="headercolor">
          <CRow>
            <CCol :xs="12" :sm="6" :md="6" :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                <CChip :color="getColor(rdg.estadoAprobacion)">
                  <span class="chip-icon">
                    <i :class="getIcono(rdg.estadoAprobacion)"></i>
                  </span>{{ rdg.estadoAprobacion }}
                </CChip>
              </div>
            </CCol>
            <CCol :xs="12" :sm="6" :md="6" :lg="6" class="text-end">
              <h3><strong>No.: {{ rdg.numero }}</strong> </h3>
              <div class="space">{{ rdg.idp }} | {{ rdg.gestion }}</div>
            </CCol>
          </CRow>
        </CCardHeader>
        <!--Numero de Formulario y estado -->
        <CCardBody>
          <CRow v-if="!rdg.boton" class="d-md-none">
            <CCol :xs="12" :sm="12" :md="12" :lg="12">
              <CRow>
                <CButton  color="success" size="sm" class="font custom-hover-btn"
                  @click="updateAprobar()">
                  <i class="bi bi-hand-thumbs-up d-inline-block me-2"></i>
                  <span>Aprobar</span>
                </CButton>
              </CRow>
              <br>
            </CCol>
          </CRow>
          <!--Botones-->
          <CRow>
            <CCol :xs="12" :sm="5" :md="5" :lg="5">
              <h5><strong>{{ rdg.formato?.titulo }}</strong></h5>
              <div class="space" v-if="Number(rdg.importe) === 0">Sin Formulario de Solicitud</div>
            </CCol>

            <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
              <h3>{{ formatearNumero(rdg.importe) }} {{ rdg.moneda }}</h3>
              <div class="space">Importe Recibido</div>
            </CCol>

            <CCol :xs="12" :sm="3" :md="3" :lg="3" class="text-end d-none d-md-inline" >
              <CRow>
                <CButton v-if="!rdg.boton" color="success" size="sm" class="font custom-hover-btn"
                  @click="updateAprobar()">
                  <i class="bi bi-hand-thumbs-up d-inline-block me-2"></i>
                  <span>Aprobar</span>
                </CButton>
              </CRow>
            </CCol>
          </CRow>
          <!--Botones-->

          <br>
          <CAlert color="success" :style="vars">Fecha : {{ rdg.fecha }}</CAlert>
          <CTabs :activeItemKey="1">
            <!-- Tab Encavezados-->
            <CTabList variant="tabs" layout="justified">

              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="1">
                <CIcon icon="cil-user"></CIcon>
                <span class="d-none d-md-inline">Seccion I</span>
              </CTab>
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="2">
                <CIcon icon="cil-tags"></CIcon>
                <span class="d-none d-md-inline">Seccion II</span>
              </CTab>
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="3">
                <CIcon icon="cil-storage"></CIcon>
                <span class="d-none d-md-inline">Seccion III</span>
              </CTab>
              <CTab class="d-flex align-items-center gap-2 px-3 " :itemKey="4">
                <CIcon icon="cil-clipboard"></CIcon>
                <span class="d-none d-md-inline">Resumen IV</span>
              </CTab>

              <CTab v-if="Number(rdg.devolver) > 0" class="d-flex align-items-center gap-2 px-3 " :itemKey="5">
                <CIcon icon="cil-clipboard"></CIcon>
                <span class="d-none d-md-inline">Seccion V</span>
              </CTab>
            </CTabList>
            <!-- Tab Encavezados-->

            <!-- Tab Contenido-->
            <CTabContent>
              <!-- Tab Seccion I-->
              <CTabPanel class="p-3" :itemKey="1">
                <CAlert color="secondary" :style="vars">I. {{ valores.seccionUno }}</CAlert>
                <ComponenteDetalle1 :datos="datos" />
              </CTabPanel>
              <!-- Tab Seccion I-->

              <!-- Tab Seccion II-->
              <CTabPanel class="p-3" :itemKey="2">
                <CAlert color="secondary" :style="vars">II. {{ valores.seccionDos }}</CAlert>
                <ComponenteRevisar2 :datos="rdg" />
              </CTabPanel>
              <!-- Tab Seccion II-->

              <!-- Tab Seccion III-->
              <CTabPanel class="p-3" :itemKey="3">
                <CAlert color="secondary" :style="vars">III. {{ valores.seccionTres }}</CAlert>
                <ComponenteRevisar3 :datos="rdg" />
              </CTabPanel>
              <!-- Tab Seccion III-->

              <!-- Tab Seccion IV-->
              <CTabPanel class="p-3" :itemKey="4">
                <CAlert color="secondary" :style="vars">IV. RESUMEN</CAlert>
                <ComponenteCuenta :datos="rdg" />
              </CTabPanel>
              <!-- Tab Seccion IV-->

              <!-- Tab Seccion V-->
              <CTabPanel class="p-3" :itemKey="5">
                <ComponenteRevisar4 :datos="rdg" />
              </CTabPanel>
              <!-- Tab Seccion IV-->
            </CTabContent>
            <!-- Tab Contenido-->
          </CTabs>
        </CCardBody>

        <CCardFooter>
          <CRow>
            <CCol :xs="12" :sm="9" :md="9" :lg="9"></CCol>
            <CCol :xs="12" :sm="3" :md="3" :lg="3" class="text-end">
              <CRow>
                <CButton v-if="!rdg.boton" color="success" size="sm" class="font custom-hover-btn"
                  @click="updateAprobar()">
                  <i class="bi bi-hand-thumbs-up d-inline-block me-2"></i>
                  <span>Aprobar</span>
                </CButton>
              </CRow>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <br>
    </CCol>
  </CRow>

  <!--
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
              </span>{{ rdg.estadoAprobacion }}
            </CChip>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :xs="7" :sm="8" :md="7" :lg="7">
              <h5><strong>{{ rdg.formato?.titulo }}</strong></h5>
            </CCol>
            <CCol :xs="5" :sm="4" :md="5" :lg="5" class="text-end">
              <CRow>
                <CButtonGroup role="group" size="sm">
                  <CButton v-if="rdg.estadoAprobacion !== 'APROBADO'" color="success" variant="outline"
                    @click="AprobarSolicitud()" v-c-tooltip="{ content: 'Aprobar Solicitud ', placement: 'top' }">
                    <i class="bi bi-hand-thumbs-up d-inline-block"></i> <span
                      class="small d-none d-md-inline">Aprobar</span>
                  </CButton>

                  <CButton v-if="rdg.estadoAprobacion !== 'APROBADO'" color="secondary" variant="outline"
                    @click="clickModalDevolver(true)"
                    v-c-tooltip="{ content: 'Devolver para Modificacion', placement: 'top' }">
                    <i class="bi bi-send-arrow-down me-2"></i>
                  </CButton>

                  <CButton v-if="rdg.estadoAprobacion !== 'APROBADO'" color="danger" class="font"
                    @click="clickModalRechazar(true)" v-c-tooltip="{ content: 'Rechazar Solicitud', placement: 'top' }">
                    <i class="bi bi-trash3 me-2"></i>
                  </CButton>

                  <CButton color="secondary" variant="outline" @click="clickCanvaApr(true)"
                    v-c-tooltip="{ content: 'Lista de Autorizadores', placement: 'top' }">
                    <i class="bi bi-inboxes me-2"></i>
                  </CButton>
                </CButtonGroup>
              </CRow>
              <h3><strong>No.: {{ rdg.numero }}</strong> </h3>
              <div class="space">{{ rdg.idp }} | {{ rdg.gestion }}</div>
            </CCol>
          </CRow>
          <hr>
          <CRow>
            <CCol :xs="12" :sm="8" :md="8" :lg="8">
              <CAlert color="success" :style="vars">Fecha : {{ rdg.fecha }}</CAlert>
            </CCol>
            <CCol :xs="12" :sm="4" :md="4" :lg="4" class="text-end">
              <h3>{{ rdg.importe }} {{ rdg.moneda }}</h3>
              <div class="space">Importe Recibido</div>
            </CCol>
          </CRow>

          <CAccordion :style="vars">
            <CAccordionItem :item-key="1">
              <CAccordionHeader>
                I. {{ valores.seccionUno }}
              </CAccordionHeader>
              <CAccordionBody>
                <ComponenteDetalle1 :datos="datos" />
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          <hr>
          <CAccordion :style="vars">
            <CAccordionItem :item-key="2">
              <CAccordionHeader>
                II. {{ valores.seccionDos }}
              </CAccordionHeader>
              <CAccordionBody>
                <ComponenteDetalle2 :datos="rdg" />
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          <hr>
          <CAlert color="secondary" :style="vars">III. {{ valores.seccionTres }}</CAlert>
          <ComponenteRevisar3 :datos="rdg" />

          <CAlert color="secondary" :style="vars">IV. RESUMEN</CAlert>
          <ComponenteCuenta :datos="rdg" />

        </CCardBody>

      </CCard>
    </CCol>
    <CCol :xs="0" :sm="1" :md="1" :lg="1" class="align-self-end">
    </CCol>
  </CRow>
  -->
  <!--Canvas Lista de Aprobadores-->
  <COffcanvas placement="end" :visible="canvaApr" @hide="clickCanvaApr(false)">
    <COffcanvasHeader>
      <COffcanvasTitle>Estado de Rendicion</COffcanvasTitle>
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
          <CTableRow v-for="item in rdg.aprobadores" :key="item.name">
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

  <!-- Modal  Devolver-->
  <CModal :visible="modalDevolver" backdrop="static" @close="clickModalDevolver(false)">
    <CForm @submit.prevent="updateDevolver">
      <CModalHeader class="headercolor" dismiss @close="clickModalDevolver(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-send" size="lg" class="me-2" />Devolver
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="info">
          <CIcon icon="cil-send" size="lg" class="me-2" />Motivos de la Devolucion
        </CAlert>
        <CContainer>
          <CRow>
            <CCol :xs="6">
              <CFormCheck type="radio" name="obs" id="flex1" label="Moneda Incorrecta" value="Moneda Incorrecta"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex2" label="Detalle Insuficiente" value="Detalle Insuficiente"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex3" label="Sin Documentos" value="Sin Documentos"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex4" label="Facturas no Correspondientes"
                value="Facturas no Correspondientes" v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex5" label="Fechas Invalidas en los Documentos"
                value="Fechas Invalidas en los Documentos" v-model="motivoSeleccionado" required />
            </CCol>
            <CCol :xs="6">
              <CFormCheck type="radio" name="obs" id="flex6" label="No Corresponde" value="No Corresponde"
                v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex7" label="Documentos con baja calidad"
                value="Documentos con baja calidad" v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex8" label="Gastos no Correspondientes a la Solicitud"
                value="Gastos no Correspondientes a la Solicitud" v-model="motivoSeleccionado" required />
              <CFormCheck type="radio" name="obs" id="flex9" label="Tiempo excesivo para rendicion"
                value="Tiempo excesivo para rendicion" v-model="motivoSeleccionado" required />
            </CCol>
            <hr>
            <CInputGroup size="sm" class="mb-3">
              <CInputGroupText>
                <CFormCheck type="radio" value="otros" name="obs" id="flex10" v-model="motivoSeleccionado" required />
              </CInputGroupText>
              <CFormInput type="text" v-model="observacion" placeholder="Otros motivos de Devolucion"
                :disabled="motivoSeleccionado !== 'otros'" />
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

  <!-- Modal  Rechazar-->
  <CModal :visible="modalRechazar" backdrop="static" @close="clickModalRechazar(false)">
    <CForm @submit.prevent="updateRechazar">
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



</template>
<script setup>
const lista = defineProps({
  rendicion: {
    type: String,
    required: true
  },
  idRdg: {
    type: String,
    required: true
  }
})

import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()


import { useAlert } from '@/composables/useAlert'
const { dataLoading, close, confirm } = useAlert()

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100

import { useAprobacionRdg } from '@/composables/Aprobacion/useRdg'
const { updateAprobacionRdgUse, getRdgRevisarUse, rdg } = useAprobacionRdg()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()

import ComponenteDetalle1 from '@/components/rdg/ComponenteDetalle1.vue'
import ComponenteRevisar2 from '@/components/rdg/ComponenteRevisar2.vue'
import ComponenteRevisar3 from '@/components/rdg/ComponenteRevisar3.vue'
import ComponenteRevisar4 from '@/components/rdg/ComponenteRevisar4.vue'
import ComponenteCuenta from '@/components/rdg/ComponenteCuenta.vue'

import { useFunction } from '@/composables/useFunction'
const { getColor, getIcono, formatearNumero } = useFunction()

const persona = ref(auth.persona)
const idpName = ref(auth.idpName)

const valores = ref({
  titulo: "",
  seccionUno: "",
  seccionDos: "",
  seccionTres: "",
})

const datos = reactive({
  nombre: '',
  idp: '',
  idpName: '',
  cargo: '',
  area: '',
  centrocostos: '',
  codigo: '',
  tipo: '',
  cuenta: '',
  banco: ''
})
const sms = reactive({
  titulo: '',
  detalle: ''
})

const canvaApr = ref(false)
const modalRechazar = ref(false)
const modalDevolver = ref(false)
const color = ref('danger')
const icon = ref('')
const obs = ref('Ninguno')
const motivoSeleccionado = ref('ninguna')
const observacion = ref('')

const salir = () => {
  getSalir()
}
const cancelar = () => {
  getCancelar()
}
const aprobadores = () => {
  clickCanvaApr(true)
}
const rechazar = () => {
  clickModalRechazar(true)
}
const devolver = () => {
  clickModalDevolver(true)
}


const getFoto = (value) => {
  return value === 'usuario.png' ? '/usuario.png' : img100 + value
}

const clickCanvaApr = (value) => {
  canvaApr.value = value
}

const getLoadData = () => {
  color.value = getColor(rdg.estadoAprobacion)
  icon.value = getIcono(rdg.estadoAprobacion)
  valores.value = { ...rdg.formato }
  datos.nombre = rdg.nombre
  datos.idp = rdg.idp
  datos.idpName = idpName
  datos.cargo = rdg.cargo
  datos.area = rdg.area
  datos.centrocostos = rdg.centrocostos
  datos.codigo = rdg.codigo
  datos.tipo = rdg.tipoCuenta
  datos.cuenta = rdg.cuenta
  datos.banco = rdg.banco

}

const getTool = () => {
  const tooltips = document.querySelectorAll('.tooltip')
  tooltips.forEach(tooltip => tooltip.remove())
}

const vars = {
  '--cui-alert-padding-y': '2px',
  '--cui-alert-border-radius': '0px'
}


const updateAprobar = async () => {
  sms.titulo = 'Aprobar Formulario'
  sms.detalle = 'Desea Aprobar el Formulario ????'
  obs.value = 'Ninguno'
  const estado = ref('APROBADO')
  const resultService = await updateAprobacionRdgUse(persona.value.id, rdg, obs.value, estado.value, sms)
  if (resultService) {
    getRevisar()
  } else {
    location.reload()
  }
}

const updateDevolver = async () => {
  clickModalDevolver(false)
  sms.titulo = 'Devolver Formulario'
  sms.detalle = 'Desea Devolver el Formulario ????'
  obs.value = motivoSeleccionado.value === 'otros' ? observacion.value : motivoSeleccionado.value
  const estado = ref('DEVUELTO')
  const resultService = await updateAprobacionRdgUse(persona.value.id, rdg, obs.value, estado.value, sms)
  if (resultService) {
    getRevisar()
  } else {
    location.reload()
  }
}

const updateRechazar = async () => {
  clickModalRechazar(false)
  sms.titulo = 'Devolver Formulario'
  sms.detalle = 'Desea Devolver el Formulario ????'
  obs.value = motivoSeleccionado.value === 'otros' ? observacion.value : motivoSeleccionado.value
  const estado = ref('DEVUELTO')
  const resultService = await updateAprobacionRdgUse(persona.value.id, rdg, obs.value, estado.value, sms)
  if (resultService) {
    getRevisar()
  } else {
    location.reload()
  }
}


const clickModalDevolver = (value) => {
  modalDevolver.value = value
}
const clickModalRechazar = (value) => {
  modalRechazar.value = value
}

const getRevisar = () => {
  router.push({
    name: 'RendicionRdg',
    params: { rendicion: 'pendiente' }
  })
}

const getCancelar = async () => {
  const resultAlert = await confirm('Cancelar', 'Desea cancelar la revicion ????', '')
  if (resultAlert.isConfirmed) {
    router.push({
      name: 'RendicionRdg',
      params: { rendicion: lista.rendicion }
    })
  }
}
const getSalir = () => {
  router.push({
    name: 'RendicionRdg',
    params: { rendicion: lista.rendicion }
  })
}

const getAction = () => {
  setActions([
    {
      visible: rdg.estadoAprobacion !== 'APROBADO' ? true : false,
      label: 'Devolver',
      icon: 'cil-cursor',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      movile: 'd-none d-md-inline',
      onClick: devolver
    },
    {
      visible: rdg.estadoAprobacion !== 'APROBADO' ? true : false,
      label: 'Rechazar',
      icon: 'cil-trash',
      color: 'danger',
      variant: 'ghost',
      disabled: false,
      movile: 'd-none d-md-inline',
      onClick: rechazar
    },
    {
      visible: true,
      label: 'Detalle',
      icon: 'cil-user',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      movile: 'd-none d-md-inline',
      onClick: aprobadores
    },
    {
      visible: rdg.estadoAprobacion !== 'APROBADO' ? true : false,
      label: 'Cancelar',
      icon: 'cil-x',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      movile: 'd-none d-md-inline',
      onClick: cancelar
    },
    {
      visible: rdg.estadoAprobacion === 'APROBADO' ? true : false,
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
  getTool()
  dataLoading()
  try {
    await getRdgRevisarUse(persona.value.id, lista.idRdg)
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