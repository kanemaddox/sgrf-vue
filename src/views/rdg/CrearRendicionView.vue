<template>
  <CRow>
    <CCol :xs="0" :sm="0" :md="1" :lg="1" class="align-self-start">
    </CCol>
    <!-- ================================================================================ -->
    <!-- Formulario de Creacion de una Rendicion                                           -->
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
            <CButton color="success" class="font" v-else @click="submitForm" :disabled="datos.crear">
              <i class="bi bi-check2-all me-2"></i> Crear
            </CButton>
            <CButton color="success" variant="outline" class="custom-hover-btn" @click="saveRdg"
              v-if="(currentStep === steps.length - 1) && (datos.crear)">
              <i class="bi bi-floppy me-2"></i> <span class="d-none d-md-inline">Guargar</span>
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
const createRdg = defineProps({
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

import { useRouter } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ComponenteRdg1 from '@/components/rdg/ComponenteRdg1.vue'
import ComponenteRdg2 from '@/components/rdg/ComponenteRdg2.vue'
import ComponenteRdg3 from '@/components/rdg/ComponenteRdg3.vue'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { getFormatoRdgUse, formatoRDG } = useSettings()
const { createRdgUse, updateRdgUse, getRdgUsuarioUse, saveRdgUse, rdg } = useRdg()
const { dataLoading, close, confirm } = useAlert()
const steps = [ComponenteRdg1, ComponenteRdg2, ComponenteRdg3]
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
const STORAGE_KEY = 'rdgFormulario'
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
  valores.value = { ...formatoRDG.value }
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
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      Object.assign(datos, JSON.parse(savedData))
      valores.value = { ...datos.formato }
    } else {
      await getFormatoRdgUse()
      await getRdgUsuarioUse(createRdg.idRdg, persona.value.id)
      getLoadData()
    }
  } finally {
    close()
  }
})

// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================

</script>