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
                  </span>{{ cellData.estado }}
                </CChip>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="outline" @click="getRdg(cellData.id)"
                    v-c-tooltip="{ content: 'Crear Rencicion de Cuentas', placement: 'top' }">
                    <i class="bi bi-list-check me-2"></i>
                  </CButton>

                  <CButton v-if="cellData.estado === 'APROBADO'" color="secondary" variant="outline"
                    @click="getSrf(cellData.id)"
                    v-c-tooltip="{ content: 'Crear Rendicion de Fondos', placement: 'top' }">
                    <i class="bi bi-cash-coin me-2"></i>
                  </CButton>

                  <CButton color="secondary" variant="outline" @click="getSrf(cellData)"
                    v-c-tooltip="{ content: 'Rendiciones de Gastos', placement: 'top' }">
                    <i class="bi bi-file-earmark-text me-2"></i>
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

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
DataTable.use(DataTablesCore)

import 'bootstrap-icons/font/bootstrap-icons.css'

import { onMounted, onUnmounted, ref } from 'vue';

import { useRouter } from 'vue-router'
const router = useRouter()
import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = ref(auth.persona)

import { useRdg } from '@/composables/useRdg'
const { getRdgUsuarioEstadoUse, listaRdg } = useRdg()

import { useFunction } from '@/composables/useFunction'
const { getEstado } = useFunction()
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

onMounted(async () => {
  const tooltips = document.querySelectorAll('.tooltip')
  tooltips.forEach(tooltip => tooltip.remove())
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
</script>