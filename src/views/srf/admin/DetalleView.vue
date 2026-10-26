<template>
  <CRow>
    <!-- ==================================================================== -->
    <!-- Tarjeta de Autorizadores                                             -->
    <!-- ==================================================================== -->
    <CCol :xs="12" :sm="4" :md="4" :lg="4" class="align-self-start">
      <ComponenteAutorizadores v-if="srf && srf.lista" :lista="srf.lista" />
    </CCol>
    <!-- ==================================================================== -->
    <!-- Formulario de Solicitud de Fondos                                    -->
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
              <div class="space">{{ srf.idp }} | {{ srf.gestion }}</div>
            </CCol>
          </CRow>
          <CAlert color="success">Fecha de solicitud: {{ srf.fechaInicio }}</CAlert>
          <CAlert color="secondary">I. {{ srf.formato?.seccionUno }}</CAlert>
          <ComponenteDatos :datos="datos" />

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
          <CAlert color="light">
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

</template>
<script setup>
const detalleProps = defineProps({
  idUsuario: {
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

import { API_URL_SGRF } from "@/env"

import ComponenteDatos from '@/components/srf/ComponenteDatos.vue'
import ComponenteAutorizadores from '@/components/srf/ComponenteAutorizadores.vue'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================

const { setActions, clearActions } = useBreadcrumb()
const { formatearNumero, getColor, getIcono} = useFunction()
const { dataLoading, close } = useAlert()
const { getSrfAdminUse, srf } = useSrf()
const { getSrfPdf } = usePdf()
const auth = useAuthStore()
const router = useRouter()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const idpName = ref(auth.idpName)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const dominio = ref(API_URL_SGRF)

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

const generarPDF = async () => {
  await getSrfPdf({
    srf:srf,
    datos:datos,
    dominio: dominio.value,
    idpName:idpName.value
  })
}

const getSalir = () => {
  router.push({
    name: 'GESTIONSRF',
    params: { idUsuario: detalleProps.idUsuario }
  })
}

const getLoadData = () => {
  datos.nombre = srf.nombre
  datos.idpName = idpName
  datos.idp = srf.idp
  datos.cargo = srf.cargo
  datos.centroCostos = srf.centrocosto
  datos.codigo = srf.codigo
}

const getAction = () => {
  setActions([
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
    await getSrfAdminUse(detalleProps.idUsuario, detalleProps.idSrf)
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

</script>