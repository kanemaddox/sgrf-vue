<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="12" :sm="12" :md="12" :lg="12">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Mis Solicitudes {{ titulo }}</label>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaSrf" :columns="columns" class="table table-striped" :options="{ responsive: true }">

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

              <template #column-estado="{ cellData }">
                <CChip :color="color">
                  <span class="chip-icon">
                    <i :class="icon"></i>
                  </span>{{ cellData.estado }}
                </CChip>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="ghost" @click="getSrf(cellData.id)">
                    <i class="bi bi-clipboard me-2"></i> 
                    <span class="d-none d-md-inline">Detalle</span>
                  </CButton>

                  <CButton v-if="cellData.estado === 'APROBADO'" color="secondary" variant="ghost"
                    @click="getRdg">
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
const lista = defineProps({
  estado: {
    type: String,
    required: true
  }
})


import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
DataTable.use(DataTablesCore)

import 'bootstrap-icons/font/bootstrap-icons.css'

import { onMounted,onUnmounted, ref } from 'vue';
import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

import { useSrf } from '@/composables/useSrf'
const { getSrfUsuarioEstadoUse, listaSrf } = useSrf()

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = ref(auth.persona)
const idp = persona.value.idp

import { useFunction } from '@/composables/useFunction'
const { formatearNumero, getColor, getIcono, getEstado,getProgreso } = useFunction()
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

const salir = () => {
    getSalir()
}

const getSalir = () => {
    router.push({name: 'MenuSrf'})
}
const getSrf = (value) => {
  router.push({
    name: 'DetalleSrf',
    params: { idSrf: value }
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

onMounted(async() => {
  const tooltips = document.querySelectorAll('.tooltip')
  tooltips.forEach(tooltip => tooltip.remove())
  getLoadData(lista.estado.toUpperCase())

  dataLoading()
  try {
    await getSrfUsuarioEstadoUse(persona.value.id, lista.estado.toUpperCase())
  } finally {
    close()
  }
  getAction()
  
})
onUnmounted(() => {
    clearActions()
})
</script>