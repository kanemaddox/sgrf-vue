<template>
  <CRow>
    <!-- ================================================================================ -->
    <!-- Tabla de Formularios Con Solicitudes         -->
    <!-- ================================================================================ -->
    <CCol :xs="12">
      <CCard>
        <!-- Cabecera de la tarjeta -->
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
          <label class="mb-0 fs-6 text-white">Mis {{ titulo }}</label>
        </CCardHeader>

        <!-- Cuerpo de la tarjeta  -->
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaRdg" :columns="columns" class="table table-striped"
              :options="{ responsive: true, language: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros' } }">

              <template #column-datos="{ cellData }">
                <span><strong>Numero : </strong>{{ cellData.numero }}</span><br>
                <div class="small text-body-secondary text-nowrap">
                  <span>{{ persona.idp }} | {{ cellData.gestion }}</span>
                </div>
              </template>

              <template #column-detalle="{ cellData }">
                <span>{{ cellData.actividad }}</span>
                <div class="small text-body-secondary text-nowrap">
                  <span><strong>Importe : </strong>{{ cellData.importe }} {{ cellData.moneda
                    }}</span><br>
                  <span><strong>Fecha de Solicitud : </strong>{{ cellData.fechaS }}</span><br>
                  <span><strong>Fecha de Aprobacion : </strong>{{ cellData.fechaA }}</span><br>
                </div>
              </template>

              <template #column-estado="{ cellData }">
                <CChip :color="cellData.color">
                  <span class="chip-icon">
                    <i :class="cellData.icon"></i>
                  </span>SOLICITUD
                </CChip>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="ghost" @click="getRdg(cellData.id)">
                    <i class="bi bi-folder-plus me-2"></i>
                    <span class="d-none d-md-inline">Crear</span>
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

// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { onMounted, onUnmounted, ref } from 'vue';
import { useAlert } from '@/composables/useAlert'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useAuthStore } from '@/stores/authStores'
import { useFunction } from '@/composables/useFunction'
import { useRouter } from 'vue-router'
import { useRdg } from '@/composables/useRdg'

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { dataLoading, close } = useAlert()
const { setActions, clearActions } = useBreadcrumb()
const { getRdgUsuarioEstadoUse, listaRdg } = useRdg()
const { getEstado } = useFunction()
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
const titulo = ref('')
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
  router.push({ name: 'MenuRdg' })
}
const getRdg = (value) => {
  router.push({
    name: 'CrearRDG',
    params: { idRdg: value }
  })
}
const getLoadData = (value) => {
  titulo.value = getEstado(value)
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
    await getRdgUsuarioEstadoUse(persona.value.id, 'TRAMITE')
    getLoadData('TRAMITE')
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