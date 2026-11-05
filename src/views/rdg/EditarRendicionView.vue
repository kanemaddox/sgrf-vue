<template>
  <CRow>
    <CCol :xs="0" :sm="0" :md="1" :lg="1" class="align-self-start">
    </CCol>
    <!-- ================================================================================ -->
    <!-- Formulario de Editar una Rendicion                                           -->
    <!-- ================================================================================ -->
    <CCol :xs="12" :sm="12" :md="10" :lg="10" class="align-self-center">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="12" :sm="6" :md="6" :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-description" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">
                  {{ valores.titulo }}<br>
                </label>
              </div>
            </CCol>
            <CCol :xs="12" :sm="6" :md="6" :lg="6" class="text-end">
              <div class="folio"> {{ datos.titulo }} {{ datos.folio }}</div>
              <div class="space">{{ datos.idp }} | {{ datos.gestionSrf }}</div>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody>
          <component :is="steps[currentStep]" :datos="datos" :valores="valores" ref="currentStepRef" />
        </CCardBody>

        <CCardFooter class="text-end">
          <CButtonGroup role="group" size="sm">
            <CButton color="danger" class="font" @click="salir">
              <i class="bi bi-x-lg me-2"></i><span class="d-none d-md-inline"> Cancelar</span>
            </CButton>
            <CButton color="secondary" @click="prevStep" :disabled="currentStep === 0">
              Anterior <i class="bi bi-arrow-bar-left"></i>
            </CButton>

            <CButton color="warning" class="font" v-if="currentStep < steps.length - 1" @click="nextStep">
              <i class="bi bi-arrow-bar-right"></i> Siguiente
            </CButton>
            <CButton color="info" class="text-white" v-else @click="submitForm">
              <i class="bi bi-arrow-clockwise me-2"></i> Actualizar
            </CButton>
          </CButtonGroup>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol :xs="0" :sm="0" :md="1" :lg="1" class="align-self-end">

    </CCol>
  </CRow>
  <br>

</template>
<script setup>
const editRdg = defineProps({
  idRdg: {
    type: String,
    required: true
  }
})

// ============================================================================
// 1. IMPORTACIONES
// ============================================================================

import { watch, ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStores'
import { useSettings } from '@/composables/useSettings'
import { useRdg } from '@/composables/useRdg'
import { useAlert } from '@/composables/useAlert'
import { useFunction } from '@/composables/useFunction'
import { useRouter } from 'vue-router'

import 'bootstrap-icons/font/bootstrap-icons.css'

import ComponenteRdg1 from '@/components/rdg/ComponenteRdg1.vue'
import ComponenteRdg2 from '@/components/rdg/ComponenteRdg2.vue'
import ComponenteEdit3 from '@/components/rdg/ComponenteEdit3.vue'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { getFormatoRdgUse, formatoRDG } = useSettings()
const { getRdgDetalleUse, createRdgUse, updateRdgUse, getRdgUsuarioUse, saveRdgUse, rdg } = useRdg()
const { formatearNumero } = useFunction()
const { dataLoading, close, confirm, error } = useAlert()
const steps = [ComponenteRdg1, ComponenteRdg2, ComponenteEdit3]
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
const currentStep = ref(0)
const currentStepRef = ref(null);
const STORAGE_KEY = 'rdgEditFormulario'
let timeout
const resultService = ref(false)
const datos = reactive({
  idRdg: 0,
  idSrf: 0,
  nombre: '',
  idp: '',
  idpName: '',
  cargo: '',
  area: '',
  centrocostos: '',
  codigo: '',
  tipo: '',
  cuenta: '',
  banco: '',
  importe: 0,
  moneda: '',
  facturas: [],
  depositos: [],
  actividad: '',
  del: '',
  al: '',
  detalle: '',
  participantes: '',
  gasto: 0,
  saldo: 0,
  rembolso: 0,
  devolver: 0,
  listaCuentaGasto: [],
  formato: null,
  numeroSrf: '',
  gestionSrf: 0,
  titulo: 'Solicitud :',
  folio: '',
  crear: true
})

const valores = ref({
  titulo: "",
  seccionUno: "",
  seccionDos: "",
  seccionTres: "",
})

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const nextStep = () => {
  if (currentStepRef.value && typeof currentStepRef.value.validarPaso === 'function') {
    const esValido = currentStepRef.value.validarPaso()
    if (!esValido) {
      return
    }
  }
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  } else {
    enviarFormularioCompleto()
  }
}
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitForm = async () => {
  if (datos.crear) {
    await error('Fondos por Devolver', 'Los fondos por devolver son ' + formatearNumero(datos.devolver) + ' ' + datos.moneda + '. Realize el deposito de devolucion y agregue el comprobante.', '')
  } else {
    if (Number(datos.idRdg) === 0) {
      resultService.value = await createRdgUse(datos, persona.value.id)
    } else {
      resultService.value = await updateRdgUse(datos, persona.value.id)
    }
    if (resultService.value) {
      localStorage.removeItem(STORAGE_KEY)
      getLista()
    } else {
      location.reload()
    }
  }

}
const saveRdg = async () => {
  resultService.value = await saveRdgUse(datos, persona.value.id)
  if (resultService.value) {
    localStorage.removeItem(STORAGE_KEY)
    getSolicitudes()
  } else {
    location.reload()
  }
}

const salir = async () => {
  const result = await confirm('Cancelar Formulario', 'Desea Cancelar la Creacion del Formulario ?', '')
  if (result.isConfirmed) {
    localStorage.removeItem(STORAGE_KEY)
    getSolicitudes()
  } else {
    location.reload()
  }

}

const getLoadData = () => {
  valores.value = { ...rdg.formato }
  datos.idRdg = rdg.idRdg
  datos.idSrf = rdg.idSrf
  datos.nombre = rdg.nombre
  datos.idp = rdg.idp
  datos.idpName = idpName
  datos.cargo = rdg.cargo
  datos.area = rdg.area
  datos.centrocostos = rdg.centrocostos
  datos.codigo = rdg.codigo
  datos.tipo = rdg.tipo
  datos.cuenta = rdg.cuenta
  datos.banco = rdg.banco
  datos.importe = rdg.importe || 0
  datos.moneda = rdg.moneda
  datos.facturas = rdg.factura || []
  datos.depositos = []
  datos.actividad = rdg.actividad
  datos.fecha = new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
  datos.del = rdg.del
  datos.al = rdg.al
  datos.detalle = rdg.detalle || ''
  datos.participantes = rdg.participantes || ''
  datos.gasto = rdg.gasto
  datos.saldo = rdg.saldo
  datos.rembolso = rdg.rembolso
  datos.devolver = rdg.devolver
  datos.listaCuentaGasto = rdg.cuentaGasto
  datos.formato = valores.value
  datos.numeroSrf = rdg.numeroSrf
  datos.gestionSrf = rdg.gestionSrf
  if (datos.idRdg === 0) {
    datos.titulo = 'Sin Formulario de Solicitud'
    datos.folio = ''
  } else {
    datos.folio = 'No. ' + datos.numeroSrf
  }

  datos.saldo = Number(Number(datos.importe) - Number(datos.gasto)).toFixed(2)

  if (Number(datos.saldo) > 0) {
    datos.devolver = Number(datos.saldo).toFixed(2)
    datos.rembolso = 0
    datos.crear = true
  } else {
    datos.rembolso = Number(datos.saldo).toFixed(2) * -1
    datos.devolver = 0
    datos.crear = false
  }
}

const saveDraft = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
}

watch(
  datos, () => {
    clearTimeout(timeout)
    timeout = setTimeout(saveDraft, 500)
  },
  {
    deep: true
  }
)

const getSolicitudes = () => {
  if (Number(rdg.idSrf) > 0) {
    router.push({
      name: 'Solicitudes'
    })
  } else {
    router.push({
      name: 'MenuRdg'
    })
  }

}

const getLista = () => {
  router.push({
    name: 'ListaRDG',
    params: { estado: 'pendiente' }
  })
}

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  dataLoading()
  try {
    const savedDataEdit = localStorage.getItem(STORAGE_KEY)
    if (savedDataEdit) {
      Object.assign(datos, JSON.parse(savedDataEdit))
      valores.value = { ...datos.formato }
      console.log(datos)
    } else {
      await getRdgUsuarioUse(editRdg.idRdg, persona.value.id)
      //await getRdgDetalleUse(editRdg.idRdg, persona.value.id)
      getLoadData()
    }
  } finally {
    await close()
  }
})

// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================

</script>