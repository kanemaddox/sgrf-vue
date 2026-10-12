<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor">
          <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
          <label class="mb-0 fs-6 text-white">Lista de Usuarios</label>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaUsuario" :columns="columns" class="table table-striped"
              :options="{ responsive: true }">

              <template #column-imagen="{ cellData }">
                <CAvatar size="xl" :src="cellData.foto" :status="cellData.estado" />
              </template>

              <template #column-datos="{ cellData }">
                <span>{{ cellData.idp }}</span>
                <div class="small text-body-secondary text-nowrap">
                  <span><strong>Nombre :</strong> {{ cellData.nombre }} {{ cellData.apellido }}</span><br>
                  <span>{{ cellData.email }} | {{ cellData.celular }}</span>
                </div>
              </template>

              <!-- Estado personalizado -->
              <template #column-estado="{ cellData }">
                <CBadge :color="cellData ? 'success' : 'danger'">
                  {{ cellData ? 'Activo' : 'Inactivo' }}
                </CBadge>
              </template>

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">
                  <CButton color="success" class="custom-hover-btn" variant="outline" @click="getPerfil(cellData)">
                    <i class="bi bi-person"></i>
                    <span class="d-none d-md-inline"> Perfil</span>
                  </CButton>
                  
                  <CButton color="secondary" variant="outline" @click="getPerfil(cellData)">
                    <i class="bi bi-file-earmark"></i>
                    <span class="d-none d-md-inline"> Srf</span>
                  </CButton>

                  <CButton color="secondary" variant="outline" @click="getPerfil(cellData)">
                    <i class="bi bi-file-earmark-text"></i>
                    <span class="d-none d-md-inline"> Rdg</span>
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
import { onMounted, onUnmounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'

DataTable.use(DataTablesCore)

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useUsuario } from '@/composables/useUsuario'
const { listaUsuario, findAllResponseUse } = useUsuario()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

import 'bootstrap-icons/font/bootstrap-icons.css'

const columns = [
  { data: 'id', title: 'ID', width: '5%'},
  { data: 'imagen', title: '', name: "imagen" },
  { data: 'datos', title: 'Datos Personales', name: 'datos' },
  { data: 'estado', title: 'Estado', name: 'estado' },
  {
    data: 'acciones',
    title: 'Acciones',
    orderable: false,
    searchable: false,
    name: 'acciones'
  }
]

/**Funciones */
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'UsuariosMenu' })
}

const getPerfil = (value) => {
  router.push({
    name: 'PerfilUsuario',
    params: { idUsuario: value }
  })
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
    await findAllResponseUse('TODOS')
  } finally {
    close()
  }
  getAction()
})
onUnmounted(() => {
  clearActions()
})

</script>
<style>
@import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
@import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';
</style>