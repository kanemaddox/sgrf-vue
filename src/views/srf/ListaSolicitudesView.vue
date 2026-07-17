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
            <DataTable :data="listaPendiente" :columns="columns" class="table table-striped"
              :options="{ responsive: true }">

              <template #column-datos="{ cellData }">
                <span><strong>Numero : </strong>{{ cellData.numero }}</span><br>
                <div class="small text-body-secondary text-nowrap">
                  <span><strong>Monto : </strong>{{ cellData.monto }} {{cellData.moneda}}</span>
                </div>
              </template>

              <template #column-detalle="{ cellData }">
                <span>{{ cellData.detalle }}</span>
                <div class="small text-body-secondary text-nowrap">
                  <span><strong>Creado : </strong> {{ cellData.fechaInicio }}</span><br>
                  <span><strong>Estimado : </strong>{{ cellData.fechaFin }}</span>
                </div>
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
                  <CButton color="secondary" variant="outline" @click="getSrf(cellData.id)"
                    v-c-tooltip="{ content: 'Detalle de la Solicitud', placement: 'top' }">
                    <i class="bi bi-clipboard me-2"></i>
                  </CButton>

                  <CButton v-if="cellData.estado==='APROBADO'" color="secondary" variant="outline" @click="getSrf(cellData.id)"
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
const lista = defineProps({
  estado: {
        type: String, // o Number, dependiendo de lo que mandes
        required: true
    }
})


import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
DataTable.use(DataTablesCore)

import 'bootstrap-icons/font/bootstrap-icons.css'

import { onMounted, ref } from 'vue';
import { useSrf } from '@/composables/useSrf'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore } from '@/stores/authStores'
const auth = useAuthStore()
const idUsuario = ref(auth.idUsuario)

import { useFunction } from '@/composables/useFunction'
const{getColor,getIcono,getEstado} = useFunction()
const color = ref('')
const titulo = ref('')
const icon = ref('')


const { getSrfUsuarioEstadoUse } = useSrf()
const listaPendiente = ref([])

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'datos', title: 'Datos', name: 'datos' },
  { data: 'detalle', title: 'Detalle', name: 'detalle',width: '40%' },
  { data: 'estado', title: 'Estado', name: 'estado' },
  {
    data: 'acciones',
    title: 'Acciones',
    orderable: false,
    searchable: false,
    name: 'acciones'
  }
]

const getSrfUsuarioEstado = async (value) => {
  titulo.value = getEstado(value)
  icon.value = getIcono(value)
  color.value = getColor(value)
  
  try {
    const resultLista = await getSrfUsuarioEstadoUse(idUsuario.value, value)
    const lista = resultLista.data
    listaPendiente.value = lista.map(item => ({
      id: item.id,
      datos: {
        numero: item.numero,
        gestion: item.gestion,
        monto: item.monto,
        moneda: item.moneda,
        tipo: item.tipo,
        texto: item.campoTexto,
        numerico: item.campoNumerico,
      },
      detalle:{
        detalle:item.detalle,
        fechaInicio: item.fechaSolicitud,
        fechaFin: item.fechaEstimada.split('T')[0],
      }, 
      estado: {
        estado: item.estado,
        //lista: item.aprobadores,
      },
      acciones: {
        id:item.id,
        estado:item.estado
      }
    }))
    /*console.log(listaPendiente.value)*/
  } catch (errr) {
    console.log(errr)
  }
}

const getSrf = (value) => {
  router.push({
    name: 'DetalleSrf',
    params: { idSrf: value }
  })
}

onMounted(() => {
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => tooltip.remove());
  getSrfUsuarioEstado(lista.estado.toUpperCase())
})
</script>