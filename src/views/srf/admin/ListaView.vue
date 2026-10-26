<template>
  <CRow>
    <!-- ================================================================================ -->
    <!-- Tabla de Solcitudes                                                    -->
    <!-- ================================================================================ -->
    <CCol :xs="12">
      <CCard>
        <!-- Cabecera de la lista -->
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="12" :sm="10" :md="10" :lg="10">
              <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
              <label class="mb-0 fs-6 text-white">Solicitudes </label>
            </CCol>
            <CCol :xs="12" :sm="2" :md="2" :lg="2" class="text-end">
              <CInputGroup size="sm">
                <CInputGroupText class="headercolor" as="label">
                  <i class="bi bi-calendar-event me-2"></i>Gestion :
                </CInputGroupText>
                <select class="form-select" v-model="gestion">
                <option v-for="n in total" :key="n" :value="inicio + n - 1">
                  {{ inicio + n - 1 }}
                </option>
              </select>
              </CInputGroup>
              
            </CCol>
          </CRow>
        </CCardHeader>
        <!-- Cuerpo de la lista -->
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaSrf" :columns="columns" class="table table-striped"
              :options="{ responsive: true, language: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros' } }">

              <template #column-datos="{ cellData }">
                <span><strong>No. : </strong>{{ cellData.numero }}</span><br>
                <div class="small text-body-secondary text-nowrap">
                  <span> {{ cellData.idp }} | {{ cellData.gestion }}</span><br>
                  <span>{{ cellData.fechaInicio }}</span><br>
                </div>
              </template>

              <template #column-detalle="{ cellData }">
                <span>{{ cellData.detalle }}</span>
                <div class="small text-body-secondary text-nowrap">
                  <span><strong>{{ cellData.montoTitulo }} : </strong>{{ formatearNumero(cellData.monto) }} {{
                    cellData.moneda }}</span><br>
                  <span><strong>{{ cellData.fechaTitulo }} : </strong>{{ cellData.fechaFin }}</span>
                </div>
                <CProgress thin :color="getProgreso(cellData.aprobacion)" :value="Number(cellData.aprobacion)" />
              </template>

              <!-- Estado de la Solicitud -->
              <template #column-estado="{ cellData }">
                <CChip :color="getColor(cellData.estado)" size="sm">
                  <span class="chip-icon">
                    <i :class="getIcono(cellData.estado)"></i>
                  </span>{{ cellData.estado }}
                </CChip>
              </template>

              <!-- Acciones y eventos para la Solicutd -->
              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="ghost" @click="getSrf(cellData.id)">
                    <i class="bi bi-clipboard me-2"></i>
                    <span class="d-none d-md-inline">Detalle</span>
                  </CButton>
                </CButtonGroup>
              </template>
            </DataTable>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script setup>

const usuario = defineProps({
  idUsuario: {
    type: String,
    required: true
  }
})

// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useAlert } from '@/composables/useAlert'
import { useSrf } from '@/composables/useSrf'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useRouter } from 'vue-router'
import { useFunction } from '@/composables/useFunction'

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { formatearNumero, getColor, getIcono, getProgreso } = useFunction()
const { dataLoading, close } = useAlert()
const { getSrfUsuarioGestionUse, listaSrf } = useSrf()
const { setActions, clearActions } = useBreadcrumb()
const router = useRouter()
DataTable.use(DataTablesCore)

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================


// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const gestion = ref(new Date().getFullYear())
const inicio = ref(2024)
const total = (Number(gestion.value) - 2024) + 1

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'datos', title: 'Formulario', name: 'datos' },
  { data: 'detalle', title: 'Detalle', name: 'detalle', width: '40%' },
  { data: 'estado', title: 'Estado', name: 'estado' },
  {
    data: 'acciones',
    title: 'Acciones',
    orderable: false,
    searchable: false,
    name: 'acciones'
  }
]

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'ListaUsuarios' })
}

const getSrf = (value) => {
  router.push({
    name: 'DetalleUsuarioSrf',
    params: { idSrf: value }
  })
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

watch(gestion, async (nuevoAnio) => {
  await cargarDatosPorGestion(nuevoAnio);
})

const cargarDatosPorGestion = async (anio) => {
  dataLoading()
  try {
    await getSrfUsuarioGestionUse(usuario.idUsuario, anio)
  } finally {
    close()
  }
}

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  cargarDatosPorGestion(gestion.value)
  getAction()
})
onUnmounted(() => {
  clearActions()
})
// ============================================================================
// 7. CONFIGURACIÓN VISUAL
// ============================================================================

</script>