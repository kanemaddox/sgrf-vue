<template>
  <CRow>
    <!-- ================================================================================ -->
    <!-- Tabla de Solcitudes Pendientes                                                   -->
    <!-- ================================================================================ -->
    <CCol :xs="12">
      <CCard>
        <!-- Cabecera de la lista -->
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
          <label class="mb-0 fs-6 text-white">Solicitudes</label>
        </CCardHeader>
        <!-- Cuerpo de la lista -->
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaSrf" :columns="columns" class="table table-striped"
              :options="{ responsive: true, language: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros' } }">

              <template #column-datos="{ cellData }">
                <span><strong>No. : </strong>{{ cellData.numero }}</span><br>
                <div class="small text-body-secondary text-nowrap">
                  <span> {{ idp }} | {{ cellData.gestion }}</span><br>
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
                <CChip :color="color" size="sm">
                  <span class="chip-icon">
                    <i :class="icon"></i>
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

                  <CButton v-if="cellData.estado === 'APROBADO'" color="secondary" variant="ghost" @click="getRdg">
                    <i class="bi bi-cash-coin me-2"></i>
                    <span class="d-none d-md-inline">Formulario</span>
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
import { onMounted, onUnmounted, ref } from 'vue';
import { useAlert } from '@/composables/useAlert'
import { useSrf } from '@/composables/useSrf'
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStores'
import { useFunction } from '@/composables/useFunction'

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ============================================================================
// 2. INICIALIZACIÓN DE STORES, COMPOSABLES Y ROUTER
// ============================================================================
const { formatearNumero, getColor, getIcono, getEstado, getProgreso } = useFunction()
const { dataLoading, close } = useAlert()
const { getSrfUsuarioEstadoUse, listaSrf } = useSrf()
const { setActions, clearActions } = useBreadcrumb()
const router = useRouter()
const auth = useAuthStore()
DataTable.use(DataTablesCore)

// ============================================================================
// 3. DATOS DEL USUARIO AUTENTICADO
// ============================================================================
const persona = ref(auth.persona)
const idp = persona.value.idp

// ============================================================================
// 4. DECLARACIONES DE VARIABLES
// ============================================================================
const color = ref('')
const titulo = ref('')
const icon = ref('')

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
    name: 'DetalleUsuario',
    params: { idUsuario:usuario.idUsuario,idSrf: value }
  })
}

const getRdg = () => {
  router.push({
    name: 'MenuRdg'
  })
}

const getLoadData = (value) => {
  titulo.value = getEstado(value)
  icon.value = getIcono(value)
  color.value = getColor(value)
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
  getLoadData('PENDIENTE')
  dataLoading()
  try {
    await getSrfUsuarioEstadoUse(usuario.idUsuario, 'PENDIENTE')
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