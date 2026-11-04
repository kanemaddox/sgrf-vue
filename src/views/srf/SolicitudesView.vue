<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="12" :sm="12" :md="12" :lg="12">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Listado de Solicitudes {{ titulo }}</label>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaSrf" :columns="columns" class="table table-striped" :options="tableOptions">

              <template #column-imagen="{ cellData }">
                <CAvatar size="lg" :src="cellData.foto" />
              </template>

              <template #column-datos="{ cellData }">
                {{ cellData.nombre }}
                <div class="small text-body-secondary text-nowrap">
                  <span>{{ cellData.idp }}</span>
                </div>
              </template>

              <template #column-formulario="{ cellData }">
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
              </template>

              <template #column-tipo="{ cellData }">
                <CChip :color="getColor(cellData.modificado)" variant="outline">
                  <span class="chip-icon">
                    <i :class="getIcono(cellData.modificado)"></i>
                  </span>{{ cellData.modificado }}                    
                  </CChip> 
              </template>

              <template #column-estado="{ cellData }">
                <CChip :color="color">
                  <span class="chip-icon">
                    <i :class="icon"></i>
                  </span>{{ cellData.estado }}
                </CChip>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton v-if="cellData.estado === 'PENDIENTE'" color="secondary" variant="ghost"
                    @click="getRevisar(cellData.token)">
                    <i class="bi bi-clipboard me-2"></i> Revisar
                  </CButton>

                  <CButton v-else color="secondary" variant="ghost" @click="getRevisar(cellData.token)">
                    <i class="bi bi-file-earmark-minus me-2"></i>Detalle
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

const lista = defineProps({
  solicitud: {
    type: String,
    required: true
  }
})

// ============================================================================
// 1. IMPORTACIONES
// ============================================================================
import { onMounted, onUnmounted, ref } from 'vue'
import { useAlert } from '@/composables/useAlert'
import { useApSrf } from '@/composables/Aprobacion/useSrf'
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
const { dataLoading, close } = useAlert()
const { getSrfEstadoUse, listaSrf } = useApSrf()
const { setActions, clearActions } = useBreadcrumb()
const { formatearNumero, getColor, getIcono, getEstado } = useFunction()
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
const color = ref('')
const titulo = ref('')
const icon = ref('')

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'imagen', title: '', name: 'imagen' },
  { data: 'datos', title: 'Solicitante', name: 'datos' },
  { data: 'formulario', title: 'Formulario', name: 'formulario' },
  { data: 'detalle', title: 'Solicitud', name: 'detalle', width: '35%' },
  { data: 'tipo', title: 'Tipo', name: 'tipo' },
  { data: 'estado', title: 'Estado', name: 'estado' },
  {
    data: 'acciones',
    title: 'Acciones',
    orderable: false,
    searchable: false,
    name: 'acciones'
  }
]

const tableOptions = {
  responsive: true,
  order:[[0,'desc']], 
  language: { 
    search: 'Buscar:', 
    lengthMenu: 'Mostrar _MENU_ registros' 
  }
}

// ============================================================================
// 5. FUNCIONES DE NAVEGACIÓN
// ============================================================================
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'MenuSrf' })
}
const getRevisar = (value) => {
  router.push({
    name: 'RevisarSrf',
    params: { idSrf: value }
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
  getLoadData(lista.solicitud.toUpperCase())
  dataLoading()
  try {
    await getSrfEstadoUse(persona.value.id, lista.solicitud.toUpperCase())
  } finally {
    await close()
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