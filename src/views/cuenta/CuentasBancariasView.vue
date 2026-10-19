<template>
  <CRow>
    <!-- ================================================================================ -->
    <!-- Tabla de Cuentas Bancarias                                                                   -->
    <!-- ================================================================================ -->
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :lg="12">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Cuentas Bancarias</label>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaBancaria" :columns="columns" class="table table-striped"
              :options="{ responsive: true, language: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros' } }">

              <!-- Estado de la Cuenta -->
              <template #column-estado="{ cellData }">
                <CChip :color="cellData ? 'success' : 'danger'">
                  <i :class="cellData ? 'bi bi-check-circle text-success' : 'bi bi-x-circle text-danger'"></i>{{ cellData ?
                    'Activo' : 'Inactivo' }}
                </CChip>
              </template>
            </DataTable>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script setup>
// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { ref, onMounted, onUnmounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import { useAuthStore } from '@/stores/authStores'
import { useCuentasBancarias } from '@/composables/useCuentaBancaria'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useAlert } from '@/composables/useAlert'
import { useRouter } from 'vue-router'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { getCuentasBancariasUse, listaBancaria } = useCuentasBancarias()
const { setActions, clearActions } = useBreadcrumb()
const { dataLoading, close } = useAlert()
const auth = useAuthStore()
const router = useRouter()
DataTable.use(DataTablesCore)

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const persona = ref(auth.persona)

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const columns = [
  { data: 'id', title: 'ID' },
  { data: 'banco', title: 'Banco' },
  { data: 'tipo', title: 'Tipo de Cuenta' },
  { data: 'numero', title: 'Numero de Cuenta' },
  { data: 'estado', title: 'Estado', name: 'estado' }
]

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'Home' })
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

// ============================================================================
// 6. CICLO DE VIDA DEL COMPONENTE
// ============================================================================
onMounted(async () => {
  dataLoading()
  try {
    await getCuentasBancariasUse(persona.value.id)
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