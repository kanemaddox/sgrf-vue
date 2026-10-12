<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="12" :sm="12" :md="12" :lg="12">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Solicitudes Pendientes</label>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaPendiente" :columns="columns" class="table table-striped"
              :options="{ responsive: true }">

              <template #column-imagen="{ cellData }">
                <CAvatar size="lg" :src="cellData.foto" />
              </template>

              <template #column-datos="{ cellData }">
                {{ cellData.nombre }}
                <div class="small text-body-secondary text-nowrap">
                  <span>{{ cellData.idp }}</span>
                </div>
              </template>

              <template #column-srf="{ cellData }">
                <span>No. : {{ cellData.numero }}</span><br>
                <div class="small text-body-secondary text-nowrap">
                  <span>Monto : {{ cellData.monto }} {{ cellData.moneda }}</span><br>
                </div>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="fw-semibold"></div>
                  <div class="text-nowrap text-body-secondary small ms-3">
                    {{ cellData.fecha }}
                  </div>
                </div>
                <CProgress thin color="warning" :value="70" />
              </template>

              <template #column-estado="{ cellData }">
                <CChip color="warning">
                  <span class="chip-icon">
                    <i class="bi bi-exclamation-triangle"></i>
                  </span>{{ cellData }}
                </CChip>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="secondary" variant="outline" @click="getSrf(cellData)"
                    v-c-tooltip="{ content: 'Detalle de la Solicitud', placement: 'top' }">
                    <i class="bi bi-clipboard me-2"></i>
                  </CButton>

                  <CButton color="secondary" variant="outline" @click="getSrf(cellData)"
                    v-c-tooltip="{ content: 'Ver Perfil Usuario', placement: 'top' }">
                    <i class="bi bi-person me-2"></i>
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

import { onMounted, ref } from 'vue';
import { useAprobacion } from '@/composables/useAprobacion'
const { getPendientesUse } = useAprobacion()

import { useRouter } from 'vue-router'
const router = useRouter()

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const idUsuario = ref(auth.idUsuario)

const listaPendiente = ref([])

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'imagen', title: '', name: 'imagen' },
  { data: 'datos', title: 'Solicitante', name: 'datos' },
  { data: 'detalle', title: 'Solicitud', name: 'detalle', width: '40%' },
  { data: 'srf', title: 'Detalle', name: 'srf' },
  { data: 'estado', title: 'Estado', name: 'estado' },
  {
    data: 'acciones',
    title: 'Acciones',
    orderable: false,
    searchable: false,
    name: 'acciones'
  }
]

const getPendientes = async (value) => {
  try {
    const resultLista = await getPendientesUse(idUsuario.value, value)
    listaPendiente.value = resultLista.map(item => ({
      id: item.id,
      srf: {
        numero: item.srf.numero,
        gestion: item.srf.gestion,
        monto: item.srf.monto,
        moneda: item.srf.moneda,
        fecha: item.srf.fechaSolicitud,
      },
      datos: {
        idp: item.srf.empleado.persona.idp,
        nombre: item.srf.empleado.persona.nombre,
      },
      imagen: {
        foto: item.srf.empleado.persona.foto === 'usuario.png' ? '/usuario.png' : img100 + item.srf.empleado.persona.foto
      },
      detalle: item.srf.detalle,
      estado: item.estado,
      acciones: item.id,
    }))

  } catch (errr) {
    console.log(errr)
  }
}

const getSrf = (value) => {
  router.push({
    name: 'Detalle de la Solicitud',
    params: { idSrf: value }
  })
}

onMounted(() => {
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => tooltip.remove());
  getPendientes('PENDIENTE')
})
</script>