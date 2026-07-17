<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <CCol :xs="7" :sm="6" :md="6" :lg="6">
              <div class="align-items-center">
                <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                <label class="mb-0 fs-6 text-white">Lista de Gastos</label>
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
                  <CDropdownItem style="cursor: pointer;" @click="clickModalGasto(true)">
                    <CIcon icon="cil-plus" /> Agregar Gasto
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaCuenta" :columns="columns" class="table table-striped"
              :options="{ responsive: true }">

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">

                  <CButton color="secondary" variant="outline" @click="editarGasto(cellData)"
                    v-c-tooltip="{ content: 'Editar Cuenta de Gasto', placement: 'top' }">
                    <i class="bi bi-pencil-square"></i>
                  </CButton>

                </CButtonGroup>
              </template>

            </DataTable>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  Editar-->
  <CModal :visible="modalEditar" backdrop="static" @close="clickModalEditar(false)">
    <CForm @submit.prevent="updateGasto">
      <CModalHeader class="headercolor" dismiss @close="clickModalEditar(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-pencil" size="lg" class="me-2" />Editar Cuenta de Gasto
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">Tipo de Cuenta :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.tipo" placeholder="Tipo de Cuenta" required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">Codigo :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.codigo" placeholder="Codigo" required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">Detalle :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.detalle" placeholder="Detalle" required />
        </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalEditar(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>

        <CButton type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />
          <span>Aceptar</span>
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Editar-->

  <!-- Modal  Crear-->
  <CModal :visible="modalGasto" backdrop="static" @close="clickModalGasto(false)">
    <CForm @submit.prevent="createGasto">
      <CModalHeader class="headercolor" dismiss @close="clickModalGasto(false)">
        <CModalTitle>
          <h6>
            <CIcon icon="cil-description" size="lg" class="me-2" />Crear Cuenta de Gasto
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">Tipo de Cuenta :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.tipo" :valid="validoTipo" placeholder="Tipo de Cuenta"
            required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">Codigo :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.codigo" :valid="validoCodigo" placeholder="Codigo" required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">Detalle :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.detalle" placeholder="Detalle" required />
        </CInputGroup>

        <CAlert color="danger" v-if="alertTipo">
          El Tipo de cuenta Existe
        </CAlert>

        <CAlert color="danger" v-if="alertCodigo">
          El Codigo Existe
        </CAlert>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalGasto(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>

        <CButton v-if="!datosValidos" class="font" color="info" size="sm" @click="revisarDatos">
          <CIcon icon="cil-description" class="me-2" />
          Verificar Datos
        </CButton>

        <CButton v-if="datosValidos" type="submit" class="font" color="success" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />
          Registrar
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal Crear-->

</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'

DataTable.use(DataTablesCore)


import { useCuenta } from '@/composables/useCuenta'
const { registrarCuentaUse,updateCuentaUse, getCuentaUse, listaCuenta } = useCuenta()

import 'bootstrap-icons/font/bootstrap-icons.css'

const columns = [
  { data: 'id', title: 'ID', width: '5%' },
  { data: 'tipo', title: 'Tipo de Cuenta', name: "tipo", width: '30%' },
  { data: 'codigo', title: 'Codigo', name: 'codigo', width: '10%' },
  { data: 'detalle', title: 'Detalle', name: 'detalle', width: '55%' },
  {
    data: 'acciones',
    title: 'Acciones',
    orderable: false,
    searchable: false,
    name: 'acciones'
  }
]

const validoTipo = ref(false)
const alertTipo = ref(false)
const validoCodigo = ref(false)
const alertCodigo = ref(false)
const datosValidos = ref(false)
const modalGasto = ref(false)
const modalEditar = ref(false)

const gastoUpdate = reactive({
  id: 0,
  tipo: '',
  codigo: '',
  detalle: ''
})

/**Funciones */

const editarGasto = (idGasto) => {
  listaCuenta.value.forEach(element => {
    if (element.id === idGasto) {
      gastoUpdate.id = element.id
      gastoUpdate.tipo = element.tipo
      gastoUpdate.codigo = element.codigo
      gastoUpdate.detalle = element.detalle
    }
  })
  clickModalEditar(true)
}
const clickModalEditar = (value) => {
  modalEditar.value = value
}

const clickModalGasto = (value) => {
  modalGasto.value = value
}

const revisarDatos = () => {
  const tipoUpper = gastoUpdate.tipo.toUpperCase()
  const codigoUpper = gastoUpdate.codigo.toUpperCase()

  const existeTipo = listaCuenta.value.some(el => el.tipo.toUpperCase() === tipoUpper)
  const existeCodigo = listaCuenta.value.some(el => el.codigo.toUpperCase() === codigoUpper)

  validoTipo.value = !existeTipo
  validoCodigo.value = !existeCodigo

  alertTipo.value = existeTipo
  alertCodigo.value =existeCodigo

  datosValidos.value = validoCodigo.value && validoTipo.value

}

const updateGasto = async () => {
  clickModalEditar(false)
  const resultService = await updateCuentaUse(gastoUpdate)
  if (resultService) {
    location.reload()
  } else {
    console.log("error")
  }
}

const createGasto = async () => {
  clickModalGasto(false)
  const resultService = await registrarCuentaUse(gastoUpdate)
  if (resultService) {
    location.reload()
  } else {
    console.log("error")
  }
}

watch(
  () => gastoUpdate.codigo,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      datosValidos.value = false
      alertCodigo.value = false
    }
  }
)

watch(
  () => gastoUpdate.tipo,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      datosValidos.value = false
      alertTipo.value = false
    }
  }
)

onMounted(async () => {
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => tooltip.remove());
  await getCuentaUse()
})


</script>
<style>
@import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
@import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';
</style>