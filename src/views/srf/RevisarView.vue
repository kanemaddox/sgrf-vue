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
              <h5><strong>{{ srf.titulo }}</strong></h5>
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
  <!-- Modal para Rechazar Solicitud                                     -->
  <!-- ==================================================================== -->
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

  <!-- ==================================================================== -->
  <!-- Modal para DEvolver Solicitud                                    -->
  <!-- ==================================================================== -->
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
              <CInputGroupText class="headercolor" as="label">
                <i class="bi bi-recycle me-2"></i>Motivo :
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
const modalDevolver = ref(false)
const color = ref('danger')
const icon = ref('')
const motivoSeleccionado = ref('ninguna')
const observacion = ref('')
const valor = ref('')

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

const AprobarSolicitud = async () => {
  updateApr.estado = 'APROBADO'
  const ob = updateApr.obs === 'PENDIENTE' ? 'Ninguno' : (updateApr.obs + ' | Ninguno')
  updateApr.obs = ob
  const resultService = await updateAprobacionUse(updateApr, srf.numero, valor.value, srf.nombre, 'Solictud Aprobada Correctamente', 'Aprobar Solicitud ?')
  if (resultService) {
    getLista()
  } else {
    getLoadData()
  }
}

const RechazarSolicitud = async () => {
  clickModalRechazar(false)
  updateApr.estado = 'RECHAZADO'
  updateApr.obs = motivoSeleccionado.value === 'otros' ? observacion.value : motivoSeleccionado.value
  const resultService = await updateAprobacionUse(updateApr, srf.numero, valor.value, srf.nombre, 'Solictud Rechazada Correctamente')
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
  const resultService = await updateAprobacionUse(updateApr, srf.numero, valor.value, srf.nombre, 'Solictud Devuelta Correctamente')
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
  AprobarSolicitud()
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
    close()
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