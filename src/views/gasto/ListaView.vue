<template>
  <CRow>
    <CCol :xs="12">
      <CCard>
        <CCardHeader class="headercolor justify-content-between align-items-center">
          <CRow>
            <div class="align-items-center">
              <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
              <label class="mb-0 fs-6 text-white">Lista de Gastos</label>
            </div>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="table-responsive">
            <DataTable :data="listaCuenta" :columns="columns" class="table table-striped"
              :options="{ responsive: true }">

              <template #column-acciones="{ cellData }">
                <CButtonGroup role="group" size="sm">

                  <CButton color="secondary" variant="ghost" @click="getCreateOrEdit(cellData, true)">
                    <i class="bi bi-pencil-square"></i>
                    <span class="d-none d-md-inline">Editar</span>
                  </CButton>

                </CButtonGroup>
              </template>

            </DataTable>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Modal  CrearteOrUpdate-->
  <CModal :visible="modalGasto" backdrop="static" @close="clickModalGasto(false)">
    <CForm @submit.prevent="selectSubmit">
      <CModalHeader class="headercolor" dismiss @close="clickModalGasto(false)">
        <CModalTitle>
          <h6>
            <CIcon :icon="iconoModal" size="lg" class="me-2" />{{ tituloModal }}
          </h6>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-card-heading me-2"></i>Tipo de Cuenta :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.tipo" :valid="validoTipo" placeholder="Tipo de Cuenta"
            required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-card-checklist me-2"></i>Cuenta :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.cuenta" :valid="validoCuenta" placeholder="Cuenta" required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-postcard me-2"></i>Nombre de la Cuenta :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.nombre" placeholder="Nombre de la Cuenta" required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-tags me-2"></i>Glosa :
          </CInputGroupText>
          <CFormInput type="text" v-model="gastoUpdate.glosa" placeholder="Glosa de la Cuenta" required />
        </CInputGroup>

        <CInputGroup size="sm" class="mb-3">
          <CInputGroupText class="headercolor" as="label">
            <i class="bi bi-tags-fill me-2"></i>Categoria :
          </CInputGroupText>
          <CFormSelect v-model="gastoUpdate.categoria" :valid="validoCategoria" required>
            <option value="">Categoria</option>
            <option value="GASTO">GASTO</option>
            <option value="PORCOBRAR">POR COBRAR</option>
            <option value="PORPAGAR">POR PAGAR</option>
          </CFormSelect>
        </CInputGroup>

        <CAlert color="danger" v-if="alertTipo">
          El Tipo de cuenta Existe
        </CAlert>

        <CAlert color="danger" v-if="alertCuenta">
          La Cuenta Existe
        </CAlert>

        <CAlert color="danger" v-if="alertCategoria">
          Solo Puede Existir Una Cuenta GASTO o Una Cuenta POR PAGAR.
        </CAlert>

      </CModalBody>
      <CModalFooter>
        <CButton @click="clickModalGasto(false)" color="danger" class="font" size="sm">
          <CIcon icon="cil-x" class="me-2" />Cancelar
        </CButton>

        <CButton v-if="!datosValidos" class="font" color="primary" size="sm" @click="revisarDatos">
          <CIcon icon="cil-description" class="me-2" />
          Verificar Datos
        </CButton>

        <CButton v-if="datosValidos" type="submit" class="font" :color="colorBoton" size="sm">
          <CIcon icon="cil-check-alt" class="me-2" />
          {{ tituloBoton }}
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
  <!-- End Modal CrearOrUpdate-->

</template>

<script setup>
import { reactive, ref, onMounted, watch, onUnmounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
DataTable.use(DataTablesCore)

import { useBreadcrumb } from '@/composables/useBreadcrumb'
const { setActions, clearActions } = useBreadcrumb()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useCuenta } from '@/composables/useCuenta'
const { registrarCuentaUse, updateCuentaUse, getCuentasUse, listaCuenta } = useCuenta()

import { useAlert } from '@/composables/useAlert'
const { dataLoading, close } = useAlert()

const columns = [
  { data: 'id', title: 'ID', width: '5%' },
  { data: 'tipo', title: 'Tipo de Cuenta', name: "tipo", width: '20%' },
  { data: 'cuenta', title: 'Cuenta', name: 'codigo', width: '10%' },
  { data: 'nombre', title: 'Nombre de Cuenta', name: 'nombre', width: '30%' },
  { data: 'glosa', title: 'Glosa', name: 'glosa', width: '20%' },
  { data: 'categoria', title: 'Categoria', name: 'categoria', width: '5%' },
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
const validoCuenta = ref(false)
const alertCuenta = ref(false)
const validoCategoria = ref(false)
const alertCategoria = ref(false)
const datosValidos = ref(false)

const modalGasto = ref(false)
const isEditable = ref(false)
const tituloModal = ref('')
const iconoModal = ref('')
const tituloBoton = ref('')
const colorBoton = ref('')
const listaAux = ref([])
const gastoUpdate = reactive({
  id: 0,
  tipo: '',
  cuenta: '',
  nombre: '',
  glosa: '',
  categoria: ''
})

/**Funciones */

const create = () => {
  getCreateOrEdit(false, false)
}
const salir = () => {
  getSalir()
}

const getSalir = () => {
  router.push({ name: 'MenuGastos' })
}

const selectSubmit = () => {
  if (isEditable.value) {
    updateGasto()
  } else {
    registrarCuenta()
  }
}

const editarGasto = (idGasto) => {
  listaCuenta.value.forEach(element => {
    if (element.id === idGasto) {
      gastoUpdate.id = element.id
      gastoUpdate.tipo = element.tipo
      gastoUpdate.cuenta = element.cuenta
      gastoUpdate.nombre = element.nombre
      gastoUpdate.glosa = element.glosa
      gastoUpdate.categoria = element.categoria
    }
  })
}

const getCreateOrEdit = (value, edit) => {
  gastoUpdate.id = 0
  gastoUpdate.tipo = ''
  gastoUpdate.cuenta = ''
  gastoUpdate.nombre = ''
  gastoUpdate.glosa = ''
  gastoUpdate.categoria = ''
  validoTipo.value = false
  alertTipo.value = false
  validoCuenta.value = false
  alertCuenta.value = false
  validoCategoria.value = false
  alertCategoria.value = false
  datosValidos.value = false

  if (edit) {
    isEditable.value = true
    editarGasto(value)
    tituloModal.value = 'Editar Cuenta de Gasto'
    iconoModal.value = 'cil-pencil'
    tituloBoton.value = 'Actualizar'
    colorBoton.value = 'info'
  } else {
    isEditable.value = false
    tituloModal.value = 'Crear Cuenta de Gasto'
    iconoModal.value = 'cil-description'
    tituloBoton.value = 'Aceptar'
    colorBoton.value = 'success'
  }
  clickModalGasto(true)
}

const clickModalGasto = (value) => {
  modalGasto.value = value
}

const revisarDatos = () => {
  listaAux.value = [...listaCuenta.value]
  if (isEditable.value) {
    listaAux.value = listaAux.value.filter(item => item.id !== gastoUpdate.id)
  }
  const tipoUpper = gastoUpdate.tipo.toUpperCase()
  const cuentaUpper = gastoUpdate.cuenta.toUpperCase()
  const categoria = gastoUpdate.categoria
  const existeTipo = listaAux.value.some(el => el.tipo.toUpperCase() === tipoUpper)
  const existeCuenta = listaAux.value.some(el => el.cuenta.toUpperCase() === cuentaUpper)
  const existeGasto = categoria === 'PORCOBRAR' && listaAux.value.some(el => el.categoria === categoria)
  const existePorPagar = categoria === 'PORPAGAR' && listaAux.value.some(el => el.categoria === categoria)

  validoTipo.value = !existeTipo
  validoCuenta.value = !existeCuenta
  validoCategoria.value = !(existeGasto || existePorPagar)

  alertTipo.value = existeTipo
  alertCuenta.value = existeCuenta
  alertCategoria.value = existeGasto || existePorPagar

  datosValidos.value = validoCuenta.value && validoTipo.value && validoCategoria.value

}

const updateGasto = async () => {
  clickModalGasto(false)
  const resultService = await updateCuentaUse(gastoUpdate)
  if (resultService) {
    location.reload()
  } else {
    console.log("error")
  }
}

const registrarCuenta = async () => {
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
      alertCuenta.value = false
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
watch(
  () => gastoUpdate.categoria,
  (nuevo, anterior) => {
    if (nuevo !== anterior) {
      datosValidos.value = false
      alertCategoria.value = false
    }
  }
)

const getAction = () => {
  setActions([
    {
      visible: true,
      label: 'Agregar Gasto',
      icon: 'cil-plus',
      color: 'secondary',
      variant: 'ghost',
      disabled: false,
      onClick: create
    },
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
    await getCuentasUse('TODOS')
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