<template>
  <CRow>
    <!-- ================================================================================ -->
    <!-- Tabla de Jefes                                                      -->
    <!-- ================================================================================ -->
    <CCol :xs="12">
      <CCard>
        <!-- Cabecera de la lista con estilo -->
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <div class="align-items-center">
            <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
            <label class="mb-0 fs-6 text-white">Lista de Jefes</label>
          </div>
        </CCardHeader>
        <!-- Cuerpo de la lista -->
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaJefes" :columns="columns" class="table table-striped"
              :options="{ responsive: true, language: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros' } }">

              <template #column-imagen="{ cellData }">
                <CAvatar size="xl" :src="cellData.foto" :status="cellData.estado" />
              </template>

              <template #column-datos="{ cellData }">
                <div class="d-flex flex-column">
                  <span class="fw-bold text-dark mb-1">
                    {{ cellData.nombre }} {{ cellData.apellido }}
                  </span>
                  <div class="text-muted small d-flex align-items-center gap-2">
                    <span><i class="bi bi-envelope me-2"></i>{{ cellData.email }}</span>
                    <span>•</span>
                    <span><i class="bi bi-phone me-2"></i>{{ cellData.celular }}</span>
                  </div>
                  <span class="badge bg-light text-secondary border mt-1 align-self-start" style="font-size: 0.75rem;">
                    {{ idpName }}: {{ cellData.idp }}
                  </span>
                </div>
              </template>

              <!-- Estado del Jefe -->
              <template #column-estado="{ cellData }">
                <CChip :color="cellData ? 'success' : 'danger'">
                  <i :class="cellData ? 'bi bi-check-circle text-success' : 'bi bi-x-circle text-danger'"></i>{{ cellData ?
                    'Activo' : 'Inactivo' }}
                </CChip>
              </template>

              <!-- Acciones y eventos para el Usuario -->
              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="ghost" @click="getPerfil(cellData)">
                    <i class="bi bi-person"></i>
                    <span class="d-none d-md-inline"> Perfil</span>
                  </CButton>

                  <CButton color="secondary" variant="ghost" @click="getPerfil(cellData)">
                    <i class="bi bi-file-earmark"></i>
                    <span class="d-none d-md-inline"> Solicitudes</span>
                  </CButton>

                  <CButton color="secondary" variant="ghost" @click="getPerfil(cellData)">
                    <i class="bi bi-file-earmark-text"></i>
                    <span class="d-none d-md-inline"> Rendiciones</span>
                  </CButton>
                </CButtonGroup>
              </template>

            </DataTable>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <br>
</template>

<script setup>
import { onMounted, onUnmounted,ref } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuthStore } from '@/stores/authStores'

DataTable.use(DataTablesCore)
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useEmpleado } from '@/composables/useEmpleado'
const { findByTipoUse, listaJefes } = useEmpleado()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

const auth = useAuthStore()

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const idpName = ref(auth.idpName)

const columns = [
  { data: 'id', title: 'ID',width: '10%' },
  { data: 'imagen', title: '', name: "imagen" },
  { data: 'datos', title: 'Datos Personales', name: 'datos' },
  { data: 'estado', title: 'Estado', name: 'estado',width: '10%' },
  {
    data: 'acciones',
    title: 'Acciones',
    orderable: false,
    searchable: false,
    name: 'acciones',
    width: '25%'
  }
]

/**Funciones */
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'Dependencias' })
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

onMounted(async () => {
  const tooltips = document.querySelectorAll('.tooltip')
  tooltips.forEach(tooltip => tooltip.remove())
  dataLoading()
  try {
    await findByTipoUse('JEFE')
  } finally {
    close()
  }
  getAction()

})
onUnmounted(() => {
  clearActions()
})

</script>
