<template>
    <CRow>
        <CCol :xs="12">
            <CCard>
                <CCardHeader class="headercolor justify-content-between align-items-center">
                    <div class="align-items-center">
                        <CIcon icon="cil-list" size="lg" class="me-2 text-light" />
                        <label class="mb-0 fs-6 text-white">Lista de Jefes</label>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow class="table-responsive">
                        <DataTable :data="listaJefes" :columns="columns" class="table table-striped"
                            :options="{ responsive: true }">

                            <template #column-imagen="{ cellData }">
                                <!--<CImage :src="cellData" width="70" height="70" />-->
                                <CAvatar size="xl" :src="cellData.foto" :status="cellData.estado" />
                            </template>

                            <template #column-datos="{ cellData }">
                                <span>{{ cellData.idp }}</span>
                                <div class="small text-body-secondary text-nowrap">
                                    <span><strong>Nombre :</strong> {{ cellData.nombre }} {{ cellData.apellido
                                    }}</span><br>
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
import 'bootstrap-icons/font/bootstrap-icons.css'

DataTable.use(DataTablesCore)

import { useRouter } from 'vue-router'
const router = useRouter()

import { useEmpleado } from '@/composables/useEmpleado'
const { findByTipoUse } = useEmpleado()

import { API_URL_IMG100 } from "@/env"
const img100 = API_URL_IMG100

//const lista = reactive([])
const listaJefes = ref([])

const columns = [
    { data: 'id', title: 'ID' },
    { data: 'imagen', title: '', name: "imagen" },
    { data: 'datos',  title: 'Datos Personales', name: 'datos'},
    { data: 'estado', title: 'Estado', name: 'estado' },
    {
        data: 'acciones',
        title: 'Acciones',
        orderable: false,
        searchable: false,
        name: 'acciones'
    }
]

const findByTipo = async (value) => {
    try {
        const resultLista = await findByTipoUse(value)
        listaJefes.value = resultLista.map(item => ({
            id: item.id,
            imagen: {
                foto: item.persona?.foto === 'usuario.png' ? '/public/usuario.png' : API_URL_IMG100 + item.persona?.foto,
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

onMounted(() => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
    findByTipo('JEFE')
})

</script>
