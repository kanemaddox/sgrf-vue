<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="7" :sm="6" :md="6" :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Lista de Usuarios</label>
              </div>
            </CCol>
            <CCol :xs="5" :sm="6" :md="6" :lg="6" class="text-end">
              <CDropdown variant="btn-group">
                <CDropdownToggle class="font border-0" size="sm">
                  <CIcon icon="cil-menu" color="dark" class="me-2 text-success" />Opciones
                </CDropdownToggle>
                <CDropdownMenu class="pt-0">
                  <CDropdownHeader component="h6"
                    class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top">
                    Opciones
                  </CDropdownHeader>
                  <CDropdownItem style="cursor: pointer;" @click="clickModalImportar(true)">
                    <CIcon icon="cil-data-transfer-down" /> Importar Usuarios
                  </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem style="cursor: pointer;" @click="clickModalExportar(true)">
                    <CIcon icon="cil-cloud-upload" /> Exportar Usuarios DB
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaUsuario" :columns="columns" class="table table-striped"
              :options="{ responsive: true }">

              <template #column-imagen="{ cellData }">
                <!--<CImage :src="cellData" width="70" height="70" />-->
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
                  <CButton color="secondary" variant="outline" @click="getPerfil(cellData)"
                    v-c-tooltip="{ content: 'Ver Perfil Usuario', placement: 'top' }">
                    <i class="bi bi-person me-2"></i>
                  </CButton>

                  <CButton color="secondary" variant="outline" @click="getPerfil(cellData)"
                    v-c-tooltip="{ content: 'Solicitudes de Fondos Por Rendir', placement: 'top' }">
                    <i class="bi bi-clipboard me-2"></i>
                  </CButton>

                  <CButton color="secondary" variant="outline" @click="getPerfil(cellData)"
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
import { reactive, ref, onMounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'

DataTable.use(DataTablesCore)

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUsuario } from '@/composables/useUsuario'
const { findAllResponseUse, loading, errorUse } = useUsuario()

import 'bootstrap-icons/font/bootstrap-icons.css'

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100

//const lista = reactive([])
const listaUsuario = ref([])

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'imagen', title: '', name: "imagen" },
  { data: 'datos', title: 'Datos Personales', name: 'datos'},
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
const findAllResponse = async (value) => {
  try {
    const resultLista = await findAllResponseUse(value)
    const lista = resultLista.data
    listaUsuario.value = lista.map(item => ({
      id: item.id,
      imagen: {
        foto: item.persona?.foto === 'usuario.png' ? '/public/usuario.png' : API_URL_IMG100 + item.persona.foto,
        estado: item.estado ? 'success' : 'danger',
      },
      datos: {
        idp: item.persona?.idp,
        nombre: item.persona?.nombre,
        apellido: item.persona?.paterno + " " + item.persona?.materno,
        email: item.persona?.email,
        celular: item.persona?.celular,
      },
      estado: item.estado,
      acciones: item.id,
    }))
  } catch (errr) {
    console.log(errr)
  }

}
const getPerfil = (value) => {
  router.push({
    name: 'PerfilUsuario',
    params: { idUsuario: value }
  })
}


onMounted(() => {
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => tooltip.remove());
  findAllResponse('TODOS')
})


</script>
<style>
@import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
@import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';
</style>