<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">Lista de Sucursales</label>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="listaSucursales" :columns="columns" class="table table-striped"
                            :options="{ responsive: true }">


                            <template #column-nombre="{ cellData }">
                                <div class="text-nowrap">
                                    {{ cellData }}
                                </div>
                            </template>

                            <template #column-acciones="{ cellData }">
                                <CButtonGroup role="group" size="sm">
                                    <CButton color="secondary" variant="outline"
                                        @click="clickModalCosto(true, cellData.prefijo)"
                                        v-c-tooltip="{ content: 'Centro de Costos', placement: 'top' }">
                                        <i class="bi bi-folder2-open me-2"></i>
                                    </CButton>

                                    <CButton color="secondary" variant="outline" @click="getSucursal(cellData.id)"
                                        v-c-tooltip="{ content: 'Editar Sucursal', placement: 'top' }">
                                        <i class="bi bi-pencil-square me-2"></i>
                                    </CButton>

                                    <CButton color="secondary" variant="outline" @click="getPerfil(cellData.id)"
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

    <!-- Modal  Centro de Costo-->
    <CModal backdrop="static" scrollable size="xl" :visible="modalCosto" @close="clickModalCosto(false, 0)">
        <CModalHeader class="headercolor" dismiss @close="clickModalCosto(false, 0)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-folder-open" size="lg" class="me-2" />
                    CENTROS DE COSTO DE <strong>{{ sucursal.nombre }}</strong> | {{ sucursal.codigo }}
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow class="table-responsive">
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Centro de Costos</CTableHeaderCell>
                            <CTableHeaderCell>Codigo</CTableHeaderCell>
                            <CTableHeaderCell>Prefijo</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(item, index) in listaPrefijo" :key="index">
                            <CTableDataCell>{{ item.id }}</CTableDataCell>
                            <CTableDataCell>
                                <div class="text-nowrap">
                                    {{ item.nombre }}
                                </div>
                            </CTableDataCell>
                            <CTableDataCell>
                                {{ item.codigo }}
                            </CTableDataCell>
                            <CTableDataCell>
                                {{ item.prefijo }}
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CRow>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalCosto(false, 0)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />
                Cancelar
            </CButton>

            <CButton @click="clickModalCosto(false, 0)" class="font" color="success" size="sm">
                <CIcon icon="cil-check-alt" class="me-2" />
                <span>Aceptar</span>
            </CButton>
        </CModalFooter>

    </CModal>
    <!-- End Modal Centro de Costo-->

    <!-- Modal  Editar Sucursal-->
    <CModal backdrop="static" :visible="modalEditar" @close="clickModalEditar(false)">
        <CModalHeader class="headercolor" dismiss @close="clickModalEditar(false, 0)">
            <CModalTitle>
                <h6>
                    <CIcon icon="cil-folder-open" size="lg" class="me-2" />
                    {{ sucursal.nombre }} | {{ sucursal.codigo }}
                </h6>
            </CModalTitle>
        </CModalHeader>
        <CModalBody>

            <CInputGroup size="sm" class="mb-3">
                <CInputGroupText class="headercolor" as="label">Nombre
                </CInputGroupText>
                <CFormInput type="text" v-model="sucursal.nombre" placeholder="Nombre" required />
            </CInputGroup>

            <CInputGroup size="sm" class="mb-3">
                <CInputGroupText class="headercolor" as="label">Codigo
                </CInputGroupText>
                <CFormInput type="text" v-model="sucursal.codigo" placeholder="Codigo" required />
                <CInputGroupText class="headercolor" as="label">Prefijo
                </CInputGroupText>
                <CFormInput type="text" v-model="sucursal.prefijo" placeholder="Prefijo del Codigo" disabled required />
            </CInputGroup>

        </CModalBody>
        <CModalFooter>
            <CButton @click="clickModalEditar(false)" color="danger" class="font" size="sm">
                <CIcon icon="cil-x" class="me-2" />
                Cancelar
            </CButton>

            <CButton class="font" color="success" size="sm">
                <CIcon icon="cil-check-alt" class="me-2" />
                <span>Aceptar</span>
            </CButton>
        </CModalFooter>

    </CModal>
    <!-- End Modal Editar Sucursal-->
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

DataTable.use(DataTablesCore)

import { useRouter } from 'vue-router'
const router = useRouter()

import { useSucursal } from '@/composables/useSucursal'
const { findAllSucursalUse } = useSucursal()

import { useCentroCostos } from '@/composables/useCentroCostos'
const { findAllCentroCostosUse } = useCentroCostos()

const listaSucursales = ref([])
const listaCentroCostos = ref([])
const listaPrefijo = ref([])

const columns = [
    { data: 'id', title: 'ID' },
    { data: 'nombre', title: 'Sucursal', name: "nombre" },
    { data: 'codigo', title: 'Codigo', name: 'codigo' },
    { data: 'prefijo', title: 'Prefijo', name: 'prefjo' },
    {
        data: 'acciones',
        title: 'Acciones',
        orderable: false,
        searchable: false,
        name: 'acciones'
    }
]

const modalCosto = ref(false)
const modalEditar = ref(false)
const sucursal = reactive({
    id: null,
    nombre: '',
    codigo: '',
    prefijo: ''
})


const getSucursal = (value) => {
    const result = listaSucursales.value.filter(item => item.id === value)
    sucursal.id = result[0].id
    sucursal.nombre = result[0].nombre
    sucursal.codigo = result[0].codigo
    sucursal.prefijo = result[0].prefijo
    clickModalEditar(true)
}

const clickModalEditar = (value) => {
    modalEditar.value = value
}
const clickModalCosto = (value, prefijo) => {
    listaPrefijo.value = []
    if (value) {
        listaPrefijo.value = listaCentroCostos.value.filter(item => item.prefijo === prefijo)
        const result = listaSucursales.value.filter(item => item.prefijo === prefijo)
        sucursal.nombre = result[0].nombre
        sucursal.codigo = result[0].codigo
    }
    modalCosto.value = value
}

const findAllSucursal = async () => {
    try {
        const resultLista = await findAllSucursalUse()

        listaSucursales.value = resultLista.map(item => ({
            id: item.id,
            nombre: item.nombre,
            codigo: item.codigo,
            prefijo: item.prefijo,
            acciones: {
                prefijo: item.prefijo,
                id: item.id
            }
        }))
    } catch (errr) {
        console.log(errr)
    }
}

const findAllCentroCostos = async (value) => {
    try {
        const resultLista = await findAllCentroCostosUse()

        listaCentroCostos.value = resultLista.map(item => ({
            id: item.id,
            nombre: item.nombre,
            codigo: item.codigo,
            prefijo: item.prefijo,
        }))
    } catch (errr) {
        console.log(errr)
    }
}

onMounted(() => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    findAllSucursal()
    findAllCentroCostos()
})

</script>
