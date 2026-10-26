<template>
  <CRow>
    <!-- ==================================================================== -->
    <!-- Tarjeta de Autorizadores                                             -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="4" :lg="4" class="align-self-start">
      <ComponenteAutorizadores v-if="srf && srf.lista" :lista="srf.lista" />
    </CCol>
    <!-- ==================================================================== -->
    <!-- Formulario de Solicitud                                             -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="8" :md="8" :lg="8" class="align-self-center">
      <div class="d-md-none mb-3"></div>
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <div class="align-items-center">
            <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
            <CChip :color="getColor(srf.estado)" size="sm">
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

  <!-- ==================================================================== -->
  <!-- Modal para Actualizar Solicitud                                      -->
  <!-- ==================================================================== -->
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
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { useAuthStore } from '@/stores/authStores'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/useAlert'

import { useFunction } from '@/composables/useFunction'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useSrf } from '@/composables/useSrf'
import { usePdf } from '@/composables/usePdf';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { API_DOMAIN} from "@/env"

import ComponenteDatos from '@/components/srf/ComponenteDatos.vue'
import ComponenteAutorizadores from '@/components/srf/ComponenteAutorizadores.vue'


// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================

const { setActions, clearActions } = useBreadcrumb()
const { formatearNumero, getColor, getIcono, getCantidadCaracteres } = useFunction()
const { dataLoading, close } = useAlert()
const { updateSrfUse, getSrfUsuarioUse, srf } = useSrf()
const { getSrfPdf } = usePdf()
const auth = useAuthStore()
const router = useRouter()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const persona = ref(auth.persona)
const idpName = ref(auth.idpName)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const dominio = API_DOMAIN
const trueComplemento = ref(false)
const modalSrf = ref(false)
const hoy = new Date().toISOString().split('T')[0]
const fechaSeleccionada = ref(null)

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

const generarPDF = async () => {
  await getSrfPdf({
    srf:srf,
    datos:datos,
    dominio: dominio,
    idpName:idpName.value
  })
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

  fechaSeleccionada.value = updateSrf.fechaFin
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


// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
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
// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================

const vars = {
  '--cui-accordion-btn-bg': 'var(--cui-secondary-bg-subtle)',
  '--cui-accordion-border-color': 'var(--cui-secondary-border-subtle)',
  '--cui-accordion-active-bg': 'var(--cui-secondary-bg-subtle)',
  '--cui-accordion-active-color': 'var(--cui-body-color)',
  '--cui-accordion-btn-focus-box-shadow': 'none', 
  '--cui-accordion-border-width': '10px',
  '--cui-accordion-border-style': 'solid',
  '--cui-accordion-border-color': 'var(--cui-secondary-border-subtle)',
}

</script>