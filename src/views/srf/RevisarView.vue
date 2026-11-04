<template>
  <CRow>
    <CCol :xs="0" :sm="1" :md="1" :lg="1" class="align-self-start">
    </CCol>

    <!-- ==================================================================== -->
    <!-- Formulario de Revision de solisitud                                   -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="10" :md="10" :lg="10" class="align-self-center">
      <CCard>

        <CCardHeader class="headercolor justify-content-between align-items-center">
          <div class="align-items-center">
            <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
            <CChip :color="color"><span class="chip-icon"><i :class="icon"></i></span>
              {{ updateApr.estado }}
            </CChip>
          </div>
        </CCardHeader>

        <CCardBody>
          <CRow>
            <CCol :xs="12" :sm="8" :md="7" :lg="7">
              <h5>
                <strong>{{ srf.titulo }}</strong>
                <div v-if="srf.modificado !== 'NUEVO'">
                  <CBadge :color="getColor(srf.modificado)" @click="clickModalObs(true)" style="cursor: pointer;">
                    <i :class="getIcono(srf.modificado)"></i> {{ srf.modificado }}
                  </CBadge>
                </div>
              </h5>
            </CCol>
            <CCol :xs="12" :sm="4" :md="5" :lg="5" class="text-end">
              <h3><strong>No.: {{ srf.numero }}</strong> </h3>
              <div class="space">{{ srf.idp }} | {{ srf.gestion }}</div>
            </CCol>
          </CRow>
          <div>
            <CAlert color="success" :style="vars">Fecha de solicitud: {{ srf.fechaSolicitud }}</CAlert>
            <CAlert color="secondary" :style="vars">I. {{ srf.seccionUno }}</CAlert>
            <ComponenteDatos :datos="datos" />

            <CAlert color="secondary" :style="vars">II. {{ srf.seccionDos }}</CAlert>
            <!--PC-->
            <div class="mb-3 d-none d-md-flex">
              <CInputGroup size="sm" class="mb-3">
                <CInputGroupText class="headercolor" as="label">
                  <i class="bi bi-calendar-event me-2"></i>{{ srf.fechaTitulo }} :
                </CInputGroupText>
                <CFormInput type="text" :value="srf.fechaEstimada" disabled />
                <CInputGroupText class="headercolor" as="label">
                  <i class="bi bi-currency-dollar me-2"></i>{{ srf.montoTitulo }} :
                </CInputGroupText>
                <CFormInput type="text" :value="`${formatearNumero(srf.monto)} ${srf.moneda}`" disabled />
              </CInputGroup>
            </div>
            <!--PC-->

            <!--Movil-->
            <div class="d-md-none mb-3">
              <CInputGroup size="sm" class="mb-3">
                <CInputGroupText class="headercolor" as="label">
                  <i class="bi bi-calendar-event me-2"></i>{{ srf.fechaTitulo }} :
                </CInputGroupText>
                <CFormInput type="text" :value="srf.fechaEstimada" disabled />
              </CInputGroup>
              <CInputGroup>
                <CInputGroupText class="headercolor" as="label">
                  <i class="bi bi-currency-dollar me-2"></i>{{ srf.montoTitulo }} :
                </CInputGroupText>
                <CFormInput type="text" :value="`${formatearNumero(srf.monto)} ${srf.moneda}`" disabled />
              </CInputGroup>
            </div>
            <!--Movil-->

            {{ srf.descripcion }} :
            <CAlert color="light">
              {{ srf.detalle }}
            </CAlert>

            <hr>
            <div v-if="srf.trueComplemento">
              <!--PC-->
              <div class="mb-3 d-none d-md-flex">
                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-person-vcard-fill me-2"></i>{{ srf.detalleComplemento }} :
                  </CInputGroupText>
                  <CFormInput type="text" :value="srf.campoTexto" disabled />

                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-list-ol me-2"></i>{{ srf.cantidadComplemento }} :
                  </CInputGroupText>
                  <CFormInput type="text" :value="srf.campoNumerico" disabled />
                </CInputGroup>
              </div>
              <!--Movil-->
              <div class="d-md-none mb-3">
                <CInputGroup size="sm" class="mb-3">
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-person-vcard-fill me-2"></i>{{ srf.detalleComplemento }} :
                  </CInputGroupText>
                  <CFormInput type="text" :value="srf.campoTexto" disabled />
                </CInputGroup>
                <CInputGroup>
                  <CInputGroupText class="headercolor" as="label">
                    <i class="bi bi-list-ol me-2"></i>{{ srf.cantidadComplemento }} :
                  </CInputGroupText>
                  <CFormInput type="text" :value="srf.campoNumerico" disabled />
                </CInputGroup>
              </div>
            </div>

            <div v-if="srf.estadoTres">
              <CAccordion>
                <CAccordionItem>
                  <CAccordionHeader>
                    III. {{ srf.seccionTres }}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CAlert>{{ srf.detalleFormato }}</CAlert>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </div>
          </div>
        </CCardBody>
        <CCardFooter class="text-center">

        </CCardFooter>
      </CCard>
      <br>
    </CCol>

    <CCol :xs="0" :sm="1" :md="1" :lg="1" class="align-self-end">
    </CCol>
  </CRow>

  <!-- ==================================================================== -->
  <!-- Canvas para Autirozadores                                      -->
  <!-- ==================================================================== -->
  <COffcanvas placement="end" :visible="canvaApr" @hide="clickCanvaApr(false)">
    <COffcanvasHeader>
      <COffcanvasTitle>Estado de Solicitud</COffcanvasTitle>
      <CCloseButton class="text-reset" @click="clickCanvaApr(false)" />
    </COffcanvasHeader>
    <COffcanvasBody>
      <ComponenteAutorizadores v-if="srf && srf.autorizador" :lista="srf.autorizador" />
    </COffcanvasBody>
  </COffcanvas>
  <!--End Canvas Lista de Aprobadores-->

  <!-- ==================================================================== -->
  <!-- Modal para Observaciones                                             -->
  <!-- ==================================================================== -->
  <CModal :visible="modalObs" alignment="center" size="lg" backdrop="static" @close="clickModalObs(false)">
    <CModalHeader class="headercolor">
      <CModalTitle class="d-flex align-items-center">
        <CIcon icon="cil-description" size="lg" class="me-2" />Observaciones
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :xs="12">
          <CAlert color="light">
            <CIcon icon="cil-info" size="xl" class="me-2 flex-shrink-0" />
            <p v-html="updateApr.obs"></p>
          </CAlert>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton @click="clickModalObs(false)" class="text-white" color="success" size="sm">
        <CIcon icon="cil-check-alt" class="me-2" />
        <span>Aceptar</span>
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- End Modal Observaciones-->


  <!-- ==================================================================== -->
  <!-- Modal para Aprobar Solicitud                                        -->
  <!-- ==================================================================== -->
  <CModal :visible="modalAprobar" alignment="center" backdrop="static" size="lg" @close="clickModalAprobar(false)">
    <CModalHeader class="headercolor text-white py-3">
      <CModalTitle class="d-flex align-items-center">
        <CIcon icon="cil-task" size="lg" class="me-2" />
        Aprobar solicitud
      </CModalTitle>
    </CModalHeader>

    <CModalBody class="p-4">
      <!-- Contenedor de alerta con diseño moderno y sutil -->
      <div class="p-3 mb-4 rounded-3 bg-body-tertiary border-start border-primary border-4 shadow-sm">
        <div class="d-flex align-items-start">
          <div class="text-primary me-3 mt-1">
            <CIcon icon="cil-info" size="xl" />
          </div>
          <div>
            <h6 class="fw-bold text-dark mb-1">Información de la solicitud</h6>
            <p v-if="destino" class="text-body-secondary small mb-0">
              La solicitud es menor al monto reglamentario de
              <strong class="text-dark">{{ formatearNumero(srf.montoFormato) }} {{ srf.moneda }}</strong>.
              Puedes proceder con una aprobación directa o derivarla a tu superior según corresponda.
            </p>
            <p v-else class="text-body-secondary small mb-0">
              La solicitud de {{ formatearNumero(srf.monto) }} {{ srf.moneda }} es mayor al monto reglamentario de
              <strong class="text-dark">{{ formatearNumero(srf.montoFormato) }} {{ srf.moneda }}</strong>.
              Puedes aprobar la solicitud y esta sera derivada para una revicion.
            </p>
          </div>
        </div>
      </div>

      <!-- Opciones de aprobación -->
      <CRow class="g-3">
        <!-- Aprobación directa -->
        <CCol :xs="12" :md="6" v-if="destino">
          <CButton color="success" variant="outline" class="custom-hover-btn w-100 h-100 p-3" @click="solicitudDirecta">
            <div class="d-flex flex-column align-items-center text-center">
              <CIcon icon="cil-check-circle" size="3xl" class="mb-2" />
              <strong class="mb-2">
                Aprobación directa
              </strong>
              <small>
                Aprobar la solicitud directamente sin remitirla a otra instancia.
              </small>
            </div>
          </CButton>
        </CCol>

        <!-- Enviar al superior -->
        <CCol v-if="!destino" :xs="12" :md="3"></CCol>
        <CCol :xs="12" :md="6">
          <CButton color="primary" variant="outline" class="w-100 h-100 p-3" @click="solicitudEnviada">
            <div class="d-flex flex-column align-items-center text-center">
              <CIcon icon="cil-share" size="3xl" class="mb-2" />
              <strong class="mb-2">
                Aprobar y enviar
              </strong>
              <small>
                Remitir la solicitud para su evaluación y aprobación.
              </small>
            </div>
          </CButton>
        </CCol>

        <CCol v-if="!destino" :xs="12" :md="3"></CCol>
      </CRow>
    </CModalBody>

    <CModalFooter class="px-4 py-3">
      <CButton color="danger" class="text-white" size="sm" @click="clickModalAprobar(false)">
        <CIcon icon="cil-x" class="me-2" />
        Cancelar
      </CButton>
    </CModalFooter>
  </CModal>
  <!-- End Modal aprobar Solicitud -->

  <!-- ==================================================================== -->
  <!-- Modal para Rechazar Solicitud                                     -->
  <!-- ==================================================================== -->
  <CModal :visible="modalRechazar" alignment="center" backdrop="static" size="lg" @close="clickModalRechazar(false)">
    <CForm @submit.prevent="RechazarSolicitud">
      <CModalHeader class="headercolor">
        <CModalTitle class="d-flex align-items-center">
          <CIcon icon="cil-trash" size="lg" class="me-2" />Rechazar Solicitud
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="light" class="d-flex align-items-start mb-4">
          <CIcon icon="cil-info" size="xl" class="me-2 flex-shrink-0" />
          <div>
            <strong>Información importante</strong>
            <p class="mb-0 mt-1">
              Estás a punto de rechazar esta solicitud. Indica claramente los motivos del rechazo.
            </p>
          </div>
        </CAlert>

        <!-- Motivo de devolución -->
        <div class="mb-3">
          <CFormLabel class="fw-semibold">
            <CIcon icon="cil-trash" class="me-2 text-primary" />
            Motivo de Rechazo
            <span class="text-danger">*</span>
          </CFormLabel>

          <CFormTextarea v-model="observacion" placeholder="Describe detalladamente el motivo de la rechazo..."
            rows="4" required maxlength="500" />
          <div class="d-flex justify-content-between mt-2">
            <small class="text-body-secondary">
              Especifica el motivo de rechazo al solicitante.
            </small>
            <small class="text-body-secondary">
              {{ observacion?.length || 0 }}/500
            </small>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalRechazar(false)" color="danger" class="text-white" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>

        <CButton type="submit" class="text-white" color="success" size="sm" :disabled="!observacion?.trim()">
          <CIcon icon="cil-check-alt" class="me-2" />
          <span>Aceptar</span>
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Rechazar-->

  <!-- ==================================================================== -->
  <!-- Modal para Devolver Solicitud                                       -->
  <!-- ==================================================================== -->
  <CModal :visible="modalDevolver" alignment="center" backdrop="static" size="lg" @close="clickModalDevolver(false)">
    <CForm @submit.prevent="DevolverSolicitud">
      <CModalHeader class="headercolor">
        <CModalTitle class="d-flex align-items-center">
          <i class="bi bi-box-arrow-up-left me-2"></i>
          Devolver solicitud
        </CModalTitle>
      </CModalHeader>

      <CModalBody class="p-4">
        <!-- Información -->
        <CAlert color="light" class="d-flex align-items-start mb-4">
          <CIcon icon="cil-info" size="xl" class="me-2 flex-shrink-0" />
          <div>
            <strong>Información importante</strong>
            <p class="mb-0 mt-1">
              Estás a punto de devolver esta solicitud. Indica claramente los motivos para que el solicitante pueda
              realizar las correcciones necesarias.
            </p>
          </div>
        </CAlert>

        <!-- Motivo de devolución -->
        <div class="mb-3">
          <CFormLabel class="fw-semibold">
            <CIcon icon="cil-comment-square" class="me-2 text-primary" />
            Motivo de devolución
            <span class="text-danger">*</span>
          </CFormLabel>

          <CFormTextarea v-model="observacion" placeholder="Describe detalladamente el motivo de la devolución..."
            rows="4" required maxlength="500" />
          <div class="d-flex justify-content-between mt-2">
            <small class="text-body-secondary">
              Especifica las correcciones que debe realizar el solicitante.
            </small>
            <small class="text-body-secondary">
              {{ observacion?.length || 0 }}/500
            </small>
          </div>
        </div>
      </CModalBody>

      <CModalFooter class="px-4 py-3">
        <CButton color="danger" class="text-white" size="sm" @click="clickModalDevolver(false)">
          <CIcon icon="cil-x" class="me-2" />
          Cancelar
        </CButton>
        <CButton type="submit" color="primary" class="text-white" size="sm" :disabled="!observacion?.trim()">
          <i class="bi bi-box-arrow-up-left me-2"></i>
          Devolver solicitud
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Devolver -->

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

// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ComponenteDatos from '@/components/srf/ComponenteDatos.vue'
import { useAlert } from '@/composables/useAlert'
import { useFunction } from '@/composables/useFunction'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useAuthStore } from '@/stores/authStores'
import { useApSrf } from '@/composables/Aprobacion/useSrf'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ComponenteAutorizadores from '@/components/srf/ComponenteAutorizadores.vue'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { dataLoading, close, confirm } = useAlert()
const { formatearNumero, getColor, getIcono } = useFunction()
const { setActions, clearActions } = useBreadcrumb()
const { updateAprobacionUse, getAprUse, srf } = useApSrf()
const router = useRouter()
const auth = useAuthStore()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const persona = ref(auth.persona)
const idpName = ref(auth.idpName)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const canvaApr = ref(false)
const modalRechazar = ref(false)
const modalAprobar = ref(false)
const modalDevolver = ref(false)
const modalObs = ref(false)
const color = ref('danger')
const icon = ref('')
const observacion = ref('')
const valor = ref('')
const destino = ref(false)

const updateApr = reactive({
  idApr: null,
  destino: 0,
  estado: '',
  tipo: '',
  idPersona: null,
  idSrf: null,
  obs: '',
  modo: ''
})

const datos = reactive({
  nombre: '',
  idp: '',
  idpName: '',
  cargo: '',
  centroCostos: '',
  codigo: ''
})

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const clickCanvaApr = (value) => {
  canvaApr.value = value
}

const clickModalRechazar = (value) => {
  modalRechazar.value = value
}

const clickModalDevolver = (value) => {
  modalDevolver.value = value
}

const clickModalObs = (value) => {
  modalObs.value = value
}

const clickModalAprobar = (value) => {
  modalAprobar.value = value
}

const getSolicitud = () => {
  if (srf.siguiente === 'ULTIMO') {
    solicitudEnviada()
  } else {
    clickModalAprobar(true)
  }
}

const solicitudDirecta = () => {
  clickModalAprobar(false)
  updateApr.estado = 'APROBADO'
  updateApr.modo = 'DIRECTO'
  const ob = updateApr.obs === 'PENDIENTE' ? ' Aprobacion Directa.' : (updateApr.obs + '<br> APROBADO ')
  updateApr.obs = ob
  updateAprobacion()
}
const solicitudEnviada = () => {
  clickModalAprobar(false)
  updateApr.estado = 'APROBADO'
  updateApr.modo = 'ENVIADO'
  const ob = updateApr.obs === 'PENDIENTE' ? 'Ninguno' : (updateApr.obs + '<br> APROBADO ')
  updateApr.obs = ob
  updateAprobacion()
}

const updateAprobacion = async () => {
  const resultService = await updateAprobacionUse(updateApr, 'Solictud Aprobada Correctamente', 'Desea Aprobar la Solicitud ?')
  if (resultService) {
    getLista()
  } else {
    getLoadData()
  }
}

const RechazarSolicitud = async () => {
  clickModalRechazar(false)
  updateApr.estado = 'RECHAZADO'
  updateApr.obs =  observacion.value
  updateApr.modo = "SIGUIENTE"
  const resultService = await updateAprobacionUse(updateApr, 'Solictud Rechazada Correctamente', 'Desea Rechazar la Solicitud ?')
  if (resultService) {
    getLista()
  } else {
    getLoadData()
  }
}

const DevolverSolicitud = async () => {
  clickModalDevolver(false)
  updateApr.estado = 'DEVUELTO'
  updateApr.obs = observacion.value
  updateApr.modo = "SIGUIENTE"
  const resultService = await updateAprobacionUse(updateApr, 'Solictud Devuelta Correctamente', 'Desea Devolver la Solicitud ?')
  if (resultService) {
    getLista()
  } else {
    getLoadData()
  }
}

const getLoadData = () => {
  updateApr.idApr = srf.idApr
  updateApr.destino = srf.destino
  updateApr.estado = srf.estado
  updateApr.idSrf = srf.idSrf
  updateApr.idPersona = persona.value.id
  updateApr.obs = srf.obs
  color.value = getColor(srf.estado)
  icon.value = getIcono(srf.estado)
  valor.value = formatearNumero(srf.monto) + " " + srf.moneda

  datos.nombre = srf.nombre
  datos.idpName = idpName
  datos.idp = srf.idp
  datos.cargo = srf.cargo
  datos.centroCostos = srf.centro
  datos.codigo = srf.codigo
  if (Number(srf.montoFormato) > Number(srf.monto)) {
    destino.value = true
  } else {
    destino.value = false
  }
}

const getLista = () => {
  router.push({
    name: 'SolicitudSRF',
    params: { solicitud: 'pendiente' }
  })
}

const getCancelar = async () => {
  const resultAlert = await confirm('Cancelar', 'Desea cancelar la revision ????', '')
  if (resultAlert.isConfirmed) {
    router.push({
      name: 'SolicitudSRF',
      params: { solicitud: solicitud.solicitud }
    })
  }
}
const getSalir = () => {
  router.push({
    name: 'SolicitudSRF',
    params: { solicitud: solicitud.solicitud }
  })
}

/* Breadcrum Actions */
const salir = () => {
  getSalir()
}
const cancelar = () => {
  getCancelar()
}
const rechazar = () => {
  clickModalRechazar(true)
}
const devolver = () => {
  clickModalDevolver(true)
}
const aprobar = () => {
  getSolicitud()
}
const aprobadores = () => {
  clickCanvaApr(true)
}


const getAction = () => {
  setActions([
    {
      visible: updateApr.estado !== 'APROBADO' ? true : false,
      label: 'Aprobar',
      icon: 'cil-thumb-up',
      color: 'success',
      variant: 'ghost',
      disabled: false,
      movile: 'd-none d-md-inline',
      onClick: aprobar
    },
    {
      visible: updateApr.estado !== 'APROBADO' ? true : false,
      label: 'Devolver',
      icon: 'cil-cursor',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      movile: 'd-none d-md-inline',
      onClick: devolver
    },
    {
      visible: updateApr.estado !== 'APROBADO' ? true : false,
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
      visible: updateApr.estado !== 'APROBADO' ? true : false,
      label: 'Cancelar',
      icon: 'cil-x',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      movile: 'd-none d-md-inline',
      onClick: cancelar
    },
    {
      visible: updateApr.estado !== 'APROBADO' ? false : true,
      label: 'Salir',
      icon: 'cil-account-logout',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      onClick: salir
    }
  ])
}

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  dataLoading()
  try {
    await getAprUse(persona.value.id, solicitud.idSrf)
    getLoadData()
  } finally {
    await close()
  }
  getAction()
})
onUnmounted(() => {
  clearActions()
})

// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================
const vars = {
  '--cui-alert-padding-y': '2px',
  '--cui-alert-border-radius': '0px'
}
</script>