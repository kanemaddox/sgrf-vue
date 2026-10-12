<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="12" :sm="12" :md="12" :lg="12">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Listado de Rendiciones {{ titulo }}</label>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaRdg" :columns="columns" class="table table-striped" :options="{ responsive: true }">

              <template #column-imagen="{ cellData }">
                <CAvatar size="lg" :src="cellData.foto" />
              </template>

              <template #column-solicitante="{ cellData }">
                {{ cellData.nombre }}
                <div class="small text-body-secondary text-nowrap">
                  <span>{{ cellData.idp }}</span>
                </div>
              </template>

              <template #column-formulario="{ cellData }">
                <span><strong>No. : </strong>{{ cellData.numero }} <span class="small text-body-secondary text-nowrap">
                    {{ cellData.idp }} | {{ cellData.gestion }}</span> </span> <br>
                <div class="small text-body-secondary text-nowrap">
                  <span>{{ cellData.detalle }}</span><br>
                  <span><strong>Importe :</strong> {{ cellData.importe }} {{ cellData.moneda }}</span><br>
                  <span><strong>Gasto :</strong> {{ cellData.gasto }} {{ cellData.moneda }}</span><br>
                </div>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="fw-semibold"></div>
                  <div class="text-nowrap text-body-secondary small ms-3">
                    {{ cellData.fecha }}
                  </div>
                </div>
                <CProgress thin :color="color" :value="70" />
              </template>

              <template #column-estado="{ cellData }">
                <CChip :color="color">
                  <span class="chip-icon">
                    <i :class="icon"></i>
                  </span>{{ cellData }}
                </CChip>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="ghost" @click="getRdg(cellData)">
                    <i class="bi bi-clipboard me-2"></i>
                    <span class="d-none d-md-inline">Revisar</span>
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
  rendicion: {
    type: String,
    required: true
  }
})

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
DataTable.use(DataTablesCore)

import 'bootstrap-icons/font/bootstrap-icons.css'

import { onMounted, onUnmounted, ref } from 'vue';
import { useAprobacionRdg } from '@/composables/Aprobacion/useRdg'
const { getEstadoRdgUse, listaRdg } = useAprobacionRdg()

import { useRouter } from 'vue-router'
const router = useRouter()
import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()
import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const persona = ref(auth.persona)

import { useFunction } from '@/composables/useFunction'
const { getColor, getIcono, getEstado } = useFunction()

const color = ref('')
const titulo = ref('')
const icon = ref('')

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'imagen', title: '', name: 'imagen' },
  { data: 'solicitante', title: 'Solicitante', name: 'solicitante' },
  { data: 'formulario', title: 'Formulario', name: 'formulario' },
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
    name: 'RevisarRdg',
    params: { idRdg: value }
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

onMounted(() => {
  const tooltips = document.querySelectorAll('.tooltip')
  tooltips.forEach(tooltip => tooltip.remove())
  dataLoading()
  try {
    getEstadoRdgUse(persona.value.id, lista.rendicion.toUpperCase())
    getLoadData(lista.rendicion.toUpperCase())
  } finally {
    close()
  }
  getAction()
})
onUnmounted(() => {
  clearActions()
})
</script>