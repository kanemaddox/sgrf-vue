<template>
  <CRow>
    <!-- ================================================================================ -->
    <!-- Tabla de Rendiciones                                                   -->
    <!-- ================================================================================ -->
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="12" :sm="10" :md="10" :lg="10">
              <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
              <label class="mb-0 fs-6 text-white">Rendiciones </label>
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
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaRdg" :columns="columns" class="table table-striped" 
            :options="{ responsive: true, language: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros' } }">

              <template #column-datos="{ cellData }">
                <span><strong>Formulario : </strong>{{ cellData.numero }}</span><br>
                <div class="small text-body-secondary text-nowrap">
                  <span>{{ cellData.idp }} | {{ cellData.gestion }}</span><br>
                  <span><strong>Importe : </strong>{{ cellData.importe }} {{ cellData.moneda
                    }}</span><br>
                  <span><strong>Fecha : </strong>{{ cellData.fecha }} </span>
                </div>
              </template>

              <template #column-detalle="{ cellData }">
                <span>{{ cellData.detalle }}</span>
                <div class="small text-body-secondary text-nowrap">
                  <span><strong>Actividad : </strong> {{ lenFirma(cellData.actividad) }} </span><br>
                  <span><strong>Gasto : </strong> {{ cellData.gasto }} {{ cellData.moneda
                    }}</span><br>
                  <span><strong>Saldo : </strong>{{ cellData.saldo }} {{ cellData.moneda }}</span>
                </div>
              </template>

              <template #column-estado="{ cellData }">
                <CChip :color="cellData.color">
                  <span class="chip-icon">
                    <i :class="cellData.icon"></i>
                  </span>{{ cellData.estado }}
                </CChip>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="ghost" @click="getRdg(cellData.id)">
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
import { useRouter } from 'vue-router'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useAlert } from '@/composables/useAlert'
import { useAuthStore } from '@/stores/authStores'
import { useRdg } from '@/composables/useRdg'
import { useFunction } from '@/composables/useFunction'

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================

const { setActions, clearActions } = useBreadcrumb()
const { getRdgUsuarioGestionUse, listaRdg } = useRdg()
const { lenFirma } = useFunction()
const { dataLoading, close } = useAlert()
const router = useRouter()
const auth = useAuthStore()

DataTable.use(DataTablesCore)

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================

const persona = ref(auth.persona)
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

const getRdg = (value) => {
  router.push({
    name: 'DetalleUsuarioRdg',
    params: { idRdg: value }
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
    await getRdgUsuarioGestionUse(usuario.idUsuario, anio)
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