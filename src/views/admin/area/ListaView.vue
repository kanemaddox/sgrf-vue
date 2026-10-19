<template>
  <CRow>
    <!-- ================================================================ -->
    <!-- Tarjetas de Centros de Costo                                     -->
    <!-- ================================================================ -->

    <CCol :xs="12" :sm="12" :md="6" :lg="6" v-for="(value, index) in listaEstructura" :key="value.codigo ?? index"
      class="mb-4">
      <CCard class="h-100 shadow-sm border-0">
        <!-- Encabezado -->
        <CCardHeader class="headercolor py-3">
          <CRow class="align-items-center g-2">
            <CCol xs="auto">
              <div class="bg-white bg-opacity-25 rounded p-2">
                <i class="bi bi-building fs-4 text-white"></i>
              </div>
            </CCol>

            <CCol>
              <div class="text-white fw-semibold">{{ value.departamento }}</div>
              <div class="text-white small opacity-75">Código: {{ value.codigo }}</div>
            </CCol>

            <CCol xs="auto">
              <CBadge color="light" text-color="dark" class="px-2 py-2">
                <i class="bi bi-diagram-3 me-1"></i>{{ value.costo?.length ?? 0 }}
              </CBadge>
            </CCol>
          </CRow>
        </CCardHeader>

        <!-- Contenido -->
        <CCardBody class="p-3">
          <CListGroup flush>
            <CListGroupItem v-for="(item, id) in value.costo" :key="item.codigo ?? id" class="px-0 py-3">
              <!-- Centro de costo principal -->
              <div class="d-flex align-items-start gap-2">
                <div class="text-warning pt-1">
                  <i class="bi bi-folder2-open fs-5"></i>
                </div>
                <div class="flex-grow-1">
                  <div class="fw-semibold">
                    {{ item.departamento }}
                  </div>
                  <CChip color="success" size="sm">
                    <CIcon icon="cil-check-circle" /> {{ item.codigo }}
                  </CChip>
                </div>
                <CBadge color="secondary" variant="outline">
                  {{ item.sub?.length ?? 0 }}
                  <i class="bi bi-diagram-2 ms-1"></i>
                </CBadge>
              </div>

              <!-- Subcentros -->
              <div v-if="item.sub?.length" class="ms-3 mt-3 ps-3 border-start">
                <div v-for="(sub, idsub) in item.sub" :key="sub.codigo ?? idsub" class="d-flex align-items-start gap-2">
                  {{ sub.codigo }} | <span class="small fw-medium">{{ sub.departamento }}</span>
                </div>
              </div>

            </CListGroupItem>
          </CListGroup>

          <!-- Estado vacío -->
          <div v-if="!value.costo?.length" class="text-center text-body-secondary py-4">
            <i class="bi bi-inbox fs-2 d-block mb-2"></i>
            <span class="small">No hay centros de costo registrados.</span>
          </div>

        </CCardBody>

        <!-- Pie -->
        <CCardFooter class="px-3 pb-3 text-end">
          <CButton color="success" size="sm" class="text-white"
            @click="datosModal(value.departamento, value.codigo, index === 0 ? 1 : 2, value.costo)">
            <i class="bi bi-folder-plus me-2"></i> Agregar
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <!-- ================================================================ -->
    <!-- Fin de tarjetas de Centros de Costo                              -->
    <!-- ================================================================ -->

    <!-- ==================================================================== -->
    <!-- Modal para Agregar Niveles                                 -->
    <!-- ==================================================================== -->
    <CModal backdrop="static" alignment="center" :visible="modalAgregar" @close="clickModalAgregar(false)">
      <CForm @submit.prevent="uploadTable">
        <!-- Encabezado del Modal -->
        <CModalHeader class="headercolor text-white py-3">
          <CModalTitle class="d-flex align-items-center">
            <i class="bi bi-folder-plus me-2"></i>
            <span class="fs-6">AGREGAR A {{ datos.departamento }}</span>
          </CModalTitle>
        </CModalHeader>

        <!-- Cuerpo del Modal -->
        <CModalBody class="py-4">

          <CWidgetStatsF color="secondary" :title="datos.cod" :value="datos.departamento">
            <template #icon>
              <CIcon icon="cil-folder-open" size="xl" />
            </template>
          </CWidgetStatsF>
          <br>
          <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
              <i class="bi bi-building text-white me-2"></i> Dependencia :
            </CInputGroupText>
            <CFormInput type="text" v-model="datos.nombre" placeholder="Centro de Costos" required
              :valid="validarNombre" />
          </CInputGroup>

          <CInputGroup size="sm" class="mb-3">
            <CInputGroupText class="headercolor" as="label">
              <i class="bi bi-braces me-2"></i> Codigo :
            </CInputGroupText>
            <CFormInput type="text" v-model="datos.codigo" placeholder="00-00-000" :maxlength="caracteres"
              :valid="validarCodigo" :disabled="!validarNombre" required />
          </CInputGroup>

          <!-- Alerta de Éxito / Completado -->
          <CAlert v-if="datosValidos" color="success" class="d-flex align-items-start shadow-sm border-0 mb-3">
            <CIcon icon="cil-check-circle" size="xl" class="me-3 mt-1 flex-shrink-0" />
            <div>
              <h5 class="alert-heading fw-bold fs-6 mb-1">¡Datos Validos!</h5>
            </div>
          </CAlert>
          <!-- Alerta de Error -->
          <CAlert v-else color="danger" class="d-flex align-items-start shadow-sm border-0 mb-3">
            <CIcon icon="cil-x-circle" size="xl" class="me-3 mt-1 flex-shrink-0" />
            <div>
              <h5 class="alert-heading fw-bold fs-6 mb-1">¡Datos No Validos!</h5>
            </div>
          </CAlert>

        </CModalBody>

        <!-- Pie de Página / Botones de Acción -->
        <CModalFooter>
          <CButton @click="clickModalAgregar(false)" color="danger" class="text-white" size="sm" :disabled="uploading">
            <CIcon icon="cil-x" class="me-1" />
            Cancelar
          </CButton>
          <CButton type="submit" color="success" class="text-white" size="sm" :disabled="!datosValidos">
            <CIcon icon="cil-check-alt" class="me-1" />
            Agregar
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>


  </CRow>
</template>

<script setup>
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================

import { onMounted, onUnmounted, ref, reactive, watch } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useAlert } from '@/composables/useAlert'
import { useArea } from '@/composables/useArea'
import { useRouter } from 'vue-router'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { setActions, clearActions } = useBreadcrumb()
const { getEstructuraUse, listaEstructura } = useArea()
const { dataLoading, close } = useAlert()
const router = useRouter()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================


// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const modalAgregar = ref(false)
const caracteres = ref(0)
const validarNombre = ref(false)
const validarCodigo = ref(false)
const datosValidos = ref(false)
const datos = reactive({
  departamento: '',
  cod: '',
  nombre: '',
  codigo: '',
  nivel: 0,
  lista: []
})

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const datosModal = (departamento, cod, nivel, lista) => {
  datos.departamento = departamento
  datos.cod = cod
  datos.nivel = nivel
  datos.lista = lista
  datos.nombre = ''
  datos.codigo = ''
  if (nivel === 1) {
    caracteres.value = 2
  }
  if (nivel === 2) {
    caracteres.value = 5
    datos.codigo = cod.slice(0, 3).toUpperCase()
  }

  clickModalAgregar(true)
}

const clickModalAgregar = (value) => {
  modalAgregar.value = value
}

const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'MenuArea' })
}
const getAction = () => {
  setActions([
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

watch(
  () => datos.nombre,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      validarNombre.value = true 
      datos.codigo = '0'
      datos.lista.forEach(element => {
        if (element.departamento === datos.nombre.toUpperCase()) {
          validarNombre.value = false
        }
      })
    }
  }
)

watch(
  () => datos.codigo,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      validarCodigo.value = false
      datosValidos.value = false
      if (datos.codigo.length > 1) {
        datosValidos.value = true
        validarCodigo.value = true
        datos.lista.forEach(element => {
          if (element.codigo.slice(0, caracteres.value) === datos.codigo.toUpperCase()) {
            validarCodigo.value = false
            datosValidos.value = false
          }
        })
      }
    }
  }
)

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  dataLoading()
  try {
    await getEstructuraUse()
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