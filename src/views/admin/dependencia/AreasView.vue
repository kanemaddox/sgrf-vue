<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">Lista de Areas</label>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="listaAreas" :columns="columns" class="table table-striped"
                            :options="{ responsive: true }">
                            <template #column-nombre="{ cellData }">
                                <span class="text-nowrap">{{ cellData }}</span>
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
import 'bootstrap-icons/font/bootstrap-icons.css'

DataTable.use(DataTablesCore)

import { useRouter } from 'vue-router'
const router = useRouter()

import { useArea } from '@/composables/useArea'
const { findByAllUse } = useArea()

//const lista = reactive([])
const listaAreas = ref([])

const columns = [
    { data: 'id', title: 'ID' },
    { data: 'nombre', title: 'Area', name: "nombre" },
    { data: 'estado', title: 'Estado', name: 'estado' },
    {
        data: 'acciones',
        title: 'Acciones',
        orderable: false,
        searchable: false,
        name: 'acciones'
    }
]

const findByAll = async (value) => {
    try {
        const resultLista = await findByAllUse(value)
        listaAreas.value = resultLista.map(item => ({
            id: item.id,
            nombre : item.nombre,
            estado: item.estado,
            acciones: item.id,
        }))
    } catch (errr) {
        console.log(errr)
    }
}

onMounted(() => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    findByAll('TODOS')
})

</script>
